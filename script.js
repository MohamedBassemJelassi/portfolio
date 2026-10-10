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
