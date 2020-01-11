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

//
