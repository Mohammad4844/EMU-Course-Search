from sql_statements import *

import psycopg2
import os
import json
import argparse
from tqdm import tqdm

def get_args():
    parser = argparse.ArgumentParser(description='Build database from dataset')
    parser.add_argument(
        'file_path', type=str, help='Path to the .json data file'
    )
    return parser.parse_args()

def select_else_insert(cursor, select_sql, insert_sql, args):
    select_result = select(cursor, select_sql, args)

    if select_result:
        return select_result[0]
    else:
        return insert(cursor, insert_sql, args)

def insert(cursor, insert_sql, args):
    cursor.execute(insert_sql, args)
    return cursor.fetchone()[0]

def select(cursor, select_sql, args):
    cursor.execute(select_sql, args)
    return cursor.fetchone()

def add_offering(cursor, offering_data):
    """
    Adds offering into the database according to table dependencies. Steps
    are shown below. It shows how the daya flows. The (1) and (*) at the 
    end represent if single or multiple entries occur respectivey.

    1 a) department_id = ADD department                            --- (1)
      b) attribute_ids = ADD attribute FOR-EACH attributes IF-ANY  --- (*)
    2 a) course_id = ADD course(department_id)                     --- (1)
      b) ADD course_attributes(course_id, attribte_ids)            --- (1, *)
    3 a) offering_id = ADD offering(course_id)                     --- (1)
    4 *) FOR-EACH (meeting, instructors) pair: 
      a) meeting_id = ADD meeting(offering_id)                     ---  (1)
      b) instructor_ids = ADD instructor FOR-EACH instructors      ---  (*)
      c) ADD meeting_instructor(meeting_id, instrictor_ids)        ---  (1, *)
    """

    # 1a) Department
    department_id = select_else_insert(
        cursor, select_department_sql(), insert_department_sql(),
        (offering_data['dept_code'],) 
    )
    
    # 1b) All Attributes
    attribute_ids = []
    if 'attributes' in offering_data:
        for attribute in offering_data['attributes']:
            attribute_id = select_else_insert(
                cursor, select_characteristic_sql(), insert_characteristic_sql(),
                (attribute,) 
            )
            attribute_ids.append(attribute_id)

    # 2a) Course
    course_id = select_else_insert(
        cursor, select_course_sql(), insert_course_sql(),
        (offering_data['course_name'], department_id, 
         offering_data['course_num'], offering_data['credits'])
    )

    # 2b) Course-Attribute Pairs
    for attribute_id in attribute_ids:
        select_else_insert(cursor, select_course_characteristic_sql(), 
            insert_course_characteristic_sql(), (course_id, attribute_id)
        )
    
    # 3a) Offering
    offering_id = select_else_insert(
        cursor, select_offering_sql(), insert_offering_sql(),
        (course_id, offering_data['year'], offering_data['semester'],
         offering_data['crn'], offering_data['course_location_type'],
         offering_data['course_delivery_type'])
    )

    # 4*) All Meetings
    for meeting in offering_data['meeting_times']:
        # 4a) Meeting
        day = 'N/A' if not meeting['day'] else meeting['day']
        meeting_id = select_else_insert(
            cursor, select_meeting_sql(), insert_meeting_sql(),
            (offering_id, meeting['start_time'], meeting['end_time'], 
             day, meeting['where'], meeting['schedule_type'])
        )

        # 4b) Instructors
        instructor_ids = []
        for instructor in meeting['instructors']:
            instructor_id = select_else_insert(
                cursor, select_instructor_sql(), insert_instructor_sql(),
                (instructor, )
            )
            instructor_ids.append(instructor_id)

        # 4c) Meeting-Instructor Pairs
        for instructor_id in instructor_ids:
            select_else_insert(
                cursor, select_meeting_instructor_sql(),
                insert_meeting_instructor_sql(), (meeting_id, instructor_id)
            )

def main():
    args = get_args()

    # Database credentials
    env = os.environ
    db_host = env.get('DB_HOST')
    db_port = env.get('DB_PORT')
    db_name = env.get('DB_NAME')
    db_user = env.get('DB_USER')
    db_password = env.get('DB_PASS')

    # Connect to the PostgreSQL database
    try:
        connection = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )

        cursor = connection.cursor()
        print('Connected to PostgreSQL!')

        # Enum types
        cursor.execute(enum_check_sql())
        existing_enums = [row[0] for row in cursor.fetchall()]
        if sorted(existing_enums) != ['days', 'terms']:
            cursor.execute(enum_creation_sql())
        print('Enum Types Created / Already Exist')

        # Create DB Schema tables
        cursor.execute(schema_tables_sql())
        print('Schema Tables Built / Already Exist')

        file_path = args.file_path
        with open(file_path, 'r') as f:
            offerings_data = json.load(f)

        # Insert the offering data into the database
        for offering_data in tqdm(offerings_data, desc='Building Database', unit='iteration'):
            add_offering(cursor, offering_data)

        connection.commit()
        print('Successfully Created Database')

    except (Exception, psycopg2.Error) as error:
        print('Error with PostgreSQL:', error)

    finally:
        # Close the database connection
        if connection:
            cursor.close()
            connection.close()
            print('Closed PostgreSQL Connection')

if __name__ == '__main__':
    main()