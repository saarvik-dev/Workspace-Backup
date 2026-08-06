# 📘 Monotonic Stack — Template & Conditions



---

## 🔹 Core idea (1 line)


---

# ✅ UNIVERSAL TEMPLATE (most important)



```c++
stack<int> st;

for (int i = 0; i < n; i++) {

    while (!st.empty() && CONDITION(st.top(), arr[i])) {
        st.pop();
    }

    st.push(arr[i]);
}

```

🔸 The **entire monotonic logic lies inside the while condition**.


---

# 🔥 CONDITIONS — REMEMBER THIS TABLE


This table is gold. Memorize it.


| Problem | Stack Type | While Condition |
| --- | --- | --- |
| Next Greater Element | Decreasing | st.top() < curr |
| Previous Greater Element | Decreasing | st.top() <= curr |
| Next Smaller Element | Increasing | st.top() > curr |
| Previous Smaller Element | Increasing | st.top() >= curr |




---

# 🧠 How to decide condition instantly


### Step 1

Ask: **Greater or Smaller?**

- Greater → decreasing stack
- Smaller → increasing stack

---

### Step 2

Ask: **Next or Previous?**

- Next → traverse →
- Previous → traverse ←

---

### Step 3

Equality rule:


| Case | Use |
| --- | --- |
| Strict (> or <) | NGE / NSE |
| Include equal (>= or <=) | PGE / PSE |



This avoids duplicates breaking answers.


---

# 📌 Templates (copy-paste ready)



---

## 1️⃣ Next Greater Element (right side)

Traverse: right → left

Stack: decreasing


```c++
vector<int> nge(n);
stack<int> st;

for (int i = n - 1; i >= 0; i--) {

    while (!st.empty() && st.top() <= arr[i]) {
        st.pop();
    }

    nge[i] = st.empty() ? -1 : st.top();
    st.push(arr[i]);
}

```


---

## 2️⃣ Previous Greater Element (left side)

Traverse: left → right

Stack: decreasing


```c++
for (int i = 0; i < n; i++) {

    while (!st.empty() && st.top() <= arr[i]) {
        st.pop();
    }

    pge[i] = st.empty() ? -1 : st.top();
    st.push(arr[i]);
}

```


---

## 3️⃣ Next Smaller Element

Traverse: right → left

Stack: increasing


```c++
for (int i = n - 1; i >= 0; i--) {

    while (!st.empty() && st.top() >= arr[i]) {
        st.pop();
    }

    nse[i] = st.empty() ? -1 : st.top();
    st.push(arr[i]);
}

```


---

## 4️⃣ Previous Smaller Element

Traverse: left → right

Stack: increasing


```c++
for (int i = 0; i < n; i++) {

    while (!st.empty() && st.top() >= arr[i]) {
        st.pop();
    }

    pse[i] = st.empty() ? -1 : st.top();
    st.push(arr[i]);
}

```


---

# 🚀 Index-based version (VERY IMPORTANT)


Many problems need **index**, not value

(e.g. Histogram, Temperatures, Stock Span)

Just push index instead:


```c++
stack<int> st; // stores indices

while (!st.empty() && arr[st.top()] < arr[i]) {
    st.pop();
}

```

📌 **Always remember**:


---

# ⏱ Time Complexity Proof


Each element:

- pushed once
- popped once
➡️ **Total operations ≤ 2n**

✅ Time = **O(n)**

✅ Space = **O(n)**


---

# 🧠 One-line memory trick


Smaller → increasing

Distance → store index

Write this on your rough sheet before solving.


---

If you want next, I can give you:

- 🔥 **Monotonic Queue template (sliding window max/min)**
- 🔥 **Histogram problem full intuition (most asked)**
- 🔥 **Daily Temperatures / Stock Span intuition**
- 🔥 **Practice problems in perfect order**
Just say which one.

