- We link CSS file in `<head>` tag while we link js file in `<body>` tag.
- JS executes **top to bottom**, but *can pause and resume* intelligently.


- Operator pręcędence
1. parenthesis
1. exponents
1. multiplication & division
1. addition & subtraction
When we accept user input from a window prompt , it is of a string data type

- An empty string represents the false boolean value in js
- This is be quite useful when dealing with user input to  determine false and empty inputs.
# Important Method of Taking inputs and performing operations on them and returning the modified HTML



```javascript
document.getElementById("SubmitButton").onclick = function()
{
    let a = document.getElementById("SideA").value;
    a = Number(a);

    
    let b = document.getElementById("SideB").value;
    b = Number(b);

    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    document.getElementById("LabelC").innerHTML = "Side C : " + c;
}
```

`document.getElementById("SubmitButton").onclick = function()`

This line is used to perform a function on clicking the button with the mentioned button id

`document.getElementById(``element_id_)`

Used a select an element from the html file


![](../assets/2f30eb7a-3bc3-8088-b96e-c84cec5fc8b7.png)

- `let` = variables are limited to block scope {}
- `var` = variables are limited to a function(){}
- `global variable` = is declared outside any function
(if global, var will CHANGE browser's window properties)

### To generate a random number between 1 to n

`const num = Math.floor(Math.random()*n + 1)`

## 

## Grouping radio buttons : 

To **group radio buttons in HTML**, all radio inputs in the same group must have **the same **`name`** attribute**.

That’s the only rule.

Browser logic: **only one radio button with the same name can be selected at a time.**

- `indexOf` returns -1 if element is not present in the array 
### *for up* statement


```c++
for(let price in prices){
    console.log(price)
   }
```

## DOM

**DOM (Document Object Model)** is a **programming interface** that represents an HTML page as a **tree of objects**, so that **JavaScript can read, change, add, or delete elements dynamically**.

In simple words:

- *array*.forEach() is not exactly clear
# Structure for creating a simple object in js



![](../assets/2f40eb7a-3bc3-8069-ac74-ed1f2f8c4a6e.png)

- Rewatch getters and setters part 3:46:00 mark, they are quite important
# GETTER SNIPPET



![](../assets/2f50eb7a-3bc3-80fe-b65c-e4a016f1d0e5.png)

# Traversing through an array 


`for`( `const `car `of` cars)

- **Asynchronous Function** - Doesn’t pause execution of the program
Loading a file is an asynchronous process.


![](../assets/2f90eb7a-3bc3-80e1-bc38-f52361876364.png)


![](../assets/2f90eb7a-3bc3-8062-81df-fd25fb23b0fb.png)


![](../assets/2f90eb7a-3bc3-80e4-aa92-f13227bb6d0f.png)


![](../assets/2f90eb7a-3bc3-80b9-89d6-ce134035ff63.png)

We need to use try and catch block to execute the reject function in async await.


![](../assets/2f90eb7a-3bc3-8053-97c9-c2a745461957.png)

- `document.getElementsByName()` - returns a node list

---

🔗 **References**
- 3:46:00  → https://youtu.be/8dWL3wF_OMw?t=13609

