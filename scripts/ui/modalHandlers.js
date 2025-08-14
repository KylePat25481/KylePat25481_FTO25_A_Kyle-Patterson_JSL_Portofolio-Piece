// scripts/ui/modalHandlers.js
import { addNewTask, updateTaskById, deleteTaskById } from "../tasks/taskManager.js";

/** X/close button for the view/edit modal */
export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.close());
  }
}

/** Add New Task modal open/close + submit */
export function setupNewTaskModalHandler() {
  const overlay = document.querySelector(".modal-overlay");
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const form = document.querySelector(".modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  newTaskBtn?.addEventListener("click", () => {
    overlay?.showModal();
  });

  cancelBtn?.addEventListener("click", () => overlay?.close());

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) addNewTask();
    else form.reportValidity();
  });
}

/**
 * Opens the view/edit modal prefilled for a given task.
 * Creates Save and Delete buttons (once) if they are not in the HTML.
 */
export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  // Fill fields
  const titleEl = document.getElementById("task-title");
  const descEl = document.getElementById("task-desc");
  const statusEl = document.getElementById("task-status");

  if (titleEl) titleEl.value = task.title || "";
  if (descEl) descEl.value = task.description || "";
  if (statusEl) statusEl.value = task.status || "todo";

  // Tag current editing id
  const form = document.getElementById("task-form");
  form?.setAttribute("data-editing-id", String(task.id));

  // Ensure action buttons exist (non-destructive to your HTML)
  ensureEditButtons(form);

  modal.showModal();
}

function ensureEditButtons(form) {
  if (!form) return;

  // Footer container
  let footer = form.querySelector(".modal-footer");
  if (!footer) {
    footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.style.display = "flex";
    footer.style.gap = "8px";
    footer.style.marginTop = "16px";
    form.appendChild(footer);
  }

  // Save
  let saveBtn = footer.querySelector(".save-task-btn");
  if (!saveBtn) {
    saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "save-task-btn";
    saveBtn.textContent = "Save";
    saveBtn.style.cssText = "padding:10px 16px;border-radius:8px;border:0;background:#635fc7;color:#fff;font-weight:600;cursor:pointer;";
    footer.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      const id = form.getAttribute("data-editing-id");
      const title = document.getElementById("task-title")?.value.trim() || "";
      const description = document.getElementById("task-desc")?.value.trim() || "";
      const status = document.getElementById("task-status")?.value || "todo";
      if (!id || !title) return;
      updateTaskById(id, { title, description, status });
      document.getElementById("task-modal")?.close();
    });
  }

  // Delete
  let delBtn = footer.querySelector(".delete-task-btn");
  if (!delBtn) {
    delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "delete-task-btn";
    delBtn.textContent = "Delete";
    delBtn.style.cssText = "padding:10px 16px;border-radius:8px;border:0;background:#EA5555;color:#fff;font-weight:600;cursor:pointer;";
    footer.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      const id = form.getAttribute("data-editing-id");
      if (!id) return;
      const confirmed = window.confirm("Delete this task? This cannot be undone.");
      if (!confirmed) return;
      deleteTaskById(id);
      document.getElementById("task-modal")?.close();
    });
  }
}
