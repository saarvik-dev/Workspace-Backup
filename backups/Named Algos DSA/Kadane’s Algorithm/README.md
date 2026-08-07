
---

# 1. The Core Intuition


The algorithm is built on a simple philosophy: **"Do not carry negative baggage."**

As you iterate through the array, you keep a running count of the current sum.

- **If the current sum is positive**, it contributes to future elements, so you keep it.
- **If the current sum drops below zero**, it will only "drag down" any future sum. Therefore, you discard the current sum (reset it to 0) and start a new sequence from the next number.
# 2. How it Works (Step-by-Step)


We maintain two variables:

1. `current_sum`: The sum of the subarray ending at the current position.
1. `max_sum`: The highest sum we have found so far.
**The Algorithm:**

1. Iterate through each number in the array.
1. Add the number to `current_sum`.
1. If `current_sum` is greater than `max_sum`, update `max_sum`.
1. If `current_sum` becomes negative, reset it to **0**.
# 3. Example Trace


Let's trace the array: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`


| Step | Element | Logic | current_sum | max_sum |
| --- | --- | --- | --- | --- |
| Start | - | Initialize | 0 | $-\infty$ |
| 1 | -2 | Sum becomes -2. Negative? Reset to 0. | 0 | -2 |
| 2 | 1 | Sum becomes 1. Update max. | 1 | 1 |
| 3 | -3 | Sum becomes -2 (1 + -3). Reset to 0. | 0 | 1 |
| 4 | 4 | Sum becomes 4. Update max. | 4 | 4 |
| 5 | -1 | Sum becomes 3 (4 + -1). Keep it. | 3 | 4 |
| 6 | 2 | Sum becomes 5 (3 + 2). Update max. | 5 | 5 |
| 7 | 1 | Sum becomes 6 (5 + 1). Update max. | 6 | 6 |
| 8 | -5 | Sum becomes 1 (6 + -5). Keep it. | 1 | 6 |
| 9 | 4 | Sum becomes 5 (1 + 4). Max is still 6. | 5 | 6 |



**Result:** The Maximum Subarray Sum is **6** (from the subarray `[4, -1, 2, 1]`).


---

# 4. Complexity Analysis


- **Time Complexity:** $O(n)$
- We traverse the array exactly once.
- **Space Complexity:** $O(1)$
- We only use two variables (`currentSum` and `maxSum`) regardless of the array size.
### Important Note on "All Negative Numbers"

If the array contains **only** negative numbers (e.g., `[-5, -2, -9]`), the standard logic above works perfectly because we initialize `maxSum` to `INT_MIN`.

1. First element `5`: `currentSum` becomes -5. `maxSum` updates to -5. `currentSum` resets to 0.
1. Second element `2`: `currentSum` becomes -2. `maxSum` updates to -2. `currentSum` resets to 0.
- **Result:** -2 (the largest single element).

---

