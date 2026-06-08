(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔐</span>JWT Decoder</div>
    <div class="form-group"><label>JWT Token</label><textarea id="jwt-in" rows="4" placeholder="Paste JWT token..." oninput="JWT.decode()"></textarea></div>
    <div id="jwt-out" style="display:none">
      <div style="margin-bottom:8px"><strong style="color:var(--accent)">Header</strong><pre id="jwt-header" style="background:var(--bg-tertiary);padding:12px;border-radius:8px;font-size:0.82rem;overflow-x:auto;margin-top:4px"></pre></div>
      <div><strong style="color:var(--green)">Payload</strong><pre id="jwt-payload" style="background:var(--bg-tertiary);padding:12px;border-radius:8px;font-size:0.82rem;overflow-x:auto;margin-top:4px"></pre></div>
    </div></div>`;
  }
  window.JWT={
    decode(){const t=document.getElementById('jwt-in').value.trim();const out=document.getElementById('jwt-out');if(!t){out.style.display='none';return;}try{const parts=t.split('.');if(parts.length!==3){Toast.error('Invalid JWT format');return;}const h=JSON.parse(atob(parts[0].replace(/-/g,'+').replace(/_/g,'/')));const p=JSON.parse(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/')));document.getElementById('jwt-header').textContent=JSON.stringify(h,null,2);document.getElementById('jwt-payload').textContent=JSON.stringify(p,null,2);out.style.display='';}catch(e){Toast.error('Failed to decode: '+e.message);}}
  };
  Router.registerRoute('#jwt-decoder','JWT Decoder',render);
})();