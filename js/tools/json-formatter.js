// ============================================
// JSON Formatter
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">{ } JSON Formatter & Validator</div>
        <div class="form-group">
          <label>Paste JSON</label>
          <textarea id="jf-input" class="mono" rows="8" placeholder='{"key": "value"}' oninput="JF.format()"></textarea>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:12px">
          <button class="btn btn-primary btn-sm" onclick="JF.format()">Format</button>
          <button class="btn btn-secondary btn-sm" onclick="JF.minify()">Minify</button>
          <button class="btn btn-secondary btn-sm" onclick="JF.copy()">Copy</button>
          <button class="btn btn-danger btn-sm" onclick="JF.clear()">Clear</button>
        </div>
        <div id="jf-status" style="font-size:0.82rem;margin-bottom:8px"></div>
        <div class="form-group">
          <label>Output</label>
          <textarea id="jf-output" class="mono" rows="8" readonly></textarea>
        </div>
      </div>
    `;
  }

  window.JF = {
    format() {
      const input = document.getElementById('jf-input').value.trim();
      const status = document.getElementById('jf-status');
      const output = document.getElementById('jf-output');
      if (!input) { status.innerHTML = ''; output.value = ''; return; }
      try {
        const obj = JSON.parse(input);
        output.value = JSON.stringify(obj, null, 2);
        status.innerHTML = '<span style="color:var(--green)">✓ Valid JSON</span>';
      } catch (e) {
        output.value = '';
        status.innerHTML = `<span style="color:var(--red)">✗ ${esc(e.message)}</span>`;
      }
    },
    minify() {
      const input = document.getElementById('jf-input').value.trim();
      try {
        const obj = JSON.parse(input);
        document.getElementById('jf-output').value = JSON.stringify(obj);
        document.getElementById('jf-status').innerHTML = '<span style="color:var(--green)">✓ Minified</span>';
      } catch (e) {
        document.getElementById('jf-status').innerHTML = `<span style="color:var(--red)">✗ ${esc(e.message)}</span>`;
      }
    },
    copy() {
      const output = document.getElementById('jf-output');
      navigator.clipboard.writeText(output.value).then(() => showToast('Copied!'));
    },
    clear() {
      document.getElementById('jf-input').value = '';
      document.getElementById('jf-output').value = '';
      document.getElementById('jf-status').innerHTML = '';
    }
  };

  Router.registerRoute('#json-formatter', 'JSON Formatter', render);
})();
