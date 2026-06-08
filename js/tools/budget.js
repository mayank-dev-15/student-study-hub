(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">💰</span>Student Budget</div>
    <div class="form-row" style="margin-bottom:12px">
      <div class="form-group" style="flex:2;margin-bottom:0"><label>Description</label><input type="text" id="bud-d" placeholder="e.g., Tuition"></div>
      <div class="form-group" style="flex:1;margin-bottom:0"><label>Amount</label><input type="number" id="bud-a" placeholder="0.00" step="0.01"></div>
      <div class="form-group" style="margin-bottom:0"><label>Type</label><select id="bud-t"><option value="income">Income</option><option value="expense">Expense</option></select></div>
      <button class="btn btn-primary btn-sm" onclick="Bud.add()" style="align-self:flex-end">Add</button>
    </div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="bud-inc" style="color:var(--green)">$0</div><div class="stat-label">Income</div></div><div class="stat-box"><div class="stat-value" id="bud-exp" style="color:var(--red)">$0</div><div class="stat-label">Expenses</div></div><div class="stat-box"><div class="stat-value" id="bud-bal">$0</div><div class="stat-label">Balance</div></div></div>
    <div id="bud-list" class="table-wrap" style="margin-top:12px"></div>
    <div style="margin-top:12px;text-align:right"><button class="btn btn-danger btn-sm" onclick="Bud.clear()">Clear All</button></div></div>`;
    Bud.load();
  }
  window.Bud={
    items:Store.get('budget_items',[]),
    add(){const d=document.getElementById('bud-d').value.trim(),a=parseFloat(document.getElementById('bud-a').value),t=document.getElementById('bud-t').value;if(!d||isNaN(a)||a<=0){Toast.error('Enter valid description and amount');return;}this.items.push({d,a,t,id:Date.now()});Store.set('budget_items',this.items);document.getElementById('bud-d').value='';document.getElementById('bud-a').value='';this.render();},
    remove(id){this.items=this.items.filter(x=>x.id!==id);Store.set('budget_items',this.items);this.render();},
    clear(){this.items=[];Store.remove('budget_items');this.render();},
    render(){
      const inc=this.items.filter(x=>x.t==='income').reduce((s,x)=>s+x.a,0),exp=this.items.filter(x=>x.t==='expense').reduce((s,x)=>s+x.a,0),bal=inc-exp;
      document.getElementById('bud-inc').textContent='$'+inc.toFixed(2);document.getElementById('bud-exp').textContent='$'+exp.toFixed(2);
      const bel=document.getElementById('bud-bal');bel.textContent='$'+bal.toFixed(2);bel.style.color=bal>=0?'var(--green)':'var(--red)';
      const el=document.getElementById('bud-list');
      if(!this.items.length){el.innerHTML='<div class="empty-state"><p>No entries yet.</p></div>';return;}
      const rows=this.items.map(x=>`<tr><td>${esc(x.d)}</td><td><span class="badge ${x.t==='income'?'badge-green':'badge-red'}">${x.t}</span></td><td style="text-align:right;font-weight:600;color:${x.t==='income'?'var(--green)':'var(--red)'}">${x.t==='income'?'+':'-'}$${x.a.toFixed(2)}</td><td><button class="btn btn-danger btn-sm" onclick="Bud.remove(${x.id})">✕</button></td></tr>`).join('');
      el.innerHTML=`<table><thead><tr><th>Description</th><th>Type</th><th style="text-align:right">Amount</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
    },
    load(){this.render();}
  };
  Router.registerRoute('#budget','Student Budget',render);
})();