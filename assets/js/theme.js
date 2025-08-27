// theme.js — MINIMAL
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('ti_theme') || 'light';

  function applyTheme(mode){
    html.setAttribute('data-theme', mode);
    try { localStorage.setItem('ti_theme', mode); } catch(_) {}
    const sw = document.getElementById('themeSwitch');
    if (sw) sw.checked = (mode === 'dark');
  }

  applyTheme(saved);

  document.addEventListener('change', (e)=>{
    if (e.target?.id === 'themeSwitch') {
      applyTheme(e.target.checked ? 'dark' : 'light');
    }
  });
})();
