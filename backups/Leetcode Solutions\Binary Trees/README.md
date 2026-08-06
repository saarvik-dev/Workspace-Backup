## 144. Binary Tree Preorder Traversal

### *Recursive*


```javascript
class Solution {
public:
    //Recursive Solution
    void preorder(vector <int> &vec, TreeNode* curr)
    {     
        if(curr == nullptr)
            return;

        vec.push_back(curr->val);
        preorder(vec, curr->left);
        preorder(vec, curr->right);

    }

    vector<int> preorderTraversal(TreeNode* root) {
        
        vector <int> res;
        preorder(res, root);
        return res;
    }
};
```

### ***Iterative***


```javascript
class Solution {
public:

    //Iterative Approach
    vector<int> preorderTraversal(TreeNode* root) {

    //Print root and keep moving left and printing root/left , on encountering null go back to right side and print those

    vector <int> vec;

    if(root == nullptr)
        return vec;

    stack <TreeNode * > st;
    st.push(root);

    while(!st.empty())
    {
        root = st.top();
        st.pop();

        vec.push_back(root->val);

        if(root->right != nullptr)
            st.push(root->right);
        if(root->left != nullptr)
            st.push(root->left); 
    }

    return vec;
    }
};
```


---

## 94. Binary Tree Inorder Traversal

### Recursive


```javascript

class Solution {
private:
    void inorder(TreeNode* curr, vector <int> &res)
    {
        if(curr == nullptr)
            return;

        inorder(curr->left, res);

        res.push_back(curr->val);

        inorder(curr->right, res);
    }

public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector <int> ans;
        inorder(root, ans);
        return ans;
    }
};
```

### ***Iterative ( imp. as less intuitive)***

NOTE: IN this we don't add the root node in the stack initially, we just take a pointer to the root and move it leftwards.


```javascript
class Solution {
public:

    //Iterative solution using a stack
    vector<int> inorderTraversal(TreeNode* root) {
        //We have to keep going to left in this case, store the right ones in the stack

    vector <int> ans;

    if(root == nullptr)
        return ans;

    stack <TreeNode *> st;
    TreeNode* curr = root;

    while(true)
    {
        if(curr != nullptr)
        {
            st.push(curr);
            curr = curr->left;
        }
        else //means we have reached leftmost node of current subtree
        {
            if(st.empty())
                break;

            curr = st.top();
            ans.push_back(curr->val);
            st.pop();

            curr = curr->right;
        }
    }

    return ans;
    }
};
```


---

## 145. Binary Tree Postorder Traversal

### Recursive


```javascript
class Solution {
private:
    void postorder(TreeNode* curr, vector <int> &vec)
    {
        if(curr == nullptr)
            return ;

        postorder(curr->left, vec);
        postorder(curr->right, vec);
        vec.push_back(curr->val);
    }
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector <int> ans;
        postorder(root, ans);
        return ans;
    }
};
```

### ***Iterative***


```javascript

```


---

## 102. Binary Tree Level Order Traversal


```javascript
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
    //Level order traversal is implemented using a queue data structure

    vector <vector<int>> ans;

        if(root == nullptr)
            return ans;

    queue <TreeNode* > level;
    level.push(root);   //First of all we add the root

    //Now we traverse until the queue is not empty
    while(!level.empty())
    {
        int n = level.size();
        vector <int> elements;
        
        for (int i = 0; i < n; i++)
        {

            TreeNode* top = level.front();
            level.pop();
            
            elements.push_back(top->val);

            if(top->left != nullptr)
                level.push(top->left);
                
            if(top->right != nullptr)
                level.push(top->right);

        }
        ans.push_back(elements);
    }

    return ans;
    }
};
```


---

## 104. Maximum Depth Of Binary Tree

### Iterative FS


```javascript
class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    //Find the maximum depth of a binary tree
    //maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
    //So, basically we have to traverse till the farthest leaf node
    //We also think of level order search for implementing this code using a queue data structure

    if(root == nullptr)
        return 0;

    queue <TreeNode*> level;
    level.push(root);

    int count = 0;

    while(!level.empty())
    {
        int n = level.size();
        for(int i = 0; i < n; i++)
        {   
            TreeNode* curr = level.front();
            level.pop();

            if(curr->left != nullptr)
                level.push(curr->left);
                
            if(curr->right != nullptr)
                level.push(curr->right);
        }
        count++;
    }
    return count;

    }
};
```

### Recursive DFS


```javascript
class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    //Find the maximum depth of a binary tree
    //maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
    //So, basically we have to traverse till the farthest leaf node
    //We can use DFS style recursion to reach there

    if(root == nullptr)
        return 0;

    int left = maxDepth(root->left); 
    int right = maxDepth(root->right); 

    return 1 + max(left, right);
    }
};
```


---

## 110. Balanced Binary Tree 

### Brute Force


```javascript
class Solution {
public:
    int height(TreeNode* root)
    {
        if(root == nullptr)
            return 0;

        int left = height(root->left);
        int right = height(root->right);

        return 1 + max(left, right);
    }
    
    bool isBalanced(TreeNode* root) {
    
    //We can think of the recursive approach of finding heights for the left tree anf right tree

    if(root == nullptr)
        return true;

    int left = height(root->left);
    int right = height(root->right);


    if(abs(left - right) <= 1 && isBalanced(root->left) && isBalanced(root->right))
    {
        return true;
    }


    return false;
    }
};
```

### Optimal


```javascript
class Solution {
public:
    // Function to check if a binary tree is balanced
    bool isBalanced(TreeNode* root) {
        return dfsHeight(root) != -1;
    }

    // Recursive function to calculate the height of the tree
    //This 
    int dfsHeight(TreeNode* root) {

        if (root == NULL)
            return 0;

        int leftHeight = dfsHeight(root->left);

        if (leftHeight == -1)
            return -1;

        int rightHeight = dfsHeight(root->right);

        if (rightHeight == -1)
            return -1;

        if (abs(leftHeight - rightHeight) > 1)
            return -1;

        // Return the maximum height of left and right subtrees, adding 1 for
        // the current node 
        return max(leftHeight, rightHeight) + 1;
    }
};
```


---

## 543. Diameter of a Binary Tree


```javascript
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

## 100. Same Tree


```javascript
class Solution {
public:
    
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(p == nullptr && q == nullptr)
            return true;
        
        if(p == nullptr || q == nullptr)    
            return false;

        return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```


---

## 103. Zig-Zag Level Order Traversal


```javascript
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    
    //The first intuition is to apply the level order traversal but we can use two queues
    //for the zig zag implementation and some logic to decide which queue to use at that
    //iteration

    //Afterwards we can think whether this can be implemented using a single queue

    vector <vector <int>> ans;

    if(root == nullptr)
        return ans;

    queue <TreeNode*> level;
    level.push(root);
    bool l_to_r_flag = true;

    while(!level.empty())
    {
        int n = level.size();
        vector <int> elements(n);

        for(int i = 0; i < n; i++)
        {
            TreeNode* curr = level.front();
            level.pop();

            int index = l_to_r_flag ? i : n - 1 - i;

            elements[index] = curr->val;

            if(curr->left != nullptr)
                level.push(curr->left);
                
            if(curr->right != nullptr)
                level.push(curr->right);
        }
        l_to_r_flag = !l_to_r_flag;
        ans.push_back(elements);

    }
    return ans;
    }
};
```


---

## 124. Binary Tree Maximum Sum Path

**Similar to:** *Diameter of A Binary Tree*

To find the maximum sum path in a binary tree, we treat every node as a possible turning point. At each node, we calculate the maximum path sum by adding the node’s value to the maximum path sums from its left and right subtrees.


```javascript
class Solution {
public:
    int path_sum = INT_MIN;
    int maxSum(TreeNode* root) {

        if(root == nullptr)
            return 0;

        int left = max(0, maxSum(root->left));
        int right = max(0, maxSum(root->right));

        path_sum = max(path_sum, root->val + left + right);

        return root->val + max(left, right);

    }

    int maxPathSum(TreeNode* root){

        maxSum(root);
        return path_sum;

    }
};
```


---

## 987. Vertical Order Traversal of a Binary Tree (VVIMP)

Usage of NESTED MAP and multiset


```javascript
class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        
// A map is used to store nodes grouped by vertical and level
        map<int, map<int, multiset<int>>> nodes;

        // A queue is used for BFS, storing node and its coordinates
        queue<pair<Node*, pair<int, int>>> todo;

        // Push the root node with vertical = 0 and level = 0
        todo.push({root, {0, 0}});

        // Perform BFS traversal
        while (!todo.empty()) {
            // Get the front element in queue
            auto p = todo.front();
            todo.pop();

            // Extract node
            Node* temp = p.first;
            // Extract vertical (x)
            int x = p.second.first;
            // Extract level (y)
            int y = p.second.second;

            // Insert the node into map by vertical and level
            nodes[x][y].insert(temp->data);

            // If left child exists, push with updated coordinates
            if (temp->left) {
                todo.push({temp->left, {x - 1, y + 1}});
            }

            // If right child exists, push with updated coordinates
            if (temp->right) {
                todo.push({temp->right, {x + 1, y + 1}});
            }
        }

        // Final answer vector
        vector<vector<int>> ans;

        // Iterate through verticals in map
        for (auto p : nodes) {
            vector<int> col;
            // Collect all nodes in order of levels
            for (auto q : p.second) {
                col.insert(col.end(), q.second.begin(), q.second.end());
            }
            // Push the column into result
            ans.push_back(col);
        }

        // Return final vertical order traversal
        return ans;
    }
};
```


---

## 199. Binary Tree Right Side View

### ***Brute Force***


```javascript
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {

    //Brute Force intuition is to use level order traversal and print the last element from each level order subarray

    vector <int> ans;
    if(root == nullptr)
        return ans;

    queue <TreeNode* > level;
    level.push(root);

    while(!level.empty())
    {
        int n = level.size();
        vector <int> elements;

        for(int i = 0; i < n; i++)
        {
            TreeNode* curr = level.front();
            level.pop();

            elements.push_back(curr->val);

            if(curr->left)  
                level.push(curr->left);
            if(curr->right)  
                level.push(curr->right);
        }

        int k = elements.size();
        ans.push_back(elements[k-1]);
    }

    return ans;
    }
};
```

### ***Optimal ***

*To get the left and right view of a Binary Tree, we perform a depth-first traversal of the Binary Tree while keeping track of the level of each node. For both the left and right view, we ensure that only the first node encountered at each level is added to the result vector.*


```javascript
class Solution {
public:
    void rightDFS(TreeNode* curr, int level, vector <int> &ans)
    {
        if(curr == nullptr)
            return;

				//Ensures addition only when this is the first node of that level
        if(ans.size() == level)
            ans.push_back(curr->val);

        rightDFS(curr->right, level + 1, ans);
        rightDFS(curr->left, level + 1, ans);
    }
    vector<int> rightSideView(TreeNode* root) {

    vector <int> ans;
    rightDFS(root, 0, ans);

    return ans;
    }
};
```


---

## 101. Symmetric Tree

We compare left and right parts in a mirrored way - left child of the left side is compared with the right child of the right side, and vice versa.

**Base check:** If both parts are empty, it is symmetric. If only one is empty, it's not.

### ***Recursive***


```javascript
class Solution {
public:
    bool check(TreeNode* root1, TreeNode* root2)
    {
        if(root1 == nullptr || root2 == nullptr)
            return root1 == root2;

        return root1->val == root2->val && check(root1->left, root2->right)
                                        && check(root1->right, root2->left);
    }
    //Recusive version (seems easier)
    bool isSymmetric(TreeNode* root) {
        if(root == nullptr)
            return true;

        return check(root->left, root->right);
        
    }
};
```

### ***Iterative***

The Mirror Logic
To check for symmetry, you don't compare a node with its own children. You compare two different nodes from opposite sides of the tree:
Left child of Node A with Right child of Node B.
Right child of Node A with Left child of Node B.


```javascript
    class Solution {
    public:
        bool isSymmetric(TreeNode* root) {
        //Iterative Version
        if (!root) return true;

        // A single queue can handle both sides by pushing nodes in pairs
        queue<TreeNode*> q;
        
        // Push the children of the root to start the mirror comparison
        q.push(root->left);
        q.push(root->right);

        while (!q.empty()) {
            // Dequeue the pair to compare
            TreeNode* leftNode = q.front(); q.pop();
            TreeNode* rightNode = q.front(); q.pop();

            // 1. If both are null, this branch is symmetric so far
            if (!leftNode && !rightNode) continue;

            // 2. If only one is null OR values don't match, it's NOT symmetric
            if (!leftNode || !rightNode || leftNode->val != rightNode->val) 
                return false;

            // 3. Push children in "Mirror Order"
            // Pair 1: Outside children (Left's Left and Right's Right)
            q.push(leftNode->left);
            q.push(rightNode->right);

            // Pair 2: Inside children (Left's Right and Right's Left)
            q.push(leftNode->right);
            q.push(rightNode->left);
        }

        return true;

            
        }
    };
```


---

## **105. Construct Binary Tree from Preorder and Inorder Traversal**

O(N^2)


```javascript
class Solution {
private:
    TreeNode* helper(int preStart, int inStart, int inEnd, vector<int>& preorder, vector<int>& inorder) {
        // Base case: no elements left to process
        if (preStart > preorder.size() - 1 || inStart > inEnd) {
            return nullptr;
        }

        // The first element in preorder is always the root
        TreeNode* root = new TreeNode(preorder[preStart]);

        // Brute Force Search: Find the index of the root in the inorder array
        int inIndex = 0; 
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root->val) {
                inIndex = i;
                break;
            }
        }

        // Recursively build left and right subtrees
        // Left subtree root is the next element in preorder
        root->left = helper(preStart + 1, inStart, inIndex - 1, preorder, inorder);
        
        // Right subtree root is jumped over by the size of the left subtree
        // Size of left subtree = (inIndex - inStart)
        root->right = helper(preStart + (inIndex - inStart) + 1, inIndex + 1, inEnd, preorder, inorder);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return helper(0, 0, inorder.size() - 1, preorder, inorder);

    }
};
```

O(N)


```javascript
	class Solution {
public:
    int preorderIndex;
    unordered_map<int, int> inorderMap;    

    TreeNode* arrayToTree(vector<int>& preorder, int left, int right) {
        // If there are no elements to construct the tree
        if (left > right) return nullptr;

        // Select the preorderIndex element as the root and increment it
        int rootValue = preorder[preorderIndex++];
        TreeNode* root = new TreeNode(rootValue);

        // Build left and right subtree
        // excluding inorderMap[rootValue] element because it's the root
        root->left = arrayToTree(preorder, left, inorderMap[rootValue] - 1);
        root->right = arrayToTree(preorder, inorderMap[rootValue] + 1, right);

        return root;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        preorderIndex = 0;
        // Build the hash map for O(1) lookups
        for (int i = 0; i < inorder.size(); i++) {
            inorderMap[inorder[i]] = i;
        }
        
        return arrayToTree(preorder, 0, inorder.size() - 1);
    }
};
```


---

## **114. Flatten Binary Tree to Linked List**


```javascript
class Solution {
public:
    void preOrder(TreeNode* root, vector <TreeNode*> &nodes)
    {
        if(root == nullptr)
            return ;

        nodes.push_back(root);
        preOrder(root->left, nodes);
        preOrder(root->right, nodes);
    }

    void flatten(TreeNode* root) 
    {
    //Brute Force, by creating new nodes using given values

        if(root == nullptr)
            return;

        vector <TreeNode*> nodes;
        preOrder(root, nodes);
        int n = nodes.size();

        TreeNode* head = nodes[0];
        TreeNode* prev = head;

        for(int i = 1; i < n; i++)
        {
            TreeNode* curr = nodes[i];
            prev->right = curr;
            prev->left = NULL;
            prev = curr;
        }
    }
};
```


---

## **129. Sum Root to Leaf Numbers**

***Recursion***


```javascript
class Solution {
private:
    int helper(TreeNode* root, int currSum) {
        if (root == NULL) return 0;

        // 1. Update the number for the current path
        currSum = (currSum * 10) + root->val;

        // 2. If it's a leaf, return the completed number
        if (root->left == NULL && root->right == NULL) {
            return currSum;
        }

        // 3. Otherwise, return the sum of the left and right paths
        return helper(root->left, currSum) + helper(root->right, currSum);
    }

public:
    int sumNumbers(TreeNode* root) {

        return helper(root, 0);


    }
};
```

DFS Solution


```javascript
class Solution {
public:
    int sumNumbers(TreeNode* root) {
    
    if(root == NULL)
        return 0;

    int total_sum = 0;
    //We create a stack to so dfs
    //Second element in the pair represents sum upto that element
    stack <pair<TreeNode*, int>> st;
    st.push({root, root->val});

    while(!st.empty())
    {
        //Storing top most element
        pair <TreeNode*, int> curr = st.top();
        st.pop();

        TreeNode* node = curr.first;
        int curr_sum = curr.second;

        if(node->left == NULL && node->right == NULL)
            total_sum += curr_sum;

        //Now we add left and right branches
        //First we push right then left
        if(node->right)
            st.push({node->right, (curr_sum*10) + node->right->val});
        if(node->left)
            st.push({node->left, (curr_sum*10) + node->left->val});
    }

    return total_sum;
    }
};
```


---

## **222. Count Complete Tree Nodes**

***Recursion***


```javascript
class Solution {
private:
    int nodeCount(TreeNode* root) {
        if(root == NULL)
            return 0;

        int l = nodeCount(root->left);
        int r = nodeCount(root->right);

        return 1 + l + r;
    }
    
public:
    int countNodes(TreeNode* root) {

    //Basically if i count leaf nodes and height of tree, then answer can be directly calculated
    //using formula
    //Also since this is a complete BT hence we know even if there is one node in the last level
    //it would be on the leftmost side
    //Hence what if we travel to the leftmost leaf node then somehow travel rightwards or something ??


    //Brute Force Approach

    return nodeCount(root);

    }
};
```

***Optimal***


```javascript
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;

        int leftHeight = getLeftHeight(root);
        int rightHeight = getRightHeight(root);

        // If leftmost and rightmost heights are the same, it's a perfect binary tree
        if (leftHeight == rightHeight) {
            return (1 << leftHeight) - 1; // Formula: 2^height - 1
        }

        // If not perfect, proceed with standard recursive counting
        // But since it's a Complete BT, one of the subtrees will definitely be perfect
        return 1 + countNodes(root->left) + countNodes(root->right);
    }

private:
    int getLeftHeight(TreeNode* node) {
        int height = 0;
        while (node) {
            height++;
            node = node->left;
        }
        return height;
    }

    int getRightHeight(TreeNode* node) {
        int height = 0;
        while (node) {
            height++;
            node = node->right;
        }
        return height;
    }
};
```


---

## **404. Sum of Left Leaves**


```javascript
class Solution {
    int sum = 0;
private:
    void sumLeaf(TreeNode* root, bool left) {
        if(root == NULL)
            return ;
            
        if(root->left == NULL && root->right == NULL && left == true)
        {
            sum += root->val;
            return;
        }

        sumLeaf(root->left, true);

        sumLeaf(root->right, false);
    }

public:
    int sumOfLeftLeaves(TreeNode* root) {
        sumLeaf(root, false);

        return sum;
    }
};
```


```javascript
class Solution {
private:
    int sumLeaf(TreeNode* root, bool left) {
        if (!root) return 0;

        // Check if the current node is a leaf
        if (!root->left && !root->right) {
            return left ? root->val : 0;
        }

        // Recursive step: sum of left side + sum of right side
        return sumLeaf(root->left, true) + sumLeaf(root->right, false);
    }

public:
    int sumOfLeftLeaves(TreeNode* root) {
        
        return sumLeaf(root, false);
        
    }
};
```


---

## **226. Invert Binary Tree**

***Recursive***


```javascript
class Solution {
private:
    void swapNodes(TreeNode* root) {
        if(root == NULL || (root->left == NULL && root->right == NULL))
            return;

        //swqapping left and right subtrees
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;

        swapNodes(root->left);
        swapNodes(root->right);
    }
      
public:
    TreeNode* invertTree(TreeNode* root) {
        
        swapNodes(root);

        return root;
    }
};
```

***DFS***


```javascript
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {

        //Lets implement the iterative approach using stack, basically depth first search
        //Lets keep adding left and right children and then keep swapping
        if(root == NULL)
            return root;
            
        stack <TreeNode*> st;
        st.push(root);

        while(!st.empty())
        {
            //swqapping left and right subtrees
            TreeNode* curr = st.top();
            st.pop();

            TreeNode* temp = curr->left;
            curr->left = curr->right;
            curr->right = temp;

            if(curr->left)
                st.push(curr->left);
            
            if(curr->right)
                st.push(curr->right);
        }

        return root;
    }
};
```

***Level Order Approach***


```javascript
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {

        //Lets implement the iterative approach using queue, basically breadth first search
        //Lets keep adding left and right children and then keep swapping
        if(root == NULL)
            return root;
        queue <TreeNode*> q;
        q.push(root);

        while(!q.empty())
        {
            int n = q.size();

            for(int i = 0; i < n; i++)
            {
                TreeNode* curr = q.front();
                q.pop();

                //swqapping left and right subtrees
                TreeNode* temp = curr->left;
                curr->left = curr->right;
                curr->right = temp;

                if(curr->left)
                    q.push(curr->left);
                if(curr->right)
                    q.push(curr->right);
            }
        }

        return root;
    }
};
```

***Standard BFS Approach***


```javascript
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {

        //Lets implement the iterative approach using queue, basically breadth first search
        //Lets keep adding left and right children and then keep swapping
        if(root == NULL)
            return root;
        queue <TreeNode*> q;
        q.push(root);

        while(!q.empty())
        {
            TreeNode* curr = q.front();
            q.pop();

            //swqapping left and right subtrees
            TreeNode* temp = curr->left;
            curr->left = curr->right;
            curr->right = temp;

            if(curr->left)
                q.push(curr->left);
            if(curr->right)
                q.push(curr->right);
        }

        return root;
    }
};
```


---

## **257. Binary Tree Paths**


```javascript
class Solution {
private:
    void findPath(TreeNode* root, string curr, vector<string> &ans) {
        if(root == NULL)
            return;

        if(root->left == NULL && root->right == NULL)
        {
            curr = curr + to_string(root->val);
            ans.push_back(curr);
        }
        else     
            curr = curr + to_string(root->val) + "->";

        findPath(root->left, curr, ans);
        findPath(root->right, curr, ans);
    }
    
public:
    vector<string> binaryTreePaths(TreeNode* root) {

    //Let's go for the recursive simpler approach
    vector <string> ans;
    findPath(root, "", ans);

    return ans;
    }
};
```


---

## **106. Construct Binary Tree from Inorder and Postorder Traversal**


```c++
class Solution {
private:
    int post_idx; // Global tracker for the current root in postorder array

    TreeNode* build(unordered_map<int, int>& index_map, vector<int>& postorder, int left, int right) {
        
        if (left > right) return nullptr;

        
        int root_val = postorder[post_idx--];
        TreeNode* root = new TreeNode(root_val);

        // split point in the inorder array
        int i = index_map[root_val];

        // IMPORTANT: Build the RIGHT subtree first.
        // In postorder (LRRoot), reading backwards gives (Root-Right-Left).
        root->right = build(index_map, postorder, i + 1, right);
        root->left = build(index_map, postorder, left, i - 1);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (inorder.empty()) return nullptr;
        
        post_idx = postorder.size() - 1;

        //hash map for O(1) inorder lookups
        unordered_map<int, int> index_map;
        for (int i = 0; i < inorder.size(); i++) {
            index_map[inorder[i]] = i;
        }

        return build(index_map, postorder, 0, inorder.size() - 1);
    }
};
```


---

## **508. Most Frequent Subtree Sum**


```c++
class Solution {
    int max_freq = 0;
    int findSum(unordered_map <int, int> &hash, TreeNode* root) {
        if(root == nullptr)
            return 0;

        int left = findSum(hash, root->left);
        int right = findSum(hash, root->right);
        int sum = root->val + left + right;
        hash[sum]++;
        max_freq = max(max_freq, hash[sum]);
        return sum;
    }
    
public:
    vector<int> findFrequentTreeSum(TreeNode* root) {
    //The Brute Force Method seems to calculate all subtree sums, store them in a hashmap with their frequency, find the highest frequency and then print all sums with the highest frequency

    unordered_map <int, int> hash;

    // sum = sum(left_subtree, right_subtree, node itself)
    findSum(hash, root);
    
    vector <int> res;

    for (auto const& [key, val] : hash) {
        if(val == max_freq)
            res.push_back(key);    
    }
    
    return res;
    
    }
};
```


---

## **513. Find Bottom Left Tree Value**


```c++
class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
    //We can do level order traversal using bfs, and the first element of the last element in the 
    //level order traversal array

    queue <TreeNode*> elements;
    vector <vector<int>> level;
    elements.push(root);

    while(!elements.empty())
    {
        int n = elements.size();
        vector <int> curr_level;
        for(int i = 0; i < n; i++)
        {
            TreeNode* node = elements.front();
            elements.pop();
            
            if(node->left)
                elements.push(node->left);
                
            if(node->right)
                elements.push(node->right);

            curr_level.push_back(node->val);
        }        
        level.push_back(curr_level);
    }

    int len = level.size();
    return level[len - 1][0];
    }
};
```


```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
pair <int, int> res = {-1, -1};
private:
    void findLeafLeft(TreeNode* root, int level) {

        if(root == nullptr)
            return ;

        if(level > res.second && root->left == nullptr && root->right == nullptr)
        {
            res  = {root->val, level};
            return ;
        }    

        findLeafLeft(root->left, level + 1);
        findLeafLeft(root->right, level+ 1);
    }

public:
    int findBottomLeftValue(TreeNode* root) {
    //What if we simulate dfs + bfs together by storing the level of every node, and keep updating the answer if we get a leaf node at depper level than current answer

    findLeafLeft(root, 0);

    return res.first;
    }
};
```


---

## **515. Find Largest Value in Each Tree Row**

***BF***


```c++
class Solution {
public:
    void dfs(TreeNode* root, int level, vector<int>& res) {
        if (!root) return;

        // If this is the first time reaching this level, add the value
        if (level == res.size()) {
            res.push_back(root->val);
        } else {
            // Otherwise, update the maximum for this level
            res[level] = max(res[level], root->val);
        }

        dfs(root->left, level + 1, res);
        dfs(root->right, level + 1, res);
    }

    vector<int> largestValues(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};
```


```c++
class Solution {
public:
    vector<int> largestValues(TreeNode* root) {
        vector<int> res;
        if(!root)
        return res;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty())
        {
            int max_val=INT_MIN;
            int levelSize=q.size();
            for(int i=0;i<levelSize;i++)
            {
                TreeNode* node=q.front();
                q.pop();
                max_val=max(max_val,node->val);
                if(node->left)
                q.push(node->left);
                if(node->right)
                q.push(node->right);
            }
            res.push_back(max_val);        
            }
            return res;
    }
};


```


---

## **2196. Create Binary Tree From Descriptions**


```c++
class Solution {
public:
    TreeNode* createBinaryTree(vector<vector<int>>& descriptions) {

    //Brute Force -> Use a unordered set to store parents

    int n = descriptions.size();

    unordered_map <int, TreeNode*> nodes;
    unordered_set <int> children;

    for(auto & node : descriptions)
    {
        TreeNode* parent;
        TreeNode* child;

        if(nodes.find(node[0]) != nodes.end())
        {
            parent = nodes[node[0]];
        }

        else
            parent = new TreeNode(node[0]);

        if(nodes.find(node[1]) != nodes.end())
        {
            child = nodes[node[1]];
        }

        else
            child = new TreeNode(node[1]);

        if(node[2] == 1)
            parent->left = child;
        else
            parent->right = child;

        nodes[parent->val] = parent;
        nodes[child->val] = child;
        
        children.insert(child->val);
    }   

    int rootVal = -1;

    for (auto& node : descriptions) 
    {
        int parentVal = node[0];

        if (children.find(parentVal) == children.end()) 
        {
            rootVal = parentVal;
            break;
        }
    }
    return nodes[rootVal];
    }
};
```


---

## **662. Maximum Width of Binary Tree**

This is a very good problem because the "trick" is realizing that width is defined using the positions nodes would have in a complete binary tree, not just the number of nodes at a level.

The key insight is that the width of a level is **not the number of nodes present**. Instead, it is the distance between the leftmost and rightmost nodes **as if the tree were a complete binary tree**. For example:


```plain text
        1
       / \
      3   2
     /     \
    5       9
```

The last level corresponds to:


```plain text
5 _ _ 9
```

so its width is `4`, not `2`.

### Intuition

Assign each node the index it would have in a complete binary tree (similar to heap indexing):


```c++
root = 0
left child  = 2*i + 1
right child = 2*i + 2
```

This gives every node a virtual position, even when some nodes are missing.


```plain text
          1(0)
        /      \
     3(1)      2(2)
    /            \
 5(3)            9(6)
```

Now the width of any level can be computed as:


```c++
width = lastIndex - firstIndex + 1;
```

### Approach

Perform a BFS (level-order traversal) and store `(node, index)` pairs in the queue. For each level, record the first and last indices and update the answer using:


```c++
ans = max(ans, lastIndex - firstIndex + 1);
```

To avoid overflow in deep trees, normalize indices at every level by subtracting the first index of that level:


```c++
idx -= levelStart;
```

For example:


```plain text
50 51 56
```

becomes:


```plain text
0 1 6
```

The width remains unchanged while the numbers stay small.

### Complexity

Each node is visited exactly once, so the time complexity is:


```plain text
O(N)
```

where `N` is the number of nodes.

The BFS queue may contain an entire level, giving a space complexity of:


```plain text
O(N)
```

### Pattern Recognition

Whenever a tree problem involves **width**, **horizontal span**, **complete-tree positions**, or situations where **missing nodes matter**, consider assigning heap-style indices and processing the tree level-by-level with BFS. The mental trigger is:


```plain text
Need virtual positions
    ↓
Assign heap indices
    ↓
BFS by levels
    ↓
Width = last - first + 1
```


```c++
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {

        if (!root) return 0;

        long long ans = 0;

        queue<pair<TreeNode*, long long>> q;
        q.push({root, 0});

        while (!q.empty()) {

            int sz = q.size();

            long long offset = q.front().second;

            long long first = 0;
            long long last = 0;

            for (int i = 0; i < sz; i++) {

                auto [node, idx] = q.front();
                q.pop();

                idx -= offset;

                if (i == 0) first = idx;
                if (i == sz - 1) last = idx;

                if (node->left)
                    q.push({node->left, 2 * idx + 1});

                if (node->right)
                    q.push({node->right, 2 * idx + 2});
            }

            ans = max(ans, last - first + 1);
        }

        return ans;
    }
};
```


---

## **1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree**

### Brute Force


```c++
 
class Solution {
public:
    TreeNode* getTargetCopy(TreeNode* original, TreeNode* cloned, TreeNode* target) {

    queue <TreeNode*> bfs;
    bfs.push(cloned);

    while(!bfs.empty())
    {
        int n = bfs.size();

        for(int i = 0; i < n; i++)
        {
            TreeNode* node = bfs.front();
            bfs.pop();

            if(node->val == target->val)
                return node;

            if(node->left)
                bfs.push(node->left);
            
            if(node->right)
                bfs.push(node->right);
        }

    }
    return nullptr;
    }
};
```

### Optimal


```c++
class Solution {
public:
    TreeNode* getTargetCopy(TreeNode* original, TreeNode* cloned, TreeNode* target) {
        // Base case: if we hit a null node, return null
        if (original == nullptr) return nullptr;
        
        // Compare the pointer directly instead of the value
        if (original == target) return cloned;
        
        // Search in the left subtree
        TreeNode* leftResult = getTargetCopy(original->left, cloned->left, target);
        if (leftResult != nullptr) return leftResult;
        
        // If not found in the left, search and return the right subtree result
        return getTargetCopy(original->right, cloned->right, target);
    }
};
```


---

## 572. Subtree of Another Tree


```c++
class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!subRoot) {
            return true;
        }
        if (!root) {
            return false;
        }

        if (sameTree(root, subRoot)) {
            return true;
        }
        return isSubtree(root->left, subRoot) ||
               isSubtree(root->right, subRoot);
    }

    bool sameTree(TreeNode* root, TreeNode* subRoot) {
        if (!root && !subRoot) {
            return true;
        }
        if (root && subRoot && root->val == subRoot->val) {
            return sameTree(root->left, subRoot->left) &&
                   sameTree(root->right, subRoot->right);
        }
        return false;
    }
};
```


---

## **116. Populating Next Right Pointers in Each Node**

### BFS


```c++
class Solution {
public:
    Node* connect(Node* root) {

    //Let's do a level order traversal to make this problem intuitive
    if(root == nullptr)
        return nullptr;

    Node* prev;
    
    queue <Node*> bfs;
    bfs.push(root);

    while(!bfs.empty())
    {
        int n = bfs.size();

        for(int i = 0; i < n; i++)
        {
            Node* node = bfs.front();
            bfs.pop();

            if(i == n - 1)
                node->next = nullptr;

            if(i > 0)
                prev->next = node;

            if(node->left)
                bfs.push(node->left);
            
            if(node->right)
                bfs.push(node->right);

            prev = node;            
        }
    }    

    return root;
    }
};
```

### O(1)


```c++
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        // Start with the root node. 'leftmost' tracks the start of each level.
        Node* leftmost = root;

        // Loop until we reach the bottom-most level containing children
        while (leftmost->left != nullptr) {
            
            // Traverse the current level like a linked list using the 'next' pointers
            Node* head = leftmost;
            while (head != nullptr) {
                
                // Connection 1: Connect children sharing the same parent
                head->left->next = head->right;
                
                // Connection 2: Connect children across adjacent parents
                if (head->next != nullptr) {
                    head->right->next = head->next->left;
                }
                
                // Move horizontally along the current level
                head = head->next;
            }
            
            // Move down to the first node of the next level
            leftmost = leftmost->left;
        }

        return root;
    }
};
```


---

## **117. Populating Next Right Pointers in Each Node II**


```c++
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        Node* curr = root;

        while (curr != nullptr) {
            Node dummy(0);
            Node* tail = &dummy;

            while (curr != nullptr) {
                if (curr->left) {
                    tail->next = curr->left;
                    tail = tail->next;
                }
                if (curr->right) {
                    tail->next = curr->right;
                    tail = tail->next;
                }
                curr = curr->next;
            }

            curr = dummy.next;
        }

        return root;
    }
};
```


---

## **236. Lowest Common Ancestor of a Binary Tree**

At every node, imagine this flowchart:


```plain text
Ask left subtree

Ask right subtree

Am I p or q?

Now combine the three answers.
```

Possible situations:


```plain text
left = NULL
right = NULL
me = not target
------------------
return NULL
```


```plain text
left = p
right = NULL
------------------
return p
```


```plain text
left = NULL
right = q
------------------
return q
```


```plain text
left = p
right = q
------------------
return current
```


```plain text
me = p
left/right contains q
------------------
return current
```

That's literally the entire algorithm.

Think of it as:


```c++
class Solution {
private:
    TreeNode* LCA(TreeNode* root, TreeNode* p, TreeNode* q)
    {
        if(root == nullptr)
            return nullptr;

        if(root == p || root == q)
            return root;

        TreeNode* left = LCA(root->left, p, q);
        TreeNode* right = LCA(root->right, p, q);

        // Both in different subtrees
        if(left != nullptr && right != nullptr)
            return root;

        // Propagate the non-null result upward
        if(left != nullptr)
            return left;

        return right;
    }

public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        return LCA(root, p, q);
    }
};
```


---

## **538. Convert BST to Greater Tree**

Reverse In-order Traversal


```c++
class Solution {
    int sum = 0;
private:
    void convert(TreeNode* root)
    {
        if(root == nullptr)
            return ;
        
        convert(root->right);
        sum += root->val;
        root->val = sum;
        convert(root->left);

    }
public:
    TreeNode* convertBST(TreeNode* root) {
    
    convert(root);
    return root;    
    }
};
```


---

## **3997. Count Dominant Nodes in a Binary Tree**

### DFS Version - Bottom - Up Recursion Style


```c++
class Solution {
    int count = 0;
private:
    int nodes(TreeNode* root) {
        //If leaf node then always dominant, hence we return a very small number
        if(root == nullptr)
            return INT_MIN;
        
        int left = nodes(root->left);
        int right = nodes(root->right);

        int curr_max = max({root->val, left, right});
        
        if(root->val == curr_max)
            count++;

        return curr_max;
    }
    
public:
    int countDominantNodes(TreeNode* root) {
            int dummy = nodes(root);
            return count;
    }
};
```


---

## **958. Check Completeness of a Binary Tree**

In a complete BT, while doing BFS, we should never encounter a real node once we encounter a null node, if this condition get violated, it is not a complete binary tree.


```c++
class Solution {
public:
    bool isCompleteTree(TreeNode* root) {
    
    //This question is simpler than it appears, the algo is we have to do normal BFS traversal and maintain a seenNull tracker, for a complete BT, there is never a node after a null node, it we encounter a null node and then encounter a real node, this proves that this is not a complete BT

    //Like a complete BT is a continous sequence of nodes without any gap of nullptr

    //In this case, unlike normal BFS, we will also enqueue nullptr

    queue <TreeNode*> bfs;
    bfs.push(root);
    bool seenNull = false;

    while(!bfs.empty())
    {
        int n = bfs.size();

        for(int i = 0; i < n; i++)
        {
            TreeNode* node = bfs.front();
            bfs.pop();

            if(node == nullptr)
            {    
                seenNull = true;
                continue;
            }

            if(node != nullptr && seenNull == true)
                return false;

            //Always push children, even if nullptr (as we need nullptr to track)
            bfs.push(node->left);
            bfs.push(node->right);
        }
    }
    return true;
    }
};
```


---

## **1110. Delete Nodes And Return Forest**

### DFS


```c++
class Solution {
private:
TreeNode* processNode(TreeNode* node, unordered_set<int>& toDeleteSet,
                        vector<TreeNode*>& forest) {
    if (!node) {
        return nullptr;
    }

    node->left = processNode(node->left, toDeleteSet, forest);
    node->right = processNode(node->right, toDeleteSet, forest);

    // Node Evaluation: Check if the current node needs to be deleted
    if (toDeleteSet.find(node->val) != toDeleteSet.end()) {
        // If the node has left or right children, add them to the forest
        if (node->left) {
            forest.push_back(node->left);
        }
        if (node->right) {
            forest.push_back(node->right);
        }
        // Delete the current node and return null to its parent
        delete node;
        return nullptr;
    }

    return node;
}
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        unordered_set<int> toDeleteSet(to_delete.begin(), to_delete.end());
        vector<TreeNode*> forest;

        root = processNode(root, toDeleteSet, forest);

        // If the root is not deleted, add it to the forest
        if (root) {
            forest.push_back(root);
        }

        return forest;
    }


};
```

### BFS


```c++

```

