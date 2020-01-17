//In a Max Binary Heap, the key at root must be maximum among all keys present in Binary Heap. 
//The same property must be recursively true for all nodes in Binary Tree.

/* given an array convert it into an heap */
function create_maxheap(input, i) {
    var array_length = input.length;
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
        [input[i], input[max]] = [input[max], input[i]]
        create_maxheap(input, max);
    }
}

// Max heap
let MaxHeap = function () {

    let heap = [null];

    this.print = () => heap;

    this.insert = function (num) {
        heap.push(num);
        if (heap.length > 2) {
            let idx = heap.length - 1;
            while (heap[idx] > heap[Math.floor(idx / 2)]) {
                if (idx >= 1) {
                    [heap[Math.floor(idx / 2)], heap[idx]] = [heap[idx], heap[Math.floor(idx / 2)]];
                    if (Math.floor(idx / 2) > 1) {
                        idx = Math.floor(idx / 2);
                    } else {
                        break;
                    };
                };
            };
        };
    };

    this.remove = function () {
        let smallest = heap[1];
        if (heap.length > 2) {
            heap[1] = heap[heap.length - 1];
            heap.pop()//heap.splice(heap.length - 1);
            if (heap.length == 3) {
                if (heap[1] < heap[2]) {
                    [heap[1], heap[2]] = [heap[2], heap[1]];
                };
                return smallest;
            };
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
                if (heap[left] > heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = left;
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = right;
                };
                left = 2 * i;
                right = 2 * i + 1;
                if (heap[left] == undefined || heap[right] == undefined) {
                    break;
                };
            };
        } else if (heap.length == 2) {
            heap.splice(1, 1);
        } else {
            return null;
        };
        return smallest;
    };
};

