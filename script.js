/* =============================================
   Project Filter
============================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* =============================================
   Mobile Nav Toggle
============================================= */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  if (isOpen) {
    navLinks.style.display = '';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.right = '0';
    navLinks.style.left = '0';
    navLinks.style.marginTop = '12px';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '20px';
    navLinks.style.background = 'rgba(15, 17, 48, 0.95)';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.borderRadius = '16px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.08)';
  }
});

/* =============================================
   Navbar shrink on scroll
============================================= */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 40) {
    nav.style.padding = '8px 20px';
    nav.style.background = 'rgba(15, 17, 48, 0.85)';
  } else {
    nav.style.padding = '12px 24px';
    nav.style.background = 'rgba(15, 17, 48, 0.6)';
  }
});

/* =============================================
   ✨ SCROLL REVEAL ANIMATIONS (restored)
   Each element fades in + slides up when scrolled into view.
   Staggered delays create a cascading effect.
   Safe fallback: if JS is disabled, elements are visible.
============================================= */

// 1. Mark body as JS-enabled so the animation CSS only applies when JS runs
document.body.classList.add('js-enabled');

// 2. Elements to animate on scroll
const revealTargets = document.querySelectorAll(
  '.section-header, .about-grid, .timeline-item, .project-card, .skill-block, .languages, .cert-card, .coursework, .contact-card, .hero-meta, .meta-item'
);

// 3. Set initial hidden state + staggered delay
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger by 60ms per element, capped at 400ms
  el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
});

// 4. IntersectionObserver — fires when element scrolls into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Stop observing once revealed (no re-hide on scroll up)
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

// 5. Observe each target
revealTargets.forEach(el => revealObserver.observe(el));

/* =============================================
   ✨ ANIMATE BARS (skill + language) ON VIEW
   Bars grow from 0 to their target width.
============================================= */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const finalWidth = el.dataset.targetWidth || el.style.width || '100%';
      el.dataset.targetWidth = finalWidth;
      el.style.width = '0';
      // Small delay so the reveal animation plays first
      setTimeout(() => {
        el.style.width = finalWidth;
      }, 200);
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-fill').forEach(el => {
  barObserver.observe(el);
});

/* =============================================
   ✨ HERO ENTRY ANIMATION (plays once on load)
============================================= */
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) hero.classList.add('hero-loaded');
});
