// ========================================================
// loader.js (Technique Intention)
// ========================================================

// ⚠️ Injection MENU/FOOTER désormais gérée par main.js via injectPartial()
// => on supprime les fetch('/menu.html') / fetch('/footer.html') ici pour éviter la double-injection.

console.log('loader TI prêt');

// Placeholders pour de futurs hooks "globaux" (animations, thèmes, etc.)
window.addEventListener('DOMContentLoaded', () => {
  // Ex: rétablir un thème si tu enregistres la préférence localStorage côté TI
  const saved = localStorage.getItem('ti-theme');
  if (saved) document.body.className = saved;

  // Ex: wiring menu mobile (les éléments seront présents après injection de menu.html)
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }
});
