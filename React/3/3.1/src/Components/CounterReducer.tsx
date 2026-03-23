import { useReducer } from "react";

// 1️⃣ Initial state
const initialState = { count: 0 };

// 2️⃣ Reducer function
type Action = { type: "INCREMENT" } | { type: "DECREMENT" } | { type: "RESET" };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "RESET":
      return { count: 0 };

    default:
      return state;
  }
};

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};

export default CounterReducer;
