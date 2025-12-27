import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";

const Options = ({ options, dispatch, answer, correctOption }) => {
  const hasAnswered = answer !== null;

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = index === answer;
        const isCorrect = index === correctOption;
        const showResult = hasAnswered;

        let buttonClass = "glass border-white/10 text-white hover:bg-white/10 justify-start text-left h-auto py-4 px-5";
        
        if (showResult) {
          if (isCorrect) {
            buttonClass = "bg-green-500/20 border-green-500/50 text-white hover:bg-green-500/20";
          } else if (isSelected && !isCorrect) {
            buttonClass = "bg-red-500/20 border-red-500/50 text-white hover:bg-red-500/20";
          }
        } else if (isSelected) {
          buttonClass = "glass border-blue-500 bg-blue-500/20 text-white";
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!hasAnswered ? { x: 8 } : {}}
            whileTap={!hasAnswered ? { scale: 0.98 } : {}}
          >
            <Button
              onClick={() => !hasAnswered && dispatch({ type: "setAnswer", payload: index })}
              disabled={hasAnswered}
              className={`w-full ${buttonClass} transition-all duration-200`}
            >
              <span className="flex-1">{option}</span>
              
              {showResult && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2"
                >
                  <Check className="w-5 h-5 text-green-400" />
                </motion.div>
              )}
              
              {showResult && isSelected && !isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2"
                >
                  <X className="w-5 h-5 text-red-400" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
  correctOption: PropTypes.number.isRequired,
};

export default Options;
