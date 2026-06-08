(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎲</span>Probability & Statistics</div>
    <div class="form-group"><label>Data (comma separated)</label><input type="text" id="pr-data" placeholder="1,2,3,4,5,6,7,8,9,10" oninput="PR.calc()"></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="pr-mean">0</div><div class="stat-label">Mean</div></div><div class="stat-box"><div class="stat-value" id="pr-med">0</div><div class="stat-label">Median</div></div><div class="stat-box"><div class="stat-value" id="pr-mode">-</div><div class="stat-label">Mode</div></div><div class="stat-box"><div class="stat-value" id="pr-std">0</div><div class="stat-label">Std Dev</div></div></div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value" id="pr-var">0</div><div class="stat-label">Variance</div></div><div class="stat-box"><div class="stat-value" id="pr-min">0</div><div class="stat-label">Min</div></div><div class="stat-box"><div class="stat-value" id="pr-max">0</div><div class="stat-label">Max</div></div><div class="stat-box"><div class="stat-value" id="pr-sum">0</div><div class="stat-label">Sum</div></div></div>
    <div style="margin-top:12px"><strong>Combinations & Permutations</strong></div>
    <div class="form-row" style="margin-top:8px"><div class="form-group" style="margin-bottom:0"><label>n</label><input type="number" id="pr-n" value="5" min="1" style="width:50px"></div><div class="form-group" style="margin-bottom:0"><label>r</label><input type="number" id="pr-r" value="3" min="1" style="width:50px"></div><button class="btn btn-secondary btn-sm" onclick="PR.comb()" style="align-self:flex-end">Calculate</button></div>
    <div id="pr-comb-result" style="margin-top:8px;font-size:0.82rem"></div></div>`;
    PR.calc();
  }
  function fact(n){if(n<=1)return 1;let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
  window.PR={
    calc(){const raw=document.getElementById('pr-data').value;const d=raw.split(',').map(x=>parseFloat(x.trim())).filter(x=>!isNaN(x));if(!d.length)return;
      const n=d.length,sum=d.reduce((a,b)=>a+b,0),mean=sum/n,min=Math.min(...d),max=Math.max(...d);
      const sorted=[...d].sort((a,b)=>a-b),med=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
      const variance=d.reduce((a,x)=>a+(x-mean)**2,0)/n,std=Math.sqrt(variance);
      const freq={};d.forEach(x=>{freq[x]=(freq[x]||0)+1;});const maxFreq=Math.max(...Object.values(freq));const mode=Object.keys(freq).filter(k=>freq[k]===maxFreq).join(',');
      document.getElementById('pr-mean').textContent=mean.toFixed(2);document.getElementById('pr-med').textContent=med.toFixed(2);document.getElementById('pr-mode').textContent=mode;document.getElementById('pr-std').textContent=std.toFixed(2);document.getElementById('pr-var').textContent=variance.toFixed(2);document.getElementById('pr-min').textContent=min;document.getElementById('pr-max').textContent=max;document.getElementById('pr-sum').textContent=sum;
    },
    comb(){const n=parseInt(document.getElementById('pr-n').value)||0,r=parseInt(document.getElementById('pr-r').value)||0;if(r>n){document.getElementById('pr-comb-result').innerHTML='<span style="color:var(--red)">r cannot be greater than n</span>';return;}const c=fact(n)/(fact(r)*fact(n-r)),p=fact(n)/fact(n-r);document.getElementById('pr-comb-result').innerHTML=`C(${n},${r}) = <strong>${c.toFixed(0)}</strong> | P(${n},${r}) = <strong>${p.toFixed(0)}</strong>`;}
  };
  Router.registerRoute('#probability','Probability & Stats',render);
})();