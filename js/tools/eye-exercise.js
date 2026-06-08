// ============================================
// Eye Exercise (20-20-20 Rule)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="card-title" style="justify-content:center">👁️ Eye Exercise — 20-20-20 Rule</div>
        <p style="color:var(--text-secondary);margin-bottom:20px">Every 20 minutes, look at something 20 feet away for 20 seconds.</p>
        <div style="font-size:4rem;margin:16px">👁️</div>
        <div class="timer-display" id="eye-timer">00:20</div>
        <div class="timer-controls">
          <button class="btn btn-primary" id="eye-start" onclick="Eye.toggle()">▶ Start</button>
          <button class="btn btn-secondary" onclick="Eye.reset()">↺ Reset</button>
        </div>
        <div style="margin-top:16px;font-size:0.82rem;color:var(--text-muted)">
          Sessions completed: <strong id="eye-sessions" style="color:var(--accent)">0</strong>
        </div>
      </div>
    `;
    Eye.load();
  }

  window.Eye = {
    timeLeft: 20,
    running: false,
    interval: null,
    sessions: Store.get('eye_sessions', 0),

    toggle() {
      if (this.running) {
        clearInterval(this.interval);
        this.running = false;
        document.getElementById('eye-start').textContent = '▶ Resume';
      } else {
        this.running = true;
        document.getElementById('eye-start').textContent = '⏸ Pause';
        this.interval = setInterval(() => this.tick(), 1000);
      }
    },

    tick() {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        this.running = false;
        this.sessions++;
        Store.set('eye_sessions', this.sessions);
        document.getElementById('eye-sessions').textContent = this.sessions;
        document.getElementById('eye-start').textContent = '▶ Start';
        showToast('👁️ Eye break complete! Good job.');
        this.timeLeft = 20;
      }
      this.updateDisplay();
    },

    reset() {
      clearInterval(this.interval);
      this.running = false;
      this.timeLeft = 20;
      document.getElementById('eye-start').textContent = '▶ Start';
      this.updateDisplay();
    },

    updateDisplay() {
      const s = String(this.timeLeft).padStart(2, '0');
      document.getElementById('eye-timer').textContent = '00:' + s;
    },

    load() {
      document.getElementById('eye-sessions').textContent = this.sessions;
    }
  };

  Router.registerRoute('#eye-exercise', 'Eye Exercise', render);
})();
