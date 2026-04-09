# Codebase Deduplication Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate ~1,500-2,000 LOC of duplicated code across JS, HTML, and CSS without changing any user-facing behavior.

**Architecture:** Extract repeated patterns into shared helpers/templates. No frameworks, no build tools, ES5 only. Each task produces a working site — no intermediate broken states.

**Tech Stack:** Vanilla JS (ES5), HTML, CSS. No npm, no bundlers.

**Verification:** After each task, open the affected page(s) in a browser and confirm all tabs/features still work. Since there are no automated tests, visual verification is the only safety net.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `js/systems-games.js` | Modify | Extract level-button HTML into shared helper |
| `js/gf.js` | Modify | Merge `_dinamico1-4` into one data-driven function; merge `etRenderPanel`/`etRenderMegaPanel` |
| `js/chapter-engine.js` | Modify | Add generic `abrirSubtema` function |
| `js/cap1.js` | Modify | Replace local `abrirSubtema()` with call to generic version |
| `js/cap2.js` | Modify | Replace local `abrirSubtema2()` with call to generic version |
| `js/widgets.js` | Modify | Add Pomodoro + Calculator HTML injection functions |
| `mat7.html` | Modify | Remove duplicated Pomodoro/Calculator HTML, add JS injection call |
| `mega.html` | Modify | Remove duplicated Pomodoro/Calculator HTML, add JS injection call |
| `css/styles.css` | Modify | Remove utility classes that duplicate Tailwind |

---

## Task 1: Extract level-button helper in `systems-games.js`

**Files:**
- Modify: `js/systems-games.js` (lines 61-65, 255, 444-447, 624)

The level-button HTML block is copy-pasted 4 times (Game4Linha, GameMine, GameSudoku, GameHanoi). Extract to a shared function.

- [ ] **Step 1: Add `_gameLevelBar` helper at the top of `systems-games.js`**

Add this function before the `Game4Linha` constructor:

```javascript
function _gameLevelBar(fnKey, prefix, currentLevel, labels) {
  var lvs = ['facil','medio','dificil'];
  var cols = ['#4caf50','#f59e0b','#ef4444'];
  var html = '<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group">';
  for (var i = 0; i < 3; i++) {
    html += '<button class="gen-level-btn'+(currentLevel===lvs[i]?' active':'')+'" onclick="'+fnKey+'_'+prefix+'Level(\''+lvs[i]+'\',this)">'
      + '<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:'+cols[i]+';vertical-align:middle;flex-shrink:0;margin-right:1px"></span>'
      + (labels && labels[i] ? ' '+labels[i] : '')
      + '</button>';
  }
  html += '</div></div>';
  return html;
}
```

- [ ] **Step 2: Replace inline level-bar HTML in `Game4Linha.render()`**

In the `render()` function of `Game4Linha` (~line 61-65), replace the hardcoded level-bar HTML with:

```javascript
html.push(_gameLevelBar(fnKey, 'c4', self.level));
```

- [ ] **Step 3: Replace inline level-bar HTML in `GameMine.render()`**

In `GameMine.render()` (~line 255), replace the hardcoded level-bar with:

```javascript
html.push(_gameLevelBar(fnKey, 'mine', self.level));
```

- [ ] **Step 4: Replace inline level-bar HTML in `GameSudoku.render()`**

In `GameSudoku.render()` (~lines 444-447), replace the 3 `sdk-dif-btn` buttons with:

```javascript
var sdkLvHtml = _gameLevelBar(fnKey, 'sdk', self.level, ['Fácil','Médio','Difícil']);
html.push('<div class="sdk-difficulty">' + sdkLvHtml.replace(/level-bar/,'sdk-difficulty-inner').replace(/gen-level-btn/g,'sdk-dif-btn') + '</div>');
```

**Note:** Sudoku uses different CSS classes (`sdk-dif-btn` vs `gen-level-btn`) and includes text labels. Keep the existing `sdk-difficulty` CSS class and just swap the inner HTML. If the CSS class swap is too fragile, keep Sudoku's original HTML and only extract the other 3 games (still saves ~100 LOC).

- [ ] **Step 5: Replace inline level-bar HTML in `GameHanoi.render()`**

In `GameHanoi.render()` (~line 624), replace the hardcoded level-bar with:

```javascript
html.push(_gameLevelBar(fnKey, 'hanoi', self.level, ['3','4','5']));
```

- [ ] **Step 6: Verify visually**

Open `mat7.html` in browser → Jogos tab → verify all 4 games render level buttons correctly and switching levels works. Test each game individually.

- [ ] **Step 7: Commit**

```bash
git add js/systems-games.js
git commit -m "refactor: extract _gameLevelBar helper, remove 4x duplicated level-button HTML"
```

---

## Task 2: Merge `etRenderPanel` and `etRenderMegaPanel` in `gf.js`

**Files:**
- Modify: `js/gf.js` (lines 1424-1544)

These two functions are 95% identical. The only differences: (1) mega version merges errors from multiple caps, (2) mega has different clear/filter onclick handlers, (3) mega shows cap label, (4) mega shows 20 items vs 15. Merge into one function with an optional `capIds` array parameter.

- [ ] **Step 1: Create unified `_etRenderPanel` function**

Replace both functions with:

```javascript
function _etRenderPanel(containerId, capIdOrIds) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var _filter = container._etFilter || 'all';
  var isMega = Array.isArray(capIdOrIds);
  var capIds = isMega ? capIdOrIds : [capIdOrIds];

  if (isMega && capIds.length === 0) {
    container.innerHTML = '<div class="et-empty">Seleciona cap\u00edtulos e responde a quest\u00f5es para ver os erros aqui.</div>';
    return;
  }

  var all = [];
  capIds.forEach(function(capId) {
    ErrorTracker.getErrors(capId, 1).forEach(function(r) { all.push(r); });
  });
  if (isMega) {
    ErrorTracker.getErrors('mega', 1).forEach(function(r) { all.push(r); });
    all.sort(function(a,b){ return b.erros - a.erros || a.acertos - b.acertos; });
  }

  var hot  = all.filter(function(r){ return r.erros >= 3; });
  var warn = all.filter(function(r){ return r.erros >= 1 && r.erros < 3; });
  var shown = _filter === 'hot' ? hot : _filter === 'revisao' ? warn : all;

  var capLabel = isMega ? capIds.map(function(c){ return ErrorTracker.CAP_LABELS[c] || c; }).join(' + ') : '';
  var titleExtra = isMega ? ' \u2014 ' + capLabel : '';
  var maxItems = isMega ? 20 : 15;

  // Build clear onclick
  var clearClick = isMega
    ? "(window._etMegaCapIds||[]).forEach(function(c){ErrorTracker.clearCap(c);});ErrorTracker.clearCap('mega');_etRenderPanel('" + containerId + "',window._etMegaCapIds||[])"
    : "ErrorTracker.clearCap('" + capIds[0] + "');_etRenderPanel('" + containerId + "','" + capIds[0] + "')";

  // Build filter onclicks
  function filterClick(f) {
    if (isMega) return "document.getElementById('" + containerId + "')._etFilter='" + f + "';_etRenderPanel('" + containerId + "',window._etMegaCapIds||[])";
    return "document.getElementById('" + containerId + "')._etFilter='" + f + "';_etRenderPanel('" + containerId + "','" + capIds[0] + "')";
  }

  container.innerHTML =
    '<div class="et-header">' +
      '<div class="et-title">' +
        '<i class="ph ph-info" style="flex-shrink:0"></i>' +
        '\u00a0Onde erro mais' + titleExtra +
        (hot.length > 0 ? ' <span class="et-badge">' + hot.length + ' cr\u00edticas</span>' : '') +
      '</div>' +
      '<button class="et-clear-btn" onclick="' + clearClick + '">Limpar</button>' +
    '</div>' +
    '<div class="et-filters" style="margin-bottom:1rem">' +
      '<button class="et-filter' + (_filter==='all'?' active':'') + '" onclick="' + filterClick('all') + '">Todas (' + all.length + ')</button>' +
      '<button class="et-filter' + (_filter==='hot'?' active':'') + '" onclick="' + filterClick('hot') + '">Cr\u00edticas 3+ (' + hot.length + ')</button>' +
      '<button class="et-filter' + (_filter==='revisao'?' active-warn':'') + '" onclick="' + filterClick('revisao') + '">A rever 1-2 (' + warn.length + ')</button>' +
    '</div>' +
    (shown.length === 0
      ? '<div class="et-empty">' + (all.length === 0 ? 'Ainda sem erros registados \u2014 responde a quest\u00f5es para veres aqui as tuas dificuldades.' : 'Sem quest\u00f5es nesta categoria.') + '</div>'
      : shown.slice(0, maxItems).map(function(r, i) {
          var tot = r.erros + r.acertos;
          var pct = tot > 0 ? Math.round(r.erros / tot * 100) : 0;
          var cls = r.erros >= 3 ? 'hot' : 'warn';
          var barCol = r.erros >= 3 ? 'var(--wrong)' : '#f59e0b';
          return '<div class="et-item ' + cls + '">' +
            '<div class="et-rank">' + (i+1) + '</div>' +
            '<div class="et-body">' +
              '<div class="et-q">' + r.texto + (r.texto.length >= 140 ? '\u2026' : '') + '</div>' +
              '<div class="et-meta">' +
                '<span class="et-cap-tag">' + (ErrorTracker.CAP_LABELS[r.capId] || r.capId) + '</span>' +
                '<span class="et-section-tag">' + (ErrorTracker.SEC_LABELS[r.secKey] || r.secKey) + '</span>' +
                (r.ultima ? '<span class="et-section-tag">\u00b7 ' + r.ultima + '</span>' : '') +
              '</div>' +
              '<div class="et-bar-wrap"><div class="et-bar" style="width:' + pct + '%;background:' + barCol + '"></div></div>' +
            '</div>' +
            '<div class="et-stats">' +
              '<div class="et-ratio">' + r.erros + '\u00d7</div>' +
              '<div class="et-ratio-label">erros</div>' +
              (r.acertos > 0 ? '<div style="font-size:.63rem;color:var(--c1-mid);margin-top:2px">' + r.acertos + '\u2713</div>' : '') +
            '</div>' +
          '</div>';
        }).join('')
    );
  if (isMega) window._etMegaCapIds = capIds;
}
```

- [ ] **Step 2: Add backward-compatible aliases**

After the new function, add:

```javascript
function etRenderPanel(containerId, capId) { _etRenderPanel(containerId, capId); }
function etRenderMegaPanel(containerId, capIds) { _etRenderPanel(containerId, capIds); }
```

- [ ] **Step 3: Verify visually**

Open `mat7.html` → Progresso tab → verify error tracking panel renders. Open `mega.html` → verify mega error panel renders with multi-cap filter.

- [ ] **Step 4: Commit**

```bash
git add js/gf.js
git commit -m "refactor: merge etRenderPanel and etRenderMegaPanel into unified _etRenderPanel"
```

---

## Task 3: Consolidate `_dinamico1-4` in `gf.js`

**Files:**
- Modify: `js/gf.js` (lines 529-978)

Each `_dinamicoN(dif)` function generates worksheet HTML for one chapter. They share the same structure: define `row()` helper, switch on `dif` (facil/medio/dificil), build `ex` and `sol` strings, return `{ex, sol}`. The actual math content per chapter is unique, so we **cannot** fully template them — but we can extract the shared boilerplate.

- [ ] **Step 1: Extract shared `_dinamicoRow` and `_dinamicoLinha` helpers**

Add before `_dinamico1`:

```javascript
function _dinamicoLinha() { return '<div class="linha"></div>'; }
function _dinamicoRow(n, q, espacos) {
  return '<div class="ex"><div class="ex-num">' + n + '.</div><p>' + q + '</p>' + (espacos !== false ? _dinamicoLinha() : '') + '</div>';
}
```

- [ ] **Step 2: Replace local `row()` and `linha()` in each `_dinamicoN` function**

In `_dinamico1`: remove lines 533-534 (local `row`/`linha` definitions), replace all `row(` calls with `_dinamicoRow(` and `linha()` with `_dinamicoLinha()`.

In `_dinamico2`: remove lines 675-676, same replacements.

In `_dinamico3`: remove lines 797-798, same replacements.

In `_dinamico4`: remove lines 898-899, same replacements.

- [ ] **Step 3: Create dispatch function**

Add after the four functions:

```javascript
function _dinamico(cap, dif) {
  var fns = { 1: _dinamico1, 2: _dinamico2, 3: _dinamico3, 4: _dinamico4 };
  return fns[cap] ? fns[cap](dif) : { ex: '', sol: '' };
}
```

- [ ] **Step 4: Find and replace callers**

Search for `_dinamico1(`, `_dinamico2(`, `_dinamico3(`, `_dinamico4(` calls outside gf.js. If any external callers exist, update them to use `_dinamico(1, dif)` etc. Keep the individual functions as-is for now (the dispatch function is the new public API).

- [ ] **Step 5: Verify visually**

Open `mat7.html` → Fichas tab → generate a worksheet for each chapter at each difficulty → verify PDF preview renders correctly.

- [ ] **Step 6: Commit**

```bash
git add js/gf.js
git commit -m "refactor: extract shared _dinamicoRow helper, add _dinamico dispatch function"
```

---

## Task 4: Inject Pomodoro + Calculator widgets via JS

**Files:**
- Modify: `js/widgets.js`
- Modify: `mat7.html` (lines 346-441)
- Modify: `mega.html` (lines 342-449)

The Pomodoro widget (~40 LOC) and Calculator widget (~50 LOC) are 100% identical in mat7.html and mega.html. Move the HTML to JS injection functions in `widgets.js`.

- [ ] **Step 1: Add `_injectPomodoro()` to `widgets.js`**

```javascript
function _injectPomodoro() {
  var fab = document.createElement('button');
  fab.id = 'pomodoro-fab';
  fab.onclick = pomodoroTogglePanel;
  fab.title = 'Temporizador Pomodoro';
  fab.setAttribute('aria-label', 'Abrir temporizador Pomodoro');
  fab.textContent = '\uD83C\uDF45';
  document.body.appendChild(fab);

  var w = document.createElement('div');
  w.id = 'pomodoro-widget';
  w.className = 'hidden';
  w.setAttribute('role', 'dialog');
  w.setAttribute('aria-label', 'Temporizador Pomodoro');
  w.innerHTML =
    '<div id="pomodoro-panel">' +
      '<div class="pom-header">' +
        '<span class="pom-title">\uD83C\uDF45 Pomodoro</span>' +
        '<button class="pom-close" onclick="pomodoroTogglePanel()" aria-label="Fechar">\u2715</button>' +
      '</div>' +
      '<div class="pom-mode-row">' +
        '<button class="pom-mode-btn active" id="pom-btn-focus" onclick="pomodoroSetMode(\'focus\')">Foco</button>' +
        '<button class="pom-mode-btn" id="pom-btn-short" onclick="pomodoroSetMode(\'short\')">Pausa</button>' +
        '<button class="pom-mode-btn" id="pom-btn-long" onclick="pomodoroSetMode(\'long\')">Longa</button>' +
      '</div>' +
      '<div class="pom-clock">' +
        '<svg class="pom-svg" width="100" height="100" viewBox="0 0 100 100">' +
          '<circle class="pom-ring-bg" cx="50" cy="50" r="44"/>' +
          '<circle class="pom-ring-fill" id="pom-ring" cx="50" cy="50" r="44" stroke-dasharray="276.46" stroke-dashoffset="0"/>' +
        '</svg>' +
        '<div class="pom-time-text" id="pom-time">25:00</div>' +
      '</div>' +
      '<div class="pom-session-label" id="pom-session-label">Sess\u00e3o 1 de 4</div>' +
      '<div class="pom-controls">' +
        '<button class="pom-ctrl-btn primary" id="pom-start-btn" onclick="pomodoroStartStop()">\u25B6 Iniciar</button>' +
        '<button class="pom-ctrl-btn secondary" onclick="pomodoroReset()" aria-label="Reiniciar temporizador">\u21BA</button>' +
      '</div>' +
      '<div class="pom-sessions" id="pom-dots">' +
        '<div class="pom-dot" id="pom-d0"></div><div class="pom-dot" id="pom-d1"></div>' +
        '<div class="pom-dot" id="pom-d2"></div><div class="pom-dot" id="pom-d3"></div>' +
      '</div>' +
      '<div class="tip-box">' +
        '<strong class="chip-label">\uD83D\uDCA1 O que \u00e9 a t\u00e9cnica Pomodoro?</strong>' +
        'Estuda <strong>25 min</strong> com foco total, depois faz uma <strong>pausa de 5 min</strong>. Ap\u00f3s 4 sess\u00f5es, faz uma pausa longa de 15 min. Este ciclo ajuda o c\u00e9rebro a <strong>concentrar-se melhor</strong>, reduzir a fadiga e memorizar mais eficazmente.' +
      '</div>' +
    '</div>';
  document.body.appendChild(w);
}
```

- [ ] **Step 2: Add `_injectCalc()` to `widgets.js`**

```javascript
function _injectCalc() {
  var fab = document.createElement('button');
  fab.id = 'calc-fab';
  fab.onclick = calcToggle;
  fab.title = 'Calculadora cient\u00edfica';
  fab.setAttribute('aria-label', 'Calculadora');
  fab.textContent = '\uD835\uDC65\u00B2';
  document.body.appendChild(fab);

  var w = document.createElement('div');
  w.id = 'calc-widget';
  var btns = [
    ['fn','calcFn(\'sqrt\')','√'],['fn','calcFn(\'sq\')','x²'],['fn','calcFn(\'inv\')','1/x'],['clr','calcClear()','AC'],
    ['fn','calcFn(\'sin\')','sen'],['fn','calcFn(\'cos\')','cos'],['fn','calcFn(\'tan\')','tan'],['fn','calcFn(\'pi\')','π'],
    ['fn','calcFn(\'log\')','log'],['fn','calcFn(\'ln\')','ln'],['fn','calcOp(\'**\')','xʸ'],['fn','calcFn(\'abs\')','|x|'],
    ['fn','calcFn(\'pct\')','%'],['fn','calcFn(\'pm\')','±'],['fn','calcNum(\'(\')','( '],['fn','calcNum(\')\')','  )'],
    ['fn','calcDel()','⌫'],['op','calcOp(\'/\')','÷'],['op','calcOp(\'*\')','×'],['op','calcOp(\'-\')','−'],
    ['','calcNum(\'7\')','7'],['','calcNum(\'8\')','8'],['','calcNum(\'9\')','9'],['op','calcOp(\'+\')','+'],
    ['','calcNum(\'4\')','4'],['','calcNum(\'5\')','5'],['','calcNum(\'6\')','6'],['eq','calcEq()','='],
    ['','calcNum(\'1\')','1'],['','calcNum(\'2\')','2'],['','calcNum(\'3\')','3'],
    ['','calcNum(\'0\')','0'],['','calcNum(\'.\')','.',]
  ];
  var gridHtml = '';
  for (var i = 0; i < btns.length; i++) {
    var b = btns[i];
    gridHtml += '<button class="calc-btn' + (b[0] ? ' ' + b[0] : '') + '" onclick="' + b[1] + '">' + b[2] + '</button>';
  }
  w.innerHTML =
    '<div id="calc-display"><div id="calc-fab-expr"></div><div id="calc-result">0</div></div>' +
    '<div class="calc-grid">' + gridHtml + '</div>' +
    '<div class="stat-footer">sen/cos/tan em graus \u00a0\u00b7\u00a0 x\u02b8 = pot\u00eancia</div>';
  document.body.appendChild(w);
}
```

- [ ] **Step 3: Add auto-inject on DOMContentLoaded to `widgets.js`**

```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('inject-pomodoro')) _injectPomodoro();
  if (document.getElementById('inject-calc')) _injectCalc();
});
```

- [ ] **Step 4: Update `mat7.html`**

Remove the Pomodoro HTML block (lines 346-387) and Calculator HTML block (lines 398-441). Replace with marker divs:

```html
<div id="inject-pomodoro"></div>
<div id="inject-calc"></div>
```

- [ ] **Step 5: Update `mega.html`**

Same as Step 4 — remove Pomodoro block (lines 354-395) and Calculator block (lines 406-449), replace with markers.

- [ ] **Step 6: Verify visually**

Open `mat7.html` → click Pomodoro FAB → verify timer works. Click Calculator FAB → verify calculator works. Repeat for `mega.html`.

- [ ] **Step 7: Commit**

```bash
git add js/widgets.js mat7.html mega.html
git commit -m "refactor: inject Pomodoro and Calculator widgets via JS, remove 168 LOC HTML duplication"
```

---

## Task 5: Consolidate `abrirSubtema` functions

**Files:**
- Modify: `js/chapter-engine.js`
- Modify: `js/cap1.js` (lines 353-437)
- Modify: `js/cap2.js` (lines 414-487)

Cap1 has `abrirSubtema(tema, sub)` and Cap2 has `abrirSubtema2(tema, sub)`. Both follow the same pattern: reset state, build title from lookup table, define a generator function with tema/sub-specific exercise creation, call `criarModalSubtema()`.

The exercise generators themselves are chapter-specific (different math content), so we extract only the shared boilerplate — not the generators.

- [ ] **Step 1: Add `_abrirSubtemaGeneric` to `chapter-engine.js`**

```javascript
function _abrirSubtemaGeneric(titulos, geradorFn) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  return function(tema, sub) {
    var titulo = titulos[tema + ':' + sub] || 'Pr\u00e1tica';
    var exs = geradorFn(tema, sub);
    window._stContext = { titulo: titulo, gerador: function(){ return geradorFn(tema, sub); } };
    criarModalSubtema(titulo, exs);
  };
}
```

**Note:** This is a lighter extraction — it only removes the shared init/title/dispatch boilerplate. The actual generator logic stays in each capN.js because it's chapter-specific math content.

- [ ] **Step 2: Refactor `abrirSubtema` in `cap1.js`**

Keep the `titulos` object and the `gerador()` function content in cap1.js. Wrap them using the generic helper:

```javascript
var _cap1SubtemaTitulos = {
  '1:inteiros': 'Conjunto dos N\u00fameros Inteiros',
  // ... (keep existing title map)
};

function _cap1SubtemaGerador(tema, sub) {
  var dif = dynState.q.level || 'medio';
  var lv = lim(dif); var min = lv.min, max = lv.max;
  var N = 6;
  var exs = [];
  for (var i = 0; i < N; i++) {
    var ex = null;
    // ... (keep existing exercise generation logic exactly as-is)
    if (ex) exs.push(ex);
  }
  return exs;
}

function abrirSubtema(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  var titulo = _cap1SubtemaTitulos[tema + ':' + sub] || 'Pr\u00e1tica';
  window._stContext = { titulo: titulo, gerador: function(){ return _cap1SubtemaGerador(tema, sub); } };
  criarModalSubtema(titulo, _cap1SubtemaGerador(tema, sub));
}
```

This is a minor refactor — the main win is separating the titles data from the generator function, making both reusable and easier to maintain.

- [ ] **Step 3: Same refactor for `abrirSubtema2` in `cap2.js`**

Same pattern: extract `_cap2SubtemaTitulos` and `_cap2SubtemaGerador`, simplify `abrirSubtema2`.

- [ ] **Step 4: Verify visually**

Open `cap1.html` → Temas tab → click any subtema link → verify modal opens with exercises. Repeat for `cap2.html`.

- [ ] **Step 5: Commit**

```bash
git add js/chapter-engine.js js/cap1.js js/cap2.js
git commit -m "refactor: extract subtema title data from generator logic in cap1/cap2"
```

---

## Task 6: Remove CSS utility classes that duplicate Tailwind

**Files:**
- Modify: `css/styles.css`

The project loads Tailwind via CDN but also defines manual utility classes. Remove the ones that are pure Tailwind duplicates.

- [ ] **Step 1: Identify Tailwind-duplicate utilities**

Search `styles.css` for classes like `.flex-filter-bar`, `.flex-tabs`, `.flex-col-content`, `.flex-col-list`, `.flex-center-actions` and check if they are used in HTML files and if Tailwind equivalents are being used instead.

**Important:** Only remove classes that have zero or few usages in HTML, OR that can be replaced with Tailwind utility classes already in use. Do NOT remove classes that are referenced by JS-generated HTML.

- [ ] **Step 2: Grep for usage of each candidate class**

For each class found, run `grep -r "class-name" *.html js/*.js` to confirm usage. Only remove if unused or if the HTML can be updated to use Tailwind utilities.

- [ ] **Step 3: Remove confirmed unused/duplicate CSS rules**

- [ ] **Step 4: Verify visually**

Open each page and check layout hasn't broken.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "refactor: remove CSS utility classes that duplicate Tailwind"
```

---

## Summary of Expected LOC Savings

| Task | LOC Saved | Risk |
|------|-----------|------|
| Task 1: Level-button helper | ~120 | Low |
| Task 2: etRender merge | ~65 | Low |
| Task 3: _dinamico shared helpers | ~30 | Low |
| Task 4: Pomodoro/Calc injection | ~168 | Low |
| Task 5: abrirSubtema refactor | ~40 | Medium |
| Task 6: CSS cleanup | ~50-72 | Low |
| **Total** | **~470-495** | |

**Note:** The original audit estimated ~2,000 LOC savings, but that included more aggressive refactors (HTML section templating, full _dinamico data-driven rewrite) that carry higher risk and lower ROI in a no-test codebase. This plan focuses on safe, high-confidence wins. Phase 3 (HTML templating) would be a separate follow-up plan.
