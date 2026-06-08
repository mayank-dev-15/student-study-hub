(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">😴</span>Sleep Calculator</div>
    <div class="form-group"><label>Wake up at</label><input type="time" id="sl-wake" value="07:00" onchange="Sleep.calc()"></div>
    <div id="sl-res" style="margin-top:16px"></div></div>`;
    Sleep.calc();
  }
  window.Sleep={
    calc(){
      const v=document.getElementById('sl-wake').value,[h,m]=v.split(':').map(Number),wm=h*60+m,cm=90,fa=15;
      let html='<div class="grid grid-2">';
      [5,4,6,3].forEach(cycles=>{
        const bm=wm-(cycles*cm+fa),adj=((bm%1440)+1440)%1440,bh=Math.floor(adj/60),bm2=adj%60;
        const t=String(bh).padStart(2,'0')+':'+String(bh).padStart(2,'0');
        const hrs=(cycles*cm/60).toFixed(1),rec=cycles>=5?'badge-green':cycles>=4?'badge-yellow':'badge-red';
        html+=`<div class="tool-card"><div class="tool-icon">😴</div><div class="tool-info"><h3>${String(bh).padStart(2,'0')}:${String(bm2).padStart(2,'0')}</h3><p>${cycles} cycles • ${cycles>=5?'Recommended':cycles>=4?'OK':'Minimal'}</p></div></div>`;
      });
      html+='</div>';document.getElementById('sl-res').innerHTML=html;
    }
  };
  Router.registerRoute('#sleep-calc','Sleep Calculator',render);
})();