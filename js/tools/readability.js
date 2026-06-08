(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📈</span>Readability Analyzer</div>
    <div class="form-group"><label>Text</label><textarea id="ra-in" rows="8" placeholder="Paste text..." oninput="RA.analyze()"></textarea></div>
    <div id="ra-res" style="display:none">
      <div class="stats-row"><div class="stat-box"><div class="stat-value" id="ra-f">0</div><div class="stat-label">Flesch</div></div><div class="stat-box"><div class="stat-value" id="ra-g">-</div><div class="stat-label">Grade</div></div><div class="stat-box"><div class="stat-value" id="ra-w">0</div><div class="stat-label">Words</div></div><div class="stat-box"><div class="stat-value" id="ra-s">0</div><div class="stat-label">Sentences</div></div></div>
      <div id="ra-bar" style="margin-top:12px"></div><div id="ra-d" style="margin-top:8px;font-size:0.82rem;color:var(--text-muted)"></div>
    </div></div>`;
  }
  function syllables(w){w=w.toLowerCase().replace(/[^a-z]/g,'');if(w.length<=3)return 1;w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'');w=w.replace(/^y/,'');const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
  window.RA={
    analyze(){
      const t=document.getElementById('ra-in').value.trim();if(!t){document.getElementById('ra-res').style.display='none';return;}document.getElementById('ra-res').style.display='';
      const w=t.split(/\s+/).filter(x=>x.length>0),s=t.split(/[.?!]+/).filter(x=>x.trim().length>0),sy=w.reduce((a,x)=>a+syllables(x),0);
      const wc=w.length,sc=Math.max(s.length,1),f=Math.max(0,Math.min(100,206.835-1.015*(wc/sc)-84.6*(sy/wc)));
      let g,d,col;
      if(f>=90){g='5th';d='Very easy';col='var(--green)';}else if(f>=80){g='6th';d='Easy';col='var(--green)';}else if(f>=70){g='7th';d='Fairly easy';col='var(--cyan)';}else if(f>=60){g='8-9th';d='Standard';col='var(--yellow)';}else if(f>=50){g='10-12th';d='Fairly difficult';col='var(--orange)';}else if(f>=30){g='College';d='Difficult';col='var(--red)';}else{g='Graduate';d='Very difficult';col='var(--red)';}
      document.getElementById('ra-f').textContent=f.toFixed(1);document.getElementById('ra-f').style.color=col;document.getElementById('ra-g').textContent=g;document.getElementById('ra-w').textContent=wc;document.getElementById('ra-s').textContent=sc;
      document.getElementById('ra-bar').innerHTML=`<div class="progress-bar"><div class="fill" style="width:${f}%;background:${col}"></div></div>`;document.getElementById('ra-d').textContent=d;
    }
  };
  Router.registerRoute('#readability','Readability Analyzer',render);
})();