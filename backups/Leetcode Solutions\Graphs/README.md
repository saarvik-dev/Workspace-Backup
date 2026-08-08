## **547. Number of Provinces**

- Leetcode graphs are always zero indexed
- Here, we have to use an extra for loop as the graph is not connected, it consists of many components, hence full traveral is not possible using a single starting loop, we need to check all loops.
***DFS Solution ***


```c++
class Solution {
private:
    void dfs(int node, vector<vector<int>>& isConnected, vector<int>& vis) {

        vis[node] = 1;

        for(int neighbor = 0; neighbor < isConnected.size(); neighbor++) 
        {
            // If connected and not visited, dive in
            if(isConnected[node][neighbor] == 1 && !vis[neighbor])
                dfs(neighbor, isConnected, vis);

        }
    }

public:
    int findCircleNum(vector<vector<int>>& isConnected) {

        int n = isConnected.size();
        vector<int> vis(n, 0);
        int count = 0;

        for(int i = 0; i < n; i++) {
            if(!vis[i]) {
                count++;
                dfs(i, isConnected, vis);
            }
        }
        return count;

    }
};
```

BFS Solution 


```c++
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> vis(n, 0); // Correctly sized for 0-indexed nodes
        int count = 0;

        for(int i = 0; i < n; i++) // Fixed out-of-bounds loop boundary
        {
            if(!vis[i])
            {
                count++; // Found a brand new independent province

                queue<int> bfs;        
                bfs.push(i);
                vis[i] = 1;

                while(!bfs.empty())
                {
                    int ele = bfs.front(); // Pull the current node out
                    bfs.pop();

                    // Correctly scan the matrix row for 'ele', NOT 'i'
                    for(int j = 0; j < isConnected[ele].size(); j++)
                    {
                        if(isConnected[ele][j] == 1 && !vis[j]) {
                            vis[j] = 1;
                            bfs.push(j);
                        }
                    }
                }
            }
        }
        return count;
    }
};
```


---

## 994. Rotting Oranges

### ALGORITHM (…..)

- **Structures:** Create a `queue<pair<int, int>> q` to store cell coordinates, and a `fresh_count` variable.
- **Scan Grid:** Loop through all cells. If rotten (`2`), push `(r, c)` into `q`. If fresh (`1`), increment `fresh_count`.
- **Edge Case:** If `fresh_count == 0`, return `0` immediately.
- **Timer:** Initialize `minutes = 0`.
- **Track Level Size:** While `q` is not empty, set `size = q.size()` and `rotted_any = false`.
- **Loop Level:** Run a loop `size` times. For each iteration:
- Pop the front coordinate `(r, c)`.
- Check its 4 adjacent boundaries (Up, Down, Left, Right).
- **Infect & Push:** If an adjacent neighbor is fresh (`1`):
- Flip it to `2` in the grid (acts as the visited check).
- Push neighbor `(nRow, nCol)` into `q`.
- Decrement `fresh_count`.
- Set `rotted_any = true`.
- **Increment Time:** After exiting the `size` loop, if `rotted_any` is true, increment `minutes` by 1.
- **Result:** Once `q` is empty, if `fresh_count == 0`, return `minutes`. Otherwise, return `1`.
What is different from the number of provinces problem ??

Single-Source vs. Multi-Source BFS

Instead of looping through the grid and starting a fresh queue every time you see a rotten orange, look through the *entire* grid first. Find **every single rotten orange** at Time = 0, and push all of their coordinates into your queue right away *before* you start the `while(!bfs.empty())` loop.


```c++
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
    
    int m = grid.size();
    int n = grid[0].size();

    queue <pair <int, int>> bfs;
    int fresh = 0;
    for(int i = 0; i < m; i++)
    {
        for(int j = 0; j < n; j++)
        {
            if(grid[i][j] == 2)
                bfs.push({i, j});   //Push rotten orange's position
            if(grid[i][j] == 1)
                fresh++;
        }
    }

    if(fresh == 0)  return 0;
    vector <int> drow = {-1, 1, 0, 0};
    vector <int> dcol = {0, 0, -1, 1};

    int minutes = 0;
    while(!bfs.empty())
    {
        int size = bfs.size();
        bool rotted_any = false;
        for(int i = 0; i < size; i++)
        {
            auto[r, c] = bfs.front();
            bfs.pop();

            for(int j = 0; j < 4; j++)
            {
                int row = r + drow[j];
                int col = c + dcol[j];

                if(row >= 0 && row < m && col >= 0 && col < n)
                {
                    if(grid[row][col] == 1)
                    {
                        grid[row][col] = 2;
                        bfs.push({row, col});
                        fresh--;
                        rotted_any = true;
                    }
                }
            }
        }
        if(rotted_any == true)
            minutes++;
    }

    return (fresh == 0) ? minutes : -1;
    }
};
```


---

## **733. Flood Fill**

***BFS***-- Not best solution for this problem


```plain text
// Change this:
vector<int> drow = {-1, 1, 0, 0};
vector<int> dcol = {0, 0, -1, 1};

// To this:
int drow[] = {-1, 1, 0, 0};
int dcol[] = {0, 0, -1, 1};
```

**Why:** `std::vector` dynamically allocates memory on the heap, which is comparatively slow. Standard C-style arrays allocate memory right on the stack, which is virtually instantaneous. For fixed-size data like 4 directions, always use arrays.


```c++
/*
Obviously BFS , quite same
*/
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
    
    
    if (image[sr][sc] == color) return image;   //Very very important edge case which i forgot


    int m = image.size();
    int n = image[0].size();
    int curr_color = image[sr][sc];

    queue <pair<int, int>> bfs;

    bfs.push({sr, sc});
    image[sr][sc] = color;
    
    vector <int> drow = {-1, 1, 0, 0};
    vector <int> dcol = {0, 0, -1, 1};

    while(!bfs.empty())
    {
        //Check neighbours and change color
        int size = bfs.size();

        for(int i = 0; i < size; i++)
        {
            auto [r, c] = bfs.front();
            bfs.pop();

            for(int j = 0; j < 4; j++)
            {
                int row = r + drow[j];
                int col = c + dcol[j];

                if(row >= 0 && row < m && col >= 0 && col < n)
                {
                    if(image[row][col] == curr_color)
                    {
                        image[row][col] = color;
                        bfs.push({row, col});
                    }
                }
            }
        }
    }

    return image;
    }
};
```

***DFS***



```c++
//A dfs solution is more optimal for this problem as push and pop operations are easier in the 
//call stack , rather than a queue of pairs

class Solution {
private:
    void dfs(vector<vector<int>>& image, int row, int col, int curr_color, int color,
            int m, int n)
    {
        if(row < 0 || row >= m || col < 0 || col >= n || image[row][col] != curr_color)
            return;

        image[row][col] = color;

        dfs(image, row, col - 1, curr_color, color, m, n);
        dfs(image, row, col + 1, curr_color, color, m, n);
        dfs(image, row - 1, col, curr_color, color, m, n);
        dfs(image, row + 1, col, curr_color, color, m, n);
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {

    int m = image.size();
    int n = image[0].size();

    if(image[sr][sc] == color)
        return image;

    int curr_color = image[sr][sc];

    dfs(image, sr, sc, curr_color, color, m, n);

    return image;

    }
};
```


---

## 997. Find the town judge

***Brute Force — Hash MAP***


```c++
class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
    
    //Brute Force Approach : Using a hash table we can easily track record of this

    unordered_map <int, vector <int>> hash;

    for(int i = 0; i < trust.size(); i++)
    {
        hash[trust[i][0]].push_back(trust[i][1]);
    }
    int judge = -1;
    for(int i = 1; i <= n; i++)
    {
        if(hash.find(i) == hash.end())
            judge = i;
    }

    if(judge == -1)
        return -1;

    
    for(int i = 1; i <= n; i++)
    {
        if(std::find(hash[i].begin(), hash[i].end(), judge) == hash[i].end() && i != judge)
            return -1;
    }

    return judge;

    
    
    }
};
```

Optimal — Indegree and Outdegree


```c++
class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        // We need an array of size n + 1 (to handle 1-indexed people)
        // initialized to 0
        vector<int> trust_score(n + 1, 0);

        // A trusts B
        for(const auto& t : trust) {
            trust_score[t[0]]--; // Person t[0] trusts someone, so they lose a point (can't be judge)
            trust_score[t[1]]++; // Person t[1] is trusted, so they gain a point
        }

        // The judge must have exactly n - 1 points
        for(int i = 1; i <= n; i++) {
            if(trust_score[i] == n - 1) {
                return i;
            }
        }

        return -1;
    }
};
```


---

## **207. Course Schedule**

This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.


---

## **542. 01 Matrix**

Start from all the `0`s simultaneously and flood outward to find the `1`s.

In  a way we are moving from the zeroes to the ones, and along the way we convert the ones into zeros(you can say) by adding them into the queue

- **Initialize Structures:** Create a `queue` for coordinates and a `distance` matrix of the same size, initially filled with `1` (to represent unvisited cells).
- **Load the Sources:** Traverse the grid. For every `0` found, set its `distance` to `0` and push its coordinates `(r, c)` into the queue.
- **Process the Queue (BFS):** Loop while the queue is not empty:
- Pop the front cell `(r, c)`.
- Calculate the coordinates for its 4 valid neighbors (up, down, left, right).
- **Update and Enqueue:** For each valid neighbor that is **unvisited** (`distance == -1`):
- Set its distance: `distance[neighbor] = distance[r][c] + 1`.
- Push the neighbor's coordinates into the queue.
- **Completion:** Once the queue is empty, the `distance` matrix contains the shortest path to all cells. Return it.

```c++
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {

    int m = mat.size();
    int n = mat[0].size();

    queue <pair<int, int>> bfs;
    vector<vector<int>> dis(m, vector<int>(n, -1));

    for(int i = 0 ; i < m; i++)
    {
        for(int j = 0; j < n; j++)
        {
            if(mat[i][j] == 0)
            {
                bfs.push({i, j});
                dis[i][j] = 0;
            }
        }
    }

    //Now the queue is filled with all zero cell coordinates, now we'll try to flood towards the 1, this ensures the distance is always minimum

    //BFS
    int drow[] = {-1, 1, 0, 0};
    int dcol[] = {0, 0, -1, 1};

    while(!bfs.empty())
    {
        auto [r, c] = bfs.front();
        bfs.pop();

        for(int i = 0; i < 4; i++)
        {
            int row = r + drow[i];
            int col = c + dcol[i];

            if(row >= 0 && row < m && col >= 0 && col < n)
            {
                //if not visited
                if(dis[row][col] == -1)
                {
                    dis[row][col] = dis[r][c] + 1;
                    bfs.push({row, col});
                }
            }
        }
    }

    return dis;
    }
};
```


---

## **130. Surrounded Regions**


Here is a slight shift in perspective: instead of trying to find and capture all the 'O's that *are* surrounded, think about the 'O's that **cannot** be surrounded.

Any 'O' that is directly on the boundary (edge) of the matrix cannot be surrounded. And by extension, any 'O' that is connected (horizontally or vertically) to an edge 'O' is also completely safe.


***BFS***


```c++
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        
        int m = board.size();
        int n = board[0].size();
        queue<pair<int, int>> q;
        
        // 1. Find all 'O's on the borders, mark them as safe ('#'), and push to queue
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') {
                q.push({i, 0});
                board[i][0] = '#'; 
            }
            if (board[i][n - 1] == 'O') {
                q.push({i, n - 1});
                board[i][n - 1] = '#'; 
            }
        }
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') {
                q.push({0, j});
                board[0][j] = '#';
            }
            if (board[m - 1][j] == 'O') {
                q.push({m - 1, j});
                board[m - 1][j] = '#';
            }
        }
        
        // 2. BFS to traverse and mark all inner 'O's connected to the border as safe
        vector<pair<int, int>> dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            
            for (auto d : dirs) {
                int nr = r + d.first;
                int nc = c + d.second;
                
                // If it's a valid coordinate and is an 'O', it's safe
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == 'O') {
                    board[nr][nc] = '#';
                    q.push({nr, nc});
                }
            }
        }
        
        // 3. Final Pass: 
        // Any remaining 'O's were never reached from a border, so capture them ('X').
        // Any '#' was a safe 'O', so revert it back to 'O'.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                } else if (board[i][j] == '#') {
                    board[i][j] = 'O';
                }
            }
        }
    }
};
```

***DFS***


```c++
class Solution {
    void dfs(vector<vector<char>>& board, int row, int col, int m, int n) {
        // OPTIMIZED BASE CASE: Only proceed if the cell is explicitly an 'O'
        if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] != 'O')
            return;

        // Mark the current cell as safe
        board[row][col] = '#';

        // Traverse all 4 directions
        dfs(board, row, col - 1, m, n);
        dfs(board, row, col + 1, m, n);
        dfs(board, row - 1, col, m, n);
        dfs(board, row + 1, col, m, n);
    }

public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;

        int m = board.size();
        int n = board[0].size();

        // 1. Check the first and last column
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') dfs(board, i, 0, m, n);
            if (board[i][n - 1] == 'O') dfs(board, i, n - 1, m, n);
        }
        
        // 2. Check the first and last row
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') dfs(board, 0, j, m, n);
            if (board[m - 1][j] == 'O') dfs(board, m - 1, j, m, n);
        }

        // 3. Flip the board to its final state
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X'; // Enclosed region, capture it
                } else if (board[i][j] == '#') {
                    board[i][j] = 'O'; // Boundary-connected region, revert it
                }
            }
        }
    }
};
```


---

## 1020. Number of Enclaves

***BFS***


```javascript
class Solution {
public:
    int numEnclaves(vector<vector<int>>& grid) {

        // BFS Solution

        int m = grid.size();
        int n = grid[0].size();

        queue<pair<int, int>> bfs;
        int res = 0;

        for (int i = 0; i < m; i++) {
            if (grid[i][0] == 1) {
                bfs.push({i, 0});
                grid[i][0] = -1;
            }

            if (grid[i][n - 1] == 1) {
                bfs.push({i, n - 1});
                grid[i][n - 1] = -1;
            }
        }

        for (int j = 0; j < n; j++) {
            if (grid[0][j] == 1) {
                bfs.push({0, j});
                grid[0][j] = -1;
            }
            if (grid[m - 1][j] == 1) {
                bfs.push({m - 1, j});
                grid[m - 1][j] = -1;
            }
        }

        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, -1, 1};

        while (!bfs.empty()) {
            auto [r, c] = bfs.front();
            bfs.pop();

            for (int i = 0; i < 4; i++) {
                int row = r + drow[i];
                int col = c + dcol[i];

                if (row >=0 && col >= 0 && row < m && col < n && grid[row][col] == 1) {
                    bfs.push({row, col});
                    grid[row][col] = -1;
                }
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if(grid[i][j] == 1)
                    res++;
                if (grid[i][j] == -1)
                    grid[i][j] = 1;
            }
        }

        return res;
    }
};
```

***DFS***


```c++
class Solution {
    void dfs(vector<vector<int>>& grid, int r, int c, int m, int n) {
        // Base Case: Stop if out of bounds or if the cell is NOT unvisited land (1)
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != 1) {
            return;
        }

        // Mark as part of the boundary-connected land
        grid[r][c] = -1; 

        // Traverse all 4 directions
        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }

public:
    int numEnclaves(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();

        // 1. Run DFS from all 1s on the left and right boundaries
        for (int i = 0; i < m; i++) {
            if (grid[i][0] == 1) dfs(grid, i, 0, m, n);
            if (grid[i][n - 1] == 1) dfs(grid, i, n - 1, m, n);
        }

        // 2. Run DFS from all 1s on the top and bottom boundaries
        // (Starting at 1 and ending at n-2 to skip the corners we already checked)
        for (int j = 1; j < n - 1; j++) {
            if (grid[0][j] == 1) dfs(grid, 0, j, m, n);
            if (grid[m - 1][j] == 1) dfs(grid, m - 1, j, m, n);
        }

        // 3. Count remaining isolated 1s and restore the grid
        int enclaves = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    enclaves++;
                } else if (grid[i][j] == -1) {
                    grid[i][j] = 1; // Clean up the mutation
                }
            }
        }

        return enclaves;
    }
};
```


---

## 200. Number of Islands

***DFS***


```c++
class Solution {
private:
    void dfs(vector<vector<char>>& grid, int r, int c, int m, int n)
    {
        if(r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1')
            return;

        grid[r][c] = '#';

        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }

public:
    int numIslands(vector<vector<char>>& grid) {

        int m = grid.size();
        int n = grid[0].size();
        int count = 0;

        for(int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if(grid[i][j] == '1')
                {   
                    count++;
                    dfs(grid, i, j, m, n);
                }
            }
        }

         for(int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if(grid[i][j] == '#')
                    grid[i][j] = '1';
            }
        }

        return count;
    }
};
```

***BFS***


```c++
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty())
            return 0;

        int m = grid.size();
        int n = grid[0].size();
        int islands = 0;

        // Direction vectors for clean boundary traversal
        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, -1, 1};

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    islands++;

                    // Mark as visited BEFORE entering the queue
                    grid[i][j] = '#';
                    queue<pair<int, int>> q;
                    q.push({i, j});

                    // BFS Traversal
                    while (!q.empty()) {
                        auto [r, c] = q.front();
                        q.pop();

                        for (int d = 0; d < 4; d++) {
                            int nr = r + drow[d];
                            int nc = c + dcol[d];

                            if (nr >= 0 && nr < m && nc >= 0 && nc < n &&
                                grid[nr][nc] == '1') {
                                // CRITICAL: Mark immediately so other neighbors
                                // don't add this same cell
                                grid[nr][nc] = '#';
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }

        // Restore the grid (Professional software engineering practice)
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '#') {
                    grid[i][j] = '1';
                }
            }
        }

        return islands;
    }
};
```


---

## 207. Course Schedule

**How Topological Sort Comes into Action**
Topological Sorting is an algorithm used specifically on Directed Acyclic Graphs (DAGs) to produce a linear ordering of vertices. In this ordering, for every directed edge $u \to v$, vertex $u$ will strictly appear before vertex $v$.
If a graph contains a cycle, a valid topological sort is **impossible**. So, if we attempt a topological sort and fail to process every single node, we know a cycle exists.

***BFS***

Here, we can directly apply the bfs algo of topo sort


```c++
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {

        // This question is basically finding a cycle in a directed graph
        //[a, b] -> b is parent of a or there is an edge between b and a
        // Let's go through the bfs solution first / kahn's algorithm

        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        int size = prerequisites.size();

        for (int i = 0; i < size; i++) {
            int a = prerequisites[i][0];
            int b = prerequisites[i][1];
            indegree[a]++;
            adj[b].push_back(a);
        }

        // Add all nodes with indegree zero into a queue

        queue<int> bfs;
        int courses = 0;

        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0)
                bfs.push(i);

        while (!bfs.empty()) {
            int node = bfs.front();
            bfs.pop();
            courses++;

            for (auto it : adj[node]) {
                indegree[it]--;
                if (indegree[it] == 0)
                    bfs.push(it);
            }
        }

        return numCourses == courses;
    }
};
```

***DFS***

We cannot directly apply here standard DFS, because DFS  version of topo sort doesn;t get stuck on cyclic graphs, instead its returns a wrong level ordering, so our logic of courses ≠ numcourses won’t work with the DFS version.


In a directed graph, hitting an already visited node doesn't strictly mean there is a cycle. A cycle ONLY exists if you hit a node that is **currently in the active recursive path**.






```c++
class Solution {
private:
    // Helper function to detect cycles. Returns TRUE if a cycle is found.
    bool detectCycleDFS(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& pathVis) {
        vis[node] = 1;
        pathVis[node] = 1; // Mark as currently in our active path

        for (int neighbor : adj[node]) {
            // 1. If unvisited, recursively visit it
            if (!vis[neighbor]) {
                if (detectCycleDFS(neighbor, adj, vis, pathVis)) {
                    return true; // Cycle found deeper down the path
                }
            }
            // 2. CRITICAL CHECK: If visited AND in our active path -> Cycle!
            else if (pathVis[neighbor] == 1) {
                return true; 
            }
        }

        // Backtrack: Stepping out of this path, so unmark it
        pathVis[node] = 0;
        return false;
    }

public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // 1. Build the adjacency list
        vector<vector<int>> adj(numCourses);
        for (const auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
        }

        // 2. Track global visits and active path visits
        vector<int> vis(numCourses, 0);
        vector<int> pathVis(numCourses, 0);

        // 3. Check every node (the graph might be disconnected)
        for (int i = 0; i < numCourses; i++) {
            if (!vis[i]) {
                // If a cycle is detected, we cannot finish the courses
                if (detectCycleDFS(i, adj, vis, pathVis)) {
                    return false; 
                }
            }
        }

        // If we processed all nodes without hitting a cycle, it's possible!
        return true;
    }
};
```


---

## 210. Course Schedule II

***BFS (Kahn’s Algorithm)***


```c++
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {

    //BFS Version of Topological Sort (Kahn's Alorithm)    

    vector <vector<int>> adj(numCourses);
    vector <int> indegree(numCourses, 0);

    for(const auto &pre : prerequisites)
    {
        adj[pre[1]].push_back(pre[0]);
        indegree[pre[0]]++;
    }

    queue <int> bfs;

    for(int i = 0; i < numCourses; i++)
        if(indegree[i] == 0)
            bfs.push(i);
    
    vector <int> ans;

    while(!bfs.empty())
    {
        int node = bfs.front();
        bfs.pop();

        ans.push_back(node);

        for(auto it : adj[node])
        {
            indegree[it]--;

            if(indegree[it] == 0)
                bfs.push(it);
        }
    }

    return (ans.size() == numCourses) ? ans : vector <int> {};

    }
};
```

***DFS***

- **1. Early Exit:** Stop the outer loop and `return {}` the *moment* a cycle is detected to avoid wasting CPU cycles on remaining graph components.
- **2. Vector + Reverse:** Pass the `ans` vector directly into the DFS and `reverse()` it at the end. This eliminates the structural and copying overhead of a `std::stack`.
- **3. Pre-allocate Memory:** Use `ans.reserve(numCourses)` upfront to completely eliminate the internal runtime overhead of dynamic vector resizing.
- **4. Streamlined State:** Remove redundant variables like a `courses` counter; let the boolean cycle output be your single source of truth.

```c++
class Solution {
    bool detectCycleDFS(const vector<vector<int>> &adj, int node, 
                        vector<int> &vis, vector<int> &pathVis, vector<int> &ans) {
        vis[node] = 1;
        pathVis[node] = 1;

        // Changed 'it' to 'nextCourse' for readability
        for (int nextCourse : adj[node]) {
            if (!vis[nextCourse]) {
                if (detectCycleDFS(adj, nextCourse, vis, pathVis, ans)) {
                    return true;
                }
            } else if (pathVis[nextCourse] == 1) {
                return true;
            }
        }

        // Backtrack
        pathVis[node] = 0;
        
        // Push directly to the answer vector instead of a stack
        ans.push_back(node); 
        return false;
    }

public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        for (const auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
        }

        vector<int> vis(numCourses, 0);
        vector<int> pathVis(numCourses, 0);
        
        vector<int> ans;
        // Optimization: Pre-allocate memory since we know the max size
        ans.reserve(numCourses); 

        for (int i = 0; i < numCourses; i++) {
            if (!vis[i]) {
                if (detectCycleDFS(adj, i, vis, pathVis, ans)) {
                    // CRITICAL: Early exit the moment a cycle is found
                    return {}; 
                }
            }
        }

        // The vector is currently built backwards, so just reverse it
        reverse(ans.begin(), ans.end());
        
        return ans;
    }
};
```


---

## 802. Find eventual safe states

A node is "safe" if *every* path from it leads to a terminal node. If you can get stuck in a loop (a cycle) from a node, or if a path from a node can lead into a cycle, that node is **not** safe. Therefore, a node is safe if and only if it does not belong to a cycle and cannot reach a cycle.


***DFS***


```c++

```


---

## 127. Word Ladder

- Uses `unordered_set` 
- This is the most important conceptual question for this problem. The code guarantees the minimum length not by comparing multiple different paths at the end, but through the inherent mathematical nature of **Breadth-First Search (BFS)**.
- In an unweighted graph (where every letter change costs exactly 1 step), **BFS is guaranteed to find the shortest path first.**

```c++
#include <vector>
#include <string>
#include <queue>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        // 1. Insert all words into a set for O(1) average lookup times
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        
        // Edge Case: If the endWord isn't even in the list, no path can exist
        if (wordSet.find(endWord) == wordSet.end()) {
            return 0;
        }

        // 2. BFS Queue stores pairs of {current_word, current_path_length}
        queue<pair<string, int>> bfs;
        bfs.push({beginWord, 1});

        // Erase the start word if it's in the set to avoid cycling back to it
        if (wordSet.find(beginWord) != wordSet.end()) {
            wordSet.erase(beginWord);
        }

        // 3. Begin BFS Traversal
        while (!bfs.empty()) {
            auto [currentWord, level] = bfs.front();
            bfs.pop();

            // Target reached! Return the number of words in the shortest sequence
            if (currentWord == endWord) {
                return level;
            }

            // Generate neighbors by mutating each character of the word
            string originalWord = currentWord;
            for (int i = 0; i < currentWord.length(); i++) {
                char originalChar = currentWord[i];

                // Try changing the character at index i to every letter from 'a' to 'z'
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    if (ch == originalChar) continue; // Skip identical substitution

                    currentWord[i] = ch;

                    // If the mutated word exists in our dictionary, it's a valid neighbor
                    if (wordSet.find(currentWord) != wordSet.end()) {
                        // CRITICAL: Erase immediately to act as a 'visited' marker
                        wordSet.erase(currentWord); 
                        bfs.push({currentWord, level + 1});
                    }
                }

                // Restore the character before moving to the next position
                currentWord[i] = originalChar;
            }
        }

        // If the queue is empty and we haven't hit the endWord, it's impossible
        return 0;
    }
};
```


---

## 785. Is graph bipartite ?

Graph - Coloring Algorithm

***BFS***

- Create a `color` array filled with `1` (meaning uncolored).
- Go to an uncolored node and paint it `0` (Blue).
- Look at all its neighbors. They *must* be painted `1` (Red).
- Look at their neighbors. They *must* be painted `0` (Blue).
- If you ever look at a neighbor and it is **already painted the same color as you**, the graph is not bipartite. Return `false`.

```c++
	class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        // color array: -1 means uncolored, 0 and 1 are our two colors
        vector<int> color(n, -1);

        // We use a loop because the graph might be disconnected
        for (int i = 0; i < n; i++) {
            // If the node is uncolored, start a BFS from it
            if (color[i] == -1) {
                queue<int> q;
                q.push(i);
                color[i] = 0; // Paint the starting node color 0

                while (!q.empty()) {
                    int node = q.front();
                    q.pop();

                    // Check all neighbors of the current node
                    for (int neighbor : graph[node]) {
                        // If uncolored, paint it the OPPOSITE color and push to queue
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[node]; // Flips 0 to 1, or 1 to 0
                            q.push(neighbor);
                        } 
                        // If it has the SAME color as the current node, it's not bipartite!
                        else if (color[neighbor] == color[node]) {
                            return false;
                        }
                    }
                }
            }
        }
        
        return true;
    }
};
```


---

## **1091. Shortest Path in Binary Matrix**


```c++
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        
        // Edge Case: If the start or end is blocked, a path is impossible
        if(grid[0][0] != 0 || grid[n-1][n-1] != 0) {
            return -1;
        }

        queue<pair<int, int>> bfs;
        bfs.push({0, 0});
        
        // FIX 1: Mark the starting node as visited instantly by setting its distance to 1.
        // (LeetCode counts the number of cells in the path, so the start cell counts as 1).
        grid[0][0] = 1; 
        
        int drow[] = {-1, 1, 0, 0, -1, -1, 1, 1};
        int dcol[] = {0, 0, -1, 1, -1, 1, -1, 1};

        while(!bfs.empty()) {
            auto [r, c] = bfs.front();
            bfs.pop();

            // FIX 2: Check if we reached the target and return the distance stored in the grid
            if(r == n - 1 && c == n - 1) {
                return grid[r][c]; 
            }

            for(int i = 0; i < 8; i++) {
                int row = r + drow[i];
                int col = c + dcol[i];

                // Check bounds AND ensure the cell is unvisited (value is 0)
                if(row >= 0 && col >= 0 && row < n && col < n && grid[row][col] == 0) {
                    
                    // FIX 3: Instantly update the cell's distance BEFORE pushing it to the queue.
                    // This acts as our distance tracker AND our visited marker simultaneously!
                    grid[row][col] = grid[r][c] + 1;
                    
                    bfs.push({row, col});
                }
            }
        }

        // If the queue empties and we never hit the bottom-right, no path exists
        return -1; 
    }
};
```


---

## **1631. Path With Minimum Effort**

This problem is a masterclass in adapting standard algorithms. Since the "distance" between cells is the absolute difference in their heights, this is fundamentally a **weighted graph problem**.

Because the weights can vary wildly, a standard BFS will fail (it would require redundant re-evaluations). Since we need the absolute minimum effort, and the graph has no negative weights, this is the perfect textbook scenario for **Dijkstra's Algorithm**.
We use a Min-Heap (`priority_queue`) to always process the path with the smallest maximum effort first. The very first time our Min-Heap pops the bottom-right cell, we are mathematically guaranteed it is the optimal path.




In C++, `priority_queue` is a **Max-Heap** by default. This would pop the *worst* path first instead of the best. To make it a Min-Heap, you must explicitly pass the container type and the `greater` comparator.




```c++
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size();
        int n = heights[0].size();

        // 1. Initialize a MIN-HEAP
        priority_queue<pair<int, pair<int, int>>, 
                       vector<pair<int, pair<int, int>>>, 
                       greater<pair<int, pair<int, int>>>> pq;
        
        // 2. State Tracker: Stores the minimum effort required to reach each cell
        vector<vector<int>> effortTo(m, vector<int>(n, INT_MAX));

        pq.push({0, {0, 0}});
        effortTo[0][0] = 0;

        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, 1, -1};

        while(!pq.empty()) {
            // 3. Correct unpacking and queue access
            auto [effort, coords] = pq.top();
            int r = coords.first;
            int c = coords.second;
            pq.pop();

            // If we popped the destination, it is mathematically guaranteed to be the minimum effort
            if(r == m - 1 && c == n - 1) {
                return effort;
            }

            // Lazy Deletion: Ignore paths that are worse than what we've already found
            if(effort > effortTo[r][c]) continue;

            for(int i = 0; i < 4; i++) {
                int row = r + drow[i];
                int col = c + dcol[i];

                if(row >= 0 && row < m && col >= 0 && col < n) {
                    
                    // 4. Correct logic: max of current path effort vs the next jump
                    int jump = abs(heights[row][col] - heights[r][c]);
                    int newEffort = max(effort, jump);

                    // If this path is strictly better than the previously recorded effort, update it
                    if(newEffort < effortTo[row][col]) {
                        effortTo[row][col] = newEffort;
                        pq.push({newEffort, {row, col}});
                    }
                }
            }
        }    
        
        return 0; // Fallback return
    }
};
```


---

## **787. Cheapest Flights Within K Stops**

### **Why do we push cost in the queue as well as keep a shortestDis array ?**

To put it simply: the **queue cost** is the active runner, and the `shortestDis`** array** is the global record book. You need both to prevent the algorithm from doing millions of redundant calculations.

Here is the exact breakdown of their different roles:

### 1. The Cost in the Queue (The "Active Runner")

When you push `{stops, node, current_cost}` into the queue, you are tracking the state of **one specific, isolated flight path.** * It only knows its own history.

- If a path goes from `A -> B -> C`, the cost in the queue is specifically the price of that exact ticket combination.
- When you pop this node from the queue, you use this `current_cost` to calculate the price of the next jump.
### 2. The `shortestDis` Array (The "Global Record Book")

The array `vector<int> shortestDis` has no idea how many stops you took or what path you used. Its only job is to track the **absolute cheapest price anyone has found to reach a specific city so far.**

### Why You Need Both (The Pruning Magic)

Imagine your BFS is exploring paths and reaches City X.

Because BFS explores level-by-level (0 stops, then 1 stop, then 2 stops), time flows forward uniformly.

If Path B arrives at City X at Level 2, we know for a fact it took more stops than a path that arrived at Level 1.

Here is where the two structures interact to save your time complexity:

- **The Check:** Path B looks at its own queue cost (e.g., $500). It then looks at the `shortestDis` array for City X (which says $300).
- **The Execution:** The algorithm realizes, *"Path B took MORE stops and is MORE expensive than a path we already found."* * **The Result:** The algorithm instantly throws Path B in the trash. It does not push it back into the queue.
If you didn't have the `shortestDis` array to act as this ruthless bouncer, your queue would blindly explore every single possible flight combination under `k` stops. In a dense graph, that turns an $O(E)$ algorithm into an exponential nightmare, and LeetCode will immediately hand you a Time Limit Exceeded error.

**Summary:** The queue remembers the math for the current path, and the array acts as a filter to instantly kill any path that is worse than what you've already discovered.


```c++
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        
        // 1. Build the Adjacency List correctly (Vector of Vectors)
        vector<vector<pair<int, int>>> adj(n);
        for (auto it : flights) {
            int from = it[0];
            int to = it[1];
            int cost = it[2];
            adj[from].push_back({to, cost});
        }

        // 2. The Global Record Book (Tracks absolute minimum cost to reach each node)
        vector<int> minCost(n, INT_MAX);
        minCost[src] = 0;

        // 3. The Active Queue tracking {stops, {current_node, current_cost}}
        queue<pair<int, pair<int, int>>> bfs;
        bfs.push({0, {src, 0}});

        while (!bfs.empty()) {
            auto [stops, nodeInfo] = bfs.front();
            bfs.pop(); // NEVER FORGET THE POP!

            int curr_node = nodeInfo.first;
            int curr_cost = nodeInfo.second;

            // If this path has already reached the maximum allowed stops, 
            // we cannot explore its neighbors. Stop this specific branch.
            if (stops > k) {
                continue;
            }

            // 4. Explore all valid flights leaving from the current city
            for (auto it : adj[curr_node]) {
                int neighbor = it.first;
                int flight_cost = it.second;

                int newCost = curr_cost + flight_cost;

                // 5. The Pruning Magic: Only proceed if this path offers a cheaper route
                if (newCost < minCost[neighbor]) {
                    minCost[neighbor] = newCost;
                    
                    // Push the neighbor to the queue, incrementing the stops by 1
                    bfs.push({stops + 1, {neighbor, newCost}});
                }
            }
        }

        // If the destination is still INT_MAX, it means we never found a valid path under k stops
        return minCost[dst] == INT_MAX ? -1 : minCost[dst];
    }
};
```

***Alternate Solution***


```c++
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // Step 1: Build the adjacency list
        // adj[u] = vector of pairs {v, price}
        vector<vector<pair<int, int>>> adj(n);
        for (auto& flight : flights) {
            adj[flight[0]].push_back({flight[1], flight[2]});
        }
        
        // Step 2: Initialize distance array and queue
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        
        // Queue stores {node, cost_to_reach_node}
        queue<pair<int, int>> q;
        q.push({src, 0});
        
        int stops = 0;
        
        // Step 3: Level-order BFS
        // We only process up to 'k' stops, which means k + 1 levels of expansion
        while (!q.empty() && stops <= k) {
            int size = q.size();
            
            // Process all nodes at the current stop level
            for (int i = 0; i < size; i++) {
                auto [curr, cost] = q.front();
                q.pop();
                
                // Explore valid flights from the current city
                for (auto& [neighbor, price] : adj[curr]) {
                    
                    // If we found a cheaper way to reach the neighbor, update and queue it
                    if (cost + price < dist[neighbor]) {
                        dist[neighbor] = cost + price;
                        q.push({neighbor, cost + price});
                    }
                }
            }
            // Finished expanding one level, increment stops
            stops++;
        }
        
        // Step 4: Return result
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```


---

## **743. Network Delay Time**


```c++
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        
        // 1. Build the Adjacency List
        // adj[u] will hold pairs of {neighbor, travel_time}
        vector<vector<pair<int, int>>> adj(n + 1);
        for (const auto& time : times) {
            int u = time[0];
            int v = time[1];
            int w = time[2];
            adj[u].push_back({v, w});
        }

        // 2. The Global Record Book (Tracks the fastest time a signal reached each node)
        vector<int> signalReceivedAt(n + 1, INT_MAX);
        signalReceivedAt[k] = 0; // The starting node gets the signal at time 0

        // 3. Min-Heap (Priority Queue) sorting by {current_time, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, k});

        while (!pq.empty()) {
            auto [curr_time, curr_node] = pq.top();
            pq.pop();

            // Lazy Deletion: Ignore paths that are slower than our currently known best time
            if (curr_time > signalReceivedAt[curr_node]) {
                continue;
            }

            // Explore all outgoing signals from the current node
            for (const auto& edge : adj[curr_node]) {
                int neighbor = edge.first;
                int travel_time = edge.second;

                int new_time = curr_time + travel_time;

                // If this path delivers the signal faster, update the record book and push to queue
                if (new_time < signalReceivedAt[neighbor]) {
                    signalReceivedAt[neighbor] = new_time;
                    pq.push({new_time, neighbor});
                }
            }
        }

        // 4. Find the time it took for the last node to receive the signal
        int max_time = 0;
        for (int i = 1; i <= n; i++) {
            // If any node is still INT_MAX, the signal never reached it
            if (signalReceivedAt[i] == INT_MAX) {
                return -1; 
            }
            max_time = max(max_time, signalReceivedAt[i]);
        }

        return max_time;
    }
};
```


---

## 1976. Number of ways to arrive at destination


```c++
class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        int MOD = 1e9 + 7;
        
        // Build adjacency list: {neighbor, weight}
        vector<vector<pair<int, int>>> adj(n);
        for (const auto& road : roads) {
            adj[road[0]].push_back({road[1], road[2]});
            adj[road[1]].push_back({road[0], road[2]});
        }

        // minTime stores the minimum time to reach each node (initialized to infinity)
        vector<long long> minTime(n, LLONG_MAX);
        // ways stores the number of shortest paths to reach each node
        vector<long long> ways(n, 0);

        // Min-heap priority queue storing {time, node}
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;

        // Base cases for source node (0)
        minTime[0] = 0;
        ways[0] = 1;
        pq.push({0, 0}); // {time, node}

        while (!pq.empty()) {
            auto [time, node] = pq.top();
            pq.pop();

            // If we found a shorter path to this node already, skip processing
            if (time > minTime[node]) continue;

            for (const auto& neigh : adj[node]) {
                int stop = neigh.first;
                long long wt = neigh.second;

                // Case 1: Found a strictly shorter path to 'stop'
                if (time + wt < minTime[stop]) {
                    minTime[stop] = time + wt;
                    ways[stop] = ways[node]; // Inherit all ways from the current node
                    pq.push({minTime[stop], stop});
                }
                // Case 2: Found another path to 'stop' with the exact same shortest time
                else if (time + wt == minTime[stop]) {
                    ways[stop] = (ways[stop] + ways[node]) % MOD;
                }
            }
        }

        return ways[n - 1];
    }
};
```


---

## **3965. Finish Time of Tasks I**


```c++
class Solution {
private:
    long long finishTask(int n, int node, vector <vector<int>> &adj, 
                         vector <int> &baseTime) {

        
        //If leaf node
        if(adj[node].size() == 0)
            return baseTime[node];
        
        long long earliest = LLONG_MAX, latest = LLONG_MIN;
        //Traverse Children
        for(auto child : adj[node]) {
            long long curr_time = finishTask(n, child, adj, baseTime);

            earliest = min(earliest, curr_time);
            latest = max(latest, curr_time);
        }

        long long ownDuration = (latest - earliest) + baseTime[node];

        return latest + ownDuration;
    
    }                     
public:
    long long finishTime(int n, vector<vector<int>>& edges, vector<int>& baseTime) {

        //Build an adjacency matrix
        vector <vector<int>> adj(n);

        for(int i = 0; i < n - 1; i++) {
            adj[edges[i][0]].push_back(edges[i][1]);      //Store parent
        }

        return finishTask(n, 0, adj, baseTime);
    }
};
```


---

## 133. Cloned Graph

### DFS


```c++
class Solution {
private:
    // Maps original node pointer -> cloned node pointer
    unordered_map<Node*, Node*> cloned;

    Node* dfs(Node* original_node) {
        // If the node is already cloned, return its clone
        if (cloned.find(original_node) != cloned.end()) {
            return cloned[original_node];
        }

        // Create a clone for the current node
        Node* newNode = new Node(original_node->val);
        cloned[original_node] = newNode; // Register it immediately

        // Recursively clone all neighbors
        for (auto neighbor : original_node->neighbors) {
            newNode->neighbors.push_back(dfs(neighbor));
        }

        return newNode;
    }

public:
    Node* cloneGraph(Node* node) {
        if (node == nullptr)
            return nullptr;

        return dfs(node);
    }
};
```


---

## **329. Longest Increasing Path in a Matrix**


```c++
class Solution {
private:
    int dfs(vector<vector<int>>& matrix, int row, int col, int m, int n, vector <vector<int>> &dp)
    {
        //Let's use backward recursion (max length leading to this cell end)
        if(row < 0 || row >= m || col < 0 || col >= n)
            return 0;

        if(dp[row][col] != -1)
            return dp[row][col];

        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, -1, 1};

        int max_len = 1;

        for(int i  = 0; i < 4; i++)
        {
            int r = row + drow[i];
            int c = col + dcol[i];
            
            if(r >= 0 && r < m && c >= 0 && c < n)
            {
                int len = 0;
                if(matrix[row][col] > matrix[r][c])
                    len =  1 + dfs(matrix, r, c, m, n, dp);

                max_len = max(max_len, len);
            }
        }

        return dp[row][col] = max_len;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {

    //Let's use a DFS + Memoization Approach
    int m = matrix.size();
    int n = matrix[0].size();
    vector <vector <int>> dp(m, vector <int> (n, -1));

    int maxi = INT_MIN;
    for(int i = 0; i < m; i++)
    {
        for(int j = 0; j < n; j++)
        {
            maxi = max(maxi, dfs(matrix , i, j, m, n, dp));
        }
    }
    return maxi;
    }
};
```


---

## **797. All Paths From Source to Target**

### DFS + Backtracking


```c++
class Solution {
private:
    void dfs(int node, vector<vector<int>> &graph, vector<int> &curr_path, vector<vector<int>> &paths, int n)
    {   
        curr_path.push_back(node);

        if(node == n - 1)
        {
            paths.push_back(curr_path);
            curr_path.pop_back();       //Backtrack before returning
            return;
        }

        for(auto neigh : graph[node])
        {
            dfs(neigh, graph, curr_path, paths, n);
        }     

        curr_path.pop_back(); //Backtrack
    }
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {

    //The constraints and the problem suggests a dfs + backtracking approach to build paths from o to n - 1
    //graph is the adjacency list

        vector<vector<int>> paths;
        vector<int> curr_path; 
        
        dfs(0, graph, curr_path, paths, graph.size());
        return paths;
    }
};
```


---

## **802. Find Eventual Safe States**

The most optimal way to solve is **Topological Sort (BFS-based)**.

By definition, a node is **safe** if all paths starting from that node lead to a terminal node (a node with no outgoing edges). If we **reverse the directions of all edges**, terminal nodes effectively become "source" nodes (indegree = 0). We can then perform a standard topological sort starting from these nodes. Any node we can reach and process this way is guaranteed to be safe.


```c++
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> reversedGraph(n);
        vector<int> indegree(n, 0);

        // Step 1: Reverse the graph edges and calculate new indegrees
        for (int i = 0; i < n; i++) {
            for (auto neighbor : graph[i]) {
                // Original: i -> neighbor | Reversed: neighbor -> i
                reversedGraph[neighbor].push_back(i);
                indegree[i]++;
            }
        }

        // Step 2: Push all terminal nodes (indegree == 0 in reversed graph) into the queue
        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        // Step 3: BFS processing
        vector<bool> isSafe(n, false);
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            isSafe[node] = true; // This node can safely reach a terminal state

            for (auto neighbor : reversedGraph[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        // Step 4: Collect all safe nodes in ascending order
        vector<int> safeNodes;
        for (int i = 0; i < n; i++) {
            if (isSafe[i]) {
                safeNodes.push_back(i);
            }
        }

        return safeNodes;
    }
};
```


---

## **841. Keys and Rooms**


```c++
class Solution {
private:
    void dfs(int node, vector<vector<int>> &rooms, vector <int> &vis)
    {
        vis[node] = 1;

        for(auto neigh : rooms[node])
        {
            if(!vis[neigh])
                dfs(neigh, rooms, vis);
        }
    }
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
    //Simply do a dfs and use a visited array to mark all visited nodes strating, a last we check if all are visited, else we return false

    int n = rooms.size();
    vector <int> vis(n, 0);
    dfs(0, rooms, vis);

    for(int isVis : vis)
        if(!isVis)
            return false;

    return true;
    }
};
```


---

## **765. Couples Holding Hands**

### Important Points (Disjoint Set Implementation)

- Say there are N two-seat couches. For each couple, draw an edge from the couch of one partner to the couch of the other partner.
- If you have a person with an **even** ID `x`, their partner is always `x + 1`. If you have a person with an **odd** ID `x`, their partner is always `x - 1`.
- **Formula Trick:** You can find anyone's partner instantly using the bitwise XOR operator: `partner = x ^ 1`.
- Instead of looking at the whole array at once, just look at the **first couch** (seats 0 and 1). Look at the person sitting in seat 0. Who is their absolute partner? (Using `person ^ 1`). If their partner is *already* sitting right next to them in seat 1, great! Do nothing and move to the next couch. If someone else is sitting in seat 1, find where the actual partner is hiding in the rest of the row, and **swap** them into seat 1. By fixing this couch immediately, you never have to look at it again. Repeat this couch-by-couch until the end. *(Bonus: Proving this greedy strategy works requires realizing that forcing a couple together right now never hurts your ability to fix other couples later).*

---

## **834. Sum of Distances in Tree**

- **First Pass (Bottom-Up DFS):** You pick an arbitrary node (like node `0`) to act as the temporary root. You do a DFS to find two things for every subtree:
• The number of nodes inside that subtree.
• The sum of distances from the subtree root to all nodes inside it.
- **Second Pass (Top-Down DFS - The Rerooting Trick):** Once you know the total sum of distances for node `0`, you can mathematically derive the answer for its neighbor node `1` in `O(1)` constant time. When you shift the root from `0` to `1`:
• You move 1 step *closer* to all nodes in node 1's subtree (so their distances decrease).
• You move 1 step *further* away from all nodes outside node 1's subtree (so their distances increase).

---

## 417. Pacific Atlantic Water Flow

Instead of tracking water flowing *down* from every single cell (which is highly inefficient), the optimal approach is to **reverse the flow**. We track water flowing *up* from the oceans into the continent.

### ## The Optimal BFS Strategy

1. **Two Independent BFS Queues:** * Initialize a `pacific_queue` with all cells adjacent to the Pacific Ocean (top row and left column).
- Initialize an `atlantic_queue` with all cells adjacent to the Atlantic Ocean (bottom row and right column).
1. **Two Reachability Matrices:** * Maintain two 2D boolean arrays (or grids), `pacific_reachable` and `atlantic_reachable`, to keep track of which cells water can reach from each ocean.
1. **BFS Traversal (Moving Uphill):**
- For each queue, perform a standard BFS.
- When moving to a neighboring cell, only step onto it if its height is **greater than or equal to** the current cell's height (since we are climbing up) and it hasn't been visited yet.
1. **Find the Intersection:**
- Iterate through every cell in the grid. If a cell is marked `true` in both `pacific_reachable` and `atlantic_reachable`, add it to the final result.

```c++
class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        vector<vector<int>> result;
        if (heights.empty() || heights[0].empty()) return result;

        int rows = heights.size();
        int cols = heights[0].size();

        // Reachability matrices
        vector<vector<bool>> pacific(rows, vector<bool>(cols, false));
        vector<vector<bool>> atlantic(rows, vector<bool>(cols, false));

        // Queues for BFS
        queue<pair<int, int>> pacificQueue;
        queue<pair<int, int>> atlanticQueue;

        // 1. Initialize queues with ocean borders
        for (int r = 0; r < rows; ++r) {
            // Left border (Pacific)
            pacificQueue.push({r, 0});
            pacific[r][0] = true;
            
            // Right border (Atlantic)
            atlanticQueue.push({r, cols - 1});
            atlantic[r][cols - 1] = true;
        }

        for (int c = 0; c < cols; ++c) {
            // Top border (Pacific)
            pacificQueue.push({0, c});
            pacific[0][c] = true;
            
            // Bottom border (Atlantic)
            atlanticQueue.push({rows - 1, c});
            atlantic[rows - 1][c] = true;
        }

        // 2. Run BFS for both oceans
        bfs(heights, pacificQueue, pacific);
        bfs(heights, atlanticQueue, atlantic);

        // 3. Find cells reachable by both oceans
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.push_back({r, c});
                }
            }
        }

        return result;
    }

private:
    // Helper function to perform BFS
    void bfs(const vector<vector<int>>& heights, 
             queue<pair<int, int>>& q, 
             vector<vector<bool>>& reachable) {
        
        int rows = heights.size();
        int cols = heights[0].size();
        
        // Direction vectors for moving up, down, left, right
        int dRow[] = {-1, 1, 0, 0};
        int dCol[] = {0, 0, -1, 1};

        while (!q.empty()) {
            auto [currRow, currCol] = q.front();
            q.pop();

            for (int i = 0; i < 4; ++i) {
                int nextRow = currRow + dRow[i];
                int nextCol = currCol + dCol[i];

                // Check grid boundaries
                if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
                    // Check if already visited OR if the next cell is shorter 
                    // (we are climbing up from the ocean, so next cell must be >= current cell)
                    if (!reachable[nextRow][nextCol] && heights[nextRow][nextCol] >= heights[currRow][currCol]) {
                        reachable[nextRow][nextCol] = true;
                        q.push({nextRow, nextCol});
                    }
                }
            }
        }
    }
};
```


---

## 2812. Find the safest path in  a grid

First, compute the **safeness factor** of every cell using **Multi-Source BFS**. Start BFS simultaneously from all thief cells (`grid[i][j] == 1`), so each cell stores its minimum distance from the nearest thief. This preprocessing takes **O(n²)**.

Now, instead of directly finding the maximum safeness path, convert it into a **decision problem**: "Can we reach the destination if every cell on the path has safeness at least `x`?" For a given `x`, simply ignore all cells with safeness less than `x` and run a BFS from `(0,0)` to `(n-1,n-1)`.

The feasibility check is **monotonic**: if a path exists where every cell has safeness at least `x`, then a path will also exist for every value smaller than `x`, since more cells become available. Conversely, if no path exists for `x`, no path can exist for any larger value because the constraints only get stricter. This creates a **YES → YES → ... → NO → NO** pattern, making **Binary Search** applicable. The largest value of `x` for which the BFS succeeds is the maximum safeness factor of the path. The overall time complexity is **O(n² log n)**.


```c++
class Solution {
public:
    vector<vector<int>> dirs = {{1,0},{-1,0},{0,1},{0,-1}};

    bool canReach(vector<vector<int>>& dist, int limit) {
        int n = dist.size();

        if (dist[0][0] < limit || dist[n-1][n-1] < limit)
            return false;

        queue<pair<int,int>> q;
        vector<vector<bool>> vis(n, vector<bool>(n, false));

        q.push({0,0});
        vis[0][0] = true;

        while (!q.empty()) {
            auto [r,c] = q.front();
            q.pop();

            if (r == n-1 && c == n-1)
                return true;

            for (auto &d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr>=0 && nr<n && nc>=0 && nc<n &&
                    !vis[nr][nc] &&
                    dist[nr][nc] >= limit) {

                    vis[nr][nc] = true;
                    q.push({nr,nc});
                }
            }
        }

        return false;
    }

    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int n = grid.size();

        vector<vector<int>> dist(n, vector<int>(n, INT_MAX));
        queue<pair<int,int>> q;

        // Multi-source BFS
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dist[i][j] = 0;
                    q.push({i,j});
                }
            }
        }

        while (!q.empty()) {
            auto [r,c] = q.front();
            q.pop();

            for (auto &d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];

                if (nr>=0 && nr<n && nc>=0 && nc<n &&
                    dist[nr][nc] == INT_MAX) {

                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr,nc});
                }
            }
        }

        int low = 0;
        int high = 2 * n;
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canReach(dist, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
};
```


---

## **3286. Find a Safe Walk Through a Grid**

### DEQUE / 0-1 BFS


```c++
class Solution {
public:
    bool findSafeWalk(vector<vector<int>>& grid, int health) {
        int m = grid.size();
        int n = grid[0].size();
        
        // max_health[i][j] stores the maximum remaining health when reaching cell (i, j)
        vector<vector<int>> max_health(m, vector<int>(n, -1));        
        // Using a deque for 0-1 BFS
        // Each element: {row, col}
        deque<pair<int, int>> dq;
        
        // Deduct health for the starting cell
        int start_health = health - grid[0][0];
        if (start_health <= 0) return false;
        
        dq.push_front({0, 0});
        max_health[0][0] = start_health;
        
        int drow[] = {0, 0, -1, 1};
        int dcol[] = {1, -1, 0, 0};
        
        while (!dq.empty()) {
            auto [row, col] = dq.front();
            dq.pop_front();
            
            // If we reached the bottom-right corner with at least 1 health
            if (row == m - 1 && col == n - 1 && max_health[row][col] >= 1) {
                return true;
            }
            
            int curr_health = max_health[row][col];
            
            for (int i = 0; i < 4; i++) {
                int r = row + drow[i];
                int c = col + dcol[i];
                
                if (r >= 0 && r < m && c >= 0 && c < n) {
                    int next_health = curr_health - grid[r][c];
                    
                    // We only move to the neighbor if we can reach it with MORE health 
                    // than any previous path found so far.
                    if (next_health >= 1 && next_health > max_health[r][c]) {
                        max_health[r][c] = next_health;
                        
                        // 0-1 BFS Optimization:
                        // If grid[r][c] == 0, it costs nothing, process it immediately (push_front)
                        // If grid[r][c] == 1, it costs 1 health, process it later (push_back)
                        if (grid[r][c] == 0) {
                            dq.push_front({r, c});
                        } else {
                            dq.push_back({r, c});
                        }
                    }
                }
            }
        }
        
        return max_health[m - 1][n - 1] >= 1;
    }
};
```


---

## **419. Battleships in a Board**

### Intuition

Instead of finding every ship completely, count **only the starting cell** of each ship.

A cell `'X'` is the start of a battleship **iff**:

- It is `'X'`
- There is **no **`'X'`** above it**
- There is **no **`'X'`** to its left**
Every battleship has exactly one such cell.


```c++
class Solution {
public:
    int countBattleships(vector<vector<char>>& board) {
        int m = board.size();
        int n = board[0].size();

        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {

                if (board[i][j] == '.')
                    continue;

                if (i > 0 && board[i - 1][j] == 'X')
                    continue;

                if (j > 0 && board[i][j - 1] == 'X')
                    continue;

                count++;
            }
        }

        return count;
    }
};
```


---

## **3620. Network Recovery Pathways**

### Why can’t we use standard BFS here ??

**BFS only works when every state can be represented by just the current node. Here, it can't.**

Suppose you reach the same node in two different ways:

- Path A: total cost = 5, minimum edge = 8
- Path B: total cost = 9, minimum edge = 15
Both arrive at the **same node**, but neither dominates the other:

- Path A has a lower cost.
- Path B has a better minimum edge.
From this node onward, either path could lead to the optimal answer depending on the remaining edges.

So a simple BFS that marks a node as "visited" would incorrectly discard one of these states.

In short:

- **BFS explores by number of edges**, but the problem depends on **two path-dependent quantities**:
1. total cost (must be ≤ K)
1. minimum edge on the path (to maximize)
Since the state is **(node, total cost, minimum edge)** rather than just **(node)**, a standard BFS is not sufficient. You would have to keep many states per node, which becomes inefficient.

That's why the solution looks for a smarter way to reduce the state space (hint: by fixing one of these quantities first).

In many **grid BFS** problems, when you first reach a cell, you have already reached it with the **minimum number of steps**. Any later arrival cannot be better because BFS guarantees shortest distance in an unweighted graph.

Or in problems like Dijkstra, if you find a **lower distance**, you update it because there is only **one quantity to optimize**: distance.

Here, however, there are **two independent quantities**:

- Total cost (smaller is better because of the budget `K`)
- Minimum edge on the path (larger is better because that's the objective)
These two objectives conflict.

For example, suppose you reach node `u`:

- Path A: `(cost = 5, minEdge = 8)`
- Path B: `(cost = 9, minEdge = 15)`
Which one is better?

You **cannot say**.

- If the remaining path costs 3, then Path A succeeds (`5+3=8 ≤ K`) while Path B may fail.
- If the remaining edges are all ≥ 15, then Path B gives a much better final answer.
So unlike grid BFS, there is **no single "better" state** to keep at a node. Neither state dominates the other.

That's why you can't simply store one value per node and update it. Multiple states may all be necessary. The trick in the optimal solution is to **eliminate one of these dimensions**, so you no longer have to carry both pieces of information simultaneously.

### Algorithm

1. **Binary Search on the answer**
- Let the answer be the minimum edge value along the chosen path.
- Binary search over all possible edge values.
1. **Feasibility Check for a candidate **`X`
- Keep **only those edges whose value ≥ **`X`.
- Ignore offline nodes (except if source/destination handling is specified differently in the problem).
- The remaining graph is still a **DAG**.
1. **Topological Sort**
- Compute a topological ordering of the filtered graph.
1. **DAG Shortest Path DP**
- Initialize:

```plain text
dist[source] = 0
dist[others] = INF
```

- Traverse nodes in topological order.
- For every valid edge:

```plain text
dist[v] = min(dist[v], dist[u] + edgeCost)
```

- This gives the **minimum total cost** to every node using only edges satisfying the threshold.
1. **Check Budget**
- If `dist[target] ≤ K`, then the threshold `X` is feasible.
- Otherwise, it is not.
1. **Binary Search Update**
- Feasible → try a **larger** threshold.
- Not feasible → try a **smaller** threshold.

---

## Time Complexity

Let:

- `N` = number of nodes
- `M` = number of edges
- `W` = range of edge values (or number of distinct values)
Each feasibility check:

- Topological Sort: **O(N + M)**
- DAG DP: **O(N + M)**
Binary Search performs **O(log W)** checks.

**Overall Complexity:**


---

### Why this works

The key observation is that the objective ("maximize the minimum edge value") is **monotonic**. If a path exists with minimum edge value at least `X`, then a path also exists for every smaller threshold. That monotonicity enables binary search, and once `X` is fixed, the problem reduces to a standard **shortest path on a DAG**, which can be solved optimally using **Topological Sort + DP** in linear time.

### The important point

Removing offline nodes **can disconnect the graph**, and the algorithm does **not** try to reconnect it. That's exactly what the feasibility check is meant to detect.

Think of the check as asking:

If yes → binary search moves right.

If no → binary search moves left.

So the possibility of disconnecting the graph is **not a bug**—it's part of what the feasibility check is testing.


```c++
class Solution {
public:
    int findMaxPathScore(vector<vector<int>>& edges, vector<bool>& online, long long k) {
        int n = online.size();

        // Build the graph by removing all offline intermediate nodes.
        // Also find the range of edge weights for binary search.
        vector<vector<pair<int, int>>> graph(n);
        vector<int> indegree(n, 0);

        int low = INT_MAX, high = INT_MIN;

        for (auto &e : edges) {
            int u = e[0], v = e[1], w = e[2];

            if ((u != 0 && u != n - 1 && !online[u]) ||
                (v != 0 && v != n - 1 && !online[v]))
                continue;

            graph[u].push_back({v, w});
            indegree[v]++;

            low = min(low, w);
            high = max(high, w);
        }

        if (low == INT_MAX)
            return -1;

        // Since the graph is a DAG, compute the topological order once.
        // We'll reuse it for every binary search check.
        vector<int> topo;
        queue<int> q;
        vector<int> deg = indegree;

        for (int i = 0; i < n; i++)
            if (deg[i] == 0)
                q.push(i);

        while (!q.empty()) {
            int u = q.front();
            q.pop();

            topo.push_back(u);

            for (auto &[v, w] : graph[u]) {
                if (--deg[v] == 0)
                    q.push(v);
            }
        }

        // For a fixed minimum edge weight (mid), check whether
        // we can still reach the destination within budget k.
        auto check = [&](int mid) {

            // Standard shortest path DP on a DAG.
            // Initially only the source is reachable.
            const long long INF = 4e18;
            vector<long long> dist(n, INF);
            dist[0] = 0;

            // Process nodes in topological order.
            // Ignore every edge whose weight is smaller than mid.
            for (int u : topo) {

                if (dist[u] == INF)
                    continue;

                for (auto &[v, w] : graph[u]) {

                    if (w < mid)
                        continue;

                    dist[v] = min(dist[v], dist[u] + (long long)w);
                }
            }

            // If destination is reachable within budget,
            // then this mid value is feasible.
            return dist[n - 1] <= k;
        };

        // Binary search on the answer.
        // Try to maximize the minimum edge weight on the path.
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (check(mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // Return the best feasible answer.
        return ans;
    }
};
```


---

## **310. Minimum Height Trees**

### Hints to Optimize Your Approach

Instead of starting at a random node and looking outward, look at the structure of a tree. The nodes that form the "Minimum Height Tree" roots are always going to be the most **centrally located** nodes. The nodes at the very edge of the tree (leaves) are the furthest away from being a valid MHT root.

What happens if you find all the leaf nodes and eliminate them simultaneously?

A leaf node in an undirected tree always has exactly **one** connection (a degree of 1).

- Can you think of a way to collect all nodes with a degree of 1 into a queue?
- If you remove those leaves, their neighboring nodes will see their degrees decrease. Some of those neighbors will now become the "new" leaves.
A tree can have at most **1 or 2** central core nodes that minimize the height. If you keep stripping away layers of leaves level by level (similar to a Breadth-First Search mechanism), how many nodes should be left in your graph when you know you've found the center(s)?


Because a tree is acyclic and connected, if you keep trimming the outer leaves level-by-level simultaneously, you will eventually be squeezed down to the absolute center. A tree can only ever have **either 1 or 2 central nodes**.




```c++
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        
        if (n == 1) return {0};
        
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);
        
        // Build the adjacency list
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
            indegree[u]++;
            indegree[v]++;
        }
        
        queue<int> q;
        // Push all initial leaf nodes into the queue
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 1) {
                q.push(i);
            }
        }
        
        // Peel layers until 1 or 2 nodes are left
        while (n > 2) {
            int size = q.size();
            n -= size; // Reduce the total active node count by the current layer size
            
            for (int i = 0; i < size; i++) {
                int curr = q.front();
                q.pop();
                
                // Disconnect the leaf from its neighbors
                for (int neighbor : adj[curr]) {
                    indegree[neighbor]--;
                    // If neighbor becomes a new leaf, add it to the queue
                    if (indegree[neighbor] == 1) {
                        q.push(neighbor);
                    }
                }
            }
        }
        
        // The remaining elements in the queue are the MHT roots
        vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front());
            q.pop();
        }
        
        return result;
    }
};
```


---

## **695. Max Area of Island**

### Wrong APPROACH


```c++
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {

    //Approach:
    //Let's do a dfs + visited array technique to find the max area of island
    //Instead of a visited array we can also modify the grid to keep track of visited elements    

    //Let's do a traversal through the grid and push all cells with 1 in the queue
    //Multi Source BFS
    
    int m = grid.size();
    int n = grid[0].size();

    queue <tuple<int, int, int>> bfs;

    for(int i = 0; i < m; i++)
    {
        for(int j = 0; j < n; j++)
        {
            if(grid[i][j] == 1)
                bfs.push({i, j, 1});
        }
    }

    if(bfs.empty())
        return 0;

    int drow[] = {0, 0, -1, 1};
    int dcol[] = {-1, 1, 0, 0};

    int max_area = INT_MIN;

    while(!bfs.empty())
    {
        auto [row, col, area] = bfs.front();
        bfs.pop();

        if(grid[row][col] == -1)
            continue;

        for(int i = 0; i < 4; i++)
        {
            int r = row + drow[i];
            int c = col + dcol[i];

            if(r >= 0 && r < m && c >= 0 && c < n && grid[row][col] == 1)
            {
                //Mark as visited so that we don't cycle back
                grid[r][c] = -1;
                bfs.push({r, c, area + 1});
                max_area = max(max_area, area + 1);
            }
        }
    } 

    return max_area;
    }
};
```

### Correct Approach


```c++
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
    
    int m = grid.size();
    int n = grid[0].size();
    int max_area = 0; 

    int drow[] = {0, 0, -1, 1};
    int dcol[] = {-1, 1, 0, 0};

    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {            
            
            //Start a local BFS to find its total area
            if (grid[i][j] == 1) 
            {
                int current_island_area = 0;
                queue<pair<int, int>> bfs; 
                
                bfs.push({i, j});
                grid[i][j] = 0; // Mark as visited immediately

                while (!bfs.empty()) {
                    auto [row, col] = bfs.front();
                    bfs.pop();
                    current_island_area++; 

                    for (int k = 0; k < 4; k++) {
                        int r = row + drow[k];
                        int c = col + dcol[k];

                        if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] == 1) {
                            grid[r][c] = 0; 
                            bfs.push({r, c});
                        }
                    }
                }
                // Keep track of the largest island found so far
                max_area = max(max_area, current_island_area);
            }
            
        }
    }
    return max_area;
    }
};
```

**NOTE : To improve the efficiency of this code, make a separate function for the bfs and pass the same queue by reference everytime, as the queue becomes empty after each local traversal.**


---

## **2492. Minimum Score of a Path Between Two Cities**

The problem description guarantees that there is at least one valid path between city `1` and city `n`. Because the problem guarantees a path exists, city `1` and city `n` will *always* belong to the same connected component .

Because you can revisit any road as much as you want, **the actual path between city **`1`** and city **`n`** doesn't matter.** As long as city `1` and city `n` are in the same connected network of cities, you can reach *any* road within that entire network, traverse it to register its small score, and then track back toward your destination.

Therefore, the problem reduces to:

### BFS + Visited Array


```c++
class Solution {
public:
    int minScore(int n, vector<vector<int>>& roads) {

    //BFS Solution

    //Adjacency Matrix
    vector <vector<pair<int, int>>> adj(n + 1);

    for(auto road : roads)
    {
        adj[road[0]].push_back({road[1], road[2]});
        adj[road[1]].push_back({road[0], road[2]});
    }     

    queue <int> bfs;
    bfs.push(1);
    int res = INT_MAX;

    //Since it is gauranteed one path is there hence n will be in the same component as 1
    //We also have to take a visited array otherwise it will keep on adding edges infinitely, but we need to only visit atleast once each node
    vector <bool> visited(n + 1);

    while(!bfs.empty())
    {
        int node = bfs.front();
        bfs.pop();

        visited[node] = true;

        for(auto neigh : adj[node])
        {
            auto [edge, weight] = neigh;

            res = min(res, weight);

            if(!visited[edge])
            {
                bfs.push(edge);
                visited[edge] = true;
            }
            
        }
    }

    return res;
    }
};
```


---

## **1971. Find if Path Exists in Graph**

### DFS


```c++
class Solution {
private:
    bool isValid(vector <vector<int>> &adj, int node, int destination, vector <int> &vis)
    {
        vis[node] = 1;
        
        if(node == destination)
            return true;

        for(auto edge : adj[node])
        {
            if(!vis[edge])
            {
                // Only return if a path is actually found
                if(isValid(adj, edge, destination, vis))
                    return true;
            }
        }

        return false;
    }
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {

    //Make adjacency matrix
    vector <vector<int>> adj(n);

    for(auto edge : edges)
    {
        adj[edge[0]].push_back(edge[1]);
        adj[edge[1]].push_back(edge[0]);
    }

    vector <int> vis(n, 0);

    return isValid(adj, source, destination, vis);
    }
};
```

### BFS


```c++
class Solution {
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {

    //Make adjacency matrix
    vector <vector<int>> adj(n);

    for(auto edge : edges)
    {
        adj[edge[0]].push_back(edge[1]);
        adj[edge[1]].push_back(edge[0]);
    }

    queue <int> bfs;
    bfs.push(source);
    vector <int> vis(n, 0);

    while(!bfs.empty())
    {
        int node = bfs.front();
        bfs.pop();

        vis[node] = 1;
        
        if(node == destination)
            return true;

        for(auto edge : adj[node])
        {
            if(!vis[edge])
                bfs.push(edge);
        }
    }

    return false;
    }
};
```


---

## **2642. Design Graph With Shortest Path Calculator**

### Dijkstra


```c++
class Graph {
private:
    vector<vector<pair<int, int>>> adj;
    int numNodes;

public:
    Graph(int n, vector<vector<int>>& edges) {
        numNodes = n;
        adj.resize(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back({edge[1], edge[2]});
        }
    }
    
    void addEdge(vector<int> edge) {
        adj[edge[0]].push_back({edge[1], edge[2]});
    }
    
    int shortestPath(int node1, int node2) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> minCost(numNodes, INT_MAX);
        
        minCost[node1] = 0;
        pq.push({0, node1});
        
        while (!pq.empty()) {
            auto [currCost, u] = pq.top();
            pq.pop();
            
            if (u == node2) return currCost;
            if (currCost > minCost[u]) continue;
            
            for (const auto& [v, weight] : adj[u]) {
                if (currCost + weight < minCost[v]) {
                    minCost[v] = currCost + weight;
                    pq.push({minCost[v], v});
                }
            }
        }
        
        return -1;
    }
};
```


---

## **778. Swim in Rising Water**

### Dijkstra


```c++
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        vector<vector<int>> minTime(n, vector<int>(n, INT_MAX));
        
        minTime[0][0] = grid[0][0];
        pq.push({grid[0][0], 0, 0});
        
        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, -1, 1};
        
        while (!pq.empty()) {
            auto curr = pq.top();
            pq.pop();
            
            int t = curr[0], r = curr[1], c = curr[2];
            
            if (r == n - 1 && c == n - 1) return t;
            if (t > minTime[r][c]) continue;
            
            for (int i = 0; i < 4; ++i) {
                int nr = r + drow[i];
                int nc = c + dcol[i];
                
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) 
                {
                    int nextTime = max(t, grid[nr][nc]);
                    if (nextTime < minTime[nr][nc]) {
                        minTime[nr][nc] = nextTime;
                        pq.push({nextTime, nr, nc});
                    }
                }
            }
        }
        
        return -1;
    }
};
```


---

Think of the grid like a **chessboard** where cells alternate colors.

Every move you make takes exactly 1 second. This means:

- At $t = 0$, you are on an **Even** cell (let's say White).
- At $t = 1$, you *must* be on an **Odd** cell (Black).
- At $t = 2$, you *must* be on an **Even** cell (White).
Because of this constant walking rhythm, **the time ($t$) when you step onto any cell must always match that cell's distance/parity from the start.** You can never land on an "Odd" cell at an "Even" time, or vice versa.


---

### The Problem: Waiting Around

In this problem, if a neighbor has a high minimum time requirement (e.g., `grid[row][col] = 8`) and your current time is small (e.g., $t = 2$), you can't just stand still and wait for the time to reach 8. You are forced to move.

To pass the time, you have to **ping-pong** back and forth between your current cell and a previously visited cell. Each round-trip back and forth takes exactly **2 seconds**.

Because a round-trip takes 2 seconds, **oscillating preserves your time's parity.** It just pumps the clock up by +2, +4, +6, etc.


---

### The Two Parity Cases

When you finally burn enough time to match or exceed the neighbor's requirement, you try to step into it. This is where the difference between the cell's requirement and your current time (`diff = grid[row][col] - t`) matters:

Suppose you are at $t = 2$, and the neighbor requires **5**.

- `diff = 5 - 2 = 3` (Odd)
- Since the required time has a different parity than your current time, the natural rhythm of walking works in your favor. You can oscillate perfectly and step onto that cell exactly at its opening time.
- **Result:** `nextTime = grid[row][col]` (5)
Suppose you are at $t = 2$, and the neighbor requires **6**.

- `diff = 6 - 2 = 4` (Even)
- Your current time and the requirement have the *same* parity. But remember, moving to a neighboring cell *must* flip your parity. If you try to land there at $t = 6$, you break the chessboard rule.
- You will end up hitting $t = 5$ on your side, and since you still can't enter at 5, you have to make one final 2-second round trip. By the time you come back, the clock hits 7.
- **Result:** `nextTime = grid[row][col] + 1` (7)

---

### Summary formula in code:

C++


```plain text
int diff = grid[row][col] - t;
if (diff % 2 == 0) {
    nextTime = grid[row][col] + 1; // Forced to waste 1 extra second due to parity mismatch
} else {
    nextTime = grid[row][col];     // Perfect match
}
```


this problem introduces a restriction that wasn't present in *Swim in Rising Water*: **you cannot stay static, and time increments by exactly 1 second with every single move.** If a neighboring cell requires a time greater than $t + 1$, you cannot just magically wait at your current cell. You have to **ping-pong (oscillate) back and forth** between your current cell and an adjacent visited cell to burn time.




```c++
class Solution {
public:
    int minimumTime(vector<vector<int>>& grid) {
        if (grid[0][1] > 1 && grid[1][0] > 1) return -1;
        
        int m = grid.size();
        int n = grid[0].size();
        
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        vector<vector<int>> minTime(m, vector<int>(n, INT_MAX));
        
        minTime[0][0] = 0;
        pq.push({0, 0, 0});
        
        int drow[] = {-1, 1, 0, 0};
        int dcol[] = {0, 0, -1, 1};
        
        while (!pq.empty()) {
            auto curr = pq.top();
            pq.pop();
            
            int t = curr[0], r = curr[1], c = curr[2];
            
            if (r == m - 1 && c == n - 1) return t;
            if (t > minTime[r][c]) continue;
            
            for (int i = 0; i < 4; ++i) {
                int row = r + drow[i];
                int col = c + dcol[i];
                
                if (row >= 0 && row < m && col >= 0 && col < n) {
                    int nextTime = t + 1;
                    
                    if (grid[row][col] > nextTime) {
                        int diff = grid[row][col] - t;
                        if (diff % 2 == 0) {
                            nextTime = grid[row][col] + 1;
                        } else {
                            nextTime = grid[row][col];
                        }
                    }
                    
                    if (nextTime < minTime[row][col]) {
                        minTime[row][col] = nextTime;
                        pq.push({nextTime, row, col});
                    }
                }
            }
        }
        
        return -1;
    }
};
```


---

## **1514. Path with Maximum Probability**

To correctly adapt Dijkstra's algorithm for path probabilities, you must shift your mindset from finding the *minimum sum* of paths to finding the *maximum product* of fractional values. First, ensure all variables tracking probabilities—including the adjacency list weights, the `maxProb` distance-tracking array, and the values stored in your priority queue—use floating-point data types (`double` or `float`) instead of integers to prevent fractional truncation. Second, because independent probabilities compound through multiplication rather than addition, initialize the starting node's probability to `1.0` (since multiplying by `0` will collapse all downstream paths to zero) and update adjacent nodes using `newProb = wt * currProb`. Finally, utilize a standard max-heap (`priority_queue` in C++) to greedily process the paths with the highest current probabilities first, and initialize the rest of the tracking array to `0.0` to correctly handle unreachable nodes.


```c++
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {

    //Clearly this can be solved using Djikstra Algorithm
    vector <vector<pair<int, double>>> adj(n);

    for(int i = 0; i < edges.size(); i++)
    {
        adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
        adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
    }    

    vector <double> maxProb(n, 0.0);

    //Max Heap
    priority_queue <pair<double, int>> q;
    maxProb[start_node] = 1.0;
    q.push({1.0, start_node});

    while(!q.empty())
    {
        auto [wt, node] = q.top();
        q.pop();

        if(node == end_node)
            return wt;

        if(wt < maxProb[node])
            continue;

        for(auto neigh : adj[node])
        {
            int newNode = neigh.first;
            double currProb = neigh.second;

            double newProb = wt * currProb;

            if(newProb > maxProb[newNode])
            {
                q.push({newProb, newNode});
                maxProb[newNode] = newProb;
            } 
        }
    }

    return 0;
    }
};
```


---

## **2290. Minimum Obstacle Removal to Reach Corner**

### 0-1 BFS


```c++
class Solution {
public:
    int minimumObstacles(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        deque<pair<int, int>> q;
        
        q.push_front({0, 0});
        dist[0][0] = 0;
        
        int drow[] = {0, 0, -1, 1};
        int dcol[] = {-1, 1, 0, 0};
        
        while (!q.empty()) {
            auto [row, col] = q.front();
            q.pop_front();
            
            if (row == m - 1 && col == n - 1) {
                return dist[row][col];
            }
            
            for (int i = 0; i < 4; i++) {
                int r = row + drow[i];
                int c = col + dcol[i];
                
                if (r >= 0 && c >= 0 && r < m && c < n) {
                    int weight = grid[r][c];
                    
                    if (dist[row][col] + weight < dist[r][c]) {
                        dist[r][c] = dist[row][col] + weight;
                        
                        if (weight == 0) {
                            q.push_front({r, c});
                        } else {
                            q.push_back({r, c});
                        }
                    }
                }
            }
        }
        
        return dist[m - 1][n - 1];
    }
};
```


---

## **2685. Count the Number of Complete Components**


```c++
class Solution {
private:
    void dfs(int node, vector <vector<int>> &adj, vector <int> &vis, 
             int &nodes, int &edges)
    {
        vis[node] = 1;
        nodes++;

        for(auto neigh : adj[node])
        {
            if(!vis[neigh])
            {
                dfs(neigh, adj, vis, nodes, edges);
            }
            edges++;
        }
    }
public:
    int countCompleteComponents(int n, vector<vector<int>>& edges) {

    vector <vector<int>> adj(n);

    for(auto p : edges)
    {
        adj[p[0]].push_back(p[1]);
        adj[p[1]].push_back(p[0]);
    }    

    //Return number of connected components
    //Then check whether complete or not by checking if number of edges = n * (n - 1) / 2;
    //Let's use DFS

    vector <int> vis(n, 0);
    int len = 0;
    for(int i = 0; i < n; i++)
    {
        if(!vis[i])
        {
            int n = 0, edges = 0;

            dfs(i, adj, vis, n, edges);

            if(edges == ((n) * (n - 1)))
                len++;
        }        
    }

    return len;
    }
};
```


---

## **1466. Reorder Routes to Make All Paths Lead to the City Zero**

### Brute Force


```c++
class Solution {
    int res = 0;
private:
    void dfs(int node, vector <vector<int>> &adj, set <pair<int, int>> &dir,
             vector <int> &vis)
    {
        vis[node] = 1;

        for(auto neigh : adj[node])
        {
            if(!vis[neigh])
            {
                if(dir.find({node, neigh}) != dir.end())
                    res++;
                dfs(neigh, adj, dir, vis);
            }
        }
    }
public:
    int minReorder(int n, vector<vector<int>>& connections) {

    //Lets use a set to track forward edges
    set <pair<int, int>> dir;

    vector <vector<int>> adj(n);

    vector <int> vis(n);

    for(auto p : connections) {
        dir.insert({p[0],p[1]});
        adj[p[0]].push_back(p[1]);
        adj[p[1]].push_back(p[0]);        
    }

    dfs(0, adj, dir, vis);
    return res;

    }
};
```

### Optimal


```c++
class Solution {
public:
    int ans = 0;

    void dfs(int node,
             vector<vector<pair<int,int>>> &adj,
             vector<int> &vis)
    {
        vis[node] = 1;

        for(auto &[neigh, needsReverse] : adj[node])
        {
            if(vis[neigh]) continue;

            ans += needsReverse;

            dfs(neigh, adj, vis);
        }
    }

    int minReorder(int n, vector<vector<int>>& connections)
    {
        vector<vector<pair<int,int>>> adj(n);

        for(auto &edge : connections)
        {
            int u = edge[0];
            int v = edge[1];

            // Original direction u -> v
            adj[u].push_back({v,1}); // needs reversal if traversed
            adj[v].push_back({u,0}); // already points toward 0
        }

        vector<int> vis(n,0);

        dfs(0, adj, vis);

        return ans;
    }
};
```


---

## **1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance**

### Dijkstra


```c++
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {

    vector <vector<pair<int, int>>> adj(n);

    for(auto p : edges)
    {
        adj[p[0]].push_back({p[1], p[2]});
        adj[p[1]].push_back({p[0], p[2]});
    }

    int min_cities = INT_MAX, city = 0;
    for(int i = 0; i < n; i++)
    {
        int reachable = 0;

        priority_queue <pair<int, int>, vector<pair<int, int>>, greater <pair<int, int>>> bfs;
        vector <int> vis(n, 0);
        vector <int> minDistance(n, INT_MAX);

        bfs.push({0, i});
        minDistance[i] = 0;

        while(!bfs.empty())
        {
            auto [wt, node] = bfs.top();
            bfs.pop(); 

            if(wt > minDistance[node])
                continue;

            if(vis[node] == 0) {
                vis[node] = 1;
                if(node != i) { // Don't count the starting city itself!
                reachable++;
        }
    }
            for(auto neigh : adj[node])
            {
                auto [newNode, weight] = neigh;

                int newDistance = minDistance[node] + weight;
                if(newDistance < minDistance[newNode] && newDistance <= distanceThreshold)
                {
                    minDistance[newNode] = newDistance;
                    bfs.push({minDistance[newNode], newNode});
                }
            }
        }

        if(reachable <= min_cities)
        {
            min_cities = reachable;
            city = i;
        }
    }    

    return city;
    }
};
```


---

## **399. Evaluate Division**

Evaluate Division (BFS)

1. Build a weighted bidirectional graph.
u -> v = value
v -> u = 1/value
1. Store all variables in a set to quickly detect invalid queries.
1. For each query:
- If either variable doesn't exist, return -1.
- Run BFS from source.
- Queue stores (node, currentProduct).
- currentProduct = product of edge weights from source to current node.
- If destination is reached, currentProduct is the answer.
- If BFS ends without reaching destination, return -1.
Key Idea:
Edge weights represent division values.
Traversing a path multiplies the ratios along the path.


```c++
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        
    //Brute Force
    //Lets make a weighted graph from given equations and then run a bfs for each query

    //Build graph
    //Lets also keep a track of variables encountered so that searching becomes easier in cases of non existent queries

    unordered_set <string> chars;
    unordered_map <string, vector<pair<string, double>>> adj;

    for(int i = 0; i < equations.size(); i++)
    {
        double val = values[i];

        adj[equations[i][0]].push_back({equations[i][1], val});
        adj[equations[i][1]].push_back({equations[i][0], (1.0 / val)});

        chars.insert(equations[i][0]);
        chars.insert(equations[i][1]);
    }

    //Now we have entire graph, now for each query we can do a bfs from the start node to check if a path exists and keep multiplying the values
    
    vector <double> res;
    for(int i = 0; i < queries.size(); i++)
    {
        string start_node = queries[i][0];
        string end_node = queries[i][1];

        if(chars.find(start_node) == chars.end() || chars.find(end_node) == chars.end())
        {
            res.push_back(-1.0);
            continue;
        }

        unordered_map <string, bool> vis;

        queue <pair<string, double>> bfs;
        bfs.push({start_node, 1});
        bool found = false;
        while(!bfs.empty())
        {
            auto [node, div] = bfs.front();
            bfs.pop();

            if(node == end_node)
            {
                res.push_back(div);
                found = true;
                break;
            }

            for(auto neigh : adj[node])
            {
                string newNode = neigh.first;
                double curr_div = neigh.second;

                if(vis[newNode] == false)
                {
                    vis[newNode] = true;
                    double newDiv = div * curr_div;
                    bfs.push({newNode, newDiv});
                }
            }
        }

        if(found == false)
            res.push_back(-1.0);
    }

    return res;
    }
};
```


---

## **684. Redundant Connection**

### Brute Force


```c++
class Solution {
    set <pair<int, int>> res;
private:
    bool dfs(vector <vector<int>> &adj, vector <int> &vis, int src, int target)
    {
        vis[src] = 1;

        if(src == target)
            return true;

        for(auto neighbor : adj[src])
        {
            if(!vis[neighbor])
            {
                if(dfs(adj, vis, neighbor, target))
                    return true;
            }
        }
        return false;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {

    //A simple cycle detection won't work here as we do not know which edge of the cycle is the answer
    //Hence the optimal approach is to build the graph edge by edge, before adding an edge check if there already exists a path between the nodes, if it is so then this is the redundant edge
    //This works as before adding an edge, the graph is always a tree, so if we find a path on adding an edge, then it means this is the answer
    //This works because the problem guarantees:

    // The graph started as a tree (no cycles).
    // Exactly one extra edge was added.

    //Adjacency MAtrix
    int n = edges.size();

    vector <vector<int>> adj(n + 1);

    for(auto pairs : edges)
    {
        vector <int> vis(n + 1, 0);
        if(dfs(adj, vis, pairs[0], pairs[1]) == true)
            return pairs;
        else
        {
            adj[pairs[0]].push_back(pairs[1]);
            adj[pairs[1]].push_back(pairs[0]);
        }
    }

    return {};
    }
};
```

### Optimal - DSU


```c++

```


---

## **3310. Remove Methods From Project**

### DFS

To determine whether suspicious methods can be removed, you only need to check if **any node outside the suspicious set (**`vis1[u] == 0`**) has a direct edge/invocation to a node inside the suspicious set (**`vis1[v] == 1`**)**.

Running a full DFS (`dfsOthers`) from every unvisited node is unnecessary and introduces subtle traversal errors.


```c++
class Solution {
private:
    void dfsFromK(vector<vector<int>>& adj, vector<int>& vis1, int node) {
        vis1[node] = 1;

        for (auto neighbor : adj[node]) {
            if (!vis1[neighbor])
                dfsFromK(adj, vis1, neighbor);
        }
    }

public:
    vector<int> remainingMethods(int n, int k, vector<vector<int>>& invocations) {
        vector<vector<int>> adj(n);

        for (const auto& p : invocations) {
            adj[p[0]].push_back(p[1]);
        }

        vector<int> vis1(n, 0);
        dfsFromK(adj, vis1, k);

        bool cannotRemove = false;
        for (const auto& edge : invocations) {
            int u = edge[0];
            int v = edge[1];
            if (!vis1[u] && vis1[v]) {
                cannotRemove = true;
                break;
            }
        }
        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (cannotRemove || !vis1[i]) {
                res.push_back(i);
            }
        }

        return res;
    }
};
```


---

## **851. Loud and Rich**

### DFS Solution - Not Best


```c++
class Solution {
private:
    void dfs(vector <vector<int>> &adj, vector <int> &vis, vector <int> &quiet, int node, int &mini, int &index)
    {
        if(quiet[node] < mini)
        {
            mini = quiet[node];
            index = node;
        }
        vis[node] = 1;

        for(auto neighbor : adj[node])
        {
            if(!vis[neighbor])
                dfs(adj, vis, quiet, neighbor, mini, index);
        }
    }
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
    
    //Make a graph with edge from b -> a
    //Do dfs from each node and keep trck of minimum quietness encountered among the node and all descendants, this would be the answer for ans[x]
    //We can also try a topological sort approach later

    int n = quiet.size();
    vector <vector<int>> adj(n);

    for(const auto &p : richer)
    {
        adj[p[1]].push_back(p[0]);
    }

    vector <int> res(n);

    for(int i = 0; i < n; i++)
    {
        vector <int> vis(n, 0);
        int mini = INT_MAX;
        int index;
        dfs(adj, vis, quiet, i, mini, index);

        res[i] = index;
    }
    return res;
    }
};
```

### Topo Sort - A little difficult to implement so learn this


```c++
class Solution {
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
    
    //Make a graph with edge from a -> b
    //unlike dfs approach (flipped graph)
    //Topological Sort , since it is of the from Directed Acyclic Graph, and the format of the question also requires a precedence

    int n = quiet.size();
    vector <vector<int>> adj(n);
    vector <int> indegree(n, 0);

    for(const auto &p : richer)
    {
        adj[p[0]].push_back(p[1]);
        indegree[p[1]]++;
    }

    queue <int> q;
    vector <int> res(n);
    for(int i = 0; i < n; i++)
    {
        if(indegree[i] == 0)
            q.push(i);
        res[i] = i;
    }
    
    while(!q.empty())
    {
        int node = q.front();
        q.pop();

        for(auto neighbor : adj[node])
        {
            if(quiet[res[node]] < quiet[res[neighbor]])
                res[neighbor] = res[node];

            indegree[neighbor]--;
            if(indegree[neighbor] == 0)
                q.push(neighbor);
        }
    }

    return res;
    }
};
```


---

## **1319. Number of Operations to Make Network Connected**

Algorithm:

- Count the number of components (cnt)
- If there are n - 1 connections initially, then it is always possible to connect all computers, else return -1
- Return cnt  - 1

```c++
class Solution {
private:
    void dfs(vector <vector<int>> &adj, vector <int> &vis, int node)
    {
        vis[node] = 1;

        for(auto neighbor : adj[node])
        {
            if(!vis[neighbor])
                dfs(adj, vis, neighbor);
        }
    }
public:
    int makeConnected(int n, vector<vector<int>>& connections) {

    //    intuition :
    //As long as there are at least (n - 1) connections, there is definitely a way to connect all computers.
    //Use DFS to determine the number of isolated computer clusters.

    //We need to count the number of components, and then we just need to coneect these components with each other, which is 1 less than the number of components
    //We can use the dfs to find the number of connected components
    
    //If number of connections is less than n - 1, then it is not possible to connect all computers
    // The language of the question is ambigous, we have to consider this as an undirected graph, not directed
    if(connections.size() < n - 1)
        return -1;

    int cnt = 0;
    vector <vector<int>> adj(n);
    vector <int> vis(n, 0);

    for(const auto &p : connections)
    {
        adj[p[0]].push_back(p[1]);
        adj[p[1]].push_back(p[0]);
    }

    for(int i = 0; i < n; i++)
    {
        if(!vis[i])
        {
            cnt++;
            dfs(adj, vis, i);
        }
    }

    return cnt - 1;
    }
};
```


---

## **1557. Minimum Number of Vertices to Reach All Nodes**

And once you choose all zero-indegree nodes, every other node has indegree ≥ 1, meaning there is some path of predecessors leading back through the DAG until you eventually hit a zero-indegree node (DAGs cannot keep going backwards forever because there are no cycles).

So disconnected components are not a problem at all—they are exactly the reason multiple zero-indegree nodes may exist. Each disconnected/source component contributes at least one zero-indegree node that must be included.


```c++
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {

    //Given DAG
    //Hence, topological sort

    //Obviously we have to include all those nodes which cannot be reached by any other node otherwise we can never reach all the nodes
    vector <vector<int>> adj(n);
    vector <int> indegree(n, 0);

    for(const auto &p : edges)
    {
        indegree[p[1]]++;
        adj[p[0]].push_back(p[1]);   
    }

    //From constraints we can see that nested dfs is not possible, so there must be some observation which might be mising

    //So now we realize that after adding the non reachable nodes, we are left withn nodes which can be reached by atleast one other node which is also obviously reachable by any other node (since we already included the non reachable nodes)
    vector <int> res;
    for(int i = 0; i < n; i++)
    {
        if(indegree[i] == 0)
            res.push_back(i);
    }

    return res;
    }
};
```

We dont even need to build the adjacency list


```c++
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<int> inDegree(n,0);
        for(int i=0;i<edges.size();i++){
            inDegree[edges[i][1]]++;
        }
        vector<int> ans;
        for(int i=0;i<n;i++){
            if(inDegree[i]==0){
                ans.push_back(i);
            }
        }
        return ans;
    }
};
```


---

