(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎯</span>Goal Tracker (SMART Goals)</div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:2;margin-bottom:0"><label>Goal</label><input type="text" id="gl-t" placeholder="e.g., Learn Python"></div><div class="form-group" style="margin-bottom:0"><label>Deadline</label><input type="date" id="gl-d"></div><button class="btn btn-primary btn-sm" onclick="GL.add()" style="align-self:flex-end">Add</button></div>
    <div id="gl-list"></div></div>`;
    GL.load();
  }
  window.GL={
    goals:Store.get('goals',[]),
    add(){const t=document.getElementById('gl-t').value.trim(),d=document.getElementById('gl-d').value;if(!t){Toast.error('Enter goal');return;}this.goals.push({t,d,milestones:[],id:Date.now()});Store.set('goals',this.goals);document.getElementById('gl-t').value='';document.getElementById('gl-d').value='';this.render();},
    remove(id){this.goals=this.goals.filter(x=>x.id!==id);Store.set('goals',this.goals);this.render();},
    toggleMilestone(gid,mid){const g=this.goals.find(x=>x.id===gid);if(g){const m=g.milestones.find(x=>x.id===mid);if(m){m.done=!m.done;Store.set('goals',this.goals);this.render();}}},
    render(){const el=document.getElementById('gl-list');if(!this.goals.length){el.innerHTML='<div class="empty-state"><p>No goals yet.</p></div>';return;}
      el.innerHTML=this.goals.map(g=>{const done=g.milestones.filter(m=>m.done).length,total=g.milestones.length,pct=total?Math.round(done/total*100):0;
        return `<div class="card" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center"><strong>${esc(g.t)}</strong><button class="btn btn-danger btn-sm" onclick="GL.remove(${g.id})">✕</button></div><div style="font-size:0.78rem;color:var(--text-muted)">${g.d||'No deadline'} | ${done}/${total} milestones</div><div class="progress-bar" style="margin-top:6px"><div class="fill" style="width:${pct}%"></div></div></div>`;}).join('');},
    load(){this.render();}
  };
  Router.registerRoute('#goal-tracker','Goal Tracker',render);
})();