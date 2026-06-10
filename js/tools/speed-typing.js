(function(){
  const texts=['The quick brown fox jumps over the lazy dog','Pack my box with five dozen liquor jugs','How vexingly quick daft zebras jump','The five boxing wizards jump quickly','Sphinx of black quartz judge my vow','Two driven jocks help fax my big quiz'];
  let timer=null,startTime=0;
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">⌨️</span>Speed Typing Test</div>
    <div id="st-target" style="font-size:1.1rem;line-height:2;background:var(--bg-tertiary);padding:16px;border-radius:8px;margin-bottom:12px;text-align:left"></div>
    <textarea id="st-input" rows="3" placeholder="Start typing here..." style="font-size:1.05rem;text-align:left" oninput="STP.check()"></textarea>
    <div class="stats-row" style="margin-top:12px"><div class="stat-box"><div class="stat-value" id="st-time">0s</div><div class="stat-label">Time</div></div><div class="stat-box"><div class="stat-value" id="st-wpm">0</div><div class="stat-label">WPM</div></div><div class="stat-box"><div class="stat-value" id="st-acc">100%</div><div class="stat-label">Accuracy</div></div></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="STP.reset()">New Text</button></div>`;
    STP.reset();
  }
  window.STP={
    target:'',done:false,
    reset(){this.target=texts[Math.floor(Math.random()*texts.length)];this.done=false;startTime=0;clearInterval(timer);document.getElementById('st-target').textContent=this.target;document.getElementById('st-input').value='';document.getElementById('st-time').textContent='0s';document.getElementById('st-wpm').textContent='0';document.getElementById('st-acc').textContent='100%';},
    check(){if(this.done)return;const input=document.getElementById('st-input').value;if(!startTime&&input.length)startTime=Date.now();
      if(!startTime)return;const elapsed=(Date.now()-startTime)/1000;const words=input.trim().split(/\s+/).length;const wpm=elapsed>0?Math.round(words/(elapsed/60)):0;
      let correct=0;for(let i=0;i<input.length;i++)if(input[i]===this.target[i])correct++;const acc=input.length>0?Math.round(correct/input.length*100):100;
      document.getElementById('st-time').textContent=Math.round(elapsed)+'s';document.getElementById('st-wpm').textContent=wpm;document.getElementById('st-acc').textContent=acc+'%';
      if(input===this.target){this.done=true;this.streak=(this.streak||0)+1;const finalWpm=wpm;document.getElementById('st-input').value='';setTimeout(()=>{document.getElementById('st-input').value=`✓ Done! ${finalWpm} WPM | Accuracy: ${acc}% | Streak: ${this.streak}`;},100);}else{clearInterval(timer);timer=null;}}
  };
  Router.registerRoute('#speed-typing','Speed Typing',render);
})();