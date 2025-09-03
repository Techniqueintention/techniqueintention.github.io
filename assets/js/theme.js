// Thèmes clair / sombre + étoiles en sombre (autonome)
import { setupCanvas, initParticles, stopParticles } from "/assets/js/canvas.js";

// Appliquer le thème IMMÉDIATEMENT
(function() {
  const root = document.documentElement;
  
  // Récupérer le thème sauvegardé
  const savedTheme = localStorage.getItem("site-theme") || "light";
  
  // Appliquer le thème immédiatement (avant DOMContentLoaded)
  root.setAttribute("data-theme", savedTheme);
})();

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

    // Initialiser avec le thème déjà appliqué
    const saved = localStorage.getItem("site-theme") || "light";
    themeBtn.textContent = saved === "dark" ? "☀️" : "🌙";
    
    // Si le thème est déjà dark, initialiser les particules
    if (saved === "dark") {
      prepareCanvas();
      setupCanvas();
      initParticles("stars", 140);
      setCanvasVisible(true);
    }

    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }, 50);
});

// Gestion de la navigation et restauration des étoiles
window.addEventListener('pageshow', function(event) {
  // Si la page est restaurée depuis le cache navigateur
  if (event.persisted) {
    const theme = document.documentElement.getAttribute('data-theme');
    const canvas = document.getElementById('theme-canvas');
    
    if (theme === 'dark' && canvas) {
      // Réinitialiser les étoiles après un court délai
      setTimeout(() => {
        stopParticles();
        initParticles('stars', 140);
        canvas.style.opacity = '1';
      }, 100);
    }
  }
});

// Réinitialiser aussi quand l'onglet redevient visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    const theme = document.documentElement.getAttribute('data-theme');
    const canvas = document.getElementById('theme-canvas');
    
    if (theme === 'dark' && canvas && canvas.style.opacity === '0') {
      // Redémarrer les particules si elles ne sont pas visibles
      setTimeout(() => {
        stopParticles();
        initParticles('stars', 140);
        canvas.style.opacity = '1';
      }, 100);
    }
  }
});
