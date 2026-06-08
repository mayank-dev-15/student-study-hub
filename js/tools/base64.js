(function(){
  function render(c){c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔐</span>Base64 Encoder/Decoder</div>
    <div class="form-group"><label>Input</label><textarea id="b64-in" rows="4" placeholder="Text or Base64..."></textarea></div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="B64.enc()">Encode</button><button class="btn btn-secondary btn-sm" onclick="B64.dec()">Decode</button><button class="btn btn-secondary btn-sm" onclick="B64.copy()">Copy</button></div>
    <textarea id="b64-out" rows="4" readonly></textarea></div>`;}
  window.B64={enc(){try{document.getElementById('b64-out').value=btoa(unescape(encodeURIComponent(document.getElementById('b64-in').value)));}catch(e){document.getElementById('b64-out').value='Error: '+e.message;}},dec(){try{document.getElementById('b64-out').value=decodeURIComponent(escape(atob(document.getElementById('b64-in').value.trim())));}catch(e){document.getElementById('b64-out').value='Error: Invalid base64';}},copy(){navigator.clipboard.writeText(document.getElementById('b64-out').value).then(()=>Toast.success('Copied!'));}};
  Router.registerRoute('#base64','Base64 Encoder',render);
})();