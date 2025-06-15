// 🎛️ Gestion des niveaux d’intensité du thème céleste
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#intensity-selector button");
  const range = document.querySelector("#intensity-range");
  const body = document.body;
  const levels = ["clair", "doux", "nuit"];

  const applyIntensity = (level) => {
    levels.forEach(l => body.classList.remove("theme-celeste-" + l));
    body.classList.add("theme-celeste-" + level);
    localStorage.setItem("celeste-intensity", level);
  };

  // Initialisation
  const saved = localStorage.getItem("celeste-intensity");
  if (saved && levels.includes(saved)) {
    applyIntensity(saved);
    if (range) range.value = levels.indexOf(saved);
  }

  // Boutons cliquables
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      applyIntensity(levels[i]);
      if (range) range.value = i;
    });
  });

  // Slider
  if (range) {
    range.addEventListener("input", () => {
      const level = levels[range.value];
      applyIntensity(level);
    });
  }
});
