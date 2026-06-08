# 📚 Student Study Hub v2

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tools](https://img.shields.io/badge/Tools-68-brightgreen.svg)](https://mayank-dev-15.github.io/student-study-hub/)
[![Offline](https://img.shields.io/badge/Offline-Ready-orange.svg)](https://mayank-dev-15.github.io/student-study-hub/)
[![No Signup](https://img.shields.io/badge/Signup-None-red.svg)](https://mayank-dev-15.github.io/student-study-hub/)

**68 free tools for students — 100% offline, no sign-up, runs entirely in your browser.**

🌐 **Live Demo:** [https://mayank-dev-15.github.io/student-study-hub/](https://mayank-dev-15.github.io/student-study-hub/)

---

## ✨ Features

- **68 tools** across 10 categories
- **100% offline** — works without internet after first load
- **No sign-up** — just open and use
- **Dark/Light theme** with smooth transitions
- **Data persistence** — all data saved in your browser
- **Export/Import** — backup and restore all your data
- **Responsive** — works on desktop, tablet, and mobile
- **Keyboard shortcuts** — `Ctrl+B` toggle sidebar, `Ctrl+/` search, `Esc` close modals
- **Zero dependencies** — pure HTML/CSS/JS, no frameworks

---

## 🛠️ Tools (68 Total)

### 📊 Academic (6)
| Tool | Description |
|------|-------------|
| GPA Calculator | Compute GPA/CGPA, target GPA planner |
| Schedule Planner | Weekly schedule with color coding, iCal export |
| Assignment Tracker | Track assignments with priorities, due dates, subtasks |
| Exam Countdown | Live countdown timers for multiple exams |
| Quiz Generator | Create quizzes, import from flashcards |
| Session Logger | Log study sessions per subject |

### 🔢 STEM (13)
| Tool | Description |
|------|-------------|
| Scientific Calculator | Trig, log, powers, factorial, history |
| Graphing Calculator | Plot functions on canvas |
| Unit Converter | 10 categories (length, mass, temp, etc.) |
| Base Converter | Binary, octal, decimal, hexadecimal |
| Periodic Table | Interactive table with element details |
| Formula Reference | 8 categories, searchable, copy-to-clipboard |
| Physics Constants | 24 fundamental constants with units |
| Chem Equation Balancer | Balance simple chemical equations |
| Unit Circle | Interactive unit circle with sin/cos/tan |
| Math Tables | Multiplication, squares, cubes, roots |
| Matrix Calculator | Determinant, transpose, inverse, trace |
| Probability & Stats | Mean, median, mode, std dev, combinations |
| Financial Calculator | Compound interest, loan EMI, tip calculator |

### ✅ Productivity (13)
| Tool | Description |
|------|-------------|
| Pomodoro Timer | Work/break cycles with session tracking |
| Pomodoro Stats | Weekly calendar view of focus sessions |
| Stopwatch | Precision timer with lap tracking |
| Countdown Timer | Custom countdown with alerts |
| Interval Timer | HIIT/workout timer with rounds |
| Todo List | Priorities, filters, due dates |
| Kanban Board | Drag-and-drop task board |
| Flashcards | Spaced repetition, CSV import/export |
| Notes | Markdown editor with live preview |
| Mind Map | Visual node-based mind mapping |
| Habit Tracker | Daily habits with streak counter |
| Goal Tracker | SMART goals with milestones |
| Reading List | Track books with progress |

### 📋 Reference (1)
| Tool | Description |
|------|-------------|
| Cheatsheets | HTML, CSS, JS, Python, Git, SQL, Regex — printable |

### 💻 Coding (15)
| Tool | Description |
|------|-------------|
| Code Playground | HTML/CSS/JS live editor |
| Regex Tester | Test patterns with match highlighting |
| JSON Formatter | Validate, format, minify JSON |
| Base64 Encoder | Encode/decode Base64 |
| Color Picker | HEX/RGB/HSL with palette generator |
| CSS Gradient Generator | Visual gradient builder |
| HTML Entities | Encode/decode HTML entities |
| URL Encoder | Encode/decode URLs, parse query params |
| Text Diff | Compare two texts, highlight differences |
| JWT Decoder | Decode JWT tokens |
| Hash Generator | SHA-256, SHA-1, MD5 |
| Password Generator | Customizable secure passwords |
| Lorem Ipsum | Generate placeholder text |
| Unix Timestamp | Convert timestamps to dates |
| Color Contrast | WCAG AA/AAA contrast checker |

### 📝 Writing (3)
| Tool | Description |
|------|-------------|
| Word Counter | Words, chars, sentences, reading time |
| Readability Analyzer | Flesch score, grade level |
| Citation Generator | APA, MLA, Chicago, IEEE formats |

### 🎮 Games & Fun (4)
| Tool | Description |
|------|-------------|
| Dice Roller | d4, d6, d8, d10, d12, d20, d100 |
| Random Picker | Pick random items from a list |
| Word Scramble | Unscramble programming terms |
| Speed Typing | WPM test with accuracy tracking |

### 💪 Health (5)
| Tool | Description |
|------|-------------|
| Water Tracker | Daily water intake with streak |
| Sleep Calculator | Optimal bedtime based on cycles |
| Eye Exercise | 20-20-20 rule timer |
| BMI Calculator | Body mass index with categories |
| Calorie Calculator | BMR, TDEE, macro breakdown |

### 🔧 Utilities (4)
| Tool | Description |
|------|-------------|
| World Clock | Multiple time zones |
| Expense Splitter | Split bills among friends |
| Student Budget | Income/expense tracker |
| Data Manager | Export/import all data as JSON |

---

## 🚀 Quick Start

### Online
Visit: [https://mayank-dev-15.github.io/student-study-hub/](https://mayank-dev-15.github.io/student-study-hub/)

### Offline
```bash
# Download the zip from Releases, then:
# 1. Extract source-code.zip
# 2. Open index.html in any browser
# 3. Done! No server needed.
```

### From Source
```bash
git clone https://github.com/mayank-dev-15/student-study-hub.git
cd student-study-hub
# Open index.html in browser
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+/` | Focus search |
| `Esc` | Close modal/sidebar |

---

## 📁 Project Structure

```
student-study-hub/
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles (dark/light theme)
├── js/
│   ├── router.js       # Hash-based SPA router
│   ├── theme.js        # Dark/light theme manager
│   ├── storage.js      # localStorage helpers, toast, modal
│   ├── nav.js          # Sidebar navigation builder
│   ├── home.js         # Dashboard/home page
│   ├── app.js          # App initialization
│   └── tools/          # 68 tool modules
│       ├── gpa.js
│       ├── pomodoro.js
│       ├── flashcards.js
│       └── ... (65 more)
└── README.md
```

---

## 🤝 Contributing

This is an open-source project. Feel free to:
- Report bugs
- Suggest new tools
- Submit pull requests

---

## 📄 License

MIT License — free for personal and commercial use.

---

## 👨‍💻 Author

**Mayank Basena** (mayank-dev-15)
- GitHub: [@mayank-dev-15](https://github.com/mayank-dev-15)
- Email: 0mayankbasena@gmail.com
