// scripts/ui/sidebar.js
export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div"); // <-- matches your HTML
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  // lightweight overlay for mobile
  let overlay = document.querySelector(".sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  // Desktop: hide/show sidebar (adds/removes .hidden on .side-bar)
  toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("hidden");
  });

  // Mobile open
  mobileMenuBtn?.addEventListener("click", () => {
    sidebar?.classList.add("mobile-visible");
    overlay.classList.add("active");
  });

  // Close on overlay click
  overlay.addEventListener("click", () => {
    sidebar?.classList.remove("mobile-visible");
    overlay.classList.remove("active");
  });
}


