(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔢</span>Hex / Binary / ASCII Converter</div>
    <div class="form-group"><label>Text Input</label><input type="text" id="hx-in" placeholder="Type text..." oninput="HX.update()"></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="hx-len">0</div><div class="stat-label">Chars</div></div><div class="stat-box"><div class="stat-value" id="hx-bytes">0</div><div class="stat-label">Bytes</div></div></div>
    <div class="form-group"><label>HEX</label><input type="text" id="hx-hex" readonly style="font-family:monospace"></div>
    <div class="form-group"><label>Binary</label><input type="text" id="hx-bin" readonly style="font-family:monospace;font-size:0.82rem"></div>
    <div class="form-group"><label>Decimal</label><input type="text" id="hx-dec" readonly style="font-family:monospace"></div>
    <div class="form-group"><label>Base64</label><input type="text" id="hx-b64" readonly style="font-family:monospace"></div></div>`;
  }
  window.HX={
    update(){
      var t=document.getElementById('hx-in').value;
      var hex='',bin='',dec='',b64='';
      for(var i=0;i<t.length;i++){var c=t.charCodeAt(i);hex+=c.toString(16).toUpperCase().padStart(2,'0')+' ';bin+=c.toString(2).padStart(8,'0')+' ';dec+=c+' ';}
      try{b64=btoa(unescape(encodeURIComponent(t)));}catch(e){b64='Error';}
      document.getElementById('hx-hex').value=hex.trim();
      document.getElementById('hx-bin').value=bin.trim();
      document.getElementById('hx-dec').value=dec.trim();
      document.getElementById('hx-b64').value=b64;
      document.getElementById('hx-len').textContent=t.length;
      document.getElementById('hx-bytes').textContent=unescape(encodeURIComponent(t)).length;
    }
  };
  Router.registerRoute('#hex-viewer','Hex Viewer',render);
})();