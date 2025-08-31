// main.js — Technique Intention

import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer-menu.js';
import '/assets/js/viewer.js';

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU, '/assets/partials/menu.html').then(async () => {
    // Charge mobile.js APRÈS l’injection du menu
    await import('/assets/js/mobile.js');
    // Et initialise explicitement (utile si DOMContentLoaded est passé)
    if (window.TI_initMobileMenu) window.TI_initMobileMenu();
  });

  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
