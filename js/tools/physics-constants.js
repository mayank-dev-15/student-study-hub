(function(){
  const C=[
    {n:'Speed of light (c)',v:'2.998 × 10⁸',u:'m/s'},{n:'Gravitational (G)',v:'6.674 × 10⁻¹¹',u:'N·m²/kg²'},
    {n:'Planck (h)',v:'6.626 × 10⁻³⁴',u:'J·s'},{n:'Boltzmann (k)',v:'1.381 × 10⁻²³',u:'J/K'},
    {n:'Avogadro (Nₐ)',v:'6.022 × 10²³',u:'mol⁻¹'},{n:'Gas constant (R)',v:'8.314',u:'J/(mol·K)'},
    {n:'Electron mass',v:'9.109 × 10⁻³¹',u:'kg'},{n:'Proton mass',v:'1.673 × 10⁻²⁷',u:'kg'},
    {n:'Elementary charge',v:'1.602 × 10⁻¹⁹',u:'C'},{n:'Vacuum permittivity',v:'8.854 × 10⁻¹²',u:'F/m'},
    {n:'Faraday constant',v:'9.648 × 10⁴',u:'C/mol'},{n:'Stefan-Boltzmann',v:'5.670 × 10⁻⁸',u:'W/(m²·K⁴)'},
    {n:'Rydberg constant',v:'1.097 × 10⁷',u:'m⁻¹'},{n:'Bohr radius',v:'5.292 × 10⁻¹¹',u:'m'},
    {n:'Standard gravity',v:'9.80665',u:'m/s²'},{n:'Atmosphere',v:'1.013 × 10⁵',u:'Pa'}
  ];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔬</span>Physics Constants</div>
    <input type="text" id="pc-search" placeholder="Search..." oninput="PC.filter()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div class="table-wrap"><table><thead><tr><th>Constant</th><th>Value</th><th>Unit</th></tr></thead><tbody id="pc-tbody"></tbody></table></div></div>`;
    PC.filter();
  }
  window.PC={
    filter(){const q=document.getElementById('pc-search').value.toLowerCase();const f=C.filter(c=>c.n.toLowerCase().includes(q)||c.u.toLowerCase().includes(q));
      const rows=f.map(c=>`<tr><td style="font-weight:600">${esc(c.n)}</td><td style="color:var(--cyan);font-family:monospace">${esc(c.v)}</td><td style="color:var(--text-muted)">${esc(c.u)}</td></tr>`).join('');
      document.getElementById('pc-tbody').innerHTML=rows;
    }
  };
  Router.registerRoute('#physics-constants','Physics Constants',render);
})();