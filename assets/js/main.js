// main.js — Technique Intention (module ES)

// IMPORTANT : ce fichier doit être chargé avec <script type="module" src="/js/main.js"></script>

import '/assets/js/theme.js';
import '/assets/js/nav-active.js';

// ORDRE CORRIGÉ : viewer-menu.js avant viewer.js
import '/assets/js/viewer-menu.js';
import '/assets/js/viewer.js';

import { injectPartial } from '/js/partials.js';
import { IDS } from '/js/ids.js'; // ex. IDS.MENU = 'menu-placeholder', IDS.FOOTER = 'footer-placeholder'

// 1) Injecte le menu (header)
await injectPartial(IDS.MENU, '/assets/partials/menu.html');

// 2) Charge le script mobile APRÈS l’injection, puis initialise le burger
//    (mobile.js attache window.TI_initMobileMenu)
try {
  await import('/assets/js/mobile.js');              // adapte le chemin si besoin
  if (window.TI_initMobileMenu) window.TI_initMobileMenu();
} catch (err) {
  console.warn('[main] mobile.js non chargé :', err);
}

// 3) Injecte le footer
await injectPartial(IDS.FOOTER, '/assets/partials/footer.html');
