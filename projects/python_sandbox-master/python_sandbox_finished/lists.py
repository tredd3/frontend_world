# A List is a collection which is ordered and changeable. Allows duplicate members.

# Create list
numbers = [1, 2, 9, 4, 5]
fruits = ['Apples', 'Oranges', 'Grapes', 'Pears']

# Use a constructor
numbers2 = list((1, 2, 3, 4, 5))
numbers3 = list([1, 2, 3, 4, 5])
numbers4 = list({11, 20, 5})
# List comprehension
y = [x**2 for x in range(10)]

# Get a value
print(fruits[0])  # print first item
print(fruits[-1])  # print last item

# set a value
fruits[0] = 'Blueberries'

# concatenate
final = numbers+fruits  # new array is fomred

'''
List have a bunch of methods available.
append() Adds an element at the end of the list
clear()	Removes all the elements from the list
copy() Returns a copy of the list
count()	Returns the number of elements with the specified value
extend() Add the elements of a list (or any iterable), to the end of the current list
index() Returns the index of the first element with the specified value
insert() Adds an element at the specified position
pop() Removes the element at the specified position
remove() Removes the first item with the specified value
reverse() Reverses the order of the list
sort() Sorts the list
'''

# Get length
print(len(fruits))

# Append to list
fruits.append('Mangos')

# Remove from list
fruits.remove('Grapes')

# Remove the element at the specified index.
fruits.pop(2)

# Insert into position
fruits.insert(2, 'Strawberries')


# slice array
sliced_array = fruits[0:3]
print(sliced_array)  # actual array is not modified
# Create a list copy
copied_array = fruits[:]

# remove all items in a list
fruits.clear()

# Reverse list
fruits.reverse()  # modify existing array

# Sort list
fruits.sort()  # modify existing array

# Reverse sort
fruits.sort(reverse=True)

print(fruits)


# code to remove duplicates from list
array = [1, 2, 3, 1, 4, 5, 5, 6, 9, 9, 6, 6]
unique = []

for num in array:
    if num not in unique:
        unique.append(num)

print(unique)

# list destructuring
x, y, z = [100, 2, 3]
print(x, y, z)
