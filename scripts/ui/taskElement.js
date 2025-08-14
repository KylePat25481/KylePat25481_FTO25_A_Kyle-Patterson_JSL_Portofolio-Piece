// scripts/ui/taskElement.js
import { openTaskModal } from "./modalHandlers.js";

/**
 * Creates a single task DOM element (card) and shows the task ID in-line.
 * Keeps the original .task-div class to preserve your Figma styling.
 * @param {{id:number|string,title:string,description?:string,status:'todo'|'doing'|'done', priority?:string}} task
 * @returns {HTMLDivElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.dataset.taskId = String(task.id);

  // Render ID + Title in-line so it can't be hidden by layout rules
  taskDiv.innerHTML = `

    <span class="task-title" title="${escapeHtml(task.title)}">${escapeHtml(task.title)}</span>
  `;

  taskDiv.addEventListener("click", () => openTaskModal(task));
  return taskDiv;
}

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  }[m]));
}
