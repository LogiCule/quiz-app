import { useEffect, useReducer } from "react";
import {
  Error,
  FinishedScreen,
  Header,
  Loader,
  NextButton,
  Question,
  StartScreen,
} from "./components";
import Progress from "./components/Progress";

const initState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  totalCorrect: 0,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "next":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
        status:
          state.index + 1 === state.questions.length ? "finished" : "active",
      };
    case "setAnswer": {
      const question = state.questions[state.index];
      const points = payload === question.correctOption ? question.points : 0;

      return {
        ...state,
        answer: payload,
        score: state.score + points,
        totalCorrect: state.totalCorrect + (points == 0 ? 0 : 1),
      };
    }

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer, score } = state;
  const totalPoints = questions.reduce((acc, val) => acc + val.points, 0);
  const numQ = questions.length;

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

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQ}
            handleStart={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              numQ={numQ}
              index={index}
              score={score}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQ={numQ}
              index={index}
            />
          </>
        )}

        {status === "finished" && (
          <FinishedScreen score={score} totalPoints={totalPoints} />
        )}
      </main>
    </div>
  );
}

export default App;
