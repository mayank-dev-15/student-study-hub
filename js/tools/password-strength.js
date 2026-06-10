(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔐</span>Password Strength Analyzer</div>
    <div class="form-group"><label>Password</label><input type="password" id="ps-in" placeholder="Enter password..." oninput="PS.analyze()"></div>
    <div class="progress-bar" style="margin-bottom:8px"><div class="fill" id="ps-bar" style="width:0%;background:var(--red)"></div></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="ps-score" style="color:var(--red)">0%</div><div class="stat-label">Score</div></div><div class="stat-box"><div class="stat-value" id="ps-len">0</div><div class="stat-label">Length</div></div><div class="stat-box"><div class="stat-value" id="ps-time">Instant</div><div class="stat-label">Crack Time</div></div><div class="stat-box"><div class="stat-value" id="ps-entropy">0</div><div class="stat-label">Entropy</div></div></div>
    <div id="ps-checks" style="margin-top:12px"></div></div>`;
  }
  window.PS={
    analyze(){
      var p=document.getElementById('ps-in').value;var score=0,checks=[];
      if(p.length>=8){score+=20;checks.push({ok:true,text:'At least 8 characters'});}else{checks.push({ok:false,text:'At least 8 characters'});}
      if(p.length>=12){score+=10;checks.push({ok:true,text:'At least 12 characters'});}else{checks.push({ok:false,text:'At least 12 characters (recommended)'});}
      if(/[a-z]/.test(p)){score+=15;checks.push({ok:true,text:'Lowercase letters'});}else{checks.push({ok:false,text:'Add lowercase letters'});}
      if(/[A-Z]/.test(p)){score+=15;checks.push({ok:true,text:'Uppercase letters'});}else{checks.push({ok:false,text:'Add uppercase letters'});}
      if(/[0-9]/.test(p)){score+=15;checks.push({ok:true,text:'Numbers'});}else{checks.push({ok:false,text:'Add numbers'});}
      if(/[^a-zA-Z0-9]/.test(p)){score+=15;checks.push({ok:true,text:'Special characters'});}else{checks.push({ok:false,text:'Add special characters'});}
      if(!/(.)\1{2,}/.test(p)){score+=10;checks.push({ok:true,text:'No repeated characters'});}else{checks.push({ok:false,text:'Avoid repeated characters'});}
      var col=score<40?'var(--red)':score<60?'var(--orange)':score<80?'var(--yellow)':'var(--green)';
      document.getElementById('ps-bar').style.width=score+'%';document.getElementById('ps-bar').style.background=col;
      document.getElementById('ps-score').textContent=score+'%';document.getElementById('ps-score').style.color=col;
      document.getElementById('ps-len').textContent=p.length;
      var sets=0;if(/[a-z]/.test(p))sets+=26;if(/[A-Z]/.test(p))sets+=26;if(/[0-9]/.test(p))sets+=10;if(/[^a-zA-Z0-9]/.test(p))sets+=32;
      var entropy=Math.floor(p.length*Math.log2(sets||1));document.getElementById('ps-entropy').textContent=entropy+' bits';
      var time=entropy<28?'Instant':entropy<36?'Seconds':entropy<60?'Minutes':entropy<80?'Hours':entropy<100?'Days':entropy<128?'Years':'Centuries';
      document.getElementById('ps-time').textContent=time;
      document.getElementById('ps-checks').innerHTML=checks.map(function(ch){return `<div style="padding:4px 0;font-size:0.82rem;color:${ch.ok?'var(--green)':'var(--red)'}">${ch.ok?'✓':'✗'} ${ch.text}</div>`;}).join('');
    }
  };
  Router.registerRoute('#password-strength','Password Analyzer',render);
})();