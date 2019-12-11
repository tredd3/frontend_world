/* Stacks! */

// functions: push, pop, peek, length

var letters = []; // this is our stack

var word = "freeCodeCamp"

var rword = "";

// put letters of word into stack
for (var i = 0; i < word.length; i++) {
    letters.push(word[i]);
}

// pop off the stack in reverse order
for (var i = 0; i < word.length; i++) {
    rword += letters.pop();
}

if (rword === word) {
    console.log(word + " is a palindrome.");
}
else {
    console.log(word + " is not a palindrome.");
}

//push and pop removes the element from the end of the array
//shift() method removes the first item of an array and shift() and The unshift() method adds new items to the beginning of an array
//for stack implementation using array push and unshift should take ONLY one param 
function reverseString(str) {
    let arr = str.split('');
    for (var i = 0; i < (arr.length) / 2; i++) {
        var x = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = x;
    }
    return arr.join('');
}
// Creates a stack
var Stack = function () {
    this.count = 0;
    this.storage = {};//can be array or linked list

    // Adds a value onto the end of the stack
    this.push = function (value) {
        this.storage[this.count] = value;
        this.count++;
    }

    // Removes and returns the value at the end of the stack
    this.pop = function () {
        if (this.count === 0) {
            return undefined;
        }

        this.count--;
        var result = this.storage[this.count];
        delete this.storage[this.count];
        //The delete keyword deletes both the value of the property and the property itself.
        //
        //he delete operator is designed to be used on object properties. It has no effect on variables or functions
        return result;
    }

    this.size = function () {
        return this.count;
    }

    // Returns the value at the end of the stack
    this.peek = function () {
        return this.storage[this.count - 1];
    }
}

var myStack = new Stack();

myStack.push(1);
myStack.push(2);
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
myStack.push("freeCodeCamp");
console.log(myStack.size());
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
