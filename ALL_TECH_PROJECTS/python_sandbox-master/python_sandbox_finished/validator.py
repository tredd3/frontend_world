# Example of a custom module to be imported

import re
variable = 90


def validate_email(email):
    if len(email) > 7:
        print("if print")  # if print
        return bool(re.match("^.+@(\[?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email))

    print("function print")  # function print


class User:
    def test(self):
        return "hey"


if __name__ == "__main__":
    print("Executed when invoked directly")
    # If script is getting imported by some other module at that time __name__ will be module name.
else:
    print("Executed when imported")
