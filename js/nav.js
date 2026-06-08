// ============================================
// Navigation Builder
// ============================================
(function() {
  const navContainer = document.getElementById('nav-container');
  const searchInput = document.getElementById('search-input');

  const categories = [
    {
      title: 'Home',
      items: [
        { id: 'home', icon: '🏠', label: 'Dashboard' }
      ]
    },
    {
      title: 'Academic Core',
      items: [
        { id: 'gpa', icon: '📊', label: 'GPA Calculator' },
        { id: 'schedule', icon: '📅', label: 'Schedule Planner' },
        { id: 'assignments', icon: '📝', label: 'Assignment Tracker' },
        { id: 'exam-countdown', icon: '⏳', label: 'Exam Countdown' }
      ]
    },
    {
      title: 'STEM Tools',
      items: [
        { id: 'scientific-calc', icon: '🔢', label: 'Scientific Calculator' },
        { id: 'unit-converter', icon: '📐', label: 'Unit Converter' },
        { id: 'periodic-table', icon: '⚛️', label: 'Periodic Table' },
        { id: 'formula-ref', icon: '📖', label: 'Formula Reference' },
        { id: 'tables', icon: '✖️', label: 'Math Tables' },
        { id: 'physics-constants', icon: '🔬', label: 'Physics Constants' }
      ]
    },
    {
      title: 'Productivity',
      items: [
        { id: 'pomodoro', icon: '🍅', label: 'Pomodoro Timer' },
        { id: 'flashcards', icon: '🃏', label: 'Flashcards' },
        { id: 'todo', icon: '✅', label: 'Todo List' },
        { id: 'notes', icon: '📓', label: 'Notes (Markdown)' },
        { id: 'mind-map', icon: '🧠', label: 'Mind Map' },
        { id: 'habit-tracker', icon: '🔄', label: 'Habit Tracker' }
      ]
    },
    {
      title: 'Reference Sheets',
      items: [
        { id: 'cheatsheets', icon: '📋', label: 'Cheatsheets' }
      ]
    },
    {
      title: 'Coding Tools',
      items: [
        { id: 'code-playground', icon: '💻', label: 'Code Playground' },
        { id: 'regex-tester', icon: '🔍', label: 'Regex Tester' },
        { id: 'json-formatter', icon: '{ }', label: 'JSON Formatter' },
        { id: 'base64', icon: '🔐', label: 'Base64 Encoder' },
        { id: 'color-picker', icon: '🎨', label: 'Color Picker' }
      ]
    },
    {
      title: 'Writing',
      items: [
        { id: 'word-counter', icon: '📝', label: 'Word Counter' },
        { id: 'readability', icon: '📈', label: 'Readability Analyzer' },
        { id: 'citation-gen', icon: '📑', label: 'Citation Generator' }
      ]
    },
    {
      title: 'Finance & Health',
      items: [
        { id: 'budget', icon: '💰', label: 'Student Budget' },
        { id: 'water-tracker', icon: '💧', label: 'Water Tracker' },
        { id: 'sleep-calc', icon: '😴', label: 'Sleep Calculator' },
        { id: 'eye-exercise', icon: '👁️', label: 'Eye Exercise (20-20-20)' }
      ]
    }
  ];

  function buildNav(filter) {
    if (!navContainer) return;
    navContainer.innerHTML = '';
    const q = (filter || '').toLowerCase();

    categories.forEach(cat => {
      const filtered = cat.items.filter(item => !q || item.label.toLowerCase().includes(q));
      if (filtered.length === 0) return;

      const secTitle = document.createElement('div');
      secTitle.className = 'nav-section-title';
      secTitle.textContent = cat.title;
      navContainer.appendChild(secTitle);

      filtered.forEach(item => {
        const el = document.createElement('div');
        el.className = 'nav-item' + (location.hash === '#' + item.id ? ' active' : '');
        el.dataset.route = '#' + item.id;
        el.innerHTML = `<span class="icon">${item.icon}</span><span>${item.label}</span>`;
        el.addEventListener('click', () => { Router.navigate('#' + item.id); });
        navContainer.appendChild(el);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => buildNav(searchInput.value));
  }

  buildNav();
})();
