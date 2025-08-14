// api.js
export async function fetchTasksFromAPI() {
  try {
    const res = await fetch("https://jsl-kanban-api.vercel.app/");
    if (!res.ok) throw new Error("Failed to fetch tasks");

    const data = await res.json();

    // Normalize task data
    return data.map(item => ({
      id: String(item.id), // ensure IDs are strings
      title: item.title || "Untitled Task",
      description: item.description || "No description provided",
      status: item.status || (item.completed ? "done" : "todo"),
      priority: item.priority || "Medium"
    }));

  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}
