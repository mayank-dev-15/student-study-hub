(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📋</span>Regex Cheatsheet</div>
    <input type="text" id="rc-search" placeholder="Search patterns..." oninput="RC.filter()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div id="rc-list" style="max-height:400px;overflow-y:auto"></div></div>`;
    RC.render();
  }
  var patterns=[
    {p:'.',d:'Any character except newline'},
    {p:'\d',d:'Any digit (0-9)'},
    {p:'\D',d:'Any non-digit'},
    {p:'\w',d:'Any word character (a-z, A-Z, 0-9, _)'},
    {p:'\W',d:'Any non-word character'},
    {p:'\s',d:'Any whitespace'},
    {p:'\S',d:'Any non-whitespace'},
    {p:'^',d:'Start of string'},
    {p:'$',d:'End of string'},
    {p:'*',d:'Zero or more'},
    {p:'+',d:'One or more'},
    {p:'?',d:'Zero or one'},
    {p:'{n}',d:'Exactly n times'},
    {p:'{n,}',d:'n or more times'},
    {p:'{n,m}',d:'Between n and m times'},
    {p:'[abc]',d:'Any of a, b, or c'},
    {p:'[^abc]',d:'Not a, b, or c'},
    {p:'[a-z]',d:'Any lowercase letter'},
    {p:'[A-Z]',d:'Any uppercase letter'},
    {p:'[0-9]',d:'Any digit'},
    {p:'(abc)',d:'Group'},
    {p:'a|b',d:'a or b'},
    {p:'\.',d:'Literal dot'},
    {p:'\\',d:'Literal backslash'},
    {p:'\b',d:'Word boundary'},
    {p:'\B',d:'Non-word boundary'},
    {p:'(?:...)',d:'Non-capturing group'},
    {p:'(?=...)',d:'Positive lookahead'},
    {p:'(?!...)',d:'Negative lookahead'},
    {p:'^(.+)$',d:'Entire line'},
    {p:'^[\w.-]+@[\w.-]+\.\w+$',d:'Email'},
    {p:'^https?://.+$',d:'URL'},
    {p:'^\d{4}-\d{2}-\d{2}$',d:'Date YYYY-MM-DD'},
    {p:'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$',d:'IPv4'},
    {p:'^[a-zA-Z0-9]{8,}$',d:'Password (8+ alphanumeric)'}
  ];
  window.RC={
    filter(){let q=document.getElementById('rc-search').value.toLowerCase();this.render(q);},
    render(q){
      let filtered=q?patterns.filter(x=>x.p.toLowerCase().includes(q)||x.d.toLowerCase().includes(q)):patterns;
      document.getElementById('rc-list').innerHTML=filtered.map(x=>`<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)"><code style="color:var(--cyan);font-weight:600;min-width:120px;font-size:0.82rem">${esc(x.p)}</code><span style="font-size:0.82rem;color:var(--text-secondary)">${esc(x.d)}</span><button class="btn btn-sm btn-secondary" style="margin-left:auto;padding:2px 8px;font-size:0.65rem" onclick="navigator.clipboard.writeText('${esc(x.p)}');Toast.success('Copied!')">Copy</button></div>`).join('');
    }
  };
  Router.registerRoute('#regex-cheat','Regex Cheat',render);
})();