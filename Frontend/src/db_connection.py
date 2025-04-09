import psycopg2
from psycopg2.pool import SimpleConnectionPool

DATABASE_URL = "postgresql://postgres:ankit123@localhost:5432/hostel_report"

# Initialize connection pool
db_pool = SimpleConnectionPool(1, 10, DATABASE_URL)

def get_db_connection():
    """ Get a database connection from the pool """
    return db_pool.getconn()

def release_db_connection(conn):
    """ Return the connection to the pool """
    db_pool.putconn(conn)
