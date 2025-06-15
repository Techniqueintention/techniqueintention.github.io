// 🎛️ Gestion des niveaux d’intensité du thème céleste
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#intensity-selector button");
  const body = document.body;
  const saved = localStorage.getItem("celeste-intensity");

  if (saved) {
    body.classList.add("theme-celeste-" + saved);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      body.classList.remove("theme-celeste-clair", "theme-celeste-doux", "theme-celeste-nuit");
      const level = btn.dataset.intensity;
      body.classList.add("theme-celeste-" + level);
      localStorage.setItem("celeste-intensity", level);
    });
  });
});