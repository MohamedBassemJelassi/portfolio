/* =============================================
   Scroll Reveal Animation
   Every element marked with .reveal fades in + slides up
   when it enters the viewport.
============================================= */
(function () {
  // Safety: if IntersectionObserver isn't supported, show everything immediately
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  // Elements to animate on scroll
  var targets = document.querySelectorAll(
    '.section-header, .about-grid, .about-card, .timeline-item, ' +
    '.project-filters, .project-card, .skill-block, .languages, ' +
    '.cert-card, .coursework, .contact-card, .hero-meta'
  );

  // Add the .reveal class to each
  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  // Create the observer
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe every target
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Language bars: grow from 0 to their target width on view
  var bars = document.querySelectorAll('.lang-fill');
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var w = bar.getAttribute('data-width') || '100%';
        bar.style.width = w;
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(function (bar) {
    barObserver.observe(bar);
  });
})();

/* =============================================
   Project Filter
============================================= */
document.addEventListener('DOMContentLoaded', function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        var cats = card.dataset.category || '';
        if (filter === 'all' || cats.indexOf(filter) !== -1) {
          card.style.display = 'flex';
          card.classList.add('is-visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

/* =============================================
   Mobile Nav Toggle
============================================= */
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.style.display === 'flex';
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
});

/* =============================================
   Navbar shrink on scroll
============================================= */
window.addEventListener('scroll', function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.style.padding = '8px 20px';
    nav.style.background = 'rgba(15, 17, 48, 0.85)';
  } else {
    nav.style.padding = '12px 24px';
    nav.style.background = 'rgba(15, 17, 48, 0.6)';
  }
});
