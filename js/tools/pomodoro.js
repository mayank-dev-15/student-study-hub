(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">🍅</span>Pomodoro Timer</div>
    <div class="timer-mode"><button class="timer-mode-btn active" id="pm-w" onclick="Pomo.set('work')">Work 25m</button><button class="timer-mode-btn" id="pm-s" onclick="Pomo.set('short')">Short 5m</button><button class="timer-mode-btn" id="pm-l" onclick="Pomo.set('long')">Long 15m</button></div>
    <div class="timer-display" id="pomo-t">25:00</div>
    <div class="progress-bar" style="max-width:400px;margin:0 auto 16px"><div class="fill" id="pomo-p" style="width:100%"></div></div>
    <div class="timer-controls"><button class="btn btn-primary" id="pomo-b" onclick="Pomo.toggle()">▶ Start</button><button class="btn btn-secondary" onclick="Pomo.reset()">↺ Reset</button></div>
    <div style="margin-top:12px;color:var(--text-muted);font-size:0.82rem">Sessions: <strong id="pomo-s" style="color:var(--accent)">0</strong> | Today: <strong id="pomo-td" style="color:var(--green)">0</strong></div></div>`;
    Pomo.load();
  }
  window.Pomo={
    mode:'work',time:1500,total:1500,running:false,iv:null,sessions:Store.get('pomo_sessions',0),today:Store.get('pomo_today',0),todayDate:Store.get('pomo_today_date',''),
    set(m){this.mode=m;this.running=false;clearInterval(this.iv);document.getElementById('pomo-b').textContent='▶ Start';const t={work:1500,short:300,long:900};this.time=t[m];this.total=t[m];document.querySelectorAll('.timer-mode-btn').forEach(b=>b.classList.remove('active'));document.getElementById('pm-'+(m==='work'?'w':m[0])).classList.add('active');this.upd();},
    toggle(){if(this.running){clearInterval(this.iv);this.running=false;document.getElementById('pomo-b').textContent='▶ Resume';}else{this.running=true;document.getElementById('pomo-b').textContent='⏸ Pause';this.iv=setInterval(()=>this.tick(),1000);}},
    tick(){this.time--;if(this.time<=0){clearInterval(this.iv);this.running=false;this.sessions++;this.today++;Store.set('pomo_sessions',this.sessions);Store.set('pomo_today',this.today);Store.set('pomo_today_date',new Date().toDateString());document.getElementById('pomo-s').textContent=this.sessions;document.getElementById('pomo-td').textContent=this.today;document.getElementById('pomo-b').textContent='▶ Start';Toast.success('🍅 Complete!');this.set(this.mode==='work'?'short':'work');return;}this.upd();},
    reset(){clearInterval(this.iv);this.running=false;document.getElementById('pomo-b').textContent='▶ Start';this.time=this.total;this.upd();},
    upd(){const m=Math.floor(this.time/60),s=this.time%60;document.getElementById('pomo-t').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');document.getElementById('pomo-p').style.width=(this.time/this.total*100)+'%';},
    load(){const today=new Date().toDateString();if(this.todayDate!==today){this.today=0;this.todayDate=today;Store.set('pomo_today',0);Store.set('pomo_today_date',today);}document.getElementById('pomo-s').textContent=this.sessions;document.getElementById('pomo-td').textContent=this.today;}
  };
  Router.registerRoute('#pomodoro','Pomodoro Timer',render);
})();