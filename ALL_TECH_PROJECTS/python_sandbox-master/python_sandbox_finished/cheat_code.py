# prints all the builtin functions, classes, constants

import copy
print(dir(__builtins__))

# to print all global values in the module context in the form of dict - always define it at the end of the file
print(globals())

# used inside function to print all local variables in the form of dict
print(locals())

# Note that at the module level, locals() and globals() are the same dictionary.

# print(help(<module_name/fn/class>)) to get the doc string and structure of function, module or class

x = [1, 2, 3]
y = x  # print(x is y) - True
# copy.copy(<python_object from class>) - references are copied
# copy.deepcopy(<python_object from class>) - content is copied
