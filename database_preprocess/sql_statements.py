def enum_check_sql():
    return """
SELECT typname FROM pg_type WHERE typname in ('days', 'terms')
"""

def enum_creation_sql():
    return """
CREATE TYPE IF NOT EXISTS days AS ENUM ('M', 'T', 'W', 'R', 'F', 'S', 'U', 'N/A');
CREATE TYPE IF NOT EXISTS terms AS ENUM ('Fall', 'Winter', 'Summer');
"""

def schema_tables_sql():
    return """
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) 
);
    
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    department_id INT,
    code VARCHAR(10),
    credits INT,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS attributes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS offerings (
    id SERIAL PRIMARY KEY,
    course_id INT,
    year INT,
    term terms,
    crn VARCHAR(6),
    location_type VARCHAR(255),
    delivery_type VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    offering_id INT,
    start_time TIME,
    end_time TIME,
    day days,
    location VARCHAR(255),
    type VARCHAR(255),
    FOREIGN KEY (offering_id) REFERENCES offerings (id)
);

CREATE TABLE IF NOT EXISTS instructors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS course_attribute (
    id SERIAL PRIMARY KEY,
    course_id INT,
    attribute_id INT,
    FOREIGN KEY (course_id) REFERENCES courses (id),
    FOREIGN KEY (attribute_id) REFERENCES attributes (id)
);


CREATE TABLE IF NOT EXISTS meeting_instructor (
    id SERIAL PRIMARY KEY,
    meeting_id INT,
    instructor_id INT,
    FOREIGN KEY (meeting_id) REFERENCES meetings (id),
    FOREIGN KEY (instructor_id) REFERENCES instructors (id)
);
"""

def select_department_sql():
    return """
SELECT id FROM departments WHERE code = %s;
"""

def insert_department_sql():
    return """
INSERT INTO departments (code) VALUES (%s) RETURNING id;
"""

def select_attribute_sql():
    return """
SELECT id FROM attributes WHERE name = %s;
"""

def insert_attribute_sql():
    return """
INSERT INTO attributes (name) VALUES (%s) RETURNING id;
"""

def select_course_sql():
    return """
SELECT id FROM courses WHERE title = %s AND department_id = %s AND
code = %s AND credits = %s;
"""

def insert_course_sql():
    return """
INSERT INTO courses (title, department_id, code, credits) VALUES 
(%s, %s, %s, %s) RETURNING id;
"""

def select_course_attribute_sql():
    return """
SELECT id FROM course_attribute WHERE course_id = %s AND attribute_id = %s;
"""

def insert_course_attribute_sql():
    return """
INSERT INTO course_attribute (course_id, attribute_id) VALUES 
(%s, %s) RETURNING id;
"""

def select_offering_sql():
    return """
SELECT id FROM offerings WHERE course_id = %s AND year = %s AND
term = %s AND crn = %s AND location_type = %s AND delivery_type = %s;
"""

def insert_offering_sql():
    return """
INSERT INTO offerings (course_id, year, term, crn, location_type, delivery_type)
VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;
"""

def select_meeting_sql():
    return """
SELECT id FROM meetings WHERE offering_id = %s AND start_time = %s AND
end_time = %s AND day = %s AND location = %s AND type = %s;
"""

def insert_meeting_sql():
    return """
INSERT INTO meetings (offering_id, start_time, end_time, day, location, type)
VALUES (%s, %s, %s, %s, %s, %s) RETURNING id;
"""

def select_instructor_sql():
    return """
SELECT id FROM instructors WHERE name = %s;
"""

def insert_instructor_sql():
    return """
INSERT INTO instructors (name) VALUES (%s) RETURNING id;
"""

def select_meeting_instructor_sql():
    return """
SELECT id FROM meeting_instructor WHERE meeting_id = %s AND
instructor_id = %s;
"""

def insert_meeting_instructor_sql():
    return """
INSERT INTO meeting_instructor (meeting_id, instructor_id) VALUES (%s, %s)
RETURNING id;
"""