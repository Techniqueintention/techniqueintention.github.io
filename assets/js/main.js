// main.js — Technique Intention

// ORDRE CORRIGÉ : viewer-menu.js doit être chargé avant viewer.js
import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer-menu.js';   // Chargé en premier
import '/assets/js/viewer.js';        // Chargé après (contient l'accordéon)
import '/assets/js/mobile.js';

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU, '/assets/partials/menu.html');
  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
