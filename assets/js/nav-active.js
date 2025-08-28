// /assets/js/nav-active.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".menu-primary");
  if (!nav) return;

  const here = new URL(location.href);
  const herePath = here.pathname.replace(/\/index\.html?$/i, "/");

  // Normaliser les chemins de référence du menu
  const normalize = p => p.replace(/\/index\.html?$/i, "/");

  // Liste des items du bandeau
  nav.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return; // liens spéciaux ignorés

    let url;
    try { url = new URL(href, here); } catch { return; }
    if (url.origin !== here.origin) return; // ignorer Forum externe

    const targetPath = normalize(url.pathname);

    // Match exact OU page à l’intérieur du dossier
    const samePage = targetPath === herePath;
    const sameSection = herePath.startsWith(targetPath.replace(/[^/]+$/, "")) 
                        && targetPath.endsWith(".html");

    if (samePage || sameSection) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
});
