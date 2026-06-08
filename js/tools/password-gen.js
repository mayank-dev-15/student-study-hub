(function(){
  const lower='abcdefghijklmnopqrstuvwxyz',upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ',nums='0123456789',syms='!@#$%^&*()_+-=[]{}|;:,.<>?';
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔑</span>Password Generator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Length</label><input type="number" id="pw-len" value="16" min="4" max="128" style="width:70px"></div>
    <div style="display:flex;flex-direction:column;gap:4px;padding-top:8px"><label class="checkbox-label"><input type="checkbox" id="pw-lo" checked> Lowercase</label><label class="checkbox-label"><input type="checkbox" id="pw-up" checked> Uppercase</label><label class="checkbox-label"><input type="checkbox" id="pw-num" checked> Numbers</label><label class="checkbox-label"><input type="checkbox" id="pw-sym"> Symbols</label></div>
    <button class="btn btn-primary btn-sm" onclick="PW.gen()" style="align-self:flex-end">Generate</button></div>
    <div id="pw-out" style="margin-top:12px;font-family:monospace;font-size:1.1rem;background:var(--bg-tertiary);padding:14px;border-radius:8px;word-break:break-all"></div>
    <div id="pw-strength" style="margin-top:8px;font-size:0.78rem"></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('pw-out').textContent);Toast.success('Copied!')">Copy</button></div>`;
  }
  window.PW={
    gen(){let chars='';if(document.getElementById('pw-lo').checked)chars+=lower;if(document.getElementById('pw-up').checked)chars+=upper;if(document.getElementById('pw-num').checked)chars+=nums;if(document.getElementById('pw-sym').checked)chars+=syms;if(!chars){Toast.error('Select at least one option');return;}
      const len=parseInt(document.getElementById('pw-len').value)||16;let pw='';for(let i=0;i<len;i++)pw+=chars[Math.floor(Math.random()*chars.length)];
      document.getElementById('pw-out').textContent=pw;
      const score=len>=12?(chars.length>50?3:2):len>=8?1:0;const labels=['Weak','Fair','Good','Strong'];const colors=['var(--red)','var(--yellow)','var(--green)','var(--accent)'];
      document.getElementById('pw-strength').innerHTML=`Strength: <strong style="color:${colors[score]}">${labels[score]}</strong>`;
    }
  };
  Router.registerRoute('#password-gen','Password Generator',render);
})();