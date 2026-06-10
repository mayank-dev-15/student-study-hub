(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔢</span>Number System Converter</div>
    <div class="form-group"><label>Decimal</label><input type="number" id="ns-dec" value="42" oninput="NS.fromDec()"></div>
    <div class="form-group"><label>Binary</label><input type="text" id="ns-bin" oninput="NS.fromBin()"></div>
    <div class="form-group"><label>Octal</label><input type="text" id="ns-oct" oninput="NS.fromOct()"></div>
    <div class="form-group"><label>Hexadecimal</label><input type="text" id="ns-hex" oninput="NS.fromHex()"></div>
    <div class="form-group"><label>Base 36</label><input type="text" id="ns-b36" oninput="NS.fromB36()"></div>
    <div style="margin-top:12px;font-size:0.82rem;color:var(--text-muted)">Bit length: <span id="ns-bits">6</span> | Two's complement (8-bit): <span id="ns-twos">-</span></div></div>`;
    NS.fromDec();
  }
  window.NS={
    fromDec(){var v=parseInt(document.getElementById('ns-dec').value);if(isNaN(v))return;document.getElementById('ns-bin').value=v.toString(2);document.getElementById('ns-oct').value=v.toString(8);document.getElementById('ns-hex').value=v.toString(16).toUpperCase();document.getElementById('ns-b36').value=v.toString(36).toUpperCase();document.getElementById('ns-bits').textContent=v.toString(2).length;document.getElementById('ns-twos').textContent=v<128?v:(v-256);},
    fromBin(){var v=parseInt(document.getElementById('ns-bin').value,2);if(isNaN(v))return;document.getElementById('ns-dec').value=v;NS.fromDec();},
    fromOct(){var v=parseInt(document.getElementById('ns-oct').value,8);if(isNaN(v))return;document.getElementById('ns-dec').value=v;NS.fromDec();},
    fromHex(){var v=parseInt(document.getElementById('ns-hex').value,16);if(isNaN(v))return;document.getElementById('ns-dec').value=v;NS.fromDec();},
    fromB36(){var v=parseInt(document.getElementById('ns-b36').value,36);if(isNaN(v))return;document.getElementById('ns-dec').value=v;NS.fromDec();}
  };
  Router.registerRoute('#number-systems','Number Systems',render);
})();