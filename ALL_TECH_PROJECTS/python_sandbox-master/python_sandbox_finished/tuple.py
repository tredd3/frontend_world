# A Tuple is a collection which is ordered and unchangeable/immutable - However, a tuple can contain mutable objects.
# it Allows duplicate members.

# Create tuple
fruits = ('Apples', 'Oranges', 'Grapes', 'Oranges')
x = 12345, [1, 2, 34], 'hello!'  # a tuple can contain mutable objects.
x[1][1] = 900  # can be modified , since list is mutable and tuple only has its reference and not the value
# nested tuple
u = x, (1, 2, 3, 4, 5)  # ((12345, [1, 2, 34], 'hello!'), (1, 2, 3, 4, 5))

# Using a constructor
fruits2 = tuple(('Apples', 'Oranges', 'Grapes'))
x = tuple(['bobby', 'at', 'didcoding', 'dot', 'com'])
# Tuple comprehension...Just use list comprehension with the tuple function
tuple([x**2 for x in range(10)])

# Single value needs trailing comma
fruits2 = ('Apples',)

# Get value
print(fruits[1])

# Can't change value
fruits[0] = 'Pears'

# tuple has only 2 methods
fruits.count('Oranges')  # prints 2
# the index of the first element with the specified value
fruits.index('Apples')

# Delete tuple
del fruits2

# Get length
print(len(fruits))
