# Provas Nacionais Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Provas" tab to the mat7 hub that lets students practice with real past national exam questions (Prova de Equivalência à Frequência 9.º ano) in a serious, exam-focused interface with no gamification.

**Architecture:** A new `js/provas.js` file holds all question data as a static ES5 array. A new `js/provas-engine.js` renders the "Prática por Tema" mode (topic filter → question list → self-check). The hub gains a "Provas" tab wired by a small extension in `mat7.js`. All state (history) stored in localStorage under `edupt_provas`.

**Tech Stack:** ES5 vanilla JS, innerHTML templating, localStorage, Tailwind CSS utility classes, Phosphor Icons.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `js/provas.js` | **Create** | Static question bank — all questions verbatim from source PDFs |
| `js/provas-engine.js` | **Create** | Render the Provas tab: topic selector, question list, answer reveal, history |
| `js/mat7.js` | **Modify** | Add `mat7LoadProvas()` call in `mat7SwitchTab()`; add `'provas'` to tab titles map |
| `mat7/index.html` | **Modify** | Add "Provas" tab button and `mat7p-provas` panel; add `<script>` tags for both new files |
| `css/styles.css` | **Modify** | Add minimal `.provas-*` styles for the sober exam interface |

---

## Question Bank Format

Each question object:
```javascript
{
  id: 'pn-sem-2014-1',     // unique: pn-<topic>-<year>-<seq>
  tema: 'semelhanca',       // slug: semelhanca | otd | sequencias | funcoes | not_cientifica | areas
  temaLabel: 'Semelhança de Triângulos',  // display name
  ano: 2014,                // exam year
  enunciado: '...',         // verbatim text from PDF (PT)
  opcoes: ['A) ...', 'B) ...', 'C) ...', 'D) ...'],  // null for open-answer questions
  resposta: 'B',            // correct answer key or open answer hint
  cotacao: 10,              // points (from exam)
  figuraHTML: null          // optional: inline SVG string for geometric figures
}
```

Topics (slugs → labels):
- `semelhanca` → Semelhança de Triângulos (Cap. 7)
- `otd` → Organização e Tratamento de Dados (Cap. 8)
- `sequencias` → Sequências e Sucessões (Cap. 5)
- `funcoes` → Funções (Cap. 6)
- `not_cientifica` → Notação Científica (Cap. 2)
- `areas` → Áreas e Quadriláteros (Cap. 3)

---

## Task 1: Create `js/provas.js` — Question Bank

**Files:**
- Create: `js/provas.js`

This task transcribes all questions verbatim from the 6 PDF sources into the JS data structure. Questions with geometric figures get a `figuraHTML` SVG string. Questions without figures have `figuraHTML: null`.

- [ ] **Step 1: Create the file with header and PROVAS_BANCO array**

```javascript
/* ── Banco de questões — Provas de Equivalência à Frequência ───────
   Questões reais de exames nacionais portugueses, 7.º ano.
   Cada questão identificada com: id, tema, ano, enunciado, opcoes,
   resposta, cotacao, figuraHTML.
─────────────────────────────────────────────────────────────────── */

window.PROVAS_BANCO = [

  /* ══════════════════════════════════════════════════════════════
     SEMELHANÇA DE TRIÂNGULOS
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL SEMELHANCA QUESTIONS HERE, verbatim from semelhanca.pdf] ---

  /* ══════════════════════════════════════════════════════════════
     ORGANIZAÇÃO E TRATAMENTO DE DADOS
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL OTD QUESTIONS HERE, verbatim from otd.pdf] ---

  /* ══════════════════════════════════════════════════════════════
     SEQUÊNCIAS E SUCESSÕES
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL SEQUENCIAS QUESTIONS HERE, verbatim from sequencias.pdf] ---

  /* ══════════════════════════════════════════════════════════════
     FUNÇÕES
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL FUNCOES QUESTIONS HERE, verbatim from funcoes.pdf] ---

  /* ══════════════════════════════════════════════════════════════
     NOTAÇÃO CIENTÍFICA
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL NOT_CIENTIFICA QUESTIONS HERE, verbatim from not_cientifica.pdf] ---

  /* ══════════════════════════════════════════════════════════════
     ÁREAS E QUADRILÁTEROS
  ══════════════════════════════════════════════════════════════ */

  // --- [ADD ALL AREAS QUESTIONS HERE, verbatim from areas.pdf] ---

];
```

- [ ] **Step 2: Transcribe all Semelhança questions (47q) from `semelhanca.pdf`**

For each question, add an object following the format above. Verbatim enunciado in Portuguese. Example:

```javascript
{
  id: 'pn-sem-2014-1',
  tema: 'semelhanca',
  temaLabel: 'Semelhança de Triângulos',
  ano: 2014,
  enunciado: '[exact text from PDF]',
  opcoes: ['(A) ...', '(B) ...', '(C) ...', '(D) ...'],
  resposta: 'A',
  cotacao: 10,
  figuraHTML: null
},
```

For questions with geometric figures that cannot be represented in text alone, include an inline SVG in `figuraHTML`. Example:
```javascript
figuraHTML: '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="max-width:220px;display:block;margin:.5rem auto"><!-- triangle lines --></svg>'
```

- [ ] **Step 3: Transcribe OTD questions (74q) from `otd.pdf`**

Add all OTD questions. Many OTD questions reference tables — represent tables as HTML strings in `figuraHTML`:
```javascript
figuraHTML: '<table class="data-table" style="margin:.5rem auto">...</table>'
```

- [ ] **Step 4: Transcribe Sequências questions (42q) from `sequencias.pdf`**

- [ ] **Step 5: Transcribe Funções questions (15q) from `funcoes.pdf`**

Questions about graphs: include coordinate grid SVG in `figuraHTML`.

- [ ] **Step 6: Transcribe Notação Científica questions (29q) from `not_cientifica.pdf`**

- [ ] **Step 7: Transcribe Áreas questions (9q) from `areas.pdf`**

- [ ] **Step 8: Verify question count**

Open browser console and run:
```javascript
console.log('Total:', PROVAS_BANCO.length);
// Per topic:
var t={};PROVAS_BANCO.forEach(function(q){t[q.tema]=(t[q.tema]||0)+1;});console.log(t);
```
Expected: ~216 total. semelhanca:47, otd:74, sequencias:42, funcoes:15, not_cientifica:29, areas:9

---

## Task 2: Create `js/provas-engine.js` — Prática por Tema UI

**Files:**
- Create: `js/provas-engine.js`

This engine renders the entire "Provas" tab panel content. It provides:
1. Topic selector (chip buttons)
2. Question list (numbered, with cotação, source year)
3. Per-question "Ver resposta" reveal
4. Session history in localStorage

- [ ] **Step 1: Create the file with the topic metadata and init function**

```javascript
/* ── Provas Engine — Prática por Tema ─────────────────────────────
   Renders the "Provas" hub tab.
   Depends on: PROVAS_BANCO (provas.js, loaded first)
─────────────────────────────────────────────────────────────────── */

var PROVAS_TEMAS = [
  {slug:'semelhanca',    label:'Semelhança de Triângulos', cap:7, icon:'ph-shapes'},
  {slug:'otd',           label:'Organização e Trat. de Dados', cap:8, icon:'ph-chart-bar'},
  {slug:'sequencias',    label:'Sequências e Sucessões', cap:5, icon:'ph-list-numbers'},
  {slug:'funcoes',       label:'Funções', cap:6, icon:'ph-chart-line'},
  {slug:'not_cientifica',label:'Notação Científica', cap:2, icon:'ph-exam'},
  {slug:'areas',         label:'Áreas e Quadriláteros', cap:3, icon:'ph-triangle'}
];

var _provasState = {
  tema: null,       // currently selected topic slug
  revealed: {}      // { questionId: true } for revealed answers in current session
};

var PROVAS_STORAGE_KEY = 'edupt_provas';

function mat7LoadProvas() {
  var panel = document.getElementById('mat7p-provas');
  if (!panel) return;
  if (panel.dataset.loaded) return; // already rendered
  panel.dataset.loaded = '1';
  _provasRender(panel);
}
```

- [ ] **Step 2: Write `_provasRender(panel)` — builds the full panel HTML**

```javascript
function _provasRender(panel) {
  var html = '';

  // Header
  html += '<div class="provas-header">';
  html += '<div class="provas-header-title">Questões de Exames Nacionais</div>';
  html += '<div class="provas-header-sub">Prova de Equivalência à Frequência · 9.º Ano · Matemática 7.º Ano</div>';
  html += '</div>';

  // Topic selector
  html += '<div class="provas-temas-row" id="provas-temas-row">';
  PROVAS_TEMAS.forEach(function(t) {
    var count = _provasCount(t.slug);
    html += '<button class="provas-tema-btn" data-slug="' + t.slug + '" onclick="_provasSelectTema(\'' + t.slug + '\',this)">';
    html += '<span class="provas-tema-icon"><i class="ph ' + t.icon + '"></i></span>';
    html += '<span class="provas-tema-label">' + t.label + '</span>';
    html += '<span class="provas-tema-count">' + count + ' questões</span>';
    html += '</button>';
  });
  html += '</div>';

  // Question list area (empty until topic selected)
  html += '<div id="provas-questoes-area"></div>';

  panel.innerHTML = html;
}

function _provasCount(slug) {
  if (!window.PROVAS_BANCO) return 0;
  var n = 0;
  for (var i = 0; i < PROVAS_BANCO.length; i++) {
    if (PROVAS_BANCO[i].tema === slug) n++;
  }
  return n;
}
```

- [ ] **Step 3: Write `_provasSelectTema(slug, btn)` — filters and renders questions for chosen topic**

```javascript
function _provasSelectTema(slug, btn) {
  _provasState.tema = slug;
  _provasState.revealed = {};

  // Update button active state
  document.querySelectorAll('.provas-tema-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  var area = document.getElementById('provas-questoes-area');
  if (!area) return;

  var qs = [];
  if (window.PROVAS_BANCO) {
    for (var i = 0; i < PROVAS_BANCO.length; i++) {
      if (PROVAS_BANCO[i].tema === slug) qs.push(PROVAS_BANCO[i]);
    }
  }

  if (!qs.length) {
    area.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Sem questões disponíveis para este tema.</p>';
    return;
  }

  // Sort by year, then by id
  qs.sort(function(a, b) { return a.ano - b.ano || (a.id < b.id ? -1 : 1); });

  var html = '<div class="provas-questoes-list">';

  // Group by year
  var years = [];
  var byYear = {};
  qs.forEach(function(q) {
    if (!byYear[q.ano]) { byYear[q.ano] = []; years.push(q.ano); }
    byYear[q.ano].push(q);
  });
  years = years.filter(function(y, i, a) { return a.indexOf(y) === i; }).sort(function(a,b){return a-b;});

  var qNum = 0;
  years.forEach(function(year) {
    html += '<div class="provas-year-group">';
    html += '<div class="provas-year-label">Exame ' + year + '</div>';
    byYear[year].forEach(function(q) {
      qNum++;
      html += _provasQuestaoHTML(q, qNum);
    });
    html += '</div>';
  });

  html += '</div>';
  area.innerHTML = html;

  // Scroll to the list
  area.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

- [ ] **Step 4: Write `_provasQuestaoHTML(q, num)` — renders one question card**

```javascript
function _provasQuestaoHTML(q, num) {
  var html = '<div class="provas-questao" id="pq-' + q.id + '">';

  // Question header: number + cotação
  html += '<div class="provas-q-header">';
  html += '<span class="provas-q-num">Questão ' + num + '</span>';
  html += '<span class="provas-q-cotacao">' + q.cotacao + ' pt' + (q.cotacao !== 1 ? 's' : '') + '</span>';
  html += '</div>';

  // Enunciado
  html += '<div class="provas-q-enun">' + q.enunciado + '</div>';

  // Optional figure
  if (q.figuraHTML) {
    html += '<div class="provas-q-figura">' + q.figuraHTML + '</div>';
  }

  // Options (multiple choice)
  if (q.opcoes && q.opcoes.length) {
    html += '<div class="provas-q-opcoes">';
    q.opcoes.forEach(function(op) {
      html += '<div class="provas-q-opcao">' + op + '</div>';
    });
    html += '</div>';
  }

  // Answer reveal button
  html += '<div class="provas-q-resposta" id="pqr-' + q.id + '" style="display:none">';
  html += '<span class="provas-q-resp-label">Resposta correta:</span> ';
  html += '<strong class="provas-q-resp-val">' + q.resposta + '</strong>';
  html += '</div>';

  html += '<button class="provas-ver-btn" onclick="_provasReveal(\'' + q.id + '\',this)">Ver resposta</button>';

  html += '</div>';
  return html;
}
```

- [ ] **Step 5: Write `_provasReveal(id, btn)` — reveals answer for one question**

```javascript
function _provasReveal(id, btn) {
  var respDiv = document.getElementById('pqr-' + id);
  if (respDiv) respDiv.style.display = 'block';
  if (btn) {
    btn.style.display = 'none';
  }
  _provasState.revealed[id] = true;
  _provasSaveHistory(id);
}

function _provasSaveHistory(id) {
  try {
    var raw = localStorage.getItem(PROVAS_STORAGE_KEY);
    var data = raw ? JSON.parse(raw) : { vistas: [] };
    if (!data.vistas) data.vistas = [];
    var entry = { id: id, data: new Date().toISOString() };
    data.vistas.push(entry);
    // Keep last 500 entries
    if (data.vistas.length > 500) data.vistas = data.vistas.slice(-500);
    localStorage.setItem(PROVAS_STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
}
```

- [ ] **Step 6: Verify in browser — topic buttons show correct counts, questions render, answer reveal works**

Open `mat7/index.html`, click "Provas" tab, select a topic. Confirm:
- Topic chip highlights
- Questions numbered by year group
- "Ver resposta" reveals answer and hides the button

---

## Task 3: Add CSS styles for the sober exam interface

**Files:**
- Modify: `css/styles.css` (append at end)

- [ ] **Step 1: Append the following CSS block to `css/styles.css`**

```css
/* ══════════════════════════════════════════════════════════════
   PROVAS NACIONAIS — Exam practice panel
══════════════════════════════════════════════════════════════ */

/* Header */
.provas-header {
  padding: 1.25rem 0 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
.provas-header-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: .2rem;
}
.provas-header-sub {
  font-size: .78rem;
  color: var(--ink3);
  letter-spacing: .01em;
}

/* Topic selector */
.provas-temas-row {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
  margin-bottom: 2rem;
}
.provas-tema-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .15rem;
  padding: .6rem .85rem;
  border: 1.5px solid var(--border);
  border-radius: .6rem;
  background: var(--surface);
  cursor: pointer;
  transition: border-color .15s, background .15s;
  text-align: left;
  min-width: 140px;
}
.provas-tema-btn:hover { border-color: var(--sage-dark); background: var(--sage-pale, #f0f5f3); }
.provas-tema-btn.active { border-color: var(--sage-dark); background: var(--sage-pale, #f0f5f3); }
.provas-tema-icon { font-size: 1.1rem; color: var(--sage-dark); }
.provas-tema-label { font-size: .82rem; font-weight: 600; color: var(--ink2); }
.provas-tema-count { font-size: .72rem; color: var(--ink4); }

/* Year group */
.provas-year-group { margin-bottom: 2.5rem; }
.provas-year-label {
  font-family: 'Montserrat', sans-serif;
  font-size: .72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--ink4);
  padding: .35rem 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
}

/* Question card */
.provas-questao {
  border: 1px solid var(--border);
  border-radius: .7rem;
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
  background: var(--surface);
}
.provas-q-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .6rem;
}
.provas-q-num {
  font-size: .75rem;
  font-weight: 700;
  color: var(--ink3);
  text-transform: uppercase;
  letter-spacing: .04em;
}
.provas-q-cotacao {
  font-size: .72rem;
  color: var(--ink4);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: .15rem .55rem;
}
.provas-q-enun {
  font-size: .92rem;
  line-height: 1.55;
  color: var(--ink);
  margin-bottom: .75rem;
}
.provas-q-figura {
  margin: .5rem 0 .75rem;
  text-align: center;
}
.provas-q-opcoes {
  display: flex;
  flex-direction: column;
  gap: .3rem;
  margin-bottom: .75rem;
}
.provas-q-opcao {
  font-size: .88rem;
  color: var(--ink2);
  padding: .3rem .5rem;
  border-radius: .35rem;
  background: var(--bg);
}

/* Reveal */
.provas-q-resposta {
  background: #f0faf4;
  border: 1.5px solid #98c379;
  border-radius: .5rem;
  padding: .5rem .75rem;
  font-size: .88rem;
  color: var(--ink2);
  margin-bottom: .5rem;
}
.provas-q-resp-label { color: var(--ink3); }
.provas-q-resp-val { color: #2d7a3a; font-size: 1rem; }

.provas-ver-btn {
  font-size: .78rem;
  font-weight: 600;
  color: var(--sage-dark);
  background: transparent;
  border: 1px solid var(--sage-dark);
  border-radius: .4rem;
  padding: .3rem .75rem;
  cursor: pointer;
  transition: background .15s, color .15s;
}
.provas-ver-btn:hover { background: var(--sage-dark); color: #fff; }
```

- [ ] **Step 2: Verify styles look correct in browser (no broken layout)**

---

## Task 4: Add "Provas" tab to `mat7/index.html`

**Files:**
- Modify: `mat7/index.html`

- [ ] **Step 1: Add the tab button to the tab bar**

In the `<div class="mat7-hub-tabbar">` section (after the "Progresso" tab button), add:

```html
  <button class="mat7-hub-tab" data-tab="provas" onclick="mat7SwitchTab('provas',this)"><span class="mat7-hub-tab-icon"><i class="ph ph-exam"></i></span> Provas</button>
```

- [ ] **Step 2: Add the panel HTML**

After the `mat7p-progresso` panel div (before `</main>`), add:

```html
<!-- ══════════════════════════════════════════
     PANEL: PROVAS NACIONAIS
══════════════════════════════════════════ -->
<div class="mat7-panel hidden" id="mat7p-provas">
  <!-- Rendered by mat7LoadProvas() in provas-engine.js -->
</div>
```

- [ ] **Step 3: Add script tags (before `</body>`, before nav.js)**

Add both new scripts immediately before the existing `nav.js` script tag (provas.js must come before provas-engine.js so `PROVAS_BANCO` exists when the engine loads):

```html
<script src="../js/provas.js"></script>
<script src="../js/provas-engine.js"></script>
<script src="../js/nav.js"></script>  <!-- nav.js stays last -->
```

- [ ] **Step 4: Verify tab button appears and panel switches correctly**

---

## Task 5: Wire `mat7SwitchTab()` in `mat7.js`

**Files:**
- Modify: `js/mat7.js`

- [ ] **Step 1: Add 'provas' to the `_tabTitles` map in `mat7SwitchTab()`**

Find this line in `mat7SwitchTab()` (around line 612):
```javascript
var _tabTitles = { resumo:'Resumo', exercicios:'Exercícios', testes:'Testes',
    flashcards:'Flashcards', jogos:'Jogos', exame:'Exame', progresso:'Progresso', quiz:'Modo Quiz' };
```

Add `provas:'Provas Nacionais'` to the map:
```javascript
var _tabTitles = { resumo:'Resumo', exercicios:'Exercícios', testes:'Testes',
    flashcards:'Flashcards', jogos:'Jogos', exame:'Exame', progresso:'Progresso', quiz:'Modo Quiz', provas:'Provas Nacionais' };
```

- [ ] **Step 2: Add the `'provas'` branch in `mat7SwitchTab()`**

After the `else if (tab === 'progresso')` branch (around line 618), add:
```javascript
else if (tab === 'provas') { if (typeof mat7LoadProvas === 'function') mat7LoadProvas(); }
```

- [ ] **Step 3: Verify tab switching — clicking "Provas" calls `mat7LoadProvas()` and shows content**

---

## Task 6: End-to-end verification

- [ ] **Step 1: Open `mat7/index.html` in browser (via local dev server)**

```bash
cd "/Users/joanacarvalho/Desktop/vs code_/Plataforma-educativa"
python3 -m http.server 8080
# Open: http://localhost:8080/mat7/index.html
```

- [ ] **Step 2: Click "Provas" tab — confirm panel opens, topic buttons visible**

- [ ] **Step 3: Click each topic — confirm questions load, year groups appear**

- [ ] **Step 4: Click "Ver resposta" on several questions — confirm answer reveals, button hides**

- [ ] **Step 5: Check localStorage in DevTools**

Open DevTools → Application → Local Storage. Confirm `edupt_provas` key appears after revealing answers.

- [ ] **Step 6: Reload page, click Provas again — confirm panel renders fresh (no JS errors in console)**

- [ ] **Step 7: Commit**

```bash
git add js/provas.js js/provas-engine.js mat7/index.html js/mat7.js css/styles.css
git commit -m "feat: add Provas Nacionais tab with real exam questions by topic"
```

---

## Notes

- **Questions must be verbatim** — copy text exactly as written in the PDFs, including punctuation and formatting. Do not paraphrase.
- **Figures**: For questions with geometric figures (triangles, graphs, tables), use inline SVG or HTML table in `figuraHTML`. If a figure is too complex to reproduce faithfully, add a note in `figuraHTML`: `'<p class="provas-q-nota">[Figura: ver enunciado original]</p>'`
- **ES5 only**: No `let`/`const`, no arrow functions, no template literals in `provas.js` or `provas-engine.js`.
- **No gamification**: No stars, no level bars, no confetti — sober exam interface only.
- **Future expansion**: When user provides PDFs for remaining topics (Números Inteiros, Números Racionais, Equações, Geometria), simply add entries to `PROVAS_BANCO` with the appropriate `tema` slug and add entries to `PROVAS_TEMAS` in `provas-engine.js`.
