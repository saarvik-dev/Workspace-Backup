## **1046. Last Stone Weight**


```c++
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        // Max heap to keep track of the heaviest stones
        priority_queue<int> q;
        for(auto num : stones)
            q.push(num);
        
        while(q.size() > 1)
        {
            int y = q.top(); 
            q.pop();
            
            int x = q.top(); 
            q.pop();         
            
            if (y != x) {
                q.push(y - x); 
            }
        }    
        
        return q.empty() ? 0 : q.top();
    }
};
```


---

## **215. Kth Largest Element in an Array**


```c++
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {

    //The best option is to use a priority queue
    //Lets use a max heap and pop out k - 1 elements

    priority_queue<int, vector<int>, greater<int>> q;

    for(auto num : nums)
    {
        q.push(num);
        if(q.size() > k)
            q.pop();
    }

    return q.top();
    }
};
```


---

## **703. Kth Largest Element in a Stream**


```c++
class KthLargest {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;

public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;

        for (int num : nums) {
            minHeap.push(num);

            if (minHeap.size() > k)
                minHeap.pop();
        }
    }

    int add(int val) {

        minHeap.push(val);

        if (minHeap.size() > k)
            minHeap.pop();

        return minHeap.top();
    }
};
```


---

## **506. Relative Ranks**


```c++
class Solution {
public:
    vector<string> findRelativeRanks(vector<int>& score) {
        int n = score.size();
        
        priority_queue<pair<int, int>> q;

        for(int i = 0; i < n; i++) {
            q.push({score[i], i});
        }    

        vector<string> res(n);
        int count = 0;

        
        while (!q.empty()) {
            auto [current_score, index] = q.top();
            q.pop();

            switch(count) {
                case 0: 
                    res[index] = "Gold Medal"; 
                    break;
                case 1: 
                    res[index] = "Silver Medal"; 
                    break;
                case 2: 
                    res[index] = "Bronze Medal"; 
                    break;
                default: 
                    res[index] = to_string(count + 1);
                    break;
            }
            count++;
        }

        return res;
    }
};
```


---

## **973. K Closest Points to Origin**


```c++
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<long long, int>> q;

        for(int i = 0; i < points.size(); i++) {
            int x = points[i][0];
            int y = points[i][1];
            
            long long d = (1LL * x * x) + (1LL * y * y);
            q.push({d, i});

            if(q.size() > k) {
                q.pop();
            }
        }

        vector<vector<int>> res;
        
        while(!q.empty()) {
            auto [d, index] = q.top();
            q.pop();

            res.push_back(points[index]);
        }

        return res;
    }
};
```


---

## **1338. Reduce Array Size to The Half**


```c++
class Solution {
public:
    int minSetSize(vector<int>& arr) {

    //To minimize the size of the set, its best to remove the most frequent integers    
    //Since we have to only output the number of elements in the set, we can use a max heap to store the frequencies of elements and start removing elements from the top

    //First we will calculate the frequencies in a hash map and then add those frequencies in a max heap

    int n = arr.size();

    unordered_map <int, int> freq;

    for(auto num : arr)
        freq[num]++;

    priority_queue <int> q;
    for(const auto &[key, value] : freq)
        q.push(value);

    int res = 0;
    int count = n;

    while(count > n / 2 && !q.empty())
    {
        int f = q.top();
        q.pop();

        count -= f;
        res++;
    }

    return res;


    }
};
```


---

## **692. Top K Frequent Words**


```c++
class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {

        unordered_map<string, int> counts;
        for (const string& word : words) {
            counts[word]++;
        }
        
        //custom comparator
        auto comp = [](const pair<int, string>& a, const pair<int, string>& b) {
            if (a.first == b.first) {
                return a.second < b.second; //larger string comes to top (to be popped)
            }
            return a.first > b.first;
        };
        
        priority_queue<pair<int, string>, vector<pair<int, string>>, decltype(comp)> minHeap(comp);
        
        for (auto& it : counts) {
            minHeap.push({it.second, it.first});
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        

        vector<string> result(k);
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.top().second;
            minHeap.pop();
        }
        
        return result;
    }
};
```


---

## **786. K-th Smallest Prime Fraction**

### Priority Queue - O(n^2log\ k)


```c++
class Solution {
public:
    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {

    //Lets use brute force - with a priority queue
    priority_queue <tuple<double, int, int>> q;
    int n = arr.size();

    for(int i = 0; i < n; i++)
    {
        for(int j = i + 1; j < n; j++)
        {
            double x = (double)arr[i] / arr[j];
            q.emplace(x, arr[i], arr[j]);

            if(q.size() > k)
                q.pop();
        }
    }   

    auto [fraction, a, b] = q.top();
    return {a, b};    
    }
};
```


---

## **1753. Maximum Score From Removing Stones**

### Brute Force using Max Heap


```c++
class Solution {
public:
    int maximumScore(int a, int b, int c) {

    //use a max heap to keep track of top 2 elements
    priority_queue <int> q;
    q.push(a);
    q.push(b);
    q.push(c);

    int op = 0;

    while(q.size() > 1)
    {
        int a = q.top();
        q.pop();

        int b = q.top();
        q.pop();

        
        if(a == 0 || b == 0)
            break;           

        a--; b--;

        q.push(a);
        q.push(b);

        op++;
    }

    return op;
    }
};
```

### Optimal Approach

Let's sort the three piles such that a \le b \le c. There are two distinct scenarios:

If the largest pile c is massive, it can completely absorb all the stones from both a and b without ever running out.

- Every time you take a stone from a or b, you pair it with a stone from c.
- Once a and b are completely empty (0), you can no longer make any moves.
- **Maximum Score:** Since you emptied a and b entirely, the maximum score is simply **a + b**.
If c is not large enough to swallow both piles completely, it means we can empty *all* three piles down to either 0 or 1 stone remaining.

- Since each move removes exactly **2 stones** from the total pool of stones, the absolute maximum moves we could ever make is the total number of stones divided by 2.

---


```c++
class Solution {
public:
    int maximumScore(int a, int b, int c) {
        // 1. Sort the elements so that a <= b <= c
        int arr[3] = {a, b, c};
        sort(arr, arr + 3);

        int x = arr[0]; // smallest
        int y = arr[1]; // middle
        int z = arr[2]; // largest

        // 2. Apply the O(1) mathematical logic
        if (z >= x + y) {
            return x + y;
        } else {
            return (x + y + z) / 2;
        }
    }
};
```


---

## **1331. Rank Transform of an Array**


```c++
class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {

    //Approach 1 : Use a max heap (element, index) and a prev variable to track same rank elements

    priority_queue <pair<int, int>, vector <pair<int, int>>, greater <pair<int, int>>> q;

    for(int i = 0; i < arr.size(); i++)
    {
        q.push({arr[i], i});
    }    

    int rank = 0;
    int prev;
    vector <int> res(arr.size());

    while(!q.empty())
    {
        auto [num, index] = q.top();
        q.pop();

        if(num == prev)
            res[index] = rank;
        else
            res[index] = ++rank;

        prev = num;
    }

    return res;
    }
};
```

