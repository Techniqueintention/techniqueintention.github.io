// ========================================================
// partials.js — Gestion des fragments HTML (partials)
// ========================================================

/**
 * Injecte un fragment HTML dans un élément cible.
 * @param {string} targetId - ID de l’élément dans lequel injecter (ex: "menu-placeholder")
 * @param {string} url - Chemin du fragment HTML (ex: "/assets/partials/menu.html")
 * @returns {Promise<void>}
 */
export async function injectPartial(targetId, url) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.warn(`❌ injectPartial: cible introuvable (#${targetId})`);
    return;
  }

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      console.error(`❌ injectPartial: échec ${url} → ${res.status}`);
      return;
    }

    const html = await res.text();
    // Remplace le contenu (comme sur Codex)
    container.innerHTML = html;

    // (Optionnel) Exécuter d’éventuels <script> présents dans le fragment
    // — Utile si un partial contient un petit script inline.
    const scripts = container.querySelectorAll("script");
    scripts.forEach(old => {
      const s = document.createElement("script");
      if (old.src) s.src = old.src;
      s.type = old.type || "text/javascript";
      s.defer = old.defer;
      s.async = old.async;
      s.textContent = old.textContent;
      old.replaceWith(s);
    });
  } catch (err) {
    console.error(`❌ injectPartial: erreur pendant le fetch de ${url}`, err);
  }
}
