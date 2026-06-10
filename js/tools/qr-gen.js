(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade" style="text-align:center"><div class="card-title" style="justify-content:center"><span class="icon">📱</span>QR Code Generator</div>
    <div class="form-group"><label>Text / URL</label><input type="text" id="qr-in" placeholder="Enter text or URL..." oninput="QR.gen()"></div>
    <div id="qr-output" style="margin:16px auto;display:flex;justify-content:center"></div>
    <button class="btn btn-secondary btn-sm" onclick="QR.download()" id="qr-dl" style="display:none">Download PNG</button></div>`;
  }
  window.QR={
    gen(){
      let text=document.getElementById('qr-in').value.trim();
      if(!text){document.getElementById('qr-output').innerHTML='';document.getElementById('qr-dl').style.display='none';return;}
      let size=200,api='https://api.qrserver.com/v1/create-qr-code/?size='+size+'x'+size+'&data='+encodeURIComponent(text);
      document.getElementById('qr-output').innerHTML=`<img src="${api}" alt="QR Code" style="border-radius:8px;border:2px solid var(--border)">`;
      document.getElementById('qr-dl').style.display='';
    },
    download(){
      let img=document.querySelector('#qr-output img');if(!img)return;
      let a=document.createElement('a');a.href=img.src;a.download='qrcode.png';a.click();
    }
  };
  Router.registerRoute('#qr-gen','QR Generator',render);
})();