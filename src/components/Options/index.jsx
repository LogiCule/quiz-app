import Proptypes from "prop-types";

const Options = ({ options, dispatch, answer, correctOption }) => {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          disabled={answer !== null}
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null && index === correctOption ? "correct" : ""
          } ${index !== correctOption && answer !== null ? "wrong" : ""}`}
          onClick={() => {
            if (answer === null)
              dispatch({ type: "setAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

Options.propTypes = {
  options: Proptypes.arrayOf(Proptypes.string),
  dispatch: Proptypes.func,
  answer: Proptypes.number,
  correctOption: Proptypes.number,
};
export default Options;
