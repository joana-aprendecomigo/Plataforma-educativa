// ══════════════════════════════════════════════════════════════
// CAP. 1 — NÚMEROS INTEIROS · JavaScript
// ══════════════════════════════════════════════════════════════

function showSection(id, btn) {
  document.querySelectorAll('#view-math .section').forEach(s => s.classList.remove('active'));
  var _s = document.getElementById('sec-' + id);
  if (_s) _s.classList.add('active');
  document.querySelectorAll('#tabs-cap1 .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (id === 'questoes')   { var _qc = document.getElementById('q-container');  if (_qc && !_qc.innerHTML.trim()) gerarQuestoes(); }
  if (id === 'minitestes') { var _mc = document.getElementById('m-container');  if (_mc && !_mc.innerHTML.trim()) gerarMiniAtual(); }
  if (id === 'teste')      { var _tc = document.getElementById('t-container');  if (_tc && !_tc.innerHTML.trim()) gerarTeste(); }
  if (id === 'jogos')      { if (typeof _j24AutoInit === 'function') _j24AutoInit('j24-wrap-cap1', 'medio'); }
  if (id === 'quiz-game')  { if (typeof qgStartForCap === 'function') qgStartForCap(1); }
  if (id === 'flashcards') { fcStartSession(); }
  if (id === 'progresso')  { progRenderSection(); }
  if (id === 'teoria') _pmRecord('cap1', 'teoria');
  if (id === 'flashcards') _pmRecord('cap1', 'flashcard');
  var _sec = document.getElementById('sec-' + id);
  if (_sec) { if (typeof pmRenderWidget === 'function') pmRenderWidget('cap1', _sec); }
}

function goToTopic(n) {
  var teoriaBtn = document.querySelector('#tabs-cap1 .tab-btn:nth-child(2)');
  showSection('teoria', teoriaBtn);
  setTimeout(function() {
    var el = document.getElementById('topic-' + n);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ── Utilitários ──
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rndNZ(min, max) { var v; do { v = rnd(min, max); } while (v === 0); return v; }
function fmt(n) { return (n >= 0 ? '+' : '') + n; }
function lim(dif) {
  if (dif === 'facil')   return { min: -6,  max: 6  };
  if (dif === 'dificil') return { min: -25, max: 25 };
  return { min: -12, max: 12 };
}
function shuffle1(arr) { return arr.sort(function() { return Math.random() - 0.5; }); }

// ── State Cap1 ──
var dynState = {
  q:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {} },
  m:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {}, activeMini: 1 },
  t:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {} },
};
var _genAnswered1 = {};
var _gen1Exercicios = [];
var _gen1Level = 'medio';
var _gen1Score = { correct: 0, total: 0 };

// ── CONSTRUTOR DE EXERCÍCIOS — Cap 1 (Números Inteiros) ──
function buildExercicio(tema, tipo, min, max, n, dif) {
  tema = String(tema);
  var easy = (dif === 'facil'), hard = (dif === 'dificil');
  if (min === undefined) { var lv = lim(dif||'medio'); min = lv.min; max = lv.max; }

  // TEMA 1 — Conjunto dos Inteiros
  if (tema === '1') {
    var sets = [
      { n: -7, pos: false, neg: true,  zero: false, nat: false, label: 'ℤ⁻' },
      { n: -1, pos: false, neg: true,  zero: false, nat: false, label: 'ℤ⁻' },
      { n:  0, pos: false, neg: false, zero: true,  nat: true,  label: 'ℤ₀' },
      { n:  3, pos: true,  neg: false, zero: false, nat: true,  label: 'ℤ⁺ e ℕ' },
      { n:  8, pos: true,  neg: false, zero: false, nat: true,  label: 'ℤ⁺ e ℕ' },
    ];
    var pick = sets[rnd(0, sets.length - 1)];
    if (tipo === 'vf') {
      var coin = Math.random() < 0.5;
      var stmt = coin
        ? pick.n + ' é um número inteiro positivo'
        : pick.n + ' é um número inteiro negativo';
      var correct = coin ? pick.pos : pick.neg;
      return { enun: 'Verdadeiro ou Falso: ' + stmt + '.', tipo: 'vf', resposta: correct ? 'V' : 'F',
        expl: pick.n + ' pertence a ' + pick.label + '.', tema: 'T1 · Inteiros' };
    }
    if (tipo === 'mc') {
      var nums = [-5, -2, 0, 3, 7, 10, -8, 4, -1, 6];
      shuffle1(nums);
      nums = nums.slice(0, 5);
      var posNums = nums.filter(function(x) { return x > 0; });
      if (posNums.length === 0) posNums = [2];
      var q = 'Qual destes números pertence a ℤ⁺?';
      var resp = posNums[0];
      var wrongs = nums.filter(function(x) { return x !== resp; }).slice(0, 3);
      var opts = shuffle1([resp].concat(wrongs)).map(String);
      return { enun: q, tipo: 'mc', opcoes: opts, resposta: String(resp),
        expl: 'ℤ⁺ = {1, 2, 3, …} — os inteiros positivos.', tema: 'T1 · Inteiros' };
    }
    if (tipo === 'fill') {
      var a = rnd(1, 6), b = -rnd(1, 6);
      var arr = [b, 0, a];
      shuffle1(arr);
      return { enun: 'Escreve em ordem crescente: ' + arr.join(', ') + '.', tipo: 'fill',
        resposta: [b, 0, a].join(', '),
        expl: 'Ordem crescente: ' + b + ' < 0 < ' + a, tema: 'T1 · Inteiros' };
    }
  }

  // TEMA 2 — Valor Absoluto e Simétrico
  if (tema === '2') {
    var a2 = rndNZ(Math.abs(min) || 1, Math.abs(max) || 8);
    var n2 = Math.random() < 0.5 ? a2 : -a2;
    if (tipo === 'fill') {
      return { enun: 'Calcula |' + n2 + '|.', tipo: 'fill', resposta: Math.abs(n2),
        expl: '|' + n2 + '| = ' + Math.abs(n2) + ' (distância ao zero).', tema: 'T2 · Valor Abs.' };
    }
    if (tipo === 'vf') {
      var stmt2 = '|' + n2 + '| = ' + (Math.abs(n2) + rnd(1, 3));
      return { enun: 'Verdadeiro ou Falso: ' + stmt2 + '.', tipo: 'vf', resposta: 'F',
        expl: '|' + n2 + '| = ' + Math.abs(n2) + '.', tema: 'T2 · Valor Abs.' };
    }
    if (tipo === 'mc') {
      var abs2 = Math.abs(n2);
      var wrong1 = abs2 + 1, wrong2 = abs2 + 2, wrong3 = abs2 - 1 < 0 ? abs2 + 3 : abs2 - 1;
      var opts2 = shuffle1([String(abs2), String(wrong1), String(wrong2), String(wrong3)]);
      return { enun: 'Qual é o valor de |' + n2 + '|?', tipo: 'mc', opcoes: opts2, resposta: String(abs2),
        expl: '|' + n2 + '| = ' + abs2 + '.', tema: 'T2 · Valor Abs.' };
    }
    if (tipo === 'contexto') {
      var depth = rnd(2, 5);
      return { enun: 'Um submarino está a ' + depth + ' m abaixo do nível do mar (cota −' + depth + ' m). Qual é o valor absoluto da sua cota?',
        tipo: 'fill', resposta: depth, expl: '|−' + depth + '| = ' + depth + '.', tema: 'T2 · Valor Abs.' };
    }
  }

  // TEMA 3 — Adição de Inteiros
  if (tema === '3') {
    var x3 = rndNZ(1, Math.abs(max) || 10), y3 = rndNZ(1, Math.abs(max) || 10);
    var sameSign = Math.random() < 0.5;
    var a3, b3, res3;
    if (sameSign) {
      a3 = easy ? x3 : (Math.random() < 0.5 ? x3 : -x3);
      b3 = a3 > 0 ? y3 : -y3;
    } else {
      a3 = x3; b3 = -y3;
    }
    res3 = a3 + b3;
    if (tipo === 'fill') {
      return { enun: 'Calcula: (' + a3 + ') + (' + b3 + ').', tipo: 'fill', resposta: res3,
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3, tema: 'T3 · Adição' };
    }
    if (tipo === 'mc') {
      var w1 = res3 + rnd(1,3), w2 = res3 - rnd(1,3), w3 = -(res3);
      if (w2 === res3) w2 = res3 + 4;
      var opts3 = shuffle1([String(res3), String(w1), String(w2), String(w3)]);
      return { enun: 'Calcula: (' + a3 + ') + (' + b3 + ').', tipo: 'mc', opcoes: opts3, resposta: String(res3),
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3, tema: 'T3 · Adição' };
    }
    if (tipo === 'vf') {
      var wrong3 = res3 + (Math.random() < 0.5 ? 1 : -1);
      return { enun: 'Verdadeiro ou Falso: (' + a3 + ') + (' + b3 + ') = ' + wrong3 + '.', tipo: 'vf', resposta: 'F',
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3 + ', não ' + wrong3 + '.', tema: 'T3 · Adição' };
    }
    if (tipo === 'contexto') {
      var temp = rnd(2, 8), drop = rnd(1, temp);
      return { enun: 'A temperatura era de −' + temp + '°C. Subiu ' + drop + '°C. Qual é a nova temperatura?',
        tipo: 'fill', resposta: -temp + drop,
        expl: '(−' + temp + ') + ' + drop + ' = ' + (-temp + drop) + '°C', tema: 'T3 · Adição' };
    }
  }

  // TEMA 4 — Subtração e Adição Algébrica
  if (tema === '4') {
    var a4 = rnd(min, max), b4 = rnd(min, max);
    var res4 = a4 - b4;
    if (tipo === 'fill') {
      return { enun: 'Calcula: (' + a4 + ') − (' + b4 + ').', tipo: 'fill', resposta: res4,
        expl: '(' + a4 + ') − (' + b4 + ') = ' + a4 + ' + (' + (-b4) + ') = ' + res4, tema: 'T4 · Subtração' };
    }
    if (tipo === 'mc') {
      var w4a = res4 + rnd(1,3), w4b = res4 - rnd(1,3), w4c = a4 + b4;
      var opts4 = shuffle1([String(res4), String(w4a), String(w4b), String(w4c)]);
      return { enun: 'Calcula: (' + a4 + ') − (' + b4 + ').', tipo: 'mc', opcoes: opts4, resposta: String(res4),
        expl: '(' + a4 + ') − (' + b4 + ') = ' + res4, tema: 'T4 · Subtração' };
    }
    if (tipo === 'vf') {
      var wrongRes4 = res4 + rnd(1, 4);
      return { enun: 'Verdadeiro ou Falso: (' + a4 + ') − (' + b4 + ') = ' + wrongRes4 + '.', tipo: 'vf', resposta: 'F',
        expl: '(' + a4 + ') − (' + b4 + ') = ' + res4 + '.', tema: 'T4 · Subtração' };
    }
    if (tipo === 'contexto') {
      var cima = rnd(2, 10), baixo = rnd(1, 8);
      return { enun: 'O ponto A está na cota +'+ cima +' m e o ponto B na cota −'+ baixo +' m. Qual a diferença de cotas (A − B)?',
        tipo: 'fill', resposta: cima - (-baixo),
        expl: '(+'+ cima +') − (−'+ baixo +') = '+ cima +' + '+ baixo +' = '+ (cima + baixo), tema: 'T4 · Subtração' };
    }
  }

  // TEMA 5 — Expressões com Parênteses
  if (tema === '5') {
    var a5 = rndNZ(1, hard ? 15 : 8), b5 = rndNZ(1, hard ? 15 : 8), c5 = rndNZ(1, 6);
    var sign5 = Math.random() < 0.5 ? 1 : -1;
    if (tipo === 'fill') {
      // +(+a) or −(−b) style
      if (sign5 === 1) {
        var val5 = a5;
        return { enun: 'Simplifica: +(+' + a5 + ').', tipo: 'fill', resposta: val5,
          expl: '+(+'+ a5 +') = +'+ a5 +' = '+ a5, tema: 'T5 · Parênteses' };
      } else {
        return { enun: 'Simplifica: −(−' + a5 + ').', tipo: 'fill', resposta: a5,
          expl: '−(−'+ a5 +') = +'+ a5 +' = '+ a5, tema: 'T5 · Parênteses' };
      }
    }
    if (tipo === 'mc') {
      var expr5, res5, exp5;
      // −(+a + b) = −a − b = -(a+b)
      expr5 = '−(+' + a5 + ' + ' + b5 + ')';
      res5 = -(a5 + b5);
      exp5 = '−(+'+ a5 +' + '+ b5 +') = −'+ a5 +' − '+ b5 +' = '+ res5;
      var w5a = a5 + b5, w5b = res5 + 1, w5c = res5 - 1;
      var opts5 = shuffle1([String(res5), String(w5a), String(w5b), String(w5c)]);
      return { enun: 'Calcula: ' + expr5, tipo: 'mc', opcoes: opts5, resposta: String(res5),
        expl: exp5, tema: 'T5 · Parênteses' };
    }
    if (tipo === 'vf') {
      // Test: -(+a) = -a (true) or = +a (false statement)
      var stmt5 = '−(+' + a5 + ') = ' + a5;
      return { enun: 'Verdadeiro ou Falso: ' + stmt5, tipo: 'vf', resposta: 'F',
        expl: '−(+'+ a5 +') = −'+ a5 +', não +'+ a5, tema: 'T5 · Parênteses' };
    }
    if (tipo === 'contexto') {
      // Numerical value with parentheses
      var x5 = rnd(1, 5);
      var res5c = -(3 * x5) + 2;
      return { enun: 'Calcula o valor numérico de −(3 × ' + x5 + ') + 2.',
        tipo: 'fill', resposta: res5c,
        expl: '−(3 × '+ x5 +') + 2 = −'+ (3*x5) +' + 2 = '+ res5c, tema: 'T5 · Parênteses' };
    }
  }

  return null;
}

// ── Render ──
function renderDynSection(containerId, exercicios, sec) {
  var labels = ['A', 'B', 'C', 'D'];
  var html = '';
  exercicios.forEach(function(ex, i) {
    var qid = sec + '_' + i;
    html += '<div class="quiz-question" id="' + qid + '">';
    html += '<div class="q-number">Questão ' + (i+1) + ' · ' + (ex.tema || '') + '</div>';
    html += '<div class="q-text">' + (ex.enun || '') + '</div>';
    if (ex.tipo === 'fill') {
      html += '<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">';
      html += '<input class="fill-input" id="' + qid + '-in" placeholder="?" type="number" style="width:100px">';
      html += '<button class="check-btn" onclick="checkDyn(\'' + sec + '\',\'' + qid + '\',\'fill\',' + ex.resposta + ')">Verificar</button>';
      html += '</div>';
    } else if (ex.tipo === 'mc') {
      html += '<div class="options">';
      (ex.opcoes || []).forEach(function(opt, k) {
        var isC = (String(opt) === String(ex.resposta));
        html += '<button class="option-btn" data-correct="' + isC + '" onclick="checkDyn(\'' + sec + '\',\'' + qid + '\',\'mc\',' + isC + ',this)"><span class="opt-label">' + labels[k] + '</span>' + opt + '</button>';
      });
      html += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta === 'V';
      html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap">';
      html += '<button class="option-btn" data-correct="' + vC + '" onclick="checkDyn(\'' + sec + '\',\'' + qid + '\',\'mc\',' + vC + ',this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button>';
      html += '<button class="option-btn" data-correct="' + (!vC) + '" onclick="checkDyn(\'' + sec + '\',\'' + qid + '\',\'mc\',' + (!vC) + ',this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button>';
      html += '</div>';
    }
    html += '<div class="feedback" id="' + qid + '-fb"></div>';
    html += '<span id="' + qid + '-expl" style="display:none">' + (ex.expl || '').replace(/'/g,"&#39;") + '</span>';
    html += '</div>';
  });
  var container = document.getElementById(containerId);
  if (container) container.innerHTML = html;
  dynState[sec].score = { correct: 0, total: 0 };
  dynState[sec].answered = {};
  updateDynScore(sec);
}

function checkDyn(sec, qid, tipo, val, btn) {
  var st = dynState[sec];
  if (st.answered[qid]) return;
  st.answered[qid] = true;
  var expl = (document.getElementById(qid + '-expl') || {}).textContent || '';
  var container = document.getElementById(qid);
  var correct = false;
  if (tipo === 'fill') {
    var inp = document.getElementById(qid + '-in');
    if (!inp || !inp.value.trim()) { delete st.answered[qid]; if (typeof eduToast === 'function') eduToast('Introduz uma resposta!', 'warn'); return; }
    var userVal = parseFloat(inp.value.replace(',', '.'));
    inp.disabled = true;
    correct = (userVal === Number(val));
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    if (container) container.querySelectorAll('.option-btn').forEach(function(b) { b.disabled = true; });
    correct = (val === true || val === 'true');
    if (correct && btn) btn.classList.add('correct');
    else if (!correct && btn) {
      btn.classList.add('wrong');
      if (container) container.querySelectorAll('.option-btn').forEach(function(b) { if (b.dataset.correct === 'true') b.classList.add('correct'); });
    }
  }
  st.score.total++; if (correct) st.score.correct++;
  var fb = document.getElementById(qid + '-fb');
  if (fb) {
    fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
    if (typeof makeFeedbackHTML === 'function') fb.innerHTML = makeFeedbackHTML(correct, expl, val, qid + '-fb');
    else fb.textContent = correct ? '✓ Correto!' : '✗ ' + (expl || 'Errado.');
  }
  updateDynScore(sec);
  var section = sec === 'q' ? 'questoes' : sec === 'm' ? 'minitestes' : 'teste';
  progLog(section, correct);
  if (typeof _etRecord === 'function') _etRecord('cap1', sec, qid, '', correct);
}

function updateDynScore(sec) {
  var s = dynState[sec].score;
  var e1 = document.getElementById(sec + '-score');  if (e1) e1.textContent = s.correct;
  var e2 = document.getElementById(sec + '-total');  if (e2) e2.textContent = '/ ' + s.total;
  var e3 = document.getElementById(sec + '-prog');   if (e3) { var pct = s.total > 0 ? s.correct / s.total * 100 : 0; e3.style.width = pct + '%'; }
  if (s.total > 0 && typeof _pmRecord === 'function') _pmRecord('cap1', 'quiz', { pontuacao: s.correct, total: s.total });
  if (typeof _maybeShowNextStep === 'function') _maybeShowNextStep(sec, s.correct, s.total);
}

function setLevelSection(sec, btn) {
  var bar = btn.closest('.level-bar');
  if (bar) bar.querySelectorAll('.gen-level-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  dynState[sec].level = btn.dataset.level;
  if (sec === 'q') gerarQuestoes();
  else if (sec === 'm') gerarMiniAtual();
  else if (sec === 't') gerarTeste();
}

// ── QUESTÕES-AULA ──
function gerarQuestoes() {
  var dif = dynState.q.level;
  var temas, tipos;
  if (dif === 'facil') {
    temas = ['1','1','1','1','2','2','2','2','3','3','3','3','4','4','4','4','5','5','5','5'];
    tipos = ['vf','mc','mc','fill','fill','mc','vf','fill','mc','mc','fill','vf','mc','fill','mc','vf','mc','fill','mc','mc'];
  } else if (dif === 'dificil') {
    temas = ['1','2','2','3','3','3','4','4','4','5','5','5','3','4','5','4','3','5','4','3'];
    tipos = ['mc','fill','mc','fill','contexto','mc','fill','contexto','mc','fill','mc','contexto','fill','fill','mc','mc','mc','fill','mc','fill'];
  } else {
    temas = ['1','1','2','2','3','3','3','4','4','4','5','5','5','3','4','5','2','1','4','3'];
    tipos = ['vf','mc','fill','mc','fill','mc','vf','fill','mc','vf','mc','fill','mc','mc','fill','mc','fill','mc','contexto','contexto'];
  }
  var exercicios = temas.map(function(t, i) { return buildExercicio(t, tipos[i], null, null, i+1, dif); }).filter(Boolean);
  renderDynSection('q-container', exercicios, 'q');
}

// ── MINITESTES ──
var _activeMini = 0;
function showMiniDyn(n, btn) {
  _activeMini = n;
  document.querySelectorAll('#mini-tabs .tab-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  gerarMiniAtual();
}
function gerarMiniAtual() {
  var dif = dynState.m.level;
  var exercicios;
  if (_activeMini === 0) {
    var plano = [
      {t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},
      {t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},
      {t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},
      {t:'4',tipo:'fill'},{t:'4',tipo:'mc'},
      {t:'5',tipo:'mc'},{t:'5',tipo:'fill'},
    ];
    exercicios = plano.map(function(p) { return buildExercicio(p.t, p.tipo, null, null, 0, dif); }).filter(Boolean);
  } else {
    var t = String(_activeMini);
    var tipos = ['mc','mc','fill','vf','mc','fill','mc','mc','vf','fill','mc','mc','vf','mc'];
    exercicios = tipos.map(function(tp) { return buildExercicio(t, tp, null, null, 0, dif); }).filter(Boolean);
  }
  renderDynSection('m-container', exercicios, 'm');
}

// ── TESTE GLOBAL ──
var _testeSubtema = 0;
function setTesteSubtema(n, btn) {
  _testeSubtema = n;
  document.querySelectorAll('#teste-subtema-tabs .tab-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  gerarTeste();
}
function gerarTeste() {
  var dif = dynState.t.level;
  var plano;
  if (_testeSubtema === 0) {
    if (dif === 'facil') {
      plano = [{t:'1',tipo:'vf'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'}];
    } else if (dif === 'dificil') {
      plano = [{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'contexto'},{t:'4',tipo:'fill'},{t:'4',tipo:'contexto'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'contexto'}];
    } else {
      plano = [{t:'1',tipo:'vf'},{t:'2',tipo:'fill'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'}];
    }
  } else {
    var ts = String(_testeSubtema);
    plano = [{t:ts,tipo:'mc'},{t:ts,tipo:'mc'},{t:ts,tipo:'vf'},{t:ts,tipo:'fill'},{t:ts,tipo:'mc'},{t:ts,tipo:'fill'}];
  }
  var exercicios = plano.map(function(p) { return buildExercicio(p.t, p.tipo, null, null, 0, dif); }).filter(Boolean);
  renderDynSection('t-container', exercicios, 't');
}

// ── GERADOR LIVRE ──
function setLevel(btn) {
  document.querySelectorAll('#sec-gerador .gen-level-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  _gen1Level = btn.dataset.level;
}
function gerarLocal() {
  _genAnswered1 = {}; _gen1Score = { correct: 0, total: 0 };
  var tema = (document.getElementById('gen-tema') || {}).value || 'todos';
  var tipo = (document.getElementById('gen-tipo') || {}).value || 'misto';
  var qtd  = parseInt((document.getElementById('gen-qtd') || {}).value) || 10;
  var dif  = _gen1Level;
  var temas = tema === 'todos' ? ['1','2','3','4','5'] : [tema];
  var tipos1 = ['mc','mc','fill','vf','fill'];
  var exercicios = [];
  for (var i = 0; i < qtd; i++) {
    var t = temas[i % temas.length];
    var tp;
    if (tipo === 'misto') tp = tipos1[rnd(0, tipos1.length - 1)];
    else if (tipo === 'contexto') tp = 'contexto';
    else tp = tipo;
    var ex = buildExercicio(t, tp, null, null, i+1, dif);
    if (!ex && tp === 'contexto') ex = buildExercicio(t, 'fill', null, null, i+1, dif);
    if (ex) exercicios.push(Object.assign({}, ex, { num: i+1 }));
  }
  _gen1Exercicios = exercicios;
  _renderGenExercicios1(exercicios);
}

function _renderGenExercicios1(exercicios) {
  document.getElementById('gen-score').textContent = '0';
  document.getElementById('gen-total').textContent = '/ 0';
  document.getElementById('gen-prog').style.width = '0%';
  document.getElementById('gen-score-bar').style.display = 'flex';
  document.getElementById('gen-download-area').style.display = 'flex';
  var labels = ['A','B','C','D'];
  var html = '';
  exercicios.forEach(function(ex, i) {
    var qid = 'g1ex' + i;
    html += '<div class="quiz-question" id="' + qid + '">';
    html += '<div class="q-number">Exercício ' + (ex.num||i+1) + ' · ' + (ex.tema||'') + '</div>';
    html += '<div class="q-text">' + ex.enun + '</div>';
    if (ex.tipo === 'fill') {
      html += '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">';
      html += '<input class="fill-input" id="' + qid + '-in" placeholder="?" type="number" style="width:100px">';
      html += '<button class="check-btn" onclick="checkGen1(\'' + qid + '\',\'fill\',' + ex.resposta + ')">Verificar</button>';
      html += '</div>';
    } else if (ex.tipo === 'mc') {
      html += '<div class="options">';
      (ex.opcoes || []).forEach(function(opt, k) {
        var isC = String(opt) === String(ex.resposta);
        html += '<button class="option-btn" data-correct="' + isC + '" onclick="checkGen1(\'' + qid + '\',\'mc\',' + isC + ',this)"><span class="opt-label">' + labels[k] + '</span>' + opt + '</button>';
      });
      html += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta === 'V';
      html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;">';
      html += '<button class="option-btn" data-correct="' + vC + '" onclick="checkGen1(\'' + qid + '\',\'mc\',' + vC + ',this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span> Verdadeiro</button>';
      html += '<button class="option-btn" data-correct="' + (!vC) + '" onclick="checkGen1(\'' + qid + '\',\'mc\',' + (!vC) + ',this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span> Falso</button>';
      html += '</div>';
    }
    html += '<div class="feedback" id="' + qid + '-fb"></div>';
    html += '<span id="' + qid + '-expl" style="display:none">' + (ex.expl||'').replace(/'/g,"&#39;") + '</span>';
    html += '</div>';
  });
  document.getElementById('gen-resultado').innerHTML = html;
}

function checkGen1(qid, tipo, val, btn) {
  if (_genAnswered1[qid]) return;
  _genAnswered1[qid] = true;
  var expl = (document.getElementById(qid + '-expl') || {}).textContent || '';
  var container = document.getElementById(qid);
  var correct = false;
  if (tipo === 'fill') {
    var inp = document.getElementById(qid + '-in');
    if (!inp || !inp.value.trim()) { delete _genAnswered1[qid]; if (typeof eduToast === 'function') eduToast('Introduz uma resposta!', 'warn'); return; }
    var uv = parseFloat(inp.value.replace(',', '.'));
    inp.disabled = true;
    correct = uv === Number(val);
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    if (container) container.querySelectorAll('.option-btn').forEach(function(b) { b.disabled = true; });
    correct = (val === true || val === 'true');
    if (correct && btn) btn.classList.add('correct');
    else if (!correct && btn) {
      btn.classList.add('wrong');
      if (container) container.querySelectorAll('.option-btn').forEach(function(b) { if (b.dataset.correct === 'true') b.classList.add('correct'); });
    }
  }
  if (correct) _gen1Score.correct++; _gen1Score.total++;
  var fb = document.getElementById(qid + '-fb');
  if (fb) {
    fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
    if (typeof makeFeedbackHTML === 'function') fb.innerHTML = makeFeedbackHTML(correct, expl, val, qid + '-fb');
    else fb.textContent = correct ? '✓ Correto!' : '✗ ' + (expl || 'Errado.');
  }
  var gs = document.getElementById('gen-score'); if (gs) gs.textContent = _gen1Score.correct;
  var gt = document.getElementById('gen-total'); if (gt) gt.textContent = '/ ' + _gen1Score.total;
  var gp = document.getElementById('gen-prog');  if (gp && _gen1Exercicios.length) gp.style.width = (_gen1Score.total / _gen1Exercicios.length * 100) + '%';
  progLog('gerador', correct);
}

// ── RETA NUMÉRICA ──
var _retaPoints = [];
function _drawReta(svgId, points, range) {
  var svg = document.getElementById(svgId);
  if (!svg) return;
  var W = 700, H = 90, pad = 40;
  var rMin = range ? range[0] : -10, rMax = range ? range[1] : 10;
  var scale = (W - 2*pad) / (rMax - rMin);
  function px(n) { return pad + (n - rMin) * scale; }
  var html = '<defs><marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7a8099"/></marker></defs>';
  // axis
  html += '<line x1="' + pad + '" y1="45" x2="' + (W-pad) + '" y2="45" stroke="#7a8099" stroke-width="2" marker-end="url(#arr1)"/>';
  // ticks
  for (var i = rMin; i <= rMax; i++) {
    var x = px(i);
    html += '<line x1="' + x + '" y1="40" x2="' + x + '" y2="50" stroke="#7a8099" stroke-width="1.5"/>';
    html += '<text x="' + x + '" y="66" text-anchor="middle" font-size="11" fill="#7a8099" font-family="JetBrains Mono,monospace">' + i + '</text>';
  }
  // origin label
  html += '<text x="' + px(0) + '" y="30" text-anchor="middle" font-size="11" fill="#516860" font-weight="700">0</text>';
  // points
  points.forEach(function(pt) {
    html += '<circle cx="' + px(pt) + '" cy="45" r="7" fill="#516860" stroke="white" stroke-width="2"/>';
    html += '<text x="' + px(pt) + '" y="28" text-anchor="middle" font-size="12" fill="#516860" font-weight="700">' + pt + '</text>';
  });
  svg.innerHTML = html;
}

function retaAddPoint() {
  var inp = document.getElementById('reta-val');
  var v = parseInt(inp ? inp.value : '');
  if (isNaN(v) || v < -10 || v > 10) { if (typeof eduToast === 'function') eduToast('Introduz um inteiro entre −10 e 10.', 'warn'); return; }
  if (_retaPoints.indexOf(v) < 0) _retaPoints.push(v);
  _drawReta('reta-svg', _retaPoints, [-10, 10]);
  var list = document.getElementById('reta-points-list');
  if (list) list.innerHTML = _retaPoints.sort(function(a,b){return a-b;}).map(function(p) {
    return '<span style="background:var(--c2-pale);border:1.5px solid var(--c2-mid);border-radius:20px;padding:3px 10px;font-family:\'JetBrains Mono\',monospace;font-size:.85rem;color:var(--c2-deep)">' + p + '</span>';
  }).join('');
  if (inp) inp.value = '';
}

function retaClear() {
  _retaPoints = [];
  var svg = document.getElementById('reta-svg');
  if (svg) svg.innerHTML = '';
  var list = document.getElementById('reta-points-list');
  if (list) list.innerHTML = '';
  _drawReta('reta-svg', [], [-10, 10]);
}

function retaAnimar() {
  var aEl = document.getElementById('reta-op-a');
  var bEl = document.getElementById('reta-op-b');
  var opEl = document.getElementById('reta-op');
  var a = parseFloat(aEl ? aEl.value : ''), b = parseFloat(bEl ? bEl.value : '');
  var op = opEl ? opEl.value : '+';
  if (isNaN(a) || isNaN(b)) { if (typeof eduToast === 'function') eduToast('Introduz os dois valores!', 'warn'); return; }
  var result = op === '+' ? a + b : a - b;
  var W = 700, pad = 40;
  var rMin = Math.min(-10, a, b, result) - 2, rMax = Math.max(10, a, b, result) + 2;
  var scale = (W - 2*pad) / (rMax - rMin);
  function px(n) { return pad + (n - rMin) * scale; }
  var H = 110;
  var html = '<defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7a8099"/></marker>';
  var arrowColor = op === '+' ? '#516860' : '#AB9790';
  html += '<marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="' + arrowColor + '"/></marker></defs>';
  // axis
  html += '<line x1="' + pad + '" y1="60" x2="' + (W-pad) + '" y2="60" stroke="#7a8099" stroke-width="2" marker-end="url(#arr2)"/>';
  for (var i = Math.ceil(rMin); i <= Math.floor(rMax); i++) {
    var x = px(i);
    html += '<line x1="' + x + '" y1="55" x2="' + x + '" y2="65" stroke="#7a8099" stroke-width="1"/>';
    if (i % 2 === 0 || (rMax - rMin) < 15) html += '<text x="' + x + '" y="80" text-anchor="middle" font-size="10" fill="#7a8099" font-family="JetBrains Mono,monospace">' + i + '</text>';
  }
  // starting point
  html += '<circle cx="' + px(a) + '" cy="60" r="6" fill="#516860" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(a) + '" y="45" text-anchor="middle" font-size="11" fill="#516860" font-weight="700">' + a + '</text>';
  // arrow
  html += '<path d="M ' + px(a) + ' 40 Q ' + ((px(a)+px(result))/2) + ' 20 ' + px(result) + ' 40" fill="none" stroke="' + arrowColor + '" stroke-width="2" marker-end="url(#arr3)"/>';
  html += '<text x="' + ((px(a)+px(result))/2) + '" y="15" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + op + b + '</text>';
  // result
  html += '<circle cx="' + px(result) + '" cy="60" r="8" fill="' + arrowColor + '" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(result) + '" y="45" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + result + '</text>';
  var animSvg = document.getElementById('reta-anim-svg');
  if (animSvg) animSvg.innerHTML = html;
  var res = document.getElementById('reta-anim-result');
  if (res) res.textContent = a + ' ' + op + ' ' + b + ' = ' + result;
}

document.addEventListener('DOMContentLoaded', function() {
  _drawReta('reta-svg', [], [-10, 10]);
});

// ── FLASHCARDS (SRS) ──
var FC1_CARDS = [
  {tag:'Definição', q:'O que são os números inteiros (ℤ)?', a:'ℤ = {…, −3, −2, −1, 0, 1, 2, 3, …} — todos os números inteiros positivos, negativos e o zero.'},
  {tag:'Hierarquia', q:'Qual a relação entre ℕ e ℤ?', a:'ℕ ⊂ ℤ. Todos os naturais são inteiros, mas nem todos os inteiros são naturais (ex: −5 ∈ ℤ mas −5 ∉ ℕ).'},
  {tag:'Definição', q:'O que é ℤ⁺ e ℤ⁻?', a:'ℤ⁺ = {1, 2, 3, …} — inteiros positivos. ℤ⁻ = {…, −3, −2, −1} — inteiros negativos. O 0 não pertence a nenhum deles.'},
  {tag:'Definição', q:'O que é o valor absoluto |a|?', a:'|a| é a distância de a ao zero na reta numérica. |a| ≥ 0 sempre. Exemplo: |−5| = 5, |3| = 3.'},
  {tag:'Regra', q:'Como calcular |a| para a < 0?', a:'Se a < 0, então |a| = −a (inverte o sinal). Exemplo: |−7| = −(−7) = 7.'},
  {tag:'Definição', q:'O que é o simétrico de a?', a:'O simétrico de a é −a (sinal oposto). a + (−a) = 0. Exemplo: simétrico de 5 é −5; simétrico de −3 é 3.'},
  {tag:'Regra', q:'Adição: mesmos sinais', a:'Somam-se os valores absolutos e conserva-se o sinal comum. Ex: (−3) + (−4) = −7.'},
  {tag:'Regra', q:'Adição: sinais diferentes', a:'Subtrai-se o menor valor absoluto do maior e usa-se o sinal do maior. Ex: (−5) + 3 = −2.'},
  {tag:'Regra', q:'Como subtrair inteiros?', a:'a − b = a + (−b). Troca-se a subtração por adição do simétrico. Ex: 4 − (−3) = 4 + 3 = 7.'},
  {tag:'Regra', q:'Regra do sinal: +(+a)', a:'+(+a) = +a. O sinal mantém-se. Ex: +(+5) = 5.'},
  {tag:'Regra', q:'Regra do sinal: −(−a)', a:'−(−a) = +a. Dois sinais iguais dão +. Ex: −(−5) = +5.'},
  {tag:'Regra', q:'Regra do sinal: −(+a)', a:'−(+a) = −a. Dois sinais diferentes dão −. Ex: −(+5) = −5.'},
  {tag:'Regra', q:'Como retirar parênteses precedidos de −?', a:'Invertem-se todos os sinais dentro. Ex: −(3 − 5 + 2) = −3 + 5 − 2.'},
  {tag:'Propriedade', q:'Qual a ordem para retirar parênteses aninhados?', a:'Sempre de dentro para fora: primeiro ( ), depois [ ], por fim { }.'},
  {tag:'Exemplo', q:'Calcula: −[5 − (3 − 7)]', a:'= −[5 − (−4)] = −[5 + 4] = −[9] = −9'},
  {tag:'Exemplo', q:'Calcula: (−8) + (+3)', a:'= −8 + 3 = −5 (sinais diferentes, |−8| > |3|, usa-se −)'},
  {tag:'Exemplo', q:'Calcula: (−4) − (−6)', a:'= (−4) + 6 = +2'},
  {tag:'Exemplo', q:'Ordena por ordem crescente: 3, −5, 0, −2, 7', a:'−5 < −2 < 0 < 3 < 7'},
  {tag:'Exemplo', q:'Calcula: |−9| − |4|', a:'= 9 − 4 = 5'},
  {tag:'Síntese', q:'Quando é que a + b < a?', a:'Quando b < 0 (b é negativo). Somar um número negativo diminui o resultado.'},
];

var _fcState = {
  cards: [],
  idx: 0,
  flipped: false,
  mode: 'srs',
  stats: {},
};

function _fc1LoadStats() {
  try {
    var raw = localStorage.getItem('edupt_fc1');
    if (raw) _fcState.stats = JSON.parse(raw);
  } catch(e) {}
}
function _fc1SaveStats() {
  try { localStorage.setItem('edupt_fc1', JSON.stringify(_fcState.stats)); } catch(e) {}
}
_fc1LoadStats();

function fcSetMode(mode) {
  _fcState.mode = mode;
  document.querySelectorAll('#fc-mode-bar .fc-mode-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.getElementById('fc-mode-' + mode);
  if (btn) btn.classList.add('active');
  document.getElementById('fc-done').style.display = 'none';
  fcStartSession();
}

function fcStartSession() {
  var mode = _fcState.mode;
  if (mode === 'weak') {
    _fcState.cards = FC1_CARDS.map(function(c, i) { return Object.assign({}, c, {_idx: i}); }).filter(function(c) {
      var s = _fcState.stats[c._idx] || {};
      return (s.ease || 2) < 2 || (s.reps || 0) === 0;
    });
    if (_fcState.cards.length === 0) _fcState.cards = FC1_CARDS.map(function(c, i) { return Object.assign({}, c, {_idx: i}); });
  } else if (mode === 'srs') {
    var now = Date.now();
    _fcState.cards = FC1_CARDS.map(function(c, i) {
      var s = _fcState.stats[i] || { ease: 2, interval: 0, due: 0 };
      return Object.assign({}, c, { _idx: i, _due: s.due || 0 });
    }).sort(function(a, b) { return a._due - b._due; }).slice(0, 15);
  } else {
    _fcState.cards = FC1_CARDS.map(function(c, i) { return Object.assign({}, c, {_idx: i}); });
  }
  _fcState.idx = 0;
  _fcState.flipped = false;
  fcRender();
}

function fcRender() {
  if (_fcState.cards.length === 0) { document.getElementById('fc-done').style.display = 'block'; return; }
  document.getElementById('fc-done').style.display = 'none';
  if (_fcState.idx >= _fcState.cards.length) {
    document.getElementById('fc-done').style.display = 'block';
    document.getElementById('fc-done-msg').textContent = 'Revisaste ' + _fcState.cards.length + ' cartões nesta sessão!';
    return;
  }
  var card = _fcState.cards[_fcState.idx];
  var tagEl = document.getElementById('fc-tag'); if (tagEl) tagEl.textContent = card.tag || '';
  var qEl = document.getElementById('fc-q'); if (qEl) qEl.textContent = card.q;
  var aEl = document.getElementById('fc-a'); if (aEl) { aEl.textContent = card.a; }
  var inner = document.getElementById('fc-inner');
  if (inner) inner.style.transform = 'rotateY(0deg)';
  _fcState.flipped = false;
  var confEl = document.getElementById('fc-confidence'); if (confEl) confEl.style.display = 'none';
  var counter = document.getElementById('fc-counter');
  if (counter) counter.textContent = (_fcState.idx + 1) + ' / ' + _fcState.cards.length;
  var prog = document.getElementById('fc-prog');
  if (prog) prog.style.width = ((_fcState.idx + 1) / _fcState.cards.length * 100) + '%';
  var dots = document.getElementById('fc-dots');
  if (dots) dots.innerHTML = _fcState.cards.map(function(_, i) {
    return '<div style="width:8px;height:8px;border-radius:50%;background:' + (i === _fcState.idx ? 'var(--c2-mid)' : 'var(--border2)') + ';cursor:pointer;transition:background .2s" onclick="fcGoTo(' + i + ')"></div>';
  }).join('');
  // status badge
  var statusEl = document.getElementById('fc-card-status');
  if (statusEl) {
    var cardIdx = card._idx !== undefined ? card._idx : _fcState.idx;
    var s = _fcState.stats[cardIdx] || {};
    var ease = s.ease || 2;
    statusEl.textContent = ease >= 3 ? '✓ Dominado' : ease >= 2 ? '◉ A aprender' : '↻ A rever';
    statusEl.style.background = ease >= 3 ? 'rgba(81,104,96,.12)' : ease >= 2 ? 'rgba(196,160,48,.12)' : 'rgba(196,121,110,.12)';
    statusEl.style.color = ease >= 3 ? 'var(--c2-deep)' : ease >= 2 ? '#886a00' : 'var(--cs-mid)';
  }
  _fcUpdateStatsBar();
}

function _fcUpdateStatsBar() {
  var dom = 0, rev = 0, newC = 0;
  FC1_CARDS.forEach(function(_, i) {
    var s = _fcState.stats[i] || {};
    var ease = s.ease || 2;
    if ((s.reps || 0) === 0) newC++;
    else if (ease < 2) rev++;
    else dom++;
  });
  var nDom = document.getElementById('fc-n-dom'); if (nDom) nDom.textContent = dom;
  var nRev = document.getElementById('fc-n-rev'); if (nRev) nRev.textContent = rev;
  var nNew = document.getElementById('fc-n-new'); if (nNew) nNew.textContent = newC;
}

function fcFlip() {
  _fcState.flipped = !_fcState.flipped;
  var inner = document.getElementById('fc-inner');
  if (inner) inner.style.transform = _fcState.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
  var confEl = document.getElementById('fc-confidence');
  if (confEl) confEl.style.display = _fcState.flipped ? 'block' : 'none';
}

function fcRate(rating) {
  var card = _fcState.cards[_fcState.idx];
  if (!card) return;
  var cardIdx = card._idx !== undefined ? card._idx : _fcState.idx;
  var s = _fcState.stats[cardIdx] || { ease: 2, interval: 1, reps: 0 };
  s.reps = (s.reps || 0) + 1;
  // SM-2 simplified
  if (rating <= 1) { s.interval = 1; s.ease = Math.max(1, (s.ease||2) - 0.5); }
  else if (rating === 2) { s.interval = (s.interval || 1); s.ease = s.ease || 2; }
  else { s.interval = Math.round((s.interval || 1) * (s.ease || 2)); s.ease = Math.min(3, (s.ease || 2) + 0.1); }
  s.due = Date.now() + s.interval * 86400000;
  _fcState.stats[cardIdx] = s;
  _fc1SaveStats();
  _fcState.idx++;
  var confEl = document.getElementById('fc-confidence'); if (confEl) confEl.style.display = 'none';
  fcRender();
}

function fcNext() { _fcState.idx = (_fcState.idx + 1) % (_fcState.cards.length || 1); fcRender(); }
function fcPrev() { _fcState.idx = (_fcState.idx - 1 + (_fcState.cards.length || 1)) % (_fcState.cards.length || 1); fcRender(); }
function fcGoTo(i) { _fcState.idx = i; fcRender(); }
function fcResetStats() { _fcState.stats = {}; _fc1SaveStats(); fcStartSession(); if (typeof eduToast === 'function') eduToast('Flashcards reiniciados!', 'ok'); }

// ── EXAME CRONOMETRADO ──
var _exameState = { level: 'medio', timer: null, timeLeft: 900, exercicios: [], answered: {}, score: { correct: 0, total: 0 } };

function exameSetLevel(btn) {
  document.querySelectorAll('#exame-config .gen-level-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  _exameState.level = btn.dataset.level;
}

function exameStart() {
  var qtd   = parseInt((document.getElementById('exame-qtd') || {}).value || '15');
  var tempo = parseInt((document.getElementById('exame-tempo') || {}).value || '900');
  _exameState.timeLeft = tempo;
  _exameState.answered = {}; _exameState.score = { correct: 0, total: 0 };
  var dif = _exameState.level;
  var temas = dif === 'facil' ? ['1','2','3'] : dif === 'dificil' ? ['3','4','5','5','4'] : ['1','2','3','4','5'];
  var tipos = ['mc','fill','mc','fill','vf','mc','fill','mc','vf','fill','mc','mc','fill','mc','mc'];
  var exs = [];
  for (var i = 0; i < qtd; i++) {
    var t = temas[i % temas.length];
    var tp = tipos[i % tipos.length];
    var ex = buildExercicio(t, tp, null, null, i+1, dif);
    if (ex) exs.push(ex);
  }
  _exameState.exercicios = exs;
  document.getElementById('exame-config').style.display = 'none';
  var resEl = document.getElementById('exame-result'); if (resEl) resEl.style.display = 'none';
  document.getElementById('exame-running').style.display = 'block';
  document.getElementById('exame-answered').textContent = '0 / ' + exs.length;
  _exameRenderQuestions(exs);
  _exameUpdateTimer();
  if (typeof examActive !== 'undefined') examActive = true;
  _exameState.timer = setInterval(function() {
    _exameState.timeLeft--;
    _exameUpdateTimer();
    if (_exameState.timeLeft <= 0) { clearInterval(_exameState.timer); exameFinish(); }
  }, 1000);
}

function _exameUpdateTimer() {
  var m = Math.floor(_exameState.timeLeft / 60), s = _exameState.timeLeft % 60;
  var el = document.getElementById('exame-timer');
  if (!el) return;
  el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  el.style.color = _exameState.timeLeft <= 60 ? 'var(--cs-mid)' : _exameState.timeLeft <= 180 ? 'var(--c3-mid)' : 'var(--ink)';
}

function _exameRenderQuestions(exs) {
  var labels = ['A','B','C','D'];
  var html = '';
  exs.forEach(function(ex, i) {
    var qid = 'ex1_' + i;
    html += '<div class="quiz-question" id="' + qid + '">';
    html += '<div class="q-number">Questão ' + (i+1) + ' · ' + (ex.tema||'') + '</div>';
    html += '<div class="q-text">' + ex.enun + '</div>';
    if (ex.tipo === 'fill') {
      html += '<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">';
      html += '<input class="fill-input" id="' + qid + '-in" placeholder="?" type="number" style="width:100px">';
      html += '<button class="check-btn" onclick="exameCheck(\'' + qid + '\',\'fill\',' + ex.resposta + ')">Verificar</button>';
      html += '</div>';
    } else if (ex.tipo === 'mc') {
      html += '<div class="options">';
      (ex.opcoes || []).forEach(function(opt, k) {
        var isC = String(opt) === String(ex.resposta);
        html += '<button class="option-btn" data-correct="' + isC + '" onclick="exameCheck(\'' + qid + '\',\'mc\',' + isC + ',this)"><span class="opt-label">' + labels[k] + '</span>' + opt + '</button>';
      });
      html += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta === 'V';
      html += '<div style="display:flex;gap:.75rem">';
      html += '<button class="option-btn" data-correct="' + vC + '" onclick="exameCheck(\'' + qid + '\',\'mc\',' + vC + ',this)"><span class="opt-label" style="background:rgba(46,125,50,.15);color:var(--c1-deep)">V</span>Verdadeiro</button>';
      html += '<button class="option-btn" data-correct="' + (!vC) + '" onclick="exameCheck(\'' + qid + '\',\'mc\',' + (!vC) + ',this)"><span class="opt-label" style="background:rgba(198,40,40,.12);color:#b71c1c">F</span>Falso</button>';
      html += '</div>';
    }
    html += '<div class="feedback" id="' + qid + '-fb"></div>';
    html += '<span id="' + qid + '-expl" style="display:none">' + (ex.expl||'').replace(/'/g,"&#39;") + '</span>';
    html += '</div>';
  });
  var c = document.getElementById('exame-container'); if (c) c.innerHTML = html;
}

function exameCheck(qid, tipo, val, btn) {
  var st = _exameState;
  if (st.answered[qid]) return;
  st.answered[qid] = true;
  var expl = (document.getElementById(qid + '-expl') || {}).textContent || '';
  var container = document.getElementById(qid);
  var correct = false;
  if (tipo === 'fill') {
    var inp = document.getElementById(qid + '-in');
    var uv = inp ? parseFloat((inp.value||'').replace(',','.')) : NaN;
    if (isNaN(uv)) { delete st.answered[qid]; if (typeof eduToast === 'function') eduToast('Introduz uma resposta!', 'warn'); return; }
    if (inp) inp.disabled = true;
    correct = uv === Number(val);
    if (inp) inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    if (container) container.querySelectorAll('.option-btn').forEach(function(b) { b.disabled = true; });
    correct = (val === true || val === 'true');
    if (correct && btn) btn.classList.add('correct');
    else if (!correct && btn) {
      btn.classList.add('wrong');
      if (container) container.querySelectorAll('.option-btn').forEach(function(b) { if (b.dataset.correct === 'true') b.classList.add('correct'); });
    }
  }
  if (correct) st.score.correct++; st.score.total++;
  var fb = document.getElementById(qid + '-fb');
  if (fb) {
    fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
    if (typeof makeFeedbackHTML === 'function') fb.innerHTML = makeFeedbackHTML(correct, expl, val, qid + '-fb');
    else fb.textContent = correct ? '✓ Correto!' : '✗ ' + (expl || 'Errado.');
  }
  document.getElementById('exame-answered').textContent = st.score.total + ' / ' + st.exercicios.length;
  var eprog = document.getElementById('exame-prog');
  if (eprog) eprog.style.width = (st.score.total / st.exercicios.length * 100) + '%';
  progLog('exame', correct);
  if (st.score.total >= st.exercicios.length) { clearInterval(st.timer); setTimeout(exameFinish, 600); }
}

function exameStop() { clearInterval(_exameState.timer); exameFinish(); }

function exameFinish() {
  if (typeof examActive !== 'undefined') examActive = false;
  var runEl = document.getElementById('exame-running'); if (runEl) runEl.style.display = 'none';
  var correct = _exameState.score.correct, total = _exameState.score.total;
  var pct = total > 0 ? Math.round(correct / total * 100) : 0;
  var emojiEl = document.getElementById('exame-emoji');
  if (emojiEl) emojiEl.textContent = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📚';
  var notaEl = document.getElementById('exame-nota');
  if (notaEl) notaEl.textContent = pct + '% — ' + (pct >= 90 ? 'Excelente!' : pct >= 70 ? 'Bom!' : pct >= 50 ? 'Suficiente' : 'A melhorar');
  var detEl = document.getElementById('exame-detalhe');
  if (detEl) detEl.textContent = correct + ' certas em ' + total + ' questões';
  var resEl = document.getElementById('exame-result'); if (resEl) resEl.style.display = 'block';
  progLogExame(pct, correct, total);
}

function exameReset() {
  clearInterval(_exameState.timer);
  var cfgEl = document.getElementById('exame-config'); if (cfgEl) cfgEl.style.display = 'block';
  var runEl = document.getElementById('exame-running'); if (runEl) runEl.style.display = 'none';
  var resEl = document.getElementById('exame-result'); if (resEl) resEl.style.display = 'none';
  var tempo = parseInt((document.getElementById('exame-tempo') || {}).value || '900');
  var m = Math.floor(tempo/60), s = tempo%60;
  var timerEl = document.getElementById('exame-timer');
  if (timerEl) { timerEl.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0'); timerEl.style.color = 'var(--ink)'; }
}

// ── PROGRESSO ──
function _saveProgData() {
  try { localStorage.setItem('edupt_cap1', JSON.stringify({ sections: _progData.sections, log: _progData.log })); } catch(e) {}
}
function _loadProgData() {
  try {
    var raw = localStorage.getItem('edupt_cap1');
    if (!raw) return;
    var saved = JSON.parse(raw);
    if (saved.sections) Object.assign(_progData.sections, saved.sections);
    if (saved.log) _progData.log = saved.log;
  } catch(e) {}
}

var _progData = {
  sections: { questoes: {correct:0,total:0}, minitestes: {correct:0,total:0}, teste: {correct:0,total:0}, gerador: {correct:0,total:0}, jogos: {correct:0,total:0}, exame: {correct:0,total:0} },
  log: [],
};
_loadProgData();

function progLog(section, correct) {
  if (!_progData.sections[section]) _progData.sections[section] = { correct: 0, total: 0 };
  _progData.sections[section].total++;
  if (correct) _progData.sections[section].correct++;
  _progData.log.unshift({ section: section, correct: correct, time: new Date().toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit'}) });
  if (_progData.log.length > 50) _progData.log.pop();
  _saveProgData();
  if (typeof _progRefreshBars === 'function') setTimeout(_progRefreshBars, 80);
}

function progLogExame(pct, correct, total) {
  if (!_progData.exames) _progData.exames = [];
  _progData.exames.push({ pct: pct, correct: correct, total: total, time: new Date().toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit'}) });
  _progData.sections.exame.correct += correct;
  _progData.sections.exame.total += total;
  _saveProgData();
  if (typeof _progRefreshBars === 'function') setTimeout(_progRefreshBars, 80);
}

function progRenderSection() {
  var sec = _progData.sections;
  var labels = { questoes: 'Questões-aula', minitestes: 'Minitestes', teste: 'Teste', gerador: 'Gerador', jogos: 'Jogos', exame: 'Exame' };
  var total = 0, correct = 0;
  Object.values(sec).forEach(function(s) { total += s.total; correct += s.correct; });
  var globalPct = total > 0 ? Math.round(correct / total * 100) : 0;
  var cardsEl = document.getElementById('prog-cards');
  if (cardsEl) {
    cardsEl.innerHTML = [
      { label: 'Questões respondidas', val: total,          icon: '<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>' },
      { label: 'Respostas certas',     val: correct,        icon: '<span class="ico ico-sm"><svg><use href="#ico-check"/></svg></span>' },
      { label: 'Taxa de acerto',       val: total > 0 ? globalPct + '%' : '—', icon: '<span class="ico ico-sm"><svg><use href="#ico-sparkles"/></svg></span>' },
    ].map(function(c) {
      return '<div class="card" style="text-align:center;padding:1.5rem"><div style="font-size:1.8rem;margin-bottom:.5rem">' + c.icon + '</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">' + c.val + '</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">' + c.label + '</div></div>';
    }).join('');
  }
  if (typeof _progRenderCapitulosBar === 'function') _progRenderCapitulosBar('prog-temas', 1);
  var logEl = document.getElementById('prog-historico');
  if (!logEl) return;
  if (_progData.log.length === 0) {
    logEl.innerHTML = '<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade — começa a responder!</div>';
    return;
  }
  logEl.innerHTML = _progData.log.map(function(e) {
    var icon = e.correct
      ? '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>'
      : '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>';
    return '<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px">' + icon + '<span style="font-size:.82rem;color:var(--ink2)">' + (labels[e.section] || e.section) + '</span><span style="font-family:\'JetBrains Mono\',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">' + e.time + '</span></div>';
  }).join('');
}

function progReset() {
  Object.keys(_progData.sections).forEach(function(k) { _progData.sections[k] = { correct: 0, total: 0 }; });
  _progData.log = [];
  try { localStorage.removeItem('edupt_cap1'); } catch(e) {}
  progRenderSection();
}

// ── Init on load ──
document.addEventListener('DOMContentLoaded', function() {
  // restore first section visible
  var activeSection = document.querySelector('#view-math .section.active');
  if (!activeSection) {
    var first = document.getElementById('sec-temas');
    if (first) first.classList.add('active');
    var firstBtn = document.querySelector('#tabs-cap1 .tab-btn');
    if (firstBtn) firstBtn.classList.add('active');
  }
  // init flashcards
  fcStartSession();
});


// ═══ Subtema launchers — Cap 1 ═══

// buildT helpers — delegate to buildExercicio
function buildT1(tipo,min,max,n){return buildExercicio("1",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT3(tipo,min,max,n){return buildExercicio("3",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT4(tipo,min,max,n){return buildExercicio("4",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT5(tipo,min,max,n,dif){return buildExercicio("5",tipo,min,max,n,dif||"medio");}

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

