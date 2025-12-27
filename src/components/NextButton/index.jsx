import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "../ui/button";

const NextButton = ({ dispatch, answer, numQ, index }) => {
  const isLastQuestion = index === numQ - 1;
  const hasAnswered = answer !== null;

  const handleClick = () => {
    if (isLastQuestion) {
      dispatch({ type: "finish" });
    } else {
      dispatch({ type: "next" });
    }
  };

  if (!hasAnswered) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Button
        onClick={handleClick}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        size="lg"
      >
        {isLastQuestion ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Finish Quiz
          </>
        ) : (
          <>
            Next Question
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </>
        )}
      </Button>
    </motion.div>
  );
};

NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
  numQ: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default NextButton;
