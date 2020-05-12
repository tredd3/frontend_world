//In a Max Binary Heap, the key at root must be maximum among all keys present in Binary Heap. 
//The same property must be recursively true for all nodes in Binary Tree.

/* given an array convert it into an heap */

https://www.cs.usfca.edu/~galles/visualization/Heap.html

// Max heap insertion and deletion O(logn) time
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
        let largest = heap[1];
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
                if (heap[left] == undefined && heap[right] == undefined) {
                    break;
                };
                if (heap[left] == undefined || heap[right] == undefined) {
                    if(heap[left] !== undefined && heap[left] >= heap[i] ) [heap[i], heap[left]] = [heap[left], heap[i]];
                    if(heap[right] !== undefined && heap[right] >= heap[i] ) [heap[i], heap[right]] = [heap[right], heap[i]];
                    break;
                };
                if (heap[left] > heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = left;
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = right;
                };
                left = 2 * i;
                right = 2 * i + 1;
            };
        } else if (heap.length == 2) {
            heap.splice(1, 1);
        } else {
            return null;
        };
        return largest;
    };
};

