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

//reverse items in a stack using recursion
function reverse() {
    if (st.size() > 0) {
        var x = st.top();
        st.pop();
        reverse();
        insert_at_bottom(x);
    }
}

function insert_at_bottom(x) {

    if (st.size() == 0) {
        st.push(x);
    } else {
        var a = st.top();
        st.pop();
        insert_at_bottom(x);

        // push allthe items held in  
        // Function Call Stack 
        // once the item is inserted 
        // at the bottom 
        st.push(a);
    }
}


//reverse items in a stack without using extra space
//Reverse a stack would require a reversing a linked list which can be done with O(n) time and O(1) extra space.