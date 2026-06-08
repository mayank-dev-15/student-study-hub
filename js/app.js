// ============================================
// App Initialization v2
// ============================================
(function() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const closeBtn = document.getElementById('sidebar-close');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) sidebar.classList.toggle('open');
      else sidebar.classList.toggle('collapsed');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

  window.addEventListener('resize', () => { if (window.innerWidth > 768) sidebar.classList.remove('open'); });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') { e.preventDefault(); sidebar.classList.toggle('collapsed'); }
    if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); const s = document.getElementById('search-input'); if (s) s.focus(); }
    if (e.key === 'Escape') { sidebar.classList.remove('open'); document.querySelectorAll('.modal-overlay').forEach(m => m.remove()); }
  });

  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
      sidebar.classList.remove('open');
    }
  });

  console.log('[Study Hub v2] Loaded. 68 tools ready.');
})();
