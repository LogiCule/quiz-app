import Proptypes from "prop-types";

const FinishedScreen = ({ score, totalPoints, highscore, dispatch }) => {
  const scorePercent = ((score * 100) / totalPoints).toFixed(2);
  let emoji;
  if (scorePercent === 100) emoji = "🏅";
  else if (scorePercent >= 80) emoji = "🎉";
  else if (scorePercent >= 50) emoji = "😊";
  else emoji = "🤦";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{score}</strong> out of{" "}
        {totalPoints} ({scorePercent}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points )</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
};

FinishedScreen.propTypes = {
  score: Proptypes.number,
  totalPoints: Proptypes.number,
  highscore: Proptypes.number,
  dispatch: Proptypes.func,
};

export default FinishedScreen;
