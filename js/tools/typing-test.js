(function(){
  const texts=['The quick brown fox jumps over the lazy dog','Pack my box with five dozen liquor jugs','How vexingly quick daft zebras jump','The five boxing wizards jump quickly','Sphinx of black quartz judge my vow'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">⌨️</span>Typing Speed Test</div>
    <div id="tt-target" style="font-size:1.1rem;line-height:2;background:var(--bg-tertiary);padding:16px;border-radius:8px;margin-bottom:12px;text-align:left"></div>
    <textarea id="tt-input" rows="3" placeholder="Start typing here..." style="font-size:1.05rem;text-align:left" oninput="TT.check()"></textarea>
    <div class="stats-row" style="margin-top:12px"><div class="stat-box"><div class="stat-value" id="tt-time">0s</div><div class="stat-label">Time</div></div><div class="stat-box"><div class="stat-value" id="tt-wpm">0</div><div class="stat-label">WPM</div></div><div class="stat-box"><div class="stat-value" id="tt-acc">100%</div><div class="stat-label">Accuracy</div></div></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="TT.reset()">New Text</button></div>`;
    TT.reset();
  }
  window.TT={target:'',startTime:0,done:false,
    reset(){this.target=texts[Math.floor(Math.random()*texts.length)];this.done=false;this.startTime=0;document.getElementById('tt-target').textContent=this.target;document.getElementById('tt-input').value='';document.getElementById('tt-time').textContent='0s';document.getElementById('tt-wpm').textContent='0';document.getElementById('tt-acc').textContent='100%';},
    check(){if(this.done)return;let input=document.getElementById('tt-input').value;if(!input.length){this.startTime=0;return;}if(!this.startTime)this.startTime=Date.now();
      let elapsed=(Date.now()-this.startTime)/1000;let words=input.trim().split(/\s+/).length;let wpm=elapsed>0?Math.round(words/(elapsed/60)):0;
      let correct=0;for(let i=0;i<input.length;i++)if(input[i]===this.target[i])correct++;let acc=input.length>0?Math.round(correct/input.length*100):100;
      document.getElementById('tt-time').textContent=Math.round(elapsed)+'s';document.getElementById('tt-wpm').textContent=wpm;document.getElementById('tt-acc').textContent=acc+'%';
      if(input===this.target){this.done=true;document.getElementById('tt-input').value='✓ Done! '+wpm+' WPM | '+acc+'% accuracy';}
    }
  };
  Router.registerRoute('#typing-test','Typing Test',render);
})();