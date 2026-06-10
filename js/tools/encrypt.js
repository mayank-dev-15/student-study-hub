(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔒</span>Text Encrypt / Decrypt</div>
    <div class="form-group"><label>Text</label><textarea id="enc-in" rows="4" placeholder="Enter text..."></textarea></div>
    <div class="form-group"><label>Password</label><input type="password" id="enc-pass" placeholder="Enter password..."></div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="ENC.enc()">🔒 Encrypt</button><button class="btn btn-secondary btn-sm" onclick="ENC.dec()">🔓 Decrypt</button></div>
    <textarea id="enc-out" rows="4" readonly placeholder="Output..."></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('enc-out').value);Toast.success('Copied!')">Copy</button></div>`;
  }
  window.ENC={
    enc(){let t=document.getElementById('enc-in').value,p=document.getElementById('enc-pass').value;if(!t||!p){Toast.error('Enter text and password');return;}let r='';for(let i=0;i<t.length;i++)r+=String.fromCharCode(t.charCodeAt(i)^p.charCodeAt(i%p.length));document.getElementById('enc-out').value=btoa(r);},
    dec(){let t=document.getElementById('enc-in').value,p=document.getElementById('enc-pass').value;if(!t||!p){Toast.error('Enter text and password');return;}try{let d=atob(t),r='';for(let i=0;i<d.length;i++)r+=String.fromCharCode(d.charCodeAt(i)^p.charCodeAt(i%p.length));document.getElementById('enc-out').value=r;}catch(e){Toast.error('Invalid encrypted text');}}
  };
  Router.registerRoute('#encrypt','Encrypt/Decrypt',render);
})();