// ============================
// NAVIGATION SCROLL BEHAVIOR
// ============================
const nav = document.getElementById('nav');
const navHamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

navHamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile nav on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ============================
// REVEAL ON SCROLL
// ============================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================
// PROJECT ACCORDION
// ============================
function toggleProject(id) {
  const expandEl = document.getElementById('expand-' + id);
  const cardEl = expandEl.closest('.project-card');
  const isOpen = expandEl.classList.contains('open');

  // Close all
  document.querySelectorAll('.project-expand.open').forEach(el => {
    el.classList.remove('open');
    el.closest('.project-card').classList.remove('is-open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    expandEl.classList.add('open');
    cardEl.classList.add('is-open');

    // Smooth scroll to card after slight delay
    setTimeout(() => {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// ============================
// SMOOTH ACTIVE NAV LINK
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(s => sectionObserver.observe(s));

// ============================
// MICRO-INTERACTION: CURSOR GLOW
// ============================
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(232,255,77,0.04) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  top: 0; left: 0;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
}, { passive: true });

// ============================
// STAGGER HERO REVEALS
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 120);
  });
});
