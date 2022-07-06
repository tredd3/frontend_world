# A List is a collection which is ordered and changeable. Allows duplicate members.

# Create list
numbers = [1, 2, 9, 4, 5]
fruits = ['Apples', 'Oranges', 'Grapes', 'Pears']

# Use a constructor
# numbers2 = list((1, 2, 3, 4, 5))

# Get a value
print(fruits[1])

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

# Change value
fruits[0] = 'Blueberries'

# slice array
sliced_array = fruits[0:3]
print(sliced_array)  # actual array is not modified

# remove all items in a list
fruits.clear()

# Reverse list
fruits.reverse()

# Sort list
fruits.sort()

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
