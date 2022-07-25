# A class is like a blueprint for creating objects. An object has properties and methods(functions) associated with it. Almost everything in Python is an object

# Built-in classes in Python define many magic methods. Use the dir() function to see the number of magic methods inherited by a class.
# Magic methods in Python are the special methods that start and end with the double underscores.
# They are also called dunder methods. Magic methods are not meant to be invoked directly by you, but the invocation happens
# internally from the class on a certain action. For example, when you add two numbers using the + operator, internally,
# the __add__() method will be called.

# int is a inbuilt class and all integers are instances of this class
# print(dir(int))

class Employee:
    # We pass the methods instance object in the first argument , same as this keyword in js but we access this without passing explicitly
    def __init__(self, name):
        self.name = name
        self.salary = 100

    def __str__(self):
        return 'name='+self.name+' salary=$'+str(self.salary)

    def __del__(self):
        print("the last reference to the object is destructed")


e1 = Employee('Swati')
# stringified version of employee object is printed as defined in __str__method
print(str(e1))
del e1  # destructor is called


def test_emp():
    e2 = Employee('harsha')
    print(dir(e2))
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
    '''
        This is the doc string for init method
        __new__ method will be called when an object is created
        _init__ method will be called to initialize the object

        In the base class "object", the __new__ method is defined as a static method which requires to pass a parameter cls
        cls represents the class that is needed to be instantiated, and the compiler automatically provides this parameter at the time of instantiation.
    '''

    def __new__(cls, *args, **kwargs):
        print("instantiated")
        # should return someting else __init__ will not be called
        return super(Customer, cls).__new__(cls)
        # return object.__new__(cls, *args, **kwargs)
        # Constructor  - removing this constructor call will include all parent properties in the Customer instance

    def __init__(self, name, email, age):
        '''
        _init__ method will be called to initialize the object
        self value is the return value of __new__ method
        '''

        # removing this parent constructor call will NOT include all parent properties in the Customer instance
        User.__init__(self, name, email, age)
        self.balance = 20
        # shouldn't return anything

    def set_balance(self, balance):
        self.balance = balance

    def greeting(self):
        print(User.greeting(self))
        return f'My name is {self.name} and I am {self.age} and my balance is {self.balance}'


class RepeatCustomer(User):  # User class is the base class here
    pass  # no methods  specfic to RepeatCustomer class, however u can add properties via code


testUser = RepeatCustomer('t', 'email', 56)
testUser.a = 90  # u can add property on the object directly
print(isinstance(testUser, RepeatCustomer))
print(hasattr(testUser, 'name'))
print(dir(User))
print(testUser.__dict__)
#  Init user object
brad = User('Brad Traversy', 'brad@gmail.com', 37)
# Init customer object
janet = Customer('Janet Johnson', 'janet@yahoo.com', 25)

# calling a method standalone on a different instance of a class
print(User.greeting(testUser))
print(User.greeting.__doc__)
print(help(Customer))
# janet.set_balance(500)
print(janet.__dict__)  # to print all the methods of the object

brad.has_birthday()
print(brad.__dict__)


class MyClass:
    # constructor is not needed for initialising properties
    # acts as a private variable as name is changed during runtime and hence can't be accessed as a property
    __hiddenVar = 105
    x = 124  # hardcoding properties (no need of constructor)

    def add(self, increment):
        z = 90  # z is local with in a function , not a property of the instance
        self.y = 9
        self.__hiddenVar += increment
        self.__age = 90  # private variable just like __hiddenVar
        print(self.__hiddenVar)
        # you cannot access as print(x) as x is treated as object property as it is defined outside of the function
        print(self.x)
        print(z)  # z is local to add method, hence can be accessed without self

    def show_age(self):
        return self.__get_age()

    def __get_age(self):  # private method
        return self.__age


myObject = MyClass()
print(myObject.x)
myObject.add(3)
# variable name is changed during runtime and hence can't be accessed
# print(myObject.__age)
print(myObject.show_age())  # => 25


# object oriented python
