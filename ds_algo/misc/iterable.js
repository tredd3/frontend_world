function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
myFunction(...args); //can be used instead of apply

var obj = { 'key1': 'value1' };
var array = [...obj]; // TypeError: obj is not iterable

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2]; //append arrays

//rest is opposite of spread
function myFun(a, b, ...manyMoreArgs) { //only last param can be a rest param
    console.log("a", a);
    console.log("b", b);
    console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");

//arguments object vs rest parameters 
//1)arguments object contains all arguments passed to the function;
//2)the arguments object is not a real array, while rest parameters are Array instances, meaning
// methods like sort, map, forEach or pop can be applied on it directly;
//3)the arguments object has additional functionality specific to itself (like the callee property).

//convert an array like object to array
function f(a, b) {
    var normalArray = Array.prototype.slice.call(arguments);
    // -- or --
    var normalArray = [].slice.call(arguments);
    // -- or --
    var normalArray = Array.from(arguments);

    var first = normalArray.shift(); // OK, gives the first argument
    var first = arguments.shift(); // ERROR (arguments is not a normal array)
}

//Removing a property from an object immutably by destructuring it
//method:1
const userWithoutEmail = Object.assign({}, user);
delete userWithoutEmail.email;

//method:2
const {
    email,
    ...userWithoutEmail
} = user;

//method:3
const fieldToRemove = 'email';

const {
    [fieldToRemove]: removed,
    ...userWithoutEmail
} = user;
