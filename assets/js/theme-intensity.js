// assets/js/theme-intensity.js
document.addEventListener("DOMContentLoaded", () => {
  const levels = ["clair", "doux", "nuit"]; // ← ordre respecté ici
  const range = document.getElementById("intensity-range");
  const buttons = document.querySelectorAll("#intensity-selector button");
  const body = document.body;
  const saved = localStorage.getItem("celeste-intensity");

  function applyTheme(level) {
    body.classList.remove("theme-celeste-clair", "theme-celeste-doux", "theme-celeste-nuit");
    body.classList.add("theme-celeste-" + level);
    localStorage.setItem("celeste-intensity", level);
  }

  // Initialisation
  if (saved && levels.includes(saved)) {
    applyTheme(saved);
    range.value = levels.indexOf(saved);
  } else {
    applyTheme("doux");
    range.value = 1;
  }

  // Slider
  range.addEventListener("input", () => {
    const level = levels[range.value];
    applyTheme(level);
  });

  // Boutons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.intensity;
      if (levels.includes(level)) {
        applyTheme(level);
        range.value = levels.indexOf(level);
      }
    });
  });
});
