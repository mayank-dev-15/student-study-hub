(function(){
  const elms=[
    {z:1,sym:'H',n:'Hydrogen',t:'nonmetal'},{z:2,sym:'He',n:'Helium',t:'noble'},
    {z:3,sym:'Li',n:'Lithium',t:'alkali'},{z:4,sym:'Be',n:'Beryllium',t:'alkaline'},
    {z:5,sym:'B',n:'Boron',t:'metalloid'},{z:6,sym:'C',n:'Carbon',t:'nonmetal'},
    {z:7,sym:'N',n:'Nitrogen',t:'nonmetal'},{z:8,sym:'O',n:'Oxygen',t:'nonmetal'},
    {z:9,sym:'F',n:'Fluorine',t:'halogen'},{z:10,sym:'Ne',n:'Neon',t:'noble'},
    {z:11,sym:'Na',n:'Sodium',t:'alkali'},{z:12,sym:'Mg',n:'Magnesium',t:'alkaline'},
    {z:13,sym:'Al',n:'Aluminum',t:'post'},{z:14,sym:'Si',n:'Silicon',t:'metalloid'},
    {z:15,sym:'P',n:'Phosphorus',t:'nonmetal'},{z:16,sym:'S',n:'Sulfur',t:'nonmetal'},
    {z:17,sym:'Cl',n:'Chlorine',t:'halogen'},{z:18,sym:'Ar',n:'Argon',t:'noble'},
    {z:19,sym:'K',n:'Potassium',t:'alkali'},{z:20,sym:'Ca',n:'Calcium',t:'alkaline'},
    {z:26,sym:'Fe',n:'Iron',t:'transition'},{z:29,sym:'Cu',n:'Copper',t:'transition'},
    {z:30,sym:'Zn',n:'Zinc',t:'transition'},{z:47,sym:'Ag',n:'Silver',t:'transition'},
    {z:79,sym:'Au',n:'Gold',t:'transition'},{z:82,sym:'Pb',n:'Lead',t:'post'},
    {z:92,sym:'U',n:'Uranium',t:'actinide'}
  ];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⚛️</span>Periodic Table</div>
    <input type="text" id="pt-search" placeholder="Search..." oninput="PT.search()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div class="pt-grid" id="pt-grid"></div>
    <div id="pt-detail" style="margin-top:12px;display:none" class="card"></div></div>`;PT.grid();}
  window.PT={search(){const q=document.getElementById('pt-search').value.toLowerCase();document.querySelectorAll('.pt-element').forEach(el=>{el.style.display=(!q||el.dataset.n.toLowerCase().includes(q)||el.dataset.sym.toLowerCase().includes(q))?'flex':'none';});},
    grid(){const g=document.getElementById('pt-grid');g.innerHTML=elms.map(e=>`<div class="pt-element pt-${e.t}" data-n="${e.n}" data-sym="${e.sym}" onclick="PT.detail(${e.z})"><span class="pt-number">${e.z}</span><span class="pt-symbol">${e.sym}</span></div>`).join('');for(let i=elms.length;i<118;i++)g.innerHTML+='<div></div>';},
    detail(z){const e=elms.find(x=>x.z===z);document.getElementById('pt-detail').style.display='';document.getElementById('pt-detail').innerHTML=`<strong style="font-size:1.3rem;color:var(--accent)">${e.sym}</strong> — ${e.n} (Z=${e.z})<br><span style="color:var(--text-muted);font-size:0.82rem">Type: ${e.t}</span>`;}};
  Router.registerRoute('#periodic-table','Periodic Table',render);
})();