export function getTaskStats(tasks) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  return { completedCount, totalCount };
}
