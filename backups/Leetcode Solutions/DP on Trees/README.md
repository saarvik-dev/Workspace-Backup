## **543. Diameter of Binary Tree**

### Approach 1

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

