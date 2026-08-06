
---

## 1. How to Remove a Key

There are three primary ways to use `erase()`, but the most common for your use case is passing the **key** directly.

### Option A: By Key

This is the simplest method. It removes the element (if it exists) and returns the number of elements removed (either 1 or 0).

C++

# 


`std::unordered_map<string, int> myMap = {{"A", 1}, {"B", 2}};
myMap.erase("A"); // Removes the key "A"`

### Option B: By Iterator

If you already have an iterator (for example, from a `find()` call), you can pass it to `erase()`. This is often more efficient if you've already checked for the key's existence.

C++

# 


`auto it = myMap.find("B");
if (it != myMap.end()) {
    myMap.erase(it);
}`


---

## 2. Time Complexity

Since an `unordered_map` is implemented as a **Hash Table**, the time complexity depends on the quality of the hash function and the number of "collisions."

- **Average Case:** $O(1)$ (Constant time). In a well-distributed hash table, finding and removing a key takes a single step regardless of the size $n$.
- **Worst Case:** $O(n)$ (Linear time). This occurs during **hash collisions**, where all keys hash to the same "bucket," turning the bucket into a linked list.

---

## 3. Important Implementation Tips

- **Iterator Invalidation:** When you call `erase()`, only the iterator pointing to the erased element is invalidated. All other iterators remain valid.
- **Return Value:** The version of `erase(key)` returns the number of elements removed. This is a handy way to check if a deletion actually happened without calling `find()` or `count()` first.
- **Memory:** Removing a key does not necessarily trigger a "rehash" or reduce the number of buckets immediately, though it does free the memory associated with the specific key-value pair.

---

## Summary for Your Placements


| Operation | Average Complexity | Worst-Case Complexity |
| --- | --- | --- |
| map.erase(key) | $O(1)$ | $O(n)$ |
| map.erase(iterator) | $O(1)$ | $O(1)$ |



