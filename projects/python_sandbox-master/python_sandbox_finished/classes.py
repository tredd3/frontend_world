# A class is like a blueprint for creating objects. An object has properties and methods(functions) associated with it. Almost everything in Python is an object

# Create class
class User:
    # Constructor
    def __init__(self, name, email, age):  # __init__ is a magic method
        x = 90
        print(x)
        self.name = name
        self.email = email
        self.age = age

    def greeting(self):
        return f'My name is {self.name} and I am {self.age}'

    def has_birthday(self):
        self.age += 1


# Extend class
class Customer(User):
    # Constructor
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
        self.balance = 0

    def set_balance(self, balance):
        self.balance = balance

    def greeting(self):
        return f'My name is {self.name} and I am {self.age} and my balance is {self.balance}'


#  Init user object
brad = User('Brad Traversy', 'brad@gmail.com', 37)
# Init customer object
janet = Customer('Janet Johnson', 'janet@yahoo.com', 25)

janet.set_balance(500)
print(janet.greeting())

brad.has_birthday()
print(brad.greeting())


class MyClass:
    __hiddenVar = 0
    x = 124

    def add(self, increment):
        self.__hiddenVar += increment
        print(self.__hiddenVar)


myObject = MyClass()
myObject.add(3)
print(myObject.x)
# variable name is changed during runtime and hence can't be accessed
print(myObject.__hiddenVar)
