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


---

## **435. Non-overlapping Intervals**

**Note:** This is a classic **Interval Scheduling Greedy** problem. The key observation is that minimizing removals is equivalent to maximizing the number of non-overlapping intervals kept. The optimal greedy choice is to always keep the interval that **ends earliest**, because it leaves the maximum room for future intervals. Hence, sort intervals by end time and greedily keep an interval if its start is at least the end of the last kept interval; the answer is `n - kept`. An equivalent start-time sorted solution removes one interval whenever an overlap occurs and keeps the interval with the **smaller end** (`end = min(end, currentEnd)`), since a smaller end creates fewer future conflicts. My wrong approach was sorting by start time and counting intervals with the same starting point. This is incorrect because overlap is not determined by equal starts (e.g., `[1,5]` and `[2,4]` overlap despite different starts), and the problem's core decision is not detecting equal starts but deciding **which interval to keep during an overlap**. The greedy insight I missed was: whenever two intervals overlap, keep the one with the smaller end because it preserves the most opportunities for future non-overlapping intervals. Time Complexity: `O(n log n)` due to sorting. (leetcode.doocs.org)

### Pattern

**Interval Scheduling / Activity Selection Greedy**

### Greedy Choice

Reason:

- Leaves maximum room for future intervals.
- Maximizes the number of intervals we can keep.
- Minimum removals = Total intervals − Maximum intervals kept.
### End-Time Solution

1. Sort intervals by ending time.
1. Keep the first interval.
1. For every next interval:
- If `start >= lastEnd`, keep it.
- Else skip it.
1. Answer = `n - kept`.
Complexity:


```plain text
Time  : O(n log n)
Space : O(1) (excluding sorting)
```

### What Was Wrong In My Attempt?

My approach:


```plain text
sortby starttime
countintervals havingsame start
```

Problems:

1. Overlap is **not determined by equal starts**.

```plain text
[1,5]
[2,4]
```

overlap exists even though starts differ.

1. Two intervals with the same start do not necessarily determine the answer.

```plain text
[1,100]
[1,2]
[2,3]
```

The optimal choice is to keep `[1,2]`, not `[1,100]`.

1. The solution never makes the crucial greedy decision:
The key observation is:


```plain text
Keep the interval with the smaller end.
```

because it creates fewer future conflicts.

### Recognition Signal

Whenever you see:


```plain text
Intervals
Non-overlapping
Maximum activities
Minimum removals
Maximum meetings
```

Immediately think:


```plain text
Sort by END time
Greedy interval scheduling
```

### Sorting by end + Greedy Approach 

The greedy choice is:

Why?

Because an interval that ends earlier leaves the maximum space available for future intervals.

Example:


```plain text
[1,100]
[2,3]
[3,4]
```

If you keep `[1,100]`, you lose both others.

If you keep `[2,3]`, you can also keep `[3,4]`.

So the earliest ending interval is always the safest choice.


```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {

        sort(intervals.begin(), intervals.end(),
             [](const vector<int>& a, const vector<int>& b) {
                 return a[1] < b[1];
             });

        int keep = 1;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= lastEnd) {
                keep++;
                lastEnd = intervals[i][1];
            }
        }

        return intervals.size() - keep;
    }
};
```

### Alternative Greedy (Sort by Start Time)

When overlap occurs:


```plain text
[1,5]
[2,3]
```

You remove the interval with the larger end (`[1,5]`) because it blocks more future intervals.


```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {

        sort(intervals.begin(), intervals.end());

        int removals = 0;
        int end = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {

            if (intervals[i][0] < end) {
                removals++;

                // keep interval with smaller end
                end = min(end, intervals[i][1]);
            }
            else {
                end = intervals[i][1];
            }
        }

        return removals;
    }
};
```


---

## Merge Intervals(Standard Question)


```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
        // Sort according to starting point
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> ans;

        for (auto interval : intervals) {

            // No overlap
            if (ans.empty() || ans.back()[1] < interval[0]) {
                ans.push_back(interval);
            }
            
            // Overlap
            else {
                ans.back()[1] = max(ans.back()[1], interval[1]);
            }
        }

        return ans;
    }
};
```


---

## **3975. Filter Occupied Intervals**


```c++
class Solution {
public:
    vector<vector<int>> filterOccupiedIntervals(vector<vector<int>>& occupiedIntervals, int freeStart, int freeEnd) {

    vector <vector<int>> res;
    //Lets use the standard merge intervals trick
    sort(occupiedIntervals.begin(), occupiedIntervals.end());
    
    for(auto interval : occupiedIntervals)
    {   
        if(res.empty() || interval[0] > res.back()[1] + 1)
            res.push_back(interval);

        else
            res.back()[1] = max(res.back()[1], interval[1]);
    }   

    vector <vector<int>> ans;
    for(auto interval : res)
    {
        if(interval[1] < freeStart || interval[0] > freeEnd)
            ans.push_back(interval);    
        
        else
        {
            if(freeStart > interval[0])
                ans.push_back({interval[0], freeStart - 1});
            
            if(interval[1] > freeEnd)
                ans.push_back({freeEnd + 1, interval[1]});
         }
    }
    return ans;
    }
};
```


---

🔗 **References**
- leetcode.doocs.org → https://leetcode.doocs.org/en/lc/435/?utm_source=chatgpt.com

