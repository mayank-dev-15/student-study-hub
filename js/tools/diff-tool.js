(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔀</span>Text Diff Tool</div>
    <div class="playground-container">
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Original</label><textarea id="df-a" class="playground-code" rows="10" placeholder="Paste original text..." style="min-height:200px" oninput="Diff.calc()"></textarea></div>
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Modified</label><textarea id="df-b" class="playground-code" rows="10" placeholder="Paste modified text..." style="min-height:200px" oninput="Diff.calc()"></textarea></div>
    </div>
    <div id="df-result" style="margin-top:12px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;min-height:60px;white-space:pre-wrap;font-size:0.85rem;line-height:1.7"></div></div>`;
  }
  window.Diff={
    calc(){
      const a=document.getElementById('df-a').value.split('
'),b=document.getElementById('df-b').value.split('
'),el=document.getElementById('df-result');
      let html='';const max=Math.max(a.length,b.length);
      for(let i=0;i<max;i++){
        const la=a[i]||'',lb=b[i]||'';
        if(la===lb)html+=`<div style="color:var(--text-muted)">  ${esc(la)}</div>`;
        else{if(la)html+=`<div style="background:var(--red-glow);color:var(--red)">- ${esc(la)}</div>`;if(lb)html+=`<div style="background:var(--green-glow);color:var(--green)">+ ${esc(lb)}</div>`;}
      }
      el.innerHTML=html||'<span style="color:var(--text-muted)">No differences</span>';
    }
  };
  Router.registerRoute('#diff-tool','Text Diff Tool',render);
})();