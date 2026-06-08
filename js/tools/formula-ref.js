// ============================================
// Formula Reference
// ============================================
(function() {
  const formulas = {
    'Algebra': [
      { f: 'Quadratic Formula', v: 'x = (-b ± √(b²-4ac)) / 2a' },
      { f: 'Difference of Squares', v: 'a² - b² = (a+b)(a-b)' },
      { f: 'Perfect Square', v: '(a±b)² = a² ± 2ab + b²' },
      { f: 'Sum of Cubes', v: 'a³ + b³ = (a+b)(a²-ab+b²)' },
      { f: 'Difference of Cubes', v: 'a³ - b³ = (a-b)(a²+ab+b²)' },
      { f: 'Binomial Theorem', v: '(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ' }
    ],
    'Geometry': [
      { f: 'Circle Area', v: 'A = πr²' },
      { f: 'Circle Circumference', v: 'C = 2πr' },
      { f: 'Sphere Volume', v: 'V = (4/3)πr³' },
      { f: 'Sphere Surface Area', v: 'A = 4πr²' },
      { f: 'Cylinder Volume', v: 'V = πr²h' },
      { f: 'Cone Volume', v: 'V = (1/3)πr²h' },
      { f: 'Pythagorean Theorem', v: 'a² + b² = c²' },
      { f: 'Triangle Area', v: 'A = (1/2)bh' },
      { f: 'Trapezoid Area', v: 'A = (1/2)(a+b)h' }
    ],
    'Trigonometry': [
      { f: 'sin²θ + cos²θ', v: '= 1' },
      { f: 'tan θ', v: '= sin θ / cos θ' },
      { f: 'sin(2θ)', v: '= 2 sin θ cos θ' },
      { f: 'cos(2θ)', v: '= cos²θ - sin²θ' },
      { f: 'Law of Sines', v: 'a/sin A = b/sin B = c/sin C' },
      { f: 'Law of Cosines', v: 'c² = a² + b² - 2ab cos C' }
    ],
    'Calculus': [
      { f: 'Power Rule', v: 'd/dx [xⁿ] = nxⁿ⁻¹' },
      { f: 'Product Rule', v: 'd/dx [fg] = f\'g + fg\'' },
      { f: 'Chain Rule', v: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)' },
      { f: '∫ xⁿ dx', v: '= xⁿ⁺¹/(n+1) + C' },
      { f: '∫ eˣ dx', v: '= eˣ + C' },
      { f: '∫ sin x dx', v: '= -cos x + C' },
      { f: '∫ cos x dx', v: '= sin x + C' },
      { f: 'Fundamental Theorem', v: '∫ₐᵇ f(x)dx = F(b) - F(a)' }
    ],
    'Physics - Mechanics': [
      { f: 'Velocity', v: 'v = d/t' },
      { f: 'Acceleration', v: 'a = Δv/Δt' },
      { f: 'Newton\'s 2nd Law', v: 'F = ma' },
      { f: 'Kinetic Energy', v: 'KE = (1/2)mv²' },
      { f: 'Potential Energy', v: 'PE = mgh' },
      { f: 'Momentum', v: 'p = mv' },
      { f: 'Impulse', v: 'J = FΔt = Δp' },
      { f: 'Work', v: 'W = Fd cos θ' },
      { f: 'Power', v: 'P = W/t' }
    ],
    'Physics - Waves & E&M': [
      { f: 'Wave Speed', v: 'v = fλ' },
      { f: 'Ohm\'s Law', v: 'V = IR' },
      { f: 'Power (E&M)', v: 'P = IV = I²R = V²/R' },
      { f: 'Coulomb\'s Law', v: 'F = kq₁q₂/r²' },
      { f: 'Capacitance', v: 'C = Q/V' },
      { f: 'Energy (capacitor)', v: 'E = (1/2)CV²' }
    ],
    'Chemistry': [
      { f: 'Ideal Gas Law', v: 'PV = nRT' },
      { f: 'Density', v: 'ρ = m/V' },
      { f: 'Molarity', v: 'M = n/V' },
      { f: 'pH', v: 'pH = -log[H⁺]' },
      { f: 'Rate Law', v: 'Rate = k[A]ˣ[B]ʸ' }
    ],
    'Statistics': [
      { f: 'Mean', v: 'x̄ = Σx / n' },
      { f: 'Variance', v: 'σ² = Σ(x - x̄)² / n' },
      { f: 'Standard Deviation', v: 'σ = √σ²' },
      { f: 'Z-Score', v: 'z = (x - μ) / σ' },
      { f: 'Combination', v: 'C(n,r) = n! / r!(n-r)!' },
      { f: 'Permutation', v: 'P(n,r) = n! / (n-r)!' }
    ]
  };

  function render(contentEl) {
    const cats = Object.keys(formulas);
    let html = '<div class="card"><div class="card-title">📖 Formula Reference</div>';
    html += '<div class="tabs" id="formula-tabs">';
    cats.forEach((c, i) => {
      html += `<button class="tab ${i === 0 ? 'active' : ''}" onclick="Formula.showTab('${esc(c)}')">${esc(c)}</button>`;
    });
    html += '</div><div id="formula-content"></div></div>';
    contentEl.innerHTML = html;
    Formula.showTab(cats[0]);
  }

  window.Formula = {
    showTab(cat) {
      document.querySelectorAll('#formula-tabs .tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      const data = formulas[cat] || [];
      const rows = data.map(d => `<tr><td>${esc(d.f)}</td><td><code>${esc(d.v)}</code></td></tr>`).join('');
      document.getElementById('formula-content').innerHTML =
        `<table class="cheat-table"><tbody>${rows}</tbody></table>`;
    }
  };

  Router.registerRoute('#formula-ref', 'Formula Reference', render);
})();
