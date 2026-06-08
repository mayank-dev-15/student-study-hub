// ============================================
// Theme Manager
// ============================================
(function() {
  const THEME_KEY = 'studyhublite_theme';
  const toggleBtn = document.getElementById('theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggleBtn) toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    localStorage.setItem(THEME_KEY, theme);
  }

  function init() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(saved || (prefersLight ? 'light' : 'dark'));
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  init();
})();
