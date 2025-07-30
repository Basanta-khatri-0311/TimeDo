import { useState, useEffect } from "react";
import { useToDo } from "../context/ToDoContext";

const AddTask = ({ editingTask, stopEditing }) => {
  const [title, setTitle] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");

  const { addTask, updateTask } = useToDo();

  // When editingTask changes, populate form fields
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setTargetMinutes(editingTask.targetMinutes.toString());
    } else {
      setTitle("");
      setTargetMinutes("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !targetMinutes)
      return alert("Please fill both title and target minutes");

    if (editingTask) {
      updateTask({
        ...editingTask,
        title,
        targetMinutes: parseInt(targetMinutes),
      });
      stopEditing(); // close editing mode
    } else {
      // Add new task
      const newTask = {
        id: crypto.randomUUID(),
        title,
        targetMinutes: parseInt(targetMinutes),
        startTime: null,
        endTime: null,
        elapsed: 0,
        isRunning: false,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      addTask(newTask);
      setTitle("");
      setTargetMinutes("");
    }
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
        placeholder="Target (min)"
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(e.target.value)}
        className="px-4 py-2 border rounded-md  w-3/4 sm:w-1/3"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md  w-3/4 sm:w-1/4"
      >
        {editingTask ? "Update" : "Add"}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={stopEditing}
          className="bg-gray-600 text-white px-4 py-2 rounded-md w-3/4 sm:w-1/4"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddTask;
