import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Brain, Sparkles, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DIFFICULTY_OPTIONS } from "../../constants/difficulties";

const StartScreen = ({ onStart, highscores = { easy: 0, medium: 0, hard: 0 } }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="glass-strong border-white/20">
        <CardHeader className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          
          <div>
            <CardTitle className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              Quiz Master
            </CardTitle>
            <CardDescription className="text-lg text-gray-300">
              Test your knowledge with trivia questions
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Choose Your Difficulty</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DIFFICULTY_OPTIONS.map((diff) => (
                <motion.button
                  key={diff.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${selectedDifficulty === diff.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{diff.icon}</div>
                  <div className="font-semibold text-white mb-1">{diff.label}</div>
                  <div className="text-xs text-gray-400">{diff.description}</div>
                  <Badge 
                    variant={diff.color} 
                    className="mt-2"
                  >
                    {diff.points} pts per question
                  </Badge>
                  
                  {/* High Score Display */}
                  {highscores[diff.value] > 0 && (
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs text-yellow-400">
                      <Trophy className="w-3 h-3" />
                      <span>Best: {highscores[diff.value]}</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Trophy className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <span className="font-semibold text-white">10 questions</span> · 
              <span className="ml-1">30 seconds per question</span> · 
              <span className="ml-1">Beat your high score!</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={handleStart}
            size="lg"
            className="w-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 glow"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
          
          <p className="text-xs text-center text-gray-400">
            Powered by Open Trivia DB
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

StartScreen.propTypes = {
  onStart: PropTypes.func.isRequired,
  highscores: PropTypes.object,
};

export default StartScreen;
