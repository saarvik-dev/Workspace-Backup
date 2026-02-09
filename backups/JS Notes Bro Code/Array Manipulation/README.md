
---

## 1. Traversal Methods (Walking through the array)

These methods are used when you need to look at or process every element in an array.

- `forEach()`: The standard way to execute a function for each element. It **does not** return anything.
- `for...of`: A modern, clean syntax for iterating over values. It’s often preferred over `forEach` because you can use `break` or `continue`.
- `entries()`: Useful when you need both the **index** and the **value** in a `for...of` loop.
JavaScript

# 


`const fruits = ['apple', 'banana', 'cherry'];

// Using for...of
for (const fruit of fruits) {
  console.log(fruit);
}`


---

## 2. Transformation Methods (Creating new arrays)

These are "pure" methods—they do not change the original array but return a modified version of it.

- `map()`: Transforms every element and returns a new array of the same length.
- `filter()`: Returns a new array containing only the elements that pass a specific test.
- `reduce()`: The "Swiss Army Knife." It boils an entire array down to a **single value** (like a sum, an object, or a string).

---

## 3. Search and Retrieval

When you need to find a specific item or check if it exists.


| Method | Returns | Best Use Case |
| --- | --- | --- |
| find() | The value | Finding the first object that matches a criteria. |
| findIndex() | The index | Finding where an item lives. |
| includes() | Boolean | Checking if a simple value exists. |
| some() | Boolean | Checking if at least one item matches a condition. |
| every() | Boolean | Checking if all items match a condition. |




---

## 4. Mutation Methods (Changing the array)

These methods **modify the original array**. Use them with caution, especially in frameworks like React where "immutability" is important.

- `push()`** / **`pop()`: Add/remove from the **end**.
- `unshift()`** / **`shift()`: Add/remove from the **beginning**.
- `splice()`: The multi-tool. It can add, remove, or replace elements at any index.
- `sort()`: Sorts the array in place. *Warning: It converts elements to strings by default, so *`[10, 2].sort()`* results in *`[10, 2]`*!*

---

## 5. Modern Tools: Spread and Rest

The spread operator (`...`) has replaced many older manipulation techniques like `concat()`.

- **Copying:** `const copy = [...original];`
- **Merging:** `const merged = [...arr1, ...arr2];`
- **Adding elements:** `const added = [newItem, ...original];`

---

### Pro Tip: Chaining

One of the biggest strengths of JavaScript arrays is **chaining**. You can filter, then map, then sort all in one go:

JavaScript

`const premiumUsers = users
  .filter(user => user.isPaid)
  .map(user => user.name)
  .sort();`

