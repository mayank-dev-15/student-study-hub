(function(){
  const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],DAY_FULL=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],HOURS=Array.from({length:14},(_,i)=>i+7);
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📅</span>Weekly Schedule</div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:2;margin-bottom:0"><label>Event</label><input type="text" id="sc-t" placeholder="Math Lecture"></div><div class="form-group" style="margin-bottom:0"><label>Day</label><select id="sc-d">${DAY_FULL.map((d,i)=>`<option value="${i}">${d}</option>`).join('')}</select></div><div class="form-group" style="margin-bottom:0"><label>Start</label><select id="sc-s">${HOURS.map(h=>`<option value="${h}">${h}:00</option>`).join('')}</select></div><div class="form-group" style="margin-bottom:0"><label>End</label><select id="sc-e">${HOURS.map(h=>`<option value="${h+1}">${h+1}:00</option>`).join('')}</select></div><button class="btn btn-primary btn-sm" onclick="Sched.add()" style="align-self:flex-end">Add</button></div>
    <div id="sc-grid" class="table-wrap"></div>
    <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end"><button class="btn btn-secondary btn-sm" onclick="Sched.exportICS()">Export iCal</button><button class="btn btn-danger btn-sm" onclick="Sched.clear()">Clear</button></div></div>`;
    Sched.load();
  }
  window.Sched={events:Store.get('schedule_events',[]),colors:['#7b9aff','#34d399','#f87171','#fbbf24','#c084fc','#22d3ee','#fb923c'],
    add(){const t=document.getElementById('sc-t').value.trim(),d=parseInt(document.getElementById('sc-d').value),s=parseInt(document.getElementById('sc-s').value),e=parseInt(document.getElementById('sc-e').value);if(!t){Toast.error('Enter event');return;}if(e<=s){Toast.error('End > start');return;}this.events.push({t,d,s,e,id:Date.now(),c:this.colors[this.events.length%this.colors.length]});Store.set('schedule_events',this.events);document.getElementById('sc-t').value='';this.render();},
    remove(id){this.events=this.events.filter(e=>e.id!==id);Store.set('schedule_events',this.events);this.render();},
    clear(){this.events=[];Store.remove('schedule_events');this.render();},
    render(){const el=document.getElementById('sc-grid');let h='<table><thead><tr><th>Time</th>';DAYS.forEach(d=>h+=`<th>${d}</th>`);h+='</tr></thead><tbody>';
      HOURS.forEach(hr=>{h+=`<tr><td style="font-size:0.72rem;color:var(--text-muted)">${hr}:00</td>`;for(let d=0;d<7;d++){const ev=this.events.filter(e=>e.d===d&&hr>=e.s&&hr<e.e);if(ev.length&&hr===ev[0].s){const e=ev[0];h+=`<td style="padding:2px"><div style="background:${e.c}22;border-left:3px solid ${e.c};border-radius:4px;padding:3px 6px;font-size:0.65rem;color:${e.c};cursor:pointer" onclick="Sched.remove(${e.id})">${esc(e.t)}</div></td>`;}else h+='<td></td>';}h+='</tr>';});
      h+='</tbody></table>';el.innerHTML=h;},
    exportICS(){let ics='BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StudyHub//EN
';const now=new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';this.events.forEach(e=>{const d=new Date();d.setDate(d.getDate()-d.getDay()+1+e.d);const ds=d.toISOString().split('T')[0].replace(/-/g,'');ics+=`BEGIN:VEVENT
DTSTART:${ds}T${String(e.s).padStart(2,'0')}0000
DTEND:${ds}T${String(e.e).padStart(2,'0')}0000
SUMMARY:${e.t}
DTSTAMP:${now}
END:VEVENT
`;});ics+='END:VCALENDAR';const blob=new Blob([ics],{type:'text/calendar'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='schedule.ics';a.click();URL.revokeObjectURL(u);},
    load(){this.render();}};
  Router.registerRoute('#schedule','Schedule Planner',render);
})();