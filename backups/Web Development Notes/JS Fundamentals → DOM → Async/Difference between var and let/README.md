Here is the **precise difference between **`var`** and **`let`** in JavaScript**:

## 1) Scope (most important difference)


| Keyword | Scope |
| --- | --- |
| var | Function-scoped |
| let | Block-scoped ({} scoped) |



### Example:


```javascript
if (true) {
    var a = 10;
    let b = 20;
}

console.log(a); // 10   ✅ (var leaks outside the block)
console.log(b); // Error ❌ (let is not accessible outside the block)

```


---

## 2) Re-declaration


| Keyword | Can be re-declared in same scope? |
| --- | --- |
| var | ✅ Yes |
| let | ❌ No |




```javascript
var x = 5;
var x = 10;   // Allowed ✅

let y = 5;
let y = 10;   // Error ❌

```


---

## 3) Hoisting

Both are hoisted, but they behave differently.


| Keyword | Hoisting behavior |
| --- | --- |
| var | Hoisted and initialized as undefined |
| let | Hoisted but not initialized (Temporal Dead Zone) |




```javascript
console.log(a); // undefined (no error)
var a = 5;

console.log(b); // ReferenceError ❌ (TDZ)
let b = 5;

```


---

## 4) Global object property


| Keyword | Becomes property of window? (in browser) |
| --- | --- |
| var | ✅ Yes |
| let | ❌ No |




```javascript
var x = 10;
let y = 20;

console.log(window.x); // 10
console.log(window.y); // undefined

```


---

## One-line summary

