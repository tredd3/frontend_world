//shortest path - BFS
class MatrixItem {
    constructor(row, col, dist) {
        this.row = row;
        this.col = col;
        this.dist = dist;
    }
}
let visited;
function shortestPath({ grid, map, start, end }) {
    let source = new MatrixItem(0, 0, 0);
    let dest = new MatrixItem(0, 0, 0);
    let N = grid.length;
    let M = grid[0].length;
    let sourcefound = false;
    let destfound = false;

    // To keep track of visited MatrixItems. Marking blocked cells as visited. 

    visited = Array.from({ length: M }, e => Array(N).fill(false));//boolean array

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            // Finding source 
            if (grid[i][j] == start) {
                source.row = i;
                source.col = j;
                sourcefound = true;
            }
            // Finding destination 
            if (grid[i][j] == end) {
                dest.row = i;
                dest.col = j;
                destfound = true;
            }
        }
    }

    if (!sourcefound) {
        alert("source not found");
        return 0;
    }
    if (!destfound) {
        alert("destination not found");
        return 0;
    }

    if (start == end) {
        map.set(1, [source.row, source.col])
        return map //indices of row and col
    }

    // applying BFS on matrix cells starting from source 
    let q = [];//queue
    q.push(source);
    map.set(source.dist, [source.row, source.col])
    visited[source.row][source.col] = true;

    function move(row, col, dist) {
        if (visited[row][col] == false) {
            q.push(new MatrixItem(row, col, dist));
            visited[row][col] = true;
            !map.has(dist) && map.set(dist, [row, col])
        }
    }

    while (q.length) {
        let p = q.shift();
        // Destination found; 
        if (grid[p.row][p.col] === end) {
            map.set(p.dist, [p.row, p.col])
            return map; //return p.dist
        }
        // moving up 
        if (p.row - 1 >= 0 && dest.row < source.row && dest.row <= p.row - 1) move(p.row - 1, p.col, p.dist + 1)
        // moving down 
        if (p.row + 1 < N && dest.row > source.row && dest.row >= p.row + 1) move(p.row + 1, p.col, p.dist + 1)
        // moving left 
        if (p.col - 1 >= 0 && dest.col < source.col && dest.col <= p.col - 1) move(p.row, p.col - 1, p.dist + 1)
        // moving right 
        if (p.col + 1 < M && dest.col > source.col && dest.col >= p.col + 1) move(p.row, p.col + 1, p.dist + 1)
    }
    return 0;
}

var grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
var map = new Map() //to store indices
var getPath = shortestPath({ grid, map, start: 1, end: 8 });
if (getPath) {
    for (let [row, col] of map.values()) {
        grid[row][col] = "P"
    }
    console.table(grid)
}
