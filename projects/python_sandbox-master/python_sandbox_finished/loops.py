# A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).

people = ['John', 'Paul', 'Sara', 'Susan']

# Simple for loop
for person in people:
    print(f'Current Person: {person}')

for x in "Person":
    print(x)

# Break
for person in people:
    if person == 'Sara':
        print(f'Current Person: {person}')  # belongs to if and gets printed
        break
    # belongs to for and DOESN'T gets printed
    print(f'Current Person: {person}')
print('outside loop')  # doesn't belong to for and gets printed

# Continue
for person in people:
    if person == 'Sara':
        continue
    print(f'Current Person: {person}')

# for else
names = ['Ajohn', 'marry']
for name in names:
    if name.startswith("J"):
        print("found")
        break
else:  # else block gets executed if for loop iterates on all the values of iterable without break
    print("not found")


# range - range fn returns a range object and not a list. range object is an iterable just like string and lsit
#  also it is an instance of range class
for i in range(len(people)):
    print(people[i])

for i in range(1, 11):  # 1 is included and 11 is excluded
    print(f'Number: {i}')

# While loops execute a set of statements as long as a condition is true.

count = 0
while count < 10:
    print(f'Count: {count}')
    count += 1

answer = 0
# while else
while answer < 10:
    answer += 1
    # if answer > 10:
    #     break
    print("got it")
else:
    print("while execulted without break, i.e till the condition is false")
