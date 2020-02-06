//when to use dp and when no to
//Dynamic Programming is not useful when there are no common (overlapping) subproblems 
//because there is no point storing the solutions if they are not needed again.
//For example, Binary Search doesn’t have common subproblems but recursive program for Fibonacci Numbers

//conditions for dp
//1)overlapping sub-problems
//2)optimal substructure

//Two different ways to store the values so that these values can be reused:
//a) Memoization (Top Down) - same as recursion but before running recursion check in the lookup table
//Unlike the Tabulated version, all entries of the lookup table are not necessarily filled in Memoized version.

var lookup = [];
function fib(n) {
    if (!lookup[n]) {
        if (n <= 1)
            lookup[n] = n;
        else
            lookup[n] = fib(n - 1) + fib(n - 2);
    }

    return lookup[n];
}
//b) Tabulation (Bottom Up)
function fib_dp(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    let fib_array = [];
    fib_array[1] = 1;
    fib_array[2] = 1;
    for (var i = 3; i <= n; i++) {
        fib_array[i] = fib_array[i - 1] + fib_array[i - 2]
    }
    console.log(fib_array)
    return fib_array[n]
}

//longest-common-substring-problem O(m*n)
//X,Y are strings and m,n are string lengths
function longest_commonsubstring(X, Y, m, n) {
    var maxlen = 0;			// stores the max length of LCS
    var endingIndex = m;	// stores the ending index of LCS in X
    var lookup = Array.from({ length: m + 1 }, e => Array(n + 1).fill(0));

    // lookup[i][j] stores the length of LCS of substring X[0..i-1], Y[0..j-1]
    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            // if current character of X and Y matches
            if (X[i - 1] == Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;

                // update the maximum length and ending index
                if (lookup[i][j] > maxlen) {
                    maxlen = lookup[i][j];
                    endingIndex = i;
                }
            }
        }
    }

    // return Longest common substring having length maxlen
    return X.substr(endingIndex - maxlen, maxlen); // X.slice(endingIndex - maxlen, endingIndex+1);
}

//longest palindromic substring - O(n*2)
//method 1:
// Returns the length of the longest palindromic subsequence in seq 
function lps(seq, i, j) {
    // Base Case 1: If there is only 1 character 
    if (i == j)
        return 1;

    // Base Case 2: If there are only 2  
    // characters and both are same 
    if (seq[i] == seq[j] && i + 1 == j)
        return 2;

    // If the first and last characters match 
    if (seq[i] == seq[j])
        return lps(seq, i + 1, j - 1) + 2;

    // If the first and last characters do not match 
    return Math.max(lps(seq, i, j - 1), lps(seq, i + 1, j));
}

//method:2
function lps(str) {
    let n = strlen(str);
    let i, j, cl; //cl is length of substring 
    let L = Array.from({ length: n }, e => Array(n).fill(0)); // Create a table to store results of subproblems 

    // Strings of length 1 are palindrome of lentgh 1 
    for (i = 0; i < n; i++)
        L[i][i] = 1;
    // Check for lengths greater than 2. k is length of substring
    for (cl = 2; cl <= n; cl++) {
        for (i = 0; i < n - cl + 1; i++) {
            j = i + cl - 1;
            if (str[i] == str[j] && cl == 2)
                L[i][j] = 2;
            else if (str[i] == str[j])
                L[i][j] = L[i + 1][j - 1] + 2;
            else
                L[i][j] = max(L[i][j - 1], L[i + 1][j]);
        }
    }

    return L[0][n - 1];
}

//palindrome substring
function longestPalSubstr(str) {
    // get length of input string 
    let n = str.size();

    // table[i][j] will be false if substring str[i..j] is not palindrome. 
    // Else table[i][j] will be true 
    let L = Array.from({ length: n }, e => Array(n).fill(0)); // Create a table to store results of subproblems 
    let maxLength = 1;

    // check for sub-string of length 2. 
    let start = 0;
    for (let i = 0; i < n - 1; ++i) {
        table[i][i] = true; // All substrings of length 1 are palindromes 
        if (str[i] == str[i + 1]) {
            table[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }

    // Check for lengths greater than 2. k is length of substring 
    for (let k = 3; k <= n; ++k) {
        // Fix the starting index 
        for (let i = 0; i < n - k + 1; ++i) {
            let j = i + k - 1;

            if (table[i + 1][j - 1] && str[i] == str[j]) {
                table[i][j] = true;

                if (k > maxLength) {
                    start = i;
                    maxLength = k;
                }
            }
        }
    }

    cout << "Longest palindrome substring is: ";
    printSubStr(str, start, start + maxLength - 1);

    // return length of LPS 
    return maxLength;
} 