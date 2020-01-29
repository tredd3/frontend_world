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
    //level order
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

