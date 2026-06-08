(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌈</span>CSS Gradient Generator</div>
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap"><input type="color" id="cg-c1" value="#667eea" style="width:50px;height:36px;border:none;cursor:pointer;background:none"><input type="color" id="cg-c2" value="#764ba2" style="width:50px;height:36px;border:none;cursor:pointer;background:none"><select id="cg-type" onchange="CG.preview()"><option value="linear">Linear</option><option value="radial">Radial</option></select><input type="number" id="cg-angle" value="135" min="0" max="360" style="width:60px" oninput="CG.preview()"><span style="font-size:0.78rem;color:var(--text-muted)">deg</span></div>
    <div id="cg-preview" style="height:150px;border-radius:12px;margin-bottom:12px"></div>
    <textarea id="cg-css" rows="3" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('cg-css').value);Toast.success('Copied!')">Copy CSS</button></div>`;
    CG.preview();
  }
  window.CG={
    preview(){const c1=document.getElementById('cg-c1').value,c2=document.getElementById('cg-c2').value,t=document.getElementById('cg-type').value,a=document.getElementById('cg-angle').value;
      const css=t==='linear'?`linear-gradient(${a}deg, ${c1}, ${c2})`:`radial-gradient(circle, ${c1}, ${c2})`;
      document.getElementById('cg-preview').style.background=css;
      document.getElementById('cg-css').value=`background: ${css};
border-radius: 12px;
height: 150px;`;
    }
  };
  Router.registerRoute('#css-gradient','CSS Gradient Generator',render);
})();