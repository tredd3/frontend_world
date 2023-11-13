# A Set is an unordered collection with no duplicate elements. Like a dictionary,
# a set is defined by a curly bracket. Sets are mutable - this means that items can be changed.

# Create set
fruits_set = {'Apples', 'Oranges', 'Mango'}
# Set comprehension
a = {x for x in 'abracadabra' if x not in 'abc'}
# built-in function set() creates a set object
x = set(('bobby', 'bobby', 'at', 'didcoding', 'dot', 'com'))

# Check if in set
print('Apples' in fruits_set)

'''
#Set has a whole bunch of methods available.
add() Adds an element to the set
clear() Removes all the elements from the set
copy() Returns a copy of the set
difference() Returns a set containing the difference between two or more sets
difference_update() Removes the items in this set that are also included in another, specified set
discard() Remove the specified item
intersection() Returns a set, that is the intersection of two or more sets
intersection_update() Removes the items in this set that are not present in other, specified set(s)
isdisjoint() Returns whether two sets have a intersection or not
issubset() Returns whether another set contains this set or not
issuperset() Returns whether this set contains another set or not
pop() Removes an element from the set
remove() Removes the specified element
symmetric_difference() Returns a set with the symmetric differences of two sets
symmetric_difference_update() Inserts the symmetric differences from this set and another
union() Return a set containing the union of sets
update() Update the set with another set, or any other iterable
'''

# Delete
del fruits_set

print(fruits_set)


# Demonstrate set operations on unique letters from two words
a = set('abracadabra')  # {'a', 'b', 'c', 'd', 'r'}
b = set('alacazam')  # {'a', 'c', 'l', 'm', 'z'}
a  # unique letters in a
a - b  # letters in a but not in b
a | b  # letters in a or b or both
a & b  # letters in both a and b
a ^ b  # letters in a or b but not both
