(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌍</span>Time Zone Converter</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>From</label><select id="tz-from" onchange="TZ.cv()"><option value="UTC">UTC</option><option value="IST">IST (India)</option><option value="EST">EST (US East)</option><option value="PST">PST (US West)</option><option value="CET">CET (Europe)</option><option value="JST">JST (Japan)</option><option value="AEST">AEST (Australia)</option></select></div>
    <div class="form-group" style="margin-bottom:0"><label>To</label><select id="tz-to" onchange="TZ.cv()"><option value="IST">IST (India)</option><option value="UTC">UTC</option><option value="EST">EST (US East)</option><option value="PST">PST (US West)</option><option value="CET">CET (Europe)</option><option value="JST">JST (Japan)</option><option value="AEST">AEST (Australia)</option></select></div></div>
    <div class="form-group"><label>Time</label><input type="time" id="tz-time" value="12:00" oninput="TZ.cv()"></div>
    <div id="tz-result" class="result-box" style="font-size:1.5rem">--:--</div>
    <div id="tz-detail" style="text-align:center;font-size:0.78rem;color:var(--text-muted);margin-top:4px"></div></div>`;
    TZ.cv();
  }
  var offsets={UTC:0,IST:5.5,EST:-5,PST:-8,CET:1,JST:9,AEST:10};
  window.TZ={
    cv(){
      let from=document.getElementById('tz-from').value,to=document.getElementById('tz-to').value;
      let t=document.getElementById('tz-time').value.split(':'),h=parseInt(t[0])||0,m=parseInt(t[1])||0;
      let utcMin=h*60+m-offsets[from]*60,toMin=utcMin+offsets[to]*60;
      toMin=((toMin%(24*60))+(24*60))%(24*60);
      let rh=Math.floor(toMin/60),rm=toMin%60;
      document.getElementById('tz-result').textContent=String(rh).padStart(2,'0')+':'+String(rm).padStart(2,'0');
      document.getElementById('tz-detail').textContent=from+' → '+to+' | UTC'+(offsets[to]>=0?'+':'')+offsets[to];
    }
  };
  Router.registerRoute('#timezone','Time Zone Converter',render);
})();