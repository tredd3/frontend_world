# code to remove duplicates from list

def remove_duplicates(array):
    unique = []
    for num in array:
        if num not in unique:
            unique.append(num)
    return unique


constant = 90
