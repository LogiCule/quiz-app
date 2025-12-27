import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Options from "../Options";

const Question = ({ question, answer, dispatch }) => {
  const { question: questionText, options, correctOption } = question;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionText}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="glass-strong border-white/20">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white leading-relaxed">
              {questionText}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Options
              options={options}
              dispatch={dispatch}
              answer={answer}
              correctOption={correctOption}
            />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

export default Question;
