(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎮</span>Interval Timer</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Work (sec)</label><input type="number" id="it-work" value="30"></div><div class="form-group" style="margin-bottom:0"><label>Rest (sec)</label><input type="number" id="it-rest" value="10"></div><div class="form-group" style="margin-bottom:0"><label>Rounds</label><input type="number" id="it-rounds" value="8" min="1"></div></div>
    <div id="it-display" class="timer-display">00:30</div>
    <div id="it-status" style="text-align:center;font-size:1.1rem;font-weight:600;color:var(--accent);margin-bottom:8px">Ready</div>
    <div class="timer-controls"><button class="btn btn-primary" onclick="IT.toggle()" id="it-btn">▶ Start</button><button class="btn btn-secondary" onclick="IT.reset()">↺ Reset</button></div>
    <div style="text-align:center;margin-top:8px;font-size:0.78rem;color:var(--text-muted)">Round <span id="it-round">0</span> of <span id="it-total">0</span></div></div>`;
  }
  window.IT={time:0,running:false,interval:null,round:0,total:0,mode:'work',
    toggle(){if(this.running){clearInterval(this.interval);this.running=false;document.getElementById('it-btn').textContent='▶ Resume';}else{const work=parseInt(document.getElementById('it-work').value)||30,rest=parseInt(document.getElementById('it-rest').value)||10;this.total=parseInt(document.getElementById('it-rounds').value)||8;document.getElementById('it-total').textContent=this.total;
      if(!this.round){this.round=1;this.mode='work';this.time=work;this.updateStatus('Work','var(--red)');}else if(this.mode==='work'){this.mode='rest';this.time=rest;this.updateStatus('Rest','var(--green)');}else{this.mode='work';this.time=work;this.round++;if(this.round>this.total){this.reset();Toast.success('Workout complete!');return;}this.updateStatus('Work','var(--red)');}document.getElementById('it-round').textContent=this.round;
      this.running=true;document.getElementById('it-btn').textContent='⏸ Pause';this.interval=setInterval(()=>{this.time--;this.display();if(this.time<=0){clearInterval(this.interval);this.running=false;document.getElementById('it-btn').textContent='▶ Next';Toast.success(this.mode==='work'?'Time to rest!':'Ready for next round!');this.display();}},1000);}this.display();},
    reset(){clearInterval(this.interval);this.running=false;this.round=0;this.total=0;document.getElementById('it-btn').textContent='▶ Start';document.getElementById('it-display').textContent='00:30';document.getElementById('it-status').textContent='Ready';document.getElementById('it-round').textContent='0';document.getElementById('it-total').textContent='0';},
    display(){const m=Math.floor(this.time/60),s=this.time%60;document.getElementById('it-display').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');},
    updateStatus(t,col){const el=document.getElementById('it-status');el.textContent=t;el.style.color=col;}};
  Router.registerRoute('#interval-timer','Interval Timer',render);
})();