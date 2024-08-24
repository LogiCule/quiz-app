import { useEffect } from "react";
import Proptypes from "prop-types";
function padByZero(input) {
  return input.toString().padStart(2, "0");
}
const Timer = ({ dispatch, secleft }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  const min = padByZero(Math.floor(secleft / 60));
  const sec = padByZero(secleft % 60);

  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
};

Timer.propTypes = {
  dispatch: Proptypes.func,
  secleft: Proptypes.number,
};

export default Timer;
