import Proptypes from "prop-types";

const FinishedScreen = ({ score, totalPoints }) => {
  const scorePercent = ((score * 100) / totalPoints).toFixed(2);
  return (
    <p className="result">
      You scored <strong>{score}</strong> out of {totalPoints} ({scorePercent}
      %)
    </p>
  );
};

FinishedScreen.propTypes = {
  score: Proptypes.number,
  totalPoints: Proptypes.number,
};

export default FinishedScreen;
