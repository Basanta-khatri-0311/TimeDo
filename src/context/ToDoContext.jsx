import { useContext, createContext, useState } from "react";

const ToDoContext = createContext();

//provider
const TodoContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ToDoContext.Provider value={{ tasks, addTask, updateTask , deleteTask }}>
      {children}
    </ToDoContext.Provider>
  );
};

//consumer
const useToDo = () => useContext(ToDoContext);

export { TodoContextProvider, useToDo };
