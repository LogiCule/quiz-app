import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mb-8 text-center"
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center"
        >
          <Brain className="w-6 h-6 text-white" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">
          Quiz Master
        </h1>
      </div>
    </motion.header>
  );
};

export default Header;
