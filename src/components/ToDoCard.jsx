import { useState, useEffect } from "react";
import { StartButton, PauseButton, EndButton } from "./Button";

const ToDoCard = ({ task, updateTask, deleteTask, onEdit }) => {
  const [elapsed, setElapsed] = useState(task.elapsed || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const targetMs = task.targetMinutes * 60 * 1000;
  const progress = elapsed / targetMs;
  const isAlmostDone = progress >= 0.9;

  useEffect(() => {
    let id;
    if (isRunning) {
      const start = Date.now() - elapsed;

      id = setInterval(() => {
        const nowElapsed = Date.now() - start;

        // Check if the elapsed time reached target
        if (nowElapsed >= task.targetMinutes * 60 * 1000) {
          setElapsed(task.targetMinutes * 60 * 1000); // clamp to max
          setIsRunning(false); // stop timer
          clearInterval(id);
          updateTask({
            ...task,
            elapsed: targetMs,
            completed: true,
            isRunning: false,
          });
        } else {
          setElapsed(nowElapsed);
        }
      }, 100);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    setElapsed(task.elapsed || 0);
  }, [task.elapsed]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    setIsRunning(false);
    updateTask({ ...task, elapsed });
  };
  const handleEnd = () => {
    setIsRunning(false);
    setElapsed(0);
    updateTask({
      ...task,
      elapsed: targetMs,
      completed: true,
      isRunning: false,
    });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return hours === "00"
      ? `${minutes}:${seconds}:${milliseconds}`
      : `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <li className="bg-zinc-800 p-6 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
      {/* Left Section: Info and Buttons */}
      <div className="flex-1 w-full">
        {/* Title and Elapsed Time */}
        <div className="mb-4">
          <h2 className="text-4xl mb-3 font-semibold text-white">
            {task.title}
          </h2>
          <p>
            Elapsed:{" "}
            <span
              className={`font-bold text-xl tracking-wider ${
                isAlmostDone ? "text-red-500" : "text-green-400"
              }`}
            >
              {formatTime(elapsed)}
            </span>
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-4">
          <p>Created: {formatDate(task.createdAt)}</p>
          <p>
            Target:{" "}
            <span className="text-white font-medium">
              {task.targetMinutes} min
            </span>
          </p>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="px-4 py-1 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-600 hover:text-white transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right Section: Timer Buttons */}
      <div className="flex gap-3 items-center justify-end flex-wrap">
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
