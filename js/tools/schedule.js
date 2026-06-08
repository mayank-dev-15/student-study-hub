// ============================================
// Schedule Planner (Weekly)
// ============================================
(function() {
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am to 8pm

  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📅 Weekly Schedule Planner</div>
        <div class="form-row" style="margin-bottom:12px">
          <div class="form-group" style="flex:2;margin-bottom:0">
            <label>Event / Class</label>
            <input type="text" id="sched-title" placeholder="e.g., Math Lecture">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Day</label>
            <select id="sched-day">${DAYS.map((d, i) => `<option value="${i}">${d}</option>`).join('')}</select>
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Start Hour</label>
            <select id="sched-start">${HOURS.map(h => `<option value="${h}">${h}:00</option>`).join('')}</select>
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>End Hour</label>
            <select id="sched-end">${HOURS.map(h => `<option value="${h + 1}">${h + 1}:00</option>`).join('')}</select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Sched.add()" style="align-self:flex-end">Add</button>
        </div>
        <div id="sched-grid" style="overflow-x:auto"></div>
        <div style="margin-top:12px;text-align:right">
          <button class="btn btn-danger btn-sm" onclick="Sched.clear()">Clear All</button>
        </div>
      </div>
    `;
    Sched.load();
  }

  window.Sched = {
    events: Store.get('schedule_events', []),

    add() {
      const title = document.getElementById('sched-title').value.trim();
      const day = parseInt(document.getElementById('sched-day').value);
      const start = parseInt(document.getElementById('sched-start').value);
      const end = parseInt(document.getElementById('sched-end').value);
      if (!title) { showToast('Enter event title'); return; }
      if (end <= start) { showToast('End must be after start'); return; }
      this.events.push({ title, day, start, end, id: Date.now() });
      Store.set('schedule_events', this.events);
      document.getElementById('sched-title').value = '';
      this.renderGrid();
    },

    remove(id) {
      this.events = this.events.filter(e => e.id !== id);
      Store.set('schedule_events', this.events);
      this.renderGrid();
    },

    clear() {
      if (!confirm('Clear all events?')) return;
      this.events = [];
      Store.remove('schedule_events');
      this.renderGrid();
    },

    renderGrid() {
      const el = document.getElementById('sched-grid');
      let html = '<table><thead><tr><th>Hour</th>';
      DAYS.forEach(d => html += `<th>${d.slice(0, 3)}</th>`);
      html += '</tr></thead><tbody>';

      HOURS.forEach(h => {
        html += `<tr><td>${h}:00</td>`;
        for (let d = 0; d < 7; d++) {
          const evts = this.events.filter(e => e.day === d && h >= e.start && h < e.end);
          if (evts.length > 0) {
            const e = evts[0];
            const isStart = h === e.start;
            html += `<td style="padding:2px">${isStart ? `<div style="background:var(--accent-glow);border:1px solid var(--accent);border-radius:4px;padding:4px 6px;font-size:0.72rem;color:var(--accent);cursor:pointer" title="Remove" onclick="Sched.remove(${e.id})">${esc(e.title)} <span style="opacity:0.6">${e.start}:00-${e.end}:00</span></div>` : ''}</td>`;
          } else {
            html += '<td></td>';
          }
        }
        html += '</tr>';
      });
      html += '</tbody></table>';
      el.innerHTML = html;
    },

    load() { this.renderGrid(); }
  };

  Router.registerRoute('#schedule', 'Schedule Planner', render);
})();
