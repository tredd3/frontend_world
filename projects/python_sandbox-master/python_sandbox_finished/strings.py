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
'spam eggs'  # single quotes
'doesn\'t'  # use \' to escape the single quote...
"doesn't"  # ...or use double quotes instead
'"Yes," they said.'
"\"Yes,\" they said."
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
# Methods rerurns a new string and old string remains intact because string is immutable data structure

'''
capitalize() Converts the first character to upper case
casefold() Converts string into lower case
center() Returns a centered string
count() Returns the number of times a specified value occurs in a string
encode() Returns an encoded version of the string
endswith() Returns true if the string ends with the specified value
expandtabs() Sets the tab size of the string
find() Searches the string for a specified value and returns the position of where it was found
format() Formats specified values in a string
format_map() Formats specified values in a string
index() Searches the string for a specified value and returns the position of where it was found
isalnum() Returns True if all characters in the string are alphanumeric
isalpha() Returns True if all characters in the string are in the alphabet
isascii() Returns True if all characters in the string are ascii characters
isdecimal() Returns True if all characters in the string are decimals
isdigit() Returns True if all characters in the string are digits
isidentifier() Returns True if the string is an identifier
islower() Returns True if all characters in the string are lower case
isnumeric() Returns True if all characters in the string are numeric
isprintable() Returns True if all characters in the string are printable
isspace() Returns True if all characters in the string are whitespaces
istitle() Returns True if the string follows the rules of a title
isupper() Returns True if all characters in the string are upper case
join() Converts the elements of an iterable into a string
ljust() Returns a left justified version of the string
lower() Converts a string into lower case
lstrip() Returns a left trim version of the string
maketrans() Returns a translation table to be used in translations
partition() Returns a tuple where the string is parted into three parts
replace() Returns a string where a specified value is replaced with a specified value
rfind()	 Searches the string for a specified value and returns the last position of where it was found
rindex() Searches the string for a specified value and returns the last position of where it was found
rjust() Returns a right justified version of the string
rpartition() Returns a tuple where the string is parted into three parts
rsplit() Splits the string at the specified separator, and returns a list
rstrip() Returns a right trim version of the string
split() Splits the string at the specified separator, and returns a list
splitlines() Splits the string at line breaks and returns a list
startswith() Returns true if the string starts with the specified value
strip() Returns a trimmed version of the string
swapcase() Swaps cases, lower case becomes upper case and vice versa
title() Converts the first character of each word to upper case
translate() Returns a translated string
upper() Converts a string into upper case
zfill() Fills the string with a specified number of 0 values at the beginning
'''


# Replace
print(s.replace('world', 'everyone'))
# Find position
print(s.find('h'))  # returns an index
print('hello' in s)  # returns a boolean
# Get length
print(len(s))
# Is all alphanumeric
print(s.isalnum())

# muliple lines
message = """
python 
programming
"""
print(message)
