// main.js — Technique Intention

import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer.js';
import '/assets/js/viewer-menu.js';
import '/assets/js/mobile.js';

import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  // ⚠️ Chemins CORRECTS pour TI :
  injectPartial(IDS.MENU,   '/assets/partials/menu.html');
  injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
});
