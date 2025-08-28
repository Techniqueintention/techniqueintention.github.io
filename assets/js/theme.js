// === Theme manager (clair / nuit étoilée) ===
// Gère aussi le canvas des étoiles via canvas.js

import { setupCanvas, initParticles, stopParticles } from "/assets/js/canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // attend que le menu injecté contienne #theme-btn
  const checkBtn = setInterval(() => {
    const themeBtn = document.getElementById("theme-btn");
    if (!themeBtn) return;
    clearInterval(checkBtn);

    function setCanvasVisible(isVisible) {
      const c = document.getElementById("theme-canvas");
      if (c) {
        // évite tout décalage de layout même en light
        c.style.position = "fixed";
        c.style.inset = "0";
        c.style.zIndex = "-1";
        c.style.pointerEvents = "none";
        c.style.opacity = isVisible ? "1" : "0";
      }
    }

    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("site-theme", theme);
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";

      if (theme === "dark") {
        setupCanvas();                 // prépare le canvas
        initParticles("stars", 140);   // étoiles scintillantes
        setCanvasVisible(true);        // rend visibles les étoiles
      } else {
        stopParticles();               // stoppe + nettoie
        setCanvasVisible(false);       // invisible en clair
      }
    }

    // thème au chargement
    const saved = localStorage.getItem("site-theme") || "light";
    applyTheme(saved);

    // bascule au clic
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }, 100);
});
