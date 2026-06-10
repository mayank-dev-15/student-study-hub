(function(){
  function hex2rgb(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
  function lum(c){return c.map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});}
  function contrast(c1,c2){var l1=lum(hex2rgb(c1)),l2=lum(hex2rgb(c2));var r1=0.2126*l1[0]+0.7152*l1[1]+0.0722*l1[2],r2=0.2126*l2[0]+0.7152*l2[1]+0.0722*l2[2];return(Math.max(r1,r2)+0.05)/(Math.min(r1,r2)+0.05);}
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎨</span>Contrast Grid Generator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Background</label><input type="color" id="cg-bg" value="#1a1a2e" style="width:50px;height:36px;border:none;cursor:pointer;background:none" oninput="CG2.gen()"></div>
    <div class="form-group" style="margin-bottom:0"><label>Text Colors (comma separated)</label><input type="text" id="cg-colors" value="#ffffff,#7b9aff,#34d399,#fbbf24,#f87171,#c084fc,#22d3ee" style="flex:1;font-family:monospace;font-size:0.82rem" oninput="CG2.gen()"></div></div>
    <div id="cg-grid" style="margin-top:12px"></div></div>`;
    CG2.gen();
  }
  window.CG2={
    gen(){
      var bg=document.getElementById('cg-bg').value;var colors=document.getElementById('cg-colors').value.split(',').map(function(c){return c.trim();});
      var html='';colors.forEach(function(cl){var ratio=contrast(bg,cl);var aa=ratio>=4.5?'✓':'✗';var aaa=ratio>=7?'✓':'✗';var large=ratio>=3?'✓':'✗';
        html+=`<div style="display:flex;align-items:center;gap:12px;padding:10px;background:${bg};border-radius:8px;margin-bottom:6px"><div style="width:40px;height:40px;border-radius:8px;background:${cl};border:2px solid rgba(255,255,255,0.2)"></div><div style="flex:1"><div style="color:${cl};font-weight:700;font-size:1.1rem">Sample Text</div><div style="color:${cl};font-size:0.85rem;opacity:0.7">The quick brown fox</div></div><div style="text-align:right;font-size:0.75rem"><div>Ratio: <strong>${ratio.toFixed(2)}:1</strong></div><div>AA Normal: <span style="color:${aa==='✓'?'var(--green)':'var(--red)'}">${aa}</span></div><div>AAA Normal: <span style="color:${aaa==='✓'?'var(--green)':'var(--red)'}">${aaa}</span></div><div>AA Large: <span style="color:${large==='✓'?'var(--green)':'var(--red)'}">${large}</span></div></div></div>`;
      });
      document.getElementById('cg-grid').innerHTML=html;
    }
  };
  Router.registerRoute('#contrast-grid','Contrast Grid',render);
})();