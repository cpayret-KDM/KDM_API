"use strict";
const pulumi = require("@pulumi/pulumi")
const cloud = require("@pulumi/cloud")

const docker = require("@pulumi/docker")
const pg = require("@pulumi/postgresql")

const config = new pulumi.Config()
const network = new docker.Network('net')

const pgImage = new docker.RemoteImage('postgresql-image', {
	name: 'postgres:11',
	keepLocally: true
})

const pgVol = new docker.Volume('pgdata')

const pgContainer = new docker.Container('postgres', {
	image: pgImage.name,
	networksAdvanced: [{name: network.name}],
	restart: 'on-failure',
	volumes: [{ volumeName: pgVol.name, containerPath: '/var/lib/postgresql/data'}],
	envs: [
		`POSTGRES_USER=cs_kdm`,
		`POSTGRES_PASS=cs_pass`,
		`POSTGRES_DB=kdm`
	],
	ports: [{ internal: 5432, external: 5432 }]
})

const pgProvider = new pg.Provider('kdm', {
	host: pgContainer.ip_address_data,
	username: "cs_kdm",
	password: "cs_pass",
	database: "kdm",
	sslmode: "disable"
})

const db = new pg.Database('kdm', {}, {provider: pgProvider})

let service = new cloud.Service("kdm_api", {
	containers: {
		spring: {
			build: "../",
			memory: 1024,
			ports: [{ port: 80 }],
			env: [{
				url: `jdbc:postgresql://${pgContainer.ip_address_data}/kdm`,
				username: "cs_kdm",
				password: "cs_pass" 
			}]
		}
	}
}) 


exports.url = service.defaultEndpoint.apply(e => `http://${e.hostname}`)
exports.db = pgContainer
