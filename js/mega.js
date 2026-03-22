/* ── mega.js — Mega-view (all-caps combined): state, navigation, exercises, flashcards, exame, progress, downloads ── */

// ── Issue 2: State Management ──
var capitulosSelecionados = [];

var CAP_INFO = {
  1: { nome: 'Números Inteiros',    emoji: '<i class="ph ph-hash"></i>', color: 'var(--c2-mid)' },
  2: { nome: 'Números Racionais',   emoji: '<i class="ph ph-calculator"></i>', color: 'var(--c3-mid)' },
  3: { nome: 'Geometria',           emoji: '<i class="ph ph-ruler"></i>', color: 'var(--c1-mid)' },
  4: { nome: 'Equações',   emoji: '<i class="ph ph-sparkle"></i>', color: '#516860'       },
  5: { nome: 'Sequências', emoji: '<i class="ph ph-list-numbers"></i>', color: 'var(--c5-mid)' },
  6: { nome: 'Funções',    emoji: '<i class="ph ph-chart-line"></i>',  color: 'var(--c6-mid)' },
  7: { nome: 'Figuras Semelhantes', emoji: '<i class="ph ph-shapes"></i>', color: 'var(--c7-mid)' },
  8: { nome: 'Dados e Probabilidades', emoji: '<i class="ph ph-chart-bar"></i>', color: 'var(--c8-mid)' }
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
var _TODOS_CAPS = [1, 2, 3, 4, 5, 6, 7, 8];
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

// MEGA — TABS NAVIGATION
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
    // Auto-generate on first visit (lazy-load gf.js if needed)
    var preview = document.getElementById('gf-preview-mega-sec-downloads');
    if (preview && preview.style.display === 'none') {
      if (typeof gfGenerar === 'function') {
        gfGenerar('mega-sec-downloads');
      } else {
        lazyLoad('gf.js', function() { gfGenerar('mega-sec-downloads'); });
      }
    }
  }
}

// MEGA — GERADOR (same as questoes but different container + score)
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
    else if (cap === 5) qs = _megaGetCap5(perCap * 2, tipo, dif);
    else if (cap === 6) qs = _megaGetCap6(perCap * 2, tipo, dif);
    else if (cap === 7) qs = _megaGetCap7(perCap * 2, tipo, dif);
    else if (cap === 8) qs = _megaGetCap8(perCap * 2, tipo, dif);
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
      if (ex) { ex._cap=1; ex._capLabel=CAP_INFO[1].emoji+' Inteiros'; ex._dif=dif; qs.push(ex); }
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
      if (ex) { ex._cap=2; ex._capLabel=CAP_INFO[2].emoji+' Racionais'; qs.push(ex); }
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
      if (ex) { ex._cap=3; ex._capLabel=CAP_INFO[3].emoji+' Geometria'; qs.push(ex); }
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
      if (ex) { ex._cap = 4; ex._capLabel = CAP_INFO[4].emoji+' Equações'; altPool.push(ex); }
    }
    if (altPool.length >= n) return altPool.slice(0, n);
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:4, _capLabel:CAP_INFO[4].emoji+' Equações',
      tema:'Equações · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _megaGetCap5(n, tipo, dif) {
  if (typeof BANCO5 === 'undefined') return [];
  var pool = BANCO5.questoes.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:5, _capLabel:CAP_INFO[5].emoji+' Sequências',
      tema:'Sequências · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _megaGetCap6(n, tipo, dif) {
  if (typeof BANCO6 === 'undefined') return [];
  var pool = BANCO6.questoes.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:6, _capLabel:CAP_INFO[6].emoji+' Funções',
      tema:'Funções · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _megaGetCap7(n, tipo, dif) {
  if (typeof BANCO7 === 'undefined') return [];
  var pool = BANCO7.questoes.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:7, _capLabel:CAP_INFO[7].emoji+' Figuras Semelhantes',
      tema:'Semelhança · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _megaGetCap8(n, tipo, dif) {
  if (typeof BANCO8 === 'undefined') return [];
  var pool = BANCO8.questoes.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(q){
    return { _cap:8, _capLabel:CAP_INFO[8].emoji+' Dados e Probabilidades',
      tema:'Dados · Tema '+q.tema, tipo:'mc_banco',
      enun:q.enunciado, opcoes:q.opts, resposta:q.correct, expl:q.fb||'' };
  });
}
function _pickTipo(tipo) {
  if (!tipo || tipo === 'misto') return ['fill','mc','vf'][Math.floor(Math.random()*3)];
  return tipo;
}

// MEGA — UNIFIED RENDERER (generic, handles any container+prefix+scoreCallback)
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

// MEGA — FLASHCARDS (merged from all selected caps)
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

// MEGA — EXAME CRONOMETRADO
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
  document.getElementById('mexame-emoji').innerHTML = pct>=90?'<i class="ph ph-trophy"></i>':pct>=75?'<i class="ph ph-smiley"></i>':pct>=50?'<i class="ph ph-thumbs-up"></i>':'<i class="ph ph-wrench"></i>';
  document.getElementById('mexame-nota').textContent = pct+'% — '+nota;
  document.getElementById('mexame-detalhe').textContent = s.correct+' correctas em '+total+' questões de '+capitulosSelecionados.length+' capítulo(s)';
  _mprogLog('exame', s.correct, total);
}

// MEGA — PROGRESSO
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
  var labels = {questoes:'<i class="ph ph-pencil-simple"></i> Questões',gerador:'<i class="ph ph-dice-five"></i> Gerador',jogos:'<i class="ph ph-game-controller"></i> Jogos',exame:'<i class="ph ph-timer"></i> Exame'};
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
    +'<div style="font-size:.75rem;font-weight:700;color:var(--c2-deep);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.4rem"><i class="ph ph-trophy"></i> Total da Sessão</div>'
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

// MEGA — SHOW VIEW (updated to init flashcards flag)
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
  document.getElementById('mega-bar-title').innerHTML = '<i class="ph ph-target"></i> Estudo: '+sorted.map(function(c){return 'Cap.'+c;}).join(' + ');
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

// MEGA — POPULATE: Clone real content from individual chapters

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
    var capNomes = { 1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções' };
    infoEl.textContent = 'Capítulos incluídos: ' + caps.map(function(c){ return capNomes[c]; }).join(' · ');
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
  var nomes = { 1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções' };
  return '<div style="margin:3rem 0 1.5rem;padding:1.25rem 1.5rem;background:'+cor+';border-radius:10px">'
    + '<h2 style="margin:0;font-family:Georgia,serif;font-size:1.5rem;color:white;letter-spacing:-.02em">'+nomes[cap]+'</h2>'
    + '</div>';
}

function _megaDownloadDoc(type) {
  var caps = _getMegaCaps();
  if (!caps || caps.length === 0) return;
  var capColors = { 1:'#516860', 2:'#7a6860', 3:'#3d5c54', 4:'#2d3530' };
  var nomes = { 1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções' };
  var now = new Date().toLocaleDateString('pt-PT');
  var cfg = {
    ficha:  { title:'Ficha de Trabalho Completa', builder:_buildFichaCompletaCapHTML, file:'ficha_completa' },
    resumo: { title:'Resumo Teórico Completo',   builder:_buildResumoCapHTML,        file:'resumo_teorico' },
    testes: { title:'Testes de Avaliação',        builder:_buildTesteCapHTML,         file:'testes' }
  }[type];
  var body = '<h1>'+cfg.title+' · Matemática 7.º Ano</h1>'
    + '<div class="meta">Data: '+now+' &nbsp;|&nbsp; Capítulos: ' + caps.map(function(c){ return nomes[c]||('Cap. '+c); }).join(', ') + '</div>';
  if (type==='ficha') body += '<div class="box" style="margin-bottom:1.5rem"><strong>Capítulos incluídos:</strong> ' + caps.map(function(c){ return nomes[c]||('Cap. '+c); }).join(', ') + '</div>';
  caps.forEach(function(c) { body += _capSectionHeader(c, capColors[c]||'#516860') + cfg.builder(c); });
  var html = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+cfg.title+'</title></head><body>' + body
    + '<footer>3ponto14 · Matemática 7.º Ano</footer></body></html>';
  htmlToPdfDownload(html, cfg.file+'_mat7_todos_caps.pdf');
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

// MEGA — PDF PER SECTION + COMBINED DOWNLOAD

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
    btn.innerHTML = '<i class="ph ph-download-simple"></i> Guardar como PDF';
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

// ProgressManager is now defined in shared.js

// ── Reta wrappers for mega.html ──
// mega.html uses the prefix 'mega-reta' instead of 'reta' used in cap1.html.
// These wrappers delegate to the same drawing helpers (_drawReta, _retaPoints)
// defined in cap1.js, adapting the element IDs accordingly.
var _megaRetaPoints = [];

function retaAddPointFor(prefix) {
  var inp = document.getElementById(prefix + '-val');
  var v = parseInt(inp ? inp.value : '');
  if (isNaN(v) || v < -10 || v > 10) {
    if (typeof eduToast === 'function') eduToast('Introduz um inteiro entre \u221210 e 10.', 'warn');
    return;
  }
  if (_megaRetaPoints.indexOf(v) < 0) _megaRetaPoints.push(v);
  if (typeof _drawReta === 'function') _drawReta(prefix + '-svg', _megaRetaPoints, [-10, 10]);
  var list = document.getElementById(prefix + '-points-list');
  if (list) list.innerHTML = _megaRetaPoints.sort(function(a, b){ return a - b; }).map(function(p) {
    return '<span style="background:var(--c2-pale);border:1.5px solid var(--c2-mid);border-radius:20px;padding:3px 10px;font-family:\'JetBrains Mono\',monospace;font-size:.85rem;color:var(--c2-deep)">' + p + '</span>';
  }).join('');
  if (inp) inp.value = '';
}

function retaClearFor(prefix) {
  _megaRetaPoints = [];
  var svg = document.getElementById(prefix + '-svg');
  if (svg) svg.innerHTML = '';
  var list = document.getElementById(prefix + '-points-list');
  if (list) list.innerHTML = '';
  if (typeof _drawReta === 'function') _drawReta(prefix + '-svg', [], [-10, 10]);
}

function retaAnimarFor(prefix) {
  var aEl = document.getElementById(prefix + '-op-a');
  var bEl = document.getElementById(prefix + '-op-b');
  var opEl = document.getElementById(prefix + '-op');
  var a = parseFloat(aEl ? aEl.value : '');
  var b = parseFloat(bEl ? bEl.value : '');
  var op = opEl ? opEl.value : '+';
  if (isNaN(a) || isNaN(b)) {
    if (typeof eduToast === 'function') eduToast('Introduz os dois valores!', 'warn');
    return;
  }
  var result = op === '+' ? a + b : a - b;
  var W = 700, pad = 40;
  var rMin = Math.min(-10, a, b, result) - 2, rMax = Math.max(10, a, b, result) + 2;
  var scale = (W - 2 * pad) / (rMax - rMin);
  function px(n) { return pad + (n - rMin) * scale; }
  var arrowColor = op === '+' ? '#516860' : '#AB9790';
  var html = '<defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7a8099"/></marker>';
  html += '<marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="' + arrowColor + '"/></marker></defs>';
  html += '<line x1="' + pad + '" y1="60" x2="' + (W - pad) + '" y2="60" stroke="#7a8099" stroke-width="2" marker-end="url(#arr2)"/>';
  for (var i = Math.ceil(rMin); i <= Math.floor(rMax); i++) {
    var x = px(i);
    html += '<line x1="' + x + '" y1="55" x2="' + x + '" y2="65" stroke="#7a8099" stroke-width="1"/>';
    if (i % 2 === 0 || (rMax - rMin) < 15) html += '<text x="' + x + '" y="80" text-anchor="middle" font-size="10" fill="#7a8099" font-family="JetBrains Mono,monospace">' + i + '</text>';
  }
  html += '<circle cx="' + px(a) + '" cy="60" r="6" fill="#516860" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(a) + '" y="45" text-anchor="middle" font-size="11" fill="#516860" font-weight="700">' + a + '</text>';
  html += '<path d="M ' + px(a) + ' 40 Q ' + ((px(a) + px(result)) / 2) + ' 20 ' + px(result) + ' 40" fill="none" stroke="' + arrowColor + '" stroke-width="2" marker-end="url(#arr3)"/>';
  html += '<text x="' + ((px(a) + px(result)) / 2) + '" y="15" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + op + b + '</text>';
  html += '<circle cx="' + px(result) + '" cy="60" r="8" fill="' + arrowColor + '" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(result) + '" y="45" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + result + '</text>';
  var animSvg = document.getElementById(prefix + '-anim-svg');
  if (animSvg) animSvg.innerHTML = html;
  var res = document.getElementById(prefix + '-anim-result');
  if (res) res.textContent = a + ' ' + op + ' ' + b + ' = ' + result;
}

