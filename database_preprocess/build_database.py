import psycopg2

# Database credentials
db_host = "<HOST>"
db_port = "<PORT>"
db_name = "<DB_NAME>"
db_user = "<USER>"
db_password = "<PASS>"

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
    print("Connected to PostgreSQL!")

    # Execute SQL queries using the 'cursor' object

except (Exception, psycopg2.Error) as error:
    print("Error connecting to PostgreSQL:", error)

finally:
    # Close the database connection
    if connection:
        cursor.close()
        connection.close()
