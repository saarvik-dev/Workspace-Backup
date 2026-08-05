Related Question - 

https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/description/

# Tree DP Pattern: Returning Multiple Values using a Struct


Many tree problems require more than one piece of information from each subtree. Since a recursive function can normally return only one value, we create a custom `struct` (or class) to bundle all required information together and return it as a single object.


```c++
struct NodeInfo {
    bool isBST;
    int minVal;
    int maxVal;
    int sum;
};
```

A function such as:


```c++
NodeInfo dfs(TreeNode* root)
```

means that `dfs()` returns a `NodeInfo` object containing all information about the subtree rooted at `root`.

For example, in **Maximum Sum BST in Binary Tree**, every subtree must provide:

- `isBST` → whether the subtree is a valid BST.
- `minVal` → minimum value present in the subtree.
- `maxVal` → maximum value present in the subtree.
- `sum` → sum of all nodes in the subtree.
The parent receives this information using:


```c++
NodeInfo left = dfs(root->left);
NodeInfo right = dfs(root->right);
```

and can directly access:


```c++
left.isBST
left.minVal
left.maxVal
left.sum
```

to determine its own answer.

This pattern is called **Tree DP** because each node computes its result using information returned from its children. Whenever a tree problem requires multiple values from a subtree, create a struct containing all required information and return that struct from the DFS function.

### Recognition Pattern

If you find yourself needing multiple pieces of information from a child subtree, such as:

- height + diameter
- min + max
- sum + count
- BST validity + subtree sum
- robbed + not robbed
then a custom struct return type is usually the cleanest solution.

### Template


```c++
struct Info {
    // required fields
};

Info dfs(TreeNode* root) {

    if(root == nullptr)
        return base_case;

    Info left = dfs(root->left);
    Info right = dfs(root->right);

    Info curr;

    // compute current node's answer
    // using left and right information

    return curr;
}
```

**Key Idea:** A struct allows a DFS to return multiple values from a subtree, enabling efficient bottom-up Tree DP solutions in a single traversal.


---

🔗 **References**
- https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/description/ → https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/description/

