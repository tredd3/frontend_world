/** INSTRUCTIONS **/
/*************************************************
In the start and end input we'll enter the cell identifier.
Your job is to highlight the shortest path from start to end.

If there are more than one paths, pick any;

The deifnition of a path is the set of cells it must traverse. Youw can go vertically or hirizontally in any direction but not diagonally;

this means from cell C3 you can move to B3, C2, C4, D3;

**************************************************/

var container = document.getElementById('container');
var start = document.getElementById('start');
var end = document.getElementById('end');
var goBtn = document.getElementById('go');
var rowCount = 8;
var colCount = 8;

var rows = new Array(rowCount);
rows.fill(new Array(colCount));

rows = rows.map((row, rowNum) => {
    row.fill(1);
    return row.map((col, colNum) => {

        return `${String.fromCharCode(65 + rowNum)}${colNum + 1}`;
    })
})

rowStr = rows.reduce((fr, r) => {
    let colStr = r.reduce((fc, c) => `${fc}<div class="col">${c}</div>`, '');
    return `${fr}<div class="row">${colStr}</div>`;
}, '');

container.innerHTML = rowStr;

function paint(map) {
    let newrowStr;
    let set = new Set(map.values())
    newrowStr = rows.reduce((fr, r, r_i) => {
        let colStr = r.reduce((fc, c, c_i) => `${fc}<div class=${set.has(c) ? "green col" : "col"}>${c}</div>`, '');
        return `${fr}<div class="row">${colStr}</div>`;
    }, '');
    container.innerHTML = newrowStr;
}

var figure = (rows, start, end) => e => {
    /** WRITE CODE HERE **/
    container.innerHTML = rowStr;
    var START = start.value;
    var END = end.value;
    //shortest path - BFS
    class MatrixItem {
        constructor(row, col, dist) {
            this.row = row;
            this.col = col;
            this.dist = dist;
        }
    }

    function shortestPath({ grid, map, start, end }) {
        let source = new MatrixItem(0, 0, 0);
        let dest = new MatrixItem(0, 0, 0);
        let M = grid.length;
        let N = grid[0].length;
        let sourcefound = false;
        let destfound = false;

        // To keep track of visited MatrixItems. Marking blocked cells as visited. 

        let visited = Array.from({ length: M }, e => Array(N).fill(false));//boolean array

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
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
            map.set(1, grid[source.row][source.col])
            return map //value is stored
        }


        // applying BFS on matrix cells starting from source 
        let q = [];//queue
        q.push(source);
        map.set(source.dist, grid[source.row][source.col])
        visited[source.row][source.col] = true;

        function move(row, col, dist) {
            if (visited[row][col] == false) {
                q.push(new MatrixItem(row, col, dist));
                visited[row][col] = true;
                !map.has(dist) && map.set(dist, grid[row][col])
            }
        }

        while (q.length) {
            let p = q.shift();
            // Destination found; 
            if (grid[p.row][p.col] === end) {
                map.set(p.dist, grid[p.row][p.col])
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

    var map = new Map() //to store indices
    var getPath = shortestPath({ grid: rows, map, start: START, end: END });
    if (getPath) paint(map)
    else alert("no path found")
}

goBtn.onclick = figure(rows, start, end);
