// ============================================
// Base64 Encoder / Decoder
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🔐 Base64 Encoder / Decoder</div>
        <div class="form-group">
          <label>Input (Text or Base64)</label>
          <textarea id="b64-input" rows="5" placeholder="Enter text to encode or base64 to decode..."></textarea>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:12px">
          <button class="btn btn-primary btn-sm" onclick="B64.encode()">⬆ Encode</button>
          <button class="btn btn-secondary btn-sm" onclick="B64.decode()">⬇ Decode</button>
          <button class="btn btn-secondary btn-sm" onclick="B64.copy()">Copy</button>
          <button class="btn btn-danger btn-sm" onclick="B64.clear()">Clear</button>
        </div>
        <div class="form-group">
          <label>Output</label>
          <textarea id="b64-output" rows="5" readonly></textarea>
        </div>
      </div>
    `;
  }

  window.B64 = {
    encode() {
      const input = document.getElementById('b64-input').value;
      try {
        document.getElementById('b64-output').value = btoa(unescape(encodeURIComponent(input)));
      } catch (e) {
        document.getElementById('b64-output').value = 'Error: ' + e.message;
      }
    },
    decode() {
      const input = document.getElementById('b64-input').value.trim();
      try {
        document.getElementById('b64-output').value = decodeURIComponent(escape(atob(input)));
      } catch (e) {
        document.getElementById('b64-output').value = 'Error: Invalid base64 string';
      }
    },
    copy() {
      const output = document.getElementById('b64-output');
      navigator.clipboard.writeText(output.value).then(() => showToast('Copied!'));
    },
    clear() {
      document.getElementById('b64-input').value = '';
      document.getElementById('b64-output').value = '';
    }
  };

  Router.registerRoute('#base64', 'Base64 Encoder', render);
})();
