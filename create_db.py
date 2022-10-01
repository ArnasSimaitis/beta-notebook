import mysql.connector
from db_settings import *

print("Kuriam db")

mydb = mysql.connector.connect(
    host=db_host,
    user=db_user,
    passwd=db_password,
)

my_cursor = mydb.cursor()

my_cursor.execute(f"CREATE DATABASE IF NOT EXISTS  {db_name}")

my_cursor.close()
mydb.close()

