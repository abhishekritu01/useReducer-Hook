import React, { useReducer } from 'react'
import './App.css'

const initialState = {
  todos: [],
  todo: "",
  currentIndex: -1,
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
      const updateTodo = [...state.todos];
      updateTodo[action.payload.index] = action.payload.todo;
      return { ...state, todos: updateTodo }

    case "TOGGLE": {
      todos: state.todos.map((item, index) =>
        index === action.index ? { ...item, completed: !item.completed } : item)
    }

    default:
      return state;
  }
}

const App = () => {

  const [state, dispatch] = useReducer(todoReducer, initialState)
  const { todos, todo, currentIndex } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);

    //hw

    if (todo) {
      dispatch({ type: "ADD", payload: todo})
    }
    dispatch({ type: "SET", payload: "" });
  };

  return (
    <>
      <div className='App'>
        <form >
          <input value={todo} onChange={(e) => { dispatch({ type: "SET", payload: e.target.value }) }} />
          <button onClick={handleSubmit}>submit</button>
        </form>

        <div>
          {
            todos.map((item, index) => (
              <div key={index}  style={{ textDecoration: item.completed ? "line-through" : "" }}>
                <ul>{item}</ul>
                <button onClick={() => dispatch({ type: "DELETE", payload: index })}>delete</button>
                <button onClick={() => dispatch({ type: "SET", payload: item })}>Edit</button>
                <button onClick={() => dispatch({ type: "TOGGLE", payload: index })}>Edit</button>
              </div>
            ))
          }
        </div>
        <div>
          {/* {JSON.stringify(todos)} */}
        </div>
      </div>
    </>
  )
}

export default App