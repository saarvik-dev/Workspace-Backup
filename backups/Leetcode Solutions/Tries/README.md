## **208. Implement Trie (Prefix Tree)**

Explanation in 


```c++
struct Node {
    Node* links[26];            //array of pointers for all letters
    bool flag = false;
    
    bool containsKey(char ch) {
        return links[ch - 'a'] != nullptr;
    }

    void put(char ch, Node* node) {
        links[ch - 'a'] = node;
    }

    Node* get(char ch) {
        return links[ch - 'a'];
    }

    void setEnd() {
        flag = true;
    }

    bool isEnd() {
        return flag;
    }
};

class Trie {
private:
    Node* root;

public:
    Trie() {
        root = new Node();      //Create a new root everytimme an object of Trie class is created
    }
    
    //TC - O(length of word)
    void insert(string word) {
        
        Node* node = root;      //Dummy variable pointing to root
        
        for(int i = 0; i < word.length(); i++)
        {
            if(!node->containsKey(word[i])) 
            {
                node->put(word[i], new Node());
            }

            //moves to the reference trie
            node = node->get(word[i]); 
        }

        node->setEnd();
    }
    
    //TC - O(length of word)
    bool search(string word) {
        
        Node* node = root;
        for(int i = 0; i < word.length(); i++)
        {
            if(!node->containsKey(word[i])) {
                return false;
            }

            node = node->get(word[i]);   
        }

        return node->isEnd();
    }
    

    //TC - O(length of word)
    bool startsWith(string prefix) {
        Node* node = root;
        for(int i = 0; i < prefix.length(); i++)
        {
            if(!node->containsKey(prefix[i])) {
                return false;
            }

            node = node->get(prefix[i]);
        }

        return true;
    }
};

```

