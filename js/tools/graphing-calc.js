(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📈</span>Graphing Calculator</div>
    <div class="form-group"><label>f(x) = </label><input type="text" id="gc-f" value="Math.sin(x)" placeholder="e.g. x*x, Math.sin(x)"></div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>X min</label><input type="number" id="gc-xmin" value="-10" style="width:70px"></div><div class="form-group" style="margin-bottom:0"><label>X max</label><input type="number" id="gc-xmax" value="10" style="width:70px"></div><button class="btn btn-primary btn-sm" onclick="GC.draw()" style="align-self:flex-end">Plot</button></div>
    <canvas id="gc-canvas" style="width:100%;background:var(--bg-tertiary);border-radius:8px;margin-top:12px;border:1px solid var(--border)"></canvas></div>`;
  }
  window.GC={
    draw(){
      const cv=document.getElementById('gc-canvas'),ctx=cv.getContext('2d');
      cv.width=cv.offsetWidth;cv.height=300;
      const fn=document.getElementById('gc-f').value,xmin=parseFloat(document.getElementById('gc-xmin').value)||-10,xmax=parseFloat(document.getElementById('gc-xmax').value)||10;
      const w=cv.width,h=cv.height,xs=w/(xmax-xmin),ys=h/20;
      ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary').trim()||'#1c2033';ctx.fillRect(0,0,w,h);
      ctx.strokeStyle='#2d3550';ctx.lineWidth=1;
      for(let x=Math.ceil(xmin);x<=xmax;x++){const px=(x-xmin)*xs;ctx.beginPath();ctx.moveTo(px,0);ctx.lineTo(px,h);ctx.stroke();}
      for(let y=-10;y<=10;y++){const py=h/2-y*ys;ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(w,py);ctx.stroke();}
      ctx.strokeStyle='var(--accent)';ctx.lineWidth=2;ctx.beginPath();
      for(let i=0;i<w;i++){const x=xmin+i/xs;let y=0;try{y=Function('x','return '+fn)(x);}catch(e){continue;}const py=h/2-y*ys;if(i===0)ctx.moveTo(i,py);else ctx.lineTo(i,py);}
      ctx.stroke();ctx.fillStyle='var(--accent)';ctx.font='12px sans-serif';ctx.fillText('y = '+fn,10,20);
    }
  };
  Router.registerRoute('#graphing-calc','Graphing Calculator',render);
})();