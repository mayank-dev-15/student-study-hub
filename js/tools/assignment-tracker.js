// ============================================
// Assignment Tracker
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📝 Assignment Tracker</div>
        <div class="form-row" style="margin-bottom:12px">
          <div class="form-group" style="flex:2;margin-bottom:0">
            <label>Title</label>
            <input type="text" id="asgn-title" placeholder="Assignment title">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Subject</label>
            <input type="text" id="asgn-subject" placeholder="Subject">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Due Date</label>
            <input type="date" id="asgn-due">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Priority</label>
            <select id="asgn-priority">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Asgn.add()" style="align-self:flex-end">Add</button>
        </div>
        <div id="asgn-list" style="overflow-x:auto"></div>
      </div>
    `;
    Asgn.load();
  }

  window.Asgn = {
    items: Store.get('assignments', []),

    add() {
      const title = document.getElementById('asgn-title').value.trim();
      const subject = document.getElementById('asgn-subject').value.trim();
      const dueDate = document.getElementById('asgn-due').value;
      const priority = document.getElementById('asgn-priority').value;
      if (!title) { showToast('Enter assignment title'); return; }
      this.items.push({ title, subject, dueDate, priority, status: 'pending', id: Date.now() });
      Store.set('assignments', this.items);
      document.getElementById('asgn-title').value = '';
      document.getElementById('asgn-subject').value = '';
      document.getElementById('asgn-due').value = '';
      this.renderList();
    },

    toggleStatus(id) {
      const item = this.items.find(a => a.id === id);
      if (item) {
        item.status = item.status === 'done' ? 'pending' : 'done';
        Store.set('assignments', this.items);
        this.renderList();
      }
    },

    remove(id) {
      this.items = this.items.filter(a => a.id !== id);
      Store.set('assignments', this.items);
      this.renderList();
    },

    renderList() {
      const el = document.getElementById('asgn-list');
      if (this.items.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No assignments yet.</p>';
        return;
      }
      const sorted = [...this.items].sort((a, b) => {
        if (a.status === b.status) {
          if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
          return a.dueDate ? -1 : 1;
        }
        return a.status === 'done' ? 1 : -1;
      });

      const prioClass = { high: 'badge-red', medium: 'badge-yellow', low: 'badge-green' };
      const rows = sorted.map(a => {
        const due = a.dueDate ? new Date(a.dueDate) : null;
        const days = due ? Math.ceil((due - Date.now()) / 86400000) : null;
        const dueStr = due ? (days < 0 ? `<span class="badge badge-red">Overdue ${Math.abs(days)}d</span>` : days === 0 ? `<span class="badge badge-red">Today</span>` : `<span class="badge ${prioClass[a.priority]}">${days}d left</span>`) : '-';
        const doneStyle = a.status === 'done' ? 'style="text-decoration:line-through;opacity:0.5"' : '';
        return `<tr ${doneStyle}>
          <td><input type="checkbox" ${a.status === 'done' ? 'checked' : ''} onchange="Asgn.toggleStatus(${a.id})"></td>
          <td>${esc(a.title)}</td>
          <td>${esc(a.subject || '-')}</td>
          <td>${dueStr}</td>
          <td><span class="badge ${prioClass[a.priority]}">${a.priority}</span></td>
          <td><button class="btn btn-danger btn-sm" onclick="Asgn.remove(${a.id})">✕</button></td>
        </tr>`;
      }).join('');

      el.innerHTML = `<table>
        <thead><tr><th>✓</th><th>Title</th><th>Subject</th><th>Due</th><th>Priority</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
    },

    load() { this.renderList(); }
  };

  Router.registerRoute('#assignments', 'Assignment Tracker', render);
})();
