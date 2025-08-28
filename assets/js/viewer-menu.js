(function(){
  const menu = document.getElementById('viewer-menu');
  if (!menu) return;

  const NEW_THRESHOLD_DAYS = 14; // nombre de jours pour afficher "NEW"

  // -------- Accordéon : un seul ouvert
  const groups = Array.from(menu.querySelectorAll('details'));
  groups.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open){
        groups.forEach(o => { if (o !== d) o.removeAttribute('open'); });
      }
    });
  });

  // -------- Catégorie cliquable si un seul lien
  groups.forEach(d => {
    const links = d.querySelectorAll('a[data-view]');
    if (links.length === 1){
      const summary = d.querySelector('summary');
      if (summary){
        summary.style.userSelect = 'none';
        summary.addEventListener('click', (e) => {
          // si déjà ouvert et 1 seul lien -> ouvrir l'article
          if (d.open) {
            e.preventDefault();
            links[0].dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true}));
          }
        });
      }
    }
  });

  // -------- Badges NEW et pastille de catégorie
  const now = new Date();
  const dayMs = 24*60*60*1000;

  function markNew(link){
    const dateStr = link.getAttribute('data-date');
    if (!dateStr) return false;
    const dt = new Date(dateStr + 'T00:00:00');
    const diff = Math.floor((now - dt)/dayMs);
    if (diff >= 0 && diff <= NEW_THRESHOLD_DAYS){
      // ajoute badge
      if (!link.querySelector('.badge-new')){
        const b = document.createElement('span');
        b.className = 'badge-new'; b.textContent = 'NEW';
        link.appendChild(b);
      }
      return true;
    }
    return false;
  }

  groups.forEach(d=>{
    let hasNew = false;
    d.querySelectorAll('a[data-view]').forEach(a => { if (markNew(a)) hasNew = true; });
    if (hasNew) d.setAttribute('data-has-new', '1');
  });

  // -------- Burger mobile
  const burger = document.getElementById('viewer-menu-burger');
  const closeBtn = document.getElementById('viewer-menu-close');
  function toggleMenu(open){
    menu.classList.toggle('open', open);
    burger && burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger && burger.addEventListener('click', ()=> toggleMenu(!menu.classList.contains('open')));
  closeBtn && closeBtn.addEventListener('click', ()=> toggleMenu(false));

  document.addEventListener('click', (e)=>{
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || (burger && burger.contains(e.target))) return;
    toggleMenu(false);
  });

  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 980 && menu.classList.contains('open')) toggleMenu(false);
  });
})();
