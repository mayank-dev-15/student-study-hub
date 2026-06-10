(function(){
  var fields=['Minute','Hour','Day of Month','Month','Day of Week'];
  var presets=[{name:'Every minute','val':'* * * * *'},{name':'Every hour','val':'0 * * * *'},{name:'Every day at midnight','val':'0 0 * * *'},{name:'Every Monday at 9am','val':'0 9 * * 1'},{name:'Every month 1st at midnight','val':'0 0 1 * *'},{name:'Every 5 minutes','val':'*/5 * * * *'},{name:'Every 15 minutes','val':'*/15 * * * *'},{name:'Every weekday at 8am','val':'0 8 * * 1-5'},{name:'Weekends at noon','val':'0 12 * * 0,6'},{name:'First Monday of month','val':'0 9 1-7 * 1'},{name:'Every quarter','val':'0 0 1 1,4,7,10 *'},{name:'Every 30 min 9-5 weekdays','val':'*/30 9-17 * * 1-5'}];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⏰</span>Cron Expression Builder</div>
    <div style="margin-bottom:12px"><strong>Presets:</strong><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">${presets.map(function(p,i){return `<button class="btn btn-sm btn-secondary" onclick="CRN.set(${i})" style="font-size:0.68rem;padding:4px 10px">${p.name}</button>`;}).join('')}</div></div>
    <div id="cr-fields"></div>
    <div id="cr-result" style="background:var(--bg-tertiary);padding:14px;border-radius:8px;font-family:monospace;font-size:1.2rem;text-align:center;margin-top:12px;color:var(--accent)">* * * * *</div>
    <div id="cr-desc" style="text-align:center;margin-top:8px;font-size:0.85rem;color:var(--text-secondary)"></div>
    <button class="btn btn-secondary btn-sm" style="margin:8px auto 0;display:block" onclick="navigator.clipboard.writeText(document.getElementById('cr-result').textContent);Toast.success('Copied!')">Copy Expression</button></div>`;
    var flds='';fields.forEach(function(f,i){flds+=`<div class="form-group" style="margin-bottom:8px"><label>${f}</label><input type="text" id="cr-${i}" placeholder="*" style="font-family:monospace" oninput="CRN.build()"></div>`;});
    document.getElementById('cr-fields').innerHTML=flds;CRN.set(0);
  }
  window.CRN={
    set(i){var v=presets[i].val.split(' ');for(var j=0;j<5;j++)document.getElementById('cr-'+j).value=v[j];CRN.build();},
    build(){var parts=[];for(var i=0;i<5;i++)parts.push(document.getElementById('cr-'+i).value||'*');var exp=parts.join(' ');document.getElementById('cr-result').textContent=exp;var desc=CRN.desc(parts);document.getElementById('cr-desc').textContent=desc;},
    desc(p){try{var min=p[0],hr=p[1],dom=p[2],mon=p[3],dow=p[4];var parts=[];if(min==='*')parts.push('Every minute');else if(min.startsWith('*/'))parts.push('Every '+min.split('/')[1]+' minutes');else parts.push('At minute '+min);if(hr!=='*')parts.push('during hour '+hr);if(dom!=='*')parts.push('on day '+dom);if(mon!=='*')parts.push('in month '+mon);if(dow!=='*&&dow!=='*')parts.push('on day '+dow+' of week');return parts.join(' ');}catch(e){return exp;}}
  };
  Router.registerRoute('#cron-builder','Cron Builder',render);
})();