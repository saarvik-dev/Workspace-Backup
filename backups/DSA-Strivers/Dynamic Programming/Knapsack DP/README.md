It is used whenever you have to **choose some items to maximize/minimize something while staying within a constraint**, usually weight, capacity, or budget.

The name comes from the classic problem:

# The DP State


The most common state is


```plain text
dp[i][w]
```

which means:

# Transition


For every item, there are only **two choices**.

## Don't take it


```plain text
dp[i][w] = dp[i-1][w]
```


---

## Take it (if possible)

If


```plain text
weight[i] <= w
```

then


```plain text
dp[i][w] =
value[i] + dp[i-1][w-weight[i]]
```

Take the maximum.


```plain text
dp[i][w] =
max(
    dp[i-1][w],
    value[i] + dp[i-1][w-weight[i]]
)
```

This is the entire algorithm.

# How to Recognize a Knapsack DP Problem


A problem is often a knapsack variant if you see:

- There are `n` items or choices.
- Each choice has a "cost" (weight, time, budget, etc.).
- There is a limit on the total cost.
- You want to maximize or minimize something.
- Each item is either taken or skipped (or taken multiple times in the unbounded version).
## Revision Notes

- **State:** `dp[i][w]` = best answer using the first `i` items with capacity `w`.
- **Choices:** For every item, either **skip it** or **take it** (if it fits).
- **Transition:** `dp[i][w] = max(skip, take)`.
- **0/1 Knapsack:** Iterate capacities **backwards** to avoid using an item more than once.
- **Unbounded Knapsack:** Iterate capacities **forwards** to allow reusing the same item.
- **Complexity:** `O(nW)` time. Space can be reduced from `O(nW)` to `O(W)` using a 1D DP array.
