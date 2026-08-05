The entire purpose of Digit DP is:

Suppose I ask:

# The Main Idea


Instead of generating numbers,

we generate **digits**.

Suppose


```plain text
N = 356
```

We build


```plain text
_ _ _
```

First digit


```plain text
0

1

2

3
```

Can't choose


```plain text
4

5

6...
```

because we'd exceed 356 immediately.

# State Design


Most Digit DP problems use


```plain text
dp[pos][tight][...]
```

So


```plain text
tight = true
```

means


---


```plain text
tight = false
```

means

Do whatever.

# Standard Skeleton


Almost every Digit DP looks like this.

Notice how every Digit DP shares the same structure.


```c++
long long solve(pos,
                tight,
                extraStates...)
{
    if(pos==digits.size())
        return valid?;

    if(dp exists)
        return dp;

    int limit =
        tight ? digits[pos] : 9;

    long long ans=0;

    for(int d=0; d<=limit; d++)
    {
        ans+=solve(
            pos+1,
            tight && d==limit,
            updatedStates...
        );
    }

    return ans;
}
```

Only the **extra state** changes.

# Range Queries


Most problems ask


```plain text
[L,R]
```

Digit DP solves


```plain text
count(0,R)
```

Then


```plain text
count(0,L-1)
```

Answer


```plain text
count(R)-count(L-1)
```

Exactly like Prefix Sum.

# Recognition Guide


Whenever you see


```plain text
How many integers...
```

or


```plain text
Count numbers...
```

between


```plain text
L

R
```

where

- digit sum...
- contains digit...
- divisible by...
- repeated digits...
- no adjacent equal digits...
- palindrome...
- odd/even digits...
- binary representation...
and


```plain text
R
```

can be


```plain text
10^12

10^18

10^100
```

Immediately think

# A Mental Model


Think of Digit DP as **Tree DP**.

For `N = 356`, you're exploring a decision tree:


```plain text
                 _
          /  |  |  \
         0   1  2   3
        /          \
      ...          ...
                   |
                  35
                 / | \
              350351352353354355356
```

The `tight` flag tells you:

- `tight = true` → You're on the boundary defined by `N`, so choices are restricted.
- `tight = false` → You've already gone below `N`, so every remaining digit can be `0`–`9`.
