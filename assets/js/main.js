// main.js — Technique Intention

// ORDRE CORRIGÉ : viewer-menu.js doit être chargé avant viewer.js
import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer-menu.js';   // Chargé en premier
import '/assets/js/viewer.js';        // Chargé après (contient l'accordéon)
// On charge mobile.js dynamiquement après l'injection du menu

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU, '/assets/partials/menu.html').then(() => {
    // Charge mobile.js après l'injection du menu
    import('/assets/js/mobile.js');
  });
  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
