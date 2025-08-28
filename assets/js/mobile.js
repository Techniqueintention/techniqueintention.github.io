// Mobile JS global — helpers responsive non intrusifs.
// À charger UNE FOIS après tes scripts centraux (et sans toucher main.js).

(() => {
  /* 0) Actif seulement si ≤ 900px (évite tout impact desktop) */
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  // 1) Correctif 100vh iOS/Android
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);

  // 2) Burger mobile : clone .menu-primary → #mb-drawer .mb-list
  const initMobileMenu = () => {
    if (!isMobile()) return; // ne rien faire en desktop

    const burger = document.getElementById('mb-burger');
    const drawer = document.getElementById('mb-drawer');
    const scrim  = document.getElementById('mb-scrim');
    const list   = drawer?.querySelector('.mb-list');
    const desktopNav = document.querySelector('.menu-primary');

    if (!burger || !drawer || !scrim || !list || !desktopNav) return;

    // Clone unique (évite doublons si reinit)
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
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) openDrawer(false);
    }, { passive: true });

    // Surbrillance page/section active (exact ou même dossier)
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

    markActive(drawer);      // tiroir mobile
    markActive(desktopNav);  // optionnel : garde l’état sur la barre desktop aussi
  };

  // 3) Accordéon exclusif
  const initExclusiveDetails = () => {
    const details = Array.from(document.querySelectorAll('details[data-exclusive]'));
    details.forEach(d => {
      d.addEventListener('toggle', () => {
        if (d.open) details.forEach(o => (o !== d) && (o.open = false));
      }, { passive: true });
    });
  };

  // 4) Ancre avec header sticky
  const initAnchorCompensation = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const offset = () => header.getBoundingClientRect().height || 0;
    const scrollToId = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - offset() - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    });
  };

  // 5) Améliorations tactiles
  const initTouchTweaks = () => {
    document.body.style.webkitTapHighlightColor = 'transparent';
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.style.touchAction = 'manipulation';
    });
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();           // burger/drawer (mobile only)
    initExclusiveDetails();
    initAnchorCompensation();
    initTouchTweaks();
  });

  // Re-sync si l’utilisateur redimensionne (dev tools) :
  window.addEventListener('resize', () => {
    // Pas de re-clonage si déjà fait ; le CSS gère l’affichage.
  }, { passive: true });
})();
