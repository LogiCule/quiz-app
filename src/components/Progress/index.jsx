import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Progress as ProgressBar } from "../ui/progress";
import { Badge } from "../ui/badge";
import { DIFFICULTIES } from "../../constants/difficulties";

const Progress = ({ totalPoints, numQ, index, score, answer, difficulty }) => {
  const progressPercentage = ((index + (answer !== null ? 1 : 0)) / numQ) * 100;
  const difficultyInfo = Object.values(DIFFICULTIES).find(d => d.value === difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 space-y-4"
    >
      <div className="glass rounded-lg p-4 space-y-3">
        {/* Top row: Question number and score */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Question</span>
            <span className="font-bold text-white text-lg">
              {index + 1}
            </span>
            <span className="text-gray-400">/ {numQ}</span>
            
            {difficultyInfo && (
              <Badge variant={difficultyInfo.color} className="ml-2">
                {difficultyInfo.icon} {difficultyInfo.label}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-white text-lg">{score}</span>
            <span className="text-gray-400">/ {totalPoints}</span>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar value={progressPercentage} className="h-2" />
      </div>
    </motion.div>
  );
};

Progress.propTypes = {
  totalPoints: PropTypes.number.isRequired,
  numQ: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  answer: PropTypes.number,
  difficulty: PropTypes.string,
};

export default Progress;
