// /assets/js/nav-active.js
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".menu-primary");
  if (!nav) return;

  const here = new URL(location.href);
  const herePath = here.pathname.replace(/\/index\.html?$/i, "/");

  nav.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href") || "";

    // Ignore ancres et schémas spéciaux
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;

    // Résout l'URL
    let url;
    try { url = new URL(href, here); } catch { return; }

    // Ignore hors domaine (Forum, etc.)
    if (url.origin !== here.origin) return;

    const targetPath = url.pathname.replace(/\/index\.html?$/i, "/");
    if (targetPath === herePath) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
});
