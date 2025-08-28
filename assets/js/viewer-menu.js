(function(){
  const menu = document.getElementById('viewer-menu');
  if (!menu) return;

  // Un seul <details> ouvert à la fois
  const groups = Array.from(menu.querySelectorAll('details'));
  groups.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open){
        groups.forEach(other => { if (other !== d) other.removeAttribute('open'); });
      }
    });
  });

  // Burger mobile
  const burger = document.getElementById('viewer-menu-burger');
  const closeBtn = document.getElementById('viewer-menu-close');
  function toggleMenu(open){
    menu.classList.toggle('open', open);
    burger && burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger && burger.addEventListener('click', ()=> toggleMenu(!menu.classList.contains('open')));
  closeBtn && closeBtn.addEventListener('click', ()=> toggleMenu(false));

  // Fermer le menu si on clique en dehors (mobile)
  document.addEventListener('click', (e)=>{
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || (burger && burger.contains(e.target))) return;
    toggleMenu(false);
  });

  // Fermer au resize si on repasse en desktop
  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 900 && menu.classList.contains('open')) toggleMenu(false);
  });
})();
