// ============================================
// Regex Tester
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🔍 Regex Tester</div>
        <div class="form-group">
          <label>Regular Expression</label>
          <div class="form-row">
            <span style="color:var(--text-muted);padding:10px 0">/</span>
            <input type="text" id="rx-pattern" placeholder="Pattern" style="flex:1" oninput="RX.test()">
            <span style="color:var(--text-muted);padding:10px 0">/</span>
            <input type="text" id="rx-flags" placeholder="gims" value="g" style="width:60px" oninput="RX.test()">
          </div>
        </div>
        <div class="form-group">
          <label>Test String</label>
          <textarea id="rx-input" rows="4" placeholder="Enter text to test against..." oninput="RX.test()"></textarea>
        </div>
        <div class="form-group">
          <label>Matches</label>
          <div id="rx-output" style="background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;min-height:60px;font-size:0.85rem;white-space:pre-wrap;word-break:break-all"></div>
        </div>
        <div id="rx-count" style="text-align:right;font-size:0.78rem;color:var(--text-muted)"></div>
      </div>
    `;
  }

  window.RX = {
    test() {
      const pattern = document.getElementById('rx-pattern').value;
      const flags = document.getElementById('rx-flags').value;
      const input = document.getElementById('rx-input').value;
      const output = document.getElementById('rx-output');
      const count = document.getElementById('rx-count');
      if (!pattern || !input) { output.textContent = ''; count.textContent = ''; return; }
      try {
        const re = new RegExp(pattern, flags);
        const matches = [...input.matchAll(re)];
        if (matches.length === 0) {
          output.innerHTML = '<span style="color:var(--text-muted)">No matches found</span>';
          count.textContent = '0 matches';
        } else {
          let html = '';
          let lastIdx = 0;
          matches.forEach((m, i) => {
            html += esc(input.slice(lastIdx, m.index));
            html += `<mark style="background:rgba(108,140,255,0.3);border-radius:2px" title="Match ${i+1}: groups=${m.slice(1).join(', ')}">${esc(m[0])}</mark>`;
            lastIdx = m.index + m[0].length;
          });
          html += esc(input.slice(lastIdx));
          output.innerHTML = html;
          count.textContent = `${matches.length} match${matches.length > 1 ? 'es' : ''}`;
        }
      } catch (e) {
        output.innerHTML = `<span style="color:var(--red)">Error: ${esc(e.message)}</span>`;
        count.textContent = '';
      }
    }
  };

  Router.registerRoute('#regex-tester', 'Regex Tester', render);
})();
