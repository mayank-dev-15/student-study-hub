(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📐</span>Unit Circle Reference</div>
    <div class="form-group"><label>Angle (degrees)</label><input type="number" id="uc-deg" value="30" min="0" max="360" oninput="UC.draw()"></div>
    <canvas id="uc-canvas" style="width:100%;max-width:350px;display:block;margin:0 auto;background:var(--bg-tertiary);border-radius:8px"></canvas>
    <div class="stats-row" style="margin-top:12px"><div class="stat-box"><div class="stat-value" id="uc-sin">0.5</div><div class="stat-label">sin</div></div><div class="stat-box"><div class="stat-value" id="uc-cos">0.866</div><div class="stat-label">cos</div></div><div class="stat-box"><div class="stat-value" id="uc-tan">0.577</div><div class="stat-label">tan</div></div></div>
    <div style="margin-top:8px;font-size:0.78rem;color:var(--text-muted);text-align:center">Coordinates: (<span id="uc-x">0.866</span>, <span id="uc-y">0.5</span>)</div></div>`;
    UC.draw();
  }
  window.UC={
    draw(){const deg=parseFloat(document.getElementById('uc-deg').value)||0,rad=deg*Math.PI/180,cv=document.getElementById('uc-canvas'),ctx=cv.getContext('2d');
      cv.width=350;cv.height=350;const cx=175,cy=175,r=130;
      ctx.fillStyle='#1c2033';ctx.fillRect(0,0,350,350);ctx.strokeStyle='#2d3550';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(350,cy);ctx.moveTo(cx,0);ctx.lineTo(cx,350);ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='#3d4560';ctx.stroke();
      const x=cx+r*Math.cos(rad),y=cy-r*Math.sin(rad);
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.strokeStyle='#7b9aff';ctx.lineWidth=2;ctx.stroke();
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle='#7b9aff';ctx.fill();
      ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,cy);ctx.strokeStyle='#34d399';ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(cx,y);ctx.strokeStyle='#f87171';ctx.stroke();ctx.setLineDash([]);
      const s=Math.sin(rad).toFixed(3),co=Math.cos(rad).toFixed(3),t=Math.tan(rad).toFixed(3);
      document.getElementById('uc-sin').textContent=isNaN(s)?'—':s;document.getElementById('uc-cos').textContent=isNaN(co)?'—':co;document.getElementById('uc-tan').textContent=Math.abs(Math.cos(rad))<0.001?'∞':t;document.getElementById('uc-x').textContent=co;document.getElementById('uc-y').textContent=s;
    }
  };
  Router.registerRoute('#unit-circle','Unit Circle',render);
})();