## 643. Maximum Average Subarray I


```javascript
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {

    //Find contiguous subarray of length k that has maximum average value
    //We want positive numbers we don't want negative numbers

    //Sliding Window -- Fixed Size Type

    int n = nums.size();
    double window_sum = 0;

    //Creating first fixed size window

    for(int i = 0; i < k; i++)
        window_sum += nums[i];

    double max_sum = window_sum;

    for(int j = k; j < n; j++)
    {
        window_sum = window_sum + nums[j] - nums[j - k];

        max_sum = max(max_sum, window_sum);    
    }

    return max_sum / k;

    }
};
```


---

## 1343. Number of Sub-arrays of Size K and Average Greater
than or Equal to Threshold


```javascript
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
    
    //Fixed Size k Sliding Window Technique

    double window_size = 0;

    for(int i = 0; i < k; i++)
        window_size += arr[i];

    int count = (window_size / k >= threshold) ? 1 : 0;

    int n = arr.size();

    for(int j = k; j < n; j++)
    {
        window_size = window_size + arr[j] - arr[j - k];

        if(window_size / k >= threshold)
            count++;
    }

    return count;
    }
};
```


---

## 219. Contains Duplicate II


```javascript
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
    
    //Hash Map Technique
    //We'll store each element and its latest index, and when the same element is encountered again we check if it satisfies the condition
    //If so, we return true

    unordered_map <int, int> hash;
    int n = nums.size();

    for(int i = 0; i < n; i++)
    {
        if(hash.find(nums[i]) != hash.end())        //Match Found
        {
            if(i - hash[nums[i]] <= k)
                return true;
        }

        hash[nums[i]] = i;
    }

    return false;

    }
};
```


```javascript
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
    
    //Hash Map Technique
    //We'll store each element and its latest index, and when the same element is encountered again we check if it satisfies the condition
    //If so, we return true

    unordered_map <int, int> hash;
    int n = nums.size();

    for(int i = 0; i < n; i++)
    {
        if(hash.count(nums[i]) && i - hash[nums[i]] <= k)        //Match Found
                return true;

        hash[nums[i]] = i;
    }

    return false;

    }
};
```


---

## 1876. Substrings of size three with distinct characters

***Sliding Window of Fixed Size using helper function***


```javascript
class Solution {
private:
    bool isValid(string s)
    {
        if(s[0] != s[1] && s[1] != s[2] && s[0] != s[2])
            return true;
        return false;
    }
    
public:
    int countGoodSubstrings(string s) {
    
    //Good Substring seems like sliding window of fixed size

    int count = 0;
    int n = s.size();

    for(int i = 0; i < n - 2; i++)
    {
        //Since it is fixed size, hence we only need to add the next element and subtract
        //the previous

        if( isValid( s.substr(i, 3) ) )
            count++;
    }

    return count;
    }
};
```

***More Optimized Version***


```javascript
class Solution {
public:
    int countGoodSubstrings(string s) {
        int count = 0;
        int n = s.size();
        
        // If string length is less than 3, no good substrings possible
        if (n < 3) return 0;

        for (int i = 0; i <= n - 3; i++) {
            // Direct comparison instead of creating substrings
            if (s[i] != s[i+1] && s[i] != s[i+2] && s[i+1] != s[i+2]) {
                count++;
            }
        }
        
        return count;
    }
};
```


---

## 438. Find All anagrams in a string


```javascript
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int s_len = s.length();
        int p_len = p.length();
        
        if (s_len < p_len) return {};

        vector<int> freqP(26, 0);
        vector<int> window(26, 0);
        vector<int> ans;

        // 1. Fill the frequency for string p
        for (char c : p) freqP[c - 'a']++;

        // 2. Initialize the first window
        for (int i = 0; i < p_len; i++) {
            window[s[i] - 'a']++;
        }

        // 3. Check the first window
        if (freqP == window) ans.push_back(0);

        // 4. Slide the window across s
        for (int i = p_len; i < s_len; i++) {
            // Add new character from the right
            window[s[i] - 'a']++;
            // Remove the character that is no longer in the window (from the left)
            window[s[i - p_len] - 'a']--;

            // If frequencies match, we found an anagram
            if (freqP == window) {
                ans.push_back(i - p_len + 1);
            }
        }

        return ans;
    }
};
```


---

## 567. Permutation in String


```javascript
class Solution {
public:
    bool checkInclusion(string s1, string s2) {

    //Basically permutation also seems like anagram , so basically we have to check for
    //anagram using sliding window of size s1.length()

    int s1_len = s1.length();
    int s2_len = s2.length();

    if(s1_len > s2_len)
        return false;
        
    vector <int> freq(26, 0);
    vector <int> window(26, 0);

    //Creating frequency array for s1 window
    for(char c : s1)
        freq[c - 'a']++;

    //Creating initial window
    for(int i = 0; i < s1.length(); i++)
        window[s2[i] - 'a']++;

    if(freq == window)
        return true;

    for(int j = s1.length(); j < s2.length(); j++)
    {
        window[s2[j] - 'a']++;
        window[s2[j - s1_len] - 'a']--;

        if(freq == window)
            return true;
    }

    return false;


    }
};
```


---

## 209. Minimum Size Subarray Sum


```javascript
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {

    //Variable size sliding window, classic expansion and shrinkage question

    int l = 0, n = nums.size();
    int sum = 0, min_length = INT_MAX;

    for (int r = 0; r < n; r++)   
    {
        sum += nums[r];

        while(sum >= target && l <= r)      //Here l <= r is not needed though 
        {
            min_length = min(min_length, r - l + 1);
            sum -= nums[l];
            l++;        //shrinkage
        }

    }

    if(min_length == INT_MAX)
        return 0;

    return min_length;

    }
};
```


---

## **1493. Longest Subarray of 1's After Deleting One Element**


```javascript
class Solution {
public:
    int longestSubarray(vector<int>& nums) {

    //Seems like variable size sliding window approach 

    int l = 0, n = nums.size();
    int zero_count = 0;
    int max_len = INT_MIN;
    
    for(int r = 0; r < n; r++)
    {
        if(nums[r] == 0)
            zero_count++;

        // If we have more than one zero, shrink from the left
        while(zero_count > 1)
        {            
            if(nums[l] == 0)
                zero_count--;

            l++;
        }

        // The window [l, r] contains at most one zero.
        // The number of 1s we'd have after deleting that zero (or any element) 
        // is exactly the window size minus 1.
        max_len = max(max_len, r - l);
            
    }    

    if(max_len == INT_MIN)
        return 0;
    return max_len;
    }
};
```


---

## 904. Fruits into Baskets


```javascript
class Solution {
public:
    int totalFruit(vector<int>& fruits) {

    //Variable Size Sliding Window
    unordered_map <int, int> hash;
    int l = 0, n = fruits.size();
    int max_f = 0;

    for(int r = 0; r < n; r++)
    {
        //increase frequency of current character in hash map
        hash[fruits[r]]++;

        while(hash.size() > 2)
        {
            //decrease freq of fruit
            hash[fruits[l]]--;

            if(hash[fruits[l]] == 0)
                hash.erase(fruits[l]);

            l++;
        }

        max_f = max(max_f, r - l + 1);
    }

    return max_f;
    }
};
```


---

## 1248. Count number of Nice Subarrays


```javascript
class Solution {
private:
    int atMostk(vector <int> &nums, int k)
    {
        
    //Sliding window approach
    //exactly k zeros = atMost(k) - atMost(k - 1)

    int l = 0, n = nums.size(), odd = 0;

    int ans = 0;

    for(int r = 0; r < n; r++)
    {
        if(nums[r] % 2 != 0)
            odd++;

        //Shrink until window becomes valid
        while(odd > k)
        {
            if(nums[l] % 2 != 0)
                odd--;

            l++;
        }

        ans += r - l + 1;
    }    

    return ans;
    }

public:
    int numberOfSubarrays(vector<int>& nums, int k) {

        return atMostk(nums, k) - atMostk(nums, k - 1);
    }
};
```


---

## 1358. Number of Substrings containing all three characters


```javascript
class Solution {
public:
    int numberOfSubstrings(string s) {
        int l = 0, n = s.length();
        int count[3] = {0, 0, 0}; // Use an array for faster access than a map
        int ans = 0;

        for (int r = 0; r < n; r++) {
            count[s[r] - 'a']++;

            // While the window contains at least one of each: 'a', 'b', 'c'
            
            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                // If s[l...r] is valid, then s[l...n-1], s[l...n-2]... 
                // are all valid. There are (n - r) such substrings.
                ans += (n - r);
                
                // Shrink window from the left to find the next valid start
                count[s[l] - 'a']--;
                l++;
            }
        }
        return ans;
    }
};
```


---

## 1658. **Minimum Operations to Reduce X to Zero**


```javascript
class Solution {

public:
    int minOperations(vector<int>& nums, int x) {

        // The "Inside-Out" PerspectiveInstead of focusing on the elements you
        // remove, focus on the elements that remain.If you remove a prefix
        // (left side) and a suffix (right side) that sum up to $x$, the
        // elements left in the middle must form a contiguous subarray.Let $S$
        // be the total sum of all elements in the array.If the elements you
        // remove sum to $x$, then the elements you leave behind must sum to:
        // Target = S - x

        // Reverse Sliding Window Approach

        // Find longest subarray with sum as total - x, if not found return -1;
        // This would require

        int l = 0, n = nums.size();
        int sum = 0, window = -1;

        int total = 0;

        for(int j = 0; j < n; j++)
            total += nums[j];

        int k = total - x;
        if(k < 0)
            return -1;
        if(k == 0)
            return n;

        for (int r = 0; r < n; r++) {
            sum += nums[r];

            while (l <= r && sum > k) {
                sum -= nums[l];
                l++;
            }

            if(sum == k)
                window = max(window, r - l + 1);
        }

        if(window == -1)
            return -1;
        return n - window;


    }
};
```


---

## 76. Minimum Window Substring


```javascript
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";

        vector<int> targetCount(128, 0);
        for (char c : t) targetCount[c]++;

        int left = 0, right = 0;
        int minLen = INT_MAX;
        int startIdx = 0;
        int required = t.length(); // Total characters needed from t

        while (right < s.length()) {
            // If the current character is needed, decrease the requirement
            if (targetCount[s[right]] > 0) {
                required--;
            }
            // Decrease the frequency in our "needs" map
            targetCount[s[right]]--;
            right++;

            // While the window is valid, try to shrink it
            while (required == 0) {
                if (right - left < minLen) {
                    minLen = right - left;
                    startIdx = left;
                }

                // Move left pointer to shrink
                targetCount[s[left]]++;
                // If the character we just removed was essential, increase requirement
                if (targetCount[s[left]] > 0) {
                    required++;
                }
                left++;
            }
        }

        return minLen == INT_MAX ? "" : s.substr(startIdx, minLen);
    }
};
```


---

## **992. Subarrays with K Different Integers**

### Brute Force (TLE)


```c++
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size();

        int count = 0;

        for (int i = 0; i < n; i++) {

            // Map to keep track of frequency of elements
            unordered_map<int, int> freq;

            for (int j = i; j < n; j++) {

                freq[nums[j]]++;

                if (freq.size() == k)
                    count++;

                if (freq.size() > k)
                    break;
            }
        }

        return count;
    }
};
```

### Optimal Approach

`countExactlyK = countAtMostK(K) - countAtMostK(K - 1)`

The reason this is efficient is because `countAtMostK` can be computed using the sliding window approach in linear time. We maintain a dynamic window [left, right] such that the number of distinct elements inside it is at most K. As we move the right pointer and extend the window, we shrink the left pointer whenever the constraint is violated, and count all valid subarrays ending at the current right.


```c++
class Solution {
public:
    // Helper function to count subarrays with at most K distinct integers
    int atMostK(vector<int>& nums, int K) {
        unordered_map<int, int> freq;
        int left = 0, count = 0;

        // Traverse the array with right pointer
        for (int right = 0; right < nums.size(); right++) {
            // If it's a new unique element, decrease K
            if (freq[nums[right]] == 0) {
                K--;
            }

            // Increment frequency of current element
            freq[nums[right]]++;

            // Shrink the window if distinct count > K
            while (K < 0) {
                freq[nums[left]]--;
                if (freq[nums[left]] == 0) {
                    K++;
                }
                left++;
            }

            // Count all subarrays ending at current right
            count += (right - left + 1);
        }

        return count;
    }

    // Main function to return number of subarrays with exactly K distinct integers
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }
};
```


---

## **239. Sliding Window Maximum**

When a new element enters the window:


```plain text
[1 3 -1]      max = 3

Add 5

[3 -1 5]
```

Since `5 > -1` and `5 > 3`, neither `-1` nor `3` can ever become the maximum again while `5` remains in the window.

So we can safely remove all smaller elements from consideration.

This leads to a **Monotonic Decreasing Queue**.

The front always contains the maximum of the current window.

### Revision Note

- Use a **monotonic decreasing deque** storing indices.
- Front = maximum element of current window.
- Remove expired indices from the front.
- Remove smaller elements from the back before insertion.
- Each element is pushed and popped at most once.
- **Time: O(n), Space: O(k).**
*The real concern is only when the outgoing element was the maximum. To optimize, we use a double-ended queue (deque) to maintain elements in a way that always keeps track of the current maximum efficiently. When a new element enters, we push it to the back of the deque, but before that, we remove all smaller elements from the back since they're not useful anymore. Also, if the element at the front is outside the window's range, we remove it. This ensures that the element at the front of the deque always represents the maximum of the current window.*


```c++
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {

        deque<int> dq;
        vector<int> ans;

        for(int i = 0; i < nums.size(); i++) {

            // Remove indices outside window
            while(!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }

            // Maintain decreasing order
            while(!dq.empty() &&
                  nums[dq.back()] < nums[i]) {
                dq.pop_back();
            }

            dq.push_back(i);

            // Window formed
            if(i >= k - 1) {
                ans.push_back(nums[dq.front()]);
            }
        }

        return ans;
    }
};
```


---

## **1291. Sequential Digits**

### Recursive Solution


```c++
class Solution {
    vector<int> res;

private:
    void generate(long long num, int nextDigit, int low, int high) {
        if (num >= low && num <= high) {
            res.push_back(num);
        }
        
        if (num > high || nextDigit > 9) {
            return;
        }
        
        generate(num * 10 + nextDigit, nextDigit + 1, low, high);
    }

public:
    vector<int> sequentialDigits(int low, int high) {
        for (int i = 1; i <= 9; i++) {
            generate(i, i + 1, low, high);
        }
        
        sort(res.begin(), res.end());
        return res;
    }
};
```

### Sliding Window


```c++
class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        string d = "123456789";
        vector<int> res;
        
        // 'len' represents the window size (number of digits)
        for (int len = 2; len <= 9; len++) {
            // 'start' is the starting index of our sliding window
            for (int start = 0; start <= 9 - len; start++) {
                string sub = d.substr(start, len);
                int num = stoi(sub);
                
                if (num >= low && num <= high) {
                    res.push_back(num);
                }
            }
        }
        
        return res;
    }
};
```


---

## **187. Repeated DNA Sequences**


```c++
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {

    //Brute Force, use a sliding window with a hash map to keep track of the frequency of eac
    int len = s.length();    
    if(len < 10)
        return {};

    vector <string> res;

    unordered_map <string, int> hash;

    for(int i = 0; i <= len - 10; i++)
    {
        string sub = s.substr(i, 10);

        hash[sub]++;
    }

    for(auto [key, value] : hash)
    {
        if(value >= 2)
            res.push_back(key);
    }

    return res;
    }
};
```


---

## **1456. Maximum Number of Vowels in a Substring of Given Length**

### Brute Force


```c++
class Solution {
public:
    int maxVowels(string s, int k) {

    int vowelCount = 0;

    for(int i = 0; i < k; i++)
    {
        if(s[i] == 'a' || s[i] == 'e' || s[i] == 'o' || s[i] == 'u' || s[i] == 'i')
            vowelCount++;
    }

    int res = INT_MIN;
    res = max(res, vowelCount);

    for(int l = k; l <= s.length(); l++)
    {
        if(s[l - k] == 'a' || s[l - k] == 'e' || s[l - k] == 'o' 
           || s[l - k] == 'u' || s[l - k] == 'i')
            vowelCount--;

        if(s[l] == 'a' || s[l] == 'e' || s[l] == 'o' || s[l] == 'u' || s[l] == 'i')
            vowelCount++;

        res = max(res, vowelCount);
    } 

    return res;
    }
};
```


---

## **713. Subarray Product Less Than K**


```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {

    //Sliding Window Approach + Shrinking 

    if(k <= 1)  return 0;

    int n = nums.size();
    long long prod = 1;
    int l = 0;

    int res = 0;

    for(int r = 0; r < n; r++)   
    {
        prod *= nums[r];

        while(prod >= k)
        {
            //Shrink
            prod = prod / nums[l];
            l++;
        }

        res += r - l + 1;
    }

    return res;
    }
};
```


---

## 2958. Length of Longest Subarray With at Most K Frequency


```mermaid
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();
        int l = 0;
        unordered_map <int, int> freq;
        int res = INT_MIN;
        
        for(int r = 0; r < n; r++)  
        {
            freq[nums[r]]++;
            
            while (l <  r && freq[nums[r]] > k)
            {
                freq[nums[l]]--;
                l++;
            }
            
            res = max(res, r - l + 1);
        }
        
        return res;
 }
};
```


---

🔗 **References**
- 2958. Length of Longest Subarray With at Most K Frequency → https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/

