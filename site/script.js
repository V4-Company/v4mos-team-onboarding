// ============================================
// V4MOS Developer Onboarding — Scripts
// ============================================

// Scroll-based nav style
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in on scroll (Intersection Observer)
const fadeElements = document.querySelectorAll(
  '.arch__layer, .arch__connections, .repo-card, .step, .cmd-group, ' +
  '.timeline__item, .ddd__layer, .ddd__arrow, .ddd__note, .prereqs'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// Copy code to clipboard
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const original = button.textContent;
    button.textContent = 'copiado!';
    button.style.color = 'var(--green)';
    button.style.borderColor = 'var(--green)';
    setTimeout(() => {
      button.textContent = original;
      button.style.color = '';
      button.style.borderColor = '';
    }, 2000);
  });
}

// Staggered fade-in for elements in same section
document.querySelectorAll('.section').forEach(section => {
  const items = section.querySelectorAll('.fade-in');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });
});
