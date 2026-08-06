## **4008. Minimum Initial Strength to Defeat All Monsters**


```c++
class Solution {
private:
    bool possibleDefeating(vector <int> &monsters, vector <long long> &arr, long long curr)
    {
        for(int i = 0; i < monsters.size(); i++)
        {
            if(curr + arr[i] < 1LL*monsters[i])
                return false;
            curr = max(0LL, curr - 1LL*monsters[i]);
        }
        return true;
    }
public:
    long long minInitialStrength(vector<int>& monsters, vector<vector<int>>& boosts) {

        ///Using difference array technique
        int n = monsters.size();
        
        vector <long long> arr(n, 0);
        
        for(auto p : boosts) {
            int l = p[0], r = p[1];
            long long v = p[2];
            arr[l] += v;
            if(r != n - 1)
                arr[r + 1] -= v;
        }
        for(int i = 1; i < n; i++)
            arr[i] += arr[i-1];

        long long curr = 0;
        long long sum = 0;
        for(int i = 0; i < n; i++) {
            sum += monsters[i];
        }

        long long low = 0, high = sum;
        while(low < high)
        {
            long long mid = low + (high - low) / 2;

            if(possibleDefeating(monsters, arr, mid))
            {
                high = mid;
            }
            else
                low = mid + 1;
        }
        return high;
    }
};
```


---

## **1109. Corporate Flight Bookings**


```c++
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {

    //This is a simple implementation of the differnce array pattern
    vector <int> arr(n, 0);

    for(auto p : bookings)
    {
        int first = p[0] - 1;
        int second = p[1] - 1;
        int seats = p[2];

        arr[first] += seats;
        if(second != n - 1)
            arr[second + 1] -= seats;
    }    

    for(int i = 1; i < n; i++)
        arr[i] += arr[i - 1];
    
    return arr;
    }
};
```


---

## **1094. Car Pooling**

Important to note that in this question, we subtract right at the to location, not at the next location, as at the to location the passengers drop off and hence the car becomes free at that location, so this is unlike normal difference array updation


```c++
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {

    //This is a diffference arary question for the range (from->min , to->max)
    //So we have to find the mini and maxi km first    
    //For this we can just do a single traversal first to get the min and max

    int n = trips.size();
    int mini = INT_MAX, maxi = INT_MIN;
    //This loop calculates the first pickup and the last stop
    for(auto t : trips)
    {
        mini = min(mini, t[1]);
        maxi = max(maxi, t[2]);
    }

    //This is a difference array which will store the number of poassengers at any distance between first pickup and last stop
    vector <long long> diff(maxi + 1, 0);

    for(auto t : trips)
    {
        diff[t[1]] += 1LL*t[0];
        //Important to note that in this question, we subtract right at the to location, not at the next location, as at the to location the passengers drop off and hence the car becomes free at that location, so this is unlike normal difference array updation
        diff[t[2]] -= 1LL*t[0];
    }

    for(int i = 0; i <= maxi; i++)
    {
        if(i != 0)
            diff[i] += diff[i-1];
        if(diff[i] > capacity)
            return false;
    }
    return true;
    }
};
```


---

## **848. Shifting Letters**

### Difference Array


```c++
class Solution {
public:
    string shiftingLetters(string s, vector<int>& shifts) {

    //Constraints show we cannot use a brute force approach
    //Only O(n) or O(nlogn) approach would work    

    //To handle ranges in O(N) the best approach is difference array
    int n = s.length();
    vector <long long> diff(n, 0);

    for(int i = 0; i < n; i++)
    {
        diff[0] += 1LL*shifts[i];
        if(i != n - 1)
            diff[i + 1] -= 1LL*shifts[i];
    }
    
    for(int i = 1; i < n; i++)
        diff[i] += diff[i - 1];

    string res = "";

    for(int i = 0; i < n; i++)
    {
        char ch = s[i];
        char shifted = 'a' + (s[i] - 'a' + diff[i]) % 26;

        res += string{shifted};
    }

    return res;
    }
};
```

### Optimal 


```c++
	class Solution {
public:
    string shiftingLetters(string s, vector<int>& shifts)
    {
        int shift = 0;
        for(int i = shifts.size() -1; i >=0; --i)
        {
            shift = (shift + shifts[i]) % 26;
            s[i] = 'a' + (s[i] - 'a' + shift) % 26;
        }
        return s;
    }
};
```


---

## **2381. Shifting Letters II**

This won’t work


```c++
char ch= s[i];//We are adding 26 to handle negative differencechar shifted='a'+(ch-'a'+ diff[i]+26)%26;
```


 //We need to separately normalize as diff[i] can be highly negative, so just adding 26 won't work


```c++
            int shift = (current_shift % 26 + 26) % 26;

            s[i] = 'a' + (s[i] - 'a' + shift) % 26;
```

           


```c++
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string shiftingLetters(string s, vector<vector<int>>& shifts) {
        int len = s.length();
        vector<int> diff(len + 1, 0); 

        for (const auto& p : shifts) {
            int val = (p[2] == 1) ? 1 : -1;
            diff[p[0]] += val;
            diff[p[1] + 1] -= val;
        }   

        int current_shift = 0;
        for (int i = 0; i < len; i++) {
            current_shift += diff[i];

            // We need to separately normalize as diff[i] can be highly negative, so just adding 26 won't work
            int shift = (current_shift % 26 + 26) % 26;

            s[i] = 'a' + (s[i] - 'a' + shift) % 26;
        }

        return s;
    }
};
```


---

