import React, { useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [targetMinutes, setTargetMinutes] = useState("");
  return (
    <form className="flex ">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target (min)"
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(e.target.value)}
      />
    </form>
  );
};

export default AddTask;
