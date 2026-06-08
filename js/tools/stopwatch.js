(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">⏱️</span>Stopwatch</div>
    <div class="timer-display" id="sw-time">00:00:00.000</div>
    <div class="timer-controls"><button class="btn btn-primary" onclick="SW.toggle()" id="sw-btn">▶ Start</button><button class="btn btn-secondary" onclick="SW.reset()">↺ Reset</button><button class="btn btn-secondary btn-sm" onclick="SW.lap()">🏁 Lap</button></div>
    <div id="sw-laps" style="margin-top:12px;max-height:150px;overflow-y:auto"></div></div>`;
  }
  window.SW={
    time:0,running:false,interval:null,laps:[],
    toggle(){if(this.running){clearInterval(this.interval);this.running=false;document.getElementById('sw-btn').textContent='▶ Resume';}else{this.running=true;document.getElementById('sw-btn').textContent='⏸ Pause';this.interval=setInterval(()=>{this.time+=10;this.upd();},10);}},
    reset(){clearInterval(this.interval);this.running=false;this.time=0;this.laps=[];document.getElementById('sw-btn').textContent='▶ Start';this.upd();document.getElementById('sw-laps').innerHTML='';},
    lap(){this.laps.push(this.time);const el=document.getElementById('sw-laps');const l=this.fmt(this.time);el.innerHTML=this.laps.map((t,i)=>`<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:0.82rem"><span>Lap ${i+1}</span><strong>${this.fmt(t)}</strong></div>`).join('')+'<div style="padding:4px 0;font-weight:700">Total: '+l+'</div>';},
    upd(){document.getElementById('sw-time').textContent=this.fmt(this.time);},
    fmt(ms){const h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000),s=Math.floor((ms%60000)/1000),ms2=ms%1000;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(ms2).padStart(3,'0');}
  };
  Router.registerRoute('#stopwatch','Stopwatch',render);
})();