// scripts/tasks/taskManager.js
import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorage.js";
import { renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

/** Get the next numeric id (max + 1) */
function getNextId(tasks) {
  return tasks.length ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1 : 1;
}

/** Create a new task from the Add New Task modal. */
export function addNewTask() {
  const title = document.getElementById("title-input")?.value.trim();
  const description = document.getElementById("desc-input")?.value.trim();
  const status = document.getElementById("select-status")?.value || "todo";
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: getNextId(tasks),
    title,
    description: description || "",
    status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);
  renderTasks(updatedTasks);
  resetForm();
  overlay?.close();
}

/**
 * Update a task by id. Pass only the fields that change (e.g., {title, description, status}).
 * After saving, the board re-renders and the task moves to the correct column if status changed.
 */
export function updateTaskById(id, updates) {
  const tasks = loadTasksFromStorage();
  const idx = tasks.findIndex((t) => String(t.id) === String(id));
  if (idx === -1) return;
  tasks[idx] = { ...tasks[idx], ...updates };
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}

/** Delete a task by id, then re-render. */
export function deleteTaskById(id) {
  let tasks = loadTasksFromStorage();
  tasks = tasks.filter((t) => String(t.id) !== String(id));
  saveTasksToStorage(tasks);
  renderTasks(tasks);
}
