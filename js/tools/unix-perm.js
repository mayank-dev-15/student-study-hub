(function(){
  var perms=[{bit:4,label:'Read'},{bit:2,label:'Write'},{bit:1,label:'Execute'}];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔐</span>Unix Permission Calculator</div>
    <div style="margin-bottom:12px"><strong>Owner</strong></div>
    <div style="display:flex;gap:12px;margin-bottom:12px">${perms.map(function(p,i){return `<label class="checkbox-label"><input type="checkbox" id="up-o-${i}" onchange="UNP.calc()"> ${p.label}</label>`;}).join('')}</div>
    <div style="margin-bottom:12px"><strong>Group</strong></div>
    <div style="display:flex;gap:12px;margin-bottom:12px">${perms.map(function(p,i){return `<label class="checkbox-label"><input type="checkbox" id="up-g-${i}" onchange="UNP.calc()"> ${p.label}</label>`;}).join('')}</div>
    <div style="margin-bottom:12px"><strong>Other</strong></div>
    <div style="display:flex;gap:12px;margin-bottom:12px">${perms.map(function(p,i){return `<label class="checkbox-label"><input type="checkbox" id="up-w-${i}" onchange="UNP.calc()"> ${p.label}</label>`;}).join('')}</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="up-num" style="font-family:monospace">000</div><div class="stat-label">Numeric</div></div><div class="stat-box"><div class="stat-value" id="up-sym" style="font-family:monospace">---------</div><div class="stat-label">Symbolic</div></div><div class="stat-box"><div class="stat-value" id="up-cmd">chmod</div><div class="stat-label">Command</div></div></div></div>`;
  }
  window.UNP={
    calc(){
      var o=0,g=0,w=0;perms.forEach(function(p,i){if(document.getElementById('up-o-'+i).checked)o+=p.bit;if(document.getElementById('up-g-'+i).checked)g+=p.bit;if(document.getElementById('up-w-'+i).checked)w+=p.bit;});
      document.getElementById('up-num').textContent=''+o+g+w;
      var sym=function(n){return(n&4?'r':'-')+(n&2?'w':'-')+(n&1?'x':'-');};
      document.getElementById('up-sym').textContent=sym(o)+sym(g)+sym(w);
      document.getElementById('up-cmd').textContent='chmod '+o+g+w+' file.txt';
    }
  };
  Router.registerRoute('#unix-perm','Unix Permissions',render);
})();