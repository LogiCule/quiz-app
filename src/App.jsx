import { useEffect, useReducer } from "react";
import { Error, Header, Loader, StartScreen } from "./components";

const initState = { questions: [], status: "loading" };

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status } = state;

  const numQuestions = questions.length;

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/LogiCule/db68ccb45c50fa602523e8a4a52bcf2f/raw/questions.json"
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  console.log({ questions, status });

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </main>
    </div>
  );
}

export default App;
