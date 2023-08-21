from preprocess_helpers import extract_header_info, extract_body_info, \
    clean_data, convert_datatypes, Validator

from bs4 import BeautifulSoup

def course_offerings(html):
    """
    html is the html content in string format
    """
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='datadisplaytable')
    table_rows = table.find_all('tr', recursive=False)

    # Extract appropriate html headers & bodies
    course_headers = []
    course_bodies = []
    for i in range(0, len(table_rows), 2):
        course_headers.append(table_rows[i].find('th', recursive=False))
        course_bodies.append(table_rows[i + 1].find('td', recursive=False))

    # Extract the actual course offerinfg data
    offerings_data = []
    for i in range(len(course_headers)):
        offerings_data.append(
            extract_header_info(course_headers[i]) | 
            extract_body_info(course_bodies[i])
        )

    # Clean the data & change formats/datatypes
    for i, offering_data in enumerate(offerings_data):
        offerings_data[i] = convert_datatypes(clean_data(offering_data))

    # Validate the course offerings
    for i, offering_data in enumerate(offerings_data):
        validator = Validator(offering_data)
        if not validator.is_valid():
            print(i)
            raise Exception
        
    return offerings_data

