import Proptypes from "prop-types";
const StartScreen = ({ numQuestions, handleStart }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let&apos;s Start
      </button>
    </div>
  );
};

StartScreen.propTypes = {
  numQuestions: Proptypes.number,
  handleStart: Proptypes.func,
};

export default StartScreen;
