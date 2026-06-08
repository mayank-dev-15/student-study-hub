// ============================================
// Citation Generator (APA, MLA, IEEE)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">📑 Citation Generator</div>
        <div class="form-row">
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Author(s)</label>
            <input type="text" id="cit-author" placeholder="Last, F. M.">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Year</label>
            <input type="text" id="cit-year" placeholder="2024">
          </div>
        </div>
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="cit-title" placeholder="Title of work">
        </div>
        <div class="form-row">
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Source / Journal</label>
            <input type="text" id="cit-source" placeholder="Journal name or website">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>URL</label>
            <input type="text" id="cit-url" placeholder="https://...">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Format</label>
            <select id="cit-format">
              <option value="apa">APA 7th</option>
              <option value="mla">MLA 9th</option>
              <option value="ieee">IEEE</option>
              <option value="chicago">Chicago 17th</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Cit.generate()" style="align-self:flex-end">Generate</button>
        </div>
        <div id="cit-output" style="margin-top:16px;display:none">
          <div style="background:var(--bg-tertiary);border:1px solid var(--border);border-radius:8px;padding:14px;font-size:0.88rem;white-space:pre-wrap" id="cit-result"></div>
          <button class="btn btn-secondary btn-sm" style="margin-top:8px" onclick="Cit.copy()">Copy Citation</button>
        </div>
      </div>
    `;
  }

  window.Cit = {
    generate() {
      const author = document.getElementById('cit-author').value.trim() || 'Unknown';
      const year = document.getElementById('cit-year').value.trim() || 'n.d.';
      const title = document.getElementById('cit-title').value.trim() || 'Untitled';
      const source = document.getElementById('cit-source').value.trim();
      const url = document.getElementById('cit-url').value.trim();
      const format = document.getElementById('cit-format').value;
      let citation = '';
      switch (format) {
        case 'apa':
          citation = `${author} (${year}). ${title}${source ? `. ${source}` : ''}${url ? `. ${url}` : ''}`;
          break;
        case 'mla':
          citation = `${author}. "${title}."${source ? ` ${source},` : ''} ${year}${url ? `, ${url}` : ''}.`;
          break;
        case 'ieee':
          citation = `${author}, "${title},"${source ? ` ${source},` : ''} ${year}${url ? `, ${url}` : ''}.`;
          break;
        case 'chicago':
          citation = `${author}. "${title}."${source ? ` ${source}` : ''} (${year})${url ? `. ${url}` : ''}.`;
          break;
      }
      document.getElementById('cit-result').textContent = citation;
      document.getElementById('cit-output').style.display = '';
    },
    copy() {
      const text = document.getElementById('cit-result').textContent;
      navigator.clipboard.writeText(text).then(() => showToast('Citation copied!'));
    }
  };

  Router.registerRoute('#citation-gen', 'Citation Generator', render);
})();
