//find permurations of a string || Time Complexity: O(n*n!)
function permute(a, l, r) {
    // Base case  
    if (l == r)
        return;
    else {
        // Permutations made  
        for (let i = l; i <= r; i++) {

            // Swapping done  
            swap(a[l], a[i]);

            // Recursion called  
            permute(a, l + 1, r);
            console.log(a)
            //backtrack  
            swap(a[l], a[i]);
        }
    }
}

//string str = "ABC".split('');  
//int n = str.size();  
//permute(str, 0, n-1);

//rat in a maze problem
function solveMaze(maze) {
    let sol = Array(m + 1); //boolean array
    for (let i = 0; i < m; i++) {
        sol[i] = Array(n + 1)
        sol[i].fill(0)
    }

    if (solveMazeUtil(maze, 0, 0, sol) == false) {
        printf("Solution doesn't exist");
        return false;
    }

    console.log(sol);
    return true;
}

/* A recursive utility function to solve Maze problem */
function solveMazeUtil(maze, x, y, sol) {
    // if (x, y is goal) return true 
    if (x == N - 1 && y == N - 1) {
        sol[x][y] = 1;
        return true;
    }

    // base condition to Check if maze[x][y] is valid 
    if (x < 0 || x >= N || j < 0 || y >= N || maze[x][y] === 0) {
        return false;
    } else {
        // mark x, y as part of solution path 
        sol[x][y] = 1;

        /* Move forward in x direction */
        if (solveMazeUtil(maze, x, y + 1, sol) == true) return true;

        /* If moving in x direction doesn't give solution then 
           Move down in y direction  */
        if (solveMazeUtil(maze, x + 1, y, sol) == true) return true;

        /* If none of the above movements work then BACKTRACK:  
            unmark x, y as part of solution path */
        sol[x][y] = 0;
        return false;
    }
}