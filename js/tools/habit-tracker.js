(function(){
  const DAYS=7;
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔄</span>Habit Tracker</div>
    <div class="form-row" style="margin-bottom:12px"><input type="text" id="hb-name" placeholder="New habit..." style="flex:1" onkeydown="if(event.key==='Enter')Habit.add()"><button class="btn btn-primary btn-sm" onclick="Habit.add()">Add</button></div>
    <div id="hb-grid"></div></div>`;
    Habit.load();
  }
  window.Habit={
    habits:Store.get('habits',[]),today:new Date().toDateString(),
    add(){const n=document.getElementById('hb-name').value.trim();if(!n)return;this.habits.push({n,created:Date.now(),log:{}});Store.set('habits',this.habits);document.getElementById('hb-name').value='';this.render();},
    remove(i){this.habits.splice(i,1);Store.set('habits',this.habits);this.render();},
    toggle(i){const d=this.today,h=this.habits[i];h.log[d]=!h.log[d];Store.set('habits',this.habits);this.render();},
    streak(i){const h=this.habits[i];let s=0;let dt=new Date();while(true){const k=dt.toDateString();if(h.log[k]){s++;dt.setDate(dt.getDate()-1);}else break;}return s;},
    render(){
      const el=document.getElementById('hb-grid');if(!this.habits.length){el.innerHTML='<div class="empty-state"><p>No habits yet.</p></div>';return;}
      const days=Array.from({length:DAYS},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(DAYS-1-i));return d.toDateString();});
      let html='<div style="overflow-x:auto"><table><thead><tr><th>Habit</th>';
      days.forEach(d=>{const dd=new Date(d);html+=`<th style="font-size:0.68rem">${dd.toLocaleDateString('en',{weekday:'short'})}<br>${dd.getDate()}</th>`;});
      html+='<th>Streak</th><th></th></tr></thead><tbody>';
      this.habits.forEach((h,i)=>{const ck=h.log[this.today]?'checked':'';
        html+=`<tr><td><strong>${esc(h.n)}</strong></td>`;
        days.forEach(d=>{const done=h.log[d]?'✓':'';const col=done?'color:var(--green);font-weight:700':'color:var(--text-muted)';html+=`<td style="${col};text-align:center;font-size:1rem">${done}</td>`;});
        const s=this.streak(i);html+=`<td><span class="badge ${s>=7?'badge-green':s>=3?'badge-yellow':'badge-purple'}">${s}d</span></td><td><button class="btn btn-danger btn-sm" onclick="Habit.remove(${i})">✕</button></td></tr>`;
      });
      html+='</tbody></table></div>';el.innerHTML=html;
    },
    load(){this.render();}
  };
  Router.registerRoute('#habit-tracker','Habit Tracker',render);
})();