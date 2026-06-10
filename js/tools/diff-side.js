(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔀</span>Side-by-Side Diff</div>
    <div class="playground-container" style="grid-template-columns:1fr 1fr">
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Original</label><textarea id="df-a" class="playground-code" rows="12" placeholder="Paste original text..." style="min-height:250px" oninput="DF.calc()"></textarea></div>
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Modified</label><textarea id="df-b" class="playground-code" rows="12" placeholder="Paste modified text..." style="min-height:250px" oninput="DF.calc()"></textarea></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px"><span style="font-size:0.75rem;color:var(--green)">■ Added</span><span style="font-size:0.75rem;color:var(--red)">■ Removed</span><span style="font-size:0.75rem;color:var(--text-muted)">■ Unchanged</span></div>
    <div id="df-result" style="margin-top:8px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;min-height:60px;white-space:pre-wrap;font-size:0.85rem;line-height:1.7;max-height:300px;overflow-y:auto"></div></div>`;
  }
  window.DF={
    calc(){
      var a=document.getElementById('df-a').value.split('\n'),b=document.getElementById('df-b').value.split('\n');
      var max=Math.max(a.length,b.length),html='';
      for(var i=0;i<max;i++){
        var la=a[i]||'',lb=b[i]||'';
        if(la===lb) html+=`<div style="color:var(--text-muted)">  ${esc(la)}</div>`;
        else{if(la) html+=`<div style="background:var(--red-glow);color:var(--red)">- ${esc(la)}</div>`;if(lb) html+=`<div style="background:var(--green-glow);color:var(--green)">+ ${esc(lb)}</div>`;}
      }
      document.getElementById('df-result').innerHTML=html||'<span style="color:var(--text-muted)">No differences</span>';
    }
  };
  Router.registerRoute('#diff-side','Side-by-Side Diff',render);
})();