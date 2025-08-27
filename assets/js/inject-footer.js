// Injecte /partials/footer.html dans #footer-placeholder
(async () => {
  const host = document.getElementById('footer-placeholder');
  if (!host) return;

  try {
    const res = await fetch('/partials/footer.html', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Footer partial not found:', res.status);
      host.innerHTML = '';
      return;
    }
    host.innerHTML = await res.text();
  } catch (e) {
    console.error('Footer inject error:', e);
    host.innerHTML = '';
  }
})();
