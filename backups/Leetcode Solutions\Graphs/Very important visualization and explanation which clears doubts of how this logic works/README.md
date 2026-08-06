**Link to answer and visualization :**

https://gemini.google.com/share/190752cb0ca3

You have just identified the exact trap that destroys standard Greedy Algorithms.

You are 100% correct: if the algorithm simply looked at its immediate neighbors and permanently committed to the smallest jump (`1 -> 2`), it would blindly walk down the top path, eventually hitting the `5` at the end, and be forced to take a jump of `3`. It would completely miss the green path where the maximum jump is only `2`.

This is precisely why we do not use a standard queue or a greedy choice. **We use a Min-Heap (Priority Queue).**

The Priority Queue prevents us from making permanent commitments. Instead of blindly marching forward, it puts unexplored branches on the "back burner." If our current path ever gets too difficult, the Min-Heap automatically pauses it and switches to a cheaper path from the back burner.

Let's trace your exact grid to see how the Min-Heap catches this trap mathematically.

### The Trace: How the Min-Heap Abandons the Bad Path

**Initial State:** We start at `1` (0,0).

Queue: `[{Effort: 0, Node: (0,0)}]`

**Step 1:** We pop `1`. We check its neighbors (`2` to the right, `3` down).

- Jump to `2` is $1$. Max effort so far = **$1$**.
- Jump to `3` is $2$. Max effort so far = **$2$**.
- **Queue sorts itself:** `[{Effort: 1, Node: (0,1)}, {Effort: 2, Node: (1,0)}]`
**Step 2 (The "Greedy" phase):** The Min-Heap pops the top item (Effort 1). It explores the top-right path. It moves from `2` to `2` to `2`. Because these are flat, the effort stays at `1`.

- Meanwhile, that downward path to `3` (Effort 2) is still sitting safely in the Min-Heap, waiting.
- **Queue is currently:** `[{Effort: 1, Node: (1,2)}, {Effort: 2, Node: (1,0)}]`
**Step 3 (The Wall):** We are at the `2` right above the target. We check the neighbor (the target `5`).

- Jump from `2` to `5` is $3$. Max effort for this top path jumps to **$3$**.
- We push this to the queue.
- **Queue sorts itself:** `[{Effort: 2, Node: (1,0)}, {Effort: 3, Target Node}]`
**Step 4 (The Magic Pivot):** Look at the queue! The target is in the queue with an effort of 3. A greedy algorithm would pop it and finish. **But the Min-Heap does not.** The Min-Heap realizes that the "back burner" path sitting at `(1,0)` only has an effort of 2. Because $2 < 3$, the algorithm completely abandons the top path right at the finish line, goes all the way back to the start, and pops the downward path.

**Step 5 (Finding the True Path):** It resumes from `3` (1,0).

- Move to `5`: Jump is 2. Max effort = $max(2, 2) =$ **$2$**.
- Move to `3`: Jump is 2. Max effort = $max(2, 2) =$ **$2$**.
- Move to Target `5`: Jump is 2. Max effort = $max(2, 2) =$ **$2$**.
- We push the Target to the queue with an effort of 2.
- **Queue sorts itself:** `[{Effort: 2, Target Node}, {Effort: 3, Target Node (Old Path)}]`
**Step 6:** The Min-Heap pops the Target with Effort 2. The algorithm terminates, returning the correct optimal answer, entirely ignoring the worse path we found earlier.

Here is an interactive visualization loaded with your exact 3x3 grid. Step through it and watch the Priority Queue UI carefully at Step 4—you will see it literally pause the top path and switch to the green path the moment the effort hits 3!


---

🔗 **References**
- https://gemini.google.com/share/190752cb0ca3 → https://gemini.google.com/share/190752cb0ca3

