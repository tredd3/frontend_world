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