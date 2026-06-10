(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🌐</span>IP Address Calculator</div>
    <div class="form-group"><label>IP Address</label><input type="text" id="ip-addr" placeholder="192.168.1.1" oninput="IP.calc()"></div>
    <div class="form-group"><label>CIDR / Subnet Mask</label><input type="text" id="ip-mask" placeholder="255.255.255.0 or /24" oninput="IP.calc()"></div>
    <div id="ip-result" style="display:none"><div class="stats-row"><div class="stat-box"><div class="stat-value" id="ip-net">-</div><div class="stat-label">Network</div></div><div class="stat-box"><div class="stat-value" id="ip-bc">-</div><div class="stat-label">Broadcast</div></div><div class="stat-box"><div class="stat-value" id="ip-hosts">-</div><div class="stat-label">Hosts</div></div><div class="stat-box"><div class="stat-value" id="ip-class">-</div><div class="stat-label">Class</div></div></div>
    <div class="form-group" style="margin-top:12px"><label>Binary</label><input type="text" id="ip-bin" readonly style="font-family:monospace;font-size:0.82rem"></div>
    <div class="form-group"><label>Hex</label><input type="text" id="ip-hex" readonly style="font-family:monospace"></div>
    <div class="form-group"><label>Type</label><input type="text" id="ip-type" readonly></div></div></div>`;
  }
  window.IP={
    calc(){
      var addr=document.getElementById('ip-addr').value.trim(),mask=document.getElementById('ip-mask').value.trim();
      if(!addr){document.getElementById('ip-result').style.display='none';return;}
      var parts=addr.split('.');if(parts.length!==4){Toast.error('Invalid IP');return;}
      var ip=parts.map(function(p){return parseInt(p,10);});if(ip.some(function(p){return isNaN(p)||p<0||p>255;})){Toast.error('Invalid IP');return;}
      var cidr;if(mask.startsWith('/')){cidr=parseInt(mask.slice(1));}else{var mParts=mask.split('.');var mBits=0;mParts.forEach(function(p){mBits+=parseInt(p).toString(2).split('1').length-1;});cidr=mBits;}
      if(isNaN(cidr)||cidr<0||cidr>32){Toast.error('Invalid mask');return;}
      var ipNum=(ip[0]<<24)|(ip[1]<<16)|(ip[2]<<8)|ip[3];
      var maskNum=cidr===0?0:(0xFFFFFFFF<<(32-cidr))>>>0;
      var netNum=(ipNum&maskNum)>>>0,bcNum=(netNum|(~maskNum>>>0))>>>0;
      var net=this.toIP(netNum),bc=this.toIP(bcNum);
      var hosts=cidr>=31?0:Math.pow(2,32-cidr)-2;
      var cls=ip[0]<128?'A':ip[0]<192?'B':ip[0]<224?'C':ip[0]<240?'D':'E';
      var type='';if(ip[0]===10||ip[0]===172&&ip[1]>=16&&ip[1]<=31||ip[0]===192&&ip[1]===168)type='Private';else if(ip[0]===127)type='Loopback';else type='Public';
      document.getElementById('ip-result').style.display='';
      document.getElementById('ip-net').textContent=net;document.getElementById('ip-bc').textContent=bc;
      document.getElementById('ip-hosts').textContent=hosts;document.getElementById('ip-class').textContent=cls;
      document.getElementById('ip-bin').value=ip.map(function(p){return p.toString(2).padStart(8,'0');}).join('.');
      document.getElementById('ip-hex').value=ip.map(function(p){return p.toString(16).toUpperCase().padStart(2,'0');}).join('.');
      document.getElementById('ip-type').value=type;
    },
    toIP(n){return((n>>>24)&255)+'.'+((n>>>16)&255)+'.'+((n>>>8)&255)+'.'+(n&255);}
  };
  Router.registerRoute('#ip-calc','IP Calculator',render);
})();