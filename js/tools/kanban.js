(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📋</span>Kanban Board</div>
    <div style="display:flex;gap:8px;margin-bottom:12px"><input type="text" id="kb-in" placeholder="New task..." style="flex:1"><button class="btn btn-primary btn-sm" onclick="Kanban.add()">Add</button></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px" id="kb-board">
      <div style="background:var(--bg-tertiary);border-radius:8px;padding:12px;min-height:200px"><div style="font-weight:600;color:var(--accent);margin-bottom:8px">📋 To Do</div><div class="kb-col" data-status="todo" id="kb-todo"></div></div>
      <div style="background:var(--bg-tertiary);border-radius:8px;padding:12px;min-height:200px"><div style="font-weight:600;color:var(--yellow);margin-bottom:8px">🔄 In Progress</div><div class="kb-col" data-status="doing" id="kb-doing"></div></div>
      <div style="background:var(--bg-tertiary);border-radius:8px;padding:12px;min-height:200px"><div style="font-weight:600;color:var(--green);margin-bottom:8px">✅ Done</div><div class="kb-col" data-status="done" id="kb-done"></div></div>
    </div></div>`;
    Kanban.load();
  }
  window.Kanban={
    tasks:Store.get('kanban_tasks',[]),
    add(){const t=document.getElementById('kb-in').value.trim();if(!t)return;this.tasks.push({t,id:Date.now(),s:'todo'});Store.set('kanban_tasks',this.tasks);document.getElementById('kb-in').value='';this.render();},
    move(id,s){const t=this.tasks.find(x=>x.id===id);if(t){t.s=s;Store.set('kanban_tasks',this.tasks);this.render();}},
    remove(id){this.tasks=this.tasks.filter(x=>x.id!==id);Store.set('kanban_tasks',this.tasks);this.render();},
    render(){['todo','doing','done'].forEach(s=>{const el=document.getElementById('kb-'+s);if(!el)return;const items=this.tasks.filter(x=>x.s===s);el.innerHTML=items.map(x=>`<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:6px;font-size:0.82rem;display:flex;justify-content:space-between;align-items:center"><span>${esc(x.t)}</span><div style="display:flex;gap:4px">${s!=='todo'?`<button class="btn btn-sm" style="padding:2px 6px;font-size:0.65rem" onclick="Kanban.move(${x.id},'${s==='done'?'doing':s==='doing'?'todo':'done'}')">←</button>`:''}<button class="btn btn-danger btn-sm" style="padding:2px 6px;font-size:0.65rem" onclick="Kanban.remove(${x.id})">✕</button></div></div>`).join('');});},
    load(){this.render();}
  };
  Router.registerRoute('#kanban','Kanban Board',render);
})();