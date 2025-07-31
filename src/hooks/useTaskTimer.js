import { useState, useEffect } from "react";

export function useTaskTimer(task, updateTask) {
  const [elapsed, setElapsed] = useState(task.elapsed || 0);
  const [isRunning, setIsRunning] = useState(false);

  const targetMs = task.targetMinutes * 60 * 1000;

  useEffect(() => {
    let id;
    if (isRunning) {
      const start = Date.now() - elapsed;
      id = setInterval(() => {
        const nowElapsed = Date.now() - start;
        if (nowElapsed >= targetMs) {
          setElapsed(targetMs);
          setIsRunning(false);
          clearInterval(id);
          updateTask({
            ...task,
            elapsed: targetMs,
            completed: true,
            isRunning: false,
            maxCompletedTargetMinutes: Math.max(
              task.maxCompletedTargetMinutes || 0,
              task.targetMinutes
            ),
          });
        } else {
          setElapsed(nowElapsed);
        }
      }, 100);
      return () => clearInterval(id);
    }
    return () => {};
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
      maxCompletedTargetMinutes: Math.max(
        task.maxCompletedTargetMinutes || 0,
        task.targetMinutes
      ),
    });
  };

  return {
    elapsed,
    isRunning,
    handleStart,
    handlePause,
    handleEnd,
    setElapsed,
    setIsRunning,
    targetMs,
  };
}
