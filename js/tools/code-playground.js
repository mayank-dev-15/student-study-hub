// ============================================
// Code Playground (HTML/CSS/JS)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">💻 Code Playground — HTML/CSS/JS</div>
        <div class="playground-container">
          <div>
            <div class="tabs">
              <button class="tab active" onclick="CP.swapTab('html',this)">HTML</button>
              <button class="tab" onclick="CP.swapTab('css',this)">CSS</button>
              <button class="tab" onclick="CP.swapTab('js',this)">JS</button>
            </div>
            <textarea id="cp-html" class="playground-code" spellcheck="false"><!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { color: #6c8cff; }
    button { padding: 10px 20px; background: #6c8cff; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    button:hover { background: #829dff; }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit this code and click Run.</p>
  <button onclick="alert('It works!')">Click Me</button>
</body>
</html></textarea>
            <textarea id="cp-css" class="playground-code" style="display:none" spellcheck="false">body { background: #f0f0f0; }</textarea>
            <textarea id="cp-js" class="playground-code" style="display:none" spellcheck="false">console.log('Playground ready');</textarea>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:0.82rem;color:var(--text-muted)">Output Preview</span>
              <button class="btn btn-primary btn-sm" onclick="CP.run()">▶ Run</button>
            </div>
            <iframe id="cp-output" class="playground-output" sandbox="allow-scripts"></iframe>
          </div>
        </div>
      </div>
    `;
  }

  window.CP = {
    swapTab(type, btn) {
      document.querySelectorAll('.playground-container .tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('cp-html').style.display = type === 'html' ? '' : 'none';
      document.getElementById('cp-css').style.display = type === 'css' ? '' : 'none';
      document.getElementById('cp-js').style.display = type === 'js' ? '' : 'none';
    },
    run() {
      const html = document.getElementById('cp-html').value;
      const css = document.getElementById('cp-css').value;
      const js = document.getElementById('cp-js').value;
      const doc = html.replace('</head>', `<style>${css}</style></head>`)
                      .replace('</body>', `<script>${js}<\/script></body>`);
      const iframe = document.getElementById('cp-output');
      iframe.srcdoc = doc;
    }
  };

  Router.registerRoute('#code-playground', 'Code Playground', render);
})();
