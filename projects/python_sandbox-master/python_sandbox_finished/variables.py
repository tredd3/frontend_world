# A variable is a container for a value, which can be of various types
# we can use triple quotes if the string is of multiple lines

'''
This is a 
multiline comment
or docstring (used to define a functions purpose)
can be single or double quotes
'''

"""
VARIABLE RULES:
  - Variable names are case sensitive (name and NAME are different variables)
  - Must start with a letter or an underscore
  - Can have numbers but can not start with one
"""

# no semicolons and no variable types
# variable types are determined at run time
# all integers are instances of <class 'int'>
# for variables and function naming use underscore to separate two words
# class naming use pascal case like XyzAbc

# x = 1           # int
# y = 2.5         # float
# name = 'John'   # str
# is_cool = True  # bool


# Multiple assignment
x, y, name, is_cool = (1, 2.5, 'John', True)
g = u = 9

# type annotations for version >3.6
abc_xyz: int = 9
abc_xyz = 'kk'  # if u install mypy linter instead of pylint it will throw error

# int, float, bool, strings are immutable - cannot modify them in memory
a = 1
print(id(a))
a += 1  # previous value of a in memory is garbage collected
print(id(a))  # memory of a variable

# whereas lists, dict  are mutable - can modify them in memory
b = [1, 2, 3, 4]
print(id(b))  # to print memory address use id function
b.append(6)
print(id(b))

# Basic math
a = x + y

# Casting
x = str(x)
y = int(y)
z = float(y)

print(type(x), x, id(x))

# global variables - file scope
# local variables - function scope - no block scoping

message = "hey"  # global variable


def greet():
    if True:
        msg = "hi"  # local variable available outside if block
        # message local variable is created and global mesage variable is not modified
        message = "global message not modified"
    print(message, msg)


greet()


def modify_global():
    if True:
        # to modify global variable from function which is a bad practice we need to use global keyword
        global message
        message = "global message  modified"


modify_global()
print(message)
