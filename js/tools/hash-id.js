(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🔍</span>Hash Type Identifier</div>
    <div class="form-group"><label>Paste Hash</label><input type="text" id="hi-in" placeholder="e.g., 5d41402abc4b2a76b9719d911017c592" style="font-family:monospace;font-size:0.85rem" oninput="HI.identify()"></div>
    <div id="hi-result" style="margin-top:12px"></div></div>`;
  }
  window.HI={
    identify(){
      var h=document.getElementById('hi-in').value.trim().toLowerCase();if(!h){document.getElementById('hi-result').innerHTML='';return;}
      var results=[];var len=h.length;var isHex=/^[a-f0-9]+$/.test(h);
      if(isHex){if(len===32)results.push({name:'MD5',confidence:'High',desc:'128-bit hash, 32 hex chars'});if(len===40)results.push({name:'SHA-1',confidence:'High',desc:'160-bit hash, 40 hex chars'});if(len===64)results.push({name:'SHA-256',confidence:'High',desc:'256-bit hash, 64 hex chars'});if(len===128)results.push({name:'SHA-512',confidence:'High',desc:'512-bit hash, 128 hex chars'});if(len===28)results.push({name:'SHA-224',confidence:'Medium',desc:'224-bit hash, 56 hex chars (truncated?)'});if(len===56&&isHex)results.push({name:'SHA-224',confidence:'High',desc:'224-bit hash, 56 hex chars'});}
      if(h.startsWith('$2a$')||h.startsWith('$2b$')||h.startsWith('$2y$'))results.push({name:'bcrypt',confidence:'Very High',desc:'Blowfish-based password hash'});
      if(h.startsWith('$1$'))results.push({name:'MD5-crypt',confidence:'High',desc:'MD5-based Unix crypt'});if(h.startsWith('$5$'))results.push({name:'SHA-256-crypt',confidence:'High',desc:'SHA-256-based Unix crypt'});if(h.startsWith('$6$'))results.push({name:'SHA-512-crypt',confidence:'High',desc:'SHA-512-based Unix crypt'});
      if(h.startsWith('$argon2id$')||h.startsWith('$argon2i$')||h.startsWith('$argon2d$'))results.push({name:'Argon2',confidence:'Very High',desc:'Memory-hard password hash'});
      if(h.match(/^\$pbkdf2-sha\d+\$/))results.push({name:'PBKDF2',confidence:'High',desc:'Password-based key derivation'});
      if(h.length===8&&isHex)results.push({name:'CRC32',confidence:'Medium',desc:'32-bit checksum, 8 hex chars'});
      if(h.length===16&&isHex)results.push({name:'MySQL (old)',confidence:'Medium',desc:'MySQL password hash (pre-4.1)'});
      if(h.startsWith('*')&&h.length===41)results.push({name:'MySQL 4.1+',confidence:'High',desc:'MySQL SHA-1 double hash'});
      if(results.length===0)results.push({name:'Unknown',confidence:'-',desc:'Could not identify hash type. Length: '+len+' chars'});
      var html='';results.forEach(function(r){var col=r.confidence.includes('High')?'var(--green)':r.confidence.includes('Medium')?'var(--yellow)':'var(--text-muted)';html+=`<div style="padding:8px 0;border-bottom:1px solid var(--border)"><strong style="color:${col}">${r.name}</strong> <span class="badge badge-purple" style="font-size:0.65rem">${r.confidence}</span><br><span style="font-size:0.78rem;color:var(--text-secondary)">${r.desc}</span></div>`;});
      document.getElementById('hi-result').innerHTML=html;
    }
  };
  Router.registerRoute('#hash-id','Hash Identifier',render);
})();