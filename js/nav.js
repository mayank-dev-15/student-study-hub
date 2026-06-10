// ============================================
// Navigation Builder v2 — generates sidebar from config
// ============================================
(function() {
  const navEl = document.getElementById('nav-container');
  const searchEl = document.getElementById('search-input');

  const NAV = [
    { title: 'Home', items: [
      { id: 'home', icon: '🏠', label: 'Dashboard' }
    ]},
    { title: 'Academic', items: [
      { id: 'gpa', icon: '📊', label: 'GPA Calculator' },
      { id: 'gpa-target', icon: '🎯', label: 'GPA Target Planner' },
      { id: 'schedule', icon: '📅', label: 'Schedule Planner' },
      { id: 'assignments', icon: '📝', label: 'Assignment Tracker' },
      { id: 'exam-countdown', icon: '⏳', label: 'Exam Countdown' },
      { id: 'quiz', icon: '🧪', label: 'Quiz Generator' },
      { id: 'session-logger', icon: '🗂️', label: 'Session Logger' }
    ]},
    { title: 'STEM', items: [
      { id: 'scientific-calc', icon: '🔢', label: 'Scientific Calculator' },
      { id: 'graphing-calc', icon: '📈', label: 'Graphing Calculator' },
      { id: 'unit-converter', icon: '📐', label: 'Unit Converter' },
      { id: 'number-base', icon: '🔢', label: 'Base Converter' },
      { id: 'number-systems', icon: '🔢', label: 'Number Systems (Adv)' },
      { id: 'periodic-table', icon: '⚛️', label: 'Periodic Table' },
      { id: 'periodic-full', icon: '⚛️', label: 'Periodic Table (Full)' },
      { id: 'formula-ref', icon: '📖', label: 'Formula Reference' },
      { id: 'physics-constants', icon: '🔬', label: 'Physics Constants' },
      { id: 'chem-balancer', icon: '⚗️', label: 'Chem Balancer' },
      { id: 'unit-circle', icon: '📐', label: 'Unit Circle' },
      { id: 'tables', icon: '✖️', label: 'Math Tables' },
      { id: 'matrix-calc', icon: '🔢', label: 'Matrix Calculator' },
      { id: 'probability', icon: '🎲', label: 'Probability & Stats' },
      { id: 'ip-calc', icon: '🌐', label: 'IP Calculator' },
      { id: 'financial-calc', icon: '💰', label: 'Financial Calculator' }
    ]},
    { title: 'Productivity', items: [
      { id: 'pomodoro', icon: '🍅', label: 'Pomodoro Timer' },
      { id: 'pomodoro-stats', icon: '📊', label: 'Pomodoro Stats' },
      { id: 'stopwatch', icon: '⏱️', label: 'Stopwatch' },
      { id: 'countdown-timer', icon: '⏰', label: 'Countdown Timer' },
      { id: 'countdown-events', icon: '📅', label: 'Countdown Events' },
      { id: 'interval-timer', icon: '🎮', label: 'Interval Timer' },
      { id: 'todo', icon: '✅', label: 'Todo List' },
      { id: 'kanban', icon: '📋', label: 'Kanban Board' },
      { id: 'flashcards', icon: '🃏', label: 'Flashcards' },
      { id: 'notes', icon: '📓', label: 'Notes (Markdown)' },
      { id: 'mind-map', icon: '🧠', label: 'Mind Map' },
      { id: 'habit-tracker', icon: '🔄', label: 'Habit Tracker' },
      { id: 'goal-tracker', icon: '🎯', label: 'Goal Tracker' },
      { id: 'reading-list', icon: '📚', label: 'Reading List' },
      { id: 'date-countdown', icon: '📅', label: 'Date Countdown' },
      { id: 'meeting-planner', icon: '🌍', label: 'Meeting Planner' }
    ]},
    { title: 'Reference', items: [
      { id: 'cheatsheets', icon: '📋', label: 'Cheatsheets' },
      { id: 'http-codes', icon: '🌐', label: 'HTTP Status Codes' },
      { id: 'git-cheat', icon: '📋', label: 'Git Cheat Sheet' },
      { id: 'regex-cheat', icon: '📋', label: 'Regex Cheat Sheet' },
      { id: 'cron-builder', icon: '⏰', label: 'Cron Builder' },
      { id: 'unix-perm', icon: '🔐', label: 'Unix Permissions' }
    ]},
    { title: 'Coding', items: [
      { id: 'code-playground', icon: '💻', label: 'Code Playground' },
      { id: 'regex-tester', icon: '🔍', label: 'Regex Tester' },
      { id: 'json-formatter', icon: '{ }', label: 'JSON Formatter' },
      { id: 'json-csv', icon: '🔄', label: 'JSON ↔ CSV' },
      { id: 'base64', icon: '🔐', label: 'Base64' },
      { id: 'color-picker', icon: '🎨', label: 'Color Picker' },
      { id: 'palette-gen', icon: '🎨', label: 'Palette Generator' },
      { id: 'css-gradient', icon: '🌈', label: 'CSS Gradient' },
      { id: 'css-animation', icon: '✨', label: 'CSS Animation Gen' },
      { id: 'flexbox-play', icon: '📐', label: 'Flexbox Playground' },
      { id: 'html-entities', icon: '</>', label: 'HTML Entities' },
      { id: 'url-encoder', icon: '🔗', label: 'URL Encoder' },
      { id: 'diff-tool', icon: '🔀', label: 'Text Diff' },
      { id: 'diff-side', icon: '🔀', label: 'Side-by-Side Diff' },
      { id: 'text-compare', icon: '🔀', label: 'Text Compare (Pro)' },
      { id: 'base-converter', icon: '🔢', label: 'Base Converter' },
      { id: 'jwt-decoder', icon: '🔐', label: 'JWT Decoder' },
      { id: 'hash-gen', icon: '#️⃣', label: 'Hash Generator' },
      { id: 'hash-calc', icon: '#️⃣', label: 'Hash Calculator (SHA)' },
      { id: 'hash-id', icon: '🔍', label: 'Hash Identifier' },
      { id: 'password-gen', icon: '🔑', label: 'Password Generator' },
      { id: 'password-strength', icon: '🔐', label: 'Password Analyzer' },
      { id: 'qr-gen', icon: '📱', label: 'QR Code Generator' },
      { id: 'morse', icon: '📡', label: 'Morse Code' },
      { id: 'hex-viewer', icon: '🔢', label: 'Hex / Binary / ASCII' },
      { id: 'ipsum-gen', icon: '📄', label: 'Lorem Ipsum' },
      { id: 'lorem-advanced', icon: '📄', label: 'Lorem Ipsum Pro' },
      { id: 'md-table', icon: '📊', label: 'MD Table Generator' },
      { id: 'unix-time', icon: '⏰', label: 'Unix Timestamp' },
      { id: 'file-size', icon: '💾', label: 'File Size Converter' },
      { id: 'encrypt', icon: '🔒', label: 'Encrypt/Decrypt' },
      { id: 'md-to-html', icon: '📝', label: 'Markdown to HTML' },
      { id: 'box-shadow-gen', icon: '📦', label: 'Box Shadow Generator' },
      { id: 'contrast-grid', icon: '🎨', label: 'Contrast Grid' },
      { id: 'color-blind', icon: '👁️', label: 'Color Blindness Sim' }
    ]},
    { title: 'Writing', items: [
      { id: 'word-counter', icon: '📝', label: 'Word Counter' },
      { id: 'word-freq', icon: '📊', label: 'Word Frequency' },
      { id: 'readability', icon: '📈', label: 'Readability Analyzer' },
      { id: 'citation-gen', icon: '📑', label: 'Citation Generator' }
    ]},
    { title: 'Games & Fun', items: [
      { id: 'dice-roller', icon: '🎲', label: 'Dice Roller' },
      { id: 'random-picker', icon: '🎯', label: 'Random Picker' },
      { id: 'word-scramble', icon: '🔤', label: 'Word Scramble' },
      { id: 'speed-typing', icon: '⌨️', label: 'Speed Typing' },
      { id: 'typing-test', icon: '⌨️', label: 'Typing Test (Pro)' },
      { id: 'emoji-picker', icon: '😀', label: 'Emoji Picker' }
    ]},
    { title: 'Health', items: [
      { id: 'water-tracker', icon: '💧', label: 'Water Tracker' },
      { id: 'sleep-calc', icon: '😴', label: 'Sleep Calculator' },
      { id: 'eye-exercise', icon: '👁️', label: 'Eye Exercise' },
      { id: 'bmi-calc', icon: '⚖️', label: 'BMI Calculator' },
      { id: 'bmr-calc', icon: '🔥', label: 'BMR & TDEE Calculator' },
      { id: 'calorie-calc', icon: '🔥', label: 'Calorie Calculator' }
    ]},
    { title: 'Utilities', items: [
      { id: 'world-clock', icon: '🌍', label: 'World Clock' },
      { id: 'timezone', icon: '🌍', label: 'Time Zone Converter' },
      { id: 'expense-split', icon: '💸', label: 'Expense Splitter' },
      { id: 'unit-price', icon: '🛒', label: 'Unit Price Calculator' },
      { id: 'loan-calc', icon: '🏦', label: 'Loan EMI Calculator' },
      { id: 'budget', icon: '💰', label: 'Student Budget' },
      { id: 'persistence', icon: '💾', label: 'Data Export/Import' }
    ]}
  ];

  function getToolMeta(id) {
    for (const cat of NAV) {
      for (const item of cat.items) {
        if (item.id === id) return item;
      }
    }
    return { id, icon: '🔧', label: id };
  }

  function build(filter) {
    if (!navEl) return;
    navEl.innerHTML = '';
    const q = (filter || '').toLowerCase();
    NAV.forEach(cat => {
      const items = cat.items.filter(item => !q || item.label.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q));
      if (!items.length) return;
      const st = document.createElement('div');
      st.className = 'nav-section-title';
      st.textContent = cat.title;
      navEl.appendChild(st);
      items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'nav-item' + (location.hash === '#' + item.id ? ' active' : '');
        el.dataset.route = '#' + item.id;
        el.innerHTML = `<span class="icon">${item.icon}</span><span>${item.label}</span>`;
        el.addEventListener('click', () => Router.navigate('#' + item.id));
        navEl.appendChild(el);
      });
    });
  }

  if (searchEl) searchEl.addEventListener('input', () => build(searchEl.value));
  build();

  window.NAV_CONFIG = NAV;
  window.getToolMeta = getToolMeta;
})();
