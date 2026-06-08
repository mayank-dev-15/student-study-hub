// ============================================
// Periodic Table
// ============================================
(function() {
  const elements = [
    { z:1, sym:'H', name:'Hydrogen', type:'nonmetal' },
    { z:2, sym:'He', name:'Helium', type:'noble' },
    { z:3, sym:'Li', name:'Lithium', type:'alkali' },
    { z:4, sym:'Be', name:'Beryllium', type:'alkaline' },
    { z:5, sym:'B', name:'Boron', type:'metalloid' },
    { z:6, sym:'C', name:'Carbon', type:'nonmetal' },
    { z:7, sym:'N', name:'Nitrogen', type:'nonmetal' },
    { z:8, sym:'O', name:'Oxygen', type:'nonmetal' },
    { z:9, sym:'F', name:'Fluorine', type:'halogen' },
    { z:10, sym:'Ne', name:'Neon', type:'noble' },
    { z:11, sym:'Na', name:'Sodium', type:'alkali' },
    { z:12, sym:'Mg', name:'Magnesium', type:'alkaline' },
    { z:13, sym:'Al', name:'Aluminum', type:'post' },
    { z:14, sym:'Si', name:'Silicon', type:'metalloid' },
    { z:15, sym:'P', name:'Phosphorus', type:'nonmetal' },
    { z:16, sym:'S', name:'Sulfur', type:'nonmetal' },
    { z:17, sym:'Cl', name:'Chlorine', type:'halogen' },
    { z:18, sym:'Ar', name:'Argon', type:'noble' },
    { z:19, sym:'K', name:'Potassium', type:'alkali' },
    { z:20, sym:'Ca', name:'Calcium', type:'alkaline' },
    { z:21, sym:'Sc', name:'Scandium', type:'transition' },
    { z:22, sym:'Ti', name:'Titanium', type:'transition' },
    { z:23, sym:'V', name:'Vanadium', type:'transition' },
    { z:24, sym:'Cr', name:'Chromium', type:'transition' },
    { z:25, sym:'Mn', name:'Manganese', type:'transition' },
    { z:26, sym:'Fe', name:'Iron', type:'transition' },
    { z:27, sym:'Co', name:'Cobalt', type:'transition' },
    { z:28, sym:'Ni', name:'Nickel', type:'transition' },
    { z:29, sym:'Cu', name:'Copper', type:'transition' },
    { z:30, sym:'Zn', name:'Zinc', type:'transition' },
    { z:31, sym:'Ga', name:'Gallium', type:'post' },
    { z:32, sym:'Ge', name:'Germanium', type:'metalloid' },
    { z:33, sym:'As', name:'Arsenic', type:'metalloid' },
    { z:34, sym:'Se', name:'Selenium', type:'nonmetal' },
    { z:35, sym:'Br', name:'Bromine', type:'halogen' },
    { z:36, sym:'Kr', name:'Krypton', type:'noble' },
    { z:37, sym:'Rb', name:'Rubidium', type:'alkali' },
    { z:38, sym:'Sr', name:'Strontium', type:'alkaline' },
    { z:39, sym:'Y', name:'Yttrium', type:'transition' },
    { z:40, sym:'Zr', name:'Zirconium', type:'transition' },
    { z:41, sym:'Nb', name:'Niobium', type:'transition' },
    { z:42, sym:'Mo', name:'Molybdenum', type:'transition' },
    { z:43, sym:'Tc', name:'Technetium', type:'transition' },
    { z:44, sym:'Ru', name:'Ruthenium', type:'transition' },
    { z:45, sym:'Rh', name:'Rhodium', type:'transition' },
    { z:46, sym:'Pd', name:'Palladium', type:'transition' },
    { z:47, sym:'Ag', name:'Silver', type:'transition' },
    { z:48, sym:'Cd', name:'Cadmium', type:'transition' },
    { z:49, sym:'In', name:'Indium', type:'post' },
    { z:50, sym:'Sn', name:'Tin', type:'post' },
    { z:51, sym:'Sb', name:'Antimony', type:'metalloid' },
    { z:52, sym:'Te', name:'Tellurium', type:'metalloid' },
    { z:53, sym:'I', name:'Iodine', type:'halogen' },
    { z:54, sym:'Xe', name:'Xenon', type:'noble' },
    { z:55, sym:'Cs', name:'Cesium', type:'alkali' },
    { z:56, sym:'Ba', name:'Barium', type:'alkaline' },
    { z:57, sym:'La', name:'Lanthanum', type:'lanthanide' },
    { z:58, sym:'Ce', name:'Cerium', type:'lanthanide' },
    { z:59, sym:'Pr', name:'Praseodymium', type:'lanthanide' },
    { z:60, sym:'Nd', name:'Neodymium', type:'lanthanide' },
    { z:61, sym:'Pm', name:'Promethium', type:'lanthanide' },
    { z:62, sym:'Sm', name:'Samarium', type:'lanthanide' },
    { z:63, sym:'Eu', name:'Europium', type:'lanthanide' },
    { z:64, sym:'Gd', name:'Gadolinium', type:'lanthanide' },
    { z:65, sym:'Tb', name:'Terbium', type:'lanthanide' },
    { z:66, sym:'Dy', name:'Dysprosium', type:'lanthanide' },
    { z:67, sym:'Ho', name:'Holmium', type:'lanthanide' },
    { z:68, sym:'Er', name:'Erbium', type:'lanthanide' },
    { z:69, sym:'Tm', name:'Thulium', type:'lanthanide' },
    { z:70, sym:'Yb', name:'Ytterbium', type:'lanthanide' },
    { z:71, sym:'Lu', name:'Lutetium', type:'lanthanide' },
    { z:72, sym:'Hf', name:'Hafnium', type:'transition' },
    { z:73, sym:'Ta', name:'Tantalum', type:'transition' },
    { z:74, sym:'W', name:'Tungsten', type:'transition' },
    { z:75, sym:'Re', name:'Rhenium', type:'transition' },
    { z:76, sym:'Os', name:'Osmium', type:'transition' },
    { z:77, sym:'Ir', name:'Iridium', type:'transition' },
    { z:78, sym:'Pt', name:'Platinum', type:'transition' },
    { z:79, sym:'Au', name:'Gold', type:'transition' },
    { z:80, sym:'Hg', name:'Mercury', type:'transition' },
    { z:81, sym:'Tl', name:'Thallium', type:'post' },
    { z:82, sym:'Pb', name:'Lead', type:'post' },
    { z:83, sym:'Bi', name:'Bismuth', type:'post' },
    { z:84, sym:'Po', name:'Polonium', type:'metalloid' },
    { z:85, sym:'At', name:'Astatine', type:'halogen' },
    { z:86, sym:'Rn', name:'Radon', type:'noble' },
    { z:87, sym:'Fr', name:'Francium', type:'alkali' },
    { z:88, sym:'Ra', name:'Radium', type:'alkaline' },
    { z:89, sym:'Ac', name:'Actinium', type:'actinide' },
    { z:90, sym:'Th', name:'Thorium', type:'actinide' },
    { z:91, sym:'Pa', name:'Protactinium', type:'actinide' },
    { z:92, sym:'U', name:'Uranium', type:'actinide' },
    { z:93, sym:'Np', name:'Neptunium', type:'actinide' },
    { z:94, sym:'Pu', name:'Plutonium', type:'actinide' },
    { z:95, sym:'Am', name:'Americium', type:'actinide' },
    { z:96, sym:'Cm', name:'Curium', type:'actinide' },
    { z:97, sym:'Bk', name:'Berkelium', type:'actinide' },
    { z:98, sym:'Cf', name:'Californium', type:'actinide' },
    { z:99, sym:'Es', name:'Einsteinium', type:'actinide' },
    { z:100, sym:'Fm', name:'Fermium', type:'actinide' },
    { z:101, sym:'Md', name:'Mendelevium', type:'actinide' },
    { z:102, sym:'No', name:'Nobelium', type:'actinide' },
    { z:103, sym:'Lr', name:'Lawrencium', type:'actinide' },
    { z:104, sym:'Rf', name:'Rutherfordium', type:'transition' },
    { z:105, sym:'Db', name:'Dubnium', type:'transition' },
    { z:106, sym:'Sg', name:'Seaborgium', type:'transition' },
    { z:107, sym:'Bh', name:'Bohrium', type:'transition' },
    { z:108, sym:'Hs', name:'Hassium', type:'transition' },
    { z:109, sym:'Mt', name:'Meitnerium', type:'transition' },
    { z:110, sym:'Ds', name:'Darmstadtium', type:'transition' },
    { z:111, sym:'Rg', name:'Roentgenium', type:'transition' },
    { z:112, sym:'Cn', name:'Copernicium', type:'transition' },
    { z:113, sym:'Nh', name:'Nihonium', type:'post' },
    { z:114, sym:'Fl', name:'Flerovium', type:'post' },
    { z:115, sym:'Mc', name:'Moscovium', type:'post' },
    { z:116, sym:'Lv', name:'Livermorium', type:'post' },
    { z:117, sym:'Ts', name:'Tennessine', type:'halogen' },
    { z:118, sym:'Og', name:'Oganesson', type:'noble' }
  ];

  // Simplified positions (row, col) for the table layout
  function getPos(z) {
    if (z <= 2) return { r: 1, c: z === 1 ? 1 : 18 };
    if (z <= 10) return { r: 2, c: z - 2 <= 2 ? z - 2 : z + 8 };
    if (z <= 18) return { r: 3, c: z - 10 <= 2 ? z - 10 : z };
    if (z <= 36) return { r: 4, c: z <= 20 ? z - 18 : z - 18 };
    if (z <= 54) return { r: 5, c: z <= 38 ? z - 36 : z - 36 };
    if (z <= 86) return { r: 6, c: z <= 56 ? z - 54 : z - 54 };
    return { r: 7, c: z <= 88 ? z - 86 : z - 86 };
  }

  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">⚛️ Periodic Table of Elements</div>
        <div class="pt-grid" id="pt-grid"></div>
        <div id="pt-detail" style="margin-top:16px;display:none" class="card">
          <div id="pt-detail-content"></div>
        </div>
      </div>
    `;
    const grid = document.getElementById('pt-grid');
    // Build 7 rows x 18 cols
    const cells = Array.from({ length: 7 }, () => Array(18).fill(null));
    elements.forEach(el => {
      const pos = getPos(el.z);
      if (pos.r <= 7 && pos.c <= 18) cells[pos.r - 1][pos.c - 1] = el;
    });

    let html = '';
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 18; c++) {
        const el = cells[r][c];
        if (el) {
          html += `<div class="pt-element pt-${el.type}" onclick="PT.showDetail(${el.z})" title="${el.name} (${el.sym})">
            <span class="pt-number">${el.z}</span>
            <span class="pt-symbol">${el.sym}</span>
          </div>`;
        } else {
          html += '<div></div>';
        }
      }
    }
    grid.innerHTML = html;
  }

  window.PT = {
    showDetail(z) {
      const el = elements.find(e => e.z === z);
      if (!el) return;
      const detail = document.getElementById('pt-detail');
      const content = document.getElementById('pt-detail-content');
      detail.style.display = '';
      content.innerHTML = `<strong style="font-size:1.3rem;color:var(--accent)">${el.sym}</strong> — ${el.name} (Z=${el.z})<br>
        <span style="color:var(--text-muted);font-size:0.85rem">Type: ${el.type}</span>`;
    }
  };

  Router.registerRoute('#periodic-table', 'Periodic Table', render);
})();
