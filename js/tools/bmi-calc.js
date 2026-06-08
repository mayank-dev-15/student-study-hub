(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⚖️</span>BMI & Health Calculator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Weight (kg)</label><input type="number" id="bmi-w" value="70" step="0.1"></div><div class="form-group" style="margin-bottom:0"><label>Height (cm)</label><input type="number" id="bmi-h" value="170"></div><button class="btn btn-primary btn-sm" onclick="BMI.calc()" style="align-self:flex-end">Calculate</button></div>
    <div id="bmi-result" style="margin-top:16px;font-size:1.3rem;font-weight:700;color:var(--accent);text-align:center">-</div>
    <div id="bmi-cat" style="text-align:center;font-size:0.85rem;color:var(--text-muted)"></div>
    <div class="progress-bar" style="margin-top:12px"><div class="fill" id="bmi-bar" style="width:0%"></div></div>
    <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-muted);margin-top:4px"><span>16</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div></div>`;
    BMI.calc();
  }
  window.BMI={
    calc(){const w=parseFloat(document.getElementById('bmi-w').value)||0,h=(parseFloat(document.getElementById('bmi-h').value)||0)/100;if(!w||!h)return;const bmi=w/(h*h);let cat,col,bar;
      if(bmi<18.5){cat='Underweight';col='var(--cyan)';bar=(bmi/18.5)*25;}else if(bmi<25){cat='Normal';col='var(--green)';bar=25+((bmi-18.5)/6.5)*25;}else if(bmi<30){cat='Overweight';col='var(--yellow)';bar=50+((bmi-25)/5)*25;}else{cat='Obese';col='var(--red)';bar=Math.min(100,75+((bmi-30)/10)*25);}
      document.getElementById('bmi-result').textContent=bmi.toFixed(1);document.getElementById('bmi-result').style.color=col;document.getElementById('bmi-cat').textContent=cat;document.getElementById('bmi-cat').style.color=col;document.getElementById('bmi-bar').style.width=bar+'%';document.getElementById('bmi-bar').style.background=col;}
  };
  Router.registerRoute('#bmi-calc','BMI Calculator',render);
})();