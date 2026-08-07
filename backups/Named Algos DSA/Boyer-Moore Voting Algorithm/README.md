The optimal solution for the Majority Element problem is the **Boyer-Moore Voting Algorithm**. It is a clever, two-pass algorithm that finds the majority element in **$O(n)$ time** with only **$O(1)$ extra space**.

The key insight is that the majority element appears **more than $\lfloor n/2 \rfloor$ times**. This means its frequency is strictly greater than the sum of the frequencies of all other elements combined.


---

## How the Algorithm "Thinks"

We maintain two variables: a `candidate` and a `count`.

1. **Selection:** We pick the first soldier we see and call him the `candidate`. Our `count` is 1.
1. **Reinforcement:** If the next soldier we see is from the *same* army, we increase the `count`.
1. **Combat:** If the next soldier is from a *different* army, they fight, and we decrease the `count`.
1. **New Candidate:** If the `count` hits 0, it means the current army has been completely wiped out. We pick the very next soldier as our new `candidate` and reset the `count` to 1.
## 🗳️ Boyer-Moore Voting Algorithm Concept

The algorithm works by maintaining a **candidate** for the majority element and a **counter**. It is based on the idea that if we pair up an occurrence of the majority element with an occurrence of any other element, the majority element will still be the majority element in the remaining sequence.

### 1. Initialization (First Pass)

The algorithm processes the array one element at a time:

- `candidate`: Start with the first element, or any arbitrary element.
- `count`: Initialize to $0$.
### 2. The Voting Process (First Pass)

For each element $x$ in the array:

1. **If **`count`** is $0$**: Set the current element $x$ as the new `candidate`. This means the previous majority candidate was completely "defeated" (matched by non-majority elements).
1. **If $x$ is equal to the **`candidate`: **Increment** the `count`. The candidate gains a vote.
1. **If $x$ is NOT equal to the **`candidate`: **Decrement** the `count`. The candidate loses a vote.
### Conceptual Walkthrough

Imagine the majority element is **A** and all other elements are **B, C, D...**

- When the algorithm sees **A**, the counter increases.
- When the algorithm sees **B, C, D...**, the counter decreases.
- Since **A** appears more than half the time, its net score (increments minus decrements) will always remain **positive** by the end of the array traversal. Any other element will eventually be defeated and replaced by a new candidate.
**Conclusion of Pass 1:** The element stored in `candidate` after the first pass is guaranteed to be the majority element. (The problem statement guarantees a majority element exists, so a second verification pass is often unnecessary, but theoretically possible if the guarantee was removed).


---

## ⏱️ Complexity Analysis

- **Time Complexity: $O(n)$**
- The algorithm iterates through the array exactly once (or twice if a verification pass is needed). The work done per element is a simple comparison and increment/decrement, which is $O(1)$.
- **Space Complexity: $O(1)$**
- Only two extra variables are needed: `candidate` and `count`. This is constant space, regardless of the size of the input array.
