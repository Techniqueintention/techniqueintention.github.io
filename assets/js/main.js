// ========================================================
// main.js (Technique Intention) — même mécanique que Codex
// ========================================================

import '/assets/js/theme.js';
import '/assets/js/nav-active.js';
import '/assets/js/viewer.js';
import '/assets/js/viewer-menu.js';
import '/assets/js/mobile.js';

// Injection partiels (comme Codex)
import { IDS } from '/assets/js/ids.js';
import { injectPartial } from '/assets/js/partials.js';

window.addEventListener('DOMContentLoaded', () => {
  injectPartial(IDS.MENU,   '/menu.html');
  injectPartial(IDS.FOOTER, '/footer.html');
});
