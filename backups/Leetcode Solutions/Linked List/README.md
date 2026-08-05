# 3217. Delete Nodes from Linked List **Present in Array**


**OPTIMAL SOLUTION**


```javascript
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* modifiedList(vector<int>& nums, ListNode* head) {

    //Let's use a brute force approach of using a unordered hash map so that we 
    //can quickly find whether the node's value is present in the array or not

    unordered_set <int> hashset;
    for(auto i : nums)
        hashset.insert(i);


    ListNode* dummy = new ListNode(0);
    ListNode* startnode = dummy;

    ListNode* temp = head;

    while(temp)
    {
        if(hashset.find(temp->val) == hashset.end())        //not found element
        {
            startnode->next = temp;
            startnode = temp;
        }

        temp = temp->next;
    }

    startnode->next = nullptr;
    return dummy->next;
    }
};
```

**OPTIMAL SOLUTION 2**


```javascript
class Solution {
public:
    ListNode* modifiedList(vector<int>& nums, ListNode* head) {
        // Optimized initialization of hashset
        unordered_set<int> hashset(nums.begin(), nums.end());

        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy; // 'tail' is more descriptive than 'startnode'
        ListNode* curr = head;

        while(curr) {
            if(hashset.find(curr->val) == hashset.end()) {
                tail->next = curr;
                tail = tail->next;
            }
            curr = curr->next;
        }

        tail->next = nullptr;
        ListNode* result = dummy->next;
        delete dummy; // Clean up the dummy node
        return result;
    }
};
```


---

# 25. Remove nodes in k group



```c++
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if (!head || k == 1) return head;

        // 1. Count total nodes
        ListNode* curr = head;
        int count = 0;
        while (curr) {
            count++;
            curr = curr->next;
        }

        // 2. Setup dummy node to handle the new head easily
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        
        ListNode* pre = dummy;
        ListNode* nex = dummy;

        // 3. Reverse in chunks of k
        while (count >= k) {
            curr = pre->next; // 'curr' is the first node of the current group
            nex = curr->next; // 'nex' is the node to be moved to the front

            // Reverse the links for this group of k nodes
            // We only need k - 1 link changes to reverse k nodes
            for (int i = 1; i < k; i++) {
                curr->next = nex->next;
                nex->next = pre->next;
                pre->next = nex;
                nex = curr->next;
            }
            
            // Move 'pre' to the end of the newly reversed group
            pre = curr;
            count -= k;
        }

        ListNode* newHead = dummy->next;
        delete dummy; // Prevent memory leak
        return newHead;
    }
};
```


---

## **138. Copy List with Random Pointer**

### Brute Force using HashMap


```c++
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(head == nullptr) return nullptr;

        unordered_map<Node*, Node*> mp;

        Node* temp = head;

        // Pass 1: create copy of each node
        while(temp) {
            mp[temp] = new Node(temp->val);
            temp = temp->next;
        }

        temp = head;

        // Pass 2: connect next and random pointers
        while(temp) {
            mp[temp]->next = mp[temp->next];
            mp[temp]->random = mp[temp->random];
            temp = temp->next;
        }

        return mp[head];
    }
};
```

### Optimal

Interleaving Solution — Copied nodes are inserted between original nodes

Insert copy node after each original node.

Set random pointers using:

- original’s random
- random’s next = copied random
Detach the copied list from the original list.


```c++
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(head == nullptr) return nullptr;

        Node* temp = head;

        // Pass 1: insert copied nodes after each original node
        while(temp) {
            Node* copy = new Node(temp->val);
            copy->next = temp->next;
            temp->next = copy;
            temp = copy->next;
        }

        temp = head;

        // Pass 2: set random pointers of copied nodes
        while(temp) {
            if(temp->random != nullptr) {
                temp->next->random = temp->random->next;
            }
            temp = temp->next->next;
        }

        temp = head;
        Node* newHead = head->next;

        // Pass 3: separate original and copied list
        while(temp) {
            Node* copy = temp->next;
            temp->next = copy->next;

            if(copy->next != nullptr) {
                copy->next = copy->next->next;
            }

            temp = temp->next;
        }

        return newHead;
    }
};
```

