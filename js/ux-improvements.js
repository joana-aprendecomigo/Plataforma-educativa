// ux-improvements.js — Melhorias de UX globais para todas as páginas
// Carregado em exames.html e exames-pt.html (e pode ser incluído noutras páginas)

(function() {
'use strict';

/* ══════════════════════════════════════════════════════
   1. DARK MODE — funciona com .ex-topbar e .topbar
══════════════════════════════════════════════════════ */
var UX_DARK_KEY = 'edupt_dark';

function uxApplyDark(on) {
  document.body.classList.toggle('dark-mode', on);
  try { localStorage.setItem(UX_DARK_KEY, on ? '1' : '0'); } catch(e) {}
  var btn = document.getElementById('ux-dark-btn');
  if (btn) {
    btn.innerHTML = on
      ? '<i class="ph ph-sun"></i><span class="ux-btn-lbl"> Claro</span>'
      : '<i class="ph ph-moon"></i><span class="ux-btn-lbl"> Escuro</span>';
    btn.title = on ? 'Mudar para modo claro' : 'Mudar para modo escuro';
  }
}

window.uxToggleDark = function() {
  uxApplyDark(!document.body.classList.contains('dark-mode'));
};

/* ══════════════════════════════════════════════════════
   2. INJECTAR BOTÕES NA TOPBAR DOS EXAMES
══════════════════════════════════════════════════════ */
function uxInjectTopbarControls() {
  // Funciona com .ex-topbar (exames) e .topbar (mat7)
  var topbar = document.querySelector('.ex-topbar, .topbar');
  if (!topbar || document.getElementById('ux-dark-btn')) return;

  var wrap = document.createElement('div');
  wrap.id = 'ux-topbar-controls';
  wrap.style.cssText = 'display:flex;align-items:center;gap:.4rem;margin-left:.5rem;flex-shrink:0';

  // Dark mode button
  var darkBtn = document.createElement('button');
  darkBtn.id = 'ux-dark-btn';
  darkBtn.onclick = uxToggleDark;
  darkBtn.style.cssText = 'display:flex;align-items:center;gap:.3rem;padding:5px 11px;border-radius:999px;border:1.5px solid var(--border,#ddd8d2);background:transparent;font-family:Montserrat,sans-serif;font-size:.72rem;font-weight:700;color:var(--ink3,#6b6560);cursor:pointer;transition:all .15s;white-space:nowrap';
  darkBtn.innerHTML = '<i class="ph ph-moon"></i><span class="ux-btn-lbl"> Escuro</span>';
  darkBtn.title = 'Mudar para modo escuro';
  darkBtn.onmouseover = function(){ this.style.borderColor='#8b7cc0';this.style.color='#5c4e8a'; };
  darkBtn.onmouseout = function(){ this.style.borderColor='var(--border,#ddd8d2)';this.style.color='var(--ink3,#6b6560)'; };

  wrap.appendChild(darkBtn);

  // Inserir antes do botão "Início" (back)
  var backBtn = topbar.querySelector('.ex-topbar-back, .topbar-right');
  if (backBtn) topbar.insertBefore(wrap, backBtn);
  else topbar.appendChild(wrap);

  // Aplicar estado guardado
  var saved = '0';
  try { saved = localStorage.getItem(UX_DARK_KEY) || '0'; } catch(e) {}
  if (saved === '1') uxApplyDark(true);
}

/* ══════════════════════════════════════════════════════
   3. AVISO AO SAIR DE QUIZ A MEIO
══════════════════════════════════════════════════════ */
var _uxQuizActive = false;

window.uxSetQuizActive = function(on) { _uxQuizActive = on; };

window.addEventListener('beforeunload', function(e) {
  if (_uxQuizActive) {
    e.preventDefault();
    e.returnValue = 'Tens um quiz em curso. Tens a certeza que queres sair?';
    return e.returnValue;
  }
});

/* ══════════════════════════════════════════════════════
   4. TOAST MELHORADO — com ícones e animação
══════════════════════════════════════════════════════ */
window.uxToast = function(msg, type, duration) {
  // Usa eduToast se disponível, senão cria o seu próprio
  if (typeof eduToast === 'function') { eduToast(msg, type); return; }
  var icons = { success: '✓', error: '✕', warn: '⚠', info: 'ℹ' };
  var colors = {
    success: { bg: '#e8f5ee', border: '#2e7d52', color: '#1a5c38' },
    error:   { bg: '#fdecea', border: '#c0392b', color: '#922b21' },
    warn:    { bg: '#fef3e2', border: '#b07030', color: '#7a4a10' },
    info:    { bg: '#e8f4fd', border: '#2a7db5', color: '#1a5075' }
  };
  type = type || 'info';
  var c = colors[type] || colors.info;
  var t = document.getElementById('ux-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'ux-toast';
    t.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) translateY(80px);z-index:99999;border-radius:12px;padding:.75rem 1.25rem;font-family:Montserrat,sans-serif;font-size:.84rem;font-weight:700;display:flex;align-items:center;gap:.5rem;box-shadow:0 8px 32px rgba(0,0,0,.18);transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .3s;opacity:0;max-width:340px;text-align:center;pointer-events:none';
    document.body.appendChild(t);
  }
  t.style.background = c.bg;
  t.style.border = '1.5px solid ' + c.border;
  t.style.color = c.color;
  t.innerHTML = '<span>' + (icons[type]||'') + '</span><span>' + msg + '</span>';
  setTimeout(function() { t.style.transform = 'translateX(-50%) translateY(0)'; t.style.opacity = '1'; }, 10);
  clearTimeout(t._timer);
  t._timer = setTimeout(function() { t.style.transform = 'translateX(-50%) translateY(80px)'; t.style.opacity = '0'; }, duration || 2800);
};

/* ══════════════════════════════════════════════════════
   5. STREAK DIÁRIO — badge de motivação
══════════════════════════════════════════════════════ */
function uxCheckStreak() {
  var KEY = 'ux_streak';
  var today = new Date().toISOString().slice(0, 10);
  var data = { streak: 0, lastDay: null };
  try { data = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e) {}

  var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (data.lastDay === today) return; // já registado hoje

  data.streak = data.lastDay === yesterday ? (data.streak || 0) + 1 : 1;
  data.lastDay = today;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e) {}

  if (data.streak >= 2) {
    setTimeout(function() {
      uxToast('🔥 ' + data.streak + ' dias seguidos a estudar! Continua assim!', 'success', 3500);
    }, 1200);
  }
}

/* ══════════════════════════════════════════════════════
   6. SCROLL-TO-TOP MELHORADO
══════════════════════════════════════════════════════ */
function uxInitScrollTop() {
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    var show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════
   7. INDICADOR DE SCROLL NAS TABS MOBILE
══════════════════════════════════════════════════════ */
function uxInitTabsScrollIndicator() {
  var tabWraps = document.querySelectorAll('.ex-tabs-wrap');
  tabWraps.forEach(function(wrap) {
    function update() {
      var atEnd = wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 10;
      wrap.style.maskImage = atEnd
        ? 'none'
        : 'linear-gradient(to right, black 70%, transparent 100%)';
      wrap.style.webkitMaskImage = wrap.style.maskImage;
    }
    wrap.addEventListener('scroll', update, { passive: true });
    update();
  });
}

/* ══════════════════════════════════════════════════════
   8. ANIMAÇÃO DE ENTRADA NAS CARDS
══════════════════════════════════════════════════════ */
function uxInitCardAnimations() {
  if (!window.IntersectionObserver) return;
  var style = document.createElement('style');
  style.textContent = '.ux-anim-ready{opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .4s ease}.ux-anim-in{opacity:1!important;transform:none!important}';
  document.head.appendChild(style);

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('ux-anim-in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  // Animar cards das grids com delay escalonado
  setTimeout(function() {
    var cards = document.querySelectorAll('.pt-topic-card, .pt-year-row, .ex-topic-card, .ex-year-row');
    cards.forEach(function(c, i) {
      c.classList.add('ux-anim-ready');
      c.style.transitionDelay = (i * 0.04) + 's';
      obs.observe(c);
    });
  }, 100);
}

/* ══════════════════════════════════════════════════════
   9. FOCUS TRAP NO OVERLAY (acessibilidade)
══════════════════════════════════════════════════════ */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Fechar qualquer overlay aberto
    var overlays = ['pt-overlay', 'ex-overlay'];
    overlays.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.style.display !== 'none') {
        if (typeof ptCloseOverlay === 'function') ptCloseOverlay();
        if (typeof exCloseOverlay === 'function') exCloseOverlay();
      }
    });
  }
  // Navegação por teclado nas opções de quiz (1,2,3,4)
  if (['1','2','3','4'].indexOf(e.key) !== -1 && !e.ctrlKey && !e.metaKey) {
    var target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
    var idx = parseInt(e.key) - 1;
    var opts = document.querySelectorAll('#pt-gram-opts button, #pt-fig-opts button, #pt-opts-wrap .pn-opt, #pt-sim-opts button, #pt-lus-opts button, #pt-disc-opts button, #pt-con-opts button');
    if (opts[idx]) opts[idx].click();
  }
});

/* ══════════════════════════════════════════════════════
   10. DARK MODE — CSS extra para páginas de exames
══════════════════════════════════════════════════════ */
(function injectDarkCSS() {
  var css = '\
body.dark-mode .ex-topbar{background:rgba(24,24,24,.97)!important;border-bottom-color:#333!important}\
body.dark-mode .ex-hero{background:linear-gradient(150deg,#0a0820 0%,#1a1440 35%,#2a2358 70%,#3a3070 100%)!important}\
body.dark-mode .ex-hstat{background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.1)!important}\
body.dark-mode .ex-tabs-wrap{background:rgba(30,30,30,.9)!important;border-color:#333!important}\
body.dark-mode .ex-tab{color:#a09890!important}\
body.dark-mode .ex-tab.active{background:linear-gradient(135deg,#3d2d6e,#5c4e8a)!important;color:#fff!important}\
body.dark-mode .ex-topic-card,body.dark-mode .pt-topic-card,body.dark-mode .ex-sim-card,body.dark-mode .pt-sim-card,body.dark-mode .pt-year-row,body.dark-mode .ex-year-row{background:#242424!important;border-color:#3a3a3a!important}\
body.dark-mode .ex-topic-label,body.dark-mode .pt-topic-label{color:#e8e4df!important}\
body.dark-mode .ex-topic-sub,body.dark-mode .pt-topic-sub{color:#a09890!important}\
body.dark-mode .pn-opt{background:#2a2a2a!important;border-color:#3a3a3a!important;color:#e8e4df!important}\
body.dark-mode .pn-opt:hover{background:#333!important;border-color:#6b5fa0!important}\
body.dark-mode #pt-inline-engine>div,body.dark-mode #pt-gram-engine>div{background:#242424!important;border-color:#3a3a3a!important;color:#e8e4df!important}\
body.dark-mode .pt-texto-box{background:#1e1e1e!important;border-color:#3a3a3a!important}\
body.dark-mode .pt-toggle-texto{background:#242424!important;border-color:#3a3a3a!important;color:#a09890!important}\
body.dark-mode .ex-progress-bar-section,body.dark-mode .ex-sim-card,body.dark-mode .pt-sim-card{background:#242424!important;border-color:#3a3a3a!important}\
body.dark-mode .ex-result-hero{background:linear-gradient(135deg,#1a1040,#2d2450)!important}\
body.dark-mode #ux-dark-btn{border-color:#3a3a3a!important;color:#a09890!important}\
body.dark-mode .pt-composicao-card{background:linear-gradient(135deg,#0e0a28,#1e1640)!important}\
body.dark-mode textarea{background:#2a2a2a!important;border-color:#3a3a3a!important;color:#e8e4df!important}\
body.dark-mode #pt-comp-check-result>div{background:#242424!important;border-color:#3a3a3a!important}\
';
  var el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
})();

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  uxInjectTopbarControls();
  uxCheckStreak();
  uxInitScrollTop();
  setTimeout(uxInitTabsScrollIndicator, 300);
  setTimeout(uxInitCardAnimations, 200);
});

})();
