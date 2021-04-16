// Example 1: console.log
// ======================
console.log("I am a regular console log.");
console.group();
console.log("I am a console log indented by a single level");
console.group();
console.log("I am a multilevel nested console log");
console.groupEnd();
console.groupEnd();

// Example 2: console.table
// ========================
const people = [
  ["John", "Smith"],
  ["Jane", "Doe"],
  ["Emily", "Jones"],
];
console.table(people);

// Example 3: console.dir
// ======================
const object = {
  name: "Lou",
  likes: ["JavaScript", "Node.js"],
};
console.dir(process, { colors: true, depth: 0 });
