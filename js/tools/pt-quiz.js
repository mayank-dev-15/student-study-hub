(function(){
  const els=[{z:1,sym:'H',n:'Hydrogen'},{z:2,sym:'He',n:'Helium'},{z:6,sym:'C',n:'Carbon'},{z:7,sym:'N',n:'Nitrogen'},{z:8,sym:'O',n:'Oxygen'},{z:11,sym:'Na',n:'Sodium'},{z:13,sym:'Al',n:'Aluminum'},{z:16,sym:'S',n:'Sulfur'},{z:17,sym:'Cl',n:'Chlorine'},{z:26,sym:'Fe',n:'Iron'},{z:29,sym:'Cu',n:'Copper'},{z:47,sym:'Ag',n:'Silver'},{z:79,sym:'Au',n:'Gold'},{z:82,sym:'Pb',n:'Lead'}];
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">⚛️</span>Periodic Table Quiz</div>
    <div id="ptq-question" style="font-size:1.5rem;font-weight:700;color:var(--accent);padding:16px">-</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><input type="text" id="ptq-answer" placeholder="Enter element name..." style="width:180px;text-align:center" onkeydown="if(event.key==='Enter')PTQ.check()"><button class="btn btn-primary btn-sm" onclick="PTQ.check()">Check</button></div>
    <div id="ptq-result" style="margin-top:12px;font-size:1rem;font-weight:600"></div>
    <div id="ptq-score" style="margin-top:8px;font-size:0.82rem;color:var(--text-muted)">Score: 0/0</div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="PTQ.next()">Next →</button></div>`;
    PTQ.next();
  }
  window.PTQ={score:0,total:0,current:null,
    next(){this.current=els[Math.floor(Math.random()*els.length)];document.getElementById('ptq-question').textContent='What element has symbol "'+this.current.sym+'"?';document.getElementById('ptq-answer').value='';document.getElementById('ptq-result').textContent='';},
    check(){let ans=document.getElementById('ptq-answer').value.trim().toLowerCase();this.total++;
      if(ans===this.current.n.toLowerCase()){this.score++;document.getElementById('ptq-result').innerHTML='<span style="color:var(--green)">✓ Correct! '+this.current.n+' (Z='+this.current.z+')</span>';}else{document.getElementById('ptq-result').innerHTML='<span style="color:var(--red)">✗ Answer: '+this.current.n+' (Z='+this.current.z+')</span>';}
      document.getElementById('ptq-score').textContent='Score: '+this.score+'/'+this.total;
    }
  };
  Router.registerRoute('#pt-quiz','PT Quiz',render);
})();