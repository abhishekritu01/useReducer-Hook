import React from 'react'
import TodoContext from './todo-context'

const TodoState = (props) => {

  return (
    <TodoContext.Provider value={{}}>
        {props.children}
    </TodoContext.Provider>
  )
}

export default TodoState