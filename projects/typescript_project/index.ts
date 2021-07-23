//The goal of TypeScript is to be a static typechecker for JavaScript programs - in other words, a tool that runs before your
// code runs (static) and ensures that the types of the program are correct (typechecked), lowering the chance of bugs
//JavaScript only truly provides dynamic typing - running the code to see what happens.
//apart from type check, typescript also catches and reports logic,typo and uncalled function errors
//Unlike C++, TypeScript uses postfix types, like so: x: string instead of string x.
//js primitives can be used as types : boolean, bigint, null, number, string, symbol, and undefined
// TypeScript extends this list with a few more, such as object, any (allow anything), void (a function which returns undefined or has no return value).
//TypeScript is a structural type system, i.e it infers type based on the structure and not mandatory to declare type to a structure
//e.g If the object or class has all the required properties, TypeScript will say they match, regardless of the implementation details.
interface User {
  name: string;
  adresses: object[];
  getname: () => void;
  id?: {
    readonly x: number;
    b: any;
    c: unknown;
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

function deleteUser(user: User): void {
  console.log(34);
  //return 34;
}

function createElement(tagName: "img"): HTMLImageElement {
  return document.createElement(tagName);
}

////intersections
type Combined = { a: number } & { b: string };

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

function getLength(obj: string | string[]): void | number {
  return obj.length;
}

//better to extract unions
type arg = string | string[];
type returnValue = void | number;
function getLength1(obj: arg): returnValue {
  return obj.length;
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

//interface vs alias - interface is recommended use
//both interface and type names start with Capital letter
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
