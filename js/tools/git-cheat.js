(function(){
  var cmds=[
    {cat:'Setup',cmd:'git init',desc:'Initialize a new repository'},{cat:'Setup',cmd:'git clone <url>',desc:'Clone a remote repository'},{cat:'Setup',cmd:'git config --global user.name "Name"',desc:'Set global username'},
    {cat:'Basic',cmd:'git add .',desc:'Stage all changes'},{cat:'Basic',cmd:'git add <file>',desc:'Stage specific file'},{cat:'Basic',cmd:'git commit -m "msg"',desc:'Commit staged changes'},{cat:'Basic',cmd:'git status',desc:'Show working tree status'},{cat:'Basic',cmd:'git log --oneline',desc:'Show compact commit history'},
    {cat:'Branch',cmd:'git branch <name>',desc:'Create a new branch'},{cat:'Branch',cmd:'git checkout <name>',desc:'Switch to branch'},{cat:'Branch',cmd:'git checkout -b <name>',desc:'Create and switch'},{cat:'Branch',cmd:'git merge <name>',desc:'Merge branch into current'},{cat:'Branch',cmd:'git branch -d <name>',desc:'Delete branch'},
    {cat:'Remote',cmd:'git push origin main',desc:'Push to remote'},{cat:'Remote',cmd:'git pull origin main',desc:'Pull from remote'},{cat:'Remote',cmd:'git remote add origin <url>',desc:'Add remote origin'},{cat:'Remote',cmd:'git fetch',desc:'Fetch remote changes'},
    {cat:'Undo',cmd:'git checkout -- <file>',desc:'Discard local changes'},{cat:'Undo',cmd:'git reset HEAD <file>',desc:'Unstage file'},{cat:'Undo',cmd:'git revert <commit>',desc:'Revert a commit'},{cat:'Undo',cmd:'git reset --hard HEAD~1',desc:'Undo last commit (destructive)'},
    {cat:'Stash',cmd:'git stash',desc:'Stash changes'},{cat:'Stash',cmd:'git stash pop',desc:'Apply and remove stash'},{cat:'Stash',cmd:'git stash list',desc:'List stashes'},
    {cat:'Info',cmd:'git diff',desc:'Show unstaged changes'},{cat:'Info',cmd:'git diff --staged',desc:'Show staged changes'},{cat:'Info',cmd:'git log --graph --oneline --all',desc:'Visual branch history'},{cat:'Info',cmd:'git blame <file>',desc:'Show line-by-line author'},
    {cat:'Advanced',cmd:'git cherry-pick <commit>',desc:'Apply specific commit'},{cat:'Advanced',cmd:'git rebase main',desc:'Rebase onto main'},{cat:'Advanced',cmd:'git tag v1.0',desc:'Create tag'},{cat:'Advanced',cmd:'git push --tags',desc:'Push tags'}
  ];
  var cats=['All','Setup','Basic','Branch','Remote','Undo','Stash','Info','Advanced'];
  function render(c){
    c.innerHTML=`<div class="card anim-fade"><div class="card-title"><span class="icon">📋</span>Git Command Reference</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">${cats.map(function(cat){return `<button class="btn btn-sm btn-secondary" onclick="GC.filter('${cat}')" style="font-size:0.68rem;padding:4px 10px">${cat}</button>`;}).join('')}</div>
    <input type="text" id="gc-search" placeholder="Search commands..." oninput="GC.filter()" style="margin-bottom:12px;width:100%;padding:8px 14px;background:var(--bg-input);border:1px solid var(--border);border-radius:8px;color:var(--text-primary)">
    <div id="gc-list" style="max-height:400px;overflow-y:auto"></div></div>`;
    GTC.filter('All');
  }
  window.GTC={
    cur:'All',
    filter(cat){
      if(cat)GTC.cur=cat;
      var q=document.getElementById('gc-search').value.toLowerCase();
      var rows=cmds.filter(function(x){return(GTC.cur==='All'||x.cat===GTC.cur)&&(!q||x.cmd.toLowerCase().includes(q)||x.desc.toLowerCase().includes(q));});
      document.getElementById('gc-list').innerHTML=rows.map(function(x){return `<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);align-items:flex-start"><div style="min-width:70px"><span class="badge badge-purple" style="font-size:0.65rem">${x.cat}</span></div><div style="flex:1"><code style="color:var(--cyan);font-size:0.85rem">${esc(x.cmd)}</code><br><span style="font-size:0.75rem;color:var(--text-secondary)">${esc(x.desc)}</span></div><button class="btn btn-sm btn-secondary" style="padding:2px 8px;font-size:0.65rem;flex-shrink:0" onclick="navigator.clipboard.writeText('${esc(x.cmd)}');Toast.success('Copied!')">Copy</button></div>`;}).join('');
    }
  };
  Router.registerRoute('#git-cheat','Git Cheat Sheet',render);
})();