// ============================================
// Scientific Calculator
// ============================================
(function() {
  function render(contentEl) {
    contentEl.innerHTML = `
      <div class="card">
        <div class="card-title">🔢 Scientific Calculator</div>
        <div class="calc-display">
          <div class="expr" id="calc-expr"></div>
          <div id="calc-result">0</div>
        </div>
        <div class="calc-buttons">
          <button class="calc-btn clear" onclick="SciCalc.clear()">C</button>
          <button class="calc-btn" onclick="SciCalc.input('(')">(</button>
          <button class="calc-btn" onclick="SciCalc.input(')')">)</button>
          <button class="calc-btn operator" onclick="SciCalc.input('/')">÷</button>

          <button class="calc-btn" onclick="SciCalc.func('Math.sin')">sin</button>
          <button class="calc-btn" onclick="SciCalc.func('Math.cos')">cos</button>
          <button class="calc-btn" onclick="SciCalc.func('Math.tan')">tan</button>
          <button class="calc-btn operator" onclick="SciCalc.input('*')">×</button>

          <button class="calc-btn" onclick="SciCalc.func('Math.log')">ln</button>
          <button class="calc-btn" onclick="SciCalc.func('Math.log10')">log</button>
          <button class="calc-btn" onclick="SciCalc.input('**')">x^y</button>
          <button class="calc-btn operator" onclick="SciCalc.input('-')">−</button>

          <button class="calc-btn" onclick="SciCalc.func('Math.sqrt')">√</button>
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
          <button class="calc-btn equals" onclick="SciCalc.evaluate()">= =</button>
        </div>
      </div>
    `;
  }

  function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }

  window.SciCalc = {
    expr: '',
    input(val) { this.expr += val; this.update(); },
    func(fn) {
      const disp = fn.replace('Math.', '');
      this.expr = `${disp}(${this.expr || '0'})`;
      this.update();
    },
    backspace() { this.expr = this.expr.slice(0, -1); this.update(); },
    clear() { this.expr = ''; this.update(); },
    update() {
      document.getElementById('calc-expr').textContent = this.expr;
      document.getElementById('calc-result').textContent = this.expr || '0';
    },
    evaluate() {
      try {
        let exp = this.expr.replace(/(\d+)!/g, (m, n) => factorial(parseInt(n)));
        const result = Function('"use strict"; return (' + exp + ')')();
        this.expr = String(Number(result.toFixed(10)));
        this.update();
      } catch { document.getElementById('calc-result').textContent = 'Error'; this.expr = ''; }
    }
  };

  Router.registerRoute('#scientific-calc', 'Scientific Calculator', render);
})();
