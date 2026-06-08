(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📓</span>Notes (Markdown)</div>
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
      <button class="btn btn-sm btn-secondary" onclick="Notes.newN()">+ New</button>
      <button class="btn btn-sm btn-secondary" onclick="Notes.save()">💾 Save</button>
      <button class="btn btn-sm btn-danger" onclick="Notes.del()">🗑 Delete</button>
      <select id="notes-list" onchange="Notes.loadN(this.value)" style="flex:1;min-width:150px"></select>
    </div>
    <input type="text" id="note-title" placeholder="Note title..." style="font-size:1.05rem;font-weight:600;margin-bottom:8px">
    <div class="playground-container" style="grid-template-columns:1fr 1fr">
      <textarea id="note-editor" class="playground-code" spellcheck="false" placeholder="# Write in Markdown..." style="min-height:350px"></textarea>
      <div id="note-preview" style="min-height:350px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:14px;overflow:auto;font-size:0.88rem;line-height:1.7"></div>
    </div></div>`;
    Notes.refresh();Notes.curId=null;
  }
  function md(s){return s.replace(/^### (.+)$/gm,'<h3>$1</h2>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code style="background:var(--bg-tertiary);padding:1px 5px;border-radius:3px;font-size:0.82rem">$1</code>').replace(/^- (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\/li>
?)+/g,'<ul>$&</ul>').replace(/

/g,'<br><br>').replace(/
/g,'<br>');}
  window.Notes={
    curId:null,
    refresh(){const n=Store.get('notes',{});const sel=document.getElementById('notes-list');sel.innerHTML='<option value="">-- Select --</option>';Object.keys(n).forEach(id=>{sel.innerHTML+=`<option value="${id}">${esc(n[id].title||'Untitled')}</option>`;});},
    loadN(id){if(!id)return;const n=Store.get('notes',{});const nt=n[id];if(!nt)return;this.curId=id;document.getElementById('note-title').value=nt.title||'';document.getElementById('note-editor').value=nt.content||'';this.prev();},
    newN(){this.curId=null;document.getElementById('note-title').value='';document.getElementById('note-editor').value='';document.getElementById('note-preview').innerHTML='';document.getElementById('notes-list').value='';},
    save(){const t=document.getElementById('note-title').value.trim()||'Untitled',c=document.getElementById('note-editor').value;const n=Store.get('notes',{});const id=this.curId||'n_'+Date.now();n[id]={title:t,content:c,updated:Date.now()};Store.set('notes',n);this.curId=id;this.refresh();document.getElementById('notes-list').value=id;Toast.success('Saved!');},
    del(){if(!this.curId)return;confirmDialog('Delete this note?').then(ok=>{if(!ok)return;const n=Store.get('notes',{});delete n[this.curId];Store.set('notes',n);this.newN();this.refresh();});},
    prev(){document.getElementById('note-preview').innerHTML=md(document.getElementById('note-editor').value);}
  };
  function attachP(){const e=document.getElementById('note-editor');if(e)e.addEventListener('input',()=>Notes.prev());else setTimeout(attachP,200);}
  attachP();
  Router.registerRoute('#notes','Notes',render);
})();