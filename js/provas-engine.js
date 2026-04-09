// ═══ EXAMES NACIONAIS ENGINE ════════════════════════════════════════════════
// Motor do simulador de questões de exames reais (Provas Finais / Testes
// Intermédios / Provas de Aferição). ES5, vanilla JS.
// Requer: provas.js (PROVAS_BANCO), shared.js (eduToast)

var _PROVAS_TOPICS = [
  { key: 'semelhanca',     label: 'Figuras Semelhantes',        sub: 'Cap. 7 — Proporcionalidade, razão de semelhança, áreas' },
  { key: 'areas',          label: 'Áreas de Figuras',           sub: 'Cap. 3 — Trapézios, paralelogramos, círculos' },
  { key: 'otd',            label: 'Organização de Dados',       sub: 'Cap. 5 — Tabelas, gráficos, medidas de tendência central' },
  { key: 'funcoes',        label: 'Funções',                    sub: 'Cap. 6 — Proporcionalidade direta, gráficos, equações' },
  { key: 'sequencias',     label: 'Sequências e Regularidades', sub: 'Cap. 4 — Termos, leis de formação, expressões algébricas' },
  { key: 'not_cientifica', label: 'Notação Científica',         sub: 'Cap. 1 — Potências, notação científica, operações' }
];

var _pnState = {
  topic:    null,
  queue:    [],
  idx:      0,
  answers:  {},
  revealed: {},
  score:    0,
  total:    0
};

// ── INIT ────────────────────────────────────────────────────────────────────
function mat7LoadProvas() {
  var caps = document.getElementById('mat7-caps-provas');
  if (!caps) return;
  if (caps.dataset.built) return;
  caps.dataset.built = '1';
  _pnRenderSelector();
}

function _pnRenderSelector() {
  var caps = document.getElementById('mat7-caps-provas');
  if (!caps) return;

  var h = '<div class="pn-topic-btns">';
  _PROVAS_TOPICS.forEach(function(t) {
    h += '<button class="mat7-cap-btn" onclick="pnStartTopic(\'' + t.key + '\')">' + t.label + '</button>';
  });
  h += '</div>';
  caps.innerHTML = h;
}

// ── START ────────────────────────────────────────────────────────────────────
function pnStartTopic(key) {
  if (!window.PROVAS_BANCO || !window.PROVAS_BANCO[key]) {
    if (typeof eduToast === 'function') eduToast('Banco de questões não disponível.', 'error');
    return;
  }
  var banco = window.PROVAS_BANCO[key].slice();
  for (var i = banco.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = banco[i]; banco[i] = banco[j]; banco[j] = tmp;
  }
  _pnState.topic    = key;
  _pnState.queue    = banco;
  _pnState.idx      = 0;
  _pnState.answers  = {};
  _pnState.revealed = {};
  _pnState.score    = 0;
  _pnState.total    = banco.length;

  // Highlight selected topic button
  var btns = document.querySelectorAll('.pn-topic-btns .mat7-cap-btn');
  for (var b = 0; b < btns.length; b++) {
    btns[b].classList.remove('active');
    if (btns[b].getAttribute('onclick').indexOf('\'' + key + '\'') !== -1) {
      btns[b].classList.add('active');
    }
  }

  var p = document.getElementById('mat7-inline-provas');
  if (p) _pnRenderQuestion(p);
}

// ── RENDER QUESTION ──────────────────────────────────────────────────────────
function _pnRenderQuestion(practice) {
  if (!practice) practice = document.getElementById('mat7-inline-provas');
  if (!practice) return;
  var q     = _pnState.queue[_pnState.idx];
  var idx   = _pnState.idx;
  var total = _pnState.total;
  if (!q) { _pnRenderResult(); return; }

  var pct = Math.round((idx / total) * 100);
  var h = '<div class="pn-practice-wrap">';

  // ── Top bar ──
  h += '<div class="pn-topbar">';
  h += '<button class="pn-back-btn" onclick="_pnClearInline()"><i class="ph ph-arrow-left"></i> Temas</button>';
  h += '<div class="pn-prog-wrap"><div class="pn-prog-fill" style="width:' + pct + '%"></div></div>';
  h += '<span class="pn-prog-label">' + (idx + 1) + '\u202f/\u202f' + total + '</span>';
  h += '</div>';

  // ── Card ──
  h += '<div class="pn-card">';

  // Meta
  h += '<div class="pn-card-meta">';
  h += '<span class="pn-fonte">' + (q.fonte || '') + '</span>';
  if (q.tipo === 'escolha') {
    h += '<span class="pn-badge pn-badge--mc"><i class="ph ph-list-checks"></i> Escolha múltipla</span>';
  } else {
    h += '<span class="pn-badge pn-badge--open"><i class="ph ph-pencil-line"></i> Resposta aberta</span>';
  }
  if (q.fig) {
    h += '<span class="pn-badge pn-badge--fig"><i class="ph ph-image"></i> Figura necessária</span>';
  }
  h += '</div>';

  // Enunciado
  h += '<div class="pn-enun">' + _pnFmt(q.enun) + '</div>';

  // Área de resposta
  h += '<div id="pn-ans-area">' + _pnAnsAreaHTML(q) + '</div>';

  h += '</div>'; // /pn-card

  // Nav
  h += '<div class="pn-nav-row">';
  if (idx > 0) {
    h += '<button class="btn btn-ghost" onclick="_pnPrev()"><i class="ph ph-arrow-left"></i> Anterior</button>';
  } else {
    h += '<span></span>';
  }
  if (idx < total - 1) {
    h += '<button class="btn btn-primary" onclick="_pnNextBtn()">Próxima <i class="ph ph-arrow-right"></i></button>';
  } else {
    h += '<button class="btn btn-primary" onclick="_pnNextBtn()"><i class="ph ph-flag-checkered"></i> Ver Resultados</button>';
  }
  h += '</div>';

  h += '</div>'; // /pn-practice-wrap

  practice.innerHTML = h;
}

function _pnAnsAreaHTML(q) {
  if (q.tipo === 'escolha') return _pnMCHTML(q);
  return _pnOpenHTML(q);
}

// ── MULTIPLE CHOICE ──────────────────────────────────────────────────────────
function _pnMCHTML(q) {
  var revealed = _pnState.revealed[q.id];
  var given    = _pnState.answers[q.id];
  var h = '<div class="pn-opts">';

  q.opts.forEach(function(opt, oi) {
    var letter = String.fromCharCode(65 + oi);
    var cls = 'pn-opt';
    var icon = '';
    if (revealed) {
      if (letter === q.correct)           { cls += ' pn-opt--correct'; icon = '<i class="ph ph-check-circle pn-opt-icon"></i>'; }
      else if (given === letter)          { cls += ' pn-opt--wrong';   icon = '<i class="ph ph-x-circle pn-opt-icon"></i>'; }
    } else if (given === letter) {
      cls += ' pn-opt--selected';
    }
    var click = revealed ? '' : 'onclick="pnSelectOpt(\'' + q.id + '\',\'' + letter + '\')"';
    h += '<button class="' + cls + '" ' + click + '>';
    h += '<span class="pn-opt-letter">' + letter + '</span>';
    h += '<span class="pn-opt-text">' + opt.replace(/^\([A-D]\)\s*/, '') + '</span>';
    h += icon;
    h += '</button>';
  });
  h += '</div>';

  if (!revealed && given) {
    h += '<button class="pn-confirm-btn" onclick="pnConfirmMC(\'' + q.id + '\')"><i class="ph ph-check"></i> Confirmar resposta</button>';
  }

  if (revealed) {
    var correct = (given === q.correct);
    h += _pnFeedback(correct);
    if (q.resolucao) h += _pnResolucao(q.resolucao);
  }

  return h;
}

// ── OPEN ANSWER ──────────────────────────────────────────────────────────────
function _pnOpenHTML(q) {
  var revealed = _pnState.revealed[q.id];
  var selfDone = _pnState.answers[q.id];
  var h = '';

  if (!revealed) {
    h += '<div class="pn-open-box">';
    h += '<div class="pn-open-instructions"><i class="ph ph-pencil-line"></i> Resolve no teu caderno e depois clica para ver a solução.</div>';
    h += '<button class="pn-confirm-btn" onclick="pnRevealOpen(\'' + q.id + '\')"><i class="ph ph-eye"></i> Ver solução completa</button>';
    h += '</div>';
  } else {
    h += '<div class="pn-open-box pn-open-box--revealed">';
    if (q.resolucao) h += _pnResolucao(q.resolucao);
    if (!selfDone) {
      h += '<div class="pn-self-eval">';
      h += '<div class="pn-self-label"><i class="ph ph-question"></i> Como te saístes?</div>';
      h += '<div class="pn-self-btns">';
      h += '<button class="pn-self-btn pn-self-btn--no" onclick="pnSelfEval(\'' + q.id + '\', false)"><i class="ph ph-x-circle"></i> Não consegui</button>';
      h += '<button class="pn-self-btn pn-self-btn--yes" onclick="pnSelfEval(\'' + q.id + '\', true)"><i class="ph ph-check-circle"></i> Consegui</button>';
      h += '</div>';
      h += '</div>';
    } else {
      var ok = selfDone === 'yes';
      h += '<div class="pn-self-done">' + (ok ? '<i class="ph ph-check-circle" style="color:#4caf50"></i> Marcaste como conseguido' : '<i class="ph ph-x-circle" style="color:#e53935"></i> Marcaste como não conseguido') + '</div>';
    }
    h += '</div>';
  }
  return h;
}

function _pnResolucao(text) {
  return '<div class="pn-resolucao"><div class="pn-resolucao-title"><i class="ph ph-lightbulb"></i> Solução</div><div class="pn-resolucao-body">' + _pnFmt(text) + '</div></div>';
}

function _pnFeedback(correct) {
  if (correct) return '<div class="pn-feedback pn-feedback--ok"><i class="ph ph-check-circle"></i> Resposta correta</div>';
  return '<div class="pn-feedback pn-feedback--err"><i class="ph ph-x-circle"></i> Resposta incorreta</div>';
}

function _pnFmt(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

// ── INTERACTIONS ─────────────────────────────────────────────────────────────
function pnSelectOpt(qId, letter) {
  _pnState.answers[qId] = letter;
  var q = _pnGetQ(qId);
  if (!q) return;
  var area = document.getElementById('pn-ans-area');
  if (area) area.innerHTML = _pnMCHTML(q);
}

function pnConfirmMC(qId) {
  var q = _pnGetQ(qId);
  if (!q || !_pnState.answers[qId]) return;
  _pnState.revealed[qId] = true;
  if (_pnState.answers[qId] === q.correct) _pnState.score++;
  var area = document.getElementById('pn-ans-area');
  if (area) area.innerHTML = _pnMCHTML(q);
}

function pnRevealOpen(qId) {
  _pnState.revealed[qId] = true;
  var q = _pnGetQ(qId);
  if (!q) return;
  var area = document.getElementById('pn-ans-area');
  if (area) area.innerHTML = _pnOpenHTML(q);
}

function pnSelfEval(qId, success) {
  _pnState.answers[qId] = success ? 'yes' : 'no';
  if (success) _pnState.score++;
  var q = _pnGetQ(qId);
  if (!q) return;
  var area = document.getElementById('pn-ans-area');
  if (area) area.innerHTML = _pnOpenHTML(q);
}

function _pnPrev() {
  if (_pnState.idx > 0) { _pnState.idx--; _pnRenderQuestion(); }
}

function _pnNextBtn() {
  var q = _pnState.queue[_pnState.idx];
  // If MC not yet confirmed, require confirmation
  if (q && q.tipo === 'escolha' && !_pnState.revealed[q.id]) {
    if (!_pnState.answers[q.id]) {
      if (typeof eduToast === 'function') eduToast('Seleciona uma opção antes de avançar.', 'info');
      return;
    }
    pnConfirmMC(q.id);
    setTimeout(function() { _pnAdvance(); }, 600);
    return;
  }
  _pnAdvance();
}

function _pnAdvance() {
  _pnState.idx++;
  if (_pnState.idx >= _pnState.total) _pnRenderResult();
  else _pnRenderQuestion();
}

function _pnClearInline() {
  var p = document.getElementById('mat7-inline-provas');
  if (p) p.innerHTML = '';
  // Remove active state from topic buttons
  var btns = document.querySelectorAll('.pn-topic-btns .mat7-cap-btn');
  for (var b = 0; b < btns.length; b++) btns[b].classList.remove('active');
}

function _pnBackToPicker() { _pnClearInline(); }

function _pnGetQ(qId) {
  for (var i = 0; i < _pnState.queue.length; i++) {
    if (_pnState.queue[i].id === qId) return _pnState.queue[i];
  }
  return null;
}

function _pnTopicLabel() {
  for (var i = 0; i < _PROVAS_TOPICS.length; i++) {
    if (_PROVAS_TOPICS[i].key === _pnState.topic) return _PROVAS_TOPICS[i].label;
  }
  return '';
}

// ── RESULT ───────────────────────────────────────────────────────────────────
function _pnRenderResult() {
  var practice = document.getElementById('mat7-inline-provas');
  if (!practice) return;
  var score = _pnState.score;
  var total = _pnState.total;
  var pct   = total > 0 ? Math.round((score / total) * 100) : 0;
  var nota  = Math.round((score / total) * 20 * 10) / 10;
  if (isNaN(nota)) nota = 0;

  var icon, msg, cls;
  if (pct >= 80)      { icon = '<i class="ph ph-trophy"></i>';    msg = 'Excelente desempenho!';       cls = 'pn-result-card--great'; }
  else if (pct >= 60) { icon = '<i class="ph ph-star"></i>';      msg = 'Bom trabalho!';               cls = 'pn-result-card--good'; }
  else if (pct >= 40) { icon = '<i class="ph ph-hand"></i>';      msg = 'Continua a praticar!';        cls = ''; }
  else                { icon = '<i class="ph ph-book-open"></i>'; msg = 'Revê a matéria e tenta de novo.'; cls = ''; }

  var h = '<div class="pn-practice-wrap">';
  h += '<div class="pn-topbar">';
  h += '<button class="pn-back-btn" onclick="_pnBackToPicker()"><i class="ph ph-arrow-left"></i> Temas</button>';
  h += '<div class="pn-prog-wrap"><div class="pn-prog-fill" style="width:100%"></div></div>';
  h += '<span class="pn-prog-label">' + total + '\u202f/\u202f' + total + '</span>';
  h += '</div>';

  h += '<div class="pn-result-card ' + cls + '">';
  h += '<div class="pn-result-icon">' + icon + '</div>';
  h += '<div class="pn-result-topic">' + _pnTopicLabel() + '</div>';
  h += '<div class="pn-result-nota">' + nota.toFixed(1).replace('.', ',') + '<span class="pn-result-max"> / 20</span></div>';
  h += '<div class="pn-result-detail">' + score + ' de ' + total + ' questões certas (' + pct + '%)</div>';
  h += '<div class="pn-result-msg">' + msg + '</div>';
  h += '<div class="pn-result-btns">';
  h += '<button class="btn btn-ghost" onclick="_pnBackToPicker()"><i class="ph ph-arrow-left"></i> Escolher tema</button>';
  h += '<button class="btn btn-primary" onclick="pnStartTopic(\'' + _pnState.topic + '\')"><i class="ph ph-arrow-clockwise"></i> Repetir</button>';
  h += '</div>';
  h += '</div>';

  // Revisão
  h += '<div class="pn-review">';
  h += '<div class="pn-review-title">Revisão completa</div>';
  _pnState.queue.forEach(function(q, qi) {
    var given = _pnState.answers[q.id];
    var isOk;
    if (q.tipo === 'escolha') isOk = (given === q.correct);
    else isOk = (given === 'yes');
    var rowCls = (typeof given !== 'undefined' && given !== null) ? (isOk ? 'pn-rev-item--ok' : 'pn-rev-item--err') : 'pn-rev-item--skip';

    h += '<div class="pn-rev-item ' + rowCls + '">';
    h += '<div class="pn-rev-head">';
    h += '<span class="pn-rev-num">' + (qi + 1) + '</span>';
    if (q.tipo === 'escolha') {
      h += (isOk ? '<i class="ph ph-check-circle pn-icon-ok"></i>' : '<i class="ph ph-x-circle pn-icon-err"></i>');
    } else {
      h += '<span class="pn-badge pn-badge--open" style="font-size:.65rem;padding:2px 7px">Aberta</span>';
    }
    h += '<span class="pn-rev-fonte">' + (q.fonte || '') + '</span>';
    if (q.fig) h += '<span class="pn-badge pn-badge--fig" style="font-size:.65rem;padding:2px 7px"><i class="ph ph-image"></i></span>';
    h += '</div>';
    h += '<div class="pn-rev-enun">' + _pnFmt(q.enun) + '</div>';
    if (q.tipo === 'escolha' && q.correct) {
      h += '<div class="pn-rev-ans">Resposta correta: <strong>' + q.correct + '</strong>';
      if (given && given !== q.correct) h += ' &nbsp;&middot;&nbsp; A tua resposta: <strong class="pn-ans-wrong">' + given + '</strong>';
      h += '</div>';
    }
    if (q.resolucao) {
      h += _pnResolucao(q.resolucao);
    }
    h += '</div>';
  });
  h += '</div>'; // /pn-review
  h += '</div>'; // /pn-practice-wrap

  practice.innerHTML = h;
}
