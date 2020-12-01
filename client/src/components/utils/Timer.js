import { useState, useEffect } from "react";

export function useTimer() {
  const [state, setState] = useState(() => ({ time: 0, isOn: false }));
  const [startTime, setStartTime] = useState(() => 0);

  useEffect(() => {
    let interval = null;
    if (state.isOn) {
      interval = setInterval(() => {
        setState({
          isOn: true,
          time: getTime(),
        });
      }, 1);
    } else if (!state.isOn && state.time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state.isOn, state.time]);

  const startTimer = () => {
    if (!state.isOn) {
      setState({
        time: 0,
        isOn: true,
      });
      setStartTime(Date.now() - state.time);
    }
  };

  const getTime = () => {
    let time = Date.now() - startTime;

    return time;
  };

  const stopTimer = () => {
    if (state.isOn) {
      setState((state) => ({ ...state, isOn: false }));
      console.log("Stop");
    }
  };

  const resetTimer = () => {
    setState((state) => ({ ...state, time: 0, isOn: false }));
    console.log("Reset");
  };

  return [state.time, startTimer, stopTimer, resetTimer];
}
