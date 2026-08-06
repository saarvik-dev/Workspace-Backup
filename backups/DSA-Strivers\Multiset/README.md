# When `multiset` is Used in DSA


Common problems:

- **maintaining sorted duplicates**
- **sliding window median**
- **k largest/smallest elements**
- **frequency-based problems**
- **interval scheduling**
- **balanced container for greedy problems**
## `multiset` in C++ (STL)

A `multiset` is an ordered associative container in C++ that:

- stores **multiple elements with the same value**
- keeps elements **automatically sorted**
- is usually implemented using a **Red-Black Tree (self-balancing BST)**
It belongs to the **C++ Standard Template Library (STL)**.


---

# Key Properties



| Property | Description |
| --- | --- |
| Order | Elements are always sorted |
| Duplicates | Allowed |
| Implementation | Balanced Binary Search Tree |
| Access | No indexing like arrays |
| Complexity | O(log n) for insert, erase, search |




---

# Syntax



```c++
#include <set>

multiset<int> ms;
```

Example with duplicates:


```c++
multiset<int> ms = {5, 2, 2, 8, 5};
```

Stored internally as:


```plain text
2 2 5 5 8
```


---

# Basic Operations


## 1. Insert


```c++
ms.insert(10);
ms.insert(10);
```

Result:


```plain text
10 10
```

Duplicates are allowed.

Time complexity:


```plain text
O(log n)
```


---

## 2. Traversing


```c++
for(int x : ms)
{
    cout << x << " ";
}
```

Output example:


```plain text
2 2 5 5 8
```

Always **sorted order**.


---

## 3. Count Occurrences


```c++
ms.count(5);
```

If multiset = `{2,2,5,5,8}`

Output:


```plain text
2
```

Time complexity:


```plain text
O(log n) + number_of_duplicates
```


---

## 4. Find Element


```c++
auto it = ms.find(5);
```

Returns **iterator to the first occurrence**.


---

## 5. Erase

### Remove all occurrences


```c++
ms.erase(5);
```

If `{2,2,5,5,8}`

Result:


```plain text
2 2 8
```


---

### Remove only one occurrence


```c++
ms.erase(ms.find(5));
```

Result:


```plain text
2 2 5 8
```


---

## 6. Size


```c++
ms.size();
```


---

## 7. Lower Bound

First element **≥ value**


```c++
ms.lower_bound(5);
```


---

## 8. Upper Bound

First element **> value**


```c++
ms.upper_bound(5);
```


---

# Example Program



```c++
#include <iostream>
#include <set>
using namespace std;

int main()
{
    multiset<int> ms;

    ms.insert(5);
    ms.insert(1);
    ms.insert(5);
    ms.insert(3);

    for(int x : ms)
        cout << x << " ";

    cout << endl;

    cout << "Count of 5: " << ms.count(5) << endl;

    ms.erase(ms.find(5));   // erase only one 5

    for(int x : ms)
        cout << x << " ";
}
```

Output


```plain text
1 3 5 5
Count of 5: 2
1 3 5
```


---

# Difference: `set` vs `multiset`



| Feature | set | multiset |
| --- | --- | --- |
| Duplicates | ❌ Not allowed | ✅ Allowed |
| Order | Sorted | Sorted |
| Complexity | O(log n) | O(log n) |



Example:


```plain text
set:      1 2 3
multiset: 1 2 2 3
```


---

# Crux



---

A `multiset` is a **sorted container that allows duplicate values and supports O(log n) insert/delete/search using a balanced BST**.


---

If you want, I can also show you **3 extremely powerful tricks with **`multiset`** used in competitive programming and FAANG interviews** (like deleting elements in `O(log n)` while maintaining sorted order).

