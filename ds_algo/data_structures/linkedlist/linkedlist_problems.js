//check if LL is a palindrome or not
function is_LL_palindrome(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    slow = reverse(slow);
    fast = head;
    while (slow !== null) {
        if (slow.data !== fast.data) {
            return false;
        }
        slow = slow.next;
        fast = fast.next;
    }

    return true;
}

function reverse(head) {
    let prev = null;
    let current = head;
    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

//delete-a-node-from-linked-list-without-head-pointer
//copy the data of the next node to the current node which needs to be deleted
//now delete the node from which data is copied

//Create linked list from a given array
//Simple Approach O(n*2): For each element of an array arr[] we create a node in a linked list and insert it at the end.
//effcient Approach O(n): We traverse array from end and insert every element at the beginning of the list.
//Alternate Efficient Solution is maintain tail pointer, traverse array elements from left to right, insert at tail and update tail after insertion.

//get intersection point in a linked list
//O(m+n) - Have a visited flag with each node. Traverse the first linked list and keep marking visited nodes. Now traverse the second linked list, If you see a visited node again then there is an intersection point, return the intersecting node
//(m+n) - Traverse the first linked list and store the addresses of visited nodes in a hash. Now traverse the second linked list and if you see an address that already exists in the hash then return the intersecting node.
//(Using difference of node counts) O(m+n), O(1)
//Get count of the nodes in the first list, let count be c1.
//Get count of the nodes in the second list, let count be c2.
//Get the difference of counts d = abs(c1 – c2)
//Now traverse the bigger list from the first node till d nodes so that from here onwards both the lists have equal no of nodes.

//Merge Sort for Linked Lists
//The slow random-access performance of a linked list makes some other algorithms (such as quicksort) perform poorly, and others (such as heapsort) completely impossible.
// Create Node of LinkedList 
function Node(data) {
    this.node = data;
    this.next = null;
}

// To initialize a linkedlist 
function LinkedList(list) {
    this.head = list || null
}

// Function to insert The new Node into the linkedList 
LinkedList.prototype.insert = function (data) {

    // Check if the linked list is empty 
    // so insert first node and lead head 
    // points to generic node 
    if (this.head === null)
        this.head = new Node(data);

    else {

        // If linked list is not empty, insert the node 
        // at the end of the linked list 
        let list = this.head;
        while (list.next) {
            list = list.next;
        }

        // Now here list pointer points to last 
        // node let’s insert out new node in it 
        list.next = new Node(data)
    }
}

// Function to print linkedList 
LinkedList.prototype.iterate = function () {

    // First we will check whether out 
    // linked list is empty or node 
    if (this.head === null)
        return null;

    // If linked list is not empty we will 
    // iterate from each Node and prints 
    // it’s value store in “data” property 

    let list = this.head;

    // we will iterate until our list variable 
    // contains the “Next” value of the last Node 
    // i.e-> null 
    while (list) {
        document.write(list.node)
        if (list.next)
            document.write(' -> ')
        list = list.next
    }
}

// Function to mergesort a linked list 
LinkedList.prototype.mergeSort = function (list) {

    if (list.next === null)
        return list;

    let leftPart = list;
    let rightPart = null;
    let slow = list; //slow is a mid pointer
    let fast = list

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    rightPart = new LinkedList(slow.next);
    slow.next = null;

    // Here are two linked list which 
    // contains the left most nodes and right 
    // most nodes of the mid node 
    return this._merge(this.mergeSort(leftPart),
        this.mergeSort(rightPart.head))
}

// Merging both lists in sorted manner 
LinkedList.prototype._merge = function (left, right) {

    let resultPointerHead, resultPointerTail = null;
    let pointerLeft = left;
    let pointerRight = right;


    // If true then add left most node value in result, 
    // increment left pointer else do the same in 
    // right linked list. 
    // This loop will be executed until pointer's of 
    // a left node or right node reached null 
    while (pointerLeft && pointerRight) {

        // Check if the right node's value is greater than 
        // left node's value 
        if (pointerLeft.node > pointerRight.node) {
            if (!resultPointerHead) {
                resultPointerHead = pointerRight;
                resultPointerTail = pointerRight;
            }
            resultPointerTail.next = pointerRight;
            resultPointerTail = resultPointerTail.next;
            pointerRight = pointerRight.next;
        }
        else {
            if (!resultPointerHead) {
                resultPointerHead = pointerLeft;
                resultPointerTail = pointerLeft;
            }
            resultPointerTail.next = pointerLeft;
            resultPointerTail = resultPointerTail.next;
            pointerLeft = pointerLeft.next;
        }
    }

    // Add the remaining elements in the last of resultant 
    // linked list 
    if (pointerLeft)
        resultPointerTail.next = pointerLeft;
    if (pointerRight)
        resultPointerTail.next = pointerRight

    // Result is  the new sorted linked list 
    return resultPointerHead;
}

// Initialize the object 
let l = new LinkedList();
l.insert(10)
l.insert(20)
l.insert(3)
l.insert(2)
l.insert(1)
// Print the linked list 
l.iterate()

// Sort the linked list 
l.head = LinkedList.prototype.mergeSort(l.head) 
