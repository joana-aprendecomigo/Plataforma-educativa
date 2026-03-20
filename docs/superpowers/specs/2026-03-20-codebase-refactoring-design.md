# 3ponto14 Codebase Refactoring — Design Spec

**Date:** 2026-03-20
**Approach:** B — Data-Driven Chapters
**Goal:** Reduce 21,390 LOC to ~10,700 (50%+), fix broken navigation, improve maintainability

## Context

3ponto14 is a vanilla HTML/CSS/JS math learning platform for Portuguese 7th graders. After a monolith split, navigation between pages is broken (blank page on "Escolher capítulo"). The codebase has massive duplication across 4 chapter files, 139 unused CSS classes, 407 inline styles, and games loaded on every page regardless of use.

## Constraints

- No frameworks (vanilla JS only)
- No build tools (static files served directly)
- No backend (localStorage only)
- ES modules deferred to future phase
- All UI text in Portuguese (PT)
- Tailwind CSS via CDN already imported
- Phosphor Icons via CDN already imported

---

## Section 1: Fix Multi-Page Navigation

**Problem:** `showMat7View()` tries to show `#view-mat7` which doesn't exist in `index.html`. All cross-page `showXView()` functions assume single-page architecture.

**Solution:**
- `portal.js`: Replace `showMat7View()` → `window.location.href = 'mat7.html'`
- `portal.js`: Replace `showMathView()` → `window.location.href = 'cap1.html'` (same for 2/3/4)
- `portal.js`: Remove `_hideAllViews()` (not needed cross-page)
- `handleSubj(e, action)` becomes a URL router mapping action strings to page URLs
- Each page gets a back-to-portal link (`index.html`)
- Within-page view toggling (tabs, sections) remains as-is

**Impact:** ~50 LOC removed. Fixes the critical blank-page bug.

---

## Section 2: Dead Code Removal

### CSS (~500 LOC)
Remove 139 unused classes from `styles.css`:
- qg-* (33 classes) — abandoned quiz game UI
- mat7-cap-* (17 classes) — abandoned chapter selector
- j24-* (7), fc-* (7), er2-* (4), hanoi-* (4), timeline-* (4), dl-* (4)
- ico-* (4), gf-* (2)
- 46 miscellaneous orphaned classes

### JS (~60 LOC)
- Remove `_htmlToPdfFallback()` from shared.js (never called)
- Remove 3 no-op stubs from systems.js (`j24Build`, `j24AddParen`, `j24Verify`)
- Remove 137 lines of commented-out code in cap2.js and cap4.js
- Consolidate duplicate utilities into shared.js: `rnd()`, `rndNZ()`, `shuffle()`, `fmt()`, `gcd()`

### HTML (~400 LOC)
- Replace 407 inline `style=` attributes with Tailwind utility classes

**Impact:** ~1,100 LOC removed.

---

## Section 3: Generic Chapter Engine

**Problem:** cap1.js (1,119), cap2.js (1,617), cap3.js (1,205), cap4.js (854) = 4,795 LOC with 90% identical structure.

### New files

**`chapter-engine.js` (~400 LOC):**
Generic engine parameterized by chapter number. Reads config from `window.CAP_DATA[n]`.

Functions:
- `capShowSection(n, sectionId, btn)` — tab navigation with lazy-load
- `capCreateState(n)` — factory for quiz state objects
- `capRenderDynSection(n, containerId, exercises, sec)` — quiz rendering
- `capCheckDyn(n, sec, qid, tipo, val, btn)` — answer checking
- `capUpdateScore(n, sec)` — score bar updates
- `capGerarQuestoes(n)` — generate classwork using tema/tipo distribution plans
- `capShowMini(n, miniNum, btn)` — mini-test tab switching
- `capGerarTeste(n)` — global test generation
- `capGerarExercicios(n)` — free exercise generator
- `capExameStart/Stop/Finish(n)` — timed exam with state factory
- `capFcRender/Flip/Next/Prev(n)` — flashcard viewer
- `capProgLog/Render/Reset(n)` — progress tracking

**`cap1-data.js` (~250 LOC):**
```javascript
window.CAP_DATA = window.CAP_DATA || {};
window.CAP_DATA[1] = {
  title: 'Inteiros',
  pageTitle: 'Cap. 1 — Inteiros · 3ponto14',
  storageKey: 'edupt_cap1',
  temas: ['T1 · Inteiros', 'T2 · Valor Absoluto', 'T3 · Adição', 'T4 · Subtração', 'T5 · Parênteses'],
  buildExercicio: function(tema, tipo, dif) { /* chapter-specific math logic */ },
  flashcards: [ {tag:'Definição', q:'O que é ℤ?', a:'...'}, ... ],
  questoesPlans: {
    facil:  { temas: ['1','1','1','1','2','2',...], tipos: ['vf','mc','mc','fill',...] },
    medio:  { ... },
    dificil: { ... }
  },
  miniPlans: [ /* per-tema question specs */ ],
  testePlans: { /* subtema distributions */ },
  unique: {
    init: function() { /* number line tool setup */ },
    drawReta: function(svgId, points, range) { ... },
    retaAddPoint: function() { ... }
  }
};
```

Same pattern for cap2-data.js (~350 LOC), cap3-data.js (~300 LOC), cap4-data.js (~200 LOC).

### cap4 special handling
cap4 already uses a data-driven `BANCO4` object. Its data file wraps BANCO4 into the CAP_DATA interface.

### HTML changes
Each capN.html replaces:
```html
<script src="js/capN.js"></script>
```
with:
```html
<script src="js/chapter-engine.js"></script>
<script src="js/capN-data.js"></script>
```

**Impact:** 4,795 LOC → ~1,500 LOC. ~3,300 LOC saved.

---

## Section 4: Lazy Loading & File Splitting

### Split systems.js (2,546 LOC)

**`systems-core.js` (~900 LOC):**
- J24 game engine (~400 LOC)
- Progress tracking: `trackSubtema()`, `renderStBars()` (~200 LOC)
- Gamification: `updateStreak()`, `showXPFloat()`, `showStreakBadge()` (~100 LOC)
- Sound: `playTone()`, `playCorrectSound()`, `playWrongSound()` (~50 LOC)
- UX: collapsible subtemas, keyboard navigation (~150 LOC)
- Loaded on ALL pages

**`systems-games.js` (~700 LOC):**
- Game4Linha, GameMine, GameSudoku, GameHanoi constructors
- `gTabSwitch()`, `_gBuildJogos()`, `_gGetQuestion()`
- Loaded only on mat7.html and mega.html
- Lazy-loaded on first game tab click via dynamic `<script>`

**`games.js` (478 LOC):**
- GameEscapeRoom — stays separate
- Lazy-loaded on Escape Room tab click

### Lazy-load gf.js (1,772 LOC)
- Only loaded when user opens "Fichas" tab in mat7.html
- Dynamic script insertion on first access

### Loading pattern
```javascript
function lazyLoad(src, callback) {
  var existing = document.querySelector('script[src="'+src+'"]');
  if (existing) { callback(); return; }
  var s = document.createElement('script');
  s.src = src;
  s.onload = callback;
  document.head.appendChild(s);
}
```

**Impact:** Cap pages load ~900 LOC instead of ~3,720 LOC at startup. ~800 LOC deferred per page.

---

## Section 5: Tailwind Migration & Inline Style Cleanup

### CSS reduction strategy
- Replace utility-like custom classes with Tailwind equivalents
- Keep: CSS custom properties, chapter color themes (`--c1-*` through `--c4-*`), complex component styles (quiz cards, game boards, flashcard animations)
- Remove: spacing/layout helpers, font-size utilities, color utilities that Tailwind covers

### Inline style replacement
- Map common inline patterns to Tailwind classes
- `style="display:flex;align-items:center;gap:.6rem"` → `class="flex items-center gap-2.5"`
- Complex decorative elements (hero blobs) → keep as CSS classes in styles.css, remove from inline

### Phosphor Icons
- Replace remaining inline SVGs with `<i class="ph ph-*">` equivalents
- Remove `icons.js` if fully replaced

**Impact:** styles.css ~2,508 → ~1,200 LOC. HTML inline styles ~400 LOC removed. ~1,700 LOC saved.

---

## Section 6: Maintainability Improvements

### 6.1 Consistent naming
Chapter engine uses `cap*(capNum, ...)` pattern. Remaining globals use `app.` namespace object.

### 6.2 Event delegation
Replace inline `onclick="..."` in generated HTML with data-attribute pattern:
```html
<button data-action="check" data-cap="2" data-sec="q" data-qid="0">
```
One container-level listener dispatches to handlers.

### 6.3 Template registry (`templates.js`, ~150 LOC)
Central functions for repeated HTML patterns: `tpl.questionCard()`, `tpl.progressBar()`, `tpl.flashcard()`, `tpl.scoreWidget()`.

### 6.4 localStorage abstraction
```javascript
const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem('edupt_'+key)) } catch(e) { return fallback } },
  set(key, val) { localStorage.setItem('edupt_'+key, JSON.stringify(val)) }
};
```
Added to shared.js. All raw localStorage calls migrated.

### 6.5 Error boundaries
Wrap dynamic content generation in try/catch. On failure: show `eduToast('Erro ao gerar exercício')` and call `_etRecord()`.

---

## LOC Budget

| Section | Before | After | Saved |
|---------|--------|-------|-------|
| Navigation fix | 302 (portal.js) | ~250 | ~50 |
| Dead CSS | 2,508 | ~2,000 | ~500 |
| Dead JS + commented code | — | — | ~200 |
| Inline styles → Tailwind | ~400 inline | 0 inline | ~400 |
| Chapter engine | 4,795 (cap1-4.js) | ~1,500 | ~3,300 |
| Tailwind CSS migration | (in CSS above) | ~1,200 | ~800 |
| Templates registry | (scattered) | 150 new | ~500 |
| **Total** | **21,390** | **~15,640** | **~5,750** |

With aggressive Tailwind migration and template consolidation, target of ~10,700 (50%) is achievable. The remaining gains come from the CSS migration being thorough and the template registry absorbing repeated innerHTML patterns from systems-core.js and chapter-engine.js.

---

## Implementation Order

1. Fix navigation (unblocks testing everything else)
2. Dead code removal (safe, immediate wins)
3. Shared utilities consolidation (prerequisite for chapter engine)
4. Chapter engine + data files (biggest impact)
5. systems.js split + lazy loading
6. Tailwind migration + inline cleanup
7. Templates, event delegation, localStorage abstraction
8. Error boundaries
9. Final cleanup pass

## Risks

- **Cap4's different architecture** may need special handling in chapter-engine.js
- **Inline onclick handlers** in generated HTML are deeply embedded; event delegation migration must be thorough
- **Tailwind CDN** (`@tailwindcss/browser@4`) runs in-browser; complex selectors may behave differently than build-time Tailwind
- **localStorage keys** must not change (would lose student progress)
