// World Clock — fixed with Router.registerRoute
(function(){
  const zones={UTC:0,EST:-5,CST:-6,MST:-7,PST:-8,IST:5.5,CET:1,JST:9,AEST:10,NZST:12,CST_CN:8};
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌍</span>World Clock</div>
    <div class="grid grid-3" id="wc-grid"></div></div>`;
    WCL.tick();
    if(!WCL.iv)WCL.iv=setInterval(()=>WCL.tick(),1000);
  }
  window.WCL={
    iv:null,
    tick(){
      let h='';
      Object.entries(zones).forEach(([name,off])=>{
        const d=new Date();
        const utcMs=d.getTime()+d.getTimezoneOffset()*60000;
        const zd=new Date(utcMs+off*3600000);
        const hh=String(zd.getHours()).padStart(2,'0');
        const mm=String(zd.getMinutes()).padStart(2,'0');
        const ss=String(zd.getSeconds()).padStart(2,'0');
        const day=zd.toLocaleDateString('en',{weekday:'short'});
        h+=`<div class="stat-box" style="padding:10px"><div class="stat-value" style="font-size:1.1rem;color:var(--accent)">${hh}:${mm}:${ss}</div><div class="stat-label">${name}</div><div style="font-size:0.65rem;color:var(--text-muted)">${day}</div></div>`;
      });
      const el=document.getElementById('wc-grid');
      if(el)el.innerHTML=h;
    }
  };
  Router.registerRoute('#world-clock','World Clock',render);
})();
