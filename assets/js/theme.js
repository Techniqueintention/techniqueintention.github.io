// Thèmes clair / sombre + étoiles en sombre (autonome)
import { setupCanvas, initParticles, stopParticles } from "/assets/js/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // attendre l'injection du menu et du bouton
  const check = setInterval(() => {
    const themeBtn = document.getElementById("theme-btn");
    const canvas = document.getElementById("theme-canvas");
    if (!themeBtn || !canvas) return;
    clearInterval(check);

    // prépare le canvas: au-dessus du fond, sous le contenu
    function prepareCanvas() {
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.zIndex = "0";          // ⚠️ plus -1
      canvas.style.pointerEvents = "none";
    }

    function setCanvasVisible(visible) {
      canvas.style.opacity = visible ? "1" : "0";
    }

    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("site-theme", theme);
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";

      if (theme === "dark") {
        prepareCanvas();
        setupCanvas();
        initParticles("stars", 140); // étoiles
        setCanvasVisible(true);
      } else {
        stopParticles();
        setCanvasVisible(false);
      }
    }

    const saved = localStorage.getItem("site-theme") || "light";
    applyTheme(saved);

    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }, 50);
});
