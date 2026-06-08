(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">⚗️</span>Chemistry Equation Balancer</div>
    <div class="form-group"><label>Unbalanced Equation</label><input type="text" id="cb-in" placeholder="H2 + O2 = H2O" style="font-family:monospace"></div>
    <button class="btn btn-primary btn-sm" onclick="CB.balance()">Balance</button>
    <div id="cb-out" style="margin-top:12px;font-family:monospace;font-size:1.1rem;color:var(--accent)"></div>
    <div style="margin-top:12px;font-size:0.78rem;color:var(--text-muted)">Supports simple equations like: H2+O2=H2O, Fe+O2=Fe2O3, CH4+O2=CO2+H2O</div></div>`;
  }
  window.CB={
    balance(){const eq=document.getElementById('cb-in').value.replace(/\s/g,'');const[out,err]=this.tryBalance(eq);if(err)document.getElementById('cb-out').innerHTML=`<span style="color:var(--red)">${err}</span>`;else document.getElementById('cb-out').textContent=out;},
    tryBalance(eq){const parts=eq.split('=');if(parts.length!==2)return['','Use = to separate sides'];const left=parts[0].split('+'),right=parts[1].split('+');const allSides=[...left.map(s=>({s,side:0})),...right.map(s=>({s,side:1}))];const elements=new Set();const compounds=allSides.map(({s,side})=>{const atoms={};s.match(/([A-Z][a-z]?)(\d*)/g)?.forEach(m=>{const el=m.match(/[A-Z][a-z]?/)[0],num=parseInt(m.match(/\d+/)?.[0]||'1');atoms[el]=(atoms[el]||0)+num;elements.add(el);});return{...atoms,side};});const elList=[...elements];if(elList.length>4)return['','Too many elements (max 4)'];const n=compounds.length;const matrix=elList.map(el=>compounds.map(c=>(c.side===0?1:-1)*(c[el]||0)));for(let i=0;i<10;i++){const coeffs=Array(n).fill(1);let balanced=true;for(let e=0;e<elList.length;e++){let sum=0;for(let j=0;j<n;j++)sum+=matrix[e][j]*coeffs[j];if(Math.abs(sum)>0.01){balanced=false;coeffs[e%n]+=1;}}if(balanced){const lc=left.map((s,i)=>coeffs[i]>1?coeffs[i]+s:s).join(' + ');const rc=right.map((s,i)=>coeffs[left.length+i]>1?coeffs[left.length+i]+s:s).join(' + ');return[`${lc} = ${rc}`,''];}}return['','Could not balance — try simpler equation'];}
  };
  Router.registerRoute('#chem-balancer','Chem Balancer',render);
})();