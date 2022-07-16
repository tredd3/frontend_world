# A function is a block of code which only runs when it is called. In Python, we do not use curly brackets, we use indentation with tabs or spaces

# Create function
def sayHello(name='Sam'):
    print(f'Hello {name}')


print(sayHello())  # bydefault functions return None


def getSum(num1, num2):
    total = num1 - num2
    return total


print(getSum(3, 10))
print(getSum(3, num2=10))  # num2 is called keyword arguments (name=value)
# when using a mix of positional and keyword arguments, always use positional args prior to keyword args
# print(getSum(num1=3, 10)) #SyntaxError: positional argument follows keyword argument
print(getSum(num1=13, num2=10))
# keyword arguments don't have to be assigned in a sequence
print(getSum(num2=13, num1=10))

# variable number of arguments


def multiply(*args):  # args is a tuple
    total = 1
    for num in args:
        total *= num
    return total
    # return total, 8 #it reurns a tuple (total,8)


print(multiply(1, 2, 3, 4, 5, 6, 7))


def user_pref(**user):  # user here is a dictionary
    print(user)


print(user_pref(id=1, name='tarak'))  # keyword  arguments

# function arguments


def standard_arg(arg):
    print(arg)


def pos_only_arg(arg, /):
    print(arg)


def kwd_only_arg(*, arg):
    print(arg)


def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)


'''
def combined_example(pos_only, /, standard, *, kwd_only):
                     --------     --------     ---------
                        |             |                 |
                        |        Positional or keyword  |
                        |                               |
                        -- Positional only              --Keyword only
'''
standard_arg(2)
pos_only_arg(2)
kwd_only_arg(arg=2)
combined_example(2, 2, kwd_only=2)
combined_example(2, standard=2, kwd_only=2)


############ A lambda function is a small anonymous function ############
# A lambda function can take any number of arguments, but can only have one expression. Very similar to JS arrow functions

# x = lambda a : a + 10
# print(x(5))


# def increment(number: int, by: int = 20) -> tuple:
#     return (number, number+by)

# print(increment(10))

############  match case similar to switch case and raise exception, python 3.10  ############
# def http_error(status):
#     match status:
#         case 401 | 402 | 403:
#             return "failed"
#         case 301:
#             raise TypeError("num error")
#         case _:
#             print("this is default case")
#             return "success"

# Patterns can look like unpacking assignments, and can be used to bind variables:
# point is an (x, y) tuple
# def http_error(point):
#     match point:
#         case(0, 0):
#             print("Origin")
#         case(0, y):
#             print(f"Y={y}")
#         case(x, 0):
#             print(f"X={x}")
#         case(x, y):
#             print(f"X={x}, Y={y}")
#         case _:
#             raise ValueError("Not a point")


# point_tuple = (0, 0)
# point_tuple = (0, 123)
