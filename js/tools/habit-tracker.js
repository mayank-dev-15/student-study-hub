// ============================================
// Habit Tracker
// ============================================
(() => {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🔄 Habit Tracker</div>
        <div class="form-row" style="margin-bottom:12px">
          <input type="text" id="habit-name" placeholder="New habit..." style="flex:1" onkeydown="if(event.key==='Enter')Habit.add()">
          <button class="btn btn-primary btn-sm" onclick="Habit.add()">Add</button>
        </div>
        <div id="habit-grid"></div>
      </div>
    `;
    Habit.load();
  }

  window.Habit = {
    habits: Store.get('habits', []),
    today: new Date().toDateString(),

    add() {
      const name = document.getElementById('habit-name').value.trim();
      if (!name) return;
      this.habits.push({ name, created: Date.now(), log: {} });
      Store.set('habits', this.habits);
      document.getElementById('habit-name').value = '';
      this.render();
    },

    remove(i) {
      this.habits.splice(i, 1);
      Store.set('habits', this.habits);
      this.render();
    },

    toggle(i) {
      const date = this.today;
      const h = this.habits[i];
      h.log[date] = !h.log[date];
      Store.set('habits', this.habits);
      this.render();
    },

    streak(i) {
      const h = this.habits[i];
      let streak = 0;
      let d = new Date();
      while (true) {
        const key = d.toDateString();
        if (h.log[key]) { streak++; d.setDate(d.getDate() - 1); }
        else break;
      }
      return streak;
    },

    render() {
      const el = document.getElementById('habit-grid');
      if (this.habits.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No habits yet. Add one above!</p>';
        return;
      }
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toDateString();
      });
      let html = '<div style="overflow-x:auto"><table><thead><tr><th>Habit</th>';
      days.forEach(d => { const dd = new Date(d); html += `<th style="font-size:0.72rem">${dd.toLocaleDateString('en', { weekday: 'short' })}<br>${dd.getDate()}</th>`; });
      html += '<th>Streak</th><th></th></tr></thead><tbody>';
      this.habits.forEach((h, i) => {
        const checked = h.log[this.today] ? 'checked' : '';
        html += `<tr><td><strong>${esc(h.name)}</strong></td>`;
        days.forEach(d => {
          const done = h.log[d] ? '✓' : '';
          const color = done ? 'color:var(--green);font-weight:700' : 'color:var(--text-muted)';
          html += `<td style="${color};text-align:center;font-size:1.1rem">${done}</td>`;
        });
        const s = this.streak(i);
        html += `<td><span class="badge ${s >= 7 ? 'badge-green' : s >= 3 ? 'badge-yellow' : 'badge-purple'}">${s} days</span></td>`;
        html += `<td><button class="btn btn-danger btn-sm" onclick="Habit.remove(${i})">✕</button></td></tr>`;
      });
      html += '</tbody></table></div>';
      el.innerHTML = html;
    },

    load() { this.render(); }
  };

  Router.registerRoute('#habit-tracker', 'Habit Tracker', render);
})();
