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

var _PN_FRASES = [
  { icon: 'ph-rocket-launch',     txt: 'Vamos lá! Cada questão é uma oportunidade de aprender.' },
  { icon: 'ph-lightbulb',         txt: 'Lê o enunciado com atenção antes de responder.' },
  { icon: 'ph-brain',             txt: 'Pensa devagar. A pressa é inimiga da perfeição.' },
  { icon: 'ph-star',              txt: 'Estás a fazer um ótimo trabalho. Continua!' },
  { icon: 'ph-chart-line-up',     txt: 'Cada exercício que resolves melhora o teu desempenho.' },
  { icon: 'ph-pencil',            txt: 'Esboça o que sabes antes de calcular.' },
  { icon: 'ph-fire',              txt: 'Concentra-te. Os melhores resultados vêm com foco.' },
  { icon: 'ph-hand',              txt: 'Se errares, aprende e segue em frente. Isso é progresso!' },
  { icon: 'ph-books',             txt: 'Revê a matéria do tema se tiveres dúvidas.' },
  { icon: 'ph-target',            txt: 'Atenção às unidades e às conversões!' },
  { icon: 'ph-clock',             txt: 'Num exame real, não fiques mais de 5 minutos numa questão.' },
  { icon: 'ph-check-square',      txt: 'Verifica sempre a tua resposta antes de avançar.' },
  { icon: 'ph-number-square-one', txt: 'Começa pelo que é mais fácil e regressa ao difícil depois.' },
  { icon: 'ph-notepad',           txt: 'Mostra todos os cálculos. No exame valem pontos parciais!' },
  { icon: 'ph-magnifying-glass',  txt: 'Relê o enunciado depois de resolveres para confirmar.' },
  { icon: 'ph-calculator',        txt: 'Usa a calculadora para confirmar, não para substituir o raciocínio.' },
  { icon: 'ph-graduation-cap',    txt: 'Cada minuto de prática agora vale no dia do exame.' },
  { icon: 'ph-arrows-clockwise',  txt: 'Errar faz parte. O que importa é perceber porquê.' },
  { icon: 'ph-sun',               txt: 'Mantém a calma. Sabes mais do que pensas.' },
  { icon: 'ph-trophy',            txt: 'Estás a treinar como um campeão. Isso nota-se nos resultados.' },
  { icon: 'ph-path',              txt: 'Quando não sabes por onde começar, identifica os dados do problema.' },
  { icon: 'ph-ruler',             txt: 'Em geometria, desenha sempre uma figura antes de calcular.' },
  { icon: 'ph-percent',           txt: 'Nas percentagens e proporções, confirma sempre as unidades.' },
  { icon: 'ph-graph',             txt: 'Num gráfico, analisa sempre os eixos antes de responder.' },
  { icon: 'ph-question',          txt: 'Tens dúvidas? Tenta eliminar as opções erradas primeiro.' },
  { icon: 'ph-leaf',              txt: 'Uma questão de cada vez. Mantém o foco.' },
  { icon: 'ph-spiral',            txt: 'A matemática é como um puzzle. Cada peça no sítio certo.' },
  { icon: 'ph-flag-checkered',    txt: 'Mais perto do fim. Não relaxes agora!' },
  { icon: 'ph-heart',             txt: 'Acredita em ti. Chegaste até aqui por algum motivo.' },
  { icon: 'ph-lightning',         txt: 'Energia total para esta questão. Consegues!' }
];

var _pnFrasesShuffled = null;
var _pnFrasesUsed = 0;

function _pnGetFrase(idx) {
  if (!_pnFrasesShuffled || _pnFrasesUsed >= _PN_FRASES.length) {
    _pnFrasesShuffled = _PN_FRASES.slice();
    for (var i = _pnFrasesShuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = _pnFrasesShuffled[i]; _pnFrasesShuffled[i] = _pnFrasesShuffled[j]; _pnFrasesShuffled[j] = tmp;
    }
    _pnFrasesUsed = 0;
  }
  return _pnFrasesShuffled[_pnFrasesUsed++];
}

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
  // Filter out unanswerable questions: escolha-type with all options empty
  var banco = window.PROVAS_BANCO[key].filter(function(q) {
    if (q.tipo === 'escolha' && q.opts && q.opts.length) {
      var allEmpty = true;
      for (var oi = 0; oi < q.opts.length; oi++) {
        var clean = String(q.opts[oi]).replace(/^\([A-E]\)\s*/, '').trim();
        if (clean) { allEmpty = false; break; }
      }
      if (allEmpty) return false;
    }
    return true;
  }).slice();
  for (var i = banco.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = banco[i]; banco[i] = banco[j]; banco[j] = tmp;
  }
  _pnState.topic    = key;
  _pnState.queue    = banco;
  _pnState.idx      = 0;
  _pnState.answers  = {};
  _pnState.revealed = {};
  _pnState.frases   = {};
  _pnState.score    = 0;
  _pnState.total    = banco.length;
  _pnFrasesShuffled = null;
  _pnFrasesUsed     = 0;

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

  // ── Motivational phrase (uma por questão, sem repetir até esgotar todas) ──
  if (!_pnState.frases) _pnState.frases = {};
  if (!_pnState.frases[idx]) _pnState.frases[idx] = _pnGetFrase(idx);
  var _frase = _pnState.frases[idx];
  h += '<div class="pn-tip"><i class="ph ' + _frase.icon + '"></i> ' + _frase.txt + '</div>';

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

  // Enunciado em texto
  // Imagem recortada do exame — substitui o enunciado em texto, com fallback para texto se a imagem não carregar
  if (q.examKey && q.page) {
    var _pfx = (window.location.pathname.indexOf('/mat7/') !== -1) ? '../' : '';
    var _cropSrc = _pfx + 'img/exames/crops/' + q.examKey + '/' + q.id + '.png';
    h += '<div class="pn-fig-wrap" data-fallback-id="pn-fb-' + q.id + '">';
    h += '<img src="' + _cropSrc + '" class="pn-fig-img" alt="Figura do exame" onerror="_pnFigFallback(this,\'pn-fb-' + q.id + '\')">';
    h += '</div>';
    h += '<div class="pn-enun" id="pn-fb-' + q.id + '" style="display:none">' + _pnFmt(q.enun) + '</div>';
  } else {
    h += '<div class="pn-enun">' + _pnFmt(q.enun) + '</div>';
  }

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
    h += '<span class="pn-opt-text">' + _pnFmt(opt.replace(/^\([A-D]\)\s*/, '')) + '</span>';
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
    h += '<textarea class="pn-open-textarea" id="pn-ta-' + q.id + '" placeholder="Escreve aqui a tua resolução..."></textarea>';
    h += '<button class="pn-confirm-btn" onclick="pnRevealOpen(\'' + q.id + '\')"><i class="ph ph-eye"></i> Ver solução</button>';
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
  return _pnMath(text).replace(/\n/g, '<br>');
}

function _pnMath(t) {
  if (!t) return '';

  // Split on HTML tags to avoid processing inside tag attributes/names
  var parts = t.split(/(<[^>]+>)/);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].charAt(0) === '<') continue; // skip HTML tags

    var s = parts[i];

    // Superscripts: ^2 ^3 ^n
    s = s.replace(/\^(\d+)/g, '<sup>$1</sup>');
    s = s.replace(/²/g, '<sup>2</sup>');
    s = s.replace(/³/g, '<sup>3</sup>');

    // Subscripts: x_A x_B
    s = s.replace(/_([A-Za-z0-9])/g, '<sub>$1</sub>');

    // Inline fractions: num/den where both are simple tokens (no spaces)
    // Only match when not preceded or followed by another '/' (avoid dates like 24/02/2024
    // and unit chains like km/h being misparsed). Also require boundary (start, space, punct).
    s = s.replace(/(^|[\s(\[{,;:=+\-−])([0-9a-zA-Zπ]+)\s*\/\s*([0-9a-zA-Zπ]+)(?![\/\w])/g, function(_, pre, num, den) {
      return pre + '<span class="pn-frac"><span class="pn-frac-n">' + num + '</span><span class="pn-frac-d">' + den + '</span></span>';
    });

    parts[i] = s;
  }
  return parts.join('');
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
  var correct = _pnState.answers[qId] === q.correct;
  if (correct) _pnState.score++;
  if (typeof _exRecordAnswer === 'function') _exRecordAnswer(_pnState.topic, correct);
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
  if (_pnState.answers[qId] === 'yes' || _pnState.answers[qId] === 'no') return;
  _pnState.answers[qId] = success ? 'yes' : 'no';
  if (success) _pnState.score++;
  if (typeof _exRecordAnswer === 'function') _exRecordAnswer(_pnState.topic, success);
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
  // If MC not yet confirmed, require confirmation first (don't auto-advance)
  if (q && q.tipo === 'escolha' && !_pnState.revealed[q.id]) {
    if (!_pnState.answers[q.id]) {
      if (typeof eduToast === 'function') eduToast('Seleciona uma opção antes de avançar.', 'info');
      return;
    }
    pnConfirmMC(q.id);
    if (typeof eduToast === 'function') eduToast('Resposta confirmada. Lê a resolução e clica em "Próxima" para continuar.', 'info');
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

function _pnFigFallback(img, fbId) {
  if (img && img.parentNode) img.parentNode.style.display = 'none';
  var fb = document.getElementById(fbId);
  if (fb) fb.style.display = '';
}

function pnVerProvaImg(btn, examKey, page) {
  var area = document.getElementById('pn-prova-img-area');
  if (!area) {
    area = document.createElement('div');
    area.id = 'pn-prova-img-area';
    area.style.marginTop = '1rem';
    area.style.display = 'none';
    if (btn && btn.parentNode) btn.parentNode.appendChild(area);
    else return;
  }
  if (area.style.display !== 'none') {
    area.style.display = 'none';
    btn.innerHTML = '<i class="ph ph-images"></i> Ver prova';
    return;
  }
  // determine path prefix (exames.html is at root, chapter pages in mat7/)
  var prefix = (window.location.pathname.indexOf('/mat7/') !== -1) ? '../' : '';
  var imgBase = prefix + 'img/exames/' + examKey + '/';
  var h = '<div style="background:#111;border-radius:10px;padding:.75rem">';
  h += '<div style="color:#fff;font-size:.75rem;font-weight:700;margin-bottom:.5rem;opacity:.7">Prova original — ' + examKey + '</div>';
  if (page) {
    var pStr = String(page);
    var p = pStr.length < 2 ? '0' + pStr : pStr;
    h += '<img src="' + imgBase + 'p-' + p + '.png" style="width:100%;border-radius:6px" onerror="this.style.display=\'none\'">';
  } else {
    var pages = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'];
    pages.forEach(function(p) {
      h += '<img src="' + imgBase + 'p-' + p + '.png" style="width:100%;border-radius:6px;margin-bottom:.5rem" onerror="this.style.display=\'none\'" loading="lazy">';
    });
  }
  h += '</div>';
  area.innerHTML = h;
  area.style.display = 'block';
  btn.innerHTML = '<i class="ph ph-x"></i> Fechar';
}
