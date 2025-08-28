// /assets/js/nav-active.js
(() => {
  const normalize = p => p.replace(/\/index\.html?$/i, "/");
  const isSpecial = href => /^(#|mailto:|tel:|javascript:)/i.test(href);

  function activate(nav) {
    if (!nav) return;
    const here = new URL(location.href);
    const herePath = normalize(here.pathname);

    nav.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href") || "";
      if (isSpecial(href)) return;

      let url;
      try { url = new URL(href, here); } catch { return; }

      // On n’allume QUE les liens mêmes-origine du bandeau (Forum ignoré)
      if (url.origin !== here.origin) { a.removeAttribute("aria-current"); return; }

      const targetPath = normalize(url.pathname);

      // Match exact (page)…
      const samePage = targetPath === herePath;

      // …ou match de section (toute page à l’intérieur du dossier du lien)
      // ex: lien /bases/bases.html => dossier /bases/
      const sectionRoot = targetPath.replace(/[^/]*$/, ""); // garde le dossier
      const sameSection = sectionRoot && herePath.startsWith(sectionRoot);

      if (samePage || sameSection) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function runWhenMenuReady() {
    const nav = document.querySelector(".menu-primary");
    if (nav) { activate(nav); return; }

    // Observe l’injection du menu
    const obs = new MutationObserver(() => {
      const n = document.querySelector(".menu-primary");
      if (n) { activate(n); obs.disconnect(); }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Fallback (au cas où l’injection se fait très tard)
    let tries = 0;
    const id = setInterval(() => {
      const n2 = document.querySelector(".menu-primary");
      if (n2 || tries++ > 40) { // ~4s
        if (n2) activate(n2);
        clearInterval(id);
      }
    }, 100);
  }

  // Lance après le parse initial (même si le menu arrive plus tard)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runWhenMenuReady);
  } else {
    runWhenMenuReady();
  }
})();
