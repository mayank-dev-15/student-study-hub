// ============================================
// Router — Hash-based SPA routing
// ============================================
(function() {
  const contentEl = document.getElementById('content');
  const titleEl = document.getElementById('page-title');
  const routes = {};

  function registerRoute(hash, title, renderFn) {
    routes[hash] = { title, render: renderFn };
  }

  function navigate(hash) {
    hash = hash || '#home';
    const route = routes[hash];
    if (route) {
      if (titleEl) titleEl.textContent = route.title;
      route.render(contentEl);
      // Update active nav
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.route === hash);
      });
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
    } else {
      if (titleEl) titleEl.textContent = 'Not Found';
      contentEl.innerHTML = '<div class="card"><h3>Page not found</h3><p>Go back <a href="#home">home</a>.</p></div>';
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', () => navigate(location.hash));
  window.addEventListener('load', () => navigate(location.hash));

  window.Router = { registerRoute, navigate };
})();
