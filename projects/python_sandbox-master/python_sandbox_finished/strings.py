# Strings in python are surrounded by either single or double quotation marks.
# Let's look at string formatting and some string methods

name = 'Brad'
age = 37

# iteration
# name[0]
# name[-1]
# name[0:3]
# name[:3]
# name[0:]

# escape characters - \\,\',\",\n
# Concatenate
print('Hello, \' my name is ' + name + ' and I am ' + str(age))

# Arguments by position
print('My name is {name} \n and I am {age}'.format(name=name, age=age))

# F-Strings (3.6+)/ String Formatting at run time
print(f'Hello, my name is {name} and I am {age}')
print(f'{len(name)} {2+2}')  # any valid expression can be lept inside braces

# String Methods
'''
hlhlbjkb
bbbl
'''

s = 'helloworld'
# Capitalize string
# This rerurns a new string and old string remains intact because it is immutable
print(s.capitalize())


# Make all uppercase
print(s.upper())

# Make all lower
print(s.lower())

# Swap case
print(s.swapcase())

# Get length
print(len(s))

# Replace
print(s.replace('world', 'everyone'))

# Count
sub = 'h'
print(s.count(sub))

# Starts with
print(s.startswith('hello'))

# Ends with
print(s.endswith('d'))

# Split into a list
print(s.split())

# Find position
print(s.find('h'))  # returns an index
print('hello' in s)  # returns a boolean

# Is all alphanumeric
print(s.isalnum())

# Is all alphabetic
print(s.isalpha())

# Is all numeric
print(s.isnumeric())

# muliple lines
message = """
python 
programming
"""
print(message)
