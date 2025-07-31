import { StartButton, PauseButton, EndButton } from "./Button";
import { formatTime, formatDate } from "../utils/formateDateTime";
import { useTaskTimer } from "../hooks/useTaskTimer";

const ToDoCard = ({ task, updateTask, deleteTask, onEdit }) => {
  const {
    elapsed,
    isRunning,
    handleStart,
    handlePause,
    handleEnd,
    targetMs,
  } = useTaskTimer(task, updateTask);

  const progress = elapsed / targetMs;
  const isAlmostDone = progress >= 0.9;

  const handleDelete = () => {
    deleteTask(task.id);
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
          <StartButton onClick={handleStart} completed={task.completed} />
        ) : (
          <PauseButton onClick={handlePause} completed={task.completed} />
        )}
        <EndButton onClick={handleEnd} />
      </div>
    </li>
  );
};

export default ToDoCard;