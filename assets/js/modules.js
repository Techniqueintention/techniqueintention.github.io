// assets/js/modules.js
import '/assets/js/intro-gate.js';     // redirection de l’index si 1ʳᵉ visite déjà faite (ne fait rien sur home/bases)
import '/assets/js/inject-menu.js';    // injecte partials/menu.html + gère clics (selon ta version liens/pages)
import '/assets/js/inject-footer.js';  // injecte partials/footer.html (si présent)
import '/assets/js/theme.js';          // switch soleil/lune + starfield en dark
import '/assets/js/viewer-page.js';    // viewer générique (s’active seulement s’il trouve #article-viewer)
