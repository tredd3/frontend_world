//bubble sort - space O(1), Time - O(n*n) avg case
function bubble_sort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        let isSorted = true;
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSorted = false;
            }
        }
        if (isSorted) {
            break;
        }
    }
}

//selection sort - space O(1), Time - O(n*n) avg case
function selection_sort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        let min = i;
        for (var j = i + 1; i < n; i++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
}

//insertion sort - space O(1), Time - O(n*n) avg case
function insertion_sort(arr) {
    var n = arr.length;
    //arr[0] is bydefault considered sorted
    for (var i = 1; i < n; i++) {
        let value = arr[i];
        let hole = i;
        while (hole > 0 && arr[hole - 1] > value) {
            arr[hole] = arr[hole - 1];
            hole = hole - 1;
        }
        arr[hole] = value;
    }
}

//merge sort - space O(N), Time - O(nlogn) avg and best case 
//divide and conquer,recursive, stable, not in place 
function merge_sort(arr) {
    let n = arr.length;
    if (n < 2) {
        return;
    }
    let mid = Math.floor(n / 2);
    let left_arr = arr.slice(0, mid)
    let right_arr = arr.slice(mid, n)
    merge_sort(left_arr)
    merge_sort(right_arr)
    merge(left_arr, right_arr, arr)
}

function merge(left_arr, right_arr, arr) {
    let LL = left_arr.length;
    let RL = right_arr.length;
    let i = 0, j = 0, k = 0;
    while (i < LL && j < RL) {
        if (left_arr[i] <= right_arr[j]) {
            arr[k] = left_arr[i]
            i++
        } else {
            arr[k] = right_arr[j]
            j++;
        }
        k++;
    }
    while (i < LL) {
        arr[k] = left_arr[i]
        i++;
        k++
    }
    while (j < RL) {
        arr[k] = right_arr[j]
        j++;
        k++
    }
}

//quick sort - space O(1), Time - O(nlogn) avg case
//divide and conquer,recursive, not stable, in place
function quick_sort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let partition_index = partition(arr, start, end);
    quick_sort(arr, start, partition_index - 1)
    quick_sort(arr, partition_index + 1, end)
}

function partition(arr, start, end) {
    let pivot = arr[end];
    let pIndex = start;
    for (var i = start; i < end; i++) {
        if (arr[i] < pivot) {
            swap(arr[pIndex], arr[i])
            pIndex++
        }
    }
    swap(arr[pIndex], arr[end])
    return pIndex;
}

//heapsort - not stable, in place
https://www.cs.usfca.edu/~galles/visualization/HeapSort.html
var array_length;
/* to create MAX  array */
function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max]) {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
        heap_root(input, 0);
    }
}

var arr = [3, 0, 2, 5, -1, 4, 1];
heapSort(arr);
console.log(arr);

//find the kth largest/smallestr element
// Complexity is n log(n)
var source = [9, 2, 7, 11, 1, 3, 14, 22];
var k = 4//4th largest element
var kthMax = function (minInd, MaxInd, kth) {
    // pivotInd stores the pivot position 
    // for current iteration
    var temp, pivotInd = minInd;
    if (minInd >= MaxInd) {
        return source[pivotInd];
    }
    for (var i = minInd; i < MaxInd; i++) {
        //If an element is greater than chosen pivot (i.e. last element)
        //Swap it with pivotPointer element,then increase pointer
        if (source[i] > source[MaxInd]) {
            temp = source[i];
            source[i] = source[pivotInd];
            source[pivotInd] = temp;
            pivotInd++;
        }
    }
    // we have found position for pivot elem. 
    // swap it to that position place .
    temp = source[pivotInd];
    source[pivotInd] = source[MaxInd];
    source[MaxInd] = temp;
    // Only try to sort the part in which kth index lies.
    if (kth > pivotInd) {
        return kthMax(pivotInd + 1, MaxInd, kth);
    } else if (kth < pivotInd) {
        return kthMax(minInd, pivotInd - 1, kth);
    } else {
        return source[pivotInd];
    }
}
// last argument is kth-1 , so if 2 is given,
// it will give you 3rd max which is 11
console.log(kthMax(0, source.length - 1, k - 1));
