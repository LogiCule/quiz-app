import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Star, Zap, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DIFFICULTIES } from "../../constants/difficulties";
import { calculatePercentage } from "../../utils/helpers";

const FinishedScreen = ({ score, totalPoints, totalCorrect, numQ, highscores = {}, difficulty, dispatch, onPlayAgain }) => {
  const percentage = calculatePercentage(score, totalPoints);
  const correctPercentage = calculatePercentage(totalCorrect, numQ);
  const difficultyHighScore = highscores[difficulty] || 0;
  const isNewHighScore = score >= difficultyHighScore;
  const difficultyInfo = Object.values(DIFFICULTIES).find(d => d.value === difficulty);

  // Performance message based on score
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🎉", color: "text-yellow-400" };
    if (percentage >= 75) return { text: "Excellent Work! 🌟", color: "text-green-400" };
    if (percentage >= 60) return { text: "Good Job! 👍", color: "text-blue-400" };
    if (percentage >= 40) return { text: "Keep Practicing! 💪", color: "text-orange-400" };
    return { text: "Don't Give Up! 🎯", color: "text-gray-400" };
  };

  const performance = getPerformanceMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="w-full"
    >
      <Card className="glass-strong border-white/20">
        <CardHeader className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center ${
              percentage >= 75 ? 'bg-gradient-to-br from-yellow-500 to-orange-500 glow-strong' : 'bg-gradient-to-br from-blue-600 to-cyan-500'
            }`}
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>

          <div>
            <CardTitle className={`text-3xl md:text-4xl font-bold mb-2 ${performance.color}`}>
              {performance.text}
            </CardTitle>
            <CardDescription className="text-lg text-gray-300">
              Quiz Completed!
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score display */}
          <div className="glass rounded-xl p-6 text-center space-y-2">
            <div className="text-sm text-gray-400 uppercase tracking-wide">Your Score</div>
            <div className="text-5xl md:text-6xl font-bold gradient-text">
              {score}
            </div>
            <div className="text-gray-400">out of {totalPoints} points</div>
            <div className="text-2xl font-semibold text-white mt-2">
              {percentage}%
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Correct</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {totalCorrect} / {numQ}
              </div>
              <div className="text-xs text-gray-400 mt-1">{correctPercentage}%</div>
            </div>

            <div className="glass rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">High Score ({difficultyInfo?.label})</span>
              </div>
              <div className="text-2xl font-bold text-white">{difficultyHighScore}</div>
              {isNewHighScore && score > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1"
                >
                  <Badge variant="success" className="text-xs">
                    New Record! 🎉
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>

          {/* Difficulty completed */}
          {difficultyInfo && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Completed on</span>
              <Badge variant={difficultyInfo.color}>
                {difficultyInfo.icon} {difficultyInfo.label}
              </Badge>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => dispatch({ type: "restart" })}
            size="lg"
            variant="outline"
            className="flex-1 border-white/20 hover:bg-white/10"
          >
            <Home className="w-5 h-5 mr-2" />
            Change Difficulty
          </Button>
          
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

FinishedScreen.propTypes = {
  score: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
  totalCorrect: PropTypes.number.isRequired,
  numQ: PropTypes.number.isRequired,
  highscores: PropTypes.object,
  difficulty: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

export default FinishedScreen;
