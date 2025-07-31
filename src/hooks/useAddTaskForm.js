import { useState, useEffect } from "react";
import { useToDo } from "../context/ToDoContext";

export function useAddTaskForm({
  selectedDate,
  addTaskProp,
  editingTask,
  updateTask,
  cancelEdit,
}) {
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
      alert("Please fill in title and target minutes.");
      return;
    }
    if (editingTask) {
      const newTarget = parseInt(targetMinutes);
      const oldTarget = editingTask.targetMinutes;
      const maxCompletedTarget =
        editingTask.maxCompletedTargetMinutes || oldTarget;

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

  return {
    title,
    setTitle,
    targetMinutes,
    setTargetMinutes,
    handleSubmit,
  };
}