// ============================================
// Home / Dashboard
// ============================================
(function() {
  function renderStats() {
    const assignments = Store.get('assignments', []);
    const todos = Store.get('todos', []);
    const habits = Store.get('habits', []);
    const fc = Store.get('flashcards', []);
    const activeAssignments = assignments.filter(a => a.status !== 'done').length;
    const pendingTodos = todos.filter(t => !t.done).length;
    return `<div class="stats-row">
      <div class="stat-box"><div class="stat-value">${activeAssignments}</div><div class="stat-label">Active Assignments</div></div>
      <div class="stat-box"><div class="stat-value">${pendingTodos}</div><div class="stat-label">Pending Tasks</div></div>
      <div class="stat-box"><div class="stat-value">${habits.length}</div><div class="stat-label">Habits Tracked</div></div>
      <div class="stat-box"><div class="stat-value">${fc.length}</div><div class="stat-label">Flashcards</div></div>
    </div>`;
  }

  function renderUpcoming() {
    const assignments = Store.get('assignments', []);
    const now = Date.now();
    const upcoming = assignments
      .filter(a => a.dueDate && a.status !== 'done' && new Date(a.dueDate).getTime() > now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    if (upcoming.length === 0) return '<div class="card"><div class="card-title">📅 Upcoming Deadlines</div><p style="color:var(--text-muted);font-size:0.85rem;">No upcoming deadlines. <a href="#assignments">Add assignments</a>.</p></div>';

    const rows = upcoming.map(a => {
      const days = Math.ceil((new Date(a.dueDate) - now) / 86400000);
      const cls = days <= 1 ? 'badge-red' : days <= 3 ? 'badge-yellow' : 'badge-green';
      return `<tr><td>${esc(a.title)}</td><td>${esc(a.subject || '-')}</td><td><span class="badge ${cls}">${days}d</span></td></tr>`;
    }).join('');

    return `<div class="card"><div class="card-title">📅 Upcoming Deadlines</div>
      <div style="overflow-x:auto"><table><thead><tr><th>Title</th><th>Subject</th><th>Due</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="hero">
        <h2>Welcome to Student Study Hub</h2>
        <p>All the tools you need — 100% free, runs entirely in your browser, works offline.</p>
      </div>
      ${renderStats()}
      ${renderUpcoming()}
      <div class="grid grid-3">
        <div class="tool-card" onclick="Router.navigate('#gpa')">
          <div class="tool-icon">📊</div><div class="tool-info"><h3>GPA Calculator</h3><p>Compute your GPA & CGPA</p></div>
        </div>
        <div class="tool-card" onclick="Router.navigate('#scientific-calc')">
          <div class="tool-icon">🔢</div><div class="tool-info"><h3>Scientific Calculator</h3><p>Trig, log, powers & more</p></div>
        </div>
        <div class="tool-card" onclick="Router.navigate('#pomodoro')">
          <div class="tool-icon">🍅</div><div class="tool-info"><h3>Pomodoro Timer</h3><p>Focus & break cycles</p></div>
        </div>
        <div class="tool-card" onclick="Router.navigate('#flashcards')">
          <div class="tool-icon">🃏</div><div class="tool-info"><h3>Flashcards</h3><p>Spaced repetition learning</p></div>
        </div>
        <div class="tool-card" onclick="Router.navigate('#cheatsheets')">
          <div class="tool-icon">📋</div><div class="tool-info"><h3>Cheatsheets</h3><p>Quick reference sheets</p></div>
        </div>
        <div class="tool-card" onclick="Router.navigate('#code-playground')">
          <div class="tool-icon">💻</div><div class="tool-info"><h3>Code Playground</h3><p>HTML/CSS/JS live editor</p></div>
        </div>
      </div>
    `;
  }

  Router.registerRoute('#home', 'Home', render);
})();
