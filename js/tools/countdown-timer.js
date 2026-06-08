(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">⏰</span>Countdown Timer</div>
    <div class="form-row" style="justify-content:center;gap:8px;margin-bottom:16px"><input type="number" id="cd-min" value="5" min="1" style="width:60px;text-align:center"><span style="font-size:1.5rem">:</span><input type="number" id="cd-sec" value="0" min="0" max="59" style="width:60px;text-align:center"></div>
    <div class="timer-display" id="cd-time">05:00</div>
    <div class="timer-controls"><button class="btn btn-primary" onclick="CD.toggle()" id="cd-btn">▶ Start</button><button class="btn btn-secondary" onclick="CD.reset()">↺ Reset</button></div></div>`;
  }
  window.CD={
    time:0,running:false,interval:null,
    toggle(){if(this.running){clearInterval(this.interval);this.running=false;document.getElementById('cd-btn').textContent='▶ Resume';}else{const m=parseInt(document.getElementById('cd-min').value)||0,s=parseInt(document.getElementById('cd-sec').value)||0;if(!this.time)this.time=m*60+s;if(!this.time)return;this.running=true;document.getElementById('cd-btn').textContent='⏸ Pause';this.interval=setInterval(()=>{this.time--;this.upd();if(this.time<=0){clearInterval(this.interval);this.running=false;document.getElementById('cd-btn').textContent='▶ Start';Toast.success('⏰ Time's up!');}},1000);}},
    reset(){clearInterval(this.interval);this.running=false;this.time=0;document.getElementById('cd-btn').textContent='▶ Start';document.getElementById('cd-time').textContent='00:00';},
    upd(){const m=Math.floor(this.time/60),s=this.time%60;document.getElementById('cd-time').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
  };
  Router.registerRoute('#countdown-timer','Countdown Timer',render);
})();