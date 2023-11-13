# context managers in python are used for resource handling (file, db) etc


# Python program showing
# file management using
# context manager

from pymongo import MongoClient


class FileManager():
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.file.close()


# loading a file
with FileManager('test.txt', 'w') as f:
    f.write('Test')

print(f.closed)

# The number of database connections that can be opened at a time is also limited(just like file descriptors). Therefore
# context managers are helpful in managing connections to the database as there could be chances that the programmer may
# forget to close the connection


class MongoDBConnectionManager():
    def __init__(self, hostname, port):
        self.hostname = hostname
        self.port = port
        self.connection = None

    def __enter__(self):
        self.connection = MongoClient(self.hostname, self.port)
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.connection.close()


# connecting with a localhost
with MongoDBConnectionManager('localhost', '27017') as mongo:
    collection = mongo.connection.SampleDb.test
    data = collection.find({'_id': 1})
    print(data.get('name'))
