## 2126. Destroying Asteroids


```c++
class Solution {
public:
    bool asteroidsDestroyed(int mass, vector<int>& asteroids) {

    sort(asteroids.begin(), asteroids.end());
    long long int m = mass;
    for(int i = 0; i < asteroids.size(); i++)
    {
        if(m >= asteroids[i])
            m += asteroids[i];
        else
            return false;
    }    

    return true;
    }
};
```


---

## 135. Candy

### Brute Force

The objective is to ensure that each child receives at least one candy. Additionally, any child with a higher rating than their adjacent neighbor must receive strictly more candies than that neighbor. The brute force approach simulates this behavior by performing repeated traversals from both directions, adjusting the candy distribution to maintain the constraints.


```c++
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        
        vector<int> candies(n, 1);
        
        bool updated = true;

        // Repeat until no changes are made in a full scan
        while (updated) {
            updated = false;

            // Left to right pass to check increasing rating condition
            for (int i = 1; i < n; ++i) {
                if (ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
                    candies[i] = candies[i - 1] + 1;
                    updated = true;
                }
            }

            // Right to left pass to check decreasing rating condition
            for (int i = n - 2; i >= 0; --i) {
                if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
                    candies[i] = candies[i + 1] + 1;
                    updated = true;
                }
            }
        }

        return accumulate(candies.begin(), candies.end(), 0);
    }
};

```

### Better

The idea is to distribute candies in two linear passes: one from left to right and one from right to left. In the first pass, we make sure that every child with a higher rating than the left neighbor gets more candies. In the second pass, we do the same but from right to left, ensuring the right neighbor condition is also satisfied. This guarantees that both constraints are met efficiently without unnecessary repeated updates.


```c++

```

### Optimal

Treat the ratings as a combination of increasing and decreasing slopes. At every peak (where the slope changes from increasing to decreasing), we need to give the maximum number of candies. For valleys (local minima), the child should always get 1 candy. The idea is to simulate the shape of the slope: while going up, increase candies; while going down, also increase a counter (valley depth). To avoid double-counting the peak (which is counted from both sides), we subtract the smaller of the two slope heights.


```c++

```


---

## **134. Gas Station**


```c++
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        if (accumulate(gas.begin(), gas.end(), 0) <
            accumulate(cost.begin(), cost.end(), 0)) {
            return -1;
        }

        int total = 0;
        int res = 0;
        for (int i = 0; i < gas.size(); i++) {
            total += (gas[i] - cost[i]);

            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }
};
```


---

## 846. Hand of Straights


```c++
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        unordered_map<int, int> count;
        for (int num : hand) count[num]++;

        sort(hand.begin(), hand.end());
        for (int num : hand) {
            if (count[num] > 0) {
                for (int i = num; i < num + groupSize; i++) {
                    if (count[i] == 0) return false;
                    count[i]--;
                }
            }
        }
        return true;
    }
};
```


---

## **561. Array Partition**


```c++
class Solution {
public:
    int arrayPairSum(vector<int>& nums) {

    sort(nums.begin(), nums.end());

    int sum = 0;

    for(int i = 0; i < nums.size(); i++)
    {
        if(i % 2 == 0)
            sum += nums[i];
    }    

    return sum;
    }
};
```


---

## **376. Wiggle Subsequence**

### DP (memoization)

This algorithm uses top-down dynamic programming to find the longest wiggle subsequence by exploring whether to pick or skip each element. The `dp[index][isUp]` state tracks the current position in the array (`index`) alongside the expected direction of the next valid numerical jump (`isUp`). The value of `isUp` dictates the alternating transitions: `1` searches for a strictly greater element, `0` searches for a strictly smaller element, and the starting state `2` flexibly allows the first chosen element to transition in either direction. By caching the maximum length achievable from each state, the algorithm avoids redundant calculations and solves the problem efficiently in $O(n)$ time.


```c++
class Solution {
private:
    int maxLen(vector<int>& nums, int index, int isUp, vector<vector<int>>& dp) {
        if (index == nums.size()) return 0;
        if (dp[index][isUp] != -1) return dp[index][isUp];

        int notPick = maxLen(nums, index + 1, isUp, dp);
        int pick = 0;

        if (isUp == 2) {
            int pickUp = 1 + maxLen(nums, index + 1, 1, dp);
            int pickDown = 1 + maxLen(nums, index + 1, 0, dp);
            pick = max(pickUp, pickDown);
        } else if (isUp == 1 && nums[index] > nums[index - 1]) {
            pick = 1 + maxLen(nums, index + 1, 0, dp);
        } else if (isUp == 0 && nums[index] < nums[index - 1]) {
            pick = 1 + maxLen(nums, index + 1, 1, dp);
        }

        return dp[index][isUp] = max(pick, notPick);
    }

public:
    int wiggleMaxLength(vector<int>& nums) {
        if (nums.empty()) return 0;
        vector<vector<int>> dp(nums.size(), vector<int>(3, -1));
        return maxLen(nums, 0, 2, dp);
    }
};
```

### Greedy


```c++
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        if (nums.size() < 2) return nums.size();
        
        int count = 1;
        int prevDiff = 0;
        
        for (int i = 1; i < nums.size(); i++) {
            int currDiff = nums[i] - nums[i - 1];
            
            // If direction changes (or if it's the very first moving transition)
            if ((currDiff > 0 && prevDiff <= 0) || (currDiff < 0 && prevDiff >= 0)) {
                count++;
                prevDiff = currDiff; // Update direction tracker
            }
        }
        
        return count;
    }
};
```


---

## **452. Minimum Number of Arrows to Burst Balloons**

### Approach 1


```c++
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {

    sort(points.begin(), points.end());

    int i = 0;
    int arrows = 0;
    int n = points.size();

    while(i < n)
    {
        int b = points[i][1];
        int j = i + 1;
        
        while(j < n && points[j][0] <= b)
        {
            b = min(b, points[j][1]); // Update the end point to the tightest bound
            j++;
        }

        arrows++;
        i = j;
    }
    return arrows;
    }
};
```

### Approach 2


```c++
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) return 0;

        // Sort based on the end coordinate
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int arrows = 1;
        int current_end = points[0][1];

        for (int i = 1; i < points.size(); i++) {
            // If the current balloon starts AFTER the last arrow's position,
            // we must shoot a new arrow.
            if (points[i][0] > current_end) {
                arrows++;
                current_end = points[i][1]; // Greedily place the arrow at the end of this balloon
            }
        }

        return arrows;
    }
};
```


---

## **646. Maximum Length of Pair Chain**


```c++

class Solution {
public:
    int findLongestChain(std::vector<std::vector<int>>& pairs) {
        // Sort pairs on end point
        sort(pairs.begin(), pairs.end(), 
            [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        
        int chainCount = 0;
        
        long long currentEnd = -1e18; 
        
        for (const auto& pair : pairs) {
            // If the current pair starts after the previous chain element ends
            if (pair[0] > currentEnd) {
                chainCount++;
                currentEnd = pair[1];
            }
        }
        
        return chainCount;
    }
};
```


---

## **881. Boats to Save People**


Since each boat can hold **at most two people**, pairing the heaviest person (`r`) with the lightest person (`l`) is the mathematically optimal greedy strategy.

The greedy two-pointer strategy is globally optimal because of the constraint that each boat can hold **at most two people**. By sorting the weights and examining the heaviest remaining person (`r`) alongside the lightest (`l`), we address the most limiting constraint first. If the heaviest person cannot fit into a boat with the absolute lightest person, they cannot pair with anyone else and *must* take a boat alone. If they can share, pairing `r` with `l` is mathematically optimal because it clears two people with one boat while strategically saving heavier remaining individuals for potential later pairings. This maximizes the number of dual-occupancy boats and minimizes wasted boat capacity, yielding the absolute minimum number of total boats required.


```c++
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {

    //Sort, then all numbers >= limit need 1 boat each    
    sort(people.begin(), people.end());
    int n = people.size();

    int boats = 0;
    int r = n - 1, l = 0;

    while(l <= r)
    {
        if(people[l] + people[r] <= limit)
        {
            l++;    r--;    boats++;
        }
        else
        {
            r--;    boats++;
        }
    }

    return boats;
    }
};
```


---

## **1029. Two City Scheduling**


```c++
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        // Sort based on the difference (costA - costB)
        // People who are much cheaper for City A move to the front
        sort(costs.begin(), costs.end(), [](const vector<int>& o1, const vector<int>& o2) {
            return (o1[0] - o1[1]) < (o2[0] - o2[1]);
        });
        
        int totalCost = 0;
        int n = costs.size() / 2;
        
        for (int i = 0; i < n; i++) {
            totalCost += costs[i][0];      
            totalCost += costs[i + n][1];  
        }
        
        return totalCost;
    }
};
```


---

## **1081. Smallest Subsequence of Distinct Characters**

### Stack + VisArray + LastOccurence Approach


```c++
class Solution {
public:
    string smallestSubsequence(string s) {

    //Proper intuition from scratch
    //What all we need :
        // A visited array to keep track of characters used
        // A stack to store next possible character in the sequence
        // A lastOccurence array which stores the lastIndex of every character so that we can track that while popping a character from the stack, it is available after that index or not 

    //Algo
        // Create vis array, lastOccurence array
        //Initialze a stack
        //Traverse from the left and push characters in the stack
        //Popping condition ->  
            //If stack is not empty, curr char < st.top, curr_index < lastOccur[st.top()]


    int n = s.length();
    int vis[26] = {0};
    int lastOccurence[26];
    stack <char> st;

    for(int i = 0; i < n; i++)
        lastOccurence[s[i] - 'a'] = i;

    for(int i = 0; i < n; i++)
    {
        char ch = s[i];

        if(vis[ch - 'a'])
            continue;

        vis[ch - 'a'] = 1;

        while(!st.empty() && ch < st.top() && i < lastOccurence[st.top() - 'a'])
        {    
            vis[st.top() - 'a'] = 0;
            st.pop();
        }

        st.push(ch);
    }

    string res = "";

    while(!st.empty())
    {
        res = st.top() + res;
        st.pop();
    }

    return res;
    }
};
```

### Bitmasking


```c++
class Solution {
public:
    string smallestSubsequence(string s) {

    //Proper intuition from scratch
    //What all we need :
        // A visited array to keep track of characters used
        // A stack to store next possible character in the sequence
        // A lastOccurence array which stores the lastIndex of every character so that we can track that while popping a character from the stack, it is available after that index or not 

    //Algo
        // Create vis array, lastOccurence array
        //Initialze a stack
        //Traverse from the left and push characters in the stack
        //Popping condition ->  
            //If stack is not empty, curr char < st.top, curr_index < lastOccur[st.top()]


    int n = s.length();
    int mask = 0;
    int lastOccurence[26];
    stack <char> st;

    for(int i = 0; i < n; i++)
        lastOccurence[s[i] - 'a'] = i;

    for(int i = 0; i < n; i++)
    {
        char ch = s[i];

        if((mask >> (ch - 'a')) & 1)
            continue;

        mask |= (1 << (ch - 'a'));

        while(!st.empty() && ch < st.top() && i < lastOccurence[st.top() - 'a'])
        {    
            mask ^= (1 << (st.top() - 'a'));
            st.pop();
        }

        st.push(ch);
    }

    string res = "";

    while(!st.empty())
    {
        res = st.top() + res;
        st.pop();
    }

    return res;
    }
};
```


---

## **763. Partition Labels**


```c++
Good counter testcase:

Input : "abcdeabcde"
Output : [10]
```

### Greedy Approach with explanation

**Intuition**

We need a way to look ahead, i.e. we cannot partition if any of the letters in our current partition exists on the right side.

**What I realized**

I should create a `last occurrence` array which stores the last occurrence of each character in the string.

Then I start traversing from the left of the string.

I take two pointers:

- One for traversal.
- One for keeping track of the `rightmost occurrence` of any character in my current partition.
As I am traversing, I update the second pointer with the `max` of the second pointer and the `last occurrence` of the current character.

Whenever my first pointer and the other pointer are equal, I can partition.

**WHY?**

As the second pointer keeps track of the `rightmost position` of any of the characters in our current partition.

When it becomes equal to the current pointer, it means there is no occurrence of any of our characters in the partition to the right; hence we can partition safely.

We can keep a `length tracker` variable for the partition's length.


```c++
class Solution {
public:
    vector<int> partitionLabels(string s) {

    int n = s.length();
    vector <int> lastOccur(26);

    for(int i = 0; i < s.length(); i++)
        lastOccur[s[i] - 'a'] = i;

    int len = 0;
    vector <int> res;

    int r = INT_MIN;

    for(int l = 0; l < n; l++)
    {
        r = max(r, lastOccur[s[l] - 'a']);

        len++;
        
        if(l == r)
        {
            res.push_back(len);
            len = 0;
        }
    }
    
    return res;
    }
};
```


---

