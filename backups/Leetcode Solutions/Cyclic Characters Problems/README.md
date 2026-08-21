## **1540. Can Convert String in K Moves**


```c++
class Solution {
public:
    bool canConvertString(string s, string t, int k) {

    //In ith move we can shift any character i times or do nothing, also that index cannot be rechoosen again, so basically we have to find all distinct characters and find the difference between them also this difference should not repeat, if its repeats or any difference is greater than k, then this conversion is not possible, else it is possible anyhow

    // note that if multiple characters require the same shift d (where 1 < d < 26), each subsequent occurrence cannot use move d again. Instead, it must use the next cycle: d + 26, d + 2  * 26, ....

    if (s.length() != t.length()) return false;

        // Tracks how many times each shift (1 to 25) has been used
        vector<int> count(26, 0);

        for (int i = 0; i < s.length(); ++i) {
            int diff = (t[i] - s[i] + 26) % 26;
            
            if (diff == 0) continue;

            // Total shifts needed for the count[diff]-th occurrence of 'diff'
            long long total_shifts = (long long)diff + 26LL * count[diff];
            
            if (total_shifts > k) {
                return false;
            }

            count[diff]++;
        }

        return true;
    }
};
```

