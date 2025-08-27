// inject-footer.js — MINIMAL
(async () => {
  const host = document.getElementById('footer-placeholder');
  if (!host) return;
  try {
    const res = await fetch('/partials/footer.html', { cache: 'no-store' });
    if (!res.ok) return;
    host.innerHTML = await res.text();
  } catch (_) {}
})();
