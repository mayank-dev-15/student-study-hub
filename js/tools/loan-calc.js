(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🏦</span>Loan EMI Calculator</div>
    <div class="form-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Principal ($)</label><input type="number" id="loan-p" value="100000"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Rate (%/yr)</label><input type="number" id="loan-r" value="7" step="0.1"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Tenure (years)</label><input type="number" id="loan-t" value="5"></div></div>
    <button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="LOAN.calc()">Calculate</button>
    <div id="loan-result" style="margin-top:12px"></div></div>`;
  }
  window.LOAN={
    calc(){
      let p=parseFloat(document.getElementById('loan-p').value)||0,r=((parseFloat(document.getElementById('loan-r').value)||0)/100)/12,n=(parseFloat(document.getElementById('loan-t').value)||0)*12;
      if(!r){document.getElementById('loan-result').innerHTML='<span style="color:var(--red)">Rate cannot be 0</span>';return;}
      let emi=p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
      let total=emi*n;
      document.getElementById('loan-result').innerHTML=`<div class="stats-row"><div class="stat-box"><div class="stat-value">$${Math.round(emi).toLocaleString()}</div><div class="stat-label">EMI / month</div></div><div class="stat-box"><div class="stat-value">$${Math.round(total).toLocaleString()}</div><div class="stat-label">Total Payment</div></div><div class="stat-box"><div class="stat-value">$${Math.round(total-p).toLocaleString()}</div><div class="stat-label">Total Interest</div></div></div>`;
    }
  };
  Router.registerRoute('#loan-calc','Loan Calculator',render);
})();