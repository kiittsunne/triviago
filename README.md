# TRIVIAGO

### Project Overview

My friends and I enjoy puzzle hunts and knowing lots of random trivia is usually helpful. This made me think of creating Triviago partly as a training tool, partly as a fun side project, and partly as a way to explore newer frontend technologies. 

In the end, the game has 3 'game modes':

 Feeling Lucky              |  Normal Quiz              |  Sudden Death
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://res.cloudinary.com/kiittsunne/video/upload/e_loop:10,br_3564k,c_scale,f_gif,h_600,q_100/v1665656903/2022-10-13_18.04.00_n3blah.gif" width=150 alt="lucky">   |  <img src="https://res.cloudinary.com/kiittsunne/video/upload/e_loop:10,br_3564k,c_scale,f_gif,h_600,q_100/v1665656903/022-10-13_18.03.55_yf0ttb.gif" width=150 alt="normal"> |  <img src="https://res.cloudinary.com/kiittsunne/video/upload/e_loop:10,br_3564k,c_scale,f_gif,h_600,q_100/v1665656903/2022-10-13_18.03.46_jonlba.gif" width=150 alt="death">
Slot machine tiles represent themes and 12 questions from each unique theme will be fetched   |  Choose multiple categories, set difficulty and limit number of questions  | Player gets 30 hard questions, 10s to answer each question and lose lives if wrong/ no answer

***

### Developer Installation & Build

**Start Vite Developer Server**: `npm run dev` 

**Build Production**: `npm run build`

**[Deployment Resources](https://vitejs.dev/guide/static-deploy.html#github-pages)**

***

### Retrospective: Challenges, Key Learning Points, Future Plans

**Challenges**

Documented in [Process Notes](#process-notes)

**Key Learning Points**

1. Practiced TypeScript in a React project
2. Exposure to useRef use cases
3. Exposure to TailwindCSS
4. Learnt deployment process of Vite to github pages
5. Learnt basic CI/CD with github workflow - auto update production build on git push

**Future Plans**

1. Integrate Google Analytics to track user behaviour and display interesting statistics (e.g. like Wordle's summary graph)

***

#### Process notes:

**1. [WDS React/Typescript multiselect component tutorial](https://www.youtube.com/watch?v=bAJlYgeovlg)**

- Followed along and then rebuilt the component from memory/ by feel for this project
- Differences:
  - WDS used Bootstrap, I rewrote css using Tailwind.
  - Data types also had to be redefined to accommodate api params submission

**2. [FreeCodeCamp React/Typescript quiz app](https://www.youtube.com/watch?v=F2JCjVSZlG0)**

- Similar to WDS selector tutorial, I originally coded along. Built "Normal Quiz" section from memory/feel.
- Differences:
  - FCC used a different trivia api & styled-components.
  - I expanded on the base project with the SlotMachine and SuddenDeath quiz types.

#### Reverse engineering code:

**1. [Victor Toschi's vanilla DOM-Manipulation slot machine](https://medium.com/@victortoschi/how-to-create-a-slot-machine-animation-with-css-and-javascript-9073ab9db9ea)**

I didn't read the Medium article, but focused on his [Codepen](https://codepen.io/toschivictor/pen/JjNZjEj). Took about 1h to fully understand and test what his JS logic was doing, then rewrote it in React.

_Learning Points:_

- Got familiar with useRef: because my implementation still relies on CSS animations rather than state manipulation, could not rely on `useState` to capture and send information to API function call. Used useRef instead to capture data from DOM without re-rendering.

- Challenges: working with HTML DOM Object properties and Typescript was an interesting challenge. Previously without typechecking, I didn't think twice about doing something like the below. But with TS i was more mindful about optionally chaining properties.

```javascript
// before:
onTransitionEnd={() => {

    const last = document.getElementById("doorOne")?.lastChild.id;
    // `.id` would throw err because it's not a guaranteed property

    // setting useRef
    tagInputs.current.push(`${last}`);
}}

//after:
onTransitionEnd={() => {

    const nodes = document.getElementById("doorOne")?.children;

    const last = nodes && nodes[nodes.length - 1]?.id;

    // setting useRef
    tagInputs.current.push(`${last}`);
}}
```
