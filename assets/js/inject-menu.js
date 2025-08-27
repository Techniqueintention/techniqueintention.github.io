// assets/js/inject-menu.js

(async function(){
  const nav = document.getElementById('top-menu');
  if (!nav) return;
  const url = nav.dataset.partial;
  try{
    const html = await (await fetch(url, {cache:'no-store'})).text();
    nav.innerHTML = html;
    // gestion des clics vers colonnes/visualiseur
    nav.addEventListener('click', (e)=>{
      const a = e.target.closest('a[data-section]');
      if (!a) return;
      e.preventDefault();
      const section = a.dataset.section; // ex: "bases", "pratiques"
      window.renderSideMenu(section);
    });
  }catch(e){ nav.textContent = 'Menu indisponible.'; }
})();
