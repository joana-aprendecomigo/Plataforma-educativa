# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**3ponto14** is an interactive Portuguese math learning platform for 7th graders (7.º Ano). It is a fully client-side application with no backend, no build system, and no package manager — just vanilla HTML, CSS, and JavaScript served as static files. You will be receiving requests from the product owner who cannot code. So always clarify the functional requirements of the request and use best practices to implement a solution that keeps this platform maintanable and easy to work with.

All student progress is stored in `localStorage`. There is no server, no database, no API.

## File Structure

```
index.html                  Portal/landing page (root)
mat7/                       Math 7 course pages
  index.html                Hub/dashboard (tabs: Fichas, Exercícios, Jogos, etc.)
  cap1.html – cap4.html     Chapter pages
  mega.html                 Multi-chapter study mode
js/                         All JavaScript (shared across pages)
  shared.js                 Core utilities (MUST load first on every page)
  chapter-engine.js         Generic chapter logic (load before capN.js)
  cap1.js – cap4.js         Chapter-specific content & generators
  systems.js                Shared game systems, UX, lazy loading
  systems-games.js          Game constructors (lazy-loaded by systems.js)
  games.js                  Escape room game (lazy-loaded by systems.js)
  gf.js                     Worksheet generator + error tracking panels
  mat7.js                   Hub tab navigation, cap selector, dashboard
  mega.js                   Multi-chapter mixed study mode
  portal.js                 Portal landing page logic
  widgets.js                Pomodoro timer, calculator, progress widgets (injected via JS)
  fx.js                     Visual effects and animations
  nav.js                    Navigation with path detection (MUST load last)
css/
  styles.css                Single stylesheet for all pages
data/
  cap1-data.json            Cap1 external data
  cap1-loader.js            Loader with path detection for data/
```

## Architecture

### Page → Script Map

Each HTML page loads a specific set of scripts. **Adding a script to the wrong page or removing one causes runtime errors.** Use this table as the canonical reference:

| Page | Scripts (in load order) | Notes |
|------|------------------------|-------|
| `index.html` | `shared.js`, `portal.js`, `fx.js`, `nav.js` | Portal only — no chapter/game scripts |
| `mat7/index.html` | `shared.js`, `mat7.js`, `systems.js`, `gf.js`, `widgets.js`, `fx.js`, `nav.js` | Hub page. `gf.js` eager (fichas is default tab) |
| `mat7/cap1.html` – `cap4.html` | `shared.js`, `chapter-engine.js`, `capN.js`, `systems.js`, `widgets.js`, `fx.js`, `nav.js` | One `capN.js` per page |
| `mat7/mega.html` | `shared.js`, `chapter-engine.js`, `cap1-4.js`, `systems.js`, `mega.js`, `widgets.js`, `fx.js`, `nav.js` | Loads ALL capN.js files |

**Script load order matters:**
1. `shared.js` — always first (defines core utilities used by everything)
2. `chapter-engine.js` — before any `capN.js` (provides `CAP_DATA`, `_capRegisterWrappers`)
3. `capN.js` — registers chapter data into `CAP_DATA[n]`
4. `systems.js` — after capN.js (reads `CAP_DATA` for game init)
5. `widgets.js` — injects Pomodoro + Calculator into DOM on `DOMContentLoaded`
6. `fx.js` — visual effects
7. `nav.js` — always last (overrides navigation functions, detects path context)

### Path Detection

Since pages live at different directory levels (`index.html` at root, everything else in `mat7/`), path-dependent code must detect its context:

- **`nav.js`**: Uses `_inMat7`, `_rootPath`, `_mat7Path` variables to resolve navigation links
- **`systems.js`**: `lazyLoad()` detects `/mat7/` in path and prefixes `../js/` for script injection
- **`data/cap1-loader.js`**: Detects path and uses `../data/` prefix when in mat7/

**When adding new lazy-loaded scripts or data files**, follow the `lazyLoad()` pattern in `systems.js` which handles path detection automatically.

### JavaScript Module Responsibilities

| File | Owns | Do NOT duplicate elsewhere |
|------|------|--------------------------|
| **`shared.js`** | `eduToast()`, `htmlToPdfDownload()`, quiz engine (`qzInit`, `_qzRender`), progress tracking (`_pmRecord`), error tracking (`_etRecord`, `ErrorTracker`) | Toast, quiz, progress, error tracking |
| **`chapter-engine.js`** | `CAP_DATA` registry, `_capRegisterWrappers()`, `_tplTopicGrid()`, section nav, quiz rendering, answer checking, flashcards, timed exams, `criarModalSubtema()` | Chapter lifecycle, section switching |
| **`capN.js`** | `buildExercicioN()`, `CAP_DATA[n]` registration, `_capNTopics`, `_capNSubtemaTitulos`, `_capNSubtemaGerador()`, `abrirSubtemaN()` | Chapter-specific math content only |
| **`systems.js`** | `_j24AutoInit()`, `lazyLoad()`, collapsible theory, next-step suggestions, `showNextStep()` | Game initialization, lazy loading |
| **`systems-games.js`** | `Game4Linha`, `GameMine`, `GameSudoku`, `GameHanoi`, `_gameLevelBar()` | Game constructors |
| **`games.js`** | `GameEscapeRoom` | Escape room (lazy-loaded) |
| **`gf.js`** | `_dinamico()` dispatch + `_dinamico1-4()`, `_dinamicoRow()`, `_etRenderPanel()`, worksheet PDF generation, `_gfSubtema*()` | Worksheet generation, error panels |
| **`mat7.js`** | `_buildCapSelHTML()`, `mat7SwitchTab()`, `mat7TabCapClick()`, `toggleCapSel()`, `selecionarTodos()` | Hub-specific tab/selector logic |
| **`mega.js`** | `toggleCapSel()` (mega version), mixed study mode, `retaAddPointFor()`, `retaClearFor()`, `retaAnimarFor()` | Multi-chapter study mode |
| **`widgets.js`** | `_injectPomodoro()`, `_injectCalc()`, progress bar widgets | Widget injection (Pomodoro, Calculator) |
| **`nav.js`** | All `show*View()` functions, `goToChapter()`, `showMegaView()`, `showGeradorFichas()`, path detection (`_inMat7`, `_rootPath`, `_mat7Path`) | Cross-page navigation |

### Shared Helpers (avoid re-implementing)

| Helper | File | Purpose |
|--------|------|---------|
| `_gameLevelBar(fnKey, prefix, level, labels)` | `systems-games.js` | Difficulty selector buttons for games |
| `_dinamicoRow(n, q, espacos)` | `gf.js` | Exercise row HTML for worksheets |
| `_dinamicoLinha()` | `gf.js` | Answer line HTML for worksheets |
| `_dinamico(cap, dif)` | `gf.js` | Dispatch to per-chapter worksheet generator |
| `_etRenderPanel(containerId, capIdOrIds)` | `gf.js` | Error tracking panel (single or multi-cap) |
| `_tplTopicGrid(topics)` | `chapter-engine.js` | Topic grid HTML from data array |
| `_capRegisterWrappers(n, extra)` | `chapter-engine.js` | Auto-generate ~20 delegation functions per chapter |
| `lazyLoad(src, callback)` | `systems.js` | Dynamic script loading with dedup + path detection |

### Chapter Engine & Registration Pattern

`chapter-engine.js` provides all generic chapter logic. Each chapter file registers its specific content by setting `window.CAP_DATA[n]`:

```javascript
window.CAP_DATA[2] = {
  prefix: '2',                    // DOM ID suffix (cap1 uses '' for legacy reasons)
  viewId: 'view-math2',           // Main view container ID
  tabsId: 'tabs-cap2',            // Tab bar container ID
  storageKey: 'edupt_cap2',       // localStorage key for progress
  temas: ['1','2','3','4','5',…], // Topic keys for question generation
  buildExercicio: buildExercicio2, // Function ref: (tema, tipo, dif) → exercise object
  questoesPlans: { facil:{…}, medio:{…}, dificil:{…} },
  miniPlans: { 0:[…], 1:[…], 2:[…] },
  testePlans: { subtema0:{…}, subtema1:{…}, … },
  flashcards: [ { q:'…', a:'…', tag:'Tema 1' }, … ],
};
_capRegisterWrappers(2);  // Auto-creates showSection2(), fcFlip2(), etc.
```

**Cap4 exception:** Uses `BANCO4` pre-made question bank instead of procedural `buildExercicio`.

### Subtema Pattern

Each chapter that supports subtema practice defines:
1. `_capNSubtemaTitulos` — title lookup object (`'tema:sub' → 'Title'`)
2. `_capNSubtemaGerador(tema, sub)` — returns array of exercise objects
3. `abrirSubtemaN(tema, sub)` — resets state, calls `criarModalSubtema()`

Currently cap1 and cap2 have subtema support. Cap3 and cap4 do not.

### Game Engine

Games are managed by `systems.js` via `_j24AutoInit(wrapId, level)`. Game constructors live in `systems-games.js` (eager-loaded) and `games.js` (lazy-loaded). All game constructors use `_gameLevelBar()` for difficulty buttons (except Sudoku which has custom styling).

### CSS

Single stylesheet `css/styles.css` for all pages. Uses:
- CSS custom properties for theming (`--sage`, `--rose`, `--cream`, chapter colors `--c1-*` through `--c4-*`)
- Tailwind CSS via CDN (`@tailwindcss/browser@4`) for utility classes in HTML
- Phosphor Icons via CDN (`@phosphor-icons/web@2.1.1`)
- Google Fonts: Montserrat (body), Cormorant Garamond (headings), JetBrains Mono (code/math)

### Content per Chapter

Each chapter provides: Temas (topics with theory), Questões-Aula (classwork), Minitestes, Teste Global, Gerador (exercise generator), Jogos (5 games), Quiz relâmpago, Flashcards, Exame Cronometrado (timed exam), and O Meu Progresso (progress dashboard).

## Development

There is no build step. Open any HTML file in a browser to run it. Use a local dev server (e.g., `python3 -m http.server` or VS Code Live Server) to avoid CORS issues with CDN scripts.

There are no tests, no linter, and no CI/CD pipeline. **Always verify changes visually in a browser before claiming they work.**

### Common Mistakes to Avoid

1. **Defining a function in the wrong file** — check the Module Responsibilities table above
2. **Calling a function that lives in a script not loaded by the current page** — check the Page → Script Map
3. **Forgetting path detection** when adding new lazy-loaded scripts or data files
4. **Adding `let`/`const`/arrow functions** — this is ES5 only
5. **Duplicating logic** that already exists in a shared helper — check the Shared Helpers table
6. **Loading scripts in wrong order** — `shared.js` first, `nav.js` last, always

## How to Add a New Chapter

Adding a new chapter (e.g., cap5) requires 3 files: one HTML page, one JS file, and CSS color variables.

### Step 1: Create `js/cap5.js`

Follow the pattern in `cap1.js`–`cap3.js` (cap4 uses a legacy bank pattern — prefer the procedural `buildExercicio` approach):

1. **Write `buildExercicio5(tema, tipo, dif)`** — returns an exercise object
2. **Register `CAP_DATA[5]`** with question plans, flashcards, and the `buildExercicio` function ref
3. **Call `_capRegisterWrappers(5)`** to auto-generate delegation functions
4. **Define `_cap5Topics`** array and self-invoke `_tplTopicGrid()`
5. **Optionally add subtema support**: define `_cap5SubtemaTitulos`, `_cap5SubtemaGerador`, `abrirSubtema5`

### Step 2: Create `mat7/cap5.html`

Copy `mat7/cap2.html` or `mat7/cap3.html` as a template. Update:
- All ID suffixes: `sec-teoria2` → `sec-teoria5`, `tabs-cap2` → `tabs-cap5`, etc.
- Chapter color classes: `c2-` → `c5-`
- The topic grid container: `<div class="topics-grid" id="cap5-topics-grid"></div>`
- Script tags: load `cap5.js` instead of `cap2.js` (use `../js/` prefix)
- Page title and headings

### Step 3: Add CSS colors

In `css/styles.css`, add `--c5-*` color variables following the `--c1-*` through `--c4-*` pattern.

### Step 4: Wire up navigation

- In `mat7/index.html` / `mat7.js`: add a chapter card/link
- In `nav.js`: add `showMathView5()` function
- In `mat7/mega.html`: add `<script src="../js/cap5.js"></script>`
- In `gf.js`: add `_dinamico5(dif)` function and update `_dinamico()` dispatch

### Avoid Duplication Checklist

- **DO** put all quiz/exam/flashcard/progress logic in `chapter-engine.js`
- **DO** use `_tplTopicGrid()` for topic grids
- **DO** use `_capRegisterWrappers(n)` for delegation functions
- **DO** use `_gameLevelBar()` for game difficulty buttons
- **DO** use `_dinamicoRow()` for worksheet exercise rows
- **DO** use `lazyLoad()` for heavy scripts not needed on initial render
- **DON'T** add chapter-specific CSS unless truly unique — use `--cN-*` colors
- **DON'T** copy-paste exercise logic between chapters
- **DON'T** define navigation functions outside `nav.js`
- **DON'T** duplicate Pomodoro/Calculator HTML — `widgets.js` injects them

## How to Add a New Course

To add an entirely new course (e.g., "Matemática 8.º Ano"):

1. **Create a new directory** (e.g., `mat8/`) with `index.html` (hub) and chapter pages
2. **Reuse the engine**: `shared.js`, `chapter-engine.js`, `systems.js`, `widgets.js`, `fx.js`, and `nav.js` are course-agnostic
3. **Create course-specific JS**: `mat8.js` (hub), `mat8-cap1.js` etc.
4. **Update `nav.js`**: add path detection for `/mat8/` and navigation functions
5. **Update `index.html`** portal to link to the new course hub
6. **Add course color variables** in CSS (e.g., `--m8c1-*`)

The `CAP_DATA` registration is global, so use a namespace strategy: chapters 1–10 for mat7, 11–20 for mat8, or string keys (`'m8c1'`).

## Critical Conventions

- **Language**: All UI text and content in **Portuguese (PT)**. Use decimal comma (`0,5` not `0.5`).
- **No frameworks**: Vanilla JS only. No React, Vue, or any framework.
- **No build tools**: No webpack, vite, or npm. Static files served directly.
- **ES5 compatibility**: No `let`/`const`, no arrow functions, no template literals. Use `var`, `function`, and string concatenation.
- **innerHTML templating**: String concatenation with `innerHTML`. Sanitize user input.
- **View toggling**: Sections use `display:none`/`display:block` or `active` class.
- **localStorage only**: All persistence is client-side.
- **Script order**: `shared.js` first → `nav.js` last. See Page → Script Map.
- **CSS naming**: kebab-case. Chapter styles use `c1-`–`c4-` prefixes. Prefer Tailwind for new layout.
- **Lazy loading**: Use `lazyLoad()` for heavy scripts not needed on initial render.
- **Phosphor Icons**: Use `<i class="ph ph-icon-name"></i>`. Migrate away from inline SVGs.
- **Path-aware code**: When referencing files from JS, use the path detection pattern from `nav.js` or `systems.js`.

## History & Known Debt

Refactored from monolithic `main.js` into modular files, then deduplicated:
- `chapter-engine.js` centralizes quiz/exam/flashcard/progress logic
- `_tplTopicGrid()` replaced ~270 LOC of duplicated topic HTML
- `_capRegisterWrappers()` auto-generates ~20 delegation functions per chapter
- `_gameLevelBar()` replaced 4x duplicated level-button HTML in game constructors
- `_etRenderPanel()` merged two 95%-identical error panel functions
- `_dinamicoRow()` / `_dinamicoLinha()` extracted from 4 duplicated worksheet generators
- Pomodoro + Calculator widgets moved from duplicated HTML to JS injection via `widgets.js`
- Subtema title data separated from generator logic in cap1/cap2
- HTML pages reorganized into `mat7/` folder with path-aware navigation

**Remaining debt:**
- `_dinamico1`–`_dinamico4` functions still contain unique math content (~400 LOC) that could potentially be more data-driven
- CSS utility classes that duplicate Tailwind could be replaced in HTML (requires updating class references in both HTML and JS-generated innerHTML)
- `icons.js` SVG utilities being migrated to Phosphor Icons CDN
- Cap3 and Cap4 don't have subtema support yet
