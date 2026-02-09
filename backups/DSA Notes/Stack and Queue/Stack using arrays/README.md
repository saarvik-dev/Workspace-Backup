
```c++
#include <iostream>
using namespace std;

class StackUsingArr {
private:
    int top;
    int capacity;
    int *arr;

public:
    // Constructor allocates memory based on size n
    StackUsingArr(int n) {
        top = -1;
        capacity = n;
        arr = new int[n]; 
    }

    // Destructor to free memory
    ~StackUsingArr() {
        delete[] arr;
    }

    void push(int x) {
        if (top == capacity - 1) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = x;
    }

    void pop() {
        if (top == -1) {
            cout << "Stack Underflow!" << endl;
            return;
        }
        top--;
    }

    int peek() {
        if (top == -1) return -1;
        return arr[top];
    }

    int size() {
        return top + 1;
    }
    
    // Helper to print current state
    void display() {
        for(int i = 0; i <= top; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    int n;
    cout << "Enter Stack Capacity: ";
    cin >> n;

    StackUsingArr obj1(n);
    obj1.push(5);
    obj1.push(7);
    obj1.push(9);
    obj1.push(11);
    obj1.pop();

    cout << "Current Stack: ";
    obj1.display();

    return 0;
}
```

## Key Changes Made:

- **Encapsulation:** Added a `capacity` variable to prevent pushing more items than the array can hold.
- **Memory Management:** Used `new` to allocate memory and a **Destructor** (`~StackUsingArr`) to clean it up. This is the standard C++ way.
- **Simplified Logic:** You don't really need a separate `curr_size` variable; `top + 1` always gives you the current size.
- **Safety:** Added a check in `push` to prevent **Stack Overflow**.
