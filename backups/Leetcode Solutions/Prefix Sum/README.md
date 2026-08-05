## 238. Product of Array except Sum

***BRUTE FORCE ***

**O(N^2), O(1)**

For each index, multiply all other elements using a loop.


```javascript
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 1);

        for (int i = 0; i < n; i++) {
            int product = 1;

            for (int j = 0; j < n; j++) {
                if (i == j) continue;   // skip current index
                product *= nums[j];
            }

            ans[i] = product;
        }

        return ans;
    }
};

```

**BETTER SOLUTION**

O(N) | O(1)

- Compute total product
- For each index: total / nums[i]
- Handle zeros carefully

```javascript
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 0);

        long long total = 1;
        int zeroCount = 0;

        for (int x : nums) {
            if (x == 0) {
                zeroCount++;
                continue;
            }
            total *= x;
        }

        for (int i = 0; i < n; i++) {

    // Case 1: More than one zero exists in the array
    // If there are 2 or more zeros, then for every index,
    // the product except self will always include at least one zero.
    // So all answers become 0.
    if (zeroCount > 1) {
        ans[i] = 0;
    }

    // Case 2: Exactly one zero exists in the array
    else if (zeroCount == 1) {

        // If current element itself is zero,
        // then product except self = product of all NON-ZERO elements
        // (which we stored in 'total').
        if (nums[i] == 0)
            ans[i] = total;

        // If current element is not zero,
        // then product except self will include that single zero,
        // so result becomes 0.
        else
            ans[i] = 0;
    }

    // Case 3: No zeros in the array
    else {
        // Normal situation:
        // product except self = total product / current element
        ans[i] = total / nums[i];
    }
}

        return ans;
    }
};

```

**OPTIMAL SOLUTION **

O(N), O(1)

Left product already stored in ans[i]
Right product computed during backward pass

ans[i] = left × right

No division needed.


```javascript
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 1);

        // Step 1: Prefix products
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            ans[i] = prefix;        // store product of left side
            prefix *= nums[i];
        }

        // Step 2: Suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] *= suffix;       // multiply with right side product
            suffix *= nums[i];
        }

        return ans;
    }
};

```


---

## **724. Find Pivot Index**


```javascript
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int totalSum = 0;
        int leftSum = 0;

        // 1. Calculate the total sum of the array
        for (int x : nums) totalSum += x;

        // 2. Iterate and check the pivot condition
        for (int i = 0; i < nums.size(); i++) {
            // Pivot condition: leftSum == rightSum
            // rightSum is calculated as: totalSum - leftSum - nums[i]
            if (leftSum == totalSum - leftSum - nums[i]) {
                return i; // Return the index, not the value!
            }
            leftSum += nums[i];
        }

        return -1;
    }
};
```

O(N), O(1)


---

## **303. Range Sum Query - Immutable**


```javascript
class NumArray {
private:
    vector<int> prefix;

public:
    // This is the "Constructor" where we do the heavy lifting (Pre-computation)
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    // This is the Query function (Constant Time)
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```


---

## **1590. Make Sum Divisible by P**

### Subarray Sum


---

### Problem Condition

Substitute the subarray sum:


---

### Let

Then,


---

### Congruence Form

Rearrange,


---

### HashMap Lookup

Suppose

Then we need to search for

So,


---

### Store in HashMap


---

## Important Modular Arithmetic Identities

### Congruence Theorem


---

### Addition


---

### Subtraction


---

### Incorrect Identities (Never Use)


---

### Normalize Negative Modulo

or after subtraction,

to ensure the remainder lies in


---

## Final Formula to Memorize

If

then

### Correct Logic but unclean code


```c++
class Solution {
public:
    int minSubarray(vector<int>& prefix, int p) {
    
    //Derivation 
    /*
    
    (sum - subarraySum) % p = 0
    (sum - prefix[j] + prefix[i - 1]) % p = 0
    (sum % p - prefix[j] % p + prefix[i - 1] % p) % p == 0
    (prefix[i - 1] % p) % p == (prefix[j] % p - sum % p + p) % p
    (prefix[i - 1] % p) == (prefix[j] % p - sum % p + p) % p
    
    let need = sum % p
    let curr_rem = prefix[j] % p
    then, 
    ____________________________________________________
    |   prefix[i - 1] % p == (curr_rem - need + p) % p  |
    |                                                   |
    |___________________________________________________|
    */

    //stores remainder when dividing prefix sum by p (rem -> end_index of subarray)
    unordered_map <long long, int> rem;    
    int n = prefix.size();
    
    //TO account for subarrays starting at start of the vector
    rem[0] = 0;

    vector <long long> prefixSum(n + 1, 0);

    for(int i = 1; i <= n; i++)
        prefixSum[i] = prefixSum[i - 1] + prefix[i - 1];
    
    //Total sum of array
    long long need = prefixSum[n] % p;
    int len = INT_MAX;

    if(need == 0)   return 0;
    
    for(int j = 1; j <= n; j++)
    {
        int curr_rem = prefixSum[j] % p;
        long long target = (curr_rem - need + p) % p;
        
        if(rem.find(target) != rem.end())
            len = min(len, j - rem[target]);

        rem[curr_rem] = j;
    }

    return (len == INT_MAX || len == n) ? -1 : len;
    }
	};
```

### Cleaner Code


```c++
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {

    //Derivation 
    /*
    
    (sum - subarraySum) % p = 0
    (sum - prefix[j] + prefix[i - 1]) % p = 0
    (sum % p - prefix[j] % p + prefix[i - 1] % p) % p == 0
    (prefix[i - 1] % p) % p == (prefix[j] % p - sum % p + p) % p
    (prefix[i - 1] % p) == (prefix[j] % p - sum % p + p) % p
    
    let need = sum % p
    let curr_rem = prefix[j] % p
    then, 
    ____________________________________________________
    |   prefix[i - 1] % p == (curr_rem - need + p) % p  |
    |                                                   |
    |___________________________________________________|
    */

        int n = nums.size();

        long long totalSum = 0;
        for (int x : nums)
            totalSum += x;

        int need = totalSum % p;

        if (need == 0)
            return 0;

        // Stores: (prefixSum % p) -> latest prefix index
        unordered_map<int, int> rem;
        rem[0] = -1;

        long long prefixSum = 0;
        int len = INT_MAX;

        for (int j = 0; j < n; j++)
        {
            prefixSum += nums[j];

            int curr_rem = prefixSum % p;
            int target = (curr_rem - need + p) % p;

            if (rem.find(target) != rem.end())
                len = min(len, j - rem[target]);

            // Store latest occurrence
            rem[curr_rem] = j;
        }

        return (len == INT_MAX || len == n) ? -1 : len;
    }
};
```


---

## **1915. Number of Wonderful Substrings**

### Bitmasking


```c++
class Solution {
public:
    long long wonderfulSubstrings(string word) {

        //We will use a parity bitmask which stores whether each character has even count or odd count
        //WE'll start with 0 as even count and keep flipping for every occurence of that character
        //There are 2^10 total bit masks possible, as we keep traversing through each character we will make its mask, and also add it to the count mask array which stores the count of that mask till current index, this way we can check the same mask or differ by one mask thing later while traversing



        vector<long long> count(1024, 0);
        
        // Base case: The empty prefix has a mask of 0.
        count[0] = 1;
        
        long long result = 0;
        int current_mask = 0;
        
        for (char ch : word) {
            // Flip the bit corresponding to the current character 
            current_mask ^= (1 << (ch - 'a'));
            
            // All bits have same parity as some mask earlier, which means both have all even characters
            result += count[current_mask];
            
            //Exactly one character appears an odd number of times.
            // Check all 10 possible masks that differ from current_mask by exactly one bit.
            for (int i = 0; i < 10; ++i) {
                int target_mask = current_mask ^ (1 << i);
                result += count[target_mask];
            }
            
            count[current_mask]++;
        }
        
        return result;
    }
};
```


---

## **304. Range Sum Query 2D - Immutable**

To optimize, we should make the prefix sum array 1-indexed

### Brute Force


```c++
class NumMatrix {
private:
    vector <vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {

        int m = matrix.size();
        int n = matrix[0].size();

        prefix.resize(m, vector <int> (n, 0));
        for(int i = 0; i < m; i++)
        {
            for(int j = 0; j < n; j++)
            {
                int up = (i - 1 >= 0) ?  prefix[i - 1][j] : 0;
                int left = (j - 1 >= 0) ? prefix[i][j - 1] : 0;
                int diag = (i - 1 >=0 && j - 1 >= 0) ? prefix[i - 1][j - 1] : 0;

                prefix[i][j] = up + left + matrix[i][j] - diag;
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {

        int up = (row1 - 1 >= 0) ? prefix[row1 - 1][col2] : 0;
        int left = (col1 - 1 >= 0) ? prefix[row2][col1 - 1] : 0;
        int diag = (row1 - 1 >= 0 & col1 - 1 >= 0) ? prefix[row1 - 1][col1 - 1] : 0;

        return  prefix[row2][col2] - up - left + diag;    
    }
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix* obj = new NumMatrix(matrix);
 * int param_1 = obj->sumRegion(row1,col1,row2,col2);
 */
```

### Optimal 


```c++
class NumMatrix {
private:
    vector <vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {

        int m = matrix.size();
        int n = matrix[0].size();

        prefix.resize(m + 1, vector <int> (n + 1, 0));
        for(int i = 1; i <= m; i++)
        {
            for(int j = 1; j <= n; j++)
            {
                prefix[i][j] = prefix[i - 1][j] + prefix[i][j - 1] + matrix[i - 1][j - 1] - prefix[i - 1][j - 1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {

        row1++; row2++; col1++; col2++;
        return  prefix[row2][col2] - prefix[row1 - 1][col2] - prefix[row2][col1 - 1] + prefix[row1 - 1][col1 - 1];    
    }
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix* obj = new NumMatrix(matrix);
 * int param_1 = obj->sumRegion(row1,col1,row2,col2);
 */
```


---

🔗 **References**
- 238. Product of Array except Sum → https://leetcode.com/problems/product-of-array-except-self/description/?envType=problem-list-v2&envId=prefix-sum

