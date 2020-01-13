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

//