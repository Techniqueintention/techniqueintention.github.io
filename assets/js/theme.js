document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-btn");

  // Charger le thème sauvegardé
  let savedTheme = localStorage.getItem("site-theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  // Basculer le thème au clic
  themeBtn.addEventListener("click", () => {
    let current = root.getAttribute("data-theme");
    let newTheme = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("site-theme", newTheme);
    themeBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
});
