(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⏳</span>Exam Countdown</div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:2;margin-bottom:0"><label>Exam</label><input type="text" id="ex-n" placeholder="Physics Midterm"></div><div class="form-group" style="margin-bottom:0"><label>Date</label><input type="date" id="ex-d"></div><div class="form-group" style="margin-bottom:0"><label>Time</label><input type="time" id="ex-t" value="09:00"></div><button class="btn btn-primary btn-sm" onclick="Exam.add()" style="align-self:flex-end">Add</button></div>
    <div id="ex-list"></div></div>`;
    Exam.load();Exam.tick();
  }
  window.Exam={items:Store.get('exams',[]),iv:null,
    add(){const n=document.getElementById('ex-n').value.trim(),d=document.getElementById('ex-d').value,t=document.getElementById('ex-t').value;if(!n||!d){Toast.error('Enter name and date');return;}this.items.push({n,d,t:t||'00:00',dt:new Date(d+'T'+(t||'00:00')).getTime(),id:Date.now()});Store.set('exams',this.items);document.getElementById('ex-n').value='';document.getElementById('ex-d').value='';this.render();},
    remove(id){this.items=this.items.filter(e=>e.id!==id);Store.set('exams',this.items);this.render();},
    tl(ts){const df=ts-Date.now();if(df<=0)return'Started!';const s=Math.floor(df/1000),d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60),sec=s%60;if(d>0)return`${d}d ${h}h ${m}m`;if(h>0)return`${h}h ${m}m ${sec}s`;return`${m}m ${sec}s`;},
    render(){const el=document.getElementById('ex-list');const up=this.items.filter(e=>e.dt>Date.now()).sort((a,b)=>a.dt-b.dt);if(!up.length){el.innerHTML='<div class="empty-state"><p>No upcoming exams.</p></div>';return;}el.innerHTML=up.map(e=>`<div class="tool-card" style="margin-bottom:6px"><div class="tool-icon">⏳</div><div class="tool-info" style="flex:1"><h3>${esc(e.n)}</h3><p>${e.d} ${e.t}</p></div><div style="text-align:right"><div style="font-size:1rem;font-weight:700;color:var(--accent)" id="ex-timer-${e.id}">${this.tl(e.dt)}</div><button class="btn btn-danger btn-sm" onclick="Exam.remove(${e.id})" style="margin-top:4px">✕</button></div></div>`).join('');},
    tick(){if(this.iv)clearInterval(this.iv);this.iv=setInterval(()=>{this.items.forEach(e=>{const el=document.getElementById('ex-timer-'+e.id);if(el)el.textContent=this.tl(e.dt);});},1000);},
    load(){this.render();}};
  Router.registerRoute('#exam-countdown','Exam Countdown',render);
})();