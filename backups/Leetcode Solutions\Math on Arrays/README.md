## 3379. Transformed Array


```c++
class Solution {
public:
    vector<int> constructTransformedArray(vector<int>& nums) {

    //We have to use the standard modulus arithmetic for circular data structures

    int n = nums.size();
    vector <int> res(n);

    for(int i = 0; i < n; i++)
        res[i] = nums[(i + (nums[i] % n) + n) % n];

    return res;
    }
};
```


---

## **15. Three Sum**

We essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand

Only skip duplicates **after you record a valid triplet**. NOT before. Why?

Because before finding a valid sum, duplicates might still lead to a different combination.


```javascript
#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    
    vector<vector<int>> result;
    
    // Step 1: Sort the array
    sort(nums.begin(), nums.end());
    
    int n = nums.size();
    
    // Step 2: Fix one element and use two-pointer for remaining
    for (int i = 0; i < n - 2; i++) {
        
        // Skip duplicate values for i
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        
        int left = i + 1;
        int right = n - 1;
        
        while (left < right) {
            
            int sum = nums[i] + nums[left] + nums[right];
            
            if (sum == 0) {
                
                // Found a valid triplet
                result.push_back({nums[i], nums[left], nums[right]});
                
                // Move both pointers
                left++;
                right--;
                
                // Skip duplicates for left pointer
                while (left < right && nums[left] == nums[left - 1])
                    left++;
                
                // Skip duplicates for right pointer
                while (left < right && nums[right] == nums[right + 1])
                    right--;
            }
            else if (sum < 0) {
                left++;   // Need larger sum
            }
            else {
                right--;  // Need smaller sum
            }
        }
    }
    
    return result;
}

```

O(N^2)


---

## 696. Count Binary Substrings

**Brute Force**

O(N^2)


```javascript
class Solution {
public:
    int countBinarySubstrings(string s) {

    //Trying the O(N2) approach using two for loops for subarray counting

    int n = s.length(), ans = 0;

    for(int i = 0; i < n; i++)
    {
        int j = i;
        int c1 = 0, c2 = 0;
            
        while(j < n && s[j] == s[i])
        {
            c1++;
            j++;
        }

        while(j < n && s[j] != s[i])
        {
            c2++;
            j++;

            if(c1 == c2)
                ans++;
        }         
    }   

    return ans;
    }
};
```

**OPTIMAL SOLUTION**

Intuition:


![](../assets/30c0eb7a-3bc3-80ab-bd94-c5a6f5550b8e.png)


```javascript
class Solution {
public:
    int countBinarySubstrings(string s) {
        
        int prev = 0;      // previous group size
        int curr = 1;      // current group size
        int ans = 0;
        
        for(int i = 1; i < s.size(); i++)
        {
            if(s[i] == s[i-1])
            {
                curr++;
            }
            else
            {
                ans += min(prev, curr);
                prev = curr;
                curr = 1;
            }
        }
        
        ans += min(prev, curr); // last pair
        
        return ans;
    }
};

```


---

## **3740.** **Minimum Distance Between Three Equal Elements I**

**O(N^3)**


```c++
class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        int n = nums.size();
        int minDis = INT_MAX;
        bool found = false;

        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] != nums[j]) continue;
                for (int k = j + 1; k < n; ++k) {
                    if (nums[i] == nums[k]) {
                        found = true;
                        // Simplified formula: 2 * (max_index - min_index)
                        // Since i < j < k, it's just 2 * (k - i)
                        int currentDist = 2 * (k - i);
                        minDis = min(minDis, currentDist);
                    }
                }
            }
        }

        return found ? minDis : -1;
    }
};
```

O(N)


```c++
class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        // Map value to a list of its indices
        unordered_map<int, vector<int>> indexMap;
        int minDis = INT_MAX;
        bool found = false;

        for (int i = 0; i < nums.size(); ++i) {
            int val = nums[i];
            indexMap[val].push_back(i);
            
            int sz = indexMap[val].size();
            // If we have at least 3 occurrences of this number
            if (sz >= 3) {
                found = true;
                // 'i' is the current index (k), 
                // indexMap[val][sz-3] is the index from two occurrences ago (i)
                int currentDist = 2 * (i - indexMap[val][sz - 3]);
                minDis = min(minDis, currentDist);
            }
        }

        return found ? minDis : -1;
    }
};
```


---

## 3300. Minimum Element After Replacement With Digit Sum


```c++
class Solution {
    int sum(int number)
    {
        int res = 0;
        while(number)
        {
            res += number % 10;
            number = number / 10;
        }

        return res;
    }
public:
    int minElement(vector<int>& nums) {

    //Brute Force   
    int ans = INT_MAX;

    for(auto num : nums)
    {
        ans = min(ans, sum(num));
    }    

    return ans;
    }
};
```


---

## **628. Maximum Product of Three Numbers**


```c++
class Solution {
public:
    int maximumProduct(vector<int>& nums) {
        
        int max1 = INT_MIN, max2 = INT_MIN, max3 = INT_MIN;
        int min1 = INT_MAX, min2 = INT_MAX;

        for (int num : nums) {

            if (num > max1) {
                max3 = max2;
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max3 = max2;
                max2 = num;
            } else if (num > max3) {
                max3 = num;
            }

            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }

        return max(max1 * max2 * max3, min1 * min2 * max1);
    }
};
```


---

## **1464. Maximum Product of Two Elements in an Array**


```c++
class Solution {
public:
    int maxProduct(vector<int>& nums) {

    //Ans is max of two max elements or two min elements

    int max1 = INT_MIN, max2 = INT_MIN;

    for(auto num : nums)
    {
        if(num > max1)
        {
            max2 = max1;
            max1 = num;
        }
        else if(num > max2)
            max2 = num;
    }
        return (max1 - 1) * (max2 - 1);
    }    
};
```


---

## **3731. Find Missing Elements**


```c++
class Solution {
public:
    vector<int> findMissingElements(vector<int>& nums) {

    vector <int> freq(101, 0);   

    int maxi = INT_MIN, mini = INT_MAX;

    for(auto num : nums)
    {
        maxi = max(maxi, num);
        mini = min(mini, num);
        freq[num]++;
    }

    vector <int> res;
    for(int i = 1; i <= 100; i++)
    {
        if(i < mini)
            continue;
        if(i > maxi)
            break;
        if(!freq[i])
            res.push_back(i);
    }

    sort(res.begin(), res.end());
    return res;
    }
};
```


---

🔗 **References**
- 3379. Transformed Array → https://leetcode.com/problems/transformed-array/description/?envType=daily-question&envId=2026-02-05
- 696. Count Binary Substrings → https://leetcode.com/problems/count-binary-substrings/?envType=daily-question&envId=2026-02-19

