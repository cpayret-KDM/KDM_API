"use strict";
const pulumi = require("@pulumi/pulumi")
const aws = require("@pulumi/aws")
const awsx = require("@pulumi/awsx")
const cloud = require("@pulumi/cloud")

//const vpc = awsx.ec2.Vpc.getDefault();

// Create a basic cluster and autoscaling group
const vpc = new awsx.ec2.Vpc("kdm_vpc",{});
const cluster = new awsx.ecs.Cluster("kdm_cloud", { vpc });
//const cluster = new awsx.ecs.Cluster("custom", { vpc });

const securityGroupIds = cluster.securityGroups.map(g => g.id);

const dbSubnets = new aws.rds.SubnetGroup("dbsubnets", {
    subnetIds: vpc.publicSubnetIds,
});

// Create a pgsql RDS instance and make it publicly accessible
const kdmPgsqlInstance = new aws.rds.Instance("kdm-db", {
    allocatedStorage: 20,
    engine: "postgres",
    engineVersion: "12.4",
    instanceClass: "db.t2.micro",
    name: "kdm",
    //parameterGroupName: "kdm.postgresql12.4",
    password: "cs_korth_pw",
    storageType: "gp2",
    username: "cs_korth",
    publiclyAccessible: true,
    skipFinalSnapshot: true,
    dbSubnetGroupName: dbSubnets.id,
    vpcSecurityGroupIds: securityGroupIds,
})

let service = new cloud.Service("kdm_api", {
    cluster: cluster,
	containers: {
		spring: {
            build: "../",
            args: {
                "JAR_FILE": "./target/kdm_api-0.0.1-SNAPSHOT.jar",
                "VERSION": "0.0.1"
            },
			memory: 1024,
			ports: [{ port: 8080 }],
			environment: {
				"spring.datasource.url": `jdbc:postgresql://kdm-db18eda6d.cgaqu5r9jgep.us-west-2.rds.amazonaws.com:5432/kdm`,
				"spring.datasource.username": "cs_korth",
                "spring.datasource.password": "cs_korth_pw",
                "spring.profiles.active": "no_kdm_security"
			}
		}
	}
})

exports.db = kdmPgsqlInstance
exports.url = service.defaultEndpoint.apply(e => `http://${e.hostname}`)