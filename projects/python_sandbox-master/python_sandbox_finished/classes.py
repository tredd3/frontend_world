# A class is like a blueprint for creating objects. An object has properties and methods(functions) associated with it. Almost everything in Python is an object

# Built-in classes in Python define many magic methods. Use the dir() function to see the number of magic methods inherited by a class.
# Magic methods in Python are the special methods that start and end with the double underscores.
# They are also called dunder methods. Magic methods are not meant to be invoked directly by you, but the invocation happens
# internally from the class on a certain action. For example, when you add two numbers using the + operator, internally,
# the __add__() method will be called.

# int is a inbuilt class and all integers are instances of this class
# print(dir(int))

class Employee:
    def __init__(self):
        self.name = 'Swati'
        self.salary = 100

    def __str__(self):
        return 'name='+self.name+' salary=$'+str(self.salary)

    def __del__(self):
        print("the last reference to the object is destructed")


e1 = Employee()
# stringified version of employee object is printed as defined in __str__method
print(str(e1))
del e1  # destructor is called


def test_emp():
    e2 = Employee()
    print(e2.__dict__)


test_emp()  # after this also destructor is called as e2 goes out of the scope , i.e stack constaining test_emp is cleared

# User defined classes


class User:
    # __init__ is a special method called constructor. It gets called at the time of
    # creating new objects. We use it to initialize our objects.
    def __init__(self, name, email, age):
        x = 90
        print(x)
        self.name = name
        self.email = email
        self.age = age

    def greeting(self):
        return f'My name is {self.name} and I am {self.age}'

    def has_birthday(self):
        self.age += 1


# Inheritance
class Customer(User):  # User class is the base class here
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
print(janet.__dict__)  # to print all the methods and properties of the object

brad.has_birthday()
print(brad.__dict__)


class MyClass:
    # constructor is not needed for initialising properties
    # acts as a private variable as name is changed during runtime and hence can't be accessed as a property
    __hiddenVar = 100
    x = 124

    def add(self, increment):
        z = 90
        self.y = 9
        self.__hiddenVar += increment
        print(self.__hiddenVar)
        # you cannot access as print(x) as x is treated as object property as it is defined outside of the function
        print(self.x)
        print(z)  # z is local to add method, hence can be accessed without self


myObject = MyClass()
myObject.add(3)
print(myObject.x)
# variable name is changed during runtime and hence can't be accessed
print(myObject.__hiddenVar)
