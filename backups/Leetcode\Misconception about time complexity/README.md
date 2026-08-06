Both take the **same asymptotic time**, and the independent version is usually **clearer and safer**.

Now let’s explain *why*, very concretely.


---

## 1️⃣ Time complexity reality (the key point)

Let:

- Length of list A = `LA`
- Length of list B = `LB`
### Your simultaneous loop


```c++
while(ptr1 != nullptr || ptr2 != nullptr)

```

- `ptr1` moves `LA` times
- `ptr2` moves `LB` times
- Total pointer moves = `LA + LB`
### Independent loops


```c++
while(ptr1) { ... }   // LA steps
while(ptr2) { ... }   // LB steps

```

- Total pointer moves = `LA + LB`
👉 **Same number of operations. No reduction.**

There is **no hidden speed-up** from combining them.


---

## 2️⃣ Why it *feels* faster (but isn’t)

It *looks* like:

But CPUs don’t think in loops — they think in **operations**.

Whether you do:

- 2 loops of size `n`
- or 1 loop doing `n` work twice
➡️ the cost is the same.


---

## 3️⃣ What you actually lose by doing it simultaneously ⚠️

### A) Readability

This:


```c++
while(ptr1 || ptr2) {
    if(ptr1) { ... }
    if(ptr2) { ... }
}

```

is harder to reason about than:


```c++
while(ptr1) { ... }
while(ptr2) { ... }

```

Especially during:

- debugging
- interviews
- future revisions

---

### B

