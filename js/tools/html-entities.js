(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">&lt;/&gt;</span>HTML Entity Encoder</div>
    <div class="form-group"><label>Input</label><textarea id="he-in" rows="5" placeholder="<div class='test'>Hello & World</div>"></textarea></div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="HE.enc()">Encode</button><button class="btn btn-secondary btn-sm" onclick="HE.dec()">Decode</button></div>
    <textarea id="he-out" rows="5" readonly></textarea></div>`;
  }
  window.HE={
    enc(){const d=document.createElement('div');d.textContent=document.getElementById('he-in').value;document.getElementById('he-out').value=d.innerHTML;},
    dec(){const d=document.createElement('div');d.innerHTML=document.getElementById('he-in').value;document.getElementById('he-out').value=d.textContent;}
  };
  Router.registerRoute('#html-entities','HTML Entities',render);
})();