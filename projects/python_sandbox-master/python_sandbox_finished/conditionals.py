# If/ Else conditions are used to decide to do something based on something being true or false

x = 21
y = 20

# Comparison Operators (==, !=, >, <, >=, <=) - Used to compare values

# Simple if
if x > y:
    print(f'{x} is greater than {y}')

# If/else
if x > y:
    print(f'{x} is greater than {y}')
else:
    print(f'{y} is greater than {x}')

# elif
if x > y:
    print(f'{x} is greater than {y}')
elif x == y:
    print(f'{x} is equal to {y}')
else:
    print(f'{y} is greater than {x}')

# Nested if
if x > 2:
    if x <= 10:
        print(f'{x} is greater than 2 and less than or equal to 10')


# Logical operators (and, or, not) - Used to combine conditional statements

# and
if x > 2 and x <= 10:
    print(f'{x} is greater than 2 and less than or equal to 10')

# chaining comparison operator
if 2 < x <= 10:
    print(f'{x} is greater than 2 and less than or equal to 10')

# or
if x > 2 or x <= 10:
    print(f'{x} is greater than 2 or less than or equal to 10')

# not
if not x == y:
    print(f'{x} is not equal to {y}')

# ternary operator
age = 22
message = 'Eligible' if age >= 18 else 'not '

# Membership Operators (not, not in) - Membership operators are used to test if a sequence is presented in an object

numbers = [1, 2, 3, 4, 5]

#  in
if x in numbers:
    print(x in numbers)

# not in
if x not in numbers:
    print(x not in numbers)

z = " "
if not z.strip():  # not toggles the value , in javascript we use if(!z.strip())
    print("empty string")

# Identity Operators (is, is not) - Compare the object reference and not the value,
# but if they are actually the same object, with the same memory location:
person = {
    'first_name': 'John',
    'last_name': 'Doe',
    'age': 30
}

person2 = person  # similar to js object reference copy in js
person3 = person.copy()

print("is operator", person2 is person)  # compare only reference
print("== operator reference", person2 == person)  # compares reference
print("== operator value", person3 == person)  # compares value

# is
if person2 is person:
    print('person2 is person')

# is not
if person3 is not person:
    print('person3 is not person')

if x > 1:
    pass  # if the block has to be empty and no code
else:
    print("empty if block")
