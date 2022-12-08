// import { useReducer } from 'react';


// const initialState ={ count: 0, userInput: '', color: false ,name:"abhishek"}

// const ACTION = {
//   INCREMENT: 'increment',
//   DECREMENT: 'decrement',
//   NEW_USER_INPUT: 'newUserInput',
//   TG_COLOR: 'tgColor'
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ACTION.INCREMENT:
//       return { ...state, count: state.count + 1 };
//     case ACTION.DECREMENT:
//       return { ...state, count: state.count - 1 };
//     case ACTION.NEW_USER_INPUT:
//       return { ...state, userInput: action.payload };
//     case ACTION.TG_COLOR:
//       return { ...state, color: !state.color };
//     default:
//       throw new Error();
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer,initialState)
//   const {count,userInput, color,name} =state

//   return (
//     <main className="App" style={{ color: state.color ? 'red' : 'green' }}>
//       <input
//         type="text"
//         value={state.userInput}
//         onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })}
//       />
//       <br /><br />
//       <p>{count}</p>
//       <p>{name}</p>
//       <section>
//         <button onClick={(() => dispatch({ type: ACTION.DECREMENT }))}>-</button>
//         <button onClick={(() => dispatch({ type: ACTION.INCREMENT }))}>+</button>
//         <button onClick={(() => dispatch({ type: ACTION.TG_COLOR }))}>Color</button>
//       </section>
//       <br /><br />
//       <p>{state.userInput}</p>
//     </main>
//   );
// }

// export default App;
// /////////////

import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";

const initialState = { job: "", jobs: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, jobs: [...state.jobs, action.payload] };
    case "SET":
      return { ...state, job: action.payload };
    case "DELETE":
      const deleteTodo = [...state.jobs].filter(
        (item, index) => index !== action.payload
      );
      return { ...state, jobs: deleteTodo };
    case "UPDATE":
      const newJobs2 = [...state.jobs];
      newJobs2[action.payload.index] = action.payload.job;
      return { ...state, jobs: newJobs2 };
    default:
      throw new Error("invalid action");
  }
};

export default function App() {
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { job, jobs } = state;
  const [currentIndex, setIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job) {
      if (currentIndex === -1) {
        dispatch({ type: "ADD", payload: job });
      } else {
        dispatch({ type: "UPDATE", payload: { job, index: currentIndex } });
      }
    }
    dispatch({ type: "SET", payload: "" });
    ref.current.focus();
    setIndex(-1);
  };

  useEffect(() => {
    // ref.current.focus();
  }, []);

  console.log(currentIndex);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          style={{ height: 30 }}
          ref={ref}
          value={job}
          onChange={(e) => {
            dispatch({ type: "SET", payload: e.target.value });
          }}
          type="text"
        />
        <button
          style={{ height: 35, padding: "0 10px", marginLeft: 10 }}
          onClick={handleSubmit}
          type="submit"
        >
          ADD
        </button>
      </form>


      
      <div style={{ marginTop: 20 }}>
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {jobs?.length > 0 &&
            jobs.map((item, index) => (
              <li key={index}>
                <span
                  onClick={() => {
                    setIndex(index);
                    dispatch({ type: "SET", payload: item });
                  }}
                >
                  {item}
                </span>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => dispatch({ type: "DELETE", payload: index })}
                >
                  x
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}