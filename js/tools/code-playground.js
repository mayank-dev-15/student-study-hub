// ============================================
// Code Playground v2 — FULLY WORKING
// HTML/CSS/JS live editor with templates
// ============================================
(function() {
  const TEMPLATES = {
    blank: { html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: sans-serif;\n      padding: 40px;\n      background: #1a1a2e;\n      color: #eee;\n    }\n    h1 { color: #7b9aff; }\n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>Start coding!</p>\n  <button onclick="alert(\'It works!\')">Click Me</button>\n</body>\n</html>', css: '', js: '' },
    landing: { html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63); color: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; }\n    .hero { text-align: center; padding: 40px; }\n    .hero h1 { font-size: 3rem; background: linear-gradient(135deg, #7b9aff, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 16px; }\n    .hero p { font-size: 1.2rem; color: #a0a8c0; margin-bottom: 24px; }\n    .btn { padding: 12px 32px; background: #7b9aff; color: #fff; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }\n    .btn:hover { background: #94afff; }\n  </style>\n</head>\n<body>\n  <div class="hero">\n    <h1>Welcome</h1>\n    <p>Build something amazing.</p>\n    <button class="btn" onclick="alert(\'Hello!\')">Get Started</button>\n  </div>\n</body>\n</html>', css: '', js: '' },
    flexbox: { html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    .container { display: flex; flex-wrap: wrap; gap: 12px; }\n    .box { flex: 1; min-width: 120px; height: 80px; background: linear-gradient(135deg, #7b9aff, #c084fc); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; }\n  </style>\n</head>\n<body>\n  <h2>Flexbox Demo</h2>\n  <div class="container">\n    <div class="box">Box 1</div>\n    <div class="box">Box 2</div>\n    <div class="box">Box 3</div>\n    <div class="box">Box 4</div>\n  </div>\n</body>\n</html>', css: '', js: '' },
    grid: { html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n    .cell { height: 80px; background: linear-gradient(135deg, #34d399, #22d3ee); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; }\n  </style>\n</head>\n<body>\n  <h2>CSS Grid Demo</h2>\n  <div class="grid">\n    <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>\n    <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>\n  </div>\n</body>\n</html>', css: '', js: '' },
    js_demo: { html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; text-align: center; }\n    #output { font-size: 2rem; margin: 20px 0; color: #7b9aff; }\n    button { padding: 10px 24px; margin: 4px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }\n  </style>\n</head>\n<body>\n  <h2>JavaScript Demo</h2>\n  <div id="output">0</div>\n  <button onclick="increment()" style="background:#7b9aff;color:#fff">+1</button>\n  <button onclick="decrement()" style="background:#f87171;color:#fff">-1</button>\n  <button onclick="resetVal()" style="background:#34d399;color:#fff">Reset</button>\n  <script>\n    let count = 0;\n    const el = document.getElementById("output");\n    function increment() { count++; el.textContent = count; }\n    function decrement() { count--; el.textContent = count; }\n    function resetVal() { count = 0; el.textContent = count; }\n  <\/script>\n</body>\n</html>', css: '', js: '' }
  };

  let activeTab = 'html';

  function render(c) {
    const tplOptions = Object.keys(TEMPLATES).map(k => `<option value="${k}">${k}</option>`).join('');
    c.innerHTML = `<div class="card anim-fade"><div class="card-title"><span class="icon">💻</span>Code Playground</div>
      <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center">
        <div class="tabs" style="margin-bottom:0;border-bottom:none">
          <button class="tab active" id="cp-tab-html" onclick="CP.tab('html',this)">HTML</button>
          <button class="tab" id="cp-tab-css" onclick="CP.tab('css',this)">CSS</button>
          <button class="tab" id="cp-tab-js" onclick="CP.tab('js',this)">JS</button>
        </div>
        <select id="cp-tpl" onchange="CP.loadTpl(this.value)" style="margin-left:auto">${tplOptions}</select>
        <button class="btn btn-primary btn-sm" onclick="CP.run()">▶ Run</button>
        <button class="btn btn-secondary btn-sm" onclick="CP.clearAll()">🗑 Clear</button>
      </div>
      <div class="playground-container">
        <div>
          <textarea id="cp-html" class="playground-code" spellcheck="false">${TEMPLATES.blank.html}</textarea>
          <textarea id="cp-css" class="playground-code" style="display:none" spellcheck="false" placeholder="/* CSS goes here */"></textarea>
          <textarea id="cp-js" class="playground-code" style="display:none" spellcheck="false" placeholder="// JavaScript goes here"></textarea>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:0.82rem;color:var(--text-muted)">Output Preview</span>
            <span id="cp-status" style="font-size:0.72rem;color:var(--green)"></span>
          </div>
          <iframe id="cp-output" class="playground-output" sandbox="allow-scripts allow-modals"></iframe>
        </div>
      </div>
    </div>`;
    activeTab = 'html';
  }

  window.CP = {
    tab(t, btn) {
      activeTab = t;
      document.querySelectorAll('#cp-tab-html,#cp-tab-css,#cp-tab-js').forEach(x => x.classList.remove('active'));
      if (btn) btn.classList.add('active');
      else document.getElementById('cp-tab-' + t).classList.add('active');
      ['html', 'css', 'js'].forEach(x => {
        document.getElementById('cp-' + x).style.display = x === t ? '' : 'none';
      });
    },
    loadTpl(name) {
      const tpl = TEMPLATES[name];
      if (!tpl) return;
      document.getElementById('cp-html').value = tpl.html;
      document.getElementById('cp-css').value = tpl.css || '';
      document.getElementById('cp-js').value = tpl.js || '';
      this.run();
    },
    run() {
      const html = document.getElementById('cp-html').value;
      const css = document.getElementById('cp-css').value;
      const js = document.getElementById('cp-js').value;
      let doc = html;
      if (css) doc = doc.replace('</head>', `<style>${css}</style></head>`);
      if (js) doc = doc.replace('</body>', `<script>${js}<\/script></body>`);
      const iframe = document.getElementById('cp-output');
      iframe.srcdoc = doc;
      document.getElementById('cp-status').textContent = '✓ Running';
      setTimeout(() => { document.getElementById('cp-status').textContent = ''; }, 2000);
    },
    clearAll() {
      document.getElementById('cp-html').value = '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>';
      document.getElementById('cp-css').value = '';
      document.getElementById('cp-js').value = '';
      document.getElementById('cp-output').srcdoc = '';
    }
  };

  Router.registerRoute('#code-playground', 'Code Playground', render);
})();
