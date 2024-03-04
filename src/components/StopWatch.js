import React, { useState, useRef } from "react";

function Stopwatch() {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const startStopwatch = () => {
    if (!isRunning) {
      const now = Date.now();
      setStartTime(now - elapsedTime);
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const pad = (num) => (num < 10 ? "0" + num : num);
    const milliseconds = ("00" + (time % 1000)).slice(-3);
    const seconds = pad(Math.floor(time / 1000) % 60);
    const minutes = pad(Math.floor(time / (1000 * 60)) % 60);
    const hours = pad(Math.floor(time / (1000 * 60 * 60)) % 24);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
      <button onClick={startStopwatch}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
}

export default Stopwatch;
