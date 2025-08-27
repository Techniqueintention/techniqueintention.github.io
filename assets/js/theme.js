document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // attendre que le bouton soit bien injecté
  const checkBtn = setInterval(() => {
    const themeBtn = document.getElementById("theme-btn");
    if (!themeBtn) return;

    clearInterval(checkBtn);

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
  }, 100);
});
