// inject-menu.js — MINIMAL
(async () => {
  const host = document.getElementById('menu-placeholder');
  if (!host) return;
  try {
    const res = await fetch('/partials/menu.html', { cache: 'no-store' });
    if (!res.ok) return;               // ← évite d’injecter la 404
    host.innerHTML = await res.text();
  } catch (_) {}
})();
