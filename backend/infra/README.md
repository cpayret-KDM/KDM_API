RDS https://www.pulumi.com/docs/reference/pkg/aws/rds/instance/

AWS Engines https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstance.html

AWS / Fargate https://www.pulumi.com/blog/get-started-with-docker-on-aws-fargate-using-pulumi/


## Pulumi Config Variables
Set the following with `pulumi config set <name> <value>`
- dbusername : string
- dbdb : string
- isFlyway : boolean
- springProfile : string

Secrets are set with `pulumi config --secret set <name> <value>
- dbpassword