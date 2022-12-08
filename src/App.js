import React, { useReducer, useState, useRef } from 'react'
import './App.css'

const initialState = {
  todos: [],
  todo: "",
  completed: false,
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state, todos: [...state.todos, action.payload]
      }
    case "SET":
      return {
        ...state, todo: action.payload
      }
    case "DELETE":
      const newTodo = [...state.todos].filter((item, index) => index !== action.payload);
      return {
        ...state, todos: newTodo
      }
    case "UPDATE":
      const newJobs2 = [...state.todos];
      newJobs2[action.payload.index] = action.payload.todo;
      return { ...state, todos: newJobs2 };

    // case "TOGGLE": {
    //   todos: state.todos.map((item, index) =>
    //     state.todos.index === action.payload.index ? { ...item, completed: !item.completed } : item)
    // }
    //   return { ...state.todos }

    default:
      return state;
  }
}

const App = () => {
  const ref = useRef();
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todo, todos, completed } = state;
  const [currentIndex, setIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      if (currentIndex === -1) {
        // const newTodo = {todo, complete: false,}
        dispatch({ type: "ADD", payload: todo });
      } else {
        dispatch({ type: "UPDATE", payload: { todo, index: currentIndex } });

      }
    }
    dispatch({ type: "SET", payload: "" });
    ref.current.focus();
    setIndex(-1);
  };


  return (
    <>
      <div className='App'>
        <h4>Todo-App</h4>
        <h4>{todos.length}</h4>
        <form onSubmit={handleSubmit}>
          <input ref={ref} value={todo} onChange={(e) => { dispatch({ type: "SET", payload: e.target.value }) }} />
          {/* <button onClick={handleSubmit}>submit</button> */}
        </form>

        <div>
          {
            todos.map((item, index) => (
              <div key={index}>
                <ul style={{ textDecoration: item ? "line-through" : "" }}
                  onClick={() => {
                    setIndex(index);
                    dispatch({ type: "SET", payload: item });
                  }}>{item}</ul>
                <button onClick={() => dispatch({ type: "DELETE", payload: index })}>delete</button>
                <button onClick={() => dispatch({ type: "TOGGLE", payload: index })}>Toggle</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App





