/* assets/js/theme.js */

(function(){
  const link = document.getElementById('theme-link');
  const body = document.body;
  const saved = localStorage.getItem('ti_theme') || 'light';

  // charge la bonne feuille
  function applyTheme(mode){
    body.setAttribute('data-theme', mode);
    link.setAttribute('href', mode === 'dark'
      ? 'assets/css/theme-dark.css'
      : 'assets/css/theme-light.css');
    localStorage.setItem('ti_theme', mode);
    const sw = document.getElementById('themeSwitch');
    if (sw) sw.checked = (mode === 'dark');
  }

  // init
  applyTheme(saved);

  // écouteur switch
  document.addEventListener('change', (e)=>{
    if (e.target && e.target.id === 'themeSwitch') {
      applyTheme(e.target.checked ? 'dark' : 'light');
    }
  });
})();
