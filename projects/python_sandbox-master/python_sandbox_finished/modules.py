# A module is basically a file with some python code.
#  There are core python modules, modules you can install using the pip package manager
#  (including Django) as well as custom modules

# Core modules
import time
from time import time

import datetime
from datetime import date

# Pip module - https://pypi.org/ - it points to a directory where external packages are stored
from camelcase import CamelCase

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

print(dir(validator))
print(validator.__file__)
print(validator.re, type(validator.re))
print(validator.User, type(validator.User))

c = CamelCase()
print(c.hump('hello there world'))

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
