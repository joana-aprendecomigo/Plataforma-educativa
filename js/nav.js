/* ── Multi-page navigation overrides ──────────────────────────────
   Loaded after main.js on every page so these definitions win.
   main.js defines show*View() as DOM show/hide — here we redirect
   to the corresponding HTML page instead.
─────────────────────────────────────────────────────────────────── */

function showPortalView()     { window.location.href = 'index.html'; }
function showPortalView2()    { window.location.href = 'index.html'; }
function showPortalFromMat7() { window.location.href = 'index.html'; }

function showMat7View()       { window.location.href = 'mat7.html'; }
function showMat7FromMega()   { window.location.href = 'mat7.html'; }

function showMathView()       { window.location.href = 'cap1.html'; }
function showMathView2()      { window.location.href = 'cap2.html'; }
function showMathView3()      { window.location.href = 'cap3.html'; }
function showMathView4()      { window.location.href = 'cap4.html'; }

function goToChapter(n) {
  window.location.href = 'cap' + n + '.html';
}

function handleSubj(e, action) {
  var map = { math7: 'mat7.html', math: 'cap1.html', math2: 'cap2.html', math3: 'cap3.html', math4: 'cap4.html' };
  if (map[action]) window.location.href = map[action];
}

// Save selected chapters to localStorage before going to mega view,
// so mega.html can restore the selection on load.
function showMegaView() {
  var sel = [];
  [1,2,3,4].forEach(function(n) {
    var el = document.getElementById('mat7-cap' + n);
    if (el && el.classList.contains('selected')) sel.push(n);
  });
  if (sel.length === 0) sel = [1,2,3,4]; // default: all
  localStorage.setItem('megaSelectedCaps', JSON.stringify(sel));
  window.location.href = 'mega.html';
}

// showGeradorFichas — go to mat7 fichas tab
function showGeradorFichas(capNum) {
  localStorage.setItem('mat7OpenTab', 'fichas');
  if (capNum) localStorage.setItem('mat7GeradorCap', capNum);
  window.location.href = 'mat7.html';
}

// On mat7.html: restore requested tab on load
if (window.location.pathname.endsWith('mat7.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    var tab = localStorage.getItem('mat7OpenTab');
    if (tab) {
      localStorage.removeItem('mat7OpenTab');
      var btn = document.querySelector('.mat7-hub-tab[data-tab="' + tab + '"]');
      if (btn && typeof mat7SwitchTab === 'function') mat7SwitchTab(tab, btn);
    }
  });
}
