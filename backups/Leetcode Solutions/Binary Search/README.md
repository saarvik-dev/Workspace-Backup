## 74. Search a 2D Matrix

The trick is to directly map a 1D index into the corresponding row and column of the 2D matrix.

To do this mapping, if there are `m` columns in the matrix and the index is `i`, then:

- **Row** = `i / m`
-  **Column** = `i % m`.

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {

    int n = matrix.size();

    int m = matrix[0].size();

    int low = 0, high = n * m - 1;

    while(low <= high)
    {
        int mid = low + (high  - low) / 2;

        int row = mid / m;
        int col = mid % m;

        if(matrix[row][col] == target)
            return true;

        else if (matrix[row][col] > target)
            high = mid - 1;
        
        else
            low = mid + 1;
    }    

    return false;
    }
};
```


---

## 240. Search in a 2D Matrix II

- As we are starting from the cell (0, m-1), the two variables i.e. ‘row’ and ‘col’ will point to 0 and m-1 respectively.
- We will do the following steps until row < n and col >= 0(i.e. while(row < n && col >= 0)):
- If matrix[row][col] == target: We have found the target and so we will return true.
- If matrix[row][col] > target: We need the smaller elements to reach the target. But the column is in increasing order and so it contains only greater elements. So, we will eliminate the column by decreasing the current column value by 1(i.e. col--) and thus we will move row-wise.
- If matrix[row][col] < target: In this case, We need the bigger elements to reach the target. But the row is in decreasing order and so it contains only smaller elements. So, we will eliminate the row by increasing the current row value by 1(i.e. row++) and thus we will move column-wise.
- If we are outside the loop without getting any matching element, we will return false.

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        
        // Start from the top-right corner
        int row = 0;
        int col = n - 1;
        
        while (row < m && col >= 0) {
            if (matrix[row][col] == target) {
                return true; // Target found
            } else if (matrix[row][col] > target) {
                col--; // Target is smaller, move left (eliminate current column)
            } else {
                row++; // Target is larger, move down (eliminate current row)
            }
        }
        
        return false; // Target not found
    }
};
```


---

## **1901. Find a Peak Element II**

**To solve this problem we use the binary search approach.**

**The key idea comes from how we find a peak in a 1-D array:**

- For any middle position (mid), we check if it’s larger than both its neighbors, if it is, we’ve found a peak.
- If mid is smaller than the element on its left, that means a peak must be somewhere to the left, so we can discard the right half.
- If mid is smaller than the element on its right, then a peak must lie to the right, allowing us to discard the left half.
- This method reduces the number of elements we need to consider in every step, improving efficiency.
**For a 2-D array,**

- The search will cover the column range from 0 to col-1, where col is the total number of columns.
- We choose a middle column and identify the row with the largest element in that column.
- We apply similar logic as in 1-D: if this element is bigger than both its side neighbors, we’ve found the peak.
- If the left neighbor is bigger, we only search the left part; if the right neighbor is bigger, we search the right part.

```c++
class Solution {
public:
    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int m = mat.size();       // number of rows
        int n = mat[0].size();    // number of columns
        
        int low = 0, high = n - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            // Find the row index of the global maximum element in the current column (mid)
            int maxRow = 0;
            for (int i = 0; i < m; i++) {
                if (mat[i][mid] > mat[maxRow][mid]) {
                    maxRow = i;
                }
            }
            
            // Check adjacent elements in the left and right columns
            // If out of bounds, treat the neighbor as -1 (since mat[i][j] >= 1)
            int leftNeighbor = (mid - 1 >= 0) ? mat[maxRow][mid - 1] : -1;
            int rightNeighbor = (mid + 1 < n) ? mat[maxRow][mid + 1] : -1;
            
            // If the current element is greater than both its neighbors, it's a 2D peak
            if (mat[maxRow][mid] > leftNeighbor && mat[maxRow][mid] > rightNeighbor) {
                return {maxRow, mid};
            }
            // If the right neighbor is strictly greater, a peak must exist in the right half
            else if (rightNeighbor > mat[maxRow][mid]) {
                low = mid + 1;
            }
            // Otherwise, a peak must exist in the left half
            else {
                high = mid - 1;
            }
        }
        
        return {-1, -1}; // Fallback, though a peak is guaranteed to exist
    }
};
```


---

## **278. First Bad Version**


```c++
// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {

    //Binary Search
    int low = 1, high = n;
    int ans;
    while(low <= high)
    {
        int mid = low + (high - low) / 2;

        if(isBadVersion(mid) == true)
        {
            ans = mid;
            high = mid - 1;
        }

        else
            low = mid + 1;

    }

    return ans;
    }
};
```


---

## **658. Find K Closest Elements**


```c++
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        
        // lower_bound gives the first element >= x
        auto it = lower_bound(arr.begin(), arr.end(), x);
        int r = distance(arr.begin(), it);
        int l = r - 1;

        
        while (k > 0) {
            
            if (l < 0)                
                r++;
            else if (r >= arr.size())
                l--;
            else if (abs(arr[l] - x) <= abs(arr[r] - x))
               l--;
            else
                r++;
            
            k--;
        }

        // Step 3: Return the subarray bounded between l + 1 and r - 1
        return vector<int>(arr.begin() + l + 1, arr.begin() + r);
    }
};
```


---

## **300. Longest Increasing Subsequence**


```c++
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
    
    int n = nums.size();
    if (n == 0) return 0;

    vector<int> temp;
    temp.push_back(nums[0]);
    
    for (int i = 1; i < n; i++) {
        if (nums[i] > temp.back()) {
            temp.push_back(nums[i]);
        } else {
            // Find the iterator of the first element >= nums[i]
            auto it = lower_bound(temp.begin(), temp.end(), nums[i]);
            *it = nums[i]; // Replace it
        }
    }
    
    // The size of temp represents the length of the LIS
    return temp.size();    
    }
};
```


---

## **1802. Maximum Value at a Given Index in a Bounded Array**

Here is the pure algorithmic conceptual breakdown, stripped of all the algebraic formulas:

### 1. The Core Paradigm: Binary Search on the Answer

Instead of trying to construct the array from scratch, we use **Binary Search** to guess the peak value (`mid`) at our target `index`.

- **Search Space:** The lowest possible value for the peak is `1` (since all numbers must be positive), and the highest possible value is `maxSum`.

---

### 2. The Validation Strategy (Greedy Simulation)

For every guess (`mid`), we need to check if it's possible to build a valid array without exceeding `maxSum`. To make this check as efficient as possible, we try to build the **absolute minimum array** that can support our guess:

- Start at `index` with our guessed value.
- Move outwards to the **left** and **right**, decreasing the value by exactly `1` at each step. This keeps the values as small as legally allowed.
- **The Floor Rule:** If a value drops down to `1`, it cannot go any lower. It must flatten out and stay at `1` all the way to the boundary of the array.

---

### 3. Simulating Both Sides Independently

To easily handle the arithmetic without off-by-one overlaps, split the array into two separate segments:

- **Left Segment (Inclusive):** Look at the range from the beginning of the array up to your target `index`.
- **Scenario A:** The peak is high enough that you reach the left edge before the values ever drop to `1`. You just find the area of this descending slope.
- **Scenario B:** The peak is small or the edge is too far away. The values hit `1` early, meaning you have a descending slope followed by a flat line of `1`s filling up the rest of the left slots.
- **Right Segment (Exclusive):** Look at the remaining slots strictly to the right of your target `index`, starting the descent from `mid - 1`.
- **Scenario A:** The values decrease smoothly all the way to the right edge without hitting `1`.
- **Scenario B:** The values hit `1` before reaching the right edge, creating a descending slope followed by a flat line of `1`s filling up the remaining right slots.

---

### 4. Making the Decision

1. Sum up the required elements from both sides.
1. If the total calculated sum is **less than or equal to **`maxSum`, then this peak value is viable! We save it as our best answer so far, and try to search for an even larger peak by moving our lower boundary up (`low = mid + 1`).
1. If the total sum **exceeds **`maxSum`, the guess is too large. We must search for a smaller peak by moving our upper boundary down (`high = mid - 1`).

```c++
class Solution {
public:
    int maxValue(int n, int index, int maxSum) {

    //We binary search the possibilities for the nums[index] which maximizes the element keeping the sum minimum
    //TO keep the sum minimum we keep decreasing by one to keep the sum as low as possible while not violating the condition    

    int res = 1;
    int low = 1, high = maxSum;
    long long l_maxSum = 1LL * maxSum;

    while(low <= high)
    {
        int mid = low + (high - low)/2;

        long long left = 0, right = 0, sum = 0;
        
        // 1. LEFT SIDE (Inclusive of mid)
        if(mid > index) 
            left = (1LL * (index + 1) * (2LL * mid - index)) / 2;                        
        else 
            left = (1LL * mid * (mid + 1)) / 2 + (index + 1 - mid);


        // 2. RIGHT SIDE (Exclusive of mid)
        long long right_elements = n - index - 1;
        
        if(mid - 1 > right_elements)
            right = (right_elements * (2LL * (mid - 1) - right_elements + 1)) / 2;
        else
        {
            long long v = mid - 1;
            right = (v * (v + 1)) / 2 + (right_elements - v);
        }

        sum = left + right;
        
        if(sum <= l_maxSum)
        {
            res = mid;
            low = mid + 1;
        }
        else
        {
            high = mid - 1;
        }
    }

    return res;
    }
};
```


---

## **4008. Minimum Initial Strength to Defeat All Monsters**


```c++
class Solution {
private:
    bool possibleDefeating(vector <int> &monsters, vector <long long> &arr, long long curr)
    {
        for(int i = 0; i < monsters.size(); i++)
        {
            if(curr + arr[i] < 1LL*monsters[i])
                return false;
            curr = max(0LL, curr - 1LL*monsters[i]);
        }
        return true;
    }
public:
    long long minInitialStrength(vector<int>& monsters, vector<vector<int>>& boosts) {

        ///Using difference array technique
        int n = monsters.size();
        
        vector <long long> arr(n, 0);
        
        for(auto p : boosts) {
            int l = p[0], r = p[1];
            long long v = p[2];
            arr[l] += v;
            if(r != n - 1)
                arr[r + 1] -= v;
        }
        for(int i = 1; i < n; i++)
            arr[i] += arr[i-1];

        long long curr = 0;
        long long sum = 0;
        for(int i = 0; i < n; i++) {
            sum += monsters[i];
        }

        long long low = 0, high = sum;
        while(low < high)
        {
            long long mid = low + (high - low) / 2;

            if(possibleDefeating(monsters, arr, mid))
            {
                high = mid;
            }
            else
                low = mid + 1;
        }
        return high;
    }
};
```


---

## **4012. Count of Unfinished Tasks After Each Shift**


```c++
class Solution {
public:
    vector<int> countTasks(vector<int>& tasks, vector<int>& shifts) {

        int t = tasks.size();

        vector<long long> pre(t);
        pre[0] = tasks[0];

        for (int i = 1; i < t; i++)
            pre[i] = pre[i - 1] + tasks[i];

        int n = shifts.size();
        vector<int> ans(n);

        long long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += shifts[i];

            if (sum >= pre[t - 1]) {
                ans[i] = 0;
                sum = 0;
                continue;
            }

            int idx = upper_bound(pre.begin(), pre.end(), sum) - pre.begin();

            ans[i] = t - idx;
        }

        return ans;
    }
};
```


---

## **792. Number of Matching Subsequences**

### Algorithm

**Idea:**

Store all indices of each character in `s`. For every word, try to match its characters one by one using binary search to find the next valid occurrence in `s`.

1. Create an array of 26 vectors.
- `index[0]` stores positions of `'a'`
- `index[1]` stores positions of `'b'`
- and so on.
1. Traverse `s` and store the index of each character in its corresponding vector.
1. Store the frequency of every word in a hash map so that duplicate words are processed only once.
1. For each unique word:
- Start with `prev = -1`.
- For every character:
- Use `upper_bound()` on its index vector to find the first occurrence after `prev`.
- If no such position exists, the word is not a subsequence.
- Otherwise, update `prev` to the found position.
- If all characters are matched, add the frequency of that word to the answer.
1. Return the answer.
### Complexity

Let:

- `n = s.length()`
- `L = total length of all words`
Building index arrays:


```plain text
O(n)
```

Checking all words:


```plain text
O(L log n)
```

Overall:


```plain text
O(n + L log n)
```

### Key Observation

For each character, instead of searching the entire string `s`, we directly jump to its next occurrence using binary search on the stored indices.


```c++
class Solution {
public:
    int numMatchingSubseq(string s, vector<string>& words) {

    //Intuition : Create a set and store all the words from the words array, then perform a simple knapsack dp to check all combinations of words possible    

    vector <vector<int>> index(26);

    for(int i = 0; i < s.length(); i++)
        index[s[i] - 'a'].push_back(i);

    unordered_map <string, int> hash;
    for(auto word : words)  
        hash[word]++;
    int res = 0;

    for(const auto &[key, value] : hash)
    {
        int prev = -1;
        bool ok = true;

        for(char ch : key)
        {
            auto &v = index[ch - 'a'];

            auto it = upper_bound(v.begin(), v.end(), prev);

            if(it == v.end())
            {
                ok = false;
                break;
            }

            prev = *it; 
        }

        if(ok) res += value;
    }
    return res;
    }
};
```

