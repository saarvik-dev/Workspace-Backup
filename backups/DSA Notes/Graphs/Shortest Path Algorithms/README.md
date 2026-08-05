- **Dijkstra's algorithm is necessary for graphs that can contain cycles because they can't be topologically sorted. In other cases, the topological sort would work fine as we start from the first node, and then move on to the others in a directed manner.**
# **Shortest Path in Undirected Graph with unit distance: G-28**


**Given an Undirected Graph having unit weight, find the shortest path from the source to all other nodes in this graph. In this problem statement, we have assumed the source vertex to be ‘0’. If a vertex is unreachable from the source node, then return -1 for that vertex.**

## Algo : BFS

- **BFS visits all nodes level-by-level (same level first), which ensures we always get the shortest path in terms of number of edges.**
- **Why BFS is used:**
- All edges have unit weight. So as we explore adjacent nodes, they are at a fixed increment of distance (1, 2, 3…).
- This behavior naturally fits BFS because the queue automatically ensures we’re processing closer nodes first.
- BFS acts like a sorted queue for level-wise distances, so we don’t need extra data structures like a min-heap (unlike Dijkstra).

```c++
class Solution {
public:
    // OPTIMIZATION: Passed adj by constant reference to avoid massive O(V+E) memory copies
    vector<int> shortestDistance(const vector<vector<int>>& adj, int src) {
        int n = adj.size();
        vector<int> dis(n, INT_MAX);
        
        queue<int> bfs;
        bfs.push(src);
        
        dis[src] = 0;
        
        while(!bfs.empty()) {
            int node = bfs.front();
            bfs.pop();
            
            for(int neighbor : adj[node]) { // Renamed 'it' to 'neighbor' for clarity
                if(dis[node] + 1 < dis[neighbor]) {
                    dis[neighbor] = dis[node] + 1;
                    bfs.push(neighbor); // BUG 1 FIXED: Pushing the updated node to the queue
                }
            }
        }
        
        vector<int> ans(n, -1);
        for(int i = 0; i < n; i++) {
            if(dis[i] != INT_MAX) { // BUG 2 FIXED: Checking the distance array, not the out-of-scope 'it'
                ans[i] = dis[i];
            }
        }
        
        return ans; // BUG 3 FIXED: Actually returning the answer
    }
};
```


---

# **Shortest Path in Directed Acyclic Graph Topological Sort: G-27**


**Problem Statement: Given a Directed Acyclic Graph of N vertices from 0 to N-1 and M edges and a 2D Integer array edges, where there is a directed edge from vertex edge[i][0] to vertex edge[i][1] with a distance of edge[i][2] for all i.
Find the shortest path from source vertex to all the vertices and if it is impossible to reach any vertex, then return -1 for that vertex. The source vertex is assumed to be 0.**

## But why TOPO Sort ?

- **You *****can***** use a normal queue (BFS) to solve this, but it will be horribly inefficient and fail interview time-complexity constraints.**
- Let's break down exactly *why* a normal queue fails on weighted graphs, and why Topological Sort acts as a mathematical cheat code for DAGs.
- In a weighted graph, standard **BFS** fails to efficiently find the shortest path because it wrongly assumes that fewer edges equal a shorter distance, which forces the algorithm to redundantly push nodes back into the queue whenever a cheaper path is found later. **Topological Sort** acts as a mathematical shortcut for Directed Acyclic Graphs (DAGs) by pre-sorting the nodes into a strict dependency timeline. By processing the nodes in this exact linear order, you guarantee that before you ever evaluate a node, every possible incoming path has already been locked in, allowing you to process each vertex and edge exactly once to achieve a flawless `O(V + E)` time complexity without ever doing the same work twice.

```c++
class Solution {
  private:
    // Helper function to perform DFS-based Topological Sort
    void topoSort(int node, vector<pair<int, int>> adj[], int vis[], stack<int> &st) {

      // Mark the current node as visited
      vis[node] = 1;

      // Traverse all adjacent nodes
      for (auto it : adj[node]) {

        // Get the target node from the pair
        int v = it.first;

        // If the node is not visited, call DFS on it
        if (!vis[v]) {
          topoSort(v, adj, vis, st);
        }
      }

      // Push the current node onto the stack after visiting all neighbors
      st.push(node);
    }

  public:
    // Function to find the shortest paths from node 0 to all other nodes
    vector<int> shortestPath(int N, int M, vector<vector<int>> &edges) {

      // Create adjacency list for the graph
      vector<pair<int, int>> adj[N];
      
      // Fill the adjacency list with edges
      for (int i = 0; i < M; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        int wt = edges[i][2];

        // Store (target node, weight)
        adj[u].push_back({v, wt});
      }

      // Initialize visited array to keep track of visited nodes
      int vis[N] = {0};

      // Stack to store the topological order
      stack<int> st;

      // Call topoSort for all unvisited nodes
      for (int i = 0; i < N; i++) {
        if (!vis[i]) {
          topoSort(i, adj, vis, st);
        }
      }

      // Initialize the distance vector with infinity
      vector<int> dist(N);
      for (int i = 0; i < N; i++) {
        dist[i] = 1e9;
      }

      // Distance to the source node (0) is 0
      dist[0] = 0;

      // Process all nodes in topological order
      while (!st.empty()) {
        int node = st.top();
        st.pop();

        // Relax all outgoing edges from the current node
        for (auto it : adj[node]) {
          int v = it.first;
          int wt = it.second;

          // Update distance if a shorter path is found
          if (dist[node] + wt < dist[v]) {
            dist[v] = wt + dist[node];
          }
        }
      }

      // Replace all unreachable nodes' distances with -1
      for (int i = 0; i < N; i++) {
        if (dist[i] == 1e9) {
          dist[i] = -1;
        }
      }

      // Return the final distance array
      return dist;
    }
};
```

Topological sorting itself just orders the vertices. But when you use that order to calculate shortest paths (by relaxing edges left to right), it becomes incredibly powerful.

- **Why it’s "better" when it works:** Because it processes nodes in a perfect dependency order, it guarantees that by the time you reach a node, you have already found the absolute shortest path to it. It never has to go back and check its work.

---

# Difference between Topo Sort and Dijkstra Algo



| Feature | Topological Sort (Shortest Path) | Dijkstra's Algorithm |
| --- | --- | --- |
| Graph Requirement | Directed Acyclic Graph (DAG) only | Any graph (Cycles are fine) |
| Edge Weights | Handles both positive and negative | Strictly non-negative only |
| Time Complexity | O(V + E) (Linear — Extremely Fast) | O((V + E) log V)(Slower) |



# **Dijkstra’s Algorithm - Using Set : G-33**


**Problem Statement: Given a weighted, undirected, and connected graph of V vertices and an adjacency list adj where adj[i] is a list of lists containing two integers where the first integer of each list j denotes there is an edge between i and j, second integers corresponds to the weight of that edge. You are given the source vertex S and You have to Find the shortest distance of all the vertex from the source vertex S. You have to return a list of integers denoting the shortest distance between each node and Source vertex S.
Note: The Graph doesn’t contain any negative weight cycle**

## Algorithm:

- Uses `set`, stores `{dist, node}`
- No queue used here 
- A `set` is preferred here over a priority queue because it allows easier replacement of older pairs with worse distances.
- Since sets store elements in sorted order, the node with the smallest distance is always processed first.

```c++
class Solution
{
    public:
        // Function to find the shortest distance of all the vertices
        // from the source vertex S.
        vector<int> dijkstra(int V, vector<vector<int>> adj[], int S)
        {
            // Create a set ds for storing the nodes as a pair {dist,node}
            // where dist is the distance from source to the node.
            // set stores the nodes in ascending order of the distances.
            set<pair<int, int>> st; 

            // Initialising dist list with a large number to
            // indicate the nodes are unvisited initially.
            // This list contains distance from source to the nodes.
            vector<int> dist(V, 1e9); 

            // Insert the source node with a distance of 0.
            st.insert({0, S}); 

            // Source initialised with dist = 0
            dist[S] = 0;

            // Traverse the graph until the set is empty
            while(!st.empty()) {
                // Extract the node with the minimum distance
                auto it = *(st.begin()); 
                int node = it.second; 
                int dis = it.first; 
                st.erase(it); 

                // Check for all adjacent nodes of the extracted node
                for(auto it : adj[node]) {
                    int adjNode = it[0];  // Adjacent node
                    int edgW = it[1];     // Weight of the edge
                    
                    // If the new distance is smaller, update it
                    if(dis + edgW < dist[adjNode]) {
                        // Erase the previous entry of the adjacent node
                        // if it was visited previously with a larger cost.
//IMP!!                  if(dist[adjNode] != 1e9) 
                            st.erase({dist[adjNode], adjNode}); 

                        // Update the distance for the adjacent node
                        dist[adjNode] = dis + edgW; 

                        // Insert the adjacent node with the updated distance into the set
                        st.insert({dist[adjNode], adjNode}); 
                    }
                }
            }

            // Return the list containing shortest distances
            // from source to all the nodes.
            return dist; 
        }
};
```


---

# **Dijkstra’s Algorithm - Using Priority Queue : G-32**


**Problem Statement: Given a weighted, undirected, and connected graph of V vertices and E edges, find the shortest distance of all the vertex's from the source vertex S.
Note: The Graph doesn't contain any negative weight cycle.**

Because the priority queue uses Lazy Deletion, it doesn't delete the bad paths; it just ignores them later. If you have an insanely dense graph (where $E$ is massively larger than $V$), the priority queue will fill up with dead paths. Its size can grow up to $E$, making the queue operations slightly slower: $O(E \log E)$.
A `set` physically deletes the old paths, meaning its size will never, ever exceed $V$. Its complexity is strictly $O(E \log V)$.
**The Bottom Line:** Unless you are dealing with a uniquely dense graph on a system with strict memory limits, always use a `priority_queue` for Dijkstra's algorithm. It is vastly faster in the real world.

- Here is a concise breakdown of the operational and performance differences between using a Priority Queue versus a Set for Dijkstra's Algorithm.

| Feature | std::priority_queue (Recommended) | std::set |
| --- | --- | --- |
| Underlying Structure | Binary Heap (backed by std::vector) | Red-Black Tree |
| Memory Layout | Contiguous (Array) | Scattered Nodes (Connected by pointers) |
| CPU Cache Locality | Excellent (Extremely fast hardware reads) | Poor (Frequent cache misses) |
| Path Update Method | Lazy Deletion (Push duplicate, ignore later) | Erase & Re-insert (Delete old, push new) |
| Operation Overhead | Low (Simple array index arithmetic) | High (Tree node rotation & rebalancing) |
| Dijkstra Complexity | $O(E \log V)$ | $O(E \log V)$ |
| Max Queue/Set Size | Up to $O(E)$ (Retains dead paths temporarily) | Strictly $O(V)$ (Deletes dead paths instantly) |
| Real-World Speed | Fastest (2x-3x faster due to constant factors) | Slower |
| Ideal Use Case | 99% of competitive programming & real-world tasks | Insanely dense graphs with extreme memory caps |




```c++
class Solution {
public:
    // Function to implement Dijkstra's Algorithm
    vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int src) {
        // Distance array initialized to large value
        vector<int> dist(V, 1e9);

        // Min-heap storing {distance, node}
        priority_queue<pair<int,int>, vector<pair<int,int>>, 
                       greater<pair<int,int>>> pq;

        // Distance to source is 0
        dist[src] = 0;

        // Push source into heap
        pq.push({0, src});

        // Process nodes until heap is empty
        while (!pq.empty()) {
            // Extract node with minimum distance
            int d = pq.top().first;
            int node = pq.top().second;
            pq.pop();

            // Skip if this distance is outdated
            if (d > dist[node]) continue;

            // Traverse all adjacent neighbors
            for (auto it : adj[node]) {
                int next = it.first;
                int wt = it.second;

                // Relaxation check
                if (dist[node] + wt < dist[next]) {
                    // Update distance
                    dist[next] = dist[node] + wt;

                    // Push updated distance into heap
                    pq.push({dist[next], next});
                }
            }
        }
        return dist;
    }
};
```


---

### **Dijkstra's Algorithm: The Reliable Generalist**

Dijkstra is a greedy algorithm. It always looks for the immediate closest unvisited node, assuming that the shortest path to a destination will be built from the shortest paths of its intermediate steps.

- **Why we need it:** Most real-world weighted graphs **have cycles**. Think of a road network, the internet, or flight routes—you can always drive or route data in a circle. Topological sort is useless here. Dijkstra handles cycles flawlessly.
- **The Catch:** To maintain its efficiency, it makes a strict assumption: adding an edge to a path can only *increase* the total distance. If you introduce negative edge weights, Dijkstra's "greedy" logic breaks down, and it will return incorrect paths.
- **The Speed Penalty:** Because it has to constantly sort and pick the "next closest" node out of all available options (usually using a Priority Queue/Min-Heap), it runs slower than a simple topological sweep.
### **Summary: Why one cannot just "do the work"**


If you tried to use **only Dijkstra**, you would unnecessarily waste processing power on DAGs (taking O((V + E)log V) instead of linear time), and your program would fail if those DAGs contained negative weights.
If you tried to use **only Topological Sort**, your program would crash the moment it encountered a real-world graph with a cycle (like a two-way street).
You use Topological Sort when the graph allows it (DAGs) because it is faster and more flexible with negative numbers. You fall back to Dijkstra when the graph contains cycles.

