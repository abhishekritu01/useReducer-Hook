import React, { useReducer, useState } from 'react'
import './App.css'

const initialState = [{ id: Math.random(), name: "abhishek", email: "abhishek@gmail.com", completed: false },]

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload]
    case "delete":
      return state.filter((contact) => {
        return contact.id !== action.payload.id;
      })
    case "toggle":
      return state.map((contact) => {
        return contact.id === action.payload.id ? { ...contact, completed: !contact.completed } : contact
      })
    default:
      return state;
  }

}

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      const contact = {
        id: Math.random(),
        name: name,
        email: email,
        completed: false,
      }
      console.log(contact);
      dispatch({ type: "add", payload: contact })
    }
    setName('')
    setEmail('')
  }

  return (
    <>
      <div className="App">
        <div>
          <form>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='name' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSubmit}>submit</button>
          </form>
        </div>

        <div>
          {state.map(contact => {
            return (
              <li style={{ listStyle: "none", paddingLeft: "0" }} key={contact.id}>
                <span style={{ textDecoration: contact.completed ? "line-through" : "" }}>{contact.name}</span>
                <br />
                <span style={{ textDecoration: contact.completed ? "line-through" : "" }}>{contact.email}</span>
                <div>
                  <button onClick={() => dispatch({ type: "delete", payload: { id: contact.id } })}>delete</button>
                  <button onClick={() => dispatch({ type: "toggle", payload: { id: contact.id } })}>toggle</button>
                  {/* <button onClick={() => dispatch({ type: "SET", payload: { name: contact.name, email: contact.email } })}>Edit</button> */}
                </div>
              </li>
            )
          })}
        </div>
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>

    </>
  )
}

export default App