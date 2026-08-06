## 1. Core Idea

**Sliding Window = Two pointers maintaining a contiguous range**

Instead of recomputing every subarray/substring, maintain a **window **`[L, R]` and update it while moving across the array. (GeeksforGeeks)

Key idea:


```plain text
Old window → update → New window
```

This avoids recomputation and reduces **O(n²)** brute force to **O(n)**. (compilenrun.com)


---

# 2. When to Use Sliding Window


Use when the problem involves **contiguous elements**:

### Strong Indicators

- Subarray
- Substring
- Consecutive elements
- Window size **K**
- Longest / shortest / maximum / minimum subarray
- At most K / exactly K / at least K conditions
Typical problems:

- Maximum sum of size K
- Longest substring without repeating characters
- Smallest subarray ≥ target sum
- Longest substring with K distinct characters (compilenrun.com)

---

# 3. Sliding Window Classification


Sliding window problems fall into **4 major patterns**.


```plain text
Sliding Window
│
├─ 1. Fixed Size Window
├─ 2. Variable Size Window
├─ 3. Frequency / HashMap Window
└─ 4. Monotonic Window (Deque)
```


---

# 4. General Sliding Window Template


Almost every problem follows this skeleton.


```plain text
L = 0

for R in range(n):

    include element[R] into window

    while window invalid:
        remove element[L]
        L++

    update answer
```

Properties:

- `R` expands window
- `L` shrinks window
- Each pointer moves **≤ n times**
Time complexity:


```plain text
O(n)
```


---

# 5. Pattern 1 — Fixed Size Sliding Window


## Idea

Window size **K is constant**.

Example problems:

- Maximum sum subarray of size K
- Average of size K
- Count substrings of length K
- Maximum vowels in substring of size K

---

## Approach

1. Create first window and check result for **first K elements**
1. Slide window
1. Remove outgoing element   `arr[i-k]`
1. Add incoming element     `arr[i]`

---

## Pseudocode


```plain text
window_sum = 0

for i in range(k):
    window_sum += arr[i]

answer = window_sum

for i in range(k, n):

    window_sum += arr[i]        # add new element
    window_sum -= arr[i-k]      # remove old element

    answer = max(answer, window_sum)
```


---

## Complexity


```plain text
Time: O(n)
Space: O(1)
```


---

# 6. Pattern 2 — Variable Size Sliding Window


## Idea

Window **size changes dynamically** depending on condition.

Typical questions:

- Smallest subarray with sum ≥ target
- Longest substring with ≤ K distinct chars
- Longest substring without repeating characters

---

## Core Strategy


```plain text
Expand window → until condition satisfied
Shrink window → to optimize
```


---

## Pseudocode Template


```plain text
L = 0
sum = 0
ans = INF

for R in range(n):

    sum += arr[R]

    while sum >= target:
        ans = min(ans, R-L+1)
        sum -= arr[L]
        L += 1
```


---

## Key Idea

Window **expands until valid**, then **shrinks to optimal**.


---

# 7. Pattern 3 — Frequency / HashMap Window


Used when we must **track element frequency**.

Typical problems:

- Longest substring without repeating characters
- Longest substring with K distinct characters
- Find all anagrams in string
- Minimum window substring

---

## Tools Used


```plain text
HashMap / Array frequency
```


---

## Pseudocode


```plain text
map = {}
L = 0

for R in range(n):

    map[s[R]] += 1

    while window invalid:

        map[s[L]] -= 1
        if map[s[L]] == 0:
            remove key

        L += 1

    update answer
```


---

## Key Idea

Track **frequency inside window**.


---

# 8. Pattern 4 — Monotonic Sliding Window (Deque)


Used for **max/min in every window**.

Example:


```plain text
Sliding Window Maximum
```


---

## Key Trick

Maintain **monotonic deque**.

Deque stores **indices**.

Rules:


```plain text
Remove smaller elements from back
Remove out-of-window elements from front
```


---

## Pseudocode


```plain text
deque = []

for i in range(n):

    while deque and arr[deque.back] < arr[i]:
        deque.pop_back()

    deque.push_back(i)

    if deque.front <= i-k:
        deque.pop_front()

    if i >= k-1:
        answer.append(arr[deque.front])
```


---

## Complexity


```plain text
Time: O(n)
Space: O(k)
```

Each element enters and leaves deque once.


---

# 9. Important Subpatterns


## 1. At Most K

Used for longest substring problems.

Example:


```plain text
Longest substring with at most K distinct chars
```

Logic:


```plain text
expand → while distinct <= k
shrink → when distinct > k

//you might be thinking why,  so think of this example
current window
```


---

## 2. Exactly K

Trick:


```plain text
exactly(k) = atMost(k) - atMost(k-1)
```

Used in:


```plain text
Subarrays with exactly K distinct integers
```


---

## 3. Minimum Window Substring

Strategy:


```plain text
expand → until valid
shrink → until invalid
```

Keep track of **required characters**.


---

## 4. Binary Sliding Window

Problems like:


```plain text
max consecutive 1s with k flips
```

Logic:

Track **number of zeros in window**.


---

# 10. Sliding Window vs Two Pointers


Relationship:


```plain text
Sliding Window ⊂ Two Pointer technique
```

Difference:


| Two Pointer | Sliding Window |
| --- | --- |
| pointers may move independently | window maintained |
| elements between pointers irrelevant | window elements matter |
| example: pair sum | example: substring problems |



Community explanation:


---

# 11. When Sliding Window Fails


Sliding window requires **monotonic property**.

Meaning:


```plain text
Expanding window should not break previous logic unpredictably
```

Example where it fails:


```plain text
Subarray sum with negative numbers
```

Reason:

Negative numbers break window validity.

Better approach:


```plain text
Prefix Sum + HashMap
```


---

# 12. Sliding Window Problem Recognition Checklist


Ask these questions:

1️⃣ Is the data **contiguous**?

2️⃣ Do we need:


```plain text
longest / shortest / max / min
```

3️⃣ Is there **window size K**?

4️⃣ Can we update result **incrementally**?

If yes → Sliding Window candidate.


---

# 13. Most Important Sliding Window Problems


These cover **95% interview patterns**.

### Fixed Window

1. Maximum Sum Subarray K
1. Maximum Average Subarray
1. Maximum Vowels in Substring K

---

### Variable Window

1. Minimum Size Subarray Sum
1. Longest Substring Without Repeating Characters
1. Longest Substring with K Distinct Characters
1. Fruit Into Baskets

---

### Frequency Based

1. Find All Anagrams
1. Minimum Window Substring
1. Subarrays with K Distinct

---

### Deque Based

1. Sliding Window Maximum

---

# 14. Mental Model (Very Important)


Think of sliding window like **camera frame moving over data**.


```plain text
[ L ........ R ]

Expand → include new element
Shrink → remove old element
Update → compute answer
```

Golden rules:

- never recompute window
- add one element
- remove one element
- update result

---

# 15. Time Complexity Analysis


Each pointer moves **at most N times**.


```plain text
R moves → n
L moves → n
```

Therefore:


```plain text
Total operations ≤ 2n
```

Final complexity:


```plain text
O(n)
```


---

# 16. Sliding Window Cheat Sheet



| Pattern | Window Type | Tool |
| --- | --- | --- |
| Max sum of size K | Fixed | running sum |
| Smallest subarray ≥ S | Variable | running sum |
| Longest substring unique | Variable | hashmap |
| At most K distinct | Variable | hashmap |
| Minimum window substring | Variable | hashmap |
| Sliding window max | Fixed | deque |




---

# Final Crux


Sliding window =


```plain text
1. Maintain window [L,R]
2. Expand right
3. Shrink left when needed
4. Track answer
```

If the problem has **contiguous elements + optimization goal**, sliding window likely applies.


---

If you want, I can also give you a **“Sliding Window Master Sheet” (10 patterns + 20 problems + templates)** that lets you solve **almost every LeetCode sliding window problem instantly.**


---

🔗 **References**
- GeeksforGeeks → https://www.geeksforgeeks.org/dsa/window-sliding-technique/?utm_source=chatgpt.com
- compilenrun.com → https://www.compilenrun.com/docs/fundamental/algorithm/problem-solving-patterns/sliding-window-technique/?utm_source=chatgpt.com
- compilenrun.com → https://www.compilenrun.com/docs/fundamental/algorithm/problem-solving-patterns/sliding-window-technique/?utm_source=chatgpt.com

