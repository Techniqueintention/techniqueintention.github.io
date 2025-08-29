// main.js — Ordre corrigé
import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer-menu.js';   // Doit être chargé avant viewer.js
import '/assets/js/viewer.js';
import '/assets/js/mobile.js';

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU, '/assets/partials/menu.html');
  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
