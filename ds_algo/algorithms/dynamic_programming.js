//longest-common-substring-problem O(m*n)
//X,Y are strings and m,n are string lengths
function longest_commonsubstring(X, Y, m, n) {
    var maxlen = 0;			// stores the max length of LCS
    var endingIndex = m;	// stores the ending index of LCS in X
    var lookup = Array(m + 1)
    for (var i = 0; i <= m; i++) {
        lookup[i] = Array(n + 1);
        lookup[i].fill(0);
    }
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