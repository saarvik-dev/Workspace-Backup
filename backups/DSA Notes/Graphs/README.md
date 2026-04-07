
![](../../assets/31c0eb7a-3bc3-8060-a091-d74b4e984ca6.png)


![](../../assets/31c0eb7a-3bc3-80e4-becc-e873306a1fc6.png)

- The nodes are generally numbered in arbitrary order
- For ex  : `V or N = 5`
- We can have unidirectional , monodirectional or bidirectional edges.
- Binary Tree is also a graph
# Cycle 


If you start at a node and end at the same node, we call it a cycle.

A non cyclic graph is known as an acyclic graph.

# Path


- Can contain a lot of nodes and all of them are reachable.
- A node cannot appear twice in a path.
# Degrees in a Graph


## ***Undirected Graph***

The number of edges attached to a  node.

### Property of Degree

The total degree of a graph is equal to twice the number of edges in it.

*Reason** : Every edge is associated with two nodes*

## *Directed Graph*

### Indegree

Number of edges going inside of a node

### Outdegree

The number of edges coming out of a node

# Edge Weights


- Generally, the question will itself assign weights to each edge.
- If not given, always assume unit weights.

---

# Representation of Graph in C++


*What is given in question ?*

- n → nodes, m → edges
- directed/ undirected
- If not given what is what, assume first value to be nodes, second to be edges
- Also m lines of pair of numbers will be given representing the nodes having an edge between them (both ways in an undirected graph) 
- n will be constant, but m can be anything

![](../../assets/31c0eb7a-3bc3-803b-b202-f45233f80d79.png)

So basically for this graph


![](../../assets/31c0eb7a-3bc3-80e7-acd8-c2a44ce2c812.png)

Input will be given like this


![](../../assets/31c0eb7a-3bc3-8020-8c48-f5bc51f04c43.png)


---

# Now how to store (For undirected graph with 1-Based Indexing ? 


## *1. Matrix Way*

- First we need to check whether indexing is zero based or one based.
- If it is one based, create an adjacency matrix, `adj[n + 1][n + 1]`
- Now, place 1 at all positions where edge is there between the numbers for example (both a-b, b-a)                                     
- All others can be left as it is, or can be filled with zeroes                                                   

![](../../assets/31c0eb7a-3bc3-8004-9353-eae7cd548fd5.png)

- Space Complexity - O(N X N), which is quite costly 

```javascript
	int n, m;
  cin >> n >> m;

  int adj[n + 1][n + 1];

  for (int i = 0; i < m; i++)
  {
      int u, v;
      cin >> u >> v;
      adj[u][v] = 1;
      adj[v][u] = 1;
  }
```

## *2. List Way*

- We create a list of adjacency `vector <int> adj[n + 1]`
- We will store the neighbors of each node in this adjacency list / the directly connected nodes you can say

![](../../assets/31c0eb7a-3bc3-80be-96fc-f7d24a25896c.png)

- Space taken O(2 *  number of edges), which is much much better than O(N * N)

```javascript
  int n, m;
  cin >> n >> m;

  vector<int> adj[n + 1];

  for (int i = 0; i < m; i++)
  {
      int u, v;
      cin >> u >> v;
      adj[u].push_back(v);
      adj[v].push_back(u);
  }
```

# Storing a Weighted Graph ?


## ***Matrix Way***

Similar to above, just a slight change, now in place of one everywhere, we will  write the edge weight for that particular pair in the adjacency matrix.

Basically, now `adj[u][v] = weight` and `adj[v][u] = weight`  now. 

## ***List Way***

Now, instead of just the neighbors, we still store the weight also, by using `pair` , we will insert a pair containing the ` { neighbour, wt .of that edge}`  i.e. `vector<pair<int, int>> adj[n + 1]`


---

# CONNECTED COMPONENTS



![](../../assets/31c0eb7a-3bc3-8093-a469-f1f87aa03a81.png)

- Because of this, whenever we use any traversal method, we have to use something called `visited array` of size `n + 1` 

![](../../assets/31c0eb7a-3bc3-806d-a2e4-cba1e9ab720e.png)

- If the node is not visited, we will call the traversal algorithm from that node
- Inititially we will flag all as unvisited / false.
- The traversal algos are such designed that they will traverse the entire connected portions of that component of the graph.

---

# TRAVERSAL TECHNIQUES


## *BFS(Breadth First Search) / Level Wise Traversal*

- Traversal level by level
- Traversal in one level can be in any order
- What if the starting node is somewhere in between
- Note than only one node can be at level zero
- Then we need to use the equivalent distance method 
### *Initial Configuration for BFS*

- Take a queue data structure and add the starting node to it.
- Create an array `visitedArray` of size n + 1, if graph is 1 indexed
- Whatever is the starting node, mark it as one in the visited array, all others will be marked as zero
***Next Steps***

- We know that the graph is stored in a adjacency list (we need to create this first)    
- Whatever is in the queue we start taking it out and print it until the queue is not empty
- Whenever we take out the front element from the queue, we ask *“who are your neighbors”*  which is known through the adjacency list ?
- Now, add all its neighbors one by one *only if they have not been visited yet*, also flagging them as 1 in the `visited array`
- Now follow the same steps as above for the newly added neighbourers.
### BFS Code


![](../../assets/31c0eb7a-3bc3-8039-a220-d3c47828c3fc.png)

### Complexities

**SC **: O(3N)

**TC **: O(N) + O(2 * Edges)

THOSE WHO ARE WORDERING WHY IT IS  O(N) + O(2E) NOT O(N*2E)

For each node, the while loop runs multiple times based on the number of edges connected to that node. Here's how it works:

In the first iteration, the loop runs for e1 edges, plus one extra operation for pushing and popping the node.
In the second iteration, it runs for e2 edges, plus one extra operation for pushing and popping, and so on.
Thus, the total time complexity is the sum of all iterations:

(e1 + e2 + ... + en) + (1 + 1 + ... n times).
The sum of all the edges connected to each node is equal to the total number of edges, which is 2E (since each edge is counted twice in an undirected graph). Adding the n push/pop operations gives the final complexity:

O(V + 2E) because e1 + e2 + ... + en = 2E.
So, the overall complexity is O(V + 2E), which simplifies to O(V + E).


---

## *DFS(Depth First Search)*


![](../../assets/31d0eb7a-3bc3-80e7-a05e-c5640443e3c4.png)


![](../../assets/31d0eb7a-3bc3-802e-877f-e6d15efd9c4d.png)


![](../../assets/31d0eb7a-3bc3-80f7-88f0-e0cfe7cbdf6c.png)

### *STEPS:*


![](../../assets/31d0eb7a-3bc3-8042-9fa5-dfa56bc842d1.png)

- Create a visited array and mark starting node as one in `visited array`
- Call the recursive function with the starting node `dfs(node)`
- Note that when graph is zero index we create adjacency list of size `n` not `n + 1`
### Pseudocode for recursive function


```javascript
dfs(node)
{
	visited_array[node] = 1;
	list.add(node);
	
	for( auto it : adj[node])
	{
		if(!visited_array[it])
			dfs(it);	
	}
}
```

### DFS Code


![](../../assets/31e0eb7a-3bc3-80eb-8e14-e4e14c154803.png)

### Complexities

SC : O(3N)

TC : O(N) + (2 * Edges)

