// ============================================
// Router v2 — Hash-based SPA router
// ============================================
(function() {
  const contentEl = document.getElementById('content');
  const titleEl = document.getElementById('page-title');
  const routes = {};

  function registerRoute(hash, title, renderFn) {
    routes[hash] = { title, render: renderFn };
  }

  function getParams(hash) {
    const idx = hash.indexOf('?');
    if (idx === -1) return {};
    const params = {};
    hash.slice(idx + 1).split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return params;
  }

  function navigate(hash) {
    hash = hash || '#home';
    const baseHash = hash.split('?')[0];
    const route = routes[baseHash];
    if (route) {
      if (titleEl) titleEl.textContent = route.title;
      try {
        route.render(contentEl, getParams(hash));
      } catch (err) {
        console.error('Render error:', err);
        contentEl.innerHTML = '<div class="card"><h3>Error loading page</h3><p>' + esc(err.message) + '</p></div>';
      }
      updateNav(baseHash);
    } else {
      if (titleEl) titleEl.textContent = 'Not Found';
      contentEl.innerHTML = '<div class="card anim-fade"><h3>Page not found</h3><p>Go back <a href="#home">home</a>.</p></div>';
    }
    window.scrollTo(0, 0);
  }

  function updateNav(hash) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === hash);
    });
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  }

  window.addEventListener('hashchange', () => navigate(location.hash));
  window.addEventListener('load', () => navigate(location.hash));

  window.Router = { registerRoute, navigate, getParams, routes: Object.keys(routes) };
})();
