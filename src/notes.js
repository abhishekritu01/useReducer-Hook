import { useReducer } from 'react';


const initialState ={ count: 0, userInput: '', color: false ,name:"abhishek"}

const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  NEW_USER_INPUT: 'newUserInput',
  TG_COLOR: 'tgColor'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      return { ...state, userInput: action.payload };
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  const {count,userInput, color,name} =state

  return (
    <main className="App" style={{ color: state.color ? 'red' : 'green' }}>
      <input
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })}
      />
      <br /><br />
      <p>{count}</p>
      <p>{name}</p>
      <section>
        <button onClick={(() => dispatch({ type: ACTION.DECREMENT }))}>-</button>
        <button onClick={(() => dispatch({ type: ACTION.INCREMENT }))}>+</button>
        <button onClick={(() => dispatch({ type: ACTION.TG_COLOR }))}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  );
}

export default App;