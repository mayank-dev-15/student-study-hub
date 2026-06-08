(function(){
  function render(c){
    const sessions=Store.get('pomo_sessions',0),today=Store.get('pomo_today_count',0),week=Store.get('pomo_week',0);
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📊</span>Pomodoro Statistics</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value">${sessions}</div><div class="stat-label">Total Sessions</div></div><div class="stat-box"><div class="stat-value">${today}</div><div class="stat-label">Today</div></div><div class="stat-box"><div class="stat-value">${week}</div><div class="stat-label">This Week</div></div><div class="stat-box"><div class="stat-value">${Math.round(sessions*25/60)}h</div><div class="stat-label">Focus Time</div></div></div>
    <div id="pomocal" style="margin-top:16px"></div></div>`;
    PomStat.renderCal();
  }
  window.PomStat={
    renderCal(){
      const el=document.getElementById('pomocal');if(!el)return;
      const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      let html='<table><thead><tr>'+days.map(d=>`<th>${d}</th>`).join('')+'</tr></thead><tbody>';
      const now=new Date();const start=new Date();start.setDate(now.getDate()-now.getDay());
      for(let w=0;w<5;w++){html+='<tr>';for(let d=0;d<7;d++){const dt=new Date(start);dt.setDate(start.getDate()+w*7+d);const isPast=dt<=now;html+=`<td style="text-align:center;padding:4px"><div style="width:28px;height:28px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:0.72rem;background:${isPast?'var(--accent-glow)':'var(--bg-input)'};color:${isPast?'var(--accent)':'var(--text-muted)'}">${dt.getDate()}</div></td>`;};html+='</tr>';}
      html+='</tbody></table>';el.innerHTML=html;
    }
  };
  Router.registerRoute('#pomodoro-stats','Pomodoro Stats',render);
})();