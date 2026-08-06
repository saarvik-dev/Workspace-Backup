## 1. What Sliding Window really is

Sliding Window is a way to process **a contiguous part of an array/string** efficiently.

Instead of re-computing things again and again for every subarray,

you **reuse work** by:

adding what enters the window

So the window *slides* forward.

This avoids the slow `O(n²)` approach of checking every possible subarray.


---

## 2. When should Sliding Window ring a bell?

A problem is almost always sliding window when you see:

- “**subarray**”
- “**substring**”
- “**contiguous**”
- “longest / shortest / maximum / minimum window”
- “at most k”, “exactly k”
- “no repeating”, “sum ≤ k”, “k distinct”, etc.
If the data must stay **in order**, and you are scanning left → right, it’s a sliding window candidate.


---

## 3. Core idea in one sentence

Expand it when possible.

Shrink it when it breaks the rule.

That’s it.


---

## 4. Two types of Sliding Window

### A) Fixed size window

Window size never changes.

Example pattern:

- “subarray of size k”
- “max sum of k elements”
- “average of k numbers”
You:

1. Build the first window
1. Slide one step at a time
1. Remove left, add right

---

### B) Variable size window (the real power)

Window size changes based on a **condition**.

You have:

- `left` pointer
- `right` pointer
You:

1. Expand `right` to include new elements
1. If the window becomes invalid → move `left` to fix it
1. At every valid state, update your answer
This is used for:

- longest substring without repeating characters
- smallest window with sum ≥ target
- at most k distinct elements
- etc.

---

## 5. Why Sliding Window is fast

Every element:

- enters the window once
- leaves the window once
So total operations = **O(n)**

Not O(n²).

This is the biggest reason interviewers love it.


---

## 6. The mindset while solving

While coding sliding window, you should constantly think:

- What makes my window **valid**?
- What breaks it?
- When it breaks, how do I fix it?
If you can answer those 3, the solution writes itself.


---

## General Template


```javascript
int n = arr.size();

int l = 0;              // left pointer
int ans = 0;            // result (max/min/count etc.)

for (int r = 0; r < n; r++)
{
    // 1️⃣ include arr[r] into window
    // update frequency / sum / data structure
    add(arr[r]);

    // 2️⃣ shrink window until it becomes valid
    while (!isValid())
    {
        remove(arr[l]);
        l++;
    }

    // 3️⃣ now window [l, r] is valid
    ans = max(ans, r - l + 1);   // or other logic
}
```

## General Expanding Template (Anchor at l)


```javascript
int n = arr.size();

int r = 0;   // expanding pointer
int ans = 0;

for (int l = 0; l < n; l++)
{
    // expand r as far as possible
    while (r < n && isValid(l, r))
    {
        add(arr[r]);
        r++;
    }

    // now r is invalid OR r == n
    // valid window = [l, r-1]

    ans = max(ans, r - l);

    // before moving l forward, remove its contribution
    remove(arr[l]);
}
```

