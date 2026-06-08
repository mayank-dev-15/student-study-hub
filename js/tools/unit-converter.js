// Unit Converter v2
(function() {
  const units = {
    length: { name: 'Length', units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254, nm: 1852 } },
    mass: { name: 'Mass', units: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495, ton: 1000, stone: 6.35029 } },
    temp: { name: 'Temperature', special: true },
    volume: { name: 'Volume', units: { l: 1, ml: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588, floz: 0.0295735, m3: 1000, cm3: 0.001 } },
    area: { name: 'Area', units: { m2: 1, km2: 1e6, cm2: 0.0001, ha: 10000, acre: 4046.86, ft2: 0.092903, in2: 0.00064516, mi2: 2.59e6 } },
    speed: { name: 'Speed', units: { mps: 1, kph: 0.277778, mph: 0.44704, fps: 0.3048, knot: 0.514444 } },
    data: { name: 'Digital Storage', units: { b: 1, B: 8, KB: 8192, MB: 8388608, GB: 8589934592, TB: 8796093022208 } },
    time: { name: 'Time', units: { s: 1, ms: 0.001, min: 60, h: 3600, d: 86400, wk: 604800, mo: 2592000, y: 31536000 } },
    pressure: { name: 'Pressure', units: { pa: 1, kpa: 1000, bar: 100000, atm: 101325, psi: 6894.76, mmhg: 133.322 } },
    energy: { name: 'Energy', units: { j: 1, kj: 1000, cal: 4.184, kcal: 4184, wh: 3600, kwh: 3.6e6, ev: 1.602e-19 } }
  };
  function convertTemp(v, f, t) {
    let c = f === 'C' ? v : f === 'F' ? (v - 32) * 5 / 9 : v - 273.15;
    return t === 'C' ? c : t === 'F' ? c * 9 / 5 + 32 : c + 273.15;
  }
  function render(el) {
    const cats = Object.keys(units).map(k => `<option value="${k}">${units[k].name}</option>`).join('');
    el.innerHTML = `<div class="card anim-fade"><div class="card-title"><span class="icon">📐</span>Unit Converter</div>
      <div class="form-group"><label>Category</label><select id="uc-cat" onchange="UC.changeCat()">${cats}</select></div>
      <div class="form-row">
        <div class="form-group" style="flex:1"><label>From</label><input type="number" id="uc-val" value="1" oninput="UC.convert()"><select id="uc-from" onchange="UC.convert()" style="margin-top:6px"></select></div>
        <div style="display:flex;align-items:center;padding-top:20px"><button class="btn btn-secondary btn-sm" onclick="UC.swap()">⇄</button></div>
        <div class="form-group" style="flex:1"><label>To</label><div id="uc-result" class="result-box" style="font-size:1.1rem">0</div><select id="uc-to" onchange="UC.convert()" style="margin-top:6px"></select></div>
      </div>
    </div>`;
    UC.changeCat();
  }
  window.UC = {
    changeCat() {
      const cat = document.getElementById('uc-cat').value, u = units[cat];
      let opts;
      if (u.special) opts = ['C','F','K'].map(x => `<option value="${x}">${x==='C'?'Celsius':x==='F'?'Fahrenheit':'Kelvin'}</option>`).join('');
      else opts = Object.keys(u.units).map(x => `<option value="${x}">${x}</option>`).join('');
      document.getElementById('uc-from').innerHTML = opts;
      document.getElementById('uc-to').innerHTML = opts;
      const keys = u.special ? ['C','F','K'] : Object.keys(u.units);
      if (keys.length > 1) document.getElementById('uc-to').selectedIndex = 1;
      this.convert();
    },
    convert() {
      const cat = document.getElementById('uc-cat').value, val = parseFloat(document.getElementById('uc-val').value) || 0;
      const from = document.getElementById('uc-from').value, to = document.getElementById('uc-to').value;
      const u = units[cat];
      let result = u.special ? convertTemp(val, from, to) : (val * u.units[from]) / u.units[to];
      document.getElementById('uc-result').textContent = Number(result.toPrecision(10));
    },
    swap() {
      const f = document.getElementById('uc-from'), t = document.getElementById('uc-to');
      const tmp = f.value; f.value = t.value; t.value = tmp; this.convert();
    }
  };
  Router.registerRoute('#unit-converter', 'Unit Converter', render);
})();