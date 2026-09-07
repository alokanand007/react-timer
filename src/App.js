import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./index.css";

function CountdownTimer() {
  const [day, setDay] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  const [timeRemaining, setTimeRemaining] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.getTime() - Date.now();
  });

  const running = useRef(null);

  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) {
      return "0:0:0:0";
    }

    let seconds = Math.floor(milliseconds / 1000);

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);

    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);

    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  const startButton = () => {
    if (running.current !== null) {
      return;
    }

    running.current = window.setInterval(() => {
      setTimeRemaining((previousTime) => {
        const newTime = previousTime - 1000;

        // Stop timer when countdown reaches zero
        if (newTime <= 0) {
          clearInterval(running.current);
          running.current = null;
          setIsRunning(false);

          return 0;
        }

        return newTime;
      });
    }, 1000);

    setIsRunning(true);
  };

  const stopButton = () => {
    if (running.current === null) {
      return;
    }

    clearInterval(running.current);
    running.current = null;
    setIsRunning(false);
  };

  const resetButton = () => {
    if (running.current !== null) {
      clearInterval(running.current);
    }

    const newTime = day.getTime() - Date.now();

    setTimeRemaining(newTime > 0 ? newTime : 0);
    running.current = null;
    setIsRunning(false);
  };

  const onchangeDate = (event) => {
    const userEnter = new Date(event.target.value);

    setDay(userEnter);

    const newTime = userEnter.getTime() - Date.now();

    setTimeRemaining(newTime > 0 ? newTime : 0);

    if (running.current !== null) {
      clearInterval(running.current);
      running.current = null;
    }

    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (running.current !== null) {
        clearInterval(running.current);
      }
    };
  }, []);

  return (
    <div className="maindiv">
      <div className="buttt">
        <h2>Time left for your goals</h2>

        <h1 className="h11">
          {formatTime(timeRemaining)}
        </h1>

        <h4>Enter date</h4>

        <input
          type="date"
          onChange={onchangeDate}
        />

        <div className="space">
          {isRunning ? (
            <button onClick={stopButton}>
              <span className="material-symbols-outlined">
                pause
              </span>
            </button>
          ) : (
            <button onClick={startButton}>
              <span className="material-symbols-outlined">
                play_circle
              </span>
            </button>
          )}

          <button onClick={resetButton}>
            <span className="material-symbols-outlined">
              restart_alt
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
