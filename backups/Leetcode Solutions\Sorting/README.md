# 88. Merge Sorted Array


**BRUTE FORCE**


```javascript
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {

    vector <int> sorted(m + n);

    int i = 0, j = 0, start = 0;

    while(i < m && j < n)
    {
        if(nums1[i] < nums2[j])
        {
            sorted[start] = nums1[i];
            i++;
        }
        else
        {
            sorted[start] = nums2[j];
            j++;
        }
        start++;
    }   

    while(i < m)
    {
        sorted[start] = nums1[i];
        start++;
        i++; 
    }

    
    while(j < n)
    {
        sorted[start] = nums2[j];
        start++;
        j++; 
    }

    for(int k = 0; k < m + n; k++)
        nums1[k] = sorted[k];
    
    }
};
```

**OPTIMAL SOLUTION**


```javascript
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1;      // Pointer for the end of valid elements in nums1
        int j = n - 1;      // Pointer for the end of nums2
        int k = m + n - 1;  // Pointer for the last position in nums1

        // Merge in reverse order
        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }

        // If elements remain in nums2, copy them
        // (If elements remain in nums1, they are already in place)
        while (j >= 0) {
            nums1[k--] = nums2[j--];
        }
    }
};
```


---

## 49. Group Anagrams


```javascript
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {

    // One approach is to sort all individual strings and store them in a hash map
    // O(N K log K), where N is the number of strings and K is the maximum length of a 
    // string (because of sorting).      

    unordered_map <string, vector <string>> hash;
    int n = strs.size();

    for(int i = 0; i < n; i++)
    {
        string word = strs[i];
        sort(strs[i].begin(), strs[i].end());

        hash[strs[i]].push_back(word);
    }

    vector < vector<string> > ans;

    for (auto& [key, group] : hash) {
        ans.push_back(group);
    }

    return ans;

    }
};

```


```javascript
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {

    // Another approach is to create a frequency array for each string and store it into a hash map as a key as insert the words as a value

    map <vector <int>, vector<string>> hash;

    int n = strs.size();
    for(int i = 0; i < n; i++)
    {
        vector <int> freq(26, 0);

        for(int j = 0; j < strs[i].length(); j++)
        {
            freq[strs[i][j] - 'a']++;
        }

        hash[freq].push_back(strs[i]);
    }

    vector <vector<string>> ans;
    for(auto & pair : hash)
        ans.push_back(pair.second);

    return ans;
    }
};
```


```javascript
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {

    // Another approach is to create a frequency array for each string and store it into a hash map as a key as insert the words as a value

    unordered_map <string, vector<string>> hash;

    int n = strs.size();
    for(int i = 0; i < n; i++)
    {
        vector <int> freq(26, 0);

        for(int j = 0; j < strs[i].length(); j++)
        {
            freq[strs[i][j] - 'a']++;
        }

        string key = "";
        for (int count : freq)
            key += to_string(count) + "#"; // Creating a unique string key like "1#0#2#..."
        
        hash[key].push_back(strs[i]);

    }

    vector <vector<string>> ans;
    for(auto & pair : hash)
        ans.push_back(pair.second);

    return ans;
    }
};
```


---

## **389. Find the Difference**


```c++
class Solution {
public:
    char findTheDifference(string s, string t) {

    sort(s.begin(), s.end());
    sort(t.begin(), t.end());

    for(int i = 0; i < t.length(); i++)
    {
        if(i == t.length() - 1 || t[i] != s[i])
            return t[i];
    }    

    return '.';
    }
};
```


---

## **3016. Minimum Number of Pushes to Type Word II**


```c++
class Solution {
public:
    int minimumPushes(string word) {
    vector <int> arr(26, 0);

    for(char ch : word)
        arr[ch - 'a']++;

    sort(arr.begin(), arr.end());

    int res = 0;
    int keys = 8, mul = 1;

    for(int i = 25; i >= 0; i--)
    {
        int freq = arr[i];

        if(freq != 0)
        {
            res += (freq * mul);
            keys--;
        }

        if(keys == 0)
        {
            keys = 8;
            mul++;
        }
    }

    return res;
    }
};
```

