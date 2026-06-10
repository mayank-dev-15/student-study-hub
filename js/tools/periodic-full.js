(function(){
  var elms=[
    {z:1,sym:'H',n:'Hydrogen',t:'nonmetal',mass:'1.008'},{z:2,sym:'He',n:'Helium',t:'noble',mass:'4.003'},
    {z:3,sym:'Li',n:'Lithium',t:'alkali',mass:'6.941'},{z:4,sym:'Be',n:'Beryllium',t:'alkaline',mass:'9.012'},
    {z:5,sym:'B',n:'Boron',t:'metalloid',mass:'10.81'},{z:6,sym:'C',n:'Carbon',t:'nonmetal',mass:'12.01'},
    {z:7,sym:'N',n:'Nitrogen',t:'nonmetal',mass:'14.01'},{z:8,sym:'O',n:'Oxygen',t:'nonmetal',mass:'16.00'},
    {z:9,sym:'F',n:'Fluorine',t:'halogen',mass:'19.00'},{z:10,sym:'Ne',n:'Neon',t:'noble',mass:'20.18'},
    {z:11,sym:'Na',n:'Sodium',t:'alkali',mass:'22.99'},{z:12,sym:'Mg',n:'Magnesium',t:'alkaline',mass:'24.31'},
    {z:13,sym:'Al',n:'Aluminum',t:'post',mass:'26.98'},{z:14,sym:'Si',n:'Silicon',t:'metalloid',mass:'28.09'},
    {z:15,sym:'P',n:'Phosphorus',t:'nonmetal',mass:'30.97'},{z:16,sym:'S',n:'Sulfur',t:'nonmetal',mass:'32.07'},
    {z:17,sym:'Cl',n:'Chlorine',t:'halogen',mass:'35.45'},{z:18,sym:'Ar',n:'Argon',t:'noble',mass:'39.95'},
    {z:19,sym:'K',n:'Potassium',t:'alkali',mass:'39.10'},{z:20,sym:'Ca',n:'Calcium',t:'alkaline',mass:'40.08'},
    {z:26,sym:'Fe',n:'Iron',t:'transition',mass:'55.85'},{z:29,sym:'Cu',n:'Copper',t:'transition',mass:'63.55'},
    {z:30,sym:'Zn',n:'Zinc',t:'transition',mass:'65.38'},{z:47,sym:'Ag',n:'Silver',t:'transition',mass:'107.87'},
    {z:79,sym:'Au',n:'Gold',t:'transition',mass:'196.97'},{z:82,sym:'Pb',n:'Lead',t:'post',mass:'207.2'},
    {z:92,sym:'U',n:'Uranium',t:'actinide',mass:'238.03'}
  ];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⚛️</span>Periodic Table (Full)</div>
    <input type="text" id="pt-search" placeholder="Search element..." oninput="PT.search()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div class="pt-grid" id="pt-grid"></div>
    <div id="pt-detail" style="margin-top:12px;display:none" class="card"></div></div>`;
    PT.grid();
  }
  window.PT={
    grid(){var g=document.getElementById('pt-grid');g.innerHTML=elms.map(function(e){return `<div class="pt-element pt-${e.t}" data-n="${e.n}" data-sym="${e.sym}" onclick="PT.detail(${e.z})"><span class="pt-number">${e.z}</span><span class="pt-symbol">${e.sym}</span></div>`;}).join('');for(var i=elms.length;i<118;i++)g.innerHTML+='<div></div>';},
    search(){var q=document.getElementById('pt-search').value.toLowerCase();document.querySelectorAll('.pt-element').forEach(function(el){el.style.display=(!q||el.dataset.n.toLowerCase().includes(q)||el.dataset.sym.toLowerCase().includes(q))?'flex':'none';});},
    detail(z){var e=elms.find(function(x){return x.z===z;});if(!e)return;document.getElementById('pt-detail').style.display='';
      document.getElementById('pt-detail').innerHTML=`<div style="display:flex;gap:16px;align-items:center"><div style="width:80px;height:80px;background:var(--accent-glow);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:var(--accent)">${e.sym}</div><div><div style="font-size:1.5rem;font-weight:700">${e.n}</div><div style="color:var(--text-muted)">Atomic Number: ${e.z} · Mass: ${e.mass}u · Type: ${e.t}</div></div></div>`;}
  };
  Router.registerRoute('#periodic-full','Periodic Table Full',render);
})();