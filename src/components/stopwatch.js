import React, { useState, useEffect } from 'react';
import "../stylesheet/stopwatch.css";

const Stopwatch = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          
          if (prevMilliseconds === 99) {
            
            setSeconds((prevSeconds) => {
              if (prevSeconds === 59) {
                
                setMinutes((prevMinutes) => prevMinutes + 1);
                return 0;
              }
              return prevSeconds + 1;
            });
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startWatch = () => setIsRunning(true);
  const stopWatch = () => setIsRunning(false);
  const resetWatch = () => {
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setIsRunning(false);
  };

  return (
    <div className="stopwatch-controls">
      <div className="watch">
        <div className="timings">
          <span className="timing minute">{String(minutes).padStart(2, '0')}:</span>
          <span className="timing second">{String(seconds).padStart(2, '0')}:</span>
          <span className="timing millisecond">{String(milliseconds).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="control-button">
        <button className="control start" onClick={startWatch}>Start</button>
        <button className="control stop" onClick={stopWatch}>Stop</button>
        <button className="control reset" onClick={resetWatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
