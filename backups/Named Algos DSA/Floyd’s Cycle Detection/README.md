Proof

Here are the **clean, exam-ready equations** you can copy directly into your notes. No extra words, just the math + one-line meaning.


---

## Floyd’s Cycle Detection – Equations

Let:

- `A` = distance from **head → start of cycle**
- `C` = **length of the cycle**
- `X` = distance from **cycle start → meeting point**
- `S` = distance traveled by **slow pointer**

---

### Pointer distances

- Slow pointer distance:

```plain text
S = A + X
```

- Fast pointer distance:

```plain text
2S
```


---

### Meeting condition

Since slow and fast meet inside the cycle:


```plain text
2S − S = k × C
```


```plain text
S = k × C
```

where `k ≥ 1` is an integer.


---

### Substitute slow distance


```plain text
A + X = k × C
```


---

### Rearranged form


```plain text
A = k × C − X
```


---

### Interpretation

In a cycle:


```plain text
k × C − X  ≡  distance from meeting point → cycle start
```


---

### Final conclusion


```plain text
distance(head → cycle start)
=
distance(meeting point → cycle start)
```


---

### Algorithmic result

After the first meeting:

- Move one pointer to `head`
- Move both pointers **one step at a time**
- They meet at the **cycle starting node**

---

### One-line summary (optional for notes)

