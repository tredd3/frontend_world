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
    // add(data) {
    //     const node = this.root;
    //     if (node === null) {
    //         this.root = new Node(data);
    //         return;
    //     } else {
    //         const searchTree = function (node) {
    //             if (data < node.data) {
    //                 if (node.left === null) {
    //                     node.left = new Node(data);
    //                     return;
    //                 } else if (node.left !== null) {
    //                     return searchTree(node.left);
    //                 }
    //             } else if (data > node.data) {
    //                 if (node.right === null) {
    //                     node.right = new Node(data);
    //                     return;
    //                 } else if (node.right !== null) {
    //                     return searchTree(node.right);
    //                 }
    //             } else {
    //                 return null;
    //             }
    //         };
    //         return searchTree(node);
    //     }
    // }
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
    findMin() {
        if (this.root === null) {
            return -1;
        }
        let current = this.root;
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
    findMax() {
        let current = this.root;
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
    };
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