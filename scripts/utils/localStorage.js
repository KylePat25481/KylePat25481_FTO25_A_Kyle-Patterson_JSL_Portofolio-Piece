// scripts/utils/localStorage.js
import { initialTasks } from "../../initialData.js";

/** Loads tasks from localStorage or initializes with initialTasks. */
export function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : initialTasks;
    } catch {
      // fall back to initialTasks if parse fails
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
      return initialTasks;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(initialTasks));
  return initialTasks;
}

/** Saves tasks array to localStorage. */
export function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
