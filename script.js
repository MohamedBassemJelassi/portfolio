/* =============================================
   Scroll Reveal — Bulletproof Version
   Uses IntersectionObserver with rootMargin so elements
   reveal as soon as they enter the viewport (not on click).
============================================= */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {

  // Fallback: if IntersectionObserver isn't supported, show everything
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // 1. Mark elements to reveal
  // All section headers, grids, cards, and hero items
  const revealTargets = document.querySelectorAll(
    '.section-header, .about-grid, .about-card, .timeline-item, .project-filters, ' +
    '.project-card, .skill-block, .languages, .cert-card, .coursework, ' +
    '.contact-card, .hero-meta, .meta-item, .languages'
  );

  // Add .reveal class to each
  revealTargets.forEach(el => el.classList.add('reveal'));

  // Hero items reveal on load with stagger
  const heroItems = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-subtitle, .hero-tags, .hero-actions, .hero-meta'
  );
  heroItems.forEach(el => el.classList.add('reveal-hero'));

  // 2. Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Fire when 10% of the element is visible, but wait until
    // it's at least 60px inside the viewport to avoid edge-cases
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  // 3. Observe all reveal targets
  document.querySelectorAll('.reveal, .reveal-hero').forEach(el => {
    observer.observe(el);
  });

  // 4. Reveal hero items immediately on load (they're above the fold)
  setTimeout(() => {
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), i * 100);
    });
  }, 100);

  // 5. Language bars grow when visible
  const bars = document.querySelectorAll('.lang-fill');
  bars.forEach(bar => {
    const w = bar.style.width || '100%';
    bar.style.setProperty('--w', w);
    bar.style.width = '0';
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => barObserver.observe(bar));

});

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
        // Re-trigger reveal so they appear
        card.classList.add('is-visible');
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
