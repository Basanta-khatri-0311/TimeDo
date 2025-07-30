import { useState, useEffect } from "react";
import { StartButton, PauseButton, EndButton } from "./Button";

const ToDoCard = ({ task }) => {
  const [elapsed, setElapsed] = useState(task.elapsed || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(id);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleEnd = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <li className="bg-zinc-800 p-6 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-xl font-semibold text-white mb-1">{task.title}</h2>
        <p className="text-sm text-zinc-400">
          Created: {formatDate(task.createdAt)}
        </p>
        <p className="text-sm mt-1">
          Target:{" "}
          <span className="font-medium text-white">{task.targetMinutes} min</span>
        </p>
        <p className="text-sm">
          Elapsed:{" "}
          <span className="font-medium text-green-400">{formatTime(elapsed)}</span>
        </p>
      </div>

      <div className="flex gap-3">
        {!isRunning ? (
          <StartButton onClick={handleStart} />
        ) : (
          <PauseButton onClick={handlePause} />
        )}
        <EndButton onClick={handleEnd} />
      </div>
    </li>
  );
};

export default ToDoCard;
