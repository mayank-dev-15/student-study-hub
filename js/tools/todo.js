(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">✅</span>Todo List</div>
    <div class="form-row" style="margin-bottom:12px">
      <input type="text" id="td-in" placeholder="Add task..." style="flex:1" onkeydown="if(event.key==='Enter')Todo.add()">
      <select id="td-pr" style="width:90px"><option value="low">Low</option><option value="medium" selected>Med</option><option value="high">High</option></select>
      <button class="btn btn-primary btn-sm" onclick="Todo.add()">Add</button>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px"><button class="btn btn-sm btn-secondary" onclick="Todo.f='all';Todo.render()" id="tf-all">All</button><button class="btn btn-sm btn-secondary" onclick="Todo.f='active';Todo.render()" id="tf-act">Active</button><button class="btn btn-sm btn-secondary" onclick="Todo.f='done';Todo.render()" id="tf-done">Done</button></div>
    <div id="td-list"></div>
    <div style="margin-top:12px;display:flex;justify-content:space-between"><span id="td-cnt" style="font-size:0.78rem;color:var(--text-muted)"></span><button class="btn btn-danger btn-sm" onclick="Todo.clearDone()">Clear Done</button></div></div>`;
    Todo.f='all';Todo.load();
  }
  window.Todo={
    items:Store.get('todos',[]),f:'all',
    add(){const t=document.getElementById('td-in').value.trim(),p=document.getElementById('td-pr').value;if(!t)return;this.items.unshift({t,done:false,p,id:Date.now()});Store.set('todos',this.items);document.getElementById('td-in').value='';this.render();},
    toggle(id){const i=this.items.find(x=>x.id===id);if(i){i.done=!i.done;Store.set('todos',this.items);this.render();}},
    remove(id){this.items=this.items.filter(x=>x.id!==id);Store.set('todos',this.items);this.render();},
    clearDone(){this.items=this.items.filter(x=>!x.done);Store.set('todos',this.items);this.render();},
    render(){
      const el=document.getElementById('td-list');let f=this.items;if(this.f==='active')f=this.items.filter(x=>!x.done);if(this.f==='done')f=this.items.filter(x=>x.done);
      document.querySelectorAll('#td-filters button').forEach(b=>b.style.opacity='0.5');
      const ab=document.getElementById('tf-'+(this.f==='all'?'all':this.f==='active'?'act':'done'));if(ab)ab.style.opacity='1';
      const pc={high:'badge-red',medium:'badge-yellow',low:'badge-green'};
      if(!f.length){el.innerHTML='<div class="empty-state"><p>No tasks.</p></div>';}
      else{el.innerHTML=f.map(x=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)"><input type="checkbox" ${x.done?'checked':''} onchange="Todo.toggle(${x.id})"><span style="flex:1;font-size:0.85rem;${x.done?'text-decoration:line-through;opacity:0.5':''}">${esc(x.t)}</span><span class="badge ${pc[x.p]}">${x.p}</span><button class="btn btn-danger btn-sm" onclick="Todo.remove(${x.id})">✕</button></div>`).join('');}
      const act=this.items.filter(x=>!x.done).length;document.getElementById('td-cnt').textContent=`${act} of ${this.items.length} remaining`;
    },
    load(){this.render();}
  };
  Router.registerRoute('#todo','Todo List',render);
})();