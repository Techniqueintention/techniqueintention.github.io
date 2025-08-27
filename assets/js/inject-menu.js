// assets/js/inject-menu.js (rappel)
(async () => {
  const host = document.getElementById('menu-placeholder');
  if (!host) return;
  try {
    const html = await (await fetch('/partials/menu.html', { cache: 'no-store' })).text();
    host.innerHTML = html;
  } catch {
    host.textContent = 'Menu indisponible';
  }
})();
