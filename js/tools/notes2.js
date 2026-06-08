(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🗂️</span>Study Session Logger</div>
    <div class="form-row"><div class="form-group" style="flex:2;margin-bottom:0"><label>Subject</label><input type="text" id="ssl-sub" placeholder="Mathematics"></div><div class="form-group" style="margin-bottom:0"><label>Duration (min)</label><input type="number" id="ssl-dur" value="30" min="1"></div><button class="btn btn-primary btn-sm" onclick="SSL.add()" style="align-self:flex-end">Log</button></div>
    <div id="ssl-log"></div>
    <div class="stats-row" style="margin-top:12px"><div class="stat-box"><div class="stat-value" id="ssl-week">0m</div><div class="stat-label">This Week</div></div><div class="stat-box"><div class="stat-value" id="ssl-month">0m</div><div class="stat-label">This Month</div></div><div class="stat-box"><div class="stat-value" id="ssl-total">0m</div><div class="stat-label">Total</div></div></div></div>`;
    SSL.load();
  }
  window.SSL={
    sessions:Store.get('study_sessions',[]),
    add(){const s=document.getElementById('ssl-sub').value.trim(),d=parseInt(document.getElementById('ssl-dur').value)||0;if(!s||!d){Toast.error('Enter subject and duration');return;}this.sessions.push({s,d,t:Date.now()});Store.set('study_sessions',this.sessions);document.getElementById('ssl-sub').value='';document.getElementById('ssl-dur').value='';this.render();},
    remove(i){this.sessions.splice(i,1);Store.set('study_sessions',this.sessions);this.render();},
    render(){const el=document.getElementById('ssl-log');const now=Date.now();const week=this.sessions.filter(x=>x.t>now-604800000),month=this.sessions.filter(x=>x.t>now-2592000000);
      const ws=week.reduce((a,x)=>a+x.d,0),ms=month.reduce((a,x)=>a+x.d,0),ts=this.sessions.reduce((a,x)=>a+x.d,0);
      document.getElementById('ssl-week').textContent=Math.round(ws/60)+'h';document.getElementById('ssl-month').textContent=Math.round(ms/60)+'h';document.getElementById('ssl-total').textContent=Math.round(ts/60)+'h';
      if(!this.sessions.length){el.innerHTML='<div class="empty-state"><p>No sessions logged.</p></div>';return;}
      el.innerHTML=this.sessions.slice().reverse().slice(0,10).map((x,i)=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:0.82rem"><span>${esc(x.s)} — ${x.d}min</span><span style="color:var(--text-muted)">${new Date(x.t).toLocaleDateString()}</span><button class="btn btn-danger btn-sm" style="padding:1px 6px;font-size:0.65rem" onclick="SSL.remove(${this.sessions.length-1-i})">✕</button></div>`).join('');},
    load(){this.render();}
  };
  Router.registerRoute('#session-logger','Session Logger',render);
})();