//Array.from and [...arr] creates a new array but only shallow copies elements
//Deep Clone
let a = [{ x: { z: 1 }, y: 2 }];
let b = JSON.parse(JSON.stringify(a));
b[0].x.z = 0
console.log(JSON.stringify(a)); //[{"x":{"z":1},"y":2}]
console.log(JSON.stringify(b)); // [{"x":{"z":0},"y":2}]


//Object.assign and Object.create creates a new object but only shallow copies elements
// Deep Copy
let a = { x: { z: 1 }, y: 2 };
let b = JSON.parse(JSON.stringify(a));
b.x.z = 0

console.log(JSON.stringify(a)); // {"x":{"z":1},"y":2}
console.log(JSON.stringify(b)); // {"x":{"z":0},"y":2}

