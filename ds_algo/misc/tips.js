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

//why NAN!==NAN? NaN is often the result of meaningless math computations, so two NaN values make no sense to be considered equal.

//https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420
//class syntax is just a syntactical sugar for prototypical inheritance and there is no class inheritance in js
//methods and properties in prototype object are shared by instances and hence memory efficient

class Animal {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }

    eat() {
        return `${this.name} is eating!`;
    }

    sleep() {
        return `${this.name} is going to sleep!`;
    }

    wakeUp() {
        return `${this.name} is waking up!`;
    }

}

class Gorilla extends Animal {
    constructor(name, weight) {
        super(name, weight);
    }

    climbTrees() {
        return `${this.name} is climbing trees!`;
    }

    poundChest() {
        return `${this.name} is pounding its chest!`;
    }

    showVigour() {
        return `${super.eat()} ${this.poundChest()}`;
    }

    dailyRoutine() {
        return `${super.wakeUp()} ${this.poundChest()} ${super.eat()} ${super.sleep()}`;
    }

}

function display(content) {
    console.log(content);
}

const gorilla = new Gorilla('George', '160Kg');
display(gorilla.poundChest());
display(gorilla.sleep());
display(gorilla.showVigour());
display(gorilla.dailyRoutine());

function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
}

Animal.prototype.eat = function () {
    return `${this.name} is eating!`;
}

Animal.prototype.sleep = function () {
    return `${this.name} is going to sleep!`;
}

Animal.prototype.wakeUp = function () {
    return `${this.name} is waking up!`;
}


function Gorilla(name, weight) {
    Animal.call(this, name, weight);
}

Gorilla.prototype = Object.create(Animal.prototype);
Gorilla.prototype.constructor = Gorilla;

Gorilla.prototype.climbTrees = function () {
    return `${this.name} is climbing trees!`;
}

Gorilla.prototype.poundChest = function () {
    return `${this.name} is pounding its chest!`;
}

Gorilla.prototype.showVigour = function () {
    return `${Animal.prototype.eat.call(this)} ${this.poundChest()}`;
}

Gorilla.prototype.dailyRoutine = function () {
    return `${Animal.prototype.wakeUp.call(this)} ${this.poundChest()} ${Animal.prototype.eat.call(this)} ${Animal.prototype.sleep.call(this)}`;
}

function display(content) {
    console.log(content);
}

var gorilla = new Gorilla('George', '160Kg');
display(gorilla.poundChest());
display(gorilla.sleep());
display(gorilla.showVigour());
display(gorilla.dailyRoutine());

//event model in js
var event = new Event('build');
// Listen for the event.
elem.addEventListener('build', function (e) { /* ... */ }, false);
// Dispatch the event.
elem.dispatchEvent(event);

//Adding custom data - This will then allow you to access the additional data in the event listener
var event = new CustomEvent('build', { detail: elem.dataset.time });
function eventHandler(e) {
    console.log('The time is: ' + e.detail);
}

//event capturing => event target => event bubbling
//all the browsers execute the event handlers in the event bubbling phase
//if the event handler needs to be executed in the capturing phase we need to pass true as a 2nd param to addeventlistener function
//event.target (element that triggered the event)vs event.currentTarget (element on which event handler is attached)
//what is Event delegation (add an event listener to the  parent, and clicking on any child the event gets bubbled to parent and the parent event handler gets executed) 
//why it is important? - web performance - we can avoid attaching multiple event listeners to the children 
//e.stopPropagation() - stops the event bubbling on the parent (vertical)
//e.stopImmediatePropagation() -  execute the first event handler, and stop the rest of the event handlers from being executed
