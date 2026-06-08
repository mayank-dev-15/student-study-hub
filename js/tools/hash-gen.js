(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">#️⃣</span>Hash Generator</div>
    <div class="form-group"><label>Input</label><textarea id="hg-in" rows="4" placeholder="Enter text..."></textarea></div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="HG.sha256()">SHA-256</button><button class="btn btn-secondary btn-sm" onclick="HG.sha1()">SHA-1</button><button class="btn btn-secondary btn-sm" onclick="HG.md5()">MD5 (simple)</button></div>
    <div id="hg-out" style="font-family:monospace;font-size:0.82rem;background:var(--bg-tertiary);padding:14px;border-radius:8px;word-break:break-all"></div></div>`;
  }
  window.HG={
    async sha256(){const msg=new TextEncoder().encode(document.getElementById('hg-in').value);const hash=await crypto.subtle.digest('SHA-256',msg);document.getElementById('hg-out').textContent=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');},
    async sha1(){const msg=new TextEncoder().encode(document.getElementById('hg-in').value);const hash=await crypto.subtle.digest('SHA-1',msg);document.getElementById('hg-out').textContent=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');},
    md5(){const s=document.getElementById('hg-in').value;let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h+s.charCodeAt(i))|0;}document.getElementById('hg-out').textContent=Math.abs(h).toString(16).padStart(8,'0');}
  };
  Router.registerRoute('#hash-gen','Hash Generator',render);
})();