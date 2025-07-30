import React, { useState } from "react";
import AddTask from "../components/AddTask";
import ToDoCard from "../components/ToDoCard";
import CalendarComponent from "../components/CalendarComponent";
import { useToDo } from "../context/ToDoContext";

const Home = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useToDo();

  const [selectedDate, setSelectedDate] = useState(null);

  // --- Add these lines for editing state ---
  const [editingTask, setEditingTask] = useState(null);
  const editTask = (task) => setEditingTask(task);
  const cancelEdit = () => setEditingTask(null);
  // ----------------------------------------

  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString("en-CA")
    : "";

  const filteredTasks = selectedDateStr
    ? tasks.filter((task) => task.date === selectedDateStr)
    : [];

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

  // Example summary
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="min-h-screen bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-1 tracking-tight">
            TimeDo
          </h1>
          <p className="text-zinc-400">Plan your day and track your focus</p>
        </header>

        <div className="mb-4 text-zinc-300">
          Completed: {completedCount} / {totalCount}
        </div>

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
            <section>
              {filteredTasks.length > 0 ? (
                <ul className="space-y-5">
                  {filteredTasks.map((task) => (
                    <ToDoCard
                      key={task.id}
                      task={task}
                      updateTask={updateTask}
                      deleteTask={handleDelete}
                      onEdit={() => editTask(task)}
                    />
                  ))}
                </ul>
              ) : (
                <div className="text-center text-zinc-500 italic mt-12">
                  No tasks for this date.
                </div>
              )}
            </section>
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

export default Home;
