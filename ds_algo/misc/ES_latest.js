//https://www.freecodecamp.org/news/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e/

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

//thumb rules for async-await 
// 1)await only blocks the execution of the next lines of code in an async function and doesn’t 
// affect the promise execution.
// 2)async functions return a promise (implicit promise where the return value of the fn is a resolved value)
// 3)There can be multiple await statements within a single async function.
// 4)When using async await, make sure to use try catch for error handling.
// 5)If you want to await multiple promises (run this promise in parallel) create an array of promises and then pass it to the Promise.all function.

// Every function that returns a promise can be considered as async function
// await is used for calling an async function and waits for it to resolve or reject.
// Instead of creating huge async functions with many await asyncFunction() in it, it is better
//to create smaller async functions with lesser await statements for function to avoid blocking

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
arr.flat(Infinity)

//The trimStart() method removes whitespace from the beginning of a string.
var str = "   hello    ";
str.trimStart() // "hello    "
//The trimEnd() method removes whitespace from the end of a string.
str.trimEnd() // "   hello"


//use catch without params
try {
    a = await doubleAfter1Sec(a);
    b = await doubleAfter1Sec(b);
} catch {
    return NaN; //return something
} finally {
    console.log("This is done");
}