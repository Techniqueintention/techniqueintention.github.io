window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeSwitch");

  // Thème par défaut = clair
  let savedTheme = localStorage.getItem("tiTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.checked = savedTheme === "dark";

    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("tiTheme", newTheme);
    });
  }
});
