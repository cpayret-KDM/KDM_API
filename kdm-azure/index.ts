import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as azure from "@pulumi/azure";
import * as docker from "@pulumi/docker";
import * as web from "@pulumi/azure-native/web";

/*******************************************************************************
*   Configuration and Secrets
*******************************************************************************/
/*
let config = new pulumi.Config();
const db = {
    username: config.require("dbusername"),
    password: config.requireSecret("dbpassword"),
    db: config.require("dbdb")
}
const springProfile = config.require("springProfile")
const isFlyway = config.get("isFlyway") || "false"
const allowedOrigins = config.get("allowedOrigins")
const tmoAPIToken = config.requireSecret("tmoAPIToken")
*/
// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("kdm-api");

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("kdmsa", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
});

// Create a dedicated App Service Plan for Linux App Services
const plan = new azure.appservice.Plan("kdm-linux-apps", {
    resourceGroupName: resourceGroup.name,
    kind: "Linux",
    reserved: true,
    sku: {
        tier: "Basic",
        size: "B1",
    },
});

// Export the primary key of the Storage Account
const storageAccountKeys = pulumi.all([resourceGroup.name, storageAccount.name]).apply(([resourceGroupName, accountName]) =>
    storage.listStorageAccountKeys({ resourceGroupName, accountName }));

const databaseServer = new azure.postgresql.Server("kdm-db-server", {
    location: resourceGroup.location,
    resourceGroupName: resourceGroup.name,
    skuName: "B_Gen5_2",
    storageMb: 5120,
    backupRetentionDays: 7,
    geoRedundantBackupEnabled: false,
    autoGrowEnabled: true,
    administratorLogin: "psqladminun",
    administratorLoginPassword: "H@Sh1CoR3!",
    version: "9.5",
    sslEnforcementEnabled: true,
});
const database = new azure.postgresql.Database("kdm-db", {
    resourceGroupName: resourceGroup.name,
    serverName: databaseServer.name,
    charset: "UTF8",
    collation: "English_United States.1252",
});

const firewallRule = new azure.postgresql.FirewallRule("kdm-allow-azure", {
    resourceGroupName: resourceGroup.name,
    serverName: databaseServer.name,
    startIpAddress: "0.0.0.0",
    endIpAddress: "0.0.0.0",
});

const kdmService = new web.WebApp("kdm-service", {
    resourceGroupName: resourceGroup.name,
    serverFarmId: plan.id,
    siteConfig: {
        appSettings: [
            { 
                name: "spring.datasource.url",
                value: pulumi.all([databaseServer.fqdn, database.name]).apply(([server, dbName]) => `jdbc:postgresql://${server}/${dbName}`)
            },
            { 
                name: "spring.datasource.username",
                value: "psqladminun"
            },
            { 
                name: "spring.datasource.password",
                value: "H@Sh1CoR3!"
            },
            { 
                name: "spring.profiles.active",
                value: "no_kdm_security"
            },
            {
                name: "spring.flyway.enabled",
                value: "true"
            },
            {
                name: "kdm.api.allowedOrigins",
                value: "localhost:3000"
            },
            {
                name: "tmo.api.token",
                value: ""
            },
            {
                name: "WEBSITES_PORT",
                value: "8080", // Our custom image exposes port 80. Adjust for your app as needed.
            },
        ],
        alwaysOn: true,
        linuxFxVersion: pulumi.interpolate`DOCKER|jimmyjacobson/kdm_api:latest`,
    },
    httpsOnly: true,
});

export const getStartedEndpoint = pulumi.interpolate`https://${kdmService.defaultHostName}`;
export const primaryStorageKey = storageAccountKeys.keys[0].value;