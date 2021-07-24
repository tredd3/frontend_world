//The goal of TypeScript is to be a static typechecker for JavaScript programs - in other words, a tool that runs before your
// code runs (static) and ensures that the types of the program are correct (typechecked), lowering the chance of bugs by analysing your code
//JavaScript only truly provides dynamic typing - running the code to see what happens.
//apart from type check, typescript also catches and reports logic,typo and uncalled function errors
//Unlike C++, TypeScript uses postfix types, like so: x: string instead of string x.
//js primitives can be used as types : boolean, bigint, null, number, string, symbol, and undefined
// TypeScript extends this list with a few more, such as object, any (allow anything), void (a function which returns undefined or has no return value).
//TypeScript is a structural type system, i.e it infers type based on the structure and not mandatory to declare type to a structure
//e.g If the object or class has all the required properties, TypeScript will say they match, regardless of the implementation details.
//also typescript can infer types for variables and fn return values
//contextual typing - infer types based on the context in which the value occurs.
//e.g:
const names = ["Alice", "Bob", "Eve"];
// Contextual typing for function
//Even though the parameter s didn’t have a type annotation, TypeScript used the types of the forEach function, along with
// the inferred type of the array, to determine the type s will have.
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
//typechecking is optional even in a ts file
//e.g: function tarak has no type checking
function tarak(a) {
  console.log(a + 3);
}
tarak("");

interface User {
  name: string;
  adresses: object[];
  getname: () => void;
  id?: {
    readonly x: number;
    b: any;
    c: unknown;
    d; //if u don't specify the type it will be inferred as any
  } | null;
  result: 1 | 2 | 3;
}
//Readonly<T> that makes all properties readonly:
interface X {
  x: number;
}
let rx: Readonly<X> = { x: 1 };
//rx.x = 12; // error
//const cannot prevent array from getting modified
const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; //
//ReadonlyArray<T> type that removes side-affecting methods and prevents writing to indices of the array
let c: ReadonlyArray<number> = [1, 2, 3];
let b: readonly number[] = [1, 2, 3];
// c.push(102); // error
// b[0] = 101; // error

//as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead
//of a more general version like string or number.
//to know the difference how typescript has infered the types hover on req and req1
const req = { url: "https://example.com", method: "GET" } as const;
const req1 = { url: "https://example.com", method: "GET" as "GET" };

function deleteUser(user: User): void {
  console.log(34);
  //return 34;
}

function createElement(tagName: "img"): HTMLImageElement {
  return document.createElement(tagName);
}

////intersections
type Combined = { a: number } & { b: string };
//Combined type is an object structure with both a,b properties
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}
//Bear type is an object structure with both name and honey properties
type Fish = { swim: true };
type Bird = { swim: false };
type Human = Fish & Bird; //object type throws an error
type Human1 = Fish | Bird; //valid as swim property can have values true/false

////unions
//for APIs and success/failure scenarios
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
//recursively merges the types and gives the resultant type as
interface ValidationResult1 {
  isValid: false | true;
  reason: string | null;
}

//discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
function getArea(shape: Shape) {
  //return Math.PI * shape.radius ** 2; this will throw an error as square doesn't have radius property, hence narrowing is necessary
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
//more scalable way to avoid if conditions
function getArea1(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

function getLength(obj: string | string[]): void | number {
  return obj.length;
}

//better to extract unions
type arg = string | string[];
type returnValue = void | number;
function getLength1(obj: arg): returnValue {
  return obj.length;
}

//TypeScript will only allow you to do things with the union if that thing is valid for every member of the union.
//For example, if you have the union string | number, you can’t use methods that are only available on string:
//soln: narrow down the type check and u an use the methods accordingly
function printId(id: number | string | boolean) {
  //console.log(id.toUpperCase());
  //the above console will throw error because toUpperCase method exists on string and not on number
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

////generics
//T[]	mutable arrays, also written Array<T>
//arrow functions
let fst1: (a: any, b: any) => any = (a, b) => a;
// or more precisely:
let fst: <T, U>(a: T, b: U) => T = (a, b) => a;
declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];

type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
interface Backpack<T, U> {
  add: (obj: T) => void;
  get: () => U;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string, number>;

// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();

//TypeScript can usually infer type arguments from a call based on the type of the arguments, so type arguments are usually not needed.
//Type parameters should only be used to propagate type information, such as constraining parameters or return value to be the same type
function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}

//interface vs type alias - interface is recommended to use for object type
//An interface declaration is another way to name an object type:
//type alias - union and intersection of types, general types etc
//both interface and type alias names start with Capital letter and the can be reused
////1)Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).
// These two declarations become:
// interface Point { x: number; y: number; }
interface Point {
  x: number;
}
interface Point {
  y: number;
}
////2)better error message by ts compiler
////3)Because TypeScript is a structural type system, it's possible to intermix their use too.
//Interface extends interface
interface PartialPointX1 {
  x: number;
}
interface Point1 extends PartialPointX1 {
  y: number;
}
//Type alias extends type alias
type PartialPointX2 = { x: number };
type Point2 = PartialPointX2 & { y: number };
//Interface extends type alias
type PartialPointX3 = { x: number };
interface Point3 extends PartialPointX3 {
  y: number;
}
//Type alias extends interface
interface PartialPointX4 {
  x: number;
}
type Point4 = PartialPointX4 & { y: number };
//more on types
type LockStates = "locked" | "unlocked" | 9; //union of diff types meaning LockStates can have only 3 possible values

////functional programming types
//The extra property doesn’t prevent assignment, it just makes it a subtype of { x: string }.
let o = { x: "hi", extra: 1 }; // ok
let o2: { x: string } = o; // ok

declare function pad(s: string, n: number, direction: "left" | "right"): string;
// let s = "right";
// pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'
let s: "left" | "right" = "right";
pad("hi", 10, s);

//never type - function will never return a value it fails inbetween
//void type - fucntion returns undefined
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

//unknown type - safe alternative to any
//The any type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.
//TypeScript won't let us perform arbitrary operations on values of type unknown unlike any
let value: unknown;
// value.foo.bar;  // Error
// value.trim();   // Error
// value();        // Error
let value1: any;
value1.foo.bar; // OK
value1.trim(); // OK
value1(); // OK
//Instead, we have to perform some sort of type checking first to narrow the type of the value we're working with.
function stringifyForLogging(value: unknown): string {
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

type IntersectionType1 = unknown & null; // null
type IntersectionType2 = unknown & undefined; // undefined
type IntersectionType3 = unknown & string; // string
type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown

//you can use a type assertion to specify a more specific type
//For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement,
//but you might know that your page will always have an HTMLCanvasElement with a given ID.
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
//Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.
