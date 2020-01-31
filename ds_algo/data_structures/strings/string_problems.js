//longest-substring-without-repeating-characters
//soln -1
var lengthOfLongestSubstring = function (s) {
    let length = 0;
    if (s.length < 2) {
        return s.length;
    }
    var strlength = s.length;
    for (var i = 0; i < strlength; i++) {
        let localLength = 1;
        for (var j = i + 1; j < strlength; j++) {
            if (s.slice(i, j).includes(s.charAt(j))) {
                break;
            } else {
                localLength++;
            }
        }
        length = localLength > length ? localLength : length;
        if (strlength - i === length) {
            break;
        }
    }
    return length;
};

//soln -2
var lengthOfLongestSubstring = function (s) {
    let substrlength = 0;
    var strlength = s.length;
    if (strlength < 2) {
        return s.length;
    }
    let set = new Set();
    let i = 0, j = 0;
    while (i < strlength && j < strlength) {
        if (!set.has(s.charAt(j))) {
            set.add(s.charAt(j++))
            substrlength = Math.max(substrlength, j - i)
        } else {
            set.delete(s.charAt(i++))
        }
    }
    return substrlength;
};

//soln-3
var lengthOfLongestSubstring = function (s) {
    let substrlength = 0;
    var strlength = s.length;
    if (strlength < 2) {
        return s.length;
    }
    let map = new Map();
    for (var i = 0, j = 0; j < strlength; j++) {
        if (map.has(s.charAt(j))) {
            i = map.get(s.charAt(j)) + 1;
        } else {
            substrlength = Math.max(substrlength, j - i + 1)
        }
        map.set(s.charAt(j), j)
    }
    return substrlength;
};

//Reverse individual words in a string 
//Input : Hello World
//Output : olleH dlroW
//(Space Efficient): We use a stack to push all words before space. As soon as we encounter a space, we empty the stack.
//O(1)
function reverseWords(str) {

    // Pointer to the first character 
    // of the first word 
    var start = 0;
    for (var i = 0; i <= str.size(); i++) {

        // If the current word has ended 
        if (str[i] == ' ' || i == str.size()) {

            // Pointer to the last character 
            // of the current word 
            var end = i - 1;

            // Reverse the current word 
            while (start < end) {
                swap(str[start], str[end]);
                start++;
                end--;
            }

            // Pointer to the first character 
            // of the next word 
            start = i + 1;
        }
    }

    return str;
}

//Find the first repeated word in a string
function find_firstRepeatedWord(str) {
    let map = new Map();
    for (let char of str) {
        if (map.has(char)) {
            return char
        } else {
            map.set(char, 1)
        }
    }
    return 0;
}

//reverse words in a string "tarak is good" yo "good is tarak"
//using stack
//using 2 pointers
//decrementing for loop
function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
reverseString('hello');
//recursion
function reverseString(str) {
    if (str === "")
        return "";
    else
        return reverseString(str.substr(1)) + str.charAt(0);
}
reverseString("hello");
