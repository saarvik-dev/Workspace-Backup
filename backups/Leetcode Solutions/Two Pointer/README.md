# 28. Find the index of the first occurence of the string


**BRUTE FORCE**


```javascript
class Solution {
public:
    int strStr(string haystack, string needle) {

    int len1 = haystack.length(), len2 = needle.length();

    //Let's try a sliding window approach

    int l = 0, r = 0, p2 = 0;

    while(l != len1)
    {
        if(haystack[l] == needle[0])
        {
            r = l;
            p2 = 0;
            while(needle[p2] == haystack[r] && p2 != len2)
            {
                r++;
                p2++;
            }
            if(p2 == len2)
                return l;
            else
                p2 = 0;            
        }    
        l++;    
    }

    return -1;

    }
};
```

**OPTIMAL (KMP ALGORITHM)**


```javascript
class Solution {
public:

    // Function to build LPS (Longest Prefix which is also Suffix) array
    vector<int> buildLPS(string &pattern)
    {
        int m = pattern.size();

        vector<int> lps(m, 0);

        int len = 0;   // length of previous longest prefix suffix
        int i = 1;

        while (i < m)
        {
            if (pattern[i] == pattern[len])
            {
                len++;
                lps[i] = len;
                i++;
            }
            else
            {
                if (len != 0)
                {
                    // fallback using previous LPS
                    len = lps[len - 1];
                }
                else
                {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }


    int strStr(string haystack, string needle)
    {
        if (needle.empty()) return 0;

        int n = haystack.size();
        int m = needle.size();

        vector<int> lps = buildLPS(needle);

        int i = 0;  // pointer for haystack
        int j = 0;  // pointer for needle

        while (i < n)
        {
            if (haystack[i] == needle[j])
            {
                i++;
                j++;
            }

            if (j == m)
            {
                // full match found
                return i - j;
            }
            else if (i < n && haystack[i] != needle[j])
            {
                if (j != 0)
                {
                    j = lps[j - 1];   // jump using LPS
                }
                else
                {
                    i++;
                }
            }
        }

        return -1;
    }
};
```


---

## **16. 3Sum Closest**


```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        
        int closestSum = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < n - 2; i++) {
            //skip identical starting elements
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                // If exact target sum found, return immediately
                if (sum == target) return sum;

                // Update closestSum if the current sum is closer to target
                if (abs(sum - target) < abs(closestSum - target)) {
                    closestSum = sum;
                }

                // Two-pointer movement based on comparison with target
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return closestSum;
    }
};
```


---

## **443. String Compression**


```c++
class Solution {
public:
    int compress(vector<char>& chars) {

    //Two pointer approach
    //First pointer stores the index where the char and its character needs to be stored

    int p1 = 0, p2 = 0;
    int n = chars.size();

    while(p2 < n) 
    {
        int count = 1;
        char ch = chars[p2];
        while (p2 + 1 < n && chars[p2 + 1] == ch)   
        {
            count++;
            p2++;
        }

        p2++;

        if(count == 1)
        {
            chars[p1] = ch;
            p1++;
        }
        else
        {
            chars[p1] = ch;
            p1++;
            string cnt = to_string(count);
            for(char ch : cnt)
            {   
                chars[p1] = ch;
                p1++;
            }
        }
    }

    return p1;
    }
};
```


---

## **3069. Distribute Elements Into Two Arrays I**

### Brute Force


```c++

class Solution {
public:
    vector<int> resultArray(vector<int>& nums) {
        // Initialize two separate arrays
        vector<int> arr1, arr2;
        
        // Rule 1: Put the first element into arr1
        arr1.push_back(nums[0]);
        // Rule 2: Put the second element into arr2
        arr2.push_back(nums[1]);
        
        // Process subsequent elements starting from the 3rd element (index 2)
        for (int i = 2; i < nums.size(); i++) {
            // Rule 3: If the last element of arr1 is greater than the last element of arr2
            if (arr1.back() > arr2.back()) {
                arr1.push_back(nums[i]);
            } else {
                arr2.push_back(nums[i]);
            }
        }
        
        // Concatenate arr2 onto the end of arr1
        arr1.insert(arr1.end(), arr2.begin(), arr2.end());
        
        return arr1;
    }
};
```

### Two Pointer Optimal


```c++
class Solution {
public:
    vector<int> resultArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> arr(n);
        arr[0] = nums[0];
        arr[n - 1] = nums[1];
        int idx = 0, revIdx = n - 1;
        for (int i = 2; i < n; i++) {
            if (arr[idx] > arr[revIdx]) {
                arr[++idx] = nums[i];
            } else {
                arr[--revIdx] = nums[i];
            }
        }
        reverse(arr.begin() + revIdx, arr.end());
        return arr;
    }
};
```


---

