# Database Builder
This is the directory for the database builder code. It requires a .html file of the course offerings.

## AWS Lambda
This dir is designed to be used in AWS lambda. 
- `lambda_function.py` defines the lambda function
- This folder can be zipped and uploaded directly for use in lambda
- To work, lambda will require a layer with all the dependencies (using the typical layer making procedure, install `aws-psycopg2 tqdm bs4`)
- Declare ENV variables in lambda: DB_HOST, DB_NAME, DB_USER, DB_PASS