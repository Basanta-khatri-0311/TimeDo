import React, { useState } from "react";
import AddTask from "../components/AddTask";
import ToDoCard from "../components/ToDoCard";
import { useToDo } from "../context/ToDoContext";

const Home = () => {
  const { tasks, updateTask, deleteTask } = useToDo();
  const [editingTask, setEditingTask] = useState(null);

  const startEditing = (task) => setEditingTask(task);
  const stopEditing = () => setEditingTask(null);

  return (
    <main className="min-h-screen bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-1 tracking-tight">
            TimeDo
          </h1>
          <p className="text-zinc-400">Plan your day and track your focus</p>
        </header>

        {/* Add or Edit Task Form */}
        <section className="bg-zinc-800 rounded-lg p-6 mb-10 shadow-lg">
          <AddTask editingTask={editingTask} stopEditing={stopEditing} />
        </section>

        {/* Task List */}
        <section>
          {tasks.length > 0 ? (
            <ul className="space-y-5">
              {tasks.map((task) => (
                <ToDoCard
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  onEdit={() => startEditing(task)} 
                />
              ))}
            </ul>
          ) : (
            <div className="text-center text-zinc-500 italic mt-12">
              No tasks yet — start by adding one above.
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
