document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('viewer-menu');
  const viewer = document.getElementById('article-viewer');
  if (!menu || !viewer) return;

  const basePath = viewer.dataset.basepath || '';
  const paramKey = 'article';

  // Accordéon exclusif pour <details>
  menu.addEventListener('toggle', e => {
    if (e.target.tagName !== 'DETAILS' || !e.target.open) return;
    menu.querySelectorAll('details[open]').forEach(d => d!==e.target && (d.open=false));
  }, true);

  // Clics -> charge fichier
  menu.addEventListener('click', e => {
    const a = e.target.closest('a.menu-link'); if (!a) return;
    e.preventDefault();
    const ref = a.dataset.viewer; if (!ref) return;
    loadArticle(`${basePath}${ref}.html`);
    updateURL(paramKey, ref);
    highlight(menu, a);
  });

  // Démarrage : ?article=... sinon 1er lien
  const fromURL = new URLSearchParams(location.search).get(paramKey);
  if (fromURL) {
    loadArticle(`${basePath}${fromURL}.html`);
    const link = menu.querySelector(`a.menu-link[data-viewer="${CSS.escape(fromURL)}"]`);
    if (link) highlight(menu, link);
  } else {
    const first = menu.querySelector('a.menu-link');
    if (first) first.click();
  }
});

function loadArticle(url) {
  const container = document.getElementById('article-viewer'); if (!container) return;
  fetch(url, { cache: 'no-store' })
    .then(r => r.ok ? r.text() : Promise.reject())
    .then(html => {
      container.style.opacity = '0';
      container.innerHTML = `<article class="doc">${html}</article>`;
      requestAnimationFrame(() => container.style.opacity = '1');
    })
    .catch(() => {
      container.innerHTML = `<article class="doc"><p>Contenu indisponible : ${url}</p></article>`;
    });
}
function highlight(menu, el){ menu.querySelectorAll('a.menu-link').forEach(a=>a.classList.remove('active')); el.classList.add('active'); }
function updateURL(key, val){ const u=new URL(location); u.searchParams.set(key,val); history.replaceState({},'',u); }
