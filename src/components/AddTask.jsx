import { useAddTaskForm } from "../hooks/useAddTaskForm";

export const AddTask = ({
  selectedDate,
  addTask: addTaskProp,
  editingTask,
  updateTask,
  cancelEdit,
}) => {
  const {
    title,
    setTitle,
    targetMinutes,
    setTargetMinutes,
    handleSubmit,
  } = useAddTaskForm({
    selectedDate,
    addTaskProp,
    editingTask,
    updateTask,
    cancelEdit,
  });

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
        className="px-4 py-2 border rounded-md w-3/4 sm:w-1/3"
        min={1}
        inputMode="numeric"
        pattern="[0-9]*"
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

