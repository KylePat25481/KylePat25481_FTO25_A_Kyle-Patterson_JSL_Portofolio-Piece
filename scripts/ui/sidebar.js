export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const toggleIcon = document.getElementById("sidebar-toggle-icon");
  const toggleText = document.getElementById("sidebar-toggle-text");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  let overlay = document.querySelector(".sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  toggleBtn?.addEventListener("click", () => {
    const isHidden = sidebar?.classList.toggle("hidden");

    if (isHidden) {
      toggleIcon.src = "./assets/icon-show-sidebar.svg";
      toggleIcon.alt = "show-sidebar-icon";
      toggleText.textContent = "Show Sidebar";
      toggleBtn.classList.add("show-mode");
    } else {
      toggleIcon.src = "./assets/icon-hide-sidebar.svg";
      toggleIcon.alt = "hide-sidebar-icon";
      toggleText.textContent = "Hide Sidebar";
      toggleBtn.classList.remove("show-mode");
    }
  });

  mobileMenuBtn?.addEventListener("click", () => {
    sidebar?.classList.add("mobile-visible");
    overlay.classList.add("active");
  });

  overlay.addEventListener("click", () => {
    sidebar?.classList.remove("mobile-visible");
    overlay.classList.remove("active");
  });
}

