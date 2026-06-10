(function(){
  var words=['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','perspiciatis','unde','omnis','iste','natus','error','voluptatem','accusantium','doloremque','laudantium','totam','rem','aperiam','eaque','ipsa','quae','ab','illo','inventore','veritatis','quasi','architecto','beatae','vitae','dicta','explicabo','nemo','ipsam','quia','voluptas','aspernatur','aut','odit','fugit','consequuntur','magni','dolores','eos','ratione','sequi','nesciunt','neque','porro','quisquam','nihil','impedit','quo','minus','placeat','facere','possimus','omnis','repudiandae','sint','et','molestiae','non','recusandae','itaque','earum','rerum','hic','tenetur','sapiente','delectus','reiciendis','voluptatibus','maiores','alias','perferendis','doloribus','asperiores','repellat'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📄</span>Advanced Lorem Ipsum</div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Paragraphs</label><input type="number" id="li-p" value="3" min="1" max="20" style="width:60px"></div>
    <div class="form-group" style="margin-bottom:0"><label>Words/para</label><input type="number" id="li-w" value="50" min="10" max="200" style="width:70px"></div>
    <div class="form-group" style="margin-bottom:0"><label>Start with Lorem</label><select id="li-lorem"><option value="yes">Yes</option><option value="no">No</option></select></div>
    <button class="btn btn-primary btn-sm" onclick="LIP.gen()" style="align-self:flex-end">Generate</button></div>
    <textarea id="li-out" rows="10" readonly style="margin-top:12px;font-size:0.85rem;line-height:1.7"></textarea>
    <div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('li-out').value);Toast.success('Copied!')">Copy</button>
    <span id="li-stats" style="font-size:0.75rem;color:var(--text-muted);align-self:center"></span></div></div>`;
  }
  window.LIP={
    gen(){
      var p=parseInt(document.getElementById('li-p').value)||3,w=parseInt(document.getElementById('li-w').value)||50,lorem=document.getElementById('li-lorem').value==='yes';
      var out='',totalWords=0;for(var i=0;i<p;i++){var para='';if(i===0&&lorem)para='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';for(var j=para?6:0;j<w;j++){para+=words[Math.floor(Math.random()*words.length)]+' ';}out+=para.trim()+'

';totalWords+=w;}
      document.getElementById('li-out').value=out.trim();document.getElementById('li-stats').textContent=`${p} paragraphs · ${totalWords} words · ${out.length} chars`;
    }
  };
  Router.registerRoute('#lorem-advanced','Lorem Ipsum Pro',render);
})();