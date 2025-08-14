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

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const hideBtn = document.querySelector(".hide-sidebar-btn");
    const showBtn = document.createElement("div");

    // Floating button for showing sidebar
    showBtn.classList.add("show-sidebar-btn");
    showBtn.innerHTML = `<img src="assets/icon-show-sidebar.svg" alt="Show Sidebar">`;
    document.body.appendChild(showBtn);

    hideBtn.addEventListener("click", () => {
        sidebar.style.display = "none";
        showBtn.style.display = "block";
    });

    showBtn.addEventListener("click", () => {
        sidebar.style.display = "flex";
        showBtn.style.display = "none";
    });
});

const sidebar = document.querySelector('.sidebar');
const hideSidebarBtn = document.querySelector('.sidebar-toggle');
const showSidebarBtn = document.querySelector('.sidebar-toggle'); // This appears when hidden

// Hide sidebar
hideSidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('hidden'); // Hide sidebar
    showSidebarBtn.style.display = 'flex'; // Show "show" button
});

// Show sidebar
showSidebarBtn.addEventListener('click', () => {
    sidebar.classList.remove('hidden'); // Show sidebar
    showSidebarBtn.style.display = 'none'; // Hide "show" button
});
