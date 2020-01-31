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

//detecting loop in a LL
//change structure of LL node to store the count
//use set to store the address of visited node
//slow and fast pointer. they both meet at the node which is pointed by 2 nodes

//removing the loop
//Take a variable called last node and update the variable whenever we add an element in the set 
//and when a loop is make take the last node next value as null 
// After detecting the loop, if we start slow pointer from head and move both slow and fast pointers at same speed until fast don’t meet, they would meet at the beginning of the loop.

function detectAndRemoveLoop(head) {
    // If list is empty or has only one node 
    // without loop 
    if (head == null || head.next == null)
        return;

    let slow = head, fast = head;

    // Move slow and fast 1 and 2 steps 
    // ahead respectively. 
    slow = slow.next;
    fast = fast.next.next;

    // Search for loop using slow and 
    // fast pointers 
    while (fast && fast.next) {
        if (slow == fast)
            break;
        slow = slow.next;
        fast = fast.next.next;
    }

    /* If loop exists */
    if (slow == fast) {
        slow = head;
        while (slow.next != fast.next) {
            slow = slow.next;
            fast = fast.next;
        }

        /* since fast.next is the looping point */
        fast.next = null; /* remove loop */
    }
}

//getting the last element added in a set
class MySet extends Set {
    add(value) {
        super.add(value);
        this.last = value;
    }
}
var set = new MySet();
set.add(1); set.add(2); set.add(3);
set.last; // 3

//delete-a-node-from-linked-list-without-head-pointer
//copy the data of the next node to the current node which needs to be deleted
//now delete the node from which data is copied

//nth node from end of linked list
//Maintain two pointers – reference pointer and main pointer. Initialize both reference and main pointers to head.
//First, move reference pointer to n nodes from head. Now move both pointers one by one until the reference pointer reaches the end.
// Now the main pointer will point to nth node from the end.

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

    let resultHead = null, resultTail = null;

    while (left && right) {
        if (left.node > right.node) {
            if (!resultHead) {
                resultHead = right;
                resultTail = right;
            } else {
                resultTail.next = right;
                resultTail = resultTail.next;
            }
            right = right.next;
        }
        else {
            if (!resultHead) {
                resultHead = left;
                resultTail = left;
            } else {
                resultTail.next = left;
                resultTail = resultTail.next;
            }
            left = left.next;
        }
    }

    // Add the remaining elements in the last of resultant 
    // linked list 
    if (left)
        resultTail.next = left;
    if (right)
        resultTail.next = right

    // Result is  the new sorted linked list 
    return resultHead;
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

//rotate a linked list counter clockwise
//iterate on the LL till last 
//To rotate the linked list, we need to change next of kth node to NULL, next of the last node to the previous head node,
//and finally, change head to (k+1)th node. So we need to get hold of three nodes: kth node, (k+1)th node and last node.

//Sort a linked list of 0s, 1s and 2s
//Traverse the list and count the number of 0s, 1s and 2s. Let the counts be n1, n2 and n3 respectively.
//Traverse the list again, fill the first n1 nodes with 0, then n2 nodes with 1 and finally n3 nodes with 2.

// Function to sort a linked list of 0s, 1s and 2s  
function sortList(head) {
    let count = [0, 0, 0]; // Initialize count of '0', '1' and '2' as 0  
    let ptr = head;

    /* count total number of '0', '1' and '2'  
    * count[0] will store total number of '0's  
    * count[1] will store total number of '1's  
    * count[2] will store total number of '2's */
    while (ptr != null) {
        count[ptr.data] += 1;
        ptr = ptr.next;
    }

    let i = 0;
    ptr = head;

    while (ptr != null) {
        if (count[i] == 0)
            ++i;
        else {
            ptr.data = i;
            --count[i];
            ptr = ptr.next;
        }
    }
}

// Function to sort a linked list of 0s, 1s and 2s by changing links
function sortList(head) {
    if (head || !(head.next))
        return head;

    // Create three dummy nodes to point to 
    // beginning of three linked lists. These 
    // dummy nodes are created to avoid many 
    // null checks. 
    let zeroD = newNode(0);
    let oneD = newNode(0);
    let twoD = newNode(0);

    // Initialize current pointers for three 
    // lists and whole list. 
    let zero = zeroD, one = oneD, two = twoD;

    // Traverse list 
    let curr = head;
    while (curr) {
        if (curr.data == 0) {
            zero.next = curr;
            zero = zero.next;
        } else if (curr.data == 1) {
            one.next = curr;
            one = one.next;
        } else {
            two.next = curr;
            two = two.next;
        }
        curr = curr.next;
    }

    // Attach three lists 
    zero.next = (oneD.next) ? (oneD.next) : (twoD.next);
    one.next = twoD.next;
    two.next = null;

    // Updated head 
    head = zeroD.next;

    // Delete dummy nodes 
    delete zeroD;
    delete oneD;
    delete twoD;

    return head;
}

//flatten linked list by using Merge() process of merge sort for linked lists.
function flatten(root) {
    // Base cases 
    if (root == null || root.right == null)
        return root;

    // Merge this list with the list on right side 
    return merge(root, flatten(root.right));
}

function merge(a, b) {
    // If first list is empty, the second list is result 
    if (a == null)
        return b;

    // If second list is empty, the second list is result 
    if (b == null)
        return a;

    let result;
    if (a.data < b.data) {
        result = a;
        result.down = merge(a.down, b);
    } else {
        result = b;
        result.down = merge(a, b.down);
    }

    return result;
}

//Add two numbers represented by linked lists
//Input: List1: 5->6->3  // represents number 365
//       List2: 8->4->2 //  represents number 248
//Output: Resultant list: 3->1->6  // represents number 613

function addTwoLists(first, second)  //first and second are heads of linked lists
{
    let res = null; // res is head node of the resultant list  
    let temp, prev = null;
    let carry = 0, sum;

    while (first != null || second != null) //while both lists exist  
    {
        sum = carry + (first ? first.data : 0) +
            (second ? second.data : 0);
        carry = (sum >= 10) ? 1 : 0;
        sum = sum % 10;

        // Create a new node with sum as data  
        temp = newNode(sum);
        if (res == NULL) //res is the head of result LL
            res = temp;
        else
            prev.next = temp; //prev is a iterating pointer on the result LL

        // Set prev for next insertion  
        prev = temp;

        // Move first and second pointers to next nodes  
        if (first) first = first.next;
        if (second) second = second.next;
    }

    if (carry > 0)
        temp.next = newNode(carry);

    // return head of the resultant list  
    return res;
}  