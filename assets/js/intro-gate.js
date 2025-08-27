/* assets/js/intro-gate.js – redirige intro vers home si déjà vu */

// /assets/js/intro-gate.js
// S'exécute UNIQUEMENT sur la page d'intro
(function () {
  const isIntro = /\/index\.html$|^\/$/.test(location.pathname);
  if (!isIntro) return; // ne fait rien ailleurs

  // Bouton "Entrer" : on pose le flag et on va sur Home
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#enterBtn');
    if (!btn) return;
    try { localStorage.setItem('ti_seen_intro', '1'); } catch (_) {}
    location.href = '/home.html';
  });

  // 👉 Aucune redirection automatique au chargement.
})();
