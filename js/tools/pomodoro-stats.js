(function(){
  function render(c){
    let sessions=Store.get('pomo_sessions',0),today=Store.get('pomo_today',0);
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📊</span>Pomodoro Statistics</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value">${sessions}</div><div class="stat-label">Total Sessions</div></div><div class="stat-box"><div class="stat-value">${today}</div><div class="stat-label">Today</div></div><div class="stat-box"><div class="stat-value">${Math.round(sessions*25/60)}h</div><div class="stat-label">Focus Time</div></div></div>
    <div style="margin-top:16px"><div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px">Focus Heatmap (last 7 days)</div><div id="pomocal" style="display:flex;gap:4px;flex-wrap:wrap"></div></div></div>`;
    PomStat.renderCal();
  }
  window.PomStat={
    renderCal(){
      let el=document.getElementById('pomocal');if(!el)return;
      let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      let now=new Date();let html='';
      for(let i=6;i>=0;i--){
        let d=new Date();d.setDate(now.getDate()-i);
        let dayName=days[d.getDay()];
        let isToday=i===0;
        html+=`<div style="text-align:center;padding:6px 8px;border-radius:6px;background:${isToday?'var(--accent-glow)':'var(--bg-tertiary)'};min-width:40px"><div style="font-size:0.65rem;color:var(--text-muted)">${dayName}</div><div style="font-size:0.85rem;font-weight:600;color:${isToday?'var(--accent)':'var(--text-primary)'}">${d.getDate()}</div></div>`;
      }
      el.innerHTML=html;
    }
  };
  Router.registerRoute('#pomodoro-stats','Pomodoro Stats',render);
})();