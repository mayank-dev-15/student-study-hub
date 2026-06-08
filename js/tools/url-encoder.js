(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔗</span>URL Encoder / Decoder</div>
    <div class="form-group"><label>Input</label><textarea id="ue-in" rows="4" placeholder="https://example.com/path?q=hello world"></textarea></div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="UE.enc()">Encode</button><button class="btn btn-secondary btn-sm" onclick="UE.dec()">Decode</button><button class="btn btn-secondary btn-sm" onclick="UE.encComp()">Encode Component</button><button class="btn btn-secondary btn-sm" onclick="UE.parse()">Parse URL</button></div>
    <textarea id="ue-out" rows="4" readonly></textarea>
    <div id="ue-parts" style="margin-top:8px;font-size:0.78rem"></div></div>`;
  }
  window.UE={
    enc(){document.getElementById('ue-out').value=encodeURI(document.getElementById('ue-in').value);document.getElementById('ue-parts').innerHTML='';},
    dec(){document.getElementById('ue-out').value=decodeURI(document.getElementById('ue-in').value);document.getElementById('ue-parts').innerHTML='';},
    encComp(){document.getElementById('ue-out').value=encodeURIComponent(document.getElementById('ue-in').value);document.getElementById('ue-parts').innerHTML='';},
    parse(){try{const u=new URL(document.getElementById('ue-in').value);document.getElementById('ue-parts').innerHTML=`<div style="background:var(--bg-tertiary);padding:12px;border-radius:8px"><div>Protocol: <strong>${esc(u.protocol)}</strong></div><div>Host: <strong>${esc(u.host)}</strong></div><div>Path: <strong>${esc(u.pathname)}</strong></div><div>Query: <strong>${esc(u.search)}</strong></div><div>Hash: <strong>${esc(u.hash)}</strong></div></div>`;document.getElementById('ue-out').value=u.toString();}catch(e){Toast.error('Invalid URL');}}
  };
  Router.registerRoute('#url-encoder','URL Encoder',render);
})();