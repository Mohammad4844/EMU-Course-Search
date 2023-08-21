import json
import boto3
import io
from io import StringIO

from extract_course_offerings import course_offerings
from build_database import build_db

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    Requires the appropriate env variables declared, as specified in build_database.py
    """

    try:
        s3_Bucket_Name = event["Records"][0]["s3"]["bucket"]["name"]
        s3_File_Name = event["Records"][0]["s3"]["object"]["key"]
        object = s3_client.get_object(Bucket=s3_Bucket_Name, Key=s3_File_Name)

        body = object['Body']
        body = body.read().decode('utf-8')
        
        offerings_data = course_offerings(body)
        build_db(offerings_data)
        
    except Exception as err:
        print(err)
        
    return {
        'statusCode': 200,
    }