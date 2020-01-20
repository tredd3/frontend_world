//find the indices of 2 elements in a unsorted array whose sum is equal to target 


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