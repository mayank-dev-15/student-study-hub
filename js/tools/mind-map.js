(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🧠</span>Mind Map</div>
    <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" onclick="MM.add()">+ Node</button><button class="btn btn-secondary btn-sm" onclick="MM.clear()">Clear</button><button class="btn btn-secondary btn-sm" onclick="MM.exportPNG()">Export PNG</button></div>
    <div class="mind-map-canvas" id="mm-canvas"><div class="mm-node root" id="mm-root" style="top:150px;left:50%;transform:translateX(-50%)" data-id="0" contenteditable="true">Central Idea</div></div></div>`;
    MM.load();
  }
  window.MM={
    nodes:Store.get('mm_nodes',[{id:0,text:'Central Idea',x:0,y:0,root:true}]),nextId:1,
    add(){const cv=document.getElementById('mm-canvas'),id=this.nextId++,n=document.createElement('div');
      n.className='mm-node';n.dataset.id=id;n.contentEditable=true;n.textContent='New idea';
      n.style.top=(80+Math.random()*200)+'px';n.style.left=(100+Math.random()*300)+'px';
      n.addEventListener('blur',()=>MM.save());n.addEventListener('mousedown',e=>MM.drag(e,n));
      cv.appendChild(n);this.nodes.push({id,text:'New idea',x:0,y:0});this.save();},
    drag(e,n){const cv=document.getElementById('mm-canvas'),r=cv.getBoundingClientRect(),ox=e.clientX-n.offsetLeft,oy=e.clientY-n.offsetTop;
      function mv(ev){n.style.left=(ev.clientX-r.left-ox)+'px';n.style.top=(ev.clientY-r.top-oy)+'px';}
      function up(){document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);MM.save();}
      document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);},
    clear(){document.querySelectorAll('.mm-node:not(#mm-root)').forEach(n=>n.remove());this.nodes=[{id:0,text:'Central Idea',x:0,y:0,root:true}];this.nextId=1;Store.remove('mm_nodes');},
    save(){const nodes=[];document.querySelectorAll('.mm-node').forEach(el=>{nodes.push({id:parseInt(el.dataset.id),text:el.textContent,x:el.offsetLeft,y:el.offsetTop,root:el.id==='mm-root'});});this.nodes=nodes;Store.set('mm_nodes',nodes);},
    load(){const s=Store.get('mm_nodes',null);if(!s||s.length<=1)return;this.nodes=s;this.nextId=Math.max(...s.map(n=>n.id))+1;
      const cv=document.getElementById('mm-canvas');s.forEach(n=>{if(n.root)return;const el=document.createElement('div');el.className='mm-node';el.dataset.id=n.id;el.contentEditable=true;el.textContent=n.text;el.style.top=n.y+'px';el.style.left=n.x+'px';el.addEventListener('blur',()=>MM.save());el.addEventListener('mousedown',e=>MM.drag(e,el));cv.appendChild(el);});},
    exportPNG(){Toast.info('Use browser screenshot (Win+Shift+S) to capture mind map');}
  };
  Router.registerRoute('#mind-map','Mind Map',render);
})();