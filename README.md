# EMU Course Search
This is an unofficial alternative to EMU's Course Search. [Here's](https://mohammad4844.github.io/EMU-Course-Search/web_page) a link to the hosted page.

The main feature here is that you can search courses based on your availabilities. As an example, you can say that your availabilities are: Monday 10am - 3pm, Tuesday 12pm - 6pm, Wednesday 8am - 12pm. It will return only the courses that fall into your availabilty windows. 

Along with this, you can also apply other typical features like departments (COSC or WRTG), course levels (100-199 or 400-499), or attributes (Gen Ed Arts, Honors Sections).

## Glossary
- [System Design (AWS)](#system-design)
- [Technolgies Used](#tech-overview)
- [Database Builder](#database-builder)
- [Backend API](#backend-api)
- [Database](#database)
- [Frontend](#frontend)

## System Design
Here's a brief overview of the overall system:

<img src="aws_architecture/architecture.png" alt="aws architecture diagram" width="600"/>

## Tech Overview

This is a full-stack web application. The following is an overview of the technolgies used in each part of the project. This app was built using multiple AWS services (Lambda, RDS, Route 53), Ruby on Rails, PostgreSQL and much more.

Database Builder
- AWS: Lambda, S3, Cloudwatch Event Triggers
- Tehcnologies: Python, SQL

Backend API
- AWS: EC2, Load Balancer, Amazon Certificate Manager
- Tehcnologies: Ruby on Rails, Ruby

Database: PostgreSQL
- AWS: RDS (Relational Database Service) for Postgres
- Tehcnologies: PostgreSQL

Frontend: 
- AWS: Route 53
- Tehcnologies: HTML, CSS, JavaScript, Bootstrap


### Database Builder
Preprocess the .html file of course offerings and uses them to build a relational database (Postgres). 
- File is uploaded to the S3 container
- A Cloudwatch Event is triggered
- A call to the Lambda function is made, which processes the html doc to build the database.
- For details on database builder, see [database_preprocess](database_preprocess)

### Backend API
A RESTful API that returns course offerings in json format based on api request filters.
- Built using the Ruby on Rails framework
- Hosted on an EC2 instance
- Fronted by an Application Load Balancer
- Secured with SSL certificate form AWS Certificate Manager, allowing https
- For details on rails api, see the `course_search` submodule

### Database
A Relational database that stores the course offerings for use by the api.
- Uses Amazon RDS for PostgreSQL
- The Database Schema:
<img src="database_preprocess/visuals/schema.png" alt="db schema diagram" width="600"/>

### Frontend
A static webpage that interacts with the backend api to show course search results.
- Interacts with api through domain on Route 53
- Static webpage that uses Bootstrap for styling
- Hosted on Github Pages
- For details on frontend, see [web_page](web_page)