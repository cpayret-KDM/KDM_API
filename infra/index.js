"use strict";
const pulumi = require("@pulumi/pulumi")
const awsx = require("@pulumi/awsx")
const aws = require("@pulumi/aws")

/*******************************************************************************
*   Configuration and Secrets
*******************************************************************************/

let config = new pulumi.Config();
const db = {
    username: config.require("dbusername"),
    password: config.requireSecret("dbpassword"),
    db: config.require("dbdb")
}

const springProfile = config.require("springProfile")
const isFlyway = config.get("isFlyway") || "false"
const dns = {
    zoneId: config.get("dns_zoneId"),
    dnsName: config.get("dns_dnsName")
}
/*******************************************************************************
*   Networking
*******************************************************************************/
const vpc = new awsx.ec2.Vpc("kdm_vpc",{})

const cluster = new awsx.ecs.Cluster("kdm_cloud", { vpc })

const securityGroupIds = cluster.securityGroups.map(g => g.id)

const publicSubnets = new aws.rds.SubnetGroup("dbsubnets", {
    vpc,
    subnetIds: vpc.publicSubnetIds,
})

const alb = new awsx.lb.NetworkLoadBalancer("kdm-web-traffic", { vpc });

const domain = new aws.route53.Record("kdm-staging", {
    zoneId: dns.zoneId,
    name: dns.dnsName,
    type: "CNAME",
    ttl: "300",
    records: [alb.loadBalancer.dnsName.apply(domainName => `${domainName}`)]
})

const cert = new aws.acm.Certificate("kdm-cert", { 
    validationMethod: "DNS",
    domainName: domain.fqdn.apply(domainName => `${domainName}`)
});

const target = alb.createTargetGroup("kdm-spring-target", { 
    port: 8080,
    vpc,
    protocol: "TCP"
})

const listener = target.createListener("kdm-web-listener", { 
    port: 443,
    protocol: "TLS",
    vpc,
    certificateArn: cert.arn.apply(arn => `${arn}`)
});


/*******************************************************************************
*   Create a pgsql RDS instance and make it publicly accessible
*******************************************************************************/
const kdmPgsqlInstance = new aws.rds.Instance("kdm-db", {
    allocatedStorage: 20,
    engine: "postgres",
    engineVersion: "12.4",
    instanceClass: "db.t2.micro",
    name: db.db,
    password: db.password,
    storageType: "gp2",
    username: db.username,
    publiclyAccessible: true,
    skipFinalSnapshot: true,
    dbSubnetGroupName: publicSubnets.id,
    vpcSecurityGroupIds: securityGroupIds,
    vpc
})

/*******************************************************************************
*   ECR Repository and Docker Image Build/Push                                 * 
*******************************************************************************/
const repo = new awsx.ecr.Repository("kdm-repo")
const image = repo.buildAndPushImage("../backend/")

/*******************************************************************************
*   Deploy Containers to AWS ECS using Fargate
*******************************************************************************/
let service = new awsx.ecs.FargateService("kdm_api", {
    cluster: cluster,
    desiredCount: 1,
    taskDefinitionArgs: {
        containers: {
            spring: {
                image: image,
                memory: 1024,
                portMappings: [ listener ],
                environment: [
                    { 
                        name: "spring.datasource.url",
                        value: pulumi.all([kdmPgsqlInstance.endpoint]).apply(([server]) => `jdbc:postgresql://${server}/kdm`)
                    },

                    { 
                        name: "spring.datasource.username",
                        value: db.username
                    },
                    { 
                        name: "spring.datasource.password",
                        value: db.password
                    },
                    { 
                        name: "spring.profiles.active",
                        value: springProfile
                    },
                    {
                        name: "spring.flyway.enabled",
                        value: isFlyway
                    },
                    {
                        name: "server.use-forward-headers",
                        value: "true"
                    }

                ]
            }
        }
    }
})

exports.db = kdmPgsqlInstance.endpoint
exports.service = listener.endpoint