// assets/js/inject-menu.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/partials/menu.html")
    .then(response => response.text())
    .then(html => {
      const menuContainer = document.createElement("div");
      menuContainer.innerHTML = html;
      document.body.prepend(menuContainer);
    })
    .catch(error => {
      console.error("Erreur de chargement du menu :", error);
    });
});
