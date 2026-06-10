(function(){
  var presets=[{name:'Bounce',css:'@keyframes anim{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}'},{name:'Pulse',css:'@keyframes anim{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}'},{name:'Spin',css:'@keyframes anim{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}'},{name:'Fade In',css:'@keyframes anim{0%{opacity:0}100%{opacity:1}}'},{name:'Slide In',css:'@keyframes anim{0%{transform:translateX(-100%)}100%{transform:translateX(0)}}'},{name:'Shake',css:'@keyframes anim{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}'},{name:'Flip',css:'@keyframes anim{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}'},{name:'Zoom',css:'@keyframes anim{0%{transform:scale(0)}100%{transform:scale(1)}}'}];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">✨</span>CSS Animation Generator</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">${presets.map(function(p,i){return `<button class="btn btn-sm btn-secondary" onclick="AN.load(${i})" style="font-size:0.68rem;padding:4px 10px">${p.name}</button>`;}).join('')}</div>
    <div style="margin-bottom:12px"><label style="font-size:0.78rem;color:var(--text-secondary)">Duration</label><input type="range" id="an-dur" min="0.1" max="5" step="0.1" value="1" style="width:100%" oninput="AN.apply()"><span id="an-dur-val" style="font-size:0.75rem;color:var(--text-muted)">1s</span></div>
    <div style="margin-bottom:12px"><label style="font-size:0.78rem;color:var(--text-secondary)">Timing</label><select id="an-ease" onchange="AN.apply()"><option value="linear">linear</option><option value="ease">ease</option><option value="ease-in">ease-in</option><option value="ease-out">ease-out</option><option value="ease-in-out">ease-in-out</option></select></div>
    <div style="margin-bottom:12px"><label class="checkbox-label"><input type="checkbox" id="an-inf" checked onchange="AN.apply()"> Infinite loop</label></div>
    <div id="an-preview" style="height:150px;background:var(--bg-tertiary);border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px"><div id="an-box" style="width:60px;height:60px;background:linear-gradient(135deg,#7b9aff,#c084fc);border-radius:12px"></div></div>
    <textarea id="an-css" rows="6" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('an-css').value);Toast.success('Copied!')">Copy CSS</button></div>`;
    AN.load(0);
  }
  window.AN={
    load(i){document.getElementById('an-css').value=presets[i].css;AN.apply();},
    apply(){
      var css=document.getElementById('an-css').value;var dur=document.getElementById('an-dur').value;var ease=document.getElementById('an-ease').value;var inf=document.getElementById('an-inf').checked?'infinite':'1';
      document.getElementById('an-dur-val').textContent=dur+'s';
      var fullCss=css+'\n\n.element {\n  animation: anim '+dur+'s '+ease+' '+inf+';\n}';
      document.getElementById('an-css').value=fullCss;
      var box=document.getElementById('an-box');box.style.animation='';void box.offsetWidth;box.style.animation='anim '+dur+'s '+ease+' '+inf;
    }
  };
  Router.registerRoute('#css-animation','CSS Animation Gen',render);
})();