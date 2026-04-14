// ============================================
// V4MOS Developer Onboarding — Scripts
// ============================================

// Scroll-based nav highlighting
(function () {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  function getActiveSection() {
    const scrollY = window.scrollY + 120;
    let active = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        active = section.id;
      }
    });
    return active;
  }

  function updateNav() {
    const activeId = getActiveSection();
    navItems.forEach(function (item) {
      const href = item.getAttribute('href');
      if (href === '#' + activeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

// Smooth scroll for nav links
document.querySelectorAll('.nav-item').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close sidebar on mobile after click
      closeSidebar();
    }
  });
});

// Mobile sidebar toggle
var hamburger = document.getElementById('hamburger');
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('sidebar-overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', function () {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);

// Expandable sections
function toggleExpand(id) {
  var container = document.getElementById(id);
  if (!container) return;
  var btn = container.querySelector('.expandable-toggle');
  var content = container.querySelector('.expandable-content');
  if (!btn || !content) return;

  var isOpen = content.classList.contains('open');
  if (isOpen) {
    content.classList.remove('open');
    btn.classList.remove('open');
  } else {
    content.classList.add('open');
    btn.classList.add('open');
  }
}

// Copy button for code blocks
function copyCode(btn) {
  var block = btn.parentElement;
  var code = block.querySelector('code');
  if (!code) return;

  // Strip HTML tags to get plain text
  var text = code.innerText || code.textContent;

  navigator.clipboard.writeText(text).then(function () {
    var original = btn.textContent;
    btn.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1800);
  }).catch(function () {
    // Fallback for older browsers
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'copy';
      btn.classList.remove('copied');
    }, 1800);
  });
}
