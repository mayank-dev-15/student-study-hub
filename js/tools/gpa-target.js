(function(){
  function render(c){
    let courses=Store.get('gpa_courses',[]);
    let totalPts=0,totalCr=0;
    courses.forEach(c=>{totalPts+=c.credits*c.grade;totalCr+=c.credits;});
    let currentGpa=totalCr>0?(totalPts/totalCr).toFixed(2):'0.00';
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🎯</span>GPA Target Calculator</div>
    <div class="stats-row"><div class="stat-box"><div class="stat-value">${currentGpa}</div><div class="stat-label">Current GPA</div></div><div class="stat-box"><div class="stat-value">${totalCr}</div><div class="stat-label">Credits</div></div><div class="stat-box"><div class="stat-value">${courses.length}</div><div class="stat-label">Courses</div></div></div>
    <div class="form-row" style="margin-top:12px"><div class="form-group" style="flex:1;margin-bottom:0"><label>Target GPA</label><input type="number" id="gpa-tg" value="9.0" min="0" max="10" step="0.1"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Additional Credits</label><input type="number" id="gpa-ac" value="3" min="1" max="30"></div><button class="btn btn-primary btn-sm" onclick="GPAT.calc()" style="align-self:flex-end">Calculate</button></div>
    <div id="gpa-result" style="margin-top:12px"></div></div>`;
  }
  window.GPAT={
    calc(){
      let target=parseFloat(document.getElementById('gpa-tg').value)||0,addCr=parseFloat(document.getElementById('gpa-ac').value)||0;
      let courses=Store.get('gpa_courses',[]);
      let totalPts=0,totalCr=0;
      courses.forEach(c=>{totalPts+=c.credits*c.grade;totalCr+=c.credits;});
      let needPts=target*(totalCr+addCr)-totalPts,needAvg=needPts/addCr;
      let el=document.getElementById('gpa-result');
      if(needAvg>10){el.innerHTML='<div class="result-box" style="color:var(--red)">Not possible — need avg grade '+needAvg.toFixed(2)+' (max 10)</div>';}
      else if(needAvg<0){el.innerHTML='<div class="result-box" style="color:var(--green)">Already above target!</div>';}
      else{el.innerHTML=`<div class="result-box" style="color:var(--accent)">Need avg grade: <strong>${needAvg.toFixed(2)}</strong> in ${addCr} credits</div>`;}
    }
  };
  Router.registerRoute('#gpa-target','GPA Target',render);
})();