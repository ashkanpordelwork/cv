// ============================
// NAVIGATION SCROLL BEHAVIOR
// ============================
const nav = document.getElementById('nav');
const navHamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navHamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ============================
// REVEAL ON SCROLL
// ============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================
// PROJECT ACCORDION
// ============================
function toggleProject(id) {
  const expandEl = document.getElementById('expand-' + id);
  const cardEl = expandEl.closest('.project-card');
  const isOpen = expandEl.classList.contains('open');
  document.querySelectorAll('.project-expand.open').forEach(el => {
    el.classList.remove('open');
    el.closest('.project-card').classList.remove('is-open');
  });
  if (!isOpen) {
    expandEl.classList.add('open');
    cardEl.classList.add('is-open');
    setTimeout(() => cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }
}

// ============================
// ACTIVE NAV LINK
// ============================
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) link.style.color = 'var(--text)';
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// ============================
// SUBTLE CURSOR GLOW (desktop only)
// ============================
if (!window.matchMedia('(hover: none)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `position:fixed;width:320px;height:320px;pointer-events:none;background:radial-gradient(circle,rgba(92,51,246,0.06) 0%,transparent 70%);border-radius:50%;z-index:0;transform:translate(-50%,-50%);top:0;left:0;`;
  document.body.appendChild(glow);
  let mx = 0, my = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function animateGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animateGlow);
  })();
}

// ============================
// SUBTLE PARALLAX PER SECTION
// ============================
const parallaxTargets = document.querySelectorAll('.section .container, .hero-content');

function updateParallax() {
  const vh = window.innerHeight;
  parallaxTargets.forEach(el => {
    const section = el.closest('section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > vh + 80) return;
    const progress = (rect.top + rect.height / 2 - vh / 2) / (vh * 0.9);
    el.style.transform = `translateY(${progress * 16}px)`;
  });
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

// ============================
// STAGGERED ENTRY DELAYS
// ============================
document.querySelectorAll('.timeline-item.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.045) + 's';
});
document.querySelectorAll('.skill-group.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.065) + 's';
});
document.querySelectorAll('.project-card.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.05) + 's';
});

// ============================
// HERO STAGGER ON LOAD
// ============================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 180 + i * 110);
  });
});
