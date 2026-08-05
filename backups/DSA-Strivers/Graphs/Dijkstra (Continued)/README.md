# When should I think of Dijkstra?


Whenever you see these keywords:

- ✅ **Shortest path**
- ✅ **Minimum cost**
- ✅ **Minimum time**
- ✅ **Minimum effort**
- ✅ **Minimum distance**
- ✅ **Minimum weight**
and

- Edge weights are **non-negative**.
Immediately think:

# Difference


Use BFS when → All edges have same weights

Use Dijkstra when → Edges have different weights (positive), BFS fails here as shortest path in this case is not the path with the fewest edges.

# Standard Code



```c++
// Standard Dijkstra using adjacency list and min-heap.
//
// adj[u] contains pairs {v, weight}.
// Returns the shortest distance from src to every node.
vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src)
{
    const int INF = 1e9;

    vector<int> dist(n, INF);

    priority_queue<
        pair<int,int>,
        vector<pair<int,int>>,
        greater<pair<int,int>>
    > pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty())
    {
        auto [currDist, node] = pq.top();
        pq.pop();

        // Skip outdated entries. A better distance was found later.
        if (currDist > dist[node])
            continue;

        // Try relaxing all neighbors.
        for (auto [next, wt] : adj[node])
        {
            if (currDist + wt < dist[next])
            {
                dist[next] = currDist + wt;
                pq.push({dist[next], next});
            }
        }
    }

    return dist;
}
```

# The One Line to Remember


This line


```plain text
if(currDist + wt < dist[next])
```

is called

Everything in Dijkstra revolves around this line.

# Time Complexity


With


```plain text
Adjacency List + Priority Queue
```

Time


```plain text
O((V+E) log V)
```

This is the standard complexity you should remember.

