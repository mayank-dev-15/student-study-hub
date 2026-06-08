(function(){
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">🧪</span>Quiz Generator</div>
    <div class="form-group"><label>Question</label><input type="text" id="qz-q" placeholder="Enter question..."></div>
    <div class="form-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Option A</label><input type="text" id="qz-a" placeholder="Option A"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Option B</label><input type="text" id="qz-b" placeholder="Option B"></div></div>
    <div class="form-row"><div class="form-group" style="flex:1;margin-bottom:0"><label>Option C</label><input type="text" id="qz-c" placeholder="Option C"></div><div class="form-group" style="flex:1;margin-bottom:0"><label>Option D</label><input type="text" id="qz-d" placeholder="Option D"></div></div>
    <div class="form-group"><label>Correct Answer</label><select id="qz-ans"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></div>
    <button class="btn btn-primary btn-sm" onclick="Quiz.addQ()">Add Question</button>
    <div id="qz-list" style="margin-top:12px"></div>
    <div style="margin-top:12px;display:flex;gap:8px"><button class="btn btn-success btn-sm" onclick="Quiz.start()">▶ Start Quiz</button><button class="btn btn-secondary btn-sm" onclick="Quiz.importFromFC()">📥 From Flashcards</button><button class="btn btn-danger btn-sm" onclick="Quiz.clear()">Clear All</button></div>
    </div>
    <div class="card" id="qz-play" style="display:none"><div class="card-title" style="justify-content:center">Quiz Mode</div>
    <div id="qz-progress" style="font-size:0.78rem;color:var(--text-muted);text-align:center;margin-bottom:8px"></div>
    <div id="qz-question" style="font-size:1.1rem;font-weight:600;margin-bottom:16px"></div>
    <div id="qz-options"></div>
    <div id="qz-result" style="margin-top:16px;text-align:center;font-size:1.2rem;font-weight:700;display:none"></div>
    <div style="text-align:center;margin-top:12px"><button class="btn btn-secondary btn-sm" onclick="Quiz.exit()">Exit</button></div></div>`;
    Quiz.renderList();
  }
  window.Quiz={
    questions:Store.get('quiz_questions',[]),idx:0,score:0,
    addQ(){const q=document.getElementById('qz-q').value.trim(),ops=[document.getElementById('qz-a').value.trim(),document.getElementById('qz-b').value.trim(),document.getElementById('qz-c').value.trim(),document.getElementById('qz-d').value.trim()],ans=parseInt(document.getElementById('qz-ans').value);
      if(!q||ops.some(!o=>!o)){Toast.error('Fill all fields');return;}
      this.questions.push({q,ops,ans});Store.set('quiz_questions',this.questions);
      ['qz-q','qz-a','qz-b','qz-c','qz-d'].forEach(id=>document.getElementById(id).value='');
      this.renderList();Toast.success('Question added!');
    },
    renderList(){const el=document.getElementById('qz-list');if(!this.questions.length){el.innerHTML='<div class="empty-state"><p>No questions yet.</p></div>';return;}el.innerHTML=`<strong>${this.questions.length} questions</strong><br>`+this.questions.map((x,i)=>`<div style="padding:4px 0;font-size:0.82rem;border-bottom:1px solid var(--border)">${i+1}. ${esc(x.q)} <button class="btn btn-danger btn-sm" style="padding:1px 6px;font-size:0.65rem" onclick="Quiz.delQ(${i})">✕</button></div>`).join('');},
    delQ(i){this.questions.splice(i,1);Store.set('quiz_questions',this.questions);this.renderList();},
    clear(){this.questions=[];Store.remove('quiz_questions');this.renderList();},
    importFromFC(){const fc=Store.get('flashcards',[]);let n=0;fc.forEach(c=>{if(c.front&&c.back){this.questions.push({q:c.front,ops:[c.back,'','',''],ans:0});n++;}});Store.set('quiz_questions',this.questions);this.renderList();Toast.success(`Imported ${n} questions from flashcards`);},
    start(){if(!this.questions.length){Toast.error('Add questions first');return;}this.idx=0;this.score=0;document.getElementById('qz-play').style.display='';this.showQ();},
    showQ(){const q=this.questions[this.idx];document.getElementById('qz-progress').textContent=`Question ${this.idx+1} of ${this.questions.length}`;document.getElementById('qz-question').textContent=q.q;document.getElementById('qz-result').style.display='none';document.getElementById('qz-options').innerHTML=q.ops.map((o,i)=>`<div class="tool-card" style="margin-bottom:6px" onclick="Quiz.ans(${i})"><span style="font-weight:700;margin-right:8px">${String.fromCharCode(65+i)}</span>${esc(o)}</div>`).join('');},
    ans(i){const q=this.questions[this.idx],correct=i===q.ans;document.getElementById('qz-result').style.display='';document.getElementById('qz-result').innerHTML=correct?'<span style="color:var(--green)">✓ Correct!</span>':'<span style="color:var(--red)">✗ Wrong! Answer: '+String.fromCharCode(65+q.ans)+'</span>';if(correct)this.score++;document.getElementById('qz-options').innerHTML='';setTimeout(()=>{this.idx++;if(this.idx>=this.questions.length)document.getElementById('qz-result').innerHTML+=`<br><strong>Score: ${this.score}/${this.questions.length}</strong>`;else this.showQ();},1500);},
    exit(){document.getElementById('qz-play').style.display='none';}
  };
  Router.registerRoute('#quiz','Quiz Generator',render);
})();