// Thèmes clair / sombre + étoiles en sombre (autonome)
import { setupCanvas, initParticles, stopParticles } from "/assets/js/canvas.js";

// Appliquer le thème IMMÉDIATEMENT après le chargement du script
(function() {
  const root = document.documentElement;
  
  // Récupérer le thème sauvegardé AVANT le rendu
  const savedTheme = localStorage.getItem("site-theme") || "light";
  
  // Appliquer le thème immédiatement
  root.setAttribute("data-theme", savedTheme);
  
  // Masquer le contenu brièvement pour éviter le flash
  const style = document.createElement('style');
  style.textContent = `
    body:not([data-theme]) {
      opacity: 0;
      visibility: hidden;
    }
    body[data-theme] {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.2s ease;
    }
  `;
  document.head.appendChild(style);
  
  // Une fois le DOM chargé, finaliser l'initialisation
  document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-btn");
    const canvas = document.getElementById("theme-canvas");
    
    if (!themeBtn || !canvas) {
      console.warn("Éléments de thème non trouvés");
      return;
    }

    // prépare le canvas: au-dessus du fond, sous le contenu
    function prepareCanvas() {
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.zIndex = "0";
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
        initParticles("stars", 140);
        setCanvasVisible(true);
      } else {
        stopParticles();
        setCanvasVisible(false);
      }
    }

    // Mettre à jour l'interface selon le thème déjà appliqué
    themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    
    // Initialiser le canvas si on est en mode sombre
    if (savedTheme === "dark") {
      prepareCanvas();
      setupCanvas();
      initParticles("stars", 140);
      setCanvasVisible(true);
    }

    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
    
    // Rendre le corps visible
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
  });
})();
