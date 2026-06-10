(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">👁️</span>Color Blindness Simulator</div>
    <div class="form-group"><label>Color</label><input type="color" id="cb-col" value="#ff0000" oninput="CB.sim()"></div>
    <div class="form-group"><label>Type</label><select id="cb-type" onchange="CB.sim()"><option value="protanopia">Protanopia (no red)</option><option value="deuteranopia">Deuteranopia (no green)</option><option value="tritanopia">Tritanopia (no blue)</option><option value="achromatopsia">Achromatopsia (no color)</option></select></div>
    <div id="cb-result" style="display:flex;gap:12px;margin-top:12px"></div></div>`;
  }
  function hexToRgb(h){return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
  function simulate(r,g,b,type){
    let nr,ng,nb;
    if(type==='protanopia'){nr=0.567*r+0.433*g;ng=0.558*r+0.442*g;nb=0.242*g+0.758*b;}
    else if(type==='deuteranopia'){nr=0.625*r+0.375*g;ng=0.7*r+0.3*g;nb=0.3*g+0.7*b;}
    else if(type==='tritanopia'){nr=0.95*r+0.05*g;ng=0.433*g+0.567*b;nb=0.475*g+0.525*b;}
    else{let avg=0.299*r+0.587*g+0.114*b;nr=ng=nb=avg;}
    return[Math.round(Math.min(255,Math.max(0,nr))),Math.round(Math.min(255,Math.max(0,ng))),Math.round(Math.min(255,Math.max(0,nb)))];}
  window.CB={
    sim(){
      let hex=document.getElementById('cb-col').value,type=document.getElementById('cb-type').value;
      let[r,g,b]=hexToRgb(hex);let[nr,ng,nb]=simulate(r,g,b,type);
      let orig=`rgb(${r},${g},${b})`,sim=`rgb(${nr},${ng},${nb})`;
      document.getElementById('cb-result').innerHTML=`<div style="flex:1;text-align:center"><div style="height:80px;border-radius:8px;background:${orig}"></div><div style="font-size:0.72rem;margin-top:4px">Normal</div><div style="font-family:monospace;font-size:0.7rem">${hex}</div></div><div style="flex:1;text-align:center"><div style="height:80px;border-radius:8px;background:${sim}"></div><div style="font-size:0.72rem;margin-top:4px">Simulated</div><div style="font-family:monospace;font-size:0.7rem">rgb(${nr},${ng},${nb})</div></div>`;
    }
  };
  Router.registerRoute('#color-blind','Color Blindness',render);
})();