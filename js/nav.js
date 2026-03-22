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
    math7: _mat7Path + 'cap7.html',
    math8: _mat7Path + 'cap8.html'
  };
  if (map[action]) window.location.href = map[action];
}

// showGeradorFichas — go to mat7 fichas tab
function showGeradorFichas(capNum) {
  localStorage.setItem('mat7OpenTab', 'fichas');
  if (capNum) localStorage.setItem('mat7GeradorCap', capNum);
  window.location.href = _mat7Path + 'index.html';
}

// On mat7 hub page: restore requested tab on load
var _isMat7Hub = window.location.pathname.endsWith('/mat7/index.html') ||
                 window.location.pathname.endsWith('/mat7/') ||
                 window.location.pathname === '/';
if (_isMat7Hub) {
  document.addEventListener('DOMContentLoaded', function() {
    var tab = localStorage.getItem('mat7OpenTab');
    if (tab) {
      localStorage.removeItem('mat7OpenTab');
      var btn = document.querySelector('.mat7-hub-tab[data-tab="' + tab + '"]');
      if (btn && typeof mat7SwitchTab === 'function') mat7SwitchTab(tab, btn);
    }
  });
}
