/* ── Multi-page navigation ────────────────────────────────────────
   Canonical navigation functions for the multi-page app.
   nav.js is loaded last on every page so these definitions win
   over any same-named functions in page-specific scripts.
─────────────────────────────────────────────────────────────────── */

/* ── Path helpers ─────────────────────────────────────────────────
   Detect whether we are inside the mat7/ subdirectory so that all
   navigation functions resolve paths correctly regardless of the
   current page location.
─────────────────────────────────────────────────────────────────── */
var _inMat7 = window.location.pathname.indexOf('/mat7/') !== -1 ||
              window.location.pathname.endsWith('/mat7');
var _rootPath = _inMat7 ? '../' : '';
var _mat7Path = _inMat7 ? '' : 'mat7/';

/* ── Portal (index.html at root) ── */
function showPortalView() { window.location.href = _rootPath + 'index.html'; }
// Backward-compat aliases (all do the same thing)
var showPortalView2    = showPortalView;
var showPortalFromMat7 = showPortalView;

/* ── Mat7 hub ── */
function showMat7View() { window.location.href = _mat7Path + 'index.html'; }

/* ── Chapter pages ── */
function showMathView()  { window.location.href = _mat7Path + 'cap1.html'; }
function showMathView2() { window.location.href = _mat7Path + 'cap2.html'; }
function showMathView3() { window.location.href = _mat7Path + 'cap3.html'; }
function showMathView4() { window.location.href = _mat7Path + 'cap4.html'; }
function showMathView5() { window.location.href = _mat7Path + 'cap5.html'; }
function showMathView6() { window.location.href = _mat7Path + 'cap6.html'; }
function showMathView7() { window.location.href = _mat7Path + 'cap7.html'; }
function showMathView8() { window.location.href = _mat7Path + 'cap8.html'; }

function goToChapter(n) {
  window.location.href = _mat7Path + 'cap' + n + '.html';
}

function handleSubj(e, action) {
  var map = {
    math7: _mat7Path + 'index.html',
    math:  _mat7Path + 'cap1.html',
    math2: _mat7Path + 'cap2.html',
    math3: _mat7Path + 'cap3.html',
    math4: _mat7Path + 'cap4.html',
    math5: _mat7Path + 'cap5.html',
    math6: _mat7Path + 'cap6.html',
    math8: _mat7Path + 'cap8.html'
  };
  if (map[action]) window.location.href = map[action];
}

// showGeradorFichas — go to mat7 fichas tab
function showGeradorFichas(capNum) {
  try { localStorage.setItem('mat7OpenTab', 'fichas'); } catch(e) {}
  try { if (capNum) localStorage.setItem('mat7GeradorCap', capNum); } catch(e) {}
  window.location.href = _mat7Path + 'index.html';
}

// On mat7 hub page: restore requested tab on load (localStorage OR URL hash)
var _isMat7Hub = window.location.pathname.endsWith('/mat7/index.html') ||
                 window.location.pathname.endsWith('/mat7/') ||
                 window.location.pathname === '/';
if (_isMat7Hub) {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. URL hash takes priority: mat7/index.html#fichas or #resumo etc.
    var hash = window.location.hash.replace('#', '');
    var validTabs = ['fichas','resumo','exercicios','jogos','quiz','flashcards','exame','progresso'];
    if (hash && validTabs.indexOf(hash) !== -1) {
      var btn = document.querySelector('.mat7-hub-tab[data-tab="' + hash + '"]');
      if (btn && typeof mat7SwitchTab === 'function') mat7SwitchTab(hash, btn);
      return;
    }
    // 2. Fallback: localStorage (used by showGeradorFichas)
    var tab = localStorage.getItem('mat7OpenTab');
    if (tab) {
      localStorage.removeItem('mat7OpenTab');
      var btn2 = document.querySelector('.mat7-hub-tab[data-tab="' + tab + '"]');
      if (btn2 && typeof mat7SwitchTab === 'function') mat7SwitchTab(tab, btn2);
    }
  });
}

// Deep link helper — usado em comunicações aos alunos/professores
// Exemplos: navToTab('fichas'), navToTab('exercicios')
function navToTab(tab) {
  if (_isMat7Hub) {
    var btn = document.querySelector('.mat7-hub-tab[data-tab="' + tab + '"]');
    if (btn && typeof mat7SwitchTab === 'function') mat7SwitchTab(tab, btn);
    window.location.hash = tab;
  } else {
    try { localStorage.setItem('mat7OpenTab', tab); } catch(e) {}
    window.location.href = _mat7Path + 'index.html#' + tab;
  }
}

// Deep link para páginas de capítulo: cap2.html#exercicios → vai para exercícios
// Suporta secções: temas, teoria, questoes/exercicios, minitestes, teste, gerador, jogos, quiz, flashcards, exame, progresso, professor
(function() {
  // Só actua em páginas de capítulo (capN.html)
  var capMatch = window.location.pathname.match(/cap(\d+)\.html/);
  if (!capMatch) return;
  var n = capMatch[1];

  document.addEventListener('DOMContentLoaded', function() {
    var hash = window.location.hash.replace('#','').toLowerCase();
    if (!hash) return;

    // Normalizar alias comuns
    var aliasMap = {
      'exercicios': 'questoes' + n,
      'exercícios': 'questoes' + n,
      'questoes':   'questoes' + n,
      'teoria':     'teoria' + n,
      'temas':      'temas' + n,
      'minitestes': 'minitestes' + n,
      'teste':      'teste' + n,
      'exame':      'exame' + n,
      'gerador':    'gerador' + n,
      'jogos':      'jogos' + n,
      'quiz':       'quiz-game' + n,
      'flashcards': 'flashcards' + n,
      'progresso':  'progresso' + n,
      'professor':  'professor'  // abre a secção teacher-strip
    };

    var secId = aliasMap[hash] || hash;

    if (secId === 'professor') {
      // Abrir teacher-strip automaticamente
      var strip = document.querySelector('.teacher-strip');
      if (strip && !strip.classList.contains('open')) {
        strip.classList.add('open');
        strip.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Tentar navegar para a secção via showSectionN
    var fn = window['showSection' + n] || window['showSection'];
    if (typeof fn === 'function') {
      // Encontrar o botão correspondente
      var btn = document.querySelector('[onclick*="' + secId + '"]');
      fn(secId, btn || null);
      // Scroll suave para o topo do conteúdo
      setTimeout(function() {
        var el = document.getElementById(secId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  });
})();
