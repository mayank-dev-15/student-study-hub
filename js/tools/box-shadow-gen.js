(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📦</span>CSS Box Shadow Generator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>X offset</label><input type="number" id="bs-x" value="4" oninput="BS.preview()"></div><div class="form-group" style="margin-bottom:0"><label>Y offset</label><input type="number" id="bs-y" value="4" oninput="BS.preview()"></div><div class="form-group" style="margin-bottom:0"><label>Blur</label><input type="number" id="bs-blur" value="12" oninput="BS.preview()"></div><div class="form-group" style="margin-bottom:0"><label>Spread</label><input type="number" id="bs-spread" value="0" oninput="BS.preview()"></div></div>
    <div class="form-group"><label>Color</label><input type="color" id="bs-color" value="#7b9aff" oninput="BS.preview()"></div>
    <div id="bs-preview" style="height:120px;display:flex;align-items:center;justify-content:center;margin:16px 0"><div id="bs-box" style="width:100px;height:60px;background:var(--bg-card);border-radius:8px"></div></div>
    <textarea id="bs-css" rows="3" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('bs-css').value);Toast.success('Copied!')">Copy CSS</button></div>`;
    BS.preview();
  }
  window.BS={
    preview(){
      let x=document.getElementById('bs-x').value,y=document.getElementById('bs-y').value,blur=document.getElementById('bs-blur').value,spread=document.getElementById('bs-spread').value,col=document.getElementById('bs-color').value;
      let shadow=x+'px '+y+'px '+blur+'px '+spread+'px '+col;
      document.getElementById('bs-box').style.boxShadow=shadow;
      document.getElementById('bs-css').value='box-shadow: '+shadow+';
border-radius: 8px;';
    }
  };
  Router.registerRoute('#box-shadow-gen','Box Shadow',render);
})();