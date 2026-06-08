(function(){
  const words=['javascript','python','algorithm','function','variable','constant','array','object','string','number','boolean','integer','compiler','debugger','interface','library','framework','database','network','security','encryption','authentication','responsive','animation','component','iteration','recursion'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">🔤</span>Word Scramble</div>
    <div style="font-size:2rem;font-weight:700;letter-spacing:8px;color:var(--accent);padding:20px" id="ws-word">-</div>
    <div class="form-group" style="max-width:300px;margin:0 auto"><label>Your Guess</label><input type="text" id="ws-guess" placeholder="Unscramble the word..." style="text-align:center;font-size:1.1rem"></div>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:12px"><button class="btn btn-primary" onclick="WS.check()">Check</button><button class="btn btn-secondary" onclick="WS.skip()">Skip</button><button class="btn btn-secondary btn-sm" onclick="WS.hint()">💡 Hint</button></div>
    <div id="ws-result" style="margin-top:12px;font-size:1rem;font-weight:600"></div>
    <div style="margin-top:8px;font-size:0.82rem;color:var(--text-muted)">Score: <strong id="ws-score" style="color:var(--accent)">0</strong> | Streak: <strong id="ws-streak">0</strong></div></div>`;
    WS.next();
  }
  window.WS={
    word:'',scrambled:'',score:0,streak:0,
    scramble(w){const a=w.split('');for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.join('');},
    next(){this.word=words[Math.floor(Math.random()*words.length)];this.scrambled=this.scramble(this.word);document.getElementById('ws-word').textContent=this.scrambled;document.getElementById('ws-guess').value='';document.getElementById('ws-result').textContent='';},
    check(){const g=document.getElementById('ws-guess').value.trim().toLowerCase();if(g===this.word){this.score+=10+this.streak*2;this.streak++;document.getElementById('ws-result').innerHTML='<span style="color:var(--green)">✓ Correct!</span>';document.getElementById('ws-score').textContent=this.score;document.getElementById('ws-streak').textContent=this.streak;setTimeout(()=>this.next(),1000);}else{this.streak=0;document.getElementById('ws-result').innerHTML='<span style="color:var(--red)">✗ Try again</span>';document.getElementById('ws-streak').textContent=0;}},
    skip(){document.getElementById('ws-result').innerHTML=`Answer: <strong>${esc(this.word)}</strong>`;this.streak=0;document.getElementById('ws-streak').textContent=0;setTimeout(()=>this.next(),2000);},
    hint(){document.getElementById('ws-result').innerHTML=`Starts with: <strong>${this.word[0].toUpperCase()}</strong> | Length: ${this.word.length}`;}
  };
  Router.registerRoute('#word-scramble','Word Scramble',render);
})();