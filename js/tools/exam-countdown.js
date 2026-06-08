// ============================================
// Exam Countdown
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">⏳ Exam Countdown</div>
        <div class="form-row" style="margin-bottom:12px">
          <div class="form-group" style="flex:2;margin-bottom:0">
            <label>Exam Name</label>
            <input type="text" id="exam-name" placeholder="e.g., Physics Midterm">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Date</label>
            <input type="date" id="exam-date">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Time</label>
            <input type="time" id="exam-time" value="09:00">
          </div>
          <button class="btn btn-primary btn-sm" onclick="Exam.add()" style="align-self:flex-end">Add</button>
        </div>
        <div id="exam-list"></div>
      </div>
    `;
    Exam.load();
    Exam.startTicker();
  }

  window.Exam = {
    items: Store.get('exams', []),
    ticker: null,

    add() {
      const name = document.getElementById('exam-name').value.trim();
      const date = document.getElementById('exam-date').value;
      const time = document.getElementById('exam-time').value;
      if (!name || !date) { showToast('Enter exam name and date'); return; }
      const dt = new Date(date + 'T' + (time || '00:00'));
      this.items.push({ name, date, time: time || '00:00', datetime: dt.getTime(), id: Date.now() });
      Store.set('exams', this.items);
      document.getElementById('exam-name').value = '';
      document.getElementById('exam-date').value = '';
      this.renderList();
    },

    remove(id) {
      this.items = this.items.filter(e => e.id !== id);
      Store.set('exams', this.items);
      this.renderList();
    },

    timeLeft(ts) {
      const diff = ts - Date.now();
      if (diff <= 0) return 'Started!';
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      if (d > 0) return `${d}d ${h}h ${m}m`;
      if (h > 0) return `${h}h ${m}m ${sec}s`;
      return `${m}m ${sec}s`;
    },

    renderList() {
      const el = document.getElementById('exam-list');
      const upcoming = this.items.filter(e => e.datetime > Date.now()).sort((a, b) => a.datetime - b.datetime);
      if (upcoming.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No upcoming exams.</p>';
        return;
      }
      el.innerHTML = upcoming.map(e => `
        <div class="tool-card" style="margin-bottom:8px">
          <div class="tool-icon">⏳</div>
          <div class="tool-info" style="flex:1">
            <h3>${esc(e.name)}</h3>
            <p>${e.date} ${e.time}</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent)" id="exam-timer-${e.id}">${this.timeLeft(e.datetime)}</div>
            <button class="btn btn-danger btn-sm" onclick="Exam.remove(${e.id})" style="margin-top:4px">✕</button>
          </div>
        </div>
      `).join('');
    },

    startTicker() {
      if (this.ticker) clearInterval(this.ticker);
      this.ticker = setInterval(() => {
        this.items.forEach(e => {
          const el = document.getElementById('exam-timer-' + e.id);
          if (el) el.textContent = this.timeLeft(e.datetime);
        });
      }, 1000);
    },

    load() { this.renderList(); }
  };

  Router.registerRoute('#exam-countdown', 'Exam Countdown', render);
})();
