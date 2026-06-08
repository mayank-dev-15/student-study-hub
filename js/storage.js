// ============================================
// Storage, Toast, Modal, Utilities v2
// ============================================
(function() {
  // --- Store ---
  window.Store = {
    get(key, def) {
      try { const v = localStorage.getItem('sh_' + key); return v ? JSON.parse(v) : def; }
      catch { return def; }
    },
    set(key, val) { localStorage.setItem('sh_' + key, JSON.stringify(val)); },
    remove(key) { localStorage.removeItem('sh_' + key); },
    clearAll() { Object.keys(localStorage).filter(k => k.startsWith('sh_')).forEach(k => localStorage.removeItem(k)); },
    exportAll() {
      const data = {};
      Object.keys(localStorage).filter(k => k.startsWith('sh_')).forEach(k => { data[k] = localStorage.getItem(k); });
      return JSON.stringify(data, null, 2);
    },
    importAll(json) {
      try {
        const data = JSON.parse(json);
        Object.keys(data).filter(k => k.startsWith('sh_')).forEach(k => localStorage.setItem(k, data[k]));
        return true;
      } catch { return false; }
    }
  };

  // --- Toast ---
  let toastContainer = null;
  function getContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      toastContainer.id = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  window.Toast = {
    show(msg, type = 'info', duration = 2500) {
      const c = getContainer();
      const t = document.createElement('div');
      t.className = `toast toast-${type}`;
      const icons = { success: '✓', error: '✗', info: 'ℹ' };
      t.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${esc(msg)}</span>`;
      c.appendChild(t);
      setTimeout(() => {
        t.classList.add('hiding');
        setTimeout(() => t.remove(), 300);
      }, duration);
    },
    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    info(msg) { this.show(msg, 'info'); }
  };

  // --- Confirm Modal ---
  window.confirmDialog = function(msg) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `<div class="modal anim-scale" style="max-width:360px">
        <div class="modal-header"><h3>Confirm</h3></div>
        <p style="margin-bottom:20px;color:var(--text-secondary);font-size:0.9rem">${esc(msg)}</p>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button class="btn btn-secondary btn-sm" id="modal-cancel">Cancel</button>
          <button class="btn btn-danger btn-sm" id="modal-ok">Confirm</button>
        </div>
      </div>`;
      document.body.appendChild(overlay);
      overlay.querySelector('#modal-cancel').onclick = () => { overlay.remove(); resolve(false); };
      overlay.querySelector('#modal-ok').onclick = () => { overlay.remove(); resolve(true); };
    });
  };

  // --- Custom Modal ---
  window.showModal = function({ title, body, onConfirm, onCancel }) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal anim-scale">
      <div class="modal-header"><h3>${esc(title)}</h3><span class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</span></div>
      <div class="modal-body">${body}</div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  };

  // --- Utilities ---
  window.esc = function(s) {
    const d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  };

  window.wordWrap = function(s, len) {
    if (!s) return '';
    return s.split('\n').map(line => {
      const words = line.split(' ');
      let out = '', cur = '';
      words.forEach(w => { if (cur.length + w.length > len) { out += cur + '\n'; cur = w; } else { cur += (cur ? ' ' : '') + w; } });
      return out + cur;
    }).join('\n');
  };
})();
