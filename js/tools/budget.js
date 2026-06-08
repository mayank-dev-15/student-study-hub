// ============================================
// Student Budget Planner
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">💰 Student Budget Planner</div>
        <div class="form-row" style="margin-bottom:12px">
          <div class="form-group" style="flex:2;margin-bottom:0">
            <label>Description</label>
            <input type="text" id="bud-desc" placeholder="e.g., Tuition, Food, Books">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Amount</label>
            <input type="number" id="bud-amount" placeholder="0.00" step="0.01">
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0">
            <label>Type</label>
            <select id="bud-type">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="Bud.add()" style="align-self:flex-end">Add</button>
        </div>
        <div class="stats-row">
          <div class="stat-box"><div class="stat-value" id="bud-income" style="color:var(--green)">$0.00</div><div class="stat-label">Total Income</div></div>
          <div class="stat-box"><div class="stat-value" id="bud-expense" style="color:var(--red)">$0.00</div><div class="stat-label">Total Expenses</div></div>
          <div class="stat-box"><div class="stat-value" id="bud-balance">$0.00</div><div class="stat-label">Balance</div></div>
        </div>
        <div id="bud-list" style="margin-top:12px;overflow-x:auto"></div>
        <div style="margin-top:12px;text-align:right">
          <button class="btn btn-danger btn-sm" onclick="Bud.clear()">Clear All</button>
        </div>
      </div>
    `;
    Bud.load();
  }

  window.Bud = {
    items: Store.get('budget_items', []),

    add() {
      const desc = document.getElementById('bud-desc').value.trim();
      const amount = parseFloat(document.getElementById('bud-amount').value);
      const type = document.getElementById('bud-type').value;
      if (!desc || isNaN(amount) || amount <= 0) { showToast('Enter valid description and amount'); return; }
      this.items.push({ desc, amount, type, id: Date.now() });
      Store.set('budget_items', this.items);
      document.getElementById('bud-desc').value = '';
      document.getElementById('bud-amount').value = '';
      this.renderList();
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      Store.set('budget_items', this.items);
      this.renderList();
    },

    clear() {
      if (!confirm('Clear all entries?')) return;
      this.items = [];
      Store.remove('budget_items');
      this.renderList();
    },

    renderList() {
      const income = this.items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0);
      const expense = this.items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0);
      const balance = income - expense;

      document.getElementById('bud-income').textContent = '$' + income.toFixed(2);
      document.getElementById('bud-expense').textContent = '$' + expense.toFixed(2);
      document.getElementById('bud-balance').textContent = '$' + balance.toFixed(2);
      document.getElementById('bud-balance').style.color = balance >= 0 ? 'var(--green)' : 'var(--red)';

      const el = document.getElementById('bud-list');
      if (this.items.length === 0) {
        el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No entries yet.</p>';
        return;
      }
      const rows = this.items.map(i => `<tr>
        <td>${esc(i.desc)}</td>
        <td><span class="badge ${i.type === 'income' ? 'badge-green' : 'badge-red'}">${i.type}</span></td>
        <td style="text-align:right;font-weight:600;color:${i.type === 'income' ? 'var(--green)' : 'var(--red)'}">${i.type === 'income' ? '+' : '-'}$${i.amount.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="Bud.remove(${i.id})">✕</button></td>
      </tr>`).join('');
      el.innerHTML = `<table><thead><tr><th>Description</th><th>Type</th><th style="text-align:right">Amount</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
    },

    load() { this.renderList(); }
  };

  Router.registerRoute('#budget', 'Student Budget', render);
})();
