(function(){
  function render(c){
    const data=Store.exportAll(),size=Math.round(data.length/1024*10)/10;
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">💾</span>Data Manager</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value">${size}KB</div><div class="stat-label">Data Size</div></div><div class="stat-box"><div class="stat-value">${Object.keys(localStorage).filter(k=>k.startsWith('sh_')).length}</div><div class="stat-label">Items</div></div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="PM.exportData()">📤 Export JSON</button><button class="btn btn-secondary btn-sm" onclick="document.getElementById('pm-import').click()">📥 Import JSON</button><input type="file" id="pm-import" accept=".json" style="display:none" onchange="PM.importData(event)"><button class="btn btn-danger btn-sm" onclick="PM.clearAll()">🗑 Clear All</button></div>
    <textarea id="pm-data" rows="6" readonly style="font-size:0.75rem">${esc(data)}</textarea></div>`;
  }
  window.PM={
    exportData(){const d=Store.exportAll();const blob=new Blob([d],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='studyhub-backup.json';a.click();URL.revokeObjectURL(url);Toast.success('Exported!');},
    importData(e){const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=(ev)=>{if(Store.importAll(ev.target.result)){Toast.success('Data imported! Reloading...');setTimeout(()=>location.reload(),1000);}else Toast.error('Invalid file');};reader.readAsText(file);},
    clearAll(){confirmDialog('Clear ALL data? This cannot be undone.').then(ok=>{if(ok){Store.clearAll();Toast.success('All data cleared!');setTimeout(()=>location.reload(),1000);}});}
  };
  Router.registerRoute('#persistence','Data Manager',render);
})();