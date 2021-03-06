//https://www.freecodecamp.org/news/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e/
//https://carloscaballero.io/es2020-features-in-simple-examples/

//******** ES 2017 **************
Exponentiation - 2 ** 7  //before Math.pow(2,7) 
//Object is not iterable so Object.entries return iterable
let data = {
    "King": "Jon Snow",
    "Queen": "Daenerys Targaryen",
    "Hand": "Tyrion Lannister"
}
var entries = Object.entries(data);
console.log(entries)
// [["King","Jon Snow"],["Queen","Daenerys Targaryen"],["Hand","Tyrion Lannister"]]
for (let [key, val] of Object.entries(data)) {
    console.log(key + val)
}

//Object.fromEntries() - reverse of Object.entries
var obj = Object.fromEntries(entries) //It will accept only Map or Array
console.log(obj)
// {
//     "King": "Jon Snow",
//     "Queen": "Daenerys Targaryen",
//     "Hand": "Tyrion Lannister"
// }


console.log(Object.values(data)) // before Object.keys(data).map(key=>data[key])
//["Jon Snow","Daenerys Targaryen","Tyrion Lannister"]'

String.prototype.padStart(maxLength, fillString)
'a'.padStart(5, 'xy') //'xyxya'
"art".padStart(6, 0) //'000art'

//object literals, array literals and function parameters allow a trailing comma
let obj = {
    first: 'Naruto',
    last: 'Uzumaki',
}

let array = [
    'red',
    'green',
    'blue',
]

function killAllMonsters(
    hero,
    weapons,
)

// Async functions themselves return a Promise!
//An async function can contain an await expression that pauses the execution of the async
//function and waits for the passed Promise's resolution, and then resumes the async function's 
//execution and returns the resolved value
async function doubleAndAdd(a, b) {
    //Notice that I'm using Promise. all to execute all the promises parallely without waiting for the other
    //Also notice the use of Array destructuring to capture the result
    [a, b] = await Promise.all([doubteAfter1Sec(a), doubteAfter1Sec(b)]);
    return a + b;//a and b are resolved values of the promises
}

doubleAndAdd(1, 2).then(console.log);
function doubteAfter1Sec(param) {
    return new Promise(resolve => {
        setTimeout(resolve(param * 2), 1000);
    });
}

//error handling in async and await
//method1:
async function doubleAndAdd(a, b) {
    try {
        a = await doubleAfter1Sec(a);
        b = await doubleAfter1Sec(b);
    } catch (e) {
        return NaN; //return something
    } finally {
        console.log("This is done");
    }
    return a + b;
}
doubleAndAdd('one', 2).then(console.log); // NaN

//method2:
async function doubleAndAdd(a, b) {
    a = await doubleAfter1Sec(a).catch(e => console.log('"a" is NaN')); // 
    b = await doubleAfter1Sec(b).catch(e => console.log('"b" is NaN')); // 
    if (!a || !b) {
        return NaN;
    }
    return a + b;
}

doubleAndAdd('one', 2).then(console.log); // NaN

//method3
doubleAndAdd('one', 2).then(console.log).catch(console.log);

function doubleAfter1Sec(param) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let val = param * 2;
            isNaN(val) ? reject(NaN) : resolve(val);
        }, 1000);
    });
}

//using  await in a loop
//wrong way: as we are blocking api calls even though they are standalone
async function fetchUserDetailsWithStats() {
    for (name of ["nkgokul", "BrendanEich", "gaearon"]) {
        userDetails = await fetch("https://api.github.com/users/" + name);
        userDetailsJSON = await userDetails.json();
    }
}

//right way
async function fetchSingleUsersDetailsWithStats(name) {
    userDetails = await fetch("https://api.github.com/users/" + name);
    userDetailsJSON = await userDetails.json();
    return userDetailsJSON;
}

async function fetchAllUsersDetailsParallelyWithStats() {
    let singleUsersDetailsPromises = [];
    for (name of ["nkgokul", "BrendanEich", "gaearon"]) {
        let promise = fetchSingleUsersDetailsWithStats(name);
        singleUsersDetailsPromises.push(promise);
    }
    let allUsersDetails = await Promise.all(singleUsersDetailsPromises);
    console.log(allUsersDetails); //array of resolved values or user details objects
}

//******** ES 2018 **************
//1)shared memory amon main thread and workers
// This is done by a new type of a global object called SharedArrayBuffer that essentially stores data in a 
// shared memory space. So this data can be shared between the main JS thread and web-worker threads.
// Until now, if we want to share data between the main JS thread and web-workers, we had to copy the 
// data and send it to the other thread using postMessage . Not anymore!
//But sharing memory between threads can cause race conditions. To help avoid race conditions,
//the “Atomics” global object is introduced. Atomics provides various methods to lock the shared memory 
// when a thread is using its data. It also provides methods to update such data in that shared memory safely.

/first.second/.test('first\nsecond'); //false
/first.second/s.test('first\nsecond'); //true

//Object destructuring via rest
var { a, b, ...c } = {
    a: 2,
    b: 3,
    d: 5,
    e: "jasg",
    f: false
}
//a:2, b:3, c:{d: 5,e: "jasg",f: false}

//Object restructuring via spread
var x = { name: "tar", age: 3 }
var y = { c: "tar", d: 3 }
var z = { ...x, ...y }
z = { name: "tar", age: 3, c: "tar", d: 3 }

//Asynchronous Iteration
//Basically it allows us to create loops of async code with ease!
var promisesArray = [new Promise(resolve => setTimeout(() => resolve(1), 10000)),
new Promise(resolve => setTimeout(() => resolve(2), 5000)),
new Promise(resolve => setTimeout(() => resolve(3), 1000))]

async function test1() {
    for (const promise of promisesArray) {
        console.log(promise) //promise obj
        console.log(await promise)
    }
}

async function test2() {
    var i = 0;
    for await (const promiseValue of promisesArray) {
        console.log(promiseValue) //promise obj value
        i++;
        console.log(i)
    }
}


//******** ES 2019 **************
var arr = [1, 2, [3, 4, 5, [5, 7, 8, [3, 4, 5]]]]
arr.flat()//1,2,3,4,5,Array(4)
arr.flat().flat()
arr.flat(Infinity) // for unknown level of nesting
const arr = ["it's Sunny in", "", "California"];
arr.flatMap(x => x.split(" ")); //first it applies map fn and then does a flat for depth of 1 level
// ["it's","Sunny","in", "", "California"]

//The trimStart() method removes whitespace from the beginning of a string.
var str = "   hello    ";
str.trimStart() // "hello    "
//The trimEnd() method removes whitespace from the end of a string.
str.trimEnd() // "   hello"
//The trim() method removes whitespace from both sides of a string.
str.trim() // "hello"
//polyfill code
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/gm, '');
    };
}

//use catch without params
try {
    a = await doubleAfter1Sec(a);
    b = await doubleAfter1Sec(b);
} catch {
    return NaN; //return something
} finally {
    console.log("This is done");
}

//dynamic import tags
import('..my-path/my-module.js').then((module) => {
    module.default();
    module.doSomething();
    // ...
});
or

    (async () => {
        const module = await import('..my-path/my-module.js')
        module.default();
        module.doSomething();
        // ...
    })();


//decorators - HOCs and function composition 
//https://www.sitepoint.com/javascript-decorators-what-they-are/
//The decorator proposal adds support for class and property decorators that can be used to resolve these issues, and future JavaScript versions will probably add decorator support for other troublesome areas of code.
//https://www.telerik.com/blogs/decorators-in-javascript

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_Coalescing_Operator
//https://medium.com/better-programming/stop-using-objects-as-hash-maps-in-javascript-9a272e85f6a8

//property intializers vs autobind decorartor
//The initialization of arrow functions in class properties are transpiled into the constructor.
//use autobind decorartor to add the method in the prototype
//Arrow functions in class properties won’t be in the prototype and we can’t call them with super.
class A {
    static color = "red";
    counter = 0;

    handleClick = () => {
        this.counter++;
    }

    handleLongClick() {
        this.counter++;
    }

}

class A {
    constructor() {
        this.counter = 0;

        this.handleClick = () => {
            this.counter++;
        };
    }

    handleLongClick() {
        this.counter++;
    }
}
A.color = "red";

class Component {
    constructor(value) {
        this.value = value;
    }

    @autobind
    method() {
        return this.value;
    }
}


//******** ES 2020 **************
//https://www.freecodecamp.org/news/javascript-new-features-es2020/
//BigInt - allows developers to have much greater integer representation in their JS code for data processing for data handling.
//Dynamic import supported by browsers - now u don't need module bundlers for code splitting
//Nullish Coalescing operator (??) - checks for either undefined or null
//Optional Chaining(?.) -  allows you to access deeply nested object properties without worrying if the property exists or not
//Promise.allSettled - Promise.allSettled method accepts an array of Promises and only resolves when all of them are settled – either resolved or rejected.
//globalThis which always refers to the global object, no matter where you are executing your code
//This is because it is window for browsers, global for Node, and self for web workers.
//Module Namespace Exports
export * as utils from './utils.mjs'
//This is equivalent to the following:

import * as utils from './utils.mjs'
export { utils }
//import.meta - You can access meta information about the module using the import.meta object:
<script type="module" src="module.js"></script>
//code inside module.js file is below:
console.log(import.meta); // { url: "file:///home/user/module.js" }
//It returns an object with a url property indicating the base URL of the module. This will either be the URL from which the 
//script was obtained (for external scripts), or the document base URL of the containing document (for inline scripts).

//******** ES 2021 **************
//https://blog.logrocket.com/new-es2021-features-you-may-have-missed/
//https://backbencher.dev/javascript/es2021-new-features
//logical assignment operators (&&=, ||=, and ??=)
var x = 1;
var y = 2;
x &&= y;
console.log(x); // 1
//Here line 3 can be expanded like: 
x && (x = y) //Since x is a truthy value, it is assigned with the value of y, ie 2.
//Numeric separator
//String.replaceAll
//Promise.any - the resultant promise keeps waiting and gets resolved if atleast one promise gets resolved and it gets rejected only if all the promises get rejected
//What if none of the promises resolve? In that case Promise.any() throws an AggregateError exception. We need to catch it and handle it.

//WeakRef - better to avoid
//WeakRef creates a weak reference to the the object passed to it.
//This means that whenever the browser needs to run garbage collection, if the only reference to that object is from a WeakRef variable,
//the JavaScript engine can safely remove the object from memory and free up space. This could be ideal for WebSocket data because of their short lifespans.
//Finalizers - FinalizationRegistry is a companion feature of WeakRef. 
//It lets programmers register callbacks, which gets invoked after an object is garbage collected.