(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">💸</span>Expense Splitter</div>
    <div class="form-group"><label>People (comma separated)</label><input type="text" id="es-people" placeholder="Alice, Bob, Charlie" oninput="ES.calc()"></div>
    <div id="es-expenses"></div>
    <button class="btn btn-secondary btn-sm" onclick="ES.addExpense()">+ Add Expense</button>
    <div id="es-result" style="margin-top:16px"></div></div>`;
    ES.addExpense();ES.calc();
  }
  window.ES={
    addExpense(){const d=document.getElementById('es-expenses');const id=Date.now();
      d.innerHTML+=`<div class="form-row" style="margin-bottom:6px" id="exp-${id}"><input type="text" placeholder="Description" style="flex:1" class="es-desc"><input type="number" placeholder="Amount" style="width:80px" class="es-amt" oninput="ES.calc()"><input type="text" placeholder="Paid by" style="width:100px" class="es-paid"><button class="btn btn-danger btn-sm" onclick="this.parentElement.remove();ES.calc()">✕</button></div>`;},
    calc(){const people=document.getElementById('es-people').value.split(',').map(x=>x.trim()).filter(x=>x);if(!people.length)return;
      const expenses=[];document.querySelectorAll('[id^="exp-"]').forEach(row=>{const desc=row.querySelector('.es-desc').value.trim(),amt=parseFloat(row.querySelector('.es-amt').value)||0,paid=row.querySelector('.es-paid').value.trim();if(amt>0)expenses.push({desc,amt,paid:paid||people[0]});});const total=expenses.reduce((s,e)=>s+e.amt,0),share=total/people.length;
      const balances={};people.forEach(p=>{balances[p]=0;});expenses.forEach(e=>{balances[e.paid]=(balances[e.paid]||0)+e.amt;});people.forEach(p=>{balances[p]-=share;});
      let html=`<strong>Total: $${total.toFixed(2)} | Each share: $${share.toFixed(2)}</strong><br>`;const debts=[];const creditors={...balances};Object.entries(creditors).forEach(([p,b])=>{if(b<-0.01)debts.push({p,owes:-b});else if(b>0.01)html+=`<div style="color:var(--green)">${esc(p)} should receive $${b.toFixed(2)}</div>`;else html+=`<div style="color:var(--text-muted)">${esc(p)} is settled</div>`;});
      document.getElementById('es-result').innerHTML=html;
    }
  };
  Router.registerRoute('#expense-split','Expense Splitter',render);
})();