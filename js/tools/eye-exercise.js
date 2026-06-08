(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">👁️</span>Eye Exercise (20-20-20)</div>
    <p style="color:var(--text-secondary);margin-bottom:16px">Every 20 min, look 20 feet away for 20 sec</p>
    <div style="font-size:3.5rem;margin:12px">👁️</div>
    <div class="timer-display" id="eye-t">00:20</div>
    <div class="timer-controls"><button class="btn btn-primary" id="eye-s" onclick="Eye.toggle()">▶ Start</button><button class="btn btn-secondary" onclick="Eye.reset()">↺ Reset</button></div>
    <div style="margin-top:12px;font-size:0.82rem;color:var(--text-muted)">Sessions: <strong id="eye-c" style="color:var(--accent)">0</strong></div></div>`;
    Eye.load();
  }
  window.Eye={
    time:20,running:false,interval:null,sessions:Store.get('eye_sessions',0),
    toggle(){if(this.running){clearInterval(this.interval);this.running=false;document.getElementById('eye-s').textContent='▶ Resume';}else{this.running=true;document.getElementById('eye-s').textContent='⏸ Pause';this.interval=setInterval(()=>this.tick(),1000);}},
    tick(){this.time--;if(this.time<=0){clearInterval(this.interval);this.running=false;this.sessions++;Store.set('eye_sessions',this.sessions);document.getElementById('eye-c').textContent=this.sessions;document.getElementById('eye-s').textContent='▶ Start';Toast.success('👁️ Eye break complete!');this.time=20;}this.upd();},
    reset(){clearInterval(this.interval);this.running=false;this.time=20;document.getElementById('eye-s').textContent='▶ Start';this.upd();},
    upd(){document.getElementById('eye-t').textContent='00:'+String(this.time).padStart(2,'0');},
    load(){document.getElementById('eye-c').textContent=this.sessions;}
  };
  Router.registerRoute('#eye-exercise','Eye Exercise',render);
})();