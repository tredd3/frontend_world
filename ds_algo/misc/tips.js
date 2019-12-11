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