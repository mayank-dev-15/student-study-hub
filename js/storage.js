// ============================================
// Local Storage Helper
// ============================================
const Store = {
  get(key, def) {
    try { const v = localStorage.getItem('studyhub_' + key); return v ? JSON.parse(v) : def; }
    catch { return def; }
  },
  set(key, val) { localStorage.setItem('studyhub_' + key, JSON.stringify(val)); },
  remove(key) { localStorage.removeItem('studyhub_' + key); }
};

// ============================================
// Toast Notification
// ============================================
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ============================================
// Utility functions
// ============================================
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function createTag(text, cls) {
  const s = document.createElement('span');
  s.className = 'badge ' + (cls || '');
  s.textContent = text;
  return s;
}
