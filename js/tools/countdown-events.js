(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📅</span>Countdown Events</div>
    <div class="form-row"><div class="form-group" style="flex:2;margin-bottom:0"><label>Event Name</label><input type="text" id="cdev-name" placeholder="e.g., Final Exam"></div><div class="form-group" style="margin-bottom:0"><label>Date</label><input type="date" id="cdev-date"></div><button class="btn btn-primary btn-sm" onclick="CDEV.add()" style="align-self:flex-end">Add</button></div>
    <div id="cdev-list" style="margin-top:12px"></div></div>`;
    CDEV.load();
  }
  window.CDEV={
    events:Store.get('countdown_events',[]),
    add(){let n=document.getElementById('cdev-name').value.trim(),d=document.getElementById('cdev-date').value;if(!n||!d){Toast.error('Enter name and date');return;}this.events.push({n,d,id:Date.now()});Store.set('countdown_events',this.events);document.getElementById('cdev-name').value='';document.getElementById('cdev-date').value='';this.render();},
    remove(id){this.events=this.events.filter(e=>e.id!==id);Store.set('countdown_events',this.events);this.render();},
    render(){
      let el=document.getElementById('cdev-list');let now=Date.now();
      let sorted=this.events.filter(e=>new Date(e.d+'T23:59:59').getTime()>now).sort((a,b)=>new Date(a.d)-new Date(b.d));
      if(!sorted.length){el.innerHTML='<div class="empty-state"><p>No upcoming events.</p></div>';return;}
      el.innerHTML=sorted.map(e=>{let days=Math.ceil((new Date(e.d+'T23:59:59')-now)/86400000);
        let cls=days<=1?'badge-red':days<=7?'badge-yellow':'badge-green';
        return`<div class="tool-card" style="margin-bottom:6px"><div class="tool-icon">📅</div><div class="tool-info" style="flex:1"><h3>${esc(e.n)}</h3><p>${e.d}</p></div><span class="badge ${cls}">${days}d</span><button class="btn btn-danger btn-sm" onclick="CDEV.remove(${e.id})">✕</button></div>`;}).join('');
    },
    load(){this.render();}
  };
  Router.registerRoute('#countdown-events','Countdown Events',render);
})();