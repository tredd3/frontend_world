//find missing number
//method:1
function getMissingNumber(arr, n) {
    // actual size is n+1 since a number is missing from the array
    let m = n + 1;

    // get sum of integers between 1 to n+1
    let total = m * (m + 1) / 2;

    // get actual sum of integers in the array
    let sum = 0;
    for (var i = 0; i < n; i++)
        sum += arr[i];

    // the missing number is the difference between the expected sum
    // and the actual sum
    return total - sum;
}

//method:2
function getMissingNumber(arr, n) {
    // Compute XOR of all the elements in array
    let xor = 0;
    for (var i = 0; i < n; i++)
        xor = xor ^ arr[i];

    // Compute XOR of all the elements from 1 to n+1
    for (var i = 1; i <= n + 1; i++)
        xor = xor ^ i;

    return xor;
}

//Given an array of integers, and a number ‘sum’, find the number of pairs of integers in the array whose sum is equal to ‘sum’.
function sum_pairs(arr, sum) {
    let result = [];
    if (arr.length === 0 || arr.length === 1) {
        return 0;
    } else if (arr.length === 2) {
        if (arr[0] + arr[1] === sum) {
            result.push(arr)
        }
    } else {
        let map = new Map();
        for (let x of arr) {
            if (map.has(x)) {
                let count = map.get(x);
                map.set(x, count++)
            } else {
                map.set(x, 1)
            }
        }
        for (let x of arr) {
            if (sum === 2 * x && map.get(x) >= 2) {
                result.push([x, x]);
                let count = map.get(x);
                map.set(x, count - 2)
                map.get(x) === 0 && map.delete(x)
                continue;
            }
            if (map.has(sum - x)) {
                result.push([x, sum - x])
                map.delete(sum - x)
                map.delete(x)
            }
        }
    }
    return result;
}

//find the indices of 2 elements in a sorted array whose sum is equal to target 
function find_sum(array, target) {
    let start_pointer = 0;
    let end_pointer = array.length - 1;

    while (start_pointer <= end_pointer) {
        let sum = array[start_pointer] + array[end_pointer];
        if (sum > target) {
            end_pointer--;
        } else if (sum < target) {
            start_pointer++;
        } else {
            return [start_pointer + 1, end_pointer + 1] //considering starting index as 1
        }
    }

    return [start_pointer + 1, end_pointer + 1]

}

//find the longest word in the dictonary of words which can be formed using given characters of input string
function dictionary(dictionary, input) {
    let result = [];
    let maxlen = 0;
    let inputMap = new Map();
    //create map of input
    for (var char of input) {
        if (inputMap.has(char)) {
            let [inputchar_count] = inputMap.get(char)
            inputMap.set(char, [inputchar_count++, 0])
        } else {
            inputMap.set(char, [1, 0])
        }
    }

    //iterate on dictonary
    for (var word of dictionary) {
        let word_length = word.length;
        if (word_length >= maxlen) {
            for (var i = 0; i < word_length; i++) {
                let char = word[i];
                if (inputMap.has(char)) {
                    let [inputchar_count, wordchar_count] = inputMap.get(char)
                    if (wordchar_count < inputchar_count) {
                        inputMap.set(char, [inputchar_count, wordchar_count++])
                    } else {
                        break;
                    }
                    if (i === word_length - 1 && maxlen === word.length) {
                        result.push(word)
                    } else if (i === word_length - 1 && maxlen !== word.length) {
                        maxlen = word.length;
                        result = [word]
                    }
                } else {
                    break;
                }
            }
        }
    }

    return result;
}

//Given an unsorted array of n integers which can contain integers from 1 to n. Some elements can be repeated multiple times and some other elements can be absent from the array. Count frequency of all elements that are present
//Count frequencies of all elements in array in O(1) extra space and O(n) time
void findCounts(arr, n)
{
    // Traverse all array elements 
    var i = 0;
    while (i < n) {
        // If this element is already processed, 
        // then nothing to do 
        if (arr[i] <= 0) {
            i++;
            continue;
        }

        // Find index corresponding to this element 
        // For example, index for 5 is 4 
        var elementIndex = arr[i] - 1;

        // If the elementIndex has an element that is not 
        // processed yet, then first store that element 
        // to arr[i] so that we don't loose anything. 
        if (arr[elementIndex] > 0) {
            arr[i] = arr[elementIndex];

            // After storing arr[elementIndex], change it 
            // to store initial count of 'arr[i]' 
            arr[elementIndex] = -1;
        }
        else {
            // If this is NOT first occurrence of arr[i], 
            // then decrement its count. 
            arr[elementIndex]--;

            // And initialize arr[i] as 0 means the element 
            // 'i+1' is not seen so far 
            arr[i] = 0;
            i++;
        }
    }
}

//Duplicates in an array in O(n) and by using O(1) extra space
function printRepeating(arr, size) {
    var i;
    for (i = 0; i < size; i++) {
        if (arr[Math.abs(arr[i])] >= 0)
            arr[Math.abs(arr[i])] = -arr[Math.abs(arr[i])];
        else
            cout << Math.abs(arr[i]) << " ";
    }
}


//Duplicates in an array in O(n) and by using O(1) extra space maintaing order and without repetettion
void printDuplicates(arr, n)
{
    var i;

    // Flag variable used to 
    // represent whether repeating 
    // element is found or not. 
    var fl = 0;

    for (i = 0; i < n; i++) {

        // Check if current element is 
        // repeating or not. If it is 
        // repeating then value will 
        // be greater than or equal to n. 
        if (arr[arr[i] % n] >= n) {

            // Check if it is first 
            // repetition or not. If it is 
            // first repetition then value 
            // at index arr[i] is less than 
            // 2*n. Print arr[i] if it is 
            // first repetition. 
            if (arr[arr[i] % n] < 2 * n) {
                cout << arr[i] % n << " ";
                fl = 1;
            }
        }

        // Add n to index arr[i] to mark 
        // presence of arr[i] or to 
        // mark repetition of arr[i]. 
        arr[arr[i] % n] += n;
    }

    // If flag variable is not set 
    // then no repeating element is 
    // found. So print -1. 
    if (!fl)
        cout << "-1";
}


//maximum repeating number in O(n) time and O(1) extra space
function maxRepeating(arr, n, k) {
    // Iterate though input array, for every element 
    // arr[i], increment arr[arr[i]%k] by k 
    for (var i = 0; i < n; i++)
        arr[arr[i] % k] += k;

    // Find index of the maximum repeating element 
    var max = arr[0], result = 0;
    for (var i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
            result = i;
        }
    }

    /* Uncomment this code to get the original array back 
       for (int i = 0; i< n; i++) 
          arr[i] = arr[i]%k; */

    // Return index of the maximum element 
    return result;
}

//Maximum Product Subarray
//Input: arr[] = {6, -3, -10, 0, 2}
//Output:   180  // The subarray is {6, -3, -10}
function maxSubarrayProduct(arr) {
    // max positive product ending at the current position either 1 or +ve
    let max_ending_here = 1;

    // min negative product ending at the current position either 1 or -ve
    let min_ending_here = 1;

    // Initialize overall max product 
    let max_so_far = 1;
    let flag = 0;

    for (let i = 0; i < n; i++) {
		/* If this element is positive, update max_ending_here. 
		Update min_ending_here only if min_ending_here is 
		negative */
        if (arr[i] > 0) {
            max_ending_here = max_ending_here * arr[i];
            min_ending_here = min(min_ending_here * arr[i], 1);
            flag = 1;
        } else if (arr[i] == 0) {
            max_ending_here = 1;
            min_ending_here = 1;
        } else {
            let temp = max_ending_here;
            max_ending_here = max(min_ending_here * arr[i], 1);
            min_ending_here = temp * arr[i];
        }

        // update max_so_far, if needed 
        if (max_so_far < max_ending_here)
            max_so_far = max_ending_here;
    }
    if (flag == 0 && max_so_far == 1)
        return 0;
    return max_so_far;
}

//missing number
//1. Get the sum of numbers which is total = n*(n+1)/2
//2. Subtract all the numbers from sum and
//you will get the missing number

//1) XOR all the array elements, let the result of XOR be X1.
//2) XOR all numbers from 1 to n, let XOR be X2.
//3) XOR of X1 and X2 gives the missing number.

//{1, 4, 20, 3, 10, 5}, sum = 33
//find the sum array with the given sum
function subarray_withsum(arr, target) {
    let i = 0;
    let j = 0;
    let sum = 0;
    let length = arr.length;
    while (i < length && j < length) {
        if (i === j && arr[i] === target) {
            return [i, j];
        }
        if (sum + arr[j] === target) {
            return [i, j];
        } else if (sum + arr[j] < target) {
            sum += arr[j]
            j++
        } else {
            sum -= arr[i]
            i++;
        }
    }
    return -1;
}

//merge two sorted arrays without extra space/ O(1) extra space
function merge(ar1, ar2, m, n) {
    // Iterate through all elements of ar2[] starting from 
    // the last element 
    for (let i = n - 1; i >= 0; i--) {
        /* Find the smallest element greater than ar2[i]. Move all 
           elements one position ahead till the smallest greater 
           element is not found */
        let j, last = ar1[m - 1];
        for (j = m - 2; j >= 0 && ar1[j] > ar2[i]; j--)
            ar1[j + 1] = ar1[j];

        // If there was a greater element 
        if (j != m - 2 || last > ar2[i]) {
            ar1[j + 1] = ar2[i];
            ar2[i] = last;
        }
    }
} 