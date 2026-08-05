# Category 1


## Expand while valid

Examples

- Maximum Consecutive Ones
- Max Consecutive Ones III
- Longest Repeating Character Replacement
- Longest Substring Without Repeating Characters
- Fruits Into Baskets
Pattern


```plain text
Expand

Window became invalid?

Shrink until valid

Update answer
```

Template


```plain text
for(right=0;right<n;right++){add(s[right]);while(windowisinvalid)remove(s[left++]);ans=max(ans,right-left+1);
}
```

Notice

**Expand first.**

Shrink only if needed.


---

# Category 2


## Expand until condition satisfied

Examples

- Minimum Window Substring
- Smallest Subarray with Sum ≥ K
Pattern


```plain text
Expand

Window satisfies requirement?

Try shrinking

Update minimum
```

Template


```plain text
for(right=0;right<n;right++){add();while(windowisvalid){ans=min(ans,...);remove(left++);
    }
}
```

Notice

Here shrinking is GOOD.

Because we want minimum.


---

# Category 3


## Fixed-size window

Examples

- Repeated DNA
- Maximum Average Subarray
- K Radius Average
Window size never changes.


```plain text
Expand

If size > k

remove left

answer
```


---

# Category 4


## Multiple constraints

Very rare.

Mostly hard problems.

Like


```plain text
Exactly K distinct
```

Usually solved using


```plain text
AtMost(K)-AtMost(K-1)
```

Don't worry about these yet.

