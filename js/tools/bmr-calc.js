(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔥</span>BMR & TDEE Calculator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Gender</label><select id="bmr-g"><option value="m">Male</option><option value="f">Female</option></select></div><div class="form-group" style="margin-bottom:0"><label>Age</label><input type="number" id="bmr-a" value="20" style="width:60px"></div><div class="form-group" style="margin-bottom:0"><label>Weight (kg)</label><input type="number" id="bmr-w" value="70"></div><div class="form-group" style="margin-bottom:0"><label>Height (cm)</label><input type="number" id="bmr-h" value="175"></div></div>
    <div class="form-group"><label>Activity Level</label><select id="bmr-act"><option value="1.2">Sedentary</option><option value="1.375">Light</option><option value="1.55" selected>Moderate</option><option value="1.725">Active</option><option value="1.9">Very Active</option></select></div>
    <button class="btn btn-primary btn-sm" onclick="BMR.calc()">Calculate</button>
    <div id="bmr-result" style="margin-top:12px"></div></div>`;
  }
  window.BMR={
    calc(){
      let g=document.getElementById('bmr-g').value,a=parseFloat(document.getElementById('bmr-a').value)||0,w=parseFloat(document.getElementById('bmr-w').value)||0,h=parseFloat(document.getElementById('bmr-h').value)||0,act=parseFloat(document.getElementById('bmr-act').value)||1;
      let bmr=g==='m'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
      let tdee=Math.round(bmr*act);
      document.getElementById('bmr-result').innerHTML=`<div class="stats-row"><div class="stat-box"><div class="stat-value">${Math.round(bmr)}</div><div class="stat-label">BMR (cal/day)</div></div><div class="stat-box"><div class="stat-value">${tdee}</div><div class="stat-label">TDEE (cal/day)</div></div></div>
      <div style="margin-top:8px;font-size:0.78rem;color:var(--text-muted)">To lose: ${tdee-500} cal/day | To gain: ${tdee+500} cal/day</div>`;
    }
  };
  Router.registerRoute('#bmr-calc','BMR Calculator',render);
})();