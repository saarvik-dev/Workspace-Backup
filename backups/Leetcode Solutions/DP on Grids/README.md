## **221. Maximal Square**

To extend a square by 1, the cells above, left, and diagonal must all already contain squares of that size.

Therefore, the maximum size you can extend to is determined by the **minimum** of those three values.

### Memoization


```c++
class Solution {
private:
//returns length of the largest square consisting of all 1s whose right bottom is at i, j
    int solve(int i, int j, vector<vector<char>>& matrix,
              vector<vector<int>>& dp) {
        
        if (i < 0 || j < 0)
            return 0;

        if (dp[i][j] != -1)
            return dp[i][j];

        if (matrix[i][j] == '0')
            return dp[i][j] = 0;

        int up = solve(i - 1, j, matrix, dp);
        int left = solve(i, j - 1, matrix, dp);
        int diag = solve(i - 1, j - 1, matrix, dp);

        return dp[i][j] = 1 + min({up, left, diag});
    }

public:
    int maximalSquare(vector<vector<char>>& matrix) {
        //dp[i][j] = side length of the largest square consisting entirely of 1s whose bottom-right corner is at cell (i, j).
        int m = matrix.size();
        int n = matrix[0].size();

        vector<vector<int>> dp(m, vector<int>(n, -1));

        int maxi = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxi = max(maxi, solve(i, j, matrix, dp));
            }
        }

        return maxi * maxi;
    }
};
```

### Tabulation


```c++
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        //dp[i][j] = side length of the largest square consisting entirely of 1s whose bottom-right corner is at cell (i, j).
        //Tabulation code
        int m = matrix.size();
        int n = matrix[0].size();

        vector<vector<int>> dp(m, vector<int>(n, 0));

        for(int i = 0; i < m; i++)
        {
            for(int j = 0; j < n; j++)
            {
                if (matrix[i][j] == '0')
                    dp[i][j] = 0;
                else
                {
                    int up = (i >= 1) ? dp[i - 1][j] : 0;
                    int left = ( j >= 1) ? dp[i][j - 1] : 0;
                    int diag = ( i >= 1 && j >= 1) ? dp[i - 1][j - 1] : 0;

                    dp[i][j] = 1 + min({up, left, diag});
                }
            }
        }
        int maxi = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxi = max(maxi, dp[i][j]);
            }
        }

        return maxi * maxi;
    }
};
```


---

## **764. Largest Plus Sign**

**4 DP VECTORS**

### Memoization using 4 dp vectors


```c++
class Solution {
private:
    int upOnes(int i, int j, vector <vector<int>> &grid, vector <vector<int>> &up)
    {
        if(i < 0)  
            return 0;

        if(up[i][j] != -1)
            return up[i][j];

        if (grid[i][j] == 0)
            return up[i][j] = 0;

        return up[i][j] = 1 + upOnes(i - 1, j, grid, up);
    }

    int downOnes(int i, int j, vector <vector<int>> &grid, vector <vector<int>> &down)
    {
        if(i >= grid.size())  
            return 0;

        if(down[i][j] != -1)
            return down[i][j];

        if (grid[i][j] == 0)
            return down[i][j] = 0;

        return down[i][j] = 1 + downOnes(i + 1, j, grid, down);
    }

    int leftOnes(int i, int j, vector <vector<int>> &grid, vector <vector<int>> &left)
    {
        if(j < 0)  
            return 0;

        if(left[i][j] != -1)
            return left[i][j];

        if (grid[i][j] == 0)
            return left[i][j] = 0;

        return left[i][j] = 1 + leftOnes(i, j - 1, grid, left);
    }

    int rightOnes(int i, int j, vector <vector<int>> &grid, vector <vector<int>> &right)
    {
        if(j >= grid[0].size())  
            return 0;

        if(right[i][j] != -1)
            return right[i][j];

        if (grid[i][j] == 0)
            return right[i][j] = 0;

        return right[i][j] = 1 + rightOnes(i, j + 1, grid, right);
    }

public:
    int orderOfLargestPlusSign(int n, vector<vector<int>>& mines) {

    //Lets identify the dp state
    //We will create four dp tables, for example
    //up[i][j] -> stores the number of ones we will see before a zero starting at r, c and walking up 
    //Similarly for other directions
    vector<vector<int>> grid(n, vector<int>(n, 1));

    for (auto &mine : mines)
        grid[mine[0]][mine[1]] = 0;

    vector <vector<int>> up(n, vector <int> (n, -1));
    vector <vector<int>> down(n, vector <int> (n, -1));
    vector <vector<int>> left(n, vector <int> (n, -1));
    vector <vector<int>> right(n, vector <int> (n, -1));

    int res = 0;

    for(int i = 0; i < n; i++)
    {
        for(int j = 0; j < n; j++)
        {
            int U = upOnes(i, j, grid, up); 
            int D = downOnes(i, j, grid, down); 
            int L = leftOnes(i, j, grid, left); 
            int R = rightOnes(i, j, grid, right); 

            res = max(res, min({U, D, L, R}));
        }
    }

    return res;
    }
};
```

## Optimal Tabulation

Instead of maintaining four separate DP tables for the counts of consecutive 1s in the left, right, up, and down directions, we use a single `dp` table initialized with `n` for all non-mine cells and `0` for mines. We then perform four passes over the grid: left→right, right→left, top→bottom, and bottom→top. In each pass, we keep a running count of consecutive 1s and update `dp[i][j] = min(dp[i][j], count)`. This gradually stores the minimum arm length among all directions for every cell. After all four traversals, `dp[i][j]` represents `min(left, right, up, down)`, which is exactly the order of the largest plus sign centered at that cell. The answer is the maximum value present in the DP table.

Instead of using 4 dp vectors, we can use a single dp table and keep updating it to the minimum encountered during that row to keep our logic safe.


```c++
class Solution {
public:
    int orderOfLargestPlusSign(int n, vector<vector<int>>& mines) {
        
        vector<vector<int>> dp(n, vector<int>(n, n));

        for (auto &mine : mines) {
            dp[mine[0]][mine[1]] = 0;
        }

        for (int i = 0; i < n; i++) {
            
            int left = 0;
            for (int j = 0; j < n; j++) {
                left = (dp[i][j] == 0) ? 0 : left + 1;
                dp[i][j] = min(dp[i][j], left);
            }

            int right = 0;
            for (int j = n - 1; j >= 0; j--) {
                right = (dp[i][j] == 0) ? 0 : right + 1;
                dp[i][j] = min(dp[i][j], right);
            }
        }

        for (int j = 0; j < n; j++) {
            
            int up = 0;
            for (int i = 0; i < n; i++) {
                up = (dp[i][j] == 0) ? 0 : up + 1;
                dp[i][j] = min(dp[i][j], up);
            }

            int down = 0;
            for (int i = n - 1; i >= 0; i--) {
                down = (dp[i][j] == 0) ? 0 : down + 1;
                dp[i][j] = min(dp[i][j], down);
            }
        }

        int ans = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                ans = max(ans, dp[i][j]);
            }
        }

        return ans;
    }
};	
```


---

