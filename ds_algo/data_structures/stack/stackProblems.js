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

//reverse a number
function reversDigits(num) {
    var rev_num = 0;
    while (num > 0) {
        rev_num = rev_num * 10 + num % 10;
        num = num / 10;
    }
    return rev_num;
}

//reverse a number using recursion
function reversDigits(num) {
    var rev_num = 0;
    var base_pos = 1;
    if (num > 0) {
        reversDigits(num / 10);
        rev_num += (num % 10) * base_pos;
        base_pos *= 10;
    }
    return rev_num;
}

//https://www.geeksforgeeks.org/expression-evaluation/

//next greater element in an array
function printNGE(arr, n) {
    stack < int > s;

    /* push the first element to stack */
    s.push(arr[0]);

    // iterate for rest of the elements 
    for (let i = 1; i < n; i++) {

        if (s.empty()) {
            s.push(arr[i]);
            continue;
        }

        /* if stack is not empty, then 
           pop an element from stack. 
           If the popped element is smaller 
           than next, then 
        a) print the pair 
        b) keep popping while elements are 
        smaller and stack is not empty */
        while (s.empty() == false && s.top() < arr[i]) {
            cout << s.top() << " --> " << arr[i] << endl;
            s.pop();
        }

        /* push next to stack so that we can find 
        next greater for it */
        s.push(arr[i]);
    }

    /* After iterating over the loop, the remaining 
    elements in stack do not have the next greater 
    element, so print -1 for them */
    while (s.empty() == false) {
        cout << s.top() << " --> " << -1 << endl;
        s.pop();
    }
}