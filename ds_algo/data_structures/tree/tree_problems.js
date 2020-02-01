//mirror a tree
function mirror(node) {
    if (node == null)
        return;
    else {
        let temp;
        /* do the subtrees */
        mirror(node.left);
        mirror(node.right);
        /* swap the pointers in this node */
        temp = node.left;
        node.left = node.right;
        node.right = temp;
    }
}

/* Given two trees, return true if they are structurally identical */
function identicalTrees(a, b) {
    /*1. both empty */
    if (a == null && b == null)
        return 1;

    /* 2. both non-empty -> compare them */
    if (a != null && b != null) {
        return a.data == b.data && identicalTrees(a.left, b.left) && identicalTrees(a.right, b.right);
    }

    /* 3. one empty, one not -> false */
    return 0;
}

//iterative
function identicalTrees(a, b) {
    /*1. both empty */
    if (a == null && b == null)
        return true;

    /* 2. both non-empty -> compare them */
    if (a != null && b != null) {

        let q1 = [], q2 = [];

        // Enqueue Roots of trees in respective queues 
        q1.push(a);
        q2.push(b);

        while (q1.length && q2.length) {
            // Get front nodes and compare them 
            let n1 = q1.shift();
            let n2 = q2.shift();

            if (n1.data != n2.data)
                return false;

            /* Enqueue left children of both nodes */
            if (n1.left && n2.left) {
                q1.push(n1.left);
                q2.push(n2.left);
            }

            // If one left child is empty and other is not 
            else if (n1.left || n2.left)
                return false;

            // Right child code (Similar to left child code) 
            if (n1.right && n2.right) {
                q1.push(n1right);
                q2.push(n2.ight);
            }
            else if (n1.right || n2.right)
                return false;
        }

        return true;
    }

    /* 3. one empty, one not -> false */
    return false;
}

//max path sum in a binary tree
function findMaxSum(root = this.root) {
    // Initialize result 
    let res = 0;
    function findMaxUtil(root) {
        //Base Case 
        if (root == null)
            return 0;

        // l and r store maximum path sum going through left and 
        // right child of root respectively 
        let l = findMaxUtil(root.left);
        let r = findMaxUtil(root.right);

        // Max path for parent call of root. This path must 
        // include at-most one child of root 
        let max_single = max(max(l, r) + root.data, root.data);

        // Max Top represents the sum when the Node under 
        // consideration is the root of the maxsum path and no 
        // ancestors of root are there in max sum path 
        let max_top = max(max_single, l + r + root.data);

        res = max(res, max_top); // Store the Maximum Result. 

        return max_single;
    }
    findMaxUtil(root)
    return res;
}

//Print Left View of a Binary Tree
function leftView(root) {
    let max_level = -1;

    function leftViewUtil(root, level) {
        // Base Case 
        if (root == null)
            return;

        // If this is the first node of its level 
        if (max_level < level) {
            //cout << root->data << "\t"; 
            max_level = level;
        }
        // Recur for left and right subtrees 
        leftViewUtil(root.left, level + 1);
        leftViewUtil(root.right, level + 1);
    }
    leftViewUtil(root, 0);
}


//level order in a spiral form - recursion
void printGivenLevel(root, level, ltr)
{
    if (root == NULL)
        return;
    if (level == 1)
        printf("%d ", root.data);
    else if (level > 1) {
        if (ltr) {
            printGivenLevel(root.left, level - 1, ltr);
            printGivenLevel(root.right, level - 1, ltr);
        }
        else {
            printGivenLevel(root.right, level - 1, ltr);
            printGivenLevel(root.left, level - 1, ltr);
        }
    }
}

//level order in a spiral form - iteration
function printSpiral(root) {
    if (root == NULL)
        return; // NULL check 

    // Create two stacks to store alternate levels 
    let s1 = [], s2 = []

    // Push first level to first stack 's1' 
    s1.push(root);

    // Keep printing while any of the stacks has some nodes 
    while (!s1.empty() || !s2.empty()) {
        // Print nodes of current level from s1 and push nodes of 
        // next level to s2 
        while (!s1.empty()) {
            let temp = s1.pop();
            //print(temp.data)

            // Note that is right is pushed before left 
            if (temp.right)
                s2.push(temp.right);
            if (temp.left)
                s2.push(temp.left);
        }

        // Print nodes of current level from s2 and push nodes of 
        // next level to s1 
        while (!s2.empty()) {
            let temp = s2.pop();
            //print(temp.data)

            // Note that is left is pushed before right 
            if (temp.left)
                s1.push(temp.left);
            if (temp.right)
                s1.push(temp.right);
        }
    }
}

//binary tree vertical order
function printVerticalOrder(root) {
    // Create a map and store vertical order in map using 
    // function getVerticalOrder() 
    let m = new Map();
    let hd = 0;

    function getVerticalOrder(root, hd) {
        // Base case 
        if (root == null)
            return;

        // Store current node in map 'm' 
        m[hd].push_back(root.key);

        // Store nodes in left subtree 
        getVerticalOrder(root.left, hd - 1);

        // Store nodes in right subtree 
        getVerticalOrder(root.right, hd + 1);
    }

    getVerticalOrder(root, hd, m);
} 