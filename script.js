/* ============================================================
   Flask — interactions
   ============================================================ */

// ---- Scroll reveal (Apple-style fade + rise) ----
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---- Nav background solidifies on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(245,245,247,0.9)';
  } else {
    nav.style.background = 'rgba(245,245,247,0.72)';
  }
});

// ---- Subtle parallax / tilt on the bottle ----
const bottle = document.getElementById('bottle');
const stage = document.querySelector('.hero-stage');
if (bottle && stage && window.matchMedia('(hover:hover)').matches) {
  stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    bottle.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 8}deg)`;
  });
  stage.addEventListener('mouseleave', () => {
    bottle.style.transform = 'rotateY(0) rotateX(0)';
  });
}

// ---- Color swatch switching ----
const swatches = document.querySelectorAll('.swatch');
const bodyEl = document.querySelector('.bottle-body');
const capEl = document.querySelector('.bottle-cap');
const strapEl = document.querySelector('.bottle-strap');
const collarEl = document.querySelector('.bottle-collar');
const nameEl = document.getElementById('swatchName');

function shade(hex, amt) {
  // lighten/darken a hex color by amt (-1..1)
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, r + amt * 255));
  g = Math.max(0, Math.min(255, g + amt * 255));
  b = Math.max(0, Math.min(255, b + amt * 255));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

swatches.forEach((sw) => {
  sw.addEventListener('click', () => {
    swatches.forEach((s) => s.classList.remove('active'));
    sw.classList.add('active');

    const color = sw.dataset.color;
    const cap = sw.dataset.cap;

    bodyEl.style.background = `linear-gradient(90deg, ${shade(color,-0.18)} 0%, ${color} 20%, ${shade(color,0.12)} 48%, ${color} 76%, ${shade(color,-0.18)} 100%)`;
    capEl.style.background = `linear-gradient(90deg, ${shade(cap,-0.15)} 0%, ${cap} 22%, ${shade(cap,0.12)} 50%, ${cap} 78%, ${shade(cap,-0.15)} 100%)`;
    strapEl.style.borderColor = cap;
    strapEl.style.borderBottom = 'none';

    if (nameEl) nameEl.textContent = sw.getAttribute('aria-label');
  });
});
