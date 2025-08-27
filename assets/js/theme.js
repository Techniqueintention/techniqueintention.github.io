import { setupCanvas, initParticles, stopParticles } from "/assets/js/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // attendre que le bouton soit bien injecté
  const checkBtn = setInterval(() => {
    const themeBtn = document.getElementById("theme-btn");
    if (!themeBtn) return;

    clearInterval(checkBtn);

    // Fonction d'application du thème
    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("site-theme", theme);
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";

      if (theme === "dark") {
        setupCanvas();
        initParticles("stars", 120); // 🌌 étoiles animées
      } else {
        stopParticles(); // ⛔ enlève les étoiles
      }
    }

    // Charger le thème sauvegardé
    let savedTheme = localStorage.getItem("site-theme") || "light";
    applyTheme(savedTheme);

    // Basculer le thème au clic
    themeBtn.addEventListener("click", () => {
      let current = root.getAttribute("data-theme");
      let newTheme = current === "light" ? "dark" : "light";
      applyTheme(newTheme);
    });
  }, 100);
});
