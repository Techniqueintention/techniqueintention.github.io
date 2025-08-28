/* ===== Viewer : charge un fichier HTML externe dans #article-viewer ===== */

(function(){
  const viewer = document.getElementById('article-viewer');
  const menu   = document.getElementById('viewer-menu');
  if (!viewer || !menu) return;

  // bouton Partager injecté dans chaque article
  function injectShareTools(container, url){
    const tools = document.createElement('div');
    tools.id = 'article-tools';
    tools.innerHTML = `
      <button class="btn-share-article" id="btn-share">
        <span>🔗</span> Partager
      </button>
    `;
    container.prepend(tools);
    const btn = tools.querySelector('#btn-share');
    btn.addEventListener('click', async () => {
      const shareUrl = withQuery(url);
      if (navigator.share){
        try { await navigator.share({ title: document.title, url: shareUrl }); } catch(_){}
      } else {
        await navigator.clipboard.writeText(shareUrl);
        btn.textContent = 'Lien copié !';
        setTimeout(()=> btn.innerHTML = '<span>🔗</span> Partager', 1200);
      }
    });
  }

  function withQuery(articlePath){
    const u = new URL(location.href);
    u.searchParams.set('a', articlePath);
    return u.toString();
  }

  // charge et rend un article (un fichier .html qui contient <section class="article">)
  async function loadArticle(articlePath){
    try{
      const res = await fetch(articlePath, { cache: "no-cache" });
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      const dom = new DOMParser().parseFromString(html, 'text/html');
      const section = dom.querySelector('section.article') || dom.body;

      // injecte dans le viewer
      viewer.innerHTML = '';
      const node = document.createElement('div');
      node.className = 'article';
      node.innerHTML = section.innerHTML;
      viewer.appendChild(node);

      // outils partager
      injectShareTools(node, articlePath);

      // active le lien de menu
      setActive(articlePath);
      // ouvre la catégorie correspondante
      openGroupFor(articlePath);

      // history + scroll top
      history.replaceState({}, '', withQuery(articlePath));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }catch(e){
      viewer.innerHTML = `<p class="erreur">Impossible de charger l’article.</p>`;
    }
  }

  function setActive(articlePath){
    menu.querySelectorAll('a[data-viewer], .menu-card[data-viewer]')
      .forEach(a => a.classList.toggle('active', normalize(a.dataset.viewer) === normalize(articlePath)));
  }

  function openGroupFor(articlePath){
    const link = menu.querySelector(`a[data-viewer="${CSS.escape(articlePath)}"]`);
    if (!link) return;
    const det = link.closest('details');
    if (det) det.setAttribute('open','');
  }

  const normalize = s => (s || '').replace(/^[.\/]*/,''); // ./intro.html -> intro.html

  // clics de menu
  menu.addEventListener('click', (e)=>{
    const a = e.target.closest('a[data-viewer], .menu-card[data-viewer]');
    if (!a) return;
    e.preventDefault();
    loadArticle(a.dataset.viewer);
  });

// deep-link ?a=./intro.html
const param = new URLSearchParams(location.search).get('a');
if (param) {
  loadArticle(param);
}
// sinon, on laisse le placeholder affiché


  /* ===== Accordéon exclusif pour les <details> du menu ===== */
  const groups = menu.querySelectorAll("details");
  groups.forEach(det => {
    det.addEventListener("toggle", () => {
      if (det.open) {
        groups.forEach(other => {
          if (other !== det) other.removeAttribute("open");
        });
      }
    });
  });
})();
