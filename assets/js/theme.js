// Gestion du switch clair/sombre
window.addEventListener("DOMContentLoaded", () => {
  // Thème par défaut : light
  let savedTheme = localStorage.getItem("tiTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Quand le menu est injecté, on active le switch
  const observer = new MutationObserver(() => {
    const themeToggle = document.getElementById("themeSwitch");
    if (themeToggle) {
      themeToggle.checked = savedTheme === "dark";

      themeToggle.addEventListener("change", () => {
        const newTheme = themeToggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("tiTheme", newTheme);
      });

      observer.disconnect(); // stop l’observation une fois trouvé
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
