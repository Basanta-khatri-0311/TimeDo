import { useState, useEffect } from "react";
import { useToDo } from "../context/ToDoContext";

const AddTask = ({
  selectedDate,
  addTask: addTaskProp,
  editingTask,
  updateTask,
  cancelEdit,
}) => {
  const { addTask: addTaskContext } = useToDo();
  const addTask = addTaskProp || addTaskContext;

  const [title, setTitle] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setTargetMinutes(editingTask.targetMinutes);
    } else {
      setTitle("");
      setTargetMinutes("");
    }
  }, [editingTask, selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !targetMinutes) {
      return alert("Please fill in title and target minutes.");
    }
    if (editingTask) {
      const newTarget = parseInt(targetMinutes);
      const oldTarget = editingTask.targetMinutes;
      const maxCompletedTarget =
        editingTask.maxCompletedTargetMinutes || oldTarget;

      // Always prevent reducing below max ever completed
      if (maxCompletedTarget > 0 && newTarget < maxCompletedTarget) {
        alert(
          `You cannot set the target below the maximum completed target (${maxCompletedTarget} min).`
        );
        return;
      }

      const newTargetMs = newTarget * 60 * 1000;
      const isNowCompleted = editingTask.elapsed >= newTargetMs;
      updateTask({
        ...editingTask,
        title,
        targetMinutes: newTarget,
        completed: isNowCompleted,
      });
      cancelEdit();
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title,
        targetMinutes: parseInt(targetMinutes),
        elapsed: 0,
        isRunning: false,
        completed: false,
        createdAt: new Date().toISOString(),
        date: selectedDate || new Date().toLocaleDateString("en-CA"),
        maxCompletedTargetMinutes: 0,
      };
      addTask(newTask);
    }
    setTitle("");
    setTargetMinutes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-12 items-center mb-6 sm:p-4"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 border rounded-md w-3/4 sm:w-1/3"
      />
      <input
        type="number"
        style={{
          MozAppearance: "textfield",
          WebkitAppearance: "none",
          margin: 0,
        }}
        placeholder="Target (min)"
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(e.target.value)}
        className="px-4 py-2 border rounded-md w-3/4 sm:w-1/3"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-3/4 sm:w-1/4"
      >
        {editingTask ? "Update" : "Add"}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-600 text-white px-4 py-2 rounded-md w-3/4 sm:w-1/4"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTask;
