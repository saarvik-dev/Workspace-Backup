It is a two-pointer technique commonly used in linked lists. Two pointers start from the head of the list: the **tortoise (slow pointer)** moves one node at a time, while the **hare (fast pointer)** moves two nodes at a time.

If the linked list contains a cycle, the fast pointer will eventually meet the slow pointer inside the loop; if no cycle exists, the fast pointer reaches `NULL`.

The same method is also used to **find the middle of a linked list**—when the fast pointer reaches the end of the list, the slow pointer will be positioned at the middle node.

This approach works in **O(n)** time and requires **O(1)** extra space.

### How it Works (The Logic)

Imagine two runners on a circular track. One runs twice as fast as the other. Eventually, the faster runner (the Hare) will lap the slower runner (the Tortoise) and they will meet at the exact same position.

1. **Initialization:** Both pointers start at the `head`.
1. **Movement:** In every iteration, `slow` moves one step, and `fast` moves two steps.
1. **The Meeting:** If there is a loop, the distance between them decreases by 1 node in every step. Eventually, the distance becomes 0, and `slow == fast`.
1. **The Exit:** If there is no loop, the `fast` pointer will hit `nullptr` (the end of the list).
How to handle empty and one element cases in tortoise and hare method.

How did one line did optimization in that question ??

