import sys
x = 5
print(x)

print(sys.path)

x = 0b10
print(bin(x))

# arthimetic operators : +,-,*,/,//,%,**
# no increment/decrement operators
# Python has a handy way of making big int's easier to read
# 4000000000 can be written as 4_000_000_000

#Division and Modulus
10 / 4  # classic division returns a float
10 // 4  # floor division discards the fractional part
10 % 4  # the % operator returns the remainder of the division
divmod(10, 4)
print(2--3)  # 5 2-(-3)
print(2++3)  # 5
print(2**3)  # 8

x = 2**3  # prints integer
x = pow(2, 3)  # same as above but if u use math.pow() it prints float

PI = 3.14  # there is no const/let everything variable can be modified
# by convention ALL CAPS variables are constants and shouldnt be modified
print(round(PI), 2)

x = input('x:')
# print(x+1) gives error bcoz python is a strongly typed language so no implicit type conversion
print(int(x)+1)

birth_day = int(input("enter ur date of birth"))
ans = 2022-birth_day
print("your age is " + str(ans))
# falsy values - "",[],0, None(like null)

# In interactive mode, the last printed expression is assigned to the variable _.
tax = 23
price = 60
price*tax  # this value is assigned to _ as no variablw is used
# print(price+_)
