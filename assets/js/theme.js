const html = document.documentElement;
const saved = localStorage.getItem('ti_theme') || 'light';

function ensureStars(){ /* dessin canvas si dark */ }
function removeStars(){ const c=document.getElementById('ti-starfield'); if(c) c.remove(); }

function applyTheme(mode){
  html.setAttribute('data-theme', mode);
  localStorage.setItem('ti_theme', mode);
  const sw = document.getElementById('themeSwitch');
  if (sw) sw.checked = (mode === 'dark');
  if (mode === 'dark') ensureStars(); else removeStars();
}

applyTheme(saved);

document.addEventListener('change', (e)=>{
  if (e.target?.id === 'themeSwitch') {
    applyTheme(e.target.checked ? 'dark' : 'light');
  }
});
