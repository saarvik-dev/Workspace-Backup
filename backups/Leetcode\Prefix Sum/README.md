## Prefix Sum — the real idea

**Prefix sum means:**

Instead of repeatedly adding elements for every subarray, you **store running totals** once and reuse them.


---

## Definition

Given array `A`


```plain text
A = [a0, a1, a2, a3, ...]

```

Define prefix sum array `P`:


```plain text
P[i] = a0 + a1 + a2 + ... + ai

```

Then sum of subarray `[l … r]` is:


```plain text
sum(l,r) = P[r] - P[l-1]

```

This turns:


```plain text
O(length of subarray)

```

into


```plain text
O(1)

```


---

## Core intuition

When solving subarray problems, brute force repeatedly recomputes:


```plain text
nums[l] + nums[l+1] + ... + nums[r]

```

Prefix sum avoids repetition by remembering:


```plain text
“Sum till here”

```


---

## How this becomes powerful in LeetCode

Most problems are of this form:

We rewrite:


```plain text
sum(l,r) = goal
P[r] - P[l-1] = goal
P[l-1] = P[r] - goal

```

So at each `r`, you ask:

That’s where a **hash map** comes in.


---

## Prefix sum + HashMap algorithm

We iterate once and store frequencies of prefix sums.


```plain text
mp[0] = 1
sum = 0
count = 0

for each element x:
    sum += x
    count += mp[sum - goal]
    mp[sum]++

```

This counts all subarrays ending at current index whose sum is `goal`.

Time: **O(n)**

Space: **O(n)**


---

## Why it works (intuition)

If:


```plain text
prefix sum at i = S
we want a subarray ending at i with sum = goal

```

We need:


```plain text
previous prefix sum = S - goal

```

So every time you see that value before, it forms a valid subarray.


---

## Where prefix sum is used in LeetCode

You use it when the problem says:

- “number of subarrays with sum K”
- “longest subarray with sum K”
- “subarrays divisible by K”
- “subarray with equal 0s and 1s”
- “count of nice subarrays”
- “binary subarrays with sum”
- “continuous subarray sum”
If the problem involves:

Prefix sum is almost always the tool.


---

## Why sliding window fails but prefix sum works here

Sliding window fails when numbers can be **0 or negative** (sum doesn’t move monotonically).

Prefix sum does not care about monotonicity — it relies only on arithmetic identity.

That’s why your brute force failed with zeros, but prefix sum handles them cleanly.


---

If you want, I can now map this exact logic to your `Binary Subarrays With Sum` problem in 5–6 lines of code.

