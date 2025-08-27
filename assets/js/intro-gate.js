// intro-gate.js — MINIMAL
(function () {
  const isIntro = /\/index\.html$|^\/$/.test(location.pathname);
  if (!isIntro) return;

  // ❌ supprime/commande toute redirection auto ici

  // ✅ bouton "Entrer" uniquement
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#enterBtn');
    if (!btn) return;
    try { localStorage.setItem('ti_seen_intro', '1'); } catch (_) {}
    location.href = '/home.html';
  });
})();
