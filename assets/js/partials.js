// ========================================================
// partials.js — Gestion des fragments HTML (partials)
// ========================================================

/**
 * Injecte un fragment HTML dans un élément cible.
 * @param {string} targetId - ID de l’élément dans lequel injecter
 * @param {string} url - chemin du fragment HTML
 */
export async function injectPartial(targetId, url) {
  try {
    const container = document.getElementById(targetId);
    if (!container) {
      console.warn(`❌ injectPartial: cible introuvable (#${targetId})`);
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`❌ injectPartial: impossible de charger ${url}`);
      return;
    }
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`❌ injectPartial: erreur lors de l’injection ${url}`, err);
  }
}
