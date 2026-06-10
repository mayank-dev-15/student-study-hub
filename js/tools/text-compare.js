(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔀</span>Text Compare</div>
    <div class="playground-container">
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Original</label><textarea id="tc-a" class="playground-code" rows="10" placeholder="Paste original text..." style="min-height:200px" oninput="TC.diff()"></textarea></div>
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Modified</label><textarea id="tc-b" class="playground-code" rows="10" placeholder="Paste modified text..." style="min-height:200px" oninput="TC.diff()"></textarea></div>
    </div>
    <div id="tc-result" style="margin-top:12px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;min-height:60px;white-space:pre-wrap;font-size:0.85rem;line-height:1.7"></div></div>`;
  }
  window.TC={
    diff(){
      let a=document.getElementById('tc-a').value.split('
'),b=document.getElementById('tc-b').value.split('
'),el=document.getElementById('tc-result');
      let html='';let max=Math.max(a.length,b.length);
      for(let i=0;i<max;i++){let la=a[i]||'',lb=b[i]||'';if(la===lb)html+=`<div style="color:var(--text-muted)">  ${esc(la)}</div>`;else{if(la)html+=`<div style="background:var(--red-glow);color:var(--red)">- ${esc(la)}</div>`;if(lb)html+=`<div style="background:var(--green-glow);color:var(--green)">+ ${esc(lb)}</div>`;}}
      el.innerHTML=html||'<span style="color:var(--text-muted)">No differences</span>';
    }
  };
  Router.registerRoute('#text-compare','Text Compare',render);
})();