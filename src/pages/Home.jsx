import React, { useState } from "react";
import {
  AddTask,
  CalendarComponent,
  Header,
  CompleteStatus,
  TaskList,
} from "../components";
import { useToDo } from "../context/ToDoContext";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { getTaskStats } from "../utils/taskStats";

export const Home = () => {
  const { tasks, addTask, updateTask, deleteTask } = useToDo();

  const [selectedDate, setSelectedDate] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const editTask = (task) => setEditingTask(task);
  const cancelEdit = () => setEditingTask(null);

  // Use custom hook for filtering
  const { selectedDateStr, filteredTasks } = useTaskFilters(tasks, selectedDate);

  // Use utility for stats
  const { completedCount, totalCount } = getTaskStats(tasks);

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    if (editingTask && editingTask.id === taskId) {
      cancelEdit();
    }
  };

  const handleBack = () => {
    setSelectedDate(null);
    cancelEdit();
  };

  return (
    <main className="min-h-screen bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <Header />

        <CompleteStatus
          completedCount={completedCount}
          totalCount={totalCount}
        />

        {selectedDate ? (
          <>
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600 text-zinc-200"
            >
              ← Back to Calendar
            </button>
            <section className="bg-zinc-800 rounded-lg p-6 mb-10 shadow-lg">
              <AddTask
                selectedDate={selectedDateStr}
                addTask={addTask}
                editingTask={editingTask}
                updateTask={updateTask}
                cancelEdit={cancelEdit}
              />
            </section>
            <TaskList
              handleDelete={handleDelete}
              filteredTasks={filteredTasks}
              editTask={editTask}
            />
          </>
        ) : (
          <>
            <section className="bg-zinc-800 rounded-lg p-6 mb-10 shadow-lg">
              <AddTask selectedDate={selectedDateStr} addTask={addTask} />
            </section>
            <section className="flex justify-center mb-10">
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                tasks={tasks}
              />
            </section>
            <section>
              <div className="text-center text-zinc-500 italic mt-12">
                Select a date to view its tasks.
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

