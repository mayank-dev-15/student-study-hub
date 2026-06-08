// ============================================
// Mind Map (Simple Node Editor)
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🧠 Mind Map</div>
        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="MM.addNode()">+ Add Node</button>
          <button class="btn btn-secondary btn-sm" onclick="MM.clear()">Clear</button>
          <button class="btn btn-secondary btn-sm" onclick="MM.export()">Export JSON</button>
        </div>
        <div class="mind-map-canvas" id="mm-canvas">
          <div class="mm-node root" id="mm-root" style="top:160px;left:50%;transform:translateX(-50%)" data-id="0" contenteditable="true">Central Idea</div>
        </div>
      </div>
    `;
    MM.load();
  }

  window.MM = {
    nodes: Store.get('mindmap_nodes', [{ id: 0, text: 'Central Idea', x: 0, y: 0, root: true }]),
    nextId: 1,

    addNode() {
      const canvas = document.getElementById('mm-canvas');
      const id = this.nextId++;
      const node = document.createElement('div');
      node.className = 'mm-node';
      node.dataset.id = id;
      node.contentEditable = true;
      node.textContent = 'New idea';
      node.style.top = (80 + Math.random() * 200) + 'px';
      node.style.left = (100 + Math.random() * 300) + 'px';
      node.addEventListener('blur', () => MM.save());
      // Drag
      node.addEventListener('mousedown', (e) => MM.drag(e, node));
      canvas.appendChild(node);
      this.nodes.push({ id, text: 'New idea', x: 0, y: 0 });
      this.save();
    },

    drag(e, node) {
      const canvas = document.getElementById('mm-canvas');
      const rect = canvas.getBoundingClientRect();
      const ox = e.clientX - node.offsetLeft;
      const oy = e.clientY - node.offsetTop;
      function move(ev) {
        node.style.left = (ev.clientX - rect.left - ox) + 'px';
        node.style.top = (ev.clientY - rect.top - oy) + 'px';
      }
      function up() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        MM.save();
      }
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },

    clear() {
      if (!confirm('Clear mind map?')) return;
      document.querySelectorAll('.mm-node:not(#mm-root)').forEach(n => n.remove());
      this.nodes = [{ id: 0, text: 'Central Idea', x: 0, y: 0, root: true }];
      this.nextId = 1;
      Store.remove('mindmap_nodes');
    },

    save() {
      const nodes = [];
      document.querySelectorAll('.mm-node').forEach(el => {
        nodes.push({ id: parseInt(el.dataset.id), text: el.textContent, x: el.offsetLeft, y: el.offsetTop, root: el.id === 'mm-root' });
      });
      this.nodes = nodes;
      Store.set('mindmap_nodes', nodes);
    },

    load() {
      const saved = Store.get('mindmap_nodes', null);
      if (!saved || saved.length <= 1) return;
      this.nodes = saved;
      this.nextId = Math.max(...saved.map(n => n.id)) + 1;
      const canvas = document.getElementById('mm-canvas');
      saved.forEach(n => {
        if (n.root) return;
        const node = document.createElement('div');
        node.className = 'mm-node';
        node.dataset.id = n.id;
        node.contentEditable = true;
        node.textContent = n.text;
        node.style.top = n.y + 'px';
        node.style.left = n.x + 'px';
        node.addEventListener('blur', () => MM.save());
        node.addEventListener('mousedown', (e) => MM.drag(e, node));
        canvas.appendChild(node);
      });
    },

    export() {
      const json = JSON.stringify(this.nodes, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'mindmap.json'; a.click();
      URL.revokeObjectURL(url);
    }
  };

  Router.registerRoute('#mind-map', 'Mind Map', render);
})();
