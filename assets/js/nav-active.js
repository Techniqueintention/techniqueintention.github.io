// --- nav-active.js ---
// Marque le lien actif du menu principal en fonction de la section en cours

(function () {
  function normalize(seg){
    if (!seg) return '';
    seg = seg.replace(/\/+$/,'');               // retire slash final
    seg = seg.replace(/^index\.html$/,'home');  // /index -> home
    seg = seg.replace(/\.html$/,'');            // bases.html -> bases
    return seg;
  }

  function currentSection() {
    // prend le 1er segment du chemin (/bases/xxx -> 'bases', /bases.html -> 'bases')
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'home';
    return normalize(parts[0]);
  }

  function markActive() {
    const nav = document.querySelector('.menu-primary');
    if (!nav) return false;

    const section = currentSection(); // ex: 'bases', 'psycho', 'comm'...
    nav.querySelectorAll('a').forEach(a => {
      const url = new URL(a.getAttribute('href'), location.origin);
      const first = url.pathname.split('/').filter(Boolean)[0] || 'home';
      const targetSection = normalize(first);
      a.classList.toggle('active', targetSection === section);
    });
    return true;
  }

  // le header est injecté → on attend qu'il existe
  if (!markActive()){
    const iv = setInterval(() => { if (markActive()) clearInterval(iv); }, 80);
    setTimeout(() => clearInterval(iv), 4000);
  }
})();
