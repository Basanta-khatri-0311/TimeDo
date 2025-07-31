export const CompleteStatus = ({ completedCount, totalCount }) => {
  return (
    <div className="mb-4 text-zinc-300">
      Completed: {completedCount} / {totalCount}
    </div>
  );
};

