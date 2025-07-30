import React from "react";
import { useToDo } from "../context/ToDoContext";
import ToDoCard from "../components/ToDoCard";

const TaskList = ({handleDelete, filteredTasks, editTask}) => {
    const { updateTask  } = useToDo()
    
  return (
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
  );
};

export default TaskList;
