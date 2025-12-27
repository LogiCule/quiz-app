import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const Error = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <Card className="glass-strong border-red-500/30">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4"
          >
            <AlertCircle className="w-8 h-8 text-red-400" />
          </motion.div>
          
          <CardTitle className="text-2xl text-white">Oops! Something went wrong</CardTitle>
          <CardDescription className="text-gray-300">
            We couldn't load the quiz questions. Please check your internet connection and try again.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-red-400">Possible issues:</span>
              <br />
              • No internet connection
              <br />
              • API rate limit reached
              <br />
              • Server temporarily unavailable
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={onRetry}
            size="lg"
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

Error.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default Error;
