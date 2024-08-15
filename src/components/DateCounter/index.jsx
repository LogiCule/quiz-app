import { useReducer } from "react";
const initState = { count: 0, step: 1 };
function reducer(state, action) {
  const { count, step } = state;
  switch (action.type) {
    case "setCount":
      return { step, count: action.payload };
    case "incCount":
      return { step, count: count + step };
    case "decCount":
      return { step, count: count - step };
    case "setStep":
      return { count, step: action.payload };
    case "reset":
      return initState;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decCount" });
  };

  const inc = function () {
    dispatch({ type: "incCount" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
