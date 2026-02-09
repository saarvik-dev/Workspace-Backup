To see how web communication has evolved, it's best to compare the "Old School" way (XHR) with the "Modern" way (Fetch).

### 1. The Traditional Way: `XMLHttpRequest` (XHR)

Before 2015, this was the only way to perform AJAX. It relies on event listeners and tracking "ready states."

JavaScript

# 


`const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};

xhr.send();`

### 2. The Modern Way: `fetch()` API

`fetch` is the current standard. It is cleaner because it uses **Promises**, allowing you to chain operations and avoid "callback hell."

JavaScript

# 


`fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json(); // Parses JSON data
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));`


---

### Key Differences


| Feature | XMLHttpRequest (XHR) | Fetch API |
| --- | --- | --- |
| Syntax | Verbose and complex. | Clean and readable (Promise-based). |
| Data Format | Returns data as a string; requires manual JSON.parse(). | Has built-in methods like .json(), .text(), and .blob(). |
| Error Handling | Only fails if the network is down. Does not catch 404 or 500 errors automatically. | Also doesn't "reject" on 404/500, but provides a simple response.ok flag. |
| Async/Await | Very difficult to use with modern async/await. | Works perfectly with async/await syntax. |
| Progress | Can easily track upload/download progress. | Tracking progress is more complex (requires Streams API). |




---

### Why this matters for your MERN Projects

In your **React** frontend, you will almost exclusively use **Fetch** (or a library like **Axios**, which is built on top of Fetch/XHR) to talk to your **Node.js/Express** backend.

For example, using `async/await` (the most "pro" way to write Fetch):

JavaScript

# 


`async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}`

