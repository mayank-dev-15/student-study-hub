(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📚</span>Reading List</div>
    <div class="form-row" style="margin-bottom:12px"><div class="form-group" style="flex:2;margin-bottom:0"><label>Title</label><input type="text" id="rl-t" placeholder="Book title"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Author</label><input type="text" id="rl-a" placeholder="Author"></div><div class="form-group" style="margin-bottom:0"><label>Status</label><select id="rl-s"><option value="tbr">To Read</option><option value="reading">Reading</option><option value="done">Done</option></select></div><button class="btn btn-primary btn-sm" onclick="RL.add()" style="align-self:flex-end">Add</button></div>
    <div id="rl-list"></div></div>`;
    RL.load();
  }
  window.RL={
    books:Store.get('reading_list',[]),
    add(){const t=document.getElementById('rl-t').value.trim(),a=document.getElementById('rl-a').value.trim(),s=document.getElementById('rl-s').value;if(!t){Toast.error('Enter title');return;}this.books.push({t,a,s,p:0,id:Date.now()});Store.set('reading_list',this.books);document.getElementById('rl-t').value='';document.getElementById('rl-a').value='';this.render();},
    remove(id){this.books=this.books.filter(x=>x.id!==id);Store.set('reading_list',this.books);this.render();},
    setProgress(id,p){const b=this.books.find(x=>x.id===id);if(b){b.p=p;Store.set('reading_list',this.books);this.render();}},
    render(){const el=document.getElementById('rl-list');if(!this.books.length){el.innerHTML='<div class="empty-state"><p>No books yet.</p></div>';return;}
      const sc={tbr:'badge-yellow',reading:'badge-cyan',badge-green':''};const sl={tbr:'To Read',reading:'Reading',done:'Done'};
      el.innerHTML=this.books.map(b=>`<div class="tool-card" style="margin-bottom:6px"><div class="tool-icon">📖</div><div class="tool-info" style="flex:1"><h3>${esc(b.t)}</h3><p>${esc(b.a||'Unknown')} <span class="badge ${sc[b.s]}">${sl[b.s]}</span></p><div class="progress-bar" style="margin-top:4px"><div class="fill" style="width:${b.p}%"></div></div></div><div style="display:flex;gap:4px;align-items:center"><input type="number" value="${b.p}" min="0" max="100" style="width:45px;text-align:center;padding:2px;font-size:0.75rem" onchange="RL.setProgress(${b.id},parseInt(this.value)||0)"><span style="font-size:0.7rem">%</span><button class="btn btn-danger btn-sm" onclick="RL.remove(${b.id})">✕</button></div></div>`).join('');},
    load(){this.render();}
  };
  Router.registerRoute('#reading-list','Reading List',render);
})();