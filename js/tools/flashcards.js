(function(){
  function render(c){
    const cards=Store.get('flashcards',[]);
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🃏</span>Flashcards <span style="margin-left:auto;font-size:0.75rem;color:var(--text-muted)">${cards.length} cards</span></div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:1;margin-bottom:0"><label>Front</label><input type="text" id="fc-f" placeholder="Question"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Back</label><input type="text" id="fc-b" placeholder="Answer"></div><button class="btn btn-primary btn-sm" onclick="FC.add()" style="align-self:flex-end">Add</button></div>
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap"><button class="btn btn-secondary btn-sm" onclick="FC.exportCSV()">📤 Export</button><button class="btn btn-secondary btn-sm" onclick="document.getElementById('fc-imp').click()">📥 Import</button><input type="file" id="fc-imp" accept=".csv" style="display:none" onchange="FC.importCSV(event)"></div>
    <div id="fc-list"></div></div>
    <div class="card" id="fc-study" style="display:none"><div class="card-title" style="justify-content:center">Study Mode</div>
    <div id="fc-info" style="text-align:center;color:var(--text-muted);font-size:0.82rem;margin-bottom:12px"></div>
    <div class="flashcard-container"><div class="flashcard" id="fc-card" onclick="FC.flip()"><div class="flashcard-face flashcard-front" id="fc-front"></div><div class="flashcard-face flashcard-back" id="fc-back"></div></div></div>
    <div class="flashcard-controls" id="fc-ctrl" style="display:none"><button class="btn btn-danger btn-sm" onclick="FC.ans(0)">✗ Hard</button><button class="btn btn-secondary btn-sm" onclick="FC.ans(1)">~ Med</button><button class="btn btn-primary btn-sm" onclick="FC.ans(2)">✓ Easy</button></div>
    <div style="text-align:center;margin-top:12px"><button class="btn btn-secondary btn-sm" onclick="FC.exit()">Exit</button></div></div>`;
    FC.renderList();
  }
  window.FC={
    cards:Store.get('flashcards',[]),idx:0,queue:[],
    add(){const f=document.getElementById('fc-f').value.trim(),b=document.getElementById('fc-b').value.trim();if(!f||!b){Toast.error('Fill both sides');return;}this.cards.push({f,b,iv:0,nr:Date.now(),created:Date.now()});Store.set('flashcards',this.cards);document.getElementById('fc-f').value='';document.getElementById('fc-b').value='';FC.renderList();Toast.success('Added!');},
    remove(i){this.cards.splice(i,1);Store.set('flashcards',this.cards);this.renderList();},
    renderList(){const el=document.getElementById('fc-list');if(!this.cards.length){el.innerHTML='<div class="empty-state"><p>No cards yet.</p></div>';return;}
      const rows=this.cards.map((c,i)=><tr><td>${esc(c.f)}</td><td>${esc(c.b)}</td><td><span class="badge badge-purple">L${c.iv}</span></td><td><button class="btn btn-danger btn-sm" onclick="FC.remove(${i})">✕</button></td></tr>).join('');
      el.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Front</th><th>Back</th><th>Lvl</th><th></th></tr></thead><tbody>${rows}</tbody></table><button class="btn btn-primary" style="margin-top:12px" onclick="FC.start()">📖 Study (${this.cards.length})</button></div>`;},
    start(){this.queue=this.cards.map((c,i)=>({...c,oi:i})).sort((a,b)=>a.nr-b.nr||a.iv-b.iv);this.idx=0;document.getElementById('fc-study').style.display='';this.show();},
    show(){if(this.idx>=this.queue.length){Toast.success('All done!');this.exit();return;}const c=this.queue[this.idx];document.getElementById('fc-front').textContent=c.f;document.getElementById('fc-back').textContent=c.b;document.getElementById('fc-card').classList.remove('flipped');document.getElementById('fc-ctrl').style.display='none';document.getElementById('fc-info').textContent=`Card ${this.idx+1}/${this.queue.length} — Click to reveal`;},
    flip(){const el=document.getElementById('fc-card');el.classList.toggle('flipped');if(el.classList.contains('flipped')){document.getElementById('fc-ctrl').style.display='flex';document.getElementById('fc-info').textContent='Rate your recall';}},
    ans(q){const c=this.queue[this.idx],oi=c.oi;this.cards[oi].iv=q===0?Math.max(0,this.cards[oi].iv-1):q===1?this.cards[oi].iv+1:this.cards[oi].iv+2;const ivs=[0,60000,300000,3600000,86400000,604800000,2592000000];this.cards[oi].nr=Date.now()+ivs[Math.min(this.cards[oi].iv,ivs.length-1)];Store.set('flashcards',this.cards);this.idx++;this.show();},
    exit(){document.getElementById('fc-study').style.display='none';this.renderList();},
    exportCSV(){const csv='front,back
'+this.cards.map(c=>`"${c.f.replace(/"/g,'""')}","${c.b.replace(/"/g,'""')}"`).join('
');const blob=new Blob([csv],{type:'text/csv'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='flashcards.csv';a.click();URL.revokeObjectURL(u);},
    importCSV(e){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=(ev)=>{const lines=ev.target.result.split('
').slice(1);let n=0;lines.forEach(l=>{const m=l.match(/^"([^"]*)","([^"]*)"$/);if(m){this.cards.push({f:m[1],b:m[2],iv:0,nr:Date.now(),created:Date.now()});n++;}});Store.set('flashcards',this.cards);this.renderList();Toast.success(`Imported ${n} cards`);};r.readAsText(file);}
  };
  Router.registerRoute('#flashcards','Flashcards',render);
})();