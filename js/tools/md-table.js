(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📊</span>Markdown Table Generator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Rows</label><input type="number" id="mt-rows" value="3" min="1" max="50" style="width:60px" oninput="MDT.gen()"></div>
    <div class="form-group" style="margin-bottom:0"><label>Cols</label><input type="number" id="mt-cols" value="3" min="1" max="20" style="width:60px" oninput="MDT.gen()"></div>
    <div class="form-group" style="margin-bottom:0"><label>Align</label><select id="mt-align" onchange="MDT.gen()"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div></div>
    <div id="mt-grid" style="margin:12px 0;overflow-x:auto"></div>
    <textarea id="mt-out" rows="6" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('mt-out').value);Toast.success('Copied!')">Copy Markdown</button></div>`;
    MDT.gen();
  }
  window.MDT={
    gen(){
      var r=parseInt(document.getElementById('mt-rows').value)||3,cl=parseInt(document.getElementById('mt-cols').value)||3,al=document.getElementById('mt-align').value;
      var html='<table><thead><tr>';for(var j=0;j<cl;j++)html+=`<th style="padding:4px"><input type="text" placeholder="Col ${j+1}" style="width:80px;padding:4px;background:var(--bg-input);border:1px solid var(--border);border-radius:4px;color:var(--text-primary);font-size:0.75rem" oninput="MDT.build()"></th>`;html+='</tr></thead><tbody>';
      for(var i=0;i<r;i++){html+='<tr>';for(var j=0;j<cl;j++)html+=`<td style="padding:4px"><input type="text" placeholder="Cell" style="width:80px;padding:4px;background:var(--bg-input);border:1px solid var(--border);border-radius:4px;color:var(--text-primary);font-size:0.75rem" oninput="MDT.build()"></td>`;html+='</tr>';}
      html+='</tbody></table>';document.getElementById('mt-grid').innerHTML=html;MDT.build();
    },
    build(){
      var table=document.querySelector('#mt-grid table');if(!table)return;var rows=table.querySelectorAll('tr');var md='';var al=document.getElementById('mt-align').value;var sep='| '+(al==='center'?':---:':al==='right?'---:':'---')+' |';rows.forEach(function(row,i){var cells=row.querySelectorAll('input');var line='| ';cells.forEach(function(c){line+=c.value+' | ';});md+=line+'
';if(i===0){md+=sep;for(var j=1;j<cells.length;j++)md+=sep;md=md.slice(0,-1)+' |
';}});
      document.getElementById('mt-out').value=md;
    }
  };
  Router.registerRoute('#md-table','MD Table Generator',render);
})();