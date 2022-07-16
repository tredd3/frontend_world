# A Dictionary is a collection which is unordered, changeable and indexed. No duplicate members.

# Create dict
first_name = 'paul'
person = {
    first_name: 'John',
    'last_name': 'Doe',
    'age': 30
}

# Use constructor
person2 = dict(first_name='Sara', last_name='Williams')
# Dict comprehension
person3 = {x: x**2 for x in (2, 4, 6)}

# Get value
print(person[first_name])
print(person['age'])
# print(person['friend'])  # we get keyerror
print(person.get('friend') == None)  # we get None as the value
print(person.get('last_name'))
print(person.get('middle_name', 'nothing'))  # we get 'nothing' as the value

# Add key/value
person['phone'] = '555-555-5555'

# Dictionaries have a bunch of methods available.
# clear() Removes all the elements from the dictionary
# copy() Returns a copy of the dictionary
# fromkeys() Returns a dictionary with the specified keys and value
# get() Returns the value of the specified key
# items() Returns a list containing a tuple for each key value pair
# keys() Returns a list containing the dictionary's keys
# pop() Removes the element with the specified key
del(person['age'])
person.pop('phone')
# popitem() Removes the last inserted key-value pair
# setdefault() Returns the value of the specified key. If the key does not exist:
# insert the key, with the specified value
# update() Updates the dictionary with the specified key-value pairs
# values() Returns a list of all the values in the dictionary


def printall():
    for key, val in person.items():
        print(key, val)


printall()

# Copy dict
person2 = person.copy()
person2['city'] = 'Boston'


# Get length
print(len(person2))

# List of dict
people = [
    {'name': 'Martha', 'age': 30},
    {'name': 'Kevin', 'age': 25}
]

print(people[1]['name'])
