In JavaScript, a **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

Think of it like ordering a pizza:

1. **Request:** You call the pizza shop (Start of async task).
1. **Promise:** They give you a receipt (The Promise object).
1. **Outcome:** Either you get a pizza (Success/Resolved) or they call back saying they ran out of ingredients (Failure/Rejected).

---

## 1. The Three States of a Promise

A Promise is always in one of these three states:

- **Pending:** Initial state, neither fulfilled nor rejected. The operation is still running.
- **Fulfilled (Resolved):** The operation completed successfully.
- **Rejected:** The operation failed (e.g., a network error).

---

## 2. Basic Syntax

You create a promise using the `new Promise` constructor. It takes a function (executor) with two arguments: `resolve` and `reject`.

JavaScript


```c++
const myPromise = new Promise((resolve, reject) => {
    let success = true;

    setTimeout(() => {
        if (success) {
            resolve("Operation Successful! 🎉");
        } else {
            reject("Operation Failed! ❌");
        }
    }, 2000); // Simulating a 2-second delay
});
```


---

## 3. Consuming a Promise

Once a promise is created, you "consume" it using `.then()`, `.catch()`, and `.finally()`.

- `.then()`: Runs when the promise is **fulfilled**.
- `.catch()`: Runs when the promise is **rejected**.
- `.finally()`: Runs regardless of the outcome.
JavaScript


```c++
myPromise
    .then((data) => {
        console.log(data); // "Operation Successful! 🎉"
    })
    .catch((error) => {
        console.error(error); // "Operation Failed! ❌"
    })
    .finally(() => {
        console.log("Process finished.");
    });
```


---

## 4. Promise Chaining

One of the best features of Promises is that they allow you to chain operations. This avoids "Callback Hell" (nested, unreadable code).

JavaScript


```c++
fetchData()
    .then(data => processData(data))
    .then(processedData => saveData(processedData))
    .then(result => console.log("All steps complete"))
    .catch(err => console.log("Error in any step:", err));
```


---

## 5. Modern Alternative: `async/await`

`async/await` is syntactic sugar built on top of Promises. it makes asynchronous code look and behave like synchronous code, making it much easier to read and debug.

JavaScript


```c++
async function handleTask() {
    try {
        const data = await myPromise; // Waits for the promise to resolve
        console.log(data);
    } catch (error) {
        console.error(error); // Catches rejection
    }
}
```


---

## Why this matters for FAANG prep:

In interviews, you aren't just expected to know how to *use* a promise. You might be asked to:

1. **Polyfill a Promise:** Write the logic of `new Promise` from scratch.
1. **Promise.all vs Promise.race:** Explain how to handle multiple concurrent async tasks.
1. **Event Loop:** Explain how Promises go into the **Microtask Queue**, which has higher priority than the Macrotask Queue (setTimeout).
