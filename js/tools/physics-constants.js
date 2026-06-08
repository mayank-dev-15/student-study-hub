// ============================================
// Physics Constants Reference
// ============================================
(function() {
  const constants = [
    { name: 'Speed of light (c)', value: '2.998 × 10⁸', unit: 'm/s' },
    { name: 'Gravitational constant (G)', value: '6.674 × 10⁻¹¹', unit: 'N·m²/kg²' },
    { name: 'Planck constant (h)', value: '6.626 × 10⁻³⁴', unit: 'J·s' },
    { name: 'Reduced Planck constant (ħ)', value: '1.055 × 10⁻³⁴', unit: 'J·s' },
    { name: 'Boltzmann constant (k)', value: '1.381 × 10⁻²³', unit: 'J/K' },
    { name: 'Avogadro constant (Nₐ)', value: '6.022 × 10²³', unit: 'mol⁻¹' },
    { name: 'Gas constant (R)', value: '8.314', unit: 'J/(mol·K)' },
    { name: 'Electron mass (mₑ)', value: '9.109 × 10⁻³¹', unit: 'kg' },
    { name: 'Proton mass (mₚ)', value: '1.673 × 10⁻²⁷', unit: 'kg' },
    { name: 'Neutron mass (mₙ)', value: '1.675 × 10⁻²⁷', unit: 'kg' },
    { name: 'Elementary charge (e)', value: '1.602 × 10⁻¹⁹', unit: 'C' },
    { name: 'Vacuum permittivity (ε₀)', value: '8.854 × 10⁻¹²', unit: 'F/m' },
    { name: 'Vacuum permeability (μ₀)', value: '1.257 × 10⁻⁶', unit: 'H/m' },
    { name: 'Fine-structure constant (α)', value: '7.297 × 10⁻³', unit: '' },
    { name: 'Rydberg constant (R∞)', value: '1.097 × 10⁷', unit: 'm⁻¹' },
    { name: 'Bohr radius (a₀)', value: '5.292 × 10⁻¹¹', unit: 'm' },
    { name: 'Stefan-Boltzmann constant (σ)', value: '5.670 × 10⁻⁸', unit: 'W/(m²·K⁴)' },
    { name: 'Wien displacement constant (b)', value: '2.898 × 10⁻³', unit: 'm·K' },
    { name: 'Electron volt (eV)', value: '1.602 × 10⁻¹⁹', unit: 'J' },
    { name: 'Standard gravity (g)', value: '9.80665', unit: 'm/s²' },
    { name: 'Standard atmosphere (atm)', value: '1.013 × 10⁵', unit: 'Pa' },
    { name: 'Coulomb constant (kₑ)', value: '8.988 × 10⁹', unit: 'N·m²/C²' },
    { name: 'Faraday constant (F)', value: '9.648 × 10⁴', unit: 'C/mol' },
    { name: 'Molar volume (STP)', value: '2.241 × 10⁻²', unit: 'm³/mol' }
  ];

  function render(contentEl) {
    const query = '';
    const rows = constants.map(c => `<tr>
      <td style="font-weight:600">${esc(c.name)}</td>
      <td style="color:var(--cyan);font-family:'Courier New',monospace">${esc(c.value)}</td>
      <td style="color:var(--text-muted)">${esc(c.unit)}</td>
    </tr>`).join('');

    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🔬 Physics Constants</div>
        <div class="form-group">
          <input type="text" id="pc-search" placeholder="Search constants..." oninput="PC.filter()" style="margin-bottom:12px">
        </div>
        <div style="overflow-x:auto">
          <table>
            <thead><tr><th>Constant</th><th>Value</th><th>Unit</th></tr></thead>
            <tbody id="pc-tbody">${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.PC = {
    filter() {
      const q = document.getElementById('pc-search').value.toLowerCase();
      const filtered = constants.filter(c => c.name.toLowerCase().includes(q) || c.unit.toLowerCase().includes(q));
      const rows = filtered.map(c => `<tr>
        <td style="font-weight:600">${esc(c.name)}</td>
        <td style="color:var(--cyan);font-family:'Courier New',monospace">${esc(c.value)}</td>
        <td style="color:var(--text-muted)">${esc(c.unit)}</td>
      </tr>`).join('');
      document.getElementById('pc-tbody').innerHTML = rows;
    }
  };

  Router.registerRoute('#physics-constants', 'Physics Constants', render);
})();
