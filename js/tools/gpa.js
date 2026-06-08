// GPA Calculator v2
(function() {
  function render(el) {
    el.innerHTML = `<div class="card anim-fade"><div class="card-title"><span class="icon">📊</span>GPA Calculator</div>
      <div class="form-row" style="margin-bottom:12px">
        <div class="form-group" style="flex:2;margin-bottom:0"><label>Course Name</label><input type="text" id="gpa-course" placeholder="e.g., Calculus I"></div>
        <div class="form-group" style="flex:1;margin-bottom:0"><label>Credits</label><input type="number" id="gpa-credits" placeholder="3" min="0.5" max="10" step="0.5"></div>
        <div class="form-group" style="flex:1;margin-bottom:0"><label>Grade</label>
          <select id="gpa-grade"><option value="10">A+ (10)</option><option value="9">A (9)</option><option value="8">B+ (8)</option><option value="7">B (7)</option><option value="6">C+ (6)</option><option value="5">C (5)</option><option value="4">D (4)</option><option value="0">F (0)</option></select>
        </div>
        <button class="btn btn-primary btn-sm" onclick="GPA.add()" style="align-self:flex-end">Add</button>
      </div>
      <div id="gpa-table-wrap" class="table-wrap"></div>
      <div class="stats-row" style="margin-top:16px">
        <div class="stat-box"><div class="stat-value" id="gpa-result">0.00</div><div class="stat-label">GPA</div></div>
        <div class="stat-box"><div class="stat-value" id="gpa-credits">0</div><div class="stat-label">Credits</div></div>
        <div class="stat-box"><div class="stat-value" id="gpa-courses">0</div><div class="stat-label">Courses</div></div>
      </div>
      <div style="margin-top:12px"><input type="number" id="gpa-target" placeholder="Target GPA" step="0.01" style="width:120px" oninput="GPA.targetCalc()"><span id="gpa-target-result" style="margin-left:8px;font-size:0.82rem;color:var(--text-muted)"></span></div>
      <div style="margin-top:12px;text-align:right"><button class="btn btn-danger btn-sm" onclick="GPA.clear()">Clear All</button></div>
    </div>`;
    GPA.load();
  }
  window.GPA = {
    courses: Store.get('gpa_courses', []),
    add() {
      const name = document.getElementById('gpa-course').value.trim();
      const credits = parseFloat(document.getElementById('gpa-credits').value);
      const grade = parseFloat(document.getElementById('gpa-grade').value);
      if (!name || isNaN(credits) || credits <= 0) { Toast.error('Enter valid course name and credits'); return; }
      this.courses.push({ name, credits, grade });
      Store.set('gpa_courses', this.courses);
      document.getElementById('gpa-course').value = '';
      document.getElementById('gpa-credits').value = '';
      this.renderTable();
    },
    remove(i) { this.courses.splice(i, 1); Store.set('gpa_courses', this.courses); this.renderTable(); },
    clear() { this.courses = []; Store.remove('gpa_courses'); this.renderTable(); },
    targetCalc() {
      const target = parseFloat(document.getElementById('gpa-target').value);
      if (isNaN(target)) { document.getElementById('gpa-target-result').textContent = ''; return; }
      let tp = 0, tc = 0;
      this.courses.forEach(c => { tp += c.credits * c.grade; tc += c.credits; });
      if (tc === 0) { document.getElementById('gpa-target-result').textContent = 'Add courses first'; return; }
      // What average grade needed in 3 more credits?
      const need = (target * (tc + 3) - tp) / 3;
      if (need > 10) document.getElementById('gpa-target-result').textContent = 'Not possible with 3 credits';
      else if (need < 0) document.getElementById('gpa-target-result').textContent = 'Already above target!';
      else document.getElementById('gpa-target-result').textContent = `Need avg grade: ${need.toFixed(2)} in 3 credits`;
    },
    renderTable() {
      const w = document.getElementById('gpa-table-wrap');
      if (!this.courses.length) { w.innerHTML = '<div class="empty-state"><p>No courses added yet.</p></div>'; }
      else {
        const rows = this.courses.map((c, i) => `<tr><td>${esc(c.name)}</td><td>${c.credits}</td><td>${c.grade}</td><td><button class="btn btn-danger btn-sm" onclick="GPA.remove(${i})">✕</button></td></tr>`).join('');
        w.innerHTML = `<table><thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
      }
      let tp = 0, tc = 0;
      this.courses.forEach(c => { tp += c.credits * c.grade; tc += c.credits; });
      document.getElementById('gpa-result').textContent = tc > 0 ? (tp / tc).toFixed(2) : '0.00';
      document.getElementById('gpa-credits').textContent = tc;
      document.getElementById('gpa-courses').textContent = this.courses.length;
    },
    load() { this.renderTable(); }
  };
  Router.registerRoute('#gpa', 'GPA Calculator', render);
})();