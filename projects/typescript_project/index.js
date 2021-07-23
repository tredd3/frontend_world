//The goal of TypeScript is to be a static typechecker for JavaScript programs - in other words, a tool that runs before your
// code runs (static) and ensures that the types of the program are correct (typechecked), lowering the chance of bugs
//JavaScript only truly provides dynamic typing - running the code to see what happens.
//apart from type check, typescript also catches and reports logic,typo and uncalled function errors
//Unlike C++, TypeScript uses postfix types, like so: x: string instead of string x.
//js primitives can be used as types : boolean, bigint, null, number, string, symbol, and undefined
// TypeScript extends this list with a few more, such as object, any (allow anything), void (a function which returns undefined or has no return value).
//TypeScript is a structural type system, i.e it infers type based on the structure and not mandatory to declare type to a structure
//e.g If the object or class has all the required properties, TypeScript will say they match, regardless of the implementation details.
function tarak(a) {
    console.log(a + 3);
}
tarak("");
var rx = { x: 1 };
//rx.x = 12; // error
//const cannot prevent array from getting modified
var a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; //
//ReadonlyArray<T> type that removes side-affecting methods and prevents writing to indices of the array
var c = [1, 2, 3];
var b = [1, 2, 3];
// c.push(102); // error
// b[0] = 101; // error
function deleteUser(user) {
    console.log(34);
    //return 34;
}
function createElement(tagName) {
    return document.createElement(tagName);
}
function getLength(obj) {
    return obj.length;
}
function getLength1(obj) {
    return obj.length;
}
////generics
//T[]	mutable arrays, also written Array<T>
//arrow functions
var fst1 = function (a, b) { return a; };
// or more precisely:
var fst = function (a, b) { return a; };
// object is a string, because we declared it above as the variable part of Backpack.
var object = backpack.get();
//TypeScript can usually infer type arguments from a call based on the type of the arguments, so type arguments are usually not needed.
//Type parameters should only be used to propagate type information, such as constraining parameters or return value to be the same type
function firstish(t1, t2) {
    return t1.length > t2.length ? t1 : t2;
}
////functional programming types
//The extra property doesn’t prevent assignment, it just makes it a subtype of { x: string }.
var o = { x: "hi", extra: 1 }; // ok
var o2 = o; // ok
// let s = "right";
// pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'
var s = "right";
pad("hi", 10, s);
//never type - function will never return a value it fails inbetween
//void type - fucntion returns undefined
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
//unknown type - safe alternative to any
//TypeScript won't let us perform arbitrary operations on values of type unknown unlike any
var value;
// value.foo.bar;  // Error
// value.trim();   // Error
// value();        // Error
var value1;
value1.foo.bar; // OK
value1.trim(); // OK
value1(); // OK
//Instead, we have to perform some sort of type checking first to narrow the type of the value we're working with.
function stringifyForLogging(value) {
    if (typeof value === "function") {
        return "function";
    }
    if (value instanceof Date) {
        // Within this branch, `value` has type `Date`,
        // so we can call the `toISOString` method
        return value.toISOString();
    }
    return String(value);
}
