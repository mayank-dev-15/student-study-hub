(function(){
  const words=['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📄</span>Lorem Ipsum Generator</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Paragraphs</label><input type="number" id="li-p" value="3" min="1" max="20" style="width:70px"></div><div class="form-group" style="margin-bottom:0"><label>Words/para</label><input type="number" id="li-w" value="50" min="10" max="200" style="width:70px"></div><button class="btn btn-primary btn-sm" onclick="LI.gen()" style="align-self:flex-end">Generate</button></div>
    <textarea id="li-out" rows="8" readonly style="margin-top:12px"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('li-out').value);Toast.success('Copied!')">Copy</button></div>`;
  }
  window.LI={
    gen(){const p=parseInt(document.getElementById('li-p').value)||3,w=parseInt(document.getElementById('li-w').value)||50;
      let out='';for(let i=0;i<p;i++){let para='';for(let j=0;j<w;j++)para+=words[Math.floor(Math.random()*words.length)]+' ';out+=para.trim()+'

';}
      document.getElementById('li-out').value=out.trim();
    }
  };
  Router.registerRoute('#ipsum-gen','Lorem Ipsum Generator',render);
})();