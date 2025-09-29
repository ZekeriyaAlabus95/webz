// Smooth scroll & nav toggle
const nav = document.getElementById('nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Theme: default to dark, allow toggle, and persist
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    updateToggleIcon();
    toggleBtn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    const isLight = root.getAttribute('data-theme') === 'light';
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    toggleBtn.title = isLight ? 'Switch to dark' : 'Switch to light';
    toggleBtn.setAttribute('aria-label', toggleBtn.title);
  }
})();