from datetime import datetime

def extract_header_info(html):
  info = html.get_text().split(' - ')

  return {
      'course_name': ' - '.join(info[:-3]),
      'crn': info[-3],
      'dept_code': info[-2].split(' ')[0],
      'course_num': info[-2].split(' ')[1],
      'section_no': info[-1]
  }

def extract_body_info(html):
  info = html.get_text().split('\n')
  info = list(filter(lambda s: s != '', info))

  # dodges an edge case where there is text before 'Associated Term'
  term_idx = 0
  for i, s in enumerate(info):
    if 'Associated Term:' in s:
      term_idx = i
      break
  info = info[term_idx:]


  meeting_times_idx = info.index('Scheduled Meeting Times')
  meeting_info = info[meeting_times_idx + 8:]
  meeting_times = []

  for i in range(0, len(meeting_info), 7):
    map = {}
    map['start_time'] = meeting_info[i + 1].split('-')[0] if meeting_info[i + 1] != 'TBA' else 'TBA'
    map['end_time'] = meeting_info[i + 1].split('-')[1] if meeting_info[i + 1] != 'TBA' else 'TBA'
    map['where'] = meeting_info[i + 3]
    map['schedule_type'] = meeting_info[i + 5]
    map['instructors'] = meeting_info[i + 6].split(',')

    days = meeting_info[i + 2]
    if days == '\xa0': # \xa0 is a 'space' in html/soup
      meeting_times.append(map | {'day': ''})
    else:
      for day in days:
        meeting_times.append(map | {'day': day})
  
  attributes = {}
  if 'Attributes:' in info[3]:
    attributes = { 'attributes' : info[3][11:].split(',') }


  return {
      'semester': info[0].split(' ')[2],
      'year': info[0].split(' ')[3],
      'course_location_type': info[meeting_times_idx - 5],
      'course_delivery_type': info[meeting_times_idx - 4],
      'credits': info[meeting_times_idx - 3].split(' ')[-2],
      'meeting_times': meeting_times
  } | attributes

def clean_data(offering_data):
  """
  strips etxtra white space from the data dict recursively
  """
  if isinstance(offering_data, str):
      return offering_data.strip()
  elif isinstance(offering_data, list):
      return [clean_data(item) for item in offering_data]
  elif isinstance(offering_data, dict):
      return {key: clean_data(value) for key, value in offering_data.items()}
  else:
      return offering_data  # For non-string, non-list, and non-dict elements

def convert_timesring_to_datetime(time_string):
  return datetime.strptime(time_string, '%I:%M %p').strftime('%H:%M') if not time_string == 'TBA' else None

def convert_datatypes(offering_data):
  offering_data['year'] = int(offering_data['year'])
  offering_data['credits'] = int(float(offering_data['credits']))
  offering_data['section_no'] = int(offering_data['section_no'])
  for i, m in enumerate(offering_data['meeting_times']):
    offering_data['meeting_times'][i]['start_time'] = convert_timesring_to_datetime(m['start_time'])
    offering_data['meeting_times'][i]['end_time'] = convert_timesring_to_datetime(m['end_time'])
  return offering_data

class Validator():
  def __init__(self, offering_data):
    self.offering_data = offering_data

  def is_valid(self):
    return self.course_valid() and self.dept_valid() and \
      self.offering_valid() and self.meeting_times_valid() and \
      self.attributes_valid() and self.instructors_valid()

  def course_valid(self):
    dept_code = self.offering_data['dept_code']
    return isinstance(dept_code, str) and 2 <= len(dept_code) <= 4

  def dept_valid(self):
    course_name = self.offering_data['course_name']
    course_num = self.offering_data['course_num']
    credits = self.offering_data['credits']
    return isinstance(course_name, str) and isinstance(course_num, str) and \
      isinstance(credits, int) and credits >= 0

  def offering_valid(self):
    semester = self.offering_data['semester']
    year = self.offering_data['year']
    crn = self.offering_data['crn']
    section_no = self.offering_data['section_no']
    course_location_type = self.offering_data['course_location_type']
    course_delivery_type = self.offering_data['course_delivery_type']

    return isinstance(semester, str) and semester in ['Fall', 'Winter', 'Summer'] and \
      isinstance(year, int) and 2000 < year < 2100 and isinstance(crn, str) and \
      int(crn) >= 0 and isinstance(section_no, int) and section_no >= 0 and \
      isinstance(course_location_type, str) and isinstance(course_delivery_type, str)

  def meeting_times_valid(self):
    meeting_times = self.offering_data['meeting_times']
    for m in meeting_times:
      start_time = m['start_time']
      end_time = m['end_time']
      day = m['day']
      where = m['where']
      schedule_type = m['schedule_type']
      if not ((isinstance(start_time, str) and isinstance(end_time, str) or \
        start_time is None and end_time is None) and isinstance(day, str) and \
        day in ['', 'M', 'T', 'W', 'R', 'F', 'S', 'U'] and isinstance(where, str) and \
        isinstance(schedule_type, str)):
        return False
    return True
    
  def attributes_valid(self):
    if 'attributes' not in self.offering_data:
      return True
    attributes = self.offering_data['attributes']
    for a in attributes:
      if not (isinstance(a, str)):
        return False
    return True

  def instructors_valid(self):
    meeting_times = self.offering_data['meeting_times'] 
    for m in meeting_times:
      instructors = m['instructors']
      for i in instructors:
        if not (isinstance(i, str)):
          return False
    return True