import { useEffect, useRef, useState } from "react";
import "./App.css";
import React from "react";
import "./index.css";

function CountdownTimer() {
  const [day, setDay] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(day);
  const running = useRef(null);
  const [button1,setButton1]=useState(true);

  const App = (time) => {
    const futureDate = day;
    const presentDate = new Date();
    var seconds = Math.floor((futureDate - presentDate) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  const startButton = () => {
    if (running.current !== null) {
      return;
    } else {
      running.current = window.setInterval(() => {
        setTimeRemaining(
          (prevtimeRemaining) => new Date(prevtimeRemaining.getTime() - 1000)
        );
      }, 1000);
      setButton1(false);
    }
  };

  const stopButton = () => {
    if (running.current === null) {
      return;
    } else {
      clearInterval(running.current);
      running.current = null;
      setButton1(true);

    }
  };

  const resetButton = () => {
    if (running.current !== null) {
      clearInterval(running.current);
    }

    setTimeRemaining(day);
    running.current = null;
  };

  useEffect(() => {
    return () => {
      if (running.current !== null) {
        clearInterval(running.current);
      }
    };
  }, []);
  console.log(day);
  const onchangeDate = (date) => {
    const userEnter = new Date(date.target.value);
    console.log(userEnter);
    setDay(userEnter);
    setTimeRemaining(userEnter);
  };

  return (
    <div className="maindiv">
      <div className="buttt">
        <h2>Time left for your goals</h2>
        <h1 className="h11">{App(timeRemaining)}</h1>
        <h4>Enter date</h4>
        <input type="date" onChange={(e) => onchangeDate(e)} />
        <div className="space">
          

        {button1?<button onClick={startButton}>
            <span className="material-symbols-outlined">play_circle</span>
          </button>:<button onClick={stopButton}>
            <span className="material-symbols-outlined">pause</span>
          </button>}



          
          <button onClick={resetButton}>
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
