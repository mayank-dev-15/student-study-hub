// ============================================
// Readability Analyzer
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📈 Readability Analyzer</div>
        <div class="form-group">
          <label>Paste text to analyze</label>
          <textarea id="ra-input" rows="8" placeholder="Paste your text here..." oninput="RA.analyze()"></textarea>
        </div>
        <div id="ra-results" style="display:none">
          <div class="stats-row">
            <div class="stat-box"><div class="stat-value" id="ra-flesch">0</div><div class="stat-label">Flesch Score</div></div>
            <div class="stat-box"><div class="stat-value" id="ra-grade">-</div><div class="stat-label">Grade Level</div></div>
            <div class="stat-box"><div class="stat-value" id="ra-words">0</div><div class="stat-label">Words</div></div>
            <div class="stat-box"><div class="stat-value" id="ra-sentences">0</div><div class="stat-label">Sentences</div></div>
          </div>
          <div id="ra-bar" style="margin-top:12px"></div>
          <div id="ra-desc" style="margin-top:8px;font-size:0.82rem;color:var(--text-muted)"></div>
        </div>
      </div>
    `;
  }

  window.RA = {
    analyze() {
      const text = document.getElementById('ra-input').value.trim();
      if (!text) { document.getElementById('ra-results').style.display = 'none'; return; }
      document.getElementById('ra-results').style.display = '';

      const words = text.split(/\s+/).filter(w => w.length > 0);
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const syllables = words.reduce((sum, w) => sum + this.countSyllables(w), 0);

      const w = words.length, s = Math.max(sentences.length, 1), sy = syllables;
      const flesch = 206.835 - 1.015 * (w / s) - 84.6 * (sy / w);
      const score = Math.max(0, Math.min(100, flesch));

      let grade, desc, color;
      if (score >= 90) { grade = '5th'; desc = 'Very easy to read'; color = 'var(--green)'; }
      else if (score >= 80) { grade = '6th'; desc = 'Easy to read'; color = 'var(--green)'; }
      else if (score >= 70) { grade = '7th'; desc = 'Fairly easy'; color = 'var(--cyan)'; }
      else if (score >= 60) { grade = '8-9th'; desc = 'Standard'; color = 'var(--yellow)'; }
      else if (score >= 50) { grade = '10-12th'; desc = 'Fairly difficult'; color = 'var(--orange)'; }
      else if (score >= 30) { grade = 'College'; desc = 'Difficult'; color = 'var(--red)'; }
      else { grade = 'Graduate'; desc = 'Very difficult'; color = 'var(--red)'; }

      document.getElementById('ra-flesch').textContent = score.toFixed(1);
      document.getElementById('ra-flesch').style.color = color;
      document.getElementById('ra-grade').textContent = grade;
      document.getElementById('ra-words').textContent = w;
      document.getElementById('ra-sentences').textContent = s;
      document.getElementById('ra-bar').innerHTML = `<div class="progress-bar"><div class="fill" style="width:${score}%;background:${color}"></div></div>`;
      document.getElementById('ra-desc').textContent = desc;
    },

    countSyllables(word) {
      word = word.toLowerCase().replace(/[^a-z]/g, '');
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const m = word.match(/[aeiouy]{1,2}/g);
      return m ? m.length : 1;
    }
  };

  Router.registerRoute('#readability', 'Readability Analyzer', render);
})();
