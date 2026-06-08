(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">🎯</span>Random Picker</div>
    <div class="form-group"><label>Items (one per line)</label><textarea id="rp-items" rows="6" placeholder="Item 1&#10;Item 2&#10;Item 3"></textarea></div>
    <div style="display:flex;gap:8px;justify-content:center"><button class="btn btn-primary" onclick="RP.pick(1)">Pick 1</button><button class="btn btn-secondary" onclick="RP.pick(3)">Pick 3</button><button class="btn btn-secondary" onclick="RP.shuffle()">Shuffle All</button></div>
    <div id="rp-result" style="margin-top:16px;font-size:1.3rem;font-weight:700;color:var(--accent)"></div></div>`;
  }
  window.RP={
    pick(n){const items=document.getElementById('rp-items').value.split('
').filter(x=>x.trim());if(!items.length){Toast.error('Add items first');return;}const picks=[];for(let i=0;i<Math.min(n,items.length);i++){const idx=Math.floor(Math.random()*items.length);picks.push(items[idx]);}document.getElementById('rp-result').innerHTML=picks.map(p=>`<div style="padding:4px 0">${esc(p)}</div>`).join('');},
    shuffle(){const items=document.getElementById('rp-items').value.split('
').filter(x=>x.trim());for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}document.getElementById('rp-items').value=items.join('
');document.getElementById('rp-result').textContent='Shuffled!';}
  };
  Router.registerRoute('#random-picker','Random Picker',render);
})();