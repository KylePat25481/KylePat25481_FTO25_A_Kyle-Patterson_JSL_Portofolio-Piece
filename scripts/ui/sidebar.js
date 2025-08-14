// sidebar.js
export function setupSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  // Create overlay for mobile menu
  let overlay = document.querySelector(".sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("sidebar-overlay");
    document.body.appendChild(overlay);
  }

  // Desktop toggle
  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  // Mobile toggle
  mobileMenuBtn?.addEventListener("click", () => {
    sidebar.classList.add("mobile-visible");
    overlay.classList.add("active");
  });

  // Close on overlay click
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-visible");
    overlay.classList.remove("active");
  });
}

