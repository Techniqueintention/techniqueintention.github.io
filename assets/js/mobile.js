// mobile.js — init robuste après injection (garde tes IDs/classes)
(() => {
  const isMobile = () => matchMedia('(max-width: 900px)').matches;

  // Fix 100vh mobiles
  const setVh = () => {
    const vh = innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh(); addEventListener('resize', setVh);

  function bindOnce() {
    if (!isMobile()) return false;

    const header     = document.querySelector('.site-header');
    const burger     = document.getElementById('mb-burger');
    const drawer     = document.getElementById('mb-drawer');
    const scrim      = document.getElementById('mb-scrim');
    const desktopNav = document.querySelector('.menu-primary');
    const list       = drawer?.querySelector('.mb-list');

    if (!header || !burger || !drawer || !scrim || !desktopNav || !list) return false;
    if (header.dataset.mbInit === '1') return true; // déjà câblé

    header.dataset.mbInit = '1';

    // Clone les liens du menu desktop vers la liste mobile (une seule fois)
    if (!list.hasChildNodes()) {
      desktopNav.querySelectorAll('a[href]').forEach(a => {
        const li = document.createElement('li');
        li.appendChild(a.cloneNode(true));
        list.appendChild(li);
      });
    }

    const html   = document.documentElement;
    const isOpen = () => drawer.classList.contains('is-open');
    const open   = (v) => {
      drawer.classList.toggle('is-open', v);
      scrim.classList.toggle('is-open', v);
      burger.setAttribute('aria-expanded', String(v));
      drawer.hidden = !v; scrim.hidden = !v;
      html.classList.toggle('mb-no-scroll', v);
    };

    burger.addEventListener('click', (e) => { e.stopPropagation(); open(!isOpen()); });
    scrim.addEventListener('click', () => open(false));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) open(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) open(false); });

    // Marquage actif (exact + même section)
    const here = new URL(location.href);
    const herePath = here.pathname.replace(/\/index\.html$/, '/');
    const getPath  = (href) => new URL(href, here.origin).pathname.replace(/\/index\.html$/, '/');
    const parent   = (p) => p.endsWith('/') ? p : p.replace(/[^/]+$/, '');
    const markActive = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
        a.removeAttribute('aria-current');
        const t = getPath(a.getAttribute('href'));
        const exact = (t === herePath);
        const sameSection = parent(herePath).startsWith(parent(t)) && parent(t) !== '/';
        if (exact || sameSection) a.setAttribute('aria-current', 'page');
      });
    };
    markActive(document);

    // Tweaks tactiles
    document.body.style.webkitTapHighlightColor = 'transparent';
    document.querySelectorAll('a,button,[role="button"]').forEach(el => { el.style.touchAction = 'manipulation'; });

    return true;
  }

  function init() {
    // Si tout est déjà là, on câble maintenant
    if (bindOnce()) return;
    // Sinon on observe l'arrivée des fragments injectés puis on câble dès que possible
    const obs = new MutationObserver(() => {
      if (bindOnce()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  // API publique si tu veux relancer manuellement
  window.TI_initMobileMenu = init;

  // Lance tout de suite (même si DOMContentLoaded est déjà passé)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
