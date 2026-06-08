(function(){
  const zones={UTC:0,EST:-5,CST:-6,MST:-7,PST:-8,IST:5.5,CET:1,JST:9,AEST:10};
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌍</span>World Clock</div>
    <div class="grid grid-3" id="wc-grid"></div></div>`;
    WC.tick();setInterval(()=>WC.tick(),1000);
  }
  window.WC={
    tick(){let h='';
      Object.entries(zones).forEach(([name,off])=>{const d=new Date();d.setHours(d.getUTCHours()+off);
        const hh=String(d.getUTCHours()).padStart(2,'0'),mm=String(d.getUTCMinutes()).padStart(2,'0'),ss=String(d.getUTCSeconds()).padStart(2,'0');
        h+=`<div class="stat-box"><div class="stat-value" style="font-size:1.1rem">${hh}:${mm}:${ss}</div><div class="stat-label">${name}</div></div>`;});document.getElementById('wc-grid').innerHTML=h;}}})();