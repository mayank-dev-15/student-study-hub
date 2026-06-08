// ============================================
// Cheatsheets
// ============================================
(function() {
  const sheets = {
    'HTML': [
      { desc: 'Basic page structure', code: '<!DOCTYPE html>\n<html>\n<head><title>Title</title></head>\n<body></body>\n</html>' },
      { desc: 'Link', code: '<a href="url">text</a>' },
      { desc: 'Image', code: '<img src="url" alt="desc">' },
      { desc: 'Div', code: '<div class="class">content</div>' },
      { desc: 'Span', code: '<span style="color:red">text</span>' },
      { desc: 'Input', code: '<input type="text" placeholder="Enter...">' },
      { desc: 'Button', code: '<button onclick="fn()">Click</button>' },
      { desc: 'Table', code: '<table><tr><th>H</th></tr><tr><td>D</td></tr></table>' },
      { desc: 'Form', code: '<form action="/submit" method="post">\n  <input name="field">\n</form>' },
      { desc: 'Meta viewport', code: '<meta name="viewport" content="width=device-width">' }
    ],
    'CSS': [
      { desc: 'Flexbox center', code: 'display: flex;\njustify-content: center;\nalign-items: center;' },
      { desc: 'Grid columns', code: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 16px;' },
      { desc: 'Media query', code: '@media (max-width: 768px) {\n  .class { display: none; }\n}' },
      { desc: 'Transition', code: 'transition: all 0.3s ease;' },
      { desc: 'Box shadow', code: 'box-shadow: 0 4px 12px rgba(0,0,0,0.15);' },
      { desc: 'Border radius', code: 'border-radius: 8px;' },
      { desc: 'Gradient', code: 'background: linear-gradient(135deg, #667eea, #764ba2);' },
      { desc: 'Animation', code: '@keyframes fade {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}' },
      { desc: 'Position center', code: 'position: absolute;\ntop: 50%; left: 50%;\ntransform: translate(-50%, -50%);' },
      { desc: 'Truncate text', code: 'overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;' }
    ],
    'JavaScript': [
      { desc: 'Event listener', code: 'el.addEventListener("click", (e) => {\n  e.preventDefault();\n});' },
      { desc: 'Fetch API', code: 'const res = await fetch("/api");\nconst data = await res.json();' },
      { desc: 'Array map', code: 'const doubled = arr.map(x => x * 2);' },
      { desc: 'Array filter', code: 'const evens = arr.filter(x => x % 2 === 0);' },
      { desc: 'Array reduce', code: 'const sum = arr.reduce((a, b) => a + b, 0);' },
      { desc: 'Destructuring', code: 'const { name, age } = person;\nconst [first, ...rest] = arr;' },
      { desc: 'Spread', code: 'const merged = { ...obj1, ...obj2 };\nconst copy = [...arr];' },
      { desc: 'Promise', code: 'new Promise((resolve, reject) => {\n  if (ok) resolve(val);\n  else reject(err);\n});' },
      { desc: 'LocalStorage', code: 'localStorage.setItem("key", val);\nconst v = localStorage.getItem("key");' },
      { desc: 'SetTimeout/Interval', code: 'setTimeout(() => fn(), 1000);\nconst id = setInterval(() => fn(), 1000);\nclearInterval(id);' }
    ],
    'Python': [
      { desc: 'List comprehension', code: 'squares = [x**2 for x in range(10)]' },
      { desc: 'Dict comprehension', code: 'd = {k: v for k, v in items}' },
      { desc: 'Read file', code: 'with open("file.txt") as f:\n  data = f.read()' },
      { desc: 'Write file', code: 'with open("file.txt", "w") as f:\n  f.write("hello")' },
      { desc: 'Try/except', code: 'try:\n  result = 10 / x\nexcept ZeroDivisionError:\n  result = 0' },
      { desc: 'Class', code: 'class MyClass:\n  def __init__(self, x):\n    self.x = x' },
      { desc: 'Lambda', code: 'square = lambda x: x ** 2' },
      { desc: 'Enumerate', code: 'for i, val in enumerate(lst):\n  print(i, val)' },
      { desc: 'Zip', code: 'for a, b in zip(list1, list2):\n  print(a, b)' },
      { desc: 'Requests', code: 'import requests\nr = requests.get("https://api.example.com")\ndata = r.json()' }
    ],
    'Git': [
      { desc: 'Init & add', code: 'git init\ngit add .\ngit commit -m "msg"' },
      { desc: 'Branch', code: 'git branch feature\ngit checkout feature\ngit merge feature' },
      { desc: 'Remote', code: 'git remote add origin <url>\ngit push -u origin main' },
      { desc: 'Status & log', code: 'git status\ngit log --oneline --graph' },
      { desc: 'Stash', code: 'git stash\ngit stash pop' },
      { desc: 'Revert', code: 'git revert HEAD\ngit reset --hard HEAD~1' },
      { desc: 'Diff', code: 'git diff\ngit diff --staged' },
      { desc: 'Cherry-pick', code: 'git cherry-pick <commit>' },
      { desc: 'Rebase', code: 'git rebase main\ngit rebase -i HEAD~3' },
      { desc: 'Tags', code: 'git tag v1.0\ngit push --tags' }
    ],
    'SQL': [
      { desc: 'SELECT', code: 'SELECT col1, col2 FROM table WHERE cond;' },
      { desc: 'INSERT', code: 'INSERT INTO table (col1, col2) VALUES (v1, v2);' },
      { desc: 'UPDATE', code: 'UPDATE table SET col1 = v1 WHERE cond;' },
      { desc: 'DELETE', code: 'DELETE FROM table WHERE cond;' },
      { desc: 'JOIN', code: 'SELECT * FROM A\nINNER JOIN B ON A.id = B.id;' },
      { desc: 'GROUP BY', code: 'SELECT col, COUNT(*)\nFROM table\nGROUP BY col\nHAVING COUNT(*) > 1;' },
      { desc: 'ORDER & LIMIT', code: 'SELECT * FROM table\nORDER BY col DESC\nLIMIT 10;' },
      { desc: 'CREATE TABLE', code: 'CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100)\n);' },
      { desc: 'INDEX', code: 'CREATE INDEX idx ON table(col);' },
      { desc: 'Subquery', code: 'SELECT * FROM table\nWHERE id IN (SELECT id FROM other);' }
    ],
    'Regex': [
      { desc: 'Email', code: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
      { desc: 'URL', code: 'https?://[\\w.-]+(?:/[\\w./-]*)?' },
      { desc: 'Phone (US)', code: '^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$' },
      { desc: 'Digits only', code: '^\\d+$' },
      { desc: 'Letters only', code: '^[a-zA-Z]+$' },
      { desc: 'Alphanumeric', code: '^[a-zA-Z0-9]+$' },
      { desc: 'Date (YYYY-MM-DD)', code: '^\\d{4}-\\d{2}-\\d{2}$' },
      { desc: 'IPv4', code: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$' },
      { desc: 'Whitespace', code: '\\s+' },
      { desc: 'Word boundary', code: '\\bword\\b' }
    ]
  };

  function render(contentEl) {
    const cats = Object.keys(sheets);
    let html = '<div class="card"><div class="card-title">📋 Cheatsheets</div>';
    html += '<div class="tabs" id="cheat-tabs">';
    cats.forEach((c, i) => {
      html += `<button class="tab ${i === 0 ? 'active' : ''}" onclick="Cheat.showTab('${esc(c)}', this)">${esc(c)}</button>`;
    });
    html += '</div><div id="cheat-content"></div></div>';
    contentEl.innerHTML = html;
    Cheat.showTab(cats[0], document.querySelector('#cheat-tabs .tab'));
  }

  window.Cheat = {
    showTab(cat, btn) {
      document.querySelectorAll('#cheat-tabs .tab').forEach(t => t.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const data = sheets[cat] || [];
      const rows = data.map(d => `<tr><td>${esc(d.desc)}</td><td><code>${esc(d.code)}</code></td></tr>`).join('');
      document.getElementById('cheat-content').innerHTML =
        `<table class="cheat-table"><tbody>${rows}</tbody></table>`;
    }
  };

  Router.registerRoute('#cheatsheets', 'Cheatsheets', render);
})();
