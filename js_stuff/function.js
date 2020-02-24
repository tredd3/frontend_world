//function expression
//by default function returns undefined
var notHoisted = function () {
    console.log('bar');
}; //anonymous function

var notHoisted = function tar() {
    console.log('bar');
}; //named function

var foo = function () { }
foo.name // "foo"

var foo2 = foo
foo2.name // "foo"

var bar = function tar() { }
bar.name // "tar"


function factorial(n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}
[1, 2, 3, 4, 5].map(factorial);

[1, 2, 3, 4, 5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});


//properies and methods
//Function.prototype.length - Specifies the number of arguments expected by the function
function func1() { }  // console.log(func1.length); expected output: 0
function func2(a, b) { }  //console.log(func2.length); expected output: 2
//Function.prototype.name - The name of the function
//mehods - bind, call and apply methods


//Arrow function expressions
//cannot be used as constructors and generators
var Foo = () => { };
var foo = new Foo(); // TypeError: Foo is not a constructor
console.log(Foo.prototype); // they do not have a prototype property.
//doesn't have own this, arguments(use ...args)
function foo(n) {
    var f = () => arguments[0] + 1; // points to foo's arguments[0] is n
    return f();
}
function foo(n) {
    var f = (...args) => args[0] + n;
    return f(10);
}
//while searching for this which is not present in current scope, an arrow function ends up finding the this from its enclosing scope.
var x = () => { }

//call() and apply() can only pass in parameters. Any this argument is ignored.
//arrow function expressions are best suited for non-method functions
var obj = { // does not create a new scope
    i: 10,
    b: () => console.log(this.i, this),
    c: function () {
        console.log(this.i, this);
    }
}

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 10, Object {...}

let callback;
callback = callback || function () { }; // ok
//callback = callback || () => { }; // SyntaxError: invalid arrow-function arguments
callback = callback || (() => { });    // ok