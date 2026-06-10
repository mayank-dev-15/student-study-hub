(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌐</span>HTTP Status Codes</div>
    <input type="text" id="hc-search" placeholder="Search code or description..." oninput="HC.filter()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div id="hc-list" style="max-height:400px;overflow-y:auto"></div></div>`;
    HC.render();
  }
  var codes=[
    {code:200,text:'OK',d:'Request succeeded'},
    {code:201,text:'Created',d:'Resource created'},
    {code:204,text:'No Content',d:'Success, no body'},
    {code:301,text:'Moved Permanently',d:'Permanent redirect'},
    {code:302,text:'Found',d:'Temporary redirect'},
    {code:304,text:'Not Modified',d:'Cached version valid'},
    {code:400,text:'Bad Request',d:'Invalid request syntax'},
    {code:401,text:'Unauthorized',d:'Authentication required'},
    {code:403,text:'Forbidden',d:'Access denied'},
    {code:404,text:'Not Found',d:'Resource not found'},
    {code:405,text:'Method Not Allowed',d:'HTTP method not supported'},
    {code:408,text:'Request Timeout',d:'Server timed out'},
    {code:409,text:'Conflict',d:'Resource conflict'},
    {code:418,text:"I'm a Teapot",d:'Easter egg (RFC 2324)'},
    {code:429,text:'Too Many Requests',d:'Rate limit exceeded'},
    {code:500,text:'Internal Server Error',d:'Server error'},
    {code:502,text:'Bad Gateway',d:'Invalid upstream response'},
    {code:503,text:'Service Unavailable',d:'Server overloaded'},
    {code:504,text:'Gateway Timeout',d:'Upstream timeout'}
  ];
  window.HC={
    filter(){let q=document.getElementById('hc-search').value.toLowerCase();this.render(q);},
    render(q){
      let filtered=q?codes.filter(x=>x.code.toString().includes(q)||x.text.toLowerCase().includes(q)||x.d.toLowerCase().includes(q)):codes;
      document.getElementById('hc-list').innerHTML=filtered.map(x=>{
        let col=x.code<300?'var(--green)':x.code<400?'var(--yellow)':x.code<500?'var(--orange)':'var(--red)';
        return`<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);align-items:center"><span style="font-weight:700;color:${col};min-width:40px">${x.code}</span><span style="font-weight:600;min-width:140px;font-size:0.82rem">${x.text}</span><span style="font-size:0.78rem;color:var(--text-muted)">${x.d}</span></div>`;
      }).join('');
    }
  };
  Router.registerRoute('#http-codes','HTTP Codes',render);
})();