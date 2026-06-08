// ============================================
// Notes (Markdown Editor)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📓 Notes (Markdown)</div>
        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <button class="btn btn-sm btn-secondary" onclick="Notes.newNote()">+ New</button>
          <button class="btn btn-sm btn-secondary" onclick="Notes.saveCurrent()">💾 Save</button>
          <button class="btn btn-sm btn-danger" onclick="Notes.deleteCurrent()">🗑 Delete</button>
          <select id="notes-list" onchange="Notes.loadNote(this.value)" style="flex:1;min-width:150px"></select>
        </div>
        <div class="form-group">
          <input type="text" id="note-title" placeholder="Note title..." style="font-size:1.1rem;font-weight:600">
        </div>
        <div class="playground-container" style="grid-template-columns:1fr 1fr">
          <textarea id="note-editor" class="playground-code" spellcheck="false" placeholder="# Start writing in Markdown..." style="min-height:400px"></textarea>
          <div id="note-preview" style="min-height:400px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:14px;overflow:auto;font-size:0.88rem;line-height:1.7"></div>
        </div>
      </div>
    `;
    Notes.refreshList();
    Notes.currentId = null;
  }

  function simpleMd(md) {
    return md
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background:var(--bg-tertiary);padding:1px 5px;border-radius:3px;font-size:0.82rem">$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  window.Notes = {
    currentId: null,

    refreshList() {
      const notes = Store.get('notes', {});
      const sel = document.getElementById('notes-list');
      sel.innerHTML = '<option value="">-- Select Note --</option>';
      Object.keys(notes).forEach(id => {
        sel.innerHTML += `<option value="${id}">${esc(notes[id].title || 'Untitled')}</option>`;
      });
    },

    loadNote(id) {
      if (!id) return;
      const notes = Store.get('notes', {});
      const note = notes[id];
      if (!note) return;
      this.currentId = id;
      document.getElementById('note-title').value = note.title || '';
      document.getElementById('note-editor').value = note.content || '';
      this.preview();
    },

    newNote() {
      this.currentId = null;
      document.getElementById('note-title').value = '';
      document.getElementById('note-editor').value = '';
      document.getElementById('note-preview').innerHTML = '';
      document.getElementById('notes-list').value = '';
    },

    saveCurrent() {
      const title = document.getElementById('note-title').value.trim() || 'Untitled';
      const content = document.getElementById('note-editor').value;
      const notes = Store.get('notes', {});
      const id = this.currentId || 'note_' + Date.now();
      notes[id] = { title, content, updated: Date.now() };
      Store.set('notes', notes);
      this.currentId = id;
      this.refreshList();
      document.getElementById('notes-list').value = id;
      showToast('Note saved!');
    },

    deleteCurrent() {
      if (!this.currentId) return;
      if (!confirm('Delete this note?')) return;
      const notes = Store.get('notes', {});
      delete notes[this.currentId];
      Store.set('notes', notes);
      this.newNote();
      this.refreshList();
    },

    preview() {
      const md = document.getElementById('note-editor').value;
      document.getElementById('note-preview').innerHTML = simpleMd(md);
    }
  };

  // Live preview — attach when editor exists
  function attachPreview() {
    const editor = document.getElementById('note-editor');
    if (editor) editor.addEventListener('input', () => Notes.preview());
    else setTimeout(attachPreview, 200);
  }
  attachPreview();

  Router.registerRoute('#notes', 'Notes', render);
})();
