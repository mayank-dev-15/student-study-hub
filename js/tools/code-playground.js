(function(){
  function render(c){c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">💻</span>Code Playground</div>
    <div class="tabs"><button class="tab active" onclick="CP.tab('html',this)">HTML</button><button class="tab" onclick="CP.tab('css',this)">CSS</button><button class="tab" onclick="CP.tab('js',this)">JS</button></div>
    <div class="playground-container"><div><textarea id="cp-html" class="playground-code" spellcheck="false">&lt;!DOCTYPE html&gt;
&lt;html&gt;&lt;body&gt;
&lt;h1 style="color:#7b9aff"&gt;Hello&lt;/h1&gt;
&lt;button onclick="alert('Hi!')"&gt;Click&lt;/button&gt;
&lt;/body&gt;&lt;/html&gt;</textarea><textarea id="cp-css" class="playground-code" style="display:none">body{padding:20px}</textarea><textarea id="cp-js" class="playground-code" style="display:none">console.log('Ready');</textarea></div>
    <div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:0.82rem;color:var(--text-muted)">Output</span><button class="btn btn-primary btn-sm" onclick="CP.run()">▶ Run</button></div><iframe id="cp-output" class="playground-output" sandbox="allow-scripts"></iframe></div></div></div>`;}
  window.CP={tab(t,btn){document.querySelectorAll('.playground-container .tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');['html','css','js'].forEach(x=>document.getElementById('cp-'+x).style.display=x===t?'':'none');},run(){const h=document.getElementById('cp-html').value,s=document.getElementById('cp-css').value,j=document.getElementById('cp-js').value;document.getElementById('cp-output').srcdoc=h.replace('</head>',`<style>${s}</style></head>`).replace('</body>',`<script>${j}<\/script></body>`);}};
  Router.registerRoute('#code-playground','Code Playground',render);
})();