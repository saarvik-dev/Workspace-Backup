## **292. Nim Game**

We have to force our opponent to face multiples of 4, then loosing is obvious.


```c++
class Solution {
public:
    bool canWinNim(int n) {
        
        //iF multiple of 4, then loose
        return n % 4;
    }
};
```


---

## 1025. Divisor Game

### Why Does This Work? (The Mathematical Proof)

The game relies on two core rules of numbers:

1. An **even number** has both even and odd divisors (including `1`).
1. An **odd number** *only* has odd divisors.
Let's break down why Alice always wins if N starts as an even number:

If Alice is given an **even number**, she can always choose x = 1 (since 1 divides any number).

- Subtracting 1 from an even number always results in an **odd number**.
- Therefore, Alice can always force Bob into receiving an odd number.
If Bob is given an **odd number**, he is forced to find a divisor. Since odd numbers only have odd divisors, whatever x he chooses *must* be odd.

- Subtracting an odd number from an odd number always results in an **even number**.
- Therefore, Bob is forced to hand an even number back to Alice.
This cycle repeats: Alice always passes an odd number to Bob, and Bob is always forced to pass an even number back to Alice.

Eventually, the number reduces down to **N = 2** when it is Alice's turn. Alice chooses x = 1, leaving Bob with **N = 1**. Since no positive integer is strictly less than 1, Bob cannot make a move and loses the game.


---

### Complexity Analysis

- **Time Complexity:** \mathcal{O}(1) — The solution checks a single mathematical condition instantly.
- **Space Complexity:** \mathcal{O}(1) — No extra memory is allocated.

```c++
class Solution {
public:
    bool divisorGame(int n) {

    return n % 2 == 0;   
    }
};
```


---

## 365. Water and Jug Problem

### Brute Force


```c++
class Solution {
public:
    bool dfs(int total, int x, int y, int target, unordered_set<int>& visited) {
       
        if (total == target) return true;
        if (total < 0 || total > x + y || visited.count(total)) return false;
        
        visited.insert(total);
        
        // 1. Add x liters
        // 2. Remove x liters
        // 3. Add y liters
        // 4. Remove y liters
        //The third operation doesn't affect as the amount of water remains conserved
        return dfs(total + x, x, y, target, visited) ||
               dfs(total - x, x, y, target, visited) ||
               dfs(total + y, x, y, target, visited) ||
               dfs(total - y, x, y, target, visited);
    }

    bool canMeasureWater(int x, int y, int target) {
        // Sanity check: Can't measure more water than the total capacity
        if (target > x + y) return false;
        
        unordered_set<int> visited;
        return dfs(0, x, y, target, visited);
    }
};
```

### Bezouts Identity

The problem now becomes:

**ax+by=target**

This is **exactly** what Bézout's Identity answers.

Bézout's Identity 

- The problem reduces to asking whether `target` can be expressed as an integer linear combination of the jug capacities: `ax + by = target`.
- By Bézout's Identity, such an equation has an integer solution iff `target` is divisible by `gcd(x, y)`.
- Since the total amount of water available can never exceed the combined capacities, we must also ensure `target <= x + y`.
- Therefore, the answer is **true** iff:
- `target <= x + y`
- `target % gcd(x, y) == 0`

```c++
class Solution {
public:
    bool canMeasureWater(int x, int y, int target) {

        if (target > x + y)
            return false;

        return target % gcd(x, y) == 0;
    }
};
```


---

## **486. Predict the Winner**

Alternative style dp with minus in recursion.


```c++
class Solution {
private:
    vector<vector<int>> dp;

    int solve(vector<int>& nums, int i, int j) {
        if (i == j)
            return nums[i];

        if (dp[i][j] != INT_MIN)
            return dp[i][j];

        int takeLeft = nums[i] - solve(nums, i + 1, j);
        int takeRight = nums[j] - solve(nums, i, j - 1);

        return dp[i][j] = max(takeLeft, takeRight);
    }

public:
    bool predictTheWinner(vector<int>& nums) {
        int n = nums.size();
        dp.assign(n, vector<int>(n, INT_MIN));

        return solve(nums, 0, n - 1) >= 0;
    }
};
```


---

## **877. Stone Game**

### Memoization


```c++
class Solution {
private:    
    int maxDiff(vector <int> &piles, int i, int j, vector <vector<int>> &dp)
    {
        if(i == j)
            return piles[i];

        if(dp[i][j] != -1)
            return dp[i][j];

        int pickLeft = piles[i] - maxDiff(piles, i + 1, j, dp);
        int pickRight = piles[i] - maxDiff(piles, i, j - 1, dp);

        return dp[i][j] = max(pickLeft, pickRight);
    }
public:
    bool stoneGame(vector<int>& piles) {

    //This question is exactly the same as predict the winner question
    //We have to apply a dp[i][j] which represents the maximum score difference the current player can achieve operating between the indices i and j 

    int n = piles.size();
    vector <vector<int>> dp(n, vector <int> (n, -1));
    return maxDiff(piles, 0, n - 1, dp) >= 0;
    }
};
```

### Observation


```c++
	class Solution {
public:
    bool stoneGame(vector<int>& piles) {
    //Though we can use dp to simulate the process but due to the constraint that number of piles is even , it is gauranteed that Alice will always win as alice can always choose all the even indices or all the odd indices, hence it will force bob to choose all those indices (odd or even) whose sum is less

    return true;    
    }
};
```


---

🔗 **References**
- Bézout's Identity → https://app.notion.com/p/3910eb7a3bc38094a766c54731b5d023

