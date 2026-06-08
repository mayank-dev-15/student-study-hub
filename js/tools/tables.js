// ============================================
// Math Tables (Multiplication, Squares, etc.)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">✖️ Math Tables</div>
        <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
          <div class="form-group" style="margin-bottom:0">
            <label>Table of</label>
            <input type="number" id="mt-number" value="2" min="1" max="1000" style="width:80px" oninput="MT.generate()">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label>Up to</label>
            <select id="mt-limit" onchange="MT.generate()">
              ${[10,12,15,20,25,50,100].map(n => `<option value="${n}" ${n===12?'selected':''}>${n}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label>Type</label>
            <select id="mt-type" onchange="MT.generate()">
              <option value="multiply">Multiplication</option>
              <option value="square">Squares</option>
              <option value="cube">Cubes</option>
              <option value="sqrt">Square Roots</option>
              <option value="reciprocal">Reciprocals</option>
            </select>
          </div>
        </div>
        <div id="mt-output"></div>
      </div>
    `;
    MT.generate();
  }

  window.MT = {
    generate() {
      const n = parseInt(document.getElementById('mt-number').value) || 1;
      const limit = parseInt(document.getElementById('mt-limit').value) || 12;
      const type = document.getElementById('mt-type').value;
      let html = '<div class="grid grid-4" style="gap:6px 16px">';
      for (let i = 1; i <= limit; i++) {
        let val;
        switch (type) {
          case 'multiply': val = n * i; break;
          case 'square': val = i * i; break;
          case 'cube': val = i * i * i; break;
          case 'sqrt': val = Math.sqrt(i).toFixed(4).replace(/\.?0+$/, ''); break;
          case 'reciprocal': val = (1/i).toFixed(6).replace(/\.?0+$/, ''); break;
        }
        if (type === 'multiply') {
          html += `<div style="font-size:0.85rem"><strong>${n} × ${i}</strong> = <span style="color:var(--accent)">${val}</span></div>`;
        } else {
          html += `<div style="font-size:0.85rem"><strong>${i}</strong>: <span style="color:var(--accent)">${val}</span></div>`;
        }
      }
      html += '</div>';
      document.getElementById('mt-output').innerHTML = html;
    }
  };

  Router.registerRoute('#tables', 'Math Tables', render);
})();
