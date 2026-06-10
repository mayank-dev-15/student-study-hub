(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📊</span>Word Frequency Analyzer</div>
    <div class="form-group"><label>Paste Text</label><textarea id="wf-in" rows="6" placeholder="Paste your text here..." oninput="WF.analyze()"></textarea></div>
    <div class="form-row"><div class="form-group" style="margin-bottom:0"><label>Min Length</label><input type="number" id="wf-min" value="3" min="1" style="width:50px" oninput="WF.analyze()"></div>
    <div class="form-group" style="margin-bottom:0"><label>Top N</label><input type="number" id="wf-top" value="20" min="5" max="100" style="width:60px" oninput="WF.analyze()"></div>
    <label class="checkbox-label" style="align-self:flex-end"><input type="checkbox" id="wf-stop" checked onchange="WF.analyze()"> Exclude common words</label></div>
    <div id="wf-result" style="margin-top:12px;max-height:300px;overflow-y:auto"></div></div>`;
  }
  var stops=new Set(['the','and','for','are','but','not','you','all','can','had','her','was','one','our','out','has','have','been','were','they','their','what','when','where','which','this','that','with','from','will','would','there','these','than','then','them','into','some','could','other','about','more','very','just','also','only','such','make','like','over','such','make','like','over','time','very','when','come','made','find','long','look','many','than','them','well','were']);
  window.WF={
    analyze(){
      var text=document.getElementById('wf-in').value.toLowerCase();var minLen=parseInt(document.getElementById('wf-min').value)||3;var topN=parseInt(document.getElementById('wf-top').value)||20;var excludeStops=document.getElementById('wf-stop').checked;
      var words=text.match(/[a-z]+/g)||[];var freq={};words.forEach(function(w){if(w.length<minLen)return;if(excludeStops&&stops.has(w))return;freq[w]=(freq[w]||0)+1;});
      var sorted=Object.entries(freq).sort(function(a,b){return b[1]-a[1];}).slice(0,topN);
      if(!sorted.length){document.getElementById('wf-result').innerHTML='<div style="color:var(--text-muted)">No words found</div>';return;}
      var max=sorted[0][1];var html='';sorted.forEach(function(s){var pct=Math.round(s[1]/max*100);html+=`<div style="display:flex;align-items:center;gap:8px;padding:4px 0"><span style="min-width:100px;font-weight:600">${esc(s[0])}</span><div class="progress-bar" style="flex:1;height:8px"><div class="fill" style="width:${pct}%"></div></div><span style="min-width:40px;text-align:right;font-size:0.75rem;color:var(--text-muted)">${s[1]}</span></div>`;});
      document.getElementById('wf-result').innerHTML=html;
    }
  };
  Router.registerRoute('#word-freq','Word Frequency',render);
})();