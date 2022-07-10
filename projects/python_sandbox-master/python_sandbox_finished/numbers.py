import sys
x = 5
print(x)

print(sys.path)

x = 0b10
print(bin(x))

# arthimetic operators : +,-,*,/,//,%,**
# no increment/decrement operators

x = 10/3
print(x)  # u get float/decimal

x = 10//3  # to get integer
print(x)

x = 2**3
x = pow(2, 3)  # same as above

PI = 3.14  # there is no const/let everything variable can be modified
# by convention ALL CAPS variables are constants and shouldnt be modified
print(round(PI))

x = input('x:')
# print(x+1) gives error bcoz python is a strongly typed language so no implicit type conversion
print(int(x)+1)

birth_day = int(input("enter ur date of birth"))
ans = 2022-birth_day
print("your age is " + str(ans))
# falsy values - "",[],0, None(like null)


# Interactive mode (terminal)
tax = 23
price = 60
price*tax  # this value is assigned to _ as no variablw is used
# print(price+_)
