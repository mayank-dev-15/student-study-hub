(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔥</span>Calorie & Macro Calculator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Gender</label><select id="cal-g"><option value="m">Male</option><option value="f">Female</option></select></div><div class="form-group" style="margin-bottom:0"><label>Age</label><input type="number" id="cal-a" value="25" style="width:60px"></div><div class="form-group" style="margin-bottom:0"><label>Weight (kg)</label><input type="number" id="cal-w" value="70"></div><div class="form-group" style="margin-bottom:0"><label>Height (cm)</label><input type="number" id="cal-h" value="175"></div></div>
    <div class="form-group"><label>Activity</label><select id="cal-act"><option value="1.2">Sedentary</option><option value="1.375">Light</option><option value="1.55" selected>Moderate</option><option value="1.725">Active</option><option value="1.9">Very Active</option></select></div>
    <button class="btn btn-primary btn-sm" onclick="CAL.calc()">Calculate</button>
    <div id="cal-result" style="margin-top:12px"></div></div>`;
  }
  window.CAL={
    calc(){const g=document.getElementById('cal-g').value,a=parseFloat(document.getElementById('cal-a').value)||0,w=parseFloat(document.getElementById('cal-w').value)||0,h=parseFloat(document.getElementById('cal-h').value)||0,act=parseFloat(document.getElementById('cal-act').value)||1;
      const bmr=g==='m'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;const tdee=bmr*act;
      document.getElementById('cal-result').innerHTML=`<div class="stats-row"><div class="stat-box"><div class="stat-value">${Math.round(bmr)}</div><div class="stat-label">BMR (cal/day)</div></div><div class="stat-box"><div class="stat-value">${Math.round(tdee)}</div><div class="stat-label">TDEE (cal/day)</div></div></div>
      <div style="margin-top:8px;font-size:0.82rem;color:var(--text-secondary)">Macros @ TDEE: Protein ${Math.round(w*2)}g | Carbs ${Math.round(tdee*0.5/4)}g | Fat ${Math.round(tdee*0.25/9)}g</div>`;}
  };
  Router.registerRoute('#calorie-calc','Calorie Calculator',render);
})();