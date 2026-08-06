## 383. Ransom Note


```javascript
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {

    vector <int> mag(26, 0);

    for(auto ch : magazine)
        mag[ch - 'a']++;

    for(auto ch : ransomNote)
    {
        if(mag[ch - 'a'] == 0)
            return false;
        mag[ch - 'a']--;
    }    

    return true;
    }
};
```


```javascript
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {

    if (ransomNote.length() > magazine.length())
        return false;

    int mag[26] = {0};

    for(auto ch : magazine)
        mag[ch - 'a']++;

    for(auto ch : ransomNote)
    {
        if(mag[ch - 'a'] == 0)
            return false;
        mag[ch - 'a']--;
    }    

    return true;
    }
};
```

