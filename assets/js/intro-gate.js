/* assets/js/intro-gate.js – redirige intro vers home si déjà vu */

(() => {
  try {
    if (localStorage.getItem('ti_seen_intro') === '1') {
      location.replace('home.html');
    }
  } catch(e) {}
})();
