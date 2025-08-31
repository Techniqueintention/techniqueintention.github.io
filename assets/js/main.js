// main.js — Technique Intention

import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer-menu.js';
import '/assets/js/viewer.js';

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU, '/assets/partials/menu.html').then(async () => {

    // 👇 AJOUT : calcule la hauteur réelle du bandeau et la met dans --header-h
    const setHeaderH = () => {
      const h = (document.querySelector('.site-header')?.offsetHeight ?? 64);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    setHeaderH();
    // Recalcule si la fenêtre change (orientation, viewport, etc.)
    window.addEventListener('resize', setHeaderH);
    // Recalcule quand les polices finissent de charger (hauteur peut varier)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setHeaderH).catch(() => {});
    }

    // Charge mobile.js APRÈS l’injection du menu
    await import('/assets/js/mobile.js');
    // Initialise explicitement (utile si DOMContentLoaded est déjà passé)
    if (window.TI_initMobileMenu) window.TI_initMobileMenu();
  });

  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
