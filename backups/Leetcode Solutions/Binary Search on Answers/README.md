## 875. Koko Eating Bananas


```javascript
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        //Optimal Solution using Binary Search

        int max = *max_element(piles.begin(), piles.end());

        int low = 1, high = max;
        long long i, t;
        int speed = high;

        while(low <= high)
        {
            t = 0;
            int mid = low + (high - low)/2;

            for(i = 0; i < piles.size(); i++)
                t += (piles[i] + mid - 1LL)/mid;
            
            if(t > h)        //Means higher speed is required
                low = mid + 1;

            else            //Means speed can be mid or lesser

            {
                speed = mid;
                high = mid - 1;
            }                
        }

        return speed;
    }
};
```


---

## 1482. Minimum Number of Days to Make m Bouquets


```javascript
class Solution {
public:
    // Helper function to check if it's possible to make m bouquets on or before a given day
    bool possible(vector<int>& bloomDay, int day, int m, int k) {
        int n = bloomDay.size();         // Total number of flowers
        int cnt = 0;                // Counter for consecutive bloomed flowers
        int bouquets = 0;           // Count of bouquets made

        for (int i = 0; i < n; i++) {
            if (bloomDay[i] <= day) {
                // Flower bloomed, increment consecutive count
                cnt++;
                if (cnt == k) {
                    // We have k consecutive bloomed flowers — make 1 bouquet
                    bouquets++;
                    cnt = 0; // reset for next bouquet
                }
            } else {
                // Flower not bloomed, reset consecutive count
                cnt = 0;
            }
        }

        // Check if at least m bouquets can be made
        return bouquets >= m;
    }

    // Main function to find the minimum day to make m bouquets
    int minDays(vector<int>& bloomDay, int m, int k) {
        long long total = 1LL * k * m; // Total flowers required

        // If total required flowers > available flowers, it's impossible
        if (total > bloomDay.size()) return -1;

        // Find minimum and maximum bloom days from array
        int mini = *min_element(bloomDay.begin(), bloomDay.end());
        int maxi = *max_element(bloomDay.begin(), bloomDay.end());

        // Apply binary search on number of days
        int low = mini, high = maxi;
        int result = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (possible(bloomDay, mid, m, k)) {
                // If it's possible to make bouquets on this day, try to find an earlier day
                result = mid;
                high = mid - 1;
            } else {
                // Otherwise, try with a later day
                low = mid + 1;
            }
        }

        return result;
        
    }
};
```


```javascript
class Solution {
public:
    // Helper function to check if it's possible to make m bouquets on or before a given day
    bool possible(vector<int>& bloomDay, int day, int m, int k) {
        int n = bloomDay.size();         // Total number of flowers
        int cnt = 0;                // Counter for consecutive bloomed flowers
        int bouquets = 0;           // Count of bouquets made

        for (int i = 0; i < n; i++) {
            if (bloomDay[i] <= day) {
                // Flower bloomed, increment consecutive count
                cnt++;
                if (cnt == k) {
                    // We have k consecutive bloomed flowers — make 1 bouquet
                    m--;
                    cnt = 0; // reset for next bouquet
                    if(m == 0)
                        break;
                }
            } else {
                // Flower not bloomed, reset consecutive count
                cnt = 0;
            }
        }

        // Check if at least m bouquets can be made
        return m == 0;
    }

    // Main function to find the minimum day to make m bouquets
    int minDays(vector<int>& bloomDay, int m, int k) {
        long long total = 1LL * k * m; // Total flowers required

        // If total required flowers > available flowers, it's impossible
        if (total > bloomDay.size()) return -1;

        // Find minimum and maximum bloom days from array
        int mini = *min_element(bloomDay.begin(), bloomDay.end());
        int maxi = *max_element(bloomDay.begin(), bloomDay.end());

        // Apply binary search on number of days
        int low = mini, high = maxi;
        int result = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (possible(bloomDay, mid, m, k)) {
                // If it's possible to make bouquets on this day, try to find an earlier day
                result = mid;
                high = mid - 1;
            } else {
                // Otherwise, try with a later day
                low = mid + 1;
            }
        }

        return result;
        
    }
};
```


---

## 1283. Find the Smallest Divisor Given a Threshold


```javascript
class Solution {
public:
    int smallestDivisor(vector<int>& nums, int threshold) {


    //In each while loop we'll calculate the threshold using the current divisor, and then 
    //move towards higher or lower divisor according to the result

    int low = 1, high = *max_element(nums.begin(), nums.end());
    int n = nums.size();
    

    while (low < high)
    {
        int mid = low + (high - low)/2;

        long long sum = 0;
        //Calculating ceil sum
        for(int i = 0; i < n; i++)
                sum += (nums[i] + mid - 1)/ mid;

        if(sum <= threshold)
            high = mid;

        else
            low = mid + 1;

    }

    return low;

    }
};
```


---

## 1011. Capacity To Ship Packages Within D Days


```javascript
class Solution {
private:
    int daysRequired(vector <int>  &nums, int max_capacity) {

    int days = 1;
    int currentSum = 0;

    for (int x : nums) {

        if (currentSum + x <= max_capacity) {
            currentSum += x;
        } else {
            // Start a new partition with the current element
            days++;
            currentSum = x;
        }
    }

    return days;
}
    
public:
    int shipWithinDays(vector<int>& weights, int days) {

    //Clearly max capacity can be sum of loads, when day = 1 and minimum capacity
    //can be weight of max load whem number of days = sum of loads 

    //Intiution : we will run a binary search on the range of weights possible for this 
    //ship. now we calculate how much time is required to ship all packages 
    //If more time is required than given number of days , then we'll increase the capacity, 
    //else we'll store this cpacity and check whether capacity can be decreased further

    int sum = 0;
    for(auto i : weights)
        sum += i;

    int min = *max_element(weights.begin(), weights.end());

    int low = min, high = sum;
    int result = high;

    while(low <= high)
    {
        int mid = low + (high - low)/2;

        //Calculate days required using current capacity
        int time_req = daysRequired(weights, mid);

        if(time_req > days)
            low = mid + 1;

        else
        {
            result = mid;
            high = mid - 1;
        }
    }

    return result;

    }
};
```


---

## 69. Sqrt(x)


```javascript
class Solution {
public:
    int mySqrt(int x) {

    if(x == 0 || x == 1)
        return x;
    int low = 1, high = x;
    int result = 0;
    while(low <= high)
    {
        int mid = low + (high - low)/2;

        if(mid  <= x / mid)          //We can also use long long mid and mid*mid <= x
        {
            result = mid;
            low = mid + 1;
        }
        else 
            high = mid  - 1;

    }    

    return result;
    }
};
```


---

## **4. Median of Two Sorted Arrays**

### Brute Force

`O(n + m)` → Due to merging of the sorted arrays (no binary search)


```c++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> ans;
        int left = 0, right = 0;
        int len1 = nums1.size(), len2 = nums2.size();

        while(left < len1 && right < len2) 
        {
            if(nums1[left] < nums2[right]) 
            {
                ans.push_back(nums1[left++]);
            } 
            else 
            {
                ans.push_back(nums2[right++]);
            }
        }

        while(left < len1) ans.push_back(nums1[left++]);
        while(right < len2) ans.push_back(nums2[right++]);
        
        int len = ans.size();

        if(len % 2 == 0) {
            // Indexing fix: Use (len/2 - 1) and (len/2)
            // Also cast to double to prevent integer division truncation
            return (ans[len / 2 - 1] + ans[len / 2]) / 2.0;
        }

        return ans[len / 2];
    }
};
```

### Optimal 

### Key Observation

So instead of finding the median directly, we find a **partition** of the two arrays such that:

- Left half contains exactly half of the elements.
- Every element in the left half ≤ every element in the right half.
Then the median can be computed immediately.


---

## Intuition

Suppose:


```c++
A = [1,3,8,9,15]
B = [7,11,18,19,21,25]
```

Total elements = 11

Median position = 6th element.

We partition:


```plain text
A : [1 3 8] | [9 15]
B : [7 11 18] | [19 21 25]
```

Left side:


```plain text
1 3 8 7 11 18
```

Right side:


```plain text
9 15 19 21 25
```

Not valid because:


```c++
18 > 9
```

Largest left element must be ≤ smallest right element.

So move partition in A.

Eventually:


```plain text
A : [1 3 8 9] | [15]
B : [7 11] | [18 19 21 25]
```

Now:


```c++
maxLeftA = 9
maxLeftB = 11

minRightA = 15
minRightB = 18
```

And:


```c++
9 <= 18
11 <= 15
```

Valid partition found.

Median:


```c++
max(9,11) = 11
```


---

## Why Binary Search?

Once we choose a partition in A:


```c++
cut1
```

the partition in B is fixed:


```c++
cut2 = (m+n+1)/2 - cut1
```

So we only binary search on one array.

Always binary search on the smaller array.


---

## Algorithm

For every partition:


```c++
leftA  = A[cut1-1]
rightA = A[cut1]

leftB  = B[cut2-1]
rightB = B[cut2]
```

Handle boundaries using:


```c++
INT_MIN
INT_MAX
```

Valid partition:


```c++
leftA <= rightB
&&
leftB <= rightA
```


---

### If total length is odd

Median is:


```c++
max(leftA,leftB)
```

because left side contains one extra element.


---

### If total length is even

Median is:


```c++
(max(leftA,leftB) + min(rightA,rightB))/2
```


---

# Optimal Code



```c++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1,
                                  vector<int>& nums2) {

        if (nums1.size() > nums2.size())
            return findMedianSortedArrays(nums2, nums1);

        int n1 = nums1.size();
        int n2 = nums2.size();

        int low = 0;
        int high = n1;

        while (low <= high) {

            int cut1 = low + (high - low) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;

            int left1 =
                (cut1 == 0) ? INT_MIN : nums1[cut1 - 1];

            int right1 =
                (cut1 == n1) ? INT_MAX : nums1[cut1];

            int left2 =
                (cut2 == 0) ? INT_MIN : nums2[cut2 - 1];

            int right2 =
                (cut2 == n2) ? INT_MAX : nums2[cut2];

            if (left1 <= right2 && left2 <= right1) {

                if ((n1 + n2) % 2 == 0) {
                    return (max(left1, left2) +
                            min(right1, right2)) / 2.0;
                }

                return max(left1, left2);
            }

            else if (left1 > right2) {
                high = cut1 - 1;
            }

            else {
                low = cut1 + 1;
            }
        }

        return 0;
    }
};
```


---

### Revision Note

**Binary search on the smaller array to find a partition where **`leftA ≤ rightB`** and **`leftB ≤ rightA`**. Once such a partition is found, the median comes from the boundary elements around the partition.**

**Time:** `O(log(min(m,n)))`

**Space:** `O(1)`

Because the partition is constructed so that the **left half contains exactly half of the elements** and the **right half contains the remaining half**.

The median is defined as the middle element(s) of the sorted order. Once we have split all elements into two equal halves, the median must lie **right at the border between those halves**.


---

## **2187. Minimum Time to Complete Trips**

### Brute Force


```c++
class Solution {
public:
    long long minimumTime(vector<int>& time, int totalTrips) {

    int maxi = *max_element(time.begin(), time.end());    
    int mini = *min_element(time.begin(), time.end());    

    long long low = mini, high = (1LL * totalTrips * maxi);
    long long res = 0;
    
    while(low <= high)
    {
        long long mid = low + (high - low)/ 2;

        long long trips = 0;
        
        for(auto num : time)
            trips += mid / num;

        if(trips < totalTrips)
            low = mid + 1;
        else if(trips >= totalTrips)
        {
            res = mid;
            high = mid - 1;
        }
    }

    return res;
    }
};
```

### Optimal

Whenever you see

ask yourself:

That gives the **tightest upper bound**.


```c++
high = (1LL * totalTrips * mini)

Use this for the upper bound, this is more tighter and correct
```


---

## **410. Split Array Largest Sum**

### Why Do We Check `subarrays <= k` Even Though the Problem Says **Exactly **`k`?

The greedy algorithm always forms the **minimum number of subarrays** required so that every subarray sum is **≤ X**.

- If `subarrays > k`
- `X` is too small.
- We are forced to create more than `k` subarrays.
- Therefore, `X` is **not feasible**.
- If `subarrays <= k`
- `X` is feasible.
- We can always split existing subarrays to obtain **exactly **`k` subarrays.
**Why can we always split?**

Because all elements are **non-negative**.

Splitting a subarray can only **decrease (or keep the same)** its sum, so the maximum subarray sum never exceeds `X`.

Example:


```plain text
Greedy Partition:
[7,2,5] [10,8]

↓

Split further:

[7,2] [5] [10,8]
```

Largest subarray sum remains **18**.

Greedy gives the **minimum number of subarrays** for a given `X`. If this minimum is already `≤ k`, we can always split further to reach **exactly **`k` subarrays without violating the maximum sum constraint.


```c++
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        
    // Minimax -> Hence binary search on answers
    // Here answer -> maximum sum of a subarray (X)
    // We want that if sum <= X, then how many subarrays will be there (n)
    // If n > k, we need a higher sum for each subarray
    // if n <= k, then we need lower sum of each subarray but this can be the answer

    int low = *max_element(nums.begin(), nums.end());
    int high = accumulate(nums.begin(), nums.end(),0LL);
    int res = 0;

    while(low <= high)
    {
        int mid = low + (high - low) / 2;

        int curr_sum = 0, sub = 0;

        for(auto num : nums)
        {
            if(curr_sum + num <= mid)
                curr_sum += num;
            else
            {
                curr_sum = num;
                sub++;
            }
        }

        sub += 1;

        if(sub > k)
            low = mid + 1;
        else if(sub <= k)
        {
            res = mid;
            high = mid - 1;
        }
    }

    return res;
    }
};
```


---

## **2064. Minimized Maximum of Products Distributed to Any Store**


```c++
class Solution {
public:
    int minimizedMaximum(int n, vector<int>& quantities) {

    //Minimax -> Binary Search on Answers    
    //Answer here -> x -> maximum number of products each store can get
    //We calculate the number of stores required according to the given x
    //If stores_calc > n, then we need more products in each store, i.e. higher x
    //else, we need a lower x

    int low = 1;
    int high = *max_element(quantities.begin(), quantities.end());

    int res = 0;

    while(low <= high)
    {
        int mid = low + (high - low) / 2;

        int stores = 0;

        for(auto num : quantities)
        {
            stores += num / mid;
            if(num % mid != 0)  stores++;
        }

        if(stores > n)
        {
            low = mid + 1;
        }
        else if(stores <= n)
        {
            res = mid;
            high = mid - 1;
        }
    }

    return res;
    }
};
```


---


---

🔗 **References**
- 875. Koko Eating Bananas → https://leetcode.com/problems/koko-eating-bananas/description/
- 1482. Minimum Number of Days to Make m Bouquets → https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/
- 1283. Find the Smallest Divisor Given a Threshold → https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/
- 1011. Capacity To Ship Packages Within D Days → https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

