(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📝</span>Assignment Tracker</div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:2;margin-bottom:0"><label>Title</label><input type="text" id="as-t" placeholder="Assignment"></div><div class="form-group" style="margin-bottom:0"><label>Subject</label><input type="text" id="as-s" placeholder="Subject"></div><div class="form-group" style="margin-bottom:0"><label>Due</label><input type="date" id="as-d"></div><div class="form-group" style="margin-bottom:0"><label>Priority</label><select id="as-p"><option value="low">Low</option><option value="medium" selected>Med</option><option value="high">High</option></select></div><button class="btn btn-primary btn-sm" onclick="Asgn.add()" style="align-self:flex-end">Add</button></div>
    <div id="as-list" class="table-wrap"></div></div>`;
    Asgn.load();
  }
  window.Asgn={items:Store.get('assignments',[]),
    add(){const t=document.getElementById('as-t').value.trim(),s=document.getElementById('as-s').value.trim(),d=document.getElementById('as-d').value,p=document.getElementById('as-p').value;if(!t){Toast.error('Enter title');return;}this.items.push({t,s,d,p,st:'pending',id:Date.now()});Store.set('assignments',this.items);document.getElementById('as-t').value='';document.getElementById('as-s').value='';document.getElementById('as-d').value='';this.render();},
    toggle(id){const i=this.items.find(a=>a.id===id);if(i){i.st=i.st==='done'?'pending':'done';Store.set('assignments',this.items);this.render();}},
    remove(id){this.items=this.items.filter(a=>a.id!==id);Store.set('assignments',this.items);this.render();},
    render(){const el=document.getElementById('as-list');if(!this.items.length){el.innerHTML='<div class="empty-state"><p>No assignments.</p></div>';return;}
      const sorted=[...this.items].sort((a,b)=>{if(a.st===b.st){if(a.d&&b.d)return new Date(a.d)-new Date(b.d);return a.d?-1:1;}return a.st==='done'?1:-1;});
      const pc={high:'badge-red',medium:'badge-yellow',low:'badge-green'};
      const rows=sorted.map(a=>{const due=a.d?new Date(a.d):null,ds=due?Math.ceil((due-Date.now())/86400000):null;const dStr=due?(ds<0?`<span class="badge badge-red">Overdue ${Math.abs(ds)}d</span>`:ds===0?`<span class="badge badge-red">Today</span>`:`<span class="badge ${pc[a.p]}">${ds}d</span>`):'-';const ds2=a.st==='done'?'style="text-decoration:line-through;opacity:0.5"':'';
        return`<tr ${ds2}><td><input type="checkbox" ${a.st==='done'?'checked':''} onchange="Asgn.toggle(${a.id})"></td><td>${esc(a.t)}</td><td>${esc(a.s||'-')}</td><td>${dStr}</td><td><span class="badge ${pc[a.p]}">${a.p}</span></td><td><button class="btn btn-danger btn-sm" onclick="Asgn.remove(${a.id})">✕</button></td></tr>`;}).join('');
      el.innerHTML=`<table><thead><tr><th>✓</th><th>Title</th><th>Subject</th><th>Due</th><th>Priority</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;},
    load(){this.render();}};
  Router.registerRoute('#assignments','Assignment Tracker',render);
})();