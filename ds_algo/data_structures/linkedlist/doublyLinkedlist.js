class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    constructor(data) {
        this.head = null;
    }
    insert(data) {
        let newNode = new Node(data)
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        //when the loop is complete current pointer is pointed to last and prev pointer to last but one
        current.next = newNode;
        newNode.prev = current;
    }
    reversePrintViaLoop() {
        let current = this.head;
        //no for loop because length of the list unknown
        while (current.next !== null) {
            current = current.next;
        }
        //current node points to the last element of linked list
        while (current.prev !== null) {
            console.log(current.data)
            current = current.prev;
        }
        console.log(this.head.data)
    }
}

let doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.insert(1);
doublyLinkedList.insert(2);
doublyLinkedList.insert(3);
doublyLinkedList.insert(4);
doublyLinkedList.insert(5);
doublyLinkedList.insert(6);
