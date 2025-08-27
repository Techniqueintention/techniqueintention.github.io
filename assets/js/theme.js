// Gestion du switch thème
window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("tiTheme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") themeToggle.checked = true;

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("tiTheme", newTheme);
  });
});
