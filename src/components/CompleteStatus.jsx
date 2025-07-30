import React from "react";

const CompleteStatus = ({ completedCount, totalCount }) => {
  return (
    <div className="mb-4 text-zinc-300">
      Completed: {completedCount} / {totalCount}
    </div>
  );
};

export default CompleteStatus;
