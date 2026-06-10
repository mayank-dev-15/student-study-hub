(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">#️⃣</span>Hash Calculator</div>
    <div class="form-group"><label>Input Text</label><textarea id="hash-in" rows="4" placeholder="Enter text to hash..." oninput="HASH.calc()"></textarea></div>
    <div id="hash-results" style="display:grid;gap:8px"></div></div>`;
    HASH.calc();
  }
  window.HASH={
    async calc(){
      let t=document.getElementById('hash-in').value;
      if(!t){document.getElementById('hash-results').innerHTML='';return;}
      let enc=new TextEncoder().encode(t);
      let algorithms=['SHA-1','SHA-256','SHA-384','SHA-512'];
      let html='';
      for(let algo of algorithms){
        try{
          let buf=await crypto.subtle.digest(algo,enc);
          let hash=Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
          html+=`<div style="background:var(--bg-tertiary);padding:10px;border-radius:8px"><div style="font-size:0.72rem;color:var(--text-muted)">${algo}</div><div style="font-family:monospace;font-size:0.82rem;word-break:break-all;color:var(--accent)">${hash}</div></div>`;
        }catch(e){}
      }
      // Simple hash
      let simple=0;for(let i=0;i<t.length;i++){simple=((simple<<5)-simple+t.charCodeAt(i))|0;}
      html+=`<div style="background:var(--bg-tertiary);padding:10px;border-radius:8px"><div style="font-size:0.72rem;color:var(--text-muted)">Simple Hash</div><div style="font-family:monospace;font-size:0.82rem;word-break:break-all;color:var(--yellow)">${Math.abs(simple).toString(16)}</div></div>`;
      document.getElementById('hash-results').innerHTML=html;
    }
  };
  Router.registerRoute('#hash-calc','Hash Calculator',render);
})();