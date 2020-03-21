/* Binary Search Tree */

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    addrecursively(root, data) {
        if (root === null) {
            root = new Node(data);
            if (this.root === null) {
                this.root = root;
            }
        } else if (data <= root.data) {
            root.left = this.addrecursively(root.left, data)
        } else {
            root.right = this.addrecursively(root.right, data)
        }
        return root;
    }
    findMin(root = this.root) {
        if (root === null) {
            return -1;
        }
        let current = root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMinRecursion(root = this.root) {
        if (this.root === null) {
            return -1;
        }
        if (root.left === null) {
            return root.data;
        }
        return this.findMinRecursion(root.left)
    }
    findMax(root = this.root) {
        let current = root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    remove(data) {
        const removeNode = function (node, data) {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                // node has no children 
                if (node.left == null && node.right == null) {
                    return null;
                }
                // node has no left child 
                if (node.left == null) {
                    return node.right;
                }
                // node has no right child 
                if (node.right == null) {
                    return node.left;
                }
                // node has two children 
                //find min in right subtree and replace the value of node to be deleted with right subtree min node value
                // now delete the min node and point the right subtree if any to the left of parent of  min node
                // or u can pick max in left subtree , now delete the max node after copying the value and point the 
                //left subtree if any to the right of parent of  max node
                var tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }
    // A non-empty binary tree T is balanced if:
    //1) Left subtree of T is balanced
    //2) Right subtree of T is balanced
    //3) The difference between heights of left subtree and right subtree is not more than 1.
    isBalanced(root = this.root) {
        let lh; /* for height of left subtree */
        let rh; /* for height of right subtree */

        /* If tree is empty then return true */
        if (root == null)
            return 1;

        /* Get the height of left and right sub trees */
        lh = this.height(root.left);
        rh = this.height(root.right);

        if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right))
            return 1;

        /* If we reach here then  
        tree is not height-balanced */
        return 0;
    }
    height(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.height(node.left);
        let right = this.height(node.right);

        return Math.max(left, right) + 1;
    }
    optimisedIsbalanced(root) {

        /* lh --> Height of left subtree  
        rh --> Height of right subtree */
        let lh, rh = 0;
        /* l will be true if left subtree is balanced  
        and r will be true if right subtree is balanced */
        let l = 0, r = 0;

        if (root == null) {
            return [-1, 1];//[height,isBalanced]
        }

        /* Get the heights of left and right subtrees in lh and rh  
        And store the returned values in l and r */
        [lh, l] = this.optimisedIsbalanced(root.left);
        [rh, r] = this.optimisedIsbalanced(root.right);

        /* Height of current node is max of heights of left and  
        right subtrees plus 1*/
        let nodeheight = Math.max(lh, rh) + 1;

        return [nodeheight, (Math.abs(lh - rh) <= 1) && l && r]

    }
    //time complexity - O(n^2)
    isBinarySearchTree(root = this.root) {
        if (root === null) {
            return true;
        }
        if (isBinarySearchTree(root.left) && (this.findMax(root.left) <= root.data)
            && isBinarySearchTree(root.right) && (this.findMin(root.right) > root.data)) {
            return true;
        } else {
            return false;
        }
    }

    //optimised solution O(n)
    isBinarySearchTree2(root = this.root, minValue = -Infinity, maxValue = +Infinity) {
        if (root === null) {
            return true;
        }
        if (root.data > minValue && root.data < maxValue && isBinarySearchTree(root.left, minValue, root.data)
            && isBinarySearchTree(root.right, root.data, maxValue)) {
            return true;
        } else {
            return false;
        }
    }

    //inorder traversal with each node lesser than previous node
}

const bst = new BST();
var array = [10, 6, 15, 3, 8, 20]
for (let x of array) {
    bst.addrecursively(bst.root, x)
}

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log('inOrder: ' + bst.inOrder());
console.log('preOrder: ' + bst.preOrder());
console.log('postOrder: ' + bst.postOrder());

console.log('levelOrder: ' + bst.levelOrder());