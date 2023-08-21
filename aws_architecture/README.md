# AWS Architecture Instructions

## Some Tips & Prereqs
- have the frontend hosted somewhere already (Gtihub Pages)
- frontend won't call the hosted api properly from localhost, because local browsers don't allow CORS (pain to set up, dont bother)
- better to finalize api on localhost first, instead of putting it on aws and then testing 
- if it hangs anywhere on an AWS service, it is always security group / permissions issue
- make sure each service has the appropriate (1) permissions and (2) security groups for intercating with each service
- static hosting websites, like Github Pages, use https. because of this, all links they call also HAVE to be https, not http. so, setting up an https endpoint is neccessary

## Create RDS instance
- make sure it is publicly accessible (so lambda can access, otherwise it would rerquire internet gateway which costs a lot)
- security group: inbound & outbound on 5432
- connect to it using psql (local terminal)
- create the database using `CREATE DATABASE <db_name>;`

## Create S3 Bucket

## Create Lambda Function
- add AmazonS3ReadOnlyAccess role
- change duration to 5 min
- change RAM from 128 to 512
- make sure it is NOT in a vpc (otherwise, won't connect to s3)
- add a dependency layer
  - in local computer
  - make a folder `python/`
  - cd into `python/`
  - `pip3 install aws-psycopg2 tqdm bs4 -t .`
  - zip this `python/` folder into `python.zip`
  - create a layer for lambda with this zip
- add the necessary lambda code files. see [database_preprocess](../database_preprocess)
- declare ENV variables required to connect to db
  - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

 ## Add Cloudwatch Event Trigger
 - there is a convenient option on the lambda pages
 - on upload action, only for .html files

## Start an EC2 instance
- make sure it is in the same AZ (subnet) as RDS instance
- install Ruby & Rails. see [rails_setup_on_ec2.sh](rails_setup_on_ec2.sh). there is a small chance this stops working with newer versions of aws linux.
- install the app
- set up ENV variables for db login
- make sure authorized hosts and CORS origins are set in Rails (come back to this later if domain / cors origins are not prepared)
- add connection from ec2 to rds (there should be a convenient option in ec2, it wont cost anything IF they are in the same AZ)

## Set up a Load Balancer
- allow port 80 (http) and 443 (https)
  - on target group, the instance port should be 3000  (or other custom port if changed)
  - change security groups to allow ec2 & load balancer to interact
 
## Set up a Domain in route 53
- add an alias record for the load balancer (no cost for alias records)

## Get a Public SSL Certificate using ACM
- use dns verification (quick)

## Add Certificate to Load Balancer
- this allows https requests now

## Add Host & CORS Origins in Rails (if not already there)
- the domain will be the Route 53 record you created for the load balancer
- the CORS origin will be your frontend host domain ("\<username\>.github.io" for websites in github pages)

## Done!!!