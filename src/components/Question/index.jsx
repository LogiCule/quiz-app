import Proptypes from "prop-types";
import Options from "../Options";
const Question = ({ question, answer, dispatch }) => {
  const { options, correctOption } = question;
    
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
};

Question.propTypes = {
  question: Proptypes.object,
  answer: Proptypes.number,
  dispatch: Proptypes.func,
};

export default Question;
