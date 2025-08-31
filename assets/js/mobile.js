// Mobile JS — burger/clonage menu + helpers (ré-init possible)
(() => {
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);

  function initOnce() {
    if (!isMobile()) return;

    const header = document.querySelector('.site-header');
    const burger = document.getElementById('mb-burger');
    const drawer = document.getElementById('mb-drawer');
    const scrim  = document.getElementById('mb-scrim');
    const list   = drawer?.querySelector('.mb-list');
    const desktopNav = document.querySelector('.menu-primary');

    // déjà câblé ?
    if (!header || header.dataset.mbInit === '1') return;

    if (!burger || !drawer || !scrim || !list || !desktopNav) {
      // Si le fragment n'est pas encore injecté, on retentera plus tard
      return;
    }

    // Marqueur idempotent
    header.dataset.mbInit = '1';

    // Clone les liens .menu-primary → tiroir mobile (une seule fois)
    if (!list.hasChildNodes()) {
      desktopNav.querySelectorAll('a[href]').forEach(a => {
        const li = document.createElement('li');
        const clone = a.cloneNode(true);
        clone.removeAttribute('style');
        li.appendChild(clone);
        list.appendChild(li);
      });
    }

    const html = document.documentElement;
    const isOpen = () => drawer.classList.contains('is-open');
    const openDrawer = (open) => {
      drawer.classList.toggle('is-open', open);
      scrim.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.hidden = !open;
      scrim.hidden = !open;
      html.classList.toggle('mb-no-scroll', open);
    };

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer(!isOpen());
    });
    scrim.addEventListener('click', () => openDrawer(false));
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) openDrawer(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) openDrawer(false);
    });

    // Marquage actif (page exacte OU même dossier)
    const here = new URL(location.href);
    const herePath = here.pathname.replace(/\/index\.html$/, '/');
    const getPath  = (href) => new URL(href, here.origin).pathname.replace(/\/index\.html$/, '/');
    const parentDir = (p) => p.endsWith('/') ? p : p.replace(/[^/]+$/, '');
    const markActive = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
        a.removeAttribute('aria-current');
        const t = getPath(a.getAttribute('href'));
        const exact = (t === herePath);
        const sameSection = parentDir(herePath).startsWith(parentDir(t)) && parentDir(t) !== '/';
        if (exact || sameSection) a.setAttribute('aria-current', 'page');
      });
    };
    markActive(drawer);
    markActive(desktopNav);

    // Tweaks tactiles
    document.body.style.webkitTapHighlightColor = 'transparent';
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.style.touchAction = 'manipulation';
    });
  }

  // 1) on tente à DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initOnce);
  // 2) on expose une API pour ré-init après injection
  window.TI_initMobileMenu = initOnce;

  // 3) si un event custom est émis après inject, on ré-init
  document.addEventListener('ti:partial-injected', (e) => {
    if (e.detail?.targetId === 'menu-placeholder') initOnce();
  });
})();
