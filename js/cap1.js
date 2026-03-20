// CAP. 1 — NÚMEROS INTEIROS · JavaScript
// Uses chapter-engine.js for generic quiz/exam/flashcard/progress logic

// ── Utilitários ──
var shuffle1 = shuffle; // backward compat alias
function lim(dif) {
  if (dif === 'facil')   return { min: -6,  max: 6  };
  if (dif === 'dificil') return { min: -25, max: 25 };
  return { min: -12, max: 12 };
}

// ── State Cap1 (kept for backward compat with onclick handlers) ──
var dynState = {
  q:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {} },
  m:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {}, activeMini: 1 },
  t:  { level: 'medio', score: { correct: 0, total: 0 }, answered: {} },
};

// ── CONSTRUTOR DE EXERCÍCIOS — Cap 1 (Números Inteiros) ──
function buildExercicio(tema, tipo, min, max, n, dif) {
  tema = String(tema);
  var easy = (dif === 'facil'), hard = (dif === 'dificil');
  if (min === undefined || min === null) { var lv = lim(dif||'medio'); min = lv.min; max = lv.max; }

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
      var stmt = coin ? pick.n + ' é um número inteiro positivo' : pick.n + ' é um número inteiro negativo';
      var correct = coin ? pick.pos : pick.neg;
      return { enun: 'Verdadeiro ou Falso: ' + stmt + '.', tipo: 'vf', resposta: correct ? 'V' : 'F',
        expl: pick.n + ' pertence a ' + pick.label + '.', tema: 'T1 · Inteiros' };
    }
    if (tipo === 'mc') {
      var nums = [-5, -2, 0, 3, 7, 10, -8, 4, -1, 6];
      shuffle(nums); nums = nums.slice(0, 5);
      var posNums = nums.filter(function(x) { return x > 0; });
      if (posNums.length === 0) posNums = [2];
      var resp = posNums[0];
      var wrongs = nums.filter(function(x) { return x !== resp; }).slice(0, 3);
      var opts = shuffle([resp].concat(wrongs)).map(String);
      return { enun: 'Qual destes números pertence a ℤ⁺?', tipo: 'mc', opcoes: opts, resposta: String(resp),
        expl: 'ℤ⁺ = {1, 2, 3, …} — os inteiros positivos.', tema: 'T1 · Inteiros' };
    }
    if (tipo === 'fill') {
      var a = rnd(1, 6), b = -rnd(1, 6);
      var arr = [b, 0, a]; shuffle(arr);
      return { enun: 'Escreve em ordem crescente: ' + arr.join(', ') + '.', tipo: 'fill',
        resposta: [b, 0, a].join(', '), expl: 'Ordem crescente: ' + b + ' < 0 < ' + a, tema: 'T1 · Inteiros' };
    }
    if (tipo === 'contexto') {
      var nums1ctx = [-5, -3, -1, 0, 1, 3, 5, 7];
      var n1ctx = nums1ctx[rnd(0, nums1ctx.length - 1)];
      var subsets1ctx = ['ℤ⁺', 'ℤ⁻', 'ℕ'];
      var tgt1ctx = subsets1ctx[rnd(0, 2)];
      var belongs1ctx;
      if (tgt1ctx === 'ℤ⁺') belongs1ctx = n1ctx > 0;
      else if (tgt1ctx === 'ℤ⁻') belongs1ctx = n1ctx < 0;
      else belongs1ctx = n1ctx >= 0;
      return { enun: 'Verdadeiro ou Falso: ' + n1ctx + ' ∈ ' + tgt1ctx + '.',
        tipo: 'vf', resposta: belongs1ctx ? 'V' : 'F',
        expl: n1ctx + (belongs1ctx ? ' pertence' : ' não pertence') + ' a ' + tgt1ctx + '.', tema: 'T1 · Inteiros' };
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
      var opts2 = shuffle([String(abs2), String(wrong1), String(wrong2), String(wrong3)]);
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
    if (sameSign) { a3 = easy ? x3 : (Math.random() < 0.5 ? x3 : -x3); b3 = a3 > 0 ? y3 : -y3; }
    else { a3 = x3; b3 = -y3; }
    res3 = a3 + b3;
    if (tipo === 'fill') {
      return { enun: 'Calcula: (' + a3 + ') + (' + b3 + ').', tipo: 'fill', resposta: res3,
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3, tema: 'T3 · Adição' };
    }
    if (tipo === 'mc') {
      var w1 = res3 + rnd(1,3), w2 = res3 - rnd(1,3), w3 = -(res3);
      if (w2 === res3) w2 = res3 + 4;
      var opts3 = shuffle([String(res3), String(w1), String(w2), String(w3)]);
      return { enun: 'Calcula: (' + a3 + ') + (' + b3 + ').', tipo: 'mc', opcoes: opts3, resposta: String(res3),
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3, tema: 'T3 · Adição' };
    }
    if (tipo === 'vf') {
      var wrong3v = res3 + (Math.random() < 0.5 ? 1 : -1);
      return { enun: 'Verdadeiro ou Falso: (' + a3 + ') + (' + b3 + ') = ' + wrong3v + '.', tipo: 'vf', resposta: 'F',
        expl: '(' + a3 + ') + (' + b3 + ') = ' + res3 + ', não ' + wrong3v + '.', tema: 'T3 · Adição' };
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
      var opts4 = shuffle([String(res4), String(w4a), String(w4b), String(w4c)]);
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
      if (sign5 === 1) {
        return { enun: 'Simplifica: +(+' + a5 + ').', tipo: 'fill', resposta: a5,
          expl: '+(+'+ a5 +') = +'+ a5 +' = '+ a5, tema: 'T5 · Parênteses' };
      } else {
        return { enun: 'Simplifica: −(−' + a5 + ').', tipo: 'fill', resposta: a5,
          expl: '−(−'+ a5 +') = +'+ a5 +' = '+ a5, tema: 'T5 · Parênteses' };
      }
    }
    if (tipo === 'mc') {
      var expr5 = '−(+' + a5 + ' + ' + b5 + ')';
      var res5 = -(a5 + b5);
      var exp5 = '−(+'+ a5 +' + '+ b5 +') = −'+ a5 +' − '+ b5 +' = '+ res5;
      var w5a = a5 + b5, w5b = res5 + 1, w5c = res5 - 1;
      var opts5 = shuffle([String(res5), String(w5a), String(w5b), String(w5c)]);
      return { enun: 'Calcula: ' + expr5, tipo: 'mc', opcoes: opts5, resposta: String(res5),
        expl: exp5, tema: 'T5 · Parênteses' };
    }
    if (tipo === 'vf') {
      return { enun: 'Verdadeiro ou Falso: −(+' + a5 + ') = ' + a5, tipo: 'vf', resposta: 'F',
        expl: '−(+'+ a5 +') = −'+ a5 +', não +'+ a5, tema: 'T5 · Parênteses' };
    }
    if (tipo === 'contexto') {
      var x5 = rnd(1, 5);
      var res5c = -(3 * x5) + 2;
      return { enun: 'Calcula o valor numérico de −(3 × ' + x5 + ') + 2.',
        tipo: 'fill', resposta: res5c,
        expl: '−(3 × '+ x5 +') + 2 = −'+ (3*x5) +' + 2 = '+ res5c, tema: 'T5 · Parênteses' };
    }
  }

  // TEMA 6 — Propriedades da Adição
  if (tema === '6') {
    var a6 = rndNZ(1, 10), b6 = rndNZ(1, 8), c6 = rndNZ(1, 6);
    var sA = Math.random() < 0.5 ? a6 : -a6;
    var sB = Math.random() < 0.5 ? b6 : -b6;
    var sC = Math.random() < 0.5 ? c6 : -c6;
    if (tipo === 'fill') {
      var fillProp6 = rnd(0, 3);
      if (fillProp6 === 0) {
        return { enun: 'Completa usando a propriedade comutativa: (' + sA + ') + (' + sB + ') = (' + sB + ') + ___',
          tipo: 'fill', resposta: sA,
          expl: 'Propriedade comutativa: a + b = b + a. O valor em falta é ' + sA + '.', tema: 'T6 · Propriedades' };
      }
      if (fillProp6 === 1) {
        return { enun: 'Completa usando a propriedade associativa: [(' + sA + ') + (' + sB + ')] + (' + sC + ') = (' + sA + ') + (___ + (' + sC + '))',
          tipo: 'fill', resposta: sB,
          expl: 'Propriedade associativa: (a + b) + c = a + (b + c). O valor em falta é ' + sB + '.', tema: 'T6 · Propriedades' };
      }
      if (fillProp6 === 2) {
        return { enun: 'Completa: (' + sA + ') + ___ = ' + sA,
          tipo: 'fill', resposta: 0,
          expl: 'Elemento neutro da adição: a + 0 = a. O elemento neutro é o 0.', tema: 'T6 · Propriedades' };
      }
      return { enun: 'Qual é o simétrico de ' + sA + '? Completa: (' + sA + ') + ___ = 0',
        tipo: 'fill', resposta: -sA,
        expl: 'Elemento simétrico: a + (−a) = 0. O simétrico de ' + sA + ' é ' + (-sA) + '.', tema: 'T6 · Propriedades' };
    }
    if (tipo === 'mc') {
      var mcProp6 = rnd(0, 3);
      var enunMc6, corrProp6;
      if (mcProp6 === 0) {
        enunMc6 = 'Qual propriedade ilustra: (' + sA + ') + (' + sB + ') = (' + sB + ') + (' + sA + ')?';
        corrProp6 = 'Comutativa';
      } else if (mcProp6 === 1) {
        enunMc6 = 'Qual propriedade ilustra: [(' + sA + ') + (' + sB + ')] + (' + sC + ') = (' + sA + ') + [(' + sB + ') + (' + sC + ')]?';
        corrProp6 = 'Associativa';
      } else if (mcProp6 === 2) {
        enunMc6 = 'Qual propriedade ilustra: (' + sA + ') + 0 = ' + sA + '?';
        corrProp6 = 'Elemento neutro';
      } else {
        enunMc6 = 'Qual propriedade ilustra: (' + sA + ') + (' + (-sA) + ') = 0?';
        corrProp6 = 'Elemento simétrico';
      }
      var allProps6 = ['Comutativa', 'Associativa', 'Elemento neutro', 'Elemento simétrico'];
      var opts6 = shuffle(allProps6.slice());
      return { enun: enunMc6, tipo: 'mc', opcoes: opts6, resposta: corrProp6,
        expl: 'Propriedade ' + corrProp6 + ' da adição.', tema: 'T6 · Propriedades' };
    }
    if (tipo === 'vf') {
      var vfProp6 = rnd(0, 2);
      if (vfProp6 === 0) {
        return { enun: 'Verdadeiro ou Falso: A adição de inteiros é comutativa, ou seja, a + b = b + a.',
          tipo: 'vf', resposta: 'V',
          expl: 'Verdadeiro. A propriedade comutativa garante que a ordem das parcelas não altera a soma.', tema: 'T6 · Propriedades' };
      }
      if (vfProp6 === 1) {
        return { enun: 'Verdadeiro ou Falso: O elemento neutro da adição é o 1.',
          tipo: 'vf', resposta: 'F',
          expl: 'Falso. O elemento neutro da adição é o 0, pois a + 0 = a para qualquer inteiro a.', tema: 'T6 · Propriedades' };
      }
      return { enun: 'Verdadeiro ou Falso: O simétrico de ' + a6 + ' é ' + a6 + '.',
        tipo: 'vf', resposta: 'F',
        expl: 'Falso. O simétrico de ' + a6 + ' é −' + a6 + ', pois ' + a6 + ' + (−' + a6 + ') = 0.', tema: 'T6 · Propriedades' };
    }
    if (tipo === 'contexto') {
      var ctxProp6 = rnd(0, 1);
      if (ctxProp6 === 0) {
        var p6 = rndNZ(2, 9), q6 = rndNZ(1, 5), r6 = rndNZ(1, 5);
        var tot6 = p6 + (-q6) + (-r6);
        return { enun: 'Usando a propriedade associativa, calcula: (' + p6 + ') + (−' + q6 + ') + (−' + r6 + ').',
          tipo: 'fill', resposta: tot6,
          expl: 'Associativa: (' + p6 + ') + [(−' + q6 + ') + (−' + r6 + ')] = ' + p6 + ' + (−' + (q6 + r6) + ') = ' + tot6 + '.', tema: 'T6 · Propriedades' };
      }
      var debt6 = rndNZ(3, 12);
      return { enun: 'O João tem uma dívida de ' + debt6 + '€ (saldo de −' + debt6 + '€). Recebe exatamente ' + debt6 + '€. Qual é o saldo final?',
        tipo: 'fill', resposta: 0,
        expl: '(−' + debt6 + ') + ' + debt6 + ' = 0. Propriedade do elemento simétrico: a + (−a) = 0.', tema: 'T6 · Propriedades' };
    }
  }

  return null;
}

// ── FLASHCARDS DATA ──
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
  {tag:'Notação', q:'O que significam os símbolos ∈ e ∉?', a:'∈ significa "pertence a" e ∉ significa "não pertence a". Ex: −3 ∈ ℤ⁻ (−3 pertence aos inteiros negativos) e −3 ∉ ℕ (−3 não pertence aos naturais).'},
  {tag:'Notação', q:'O que significam ⊂ e ⊄?', a:'⊂ significa "está contido em" (subconjunto de). ⊄ significa "não está contido em". Ex: ℕ ⊂ ℤ (os naturais estão contidos nos inteiros), mas ℤ ⊄ ℕ.'},
  {tag:'Propriedade', q:'Qual é a propriedade comutativa da adição?', a:'a + b = b + a. A ordem das parcelas não altera a soma. Ex: (−3) + 5 = 5 + (−3) = 2.'},
  {tag:'Propriedade', q:'Qual é a propriedade associativa da adição?', a:'(a + b) + c = a + (b + c). O agrupamento das parcelas não altera a soma. Ex: [(−2) + 3] + (−1) = (−2) + [3 + (−1)] = 0.'},
  {tag:'Propriedade', q:'O que é o elemento neutro da adição?', a:'O 0 é o elemento neutro da adição: a + 0 = 0 + a = a. Somar zero não altera o número.'},
  {tag:'Propriedade', q:'O que é o elemento simétrico de um inteiro a?', a:'O simétrico de a é −a, tal que a + (−a) = 0. Ex: simétrico de 7 é −7; simétrico de −4 é 4.'},
];

// Alias expected by mat7.js unified flashcard renderer
var FC_CARDS_CAP1 = FC1_CARDS;

// ── Register with chapter engine ──
window.CAP_DATA = window.CAP_DATA || {};
window.CAP_DATA[1] = {
  prefix: '',
  storageKey: 'edupt_cap1',
  viewId: 'view-math',
  tabsId: 'tabs-cap1',
  temas: ['T1 · Inteiros', 'T2 · Valor Abs.', 'T3 · Adição', 'T4 · Subtração', 'T5 · Parênteses', 'T6 · Propriedades'],
  flashcards: FC1_CARDS,
  buildExercicio: function(tema, tipo, dif) {
    var lv = lim(dif || 'medio');
    return buildExercicio(tema, tipo, lv.min, lv.max, 0, dif);
  },
  questoesPlans: {
    facil:   { temas: ['1','1','1','1','2','2','2','2','3','3','3','3','4','4','4','4','5','5','6','6'],
               tipos: ['vf','mc','mc','fill','fill','mc','vf','fill','mc','mc','fill','vf','mc','fill','mc','vf','mc','fill','fill','mc'] },
    medio:   { temas: ['1','1','2','2','3','3','3','4','4','4','5','5','5','3','4','5','6','6','4','3'],
               tipos: ['vf','mc','fill','mc','fill','mc','vf','fill','mc','vf','mc','fill','mc','contexto','contexto','mc','fill','mc','fill','mc'] },
    dificil: { temas: ['1','2','2','3','3','3','4','4','4','5','5','5','6','6','6','4','3','5','1','3'],
               tipos: ['contexto','fill','mc','fill','contexto','mc','fill','contexto','mc','fill','mc','contexto','fill','mc','vf','mc','mc','fill','contexto','fill'] }
  },
  miniPlans: {
    0: [{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'6',tipo:'fill'},{t:'6',tipo:'mc'},{t:'6',tipo:'vf'}]
  },
  testePlans: {
    subtema0: {
      facil:   [{t:'1',tipo:'vf'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'6',tipo:'fill'},{t:'6',tipo:'mc'}],
      medio:   [{t:'1',tipo:'vf'},{t:'2',tipo:'fill'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'6',tipo:'fill'},{t:'6',tipo:'vf'}],
      dificil: [{t:'1',tipo:'contexto'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'contexto'},{t:'4',tipo:'fill'},{t:'4',tipo:'contexto'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'6',tipo:'fill'},{t:'6',tipo:'mc'},{t:'6',tipo:'contexto'}]
    }
  }
};

// ── Delegation wrappers (auto-generated + cap1-specific extras) ──
_capRegisterWrappers(1, {
  setTesteSubtema: function(n,btn){capSetTesteSubtema(1,n,btn)},
  gerarTeste: function(){capGerarTeste(1)},
  setLevel: function(btn){capSetGenLevel(1,btn)},
  gerarLocal: function(){capGerarExercicios(1)},
  renderDynSection: function(cid,exs,sec){capRenderDynSection(1,cid,exs,sec)},
  checkDyn: function(sec,qid,tipo,val,btn){capCheckDyn(1,sec,qid,tipo,val,btn)},
  updateDynScore: function(sec){capUpdateScore(1,sec)},
  exameCheck: function(qid,tipo,val,btn){capExameCheck(1,qid,tipo,val,btn)},
  progLogExame: function(p,c,t){_capProgLogExame(1,p,c,t)},
  fcStartSession: function(){capFcRender(1)},
  fcSetMode: function(){capFcRender(1)},
  fcResetStats: function(){capProgReset(1)},
  fcRate: function(){capFcNext(1)},
  _fcUpdateStatsBar: function(){}
});

// ── RETA NUMÉRICA INTERATIVA ──
var _retaPoints = [];

function _drawReta(svgId, points, range) {
  var svg = document.getElementById(svgId);
  if (!svg) return;
  var W = 700, H = 90, pad = 40;
  var rMin = range ? range[0] : -10, rMax = range ? range[1] : 10;
  var scale = (W - 2*pad) / (rMax - rMin);
  function px(n) { return pad + (n - rMin) * scale; }
  var html = '<defs><marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7a8099"/></marker></defs>';
  html += '<line x1="' + pad + '" y1="45" x2="' + (W-pad) + '" y2="45" stroke="#7a8099" stroke-width="2" marker-end="url(#arr1)"/>';
  for (var i = rMin; i <= rMax; i++) {
    var x = px(i);
    html += '<line x1="' + x + '" y1="40" x2="' + x + '" y2="50" stroke="#7a8099" stroke-width="1.5"/>';
    html += '<text x="' + x + '" y="66" text-anchor="middle" font-size="11" fill="#7a8099" font-family="JetBrains Mono,monospace">' + i + '</text>';
  }
  html += '<text x="' + px(0) + '" y="30" text-anchor="middle" font-size="11" fill="#516860" font-weight="700">0</text>';
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
  var arrowColor = op === '+' ? '#516860' : '#AB9790';
  var html = '<defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7a8099"/></marker>';
  html += '<marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="' + arrowColor + '"/></marker></defs>';
  html += '<line x1="' + pad + '" y1="60" x2="' + (W-pad) + '" y2="60" stroke="#7a8099" stroke-width="2" marker-end="url(#arr2)"/>';
  for (var i = Math.ceil(rMin); i <= Math.floor(rMax); i++) {
    var x = px(i);
    html += '<line x1="' + x + '" y1="55" x2="' + x + '" y2="65" stroke="#7a8099" stroke-width="1"/>';
    if (i % 2 === 0 || (rMax - rMin) < 15) html += '<text x="' + x + '" y="80" text-anchor="middle" font-size="10" fill="#7a8099" font-family="JetBrains Mono,monospace">' + i + '</text>';
  }
  html += '<circle cx="' + px(a) + '" cy="60" r="6" fill="#516860" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(a) + '" y="45" text-anchor="middle" font-size="11" fill="#516860" font-weight="700">' + a + '</text>';
  html += '<path d="M ' + px(a) + ' 40 Q ' + ((px(a)+px(result))/2) + ' 20 ' + px(result) + ' 40" fill="none" stroke="' + arrowColor + '" stroke-width="2" marker-end="url(#arr3)"/>';
  html += '<text x="' + ((px(a)+px(result))/2) + '" y="15" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + op + b + '</text>';
  html += '<circle cx="' + px(result) + '" cy="60" r="8" fill="' + arrowColor + '" stroke="white" stroke-width="2"/>';
  html += '<text x="' + px(result) + '" y="45" text-anchor="middle" font-size="11" fill="' + arrowColor + '" font-weight="700">' + result + '</text>';
  var animSvg = document.getElementById('reta-anim-svg');
  if (animSvg) animSvg.innerHTML = html;
  var res = document.getElementById('reta-anim-result');
  if (res) res.textContent = a + ' ' + op + ' ' + b + ' = ' + result;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  _drawReta('reta-svg', [], [-10, 10]);
  var activeSection = document.querySelector('#view-math .section.active');
  if (!activeSection) {
    var first = document.getElementById('sec-temas');
    if (first) first.classList.add('active');
    var firstBtn = document.querySelector('#tabs-cap1 .tab-btn');
    if (firstBtn) firstBtn.classList.add('active');
  }
  fcStartSession();
});

// ═══ Subtema launchers — Cap 1 ═══
function buildT1(tipo,min,max,n){return buildExercicio("1",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT3(tipo,min,max,n){return buildExercicio("3",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT4(tipo,min,max,n){return buildExercicio("4",tipo,min,max,n,dynState&&dynState.q?dynState.q.level:"medio");}
function buildT5(tipo,min,max,n,dif){return buildExercicio("5",tipo,min,max,n,dif||"medio");}

var _cap1SubtemaTitulos = {
  '1:inteiros': 'Conjunto dos Números Inteiros', '1:representacao': 'Representar Situações com Inteiros', '1:ordenacao': 'Ordenar Inteiros na Reta',
  '2:absoluto': 'Valor Absoluto |a|', '2:simetrico': 'Simétrico de um Número', '2:comparar': 'Comparar usando Valor Absoluto',
  '3:mesmo_sinal': 'Adição — Mesmo Sinal', '3:sinais_dif': 'Adição — Sinais Diferentes', '3:contexto': 'Adição — Problemas de Contexto',
  '4:subtracao': 'Subtração de Inteiros', '4:adicao_alg': 'Adição Algébrica', '4:simplificar': 'Simplificar Expressões',
  '5:retirar_par': 'Retirar Parênteses', '5:valor_num': 'Valor Numérico', '5:colchetes': 'Colchetes e Chavetas',
};

function _cap1SubtemaGerador(tema, sub) {
  var dif = dynState.q.level || 'medio';
  var lv = lim(dif); var min = lv.min, max = lv.max;
  var N = 6;
  var exs = [];
  for (var i = 0; i < N; i++) {
    var ex = null;
    if (tema==='1' && sub==='inteiros')      ex = buildT1('vf', min, max, i+1);
    else if (tema==='1' && sub==='representacao') ex = buildT1(i%2===0?'mc':'fill', min, max, i+1);
    else if (tema==='1' && sub==='ordenacao') {
      var vals = []; for(var j=0;j<4;j++) vals.push(rnd(min, max));
      var sorted = vals.slice().sort(function(a,b){return a-b;});
      ex = { num:i+1, tema:'Tema 1', tipo:'mc',
        enun:'Qual a ordem crescente de: '+vals.join(', ')+'?',
        opcoes: [sorted.join(' < '), sorted.slice().reverse().join(' > '), shuffle(vals.slice()).join(', '), sorted.join(' > ')].slice(0,4),
        resposta: sorted.join(' < '),
        expl: 'Ordem crescente: '+sorted.join(' < ')+' (da esquerda para a direita na reta numérica).' };
    }
    else if (tema==='2' && sub==='absoluto') {
      var va = rndNZ(min, max);
      ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:'Calcula: |'+va+'| = ?', resposta: Math.abs(va), expl:'|'+va+'| = '+Math.abs(va)+' (distância à origem, sempre positiva).' };
    }
    else if (tema==='2' && sub==='simetrico') {
      var vs = rndNZ(min, max);
      ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:'Qual é o simétrico de '+vs+'?', resposta: -vs, expl:'O simétrico de '+vs+' é '+(-vs)+' — inverte o sinal.' };
    }
    else if (tema==='2' && sub==='comparar') {
      var vc1 = rndNZ(min, max), vc2 = rndNZ(min, max);
      var correctCmp = Math.abs(vc1) > Math.abs(vc2) ? '|'+vc1+'|' : Math.abs(vc1) < Math.abs(vc2) ? '|'+vc2+'|' : 'Iguais';
      ex = { num:i+1, tema:'Tema 2', tipo:'mc',
        enun:'Qual é o maior: |'+vc1+'| ou |'+vc2+'|?',
        opcoes: shuffle(['|'+vc1+'|', '|'+vc2+'|', 'Iguais', '|'+(vc1+vc2)+'|']).slice(0,4),
        resposta: correctCmp,
        expl:'|'+vc1+'| = '+Math.abs(vc1)+', |'+vc2+'| = '+Math.abs(vc2)+'. O maior é '+correctCmp+'.' };
    }
    else if (tema==='3' && sub==='mesmo_sinal') {
      var vm1 = rnd(min<0?min:-max, -1), vm2 = rnd(min<0?min:-max, -1);
      var resm = vm1+vm2;
      ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:'Calcula: ('+fmt(vm1)+') + ('+fmt(vm2)+') = ?', resposta:resm, expl:'Mesmo sinal (ambos negativos): soma os módulos e fica negativo: '+Math.abs(vm1)+'+'+Math.abs(vm2)+'='+Math.abs(resm)+', resultado: '+resm+'.' };
    }
    else if (tema==='3' && sub==='sinais_dif') {
      var vd1 = rndNZ(min, max), vd2 = -rndNZ(min, max);
      var resd = vd1+vd2;
      ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:'Calcula: ('+fmt(vd1)+') + ('+fmt(vd2)+') = ?', resposta:resd, expl:'Sinais diferentes: subtrai os módulos e usa o sinal do maior: resultado = '+resd+'.' };
    }
    else if (tema==='3' && sub==='contexto') ex = buildT3('contexto', min, max, i+1);
    else if (tema==='4' && sub==='subtracao') {
      var vs1 = rndNZ(min, max), vs2 = rndNZ(min, max);
      ex = { num:i+1, tema:'Tema 4', tipo:'fill', enun:'Calcula: ('+fmt(vs1)+') − ('+fmt(vs2)+') = ?', resposta:vs1-vs2, expl:'('+fmt(vs1)+') − ('+fmt(vs2)+') = '+fmt(vs1)+' + '+fmt(-vs2)+' = '+(vs1-vs2)+' (subtrair = adicionar o simétrico).' };
    }
    else if (tema==='4' && sub==='adicao_alg') ex = buildT4('mc', min, max, i+1);
    else if (tema==='4' && sub==='simplificar') ex = buildT4('fill', min, max, i+1);
    else if (tema==='5' && sub==='retirar_par') ex = buildT5('mc', min, max, i+1, dif);
    else if (tema==='5' && sub==='valor_num')   ex = buildT5('fill', min, max, i+1, dif);
    else if (tema==='5' && sub==='colchetes') {
      var vca=rndNZ(-10,10), vcb=rndNZ(-10,10), vcc=rndNZ(-10,10);
      var inner=vcb-vcc, bracket=vca-inner, resc=-bracket;
      ex = { num:i+1, tema:'Tema 5', tipo:'fill',
        enun:'Calcula: −['+vca+' − ('+fmt(vcb)+' − '+fmt(vcc)+')] = ?', resposta:resc,
        expl:'Passo 1: ('+fmt(vcb)+'−'+fmt(vcc)+')='+inner+'. Passo 2: ['+vca+'−('+inner+')]='+bracket+'. Passo 3: −['+bracket+']='+resc+'.' };
    }
    else ex = buildExercicio(tema, i%2===0?'mc':'fill', min, max, i+1, dif);
    if (ex) exs.push(ex);
  }
  return exs;
}

function abrirSubtema(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  var titulo = _cap1SubtemaTitulos[tema+':'+sub] || 'Prática';
  window._stContext = { titulo: titulo, gerador: function(){ return _cap1SubtemaGerador(tema, sub); } };
  criarModalSubtema(titulo, _cap1SubtemaGerador(tema, sub));
}

// ── Topic grid data (rendered by _tplTopicGrid from chapter-engine.js) ──
var _cap1Topics = [
  {id:'tr1', num:'01', title:'Números Inteiros', subs:[
    {onclick:"abrirSubtema('1','inteiros')", label:'Conjunto dos inteiros (ℤ)'},
    {onclick:"abrirSubtema('1','representacao')", label:'Representar situações com inteiros'},
    {onclick:"abrirSubtema('1','ordenacao')", label:'Ordenar inteiros na reta'}
  ]},
  {id:'tr2', num:'02', title:'Valor Absoluto e Simétrico', subs:[
    {onclick:"abrirSubtema('2','absoluto')", label:'Valor absoluto |a|'},
    {onclick:"abrirSubtema('2','simetrico')", label:'Simétrico de um número'},
    {onclick:"abrirSubtema('2','comparar')", label:'Comparar usando |a|'}
  ]},
  {id:'tr3', num:'03', title:'Adição de Inteiros', subs:[
    {onclick:"abrirSubtema('3','mesmo_sinal')", label:'Mesmo sinal'},
    {onclick:"abrirSubtema('3','sinais_dif')", label:'Sinais diferentes'},
    {onclick:"abrirSubtema('3','contexto')", label:'Problemas de contexto'}
  ]},
  {id:'tr4', num:'04', title:'Subtração e Adição Algébrica', subs:[
    {onclick:"abrirSubtema('4','subtracao')", label:'Subtração de inteiros'},
    {onclick:"abrirSubtema('4','adicao_alg')", label:'Adição algébrica'},
    {onclick:"abrirSubtema('4','simplificar')", label:'Simplificar expressões'}
  ]},
  {id:'tr5', num:'05', title:'Expressões com Parênteses', subs:[
    {onclick:"abrirSubtema('5','retirar_par')", label:'Retirar parênteses'},
    {onclick:"abrirSubtema('5','valor_num')", label:'Valor numérico'},
    {onclick:"abrirSubtema('5','colchetes')", label:'Colchetes e chavetas'}
  ]}
];
(function(){
  var el = document.getElementById('cap1-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap1Topics);
})()
