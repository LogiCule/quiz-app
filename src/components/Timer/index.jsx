import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { formatTime } from "../../utils/helpers";
import { useEffect } from "react";

const Timer = ({ dispatch, secleft }) => {
  const isLowTime = secleft < 30;
  const isCriticalTime = secleft < 10;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <motion.div
      animate={isCriticalTime ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: isCriticalTime ? Infinity : 0, duration: 0.5 }}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg glass border
        ${isCriticalTime 
          ? 'border-red-500/50 bg-red-500/10' 
          : isLowTime 
          ? 'border-yellow-500/50 bg-yellow-500/10' 
          : 'border-white/10'
        }
      `}
    >
      <Clock 
        className={`w-5 h-5 ${
          isCriticalTime 
            ? 'text-red-400' 
            : isLowTime 
            ? 'text-yellow-400' 
            : 'text-gray-400'
        }`}
      />
      <span className={`font-mono text-lg font-semibold ${
        isCriticalTime 
          ? 'text-red-300' 
          : isLowTime 
          ? 'text-yellow-300' 
          : 'text-gray-300'
      }`}>
        {formatTime(secleft)}
      </span>
    </motion.div>
  );
};

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  secleft: PropTypes.number.isRequired,
};

export default Timer;
