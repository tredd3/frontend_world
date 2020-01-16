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
    if (start < end) {
        let partition_index = partition(arr, start, end);
        quick_sort(arr, start, partition_index - 1)
        quick_sort(arr, partition_index + 1, end)
    }
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
