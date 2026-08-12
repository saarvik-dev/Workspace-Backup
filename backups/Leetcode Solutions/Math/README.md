## **3754. Concatenate Non-Zero Digits and Multiply by Sum I**


```c++
class Solution {
public:
    long long sumAndMultiply(int n) {

    int x = 0;
    int multiplier = 1;
    long long sum = 0;
    
    while(n)
    {
        int digit = n % 10;
        n = n / 10;
        
        if(digit == 0)
            continue;

        x = x + (digit * multiplier);
        multiplier *= 10;

        sum += digit;
    }    

    return sum * 1LL * x;
    }
};
```


---

## **172. Factorial Trailing Zeroes**

To find the number of trailing zeroes in n!, we need to figure out how many times the number **10** is multiplied into the product.
The prime factorization of 10 is 2\,* \,5. Therefore, every pair of factors (2,5) in the prime factorization of n! contributes exactly one trailing zero.

### **
The Key Insight: Why Only Count 5s?**

In any factorial n! = 1 \times 2 \times 3 \times \dots \times n , multiples of 2 appear much more frequently than multiples of 5.
• Every second number is a multiple of 2 (2, 4, 6, 8, 10...).
• Only every fifth number is a multiple of 5 (5, 10, 15, 20, 25...).
Because prime factor 2 is always in abundance, **the number of trailing zeroes is completely limited by the number of times 5 appears as a prime factor** in the product. If you count the total number of 5s in the prime factorization of n! , you automatically know how many pairs of (2,5) you can form.

Instead of computing powers of 5 explicitly (which could risk integer overflow if not handled carefully), you can iteratively divide n! by 5 and accumulate the quotient. This yields an elegant, optimal O(\log_5\N)** time complexity** solution with O(1)** auxiliary space**.



```c++
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            count += n / 5;
            n /= 5; // Move to the next power of 5 (25, 125, etc.) in the next iteration
        }
        return count;
    }
};
```


---

## **3986. Number of Elapsed Seconds Between Two Times**


```c++
class Solution {
public:
    int secondsBetweenTimes(string startTime, string endTime) {

        
    int s_hr = (startTime[0] - '0') * 10 + startTime[1];
    int s_min = (startTime[3] - '0') * 10 + startTime[4];
    int s_sec = (startTime[6] - '0') * 10 + startTime[7];

    
    int e_hr = (endTime[0] - '0') * 10 + endTime[1];
    int e_min = (endTime[3] - '0') * 10 + endTime[4];
    int e_sec = (endTime[6] - '0') * 10 + endTime[7];

    int res = 0;

    if(e_sec - s_sec >= 0)
        res += (e_sec - s_sec);
    else
    {
        e_min -= 1;
        res += (e_sec - s_sec + 60);
    }

    if(e_min - s_min >= 0)
        res += (e_min - s_min) * 60;
    else
    {
        e_hr -= 1;
        res += (e_min - s_min + 60) * 60;
    }

    res += (e_hr - s_hr) * 3600;

    return res;
    }
};
```


```c++
class Solution {
public:
    int secondsBetweenTimes(string startTime, string endTime) {
        int startH = stoi(startTime.substr(0,2));
        int startM = stoi(startTime.substr(3,2));
        int startS = stoi(startTime.substr(6,2));

        int endH = stoi(endTime.substr(0,2));
        int endM = stoi(endTime.substr(3,2));
        int endS = stoi(endTime.substr(6,2));

        int startTotal = startH*3600 + startM*60 +startS;
        int endTotal = endH*3600 + endM*60 + endS;

        return endTotal-startTotal;
    }
};
```


---

## **3987. Minimum Total Cost to Process All Elements**

`INV_2` stands for **Modular Inverse of 2**.
In this problem, you need to calculate the sum of an arithmetic progression using the formula:$$\text{Sum} = \frac{n \times (a + l)}{2}$$
Because the numbers are extremely large, we have to take the modulo (`% 1e9 + 7`) at every step to prevent integer overflow. However, **standard division does not work under modulo arithmetic**.
That is, `(A / 2) % MOD` is **not** equal to `(A % MOD) / 2`.
To divide by 2 safely in modular arithmetic, you instead multiply by the **multiplicative modular inverse** of 2.**
How it works:**
The modular inverse of $2 \pmod M$ is a number $X$ such that:$$(2 \times X) \pmod M = 1$$
For $M = 10^9 + 7$:$$(2 \times 500000004) = 1000000008$$$$1000000008 \pmod{10^9 + 7} = 1$$
So, multiplying a number by `500000004` and taking the modulo is mathematically identical to dividing that number by 2 before the modulo is applied. It allows you to compute the formula completely using multiplication, avoiding any overflow or fractional issues.


```c++
	class Solution {
public:
    int minimumCost(vector<int>& nums, int k) {
        int n = nums.size();
        long long res = k;
        long long ops = 0; 
        long long total = 0;
        long long MOD = 1e9 + 7;
        long long INV_2 = 500000004; 

        for (int i = 0; i < n; i++) {
            long long req = nums[i];

            if (res < req) {
                long long def = req - res;
                long long count = (def + k - 1) / k;

                long long first = ops + 1;
                long long last = ops + count;
                
                long long sum = (first + last) % MOD;
                long long c_mod = count % MOD;
                
                long long cost = (((c_mod * sum) % MOD) * INV_2) % MOD;
                
                total = (total + cost) % MOD;
                res += count * k;
                ops += count;
            }

            res -= req;
        }

        return total;
    }
};
```


---

## **3658. GCD of Odd and Even Sums**

Sum\ of\ first\ n\ odd\ numbers\ =\ n * n

Sum\ of\ first\ n\ even\ numbers\ =\ n * (n + 1)

Since\ gcd(n, n+ 1) = 1, 

Therefore,\ gcd(n^2,\  n * (n + 1)) = n


```c++
class Solution {
public:
    int gcdOfOddEvenSums(int n) {

    //gcd(n * n, n * (n + 1)) = n * gcd(n, n + 1) = n

    return n;    
    }
};
```


---

## **3867. Sum of GCD of Formed Pairs**

Time\ Complexity\ of\ GCD\ :\ O(log(min(a, b)))


```c++
class Solution {
public:
    long long gcdSum(vector<int>& nums) {

    int n = nums.size();
    vector <int> prefix(n);    

    int mx = INT_MIN;
    for(int i = 0; i < n; i++)
    {
        mx = max(mx, nums[i]);
        prefix[i] = mx;
    }

    for(int i = 0; i < n; i++)
    {
        prefix[i] = gcd(nums[i], prefix[i]);
    }

    sort(prefix.begin(), prefix.end());

    int l = 0, r = n - 1;

    long long sum = 0;
    while(l < r)
    {
        sum += gcd(prefix[l], prefix[r]);
        l++;
        r--;
    }   

    return sum;
    }
};
```


---

## **1979. Find Greatest Common Divisor of Array**


```c++
class Solution {
public:
    int findGCD(vector<int>& nums) {

    int maxi = *max_element(nums.begin(), nums.end());    
    int mini = *min_element(nums.begin(), nums.end());    

    return gcd(mini, maxi);
    }
};
```


---

## **3993. Maximum Value of an Alternating Sequence**

### Algorithm

- start from s
- then s \ + \ m,\ s\ + m\ - 1,\ s \ + \ 2m, s\ + 2m\ - 2,\ and\  so\  on\ 

```c++
class Solution {
public:
    long long maximumValue(int n, int s, int m) {

    long long res = 0;

        
    res = 1LL * (s + m) + 1LL * (n / 2 - 1) * (m - 1);
    
    return (n == 1) ? s : res;
    }
};
```


---

## **3996. Even Number of Knight Moves**

### Brute Force - Recursion


```c++
class Solution {
private:
    bool reach(vector <int> &start, vector<int>& target, int x, int y, int moves, 
               vector <vector<int>> &vis) {
        if (x > 7 || y > 7 || x < 0 || y < 0)
            return false;
        if (x == target[0] && y == target[1] && moves % 2 == 0)
            return true;
        
        if(x == start[0] && y == start[1] && moves != 0)
            return false;
        
        if(vis[x][y] == 1)
            return false;
        
        vis[x][y] = 1;
        
        return reach(start, target, x + 2, y + 1, moves + 1, vis) ||
               reach(start, target, x + 2, y - 1, moves + 1, vis) ||
               reach(start, target, x - 2, y + 1, moves + 1, vis) ||
               reach(start, target, x - 2, y - 1, moves + 1, vis) ||
               reach(start, target, x + 1, y + 2, moves + 1, vis) ||
               reach(start, target, x + 1, y - 2, moves + 1, vis) ||
               reach(start, target, x - 1, y + 2, moves + 1, vis) ||
               reach(start, target, x - 1, y - 2, moves + 1, vis);
    }

public:
    bool canReach(vector<int>& start, vector<int>& target) {
        // vector <vector<vector<int>>> dp(8, vector<vector<int>> (8, vector <int> (100, -1)));

        vector <vector<int>> vis(8, vector <int> (8, 0));
        return reach(start, target, start[0], start[1], 0, vis);
    }
};
```

### Math Observation


```c++
class Solution {
public:
    bool canReach(vector<int>& start, vector<int>& target) {
        // hint
        int D = abs(start[0] - target[0]) + abs(start[1] - target[1]);
        if (D % 2 == 0) return true;
        else return false;
    }
};
```


---

## **650. 2 Keys Keyboard**

### Memoization


```c++
class Solution {
private:
    int operations(int curr, int prev, int n, vector <vector<int>> &dp)
    {
        if(curr == n)
            return 0;

        if(curr > n)
            return 1e9;

        if(dp[curr][prev] != -1)
            return dp[curr][prev];

        int copy = 1e9, paste = 1e9;
        //Copy all characters
        if(prev != curr)
            copy = 1 + operations(curr, curr, n, dp);

        //Paste all characters
        if(prev > 0)
            paste = 1 + operations(curr + prev, prev, n, dp);

        return dp[curr][prev] = min(copy, paste);
    }
public:
    int minSteps(int n) {

    // min of all situations
    // count -> number of operations  
    vector <vector<int>> dp(n + 1, vector <int> (n + 1, -1));
    return operations(1, 0, n, dp);
    }
};
```

### Tabulation


```c++

```

### Optimal Solution


```c++

```


---

## **1137. N-th Tribonacci Number**


```c++
class Solution {
public:
    int tribonacci(int n) {

    if(n == 0)  return 0;
    if(n == 1) return 1;
    if(n == 2) return 1;
    
    int t1 = 0;
    int t2 = 1;
    int t3 = 1;

    for(int i = 3; i <= n; i++)
    {
        int t = t1 + t2 + t3;
        t1 = t2;
        t2 = t3;
        t3 = t;
    }    

    return t3;
    }
};
```


---

## **3536. Maximum Product of Two Digits**


```c++
class Solution {
public:
    int maxProduct(int n) {

    //Seems like max product would be the product of max two digits in the number   
    //Since n < 10^9
    //Number of digits would be maximum 9, so we can just check, we can keep a vis arr

    int max1 = INT_MIN, max2 = INT_MIN;

    while(n)
    {
        int digit = n % 10;
        
        if(digit > max1)
        {
            max2 = max1;
            max1 = digit;
        }

        else if(digit > max2)
            max2 = digit;

        n /= 10;
    }

    return max1 * max2;
    }
};
```


---

## **3014. Minimum Number of Pushes to Type Word I**


```c++
class Solution {
public:
    int minimumPushes(string word) {
        int len = word.size();
        
        if (len <= 8) return len;
        if (len <= 16) return 8 + 2 * (len - 8);
        if (len <= 24) return 24 + 3 * (len - 16);
        
        return 48 + 4 * (len - 24); 
    }
};
```


---

## **4010. Maximize Pair Strength Using GCD**


```c++
class Solution {
public:
    long long maxPairStrength(vector<int>& nums) {

    long long maxi = INT_MIN;
    int n = nums.size();
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            long long num = 1LL * nums[i] * nums[j];
            int d = gcd(nums[i], nums[j]);
            long long den =  1LL * d * d;

            long long res = num / den;

            maxi = max(maxi, res);
        }
    }
    return maxi;
    }
};
```


---

## **3345. Smallest Divisible Digit Product I**


```c++
	class Solution {
public:
    int smallestNumber(int n, int t) {
    
    int ans = -1;
    while (true)
    {
        int prod = 1;
        int num = n;
        while(num)
        {
            prod *= num % 10;
            num = num / 10;
        }
        if(prod % t == 0)
        {
            ans = n;
            break;
        }
        n++;
    }

    return ans;
    }
};
```


---

## **2996. Smallest Missing Integer Greater Than Sequential Prefix Sum**


```c++
class Solution {
public:
    int missingInteger(vector<int>& nums) {
        int sum = nums[0];
        
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] == nums[i - 1] + 1) {
                sum += nums[i];
            } else {
                break;
            }
        }
        
        unordered_set<int> st(nums.begin(), nums.end());
        
        // Find the smallest missing integer >= sum
        while (st.count(sum)) {
            sum++;
        }
        
        return sum;
    }
};
```

