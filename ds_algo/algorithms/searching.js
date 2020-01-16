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
    if (arr[mid] > x)
        return binarySearch(arr, x, start, mid - 1);
    else

        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return binarySearch(arr, x, mid + 1, end);
} 