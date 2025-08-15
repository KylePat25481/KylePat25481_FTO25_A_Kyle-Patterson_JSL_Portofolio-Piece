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

// Priority Label + Sorting
function updateTaskPriorities() {
  const tasks = Array.from(document.querySelectorAll(".task-modal"));

  tasks.forEach(task => {
    const priority = task.dataset.priority; // simple, medium, difficult
    const priorityDiv = task.querySelector(".task-priority");

    // Set label & color
    if (priority === "simple") {
      priorityDiv.textContent = "Priority: Low";
      priorityDiv.className = "task-priority low";
    } else if (priority === "medium") {
      priorityDiv.textContent = "Priority: Medium";
      priorityDiv.className = "task-priority medium";
    } else if (priority === "difficult") {
      priorityDiv.textContent = "Priority: High";
      priorityDiv.className = "task-priority high";
    }
  });

  // Sort tasks by priority order
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  tasks.sort((a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]);

  // Re-append tasks in sorted order
  const parent = tasks[0]?.parentElement;
  if (parent) {
    tasks.forEach(task => parent.appendChild(task));
  }
}

// Run on page load
updateTaskPriorities();
