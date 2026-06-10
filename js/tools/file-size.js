(function(){
  var units=['B','KB','MB','GB','TB','PB'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">💾</span>File Size Converter</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Value</label><input type="number" id="fs-val" value="1" min="0" step="0.01" style="width:100px"></div>
    <div class="form-group" style="margin-bottom:0"><label>From</label><select id="fs-from" style="width:80px">${units.map(function(u,i){return `<option value="${i}">${u}</option>`;}).join('')}</select></div>
    <div class="form-group" style="margin-bottom:0"><label>To</label><select id="fs-to" style="width:80px">${units.map(function(u,i){return `<option value="${i}" ${i===2?'selected':''}>${u}</option>`;}).join('')}</select></div>
    <button class="btn btn-primary btn-sm" onclick="FS.calc()" style="align-self:flex-end">Convert</button></div>
    <div id="fs-result" style="margin-top:12px;font-size:1.3rem;font-weight:700;color:var(--accent);text-align:center"></div>
    <div id="fs-table" style="margin-top:12px"></div></div>`;
    FS.calc();
  }
  window.FS={
    calc(){
      var val=parseFloat(document.getElementById('fs-val').value)||0,from=parseInt(document.getElementById('fs-from').value),to=parseInt(document.getElementById('fs-to').value);
      var bytes=val*Math.pow(1024,from);var result=bytes/Math.pow(1024,to);
      document.getElementById('fs-result').textContent=result.toLocaleString()+' '+units[to];
      var table='<table><thead><tr><th>Unit</th><th>Value</th></tr></thead><tbody>';
      units.forEach(function(u,i){var v=bytes/Math.pow(1024,i);table+=`<tr><td>${u}</td><td style="font-family:monospace">${v.toLocaleString(undefined,{maximumFractionDigits:6})}</td></tr>`;});
      table+='</tbody></table>';document.getElementById('fs-table').innerHTML=table;
    }
  };
  Router.registerRoute('#file-size','File Size Converter',render);
})();