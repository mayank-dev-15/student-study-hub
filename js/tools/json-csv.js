(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔄</span>JSON ↔ CSV Converter</div>
    <div class="tabs" style="margin-bottom:0;border-bottom:none"><button class="tab active" id="jc-t-j2c" onclick="JCSV.sw('j2c',this)">JSON → CSV</button><button class="tab" id="jc-t-c2j" onclick="JCSV.sw('c2j',this)">CSV → JSON</button></div>
    <div class="playground-container" style="grid-template-columns:1fr 1fr">
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Input</label><textarea id="jc-in" class="playground-code" rows="12" placeholder='[{"name":"John","age":30}]' style="min-height:250px"></textarea></div>
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Output</label><textarea id="jc-out" class="playground-code" rows="12" readonly style="min-height:250px"></textarea></div>
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="JCSV.convert()">Convert</button>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('jc-out').value);Toast.success('Copied!')">Copy Output</button></div>`;
  }
  window.JCSV={mode:'j2c',
    sw(m,btn){this.mode=m;document.querySelectorAll('#jc-t-j2c,#jc-t-c2j').forEach(function(x){x.classList.remove('active');});if(btn)btn.classList.add('active');},
    convert(){
      var inp=document.getElementById('jc-in').value.trim();var out='';
      try{
        if(this.mode==='j2c'){var data=JSON.parse(inp);if(!Array.isArray(data))data=[data];var keys=Object.keys(data[0]||{});out=keys.join(',')+'\n';data.forEach(function(row){out+=keys.map(function(k){var v=row[k];return typeof v==='string'&&v.includes(',')?'"'+v+'"':v;}).join(',')+'\n';});}
        else{var lines=inp.split('\n').filter(function(l){return l.trim();});if(lines.length<2){Toast.error('Need header + at least 1 row');return;}var keys=lines[0].split(',').map(function(k){return k.trim();});var data=[];for(var i=1;i<lines.length;i++){var vals=lines[i].split(',').map(function(v){return v.trim();});var obj={};keys.forEach(function(k,j){obj[k]=isNaN(vals[j])?vals[j]:parseFloat(vals[j]);});data.push(obj);}out=JSON.stringify(data,null,2);}
        document.getElementById('jc-out').value=out;
      }catch(e){Toast.error('Error: '+e.message);}
    }
  };
  Router.registerRoute('#json-csv','JSON CSV Converter',render);
})();
