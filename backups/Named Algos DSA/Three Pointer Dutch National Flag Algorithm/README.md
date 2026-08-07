The **Dutch National Flag algorithm** (also called the **three-pointer technique**) is a **single-pass, in-place, O(n)** algorithm used to **partition an array into three sections**.

I’ll be **precise and exam/interview-level clear**.


---

## Problem it solves

Given an array containing **only three distinct values**, typically:

- `0`, `1`, `2`
(or `< pivot`, `= pivot`, `> pivot`)

Rearrange it so that:


```plain text
[ all 0s | all 1s | all 2s ]

```

**Order inside each group does not matter.**


---

## Core idea (invariant)

We maintain **three pointers** that divide the array into **four regions**:


```plain text
0 ........ low-1 | low ........ mid-1 | mid ........ high | high+1 .... n-1
      0s                 1s               unknown               2s

```

### Pointer meaning

- `low` → next position for `0`
- `mid` → current element under inspection
- `high` → next position for `2`

---

## Initialization


```c++
low = 0;
mid = 0;
high = n - 1;

```


---

## Rules (THIS IS THE ALGORITHM)

While `mid <= high`:

### Case 1️⃣: `a[mid] == 0`

- Swap with `a[low]`
- Move both forward

```c++
swap(a[low], a[mid]);
low++;
mid++;

```

**Why?**

0 belongs to the left section, and what comes from `low` is already processed.


---

### Case 2️⃣: `a[mid] == 1`

- Already in correct middle section
- Just move `mid`

```c++
mid++;

```


---

### Case 3️⃣: `a[mid] == 2`

- Swap with `a[high]`
- Move `high` backward
- **DO NOT move **`mid`

```c++
swap(a[mid], a[high]);
high--;

```

**Why not **`mid++`**?**

The swapped element from `high` is **unclassified**, must be checked again.


---


---

## Walkthrough example

Input:


---

## Time & Space Complexity

- **Time:** `O(n)` (single pass)
- **Space:** `O(1)` (in-place)

---


---

## Interview-level insights (VERY important)

1. **Invariant matters more than code**
1. The reason `mid` does **not move** in case `2`
1. Works only when:
- Number of distinct values = **3**
- Values are known beforehand

---

## Generalization

For:

- **2 values** → two pointers
- **3 values** → Dutch National Flag
- **>3 values** → counting / bucket / sort
