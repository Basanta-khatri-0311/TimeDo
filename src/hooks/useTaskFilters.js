import { useMemo } from "react";

export function useTaskFilters(tasks, selectedDate) {
  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString("en-CA")
    : "";

  const filteredTasks = useMemo(
    () =>
      selectedDateStr
        ? tasks.filter((task) => task.date === selectedDateStr)
        : [],
    [tasks, selectedDateStr]
  );

  return { selectedDateStr, filteredTasks };
}