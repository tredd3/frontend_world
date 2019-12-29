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

