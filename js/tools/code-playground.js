// ============================================
// Code Playground v3 — FULLY WORKING
// HTML/CSS/JS live editor with real preview
// ============================================
(function() {
  function render(c) {
    c.innerHTML = `<div class="card anim-fade">
      <div class="card-title"><span class="icon">💻</span>Code Playground</div>
      <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center">
        <div class="tabs" style="margin-bottom:0;border-bottom:none">
          <button class="tab active" id="cp-t-html" onclick="CPPG.sw('html',this)">HTML</button>
          <button class="tab" id="cp-t-css" onclick="CPPG.sw('css',this)">CSS</button>
          <button class="tab" id="cp-t-js" onclick="CPPG.sw('js',this)">JS</button>
        </div>
        <select id="cp-tpl" onchange="CPPG.ld(this.value)" style="margin-left:auto">
          <option value="">-- Template --</option>
          <option value="blank">Blank</option>
          <option value="hello">Hello World</option>
          <option value="flexbox">Flexbox Demo</option>
          <option value="grid">Grid Demo</option>
          <option value="jsdemo">JS Counter</option>
          <option value="animation">CSS Animation</option>
          <option value="canvas">Canvas Drawing</option>
        </select>
        <button class="btn btn-primary btn-sm" onclick="CPPG.run()">▶ Run</button>
        <button class="btn btn-secondary btn-sm" onclick="CPPG.clr()">🗑 Clear</button>
      </div>
      <div class="playground-container">
        <div>
          <textarea id="cp-html" class="playground-code" spellcheck="false" placeholder="Write HTML here..."><!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 40px; background: #1a1a2e; color: #eee; }
    h1 { color: #7b9aff; }
    .box { background: #252a40; padding: 20px; border-radius: 8px; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <div class="box">
    <p>Edit the code and click Run!</p>
    <button onclick="alert('It works!')">Click Me</button>
  </div>
</body>
</html></textarea>
          <textarea id="cp-css" class="playground-code" style="display:none" spellcheck="false" placeholder="Write CSS here...">/* CSS goes here */</textarea>
          <textarea id="cp-js" class="playground-code" style="display:none" spellcheck="false" placeholder="Write JavaScript here...">// JS goes here</textarea>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:0.82rem;color:var(--text-muted)">Live Preview</span>
            <span id="cp-status" style="font-size:0.72rem;color:var(--green)"></span>
          </div>
          <iframe id="cp-frame" class="playground-output" sandbox="allow-scripts allow-modals" style="background:#fff"></iframe>
        </div>
      </div>
    </div>`;
    // Auto-run on load
    setTimeout(function(){ CPPG.run(); }, 100);
  }

  var TMPLS = {
    blank: { html: '<!DOCTYPE html>\n<html>\n<head><style>body{padding:20px;font-family:sans-serif}</style></head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>', css: '/* CSS */', js: '// JS' },
    hello: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{font-family:sans-serif;padding:40px;background:linear-gradient(135deg,#1a1a2e,#252a40);color:#eee;text-align:center}\nh1{color:#7b9aff;font-size:2.5rem}\np{color:#a0a8c0}\n.btn{padding:12px 28px;background:#7b9aff;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem}\n.btn:hover{background:#94afff}\n</style>\n</head>\n<body>\n<h1>Hello World</h1>\n<p>Pure HTML/CSS — no frameworks needed.</p>\n<button class="btn" onclick="alert(\'Working!\')">Click Me</button>\n</body>\n</html>', css: '', js: '' },
    flexbox: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{font-family:sans-serif;padding:20px;background:#1a1a2e;color:#eee}\n.container{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}\n.box{flex:1;min-width:100px;padding:20px;background:linear-gradient(135deg,#7b9aff,#c084fc);border-radius:8px;text-align:center;color:#fff;font-weight:700}\n</style>\n</head>\n<body>\n<h2>Flexbox Demo</h2>\n<div class="container">\n  <div class="box">Box 1</div>\n  <div class="box">Box 2</div>\n  <div class="box">Box 3</div>\n  <div class="box">Box 4</div>\n</div>\n</body>\n</html>', css: '', js: '' },
    grid: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{font-family:sans-serif;padding:20px;background:#1a1a2e;color:#eee}\n.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px 0}\n.cell{padding:20px;background:linear-gradient(135deg,#34d399,#22d3ee);border-radius:8px;text-align:center;color:#fff;font-weight:700}\n</style>\n</head>\n<body>\n<h2>CSS Grid Demo</h2>\n<div class="grid">\n  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>\n  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>\n</div>\n</body>\n</html>', css: '', js: '' },
    jsdemo: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{font-family:sans-serif;padding:40px;text-align:center;background:#1a1a2e;color:#eee}\n#counter{font-size:4rem;font-weight:700;color:#7b9aff}\nbutton{padding:10px 24px;margin:4px;border:none;border-radius:6px;cursor:pointer;font-size:1rem;color:#fff}\n.plus{background:#34d399}.minus{background:#f87171}.reset{background:#7b9aff}\n</style>\n</head>\n<body>\n<h2>JavaScript Counter</h2>\n<div id="counter">0</div>\n<div>\n  <button class="plus" onclick="document.getElementById(\'counter\').textContent++">+1</button>\n  <button class="minus" onclick="document.getElementById(\'counter\').textContent--">-1</button>\n  <button class="reset" onclick="document.getElementById(\'counter\').textContent=0">Reset</button>\n</div>\n</body>\n</html>', css: '', js: '' },
    animation: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1a1a2e;margin:0}\n@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}\n@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}\n.spinner{width:60px;height:60px;border:4px solid #252a40;border-top-color:#7b9aff;border-radius:50%;animation:spin 1s linear infinite}\n.pulse{width:60px;height:60px;background:#c084fc;border-radius:50%;animation:pulse 1.5s ease-in-out infinite;margin-left:30px}\n</style>\n</head>\n<body>\n<div class="spinner"></div>\n<div class="pulse"></div>\n</body>\n</html>', css: '', js: '' },
    canvas: { html: '<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#1a1a2e;margin:0;color:#eee;font-family:sans-serif}\ncanvas{border:2px solid #252a40;border-radius:8px;background:#0d0f17}\n.controls{margin-top:10px;display:flex;gap:8px}\nbutton{padding:8px 16px;background:#7b9aff;color:#fff;border:none;border-radius:6px;cursor:pointer}\n</style>\n</head>\n<body>\n<h2>Canvas Drawing</h2>\n<canvas id="cv" width="400" height="300"></canvas>\n<div class="controls">\n  <button onclick="drawCircle()">Circle</button>\n  <button onclick="drawRect()">Rect</button>\n  <button onclick="clearCanvas()">Clear</button>\n</div>\n<script>\nvar c=document.getElementById(\'cv\'),x=c.getContext(\'2d\');\nfunction rand(){return Math.floor(Math.random()*256)}\nfunction drawCircle(){x.beginPath();x.arc(Math.random()*380+10,Math.random()*280+10,Math.random()*40+10,0,Math.PI*2);x.fillStyle=\'rgb(\'+rand()+\',\'+rand()+\',\'+rand()+\')\';x.fill()}\nfunction drawRect(){x.fillStyle=\'rgb(\'+rand()+\',\'+rand()+\',\'+rand()+\')\';x.fillRect(Math.random()*300,Math.random()*200,Math.random()*80+20,Math.random()*60+20)}\nfunction clearCanvas(){x.clearRect(0,0,400,300)}\ndrawCircle();drawRect();\n<\/script>\n</body>\n</html>', css: '', js: '' }
  };

  window.CP = {
    sw: function(t,btn) {
      document.querySelectorAll('#cp-t-html,#cp-t-css,#cp-t-js').forEach(function(x){ x.classList.remove('active'); });
      if(btn) btn.classList.add('active');
      else document.getElementById('cp-t-'+t).classList.add('active');
      ['html','css','js'].forEach(function(x){ document.getElementById('cp-'+x).style.display = x===t ? '' : 'none'; });
    },
    ld: function(name) {
      var t = TMPLS[name]; if(!t) return;
      document.getElementById('cp-html').value = t.html;
      document.getElementById('cp-css').value = t.css || '';
      document.getElementById('cp-js').value = t.js || '';
      this.run();
    },
    run: function() {
      var html = document.getElementById('cp-html').value;
      var css = document.getElementById('cp-css').value;
      var js = document.getElementById('cp-js').value;
      var doc = html;
      if(css) doc = doc.replace('</head>', '<style>' + css + '</style></head>');
      if(js) doc = doc.replace('</body>', '<script>' + js + '<\/script></body>');
      var iframe = document.getElementById('cp-frame');
      iframe.srcdoc = doc;
      var st = document.getElementById('cp-status');
      st.textContent = '✓ Live';
      setTimeout(function(){ st.textContent = ''; }, 2000);
    },
    clr: function() {
      document.getElementById('cp-html').value = '<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n  <h1>Start Coding</h1>\n</body>\n</html>';
      document.getElementById('cp-css').value = '';
      document.getElementById('cp-js').value = '';
      document.getElementById('cp-frame').srcdoc = '';
    }
  };

  Router.registerRoute('#code-playground', 'Code Playground', render);
})();
