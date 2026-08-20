## **231. Power of Two**


```javascript
class Solution {
public:
    bool isPowerOfTwo(int n) {

        return n > 0 && (n & n - 1) == 0;
        //After clearing the rightmost set bit number should be zero
    }
};
```


---

## **29. Divide Two Integers**


```javascript
class Solution {
public:
    int divide(int dividend, int divisor) {
        // Handle overflow case: -2147483648 / -1
        if (dividend == INT_MIN && divisor == -1) {
            return INT_MAX;
        }

        // Determine the sign of the result
        // true if result is negative
        bool isNegative = (dividend < 0) ^ (divisor < 0);

        // Use long long to prevent overflow during absolute conversion
        long long absDividend = abs((long long)dividend);
        long long absDivisor = abs((long long)divisor);
        long long quotient = 0;

        while (absDividend >= absDivisor) {
            long long tempDivisor = absDivisor;
            long long multiple = 1;

            // Double the divisor until it's larger than the remaining dividend
            while (absDividend >= (tempDivisor << 1)) {
                tempDivisor <<= 1;
                multiple <<= 1;
            }

            absDividend -= tempDivisor;
            quotient += multiple;
        }

        return isNegative ? -quotient : quotient;
    }
};
```


---

## **2220. Minimum Bit Flips to Convert Number**


```javascript
class Solution {
public:
    int minBitFlips(int start, int goal) {

    //XOR logic, wherever bits are different XOR returns 1, then we count number of ones in the res

    int res = start ^ goal;

    //Counting number of set bits
    int cnt = 0;

    while(res != 0)
    {
        res = res & (res - 1);       //Removing last set bit
        cnt++;
    }

    return cnt;
    }
};

```


```javascript
class Solution {
public:
    int minBitFlips(int start, int goal) {

    return __builtin_popcount(start ^ goal);
    }
};
```


---

1. Subsets
For an array of size $n$, there are $2^n$ possible subsets (the power set). Each number from $0$ to $2^n - 1$ can be viewed as a "mask" where the $i^{th}$ bit tells you whether to include `nums[i]` in a specific subset.


| Mask (Binary) | Mask (Decimal) | Bit logic | Subset |
| --- | --- | --- | --- |
| 000 | 0 | No bits set | [] |
| 001 | 1 | 0th bit set | [1] |
| 010 | 2 | 1st bit set | [2] |
| 011 | 3 | 0th and 1st bits set | [1, 2] |
| ... | ... | ... | ... |
| 111 | 7 | All bits set | [1, 2, 3] |




---


![](../../assets/3360eb7a-3bc3-8004-ad17-ecb5831c113a.png)


```c++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {

        // Get the size of the input array
        int n = nums.size();

        // Calculate the total number of subsets (2^n) using bitwise shift
        int subsets = 1 << n;

        // Vector to store all subsets
        vector<vector<int>> ans;

        // Iterate through all numbers from 0 to 2^n - 1
        for (int num = 0; num < subsets; num++) {
            // Temporary vector to hold the current subset
            vector<int> subset;

            // Iterate through each bit of the number
            for (int i = 0; i < n; i++) {
                // If the ith bit is set, include nums[i] in the subset
                if (num & (1 << i)) {
                    subset.push_back(nums[i]);
                }
            }

            // Add the constructed subset into the result
            ans.push_back(subset);
        }

        // Return all subsets
        return ans;
    }
};
```


---

## **190. Reverse Bits**


```c++
class Solution {
public:
    int reverseBits(int n) {

    int res = 0;

    for(int i = 0; i < 32; i++)
    {
        res <<= 1;
        res |= (n & 1);

        n >>= 1;
    }   
    
    return res;
    }
};
```


---

## 461. Hamming Distance


```c++
class Solution {
public:
    int hammingDistance(int x, int y) {

    int ans = (x ^ y);

    return __builtin_popcount(ans);    
    }
};
```


---

## **3513. Number of Unique XOR Triplets I**


![](../../assets/3a60eb7a-3bc3-8008-a6e7-c5e4fd6a9926.png)


```c++
class Solution {
public:
    int uniqueXorTriplets(vector<int>& nums) {
        int n = nums.size();
        if (n <= 2) return n;
        
        //Using any combination of 3 elements from [1, n], we can construct every integer in the range 
//        [0, 2^{m+1} - 1], where 2^m is the largest power of 2 less than or equal to n.
        //smallest power of 2 strictly greater than n
        int p = 1;
        while (p <= n) {
            p <<= 1;
        }
        return p;
    }
};
```


---

## **3702. Longest Subsequence With Non-Zero Bitwise XOR**

  We have got some great observation
  Acombination of nums producing 0 is only possible if say the subsequence is --
  [a, b, c, ......w, x] and a ^ b ^ c ^ d.......w = x, then x ^ x == 0
  This is the only possible case

  Since we want the longest subsequence, we will calculate the xor of all elements till the second last, if it does not equal the last element, then we can take the last element too, as it won't produce a zero xor, hence answer would be len, but say the xor equals to the last element, then taking the last element would result in zero, hence, we can remove any element from the former part to change the previous xor to be not equal to the last element

 However, if all elements are 0, then the answer would be zero


```c++
class Solution {
public:
    int longestSubsequence(vector<int>& nums) {

    //Since the constraints are high, hence O(N) solution seems most optimal    


    int zero = 0;
    long long xore = 0;
    int n = nums.size();

    for(int i = 0; i < n - 1; i++)
    {
        xore = xore ^ nums[i];

        if(nums[i] == 0)
            zero++;
    }

    if(zero == n - 1 && nums[n - 1] == 0)
        return 0;

    return (xore == nums[n - 1]) ? n - 1 : n;
    }
};
```


---

## **1386. Cinema Seat Allocation**


```c++
class Solution {
public:
    int maxNumberOfFamilies(int n, vector<vector<int>>& reservedSeats) {
        unordered_map<int, int> rowMask;

        // Mask seats 2 through 9 (seats 1 and 10 do not affect 4-person groups)
        for (const auto& seat : reservedSeats) {
            int r = seat[0];
            int c = seat[1];
            if (c >= 2 && c <= 9) {
                rowMask[r] |= (1 << (c - 2)); // Shift to 0-indexed bits (0 to 7)
            }
        }

        // Each unvisited row can accommodate 2 full groups
        int ans = (n - rowMask.size()) * 2;

        // Bitmasks for each 4-seat block (relative to seat 2):
        // Left   (seats 2,3,4,5) -> bits 0,1,2,3 -> 0b00001111 (15)
        // Right  (seats 6,7,8,9) -> bits 4,5,6,7 -> 0b11110000 (240)
        // Middle (seats 4,5,6,7) -> bits 2,3,4,5 -> 0b00111100 (60)
        const int LEFT_MASK = 0b00001111;
        const int RIGHT_MASK = 0b11110000;
        const int MID_MASK = 0b00111100;

        for (const auto& [row, mask] : rowMask) {
            bool leftPossible = (mask & LEFT_MASK) == 0;
            bool rightPossible = (mask & RIGHT_MASK) == 0;
            bool midPossible = (mask & MID_MASK) == 0;

            if (leftPossible && rightPossible) {
                ans += 2;
            } else if (leftPossible || rightPossible || midPossible) {
                ans += 1;
            }
        }

        return ans;
    }
};
```

