class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        var current = this.root;
        while (true) {
            //if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    find(value) {
        if (this.root === null) return false;
        var current = this.root;
        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }
    findRecursively(data, root = this.root) {
        if (root === null) {
            return false;
        } else if (data === root.data) {
            return true;
        } else if (data <= root.data) {
            return this.findRecursively(data, root.left)
        } else {
            return this.findRecursively(data, root.right)
        }
    }
    //level order time and space complexity O(n)
    BFS() {
        var node = this.root,
            data = [], //for values
            queue = []; //for references
        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }
    //
    DFSPreOrder() {
        var data = [];
        function traverse(node) {
            data.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    DFSPostOrder() {
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);
        return data;
    }
    //u can tweak level order traversal to increment the count of leaf nodes
    getLeafCount(node = this.root) {
        if (node == null)
            return 0;
        if (node.left == null && node.right == null)
            return 1;
        else
            return getLeafCount(node.left) +
                getLeafCount(node.right);
    }
    //Inorder on a binary search tree gives elements in a sorted order
    DFSInOrder() {
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            data.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    kthSmallestElement(k) {
        var found = false;
        function check(count) {
            if (!found)
                found = count === k;
        }
        function traverse(node) {
            if (node == null || found) {
                return 0;
            }
            let count = 0;
            count += traverse(node.left);
            check(count)
            count++
            check(count)
            count += traverse(node.right);
            check(count)
            return count;
        }
        traverse(this.root);
        return found;
    }
    //iterative approach
    inOrder(root = this.root) {
        let s = [];//stack 
        let curr = root;

        while (curr != null || s.length) {
            /* Reach the left most Node of the curr Node */
            while (curr != null) {
                s.push(curr);
                curr = curr.left;
            }
            /* Current must be NULL at this point */
            curr = s.pop();
            console.log(curr.data)
            /* we have visited the node and its  left subtree.  Now, it's right subtree's turn */
            curr = curr.right;
        }
    }
    //iterative preorder
    iterativePostorder(root = this.root) {
        let s = [];//stack 
        let curr = root;

        while (curr != null || s.length) {
            /* Reach the left most Node of the curr Node */
            while (curr != null) {
                curr.right && s.push(curr.right)
                s.push(curr);
                curr = curr.left;
            }
            /* Current must be null at this point */
            curr = s.pop();
            if (curr.right && s[s.length - 1] == curr.right) {
                s.pop();  // remove right child from stack 
                s.push(curr);  // push curr back to stack 
                curr = curr.right; // change root so that the right  
                // child is processed next 
            }
            else  // Else print root's data and set root as null 
            {
                printf("%d ", root.data);
                curr = null;
            }
        }
    }
}


var tree = new BinarySearchTree();
var array = [10, 6, 15, 3, 8, 20]
for (let x of array) {
    tree.insert(x)
}
tree.DFSPreOrder();
tree.DFSPostOrder();
tree.DFSInOrder();

//BST - Binary Search Tree by definition has distinct keys.
//if the keys are same then either maintain the count in the node itself or u can insert them in any one of the side
//AVL - self balanced BST
//always make a BST self balanced after insertion or deletion to get advantage of logn complexity
//if a BST is skewed time complexity becomes O(n) making it to loose its advantage

//without using stack and recursion
function MorrisTraversal(root) {
    if (root == null)
        return;

    current = root;
    while (current != null) {

        if (current.left === null) {
            printf("%d ", current.data);
            current = current.right;
        }
        else {

            /* Find the inorder predecessor of current */
            pre = current.left;
            while (pre.right != null && pre.right != current)
                pre = pre.right;

            /* Make current as the right child of its inorder  
               predecessor */
            if (pre.right == null) {
                pre.right = current;
                current = current.left;
            }
            /* Revert the changes made in the 'if' part to restore  
               the original tree i.e., fix the right child 
               of predecessor */
            else {
                pre.right = null;
                printf("%d ", current.data);
                current = current.right;
            } /* End of if condition pre.right == null */
        } /* End of if condition current.left == null*/
    } /* End of while */
}

