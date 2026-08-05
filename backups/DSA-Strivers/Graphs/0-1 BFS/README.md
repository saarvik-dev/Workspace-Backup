- Moving from one node to another, distances can be same or increase by one
- In 0-1 BFS, because distances differ by at most 1 after one relaxation, we can simulate this ordering with a `deque`** **instead of a `priority queue`
# The Magic Trick


If edge weight is 0 → Process it ***immediately ***→ Push it to the ***front***.


```plain text
dq.push_front(next);
```

If edge weight is 1 → Process it ***later*** → Push it to the ***back***.


```plain text
dq.push_back(next);
```

That's literally the whole algorithm.

# Time Complexity


Unlike Dijkstra


```plain text
Priority Queue

O(E log V)
```

0-1 BFS is


```plain text
O(V + E)
```

Same complexity as normal BFS.

# When should you recognize 0-1 BFS?


Whenever the problem says

- edge weight = 0 or 1
- obstacle removal cost is 0/1
- free road vs paid road
- direction change costs 0/1
- binary weights
Immediately think

