# A module is basically a file with some python code.
#  There are core python modules, modules you can install using the pip package manager
#  (including Django) as well as custom modules

# Core modules https://docs.python.org/3/library/
import time
from time import time

import datetime
from datetime import date

# Pip module - https://pypi.org/ - it points to a directory where external packages are stored
#from camelcase import CamelCase
#c = CamelCase()
#print(c.hump('hello there world'))

# Import custom module
import validator  # validator is an object with properties and methods
# after typing import press control+space to get all available stuff inside module
from validator import validate_email

# import modules from packages
import python_package.utils
# for importing few fns from a package module
from python_package.utils import remove_duplicates, constant
# for importing the complete module from a package
from python_package import utils
array = [1, 2, 3, 1, 4, 5, 5, 6, 9, 9, 6, 6]
print(python_package.utils.remove_duplicates(array))
print(remove_duplicates(array), constant)
print(utils.remove_duplicates(array))
print(utils.__package__)  # utils module belongs to which pacakge

# to find out module contents - i.e names a module defines. It returns a sorted list of strings:
print(dir(validator))
# to know everthing about module and its contents, with description
print(help(time))
print(validator.__file__)  # to know the location of module
print(validator.re, type(validator.re))
print(validator.User, type(validator.User))

print(validator.variable)  # import variable
print(validator.User)  # import class

email = 'test#test.com'
if validate_email(email):  # import function
    print('Email is valid')
else:
    print('Email is bad')


# today = datetime.date.today()
today = date.today()
timestamp = time()
print(timestamp)


# install pip modules to current directory
# pip3 install < your_python_module_name > -t lib/ (provided lib is the folder u created to store all modules)
# pip3 install <your_python_module_name> -t .
