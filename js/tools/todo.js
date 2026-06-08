// ============================================
// Todo List
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">✅ Todo List</div>
        <div class="form-row" style="margin-bottom:12px">
          <input type="text" id="todo-input" placeholder="Add a task..." style="flex:1" onkeydown="if(event.key==='Enter')Todo.add()">
          <select id="todo-priority" style="width:100px">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="Todo.add()">Add</button>
        </div>
        <div id="todo-filters" style="display:flex;gap:8px;margin-bottom:12px">
          <button class="btn btn-sm btn-secondary" onclick="Todo.filter='all';Todo.render()" id="tf-all">All</button>
          <button class="btn btn-sm btn-secondary" onclick="Todo.filter='active';Todo.render()" id="tf-active">Active</button>
          <button class="btn btn-sm btn-secondary" onclick="Todo.filter='done';Todo.render()" id="tf-done">Done</button>
        </div>
        <div id="todo-list"></div>
        <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
          <span id="todo-count" style="font-size:0.78rem;color:var(--text-muted)"></span>
          <button class="btn btn-danger btn-sm" onclick="Todo.clearDone()">Clear Done</button>
        </div>
      </div>
    `;
    Todo.filter = 'all';
    Todo.load();
  }

  window.Todo = {
    items: Store.get('todos', []),
    filter: 'all',

    add() {
      const input = document.getElementById('todo-input');
      const text = input.value.trim();
      const priority = document.getElementById('todo-priority').value;
      if (!text) return;
      this.items.unshift({ text, done: false, priority, id: Date.now() });
      Store.set('todos', this.items);
      input.value = '';
      this.render();
    },

    toggle(id) {
      const item = this.items.find(t => t.id === id);
      if (item) { item.done = !item.done; Store.set('todos', this.items); this.render(); }
    },

    remove(id) {
      this.items = this.items.filter(t => t.id !== id);
      Store.set('todos', this.items);
      this.render();
    },

    clearDone() {
      this.items = this.items.filter(t => !t.done);
      Store.set('todos', this.items);
      this.render();
    },

    render() {
      const el = document.getElementById('todo-list');
      let filtered = this.items;
      if (this.filter === 'active') filtered = this.items.filter(t => !t.done);
      if (this.filter === 'done') filtered = this.items.filter(t => t.done);

      // Update filter buttons
      document.querySelectorAll('#todo-filters button').forEach(b => b.style.opacity = '0.5');
      const activeBtn = document.getElementById('tf-' + this.filter);
      if (activeBtn) activeBtn.style.opacity = '1';

      if (filtered.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No tasks.</p>';
      } else {
        const prioClass = { high: 'badge-red', medium: 'badge-yellow', low: 'badge-green' };
        el.innerHTML = filtered.map(t => `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
          <input type="checkbox" ${t.done ? 'checked' : ''} onchange="Todo.toggle(${t.id})">
          <span style="flex:1;font-size:0.88rem;${t.done ? 'text-decoration:line-through;opacity:0.5' : ''}">${esc(t.text)}</span>
          <span class="badge ${prioClass[t.priority]}">${t.priority}</span>
          <button class="btn btn-danger btn-sm" onclick="Todo.remove(${t.id})">✕</button>
        </div>`).join('');
      }
      const active = this.items.filter(t => !t.done).length;
      document.getElementById('todo-count').textContent = `${active} of ${this.items.length} remaining`;
    },

    load() { this.render(); }
  };

  Router.registerRoute('#todo', 'Todo List', render);
})();
