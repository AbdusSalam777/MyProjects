import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isrunning, setrunning] = useState(false);
  const [elapsedtime, setelapsedtime] = useState(0);
  const startTime = useRef(0);
  const intervalId = useRef(null);

  useEffect(() => {
    if (isrunning) {
     intervalId.current = setInterval(() => {
          setelapsedtime(Date.now() - startTime.current);
      }, 10);
    
    }

  }, [isrunning]);

  function start() {
     startTime.current=Date.now()-elapsedtime;
    setrunning(true);
  }
  function stop() {
    setrunning(false);
    clearInterval(intervalId.current);
  }
  function reset() {
    setrunning(false);
    clearInterval(intervalId.current);
    setelapsedtime(0);
  }
  function format(elapsedtime) {
    const hours = Math.floor(elapsedtime / 3600000);
    const minutes = Math.floor((elapsedtime % 3600000) / 60000);
    const seconds = Math.floor((elapsedtime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedtime % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="h-screen w-screen text-center flex items-center justify-center mb-6">
      <div className="bg-slate-700 rounded-3xl p-9">
        <p className="text-white text-3xl font-bold mb-5">Stopwatch</p>
        <div className="bg-slate-800 rounded-xl p-4 mb-5">
          <p className="text-white text-4xl font-bold">{format(elapsedtime)}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={start}
            className="bg-green-500 p-4 rounded-xl mx-2 text-white
           shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="bg-red-500 p-4 rounded-xl mx-2 text-white"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="bg-yellow-500 p-4 rounded-xl mx-2 text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
export default Stopwatch;
