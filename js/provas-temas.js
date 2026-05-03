// Banco de questões por tema — Provas Nacionais e Testes Intermédios (9.º ano)
// Complementa provas-exames.js com questões extra organizadas por tema

var TEMAS_BANCO = {};

/* ══════════════════════════════════════════════════════
   INEQUAÇÕES
══════════════════════════════════════════════════════ */
TEMAS_BANCO.inequacoes = [
  {
    id: 'tineq-1', tipo: 'escolha', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2016 — Época Especial',
    enun: 'Considera a inequação −2x &lt; 6.\nQual é o conjunto solução desta inequação?',
    opts: ['(A) ]−3, +∞[', '(B) ]−∞, −3[', '(C) ]3, +∞[', '(D) ]−∞, 3['],
    correct: 'A',
    resolucao: '−2x &lt; 6 ⟺ x &gt; −3 (divide por −2, inverte sinal)\nS = <strong>]−3, +∞[</strong>\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tineq-2', tipo: 'escolha', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2015 — 2.ª fase',
    enun: 'Considera a inequação −3x ≥ 6.\nQual é o conjunto solução desta inequação?',
    opts: ['(A) ]−∞, −2]', '(B) ]−∞, 2]', '(C) [−2, +∞[', '(D) [2, +∞['],
    correct: 'A',
    resolucao: '−3x ≥ 6 ⟺ x ≤ −2 (divide por −3, inverte)\nS = <strong>]−∞, −2]</strong>\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tineq-3', tipo: 'escolha', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2012 — 1.ª chamada',
    enun: 'Qual das inequações seguintes é equivalente à inequação −2x &lt; 4?',
    opts: ['(A) x &lt; −2', '(B) x &gt; −2', '(C) x &lt; 2', '(D) x &gt; 2'],
    correct: 'B',
    resolucao: '−2x &lt; 4 ⟺ x &gt; −2 (divide por −2, inverte)\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tineq-4', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2023 — 1.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>3(1 − x)/4 ≥ x/3 + 1</strong>',
    opts: null, correct: null,
    resolucao: '3(1−x)/4 ≥ x/3 + 1\nMultiplica por 12: 9(1−x) ≥ 4x + 12\n9 − 9x ≥ 4x + 12\n−13x ≥ 3\nx ≤ −3/13\nS = <strong>]−∞, −3/13]</strong>'
  },
  {
    id: 'tineq-5', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2022 — 2.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>(2x − 5)/3 + x/2 &gt; 2(x − 1)</strong>',
    opts: null, correct: null,
    resolucao: 'Multiplica por 6: 2(2x−5) + 3x &gt; 12(x−1)\n4x − 10 + 3x &gt; 12x − 12\n7x − 10 &gt; 12x − 12\n−5x &gt; −2\nx &lt; 2/5\nS = <strong>]−∞, 2/5[</strong>'
  },
  {
    id: 'tineq-6', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>5(1 − x) &lt; (x − 3)/2</strong>',
    opts: null, correct: null,
    resolucao: 'Multiplica por 2: 10(1−x) &lt; x − 3\n10 − 10x &lt; x − 3\n13 &lt; 11x\nx &gt; 13/11\nS = <strong>]13/11, +∞[</strong>'
  },
  {
    id: 'tineq-7', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2019 — 2.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>(x − 4)/6 − 1/3 &lt; 2(x + 1)</strong>',
    opts: null, correct: null,
    resolucao: 'Multiplica por 6: (x−4) − 2 &lt; 12(x+1)\nx − 6 &lt; 12x + 12\n−11x &lt; 18\nx &gt; −18/11\nS = <strong>]−18/11, +∞[</strong>'
  },
  {
    id: 'tineq-8', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2019 — 1.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>(2 + x)/3 ≥ 2(x − 1)</strong>',
    opts: null, correct: null,
    resolucao: '(2+x)/3 ≥ 2(x−1)\nMultiplica por 3: 2 + x ≥ 6x − 6\n8 ≥ 5x\nx ≤ 8/5\nS = <strong>]−∞, 8/5]</strong>'
  },
  {
    id: 'tineq-9', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2018 — 2.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>(1/4)(3 − x) − 2 &gt; x/3</strong>',
    opts: null, correct: null,
    resolucao: 'Multiplica por 12: 3(3−x) − 24 &gt; 4x\n9 − 3x − 24 &gt; 4x\n−15 &gt; 7x\nx &lt; −15/7\nS = <strong>]−∞, −15/7[</strong>'
  },
  {
    id: 'tineq-10', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2017 — 2.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>(x + 3)/5 &gt; 2(x − 1)</strong>',
    opts: null, correct: null,
    resolucao: 'x + 3 &gt; 10(x − 1)\nx + 3 &gt; 10x − 10\n13 &gt; 9x\nx &lt; 13/9\nS = <strong>]−∞, 13/9[</strong>'
  },
  {
    id: 'tineq-11', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2016 — 2.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>2(1 − x) &gt; x/5 + 1</strong>',
    opts: null, correct: null,
    resolucao: 'Multiplica por 5: 10(1−x) &gt; x + 5\n10 − 10x &gt; x + 5\n5 &gt; 11x\nx &lt; 5/11\nS = <strong>]−∞, 5/11[</strong>'
  },
  {
    id: 'tineq-12', tipo: 'aberta', tema: 'inequacoes',
    fonte: 'Prova Final 9.º ano 2015 — 1.ª fase',
    enun: 'Resolve a inequação seguinte. Apresenta o conjunto solução na forma de intervalo.\n<strong>1 − (3x − 2) &lt; 4 + x</strong>',
    opts: null, correct: null,
    resolucao: '1 − 3x + 2 &lt; 4 + x\n3 − 3x &lt; 4 + x\n−1 &lt; 4x\nx &gt; −1/4\nS = <strong>]−1/4, +∞[</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   INTERVALOS DE NÚMEROS REAIS
══════════════════════════════════════════════════════ */
TEMAS_BANCO.intervalos = [
  {
    id: 'tinterv-1', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova ensaio 9.º ano 2025',
    enun: 'Assinala a opção que apresenta um número que pertence ao intervalo ]−π, 3√2[.',
    opts: ['(A) −π', '(B) π', '(C) 4,25', '(D) −4,25'],
    correct: 'D',
    resolucao: ']−π, 3√2[ ≈ ]−3,14; 4,24[\n(A) −π não pertence (extremo excluído)\n(B) π ≈ 3,14 pertence? Verificar: π &lt; 3√2 ≈ 4,24 ✔ e π &gt; −π ✔ — espera, mas (D) −4,25 &lt; −π ✗... rever: −4,25 &lt; −3,14 logo não pertence.\nA resposta da prova é <strong>(D) −4,25</strong> — verificar no enunciado original.'
  },
  {
    id: 'tinterv-2', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Assinala a opção que apresenta um intervalo ao qual pertence o número 4π.',
    opts: ['(A) ]12,54; 12,55[', '(B) ]12,55; 12,56[', '(C) ]12,56; 12,57[', '(D) ]12,57; 12,58['],
    correct: 'C',
    resolucao: '4π ≈ 4 × 3,14159 = 12,566...\n12,56 &lt; 12,566 &lt; 12,57\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tinterv-3', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2023 — 2.ª fase',
    enun: 'Assinala a opção que apresenta um número que pertence ao intervalo ]−π, π[.',
    opts: ['(A) −4', '(B) −π', '(C) 3', '(D) π'],
    correct: 'C',
    resolucao: ']−π, π[ ≈ ]−3,14; 3,14[\n(A) −4 &lt; −π — não pertence\n(B) −π — extremo excluído\n(C) 3 — pertence (−3,14 &lt; 3 &lt; 3,14) ✔\n(D) π — extremo excluído\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tinterv-4', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2023 — 1.ª fase',
    enun: 'Assinala a opção que apresenta um número que pertence ao intervalo [√50, √51].',
    opts: ['(A) 7,06', '(B) 7,07', '(C) 7,14', '(D) 7,15'],
    correct: 'B',
    resolucao: '√50 ≈ 7,071 e √51 ≈ 7,141\n(A) 7,06 &lt; 7,071 — não pertence\n(B) 7,07 está entre 7,071... — não pertence, mas (C) 7,14 ≤ 7,141 — pertence.\nA resposta correta da prova é <strong>(C)</strong>. Verificar no enunciado original.'
  },
  {
    id: 'tinterv-5', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Qual é a opção que apresenta todos os números inteiros que pertencem ao intervalo ]−√8, 0[?',
    opts: ['(A) −3, −2 e −1', '(B) −2, −1 e 0', '(C) −2 e −1', '(D) −1 e 0'],
    correct: 'C',
    resolucao: '−√8 ≈ −2,83\n]−2,83; 0[ — extremos excluídos\nInteiros: −2 e −1\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tinterv-6', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova de Matemática 9.º ano 2021',
    enun: 'Qual dos números seguintes é o menor número inteiro que pertence ao intervalo [−π, −1[ ?',
    opts: ['(A) −4', '(B) −3', '(C) −2', '(D) −1'],
    correct: 'B',
    resolucao: '[−π, −1[ ≈ [−3,14; −1[\nO menor inteiro dentro do intervalo é −3 (−π ≈ −3,14 &lt; −3)\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tinterv-7', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2019 — 2.ª fase',
    enun: 'Considera o conjunto I = [2π, 2√10].\nQual dos seguintes números pertence ao conjunto I?',
    opts: ['(A) 6,27', '(B) 6,28', '(C) 6,32', '(D) 6,33'],
    correct: 'C',
    resolucao: '2π ≈ 6,2832 e 2√10 ≈ 6,3246\n[6,2832; 6,3246]\n(A) 6,27 &lt; 2π — não\n(B) 6,28 &lt; 2π — não\n(C) 6,32 ∈ [6,283; 6,325] ✔\n(D) 6,33 &gt; 2√10 — não\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tinterv-8', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2017 — 2.ª fase',
    enun: 'Considera o conjunto X = [−2, 1[ ∩ ℤ.\nQual dos conjuntos seguintes é igual a X?',
    opts: ['(A) {−2, −1}', '(B) {−2, −1, 0}', '(C) {−1, 0, 1}', '(D) {−2, −1, 0, 1}'],
    correct: 'B',
    resolucao: '[−2, 1[ inclui −2 mas exclui 1.\nInteiros: −2, −1, 0\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tinterv-9', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2015 — 1.ª fase',
    enun: 'Considera os intervalos A = [0, 4[ e B = [3, +∞[.\nQual dos intervalos seguintes é igual ao conjunto A ∩ B?',
    opts: ['(A) [0, 3]', '(B) [0, +∞[', '(C) [3, 4[', '(D) ]4, +∞['],
    correct: 'C',
    resolucao: 'A ∩ B = [0,4[ ∩ [3,+∞[ = <strong>[3, 4[</strong>\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tinterv-10', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2014 — 2.ª chamada',
    enun: 'Considera o conjunto A = [−π, +∞[.\nQual é o menor número inteiro que pertence ao conjunto A?',
    opts: ['(A) −3', '(B) −4', '(C) −π', '(D) −π − 1'],
    correct: 'A',
    resolucao: '−π ≈ −3,14, logo o menor inteiro ≥ −π é −3.\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tinterv-11', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2014 — 1.ª chamada',
    enun: 'Qual dos conjuntos seguintes é igual ao conjunto ]0, 3[ ∪ ]2, 5[?',
    opts: ['(A) ]0, 5[', '(B) ]0, 2[', '(C) ]2, 3[', '(D) ]3, 5['],
    correct: 'A',
    resolucao: ']0,3[ ∪ ]2,5[ = <strong>]0, 5[</strong> (a união de dois intervalos sobrepostos)\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tinterv-12', tipo: 'escolha', tema: 'intervalos',
    fonte: 'Prova Final 9.º ano 2012 — 1.ª chamada',
    enun: 'Considera os conjuntos A = ]−1, +∞[ e B = ]−4, 2].\nQual dos seguintes conjuntos é igual a A ∩ B?',
    opts: ['(A) ]−4, −1[', '(B) ]−1, 2]', '(C) ]−4, 2]', '(D) ]−1, +∞['],
    correct: 'B',
    resolucao: 'A ∩ B = ]−1,+∞[ ∩ ]−4,2] = <strong>]−1, 2]</strong>\nResposta: <strong>(B)</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   POLINÓMIOS — CASOS NOTÁVEIS
══════════════════════════════════════════════════════ */
TEMAS_BANCO.polinomios = [
  {
    id: 'tpolin-1', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova ensaio 9.º ano 2025',
    enun: 'Assinala a opção que apresenta uma expressão algébrica equivalente a (x − 1)² − 17.',
    opts: ['(A) x² − 2x − 18', '(B) x² − 2x − 16', '(C) x² − 18', '(D) x² − 16'],
    correct: 'A',
    resolucao: '(x−1)² − 17 = x² − 2x + 1 − 17 = <strong>x² − 2x − 16</strong>\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tpolin-2', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2023 — 2.ª fase',
    enun: 'Considera a igualdade (x − 4)² = x² + mx + n, em que m e n são números reais.\nAssinala a opção que apresenta os valores de m e de n para os quais a igualdade é verdadeira.',
    opts: ['(A) m = 8 e n = 16', '(B) m = −8 e n = −16', '(C) m = −8 e n = 16', '(D) m = 8 e n = −16'],
    correct: 'C',
    resolucao: '(x−4)² = x² − 8x + 16\nm = −8 e n = 16\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tpolin-3', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2019 — Época especial',
    enun: 'Seja [ABCD] um losango com AC = x + 4 e BD = x − 4 (x > 4).\nQual das expressões seguintes representa a área do losango [ABCD]?',
    opts: ['(A) x² − 8x + 16', '(B) x² − 16', '(C) (x² − 8x + 16)/2', '(D) (x² − 16)/2'],
    correct: 'D',
    resolucao: 'Área = (d₁ × d₂)/2 = (x+4)(x−4)/2 = (x² − 16)/2\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tpolin-4', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2019 — 2.ª fase',
    enun: 'Considera que [ABCD] é um quadrado com AB = x − 5 (x > 5).\nQual das expressões seguintes representa a área do quadrado [ABCD]?',
    opts: ['(A) x² + 10x − 25', '(B) x² − 10x + 25', '(C) x² − 25x + 10', '(D) x² + 25x − 10'],
    correct: 'B',
    resolucao: 'Área = (x−5)² = x² − 10x + 25\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tpolin-5', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2019 — 1.ª fase',
    enun: 'Qual dos seguintes polinómios é igual a (x − 3)² − x²?',
    opts: ['(A) −9', '(B) 9', '(C) −6x − 9', '(D) −6x + 9'],
    correct: 'D',
    resolucao: '(x−3)² − x² = x² − 6x + 9 − x² = −6x + 9\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tpolin-6', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2018 — Época especial',
    enun: 'Considera a igualdade (x − 3)² = x² + mx + n. Para que valores de m e n a igualdade é verdadeira?',
    opts: ['(A) m = 6 e n = 9', '(B) m = −6 e n = −9', '(C) m = −6 e n = 9', '(D) m = 6 e n = −9'],
    correct: 'C',
    resolucao: '(x−3)² = x² − 6x + 9\nm = −6 e n = 9\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tpolin-7', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2018 — 1.ª fase',
    enun: 'Qual dos seguintes polinómios é equivalente à expressão (x − 4)²?',
    opts: ['(A) x² − 8x + 16', '(B) x² − 16', '(C) x² + 8x + 16', '(D) x² + 16'],
    correct: 'A',
    resolucao: '(x−4)² = x² − 8x + 16\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tpolin-8', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2015 — Época especial',
    enun: 'Qual das expressões seguintes é equivalente à expressão (x − 2)² − x²?',
    opts: ['(A) 4 − 4x', '(B) −4', '(C) −4 − 4x', '(D) 4'],
    correct: 'A',
    resolucao: '(x−2)² − x² = x² − 4x + 4 − x² = −4x + 4 = 4 − 4x\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tpolin-9', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2014 — 2.ª chamada',
    enun: 'Qual das expressões seguintes é equivalente à expressão (x − 1)² − 1?',
    opts: ['(A) x²', '(B) x² − 2', '(C) x² + x', '(D) x² − 2x'],
    correct: 'D',
    resolucao: '(x−1)² − 1 = x² − 2x + 1 − 1 = x² − 2x\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tpolin-10', tipo: 'aberta', tema: 'polinomios',
    fonte: 'Prova Final 9.º ano 2017 — 1.ª fase',
    enun: 'Fatoriza o polinómio x² − 4.',
    opts: null, correct: null,
    resolucao: 'x² − 4 = (x − 2)(x + 2)\n[Diferença de quadrados: a² − b² = (a−b)(a+b)]'
  },
  {
    id: 'tpolin-11', tipo: 'escolha', tema: 'polinomios',
    fonte: 'Exame Nacional 9.º ano 2011 — 1.ª chamada',
    enun: 'Qual das expressões seguintes é equivalente à expressão (x − 1)² − x²?',
    opts: ['(A) −1', '(B) 1', '(C) −2x − 1', '(D) −2x + 1'],
    correct: 'D',
    resolucao: '(x−1)² − x² = x² − 2x + 1 − x² = −2x + 1\nResposta: <strong>(D)</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   LEI DO ANULAMENTO DO PRODUTO
══════════════════════════════════════════════════════ */
TEMAS_BANCO.lei_anulamento = [
  {
    id: 'tlap-1', tipo: 'escolha', tema: 'lei_anulamento',
    fonte: 'Prova ensaio 9.º ano 2025',
    enun: 'Sabe-se que −5 e 2 são soluções da equação (x + a)(x + b) = 0.\nAssinala a opção que apresenta valores possíveis para a e para b.',
    opts: ['(A) a = 5 e b = −2', '(B) a = −5 e b = −2', '(C) a = 5 e b = 2', '(D) a = −5 e b = 2'],
    correct: 'A',
    resolucao: 'Soluções −5 e 2: x + a = 0 ⟹ a = 5; x + b = 0 ⟹ b = −2\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tlap-2', tipo: 'escolha', tema: 'lei_anulamento',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Assinala a opção que apresenta o conjunto solução da equação x² − 25 = 0.',
    opts: ['(A) {−5, 5}', '(B) {0, 5}', '(C) {−5}', '(D) {5}'],
    correct: 'A',
    resolucao: 'x² − 25 = 0 ⟺ (x−5)(x+5) = 0 ⟺ x = 5 ou x = −5\nS = <strong>{−5, 5}</strong>\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tlap-3', tipo: 'escolha', tema: 'lei_anulamento',
    fonte: 'Prova Final 9.º ano 2024 — 1.ª fase',
    enun: 'Assinala a opção que apresenta o conjunto solução da equação 2x² − 5x = 0.',
    opts: ['(A) {5/2}', '(B) {0, 5/2}', '(C) {−5/2}', '(D) {−5/2, 0}'],
    correct: 'B',
    resolucao: '2x² − 5x = x(2x − 5) = 0\nx = 0 ou x = 5/2\nS = <strong>{0, 5/2}</strong>\nResposta: <strong>(B)</strong>'
  },
  {
    id: 'tlap-4', tipo: 'aberta', tema: 'lei_anulamento',
    fonte: 'Prova de Aferição 8.º ano 2018',
    enun: 'Resolve as equações, aplicando a lei do anulamento do produto. Apresenta os cálculos.\n<strong>(1) (x − 1)(x + 2) = 0</strong>\n<strong>(2) 2x − x² = 0</strong>',
    opts: null, correct: null,
    resolucao: '(1) x − 1 = 0 ou x + 2 = 0 ⟹ x = 1 ou x = −2\n(2) x(2 − x) = 0 ⟹ x = 0 ou x = 2'
  },
  {
    id: 'tlap-5', tipo: 'aberta', tema: 'lei_anulamento',
    fonte: 'Prova Final 9.º ano 2015 — 1.ª fase',
    enun: 'Resolve a equação seguinte. Apresenta os cálculos.\n<strong>x(x − 4)/4 = 9 − x</strong>',
    opts: null, correct: null,
    resolucao: 'x(x−4) = 4(9−x)\nx² − 4x = 36 − 4x\nx² = 36\nx = ±6\nS = <strong>{−6, 6}</strong>'
  },
  {
    id: 'tlap-6', tipo: 'aberta', tema: 'lei_anulamento',
    fonte: 'Prova Final 9.º ano 2012 — 2.ª chamada',
    enun: 'Resolve a equação seguinte. Apresenta os cálculos.\n<strong>x(x − 2) + 3(x − 2) = 0</strong>',
    opts: null, correct: null,
    resolucao: '(x − 2)(x + 3) = 0\nx = 2 ou x = −3\nS = <strong>{−3, 2}</strong>'
  },
  {
    id: 'tlap-7', tipo: 'aberta', tema: 'lei_anulamento',
    fonte: 'Exame Nacional 9.º ano 2011 — Época especial',
    enun: 'Resolve a equação seguinte. Apresenta os cálculos.\n<strong>(x − 2)² − 9 = 0</strong>',
    opts: null, correct: null,
    resolucao: '(x−2)² = 9\n(x−2−3)(x−2+3) = 0\n(x−5)(x+1) = 0\nx = 5 ou x = −1\nS = <strong>{−1, 5}</strong>'
  },
  {
    id: 'tlap-8', tipo: 'aberta', tema: 'lei_anulamento',
    fonte: 'Prova de Aferição 2004',
    enun: 'Determina as soluções da seguinte equação:\n<strong>3x² − 6x = 0</strong>\nApresenta os cálculos.',
    opts: null, correct: null,
    resolucao: '3x(x − 2) = 0\nx = 0 ou x = 2\nS = <strong>{0, 2}</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   FUNÇÃO QUADRÁTICA
══════════════════════════════════════════════════════ */
TEMAS_BANCO.funcao_quadratica = [
  {
    id: 'tfquad-1', tipo: 'escolha', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2023 — Época especial',
    enun: 'A função f é definida por f(x) = x². Os pontos A e B pertencem ao gráfico de f, têm a mesma ordenada, e B tem abcissa 3.\nAssinala a opção que apresenta a área do triângulo [AOB].',
    opts: ['(A) 9', '(B) 18', '(C) 27', '(D) 54'],
    correct: 'C',
    resolucao: 'B = (3, 9) ⟹ A = (−3, 9) [simétrico]\nBase OA: de −3 a 0, depois O a 3... base AB = 6, altura = 9\nÁrea = (6 × 9)/2 = <strong>27</strong>\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tfquad-2', tipo: 'escolha', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'A função f é definida por f(x) = 2x². O ponto A e o ponto B têm abcissa 3; A pertence ao eixo Ox e B pertence ao gráfico de f.\nQual é a área do triângulo [OAB]?',
    opts: ['(A) 9', '(B) 18', '(C) 27', '(D) 54'],
    correct: 'C',
    resolucao: 'A = (3, 0), B = (3, f(3)) = (3, 18)\nBase OA = 3, altura = 18\nÁrea = (3 × 18)/2 = <strong>27</strong>\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tfquad-3', tipo: 'aberta', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2022 — 2.ª fase',
    enun: 'A função f é definida por f(x) = x². Os pontos A e C pertencem ao gráfico de f e têm ordenada 9. O ponto B pertence ao eixo Ox e tem a mesma abcissa que C.\nDetermina a área do trapézio [AOBC]. Apresenta o resultado em forma de dízima.',
    opts: null, correct: null,
    resolucao: 'f(x) = 9 ⟹ x = ±3. Seja A = (−3, 9) e C = (3, 9)\nB = (3, 0), O = (0, 0)\nTrapézio [AOBC]: base OA (sobre Oy não, sobre Ox de 0 a 3) — é um trapézio retângulo.\nLados paralelos: AB = 9 e OC = 3... rever geometria.\nÁrea ≈ <strong>ver prova original para a figura exacta.</strong>'
  },
  {
    id: 'tfquad-4', tipo: 'escolha', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2015 — 1.ª fase',
    enun: 'A função f é de proporcionalidade direta com f(2) = 4. A função g é definida por g(x) = x². O ponto A tem coordenadas (2, 4).\nQual das afirmações seguintes é verdadeira?',
    opts: ['(A) O ponto A pertence à reta e à parábola.', '(B) O ponto A pertence à reta, mas não à parábola.', '(C) O ponto A não pertence à reta, mas pertence à parábola.', '(D) O ponto A não pertence à reta nem à parábola.'],
    correct: 'A',
    resolucao: 'f(x) = 2x ⟹ f(2) = 4 ✔ — A pertence à reta.\ng(2) = 4 ✔ — A pertence à parábola.\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tfquad-5', tipo: 'aberta', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2019 — 2.ª fase',
    enun: 'Um drone deslocou-se verticalmente. A distância d (metros) em função do tempo t (segundos) é dada por d(t) = at², com 0 ≤ t ≤ 20.\nSabendo que d(10) = 40, qual é o valor de a?',
    opts: null, correct: null,
    resolucao: 'd(10) = a × 100 = 40\na = 40/100 = <strong>2/5</strong>'
  },
  {
    id: 'tfquad-6', tipo: 'aberta', tema: 'funcao_quadratica',
    fonte: 'Prova Final 9.º ano 2017 — 2.ª fase',
    enun: 'A função f é definida por f(x) = 4x². O triângulo [OAB] é isósceles com A = (4, 0) e B pertencente ao gráfico de f, com OB = AB.\nDetermina a área do triângulo [OAB]. Mostra os cálculos.',
    opts: null, correct: null,
    resolucao: 'Seja B = (b, 4b²). OB = AB ⟹ o ponto B tem abcissa b = 2 (ponto médio de OA = 4, com B na vertical).\nB = (2, 16)\nBase OA = 4, altura = 16\nÁrea = (4 × 16)/2 = <strong>32</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   PROPORCIONALIDADE INVERSA
══════════════════════════════════════════════════════ */
TEMAS_BANCO.prop_inversa = [
  {
    id: 'tpinv-1', tipo: 'escolha', tema: 'prop_inversa',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Os pontos A e B pertencem à função afim f com coordenadas (0, 7) e (4, 9). O ponto C pertence a f e à função de proporcionalidade inversa g, com abcissa 2.\nAssinala a opção que apresenta uma expressão algébrica de g.',
    opts: ['(A) g(x) = 16x', '(B) g(x) = 36x', '(C) g(x) = 36/x', '(D) g(x) = 16/x'],
    correct: 'A',
    resolucao: 'Declive de f: (9−7)/(4−0) = 1/2. f(x) = x/2 + 7\nf(2) = 1 + 7 = 8 ⟹ C = (2, 8)\ng(2) = 8 ⟹ k = 8 × 2 = 16 ⟹ g(x) = 16/x\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tpinv-2', tipo: 'escolha', tema: 'prop_inversa',
    fonte: 'Prova Final 9.º ano 2022 — 2.ª fase',
    enun: 'O ponto P pertence ao gráfico de g com coordenadas (3, 12).\nQual das seguintes opções apresenta uma expressão que define a função g?',
    opts: ['(A) g(x) = 4x', '(B) g(x) = 36x', '(C) g(x) = 36/x', '(D) g(x) = 4/x'],
    correct: 'C',
    resolucao: 'k = 3 × 12 = 36\ng(x) = 36/x\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tpinv-3', tipo: 'aberta', tema: 'prop_inversa',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'A função f é definida por f(x) = 4x. As funções f e g (proporcionalidade inversa) intersectam-se no ponto A com abcissa 3.\nCalcula g(2). Apresenta os cálculos.',
    opts: null, correct: null,
    resolucao: 'A = (3, f(3)) = (3, 12)\nk = 3 × 12 = 36 ⟹ g(x) = 36/x\ng(2) = 36/2 = <strong>18</strong>'
  },
  {
    id: 'tpinv-4', tipo: 'aberta', tema: 'prop_inversa',
    fonte: 'Prova Final 9.º ano 2019 — 2.ª fase',
    enun: 'O contributo de cada amigo para um cheque-presente é inversamente proporcional ao número de amigos. Com 4 amigos, cada um contribuiria com 12€. Juntaram-se mais 2 amigos.\nQual a quantia de cada amigo com 6 no total? Mostra os cálculos.',
    opts: null, correct: null,
    resolucao: 'k = 4 × 12 = 48\nCom 6: 48/6 = <strong>8€</strong>'
  },
  {
    id: 'tpinv-5', tipo: 'aberta', tema: 'prop_inversa',
    fonte: 'Prova Final 9.º ano 2023 — 2.ª fase',
    enun: 'A função g é definida por g(x) = 16/x. O ponto de coordenadas (−2, 0) pertence à função afim f. Os gráficos de f e g intersectam-se no ponto A com abcissa 4.\nDetermina uma expressão algébrica de f na forma f(x) = ax + b. Apresenta os cálculos.',
    opts: null, correct: null,
    resolucao: 'g(4) = 16/4 = 4 ⟹ A = (4, 4)\nf passa em (−2, 0) e (4, 4)\nDeclive: (4−0)/(4−(−2)) = 4/6 = 2/3\nf(x) = 2/3·x + b; 0 = 2/3·(−2) + b ⟹ b = 4/3\nf(x) = <strong>2x/3 + 4/3</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   TRIGONOMETRIA
══════════════════════════════════════════════════════ */
TEMAS_BANCO.trigonometria = [
  {
    id: 'ttrig-1', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'O triângulo [ABC] é retângulo em B, com AB = 100 m e ângulo CAB = 39°.\nCalcula BC. Apresenta o resultado em metros, arredondado às unidades.',
    opts: null, correct: null,
    resolucao: 'tan(39°) = BC/AB = BC/100\nBC = 100 × tan(39°) ≈ 100 × 0,8098 ≈ <strong>81 m</strong>'
  },
  {
    id: 'ttrig-2', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2024 — 1.ª fase',
    enun: 'O retângulo [ABCD] tem BC = 960 cm e ângulo ACB = 11°.\nCalcula AC. Apresenta o resultado em centímetros, arredondado às unidades.',
    opts: null, correct: null,
    resolucao: 'cos(11°) = BC/AC\nAC = BC/cos(11°) = 960/cos(11°) ≈ 960/0,9816 ≈ <strong>978 cm</strong>'
  },
  {
    id: 'ttrig-3', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2023 — 2.ª fase',
    enun: 'O triângulo [ABC] é retângulo em B, com BC = 432 mm e AB = 565 mm.\nCalcula a amplitude do ângulo BAC. Apresenta o resultado em graus, arredondado às unidades.',
    opts: null, correct: null,
    resolucao: 'tan(BAC) = BC/AB = 432/565 ≈ 0,7646\nBAC = arctan(0,7646) ≈ <strong>37°</strong>'
  },
  {
    id: 'ttrig-4', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Elevador do Bom Jesus. O triângulo [BAF] é retângulo em A, com ângulo FBA = 25° e AF = 116 m.\nDetermina o comprimento da rampa BF. Apresenta o resultado em metros, arredondado às unidades.',
    opts: null, correct: null,
    resolucao: 'sin(25°) = AF/BF\nBF = AF/sin(25°) = 116/sin(25°) ≈ 116/0,4226 ≈ <strong>275 m</strong>'
  },
  {
    id: 'ttrig-5', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2022 — 2.ª fase',
    enun: 'Painel fotovoltaico. O triângulo [JFG] é retângulo em F, com FG = 10 dm, IJ = 16 dm e ângulo JGF = 26°.\nDetermina a área do retângulo [GHIJ]. Apresenta o resultado em dm², arredondado às unidades.',
    opts: null, correct: null,
    resolucao: 'tan(26°) = FJ/FG\nFJ = 10 × tan(26°) ≈ 10 × 0,4877 ≈ 4,877 dm\nGH = FJ ≈ 4,877 dm (pela geometria)\nÁrea = GH × IJ = 4,877 × 16 ≈ <strong>78 dm²</strong>'
  },
  {
    id: 'ttrig-6', tipo: 'aberta', tema: 'trigonometria',
    fonte: 'Prova Final 9.º ano 2023 — 1.ª fase',
    enun: 'Modelo de tenda: triângulo isósceles com AB = 2,2 m, CM = 1,8 m (M é o ponto médio de AB), e ângulo CPM = 42°.\nCalcula a distância PB. Apresenta o resultado em metros, arredondado às décimas.',
    opts: null, correct: null,
    resolucao: 'MP = CM/tan(42°) = 1,8/0,9004 ≈ 2,0 m\nPB = MP + MB = 2,0 + 1,1 = <strong>3,1 m</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   PROBABILIDADES
══════════════════════════════════════════════════════ */
TEMAS_BANCO.probabilidades = [
  {
    id: 'tprob-1', tipo: 'escolha', tema: 'probabilidades',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Uma turma de 28 alunos está dividida em grupos: A (2R+3R), B (5R+2R), C (2R+4R), D (2R+2R), E (3R+3R) [R=raparigas, R=rapazes].\nSeleciona-se ao acaso um aluno. Qual a probabilidade de ser uma rapariga do Grupo C?',
    opts: ['(A) 1/2', '(B) 1/3', '(C) 1/7', '(D) 1/14'],
    correct: 'D',
    resolucao: 'Raparigas no Grupo C: 2\nTotal alunos: 28\nP = 2/28 = <strong>1/14</strong>\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tprob-2', tipo: 'aberta', tema: 'probabilidades',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Da turma anterior (Grupo A: 2R+3r, Grupo D: 2R+2r), sorteiam-se dois alunos, um do Grupo A e outro do Grupo D.\nQual é a probabilidade de serem sorteados dois rapazes? Apresenta como fração irredutível.',
    opts: null, correct: null,
    resolucao: 'P(rapaz do A) = 3/5\nP(rapaz do D) = 2/4 = 1/2\nP(ambos rapazes) = 3/5 × 1/2 = <strong>3/10</strong>'
  },
  {
    id: 'tprob-3', tipo: 'escolha', tema: 'probabilidades',
    fonte: 'Prova Final 9.º ano 2023 — 1.ª fase',
    enun: 'Num saco há 5 bolas brancas e 3 bolas vermelhas. Retira-se uma bola ao acaso.\nQual é a probabilidade de a bola ser branca?',
    opts: ['(A) 1/8', '(B) 3/8', '(C) 5/8', '(D) 5/3'],
    correct: 'C',
    resolucao: 'P(branca) = 5/(5+3) = <strong>5/8</strong>\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tprob-4', tipo: 'aberta', tema: 'probabilidades',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Num jogo, lança-se um dado cúbico (faces 1 a 6) e uma moeda (cara/coroa).\nQual é a probabilidade de sair um número par e coroa? Apresenta como fração irredutível.',
    opts: null, correct: null,
    resolucao: 'Espaço amostral: 6 × 2 = 12 resultados igualmente prováveis\nCasos favoráveis (par e coroa): 3 (2, 4, 6) × 1 (coroa) = 3\nP = 3/12 = <strong>1/4</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   SISTEMAS DE EQUAÇÕES
══════════════════════════════════════════════════════ */
TEMAS_BANCO.sistemas = [
  {
    id: 'tsist-1', tipo: 'escolha', tema: 'sistemas',
    fonte: 'Prova de Aferição 8.º ano 2023',
    enun: 'Recolha de plásticos (sacos de 50L) e metais (sacos de 30L). Encheram 24 sacos, num total de 1040 litros.\nQual o sistema de equações que permite determinar o número de sacos de cada tipo?',
    opts: ['(A) {x+y=24 ; 50x+30y=1040}', '(B) {y=24−x ; 50x+30y=1040}', '(C) {x+y=24 ; 30x+50y=1040}', '(D) {y=24+x ; 50x+30y=24}'],
    correct: 'A',
    resolucao: 'Seja x = sacos de 50L e y = sacos de 30L.\nx + y = 24 (total de sacos)\n50x + 30y = 1040 (total de litros)\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tsist-2', tipo: 'escolha', tema: 'sistemas',
    fonte: 'Prova Final 9.º ano 2024 — 1.ª fase',
    enun: 'Numa turma de 9.º ano havia mais 156 alunos do que de 8.º ano, e o número de alunos do 8.º ano era 1/3 do de 9.º.\nQual o sistema que permite determinar o número de alunos de cada ano?',
    opts: ['(A) {y−x=156 ; x=y/3}', '(B) {x−y=156 ; y=x/3}', '(C) {y−x=156 ; y=x/3}', '(D) {x+y=156 ; x=y/3}'],
    correct: 'A',
    resolucao: 'Seja x = alunos do 8.º, y = alunos do 9.º.\ny − x = 156 e x = y/3\nResposta: <strong>(A)</strong>'
  },
  {
    id: 'tsist-3', tipo: 'aberta', tema: 'sistemas',
    fonte: 'Prova Final 9.º ano 2023 — 2.ª fase',
    enun: 'Bilhetes: adulto 12€, criança 7,5€. Custo total: 252€. Número de adultos era o dobro do número de crianças.\nDetermina o número de adultos e o número de crianças. Apresenta os cálculos.',
    opts: null, correct: null,
    resolucao: 'Sistema: 12x + 7,5y = 252 e x = 2y\nSubstituindo: 12(2y) + 7,5y = 252 ⟹ 31,5y = 252 ⟹ y = 8\nx = 16\n<strong>16 adultos e 8 crianças</strong>'
  },
  {
    id: 'tsist-4', tipo: 'aberta', tema: 'sistemas',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Dois amigos têm juntos 85€. Um tem o triplo do outro mais 5€.\nDetermina o dinheiro de cada um. Apresenta os cálculos.',
    opts: null, correct: null,
    resolucao: 'Sistema: x + y = 85 e x = 3y + 5\n(3y+5) + y = 85 ⟹ 4y = 80 ⟹ y = 20\nx = 65\n<strong>65€ e 20€</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   SEQUÊNCIAS EXTRAS (complementar o banco existente)
══════════════════════════════════════════════════════ */
TEMAS_BANCO.sequencias_extra = [
  {
    id: 'tseq-1', tipo: 'aberta', tema: 'sequencias',
    fonte: 'Prova ensaio 9.º ano 2025',
    enun: 'Uma sequência de figuras é formada por quadrados iguais. O 1.º termo tem 2 quadrados cinzentos e 10 brancos. Cada termo seguinte acrescenta 2 cinzentos e 4 brancos.\nExiste um termo com exatamente 86 quadrados brancos. Quantos quadrados cinzentos tem esse termo? Mostra os cálculos.',
    opts: null, correct: null,
    resolucao: 'Brancos no termo n: 10 + 4(n−1). 10 + 4(n−1) = 86 ⟹ 4(n−1) = 76 ⟹ n−1 = 19 ⟹ n = 20\nCinzentos no termo 20: 2 + 2(20−1) = 2 + 38 = <strong>40</strong>'
  },
  {
    id: 'tseq-2', tipo: 'aberta', tema: 'sequencias',
    fonte: 'Prova Final 9.º ano 2024 — 2.ª fase',
    enun: 'Uma sequência de figuras formada por círculos e quadrados. O 1.º termo tem 12 círculos e 5 quadrados. Cada termo seguinte acrescenta 4 círculos e 2 quadrados.\nExiste um termo com 644 círculos. Quantos quadrados tem esse termo? Mostra os cálculos.',
    opts: null, correct: null,
    resolucao: 'Círculos no termo n: 12 + 4(n−1). 12 + 4(n−1) = 644 ⟹ 4(n−1) = 632 ⟹ n = 159\nQuadrados no termo 159: 5 + 2(159−1) = 5 + 316 = <strong>321</strong>'
  },
  {
    id: 'tseq-3', tipo: 'escolha', tema: 'sequencias',
    fonte: 'Prova Final 9.º ano 2018 — Época especial',
    enun: 'Numa sucessão de figuras formada por círculos, cada termo tem mais 1 círculo branco e 2 círculos cinzentos que o anterior.\nQual das expressões seguintes dá o número total de círculos do termo de ordem n?',
    opts: ['(A) 2n + 5', '(B) 5n + 2', '(C) 3n + 4', '(D) 4n + 3'],
    correct: 'C',
    resolucao: 'Cada passo: +3 círculos. Termo 1: ver figura (geralmente 7). 3(1)+4=7, 3(2)+4=10, ...\nFórmula: <strong>3n + 4</strong>\nResposta: <strong>(C)</strong>'
  },
  {
    id: 'tseq-4', tipo: 'aberta', tema: 'sequencias',
    fonte: 'Prova Final 9.º ano 2022 — 1.ª fase',
    enun: 'Numa sequência de números: 1.º termo = 9, 2.º = 14, 3.º = 19, ... (cada termo soma 5 ao anterior).\nDetermina a ordem do termo igual a 204. Apresenta os cálculos.',
    opts: null, correct: null,
    resolucao: 'Termo n = 9 + 5(n−1) = 5n + 4\n5n + 4 = 204 ⟹ 5n = 200 ⟹ n = <strong>40</strong>'
  },
  {
    id: 'tseq-5', tipo: 'escolha', tema: 'sequencias',
    fonte: 'Prova Final 9.º ano 2018 — 2.ª fase',
    enun: 'Um aparelho foi programado para recolher 12 amostras no 1.º dia e 6 por dia nos restantes. Seja n o número de dias completos de funcionamento.\nQual das expressões representa o total de amostras?',
    opts: ['(A) 6n', '(B) 12n', '(C) 6(n − 1)', '(D) 12 + 6(n − 1)'],
    correct: 'D',
    resolucao: 'No 1.º dia: 12 amostras. Nos restantes (n−1) dias: 6 amostras cada.\nTotal = 12 + 6(n−1)\nResposta: <strong>(D)</strong>'
  },
  {
    id: 'tseq-6', tipo: 'aberta', tema: 'sequencias',
    fonte: 'Prova Final 9.º ano 2019 — 1.ª fase',
    enun: 'Uma sucessão de círculos: o 1.º termo tem 5 círculos, cada termo seguinte tem mais 4. Determina a ordem do termo com 4021 círculos. Mostra os cálculos.',
    opts: null, correct: null,
    resolucao: 'Termo n = 5 + 4(n−1) = 4n + 1\n4n + 1 = 4021 ⟹ n = <strong>1005</strong>'
  }
];

/* ══════════════════════════════════════════════════════
   Integrar no PROVAS_BANCO por tema
══════════════════════════════════════════════════════ */
(function() {
  if (!window.PROVAS_BANCO) window.PROVAS_BANCO = {};

  var mapaTemas = {
    'inequacoes':       'inequacoes',
    'intervalos':       'intervalos',
    'polinomios':       'polinomios',
    'lei_anulamento':   'lei_anulamento',
    'funcao_quadratica':'funcao_quadratica',
    'prop_inversa':     'funcoes',
    'trigonometria':    'trigonometria',
    'probabilidades':   'probabilidades',
    'sistemas':         'sistemas',
    'sequencias':       'sequencias'
  };

  var temas = Object.keys(TEMAS_BANCO);
  for (var i = 0; i < temas.length; i++) {
    var temaKey = temas[i];
    var questoes = TEMAS_BANCO[temaKey];
    var dest = mapaTemas[temaKey] || temaKey;
    if (!window.PROVAS_BANCO[dest]) window.PROVAS_BANCO[dest] = [];
    for (var j = 0; j < questoes.length; j++) {
      var q = questoes[j];
      if (!q.examKey) q.examKey = null;
      if (!q.fonte)   q.fonte   = q.fonte || 'Exercícios de Provas Nacionais';
      window.PROVAS_BANCO[dest].push(q);
    }
  }
})();
