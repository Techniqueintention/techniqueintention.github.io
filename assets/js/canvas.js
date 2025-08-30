// ========================================================
// canvas.js – Effets visuels pour thèmes stellaire et galactique
// ========================================================

let canvas, ctx, rafId;
let particles = [];

/**
 * Initialise le canvas de fond (responsive)
 */
export function setupCanvas() {
  canvas = document.getElementById("theme-canvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  canvas.style.opacity = '0';

  resizeCanvas(); // Initial sizing
  window.addEventListener('resize', resizeCanvas);
  
  // Gestion de la visibilité pour économiser la batterie
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Ajuste la taille du canvas à la fenêtre
 */
function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Réinitialiser les particules si le canvas était déjà initialisé
  if (particles.length > 0) {
    const currentType = particles[0]?.type || 'stars';
    initParticles(currentType, getParticleCount(currentType));
  }
}

/**
 * Calcule le nombre de particules en fonction de la taille de l'écran
 * @param {string} type - Type de particule
 * @returns {number} - Nombre de particules adapté
 */
function getParticleCount(type) {
  const area = window.innerWidth * window.innerHeight;
  return type === 'stars' 
    ? Math.min(400, Math.floor(area / 1500)) // 1 étoile par 1500px²
    : Math.min(200, Math.floor(area / 3000)); // 1 poussière par 3000px²
}

/**
 * Génère les particules (type : "stars" ou "dust")
 * @param {string} type - Type de particule (stars | dust)
 * @param {number} count - Nombre de particules (optionnel)
 */
export function initParticles(type = 'stars', count = null) {
  if (!canvas) return;
  
  const particleCount = count || getParticleCount(type);
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    const r = (type === 'dust') ? Math.random() * 3 + 1.2 : Math.random() * 1.5 + 0.3;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r,
      alpha: Math.random(),
      delta: (Math.random() * 0.02) * (Math.random() < 0.5 ? 1 : -1),
      type
    });
  }

  // Ajouter occasionnellement une étoile filante
  if (type === 'stars' && Math.random() < 0.3) {
    particles.push({
      x: -20,
      y: Math.random() * canvas.height / 2,
      r: 2,
      speed: 10 + Math.random() * 10,
      angle: Math.random() * 0.4 + 0.1,
      alpha: 1,
      type: 'shooting'
    });
  }

  canvas.style.opacity = '1';
  if (rafId) cancelAnimationFrame(rafId);
  animateParticles();
}

/**
 * Boucle d'animation des particules
 */
function animateParticles() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Utilisation d'une boucle for classique pour de meilleures performances
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    
    if (p.type === 'shooting') {
      // Animation des étoiles filantes
      p.x += p.speed * Math.cos(p.angle);
      p.y += p.speed * Math.sin(p.angle);
      
      if (p.x > canvas.width + 20 || p.y > canvas.height + 20) {
        // Supprimer les étoiles filantes sortantes
        particles.splice(i, 1);
        i--;
        continue;
      }
      
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 15 * Math.cos(p.angle), p.y - 15 * Math.sin(p.angle));
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(180, 220, 255, 0.8)';
      ctx.stroke();
    } else {
      // Animation des étoiles et poussières normales
      p.alpha += p.delta;
      if (p.alpha <= 0 || p.alpha >= 1) p.delta *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);

      if (p.type === 'dust') {
        const hue = 240 + Math.random() * 40;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(180, 130, 255, ${p.alpha})`;
        ctx.fillStyle = `hsla(${hue}, 100%, 85%, ${p.alpha})`;
      } else {
        ctx.shadowBlur = p.r * 2;
        ctx.shadowColor = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      }

      ctx.fill();
    }
  }

  // Ajouter occasionnellement une nouvelle étoile filante
  if (Math.random() < 0.005 && particles[0]?.type === 'stars') {
    particles.push({
      x: -20,
      y: Math.random() * canvas.height / 2,
      r: 2,
      speed: 10 + Math.random() * 10,
      angle: Math.random() * 0.4 + 0.1,
      alpha: 1,
      type: 'shooting'
    });
  }

  rafId = requestAnimationFrame(animateParticles);
}

/**
 * Gestionnaire de changement de visibilité
 */
function handleVisibilityChange() {
  if (document.hidden) {
    stopParticles();
  } else {
    const theme = document.body.getAttribute('data-theme');
    if (theme === 'dark') {
      initParticles('stars');
    }
  }
}

/**
 * Arrête l'animation et efface les particules
 */
export function stopParticles() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
  }

  particles = [];

  if (canvas) canvas.style.opacity = '0';
}

/**
 * Change le type de particules
 * @param {string} type - Type de particule (stars | dust)
 */
export function changeParticleType(type) {
  if (type !== 'stars' && type !== 'dust') {
    console.warn('Type de particule non supporté. Utilisation de "stars" par défaut.');
    type = 'stars';
  }
  
  initParticles(type);
}
