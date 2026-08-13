## **543. Diameter of Binary Tree**

Approach 1

O(n)


```c++
class Solution {
public:
    int diameter = 0;

    int height(TreeNode* root)
    {
        if(root == nullptr)
            return 0;
            
        int left = height(root->left);   
        int right = height(root->right);   

        diameter = max(diameter, left + right);

        return 1 + max(left, right);
    }

    int diameterOfBinaryTree(TreeNode* root) {

        height(root);
        return diameter;
    }
};
```


---

## **1372. Longest ZigZag Path in a Binary Tree**

The DFS state is `(node, expectedDirection, currentLength)`, where `expectedDirection` represents the direction that must be taken next to continue the current zigzag. At every node, two recursive calls are made: one continues the current zigzag by moving in the expected direction and increasing the length (`steps + 1`), while the other starts a new zigzag from the opposite child with length `1`. A common confusion is to think that starting a new zigzag from a child causes some paths to be skipped (e.g., `root → right → left → right`), but this does not happen because both recursive calls are explored. Another important point is that `goLeft` does **not** mean "the previous move was left"; it means "the next move should be left to continue the current zigzag". The algorithm explores all possible zigzag paths while maintaining the maximum length seen so far.


```c++
class Solution {
public:
    int pathLength = 0;
    void dfs(TreeNode* node, bool goLeft, int steps) {
        if (node == nullptr) {
            return;
        }
        pathLength = max(pathLength, steps);
        if (goLeft) {
            dfs(node->left, false, steps + 1);
            dfs(node->right, true, 1);
        } else {
            dfs(node->right, true, steps + 1);
            dfs(node->left, false, 1);
        }
    }

    int longestZigZag(TreeNode* root) {
        dfs(root, true, 0);
        return pathLength;
    }
};
```


---

## **687. Longest Univalue Path**

The Longest Univalue Path problem follows the same pattern as Diameter of a Binary Tree. For each node, DFS returns the length of the longest downward path consisting of nodes with the same value as the current node. After obtaining the longest same-value chains from the left and right children, a child contributes only if its value matches the current node's value. The current node can then act as a connecting point between the left and right chains, so the global answer is updated using `leftPath + rightPath`. However, when returning to the parent, only one chain can be extended further because a valid path cannot branch, so we return `max(leftPath, rightPath)`. Thus, the answer at a node may use both children, while the value returned upward uses only one, making this problem essentially a diameter computation with an additional same-value constraint.


```c++
class Solution {
public:
    int ans = 0;

    int dfs(TreeNode* root) {
        if (!root)
            return 0;

        int leftLen = dfs(root->left);
        int rightLen = dfs(root->right);

        int leftPath = 0;
        int rightPath = 0;

        if (root->left && root->left->val == root->val)
            leftPath = leftLen + 1;

        if (root->right && root->right->val == root->val)
            rightPath = rightLen + 1;

        ans = max(ans, leftPath + rightPath);

        return max(leftPath, rightPath);
    }

    int longestUnivaluePath(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
```


---

## **337. House Robber III**

## Recursion


```c++

class Solution {
private:
    int robber(TreeNode* node, bool canPick)
    {   
        if(node == nullptr)
            return 0;

        int pick = 0, notPick = 0;
        if(canPick)
        {
            pick = node->val
                + robber(node->left, false)
                + robber(node->right, false);

            notPick = robber(node->left, true)
                    + robber(node->right, true);

            return max(pick, notPick);
        }

        else
            return robber(node->left, true)
                    + robber(node->right, true);
    }
public:
    int rob(TreeNode* root) {
    //Intuition :
    //Pick only if it is not child of current node
    //Even if it is not child, it is not necessary to pick the child, as it may not lead to an optimal solution
    //Else do not pick

    //If we pick current, then we cannot choose their children, else we can choose their children
    //We need a variable which tracks whether we can pick current nodes or not according to whether the parent was picked or not

    return robber(root, true);
    }
};
```

## HashMap Memoization


```c++
class Solution {
private:
    unordered_map<TreeNode*, vector<int>> dp;

    int robber(TreeNode* node, bool canPick)
    {
        if(node == nullptr)
            return 0;

        if(dp.find(node) == dp.end())
            dp[node] = vector<int>(2, -1);

        if(dp[node][canPick] != -1)
            return dp[node][canPick];

        int ans;

        if(canPick)
        {
            int pick = node->val
                     + robber(node->left, false)
                     + robber(node->right, false);

            int notPick = robber(node->left, true)
                        + robber(node->right, true);

            ans = max(pick, notPick);
        }
        else
        {
            ans = robber(node->left, true)
                + robber(node->right, true);
        }

        return dp[node][canPick] = ans;
    }

public:
    int rob(TreeNode* root)
    {
            //Intuition :
    //Pick only if it is not child of current node
    //Even if it is not child, it is not necessary to pick the child, as it may not lead to an optimal solution
    //Else do not pick

    //If we pick current, then we cannot choose their children, else we can choose their children
    //We need a variable which tracks whether we can pick current nodes or not according to whether the parent was picked or not
    return robber(root, true);
    }
};
```

### ***Important Pair solution***

The **pair-returning Tree DP** solution computes both possible states for every node in a single DFS. `dfs(node)` returns `{notRob, rob}`, where `notRob` is the maximum money when the current node is not robbed and `rob` is the maximum money when it is robbed. If we rob the current node, both children must be in their `notRob` state, so `rob = node->val + left.first + right.first`. If we do not rob the current node, each child can independently choose whichever state gives more money, so `notRob = max(left.first, left.second) + max(right.first, right.second)`. We return both states to the parent because the parent may need either one. At the root, there is no restriction, so the answer is `max(notRob, rob)`. This is preferred over the hashmap approach because the two states are fixed and can be computed directly and returned through DFS, eliminating explicit memoization and keeping the solution simple. Each node is processed once, giving **O(n) time** and **O(h) recursion-stack space**.


```c++
class Solution {
private:
    pair<int, int> dfs(TreeNode* node)
    {
        if (node == nullptr)
            return {0, 0};

        auto left = dfs(node->left);
        auto right = dfs(node->right);

        // Rob current node -> cannot rob children
        int rob = node->val
                + left.first
                + right.first;

        // Don't rob current node -> children choose best option
        int notRob = max(left.first, left.second)
                   + max(right.first, right.second);

        return {notRob, rob};
    }

public:
    int rob(TreeNode* root)
    {
        auto ans = dfs(root);

        return max(ans.first, ans.second);
    }
};
```

