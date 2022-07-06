# A function is a block of code which only runs when it is called. In Python, we do not use curly brackets, we use indentation with tabs or spaces


# Create function
def sayHello(name='Sam'):
    print(f'Hello {name}')


# Return values
def getSum(num1, num2):
    total = num1 - num2
    return total


print(getSum(3, num2=10))  # num2 is called keyword arguments (name=value)

# A lambda function is a small anonymous function.
# A lambda function can take any number of arguments, but can only have one expression. Very similar to JS arrow functions

# x = lambda a : a + 10
# print(x(5))


# def increment(number: int, by: int = 20) -> tuple:
#     return (number, number+by)

# print(increment(10))

# variable number of arguments
def multiply(*args):  # args is a tuple
    total = 1
    for num in args:
        total *= num
    return total


print(multiply(1, 2, 3, 4, 5, 6, 7))


def user_pref(**user):  # user here is a dictionary
    print(user)


print(user_pref(id=1, name='tarak'))  # keyword  arguments
# when using a mix of positional and keyword arguments, always use positional args prior to keyword args
