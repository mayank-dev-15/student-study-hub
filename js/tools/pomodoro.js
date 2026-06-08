// ============================================
// Pomodoro Timer
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="card-title" style="justify-content:center">🍅 Pomodoro Timer</div>
        <div class="timer-mode">
          <button class="timer-mode-btn active" id="pm-work" onclick="Pomo.setMode('work')">Work (25m)</button>
          <button class="timer-mode-btn" id="pm-short" onclick="Pomo.setMode('short')">Short Break (5m)</button>
          <button class="timer-mode-btn" id="pm-long" onclick="Pomo.setMode('long')">Long Break (15m)</button>
        </div>
        <div class="timer-display" id="pomo-time">25:00</div>
        <div class="progress-bar" style="max-width:400px;margin:0 auto 16px">
          <div class="fill" id="pomo-progress" style="width:100%"></div>
        </div>
        <div class="timer-controls">
          <button class="btn btn-primary" id="pomo-start" onclick="Pomo.toggle()">▶ Start</button>
          <button class="btn btn-secondary" onclick="Pomo.reset()">↺ Reset</button>
        </div>
        <div style="margin-top:16px;color:var(--text-muted);font-size:0.82rem">
          Sessions completed: <strong id="pomo-sessions" style="color:var(--accent)">0</strong>
        </div>
      </div>
    `;
    Pomo.load();
  }

  window.Pomo = {
    mode: 'work',
    timeLeft: 25 * 60,
    totalTime: 25 * 60,
    running: false,
    interval: null,
    sessions: Store.get('pomo_sessions', 0),

    setMode(m) {
      this.mode = m;
      this.running = false;
      clearInterval(this.interval);
      document.getElementById('pomo-start').textContent = '▶ Start';
      const times = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
      this.timeLeft = times[m];
      this.totalTime = times[m];
      document.querySelectorAll('.timer-mode-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('pm-' + (m === 'work' ? 'work' : m)).classList.add('active');
      this.updateDisplay();
    },

    toggle() {
      if (this.running) {
        clearInterval(this.interval);
        this.running = false;
        document.getElementById('pomo-start').textContent = '▶ Resume';
      } else {
        this.running = true;
        document.getElementById('pomo-start').textContent = '⏸ Pause';
        this.interval = setInterval(() => this.tick(), 1000);
      }
    },

    tick() {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        this.running = false;
        document.getElementById('pomo-start').textContent = '▶ Start';
        this.sessions++;
        Store.set('pomo_sessions', this.sessions);
        document.getElementById('pomo-sessions').textContent = this.sessions;
        showToast('🍅 Pomodoro complete! Take a break.');
        this.setMode(this.mode === 'work' ? 'short' : 'work');
        return;
      }
      this.updateDisplay();
    },

    reset() {
      clearInterval(this.interval);
      this.running = false;
      document.getElementById('pomo-start').textContent = '▶ Start';
      this.timeLeft = this.totalTime;
      this.updateDisplay();
    },

    updateDisplay() {
      const m = Math.floor(this.timeLeft / 60);
      const s = this.timeLeft % 60;
      document.getElementById('pomo-time').textContent =
        String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      const pct = (this.timeLeft / this.totalTime) * 100;
      document.getElementById('pomo-progress').style.width = pct + '%';
    },

    load() {
      document.getElementById('pomo-sessions').textContent = this.sessions;
    }
  };

  Router.registerRoute('#pomodoro', 'Pomodoro Timer', render);
})();
