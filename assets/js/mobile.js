// Mobile JS global — à charger une fois, après tes scripts centraux.
// Objectif : helpers responsive non intrusifs (pas d’initialisations doublons).

(() => {
  // 1) Correctif 100vh iOS/Android
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);

  // 2) Burger auto si le menu déborde (fonctionne si .menu-primary existe)
  const nav = document.querySelector('.menu-primary');
  if (nav) {
    let burger = document.getElementById('nav-burger');
    if (!burger) {
      const wrap = nav.closest('.nav-wrap') || nav.parentElement;
      burger = document.createElement('button');
      burger.id = 'nav-burger';
      burger.setAttribute('aria-label', 'Menu');
      burger.innerHTML = '☰';
      wrap && wrap.insertBefore(burger, nav);
    }

    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => {
      if (mq.matches) {
        burger.hidden = false;
        nav.classList.remove('is-open');
      } else {
        burger.hidden = true;
        nav.classList.remove('is-open');
      }
    };
    sync();
    mq.addEventListener('change', sync);

    burger.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    }, { passive: true });
  }

  // 3) Accordéon exclusif : ouvre un <details> et ferme le précédent (si souhaité)
  const details = Array.from(document.querySelectorAll('details[data-exclusive]'));
  details.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) details.forEach(o => (o !== d) && (o.open = false));
    }, { passive: true });
  });

  // 4) Liens ancre : compensation sticky header (si header sticky)
  const header = document.querySelector('.site-header');
  if (header) {
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
  }

  // 5) Améliorations tactiles
  document.body.style.webkitTapHighlightColor = 'transparent';
  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.style.touchAction = 'manipulation';
  });
})();
