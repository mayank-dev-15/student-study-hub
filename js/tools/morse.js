(function(){
  var M={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_': '..--.-','"':'.-..-.','$':'...-..-','@':'.--.-.',''':'.----.'};
  var R={};for(var k in M)R[M[k]]=k;
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📡</span>Morse Code Translator</div>
    <div class="form-group"><label>Text → Morse</label><input type="text" id="mr-txt" placeholder="Enter text..." oninput="MR.enc()"></div>
    <div class="form-group"><label>Morse → Text</label><input type="text" id="mr-mor" placeholder="Enter morse (use . and -)..." oninput="MR.dec()"></div>
    <div id="mr-out" style="background:var(--bg-tertiary);padding:14px;border-radius:8px;font-family:monospace;font-size:1.1rem;word-break:break-all;min-height:40px"></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="MR.play()">🔊 Play Sound</button></div>`;
  }
  window.MR={
    enc(){var t=document.getElementById('mr-txt').value.toUpperCase();var r='';for(var i=0;i<t.length;i++){r+=(M[t[i]]||t[i])+' ';}document.getElementById('mr-out').textContent=r;},
    dec(){var m=document.getElementById('mr-mor').value.trim().split(' ');var r='';for(var i=0;i<m.length;i++){r+=R[m[i]]||m[i];}document.getElementById('mr-out').textContent=r;},
    play(){var txt=document.getElementById('mr-out').textContent;if(!txt)return;var ctx=new(window.AudioContext||window.webkitAudioContext)();var t=0;txt.split('').forEach(function(ch){if(ch=='.'){ctx.createOscillator().connect(ctx.destination);var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=600;g.gain.setValueAtTime(0.3,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.1);o.start(t);o.stop(t+0.1);t+=0.15;}else if(ch=='-'){var o=ctx.createOscillator();var g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=600;g.gain.setValueAtTime(0.3,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);t+=0.35;}else if(ch==' '){t+=0.2;}});}
  };
  Router.registerRoute('#morse','Morse Code',render);
})();