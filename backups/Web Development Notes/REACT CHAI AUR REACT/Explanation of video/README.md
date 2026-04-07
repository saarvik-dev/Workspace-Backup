### 1. The Custom Implementation (Vanilla JS Simulation)

The video begins by building a "mini React" from scratch to understand how React converts objects into DOM elements. This involves defining a custom object structure to represent an HTML element (e.g., `type`, `props`, `children`) and a function to render it.

- **Iteration 1: Basic Manual Rendering**
In the first version, the `customRender` function is hardcoded. It creates a DOM element based on the `type` (like an anchor tag `<a>`) and manually sets specific attributes (like `href` and `target`) one by one. It then injects the text content (`children`) and appends the element to the root container.
- *Critique:* This approach is not modular because if the element has different or additional attributes, the code would break or require manual updates.
- **Iteration 2: Modular Rendering (Loop-based)**
To solve the limitations of the first version, the code is improved to handle *any* number of attributes.
- It creates the DOM element based on the `type`.
- It uses a `for...in` loop to iterate through the `props` object.
- It dynamically sets every attribute found in `props` (excluding `children`) using `setAttribute`.
- This version effectively simulates how React's rendering logic works fundamentally: taking an object and transforming it into a DOM node dynamically.
### 2. Interaction with Real React

After building the custom version, the video explores how these concepts apply to the actual React library using a project set up with Vite.

- **Direct Function Execution**
Since React components are just JavaScript functions, the video demonstrates that you can technically execute a component as a function (e.g., `MyApp()`) inside the render method instead of using the JSX syntax (`<MyApp />`). While this works, it is discouraged as it breaks conventions and optimization.
- **Passing Custom Objects (The Failure Case)**
The video attempts to pass the *custom* element object created earlier (with keys like `type` and `props`) directly to React's `root.render()`.
- **Result:** This fails.
- **Reason:** React expects a specific object structure with strict parameter requirements. It cannot parse arbitrary keys defined in a custom object; it requires objects created via its own internal methods.
- **Using **`React.createElement`
To fix the previous failure and bridge the gap between custom code and real React, the video introduces `React.createElement`. This is the official method that JSX gets compiled into.
- It takes three specific arguments: the tag name (e.g., `'a'`), an object for attributes/props (e.g., `{ href: '...' }`), and the children (text or other elements).
- Unlike the custom object, elements created this way work perfectly with `root.render()` because they adhere to React's internal schema.
### 3. Variable Injection (Evaluated Expressions)

Finally, the video explains that when passing variables in React (using `{username}`), you are passing **evaluated expressions**.

- This means you pass the *final result* of a Javascript operation (like a variable's value).
- You cannot pass full statements like `if/else` blocks or `for` loops inside the object definition, because, ultimately, these elements are converted into JavaScript objects, and you cannot put an `if` statement inside a JS object key.
