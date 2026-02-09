Used to send data back and forth from client and server without needing to refresh the page.

In JSON object we need to wrap the key with double quotes, which for the normal JS object id not required.

alert() cannot be used on objects


We cannot use . operator on JSON objects’s elements

# 


# **POINTS**


- JavaScript Object Notation
- Lightweight data-interchange format
- Based on a subset of JavaScript
- Easy to read and write
- Often used with AJAX
- Can be used with most modern languages
# 📦 JSON — Short Application-Based Notes


## What JSON is

- **JSON (JavaScript Object Notation)** is a **text-based data format**
- Used to **exchange data** between:
- Frontend (React)
- Backend (Node/Express)
- Database (MongoDB)
- JSON contains **only data**, no logic

---

## Allowed Data Types (ONLY these)


| Type | Example | Use |
| --- | --- | --- |
| string | "Saarvik" | names, emails |
| number | 20, 99.5 | age, price |
| boolean | true, false | flags |
| null | null | missing/optional values |
| array | ["JS","React"] | lists |
| object | { "id": 1 } | structured data |



❌ Not allowed: `undefined`, `function`, `Date`, `Symbol`


---

## JSON Rules (important)

- Keys **must be strings**
- Uses **double quotes only**
- No trailing commas
- No methods or expressions

---

## JSON vs JavaScript Object

- JS objects can store functions, JSON cannot
- JSON is **language-independent**
- JS objects are **runtime data**, JSON is **transfer data**

---

## Convert Between JS and JSON


```javascript
JSON.stringify(obj)  // JS → JSON string (sending data)
JSON.parse(json)     // JSON string → JS object (receiving data)

```


---

## JSON in Fetch API (core use case)


```javascript
const res = await fetch(url);
const data = await res.json();

```

- Server sends **JSON text**
- `.json()` parses it into a JS object/array

---

## Sending JSON (very common)


```javascript
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});

```


---

## One-line takeaway


---

Next best step:

- **Fetch API notes (same style)**
- **Mini project using JSON + fetch**
- **React roadmap from here**
Just say which.


---


---


---


---


```c++
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "filename", true);
xhttp.send(); 
```

