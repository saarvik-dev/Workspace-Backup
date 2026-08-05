## **1288. Remove Covered Intervals**

### Brute Force - O(N^2)


```c++
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {

    //Since the constraints are low, we can do brute force first
    int covered = 0;
    int n = intervals.size();

    for(int i = 0; i < n; i++)
    {
        int a = intervals[i][0];
        int b = intervals[i][1];

        for(int j = 0; j < n; j++)
        {
            if(j != i)
            {
                int c = intervals[j][0];
                int d = intervals[j][1];

                if(c <= a && b <= d)
                {    
                    covered++;
                    break;
                }
            }
        }
    }    

    return n - covered;
    }
};
```

### Optimal - O(N\log N)


```c++
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        // Sort by start ascending; if starts are equal, sort by end descending
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            if (a[0] == b[0]) return a[1] > b[1];
            return a[0] < b[0];
        });
        
        int remaining = 0;
        int max_end = 0;
        
        for (const auto& interval : intervals) {
            // If the current interval's end stretches past our max_end, 
            // it cannot be fully covered by previous intervals.
            if (interval[1] > max_end) {
                remaining++;
                max_end = interval[1]; // Update the boundary
            }
        }
        
        return remaining;
    }
};
```

