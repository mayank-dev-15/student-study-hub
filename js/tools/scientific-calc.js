// Scientific Calculator v2
(function() {
  function render(el) {
    el.innerHTML = `<div class="card anim-fade"><div class="card-title"><span class="icon">🔢</span>Scientific Calculator</div>
      <div class="calc-display"><div class="expr" id="calc-expr"></div><div id="calc-result">0</div></div>
      <div class="calc-buttons">
        <button class="calc-btn clear" onclick="SciCalc.clear()">C</button>
        <button class="calc-btn" onclick="SciCalc.input('(')">(</button>
        <button class="calc-btn" onclick="SciCalc.input(')')">)</button>
        <button class="calc-btn operator" onclick="SciCalc.input('/')">÷</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.sin')">sin</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.cos')">cos</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.tan')">tan</button>
        <button class="calc-btn operator" onclick="SciCalc.input('*')">×</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.log')">ln</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.log10')">log</button>
        <button class="calc-btn" onclick="SciCalc.input('**')">xʸ</button>
        <button class="calc-btn operator" onclick="SciCalc.input('-')">−</button>
        <button class="calc-btn" onclick="SciCalc.fn('Math.sqrt')">√</button>
        <button class="calc-btn" onclick="SciCalc.input('Math.PI')">π</button>
        <button class="calc-btn" onclick="SciCalc.input('Math.E')">e</button>
        <button class="calc-btn operator" onclick="SciCalc.input('+')">+</button>
        <button class="calc-btn" onclick="SciCalc.input('7')">7</button>
        <button class="calc-btn" onclick="SciCalc.input('8')">8</button>
        <button class="calc-btn" onclick="SciCalc.input('9')">9</button>
        <button class="calc-btn" onclick="SciCalc.input('%')">%</button>
        <button class="calc-btn" onclick="SciCalc.input('4')">4</button>
        <button class="calc-btn" onclick="SciCalc.input('5')">5</button>
        <button class="calc-btn" onclick="SciCalc.input('6')">6</button>
        <button class="calc-btn" onclick="SciCalc.input('!')">n!</button>
        <button class="calc-btn" onclick="SciCalc.input('1')">1</button>
        <button class="calc-btn" onclick="SciCalc.input('2')">2</button>
        <button class="calc-btn" onclick="SciCalc.input('3')">3</button>
        <button class="calc-btn" onclick="SciCalc.backspace()">⌫</button>
        <button class="calc-btn" onclick="SciCalc.input('0')">0</button>
        <button class="calc-btn" onclick="SciCalc.input('.')">.</button>
        <button class="calc-btn equals" onclick="SciCalc.evaluate()">=</button>
      </div>
      <div id="calc-history" style="margin-top:12px;max-height:100px;overflow-y:auto;font-size:0.75rem;color:var(--text-muted)"></div>
    </div>`;
    SciCalc.loadHistory();
  }
  function factorial(n) { if (n < 0) return NaN; if (n <= 1) return 1; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  window.SciCalc = {
    expr: '', history: Store.get('calc_history', []),
    input(v) { this.expr += v; this.update(); },
    fn(f) { this.expr = f.replace('Math.', '') + '(' + (this.expr || '0') + ')'; this.update(); },
    backspace() { this.expr = this.expr.slice(0, -1); this.update(); },
    clear() { this.expr = ''; this.update(); },
    update() { document.getElementById('calc-expr').textContent = this.expr; document.getElementById('calc-result').textContent = this.expr || '0'; },
    evaluate() {
      try {
        let exp = this.expr.replace(/(\d+)!/g, (m, n) => factorial(parseInt(n)));
        const result = Function('"use strict"; return (' + exp + ')')();
        const res = Number(result.toFixed(10));
        this.history.unshift({ expr: this.expr, result: String(res) });
        if (this.history.length > 20) this.history.pop();
        Store.set('calc_history', this.history);
        this.expr = String(res);
        this.update();
        this.renderHistory();
      } catch { document.getElementById('calc-result').textContent = 'Error'; this.expr = ''; }
    },
    loadHistory() { this.renderHistory(); },
    renderHistory() {
      const el = document.getElementById('calc-history');
      if (!el) return;
      el.innerHTML = this.history.slice(0, 5).map(h => `<div style="padding:2px 0;border-bottom:1px solid var(--border)">${esc(h.expr)} = <strong>${esc(h.result)}</strong></div>`).join('');
    }
  };
  Router.registerRoute('#scientific-calc', 'Scientific Calculator', render);
})();