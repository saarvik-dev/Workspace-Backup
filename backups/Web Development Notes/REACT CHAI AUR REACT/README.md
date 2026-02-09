**DOCUMENTATION **:

 https://react.dev/

https://vite.dev/

# PROJECT BASED LEARNING PLAYLIST


Why react was created ?

Syncing problem between JS and DOM, fackebook *“Phantom Message Problem” .*

- ***Properties*** in JS are nothing but key value pairs of objects.
- React makes** SPA **(Single Page Application).
- **BAAS** - Backend as a Service
- Next.js allows us to write both backend and frontend together.
- React - DOM : Web
- React - Native : Mobile

![](../../assets/3010eb7a-3bc3-8068-9277-ea2b5f75dbcb.png)


![](../../assets/3010eb7a-3bc3-80a6-b004-ff92b5914592.png)

# 



![](../../assets/3010eb7a-3bc3-80b4-90d4-ca1447bede7b.png)

# WHAT IS REACT ?


JSX is just a special syntax, but React is a JavaScript library that uses that syntax to build interactive user interfaces.

# 1️⃣ Creating React Applications (or Websites)


## Method 1 (using `create-react-app`)


```javascript
	npx create-react-app project_name 
```

This is a very slow process and not recommended.

## Method 2 (Using `VITE`)


```javascript
npm create vite@latest
npm install
npm run dev
```

This is a very slow process and not recommended.

- The first file which you must go through after creating a react app is `package.json`.
- To start working on a react project, we need to run the start script first
`npm run start`

- For shipping the project after production we use
`npm run build`

⇒We can also use any other bundlers like parcel for compiling a react project

# 2️⃣ Concept of Virtual DOM


Apart from the DOM of the browser , react also creates it own *“Virtual DOM”., *it then compares this DOM with the original DOM, and adds to the original DOM only those things which are unique in the Virtual DOM.

# 3️⃣ What is a React App ?


A React app is essentially built around JavaScript functions (called components) in which we can write HTML-like syntax (JSX). These components are then exported and rendered by a JavaScript file to display the application in the browser.

# 4️⃣ How does index.js load without linking it in the HTML File ?



![](../../assets/3010eb7a-3bc3-8040-bd57-c9b372478014.png)

Tis `react-scripts `is responsible for this act. 

# 5️⃣ Creation and rendering of virtual DOM 



![](../../assets/3010eb7a-3bc3-8086-ab2f-d586068dc848.png)

# 6️⃣ How does VITE link index.js to index.html ?



![](../../assets/3010eb7a-3bc3-806f-9d1c-e764d4bce0f5.png)

By conventional method

# 7️⃣ Some conventions


- The name of the components (functions) should start from a capital letter.
- The filename of the component should also follow the same convention.
# 8️⃣ Return of multiple elements from a js function


Actually jsx only allows return of one element from a function, but many elements can be returned too by enclosing them within `<> ...... </>` .These are known as fragments.

# Glossary 


`npx `- node package executer (used to execute node packages directly without installing them)

`npm` - node package manager

`create-react-app` - utility

`VITE` - bundler

`npm install` - to install node modules folder in any directory

`manifest.jsx` - used for mobile development

`robots.txt` - for search engine

`DOM` - Tree Data Structure

`JSX` - JSX is a syntax extension for JavaScript that lets you write HTML-like code inside JavaScript. 

`./filename` - path to a file in the same directory

`>reload` - to refresh whole page


---

🔗 **References**
- https://react.dev/ → https://react.dev/
- https://vite.dev/ → https://vite.dev/

