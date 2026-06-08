(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">✖️</span>Math Tables</div>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="form-group" style="margin-bottom:0"><label>Number</label><input type="number" id="mt-n" value="2" min="1" max="1000" style="width:70px" oninput="MT.gen()"></div>
      <div class="form-group" style="margin-bottom:0"><label>Up to</label><select id="mt-l" onchange="MT.gen()"><option value="10">10</option><option value="12" selected>12</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="50">50</option></select></div>
      <div class="form-group" style="margin-bottom:0"><label>Type</label><select id="mt-t" onchange="MT.gen()"><option value="mul">Multiply</option><option value="sq">Squares</option><option value="cu">Cubes</option><option value="sqrt">√</option><option value="rec">1/x</option></select></div>
    </div><div id="mt-out"></div></div>`;
    MT.gen();
  }
  window.MT={
    gen(){
      const n=parseInt(document.getElementById('mt-n').value)||1,lim=parseInt(document.getElementById('mt-l').value)||12,t=document.getElementById('mt-t').value;
      let h='<div class="grid grid-4" style="gap:4px 12px">';
      for(let i=1;i<=lim;i++){let v;switch(t){case'mul':v=n*i;break;case'sq':v=i*i;break;case'cu':v=i*i*i;break;case'sqrt':v=Math.sqrt(i).toFixed(4).replace(/\.?0+$/,'');break;case'rec':v=(1/i).toFixed(6).replace(/\.?0+$/,'');break;}h+=`<div style="font-size:0.82rem"><strong>${t==='mul'?n+' × '+i:i}</strong> = <span style="color:var(--accent)">${v}</span></div>`;}
      h+='</div>';document.getElementById('mt-out').innerHTML=h;
    }
  };
  Router.registerRoute('#tables','Math Tables',render);
})();