//check for balanced parentheses
function checkBalancedParenthesis(input) {
    var stack = [];
    function charCheck(char) {
        switch (char) {
            case ')':
                return stack[stack.length - 1] === '(';
            case '}':
                return stack[stack.length - 1] === '{';
            case ']':
                return stack[stack.length - 1] === '[';
        }
    }
    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (!stack.length || !charCheck(char)) {
                return false;
            } else {
                stack.pop()
            }
        }
    }
    return !stack.length
}

//