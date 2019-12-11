//count the occurrences of a substring in a string
function countSubstring(string, substring) {
    let count = 0;
    let position = string.indexOf(substring)
    while (position !== -1) {
        count++;
        position = string.indexOf(substring, position + substring.length)
    }
    console.log(count)
    return count;
}

console.time('countSubstring');
countSubstring("tarak tartartartarakaratargkglhltarhlhldsd", "tar")
console.timeEnd('countSubstring');

//using recursion
var countSubstring1 = function (string, substring) {
    let count = 0;
    (function recurse(string, substring) {
        let position = string.indexOf(substring);
        if (position === -1) {
            console.log(count)
            return count;
        }
        count++;
        recurse(string.slice(position + substring.length), substring)
    })(string, substring)
}

//using indexof and lastindexof
function countSubstring2(string, substring) {
    let startIndex = string.indexOf(substring)
    let count = 0;
    if (startIndex === -1) {
        return count;
    }
    let lastIndex = string.lastIndexOf(substring)
    while (startIndex < lastIndex) {
        count += 2;
        startIndex = string.indexOf(substring, startIndex + substring.length)
        lastIndex = string.lastIndexOf(substring, lastIndex - substring.length)
    }
    if (startIndex === lastIndex) {
        console.log(++count)
        return count++;
    } else {
        console.log(count)
        return count;
    }
}

//palindrome check
function palindrome(str) {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
}

function palindrome(str) {
    var re = /[^A-Za-z0-9]/g;
    str = str.toLowerCase().replace(re, '');
    var len = str.length;
    for (var i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

//reverse
function reverseString(str) {
    if (str === "")
        return "";
    else
        return reverseString(str.substr(1)) + str.charAt(0);
}

//best way
function reverseString1(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
console.time('reverseString1');
reverseString1("taraktaraktarak")
console.timeEnd('reverseString1');

//this is not the robust way
function reverseString(str) {
    return str.split("").reverse().join("");
}

//Inner implementation of arr.reverse()
function reverseString(str) {
    let arr = str.split();
    for (var i = 0; i < (str.length) / 2; i++) {
        var x = arr[i];
        arr[i] = arr[str.length - 1 - i];
        arr[str.length - 1 - i] = x;
    }
    return str;
}

//Title Case a Sentence
function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

//Find the Longest Word With a FOR Loop
function findLongestWord(str) {
    var strSplit = str.split(' ');
    var longestWord = 0;
    for (var i = 0; i < strSplit.length; i++) {
        if (strSplit[i].length > longestWord) {
            longestWord = strSplit[i].length;
        }
    }
    return longestWord;
}

function findLongestWord(str) {
    var longestWord = str.split(' ').sort(function (a, b) { return b.length - a.length; });
    return longestWord[0].length;
}
findLongestWord("The quick brown fox jumped over the lazy dog");


function findLongestWord(str) {
    var longestWord = str.split(' ').reduce(function (longest, currentWord) {
        return currentWord.length > longest.length ? currentWord : longest;
    }, "");
    return longestWord.length;
}

//string ending with a word
function confirmEnding(string, target) {
    if (string.substr(-target.length) === target) {
        return true;
    } else {
        return false;
    }
}

function confirmEnding(string, target) {
    // We return the method with the target as a parameter
    // The result will be a boolean (true/false)
    return string.endsWith(target); // 'Bastian'.endsWith('n')
}