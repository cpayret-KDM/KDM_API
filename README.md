# KDP API

KDM API is a java spring boot application, for providing backend rest services for the KDM architecture.

## Requirements

Java SDK v1.8+
Maven 3.3+
 

## Installation

Use maven package manager to build the application.

```bash
mvn clean install
```

## Usage

Run the application with the following command:

```bash
mvn spring-boot:run
```

## API

Once the application is up and running, visit the following url to explore the API:

http://localhost:8080/swagger-ui.html

Also a [openapi](https://www.openapis.org/) specificacion will be generated in the following url: 

http://localhost:8080/v3/api-docs

This specificacion can be use with any other OpenAPI ready tools like: PostMan, SoapUI, etc.


## License
Copyright (C) KDM Real Estate - All Rights Reserved

Unauthorized copying of this code, via any medium is strictly prohibited

Proprietary and confidential

Written by Diego Bolanos <diego@codingscape.com>, October 2020