(function(){
  var zones=[{name:'UTC',off:0},{name:'IST (India)',off:5.5},{name:'EST (New York)',off:-5},{name:'PST (LA)',off:-8},{name:'GMT (London)',off:0},{name:'CET (Berlin)',off:1},{name:'JST (Tokyo)',off:9},{name:'AEST (Sydney)',off:10},{name:'CST (China)',off:8},{name:'MST (Denver)',off:-7}];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌍</span>Meeting Time Planner</div>
    <div class="form-group"><label>Meeting Time</label><input type="time" id="mp-time" value="09:00" oninput="MP.calc()"></div>
    <div class="form-group"><label>Your Time Zone</label><select id="mp-tz" onchange="MP.calc()">${zones.map(function(z,i){return `<option value="${i}">${z.name} (UTC${z.off>=0?'+':''}${z.off})</option>`;}).join('')}</select></div>
    <div id="mp-grid" style="margin-top:12px"></div></div>`;
    MP.calc();
  }
  window.MP={
    calc(){
      var time=document.getElementById('mp-time').value;var tzIdx=parseInt(document.getElementById('mp-tz').value);var tz=zones[tzIdx];
      var parts=time.split(':');var h=parseInt(parts[0]),m=parseInt(parts[1]);
      var utcH=h-tz.off;var html='';
      zones.forEach(function(z){var lH=utcH+z.off;while(lH<0)lH+=24;while(lH>=24)lH-=24;
        var ampm=lH>=12?'PM':'AM';var dispH=lH%12||12;var cls=lH>=9&&lH<18?'badge-green':lH>=7&&lH<22?'badge-yellow':'badge-red';
        html+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)"><span><strong>${z.name}</strong> <span style="font-size:0.75rem;color:var(--text-muted)">UTC${z.off>=0?'+':''}${z.off}</span></span><span><strong style="font-family:monospace">${String(dispH).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}</strong> <span class="badge ${cls}">${lH>=9&&lH<18?'Working hrs':lH>=7&&lH<22?'Awake':'Sleep'}</span></div>`;
      });
      document.getElementById('mp-grid').innerHTML=html;
    }
  };
  Router.registerRoute('#meeting-planner','Meeting Planner',render);
})();