// /assets/js/nav-active.js
(() => {
  const normalize = p => p.replace(/\/index\.html?$/i, "/");
  const isSpecial = href => /^(#|mailto:|tel:|javascript:)/i.test(href);

  function activate(nav){
    if(!nav) return;
    const here = new URL(location.href);
    const herePath = normalize(here.pathname);

    nav.querySelectorAll("a[href]").forEach(a => {
      // reset
      a.removeAttribute("aria-current");
      a.classList.remove("active");

      const href = a.getAttribute("href") || "";
      if (isSpecial(href)) return;

      let url;
      try { url = new URL(href, here); } catch { return; }
      if (url.origin !== here.origin) return; // ignore externes (Forum)

      const targetPath = normalize(url.pathname);

      // 1) match exact (page identique)
      const samePage = targetPath === herePath;

      // 2) match de section (seulement si dossier NON racine)
      //    - lien dossier: "/bases/"
      //    - lien fichier: "/bases/bases.html" -> dossier "/bases/"
      const isDirLink = targetPath.endsWith("/");
      const dir = isDirLink
        ? targetPath
        : targetPath.slice(0, targetPath.lastIndexOf("/") + 1); // garde le dossier
      const isRootDir = dir === "/"; // ex. Accueil => "/"
      const sameSection = !isRootDir && herePath.startsWith(dir);

      if (samePage || sameSection) {
        a.setAttribute("aria-current", "page");
        a.classList.add("active");
      }
    });
  }

  function runWhenMenuReady(){
    const nav = document.querySelector(".menu-primary");
    if (nav) { activate(nav); return; }
    const obs = new MutationObserver(() => {
      const n = document.querySelector(".menu-primary");
      if (n){ activate(n); obs.disconnect(); }
    });
    obs.observe(document.documentElement, { childList:true, subtree:true });
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", runWhenMenuReady);
  } else {
    runWhenMenuReady();
  }
})();
