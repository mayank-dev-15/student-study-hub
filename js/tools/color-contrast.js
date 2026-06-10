(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎨</span>Color Contrast Checker (WCAG)</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Foreground</label><input type="color" id="cc-fg" value="#ffffff" style="width:50px;height:36px;border:none;cursor:pointer;background:none" oninput="CC.check()"></div><div class="form-group" style="margin-bottom:0"><label>Background</label><input type="color" id="cc-bg" value="#1a1f30" style="width:50px;height:36px;border:none;cursor:pointer;background:none" oninput="CC.check()"></div></div>
    <div id="cc-preview" style="padding:20px;border-radius:8px;margin:12px 0;text-align:center;font-size:1.2rem">The quick brown fox</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="cc-ratio">0:1</div><div class="stat-label">Ratio</div></div><div class="stat-box"><div class="stat-value" id="cc-aa">-</div><div class="stat-label">AA Normal</div></div><div class="stat-box"><div class="stat-value" id="cc-aaa">-</div><div class="stat-label">AAA Normal</div></div><div class="stat-box"><div class="stat-value" id="cc-aal">-</div><div class="stat-label">AA Large</div></div></div></div>`;
    CC.check();
  }
  function hexRgb(h){return[parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255];}
  function lum(c){return c.map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));}
  function relLum(rgb){return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];}
  window.CC={
    check(){let fg=document.getElementById('cc-fg').value,bg=document.getElementById('cc-bg').value;let l1=relLum(lum(hexRgb(fg))),l2=relLum(lum(hexRgb(bg))),ratio=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);document.getElementById('cc-preview').style.background=bg;document.getElementById('cc-preview').style.color=fg;document.getElementById('cc-ratio').textContent=ratio.toFixed(2)+':1';let pass=ratio>=4.5?'<span class="badge badge-green">✓ Pass</span>':'<span class="badge badge-red">✗ Fail</span>';document.getElementById('cc-aa').innerHTML=pass;document.getElementById('cc-aaa').innerHTML=ratio>=7?pass:'<span class="badge badge-red">✗ Fail</span>';document.getElementById('cc-aal').innerHTML=ratio>=3?pass:'<span class="badge badge-red">✗ Fail</span>';}
  };
  Router.registerRoute('#color-contrast','Color Contrast',render);
})();