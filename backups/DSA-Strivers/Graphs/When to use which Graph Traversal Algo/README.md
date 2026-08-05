This is one of the most important things to internalize in DSA. Instead of memorizing algorithms, memorize **the property of the graph**. The graph tells you which algorithm to use.


---

# 1. BFS (Breadth First Search)


### When to use

- **Unweighted graph**
- Every edge has equal weight (or weight = 1)
- Need the **minimum number of edges/steps**
### Why it works

BFS explores level by level, so the first time you reach a node, you've found the shortest path in terms of edges.

### Common problems

- Shortest path in an unweighted graph
- Grid shortest path
- Multi-source BFS
- Flood Fill
- Rotten Oranges
### Note


---

# 2. DFS (Depth First Search)


### When to use

- Explore an entire component
- Need recursion/backtracking
- Detect cycles
- Tree traversals
- Generate all possibilities
### Why it works

DFS completely explores one branch before trying another.

### Common problems

- Connected components
- Islands
- Cycle detection
- Topological Sort (DFS version)
- Backtracking
### Note


---

# 3. Topological Sort


### When to use

Only on a **DAG**.

### Why it works

Processes every node only after all its prerequisites have been processed.

### Common problems

- Course Schedule
- Dependency resolution
- DAG DP
- Longest path in DAG
- Build systems
### Note


---

# 4. Dijkstra


### When to use

- Weighted graph
- **All edge weights ≥ 0**
### Why it works

The closest unvisited node can never become closer later.

### Common problems

- Shortest weighted path
- Road networks
- Navigation
- Cheapest route
### Note


---

# 5. Bellman-Ford


### When to use

- Negative edge weights
- Need to detect negative cycles
### Why it works

Repeated relaxation eventually propagates the shortest distances.

### Common problems

- Currency exchange
- Negative-weight graphs
- Detecting negative cycles
### Note


---

# 6. Floyd-Warshall


### When to use

Need **shortest path between every pair of vertices**.

### Why it works

DP gradually allows intermediate vertices.

### Common problems

- All-pairs shortest paths
- Small dense graphs
### Note


---

# 7. Union Find (DSU)


### When to use

Need to answer:

### Why it works

Maintains components efficiently with path compression and union by rank/size.

### Common problems

- Number of components
- Kruskal
- Redundant Connection
- Dynamic connectivity
### Note


---

# 8. Kruskal


### When to use

Need the **Minimum Spanning Tree (MST)**.

### Why it works

Always picks the smallest edge that doesn't create a cycle.

### Common problems

- Connecting cities
- Minimum wiring cost
- MST
### Note


---

# 9. Prim


### When to use

Also for MST.

### Why it works

Starts from one node and keeps growing the MST using the cheapest outgoing edge.

### Common problems

- MST
- Dense graphs
### Note


---

# 10. DAG DP


### When to use

Graph is a DAG and the answer depends on previous nodes.

### Why it works

Topological order guarantees all dependencies are solved first.

### Common problems

- Longest path
- Counting paths
- DP on DAG
- Network Recovery Pathways
### Note


---

# 11. 0-1 BFS


### When to use

Edge weights are **only 0 or 1**.

### Why it works

Uses a deque instead of a priority queue:

- Weight 0 → push front
- Weight 1 → push back
### Common problems

- Binary-weight shortest paths
- Grid problems with free/paid moves
### Note


---

# Decision Tree (Memorize This)



```plain text
Graph Problem
│
├── Need traversal?
│      ├── Shortest path?
│      │      ├── Unweighted → BFS
│      │      ├── Weights 0/1 → 0-1 BFS
│      │      ├── Positive weights → Dijkstra
│      │      ├── Negative weights → Bellman-Ford
│      │      └── All-pairs shortest path → Floyd-Warshall
│      │
│      └── Just explore → DFS
│
├── DAG?
│      ├── Need ordering → Topological Sort
│      └── DP on graph → Topological Sort + DAG DP
│
├── Connectivity?
│      └── DSU
│
└── Minimum cost to connect all nodes?
       ├── Kruskal
       └── Prim
```

## A simple memory trick

Before choosing an algorithm, ask these questions in order:

1. **Is the graph weighted?**
- No → BFS/DFS
- Yes → Continue
1. **Can weights be negative?**
- Yes → Bellman-Ford
- No → Continue
1. **Are weights only 0 and 1?**
- Yes → 0-1 BFS
- No → Dijkstra
1. **Is it a DAG?**
- Yes → Think **Topological Sort + DAG DP** before anything else.
1. **Is the goal to connect all nodes with minimum total cost?**
- Yes → MST (Kruskal/Prim).

---

