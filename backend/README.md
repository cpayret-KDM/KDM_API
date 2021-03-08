# KDP API

KDM API is a java spring boot application, for providing backend rest services for the KDM architecture.

## Requirements

Java SDK v1.8+
Maven 3.3+
PostgreSQL
 
## Dependency

You need to have a running instance of a postgresql database.  One easy way is with docker image

```bash
docker run -p 5432:5432 --name postgres-db -e POSTGRES_USER=kdm -e POSTGRES_PASSWORD=dbpassword -d postgres:12.4

```

## Build - Maven

Use maven package manager to build the application.

```bash
mvn clean package
```

## Running - Maven

To run the application, execute the following command:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="'--spring.datasource.username=dbusername' '--spring.datasource.password=dbpassword' '--spring.datasource.url=jdbc:postgresql://localhost:5432/kdm'"
```

By default, flyway database migration scripts are not executed automatically, in order to enable so, you need to pass the parameter: --spring.flyway.enabled=true

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="'--spring.datasource.username=dbusername' '--spring.datasource.password=dbpassword' '--spring.datasource.url=jdbc:postgresql://localhost:5432/kdm' '--spring.flyway.enabled=true'"
```


## Build - Docker Image

To build a docker image do the following:

First make sure to build with Maven, then create a docker image with the command

```bash
docker build --build-arg JAR_FILE=./target/kdm_api-0.0.1-SNAPSHOT.jar --build-arg VERSION=0.0.1 -t kdm/kdm-api-be:0.0.1 .
```

## Running - Maven

Use the following command line to run the application with Maven.  Replace the database connection values accordingly 

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="'--spring.datasource.username=dbusername' '--spring.datasource.password=dbpassword' '--spring.datasource.url=jdbc:postgresql://localhost:5432/kdm'
 '-e spring.flyway.enabled=true' '--spring.profiles.active=no_kdm_security'"
```

## Running - Docker Image 

To run this app from the docker image, we need to supply the database parameters to connect to. If the database is also a docker image running locally, you need to provide the IP address of your computer in the following command line:  
(localhost or 127.0.0.1 will not work)


```bash
docker run -p 8080:8080 --name kdm-api-be -e spring.profiles.active=no_kdm_security -e spring.datasource.url='jdbc:postgresql://localhost:5432/kdm' -e spring.datasource.username=dbusername -e spring.datasource.password=dbpassword -d kdm/kdm-api-be:0.0.1
```

## Running - Docker Compose

Docker Compose will deploy run this app as an integrated databse and docker java app.  First run this command to create an external volume for docker.

```bash
docker volume create --name=kdm-database-data
```

Then run this to start the docker environment
```bash
docker-compose -p kdm_api up
```

## Flyway - Enable/Disable

Database migration scripts are handle by flyway and are executed when the application starts.

This feature is disabled by default. So sensitive environemnts like Production, will not execute flyway migrations on application start.

For other environments like local development, test, staging, etc.  This feature can be turned on, by adding the spring parameter:  **-e spring.flyway.enabled=true**

## Flyway - Test Data

Executing migration scripts targeted for testing or development enviroments can be done with activating the spring profile: flyway_testdata

parameter is: spring.profiles.active=flyway_testdata
(either from command line or environment variable)

## Disable Web Security

To turn off Auth0 integration and security altogether, run the spring boot application with the profile: no\_kdm\_security

parameter is: spring.profiles.active=no\_kdm\_security
(either from command line or environment variable)

## API

Once the application is up and running, visit the following url to explore the API:

http://localhost:8080/swagger-ui.html

Also a [openapi](https://www.openapis.org/) specificacion will be generated in the following url: 

http://localhost:8080/v3/api-docs

This specificacion can be use with any other OpenAPI ready tools like: PostMan, SoapUI, etc.

## Continuous Deploys
See `infra/README.md`


## License
Copyright (C) KDM Real Estate - All Rights Reserved

Unauthorized copying of this code, via any medium is strictly prohibited

Proprietary and confidential

Written by Diego Bolanos <diego@codingscape.com>, October 2020
