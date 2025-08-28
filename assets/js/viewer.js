(function(){
  const viewer = document.getElementById('article-viewer');
  if (!viewer) return;

  // insère outils de partage dans l’article courant
  function injectShareTools(container, articleId){
    const tools = document.createElement('div');
    tools.id = 'article-tools';
    tools.innerHTML = `
      <button class="btn-share-article" id="btn-share">
        <span class="icon">🔗</span> Partager
      </button>
    `;
    container.prepend(tools);

    const btn = tools.querySelector('#btn-share');
    btn.addEventListener('click', async () => {
      const url = new URL(window.location.href);
      url.searchParams.set('a', articleId);
      const shareUrl = url.toString();

      if (navigator.share){
        try {
          await navigator.share({ title: document.title, url: shareUrl });
        } catch(_) {}
      } else {
        await navigator.clipboard.writeText(shareUrl);
        btn.textContent = 'Lien copié !';
        setTimeout(() => btn.innerHTML = '<span class="icon">🔗</span> Partager', 1200);
      }
    });
  }

  function setActiveLink(articleId){
    document.querySelectorAll('#viewer-menu a').forEach(a=>{
      a.classList.toggle('active', a.dataset.view === articleId);
    });
  }

  function loadArticle(articleId){
    const tpl = document.getElementById('tpl-' + articleId);
    if (!tpl){ 
      viewer.innerHTML = `<p class="erreur">Contenu introuvable.</p>`;
      return;
    }
    viewer.innerHTML = '';
    const node = tpl.content.cloneNode(true);
    viewer.appendChild(node);
    injectShareTools(viewer.querySelector('.article') || viewer, articleId);
    setActiveLink(articleId);
    window.history.replaceState({}, '', updateQuery(articleId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // referme le menu en mobile
    const menu = document.getElementById('viewer-menu');
    if (menu && menu.classList.contains('open')) menu.classList.remove('open');
  }

  function updateQuery(a){
    const url = new URL(location.href);
    url.searchParams.set('a', a);
    return url.toString();
  }

  // click sur les liens de menu
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('#viewer-menu a[data-view]');
    if (!a) return;
    e.preventDefault();
    loadArticle(a.dataset.view);
  });

  // deep-link ?a=intro
  const param = new URLSearchParams(location.search).get('a');
  loadArticle(param || 'intro');
})();
