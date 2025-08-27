// mini "routeur" pour colonnes et chargement d'articles
window.renderSideMenu = async function(section){
  const side = document.getElementById('sideMenu');
  const view = document.getElementById('viewer');
  if (!side || !view) return;

  // catalogue simple — tu peux le remplacer par un JSON plus tard
  const MAP = {
    bases: {
      directs: [
        {label:'Introduction', file:'content/bases/introduction.html'}
      ],
      categories: [
        {label:'Sanctuaire intérieur', items:[
          {label:'Création', file:'content/bases/creation-sanctuaire.html'},
          {label:'Utilisation', file:'content/bases/utilisation-sanctuaire.html'}
        ]}
      ]
    },
    pratiques: {
      directs: [],
      categories: [
        {label:'Techniques', items:[
          {label:'Respiration', file:'content/pratiques/respiration.html'},
          {label:'Visualisations', file:'content/pratiques/visualisations.html'}
        ]}
      ]
    }
  };

  const data = MAP[section];
  if (!data){ side.innerHTML = '<p>Section en cours de rédaction.</p>'; return; }

  // construit l’accordéon
  const wrap = document.createElement('div'); wrap.className='acco';
  // liens directs
  for (const d of (data.directs||[])){
    const b = document.createElement('div'); b.className='block';
    const s = document.createElement('details'); s.open=false;
    s.innerHTML = `<summary>${d.label}</summary>
                   <div class="content"><a href="#" class="menu-link" data-file="${d.file}">Ouvrir</a></div>`;
    b.appendChild(s); wrap.appendChild(b);
  }
  // catégories
  for (const cat of (data.categories||[])){
    const b = document.createElement('div'); b.className='block';
    const s = document.createElement('details');
    s.innerHTML = `<summary>${cat.label}</summary><div class="content"></div>`;
    const c = s.querySelector('.content');
    for (const it of cat.items){
      const a=document.createElement('a');
      a.className='menu-link'; a.href='#'; a.textContent=it.label; a.dataset.file=it.file;
      c.appendChild(a);
    }
    b.appendChild(s); wrap.appendChild(b);
  }

  side.replaceChildren(wrap);

  // accordéon exclusif
  side.addEventListener('toggle', (e)=>{
    if (e.target.tagName!=='DETAILS' || !e.target.open) return;
    side.querySelectorAll('details[open]').forEach(d=>{ if(d!==e.target) d.open=false; });
  }, true);

  // clics -> charge article
  side.addEventListener('click', async (e)=>{
    const a = e.target.closest('a.menu-link'); if(!a) return;
    e.preventDefault();
    await loadArticle(a.dataset.file, view);
    history.replaceState({}, '', '#'+encodeURIComponent(a.dataset.file));
  });

  // si hash → chargé direct
  if (location.hash){
    const file = decodeURIComponent(location.hash.slice(1));
    await loadArticle(file, view);
  }
};

async function loadArticle(file, container){
  try{
    const html = await (await fetch(file, {cache:'no-store'})).text();
    container.innerHTML = `<article class="doc">${html}</article>`;
  }catch(e){
    container.innerHTML = `<p>Contenu indisponible.</p>`;
  }
}

// init par défaut : affiche la 1ʳᵉ section
document.addEventListener('DOMContentLoaded', ()=> {
  // bascule initiale vers "bases" pour montrer la structure
  window.renderSideMenu('bases');
});
