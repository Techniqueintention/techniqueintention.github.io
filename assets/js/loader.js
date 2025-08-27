// Fonction utilitaire pour charger un fragment HTML dans un élément cible
async function loadPartial(url, selector) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur ${response.status} lors du chargement de ${url}`);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error("Erreur d’injection :", err);
  }
}

// Au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  loadPartial("/assets/partials/menu.html", "#menu-placeholder");
  loadPartial("/assets/partials/footer.html", "#footer-placeholder");
});
