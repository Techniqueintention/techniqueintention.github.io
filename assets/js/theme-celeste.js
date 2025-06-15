
const canvas = document.getElementById("etoiles-canvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateStars();
}

function generateStars() {
  stars = [];
  const density = window.innerWidth < 600 ? 40 : 120;
  for (let i = 0; i < density; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.alpha += star.speed;
    if (star.alpha >= 1 || star.alpha <= 0.1) star.speed *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255," + star.alpha + ")";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 6;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();
