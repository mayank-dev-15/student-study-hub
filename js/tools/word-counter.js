// ============================================
// Word Counter & Text Analyzer
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📝 Word Counter & Text Analyzer</div>
        <div class="form-group">
          <label>Paste or type text</label>
          <textarea id="wc-input" rows="8" placeholder="Type or paste your text here..." oninput="WC.analyze()"></textarea>
        </div>
        <div class="stats-row">
          <div class="stat-box"><div class="stat-value" id="wc-words">0</div><div class="stat-label">Words</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-chars">0</div><div class="stat-label">Characters</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-sentences">0</div><div class="stat-label">Sentences</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-paragraphs">0</div><div class="stat-label">Paragraphs</div></div>
        </div>
        <div class="stats-row">
          <div class="stat-box"><div class="stat-value" id="wc-read-time">0m</div><div class="stat-label">Read Time</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-speak-time">0m</div><div class="stat-label">Speak Time</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-avg-word">0</div><div class="stat-label">Avg Word Len</div></div>
          <div class="stat-box"><div class="stat-value" id="wc-avg-sent">0</div><div class="stat-label">Avg Sent Len</div></div>
        </div>
        <div style="margin-top:12px" id="wc-topwords"></div>
      </div>
    `;
    WC.analyze();
  }

  window.WC = {
    analyze() {
      const text = document.getElementById('wc-input').value;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const sentences = text.trim() ? (text.split(/[.!?]+/).filter(s => s.trim()).length || 0) : 0;
      const paragraphs = text.trim() ? (text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0)) : 0;
      const wordArr = text.trim().toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const readTime = Math.max(1, Math.round(words / 200));
      const speakTime = Math.max(1, Math.round(words / 150));
      const avgWord = words > 0 ? (chars / words).toFixed(1) : 0;
      const avgSent = sentences > 0 ? (words / sentences).toFixed(1) : 0;

      document.getElementById('wc-words').textContent = words;
      document.getElementById('wc-chars').textContent = chars;
      document.getElementById('wc-sentences').textContent = sentences;
      document.getElementById('wc-paragraphs').textContent = paragraphs;
      document.getElementById('wc-read-time').textContent = readTime + 'm';
      document.getElementById('wc-speak-time').textContent = speakTime + 'm';
      document.getElementById('wc-avg-word').textContent = avgWord;
      document.getElementById('wc-avg-sent').textContent = avgSent;

      // Top words
      const freq = {};
      wordArr.forEach(w => { w = w.replace(/[^a-z]/g, ''); if (w.length > 3) freq[w] = (freq[w] || 0) + 1; });
      const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
      document.getElementById('wc-topwords').innerHTML = top.length > 0
        ? '<div style="font-size:0.78rem;color:var(--text-muted)">Top words: ' + top.map(([w, c]) => `<span class="badge badge-cyan" style="margin:2px">${esc(w)} (${c})</span>`).join('') + '</div>'
        : '';
    }
  };

  Router.registerRoute('#word-counter', 'Word Counter', render);
})();
