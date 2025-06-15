// 🎛️ Gestion du slider d’intensité du thème céleste
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("intensity-slider");
  const body = document.body;

  const levels = ["clair", "doux", "nuit"];
  const saved = localStorage.getItem("celeste-intensity");

  if (saved && levels.includes(saved)) {
    body.classList.add("theme-celeste-" + saved);
    slider.value = levels.indexOf(saved); // Met le slider à la bonne position
  }

  slider.addEventListener("input", () => {
    body.classList.remove("theme-celeste-clair", "theme-celeste-doux", "theme-celeste-nuit");
    const level = levels[slider.value];
    body.classList.add("theme-celeste-" + level);
    localStorage.setItem("celeste-intensity", level);
  });
});
