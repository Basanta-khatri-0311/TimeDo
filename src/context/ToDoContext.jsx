import { useContext, createContext, useState } from "react";

const ToDoContext = createContext();

//provider
const TodoContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };
  
  return (
    <ToDoContext.Provider value={{ tasks, addTask }}>
      {children}
    </ToDoContext.Provider>
  );
};

//consumer
const useToDo = () => useContext(ToDoContext);

export { TodoContextProvider, useToDo };
