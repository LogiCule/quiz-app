import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <Card className="glass-strong border-white/20">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-16 h-16 text-blue-400" />
            </motion.div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-white">Loading Questions...</h3>
              <p className="text-sm text-gray-400">Preparing your quiz experience</p>
            </div>

            {/* Skeleton loaders */}
            <div className="w-full max-w-md space-y-3 mt-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-12 bg-white/5 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

Loader.propTypes = {};

export default Loader;
