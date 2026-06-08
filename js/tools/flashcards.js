// ============================================
// Flashcards with Spaced Repetition
// ============================================
(function() {
  function render(contentEl) {
    const cards = Store.get('flashcards', []);
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🃏 Flashcards</div>
        <div class="form-row" style="margin-bottom:12px">
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Front (Question)</label>
            <input type="text" id="fc-front" placeholder="Question or term">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Back (Answer)</label>
            <input type="text" id="fc-back" placeholder="Answer or definition">
          </div>
          <button class="btn btn-primary btn-sm" onclick="FC.add()" style="align-self:flex-end">Add</button>
        </div>
        <div id="fc-list"></div>
      </div>

      <div class="card" id="fc-study-card" style="display:none">
        <div class="card-title" style="justify-content:center">Study Mode</div>
        <div id="fc-study-info" style="text-align:center;color:var(--text-muted);font-size:0.82rem;margin-bottom:12px"></div>
        <div class="flashcard-container">
          <div class="flashcard" id="fc-study-card-el" onclick="FC.flip()">
            <div class="flashcard-face flashcard-front" id="fc-study-front"></div>
            <div class="flashcard-face flashcard-back" id="fc-study-back"></div>
          </div>
        </div>
        <div class="flashcard-controls" id="fc-study-controls" style="display:none">
          <button class="btn btn-danger btn-sm" onclick="FC.answer(0)">✗ Hard</button>
          <button class="btn btn-secondary btn-sm" onclick="FC.answer(1)">~ Medium</button>
          <button class="btn btn-primary btn-sm" onclick="FC.answer(2)">✓ Easy</button>
        </div>
        <div style="text-align:center;margin-top:12px">
          <button class="btn btn-secondary btn-sm" onclick="FC.exitStudy()" style="margin-top:8px">Exit Study</button>
        </div>
      </div>
    `;
    FC.renderList();
  }

  window.FC = {
    cards: Store.get('flashcards', []),
    studyIndex: 0,
    studyQueue: [],

    add() {
      const front = document.getElementById('fc-front').value.trim();
      const back = document.getElementById('fc-back').value.trim();
      if (!front || !back) { showToast('Enter both front and back'); return; }
      this.cards.push({ front, back, interval: 0, nextReview: Date.now(), created: Date.now() });
      Store.set('flashcards', this.cards);
      document.getElementById('fc-front').value = '';
      document.getElementById('fc-back').value = '';
      this.renderList();
      showToast('Flashcard added!');
    },

    remove(i) {
      this.cards.splice(i, 1);
      Store.set('flashcards', this.cards);
      this.renderList();
    },

    renderList() {
      const el = document.getElementById('fc-list');
      if (this.cards.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No flashcards yet. Add some above!</p>';
        return;
      }
      const rows = this.cards.map((c, i) => `<tr>
        <td>${esc(c.front)}</td><td>${esc(c.back)}</td>
        <td><span class="badge badge-purple">Lvl ${c.interval}</span></td>
        <td><button class="btn btn-danger btn-sm" onclick="FC.remove(${i})">✕</button></td>
      </tr>`).join('');
      el.innerHTML = `<div style="overflow-x:auto"><table>
        <thead><tr><th>Front</th><th>Back</th><th>Level</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <button class="btn btn-primary" style="margin-top:12px" onclick="FC.startStudy()">📖 Study All (${this.cards.length})</button>
      </div>`;
    },

    startStudy() {
      const now = Date.now();
      // Priority: overdue first, then by interval (lowest first)
      this.studyQueue = this.cards
        .map((c, i) => ({ ...c, idx: i }))
        .sort((a, b) => a.nextReview - b.nextReview || a.interval - b.interval);
      this.studyIndex = 0;
      document.getElementById('fc-study-card').style.display = '';
      this.showCard();
    },

    showCard() {
      if (this.studyIndex >= this.studyQueue.length) {
        showToast('All cards reviewed!');
        this.exitStudy();
        return;
      }
      const card = this.studyQueue[this.studyIndex];
      document.getElementById('fc-study-front').textContent = card.front;
      document.getElementById('fc-study-back').textContent = card.back;
      document.getElementById('fc-study-card-el').classList.remove('flipped');
      document.getElementById('fc-study-controls').style.display = 'none';
      document.getElementById('fc-study-info').textContent =
        `Card ${this.studyIndex + 1} of ${this.studyQueue.length} • Click to reveal`;
    },

    flip() {
      const el = document.getElementById('fc-study-card-el');
      el.classList.toggle('flipped');
      if (el.classList.contains('flipped')) {
        document.getElementById('fc-study-controls').style.display = 'flex';
        document.getElementById('fc-study-info').textContent = 'Rate your recall';
      }
    },

    answer(quality) {
      // quality: 0=hard, 1=medium, 2=easy
      const card = this.studyQueue[this.studyIndex];
      const origIdx = card.idx;
      if (quality === 0) {
        this.cards[origIdx].interval = Math.max(0, this.cards[origIdx].interval - 1);
      } else if (quality === 1) {
        this.cards[origIdx].interval += 1;
      } else {
        this.cards[origIdx].interval += 2;
      }
      const intervals = [0, 60000, 300000, 3600000, 86400000, 604800000, 2592000000];
      const ivals = Math.min(this.cards[origIdx].interval, intervals.length - 1);
      this.cards[origIdx].nextReview = Date.now() + intervals[ivals];
      Store.set('flashcards', this.cards);
      this.studyIndex++;
      this.showCard();
    },

    exitStudy() {
      document.getElementById('fc-study-card').style.display = 'none';
      this.renderList();
    }
  };

  Router.registerRoute('#flashcards', 'Flashcards', render);
});
