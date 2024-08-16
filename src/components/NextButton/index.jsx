import Proptypes from "prop-types";

const NextButton = ({ dispatch, answer, index, numQ }) => {
  if (answer == null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: "next" });
      }}
    >
      {index !== numQ - 1 ? "Next" : "Finish"}
    </button>
  );
};

NextButton.propTypes = {
  dispatch: Proptypes.func,
  answer: Proptypes.number,
  index: Proptypes.number,
  numQ: Proptypes.number,
};
export default NextButton;
