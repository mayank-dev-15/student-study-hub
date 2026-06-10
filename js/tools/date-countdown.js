(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📅</span>Countdown to Date</div>
    <div class="form-group"><label>Target Date</label><input type="date" id="dc-date" onchange="DC.calc()"></div>
    <div class="form-group"><label>Label (optional)</label><input type="text" id="dc-label" placeholder="e.g., Exam, Birthday" oninput="DC.calc()"></div>
    <div id="dc-result" style="text-align:center;padding:20px"></div></div>`;
    var d=new Date();d.setFullYear(d.getFullYear()+1);document.getElementById('dc-date').value=d.toISOString().split('T')[0];DC.calc();
  }
  window.DC={
    calc(){
      var date=document.getElementById('dc-date').value;if(!date)return;
      var target=new Date(date);var now=new Date();var diff=target-now;
      var label=document.getElementById('dc-label').value||'Event';
      if(diff<=0){document.getElementById('dc-result').innerHTML='<div style="font-size:1.5rem;color:var(--green)">🎉 This date has passed!</div>';return;}
      var days=Math.floor(diff/86400000),hours=Math.floor((diff%86400000)/3600000),mins=Math.floor((diff%3600000)/60000),secs=Math.floor((diff%60000)/1000);
      var weeks=Math.floor(days/7),months=Math.floor(days/30);
      document.getElementById('dc-result').innerHTML=`<div style="font-size:1.3rem;font-weight:700;color:var(--accent);margin-bottom:8px">${label}</div><div class="stats-row"><div class="stat-box"><div class="stat-value">${days}</div><div class="stat-label">Days</div></div><div class="stat-box"><div class="stat-value">${hours}</div><div class="stat-label">Hours</div></div><div class="stat-box"><div class="stat-value">${mins}</div><div class="stat-label">Minutes</div></div><div class="stat-box"><div class="stat-value">${secs}</div><div class="stat-label">Seconds</div></div></div><div style="margin-top:8px;font-size:0.82rem;color:var(--text-muted)">= ${weeks} weeks · ~${months} months</div>`;
    }
  };
  Router.registerRoute('#date-countdown','Date Countdown',render);
})();