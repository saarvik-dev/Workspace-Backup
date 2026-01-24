
📎 Attachment: ../../assets/2f20eb7a-3bc3-80b2-a3cb-d8cb2818a979

### 1. Introduction to Data Structures

**Stack (LIFO Mechanism)**

- **Definition:** A data structure following the **Last In First Out (LIFO)** principle.
- **Core Operations:**
- **Push**
- **Pop**
- **Top**
- **Size**
- **Example:** If you push `2, 3, 4, 1`, the last element is `1`. A `pop` operation removes `1`. A subsequent `top` call would reveal `4`.
**Queue (FIFO Mechanism)**

- **Definition:** A data structure similar to a stack but follows the **First In First Out (FIFO)** principle.
- **Core Operations:**
Only `push `operation is done at the back, all other operations are done from the front be it `pop `or  `top`.

- **Push:** Add an element to the rear.
- **Pop:** Remove the element from the front (the one entered first).
- **Top:** View the element at the front.
- **Size:** Return the number of elements.
- **Example:** If you push `2, 1, 3, 4`, the first element in was `2`. A `pop` operation removes `2` (unlike the stack which would remove `4`). The new `top` becomes `1`.

---

### 2. Implementation: Stack using Arrays

- **Constraint:** Arrays require a fixed size, meaning the stack capacity is not dynamic.
- **Variables:** An array (e.g., size 10) and a variable `top` initialized to `1`.
- **Logic:**
- **Push:** Increment `top` (`top + 1`) and place the value at `arr[top]`.
- **Pop:** Decrement `top` (`top - 1`). No need to physically delete the value; moving the pointer is sufficient.
- **Top:** Return `arr[top]`. If `top` is `1`, the stack is empty.
- **Size:** Return `top + 1`.
- **Complexity:** Time complexity is **O(1)** for all operations. Space complexity involves potentially wasted space due to fixed array size.

---

### 3. Implementation: Queue using Arrays

- **Constraint:** Requires fixed size.
- **Variables:** Array, `start` (front), `end` (rear), and `currentSize`. `start` and `end` are initialized to `1`.
- **Circular Array Logic:** To efficiently utilize space (e.g., filling empty spots at the beginning after pops), modulo arithmetic is used: `index % size`.
- **Logic:**
- **Push:**
- If `currentSize == capacity`, do nothing.
- If empty (`start == -1`), set both `start` and `end` to `0`.
- Otherwise, move `end` cyclically: `end = (end + 1) % size`. Insert value and increment `currentSize`.
- **Pop:**
- If `currentSize == 1`, reset `start` and `end` to `1` (queue becomes empty).
- Otherwise, move `start` forward cyclically: `start = (start + 1) % size`. Decrement `currentSize`.
- **Top:** Return `arr[start]`.
- **Complexity:** Time complexity is **O(1)**.

---

### 4. Implementation: Stack using Linked List

- **Advantage:** Dynamic size; consumes space proportional only to elements stored.
- **Structure:** A `Node` class containing a value and a `next` pointer. A `top` pointer tracks the head.
- **Logic:**
- **Push:** Create a new node. Point the new node's `next` to the current `top`. Update `top` to be the new node.
- **Pop:** Store `top` in a temporary variable. Move `top` to `top.next`. Delete the temporary node (memory cleanup).
- **Top:** Return `top.data`.
- **Complexity:** Time complexity is **O(1)**.

---

### 5. Implementation: Queue using Linked List

- **Variables:** `start` pointing to the front (for popping) and `end` pointing to the rear (for pushing).
- **Logic:**
- **Push:** Create a new node.
- If empty (`start == null`), both `start` and `end` point to the new node.
- Otherwise, point `end.next` to the new node, then move `end` to the new node.
- **Pop:** Store `start` in a temp variable. Move `start` to `start.next`. Delete temp.
- *Edge Case:* If `start` becomes `null` (queue empty), set `end` to `null` as well.
- **Complexity:** Time complexity is **O(1)**.

---

### 6. Advanced Implementation: Stack using Queue

**Problem:** Make a FIFO data structure (Queue) behave like a LIFO data structure (Stack).

- **Approach (Single Queue):**
- Use a single queue `q`.
- **Push(x):**
1. Push `x` into `q`.
1. Iterate `size - 1` times: **Pop** the front element and immediately **Push** it back into the queue.
1. This rotation places the newly added element `x` at the front of the queue, mimicking a stack's top.
- **Pop/Top:** Simply call `q.pop()` or `q.top()` as the "last in" element is now at the front.
- **Complexity:**
- Push: **O(N)** (expensive due to rotation).
- Pop/Top: **O(1)**.

---

### 7. Advanced Implementation: Queue using Stack

**Problem:** Make a LIFO data structure (Stack) behave like a FIFO data structure (Queue) using two stacks (`S1` and `S2`).

**Method 1: Expensive Push (O(N))**

- **Logic:**
- **Push(x):**
1. Transfer all elements from `S1` to `S2`.
1. Push `x` onto `S1` (this places `x` at the bottom, which corresponds to the "rear" of a queue).
1. Transfer everything back from `S2` to `S1`.
- **Pop/Top:** Simply perform the operation on `S1`.
- **Complexity:** Push is **O(2N)**; Pop/Top is **O(1)**.
**Method 2: Amortized (Optimized) Push (O(1))**

- **Logic:** Use `S1` for input and `S2` for output.
- **Push(x):** Simply push `x` onto `S1`. **O(1)**.
- **Pop/Top:**
1. Check if `S2` is not empty. If it has elements, perform pop/top on `S2`.
1. If `S2` is empty, transfer **all** elements from `S1` to `S2` one by one. This reverses their order (LIFO + LIFO = FIFO). Then perform the operation on `S2`.
1. Subsequent operations use `S2` until it is empty again.
- **Complexity:**
- Push: **O(1)**.
- Pop/Top: **Amortized O(1)** (Occasionally O(N) during transfer, but generally O(1)).
