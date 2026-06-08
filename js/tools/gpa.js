// ============================================
// GPA Calculator
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📊 GPA Calculator</div>
        <div class="form-group">
          <label>Add Course</label>
          <div class="form-row">
            <input type="text" id="gpa-course" placeholder="Course name" style="flex:2">
            <input type="number" id="gpa-credits" placeholder="Credits" min="0" max="10" step="0.5" style="flex:1">
            <select id="gpa-grade" style="flex:1">
              <option value="10">A+ (10)</option>
              <option value="9">A (9)</option>
              <option value="8">B+ (8)</option>
              <option value="7">B (7)</option>
              <option value="6">C+ (6)</option>
              <option value="5">C (5)</option>
              <option value="4">D (4)</option>
              <option value="0">F (0)</option>
            </select>
            <button class="btn btn-primary btn-sm" onclick="GPA.add()">Add</button>
          </div>
        </div>
        <div id="gpa-table-wrap" style="overflow-x:auto"></div>
        <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap">
          <div class="result-box" style="flex:1;min-width:150px">
            <div id="gpa-result">0.00</div>
            <div class="result-label">GPA</div>
          </div>
          <div class="result-box" style="flex:1;min-width:150px">
            <div id="gpa-total-credits">0</div>
            <div class="result-label">Total Credits</div>
          </div>
          <div class="result-box" style="flex:1;min-width:150px">
            <div id="gpa-courses">0</div>
            <div class="result-label">Courses</div>
          </div>
        </div>
        <div style="margin-top:12px;text-align:right">
          <button class="btn btn-danger btn-sm" onclick="GPA.clear()">Clear All</button>
        </div>
      </div>
    `;
    GPA.load();
  }

  window.GPA = {
    courses: Store.get('gpa_courses', []),
    add() {
      const name = document.getElementById('gpa-course').value.trim();
      const credits = parseFloat(document.getElementById('gpa-credits').value);
      const grade = parseFloat(document.getElementById('gpa-grade').value);
      if (!name || isNaN(credits) || credits <= 0) { showToast('Enter valid course name and credits'); return; }
      this.courses.push({ name, credits, grade });
      Store.set('gpa_courses', this.courses);
      document.getElementById('gpa-course').value = '';
      document.getElementById('gpa-credits').value = '';
      this.renderTable();
    },
    remove(i) {
      this.courses.splice(i, 1);
      Store.set('gpa_courses', this.courses);
      this.renderTable();
    },
    clear() {
      if (!confirm('Clear all courses?')) return;
      this.courses = [];
      Store.remove('gpa_courses');
      this.renderTable();
    },
    renderTable() {
      const wrap = document.getElementById('gpa-table-wrap');
      if (this.courses.length === 0) {
        wrap.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No courses added yet.</p>';
      } else {
        const rows = this.courses.map((c, i) => `<tr>
          <td>${esc(c.name)}</td><td>${c.credits}</td><td>${c.grade}</td>
          <td><button class="btn btn-danger btn-sm" onclick="GPA.remove(${i})">✕</button></td>
        </tr>`).join('');
        wrap.innerHTML = `<table><thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
      }
      // Calculate GPA
      let totalPoints = 0, totalCredits = 0;
      this.courses.forEach(c => { totalPoints += c.credits * c.grade; totalCredits += c.credits; });
      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
      document.getElementById('gpa-result').textContent = gpa;
      document.getElementById('gpa-total-credits').textContent = totalCredits;
      document.getElementById('gpa-courses').textContent = this.courses.length;
    },
    load() { this.renderTable(); }
  };

  Router.registerRoute('#gpa', 'GPA Calculator', render);
})();
