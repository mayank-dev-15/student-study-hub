(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">🎲</span>Dice Roller</div>
    <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">
      {[4,6,8,10,12,20,100].forEach(d=>`<button class="btn btn-secondary btn-sm" onclick="Dice.roll(${d})">d${d}</button>`)}
    </div>
    <div id="dice-result" style="font-size:3rem;font-weight:700;color:var(--accent);padding:20px">-</div>
    <div id="dice-history" style="font-size:0.78rem;color:var(--text-muted);max-height:100px;overflow-y:auto"></div></div>`;
  }
  window.Dice={history:[],roll(d){const r=Math.floor(Math.random()*d)+1;document.getElementById('dice-result').textContent=r;this.history.unshift('d'+d+' → '+r);if(this.history.length>20)this.history.pop();document.getElementById('dice-history').innerHTML=this.history.map(h=>`<div>${h}</div>`).join('');}};
  Router.registerRoute('#dice-roller','Dice Roller',render);
})();