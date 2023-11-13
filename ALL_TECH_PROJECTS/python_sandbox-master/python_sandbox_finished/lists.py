# A List is a collection which is ordered and changeable. Allows duplicate members.
# Note : there us also this concept of array in python, but they are least used
# creating an array containing same data type elements
import array

sample_array = array.array('i', [1, 2, 3])

# accessing elements of array
for i in sample_array:
    print(i)

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
x = [1, 2, 3, 4, 1, 2, 3, 4, 12]
print(x[::2])  # [1,3,1,3,12]

# set a value
fruits[0] = 'Blueberries'

# concatenate
final = numbers+fruits  # new array is fomred

'''
List have a bunch of methods available few change the list and few doesn't
//change list
append() Adds an element at the end of the list
extend() Add the elements of a list (or any iterable), to the end of the current list
clear()	Removes all the elements from the list
insert() Adds an element at the specified position by shifting other elements accordingly
pop() Removes the element at the specified position
remove() Removes the first item with the specified value
reverse() Reverses the order of the list
sort() Sorts the list

//doesn't change list
copy() Returns a copy of the list   #list(<list>) also creates a copy
count()	Returns the number of elements with the specified value
index() Returns the index of the first element with the specified value
'''

# Just like '', [] is also treated as False value
# Similar to string we can do a index to index comparison using == operator , but they should have the same data type
print([1, 2, 3] == [1, 2, 3])  # to compare reference use is operator
# Like strings ,concatenation using + operator works
print([1, 2, 3]+[4, 5, 6])  # [1,2,3,4,5,6]
print([1, 2, 3].append([4, 5, 6]))  # [1,2,3,[4,5,6]]
# Like strings repeat operator also works
print([1, 2, 3]*4)
x = [1, 2, 3]
y = [1, 2, 3]
print(x is y)  # False, as lists are mutable python cannot use the same reference as mutation of one can effect the other

a = 'test'
b = 'test'
print(a is b)  # True ,as strings are immutable python optimises the space by storing only one copy of a value (concept: interning)
# pythin uses interning for small numbers and strings

# Functions common to lists and strings
print(len(fruits))
print(min(x))
print(max(x))
print(sorted(x))

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
