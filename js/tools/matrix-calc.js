(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔢</span>Matrix Calculator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Rows</label><input type="number" id="mx-r" value="2" min="1" max="5" style="width:50px"></div><div class="form-group" style="margin-bottom:0"><label>Cols</label><input type="number" id="mx-c" value="2" min="1" max="5" style="width:50px"></div><button class="btn btn-secondary btn-sm" onclick="MX.build()" style="align-self:flex-end">Build</button></div>
    <div id="mx-grid" style="margin:12px 0"></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" onclick="MX.op('det')">Determinant</button><button class="btn btn-secondary btn-sm" onclick="MX.op('transpose')">Transpose</button><button class="btn btn-secondary btn-sm" onclick="MX.op('inverse')">Inverse</button><button class="btn btn-secondary btn-sm" onclick="MX.op('trace')">Trace</button></div>
    <div id="mx-result" style="margin-top:12px"></div></div>`;
    MX.build();
  }
  window.MX={
    build(){const r=parseInt(document.getElementById('mx-r').value)||2,c=parseInt(document.getElementById('mx-c').value)||2;
      let html='<table style="margin:0 auto">';for(let i=0;i<r;i++){html+='<tr>';for(let j=0;j<c;j++)html+=`<td><input type="number" class="mx-cell" data-r="${i}" data-c="${j}" value="${i===j?1:0}" style="width:50px;text-align:center;padding:4px"></td>`;html+='</tr>';}
      html+='</table>';document.getElementById('mx-grid').innerHTML=html;
    },
    getMatrix(){const cells=document.querySelectorAll('.mx-cell');const r=parseInt(document.getElementById('mx-r').value)||2,c=parseInt(document.getElementById('mx-c').value)||2;const m=[];for(let i=0;i<r;i++){m[i]=[];for(let j=0;j<c;j++){const cell=document.querySelector(`.mx-cell[data-r="${i}"][data-c="${j}"]`);m[i][j]=parseFloat(cell.value)||0;}}return m;},
    det(m){const n=m.length;if(n===1)return m[0][0];if(n===2)return m[0][0]*m[1][1]-m[0][1]*m[1][0];let d=0;for(let j=0;j<n;j++){const minor=m.slice(1).map(r=>r.filter((_,i)=>i!==j));d+=((j%2===0)?1:-1)*m[0][j]*this.det(minor);}return d;},
    transpose(m){return m[0].map((_,j)=>m.map(r=>r[j]));},
    trace(m){return m.reduce((s,r,i)=>s+r[i],0);},
    inverse(m){const n=m.length;const d=this.det(m);if(Math.abs(d)<1e-10)return null;const adj=m.map((_,i)=>m[0].map((_,j)=>{const minor=m.filter((_,ri)=>ri!==i).map(r=>r.filter((_,cj)=>cj!==j));return((i+j)%2===0?1:-1)*this.det(minor);}));return adj.map(r=>r.map(v=>v/d));},
    op(op){const m=this.getMatrix();const r=document.getElementById('mx-result');try{let res;
      if(op==='det'){if(m.length!==m[0].length){r.innerHTML='<span style="color:var(--red)">Must be square</span>';return;}res=this.det(m);r.innerHTML=`<strong>Determinant:</strong> ${res}`;}
      else if(op==='transpose'){const t=this.transpose(m);r.innerHTML=`<strong>Transpose:</strong><br>`+t.map(r=>`[${r.join(', ')}]`).join('<br>');}
      else if(op==='trace'){if(m.length!==m[0].length){r.innerHTML='<span style="color:var(--red)">Must be square</span>';return;}res=this.trace(m);r.innerHTML=`<strong>Trace:</strong> ${res}`;}
      else if(op==='inverse'){if(m.length!==m[0].length){r.innerHTML='<span style="color:var(--red)">Must be square</span>';return;}const inv=this.inverse(m);if(!inv){r.innerHTML='<span style="color:var(--red)">Matrix is singular</span>';return;}r.innerHTML=`<strong>Inverse:</strong><br>`+inv.map(r=>`[${r.map(v=>v.toFixed(4)).join(', ')}]`).join('<br>');}
      }catch(e){r.innerHTML=`<span style="color:var(--red)">Error: ${e.message}</span>`;}}
  };
  Router.registerRoute('#matrix-calc','Matrix Calculator',render);
})();