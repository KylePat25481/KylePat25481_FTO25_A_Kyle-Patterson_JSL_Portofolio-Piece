// scripts/main.js
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { renderTasks, clearExistingTasks } from "./ui/render.js";
import { setupModalCloseHandler, setupNewTaskModalHandler } from "./ui/modalHandlers.js";
import { setupSidebarToggle } from "./ui/sidebar.js";

function showBanner(text, id = "loading-banner") {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    el.style.cssText =
      "position:fixed;top:0;left:0;right:0;padding:10px 16px;background:#f4f7fd;border-bottom:1px solid #e4ebfa;font-size:14px;z-index:9999;text-align:center;";
    document.body.appendChild(el);
  }
  el.textContent = text;
}
function hideBanner(id = "loading-banner") {
  document.getElementById(id)?.remove();
}

async function fetchInitialTasksIfNeeded() {
  const current = loadTasksFromStorage();
  if (Array.isArray(current) && current.length) {
    clearExistingTasks();
    renderTasks(current);
    return;
  }

  showBanner("Loading tasks…");

  try {
    const res = await fetch("https://jsl-kanban-api.vercel.app/");
    const data = await res.json();
    // Accept either array or {tasks: []}
    const list = Array.isArray(data) ? data : Array.isArray(data?.tasks) ? data.tasks : [];
    const normalized = list.map((t, i) => ({
      id: t.id ?? i + 1,
      title: t.title ?? "Untitled",
      description: t.description ?? "",
      status: ["todo", "doing", "done"].includes(String(t.status).toLowerCase())
        ? String(t.status).toLowerCase()
        : "todo",
      priority: t.priority, // optional
    }));
    saveTasksToStorage(normalized);
    clearExistingTasks();
    renderTasks(normalized);
  } catch (err) {
    console.error(err);
    showBanner("Failed to load tasks from API. Using local data.", "error-banner");
    // fallback to initialData via loadTasksFromStorage()
    const fallback = loadTasksFromStorage();
    clearExistingTasks();
    renderTasks(fallback);
    setTimeout(() => hideBanner("error-banner"), 3500);
  } finally {
    hideBanner();
  }
}

function init() {
  setupSidebarToggle();
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  fetchInitialTasksIfNeeded();
}

document.addEventListener("DOMContentLoaded", init);
