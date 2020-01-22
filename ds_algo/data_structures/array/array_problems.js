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