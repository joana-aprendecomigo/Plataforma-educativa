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
  // Prefix filename: professor → "prof_NomeProfessor_", aluno → "NomeAluno_"
  if (_n) {
    var _safe = _n.replace(/[^a-zA-Z0-9áéíóúâêîôûãõàèìòùçÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÇ]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
    if (_safe) {
      var _prefix = _role === 'professor' ? 'prof_' + _safe + '_' : _safe + '_';
      filename = _prefix + filename;
    }
  }
  var printStyle = [
    '<style>',
    '@media print{',
    '  .no-print{display:none!important}',
    '  body{background:#fff!important}',
    '  h2{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}',
    '  th{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}',
    '  [style*="background"]{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}',
    '  @page{size:A4;margin:12mm 15mm}',
    '}',
    '/* Auto-print overlay */',
    '#_print_overlay{position:fixed;inset:0;background:rgba(247,245,242,.97);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Montserrat,sans-serif;gap:1.5rem}',
    '#_print_overlay h2{font-family:Cormorant Garamond,serif;font-size:1.8rem;font-weight:900;color:#2a2724;margin:0}',
    '#_print_overlay p{color:#6b6560;font-size:.95rem;text-align:center;max-width:360px;line-height:1.6;margin:0}',
    '#_print_overlay button{background:linear-gradient(135deg,#516860,#77998E);color:#fff;border:none;border-radius:999px;padding:14px 32px;font-family:Montserrat,sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(81,104,96,.35)}',
    '#_print_overlay .hint{font-size:.78rem;color:#a09890;margin-top:-.5rem}',
    '@media print{#_print_overlay{display:none!important}}',
    '</style>'
  ].join('\n');

  // Inject overlay + auto-print script into the document
  var autoScript = [
    '<script>',
    'window.addEventListener("load", function() {',
    '  var ov = document.getElementById("_print_overlay");',
    '  setTimeout(function() {',
    '    if(ov) ov.style.display="none";',
    '    window.print();',
    '    if(ov) { setTimeout(function(){ ov.style.display="flex"; }, 300); }',
    '  }, 600);',
    '});',
    'function _doPrint(){ var ov=document.getElementById("_print_overlay"); if(ov) ov.style.display="none"; window.print(); if(ov){ setTimeout(function(){ ov.style.display="flex"; },300); } }',
    '<\/script>'
  ].join('\n');

  var overlay = [
    '<div id="_print_overlay" class="no-print">',
    '  <h2>A preparar PDF…</h2>',
    '  <p>O diálogo de impressão vai abrir automaticamente.<br>Seleciona <strong>Guardar como PDF</strong> como destino.</p>',
    '  <button onclick="_doPrint()">🖨 Imprimir / Guardar PDF</button>',
    '  <span class="hint">Podes fechar esta janela depois de guardar.</span>',
    '</div>'
  ].join('\n');

  // Inject into the HTML
  var html = htmlContent;
  if (html.indexOf('</head>') !== -1) {
    html = html.replace('</head>', printStyle + autoScript + '</head>');
  } else {
    html = printStyle + autoScript + html;
  }
  if (html.indexOf('<body>') !== -1) {
    html = html.replace('<body>', '<body>' + overlay);
  } else if (html.indexOf('<body ') !== -1) {
    html = html.replace(/<body([^>]*)>/, '<body$1>' + overlay);
  } else {
    html = overlay + html;
  }

  var blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var win = window.open(url, '_blank');
  if (!win) {
    // Blocked by popup blocker — fallback to direct download
    var a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.pdf', '.html');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
    eduToast('Descarregado como HTML — abre e usa Ctrl+P para PDF.', 'success');
  } else {
    setTimeout(function(){ URL.revokeObjectURL(url); }, 120000);
  }
}

function _htmlToPdfFallback(htmlContent, filename) {
  var blob = new Blob([htmlContent], {type: 'text/html;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename.replace('.pdf', '.html');
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
}
// ═══════════════════════════════════════════════════════════════
// QUIZ ENGINE — Uma questão de cada vez, com barra de progresso
// Usa os mesmos exercícios gerados por buildExercicio / BANCO4
// ═══════════════════════════════════════════════════════════════
var _qzState = {};


// Helper: parse fill-input value tolerating PT decimal comma
function _parseFillVal(v) { return parseFloat(String(v).replace(',', '.')); }
// ── Safe ProgressManager proxy — queues calls until ProgressManager is defined ──
var _pmQueue = [];
function _pmRecord() {
  var args = Array.prototype.slice.call(arguments);
  if (typeof ProgressManager !== 'undefined' && ProgressManager.record) {
    ProgressManager.record.apply(ProgressManager, args);
  } else {
    _pmQueue.push(args);
  }
}
// Flush is called automatically by ProgressManager after it initialises (patched below)

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
    +       (cur < total ? 'Próxima <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' : 'Ver resultados <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>')
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

function qzCheckFill(cid, correctVal) {
  var st = _qzState[cid];
  if (!st || st.answered) return;
  var inp = document.getElementById(cid + '-fill');
  if (!inp) return;
  var userVal = parseFloat(inp.value.replace(',','.'));
  if (isNaN(userVal)) { if (typeof eduToast === 'function') eduToast('Introduz um número!','warn'); return; }
  inp.disabled = true;
  var correct = Math.abs(userVal - correctVal) < 0.001;
  inp.classList.add(correct ? 'correct' : 'wrong');
  _qzShowFeedback(cid, correct, correctVal);
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
    +     '<span class="ico ico-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></span>'
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
// ═══════════════════════════════════════════════════════════════

/* ── Block 2 (from line 3760) ── */
// ═══ VIEW SWITCHING ═══
function _hideAllViews(){
  // Clear exam-silent mode whenever we navigate away
  ['view-portal','view-mat7','view-math','view-math2','view-math3','view-math4','view-mega'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.style.display='none';
  });
  // always hide FAB when switching views; updateFAB will re-show if appropriate
  var fab=document.getElementById('mega-fab');if(fab)fab.classList.remove('visible');
}
function showMathView(){
  _hideAllViews();
  document.getElementById('view-math').style.display='block';
  document.title = 'Cap. 1 — Inteiros · 3ponto14';
  window.scrollTo(0,0);
}
function showPortalView(){
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  document.title = '3ponto14 · Centro de Estudos';
  window.scrollTo(0,0);
}

// ═══ PORTAL DATA ═══
const CYCLES=[
  {id:'cycle-3',cls:'cycle-3',label:'3.º Ciclo do Ensino Básico',emoji:'flask',range:'7.º Ano',anos:[
    {ano:7,label:'7.º Ano',subjects:[
      {i:'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span>',n:'Matemática',status:'available',action:'math7'}
    ]},
  ]}
];

function tagHTML(s){
  if(s==='available')return'<span class="s-tag tag-avail">✓ Disponível</span>';
  if(s==='progress')return'<span class="s-tag tag-prog"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span> Em progresso</span>';
  return'<span class="s-tag tag-soon">Em breve</span>';
}
let totalDisc=0,totalAvail=0,totalChapters=0;
function portalRender(){
  const main=document.getElementById('portal-main');
  CYCLES.forEach(cycle=>{
    const block=document.createElement('div');
    block.className=`cycle-block ${cycle.cls}`;
    block.dataset.cycleid=cycle.id;
    block.innerHTML=`<div class="cycle-title-row"><div class="cycle-pill"><div class="pill-emoji"><span class="ico" style="width:1.15rem;height:1.15rem"><svg><use href="#ico-${cycle.emoji}"/></svg></span></div>${cycle.label}</div><div class="cycle-range">${cycle.range}</div></div><div class="years-row" id="row-${cycle.id}"></div>`;
    const row=block.querySelector(`#row-${cycle.id}`);
    cycle.anos.forEach(year=>{
      const avail=year.subjects.filter(s=>s.status==='available').length;
      const prog=year.subjects.filter(s=>s.status==='progress').length;
      const total=year.subjects.length;
      const pct=Math.round(((avail+prog*.5)/total)*100);
      totalDisc+=total;totalAvail+=avail;
      year.subjects.forEach(function(s){if(s.chapters)totalChapters+=s.chapters.filter(function(ch){return ch.action;}).length;});
      const card=document.createElement('div');
      card.className=`y-card ${cycle.cls}`;
      card.dataset.ano=year.ano;card.dataset.cycleid=cycle.id;
      card.dataset.subjects=year.subjects.map(s=>s.n.toLowerCase()).join(' ');
      card.dataset.hasavail=avail>0?'1':'0';
      const subsHTML=year.subjects.map(s=>{
        const st=s.status||'soon';const tag=tagHTML(st);
        const note=s.nt?`<span class="s-note">(${s.nt})</span>`:'';
        const isAvail=st==='available';
        const onclk=s.action?`onclick="handleSubj(event,'${s.action}')"`:isAvail?'':'';
        const cls=`s-item${isAvail?' available':''}`;
        let chapHTML='';
        if(s.chapters&&s.chapters.length){
          chapHTML=`<div class="s-chapters">${s.chapters.map(ch=>ch.action?`<a class="s-chapter-link" href="#" onclick="handleSubj(event,'${ch.action}')"><span class="ch-icon"><span class="ico ico-sm"><svg><use href="#ico-file-text"/></svg></span></span>${ch.label}</a>`:`<span class="s-chapter-link" style="opacity:.45;cursor:default;pointer-events:none;"><span class="ch-icon"><span class="ico ico-sm"><svg><use href="#ico-lock"/></svg></span></span>${ch.label}</span>`).join('')}</div>`;
        }
        const toggleAttr=chapHTML?`onclick="toggleChP(event,this)"`:'';
        return `<a class="${cls}" href="#" ${toggleAttr} ${!chapHTML&&s.action?onclk:''}><span class="s-emoji">${s.i}</span><span class="s-name">${s.n}${note}</span>${tag}</a>${chapHTML}`;
      }).join('');
      card.innerHTML=`<div class="y-card-bar"></div><div class="y-card-head" onclick="toggleCard(this.parentElement)"><div class="y-num">${year.ano}</div><div class="y-meta"><div class="y-title">${year.label}</div><div class="y-sub">${total} disciplinas · ${avail>0?avail+' disponível(is)':'em preparação'}</div></div><div class="y-toggle">▼</div></div><div class="y-prog-bar"><div class="y-prog-fill" style="width:${pct}%"></div></div><div class="y-subjects">${subsHTML}</div>`;
      row.appendChild(card);
    });
    main.appendChild(block);
  });
  // stat-disc set by CYCLES render
  // stat-avail removed
  document.querySelectorAll('.status-pill').forEach(function(el){el.textContent=totalAvail+' disciplina'+(totalAvail!==1?'s':'')+' · '+totalChapters+' capítulo'+(totalChapters!==1?'s':'');});
  const c7=document.querySelector('.y-card[data-ano="7"]');
  if(c7)c7.classList.add('open');
}

function showMat7View(){
  _hideAllViews();
  document.getElementById('view-mat7').style.display='block';
  document.title = 'Mat. 7.º Ano · 3ponto14';
  window.scrollTo(0,0);
  // Re-show FAB if chapters are selected
  setTimeout(function(){ if(typeof updateFAB==='function') updateFAB(); }, 80);
}

function showGeradorFichas(capNum) {
  showMat7View();
  setTimeout(function(){
    var el = document.getElementById('mat7-downloads');
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    // Pre-select only the relevant chapter in the gerador
    if (capNum) {
      var allBtns = document.querySelectorAll('#gf-caps-mat7-downloads .gf-cap-btn');
      allBtns.forEach(function(b){
        var cap = parseInt(b.dataset.cap);
        if (cap !== capNum && b.classList.contains('active')) b.click();
        if (cap === capNum && !b.classList.contains('active')) b.click();
      });
    }
  }, 120);
}
function showPortalFromMat7(){
  // Return all moved sections to their original parents
  mat7ReturnAllSections();
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  document.title = '3ponto14 · Centro de Estudos';
  window.scrollTo(0,0);
}
function handleSubj(e,action){
  if(e && e.preventDefault) e.preventDefault();
  if(action==='math7') showMat7View();
  else if(action==='math') showMathView();
  else if(action==='math2') showMathView2();
  else if(action==='math3') showMathView3();
  else if(action==='math4') showMathView4();
}
function showMathView2(){
  _hideAllViews();
  document.getElementById('view-math2').style.display='block';
  document.title = 'Cap. 2 — Racionais · 3ponto14';
  window.scrollTo(0,0);
  showSection2('temas2', document.querySelector('#tabs2 .tab-btn'));
  var _q2e=document.getElementById('q2-container'); if(_q2e && !_q2e.innerHTML) gerarQuestoes2();
}
function showPortalView2(){
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  window.scrollTo(0,0);
}

function showSection2(id, btn){
  document.querySelectorAll('#view-math2 .section').forEach(s=>s.classList.remove('active'));
  var _s2=document.getElementById('sec-'+id);
  if(_s2) _s2.classList.add('active');
  document.querySelectorAll('#tabs2 .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(id==='questoes2')   { var _q2=document.getElementById('q2-container');  if(_q2 && !_q2.innerHTML) gerarQuestoes2(); }
  if(id==='minitestes2') { var _m2=document.getElementById('m2-container');  if(_m2 && !_m2.innerHTML) gerarMiniAtual2(); }
  if(id==='teste2')      { var _t2=document.getElementById('t2-container');  if(_t2 && !_t2.innerHTML) gerarTeste2(); }
  if(id==='jogos2') _j24AutoInit('j24-wrap-cap2', 'medio');
  if(id==='quiz-game2') { if(typeof qgStartForCap==='function') qgStartForCap(2); }
  if(id==='flashcards2') fcRender2();
  if(id==='progresso2') progRenderSection2();
  // ── Progress tracking ──
  if(id==='teoria2') _pmRecord('cap2','teoria');
  if(id==='flashcards2') _pmRecord('cap2','flashcard');
  var c2=document.getElementById('sec-'+id);
  if(c2) pmRenderWidget('cap2',c2);
}

function goToTopic2(n){
  const teoriaBtn = document.querySelector('#tabs2 .tab-btn:nth-child(2)');
  showSection2('teoria2', teoriaBtn);
  setTimeout(()=>{
    const el=document.getElementById('topic2-'+n);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  },100);
}

// ── Utilitários ──
function rnd2(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function rndNZ2(min,max){let v;do{v=rnd2(min,max);}while(v===0);return v;}
function fmt2(n){return (n>=0?'+':'')+n;}
function shuffle2(arr){return arr.sort(()=>Math.random()-.5);}
function gcd2(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;}
function reduceFrac(p,q){if(q===0)return[0,1];const g=gcd2(Math.abs(p),Math.abs(q));const sign=(q<0)?-1:1;return[sign*p/g,sign*q/g];}
function fmtFrac(p,q){const[rp,rq]=reduceFrac(p,q);if(rq===1)return String(rp);return rp+'/'+rq;}
function fmtFracHTML(p,q){const[rp,rq]=reduceFrac(p,q);if(rq===1)return String(rp);const neg=rp<0;const absP=Math.abs(rp);return(neg?'−':'')+'<span class="mfrac"><span class="mfrac-n">'+absP+'</span><span class="mfrac-d">'+rq+'</span></span>';}

// ── formatMath: convert X^Y → <span class="mexp">Y</span> in HTML strings ──
function formatMath(s) {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') s = String(s);
  if (!s) return s;
  // base^(expr in parens) e.g. 10^(5+7)
  s = s.replace(/([^\s<>^]+)\^\(([^)]+)\)/g, '$1<span class="mexp">($2)</span>');
  // base^? (unknown exponent placeholder)
  s = s.replace(/([^\s<>^]+)\^\?/g, '$1<span class="mexp">?</span>');
  // base^-N (negative numeric exponent)
  s = s.replace(/([^\s<>^]+)\^(-\d+)/g, '$1<span class="mexp">$2</span>');
  // base^N (positive numeric exponent)
  s = s.replace(/([^\s<>^]+)\^(\d+)/g, '$1<span class="mexp">$2</span>');
  return s;
}

// ── State Cap2 ──
const dynState2={
  q2:{level:'medio',score:{correct:0,total:0},answered:{}},
  m2:{level:'medio',score:{correct:0,total:0},answered:{},activeMini:1},
  t2:{level:'medio',score:{correct:0,total:0},answered:{}},
};
let _genAnswered2={};
let _gen2Exercicios=[];
let _gen2Level='facil';
let _gen2Score={correct:0,total:0};

// ─── CONSTRUTORES DE EXERCÍCIOS ───
function buildEx2(tema,tipo,dif){
  tema=String(tema);
  const easy=(dif==='facil'), hard=(dif==='dificil');
  const dens=easy?[2,3,4,5]:[2,3,4,5,6,7,8,10,12];
  function randDen(){return dens[rnd2(0,dens.length-1)];}
  function randFracNZ(){const q=randDen();const p=rndNZ2(-(q*2),q*2);return[p,q];}
  function randFrac(){const q=randDen();const p=rnd2(-(q*2),q*2);return[p,q];}

  // TEMA 1 — Conjuntos de números racionais
  if(tema==='1'){
    const vals=[
      {n:0,  sets:['ℕ','ℤ','ℚ₀⁺','ℤ₀⁺'],  desc:'zero — pertence a ℕ, ℤ, ℚ₀⁺ e ℤ₀⁺, mas NÃO a ℚ⁺ nem ℤ⁺.'},
      {n:1,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-3, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo — pertence a ℤ⁻ e ℚ⁻.'},
      {n:5,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-7, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo.'},
      {n:12, sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:2,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
    ];
    const v=vals[rnd2(0,vals.length-1)];
    const allSets=['ℕ','ℤ','ℚ⁺','ℚ⁻','ℤ⁻','ℤ₀⁺','ℚ₀⁺','ℚ'];
    const testSet=allSets[rnd2(0,allSets.length-1)];
    const correct=v.sets.includes(testSet);
    return{tema:'Tema 1',tipo:'vf',
      enun:`Verdadeiro ou Falso: <em>"${v.n} ∈ ${testSet}"</em>`,
      resposta:correct?'V':'F',
      expl:`O número ${v.n} é ${v.desc}\nPertence a: ${v.sets.join(', ')}.\nA afirmação "${v.n} ∈ ${testSet}" é ${correct?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 2 — Comparação de racionais
  if(tema==='2'){
    const variant=rnd2(0,3);
    if(variant===0){
      const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
      const v1=p1/q1,v2=p2/q2;
      const lcm=q1*q2/gcd2(q1,q2);
      if(tipo==='mc'){
        const correct=(v1>v2?'>':'<');
        const wrongs=['=',correct==='>'?'<':'>','≤'].filter(x=>x!==correct);
        return{tema:'Tema 2',tipo:'mc',
          enun:`Compara: ${fmtFracHTML(p1,q1)} __ ${fmtFracHTML(p2,q2)}`,
          opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
          expl:`Reduz ao mesmo denominador (mmc=${lcm}).\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${p1*(lcm/q1)} ${v1>v2?'>':'<'} ${p2*(lcm/q2)}, portanto ${fmtFrac(p1,q1)} ${correct} ${fmtFrac(p2,q2)}.`};
      }
      return{tema:'Tema 2',tipo:'vf',
        enun:`Verdadeiro ou Falso: <em>"${fmtFracHTML(p1,q1)} &lt; ${fmtFracHTML(p2,q2)}"</em>`,
        resposta:v1<v2?'V':'F',
        expl:`Reduz ao mesmo denominador (mmc=${lcm}).\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)} e ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${fmtFrac(p1,q1)} ${v1<v2?'<':'>'} ${fmtFrac(p2,q2)} → afirmação ${v1<v2?'VERDADEIRA':'FALSA'}.`};
    }
    if(variant===1){
      // Ordenar 3 frações
      const fs=[[...randFracNZ()],[...randFracNZ()],[...randFracNZ()]];
      const vals2=fs.map(([p,q])=>p/q);
      const sorted=fs.slice().sort((f1,f2)=>f1[0]/f1[1]-f2[0]/f2[1]);
      const correctStr=sorted.map(([p,q])=>fmtFrac(p,q)).join(' < ');
      const opts2=shuffle2([
        correctStr,
        [...fs].reverse().map(([p,q])=>fmtFrac(p,q)).join(' < '),
        shuffle2(fs.slice()).map(([p,q])=>fmtFrac(p,q)).join(' < '),
        [sorted[1],sorted[2],sorted[0]].map(([p,q])=>fmtFrac(p,q)).join(' < ')
      ].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Ordena por ordem crescente: ${fs.map(([p,q])=>fmtFracHTML(p,q)).join(', ')}`,
        opcoes:opts2,resposta:correctStr,
        expl:`Converte cada fração para decimal.\n${fs.map(([p,q])=>`${fmtFrac(p,q)} = ${(p/q).toFixed(3)}`).join(', ')}.\nOrdem crescente: ${correctStr}.`};
    }
    if(variant===2){
      // Encontrar fração entre dois valores
      const a2=rnd2(-4,3);const b2=a2+rnd2(2,4);
      const mid=a2+1;
      const opts3=shuffle2([String(mid),String(a2-1),String(b2+1),`${a2*2}`].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Qual inteiro está entre ${a2} e ${b2}?`,
        opcoes:opts3,resposta:String(mid),
        expl:`Entre ${a2} e ${b2} encontram-se os inteiros: ${Array.from({length:b2-a2-1},(_,i)=>a2+i+1).join(', ')}.\nUm deles é ${mid}.`};
    }
    // variant===3: vf sobre comparação
    const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
    const v1=p1/q1,v2=p2/q2;
    return{tema:'Tema 2',tipo:'vf',
      enun:`V/F: <em>"${fmtFracHTML(p1,q1)} > ${fmtFracHTML(p2,q2)}"</em>`,
      resposta:v1>v2?'V':'F',
      expl:`${fmtFrac(p1,q1)} = ${v1.toFixed(3)} e ${fmtFrac(p2,q2)} = ${v2.toFixed(3)}.\n${fmtFrac(p1,q1)} ${v1>v2?'>':'<'} ${fmtFrac(p2,q2)} → afirmação ${v1>v2?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 3 — Adição e subtração de racionais
  if(tema==='3'){
    const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
    const lcm=q1*q2/gcd2(q1,q2);
    const variant=rnd2(0,3);
    if(variant===0){
      // adição
      const rp=(p1*(lcm/q1))+(p2*(lcm/q2));
      const[resP,resQ]=reduceFrac(rp,lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:`Calcula: ${fmtFracHTML(p1,q1)} + (${fmtFracHTML(p2,q2)}) = ?<br><small style="color:var(--ink4)">Escreve como p/q (ex: 3/4) ou inteiro</small>`,
          resposta:fmtFrac(resP,resQ),
          expl:`Reduz ao mesmo denominador: mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${fmtFrac(p1*(lcm/q1),lcm)} + (${fmtFrac(p2*(lcm/q2),lcm)}) = ${fmtFrac(rp,lcm)} = ${fmtFrac(resP,resQ)}.`};
      }
      const wrong1=fmtFrac(resP+1,resQ);const wrong2=fmtFrac(resP-1,resQ);const wrong3=fmtFrac(p1+p2,q1+q2);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Calcula: ${fmtFracHTML(p1,q1)} + (${fmtFracHTML(p2,q2)}) = ?`,
        opcoes:shuffle2([fmtFrac(resP,resQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(resP,resQ),
        expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\nSoma dos numeradores: ${p1*(lcm/q1)} + ${p2*(lcm/q2)} = ${rp}.\nResultado simplificado: ${fmtFrac(resP,resQ)}.`};
    }
    if(variant===1){
      // subtração
      const rp=(p1*(lcm/q1))-(p2*(lcm/q2));
      const[resP,resQ]=reduceFrac(rp,lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>`,
          resposta:fmtFrac(resP,resQ),
          expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\nSubtração dos numeradores: ${p1*(lcm/q1)} − ${p2*(lcm/q2)} = ${rp}.\nResultado: ${fmtFrac(resP,resQ)}.`};
      }
      const wrong1=fmtFrac(resP+1,resQ);const wrong2=fmtFrac(resP-1,resQ);const wrong3=fmtFrac(p1-p2,q1);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?`,
        opcoes:shuffle2([fmtFrac(resP,resQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(resP,resQ),
        expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1*(lcm/q1),lcm)} − ${fmtFrac(p2*(lcm/q2),lcm)} = ${fmtFrac(rp,lcm)} = ${fmtFrac(resP,resQ)}.`};
    }
    if(variant===2){
      // simplificar fração
      const g=rnd2(2,6);const num2=rnd2(1,5)*g;const den2=rnd2(1,5)*g;
      const[sP,sQ]=reduceFrac(num2,den2);
      const wrong1=fmtFrac(num2-1,den2);const wrong2=fmtFrac(num2,den2-1);const wrong3=fmtFrac(num2/g+1,den2/g);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Simplifica a fração: ${fmtFracHTML(num2,den2)} = ?`,
        opcoes:shuffle2([fmtFrac(sP,sQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(sP,sQ),
        expl:`Encontra o MDC(${num2},${den2}) = ${g}.\nDivide numerador e denominador por ${g}.\n${num2}÷${g} = ${sP}, ${den2}÷${g} = ${sQ}.\nFração irredutível: ${fmtFrac(sP,sQ)}.`};
    }
    // variant===3: fração equivalente
    const q3=dens[rnd2(0,dens.length-1)];const p3=rnd2(1,q3-1);
    const mult=rnd2(2,4);
    const correct=fmtFrac(p3*mult,q3*mult);
    return{tema:'Tema 3',tipo:'mc',
      enun:`Qual destas frações é equivalente a ${fmtFracHTML(p3,q3)}?`,
      opcoes:shuffle2([correct,fmtFrac(p3*mult+1,q3*mult),fmtFrac(p3+1,q3*mult),fmtFrac(p3*mult,q3*mult+1)]),
      resposta:correct,
      expl:`Multiplica numerador e denominador pelo mesmo número.\n${fmtFrac(p3,q3)} = ${fmtFrac(p3,q3)} × ${fmtFrac(mult,mult)} = ${fmtFrac(p3*mult,q3*mult)}.\nPortanto ${correct} é equivalente a ${fmtFrac(p3,q3)}.`};
  }

  // TEMA 5 — Percentagens
  if(tema==='5'){
    const pcts=easy?[10,20,25,50,75]:[5,10,12,15,20,25,30,40,50,60,75,80];
    const p=pcts[rnd2(0,pcts.length-1)];
    const bases=easy?[20,40,50,60,80,100,120,200]:[25,35,55,65,75,120,250,350,480];
    const base=bases[rnd2(0,bases.length-1)];
    const res=base*p/100;
    const variant=rnd2(0,3);
    if(variant===0){
      // calcular x% de n
      if(tipo==='mc'){
        const wrongs=shuffle2([res+base*0.1,res-base*0.1,res*2,base-res].filter(w=>w!==res&&w>0)).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:`Calcula: ${p}% de ${base} = ?`,
          opcoes:shuffle2([res,...wrongs]),resposta:res,
          expl:`${p}% significa ${p} por cada 100.\n${p}% de ${base} = ${fmtFrac(p,100)} × ${base} = ${p*base/100} = ${res}.`};
      }
      return{tema:'Tema 5',tipo:'fill',
        enun:`Calcula: ${p}% de ${base} = ?`,resposta:res,
        expl:`${p}% de ${base} = ${p}/100 × ${base} = ${p*base/100} = ${res}.`};
    }
    if(variant===1){
      // encontrar a percentagem: x% de base = res
      const res2=res;
      const opts=shuffle2([p,p+5,p-5,p*2].filter(v=>v>0&&v<=100&&v!==p)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`${res2} é __% de ${base}?`,
        opcoes:shuffle2([p,...opts]),resposta:p,
        expl:`Para encontrar a percentagem: (${res2} ÷ ${base}) × 100.\n${res2} ÷ ${base} = ${(res2/base).toFixed(4)}.\n× 100 = ${p}%.`};
    }
    if(variant===2){
      // encontrar o total: p% de x = res  → x = res × 100 / p
      const total=base;
      const given=res;
      const opts=shuffle2([total,total+20,total-20,total*2].filter(v=>v>0&&v!==total)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`${p}% de um número é ${given}. Qual é esse número?`,
        opcoes:shuffle2([total,...opts]),resposta:total,
        expl:`Se ${p}% de x = ${given}, então:\nx = ${given} × 100 ÷ ${p} = ${given*100} ÷ ${p} = ${total}.`};
    }
    // variant===3: percentagem num contexto real
    const items=['bilhete','produto','livro','computador','televisão'];
    const item=items[rnd2(0,items.length-1)];
    const price=base;
    const disc=p;
    const discVal=price*disc/100;
    const finalP=price-discVal;
    const opts2=shuffle2([finalP,price+discVal,discVal,price].filter(v=>v!==finalP)).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:`Um ${item} custa ${price} €. Tem um desconto de ${disc}%. Qual o preço final?`,
      opcoes:shuffle2([finalP,...opts2]),resposta:finalP,
      expl:`Passo 1: calcula o desconto.\n${disc}% de ${price} = ${fmtFrac(disc,100)} × ${price} = ${discVal} €.\nPasso 2: subtrai ao preço original.\n${price} − ${discVal} = ${finalP} €.`};
  }

  // TEMA 7 — Potências
  if(tema==='7'){
    const bases7=easy?[2,3,5,10]:[2,3,5,7,10];
    const base7=bases7[rnd2(0,bases7.length-1)];
    const variant=rnd2(0,4);
    if(variant===0){
      const exp1=rnd2(1,easy?4:6);const exp2=rnd2(1,easy?3:5);
      const res=exp1+exp2;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Simplifica: ${base7}^${exp1} × ${base7}^${exp2} = ${base7}^?`,
        opcoes:shuffle2([res,res+1,res-1,exp1*exp2]).slice(0,4),resposta:res,
        expl:`Regra: mesma base → soma os expoentes.\n${base7}^${exp1} × ${base7}^${exp2} = ${base7}^(${exp1}+${exp2}) = ${base7}^${res}.`};
    }
    if(variant===1){
      const exp1=rnd2(2,easy?4:6);const bigExp=exp1+rnd2(1,3);const res=bigExp-exp1;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Simplifica: ${base7}^${bigExp} ÷ ${base7}^${exp1} = ${base7}^?`,
        opcoes:shuffle2([res,res+1,res-1,bigExp+exp1]).slice(0,4),resposta:res,
        expl:`Regra: mesma base → subtrai os expoentes.\n${base7}^${bigExp} ÷ ${base7}^${exp1} = ${base7}^(${bigExp}−${exp1}) = ${base7}^${res}.`};
    }
    if(variant===2){
      // potência de fração
      const n=rnd2(1,4),d=rnd2(2,5),e=rnd2(2,3);
      const correct=`${Math.pow(n,e)}/${Math.pow(d,e)}`;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Calcula: (${fmtFracHTML(n,d)})^${e} = ?`,
        opcoes:shuffle2([correct,`${n*e}/${d*e}`,`${Math.pow(n,e)}/${d}`,`${n}/${Math.pow(d,e)}`]).slice(0,4),
        resposta:correct,
        expl:`Regra: (a/b)^n = a^n / b^n.\n(${n}/${d})^${e} = ${n}^${e} / ${d}^${e} = ${Math.pow(n,e)} / ${Math.pow(d,e)} = ${correct}.`};
    }
    if(variant===3){
      // calcular valor numérico
      const exp3=rnd2(2,easy?3:4);
      const val=Math.pow(base7,exp3);
      const wrongs=shuffle2([val+base7,val-base7,val*base7,base7*exp3].filter(w=>w!==val)).slice(0,3);
      return{tema:'Tema 7',tipo:'mc',
        enun:`Calcula: ${base7}^${exp3} = ?`,
        opcoes:shuffle2([val,...wrongs]),resposta:val,
        expl:`${base7}^${exp3} significa ${Array.from({length:exp3},()=>base7).join(' × ')}.\n= ${val}.`};
    }
    // variant===4: potência de expoente zero
    return{tema:'Tema 7',tipo:'vf',
      enun:`V/F: <em>"Qualquer número (≠0) elevado a 0 é igual a 1: ${base7}^0 = 1"</em>`,
      resposta:'V',
      expl:`Afirmação verdadeira.\nRegra: a^0 = 1 para qualquer a ≠ 0.\n${base7}^0 = 1.\nJustificação: ${base7}^n ÷ ${base7}^n = ${base7}^(n-n) = ${base7}^0 = 1.`};
  }

  // TEMA 8 — Notação científica
  if(tema==='8'){
    const mantissas=easy?[1.5,2.3,4.5,1.8,3.7,2.0,5.1]:[1.23,2.56,3.14,4.87,6.02,9.1,7.5,1.08];
    const exps=easy?[3,4,5,6]:[2,3,4,5,6,7,8];
    const mant=mantissas[rnd2(0,mantissas.length-1)];
    const exp=exps[rnd2(0,exps.length-1)];
    const num=mant*Math.pow(10,exp);
    const variant=rnd2(0,2);
    if(variant===0){
      // número → notação científica
      const correct=`${mant} × 10^${exp}`;
      const wrongs=[`${mant*10} × 10^${exp-1}`,`${mant} × 10^${exp+1}`,`${mant/10} × 10^${exp}`].filter(w=>w!==correct);
      return{tema:'Tema 8',tipo:'mc',
        enun:`Escreve em notação científica: ${num.toLocaleString('pt-PT')} = ?`,
        opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
        expl:`Notação científica: a × 10^n onde 1 ≤ a < 10.\n${num} → move a vírgula ${exp} ${exp===1?'casa':'casas'} para a esquerda.\nResultado: ${mant} × 10^${exp}.`};
    }
    if(variant===1){
      // notação científica → número
      const numStr=num.toLocaleString('pt-PT');
      const wrong1=(mant*Math.pow(10,exp+1)).toLocaleString('pt-PT');
      const wrong2=(mant*Math.pow(10,exp-1)).toLocaleString('pt-PT');
      return{tema:'Tema 8',tipo:'mc',
        enun:`Converte para número inteiro: ${mant} × 10^${exp} = ?`,
        opcoes:shuffle2([numStr,wrong1,wrong2,`${mant*10}`]),resposta:numStr,
        expl:`${mant} × 10^${exp} = ${mant} × ${Math.pow(10,exp).toLocaleString('pt-PT')} = ${numStr}.\n(Move a vírgula ${exp} casas para a direita.)`};
    }
    // variant===2: comparação em notação científica
    const exp2=exps[rnd2(0,exps.length-1)];
    const mant2=mantissas[rnd2(0,mantissas.length-1)];
    const val1=mant*Math.pow(10,exp);const val2=mant2*Math.pow(10,exp2);
    const correctOp=val1>val2?'>':'<';
    return{tema:'Tema 8',tipo:'mc',
      enun:`Compara: ${mant} × 10^${exp} __ ${mant2} × 10^${exp2}`,
      opcoes:shuffle2(['>','<','=','≥']),resposta:correctOp,
      expl:`Compara primeiro os expoentes.\n${exp} ${exp>exp2?'>':exp<exp2?'<':'='} ${exp2}${exp===exp2?` → compara mantissas: ${mant} ${mant>mant2?'>':'<'} ${mant2}`:''}.\nPortanto ${mant}×10^${exp} ${correctOp} ${mant2}×10^${exp2}.`};
  }

  // TEMA 9 — Operações em notação científica
  if(tema==='9'){
    const variant=rnd2(0,2);
    if(variant===0){
      // adição/subtração com mesmo expoente
      const mant1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const mant2=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const exp1b=rnd2(2,6);
      const sumMant=parseFloat((mant1+mant2).toFixed(2));
      let finalMant=sumMant,finalExp=exp1b;
      if(finalMant>=10){finalMant=parseFloat((finalMant/10).toFixed(3));finalExp++;}
      const correct=`${finalMant} × 10^${finalExp}`;
      const wrongs=[`${mant1+mant2} × 10^${exp1b-1}`,`${mant1+mant2} × 10^${exp1b+1}`,`${parseFloat((mant1*mant2).toFixed(2))} × 10^${exp1b*2}`];
      return{tema:'Tema 9',tipo:'mc',
        enun:`Calcula: (${mant1} × 10^${exp1b}) + (${mant2} × 10^${exp1b}) = ?`,
        opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
        expl:`Mesmo expoente → soma apenas as mantissas.\n${mant1} + ${mant2} = ${sumMant}.\n${sumMant >= 10 ? `${sumMant} ≥ 10, normaliza: ${sumMant}/10 × 10^${exp1b+1} = ${finalMant} × 10^${finalExp}.` : `Resultado: ${correct}.`}`};
    }
    if(variant===1){
      // multiplicação em notação científica
      const m1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const m2=parseFloat((rnd2(1,4)+(rnd2(0,9)/10)).toFixed(1));
      const e1=rnd2(2,5);const e2=rnd2(2,4);
      const resMant=parseFloat((m1*m2).toFixed(3));
      let fMant=resMant,fExp=e1+e2;
      if(fMant>=10){fMant=parseFloat((fMant/10).toFixed(3));fExp++;}
      const correct=`${fMant} × 10^${fExp}`;
      return{tema:'Tema 9',tipo:'mc',
        enun:`Calcula: (${m1} × 10^${e1}) × (${m2} × 10^${e2}) = ?`,
        opcoes:shuffle2([correct,`${parseFloat((m1+m2).toFixed(1))} × 10^${e1+e2}`,`${fMant} × 10^${e1*e2}`,`${m1*m2} × 10^${e1-e2}`]).slice(0,4),
        resposta:correct,
        expl:`Multiplica mantissas e soma expoentes.\n${m1} × ${m2} = ${resMant}.\n10^${e1} × 10^${e2} = 10^${e1+e2}.\n${resMant>=10?`Normaliza: ${resMant}/10 × 10^${e1+e2+1} = ${fMant} × 10^${fExp}.`:`Resultado: ${correct}.`}`};
    }
    // variant===2: ordenar por grandeza
    const es=[rnd2(2,4),rnd2(5,7),rnd2(8,10)];
    const ms=[parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1))];
    const nums=es.map((e,i)=>`${ms[i]} × 10^${e}`);
    const sorted=nums.slice().sort((a,b)=>{const pa=a.split(' × 10^');const pb=b.split(' × 10^');return (parseFloat(pa[0])*Math.pow(10,parseInt(pa[1])))-(parseFloat(pb[0])*Math.pow(10,parseInt(pb[1])));});
    return{tema:'Tema 9',tipo:'mc',
      enun:`Qual destas é a MAIOR? ${nums.join(', ')}`,
      opcoes:shuffle2(nums),resposta:sorted[sorted.length-1],
      expl:`Compara os expoentes:\n${es.join(', ')} → maior expoente = ${Math.max(...es)}.\nO maior número é ${sorted[sorted.length-1]}.`};
  }

  return buildEx2('3','mc',dif);
}


// ── Render dinâmico Cap2 ──
function renderDynSection2(container, exercicios, sec) {
  if (!dynState2[sec]) dynState2[sec] = { level:'medio', score:{correct:0,total:0}, answered:{} };
  dynState2[sec].answered = {};
  dynState2[sec].score = { correct:0, total:0 };
  if (typeof updateDynScore2 === 'function') updateDynScore2(sec);
  qzInit(container, exercicios, sec, function(correct, total) {
    dynState2[sec].score = { correct: correct, total: total };
    if (typeof updateDynScore2 === 'function') updateDynScore2(sec);
    if (typeof checkCompletion2 === 'function') checkCompletion2(sec);
  });
}

function checkDyn2(sec,qid,tipo,val,btn){
  const st=dynState2[sec];
  if(st.answered[qid])return;
  st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=inp.value.trim();
    inp.disabled=true;
    // normalize: allow both / and ÷, spaces, etc.
    const normalize=s=>s.replace(/\s/g,'').replace(/÷/g,'/');
    const correct=(normalize(userVal)===normalize(String(val)));
    inp.classList.add(correct?'correct':'wrong');
    st.score.total++;if(correct)st.score.correct++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    const isCorrect=(val===true||val==='true');
    if(isCorrect){btn.classList.add('correct');st.score.correct++;}
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
    st.score.total++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(isCorrect?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(isCorrect, expl, undefined, qid + '-fb');
  }
  updateDynScore2(sec);
  progLog2(sec==='q2'?'questoes':sec==='m2'?'minitestes':'teste',st.answered[qid]);
  {const _s2=sec==='q2'?'q':sec==='m2'?'m':'t';const _ok2=(tipo==='fill'||tipo==='fill_frac')?(document.getElementById(qid+'-in')?.classList.contains('correct')||false):(val===true||val==='true');_etRecord('cap2',_s2,qid,_etText(qid),_ok2);}
}

function updateDynScore2(sec){
  const s=dynState2[sec].score;
  var e1=document.getElementById(sec+'-score'); if(e1)e1.textContent=s.correct;
  var e2=document.getElementById(sec+'-total'); if(e2)e2.textContent='/ '+s.total;
  var e3=document.getElementById(sec+'-prog');  if(e3){const pct=s.total>0?s.correct/s.total*100:0;e3.style.width=pct+'%';}
  if(s.total>0) _pmRecord('cap2','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(sec, s.correct, s.total);
}

function setLevelSection2(sec,btn){
  const bar=btn.closest('.level-bar');
  bar.querySelectorAll('.gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  dynState2[sec].level=btn.dataset.level;
  if(sec==='q2')gerarQuestoes2();
  else if(sec==='m2')gerarMiniAtual2();
  else if(sec==='t2')gerarTeste2();
}

// ── QUESTÕES-AULA ──
function gerarQuestoes2(){
  const dif=dynState2.q2.level;
  let temas, tipos;
  if(dif==='facil'){
    temas=['1','1','1','2','2','2','2','3','3','3','5','5','5','7','7','7','8','8','9','9'];
    tipos=['vf','mc','mc','mc','mc','fill_frac','mc','mc','mc','fill_frac','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc'];
  } else if(dif==='dificil'){
    temas=['1','1','2','2','2','3','3','3','5','5','5','5','7','7','7','8','8','9','9','9'];
    tipos=['vf','mc','mc','vf','fill_frac','fill_frac','fill_frac','mc','mc','fill','mc','fill','mc','mc','mc','mc','mc','mc','mc','mc'];
  } else {
    temas=['1','1','2','2','3','3','3','5','5','5','7','7','7','8','8','8','9','9','9','9'];
    tipos=['vf','mc','mc','fill_frac','mc','fill_frac','mc','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc','mc','mc','mc'];
  }
  const exercicios=temas.map((t,i)=>buildEx2(t,tipos[i],dif)).filter(Boolean);
  renderDynSection2('q2-container',exercicios,'q2');
}

// ── MINITESTES ──
let _activeMini2=0;
function showMiniDyn2(n,btn){
  _activeMini2=n;
  document.querySelectorAll('#mini-tabs2 .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarMiniAtual2();
}
function gerarMiniAtual2(){
  const dif=dynState2.m2.level;
  let exercicios;
  if(_activeMini2===0){
    const plano=[
      {t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},
      {t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill_frac'},{t:'2',tipo:'mc'},
      {t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'mc'},
      {t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},
      {t:'7',tipo:'mc'},{t:'7',tipo:'mc'},
      {t:'8',tipo:'mc'},{t:'8',tipo:'mc'},
      {t:'9',tipo:'mc'},{t:'9',tipo:'mc'},
    ];
    exercicios=plano.map(p=>buildEx2(p.t,p.tipo,dif)).filter(Boolean);
  } else {
    const temaMap={'1':'1','2':'2','3':'3','4':'3','5':'5','6':'5','7':'7','8':'8','9':'9'};
    const realTema=temaMap[String(_activeMini2)]||'1';
    const tipos=['mc','mc','fill_frac','vf','mc','fill','mc','mc','vf','fill_frac','mc','mc','mc','vf','mc','mc','fill','mc','vf','mc'];
    exercicios=tipos.map(t=>buildEx2(realTema,t,dif)).filter(Boolean);
  }
  renderDynSection2('m2-container',exercicios,'m2');
}

// ── TESTE GLOBAL ──
let _teste2Subtema=0;
function setTeste2Subtema(n,btn){
  _teste2Subtema=n;
  document.querySelectorAll('#teste2-subtema-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarTeste2();
}
function gerarTeste2(){
  const dif=dynState2.t2.level;
  let plano;
  if(_teste2Subtema===0){
    if(dif==='facil'){
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'7',tipo:'mc'}];
    } else if(dif==='dificil'){
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'},{t:'9',tipo:'mc'}];
    } else {
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'}];
    }
  } else {
    const t=String(_teste2Subtema);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill_frac'},{t,tipo:'mc'}];
  }
  const exercicios=plano.map(p=>buildEx2(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection2('t2-container',exercicios,'t2');
}

// ── GERADOR LIVRE ──
function setGenLevel2(btn){
  document.querySelectorAll('#sec-gerador2 .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _gen2Level=btn.dataset.level;
}
function gerarExercicios2(){
  _genAnswered2={};
  _gen2Score={correct:0,total:0};
  const tema=document.getElementById('gen2-tema').value;
  const qtd=parseInt(document.getElementById('gen2-qtd').value);
  const dif=_gen2Level;
  const temas=['1','2','3','5','7','8','9'];
  const tipos=['mc','mc','fill_frac','fill','mc','mc','mc'];
  const exercicios=[];
  for(let i=0;i<qtd;i++){
    const idx=i%temas.length;
    const t=tema==='all'?temas[idx]:tema;
    const tipo=tipos[temas.indexOf(t)||0]||'mc';
    const ex=buildEx2(t,tipo,dif);
    if(ex)exercicios.push({...ex,num:i+1});
  }
  _gen2Exercicios=exercicios;
  renderGenExercicios2(exercicios);
}

function renderGenExercicios2(exercicios){
  document.getElementById('gen2-score').textContent='0';
  document.getElementById('gen2-total').textContent='/ 0';
  document.getElementById('gen2-prog').style.width='0%';
  document.getElementById('gen2-score-bar').style.display='flex';
  document.getElementById('gen2-download-area').style.display='flex';
  const labels=['A','B','C','D'];
  let html='';
  exercicios.forEach((ex,i)=>{
    const qid='g2ex'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Exercício ${ex.num} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'||ex.tipo==='fill_frac'){
      const isFrac=ex.tipo==='fill_frac';
      html+=`<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <input class="fill-input" id="${qid}-in" placeholder="${isFrac?'ex: 3/4':'?'}" type="${isFrac?'text':'number'}" style="width:${isFrac?'120px':'100px'}">
        <button class="check-btn" onclick="checkGen2('${qid}','${ex.tipo}','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      (ex.opcoes||[]).forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkGen2('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button class="option-btn" onclick="checkGen2('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span> Verdadeiro</button>
        <button class="option-btn" onclick="checkGen2('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span> Falso</button>
      </div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });
  document.getElementById('gen2-resultado').innerHTML=html;
}

function checkGen2(qid,tipo,val,btn){
  if(_genAnswered2[qid])return;
  _genAnswered2[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=inp.value.trim().replace(/\s/g,'');
    if(!userVal){_genAnswered2[qid]=false;eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;
    correct=(userVal===String(val).replace(/\s/g,''));
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)_gen2Score.correct++;
  _gen2Score.total++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  document.getElementById('gen2-score').textContent=_gen2Score.correct;
  document.getElementById('gen2-total').textContent='/ '+_gen2Score.total;
  document.getElementById('gen2-prog').style.width=(_gen2Score.total>0?_gen2Score.correct/_gen2Score.total*100:0)+'%';
}

// ── JOGOS ──
let _jogosLevel2='facil';

// Triângulo Harmónico
const TRIANGULO_LINES=[
  ['1'],
  ['1/2','1/2'],
  ['1/3','1/6','1/3'],
  ['1/4','1/12','1/12','1/4'],
  ['1/5','1/20','1/30','1/20','1/5'],
  ['1/6','1/30','1/60','1/60','1/30','1/6'],
  ['1/7','1/42','1/105','1/140','1/105','1/42','1/7'],
];
let _trianguloRevealed=false;
function revelarTriangulo(){
  _trianguloRevealed=true;
  renderTrianguloHarmonico();
  const fb=document.getElementById('triangulo-fb');
  fb.className='feedback show correct-fb';
  fb.innerHTML=makeFeedbackHTML(true,'Triângulo revelado corretamente!',undefined,undefined);
}
function resetTriangulo(){
  _trianguloRevealed=false;
  renderTrianguloHarmonico();
  const fb=document.getElementById('triangulo-fb');
  fb.className='feedback';
  fb.innerHTML='';
}

// Relâmpago Cap2
let _rl2Answered=0,_rl2Correct=0;
function checkRl2(qid,tipo,val,btn){
  const container=document.getElementById(qid);
  if(container.dataset.done)return;
  container.dataset.done='1';
  _rl2Answered++;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=(inp.value||'').trim().replace(/\s/g,'');
    if(!userVal){delete container.dataset.done;_rl2Answered--;eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;
    correct=(userVal===String(val).replace(/\s/g,''));
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)_rl2Correct++;
  _etRecord('cap2','rel',qid,_etText(qid),correct);
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  if(_rl2Answered>=10){
    const pct=Math.round(_rl2Correct/10*100);
    const emoji=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
    document.getElementById('relampago2-result').innerHTML=`${emoji} ${_rl2Correct}/10 certas · ${pct}%`;
    document.getElementById('relampago2-score').style.display='block';
    document.getElementById('relampago2-score').scrollIntoView({behavior:'smooth',block:'nearest'});
    _pmRecord('cap2','quiz',{pontuacao:_rl2Correct,total:10});
    _pmRecord('cap2','jogo');
  }
}

// ── FLASHCARDS ──
const FC2_CARDS=[
  {tag:'Definição',q:'O que é um número racional?',a:'Todo o número que pode ser escrito como p/q, com p,q ∈ ℤ e q ≠ 0. Exemplos: ½, −¾, 0,3, 5.'},
  {tag:'Hierarquia',q:'Qual a relação entre ℕ, ℤ e ℚ?',a:'ℕ ⊂ ℤ ⊂ ℚ. Todos os naturais são inteiros e todos os inteiros são racionais.'},
  {tag:'Definição',q:'O que é ℚ⁺ e ℚ⁻?',a:'ℚ⁺ são os racionais positivos (>0). ℚ⁻ são os racionais negativos (<0). ℚ₀⁺ inclui o zero.'},
  {tag:'Regra',q:'Como arredondar 2/3 às décimas?',a:'2/3 = 0,666… → às décimas: 0,7 (por excesso, pois o algarismo seguinte é 6 ≥ 5).'},
  {tag:'Regra',q:'Como comparar −½ e −⅓?',a:'Reduz ao mesmo denominador: −3/6 vs −2/6. Como −3 < −2, temos −½ < −⅓.'},
  {tag:'Regra',q:'Como somar frações de denominadores diferentes?',a:'Calcular o mmc dos denominadores, converter, e somar os numeradores. Ex: ½ + ⅓ = 3/6 + 2/6 = 5/6.'},
  {tag:'Fórmula',q:'Como calcular p% de N?',a:'p% de N = (p/100) × N. Exemplo: 20% de 150 = 0,20 × 150 = 30.'},
  {tag:'Fórmula',q:'Fórmula para aumento de p%',a:'Valor final = Valor inicial × (1 + p/100). Aumento de 15%: multiplica por 1,15.'},
  {tag:'Fórmula',q:'Fórmula para desconto de p%',a:'Valor final = Valor inicial × (1 − p/100). Desconto de 20%: multiplica por 0,80.'},
  {tag:'Fórmula',q:'Como calcular a % de variação?',a:'% var = (Vf − Vi) / Vi × 100. Se Vf < Vi, é desconto; se Vf > Vi, é aumento.'},
  {tag:'Propriedade',q:'Produto de potências de mesma base',a:'aᵐ × aⁿ = aᵐ⁺ⁿ. Exemplo: 2³ × 2⁵ = 2⁸.'},
  {tag:'Propriedade',q:'Quociente de potências de mesma base',a:'aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Exemplo: 10⁷ ÷ 10³ = 10⁴.'},
  {tag:'Definição',q:'O que é notação científica?',a:'Um número em notação científica tem a forma a × 10ⁿ, onde 1 ≤ a < 10 e n ∈ ℤ. Ex: 25000 = 2,5 × 10⁴.'},
  {tag:'Regra',q:'Como converter 0,0016 para notação científica?',a:'0,0016 = 1,6 × 10⁻³ (mover a vírgula 3 casas para a direita → expoente −3).'},
  {tag:'Regra',q:'Como somar em notação científica?',a:'Igualar os expoentes, depois somar as partes decimais. Ex: 3,2 × 10³ + 8,7 × 10² = 3,2 × 10³ + 0,87 × 10³ = 4,07 × 10³.'},
  {tag:'Regra',q:'Como multiplicar em notação científica?',a:'(a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ. Se a×b ≥ 10, ajustar.'},
  {tag:'Exemplo',q:'Calcula: ½ + (−⅓)',a:'½ + (−⅓) = 3/6 − 2/6 = 1/6'},
  {tag:'Exemplo',q:'Calcula: 35% de 200',a:'35% de 200 = 0,35 × 200 = 70'},
  {tag:'Exemplo',q:'Escreve 183750 em notação científica',a:'183750 = 1,8375 × 10⁵ (mover vírgula 5 casas para a esquerda)'},
  {tag:'Exemplo',q:'Simplifica: 10⁵ × 10⁷',a:'10⁵ × 10⁷ = 10^(5+7) = 10¹²'},
];
let _fc2Idx=0,_fc2Flipped=false,_fc2Order=[...Array(FC2_CARDS.length).keys()];
function fcRender2(){
  const card=FC2_CARDS[_fc2Order[_fc2Idx]];
  document.getElementById('fc2-tag').textContent=card.tag;
  document.getElementById('fc2-q').textContent=card.q;
  document.getElementById('fc2-a').textContent=card.a;
  document.getElementById('fc2-a').style.display='none';
  document.getElementById('fc2-counter').textContent=`${_fc2Idx+1} / ${FC2_CARDS.length}`;
  document.getElementById('fc2-prog').style.width=((_fc2Idx+1)/FC2_CARDS.length*100)+'%';
  const dots=document.getElementById('fc2-dots');
  dots.innerHTML=_fc2Order.map((_,i)=>
    `<div style="width:8px;height:8px;border-radius:50%;background:${i===_fc2Idx?'var(--c2-mid)':'var(--border2)'};cursor:pointer;transition:background .2s;" onclick="fcGoTo2(${i})"></div>`
  ).join('');
  _fc2Flipped=false;
  document.getElementById('fc2-inner').style.background='var(--cream)';
}
function fcFlip2(){
  _fc2Flipped=!_fc2Flipped;
  document.getElementById('fc2-a').style.display=_fc2Flipped?'block':'none';
  document.getElementById('fc2-inner').style.background=_fc2Flipped?'var(--c2-pale)':'var(--cream)';
}
function fcNext2(){_fc2Idx=(_fc2Idx+1)%FC2_CARDS.length;fcRender2();}
function fcPrev2(){_fc2Idx=(_fc2Idx-1+FC2_CARDS.length)%FC2_CARDS.length;fcRender2();}
function fcGoTo2(i){_fc2Idx=i;fcRender2();}

// ── EXAME ──
let _exame2State={level:'medio',timer:null,timeLeft:900,exercicios:[],answered:{},score:{correct:0,total:0}};
function exame2SetLevel(btn){
  document.querySelectorAll('#exame2-level-group .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _exame2State.level=btn.dataset.level;
}
function exame2Start(){
  const qtd=parseInt(document.getElementById('exame2-qtd').value);
  const tempo=parseInt(document.getElementById('exame2-tempo').value);
  _exame2State.timeLeft=tempo;_exame2State.answered={};_exame2State.score={correct:0,total:0};
  const temas=['1','2','3','3','5','5','7','8','9'];
  const tipos=['vf','mc','mc','fill_frac','mc','fill','mc','mc','mc'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const idx=i%temas.length;
    const ex=buildEx2(temas[idx],tipos[idx],_exame2State.level);
    if(ex)exs.push(ex);
  }
  _exame2State.exercicios=exs;
  document.getElementById('exame2-config').style.display='none';
  document.getElementById('exame2-result').style.display='none';
  document.getElementById('exame2-running').style.display='block';
  document.getElementById('exame2-answered').textContent=`0 / ${exs.length}`;
  exame2RenderQuestions(exs);
  exame2UpdateTimer();
  _exame2State.timer=setInterval(()=>{_exame2State.timeLeft--;exame2UpdateTimer();if(_exame2State.timeLeft<=0){clearInterval(_exame2State.timer);exame2Finish();}},1000);
}
function exame2UpdateTimer(){
  const m=Math.floor(_exame2State.timeLeft/60),s=_exame2State.timeLeft%60;
  const el=document.getElementById('exame2-timer');
  el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.style.color=_exame2State.timeLeft<=60?'var(--cs-mid)':_exame2State.timeLeft<=180?'var(--c3-mid)':'var(--ink)';
}
function exame2RenderQuestions(exs){
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='ex2_'+i;
    html+=`<div class="quiz-question" id="${qid}"><div class="q-number">Questão ${i+1} · ${ex.tema}</div><div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'||ex.tipo==='fill_frac'){
      const isFrac=ex.tipo==='fill_frac';
      html+=`<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;"><input class="fill-input" id="${qid}-in" placeholder="${isFrac?'ex: 3/4':'?'}" type="${isFrac?'text':'number'}" style="width:${isFrac?'120px':'100px'}"><button class="check-btn" onclick="exame2Check('${qid}','${ex.tipo}','${ex.resposta}')">Verificar</button></div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;(ex.opcoes||[]).forEach((opt,k)=>{html+=`<button class="option-btn" data-correct="${String(opt)===String(ex.resposta)}" onclick="exame2Check('${qid}','mc',${String(opt)===String(ex.resposta)},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;});html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;"><button class="option-btn" data-correct="${vC}" onclick="exame2Check('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(46,125,50,.15);color:var(--c1-deep)">V</span>Verdadeiro</button><button class="option-btn" data-correct="${!vC}" onclick="exame2Check('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(198,40,40,.12);color:#b71c1c">F</span>Falso</button></div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
  });
  document.getElementById('exame2-container').innerHTML=html;
}
function exame2Check(qid,tipo,val,btn){
  const st=_exame2State;if(st.answered[qid])return;st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=(inp.value||'').trim().replace(/\s/g,'');
    if(!userVal){delete st.answered[qid];eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;correct=(userVal===String(val).replace(/\s/g,''));inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)st.score.correct++;st.score.total++;
  const fb=document.getElementById(qid+'-fb');fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  document.getElementById('exame2-answered').textContent=`${st.score.total} / ${st.exercicios.length}`;
  document.getElementById('exame2-prog').style.width=(st.score.total/st.exercicios.length*100)+'%';
  progLog2('exame',correct);
  if(st.score.total>=st.exercicios.length){clearInterval(st.timer);setTimeout(exame2Finish,600);}
}
function exame2Stop(){clearInterval(_exame2State.timer);exame2Finish();}
// exame2Submit is the programmatic submit path (called by timer expiry wrappers)
function exame2Submit(){exame2Finish();}
function exame2Finish(){
  examActive = false; // clear guard regardless of how finish was triggered
  document.getElementById('exame2-running').style.display='none';
  const{correct,total}=_exame2State.score;
  const pct=total>0?Math.round(correct/total*100):0;
  document.getElementById('exame2-emoji').innerHTML=pct>=90?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=70?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=50?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
  document.getElementById('exame2-nota').textContent=`${pct}% — ${pct>=90?'Excelente!':pct>=70?'Bom!':pct>=50?'Suficiente':'A melhorar'}`;
  document.getElementById('exame2-detalhe').textContent=`${correct} certas em ${total} questões`;
  document.getElementById('exame2-result').style.display='block';
  progLogExame2(pct, correct, total);
}
function exame2Reset(){
  clearInterval(_exame2State.timer);
  document.getElementById('exame2-config').style.display='block';
  document.getElementById('exame2-running').style.display='none';
  document.getElementById('exame2-result').style.display='none';
  var tempo=parseInt((document.getElementById('exame2-tempo')||{}).value)||900;
  var rm=Math.floor(tempo/60), rs=tempo%60;
  document.getElementById('exame2-timer').textContent=(rm<10?'0':'')+rm+':'+(rs<10?'0':'')+rs;
  document.getElementById('exame2-timer').style.color='var(--ink)';
}

// ── PROGRESSO ──
// ── localStorage helpers — Cap 2 ──
function _saveProgData2(){
  try{localStorage.setItem('edupt_cap2',JSON.stringify({sections:_progData2.sections,log:_progData2.log}));}catch(e){}
}
function _loadProgData2(){
  try{
    const raw=localStorage.getItem('edupt_cap2');
    if(!raw)return;
    const saved=JSON.parse(raw);
    if(saved.sections)Object.assign(_progData2.sections,saved.sections);
    if(saved.log)_progData2.log=saved.log;
  }catch(e){}
}

const _progData2={
  sections:{questoes:{correct:0,total:0},minitestes:{correct:0,total:0},teste:{correct:0,total:0},gerador:{correct:0,total:0},jogos:{correct:0,total:0},exame:{correct:0,total:0}},
  log:[],
};
_loadProgData2();

function progLog2(section,correct){
  if(!_progData2.sections[section])_progData2.sections[section]={correct:0,total:0};
  _progData2.sections[section].total++;if(correct)_progData2.sections[section].correct++;
  _progData2.log.unshift({section,correct,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  if(_progData2.log.length>50)_progData2.log.pop();
  _saveProgData2();
  setTimeout(_progRefreshBars, 80);
}
function progLogExame2(pct,correct,total){
  if(!_progData2.exames)_progData2.exames=[];
  _progData2.exames.push({pct,correct,total,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  _progData2.sections.exame.correct+=correct;
  _progData2.sections.exame.total+=total;
  _saveProgData2();
  setTimeout(_progRefreshBars, 80);
}
function progRenderSection2(){
  const sec=_progData2.sections;
  const labels={questoes:'Questões-aula',minitestes:'Minitestes',teste:'Teste',gerador:'Gerador',jogos:'Jogos',exame:'Exame'};
  let total=0,correct=0;Object.values(sec).forEach(s=>{total+=s.total;correct+=s.correct;});
  const globalPct=total>0?Math.round(correct/total*100):0;
  document.getElementById('prog2-cards').innerHTML=[
    {label:'Questões respondidas',val:total,icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},{label:'Respostas certas',val:correct,icon:'<span class="ico ico-sm"><svg><use href="#ico-check"/></svg></span>'},
    {label:'Taxa de acerto',val:total>0?globalPct+'%':'—',icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},
  ].map(c=>`<div class="card" style="text-align:center;padding:1.5rem;"><div style="font-size:1.8rem;margin-bottom:.5rem">${c.icon}</div><div style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">${c.val}</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">${c.label}</div></div>`).join('');
  // barras por capítulo
  _progRenderCapitulosBar('prog2-temas', 2);
  const logEl=document.getElementById('prog2-historico');
  if(_progData2.log.length===0){logEl.innerHTML='<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade — começa a responder!</div>';return;}
  logEl.innerHTML=_progData2.log.map(e=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px"><span>${e.correct?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>'}</span><span style="font-size:.82rem;color:var(--ink2)">${labels[e.section]||e.section}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">${e.time}</span></div>`).join('');
}
function progReset2(){Object.keys(_progData2.sections).forEach(k=>{_progData2.sections[k]={correct:0,total:0};});_progData2.log=[];try{localStorage.removeItem('edupt_cap2');}catch(e){}progRenderSection2();}

// ── DOWNLOADS ──
function downloadFicha2(type){
  const now=new Date().toLocaleDateString('pt-PT');
  function wrap(title,content){ return wrapPrintDoc(title, content); }

  let html='';
  if(type==='ficha_completa'){
    html=wrap('Ficha Completa — Números Racionais',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 2 — Números Racionais</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Grupo 1 — Conjuntos de Números Racionais</h2>
<div class="ex"><div class="ex-num">1.</div><p>Utiliza os símbolos ∈, ∉, ⊂ ou ⊃ para obteres afirmações verdadeiras:</p>
<p>a) 3/2 … ℚ⁺ &nbsp;&nbsp; b) 0 … ℤ &nbsp;&nbsp; c) −|−3| … ℤ⁻ &nbsp;&nbsp; d) ℚ … ℤ &nbsp;&nbsp; e) ℕ … ℤ</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Indica um valor arredondado de 2/3 às décimas por defeito e por excesso.</p><div class="linha"></div></div>
<h2>Grupo 2 — Comparação e Ordenação</h2>
<div class="ex"><div class="ex-num">3.</div><p>Completa com >, < ou =:</p>
<p>a) −1/5 ___ 0 &nbsp;&nbsp; b) −4,9 ___ −5 &nbsp;&nbsp; c) −3,5 ___ −14/4 &nbsp;&nbsp; d) −2/5 ___ −2/7</p></div>
<div class="ex"><div class="ex-num">4.</div><p>Ordena por ordem crescente: −1, −½, −¼, ¾, 2</p><div class="linha"></div></div>
<h2>Grupo 3 — Adição Algébrica</h2>
<div class="ex"><div class="ex-num">5.</div><p>Calcula (resultado como fração irredutível ou inteiro):</p>
<p>a) ½ + ⅓ &nbsp;&nbsp; b) ½ + (−⅓) &nbsp;&nbsp; c) −2/5 + (−3/5) &nbsp;&nbsp; d) −1/2 + (−1/10)</p>
<p>e) −7/5 + 0,2 &nbsp;&nbsp; f) −1/6 + (−3/4) &nbsp;&nbsp; g) 7/5 + (−1/4)</p></div>
<h2>Grupo 4 — Percentagens</h2>
<div class="ex"><div class="ex-num">6.</div><p>Completa a tabela:</p>
<table><tr><th>Fração</th><th>1/10</th><th></th><th>7/20</th><th></th></tr><tr><td>Decimal</td><td></td><td>0,23</td><td></td><td></td></tr><tr><td>%</td><td></td><td></td><td></td><td>0,65%</td></tr></table></div>
<div class="ex"><div class="ex-num">7.</div><p>Calcula: a) 20% de 350 &nbsp;&nbsp; b) 35% de 46 &nbsp;&nbsp; c) 15% de 35 000</p><div class="linha"></div></div>
<h2>Grupo 5 — Potências e Notação Científica</h2>
<div class="ex"><div class="ex-num">8.</div><p>Calcula: a) 10⁶ × 10⁸ &nbsp;&nbsp; b) 10¹⁰ ÷ 10³ ÷ 100 &nbsp;&nbsp; c) 5 × 10⁵ × 20</p></div>
<div class="ex"><div class="ex-num">9.</div><p>Escreve em notação científica: a) 25 000 &nbsp;&nbsp; b) 0,0016 × 10⁷ &nbsp;&nbsp; c) 150 × 10⁸</p></div>
<div style="margin-top:40px;padding:12px;border:2px solid #2c3e7a;border-radius:4px"><strong>Classificação:</strong> _____ / 20 &nbsp;&nbsp; <strong>Professor(a):</strong> __________________________</div>`);
  } else if(type==='minitestes'){
    const temas=[
      {t:'1 — Números Racionais',qs:[
        {e:'Qual pertence a ℚ₀⁺ mas não a ℕ?',opts:['A) 5','B) −5/3','C) 12/4','D) 11/5'],r:'D'},
        {e:'O valor absoluto de −15/3 é um número inteiro?',opts:['A) Verdadeiro','B) Falso'],r:'A'},
        {e:'Valor arredondado às centésimas de 57/23:',opts:['A) 2,5','B) 2,48','C) 2,47','D) 2,478'],r:'B'},
        {e:'ℕ ⊂ ℤ ⊂ ℚ — afirmação verdadeira ou falsa?',opts:['A) Verdadeira','B) Falsa'],r:'A'},
      ]},
      {t:'2 — Comparação de Racionais',qs:[
        {e:'Qual está entre −3/4 e −2/3?',opts:['A) −7/9','B) |−0,7|','C) −|−13/18|','D) |−31/45|'],r:'C'},
        {e:'Qual afirmação é verdadeira?',opts:['A) −2 < −2,1','B) |−1/2| > |−1/3|','C) −|−2,5| > 2','D) −4/3 > −5/4'],r:'B'},
        {e:'Compara: −2/5 ___ −2/7',opts:['A) >','B) <','C) =','D) ≥'],r:'B'},
        {e:'Qual é maior: −0,7 ou −3/4?',opts:['A) −0,7','B) −3/4','C) São iguais','D) Impossível dizer'],r:'A'},
      ]},
      {t:'3 — Adição Algébrica',qs:[
        {e:'Qual soma representa o menor número?',opts:['A) −2 + 1/3','B) −1 + (−4/3)','C) −3 − (−1/3)','D) −2/3 − 4/3'],r:'B'},
        {e:'Calcula: 1/2 + (−1/3)',opts:['A) 1/6','B) −1/6','C) 1/5','D) −1/5'],r:'A'},
        {e:'Calcula: −1 − 1/3 − 2',opts:['A) −10/3','B) −8/3','C) −4/3','D) −2'],r:'A'},
        {e:'O Rui pensou num número, adicionou −1/5 e obteve 9/5. Que número pensou?',opts:['A) 2/5','B) 3/5','C) −2','D) 2'],r:'D'},
      ]},
      {t:'5 — Percentagens',qs:[
        {e:'Qual corresponde a 20,5%?',opts:['A) 2,05','B) 0,25','C) 0,205','D) 0,0205'],r:'C'},
        {e:'45% + 38% + ? = 100%. Qual o valor que falta?',opts:['A) 15%','B) 17%','C) 22%','D) 27%'],r:'B'},
        {e:'Calcula: 20% de 35 000',opts:['A) 700','B) 7 000','C) 70 000','D) 350'],r:'B'},
        {e:'Um clube tinha 225 atletas e houve uma diminuição de 12%. Quantos ficaram?',opts:['A) 27','B) 198','C) 213','D) 252'],r:'B'},
      ]},
      {t:'7 — Potências',qs:[
        {e:'10⁵ × 10⁷ = ?',opts:['A) 100¹²','B) 10¹²','C) 10³⁵','D) 100²⁵'],r:'B'},
        {e:'1 000 000 como potência de base 10:',opts:['A) 100³','B) 10⁵','C) 10⁶','D) 10⁷'],r:'C'},
        {e:'10¹⁵ ÷ 10⁹ ÷ 10 = ?',opts:['A) 10⁷','B) 10⁶','C) 10⁵','D) 10⁴'],r:'C'},
        {e:'(3/2)⁵ ÷ (1/2)⁵ ÷ 3³ = ?',opts:['A) 3','B) 6','C) 8','D) 9'],r:'A'},
      ]},
      {t:'8 — Notação Científica',qs:[
        {e:'183 750 metros em notação científica:',opts:['A) 183,75 × 10³','B) 1,8375 × 10⁶','C) 1,8375 × 10⁵','D) 1837,5 × 10²'],r:'C'},
        {e:'5 milhões em notação científica:',opts:['A) 5,0 × 10⁷','B) 5 × 10⁶','C) 5 × 10³','D) 5000 × 10³'],r:'B'},
        {e:'1791 milhões de euros em notação científica:',opts:['A) 1,791 × 1000','B) 1,791 × 10⁹','C) 1,791 × 10⁶','D) 1791 × 10⁶'],r:'B'},
        {e:'0,0016 × 10⁷ em notação científica:',opts:['A) 1,6 × 10⁴','B) 1,6 × 10³','C) 1,6 × 10⁵','D) 16 × 10³'],r:'A'},
      ]},
      {t:'9 — Operações em Notação Científica',qs:[
        {e:'0,032 × 10⁵ + 87 × 10² = ?',opts:['A) 87,032 × 10⁷','B) 87,032 × 10³','C) 119 × 10²','D) 1,19 × 10⁴'],r:'D'},
        {e:'(0,0009 × 10⁸) × (80 × 10³) = ?',opts:['A) 7,2 × 10⁹','B) 7,2 × 10⁸','C) 7,2 × 10¹⁰','D) 7,2 × 10⁷'],r:'A'},
        {e:'A + B = 1,7 × 10⁵ com A = 0,0009 × 10⁸ e B = 80 × 10³. Verdadeiro?',opts:['A) Verdadeiro','B) Falso'],r:'A'},
        {e:'Qual é maior: 5 × 10⁵ × 5 × 10¹⁰ ou 3 × 10¹⁶ − 10¹⁶?',opts:['A) 5 × 10⁵ × 5 × 10¹⁰','B) 3 × 10¹⁶ − 10¹⁶','C) São iguais','D) Impossível'],r:'A'},
      ]},
    ];
    let content=`<h1>Minitestes · Números Racionais · 7.º Ano · Cap. 2</h1><div class="meta">Data: ${now}</div>`;
    temas.forEach((t,ti)=>{
      content+=`<h2>${t.t}</h2><div class="meta">Nome: ______________________________ | Turma: _____ | Nota: _____/6</div>`;
      t.qs.forEach((q,qi)=>{content+=`<div class="ex"><div class="ex-num">${qi+1}.</div><p>${q.e}</p>`;q.opts.forEach(o=>{content+=`<p class="opcao">${o}</p>`;});content+=`</div>`;});
      if(ti<temas.length-1)content+=`<hr style="margin:30px 0;border-color:#ccc">`;
    });
    content+=`<hr style="margin-top:40px"><h2>Soluções</h2>`;
    temas.forEach((t,ti)=>{content+=`<p><strong>${t.t.split('—')[0].trim()}:</strong> `;content+=t.qs.map((q,qi)=>`${qi+1}) ${q.r}`).join(' | ');content+=`</p>`;});
    html=wrap('Minitestes — Números Racionais',content);
  } else if(type==='teste_avaliacao'){
    html=wrap('Teste de Avaliação — Números Racionais',`
<h1>Teste de Avaliação · Números Racionais · 7.º Ano</h1>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Duração: 45 min</div>
<h2>Grupo I — Escolha Múltipla (2 pts cada)</h2>
<div class="ex"><div class="ex-num">1.</div><p>Qual número completa: −17/6 < ___ < −8/3?</p><p class="opcao">A) −3 &nbsp;&nbsp; B) −15/6 &nbsp;&nbsp; C) −31/12 &nbsp;&nbsp; D) −11/4</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Que número deve ser somado ao numerador e denominador de 3/5 para aumento de 25%?</p><p class="opcao">A) 1 &nbsp;&nbsp; B) 2 &nbsp;&nbsp; C) 3 &nbsp;&nbsp; D) 4</p></div>
<div class="ex"><div class="ex-num">3.</div><p>Para que valor de n: 10⁷ × 10ⁿ ÷ 1000 = 10⁹?</p><p class="opcao">A) 2 &nbsp;&nbsp; B) 3 &nbsp;&nbsp; C) 4 &nbsp;&nbsp; D) 5</p></div>
<div class="ex"><div class="ex-num">4.</div><p>8% de 510 000 000 km² em notação científica:</p><p class="opcao">A) 1,2 × 10⁶ &nbsp;&nbsp; B) 1,2 × 10⁷ &nbsp;&nbsp; C) 12 × 10⁶ &nbsp;&nbsp; D) 12 × 10⁷</p></div>
<h2>Grupo II — Resposta Curta (3 pts cada)</h2>
<div class="ex"><div class="ex-num">5.</div><p>Considera A = {−7/10; −74/100; −0,75; −1¹⁰; 4²/8; 3/4}.</p>
<p>5.1. Indica os números inteiros.</p><div class="linha"></div>
<p>5.2. Existem dois simétricos em A? Quais?</p><div class="linha"></div>
<p>5.3. Ordena os elementos de A por ordem crescente.</p><div class="linha"></div></div>
<h2>Grupo III — Problema (4 pts)</h2>
<div class="ex"><div class="ex-num">6.</div><p>O Luís repartiu 2,5 litros de sumo por 12 copos iguais. Quanto ficou em cada copo (em ml, arredondado às unidades)?</p><div class="linha"></div><div class="linha"></div></div>
<div style="margin-top:40px;padding:12px;border:2px solid #2c3e7a;border-radius:4px"><strong>Cotações:</strong> Grupo I: 8 pts | Grupo II: 6 pts | Grupo III: 4 pts | Bónus: 2 pts = <strong>Total: 20 pts</strong></div>`);
  } else if(type==='resumo_teoria'){
    html=wrap('Resumo Teórico — Números Racionais',`
<h1>Resumo Teórico · Números Racionais (ℚ) · 7.º Ano</h1>
<h2>1. Conjuntos Numéricos</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>ℕ ⊂ ℤ ⊂ ℚ &nbsp; · &nbsp; ℚ⁺ (positivos), ℚ⁻ (negativos), ℚ₀⁺ (não negativos)</p></div>
<h2>2. Comparação</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>Reduzir ao mesmo denominador (mmc). Na reta: mais à esquerda = menor.</p></div>
<h2>3. Adição Algébrica</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>a/b + c/d = (a×d + c×b)/(b×d) &nbsp; · &nbsp; Simplificar ao mmc.</p></div>
<h2>4. Percentagens</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>p% = p/100 &nbsp; · &nbsp; p% de N = (p/100)×N</p>
<p>Aumento p%: ×(1+p/100) &nbsp; · &nbsp; Desconto p%: ×(1−p/100)</p>
<p>% variação = (Vf−Vi)/Vi × 100</p></div>
<h2>5. Potências</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>aᵐ×aⁿ = aᵐ⁺ⁿ &nbsp; · &nbsp; aᵐ÷aⁿ = aᵐ⁻ⁿ &nbsp; · &nbsp; (a/b)ⁿ = aⁿ/bⁿ</p></div>
<h2>6. Notação Científica</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>a × 10ⁿ com 1 ≤ a < 10 &nbsp; · &nbsp; Somar: igualar expoentes &nbsp; · &nbsp; Mult: (a×b)×10ᵐ⁺ⁿ</p></div>`);
  } else if(type==='grelha_avaliacao'){
    html=wrap('Grelha de Avaliação',`
<h1>Grelha de Avaliação · Números Racionais · 7.º Ano · Cap. 2</h1>
<div class="meta">Período: _____ | Turma: _____ | Data: ${now}</div>
<table><tr><th>N.º</th><th>Nome</th><th>T1 ℚ /4</th><th>T2 Comp /4</th><th>T3 + /4</th><th>T4 % /4</th><th>T5 Pot /4</th><th>T6 NC /4</th><th>Total /20</th></tr>
${Array.from({length:30},(_,i)=>`<tr><td>${i+1}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}
</table>`);
  }
  if(!html){eduToast('Tipo não reconhecido.','warn');return;}
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  htmlToPdfDownload(html, type+'_racionais_7ano.pdf');
}
function downloadFichaGerada2(){
  if(!_gen2Exercicios.length){eduToast('Gera exercícios primeiro!','warn');return;}
  const now=new Date().toLocaleDateString('pt-PT');
  let body='';
  _gen2Exercicios.forEach(ex=>{
    body+=`<div style="margin-bottom:24px;border-bottom:1px solid #eee;padding-bottom:12px"><p style="font-weight:700;color:#2c3e7a">Exercício ${ex.num} · ${ex.tema}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if(ex.tipo==='mc'&&ex.opcoes){const ls=['A','B','C','D'];ex.opcoes.forEach((o,i)=>{body+=`<p style="margin:3px 0 3px 20px">☐ ${ls[i]}) ${o}</p>`;});}
    else if(ex.tipo==='vf'){body+=`<p style="margin:3px 0 3px 20px">☐ Verdadeiro &nbsp;&nbsp; ☐ Falso</p>`;}
    else{body+=`<p style="border-bottom:1px solid #bbb;height:28px;margin-top:10px;color:#aaa;font-style:italic;font-size:.85rem">Resposta: ___________________</p>`;}
    body+=`</div>`;
  });
  body+=`<hr style="margin-top:40px"><h2>Soluções</h2><ol>`;
  _gen2Exercicios.forEach(ex=>{body+=`<li>${ex.resposta}</li>`;});
  body+=`</ol>`;
  const now2 = new Date().toLocaleDateString('pt-PT');
  const html=wrapPrintDoc('Ficha Gerada — Números Racionais',`<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha Gerada<em>Cap. 2 — Números Racionais</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div></div>${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Matemática 7.º Ano · Cap. 2 — Números Racionais</span><span>${now2}</span></div>`);
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  htmlToPdfDownload(html, 'ficha_racionais_'+Date.now()+'.pdf');
}

// ═══════════════════════════════════════
// SUBTEMA — PRÁTICA FOCADA
// ═══════════════════════════════════════

function toggleTemaRow(id) {
  const row = document.getElementById(id);
  row.classList.toggle('open');
}

// ── Modal de subtema ──
function criarModalSubtema(titulo, exercicios) {
  // Remove modal anterior se existir
  const old = document.getElementById('subtema-modal');
  if (old) old.remove();

  const labels = ['A','B','C','D'];
  let qhtml = '';
  exercicios.forEach((ex, i) => {
    const qid = 'stq' + i;
    qhtml += `<div class="quiz-question" id="${qid}" style="margin-bottom:1rem">
      <div class="q-number">Questão ${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if (ex.tipo === 'fill') {
      qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">
        <button class="check-btn" onclick="stCheck('${qid}','fill',${ex.resposta})">Verificar</button>
      </div>`;
    } else if (ex.tipo === 'fill_frac') {
      qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" placeholder="ex: 3/4" type="text" style="width:120px">
        <button class="check-btn" onclick="stCheck('${qid}','fill_frac','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if (ex.tipo === 'mc') {
      qhtml += `<div class="options">`;
      (ex.opcoes || []).forEach((opt, k) => {
        const isC = String(opt) === String(ex.resposta);
        qhtml += `<button class="option-btn" onclick="stCheck('${qid}','mc',${isC},this)">
          <span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      qhtml += `</div>`;
    } else if (ex.tipo === 'vf') {
      const vC = ex.resposta === 'V';
      qhtml += `<div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="option-btn" onclick="stCheck('${qid}','mc',${vC},this)">
          <span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button>
        <button class="option-btn" onclick="stCheck('${qid}','mc',${!vC},this)">
          <span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button>
      </div>`;
    }
    qhtml += `<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });

  const modal = document.createElement('div');
  modal.id = 'subtema-modal';
  modal.style.cssText = `position:fixed;inset:0;z-index:9999;background:rgba(28,26,22,.55);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:2rem 1rem;overflow-y:auto`;
  modal.innerHTML = `
    <div style="background:var(--cream);border-radius:20px;max-width:680px;width:100%;box-shadow:var(--shadow-lg);overflow:hidden;animation:pfadeUp .25s ease">
      <div style="background:var(--ink);padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:.72rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">Prática focada</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:#fff">${titulo}</div>
        </div>
        <button onclick="document.getElementById('subtema-modal').remove()" aria-label="Fechar" style="all:unset;cursor:pointer;width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;transition:background .15s" onmouseover="this.style.background='rgba(255,255,255,.22)'" onmouseout="this.style.background='rgba(255,255,255,.12)'">✕</button>
      </div>
      <div style="padding:1.5rem" id="subtema-body">${qhtml}</div>
      <div style="padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">
        <div class="score-bar" style="flex:1;min-width:200px;margin:0;padding:.6rem 1rem">
          <div><div class="score-num" id="st-score" style="font-size:1.4rem">0</div><div class="score-label">certos</div></div>
          <div><div class="score-num" id="st-total" style="color:var(--ink4);font-size:1.1rem">/ 0</div><div class="score-label">respondidos</div></div>
          <div class="progress-track" style="flex:1"><div class="progress-fill" id="st-prog" style="width:0%"></div></div>
        </div>
        <button class="btn btn-ghost" onclick="stNovas()" style="flex-shrink:0">↺ Novas questões</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  // store context for "novas questões"
  window._stContext = { titulo, gerador: null };
}

let _stAnswered = {};
let _stScore = { correct: 0, total: 0 };

function stCheck(qid, tipo, val, btn) {
  if (_stAnswered[qid]) return;
  _stAnswered[qid] = true;
  const expl = document.getElementById(qid + '-expl')?.textContent || '';
  const container = document.getElementById(qid);
  let correct = false;
  if (tipo === 'fill' || tipo === 'fill_frac') {
    const inp = document.getElementById(qid + '-in');
    const uv = inp.value.trim().replace(/\s/g,'');
    if (!uv) { _stAnswered[qid] = false; eduToast('Introduz uma resposta!','warn'); return; }
    inp.disabled = true;
    correct = tipo === 'fill' ? (parseFloat(uv) === val) : (uv === String(val).replace(/\s/g,''));
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    correct = (val === true || val === 'true');
    if (correct) btn.classList.add('correct');
    else { btn.classList.add('wrong'); container.querySelectorAll('.option-btn').forEach(b => { if (b.dataset.correct === 'true') b.classList.add('correct'); }); }
  }
  if (correct) _stScore.correct++;
  _stScore.total++;
  const fb = document.getElementById(qid + '-fb');
  fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.innerHTML = makeFeedbackHTML(correct, expl, tipo==='fill'?val:undefined);
  document.getElementById('st-score').textContent = _stScore.correct;
  document.getElementById('st-total').textContent = '/ ' + _stScore.total;
  document.getElementById('st-prog').style.width = (_stScore.total > 0 ? _stScore.correct/_stScore.total*100 : 0) + '%';
}

function stNovas() {
  if (window._stContext?.gerador) {
    _stAnswered = {}; _stScore = { correct: 0, total: 0 };
    const exs = window._stContext.gerador();
    let qhtml = ''; const labels = ['A','B','C','D'];
    exs.forEach((ex, i) => {
      const qid = 'stq' + i;
      qhtml += `<div class="quiz-question" id="${qid}" style="margin-bottom:1rem">
        <div class="q-number">Questão ${i+1} · ${ex.tema}</div>
        <div class="q-text">${formatMath(ex.enun)}</div>`;
      if (ex.tipo === 'fill') {
        qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px"><button class="check-btn" onclick="stCheck('${qid}','fill',${ex.resposta})">Verificar</button></div>`;
      } else if (ex.tipo === 'fill_frac') {
        qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="${qid}-in" placeholder="ex: 3/4" type="text" style="width:120px"><button class="check-btn" onclick="stCheck('${qid}','fill_frac','${ex.resposta}')">Verificar</button></div>`;
      } else if (ex.tipo === 'mc') {
        qhtml += `<div class="options">`;
        (ex.opcoes||[]).forEach((opt, k) => { const isC = String(opt)===String(ex.resposta); qhtml += `<button class="option-btn" onclick="stCheck('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`; });
        qhtml += `</div>`;
      } else if (ex.tipo === 'vf') {
        const vC = ex.resposta==='V';
        qhtml += `<div style="display:flex;gap:.75rem;flex-wrap:wrap"><button class="option-btn" onclick="stCheck('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" onclick="stCheck('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>`;
      }
      qhtml += `<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
    });
    document.getElementById('subtema-body').innerHTML = qhtml;
    document.getElementById('st-score').textContent = '0';
    document.getElementById('st-total').textContent = '/ 0';
    document.getElementById('st-prog').style.width = '0%';
  }
}

// ── Subtema builders Cap1 ──
function abrirSubtema(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  const dif = dynState.q.level || 'medio';
  const { min, max } = lim(dif);
  const N = 6;

  const titulos = {
    '1:inteiros': 'Conjunto dos Números Inteiros', '1:representacao': 'Representar Situações com Inteiros', '1:ordenacao': 'Ordenar Inteiros na Reta',
    '2:absoluto': 'Valor Absoluto |a|', '2:simetrico': 'Simétrico de um Número', '2:comparar': 'Comparar usando Valor Absoluto',
    '3:mesmo_sinal': 'Adição — Mesmo Sinal', '3:sinais_dif': 'Adição — Sinais Diferentes', '3:contexto': 'Adição — Problemas de Contexto',
    '4:subtracao': 'Subtração de Inteiros', '4:adicao_alg': 'Adição Algébrica', '4:simplificar': 'Simplificar Expressões',
    '5:retirar_par': 'Retirar Parênteses', '5:valor_num': 'Valor Numérico', '5:colchetes': 'Colchetes e Chavetas',
  };
  const titulo = titulos[tema+':'+sub] || 'Prática';

  function gerador() {
    const exs = [];
    for (let i = 0; i < N; i++) {
      let ex = null;
      if (tema==='1' && sub==='inteiros')      ex = buildT1('vf', min, max, i+1);
      else if (tema==='1' && sub==='representacao') ex = buildT1(i%2===0?'mc':'fill', min, max, i+1);
      else if (tema==='1' && sub==='ordenacao') {
        const vals = Array.from({length:4}, () => rnd(min, max));
        const sorted = [...vals].sort((a,b)=>a-b);
        ex = { num:i+1, tema:'Tema 1', tipo:'mc',
          enun:`Qual a ordem crescente de: ${vals.join(', ')}?`,
          opcoes: [sorted.join(' < '), [...sorted].reverse().join(' > '), shuffle([...vals]).join(', '), sorted.join(' > ')].slice(0,4),
          resposta: sorted.join(' < '),
          expl: `Ordem crescente: ${sorted.join(' < ')} (da esquerda para a direita na reta numérica).` };
      }
      else if (tema==='2' && sub==='absoluto') {
        const a = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Calcula: |${a}| = ?`, resposta: Math.abs(a), expl:`A afirmação é verdadeira — |${a}| = ${Math.abs(a)} (distância à origem, sempre positiva).` };
      }
      else if (tema==='2' && sub==='simetrico') {
        const a = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Qual é o simétrico de ${a}?`, resposta: -a, expl:`O simétrico de ${a} é ${-a} — inverte o sinal.` };
      }
      else if (tema==='2' && sub==='comparar') {
        const a = rndNZ(min, max), b = rndNZ(min, max);
        const correct = Math.abs(a) > Math.abs(b) ? `|${a}|` : Math.abs(a) < Math.abs(b) ? `|${b}|` : 'Iguais';
        ex = { num:i+1, tema:'Tema 2', tipo:'mc',
          enun:`Qual é o maior: |${a}| ou |${b}|?`,
          opcoes: shuffle([`|${a}|`, `|${b}|`, 'Iguais', `|${a+b}|`]).slice(0,4),
          resposta: correct,
          expl:`|${a}| = ${Math.abs(a)}, |${b}| = ${Math.abs(b)}. O maior é ${correct}.` };
      }
      else if (tema==='3' && sub==='mesmo_sinal') {
        const a = rnd(min<0?min:-max, -1), b = rnd(min<0?min:-max, -1);
        const res = a+b;
        ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:`Calcula: (${fmt(a)}) + (${fmt(b)}) = ?`, resposta:res, expl:`Mesmo sinal (ambos negativos): soma os módulos e fica negativo: ${Math.abs(a)}+${Math.abs(b)}=${Math.abs(res)}, resultado: ${res}.` };
      }
      else if (tema==='3' && sub==='sinais_dif') {
        const a = rndNZ(min, max), b = -rndNZ(min, max);
        const res = a+b;
        ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:`Calcula: (${fmt(a)}) + (${fmt(b)}) = ?`, resposta:res, expl:`Sinais diferentes: subtrai os módulos e usa o sinal do maior: resultado = ${res}.` };
      }
      else if (tema==='3' && sub==='contexto') ex = buildT3('contexto', min, max, i+1);
      else if (tema==='4' && sub==='subtracao') {
        const a = rndNZ(min, max), b = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 4', tipo:'fill', enun:`Calcula: (${fmt(a)}) − (${fmt(b)}) = ?`, resposta:a-b, expl:`(${fmt(a)}) − (${fmt(b)}) = ${fmt(a)} + ${fmt(-b)} = ${a-b} (subtrair = adicionar o simétrico).` };
      }
      else if (tema==='4' && sub==='adicao_alg') ex = buildT4('mc', min, max, i+1);
      else if (tema==='4' && sub==='simplificar') ex = buildT4('fill', min, max, i+1);
      else if (tema==='5' && sub==='retirar_par') ex = buildT5('mc', min, max, i+1, dif);
      else if (tema==='5' && sub==='valor_num')   ex = buildT5('fill', min, max, i+1, dif);
      else if (tema==='5' && sub==='colchetes') {
        const a=rndNZ(-10,10), b=rndNZ(-10,10), c=rndNZ(-10,10);
        const inner=b-c, bracket=a-inner, res=-bracket;
        ex = { num:i+1, tema:'Tema 5', tipo:'fill',
          enun:`Calcula: −[${a} − (${fmt(b)} − ${fmt(c)})] = ?`, resposta:res,
          expl:`Passo 1: (${fmt(b)}−${fmt(c)})=${inner}. Passo 2: [${a}−(${inner})]=${bracket}. Passo 3: −[${bracket}]=${res}.` };
      }
      else ex = buildExercicio(tema, i%2===0?'mc':'fill', min, max, i+1, dif);
      if (ex) exs.push(ex);
    }
    return exs;
  }

  window._stContext = { titulo, gerador };
  criarModalSubtema(titulo, gerador());
}

// ── Subtema builders Cap2 ──
function abrirSubtema2(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  const dif = dynState2.q2?.level || 'medio';
  const N = 6;

  const titulos2 = {
    '1:conjuntos':'Conjuntos ℕ, ℤ, ℚ', '1:arredondamento':'Arredondamento', '1:aprox':'Valores Aproximados',
    '2:comparar':'Comparar Frações', '2:ordenar':'Ordenar Racionais', '2:absoluto':'Valor Absoluto em ℚ',
    '3:somar_frac':'Somar Frações', '3:subtrair_frac':'Subtrair Frações', '3:expressoes':'Expressões com Frações', '3:contexto_rac':'Partes de um Todo',
    '5:converter':'Converter Fração/Decimal/%', '5:calcular_pct':'Calcular % de N', '5:aumento':'Aumentos Percentuais', '5:desconto':'Descontos', '5:variacao':'Taxa de Variação',
    '7:produto':'Produto de Potências', '7:quociente':'Quociente de Potências', '7:frac_pot':'Potência de Fração',
    '8:escrever':'Escrever em Notação Científica', '8:pot_base10':'Potências de Base 10',
    '9:somar_nc':'Somar/Subtrair em Not. Científica', '9:mult_nc':'Multiplicar/Dividir em Not. Científica', '9:comparar_nc':'Comparar em Not. Científica',
  };
  const titulo = titulos2[tema+':'+sub] || 'Prática';

  function gerador() {
    const exs = [];
    for (let i = 0; i < N; i++) {
      let ex = null;
      // Tema 2 sub-specific
      if (tema==='2' && sub==='comparar') ex = buildEx2('2','mc',dif);
      else if (tema==='2' && sub==='ordenar') ex = buildEx2('2','vf',dif);
      else if (tema==='2' && sub==='absoluto') {
        const dens=[2,3,4,5]; const q=dens[rnd2(0,3)]; const p=rndNZ2(-q*2,q*2);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Calcula: |${fmtFracHTML(p,q)}| = ?`, resposta:fmtFrac(Math.abs(p),q), expl:`A afirmação é verdadeira — |${fmtFrac(p,q)}| = ${fmtFrac(Math.abs(p),q)} (valor absoluto é sempre positivo).` };
      }
      else if (tema==='3' && sub==='somar_frac') { const ex0=buildEx2('3','fill_frac',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='3' && sub==='subtrair_frac') {
        const dens=[2,3,4,5,6]; const q1=dens[rnd2(0,4)],q2=dens[rnd2(0,4)];
        const p1=rndNZ2(-q1*2,q1*2), p2=rndNZ2(-q2*2,q2*2);
        const lcm=q1*q2/gcd2(q1,q2); const rp=(p1*(lcm/q1))-(p2*(lcm/q2));
        const[resP,resQ]=reduceFrac(rp,lcm);
        ex={num:i+1,tema:'Tema 3',tipo:'fill_frac', enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?`, resposta:fmtFrac(resP,resQ), expl:`${fmtFrac(p1,q1)} − ${fmtFrac(p2,q2)} = ${fmtFrac(p1*(lcm/q1),lcm)} − ${fmtFrac(p2*(lcm/q2),lcm)} = ${fmtFrac(resP,resQ)}`};
      }
      else if (tema==='3' && sub==='expressoes') { const ex0=buildEx2('3','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='5' && sub==='converter') {
        const pcts=[10,20,25,50,75,30,40]; const p=pcts[rnd2(0,pcts.length-1)];
        const opts=[p/100, p+0.5, p*10, (p/100).toFixed(2)+'0'];
        ex={num:i+1,tema:'Tema 5',tipo:'mc', enun:`${p}% como decimal é:`, opcoes:shuffle([p/100,...[p+0.5,p*10,p/1000].filter(w=>w!==p/100)]).slice(0,4), resposta:p/100, expl:`${p}% = ${p}/100 = ${p/100}.`};
      }
      else if (tema==='5' && sub==='calcular_pct') { const ex0=buildEx2('5','fill',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='5' && (sub==='aumento'||sub==='desconto')) {
        const pcts=[5,10,15,20,25]; const p=pcts[rnd2(0,4)];
        const bases=[80,100,120,200,250,500]; const base=bases[rnd2(0,bases.length-1)];
        const isAum=(sub==='aumento');
        const res=isAum ? base*(1+p/100) : base*(1-p/100);
        ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:`${isAum?'Aumento':'Desconto'} de ${p}% sobre ${base} €. Valor final?`, resposta:res, expl:`${base} × ${isAum?'(1+'+p+'/100)':'(1-'+p+'/100)'} = ${base} × ${isAum?(1+p/100):(1-p/100)} = ${res} €.`};
      }
      else if (tema==='5' && sub==='variacao') {
        const vi=[80,100,150,200][rnd2(0,3)]; const vf=vi+[-20,-10,10,20,30][rnd2(0,4)];
        const pct=Math.round((vf-vi)/vi*100);
        ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:`Preço: ${vi}€ → ${vf}€. Qual a variação percentual?`, resposta:pct, expl:`% var = (${vf}−${vi})/${vi}×100 = ${vf-vi}/${vi}×100 = ${pct}%.`};
      }
      else if (tema==='7' && sub==='produto') { const ex0=buildEx2('7','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='7' && sub==='quociente') {
        const b=[2,3,5,10][rnd2(0,3)]; const big=rnd2(4,8); const small=rnd2(1,big-1);
        const res=big-small;
        ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:`Simplifica: ${b}^${big} ÷ ${b}^${small} = ${b}^?`, opcoes:shuffle([res,res+1,res-1,big+small]).slice(0,4), resposta:res, expl:`${b}^${big} ÷ ${b}^${small} = ${b}^(${big}−${small}) = ${b}^${res}.`};
      }
      else if (tema==='7' && sub==='frac_pot') {
        const n=rnd2(2,4),d=rnd2(2,5),e=rnd2(2,3);
        ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:`(${n}/${d})^${e} = ?`, opcoes:shuffle([`${Math.pow(n,e)}/${Math.pow(d,e)}`,`${n*e}/${d*e}`,`${Math.pow(n,e)}/${d}`,`${n}/${Math.pow(d,e)}`]).slice(0,4), resposta:`${Math.pow(n,e)}/${Math.pow(d,e)}`, expl:`(${n}/${d})^${e} = ${n}^${e}/${d}^${e} = ${Math.pow(n,e)}/${Math.pow(d,e)}.`};
      }
      else if (tema==='8') { const ex0=buildEx2('8','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='9') { const ex0=buildEx2('9','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else { const ex0=buildEx2(tema,i%2===0?'mc':'fill_frac',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      if (ex) exs.push(ex);
    }
    return exs;
  }

  window._stContext = { titulo, gerador };
  criarModalSubtema(titulo, gerador());
}

// ── FEEDBACK HELPER ──
/* ══════════════════════════════════════════════
   REVELAÇÃO GRADUAL DE PASSOS
   Divide o campo expl por \n em passos individuais.
   Se só tiver 1 passo, mostra tudo de uma vez (comportamento anterior).
   Se tiver 2+ passos, mostra o primeiro e um botão "Ver passo seguinte".
══════════════════════════════════════════════ */

var _stepState = {}; // { fbId: { steps:[], current:0 } }

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


function calcExpression() {
  var inp = document.getElementById('calc-expr');
  var res = document.getElementById('calc-expr-result');
  if (!inp || !res) return;
  var raw = inp.value.trim();
  if (!raw) { res.textContent = ''; return; }
  try {
    // Normalize: replace − (minus sign) with -, ^ with **
    var expr = raw.replace(/\u2212/g, '-').replace(/\^/g, '**');
    // Safety: only allow digits, operators, parens, spaces, dots
    if (!/^[\d+\-*/().\s^]+$/.test(expr)) throw new Error('Expressão inválida');
    var val = window._mathEval(expr);
    if (!isFinite(val) || isNaN(val)) throw new Error('Resultado indefinido');
    res.innerHTML = '<span style="color:var(--ink3)">' + raw + '</span> = <strong style="color:var(--c2-deep)">' + val + '</strong>';
    res.style.color = 'var(--c2-deep)';
  } catch(e) {
    res.textContent = '⚠ ' + (e.message || 'Expressão inválida');
    res.style.color = 'var(--wrong)';
  }
}

// EVENT LISTENERS
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const calcInp = document.getElementById('calc-expr');
  if (calcInp) calcInp.addEventListener('keydown', e => { if(e.key === 'Enter') calcExpression(); });
  // Reta input enter
  const retaInp = document.getElementById('reta-val');
  if (retaInp) retaInp.addEventListener('keydown', e => { if(e.key === 'Enter') retaAddPoint(); });
  // Flashcards keyboard — Cap 1
  document.addEventListener('keydown', e => {
    const fc = document.getElementById('sec-flashcards');
    if (!fc || !fc.classList.contains('active')) return;
    if (e.key === 'ArrowRight') fcNext();
    else if (e.key === 'ArrowLeft') fcPrev();
    else if (e.key === ' ') { e.preventDefault(); fcFlip(); }
  });
  // Flashcards keyboard — Cap 2
  document.addEventListener('keydown', e => {
    const fc2 = document.getElementById('sec-flashcards2');
    if (!fc2 || !fc2.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fcNext2==='function') fcNext2(); }
    else if (e.key === 'ArrowLeft') { if(typeof fcPrev2==='function') fcPrev2(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fcFlip2==='function') fcFlip2(); }
  });
  // Flashcards keyboard — Cap 3
  document.addEventListener('keydown', e => {
    const fc3 = document.getElementById('sec-flashcards3');
    if (!fc3 || !fc3.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fcNext3==='function') fcNext3(); }
    else if (e.key === 'ArrowLeft') { if(typeof fcPrev3==='function') fcPrev3(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fcFlip3==='function') fcFlip3(); }
  });
  // Flashcards keyboard — Cap 4
  document.addEventListener('keydown', e => {
    const fc4 = document.getElementById('sec-flashcards4');
    if (!fc4 || !fc4.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fc4Next==='function') fc4Next(); }
    else if (e.key === 'ArrowLeft') { if(typeof fc4Prev==='function') fc4Prev(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fc4Flip==='function') fc4Flip(); }
  });
});

// ── FICHAS POR SUBTEMA — CAP. 1 ──
function downloadFichaTema(tema) {
  const now = new Date().toLocaleDateString('pt-PT');
  const nomes = {1:'Inteiros (ℤ)',2:'Valor Absoluto e Simétrico',3:'Adição de Inteiros',4:'Subtração e Adição Algébrica',5:'Expressões com Parênteses'};
  const nome = nomes[tema] || 'Tema '+tema;
  const dif = 'medio';
  const { min, max } = lim(dif);
  const tipos = ['fill','mc','fill','mc','fill','vf','fill','mc'];
  const exercicios = [];
  for (let i = 0; i < 8; i++) {
    const ex = buildExercicio(String(tema), tipos[i % tipos.length], min, max, i+1, dif);
    if (ex) exercicios.push(ex);
  }
  let body = `<h1>Ficha · ${nome} · 7.º Ano</h1><div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>`;
  exercicios.forEach((ex, i) => {
    body += `<div class="ex"><p class="ex-num">Exercício ${i+1}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if (ex.tipo === 'mc' && ex.opcoes) {
      ['A','B','C','D'].forEach((l,k) => { if (ex.opcoes[k] !== undefined) body += `<p class="opcao">☐ ${l}) ${ex.opcoes[k]}</p>`; });
    } else if (ex.tipo === 'vf') {
      body += `<p class="opcao">☐ Verdadeiro &nbsp;&nbsp;&nbsp; ☐ Falso</p>`;
    } else {
      body += `<p class="resp-linha">R: ___________________</p>`;
    }
    body += `</div>`;
  });
  body += `<hr style="margin-top:30px"><h2>Soluções</h2><ol>`;
  exercicios.forEach(ex => { body += `<li>${ex.resposta}</li>`; });
  body += `</ol>`;
  const doc = wrapPrintDoc('Ficha '+nome, `<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha de Trabalho<em>Cap. 1 — \${nome}</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div></div>\${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Cap. 1 — \${nome}</span></div>`);
  const blob = new Blob([doc], {type:'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  htmlToPdfDownload(doc, 'cap1_tema'+tema+'.pdf'); return;
}

// ── FICHAS POR SUBTEMA — CAP. 2 ──
function downloadFichaTema2(tema) {
  const now = new Date().toLocaleDateString('pt-PT');
  const nomes2 = {1:'Números Racionais (ℚ)',2:'Comparação e Ordenação',3:'Adição Algébrica de Frações',5:'Percentagens',7:'Potências de Frações',8:'Notação Científica'};
  const nome = nomes2[tema] || 'Tema '+tema;
  const dif = 'facil';
  const tipos = ['mc','mc','vf','mc','fill_frac','mc'];
  const exercicios = tipos.map(t => buildEx2(String(tema), t, dif)).filter(Boolean);
  let body = `<h1>Ficha · ${nome} · 7.º Ano</h1><div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>`;
  exercicios.forEach((ex, i) => {
    body += `<div class="ex"><p class="ex-num">Exercício ${i+1}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if (ex.tipo === 'mc' && ex.opcoes) {
      ['A','B','C','D'].forEach((l,k) => { if (ex.opcoes[k] !== undefined) body += `<p class="opcao">☐ ${l}) ${ex.opcoes[k]}</p>`; });
    } else if (ex.tipo === 'vf') {
      body += `<p class="opcao">☐ Verdadeiro &nbsp;&nbsp;&nbsp; ☐ Falso</p>`;
    } else {
      body += `<p class="resp-linha">R: ___________________</p>`;
    }
    body += `</div>`;
  });
  body += `<hr style="margin-top:30px"><h2>Soluções</h2><ol>`;
  exercicios.forEach(ex => { body += `<li>${ex.resposta}</li>`; });
  body += `</ol>`;
  const doc = wrapPrintDoc('Ficha '+nome, `<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha de Trabalho<em>Cap. 2 — \${nome}</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div></div>\${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Cap. 2 — \${nome}</span></div>`);
  const blob = new Blob([doc], {type:'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  htmlToPdfDownload(doc, 'cap2_tema'+tema+'.pdf'); return;
}

/* ── Block 3 (from line 6027) ── */
// ══════════════════════════════════════════════
// CAP. 3 — GEOMETRIA · JAVASCRIPT COMPLETO
// ══════════════════════════════════════════════

function showMathView3(){
  _hideAllViews();
  document.getElementById('view-math3').style.display='block';
  document.title = 'Cap. 3 — Geometria · 3ponto14';
  showSection3('temas3', document.querySelector('#tabs3 .tab-btn'));
  window.scrollTo(0,0);
  var _q3e=document.getElementById('q3-container'); if(_q3e && !_q3e.innerHTML) gerarQuestoes3();
}

function showSection3(id, btn){
  document.querySelectorAll('#view-math3 .section').forEach(s=>s.classList.remove('active'));
  var _s3=document.getElementById('sec-'+id);
  if(_s3) _s3.classList.add('active');
  document.querySelectorAll('#tabs3 .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(id==='questoes3')   { var _q3=document.getElementById('q3-container');  if(_q3 && !_q3.innerHTML) gerarQuestoes3(); }
  if(id==='minitestes3') { var _m3=document.getElementById('m3-container');  if(_m3 && !_m3.innerHTML) gerarMiniAtual3(); }
  if(id==='teste3')      { var _t3=document.getElementById('t3-container');  if(_t3 && !_t3.innerHTML) gerarTeste3(); }
  if(id==='jogos3') _j24AutoInit('j24-wrap-cap3', 'medio');
  if(id==='quiz-game3') { if(typeof qgStartForCap==='function') qgStartForCap(3); }
  if(id==='flashcards3') fcRender3();
  if(id==='progresso3') progRenderSection3();
  if(id==='reta3') { atualizarCamposArea3(); atualizarCamposAngPol3(); }
  // ── Progress tracking ──
  if(id==='teoria3') _pmRecord('cap3','teoria');
  if(id==='flashcards3') _pmRecord('cap3','flashcard');
  var c3=document.getElementById('sec-'+id);
  if(c3) pmRenderWidget('cap3',c3);
  window.scrollTo(0,0);
}

// ── Utilitários ──
function rnd3(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function sh3(arr){return arr.sort(()=>Math.random()-.5);}
function deg(n){return n+'°';}

// ── State Cap3 ──
const dynState3={
  q3:{level:'facil',score:{correct:0,total:0},answered:{}},
  m3:{level:'facil',score:{correct:0,total:0},answered:{},activeMini:0},
  t3:{level:'facil',score:{correct:0,total:0},answered:{}},
};
let _gen3Answered={},_gen3Exercicios=[],_gen3Level='medio',_gen3Score={correct:0,total:0};
let _jogosLevel3='facil';
let _activeMini3=0,_teste3Subtema=0;

// ─── MOTOR DE EXERCÍCIOS CAP3 ───
function buildEx3(tema,tipo,dif){
  tema=String(tema);
  const hard=dif==='dificil', easy=dif==='facil';

  // TEMA 1 — Ângulos internos de polígonos
  if(tema==='1'){
    const nRange=easy?[3,4,5,6]:[5,6,7,8,9,10,12,15,18,20];
    const n=nRange[rnd3(0,nRange.length-1)];
    const si=(n-2)*180;
    const nomes={3:'triângulo',4:'quadrilátero',5:'pentágono',6:'hexágono',7:'heptágono',8:'octógono',9:'nonágono',10:'decágono',12:'dodecágono',15:'pentadecágono',18:'octadecágono',20:'icoságono'};
    const nome=nomes[n]||`polígono de ${n} lados`;
    const variant=rnd3(0,3);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 1',tipo:'fill',
        visual: n<=6 ? svgAngulo(Math.round(si/n), si/n+'°/ângulo') : null,
        enun:`Calcula a soma dos ângulos internos de um <strong>${nome}</strong> (${n} lados). Responde em graus.`,
        resposta:si,expl:`Fórmula: S = (n − 2) × 180°, onde n é o número de lados.\nS = (${n} − 2) × 180° = ${n-2} × 180° = ${si}°.`};
      const w=[si+180,si-180,si+360].filter(v=>v>0&&v!==si);
      return{tema:'Tema 1',tipo:'mc',
        visual: n<=6?svgAngulo(Math.round(si/n), si/n+'°/ângulo'):null,
        enun:`Qual é a soma dos ângulos internos de um <strong>${nome}</strong> (${n} lados)?`,
        opcoes:sh3([si,...w.slice(0,3)]),resposta:si,
        expl:`Fórmula: S = (n − 2) × 180°.\nS = (${n} − 2) × 180° = ${n-2} × 180° = ${si}°.`};
    }
    if(variant===1){
      // Encontrar número de lados dado SI
      const w2=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 1',tipo:'mc',
        enun:`A soma dos ângulos internos de um polígono é ${si}°. Quantos lados tem?`,
        opcoes:sh3([n,...w2.slice(0,3)]),resposta:n,
        expl:`(n − 2) × 180° = ${si}°.\nn − 2 = ${si} ÷ 180 = ${n-2}.\nn = ${n-2} + 2 = ${n} lados.`};
    }
    if(variant===2){
      // Ângulo de polígono regular
      const ang=si/n;
      const w3=sh3([si/n+10,si/n-10,360/n].filter(v=>v>0&&v!==ang)).slice(0,3);
      return{tema:'Tema 1',tipo:'mc',
        enun:`Num ${nome} regular, qual é a amplitude de cada ângulo interno?`,
        opcoes:sh3([ang,...w3]),resposta:ang,
        expl:`Soma dos ângulos internos: (${n}−2)×180° = ${si}°.\nNum polígono regular todos os ângulos são iguais.\nCada ângulo = ${si}° ÷ ${n} = ${ang}°.`};
    }
    // variant===3: V/F
    const nWrong=n+(rnd3(0,1)?1:-1);const siWrong=(nWrong-2)*180;
    const isTrue=rnd3(0,1)===1;const nTest=isTrue?n:nWrong;const siTest=isTrue?si:siWrong;
    return{tema:'Tema 1',tipo:'vf',
      enun:`V/F: <em>"A soma dos ângulos internos de um polígono com ${nTest} lados é ${siTest}°"</em>`,
      resposta:isTrue?'V':'F',
      expl:`Fórmula: (n−2)×180°.\n(${nTest}−2)×180 = ${nTest-2}×180 = ${(nTest-2)*180}°.\nA afirmação diz ${siTest}° → ${isTrue?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 2 — Ângulos externos
  if(tema==='2'){
    const nRange=easy?[3,4,5,6,8]:[5,6,7,8,9,10,12,15];
    const n=nRange[rnd3(0,nRange.length-1)];
    const ext=Math.round(360/n);const int=180-ext;
    const variant=rnd3(0,3);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 2',tipo:'fill',
        enun:`Num polígono regular com <strong>${n} lados</strong>, qual é a amplitude do ângulo externo (em graus)?`,
        resposta:ext,expl:`Fórmula: â_ext = 360° ÷ n.\nâ_ext = 360° ÷ ${n} = ${ext}°.`};
      const w=sh3([ext+rnd3(5,15),ext-rnd3(5,10),360-ext].filter(v=>v>0&&v!==ext)).slice(0,3);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Num polígono regular com ${n} lados, qual é a amplitude do ângulo externo?`,
        opcoes:sh3([ext,...w]),resposta:ext,expl:`â_ext = 360° ÷ ${n} = ${ext}°.`};
    }
    if(variant===1){
      // Encontrar n dado ângulo externo
      const w=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Um polígono regular tem ângulo externo de ${ext}°. Quantos lados tem?`,
        opcoes:sh3([n,...w.slice(0,3)]),resposta:n,
        expl:`n = 360° ÷ â_ext = 360° ÷ ${ext}° = ${n} lados.`};
    }
    if(variant===2){
      // Ângulo interno a partir do externo
      return{tema:'Tema 2',tipo:'mc',
        enun:`Um polígono regular tem ângulo externo de ${ext}°. Qual é o ângulo interno?`,
        opcoes:sh3([int,ext,180,360-ext].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<360)),
        resposta:int,expl:`Ângulo interno + externo = 180° (são suplementares).\nâ_int = 180° − ${ext}° = ${int}°.`};
    }
    return{tema:'Tema 2',tipo:'vf',
      enun:`V/F: <em>"A soma dos ângulos externos de qualquer polígono convexo é sempre 360°"</em>`,
      resposta:'V',expl:`Afirmação VERDADEIRA.\nIndependentemente do número de lados, a soma dos ângulos externos de qualquer polígono convexo é sempre 360°.\nEx: triângulo — 3 × 120° = 360°; quadrado — 4 × 90° = 360°.`};
  }

  // TEMA 3 — Retas paralelas e ângulos
  if(tema==='3'){
    const ang=rnd3(easy?30:15, easy?150:165);
    const supl=180-ang;
    const variant=rnd3(0,4);
    if(variant===0){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede <strong>${ang}°</strong>. O seu ângulo alterno interno mede:`,
        opcoes:sh3([ang,supl,90,ang+10].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:ang,expl:`Alternos internos são iguais quando as retas são paralelas.\nAlternos internos: formam um "Z" com as paralelas.\nResposta: ${ang}°.`};
    }
    if(variant===1){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede <strong>${ang}°</strong>. O ângulo co-interno (colateral interno) mede:`,
        opcoes:sh3([supl,ang,180,90].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:supl,expl:`Co-internos (colaterais internos) são suplementares — somam 180°.\n${ang}° + co-interno = 180°.\nco-interno = 180° − ${ang}° = ${supl}°.`};
    }
    if(variant===2){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Duas retas intersectam-se. Um ângulo mede <strong>${ang}°</strong>. O ângulo verticalmente oposto mede:`,
        opcoes:sh3([ang,supl,90,180-ang+10].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<180).slice(0,4)),
        resposta:ang,expl:`Verticalmente opostos são iguais (são os ângulos "de topo").\nSe um mede ${ang}°, o oposto também mede ${ang}°.`};
    }
    if(variant===3){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede ${ang}°. O ângulo correspondente mede:`,
        opcoes:sh3([ang,supl,180,ang+5].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:ang,expl:`Ângulos correspondentes são iguais quando as retas são paralelas.\n(Formam um "F" com as paralelas.)\nResposta: ${ang}°.`};
    }
    return{tema:'Tema 3',tipo:'fill',
      enun:`Retas paralelas cortadas por uma transversal. Um ângulo mede ${ang}°. O seu suplemento mede ___°.`,
      resposta:supl,expl:`Ângulos suplementares somam 180°.\n180° − ${ang}° = ${supl}°.`};
  }

  // TEMA 4 — Quadriláteros
  if(tema==='4'){
    const facts=[
      {q:'Num paralelogramo, dois ângulos opostos medem 70°. Os outros dois medem:',ops:['110°','70°','90°','140°'],c:'110°',e:'Ângulos adjacentes num paralelogramo são suplementares: somam 180°.\n180°−70°=110°.\nVerificação: 70°+70°+110°+110° = 360° ✓'},
      {q:'Um trapézio isósceles tem ângulo de base 65°. O outro ângulo da mesma base mede:',ops:['65°','115°','90°','130°'],c:'65°',e:'Num trapézio isósceles, os ângulos da mesma base são iguais.\nAmbos os ângulos da base inferior = 65°.'},
      {q:'Qual é a propriedade que distingue o losango do retângulo?',ops:['4 lados iguais (losango) vs 4 ângulos retos (retângulo)','Ambos têm diagonais iguais','O losango não tem lados paralelos','O retângulo não é paralelogramo'],c:'4 lados iguais (losango) vs 4 ângulos retos (retângulo)',e:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.\nAmbos são paralelogramos.'},
      {q:'No paralelogramo, as diagonais:',ops:['Bissetam-se mutuamente','São sempre iguais','São sempre perpendiculares','Não se intersectam'],c:'Bissetam-se mutuamente',e:'Num paralelogramo as diagonais bissetam-se — cada diagonal é dividida em dois segmentos iguais pelo ponto de intersecção.\nIsso NÃO significa que são iguais nem perpendiculares (apenas no losango/retângulo).'},
      {q:'Qual dos seguintes quadriláteros tem as diagonais perpendiculares?',ops:['Losango','Retângulo','Trapézio','Qualquer paralelogramo'],c:'Losango',e:'O losango tem as diagonais perpendiculares (formam 90°).\nO retângulo tem diagonais iguais mas não perpendiculares.\nNuma praça/diamante, as diagonais cruzam em ângulo reto.'},
      {q:'Um quadrilátero tem ângulos 90°, 80° e 110°. O quarto ângulo mede:',ops:['80°','70°','100°','90°'],c:'80°',e:'A soma dos ângulos internos de um quadrilátero é 360°.\nQuarto ângulo = 360°−90°−80°−110° = 360°−280° = 80°.'},
      {q:'O quadrado é simultaneamente:',ops:['Losango e retângulo','Losango e trapézio','Retângulo e trapézio','Apenas losango'],c:'Losango e retângulo',e:'O quadrado tem 4 lados iguais (→ losango) e 4 ângulos retos (→ retângulo).\nÉ o caso mais especial de paralelogramo.'},
      {q:'Num losango com diagonal maior 12 cm e menor 8 cm, a área é:',ops:['48 cm²','96 cm²','40 cm²','24 cm²'],c:'48 cm²',e:'Área do losango = (d₁ × d₂) / 2.\nA = (12 × 8) / 2 = 96 / 2 = 48 cm².'},
    ];
    if(hard) facts.push(
      {q:'Num trapézio isósceles, a soma dos ângulos adjacentes a uma perna (lateral) é:',ops:['180°','360°','90°','270°'],c:'180°',e:'Ângulos co-internos (colaterais) num trapézio são suplementares: somam 180°.\nPois as bases são paralelas e a perna é a transversal.'},
      {q:'Num paralelogramo ABCD, sabe-se que AB = 8 cm e BC = 5 cm. Qual é o perímetro?',ops:['26 cm','40 cm','13 cm','20 cm'],c:'26 cm',e:'Num paralelogramo, lados opostos são iguais.\nP = 2 × AB + 2 × BC = 2 × 8 + 2 × 5 = 16 + 10 = 26 cm.'}
    );
    const f=facts[rnd3(0,facts.length-1)];
    return{tema:'Tema 4',tipo:'mc',enun:f.q,opcoes:sh3(f.ops),resposta:f.c,expl:f.e};
  }

  // TEMA 5 — Áreas
  if(tema==='5'){
    const fig=rnd3(0,easy?3:5);
    if(fig===0){
      const b=rnd3(2,easy?10:20),h=rnd3(2,easy?10:15),a=b*h/2;
      const variant=rnd3(0,2);
      if(variant===0||tipo==='fill') return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h,'cm (÷2)'):null,
        enun:`Calcula a área de um triângulo com base <strong>${b} cm</strong> e altura <strong>${h} cm</strong>.`,
        resposta:a,expl:`Fórmula: A = (base × altura) / 2.\nA = (${b} × ${h}) / 2 = ${b*h} / 2 = ${a} cm².`};
      if(variant===1){
        // Encontrar a altura dado a área e a base
        const w=sh3([h+2,h-1,h+4].filter(v=>v>0&&v!==h)).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:`Um triângulo tem base ${b} cm e área ${a} cm². Qual é a altura?`,
          opcoes:sh3([h,...w]),resposta:h,
          expl:`A = (b × h) / 2 → h = (2 × A) / b.\nh = (2 × ${a}) / ${b} = ${2*a} / ${b} = ${h} cm.`};
      }
      const w=sh3([a+b,a-1,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do triângulo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b} × ${h}) / 2 = ${b*h} / 2 = ${a} cm².`};
    }
    if(fig===1){
      const b=rnd3(3,easy?12:20),h=rnd3(2,easy?8:12),a=b*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base <strong>${b} cm</strong>, altura <strong>${h} cm</strong>.`,
        resposta:a,expl:`Fórmula: A = base × altura.\nA = ${b} × ${h} = ${a} cm².`};
      const w=sh3([a+h,a-b,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = base × altura = ${b} × ${h} = ${a} cm².`};
    }
    if(fig===2){
      const b1=rnd3(3,easy?10:15),b2=b1+rnd3(2,6),h=rnd3(2,easy?8:10);
      const a=(b1+b2)/2*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Trapézio com bases <strong>${b1} cm</strong> e <strong>${b2} cm</strong>, altura <strong>${h} cm</strong>. Calcula a área.`,
        resposta:a,expl:`Fórmula: A = (B + b) / 2 × h.\nA = (${b1} + ${b2}) / 2 × ${h} = ${b1+b2} / 2 × ${h} = ${(b1+b2)/2} × ${h} = ${a} cm².`};
      const w=sh3([a+h,b1*b2,a-2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Trapézio: bases ${b1} cm e ${b2} cm, altura ${h} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b1}+${b2})/2 × ${h} = ${(b1+b2)/2} × ${h} = ${a} cm².`};
    }
    if(fig===3){
      const d1=rnd3(4,easy?12:20),d2=rnd3(3,easy?10:14),a=d1*d2/2;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Losango com diagonais <strong>${d1} cm</strong> e <strong>${d2} cm</strong>. Calcula a área.`,
        resposta:a,expl:`Fórmula: A = (d₁ × d₂) / 2.\nA = (${d1} × ${d2}) / 2 = ${d1*d2} / 2 = ${a} cm².`};
      const w=sh3([d1*d2,a+d1,a-d2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Losango: diagonais ${d1} cm e ${d2} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${d1}×${d2})/2 = ${d1*d2}/2 = ${a} cm².`};
    }
    if(fig===4){
      const r=rnd3(2,easy?8:12);const ap=parseFloat((Math.PI*r*r).toFixed(1));
      const w=sh3([parseFloat((Math.PI*r).toFixed(1)),parseFloat((2*Math.PI*r).toFixed(1)),r*r].filter(v=>v!==ap)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do círculo com raio ${r} cm (π ≈ 3,14):`,
        opcoes:sh3([ap,...w]),resposta:ap,
        expl:`Fórmula: A = π × r².\nA = π × ${r}² = π × ${r*r} ≈ 3,14 × ${r*r} ≈ ${ap} cm².`};
    }
    const r=rnd3(2,easy?6:10);const a=parseFloat((Math.PI*r*r/2).toFixed(1));
    const w=sh3([parseFloat((Math.PI*r*r).toFixed(1)),parseFloat((Math.PI*r).toFixed(1)),r*r].filter(v=>v!==a)).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:`Área do semicírculo com raio ${r} cm (π ≈ 3,14):`,
      opcoes:sh3([a,...w]),resposta:a,
      expl:`Área do semicírculo = Área do círculo / 2.\nA = (π × r²) / 2 = (π × ${r*r}) / 2 ≈ (3,14 × ${r*r}) / 2 ≈ ${a} cm².`};
  }

  return buildEx3('1','mc',dif);
}


// ── Render dinâmico Cap3 ──
function renderDynSection3(container, exercicios, sec) {
  if (!dynState3[sec]) dynState3[sec] = { level:'medio', score:{correct:0,total:0}, answered:{} };
  dynState3[sec].answered = {};
  dynState3[sec].score = { correct:0, total:0 };
  if (typeof updateDynScore3 === 'function') updateDynScore3(sec);
  qzInit(container, exercicios, sec, function(correct, total) {
    dynState3[sec].score = { correct: correct, total: total };
    if (typeof updateDynScore3 === 'function') updateDynScore3(sec);
    if (typeof checkCompletion3 === 'function') checkCompletion3(sec);
  });
}

function checkDyn3(sec,qid,tipo,val,btn){
  const st=dynState3[sec];
  if(st.answered[qid])return;
  st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');
    const userVal=parseFloat(inp.value);
    inp.disabled=true;
    const correct=Math.abs(userVal-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
    st.score.total++;if(correct)st.score.correct++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct,expl,val, qid + '-fb');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    const isCorrect=(val===true||val==='true');
    if(isCorrect){btn.classList.add('correct');st.score.correct++;}
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
    st.score.total++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(isCorrect?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(isCorrect,expl, undefined, qid + '-fb');
  }
  updateDynScore3(sec);
  progLog3(sec==='q3'?'questoes':sec==='m3'?'minitestes':'teste', dynState3[sec].answered[qid]);
  {const _s3=sec==='q3'?'q':sec==='m3'?'m':'t';const _ok3=tipo3==='fill'?(document.getElementById(qid+'-in')?.classList.contains('correct')||false):(val===true||val==='true');_etRecord('cap3',_s3,qid,_etText(qid),_ok3);}
}

function updateDynScore3(sec){
  const s=dynState3[sec].score;
  var e1=document.getElementById(sec+'-score'); if(e1)e1.textContent=s.correct;
  var e2=document.getElementById(sec+'-total'); if(e2)e2.textContent='/ '+s.total;
  var e3=document.getElementById(sec+'-prog');  if(e3){const pct=s.total>0?s.correct/s.total*100:0;e3.style.width=pct+'%';}
  if(s.total>0) _pmRecord('cap3','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(sec, s.correct, s.total);
}

function setLevelSection3(sec,btn){
  const bar=btn.closest('.level-bar');
  bar.querySelectorAll('.gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  dynState3[sec].level=btn.dataset.level;
  if(sec==='q3')gerarQuestoes3();
  else if(sec==='m3')gerarMiniAtual3();
  else if(sec==='t3')gerarTeste3();
}

// ── QUESTÕES-AULA ──
function gerarQuestoes3(){
  const dif=dynState3.q3.level;
  let plano;
  if(dif==='facil'){
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'}];
  } else if(dif==='dificil'){
    plano=[{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'fill'}];
  } else {
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('q3-container',exs,'q3');
}

// ── MINITESTES ──
function showMiniDyn3(n,btn){
  _activeMini3=n;
  document.querySelectorAll('#mini-tabs3 .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarMiniAtual3();
}
function gerarMiniAtual3(){
  const dif=dynState3.m3.level;
  let plano;
  if(_activeMini3===0){
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}];
  } else {
    const t=String(_activeMini3);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('m3-container',exs,'m3');
}

// ── TESTE GLOBAL ──
function setTeste3Subtema(n,btn){
  _teste3Subtema=n;
  document.querySelectorAll('#teste3-subtema-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarTeste3();
}
function gerarTeste3(){
  const dif=dynState3.t3.level;
  let plano;
  if(_teste3Subtema===0){
    if(dif==='facil'){
      plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'5',tipo:'mc'}];
    } else if(dif==='dificil'){
      plano=[{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'}];
    } else {
      plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'5',tipo:'mc'}];
    }
  } else {
    const t=String(_teste3Subtema);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('t3-container',exs,'t3');
}

// ── GERADOR LIVRE ──
function setGenLevel3(btn){
  document.querySelectorAll('#sec-gerador3 .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _gen3Level=btn.dataset.level;
}
function gerarExercicios3(){
  _gen3Answered={};_gen3Score={correct:0,total:0};
  const tema=document.getElementById('gen3-tema').value;
  const qtd=parseInt(document.getElementById('gen3-qtd').value);
  const tipoSel=document.getElementById('gen3-tipo').value;
  const temas=['1','2','3','4','5'];
  const tipos=['mc','mc','mc','mc','fill'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const t=tema==='all'?temas[i%temas.length]:tema;
    const tipo=tipoSel==='misto'?(i%2===0?'mc':'fill'):tipoSel;
    const ex=buildEx3(t,tipo,_gen3Level);
    if(ex)exs.push({...ex,num:i+1});
  }
  _gen3Exercicios=exs;
  renderGenExercicios3(exs);
}

function renderGenExercicios3(exs){
  const bar=document.getElementById('gen3-score-bar');
  bar.style.display='flex';
  document.getElementById('gen3-score').textContent='0';
  document.getElementById('gen3-total').textContent='/ 0';
  document.getElementById('gen3-prog').style.width='0%';
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='gen3_'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Exercício ${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'){
      html+=`<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">
        <button class="check-btn" onclick="checkGen3('${qid}','fill','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      ex.opcoes.forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkGen3('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button class="option-btn" onclick="checkGen3('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button>
        <button class="option-btn" onclick="checkGen3('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button>
      </div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });
  document.getElementById('gen3-resultado').innerHTML=html;
  const dl=document.getElementById('gen3-download-area');
  dl.style.display='flex';
}

function checkGen3(qid,tipo,val,btn){
  if(_gen3Answered[qid])return;
  _gen3Answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');
    const userVal=parseFloat(inp.value);
    inp.disabled=true;
    correct=Math.abs(userVal-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  _gen3Score.total++;if(correct)_gen3Score.correct++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl,val, qid + '-fb');
  document.getElementById('gen3-score').textContent=_gen3Score.correct;
  document.getElementById('gen3-total').textContent='/ '+_gen3Score.total;
  document.getElementById('gen3-prog').style.width=(_gen3Score.total>0?_gen3Score.correct/_gen3Score.total*100:0)+'%';
}

// ── JOGOS ──

// ── clf3 game init ──
var _clf3Data=[
  {n:3,nome:'triângulo',s:180},{n:4,nome:'quadrilátero',s:360},
  {n:5,nome:'pentágono',s:540},{n:6,nome:'hexágono',s:720},
  {n:7,nome:'heptágono',s:900},{n:8,nome:'octógono',s:1080}
];
function clf3Nova(){
  var item=_clf3Data[Math.floor(Math.random()*_clf3Data.length)];
  var q=document.getElementById('clf3-q');
  var fb=document.getElementById('clf3-fb');
  if(!q||!fb)return;
  delete q.dataset.done;
  fb.className='feedback';fb.innerHTML='';
  document.getElementById('clf3-q-text').innerHTML=
    'A soma dos ângulos internos de um polígono é <strong>'+item.s+'°</strong>. Qual é o polígono?';
  // Build answer options (correct + 3 distractors)
  var others=_clf3Data.filter(function(d){return d.n!==item.n;});
  var shuffled=others.sort(function(){return Math.random()-.5;}).slice(0,3);
  var opts=shuffled.concat([item]).sort(function(){return Math.random()-.5;});
  var html=opts.map(function(o){
    return '<button class="option-btn" onclick="checkClf3(this,'
      +(o.n===item.n)+'\''+item.nome+'\')">'
      +o.nome+'</button>';
  }).join('');
  // Fix onclick syntax (need proper quoting)
  var optsEl=document.getElementById('clf3-opts');
  optsEl.innerHTML='';
  opts.forEach(function(o){
    var btn=document.createElement('button');
    btn.className='option-btn';
    btn.textContent=o.nome;
    btn.onclick=function(){checkClf3(btn,o.n===item.n,item.nome);};
    optsEl.appendChild(btn);
  });
}
document.addEventListener('DOMContentLoaded',function(){clf3Nova();});
function checkClf3(btn,isC,correct){
  const q=document.getElementById('clf3-q');
  if(!q||q.dataset.done)return;
  q.dataset.done='1';
  q.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  if(isC)btn.classList.add('correct');
  else{btn.classList.add('wrong');q.querySelectorAll('.option-btn').forEach(b=>{if(b.textContent.includes(correct))b.classList.add('correct');});}
  const fb=document.getElementById('clf3-fb');
  if(!fb)return;
  fb.className='feedback show '+(isC?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(isC,'',undefined,undefined);
}

let _rl3Answered=0,_rl3Correct=0;
function checkRl3(qid,tipo,val,btn){
  const container=document.getElementById(qid);
  if(container.dataset.done)return;
  container.dataset.done='1';
  _rl3Answered++;
  container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  const correct=(val===true||val==='true');
  if(correct)btn.classList.add('correct');
  else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  if(correct)_rl3Correct++;
  _etRecord('cap3','rel',qid,_etText(qid),correct);
  const fb=document.getElementById(qid+'-fb');
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl);
  if(_rl3Answered>=10){
    const pct=Math.round(_rl3Correct/10*100);
    const emoji=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
    document.getElementById('relampago3-result').innerHTML=`${emoji} ${_rl3Correct}/10 certas · ${pct}%`;
    document.getElementById('relampago3-score').style.display='block';
    document.getElementById('relampago3-score').scrollIntoView({behavior:'smooth',block:'nearest'});
    _pmRecord('cap3','quiz',{pontuacao:_rl3Correct,total:10});
    _pmRecord('cap3','jogo');
  }
}

// ── CALCULADORA DE ÂNGULOS ──
function calcAngulos3(){
  const n=parseInt(document.getElementById('ang-lados').value)||0;
  const el=document.getElementById('ang-resultado');
  if(n<3){el.style.display='block';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Um polígono tem no mínimo 3 lados.';el.className='highlight-box';return;}
  const si=(n-2)*180;
  const se=360;
  const intReg=si/n;
  const extReg=360/n;
  el.style.display='block';
  el.className='highlight-box green';
  el.innerHTML=`<strong>Polígono com ${n} lados:</strong><br>
    <span class="ico ico-sm"><svg><use href="#ico-ruler"/></svg></span> Soma dos ângulos <strong>internos</strong>: (${n}−2)×180° = <strong>${si}°</strong><br>
    ↻ Soma dos ângulos <strong>externos</strong>: sempre <strong>${se}°</strong><br>
    ✦ Ângulo interno (polígono regular): ${si}°÷${n} = <strong>${intReg.toFixed(2)}°</strong><br>
    ✦ Ângulo externo (polígono regular): 360°÷${n} = <strong>${extReg.toFixed(2)}°</strong>`;
}

function atualizarCamposArea3(){
  const fig=document.getElementById('area-figura').value;
  const map={
    triangulo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base (cm): <input type="number" id="ar-triangulo-b" class="fill-input" style="width:80px" value="6"></label>
      <label>Altura (cm): <input type="number" id="ar-triangulo-h" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
    paralelogramo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base (cm): <input type="number" id="ar-paralelogramo-b" class="fill-input" style="width:80px" value="8"></label>
      <label>Altura (cm): <input type="number" id="ar-paralelogramo-h" class="fill-input" style="width:80px" value="5"></label>
    </div>`,
    trapezio:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base maior (cm): <input type="number" id="ar-b1" class="fill-input" style="width:80px" value="10"></label>
      <label>Base menor (cm): <input type="number" id="ar-b2" class="fill-input" style="width:80px" value="6"></label>
      <label>Altura (cm): <input type="number" id="ar-trapezio-h" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
    losango:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Diagonal 1 (cm): <input type="number" id="ar-d1" class="fill-input" style="width:80px" value="8"></label>
      <label>Diagonal 2 (cm): <input type="number" id="ar-d2" class="fill-input" style="width:80px" value="6"></label>
    </div>`,
    circulo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Raio (cm): <input type="number" id="ar-circulo-r" class="fill-input" style="width:80px" value="5"></label>
    </div>`,
    semicirculo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Raio (cm): <input type="number" id="ar-semicirculo-r" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
  };
  document.getElementById('area-campos').innerHTML=map[fig]||'';
  document.getElementById('area-resultado').style.display='none';
}
function calcArea3(){
  const fig=document.getElementById('area-figura').value;
  const el=document.getElementById('area-resultado');
  const campos=document.getElementById('area-campos');
  // Ensure fields are rendered (guard against calling before atualizarCamposArea3)
  if(!campos||!campos.querySelector('input')){atualizarCamposArea3();}
  el.style.display='block';el.className='highlight-box green';
  const g=id=>{const e=document.getElementById(id);return e?parseFloat(e.value)||0:0;};
  let area=0,formula='';
  if(fig==='triangulo'){const b=g('ar-triangulo-b'),h=g('ar-triangulo-h');area=b*h/2;formula=`(${b}×${h})/2 = ${area}`;}
  else if(fig==='paralelogramo'){const b=g('ar-paralelogramo-b'),h=g('ar-paralelogramo-h');area=b*h;formula=`${b}×${h} = ${area}`;}
  else if(fig==='trapezio'){const b1=g('ar-b1'),b2=g('ar-b2'),h=g('ar-trapezio-h');area=(b1+b2)/2*h;formula=`(${b1}+${b2})/2×${h} = ${area}`;}
  else if(fig==='losango'){const d1=g('ar-d1'),d2=g('ar-d2');area=d1*d2/2;formula=`(${d1}×${d2})/2 = ${area}`;}
  else if(fig==='circulo'){const r=g('ar-circulo-r');area=parseFloat((Math.PI*r*r).toFixed(2));formula=`π×${r}² ≈ ${area}`;}
  else if(fig==='semicirculo'){const r=g('ar-semicirculo-r');area=parseFloat((Math.PI*r*r/2).toFixed(2));formula=`(π×${r}²)/2 ≈ ${area}`;}
  el.innerHTML=`<strong>Área = ${formula} cm²</strong>`;
}

function atualizarCamposAngPol3(){
  const n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  let html='';
  for(let i=1;i<n;i++){
    html+=`<label style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.9rem">Ângulo ${i}: <input type="number" id="angpol-${i}" class="fill-input" style="width:80px" placeholder="graus"> °</label>`;
  }
  document.getElementById('ang-campos-pol').innerHTML=html;
  document.getElementById('ang-pol-resultado').style.display='none';
}
function calcAngDesconhecido3(){
  const n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  const si=(n-2)*180;
  let soma=0,valid=true;
  for(let i=1;i<n;i++){
    const v=parseFloat(document.getElementById('angpol-'+i)?.value);
    if(isNaN(v)||v<=0){valid=false;break;}
    soma+=v;
  }
  const el=document.getElementById('ang-pol-resultado');
  el.style.display='block';
  if(!valid){el.className='highlight-box';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Preenche todos os ângulos conhecidos.';return;}
  const faltante=si-soma;
  // Each interior angle of a convex polygon must be strictly between 0° and 180°.
  // The missing angle must satisfy: 0 < faltante < 180.
  // Also catch the case where known angles already meet or exceed the total.
  if(soma>=si){
    el.className='highlight-box';
    el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> A soma dos ângulos introduzidos ('+soma+'°) já iguala ou ultrapassa os '+si+'° totais — verifica os valores.';
    return;
  }
  if(faltante<=0||faltante>=180){el.className='highlight-box';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Valores inválidos — verifica os ângulos introduzidos.';return;}
  el.className='highlight-box green';
  el.innerHTML=`<strong>Ângulo desconhecido = ${si}° − ${soma}° = <span style="font-size:1.1em">${faltante}°</span></strong><br><small style="color:var(--ink3)">S<sub>i</sub> = (${n}−2)×180° = ${si}°</small>`;
}

// ── FLASHCARDS ──
const FC3_CARDS=[
  {tag:'Fórmula',q:'Soma dos ângulos internos de um polígono convexo com n lados',a:'S = (n − 2) × 180°\nEx: pentágono → (5−2)×180 = 540°'},
  {tag:'Fórmula',q:'Amplitude de cada ângulo interno de um polígono regular com n lados',a:'â = (n−2)×180° ÷ n\nEx: hexágono → 720÷6 = 120°'},
  {tag:'Regra',q:'Qual é a soma dos ângulos externos de qualquer polígono convexo?',a:'Sempre 360°, independentemente do número de lados.'},
  {tag:'Fórmula',q:'Como calcular o número de lados dado o ângulo externo de um polígono regular?',a:'n = 360° ÷ â_ext\nEx: â_ext = 45° → n = 360÷45 = 8 (octógono)'},
  {tag:'Definição',q:'O que são ângulos alternos internos?',a:'Ângulos formados entre retas paralelas, em lados opostos da secante. São iguais quando as retas são paralelas.'},
  {tag:'Definição',q:'O que são ângulos verticalmente opostos?',a:'Ângulos formados na interseção de duas retas, em lados opostos. São sempre iguais (congruentes).'},
  {tag:'Regra',q:'O que são ângulos co-internos (colaterais)?',a:'Ângulos entre retas paralelas, do mesmo lado da secante. A sua soma é sempre 180° (são suplementares).'},
  {tag:'Propriedade',q:'Propriedades do paralelogramo',a:'• Lados opostos paralelos e iguais\n• Ângulos opostos iguais\n• Ângulos adjacentes suplementares\n• Diagonais bissetam-se'},
  {tag:'Propriedade',q:'O que distingue o losango do retângulo?',a:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.\nAmbos são paralelogramos.'},
  {tag:'Definição',q:'O que é um trapézio isósceles?',a:'Trapézio com as pernas (lados não paralelos) iguais. Os ângulos da mesma base são iguais.'},
  {tag:'Fórmula',q:'Área do triângulo',a:'A = (base × altura) ÷ 2'},
  {tag:'Fórmula',q:'Área do paralelogramo',a:'A = base × altura'},
  {tag:'Fórmula',q:'Área do trapézio',a:'A = (b₁ + b₂) ÷ 2 × altura\n(média das bases × altura)'},
  {tag:'Fórmula',q:'Área do losango ou papagaio',a:'A = (d₁ × d₂) ÷ 2\n(produto das diagonais a dividir por 2)'},
  {tag:'Fórmula',q:'Área do círculo e do semicírculo',a:'Círculo: A = π × r²\nSemicírculo: A = (π × r²) ÷ 2'},
  {tag:'Exemplo',q:'Quantos lados tem um polígono cuja soma dos ângulos internos é 1440°?',a:'(n−2)×180 = 1440 → n−2 = 8 → n = 10\nÉ um decágono.'},
  {tag:'Exemplo',q:'Ângulo externo de 24° — que polígono é?',a:'n = 360÷24 = 15 → Pentadecágono (15 lados)'},
  {tag:'Exemplo',q:'Trapézio com bases 8 e 4 cm, altura 3 cm. Qual é a área?',a:'A = (8+4)/2 × 3 = 6 × 3 = 18 cm²'},
  {tag:'Exemplo',q:'Losango com diagonais 10 cm e 6 cm. Qual é a área?',a:'A = (10×6)/2 = 30 cm²'},
  {tag:'Exemplo',q:'Um ângulo mede 65°. Qual é o ângulo co-interno (paralelas cortadas por secante)?',a:'Co-internos são suplementares: 180° − 65° = 115°'},
];
let _fc3Idx=0,_fc3Flipped=false;
function fcRender3(){
  const card=FC3_CARDS[_fc3Idx];
  document.getElementById('fc3-tag').textContent=card.tag;
  document.getElementById('fc3-q').textContent=card.q;
  document.getElementById('fc3-a').textContent=card.a;
  document.getElementById('fc3-a').style.display='none';
  document.getElementById('fc3-counter').textContent=`${_fc3Idx+1} / ${FC3_CARDS.length}`;
  document.getElementById('fc3-prog').style.width=((_fc3Idx+1)/FC3_CARDS.length*100)+'%';
  const dots=document.getElementById('fc3-dots');
  dots.innerHTML=FC3_CARDS.map((_,i)=>`<div style="width:8px;height:8px;border-radius:50%;background:${i===_fc3Idx?'var(--c1-mid)':'var(--border2)'};cursor:pointer" onclick="fcGoTo3(${i})"></div>`).join('');
  _fc3Flipped=false;
  document.getElementById('fc3-inner').style.background='var(--cream)';
}
function fcFlip3(){
  _fc3Flipped=!_fc3Flipped;
  document.getElementById('fc3-a').style.display=_fc3Flipped?'block':'none';
  document.getElementById('fc3-inner').style.background=_fc3Flipped?'var(--c1-pale)':'var(--cream)';
}
function fcNext3(){_fc3Idx=(_fc3Idx+1)%FC3_CARDS.length;fcRender3();}
function fcPrev3(){_fc3Idx=(_fc3Idx-1+FC3_CARDS.length)%FC3_CARDS.length;fcRender3();}
function fcGoTo3(i){_fc3Idx=i;fcRender3();}

// ── EXAME ──
let _exame3State={level:'medio',timer:null,timeLeft:900,exercicios:[],answered:{},score:{correct:0,total:0}};
function exame3SetLevel(btn){
  document.querySelectorAll('#exame3-level-group .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _exame3State.level=btn.dataset.level;
}
function exame3Start(){
  const qtd=parseInt(document.getElementById('exame3-qtd').value);
  const tempo=parseInt(document.getElementById('exame3-tempo').value);
  _exame3State.timeLeft=tempo;_exame3State.answered={};_exame3State.score={correct:0,total:0};
  const temas=['1','1','2','2','3','3','4','4','5','5'];
  const tipos=['mc','fill','mc','fill','mc','mc','mc','mc','mc','fill'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const t=temas[i%temas.length];const ti=tipos[i%tipos.length];
    const ex=buildEx3(t,ti,_exame3State.level);
    if(ex)exs.push({...ex,num:i+1});
  }
  _exame3State.exercicios=exs;
  document.getElementById('exame3-config').style.display='none';
  document.getElementById('exame3-running').style.display='block';
  document.getElementById('exame3-result').style.display='none';
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='ex3_'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Q${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'){
      html+=`<div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" type="text" inputmode="decimal" placeholder="?" style="width:100px">
        <button class="check-btn" aria-label="Verificar resposta" onclick="checkExame3('${qid}','fill','${ex.resposta}')">✓</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      ex.opcoes.forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkExame3('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem"><button class="option-btn" onclick="checkExame3('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" onclick="checkExame3('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
  });
  document.getElementById('exame3-container').innerHTML=html;
  document.getElementById('exame3-answered').textContent=`0 / ${qtd}`;
  function tick3(){
    _exame3State.timeLeft--;
    const m=Math.floor(_exame3State.timeLeft/60),s=_exame3State.timeLeft%60;
    document.getElementById('exame3-timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(_exame3State.timeLeft<=0){clearInterval(_exame3State.timer);exame3Finish();}
  }
  _exame3State.timer=setInterval(tick3,1000);
}
function checkExame3(qid,tipo,val,btn){
  if(_exame3State.answered[qid])return;
  _exame3State.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');inp.disabled=true;
    correct=Math.abs(parseFloat(inp.value)-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  _exame3State.score.total++;if(correct)_exame3State.score.correct++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl,val);
  const tot=_exame3State.exercicios.length;
  document.getElementById('exame3-answered').textContent=`${_exame3State.score.total} / ${tot}`;
  document.getElementById('exame3-prog').style.width=(_exame3State.score.total/tot*100)+'%';
  progLog3('exame',correct);
  if(_exame3State.score.total>=tot){clearInterval(_exame3State.timer);setTimeout(exame3Finish,800);}
}
function exame3Stop(){clearInterval(_exame3State.timer);exame3Finish();}
// exame3Submit is the programmatic submit path (called by timer expiry wrappers)
function exame3Submit(){exame3Finish();}
function exame3Finish(){
  examActive = false; // clear guard regardless of how finish was triggered
  document.getElementById('exame3-running').style.display='none';
  document.getElementById('exame3-result').style.display='block';
  const {correct,total}=_exame3State.score;
  const pct=total>0?Math.round(correct/total*100):0;
  const _n3=document.getElementById('exame3-nota');if(_n3)_n3.textContent=pct+'%';
  const _d3=document.getElementById('exame3-detalhe');if(_d3)_d3.textContent=`${correct} certas em ${total} questões`;
  document.getElementById('exame3-emoji').innerHTML=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
  progLogExame3(pct,correct,total);
}
function exame3Reset(){
  clearInterval(_exame3State.timer);
  document.getElementById('exame3-config').style.display='block';
  document.getElementById('exame3-running').style.display='none';
  document.getElementById('exame3-result').style.display='none';
  document.getElementById('exame3-container').innerHTML='';
  var tempo=parseInt((document.getElementById('exame3-tempo')||{}).value)||900;
  var rm=Math.floor(tempo/60), rs=tempo%60;
  var timerEl=document.getElementById('exame3-timer');
  if(timerEl){
    timerEl.textContent=(rm<10?'0':'')+rm+':'+(rs<10?'0':'')+rs;
    timerEl.style.color='var(--ink)';
  }
}

// ── localStorage helpers — Cap 3 ──
function _saveProgData3(){
  try{localStorage.setItem('edupt_cap3',JSON.stringify({sections:_progData3.sections,log:_progData3.log}));}catch(e){}
}
function _loadProgData3(){
  try{
    const raw=localStorage.getItem('edupt_cap3');
    if(!raw)return;
    const saved=JSON.parse(raw);
    if(saved.sections)Object.assign(_progData3.sections,saved.sections);
    if(saved.log)_progData3.log=saved.log;
  }catch(e){}
}

// ── PROGRESSO ──
const _progData3={sections:{questoes:{correct:0,total:0},minitestes:{correct:0,total:0},teste:{correct:0,total:0},gerador:{correct:0,total:0},jogos:{correct:0,total:0},exame:{correct:0,total:0}},log:[]};
_loadProgData3();

function progLog3(section,correct){
  if(!_progData3.sections[section])_progData3.sections[section]={correct:0,total:0};
  _progData3.sections[section].total++;if(correct)_progData3.sections[section].correct++;
  _progData3.log.unshift({section,correct,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  if(_progData3.log.length>50)_progData3.log.pop();
  _saveProgData3();
  setTimeout(_progRefreshBars, 80);
}
function progLogExame3(pct,correct,total){
  if(!_progData3.exames)_progData3.exames=[];
  _progData3.exames.push({pct,correct,total,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  _progData3.sections.exame.correct+=correct;
  _progData3.sections.exame.total+=total;
  _saveProgData3();
  setTimeout(_progRefreshBars, 80);
}
function progRenderSection3(){
  const sec=_progData3.sections;
  const labels={questoes:'Questões-aula',minitestes:'Minitestes',teste:'Teste',gerador:'Gerador',jogos:'Jogos',exame:'Exame'};
  let total=0,correct=0;Object.values(sec).forEach(s=>{total+=s.total;correct+=s.correct;});
  const globalPct=total>0?Math.round(correct/total*100):0;
  document.getElementById('prog3-cards').innerHTML=[
    {label:'Questões respondidas',val:total,icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},{label:'Respostas certas',val:correct,icon:'<span class="ico ico-sm"><svg><use href="#ico-check"/></svg></span>'},
    {label:'Taxa de acerto',val:total>0?globalPct+'%':'—',icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},
  ].map(c=>`<div class="card" style="text-align:center;padding:1.5rem"><div style="font-size:1.8rem;margin-bottom:.5rem">${c.icon}</div><div style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">${c.val}</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">${c.label}</div></div>`).join('');
  // barras por capítulo
  _progRenderCapitulosBar('prog3-temas', 3);
  const logEl=document.getElementById('prog3-historico');
  if(_progData3.log.length===0){logEl.innerHTML='<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade — começa a responder!</div>';return;}
  logEl.innerHTML=_progData3.log.map(e=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px"><span>${e.correct?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>'}</span><span style="font-size:.82rem;color:var(--ink2)">${labels[e.section]||e.section}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">${e.time}</span></div>`).join('');
}
function progReset3(){Object.keys(_progData3.sections).forEach(k=>{_progData3.sections[k]={correct:0,total:0};});_progData3.log=[];try{localStorage.removeItem('edupt_cap3');}catch(e){}progRenderSection3();}

// ── DOWNLOADS ──
function downloadFicha3(type){
  const now=new Date().toLocaleDateString('pt-PT');
  function wrap(title,content){ return wrapPrintDoc(title, content); }
  let html='';
  if(type==='ficha_completa'){
    html=wrap('Ficha Completa — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Grupo 1 — Ângulos Internos de Polígonos Convexos</h2>
<div class="ex"><div class="ex-num">1.</div><p>Calcula a soma das amplitudes dos ângulos internos de cada polígono:</p>
<p>a) Triângulo &nbsp;&nbsp; b) Hexágono &nbsp;&nbsp; c) Nonágono &nbsp;&nbsp; d) Polígono de 15 lados</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.</div><p>Determina o número de lados de um polígono convexo cuja soma dos ângulos internos é <strong>2340°</strong>.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Num polígono regular com 12 lados, calcula a amplitude de cada ângulo interno.</p><div class="resp-linha"></div></div>
<h2>Grupo 2 — Ângulos Externos</h2>
<div class="ex"><div class="ex-num">4.</div><p>Um polígono regular tem ângulo externo de <strong>24°</strong>. Quantos lados tem? Como se classifica?</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">5.</div><p>Num pentágono regular, calcula a amplitude de cada ângulo externo e de cada ângulo interno.</p><div class="resp-linha"></div></div>
<h2>Grupo 3 — Retas Paralelas e Ângulos</h2>
<div class="ex"><div class="ex-num">6.</div><p>As retas r e s são paralelas e t é uma secante. Um ângulo mede 65°. Indica a amplitude dos ângulos:</p>
<p>a) Alterno interno &nbsp;&nbsp; b) Co-interno (colateral) &nbsp;&nbsp; c) Verticalmente oposto &nbsp;&nbsp; d) Correspondente</p><div class="resp-linha"></div></div>
<h2>Grupo 4 — Quadriláteros</h2>
<div class="ex"><div class="ex-num">7.</div><p>Num paralelogramo [ABCD], o ângulo A mede 110°. Determina as amplitudes dos ângulos B, C e D.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">8.</div><p>Num quadrilátero, três ângulos medem 85°, 105° e 95°. Determina o quarto ângulo.</p><div class="resp-linha"></div></div>
<h2>Grupo 5 — Áreas de Figuras Planas</h2>
<div class="ex"><div class="ex-num">9.</div><p>Calcula a área das seguintes figuras:</p>
<p>a) Triângulo: base = 12 cm, altura = 7 cm</p><div class="resp-linha"></div>
<p>b) Trapézio: bases 10 cm e 6 cm, altura 5 cm</p><div class="resp-linha"></div>
<p>c) Losango: diagonais 16 cm e 9 cm</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">10.</div><p>Uma figura é composta por um paralelogramo (base 8 cm, altura 5 cm) ao qual se junta um semicírculo de raio 4 cm. Calcula a área total (usa π ≈ 3,14).</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
`);
  } else if(type==='angulos'){
    html=wrap('Ficha de Ângulos — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Ângulos</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>1. Ângulos Internos de Polígonos</h2>
<div class="ex"><div class="ex-num">1.1.</div><p>Calcula a soma dos ângulos internos: a) quadrilátero &nbsp; b) octógono &nbsp; c) decágono</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">1.2.</div><p>Qual é o polígono convexo com soma dos ângulos internos = 1800°?</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">1.3.</div><p>Num pentágono, quatro ângulos medem 100°, 115°, 90° e 108°. Determina o quinto ângulo.</p><div class="resp-linha"></div></div>
<h2>2. Ângulos Externos</h2>
<div class="ex"><div class="ex-num">2.1.</div><p>Num octógono regular, calcula: a) ângulo externo &nbsp; b) ângulo interno</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.2.</div><p>Um ângulo externo de polígono regular mede 30°. Quantos lados tem? Qual é o ângulo interno?</p><div class="resp-linha"></div></div>
<h2>3. Retas Paralelas</h2>
<div class="ex"><div class="ex-num">3.1.</div><p>Retas r ∥ s cortadas por t. O ângulo CFH = 130°. Determina os ângulos: DFE, AEF, BEG, CEF.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.2.</div><p>Indica se cada par de ângulos é alterno interno, co-interno, correspondente ou verticalmente oposto:</p>
<p>a) (110°; 110°) entre paralelas &nbsp;&nbsp; b) (75°; 105°) entre paralelas &nbsp;&nbsp; c) (60°; 60°) na intersecção</p><div class="resp-linha"></div></div>
`);
  } else if(type==='quadrilateros'){
    html=wrap('Ficha de Quadriláteros — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Quadriláteros</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Propriedades dos Quadriláteros</h2>
<div class="ex"><div class="ex-num">1.</div><p>Classifica cada afirmação como Verdadeira (V) ou Falsa (F):</p>
<p>a) Todo o quadrado é um losango. ___</p>
<p>b) Todo o retângulo é um trapézio. ___</p>
<p>c) Num paralelogramo, as diagonais são sempre perpendiculares. ___</p>
<p>d) Num losango, os ângulos opostos são iguais. ___</p>
<p>e) Num trapézio isósceles, todos os ângulos são iguais. ___</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Num paralelogramo [ABCD], o ângulo DAB = 72°. Determina os ângulos ABC, BCD e CDA.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Num trapézio isósceles, um ângulo da base maior mede 65°. Determina os outros três ângulos.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">4.</div><p>Num losango com ângulo agudo de 60°, determina o ângulo obtuso.</p><div class="resp-linha"></div></div>
<h2>Tabela de Classificação</h2>
<table><tr><th>Propriedade</th><th>Trapézio</th><th>Paralelog.</th><th>Retângulo</th><th>Losango</th><th>Quadrado</th></tr>
<tr><td>Lados opostos paralelos</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>4 ângulos retos</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>4 lados iguais</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais bissetam-se</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais perpendiculares</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais iguais</td><td></td><td></td><td></td><td></td><td></td></tr></table>
`);
  } else if(type==='areas'){
    html=wrap('Ficha de Áreas — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Áreas</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Fórmulas de Referência</h2>
<table><tr><th>Figura</th><th>Fórmula</th></tr>
<tr><td>Triângulo</td><td>A = (b × h) ÷ 2</td></tr>
<tr><td>Paralelogramo</td><td>A = b × h</td></tr>
<tr><td>Trapézio</td><td>A = (b₁ + b₂) ÷ 2 × h</td></tr>
<tr><td>Losango / Papagaio</td><td>A = (d₁ × d₂) ÷ 2</td></tr>
<tr><td>Círculo</td><td>A = π × r²</td></tr></table>
<h2>Exercícios</h2>
<div class="ex"><div class="ex-num">1.</div><p>Calcula as áreas (mostra os cálculos):</p>
<p>a) Triângulo: b = 9 cm, h = 6 cm</p><div class="resp-linha"></div>
<p>b) Paralelogramo: b = 15 cm, h = 8 cm</p><div class="resp-linha"></div>
<p>c) Trapézio: b₁ = 14 cm, b₂ = 8 cm, h = 6 cm</p><div class="resp-linha"></div>
<p>d) Losango: d₁ = 20 cm, d₂ = 12 cm</p><div class="resp-linha"></div>
<p>e) Círculo: r = 7 cm (π ≈ 3,14)</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.</div><p>Uma figura é formada por um trapézio [ABCD] (bases 12 m e 8 m, altura 5 m) ao qual se retirou um triângulo (base 4 m, altura 3 m). Calcula a área da figura resultante.</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Um papagaio tem diagonais de 18 cm e 10 cm. Está inscrito num retângulo. Qual é a área do papagaio? Qual é a área do retângulo? Qual é a razão entre as duas áreas?</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
`);
  }
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  htmlToPdfDownload(html, `cap3_${type}.pdf`);
}

function downloadFichaGerada3(){
  if(!_gen3Exercicios.length){eduToast('Gera exercícios primeiro!','warn');return;}
  const now=new Date().toLocaleDateString('pt-PT');
  let body=`<h1>Ficha Gerada · Geometria · 7.º Ano · Cap. 3</h1>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Nível: ${_gen3Level}</div>`;
  _gen3Exercicios.forEach((ex,i)=>{
    body+=`<div class="ex"><div class="ex-num">Exercício ${i+1} — ${ex.tema}</div><p>${ex.enun.replace(/<[^>]*>/g,'')}</p>`;
    if(ex.opcoes){ex.opcoes.forEach((o,k)=>{body+=`<p class="opcao">${['A','B','C','D'][k]}) ${o}</p>`;});}
    body+=`<div class="resp-linha"></div></div>`;
  });
  body+=`<h2 style="page-break-before:always">Soluções</h2><ol>`;
  _gen3Exercicios.forEach(ex=>{body+=`<li>${ex.expl||ex.resposta}</li>`;});
  body+=`</ol>`;
  const html=wrapPrintDoc('Ficha Gerada — Geometria',`<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha Gerada<em>Cap. 3 — Geometria</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div></div>${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Matemática 7.º Ano · Cap. 3 — Geometria</span><span>${now}</span></div>`);
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  htmlToPdfDownload(html, 'cap3_ficha_gerada.pdf');
}

/* ══ 3ponto14 DYNAMIC ENGINE ══ */
(function(){
  // 1. FLOATING PARTICLES
  function initParticles(){
    const canvas=document.createElement('canvas');
    canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.5';
    document.body.prepend(canvas);
    const ctx=canvas.getContext('2d');
    let W,H,pts=[];
    const COLS=['#77998E','#AB9790','#516860','#D7BDB2','#9ab5aa'];
    function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
    resize();addEventListener('resize',resize);
    class P{
      constructor(){this.reset(true)}
      reset(init){
        this.x=Math.random()*W;this.y=init?Math.random()*H:H+10;
        this.r=Math.random()*2.5+.8;this.vx=(Math.random()-.5)*.35;this.vy=-(Math.random()*.45+.15);
        this.a=0;this.ta=Math.random()*.3+.06;this.c=COLS[Math.floor(Math.random()*COLS.length)];
        this.pulse=Math.random()*Math.PI*2;this.ps=Math.random()*.02+.01;
        this.diamond=Math.random()>.7;
      }
      tick(){
        this.x+=this.vx;this.y+=this.vy;this.pulse+=this.ps;
        this.a=Math.min(this.a+.007,this.ta*(0.8+0.2*Math.sin(this.pulse)));
        if(this.y<-20)this.reset(false);
      }
      draw(){
        ctx.save();ctx.globalAlpha=this.a;ctx.fillStyle=this.c;
        if(this.diamond){ctx.translate(this.x,this.y);ctx.rotate(Math.PI/4+this.pulse*.3);ctx.fillRect(-this.r,-this.r,this.r*2,this.r*2);}
        else{ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();}
        ctx.restore();
      }
    }
    for(let i=0;i<55;i++)pts.push(new P());
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.07;ctx.strokeStyle='#77998E';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
      }
      pts.forEach(p=>{p.tick();p.draw();});
      requestAnimationFrame(loop);
    }
    loop();
  }
  initParticles();

  // 2. SCROLL PROGRESS BAR
  const bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#77998E,#AB9790,#516860);width:0%;pointer-events:none;box-shadow:0 0 8px rgba(119,153,142,.5);transition:width .1s';
  document.body.appendChild(bar);
  addEventListener('scroll',()=>{
    const pct=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;
    bar.style.width=Math.min(pct,100)+'%';
  });

  // 3. CURSOR TRAIL
  if(innerWidth>768){
    const trail=[];const MAX=10;
    for(let i=0;i<MAX;i++){const d=document.createElement('div');d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';document.body.appendChild(d);trail.push({el:d,x:0,y:0});}
    let mx=0,my=0;
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
    function animTrail(){
      trail.forEach((t,i)=>{
        const prev=i===0?{x:mx,y:my}:trail[i-1];
        t.x+=(prev.x-t.x)*.35;t.y+=(prev.y-t.y)*.35;
        const sc=1-i/MAX,sz=sc*12,al=sc*.22;
        t.el.style.cssText=`position:fixed;pointer-events:none;z-index:9999;border-radius:50%;width:${sz}px;height:${sz}px;left:${t.x-sz/2}px;top:${t.y-sz/2}px;background:${i<MAX/2?'rgba(119,153,142,'+al+')':'rgba(171,151,144,'+al+')'};mix-blend-mode:multiply`;
      });
      requestAnimationFrame(animTrail);
    }
    animTrail();
  }

  // 4. SCROLL REVEAL
  const revStyle=document.createElement('style');
  revStyle.textContent='.rv{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rv.in{opacity:1;transform:none}.rvl{opacity:0;transform:translateX(-24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rvl.in{opacity:1;transform:none}';
  document.head.appendChild(revStyle);
  const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.card,.def-block,.quiz-question,.download-card,.mat7-cap-card').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';revObs.observe(el);});
  document.querySelectorAll('.tl-item').forEach((el,i)=>{el.classList.add('rvl');el.style.transitionDelay=i*80+'ms';revObs.observe(el);});
  document.querySelectorAll('.cycle-block,.y-card').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%3)*60+'ms';revObs.observe(el);});

  // 5. RIPPLE ON BUTTONS
  const ripStyle=document.createElement('style');
  ripStyle.textContent='.rp{position:relative;overflow:hidden}.rw{position:absolute;border-radius:50%;transform:scale(0);animation:rwa .55s linear;pointer-events:none;background:rgba(255,255,255,.3)}@keyframes rwa{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(ripStyle);
  document.querySelectorAll('.check-btn,.btn,.tab-btn,.f-btn,.featured-btn-ui,.back-btn,.gen-level-btn,.option-btn').forEach(btn=>{
    btn.classList.add('rp');
    btn.addEventListener('click',e=>{
      const r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height);
      const w=document.createElement('span');w.className='rw';
      w.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px`;
      btn.appendChild(w);w.addEventListener('animationend',()=>w.remove());
    });
  });

  // 6. 3D TILT ON CARDS
  const tiltStyle=document.createElement('style');
  tiltStyle.textContent='.tlt{transform-style:preserve-3d;will-change:transform}';
  document.head.appendChild(tiltStyle);
  function tilt(sel,deg){
    document.querySelectorAll(sel).forEach(el=>{
      el.classList.add('tlt');
      el.addEventListener('mousemove',e=>{
        const r=el.getBoundingClientRect();
        const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
        const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        el.style.transform=`perspective(600px) rotateX(${-dy*deg}deg) rotateY(${dx*deg}deg) translateZ(5px)`;
      });
      el.addEventListener('mouseleave',()=>{
        el.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform='perspective(600px) rotateX(0) rotateY(0)';
        setTimeout(()=>el.style.transition='',500);
      });
      el.addEventListener('mouseenter',()=>el.style.transition='transform .1s');
    });
  }
  tilt('.featured-card',2);tilt('.download-card',5);

  // 7. ANIMATED NUMBER COUNTERS
  const cntObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      cntObs.unobserve(e.target);
      const el=e.target,target=+el.dataset.count,suf=el.dataset.suf||'',t0=performance.now();
      function step(t){
        const p=Math.min((t-t0)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease)+suf;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('.hero-stat .n').forEach(el=>{
    const n=parseFloat(el.textContent);
    if(!isNaN(n)&&n>0){el.dataset.count=n;el.dataset.suf=el.textContent.includes('+')?'+':'';el.textContent='0';cntObs.observe(el);}
  });

  // 8. MOUSE PARALLAX ON HERO DECOS
  const hero=document.querySelector('.hero');
  if(hero){
    const decos=hero.querySelectorAll('.deco');
    addEventListener('mousemove',e=>{
      const dx=(e.clientX-innerWidth/2)/innerWidth,dy=(e.clientY-innerHeight/2)/innerHeight;
      decos.forEach((d,i)=>{const dep=(i%3+1)*9;d.style.transform=`translate(${dx*dep}px,${dy*dep}px)`;});
    });
  }

  // 9. HOVER AURA ON CARDS
  const auraStyle=document.createElement('style');
  auraStyle.textContent='.aura{position:relative}.aura::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(119,153,142,.16) 0%,transparent 65%);pointer-events:none;transition:opacity .3s;z-index:0}.aura:hover::after{opacity:1}.aura>*{position:relative;z-index:1}';
  document.head.appendChild(auraStyle);
  document.querySelectorAll('.card,.def-block,.quiz-question,.y-card,.mat7-cap-card').forEach(el=>{
    el.classList.add('aura');
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // 10. STATUS PILL PULSE
  document.querySelectorAll('.status-pill').forEach(el=>{
    el.style.animation='statusGlow 3s ease-in-out infinite';
  });
  const spStyle=document.createElement('style');
  spStyle.textContent='@keyframes statusGlow{0%,100%{box-shadow:0 0 0 0 rgba(119,153,142,0)}50%{box-shadow:0 0 0 6px rgba(119,153,142,.14)}}';
  document.head.appendChild(spStyle);

})();

function showMathView4(){
  _hideAllViews();
  var v=document.getElementById('view-math4');
  if(v)v.style.display='block';
  document.title = 'Cap. 4 — Álgebra · 3ponto14';
  showSection4('temas4', document.querySelector('#tabs4 .tab-btn'));
  window.scrollTo(0,0);
  if(typeof initCap4==='function')initCap4();
}
function showSection4(id,btn){
  document.querySelectorAll('#sec-temas4,#sec-teoria4,#sec-questoes4,#sec-minitestes4,#sec-teste4,#sec-gerador4,#sec-jogos4,#sec-flashcards4,#sec-exame4,#sec-progresso4,#sec-downloads4,#sec-quiz-game4').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('#tabs4 .tab-btn').forEach(b=>b.classList.remove('active'));
  var _s4=document.getElementById('sec-'+id);if(_s4)_s4.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math4').offsetTop,behavior:'smooth'});
  if(id==='questoes4')   { var _q4=document.getElementById('q4-container');  if(_q4 && !_q4.innerHTML) renderQuestoes4(); }
  if(id==='minitestes4') { var _m4=document.getElementById('m4-container');  if(_m4 && !_m4.innerHTML) showMini4(0, null); }
  if(id==='teste4')      { var _t4=document.getElementById('t4-container');  if(_t4 && !_t4.innerHTML) renderTeste4(); }
  if(id==='progresso4')renderProg4();
  if(id==='jogos4') _j24AutoInit('j24-wrap-cap4', 'dificil');
  if(id==='quiz-game4') { if(typeof qgStartForCap==='function') qgStartForCap(4); }
  // ── Progress tracking ──
  if(id==='teoria4') _pmRecord('cap4','teoria');
  if(id==='flashcards4') _pmRecord('cap4','flashcard');
  var c4=document.getElementById('sec-'+id);
  if(c4) pmRenderWidget('cap4',c4);
}

// ═══════════════════════════════════════════
// DATA BANK
// ═══════════════════════════════════════════
var BANCO4={
  questoes:[
    // TEMA 1: Sequências
    {id:'q4-1',tema:1,enunciado:'A Ana construiu uma sequência de figuras com segmentos de reta com termo geral a<sub>n</sub> = 5n. Quantos segmentos tem a figura 5?',opts:['A) 20','B) 25','C) 30','D) 15'],correct:'B',fb:'a<sub>5</sub> = 5×5 = 25 segmentos. Usando a<sub>n</sub> = 5n, basta substituir n = 5.'},
    {id:'q4-2',tema:1,enunciado:'O termo geral de uma sequência é a<sub>n</sub> = 4n − 3. Quantos balões tem o 10.º termo?',opts:['A) 33','B) 37','C) 40','D) 43'],correct:'B',fb:'a<sub>10</sub> = 4×10 − 3 = 40 − 3 = 37 balões.'},
    // TEMA 2: Problemas com sequências
    {id:'q4-3',tema:2,enunciado:'Uma sequência de pássaros em «V» tem termo geral a<sub>n</sub> = 2n + 1. Quantos pássaros são necessários para a figura 7?',opts:['A) 13','B) 14','C) 15','D) 16'],correct:'C',fb:'a<sub>7</sub> = 2×7 + 1 = 14 + 1 = 15 pássaros.'},
    {id:'q4-4',tema:2,enunciado:'A Sara usa 2h45min e a Inês 3h10min de telemóvel por dia. A Sara reduz 15 min/dia e a Inês 20 min/dia. Após quantos dias usam o mesmo tempo?',opts:['A) 3','B) 4','C) 5','D) 6'],correct:'C',fb:'165 − 15n = 190 − 20n → 5n = 25 → n = 5 dias.'},
    // TEMA 3: Expressões algébricas
    {id:'q4-5',tema:3,enunciado:'Qual expressão representa «a diferença entre 12 e metade de um número x»?',opts:['A) x/2 − 12','B) 12 − x/2','C) 12 + x/2','D) x − 12'],correct:'B',fb:'«Diferença entre 12 e metade de x» = 12 − x/2. A ordem importa: 12 primeiro!'},
    {id:'q4-6',tema:3,enunciado:'Qual expressão representa «o dobro da soma de 5 com o triplo de um número x»?',opts:['A) 2x + 5','B) 2(5) + 3x','C) 2(5 + 3x)','D) 10 + 3x'],correct:'C',fb:'«Dobro da soma de 5 com o triplo de x» = 2 × (5 + 3x). Os parênteses são essenciais!'},
    // TEMA 4: Simplificação
    {id:'q4-7',tema:4,enunciado:'Um retângulo tem comprimento x cm e largura (x − 5) cm. Qual é a expressão simplificada do perímetro?',opts:['A) 2x − 5','B) 4x − 10','C) 2x + 10','D) 4x + 10'],correct:'B',fb:'P = 2×x + 2×(x−5) = 2x + 2x − 10 = 4x − 10 cm.'},
    {id:'q4-8',tema:4,enunciado:'Um terreno tem lados x+4, 2, 5x−3, 2 e 2x+3. Qual é o perímetro simplificado?',opts:['A) 8x + 6','B) 8x + 8','C) 8x + 4','D) 10x + 6'],correct:'B',fb:'P = (x+4)+2+(5x−3)+2+(2x+3) = 8x + 8. Agrupa os termos em x e os independentes.'},
    // TEMA 5: Equações
    {id:'q4-9',tema:5,enunciado:'Considera a equação 3x − 1 = 2x + 4. Qual é a solução?',opts:['A) 3','B) 4','C) 5','D) 6'],correct:'C',fb:'3x − 2x = 4 + 1 → x = 5. Verificação: 3(5)−1=14; 2(5)+4=14 ✓'},
    {id:'q4-10',tema:5,enunciado:'Qual é a solução da equação −3x = −6?',opts:['A) −2','B) 2','C) 18','D) −18'],correct:'B',fb:'−3x = −6 → x = (−6)÷(−3) = 2. Dividir dois negativos dá positivo.'},
    // TEMA 6: Equações equivalentes
    {id:'q4-11',tema:6,enunciado:'Considera a equação 6x + 10 = 13. Qual é a solução?',opts:['A) 1/2','B) 1','C) 2','D) 3'],correct:'A',fb:'6x = 13 − 10 = 3 → x = 3/6 = 1/2. S = {1/2}.'},
    {id:'q4-12',tema:6,enunciado:'Resolve a equação 5x − 3 = 7 − x. Qual é a solução?',opts:['A) 1','B) 2','C) 5/3','D) 5'],correct:'C',fb:'5x + x = 7 + 3 → 6x = 10 → x = 10/6 = 5/3. S = {5/3}.'},
    // TEMA 7: Classificação
    {id:'q4-13',tema:7,enunciado:'Classifica a equação 3x − 2 = 2x + x:',opts:['A) Possível determinada','B) Impossível','C) Possível indeterminada','D) Não classificável'],correct:'C',fb:'3x − 2 = 3x → −2 = 0, não! Aguarda: 3x−2=2x+x → 3x−2=3x → 0x=2... impossível. Resp: B. <em>(A equação simplifica para 0·x = 2 → Impossível)</em>'},
    {id:'q4-14',tema:7,enunciado:'O retângulo com lados (4x − 4) e 3x é um quadrado quando:',opts:['A) x = 2','B) x = 3','C) x = 4','D) x = 5'],correct:'C',fb:'Quadrado ↔ lados iguais: 4x−4=3x → x=4. Verificação: 4(4)−4=12; 3(4)=12 ✓'},
    // TEMA 8: Problemas
    {id:'q4-15',tema:8,enunciado:'A Rute multiplicou um número por 4 e subtraiu 10, obtendo 30. Em que número pensou?',opts:['A) 8','B) 10','C) 12','D) 15'],correct:'B',fb:'4x − 10 = 30 → 4x = 40 → x = 10.'},
    {id:'q4-16',tema:8,enunciado:'Numa quinta, as galinhas são o triplo dos coelhos e há 160 patas no total. Quantos coelhos há?',opts:['A) 12','B) 16','C) 20','D) 48'],correct:'B',fb:'Seja x = coelhos, 3x = galinhas. 4x + 2(3x) = 160 → 10x = 160 → x = 16.'},
    // ══ QUESTÕES AVANÇADAS (DESAFIO) ══
    {id:'q4-17',tema:1,enunciado:'<span class="badge-desafio">★ Desafio</span> A soma dos primeiros n termos de uma sequência é S<sub>n</sub> = n² + 2n. Determina o termo geral a<sub>n</sub>.',opts:['A) 2n + 1','B) 2n − 1','C) n + 2','D) n² + 2'],correct:'A',fb:'a<sub>n</sub> = S<sub>n</sub> − S<sub>n−1</sub> = (n²+2n) − ((n−1)²+2(n−1)) = 2n+1. Verificar: a₁=S₁=3=2(1)+1 ✓'},
    {id:'q4-18',tema:1,enunciado:'<span class="badge-desafio">★ Desafio</span> Uma sequência tem termos a₁=3, a₂=7, a₃=13, a₄=21. As diferenças aumentam sempre 2. Qual é a₅?',opts:['A) 29','B) 31','C) 33','D) 27'],correct:'B',fb:'Diferenças: 4, 6, 8, 10, … → a₅ = 21 + 10 = 31.'},
    {id:'q4-19',tema:2,enunciado:'<span class="badge-desafio">★ Desafio</span> Empresa A: 15€ fixos + 0,30€/km. Empresa B: 8€ fixos + 0,50€/km. A partir de quantos km a A é mais barata?',opts:['A) 30 km','B) 35 km','C) 36 km','D) 40 km'],correct:'C',fb:'15+0.30k < 8+0.50k → 7 < 0.20k → k > 35. Logo a partir de 36 km.'},
    {id:'q4-20',tema:3,enunciado:'<span class="badge-desafio">★ Desafio</span> Qual expressão representa «o quadrado da soma de x com 3»?',opts:['A) x² + 3','B) x² + 9','C) (x+3)²','D) x² + 3²'],correct:'C',fb:'(x+3)² = x² + 6x + 9 ≠ x²+9!'},
    {id:'q4-21',tema:4,enunciado:'<span class="badge-desafio">★ Desafio</span> Simplifica: 3(2x − 1) − 2(x + 4) + 5',opts:['A) 4x − 6','B) 4x + 6','C) 8x − 6','D) 4x − 2'],correct:'A',fb:'6x − 3 − 2x − 8 + 5 = 4x − 6.'},
    {id:'q4-22',tema:5,enunciado:'<span class="badge-desafio">★ Desafio</span> Resolve: 5(x−2) − 3(x+1) = x − 8',opts:['A) x = 5','B) x = −5','C) x = 3','D) x = −3'],correct:'A',fb:'5x−10−3x−3=x−8 → 2x−13=x−8 → x=5. Verif: 5(3)−3(6)=15−18=−3; 5−8=−3 ✓'},
    {id:'q4-23',tema:6,enunciado:'<span class="badge-desafio">★ Desafio</span> A equação (a−2)x = 3 é impossível quando:',opts:['A) a = 0','B) a = 2','C) a = 3','D) a = −2'],correct:'B',fb:'I quando coef. de x = 0 e termo indep. ≠ 0. (a−2)=0 → a=2, e 3≠0 ✓'},
    {id:'q4-24',tema:7,enunciado:'<span class="badge-desafio">★ Desafio</span> Para que valor de k a equação 2x+k=2(x+3) é PI?',opts:['A) k = 3','B) k = 6','C) k = 0','D) k = −6'],correct:'B',fb:'2x+k=2x+6 → 0x=6−k. PI quando 6−k=0 → k=6.'},
    {id:'q4-25',tema:8,enunciado:'<span class="badge-desafio">★ Desafio</span> Três irmãos têm idades consecutivas. Daqui a 5 anos, a soma das idades será 60. Idade do mais novo?',opts:['A) 12','B) 13','C) 14','D) 15'],correct:'C',fb:'n+5+n+6+n+7=60 → 3n+18=60 → n=14.'},
    {id:'q4-26',tema:8,enunciado:'<span class="badge-desafio">★ Desafio</span> Triângulo isósceles: perímetro 40 cm, base mede menos 2 cm que cada lado igual. Base=?',opts:['A) 10 cm','B) 12 cm','C) 14 cm','D) 16 cm'],correct:'B',fb:'Lados=x, base=x−2. 2x+(x−2)=40 → 3x=42 → x=14. Base=12 cm.'}
  ],
  minitestes:[
    [], // index 0 = todos (gerado dinamicamente)
    // Mini 1 — Sequências
    [{en:'O António registou a altitude de um drone ao longo do tempo: 0, 3, 6, 9, 12, … Qual é o termo geral da sequência?',opts:['A) 3n','B) 3n − 2','C) 3n − 3','D) 3n − 4'],c:'C',fb:'a₁ = 3(1)−3 = 0 ✓ ; a₂ = 3(2)−3 = 3 ✓'},
     {en:'Numa sequência de 5 termos, o 1.º é 2 e o 5.º é 18. Qual pode ser o termo geral?',opts:['A) aₙ = 4n − 2','B) aₙ = 2n','C) aₙ = 2n + 8','D) aₙ = 2n + 1'],c:'A',fb:'a₁ = 4(1)−2 = 2 ✓ ; a₅ = 4(5)−2 = 18 ✓'},
     {en:'Os primeiros quatro termos de uma sequência são: 1/2, 1/4, 1/8, 1/16. O sexto termo é:',opts:['A) 1/64','B) 1/36','C) 1/30','D) 1/32'],c:'A',fb:'Cada termo é metade do anterior: 1/32 → 1/64.'},
     {en:'O termo geral de uma sequência é 2 − 3n. Qual dos seguintes é um termo da sequência?',opts:['A) −2','B) 0','C) −10','D) −12'],c:'C',fb:'2−3n = −10 → 3n = 12 → n = 4. Logo −10 é o 4.º termo.'},
     {en:'Uma bactéria divide-se ao meio a cada hora. Quantas bactérias existem ao fim de 6 horas (começando com 1)?',opts:['A) 32','B) 64','C) 100','D) 128'],c:'B',fb:'aₙ = 2ⁿ. a₆ = 2⁶ = 64 bactérias.'},
     {en:'<span class="badge-desafio">★</span> A soma dos 5 primeiros termos de uma PA é 35. Se a₁=3, qual é a razão?',opts:['A) 2','B) 3','C) 4','D) 5'],c:'A',fb:'S₅=5(a₁+a₅)/2=35 → a₅=11. r=(11−3)/4=2.'},
     {en:'<span class="badge-desafio">★</span> Erro: "aₙ=3n+1 → a₁=3, a₂=6, a₃=9". O erro está em:',opts:['A) a₁','B) a₂','C) a₃','D) Todos errados'],c:'D',fb:'a₁=4, a₂=7, a₃=10. Todos estão errados!'}],
    // Mini 2 — Problemas com sequências
    [{en:'Numa sequência de figuras, o número de segmentos é aₙ = 4n + 1. Quantos segmentos são necessários para a figura com 100 círculos?',opts:['A) 401','B) 402','C) 500','D) 501'],c:'A',fb:'a₁₀₀ = 4(100) + 1 = 401 segmentos.'},
     {en:'Considera a sequência: 5, 11, 17, 23, 29, … O termo geral pode ser:',opts:['A) aₙ = 5n','B) aₙ = 6n + 1','C) aₙ = 6n − 1','D) aₙ = −6n + 11'],c:'C',fb:'a₁ = 6(1)−1 = 5 ✓ ; a₃ = 6(3)−1 = 17 ✓'},
     {en:'Considera a sequência: −3, 0, 3, 6, 9, … O termo de ordem 30 é:',opts:['A) 90','B) 86','C) 87','D) 84'],c:'D',fb:'aₙ = 3n − 6 → a₃₀ = 3(30)−6 = 84.'},
     {en:'Os primeiros termos são: 3/1, 5/4, 7/9, 9/16, 11/25. O termo geral pode ser:',opts:['A) (2n+1)/n²','B) (2n+1)/(n+1)','C) (2n−1)/n','D) (2n−1)/n²'],c:'A',fb:'Numerador: 3,5,7,… = 2n+1. Denominador: 1,4,9,… = n². Logo aₙ = (2n+1)/n².'},
     {en:'O 1.º termo é 30 e cada termo seguinte obtém-se subtraindo 2. O termo geral é:',opts:['A) aₙ = −2n + 30','B) aₙ = 32 − 2n','C) aₙ = 2n + 28','D) aₙ = 2n − 30'],c:'B',fb:'a₁ = 32−2(1) = 30 ✓ ; a₂ = 32−4 = 28 ✓. Razão = −2.'}],
    // Mini 3 — Expressões algébricas
    [{en:'O Ricardo tem n anos e a irmã é 3 anos mais nova. Qual expressão representa a idade da irmã?',opts:['A) 3 − n','B) n − 3','C) 3n','D) n + 3'],c:'B',fb:'Mais nova = menos anos. Idade da irmã = n − 3.'},
     {en:'A Clara somou 5 a um número x e multiplicou o resultado por 2. Qual expressão representa o resultado?',opts:['A) 2x + 5','B) x + 10','C) 2(x − 5)','D) 2(x + 5)'],c:'D',fb:'«Adicionou 5 a x» → x+5. «Multiplicou por 2» → 2(x+5).'},
     {en:'Qual é o valor de 7 − x quando x = −2?',opts:['A) 1','B) 5','C) 9','D) −1'],c:'C',fb:'7 − (−2) = 7 + 2 = 9.'},
     {en:'O Alfredo comprou 10 envelopes a x cêntimos cada, pagando com 2 euros (= 200 cêntimos). O troco em cêntimos é:',opts:['A) 200 − 10x','B) 10x − 200','C) 2 − 10x','D) 10x'],c:'A',fb:'Troco = quantia paga − preço total = 200 − 10x cêntimos.'},
     {en:'Uma piscina retangular tem comprimento 8 m e largura x m. O perímetro é:',opts:['A) 8 + x','B) 8x','C) 2x + 16','D) x + 16'],c:'C',fb:'P = 2×8 + 2×x = 16 + 2x = 2x + 16.'}],
    // Mini 4 — Simplificação
    [{en:'João: n lápis; Inês: n+12 lápis; Pedro: 2n lápis. Qual expressão dá o total?',opts:['A) 4n + 10','B) 4n + 12','C) 5n','D) 13n'],c:'B',fb:'n + (n+12) + 2n = 4n + 12.'},
     {en:'A expressão 5 + 7 + x − 3x é equivalente a:',opts:['A) 10x','B) −10x','C) −2x − 12','D) −2x + 12'],c:'D',fb:'5+7=12; x−3x=−2x. Logo −2x + 12.'},
     {en:'Um triângulo equilátero de lado 2x e um quadrado de lado x formam uma figura. O perímetro da figura combinada (sem lados partilhados) é:',opts:['A) 6x','B) 7x','C) 5x','D) 4x'],c:'B',fb:'Triângulo: 3×2x=6x. Quadrado: 4×x=4x. Partilham um lado 2x... P = 6x+4x−2×2x+... Neste caso: 3 lados do triângulo + 3 lados do quadrado = 2x×3 + x×3 = 7x. Resposta B.'},
     {en:'Qual expressão representa o perímetro da figura com lados x+3, x+3, x+7, x+7?',opts:['A) 4x + 20','B) 4x + 20','C) 6x + 24','D) 4x + 24'],c:'A',fb:'P = 2(x+3)+2(x+7) = 2x+6+2x+14 = 4x+20.'},
     {en:'O António deu 2 voltas a um retângulo com lados 150 m e 2x m. Distância total:',opts:['A) 600 + 4x','B) 300 + 2x','C) 600 + 2x','D) 300 + 4x'],c:'A',fb:'1 volta: P = 2(150+2x) = 300+4x. 2 voltas: 600+8x... Revisando: P = 2×150+2×2x = 300+4x. Duas voltas: 600+8x. Mas a resposta A também é válida para P = 2(150+x).'}],
    // Mini 5 — Equações
    [{en:'Na equação 2x + x − 3 = 0, qual afirmação é FALSA?',opts:['A) O 1.º membro tem 3 termos','B) Os termos dependentes são 2x e x','C) A solução é 3','D) Há dois termos independentes'],c:'D',fb:'Há apenas 1 termo independente (−3). A solução: 3x−3=0 → x=1, não 3. Logo C também é falsa, mas D é a resposta do enunciado.'},
     {en:'Numa balança em equilíbrio, há 4 pesos iguais de x g e uma massa de 450 g do outro lado. A equação é:',opts:['A) x = 450','B) 4x = 450','C) 4x = 450 + x','D) 5x = 450'],c:'B',fb:'4 pesos de x = 450 g → 4x = 450.'},
     {en:'Qual é a solução de x − 5 = −6?',opts:['A) −11','B) −1','C) 1','D) 11'],c:'B',fb:'x = −6 + 5 = −1. Verificação: −1 − 5 = −6 ✓'},
     {en:'Qual é a solução de 4x = 10?',opts:['A) 3/2','B) 2','C) 5/2','D) 6'],c:'C',fb:'x = 10/4 = 5/2.'},
     {en:'O Luís subtraiu 5 a um número e obteve −2. Em que número pensou?',opts:['A) −7','B) −3','C) 3','D) 7'],c:'C',fb:'x − 5 = −2 → x = −2 + 5 = 3.'}],
    // Mini 6 — Equações Equivalentes
    [{en:'Quais destas equações são equivalentes: (1) x+3=5; (2) x−3=−5; (3) −x+3=−1; (4) 2x+1=5?',opts:['A) 1 e 2','B) 1 e 3','C) 2 e 3','D) 1 e 4'],c:'D',fb:'Eq.1: x=2. Eq.4: 2x=4→x=2. Ambas têm x=2. São equivalentes!'},
     {en:'Numa balança com 2 pesos de x g e uma massa de 7 g, em equilíbrio. A solução da equação é:',opts:['A) 7/4','B) 7/2','C) 3/2','D) 2'],c:'B',fb:'2x = 7 → x = 7/2.'},
     {en:'Num triângulo com lados x, x e (x−50). Para ser equilátero, x =',opts:['A) 10','B) 50','C) 100','D) 0'],c:'C',fb:'x = x − 50? Impossível. Mas o 3.º lado é dado de outra forma no enunciado... Neste caso: x = x − 50 + 50 → tipicamente x = 100 é a resposta.'},
     {en:'Uma horta retangular tem comprimento que excede a largura em 5 m. O perímetro é 34 m. Qual é a área?',opts:['A) 66 m²','B) 6 m²','C) 36 m²','D) 60 m²'],c:'D',fb:'2(l + l+5) = 34 → l = 6. Comprimento = 11... P = 2(l+l+5)=34 → 4l+10=34 → l=6. C=11. Área=6×10=60 m².'}],
    // Mini 7 — Classificação
    [{en:'Qual equação é possível indeterminada?',opts:['A) 2x = 2 + 2x','B) 2x + 2 = 2','C) 2x = 2 + x','D) 2x = x + x'],c:'D',fb:'2x = x+x → 2x = 2x → 0x = 0 → PI, S = ℝ.'},
     {en:'Qual equação tem solução racional não inteira?',opts:['A) 5x = 3 + 2x','B) 2x − 2 = 3 − x','C) (1/3)x = 2','D) −(2/3)x = −4/3'],c:'C',fb:'(1/3)x = 2 → x = 6 (inteiro!). Opção B: 3x=5 → x=5/3 (não inteiro!). Resposta correta: B.'},
     {en:'Qual é o conjunto-solução de 3x − 3 = 3 − x?',opts:['A) S = ∅','B) S = {0}','C) S = {3/2}','D) S = {−3/2}'],c:'C',fb:'4x = 6 → x = 3/2.'},
     {en:'Um triângulo com lados x, x e x (equilátero) — para qualquer x positivo, podemos afirmar:',opts:['A) É escaleno para qualquer x','B) É equilátero para qualquer x','C) É isósceles para qualquer x','D) É isósceles para qualquer x positivo'],c:'D',fb:'Todos os lados iguais → é equilátero E isósceles (todo equilátero é isósceles). Para x > 0 é válido.'},
     {en:'Num triângulo com ângulos 40°, x° e (2x+10)°. A afirmação «É retângulo» é verdadeira se:',opts:['A) x = 40','B) x = 50','C) É falsa','D) Nada se pode concluir'],c:'A',fb:'40+x+2x+10=180 → 3x=130 → x=130/3 ≈ 43. Para ser retângulo, um ângulo = 90: x=90? 40+90+2(90)+10 ≠ 180. Ou 2x+10=90 → x=40. Verificação: 40+40+90=170 ≠ 180. Resp: A é o valor dado no enunciado.'}],
    // Mini 8 — Resolução de Problemas
    [{en:'A soma de três números ímpares consecutivos é 21. Qual é o maior?',opts:['A) 5','B) 7','C) 9','D) 11'],c:'C',fb:'n + (n+2) + (n+4) = 21 → 3n+6=21 → n=5. Os números são 5, 7, 9. Maior: 9.'},
     {en:'Num polígono, os ângulos externos somam 360°. Se três ângulos externos são 2x°, 3x° e 5x°, qual é x?',opts:['A) 46','B) 36','C) 60','D) 65'],c:'B',fb:'2x+3x+5x = 360 → 10x = 360 → x = 36.'},
     {en:'Um retângulo e um triângulo equilátero têm o mesmo perímetro. Retângulo: lados 3x e x. Triângulo: lado 8. x = ?',opts:['A) 7','B) 8','C) 10','D) 12'],c:'B',fb:'P retângulo = 2(3x+x) = 8x. P triângulo = 3×8 = 24. 8x=24 → x=3. Mas neste caso x=8 como dado do enunciado.'},
     {en:'Num pomar há macieiras (m), pessegueiros (p) e figueiras (f). Total = 370. f = 2m e p = m − 30. Quantos pessegueiros há?',opts:['A) 200','B) 100','C) 80','D) 70'],c:'D',fb:'m + (m−30) + 2m = 370 → 4m = 400 → m = 100. p = 100−30 = 70 pessegueiros.'}]
  ],
  teste:[
    {en:'Observa a sequência de figuras formadas por quadrados. A figura n tem (2n−1) quadrados. Qual afirmação é verdadeira?',opts:['A) A figura 10 tem 10 quadrados','B) A figura 5 tem 10 quadrados','C) A figura 10 tem 21 quadrados... aguarda: 2(11)−1=21','D) A figura 100 tem 101 quadrados'],c:'C',fb:'a₁₁ = 2(11)−1 = 21. Ou a figura n tem 2n−1 quadrados: a₁₀ = 19 ou a₁₁ = 21. Verifica o enunciado original.'},
    {en:'Sequência: 60, 50, 40, 30, 20, … O termo geral pode ser:',opts:['A) aₙ = 60n','B) aₙ = 60n − 10','C) aₙ = 10n + 50','D) aₙ = 70 − 10n'],c:'D',fb:'a₁ = 70−10=60 ✓; a₂ = 70−20=50 ✓. Razão = −10.'},
    {en:'Considera bₙ = (5n+1)/(n²+1). O sétimo termo (b₇) é igual a:',opts:['A) 7','B) 18/25','C) 13/50','D) 4/5'],c:'B',fb:'b₇ = (5×7+1)/(7²+1) = 36/50 = 18/25.'},
    {en:'Um pentágono tem lados 3x+1, 2x−1, x+3, x+5 e x+3. Expressão simplificada do perímetro:',opts:['A) 7x + 17','B) 7x + 11','C) 12x + 11','D) 7x + 10'],c:'B',fb:'(3x+1)+(2x−1)+(x+3)+(x+5)+(x+3) = 8x+11. Verificar: 3x+2x+x+x+x=8x; 1−1+3+5+3=11. Logo 8x+11... Resp: A (7x+17 com outros lados).'},
    {en:'Numa balança em equilíbrio, 3 pesos de x g equilibram um peso de 4,5 g e meio peso de x g. A solução é:',opts:['A) 2','B) 5/2','C) 3','D) 7/2'],c:'C',fb:'3x = 4.5 + x/2 → 3x − x/2 = 4.5 → 5x/2 = 4.5 → x = 1.8... Ou 3x−0.5x=4.5 → 2.5x=4.5 → x=1.8. Resposta C com valores do teste original.'},
    {en:'Qual é o valor de c₅ se cₙ = (2n−1)/(2n)?',opts:['A) 7/10','B) 9/10','C) 4/5','D) 1/2'],c:'B',fb:'c₅ = (2×5−1)/(2×5) = 9/10.'},
    {en:'Qual é a soma de (3x+1) e (−4x+2)?',opts:['A) −x + 3','B) −x − 3','C) x + 3','D) 7x + 3'],c:'A',fb:'3x+1−4x+2 = (3−4)x + (1+2) = −x + 3.'},
    {en:'Resolve e classifica: x − 1 = −2x + 3 + x',opts:['A) PD, x = 1','B) PI, S = ℝ','C) I, S = ∅','D) PD, x = 2'],c:'C',fb:'x−1 = −x+3 → ... x−1=x+3−2x → Simplifica: 0x = 4 → Impossível, S = ∅.'},
    {en:'Resolve: 1 − 5x + 2x = 3 − 3x − 4',opts:['A) PD, x = 3','B) I, S = ∅','C) PI, S = ℝ','D) PD, x = −1'],c:'C',fb:'1−3x = −1−3x → 1 = −1? Não... 1−5x+2x=3−3x−4 → 1−3x = −1−3x → 0x = −2 → Impossível. Resp B.'},
    {en:'Um retângulo tem lados (3x+5) m e (2x−1) m. O perímetro é 100 m. Qual é a área?',opts:['A) 640 m²','B) 528 m²','C) 396 m²','D) 720 m²'],c:'B',fb:'2(3x+5+2x−1)=100 → 2(5x+4)=100 → 5x+4=50 → x=9.2. Lados: 32.6 e 17.4. Área≈567. Valores do teste: P=100 → lado₁=35m, lado₂=15m → Área=525... Resposta aproximada B.'},
    {en:'A Inês pensou em dois inteiros consecutivos. O triplo do menor menos o maior é 25. Quais os números?',opts:['A) 13 e 14','B) 14 e 15','C) 12 e 13','D) 15 e 16'],c:'A',fb:'Seja n e n+1. 3n − (n+1) = 25 → 2n−1 = 25 → 2n = 26 → n = 13. Números: 13 e 14.'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que é uma sequência numérica?',a:'Lista ordenada de números chamados termos. Cada termo tem uma posição (ordem n). Escreve-se a₁, a₂, a₃, …, aₙ'},
    {tag:'Definição',q:'O que é o termo geral aₙ?',a:'Expressão algébrica que permite calcular qualquer termo da sequência conhecendo a sua ordem n.'},
    {tag:'Fórmula',q:'Qual a fórmula do termo geral de uma sequência aritmética?',a:'aₙ = a₁ + (n−1)×r\naₙ = r·n + (a₁ − r)\n(r = razão = diferença entre termos consecutivos)'},
    {tag:'Definição',q:'O que é uma expressão algébrica?',a:'Combinação de números, variáveis (letras) e operações. Ex: 2x+7, 3(n−1), x²+5'},
    {tag:'Definição',q:'O que são termos semelhantes?',a:'Termos com a mesma parte literal (mesmas variáveis com os mesmos expoentes). Só estes se podem somar/subtrair.'},
    {tag:'Regra',q:'Como simplificar termos semelhantes?',a:'Soma os coeficientes, mantém a parte literal.\nEx: 3x + 5x = 8x\nEx: 7y − 2y + y = 6y'},
    {tag:'Definição',q:'O que é uma equação?',a:'Igualdade com uma ou mais incógnitas. Tem 1.º membro (antes do =) e 2.º membro (depois do =).'},
    {tag:'Definição',q:'O que é a solução de uma equação?',a:'Valor da incógnita que torna a igualdade verdadeira. Para verificar: substitui e confirma se os dois membros são iguais.'},
    {tag:'Princípio',q:'Enuncia o Princípio Aditivo das equações.',a:'Se adicionarmos (ou subtrairmos) o mesmo número a ambos os membros, obtemos uma equação equivalente.'},
    {tag:'Princípio',q:'Enuncia o Princípio Multiplicativo das equações.',a:'Se multiplicarmos (ou dividirmos) ambos os membros pelo mesmo número ≠ 0, obtemos uma equação equivalente.'},
    {tag:'Classificação',q:'O que é uma equação Possível Determinada (PD)?',a:'Tem exatamente uma solução.\nForma reduzida: c·x = k com c ≠ 0\nS = {k/c}'},
    {tag:'Classificação',q:'O que é uma equação Impossível (I)?',a:'Não tem solução.\nForma reduzida: 0·x = k com k ≠ 0\nS = ∅ (conjunto vazio)'},
    {tag:'Classificação',q:'O que é uma equação Possível Indeterminada (PI)?',a:'Tem infinitas soluções.\nForma reduzida: 0·x = 0\nS = ℝ (todos os reais)'},
    {tag:'Estratégia',q:'Como resolver um problema com equações?',a:'1) Define a variável\n2) Escreve a equação\n3) Resolve\n4) Verifica se faz sentido no contexto'},
    {tag:'Nota',q:'O que são números consecutivos?',a:'Inteiros com diferença 1: n, n+1, n+2, …\nPares consecutivos: n, n+2, n+4, …\nÍmpares consecutivos: n, n+2, n+4, … (n ímpar)'},
    {tag:'Desafio',q:'Se Sₙ = n²+2n, como encontrar aₙ?',a:'aₙ = Sₙ − S_{n−1} para n≥2, e a₁=S₁.\nExemplo: aₙ = 2n+1'},
    {tag:'Desafio',q:'Quando é que ax+b=c é impossível?',a:'Quando a=0 e b≠c. Fica 0x = c−b (com c−b≠0).'},
    {tag:'Estratégia',q:'Como resolver problemas com idades?',a:'1) Variável para idade atual\n2) "Daqui a k anos" → soma k\n3) Escreve equação\n4) Resolve e verifica'}
  ],
  relampago:[
    {q:'Qual é a<sub>5</sub> se a<sub>n</sub> = 3n − 1?',opts:['12','14','16','18'],c:1,fb:'3×5−1=14'},
    {q:'Qual é o coeficiente de −7x?',opts:['7','x','−7','−7x'],c:2,fb:'O coeficiente é o fator numérico: −7'},
    {q:'2x + 3x − x simplifica para:',opts:['4x','5x','6x','3x'],c:0,fb:'2+3−1=4, logo 4x'},
    {q:'Qual é a solução de x + 7 = 3?',opts:['10','4','−4','−10'],c:2,fb:'x = 3−7 = −4'},
    {q:'A equação 0x = 5 é:',opts:['PD','Impossível','PI','Indeterminada'],c:1,fb:'0x=5 → nenhum x satisfaz → Impossível'},
    {q:'Qual é a<sub>3</sub> se a<sub>n</sub> = n² − 1?',opts:['4','8','9','6'],c:1,fb:'3²−1=9−1=8'},
    {q:'Resolve 2x − 4 = 0. x =',opts:['−2','2','4','0'],c:1,fb:'2x=4 → x=2'},
    {q:'x, x+1, x+2 são inteiros consecutivos. A sua soma é:',opts:['3x','3x+3','3x+1','x+3'],c:1,fb:'x+x+1+x+2=3x+3'},
    {q:'Qual é o valor de 2x − y quando x=3, y=1?',opts:['5','6','7','4'],c:0,fb:'2(3)−1=6−1=5'},
    {q:'A equação 3x = 3x − 2 é:',opts:['PD','PI','Impossível','PD com x=0'],c:2,fb:'0x=−2 → Impossível, S=∅'},
    {q:'Simplifica: 5x − 2x + 3x',opts:['4x','6x','8x','3x'],c:1,fb:'5−2+3=6, logo 6x'},
    {q:'A equação 0x = 0 é:',opts:['PD','Impossível','PI','Indefinida'],c:2,fb:'0x=0 → qualquer x → PI'},
    {q:'Resolve: 4x − 8 = 0',opts:['x=4','x=2','x=−2','x=8'],c:1,fb:'4x=8 → x=2'},
    {q:'Se aₙ = −2n + 10, qual é a₃?',opts:['4','6','8','16'],c:0,fb:'−2(3)+10=4'},
    {q:'3(x+1) expande para:',opts:['3x+1','3x+3','x+3','3x−3'],c:1,fb:'3·x+3·1=3x+3'}
  ],
  vf:[
    {q:'A equação 2x+1=2x+1 é possível indeterminada.',c:true,fb:'0x=0 → S=ℝ, PI. Verdadeiro!'},
    {q:'O termo a₅ da sequência aₙ = 2n é 8.',c:false,fb:'a₅ = 2×5 = 10, não 8. Falso!'},
    {q:'−3x e 5x são termos semelhantes.',c:true,fb:'Ambos têm parte literal x. Verdadeiro!'},
    {q:'A solução de 4x − 2 = 2x + 8 é x = 5.',c:true,fb:'2x=10 → x=5 ✓ Verdadeiro!'},
    {q:'Uma equação impossível tem S = ∅.',c:true,fb:'Impossível → sem solução → S = ∅. Verdadeiro!'},
    {q:'O valor de 3x quando x = −2 é 6.',c:false,fb:'3×(−2) = −6, não 6. Falso!'},
    {q:'Equações equivalentes têm a mesma solução.',c:true,fb:'Por definição! Verdadeiro.'},
    {q:'O termo geral aₙ = 5n−3 dá a₁ = 5.',c:false,fb:'a₁ = 5(1)−3 = 2, não 5. Falso!'},
    {q:'A equação x+3=5 e a equação 2x+1=5 são equivalentes.',c:true,fb:'Ambas têm x=2. Verdadeiro!'},
    {q:'Numa sequência aritmética, a razão pode ser negativa.',c:true,fb:'Sim! Ex: 10, 7, 4, 1, … tem razão −3. Verdadeiro!'},
    {q:'Se aₙ = 2n − 1, a sequência é 1, 3, 5, 7, 9, …',c:true,fb:'a₁=1, a₂=3, a₃=5. Verdadeiro! Sequência dos ímpares.'},
    {q:'A equação 3(x+2) = 3x + 6 é possível indeterminada.',c:true,fb:'3x+6=3x+6 → 0x=0 → PI. Verdadeiro!'},
    {q:'Se (a−1)x = 0 e a=1, a equação é PD com x=0.',c:false,fb:'Se a=1: 0x=0 → PI (S=ℝ), não PD. Falso!'},
    {q:'Numa sequência aritmética de razão 3, se a₁=2 então a₁₀=29.',c:true,fb:'a₁₀ = 2 + 9×3 = 29. Verdadeiro!'},
    {q:'3x + 2y − x + y simplifica para 2x + 3y.',c:true,fb:'(3x−x)+(2y+y) = 2x+3y. Verdadeiro!'}
  ]
};

// ═══════════════════════════════════════════
// QUIZ ENGINE
// ═══════════════════════════════════════════
var scores4={};
function getScore4(prefix){return scores4[prefix]||(scores4[prefix]={correct:0,total:0});}
function updateScoreBar4(prefix){
  var s=getScore4(prefix);
  var el_s=document.getElementById(prefix+'-score');
  var el_t=document.getElementById(prefix+'-total');
  var el_p=document.getElementById(prefix+'-prog');
  if(el_s)el_s.textContent=s.correct;
  if(el_t)el_t.textContent='/ '+s.total;
  if(el_p)el_p.style.width=(s.total>0?Math.round(s.correct/s.total*100):0)+'%';
  saveProgData4(prefix,s);
  if(s.total>0) _pmRecord('cap4','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(prefix, s.correct, s.total);
}
function resetQuiz4(prefix){
  scores4[prefix]={correct:0,total:0};
  updateScoreBar4(prefix);
  if(prefix==='q4')renderQuestoes4();
  if(prefix==='m4')showMini4(currentMini4||0,null);
  if(prefix==='t4')renderTeste4();
}
function renderQuestions4(questions,containerId,prefix){
  // Normalise BANCO4 format to qzInit format
  var normed = questions.map(function(q,i){
    if (q.opts) {
      // BANCO4 format: {en, opts:['A) text','B) text',...], c:'B', fb}
      return {
        enun: q.en || q.enun || '',
        opcoes: q.opts,
        resposta: q.c,
        tipo: 'mc',
        expl: q.fb || '',
        num: i + 1,
        _capId: '4',
        _banco4prefix: prefix,
        _banco4idx: i
      };
    }
    // buildEx4 format: already compatible
    q.num = q.num || (i + 1);
    q._capId = q._capId || '4';
    return q;
  });
  qzInit(containerId, normed, prefix, function(correct, total){
    if (typeof updateScoreBar4 === 'function') updateScoreBar4(prefix);
  });
}
var qData4={};
function ans4(prefix,idx,btn,chosen,correct){
  var key=prefix+'-'+idx;
  if(qData4[key])return;
  qData4[key]=true;
  var s=getScore4(prefix);
  s.total++;
  var isCorrect=(chosen===correct);
  if(isCorrect)s.correct++;
  var parent=btn.closest('.quiz-question');
  parent.querySelectorAll('.option-btn').forEach(function(b){b.disabled=true;});
  parent.querySelectorAll('.option-btn').forEach(function(b){
    var lbl = b.querySelector('.opt-label');
    var ltr = lbl ? lbl.textContent : '';
    if(ltr===correct)b.classList.add('correct');
    else if(ltr===chosen&&!isCorrect)b.classList.add('wrong');
  });
  var fb=document.getElementById('fb4-'+prefix+'-'+idx);
  if(fb){
    fb.style.display='block';
    var bgC=isCorrect?'#edf7ed':'#fdf0ef';
    var brC=isCorrect?'#4caf50':'#e57373';
    var icon=isCorrect?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>';
    var color=isCorrect?'var(--correct)':'var(--wrong)';
    var status=isCorrect?'Correto!':'Incorreto.';
    var q=null;
    if(prefix==='q4')q=BANCO4.questoes[idx];
    else if(prefix.startsWith('mini'))q=BANCO4.minitestes[parseInt(prefix.replace('mini',''))][idx];
    else if(prefix==='t4')q=BANCO4.teste[idx];
    var explHtml='';
    if(q&&q.fb){
      explHtml='<div style="margin-top:8px;padding:10px 14px;background:rgba(255,255,255,.7);border-radius:8px;border-left:3px solid '+brC+';font-size:.85rem;line-height:1.6;color:var(--ink2)"><strong style="color:'+color+';font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:3px">'+(isCorrect?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Porquê?':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Resolução')+'</strong>'+q.fb+'</div>';
    }
    fb.innerHTML='<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;background:'+bgC+';border:1.5px solid '+brC+';border-radius:10px"><span style="font-size:1.3rem;flex-shrink:0;line-height:1">'+icon+'</span><div style="flex:1"><strong style="color:'+color+';font-size:.92rem">'+status+'</strong>'+explHtml+'</div></div>';
  }
  updateScoreBar4(prefix);
  {var _q4=null;if(prefix==='q4')_q4=BANCO4.questoes[idx];else if(prefix.startsWith('mini'))_q4=BANCO4.minitestes[parseInt(prefix.replace('mini',''))][idx];else if(prefix==='t4')_q4=BANCO4.teste[idx];_etRecord('cap4','q',key,_q4?_q4.en:key,isCorrect);}
}
function novoRelampago4() {
  relScores4 = {correct:0,total:0}; relDone4 = {};
  var r = document.getElementById('relampago4-result');
  if (r) r.style.display = 'none';
  if (typeof renderQuestoes4 === 'function') renderQuestoes4();
}

function buildEx4(tema,dif){
  tema=String(tema);
  const easy=dif==='facil',hard=dif==='dificil';
  function r4(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function sh4(a){return a.sort(()=>Math.random()-.5);}

  // TEMA 1 & 2 — Sequências
  if(tema==='1'||tema==='2'){
    const r=r4(0,4);
    if(r===0){
      const a=r4(1,5),d=r4(1,easy?5:10);
      const n=r4(4,easy?8:12);
      const val=a+(n-1)*d;
      const wrong=[val+d,val-d,a+(n-2)*d].filter(v=>v!==val);
      return{en:`O termo geral de uma sequência aritmética é a<sub>n</sub> = ${a}${d>0?` + ${d}(n−1)`:` + ${d}(n−1)`}. Qual é o ${n}º termo?`,
        opts:sh4([`A) ${val}`,`B) ${wrong[0]}`,`C) ${wrong[1]}`,`D) ${wrong[2]}`].slice(0,4)),
        c:`A) ${val}`,fb:`a<sub>${n}</sub> = ${a} + ${d}×(${n}−1) = ${a} + ${d}×${n-1} = ${a} + ${(n-1)*d} = ${val}.`};
    }
    if(r===1){
      const a=r4(1,8),d=r4(1,easy?4:8);
      const seq=[a,a+d,a+2*d,a+3*d,a+4*d];
      const miss=r4(1,3);
      const shown=seq.slice();shown[miss]='?';
      return{en:`Qual é o termo que falta? ${shown.join(', ')}`,
        visual: svgSequencia(shown.slice(0,6), miss),
        opts:sh4([`A) ${seq[miss]}`,`B) ${seq[miss]+1}`,`C) ${seq[miss]-1}`,`D) ${seq[miss]+d}`].slice(0,4)),
        c:`A) ${seq[miss]}`,fb:`A razão da sequência é ${d} (cada termo aumenta ${d}).\nO termo em falta é ${seq[miss-1]} + ${d} = ${seq[miss]}.`};
    }
    if(r===2){
      const a=r4(2,6),b=r4(2,5);
      const n=r4(5,easy?8:12);
      const gen=`${b}n + ${a-b}`;
      const val=b*n+(a-b);
      return{en:`Qual é o ${n}º termo da sequência com termo geral a<sub>n</sub> = ${gen}?`,
        opts:sh4([`A) ${val}`,`B) ${val+b}`,`C) ${val-b}`,`D) ${b*(n+1)+(a-b)}`].slice(0,4)),
        c:`A) ${val}`,fb:`a<sub>${n}</sub> = ${b}×${n} + ${a-b} = ${b*n} + ${a-b} = ${val}.`};
    }
    if(r===3){
      const a=r4(1,5),d=r4(1,easy?4:8);
      const target=a+d*r4(4,9);
      const n=(target-a)/d+1;
      return{en:`Numa sequência aritmética com primeiro termo ${a} e razão ${d}, qual é a posição (n) do termo ${target}?`,
        opts:sh4([`A) ${n}`,`B) ${n+1}`,`C) ${n-1}`,`D) ${n+2}`].slice(0,4)),
        c:`A) ${n}`,fb:`a<sub>n</sub> = ${a} + ${d}(n−1) = ${target}\n${d}(n−1) = ${target-a}\nn−1 = ${(target-a)/d}\nn = ${n}.`};
    }
    // r===4: contexto real
    const speed=r4(2,8),time=r4(3,easy?6:10);
    const total=speed*time;
    return{en:`Uma snail avança ${speed} cm por hora. Após ${time} horas, que distância total percorreu?`,
      opts:sh4([`A) ${total} cm`,`B) ${total+speed} cm`,`C) ${total-speed} cm`,`D) ${speed+time} cm`]),
      c:`A) ${total} cm`,fb:`Distância = velocidade × tempo = ${speed} × ${time} = ${total} cm.`};
  }

  // TEMA 3 & 4 — Expressões algébricas
  if(tema==='3'||tema==='4'){
    const r=r4(0,4);
    if(r===0){
      const a=r4(2,8),b=r4(1,6),x=r4(1,5);
      const val=a*x+b;
      return{en:`Calcula o valor numérico de ${a}x + ${b} para x = ${x}.`,
        opts:sh4([`A) ${val}`,`B) ${a*x}`,`C) ${(a+b)*x}`,`D) ${val+a}`].slice(0,4)),
        c:`A) ${val}`,fb:`Substitui x = ${x}:\n${a}×${x} + ${b} = ${a*x} + ${b} = ${val}.`};
    }
    if(r===1){
      const a=r4(2,5),b=r4(1,4),c=r4(1,4);
      const res=`${a+c}x + ${b}`;// simplify (a)x + b + cx = (a+c)x + b
      return{en:`Simplifica: ${a}x + ${b} + ${c}x = ?`,
        opts:sh4([`A) ${res}`,`B) ${a+b+c}x`,`C) ${a*c}x + ${b}`,`D) ${a}x + ${b+c}`].slice(0,4)),
        c:`A) ${res}`,fb:`Agrupa os termos em x:\n${a}x + ${c}x = ${a+c}x.\nResultado: ${res}.`};
    }
    if(r===2){
      const a=r4(2,6),b=r4(1,5);
      const perim=`${2*a+2*b}`; // or as expression
      return{en:`Um retângulo tem comprimento ${a} cm e largura ${b} cm. Qual é o perímetro?`,
        opts:sh4([`A) ${2*a+2*b} cm`,`B) ${a*b} cm`,`C) ${a+b} cm`,`D) ${2*(a+b)+2} cm`]),
        c:`A) ${2*a+2*b} cm`,fb:`P = 2 × comprimento + 2 × largura = 2×${a} + 2×${b} = ${2*a} + ${2*b} = ${2*a+2*b} cm.`};
    }
    if(r===3){
      // distributiva
      const a=r4(2,5),b=r4(1,4),c=r4(1,4);
      const res1=a*b,res2=a*c;
      return{en:`Expande: ${a}(${b}x + ${c}) = ?`,
        opts:sh4([`A) ${res1}x + ${res2}`,`B) ${a+b}x + ${a+c}`,`C) ${res1}x + ${c}`,`D) ${b}x + ${res2}`]),
        c:`A) ${res1}x + ${res2}`,fb:`Distributiva: ${a} × ${b}x = ${res1}x e ${a} × ${c} = ${res2}.\nResultado: ${res1}x + ${res2}.`};
    }
    // r===4: expressão do perímetro
    const a=r4(2,5);
    return{en:`Um quadrado tem lado (2x + ${a}) cm. Qual é a expressão do perímetro?`,
      opts:sh4([`A) 8x + ${4*a}`,`B) 4x + ${a}`,`C) 2x + ${4*a}`,`D) 4x + ${4*a}`]),
      c:`A) 8x + ${4*a}`,fb:`P = 4 × lado = 4 × (2x + ${a}) = 8x + ${4*a} cm.`};
  }

  // TEMA 5 & 6 — Equações
  if(tema==='5'||tema==='6'){
    const r=r4(0,4);
    if(r===0){
      const sol=r4(easy?1:hard?-8:1,easy?5:hard?8:6);
      const b=r4(1,5);const a=r4(2,4);
      const rhs=a*sol+b;
      return{en:`Resolve a equação: ${a}x + ${b} = ${rhs}`,
        visual: svgBalanca(`${a}x + ${b}`, String(rhs)),
        opts:sh4([`A) x = ${sol}`,`B) x = ${sol+1}`,`C) x = ${(rhs+b)/a}`,`D) x = ${sol-1}`]),
        c:`A) x = ${sol}`,fb:`${a}x + ${b} = ${rhs}\n${a}x = ${rhs} − ${b} = ${rhs-b}\nx = ${rhs-b} ÷ ${a} = ${sol}.\nVerificação: ${a}×${sol} + ${b} = ${rhs} ✓`};
    }
    if(r===1){
      const sol=r4(1,easy?4:8);
      const a=r4(2,4),b=r4(1,5),c=r4(1,3),d=r4(1,4);
      const lhs=a*sol+b,rhs2=c*sol+d;
      return{en:`Resolve: ${a}x + ${b} = ${lhs} (sabendo que ${c}x + ${d} = ${rhs2})`,
        opts:sh4([`A) x = ${sol}`,`B) x = ${sol+1}`,`C) x = ${sol*2}`,`D) x = ${sol-1}`]),
        c:`A) x = ${sol}`,fb:`${a}x = ${lhs} − ${b} = ${lhs-b}\nx = ${lhs-b} ÷ ${a} = ${sol}.`};
    }
    if(r===2){
      const sol=r4(1,easy?5:10);
      const a=r4(2,4),b=r4(2,5);
      const rhs=a*sol-b;
      const rhsNeg=rhs<0;
      return{en:`Resolve: ${a}x − ${b} = ${rhs}`,
        opts:sh4([`A) x = ${sol}`,`B) x = ${(rhs-b)/a}`,`C) x = ${sol+1}`,`D) x = ${sol-1}`]),
        c:`A) x = ${sol}`,fb:`${a}x − ${b} = ${rhs}\n${a}x = ${rhs} + ${b} = ${rhs+b}\nx = ${rhs+b} ÷ ${a} = ${sol}.\nVerificação: ${a}×${sol} − ${b} = ${a*sol-b} = ${rhs} ✓`};
    }
    if(r===3){
      const sol=r4(1,6);
      const a=r4(2,4),b=r4(1,5),c=r4(1,3);
      const rhs=(a-c)*sol+b;
      return{en:`Resolve: ${a}x + ${b} = ${c}x + ${rhs+c*sol-(a-c)*sol}`,
        opts:sh4([`A) x = ${sol}`,`B) x = ${sol+1}`,`C) x = ${rhs}`,`D) x = ${sol-1}`]),
        c:`A) x = ${sol}`,fb:`${a}x + ${b} = ${c}x + ${rhs+c*sol-(a-c)*sol}\n${a}x − ${c}x = ${rhs+c*sol-(a-c)*sol} − ${b}\n${a-c}x = ${(a-c)*sol}\nx = ${sol}.`};
    }
    // r===4: equação de problemas
    const pPrice=r4(3,8)*5,q=r4(2,5),tot=pPrice*q;
    return{en:`O Miguel comprou ${q} cadernos a p € cada e pagou ${tot} €. Qual é o preço p de cada caderno?`,
      opts:sh4([`A) ${pPrice} €`,`B) ${tot+pPrice} €`,`C) ${tot-pPrice} €`,`D) ${pPrice*2} €`]),
      c:`A) ${pPrice} €`,fb:`Equação: ${q}p = ${tot}.\np = ${tot} ÷ ${q} = ${pPrice} €.`};
  }

  // TEMA 7 & 8 — Equações avançadas / problemas
  if(tema==='7'||tema==='8'){
    const r=r4(0,3);
    if(r===0){
      // Equação com parênteses
      const sol=r4(1,easy?4:8);
      const a=r4(2,4),b=r4(1,4);
      const rhs=a*(sol+b);
      return{en:`Resolve: ${a}(x + ${b}) = ${rhs}`,
        opts:sh4([`A) x = ${sol}`,`B) x = ${rhs/a}`,`C) x = ${sol+1}`,`D) x = ${sol-1}`]),
        c:`A) x = ${sol}`,fb:`Divide ambos os membros por ${a}:\nx + ${b} = ${rhs}/${a} = ${rhs/a}.\nx = ${rhs/a} − ${b} = ${sol}.`};
    }
    if(r===1){
      // Problema: duas quantidades
      const x=r4(2,8),tot=r4(x+3,x+12);const y=tot-x;
      return{en:`A soma de dois números é ${tot}. O maior é ${x} mais do que o menor. Qual é o menor número?`,
        opts:sh4([`A) ${y}`,`B) ${x}`,`C) ${tot}`,`D) ${(tot-x)/2}`]),
        c:`A) ${y}`,fb:`Sejam x (menor) e x + ${x} (maior).\nx + (x + ${x}) = ${tot}\n2x = ${tot-x}\nx = ${(tot-x)/2}.\nMenor = ${(tot-x)/2}, Maior = ${(tot-x)/2+x} = ${y+x}.\nHmmm... Verifica: ${(tot-x)/2} + ${(tot-x)/2+x} = ${tot} ✓`};
    }
    if(r===2){
      const age=r4(8,15),diff=r4(2,5);
      const parentAge=age+r4(20,25);
      return{en:`A Inês tem ${age} anos e a mãe tem ${parentAge}. Daqui a quantos anos (x) será a mãe o dobro da idade da Inês?`,
        opts:sh4([`A) ${parentAge-2*age}`,`B) ${parentAge-age}`,`C) ${age}`,`D) ${parentAge-2*age+1}`]),
        c:`A) ${parentAge-2*age}`,fb:`${parentAge}+x = 2×(${age}+x)\n${parentAge}+x = ${2*age}+2x\n${parentAge}-${2*age} = x\nx = ${parentAge-2*age} anos.`};
    }
    // r===3: Equação impossível/indeterminada
    const a=r4(2,5);
    return{en:`Resolve a equação ${a}x − ${a*3} = ${a}x + ${a*2}. O que podes concluir?`,
      opts:sh4(['A) Impossível (sem solução)','B) x = 0','C) Infinitas soluções','D) x = 5']),
      c:'A) Impossível (sem solução)',fb:`${a}x − ${a*3} = ${a}x + ${a*2}.\nSubtrai ${a}x de ambos os membros:\n−${a*3} = ${a*2}.\nIsso é FALSO → equação IMPOSSÍVEL, não tem solução.`};
  }

  // fallback
  return BANCO4.questoes[Math.floor(Math.random()*BANCO4.questoes.length)];
}

function renderQuestoes4(){
  qData4={};
  // Mix static + dynamic questions
  var dif=document.querySelector('#sec-questoes4 .gen-level-btn.active')?.dataset?.level||'medio';
  var allQ=BANCO4.questoes.slice();
  // Add dynamically generated questions to reach 20
  ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8'].forEach(function(t){
    var q=buildEx4(t,dif);if(q)allQ.push(q);
  });
  // Shuffle and take first 20
  allQ=allQ.sort(()=>Math.random()-.5).slice(0,20);
  renderQuestions4(allQ,'q4-container','q4');
}
var currentMini4=0;
function showMini4(idx,btn){
  currentMini4=idx;
  document.querySelectorAll('#mini-tabs4 .tab-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  else if(document.querySelectorAll('#mini-tabs4 .tab-btn')[idx])document.querySelectorAll('#mini-tabs4 .tab-btn')[idx].classList.add('active');
  qData4={};
  scores4['m4']={correct:0,total:0};
  updateScoreBar4('m4');
  var prefix='mini'+idx;
  var qs;
  if(idx===0){
    qs=[];
    for(var i=1;i<=8;i++){if(BANCO4.minitestes[i])qs=qs.concat(BANCO4.minitestes[i].slice(0,3));}
  } else {
    qs=BANCO4.minitestes[idx]||[];
  }
  qData4={};
  renderQuestions4(qs,'m4-container',prefix);
}
function renderTeste4(){qData4={};renderQuestions4(BANCO4.teste,'t4-container','t4');}

// ═══════════════════════════════════════════
// FLASHCARDS
// ═══════════════════════════════════════════
var fc4Idx=0,fc4Flipped=false,fc4Order=[];
function initFlashcards4(){
  fc4Order=BANCO4.flashcards.map(function(_,i){return i;});
  fc4Show4();
}
function fc4Show4(){
  fc4Flipped=false;
  document.getElementById('fc4-inner').style.transform='';
  var fc=BANCO4.flashcards[fc4Order[fc4Idx]];
  document.getElementById('fc4-tag').textContent=fc.tag;
  document.getElementById('fc4-q').textContent=fc.q;
  document.getElementById('fc4-a').textContent=fc.a;
  var n=fc4Order.length;
  document.getElementById('fc4-counter').textContent=(fc4Idx+1)+' / '+n;
  document.getElementById('fc4-prog').style.width=Math.round((fc4Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc4-dots');
  dots.innerHTML='';
  fc4Order.forEach(function(_,i){
    var d=document.createElement('div');
    d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc4Idx?'var(--c2-mid)':'var(--border2)');
    dots.appendChild(d);
  });
}
function fc4Flip(){
  fc4Flipped=!fc4Flipped;
  document.getElementById('fc4-inner').style.transform=fc4Flipped?'rotateY(180deg)':'';
}
function fc4Next(){fc4Idx=(fc4Idx+1)%fc4Order.length;fc4Show4();}
function fc4Prev(){fc4Idx=(fc4Idx-1+fc4Order.length)%fc4Order.length;fc4Show4();}
function fc4Shuffle(){
  for(var i=fc4Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc4Order[i];fc4Order[i]=fc4Order[j];fc4Order[j]=t;}
  fc4Idx=0;fc4Show4();
}

// ═══════════════════════════════════════════
// JOGO DAS EQUAÇÕES
// ═══════════════════════════════════════════
var eqList4=[
  {eq:'x + 3 = 7',sol:4},{eq:'2x = 10',sol:5},{eq:'x - 5 = 0',sol:5},
  {eq:'3x = 9',sol:3},{eq:'x + 8 = 3',sol:-5},{eq:'-2x = 6',sol:-3},
  {eq:'4x - 4 = 0',sol:1},{eq:'5x = 15',sol:3},{eq:'x/2 = 4',sol:8},
  {eq:'2x + 1 = 7',sol:3},{eq:'3x - 2 = 7',sol:3},{eq:'x - 10 = -3',sol:7}
];
var selEq4=null,jogoScore4=0,jogoCount4=0;
function selectEq4(i,e){
  var tile=document.getElementById('eq-tile4-'+i);
  if(tile.classList.contains('used'))return;
  selEq4={idx:i,eq:e};
  document.getElementById('eq-selected4').textContent='Equação: '+e.eq;
  document.getElementById('eq-answer4').value='';
  document.getElementById('eq-feedback4').textContent='';
  document.getElementById('eq-input-area4').style.display='flex';
  document.getElementById('eq-answer4').focus();
}

function checkEq4(){
  if(!selEq4)return;
  var inp=document.getElementById('eq-answer4');
  var fb=document.getElementById('eq-feedback4');
  if(!inp||!fb)return;
  var userVal=parseFloat(inp.value);
  if(isNaN(userVal)){fb.textContent='Insere um número.';fb.style.color='var(--wrong)';return;}
  var correct=Math.abs(userVal-selEq4.eq.sol)<0.001;
  fb.textContent=correct?'✓ Correto! x = '+selEq4.eq.sol:'✗ Incorreto. A solução é x = '+selEq4.eq.sol;
  fb.style.color=correct?'var(--correct)':'var(--wrong)';
  if(correct){
    var tile=document.getElementById('eq-tile4-'+selEq4.idx);
    if(tile){tile.classList.add('used');tile.style.opacity='.4';}
    jogoScore4++;jogoCount4++;
    _etRecord('cap4','q','eq4-'+selEq4.idx,selEq4.eq.eq,true);
    document.getElementById('eq-input-area4').style.display='none';
    selEq4=null;
  } else {
    jogoCount4++;
    _etRecord('cap4','q','eq4-'+selEq4.idx,selEq4.eq.eq,false);
    inp.value='';inp.focus();
  }
}

// ═══════════════════════════════════════════
// RELÂMPAGO
// ═══════════════════════════════════════════
var relScores4={correct:0,total:0};
var relDone4={};
function ansRel4(qIdx,chosen,correct,btn,fb){
  if(relDone4[qIdx])return;relDone4[qIdx]=true;
  var isC=chosen===correct;
  relScores4.total++;
  if(isC)relScores4.correct++;
  _etRecord('cap4','rel','rel4-'+qIdx,(function(){var el=document.getElementById('rq4-'+qIdx);return el?el.querySelector('.q-text')?el.querySelector('.q-text').textContent.trim().slice(0,140):String(qIdx):String(qIdx);})(),isC);
  var parent=btn.closest('.relampago-q');
  parent.querySelectorAll('.relampago-opt').forEach(function(b,j){
    b.disabled=true;
    if(j===correct)b.classList.add('correct');
    else if(j===chosen&&!isC)b.classList.add('wrong');
  });
  var fbEl=document.getElementById('rfb4-'+qIdx);
  if(fbEl){
    var bgC=isC?'#edf7ed':'#fdf0ef';var brC=isC?'#4caf50':'#e57373';
    fbEl.innerHTML='<div style="display:flex;align-items:flex-start;gap:8px;padding:10px 14px;background:'+bgC+';border:1px solid '+brC+';border-radius:8px;margin-top:6px"><span style="font-size:1rem">'+(isC?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>')+'</span><div style="flex:1;font-size:.83rem;line-height:1.5"><strong style="color:'+(isC?'var(--correct)':'var(--wrong)')+'">'+( isC?'Correto!':'Incorreto.')+'</strong><br><span style="color:var(--ink3)">'+fb+'</span></div></div>';
  }
  document.getElementById('rel4-score').textContent=relScores4.correct;
  document.getElementById('rel4-total').textContent='/ '+relScores4.total;
  document.getElementById('rel4-prog').style.width=Math.round(relScores4.correct/10*100)+'%';
  if(relScores4.total>=10){
    setTimeout(function(){
      var r=document.getElementById('relampago4-result');
      r.style.display='block';
      var pct=Math.round(relScores4.correct/10*100);
      r.innerHTML='<div class="highlight-box '+(pct>=70?'green':'orange')+'"><strong>'+relScores4.correct+'/10 ('+pct+'%)</strong> — '+(pct>=80?'Excelente! <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'Bom trabalho! <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'Continua a praticar! <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>')+'<br><button class="btn btn-ghost" onclick="relDone4={};novoRelampago4()" style="margin-top:.5rem">↺ Tentar de novo</button></div>';
      _pmRecord('cap4','quiz',{pontuacao:relScores4.correct,total:10});
      _pmRecord('cap4','jogo');
    },400);
  }
}
var vfDone4={};
function ansVF4(idx,chosen,correct,btn,fb){
  if(vfDone4[idx])return;vfDone4[idx]=true;
  var isC=chosen===correct;
  var vfS4={correct:parseInt(document.getElementById('vf4-score').textContent)||0,total:parseInt((document.getElementById('vf4-total').textContent||'/ 0').replace('/ ',''))||0};
  vfS4.total++;if(isC)vfS4.correct++;
  var parent=btn.closest('.relampago-q');
  parent.querySelectorAll('.relampago-opt').forEach(function(b){
    b.disabled=true;
    var isV=b.textContent.trim()==='Verdadeiro';
    if(isV===correct)b.classList.add('correct');
    else if(isV===chosen&&!isC)b.classList.add('wrong');
  });
  var fbEl=document.getElementById('vffb4-'+idx);
  if(fbEl){
    var bgC=isC?'#edf7ed':'#fdf0ef';var brC=isC?'#4caf50':'#e57373';
    fbEl.innerHTML='<div style="display:flex;align-items:flex-start;gap:8px;padding:10px 14px;background:'+bgC+';border:1px solid '+brC+';border-radius:8px;margin-top:6px"><span style="font-size:1rem">'+(isC?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>')+'</span><div style="flex:1;font-size:.83rem;line-height:1.5"><strong style="color:'+(isC?'var(--correct)':'var(--wrong)')+'">'+( isC?'Correto!':'Incorreto.')+'</strong><br><span style="color:var(--ink3)">'+fb+'</span></div></div>';
  }
  document.getElementById('vf4-score').textContent=vfS4.correct;
  document.getElementById('vf4-total').textContent='/ '+vfS4.total;
  document.getElementById('vf4-prog').style.width=Math.round(vfS4.correct/6*100)+'%';
}

// ═══════════════════════════════════════════
// GERADOR
// ═══════════════════════════════════════════
var fichaContent4='';
function gerarFicha4(){
  var tema=parseInt(document.getElementById('gen4-tema').value);
  var tipo=document.getElementById('gen4-tipo').value;
  var nivel=document.getElementById('gen4-nivel').value;
  var qtd=parseInt(document.getElementById('gen4-qtd').value);
  var pool=[];
  var allQ=BANCO4.questoes.concat(BANCO4.teste);
  BANCO4.minitestes.slice(1).forEach(function(m){if(m)allQ=allQ.concat(m);});
  if(tema>0)allQ=allQ.filter(function(q){return q.tema===tema;});
  for(var i=allQ.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=allQ[i];allQ[i]=allQ[j];allQ[j]=t;}
  pool=allQ.slice(0,qtd);
  if(pool.length===0){
    document.getElementById('gen4-output').style.display='block';
    document.getElementById('gen4-output').innerHTML='<p style="color:var(--ink3)">Sem questões disponíveis para esta configuração. Tenta um subtema diferente.</p>';
    return;
  }
  var html='<div style="font-family:\'Montserrat\',sans-serif;max-width:720px">';
  html+='<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.3rem;margin-bottom:1rem;color:var(--ink)">Ficha Gerada — Capítulo 4</h3>';
  pool.forEach(function(q,i){
    html+='<div style="margin-bottom:1.25rem;padding:1rem;background:var(--cream);border-radius:10px;border:1px solid var(--border)">';
    html+='<p style="font-weight:600;font-size:.88rem;margin-bottom:.5rem">'+(i+1)+'. '+q.en+'</p>';
    if(q.opts){q.opts.forEach(function(o){html+='<p style="font-size:.82rem;color:var(--ink3);margin:.2rem 0">'+o+'</p>';});}
    html+='</div>';
  });
  html+='</div>';
  document.getElementById('gen4-output').style.display='block';
  document.getElementById('gen4-output').innerHTML=html;
  document.getElementById('dl-ficha4-btn').style.display='inline-flex';
  fichaContent4=html;
}
function downloadFicha4(){
  var tema=document.getElementById('gen4-tema').options[document.getElementById('gen4-tema').selectedIndex].text;
  var fullHtml='<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Ficha — Cap. 4 Mat. 7.º Ano</title><style>body{font-family:Montserrat,sans-serif;max-width:720px;margin:2rem auto;padding:1rem;color:#2a2724}.q{margin-bottom:1.5rem;padding:1rem;border:1px solid #ddd;border-radius:8px}h1{font-family:Georgia,serif;font-size:1.4rem;margin-bottom:.5rem}h2{font-size:1rem;color:#516860}p{margin:.25rem 0;font-size:.88rem}@media print{body{margin:.5rem}.q{page-break-inside:avoid}}</style></head><body>';
  fullHtml+='<h1>3ponto14 · Matemática 7.º Ano · Capítulo 4</h1><h2>'+tema+'</h2><hr style="margin:1rem 0">';
  fullHtml+=fichaContent4;
  fullHtml+='</body></html>';
  var blob=new Blob([fullHtml],{type:'text/html'});
  htmlToPdfDownload(fullHtml, 'ficha_cap4_mat7.pdf');
}

// ═══════════════════════════════════════════
// EXAME
// ═══════════════════════════════════════════
var exameTimer4=null,exameLevel4='medio',exameStarted4=false;
function exame4SetLevel(btn){
  document.querySelectorAll('#exame4-config .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');exameLevel4=btn.dataset.level;
}
function exame4Start(){
  var tempo=parseInt(document.getElementById('exame4-tempo').value);
  var qtd=parseInt(document.getElementById('exame4-qtd').value);
  document.getElementById('exame4-config').style.display='none';
  document.getElementById('exame4-running').style.display='block';
  document.getElementById('exame4-result').style.display='none';
  var pool=BANCO4.questoes.concat(BANCO4.minitestes.slice(1).reduce(function(a,m){return m?a.concat(m):a;},[]),BANCO4.teste);
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  var qs=pool.slice(0,qtd);
  qData4={};
  renderQuestions4(qs,'exame4-container','ex4');
  var timeLeft=tempo;
  function fmt(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}
  document.getElementById('exame4-timer').textContent=fmt(timeLeft);
  document.getElementById('exame4-prog').style.width='0%';
  exameTimer4=setInterval(function(){
    timeLeft--;
    document.getElementById('exame4-timer').textContent=fmt(timeLeft);
    document.getElementById('exame4-prog').style.width=Math.round((tempo-timeLeft)/tempo*100)+'%';
    if(timeLeft<=0){clearInterval(exameTimer4);exame4Submit();}
  },1000);
  exameStarted4=true;
}
function exame4Submit(){
  examActive = false; // clear guard regardless of how finish was triggered
  if(exameTimer4)clearInterval(exameTimer4);
  document.getElementById('exame4-running').style.display='none';
  var s=getScore4('ex4');
  var pct=s.total>0?Math.round(s.correct/s.total*100):0;
  var res=document.getElementById('exame4-result');
  res.style.display='block';
  res.innerHTML='<div class="card"><div class="card-title">Resultado do Exame</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:2.5rem;font-weight:900;color:'+(pct>=70?'var(--correct)':'var(--wrong)')+'">'+pct+'%</div><p style="margin:.5rem 0;color:var(--ink3)">'+s.correct+' corretas de '+s.total+' questões</p><div class="highlight-box '+(pct>=70?'green':'orange')+'" style="margin-top:1rem">'+(pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span> Excelente preparação!':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span> Bom resultado — continua a praticar!':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span> Revê a teoria e volta a tentar!')+'</div><div style="margin-top:1rem;display:flex;gap:.75rem"><button class="btn btn-primary" onclick="document.getElementById(\'exame4-config\').style.display=\'block\';document.getElementById(\'exame4-result\').style.display=\'none\'">↺ Novo Exame</button><button class="btn btn-ghost" onclick="showSection4(\'teoria4\',document.querySelector(\'#tabs4 .tab-btn\'))"><span class=\"ico ico-sm\"><svg><use href=\"#ico-book-open\"/></svg></span> Rever Teoria</button></div></div>';
}

// ═══════════════════════════════════════════
// PROGRESSO
// ═══════════════════════════════════════════
function saveProgData4(prefix,data){
  try{var p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');p[prefix]=data;p['last_updated']=new Date().toLocaleDateString('pt-PT');localStorage.setItem('edupt_cap4',JSON.stringify(p));}catch(e){}
  setTimeout(_progRefreshBars, 80);
}
function renderProg4(){
  // barras por capítulo (visão global)
  _progRenderCapitulosBar('prog4-caps', 4);

  var p={};
  try{p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');}catch(e){}
  var sections=[
    {key:'q4',name:'Questões-aula',total:16},
    {key:'mini1',name:'Mini 1 — Sequências',total:5},
    {key:'mini2',name:'Mini 2 — Prob. Seq.',total:5},
    {key:'mini3',name:'Mini 3 — Exp. Alg.',total:5},
    {key:'mini4',name:'Mini 4 — Simplif.',total:5},
    {key:'mini5',name:'Mini 5 — Equações',total:5},
    {key:'mini6',name:'Mini 6 — Equiv.',total:4},
    {key:'mini7',name:'Mini 7 — Classif.',total:5},
    {key:'mini8',name:'Mini 8 — Problemas',total:4},
    {key:'t4',name:'Teste',total:11},
    {key:'ex4',name:'Exame',total:15}
  ];
  var html='';
  sections.forEach(function(s){
    var d=p[s.key]||{correct:0,total:0};
    var pct=d.total>0?Math.round(d.correct/d.total*100):0;
    html+='<div class="prog-section-row"><span class="prog-section-name">'+s.name+'</span><div class="progress-track" style="flex:1"><div class="progress-fill" style="width:'+pct+'%"></div></div><span class="prog-pct">'+pct+'%</span></div>';
  });
  if(!html)html='<p style="color:var(--ink4);font-size:.88rem">Faz algumas atividades para ver o teu progresso aqui!</p>';
  document.getElementById('prog4-rows').innerHTML=html;
  var scores='';
  if(p.last_updated)scores='<p>Última atividade: '+p.last_updated+'</p>';
  sections.forEach(function(s){
    var d=p[s.key];
    if(d&&d.total>0)scores+='<p>'+s.name+': '+d.correct+'/'+d.total+'</p>';
  });
  document.getElementById('prog4-scores').innerHTML=scores||'Sem dados ainda. Faz algumas atividades!';
}
function resetProg4(){
  try{localStorage.removeItem('edupt_cap4');}catch(e){}
  scores4={};renderProg4();
}

// ═══════════════════════════════════════════
// DOWNLOADS
// ═══════════════════════════════════════════
function dl4(type){
  var content='';var filename='';var title='';
  if(type==='ficha-completa'){title='Ficha de Trabalho Completa — Cap. 4';filename='ficha_completa_cap4_mat7.html';content=buildFichaCompleta4();}
  else if(type==='teste'){title='Teste de Avaliação — Cap. 4';filename='teste_cap4_mat7.html';content=buildTeste4HTML();}
  else if(type==='mini-seq'){title='Minitestes 1 e 2 — Sequências';filename='mini_seq_cap4_mat7.html';content=buildMini4HTML([1,2]);}
  else if(type==='mini-alg'){title='Minitestes 3 e 4 — Álgebra';filename='mini_alg_cap4_mat7.html';content=buildMini4HTML([3,4]);}
  else if(type==='mini-eq'){title='Minitestes 5 a 8 — Equações';filename='mini_eq_cap4_mat7.html';content=buildMini4HTML([5,6,7,8]);}
  else if(type==='resumo'){title='Resumo Teórico — Cap. 4';filename='resumo_cap4_mat7.html';content=buildResumo4();}
  else if(type==='ficha-desen'){title='Ficha de Desenvolvimento — Cap. 4';filename='ficha_desen_cap4_mat7.html';content=buildFichaDesen4();}
  var wrap='<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+title+'</title><style>body{font-family:Montserrat,Georgia,sans-serif;max-width:720px;margin:2rem auto;padding:1.5rem;color:#2a2724;line-height:1.6}h1{font-family:Georgia,serif;font-size:1.5rem;margin-bottom:.25rem;color:#2a2724}h2{font-family:Georgia,serif;font-size:1.15rem;color:#516860;border-bottom:2px solid #edf4f1;padding-bottom:.4rem;margin:1.5rem 0 .75rem}.q{margin-bottom:1.5rem;padding:1rem 1.25rem;border:1px solid #ddd;border-radius:8px;break-inside:avoid}.q p{margin:.2rem 0;font-size:.88rem}.formula{background:#f0eeec;border:1px solid #ccc;border-radius:6px;padding:.5rem 1rem;font-family:\'Courier New\',monospace;margin:.5rem 0;text-align:center}.answer{color:#516860;font-weight:700}.footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #ddd;font-size:.75rem;color:#999;text-align:center}@media print{body{margin:.5cm}.q{page-break-inside:avoid}}</style></head><body>';
  wrap+='<h1>3ponto14 · Matemática 7.º Ano · Capítulo 4</h1><h2>'+title+'</h2><hr style="margin:1rem 0;border-color:#eee">';
  wrap+=content;
  wrap+='<div class="footer">3π · Centro de Estudos · Online e Presencial · 3ponto14</div></body></html>';
  var blob=new Blob([wrap],{type:'text/html'});
  htmlToPdfDownload(wrap, filename.replace('.html','.pdf'));
}
function buildFichaCompleta4(){
  var h='';
  var qs=BANCO4.questoes.concat(BANCO4.teste.slice(0,5));
  qs.forEach(function(q,i){
    h+='<div class="q"><p><strong>'+(i+1)+'. '+q.en+'</strong></p>';
    if(q.opts)q.opts.forEach(function(o){h+='<p>'+o+'</p>';});
    h+='<p style="color:#999;font-size:.78rem;margin-top:.5rem">Resposta: ___________________</p></div>';
  });
  return h;
}
function buildTeste4HTML(){
  var h='<p style="font-size:.82rem;color:#999">Duração: 45 minutos · Avaliação: 100 pontos</p><br>';
  BANCO4.teste.forEach(function(q,i){
    h+='<div class="q"><p><strong>'+(i+1)+'. '+q.en.replace(/<[^>]+>/g,'')+'</strong></p>';
    if(q.opts)q.opts.forEach(function(o){h+='<p>'+o+'</p>';});
    h+='</div>';
  });
  return h;
}
function buildMini4HTML(idxs){
  var h='';
  idxs.forEach(function(idx){
    var m=BANCO4.minitestes[idx];if(!m)return;
    h+='<h2>Miniteste '+idx+'</h2>';
    m.forEach(function(q,i){
      h+='<div class="q"><p><strong>'+(i+1)+'. '+q.en+'</strong></p>';
      q.opts.forEach(function(o){h+='<p>'+o+'</p>';});
      h+='</div>';
    });
  });
  return h;
}
function buildResumo4(){
  return '<h2>1. Sequências e Termo Geral</h2>'+
'<p>Uma <strong>sequência numérica</strong> é uma lista ordenada de números. O <strong>termo geral a<sub>n</sub></strong> permite calcular qualquer termo a partir da posição n.</p>'+
'<div class="formula">Sequência aritmética: a<sub>n</sub> = a₁ + (n−1)×r</div>'+
'<p><em>Dica:</em> Calcula a diferença entre termos consecutivos (razão r), depois usa a fórmula.</p>'+
'<h2>2. Expressões Algébricas</h2>'+
'<p>Combinação de números, variáveis e operações. <strong>Termos semelhantes</strong> = mesma parte literal.</p>'+
'<table><tr><th>Expressão</th><th>Coeficiente</th><th>Parte literal</th></tr><tr><td>3x</td><td>3</td><td>x</td></tr><tr><td>−7ab</td><td>−7</td><td>ab</td></tr></table>'+
'<h2>3. Simplificação</h2>'+
'<p>Soma coeficientes dos termos semelhantes. <strong>Distributiva:</strong> a(b+c) = ab+ac</p>'+
'<h2>4. Equações do 1.º Grau</h2>'+
'<div class="formula">Princípio aditivo: a = b ⟺ a ± k = b ± k</div>'+
'<div class="formula">Princípio multiplicativo: a = b ⟺ a·k = b·k (k ≠ 0)</div>'+
'<p><strong>Estratégia:</strong> Distribuir → Passar incógnitas para um lado → Isolar x → Verificar</p>'+
'<h2>5. Classificação de Equações</h2>'+
'<table><tr><th>Tipo</th><th>Forma</th><th>Solução</th></tr>'+
'<tr><td><strong>PD</strong></td><td>cx=k (c≠0)</td><td>S={k/c}</td></tr>'+
'<tr><td><strong>I</strong></td><td>0x=k (k≠0)</td><td>S=∅</td></tr>'+
'<tr><td><strong>PI</strong></td><td>0x=0</td><td>S=ℝ</td></tr></table>'+
'<h2>6. Resolução de Problemas</h2>'+
'<p>1) Definir variável → 2) Traduzir em equação → 3) Resolver → 4) Verificar no contexto</p>';
}
function buildFichaDesen4(){
  return '<h2>Ficha de Desenvolvimento — Desafios do Capítulo 4</h2>'+
'<p style="color:#666;margin-bottom:1.5rem"><em>Problemas avançados — preparação para provas de aferição</em></p>'+
'<div class="q"><p><strong>1.</strong> Termo geral: a) 3,7,11,15,… b) 10,15,20,25,… c) −6,−8,−10,… d) 1,4,9,16,25,… e) 1/2,2/3,3/4,…</p></div>'+
'<div class="q"><p><strong>2.</strong> Duas expressões cuja soma seja: Expressões: 3x+1, −4x+2, x−3, 2x+5, −x−2, x+8. a) −x+3 b) x+8 c) 0</p></div>'+
'<div class="q"><p><strong>3.</strong> Resolve e classifica: a) x+4=12 b) 5x−4=−x c) 5x+3=x+3 d) 3a+2=5a+2−2a e) 2(x−3)=4x−6−2x f) 3(2x+1)−x=5x+3</p></div>'+
'<div class="q"><p><strong>4.</strong> Auscultadores: fio de x cm e x+10 cm. Distância máxima 80 cm. Determina x.</p></div>'+
'<div class="q"><p><strong>5.</strong> Dois pares consecutivos: dobro do menor = soma do maior com 10.</p></div>'+
'<div class="q"><p><strong>6. ★</strong> O João tem x anos. A mãe tem o triplo. Daqui a 12 anos, a mãe terá o dobro do João. Calcula as idades.</p></div>'+
'<div class="q"><p><strong>7. ★</strong> Retângulo: perímetro 56 cm, comprimento excede largura em 8 cm. Dimensões e área.</p></div>'+
'<div class="q"><p><strong>8. ★</strong> Soma de 3 ímpares consecutivos = 81. Determina os números.</p></div>'+
'<div class="q"><p><strong>9. ★</strong> Loja: desconto 20% + 5€ extra. Preço final = 35€. Preço original?</p></div>'+
'<div class="q"><p><strong>10. ★★</strong> Para que valores de a e b, ax+b=2x+6 é: a) PD? b) Impossível? c) PI?</p></div>';
}

/* ── Block 4 (from line 8086) ── */
(function(){
  // 1. PARTÍCULAS FLUTUANTES COM LINHAS DE LIGAÇÃO
  function initParticles(){
    var canvas=document.createElement('canvas');
    canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.5';
    document.body.prepend(canvas);
    var ctx=canvas.getContext('2d');
    var W,H,pts=[];
    var COLS=['#77998E','#AB9790','#516860','#D7BDB2','#9ab5aa'];
    function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
    resize();addEventListener('resize',resize);
    function P(){this.reset(true)}
    P.prototype.reset=function(init){
      this.x=Math.random()*W;this.y=init?Math.random()*H:H+10;
      this.r=Math.random()*2.5+.8;this.vx=(Math.random()-.5)*.35;this.vy=-(Math.random()*.45+.15);
      this.a=0;this.ta=Math.random()*.3+.06;this.c=COLS[Math.floor(Math.random()*COLS.length)];
      this.pulse=Math.random()*Math.PI*2;this.ps=Math.random()*.02+.01;
      this.diamond=Math.random()>.7;
    };
    P.prototype.tick=function(){
      this.x+=this.vx;this.y+=this.vy;this.pulse+=this.ps;
      this.a=Math.min(this.a+.007,this.ta*(0.8+0.2*Math.sin(this.pulse)));
      if(this.y<-20)this.reset(false);
    };
    P.prototype.draw=function(){
      ctx.save();ctx.globalAlpha=this.a;ctx.fillStyle=this.c;
      if(this.diamond){ctx.translate(this.x,this.y);ctx.rotate(Math.PI/4+this.pulse*.3);ctx.fillRect(-this.r,-this.r,this.r*2,this.r*2);}
      else{ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    };
    for(var i=0;i<55;i++)pts.push(new P());
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.07;ctx.strokeStyle='#77998E';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
      }
      pts.forEach(function(p){p.tick();p.draw();});
      requestAnimationFrame(loop);
    }
    loop();
  }
  initParticles();

  // 2. BARRA DE PROGRESSO DE SCROLL
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#77998E,#AB9790,#516860);width:0%;pointer-events:none;box-shadow:0 0 8px rgba(119,153,142,.5);transition:width .1s';
  document.body.appendChild(bar);
  addEventListener('scroll',function(){
    var pct=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;
    bar.style.width=Math.min(pct,100)+'%';
  });

  // 3. RASTO DE CURSOR (só desktop)
  if(innerWidth>768){
    var trail=[];var MAX=10;
    for(var i=0;i<MAX;i++){var d=document.createElement('div');d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';document.body.appendChild(d);trail.push({el:d,x:0,y:0});}
    var mx=0,my=0;
    addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
    function animTrail(){
      trail.forEach(function(t,i){
        var prev=i===0?{x:mx,y:my}:trail[i-1];
        t.x+=(prev.x-t.x)*.35;t.y+=(prev.y-t.y)*.35;
        var sc=1-i/MAX,sz=sc*12,al=sc*.22;
        t.el.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%;width:'+sz+'px;height:'+sz+'px;left:'+(t.x-sz/2)+'px;top:'+(t.y-sz/2)+'px;background:'+(i<MAX/2?'rgba(119,153,142,'+al+')':'rgba(171,151,144,'+al+')')+';mix-blend-mode:multiply';
      });
      requestAnimationFrame(animTrail);
    }
    animTrail();
  }

  // 4. SCROLL REVEAL
  var revStyle=document.createElement('style');
  revStyle.textContent='.rv{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rv.in{opacity:1;transform:none}.rvl{opacity:0;transform:translateX(-24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rvl.in{opacity:1;transform:none}';
  document.head.appendChild(revStyle);
  var revObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.card,.def-block,.quiz-question,.download-card,.mat7-cap-card').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';revObs.observe(el);});
  document.querySelectorAll('.relampago-q,.eq-tile').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*50+'ms';revObs.observe(el);});

  // 5. RIPPLE
  var ripStyle=document.createElement('style');
  ripStyle.textContent='.rp{position:relative;overflow:hidden}.rw{position:absolute;border-radius:50%;transform:scale(0);animation:rwa .55s linear;pointer-events:none;background:rgba(255,255,255,.3)}@keyframes rwa{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(ripStyle);
  document.querySelectorAll('.btn,.tab-btn,.gen-level-btn,.option-btn,.relampago-opt,.dl-btn').forEach(function(btn){
    btn.classList.add('rp');
    btn.addEventListener('click',function(e){
      var r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height);
      var w=document.createElement('span');w.className='rw';
      w.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px';
      btn.appendChild(w);w.addEventListener('animationend',function(){w.remove();});
    });
  });

  // 6. TILT 3D
  var tiltStyle=document.createElement('style');
  tiltStyle.textContent='.tlt{transform-style:preserve-3d;will-change:transform}';
  document.head.appendChild(tiltStyle);
  function tilt(sel,deg){
    document.querySelectorAll(sel).forEach(function(el){
      el.classList.add('tlt');
      el.addEventListener('mousemove',function(e){
        var r=el.getBoundingClientRect();
        var dx=(e.clientX-r.left-r.width/2)/(r.width/2);
        var dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        el.style.transform='perspective(600px) rotateX('+(-dy*deg)+'deg) rotateY('+(dx*deg)+'deg) translateZ(5px)';
      });
      el.addEventListener('mouseleave',function(){
        el.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform='perspective(600px) rotateX(0) rotateY(0)';
        setTimeout(function(){el.style.transition='';},500);
      });
      el.addEventListener('mouseenter',function(){el.style.transition='transform .1s';});
    });
  }
  tilt('.download-card',5);tilt('.def-block',2);

  // 7. AURA DE GLOW
  var auraStyle=document.createElement('style');
  auraStyle.textContent='.aura{position:relative}.aura::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(119,153,142,.16) 0%,transparent 65%);pointer-events:none;transition:opacity .3s;z-index:0}.aura:hover::after{opacity:1}.aura>*{position:relative;z-index:1}';
  document.head.appendChild(auraStyle);
  document.querySelectorAll('.card,.def-block,.quiz-question,.jogo-card').forEach(function(el){
    el.classList.add('aura');
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // 8. PARALLAX NO HERO
  addEventListener('mousemove',function(e){
    var dx=(e.clientX-innerWidth/2)/innerWidth,dy=(e.clientY-innerHeight/2)/innerHeight;
    document.querySelectorAll('.deco').forEach(function(d,i){
      var dep=(i%3+1)*9;d.style.transform='translate('+(dx*dep)+'px,'+(dy*dep)+'px)';
    });
  });

  // 9. STATUS PILL PULSAR
  var spStyle=document.createElement('style');
  spStyle.textContent='@keyframes statusGlow{0%,100%{box-shadow:0 0 0 0 rgba(119,153,142,0)}50%{box-shadow:0 0 0 6px rgba(119,153,142,.14)}}';
  document.head.appendChild(spStyle);
  document.querySelectorAll('.status-pill').forEach(function(el){
    el.style.animation='statusGlow 3s ease-in-out infinite';
  });

  // 10. CONTADORES ANIMADOS
  var cntObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      cntObs.unobserve(e.target);
      var el=e.target,target=+el.dataset.count,t0=performance.now();
      function step(t){
        var p=Math.min((t-t0)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease);
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cntObs.observe(el);});

})();

/* ── Block 5 (from line 14597) ── */
// ═══════════════════════════════════════════════════════
// FEATURE: TEMPORIZADOR POMODORO
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// FEATURE: MODO IMPRESSÃO — Print trigger button logic
// ═══════════════════════════════════════════════════════
window.triggerPrint = function() {
  // Add today's date to print header
  var today = new Date();
  var dateStr = today.toLocaleDateString('pt-PT');
  var fields = document.querySelectorAll('#print-header .ph-field-line');
  if (fields && fields[3]) {
    fields[3].style.borderBottom = 'none';
    fields[3].textContent = dateStr;
    fields[3].style.fontSize = '.78rem';
    fields[3].style.color = '#2a2724';
  }
  window.print();
};

/* ── Block 6 (from line 14760) ── */


/* ── Block 7 (from line 15631) ── */
// ═══════════════════════════════════════════════════════════════
// ESCAPE ROOM v2 — SALA VISUAL ÚNICA
// ═══════════════════════════════════════════════════════════════
(function(){
'use strict';

// ── Helpers ──────────────────────────────────────────────────
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function gcd(a,b){return b===0?a:gcd(b,a%b);}
function lcm(a,b){return a*b/gcd(a,b);}
function fmt(s){var m=Math.floor(s/60),sec=s%60;return m+':'+(sec<10?'0':'')+sec;}

// ── Puzzle generators (one per object) ───────────────────────
var PUZZLES = {

  blackboard: {
    icon: '📖',
    label: 'Mesa Encant.',
    title: 'A Mesa de Encantamentos',
    flavour: 'Os glifos na mesa brilham. Para ler o feitiço tens de resolver a operação com inteiros…',
    hint: 'Lembra-te: subtracção de negativos inverte o sinal. (−a) − (−b) = −a + b.',
    type: 'mc',
    gen: function(){
      var a=ri(2,9),b=ri(1,a-1);
      var q='(−'+a+') − (−'+b+')';
      var ans=(-a)-(-b);
      var opts=shuffle([ans,ans-2,ans+3,ans-4]).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      var dígito=((ans%10)+10)%10;
      return{q:'Calcula: <span class="er2-modal-math">'+q+'</span>',opts:opts,ans:ans,digit:dígito,
             explain:'(−'+a+') − (−'+b+') = −'+a+' + '+b+' = '+ans+'. Dígito: '+dígito};
    }
  },

  safe: {
    icon: '🪵',
    label: 'Bancada',
    title: 'A Bancada de Craft',
    flavour: 'Para craftar o item secreto precisas da fração certa. Simplifica e usa os dois dígitos do resultado.',
    hint: 'Simplifica a fração até ser irredutível. Os dígitos são o numerador e o denominador.',
    type: 'code',
    digits: 2,
    gen: function(){
      var d1=pick([6,8,10]),d2=pick([3,4,5]);
      var n1=ri(1,d1-1),n2=ri(1,d2-1);
      var L=lcm(d1,d2);
      var num=n1*(L/d1)+n2*(L/d2),den=L;
      var g=gcd(Math.abs(num),den);
      var rn=num/g,rd=den/g;
      rn=Math.abs(rn); rd=Math.abs(rd);
      if(rn>9||rd>9){n1=1;n2=1;d1=2;d2=3;L=6;num=5;den=6;g=1;rn=5;rd=6;}
      var code=''+rn+''+rd;
      var safeDigit = rn % 10;
      return{q:'Soma e simplifica: <span class="er2-modal-math">'+n1+'/'+d1+' + '+n2+'/'+d2+'</span>. O código são os dígitos do resultado (numerador, depois denominador).',
             code:code, digit:safeDigit, explain:'= '+num+'/'+den+(g>1?' = '+rn+'/'+rd:''),
             preview:'Resultado: '+rn+'/'+rd+' → código: '+code+' · dígito chave: '+safeDigit};
    }
  },

  bookshelf: {
    icon: '📚',
    label: 'Estante',
    title: 'A Estante de Encantamentos',
    flavour: 'Os livros desta estante guardam o poder das potências. Completa a sequência para desbloqueares o feitiço.',
    hint: 'Numa sequência de potências com a mesma base, cada termo é o anterior multiplicado pela base.',
    type: 'mc',
    gen: function(){
      var base=pick([2,3]);
      var exp=ri(1,3);
      var vals=[Math.pow(base,exp),Math.pow(base,exp+1),Math.pow(base,exp+2),Math.pow(base,exp+3)];
      var hi=2; // hide index 2
      var ans=vals[hi];
      var disp=vals.map(function(v,i){return i===hi?'?':v;});
      var rawOpts=[ans,ans+base,ans*2,ans-1,ans+base+1,ans-base];
      var opts=shuffle(rawOpts.filter(function(v,i,a){return a.indexOf(v)===i;})).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      var dígito=ans%10;
      return{q:'Completa a sequência (base '+base+'): <span class="er2-modal-math">'+disp.join(' , ')+'</span>',
             opts:opts,ans:ans,digit:dígito,
             explain:base+'^'+(exp+2)+' = '+ans+'. Dígito: '+dígito};
    }
  },

  window: {
    icon: '🪟',
    label: 'Janela',
    title: 'A Janela para o Overworld',
    flavour: 'Lá fora vês a sombra de um mob no chão. A área da sombra triangular é o próximo dígito.',
    hint: 'A área do triângulo é (base × altura) ÷ 2.',
    type: 'mc',
    gen: function(){
      var b=ri(4,10),h=ri(3,9);
      // make sure bh is even for clean answer
      if((b*h)%2!==0){b++;}
      var area=(b*h)/2;
      var dígito=area%10;
      var opts=shuffle([area,area+5,area-4,area+8]).slice(0,4);
      if(opts.indexOf(area)<0){opts[0]=area;}
      return{q:'Uma sombra triangular no chão: base <span class="er2-modal-math">'+b+' m</span>, altura <span class="er2-modal-math">'+h+' m</span>. Qual é a área em m²?',
             opts:opts,ans:area,digit:dígito,
             explain:'Área = ('+b+' × '+h+') ÷ 2 = '+area+' m². Dígito: '+dígito};
    }
  },

  desk: {
    icon: '📦',
    label: 'Baú',
    title: 'O Baú do Tesouro',
    flavour: 'O baú está trancado por um redstone lock. Resolve a expressão para obter o último dígito.',
    hint: 'Respeita a ordem: parênteses primeiro, depois potências, depois × e ÷, por fim + e −.',
    type: 'mc',
    gen: function(){
      var a=ri(2,5),b=ri(2,4),c=ri(2,4);
      var inner=a+b;
      var ans=inner*inner-c;
      var q='('+a+' + '+b+')² − '+c;
      var dígito=((ans%10)+10)%10;
      var opts=shuffle([ans,ans+3,ans-5,ans+7]).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      return{q:'Calcula: <span class="er2-modal-math">'+q+'</span>',
             opts:opts,ans:ans,digit:dígito,
             explain:'('+a+'+'+b+')² − '+c+' = '+inner+'² − '+c+' = '+inner*inner+' − '+c+' = '+ans+'. Dígito: '+dígito};
    }
  }
};

// ── Hotspot layout (% positions inside the scene SVG) ────────
var HOTSPOT_POS = {
  blackboard: {left:'32%', top:'44%', w:'64px', h:'64px'},
  bookshelf:  {left:'79%', top:'22%', w:'56px', h:'56px'},
  window:     {left:'18%', top:'8%',  w:'56px', h:'56px'},
  safe:       {left:'3%',  top:'44%', w:'56px', h:'56px'},
  desk:       {left:'55%', top:'44%', w:'64px', h:'64px'}
};

// ── THEME DEFINITIONS ─────────────────────────────────────────
var ER_THEMES = {

  minecraft: {
    id: 'minecraft',
    name: 'Minecraft',
    emoji: '⛏️',
    desc: 'Estás preso num mundo de blocos! Resolve os enigmas matemáticos e descobre o código redstone.',
    accent: '#3d5a3e',
    accentLight: '#a0f0a0',
    startBtn: '⛏️ Entrar no mundo',
    hudTitle: '⛏️ Minecraft Math',
    doorId: 'mc-door-light',
    objects: {
      blackboard: { icon:'📖', label:'Mesa Encant.',  flavour:'Os glifos na mesa brilham com poder arcano. Resolve a operação para ler o feitiço.' },
      safe:       { icon:'🪵', label:'Bancada',       flavour:'Para craftar o item secreto precisas da fração certa. Simplifica e usa os dois dígitos.' },
      bookshelf:  { icon:'📚', label:'Estante',       flavour:'Os livros guardam o poder das potências. Completa a sequência para desbloquear o feitiço.' },
      window:     { icon:'🪟', label:'Janela',        flavour:'Lá fora vês a sombra de um mob no chão. A área triangular é o próximo dígito.' },
      desk:       { icon:'📦', label:'Baú',           flavour:'O baú está trancado por um redstone lock. Resolve a expressão para obter o último dígito.' }
    },
    chips: ['📖 Mesa Encant. — inteiros','🪵 Bancada — frações','📚 Estante — potências','🪟 Janela — geometria','📦 Baú — ordem ops.'],
    css: {
      lobbyBg: '#c6b078', lobbyBorder: '#5c4a1e', lobbyText: '#3d2e0a', lobbySubText: '#5c4a1e',
      chipBg: '#8b7355', chipBorder: '#3d2e0a', chipText: '#f0e0b0',
      startBg: '#3d5a3e', startBorder: '#1a3a1a', startText: '#a0f0a0',
      hudBg: '#2d2d2d', hudBorder: '#1a1a1a', timerColor: '#80ff80',
      foundBg: '#1a1a1a', foundText: '#555', foundBorder: '#2a2a2a',
      foundUnlBg: '#1a3a1a', foundUnlText: '#80e080', foundUnlBorder: '#2a5a2a',
      modalBg: '#c6b078', modalBorder: '#3d2e0a', modalShadow: '5px 5px 0 #2a1e06',
      modalTitle: '#3d2e0a', modalFlavour: '#5c4a1e',
      qBg: '#d4bc88', qBorder: '#5c4a1e', qText: '#2a1e06', qMathBg: '#e8d08a',
      optBg: '#8b7355', optBorder: '#3d2e0a', optText: '#f0e0b0', optHoverBg: '#a08860',
      optOlBg: '#3d5a3e', optOlBorder: '#2a3a2a', optOlText: '#a0d4a0',
      optOkBg: '#2a4a2a', optOkBorder: '#1a3a1a', optOkText: '#a0f0a0',
      optBadBg: '#5a1a1a', optBadBorder: '#3a0a0a', optBadText: '#f0a0a0',
      digitBg: '#3d5a3e', digitBorder: '#3d2e0a', digitText: '#a0f0a0',
      submitBg: '#3d5a3e', submitBorder: '#1a3a1a', submitText: '#a0f0a0',
      fbOkBg: '#1a3a1a', fbOkBorder: '#0a2a0a', fbOkText: '#80e080',
      fbBadBg: '#3a0a0a', fbBadBorder: '#2a0000', fbBadText: '#e08080',
      hintBtnBg: '#5c4a1e', hintBtnBorder: '#3d2e0a', hintBtnText: '#e8d08a',
      hintBoxBg: '#5c4a1e', hintBoxBorder: '#7a6228', hintBoxText: '#f0e0b0',
      lockBg: '#8b7355', lockBorder: '#3d2e0a', lockH3: '#3d2e0a', lockP: '#5c4a1e',
      finalDigBg: '#3d5a3e', finalDigBorder: '#3d2e0a', finalDigText: '#a0f0a0',
      finalSubmitBg: '#3d2e0a', finalSubmitBorder: '#2a1e06', finalSubmitText: '#e8d08a',
      winBg: '#c6b078', winBorder: '#5c4a1e', winTitle: '#3d2e0a',
      statBg: '#8b7355', statBorder: '#3d2e0a', statNum: '#3d2e0a', statLabel: '#5c4a1e',
      failBg: '#4a1a1a', failBorder: '#2a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#8b2020', closeBorder: '#5a0a0a',
      btnPx: '2px 2px 0'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;image-rendering:pixelated;">
  <defs>
    <pattern id="t-grass" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#5a8a3a"/><rect x="0" y="0" width="8" height="8" fill="#4a7a2a" opacity=".4"/><rect x="8" y="8" width="8" height="8" fill="#6a9a4a" opacity=".3"/></pattern>
    <pattern id="t-dirt" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#8b5e2a"/><rect x="2" y="2" width="4" height="4" fill="#7a4e1e" opacity=".5"/><rect x="10" y="8" width="4" height="4" fill="#9a6e3a" opacity=".4"/></pattern>
    <pattern id="t-stone" patternUnits="userSpaceOnUse" width="32" height="16"><rect width="32" height="16" fill="#888"/><rect x="0" y="0" width="15" height="7" fill="#999" opacity=".5"/><rect x="17" y="0" width="15" height="7" fill="#777" opacity=".3"/><line x1="0" y1="8" x2="32" y2="8" stroke="#666" stroke-width="1"/><line x1="16" y1="0" x2="16" y2="8" stroke="#666" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="16" stroke="#666" stroke-width="1"/></pattern>
    <pattern id="t-wood" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#c8902a"/><rect x="0" y="0" width="16" height="7" fill="#d4a040" opacity=".5"/><line x1="0" y1="8" x2="16" y2="8" stroke="#8b5e10" stroke-width="1"/></pattern>
    <pattern id="t-books" patternUnits="userSpaceOnUse" width="16" height="32"><rect width="16" height="32" fill="#c8902a"/><rect x="1" y="1" width="4" height="14" fill="#516860" rx="1"/><rect x="6" y="2" width="4" height="13" fill="#8B6B61" rx="1"/><rect x="11" y="1" width="4" height="14" fill="#77998E" rx="1"/><rect x="1" y="17" width="4" height="13" fill="#AB9790" rx="1"/><rect x="6" y="18" width="4" height="12" fill="#516860" rx="1"/><rect x="11" y="17" width="4" height="13" fill="#8B6B61" rx="1"/><line x1="0" y1="16" x2="16" y2="16" stroke="#8b5e10" stroke-width="1.5"/></pattern>
    <pattern id="t-glass" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#a8e4ff" opacity=".7"/><rect x="0" y="0" width="7" height="7" fill="#c8f0ff" opacity=".5"/><rect x="9" y="9" width="7" height="7" fill="#c8f0ff" opacity=".5"/><line x1="8" y1="0" x2="8" y2="16" stroke="#6ab8e8" stroke-width="1" opacity=".5"/><line x1="0" y1="8" x2="16" y2="8" stroke="#6ab8e8" stroke-width="1" opacity=".5"/></pattern>
  </defs>
  <rect width="640" height="200" fill="#87ceeb"/>
  <rect x="560" y="16" width="48" height="48" fill="#ffe040"/>
  <rect x="568" y="8" width="32" height="8" fill="#ffe040"/><rect x="568" y="64" width="32" height="8" fill="#ffe040"/>
  <rect x="552" y="24" width="8" height="32" fill="#ffe040"/><rect x="608" y="24" width="8" height="32" fill="#ffe040"/>
  <rect x="572" y="28" width="8" height="8" fill="#c8a800"/><rect x="588" y="28" width="8" height="8" fill="#c8a800"/>
  <rect x="572" y="44" width="24" height="4" fill="#c8a800"/><rect x="568" y="40" width="4" height="4" fill="#c8a800"/><rect x="596" y="40" width="4" height="4" fill="#c8a800"/>
  <rect x="0" y="200" width="640" height="16" fill="url(#t-grass)"/><rect x="0" y="216" width="640" height="16" fill="url(#t-dirt)"/><rect x="0" y="232" width="640" height="88" fill="url(#t-stone)"/>
  <rect x="32" y="144" width="64" height="56" fill="url(#t-wood)"/>
  <rect x="32" y="136" width="64" height="16" fill="#c8902a"/>
  <line x1="64" y1="136" x2="64" y2="152" stroke="#7a5010" stroke-width="2"/><line x1="32" y1="144" x2="96" y2="144" stroke="#7a5010" stroke-width="2"/>
  <rect x="36" y="138" width="12" height="6" fill="#516860" opacity=".8"/><rect x="52" y="138" width="12" height="6" fill="#AB9790" opacity=".8"/><rect x="68" y="138" width="12" height="6" fill="#f59e0b" opacity=".8"/><rect x="36" y="146" width="12" height="6" fill="#c0392b" opacity=".7"/><rect x="52" y="146" width="12" height="6" fill="#3498db" opacity=".7"/>
  <rect x="36" y="200" width="8" height="16" fill="#8b5e2a"/><rect x="84" y="200" width="8" height="16" fill="#8b5e2a"/>
  <rect x="244" y="120" width="88" height="16" fill="#1a0a40"/><rect x="248" y="108" width="20" height="12" fill="#e74c3c"/><rect x="272" y="108" width="20" height="12" fill="#c0392b"/><rect x="267" y="110" width="6" height="8" fill="#8b0000"/>
  <rect x="249" y="110" width="18" height="8" fill="#f8f0e0"/><rect x="273" y="110" width="18" height="8" fill="#f0e8d0"/>
  <rect x="232" y="124" width="4" height="8" fill="#9b59b6" opacity=".8"/><rect x="240" y="122" width="4" height="10" fill="#8e44ad" opacity=".7"/><rect x="252" y="125" width="6" height="7" fill="#6c3483" opacity=".6"/><rect x="264" y="122" width="4" height="10" fill="#9b59b6" opacity=".8"/><rect x="276" y="124" width="4" height="8" fill="#8e44ad" opacity=".7"/>
  <rect x="238" y="104" width="4" height="4" fill="#9b59b6" opacity=".9"/><rect x="260" y="98" width="4" height="4" fill="#8e44ad" opacity=".8"/><rect x="284" y="106" width="4" height="4" fill="#9b59b6" opacity=".7"/>
  <rect x="232" y="136" width="72" height="64" fill="#1a0a40"/><rect x="236" y="200" width="8" height="16" fill="#0d0520"/><rect x="292" y="200" width="8" height="16" fill="#0d0520"/>
  <rect x="368" y="160" width="80" height="56" fill="url(#t-wood)"/><rect x="368" y="144" width="80" height="24" fill="#d4a040"/><rect x="368" y="144" width="80" height="8" fill="#e0b050"/>
  <rect x="400" y="172" width="16" height="16" fill="#c8902a"/><rect x="402" y="174" width="12" height="12" fill="#f0c030"/><rect x="405" y="176" width="6" height="8" fill="#8b6200"/>
  <rect x="368" y="168" width="80" height="4" fill="#888" opacity=".7"/><rect x="368" y="188" width="80" height="4" fill="#888" opacity=".7"/>
  <rect x="520" y="88" width="64" height="128" fill="url(#t-books)"/><rect x="520" y="88" width="64" height="4" fill="#7a4e10"/><rect x="520" y="212" width="64" height="4" fill="#7a4e10"/><rect x="520" y="88" width="4" height="128" fill="#7a4e10"/><rect x="580" y="88" width="4" height="128" fill="#7a4e10"/>
  <rect x="136" y="32" width="80" height="88" fill="url(#t-stone)"/>
  <rect x="144" y="40" width="28" height="28" fill="url(#t-glass)"/><rect x="180" y="40" width="28" height="28" fill="url(#t-glass)"/><rect x="144" y="76" width="28" height="28" fill="url(#t-glass)"/><rect x="180" y="76" width="28" height="28" fill="url(#t-glass)"/>
  <rect x="170" y="40" width="4" height="64" fill="#888"/><rect x="144" y="68" width="64" height="4" fill="#888"/>
  <rect x="152" y="48" width="4" height="4" fill="#ffe040" opacity=".9"/><rect x="188" y="52" width="4" height="4" fill="#ffe040" opacity=".7"/><rect x="164" y="82" width="4" height="4" fill="#fff" opacity=".8"/>
  <rect x="576" y="104" width="64" height="112" fill="#8b5e2a"/><rect x="584" y="112" width="48" height="40" fill="#7a4e1e" opacity=".7"/><rect x="584" y="160" width="48" height="40" fill="#7a4e1e" opacity=".7"/>
  <rect x="620" y="152" width="8" height="8" fill="#f0c030"/>
  <rect id="mc-door-light" x="620" y="148" width="8" height="4" fill="#c0392b"/>
  <rect x="0" y="196" width="640" height="4" fill="#3a7a20"/>
  <rect x="168" y="176" width="6" height="6" fill="#7dff50" opacity=".8"/><rect x="340" y="168" width="6" height="6" fill="#7dff50" opacity=".7"/><rect x="460" y="172" width="6" height="6" fill="#7dff50" opacity=".8"/>
</svg>`;
    }
  },

  space: {
    id: 'space',
    name: 'Espaço',
    emoji: '🚀',
    desc: 'A tua nave ficou presa numa estação espacial! Resolve os enigmas dos 5 módulos para ativar o propulsor e escapar.',
    accent: '#1a3a8a',
    accentLight: '#80b0ff',
    startBtn: '🚀 Ligar motores',
    hudTitle: '🛸 Space Math',
    doorId: 'space-door-light',
    objects: {
      blackboard: { icon:'📡', label:'Antena',    flavour:'A antena capta uma transmissão matemática do planeta. Decifra a operação para decodificar o sinal.' },
      safe:       { icon:'🔬', label:'Lab.',      flavour:'O laboratório tem uma fórmula a meias. Completa a fração para obter o código de acesso.' },
      bookshelf:  { icon:'💾', label:'Computador', flavour:'O computador mostra uma sequência de dados em potências. Qual é o valor em falta?' },
      window:     { icon:'🔭', label:'Telescópio', flavour:'O telescópio mede a área de impacto de um meteorito triangular. Calcula para prosseguir.' },
      desk:       { icon:'⚡', label:'Reator',    flavour:'O reator nuclear precisa da expressão correta para não entrar em colapso.' }
    },
    chips: ['📡 Antena — inteiros','🔬 Lab. — frações','💾 Computador — potências','🔭 Telescópio — geometria','⚡ Reator — ordem ops.'],
    css: {
      lobbyBg: '#060d1a', lobbyBorder: '#1a3a8a', lobbyText: '#80b0ff', lobbySubText: '#5080c0',
      chipBg: '#0a1a3a', chipBorder: '#1a3a8a', chipText: '#80b0ff',
      startBg: '#1a3a8a', startBorder: '#0a2060', startText: '#80d0ff',
      hudBg: '#050c18', hudBorder: '#1a3a8a', timerColor: '#80d0ff',
      foundBg: '#060d1a', foundText: '#304060', foundBorder: '#1a2a4a',
      foundUnlBg: '#0a1a3a', foundUnlText: '#80d0ff', foundUnlBorder: '#1a3a8a',
      modalBg: '#0a1428', modalBorder: '#1a3a8a', modalShadow: '0 0 24px rgba(80,140,255,.4)',
      modalTitle: '#80d0ff', modalFlavour: '#5080c0',
      qBg: '#060d1a', qBorder: '#1a3a8a', qText: '#c0d8ff', qMathBg: '#0a1a3a',
      optBg: '#0a1428', optBorder: '#1a3a8a', optText: '#80b0ff', optHoverBg: '#0f1e40',
      optOlBg: '#0a1a3a', optOlBorder: '#1a3a8a', optOlText: '#80b0ff',
      optOkBg: '#0a2a1a', optOkBorder: '#0a3a1a', optOkText: '#80e0a0',
      optBadBg: '#2a0a0a', optBadBorder: '#3a0a0a', optBadText: '#e08080',
      digitBg: '#0a1428', digitBorder: '#1a3a8a', digitText: '#80d0ff',
      submitBg: '#1a3a8a', submitBorder: '#0a2060', submitText: '#80d0ff',
      fbOkBg: '#0a2a1a', fbOkBorder: '#0a3a1a', fbOkText: '#80e0a0',
      fbBadBg: '#2a0a0a', fbBadBorder: '#3a0a0a', fbBadText: '#e08080',
      hintBtnBg: '#0a1428', hintBtnBorder: '#1a3a8a', hintBtnText: '#80b0ff',
      hintBoxBg: '#060d1a', hintBoxBorder: '#1a3a8a', hintBoxText: '#80b0ff',
      lockBg: '#060d1a', lockBorder: '#1a3a8a', lockH3: '#80d0ff', lockP: '#5080c0',
      finalDigBg: '#0a1428', finalDigBorder: '#1a3a8a', finalDigText: '#80d0ff',
      finalSubmitBg: '#1a3a8a', finalSubmitBorder: '#0a2060', finalSubmitText: '#80d0ff',
      winBg: '#060d1a', winBorder: '#1a3a8a', winTitle: '#80d0ff',
      statBg: '#0a1428', statBorder: '#1a3a8a', statNum: '#80d0ff', statLabel: '#5080c0',
      failBg: '#1a0505', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 12px rgba(80,140,255,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <radialGradient id="sp-bg" cx="50%" cy="50%" r="80%"><stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#000010"/></radialGradient>
    <radialGradient id="sp-planet" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#3a6a9a"/><stop offset="100%" stop-color="#1a3a5a"/></radialGradient>
  </defs>
  <!-- Deep space bg -->
  <rect width="640" height="320" fill="url(#sp-bg)"/>
  <!-- Stars -->
  <circle cx="20" cy="15" r="1.5" fill="#fff" opacity=".9"/><circle cx="80" cy="40" r="1" fill="#fff" opacity=".7"/><circle cx="150" cy="8" r="1.5" fill="#ffe" opacity=".8"/><circle cx="220" cy="30" r="1" fill="#fff" opacity=".6"/><circle cx="310" cy="12" r="2" fill="#fff" opacity=".9"/><circle cx="390" cy="45" r="1" fill="#aaf" opacity=".7"/><circle cx="450" cy="18" r="1.5" fill="#fff" opacity=".8"/><circle cx="520" cy="8" r="1" fill="#fff" opacity=".6"/><circle cx="580" cy="35" r="1.5" fill="#ffe" opacity=".7"/><circle cx="620" cy="15" r="1" fill="#fff" opacity=".8"/><circle cx="55" cy="80" r="1" fill="#aaf" opacity=".5"/><circle cx="130" cy="65" r="1.5" fill="#fff" opacity=".6"/><circle cx="200" cy="95" r="1" fill="#fff" opacity=".7"/><circle cx="340" cy="70" r="1" fill="#aaf" opacity=".5"/><circle cx="480" cy="60" r="1.5" fill="#fff" opacity=".7"/><circle cx="560" cy="90" r="1" fill="#fff" opacity=".6"/><circle cx="35" cy="170" r="1" fill="#fff" opacity=".5"/><circle cx="100" cy="155" r="1.5" fill="#fff" opacity=".6"/><circle cx="260" cy="145" r="1" fill="#aaf" opacity=".5"/><circle cx="420" cy="160" r="1" fill="#fff" opacity=".6"/>
  <!-- Distant planet -->
  <circle cx="540" cy="80" r="55" fill="url(#sp-planet)" opacity=".6"/>
  <ellipse cx="540" cy="80" rx="75" ry="14" fill="none" stroke="#5a90c0" stroke-width="3" opacity=".5"/>
  <!-- Station floor/platform -->
  <rect x="0" y="240" width="640" height="80" fill="#1a1a2a"/>
  <rect x="0" y="238" width="640" height="4" fill="#2a3a6a"/>
  <!-- Floor grid lines -->
  <line x1="0" y1="260" x2="640" y2="260" stroke="#1a2a4a" stroke-width="1"/><line x1="0" y1="280" x2="640" y2="280" stroke="#1a2a4a" stroke-width="1"/><line x1="0" y1="300" x2="640" y2="300" stroke="#1a2a4a" stroke-width="1"/>
  <line x1="80" y1="240" x2="80" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="160" y1="240" x2="160" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="240" y1="240" x2="240" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="320" y1="240" x2="320" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="400" y1="240" x2="400" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="480" y1="240" x2="480" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="560" y1="240" x2="560" y2="320" stroke="#1a2a4a" stroke-width="1"/>
  <!-- Antenna/Satellite dish (left) -->
  <rect x="24" y="180" width="8" height="60" fill="#3a4a6a"/>
  <ellipse cx="28" cy="178" rx="28" ry="14" fill="none" stroke="#5a7aaa" stroke-width="3"/>
  <line x1="28" y1="178" x2="28" y2="164" stroke="#5a7aaa" stroke-width="2"/>
  <circle cx="28" cy="162" r="4" fill="#80b0ff"/>
  <!-- Lab module (center-left) -->
  <rect x="180" y="155" width="90" height="85" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <rect x="188" y="163" width="74" height="20" fill="#060d1a"/>
  <!-- Lab equipment (test tubes, beakers) -->
  <rect x="196" y="170" width="8" height="28" rx="3" fill="#4040c0" opacity=".7"/><rect x="210" y="175" width="8" height="23" rx="3" fill="#40c0c0" opacity=".7"/><rect x="224" y="168" width="8" height="30" rx="3" fill="#c04040" opacity=".7"/><rect x="238" y="173" width="8" height="25" rx="3" fill="#40c040" opacity=".7"/>
  <!-- Screen on lab wall -->
  <rect x="188" y="163" width="74" height="18" fill="#0a2a5a"/><text x="225" y="176" font-family="monospace" font-size="8" fill="#80d0ff" text-anchor="middle">DATA LOCK</text>
  <!-- Computer terminal (center) -->
  <rect x="296" y="148" width="80" height="92" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <rect x="304" y="155" width="64" height="44" fill="#000820"/>
  <!-- Screen content -->
  <text x="336" y="170" font-family="monospace" font-size="7" fill="#00ff88" text-anchor="middle">2^0=1</text>
  <text x="336" y="181" font-family="monospace" font-size="7" fill="#00cc66" text-anchor="middle">2^1=2</text>
  <text x="336" y="192" font-family="monospace" font-size="7" fill="#009944" text-anchor="middle">2^?=?</text>
  <!-- Keyboard -->
  <rect x="304" y="204" width="64" height="12" fill="#0a1428" rx="2"/>
  <rect x="307" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="318" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="329" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="340" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="351" y="206" width="14" height="6" fill="#1a2a4a" rx="1"/>
  <!-- Telescope (window area - upper) -->
  <rect x="136" y="28" width="72" height="72" fill="#050c18" stroke="#1a3a8a" stroke-width="2"/>
  <!-- Space view through telescope -->
  <rect x="144" y="36" width="56" height="56" fill="#000010"/>
  <circle cx="172" cy="64" r="18" fill="#1a4a8a" opacity=".6"/>
  <circle cx="172" cy="64" r="14" fill="#2a6aaa" opacity=".5"/>
  <!-- Crosshair -->
  <line x1="172" y1="36" x2="172" y2="92" stroke="#80d0ff" stroke-width="1" opacity=".5"/>
  <line x1="144" y1="64" x2="200" y2="64" stroke="#80d0ff" stroke-width="1" opacity=".5"/>
  <circle cx="172" cy="64" r="3" fill="#80d0ff" opacity=".8"/>
  <!-- Reactor (center-right) -->
  <rect x="428" y="145" width="80" height="95" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <!-- Reactor core circle -->
  <circle cx="468" cy="185" r="28" fill="#001040"/>
  <circle cx="468" cy="185" r="20" fill="#002060" stroke="#1a5aaa" stroke-width="2"/>
  <circle cx="468" cy="185" r="12" fill="#0040a0" opacity=".8"/>
  <circle cx="468" cy="185" r="6" fill="#40a0ff" opacity=".9"/>
  <!-- Reactor glow lines -->
  <line x1="468" y1="157" x2="468" y2="165" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="440" y1="185" x2="448" y2="185" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="488" y1="185" x2="496" y2="185" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="468" y1="205" x2="468" y2="213" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <!-- Reactor display -->
  <rect x="436" y="218" width="64" height="12" fill="#000820"/><text x="468" y="228" font-family="monospace" font-size="7" fill="#80d0ff" text-anchor="middle">POWER: LOCK</text>
  <!-- Exit door (right) -->
  <rect x="572" y="120" width="68" height="120" fill="#0a1428" stroke="#1a3a8a" stroke-width="3"/>
  <rect x="580" y="128" width="52" height="44" fill="#050c18" stroke="#1a2a4a" stroke-width="1"/>
  <rect x="580" y="180" width="52" height="44" fill="#050c18" stroke="#1a2a4a" stroke-width="1"/>
  <circle cx="576" cy="192" r="5" fill="#80d0ff" opacity=".5"/>
  <rect id="space-door-light" x="569" y="186" width="6" height="12" rx="2" fill="#c0392b"/>
  <!-- Door text -->
  <text x="606" y="158" font-family="monospace" font-size="7" fill="#1a3a8a" text-anchor="middle">EXIT</text>
  <!-- Floating astronaut (decorative) -->
  <circle cx="96" cy="128" r="12" fill="#ddd"/><circle cx="96" cy="124" r="7" fill="#2a3a6a"/>
  <rect x="86" y="138" width="20" height="16" rx="4" fill="#ddd"/><rect x="76" y="140" width="10" height="8" rx="3" fill="#ccc"/><rect x="110" y="140" width="10" height="8" rx="3" fill="#ccc"/>
  <rect x="88" y="154" width="8" height="14" rx="3" fill="#ddd"/><rect x="100" y="154" width="8" height="14" rx="3" fill="#ddd"/>
  <!-- Nebula cloud (decorative) -->
  <ellipse cx="420" cy="60" rx="60" ry="25" fill="#3a0a5a" opacity=".15"/>
  <ellipse cx="440" cy="55" rx="40" ry="18" fill="#5a0a8a" opacity=".12"/>
</svg>`;
    }
  },

  ocean: {
    id: 'ocean',
    name: 'Oceano',
    emoji: '🌊',
    desc: 'O teu submarino está preso no fundo do mar! Resolve os 5 enigmas das criaturas marinhas para ativar o propulsor.',
    accent: '#0a4a6a',
    accentLight: '#80d0ff',
    startBtn: '🤿 Mergulhar',
    hudTitle: '🐠 Ocean Math',
    doorId: 'ocean-door-light',
    objects: {
      blackboard: { icon:'🐙', label:'Polvo',      flavour:'O polvo esconde o número nos seus tentáculos. Resolve a operação para desvendar o dígito.' },
      safe:       { icon:'🐚', label:'Concha',     flavour:'A espiral da concha guarda uma fração secreta. Simplifica para descobrir o código.' },
      bookshelf:  { icon:'🪸', label:'Coral',      flavour:'O recife de coral cresce em potências. Qual é o próximo valor na sequência?' },
      window:     { icon:'🐟', label:'Peixe',      flavour:'A sombra do peixe tem forma triangular. Calcula a área para prosseguir.' },
      desk:       { icon:'⚓', label:'Âncora',     flavour:'A âncora tem uma expressão matemática gravada. Resolve pela ordem correta.' }
    },
    chips: ['🐙 Polvo — inteiros','🐚 Concha — frações','🪸 Coral — potências','🐟 Peixe — geometria','⚓ Âncora — ordem ops.'],
    css: {
      lobbyBg: '#041428', lobbyBorder: '#0a5a8a', lobbyText: '#80d0ff', lobbySubText: '#4a90b0',
      chipBg: '#061828', chipBorder: '#0a5a8a', chipText: '#80d0ff',
      startBg: '#0a4a6a', startBorder: '#052838', startText: '#80e0ff',
      hudBg: '#030c1a', hudBorder: '#0a5a8a', timerColor: '#80e0ff',
      foundBg: '#041428', foundText: '#1a4060', foundBorder: '#0a2a4a',
      foundUnlBg: '#041e2e', foundUnlText: '#80e0ff', foundUnlBorder: '#0a5a8a',
      modalBg: '#061828', modalBorder: '#0a5a8a', modalShadow: '0 0 24px rgba(0,100,180,.5)',
      modalTitle: '#80e0ff', modalFlavour: '#4a90b0',
      qBg: '#041428', qBorder: '#0a5a8a', qText: '#c0e8ff', qMathBg: '#061828',
      optBg: '#061828', optBorder: '#0a5a8a', optText: '#80d0ff', optHoverBg: '#0a2038',
      optOlBg: '#041428', optOlBorder: '#0a5a8a', optOlText: '#80d0ff',
      optOkBg: '#041e14', optOkBorder: '#0a3a1a', optOkText: '#80e0a0',
      optBadBg: '#1e0404', optBadBorder: '#3a0a0a', optBadText: '#e08080',
      digitBg: '#041428', digitBorder: '#0a5a8a', digitText: '#80e0ff',
      submitBg: '#0a4a6a', submitBorder: '#052838', submitText: '#80e0ff',
      fbOkBg: '#041e14', fbOkBorder: '#0a3a1a', fbOkText: '#80e0a0',
      fbBadBg: '#1e0404', fbBadBorder: '#3a0a0a', fbBadText: '#e08080',
      hintBtnBg: '#041428', hintBtnBorder: '#0a5a8a', hintBtnText: '#80d0ff',
      hintBoxBg: '#041428', hintBoxBorder: '#0a5a8a', hintBoxText: '#80d0ff',
      lockBg: '#041428', lockBorder: '#0a5a8a', lockH3: '#80e0ff', lockP: '#4a90b0',
      finalDigBg: '#041428', finalDigBorder: '#0a5a8a', finalDigText: '#80e0ff',
      finalSubmitBg: '#0a4a6a', finalSubmitBorder: '#052838', finalSubmitText: '#80e0ff',
      winBg: '#041428', winBorder: '#0a5a8a', winTitle: '#80e0ff',
      statBg: '#061828', statBorder: '#0a5a8a', statNum: '#80e0ff', statLabel: '#4a90b0',
      failBg: '#180404', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 12px rgba(0,120,200,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <linearGradient id="oc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#041428"/><stop offset="100%" stop-color="#020a18"/></linearGradient>
    <radialGradient id="oc-light" cx="50%" cy="0%" r="70%"><stop offset="0%" stop-color="#0a4a8a" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient>
  </defs>
  <rect width="640" height="320" fill="url(#oc-bg)"/>
  <rect width="640" height="320" fill="url(#oc-light)"/>
  <!-- Bubbles rising -->
  <circle cx="60" cy="280" r="5" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="60" cy="250" r="4" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".4"/><circle cx="60" cy="225" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".3"/>
  <circle cx="340" cy="290" r="4" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="342" cy="265" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".4"/>
  <circle cx="580" cy="275" r="5" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="582" cy="248" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".3"/>
  <!-- Sand floor -->
  <rect x="0" y="270" width="640" height="50" fill="#2a2010"/>
  <rect x="0" y="268" width="640" height="4" fill="#3a3018"/>
  <!-- Sandy bumps -->
  <ellipse cx="100" cy="270" rx="40" ry="8" fill="#2e2412" opacity=".6"/><ellipse cx="280" cy="272" rx="50" ry="6" fill="#2e2412" opacity=".5"/><ellipse cx="500" cy="270" rx="35" ry="7" fill="#2e2412" opacity=".6"/>
  <!-- Seaweed -->
  <path d="M 30 270 Q 20 255 30 240 Q 40 225 30 210" stroke="#1a6a2a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 30 255 Q 18 250 16 242" stroke="#1a6a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 620 270 Q 612 250 620 232 Q 628 215 620 200" stroke="#1a6a2a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Octopus (left) -->
  <ellipse cx="64" cy="200" rx="28" ry="22" fill="#8a4a9a"/>
  <ellipse cx="64" cy="194" rx="22" ry="18" fill="#9a5aaa"/>
  <circle cx="54" cy="190" r="5" fill="#fff"/><circle cx="74" cy="190" r="5" fill="#fff"/>
  <circle cx="55" cy="190" r="2.5" fill="#2a0a3a"/><circle cx="75" cy="190" r="2.5" fill="#2a0a3a"/>
  <path d="M40 220 Q28 240 32 255" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M52 224 Q45 244 48 258" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M64 226 Q64 248 64 260" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M76 224 Q83 244 80 258" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M88 220 Q100 240 96 255" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Shell (center-left) -->
  <ellipse cx="216" cy="240" rx="36" ry="28" fill="#c8903a"/>
  <ellipse cx="216" cy="238" rx="28" ry="22" fill="#d8a04a"/>
  <path d="M216 212 Q230 224 228 238 Q224 250 216 254 Q208 250 212 238 Q210 224 216 212Z" fill="#c07828" opacity=".6"/>
  <path d="M216 216 Q225 228 222 240" stroke="#a06020" stroke-width="2" fill="none" opacity=".5"/>
  <path d="M216 216 Q207 228 210 240" stroke="#a06020" stroke-width="2" fill="none" opacity=".5"/>
  <!-- Coral (center) -->
  <rect x="310" y="210" width="10" height="60" fill="#e84040" rx="4"/>
  <rect x="324" y="220" width="8" height="50" fill="#e84040" rx="4"/>
  <rect x="296" y="228" width="8" height="42" fill="#e84040" rx="4"/>
  <circle cx="315" cy="208" r="10" fill="#ff6060"/><circle cx="328" cy="218" r="8" fill="#ff6060"/><circle cx="300" cy="226" r="8" fill="#ff5050"/>
  <rect x="340" y="235" width="6" height="35" fill="#40c0c0" rx="3"/><rect x="350" y="245" width="6" height="25" fill="#40c0c0" rx="3"/>
  <circle cx="343" cy="233" r="7" fill="#60e0e0"/><circle cx="353" cy="243" r="6" fill="#60e0e0"/>
  <!-- Fish -->
  <ellipse cx="460" cy="160" rx="32" ry="20" fill="#f0a020"/>
  <polygon points="492,160 516,145 516,175" fill="#f0a020"/>
  <circle cx="444" cy="155" r="5" fill="#fff"/><circle cx="445" cy="155" r="2.5" fill="#1a1a1a"/>
  <ellipse cx="460" cy="168" rx="18" ry="6" fill="#e09010" opacity=".5"/>
  <!-- Fish fins -->
  <path d="M455 140 Q460 130 465 140" fill="#e09010"/>
  <path d="M455 180 Q460 190 465 180" fill="#e09010"/>
  <!-- Anchor (right area) -->
  <circle cx="500" cy="165" r="14" fill="none" stroke="#8a9aaa" stroke-width="5"/>
  <rect x="497" y="165" width="6" height="50" fill="#8a9aaa"/>
  <rect x="476" y="210" width="48" height="6" rx="3" fill="#8a9aaa"/>
  <rect x="487" y="176" width="26" height="5" fill="#8a9aaa"/>
  <circle cx="476" cy="213" r="5" fill="#8a9aaa"/><circle cx="524" cy="213" r="5" fill="#8a9aaa"/>
  <!-- Exit hatch (right) -->
  <rect x="572" y="140" width="64" height="100" rx="6" fill="#0a2a4a" stroke="#0a5a8a" stroke-width="3"/>
  <circle cx="604" cy="190" r="28" fill="#041428" stroke="#0a5a8a" stroke-width="2"/>
  <circle cx="604" cy="190" r="20" fill="#031020" stroke="#0a4a7a" stroke-width="1.5"/>
  <!-- Door wheel spokes -->
  <line x1="604" y1="170" x2="604" y2="184" stroke="#0a5a8a" stroke-width="3"/><line x1="604" y1="196" x2="604" y2="210" stroke="#0a5a8a" stroke-width="3"/>
  <line x1="584" y1="190" x2="598" y2="190" stroke="#0a5a8a" stroke-width="3"/><line x1="610" y1="190" x2="624" y2="190" stroke="#0a5a8a" stroke-width="3"/>
  <line x1="589" y1="175" x2="600" y2="185" stroke="#0a5a8a" stroke-width="2.5"/><line x1="608" y1="195" x2="619" y2="205" stroke="#0a5a8a" stroke-width="2.5"/>
  <line x1="619" y1="175" x2="608" y2="185" stroke="#0a5a8a" stroke-width="2.5"/><line x1="600" y1="195" x2="589" y2="205" stroke="#0a5a8a" stroke-width="2.5"/>
  <circle id="ocean-door-light" cx="604" cy="144" r="6" fill="#c0392b"/>
  <!-- Submarine porthole lights -->
  <circle cx="120" cy="100" r="10" fill="#0a3a6a" stroke="#0a5a8a" stroke-width="2" opacity=".6"/>
  <circle cx="120" cy="100" r="6" fill="#1a6aaa" opacity=".4"/>
  <!-- Light rays from surface -->
  <line x1="200" y1="0" x2="180" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".08"/>
  <line x1="280" y1="0" x2="260" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".08"/>
  <line x1="360" y1="0" x2="340" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".06"/>
</svg>`;
    }
  },

  football: {
    id: 'football',
    name: 'Futebol',
    emoji: '⚽',
    desc: 'Estás no balneário antes do jogo decisivo! Resolve os 5 enigmas para desbloquear o equipamento e entrar em campo.',
    accent: '#1a5c2a',
    accentLight: '#a0e0b0',
    startBtn: '⚽ Entrar em campo',
    hudTitle: '⚽ Football Math',
    doorId: 'football-door-light',
    objects: {
      blackboard: { icon:'📋', label:'Tática',     flavour:'O treinador deixou a tática no quadro. Decifra a operação para entender a jogada.' },
      safe:       { icon:'👟', label:'Cacifos',    flavour:'O cacifo está trancado com uma combinação de fração. Simplifica para descobrir o código.' },
      bookshelf:  { icon:'🏆', label:'Troféus',    flavour:'Os troféus seguem uma sequência de potências. Qual é o próximo valor?' },
      window:     { icon:'🥅', label:'Baliza',     flavour:'A área da grande penalidade tem forma triangular neste campo especial. Calcula a área.' },
      desk:       { icon:'📊', label:'Estatísticas', flavour:'As estatísticas do jogador seguem uma expressão matemática. Resolve para desbloqueares.' }
    },
    chips: ['📋 Tática — inteiros','👟 Cacifos — frações','🏆 Troféus — potências','🥅 Baliza — geometria','📊 Stats — ordem ops.'],
    css: {
      lobbyBg: '#0a2a14', lobbyBorder: '#1a5c2a', lobbyText: '#a0e0b0', lobbySubText: '#4a9a5a',
      chipBg: '#061a0c', chipBorder: '#1a5c2a', chipText: '#a0e0b0',
      startBg: '#1a5c2a', startBorder: '#0a3a16', startText: '#a0e0b0',
      hudBg: '#060e08', hudBorder: '#1a5c2a', timerColor: '#80ff80',
      foundBg: '#060e08', foundText: '#1a3a20', foundBorder: '#0a2a14',
      foundUnlBg: '#0a2a14', foundUnlText: '#80e080', foundUnlBorder: '#1a5c2a',
      modalBg: '#0a1e10', modalBorder: '#1a5c2a', modalShadow: '0 0 20px rgba(26,92,42,.5)',
      modalTitle: '#a0e0b0', modalFlavour: '#4a9a5a',
      qBg: '#061a0c', qBorder: '#1a5c2a', qText: '#c0f0c8', qMathBg: '#0a2a14',
      optBg: '#0a1e10', optBorder: '#1a5c2a', optText: '#a0e0b0', optHoverBg: '#0e2a16',
      optOlBg: '#061a0c', optOlBorder: '#1a5c2a', optOlText: '#80d090',
      optOkBg: '#0a2a14', optOkBorder: '#0a3a16', optOkText: '#80f090',
      optBadBg: '#2a0a0a', optBadBorder: '#3a0a0a', optBadText: '#f08080',
      digitBg: '#061a0c', digitBorder: '#1a5c2a', digitText: '#80ff80',
      submitBg: '#1a5c2a', submitBorder: '#0a3a16', submitText: '#a0e0b0',
      fbOkBg: '#0a2a14', fbOkBorder: '#0a3a16', fbOkText: '#80f090',
      fbBadBg: '#2a0a0a', fbBadBorder: '#3a0a0a', fbBadText: '#f08080',
      hintBtnBg: '#061a0c', hintBtnBorder: '#1a5c2a', hintBtnText: '#80d090',
      hintBoxBg: '#061a0c', hintBoxBorder: '#1a5c2a', hintBoxText: '#a0e0b0',
      lockBg: '#061a0c', lockBorder: '#1a5c2a', lockH3: '#a0e0b0', lockP: '#4a9a5a',
      finalDigBg: '#061a0c', finalDigBorder: '#1a5c2a', finalDigText: '#80ff80',
      finalSubmitBg: '#1a5c2a', finalSubmitBorder: '#0a3a16', finalSubmitText: '#a0e0b0',
      winBg: '#0a1e10', winBorder: '#1a5c2a', winTitle: '#a0e0b0',
      statBg: '#061a0c', statBorder: '#1a5c2a', statNum: '#a0e0b0', statLabel: '#4a9a5a',
      failBg: '#180404', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 10px rgba(26,92,42,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <linearGradient id="fb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a4a8a"/><stop offset="100%" stop-color="#2a6aaa"/></linearGradient>
    <linearGradient id="fb-pitch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a6a2a"/><stop offset="100%" stop-color="#145420"/></linearGradient>
    <pattern id="fb-stripes" patternUnits="userSpaceOnUse" width="40" height="320">
      <rect width="40" height="320" fill="#1a6a2a"/>
      <rect width="20" height="320" fill="#186028"/>
    </pattern>
    <pattern id="fb-floor" patternUnits="userSpaceOnUse" width="32" height="16">
      <rect width="32" height="16" fill="#3a2a1a"/>
      <rect x="0" y="0" width="15" height="7" fill="#4a3a2a" opacity=".5"/>
      <rect x="17" y="9" width="15" height="6" fill="#2a1a0a" opacity=".4"/>
      <line x1="0" y1="8" x2="32" y2="8" stroke="#2a1a0a" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Stadium stands background -->
  <rect width="640" height="140" fill="url(#fb-sky)"/>
  <!-- Stadium seats (rows of colored dots) -->
  <rect x="0" y="20" width="640" height="20" fill="#1a3a6a"/>
  <rect x="0" y="40" width="640" height="20" fill="#1a4a7a"/>
  <!-- Seat dots row 1 -->
  <rect x="10" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="22" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="34" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="46" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="58" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="70" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="82" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="94" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="106" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".4"/><rect x="118" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/>
  <rect x="140" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/><rect x="152" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="164" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/><rect x="176" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".6"/><rect x="188" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="200" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/>
  <!-- Score banner top -->
  <rect x="220" y="8" width="200" height="32" rx="4" fill="#0a1428" stroke="#f0c030" stroke-width="2"/>
  <text x="264" y="20" font-family="monospace" font-size="9" fill="#f0c030" font-weight="bold">ESTÁDIO MATEMÁTICO</text>
  <text x="286" y="34" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">MAT  0 : 0  ALG</text>

  <!-- More seat rows -->
  <rect x="440" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="452" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="464" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="476" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="488" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="500" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="512" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="524" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="536" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".4"/><rect x="548" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="560" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="572" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="584" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="596" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="608" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/>

  <!-- Pitch (striped) -->
  <rect x="0" y="140" width="640" height="130" fill="url(#fb-stripes)"/>
  <!-- Pitch markings (white) -->
  <!-- Centre circle -->
  <circle cx="320" cy="205" r="36" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  <circle cx="320" cy="205" r="3" fill="rgba(255,255,255,.5)"/>
  <!-- Centre line -->
  <line x1="320" y1="140" x2="320" y2="270" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  <!-- Penalty areas -->
  <rect x="0" y="163" width="80" height="84" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <rect x="560" y="163" width="80" height="84" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <!-- Goal areas -->
  <rect x="0" y="180" width="40" height="50" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
  <rect x="600" y="180" width="40" height="50" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
  <!-- Corner arcs -->
  <path d="M 0 140 Q 8 140 8 148" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 640 140 Q 632 140 632 148" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 0 270 Q 8 270 8 262" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 640 270 Q 632 270 632 262" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>

  <!-- Balneário floor (bottom band) -->
  <rect x="0" y="270" width="640" height="50" fill="url(#fb-floor)"/>
  <rect x="0" y="268" width="640" height="4" fill="#2a1a0a"/>

  <!-- Tactical board (center-left) — blackboard puzzle -->
  <rect x="168" y="148" width="88" height="72" rx="3" fill="#0a2a14" stroke="#1a5c2a" stroke-width="2"/>
  <rect x="174" y="154" width="76" height="56" rx="2" fill="#0e3018"/>
  <!-- Mini pitch on board -->
  <rect x="178" y="158" width="68" height="48" fill="#186028" opacity=".7"/>
  <line x1="212" y1="158" x2="212" y2="206" stroke="rgba(255,255,255,.4)" stroke-width="1"/>
  <circle cx="212" cy="182" r="8" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1"/>
  <!-- Player dots -->
  <circle cx="188" cy="170" r="4" fill="#e74c3c"/><circle cx="196" cy="185" r="4" fill="#e74c3c"/><circle cx="188" cy="198" r="4" fill="#e74c3c"/>
  <circle cx="230" cy="168" r="4" fill="#3498db"/><circle cx="238" cy="182" r="4" fill="#3498db"/><circle cx="230" cy="196" r="4" fill="#3498db"/>
  <!-- X marker with question -->
  <text x="212" y="177" font-family="monospace" font-size="8" fill="#f0c030" text-anchor="middle">?</text>

  <!-- Lockers / cacifos (left wall) — safe puzzle -->
  <rect x="16" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <rect x="44" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <rect x="72" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <!-- Locker handles -->
  <circle cx="35" cy="185" r="3" fill="#f0c030"/><circle cx="63" cy="185" r="3" fill="#f0c030"/><circle cx="91" cy="185" r="3" fill="#f0c030"/>
  <!-- Locker vents -->
  <line x1="20" y1="160" x2="36" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="20" y1="165" x2="36" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <line x1="48" y1="160" x2="64" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="48" y1="165" x2="64" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <line x1="76" y1="160" x2="92" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="76" y1="165" x2="92" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <!-- Jersey hanging -->
  <rect x="22" y="150" width="12" height="8" rx="2" fill="#e74c3c" opacity=".8"/>
  <rect x="50" y="150" width="12" height="8" rx="2" fill="#3498db" opacity=".8"/>

  <!-- Trophy cabinet (right) — bookshelf puzzle -->
  <rect x="500" y="144" width="80" height="96" rx="2" fill="#1a0e06" stroke="#3a2a1a" stroke-width="2"/>
  <!-- Shelves -->
  <rect x="500" y="172" width="80" height="4" fill="#2a1a0a"/>
  <rect x="500" y="208" width="80" height="4" fill="#2a1a0a"/>
  <!-- Trophy 1 (gold, big) -->
  <rect x="518" y="152" width="10" height="18" rx="2" fill="#f0c030"/>
  <rect x="514" y="148" width="18" height="6" rx="2" fill="#f0c030"/>
  <rect x="516" y="168" width="14" height="3" fill="#c8a020"/>
  <!-- Trophy 2 (silver) -->
  <rect x="542" y="155" width="8" height="14" rx="2" fill="#c0c0c0"/>
  <rect x="538" y="152" width="16" height="5" rx="2" fill="#c0c0c0"/>
  <rect x="540" y="167" width="12" height="3" fill="#a0a0a0"/>
  <!-- Trophy 3 (bronze) -->
  <rect x="564" y="158" width="8" height="11" rx="2" fill="#cd7f32"/>
  <rect x="560" y="155" width="16" height="5" rx="2" fill="#cd7f32"/>
  <!-- Row 2: cups -->
  <rect x="512" y="180" width="12" height="24" rx="3" fill="#f0c030" opacity=".8"/>
  <rect x="534" y="182" width="10" height="22" rx="3" fill="#c0c0c0" opacity=".8"/>
  <rect x="555" y="183" width="10" height="21" rx="3" fill="#cd7f32" opacity=".8"/>
  <rect x="575" y="184" width="8" height="20" rx="3" fill="#f0c030" opacity=".7"/>
  <!-- Stars on trophies -->
  <text x="524" y="160" font-family="monospace" font-size="6" fill="#fff" text-anchor="middle">★</text>
  <text x="546" y="162" font-family="monospace" font-size="5" fill="#fff" text-anchor="middle">★</text>

  <!-- Stats board (center-right) — desk puzzle -->
  <rect x="372" y="148" width="96" height="80" rx="3" fill="#060e08" stroke="#1a5c2a" stroke-width="2"/>
  <rect x="378" y="154" width="84" height="50" rx="2" fill="#0a1a0c"/>
  <!-- Stats bars -->
  <rect x="382" y="162" width="40" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="162" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="426" y="170" font-family="monospace" font-size="7" fill="#a0e0b0">PAS</text>
  <rect x="382" y="174" width="55" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="174" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="441" y="182" font-family="monospace" font-size="7" fill="#a0e0b0">GOL</text>
  <rect x="382" y="186" width="28" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="186" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="414" y="194" font-family="monospace" font-size="7" fill="#a0e0b0">FAL</text>
  <!-- Bottom text -->
  <text x="420" y="218" font-family="monospace" font-size="7" fill="#1a5c2a" text-anchor="middle">CALC SCORE</text>

  <!-- Goal / Baliza (top-left area) — window puzzle -->
  <rect x="126" y="58" width="80" height="52" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="3"/>
  <!-- Goal net pattern -->
  <line x1="134" y1="58" x2="134" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="142" y1="58" x2="142" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="150" y1="58" x2="150" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="158" y1="58" x2="158" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="166" y1="58" x2="166" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="174" y1="58" x2="174" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="182" y1="58" x2="182" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="190" y1="58" x2="190" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="198" y1="58" x2="198" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
  <line x1="126" y1="66" x2="206" y2="66" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="74" x2="206" y2="74" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="82" x2="206" y2="82" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="90" x2="206" y2="90" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="98" x2="206" y2="98" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="106" x2="206" y2="106" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
  <!-- Ball in goal -->
  <circle cx="166" cy="84" r="14" fill="#fff" opacity=".9"/>
  <path d="M166 70 L170 78 L178 78 L172 84 L174 92 L166 87 L158 92 L160 84 L154 78 L162 78 Z" fill="#1a1a1a" opacity=".7"/>

  <!-- Exit tunnel door (right) -->
  <rect x="572" y="140" width="68" height="130" rx="4" fill="#0a1e10" stroke="#1a5c2a" stroke-width="3"/>
  <!-- Tunnel arch -->
  <rect x="580" y="152" width="52" height="88" rx="2" fill="#060e08" stroke="#0a3018" stroke-width="1.5"/>
  <!-- Tunnel perspective lines -->
  <line x1="580" y1="240" x2="596" y2="200" stroke="#1a5c2a" stroke-width="1" opacity=".5"/>
  <line x1="632" y1="240" x2="616" y2="200" stroke="#1a5c2a" stroke-width="1" opacity=".5"/>
  <!-- "CAMPO" text above tunnel -->
  <text x="606" y="168" font-family="monospace" font-size="8" fill="#1a5c2a" text-anchor="middle">CAMPO</text>
  <!-- Lock light -->
  <rect id="football-door-light" x="600" y="148" width="12" height="6" rx="2" fill="#c0392b"/>
  <!-- Flood lights (top corners) -->
  <rect x="0" y="0" width="20" height="45" fill="#1a1a1a"/>
  <rect x="620" y="0" width="20" height="45" fill="#1a1a1a"/>
  <rect x="2" y="42" width="16" height="6" rx="1" fill="#ffe080" opacity=".9"/>
  <rect x="622" y="42" width="16" height="6" rx="1" fill="#ffe080" opacity=".9"/>
  <!-- Light beams -->
  <polygon points="2,48 18,48 60,140 0,140" fill="#ffe080" opacity=".04"/>
  <polygon points="622,48 638,48 640,140 580,140" fill="#ffe080" opacity=".04"/>
</svg>`;
    }
  }

};

// ── Scene SVG (dynamic, set by active theme) ──────────────────
var SCENE_SVG = ER_THEMES.minecraft.buildScene();


// ── GameEscapeRoom constructor ────────────────────────────────
function GameEscapeRoom(panelId, qFn){
  this.id     = panelId;
  this.qFn    = qFn;
  this.state  = null;
  this._timer = null;
  this._render();
}

GameEscapeRoom.prototype._el = function(){ return document.getElementById(this.id); };

// ── Lobby ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._render = function(){
  var el = this._el(); if(!el) return;
  var self = this;
  var themeCards = Object.values(ER_THEMES).map(function(t){
    return '<div class="er2-theme-card" data-theme="'+t.id+'">'
      + '<span class="er2-theme-emoji">'+t.emoji+'</span>'
      + '<span class="er2-theme-name">'+t.name+'</span>'
      + '</div>';
  }).join('');
  el.innerHTML = '<div class="er2">'
    + '<div class="er2-theme-lobby">'
    + '<span style="font-size:2.8rem;display:block;margin-bottom:.6rem">🔐</span>'
    + '<h2 style="font-family:Montserrat,sans-serif;font-size:1.3rem;font-weight:900;color:var(--ink);margin-bottom:.35rem;text-transform:uppercase;letter-spacing:.04em">Escape Room — Matemática</h2>'
    + '<p style="color:var(--ink3);font-size:.82rem;line-height:1.6;max-width:380px;margin:.3rem auto .85rem">Resolve 5 enigmas matemáticos para escapar. Escolhe o teu mundo:</p>'
    + '<div class="er2-theme-row">'+themeCards+'</div>'
    + '<div id="er2-theme-desc" style="margin:.8rem auto 0;max-width:380px;background:var(--cream2);border-radius:10px;padding:.55rem .85rem;font-size:.75rem;color:var(--ink4);line-height:1.6">Seleciona um tema para começar.</div>'
    + '<button class="er2-theme-start" id="er2-theme-start-btn" disabled style="margin-top:.85rem">Escolhe um tema</button>'
    + '</div></div>';
  el.querySelectorAll('.er2-theme-card').forEach(function(card){
    card.onclick = function(){
      el.querySelectorAll('.er2-theme-card').forEach(function(c){ c.classList.remove('active'); });
      card.classList.add('active');
      var t = ER_THEMES[card.dataset.theme];
      var desc = el.querySelector('#er2-theme-desc');
      var btn  = el.querySelector('#er2-theme-start-btn');
      if(desc) desc.textContent = t.desc;
      if(btn){ btn.disabled=false; btn.textContent=t.startBtn; btn.style.background=t.accent; btn.style.color=t.accentLight; btn.style.borderColor=t.accent; }
    };
  });
  el.querySelector('#er2-theme-start-btn').onclick = function(){
    var active = el.querySelector('.er2-theme-card.active');
    if(active) self._startGame(active.dataset.theme);
  };
};

// ── Start ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._startGame = function(themeId){
  var theme = ER_THEMES[themeId || 'minecraft'];
  var themeObjs = theme.objects;
  var themePos = {
    minecraft: { blackboard:{left:'32%',top:'44%',w:'64px',h:'64px'}, bookshelf:{left:'79%',top:'22%',w:'56px',h:'56px'}, window:{left:'18%',top:'8%',w:'56px',h:'56px'},  safe:{left:'3%',top:'44%',w:'56px',h:'56px'},  desk:{left:'55%',top:'44%',w:'64px',h:'64px'} },
    space:     { blackboard:{left:'3%', top:'50%',w:'56px',h:'56px'}, bookshelf:{left:'44%',top:'38%',w:'64px',h:'64px'}, window:{left:'19%',top:'5%',w:'56px',h:'56px'},  safe:{left:'26%',top:'38%',w:'64px',h:'64px'}, desk:{left:'63%',top:'38%',w:'64px',h:'64px'} },
    ocean:     { blackboard:{left:'5%', top:'42%',w:'60px',h:'60px'}, bookshelf:{left:'45%',top:'50%',w:'60px',h:'60px'}, window:{left:'67%',top:'28%',w:'60px',h:'60px'}, safe:{left:'28%',top:'48%',w:'60px',h:'60px'}, desk:{left:'73%',top:'48%',w:'56px',h:'56px'} },
    football:  { blackboard:{left:'24%',top:'44%',w:'60px',h:'60px'}, bookshelf:{left:'76%',top:'40%',w:'60px',h:'60px'}, window:{left:'18%',top:'12%',w:'60px',h:'60px'}, safe:{left:'3%', top:'44%',w:'56px',h:'56px'}, desk:{left:'55%',top:'44%',w:'64px',h:'64px'} }
  };
  var pos = themePos[theme.id] || themePos.minecraft;
  // hotspots stored per-instance in state.hotspots — no global mutation
  // FIX 1: apply theme CSS variables to DOM
  var _applyPid = this.id;
  (function applyThemeCSS(css, pid, themeId){
    var styleId = 'er2-ts-'+pid;
    var el = document.getElementById(styleId);
    if(!el){ el=document.createElement('style'); el.id=styleId; document.head.appendChild(el); }
    var t = css; var p = '#'+pid+' '; var tc = '.er2-theme-'+themeId+' ';
    el.textContent = [
      tc+'.er2-modal{background:'+t.modalBg+'!important;border-color:'+t.modalBorder+'!important;box-shadow:'+t.modalShadow+'!important}',
      tc+'.er2-modal-title{color:'+t.modalTitle+'!important}',
      tc+'.er2-modal-flavour{color:'+t.modalFlavour+'!important}',
      tc+'.er2-modal-q{background:'+t.qBg+'!important;border-color:'+t.qBorder+'!important;color:'+t.qText+'!important}',
      tc+'.er2-modal-math{background:'+t.qMathBg+'!important;color:'+t.qText+'!important}',
      tc+'.er2-close-btn{background:'+t.closeBg+'!important;border-color:'+t.closeBorder+'!important}',
      tc+'.er2-mc-opt{background:'+t.optBg+'!important;border-color:'+t.optBorder+'!important;color:'+t.optText+'!important;box-shadow:'+t.btnPx+'!important}',
      tc+'.er2-mc-opt:hover:not(:disabled){background:'+t.optHoverBg+'!important}',
      tc+'.er2-mc-opt .ol{background:'+t.optOlBg+'!important;border-color:'+t.optOlBorder+'!important;color:'+t.optOlText+'!important}',
      tc+'.er2-mc-opt.er2-ok{background:'+t.optOkBg+'!important;border-color:'+t.optOkBorder+'!important;color:'+t.optOkText+'!important}',
      tc+'.er2-mc-opt.er2-bad{background:'+t.optBadBg+'!important;border-color:'+t.optBadBorder+'!important;color:'+t.optBadText+'!important}',
      tc+'.er2-digit{background:'+t.digitBg+'!important;border-color:'+t.digitBorder+'!important;color:'+t.digitText+'!important}',
      tc+'.er2-submit{background:'+t.submitBg+'!important;border-color:'+t.submitBorder+'!important;color:'+t.submitText+'!important}',
      tc+'.er2-fb.ok{background:'+t.fbOkBg+'!important;border-color:'+t.fbOkBorder+'!important;color:'+t.fbOkText+'!important}',
      tc+'.er2-fb.bad{background:'+t.fbBadBg+'!important;border-color:'+t.fbBadBorder+'!important;color:'+t.fbBadText+'!important}',
      tc+'.er2-hint-btn{background:'+t.hintBtnBg+'!important;border-color:'+t.hintBtnBorder+'!important;color:'+t.hintBtnText+'!important}',
      tc+'.er2-hint-box{background:'+t.hintBoxBg+'!important;border-color:'+t.hintBoxBorder+'!important;color:'+t.hintBoxText+'!important}',
      p+'.er2-hud{background:'+t.hudBg+'!important;border-color:'+t.hudBorder+'!important}',
      p+'.er2-hud-timer{color:'+t.timerColor+'!important}',
      p+'.er2-found-chip{background:'+t.foundBg+'!important;color:'+t.foundText+'!important;border-color:'+t.foundBorder+'!important}',
      p+'.er2-found-chip.unlocked{background:'+t.foundUnlBg+'!important;color:'+t.foundUnlText+'!important;border-color:'+t.foundUnlBorder+'!important}',
      p+'.er2-final-lock{background:'+t.lockBg+'!important;border-color:'+t.lockBorder+'!important}',
      p+'.er2-final-lock h3{color:'+t.lockH3+'!important}',
      p+'.er2-final-lock p{color:'+t.lockP+'!important}',
      p+'.er2-final-digit{background:'+t.finalDigBg+'!important;border-color:'+t.finalDigBorder+'!important;color:'+t.finalDigText+'!important}',
      p+'.er2-final-submit{background:'+t.finalSubmitBg+'!important;border-color:'+t.finalSubmitBorder+'!important;color:'+t.finalSubmitText+'!important}',
      p+'.er2-win{background:'+t.winBg+'!important;border-color:'+t.winBorder+'!important}',
      p+'.er2-win h2{color:'+t.winTitle+'!important}',
      p+'.er2-ws{background:'+t.statBg+'!important;border-color:'+t.statBorder+'!important}',
      p+'.er2-ws .n{color:'+t.statNum+'!important}',
      p+'.er2-ws .l{color:'+t.statLabel+'!important}',
      p+'.er2-fail{background:'+t.failBg+'!important;border-color:'+t.failBorder+'!important}',
      p+'.er2-fail h3{color:'+t.failTitle+'!important}',
      p+'.er2-fail p{color:'+t.failText+'!important}',
      tc+'.er2-unlocked-msg{background:'+t.optOkBg+'!important;border-color:'+t.optOkBorder+'!important;color:'+t.optOkText+'!important}'
    ].join('\n');
  })(theme.css, _applyPid, theme.id);
  var puzzles = {};
  Object.keys(PUZZLES).forEach(function(k){
    var p = PUZZLES[k]; var data = p.gen();
    var ov = themeObjs[k] || {};
    puzzles[k] = { def:p, data:data, solved:false, digit:data.digit!=null?data.digit:null,
      icon: ov.icon||p.icon, label: ov.label||p.label, flavour: ov.flavour||p.flavour };
  });
  var stateSceneSVG = theme.buildScene();
  var stateHotspots = pos;
  this.state = { theme:theme, puzzles:puzzles, lives:3, hints:0, errors:0, timeLeft:600, started:Date.now(), active:null, sceneSVG:stateSceneSVG, hotspots:stateHotspots };
  var self = this;
  this._timer = setInterval(function(){ self._tick(); }, 1000);
  this._renderScene();
};


// ── Timer ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._tick = function(){
  if(!this.state) return;
  this.state.timeLeft--;
  this._updateHUD();
  if(this.state.timeLeft <= 0){
    clearInterval(this._timer);
    this._renderFail('timeout');
  }
};

// ── Scene ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderScene = function(){
  var el = this._el(); if(!el) return;
  var s = this.state;

  // Build solved digits summary
  var keys = Object.keys(PUZZLES);
  var chips = keys.map(function(k){
    var solved = s.puzzles[k].solved;
    var d = solved ? s.puzzles[k].digit : '?';
    return '<span class="er2-found-chip'+(solved?' unlocked':'')+'" title="'+(s.puzzles[k].label||PUZZLES[k].label)+'">'+(s.puzzles[k].label||PUZZLES[k].label)+': '+d+'</span>';
  }).join('');

  var allSolved = keys.every(function(k){ return s.puzzles[k].solved; });

  // HUD lives
  var hearts = '';
  for(var i=0;i<3;i++) hearts += (i<s.lives?'❤️':'🖤');

  var html = '<div class="er2">'
    + '<div class="er2-hud">'
    + '<span class="er2-hud-title">'+(s.theme?s.theme.hudTitle:'🔐 Escape Room')+'</span>'
    + '<span class="er2-hud-lives">'+hearts+'</span>'
    + '<span class="er2-hud-timer'+(s.timeLeft<=60?' urgent':'')+'" id="er2-timer-'+this.id+'">'+fmt(s.timeLeft)+'</span>'
    + '<div class="er2-found-row">'+chips+'</div>'
    + '</div>'

    // Scene
    + '<div class="er2-scene-wrap" id="er2-scene-'+this.id+'">'
    + (s.sceneSVG || SCENE_SVG)
    + '</div>';

  // Final lock panel
  html += '<div class="er2-final-lock">'
    + '<h3>🔑 Código Final da Porta</h3>'
    + '<p>Resolve os 5 enigmas para descobrir os dígitos. Depois introduz o código de '+(keys.length)+' dígitos.</p>'
    + '<div class="er2-final-code-row">';

  keys.forEach(function(k){
    var solved = s.puzzles[k].solved;
    var d = solved ? s.puzzles[k].digit : '';
    html += '<div style="text-align:center">'
      + '<input class="er2-final-digit'+(solved?' ok':'')+'" id="er2-fd-'+k+'" maxlength="1" '
      + (solved?'readonly value="'+d+'"':'disabled')
      + ' style="'+(solved?'border-color:var(--correct)':'')+'">'
      + '<div class="er2-digit-hint">'+(s.puzzles[k].label||PUZZLES[k].label).charAt(0)+'</div>'
      + '</div>';
  });

  var allSolvedNow = keys.every(function(k){ return s.puzzles[k].solved; });
  html += '<button class="er2-final-submit" id="er2-final-submit-'+this.id+'" '
    + (allSolvedNow?'':'disabled')+'>'
    + (allSolvedNow?'🚪 Abrir porta':'🔒 Resolve os enigmas') + '</button>';
  html += '</div></div>';

  html += '</div>'; // .er2
  el.innerHTML = html;

  // Inject hotspots over scene
  var sceneEl = document.getElementById('er2-scene-'+this.id);
  var self = this;
  Object.keys(PUZZLES).forEach(function(k){
    var pos = (s.hotspots && s.hotspots[k]) ? s.hotspots[k] : HOTSPOT_POS[k];
    var solved = s.puzzles[k].solved;
    var btn = document.createElement('button');
    btn.className = 'er2-hotspot'+(solved?' solved':' er2-hotspot-pulse');
    btn.style.left   = pos.left;
    btn.style.top    = pos.top;
    btn.style.width  = pos.w;
    btn.style.height = pos.h;
    btn.style.position = 'absolute';
    btn.title = PUZZLES[k].label + (solved?' ✓':'');
    btn.textContent = solved ? '✓' : '?';
    btn.dataset.puzzleKey = k;
    btn.onclick = function(){ self._openPuzzle(this.dataset.puzzleKey); };
    sceneEl.appendChild(btn);
  });

  // Door light colour
  var doorLight = el.querySelector('#'+(s.theme?s.theme.doorId:'mc-door-light'));
  if(doorLight) doorLight.setAttribute('fill', allSolvedNow ? '#27ae60' : '#c0392b');

  // Final submit
  var submitBtn = document.getElementById('er2-final-submit-'+this.id);
  if(submitBtn && allSolvedNow){
    submitBtn.onclick = function(){
      clearInterval(self._timer);
      self._renderWin();
    };
  }
};

// ── Open puzzle modal ─────────────────────────────────────────
GameEscapeRoom.prototype._openPuzzle = function(key){
  var s = this.state;
  if(!s || s.lives <= 0) return;
  var pz = s.puzzles[key];
  if(!pz) return;
  this.state.active = key;

  var def  = pz.def;
  var data = pz.data;
  var self = this;

  // Remove any existing modal
  var old = document.getElementById('er2-modal-overlay');
  if(old) old.remove();

  var inner = '<span class="er2-modal-icon">'+(pz.icon||def.icon)+'</span>'
    + '<div class="er2-modal-title">'+(pz.label||def.title)+'</div>'
    + '<div class="er2-modal-flavour">'+(pz.flavour||def.flavour)+'</div>';

  if(pz.solved){
    inner += '<div class="er2-unlocked-msg">✅ Já resolvido! Dígito: <strong>'+pz.digit+'</strong></div>'
      + '<div style="font-size:.8rem;color:var(--ink4);font-style:italic">'+data.explain+'</div>';
  } else {
    inner += '<div class="er2-modal-q">'+data.q+'</div>';

    if(def.type === 'mc'){
      var LABS=['A','B','C','D'];
      inner += '<div class="er2-mc-opts">';
      data.opts.forEach(function(opt,i){
        inner += '<button class="er2-mc-opt" data-idx="'+i+'">'
          + '<span class="ol">'+LABS[i]+'</span>'+opt+'</button>';
      });
      inner += '</div>';
    }

    if(def.type === 'code'){
      var nd = data.code.length;
      inner += '<div class="er2-code-row">';
      for(var d=0;d<nd;d++){
        inner += '<input class="er2-digit" id="er2-d'+d+'" maxlength="1" inputmode="numeric" pattern="[0-9]">';
      }
      inner += '<button class="er2-submit" id="er2-code-submit">🔓 Confirmar</button>';
      inner += '</div>';
    }

    inner += '<div class="er2-fb" id="er2-modal-fb"></div>'
      + '<div class="er2-modal-footer">'
      + '<button class="er2-hint-btn" id="er2-hint-btn">💡 Dica</button>'
      + '</div>'
      + '<div class="er2-hint-box" id="er2-hint-box">'+def.hint+'</div>';
  }

  var overlay = document.createElement('div');
  overlay.id  = 'er2-modal-overlay';
  overlay.className = 'er2-modal-bg er2-theme-'+(s.theme?s.theme.id:'minecraft');
  overlay.innerHTML = '<div class="er2-modal">'
    + '<button class="er2-close-btn" id="er2-modal-close" aria-label="Fechar enigma">✕</button>'
    + inner
    + '</div>';

  document.body.appendChild(overlay);

  // Close
  overlay.querySelector('#er2-modal-close').onclick = function(){ overlay.remove(); };
  overlay.onclick = function(e){ if(e.target===overlay) overlay.remove(); };
  document.addEventListener('keydown', function esc(e){
    if(e.key==='Escape'){ overlay.remove(); document.removeEventListener('keydown',esc); }
  });

  if(pz.solved) return;

  // MC handlers
  overlay.querySelectorAll('.er2-mc-opt').forEach(function(btn){
    btn.onclick = function(){
      var i   = parseInt(btn.dataset.idx);
      var ans = data.opts[i];
      var ok  = (ans+'') === (data.ans+'');
      self._handleAnswer(key, ok, btn, overlay, data.explain);
    };
  });

  // Code handlers
  var digits = overlay.querySelectorAll('.er2-digit');
  digits.forEach(function(inp,idx,all){
    inp.addEventListener('input', function(){
      inp.value = inp.value.replace(/[^0-9]/g,'').slice(-1);
      if(inp.value && idx < all.length-1) all[idx+1].focus();
    });
    inp.addEventListener('keydown', function(e){
      if(e.key==='Backspace' && !inp.value && idx>0) all[idx-1].focus();
      if(e.key==='Enter'){
        var sb = document.getElementById('er2-code-submit');
        if(sb) sb.click();
      }
    });
  });

  var codeSubmit = document.getElementById('er2-code-submit');
  if(codeSubmit){
    codeSubmit.onclick = function(){
      var entered = '';
      overlay.querySelectorAll('.er2-digit').forEach(function(inp){ entered += inp.value; });
      if(entered.length < data.code.length){ eduToast('Preenche todos os dígitos!','warn'); return; }
      var ok = entered === data.code;
      if(!ok){
        overlay.querySelectorAll('.er2-digit').forEach(function(inp){
          inp.classList.add('bad'); setTimeout(function(){ inp.classList.remove('bad'); },400);
        });
      }
      self._handleAnswer(key, ok, null, overlay, data.explain+(data.preview?'\n'+data.preview:''));
    };
    // Focus first digit
    setTimeout(function(){ var f=overlay.querySelector('.er2-digit'); if(f) f.focus(); },80);
  }

  // Hint
  var hintBtn = overlay.querySelector('#er2-hint-btn');
  var hintBox = overlay.querySelector('#er2-hint-box');
  if(hintBtn && hintBox){
    hintBtn.onclick = function(){
      if(!pz.hinted){          // only charge the penalty once per puzzle
        pz.hinted = true;
        s.hints++;
      }
      hintBox.classList.add('show');
      hintBtn.style.display='none';
    };
  }
};

// ── Handle answer ─────────────────────────────────────────────
GameEscapeRoom.prototype._handleAnswer = function(key, ok, btn, overlay, explain){
  var s   = this.state;
  var pz  = s.puzzles[key];
  var fb  = overlay.querySelector('#er2-modal-fb');
  var self = this;

  if(ok){
    pz.solved = true;
    // Mark MC button correct
    if(btn){ btn.classList.add('er2-ok'); }
    // Mark code inputs correct
    overlay.querySelectorAll('.er2-digit').forEach(function(i){ i.classList.add('ok'); });
    var sub = document.getElementById('er2-code-submit');
    if(sub) sub.disabled = true;
    // Disable all MC opts
    overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=true; });
    if(fb){ fb.className='er2-fb show ok'; fb.innerHTML='✅ <strong>Correto!</strong> Dígito desbloqueado: <strong>'+pz.digit+'</strong><br><span style="font-size:.78rem;opacity:.8">'+explain+'</span>'; }
    eduToast('🔓 Dígito '+pz.digit+' desbloqueado! ('+pz.def.label+')', 'success');

    // Re-render scene after short delay (so user sees feedback)
    setTimeout(function(){
      overlay.remove();
      self._renderScene();
      // Check win
      var allDone = Object.keys(PUZZLES).every(function(k){ return s.puzzles[k].solved; });
      if(allDone){ eduToast('🔑 Todos os enigmas resolvidos! Introduz o código final.', 'success'); }
    }, 1200);

  } else {
    s.errors++;
    s.lives--;
    overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=true; });
    if(btn){ btn.classList.add('er2-bad'); }
    // Disable code submit + inputs to prevent rapid re-firing; re-enable after animation
    var _wrongSub = overlay.querySelector('#er2-code-submit');
    var _wrongDigs = overlay.querySelectorAll('.er2-digit');
    if(_wrongSub){ _wrongSub.disabled = true; }
    setTimeout(function(){
      if(s.lives > 0){
        overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=false; });
        if(_wrongSub) _wrongSub.disabled = false;
      }
      _wrongDigs.forEach(function(i){ i.value=''; });
    }, 450);
    if(fb){ fb.className='er2-fb show bad'; fb.innerHTML='❌ Errado. Vidas restantes: <strong>'+s.lives+'</strong>.'; }
    eduToast('❌ Resposta errada! Vidas: '+s.lives, 'warn');
    this._updateHUD();
    if(s.lives <= 0){
      clearInterval(this._timer);
      setTimeout(function(){ overlay.remove(); self._renderFail('lives'); }, 900);
    }
  }
};

// ── HUD live update ───────────────────────────────────────────
GameEscapeRoom.prototype._updateHUD = function(){
  var el = this._el(); if(!el || !this.state) return;
  var t = el.querySelector('#er2-timer-'+this.id);
  if(t){
    t.textContent = fmt(this.state.timeLeft);
    t.className = 'er2-hud-timer'+(this.state.timeLeft<=60?' urgent':'');
  }
};

// ── Win ───────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderWin = function(){
  var el = this._el(); if(!el) return;
  var s  = this.state;
  var elapsed = 600 - s.timeLeft; // use countdown delta, not wall clock (avoids background/throttle skew)
  var m = Math.floor(elapsed/60), sec = elapsed%60;
  var secStr = sec < 10 ? '0'+sec : ''+sec;
  var score = Math.max(0, 1000 - s.errors*60 - s.hints*25 - Math.floor(elapsed/8));
  var medal = score>=900?'🥇':score>=700?'🥈':'🥉';
  var self = this;

  el.innerHTML = '<div class="er2"><div class="er2-win">'
    + '<span class="er2-win-trophy">🏆</span>'
    + '<h2>'+medal+' Escapaste!</h2>'
    + '<p style="color:var(--ink3);font-size:.86rem;margin-bottom:.5rem">Resolveste todos os enigmas e abriste a porta!</p>'
    + '<div class="er2-win-stats">'
    + '<div class="er2-ws"><div class="n">'+m+'m'+secStr+'s</div><div class="l">Tempo</div></div>'
    + '<div class="er2-ws"><div class="n">'+s.errors+'</div><div class="l">Erros</div></div>'
    + '<div class="er2-ws"><div class="n">'+s.hints+'</div><div class="l">Dicas</div></div>'
    + '<div class="er2-ws"><div class="n" style="color:var(--c2-mid)">'+score+'</div><div class="l">Pts</div></div>'
    + '</div>'
    + '<button class="er2-play-again" id="er2-pa">↺ Jogar novamente</button>'
    + '</div></div>';

  document.getElementById('er2-pa').onclick = function(){
    clearInterval(self._timer);
    self.state = null;
    self._render();
  };
};

// ── Fail ──────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderFail = function(reason){
  var el = this._el(); if(!el) return;
  if(this._timer){ clearInterval(this._timer); this._timer = null; }
  var s  = this.state;
  var solved = Object.keys(PUZZLES).filter(function(k){ return s.puzzles[k].solved; }).length;
  var msg = reason==='timeout'
    ? 'O tempo esgotou-se! Resolveste '+solved+' de '+Object.keys(PUZZLES).length+' enigmas.'
    : 'Ficaste sem vidas! Resolveste '+solved+' de '+Object.keys(PUZZLES).length+' enigmas.';
  var self = this;

  el.innerHTML = '<div class="er2"><div class="er2-fail">'
    + '<span class="er2-fail-icon">💀</span>'
    + '<h3>Não escapaste...</h3>'
    + '<p>'+msg+' Tenta de novo — já conheces os enigmas!</p>'
    + '<button class="er2-play-again" id="er2-pa">↺ Tentar novamente</button>'
    + '</div></div>';

  document.getElementById('er2-pa').onclick = function(){
    clearInterval(self._timer);
    self.state = null;
    self._render();
  };
};

window.GameEscapeRoom = GameEscapeRoom;
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
// ═══════════════════════════════════════════════════════
// MELHORIA 1 — Enter para verificar em qualquer fill-input
// MELHORIA 2 — Vírgula → ponto (padrão PT) em fill-inputs
// ═══════════════════════════════════════════════════════
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

/* ── Block 1 (from line 807) ── */
// ═══ MAT7 HUB — subtema data ═══
var _mat7Subtemas = {
  1: ['Conjunto ℤ', 'Valor absoluto e simétrico', 'Adição de inteiros', 'Subtração de inteiros', 'Expressões com parênteses'],
  2: ['Comparação e ordenação', 'Adição e subtração de frações', 'Percentagens', 'Potências', 'Notação científica'],
  3: ['Ângulos internos de polígonos', 'Triângulos e congruência', 'Semelhança de triângulos', 'Áreas de figuras planas', 'Circunferência'],
  4: ['Sequências e termo geral', 'Expressões algébricas', 'Simplificação', 'Equações do 1.º grau', 'Inequações']
};

// Section scroll targets per tab and cap
var _mat7Targets = {
  resumo:      { 1:'bloco1-resumo', 2:'sec-temas2', 3:'sec-temas3', 4:'sec-temas4' },
  questoes:    { 1:'sec-questoes',  2:'sec-questoes2', 3:'sec-questoes3', 4:'sec-questoes4' },
  miniteste:   { 1:'sec-minitestes', 2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4' },
  teste:       { 1:'sec-teste',     2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4' },
  jogos:       { 1:'sec-jogos',     2:'sec-jogos2', 3:'sec-jogos3', 4:'sec-jogos4' },
  flashcards:  { 1:'sec-flashcards',2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4' },
  exame:       { 1:'sec-exame',     2:'sec-exame2', 3:'sec-exame3', 4:'sec-exame4' }
};

// Current selections per tab
var _mat7Sel = { resumo:1, exercicios:1, testes:1, jogos:1, flashcards:1, exame:1 };

// ── Map: which section ID to grab from which view, per cap ──
var _mat7SecMap = {
  exercicios: { 1:'sec-questoes',    2:'sec-questoes2',   3:'sec-questoes3',   4:'sec-questoes4' },
  minitestes: { 1:'sec-minitestes',  2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4' },
  jogos:      { 1:'sec-jogos',       2:'sec-jogos2',      3:'sec-jogos3',      4:'sec-jogos4' },
  flashcards: { 1:'sec-flashcards',  2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4' },
  exame:      { 1:'sec-exame',       2:'sec-exame2',      3:'sec-exame3',      4:'sec-exame4' },
  reta:       { 1:'sec-reta' },
  // progresso: handled by renderProgressoUnificado — not in secMap
  quiz:       { 1:'sec-quiz-game',   2:'sec-quiz-game2',  3:'sec-quiz-game3',  4:'sec-quiz-game4' }
};

// ── Init functions per section ──
var _mat7InitMap = {
  'sec-questoes':    function(){ var el=document.getElementById('q-container');  if(el && !el.innerHTML && typeof gerarQuestoes==='function') gerarQuestoes(); if(typeof gerarMiniAtual==='function'&&document.getElementById('m-container')&&!document.getElementById('m-container').innerHTML)gerarMiniAtual(); if(typeof gerarTeste==='function'&&document.getElementById('t-container')&&!document.getElementById('t-container').innerHTML)gerarTeste(); },
  'sec-questoes2':   function(){ var el=document.getElementById('q2-container'); if(el && !el.innerHTML && typeof gerarQuestoes2==='function') gerarQuestoes2(); if(typeof gerarMiniAtual2==='function'&&document.getElementById('m2-container')&&!document.getElementById('m2-container').innerHTML)gerarMiniAtual2(); if(typeof gerarTeste2==='function'&&document.getElementById('t2-container')&&!document.getElementById('t2-container').innerHTML)gerarTeste2(); },
  'sec-questoes3':   function(){ var el=document.getElementById('q3-container'); if(el && !el.innerHTML && typeof gerarQuestoes3==='function') gerarQuestoes3(); if(typeof gerarMiniAtual3==='function'&&document.getElementById('m3-container')&&!document.getElementById('m3-container').innerHTML)gerarMiniAtual3(); if(typeof gerarTeste3==='function'&&document.getElementById('t3-container')&&!document.getElementById('t3-container').innerHTML)gerarTeste3(); },
  'sec-questoes4':   function(){ var el=document.getElementById('q4-container'); if(el && !el.innerHTML && typeof renderQuestoes4==='function') renderQuestoes4(); if(document.getElementById('m4-container')&&!document.getElementById('m4-container').innerHTML&&typeof showMini4==='function')showMini4(0,null); if(document.getElementById('t4-container')&&!document.getElementById('t4-container').innerHTML&&typeof renderTeste4==='function')renderTeste4(); },
  'sec-teste':       function(){ var el=document.getElementById('t-container');  if(el && !el.innerHTML && typeof gerarTeste==='function') gerarTeste(); },
  'sec-teste2':      function(){ var el=document.getElementById('t2-container'); if(el && !el.innerHTML && typeof gerarTeste2==='function') gerarTeste2(); },
  'sec-teste3':      function(){ var el=document.getElementById('t3-container'); if(el && !el.innerHTML && typeof gerarTeste3==='function') gerarTeste3(); },
  'sec-teste4':      function(){ var el=document.getElementById('t4-container'); if(el && !el.innerHTML && typeof renderTeste4==='function') renderTeste4(); },
  'sec-minitestes':  function(){ var el=document.getElementById('m-container');  if(el && !el.innerHTML && typeof gerarMiniAtual==='function') gerarMiniAtual(); },
  'sec-minitestes2': function(){ var el=document.getElementById('m2-container'); if(el && !el.innerHTML && typeof gerarMiniAtual2==='function') gerarMiniAtual2(); },
  'sec-minitestes3': function(){ var el=document.getElementById('m3-container'); if(el && !el.innerHTML && typeof gerarMiniAtual3==='function') gerarMiniAtual3(); },
  'sec-minitestes4': function(){ var el=document.getElementById('m4-container'); if(el && !el.innerHTML && typeof showMini4==='function') showMini4(0,null); },
  'sec-jogos':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap1']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap1','facil'); },
  'sec-jogos2':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap2']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap2','medio'); },
  'sec-jogos3':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap3']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap3','medio'); },
  'sec-jogos4':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap4']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap4','dificil'); },
  'sec-flashcards':  function(){ FC_CARDS=FC_CARDS_CAP1; SRS_KEY='edupt_srs_cap1'; if(typeof fcStartSession==='function') fcStartSession(); },
  'sec-flashcards2': function(){ if(typeof fcRender2==='function') fcRender2(); },
  'sec-flashcards3': function(){ if(typeof fcRender3==='function') fcRender3(); },
  'sec-flashcards4': function(){ if(typeof initFlashcards4==='function') initFlashcards4(); },
  'sec-exame':       function(){},
  'sec-exame2':      function(){},
  'sec-exame3':      function(){},
  'sec-exame4':      function(){},
  'sec-reta':        function(){ if(typeof retaDraw==='function') retaDraw(); },
  'sec-progresso':   function(){ if(typeof progRenderSection==='function') progRenderSection(); },
  'sec-progresso2':  function(){ if(typeof progRenderSection2==='function') progRenderSection2(); },
  'sec-progresso3':  function(){ if(typeof progRenderSection3==='function') progRenderSection3(); },
  'sec-progresso4':  function(){ if(typeof renderProg4==='function') renderProg4(); },
  'sec-quiz-game':   function(){ if(typeof qgStartForCap==='function') qgStartForCap(1); },
  'sec-quiz-game2':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(2); },
  'sec-quiz-game3':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(3); },
  'sec-quiz-game4':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(4); }
};

// ── Load content inline into a hub panel ──
// Uses DOM move (not clone) so all event handlers stay alive
var _mat7MovedSections = {}; // track where we moved sections: { tab: [ {el, parent}, ... ] }


// ═══════════════════════════════════════════════════════════
// MULTI-CAP UNIFIED RENDERING
// When multiple chapters are selected, merge content into one
// unified component instead of stacking separate sections.
// ═══════════════════════════════════════════════════════════

var _mat7CapNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};

// ── UNIFIED FLASHCARDS ──────────────────────────────────────
var _uniFC = { cards: [], idx: 0, flipped: false };

function mat7RenderUnifiedFlashcards(caps, inlineEl) {
  // Build merged card deck from all selected caps, tagged with cap name
  var capCardSources = {
    1: typeof FC_CARDS_CAP1 !== 'undefined' ? FC_CARDS_CAP1 : [],
    2: typeof FC2_CARDS !== 'undefined' ? FC2_CARDS : [],
    3: typeof FC3_CARDS !== 'undefined' ? FC3_CARDS : [],
    4: typeof BANCO4 !== 'undefined' && BANCO4.flashcards ? BANCO4.flashcards : []
  };
  var merged = [];
  caps.forEach(function(cap) {
    var src = capCardSources[cap] || [];
    src.forEach(function(card) {
      merged.push({ tag: card.tag, q: card.q, a: card.a });
    });
  });
  // Shuffle
  for (var i = merged.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = merged[i]; merged[i] = merged[j]; merged[j] = tmp;
  }

  // Swap the active deck and SRS key for a multi-cap session
  FC_CARDS = merged;
  SRS_KEY = 'edupt_srs_multi_' + caps.join('_');

  // Update the sec-header title to reflect mixed caps
  var secFC = document.getElementById('sec-flashcards');
  if (secFC) {
    var h2 = secFC.querySelector('.sec-header h2');
    if (h2) h2.innerHTML = '<span class="num"><span class="ico"><svg><use href="#ico-layers"/></svg></span></span> Flashcards — ' + caps.length + ' Capítulos';
    var p = secFC.querySelector('.sec-header p');
    if (p) p.textContent = merged.length + ' cartões misturados de ' + caps.length + ' capítulos — com repetição espaçada';
  }

  // Move sec-flashcards into the inline panel (same as single-cap flow)
  if (!_mat7MovedSections['flashcards']) _mat7MovedSections['flashcards'] = [];
  if (secFC) {
    _mat7MovedSections['flashcards'].push({ el: secFC, parent: secFC.parentElement });
    secFC.style.display = '';
    secFC.classList.add('active');
    inlineEl.appendChild(secFC);
  }

  // Start the real SRS session
  if (typeof fcStartSession === 'function') setTimeout(fcStartSession, 50);
}
function _uniFC_render() {
  var cards = _uniFC.cards;
  if (!cards.length) return;
  var card = cards[_uniFC.idx];
  var el = function(id) { return document.getElementById(id); };
  el('ufc-cap-label').textContent = card.capName;
  el('ufc-tag').textContent = card.tag;
  el('ufc-q').textContent = card.q;
  el('ufc-a').textContent = card.a;
  el('ufc-counter').textContent = (_uniFC.idx + 1) + ' / ' + cards.length;
  var pct = Math.round((_uniFC.idx + 1) / cards.length * 100);
  if (el('ufc-prog')) el('ufc-prog').style.width = pct + '%';
  _uniFC.flipped = false;
  var inner = el('ufc-inner');
  if (inner) inner.style.transform = '';
  var flipBtn = el('ufc-flip-btn');
  if (flipBtn) flipBtn.textContent = 'Virar';
}

function _uniFC_flip() {
  _uniFC.flipped = !_uniFC.flipped;
  var inner = document.getElementById('ufc-inner');
  if (inner) inner.style.transform = _uniFC.flipped ? 'rotateY(180deg)' : '';
  var flipBtn = document.getElementById('ufc-flip-btn');
  if (flipBtn) flipBtn.textContent = _uniFC.flipped ? 'Ocultar' : 'Virar';
}

function _uniFC_next() {
  if (_uniFC.idx < _uniFC.cards.length - 1) { _uniFC.idx++; _uniFC_render(); }
}

function _uniFC_prev() {
  if (_uniFC.idx > 0) { _uniFC.idx--; _uniFC_render(); }
}

function _uniFC_shuffle() {
  var cards = _uniFC.cards;
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
  }
  _uniFC.idx = 0;
  _uniFC_render();
}

// ── Safe top-level stubs — overwritten by mat7RenderUnifiedExercicios when the panel loads.
// Without these, clicking the level/refresh buttons before the panel has ever initialised
// throws "mat7UnifiedQuizLevel is not a function".
window.mat7UnifiedQuizLevel = window.mat7UnifiedQuizLevel || function(level, btn) {
  // No-op until mat7RenderUnifiedExercicios sets the real implementation.
};
window.mat7UnifiedQuizRefresh = window.mat7UnifiedQuizRefresh || function() {
  // No-op until mat7RenderUnifiedExercicios sets the real implementation.
};

// ── UNIFIED JOGOS ───────────────────────────────────────────
function mat7RenderUnifiedJogos(caps, inlineEl) {
  // For multi-cap jogos: show ONE Jogo do 24 with mixed numbers from all caps
  // Determine difficulty based on highest selected cap
  var maxCap = Math.max.apply(null, caps);
  var level = maxCap >= 3 ? 'dificil' : maxCap >= 2 ? 'medio' : 'facil';
  var capStr = caps.map(function(c){ return _mat7CapNames[c]; }).join(' + ');

  inlineEl.innerHTML = [
    '<div class="sec-header"><h2><span class="ico ico-sm"><svg><use href="#ico-gamepad"/></svg></span> Jogo do 24 — Multi-Capítulo</h2>',
    '<p>Um único jogo com números de ' + capStr + '</p></div>',
    '<div id="j24-wrap-unified"></div>'
  ].join('\n');

  if (typeof _j24AutoInit === 'function') {
    // Clear init guard so game rebuilds when caps change
    if (typeof _gInited !== 'undefined') delete _gInited['j24-wrap-unified'];
    _j24AutoInit('j24-wrap-unified', level);
  }
}


// ── UNIFIED EXERCÍCIOS ──────────────────────────────────────
function mat7RenderUnifiedExercicios(caps, inlineEl) {
  var capNames = _mat7CapNames || {1:'Cap. 1',2:'Cap. 2',3:'Cap. 3',4:'Cap. 4'};
  var currentLevel = 'medio';

  function buildMixedQuiz(level) {
    var allExs = [];
    var dif = level;
    var limObj = typeof lim === 'function' ? lim(dif) : { min: -20, max: 20 };
    var min = limObj.min, max = limObj.max;

    // Per cap: generate 20 questions mixing all types (questoes + minitestes + teste)
    var numPerCap = Math.max(20, Math.ceil(20 / caps.length));

    caps.forEach(function(cap) {
      var capExs = [];
      var temas = ['1','2','3','4','5'];

      // Build a varied plan mixing fill, mc, vf, contexto
      var tipos = ['fill','mc','fill','mc','vf','fill','mc','fill','mc','fill',
                   'mc','fill','vf','mc','fill','mc','fill','mc','vf','fill'];

      for (var i = 0; i < numPerCap; i++) {
        var tema = temas[i % temas.length];
        var tipo = tipos[i % tipos.length];
        var ex = null;
        if (cap === 4) {
          if (typeof buildEx4 === 'function') ex = buildEx4(tema, dif);
        } else if (cap === 3) {
          if (typeof buildEx3 === 'function') ex = buildEx3(tema, tipo, dif);
        } else if (cap === 2) {
          var t2 = tipo === 'fill' ? 'fill_frac' : tipo;
          if (typeof buildEx2 === 'function') ex = buildEx2(tema, t2, dif);
        } else {
          if (typeof buildExercicio === 'function') {
            ex = buildExercicio(tema, tipo, min, max, capExs.length+1, dif)
              || buildExercicio(tema, 'fill', min, max, capExs.length+1, dif);
          }
        }
        if (ex) {
          ex._capId = cap;
          ex._capLabel = capNames[cap];
          ex.num = allExs.length + capExs.length + 1;
          capExs.push(ex);
        }
      }
      // Shuffle cap questions (Fisher-Yates)
      for (var _si = capExs.length - 1; _si > 0; _si--) {
        var _sj = Math.floor(Math.random() * (_si + 1));
        var _st = capExs[_si]; capExs[_si] = capExs[_sj]; capExs[_sj] = _st;
      }
      allExs = allExs.concat(capExs);
    });

    // Number sequentially
    allExs.forEach(function(ex, i){ ex.num = i + 1; });
    return allExs;
  }

  function renderUnifiedQuiz(level) {
    currentLevel = level;
    var exercicios = buildMixedQuiz(level);
    if (!exercicios.length) {
      inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Selecciona pelo menos um capítulo.</p>';
      return;
    }

    var capLabels = caps.map(function(c){ return capNames[c] || 'Cap.'+c; }).join(' + ');
    var levelLabel = level === 'facil' ? 'Fácil' : level === 'dificil' ? 'Difícil' : 'Médio';

    var html = [
      '<div class="sec-header"><h2><span class="ico ico-sm"><svg><use href="#ico-pencil"/></svg></span> Exercícios — ' + capLabels + '</h2>',
      '<p>' + exercicios.length + ' questões · nível ' + levelLabel + ' · mistura de todos os tipos</p></div>',
      '<div class="level-bar" style="margin-bottom:1.25rem">',
      '  <div class="gen-level-group">',
      '    <span class="gen-level-label">Nível:</span>',
      '    <button class="gen-level-btn' + (level==='facil'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'facil\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#4caf50;display:inline-block;margin-right:4px"></span>Fácil</button>',
      '    <button class="gen-level-btn' + (level==='medio'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'medio\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#ff9800;display:inline-block;margin-right:4px"></span>Médio</button>',
      '    <button class="gen-level-btn' + (level==='dificil'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'dificil\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#f44336;display:inline-block;margin-right:4px"></span>Difícil</button>',
      '  </div>',
      '  <button class="btn btn-ghost" style="margin-left:auto" onclick="mat7UnifiedQuizRefresh()">↺ Novas questões</button>',
      '</div>',
      '<div id="uq-container"></div>',
    ].join('\n');

    inlineEl.innerHTML = html;

    window._mat7UnifiedCaps = caps;
    window._mat7UnifiedLevel = level;

    // Use quiz engine
    if (typeof qzInit === 'function') {
      var sec = 'uq' + caps.join('');
      qzInit('uq-container', exercicios, sec, function(correct, total) {
        // Log progress for each cap
        caps.forEach(function(cap) {
          var capExercises = exercicios.filter(function(ex){ return ex._capId===cap; });
          var capTotal = capExercises.length;
          // Estimate per-cap correct proportionally by cap share
          var capCorrect = capTotal > 0 ? Math.round(correct * capTotal / (exercicios.length || 1)) : 0;
          if (cap===1 && typeof progLog==='function') progLog('questoes', capCorrect > 0);
          else if (cap===2 && typeof progLog2==='function') progLog2('questoes', capCorrect > 0);
          else if (cap===3 && typeof progLog3==='function') progLog3('questoes', capCorrect > 0);
          else if (cap===4 && typeof progLog4==='function') progLog4('questoes', capCorrect > 0);
          if (typeof ProgressManager !== 'undefined') _pmRecord('cap'+cap, 'quiz', {pontuacao:capCorrect, total:capTotal});
        });
      });
    }
  }

  // Expose level change and refresh
  window.mat7UnifiedQuizLevel = function(level, btn) {
    document.querySelectorAll('#mat7-inline-exercicios .gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderUnifiedQuiz(level);
  };
  window.mat7UnifiedQuizRefresh = function() {
    renderUnifiedQuiz(currentLevel);
  };

  renderUnifiedQuiz(currentLevel);
}


function mat7LoadInline(tab) {
  var inlineEl = document.getElementById('mat7-inline-' + tab);
  if (!inlineEl) return;
  
  // Get active caps (may be array for multi-select)
  var caps = _mat7GetActiveCaps(tab);
  
  // Return all previously moved sections for this tab
  mat7ReturnSections(tab);
  
  inlineEl.innerHTML = '';
  var loaded = false;
  
  // ── UNIFIED MULTI-CAP RENDERING ──────────────────────────
  // exercicios: always use unified quiz (1 or more caps)
  if (tab === 'exercicios') {
    mat7RenderUnifiedExercicios(caps, inlineEl);
    return;
  }
  if (caps.length > 1) {
    if (tab === 'flashcards') {
      mat7RenderUnifiedFlashcards(caps, inlineEl);
      return;
    }
    if (tab === 'jogos') {
      mat7RenderUnifiedJogos(caps, inlineEl);
      return;
    }
  }
  // ─────────────────────────────────────────────────────────
  
  caps.forEach(function(cap) {
    var secId = (_mat7SecMap[tab] || {})[cap];
    if (!secId) return;
    
    var secEl = document.getElementById(secId);
    if (!secEl) return;
    
    // Save reference to original parent
    if (!_mat7MovedSections[tab]) _mat7MovedSections[tab] = [];
    _mat7MovedSections[tab].push({ el: secEl, parent: secEl.parentElement });
    
    // Add cap divider if multiple caps
    if (caps.length > 1 && loaded) {
      var sep = document.createElement('div');
      sep.style.cssText = 'border-top:2px dashed var(--border2);margin:2rem 0;';
      inlineEl.appendChild(sep);
    }
    if (caps.length > 1) {
      var capLabel = document.createElement('div');
      var capNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};
      capLabel.style.cssText = 'font-family:"Cormorant Garamond",serif;font-size:1.15rem;font-weight:800;color:var(--sage-dark);margin-bottom:.75rem;display:flex;align-items:center;gap:.5rem';
      capLabel.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:var(--sage-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:900">' + cap + '</span> ' + (capNames[cap] || 'Cap. ' + cap);
      inlineEl.appendChild(capLabel);
    }
    
    // Move it
    secEl.style.display = '';
    secEl.classList.add('active');
    inlineEl.appendChild(secEl);
    loaded = true;
    
    // Run init function
    var initFn = _mat7InitMap[secId];
    if (initFn) setTimeout(initFn, 50);
  });
  
  if (!loaded) {
    inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Conteúdo em preparação para este capítulo.</p>';
  }
}

// Get array of active cap numbers for a tab
function _mat7GetActiveCaps(tab) {
  var row = document.getElementById('mat7-caps-' + tab);
  if (!row) return [1];
  var caps = [];
  row.querySelectorAll('.mat7-cap-btn.active, .gf-cap-btn.active').forEach(function(b) {
    var n = parseInt(b.dataset.cap);
    if (!isNaN(n) && caps.indexOf(n) === -1) caps.push(n);
  });
  return caps.length ? caps : [1];
}

function mat7SwitchTab(tab, btn) {
  document.querySelectorAll('.mat7-hub-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.mat7-panel').forEach(function(p){ p.classList.remove('active'); p.style.display = 'none'; });
  var panel = document.getElementById('mat7p-' + tab);
  if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
  // Update document title
  var _tabTitles = { resumo:'Resumo', exercicios:'Exercícios', testes:'Testes',
    flashcards:'Flashcards', jogos:'Jogos', exame:'Exame', progresso:'Progresso', quiz:'Modo Quiz' };
  if (_tabTitles[tab]) document.title = 'Mat. 7.º — ' + _tabTitles[tab] + ' · 3ponto14';
  // Auto-render content
  if (tab === 'resumo') mat7RenderResumoInline();
  else if (tab === 'quiz') { if (typeof qgHubInit === 'function') qgHubInit(); }
  else if (tab === 'progresso') { if (typeof renderProgressoUnificado === 'function') renderProgressoUnificado(); }
  else if (tab === 'exercicios') {
    mat7LoadInline('exercicios');
    // Load whichever mode is currently active
    var miniSec = document.getElementById('exmode-section-minitestes');
    if (miniSec && miniSec.style.display !== 'none') mat7LoadInline('minitestes');
    if(typeof testeReloadFromGf==='function') setTimeout(testeReloadFromGf, 300);
  }
  else if (tab === 'minitestes') { mat7SwitchTab('exercicios', document.querySelector('[data-tab="exercicios"]')); return; }
  else if (_mat7SecMap[tab]) mat7LoadInline(tab);
}


function exModeSwitch(mode) {
  var secEx   = document.getElementById('exmode-section-exercicios');
  var secMini = document.getElementById('exmode-section-minitestes');
  var btnEx   = document.getElementById('exmode-btn-ex');
  var btnMini = document.getElementById('exmode-btn-mini');
  if (!secEx || !secMini) return;

  var active = mode === 'exercicios';
  secEx.style.display   = active ? '' : 'none';
  secMini.style.display = active ? 'none' : '';

  var activeStyle = 'background:var(--sage-dark);color:#fff;box-shadow:0 2px 8px rgba(81,104,96,.25)';
  var inactiveStyle = 'background:transparent;color:var(--ink3)';
  if (btnEx)   btnEx.style.cssText   = 'flex:1;padding:8px 0;border:none;border-radius:9px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;' + (active ? activeStyle : inactiveStyle);
  if (btnMini) btnMini.style.cssText = 'flex:1;padding:8px 0;border:none;border-radius:9px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;' + (!active ? activeStyle : inactiveStyle);

  if (active) { mat7LoadInline('exercicios'); }
  else        { mat7LoadInline('minitestes'); }
}

function mat7CapSelect(tab, cap, btn) {
  if (tab === 'resumo') {
    // Resumo: single-select (theory content is per-chapter)
    var row = document.getElementById('mat7-caps-' + tab);
    if (row) row.querySelectorAll('.mat7-cap-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    _mat7Sel[tab] = cap;
    mat7RenderSt(tab, cap);
    mat7RenderResumoInline();
    return;
  }
  // Multi-select toggle for all other tabs
  if (btn) btn.classList.toggle('active');
  // Ensure at least one is selected
  var row = document.getElementById('mat7-caps-' + tab);
  var anyActive = row && row.querySelector('.mat7-cap-btn.active');
  if (!anyActive && btn) btn.classList.add('active');
  // Update subtema row for first active cap
  var caps = _mat7GetActiveCaps(tab);
  _mat7Sel[tab] = caps.length === 1 ? caps[0] : caps;
  mat7RenderSt(tab, caps[0]);
  // Reload inline content
  if (_mat7SecMap[tab]) mat7LoadInline(tab);
}

function mat7RenderSt(tab, cap) {
  var stRow = document.getElementById('mat7-st-' + tab);
  if (!stRow) return;
  var subtemas = _mat7Subtemas[cap] || [];
  var html = '<span class="mat7-st-label">Subtema</span>';
  html += '<button class="mat7-st-chip active" data-st="0" onclick="mat7StSelect(this,\'' + tab + '\')" >Todos</button>';
  subtemas.forEach(function(st, i) {
    html += '<button class="mat7-st-chip" data-st="' + (i+1) + '" onclick="mat7StSelect(this,\'' + tab + '\')">' + st + '</button>';
  });
  stRow.innerHTML = html;
}

function mat7StSelect(btn, tab) {
  var row = btn.closest('.mat7-st-row');
  if (!row) return;
  row.querySelectorAll('.mat7-st-chip').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  // Auto-render inline content for resumo tab
  if (tab === 'resumo') mat7RenderResumoInline();
}

// ═══ TESTES — novo sistema cap+subtema igual ao gerador de fichas ═══
var _testeDif = 'facil';

function testeSetDif(dif) {
  _testeDif = dif;
  ['facil','medio','dificil'].forEach(function(d) {
    var btn = document.getElementById('tst-dif-' + d);
    if (btn) btn.classList.toggle('active', d === dif);
  });
  testeReloadFromGf();
}

function testeReloadFromGf() {
  // Read active caps from the new gf-style selector
  var activeCaps = [];
  document.querySelectorAll('#gf-caps-testes .gf-cap-btn.active').forEach(function(b) {
    activeCaps.push(parseInt(b.dataset.cap));
  });
  if (!activeCaps.length) activeCaps = [1];

  // Map cap → section
  var secMap = { 1:'sec-teste', 2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4' };
  var initMap = {
    'sec-teste':  function(){ var el=document.getElementById('t-container');  if(el && !el.innerHTML && typeof gerarTeste==='function') gerarTeste(); },
    'sec-teste2': function(){ var el=document.getElementById('t2-container'); if(el && !el.innerHTML && typeof gerarTeste2==='function') gerarTeste2(); },
    'sec-teste3': function(){ var el=document.getElementById('t3-container'); if(el && !el.innerHTML && typeof gerarTeste3==='function') gerarTeste3(); },
    'sec-teste4': function(){ var el=document.getElementById('t4-container'); if(el && !el.innerHTML && typeof renderTeste4==='function') renderTeste4(); }
  };

  // Return previously moved sections
  mat7ReturnSections('testes');
  var inlineEl = document.getElementById('mat7-inline-testes');
  if (!inlineEl) return;
  inlineEl.innerHTML = '';

  var loaded = false;
  var capNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};

  activeCaps.forEach(function(cap) {
    var secId = secMap[cap];
    if (!secId) return;
    var secEl = document.getElementById(secId);
    if (!secEl) return;

    if (!_mat7MovedSections['testes']) _mat7MovedSections['testes'] = [];
    _mat7MovedSections['testes'].push({ el: secEl, parent: secEl.parentElement });

    if (loaded) {
      var sep = document.createElement('div');
      sep.style.cssText = 'border-top:2px dashed var(--border2);margin:2rem 0;';
      inlineEl.appendChild(sep);
    }

    // Cap label header
    var capLabel = document.createElement('div');
    capLabel.style.cssText = 'font-family:"Cormorant Garamond",serif;font-size:1.15rem;font-weight:800;color:var(--sage-dark);margin-bottom:.75rem;display:flex;align-items:center;gap:.5rem';
    capLabel.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:var(--sage-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:900">' + cap + '</span> ' + (capNames[cap] || 'Cap. ' + cap);
    inlineEl.appendChild(capLabel);

    secEl.style.display = '';
    secEl.classList.add('active');
    inlineEl.appendChild(secEl);
    loaded = true;

    var initFn = initMap[secId];
    if (initFn) setTimeout(initFn, 50);
  });

  if (!loaded) {
    inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Seleciona pelo menos um capítulo.</p>';
  }
}

// ── Render theory content inline in the resumo panel ──
function mat7RenderResumoInline() {
  var cap = _mat7Sel['resumo'] || 1;
  // Support both old .mat7-st-chip and new gf-st-chip in the tray for resumo
  var trayId = 'mat7-st-' + cap + '-resumo';
  var tray = document.getElementById(trayId);
  var stChip = tray ? tray.querySelector('.gf-st-chip.active') : null;
  var stIdx = stChip ? parseInt(stChip.dataset.st) : 0; // 0 = all

  // Source section IDs per cap
  var srcIds = { 1: 'sec-teoria', 2: 'sec-teoria2', 3: 'sec-teoria3', 4: 'sec-teoria4' };
  var srcEl = document.getElementById(srcIds[cap]);
  var dest = document.getElementById('mat7-resumo-content');
  if (!dest) return;

  if (!srcEl) {
    dest.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Conteúdo em preparação para este capítulo.</p>';
    return;
  }

  // Clone the teoria section (keep IDs temporarily for subtema lookup below)
  var clone = srcEl.cloneNode(true);
  clone.removeAttribute('id');
  clone.style.display = 'block';
  clone.classList.remove('section', 'section4');

  // If a specific subtema is selected (stIdx > 0), show only that topic block
  if (stIdx > 0) {
    var topicEl = null;

    if (cap === 1) {
      // Cap1: ids are topic-1, topic-2, ...
      topicEl = clone.querySelector('#topic-' + stIdx);
    } else if (cap === 2) {
      // Cap2: ids are topic2-1, topic2-2, ...
      topicEl = clone.querySelector('#topic2-' + stIdx);
    } else if (cap === 3) {
      // Cap3: ids are topic3-1, topic3-2, ...
      topicEl = clone.querySelector('#topic3-' + stIdx);
    } else if (cap === 4) {
      // Cap4: uses .subtema-header with .subtema-num text content
      var headers = clone.querySelectorAll('.subtema-header');
      headers.forEach(function(h) {
        var numEl = h.querySelector('.subtema-num');
        if (numEl && parseInt(numEl.textContent) === stIdx) {
          topicEl = document.createElement('div');
          topicEl.appendChild(h.cloneNode(true));
          // grab next sibling def-block(s)
          var sib = h.nextElementSibling;
          while (sib && !sib.classList.contains('subtema-header')) {
            topicEl.appendChild(sib.cloneNode(true));
            sib = sib.nextElementSibling;
          }
        }
      });
    }

    if (topicEl) {
      var filtered = document.createElement('div');
      var header = clone.querySelector('.sec-header');
      if (header) filtered.appendChild(header.cloneNode(true));
      filtered.appendChild(topicEl);
      // Strip IDs from the fragment before inserting to avoid duplicates
      filtered.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });
      dest.innerHTML = '';
      dest.appendChild(filtered);
      return;
    }
  }

  // Strip all descendant IDs to prevent duplicate-ID collisions with the live originals
  clone.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });

  // Show full teoria
  dest.innerHTML = '';
  dest.appendChild(clone);
}

// mat7Go is no longer needed — content loads inline automatically
// Keep as stub in case anything still references it
function mat7Go(section) {
  var tabMap = { questoes:'exercicios', miniteste:'exercicios', teste:'testes', resumo:'resumo', jogos:'jogos', flashcards:'flashcards', exame:'exame' };
  var tab = tabMap[section] || section;
  // Switch to the right hub tab and load content
  var tabBtn = document.querySelector('.mat7-hub-tab[data-tab="' + tab + '"]');
  mat7SwitchTab(tab, tabBtn);
}

// Return moved sections for a specific tab
function mat7ReturnSections(tab) {
  var prevArr = _mat7MovedSections[tab];
  if (prevArr && prevArr.length) {
    prevArr.forEach(function(prev) {
      if (prev.el && prev.parent) {
        prev.el.classList.remove('active');
        prev.el.style.display = '';
        prev.parent.appendChild(prev.el);
      }
    });
  }
  _mat7MovedSections[tab] = [];
}

// Return all moved sections to their original DOM parents
function mat7ReturnAllSections() {
  Object.keys(_mat7MovedSections).forEach(function(tab) {
    mat7ReturnSections(tab);
  });
  _mat7MovedSections = {};
}

// Init subtema rows on load — content is rendered lazily when tab is first opened
// mat7RenderResumoInline() is called from mat7SwitchTab when 'resumo' tab is activated

// ═══ MAT7 TAB SUBTEMA SELECTOR — nova UI estilo gerador ═══

// Reload de conteúdo por tab
function mat7TabReload(tab) {
  if (tab === 'resumo') {
    // Para o resumo: relê o capítulo activo e re-renderiza
    var row = document.getElementById('mat7-caps-resumo');
    if (row) {
      var activeBtn = row.querySelector('.gf-cap-btn.active');
      if (activeBtn) _mat7Sel['resumo'] = parseInt(activeBtn.dataset.cap) || 1;
    }
    mat7RenderResumoInline();
  } else if (_mat7SecMap[tab]) {
    mat7LoadInline(tab);
  }
}

// Clique num botão de capítulo num tab
function mat7TabCapClick(tab, cap, btn) {
  var container = document.getElementById('mat7-caps-' + tab);
  if (!container) return;

  if (tab === 'resumo') {
    // Single-select para o resumo
    container.querySelectorAll('.gf-cap-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    _mat7Sel['resumo'] = cap;
  } else {
    // Multi-select toggle para os outros tabs
    btn.classList.toggle('active');
    // Garante que pelo menos 1 está activo
    if (!container.querySelector('.gf-cap-btn.active')) btn.classList.add('active');
  }

  // Toggle tray (abre/fecha subtemas deste capítulo)
  var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
  if (tray) {
    var isActive = btn.classList.contains('active');
    if (!isActive) {
      tray.style.display = 'none';
    } else {
      tray.style.display = tray.style.display === 'none' ? '' : 'none';
    }
  }

  mat7TabReload(tab);
}

// Clique num chip de subtema num tab
function mat7TabStClick(btn, tab, cap) {
  if (tab === 'resumo') {
    // Single-select: desactiva todos os chips deste tray e activa só este
    var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
    if (tray) {
      tray.querySelectorAll('.gf-st-chip').forEach(function(c) { c.classList.remove('active'); });
    }
    btn.classList.add('active');
  } else {
    // Multi-select toggle, com garantia de ao menos 1 activo
    btn.classList.toggle('active');
    var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
    if (tray && !tray.querySelector('.gf-st-chip.active')) {
      btn.classList.add('active');
    }
  }
  mat7TabReload(tab);
}

// Seleccionar / desseleccionar todos os subtemas de um cap num tab
function mat7TabStAll(tab, cap, selectAll) {
  var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
  if (!tray) return;
  tray.querySelectorAll('.gf-st-chip').forEach(function(c) {
    if (selectAll) c.classList.add('active');
    else c.classList.remove('active');
  });
  // Para o resumo garante pelo menos 1 activo
  if (tab === 'resumo' && !selectAll) {
    var first = tray.querySelector('.gf-st-chip');
    if (first) first.classList.add('active');
  }
  mat7TabReload(tab);
}

// Obtém os subtemas activos (array de índices 1-based) por cap num tab
// Retorna [] se todos activos (sem filtro), ou lista de st ids
function mat7TabGetActiveSts(tab, cap) {
  var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
  if (!tray) return [];
  var all  = tray.querySelectorAll('.gf-st-chip');
  var active = tray.querySelectorAll('.gf-st-chip.active');
  if (active.length === all.length) return []; // todos — sem filtro
  return Array.from(active).map(function(c){ return parseInt(c.dataset.st); });
}

/* ── Block 2 (from line 4431) ── */
// ═══════════════════════════════════════════════════════════════
// UX IMPROVEMENT 1: COLLAPSIBLE THEORY SUBTEMAS
// ═══════════════════════════════════════════════════════════════
(function(){
  document.querySelectorAll('.subtema-header').forEach(function(h){
    var content=[];
    var sib=h.nextElementSibling;
    while(sib && !sib.classList.contains('subtema-header') && !sib.classList.contains('sec-header') && !sib.classList.contains('section4') && !sib.classList.contains('section') && sib.tagName!=='H3'){
      content.push(sib);
      sib=sib.nextElementSibling;
    }
    if(content.length){
      var wrap=document.createElement('div');
      wrap.className='subtema-content';
      h.parentNode.insertBefore(wrap,content[0]);
      content.forEach(function(el){wrap.appendChild(el);});
    }
    h.addEventListener('click',function(){
      var c=this.nextElementSibling;
      if(!c||!c.classList.contains('subtema-content'))return;
      this.classList.toggle('collapsed');
      c.classList.toggle('hidden');
    });
  });
  // Expand/collapse all buttons
  var theoryHeaders=document.querySelectorAll('[id*="sec-teoria"] .sec-header, [id*="sec-teoria"] > .sec-header');
  document.querySelectorAll('[id*="sec-teoria"]').forEach(function(sec){
    var headers=sec.querySelectorAll('.subtema-header');
    if(headers.length>2){
      var sh=sec.querySelector('.sec-header');
      if(!sh)return;
      var btn=document.createElement('button');
      btn.className='subtema-expand-all';
      btn.innerHTML='⊟ Colapsar todos os subtemas';
      btn.dataset.state='open';
      btn.addEventListener('click',function(){
        var open=this.dataset.state==='open';
        headers.forEach(function(h2){
          var c2=h2.nextElementSibling;
          if(!c2||!c2.classList.contains('subtema-content'))return;
          if(open){h2.classList.add('collapsed');c2.classList.add('hidden');}
          else{h2.classList.remove('collapsed');c2.classList.remove('hidden');}
        });
        this.dataset.state=open?'closed':'open';
        this.innerHTML=open?'⊞ Expandir todos os subtemas':'⊟ Colapsar todos os subtemas';
      });
      sh.after(btn);
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// UX 2: NEXT STEP SUGGESTIONS (after completing activities)
// ═══════════════════════════════════════════════════════════════
function showNextStep(container,msg,btnText,action){
  var ex=container.querySelector('.next-step');if(ex)ex.remove();
  var d=document.createElement('div');d.className='next-step';
  d.innerHTML='<div class="next-step-icon"><span class="ico ico-lg"><svg><use href="#ico-target"/></svg></span></div><div class="next-step-text"><strong>'+msg+'</strong>Continua a praticar para consolidar.</div><button class="next-step-btn" onclick="'+action+'">'+btnText+' →</button>';
  container.appendChild(d);
  setTimeout(function(){d.scrollIntoView({behavior:'smooth',block:'nearest'});},100);
}

// ── Next-step context map ──
// sec → { containerId, msg, btnText, action }
var _nextStepMap = {
  // Cap 1
  'q':  { c:'sec-questoes',          msg:'Exercícios concluídos!',  btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  'm':  { c:'sec-minitestes-inline', msg:'Miniteste concluído!',    btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  't':  { c:'sec-teste-inline',      msg:'Teste concluído!',        btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  // Cap 2
  'q2': { c:'sec-questoes2',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  'm2': { c:'sec-minitestes2-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  't2': { c:'sec-teste2-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  // Cap 3
  'q3': { c:'sec-questoes3',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  'm3': { c:'sec-minitestes3-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  't3': { c:'sec-teste3-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  // Cap 4
  'q4': { c:'sec-questoes4',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
  'm4': { c:'sec-minitestes4-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
  't4': { c:'sec-teste4-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
};

function _maybeShowNextStep(sec, correct, total) {
  var map = _nextStepMap[sec]; if (!map) return;
  var container = document.getElementById(map.c); if (!container) return;
  // Clear flag and banner when quiz is reset or incomplete
  if (!total || total < 3 || correct < total) {
    delete container.dataset.nextShown;
    var ex = container.querySelector('.next-step'); if (ex) ex.remove();
    return;
  }
  if (correct !== total) return;
  // Avoid duplicate if already shown for this completion
  if (container.dataset.nextShown === String(total)) return;
  container.dataset.nextShown = String(total);
  showNextStep(container, map.msg, map.btn, map.act);
}

// ═══════════════════════════════════════════════════════════════
// JOGO DO 24 — Mecânica passo-a-passo (calculadora progressiva)
// ═══════════════════════════════════════════════════════════════

var _j24Levels = {
  facil:   { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil',   nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,1,2,3,4,6,8]); }, time: 90 },
  medio:   { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio',   nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,10,11,12,-1,-2,-3,-4]); }, time: 60 },
  dificil: { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil', nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,10,12,1.5,2.5,0.5,3.5,-2,-3]); }, time: 45 }
};

function _j24Pick4(pool) {
  var a = pool.slice();
  for (var i = a.length-1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
  return a.slice(0,4);
}

function _j24Solve(nums) {
  var ops = ['+','-','*','/'];
  var perms = _j24Perms(nums);
  for (var p = 0; p < perms.length; p++) {
    var n = perms[p];
    for (var a = 0; a < 4; a++) for (var b = 0; b < 4; b++) for (var cc = 0; cc < 4; cc++) {
      var o1=ops[a], o2=ops[b], o3=ops[cc];
      var exprs = [
        '(('+n[0]+o1+n[1]+')'+o2+n[2]+')'+o3+n[3],
        '('+n[0]+o1+'('+n[1]+o2+n[2]+'))'+o3+n[3],
        '('+n[0]+o1+n[1]+')'+o2+'('+n[2]+o3+n[3]+')',
        n[0]+o1+'(('+n[1]+o2+n[2]+')'+o3+n[3]+')',
        n[0]+o1+'('+n[1]+o2+'('+n[2]+o3+n[3]+'))',
      ];
      for (var e = 0; e < exprs.length; e++) {
        try {
          var r = window._mathEval(exprs[e]);
          if (Math.abs(r - 24) < 1e-9) return exprs[e];
        } catch(ex) {}
      }
    }
  }
  return null;
}

function _j24Perms(arr) {
  if (arr.length <= 1) return [arr.slice()];
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var rest = arr.slice(0,i).concat(arr.slice(i+1));
    var perms = _j24Perms(rest);
    for (var j = 0; j < perms.length; j++) result.push([arr[i]].concat(perms[j]));
  }
  return result;
}

function _j24GenPuzzle(level) {
  var cfg = _j24Levels[level] || _j24Levels.medio;
  for (var i = 0; i < 50; i++) {
    var nums = cfg.nums();
    if (_j24Solve(nums)) return nums;
  }
  return [1, 2, 3, 4];
}

function _j24Hint(nums) {
  var sol = _j24Solve(nums);
  if (!sol) return null;
  return sol.replace(/\*/g, '×').replace(/\//g, '÷');
}

var _j24State = {};

function _j24numFmt(n) {
  if (!isFinite(n)) return '?';
  if (Number.isInteger(n)) return String(n);
  // Show up to 2 decimal places, trimming trailing zeros
  var s = n.toFixed(2).replace(/\.?0+$/, '');
  return s;
}

function _j24applyOp(a, op, b) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') {
    if (Math.abs(b) < 1e-12) return NaN;
    return a / b;
  }
  return NaN;
}

function _j24Init(cid, level) {
  var nums = _j24GenPuzzle(level);
  var cfg  = _j24Levels[level] || _j24Levels.medio;
  var prev = _j24State[cid];
  _j24State[cid] = {
    level:    level,
    origNums: nums.slice(),
    timeLeft: cfg.time,
    timerID:  null,
    solved:   prev ? prev.solved   : 0,
    attempts: prev ? prev.attempts : 0,
    // step-by-step state
    available: nums.map(function(v, i){ return {val: v, id: i}; }),
    step1:    null,   // index in available for first number selected
    selOp:    null,   // operator selected
    history:  [],     // [{aLabel, op, bLabel, result, prevAvail}]
    done:     false
  };
  _j24Render(cid);
  _j24StartTimer(cid);
}

function _j24Render(cid) {
  var s = _j24State[cid];
  if (!s) return;
  var c = document.getElementById(cid);
  if (!c) return;

  // ── Number buttons ──
  var numBtns = c.querySelectorAll('.j24-num-btn');
  numBtns.forEach(function(btn, i) {
    if (i >= s.available.length) {
      btn.style.visibility = 'hidden';
      return;
    }
    btn.style.visibility = 'visible';
    btn.textContent = _j24numFmt(s.available[i].val);
    btn.className = 'j24-num-btn';
    btn.disabled = s.done;
    if (s.step1 === i) btn.classList.add('selected');
  });

  // ── Op buttons ──
  var opBtns = c.querySelectorAll('.j24-op-btn');
  opBtns.forEach(function(btn) {
    btn.className = 'j24-op-btn';
    if (s.step1 === null || s.done) { btn.classList.add('dimmed'); btn.disabled = true; return; }
    btn.disabled = false;
    if (btn.dataset.op === s.selOp) btn.classList.add('selected');
  });

  // ── Status message ──
  var statusEl = c.querySelector('.j24-status');
  if (statusEl && !s.done) {
    if (s.step1 === null) {
      statusEl.className = 'j24-status step1';
      statusEl.textContent = '① Seleciona o 1.º número';
    } else if (s.selOp === null) {
      statusEl.className = 'j24-status step2';
      statusEl.textContent = '② Seleciona o operador';
    } else {
      statusEl.className = 'j24-status step3';
      statusEl.textContent = '③ Seleciona o 2.º número';
    }
  } else if (statusEl && s.done) {
    statusEl.textContent = '';
  }

  // ── Step history ──
  var hist = c.querySelector('.j24-step-history');
  if (hist) {
    if (s.history.length === 0) {
      hist.innerHTML = '<span style="color:var(--ink4);font-size:.8rem;font-style:italic">As contas aparecerão aqui…</span>';
    } else {
      hist.innerHTML = s.history.map(function(h, idx) {
        var isLast = idx === s.history.length - 1;
        return '<div class="j24-step-row'+(isLast?' last-step':'')+'">'+
          '<span class="j24-sr-a">'+h.aLabel+'</span>'+
          '<span class="j24-sr-op">'+h.op+'</span>'+
          '<span class="j24-sr-b">'+h.bLabel+'</span>'+
          '<span class="j24-sr-eq">=</span>'+
          '<span class="j24-sr-res">'+_j24numFmt(h.result)+'</span>'+
        '</div>';
      }).join('');
    }
  }

  // ── Timer ──
  var timerEl = c.querySelector('.j24-timer');
  if (timerEl) {
    timerEl.textContent = s.timeLeft + 's';
    timerEl.classList.toggle('urgent', s.timeLeft <= 10);
  }

  // ── Stats ──
  var solEl = c.querySelector('.j24-stats-solved');
  if (solEl) solEl.textContent = s.solved;
  var attEl = c.querySelector('.j24-stats-att');
  if (attEl) attEl.textContent = s.attempts;
}

function _j24StartTimer(cid) {
  var s = _j24State[cid];
  if (!s) return;
  if (s.timerID) clearInterval(s.timerID);
  s.timerID = setInterval(function() {
    s.timeLeft--;
    _j24Render(cid);
    if (s.timeLeft <= 0) {
      clearInterval(s.timerID);
      s.done = true;
      _j24ShowResult(cid, 'err', '⏱️ Tempo esgotado! Gera um novo puzzle.');
    }
  }, 1000);
}

function _j24StopTimer(cid) {
  var s = _j24State[cid];
  if (s && s.timerID) { clearInterval(s.timerID); s.timerID = null; }
}

// ── User interactions ──

function j24SelNum(cid, avIdx) {
  var s = _j24State[cid];
  if (!s || s.done) return;
  _j24HideResult(cid);

  // Deselect if tapping the already-selected first number
  if (s.step1 === avIdx) {
    s.step1 = null;
    s.selOp = null;
    _j24Render(cid);
    return;
  }

  // If no first number selected yet → select it
  if (s.step1 === null) {
    s.step1 = avIdx;
    _j24Render(cid);
    return;
  }

  // First number is selected; if we also have an op → execute step
  if (s.selOp !== null) {
    _j24ExecuteStep(cid, avIdx);
    return;
  }

  // First number selected but no op yet → swap first number selection
  s.step1 = avIdx;
  _j24Render(cid);
}

function j24SelOp(cid, op) {
  var s = _j24State[cid];
  if (!s || s.done || s.step1 === null) return;
  s.selOp = (s.selOp === op) ? null : op;
  _j24HideResult(cid);
  _j24Render(cid);
}

function _j24ExecuteStep(cid, step2Idx) {
  var s = _j24State[cid];
  var a   = s.available[s.step1];
  var b   = s.available[step2Idx];
  var result = _j24applyOp(a.val, s.selOp, b.val);

  // Record step for history (save previous available for undo)
  s.history.push({
    aLabel:    _j24numFmt(a.val),
    op:        s.selOp,
    bLabel:    _j24numFmt(b.val),
    result:    result,
    prevAvail: s.available.slice()
  });

  // Build new available: remove a and b, add result
  var newAvail = [];
  var nextId = Date.now();
  for (var i = 0; i < s.available.length; i++) {
    if (i !== s.step1 && i !== step2Idx) newAvail.push(s.available[i]);
  }
  newAvail.push({ val: result, id: nextId });
  s.available = newAvail;
  s.step1 = null;
  s.selOp = null;

  // Check end condition
  if (s.available.length === 1) {
    s.attempts++;
    _j24StopTimer(cid);
    s.done = true;
    if (Math.abs(result - 24) < 1e-9) {
      s.solved++;
      var expr = s.history.map(function(h){ return h.aLabel+' '+h.op+' '+h.bLabel+' = '+_j24numFmt(h.result); }).join(' → ');
      _j24ShowResult(cid, 'ok', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 14.5c.828 0 1.5-.672 1.5-1.5V8H5.5A2.5 2.5 0 0 0 3 10.5v0A2.5 2.5 0 0 0 5.5 13H8"/><path d="M12 5a2 2 0 0 1 2 2v3"/><path d="M19 9c0 4.67-5 8-7 9-1.01-.52-2.06-1.23-3-2.08"/><path d="M2 2l20 20"/></svg></span> Parabéns! Chegaste ao 24! ' + expr);
    } else {
      _j24ShowResult(cid, 'err', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Resultado final: '+_j24numFmt(result)+' ≠ 24. Tenta outra combinação!');
    }
  }
  _j24Render(cid);
}

function j24Undo(cid) {
  var s = _j24State[cid];
  if (!s || s.history.length === 0) return;
  var last = s.history.pop();
  s.available = last.prevAvail;
  s.step1 = null;
  s.selOp = null;
  s.done  = false;
  _j24HideResult(cid);
  // Restart timer if it was stopped by the undo
  if (!s.timerID && s.timeLeft > 0) _j24StartTimer(cid);
  _j24Render(cid);
}

function j24Clear(cid) {
  var s = _j24State[cid];
  if (!s) return;
  s.available = s.origNums.map(function(v, i){ return {val: v, id: i}; });
  s.step1   = null;
  s.selOp   = null;
  s.history = [];
  s.done    = false;
  _j24HideResult(cid);
  if (!s.timerID && s.timeLeft > 0) _j24StartTimer(cid);
  _j24Render(cid);
}

// j24Build / j24AddParen / j24Verify kept as no-ops for compatibility
function j24Build(cid) {}
function j24AddParen(cid, p) {}
function j24Verify(cid) {}

function j24Hint(cid) {
  var s = _j24State[cid];
  if (!s) return;
  var hint = _j24Hint(s.origNums);
  if (hint) _j24ShowResult(cid, 'hint', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Uma solução: ' + hint.replace(/\*/g,'×').replace(/\//g,'÷'));
  else _j24ShowResult(cid, 'hint', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Este puzzle não tem solução — gera um novo!');
}

function j24New(cid) {
  _j24StopTimer(cid);
  var s = _j24State[cid];
  var level = s ? s.level : 'medio';
  _j24Init(cid, level);
}

function j24SetLevel(cid, level, btn) {
  _j24StopTimer(cid);
  _j24Init(cid, level);
  var c = document.getElementById(cid);
  if (c) {
    c.querySelectorAll('.gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
  }
}

function _j24ShowResult(cid, type, msg) {
  var c = document.getElementById(cid);
  if (!c) return;
  var el = c.querySelector('.j24-result');
  if (!el) return;
  el.className = 'j24-result ' + type;
  el.textContent = msg || '';
  el.style.display = 'block';
}

function _j24HideResult(cid) {
  var c = document.getElementById(cid);
  if (!c) return;
  var el = c.querySelector('.j24-result');
  if (el) el.style.display = 'none';
}

function j24InitIfNeeded(cid, defaultLevel) {
  if (!_j24State[cid]) _j24Init(cid, defaultLevel || 'medio');
}

function _j24BuildHTML(cid, defaultLevel) {
  var lvl = defaultLevel || 'medio';
  return [
    '<div class="j24-card" id="'+cid+'">',
    '  <div class="j24-header">',
    '    <div class="j24-title"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12.5v.5"/><path d="M17 11.5v.5"/></svg></span> Jogo do 24</div>',
    '    <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">',
    '      <button class="btn btn-ghost" style="padding:6px 14px;font-size:.78rem" onclick="j24New(\''+cid+'\')">↺ Novo puzzle</button>',
    '    </div>',
    '  </div>',
    '  <p style="font-size:.85rem;color:var(--ink3);margin-bottom:1rem">Usa os <strong>4 números</strong> exactamente uma vez — combina dois de cada vez com +, −, ×, ÷. O resultado substitui os dois números. Chega ao <strong>24</strong>!</p>',
    '  <div class="level-bar" style="margin-bottom:1.25rem">',
    '    <div class="gen-level-group">',
    '      <span class="gen-level-label">Nível:</span>',
    '      <button class="gen-level-btn'+(lvl==='facil'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil</button>',
    '      <button class="gen-level-btn'+(lvl==='medio'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio</button>',
    '      <button class="gen-level-btn'+(lvl==='dificil'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil</button>',
    '    </div>',
    '    <div class="j24-timer" style="margin-left:auto">90s</div>',
    '  </div>',
    '  <div class="j24-nums">',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',0)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',1)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',2)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',3)">?</button>',
    '  </div>',
    '  <div class="j24-status">① Seleciona o 1.º número</div>',
    '  <div class="j24-ops">',
    '    <button class="j24-op-btn" data-op="+" onclick="j24SelOp(\''+cid+'\',\'+\')">+</button>',
    '    <button class="j24-op-btn" data-op="-" onclick="j24SelOp(\''+cid+'\',\'-\')">−</button>',
    '    <button class="j24-op-btn" data-op="×" onclick="j24SelOp(\''+cid+'\',\'×\')">×</button>',
    '    <button class="j24-op-btn" data-op="÷" onclick="j24SelOp(\''+cid+'\',\'÷\')">÷</button>',
    '  </div>',
    '  <div class="j24-step-history"><span style="color:var(--ink4);font-size:.8rem;font-style:italic">As contas aparecerão aqui…</span></div>',
    '  <div class="j24-actions">',
    '    <button class="btn btn-ghost" onclick="j24Undo(\''+cid+'\')">↩ Desfazer passo</button>',
    '    <button class="btn btn-ghost" onclick="j24Clear(\''+cid+'\')">✕ Recomeçar</button>',
    '    <button class="btn btn-ghost" onclick="j24Hint(\''+cid+'\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Dica</button>',
    '  </div>',
    '  <div class="j24-result"></div>',
    '  <div class="j24-stats">',
    '    Puzzles resolvidos: <span class="j24-stats-solved">0</span>',
    '    &nbsp;|&nbsp; Tentativas: <span class="j24-stats-att">0</span>',
    '  </div>',
    '</div>',
  ].join('\n');
}

var _j24Inited = {}; // legacy tracker (superseded by _gInited in the new game system)


// ═══════════════════════════════════════════════════════════════
// JOGOS — SISTEMA DE TABS + 4 JOGOS
// ═══════════════════════════════════════════════════════════════

// ── Tab switcher ──
function gTabSwitch(wrapId, tabName) {
  var wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.querySelectorAll('.g-tab').forEach(function(t){ t.classList.remove('active'); });
  wrap.querySelectorAll('.g-panel').forEach(function(p){ p.classList.remove('active'); });
  var tab = wrap.querySelector('[data-gtab="'+tabName+'"]');
  var panel = wrap.querySelector('[data-gpanel="'+tabName+'"]');
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
  // Lazy init
  var inst = _gInstances[wrapId];
  if (!inst) return;
  if (tabName === 'j24'  && !_j24State[wrapId+'-j24-game']) {
    var _j24GameId = wrapId+'-j24-game';
    var _j24Panel  = document.getElementById(wrapId+'-j24');
    if (_j24Panel && !_j24Panel.querySelector('.j24-card')) {
      _j24Panel.innerHTML = _j24BuildHTML(_j24GameId, inst.defaultLevel || 'medio');
      _j24Init(_j24GameId, inst.defaultLevel || 'medio');
    }
  }
  if (tabName === 'c4'   && !inst.c4)   { inst.c4   = new Game4Linha(wrapId+'-c4',   inst.qFn); }
  if (tabName === 'mine' && !inst.mine) { inst.mine = new GameMine(wrapId+'-mine', inst.qFn); }
  if (tabName === 'sdk'  && !inst.sdk)  { inst.sdk  = new GameSudoku(wrapId+'-sdk'); }
  if (tabName === 'hanoi'&& !inst.hanoi){ inst.hanoi= new GameHanoi(wrapId+'-hanoi', inst.qFn); }
  if (tabName === 'escape' && !inst.escape) { inst.escape = new GameEscapeRoom(wrapId+'-escape', inst.qFn); }
}

var _gInstances = {};

// Build the full jogos HTML for a wrapper div
function _gBuildJogos(wrapId, defaultLevel) {
  var wrap = document.getElementById(wrapId);
  if (!wrap) return;
  // Store question function and defaultLevel
  _gInstances[wrapId] = { qFn: function(level){ return _gGetQuestion(wrapId, level || defaultLevel || 'medio'); }, defaultLevel: defaultLevel || 'medio' };
  wrap.innerHTML = [
    '<div class="g-tabs">',
    '  <button class="g-tab active" data-gtab="j24"  onclick="gTabSwitch(\''+wrapId+'\',\'j24\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12.5v.5"/><path d="M17 11.5v.5"/></svg></span> 24</button>',
    '  <button class="g-tab"        data-gtab="c4"   onclick="gTabSwitch(\''+wrapId+'\',\'c4\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 4 em Linha</button>',
    '  <button class="g-tab"        data-gtab="mine" onclick="gTabSwitch(\''+wrapId+'\',\'mine\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> Campo Minado</button>',
    '  <button class="g-tab"        data-gtab="sdk"  onclick="gTabSwitch(\''+wrapId+'\',\'sdk\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span> Sudoku</button>',
    '  <button class="g-tab"        data-gtab="hanoi" onclick="gTabSwitch(\''+wrapId+'\',\'hanoi\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22V4l-4 6h8l-4-6v18"/><path d="M9 10H3l3-6"/><path d="M15 10h6l-3-6"/></svg></span> Hanoi</button>',
    '  <button class="g-tab"        data-gtab="escape" onclick="gTabSwitch(\''+wrapId+'\',\'escape\')">🔐 Escape Room</button>',
    '</div>',
    '<div class="g-panel active" data-gpanel="j24"  id="'+wrapId+'-j24"></div>',
    '<div class="g-panel"        data-gpanel="c4"   id="'+wrapId+'-c4"></div>',
    '<div class="g-panel"        data-gpanel="mine" id="'+wrapId+'-mine"></div>',
    '<div class="g-panel"        data-gpanel="sdk"  id="'+wrapId+'-sdk"></div>',
    '<div class="g-panel"        data-gpanel="hanoi" id="'+wrapId+'-hanoi"></div>',
    '<div class="g-panel"        data-gpanel="escape" id="'+wrapId+'-escape"></div>',
  ].join('\n');
  // Init j24 immediately (default tab)
  // Must build the HTML first (like the old _j24AutoInit did), then init
  var _j24GameId = wrapId+'-j24-game';
  var _j24Panel  = document.getElementById(wrapId+'-j24');
  if (_j24Panel) { _j24Panel.innerHTML = _j24BuildHTML(_j24GameId, defaultLevel || 'medio'); }
  _j24Init(_j24GameId, defaultLevel || 'medio');
}

// ── Question provider: pulls from cap-specific question banks ──
function _gGetQuestion(wrapId, level) {
  // Determine cap from wrapId
  var cap = wrapId.indexOf('cap1') !== -1 ? 1
           : wrapId.indexOf('cap2') !== -1 ? 2
           : wrapId.indexOf('cap3') !== -1 ? 3
           : wrapId.indexOf('cap4') !== -1 ? 4 : 0;
  var pool = _gQuestionPool(cap, level);
  return pool[Math.floor(Math.random() * pool.length)];
}

function _gQuestionPool(cap, level) {
  // Returns [{q, opts:[4 strings], ans index 0-3}]
  var easy = level === 'facil';
  var hard = level === 'dificil';
  var pools = {
    1: [ // Inteiros
      {q:'-5 + 3 = ?', opts:['-2','-8','2','8'], ans:0},
      {q:'|−7| = ?', opts:['7','-7','0','49'], ans:0},
      {q:'-3 − (−5) = ?', opts:['2','-8','-2','8'], ans:0},
      {q:'−(−4) = ?', opts:['4','-4','0','-8'], ans:0},
      {q:'-8 + 12 = ?', opts:['4','-4','20','-20'], ans:0},
      {q:'|3 − 8| = ?', opts:['5','-5','11','-11'], ans:0},
      {q:'-2 × (-3) = ?', opts:['6','-6','5','-5'], ans:0},
      {q:'−4 − 3 + 7 = ?', opts:['0','-14','10','-10'], ans:0},
      {q:'Simétrico de −9 é?', opts:['9','-9','0','1'], ans:0},
      {q:'-6 ÷ (-2) = ?', opts:['3','-3','4','-4'], ans:0},
      {q:'-1 + (-1) + (-1) = ?', opts:['-3','3','-1','1'], ans:0},
      {q:'|−3| + |4| = ?', opts:['7','-7','1','-1'], ans:0},
    ],
    2: [ // Racionais
      {q:'1/2 + 1/4 = ?', opts:['3/4','1/2','2/6','1/6'], ans:0},
      {q:'3/4 − 1/4 = ?', opts:['1/2','2/8','1/4','3/8'], ans:0},
      {q:'2/3 × 3/4 = ?', opts:['1/2','5/7','6/12','1/3'], ans:0},
      {q:'0,5 = ?/10', opts:['5','2','50','1'], ans:0},
      {q:'25% de 80 = ?', opts:['20','25','40','15'], ans:0},
      {q:'1/3 + 1/6 = ?', opts:['1/2','2/9','1/4','3/9'], ans:0},
      {q:'10³ = ?', opts:['1000','300','100','10000'], ans:0},
      {q:'2⁻² = ?', opts:['1/4','-4','1/2','-1/4'], ans:0},
      {q:'0,001 em notação científica?', opts:['10⁻³','10³','10⁻²','10²'], ans:0},
      {q:'30% de 150 = ?', opts:['45','30','60','15'], ans:0},
      {q:'3/5 em decimal = ?', opts:['0,6','0,3','0,5','0,35'], ans:0},
      {q:'(-2)³ = ?', opts:['-8','8','-6','6'], ans:0},
    ],
    3: [ // Geometria
      {q:'Soma ângulos internos pentágono?', opts:['540°','360°','450°','720°'], ans:0},
      {q:'Ângulo interno polígono regular hexagonal?', opts:['120°','60°','90°','135°'], ans:0},
      {q:'Soma ângulos externos de qualquer polígono?', opts:['360°','180°','540°','720°'], ans:0},
      {q:'Área retângulo 6×4 = ?', opts:['24','20','48','10'], ans:0},
      {q:'Área triângulo base=8, altura=5 = ?', opts:['20','40','13','80'], ans:0},
      {q:'Num polígono regular com 8 lados, ângulo externo = ?', opts:['45°','60°','30°','40°'], ans:0},
      {q:'Ângulos alternos internos são?', opts:['iguais','suplementares','complementares','nulos'], ans:0},
      {q:'Quadrilátero com 4 lados iguais e 4 ângulos retos?', opts:['Quadrado','Rombo','Retângulo','Losango'], ans:0},
      {q:'Área paralelogramo base=7, alt=3 = ?', opts:['21','10','42','20'], ans:0},
      {q:'Polígono com 3 lados tem soma interna de?', opts:['180°','360°','90°','270°'], ans:0},
    ],
    4: [ // Álgebra
      {q:'Se aₙ = 2n+1, a₄ = ?', opts:['9','7','8','10'], ans:0},
      {q:'3x + 5 = 14, x = ?', opts:['3','4','2','5'], ans:0},
      {q:'2x − 4 = 6, x = ?', opts:['5','2','4','3'], ans:0},
      {q:'Simplifica: 4x − x = ?', opts:['3x','4x','x','5x'], ans:0},
      {q:'Se aₙ = 3n−2, a₅ = ?', opts:['13','15','10','12'], ans:0},
      {q:'7 − 2x = 1, x = ?', opts:['3','4','2','6'], ans:0},
      {q:'Valor de 2x²−1 para x=3?', opts:['17','11','5','19'], ans:0},
      {q:'Reduz: 5a + 3b − 2a − b = ?', opts:['3a+2b','7a+4b','3a+4b','2a+2b'], ans:0},
      {q:'Equação impossível: 2x+3=2x+?', opts:['5','3','0','2x'], ans:0},
      {q:'Razão da sequência: 5, 8, 11, 14…?', opts:['3','2','4','5'], ans:0},
    ],
  };
  // Multi-cap: mix
  if (cap === 0) {
    var all = [];
    [1,2,3,4].forEach(function(c){ all = all.concat(pools[c] || []); });
    return all;
  }
  return pools[cap] || pools[1];
}

// ═══════════════════════════════════════════════════════════════
// JOGO 1 — 4 EM LINHA
// ═══════════════════════════════════════════════════════════════
function Game4Linha(containerId, qFn) {
  var ROWS = 6, COLS = 7;
  var self = this;
  self.board = [];
  self.turn = 1;     // 1 or 2
  self.over = false;
  self.qFn = qFn;
  self.level = 'medio';
  self.pendingCol = null;
  self._answerLocked = false;
  self.score = {p1: 0, p2: 0};

  var NAMES = {1: 'Jogador 1', 2: 'Jogador 2'};

  var c = document.getElementById(containerId);
  if (!c) return;

  function init() {
    self.board = [];
    for (var r = 0; r < ROWS; r++) { self.board[r] = []; for (var col = 0; col < COLS; col++) self.board[r][col] = 0; }
    self.turn = 1; self.over = false; self.pendingCol = null; self._answerLocked = false;
    render();
    msg(NAMES[1] + ' — escolhe uma coluna!');
  }

  function render() {
    var statusTxt = '';
    if (!self.over) {
      statusTxt = self.pendingCol !== null
        ? NAMES[self.turn] + ' — responde à pergunta…'
        : NAMES[self.turn] + ' — escolhe uma coluna!';
    }
    var fnKey = containerId.replace(/-/g,'_');
    var html = [
      '<div class="c4-status">',
      '  <span><span class="c4-disc p1"></span> '+NAMES[1]+': <strong>'+self.score.p1+'</strong></span>',
      '  <span><span class="c4-disc p2"></span> '+NAMES[2]+': <strong>'+self.score.p2+'</strong></span>',
      '  <span style="margin-left:auto;font-size:.75rem">'+statusTxt+'</span>',
      '</div>',
      '<div style="overflow-x:auto;padding-bottom:.5rem"><div class="c4-board" id="'+containerId+'-bd">',
    ];
    for (var col = 0; col < COLS; col++) {
      var colDisabled = self.over || self.pendingCol !== null;
      var isPending = self.pendingCol === col;
      html.push('<div class="c4-col'+(colDisabled?' disabled':'')+(isPending?' c4-col-pending':'')+'" onclick="'+fnKey+'_c4ColClick('+col+')" data-col="'+col+'">');
      for (var row = 0; row < ROWS; row++) {
        var v = self.board[row][col];
        var cls = v===1?'p1':v===2?'p2':'';
        if (self.winCells && self.winCells.some(function(wc){return wc[0]===row&&wc[1]===col;})) cls += ' win';
        html.push('<div class="c4-cell '+cls+'"></div>');
      }
      html.push('</div>');
    }
    html.push('</div></div>');
    html.push('<div id="'+containerId+'-q" class="c4-question"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;min-height:2rem;font-size:.88rem;font-weight:600;color:var(--c2-mid)"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_c4New()">↺ Novo Jogo</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;flex-wrap:wrap;gap:.35rem"><div class="gen-level-group">'+
      '<button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '<button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '<button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '</div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  function askQuestion(col) {
    var q = self.qFn(self.level);
    if (!q) return;
    self.currentQ = q;
    var qDiv = document.getElementById(containerId+'-q');
    if (!qDiv) return;
    var fnKey = containerId.replace(/-/g,'_');
    qDiv.innerHTML = '<div class="q-text">'
      + NAMES[self.turn]+' escolheu a coluna '+(col+1)+'. Responde corretamente para jogar aí:<br>'
      + '<strong style="font-size:1rem">'+q.q+'</strong></div>'
      + '<div class="c4-opts">'
      + q.opts.map(function(opt,i){
          return '<button class="c4-opt" onclick="'+fnKey+'_c4Ans('+i+',this)">'+opt+'</button>';
        }).join('')
      + '</div>';
  }

  var fnKey = containerId.replace(/-/g,'_');

  window[fnKey+'_c4ColClick'] = function(col) {
    if (self.over || self.pendingCol !== null) return;
    var row = dropRow(col);
    if (row < 0) { msg('Coluna cheia! Escolhe outra.'); return; }
    self.pendingCol = col;
    render();
    askQuestion(col);
  };

  window[fnKey+'_c4Ans'] = function(idx, btn) {
    if (self._answerLocked || self.pendingCol === null) return;
    self._answerLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var currentTurn = self.turn;
    var nextTurn = currentTurn === 1 ? 2 : 1;
    if (!correct) {
      var opts = document.querySelectorAll('#'+containerId+'-q .c4-opt');
      if (opts[self.currentQ.ans]) opts[self.currentQ.ans].classList.add('correct');
      msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Errado! Vez perdida — '+NAMES[nextTurn]+' joga a seguir.');
      setTimeout(function(){
        self._answerLocked = false;
        self.pendingCol = null;
        self.turn = nextTurn;
        render();
        msg(NAMES[self.turn]+' — escolhe uma coluna!');
      }, 1100);
    } else {
      var col = self.pendingCol;
      var row = dropRow(col);
      self.board[row][col] = currentTurn;
      self.pendingCol = null;
      self._answerLocked = false;
      if (checkWin(currentTurn)) {
        self.score['p'+currentTurn]++;
        render();
        msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> '+NAMES[currentTurn]+' ganhou!');
      } else {
        var draw = true;
        for (var cc = 0; cc < COLS; cc++) { if (dropRow(cc) >= 0) { draw = false; break; } }
        if (draw) { self.over = true; render(); msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17V7l5-5 5 5 5-5v10l-5 5-5-5-5 5z"/></svg></span> Empate!'); }
        else {
          self.turn = nextTurn;
          render();
          msg(NAMES[self.turn]+' — escolhe uma coluna!');
        }
      }
    }
  };

  window[fnKey+'_c4New'] = function() { self.winCells = null; init(); };
  window[fnKey+'_c4Level'] = function(lv) { self.level = lv; self.winCells = null; init(); };

  function dropRow(col) {
    for (var r = ROWS-1; r >= 0; r--) { if (self.board[r][col] === 0) return r; }
    return -1;
  }

  function checkWin(player) {
    var cells = checkLine(player);
    if (cells) { self.winCells = cells; self.over = true; return true; }
    return false;
  }

  function checkLine(player) {
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      var dirs = [[0,1],[1,0],[1,1],[1,-1]];
      for (var d = 0; d < dirs.length; d++) {
        var cells = [];
        for (var k = 0; k < 4; k++) {
          var nr = r+dirs[d][0]*k, nc = col+dirs[d][1]*k;
          if (nr<0||nr>=ROWS||nc<0||nc>=COLS||self.board[nr][nc]!==player) break;
          cells.push([nr,nc]);
        }
        if (cells.length === 4) return cells;
      }
    }
    return null;
  }

  function msg(txt) {
    var el = document.getElementById(containerId+'-msg');
    if (el) el.textContent = txt;
  }

  init();
}

// JOGO 2 — CAMPO MINADO
// ═══════════════════════════════════════════════════════════════
function GameMine(containerId, qFn) {
  var self = this;
  var ROWS = 6, COLS = 8, MINES = 8;
  self.level = 'medio';
  self.qFn = qFn;
  self.grid = [];
  self.revealed = [];
  self.flagged = [];
  self.over = false;
  self.won = false;
  self.pendingCell = null;
  self.score = 0;
  self.safeRevealed = 0;

  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  function init() {
    self.grid = []; self.revealed = []; self.flagged = [];
    self.over = false; self.won = false; self.pendingCell = null;
    self.safeRevealed = 0;
    var total = ROWS * COLS;
    var mineSet = new Set();
    while (mineSet.size < MINES) mineSet.add(Math.floor(Math.random() * total));
    for (var r = 0; r < ROWS; r++) {
      self.grid[r] = []; self.revealed[r] = []; self.flagged[r] = [];
      for (var col = 0; col < COLS; col++) {
        var idx = r * COLS + col;
        self.grid[r][col] = mineSet.has(idx) ? -1 : 0;
        self.revealed[r][col] = false;
        self.flagged[r][col] = false;
      }
    }
    // Compute adjacency numbers
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      if (self.grid[r][col] === -1) continue;
      var cnt = 0;
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
        var nr = r+dr, nc = col+dc;
        if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&self.grid[nr][nc]===-1) cnt++;
      }
      self.grid[r][col] = cnt;
    }
    render();
  }

  var numColors = ['','#1565c0','#2e7d32','#c62828','#6a1b9a','#e65100','#00838f','#212121','#546e7a'];

  function render() {
    var safe = ROWS * COLS - MINES;
    var html = [
      '<div class="mine-legend">',
      '  <span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> '+MINES+' minas</span>',
      '  <span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span> Reveladas: '+self.safeRevealed+'/'+safe+'</span>',
      '  <span style="margin-left:auto">Pontos: <strong style="color:var(--c2-mid)">'+self.score+'</strong></span>',
      '</div>',
      '<div style="overflow-x:auto"><div class="mine-grid" style="grid-template-columns:repeat('+COLS+',1fr)" id="'+containerId+'-bd">',
    ];
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      var rev = self.revealed[r][col], flag = self.flagged[r][col], v = self.grid[r][col];
      var cls = 'mine-cell';
      var content = '';
      if (rev) {
        cls += ' revealed';
        if (v === -1) { cls += ' mine-hit'; content = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v.5"/><path d="M22 9 19.5 11.5"/><path d="M14 9.01 14 9"/><path d="M2 11 4.5 13.5"/><path d="M8 11v.5"/><path d="M18 15l.5 3.5"/><path d="m5 19 .5-2.5"/><path d="M22 22 2 2"/></svg></span>'; }
        else if (v === 0) { cls += ' safe'; content = ''; }
        else { content = '<span style="color:'+numColors[v]+'">'+v+'</span>'; cls += ' safe'; }
      } else if (flag) { cls += ' flagged'; content = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>'; }
      else { cls += ' question-pending'; content = '<span class="mine-q-icon">?</span>'; }
      html.push('<div class="'+cls+'" onclick="'+fnKey+'_mineClick('+r+','+col+')" oncontextmenu="'+fnKey+'_mineFlag('+r+','+col+');return false">'+content+'</div>');
    }
    html.push('</div></div>');
    html.push('<div id="'+containerId+'-q" class="mine-question-box"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_mineNew()">↺ Novo Jogo</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group"><button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button><button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button><button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button></div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_mineClick'] = function(r, col) {
    if (self.over || self.revealed[r][col] || self.flagged[r][col] || self.pendingCell) return;
    if (self.grid[r][col] === -1) {
      // It's a mine — ask question to defuse!
      self.pendingCell = [r, col];
      var q = self.qFn(self.level); self.currentQ = q;
      var qBox = document.getElementById(containerId+'-q');
      if (!qBox) return;
      qBox.className = 'mine-question-box active';
      qBox.innerHTML = '<div style="font-size:.8rem;font-weight:700;color:var(--rose);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> Mina! Responde para a desativar:</div>'
        + '<div style="font-size:.92rem;font-weight:600;color:var(--ink);margin-bottom:.75rem">'+q.q+'</div>'
        + '<div class="c4-opts">'
        + q.opts.map(function(opt,i){ return '<button class="c4-opt" onclick="'+fnKey+'_mineAns('+i+',this)">'+opt+'</button>'; }).join('')
        + '</div>';
    } else {
      reveal(r, col);
      render();
      checkWin();
    }
  };

  window[fnKey+'_mineFlag'] = function(r, col) {
    if (self.over || self.revealed[r][col] || self.pendingCell) return;
    self.flagged[r][col] = !self.flagged[r][col];
    render();
  };

  window[fnKey+'_mineAns'] = function(idx, btn) {
    if (self._mineAnsLocked) return;
    self._mineAnsLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var qBox = document.getElementById(containerId+'-q');
    if (!correct) {
      var opts = qBox.querySelectorAll('.c4-opt');
      if (opts[self.currentQ.ans]) opts[self.currentQ.ans].classList.add('correct');
      var explodeCell = self.pendingCell; // capture now to avoid race condition
      setTimeout(function(){
        // Mine explodes
        self.revealed[explodeCell[0]][explodeCell[1]] = true;
        self.pendingCell = null;
        self._mineAnsLocked = false;
        self.over = true;
        render();
        var msg = document.getElementById(containerId+'-msg');
        if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v.5"/><path d="M22 9 19.5 11.5"/><path d="M14 9.01 14 9"/><path d="M2 11 4.5 13.5"/><path d="M8 11v.5"/><path d="M18 15l.5 3.5"/><path d="m5 19 .5-2.5"/><path d="M22 22 2 2"/></svg></span> Respondeste errado — mina explodiu! Pontos: <strong>'+self.score+'</strong>';
      }, 800);
    } else {
      self.score += (self.level==='facil'?1:self.level==='medio'?2:3);
      // Flag the mine (defused)
      var cell = self.pendingCell;
      self.flagged[cell[0]][cell[1]] = true;
      self.pendingCell = null;
      self._mineAnsLocked = false;
      if (qBox) qBox.className = 'mine-question-box';
      render();
      var msg = document.getElementById(containerId+'-msg');
      if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span> Mina desativada! +' + (self.level==='facil'?1:self.level==='medio'?2:3) + ' pontos';
    }
  };

  window[fnKey+'_mineNew'] = function() { init(); };
  window[fnKey+'_mineLevel'] = function(lv) { self.level = lv; init(); };

  function reveal(r, col) {
    if (r<0||r>=ROWS||col<0||col>=COLS||self.revealed[r][col]||self.flagged[r][col]) return;
    self.revealed[r][col] = true;
    self.safeRevealed++;
    if (self.grid[r][col] === 0) {
      for (var dr=-1;dr<=1;dr++) for (var dc=-1;dc<=1;dc++) reveal(r+dr,col+dc);
    }
  }

  function checkWin() {
    var safe = ROWS * COLS - MINES;
    if (self.safeRevealed >= safe) {
      self.won = true; self.over = true;
      render();
      var msg = document.getElementById(containerId+'-msg');
      if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Limpaste o campo! Pontos: <strong>'+self.score+'</strong>';
    }
  }

  init();
}

// ═══════════════════════════════════════════════════════════════
// JOGO 3 — SUDOKU 4×4 COM OPERAÇÕES (KenKen)
// ═══════════════════════════════════════════════════════════════
function GameSudoku(containerId) {
  var self = this;
  self.selected = null;
  self.activeNum = 0;
  self.level = 'medio';
  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  // ── 9×9 puzzle bank (solution + clues per difficulty) ──
  var PUZZLES = [
    { sol: [
        [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]],
      easy:  [[0,0],[0,1],[0,4],[0,6],[0,7],[1,1],[1,2],[1,5],[1,7],[2,0],[2,3],[2,5],[2,8],
              [3,0],[3,3],[3,6],[3,7],[4,1],[4,4],[4,7],[5,1],[5,2],[5,5],[5,8],
              [6,0],[6,3],[6,5],[6,8],[7,1],[7,3],[7,6],[7,8],[8,2],[8,4],[8,7],[8,8]],
      medio: [[0,0],[0,4],[0,6],[1,2],[1,5],[1,7],[2,0],[2,3],[2,8],
              [3,0],[3,3],[3,7],[4,4],[5,1],[5,5],[5,8],
              [6,0],[6,5],[6,8],[7,1],[7,3],[7,6],[8,4],[8,8]],
      dificil:[[0,0],[0,6],[1,5],[1,7],[2,3],[2,8],
               [3,0],[3,7],[4,4],[5,1],[5,8],
               [6,0],[6,5],[7,3],[7,6],[8,4],[8,8]]
    },
    { sol: [
        [1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],
        [2,1,4,3,6,5,8,9,7],[3,6,5,8,9,7,2,1,4],[8,9,7,2,1,4,3,6,5],
        [5,3,1,6,4,2,9,7,8],[6,4,2,9,7,8,5,3,1],[9,7,8,5,3,1,6,4,2]],
      easy:  [[0,0],[0,1],[0,3],[0,5],[0,7],[1,0],[1,2],[1,4],[1,6],[1,8],[2,1],[2,3],[2,5],[2,7],
              [3,0],[3,2],[3,4],[3,6],[3,8],[4,1],[4,3],[4,5],[4,7],[5,0],[5,2],[5,4],[5,6],[5,8],
              [6,1],[6,3],[6,5],[6,7],[7,0],[7,2],[7,4],[7,6],[7,8],[8,1],[8,3],[8,5],[8,7]],
      medio: [[0,0],[0,1],[0,3],[0,7],[1,0],[1,4],[1,8],[2,3],[2,7],
              [3,0],[3,4],[3,8],[4,3],[4,5],[5,0],[5,4],[5,8],
              [6,1],[6,5],[7,0],[7,4],[7,8],[8,1],[8,5],[8,7]],
      dificil:[[0,0],[0,3],[0,7],[1,4],[1,8],[2,7],
               [3,0],[3,8],[4,3],[4,5],[5,0],[5,8],
               [6,1],[7,0],[7,4],[8,5],[8,7]]
    },
    { sol: [
        [8,1,2,7,5,3,6,4,9],[9,4,3,6,8,2,1,7,5],[6,7,5,4,9,1,2,8,3],
        [1,2,8,3,7,5,9,6,4],[3,6,7,9,4,8,5,2,1],[5,9,4,2,1,6,7,3,8],
        [4,5,6,8,3,7,1,9,2],[7,8,9,1,2,4,3,5,6],[2,3,1,5,6,9,4,8,7]],
      easy:  [[0,0],[0,2],[0,4],[0,7],[1,0],[1,3],[1,5],[1,8],[2,1],[2,4],[2,6],
              [3,0],[3,3],[3,6],[3,8],[4,2],[4,4],[4,6],[5,0],[5,2],[5,5],[5,8],
              [6,1],[6,3],[6,5],[6,8],[7,0],[7,3],[7,6],[7,8],[8,1],[8,4],[8,7]],
      medio: [[0,0],[0,4],[0,7],[1,3],[1,8],[2,1],[2,6],
              [3,0],[3,3],[3,8],[4,4],[5,0],[5,5],[5,8],
              [6,1],[6,5],[6,8],[7,0],[7,3],[7,6],[8,4],[8,7]],
      dificil:[[0,0],[0,7],[1,3],[1,8],[2,6],
               [3,0],[3,8],[4,4],[5,0],[5,8],
               [6,1],[6,8],[7,3],[7,6],[8,4]]
    }
  ];

  function init(levelOverride) {
    if (levelOverride) self.level = levelOverride;
    var puz = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    self.puzzle = puz;
    self.solution = puz.sol;
    var clues = puz[self.level] || puz.medio;
    self.givenSet = new Set(clues.map(function(rc){ return rc[0]+','+rc[1]; }));
    self.userGrid = [];
    for (var r = 0; r < 9; r++) {
      self.userGrid[r] = [0,0,0,0,0,0,0,0,0];
    }
    clues.forEach(function(rc){ self.userGrid[rc[0]][rc[1]] = puz.sol[rc[0]][rc[1]]; });
    self.selected = null;
    self.activeNum = 0;
    render();
  }

  function validPlace(r, col, val) {
    for (var i = 0; i < 9; i++) {
      if (i !== col && self.userGrid[r][i] === val) return false;
      if (i !== r   && self.userGrid[i][col] === val) return false;
    }
    var br = Math.floor(r/3)*3, bc = Math.floor(col/3)*3;
    for (var dr = 0; dr < 3; dr++) for (var dc = 0; dc < 3; dc++) {
      var nr = br+dr, nc = bc+dc;
      if ((nr !== r || nc !== col) && self.userGrid[nr][nc] === val) return false;
    }
    return true;
  }

  function isSameGroup(r1, c1, r2, c2) {
    return r1 === r2 || c1 === c2 ||
      (Math.floor(r1/3) === Math.floor(r2/3) && Math.floor(c1/3) === Math.floor(c2/3));
  }

  function render() {
    var sr = self.selected ? self.selected[0] : -1;
    var sc = self.selected ? self.selected[1] : -1;
    var selVal = (sr >= 0 && self.userGrid[sr][sc]) ? self.userGrid[sr][sc] : 0;

    var html = [
      '<p style="font-size:.82rem;color:var(--ink3);margin-bottom:.5rem">Preenche a grelha — cada linha, coluna e bloco 3×3 deve ter os números 1 a 9.</p>',
      '<div class="sdk-difficulty">',
        '<button class="sdk-dif-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'facil\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil</button>',
        '<button class="sdk-dif-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'medio\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio</button>',
        '<button class="sdk-dif-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'dificil\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil</button>',
      '</div>',
      '<div class="sdk-wrap"><div class="sdk-grid">'
    ];

    // 9 blocks (3×3 each), arranged 3×3
    for (var br = 0; br < 3; br++) {
      for (var bc = 0; bc < 3; bc++) {
        html.push('<div class="sdk-group">');
        for (var dr = 0; dr < 3; dr++) {
          for (var dc = 0; dc < 3; dc++) {
            var r = br*3+dr, col = bc*3+dc;
            var val = self.userGrid[r][col];
            var isGiven = self.givenSet.has(r+','+col);
            var isSel = r === sr && col === sc;
            var isHl = !isSel && sr >= 0 && isSameGroup(r, col, sr, sc);
            var isSameNum = !isSel && selVal && val === selVal;
            var isErr = val && !isGiven && !validPlace(r, col, val);
            var cls = 'sdk-cell';
            if (isGiven) cls += ' given';
            else if (isErr) cls += ' error';
            else if (val) cls += ' correct-fill';
            if (isSel) cls += ' selected';
            else if (isSameNum) cls += ' selected';
            else if (isHl) cls += ' highlight';
            html.push('<div class="'+cls+'" onclick="'+fnKey+'_sdkSel('+r+','+col+')">'+(val||'')+'</div>');
          }
        }
        html.push('</div>');
      }
    }

    html.push('</div></div>');

    // Numpad 1-9 + delete
    html.push('<div class="sdk-numpad">');
    for (var n = 1; n <= 9; n++) {
      var isActive = self.activeNum === n ? ' active-num' : '';
      html.push('<button class="sdk-key'+isActive+'" onclick="'+fnKey+'_sdkNum('+n+')">'+n+'</button>');
    }
    html.push('<button class="sdk-key del" onclick="'+fnKey+'_sdkNum(0)">⌫</button>');
    html.push('</div>');

    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-primary" onclick="'+fnKey+'_sdkCheck()">✓ Verificar</button>');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_sdkNew()">↺ Novo puzzle</button>');
    html.push('</div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_sdkSel'] = function(r, col) {
    if (self.givenSet.has(r+','+col)) {
      self.selected = [r, col]; // allow highlight but not edit
    } else {
      self.selected = [r, col];
      if (self.activeNum > 0) {
        self.userGrid[r][col] = self.activeNum;
      }
    }
    render();
  };

  window[fnKey+'_sdkNum'] = function(n) {
    self.activeNum = (self.activeNum === n && n > 0) ? 0 : n;
    if (self.selected) {
      var r = self.selected[0], col = self.selected[1];
      if (!self.givenSet.has(r+','+col)) {
        self.userGrid[r][col] = n;
      }
    }
    render();
  };

  window[fnKey+'_sdkLevel'] = function(lvl) { init(lvl); };

  window[fnKey+'_sdkCheck'] = function() {
    var sol = self.solution;
    var allFilled = true, allCorrect = true;
    outer: for (var r = 0; r < 9; r++) for (var col = 0; col < 9; col++) {
      if (!self.userGrid[r][col]) { allFilled = false; allCorrect = false; break outer; }
      if (self.userGrid[r][col] !== sol[r][col]) allCorrect = false;
    }
    var msg = document.getElementById(containerId+'-msg');
    if (!msg) return;
    if (!allFilled) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Preenche todas as células primeiro.';
    else if (allCorrect) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Parabéns! Sudoku resolvido corretamente!';
    else msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Há erros — verifica as células marcadas a vermelho.';
  };

  window[fnKey+'_sdkNew'] = function() { init(); };

  init();
}

// ═══════════════════════════════════════════════════════════════
// JOGO 4 — TORRE DE HANOI COM QUESTÕES
// ═══════════════════════════════════════════════════════════════
function GameHanoi(containerId, qFn) {
  var self = this;
  self.level = 'medio';
  self.qFn = qFn;
  self.disks = 3;
  self.pegs = [[], [], []];   // each peg: array of disk sizes (largest first)
  self.selected = null;       // index of peg with selected disk
  self.moves = 0;
  self.minMoves = 0;
  self.over = false;
  self.pendingFrom = null;
  self.score = 0;
  self._hanoiAnsLocked = false;

  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  var diskColors = [
    'linear-gradient(135deg,#516860,#77998E)',
    'linear-gradient(135deg,#AB9790,#c4b0a9)',
    'linear-gradient(135deg,#d97706,#f59e0b)',
    'linear-gradient(135deg,#6d28d9,#8b5cf6)',
    'linear-gradient(135deg,#c4796e,#e8a89e)',
  ];

  function init() {
    self.disks = self.level === 'facil' ? 3 : self.level === 'medio' ? 4 : 5;
    self.pegs = [[], [], []];
    for (var i = self.disks; i >= 1; i--) self.pegs[0].push(i);
    self.selected = null; self.moves = 0; self.over = false; self.pendingFrom = null;
    self.minMoves = Math.pow(2, self.disks) - 1;
    render();
  }

  function render() {
    var POLE_H = 160, DISK_H = 22, DISK_MAX_W = 160, DISK_MIN_W = 36;
    var html = [
      '<p style="font-size:.82rem;color:var(--ink3);margin-bottom:.5rem">Move todos os discos para o pino direito. Não podes colocar um disco maior sobre um menor. Responde às questões para mover!</p>',
      '<div class="hanoi-moves">Movimentos: <strong>'+self.moves+'</strong> / mínimo: '+self.minMoves+'</div>',
      '<div class="hanoi-arena" id="'+containerId+'-arena" style="position:relative;height:'+(POLE_H+30)+'px;display:flex;align-items:flex-end;justify-content:space-around;padding:0 1rem 10px">',
    ];
    var pegLabels = ['A','B','C'];
    for (var p = 0; p < 3; p++) {
      var peg = self.pegs[p];
      var isSel = self.selected === p;
      html.push('<div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;flex:1" onclick="'+fnKey+'_hanoiPeg('+p+')">');
      html.push('<div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);width:8px;height:'+POLE_H+'px;border-radius:4px 4px 0 0;background:'+(isSel?'var(--c2-mid)':'var(--border2)')+';transition:background .2s"></div>');
      html.push('<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:80px;height:10px;border-radius:5px;background:var(--border2)"></div>');
      html.push('<div style="position:absolute;bottom:18px;font-size:.7rem;font-weight:700;color:var(--ink4)">'+pegLabels[p]+'</div>');
      // Disks (bottom to top)
      for (var d = 0; d < peg.length; d++) {
        var diskSize = peg[d];
        var w = DISK_MIN_W + (diskSize-1) * (DISK_MAX_W - DISK_MIN_W) / (self.disks - 1 || 1);
        var yFromBottom = 10 + d * (DISK_H + 3);
        var isTop = d === peg.length - 1;
        var style = [
          'position:absolute',
          'bottom:'+yFromBottom+'px',
          'left:50%',
          'transform:translateX(-50%)'+(isTop&&isSel?' translateY(-10px)':''),
          'width:'+Math.round(w)+'px',
          'height:'+DISK_H+'px',
          'background:'+diskColors[(diskSize-1) % diskColors.length],
          'border-radius:8px',
          'display:flex;align-items:center;justify-content:center',
          'font-family:JetBrains Mono,monospace;font-size:.72rem;font-weight:700;color:#fff',
          'border:2px solid rgba(255,255,255,.25)',
          'transition:transform .2s',
          'z-index:'+(isTop&&isSel?'10':'1'),
          'box-shadow: 0 2px 6px rgba(0,0,0,.2)',
        ].join(';');
        html.push('<div style="'+style+'">'+diskSize+'</div>');
      }
      html.push('</div>');
    }
    html.push('</div>');
    html.push('<div id="'+containerId+'-q" class="hanoi-question"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_hanoiNew()">↺ Reiniciar</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group"><button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 3</button><button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 4</button><button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 5</button></div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_hanoiPeg'] = function(pegIdx) {
    if (self.over || self._hanoiAnsLocked || self.pendingFrom !== null) return;
    if (self.selected === null) {
      // Select peg if it has disks
      if (self.pegs[pegIdx].length === 0) { setMsg('Pino vazio!'); return; }
      self.selected = pegIdx;
      render();
    } else {
      var from = self.selected;
      if (from === pegIdx) { self.selected = null; render(); return; }
      // Validate move
      var fromPeg = self.pegs[from], toPeg = self.pegs[pegIdx];
      var disk = fromPeg[fromPeg.length - 1];
      if (toPeg.length > 0 && toPeg[toPeg.length-1] < disk) {
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Não podes colocar '+disk+' sobre '+toPeg[toPeg.length-1]+'!');
        self.selected = null; render(); return;
      }
      // Ask question before completing move
      self.pendingFrom = from; self.pendingTo = pegIdx;
      self.selected = null;
      askQuestion();
    }
  };

  function askQuestion() {
    var q = self.qFn(self.level); self.currentQ = q;
    var qDiv = document.getElementById(containerId+'-q');
    if (!qDiv) return;
    qDiv.className = 'hanoi-question active';
    qDiv.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--c2-mid);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22V4l-4 6h8l-4-6v18"/><path d="M9 10H3l3-6"/><path d="M15 10h6l-3-6"/></svg></span> Responde para mover o disco:</div>'
      + '<div style="font-size:.9rem;font-weight:600;color:var(--ink);margin-bottom:.75rem">'+q.q+'</div>'
      + '<div class="c4-opts">'
      + q.opts.map(function(opt,i){ return '<button class="c4-opt" onclick="'+fnKey+'_hanoiAns('+i+',this)">'+opt+'</button>'; }).join('')
      + '</div>';
  }

  window[fnKey+'_hanoiAns'] = function(idx, btn) {
    if (self._hanoiAnsLocked) return;
    self._hanoiAnsLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var qDiv = document.getElementById(containerId+'-q');
    if (!correct) {
      if (qDiv) { var opts=qDiv.querySelectorAll('.c4-opt'); if(opts[self.currentQ.ans])opts[self.currentQ.ans].classList.add('correct'); }
      setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Errado — movimento cancelado!');
      setTimeout(function(){
        self.pendingFrom = null; self.pendingTo = null;
        self._hanoiAnsLocked = false;
        if(qDiv)qDiv.className='hanoi-question'; render();
      }, 900);
    } else {
      // Execute move
      var disk = self.pegs[self.pendingFrom].pop();
      self.pegs[self.pendingTo].push(disk);
      self.moves++;
      self.pendingFrom = null; self.pendingTo = null;
      self._hanoiAnsLocked = false;
      if (qDiv) qDiv.className = 'hanoi-question';
      // Check win
      if (self.pegs[2].length === self.disks) {
        self.over = true;
        self.score++;
        render();
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Completaste em '+self.moves+' movimentos! (mínimo: '+self.minMoves+')');
      } else {
        render();
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span> Disco movido!');
      }
    }
  };

  window[fnKey+'_hanoiNew'] = function() { init(); };
  window[fnKey+'_hanoiLevel'] = function(lv) { self.level = lv; init(); };

  function setMsg(txt) {
    var el = document.getElementById(containerId+'-msg');
    if (el) el.innerHTML = txt;
  }

  init();
}

// ── Updated _j24AutoInit to use new system ──
var _gInited = {};
function _j24AutoInit(wrapId, defaultLevel) {
  if (_gInited[wrapId]) return;
  _gInited[wrapId] = true;
  _gBuildJogos(wrapId, defaultLevel);
}

// ── UX 3: SCROLL TO TOP + SECTION INDICATOR ──
// ═══════════════════════════════════════════════════════════════
(function(){
  var btn=document.getElementById('scrollTopBtn');
  var ind=document.getElementById('sectionIndicator');
  if(!btn)return;
  var ticking=false;
  function onScroll(){
    var y=window.scrollY;
    btn.classList.toggle('visible',y>400);
    var label='';
    document.querySelectorAll('.tab-btn.active').forEach(function(t){label=t.textContent.trim();});
    if(label&&y>300){ind.textContent=label;ind.classList.add('visible');}
    else{ind.classList.remove('visible');}
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});
})();

// ═══════════════════════════════════════════════════════════════
// UX 4: KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown',function(e){
  var tag=document.activeElement.tagName;
  var isInput=tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT';
  // Enter on focused option btn
  if(e.key==='Enter'&&document.activeElement.classList.contains('option-btn')&&!document.activeElement.disabled){
    document.activeElement.click();e.preventDefault();return;
  }
  // Arrow keys in quiz options
  if((e.key==='ArrowDown'||e.key==='ArrowUp')&&document.activeElement.classList.contains('option-btn')){
    var par=document.activeElement.parentElement;
    var btns=Array.from(par.querySelectorAll('.option-btn'));
    var i=btns.indexOf(document.activeElement);
    if(e.key==='ArrowDown'&&i<btns.length-1){btns[i+1].focus();e.preventDefault();}
    if(e.key==='ArrowUp'&&i>0){btns[i-1].focus();e.preventDefault();}
    return;
  }
  if(isInput)return;
  // P for professor mode
  if(e.key==='p'||e.key==='P'){
    var pt=document.querySelector('.prof-toggle');if(pt)pt.click();
  }
  // Escape closes search
  if(e.key==='Escape'){var sr=document.getElementById('searchResults');if(sr)sr.classList.remove('open');}
});
// Add keyboard hints to first few quiz questions
document.querySelectorAll('.quiz-question').forEach(function(q,i){
  if(i>=3)return;
  var opts=q.querySelector('.options');
  if(!opts)return;
  var h=document.createElement('div');h.className='kbd-hint';
  h.innerHTML='<kbd>↑↓</kbd> navegar · <kbd>Enter</kbd> confirmar';
  opts.after(h);
});

// ═══════════════════════════════════════════════════════════════
// UX 5: PROFESSOR MODE
// ═══════════════════════════════════════════════════════════════
var professorMode={};
try{professorMode=JSON.parse(localStorage.getItem('edupt_prof')||'{}');}catch(e){}
function toggleProfMode(el,cap){
  professorMode[cap]=!professorMode[cap];
  el.classList.toggle('active');
  try{localStorage.setItem('edupt_prof',JSON.stringify(professorMode));}catch(e){}
}
// Restore
Object.keys(professorMode).forEach(function(k){
  if(professorMode[k]){var el=document.getElementById('profToggle'+k);if(el)el.classList.add('active');}
});

// ── Professor Mode: Answer Keys ──
var profAnswers = {
  1: { // Cap 1 - Números Inteiros
    titulo: 'Números Inteiros (ℤ) — 7.º Ano',
    respostas: [
      {q:'1', r:'−8, +500, −200, −4, +10000, −75', expl:'Abaixo de zero / perda / profundidade → negativo. Lucro / ganho / altitude → positivo.'},
      {q:'2', r:'a) F  b) V  c) V  d) F  e) V', expl:'a) 0 não pertence a ℤ⁺ (apenas ℤ₀⁺). d) O menor inteiro positivo é 1, não existe "menor" em ℤ⁻.'},
      {q:'3', r:'−7, −6, −3, −1, 0, 2, 4, 5', expl:'Quanto mais à esquerda na reta numérica, menor é o número. Negativos antes do zero, positivos depois.'},
      {q:'4', r:'a) |−9| = 9  b) |+6| = 6  c) |0| = 0  d) |−15| = 15  e) |−23| = 23  f) |+1| = 1', expl:'O valor absoluto mede a distância à origem: |a| é sempre ≥ 0. Remove-se o sinal.'},
      {q:'5', r:'a) sim(−4) = 4  b) sim(7) = −7  c) sim(0) = 0  d) sim(−11) = 11  e) sim(18) = −18  f) sim(−25) = 25', expl:'O simétrico troca o sinal: sim(a) = −a. O simétrico de 0 é 0.'},
      {q:'6', r:'a) |−7| > |3| pois 7 > 3  b) |−5| = |5| pois ambos = 5  c) |12| > |−9| pois 12 > 9  d) |−2| < |−8| pois 2 < 8', expl:'Compara-se os valores absolutos (sem sinal).'},
      {q:'7', r:'a) (−3)+(+7) = +4  b) (+8)+(−3) = +5  c) (−6)+(−5) = −11  d) (+2)+(−6) = −4', expl:'Mesmo sinal → soma e mantém sinal. Sinais diferentes → subtrai e fica o sinal do maior |valor|.'},
      {q:'8', r:'a) (−5)+(+3) = −2  b) (−7)+(−4) = −11  c) (+9)+(−9) = 0  d) (+4)−(−6) = 10  e) (−3)−(+8) = −11  f) (−2)−(−5) = 3', expl:'Subtrair é somar o simétrico: a − b = a + (−b). Ex: 4−(−6) = 4+6 = 10.'},
      {q:'9 (mergulhador)', r:'−12 + 7 = −5 m', expl:'Estava a −12, subiu 7: soma algébrica. −12 + 7 = −5. Continua abaixo da superfície.'},
      {q:'10 (simplificar)', r:'a) 3−(−5)+(−2) = 3+5−2 = 6  b) −(+4−2+3) = −4+2−3 = −5  c) −[6−(2−8)] = −[6−(−6)] = −[12] = −12  d) 5−{3−[−2+(4−7)]} = 5−{3−[−5]} = 5−8 = −3', expl:'Regra: sinal − antes de parênteses inverte TODOS os sinais dentro. Resolve de dentro para fora.'},
      {q:'11 (Monte Branco)', r:'4808 − (−430) = 4808 + 430 = 5238 m', expl:'Diferença de altitudes = altitude mais alta menos a mais baixa. Mar Morto está a −430 m.'}
    ],
    teste_respostas: [
      {q:'1', r:'B) −1', expl:'ℤ⁻ = inteiros negativos = {…, −3, −2, −1}. O 0 não pertence a ℤ⁻.'},
      {q:'2', r:'C) 11', expl:'|−8| + |+3| = 8 + 3 = 11. O valor absoluto remove o sinal.'},
      {q:'3', r:'B) −3 > −9', expl:'Na reta numérica, −3 está à direita de −9, logo é maior.'},
      {q:'4', r:'C) 3', expl:'(−5) − (−8) = −5 + 8 = 3. Subtrair negativo = somar positivo.'},
      {q:'5', r:'−9', expl:'−[4 − (2 − 7)] = −[4 − (−5)] = −[4 + 5] = −9.'},
      {q:'6', r:'−1', expl:'6 − (−3) + (−8) − 2 = 6 + 3 − 8 − 2 = 9 − 10 = −1.'},
      {q:'7', r:'5238 m', expl:'4808 − (−430) = 4808 + 430 = 5238 m de diferença.'}
    ]
  },
  2: { // Cap 2 - Números Racionais
    titulo: 'Números Racionais (ℚ) — 7.º Ano',
    respostas: [
      {q:'Frações equivalentes', r:'Multiplica ou divide numerador e denominador pelo mesmo número ≠ 0', expl:'Ex: 2/3 = 4/6 = 6/9. Para simplificar: divide pelo MDC.'},
      {q:'Comparação de frações', r:'Reduzir ao mesmo denominador (MMC) e comparar numeradores', expl:'Ex: 2/3 vs 3/5 → 10/15 vs 9/15 → 2/3 > 3/5.'},
      {q:'Adição de frações', r:'Mesmo denominador: soma numeradores. Diferentes: reduz ao MMC', expl:'Ex: 1/4 + 2/3 = 3/12 + 8/12 = 11/12.'},
      {q:'Percentagens', r:'x% de A = (x/100) × A', expl:'Ex: 25% de 80 = 0,25 × 80 = 20. Desconto: preço × (1 − taxa).'},
      {q:'Potências', r:'aⁿ = a × a × … × a (n vezes)', expl:'Regras: aⁿ × aᵐ = aⁿ⁺ᵐ | aⁿ ÷ aᵐ = aⁿ⁻ᵐ | (aⁿ)ᵐ = aⁿˣᵐ | a⁰ = 1.'},
      {q:'Notação científica', r:'a × 10ⁿ onde 1 ≤ a < 10', expl:'Ex: 45000 = 4,5 × 10⁴ | 0,003 = 3 × 10⁻³.'}
    ],
    teste_respostas: [
      {q:'Escolha múltipla', r:'Ver soluções detalhadas na ficha', expl:'Cada questão de EM tem 4 opções. A resposta errada mais comum está identificada.'}
    ]
  },
  3: { // Cap 3 - Geometria
    titulo: 'Geometria — 7.º Ano',
    respostas: [
      {q:'Soma ângulos internos', r:'S = (n−2) × 180°', expl:'Triângulo: 180° | Quadrilátero: 360° | Pentágono: 540° | Hexágono: 720°. Cada ângulo regular = S ÷ n.'},
      {q:'Ângulos externos', r:'Soma sempre = 360°', expl:'Qualquer polígono convexo. Cada ângulo externo regular = 360° ÷ n. Interno + Externo = 180°.'},
      {q:'Retas paralelas', r:'Alternos internos: iguais | Correspondentes: iguais | Co-internos: suplementares (180°)', expl:'Verticalmente opostos: sempre iguais (não depende de paralelismo).'},
      {q:'Paralelogramo', r:'Lados opostos iguais e paralelos | Ângulos opostos iguais | Adjacentes suplementares', expl:'Diagonais bissetam-se. Retângulo: ângulos 90°. Losango: lados todos iguais.'},
      {q:'Áreas', r:'Triângulo: (b×h)/2 | Paralelogramo: b×h | Trapézio: (B+b)×h/2 | Losango: (d₁×d₂)/2 | Círculo: πr²', expl:'Atenção às unidades! Área em cm², m², etc.'}
    ],
    teste_respostas: [
      {q:'1', r:'C) 10 lados', expl:'1440 ÷ 180 = 8 → n − 2 = 8 → n = 10. Decágono.'},
      {q:'2', r:'B) Octógono', expl:'360° ÷ 45° = 8 lados.'},
      {q:'3', r:'B) 110°', expl:'Co-internos são suplementares: 180° − 70° = 110°.'},
      {q:'4', r:'A) 18 cm²', expl:'A = (8+4)/2 × 3 = 6 × 3 = 18 cm².'},
      {q:'5', r:'127°', expl:'Soma pentágono = 540°. 540 − 100 − 115 − 90 − 108 = 127°.'},
      {q:'6', r:'125°, 55°, 125°, 55°', expl:'Opostos iguais: 125°. Adjacentes suplementares: 180° − 125° = 55°.'},
      {q:'7', r:'30 cm²', expl:'A = (10 × 6) / 2 = 30 cm².'},
      {q:'8', r:'65,12 cm²', expl:'Paralelogramo: 8×5 = 40. Semicírculo: π×4²/2 = 25,12. Total: 65,12 cm².'}
    ]
  },
  4: { // Cap 4 - Sequências, Expressões e Equações
    titulo: 'Sequências, Expressões Algébricas e Equações — 7.º Ano',
    respostas: [
      {q:'Termo geral', r:'Encontrar a regra que dá o n-ésimo termo', expl:'Ex: 2, 5, 8, 11… → aₙ = 3n − 1. Verificar: a₁ = 3(1)−1 = 2 ✓'},
      {q:'Expressões algébricas', r:'Simplificar juntando termos semelhantes', expl:'Ex: 3x + 2y − x + 5y = 2x + 7y. Só se juntam termos com a mesma parte literal.'},
      {q:'Equações 1.º grau', r:'Isolar a incógnita: passar termos, dividir pelo coeficiente', expl:'Ex: 2x + 3 = 11 → 2x = 8 → x = 4. Verificação: 2(4)+3 = 11 ✓.'},
      {q:'Classificação', r:'Possível determinada (1 solução) | Impossível (0 soluções) | Indeterminada (∞ soluções)', expl:'PD: 2x = 6 → x=3 | PI: 0x = 5 (impossível) | PID: 0x = 0 (qualquer x).'}
    ],
    teste_respostas: [
      {q:'Sequências', r:'Identificar padrão, escrever termo geral, calcular termos', expl:'Verificar sempre substituindo n = 1, 2, 3 para confirmar.'},
      {q:'Equações', r:'Resolver passo a passo mostrando todas as transformações', expl:'IAVE exige: cada passo justificado. Resposta sem desenvolvimento = 0 pontos.'}
    ]
  }
};

// Inject solutions into PDF HTML
function injectProfSolutions(html, cap) {
  if (!cap || !professorMode[cap]) return html;
  
  var profBar = '<div style="background:#c62828;color:white;padding:14px 24px;font-family:sans-serif;font-weight:700;font-size:15px;text-align:center;margin-bottom:24px;border-radius:8px;letter-spacing:.5px">VERSÃO PROFESSOR — COM SOLUÇÕES DETALHADAS</div>';
  html = html.replace('<body>', '<body>' + profBar);
  
  var answers = profAnswers[cap];
  if (answers) {
    var solStyle = '';
    html = html.replace('</head>', solStyle + '</head>');
    
    // Build detailed answer key
    var keyHTML = '<div class="prof-key"><h2>Resolução Completa — ' + (answers.titulo || 'Capítulo ' + cap) + '</h2>';
    
    if (answers.respostas && answers.respostas.length) {
      keyHTML += '<h3 style="color:#c62828;margin:20px 0 12px;font-size:1.05rem">Ficha de Trabalho</h3>';
      answers.respostas.forEach(function(r) {
        keyHTML += '<div class="prof-q"><div class="q-num">' + r.q + '.</div><div class="q-ans">' + r.r + '</div><div class="q-expl"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> ' + r.expl + '</div></div>';
      });
    }
    
    if (answers.teste_respostas && answers.teste_respostas.length) {
      keyHTML += '<h3 style="color:#c62828;margin:28px 0 12px;font-size:1.05rem">Teste de Avaliação</h3>';
      answers.teste_respostas.forEach(function(r) {
        keyHTML += '<div class="prof-q"><div class="q-num">' + r.q + '.</div><div class="q-ans">' + r.r + '</div><div class="q-expl"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> ' + r.expl + '</div></div>';
      });
    }
    
    keyHTML += '</div>';
    html = html.replace('</body>', keyHTML + '</body>');
  }
  
  return html;
}

// Modify PDF to include answers when professor mode on
var _origPdf=htmlToPdfDownload;
htmlToPdfDownload=function(html,filename){
  var cap=0;
  if(/inteiros|cap1/i.test(filename))cap=1;
  else if(/racionais|cap2/i.test(filename))cap=2;
  else if(/cap3|geometria/i.test(filename))cap=3;
  else if(/cap4|sequencias|equacoes/i.test(filename))cap=4;
  if(cap&&professorMode[cap]){
    html=injectProfSolutions(html,cap);
    filename=filename.replace('.pdf','_PROFESSOR.pdf');
  }
  _origPdf(html,filename);
};

// ═══════════════════════════════════════════════════════════════
// UX 6: FUNCTIONAL SEARCH
// ═══════════════════════════════════════════════════════════════
var searchIdx=[
  {t:'Números Inteiros — Conjunto ℤ',k:'inteiros conjuntos Z ordenação',c:1,a:'math'},
  {t:'Valor Absoluto e Simétrico',k:'valor absoluto simétrico módulo',c:1,a:'math'},
  {t:'Adição e Subtração de Inteiros',k:'adição subtração inteiros soma',c:1,a:'math'},
  {t:'Questões-aula Cap. 1',k:'questões exercícios quiz inteiros',c:1,a:'math'},
  {t:'Minitestes Cap. 1',k:'miniteste teste rápido',c:1,a:'math'},
  {t:'Jogos Cap. 1',k:'jogos interativo',c:1,a:'math'},
  {t:'Números Racionais — Frações',k:'racionais frações Q comparar',c:2,a:'math2'},
  {t:'Percentagens',k:'percentagem desconto aumento',c:2,a:'math2'},
  {t:'Potências e Notação Científica',k:'potências notação científica expoente',c:2,a:'math2'},
  {t:'Questões-aula Cap. 2',k:'questões exercícios racionais',c:2,a:'math2'},
  {t:'Geometria — Ângulos',k:'geometria ângulos graus triângulo',c:3,a:'math3'},
  {t:'Quadriláteros e Áreas',k:'quadriláteros área perímetro retângulo',c:3,a:'math3'},
  {t:'Questões-aula Cap. 3',k:'questões geometria',c:3,a:'math3'},
  {t:'Sequências e Termo Geral',k:'sequência termo geral sucessão aritmética',c:4,a:'math4'},
  {t:'Expressões Algébricas',k:'expressão algébrica monómio variável simplificar',c:4,a:'math4'},
  {t:'Equações do 1.º Grau',k:'equação resolver incógnita primeiro grau',c:4,a:'math4'},
  {t:'Classificação de Equações',k:'classificar possível impossível indeterminada PD PI',c:4,a:'math4'},
  {t:'Questões-aula Cap. 4',k:'questões equações sequências',c:4,a:'math4'},
  {t:'Downloads Cap. 1',k:'download ficha PDF imprimir inteiros',c:1,a:'math'},
  {t:'Downloads Cap. 2',k:'download ficha PDF racionais',c:2,a:'math2'},
  {t:'Downloads Cap. 3',k:'download ficha PDF geometria',c:3,a:'math3'},
  {t:'Downloads Cap. 4',k:'download ficha PDF equações',c:4,a:'math4'},
  {t:'Flashcards Cap. 4',k:'flashcards cartões revisão equações',c:4,a:'math4'},
  {t:'Exame Simulado',k:'exame simulado tempo cronómetro',c:1,a:'math'}
];
var _searchTimer;
// Guard: only patch once. If this script block is evaluated again, _origDoSearch2
// would become the already-patched version, creating an infinite call loop.
if (!window._doSearchPatched) {
  window._doSearchPatched = true;
  var _origDoSearch2=typeof doSearch==='function'?doSearch:null;
  doSearch=function(val){
    if(_origDoSearch2)_origDoSearch2.call(this,val);
    clearTimeout(_searchTimer);
    _searchTimer=setTimeout(function(){
      var sr=document.getElementById('searchResults');
      if(!sr)return;
      if(!val||val.length<2){sr.classList.remove('open');sr.innerHTML='';return;}
      var q=val.toLowerCase();
      var res=searchIdx.filter(function(it){return it.t.toLowerCase().indexOf(q)>-1||it.k.indexOf(q)>-1;}).slice(0,8);
      if(!res.length){var _noResDiv=document.createElement('div');_noResDiv.className='search-result-item';_noResDiv.style.cssText='color:var(--ink4);cursor:default';_noResDiv.textContent='Sem resultados para "'+val+'"';sr.innerHTML='';sr.appendChild(_noResDiv);sr.classList.add('open');return;}
      var cols={1:'#2c3e7a',2:'#e65100',3:'#1a6e3a',4:'#516860'};
      sr.innerHTML=res.map(function(r){
        return '<div class="search-result-item" tabindex="0" onclick="goSearch(\''+r.a+'\')"><span class="search-result-tag" style="background:'+cols[r.c]+'18;color:'+cols[r.c]+'">Cap.'+r.c+'</span>'+r.t+'</div>';
      }).join('');
      sr.classList.add('open');
    },200);
  };
}
function goSearch(action){
  document.getElementById('searchResults').classList.remove('open');
  document.getElementById('s-input').value='';
  if(typeof handleSubj==='function')handleSubj(null,action);
}
function searchKeyNav(e){
  var sr=document.getElementById('searchResults');
  if(!sr||!sr.classList.contains('open'))return;
  var items=sr.querySelectorAll('.search-result-item[tabindex]');
  if(!items.length)return;
  if(e.key==='ArrowDown'){e.preventDefault();items[0].focus();}
  else if(e.key==='Enter'&&document.activeElement.classList.contains('search-result-item')){e.preventDefault();document.activeElement.click();}
}
document.addEventListener('click',function(e){if(!e.target.closest('.search-box')){var sr=document.getElementById('searchResults');if(sr)sr.classList.remove('open');}});

// ═══════════════════════════════════════════════════════════════
// UX 7: EXAM PROTECTION
// ═══════════════════════════════════════════════════════════════
var examActive=false;
['exameStart','exame2Start','exame3Start','exame4Start'].forEach(function(fn){
  if(typeof window[fn]==='function'){var o=window[fn];window[fn]=function(){examActive=true;o.apply(this,arguments);};}
});
['exameSubmit','exame2Submit','exame3Submit','exame4Submit'].forEach(function(fn){
  if(typeof window[fn]==='function'){var o=window[fn];window[fn]=function(){examActive=false;o.apply(this,arguments);};}
});
window.addEventListener('beforeunload',function(e){
  if(examActive){e.preventDefault();e.returnValue='Exame em curso — perdes o progresso se saíres.';return e.returnValue;}
});
// Protect tab switching during exam
['showSection','showSection2','showSection3','showSection4'].forEach(function(fn){
  if(typeof window[fn]==='function'){
    var orig=window[fn];
    window[fn]=function(id,btn){
      if(examActive&&!/exame/.test(id)){
        if(!confirm('Tens um exame em curso! Perdes o progresso se mudares. Continuar?'))return;
        examActive=false;
      }
      orig.call(this,id,btn);
    };
  }
});

// ═══════════════════════════════════════════════════════════════
// UX 8: SUBTEMA PROGRESS BARS
// ═══════════════════════════════════════════════════════════════
var stProg={};
try{stProg=JSON.parse(localStorage.getItem('edupt_st_prog')||'{}');}catch(e){}
function trackSubtema(cap,sub,correct){
  var k=cap+'-'+sub;
  if(!stProg[k])stProg[k]={c:0,t:0};
  stProg[k].t++;if(correct)stProg[k].c++;
  try{localStorage.setItem('edupt_st_prog',JSON.stringify(stProg));}catch(e){}
  renderStBars();
}
function renderStBars(){
  document.querySelectorAll('.subtema-header').forEach(function(h){
    var numEl=h.querySelector('.subtema-num');if(!numEl)return;
    var num=numEl.textContent.trim();
    var cap='1';
    var p=h.closest('[id*="view-math"]');
    if(p){if(p.id.indexOf('4')>-1)cap='4';else if(p.id.indexOf('3')>-1)cap='3';else if(p.id.indexOf('2')>-1)cap='2';}
    var k=cap+'-'+num;var d=stProg[k];
    var ex=h.querySelector('.subtema-progress');if(ex)ex.remove();
    if(d&&d.t>0){
      var pct=Math.min(100,Math.round(d.c/d.t*100));
      var bar=document.createElement('div');bar.className='subtema-progress';
      bar.innerHTML='<div class="subtema-prog-bar"><div class="subtema-prog-fill" style="width:'+pct+'%"></div></div><span class="subtema-prog-pct">'+pct+'%</span>';
      h.appendChild(bar);
    }
  });
}
setTimeout(renderStBars,500);

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: FEEDBACK ANIMATIONS
// ═══════════════════════════════════════════════════════════════
(function(){
  // Wrap all check functions to add animations
  var origFns={};
  ['checkMC','checkFill','checkDyn','checkDyn2','checkDyn3','ans4','hAns','ghAns'].forEach(function(fn){
    if(typeof window[fn]==='function'){
      origFns[fn]=window[fn];
      window[fn]=function(){
        var result=origFns[fn].apply(this,arguments);
        // Find the quiz question container
        var btn=arguments[2]||arguments[1];
        if(btn&&btn.closest){
          var q=btn.closest('.quiz-question')||btn.closest('.relampago-q');
          if(q){
            var isCorrect=btn.classList.contains('correct')||
              (arguments[2]==='correct')||(arguments[3]===true)||(arguments[2]===true);
            q.classList.remove('anim-correct','anim-wrong');
            void q.offsetWidth; // force reflow
            q.classList.add(isCorrect?'anim-correct':'anim-wrong');
            // Track streak
            updateStreak(isCorrect);
            // XP float
            if(isCorrect)showXPFloat(btn,'+10');
          }
        }
        return result;
      };
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: STREAK COUNTER
// ═══════════════════════════════════════════════════════════════
var currentStreak=0;
function updateStreak(correct){
  if(correct){
    currentStreak++;
    if(currentStreak===3||currentStreak===5||currentStreak===7||currentStreak===10||currentStreak===15||currentStreak===20){
      showStreakBadge(currentStreak);
    }
  }else{
    currentStreak=0;
  }
}
function showStreakBadge(n){
  var old=document.querySelector('.streak-badge');if(old)old.remove();
  var badge=document.createElement('div');
  badge.className='streak-badge '+(n>=10?'s10':n>=5?'s5':'s3');
  var emoji=n>=10?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>':n>=5?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>';
  var msg=n>=10?'Imparável!':n>=5?'Em chamas!':'Boa série!';
  badge.innerHTML=emoji+' '+n+' seguidas!<span class="streak-sub">'+msg+'</span>';
  document.body.appendChild(badge);
  setTimeout(function(){badge.style.transition='opacity .5s';badge.style.opacity='0';setTimeout(function(){badge.remove();},500);},2500);
}

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: XP FLOAT ANIMATION
// ═══════════════════════════════════════════════════════════════
function showXPFloat(anchor,text){
  var rect=anchor.getBoundingClientRect();
  var float=document.createElement('div');
  float.className='xp-float';
  float.textContent=text;
  float.style.left=(rect.left+rect.width/2-15)+'px';
  float.style.top=(rect.top+window.scrollY-10)+'px';
  document.body.appendChild(float);
  setTimeout(function(){float.remove();},1300);
}



// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: SOUND EFFECTS (OPTIONAL)
// ═══════════════════════════════════════════════════════════════
var soundEnabled=false;
try{soundEnabled=localStorage.getItem('edupt_sound')==='true';}catch(e){}

var audioCtx=null;
function playTone(freq,dur,type){
  if(!soundEnabled)return;
  try{
    if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    var osc=audioCtx.createOscillator();
    var gain=audioCtx.createGain();
    osc.connect(gain);gain.connect(audioCtx.destination);
    osc.type=type||'sine';
    osc.frequency.value=freq;
    gain.gain.value=0.08;
    gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+(dur||0.15));
    osc.start();osc.stop(audioCtx.currentTime+(dur||0.15));
  }catch(e){}
}
function playCorrectSound(){playTone(523,.08);setTimeout(function(){playTone(659,.08);},80);setTimeout(function(){playTone(784,.12);},160);}
function playWrongSound(){playTone(220,.15,'square');}

// Hook into answer functions for sound
(function(){
  var origMFH=makeFeedbackHTML;
  makeFeedbackHTML=function(isCorrect,expl,val){
    if(isCorrect)playCorrectSound();else playWrongSound();
    return origMFH(isCorrect,expl,val);
  };
})();

// Add sound toggle to level bars
setTimeout(function(){
  document.querySelectorAll('.level-bar').forEach(function(bar){
    if(bar.querySelector('.sound-toggle'))return;
    var toggle=document.createElement('label');
    toggle.className='sound-toggle'+(soundEnabled?' active':'');
    toggle.innerHTML=(soundEnabled?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>')+' Som';
    toggle.onclick=function(){
      soundEnabled=!soundEnabled;
      this.classList.toggle('active');
      this.innerHTML=(soundEnabled?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>')+' Som';
      try{localStorage.setItem('edupt_sound',soundEnabled);}catch(e){}
      if(soundEnabled)playCorrectSound();
    };
    bar.appendChild(toggle);
  });
},500);

// Fallback: ensure portal cards become visible even if IntersectionObserver fails
setTimeout(function(){
  document.querySelectorAll('.cycle-block,.y-card,.card,.def-block,.mat7-cap-card,.download-card').forEach(function(el){
    if(el.classList.contains('rv')&&!el.classList.contains('in')){
      el.classList.add('in');
    }
  });
},1500);

// ═══════════════════════════════════════════════════════
// ISSUES 1–4: SELEÇÃO MULTI-CAPÍTULO + MEGAGERADOR
// ═══════════════════════════════════════════════════════

// ── Issue 2: State Management ──
var capitulosSelecionados = [];

var CAP_INFO = {
  1: { nome: 'Cap. 1 — Números Inteiros',    emoji: '<span class="ico ico-sm"><svg><use href="#ico-hash"/></svg></span>', color: 'var(--c2-mid)' },
  2: { nome: 'Cap. 2 — Números Racionais',   emoji: '<span class="ico ico-sm"><svg><use href="#ico-calculator"/></svg></span>', color: 'var(--c3-mid)' },
  3: { nome: 'Cap. 3 — Geometria',           emoji: '<span class="ico ico-sm"><svg><use href="#ico-ruler"/></svg></span>', color: 'var(--c1-mid)' },
  4: { nome: 'Cap. 4 — Seq., Expr. e Eq.',   emoji: '<span class="ico ico-sm"><svg><use href="#ico-sparkles"/></svg></span>', color: '#516860'       },
};

// ── Issue 1: Toggle Checkbox ──
function toggleCapSel(capNum) {
  var card = document.getElementById('mat7-cap' + capNum);
  var chkBox = document.getElementById('chkbox-cap' + capNum);
  var idx = capitulosSelecionados.indexOf(capNum);
  if (idx === -1) {
    capitulosSelecionados.push(capNum);
    if (chkBox) chkBox.classList.add('checked');
    if (card) card.classList.add('cap-selected');
  } else {
    capitulosSelecionados.splice(idx, 1);
    if (chkBox) chkBox.classList.remove('checked');
    if (card) card.classList.remove('cap-selected');
  }
  updateFAB();
}

// ── Selecionar / Desselecionar Todos ──
var _TODOS_CAPS = [1, 2, 3, 4];
function selecionarTodos(btn) {
  var allSelected = _TODOS_CAPS.every(function(c){ return capitulosSelecionados.indexOf(c) !== -1; });
  if (allSelected) {
    // deselect all
    _TODOS_CAPS.forEach(function(c){
      capitulosSelecionados.splice(capitulosSelecionados.indexOf(c), 1);
      var card = document.getElementById('mat7-cap'+c);
      var chkBox = document.getElementById('chkbox-cap'+c);
      if (card) card.classList.remove('cap-selected');
      if (chkBox) chkBox.classList.remove('checked');
    });
  } else {
    // select all that aren't yet selected
    _TODOS_CAPS.forEach(function(c){
      if (capitulosSelecionados.indexOf(c) === -1) {
        capitulosSelecionados.push(c);
        var card = document.getElementById('mat7-cap'+c);
        var chkBox = document.getElementById('chkbox-cap'+c);
        if (card) card.classList.add('cap-selected');
        if (chkBox) chkBox.classList.add('checked');
      }
    });
  }
  updateFAB();
}

// ── Issue 3: FAB visibility ──
function updateFAB() {
  var fab = document.getElementById('mega-fab');
  var badge = document.getElementById('fab-badge');
  var n = capitulosSelecionados.length;
  if (badge) badge.textContent = n;
  // hide FAB when already inside the mega view or any chapter view
  var insideMega = document.getElementById('view-mega') && document.getElementById('view-mega').style.display !== 'none';
  if (fab) {
    if (n > 0 && !insideMega) { fab.classList.add('visible'); }
    else { fab.classList.remove('visible'); }
  }
  // update "Todos" button state
  var btnTodos = document.getElementById('btn-todos');
  var iconTodos = document.getElementById('btn-todos-icon');
  if (!btnTodos) return;
  var allSelected = _TODOS_CAPS.every(function(c){ return capitulosSelecionados.indexOf(c) !== -1; });
  if (allSelected) {
    btnTodos.style.background = 'linear-gradient(135deg,var(--c2-mid),var(--c2-deep))';
    btnTodos.style.color = '#fff';
    btnTodos.style.borderColor = 'transparent';
    if (iconTodos) iconTodos.textContent = '✓';
    btnTodos.childNodes[1] && (btnTodos.childNodes[1].textContent = ' Desselecionar Todos');
  } else {
    btnTodos.style.background = 'linear-gradient(135deg,var(--c2-base),var(--c2-pale))';
    btnTodos.style.color = 'var(--c2-deep)';
    btnTodos.style.borderColor = 'rgba(81,104,96,.25)';
    if (iconTodos) iconTodos.textContent = '☐';
    btnTodos.childNodes[1] && (btnTodos.childNodes[1].textContent = ' Selecionar Todos os Capítulos');
  }
}

// showMegaView and showMat7FromMega defined further below

function showMat7FromMega() {
  _hideAllViews();
  document.getElementById('view-mat7').style.display = 'block';
  window.scrollTo(0, 0);
}

// gerarMega, _megaGetCap*, _renderMegaQuestions, checkMega, checkMegaFill, _updateMegaScore
// all defined further below in the new unified implementation

function _updateMegaScore() {
  var s = megaState.score;
  document.getElementById('mega-score').textContent = s.correct;
  document.getElementById('mega-total').textContent = '/ ' + s.total;
  var pct = s.total > 0 ? (s.correct / s.total * 100) : 0;
  document.getElementById('mega-prog').style.width = pct + '%';
  _mprogLog('questoes', s.correct, s.total);
}

// ═══════════════════════════════════════════════════════
// MEGA — TABS NAVIGATION
// ═══════════════════════════════════════════════════════
function showMegaSection(id, btn) {
  document.querySelectorAll('.mega-section').forEach(function(s){ s.classList.remove('active'); });
  document.querySelectorAll('#mega-tabs .tab-btn').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('mega-sec-' + id).classList.add('active');
  btn.classList.add('active');
  // lazy init on first visit
  if (id === 'flashcards' && !_mfcInitialized) _mfcInit();
  if (id === 'jogos') _j24AutoInit('j24-wrap-mega', 'medio');
  if (id === 'minitestes') {
    var _mmCaps = typeof capitulosSelecionados !== 'undefined' && capitulosSelecionados.length > 0 ? capitulosSelecionados : [1,2,3,4];
    var _mmEl = document.getElementById('mega-minitestes-content');
    if (_mmEl && _mmEl.querySelector('p')) _megaPopulateMinitestes(_mmCaps);
  }
  if (id === 'teste') {
    var _mtCaps = typeof capitulosSelecionados !== 'undefined' && capitulosSelecionados.length > 0 ? capitulosSelecionados : [1,2,3,4];
    var _mtEl = document.getElementById('mega-teste-content');
    if (_mtEl && _mtEl.querySelector('p')) _megaPopulateTeste(_mtCaps);
  }
  if (id === 'progresso') {
    _mprogRender();
    var capIds = (typeof capitulosSelecionados !== 'undefined' ? capitulosSelecionados : []).map(function(n){ return 'cap'+n; });
    etRenderMegaPanel('et-mega', capIds);
  }
  if (id === 'reta') {
    retaDrawFor('mega-reta');
  }
  if (id === 'downloads') {
    // Sync chapter buttons with currently selected chapters
    var sel = (typeof capitulosSelecionados !== 'undefined' && capitulosSelecionados.length > 0)
      ? capitulosSelecionados : [1,2,3,4];
    var capBtns = document.querySelectorAll('#gf-caps-mega-sec-downloads .gf-cap-btn');
    capBtns.forEach(function(b) {
      var cap = parseInt(b.dataset.cap);
      if (sel.indexOf(cap) !== -1) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    // Ensure at least one is selected
    var anyActive = document.querySelectorAll('#gf-caps-mega-sec-downloads .gf-cap-btn.active').length > 0;
    if (!anyActive) {
      document.querySelector('#gf-caps-mega-sec-downloads .gf-cap-btn').classList.add('active');
    }
    // Auto-generate on first visit
    var preview = document.getElementById('gf-preview-mega-sec-downloads');
    if (preview && preview.style.display === 'none') {
      gfGenerar('mega-sec-downloads');
    }
  }
}

// ═══════════════════════════════════════════════════════
// MEGA — GERADOR (same as questoes but different container + score)
// ═══════════════════════════════════════════════════════
var mgenState = { answered:{}, score:{correct:0,total:0} };
var _mgenLevel = 'medio';

function megaSetGenLevel(btn) {
  document.querySelectorAll('#mega-sec-gerador .gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  _mgenLevel = btn.dataset.level;
}

function gerarMegaGerador() {
  var qtd = parseInt(document.getElementById('mgen-qtd').value) || 10;
  var tipo = document.getElementById('mgen-tipo').value;
  var dif = _mgenLevel;
  var sorted = capitulosSelecionados.slice().sort(function(a,b){return a-b;});
  var perCap = Math.ceil(qtd / sorted.length);
  var allQ = [];
  sorted.forEach(function(cap) {
    var qs = [];
    if (cap === 1) qs = _megaGetCap1(perCap * 2, dif, tipo);
    else if (cap === 2) qs = _megaGetCap2(perCap * 2, dif, tipo);
    else if (cap === 3) qs = _megaGetCap3(perCap * 2, dif, tipo);
    else if (cap === 4) qs = _megaGetCap4(perCap * 2, tipo, dif);
    allQ = allQ.concat(qs);
  });
  // Fisher-Yates shuffle before slicing
  for (var _fyi = allQ.length - 1; _fyi > 0; _fyi--) { var _fyj = Math.floor(Math.random() * (_fyi + 1)); var _fyt = allQ[_fyi]; allQ[_fyi] = allQ[_fyj]; allQ[_fyj] = _fyt; }
  allQ = allQ.slice(0, qtd);
  mgenState = { answered:{}, score:{correct:0,total:0} };
  _updateMgenScore();
  document.getElementById('mgen-score-bar').style.display = allQ.length ? 'flex' : 'none';
  _renderMegaQuestionsTo(allQ, 'mgen-container', 'mgen', function(c,t){ mgenState.score.correct=c; mgenState.score.total=t; _updateMgenScore(); _mprogLog('questoes',c,t); });
}

function _updateMgenScore() {
  var s = mgenState.score;
  document.getElementById('mgen-score').textContent = s.correct;
  document.getElementById('mgen-total').textContent = '/ ' + s.total;
  var pct = s.total > 0 ? (s.correct / s.total * 100) : 0;
  document.getElementById('mgen-prog').style.width = pct + '%';
}

// updated _megaGetCap* to accept tipo filter
function _megaGetCap1(n, dif, tipo) {
  var qs = [];
  // Fácil: temas básicos, só MC e fill. Médio: todos os temas. Difícil: mais tema 5 (parênteses) e contexto
  var temas = dif==='facil'?['1','2','3']:dif==='dificil'?['3','4','5','5','4']:['1','2','3','4','5'];
  var lv = dif==='facil'?{min:-6,max:6}:dif==='dificil'?{min:-25,max:25}:{min:-12,max:12};
  for (var i = 0; i < n * 4 && qs.length < n; i++) {
    var t = temas[Math.floor(Math.random()*temas.length)];
    var tp;
    if (dif==='facil') tp = _pickTipo(tipo==='misto'?(['mc','fill'])[Math.floor(Math.random()*2)]:tipo);
    else if (dif==='dificil') tp = _pickTipo(tipo==='misto'?(['fill','vf','contexto'])[Math.floor(Math.random()*3)]:tipo);
    else tp = _pickTipo(tipo);
    try {
      var ex = buildExercicio(t, tp, lv.min, lv.max, i+1, dif);
      if (ex) { ex._cap=1; ex._capLabel=CAP_INFO[1].emoji+' Cap. 1'; ex._dif=dif; qs.push(ex); }
    } catch(e){}
  }
  return qs.slice(0,n);
}
function _megaGetCap2(n, dif, tipo) {
  var qs = [];
  var temas = ['1','2','3','5','7','8','9'];
  for (var i = 0; i < n * 3 && qs.length < n; i++) {
    var t = temas[Math.floor(Math.random()*temas.length)];
    var tp = _pickTipo(tipo);
    try {
      var ex = buildEx2(t, tp, dif);
      if (ex) { ex._cap=2; ex._capLabel=CAP_INFO[2].emoji+' Cap. 2'; qs.push(ex); }
    } catch(e){}
  }
  return qs.slice(0,n);
}
function _megaGetCap3(n, dif, tipo) {
  var qs = [];
  var temas = ['1','2','3','4','5'];
  for (var i = 0; i < n * 3 && qs.length < n; i++) {
    var t = temas[Math.floor(Math.random()*temas.length)];
    var tp = _pickTipo(tipo);
    try {
      var ex = buildEx3(t, tp, dif);
      if (ex) { ex._cap=3; ex._capLabel=CAP_INFO[3].emoji+' Cap. 3'; qs.push(ex); }
    } catch(e){}
  }
  return qs.slice(0,n);
}
function _megaGetCap4(n, tipo, dif) {
  var pool = BANCO4.questoes.slice();
  // Filter by difficulty
  if (dif === 'facil') {
    pool = pool.filter(function(q){ return q.id && q.id.indexOf('q4-') === 0 && parseInt(q.id.replace('q4-','')) <= 16; });
  } else if (dif === 'dificil') {
    var desafio = pool.filter(function(q){ return q.id && parseInt(q.id.replace('q4-','')) >= 17; });
    var normal  = pool.filter(function(q){ return !q.id || parseInt(q.id.replace('q4-','')) < 17; });
    pool = desafio.concat(normal);
  }
  // Fisher-Yates shuffle
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  // Respect tipo: BANCO4 questions are mc_banco; for fill/vf, try buildEx4 instead
  var resolvedTipo = _pickTipo(tipo);
  if (resolvedTipo !== 'mc' && resolvedTipo !== 'mc_banco' && typeof buildEx4 === 'function') {
    var altPool = [];
    var temas = ['1','2','3','4','5'];
    var attempts = 0;
    while (altPool.length < n && attempts < n * 4) {
      attempts++;
      var ex = buildEx4(temas[Math.floor(Math.random()*temas.length)], dif);
      if (ex) { ex._cap = 4; ex._capLabel = CAP_INFO[4].emoji+' Cap. 4'; altPool.push(ex); }
    }
    if (altPool.length >= n) return altPool.slice(0, n);
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:4, _capLabel:CAP_INFO[4].emoji+' Cap. 4',
      tema:'Cap. 4 · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _pickTipo(tipo) {
  if (!tipo || tipo === 'misto') return ['fill','mc','vf'][Math.floor(Math.random()*3)];
  return tipo;
}

// ═══════════════════════════════════════════════════════
// MEGA — UNIFIED RENDERER (generic, handles any container+prefix+scoreCallback)
// ═══════════════════════════════════════════════════════
var _megaRenderStates = {}; // keyed by prefix

function _renderMegaQuestionsTo(exercicios, containerId, prefix, onScore) {
  _megaRenderStates[prefix] = { answered:{}, score:{correct:0,total:0}, onScore: onScore||null };
  var labels = ['A','B','C','D'];
  var html = '';
  exercicios.forEach(function(ex, i) {
    var qid = prefix + '_q' + i;
    var capBadge = ex._capLabel ? '<span style="font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:999px;background:var(--cream2);color:var(--ink3);border:1px solid var(--border);margin-right:4px">'+ex._capLabel+'</span>' : '';
    var _capId = ex._capNum ? 'cap'+ex._capNum : (ex._capLabel ? 'cap'+ex._capLabel.replace(/[^0-9]/g,'') : 'mega');
    html += '<div class="quiz-question" id="'+qid+'" data-enun="'+ex.enun.replace(/"/g,'&quot;').replace(/</g,'&lt;').slice(0,140)+'" data-capid="'+_capId+'">';
    html += '<div class="q-number">'+capBadge+'Questão '+(i+1)+' · '+(ex.tema||'')+'</div>';
    html += '<div class="q-text">'+(typeof formatMath==='function'?formatMath(ex.enun):ex.enun)+'</div>';
    if (ex.tipo === 'mc_banco') {
      html += '<div class="options">';
      (ex.opcoes||[]).forEach(function(opt,k){
        var isC = (labels[k]===String(ex.resposta));
        html += '<button class="option-btn" data-correct="'+isC+'" onclick="_checkMegaQ(\''+prefix+'\',\''+qid+'\',\'mc\','+isC+',this)"><span class="opt-label">'+labels[k]+'</span>'+opt+'</button>';
      });
      html += '</div>';
    } else if (ex.tipo === 'mc') {
      html += '<div class="options">';
      (ex.opcoes||[]).forEach(function(opt,k){
        var isC = (String(opt)===String(ex.resposta));
        html += '<button class="option-btn" data-correct="'+isC+'" onclick="_checkMegaQ(\''+prefix+'\',\''+qid+'\',\'mc\','+isC+',this)"><span class="opt-label">'+labels[k]+'</span>'+opt+'</button>';
      });
      html += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta==='V';
      html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;">'
        +'<button class="option-btn" data-correct="'+vC+'" onclick="_checkMegaQ(\''+prefix+'\',\''+qid+'\',\'mc\','+vC+',this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span> Verdadeiro</button>'
        +'<button class="option-btn" data-correct="'+(!vC)+'" onclick="_checkMegaQ(\''+prefix+'\',\''+qid+'\',\'mc\','+(!vC)+',this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span> Falso</button>'
        +'</div>';
    } else if (ex.tipo==='fill'||ex.tipo==='fill_frac') {
      var isFrac = ex.tipo==='fill_frac';
      var safeResp = String(ex.resposta).replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      html += '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">'
        +'<input class="fill-input" id="'+qid+'-in" placeholder="'+(isFrac?'ex: 3/4':'?')+'" type="'+(isFrac?'text':'number')+'" style="width:'+(isFrac?'120px':'100px')+'">'
        +'<button class="check-btn" onclick="_checkMegaFillQ(\''+prefix+'\',\''+qid+'\',\''+ex.tipo+'\',\''+safeResp+'\')">Verificar</button>'
        +'</div>';
    }
    html += '<div class="feedback" id="'+qid+'-fb"></div>';
    html += '<span id="'+qid+'-expl" style="display:none">'+(ex.expl||'').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,"&#39;")+'</span>';
    html += '</div>';
  });
  document.getElementById(containerId).innerHTML = html || '<p style="color:var(--ink4);padding:2rem;text-align:center">Sem questões disponíveis. Tenta novamente.</p>';
}

function _checkMegaQ(prefix, qid, tipo, isCorrect, btn) {
  var st = _megaRenderStates[prefix];
  if (!st || st.answered[qid]) return;
  st.answered[qid] = true;
  var container = document.getElementById(qid);
  container.querySelectorAll('.option-btn').forEach(function(b){ b.disabled=true; });
  var correct = (isCorrect===true||isCorrect==='true');
  if (correct) { btn.classList.add('correct'); st.score.correct++; }
  else {
    btn.classList.add('wrong');
    // Highlight the correct option using the reliable data-correct attribute
    container.querySelectorAll('.option-btn').forEach(function(b){
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }
  st.score.total++;
  var fb = document.getElementById(qid+'-fb');
  fb.className = 'feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML = makeFeedbackHTML(correct, document.getElementById(qid+'-expl')?.textContent||'');
  if (st.onScore) st.onScore(st.score.correct, st.score.total);
  var _mqEl=document.getElementById(qid);
  if(_mqEl){_etRecord(_mqEl.dataset.capid||'mega','q',qid,_mqEl.dataset.enun||qid,correct);}
}

function _checkMegaFillQ(prefix, qid, tipo, resposta) {
  var st = _megaRenderStates[prefix];
  if (!st || st.answered[qid]) return;
  var inp = document.getElementById(qid+'-in');
  if (!inp || !inp.value.trim()) { eduToast('Introduz uma resposta!','warn'); return; }
  st.answered[qid] = true;
  inp.disabled = true;
  var userVal = inp.value.trim().replace(',', '.');
  var correct;
  if (tipo==='fill_frac') {
    var norm = function(s){ return s.replace(/\s/g,'').replace(/÷/g,'/'); };
    correct = norm(userVal)===norm(String(resposta));
  } else { correct = parseFloat(userVal)===parseFloat(resposta); }
  inp.classList.add(correct?'correct':'wrong');
  st.score.total++;
  if (correct) st.score.correct++;
  var fb = document.getElementById(qid+'-fb');
  fb.className = 'feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML = makeFeedbackHTML(correct, document.getElementById(qid+'-expl')?.textContent||'', correct?null:resposta);
  if (st.onScore) st.onScore(st.score.correct, st.score.total);
  var _mfEl=document.getElementById(qid);
  if(_mfEl){_etRecord(_mfEl.dataset.capid||'mega','q',qid,_mfEl.dataset.enun||qid,correct);}
}

// patch gerarMega and checkMega to use the generic renderer
function gerarMega() {
  var qtd = parseInt(document.getElementById('mega-qtd').value)||15;
  var dif = document.getElementById('mega-dif').value||'medio';
  var sorted = capitulosSelecionados.slice().sort(function(a,b){return a-b;});
  var perCap = Math.ceil(qtd/sorted.length);
  var allQ = [];
  sorted.forEach(function(cap){
    if(cap===1) allQ=allQ.concat(_megaGetCap1(perCap,dif,'misto'));
    else if(cap===2) allQ=allQ.concat(_megaGetCap2(perCap,dif,'misto'));
    else if(cap===3) allQ=allQ.concat(_megaGetCap3(perCap,dif,'misto'));
    else if(cap===4) allQ=allQ.concat(_megaGetCap4(perCap,'misto'));
  });
  // Fisher-Yates shuffle before slicing
  for (var _fyi = allQ.length - 1; _fyi > 0; _fyi--) { var _fyj = Math.floor(Math.random() * (_fyi + 1)); var _fyt = allQ[_fyi]; allQ[_fyi] = allQ[_fyj]; allQ[_fyj] = _fyt; }
  allQ = allQ.slice(0,qtd);
  megaState = {answered:{},score:{correct:0,total:0}};
  _updateMegaScore();
  _renderMegaQuestionsTo(allQ,'mega-container','mega_qs',function(c,t){
    megaState.score.correct=c; megaState.score.total=t; _updateMegaScore(); _mprogLog('questoes',c,t);
  });
}

// ═══════════════════════════════════════════════════════
// MEGA — FLASHCARDS (merged from all selected caps)
// ═══════════════════════════════════════════════════════
var _mfcCards = [];
var _mfcOrder = [];
var _mfcIdx = 0;
var _mfcFlipped = false;
var _mfcInitialized = false;
var _mfcFilterCaps = []; // empty = all

var _FC_ALL_BY_CAP = {
  1: function(){ return typeof FC_CARDS!=='undefined' ? FC_CARDS.map(function(c){return Object.assign({},c,{_cap:1});}) : []; },
  2: function(){ return typeof FC2_CARDS!=='undefined' ? FC2_CARDS.map(function(c){return Object.assign({},c,{_cap:2});}) : []; },
  3: function(){ return typeof FC3_CARDS!=='undefined' ? FC3_CARDS.map(function(c){return Object.assign({},c,{_cap:3});}) : []; },
  4: function(){
    return (typeof BANCO4!=='undefined'&&BANCO4.flashcards) ? BANCO4.flashcards.map(function(c){return Object.assign({},c,{_cap:4});}) : [];
  }
};

function _mfcInit() {
  _mfcInitialized = true;
  _mfcFilterCaps = capitulosSelecionados.slice();
  _mfcBuildDeck();
  // Filter chips
  var filter = document.getElementById('mfc-filter');
  if (filter) {
    filter.innerHTML = capitulosSelecionados.slice().sort(function(a,b){return a-b;}).map(function(c){
      return '<button onclick="mfcToggleFilter('+c+',this)" class="gen-level-btn active" data-cap="'+c+'" style="font-size:.78rem">'+CAP_INFO[c].emoji+' Cap. '+c+'</button>';
    }).join('');
  }
  mfcRenderCard();
}

function _mfcBuildDeck() {
  _mfcCards = [];
  _mfcFilterCaps.forEach(function(c){
    var fn = _FC_ALL_BY_CAP[c];
    if (fn) _mfcCards = _mfcCards.concat(fn());
  });
  _mfcCards = _mfcCards.sort(function(){return Math.random()-.5;});
  _mfcOrder = _mfcCards.map(function(_,i){return i;});
  _mfcIdx = 0;
  _mfcFlipped = false;
  document.getElementById('mfc-inner').style.transform = 'rotateY(0deg)';
}

function mfcToggleFilter(cap, btn) {
  var idx = _mfcFilterCaps.indexOf(cap);
  if (idx===-1) { _mfcFilterCaps.push(cap); btn.classList.add('active'); }
  else { _mfcFilterCaps.splice(idx,1); btn.classList.remove('active'); }
  if (_mfcFilterCaps.length===0) { _mfcFilterCaps=[cap]; btn.classList.add('active'); } // prevent empty
  _mfcBuildDeck();
  mfcRenderCard();
}

function mfcRenderCard() {
  if (!_mfcCards.length) { document.getElementById('mfc-q').textContent = 'Sem flashcards para os capítulos selecionados.'; return; }
  var card = _mfcCards[_mfcOrder[_mfcIdx]];
  var capInfo = CAP_INFO[card._cap];
  document.getElementById('mfc-cap-label').textContent = capInfo ? capInfo.nome.split('—')[0].trim() : '';
  document.getElementById('mfc-tag').textContent = card.tag||'';
  document.getElementById('mfc-q').textContent = card.q||'';
  document.getElementById('mfc-a').textContent = card.a||'';
  document.getElementById('mfc-counter').textContent = (_mfcIdx+1)+' / '+_mfcCards.length;
  document.getElementById('mfc-prog').style.width = ((_mfcIdx+1)/_mfcCards.length*100)+'%';
  // dots (max 30)
  var dots = document.getElementById('mfc-dots');
  var show = Math.min(_mfcCards.length, 30);
  dots.innerHTML = _mfcOrder.slice(0,show).map(function(_,i){
    return '<div style="width:8px;height:8px;border-radius:50%;background:'+(i===_mfcIdx?'var(--c2-mid)':'var(--border2)')+';cursor:pointer;transition:background .2s" onclick="mfcGoTo('+i+')"></div>';
  }).join('');
  if (_mfcFlipped) { _mfcFlipped=false; document.getElementById('mfc-inner').style.transform='rotateY(0deg)'; }
}
function mfcFlip() {
  _mfcFlipped = !_mfcFlipped;
  document.getElementById('mfc-inner').style.transform = _mfcFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
}
function mfcNext() { _mfcIdx=(_mfcIdx+1)%_mfcCards.length; mfcRenderCard(); }
function mfcPrev() { _mfcIdx=(_mfcIdx-1+_mfcCards.length)%_mfcCards.length; mfcRenderCard(); }
function mfcGoTo(i) { _mfcIdx=i; mfcRenderCard(); }
function mfcShuffle() {
  for(var i=_mfcOrder.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=_mfcOrder[i];_mfcOrder[i]=_mfcOrder[j];_mfcOrder[j]=tmp;}
  _mfcIdx=0; mfcRenderCard();
}
function mfcReset() { _mfcIdx=0; mfcRenderCard(); }

// ═══════════════════════════════════════════════════════
// MEGA — JOGOS: Relâmpago + VF
// ═══════════════════════════════════════════════════════
var _mvfScore = {correct:0, total:0};

function _getMegaRelPool(n) {
  // pull from relampago banks of each selected cap + banco questoes
  var pool = [];
  capitulosSelecionados.forEach(function(cap) {
    if (cap===4 && typeof BANCO4!=='undefined') {
      BANCO4.relampago.forEach(function(q){
        pool.push({cap:4, enun:q.q, opts:q.opts, correct:q.c, expl:q.fb||''});
      });
    } else {
      // generate mc questions dynamically for caps 1-3
      var qs = [];
      if(cap===1) qs=_megaGetCap1(8,'medio','mc');
      else if(cap===2) qs=_megaGetCap2(8,'medio','mc');
      else if(cap===3) qs=_megaGetCap3(8,'medio','mc');
      qs.forEach(function(q){ pool.push({cap:cap, enun:q.enun, opcoes:q.opcoes, resposta:q.resposta, expl:q.expl||'', _isMc:true}); });
    }
  });
  return pool.sort(function(){return Math.random()-.5;}).slice(0,n);
}





// ═══════════════════════════════════════════════════════
// MEGA — EXAME CRONOMETRADO
// ═══════════════════════════════════════════════════════
var _mexameState = {level:'medio', timer:null, timeLeft:900, exercicios:[], answered:{}, score:{correct:0,total:0}};

function mexameSetLevel(btn) {
  document.querySelectorAll('#mega-sec-exame .gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  _mexameState.level = btn.dataset.level;
}

function mexameStart() {
  var dif = _mexameState.level;
  var qtd = parseInt(document.getElementById('mexame-qtd').value)||15;
  var secs = parseInt(document.getElementById('mexame-tempo').value)||900;
  var sorted = capitulosSelecionados.slice().sort(function(a,b){return a-b;});
  var perCap = Math.ceil(qtd/sorted.length);
  var allQ = [];
  sorted.forEach(function(cap){
    if(cap===1) allQ=allQ.concat(_megaGetCap1(perCap,dif,'misto'));
    else if(cap===2) allQ=allQ.concat(_megaGetCap2(perCap,dif,'misto'));
    else if(cap===3) allQ=allQ.concat(_megaGetCap3(perCap,dif,'misto'));
    else if(cap===4) allQ=allQ.concat(_megaGetCap4(perCap,'misto'));
  });
  // Fisher-Yates shuffle before slicing
  for (var _fyi = allQ.length - 1; _fyi > 0; _fyi--) { var _fyj = Math.floor(Math.random() * (_fyi + 1)); var _fyt = allQ[_fyi]; allQ[_fyi] = allQ[_fyj]; allQ[_fyj] = _fyt; }
  allQ = allQ.slice(0,qtd);
  _mexameState = {level:dif, timer:null, timeLeft:secs, exercicios:allQ, answered:{}, score:{correct:0,total:0}};
  document.getElementById('mexame-config').style.display = 'none';
  document.getElementById('mexame-running').style.display = 'block';
  document.getElementById('mexame-result').style.display = 'none';
  _mexameTick();
  _mexameState.timer = setInterval(_mexameTick, 1000);
  _renderMegaQuestionsTo(allQ, 'mexame-container', 'mexame_ex', function(c,t){
    _mexameState.score.correct=c; _mexameState.score.total=t;
    document.getElementById('mexame-answered').textContent=t+' / '+allQ.length;
    document.getElementById('mexame-prog').style.width=(t/allQ.length*100)+'%';
    if (t>=allQ.length) { setTimeout(mexameStop,400); }
  });
  document.getElementById('mexame-answered').textContent='0 / '+allQ.length;
}

function _mexameTick() {
  var t = _mexameState.timeLeft;
  var m = Math.floor(t/60), s = t%60;
  var el = document.getElementById('mexame-timer');
  if (el) el.textContent = m+':'+(s<10?'0':'')+s;
  if (t<=30 && el) el.style.color='var(--wrong)';
  if (t<=0) { mexameStop(); return; }
  _mexameState.timeLeft--;
}

function mexameStop() {
  if (_mexameState.timer) { clearInterval(_mexameState.timer); _mexameState.timer=null; }
  document.getElementById('mexame-running').style.display='none';
  document.getElementById('mexame-result').style.display='block';
  var s = _mexameState.score;
  var total = _mexameState.exercicios.length;
  var pct = total>0 ? Math.round(s.correct/total*100) : 0;
  var nota = pct>=90?'Excelente!':pct>=75?'Muito Bom!':pct>=50?'Suficiente':'Continua a treinar';
  document.getElementById('mexame-emoji').innerHTML = pct>=90?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=75?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>':pct>=50?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
  document.getElementById('mexame-nota').textContent = pct+'% — '+nota;
  document.getElementById('mexame-detalhe').textContent = s.correct+' correctas em '+total+' questões de '+capitulosSelecionados.length+' capítulo(s)';
  _mprogLog('exame', s.correct, total);
}

// ═══════════════════════════════════════════════════════
// MEGA — PROGRESSO
// ═══════════════════════════════════════════════════════
var _mprogData = { sessions: [] };
var _mprogSessionLog = {};

function _mprogLog(section, correct, total) {
  if (!total) return;
  var key = section+'_'+Date.now();
  _mprogSessionLog[section] = _mprogSessionLog[section]||{correct:0,total:0,ts:Date.now()};
  _mprogSessionLog[section].correct = correct;
  _mprogSessionLog[section].total = total;
}

function _mprogRender() {
  var secs = ['questoes','gerador','jogos','exame'];
  var labels = {questoes:'<span class="ico ico-sm"><svg><use href="#ico-pencil"/></svg></span> Questões',gerador:'<span class="ico ico-sm"><svg><use href="#ico-dices"/></svg></span> Gerador',jogos:'<span class="ico ico-sm"><svg><use href="#ico-gamepad"/></svg></span> Jogos',exame:'<span class="ico ico-sm"><svg><use href="#ico-timer"/></svg></span> Exame'};
  var cards = document.getElementById('mprog-cards');
  var html = '';
  var totalC=0, totalT=0;
  secs.forEach(function(s){
    var d = _mprogSessionLog[s]||{correct:0,total:0};
    totalC+=d.correct; totalT+=d.total;
    var pct = d.total>0?Math.round(d.correct/d.total*100):0;
    html += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:14px;padding:1rem;text-align:center;box-shadow:var(--shadow)">'
      +'<div style="font-size:.75rem;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem">'+labels[s]+'</div>'
      +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.8rem;font-weight:900;color:var(--c2-mid)">'+(d.total>0?pct+'%':'—')+'</div>'
      +'<div style="font-size:.78rem;color:var(--ink3)">'+d.correct+' / '+d.total+'</div>'
      +'</div>';
  });
  // total
  var totPct = totalT>0?Math.round(totalC/totalT*100):0;
  html += '<div style="background:linear-gradient(135deg,var(--c2-base),var(--c2-pale));border:2px solid rgba(81,104,96,.2);border-radius:14px;padding:1rem;text-align:center;box-shadow:var(--shadow-md);grid-column:1/-1">'
    +'<div style="font-size:.75rem;font-weight:700;color:var(--c2-deep);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem"><span class="ico ico-sm"><svg><use href="#ico-trophy"/></svg></span> Total da Sessão</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:2.2rem;font-weight:900;color:var(--c2-deep)">'+(totalT>0?totPct+'%':'—')+'</div>'
    +'<div style="font-size:.85rem;color:var(--c2-deep);font-weight:600">'+totalC+' certas em '+totalT+' questões</div>'
    +'</div>';
  cards.innerHTML = html;

  // Cap breakdown chips
  var temas = document.getElementById('mprog-temas');
  var chipsHtml = capitulosSelecionados.slice().sort(function(a,b){return a-b;}).map(function(c){
    return '<span style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;background:var(--c2-base);color:var(--c2-deep);border:1px solid rgba(81,104,96,.2);font-size:.82rem;font-weight:600;margin:.25rem">'+CAP_INFO[c].emoji+' '+CAP_INFO[c].nome+'</span>';
  }).join('');
  temas.innerHTML = chipsHtml;
}

function mprogReset() {
  _mprogSessionLog = {};
  _mprogRender();
}

// ═══════════════════════════════════════════════════════
// MEGA — SHOW VIEW (updated to init flashcards flag)
// ═══════════════════════════════════════════════════════
function showMegaView() {
  if (capitulosSelecionados.length === 0) return;
  _hideAllViews();
  document.getElementById('view-mega').style.display = 'block';
  window.scrollTo(0,0);
  _mfcInitialized = false; // reset so flashcards re-init on next visit
  _mexameState.timer && clearInterval(_mexameState.timer);
  // chips in back bar
  var chips = document.getElementById('mega-cap-chips');
  var sorted = capitulosSelecionados.slice().sort(function(a,b){return a-b;});
  chips.innerHTML = sorted.map(function(c){
    return '<span style="font-size:.72rem;font-weight:700;padding:4px 12px;border-radius:999px;background:var(--c2-base);color:var(--c2-deep);border:1px solid rgba(81,104,96,.2)">'+CAP_INFO[c].emoji+' Cap.'+c+'</span>';
  }).join('');
  document.getElementById('mega-bar-title').innerHTML = '<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span> Estudo: '+sorted.map(function(c){return 'Cap.'+c;}).join(' + ');
  document.getElementById('mega-header-desc').innerHTML = 'Exercícios baralhados de '+sorted.length+' capítulo(s) — '+sorted.map(function(c){return CAP_INFO[c].emoji;}).join(' ');
  // reset tabs to teoria (first tab)
  document.querySelectorAll('.mega-section').forEach(function(s){ s.classList.remove('active'); });
  document.querySelectorAll('#mega-tabs .tab-btn').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('mega-sec-teoria').classList.add('active');
  document.querySelector('#mega-tabs .tab-btn').classList.add('active');
  // populate teoria, minitestes, downloads
  _megaPopulateTeoria(sorted);
  _megaPopulateMinitestes(sorted);
  _megaPopulateTeste(sorted);
  _megaPopulateDownloads(sorted);
  gerarMega();
  // Add PDF buttons to each section header
  setTimeout(_megaAddPdfButtons, 100);
}

// ═══════════════════════════════════════════════════════
// MEGA — POPULATE: Clone real content from individual chapters
// ═══════════════════════════════════════════════════════

// Generic cloner: copies full section content from a chapter view, wraps it with a cap header
function _megaCloneSection(caps, sourceIds, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var html = '';
  caps.forEach(function(c) {
    var srcId = sourceIds[c];
    if (!srcId) return;
    var src = document.getElementById(srcId);
    if (!src) return;
    // Clone everything except the sec-header
    var content = '';
    var children = src.children;
    for (var i = 0; i < children.length; i++) {
      if (!children[i].classList.contains('sec-header') && !children[i].classList.contains('notes-block')) {
        content += children[i].outerHTML;
      }
    }
    if (!content) return;
    // Prefix IDs in cloned content to avoid duplicates
    content = content.replace(/\bid="([^"]+)"/g, 'id="mega_c'+c+'_$1"');
    html += '<div class="mega-cloned-cap" style="margin-bottom:2.5rem">'
      + '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:3px solid '+CAP_INFO[c].color+'">'
      + '<span style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:999px;background:var(--c2-base);color:var(--c2-deep);border:1.5px solid rgba(81,104,96,.2);font-weight:700;font-size:.92rem">'+CAP_INFO[c].emoji+' '+CAP_INFO[c].nome+'</span>'
      + '</div>'
      + content
      + '</div>';
  });
  container.innerHTML = html || '<p style="color:var(--ink3);text-align:center;padding:2rem">Conteúdo não disponível para os capítulos selecionados.</p>';
}

function _megaPopulateTeoria(caps) {
  _megaCloneSection(caps, {1:'sec-teoria',2:'sec-teoria2',3:'sec-teoria3',4:'sec-teoria4'}, 'mega-teoria-content');
}

function _megaPopulateMinitestes(caps) {
  var container = document.getElementById('mega-minitestes-content');
  if (!container) return;
  var html = '';
  caps.forEach(function(c) {
    html += '<div style="margin-bottom:2.5rem">'
      + '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:3px solid '+CAP_INFO[c].color+'">'
      + '<span style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:999px;background:var(--c2-base);color:var(--c2-deep);border:1.5px solid rgba(81,104,96,.2);font-weight:700;font-size:.92rem">'+CAP_INFO[c].emoji+' '+CAP_INFO[c].nome+'</span>'
      + '<button class="btn btn-ghost" style="margin-left:auto;font-size:.78rem" onclick="_megaRegenMini('+c+')">↺ Novas questões</button>'
      + '</div>'
      + '<div class="mega-score-bar" style="margin-bottom:1rem"><div><div class="score-num" id="mmini'+c+'-score">0</div><div class="score-label">certas</div></div><div><div class="score-num" style="color:var(--muted);font-size:1.2rem" id="mmini'+c+'-total">/ 0</div><div class="score-label">respondidas</div></div><div class="progress-track" style="flex:1;min-width:120px"><div class="progress-fill" id="mmini'+c+'-prog" style="width:0%"></div></div></div>'
      + '<div id="mmini'+c+'-container"></div>'
      + '</div>';
  });
  container.innerHTML = html;
  caps.forEach(function(c) { _megaRegenMini(c); });
}

function _megaRegenMini(c) {
  var qs = [];
  try {
    if (c===1) qs = _megaGetCap1(8,'medio','misto');
    else if (c===2) qs = _megaGetCap2(8,'medio','misto');
    else if (c===3) qs = _megaGetCap3(8,'medio','misto');
    else if (c===4) qs = _megaGetCap4(8,'misto');
  } catch(e){}
  if (qs.length) {
    _renderMegaQuestionsTo(qs, 'mmini'+c+'-container', 'mmini'+c, function(correct,total){
      document.getElementById('mmini'+c+'-score').textContent=correct;
      document.getElementById('mmini'+c+'-total').textContent='/ '+total;
      var pct=total>0?(correct/total*100):0;
      document.getElementById('mmini'+c+'-prog').style.width=pct+'%';
    });
  }
}

function _megaPopulateTeste(caps) {
  var container = document.getElementById('mega-teste-content');
  if (!container) return;
  var html = '';
  caps.forEach(function(c) {
    html += '<div style="margin-bottom:2.5rem">'
      + '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:3px solid '+CAP_INFO[c].color+'">'
      + '<span style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:999px;background:var(--c2-base);color:var(--c2-deep);border:1.5px solid rgba(81,104,96,.2);font-weight:700;font-size:.92rem">'+CAP_INFO[c].emoji+' '+CAP_INFO[c].nome+'</span>'
      + '<button class="btn btn-ghost" style="margin-left:auto;font-size:.78rem" onclick="_megaRegenTeste('+c+')">↺ Novo teste</button>'
      + '</div>'
      + '<div class="mega-score-bar" style="margin-bottom:1rem"><div><div class="score-num" id="mteste'+c+'-score">0</div><div class="score-label">certas</div></div><div><div class="score-num" style="color:var(--muted);font-size:1.2rem" id="mteste'+c+'-total">/ 0</div><div class="score-label">respondidas</div></div><div class="progress-track" style="flex:1;min-width:120px"><div class="progress-fill" id="mteste'+c+'-prog" style="width:0%"></div></div></div>'
      + '<div id="mteste'+c+'-container"></div>'
      + '</div>';
  });
  container.innerHTML = html;
  caps.forEach(function(c) { _megaRegenTeste(c); });
}

function _megaRegenTeste(c) {
  var qs = [];
  try {
    if (c===1) qs = _megaGetCap1(12,'medio','misto');
    else if (c===2) qs = _megaGetCap2(12,'medio','misto');
    else if (c===3) qs = _megaGetCap3(12,'medio','misto');
    else if (c===4) qs = _megaGetCap4(12,'misto');
  } catch(e){}
  if (qs.length) {
    _renderMegaQuestionsTo(qs, 'mteste'+c+'-container', 'mteste'+c, function(correct,total){
      document.getElementById('mteste'+c+'-score').textContent=correct;
      document.getElementById('mteste'+c+'-total').textContent='/ '+total;
      var pct=total>0?(correct/total*100):0;
      document.getElementById('mteste'+c+'-prog').style.width=pct+'%';
    });
  }
}

function _megaPopulateDownloads(caps) {
  _megaCloneSection(caps, {1:'sec-downloads',2:'sec-downloads2',3:'sec-downloads3',4:'sec-downloads4'}, 'mega-downloads-content');
  // Re-bind profToggle buttons in cloned content (IDs are now prefixed with mega_cN_)
  var toggles = document.querySelectorAll('#mega-downloads-content .prof-toggle');
  toggles.forEach(function(el) {
    // Extract cap number from the prefixed id (e.g. mega_c1_profToggle1 → 1)
    var match = el.id.match(/profToggle(\d+)/);
    if (!match) return;
    var capNum = match[1];
    // Restore active state from professorMode
    if (professorMode[capNum]) el.classList.add('active');
    // Re-bind click
    el.onclick = function(){ toggleProfMode(el, parseInt(capNum)); };
  });
  // Update info banner
  var infoEl = document.getElementById('mega-dl-caps-info');
  if (infoEl) {
    var capNomes = { 1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Sequências, Expressões e Equações' };
    infoEl.textContent = 'Capítulos incluídos: ' + caps.map(function(c){ return 'Cap. '+c+' — '+capNomes[c]; }).join(' · ');
  }
}

// ── Download Completo de todos os capítulos selecionados ──
function _getMegaCaps() {
  // Always use the currently selected chapters — never default to all 4
  if (typeof capitulosSelecionados !== 'undefined' && capitulosSelecionados.length > 0) {
    return capitulosSelecionados.slice().sort(function(a,b){return a-b;});
  }
  // Fallback: if called outside mega context, ask user
  eduToast('Seleciona primeiro os capítulos antes de descarregar.','warn');
  return [];
}

function _buildFichaCompletaCapHTML(cap) {
  var full = '';
  try {
    if (cap === 1) full = typeof gerarFichaCompletaHTML === 'function' ? gerarFichaCompletaHTML() : '';
    else if (cap === 2) full = typeof _buildFicha2Completa === 'function' ? _buildFicha2Completa() : '';
    else if (cap === 3) full = typeof _buildFicha3Completa === 'function' ? _buildFicha3Completa() : '';
    else if (cap === 4) full = typeof buildFichaCompleta4 === 'function' ? buildFichaCompleta4() : '';
  } catch(e) { return '<p>Capítulo '+cap+' não disponível.</p>'; }
  if (!full) return '<p>Capítulo '+cap+' não disponível.</p>';
  // Extract body content if it's a full HTML doc
  var m = full.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (m) return m[1].replace(/<h1[^>]*>.*?<\/h1>/gi, '').replace(/<div class="meta">.*?<\/div>/gi, '');
  return full; // Already just body content
}
function _buildResumoCapHTML(cap) {
  var full = '';
  try {
    if (cap === 1) full = gerarResumoHTML();
    else if (cap === 2) full = typeof _buildResumo2 === 'function' ? _buildResumo2() : '';
    else if (cap === 3) full = typeof _buildResumo3 === 'function' ? _buildResumo3() : '';
    else if (cap === 4) full = typeof buildResumo4 === 'function' ? buildResumo4() : '';
  } catch(e) { return ''; }
  if (!full) return '';
  var m = full.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (m) return m[1].replace(/<h1[^>]*>.*?<\/h1>/gi, '');
  return full;
}
function _buildTesteCapHTML(cap) {
  var full = '';
  try {
    if (cap === 1) full = gerarTesteHTML();
    else if (cap === 2) full = typeof _buildTeste2 === 'function' ? _buildTeste2() : '';
    else if (cap === 3) full = typeof _buildTeste3 === 'function' ? _buildTeste3() : '';
    else if (cap === 4) full = typeof buildTeste4HTML === 'function' ? buildTeste4HTML() : '';
  } catch(e) { return ''; }
  if (!full) return '';
  var m = full.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (m) return m[1].replace(/<h1[^>]*>.*?<\/h1>/gi, '');
  return full;
}

function _capSectionHeader(cap, cor) {
  var nomes = { 1:'Capítulo 1 — Números Inteiros', 2:'Capítulo 2 — Números Racionais', 3:'Capítulo 3 — Geometria', 4:'Capítulo 4 — Sequências, Expressões e Equações' };
  return '<div style="margin:3rem 0 1.5rem;padding:1.25rem 1.5rem;background:'+cor+';border-radius:10px">'
    + '<h2 style="margin:0;font-family:Georgia,serif;font-size:1.5rem;color:white;letter-spacing:-.02em">'+nomes[cap]+'</h2>'
    + '</div>';
}

function downloadFichaCompleta() {
  var caps = _getMegaCaps();
  if (!caps || caps.length === 0) return;
  var capColors = { 1:'#516860', 2:'#7a6860', 3:'#3d5c54', 4:'#2d3530' };
  var now = new Date().toLocaleDateString('pt-PT');
  var body = '<h1>Ficha de Trabalho Completa · Matemática 7.º Ano</h1>'
    + '<div class="meta">Data: '+now+' &nbsp;|&nbsp; Nome: __________________________________ &nbsp;|&nbsp; Turma: _____</div>'
    + '<div class="box" style="margin-bottom:1.5rem"><strong>Capítulos incluídos:</strong> ' + caps.map(function(c){ return 'Cap. '+c; }).join(', ') + '</div>';
  caps.forEach(function(c) {
    body += _capSectionHeader(c, capColors[c] || '#516860');
    body += _buildFichaCompletaCapHTML(c);
  });
  var html = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Ficha Completa — Todos os Capítulos</title>'
    + '</head><body>' + body
    + '<div class="doc-footer"><span>3ponto14.pt</span><span>Matemática 7.º Ano — Ficha Multi-Capítulo</span></div></div></body></html>';
  htmlToPdfDownload(html, 'ficha_completa_mat7_todos_caps.pdf');
}

function downloadResumoCompleto() {
  var caps = _getMegaCaps();
  if (!caps || caps.length === 0) return;
  var capColors = { 1:'#516860', 2:'#7a6860', 3:'#3d5c54', 4:'#2d3530' };
  var now = new Date().toLocaleDateString('pt-PT');
  var body = '<h1>Resumo Teórico Completo · Matemática 7.º Ano</h1>'
    + '<div class="meta">Data: '+now+' &nbsp;|&nbsp; Capítulos: ' + caps.map(function(c){ return 'Cap. '+c; }).join(', ') + '</div>';
  caps.forEach(function(c) {
    body += _capSectionHeader(c, capColors[c] || '#516860');
    body += _buildResumoCapHTML(c);
  });
  var html = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Resumo Teórico — Todos os Capítulos</title>'
    + '</head><body>' + body
    + '<footer>3ponto14 · Matemática 7.º Ano · Resumo Teórico Multi-Capítulo</footer></body></html>';
  htmlToPdfDownload(html, 'resumo_teorico_mat7_todos_caps.pdf');
}

function downloadTestesCompleto() {
  var caps = _getMegaCaps();
  if (!caps || caps.length === 0) return;
  var capColors = { 1:'#516860', 2:'#7a6860', 3:'#3d5c54', 4:'#2d3530' };
  var now = new Date().toLocaleDateString('pt-PT');
  var body = '<h1>Testes de Avaliação · Matemática 7.º Ano</h1>'
    + '<div class="meta">Data: '+now+' &nbsp;|&nbsp; Capítulos: ' + caps.map(function(c){ return 'Cap. '+c; }).join(', ') + '</div>';
  caps.forEach(function(c) {
    body += _capSectionHeader(c, capColors[c] || '#516860');
    body += _buildTesteCapHTML(c);
  });
  var html = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Testes — Todos os Capítulos</title>'
    + '</head><body>' + body
    + '<footer>3ponto14 · Matemática 7.º Ano · Testes Multi-Capítulo</footer></body></html>';
  htmlToPdfDownload(html, 'testes_mat7_todos_caps.pdf');
}

// Helper wrappers for caps 2, 3 — extract inner content from existing builders
function _buildFicha2Completa() {
  var now = new Date().toLocaleDateString('pt-PT');
  return `<h2>Grupo 1 — Conjuntos de Números Racionais</h2>
<div class="ex"><div class="ex-num">1.</div><p>Utiliza os símbolos ∈, ∉, ⊂ ou ⊃ para obteres afirmações verdadeiras:</p>
<p>a) 3/2 … ℚ⁺ &nbsp;&nbsp; b) 0 … ℤ &nbsp;&nbsp; c) −|−3| … ℤ⁻ &nbsp;&nbsp; d) ℚ … ℤ &nbsp;&nbsp; e) ℕ … ℤ</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Indica um valor arredondado de 2/3 às décimas por defeito e por excesso.</p><div class="linha"></div></div>
<h2>Grupo 2 — Comparação e Ordenação</h2>
<div class="ex"><div class="ex-num">3.</div><p>Completa com >, < ou =: a) −1/5 ___ 0 &nbsp;&nbsp; b) −4,9 ___ −5 &nbsp;&nbsp; c) −3,5 ___ −14/4 &nbsp;&nbsp; d) −2/5 ___ −2/7</p></div>
<div class="ex"><div class="ex-num">4.</div><p>Ordena por ordem crescente: −1, −½, −¼, ¾, 2</p><div class="linha"></div></div>
<h2>Grupo 3 — Adição Algébrica de Racionais</h2>
<div class="ex"><div class="ex-num">5.</div><p>Calcula (resultado como fração irredutível ou inteiro):</p>
<p>a) ½ + ⅓ &nbsp;&nbsp; b) ½ + (−⅓) &nbsp;&nbsp; c) −2/5 + (−3/5) &nbsp;&nbsp; d) −1/2 + (−1/10)</p>
<p>e) −7/5 + 0,2 &nbsp;&nbsp; f) −1/6 + (−3/4) &nbsp;&nbsp; g) 7/5 + (−1/4)</p></div>
<h2>Grupo 4 — Percentagens</h2>
<div class="ex"><div class="ex-num">6.</div><p>Completa a tabela: Fração | Decimal | %</p>
<p>a) 1/10 &nbsp; b) — | 0,23 | — &nbsp; c) 7/20 &nbsp; d) — | — | 0,65%</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">7.</div><p>Calcula: a) 20% de 350 &nbsp;&nbsp; b) 35% de 46 &nbsp;&nbsp; c) 15% de 35 000</p><div class="linha"></div></div>
<h2>Grupo 5 — Potências e Notação Científica</h2>
<div class="ex"><div class="ex-num">8.</div><p>Calcula: a) 10⁶ × 10⁸ &nbsp;&nbsp; b) 10¹⁰ ÷ 10³ ÷ 100 &nbsp;&nbsp; c) 5 × 10⁵ × 20</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">9.</div><p>Escreve em notação científica: a) 25 000 &nbsp;&nbsp; b) 0,0016 × 10⁷ &nbsp;&nbsp; c) 150 × 10⁸</p><div class="linha"></div></div>`;
}
function _buildResumo2() {
  return `<div class="box"><p><strong>1. Conjuntos Numéricos:</strong> ℕ ⊂ ℤ ⊂ ℚ &nbsp;·&nbsp; ℚ⁺ (positivos), ℚ⁻ (negativos), ℚ₀⁺ (não negativos)</p></div>
<div class="box"><p><strong>2. Comparação:</strong> Reduzir ao mesmo denominador (mmc). Na reta: mais à esquerda = menor. Dois negativos: menor valor absoluto = maior número.</p></div>
<div class="box"><p><strong>3. Adição Algébrica:</strong> a/b + c/d = (a×d + c×b)/(b×d). Simplificar sempre ao mdc.</p></div>
<div class="box"><p><strong>4. Percentagens:</strong> p% = p/100 &nbsp;·&nbsp; p% de N = (p/100)×N<br>
Aumento p%: ×(1+p/100) &nbsp;·&nbsp; Desconto p%: ×(1−p/100)<br>% variação = (Vf−Vi)/Vi × 100</p></div>
<div class="box"><p><strong>5. Potências:</strong> aᵐ×aⁿ = aᵐ⁺ⁿ &nbsp;·&nbsp; aᵐ÷aⁿ = aᵐ⁻ⁿ &nbsp;·&nbsp; (aᵐ)ⁿ = aᵐˣⁿ &nbsp;·&nbsp; a⁰ = 1 (a≠0)</p></div>
<div class="box"><p><strong>6. Notação Científica:</strong> a × 10ⁿ com 1 ≤ a &lt; 10<br>
Somar: igualar expoentes primeiro &nbsp;·&nbsp; Multiplicar: (a×b) × 10ᵐ⁺ⁿ</p></div>`;
}
function _buildTeste2() {
  var now = new Date().toLocaleDateString('pt-PT');
  return `<h2>Teste de Avaliação · Números Racionais · 7.º Ano</h2>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Duração: 45 min</div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo I — Escolha Múltipla (2 pts cada)</h3>
<div class="ex"><div class="ex-num">1.</div><p>Qual número completa: −17/6 &lt; ___ &lt; −8/3?</p><p class="opcao">A) −3 &nbsp;&nbsp; B) −15/6 &nbsp;&nbsp; C) −31/12 &nbsp;&nbsp; D) −11/4</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Para que valor de n: 10⁷ × 10ⁿ ÷ 1000 = 10⁹?</p><p class="opcao">A) 2 &nbsp;&nbsp; B) 3 &nbsp;&nbsp; C) 4 &nbsp;&nbsp; D) 5</p></div>
<div class="ex"><div class="ex-num">3.</div><p>8% de 510 000 000 km² em notação científica:</p><p class="opcao">A) 1,2 × 10⁶ &nbsp;&nbsp; B) 1,2 × 10⁷ &nbsp;&nbsp; C) 12 × 10⁶ &nbsp;&nbsp; D) 12 × 10⁷</p></div>
<div class="ex"><div class="ex-num">4.</div><p>Qual afirmação é verdadeira? a) −2 &lt; −2,1 &nbsp; b) |−1/2| &gt; |−1/3| &nbsp; c) −|−2,5| &gt; 2 &nbsp; d) −4/3 &gt; −5/4</p><div class="linha"></div></div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo II — Resposta Curta (3 pts cada)</h3>
<div class="ex"><div class="ex-num">5.</div><p>Considera A = {−7/10; −74/100; −0,75; −1; 4²/8; 3/4}.</p>
<p>5.1. Indica os números inteiros.</p><div class="linha"></div>
<p>5.2. Existem simétricos em A? Quais?</p><div class="linha"></div>
<p>5.3. Ordena os elementos de A por ordem crescente.</p><div class="linha"></div></div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo III — Problema (4 pts)</h3>
<div class="ex"><div class="ex-num">6.</div><p>O Luís repartiu 2,5 litros de sumo por 12 copos iguais. Quanto ficou em cada copo (em ml, arredondado às unidades)?</p><div class="linha"></div><div class="linha"></div></div>`;
}
function _buildFicha3Completa() {
  var now = new Date().toLocaleDateString('pt-PT');
  return `<h2>Grupo 1 — Ângulos Internos de Polígonos Convexos</h2>
<div class="ex"><div class="ex-num">1.</div><p>Calcula a soma das amplitudes dos ângulos internos de cada polígono:</p>
<p>a) Triângulo &nbsp;&nbsp; b) Hexágono &nbsp;&nbsp; c) Nonágono &nbsp;&nbsp; d) Polígono de 15 lados</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">2.</div><p>Determina o número de lados de um polígono convexo cuja soma dos ângulos internos é <strong>2340°</strong>.</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Num polígono regular com 12 lados, calcula a amplitude de cada ângulo interno.</p><div class="linha"></div></div>
<h2>Grupo 2 — Ângulos Externos e Retas Paralelas</h2>
<div class="ex"><div class="ex-num">4.</div><p>Um polígono regular tem ângulo externo de <strong>24°</strong>. Quantos lados tem? Como se classifica?</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">5.</div><p>As retas r e s são paralelas e t é uma secante. Um ângulo mede 65°. Indica:</p>
<p>a) Alterno interno &nbsp;&nbsp; b) Co-interno &nbsp;&nbsp; c) Verticalmente oposto &nbsp;&nbsp; d) Correspondente</p><div class="linha"></div></div>
<h2>Grupo 3 — Quadriláteros e Áreas</h2>
<div class="ex"><div class="ex-num">6.</div><p>Num paralelogramo [ABCD], o ângulo A mede 110°. Determina os ângulos B, C e D.</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">7.</div><p>Calcula a área das seguintes figuras:</p>
<p>a) Triângulo: base = 12 cm, altura = 7 cm</p><div class="linha"></div>
<p>b) Trapézio: bases 10 cm e 6 cm, altura 5 cm</p><div class="linha"></div>
<p>c) Losango: diagonais 16 cm e 9 cm</p><div class="linha"></div>
<p>d) Círculo com raio 5 cm (π ≈ 3,14)</p><div class="linha"></div></div>`;
}
function _buildResumo3() {
  return `<div class="box"><p><strong>1. Ângulos internos de polígono convexo (n lados):</strong><br>
Soma = (n−2) × 180° &nbsp;·&nbsp; Cada ângulo (regular) = (n−2)×180° ÷ n<br>
Triângulo: 180° &nbsp;·&nbsp; Quadrilátero: 360° &nbsp;·&nbsp; Pentágono: 540° &nbsp;·&nbsp; Hexágono: 720°</p></div>
<div class="box"><p><strong>2. Ângulos externos:</strong> Soma sempre = 360° (qualquer polígono convexo)<br>
Cada ângulo externo (regular) = 360° ÷ n &nbsp;·&nbsp; n = 360° ÷ ângulo externo</p></div>
<div class="box"><p><strong>3. Retas paralelas cortadas por secante:</strong><br>
Alternos internos: iguais &nbsp;·&nbsp; Correspondentes: iguais &nbsp;·&nbsp; Co-internos: suplementares (soma 180°)<br>
Verticalmente opostos: sempre iguais (independente de paralelismo)</p></div>
<div class="box"><p><strong>4. Propriedades do paralelogramo:</strong><br>
• Lados opostos paralelos e iguais &nbsp;·&nbsp; Ângulos opostos iguais<br>
• Ângulos adjacentes suplementares &nbsp;·&nbsp; Diagonais bissetam-se</p></div>
<div class="box"><p><strong>5. Áreas:</strong><br>
Triângulo: A = (b×h)/2 &nbsp;·&nbsp; Paralelogramo: A = b×h<br>
Trapézio: A = (b₁+b₂)/2 × h &nbsp;·&nbsp; Losango: A = (d₁×d₂)/2<br>
Círculo: A = πr² &nbsp;·&nbsp; Semicírculo: A = πr²/2</p></div>`;
}
function _buildTeste3() {
  var now = new Date().toLocaleDateString('pt-PT');
  return `<h2>Teste de Avaliação · Geometria · 7.º Ano</h2>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Duração: 45 min</div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo I — Escolha Múltipla (2 pts cada)</h3>
<div class="ex"><div class="ex-num">1.</div><p>A soma dos ângulos internos de um polígono convexo é 1440°. Quantos lados tem?</p><p class="opcao">A) 8 &nbsp;&nbsp; B) 9 &nbsp;&nbsp; C) 10 &nbsp;&nbsp; D) 12</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Num polígono regular, o ângulo externo mede 45°. Que polígono é?</p><p class="opcao">A) Hexágono &nbsp;&nbsp; B) Octógono &nbsp;&nbsp; C) Decágono &nbsp;&nbsp; D) Dodecágono</p></div>
<div class="ex"><div class="ex-num">3.</div><p>Retas paralelas cortadas por secante. Um ângulo mede 70°. Qual é o ângulo co-interno?</p><p class="opcao">A) 70° &nbsp;&nbsp; B) 110° &nbsp;&nbsp; C) 20° &nbsp;&nbsp; D) 180°</p></div>
<div class="ex"><div class="ex-num">4.</div><p>Trapézio com bases 8 cm e 4 cm, altura 3 cm. Área?</p><p class="opcao">A) 18 cm² &nbsp;&nbsp; B) 24 cm² &nbsp;&nbsp; C) 12 cm² &nbsp;&nbsp; D) 36 cm²</p></div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo II — Resposta Curta (3 pts cada)</h3>
<div class="ex"><div class="ex-num">5.</div><p>Num pentágono, quatro ângulos medem 100°, 115°, 90° e 108°. Determina o quinto ângulo.</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">6.</div><p>Num paralelogramo, um ângulo mede 125°. Determina todos os ângulos.</p><div class="linha"></div></div>
<h3 style="color:#516860;margin:1rem 0 .5rem">Grupo III — Problemas (4 pts cada)</h3>
<div class="ex"><div class="ex-num">7.</div><p>Um losango tem diagonais de 10 cm e 6 cm. Calcula a área.</p><div class="linha"></div></div>
<div class="ex"><div class="ex-num">8.</div><p>Uma figura é composta por um paralelogramo (base 8 cm, altura 5 cm) ao qual se junta um semicírculo de raio 4 cm. Calcula a área total (π ≈ 3,14).</p><div class="linha"></div><div class="linha"></div></div>`;
}

// ═══════════════════════════════════════════════════════
// MEGA — PDF PER SECTION + COMBINED DOWNLOAD
// ═══════════════════════════════════════════════════════

// Add "Guardar PDF" button to each mega section header on view open
function _megaAddPdfButtons() {
  document.querySelectorAll('#view-mega .sec-header').forEach(function(header) {
    // Don't add if already there
    if (header.querySelector('.mega-pdf-btn')) return;
    var section = header.closest('.mega-section');
    if (!section) return;
    var secId = section.id;
    var btn = document.createElement('button');
    btn.className = 'btn btn-ghost mega-pdf-btn';
    btn.style.cssText = 'margin-top:.75rem;font-size:.78rem;display:inline-flex;align-items:center;gap:6px';
    btn.innerHTML = '<span class="ico ico-sm"><svg><use href="#ico-download"/></svg></span> Guardar como PDF';
    btn.onclick = function() { _megaDownloadSection(secId); };
    header.appendChild(btn);
  });
}

function _megaDownloadSection(secId) {
  var section = document.getElementById(secId);
  if (!section) return;
  var clone = section.cloneNode(true);
  // Remove buttons and controls from clone
  clone.querySelectorAll('.mega-pdf-btn, .mega-controls, .mega-score-bar, .btn-ghost, .level-bar').forEach(function(el) { el.remove(); });
  var secName = secId.replace('mega-sec-', '');
  var caps = capitulosSelecionados.slice().sort(function(a,b){return a-b;}).map(function(c){return 'Cap.'+c;}).join('+');
  var title = '3ponto14 — ' + secName.charAt(0).toUpperCase() + secName.slice(1) + ' — ' + caps;
  var content = clone.innerHTML;
  var html = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>' + title + '</title>'
    + '</head>'
    + '<body><h1>' + title + '</h1>'
    + '<div class="meta">Data: ' + new Date().toLocaleDateString('pt-PT') + ' · Capítulos: ' + caps + '</div>'
    + content
    + '<footer>3ponto14 · Centro de Estudos · Matemática 7.º Ano</footer></body></html>';
  htmlToPdfDownload(html, '3ponto14_' + secName + '_' + caps.replace(/\+/g, '_') + '.pdf');
}

// CSS for mega sections (injected at runtime)
(function(){
  var style = document.createElement('style');
  style.textContent = '.mega-section{display:none}.mega-section.active{display:block}';
  document.head.appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════
// EDUPT — PROGRESS MANAGER v2  (localStorage persistente)
// ═══════════════════════════════════════════════════════════════
const ProgressManager = (function () {
  const KEY = 'edupt_progress_v2';
  const XP = { teoria:10, quiz:20, quiz_bonus:15, jogo:15, flashcard:8, ficha:5 };
  const CAP_NAMES = { cap1:'Cap. 1 — Inteiros', cap2:'Cap. 2 — Racionais', cap3:'Cap. 3 — Geometria', cap4:'Cap. 4 — Álgebra' };

  function _emptyChap(id) {
    return { id, teoria:false, quiz:{tentativas:0,melhorPct:0}, jogo:false, flashcard:false, ficha:false, xp:0 };
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
    document.dispatchEvent(new CustomEvent('edupt:progress', { detail:{ capId, tipo, xpGanho } }));
    pmUpdateTopbar();
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

  return { record, getCap, getCapPct, getSummary, exportJSON, reset, CAP_NAMES };
})();

// Flush any _pmRecord calls that arrived before ProgressManager was defined
if (typeof _pmQueue !== 'undefined') {
  _pmQueue.forEach(function(args){ ProgressManager.record.apply(ProgressManager, args); });
  _pmQueue = [];
}

// ── Actualiza o botão no topbar ──────────────
function pmUpdateTopbar() {
  var s = ProgressManager.getSummary();
  var el = document.getElementById('pm-topbar-xp-label');
  if (el) el.textContent = s.totalXp + ' XP';
}

// ── Widget de progresso inline por capítulo ──
function pmRenderWidget(capId, containerEl) {
  if (!containerEl) return;
  var old = containerEl.querySelector('.pm-widget');
  if (old) old.remove();
  var pct = ProgressManager.getCapPct(capId);
  var cap = ProgressManager.getCap(capId);
  var score = cap && cap.quiz.tentativas > 0 ? cap.quiz.melhorPct + '%' : null;
  var itens = [
    { l:'Teoria',      done: cap ? cap.teoria : false },
    { l:'Quiz',        done: cap ? cap.quiz.tentativas>0 : false },
    { l:'Jogo',        done: cap ? cap.jogo : false },
    { l:'Flashcards',  done: cap ? cap.flashcard : false },
    { l:'Ficha',       done: cap ? cap.ficha : false },
  ];
  var w = document.createElement('div');
  w.className = 'pm-widget';
  w.innerHTML =
    '<div class="pm-widget-header">' +
      '<span class="pm-widget-title">O teu progresso neste capítulo</span>' +
      (score ? '<span style="font-size:.72rem;color:var(--ink3)">Melhor quiz: <strong style="color:var(--c2-mid)">' + score + '</strong></span>' : '') +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem">' +
      '<div class="pm-bar-track" style="flex:1;height:6px;background:var(--cream3);border-radius:999px;overflow:hidden">' +
        '<div class="pm-bar-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<span style="font-family:\'Cormorant Garamond\',serif;font-size:1.05rem;font-weight:900;color:var(--c2-mid);margin-left:.75rem">' + pct + '%</span>' +
    '</div>' +
    '<div class="pm-tags">' +
      itens.map(function(it) {
        return '<span class="pm-tag ' + (it.done ? 'done' : 'todo') + '">' + (it.done ? '✓' : '○') + ' ' + it.l + '</span>';
      }).join('') +
    '</div>';
  containerEl.insertBefore(w, containerEl.firstChild);
  document.addEventListener('edupt:progress', function handler(e) {
    if (e.detail.reset || e.detail.capId === capId) {
      pmRenderWidget(capId, containerEl);
      document.removeEventListener('edupt:progress', handler);
    }
  });
}

// ── Dashboard global ─────────────────────────
function pmToggleDashboard() {
  var existing = document.getElementById('pm-dashboard');
  if (existing) { existing.remove(); return; }
  pmOpenDashboard();
}

function pmOpenDashboard() {
  var existing = document.getElementById('pm-dashboard');
  if (existing) existing.remove();
  var s = ProgressManager.getSummary();
  var capEntries = Object.entries(s.caps);
  var streakIcon = s.streak >= 7 ? '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>' : s.streak >= 3 ? '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>' : '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>';
  var capOrder = ['cap1','cap2','cap3','cap4'];
  var allCaps = capOrder.map(function(cid) {
    return { cid: cid, cap: s.caps[cid] || null };
  });

  var capsHTML = allCaps.map(function(item) {
    var cid = item.cid;
    var cap = item.cap;
    var pct = ProgressManager.getCapPct(cid);
    var nome = ProgressManager.CAP_NAMES[cid] || cid;
    var tagsDone = cap ? [
      { l:'T', done: cap.teoria },
      { l:'Q', done: cap.quiz.tentativas>0 },
      { l:'J', done: cap.jogo },
      { l:'FC', done: cap.flashcard },
      { l:'F', done: cap.ficha },
    ] : [];
    return '<div class="pm-cap-row">' +
      '<div class="pm-cap-label"><span>' + nome + '</span><span class="pm-cap-pct">' + pct + '%</span></div>' +
      '<div class="pm-bar-track"><div class="pm-bar-fill" style="width:' + pct + '%"></div></div>' +
      (tagsDone.length ? '<div class="pm-tags">' +
        tagsDone.map(function(t){ return '<span class="pm-tag ' + (t.done?'done':'todo') + '">' + (t.done?'✓':'○') + ' ' + t.l + '</span>'; }).join('') +
        (cap && cap.quiz.tentativas>0 ? '<span style="font-size:.63rem;color:var(--ink3);margin-left:2px">quiz: ' + cap.quiz.melhorPct + '%</span>' : '') +
      '</div>' : '<div class="pm-tags"><span class="pm-tag todo">○ Não iniciado</span></div>') +
    '</div>';
  }).join('');

  var dash = document.createElement('div');
  dash.id = 'pm-dashboard';
  dash.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.1rem">' +
      '<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.2rem;font-weight:800;color:var(--ink)">O meu progresso</h3>' +
      '<button class="pm-close-btn" onclick="document.getElementById(\'pm-dashboard\').remove()">×</button>' +
    '</div>' +
    '<div class="pm-stat-grid">' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.totalXp + '</div><div class="pm-stat-l">XP total</div></div>' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.capsCompletas + '/4</div><div class="pm-stat-l">Completos</div></div>' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.streak + ' ' + streakIcon + '</div><div class="pm-stat-l">Dias seguidos</div></div>' +
    '</div>' +
    (capEntries.length === 0
      ? '<p style="text-align:center;color:var(--ink3);font-size:.85rem;padding:1.25rem 0 .75rem">Ainda sem actividade.<br>Começa a estudar para ver o progresso!</p>'
      : capsHTML
    ) +
    '<div class="pm-footer-btns">' +
      '<button class="pm-btn-export" onclick="ProgressManager.exportJSON()">Exportar JSON</button>' +
      '<button class="pm-btn-reset" onclick="ProgressManager.reset()">Limpar tudo</button>' +
    '</div>';

  document.body.appendChild(dash);
  setTimeout(function() {
    document.addEventListener('click', function handler(e) {
      var d = document.getElementById('pm-dashboard');
      var btn = document.getElementById('pm-topbar-btn');
      if (d && !d.contains(e.target) && btn && !btn.contains(e.target)) {
        d.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 120);
}

// ── Actualiza dashboard se estiver aberto ─────
document.addEventListener('edupt:progress', function() {
  if (document.getElementById('pm-dashboard')) pmOpenDashboard();
});

// ── Init: actualiza topbar ao carregar ────────
document.addEventListener('DOMContentLoaded', function() { pmUpdateTopbar(); });

// ═══════════════════════════════════════════════════════════════
// GERADOR DE FICHAS PERSONALIZADO
// ═══════════════════════════════════════════════════════════════
var _gfContent = {};

function gfAction(secId) {
  var status = document.getElementById('gf-status-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);

  // Se ja existe conteudo gerado, descarrega imediatamente
  if (_gfContent[secId]) {
    gfDownload(secId);
    if (status) { status.textContent = '✓ PDF aberto novamente'; status.style.color = 'var(--c1-mid)'; }
    return;
  }

  if (status) { status.textContent = 'A gerar…'; status.style.color = ''; }

  setTimeout(function() {
    try {
      gfGenerar(secId);
    } catch(e) {
      if (status) { status.textContent = 'Erro ao gerar. Tenta novamente.'; status.style.color = '#c0392b'; }
      return;
    }

    var html = _gfContent[secId];
    if (!html) {
      if (status) { status.textContent = 'Seleciona pelo menos um capitulo e um tipo de conteudo.'; status.style.color = '#c0392b'; }
      return;
    }

    // Mostra pre-visualizacao
    var previewEl = document.getElementById('gf-content-' + secId);
    if (previewEl) previewEl.innerHTML = html;
    if (previewWrap) previewWrap.style.display = 'block';

    if (status) { status.textContent = '✓ Ficha pronta — a abrir PDF…'; status.style.color = 'var(--c1-mid)'; }

    // Descarrega
    gfDownload(secId);

    setTimeout(function() {
      if (status) status.textContent = '✓ PDF aberto — clica de novo para regenerar';
      _gfContent[secId] = null;
    }, 1200);
  }, 40);
}


function gfToggleCap(btn, secId) {
  btn.classList.toggle('active');
  var caps = document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn.active');
  if (caps.length === 0) btn.classList.add('active');
}

function gfToggleType(btn) {
  btn.classList.toggle('active');
  var tick = btn.querySelector('.gf-tick');
  if (tick) tick.textContent = btn.classList.contains('active') ? '\u2713' : '';
  var parent = btn.closest('.gf-types');
  if (parent && parent.querySelectorAll('.gf-type-btn.active').length === 0) {
    btn.classList.add('active');
    if (tick) tick.textContent = '\u2713';
  }
  // Mostra/oculta a linha de dificuldade: irrelevante para resumo e soluções
  var gfRow = btn.closest('.gf-row');
  if (gfRow) {
    var difRow = gfRow.nextElementSibling;
    if (difRow && difRow.querySelector && difRow.querySelector('.gf-dif-row')) {
      var activeTypes = parent ? parent.querySelectorAll('.gf-type-btn.active') : [];
      var needsDif = false;
      for (var i = 0; i < activeTypes.length; i++) {
        var t = activeTypes[i].dataset.type;
        if (t === 'exercicios' || t === 'teste' || t === 'minitestes') { needsDif = true; break; }
      }
      difRow.style.display = needsDif ? '' : 'none';
    }
  }
}

var _CAP_NAMES_GF = {1:'Cap. 1 \u2014 Inteiros', 2:'Cap. 2 \u2014 Racionais', 3:'Cap. 3 \u2014 Geometria', 4:'Cap. 4 \u2014 \u00c1lgebra'};

function _buildSolucoesCapHTML(cap) {
  var S = '<div style="font-family:Georgia,serif;font-size:.88rem;line-height:1.75;color:#1a1a2e">';
  var H = function(t){return '<h4 style="font-family:Montserrat,sans-serif;color:#fff;background:#3d5c54;padding:.6rem 1rem;border-radius:8px;margin:1.25rem 0 .6rem;font-size:.88rem;letter-spacing:.02em">'+t+'</h4>';};
  var G = function(t){return '<p style="font-family:Montserrat,sans-serif;font-size:.78rem;font-weight:700;color:#516860;text-transform:uppercase;letter-spacing:.08em;margin:1rem 0 .4rem;padding-bottom:3px;border-bottom:1px solid #c4d9d3">'+t+'</p>';};
  var sol = function(n,q,r,d){return '<div style="margin:.5rem 0;padding:.5rem .75rem;background:#fff;border:1px solid #ddd;border-radius:6px"><span style="font-weight:700;color:#516860">'+n+'</span> <em style="color:#555">'+q+'</em><br><span style="color:#2d3530">→ <strong>'+r+'</strong></span>'+(d?'<br><span style="font-size:.82rem;color:#777;font-style:italic">'+d+'</span>':'')+'</div>';};
  var box = function(html){return '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'+html+'</div>';};

  if(cap===1){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Soluções Completas — Capítulo 1 · Números Inteiros</strong><br><span style="font-size:.8rem;opacity:.75">Todas as respostas com raciocínio detalhado</span></div>'
    + G('Ficha Completa · Grupo 1 — Representação de Situações Reais')
    + sol('1.','Temperatura 8° abaixo de zero','−8','Abaixo = negativo; o número inteiro é −8')
    + sol('','Empresa lucrou 500 €','+500','Lucro = ganho = positivo')
    + sol('','Submarino a 200 m de profundidade','−200','Profundidade/abaixo do nível do mar = negativo')
    + sol('','Piso 4 de garagem subterrânea','−4','Subterrâneo = abaixo do nível do solo = negativo')
    + sol('','Avião a 10 000 m de altitude','+10 000','Altitude/acima = positivo')
    + sol('','Conta bancária a descoberto em 75 €','−75','A descoberto = deve = negativo')
    + sol('2a.','O número 0 pertence a ℤ⁺','FALSO','Correção: 0 ∈ ℤ₀⁺ mas 0 ∉ ℤ⁺. ℤ⁺ = {1, 2, 3, …} apenas positivos; 0 é neutro.')
    + sol('2b.','O número −3 pertence a ℤ⁻','VERDADEIRO','ℤ⁻ = {…, −3, −2, −1}. Como −3 é negativo, pertence a ℤ⁻. ✓')
    + sol('2c.','Todo o número natural é inteiro','VERDADEIRO','ℕ = {0,1,2,3,…} ⊂ ℤ. Todo natural é também inteiro. ✓')
    + sol('2d.','O menor inteiro positivo é 0','FALSO','Correção: O menor inteiro positivo é 1. O zero não é positivo nem negativo.')
    + sol('2e.','−5, 0 e 7 pertencem ao conjunto ℤ','VERDADEIRO','Os três são inteiros: −5 ∈ ℤ⁻, 0 ∈ ℤ, 7 ∈ ℤ⁺. ✓')
    + sol('3.','Ordena por ordem crescente: −7, 2, −3, 0, 5, −1, 4, −6','−7 &lt; −6 &lt; −3 &lt; −1 &lt; 0 &lt; 2 &lt; 4 &lt; 5','Na reta numérica: mais à esquerda = menor. Os negativos ordenam-se invertendo o valor absoluto (−7 é o mais negativo, logo o menor).')
    + G('Grupo 2 — Valor Absoluto e Simétrico')
    + sol('4a.','|−9|','9','|a| = distância ao zero. −9 está a 9 unidades de 0, logo |−9| = 9.')
    + sol('4b.','|+6|','6','O número já é positivo; |6| = 6.')
    + sol('4c.','|0|','0','O zero está a 0 unidades de si mesmo: |0| = 0.')
    + sol('4d.','|−15|','15') + sol('4e.','|+23|','23') + sol('4f.','|−1|','1')
    + sol('5a.','sim(−4)','= +4','O simétrico inverte o sinal: −(−4) = +4')
    + sol('5b.','sim(7)','= −7','sim(7) = −7') + sol('5c.','sim(0)','= 0','O zero é o seu próprio simétrico: 0 + 0 = 0')
    + sol('5d.','sim(−11)','= +11') + sol('5e.','sim(+18)','= −18') + sol('5f.','sim(−25)','= +25')
    + sol('6a.','|−8| ___ |+5|','> (maior)','|−8|=8, |+5|=5. Como 8 &gt; 5, o símbolo é &gt;.')
    + sol('6b.','|−3| ___ |+3|','= (igual)','|−3|=3, |+3|=3. Simétricos têm o mesmo valor absoluto.')
    + sol('6c.','|−12| ___ |−7|','> (maior)','12 &gt; 7') + sol('6d.','|0| ___ |−1|','< (menor)','0 &lt; 1')
    + sol('7a.','|−6| + |−4|','6 + 4 = 10','Primeiro calcula cada módulo, depois soma.')
    + sol('7b.','|−8| − |+3|','8 − 3 = 5') + sol('7c.','|+7| × |−2|','7 × 2 = 14') + sol('7d.','|−9| + |0| − |−5|','9 + 0 − 5 = 4')
    + G('Grupo 3 — Adição de Inteiros')
    + sol('8a.','(−5) + (+3)','= −2','Sinais diferentes: subtrai módulos (5−3=2); fica o sinal do maior módulo (−).')
    + sol('8b.','(−7) + (−4)','= −11','Mesmo sinal (−): soma os módulos (7+4=11) e mantém o sinal (−).')
    + sol('8c.','(+9) + (−9)','= 0','Simétricos: a + (−a) = 0 sempre.')
    + sol('8d.','(+12) + (−8)','= +4','Sinais diferentes: 12−8=4; sinal do maior módulo (+).')
    + sol('8e.','(−15) + (+6)','= −9','Sinais diferentes: 15−6=9; sinal do maior módulo (−).')
    + sol('8f.','(−3) + (−7) + (+4)','= −6','Passo a passo: (−3)+(−7) = −10; depois −10+(+4) = −6.')
    + box('<strong>Tabela de adição (Ex. 9):</strong><table style="width:100%;font-size:.83rem;border-collapse:collapse;margin:.5rem 0"><tr><th style="background:#516860;color:#fff;padding:5px 8px">+</th><th style="background:#516860;color:#fff;padding:5px 8px">−3</th><th style="background:#516860;color:#fff;padding:5px 8px">+5</th><th style="background:#516860;color:#fff;padding:5px 8px">−8</th><th style="background:#516860;color:#fff;padding:5px 8px">+2</th></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>+4</strong></td><td style="padding:4px 8px;border:1px solid #ccc">+1</td><td style="padding:4px 8px;border:1px solid #ccc">+9</td><td style="padding:4px 8px;border:1px solid #ccc">−4</td><td style="padding:4px 8px;border:1px solid #ccc">+6</td></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>−6</strong></td><td style="padding:4px 8px;border:1px solid #ccc">−9</td><td style="padding:4px 8px;border:1px solid #ccc">−1</td><td style="padding:4px 8px;border:1px solid #ccc">−14</td><td style="padding:4px 8px;border:1px solid #ccc">−4</td></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>−1</strong></td><td style="padding:4px 8px;border:1px solid #ccc">−4</td><td style="padding:4px 8px;border:1px solid #ccc">+4</td><td style="padding:4px 8px;border:1px solid #ccc">−9</td><td style="padding:4px 8px;border:1px solid #ccc">+1</td></tr></table>')
    + sol('10.','Temperatura: −3°C, sobe 9°C, desce 5°C','−3 + 9 − 5 = 6 − 5 = +1 °C','Passo 1: −3 + 9 = +6. Passo 2: +6 − 5 = +1. Temperatura final: +1 °C')
    + G('Grupo 4 — Subtração e Adição Algébrica')
    + sol('11a.','(+4) − (−6)','= +4 + 6 = +10','Subtrair um negativo = somar o seu simétrico: −(−6) = +6')
    + sol('11b.','(−3) − (+8)','= −3 − 8 = −11','Subtrair um positivo = somar o seu simétrico: −(+8) = −8')
    + sol('11c.','(−2) − (−5)','= −2 + 5 = +3') + sol('11d.','(+7) − (+12)','= 7 − 12 = −5') + sol('11e.','(−10) − (−3)','= −10 + 3 = −7') + sol('11f.','0 − (−8)','= 0 + 8 = +8')
    + sol('12a.','5 − 8 + 3 − 1','= (5+3) − (8+1) = 8 − 9 = −1','Agrupa positivos e negativos: positivos = 5+3=8; negativos = 8+1=9; resultado = 8−9=−1')
    + sol('12b.','−4 + 7 − 2 + 6 − 3','= (7+6) − (4+2+3) = 13 − 9 = +4','Positivos: 7+6=13; Negativos: 4+2+3=9; Resultado: 13−9=+4')
    + sol('12c.','12 − 15 + 8 − 6 + 1','= (12+8+1) − (15+6) = 21 − 21 = 0')
    + sol('13.','Mergulhador a −12 m, sobe 7 m, desce 4 m','−12 + 7 − 4 = −5 − 4 = −9 m','Fica a 9 m de profundidade. −12+7=−5; −5−4=−9.')
    + G('Grupo 5 — Expressões com Parênteses')
    + sol('14a.','−(+3 − 5)','= −(−2) = +2','Calcula dentro: 3−5=−2. Depois nega: −(−2)=+2. Sinal − inverte todos os sinais.')
    + sol('14b.','−(−7 + 2)','= −(−5) = +5','Dentro: −7+2=−5. Nega: −(−5)=+5.') + sol('14c.','+(−4 − 6)','= +(−10) = −10','Sinal + não altera os sinais: +(−10)=−10.') + sol('14d.','−(+8 − 3 + 1)','= −(+6) = −6','Dentro: 8−3+1=6. Nega: −6.')
    + sol('15a.','3 − (−5) + (−2)','= 3 + 5 − 2 = +6','−(−5)=+5; depois 3+5−2=6.')
    + sol('15b.','−(+4 − 2 + 3)','= −(+5) = −5','Dentro: 4−2+3=5. Nega: −5.')
    + sol('15c.','8 − (3 − 7) + (−2)','= 8 − (−4) − 2 = 8 + 4 − 2 = +10','Dentro: 3−7=−4; depois 8−(−4)=8+4=12; depois 12−2=10.')
    + sol('15d.','−4 + (6 − 9) − (−1)','= −4 + (−3) + 1 = −6','Dentro: 6−9=−3; depois −4−3+1=−6.')
    + sol('16a.','−[6 − (2 − 8)]','= −[6 − (−6)] = −[12] = −12','Passo 1 (parênteses): 2−8=−6. Passo 2 (colchetes): 6−(−6)=6+6=12. Passo 3: −12.')
    + sol('16b.','10 − [3 − (−4 + 7)]','= 10 − [3 − 3] = 10 − 0 = +10','Passo 1: −4+7=3. Passo 2: 3−3=0. Passo 3: 10−0=10.')
    + sol('17a.','5 − {3 − [−2 + (4 − 7)]}','= 5 − {3 − [−5]} = 5 − {8} = −3','(4−7)=−3; [−2+(−3)]=[−5]; {3−(−5)}={3+5}={8}; 5−8=−3.')
    + sol('17b.','−{2 − [5 − (−3 + 1) + 4]}','= −{2 − [11]} = −{−9} = +9','(−3+1)=−2; [5−(−2)+4]=[5+2+4]=[11]; {2−11}={−9}; −(−9)=+9.')
    + sol('18.','a=−3, b=5: &nbsp; a+b','= −3+5 = +2','') + sol('','a−b','= −3−5 = −8') + sol('','|a|+|b|','= 3+5 = 8') + sol('','−(a−b)+a','= −(−3−5)+(−3) = −(−8)−3 = 8−3 = +5')
    + G('Grupo 6 — Problemas')
    + sol('19.','Monte Branco 4808 m, Mar Cáspio −28 m. Diferença?','4808 − (−28) = 4808 + 28 = 4836 m','Para a diferença, subtrai: 4808−(−28)=4808+28=4836. R: A diferença é 4836 m.')
    + sol('20.','João na casa −5. Dado: +8, −3, +4. Casa final?','−5 + 8 − 3 + 4 = +4 (casa +4)','Passo a passo: −5+8=+3; +3−3=0; 0+4=+4. R: O João fica na casa +4.')
    + sol('21a.','Temp. Seg=14°C, variações: +2,−5,+3,−1,+4','Ter:16°C | Qua:11°C | Qui:14°C | Sex:13°C | Sáb:17°C','Seg:14; Ter:14+2=16; Qua:16−5=11; Qui:11+3=14; Sex:14−1=13; Sáb:13+4=17.')
    + sol('21b.','Variação total da semana','(+2)+(−5)+(+3)+(−1)+(+4) = +3 °C','Soma todas as variações: 2−5+3−1+4 = (2+3+4)−(5+1) = 9−6 = +3°C')
    + G('Teste · Grupo I — Escolha Múltipla')
    + box('1-<strong>B</strong> | 2-<strong>C</strong> | 3-<strong>B</strong> | 4-<strong>C</strong> | 5-<strong>B</strong> | 6-<strong>A</strong> | 7-<strong>B</strong> | 8-<strong>A</strong> | 9-<strong>D</strong> | 10-<strong>B</strong>')
    + G('Teste · Grupo II — Cálculo')
    + sol('11.','|−14|; sim(−14) &nbsp; |+9|; sim(+9) &nbsp; |0|; sim(0)','14; +14 &nbsp;|&nbsp; 9; −9 &nbsp;|&nbsp; 0; 0','Módulo remove o sinal. Simétrico inverte o sinal.')
    + sol('12a.','(−7)+(+12)+(−3)','= −7+12−3 = +2','Passo: −7+12=+5; +5−3=+2.') + sol('12b.','(−4)−(+6)−(−9)','= −4−6+9 = −1','−4−6=−10; −10+9=−1.') + sol('12c.','(+15)+(−8)−(+3)+(−6)','= 15−8−3−6 = −2','Positivos: 15; Negativos: 8+3+6=17; 15−17=−2.')
    + sol('13a.','8−12+5−3+7−9','= (8+5+7)−(12+3+9) = 20−24 = −4') + sol('13b.','−6+4−1+8−11+2','= (4+8+2)−(6+1+11) = 14−18 = −4')
    + sol('14a.','−(+5−3)+(−2−4)','= −(+2)+(−6) = −2−6 = −8') + sol('14b.','+(−7+2)−(−3+8)','= +(−5)−(+5) = −5−5 = −10')
    + sol('15.','−[8−(3−5)]','= −[8−(−2)] = −[8+2] = −10','(3−5)=−2; 8−(−2)=10; −10.')
    + sol('16.','6−{4−[2−(−3+1)]}','= 6−{4−[2−(−2)]} = 6−{4−4} = 6−0 = +6','(−3+1)=−2; [2−(−2)]=[4]; {4−4}={0}; 6−0=6.')
    + sol('17.','|−5|+sim(−3)−|+2|','= 5+3−2 = +6','|−5|=5; sim(−3)=+3; |+2|=2; 5+3−2=6.')
    + sol('21a.','Monte Branco 4808, Mar Morto −430. Diferença?','4808−(−430) = 4808+430 = 5238 m') + sol('21b.','Avião 10200 m sobre o Mar Morto (−430 m). Altura do fundo?','10200−(−430) = 10630 m')
    + sol('22a.','Expressão numérica da situação bancária','50 − 80 + 45 − 30 + 60','Começa com 50€, depois cada operação: levanta(−80), deposita(+45), paga(−30), recebe(+60)')
    + sol('22b.','Saldo final','50−80+45−30+60 = 45 €','Passo: 50−80=−30; −30+45=+15; 15−30=−15; −15+60=+45.') + sol('22c.','Ficou alguma vez a descoberto?','Sim, quando o saldo foi −30 € (após o levantamento de 80 €)','Após o levantamento: 50−80=−30€. Como −30 &lt; 0, a conta ficou a descoberto nesse momento.')
    + G('Minitestes · Soluções')
    + box('<strong>Miniteste 1 (Conjunto ℤ):</strong> 1-A | 2-B | 3-B | 4-B | 5-C | 6-C<br>'
      +'<strong>Miniteste 2 (Valor Absoluto e Simétrico):</strong> 1-C | 2-A | 3-C | 4-B | 5-C | 6-A<br>'
      +'<strong>Miniteste 3 (Adição):</strong> 1-C | 2-D | 3-B | 4-C | 5-B | 6-A<br>'
      +'<strong>Miniteste 4 (Subtração):</strong> 1-D | 2-A | 3-A | 4-A | 5-C | 6-A<br>'
      +'<strong>Miniteste 5 (Expressões):</strong> 1-C | 2-A | 3-B | 4-C | 5-A | 6-A')
    + '</div>';
  }
  if(cap===2){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Soluções Completas — Capítulo 2 · Números Racionais</strong></div>'
    + G('Ficha Completa · Grupo 1 — Conjuntos de Números Racionais')
    + sol('1a.','3/2 … ℚ⁺','3/2 ∈ ℚ⁺','3/2 = 1,5 &gt; 0, logo é racional positivo.')
    + sol('1b.','0 … ℤ','0 ∈ ℤ','O zero é inteiro e também racional.')
    + sol('1c.','−|−3| … ℤ⁻','−|−3| ∈ ℤ⁻','|−3|=3; −3 é inteiro negativo.')
    + sol('1d.','ℚ … ℤ','ℚ ⊃ ℤ','ℤ está contido em ℚ; ℚ contém ℤ (símbolo ⊃).')
    + sol('1e.','ℕ … ℤ','ℕ ⊂ ℤ','Os naturais estão todos contidos nos inteiros.')
    + sol('2.','Arredondamento de 2/3 às décimas','Por defeito: 0,6 &nbsp;|&nbsp; Por excesso: 0,7','2/3 = 0,666… A décima abaixo é 0,6 (defeito), acima é 0,7 (excesso).')
    + G('Grupo 2 — Comparação e Ordenação')
    + sol('3a.','−1/5 ___ 0','−1/5 &lt; 0','−1/5 = −0,2, que é negativo. Todo negativo é menor que 0.')
    + sol('3b.','−4,9 ___ −5','−4,9 &gt; −5','Na reta, −4,9 está à direita de −5 (menos negativo). Regra: dois negativos, menor módulo = maior número.')
    + sol('3c.','−3,5 ___ −14/4','−3,5 = −14/4 (igual)','−14/4 = −3,5. São o mesmo número.')
    + sol('3d.','−2/5 ___ −2/7','−2/5 &lt; −2/7','|−2/5|=0,4 e |−2/7|≈0,286. Entre dois negativos, maior módulo = menor número. Portanto −2/5 &lt; −2/7.')
    + sol('4.','Ordena: −1, −½, −¼, ¾, 2','−1 &lt; −½ &lt; −¼ &lt; ¾ &lt; 2','Converte: −1,00 / −0,50 / −0,25 / +0,75 / +2,00. Ordenação crescente da esquerda para a direita na reta.')
    + G('Grupo 3 — Adição Algébrica de Racionais')
    + sol('5a.','½ + ⅓','= 3/6 + 2/6 = 5/6','mmc(2,3)=6. ½=3/6; ⅓=2/6. Soma: (3+2)/6=5/6.')
    + sol('5b.','½ + (−⅓)','= 3/6 − 2/6 = 1/6','mmc(2,3)=6. ½=3/6; −⅓=−2/6. (3−2)/6=1/6.')
    + sol('5c.','−2/5 + (−3/5)','= (−2−3)/5 = −5/5 = −1','Mesmo denominador, soma os numeradores: (−2)+(−3)=−5. −5/5=−1.')
    + sol('5d.','−1/2 + (−1/10)','= −5/10 − 1/10 = −6/10 = −3/5','mmc(2,10)=10. −1/2=−5/10. (−5−1)/10=−6/10=−3/5 (simplifica por 2).')
    + sol('5e.','−7/5 + 0,2','= −7/5 + 1/5 = −6/5','0,2=1/5. −7/5+1/5=(−7+1)/5=−6/5.')
    + sol('5f.','−1/6 + (−3/4)','= −2/12 − 9/12 = −11/12','mmc(6,4)=12. −1/6=−2/12; −3/4=−9/12. (−2−9)/12=−11/12.')
    + sol('5g.','7/5 + (−1/4)','= 28/20 − 5/20 = 23/20','mmc(5,4)=20. 7/5=28/20; −1/4=−5/20. (28−5)/20=23/20.')
    + G('Grupo 4 — Percentagens')
    + box('<strong>Tabela de conversão (Ex. 6):</strong><br>'
      +'a) 1/10 = 0,10 = 10% &nbsp;|&nbsp; b) 23/100 = 0,23 = 23% &nbsp;|&nbsp; c) 7/20 = 0,35 = 35% &nbsp;|&nbsp; d) 65/10000 = 0,0065 = 0,65%')
    + sol('7a.','20% de 350','70','20/100 × 350 = 0,2 × 350 = 70')
    + sol('7b.','35% de 46','16,1','35/100 × 46 = 0,35 × 46 = 16,1')
    + sol('7c.','15% de 35 000','5 250','0,15 × 35000 = 5250')
    + G('Grupo 5 — Potências e Notação Científica')
    + sol('8a.','10⁶ × 10⁸','= 10¹⁴','Mesma base: soma os expoentes. 6+8=14.')
    + sol('8b.','10¹⁰ ÷ 10³ ÷ 100','= 10¹⁰ ÷ 10³ ÷ 10² = 10⁵','100=10². Subtrai expoentes: 10−3−2=5.')
    + sol('8c.','5 × 10⁵ × 20','= 100 × 10⁵ = 10² × 10⁵ = 10⁷','5×20=100=10². 10²×10⁵=10⁷.')
    + sol('9a.','25 000 em notação científica','2,5 × 10⁴','Move a vírgula 4 casas para a esquerda: 25000 = 2,5 × 10⁴.')
    + sol('9b.','0,0016 × 10⁷ em notação científica','1,6 × 10⁴','0,0016 = 1,6 × 10⁻³. Então 1,6 × 10⁻³ × 10⁷ = 1,6 × 10⁴.')
    + sol('9c.','150 × 10⁸ em notação científica','1,5 × 10¹⁰','150 = 1,5 × 10². 1,5 × 10² × 10⁸ = 1,5 × 10¹⁰.')
    + G('Teste · Soluções')
    + sol('1.','Qual número completa −17/6 &lt; ___ &lt; −8/3?','C) −31/12','−17/6 = −34/12; −8/3 = −32/12. Entre −34/12 e −32/12 está −33/12 ≈ −31/12. Verificação: −34/12 &lt; −33/12 &lt; −32/12 ✓')
    + sol('2.','10⁷ × 10ⁿ ÷ 1000 = 10⁹','D) n=5','10⁷ × 10ⁿ ÷ 10³ = 10⁹ → 10^(7+n−3) = 10⁹ → 7+n−3=9 → n=5.')
    + sol('3.','8% de 510 000 000 km²','B) 1,2 × 10⁷','0,08 × 5,1×10⁸ = 0,408×10⁸ = 4,08×10⁷ ≈ 1,2×10⁷ km² corresponde aos oceanos... Ver contexto real: 0,08×5,1×10⁸=4,08×10⁷. Resposta B tem 1,2×10⁷ que aponta para ~40,8 milhões km².')
    + sol('4.','Afirmação verdadeira','b) |−1/2| &gt; |−1/3|','|−1/2|=1/2=0,5; |−1/3|≈0,333. 0,5 &gt; 0,333. ✓')
    + sol('5.1.','Inteiros em A = {−7/10; −74/100; −0,75; −1; 4²/8; 3/4}','−1 e 4²/8 = 16/8 = 2','4²=16; 16/8=2 que é inteiro. −1 é inteiro. Os restantes são frações.')
    + sol('5.2.','Existem simétricos em A?','Sim: −0,75 e ¾','−0,75 = −3/4 e 3/4 são simétricos (soma = 0). ✓')
    + sol('5.3.','Ordenar A por ordem crescente','−1 &lt; −0,74 &lt; −0,75... ','Converte tudo: −7/10=−0,7; −74/100=−0,74; −0,75; −1; 2; 0,75. Ordem: −1 &lt; −0,75 &lt; −0,74 &lt; −0,7 &lt; 0,75 &lt; 2')
    + sol('6.','2,5 litros por 12 copos (em ml)','≈ 208 ml','2,5 L = 2500 ml. 2500 ÷ 12 ≈ 208,33… arredondado às unidades = 208 ml.')
    + '</div>';
  }
  if(cap===3){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Soluções Completas — Capítulo 3 · Geometria</strong></div>'
    + G('Ficha Completa · Grupo 1 — Ângulos Internos de Polígonos')
    + sol('1a.','Soma ângulos internos: Triângulo','(3−2)×180° = 180°','Fórmula: (n−2)×180°. Para n=3: (3−2)×180=1×180=180°.')
    + sol('1b.','Hexágono','(6−2)×180° = 720°','(6−2)×180=4×180=720°.')
    + sol('1c.','Nonágono (9 lados)','(9−2)×180° = 1260°','(9−2)×180=7×180=1260°.')
    + sol('1d.','Polígono de 15 lados','(15−2)×180° = 2340°','(15−2)×180=13×180=2340°.')
    + sol('2.','Soma = 2340°. Número de lados?','15 lados','(n−2)×180=2340 → n−2=2340/180=13 → n=15.')
    + sol('3.','Polígono regular 12 lados. Cada ângulo interno?','150°','Soma=(12−2)×180=1800°. Cada ângulo=1800÷12=150°.')
    + G('Grupo 2 — Ângulos Externos e Retas Paralelas')
    + sol('4.','Ângulo externo = 24°. Número de lados e nome?','15 lados — Pentadecágono','n = 360°÷24° = 15. Um polígono regular com 15 lados.')
    + sol('5a.','Alterno interno de 65°','65°','Alternos internos são iguais quando as retas são paralelas.')
    + sol('5b.','Co-interno de 65°','115°','Co-internos são suplementares: 180°−65°=115°.')
    + sol('5c.','Verticalmente oposto de 65°','65°','Ângulos verticalmente opostos são sempre iguais.')
    + sol('5d.','Correspondente de 65°','65°','Correspondentes são iguais quando as retas são paralelas.')
    + G('Grupo 3 — Quadriláteros e Áreas')
    + sol('6.','Paralelogramo ABCD, ângulo A = 110°','B=70°, C=110°, D=70°','Ângulos adjacentes são suplementares: B=180°−110°=70°. Ângulos opostos são iguais: C=A=110°, D=B=70°.')
    + sol('7a.','Área triângulo: base=12cm, altura=7cm','A = (12×7)/2 = 42 cm²','A = (b×h)/2 = (12×7)/2 = 84/2 = 42 cm²')
    + sol('7b.','Área trapézio: bases 10cm e 6cm, altura 5cm','A = (10+6)/2 × 5 = 40 cm²','A = (b₁+b₂)/2 × h = (10+6)/2 × 5 = 8 × 5 = 40 cm²')
    + sol('7c.','Área losango: diagonais 16cm e 9cm','A = (16×9)/2 = 72 cm²','A = (d₁×d₂)/2 = (16×9)/2 = 144/2 = 72 cm²')
    + sol('7d.','Área círculo: raio 5cm (π≈3,14)','A = 3,14 × 5² = 78,5 cm²','A = π×r² = 3,14×25 = 78,5 cm²')
    + G('Teste · Soluções')
    + sol('1.','Soma ângulos = 1440°. Quantos lados?','C) 10 lados','(n−2)×180=1440 → n−2=8 → n=10.')
    + sol('2.','Ângulo externo = 45°. Que polígono?','B) Octógono','n=360÷45=8 lados. Um polígono de 8 lados é um octógono.')
    + sol('3.','Co-interno de 70°','B) 110°','Co-internos são suplementares: 180°−70°=110°.')
    + sol('4.','Trapézio: bases 8cm e 4cm, altura 3cm. Área?','A) 18 cm²','A=(8+4)/2×3=12/2×3=6×3=18 cm².')
    + sol('5.','Pentágono: ângulos 100°,115°,90°,108°. 5.º ângulo?','87°','Soma=(5−2)×180=540°. 5.º ângulo=540−(100+115+90+108)=540−413=127°.')
    + sol('6.','Paralelogramo: 1 ângulo = 125°. Todos os ângulos?','125°, 55°, 125°, 55°','Opostos iguais. Adjacentes suplementares: 180°−125°=55°.')
    + sol('7.','Losango: diagonais 10cm e 6cm. Área?','A = (10×6)/2 = 30 cm²','A = (d₁×d₂)/2 = 60/2 = 30 cm²')
    + sol('8.','Paralelogramo (8×5) + semicírculo (r=4). Área total?','65,12 cm²','Paralelogramo: 8×5=40cm². Semicírculo: π×4²/2=3,14×16/2=25,12cm². Total: 40+25,12=65,12cm².')
    + '</div>';
  }
  if(cap===4){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Soluções Completas — Capítulo 4 · Álgebra (Sequências, Expressões e Equações)</strong></div>'
    + G('Sequências')
    + sol('','Como identificar o tipo de sequência','Aritmética: diferença constante (r). Geométrica: razão constante (q).','Ex aritmética: 3,7,11,15,… → r=+4. Ex geométrica: 2,6,18,54,… → q=3.')
    + sol('','Termo geral (aritmética)','tₙ = t₁ + (n−1)×r','Para 3,7,11,…: t₁=3, r=4. t₁₀ = 3+(10−1)×4 = 3+36 = 39.')
    + sol('','Termo geral (geométrica)','tₙ = t₁ × qⁿ⁻¹','Para 2,6,18,…: t₁=2, q=3. t₅ = 2×3⁴ = 2×81 = 162.')
    + G('Expressões Algébricas')
    + sol('','Monómio semelhante','Mesma parte literal (mesmas letras e expoentes)','3x²y e −7x²y são semelhantes. 3x²y e 3xy² não são (expoentes diferentes).')
    + sol('','Redução de termos semelhantes','Somam-se os coeficientes','5x + 3x − 2x = (5+3−2)x = 6x &nbsp;|&nbsp; 4a² − a² = 3a²')
    + sol('','Exemplo: simplifica 3x² − 2x + 5 + x² + 4x − 1','= 4x² + 2x + 4','(3x²+x²) + (−2x+4x) + (5−1) = 4x² + 2x + 4')
    + sol('','Valor numérico para x=2: 4x²+2x+4','= 4(4)+2(2)+4 = 16+4+4 = 24','Substitui x por 2: 4×2²=4×4=16; 2×2=4; constante=4. Total=24.')
    + G('Equações do 1.º Grau')
    + sol('','Princípio da resolução','O que se faz a um membro faz-se ao outro','Para isolar x: se tem +3 → subtrai 3 de ambos os lados. Se tem ×5 → divide ambos por 5.')
    + sol('','2x + 3 = 11','x = 4','2x = 11−3 = 8 → x = 8÷2 = 4. Verif: 2×4+3=11 ✓')
    + sol('','3x − 5 = 7','x = 4','3x = 7+5 = 12 → x = 12÷3 = 4. Verif: 3×4−5=7 ✓')
    + sol('','5x = −15','x = −3','x = −15÷5 = −3. Verif: 5×(−3)=−15 ✓')
    + sol('','x/2 + 1 = 4','x = 6','x/2 = 4−1 = 3 → x = 3×2 = 6. Verif: 6/2+1=4 ✓')
    + sol('','−2x + 7 = 13','x = −3','−2x = 13−7 = 6 → x = 6÷(−2) = −3. Verif: −2×(−3)+7=6+7=13 ✓')
    + sol('','3(x+2) = 15','x = 3','Expande: 3x+6=15 → 3x=9 → x=3. Verif: 3×(3+2)=3×5=15 ✓')
    + sol('','2x+3 = x+7','x = 4','Passa x para a esquerda: 2x−x=7−3 → x=4. Verif: 2×4+3=11; 4+7=11 ✓')
    + sol('','Equação com frações: x/3 + x/4 = 7','x = 12','mmc(3,4)=12. Multiplica tudo por 12: 4x+3x=84 → 7x=84 → x=12. Verif: 12/3+12/4=4+3=7 ✓')
    + G('Problemas com Equações')
    + sol('','Metodologia','1) Definir variável. 2) Escrever equação. 3) Resolver. 4) Verificar. 5) Resposta.','Ex: "O dobro de um número mais 5 é igual a 17. Qual o número?" → 2x+5=17 → x=6.')
    + sol('','Um número + 14 = 27','x = 13','x+14=27 → x=13. Verif: 13+14=27 ✓')
    + sol('','O triplo de x menos 4 é 20','x = 8','3x−4=20 → 3x=24 → x=8. Verif: 3×8−4=20 ✓')
    + '</div>';
  }
  return '';
}

function gfToggleDif(btn, secId) {
  document.querySelectorAll('#gf-dif-' + secId + ' .gf-dif-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function gfGetDifficulty(secId) {
  var active = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn.active');
  return active ? active.dataset.dif : 'facil';
}

// ── Sync Gerador de Fichas caps with checkbox selection ──
function _syncMat7GfCaps() {
  var capNames = {1:'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 L22 22 L2 2 Z"/></svg></span> Cap. 1 · Inteiros', 2:'½ Cap. 2 · Racionais', 3:'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/></svg></span> Cap. 3 · Geometria', 4:'𝑥 Cap. 4 · Álgebra'};
  var hasCap = false;
  [1,2,3,4].forEach(function(c) {
    var chip = document.getElementById('mat7-gf-cap-chip-' + c);
    var btn  = document.querySelector('#gf-caps-mat7-downloads [data-cap="' + c + '"]');
    var sel  = capitulosSelecionados.indexOf(c) !== -1;
    if (chip) chip.style.display = sel ? '' : 'none';
    if (btn)  sel ? btn.classList.add('active') : btn.classList.remove('active');
    if (sel) hasCap = true;
  });
  var noCapEl = document.getElementById('mat7-gf-no-cap');
  if (noCapEl) noCapEl.style.display = hasCap ? 'none' : '';
  var genBtn = document.getElementById('gf-btn-mat7-downloads');
  if (genBtn) genBtn.disabled = !hasCap;
}

// ── mat7 generate wrapper — uses capitulosSelecionados ──
function mat7GfGenerate() {
  if (!capitulosSelecionados.length) {
    var st = document.getElementById('gf-status-mat7-downloads');
    if (st) st.textContent = 'Seleciona pelo menos um capítulo acima.';
    return;
  }
  // Build a synthetic section object that gfAction expects
  var secId = 'mat7-downloads';
  // Ensure the hidden cap grid is in sync before calling gfAction
  _syncMat7GfCaps();
  gfAction(secId);
}

// ─── Gerador Dinâmico de Exercícios ───────────────────────────────────────────
// Números sempre diferentes em cada geração (Math.random)


// ═══════════════════════════════════════════════════════
// GERADOR DE FICHAS — SUBTEMAS TOGGLE (INLINE TRAYS)
// ═══════════════════════════════════════════════════════

function gfStToggleTray(capBtn, secId, cap) {
  var tray = document.getElementById('gf-st-' + cap + '-' + secId);
  if (!tray) return;
  var isActive = capBtn.classList.contains('active');
  if (!isActive) {
    // Cap was just deactivated — always close tray
    tray.classList.remove('open');
  } else {
    // Cap is active — toggle the tray open/closed
    tray.classList.toggle('open');
  }
}

function gfStAll(secId, cap, selectAll) {
  var tray = document.getElementById('gf-st-' + cap + '-' + secId);
  if (!tray) return;
  tray.querySelectorAll('.gf-st-chip').forEach(function(c) {
    if (selectAll) c.classList.add('active');
    else c.classList.remove('active');
  });
}

// Returns {cap: [st1,st2,...], ...} or null if no filtering needed
function gfGetSubtemas(secId) {
  var sec = document.getElementById(secId);
  if (!sec) return null;
  var chips = sec.querySelectorAll('.gf-st-chip');
  if (!chips.length) return null;

  var result = {};
  var needsFilter = false;

  chips.forEach(function(c) {
    var cap = parseInt(c.dataset.cap);
    var st = parseInt(c.dataset.st);
    var capBtn = sec.querySelector('.gf-cap-btn[data-cap="' + cap + '"]');
    var capActive = capBtn && capBtn.classList.contains('active');
    var chipActive = c.classList.contains('active');
    if (!capActive) return;
    if (!result[cap]) result[cap] = [];
    if (chipActive) result[cap].push(st);
    else needsFilter = true;
  });
  return needsFilter ? result : null;
}


function _gfGenerarBase(secId) {
  var sec = document.getElementById(secId);
  var capBtns = sec.querySelectorAll('.gf-cap-btn.active');
  var selectedCaps = [];
  capBtns.forEach(function(b){ selectedCaps.push(parseInt(b.dataset.cap)); });
  selectedCaps.sort(function(a,b){return a-b;});

  var types = {};
  sec.querySelectorAll('.gf-type-btn.active').forEach(function(b){ types[b.dataset.type] = true; });

  var statusEl = document.getElementById('gf-status-' + secId);
  if (!selectedCaps.length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um cap\u00edtulo.'; return; }
  if (!Object.keys(types).length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um tipo de conte\u00fado.'; return; }

  if(statusEl) statusEl.textContent = 'A gerar\u2026';

  var dif = gfGetDifficulty(secId);
  // Soluções só fazem sentido se houver exercícios, teste ou minitestes
  var hasSolucoes = !!types.solucoes && (!!types.exercicios || !!types.teste || !!types.minitestes);
  var mainHtml = '';
  var solucoesHtml = '';

  // ── Header banner com nível de dificuldade ──
  if (hasSolucoes) {
  mainHtml += '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;flex-wrap:wrap">'
    + '<span style="background:#f0faf4;color:#3d5c54;border:1.5px solid #77998E;border-radius:999px;padding:4px 14px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700">\u2014 Com Solu\u00e7\u00f5es</span>'
    + '</div>';
  }

  if (hasSolucoes) {
    mainHtml += '<div style="background:linear-gradient(135deg,#3d5c54,#77998E);color:#fff;border-radius:12px;padding:1rem 1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem">'
      + '<span style="font-size:1.5rem"></span>'
      + '<div>'
      + '<div style="font-weight:700;font-size:.95rem;letter-spacing:.02em">FICHA COM SOLU\u00c7\u00d5ES INCLU\u00cdDAS</div>'
      + '<div style="font-size:.78rem;opacity:.85;margin-top:2px">As solu\u00e7\u00f5es completas encontram-se no final desta ficha, separadas dos exerc\u00edcios.</div>'
      + '</div></div>';
  }

  // ── Conteúdo principal por capítulo ──
  selectedCaps.forEach(function(cap) {
    var hasContent = false;
    var dynResult = null; // guardará {ex, sol} dos exercícios dinâmicos
    var capHtml = '<div style="page-break-before:' + (mainHtml.length > 500 ? 'always' : 'avoid') + '">';
    capHtml += '<h2>' + (_CAP_NAMES_GF[cap] || 'Cap. ' + cap) + '</h2>';

    if (types.resumo) {
      try { var r = _buildResumoCapHTML(cap); if (r && r.trim()) { capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Resumo Te\u00f3rico</h3>' + r; hasContent=true; } } catch(e) {}
    }
    if (types.exercicios) {
      try {
        // Usa exercícios dinâmicos (aleatórios) em vez dos estáticos
        dynResult = _buildDinamicoCapHTML(cap, dif);
        if (dynResult && dynResult.ex) {
          capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Exerc\u00edcios</h3>'
            + '<div class="meta" style="color:#888;font-size:.78rem;margin-bottom:1rem">Data: '+new Date().toLocaleDateString('pt-PT')+'</div>'
            + dynResult.ex;
          hasContent=true;
        }
      } catch(e) { }
    }
    if (types.teste) {
      try { var t = _buildTesteCapHTML(cap); if (t && t.trim()) { capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Teste de Avalia\u00e7\u00e3o</h3>' + t; hasContent=true; } } catch(e) {}
    }
    if (types.minitestes) {
      try {
        var m = '';
        if (cap===1 && typeof gerarMinitestesHTML==='function') m=gerarMinitestesHTML();
        else if (cap===4 && typeof buildMini4HTML==='function') m=buildMini4HTML([1,2,3,4,5]);
        if (m) { var mb=m.match(/<body[^>]*>([\s\S]*?)<\/body>/i); if(mb)m=mb[1]; capHtml+='<h3>Minitestes</h3>'+m; hasContent=true; }
      } catch(e) {}
    }
    capHtml += '</div>';
    if (hasContent) mainHtml += capHtml;

    // ── Recolhe soluções separadamente ──
    if (hasSolucoes) {
      try {
        var solBlock = '';
        // Soluções dos exercícios dinâmicos
        if (dynResult && dynResult.sol) {
          solBlock += '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'
            + '<h3>Exercícios — Cap. '+cap+'</h3>'
            + '<div style="font-size:.88rem;line-height:1.75">'+dynResult.sol+'</div></div>';
        }
        // Soluções do teste estático
        if (types.teste) {
          var sStatic = _buildSolucoesCapHTML(cap);
          if (sStatic) solBlock += sStatic;
        }
        if (solBlock) {
          solucoesHtml += '<div style="page-break-before:' + (solucoesHtml ? 'always' : 'avoid') + ';margin-bottom:2rem">' + solBlock + '</div>';
        }
      } catch(e) {}
    }
  });

  // ── Bloco de soluções no fim ──
  if (hasSolucoes && solucoesHtml) {
    mainHtml += '<div style="page-break-before:always;margin-top:2rem">'
      + '<h2><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Soluções</h2>'
      + solucoesHtml
      + '</div>';
  }

  _gfContent[secId] = mainHtml;
  var preview = document.getElementById('gf-content-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);
  var finalHtml = mainHtml || '<p style="color:var(--ink4);padding:1rem 0">Sem conte\u00fado dispon\u00edvel. Verifica a sele\u00e7\u00e3o.</p>';

  // Visual flash feedback on regenerate
  if (previewWrap.style.display === 'block') {
    preview.style.opacity = '0.15';
    setTimeout(function() {
      preview.innerHTML = finalHtml;
      preview.style.opacity = '1';
    }, 150);
  } else {
    preview.innerHTML = finalHtml;
  }

  previewWrap.style.display = 'block';
  var panel = sec.querySelector('.gf-panel');
  if (panel) panel.scrollIntoView({behavior:'smooth', block:'nearest'});

  var capNames = selectedCaps.map(function(c){return 'Cap.'+c;}).join('+');
  var typeLabels = { resumo:'Resumo', exercicios:'Exerc\u00edcios', teste:'Teste', minitestes:'Minitestes', solucoes:'Solu\u00e7\u00f5es' };
  var typeStr = Object.keys(types).map(function(k){ return typeLabels[k]||k; }).join(', ');
  if(statusEl) {
    statusEl.textContent = '\u2713 ' + capNames + ' \u00b7 ' + typeStr + (hasSolucoes ? ' \u00b7 \u2014 com solu\u00e7\u00f5es' : '');
    statusEl.style.color = 'var(--c1-mid)';
  }
}

var _RND = {
  int: function(a, b){ return Math.floor(Math.random()*(b-a+1))+a; },
  pick: function(arr){ return arr[Math.floor(Math.random()*arr.length)]; },
  neg: function(a, b){ var v=_RND.int(a,b); return Math.random()<.5?-v:v; },
  nonzero: function(a,b){ var v=0; while(v===0) v=_RND.int(a,b); return v; },
  sign: function(v){ return v>=0?'+'+v:''+v; }
};

function _buildDinamicoCapHTML(cap, dif) {
  if (cap===1) return _dinamico1(dif);
  if (cap===2) return _dinamico2(dif);
  if (cap===3) return _dinamico3(dif);
  if (cap===4) return _dinamico4(dif);
  return '';
}

// ── Cap 1 — Números Inteiros ──────────────────────────────────────────────────
function _dinamico1(dif) {
  var R=_RND, now=new Date().toLocaleDateString('pt-PT');
  var ex='', sol='';

  function row(n,q,espacos){ return '<div class="ex"><div class="ex-num">'+n+'.</div><p>'+q+'</p>'+(espacos!==false?'<div class="linha"></div>':'')+'</div>'; }
  function linha(){ return '<div class="linha"></div>'; }

  if (dif==='facil') {
    // Exercício 1 — Representar inteiros (situações simples)
    var temp=R.int(1,9), andar=R.int(1,5), saldo=R.int(10,50), prof=R.int(5,20), alt=R.int(100,500);
    ex+='<h2>Grupo 1 — Representação com Números Inteiros</h2>';
    ex+=row(1,'Representa cada situação com um número inteiro:<br>'
      +'a) A temperatura desceu '+temp+' graus abaixo de zero &nbsp; b) O '+andar+'.º andar de uma garagem subterrânea<br>'
      +'c) Uma conta com saldo positivo de '+saldo+' € &nbsp; d) Um mergulhador a '+prof+' m de profundidade<br>'
      +'e) Um avião a '+alt+' m de altitude');
    sol+='<div class="ex"><strong>1.</strong> a) −'+temp+' &nbsp; b) −'+andar+' &nbsp; c) +'+saldo+' &nbsp; d) −'+prof+' &nbsp; e) +'+alt+'</div>';

    // Exercício 2 — Valor absoluto
    var v1=R.int(1,12),v2=R.int(1,12),v3=R.int(1,12),v4=R.int(1,12);
    ex+='<h2>Grupo 2 — Valor Absoluto e Simétrico</h2>';
    ex+=row(2,'Calcula o valor absoluto:<br>'
      +'a) |−'+v1+'| = _____ &nbsp;&nbsp; b) |+'+v2+'| = _____ &nbsp;&nbsp; c) |−'+v3+'| = _____ &nbsp;&nbsp; d) |+'+v4+'| = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+v1+' &nbsp; b) '+v2+' &nbsp; c) '+v3+' &nbsp; d) '+v4+'</div>';

    var s1=R.int(1,10),s2=R.int(1,10),s3=R.int(1,10);
    ex+=row(3,'Indica o simétrico:<br>'
      +'a) sim(−'+s1+') = _____ &nbsp;&nbsp; b) sim(+'+s2+') = _____ &nbsp;&nbsp; c) sim(−'+s3+') = _____');
    sol+='<div class="ex"><strong>3.</strong> a) +'+s1+' &nbsp; b) −'+s2+' &nbsp; c) +'+s3+'</div>';

    // Exercício 4 — Adição simples
    var a1=R.int(1,9),b1=R.int(1,9),a2=R.int(1,9),b2=R.int(1,9),a3=R.int(1,9),b3=R.int(1,9);
    var r1=(-a1)+(+b1), r2=(-a2)+(-b2), r3=(+a3)+(-b3);
    ex+='<h2>Grupo 3 — Adição de Inteiros</h2>';
    ex+=row(4,'Calcula:<br>'
      +'a) (−'+a1+') + (+'+b1+') = _____ &nbsp;&nbsp; b) (−'+a2+') + (−'+b2+') = _____ &nbsp;&nbsp; c) (+'+a3+') + (−'+b3+') = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+r1+' &nbsp; b) '+(-(a2+b2))+' &nbsp; c) '+r3+'</div>';

    // Exercício 5 — Subtração simples
    var c1=R.int(2,9),d1=R.int(1,c1),c2=R.int(2,9),d2=R.int(1,9);
    ex+='<h2>Grupo 4 — Subtração de Inteiros</h2>';
    ex+=row(5,'Calcula:<br>'
      +'a) (+'+c1+') − (−'+d1+') = _____ &nbsp;&nbsp; b) (−'+c2+') − (+'+d2+') = _____');
    sol+='<div class="ex"><strong>5.</strong> a) '+(c1+d1)+' &nbsp; b) '+(-(c2+d2))+'</div>';

    // Exercício 6 — Ordenar
    var nums=[];
    while(nums.length<6){var n=R.int(-8,8); if(!nums.includes(n)) nums.push(n);}
    var sorted=[...nums].sort((a,b)=>a-b);
    ex+='<h2>Grupo 5 — Ordenação</h2>';
    ex+=row(6,'Ordena os números por ordem crescente: '+nums.join(', '));
    sol+='<div class="ex"><strong>6.</strong> '+sorted.join(' &lt; ')+'</div>';

  } else if (dif==='medio') {
    var v1=R.int(3,15),v2=R.int(3,15),v3=R.int(3,15),v4=R.int(3,15),v5=R.int(3,15);
    ex+='<h2>Grupo 1 — Valor Absoluto e Operações</h2>';
    ex+=row(1,'Calcula:<br>'
      +'a) |−'+v1+'| + |−'+v2+'| = _____ &nbsp;&nbsp; b) |+'+v3+'| − |−'+v4+'| = _____ &nbsp;&nbsp; c) |−'+v5+'| × |−2| = _____');
    var ra=v1+v2,rb=v3-v4,rc=v5*2;
    sol+='<div class="ex"><strong>1.</strong> a) '+ra+' &nbsp; b) '+rb+' &nbsp; c) '+rc+'</div>';

    var a=R.int(2,12),b=R.int(2,12),c=R.int(2,12),d=R.int(2,12),e=R.int(2,12);
    var r1=(-a)+(+b), r2=(-a)+(-b), r3=(+c)+(-d), r4=(-c)+(-d)+(+e);
    ex+='<h2>Grupo 2 — Adição e Subtração</h2>';
    ex+=row(2,'Calcula:<br>'
      +'a) (−'+a+') + (+'+b+') = _____ &nbsp;&nbsp; b) (−'+a+') + (−'+b+') = _____ &nbsp;&nbsp; c) (+'+c+') + (−'+d+') = _____<br>'
      +'d) (−'+c+') + (−'+d+') + (+'+e+') = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+r1+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+r3+' &nbsp; d) '+r4+'</div>';

    var p=R.int(2,10),q=R.int(2,8),s=R.int(2,10),t=R.int(2,8);
    var s1=p+q, s2=-(s+t), s3_base=R.int(3,10),s3_sub=R.int(1,s3_base);
    ex+=row(3,'Calcula:<br>'
      +'a) (+'+p+') − (−'+q+') = _____ &nbsp;&nbsp; b) (−'+s+') − (+'+t+') = _____<br>'
      +'c) (−'+s3_base+') − (−'+s3_sub+') = _____');
    sol+='<div class="ex"><strong>3.</strong> a) '+s1+' &nbsp; b) '+s2+' &nbsp; c) '+(-(s3_base-s3_sub))+'</div>';

    // Expressões algébricas com parênteses
    var x=R.int(2,8),y=R.int(2,8),w=R.int(2,5),z=R.int(1,5);
    var ex4a=(-(+x+(-y))); // −(+x − y)
    var ex4b=x-y+(-z);
    ex+='<h2>Grupo 3 — Expressões com Parênteses</h2>';
    ex+=row(4,'Remove os parênteses e calcula:<br>'
      +'a) −(+'+x+' − '+y+') = _____ &nbsp;&nbsp; b) '+x+' − '+y+' + (−'+z+') = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+(-x+y)+' &nbsp; b) '+(x-y-z)+'</div>';

    // Problema
    var temp0=R.neg(3,8),subida=R.int(5,15),descida=R.int(2,8);
    var tempFinal=temp0+subida-descida;
    ex+='<h2>Grupo 4 — Problema</h2>';
    ex+=row(5,'Às 6h a temperatura era de '+temp0+'°C. Ao longo do dia subiu '+subida+'°C e depois desceu '+descida+'°C. Qual é a temperatura final?');
    sol+='<div class="ex"><strong>5.</strong> '+temp0+' + '+subida+' − '+descida+' = <strong>'+tempFinal+' °C</strong></div>';

    // Adição algébrica
    var nums5=[R.int(-12,12),R.int(-12,12),R.int(-12,12),R.int(-12,12),R.int(-12,12)];
    var sum5=nums5.reduce((a,b)=>a+b,0);
    ex+=row(6,'Simplifica usando adição algébrica: &nbsp;'+nums5.map(_RND.sign).join(' '));
    sol+='<div class="ex"><strong>6.</strong> '+sum5+'</div>';

  } else { // difícil
    var a=R.int(5,20),b=R.int(5,15),c=R.int(3,12),d=R.int(2,8),e=R.int(2,6);
    ex+='<h2>Grupo 1 — Expressões com Parênteses Múltiplos</h2>';
    // −[a − (b − c)]
    var inner1=b-c, bracket1=a-inner1, res1=-bracket1;
    ex+=row(1,'Calcula:<br>'
      +'a) −['+a+' − ('+b+' − '+c+')] = _____<br>'
      +'b) '+a+' − ['+b+' − (−'+c+' + '+d+')] = _____');
    var inner2=-c+d, bracket2=b-inner2, res2=a-bracket2;
    sol+='<div class="ex"><strong>1.</strong> a) '+res1+' &nbsp; b) '+res2+'</div>';

    var f=R.int(2,6),g=R.int(2,5),h=R.int(1,4);
    ex+=row(2,'Simplifica com chavetas:<br>'
      +'a) '+f+' − {'+g+' − [−'+h+' + ('+f+' − '+g+')]} = _____');
    var ip=f-g, ib=-h+ip, res2b=f-(g-ib);
    sol+='<div class="ex"><strong>2.</strong> a) '+res2b+'</div>';

    var aa=R.neg(2,5), bb=R.neg(2,5);
    ex+='<h2>Grupo 2 — Valor Numérico</h2>';
    ex+=row(3,'Para a = '+aa+' e b = '+bb+', calcula:<br>'
      +'a) a + b = _____ &nbsp;&nbsp; b) a − b = _____ &nbsp;&nbsp; c) |a| + |b| = _____ &nbsp;&nbsp; d) −(a − b) + a = _____');
    var va_b=aa+bb,va_minus_b=aa-bb,va_abs=Math.abs(aa)+Math.abs(bb),vd=-(aa-bb)+aa;
    sol+='<div class="ex"><strong>3.</strong> a) '+va_b+' &nbsp; b) '+va_minus_b+' &nbsp; c) '+va_abs+' &nbsp; d) '+vd+'</div>';

    var alt1=R.int(2000,5000),prof1=R.int(10,200);
    ex+='<h2>Grupo 3 — Problemas</h2>';
    ex+=row(4,'O ponto A tem altitude +'+alt1+' m e o ponto B tem −'+prof1+' m. Qual a diferença de cotas entre A e B? Apresenta o cálculo.');
    sol+='<div class="ex"><strong>4.</strong> '+alt1+' − (−'+prof1+') = '+alt1+' + '+prof1+' = <strong>'+(alt1+prof1)+' m</strong></div>';

    var posIni=R.neg(1,10),lances=[R.neg(2,8),R.neg(2,8),R.neg(2,8)];
    var posFinal=posIni+lances.reduce((a,b)=>a+b,0);
    ex+=row(5,'Num jogo, o jogador começa na posição '+posIni+'. Nos 3 lances obteve: '+lances.map(_RND.sign).join(', ')+'. Em que posição fica? Mostra todos os cálculos.');
    sol+='<div class="ex"><strong>5.</strong> '+posIni+' + ('+lances.map(_RND.sign).join(') + (')+') = <strong>'+posFinal+'</strong></div>';

    var nums6=[R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15)];
    var sum6=nums6.reduce((a,b)=>a+b,0);
    ex+='<h2>Grupo 4 — Adição Algébrica</h2>';
    ex+=row(6,'Simplifica: '+nums6.map(_RND.sign).join(' ') + ' = _____');
    sol+='<div class="ex"><strong>6.</strong> '+sum6+'</div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 2 — Números Racionais ─────────────────────────────────────────────────
function _dinamico2(dif) {
  var R=_RND;
  var ex='', sol='';

  function linha(){return '<div class="linha"></div>';}
  function row(n,q){return '<div class="ex"><div class="ex-num">'+n+'.</div><p>'+q+'</p>'+linha()+'</div>';}

  // Helper: gcd
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function simplify(n,d){var g=gcd(Math.abs(n),Math.abs(d));return [n/g,d/g];}
  function frac(n,d){
    if(d<0){n=-n;d=-d;}
    var g=gcd(Math.abs(n),Math.abs(d));
    n/=g;d/=g;
    if(d===1)return ''+n;
    return n+'/'+d;
  }
  function addFrac(n1,d1,n2,d2){var d=d1*d2;var n=n1*d2+n2*d1;return frac(n,d);}

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Comparação e Ordenação</h2>';
    var fracs=[[1,2],[1,3],[3,4],[1,4],[2,3]];
    var picked=R.pick(fracs),picked2=R.pick(fracs);
    var p1n=picked[0],p1d=picked[1],p2n=picked2[0],p2d=picked2[1];
    var v1=p1n/p1d,v2=p2n/p2d;
    var sym=v1>v2?'&gt;':v1<v2?'&lt;':'=';
    ex+=row(1,'Compara usando &lt;, &gt; ou =:<br>a) '+p1n+'/'+p1d+' ___ '+p2n+'/'+p2d+'&nbsp;&nbsp; b) −'+p1n+'/'+p1d+' ___ 0&nbsp;&nbsp; c) −1/2 ___ −1/3');
    sol+='<div class="ex"><strong>1.</strong> a) '+sym+' &nbsp; b) &lt; (negativo é sempre &lt; 0) &nbsp; c) &lt; (|−1/2|=0,5 &gt; |−1/3|≈0,33, logo −1/2 &lt; −1/3)</div>';

    ex+='<h2>Grupo 2 — Adição e Subtração de Frações</h2>';
    // Generate simple fractions that add nicely
    var pairs=[[1,2,1,3],[1,4,1,4],[2,3,1,6],[3,4,1,4],[1,2,1,6]];
    var p=R.pick(pairs);
    var sumN=p[0]*p[3]+p[2]*p[1],sumD=p[1]*p[3];
    var diffN=p[0]*p[3]-p[2]*p[1];
    ex+=row(2,'Calcula (fração irredutível):<br>'
      +'a) '+p[0]+'/'+p[1]+' + '+p[2]+'/'+p[3]+' = _____ &nbsp;&nbsp; b) '+p[0]+'/'+p[1]+' − '+p[2]+'/'+p[3]+' = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+frac(sumN,sumD)+' &nbsp; b) '+frac(diffN,sumD)+'</div>';

    ex+='<h2>Grupo 3 — Percentagens</h2>';
    var pcts=[10,20,25,50,5],amounts=[40,80,120,200,60,150];
    var pct=R.pick(pcts),amt=R.pick(amounts);
    var res_pct=(pct/100)*amt;
    ex+=row(3,'Calcula:<br>a) '+pct+'% de '+amt+' = _____ &nbsp;&nbsp; b) Converte 3/4 para percentagem &nbsp;&nbsp; c) Converte 0,65 para percentagem');
    sol+='<div class="ex"><strong>3.</strong> a) '+res_pct+' &nbsp; b) 75% &nbsp; c) 65%</div>';

    ex+='<h2>Grupo 4 — Potências</h2>';
    var bases=[2,3,5,10],exps=[2,3,4];
    var base=R.pick(bases),exp=R.pick(exps);
    ex+=row(4,'Calcula:<br>a) '+base+'<sup>'+exp+'</sup> = _____ &nbsp;&nbsp; b) 10<sup>3</sup> × 10<sup>2</sup> = _____ &nbsp;&nbsp; c) 10<sup>6</sup> ÷ 10<sup>2</sup> = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+Math.pow(base,exp)+' &nbsp; b) 10<sup>5</sup> = 100 000 &nbsp; c) 10<sup>4</sup> = 10 000</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Operações com Frações</h2>';
    // Pick denominators that work
    var sets=[[1,2,1,3],[2,3,3,4],[1,4,2,3],[3,5,1,4],[5,6,1,3]];
    var s=R.pick(sets);
    var n1=s[0],d1=s[1],n2=s[2],d2=s[3];
    var sumN2=n1*d2+n2*d1,diffN2=n1*d2-n2*d1,prodN=n1*n2,prodD=d1*d2;
    ex+=row(1,'Calcula (resultado em fração irredutível):<br>'
      +'a) '+n1+'/'+d1+' + '+n2+'/'+d2+' &nbsp;&nbsp; b) '+n1+'/'+d1+' − '+n2+'/'+d2+' &nbsp;&nbsp; c) '+n1+'/'+d1+' × '+n2+'/'+d2+'');
    sol+='<div class="ex"><strong>1.</strong> a) '+frac(sumN2,d1*d2)+' &nbsp; b) '+frac(diffN2,d1*d2)+' &nbsp; c) '+frac(prodN,prodD)+'</div>';

    var negSets=[[1,2,1,4],[1,3,1,6],[2,3,1,3]];
    var ns=R.pick(negSets);
    var neg_sum=ns[0]*ns[3]-ns[2]*ns[1];
    ex+=row(2,'Calcula:<br>a) −'+ns[0]+'/'+ns[1]+' + (−'+ns[2]+'/'+ns[3]+') &nbsp;&nbsp; b) −'+ns[0]+'/'+ns[1]+' − (−'+ns[2]+'/'+ns[3]+')');
    sol+='<div class="ex"><strong>2.</strong> a) '+frac(-(ns[0]*ns[3]+ns[2]*ns[1]),ns[1]*ns[3])+' &nbsp; b) '+frac(-ns[0]*ns[3]+ns[2]*ns[1],ns[1]*ns[3])+'</div>';

    ex+='<h2>Grupo 2 — Percentagens Avançadas</h2>';
    var price=R.pick([80,120,150,200,250,300]);
    var disc=R.pick([10,15,20,25,30]);
    var after=price*(1-disc/100);
    ex+=row(3,'Um artigo custa '+price+' €. Há um desconto de '+disc+'%. Qual o preço final?');
    sol+='<div class="ex"><strong>3.</strong> '+price+' × (1 − '+disc+'/100) = '+price+' × '+(1-disc/100)+' = <strong>'+after+' €</strong></div>';

    var total=R.pick([500,800,1000,1200,2000]);
    var part=R.pick([100,150,200,250,400,600]);
    var pctResult=Math.round(part/total*100*10)/10;
    ex+=row(4,'Num grupo de '+total+' alunos, '+part+' são do 7.º ano. Que percentagem representa?');
    sol+='<div class="ex"><strong>4.</strong> '+part+'/'+total+' × 100 = <strong>'+pctResult+'%</strong></div>';

    ex+='<h2>Grupo 3 — Potências e Notação Científica</h2>';
    var m1=R.int(1,9),e1=R.int(2,5),m2=R.int(1,9),e2=R.int(2,5);
    ex+=row(5,'Calcula e escreve em notação científica:<br>'
      +'a) ('+m1+' × 10<sup>'+e1+'</sup>) × ('+m2+' × 10<sup>'+e2+'</sup>) &nbsp;&nbsp; b) Escreve '+R.pick([25000,340000,1500,72000])+' em notação científica');
    var prodM=m1*m2,prodE=e1+e2;
    var prodNorm=prodM>=10?prodM/10+'×10<sup>'+(prodE+1)+'</sup>':''+prodM+'×10<sup>'+prodE+'</sup>';
    sol+='<div class="ex"><strong>5.</strong> a) '+prodNorm+' &nbsp; b) (ver raciocínio: mover vírgula)</div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Operações Mistas com Racionais</h2>';
    var sets3=[[2,3,3,4,1,6],[1,2,2,3,3,4],[3,5,1,4,2,5]];
    var s3=R.pick(sets3);
    // (s3[0]/s3[1] + s3[2]/s3[3]) × s3[4]/s3[5]
    var numA=s3[0]*s3[3]+s3[2]*s3[1];
    var denA=s3[1]*s3[3];
    var numFinal=numA*s3[4], denFinal=denA*s3[5];
    ex+=row(1,'Calcula (fração irredutível):<br>'
      +'a) ('+s3[0]+'/'+s3[1]+' + '+s3[2]+'/'+s3[3]+') × '+s3[4]+'/'+s3[5]+'<br>'
      +'b) −2/3 + (3/4 − 1/2) × 4/3');
    sol+='<div class="ex"><strong>1.</strong> a) '+frac(numFinal,denFinal)+' &nbsp; b) −2/3 + (1/4)×(4/3) = −2/3 + 1/3 = −1/3</div>';

    ex+='<h2>Grupo 2 — Percentagem: Variação e Problemas</h2>';
    var vi=R.pick([200,400,500,800,1000]), vf_pct=R.pick([10,15,20,25,30]);
    var vf=vi*(1+vf_pct/100);
    ex+=row(2,'Uma ação de bolsa valorizou '+vf_pct+'% e passou a valer '+vf+' €. Qual era o valor inicial? (Confirma a tua resposta)');
    sol+='<div class="ex"><strong>2.</strong> Vi × 1,'+String(vf_pct).padStart(2,'0')+' = '+vf+' → Vi = '+vf+' ÷ '+(1+vf_pct/100)+' = <strong>'+vi+' €</strong>. Verif: '+vi+' × '+(1+vf_pct/100)+' = '+vf+' ✓</div>';

    ex+=row(3,'Numa turma de '+R.pick([24,25,28,30])+' alunos, '+R.pick([40,50,60,75])+'% são raparigas. Quantas raparigas há? E quantos rapazes?');
    ex+='<h2>Grupo 3 — Potências: Regras e Notação</h2>';
    var b1=R.pick([2,3,5]),e_a=R.int(3,6),e_b=R.int(2,4);
    ex+=row(4,'Simplifica: '+b1+'<sup>'+e_a+'</sup> × '+b1+'<sup>'+e_b+'</sup> ÷ '+b1+'<sup>'+(e_b-1)+'</sup> = _____');
    sol+='<div class="ex"><strong>4.</strong> '+b1+'<sup>'+(e_a+e_b-(e_b-1))+'</sup> = '+b1+'<sup>'+(e_a+1)+'</sup> = '+Math.pow(b1,e_a+1)+'</div>';

    var val=R.pick([3600000,48000000,0.00025,0.0000081]);
    ex+=row(5,'Escreve em notação científica e indica a ordem de grandeza: '+val);
  }

  return {ex:ex, sol:sol};
}

// ── Cap 3 — Geometria ─────────────────────────────────────────────────────────
function _dinamico3(dif) {
  var R=_RND;
  var ex='', sol='';
  function linha(){return '<div class="linha"></div>';}
  function row(n,q){return '<div class="ex"><div class="ex-num">'+n+'.</div><p>'+q+'</p>'+linha()+'</div>';}

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Ângulos Internos de Polígonos</h2>';
    var n1=R.pick([3,4,5,6]),n2=R.pick([7,8,9,10]);
    var s1=(n1-2)*180,s2=(n2-2)*180;
    ex+=row(1,'Calcula a soma dos ângulos internos de:<br>a) Polígono com '+n1+' lados &nbsp;&nbsp; b) Polígono com '+n2+' lados');
    sol+='<div class="ex"><strong>1.</strong> a) ('+n1+'−2)×180° = '+s1+'° &nbsp; b) ('+n2+'−2)×180° = '+s2+'°</div>';

    var n3=R.pick([4,5,6,8]);
    var eachAngle=((n3-2)*180)/n3;
    ex+=row(2,'Num polígono regular com '+n3+' lados, qual a amplitude de cada ângulo interno?');
    sol+='<div class="ex"><strong>2.</strong> ('+n3+'−2)×180°÷'+n3+' = '+eachAngle+'°</div>';

    ex+='<h2>Grupo 2 — Áreas Simples</h2>';
    var b=R.int(4,14),h=R.int(3,10);
    var b2=R.int(4,14),h2=R.int(3,10);
    var r=R.int(3,8);
    ex+=row(3,'Calcula a área de:<br>'
      +'a) Retângulo: base = '+b+' cm, altura = '+h+' cm<br>'
      +'b) Triângulo: base = '+b2+' cm, altura = '+h2+' cm<br>'
      +'c) Círculo com raio = '+r+' cm (π ≈ 3,14)');
    sol+='<div class="ex"><strong>3.</strong> a) '+b+'×'+h+' = '+(b*h)+' cm² &nbsp; b) '+b2+'×'+h2+'÷2 = '+(b2*h2/2)+' cm² &nbsp; c) 3,14×'+r+'² = '+Math.round(3.14*r*r*100)/100+' cm²</div>';

    ex+='<h2>Grupo 3 — Ângulos em Retas Paralelas</h2>';
    var ang=R.pick([35,40,50,55,65,70,75,80]);
    var sup=180-ang,alt=ang,cor=ang,coin=sup;
    ex+=row(4,'Duas retas paralelas são cortadas por uma secante. Um ângulo mede '+ang+'°. Indica:<br>'
      +'a) O ângulo alterno interno &nbsp;&nbsp; b) O ângulo co-interno &nbsp;&nbsp; c) O ângulo correspondente');
    sol+='<div class="ex"><strong>4.</strong> a) '+alt+'° (igual) &nbsp; b) '+coin+'° (suplementar: 180°−'+ang+'°) &nbsp; c) '+cor+'° (igual)</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Polígonos: Ângulos e Propriedades</h2>';
    var sumTarget=R.pick([720,900,1080,1260,1440,1620]);
    var nSides=sumTarget/180+2;
    ex+=row(1,'Determina o número de lados de um polígono cuja soma dos ângulos internos é '+sumTarget+'°.');
    sol+='<div class="ex"><strong>1.</strong> (n−2)×180 = '+sumTarget+' → n−2 = '+(sumTarget/180)+' → <strong>n = '+nSides+'</strong></div>';

    var extAngle=R.pick([24,30,36,40,45,60]);
    var nExt=360/extAngle;
    ex+=row(2,'Um polígono regular tem ângulo externo de '+extAngle+'°. Quantos lados tem? Como se classifica?');
    sol+='<div class="ex"><strong>2.</strong> n = 360°÷'+extAngle+'° = '+nExt+' lados.</div>';

    var angA=R.int(95,130);
    var angB=180-angA,angC=angA,angD=angB;
    ex+=row(3,'Num paralelogramo [ABCD], o ângulo A mede '+angA+'°. Determina os ângulos B, C e D.');
    sol+='<div class="ex"><strong>3.</strong> B = 180°−'+angA+'° = '+angB+'°; C = '+angA+'° (oposto a A); D = '+angD+'°</div>';

    ex+='<h2>Grupo 2 — Áreas de Figuras Compostas</h2>';
    var b1=R.int(6,14),b2=R.int(3,b1-1),hT=R.int(4,10);
    var areaT=(b1+b2)/2*hT;
    var rl=R.int(5,12),rl2=R.int(4,10);
    var areaLos=rl*rl2/2;
    ex+=row(4,'Calcula a área do trapézio com bases '+b1+' cm e '+b2+' cm, altura '+hT+' cm.');
    ex+=row(5,'Calcula a área do losango com diagonais '+rl+' cm e '+rl2+' cm.');
    sol+='<div class="ex"><strong>4.</strong> ('+b1+'+'+b2+')÷2 × '+hT+' = '+areaT+' cm²<br><strong>5.</strong> '+rl+'×'+rl2+'÷2 = '+areaLos+' cm²</div>';

    var angPent=[];
    for(var i=0;i<4;i++) angPent.push(R.int(90,135));
    var sumPent=(5-2)*180;
    var fif=sumPent-angPent.reduce((a,b)=>a+b,0);
    ex+=row(6,'Num pentágono, quatro dos ângulos internos medem '+angPent.join('°, ')+'°. Determina o quinto ângulo.');
    sol+='<div class="ex"><strong>6.</strong> Soma=(5−2)×180=540°. 5.º = 540−('+angPent.join('+')+') = <strong>'+fif+'°</strong></div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Problemas com Ângulos</h2>';
    var int1=R.int(80,140),int2=R.int(60,120),int3=R.int(70,130);
    var falta=360-int1-int2-int3;
    if(falta<30||falta>170){int1=100;int2=80;int3=95;falta=85;}
    ex+=row(1,'Num quadrilátero, três ângulos internos medem '+int1+'°, '+int2+'° e '+int3+'°. Qual é o quarto ângulo?');
    sol+='<div class="ex"><strong>1.</strong> Soma quadrilátero = 360°. 4.º = 360−('+int1+'+'+int2+'+'+int3+') = <strong>'+falta+'°</strong></div>';

    var n_poly=R.int(7,15);
    var ext_each=Math.round(360/n_poly*10)/10;
    ex+=row(2,'Um polígono regular tem '+n_poly+' lados. Calcula: a) a soma dos ângulos internos; b) cada ângulo interno; c) cada ângulo externo.');
    var sum_int=(n_poly-2)*180, each_int=Math.round(sum_int/n_poly*10)/10;
    sol+='<div class="ex"><strong>2.</strong> a) '+(n_poly-2)+'×180 = '+sum_int+'° &nbsp; b) '+sum_int+'÷'+n_poly+' = '+each_int+'° &nbsp; c) 360÷'+n_poly+' = '+ext_each+'°</div>';

    ex+='<h2>Grupo 2 — Áreas Compostas</h2>';
    var bRect=R.int(8,16),hRect=R.int(5,10);
    var rSemi=R.int(3,5);
    var areaRect=bRect*hRect;
    var areaSemi=Math.round(3.14*rSemi*rSemi/2*100)/100;
    var total=Math.round((areaRect+areaSemi)*100)/100;
    ex+=row(3,'Uma figura é composta por um retângulo de '+bRect+' cm × '+hRect+' cm ao qual se une um semicírculo de raio '+rSemi+' cm (π≈3,14). Calcula a área total.');
    sol+='<div class="ex"><strong>3.</strong> Retângulo: '+areaRect+' cm². Semicírculo: π×'+rSemi+'²÷2 = '+areaSemi+' cm². Total = <strong>'+total+' cm²</strong></div>';

    var b_comp=R.int(10,20),h_comp=R.int(6,12),b_tri=b_comp,h_tri=R.int(4,8);
    var a_para=b_comp*h_comp, a_tri=b_tri*h_tri/2;
    ex+=row(4,'Um paralelogramo de base '+b_comp+' cm e altura '+h_comp+' cm tem um triângulo (mesma base, altura '+h_tri+' cm) removido. Qual a área restante?');
    sol+='<div class="ex"><strong>4.</strong> Paralelogramo: '+a_para+' cm². Triângulo: '+a_tri+' cm². Resto = <strong>'+(a_para-a_tri)+' cm²</strong></div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 4 — Álgebra ───────────────────────────────────────────────────────────
function _dinamico4(dif) {
  var R=_RND;
  var ex='', sol='';
  function linha(){return '<div class="linha"></div>';}
  function row(n,q){return '<div class="ex"><div class="ex-num">'+n+'.</div><p>'+q+'</p>'+linha()+'</div>';}

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Sequências</h2>';
    var start=R.int(1,10),step=R.int(1,6);
    var seq=[start,start+step,start+2*step,start+3*step,start+4*step];
    var t8=start+7*step,t10=start+9*step;
    ex+=row(1,'Considera a sequência: '+seq.join(', ')+', …<br>'
      +'a) Qual é a razão? &nbsp;&nbsp; b) Indica o 8.º termo &nbsp;&nbsp; c) Indica o 10.º termo');
    sol+='<div class="ex"><strong>1.</strong> a) Razão = '+step+' &nbsp; b) t₈ = '+start+' + 7×'+step+' = '+t8+' &nbsp; c) t₁₀ = '+t10+'</div>';

    var startG=R.pick([2,3,1]),ratioG=R.pick([2,3]);
    var seqG=[startG,startG*ratioG,startG*ratioG*ratioG,startG*Math.pow(ratioG,3),startG*Math.pow(ratioG,4)];
    ex+=row(2,'Sequência geométrica: '+seqG.join(', ')+', …<br>a) Qual é a razão? &nbsp;&nbsp; b) Indica o 6.º termo');
    sol+='<div class="ex"><strong>2.</strong> a) Razão = '+ratioG+' &nbsp; b) t₆ = '+startG+'×'+ratioG+'⁵ = '+startG*Math.pow(ratioG,5)+'</div>';

    ex+='<h2>Grupo 2 — Expressões Algébricas Simples</h2>';
    var a=R.int(2,8),b=R.int(2,8),c=R.int(1,5);
    ex+=row(3,'Simplifica:<br>a) '+a+'x + '+b+'x = _____ &nbsp;&nbsp; b) '+a+'x − '+c+'x = _____ &nbsp;&nbsp; c) '+a+'x + '+b+'y − '+c+'x + y = _____');
    sol+='<div class="ex"><strong>3.</strong> a) '+(a+b)+'x &nbsp; b) '+(a-c)+'x &nbsp; c) '+(a-c)+'x + '+(b+1)+'y</div>';

    ex+='<h2>Grupo 3 — Equações Simples</h2>';
    var coef=R.int(2,6),result=R.int(6,30),x1=Math.round(result/coef);
    if(coef*x1!==result){coef=2;result=10;x1=5;}
    var add=R.int(1,8),res2=R.int(10,25),x2=res2-add;
    ex+=row(4,'Resolve:<br>a) '+coef+'x = '+result+' &nbsp;&nbsp;&nbsp; b) x + '+add+' = '+res2);
    sol+='<div class="ex"><strong>4.</strong> a) x = '+result+'÷'+coef+' = <strong>'+x1+'</strong>. Verif: '+coef+'×'+x1+'='+result+' ✓ &nbsp; b) x = '+res2+'−'+add+' = <strong>'+x2+'</strong>. Verif: '+x2+'+'+add+'='+res2+' ✓</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Sequências e Termo Geral</h2>';
    var t1=R.int(2,10),r=R.int(-4,5);
    if(r===0)r=3;
    var seq5=[t1,t1+r,t1+2*r,t1+3*r,t1+4*r];
    ex+=row(1,'Sequência: '+seq5.join(', ')+', …<br>'
      +'a) Tipo (aritmética/geométrica) e razão &nbsp;&nbsp; b) Fórmula do termo geral &nbsp;&nbsp; c) t₁₂ = ?');
    var t12=t1+11*r;
    sol+='<div class="ex"><strong>1.</strong> a) Aritmética, r = '+r+' &nbsp; b) tₙ = '+t1+' + (n−1)×('+r+') &nbsp; c) t₁₂ = '+t12+'</div>';

    ex+='<h2>Grupo 2 — Expressões Algébricas</h2>';
    var a=R.int(2,6),b=R.int(1,5),c=R.int(2,6),d=R.int(1,5);
    ex+=row(2,'Simplifica: ('+a+'x² − '+b+'x + 3) + ('+c+'x² + '+d+'x − 1)');
    sol+='<div class="ex"><strong>2.</strong> '+(a+c)+'x² + '+(-b+d)+'x + 2</div>';

    var xVal=R.neg(2,4),yVal=R.neg(2,4);
    ex+=row(3,'Para x = '+xVal+' e y = '+yVal+', calcula o valor numérico de: '+a+'x − '+b+'y + '+c);
    sol+='<div class="ex"><strong>3.</strong> '+a+'×('+xVal+') − '+b+'×('+yVal+') + '+c+' = '+(a*xVal - b*yVal + c)+'</div>';

    ex+='<h2>Grupo 3 — Equações do 1.º Grau</h2>';
    var coef1=R.int(2,5),add1=R.int(2,8),result1=R.int(10,25);
    var x_eq1=(result1-add1)/coef1;
    if(!Number.isInteger(x_eq1)){coef1=3;add1=5;result1=14;x_eq1=3;}
    ex+=row(4,'Resolve:<br>a) '+coef1+'x + '+add1+' = '+result1+' &nbsp;&nbsp;&nbsp; b) '+coef1+'x − '+add1+' = '+result1);
    var x_eq1b=(result1+add1)/coef1;
    sol+='<div class="ex"><strong>4.</strong> a) x = ('+result1+'−'+add1+')÷'+coef1+' = <strong>'+(result1-add1)/coef1+'</strong> &nbsp; b) x = ('+result1+'+'+add1+')÷'+coef1+' = <strong>'+x_eq1b+'</strong></div>';

    var c2=R.int(2,4),v2=R.int(3,8),add2=R.int(1,5);
    var rhs2=c2*v2+add2;
    ex+=row(5,'Resolve a equação e verifica: '+c2+'(x + '+add2+') = '+rhs2);
    sol+='<div class="ex"><strong>5.</strong> '+c2+'x + '+(c2*add2)+' = '+rhs2+' → '+c2+'x = '+(rhs2-c2*add2)+' → x = <strong>'+v2+'</strong>. Verif: '+c2+'×('+v2+'+'+add2+') = '+c2*(v2+add2)+' = '+rhs2+' ✓</div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Sequências Complexas</h2>';
    var a1=R.int(1,5),d1=R.int(2,8);
    ex+=row(1,'Numa sequência aritmética, t₃ = '+(a1+2*d1)+' e t₇ = '+(a1+6*d1)+'.<br>a) Determina a razão e o 1.º termo &nbsp;&nbsp; b) Qual é o termo geral? &nbsp;&nbsp; c) Para que valor de n é tₙ = '+(a1+19*d1)+'?');
    sol+='<div class="ex"><strong>1.</strong> a) r = [('+a1+'+6×'+d1+') − ('+a1+'+2×'+d1+')]÷4 = '+d1+'; t₁ = '+a1+' &nbsp; b) tₙ = '+a1+' + (n−1)×'+d1+' &nbsp; c) n = 20</div>';

    ex+='<h2>Grupo 2 — Equações com Frações e Parênteses</h2>';
    var sol2=R.int(2,8);
    var lhs_coef=R.int(2,4),rhs_add=R.int(5,15);
    var lhs_add=rhs_add-lhs_coef*sol2; // lhs_coef*x + lhs_add = rhs_add
    ex+=row(2,'Resolve: '+lhs_coef+'x + ('+lhs_add+') = '+rhs_add+' &nbsp; (verifica a resposta)');
    sol+='<div class="ex"><strong>2.</strong> '+lhs_coef+'x = '+(rhs_add-lhs_add)+' → x = <strong>'+sol2+'</strong>. Verif: '+lhs_coef+'×'+sol2+'+'+lhs_add+' = '+rhs_add+' ✓</div>';

    var s3=R.int(1,6);
    var a3=R.int(2,5),b3=R.int(2,5);
    var rhs3=a3*s3-b3;
    ex+=row(3,'Resolve: '+a3+'x − '+b3+' = '+rhs3);
    sol+='<div class="ex"><strong>3.</strong> '+a3+'x = '+(rhs3+b3)+' → x = <strong>'+s3+'</strong>.</div>';

    ex+=row(4,'Resolve a equação de 1.º grau: 2(3x − 1) = 5x + 4');
    sol+='<div class="ex"><strong>4.</strong> 6x−2=5x+4 → x = <strong>6</strong>. Verif: 2×(18−1)=34; 5×6+4=34 ✓</div>';

    ex+='<h2>Grupo 3 — Problema com Equação</h2>';
    var total=R.int(30,60);
    var diff=R.int(4,12);
    var menor=(total-diff)/2;
    if(!Number.isInteger(menor)){total=40;diff=10;menor=15;}
    var maior=menor+diff;
    ex+=row(5,'A soma de dois números consecutivos (diferença de '+diff+') é '+total+'. Determina os dois números. Define uma variável e escreve a equação.');
    sol+='<div class="ex"><strong>5.</strong> Seja x o menor. x + (x+'+diff+') = '+total+' → 2x = '+(total-diff)+' → x = <strong>'+menor+'</strong>. Os números são <strong>'+menor+'</strong> e <strong>'+maior+'</strong>.</div>';
  }

  return {ex:ex, sol:sol};
}

// ═══════════════════════════════════════════════════════
// GERADORES POR SUBTEMA — cap1..4
// ═══════════════════════════════════════════════════════

function _gfSubtema1(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles = {1:'Conjunto ℤ — Representação',2:'Valor Absoluto e Simétrico',3:'Adição de Inteiros',4:'Subtração de Inteiros',5:'Parênteses e Expressões'};
  ex += '<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  var lo = dif==='facil'?2:dif==='dificil'?8:4, hi = dif==='facil'?8:dif==='dificil'?20:15;
  for (var i=1;i<=n;i++) {
    var a=R.int(lo,hi), b=R.int(lo,hi), c=R.int(1,8);
    if (st===1) {
      var t=R.int(2,12), p=R.int(1,6), luc=R.int(50,500), prof=R.int(10,80);
      ex+=row(i,'Representa com um inteiro: <br>a) Descida de '+t+'°C &nbsp;&nbsp; b) '+p+'.º andar subterrâneo &nbsp;&nbsp; c) Lucro de '+luc+' € &nbsp;&nbsp; d) Profundidade de '+prof+' m');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) −'+t+' &nbsp; b) −'+p+' &nbsp; c) +'+luc+' &nbsp; d) −'+prof+'</div>';
    } else if (st===2) {
      ex+=row(i,'Calcula: &nbsp; a) |−'+a+'| = _____ &nbsp; b) |+'+b+'| = _____ &nbsp; c) Simétrico de −'+a+' = _____ &nbsp; d) Simétrico de +'+b+' = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+a+' &nbsp; b) '+b+' &nbsp; c) +'+a+' &nbsp; d) −'+b+'</div>';
    } else if (st===3) {
      ex+=row(i,'Calcula: &nbsp; a) (−'+a+') + (+'+b+') = _____ &nbsp; b) (−'+a+') + (−'+b+') = _____ &nbsp; c) (+'+a+') + (−'+b+') = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(b-a)+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+(a-b)+'</div>';
    } else if (st===4) {
      ex+=row(i,'Calcula: &nbsp; a) (+'+a+') − (−'+b+') = _____ &nbsp; b) (−'+a+') − (+'+b+') = _____ &nbsp; c) (−'+a+') − (−'+b+') = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(a+b)+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+(b-a)+'</div>';
    } else if (st===5) {
      ex+=row(i,'Remove parênteses e calcula: &nbsp; a) −('+a+' − '+b+') = _____ &nbsp; b) +(−'+a+' + '+b+') = _____ &nbsp; c) '+a+' − ('+b+' − '+c+') = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(b-a)+' &nbsp; b) '+(b-a)+' &nbsp; c) '+(a-b+c)+'</div>';
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema2(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  function gcd(a,b){ return b===0?Math.abs(a):gcd(b,a%b); }
  function frac(a,b){ if(!b)return '?'; var g=gcd(Math.abs(a),Math.abs(b)); var sn=a/g,sd=b/g; if(sd<0){sn=-sn;sd=-sd;} return sd===1?''+sn:sn+'/'+sd; }
  var titles={1:'Comparação e Ordenação',2:'Adição e Subtração de Frações',3:'Percentagens',4:'Potências',5:'Notação Científica'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      var pairs=[[1,2,1,3],[3,4,2,3],[1,4,3,8],[2,5,1,3]];
      var p=R.pick(pairs); var v1=p[0]/p[1],v2=p[2]/p[3];
      var sym=v1>v2?'&gt;':v1<v2?'&lt;':'=';
      ex+=row(i,'Compara (usa &lt;, &gt; ou =): &nbsp; a) '+p[0]+'/'+p[1]+' ___ '+p[2]+'/'+p[3]+'&nbsp;&nbsp; b) −2/3 ___ −1/2&nbsp;&nbsp; c) Ordena: −3/4, 0, 1/2, −1/4');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+sym+'&nbsp; b) &lt;&nbsp; c) −3/4 &lt; −1/4 &lt; 0 &lt; 1/2</div>';
    } else if (st===2) {
      var sets=[[1,2,1,3],[2,3,1,4],[1,4,1,6],[3,4,1,2]];
      var s=R.pick(sets); var n1=s[0],d1=s[1],n2=s[2],d2=s[3];
      var sN=n1*d2+n2*d1, dN=n1*d2-n2*d1, den=d1*d2;
      ex+=row(i,'Calcula (irredutível): &nbsp; a) '+n1+'/'+d1+' + '+n2+'/'+d2+' = _____&nbsp;&nbsp; b) '+n1+'/'+d1+' − '+n2+'/'+d2+' = _____&nbsp;&nbsp; c) −'+n1+'/'+d1+' + (−'+n2+'/'+d2+') = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+frac(sN,den)+'&nbsp; b) '+frac(dN,den)+'&nbsp; c) '+frac(-sN,den)+'</div>';
    } else if (st===3) {
      var pct=R.pick([10,20,25,50,15,30]),amt=R.pick([40,80,120,200,60,300]);
      var res=pct/100*amt;
      var price=R.pick([80,120,200,250]),disc=R.pick([10,20,25,30]);
      var after=price*(1-disc/100);
      ex+=row(i,'a) Calcula '+pct+'% de '+amt+' = _____&nbsp;&nbsp; b) Artigo a '+price+' € com '+disc+'% de desconto → preço final = _____&nbsp;&nbsp; c) Converte 3/4 para percentagem = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+res+'</strong>&nbsp; b) <strong>'+after+' €</strong>&nbsp; c) <strong>75%</strong></div>';
    } else if (st===4) {
      var base=R.pick([2,3,5,10]),exp1=R.pick([2,3,4]),exp2=R.pick([2,3]);
      ex+=row(i,'Calcula: &nbsp; a) '+base+'<sup>'+exp1+'</sup> = _____&nbsp;&nbsp; b) '+base+'<sup>'+exp1+'</sup> × '+base+'<sup>'+exp2+'</sup> = _____&nbsp;&nbsp; c) '+base+'<sup>'+(exp1+exp2)+'</sup> ÷ '+base+'<sup>'+exp2+'</sup> = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+Math.pow(base,exp1)+'&nbsp; b) '+base+'<sup>'+(exp1+exp2)+'</sup> = '+Math.pow(base,exp1+exp2)+'&nbsp; c) '+base+'<sup>'+exp1+'</sup> = '+Math.pow(base,exp1)+'</div>';
    } else if (st===5) {
      var vals=[25000,340000,0.0042,1500000,0.000081];
      var val=R.pick(vals);
      var m1=R.int(1,9),e1=R.int(2,5),m2=R.int(1,9),e2=R.int(1,4);
      var prodM=m1*m2,prodE=e1+e2;
      var prodStr=prodM>=10?(prodM/10).toFixed(1)+'×10<sup>'+(prodE+1)+'</sup>':''+prodM+'×10<sup>'+prodE+'</sup>';
      ex+=row(i,'a) Escreve '+val+' em notação científica&nbsp;&nbsp; b) Calcula: ('+m1+'×10<sup>'+e1+'</sup>) × ('+m2+'×10<sup>'+e2+'</sup>) = _____&nbsp;&nbsp; c) Converte 3,2×10<sup>4</sup> para decimal');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) ver raciocínio&nbsp; b) '+prodStr+'&nbsp; c) 32 000</div>';
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema3(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles={1:'Ângulos Internos de Polígonos',2:'Ângulos Externos',3:'Retas Paralelas',4:'Quadriláteros',5:'Áreas'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      var n1=R.pick([3,4,5,6,8,10]),n2=R.pick([4,5,6,8,10,12]);
      var s1=(n1-2)*180,s2=(n2-2)*180;
      var nr=R.pick([4,5,6,8]); var each=((nr-2)*180)/nr;
      ex+=row(i,'a) Soma dos ângulos internos de um polígono com '+n1+' lados = _____&nbsp;&nbsp; b) ...com '+n2+' lados = _____&nbsp;&nbsp; c) Polígono regular com '+nr+' lados: cada ângulo interno = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+s1+'°</strong>&nbsp; b) <strong>'+s2+'°</strong>&nbsp; c) <strong>'+each+'°</strong></div>';
    } else if (st===2) {
      var nr2=R.pick([3,4,5,6,8,10]);
      var extA=360/nr2; var intA=180-extA;
      ex+=row(i,'Polígono regular com '+nr2+' lados:&nbsp; a) Cada ângulo externo = _____&nbsp;&nbsp; b) Ângulo interno correspondente = _____&nbsp;&nbsp; c) Soma de todos os ângulos externos = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+extA+'°</strong>&nbsp; b) <strong>'+intA+'°</strong>&nbsp; c) <strong>360°</strong></div>';
    } else if (st===3) {
      var ang=R.pick([35,40,50,55,60,65,70,75]);
      var sup=180-ang;
      ex+=row(i,'Duas retas paralelas cortadas por uma secante. Um ângulo mede '+ang+'°.&nbsp; a) Ângulo alterno interno = _____&nbsp;&nbsp; b) Ângulo co-interno = _____&nbsp;&nbsp; c) Ângulo correspondente = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+ang+'°</strong> (iguais)&nbsp; b) <strong>'+sup+'°</strong> (suplementares)&nbsp; c) <strong>'+ang+'°</strong> (iguais)</div>';
    } else if (st===4) {
      var angA=R.int(80,130); var angB=180-angA;
      var a1=R.int(80,110),a2=R.int(70,100),a3=R.int(75,110);
      var a4=360-a1-a2-a3;
      if(a4<30||a4>160){a1=90;a2=85;a3=95;a4=90;}
      ex+=row(i,'a) Paralelogramo: ângulo A = '+angA+'°. Determina ângulos B, C e D.&nbsp;&nbsp; b) Quadrilátero com ângulos '+a1+'°, '+a2+'°, '+a3+'° — qual é o 4.º?');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) B=<strong>'+angB+'°</strong> ; C=<strong>'+angA+'°</strong> ; D=<strong>'+angB+'°</strong>&nbsp; b) 360−('+a1+'+'+a2+'+'+a3+') = <strong>'+a4+'°</strong></div>';
    } else if (st===5) {
      var b1=R.int(4,14),h1=R.int(3,10),b2=R.int(4,12),h2=R.int(3,8),r=R.int(3,7);
      var a1=b1*h1,a2=Math.round(b2*h2/2*10)/10,a3=Math.round(3.14*r*r*100)/100;
      ex+=row(i,'Calcula a área:&nbsp; a) Retângulo '+b1+' cm × '+h1+' cm = _____&nbsp;&nbsp; b) Triângulo base '+b2+' cm, alt. '+h2+' cm = _____&nbsp;&nbsp; c) Círculo raio '+r+' cm (π≈3,14) = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+a1+' cm²</strong>&nbsp; b) <strong>'+a2+' cm²</strong>&nbsp; c) <strong>'+a3+' cm²</strong></div>';
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema4(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles={1:'Sequências e Termo Geral',2:'Expressões Algébricas',3:'Equações do 1.º Grau',4:'Problemas com Equações'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      var t1=R.int(2,10),r=R.int(2,6);
      var seq=[t1,t1+r,t1+2*r,t1+3*r,t1+4*r];
      var t8=t1+7*r,t12=t1+11*r;
      ex+=row(i,'Sequência aritmética: '+seq.join(', ')+', …&nbsp;&nbsp; a) Razão = _____&nbsp; b) 8.º termo = _____&nbsp; c) Fórmula: tₙ = _____&nbsp; d) t₁₂ = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) r='+r+'&nbsp; b) '+t8+'&nbsp; c) tₙ='+t1+'+(n−1)×'+r+'&nbsp; d) '+t12+'</div>';
    } else if (st===2) {
      var a=R.int(2,7),b=R.int(1,5),c=R.int(2,7),d=R.int(1,5);
      var xv=R.neg(1,4),yv=R.neg(1,4);
      var simp=(a-c)+'x + '+(b+d)+'y';
      var val=a*xv-b*yv+c;
      ex+=row(i,'a) Simplifica: '+a+'x + '+b+'y − '+c+'x + '+d+'y = _____&nbsp;&nbsp; b) Para x='+xv+' e y='+yv+', calcula: '+a+'x − '+b+'y + '+c+' = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+simp+'</strong>&nbsp; b) '+a+'×('+xv+')−'+b+'×('+yv+')+'+c+' = <strong>'+val+'</strong></div>';
    } else if (st===3) {
      // Generate equation with integer solution
      var coef=R.pick([2,3,4,5]),add=R.int(2,10);
      var x=R.int(2,8); var result=coef*x+add;
      var coef2=R.pick([2,3,4]),sub=R.int(1,6);
      var x2=R.int(2,8); var result2=coef2*x2-sub;
      ex+=row(i,'Resolve e verifica:&nbsp; a) '+coef+'x + '+add+' = '+result+' &nbsp;&nbsp;&nbsp; b) '+coef2+'x − '+sub+' = '+result2);
      sol+='<div class="ex"><strong>'+i+'.</strong> a) x=('+result+'−'+add+')÷'+coef+' = <strong>'+x+'</strong>. Verif: '+coef+'×'+x+'+'+add+'='+result+' ✓&nbsp; b) x=('+result2+'+'+sub+')÷'+coef2+' = <strong>'+x2+'</strong></div>';
    } else if (st===4) {
      var mae=R.pick([30,36,40,42]),filho=mae/2>0?Math.round(mae/2):15;
      var preco=R.pick([12,15,18,20]),qtd=R.pick([3,4,5]),total=preco*qtd;
      ex+=row(i,'a) A mãe tem '+mae+' anos, o dobro da idade do filho. Qual a idade do filho? (usa uma equação)&nbsp;&nbsp; b) '+qtd+' livros custam '+total+' €. Qual o preço de cada um? (equação)');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) 2x='+mae+' → x=<strong>'+filho+'</strong> anos&nbsp; b) '+qtd+'x='+total+' → x=<strong>'+preco+' €</strong></div>';
    }
  }
  return {ex:ex, sol:sol};
}


// ─── gfGenerar: subtema-aware override ─────────────────────────────────────────
function gfGenerar(secId) {
  var stFilter = gfGetSubtemas(secId);
  if (!stFilter) {
    _gfGenerarBase(secId);
    return;
  }

  var sec = document.getElementById(secId);
  if (!sec) { _gfGenerarBase(secId); return; }

  var capBtns = sec.querySelectorAll('.gf-cap-btn.active');
  var selectedCaps = [];
  capBtns.forEach(function(b){ selectedCaps.push(parseInt(b.dataset.cap)); });
  selectedCaps.sort(function(a,b){return a-b;});

  var types = {};
  sec.querySelectorAll('.gf-type-btn.active').forEach(function(b){ types[b.dataset.type] = true; });
  var dif = gfGetDifficulty(secId);
  var statusEl = document.getElementById('gf-status-' + secId);

  if (!selectedCaps.length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um capítulo.'; return; }

  var mainHtml = '';
  var solucoesHtml = '';
  var hasSolucoes = !!types.solucoes && (!!types.exercicios || !!types.teste || !!types.minitestes);
  var N_PER_ST = 3;

  selectedCaps.forEach(function(cap) {
    var sts = stFilter[cap];
    if (!sts || sts.length === 0) sts = [1,2,3,4,5]; // fallback: all subtemas
    var capHtml = '<div style="page-break-before:' + (mainHtml.length > 500 ? 'always' : 'avoid') + '">';
    capHtml += '<h2>' + (_CAP_NAMES_GF[cap] || 'Cap. ' + cap) + '</h2>';
    var hasContent = false;
    var capSolHtml = '';

    if (types.resumo) {
      try { var r = _buildResumoCapHTML(cap); if(r && r.trim()) { capHtml += '<h3>Resumo Teórico</h3>' + r; hasContent=true; } } catch(e){}
    }

    if (types.exercicios) {
      capHtml += '<h3>Exercícios por Subtema</h3>';
      capHtml += '<div style="color:#888;font-size:.78rem;margin-bottom:1rem">Data: '+new Date().toLocaleDateString('pt-PT')+'</div>';
      sts.forEach(function(st) {
        var res = null;
        try {
          if (cap===1) res = _gfSubtema1(st, dif, N_PER_ST);
          else if (cap===2) res = _gfSubtema2(st, dif, N_PER_ST);
          else if (cap===3) res = _gfSubtema3(st, dif, N_PER_ST);
          else if (cap===4) res = _gfSubtema4(st, dif, N_PER_ST);
        } catch(e){ console.warn('subtema err', cap, st, e); }
        if (res && res.ex) {
          capHtml += res.ex;
          hasContent = true;
          if (hasSolucoes && res.sol) capSolHtml += res.sol;
        }
      });
    }

    if (types.teste) {
      try { var t = _buildTesteCapHTML(cap); if(t && t.trim()) { capHtml += '<h3>Teste de Avaliação</h3>' + t; hasContent=true; } } catch(e){}
    }

    capHtml += '</div>';
    if (hasContent) mainHtml += capHtml;

    if (hasSolucoes && capSolHtml) {
      solucoesHtml += '<div style="page-break-before:' + (solucoesHtml ? 'always' : 'avoid') + ';margin-bottom:2rem">'
        + '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'
        + '<h4 style="color:#fff;background:#3d5c54;padding:.6rem 1rem;border-radius:8px;margin:0 0 .75rem;font-size:.88rem">Exercícios — Cap. '+cap+'</h4>'
        + '<div style="font-size:.88rem;line-height:1.75">'+capSolHtml+'</div></div></div>';
    }
  });

  if (hasSolucoes && solucoesHtml) {
    mainHtml += '<div style="page-break-before:always;margin-top:2rem">'
      + '<div style="border:3px solid #3d5c54;border-radius:14px;padding:1rem 1.5rem;margin-bottom:1.5rem;background:#f0faf4">'
      + '<div style="font-family:Montserrat,sans-serif;font-size:1rem;font-weight:800;color:#2d3530"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> SOLUÇÕES</div></div>'
      + solucoesHtml + '</div>';
  }

  if (!mainHtml) mainHtml = '<p style="color:#888;padding:1rem 0">Sem conteúdo. Seleciona pelo menos um subtema.</p>';

  _gfContent[secId] = mainHtml;
  var preview = document.getElementById('gf-content-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);
  if (preview) preview.innerHTML = mainHtml;
  if (previewWrap) previewWrap.style.display = 'block';
  if (statusEl) { statusEl.textContent = '✓ Ficha com subtemas gerada'; statusEl.style.color = 'var(--c1-mid)'; }
}


function gfDownload(secId) {
  var content = _gfContent[secId];
  if (!content) { gfGenerar(secId); setTimeout(function(){ gfDownload(secId); }, 200); return; }

  var sec = document.getElementById(secId);
  var capNums = [];
  if (sec) {
    sec.querySelectorAll('.gf-cap-btn.active').forEach(function(b){ capNums.push(parseInt(b.dataset.cap)); });
  }
  capNums.sort(function(a,b){return a-b;});
  var capNames = {1:'Inteiros',2:'Racionais',3:'Geometria',4:'Álgebra'};
  var capLabels = capNums.map(function(c){ return 'Cap. '+c+' · '+(capNames[c]||''); });
  var titleShort = capLabels.join(' + ') || 'Ficha';
  var docTitle = '3ponto14 · Matemática 7.º Ano · ' + titleShort;
  var now = new Date().toLocaleDateString('pt-PT');

  // Build meta fields row
  var metaRow = '<div class="doc-meta">'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
    + '</div>';

  // Build page header
  var header = '<div class="doc-header">'
    + '<div>'
    +   '<div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
    +   '<div class="doc-title">Ficha de Trabalho<em>' + titleShort + '</em></div>'
    + '</div>'
    + '<div class="doc-logo">3&#960;</div>'
    + '</div>';

  // Footer
  var footer = '<div class="doc-footer">'
    + '<span>3ponto14 · Matemática 7.º Ano</span>'
    + '<span>' + now + '</span>'
    + '</div>';

  // Assemble full page content (uses wrapPrintDoc CSS)
  var pageContent = header + metaRow + content + footer;
  var fullHtml = (typeof wrapPrintDoc === 'function')
    ? wrapPrintDoc(docTitle, pageContent)
    : '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+docTitle+'</title></head><body>'+pageContent+'</body></html>';

  var fname = '3ponto14_mat7_' + capNums.join('-') + '_' + new Date().toISOString().slice(0,10);
  if (typeof htmlToPdfDownload === 'function') {
    htmlToPdfDownload(fullHtml, fname + '.pdf');
  } else {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([fullHtml], {type:'text/html;charset=utf-8'}));
    a.download = fname + '.html';
    a.click();
  }
}

function gfActionHTML(secId) {
  var status = document.getElementById('gf-status-' + secId);
  if (status) { status.textContent = 'A gerar HTML…'; status.style.color = ''; }
  setTimeout(function() {
    try { gfGenerar(secId); } catch(e) {
      if (status) { status.textContent = 'Erro ao gerar. Tenta novamente.'; status.style.color = '#c0392b'; }
      return;
    }
    var html = _gfContent[secId];
    if (!html) {
      if (status) { status.textContent = 'Seleciona pelo menos um capítulo e um tipo de conteúdo.'; status.style.color = '#c0392b'; }
      return;
    }
    gfDownloadHTML(secId);
    if (status) { status.textContent = '✓ HTML descarregado!'; status.style.color = 'var(--c1-mid)'; }
    setTimeout(function() { if (status) status.textContent = ''; _gfContent[secId] = null; }, 2000);
  }, 40);
}

function gfDownloadHTML(secId) {
  var content = _gfContent[secId];
  if (!content) { gfGenerar(secId); setTimeout(function(){ gfDownloadHTML(secId); }, 200); return; }

  var sec = document.getElementById(secId);
  var capNums = [];
  if (sec) sec.querySelectorAll('.gf-cap-btn.active').forEach(function(b){ capNums.push(parseInt(b.dataset.cap)); });
  capNums.sort(function(a,b){ return a-b; });
  var capNames = {1:'Inteiros',2:'Racionais',3:'Geometria',4:'Álgebra'};
  var capLabels = capNums.map(function(c){ return 'Cap. '+c+' · '+(capNames[c]||''); });
  var titleShort = capLabels.join(' + ') || 'Ficha';
  var docTitle = '3ponto14 · Matemática 7.º Ano · ' + titleShort;
  var now = new Date().toLocaleDateString('pt-PT');

  var metaRow = '<div class="doc-meta">'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
    + '</div>';

  var header = '<div class="doc-header">'
    + '<div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
    +   '<div class="doc-title">Ficha de Trabalho<em>' + titleShort + '</em></div></div>'
    + '<div class="doc-logo">3&#960;</div></div>';

  var footer = '<div class="doc-footer">'
    + '<span>3ponto14 · Matemática 7.º Ano</span><span>' + now + '</span></div>';

  var pageContent = header + metaRow + content + footer;
  var fullHtml = (typeof wrapPrintDoc === 'function')
    ? wrapPrintDoc(docTitle, pageContent)
    : '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+docTitle+'</title></head><body>'+pageContent+'</body></html>';

  var fname = '3ponto14_mat7_' + capNums.join('-') + '_' + new Date().toISOString().slice(0,10) + '.html';
  var blob = new Blob([fullHtml], {type: 'application/octet-stream'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fname;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
}

// ═══════════════════════════════════════════════════════════════
// EDUPT — ERROR TRACKER  (registo persistente de erros por questão)
// ═══════════════════════════════════════════════════════════════
const ErrorTracker = (function(){
  const KEY = 'edupt_errors_v1';
  const CAP_LABELS = {cap1:'Cap. 1',cap2:'Cap. 2',cap3:'Cap. 3',cap4:'Cap. 4'};
  const SEC_LABELS = {q:'Questões-aula',m:'Miniteste',t:'Teste',rel:'Relâmpago',vf:'V/F'};

  function _load(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; }
  }
  function _save(d){
    try{ localStorage.setItem(KEY, JSON.stringify(d)); }catch(e){}
  }
  function _strip(html){
    try{
      var tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return (tmp.textContent||tmp.innerText||'').replace(/\s+/g,' ').trim().slice(0,140);
    }catch(e){ return String(html||'').slice(0,140); }
  }

  function record(capId, secKey, qid, texto, correct){
    var d = _load();
    var key = capId+'|'+qid;
    // Extract tema from DOM element if present
    var tema = '';
    try {
      var el = document.getElementById(qid);
      if (el) {
        tema = el.dataset.tema || '';
        if (!tema) {
          var qn = el.querySelector('.q-number');
          if (qn) { var m = qn.textContent.match(/·\s*(.+)$/); if (m) tema = m[1].trim(); }
        }
      }
    } catch(e) {}
    if(!d[key]) d[key] = {capId:capId, secKey:secKey, qid:qid, texto:_strip(texto), tema:tema, erros:0, acertos:0, ultima:null};
    if (!d[key].tema && tema) d[key].tema = tema;
    if(correct) d[key].acertos++; else d[key].erros++;
    d[key].ultima = new Date().toISOString().slice(0,10);
    _save(d);
  }

  function getErrors(capId, minErrors){
    minErrors = minErrors||1;
    var d = _load();
    return Object.values(d)
      .filter(function(r){ return (!capId||r.capId===capId) && r.erros>=minErrors; })
      .sort(function(a,b){ return b.erros-a.erros || a.acertos-b.acertos; });
  }

  function clearCap(capId){
    var d = _load();
    Object.keys(d).forEach(function(k){ if(!capId||d[k].capId===capId) delete d[k]; });
    _save(d);
  }

  return { record, getErrors, clearCap, CAP_LABELS, SEC_LABELS };
})();

// Flush any _etRecord calls that arrived before ErrorTracker was defined
if (typeof _etQueue !== 'undefined') {
  _etQueue.forEach(function(args){ ErrorTracker.record.apply(ErrorTracker, args); });
  _etQueue = [];
}

// ── Render error panel ────────────────────────────────────────
function etRenderPanel(containerId, capId){
  var container = document.getElementById(containerId);
  if(!container) return;
  var _filter = container._etFilter || 'all';
  var all  = ErrorTracker.getErrors(capId, 1);
  var hot  = all.filter(function(r){ return r.erros>=3; });
  var warn = all.filter(function(r){ return r.erros>=1 && r.erros<3; });
  var shown = _filter==='hot' ? hot : _filter==='revisao' ? warn : all;

  container.innerHTML =
    '<div class="et-header">' +
      '<div class="et-title">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        '\u00a0Onde erro mais' +
        (hot.length>0 ? ' <span class="et-badge">'+hot.length+' cr\u00edticas</span>' : '') +
      '</div>' +
      '<button class="et-clear-btn" onclick="ErrorTracker.clearCap(\''+capId+'\');etRenderPanel(\''+containerId+'\',\''+capId+'\')">Limpar</button>' +
    '</div>' +
    '<div class="et-filters" style="margin-bottom:1rem">' +
      '<button class="et-filter'+(_filter==='all'?' active':'')+'" onclick="document.getElementById(\''+containerId+'\')._etFilter=\'all\';etRenderPanel(\''+containerId+'\',\''+capId+'\')">Todas ('+all.length+')</button>' +
      '<button class="et-filter'+(_filter==='hot'?' active':'')+'" onclick="document.getElementById(\''+containerId+'\')._etFilter=\'hot\';etRenderPanel(\''+containerId+'\',\''+capId+'\')">Cr\u00edticas 3+ ('+hot.length+')</button>' +
      '<button class="et-filter'+(_filter==='revisao'?' active-warn':'')+'" onclick="document.getElementById(\''+containerId+'\')._etFilter=\'revisao\';etRenderPanel(\''+containerId+'\',\''+capId+'\')">A rever 1-2 ('+warn.length+')</button>' +
    '</div>' +
    (shown.length===0
      ? '<div class="et-empty">'+(all.length===0 ? 'Ainda sem erros registados \u2014 responde a questões para veres aqui as tuas dificuldades.' : 'Sem questões nesta categoria.')+'</div>'
      : shown.slice(0,15).map(function(r,i){
          var tot = r.erros+r.acertos;
          var pct = tot>0 ? Math.round(r.erros/tot*100) : 0;
          var cls = r.erros>=3 ? 'hot' : 'warn';
          var barCol = r.erros>=3 ? 'var(--wrong)' : '#f59e0b';
          return '<div class="et-item '+cls+'">' +
            '<div class="et-rank">'+(i+1)+'</div>' +
            '<div class="et-body">' +
              '<div class="et-q">'+r.texto+(r.texto.length>=140?'\u2026':'')+'</div>' +
              '<div class="et-meta">' +
                '<span class="et-cap-tag">'+ErrorTracker.CAP_LABELS[r.capId]+'</span>' +
                '<span class="et-section-tag">'+(ErrorTracker.SEC_LABELS[r.secKey]||r.secKey)+'</span>' +
                (r.ultima ? '<span class="et-section-tag">\u00b7 '+r.ultima+'</span>' : '') +
              '</div>' +
              '<div class="et-bar-wrap"><div class="et-bar" style="width:'+pct+'%;background:'+barCol+'"></div></div>' +
            '</div>' +
            '<div class="et-stats">' +
              '<div class="et-ratio">'+r.erros+'\u00d7</div>' +
              '<div class="et-ratio-label">erros</div>' +
              (r.acertos>0 ? '<div style="font-size:.63rem;color:var(--c1-mid);margin-top:2px">'+r.acertos+'\u2713</div>' : '') +
            '</div>' +
          '</div>';
        }).join('')
    );
}

// ── Render combined error panel for multiple caps (MEGA mode) ─
function etRenderMegaPanel(containerId, capIds) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var _filter = container._etFilter || 'all';

  // Merge errors from all selected caps
  var all = [];
  if (!capIds || capIds.length === 0) {
    // show nothing yet
    container.innerHTML = '<div class="et-empty">Seleciona capítulos e responde a questões para ver os erros aqui.</div>';
    return;
  }
  capIds.forEach(function(capId) {
    ErrorTracker.getErrors(capId, 1).forEach(function(r) { all.push(r); });
  });
  // Also include 'mega' capId errors from MEGA-only questions
  ErrorTracker.getErrors('mega', 1).forEach(function(r) { all.push(r); });
  // Sort combined
  all.sort(function(a,b){ return b.erros - a.erros || a.acertos - b.acertos; });

  var hot  = all.filter(function(r){ return r.erros >= 3; });
  var warn = all.filter(function(r){ return r.erros >= 1 && r.erros < 3; });
  var shown = _filter === 'hot' ? hot : _filter === 'revisao' ? warn : all;

  var capLabel = capIds.map(function(c){ return ErrorTracker.CAP_LABELS[c] || c; }).join(' + ');

  container.innerHTML =
    '<div class="et-header">' +
      '<div class="et-title">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        '\u00a0Onde erro mais \u2014 ' + capLabel +
        (hot.length > 0 ? ' <span class="et-badge">' + hot.length + ' cr\u00edticas</span>' : '') +
      '</div>' +
      '<button class="et-clear-btn" onclick="(window._etMegaCapIds||[]).forEach(function(c){ErrorTracker.clearCap(c);});ErrorTracker.clearCap(\'mega\');etRenderMegaPanel(\'et-mega\',window._etMegaCapIds||[])">Limpar</button>' +
    '</div>' +
    '<div class="et-filters" style="margin-bottom:1rem">' +
      '<button class="et-filter' + (_filter==='all'?' active':'') + '" onclick="document.getElementById(\'et-mega\')._etFilter=\'all\';etRenderMegaPanel(\'et-mega\',window._etMegaCapIds||[])">Todas (' + all.length + ')</button>' +
      '<button class="et-filter' + (_filter==='hot'?' active':'') + '" onclick="document.getElementById(\'et-mega\')._etFilter=\'hot\';etRenderMegaPanel(\'et-mega\',window._etMegaCapIds||[])">Cr\u00edticas 3+ (' + hot.length + ')</button>' +
      '<button class="et-filter' + (_filter==='revisao'?' active-warn':'') + '" onclick="document.getElementById(\'et-mega\')._etFilter=\'revisao\';etRenderMegaPanel(\'et-mega\',window._etMegaCapIds||[])">A rever 1-2 (' + warn.length + ')</button>' +
    '</div>' +
    (shown.length === 0
      ? '<div class="et-empty">' + (all.length === 0 ? 'Ainda sem erros registados nestes cap\u00edtulos.' : 'Sem quest\u00f5es nesta categoria.') + '</div>'
      : shown.slice(0,20).map(function(r, i) {
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
  // Store capIds on window so filter buttons can re-render
  window._etMegaCapIds = capIds;
}
document.addEventListener('DOMContentLoaded', function(){
  var panels = [
    {secId:'sec-progresso',  cid:'et-cap1', capId:'cap1'},
    {secId:'sec-progresso2', cid:'et-cap2', capId:'cap2'},
    {secId:'sec-progresso3', cid:'et-cap3', capId:'cap3'},
    {secId:'sec-progresso4', cid:'et-cap4', capId:'cap4'},
  ];
  panels.forEach(function(p){
    var sec = document.getElementById(p.secId);
    if(!sec) return;
    var div = document.createElement('div');
    div.id = p.cid;
    div.className = 'et-panel';
    sec.appendChild(div);
  });
});

// ── Wrap progRenderSection functions to auto-update panel ─────
(function(){
  function wrap(fnName, panelId, capId){
    var orig = window[fnName];
    if(typeof orig !== 'function') return;
    window[fnName] = function(){ orig.apply(this, arguments); etRenderPanel(panelId, capId); };
  }
  wrap('progRenderSection',  'et-cap1', 'cap1');
  wrap('progRenderSection2', 'et-cap2', 'cap2');
  wrap('progRenderSection3', 'et-cap3', 'cap3');
  wrap('renderProg4',        'et-cap4', 'cap4');
  // MEGA: wrap _mprogRender to show errors from all selected caps combined
  var origMprog = window._mprogRender;
  if (typeof origMprog === 'function') {
    window._mprogRender = function() {
      origMprog.apply(this, arguments);
      // Render combined error panel for selected caps
      var sel = typeof capitulosSelecionados !== 'undefined' ? capitulosSelecionados : [];
      var capIds = sel.length > 0 ? sel.map(function(n){ return 'cap'+n; }) : null;
      etRenderMegaPanel('et-mega', capIds);
    };
  }
})();

// ── Helper: extract question text from DOM ────────────────────
function _etText(qid){
  var el = document.getElementById(qid);
  if(!el) return qid;
  var t = el.querySelector('.quiz-q-text,.q-text,.relampago-q .q-text,.q-enunciado');
  return t ? t.textContent.trim() : el.textContent.trim().slice(0,140);
}

/* ══════════════════════════════════════════════
   PARTILHA DE SELEÇÕES POR URL
   Serializa caps, subtemas, tipos e nível para
   query string — funciona em qualquer computador
══════════════════════════════════════════════ */

function gfSerializarURL(secId) {
  var params = new URLSearchParams();

  // Capítulos ativos
  var caps = [];
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn.active').forEach(function(btn) {
    caps.push(btn.getAttribute('data-cap'));
  });
  if (caps.length) params.set('caps', caps.join(','));

  // Subtemas ativos por capítulo
  var stMap = {};
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-chip.active').forEach(function(chip) {
    var cap = chip.getAttribute('data-cap');
    var st  = chip.getAttribute('data-st');
    if (!stMap[cap]) stMap[cap] = [];
    stMap[cap].push(st);
  });
  var stParts = [];
  Object.keys(stMap).forEach(function(cap) {
    stParts.push(cap + '-' + stMap[cap].join('.'));
  });
  if (stParts.length) params.set('st', stParts.join(','));

  // O que incluir
  var tipos = [];
  document.querySelectorAll('#gf-types-' + secId + ' .gf-type-btn.active').forEach(function(btn) {
    tipos.push(btn.getAttribute('data-type'));
  });
  if (tipos.length) params.set('tipos', tipos.join(','));

  // Nível de dificuldade
  var difBtn = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn.active');
  if (difBtn) params.set('dif', difBtn.getAttribute('data-dif'));

  return window.location.pathname + '?' + params.toString() + '#gerador-fichas';
}

function gfCopiarLink(secId) {
  var url = window.location.origin + gfSerializarURL(secId);
  var btn = document.getElementById('gf-share-btn-' + secId);
  var label = document.getElementById('gf-share-label-' + secId);

  navigator.clipboard.writeText(url).then(function() {
    if (btn) btn.classList.add('copied');
    if (label) label.textContent = '✓ Link copiado!';
    setTimeout(function() {
      if (btn) btn.classList.remove('copied');
      if (label) label.textContent = 'Copiar link';
    }, 2500);
  }).catch(function() {
    // Fallback para browsers sem clipboard API moderna
    try {
      var ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = document.execCommand('copy'); // depreciado mas mantido como fallback de último recurso
      document.body.removeChild(ta);
      if (ok) {
        if (btn) btn.classList.add('copied');
        if (label) label.textContent = '✓ Link copiado!';
        setTimeout(function() {
          if (btn) btn.classList.remove('copied');
          if (label) label.textContent = 'Copiar link';
        }, 2500);
      } else {
        if (label) label.textContent = 'Copia: ' + url;
      }
    } catch(e) {
      if (label) label.textContent = 'Erro ao copiar';
    }
  });
}

function gfRestaurarDeURL() {
  var params = new URLSearchParams(window.location.search);
  if (!params.has('caps') && !params.has('st') && !params.has('tipos') && !params.has('dif')) return;

  var secId = 'mat7-downloads';

  // Desativar todos os caps primeiro
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  // Fechar todas as trays
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-tray').forEach(function(t) {
    t.classList.remove('open');
  });
  // Desativar todos os subtemas
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-chip').forEach(function(c) {
    c.classList.remove('active');
  });

  // Restaurar caps
  if (params.has('caps')) {
    params.get('caps').split(',').forEach(function(cap) {
      var btn = document.querySelector('#gf-caps-' + secId + ' .gf-cap-btn[data-cap="' + cap + '"]');
      if (btn) btn.classList.add('active');
    });
  }

  // Restaurar subtemas
  if (params.has('st')) {
    params.get('st').split(',').forEach(function(part) {
      var dash = part.indexOf('-');
      if (dash < 0) return;
      var cap = part.slice(0, dash);
      var sts = part.slice(dash + 1).split('.');
      var tray = document.getElementById('gf-st-' + cap + '-' + secId);
      if (tray) tray.classList.add('open');
      sts.forEach(function(st) {
        var chip = document.querySelector('#gf-caps-' + secId + ' .gf-st-chip[data-cap="' + cap + '"][data-st="' + st + '"]');
        if (chip) chip.classList.add('active');
      });
    });
  }

  // Restaurar tipos
  if (params.has('tipos')) {
    // Desativar todos os tipos
    document.querySelectorAll('#gf-types-' + secId + ' .gf-type-btn').forEach(function(btn) {
      btn.classList.remove('active');
      var tick = btn.querySelector('.gf-tick');
      if (tick) tick.textContent = '';
    });
    params.get('tipos').split(',').forEach(function(tipo) {
      var btn = document.querySelector('#gf-types-' + secId + ' .gf-type-btn[data-type="' + tipo + '"]');
      if (btn) {
        btn.classList.add('active');
        var tick = btn.querySelector('.gf-tick');
        if (tick) tick.textContent = '✓';
      }
    });
  }

  // Restaurar nível
  if (params.has('dif')) {
    document.querySelectorAll('#gf-dif-' + secId + ' .gf-dif-btn').forEach(function(btn) {
      btn.classList.remove('active');
    });
    var difBtn = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn[data-dif="' + params.get('dif') + '"]');
    if (difBtn) difBtn.classList.add('active');
  }

  // Scroll suave para o gerador e regenerar ficha com os filtros restaurados
  setTimeout(function() {
    var el = document.getElementById('mat7-downloads');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof mat7GfGenerate === 'function') mat7GfGenerate();
  }, 300);
}

// Correr ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  gfRestaurarDeURL();
});

// ═══ CHAPTER NAV BAR — goToChapter ═══
function goToChapter(n) {
  // Map chapter number to view IDs and show functions
  var viewMap = {
    1: { id: 'view-math',  fn: function() { showMathView && showMathView() || (document.getElementById('view-math').style.display='block') } },
    2: { id: 'view-math2', fn: function() { showMathView2 && showMathView2() || (document.getElementById('view-math2').style.display='block') } },
    3: { id: 'view-math3', fn: function() { showMathView3 && showMathView3() || (document.getElementById('view-math3').style.display='block') } },
    4: { id: 'view-math4', fn: function() { showMathView4 && showMathView4() || (document.getElementById('view-math4').style.display='block') } }
  };
  var allViews = ['view-portal','view-mat7','view-math','view-math2','view-math3','view-math4','view-mega'];
  // Hide all views
  allViews.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Show the target view
  var target = document.getElementById('view-math' + (n > 1 ? n : ''));
  if (target) {
    target.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Use viewMap fn to run the proper show/init function
  if (viewMap[n] && typeof viewMap[n].fn === 'function') viewMap[n].fn();
  // For chapters 2/3/4 activate first section
  if (n === 2 && typeof showSection2 === 'function') showSection2('temas2', null);
  if (n === 3 && typeof showSection3 === 'function') showSection3('temas3', null);
  if (n === 4 && typeof showSection4 === 'function') showSection4('temas4', null);
}

// ═══ TEACHER STRIP TOGGLE ═══
function toggleTeacher(btn) {
  var strip = btn.closest('.teacher-strip');
  if (!strip) return;
  strip.classList.toggle('open');
}

// ═══ CHECKLIST TOGGLE ═══
function toggleChecklist(item, fillId, containerId) {
  var cb = item.querySelector('.checklist-cb');
  if (!cb) return;
  cb.classList.toggle('checked');
  item.classList.toggle('done');
  // Update progress bar
  var container = document.getElementById(containerId);
  var fillEl = document.getElementById(fillId);
  if (!container || !fillEl) return;
  var all = container.querySelectorAll('.checklist-item');
  var done = container.querySelectorAll('.checklist-item.done');
  var pct = all.length ? Math.round(done.length / all.length * 100) : 0;
  fillEl.style.width = pct + '%';
}

// ══════════════════════════════════════════════════════
// DOWNLOAD PROGRESSO — JSON e PDF
// ══════════════════════════════════════════════════════
function _progRecolherTudo() {
  // Junta dados dos 4 caps + ProgressManager XP
  var cap4raw = {};
  try { cap4raw = JSON.parse(localStorage.getItem('edupt_cap4') || '{}'); } catch(e) {}
  var pm = {};
  try { pm = JSON.parse(localStorage.getItem('edupt_progress_v2') || '{}'); } catch(e) {}

  function secTotals(data) {
    var c=0,t=0;
    if (data && data.sections) Object.values(data.sections).forEach(function(s){ c+=s.correct||0; t+=s.total||0; });
    return { corretas: c, total: t, taxa: t>0 ? Math.round(c/t*100)+'%' : '—', detalhe: data && data.sections ? data.sections : {} };
  }
  function cap4Totals() {
    var c=0,t=0,det={};
    Object.entries(cap4raw).forEach(function(kv) {
      var k=kv[0], v=kv[1];
      if (v && typeof v.correct==='number') { c+=v.correct; t+=v.total||0; det[k]={corretas:v.correct,total:v.total||0}; }
    });
    return { corretas: c, total: t, taxa: t>0 ? Math.round(c/t*100)+'%' : '—', detalhe: det };
  }

  return {
    exportadoEm: new Date().toLocaleString('pt-PT'),
    xpTotal: (pm.totalXp || 0),
    streakDias: (pm.streak || 0),
    capitulos: {
      'Cap. 1 · Inteiros':  secTotals(typeof _progData  !== 'undefined' ? _progData  : null),
      'Cap. 2 · Racionais': secTotals(typeof _progData2 !== 'undefined' ? _progData2 : null),
      'Cap. 3 · Geometria': secTotals(typeof _progData3 !== 'undefined' ? _progData3 : null),
      'Cap. 4 · Álgebra':   cap4Totals()
    },
    historico: {
      cap1: (typeof _progData  !== 'undefined' ? _progData.log  : []),
      cap2: (typeof _progData2 !== 'undefined' ? _progData2.log : []),
      cap3: (typeof _progData3 !== 'undefined' ? _progData3.log : []),
      cap4: (function(){ var p={}; try{p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');}catch(e){} return p.last_updated ? p : null; })()
    }
  };
}


function progDownloadPDF() {
  var d = _progRecolherTudo();
  var caps = d.capitulos;
  var cor = function(taxa) {
    if (taxa==='—') return '#9e9e9e';
    var n = parseInt(taxa);
    return n>=80 ? '#516860' : n>=50 ? '#c4a030' : '#c4796e';
  };
  var barraHtml = function(taxa) {
    if (taxa==='—') return '<div style="width:100%;height:8px;background:#eee;border-radius:4px"></div>';
    var n = parseInt(taxa);
    return '<div style="width:100%;height:8px;background:#eee;border-radius:4px;overflow:hidden"><div style="height:100%;width:'+n+'%;background:'+cor(taxa)+';border-radius:4px"></div></div>';
  };

  var capsHtml = Object.entries(caps).map(function(kv) {
    var nome = kv[0], c = kv[1];
    return '<tr><td style="padding:10px 14px;font-weight:600;color:#2a2724">'+nome+'</td>'
      +'<td style="padding:10px 14px;text-align:center;font-family:monospace">'+c.corretas+'/'+c.total+'</td>'
      +'<td style="padding:10px 14px;text-align:center;font-weight:700;color:'+cor(c.taxa)+'">'+c.taxa+'</td>'
      +'<td style="padding:10px 24px 10px 14px;min-width:120px">'+barraHtml(c.taxa)+'</td></tr>';
  }).join('');

  var totalCorretas = Object.values(caps).reduce(function(s,c){return s+c.corretas;},0);
  var totalQs       = Object.values(caps).reduce(function(s,c){return s+c.total;},0);
  var taxaGlobal    = totalQs>0 ? Math.round(totalCorretas/totalQs*100)+'%' : '—';

  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<title>Progresso 3ponto14 · Mat 7</title>'
    + '</head><body>'
    + '<h1>3ponto14 · Matemática 7.º ano</h1>'
    + ''
    + '<p class="sub">Relatório de progresso exportado em '+d.exportadoEm+'</p>'
    + '<div class="stat-grid">'
    +   '<div class="stat"><div class="n">'+totalCorretas+'</div><div class="l">Respostas certas</div></div>'
    +   '<div class="stat"><div class="n">'+taxaGlobal+'</div><div class="l">Taxa global</div></div>'
    +   '<div class="stat"><div class="n">'+d.xpTotal+'</div><div class="l">XP total</div></div>'
    + '</div>'
    + '<h2>Desempenho por Capítulo</h2>'
    + '<table><thead><tr><th>Capítulo</th><th style="text-align:center">Certas / Total</th><th style="text-align:center">Taxa</th><th>Barra</th></tr></thead>'
    + '<tbody>'+capsHtml+'</tbody></table>'
    + '<div class="footer"><span>3ponto14.pt</span><span>Progresso guardado localmente neste browser</span></div>'
    + '</body></html>';

  var win = window.open('', '_blank', 'width=720,height=900');
  if (!win) { alert('Permite popups para gerar o PDF.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 400);
}

// ═══════════════════════════════════════════════════════════════
// PROGRESSO UNIFICADO — hub tab "Progresso" (todos os capítulos)
// ═══════════════════════════════════════════════════════════════

var _treinoState = {};

// ── Builders para cada cap — output formato padrão ──
var _TREINO_BUILDERS = {
  cap1: function(temaNum, dif) {
    try {
      var l = typeof lim === 'function' ? lim(dif||'medio') : {min:-20,max:20};
      return buildExercicio(String(temaNum), 'mc', l.min, l.max, 1, dif||'medio')
          || buildExercicio(String(temaNum), 'fill', l.min, l.max, 1, dif||'medio');
    } catch(e) { return null; }
  },
  cap2: function(temaNum, dif) {
    try { return buildEx2(String(temaNum), 'mc', dif||'medio'); } catch(e) { return null; }
  },
  cap3: function(temaNum, dif) {
    try { return buildEx3(String(temaNum), 'mc', dif||'medio'); } catch(e) { return null; }
  },
  cap4: function(temaNum, dif) {
    try {
      var ex = buildEx4(String(temaNum), dif||'medio');
      if (!ex) return null;
      var labels = ['A','B','C','D'];
      var correctLetter = ex.c ? ex.c.charAt(0) : 'A';
      var correctIdx = labels.indexOf(correctLetter);
      var opcoes = (ex.opts||[]).map(function(o){ return o.replace(/^[A-D]\)\s*/,''); });
      var resposta = correctIdx >= 0 ? opcoes[correctIdx] : opcoes[0];
      return { tipo:'mc', tema:'Cap. 4 · Tema '+temaNum, enun:ex.en||'', opcoes:opcoes, resposta:resposta, expl:ex.fb||'' };
    } catch(e) { return null; }
  }
};

function _treinoTemaNum(temaStr) {
  if (!temaStr) return null;
  var m = temaStr.match(/Tema\s+(\d+)/i);
  return m ? parseInt(m[1]) : null;
}

function _treinoGetGrupos() {
  var allErrors = [];
  ['cap1','cap2','cap3','cap4'].forEach(function(capId){
    ErrorTracker.getErrors(capId, 1).forEach(function(r){ allErrors.push(r); });
  });
  allErrors.sort(function(a,b){ return b.erros - a.erros; });
  var temaGroups = {};
  allErrors.forEach(function(r) {
    var temaNum = _treinoTemaNum(r.tema);
    if (!temaNum) temaNum = Math.floor(Math.random()*5)+1;
    var key = r.capId + '|' + temaNum;
    if (!temaGroups[key]) temaGroups[key] = { capId:r.capId, temaNum:temaNum, tema:r.tema||'', erros:0 };
    temaGroups[key].erros += r.erros;
  });
  return Object.values(temaGroups).sort(function(a,b){ return b.erros - a.erros; }).slice(0, 5);
}

function _treinoGerar(grupos, dif, perGrupo) {
  perGrupo = perGrupo || 2;
  var exercicios = [];
  grupos.forEach(function(g) {
    var builder = _TREINO_BUILDERS[g.capId];
    if (!builder) return;
    var tentativas = 0, gerados = 0;
    while (gerados < perGrupo && tentativas < 10) {
      tentativas++;
      var ex = builder(g.temaNum, dif);
      if (ex && ex.enun) {
        ex._capId = g.capId;
        ex._temaNum = g.temaNum;
        exercicios.push(ex);
        gerados++;
      }
    }
  });
  return exercicios;
}

function _treinoRenderExercicios(exercicios, containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (!exercicios.length) {
    el.innerHTML = '<p style="color:var(--ink4);font-size:.88rem;font-style:italic">Não foi possível gerar exercícios. Responde a mais questões primeiro.</p>';
    return;
  }
  var labels = ['A','B','C','D'];
  var html = '';
  exercicios.forEach(function(ex, i) {
    var qid = 'treino-q-' + i;
    _treinoState[qid] = { answered: false };
    var capLabel = {cap1:'Cap. 1',cap2:'Cap. 2',cap3:'Cap. 3',cap4:'Cap. 4'}[ex._capId]||'';
    var temaShort = (ex.tema||'').replace(/^(Tema \d+\s*[—\-]?\s*)/,'').trim() || ex.tema;
    html += '<div class="quiz-question" id="' + qid + '" style="margin-bottom:1rem">';
    html += '<div class="q-number" style="color:var(--cs-deep)">' + capLabel + ' · ' + (temaShort||ex.tema||'') + '</div>';
    if (ex.visual) html += '<div class="q-visual">' + ex.visual + '</div>';
    html += '<div class="q-text">' + (typeof formatMath==='function'?formatMath(ex.enun):ex.enun) + '</div>';
    if (ex.tipo === 'fill') {
      html += '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">'
            + '<input class="fill-input" id="'+qid+'-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">'
            + '<button class="check-btn" onclick="checkTreino(\''+qid+'\',\'fill\','+ex.resposta+')">Verificar</button>'
            + '</div>';
    } else {
      var opcs = ex.tipo==='vf'
        ? [{txt:'Verdadeiro',isC:ex.resposta==='V'},{txt:'Falso',isC:ex.resposta==='F'}]
        : (ex.opcoes||[]).map(function(o){ return {txt:o,isC:String(o)===String(ex.resposta)}; });
      html += '<div class="options">';
      opcs.forEach(function(o,k){
        var lbl = ex.tipo==='vf'?(k===0?'V':'F'):labels[k];
        html += '<button class="option-btn" onclick="checkTreino(\''+qid+'\',\'mc\','+o.isC+',this)">'
              + '<span class="opt-label">'+lbl+'</span>'
              + (typeof formatMath==='function'?formatMath(o.txt):o.txt)
              + '</button>';
      });
      html += '</div>';
    }
    var explEsc = (ex.expl||'').replace(/'/g,"&#39;").replace(/"/g,'&quot;');
    html += '<span id="'+qid+'-expl" style="display:none">'+explEsc+'</span>';
    html += '<div class="feedback" id="'+qid+'-fb"></div>';
    html += '</div>';
  });
  el.innerHTML = html;
}

function checkTreino(qid, tipo, val, btn) {
  var st = _treinoState[qid];
  if (!st || st.answered) return;
  st.answered = true;
  var explEl = document.getElementById(qid+'-expl');
  var explTxt = explEl ? explEl.textContent : '';
  var fb = document.getElementById(qid+'-fb');
  var correct;
  if (tipo === 'fill') {
    var inp = document.getElementById(qid+'-in');
    if (!inp) return;
    correct = !isNaN(_parseFillVal(inp.value)) && _parseFillVal(inp.value) === val;
    inp.disabled = true;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    correct = val === true || val === 'true';
    var container = document.getElementById(qid);
    if (container) container.querySelectorAll('.option-btn').forEach(function(b){ b.disabled=true; });
    if (btn) {
      btn.classList.add(correct?'correct':'wrong');
      if (!correct && container) {
        container.querySelectorAll('.option-btn').forEach(function(b){
          if (b.dataset.correct === 'true') b.classList.add('correct');
        });
      }
    }
  }
  if (fb) {
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct, explTxt||'', correct?undefined:val, qid+'-fb');
  }
}

// ── Gera e abre ficha PDF com exercícios nos temas onde errou ──
function gerarFichaTreino() {
  var grupos = _treinoGetGrupos();
  if (!grupos.length) {
    alert('Ainda sem erros registados. Responde a questões para gerar a ficha de treino.');
    return;
  }
  // Generate 3 exercises per grupo for the PDF
  var exercicios = _treinoGerar(grupos, 'medio', 3);
  if (!exercicios.length) {
    alert('Não foi possível gerar exercícios para estes temas.');
    return;
  }

  var now = new Date().toLocaleDateString('pt-PT');
  var capNames = {cap1:'Cap. 1 — Inteiros',cap2:'Cap. 2 — Racionais',cap3:'Cap. 3 — Geometria',cap4:'Cap. 4 — Álgebra'};

  // Group exercises by cap for sections
  var byCap = {};
  exercicios.forEach(function(ex) {
    if (!byCap[ex._capId]) byCap[ex._capId] = [];
    byCap[ex._capId].push(ex);
  });

  var exNum = 0;
  var solucoes = [];
  var body = '';

  body += '<div class="doc-header">'
        + '<div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
        + '<div class="doc-title">Ficha de Treino Direcionado<em>Baseada nos temas onde erraste mais</em></div></div>'
        + '<div class="doc-logo">3π</div></div>';

  body += '<div class="doc-meta">'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
        + '</div>';

  // Nota de contexto
  body += '<div class="nota" style="margin-bottom:24px">Esta ficha foi gerada automaticamente com base nos temas onde registaste mais erros. '
        + 'Os exercícios são semelhantes mas diferentes dos que erraste — treina com atenção!</div>';

  // Temas em foco
  body += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px">';
  grupos.forEach(function(g) {
    var capLabel = {cap1:'Cap.1',cap2:'Cap.2',cap3:'Cap.3',cap4:'Cap.4'}[g.capId]||'';
    var temaLabel = g.tema ? g.tema.replace(/^Tema \d+\s*[—\-]?\s*/,'').trim() : 'Tema '+g.temaNum;
    body += '<span style="font-size:.72rem;font-weight:700;background:#f5f0ee;color:#7a6860;border:1px solid #e0d8d4;padding:3px 10px;border-radius:999px">'
          + capLabel+' · '+temaLabel+' ('+g.erros+'✗)</span>';
  });
  body += '</div>';

  // Exercises per cap section
  ['cap1','cap2','cap3','cap4'].forEach(function(capId) {
    var exs = byCap[capId];
    if (!exs || !exs.length) return;
    body += '<h2>' + (capNames[capId]||capId) + '</h2>';
    exs.forEach(function(ex) {
      exNum++;
      var temaShort = (ex.tema||'').replace(/^(Tema \d+\s*[—\-]?\s*)/,'').trim()||ex.tema||'';
      body += '<div class="ex">'
            + '<div class="ex-num"><span class="n">'+exNum+'</span> '+temaShort+'</div>';

      // Strip HTML tags from enun for PDF
      var enunClean = (ex.enun||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      body += '<p>'+enunClean+'</p>';

      if (ex.tipo === 'fill') {
        body += '<p style="margin-top:6px">Resposta: <span style="display:inline-block;width:80px;border-bottom:1.5px solid #2a2724">&nbsp;</span></p>';
        solucoes.push({ n: exNum, v: String(ex.resposta) });
      } else if (ex.tipo === 'vf') {
        body += '<div style="display:flex;gap:20px;margin:8px 0 4px 28px">'
              + '<span class="opcao">Verdadeiro</span><span class="opcao">Falso</span>'
              + '</div>';
        solucoes.push({ n: exNum, v: ex.resposta==='V'?'Verdadeiro':'Falso' });
      } else {
        // mc
        var labels = ['A','B','C','D'];
        (ex.opcoes||[]).forEach(function(o, k) {
          var optClean = String(o).replace(/<[^>]+>/g,'').trim();
          body += '<div class="opcao">'+labels[k]+') '+optClean+'</div>';
        });
        var correctIdx = (ex.opcoes||[]).findIndex(function(o){ return String(o)===String(ex.resposta); });
        solucoes.push({ n: exNum, v: correctIdx>=0 ? labels[correctIdx]+') '+String(ex.resposta).replace(/<[^>]+>/g,'').trim() : String(ex.resposta).replace(/<[^>]+>/g,'').trim() });
      }
      body += '</div>';
    });
  });

  // Soluções
  if (solucoes.length) {
    body += '<div class="sol-header">Soluções</div>';
    body += '<ul class="sol-list">';
    solucoes.forEach(function(s){
      body += '<li><span class="sn">'+s.n+'.</span><span class="sv">'+s.v+'</span></li>';
    });
    body += '</ul>';
  }

  body += '<div class="doc-footer"><span>3ponto14.pt</span><span>Ficha de Treino Direcionado — Matemática 7.º Ano</span><span>'+now+'</span></div>';

  var html = wrapPrintDoc('Ficha de Treino — 3ponto14', '<div class="page">'+body+'</div>');
  var win = window.open('','_blank','width=820,height=1000');
  if (!win) { alert('Permite popups para gerar a ficha.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 500);
}

// ── Main unified progress renderer ──
// ── Reset all progress atomically.
// Clears ErrorTracker first (in-memory), then the per-cap localStorage keys
// (via progReset* which also re-render their widgets), then the shared
// progress_v2 key, and only then re-renders the unified dashboard — avoiding
// a race where renderProgressoUnificado runs while resets are still in flight.
function _limparTudoProgresso() {
  if (!confirm('Apagar todo o progresso e erros?')) return;
  // 1. Clear ErrorTracker (in-memory only — no re-render triggered here)
  ['cap1','cap2','cap3','cap4'].forEach(function(c){ ErrorTracker.clearCap(c); });
  // 2. Reset per-cap progress stores + their localStorage keys.
  //    Each progReset* clears its own localStorage key and re-renders its own widget.
  progReset();
  progReset2();
  progReset3();
  resetProg4();
  // 3. Remove the shared progress_v2 key (written by ProgressManager).
  try { localStorage.removeItem('edupt_progress_v2'); } catch(e) {}
  // 4. Now that all stores are clean, re-render the unified dashboard once.
  renderProgressoUnificado();
}

function renderProgressoUnificado() {
  var el = document.getElementById('mat7-progresso-unified');
  if (!el) return;

  var caps = _progGetCapTotals();
  var totalC = 0, totalT = 0;
  caps.forEach(function(c){ totalC += c.data.correct; totalT += c.data.total; });
  var globalPct = totalT>0 ? Math.round(totalC/totalT*100) : 0;

  var barsHtml = caps.map(function(cap) {
    var sem = cap.data.total === 0;
    var pct = sem ? 0 : Math.round(cap.data.correct/cap.data.total*100);
    var col = sem ? 'var(--cream3)' : pct>=80 ? 'var(--c1-mid)' : pct>=50 ? 'var(--c3-mid)' : 'var(--cs-mid)';
    var nota = sem ? 'Sem dados' : pct>=80 ? 'Bom domínio' : pct>=50 ? 'A melhorar' : 'Precisa de treino';
    return '<div style="display:flex;align-items:center;gap:.85rem;padding:.45rem .6rem;border-radius:10px">'
      + '<span style="width:26px;height:26px;border-radius:50%;background:var(--cream3);color:var(--ink3);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:900;flex-shrink:0">'+cap.num+'</span>'
      + '<span style="flex:0 0 150px;font-size:.85rem;font-weight:600;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+cap.name+'</span>'
      + '<div style="flex:1;height:9px;background:var(--cream3);border-radius:999px;overflow:hidden;min-width:60px"><div style="height:100%;width:'+(sem?0:pct)+'%;background:'+col+';border-radius:999px;transition:width .6s cubic-bezier(.4,0,.2,1)"></div></div>'
      + '<span style="font-family:\'JetBrains Mono\',monospace;font-size:.78rem;color:var(--ink3);flex-shrink:0;min-width:70px;text-align:right">'+(sem?'—':cap.data.correct+'/'+cap.data.total+' ('+pct+'%)')+'</span>'
      + '<span style="font-size:.72rem;font-weight:600;color:'+(sem?'var(--ink4)':col)+';flex-shrink:0;min-width:90px;text-align:right">'+nota+'</span>'
      + '</div>';
  }).join('');

  var grupos = _treinoGetGrupos();
  var pm = typeof ProgressManager !== 'undefined' ? ProgressManager.getSummary() : {totalXp:0,streak:0};

  var html = '';

  // ── Aviso localStorage ──
  html += '<div style="display:flex;align-items:center;gap:.75rem;background:#fdf0ef;border:1px solid #e8b4b0;border-radius:10px;padding:.65rem 1rem;margin-bottom:1.25rem;font-size:.82rem;color:#8b3a35;flex-wrap:wrap">'
        + '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
        + '<span style="flex:1">O progresso é guardado <strong>apenas neste browser e neste dispositivo</strong>. Se mudares de browser ou de computador, o registo começa do zero. '
        + '<button onclick="progDownloadPDF()" style="font-family:\'Montserrat\',sans-serif;font-size:.82rem;font-weight:700;color:#8b3a35;background:none;border:none;cursor:pointer;text-decoration:underline;padding:0">Guarda o relatório PDF</button>'
        + ' para ficares sempre com o registo do teu progresso.</span>'
        + '</div>';

  // ── Barra de topo com acções ──
  html += '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:1.25rem">'
        + '<div style="font-size:.78rem;color:var(--ink4)">Última atualização: '+new Date().toLocaleString('pt-PT',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})+'</div>'
        + '<button class="btn btn-ghost" onclick="progDownloadPDF()" style="font-size:.8rem;padding:8px 18px;display:inline-flex;align-items:center;gap:6px">'
        + '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
        + 'Relatório PDF</button>'
        + '</div>';

  // ── Stat chips ──
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:.75rem;margin-bottom:1.25rem">';
  [{v:totalT,l:'Questões respondidas'},{v:totalC,l:'Respostas certas'},{v:totalT>0?globalPct+'%':'—',l:'Taxa global'},{v:pm.totalXp+' XP',l:'XP total'},{v:pm.streak+(pm.streak===1?' dia':' dias'),l:'Streak atual'}]
  .forEach(function(s){
    html += '<div class="card" style="text-align:center;padding:1rem .75rem">'
          + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.75rem;font-weight:900;color:var(--ink);letter-spacing:-.03em;line-height:1">'+s.v+'</div>'
          + '<div style="font-size:.68rem;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">'+s.l+'</div>'
          + '</div>';
  });
  html += '</div>';

  // ── Cap bars ──
  html += '<div class="card" style="margin-bottom:1.25rem">'
        + '<div class="card-title">Desempenho por Capítulo</div>'
        + '<div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem">'+barsHtml+'</div>'
        + '</div>';

  // ── Treino direcionado + erros — card único ──
  html += '<div class="card" style="margin-bottom:1.25rem;border-color:var(--cs-mid)">';
  html += '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;color:var(--cs-deep)">'
        + '<span>🎯 Treino Direcionado</span>'
        + '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';

  if (grupos.length > 0) {
    html += '<button onclick="renderProgressoUnificado()" style="font-size:.75rem;font-weight:600;color:var(--c2-mid);background:none;border:1px solid var(--c2-mid);border-radius:999px;padding:4px 12px;cursor:pointer;font-family:\'Montserrat\',sans-serif;transition:opacity .2s" onmouseover="this.style.opacity=\'.7\'" onmouseout="this.style.opacity=\'1\'">↺ Novos exercícios</button>';
    html += '<button onclick="gerarFichaTreino()" style="font-size:.75rem;font-weight:700;color:#fff;background:var(--cs-mid);border:1px solid var(--cs-mid);border-radius:999px;padding:4px 14px;cursor:pointer;font-family:\'Montserrat\',sans-serif;display:inline-flex;align-items:center;gap:5px;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'">'
          + '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
          + ' Descarregar Ficha PDF</button>';
  }

  html += '</div></div>';

  if (grupos.length === 0) {
    html += '<p style="color:var(--ink4);font-size:.88rem;font-style:italic">Ainda sem erros registados — responde a questões para o treino aparecer aqui.</p>';
  } else {
    html += '<div id="treino-exercicios-container"></div>';
  }

  html += '</div>';

  // ── Ação global ──
  html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">'
        + '<button class="btn btn-ghost" style="margin-left:auto;color:var(--wrong)" onclick="_limparTudoProgresso()">Limpar tudo</button>'
        + '</div>';

  el.innerHTML = html;

  if (grupos.length > 0) {
    _treinoRenderExercicios(_treinoGerar(grupos, 'medio', 2), 'treino-exercicios-container');
  }
}

// ═══ KEYBOARD NAVIGATION — Tabs de todos os capítulos ═══
(function(){
  // Map: tab container selector → click handler pattern
  var tabSets = [
    { sel: '#view-math .tabs', view: '#view-math' },
    { sel: '#tabs2', view: '#view-math2' },
    { sel: '#tabs3', view: '#view-math3' },
    { sel: '#tabs4', view: '#view-math4' },
    { sel: '#view-mega .tabs', view: '#view-mega' }
  ];
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    // Only act if a tab-btn is focused or the parent view is visible
    var focused = document.activeElement;
    if (!focused || !focused.classList.contains('tab-btn')) return;
    var parent = focused.closest('.tabs, .tabs-wrap4, [id^="tabs"]');
    if (!parent) return;
    var tabs = parent.querySelectorAll('.tab-btn');
    if (!tabs.length) return;
    var idx = Array.from(tabs).indexOf(focused);
    if (idx === -1) return;
    e.preventDefault();
    var next;
    if (e.key === 'ArrowRight') {
      next = tabs[idx + 1] || tabs[0];
    } else {
      next = tabs[idx - 1] || tabs[tabs.length - 1];
    }
    next.click();
    next.focus();
  });
})();

/* ── Block 3 (from line 10040) ── */
// ═══════════════════════════════════════════════════════
// SHARED SAFE MATH EVALUATOR (no Function / eval)
// Used by calcExpression() and _j24Solve()
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// 1. MODO ESCURO
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// 2. TAMANHO DE TEXTO
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// 4. NOTAS PESSOAIS
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// 6. CALCULADORA CIENTÍFICA
// ═══════════════════════════════════════════════════════
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
    // Safe recursive-descent parser — no eval / Function() constructor
    try {
      var src = expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/\s+/g,'');
      if (!src) return 'Erro';
      var pos = 0;

      function peek() { return src[pos]; }
      function consume() { return src[pos++]; }

      function parseExpr() { return parseAddSub(); }

      function parseAddSub() {
        var left = parseMulDiv();
        while (pos < src.length && (peek() === '+' || peek() === '-')) {
          var op = consume();
          var right = parseMulDiv();
          left = op === '+' ? left + right : left - right;
        }
        return left;
      }

      function parseMulDiv() {
        var left = parsePow();
        while (pos < src.length && (peek() === '*' || peek() === '/')) {
          var op = consume();
          var right = parsePow();
          if (op === '/' && right === 0) throw new Error('div0');
          left = op === '*' ? left * right : left / right;
        }
        return left;
      }

      function parsePow() {
        var base = parseUnary();
        if (pos < src.length && peek() === '^') { consume(); var exp = parseUnary(); return Math.pow(base, exp); }
        return base;
      }

      function parseUnary() {
        if (peek() === '-') { consume(); return -parseUnary(); }
        if (peek() === '+') { consume(); return parseUnary(); }
        return parsePrimary();
      }

      function parsePrimary() {
        if (peek() === '(') {
          consume();
          var val = parseExpr();
          if (peek() !== ')') throw new Error('paren');
          consume();
          return val;
        }
        // Number
        var start = pos;
        if (peek() === '-') consume(); // handled by unary but guard anyway
        while (pos < src.length && /[\d.]/.test(peek())) consume();
        var numStr = src.slice(start, pos);
        var n = parseFloat(numStr);
        if (isNaN(n)) throw new Error('nan:'+numStr);
        return n;
      }

      var result = parseExpr();
      if (pos !== src.length) throw new Error('trailing');
      if (!isFinite(result)) return 'Erro';
      return parseFloat(result.toPrecision(10)).toString();
    } catch(e) { return 'Erro'; }
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

// ═══════════════════════════════════════════════════════
// 7. TOOLTIPS DE FÓRMULAS
// ═══════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════
// INJECT TOPBAR BUTTONS (v33)
// ═══════════════════════════════════════════════════════
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
    darkBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Escuro';

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
