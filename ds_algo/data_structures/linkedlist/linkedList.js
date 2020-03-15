class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
//all about the manipulation of pointers and not the actual nodes
class LinkedList {
    constructor() {
        this.head = null; //this.head is the pointer to starting node and not the node itself
        this.length = 0;
    }
    add(data) {
        //this.head is a pointer to the head node
        //current is a pointer to the current node
        //newNode is a pointer to the newNode
        var newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        //now we are at the last node in the list
        current.next = newNode;
        //increase the length
        this.length++
    }
    //2 pointers for singly linked list, 1 pointer for doubly linked list
    delete(element) {
        if (this.head === null) {
            return;
        }
        let current = this.head;
        let prev = null
        if (current.data === element) {
            this.head = current.next;
            this.length--;
            return;
        }
        while (current.data !== element) {
            prev = current;
            current = current.next;
        }
        prev.next = current.next;
        this.length--;
    }
    indexOf(element) {
        let current = this.head;
        let index = -1;
        while (current) {
            index++;
            if (current.data === element) {
                return index;
            }
            current = current.next;
        }
        return -1;
    }
    elementAt(index) {
        let current = this.head;
        let currentIndex = 0;
        while (current && currentIndex < index) {
            currentIndex++;
            current = current.next;
        }
        return current ? current.data : null;
    }
    addAtIndex(index, data) {
        if (index < 0 || index > this.length - 1) {
            return;
        }
        let current = this.head;
        let prev = null;
        let currentIndex = 0;
        var newNode = new Node(data);
        if (currentIndex === index) {
            newNode.next = current;
            this.head = newNode;
        } else {
            while (currentIndex < index) {
                currentIndex++;
                prev = current;
                current = current.next;
            }
            prev.next = newNode;
            newNode.next = current;
        }
        this.length++;
    }
    removeAt(index) {
        if (index < 0 || index > this.length - 1) {
            return;
        }
        let current = this.head;
        let prev = null;
        let currentIndex = 0;
        if (currentIndex === index) {
            this.head = current.next;
        } else {
            while (currentIndex < index) {
                currentIndex++;
                prev = current;
                current = current.next;
            }
            prev.next = current.next;
        }
        this.length--;
        return current.data;
    }
    //recursive solution
    printNodesUsingRecursion(current = this.head) {
        if (current.next === null) {
            console.log(current.data)
            return;
        }
        console.log(current.data)//normal print
        this.printNodesUsingRecursion(current.next)
        console.log(current.data)//forward print
    }
    //iterative solution in forward direction
    printNodesUsingLoop() {
        if (this.head === null) {
            console.log("no nodes")
            return;
        }
        let current = this.head
        while (current) {
            console.log(current.data) // forward print
            current = current.next;
        }
    }
    //stack for printing reverse
    printReverseUsingStack() {
        if (this.head === null) {
            return;
        }
        let stack = []; // stores pointers
        let current = this.head
        while (current.next !== null) {
            stack.push(current);
            current = current.next;
        }
        console.log(stack);
        let topPointer;
        while (stack.length) {
            topPointer = stack.pop();
            console.log(topPointer.data)
        }
    }
    size() {
        let count = 1;
        let currentNode = this.head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
            count++;
        }
        this.length = count;
        console.log(this.length)
    }
    reverseUsingRecursion(current = this.head) {
        if (current.next === null) {
            this.head = current;
            return;
        }
        reverseUsingRecursion(current.next)
        let prev = current;
        current = current.next;
        current.next = prev;
        prev.next = null; //if not it becomes a doubly linked list
    }
    reverse() {
        let prev = null;
        let current = this.head;
        while (current !== null) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
}

let linkedList = new LinkedList();
let arr = [1, 2, 6, 3, 4, 5, 6]
for (let x of arr) {
    linkedList.add(x);
}
linkedList.size();
//linkedlist which is a global object is stored in heap
//linkedlist functions get executed on stack also local variables are stored in stack

var removeElements = function (head, val) {

    if (head && head.val == val) {
        //if Input:  6->6->6->3->4->5->6, val = 6
        //Output: 3->4->5
        return removeElements(head.next, val)
    }

    let curr = head;
    while (curr) {
        if (curr.next && curr.next.val == val) curr.next = curr.next.next
        else curr = curr.next
    }

    return head
};
//Input:  1->2->6->3->4->5->6, val = 6
//Output: 1->2->3->4->5
removeElements(linkedList.head, 6)
