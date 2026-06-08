(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📝</span>Word Counter</div>
    <div class="form-group"><label>Text</label><textarea id="wc-in" rows="8" placeholder="Type or paste text..." oninput="WC.analyze()"></textarea></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="wc-w">0</div><div class="stat-label">Words</div></div><div class="stat-box"><div class="stat-value" id="wc-c">0</div><div class="stat-label">Chars</div></div><div class="stat-box"><div class="stat-value" id="wc-s">0</div><div class="stat-label">Sentences</div></div><div class="stat-box"><div class="stat-value" id="wc-p">0</div><div class="stat-label">Paragraphs</div></div></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="wc-r">0m</div><div class="stat-label">Read</div></div><div class="stat-box"><div class="stat-value" id="wc-sp">0m</div><div class="stat-label">Speak</div></div><div class="stat-box"><div class="stat-value" id="wc-aw">0</div><div class="stat-label">Avg Word</div></div><div class="stat-box"><div class="stat-value" id="wc-as">0</div><div class="stat-label">Avg Sent</div></div></div>
    <div id="wc-top" style="margin-top:8px"></div></div>`;
    WC.analyze();
  }
  window.WC={
    analyze(){
      const t=document.getElementById('wc-in').value,w=t.trim()?t.trim().split(/\s+/).length:0,ch=t.length,se=t.trim()?t.split(/[.!?]+/).filter(s=>s.trim()).length||0:0,pa=t.trim()?t.split(/
\s*
/).filter(p=>p.trim()).length||(t.trim()?1:0):0;
      const wa=t.trim().toLowerCase().split(/\s+/).filter(x=>x.length>3),rt=Math.max(1,Math.round(w/200)),sp=Math.max(1,Math.round(w/150)),aw=w>0?(ch/w).toFixed(1):0,as=se>0?(w/se).toFixed(1):0;
      document.getElementById('wc-w').textContent=w;document.getElementById('wc-c').textContent=ch;document.getElementById('wc-s').textContent=se;document.getElementById('wc-p').textContent=pa;
      document.getElementById('wc-r').textContent=rt+'m';document.getElementById('wc-sp').textContent=sp+'m';document.getElementById('wc-aw').textContent=aw;document.getElementById('wc-as').textContent=as;
      const freq={};wa.forEach(x=>{x=x.replace(/[^a-z]/g,'');if(x.length>3)freq[x]=(freq[x]||0)+1;});
      const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8);
      document.getElementById('wc-top').innerHTML=top.length?'<span style="font-size:0.75rem;color:var(--text-muted)">Top: '+top.map(([w,c])=>`<span class="badge badge-cyan" style="margin:2px">${esc(w)} (${c})</span>`).join('')+'</span>':'';
    }
  };
  Router.registerRoute('#word-counter','Word Counter',render);
})();