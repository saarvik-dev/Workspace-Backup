## This is the key greedy idea

A greedy algorithm does not “look ahead”.

It applies a rule like:

Greedy does **not** mean “don’t care about the future”.

It means:

A **greedy algorithm** is a problem-solving strategy that makes the "locally optimal" choice at each step with the hope that these small, immediate successes will lead to a "globally optimal" (best overall) solution.

In simple terms: It takes the best thing it can get **right now** without worrying about what happens later.

## **The 3 Core Steps:**

1. **Selection:** Pick the best candidate from the current options based on a specific rule (e.g., the largest number, the shortest path).
1. **Feasibility:** Check if this choice violates any rules (e.g., "Does this item fit in my bag?").
1. **Irreversibility:** Once you make the choice, you never go back and change it (no backtracking).
## When Does It Fail?

Greedy algorithms are "short-sighted." They can be lured into a bad path because they don't look ahead.

**Example: The Tree Search**Imagine a tree where you want the highest total sum.

- The root has two branches: **Left (Value: 10)** and **Right (Value: 20)**.
- Behind the **10** is a hidden **1,000**.
- Behind the **20** is only a **1**.
- **The Greedy Algorithm** will pick the **20** immediately because it’s bigger than 10. It will never see the 1,000 because it already committed to the right branch.

| Feature | Greedy Algorithm | Dynamic Programming |
| --- | --- | --- |
| Strategy | Makes the best choice now. | Considers all possible future choices. |
| Speed | Very fast (O(nlogn) or O(n)). | Slower (O(n2) or O(n3)). |
| Backtracking | Never goes back. | Remembers and re-evaluates. |
| Optimality | Might not find the best solution. | Guaranteed to find the best solution. |



## In the lemonade problem

When someone gives ₹20, you have two valid choices for giving ₹15 change:

1. Give **₹10 + ₹5**
1. Give **₹5 + ₹5 + ₹5**
Both work **right now**.

So which is “greedy”?

The greedy choice is the one that leaves you in the **strongest position** after this transaction.

Which leaves you stronger?

- Using ₹10 + ₹5 leaves more ₹5 bills.
- Using three ₹5 wastes your most flexible bill.
So:

You are not guessing future customers —

you are preserving **critical resources**.

