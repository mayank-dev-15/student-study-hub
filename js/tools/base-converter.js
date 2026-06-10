(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔢</span>Number Base Converter</div>
    <div class="form-group"><label>Decimal</label><input type="number" id="nb-dec" placeholder="42" oninput="NB.fromDec()"></div>
    <div class="form-group"><label>Binary</label><input type="text" id="nb-bin" placeholder="101010" oninput="NB.fromBin()"></div>
    <div class="form-group"><label>Octal</label><input type="text" id="nb-oct" placeholder="52" oninput="NB.fromOct()"></div>
    <div class="form-group"><label>Hexadecimal</label><input type="text" id="nb-hex" placeholder="2A" oninput="NB.fromHex()"></div></div>`;
  }
  window.NB={
    fromDec(){let v=parseInt(document.getElementById('nb-dec').value);if(isNaN(v))return;document.getElementById('nb-bin').value=v.toString(2);document.getElementById('nb-oct').value=v.toString(8);document.getElementById('nb-hex').value=v.toString(16).toUpperCase();},
    fromBin(){let v=parseInt(document.getElementById('nb-bin').value,2);if(isNaN(v))return;document.getElementById('nb-dec').value=v;document.getElementById('nb-oct').value=v.toString(8);document.getElementById('nb-hex').value=v.toString(16).toUpperCase();},
    fromOct(){let v=parseInt(document.getElementById('nb-oct').value,8);if(isNaN(v))return;document.getElementById('nb-dec').value=v;document.getElementById('nb-bin').value=v.toString(2);document.getElementById('nb-hex').value=v.toString(16).toUpperCase();},
    fromHex(){let v=parseInt(document.getElementById('nb-hex').value,16);if(isNaN(v))return;document.getElementById('nb-dec').value=v;document.getElementById('nb-bin').value=v.toString(2);document.getElementById('nb-oct').value=v.toString(8);}
  };
  Router.registerRoute('#base-converter','Base Converter',render);
})();