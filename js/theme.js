// ============================================
// Theme Manager v2
// ============================================
(function() {
  const KEY = 'studyhub_theme';

  function set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    updateBtn();
  }

  function get() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function toggle() {
    set(get() === 'light' ? 'dark' : 'light');
  }

  function updateBtn() {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = get() === 'light' ? '🌙' : '☀️';
  }

  function init() {
    const saved = localStorage.getItem(KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    set(saved || (prefersLight ? 'light' : 'dark'));
  }

  init();
  window.Theme = { set, get, toggle };
})();
