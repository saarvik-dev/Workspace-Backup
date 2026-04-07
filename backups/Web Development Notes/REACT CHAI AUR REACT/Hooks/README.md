React Hooks, introduced in React 16.8, enable functional components to use state, lifecycle, and other React features without relying on class components.

- Eliminate the need for class components for state and side-effect management.
- Improve code readability and encourage a functional programming style.
- Widely adopted in modern React projects for cleaner and more maintainable code.
`import { useState } from 'react'` // *Here *`useState`* is a hook basically*

# `useState()`


- Used to change state
- Change doesn’t mean changing values, it means propagation of changes in the UI/DOM.
- Inside () we give the *default value* for the variable.
- **Return Type** : array (size 2)

```javascript
//const[var_name , function] = useState{default_value}
//here function is basically a method whivh will control the
//behaviour of var_name

let [counter, setCounter] = useState(15);
```

