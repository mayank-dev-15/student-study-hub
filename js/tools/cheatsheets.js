(function(){
  const S={'HTML':[{d:'Page',c:'<!DOCTYPE html>
<html><head><title>T</title></head>
<body></body></html>'},{d:'Link',c:'<a href="url">text</a>'},{d:'Input',c:'<input type="text>" placeholder="...">'}],'CSS':[{d:'Flex center',c:'display:flex;justify-content:center;align-items:center'},{d:'Grid',c:'display:grid;grid-template-columns:repeat(3,1fr);gap:16px'},{d:'Gradient',c:'background:linear-gradient(135deg,#667eea,#764ba2)'}],'JS':[{d:'Event',c:'el.addEventListener("click",e=>{})'},{d:'Fetch',c:'const r=await fetch("/api");const d=await r.json()'},{d:'Map',c:'arr.map(x=>x*2)'}],'Python':[{d:'List comp',c:'[x**2 for x in range(10)]'},{d:'Read file',c:'with open("f") as f: data=f.read()'},{d:'Class',c:'class C:
  def __init__(s,x):
    s.x=x'}],'Git':[{d:'Init',c:'git init
git add .
git commit -m "msg"'},{d:'Push',c:'git push -u origin main'},{d:'Log',c:'git log --oneline --graph'}],'SQL':[{d:'SELECT',c:'SELECT col FROM table WHERE cond'},{d:'JOIN',c:'SELECT * FROM A INNER JOIN B ON A.id=B.id'},{d:'GROUP',c:'SELECT c,COUNT(*) FROM t GROUP BY c'}],'Regex':[{d:'Email',c:'^[\w.-]+@[\w.-]+\.\w+$'},{d:'Digits',c:'^\d+$'},{d:'Date',c:'^\d{4}-\d{2}-\d{2}$'}]};
  function render(c){const cats=Object.keys(S);c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📋</span>Cheatsheets</div><div class="tabs">${cats.map((k,i)=>`<button class="tab ${i===0?'active':''}" onclick="Cheat.show('${k}',this)">${k}</button>`).join('')}</div><div id="cheat-content"></div></div>`;Cheat.show(cats[0],document.querySelector('.tabs .tab'));}
  window.Cheat={show(cat,btn){document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.remove('active'));if(btn)btn.classList.add('active');const rows=(S[cat]||[]).map(x=>`<tr><td>${esc(x.d)}</td><td><code>${esc(x.c)}</code></td></tr>`).join('');document.getElementById('cheat-content').innerHTML=`<table class="cheat-table"><tbody>${rows}</tbody></table><button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="window.print()">🖨 Print</button>`;}};
  Router.registerRoute('#cheatsheets','Cheatsheets',render);
})();