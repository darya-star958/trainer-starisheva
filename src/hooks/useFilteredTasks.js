import { useMemo } from "react";
import { filterTasks } from "../lib/tasks";

export function useFilteredTasks(tasks, filters) {
  const filtered = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters]
  );

  return { filtered };
}