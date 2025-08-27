// Injecte /partials/menu.html dans #menu-placeholder (style Codex)
(async () => {
  const host = document.getElementById('menu-placeholder');
  if (!host) return;

  try {
    const res = await fetch('/partials/menu.html', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Menu partial not found:', res.status);
      host.innerHTML = ''; // ne rien afficher si 404
      return;
    }
    host.innerHTML = await res.text();
  } catch (e) {
    console.error('Menu inject error:', e);
    host.innerHTML = '';
  }
})();
