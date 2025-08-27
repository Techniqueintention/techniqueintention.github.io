window.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-btn");

  // Thème initial
  let savedTheme = localStorage.getItem("tiTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "☀︎" : "☾";

  // Clic
  themeBtn.addEventListener("click", () => {
    let current = document.documentElement.getAttribute("data-theme");
    let newTheme = current === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("tiTheme", newTheme);

    themeBtn.textContent = newTheme === "dark" ? "☀︎" : "☾";
  });
});
