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
    add(data, root = this.root) {
        if (root === null) {
            root = new Node(data);
            if (this.root === null) {
                this.root = root;
            }
        } else if (data <= root.data) {
            root.left = this.add(data, root.left)
        } else {
            root.right = this.add(data, root.right)
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
    find(data) {
        let current = this.root;
        while (current && current.data !== data) {
            if (data <= current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return current;
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
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
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
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);

        return Math.min(left, right) + 1;
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);

        return Math.max(left, right) + 1;
    }
    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            var data = [];
            function traverse(node) {
                if (node.left) traverse(node.left);
                data.push(node.value);
                if (node.right) traverse(node.right);
            }
            traverse(this.root);
            return data;
        };
    }
    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            var data = [];
            function traverse(node) {
                data.push(node.value);
                if (node.left) traverse(node.left);
                if (node.right) traverse(node.right);
            }
            traverse(this.root);
            return data;
        };
    }
    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            var data = [];
            function traverse(node) {
                if (node.left) traverse(node.left);
                if (node.right) traverse(node.right);
                data.push(node.value);
            }
            traverse(this.root);
            return data;
        }
    }
    levelOrder() {
        if (this.root != null) {
            return;
        }
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
    // isSubtreeNodesLesser(root, value) {
    //     if (root === null) {
    //         return true;
    //     }
    //     if (root.data <= value && isSubtreeNodesLesser(root.left, value) && isSubtreeNodesLesser(root.right, value)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // isSubtreeNodesGreater(root, value) {
    //     if (root === null) {
    //         return true;
    //     }
    //     if (root.data <= value && isSubtreeNodesGreater(root.left, value) && isSubtreeNodesGreater(root.right, value)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // isBinarySearchTree(root = this.root) {
    //     if (root === null) {
    //         return true;
    //     }
    //     if (this.isSubtreeNodesLesser(root.left, root.data) && isBinarySearchTree(root.left)
    //         && this.isSubtreeNodesGreater(root.right, root.data) && isBinarySearchTree(root.right)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    //time complexity - O(n^2)
    isBinarySearchTree(root = this.root) {
        if (root === null) {
            return true;
        }
        if (isBinarySearchTree(root.left) && (this.findMax(root.left) <= root.data)
            && isBinarySearchTree(root.right) && (this.findMin(root.right, root.data) > root.data)) {
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

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

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