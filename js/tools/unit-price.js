(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🏷️</span>Unit Price Calculator</div>
    <div class="form-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Product A</label><input type="number" id="up-a-price" placeholder="Price" step="0.01" oninput="UP.calc()"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Quantity</label><input type="number" id="up-a-qty" placeholder="Qty" step="0.01" oninput="UP.calc()"></div></div>
    <div class="form-row" style="margin-top:8px"><div class="form-group" style="flex:1;margin-bottom:0"><label>Product B</label><input type="number" id="up-b-price" placeholder="Price" step="0.01" oninput="UP.calc()"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Quantity</label><input type="number" id="up-b-qty" placeholder="Qty" step="0.01" oninput="UP.calc()"></div></div>
    <div id="up-result" style="margin-top:12px"></div></div>`;
  }
  window.UP={
    calc(){
      let ap=parseFloat(document.getElementById('up-a-price').value)||0,aq=parseFloat(document.getElementById('up-a-qty').value)||1;
      let bp=parseFloat(document.getElementById('up-b-price').value)||0,bq=parseFloat(document.getElementById('up-b-qty').value)||1;
      let ua=(ap/aq).toFixed(4),ub=(bp/bq).toFixed(4);
      let winner=parseFloat(ua)<parseFloat(ub)?'A':'B';
      document.getElementById('up-result').innerHTML=`<div class="stats-row"><div class="stat-box"><div class="stat-value">$${ua}</div><div class="stat-label">Product A / unit</div></div><div class="stat-box"><div class="stat-value">$${ub}</div><div class="stat-label">Product B / unit</div></div></div>
      <div style="text-align:center;margin-top:8px;font-size:0.9rem;color:${winner==='A'?'var(--green)':'var(--red)'}">Product ${winner} is cheaper per unit</div>`;
    }
  };
  Router.registerRoute('#unit-price','Unit Price Calculator',render);
})();