
---


```javascript
int left = 0, right = 0;
while (right < n) {
    // 1. Add right element to state
    // 2. While (state is invalid) -> shrink left, remove left element
    // 3. Update result
    right++;
}
```

## 🟢 Easy / Warm-up (Fixed Window)

These help you get the basic "add-subtract" rhythm down.

- [x] **643. Maximum Average Subarray I**: The "Hello World" of sliding window.
- [x] **1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold**: Simple fixed-size window logic.
- [ ] **219. Contains Duplicate II**: Uses a window of size $k$ combined with a Hash Set.
- [x] **1876. Substrings of Size Three with Distinct Characters**: Good for practicing window constraints.
## 🟡 Medium (The "Bread and Butter")

These are the most common interview favorites. Focus on the **two-pointer** expansion and contraction.

- [ ] **3. Longest Substring Without Repeating Characters**: Classic variable window. Expand until a duplicate, then shrink.
- [ ] **1004. Max Consecutive Ones III**: A "flip" problem. Expand until you've used $k$ flips, then shrink.
- [x] **438. Find All Anagrams in a String**: Fixed window using a frequency map (array of size 26).
- [x] **567. Permutation in String**: Nearly identical to #438—great for reinforcement.
- [ ] **424. Longest Repeating Character Replacement**: Requires tracking the `maxFrequency` of a character in the current window.
- [x] **209. Minimum Size Subarray Sum**: The classic "shrink until the condition isn't met" problem.
- [x] **1493. Longest Subarray of 1's After Deleting One Element**: Similar to Max Consecutive Ones, but specifically for one deletion.
- [x] **904. Fruit Into Baskets**: A "Longest Subarray with at most 2 distinct elements" problem in disguise.
- [x] **1248. Count Number of Nice Subarrays**: Introduction to the "AtMost(K) - AtMost(K-1)" trick.
- [x] **1358. Number of Substrings Containing All Three Characters**: Teaches you how to count valid substrings efficiently.
- [x] **1658. Minimum Operations to Reduce X to Zero**: A "reverse" sliding window problem (find the longest subarray that sums to `TotalSum - X`).
## 🔴 Hard (The FAANG Level)

These often combine sliding window with other data structures like Deques or Heaps.

- [ ] **76. Minimum Window Substring**: The ultimate sliding window boss. Requires a frequency map and a "match" counter.
- [ ] **239. Sliding Window Maximum**: Requires a **Monotonic Deque**. Essential for high-level rounds.
- [ ] **992. Subarrays with K Different Integers**: Master the `exact(K) = atMost(K) - atMost(K-1)` formula here.
- [ ] **30. Substring with Concatenation of All Words**: Complex fixed-window with a map of strings.
- [ ] **480. Sliding Window Median**: Uses two heaps (or a multiset) to track the median as the window moves.

---

