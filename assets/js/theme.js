// Gestion du switch thème
window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeSwitch");
  if (!themeToggle) return; // évite l'erreur quand pas de switch

  // Vérifie si un thème est sauvegardé
  const savedTheme = localStorage.getItem("tiTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Active la position du switch
  themeToggle.checked = savedTheme === "dark";

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("tiTheme", newTheme);
  });
});
