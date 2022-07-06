from pathlib import Path

path = Path()  # current directory

print(dir(path.glob('*.py')))

for file in path.glob('*.py'):  # generator object
    print(file)
