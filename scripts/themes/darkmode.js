let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode','active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode() 

themeSwitch.addEventListener("click", ()=>{
    darkmode = localStorage.getItem('darkmode')
    darkmode !=="active" ? enableDarkmode() : disableDarkmode()
})

export function initThemeToggle() {
  const toggle = document.querySelector("#theme-toggle");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme", toggle.checked);
    localStorage.setItem("theme", toggle.checked ? "dark" : "light");
  })

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    toggle.checked = true;
  }
}
  // Save theme choice
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark-theme') ? 'dark' : 'light'
  );

const logo = document.querySelector(".logo-img"); // Your logo image element

const updateLogoForTheme = () => {
    if (document.body.classList.contains("darkmode")) {
        logo.src = "assets/logo-dark.svg";
    } else {
        logo.src = "assets/logo-light.svg";
    }
};

// Run on load + toggle
updateLogoForTheme();
themeSwitch.addEventListener("click", updateLogoForTheme);