// ============================================
// Water Tracker
// ============================================
(function() {
  const GOAL = 8;

  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="card-title" style="justify-content:center">💧 Water Tracker</div>
        <div style="font-size:4rem;margin:8px">💧</div>
        <div style="font-size:2.5rem;font-weight:700;color:var(--cyan)" id="wt-count">0</div>
        <div style="color:var(--text-muted);font-size:0.85rem">out of ${GOAL} glasses</div>
        <div class="progress-bar" style="max-width:400px;margin:16px auto">
          <div class="fill" id="wt-progress" style="width:0%;background:linear-gradient(90deg,#22d3ee,#3b82f6)"></div>
        </div>
        <div style="display:flex;justify-content:center;gap:12px">
          <button class="btn btn-primary" onclick="WT.add(1)">+1 Glass</button>
          <button class="btn btn-secondary" onclick="WT.add(0.5)">+½ Glass</button>
          <button class="btn btn-danger btn-sm" onclick="WT.remove()">-1</button>
        </div>
        <div style="margin-top:12px">
          <button class="btn btn-secondary btn-sm" onclick="WT.reset()">Reset Day</button>
        </div>
      </div>
    `;
    WT.load();
  }

  window.WT = {
    count: Store.get('water_today', 0),
    date: Store.get('water_date', ''),

    load() {
      const today = new Date().toDateString();
      if (this.date !== today) { this.count = 0; this.date = today; Store.set('water_date', today); Store.set('water_today', 0); }
      this.update();
    },

    add(n) {
      this.count = Math.round((this.count + n) * 10) / 10;
      Store.set('water_today', this.count);
      this.update();
      if (this.count >= GOAL) showToast('🎉 Daily goal reached!');
    },

    remove() {
      this.count = Math.max(0, Math.round((this.count - 1) * 10) / 10);
      Store.set('water_today', this.count);
      this.update();
    },

    reset() {
      this.count = 0;
      Store.set('water_today', 0);
      this.update();
    },

    update() {
      document.getElementById('wt-count').textContent = this.count;
      const pct = Math.min(100, (this.count / GOAL) * 100);
      document.getElementById('wt-progress').style.width = pct + '%';
    }
  };

  Router.registerRoute('#water-tracker', 'Water Tracker', render);
})();

// ============================================
// Sleep Calculator
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">😴 Sleep Calculator</div>
        <div class="form-group">
          <label>I need to wake up at:</label>
          <input type="time" id="sleep-wake" value="07:00" onchange="Sleep.calc()">
        </div>
        <div id="sleep-results" style="margin-top:16px"></div>
      </div>
    `;
    Sleep.calc();
  }

  window.Sleep = {
    calc() {
      const wakeStr = document.getElementById('sleep-wake').value;
      const [h, m] = wakeStr.split(':').map(Number);
      const wakeMinutes = h * 60 + m;
      // 5 sleep cycles of 90 min each = 7.5h, subtract 15min to fall asleep
      const cycleMinutes = 90;
      const fallAsleep = 15;
      let html = '<div class="grid grid-2">';
      [5, 4, 6, 3].forEach(cycles => {
        const bedMinutes = wakeMinutes - (cycles * cycleMinutes + fallAsleep);
        const adj = ((bedMinutes % 1440) + 1440) % 1440;
        const bh = Math.floor(adj / 60);
        const bm = adj % 60;
        const time = String(bh).padStart(2, '0') + ':' + String(bm).padStart(2, '0');
        const hours = ((cycles * cycleMinutes) / 60).toFixed(1);
        const rec = cycles >= 5 ? 'badge-green' : cycles >= 4 ? 'badge-yellow' : 'badge-red';
        html += `<div class="tool-card">
          <div class="tool-icon">😴</div>
          <div class="tool-info">
            <h3>${time}</h3>
            <p>${hours}h sleep • ${cycles} cycles <span class="badge ${rec}" style="margin-left:4px">${cycles >= 5 ? 'Recommended' : cycles >= 4 ? 'OK' : 'Minimal'}</span></p>
          </div>
        </div>`;
      });
      html += '</div>';
      document.getElementById('sleep-results').innerHTML = html;
    }
  };

  Router.registerRoute('#sleep-calc', 'Sleep Calculator', render);
})();
