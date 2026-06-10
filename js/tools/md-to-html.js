(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📝</span>Markdown to HTML</div>
    <div class="playground-container">
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">Markdown Input</label><textarea id="md-in" class="playground-code" rows="12" placeholder="# Title&#10;&#10;**Bold** text&#10;&#10;- Item 1&#10;- Item 2&#10;&#10;[Link](https://example.com)" oninput="MD.convert()"></textarea></div>
      <div><label style="font-size:0.78rem;color:var(--text-secondary)">HTML Output</label><div id="md-out" style="min-height:280px;background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;overflow:auto;font-size:0.85rem;line-height:1.7"></div></div>
    </div>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('md-out').innerHTML);Toast.success('HTML Copied!')">Copy HTML</button></div>`;
    MD.convert();
  }
  window.MD={
    convert(){
      let md=document.getElementById('md-in').value;
      let h=md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      h=h.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>');
      h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
      h=h.replace(/`(.+?)`/g,'<code style="background:var(--bg-input);padding:1px 5px;border-radius:3px;font-size:0.82rem">$1</code>');
      h=h.replace(/^- (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\/li>
?)+/g,'<ul>$&</ul>');
      h=h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:var(--accent)">$1</a>');
      h=h.replace(/

/g,'<br><br>').replace(/
/g,'<br>');
      document.getElementById('md-out').innerHTML=h;
    }
  };
  Router.registerRoute('#md-to-html','MD to HTML',render);
})();