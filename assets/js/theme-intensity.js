// assets/js/theme-intensity.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#intensity-selector button");
  const body = document.body;
  const saved = localStorage.getItem("celeste-intensity");

  if (saved) {
    body.classList.remove("theme-celeste-doux", "theme-celeste-moyen", "theme-celeste-nuit");
    body.classList.add("theme-celeste-" + saved);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.intensity;
      body.classList.remove("theme-celeste-doux", "theme-celeste-moyen", "theme-celeste-nuit");
      body.classList.add("theme-celeste-" + level);
      localStorage.setItem("celeste-intensity", level);
    });
  });
});
