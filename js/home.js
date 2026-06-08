// ============================================
// Home / Dashboard v2
// ============================================
(function() {
  function renderStats() {
    const asgn = Store.get('assignments', []).filter(a => a.st !== 'done').length;
    const todo = Store.get('todos', []).filter(t => !t.done).length;
    const habits = Store.get('habits', []).length;
    const fc = Store.get('flashcards', []).length;
    return `<div class="stats-row">
      <div class="stat-box"><div class="stat-value">${asgn}</div><div class="stat-label">Assignments</div></div>
      <div class="stat-box"><div class="stat-value">${todo}</div><div class="stat-label">Pending</div></div>
      <div class="stat-box"><div class="stat-value">${habits}</div><div class="stat-label">Habits</div></div>
      <div class="stat-box"><div class="stat-value">${fc}</div><div class="stat-label">Flashcards</div></div>
    </div>`;
  }

  function renderDeadlines() {
    const items = Store.get('assignments', []);
    const now = Date.now();
    const upcoming = items.filter(a => a.d && a.st !== 'done' && new Date(a.d).getTime() > now).sort((a, b) => new Date(a.d) - new Date(b.d)).slice(0, 5);
    if (!upcoming.length) return `<div class="card"><div class="card-title">📅 Upcoming Deadlines</div><p style="color:var(--text-muted);font-size:0.85rem;">None. <a href="#assignments">Add assignments</a>.</p></div>`;
    const rows = upcoming.map(a => {
      const days = Math.ceil((new Date(a.d) - now) / 86400000);
      const cls = days <= 1 ? 'badge-red' : days <= 3 ? 'badge-yellow' : 'badge-green';
      return `<tr><td>${esc(a.t)}</td><td>${esc(a.s || '-')}</td><td><span class="badge ${cls}">${days}d</span></td></tr>`;
    }).join('');
    return `<div class="card"><div class="card-title">📅 Upcoming Deadlines</div><div class="table-wrap"><table><thead><tr><th>Title</th><th>Subject</th><th>Due</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  function renderCards() {
    const allTools = [];
    (window.NAV_CONFIG || []).forEach(cat => cat.items.forEach(item => allTools.push(item)));
    const featured = allTools.filter(t => ['gpa','scientific-calc','pomodoro','flashcards','cheatsheets','code-playground','unit-converter','quiz','graphing-calc','kanban'].includes(t.id));
    return featured.map(t => `<div class="tool-card anim-fade" onclick="Router.navigate('#${t.id}')"><div class="tool-icon">${t.icon}</div><div class="tool-info"><h3>${t.label}</h3><p>Open tool</p></div></div>`).join('');
  }

  function render(el) {
    el.innerHTML = `
      <div class="hero anim-fade">
        <h2>Student Study Hub</h2>
        <p>68 tools — 100% free, offline-capable, no sign-up. Everything runs in your browser.</p>
      </div>
      ${renderStats()}
      ${renderDeadlines()}
      <div class="grid grid-3" style="margin-top:16px">${renderCards()}</div>
    `;
  }

  Router.registerRoute('#home', 'Home', render);
})();
