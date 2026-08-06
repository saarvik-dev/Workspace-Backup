## **225. Implement Stack using Queues**


```c++
class MyStack {
public:

    queue <int> q;

    MyStack() {        
    }
    
    void push(int x) {
        q.push(x);

        for(int i = 0; i < q.size() - 1; i++){
            q.push(q.front());
            q.pop();
        }   
    }
    //After pushing we have already transformed the queue into a stack so we can use the
    //normal operations on the queue
    
    int pop() {
        int top = q.front();
        q.pop();
        return top;
    }
    
    int top() {
        return q.front();
    }
    
    bool empty() {
        return (q.size() == 0);
    }
};
```

**Time Complexity :** O(N) | O(N)


---

## **232. Implement Queue using Stacks**


```c++
class MyQueue {
public:

    stack <int> s1;
    stack <int> s2;

    MyQueue() {
        
    }
    
    void push(int x) {
        s1.push(x);
    }
    
    int pop() {
        
        if(!s2.empty())
        {
            int top = s2.top();
            s2.pop();
            return top;
        }
        else
        {
            while(s1.size())
            {
                s2.push(s1.top());
                s1.pop();
            }

            int top = s2.top();
            s2.pop();
            return top;
        }
    }
    
    int peek() {
        if(!s2.empty())
        {
            return s2.top();
        }
        else
        {
            while(s1.size())
            {
                s2.push(s1.top());
                s1.pop();
            }

            return s2.top();
        }
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }

};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
```

**Time Complexity :** Amortized O(1) | O(N)


---

## 20. Balanced Parenthesis


```c++
class Solution {
public:
    bool isValid(string s) {

    stack <char> st;
   
    for(int i = 0; i < s.length(); i++)
    {
        if(s[i] == '(' || s[i] == '[' || s[i] == '{' )
            st.push(s[i]);
        else
        {
            if(st.empty())
                return false;
            
            if(st.top() == '(' && s[i] == ')' ||
               st.top() == '[' && s[i] == ']' ||
               st.top() == '{' && s[i] == '}' )

               st.pop();

            else
                return false;
        }
    }   

    return st.empty();
    }
};
```

Time Complexity:


---

## 155. Min Stack

***BRUTE FORCE***


```c++
class MinStack {
public:
//Inside the pop function we will be using another stack to store the minimum elements
//Basically we will be using a second stack of same height(to be more explicit) to store the minimum element upto that index
//in the stack

    stack <int> min_ele;
    stack <int> st;

    MinStack() {

    }
    
    void push(int val) {
        st.push(val);
        
        if(min_ele.empty())
            min_ele.push(val);

        else if(val < min_ele.top())
            min_ele.push(val);

        else
            min_ele.push(min_ele.top());  
    }
    
    void pop() {
        st.pop();
        min_ele.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return min_ele.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

***BETTER APPROACH***


```c++
class MinStack {
public:
    stack<int> st;
    stack<int> min_ele;

    MinStack() {}
    
    void push(int val) {
        st.push(val);
        
        // Only push to min_ele if it's empty OR the new value 
        // is the new minimum (or equal to it).
        if (min_ele.empty() || val <= min_ele.top()) {
            min_ele.push(val);
        }
    }
    
    void pop() {
        // If the value we are popping is the current minimum,
        // we must pop it from the min_ele stack as well.
        if (st.top() == min_ele.top()) {
            min_ele.pop();
        }
        st.pop();
    }
    
    int top() {
        return st.top();
    }
    
    int getMin() {
        return min_ele.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

***OPTIMAL APPROACH***


---

## 496. Next Greater Element 1


```c++
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {

        unordered_map<int, int> nge; // value -> next greater
        stack<int> st;

        // Process nums2
        for (int i = nums2.size() - 1; i >= 0; i--) {

            // Maintain decreasing stack
            while (!st.empty() && st.top() <= nums2[i]) {
                st.pop();
            }

            // If stack empty → no greater element
            nge[nums2[i]] = st.empty() ? -1 : st.top();

            st.push(nums2[i]);
        }

        // Build answer for nums1
        vector<int> ans;
        for (int x : nums1) {
            ans.push_back(nge[x]);
        }

        return ans;
    }
};  
```


---

## **503. Next Greater Element II**


```c++
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {

    //Logic seems quite same as previous question, except the fact that we have to build separate loagic for the last element, basially for the last element we have to iterate from the front not from the back

    //A brute force approach would be of O(2N) by applying the nge concept from first to second last element, and running a separate loop for the last element

    int n = nums.size();
    vector <int> ans(n, -1);

    if(n == 1)
        return ans;

    stack <int> st;


    for (int i = 2*n - 1; i >= 0; i--)
    {
        int index = i % n;

        while(!st.empty() && nums[index] >= st.top())
        {
            st.pop();
        }

        if(index != n)
            ans[index]  = st.empty() ? -1 : st.top();

        st.push(nums[index]);
    }    

    return ans;
    }
};
```


---

## 907. Sum of Subarray Minimums


```c++
class Solution {
public:
    vector<int> previousSmallestElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s1;                 // store indices
        vector<int> vec1(n);

        for(int i = 0; i < n; i++)
        {
            while(!s1.empty() && arr[s1.top()] >= arr[i])
                s1.pop();

            vec1[i] = s1.empty() ? -1 : s1.top();
            s1.push(i);
        }

        return vec1;
    }

    
    vector<int> nextSmallestOrEqualElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s2;                 // store indices
        vector<int> vec2(n);

        for(int i = n - 1; i >= 0; i--)
        {
            while(!s2.empty() && arr[s2.top()] > arr[i])
                s2.pop();

            vec2[i] = s2.empty() ? n : s2.top();
            s2.push(i);
        }

        return vec2;
    }

    int sumSubarrayMins(vector<int>& arr) {

        vector<int> pse = previousSmallestElement(arr);        
        vector<int> nsee = nextSmallestOrEqualElement(arr);

        int n = arr.size();
        long long sum = 0;
        int mod = 1000000007;   // 1e9 + 7

        for(int i = 0; i < n; i++)
        {
            long long ways = 1LL * (i - pse[i]) * (nsee[i] - i);
            sum = (sum + ways * arr[i]) % mod;
        }

        return (int)sum;
    }
};
```

### Commented Version


```c++
class Solution {
    const int MOD = 1e9 + 7;
private:
    void cal_psee(vector <int> &arr, vector <int> &psee)
    {
        stack <int> st;
        for(int i = 0; i < arr.size(); i++)
        {
            while(!st.empty() && arr[st.top()] > arr[i])
                st.pop();

            psee[i] = st.empty() ? -1 : st.top();

            st.push(i);
        }
    }

    void cal_nse(vector <int> &arr, vector <int> &nse)
    {
        stack <int> st;
        for(int i = arr.size() - 1; i >= 0; i--)
        {
            while(!st.empty() && arr[st.top()] >= arr[i])
                st.pop();

            nse[i] = st.empty() ? arr.size() : st.top();

            st.push(i);
        }
    }
public:
    int sumSubarrayMins(vector<int>& arr) {

    // Instead of asking, What is the minimum of every subarray?
    // Ask For every element, in how many subarrays is it the minimum? 
    
    //Contribution of an element (number of subarrays it is minimum is) is ;
    //arr[i] * left_choices * right_choices  
    //for left and right we extend only until we encounter a smaller element
    //Here comes the implementation of finding next smaller element and previous smaller element

    //To avoid recounting of duplicates, we choose any one side to allow equal elements and one side to be strictly greater or striclty smaller

    //Hence for all elements we will first find both psee and nse and then count contributions for each element using the info

    int n = arr.size();
    vector <int> psee(n), nse(n);
    cal_psee(arr, psee);
    cal_nse(arr, nse);

    long long sum = 0;

    for(int i = 0; i < n; i++)
    {
        long long ways = 1LL * (i - psee[i]) * (nse[i] - i);
        sum = (sum + (arr[i] * ways) % MOD) % MOD;
    }
    return (int)sum;
    }
};
```


---

## 735. Asteroid Collision


```c++
class Solution {
public:
    /* Function to determine the state of 
    asteroids after all collisions */
    vector<int> asteroidCollision(vector<int> &asteroids){
        
        // Size of the array
        int n = asteroids.size();
        
        // List implementation of stack
        vector<int> st;  
        
        // Traverse all the asteroids
        for(int i=0; i < n; i++) {
            
            /* Push the asteroid in stack if a 
            right moving asteroid is seen */
            if(asteroids[i] > 0) {
                st.push_back(asteroids[i]);
            }
            
            /* Else if the asteroid is moving 
            right, perform the collisions */
            else {
                
                /* Until the right moving asteroids are 
                smaller in size, keep on destroying them */ 
                while(!st.empty() && st.back() > 0 && 
                      st.back() < abs(asteroids[i])) {
                    
                    // Destroy the asteroid
                    st.pop_back();
                }
                
                /* If there is right moving asteroid 
                which is of same size */
                if(!st.empty() && 
                    st.back() == abs(asteroids[i])) {
                    
                    // Destroy both the asteroids
                    st.pop_back();
                }
                
                /* Otherwise, if there is no left
                moving asteroid, the right moving 
                asteroid will not be destroyed */
                else if(st.empty() ||
                        st.back() < 0){
                    
                    // Storing the array in final state
                    st.push_back(asteroids[i]);
                }
            }
        }
        
        // Return the final state of asteroids
        return st;
    }
};
```


---

## 2104. Sum of Subarray Ranges

***APPROACH 1***


```c++
class Solution {
public:
    vector<int> previousSmallestElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s1; // store indices
        vector<int> vec1(n);

        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[s1.top()] >= arr[i])
                s1.pop();

            vec1[i] = s1.empty() ? -1 : s1.top();
            s1.push(i);
        }

        return vec1;
    }

    vector<int> nextSmallestOrEqualElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s2; // store indices
        vector<int> vec2(n);

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[s2.top()] > arr[i])
                s2.pop();

            vec2[i] = s2.empty() ? n : s2.top();
            s2.push(i);
        }

        return vec2;
    }

    vector<int> previousGreatestElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s1; // store indices
        vector<int> vec3(n);

        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[s1.top()] <= arr[i])
                s1.pop();

            vec3[i] = s1.empty() ? -1 : s1.top();
            s1.push(i);
        }

        return vec3;
    }

    vector<int> nextGreatestOrEqualElement(vector<int>& arr) {

        int n = arr.size();
        stack<int> s2; // store indices
        vector<int> vec4(n);

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[s2.top()] < arr[i])
                s2.pop();

            vec4[i] = s2.empty() ? n : s2.top();
            s2.push(i);
        }

        return vec4;
    }
    long long subArrayRanges(vector<int>& nums) {

        // Similar to the subarray minimum problem, here we have to find for how
        // many subarrays the current element is maximum and how much minimum

        vector<int> pse = previousSmallestElement(nums);
        vector<int> nsee = nextSmallestOrEqualElement(nums);
        vector<int> pge = previousGreatestElement(nums);
        vector<int> ngee = nextGreatestOrEqualElement(nums);

        int n = nums.size();
        long long sum = 0;

        for (int i = 0; i < n; i++) {
            long long ways_for_min = 1LL * (i - pse[i]) * (nsee[i] - i);
            long long ways_for_max = 1LL * (i - pge[i]) * (ngee[i] - i);
            sum = sum + (ways_for_max * nums[i] - ways_for_min * nums[i]);
        }

        return sum;
    }
};
```

***APPROACH 2***


```c++
class Solution {
public:
    long long subArrayRanges(vector<int>& nums) {

    //To find the sum, what we'll do is we'll find for many subarrays is the currrent element maximum and for how many minimum and to find this we'll use monotonic stacks to find the next/previous smallest/greatest element which acts as the boundary for the subarray for which the element is max/min (similar to question 907)
    //Also for this question the monotonic stacks we are maintaining store the indices or elements not the elements as eventually we need the inddices not the elements
    //We will use a single stack and clean it after every usage

    int n = nums.size();
    vector <int> pse(n), nsee(n), pge(n), ngee(n);

    stack <int> st;
    int i;

    //Maintaining a MDS to find previous smalllest element
    for(i = 0; i < n; i++)
    {
        while(!st.empty() && nums[i] <= nums[st.top()])
            st.pop();

        pse[i] = st.empty() ? -1 : st.top();

        st.push(i);
    }

    while(!st.empty())  st.pop();
    
    //Maintaining a MDS to find next smallest or equal element
    for(i = n - 1; i >= 0 ; i--)
    {
        while(!st.empty() && nums[i] < nums[st.top()])
            st.pop();

        nsee[i] = st.empty() ? n : st.top();

        st.push(i);
    }
    
    while(!st.empty())  st.pop();
    
    //Maintaining a MIS to find previous greatest element
    for(i = 0; i < n; i++)
    {
        while(!st.empty() && nums[i] >= nums[st.top()])
            st.pop();

        pge[i] = st.empty() ? -1 : st.top();

        st.push(i);
    }
    
    while(!st.empty())  st.pop();
    
    
    //Maintaining a MIS to find next greatest or equal element
    for(i = n - 1; i >= 0 ; i--)
    {
        while(!st.empty() && nums[i] > nums[st.top()])
            st.pop();

        ngee[i] = st.empty() ? n : st.top();

        st.push(i);
    }
    
    while(!st.empty())  st.pop();
    
    long long sum = 0;

    for(int i = 0; i < n; i++)
    {
        long long ways_for_max = (i - pge[i]) * (ngee[i] - i);
        long long ways_for_min = (i - pse[i]) * (nsee[i] - i);
        sum = sum + (nums[i] * ways_for_max - nums[i] * ways_for_min);
    } 

    return sum;
    }
};
```


---

## 402. Remove K Digits


```c++
class Solution {
public:
    string removeKdigits(string num, int k) {

    //A number becomes greater when higher value digits are added on the left hand side or you can see the most significant bit side   

    //We have to use a stack as without a stack we would loose the order of digits which would eventually cause us to return a number which is a jumbled representation of the digits rather than a number formed after removal of digits

    //We have to anyhow remove a big digit from the left hand side, so we will simulate this using.......

    //The test cases are deceiving, the logic ain't so direct as mentioned above

    stack <char> st; // Stack
        
        // Traverse on the given string
        for(int i=0; i < num.size(); i++) {
            
            // Current digit
            char digit = num[i];
            
            /* Pop last digits (when possible)
            if a smaller digit is found*/
            while(!st.empty() && k > 0
                  && st.top() > digit) {

                st.pop(); // Pop the last digit
                k--; // Decrement K by 1
            }
            
            // Push the current digit
            st.push(digit);
        }
        
        // If more digits can be removed
        while(!st.empty() && k > 0) {
            
            st.pop(); // Pop the last added digits
            k--; // Decrement K by 1
        }
        
        // Handling edge case
        if(st.empty()) return "0";
        
        // To store the result
        string res = "";
        
        // Adding digits in stack to result
        while(!st.empty()) {
            res.push_back(st.top());
            st.pop();
        }
        
        // Trimming the zeroes at the back
        while(res.size() > 0 && 
              res.back() == '0') {

            res.pop_back();
        }
        
        // Reverse to get the actual number
        reverse(res.begin(), res.end());
        
        // Edge case
        if(res.empty()) return "0";
        
        // Return the stored result
        return res;


    }
};
```


---

## **739. Daily Temperatures**

### Brute Force


```c++
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n);

        for (int i = 0; i < n; i++) {
            int count = 1;
            int j = i + 1;
            while (j < n) {
                if (temperatures[j] > temperatures[i]) {
                    break;
                }
                j++;
                count++;
            }
            count = (j == n) ? 0 : count;
            res[i] = count;
        }
        return res;
    }
};
```

### Better — Monotonic Decreasing Stack

This solution efficiently solves the "Daily Temperatures" problem in **$O(N)$ time and space** using a **monotonic decreasing stack** to find the next warmer day for each element. As we iterate through the temperatures, we maintain a stack of pairs containing unresolved temperatures and their respective indices. For each current temperature, we continuously pop elements from the stack as long as the current temperature is strictly greater than the temperature at the top of the stack, calculating the day difference ($i - \text{pair.second}$) and storing it in the result array at the popped element's index. Finally, the current temperature and index are pushed onto the stack, ensuring that any elements left unresolved automatically remain defaulted to `0` (indicating no warmer day was found).


```c++
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        vector<int> res(temperatures.size(), 0);
        stack<pair<int, int>> stack; // pair: {temp, index}

        for (int i = 0; i < temperatures.size(); i++) {
            int t = temperatures[i];
            while (!stack.empty() && t > stack.top().first) {
                auto pair = stack.top();
                stack.pop();
                res[pair.second] = i - pair.second;
            }
            stack.push({t, i});
        }
        return res;
    }
};
```


---

## **1475. Final Prices With a Special Discount in a Shop**

### NSE


```c++
class Solution {
public:
    vector<int> finalPrices(vector<int>& prices) {

        // This is an implementation of the next smaller element
        // Monotonic increasing stack
        // Pop when st.top() > nums[i]
        stack<int> st;
        int n = prices.size();
        vector<int> res(n);

        for (int i = n - 1; i >= 0; i--) {

            while (!st.empty() && st.top() > prices[i]) {
                st.pop();
            }


            int discount = st.empty() ? 0 : st.top();
            res[i] = prices[i] - discount;

             st.push(prices[i]);
        }

        return res;
    }
};
```


---

## **1944. Number of Visible People in a Queue**

So **once a taller person appears, all shorter people behind them disappear from view.**

This is the key observation.

### 
A taller person is **always visible**, because nothing before it is taller than it.

Intuition


```c++
    //Intuition:
    //We traverse from right to left so that elements to the right are already processed   
    //Person taller than the current person to the right is always visible
    //Person smaller than the current person is also visible until blocked by a greater element
    //Hence at any point the stack would contain the possible visible candidates

    //Basicall at any point, the stack would contain the people to the right in increasing order
    // At any point, the stack contains:

        // People to the right of the current person.
        // In an order that maintains the monotonic property (here, from bottom to top the heights are decreasing).
        // Anyone who has become permanently hidden by a closer taller person has already been removed.
    
    // From top → bottom, the heights are increasing.

    //Whenever we encounter a person shorter than the current person, we count them and pop them because they are directly visible and will never matter again.

    //The while loop counts all visible shorter people.
    // The if (!stack.empty()) counts the first taller (or equal) person, who is also visible but blocks everyone behind them.
    // So together they count exactly the people the current person can see.
```


```c++
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {

    int n = heights.size();
    stack <int> st;
    vector <int> res(n);

    for(int i = n - 1; i >= 0; i--)
    {
        int current = heights[i];
        int count = 0;

        while(!st.empty() && st.top() < current)
        {
            count++;
            st.pop();
        }

        if(!st.empty())
            count++;

        st.push(current);
        res[i] = count;
    }

    return res;
    }
};
```


---

## **901. Online Stock Span**


```c++
class StockSpanner {
public:
    stack<pair<int, int>> st;   // {price, index}
    int idx;

    StockSpanner() {
        idx = -1;
    }

    int next(int price) {
        idx++;

        while (!st.empty() && st.top().first <= price)
            st.pop();

        int span;

        if (st.empty())
            span = idx + 1;
        else
            span = idx - st.top().second;

        st.push({price, idx});

        return span;
    }
};
```


---

🔗 **References**
- 907. Sum of Subarray Minimums → https://leetcode.com/problems/sum-of-subarray-minimums/
- 735. Asteroid Collision → https://leetcode.com/problems/asteroid-collision/description/
- 2104. Sum of Subarray Ranges → https://leetcode.com/problems/sum-of-subarray-ranges/description/
- 402. Remove K Digits → https://leetcode.com/problems/remove-k-digits/

