//var has function scoping use IIFE to convert it into block scoping
//dont use arguments object inside arrow function use spread operator instead
let a = (...arg) => console.log(arg)
a(2, 3, 4)

if (connected) {
    login();
}
connected && login();

//caching array length for large arrays
var length = array.length;
for (var i = 0; i < length; i++) {
    console.log(array[i]);
}
//OR
for (var i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}

//Getting the Last Item in the Array
var array = [1, 2, 3, 4, 5, 6];
console.log(array.slice(-1)); // [6]
console.log(array.slice(-2)); // [5,6]

function flatten(arr) {
    const result = []

    arr.forEach((i) => {
        if (Array.isArray(i)) {
            result.push(...flatten(i))
        } else {
            result.push(i)
        }
    })

    return result
}

// Usage
const problem = [1, 2, 3, [4, 5, [6, 7], 8, 9]]

flatten(problem) // [1, 2, 3, 4, 5, 6, 7, 8, 9]


//Counting instances of values in an object
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
    if (name in allNames) {
        allNames[name]++;
    }
    else {
        allNames[name] = 1;
    }
    return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

//Grouping objects by a property
var people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }


//Remove duplicate items in array
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
        accumulator.push(currentValue);
    }
    return accumulator
}, [])
console.log(myOrderedArray);
//better way
console.log([...new Set(myArray)]);


//Running Promises in Sequence
function runPromiseInSequence(arr, input) {
    return arr.reduce(
        (promiseChain, currentFunction) => promiseChain.then(currentFunction),
        Promise.resolve(input)
    );
}

// promise function 1
function p1(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 5);
    });
}

// promise function 2
function p2(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 2);
    });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
    return a * 3;
}

// promise function 4
function p4(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 4);
    });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log);   // 1200

//getter and setter
var language = {
    get tarak() {
        return "hi";
    },
    set current(name) {
        this.log.push(name);
    },
    log: []
}

language.current = 'EN';
language.current = 'FA';
console.log(language.current);//['EN','FA']

//var vs let
//function scoping vs block scoping
//var gets hoisted only defination and not value
//variable defined with var can be 
var x = function () {
    if (true) {
        console.log(x) //undefined
        console.log(c) //reference error | c is not defined
        var x = 9;
        let c = 7;
    }
    console.log(x) //9
    console.log(c) //reference error | c is not defined
}

//null vs undefined
typeof null - object
typeof undefined - undefined
//null is assigned by us but undefined is assigned by javascript

//lexical scoping - any variable declared in the outside scope is automatically available in the inside scope without passing

//closure
let f;
if (true) {
    let i = 0;
    f = () => {
        console.log(i)
    }
}

f()//1 even though variable i has to be deleted after the execution it doesn't get deleted because it's
// reference is held by function f

//IIFE creates a block scope. we can replace IIFE with {}
