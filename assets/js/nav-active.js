// /assets/js/nav-active.js
(() => {
  const normalize = p => p.replace(/\/index\.html?$/i, "/");
  const isSpecial = href => /^(#|mailto:|tel:|javascript:)/i.test(href);

  function activate(nav){
    if(!nav) return;
    const here = new URL(location.href);
    const herePath = normalize(here.pathname);

    nav.querySelectorAll("a[href]").forEach(a => {
      a.removeAttribute("aria-current");
      a.classList.remove("active");

      const href = a.getAttribute("href") || "";
      if (isSpecial(href)) return;

      let url;
      try { url = new URL(href, here); } catch { return; }
      if (url.origin !== here.origin) return; // ignore Forum externe

      const targetPath = normalize(url.pathname);

      const samePage   = targetPath === herePath;
      const sectionRoot = targetPath.replace(/[^/]*$/, ""); 
      const sameSection = sectionRoot && herePath.startsWith(sectionRoot);

      if (samePage || sameSection){
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
