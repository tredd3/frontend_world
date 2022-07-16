'''
Python has (at least) two distinguishable kinds of errors:
syntax errors and exceptions.

Syntax errors: Also known as parsing errors, are perhaps the
most common kind of complaint you get while you are still learning Python.

Exceptions: Errors detected during execution are called exceptions and are not
unconditionally fatal: you will soon learn how to handle them in Python programs.

# Here are all of Pythons built-in exception
ArithmeticError Raised when an error occurs in numeric calculations
AssertionError Raised when an assert statement fails
AttributeError Raised when attribute reference or assignment fails
Exception Base class for all exceptions
EOFError Raised when the input() method hits an "end of file" condition (EOF)
FloatingPointError Raised when a floating point calculation fails
GeneratorExit Raised when a generator is closed (with the close() method)
ImportError Raised when an imported module does not exist
IndentationError Raised when indentation is not correct
IndexError Raised when an index of a sequence does not exist
KeyError Raised when a key does not exist in a dictionary
KeyboardInterrupt Raised when the user presses Ctrl+c, Ctrl+z or Delete
LookupError Raised when errors raised cant be found
MemoryError Raised when a program runs out of memory
NameError Raised when a variable does not exist
NotImplementedError Raised when an abstract method requires an inherited class to override the method
OSError Raised when a system related operation causes an error
OverflowError Raised when the result of a numeric calculation is too large
ReferenceError Raised when a weak reference object does not exist
RuntimeError Raised when an error occurs that do not belong to any specific expections
StopIteration Raised when the next() method of an iterator has no further values
SyntaxError Raised when a syntax error occurs
TabError Raised when indentation consists of tabs or spaces
SystemError Raised when a system error occurs
SystemExit Raised when the sys.exit() function is called
TypeError Raised when two different types are combined
UnboundLocalError Raised when a local variable is referenced before assignment
UnicodeError Raised when a unicode problem occurs
UnicodeEncodeError Raised when a unicode encoding problem occurs
UnicodeDecodeError Raised when a unicode decoding problem occurs
UnicodeTranslateError Raised when a unicode translation problem occurs
ValueError Raised when there is a wrong value in a specified data type
ZeroDivisionError Raised when the second operator in a division is zero
'''
import math

# You will get ValueError with mathematical operations in math module
math.sqrt(-10)  # gives u ValueError


def num_stats(x):
    if x is not int:
        raise TypeError('Work with Numbers Only')
    if x < 0:
        raise ValueError('Work with Positive Numbers Only')

    print(f'{x} square is {x * x}')
    print(f'{x} square root is {math.sqrt(x)}')


name = 'Imtiaz Abedin'
try:
    # Write the suspicious block of code
    print(name[15])
except AssertionError:  # Catch a single exception
    # This block will be executed if exception A is caught
    print('AssertionError')
except (EnvironmentError, SyntaxError, NameError) as E:  # catch multiple exception
    # This block will be executed if any of the exception B, C or D is caught
    print(E)
except:
    print('Exception')
    # This block will be executed if any other exception other than A, B, C or D is caught
else:
    # If no exception is caught, this block will be executed
    pass
finally:
    # whether any exception is caught or not, the finally block will be executed.
    pass


# custom exception
class UnderAge(Exception):
    pass


def verify_age(age):
    if int(age) < 18:
        raise UnderAge
    else:
        print('Age: '+str(age))


# main program
verify_age(23)  # won't raise exception
verify_age(17)  # will raise exception
