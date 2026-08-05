## The real rule (not a trick)

### 🔹 Use `low <= high` when

Examples:

- Search for `target`
- First occurrence
- Last occurrence
- Any exact value
Because:

So you must allow the loop to run when only **one element remains**.


---

### 🔹 Use `low < high` when

Examples:

- Find minimum in rotated array
- Peak element
- First bad version
- Smallest valid index
- Binary search on answer
Because:

You are shrinking a range until **only one candidate remains**.

The loop stops when:

`low == high`

and that index **is the answer**.


---

## Why this works (intuition)

### Case 1 — Search for a number

You need to test:


```plain text
[ ... x ... ]

```

So when only one element is left, you **must still check it** → `<=`.


---

### Case 2 — Find a boundary / minimum

You want to narrow down:


```plain text
[ ? ? ? answer ? ? ]

```

You are not checking elements;

you are moving **toward** the answer.

When only one remains, you are **done** → `<`.


---

## Rotated array example

### Search target


```c++
while (low <= high)

```

### Find minimum


```c++
while (low < high)

```

Because:

- In search, `mid` might be the target
- In min finding, `mid` helps decide **which side contains the pivot**

---

## One-line rule (memorize this)

**Searching for a boundary → **`<`

That rule works for **all** binary search problems.

