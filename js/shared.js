/* ── Block 1 (from line 26) ── */
/* ── Toast notification system ── */
var _toastTimer=null;
function eduToast(msg,type){
  var t=document.getElementById('edupt-toast');
  if(!t){t=document.createElement('div');t.id='edupt-toast';t.className='edupt-toast';document.body.appendChild(t);}
  t.textContent=msg;
  t.className='edupt-toast'+(type==='warn'?' toast-warn':type==='error'?' toast-error':type==='success'?' toast-success':'');
  clearTimeout(_toastTimer);
  requestAnimationFrame(function(){t.classList.add('show');});
  _toastTimer=setTimeout(function(){t.classList.remove('show');},2800);
}
function htmlToPdfDownload(htmlContent, filename) {
  // Prefix filename
  if (_n) {
    var _safe = _n.replace(/[^a-zA-Z0-9áéíóúâêîôûãõàèìòùçÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÇ]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
    if (_safe) {
      var _prefix = _role === 'professor' ? 'prof_' + _safe + '_' : _safe + '_';
      filename = _prefix + filename;
    }
  }

  // Build a self-contained HTML file with a prominent "Guardar PDF" button
  var printBtn = [
    '<div id="_pdfbar" style="position:fixed;top:0;left:0;right:0;z-index:9999;',
    'background:linear-gradient(135deg,#516860,#77998E);padding:14px 24px;',
    'display:flex;align-items:center;justify-content:space-between;',
    'font-family:Montserrat,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.18)">',
    '  <span style="color:#fff;font-weight:700;font-size:1rem">',
    '    3ponto14 &middot; Ficha de Trabalho',
    '  </span>',
    '  <button onclick="window.print()" style="background:#fff;color:#516860;',
    '    border:none;border-radius:999px;padding:10px 28px;font-family:Montserrat,sans-serif;',
    '    font-size:.95rem;font-weight:800;cursor:pointer;',
    '    box-shadow:0 2px 8px rgba(0,0,0,.15)">',
    '    \uD83D\uDCE5 Guardar como PDF',
    '  </button>',
    '</div>',
    '<div style="height:60px"></div>',
    '<style>',
    '@media print {',
    '  #_pdfbar, #_pdfbar + div { display:none !important; }',
    '  body { padding-top: 0 !important; }',
    '  h2, th, [style*="background"] {',
    '    -webkit-print-color-adjust:exact !important;',
    '    print-color-adjust:exact !important;',
    '  }',
    '  @page { size:A4; margin:12mm 15mm; }',
    '}',
    '</style>',
    '<script>',
    'window.addEventListener("load", function() {',
    '  setTimeout(function() { window.print(); }, 800);',
    '});',
    '<\/script>'
  ].join('\n');

  // Inject the bar into the HTML document
  var html = htmlContent;
  if (html.indexOf('<body>') !== -1) {
    html = html.replace('<body>', '<body>' + printBtn);
  } else if (html.indexOf('<body ') !== -1) {
    html = html.replace(/<body([^>]*)>/, '<body$1>' + printBtn);
  } else {
    html = printBtn + html;
  }

  // IMPORTANT: must be called synchronously from click handler (no setTimeout)
  // so the browser allows the popup. Open in a new tab with the full document.
  var blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var win = window.open(url, '_blank');
  if (!win) {
    // If still blocked, try <a download> as fallback
    var a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.pdf', '.html');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (typeof eduToast === 'function') eduToast('Ficheiro HTML descarregado. Abre-o no browser e usa Cmd+P para guardar como PDF.', 'success');
  }
  setTimeout(function() { URL.revokeObjectURL(url); }, 120000);
}

// SHARED UTILITIES — used across chapter files
function rnd(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function rndNZ(min,max){var v;do{v=rnd(min,max)}while(v===0);return v}
function shuffle(arr){return arr.slice().sort(function(){return Math.random()-.5})}
function fmt(n){return n>0?'+'+n:''+n}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a}
function lcm(a,b){return Math.abs(a*b)/gcd(a,b)}

// localStorage abstraction
var store = {
  get: function(key, fallback) { try { return JSON.parse(localStorage.getItem('edupt_'+key)) } catch(e) { return fallback !== undefined ? fallback : null } },
  set: function(key, val) { localStorage.setItem('edupt_'+key, JSON.stringify(val)) },
  remove: function(key) { localStorage.removeItem('edupt_'+key) }
};

// QUIZ ENGINE — Uma questão de cada vez, com barra de progresso
// Usa os mesmos exercícios gerados por buildExercicio / BANCO4
var _qzState = {};

// Helper: parse fill-input value tolerating PT decimal comma
function _parseFillVal(v) { return parseFloat(String(v).replace(',', '.')); }
// EDUPT — PROGRESS MANAGER v2  (localStorage persistente)
var ProgressManager = (function () {
  var KEY = 'edupt_progress_v2';
  var XP = { teoria:10, quiz:20, quiz_bonus:15, jogo:15, flashcard:8, ficha:5 };
  var CAP_NAMES = { cap1:'Números Inteiros', cap2:'Números Racionais', cap3:'Geometria', cap4:'Equações', cap5:'Sequências', cap6:'Funções', cap7:'Figuras Semelhantes', cap8:'Dados e Probabilidades' };

  function _emptyChap(id) {
    return { id:id, teoria:false, quiz:{tentativas:0,melhorPct:0}, jogo:false, flashcard:false, ficha:false, xp:0 };
  }
  function _load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { caps:{}, streak:0, lastDay:null, totalXp:0 }; }
    catch(e) { return { caps:{}, streak:0, lastDay:null, totalXp:0 }; }
  }
  function _save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e) {}
  }
  function _updateStreak(d) {
    var today = new Date().toISOString().slice(0,10);
    if (d.lastDay === today) return;
    var yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
    d.streak = d.lastDay === yest ? (d.streak||0)+1 : 1;
    d.lastDay = today;
  }
  function _fire(capId, tipo, xpGanho) {
    document.dispatchEvent(new CustomEvent('edupt:progress', { detail:{ capId:capId, tipo:tipo, xpGanho:xpGanho } }));
    if (typeof pmUpdateTopbar === 'function') pmUpdateTopbar();
  }

  function record(capId, tipo, opts) {
    opts = opts || {};
    var d = _load();
    if (!d.caps[capId]) d.caps[capId] = _emptyChap(capId);
    var cap = d.caps[capId];
    var xpG = 0;
    if (tipo === 'teoria' && !cap.teoria) {
      cap.teoria = true; xpG = XP.teoria;
    } else if (tipo === 'quiz') {
      var pct = opts.total > 0 ? Math.round((opts.pontuacao||0)/opts.total*100) : 0;
      cap.quiz.tentativas++;
      xpG = XP.quiz;
      if (pct > cap.quiz.melhorPct) {
        if (cap.quiz.melhorPct === 0) xpG += XP.quiz_bonus;
        cap.quiz.melhorPct = pct;
      }
    } else if (tipo === 'jogo' && !cap.jogo) {
      cap.jogo = true; xpG = XP.jogo;
    } else if (tipo === 'flashcard' && !cap.flashcard) {
      cap.flashcard = true; xpG = XP.flashcard;
    } else if (tipo === 'ficha' && !cap.ficha) {
      cap.ficha = true; xpG = XP.ficha;
    }
    cap.xp = (cap.xp||0) + xpG;
    d.totalXp = (d.totalXp||0) + xpG;
    _updateStreak(d);
    _save(d);
    _fire(capId, tipo, xpG);
    return xpG;
  }

  function getCap(capId) { return _load().caps[capId] || null; }

  function getCapPct(capId) {
    var cap = getCap(capId);
    if (!cap) return 0;
    var itens = [cap.teoria, cap.quiz.tentativas>0, cap.jogo, cap.flashcard, cap.ficha];
    return Math.round(itens.filter(Boolean).length / itens.length * 100);
  }

  function getSummary() {
    var d = _load();
    var caps = Object.values(d.caps);
    return {
      totalXp: d.totalXp||0,
      streak: d.streak||0,
      lastDay: d.lastDay,
      capsCompletas: caps.filter(function(c){ return c.teoria && c.quiz.tentativas>0 && c.jogo; }).length,
      caps: d.caps
    };
  }

  function exportJSON() {
    var blob = new Blob([JSON.stringify(_load(),null,2)], {type:'application/json'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'edupt_progresso.json';
    a.click();
  }

  function reset() {
    if (!confirm('Apagar todo o progresso guardado? Esta acção não pode ser revertida.')) return;
    try { localStorage.removeItem(KEY); } catch(e) {}
    _fire(null, 'reset', 0);
  }

  return { record:record, getCap:getCap, getCapPct:getCapPct, getSummary:getSummary, exportJSON:exportJSON, reset:reset, CAP_NAMES:CAP_NAMES };
})();

// _pmRecord — convenience wrapper
function _pmRecord() {
  ProgressManager.record.apply(ProgressManager, arguments);
}

// ── Safe ErrorTracker proxy — queues calls until ErrorTracker is defined ──
var _etQueue = [];
function _etRecord() {
  var args = Array.prototype.slice.call(arguments);
  if (typeof ErrorTracker !== 'undefined' && ErrorTracker.record) {
    ErrorTracker.record.apply(ErrorTracker, args);
  } else {
    _etQueue.push(args);
  }
}

function qzInit(containerId, exercicios, sec, onFinish) {
  var st = {
    exercises: exercicios,
    current: 0,
    score: { correct: 0, total: 0 },
    answered: false,
    sec: sec,
    onFinish: onFinish || null
  };
  _qzState[containerId] = st;
  _qzRender(containerId);
}

function _qzRender(cid) {
  var c = document.getElementById(cid);
  if (!c) return;
  var st = _qzState[cid];
  var q = '\'' + cid + '\'';  // safe cid for onclick attributes
  if (!st) return;
  var ex = st.exercises[st.current];
  if (!ex) { _qzShowResults(cid); return; }

  var total = st.exercises.length;
  var cur   = st.current + 1;
  var pct   = Math.round((st.current / total) * 100);
  var labels = ['A','B','C','D'];

  var qnum = ex.num || cur;
  var tema  = ex.tema || '';
  var enun  = (typeof formatMath === 'function') ? formatMath(ex.enun || ex.en || '') : (ex.enun || ex.en || '');
  var visual = (ex.visual || ex.vis) ? '<div class="qz-visual">' + (ex.visual || ex.vis) + '</div>' : '';

  var optionsHtml = '';
  var tipo = ex.tipo || 'mc';

  if (tipo === 'fill') {
    var fillId = cid + '-fill';
    optionsHtml = '<div class="qz-fill-row">'
      + '<input class="qz-fill-input" id="' + fillId + '" data-cid="' + cid + '" data-resp="' + ex.resposta + '" placeholder="?" type="text">'
      + '<button class="qz-check-btn" data-cid="' + cid + '" data-resp="' + ex.resposta + '" onclick="var i=document.getElementById(this.dataset.cid+\'-fill\');qzCheckFillDirect(this.dataset.cid,parseFloat(i.value.replace(\',\',\'.\'))||i.value,parseFloat(this.dataset.resp))">Verificar</button>'
      + '</div>';
  } else if (tipo === 'vf') {
    var vC = ex.resposta === 'V';
    optionsHtml = '<div class="qz-options">'
      + '<button class="qz-opt" data-correct="' + vC + '" onclick="qzCheckMC(' + q + ',' + vC + ',this)"><span class="qz-opt-letter">V</span> Verdadeiro</button>'
      + '<button class="qz-opt" data-correct="' + (!vC) + '" onclick="qzCheckMC(' + q + ',' + (!vC) + ',this)"><span class="qz-opt-letter">F</span> Falso</button>'
      + '</div>';
  } else {
    // mc or cap4 format
    var opcoes = ex.opcoes || ex.opts || [];
    var resposta = ex.resposta || ex.c;
    optionsHtml = '<div class="qz-options">';
    opcoes.forEach(function(opt, k) {
      var optText = typeof opt === 'string' ? opt : String(opt);
      // Remove leading "A) " style prefixes from cap4 format
      var displayText = optText.replace(/^[A-D]\)\s*/, '');
      var isC;
      if (typeof resposta === 'string' && resposta.length === 1 && 'ABCD'.includes(resposta)) {
        isC = (labels[k] === resposta);
      } else {
        isC = (opt === resposta);
      }
      optionsHtml += '<button class="qz-opt" data-correct="' + isC + '" onclick="qzCheckMC(' + q + ',' + isC + ',this)">'
        + '<span class="qz-opt-letter">' + labels[k] + '</span>'
        + ((typeof formatMath === 'function') ? formatMath(displayText) : displayText)
        + '</button>';
    });
    optionsHtml += '</div>';
  }

  var html = '<div class="qz-wrap">'
    + '<div class="qz-topbar">'
    +   '<div class="qz-progress-track"><div class="qz-progress-fill" id="' + cid + '-prog" style="width:' + pct + '%"></div></div>'
    +   '<span class="qz-counter">' + cur + ' / ' + total + '</span>'
    +   '<span class="qz-score-live" id="' + cid + '-scorelive">✓ ' + st.score.correct + '</span>'
    + '</div>'
    + '<div class="qz-card" id="' + cid + '-card">'
    +   '<div class="qz-q-num">Questão ' + cur + (tema ? ' · ' + tema : '') + '</div>'
    +   visual
    +   '<div class="qz-q-text">' + enun + '</div>'
    +   optionsHtml
    +   '<div class="qz-feedback" id="' + cid + '-fb"></div>'
    +   '<div class="qz-next-row">'
    +     '<div id="' + cid + '-expl-store" style="display:none">' + (ex.expl || '').replace(/'/g,"&#39;") + '</div>'
    +     '<button class="qz-next-btn" id="' + cid + '-next" onclick="qzNext(' + q + ')">'
    +       (cur < total ? 'Próxima <i class="ph ph-arrow-right"></i>' : 'Ver resultados <i class="ph ph-check-circle"></i>')
    +     '</button>'
    +   '</div>'
    + '</div>'
    + '</div>';

  c.innerHTML = html;
  st.answered = false;

  // Focus fill input and add Enter key handler
  var fi = document.getElementById(cid + '-fill');
  if (fi) {
    setTimeout(function(){ fi.focus(); }, 200);
    fi.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var resp = parseFloat(fi.dataset.resp);
        var userVal = parseFloat(fi.value.replace(',','.'));
        if (!isNaN(userVal)) qzCheckFillDirect(cid, userVal, resp);
      }
    });
  }
}

function _qzShowFeedback(cid, correct, correctVal) {
  var st = _qzState[cid];
  if (!st || st.answered) return;
  st.answered = true;
  st.score.total++;
  if (correct) st.score.correct++;

  // Update live score
  var sl = document.getElementById(cid + '-scorelive');
  if (sl) sl.textContent = '✓ ' + st.score.correct;

  // Build feedback
  var expl = (document.getElementById(cid + '-expl-store') || {}).textContent || '';
  var fb = document.getElementById(cid + '-fb');
  if (fb) {
    fb.className = 'qz-feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
    fb.innerHTML = makeFeedbackHTML(correct, expl || '', correctVal, undefined);
  }

  // Show next button
  var nb = document.getElementById(cid + '-next');
  if (nb) nb.classList.add('visible');

  // Log to error tracker + progress system
  var ex = st.exercises[st.current];
  var sec = st.sec || '';
  // Determine cap number from sec or exercise
  var capNum = '1';
  if (ex && (ex._capId || ex.capId)) {
    capNum = String(ex._capId || ex.capId).replace('cap','');
  } else if (sec.indexOf('2') !== -1) { capNum = '2'; }
  else if (sec.indexOf('3') !== -1) { capNum = '3'; }
  else if (sec.indexOf('4') !== -1 || sec.indexOf('mini') !== -1 || sec === 't4') { capNum = '4'; }

  // ErrorTracker
  if (ex && typeof ErrorTracker !== 'undefined') {
    var capId = 'cap' + capNum;
    var secShort = sec.replace(/[0-9]/g,'') || 'q';
    _etRecord(capId, secShort, cid + '-' + st.current, ex.enun || ex.en || '', correct);
  }

  // Map sec to section label used by progLog
  var secLabel = sec === 'q' || sec === 'q2' || sec === 'q3' || sec === 'q4' ? 'questoes'
    : sec === 'm' || sec === 'm2' || sec === 'm3' || (sec && sec.indexOf('mini') !== -1) ? 'minitestes'
    : 'teste';

  // Cap-specific progLog
  if (capNum === '1' && typeof progLog === 'function') {
    progLog(secLabel, correct);
  } else if (capNum === '2' && typeof progLog2 === 'function') {
    progLog2(secLabel, correct);
  } else if (capNum === '3' && typeof progLog3 === 'function') {
    progLog3(secLabel, correct);
  } else if (capNum === '4' && typeof saveProgData4 === 'function') {
    // Cap4 uses a different system — save score object
    var p4key = sec || 'q4';
    saveProgData4(p4key, st.score);
  }

  // ProgressManager (global XP/streak system)
  if (typeof ProgressManager !== 'undefined') {
    var pmCap = 'cap' + capNum;
    _pmRecord(pmCap, 'quiz', {pontuacao: st.score.correct, total: st.score.total});
  }
}

function qzCheckMC(cid, isCorrect, btn) {
  var st = _qzState[cid];
  if (!st || st.answered) return;
  var card = document.getElementById(cid + '-card');
  if (card) card.querySelectorAll('.qz-opt').forEach(function(b){ b.disabled = true; });
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  // Highlight the correct one if wrong
  if (!isCorrect && card) {
    card.querySelectorAll('.qz-opt').forEach(function(b){
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }
  _qzShowFeedback(cid, isCorrect);
}

function qzCheckFillDirect(cid, userRaw, correctVal) {
  var st = _qzState[cid];
  if (!st || st.answered) return;
  var inp = document.getElementById(cid + '-fill');
  if (!inp) return;
  var userVal = typeof userRaw === 'number' ? userRaw : parseFloat(String(userRaw).replace(',','.'));
  if (isNaN(userVal)) { if (typeof eduToast === 'function') eduToast('Introduz um número!','warn'); return; }
  inp.disabled = true;
  var correct = Math.abs(userVal - correctVal) < 0.001;
  inp.classList.add(correct ? 'correct' : 'wrong');
  _qzShowFeedback(cid, correct, correctVal);
}

function qzNext(cid) {
  var st = _qzState[cid];
  if (!st) return;
  var card = document.getElementById(cid + '-card');
  if (card) {
    card.classList.add('leave');
    setTimeout(function(){
      st.current++;
      if (st.current >= st.exercises.length) {
        _qzShowResults(cid);
      } else {
        _qzRender(cid);
      }
    }, 220);
  } else {
    st.current++;
    if (st.current >= st.exercises.length) _qzShowResults(cid);
    else _qzRender(cid);
  }
}

function _qzShowResults(cid) {
  var c = document.getElementById(cid);
  if (!c) return;
  var st = _qzState[cid];
  var correct = st.score.correct;
  var total   = st.score.total || st.exercises.length;
  var pct = total > 0 ? Math.round(correct/total*100) : 0;
  var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '💪';
  var msg   = pct >= 90 ? 'Excelente!' : pct >= 70 ? 'Muito bom!' : pct >= 50 ? 'Bom trabalho!' : 'Continua a praticar!';
  var sub   = correct + ' corretas em ' + total + ' questões';

  c.innerHTML = '<div class="qz-results">'
    + '<span class="qz-results-emoji">' + emoji + '</span>'
    + '<div class="qz-results-title">' + msg + '</div>'
    + '<div class="qz-results-pct">' + pct + '%</div>'
    + '<div class="qz-results-sub">' + sub + '</div>'
    + '<div class="qz-results-actions">'
    +   '<button class="btn btn-primary" onclick="_qzRestart(\'' + cid + '\')">'
    +     '<i class="ph ph-arrow-counter-clockwise"></i>'
    +     ' Repetir'
    +   '</button>'
    + '</div>'
    + '</div>';

  if (st.onFinish) st.onFinish(correct, total);
}

function _qzRestart(cid) {
  var st = _qzState[cid];
  if (!st) return;
  // Shuffle exercises and restart
  st.exercises = st.exercises.sort(function(){ return Math.random() - .5; });
  st.current = 0;
  st.score = { correct: 0, total: 0 };
  st.answered = false;
  _qzRender(cid);
}

/* ── Block 5 (from line 14597) ── */
// FEATURE: TEMPORIZADOR POMODORO
(function() {
  var MODES = { focus: 25*60, short: 5*60, long: 15*60 };
  var MODE_LABELS = { focus: 'Sessão', short: 'Pausa curta', long: 'Pausa longa' };
  var _mode = 'focus';
  var _timeLeft = MODES.focus;
  var _pomAC = null;
  var _totalTime = MODES.focus;
  var _running = false;
  var _timer = null;
  var _session = 0; // 0-indexed completed sessions
  var _totalSessions = 4;
  var _panelOpen = false;

  var CIRC = 2 * Math.PI * 44; // 276.46

  function _fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function _updateUI() {
    var pct = (_totalTime - _timeLeft) / _totalTime;
    var el = document.getElementById('pom-time');
    var ring = document.getElementById('pom-ring');
    var lbl = document.getElementById('pom-session-label');
    var btn = document.getElementById('pom-start-btn');
    if (el) el.textContent = _fmt(_timeLeft);
    if (ring) {
      ring.style.strokeDashoffset = CIRC * (1 - pct);
      ring.className = 'pom-ring-fill' + (_mode === 'short' ? ' break' : _mode === 'long' ? ' long' : '');
    }
    if (lbl) {
      lbl.textContent = _mode === 'focus'
        ? ('Sessão ' + (_session + 1) + ' de ' + _totalSessions)
        : MODE_LABELS[_mode];
    }
    if (btn) btn.textContent = _running ? '⏸ Pausar' : '▶ ' + (_timeLeft < _totalTime ? 'Continuar' : 'Iniciar');
    if (el) el.className = 'pom-time-text' + (_running ? ' running' : '');
    // Dots
    for (var i = 0; i < _totalSessions; i++) {
      var d = document.getElementById('pom-d' + i);
      if (d) d.className = 'pom-dot' + (i < _session ? ' done' : '');
    }
    // FAB state
    var fab = document.getElementById('pomodoro-fab');
    if (fab) fab.className = _running ? 'active' : '';
  }

  function _tick() {
    if (_timeLeft <= 0) {
      _running = false;
      clearInterval(_timer);
      _timer = null;
      // Sound: short beep via singleton AudioContext
      try {
        if (!_pomAC) { _pomAC = new (window.AudioContext || window.webkitAudioContext)(); }
        var ctx = _pomAC;
        if (ctx.state === 'suspended') { ctx.resume(); }
        [0, 200, 400].forEach(function(delay) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = delay === 400 ? 660 : 440;
          gain.gain.setValueAtTime(0.3, ctx.currentTime + delay/1000);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay/1000 + 0.4);
          osc.start(ctx.currentTime + delay/1000);
          osc.stop(ctx.currentTime + delay/1000 + 0.5);
        });
      } catch(e) {}
      // Advance session if focus
      if (_mode === 'focus') {
        _session = Math.min(_session + 1, _totalSessions);
        if (_session >= _totalSessions) { _session = 0; }
      }
      // Auto-switch mode suggestion
      if (_mode === 'focus') {
        pomodoroSetMode(_session % 4 === 0 ? 'long' : 'short');
      } else {
        pomodoroSetMode('focus');
      }
      eduToast(_mode === 'focus' ? '🍅 Foco terminado! Faz uma pausa.' : '✅ Pausa terminada! Vamos estudar.', 'success');
      _updateUI();
      return;
    }
    _timeLeft--;
    _updateUI();
  }

  window.pomodoroTogglePanel = function() {
    _panelOpen = !_panelOpen;
    var w = document.getElementById('pomodoro-widget');
    if (w) w.className = _panelOpen ? '' : 'hidden';
    // Suspend AudioContext when panel is hidden to avoid background policy warnings
    if (!_panelOpen && _pomAC && _pomAC.state === 'running') {
      try { _pomAC.suspend(); } catch(e) {}
    }
    _updateUI();
  };

  window.pomodoroSetMode = function(mode) {
    _running = false;
    if (_timer) { clearInterval(_timer); _timer = null; }
    _mode = mode;
    _totalTime = MODES[mode];
    _timeLeft = MODES[mode];
    ['focus','short','long'].forEach(function(m) {
      var b = document.getElementById('pom-btn-' + m);
      if (b) b.className = 'pom-mode-btn' + (m === mode ? ' active' : '');
    });
    _updateUI();
  };

  window.pomodoroStartStop = function() {
    if (_running) {
      _running = false;
      clearInterval(_timer); _timer = null;
    } else {
      _running = true;
      _timer = setInterval(_tick, 1000);
    }
    _updateUI();
  };

  window.pomodoroReset = function() {
    _running = false;
    if (_timer) { clearInterval(_timer); _timer = null; }
    _timeLeft = _totalTime;
    _updateUI();
  };

  // Release AudioContext when page is unloaded
  window.addEventListener('pagehide', function() {
    if (_pomAC) { try { _pomAC.close(); } catch(e) {} _pomAC = null; }
  });

  // Init
  _updateUI();
})();

/* ── Block 8 (from line 16825) ── */
/* ── Floating math symbols ── */
(function() {
  var symbols = [
    '+', '−', '×', '÷', '=', '<', '>',
    '²', '³', '√', 'π', '½', '¼', '⅓',
    '∞', '∑', '∈', '≤', '≥', '≠',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '%', '(', ')'
  ];
  var sizes  = [11, 13, 15, 18, 22, 14, 16];
  var speeds = [18, 22, 28, 34, 40, 26, 32];
  var cols   = [
    'rgba(81,104,96,.18)',  'rgba(119,153,142,.15)',
    'rgba(171,151,144,.15)','rgba(81,104,96,.12)',
    'rgba(119,153,142,.12)','rgba(77,77,77,.1)'
  ];

  function spawn() {
    var el = document.createElement('span');
    el.className = 'math-float';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    var size  = sizes[Math.floor(Math.random() * sizes.length)];
    var speed = speeds[Math.floor(Math.random() * speeds.length)];
    var col   = cols[Math.floor(Math.random() * cols.length)];
    var left  = Math.random() * 98;
    var delay = Math.random() * speed;
    el.style.cssText = [
      'left:' + left + 'vw',
      'bottom:-40px',
      'font-size:' + size + 'px',
      'color:' + col,
      'animation-duration:' + speed + 's',
      'animation-delay:-' + delay + 's',
    ].join(';');
    document.body.appendChild(el);
    // Remove after one cycle to avoid DOM bloat
    setTimeout(function() { el.remove(); }, (speed + delay) * 1000);
  }

  // Initial batch
  for (var i = 0; i < 20; i++) { spawn(); }
  // Keep spawning; pause when tab is hidden to save CPU/battery
  var _floatInterval = setInterval(spawn, 1800);
  document.addEventListener('visibilitychange', function(){
    if(document.hidden){
      clearInterval(_floatInterval);
      _floatInterval = null;
      document.body.classList.add('tab-hidden');    // Melhoria 7: pause all CSS animations
    } else if (!_floatInterval) {
      _floatInterval = setInterval(spawn, 1800);
      document.body.classList.remove('tab-hidden'); // Melhoria 7: resume CSS animations
    }
  });
})();

/* ── Block 9 (from line 16882) ── */
// MELHORIA 1 — Enter para verificar em qualquer fill-input
// MELHORIA 2 — Vírgula → ponto (padrão PT) em fill-inputs
(function() {
  // Delegate: Enter on any .fill-input triggers adjacent verify button
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    var inp = e.target;
    if (!inp || !inp.classList || !inp.classList.contains('fill-input')) return;
    e.preventDefault();
    // Find the nearest .check-btn sibling or parent-sibling
    var parent = inp.parentElement;
    if (!parent) return;
    var btn = parent.querySelector('.check-btn');
    if (!btn) {
      // Try one level up (some layouts wrap in an extra div)
      parent = parent.parentElement;
      if (parent) btn = parent.querySelector('.check-btn');
    }
    if (btn && !btn.disabled) btn.click();
  });

  // Delegate: comma → dot in any .fill-input while typing
  document.addEventListener('input', function(e) {
    var inp = e.target;
    if (!inp || !inp.classList || !inp.classList.contains('fill-input')) return;
    // Only for text-type inputs (number inputs reject commas natively but silently)
    if (inp.type === 'text' || inp.type === '') {
      var pos = inp.selectionStart;
      var had = inp.value.indexOf(',');
      if (had !== -1) {
        inp.value = inp.value.replace(/,/g, '.');
        // Restore cursor position (comma replaced 1:1 so position unchanged)
        try { inp.setSelectionRange(pos, pos); } catch(_) {}
      }
    }
  });

  // On keypress: intercept comma key on number inputs before browser drops it
  document.addEventListener('keypress', function(e) {
    var inp = e.target;
    if (!inp || !inp.classList || !inp.classList.contains('fill-input')) return;
    if (inp.type === 'number' && (e.key === ',' || e.charCode === 44)) {
      e.preventDefault();
      // Insert a dot at caret position
      var start = inp.selectionStart, end = inp.selectionEnd;
      var val = inp.value;
      // Only allow one decimal point
      if (val.indexOf('.') === -1) {
        inp.value = val.slice(0, start) + '.' + val.slice(end);
        inp.setSelectionRange(start + 1, start + 1);
      }
    }
  });
})();

/* ── Block 3 (from line 10040) ── */
// SHARED SAFE MATH EVALUATOR (no Function / eval)
// Used by calcExpression() and _j24Solve()
window._mathEval = function(expr) {
  // Normalise common typographic characters
  var src = String(expr)
    .replace(/\u2212/g, '-')   // unicode minus
    .replace(/\u00d7/g, '*')   // ×
    .replace(/\u00f7/g, '/')   // ÷
    .replace(/\^/g, '**')      // exponentiation (handled in parsePow)
    .replace(/\s+/g, '');
  if (!src) return NaN;
  var pos = 0;
  function peek() { return src[pos]; }
  function consume() { return src[pos++]; }
  function parseExpr() { return parseAddSub(); }
  function parseAddSub() {
    var left = parseMulDiv();
    while (pos < src.length && (peek() === '+' || peek() === '-')) {
      var op = consume();
      left = op === '+' ? left + parseMulDiv() : left - parseMulDiv();
    }
    return left;
  }
  function parseMulDiv() {
    var left = parsePow();
    while (pos < src.length && (peek() === '*' || peek() === '/')) {
      var op = consume();
      var right = parsePow();
      if (op === '/' && right === 0) return Infinity;
      left = op === '*' ? left * right : left / right;
    }
    return left;
  }
  function parsePow() {
    var base = parseUnary();
    // handle ** (two chars)
    if (pos < src.length - 1 && src[pos] === '*' && src[pos+1] === '*') {
      pos += 2;
      var exp = parseUnary();
      return Math.pow(base, exp);
    }
    return base;
  }
  function parseUnary() {
    if (peek() === '-') { consume(); return -parseUnary(); }
    if (peek() === '+') { consume(); return  parseUnary(); }
    return parsePrimary();
  }
  function parsePrimary() {
    if (peek() === '(') {
      consume();
      var val = parseExpr();
      if (peek() === ')') consume();
      return val;
    }
    var start = pos;
    while (pos < src.length && /[\d.]/.test(peek())) consume();
    if (pos === start) return NaN; // unrecognised char
    return parseFloat(src.slice(start, pos));
  }
  try {
    var result = parseExpr();
    return (pos === src.length && isFinite(result)) ? result : NaN;
  } catch(e) { return NaN; }
};

// 1. MODO ESCURO
(function(){
  var KEY = 'edupt_dark';
  var _on = false;
  try { _on = localStorage.getItem(KEY) === '1'; } catch(e){}

  function apply(on) {
    _on = on;
    document.body.classList.toggle('dark-mode', on);
    var btn = document.getElementById('dark-toggle');
    if (btn) btn.classList.toggle('active', on);
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch(e){}
  }

  window.darkToggle = function() { apply(!_on); };

  // Apply on load
  if (_on) document.body.classList.add('dark-mode');

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('dark-toggle');
    if (btn && _on) btn.classList.add('active');
  });
})();

// 2. TAMANHO DE TEXTO
(function(){
  var KEY = 'edupt_fontsize';
  var SIZES = [88, 94, 100, 107, 115];
  var LABELS = ['XS','S','M','G','XG'];
  var _idx = 2;
  try { var s = parseInt(localStorage.getItem(KEY)); if (s >= 0 && s < SIZES.length) _idx = s; } catch(e){}

  function apply() {
    document.documentElement.style.fontSize = SIZES[_idx] + '%';
    var lbl = document.getElementById('fsc-label');
    if (lbl) lbl.textContent = LABELS[_idx];
    try { localStorage.setItem(KEY, _idx); } catch(e){}
  }

  window.fontSizeDec = function() { if (_idx > 0) { _idx--; apply(); } };
  window.fontSizeInc = function() { if (_idx < SIZES.length - 1) { _idx++; apply(); } };
  apply();
})();

// 4. NOTAS PESSOAIS
(function(){
  var KEY_PREFIX = 'edupt_notes_';

  function saveNote(capId, text) {
    try { localStorage.setItem(KEY_PREFIX + capId, text); } catch(e){}
  }
  function loadNote(capId) {
    try { return localStorage.getItem(KEY_PREFIX + capId) || ''; } catch(e){ return ''; }
  }
  function fmtDate(ts) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('pt-PT', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
  }
  function exportNote(capId, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notas_' + capId + '.txt';
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
  }

  // Build a notes block for a given capId and insert it into a container
  function buildNotesBlock(capId, container) {
    if (container.querySelector('.notes-block')) return;
    var saved = loadNote(capId);
    var block = document.createElement('div');
    block.className = 'notes-block' + (saved ? ' open' : '');
    var savedTs = '';
    try { savedTs = localStorage.getItem(KEY_PREFIX + capId + '_ts') || ''; } catch(e){}

    block.innerHTML = '<button class="notes-header" onclick="notesToggle(this.closest(\'.notes-block\'))">'
      + '<span class="nh-icon">📝</span>'
      + '<span class="nh-label">As minhas notas</span>'
      + (saved ? '<span style="font-size:.65rem;color:var(--c2-mid);font-weight:700">● Guardado</span>' : '')
      + '<span class="nh-chevron">▾</span>'
      + '</button>'
      + '<div class="notes-body">'
      + '<textarea class="notes-textarea" placeholder="Escreve aqui as tuas notas, resumos, fórmulas importantes…" data-cap="' + capId + '"></textarea>'
      + '<div class="notes-footer">'
      + '<span class="notes-meta" id="notes-meta-' + capId + '">' + (savedTs ? 'Guardado: ' + fmtDate(parseInt(savedTs)) : 'Não guardado') + '</span>'
      + '<div class="notes-actions">'
      + '<button class="notes-act-btn" onclick="notesExport(\'' + capId + '\')">↓ Exportar .txt</button>'
      + '<button class="notes-act-btn save" onclick="notesSave(\'' + capId + '\')">Guardar</button>'
      + '</div>'
      + '</div>'
      + '</div>';

    container.appendChild(block);

    // Set textarea value safely (avoids innerHTML injection issues with quotes/special chars)
    var ta = block.querySelector('.notes-textarea');
    if (ta && saved) ta.value = saved;
    if (ta) {
      var _notesSaveTimer = null;
      ta.addEventListener('input', function() {
        // Update meta immediately so user sees "A guardar…"
        var meta = document.getElementById('notes-meta-' + capId);
        if (meta) meta.textContent = 'A guardar…';
        block.classList.add('open');
        // Debounce: only write to localStorage 800ms after user stops typing
        clearTimeout(_notesSaveTimer);
        _notesSaveTimer = setTimeout(function() {
          saveNote(capId, ta.value);
          try { localStorage.setItem(KEY_PREFIX + capId + '_ts', Date.now()); } catch(e){}
          if (meta) meta.textContent = 'Guardado: agora';
        }, 800);
      });
    }
  }

  window.notesToggle = function(block) { block.classList.toggle('open'); };

  window.notesSave = function(capId) {
    var ta = document.querySelector('.notes-textarea[data-cap="' + capId + '"]');
    if (!ta) return;
    saveNote(capId, ta.value);
    var ts = Date.now();
    try { localStorage.setItem(KEY_PREFIX + capId + '_ts', ts); } catch(e){}
    var meta = document.getElementById('notes-meta-' + capId);
    if (meta) meta.textContent = 'Guardado: ' + fmtDate(ts);
    eduToast('📝 Notas guardadas!', 'success');
  };

  window.notesExport = function(capId) {
    var ta = document.querySelector('.notes-textarea[data-cap="' + capId + '"]');
    var text = ta ? ta.value : loadNote(capId);
    if (!text.trim()) { eduToast('Sem notas para exportar.', 'warn'); return; }
    exportNote(capId, text);
  };

  // Inject notes blocks at the end of each teoria section
  function injectNotes() {
    var targets = [
      { id: 'sec-teoria',  capId: 'cap1' },
      { id: 'sec-teoria2', capId: 'cap2' },
      { id: 'sec-teoria3', capId: 'cap3' },
      { id: 'sec-teoria4', capId: 'cap4' }
    ];
    targets.forEach(function(t) {
      var sec = document.getElementById(t.id);
      if (sec) buildNotesBlock(t.capId, sec);
    });
  }

  document.addEventListener('DOMContentLoaded', injectNotes);
})();

// 6. CALCULADORA CIENTÍFICA
(function(){
  var _expr = '';
  var _result = '0';
  var _newNum = true;

  function _update() {
    var er = document.getElementById('calc-fab-expr');
    var rr = document.getElementById('calc-result');
    if (er) er.textContent = _expr;
    if (rr) rr.textContent = _result;
  }

  function _safeEval(expr) {
    var r = window._mathEval(expr.replace(/×/g,'*').replace(/÷/g,'/'));
    if (isNaN(r) || !isFinite(r)) return 'Erro';
    return parseFloat(r.toPrecision(10)).toString();
  }

  window.calcNum = function(n) {
    if (_newNum && n !== '.') { _expr += n; _newNum = false; }
    else { _expr += n; }
    _result = _safeEval(_expr) === 'Erro' ? _result : _safeEval(_expr);
    _update();
  };

  window.calcOp = function(op) {
    _newNum = false;
    // Remove trailing operator if any
    _expr = _expr.replace(/[\+\-\*\/]$/, '');
    if (_expr === '' && op === '-') { _expr = '-'; }
    else if (_expr !== '') { _expr += op; }
    _update();
  };

  window.calcEq = function() {
    var r = _safeEval(_expr);
    if (r !== 'Erro') {
      _expr = r;
      _result = r;
      _newNum = true;
    } else {
      _result = 'Erro';
    }
    _update();
  };

  window.calcFn = function(fn) {
    var cur = parseFloat(_safeEval(_expr));
    if (fn === 'pi') {
      var pi = parseFloat(Math.PI.toPrecision(10)).toString();
      _expr = (_newNum ? '' : _expr) + pi; _result = pi; _newNum = false;
      _update(); return;
    }
    if (isNaN(cur)) return;
    var r;
    if      (fn === 'sqrt') { r = cur >= 0 ? Math.sqrt(cur) : 'Erro'; }
    else if (fn === 'sq')   { r = cur * cur; }
    else if (fn === 'inv')  { r = cur !== 0 ? 1/cur : 'Erro'; }
    else if (fn === 'pct')  { r = cur / 100; }
    else if (fn === 'pm')   { r = -cur; }
    else if (fn === 'abs')  { r = Math.abs(cur); }
    else if (fn === 'sin')  { r = parseFloat(Math.sin(cur * Math.PI / 180).toPrecision(10)); }
    else if (fn === 'cos')  { r = parseFloat(Math.cos(cur * Math.PI / 180).toPrecision(10)); }
    else if (fn === 'tan')  { r = Math.abs(Math.cos(cur * Math.PI / 180)) < 1e-10 ? 'Erro' : parseFloat(Math.tan(cur * Math.PI / 180).toPrecision(10)); }
    else if (fn === 'log')  { r = cur > 0 ? parseFloat(Math.log10(cur).toPrecision(10)) : 'Erro'; }
    else if (fn === 'ln')   { r = cur > 0 ? parseFloat(Math.log(cur).toPrecision(10)) : 'Erro'; }
    if (r === undefined || r === 'Erro' || typeof r !== 'number') { _result = 'Erro'; _update(); return; }
    r = parseFloat(r.toPrecision(10)).toString();
    _expr = r; _result = r; _newNum = true;
    _update();
  };

  window.calcDel = function() {
    _expr = _expr.slice(0, -1);
    _result = _expr ? (_safeEval(_expr) !== 'Erro' ? _safeEval(_expr) : _result) : '0';
    _update();
  };

  window.calcClear = function() { _expr = ''; _result = '0'; _newNum = true; _update(); };

  window.calcToggle = function() {
    var w = document.getElementById('calc-widget');
    if (w) w.classList.toggle('open');
  };

  // Close calc when clicking outside
  document.addEventListener('click', function(e) {
    var w = document.getElementById('calc-widget');
    var fab = document.getElementById('calc-fab');
    if (w && w.classList.contains('open') && !w.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
      w.classList.remove('open');
    }
  });

  // Keyboard support when calc is open
  document.addEventListener('keydown', function(e) {
    var w = document.getElementById('calc-widget');
    if (!w || !w.classList.contains('open')) return;
    if (document.activeElement && ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    if ('0123456789.'.includes(e.key)) calcNum(e.key);
    else if (e.key === '+') calcOp('+');
    else if (e.key === '-') calcOp('-');
    else if (e.key === '*') calcOp('*');
    else if (e.key === '/') { e.preventDefault(); calcOp('/'); }
    else if (e.key === 'Enter' || e.key === '=') calcEq();
    else if (e.key === 'Backspace') calcDel();
    else if (e.key === 'Escape') {
      w.classList.remove('open');
    }
  });
})();

// 7. TOOLTIPS DE FÓRMULAS
(function(){
  // Map of keyword → dica
  var TIPS = {
    'A = b × h': '💡 Base vezes altura — só funciona em retângulos e paralelogramos!',
    'A = (b × h) / 2': '💡 Triângulo: metade do paralelogramo equivalente.',
    '(b₁ + b₂)': '💡 Trapézio: soma das bases paralelas, dividida por 2, vezes a altura.',
    'π': '💡 π ≈ 3,14159… — número irracional, constante para todos os círculos.',
    'A = π × r²': '💡 Área do círculo. Raio ao quadrado, multiplicado por π.',
    'C = 2 × π × r': '💡 Comprimento da circunferência. Também: C = π × d.',
    'mmc': '💡 Mínimo múltiplo comum: o menor número divisível pelos dois.',
    'mdc': '💡 Máximo divisor comum: o maior número que divide os dois exatamente.',
    'a/b': '💡 Para dividir frações: multiplica pelo inverso da 2.ª fração.',
    'potência': '💡 aⁿ = a × a × … (n vezes). a⁰ = 1 sempre (exceto 0⁰).',
    'raiz': '💡 √a é o número que, elevado ao quadrado, dá a.',
    'média': '💡 Soma de todos os valores ÷ número de valores.',
    'percentagem': '💡 x% de y = (x × y) / 100',
    '%': '💡 x% de y = (x × y) / 100',
    'proporcional': '💡 Grandezas diretamente proporcionais: razão constante. Inversamente: produto constante.',
  };

  function findTip(text) {
    for (var key in TIPS) {
      if (text.toLowerCase().includes(key.toLowerCase())) return TIPS[key];
    }
    return '💡 Passa o rato para rever esta fórmula com atenção.';
  }

  function wrapFormulas() {
    document.querySelectorAll('.formula, .highlight-box').forEach(function(el) {
      if (el.classList.contains('formula-tip-wrap') || el.closest('.formula-tip-wrap')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'formula-tip-wrap';
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      var tip = document.createElement('div');
      tip.className = 'ftip';
      tip.textContent = findTip(el.textContent);
      wrapper.appendChild(tip);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    wrapFormulas();
    // Also wrap on navigation (dynamic sections) — debounced to avoid thrashing
    var _wrapTimer = null;
    var obs = new MutationObserver(function(muts) {
      var hasAdded = muts.some(function(m) { return m.addedNodes.length > 0; });
      if (!hasAdded) return;
      clearTimeout(_wrapTimer);
      _wrapTimer = setTimeout(wrapFormulas, 250);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
})();

// INJECT TOPBAR BUTTONS (v33)
(function(){
  function inject() {
    var tr = document.querySelector('.topbar-right');
    if (!tr || document.getElementById('dark-toggle')) return;

    // 1. Dark mode
    var darkBtn = document.createElement('button');
    darkBtn.id = 'dark-toggle';
    darkBtn.className = 'v33-tbtn';
    darkBtn.title = 'Modo escuro';
    darkBtn.onclick = darkToggle;
    darkBtn.innerHTML = '<i class="ph ph-moon"></i> Escuro';

    // 2. Font size
    var fsDiv = document.createElement('div');
    fsDiv.id = 'font-size-controls';
    fsDiv.innerHTML = '<button class="fsc-btn" onclick="fontSizeDec()" title="Diminuir texto" style="font-size:.82rem">A−</button>'
      + '<span class="fsc-label" id="fsc-label">M</span>'
      + '<button class="fsc-btn" onclick="fontSizeInc()" title="Aumentar texto" style="font-size:1rem">A+</button>';

    // Insert all before status pill
    var pill = tr.querySelector('.status-pill');
    [darkBtn, fsDiv].forEach(function(el) {
      if (pill) tr.insertBefore(el, pill);
      else tr.appendChild(el);
    });

    // Apply dark if already saved
    if (document.body.classList.contains('dark-mode')) darkBtn.classList.add('active');
    // Re-apply font size now that fsc-label is in the DOM
    if (typeof fontSizeInc === 'function') {
      var lbl = document.getElementById('fsc-label');
      if (lbl) {
        var LABELS = ['XS','S','M','G','XG'];
        try { var si = parseInt(localStorage.getItem('edupt_fontsize')); if (si>=0&&si<5) lbl.textContent=LABELS[si]; } catch(e){}
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();

// ═══ wrapPrintDoc — HTML document wrapper for printable sheets ═══
function wrapPrintDoc(title, content) {
  return '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>' + title + '</title><style>'
    + 'body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:2rem;color:#2a2724}'
    + 'h1{font-size:1.4rem;border-bottom:2px solid #516860;padding-bottom:.5rem;margin-bottom:1.5rem}'
    + 'h2{font-size:1.1rem;margin-top:2rem;color:#516860}'
    + '.doc-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #516860;padding-bottom:1rem;margin-bottom:1.5rem}'
    + '.doc-brand{font-size:.75rem;font-weight:700;color:#77998E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}'
    + '.doc-title{font-family:"Georgia",serif;font-size:1.2rem;font-weight:700;color:#2a2724}'
    + '.doc-title em{display:block;font-size:.9rem;font-weight:400;color:#666}'
    + '.doc-logo{font-size:2.5rem;font-weight:900;color:#516860;font-family:serif}'
    + '.doc-meta{display:flex;gap:2rem;flex-wrap:wrap;margin-bottom:1.5rem;padding:1rem;background:#f9f5ef;border-radius:8px}'
    + '.doc-meta-item{display:flex;align-items:center;gap:.5rem}'
    + '.doc-meta-label{font-size:.75rem;font-weight:700;color:#666;text-transform:uppercase}'
    + '.doc-meta-line{width:120px;border-bottom:1px solid #999}'
    + '.doc-footer{margin-top:3rem;padding-top:.75rem;border-top:1px solid #ccc;display:flex;justify-content:space-between;font-size:.72rem;color:#999}'
    + '.ex{margin-bottom:1.5rem;padding:1rem;border:1px solid #e0dbd4;border-radius:6px}'
    + '.ex-num{font-weight:700;color:#516860;font-size:.85rem;margin-bottom:.5rem}'
    + '.opcao{margin-left:1rem;margin-top:.25rem;font-size:.9rem}'
    + '.resp-linha{border-bottom:1px solid #999;margin-top:.75rem;min-height:28px}'
    + '.meta{font-size:.82rem;margin-bottom:1.5rem;color:#555}'
    + '.mexp{vertical-align:super;font-size:.7em}'
    + '@media print{body{padding:1rem}}'
    + '</style></head><body>' + content + '</body></html>';
}

// ═══ formatMath: convert fractions and exponents to proper HTML ═══
function formatMath(s) {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') s = String(s);
  if (!s) return s;
  // Fractions: match patterns like -3/4, 2/3, ?/10, 10/? but not dates or URLs
  // Must be: optional sign + (digits or ?) / (digits or ?)
  // Avoid matching things already inside HTML tags
  s = s.replace(/(?<![<\w\/])(-?)(\d+|\?)\/(\d+|\?)(?![>\w])/g, function(match, sign, num, den) {
    return '<span class="mfrac" style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin:0 .1em">'
      + '<span style="border-bottom:1.5px solid currentColor;padding:0 .15em .05em;font-size:.85em;text-align:center">' + sign + num + '</span>'
      + '<span style="padding:.05em .15em 0;font-size:.85em;text-align:center">' + den + '</span>'
      + '</span>';
  });
  // Exponents
  s = s.replace(/([^\s<>^]+)\^\(([^)]+)\)/g, '$1<span class="mexp">($2)</span>');
  s = s.replace(/([^\s<>^]+)\^\?/g, '$1<span class="mexp">?</span>');
  s = s.replace(/([^\s<>^]+)\^(-\d+)/g, '$1<span class="mexp">$2</span>');
  s = s.replace(/([^\s<>^]+)\^(\d+)/g, '$1<span class="mexp">$2</span>');
  return s;
}

// ═══ Step-by-step feedback system (shared across chapters) ═══
var _stepState = {};

function _stepNext(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  state.current++;
  _stepRender(fbId);
}

function _stepRenderAll(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  state.current = state.steps.length - 1;
  _stepRender(fbId);
}

function _stepRender(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  var stepsEl = document.getElementById(fbId + '-steps');
  var btnEl   = document.getElementById(fbId + '-stepbtn');
  var allEl   = document.getElementById(fbId + '-allbtn');
  if (!stepsEl) return;

  var html = '';
  for (var i = 0; i <= state.current; i++) {
    var isNew = (i === state.current && state.current > 0);
    html += '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px' +
      (isNew ? ';animation:stepSlideIn .3s cubic-bezier(.22,1,.36,1)' : '') + '">' +
      '<span style="min-width:24px;height:24px;border-radius:50%;background:' + state.color +
      ';color:#fff;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;flex-shrink:0;margin-top:2px;box-shadow:0 2px 6px rgba(0,0,0,.15)">' +
      (i + 1) + '</span>' +
      '<span style="font-size:.86rem;line-height:1.65;color:#374151;padding-top:2px">' + (typeof formatMath==='function'?formatMath(state.steps[i]):state.steps[i]) + '</span></div>';
  }
  stepsEl.innerHTML = html;

  var done = (state.current >= state.steps.length - 1);
  if (btnEl)  btnEl.style.display  = done ? 'none' : 'inline-flex';
  if (allEl)  allEl.style.display  = done ? 'none' : 'inline-flex';
}

function makeFeedbackHTML(isCorrect, expl, val, fbId) {
  var color       = isCorrect ? '#16a34a' : '#dc2626';
  var bgColor     = isCorrect ? '#f0fdf4' : '#fff1f2';
  var borderColor = isCorrect ? '#bbf7d0' : '#fecaca';
  var accentColor = isCorrect ? '#16a34a' : '#dc2626';

  var status = isCorrect
    ? '✓ Correto!'
    : (val !== undefined && val !== null && val !== ''
        ? '✗ Incorreto — a resposta certa é: <strong style="font-size:1.05em">' + val + '</strong>'
        : '✗ Incorreto.');

  var explHtml = '';
  if (expl) {
    var rawSteps = expl.split(/\\n|\n/).map(function(s){ return s.trim(); }).filter(Boolean);

    if (rawSteps.length <= 1) {
      explHtml = '<div style="margin-top:10px;padding:10px 14px;background:rgba(255,255,255,.85);border-radius:10px;' +
        'border-left:3px solid ' + accentColor + ';font-size:.86rem;line-height:1.65;color:#374151">' +
        '<span style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:' + accentColor + ';display:block;margin-bottom:4px">' +
        (isCorrect ? '💡 Explicação' : '📖 Como resolver') + '</span>' +
        (typeof formatMath==='function'?formatMath(expl):expl) + '</div>';
    } else {
      var id = fbId || ('fb_' + Math.random().toString(36).slice(2,7));
      _stepState[id] = { steps: rawSteps, current: 0, color: accentColor };

      explHtml = '<div style="margin-top:10px;padding:12px 14px;background:rgba(255,255,255,.85);border-radius:10px;' +
        'border-left:3px solid ' + accentColor + '">' +
        '<span style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:' + accentColor + ';display:block;margin-bottom:8px">' +
        '📖 Resolução passo a passo</span>' +
        '<div id="' + id + '-steps"></div>' +
        '<div style="display:flex;gap:.5rem;margin-top:10px;flex-wrap:wrap">' +
        '<button id="' + id + '-stepbtn" onclick="_stepNext(\'' + id + '\')" ' +
          'style="display:inline-flex;align-items:center;gap:6px;background:' + accentColor + ';color:#fff;' +
          'border:none;padding:7px 16px;border-radius:999px;font-family:\'Montserrat\',sans-serif;' +
          'font-size:.78rem;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12)">▶ Próximo passo</button>' +
        '<button id="' + id + '-allbtn" onclick="_stepRenderAll(\'' + id + '\')" ' +
          'style="display:inline-flex;align-items:center;gap:5px;background:transparent;color:' + accentColor + ';' +
          'border:1.5px solid ' + accentColor + ';padding:6px 14px;border-radius:999px;font-family:\'Montserrat\',sans-serif;' +
          'font-size:.75rem;font-weight:600;cursor:pointer">Ver tudo</button>' +
        '</div></div>';

      setTimeout(function(){ _stepRender(id); }, 0);
    }
  }

  var celebrateHtml = isCorrect ? '<div class="fb-confetti" aria-hidden="true"></div>' : '';

  return '<div style="display:flex;align-items:flex-start;gap:12px;padding:14px 18px;' +
    'background:' + bgColor + ';border:2px solid ' + borderColor + ';' +
    'border-radius:14px;position:relative;overflow:hidden;margin-top:1rem">' +
    celebrateHtml +
    '<div style="flex:1">' +
    '<strong style="color:' + color + ';font-size:.95rem;display:block">' + status + '</strong>' +
    explHtml +
    '</div></div>';
}

// ═══ toggleTemaRow — used by topic rows across all chapters ═══
function toggleTemaRow(id) {
  var row = document.getElementById(id);
  if (row) row.classList.toggle('open');
}

// ═══ _buildStQuizHTML — shared quiz HTML builder for subtema modals ═══
function _buildStQuizHTML(exercicios) {
  var labels = ['A','B','C','D'], qhtml = '';
  exercicios.forEach(function(ex, i) {
    var qid = 'stq' + i;
    qhtml += '<div class="quiz-question" id="' + qid + '" style="margin-bottom:1rem">'
      + '<div class="q-number">Questão ' + (i+1) + ' · ' + ex.tema + '</div>'
      + '<div class="q-text">' + formatMath(ex.enun) + '</div>';
    if (ex.tipo === 'fill') {
      qhtml += '<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="' + qid + '-in" placeholder="?" type="text" inputmode="decimal" style="width:100px"><button class="check-btn" onclick="stCheck(\'' + qid + '\',\'fill\',' + ex.resposta + ')">Verificar</button></div>';
    } else if (ex.tipo === 'fill_frac') {
      qhtml += '<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="' + qid + '-in" placeholder="ex: 3/4" type="text" style="width:120px"><button class="check-btn" onclick="stCheck(\'' + qid + '\',\'fill_frac\',\'' + ex.resposta + '\')">Verificar</button></div>';
    } else if (ex.tipo === 'mc') {
      qhtml += '<div class="options">';
      (ex.opcoes||[]).forEach(function(opt, k) { var isC = String(opt)===String(ex.resposta); qhtml += '<button class="option-btn" onclick="stCheck(\'' + qid + '\',\'mc\',' + isC + ',this)"><span class="opt-label">' + labels[k] + '</span>' + formatMath(opt) + '</button>'; });
      qhtml += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta==='V';
      qhtml += '<div style="display:flex;gap:.75rem;flex-wrap:wrap"><button class="option-btn" onclick="stCheck(\'' + qid + '\',\'mc\',' + vC + ',this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" onclick="stCheck(\'' + qid + '\',\'mc\',' + (!vC) + ',this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>';
    }
    qhtml += '<div class="feedback" id="' + qid + '-fb"></div><span id="' + qid + '-expl" style="display:none">' + (ex.expl||'').replace(/'/g,"&#39;") + '</span></div>';
  });
  return qhtml;
}

// ═══ _bancoToSubtemaExs — convert BANCO to subtema exercise list ═══
function _bancoToSubtemaExs(banco, temaNum) {
  var pool = (banco.questoes || []).filter(function(q){ return String(q.tema) === String(temaNum); });
  if (banco.minitestes && banco.minitestes[parseInt(temaNum)]) {
    pool = pool.concat(banco.minitestes[parseInt(temaNum)]);
  }
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  return pool.slice(0, 8).map(function(q, idx) {
    var correct = q.correct || q.c || 'A';
    return {
      num: idx + 1,
      enun: q.enunciado || q.en || q.enun || '',
      opcoes: q.opts || [],
      resposta: correct,
      tipo: 'mc',
      expl: q.fb || ''
    };
  });
}

// ═══ criarModalSubtema — subtema practice modal (shared across chapters) ═══
function criarModalSubtema(titulo, exercicios) {
  var old = document.getElementById('subtema-modal');
  if (old) old.remove();
  var qhtml = _buildStQuizHTML(exercicios);
  var modal = document.createElement('div');
  modal.id = 'subtema-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(28,26,22,.55);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:2rem 1rem;overflow-y:auto';
  modal.innerHTML = '<div style="background:var(--cream);border-radius:20px;max-width:680px;width:100%;box-shadow:var(--shadow-lg);overflow:hidden;animation:pfadeUp .25s ease">'
    + '<div style="background:var(--ink);padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between">'
    + '<div><div style="font-size:.72rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">Prática focada</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;font-weight:700;color:#fff">' + titulo + '</div></div>'
    + '<button onclick="document.getElementById(\'subtema-modal\').remove()" aria-label="Fechar" style="all:unset;cursor:pointer;width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem">&#10005;</button>'
    + '</div>'
    + '<div style="padding:1.5rem" id="subtema-body">' + qhtml + '</div>'
    + '<div style="padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">'
    + '<div class="score-bar" style="flex:1;min-width:200px;margin:0;padding:.6rem 1rem">'
    + '<div><div class="score-num" id="st-score" style="font-size:1.4rem">0</div><div class="score-label">certos</div></div>'
    + '<div><div class="score-num" id="st-total" style="color:var(--ink4);font-size:1.1rem">/ 0</div><div class="score-label">respondidos</div></div>'
    + '<div class="progress-track" style="flex:1"><div class="progress-fill" id="st-prog" style="width:0%"></div></div></div>'
    + '<button class="btn btn-ghost" onclick="stNovas()" style="flex-shrink:0">&#8634; Novas questões</button>'
    + '</div></div>';
  document.body.appendChild(modal);
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
  window._stContext = { titulo: titulo, gerador: null };
}

// ═══ stCheck / stNovas — subtema modal interaction (shared) ═══
var _stAnswered = {};
var _stScore = { correct: 0, total: 0 };

function stCheck(qid, tipo, val, btn) {
  if (_stAnswered[qid]) return;
  _stAnswered[qid] = true;
  var explEl = document.getElementById(qid + '-expl');
  var expl = explEl ? explEl.textContent : '';
  var container = document.getElementById(qid);
  var correct = false;
  if (tipo === 'fill' || tipo === 'fill_frac') {
    var inp = document.getElementById(qid + '-in');
    var uv = inp.value.trim().replace(/\s/g,'');
    if (!uv) { _stAnswered[qid] = false; eduToast('Introduz uma resposta!','warn'); return; }
    inp.disabled = true;
    correct = tipo === 'fill' ? (parseFloat(uv) === val) : (uv === String(val).replace(/\s/g,''));
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(function(b){ b.disabled = true; });
    correct = (val === true || val === 'true');
    if (correct) btn.classList.add('correct');
    else { btn.classList.add('wrong'); container.querySelectorAll('.option-btn').forEach(function(b){ if (b.dataset.correct === 'true') b.classList.add('correct'); }); }
  }
  if (correct) _stScore.correct++;
  _stScore.total++;
  var fb = document.getElementById(qid + '-fb');
  fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.innerHTML = makeFeedbackHTML(correct, expl, tipo==='fill'?val:undefined);
  document.getElementById('st-score').textContent = _stScore.correct;
  document.getElementById('st-total').textContent = '/ ' + _stScore.total;
  document.getElementById('st-prog').style.width = (_stScore.total > 0 ? _stScore.correct/_stScore.total*100 : 0) + '%';
}

function stNovas() {
  if (window._stContext && window._stContext.gerador) {
    _stAnswered = {}; _stScore = { correct: 0, total: 0 };
    document.getElementById('subtema-body').innerHTML = _buildStQuizHTML(window._stContext.gerador());
    document.getElementById('st-score').textContent = '0';
    document.getElementById('st-total').textContent = '/ 0';
    document.getElementById('st-prog').style.width = '0%';
  }
}

// ═══ calcExpression — safe math expression evaluator UI ═══
function calcExpression() {
  var inp = document.getElementById('calc-expr');
  var res = document.getElementById('calc-expr-result');
  if (!inp || !res) return;
  var raw = inp.value.trim();
  if (!raw) { res.textContent = ''; return; }
  try {
    var expr = raw.replace(/\u2212/g, '-').replace(/\^/g, '**');
    if (!/^[\d+\-*/().\s^]+$/.test(expr)) throw new Error('Expressão inválida');
    var val = window._mathEval(expr);
    if (!isFinite(val) || isNaN(val)) throw new Error('Resultado indefinido');
    res.innerHTML = '<span style="color:var(--ink3)">' + raw + '</span> = <strong style="color:var(--c2-deep)">' + val + '</strong>';
    res.style.color = 'var(--c2-deep)';
  } catch(e) {
    res.textContent = '\u26a0 ' + (e.message || 'Expressão inválida');
    res.style.color = 'var(--wrong)';
  }
}

// ═══ QUIZ GAME (qgStartForCap) — arcade quiz for chapter pages ═══
// State for the per-chapter arcade quiz
var _qgCap = { cap: 0, lives: 3, streak: 0, maxStreak: 0, score: 0, total: 0, current: null, answered: false, pool: [] };

function _qgBuildPool(cap) {
  var bancoMap = { 5: window.BANCO5, 6: window.BANCO6, 7: window.BANCO7, 8: window.BANCO8 };
  var banco = bancoMap[cap];
  if (banco) {
    // Prefer relampago (short-form rapid questions), fall back to questoes
    var src = (banco.relampago && banco.relampago.length) ? banco.relampago : banco.questoes;
    return (src || []).map(function(q) {
      // relampago: {q, opts, c (index), fb}
      // questoes:  {enunciado|en, opts, correct|c, fb}
      if (q.opts && q.c !== undefined && typeof q.c === 'number') {
        // relampago format
        return { q: q.q || '', opts: q.opts, ans: q.opts[q.c], fb: q.fb || '' };
      }
      // questoes format — c is a letter like 'B'; find the full option text starting with 'B)'
      var letter = q.correct || q.c || '';
      var opts = q.opts || [];
      var ans = letter;
      if (typeof letter === 'string' && letter.length === 1) {
        for (var oi = 0; oi < opts.length; oi++) {
          if (String(opts[oi]).indexOf(letter + ')') === 0 || String(opts[oi]).indexOf(letter + ' ') === 0) {
            ans = opts[oi]; break;
          }
        }
      }
      return { q: q.enunciado || q.en || '', opts: opts, ans: ans, fb: q.fb || '' };
    });
  }
  // caps 1–4: no pool, will generate procedurally each question
  return null;
}

function _qgBuildQuestion(cap) {
  var pool = _qgCap.pool;
  if (pool && pool.length) {
    var idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
  // Procedural for caps 1–4
  var temas = ['1','2','3','4','5'];
  var tema = temas[Math.floor(Math.random() * temas.length)];
  var ex = null;
  for (var i = 0; i < 10; i++) {
    tema = temas[Math.floor(Math.random() * temas.length)];
    if (cap === 4 && typeof buildEx4 === 'function') ex = buildEx4(tema, 'medio');
    else if (cap === 3 && typeof buildEx3 === 'function') ex = buildEx3(tema, 'mc', 'medio');
    else if (cap === 2 && typeof buildEx2 === 'function') ex = buildEx2(tema, 'mc', 'medio');
    else if (typeof buildExercicio === 'function') ex = buildExercicio(tema, 'mc', -12, 12, 1, 'medio');
    if (ex && ex.tipo === 'mc' && ex.opcoes && ex.opcoes.length >= 2) break;
  }
  if (!ex || !ex.opcoes) return null;
  return { q: ex.enun || '', opts: ex.opcoes, ans: ex.resposta || ex.opcoes[0], fb: ex.expl || '' };
}

function _qgRenderQuestion(appEl) {
  if (_qgCap.lives <= 0) { _qgGameOver(appEl); return; }
  var q = _qgBuildQuestion(_qgCap.cap);
  if (!q) {
    appEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Sem questões disponíveis para este capítulo.</p>';
    return;
  }
  _qgCap.current = q;
  _qgCap.answered = false;
  var livesHtml = '';
  for (var i = 0; i < 3; i++) livesHtml += (i < _qgCap.lives ? '❤️' : '🖤') + ' ';
  var optsHtml = '';
  (q.opts || []).forEach(function(opt, idx) {
    var label = typeof formatMath === 'function' ? formatMath(opt) : opt;
    optsHtml += '<button class="qg-opt-btn" id="_qgopt-' + idx + '" onclick="qgCapAnswer(' + idx + ')">' + label + '</button>';
  });
  var qText = typeof formatMath === 'function' ? formatMath(q.q) : q.q;
  appEl.innerHTML =
    '<div class="qg-hub-bar">' +
      '<div class="qg-hub-lives">' + livesHtml + '</div>' +
      '<div class="qg-hub-streak">' + (_qgCap.streak > 1 ? '🔥 ' + _qgCap.streak + ' seguidas' : '') + '</div>' +
      '<div class="qg-hub-score">✓ ' + _qgCap.score + ' / ' + _qgCap.total + '</div>' +
    '</div>' +
    '<div class="qg-hub-question">' + qText + '</div>' +
    '<div class="qg-hub-opts">' + optsHtml + '</div>' +
    '<div class="qg-hub-feedback" id="_qg-fb" style="min-height:2.5rem"></div>';
}

function qgCapAnswer(idx) {
  if (_qgCap.answered) return;
  _qgCap.answered = true;
  var q = _qgCap.current;
  if (!q) return;
  var chosen = (q.opts || [])[idx];
  var correct = String(chosen) === String(q.ans);
  _qgCap.total++;
  var allBtns = document.querySelectorAll('.qg-opt-btn');
  allBtns.forEach(function(b, i) {
    b.disabled = true;
    if (String((q.opts||[])[i]) === String(q.ans)) { b.style.background = '#4caf50'; b.style.color = '#fff'; }
  });
  var clicked = document.getElementById('_qgopt-' + idx);
  if (clicked && !correct) { clicked.style.background = '#f44336'; clicked.style.color = '#fff'; }
  var fb = document.getElementById('_qg-fb');
  var appEl = document.getElementById('qg-app' + _qgCap.cap);
  if (correct) {
    _qgCap.score++;
    _qgCap.streak++;
    if (_qgCap.streak > _qgCap.maxStreak) _qgCap.maxStreak = _qgCap.streak;
    if (fb) fb.innerHTML = '<span style="color:#4caf50;font-weight:700">✓ Correto!' + (_qgCap.streak >= 3 ? ' 🔥 Streak de ' + _qgCap.streak + '!' : '') + '</span>' + (q.fb ? ' <span style="color:var(--ink3);font-size:.85rem">' + q.fb + '</span>' : '');
  } else {
    _qgCap.lives--;
    _qgCap.streak = 0;
    var ansLabel = typeof formatMath === 'function' ? formatMath(q.ans) : q.ans;
    if (fb) fb.innerHTML = '<span style="color:#f44336;font-weight:700">✗ Errado.</span> A resposta era <strong>' + ansLabel + '</strong>.' + (q.fb ? ' <span style="color:var(--ink3);font-size:.85rem">' + q.fb + '</span>' : '');
  }
  if (_qgCap.lives <= 0) {
    setTimeout(function() { if (appEl) _qgGameOver(appEl); }, 1400);
  } else {
    var btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.cssText = 'margin-top:1rem';
    btn.textContent = 'Próxima →';
    btn.onclick = function() { if (appEl) _qgRenderQuestion(appEl); };
    if (fb) fb.appendChild(btn);
  }
}

function _qgGameOver(appEl) {
  var pct = _qgCap.total > 0 ? Math.round(_qgCap.score / _qgCap.total * 100) : 0;
  var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📚';
  appEl.innerHTML =
    '<div style="text-align:center;padding:2.5rem 1rem">' +
      '<div style="font-size:3.5rem;margin-bottom:.75rem">' + emoji + '</div>' +
      '<div style="font-family:\'Cormorant Garamond\',serif;font-size:2rem;font-weight:900;color:var(--ink)">' + pct + '%</div>' +
      '<div style="color:var(--ink3);margin:.5rem 0 1.5rem">' + _qgCap.score + ' certas em ' + _qgCap.total + ' questões</div>' +
      '<div style="font-size:1.5rem;margin-bottom:1.5rem">Melhor sequência: ' + (_qgCap.maxStreak || 0) + ' 🔥</div>' +
      '<button class="btn btn-primary" onclick="qgStartForCap(' + _qgCap.cap + ')">↺ Jogar novamente</button>' +
    '</div>';
}

function qgStartForCap(cap) {
  var appEl = document.getElementById('qg-app' + cap);
  if (!appEl) return;
  _qgCap.cap = cap;
  _qgCap.lives = 3;
  _qgCap.streak = 0;
  _qgCap.maxStreak = 0;
  _qgCap.score = 0;
  _qgCap.total = 0;
  _qgCap.answered = false;
  _qgCap.pool = _qgBuildPool(cap) || [];
  _qgRenderQuestion(appEl);
}

// ═══ CHAPTER NAV BAR — generated from data ═══
function _buildChapterNav(activeCap) {
  var caps = [
    {n:1, label:'Números Inteiros'},
    {n:2, label:'Números Racionais'},
    {n:3, label:'Geometria'},
    {n:4, label:'Equações'},
    {n:5, label:'Sequências'},
    {n:6, label:'Estatística', locked:true}
  ];
  var h = '<button class="ch-back-link" onclick="showMat7View()">← Capítulos</button><div class="ch-nav-divider"></div>';
  caps.forEach(function(c) {
    if (c.locked) {
      h += '<button class="ch-nav-btn locked" data-target-ch="'+c.n+'" title="Em breve"><span class="ch-progress">○</span> '+c.label+'</button>';
    } else {
      h += '<button class="ch-nav-btn'+(c.n===activeCap?' active':'')+'" data-target-ch="'+c.n+'" onclick="goToChapter('+c.n+')"><span class="ch-progress" id="progress-indicator-'+c.n+'">'+(c.n===activeCap?'●':'○')+'</span> '+c.label+'</button>';
    }
  });
  return h;
}
function _initChapterNav() {
  var nav = document.querySelector('.chapter-nav-bar');
  if (!nav) return;
  var cap = parseInt(nav.dataset.cap) || 1;
  nav.innerHTML = _buildChapterNav(cap);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _initChapterNav);
else _initChapterNav();
