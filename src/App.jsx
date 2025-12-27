import { useEffect, useReducer, useState } from "react";
import { fetchQuestions } from "./services/triviaApi";
import {
  Error,
  FinishedScreen,
  Header,
  Loader,
  NextButton,
  Question,
  StartScreen,
  Timer,
  Progress,
} from "./components";

// Load high scores from localStorage
const loadHighScores = () => {
  const stored = localStorage.getItem('quizHighScores');
  return stored ? JSON.parse(stored) : { easy: 0, medium: 0, hard: 0 };
};

// Save high scores to localStorage
const saveHighScores = (scores) => {
  localStorage.setItem('quizHighScores', JSON.stringify(scores));
};

const initState = {
  questions: [],
  status: "ready", // 'ready', 'loading', 'error', 'active', 'finished'
  difficulty: null,
  index: 0,
  answer: null,
  score: 0,
  totalCorrect: 0,
  highscores: loadHighScores(), // Changed to object with per-difficulty scores
  secleft: 300, // 5 minutes
};

function reducer(state, action) {
  const { type, payload } = action;
  
  switch (type) {
    case "setDifficulty":
      return { ...state, difficulty: payload };
      
    case "dataLoading":
      return { ...state, status: "loading" };
      
    case "dataReceived":
      return { 
        ...state, 
        questions: payload, 
        status: "active",
        secleft: payload.length * 30 // 30 seconds per question
      };
      
    case "dataFailed":
      return { ...state, status: "error" };
      
    case "start":
      return {
        ...state,
        status: "loading",
      };
      
    case "next":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
      
    case "finish": {
      const currentDifficultyScore = state.highscores[state.difficulty] || 0;
      const newHighScore = state.score > currentDifficultyScore ? state.score : currentDifficultyScore;
      const updatedHighScores = {
        ...state.highscores,
        [state.difficulty]: newHighScore
      };
      
      // Save to localStorage
      saveHighScores(updatedHighScores);
      
      return {
        ...state,
        status: "finished",
        highscores: updatedHighScores,
      };
    }
      
    case "setAnswer": {
      const question = state.questions[state.index];
      const points = payload === question.correctOption ? question.points : 0;

      return {
        ...state,
        answer: payload,
        score: state.score + points,
        totalCorrect: state.totalCorrect + (points === 0 ? 0 : 1),
      };
    }
    
    case "restart":
      return {
        ...initState,
        highscores: state.highscores,
        status: "ready",
      };
      
    case "tick":
      return {
        ...state,
        secleft: state.secleft - 1,
        status: state.secleft - 1 === 0 ? "finished" : state.status,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const { questions, status, difficulty, index, answer, score, highscores, secleft } = state;
  const totalPoints = questions.reduce((acc, val) => acc + val.points, 0);
  const numQ = questions.length;

  // Fetch questions when difficulty is selected and start is clicked
  async function handleStart(selectedDifficulty) {
    dispatch({ type: "setDifficulty", payload: selectedDifficulty });
    dispatch({ type: "dataLoading" });
    
    try {
      const data = await fetchQuestions({ difficulty: selectedDifficulty });
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      dispatch({ type: "dataFailed" });
    }
  }

  const handleEndQuiz = () => {
    setShowEndDialog(false);
    dispatch({ type: "finish" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <Header />
      <main className="w-full max-w-2xl mx-auto">
        {status === "loading" && <Loader />}
        
        {status === "error" && (
          <Error 
            onRetry={() => dispatch({ type: "restart" })}
          />
        )}
        
        {status === "ready" && (
          <StartScreen
            onStart={handleStart}
            highscores={highscores}
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
              difficulty={difficulty}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <footer className="mt-6 flex items-center justify-between gap-3">
              <Timer dispatch={dispatch} secleft={secleft} />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEndDialog(true)}
                  className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200 border border-red-500/30 rounded-lg hover:border-red-500/50 hover:bg-red-500/10"
                >
                  End Quiz
                </button>
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  numQ={numQ}
                  index={index}
                />
              </div>
            </footer>

            {/* Confirmation Dialog */}
            {showEndDialog && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="glass-strong border-red-500/30 rounded-xl p-6 max-w-md w-full animate-scale-in">
                  <h3 className="text-xl font-semibold text-white mb-3">End Quiz Early?</h3>
                  <p className="text-gray-300 mb-6">
                    Are you sure you want to quit? Your current score will be saved, but unanswered questions won't count.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowEndDialog(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-white/10 rounded-lg hover:border-white/20"
                    >
                      Continue Quiz
                    </button>
                    <button
                      onClick={handleEndQuiz}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-lg"
                    >
                      Yes, End Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            score={score}
            totalPoints={totalPoints}
            totalCorrect={state.totalCorrect}
            numQ={numQ}
            highscores={highscores}
            difficulty={difficulty}
            dispatch={dispatch}
            onPlayAgain={() => handleStart(difficulty)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
