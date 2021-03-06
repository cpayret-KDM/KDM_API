# KDM INFRASTRUCTURE

This is a program for deploying the KDM dashboard API and PostgreSQL Database to
Amazon AWS.  It is configured to be run automatically on merges to the Main branch
as well as to generate previews of the operations from Pull Requests on Github.

## Getting Started
Follow the [Getting Started](https://www.pulumi.com/docs/get-started/aws/) instructions for setting up an AWS account, 
configuring the AWS CLI and the Pulumi CLI.  You will need to provide your own credentials for the environment or spin
up a new stack.

After setting the configuration values, you should be able to deploy and destroy the stack using `pulumi up` and `pulumi destroy`

The program will build a docker container and deploy that to AWS Fargate for the API, the database is deployed to RDS.

## Pulumi Config Variables
Set the following with `pulumi config set <name> <value>`
- dbusername : string
- dbdb : string
- isFlyway : boolean
- springProfile : string

Secrets are set with `pulumi config set --secret <name> <value>
- dbpassword
- tmoAPIToken

## Note on SSL Certs
This program provisions a ssl cert on the zone specified by the `infra:dns_zoneId` configuration variable of name `infra:dns_dnsName`.  There is a manual verification step still needed with Route 53 that involves clicking a button in
the ACM dashboard in order to verify the domain.

## Github Actions
Github actions are configured via `../.github` to run the pulumi app in preview mode on branch creation, and 
in deploy mode on merge to the `main` branch.

## References
RDS https://www.pulumi.com/docs/reference/pkg/aws/rds/instance/

AWS Engines https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstance.html

AWS / Fargate https://www.pulumi.com/blog/get-started-with-docker-on-aws-fargate-using-pulumi/
