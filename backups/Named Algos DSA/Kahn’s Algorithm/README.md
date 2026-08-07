**Kahn's Algorithm** is **a Breadth-First Search (BFS) based approach used to find the topological ordering of a Directed Acyclic Graph (DAG)**. It works by repeatedly finding and removing nodes with zero incoming dependencies and is widely used in task scheduling and dependency resolution. 

## BFS / Kahn’s Algorithm

- This is the most intuitive approach.
-  It uses a Queue and tracks "in-degrees" (number of incoming edges to a node).
- Uses an indegree array
- Note that there will be minimum one node whose indegree is zero (since the graph is acyclic).
### Algorithm

1. Find indegree of all nodes and mark it in the indegree array.
1. Insert all nodes with indegree `zero` in the queue.
1. Now traverse though the queue until its empty.
1. Pop a node, add it to your final answer, and "delete" its outgoing edges to its neighbors. By deletion we mean reducing its indegree by one is the indegree array. 
1. If any neighbor’s indegree now drops to `0` , push it into the queue.
1. Repeat until the queue is empty.

![](../../assets/36d0eb7a-3bc3-8064-a0f3-dc29949ced23.png)

