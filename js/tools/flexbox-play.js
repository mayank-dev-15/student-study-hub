(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📐</span>CSS Flexbox Playground</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Direction</label><select id="fb-dir" onchange="FB.apply()"><option value="row">row</option><option value="row-reverse">row-reverse</option><option value="column">column</option><option value="column-reverse">column-reverse</option></select></div>
    <div class="form-group" style="margin-bottom:0"><label>Justify</label><select id="fb-just" onchange="FB.apply()"><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="space-between">space-between</option><option value="space-around">space-around</option><option value="space-evenly">space-evenly</option></select></div>
    <div class="form-group" style="margin-bottom:0"><label>Align</label><select id="fb-align" onchange="FB.apply()"><option value="stretch">stretch</option><option value="flex-start">flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option></select></div>
    <div class="form-group" style="margin-bottom:0"><label>Wrap</label><select id="fb-wrap" onchange="FB.apply()"><option value="nowrap">nowrap</option><option value="wrap">wrap</option><option value="wrap-reverse">wrap-reverse</option></select></div>
    <div class="form-group" style="margin-bottom:0"><label>Items</label><input type="number" id="fb-count" value="5" min="1" max="20" style="width:50px" oninput="FB.apply()"></div></div>
    <div id="fb-preview" style="margin-top:12px;min-height:150px;background:var(--bg-tertiary);border-radius:8px;padding:16px;display:flex;gap:8px"></div>
    <textarea id="fb-css" rows="4" readonly style="margin-top:12px;font-family:monospace;font-size:0.82rem"></textarea></div>`;
    FB.apply();
  }
  window.FB={
    apply(){
      var dir=document.getElementById('fb-dir').value,just=document.getElementById('fb-just').value,align=document.getElementById('fb-align').value,wrap=document.getElementById('fb-wrap').value,count=parseInt(document.getElementById('fb-count').value)||5;
      var css='display: flex;\nflex-direction: '+dir+';\njustify-content: '+just+';\nalign-items: '+align+';\nflex-wrap: '+wrap+';\ngap: 8px;';
      var items='';for(var i=0;i<count;i++)items+=`<div style="padding:12px 20px;background:linear-gradient(135deg,#7b9aff,#c084fc);border-radius:8px;color:#fff;font-weight:700;text-align:center;min-width:40px">${i+1}</div>`;
      document.getElementById('fb-preview').style.cssText='display:flex;flex-direction:'+dir+';justify-content:'+just+';align-items:'+align+';flex-wrap:'+wrap+';gap:8px;min-height:150px;background:var(--bg-tertiary);border-radius:8px;padding:16px;';
      document.getElementById('fb-preview').innerHTML=items;
      document.getElementById('fb-css').value=css;
    }
  };
  Router.registerRoute('#flexbox-play','Flexbox Playground',render);
})();