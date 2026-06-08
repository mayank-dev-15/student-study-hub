// ============================================
// Color Picker
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🎨 Color Picker & Converter</div>
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <div>
            <input type="color" id="cp-color" value="#6c8cff" style="width:120px;height:120px;border:none;cursor:pointer;background:none" oninput="CP.update()">
            <div class="color-preview" id="cp-preview" style="background:#6c8cff"></div>
          </div>
          <div style="flex:1;min-width:200px">
            <div class="form-group">
              <label>HEX</label>
              <input type="text" id="cp-hex" value="#6c8cff" oninput="CP.fromHex()">
            </div>
            <div class="form-group">
              <label>RGB</label>
              <input type="text" id="cp-rgb" value="rgb(108, 140, 255)" readonly>
            </div>
            <div class="form-group">
              <label>HSL</label>
              <input type="text" id="cp-hsl" value="hsl(227, 100%, 71%)" readonly>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-secondary btn-sm" onclick="CP.copyHex()">Copy HEX</button>
              <button class="btn btn-secondary btn-sm" onclick="CP.copyRgb()">Copy RGB</button>
            </div>
          </div>
        </div>
      </div>
    `;
    CP.update();
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  window.CP = {
    update() {
      const hex = document.getElementById('cp-color').value;
      const { r, g, b } = hexToRgb(hex);
      const { h, s, l } = rgbToHsl(r, g, b);
      document.getElementById('cp-hex').value = hex;
      document.getElementById('cp-rgb').value = `rgb(${r}, ${g}, ${b})`;
      document.getElementById('cp-hsl').value = `hsl(${h}, ${s}%, ${l}%)`;
      document.getElementById('cp-preview').style.background = hex;
    },
    fromHex() {
      let hex = document.getElementById('cp-hex').value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
        document.getElementById('cp-color').value = hex;
        document.getElementById('cp-preview').style.background = hex;
        const { r, g, b } = hexToRgb(hex);
        const { h, s, l } = rgbToHsl(r, g, b);
        document.getElementById('cp-rgb').value = `rgb(${r}, ${g}, ${b})`;
        document.getElementById('cp-hsl').value = `hsl(${h}, ${s}%, ${l}%)`;
      }
    },
    copyHex() { navigator.clipboard.writeText(document.getElementById('cp-hex').value).then(() => showToast('HEX copied!')); },
    copyRgb() { navigator.clipboard.writeText(document.getElementById('cp-rgb').value).then(() => showToast('RGB copied!')); }
  };

  Router.registerRoute('#color-picker', 'Color Picker', render);
})();
