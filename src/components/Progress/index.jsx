import Proptypes from "prop-types";

const Progress = ({ index, score, answer, totalPoints, numQ }) => {
  return (
    <header className="progress">
      <progress max={numQ} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQ}
      </p>
      <p>
        <strong>{score}</strong> / {totalPoints} points
      </p>
    </header>
  );
};

Progress.propTypes = {
  totalPoints: Proptypes.number,
  index: Proptypes.number,
  score: Proptypes.number,
  answer: Proptypes.number,
  numQ: Proptypes.number,
};

export default Progress;
