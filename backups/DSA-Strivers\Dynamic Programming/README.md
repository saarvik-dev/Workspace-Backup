Though for some problems, forward recursion is the only bettter option (like where variable ending points are there, like in triangle problem).

# Trick for writing tabulation loops


if you are returning dp[a][b] in the memoization code, then the terminating conditions of your loops will also be a , b.

eg:  return dp[m][n];


```c++
//Base Cases
for(int i = 1; i <= m; i++)
{
		for(int j = 1; j <= n; j++)
		{
				....
		}
}
```

return dp[0][0]


```c++
//Base Cases
for(int i = m - 1; i >= 0; i--)
{
		for(int j = 1; j <= n; j++)
		{
				....
		}
}
```

                                                                                                                                ~*DP*

Forward Recursion — YAHAN SE AAGE KAISE JAUNGA

Backward Recursion — YAHAN TAK KAISE AAYA HOON

# Ways to Solve


1. Tabulation → Bottom up DP
1. Memoization  → Top Down DP
# Interview Need



![](../assets/3700eb7a-3bc3-80fd-acea-c02d1519ac32.png)

# Fibonacci Number


### Recursion Tree - *“Why DP here” - Overlapping Subproblems*


![](../assets/3700eb7a-3bc3-80d2-8ba1-d458b612c1ed.png)

- Whenever we end up solving same problems again and again, it is known as ***Overlapping Subproblems.***
- This is where something as ***Memoization*** jumps in.
# Memoization


- We tend to store the value of subproblems in some `map/table` 
- For example, in the above example we create a dp array of length 6 to store the value of f(n), whenever we encounter/compute f(n) for the first time, we store its value in the array, and when it is again needed, instead of computing it again, we fetch its value from the dp array.
### Converting recursive code to DP code

1. Create DP Array
1. Store value in DP Array whenever returning the value from the recursive code
1. Check if value for current index is already stored in a DP Array and fetch it.

![](../assets/3700eb7a-3bc3-80ab-9bf1-fb7fdfa5b79b.png)

## Complexities

   

# Tabulation


***ALGORITHM***

1. Declare a dp array
1. Initialize the array with the base cases (`dp[0] = 0`, `dp[1] = 1` in the above example)
1. In the recurrence relation, change f (function name) to dp (dp array name). Example, `f(n - 1) + f(n - 2)` changes to `dp[n - 1] + dp[n - 2]` and loop for all values except the base cases

![](../assets/3700eb7a-3bc3-806b-a557-dad63efaa03d.png)

## Complexities

# Further space optimization in the tabulation method


- In the above example, we can observe that we actually do not need an array, our task can be done with the help of just 2 variables - `prev` and `prev2`, this would reduce our space complexity to `O(1)`

![](../assets/3700eb7a-3bc3-80bb-9ab3-d7e3601ffdcf.png)

# Why Space Optimized DP ??


To answer your question directly: **Yes, it is exactly the same thing.** "Space-optimized tabulation" is just the fancy academic term for a smart iterative loop. If you write a space-optimized DP solution for the Fibonacci sequence, you end up with the exact same variables (`prev1` and `prev2`) that a first-year programming student would use to write a basic `while` loop.

So, if it is just normal iteration, why do we use all this complicated DP terminology?

### The Difference is the "Framework"

When you solve a simple problem (like Fibonacci) using normal iterative logic, your brain intuitively jumps straight to the most optimal solution. You don't need a framework.

However, DP is a **systematic framework** designed to help you solve overwhelmingly complex problems where your brain *cannot* naturally find that iterative logic.

The DP framework forces you to arrive at that optimal loop through a strict four-step progression:

1. **Recursion (Top-Down):** Find the mathematical recurrence relation.
1. **Memoization (Top-Down DP):** Add a cache to stop repeating the exact same recursive calls.
1. **Tabulation (Bottom-Up DP):** Flip the logic. Build an array and fill it from start to finish using a loop.
1. **Space Optimization:** Look at your loop. Realize that to calculate step $i$, you only ever look back at steps $i-1$ and $i-2$. Throw away the massive array and replace it with two variables.
### Why the Framework Matters

If you are asked to solve **The 0/1 Knapsack Problem** or **Edit Distance**, it is virtually impossible to just sit down and intuitively write out the "normal iterative logic" from scratch. The variables and state changes are too complex to hold in your head.

But if you follow the DP framework, you can methodically break down a terrifying problem into a recursive tree, turn that tree into a 2D matrix, and then logically optimize that matrix down into a simple, highly efficient 1D array loop.

You didn't invent a new type of loop; you just used a powerful framework to **discover** a loop that you never would have found otherwise. 

# How to approach DP Questions ?


When you're **learning DP**, the best approach is:

### 1. First think of the recursive solution

Don't even think about memoization initially.

Ask yourself:

- What are the choices available at each step?
- What parameters uniquely define a state?
- How can I express the answer in terms of smaller subproblems?
Write the pure recursive relation first.

For example, Fibonacci:


```c++
int fib(int n)
{
    if(n <= 1)
        return n;

    return fib(n - 1) + fib(n - 2);
}
```

Once you have this, DP becomes almost mechanical.


---

### 2. Identify overlapping subproblems

Draw a small recursion tree.

For `fib(5)`:


```plain text
fib(5)
├── fib(4)
│   ├── fib(3)
│   └── fib(2)
└── fib(3)
    ├── fib(2)
    └── fib(1)
```

Notice:

- `fib(3)` repeated
- `fib(2)` repeated
That's where memoization comes in.


---

### 3. Add memoization


```c++
vector<int> dp(n + 1, -1);

int fib(int n)
{
    if(n <= 1)
        return n;

    if(dp[n] != -1)
        return dp[n];

    return dp[n] = fib(n - 1) + fib(n - 2);
}
```

The recursion logic remains exactly the same.


---

### 4. Convert to tabulation (optional)

After memoization works:


```c++
dp[0] = 0;
dp[1] = 1;

for(int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];
```


---

## What strong DP solvers actually do

After solving 50-100 DP problems, they often:

1. Identify the state immediately.
1. Write the recurrence mentally.
1. Implement memoized recursion directly.
For example, if they see:

they instantly think:


```c++
solve(index, remaining_capacity)
```

and code memoization directly.

But this ability comes from first mastering recursive thinking.


---

## For your first 30-40 DP problems

Use this workflow every single time:


```plain text
Problem
   ↓
Find recursive state
   ↓
Write pure recursion
   ↓
Draw recursion tree
   ↓
Find repeated states
   ↓
Add memoization
   ↓
Convert to tabulation
```

If you skip the recursive step now, DP will feel like memorizing patterns. If you master the recursion first, DP becomes just **"recursion + caching."**

For someone starting DP, I would strongly recommend writing the pure recursive solution first, even if you know it will TLE. That's how you train the most important DP skill: deriving the recurrence.

# Rules to write any recurrence relations


- Divide the problem in indices
- Choose an index, and do all stuffs on that index
- Take the min/max or required…

When you write a recursive DP solution, you act like a detective arriving at a crime scene. You start at the end result (the final stone) and ask: **"How did I get here?"**

# Two Directional DP (2D)


## Explanation using the Question NINJA’S TRAINING


![](../assets/3720eb7a-3bc3-8091-9d06-e4ddfe457065.png)


![](../assets/3720eb7a-3bc3-802c-8e47-ddc7046403cf.png)

1. Day → Index
1. Top- Down
1. You can write recursion forward (0 to n-1) or backward (n - 1 to 0) as your wish.
1. Suppose you are at some day, where you have already choosen previous days things

![](../assets/3720eb7a-3bc3-80e0-bd3b-c90d95745d95.png)

1. To do stuff on the current index, we need to know what we did on the previous index, for that we can pass an extra parameter alongwith the recurrence relation.
1. `function(day, last) `

![](../assets/3720eb7a-3bc3-80fe-bb9e-f20702ce0c40.png)

### Recursive Version


![](../assets/3720eb7a-3bc3-809c-a77c-f0e3dd2ae025.png)


![](../assets/3720eb7a-3bc3-80cb-ac23-edc3f32680e4.png)

### Memoization Version

### Tabulation Version


![](../assets/3720eb7a-3bc3-807f-a0b2-c936c4dd768c.png)


---

# 3D DP


# Ninja and his friends



![](../assets/3730eb7a-3bc3-80d0-8a1e-fe356f3d9a64.png)

## Observations

1. Fixed Starting Point
1. Variable Ending Point
1. Mainly, we have to write recursion to get all possible paths of Alice and Bob.
1. Also we have to do the recursion for both together as they may pass through the same cell, which is given as an edge case.

![](../assets/3730eb7a-3bc3-8025-b3e9-c26062bdee6a.png)

- `f ( 0, 0,  0, m - 1 )`
## Simple Recursion - Code

### Base Condition


![](../assets/3730eb7a-3bc3-8047-8e89-e09455ad0b97.png)

### Exploring Paths


![](../assets/3730eb7a-3bc3-80ce-8a6d-e5f205767484.png)


![](../assets/3730eb7a-3bc3-80e1-9e2b-e3f89373e629.png)

## Memoization


![](../assets/3730eb7a-3bc3-80ee-85a4-d2ead9778a67.png)

## Tabulation (Not usually asked in interviews for 3D DP)


![](../assets/3730eb7a-3bc3-80c3-b2f8-f91680c3a3c8.png)


![](../assets/3730eb7a-3bc3-8045-8853-d62d52a20013.png)

## Space Optimization


![](../assets/3730eb7a-3bc3-805c-843f-f92107783dd0.png)

# DP on Subsequences



![](../assets/3740eb7a-3bc3-804d-908c-c16f6941acfb.png)

## Subsequences : 

Any `contiguous / non-contiguous` part of the array, but it must follow the order of elements in the array. 

## Algorithm

- Generate all subsequences and check if any of them gives the sum k
- To generate subsequences we can either use the Power Set technique using bit manipulation or the recursion way as in the combination sum problem using backtracking.
- But here, we need only one subset to confirm, hence we do not need to generate all subsequences.
- Hence, we will follow the recursion method to traverse through all subsequences.

![](../assets/3740eb7a-3bc3-80d3-a5ac-cf42108c796c.png)

## Standard pattern for DP on subsequences


![](../assets/3740eb7a-3bc3-80ad-92d7-f18d42e3cafa.png)

## Recursion Code


![](../assets/3740eb7a-3bc3-8076-9a5b-c47dec7d43c5.png)

## Memoization


![](../assets/3740eb7a-3bc3-806c-bbcb-ce942530b254.png)

## Tabulation


![](../assets/3740eb7a-3bc3-8099-8c8c-f65e40b32bea.png)


![](../assets/3740eb7a-3bc3-80d3-8c36-cadb0a55a010.png)

## Space Optimization


![](../assets/3740eb7a-3bc3-80b0-a662-dbe32b81a9a7.png)


---

# DP on Strings


i2 → i2  - 1

## What is a subsequence in a string ?


![](../assets/3750eb7a-3bc3-800e-b1a2-de3192901635.png)

## Longest Common Subsequence


![](../assets/3750eb7a-3bc3-8090-bcdc-ca04b796035f.png)

- The brute force will be exponential in nature, so it is not the correct approach.

![](../assets/3750eb7a-3bc3-8043-ba8c-c1c29a637de1.png)


![](../assets/3750eb7a-3bc3-8096-b6b6-e295619fe4da.png)


![](../assets/3750eb7a-3bc3-8096-a4d4-c3521e0c4185.png)

### Memoization


![](../assets/3750eb7a-3bc3-801e-b6ec-ebbadd375476.png)


![](../assets/3750eb7a-3bc3-80ea-88d3-e69aba6b4fa3.png)


![](../assets/3750eb7a-3bc3-807c-ba79-f2e891ed6343.png)

### Tabulation

In order to write tabulation , we do the shifting of index of the recursive code to eliminate negative indexes.


![](../assets/3750eb7a-3bc3-80d9-b418-e3590a469382.png)

### Space Optimization


![](../assets/3750eb7a-3bc3-80d4-9444-d8f44022e88b.png)


---

# DP on Stocks


# DP on LIS


# MCM DP | Partition DP


# DP on Trees


