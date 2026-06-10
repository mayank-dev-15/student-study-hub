(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎨</span>Color Palette Generator</div>
    <div class="form-group"><label>Base Color</label><input type="color" id="pg-base" value="#7b9aff" oninput="PG.gen()"></div>
    <div class="form-group"><label>Scheme</label><select id="pg-scheme" onchange="PG.gen()"><option value="complementary">Complementary</option><option value="triadic">Triadic</option><option value="analogous">Analogous</option><option value="split">Split-Complementary</option><option value="monochrome">Monochrome</option></select></div>
    <div id="pg-colors" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"></div>
    <textarea id="pg-css" rows="4" readonly style="margin-top:12px;font-size:0.78rem"></textarea>
    <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="navigator.clipboard.writeText(document.getElementById('pg-css').value);Toast.success('Copied!')">Copy CSS</button></div>`;
    PG.gen();
  }
  function hexToHsl(hex){let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;let max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;if(max===min)h=s=0;else{let d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);h=max===r?((g-b)/d+(g<b?6:0))/6:max===g?((b-r)/d+2)/6:((r-g)/d+4)/6;}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
  function hslToHex(h,s,l){h/=360;s/=100;l/=100;let r,g,b;if(s===0)r=g=b=l;else{let hue2rgb=function(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};let q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}return'#'+[Math.round(r*255),Math.round(g*255),Math.round(b*255)].map(x=>x.toString(16).padStart(2,'0')).join('');}
  window.PG={
    gen(){
      let base=document.getElementById('pg-base').value,scheme=document.getElementById('pg-scheme').value;
      let[h,s,l]=hexToHsl(base),colors=[];
      if(scheme==='complementary')colors=[base,hslToHex((h+180)%360,s,l)];
      else if(scheme==='triadic')colors=[base,hslToHex((h+120)%360,s,l),hslToHex((h+240)%360,s,l)];
      else if(scheme==='analogous')colors=[hslToHex((h-30+360)%360,s,l),base,hslToHex((h+30)%360,s,l)];
      else if(scheme==='split')colors=[base,hslToHex((h+150)%360,s,l),hslToHex((h+210)%360,s,l)];
      else if(scheme==='monochrome')colors=[hslToHex(h,s,Math.max(10,l-30)),base,hslToHex(h,s,Math.min(90,l+30))];
      let html='';colors.forEach(function(col){html+=`<div style="flex:1;min-width:80px"><div style="height:60px;border-radius:8px;background:${col};border:2px solid var(--border);cursor:pointer" onclick="navigator.clipboard.writeText('${col}');Toast.success('Copied ${col}!')" title="Click to copy"></div><div style="text-align:center;font-size:0.72rem;color:var(--text-muted);margin-top:4px">${col}</div></div>`;});
      document.getElementById('pg-colors').innerHTML=html;
      let css=':root {
'+colors.map((c,i)+'  --color-'+(i+1)+': '+c+';').join('
')+'
}';
      document.getElementById('pg-css').value=css;
    }
  };
  Router.registerRoute('#palette-gen','Palette Generator',render);
})();