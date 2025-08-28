/* ===== Menu : badges NEW + catégorie cliquable si un seul lien ===== */
(function(){
  const menu = document.getElementById('viewer-menu');
  if (!menu) return;

  const NEW_THRESHOLD_DAYS = 14;
  const now = new Date();
  const dayMs = 86400000;

  // NEW badge + pastille sur la catégorie
  function markNew(link){
    const d = link.getAttribute('data-date');
    if (!d) return false;
    const dt = new Date(d + 'T00:00:00');
    const diff = Math.floor((now - dt) / dayMs);
    if (diff >= 0 && diff <= NEW_THRESHOLD_DAYS){
      if (!link.querySelector('.badge-new')){
        const b = document.createElement('span');
        b.className = 'badge-new';
        b.textContent = 'NEW';
        link.appendChild(b);
      }
      return true;
    }
    return false;
  }
  menu.querySelectorAll('details').forEach(det=>{
    let hasNew = false;
    det.querySelectorAll('a[data-viewer]').forEach(a => { if (markNew(a)) hasNew = true; });
    if (hasNew) det.setAttribute('data-has-new', '1');
  });
  // et aussi sur les tuiles hors catégories
  menu.querySelectorAll('.menu-card[data-viewer]').forEach(a => markNew(a));

  // Si une catégorie ne contient qu’un seul lien :
  menu.querySelectorAll('details').forEach(det=>{
    const links = det.querySelectorAll('a[data-viewer]');
    if (links.length === 1){
      const summary = det.querySelector('summary');
      if (summary){
        summary.style.userSelect = 'none';
        summary.addEventListener('click', (e)=>{
          if (det.open){
            e.preventDefault();
            links[0].click();
          }
        });
      }
    }
  });
})();
