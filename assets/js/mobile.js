// Mobile JS — burger/clonage menu + helpers (mobile only)
(() => {
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  // 100vh fix mobiles
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh(); addEventListener('resize', setVh);

  document.addEventListener('DOMContentLoaded', () => {
    if (!isMobile()) return; // rien à faire en desktop

    const burger = document.getElementById('mb-burger');
    const drawer = document.getElementById('mb-drawer');
    const scrim  = document.getElementById('mb-scrim');
    const list   = drawer?.querySelector('.mb-list');
    const desktopNav = document.querySelector('.menu-primary');
    if (!burger || !drawer || !scrim || !list || !desktopNav) return;

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
      drawer.hidden = false; scrim.hidden = false;
      html.classList.toggle('mb-no-scroll', open);
      document.body.classList.toggle('mb-no-scroll', open);
    };

    burger.addEventListener('click', () => openDrawer(!isOpen()), { passive: true });
    scrim.addEventListener('click', () => openDrawer(false), { passive: true });
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) openDrawer(false); }, { passive: true });

    // Marquage actif (page exacte OU même dossier)
    const here = new URL(location.href);
    const herePath = here.pathname.replace(/\/index\.html$/, '/');
    const getPath  = (href) => new URL(href, here.origin).pathname.replace(/\/index\.html$/, '/');
    const parentDir = (p) => p.endsWith('/') ? p : p.replace(/[^/]+$/, '');
    const markActive = (root) => {
      root.querySelectorAll('a[href]').forEach(a => {
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
    document.querySelectorAll('a,button,[role="button"]').forEach(el => el.style.touchAction = 'manipulation');
  });
})();
