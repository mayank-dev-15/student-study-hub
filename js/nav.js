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
      { id: 'periodic-table', icon: '⚛️', label: 'Periodic Table' },
      { id: 'formula-ref', icon: '📖', label: 'Formula Reference' },
      { id: 'physics-constants', icon: '🔬', label: 'Physics Constants' },
      { id: 'chem-balancer', icon: '⚗️', label: 'Chem Balancer' },
      { id: 'unit-circle', icon: '📐', label: 'Unit Circle' },
      { id: 'tables', icon: '✖️', label: 'Math Tables' },
      { id: 'matrix-calc', icon: '🔢', label: 'Matrix Calculator' },
      { id: 'probability', icon: '🎲', label: 'Probability & Stats' },
      { id: 'financial-calc', icon: '💰', label: 'Financial Calculator' }
    ]},
    { title: 'Productivity', items: [
      { id: 'pomodoro', icon: '🍅', label: 'Pomodoro Timer' },
      { id: 'pomodoro-stats', icon: '📊', label: 'Pomodoro Stats' },
      { id: 'stopwatch', icon: '⏱️', label: 'Stopwatch' },
      { id: 'countdown-timer', icon: '⏰', label: 'Countdown Timer' },
      { id: 'interval-timer', icon: '🎮', label: 'Interval Timer' },
      { id: 'todo', icon: '✅', label: 'Todo List' },
      { id: 'kanban', icon: '📋', label: 'Kanban Board' },
      { id: 'flashcards', icon: '🃏', label: 'Flashcards' },
      { id: 'notes', icon: '📓', label: 'Notes (Markdown)' },
      { id: 'mind-map', icon: '🧠', label: 'Mind Map' },
      { id: 'habit-tracker', icon: '🔄', label: 'Habit Tracker' },
      { id: 'goal-tracker', icon: '🎯', label: 'Goal Tracker' },
      { id: 'reading-list', icon: '📚', label: 'Reading List' }
    ]},
    { title: 'Reference', items: [
      { id: 'cheatsheets', icon: '📋', label: 'Cheatsheets' }
    ]},
    { title: 'Coding', items: [
      { id: 'code-playground', icon: '💻', label: 'Code Playground' },
      { id: 'regex-tester', icon: '🔍', label: 'Regex Tester' },
      { id: 'json-formatter', icon: '{ }', label: 'JSON Formatter' },
      { id: 'base64', icon: '🔐', label: 'Base64' },
      { id: 'color-picker', icon: '🎨', label: 'Color Picker' },
      { id: 'css-gradient', icon: '🌈', label: 'CSS Gradient' },
      { id: 'html-entities', icon: '</>', label: 'HTML Entities' },
      { id: 'url-encoder', icon: '🔗', label: 'URL Encoder' },
      { id: 'diff-tool', icon: '🔀', label: 'Text Diff' },
      { id: 'jwt-decoder', icon: '🔐', label: 'JWT Decoder' },
      { id: 'hash-gen', icon: '#️⃣', label: 'Hash Generator' },
      { id: 'password-gen', icon: '🔑', label: 'Password Generator' },
      { id: 'ipsum-gen', icon: '📄', label: 'Lorem Ipsum' },
      { id: 'unix-time', icon: '⏰', label: 'Unix Timestamp' },
      { id: 'color-contrast', icon: '🎨', label: 'Color Contrast WCAG' }
    ]},
    { title: 'Writing', items: [
      { id: 'word-counter', icon: '📝', label: 'Word Counter' },
      { id: 'readability', icon: '📈', label: 'Readability Analyzer' },
      { id: 'citation-gen', icon: '📑', label: 'Citation Generator' }
    ]},
    { title: 'Games & Fun', items: [
      { id: 'dice-roller', icon: '🎲', label: 'Dice Roller' },
      { id: 'random-picker', icon: '🎯', label: 'Random Picker' },
      { id: 'word-scramble', icon: '🔤', label: 'Word Scramble' },
      { id: 'speed-typing', icon: '⌨️', label: 'Speed Typing' }
    ]},
    { title: 'Health', items: [
      { id: 'water-tracker', icon: '💧', label: 'Water Tracker' },
      { id: 'sleep-calc', icon: '😴', label: 'Sleep Calculator' },
      { id: 'eye-exercise', icon: '👁️', label: 'Eye Exercise' },
      { id: 'bmi-calc', icon: '⚖️', label: 'BMI Calculator' },
      { id: 'calorie-calc', icon: '🔥', label: 'Calorie Calculator' }
    ]},
    { title: 'Utilities', items: [
      { id: 'world-clock', icon: '🌍', label: 'World Clock' },
      { id: 'expense-split', icon: '💸', label: 'Expense Splitter' },
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
