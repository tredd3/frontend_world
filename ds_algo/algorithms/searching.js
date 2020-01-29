//linear search - O(n)
//binary search - O(logn)

//binary search - iterative approach O(1) space
function binarySearch(arr, x) {

    let start = 0, end = arr.length - 1;

    // Iterate while start not meets end 
    while (start <= end) {

        // Find the mid index 
        let mid = Math.floor((start + end) / 2);

        // If element is present at mid, return True 
        if (arr[mid] === x) return true;

        // Else look in left or right half accordingly 
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return false;
}

//binary search - O(Logn) recursion call stack space.
function binarySearch(arr, x, start, end) {

    // Base Condition 
    if (start > end) return false;

    // Find the middle index 
    let mid = Math.floor((start + end) / 2);

    // Compare mid with given key x 
    if (arr[mid] === x) return true;

    // If element at mid is greater than x, 
    // search in the left half of mid 
    if (x < arr[mid])
        return binarySearch(arr, x, start, mid - 1);
    else
        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return binarySearch(arr, x, mid + 1, end);
}

//find majority element in a sorted array
function isMajority(arr, n, x) {
    /* Find the index of first occurrence of x in arr[] */
    let i = _binarySearch(arr, 0, n - 1, x);

    /* If element is not present at all, return false*/
    if (i == -1)
        return false;

    /* check if the element is present more than n/2 times */
    if (((i + n / 2) <= (n - 1)) && arr[i + n / 2] == x)
        return true;
    else
        return false;
}

function _binarySearch(arr, low, high, x) {
    if (high >= low) {
        let mid = (low + high) / 2; /*low + (high - low)/2;*/

        /* Check if arr[mid] is the first occurrence of x. 
            arr[mid] is first occurrence if x is one of the following 
            is true: 
            (i) mid == 0 and arr[mid] == x 
            (ii) arr[mid-1] < x and arr[mid] == x 
        */
        if ((mid == 0 || x > arr[mid - 1]) && (arr[mid] == x))
            return mid;
        else if (x > arr[mid])
            return _binarySearch(arr, (mid + 1), high, x);
        else
            return _binarySearch(arr, low, (mid - 1), x);
    }

    return -1;
}