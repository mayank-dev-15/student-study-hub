(function(){
  const GOAL=8;
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">💧</span>Water Tracker</div>
    <div style="font-size:3.5rem;margin:8px">💧</div>
    <div style="font-size:2.5rem;font-weight:700;color:var(--cyan)" id="wt-c">0</div>
    <div style="color:var(--text-muted);font-size:0.85rem">out of <span id="wt-goal">${GOAL}</span> glasses</div>
    <div class="progress-bar" style="max-width:400px;margin:16px auto"><div class="fill" id="wt-p" style="width:0%;background:linear-gradient(90deg,#22d3ee,#3b82f6)"></div></div>
    <div style="display:flex;justify-content:center;gap:12px"><button class="btn btn-primary" onclick="WT.add(1)">+1</button><button class="btn btn-secondary" onclick="WT.add(0.5)">+½</button><button class="btn btn-danger btn-sm" onclick="WT.rem()">-1</button></div>
    <div style="margin-top:12px"><button class="btn btn-secondary btn-sm" onclick="WT.reset()">Reset</button></div></div>`;
    WT.load();
  }
  window.WT={
    count:Store.get('water_today',0),date:Store.get('water_date',''),
    load(){const today=new Date().toDateString();if(this.date!==today){this.count=0;this.date=today;Store.set('water_date',today);Store.set('water_today',0);}this.upd();},
    add(n){this.count=Math.round((this.count+n)*10)/10;Store.set('water_today',this.count);this.upd();if(this.count>=GOAL)Toast.success('🎉 Goal reached!');},
    rem(){this.count=Math.max(0,Math.round((this.count-1)*10)/10);Store.set('water_today',this.count);this.upd();},
    reset(){this.count=0;Store.set('water_today',0);this.upd();},
    upd(){document.getElementById('wt-c').textContent=this.count;document.getElementById('wt-p').style.width=Math.min(100,(this.count/GOAL)*100)+'%';}
  };
  Router.registerRoute('#water-tracker','Water Tracker',render);
})();