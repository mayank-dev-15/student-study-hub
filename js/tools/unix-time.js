(function(){
  function render(c){
    const now=Math.floor(Date.now()/1000);
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⏰</span>Unix Timestamp Converter</div>
    <div class="form-group"><label>Unix Timestamp</label><input type="number" id="ut-unix" value="${now}" oninput="UT.fromUnix()"></div>
    <div class="form-group"><label>Human Readable (UTC)</label><input type="text" id="ut-utc" readonly></div>
    <div class="form-group"><label>Human Readable (Local)</label><input type="text" id="ut-local" readonly></div>
    <div style="margin-top:8px;font-size:0.78rem;color:var(--text-muted)">Current: <strong id="ut-now">${now}</strong> — updates every second</div></div>`;
    UT.fromUnix();UT.tick();
  }
  window.UT={
    fromUnix(){const v=parseInt(document.getElementById('ut-unix').value);if(isNaN(v))return;const d=new Date(v*1000);document.getElementById('ut-utc').value=d.toUTCString();document.getElementById('ut-local').value=d.toLocaleString();},
    tick(){setInterval(()=>{document.getElementById('ut-now').textContent=Math.floor(Date.now()/1000);},1000);}
  };
  Router.registerRoute('#unix-time','Unix Timestamp',render);
})();