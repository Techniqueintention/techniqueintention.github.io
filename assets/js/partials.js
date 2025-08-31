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
  // Cherche l'élément cible dans le DOM
  const container = document.getElementById(targetId);
  if (!container) {
    console.warn(`❌ injectPartial: cible introuvable (#${targetId})`);
    // On résout la Promise même si la cible est absente
    return Promise.resolve();
  }

  try {
    // Récupère le fragment HTML
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      console.error(`❌ injectPartial: échec ${url} → ${res.status}`);
      // On résout la Promise même en cas d'échec du fetch
      return Promise.resolve();
    }

    const html = await res.text();
    // Injecte le contenu HTML dans la cible
    container.innerHTML = html;

    // (Optionnel) Exécute les <script> présents dans le fragment injecté
    // Utile si le partial contient un script inline
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
    // On résout la Promise après injection et exécution des scripts
    return Promise.resolve();
  } catch (err) {
    console.error(`❌ injectPartial: erreur pendant le fetch de ${url}`, err);
    // On résout la Promise même en cas d'erreur
    return Promise.resolve();
  }
}
