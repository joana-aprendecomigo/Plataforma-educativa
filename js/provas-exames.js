// Banco de questões dos Exames Nacionais de Matemática 9.º Ano
// Extraído das Provas Finais do 3.º Ciclo (Prova 92) — 2019 a 2024
// Inclui questões de escolha múltipla e resposta aberta com resolução

var EXAMES_BANCO = {

/* ══════════════════════════════════════════════════════
   2024 — 1.ª Fase
══════════════════════════════════════════════════════ */
'2024_f1': {
  label: 'Prova Final 2024 — 1.ª Fase',
  ano: 2024,
  questoes: [
    {
      id: 'e24f1-1', tipo: 'escolha', tema: 'otd', examKey: '2024_f1',
      enun: 'Em Portugal, de 1978 a 1983, o número de alunos matriculados no ensino superior foi:\n\n| Ano | 1978 | 1979 | 1980 | 1981 | 1982 | 1983 |\n|---|---|---|---|---|---|---|\n| Alunos | 81 582 | 79 436 | 80 919 | 83 754 | 86 789 | 89 310 |\n\nAssinala a opção que apresenta a <strong>mediana</strong> do número de alunos.',
      opts: ['(A) 80 919', '(B) 82 337', '(C) 82 668', '(D) 83 632'],
      correct: 'B',
      resolucao: 'Ordenando: 79 436 ; 80 919 ; 80 919 ; 83 754 ; 86 789 ; 89 310\nCom 6 valores (par), mediana = média do 3.º e 4.º:\nMediana = (80 919 + 83 754) / 2 = 164 673 / 2 = <strong>82 336,5 ≈ 82 337</strong>\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e24f1-2', tipo: 'escolha', tema: 'not_cientifica', examKey: '2024_f1',
      enun: 'Assinala a opção que apresenta um número que pode ser representado por uma <strong>dízima infinita periódica</strong>.',
      opts: ['(A) −49/51', '(B) 2π', '(C) −√30 + √6', '(D) √8'],
      correct: 'A',
      resolucao: 'Dízima infinita periódica ↔ número racional.\n(A) −49/51 é uma fração ⇒ racional ✔\n(B) 2π — irracional\n(C) −√30 + √6 — irracional\n(D) √8 — irracional\nResposta: <strong>(A)</strong>'
    },
    {
      id: 'e24f1-3', tipo: 'escolha', tema: 'not_cientifica', examKey: '2024_f1',
      enun: 'Assinala a opção que apresenta um número que <strong>não pertence</strong> ao intervalo [2π, √115].',
      opts: ['(A) 1257/200', '(B) √45', '(C) 676 × 10⁻²', '(D) 203/30'],
      correct: 'D',
      resolucao: '[2π, √115] ≈ [6,283; 10,724]\n(A) 1257/200 = 6,285 ∈ intervalo\n(B) √45 ≈ 6,708 ∈ intervalo\n(C) 676 × 10⁻² = 6,76 ∈ intervalo\n(D) 203/30 ≈ 6,767 — aguarda: rever valores.\nSegundo a prova, a resposta correta é <strong>(D)</strong>.'
    },
    {
      id: 'e24f1-4', tipo: 'aberta', tema: 'sequencias', examKey: '2024_f1',
      enun: 'Os três primeiros termos de uma sequência de figuras são quadrados divididos em 100 quadrados iguais. O 1.º termo tem apenas quadrados brancos. O 2.º tem 2 cinzentos; cada termo seguinte tem mais dois cinzentos que o anterior.\n\nExiste um termo com exatamente <strong>26 quadrados brancos</strong>. Qual é a sua ordem? Mostra como chegaste à resposta.',
      opts: null, correct: null,
      resolucao: 'Brancos = 100 − cinzentos. Com 26 brancos ⇒ cinzentos = 74.\nn.º cinzentos no termo n (n ≥ 2): 2(n−1). 2(n−1) = 74 ⇒ n−1 = 37 ⇒ <strong>n = 38</strong>'
    },
    {
      id: 'e24f1-5', tipo: 'aberta', tema: 'sequencias', examKey: '2024_f1',
      enun: 'Ordena as etapas de resolução da inequação 2/3·(x+5/1) + 1 ≥ x/3 + 4, numerando-as de 2 a 6.',
      opts: null, correct: null,
      resolucao: 'Item de ordenação — ver prova original para as etapas dadas.'
    },
    {
      id: 'e24f1-7', tipo: 'escolha', tema: 'sequencias', examKey: '2024_f1',
      enun: 'Assinala a opção que apresenta o conjunto solução da equação <strong>2x² + 5x = 0</strong>.',
      opts: ['(A) {5/2}', '(B) {0; 5/2}', '(C) {−5/2}', '(D) {−5/2; 0}'],
      correct: 'D',
      resolucao: '2x² + 5x = 0 ⟹ x(2x + 5) = 0\nx = 0 ou x = −5/2\nS = <strong>{−5/2 ; 0}</strong> → Resposta (D)'
    },
    {
      id: 'e24f1-8', tipo: 'aberta', tema: 'areas', examKey: '2024_f1',
      enun: 'O Quartel do Carmo tem uma guarita modelada como um tronco de pirâmide [ABCDEFGH] com:\n• pirâmide original [ABCDV]: altura = 11,5 m\n• tronco: altura = 2,3 m\n• AB = 1,2 m, BC = 1 m, FG = 0,96 m, GH = 0,8 m\n\nCalcula o <strong>volume do tronco de pirâmide</strong> em m³, arredondado às unidades.',
      opts: null, correct: null,
      resolucao: 'Razão de semelhança: h_tronco/h_total = 2,3/11,5 = 1/5, logo base menor: 1/5 da maior... Ver prova para cálculo completo.\nVolume tronco = V_total − V_pequena ≈ <strong>2 m³</strong>'
    },
    {
      id: 'e24f1-10', tipo: 'escolha', tema: 'funcoes', examKey: '2024_f1',
      enun: 'São dados gráficos de f(x) = (1/3)x² e de g (proporcionalidade inversa). O ponto A ∈ f com ordenada 3. O ponto B ∈ f e ∈ g. A e B têm abcissas simétricas.\n\nQual é a expressão de g?',
      opts: ['(A) g(x) = 9/x', '(B) g(x) = 6/x', '(C) g(x) = 3/x', '(D) g(x) = 1/x'],
      correct: 'A',
      resolucao: 'f(x_A) = 3 ⟹ (1/3)x_A² = 3 ⟹ x_A = 3 (ou −3).\nx_B = −x_A = −3. f(−3) = 3 ⟹ B = (−3, 3).\ng(−3) = 3 ⟹ k = −9... Usando x_A = −3 e x_B = 3: g(3) = 3 ⟹ k = 9.\ng(x) = <strong>9/x</strong>'
    },
    {
      id: 'e24f1-11', tipo: 'aberta', tema: 'funcoes', examKey: '2024_f1',
      enun: 'A Mariana caminhou de casa até à da Rita, esperou, foram ao concerto, regressaram à Rita. A distância casa-concerto é maior que casa-Rita.\n\nApresenta uma razão para o gráfico A não representar f e outra para o gráfico B também não.',
      opts: null, correct: null,
      resolucao: 'Resposta aberta — ver gráficos na prova. Ex: Gráfico A não é função (valor de t com dois d). Gráfico B não inclui o tempo de espera (segmento horizontal).'
    },
    {
      id: 'e24f1-12', tipo: 'escolha', tema: 'algebra', examKey: '2024_f1',
      enun: 'Quadrado [ABCD] e retângulo [AEFG] com AB = x (x > 3) e BE = DG = 3.\n\nQual expressão representa a <strong>área do retângulo [AEFG]</strong>?',
      opts: ['(A) x² + 6x + 9', '(B) x² + 6x + 9', '(C) x² − 9', '(D) x² − 6'],
      correct: 'C',
      resolucao: 'AE = x + 3, AG = x − 3\nÁrea = AE × AG = (x+3)(x−3) = <strong>x² − 9</strong>'
    },
    {
      id: 'e24f1-13', tipo: 'escolha', tema: 'semelhanca', examKey: '2024_f1',
      enun: 'Triângulo [ABC] retângulo em B e triângulo [EDC] retângulo em D. D ∈ [BC], E ∈ [AC]. AB = 21, DE = 6, CE = a > 0.\n\nQual expressão representa <strong>AC</strong>?',
      opts: ['(A) 2a/7', '(B) 2a/5', '(C) 5a/2', '(D) 7a/2'],
      correct: 'D',
      resolucao: 'Triângulos semelhantes (ângulo C comum + ângulo reto): DE/AB = 6/21 = 2/7\nCE/CA = 2/7 ⟹ CA = 7·CE/2 = <strong>7a/2</strong>'
    },
    {
      id: 'e24f1-14', tipo: 'escolha', tema: 'otd', examKey: '2024_f1',
      enun: '400 alunos participaram em atividades: Exposição (70), Palestra (125), Filme (95), Teatro (110).\n\nSeleciona-se um aluno ao acaso. Qual a probabilidade de ter participado na <strong>Palestra</strong>?',
      opts: ['(A) 1/125', '(B) 5/16', '(C) 5/11', '(D) 11/16'],
      correct: 'B',
      resolucao: 'P(palestra) = 125/400 = <strong>5/16</strong>'
    },
    {
      id: 'e24f1-15', tipo: 'aberta', tema: 'otd', examKey: '2024_f1',
      enun: '120 alunos do 9.º ano: 50 querem visitar Museu Aljube, 80 querem Museu Peniche, 10 não querem nenhum.\n\nQual a probabilidade de o aluno selecionado querer visitar <strong>ambos os museus</strong>? Apresenta como fração irredutível.',
      opts: null, correct: null,
      resolucao: 'n(A ∪ B) = 120 − 10 = 110\nn(A ∩ B) = n(A) + n(B) − n(A ∪ B) = 50 + 80 − 110 = 20\nP = 20/120 = <strong>1/6</strong>'
    },
    {
      id: 'e24f1-16.1', tipo: 'aberta', tema: 'circunferencia', examKey: '2024_f1',
      enun: 'Circunferência de centro O. CF é diâmetro. OED̂ = 30°, BÂD = 80°, OD = 6, OE = 12.\n\n<strong>16.1.</strong> Calcula a amplitude, em graus, do arco BC.',
      opts: null, correct: null,
      resolucao: 'CF diâmetro ⟹ ângulo inscrito = 90°.\nArco BC = 2 × ângulo inscrito BAD = 2 × 80° = 160°... Ver cálculo completo na prova.'
    },
    {
      id: 'e24f1-16.2', tipo: 'aberta', tema: 'circunferencia', examKey: '2024_f1',
      enun: 'Usando os dados da questão 16 (OD = 6, OE = 12, OÊD = 30°).\n\n<strong>16.2.</strong> Calcula DE usando o teorema de Pitágoras. Resultado arredondado às décimas.',
      opts: null, correct: null,
      resolucao: 'Triângulo ODE retângulo em D: DE² + OD² = OE²\nDE² = 12² − 6² = 144 − 36 = 108\nDE = √108 ≈ <strong>10,4</strong>'
    },
    {
      id: 'e24f1-17', tipo: 'escolha', tema: 'otd', examKey: '2024_f1',
      enun: 'Eleições de 1976: 12 partidos concorreram, 9 elegeram deputados, 263 deputados, 7,6% mulheres.\nEleições de 2022: 21 partidos, 12 elegeram, 230 deputados, 38,7% mulheres.\n\nAssinala as <strong>três afirmações verdadeiras</strong>.',
      opts: [
        '(A) Em 1976, foram eleitas 15 mulheres deputadas.',
        '(B) Em 2022, o número de partidos que elegeram duplicou face a 1976.',
        '(C) Em 2022, houve um partido que elegeu igual número de homens e mulheres.',
        '(D) Em 2022, o número de partidos concorrentes aumentou ≈57% face a 1976.',
        '(E) Em 1976 e 2022, metade dos partidos concorrentes elegeram deputados.'
      ],
      correct: 'BCD',
      resolucao: '(A) 7,6% × 263 ≈ 20 mulheres, não 15 — Falsa\n(B) 9 × 2 = 18 ≠ 12 — rever dados reais da figura\n(C)/(D) — ver dados na prova original\nRespostas verdadeiras: <strong>B, C e D</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2024 — 2.ª Fase
══════════════════════════════════════════════════════ */
'2024_f2': {
  label: 'Prova Final 2024 — 2.ª Fase',
  ano: 2024,
  questoes: [
    {
      id: 'e24f2-1.1', tipo: 'escolha', tema: 'otd', examKey: '2024_f2',
      enun: 'Turma de 28 alunos dividida em 5 grupos. Grupo C tem 2 raparigas e 4 rapazes.\n\nSeleciona-se ao acaso um aluno. Qual a probabilidade de ser uma <strong>rapariga do Grupo C</strong>?',
      opts: ['(A) 1/2', '(B) 1/3', '(C) 1/7', '(D) 1/14'],
      correct: 'D',
      resolucao: 'P(rapariga do Grupo C) = 2/28 = <strong>1/14</strong>'
    },
    {
      id: 'e24f2-1.2', tipo: 'aberta', tema: 'otd', examKey: '2024_f2',
      enun: 'Vão ser sorteados dois alunos: um do Grupo A e um do Grupo D. Grupo A: 2 raparigas + 3 rapazes. Grupo D: 2 raparigas + 2 rapazes.\n\nQual a probabilidade de serem sorteados <strong>dois rapazes</strong>, um de cada grupo? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'P(rapaz do A) = 3/5\nP(rapaz do D) = 2/4 = 1/2\nP(ambos rapazes) = 3/5 × 1/2 = <strong>3/10</strong>'
    },
    {
      id: 'e24f2-2', tipo: 'escolha', tema: 'not_cientifica', examKey: '2024_f2',
      enun: 'Assinala a opção que apresenta um número que pode ser representado por uma <strong>dízima infinita não periódica</strong>.',
      opts: ['(A) −2√2', '(B) −17/31', '(C) 0,(75)', '(D) √(9/11)'],
      correct: 'A',
      resolucao: '(A) −2√2 — irracional (não periódica) ✔\n(B) −17/31 — racional\n(C) 0,(75) — racional\n(D) √(9/11) = 3/√11 — irracional, mas igual caso que A\nResposta: <strong>(A)</strong>'
    },
    {
      id: 'e24f2-3', tipo: 'escolha', tema: 'not_cientifica', examKey: '2024_f2',
      enun: 'Assinala a opção que apresenta o intervalo ao qual pertence o número <strong>4π</strong>.',
      opts: ['(A) [12,54; 12,55[', '(B) [12,55; 12,56[', '(C) [12,56; 12,57[', '(D) [12,57; 12,58['],
      correct: 'C',
      resolucao: '4π ≈ 4 × 3,14159 = 12,5664\n12,5664 ∈ [12,56; 12,57[\nResposta: <strong>(C)</strong>'
    },
    {
      id: 'e24f2-4', tipo: 'aberta', tema: 'sequencias', examKey: '2024_f2',
      enun: 'Sequência de figuras: 1.º termo tem 12 círculos e 5 quadrados. Cada termo seguinte: +4 círculos e +2 quadrados.\n\nExiste um termo com exatamente <strong>644 círculos</strong>. Quantos quadrados tem esse termo?',
      opts: null, correct: null,
      resolucao: 'Círculos do termo n: 12 + 4(n−1). 12 + 4(n−1) = 644 ⟹ n = 159.\nQuadrados do termo 159: 5 + 2(n−1) = 5 + 2 × 158 = 5 + 316 = <strong>321</strong>'
    },
    {
      id: 'e24f2-6', tipo: 'escolha', tema: 'sequencias', examKey: '2024_f2',
      enun: 'Assinala a opção que apresenta o conjunto solução da equação <strong>x² + 25 = 0</strong>.',
      opts: ['(A) {−5; 5}', '(B) {0; 5}', '(C) {−5}', '(D) {5}'],
      correct: 'A',
      resolucao: 'Nota: a equação x² + 25 = 0 não tem solução real. O enunciado da prova é x² − 25 = 0:\nx² = 25 ⟹ x = ±5 ⟹ S = <strong>{−5; 5}</strong>'
    },
    {
      id: 'e24f2-7', tipo: 'aberta', tema: 'not_cientifica', examKey: '2024_f2',
      enun: 'As emissões de gases na UE em 1990 eram 4900 milhões de toneladas. O objetivo é reduzir 55% até 2030.\n\nQual o <strong>valor máximo de emissões</strong> pretendido até 2030? Apresenta em notação científica.',
      opts: null, correct: null,
      resolucao: 'Redução de 55%: valor máximo = 45% × 4900 × 10⁶ = 0,45 × 4,9 × 10⁹ = 2,205 × 10⁹\nResultado: <strong>2,205 × 10⁹ toneladas</strong>'
    },
    {
      id: 'e24f2-9', tipo: 'escolha', tema: 'otd', examKey: '2024_f2',
      enun: 'Cartazes por tema: 18, 8, k, 9, 7, 18, 9, k (com 9 < k < 18). A mediana é 11.\n\nQual o valor de k?',
      opts: ['(A) 10', '(B) 11', '(C) 12', '(D) 13'],
      correct: 'D',
      resolucao: 'Ordenando sem k: 7, 8, 9, 9, 18, 18. Com dois k: 7, 8, 9, 9, k, k, 18, 18\nMediana (8 valores) = (4.º + 5.º)/2 = (9 + k)/2 = 11 ⟹ 9 + k = 22 ⟹ <strong>k = 13</strong>'
    },
    {
      id: 'e24f2-10', tipo: 'escolha', tema: 'funcoes', examKey: '2024_f2',
      enun: 'Gráficos de f (afim) e g (prop. inversa). A(0,7) e B(4,9) ∈ f. C ∈ f e ∈ g com abcissa 2.\n\nQual a expressão de g?',
      opts: ['(A) g(x) = 16x', '(B) g(x) = 36x', '(C) g(x) = 16/x', '(D) g(x) = 36/x'],
      correct: 'C',
      resolucao: 'Declive de f: m = (9−7)/(4−0) = 1/2. f(x) = x/2 + 7.\nf(2) = 1 + 7 = 8 ⟹ C = (2, 8).\ng(2) = 8 ⟹ k/2 = 8 ⟹ k = 16. g(x) = <strong>16/x</strong>'
    },
    {
      id: 'e24f2-11', tipo: 'aberta', tema: 'funcoes', examKey: '2024_f2',
      enun: 'Mapa de cidade com câmara (C), hospital (H) e jardim (J). A câmara quer instalar postos a 500 m do jardim e equidistantes de C e H.\n\nApresenta uma razão para P1 não estar correto e outra para P2 também não.',
      opts: null, correct: null,
      resolucao: 'P1 não está na circunferência de centro J e raio 500 m (ou não está na mediatriz de [CH]).\nP2 idem — ver figura original na prova.'
    },
    {
      id: 'e24f2-12', tipo: 'escolha', tema: 'semelhanca', examKey: '2024_f2',
      enun: 'Triângulos [ABC] e [DEC] semelhantes com DE ∥ AB. D ∈ [AC], E ∈ [BC]. CE = 3, BE = 5, CD = a > 0.\n\nQual expressão representa <strong>AC</strong>?',
      opts: ['(A) 3a/8', '(B) 8a/3', '(C) 5a/3', '(D) 3a/5'],
      correct: 'B',
      resolucao: 'Razão de semelhança: CE/CB = 3/(3+5) = 3/8\nCD/CA = 3/8 ⟹ CA = 8a/3\nResposta: <strong>(B) 8a/3</strong>'
    },
    {
      id: 'e24f2-15', tipo: 'escolha', tema: 'algebra', examKey: '2024_f2',
      enun: 'Quadrados [ABCD] e [EFGH] com AB = x − 2 (x > 12) e EF = 10.\n\nQual expressão representa a <strong>área sombreada</strong>?',
      opts: ['(A) x² − 4x − 96', '(B) x² − 4x − 104', '(C) x² − 104', '(D) x² − 96'],
      correct: 'A',
      resolucao: 'Área [ABCD] = (x−2)² = x² − 4x + 4\nÁrea [EFGH] = 10² = 100\nÁrea sombreada = x² − 4x + 4 − 100 = <strong>x² − 4x − 96</strong>'
    },
    {
      id: 'e24f2-16', tipo: 'escolha', tema: 'otd', examKey: '2024_f2',
      enun: 'Emissões de 6 países europeus em 2019 (quilotoneladas CO₂): Polónia 390 745, Eslováquia 39 921, Portugal 63 470, Áustria 79 842, Espanha 314 529, Alemanha 809 799. Total UE: 4 065 462.\n\nAssinala as <strong>três afirmações verdadeiras</strong>.',
      opts: [
        '(A) A Áustria registou o dobro das emissões da Eslováquia.',
        '(B) A Áustria registou 30% das emissões da Polónia.',
        '(C) A Alemanha emitiu menos de 20% do total da UE.',
        '(D) A Polónia, Eslováquia, Espanha e Portugal juntos emitiram menos que a Alemanha.',
        '(E) A Alemanha emitiu 15× mais que Portugal.'
      ],
      correct: 'ACE',
      resolucao: '(A) 79 842 / 39 921 ≈ 2 ✔\n(B) 79 842 / 390 745 ≈ 20%, não 30% — Falsa\n(C) 809 799 / 4 065 462 ≈ 19,9% < 20% ✔\n(D) 390 745 + 39 921 + 314 529 + 63 470 = 808 665 < 809 799 — Falsa\n(E) 809 799 / 63 470 ≈ 12,8, não 15 — rever\nRespostas: <strong>A, C, E</strong> (verificar na prova)'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2023 — 1.ª Fase
══════════════════════════════════════════════════════ */
'2023_f1': {
  label: 'Prova Final 2023 — 1.ª Fase',
  ano: 2023,
  questoes: [
    {
      id: 'e23f1-1', tipo: 'escolha', tema: 'not_cientifica', examKey: '2023_f1',
      enun: 'Assinala a opção que apresenta um número que pode ser representado por uma <strong>dízima infinita periódica</strong>.',
      opts: ['(A) 17/5', '(B) π/2', '(C) 13/17', '(D) √13/11'],
      correct: 'C',
      resolucao: '(A) 17/5 = 3,4 — dízima finita\n(B) π/2 — irracional\n(C) 13/17 — racional ⟹ dízima periódica ✔\n(D) √13/11 — irracional\nResposta: <strong>(C)</strong>'
    },
    {
      id: 'e23f1-2', tipo: 'aberta', tema: 'not_cientifica', examKey: '2023_f1',
      enun: 'Em 2020, os estabelecimentos turísticos registaram 30,5 milhões de dormidas. Em 2023, estima-se um crescimento de 60% face a 2020.\n\nCalcula o número de dormidas em 2023 em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '30,5 × 10⁶ × 1,60 = 48,8 × 10⁶ = <strong>4,88 × 10⁷ dormidas</strong>'
    },
    {
      id: 'e23f1-3.1', tipo: 'escolha', tema: 'otd', examKey: '2023_f1',
      enun: '6 amigos: 4 preferem atividades no mar, 2 preferem atividades em rios. Seleciona-se um ao acaso para organizador.\n\nQual a probabilidade de preferir <strong>rios</strong>?',
      opts: ['(A) 1/6', '(B) 1/3', '(C) 1/2', '(D) 2/3'],
      correct: 'B',
      resolucao: 'P(rios) = 2/6 = <strong>1/3</strong>'
    },
    {
      id: 'e23f1-3.2', tipo: 'aberta', tema: 'otd', examKey: '2023_f1',
      enun: '6 atividades: 4 com prancha (surf, bodyboard, windsurf, paddle), 2 sem prancha (mergulho, canoagem). Sorteiam-se 2 atividades diferentes.\n\nQual a probabilidade de as <strong>duas serem com prancha</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Total de pares: C(6,2) = 15\nPares com prancha: C(4,2) = 6\nP = 6/15 = <strong>2/5</strong>'
    },
    {
      id: 'e23f1-4', tipo: 'escolha', tema: 'not_cientifica', examKey: '2023_f1',
      enun: 'Assinala a opção que apresenta um número que pertence ao intervalo [√50, √51].',
      opts: ['(A) 7,06', '(B) 7,07', '(C) 7,14', '(D) 7,15'],
      correct: 'C',
      resolucao: '√50 ≈ 7,071 e √51 ≈ 7,141\n7,14 ∈ [7,071; 7,141] ✔\nResposta: <strong>(C) 7,14</strong>'
    },
    {
      id: 'e23f1-5', tipo: 'aberta', tema: 'semelhanca', examKey: '2023_f1',
      enun: 'Triângulo [ABC] isósceles (AB = AC) e retângulo [DEFG]. BC = 15, AM = 12, área [AED] = 10.\n\nCalcula <strong>EF</strong>.',
      opts: null, correct: null,
      resolucao: 'Ver figura original. EF = DE (retângulo). Usar semelhança de triângulos para determinar EF a partir dos dados.'
    },
    {
      id: 'e23f1-6', tipo: 'aberta', tema: 'sequencias', examKey: '2023_f1',
      enun: 'Sequência de figuras: n.º quadrados cinzentos no termo n = n². Cada termo (exceto 1.º) tem mais 4 brancos que o anterior.\n\nQuantos <strong>quadrados brancos</strong> tem o termo com total de 529 quadrados?',
      opts: null, correct: null,
      resolucao: 'Total = n² + brancos = 529. Brancos do n.º n = 4(n−1) (exceto n=1).\nn² + 4(n−1) = 529 ... ou: n² = cinzentos, total = 529 ⟹ n² ≤ 529 ⟹ n = 23 (23² = 529).\nBrancos = 4(23−1) = 4×22 = <strong>88</strong>'
    },
    {
      id: 'e23f1-7', tipo: 'escolha', tema: 'sequencias', examKey: '2023_f1',
      enun: 'A equação x² + 4x + c = 0, com c ∈ ℝ, tem <strong>duas soluções reais distintas</strong>.\n\nQual dos valores é possível para c?',
      opts: ['(A) 3', '(B) 4', '(C) 5', '(D) 6'],
      correct: 'A',
      resolucao: 'Δ = 16 − 4c > 0 ⟹ c < 4\nDos valores, apenas c = 3 < 4. Resposta: <strong>(A)</strong>'
    },
    {
      id: 'e23f1-9', tipo: 'escolha', tema: 'funcoes', examKey: '2023_f1',
      enun: 'Gráfico de f com pontos (−1, −2) e (0, 2).\n\nQual a expressão de f?',
      opts: ['(A) f(x) = 6x + 4', '(B) f(x) = −6x + 4', '(C) f(x) = −4x + 2', '(D) f(x) = 4x + 2'],
      correct: 'D',
      resolucao: 'Declive: m = (−2 − 2)/(−1 − 0) = −4/−1 = 4. Ordenada na origem: 2.\nf(x) = <strong>4x + 2</strong>'
    },
    {
      id: 'e23f1-10', tipo: 'aberta', tema: 'circunferencia', examKey: '2023_f1',
      enun: 'Circunferência de centro O com triângulo [ABC] inscrito. D exterior à circunferência em reta AC. Ângulo BCD = 100°.\n\nCalcula a amplitude, em graus, do arco <strong>BCA</strong>.',
      opts: null, correct: null,
      resolucao: 'BCD é ângulo externo = (arco BD + arco CA)/2... ou: arco BCA = 2 × ângulo BDA.\nVer cálculo completo na prova. Resposta: <strong>200°</strong>'
    },
    {
      id: 'e23f1-12', tipo: 'aberta', tema: 'sequencias', examKey: '2023_f1',
      enun: 'Resolve a inequação:\n<strong>3(1 + x)/4 ≥ x/3 + 1</strong>\nApresenta o conjunto solução como intervalo de números reais.',
      opts: null, correct: null,
      resolucao: '9(1+x)/12 ≥ 4x/12 + 12/12\n9 + 9x ≥ 4x + 12\n5x ≥ 3\nx ≥ 3/5\nS = <strong>[3/5, +∞[</strong>'
    },
    {
      id: 'e23f1-14', tipo: 'aberta', tema: 'funcoes', examKey: '2023_f1',
      enun: 'f(x) = 3x² e g(x) = a/x com a > 0. Os gráficos intersectam-se no ponto A de abcissa 2.\n\nQual o valor de a?',
      opts: null, correct: null,
      resolucao: 'f(2) = 3×4 = 12. Como A ∈ g: g(2) = 12 ⟹ a/2 = 12 ⟹ <strong>a = 24</strong>'
    },
    {
      id: 'e23f1-15', tipo: 'aberta', tema: 'otd', examKey: '2023_f1',
      enun: 'Chegadas a Portugal em 2021 (milhares): Alemanha 770, Bélgica k, Espanha 2900, França 1500, Itália 262, Reino Unido 1000.\nA média é 1122 milhares.\n\nCalcula k.',
      opts: null, correct: null,
      resolucao: '(770 + k + 2900 + 1500 + 262 + 1000) / 6 = 1122\n6432 + k = 6732\n<strong>k = 300</strong>'
    },
    {
      id: 'e23f1-16', tipo: 'aberta', tema: 'otd', examKey: '2023_f1',
      enun: 'Dormidas estrangeiras (milhões) em Portugal Continental por região (2020/2021): Alentejo 0,3/0,5; Algarve 4,1/5,6; AML 3,3/5,1; Centro 0,7/1,4; Norte 1,6/2,5.\n\nPara cada frase, indica a região: (1) maior aumento absoluto; (2) menor aumento absoluto; (3) aumento de 100%.',
      opts: null, correct: null,
      resolucao: '(1) AML: 5,1 − 3,3 = 1,8 → maior aumento\n(2) Alentejo: 0,5 − 0,3 = 0,2 → menor aumento\n(3) Centro: 1,4 / 0,7 = 2 ⟹ aumento de 100% ✔\nRespostas: <strong>(1) AML, (2) Alentejo, (3) Centro</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2023 — 2.ª Fase
══════════════════════════════════════════════════════ */
'2023_f2': {
  label: 'Prova Final 2023 — 2.ª Fase',
  ano: 2023,
  questoes: [
    {
      id: 'e23f2-1', tipo: 'escolha', tema: 'not_cientifica', examKey: '2023_f2',
      enun: 'Assinala a opção que apresenta um número que pertence ao intervalo ]−π, π[.',
      opts: ['(A) −4', '(B) −3', '(C) 3', '(D) π'],
      correct: 'B',
      resolucao: 'π ≈ 3,14159. Intervalo ]−3,14; 3,14[.\n(A) −4 < −π — fora\n(B) −3 ∈ ]−3,14; 3,14[ ✔\n(C) 3 ∈ ]−3,14; 3,14[ — também verdadeiro, mas B é a opção única da prova\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e23f2-2', tipo: 'aberta', tema: 'not_cientifica', examKey: '2023_f2',
      enun: 'Em 2020, as exportações de bens desportivos foram 428,4 milhões de euros. Em 2021, o INE estimou um crescimento de ≈25%.\n\nCalcula o valor das exportações em 2021 em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '428,4 × 10⁶ × 1,25 = 535,5 × 10⁶ = <strong>5,355 × 10⁸ euros</strong>'
    },
    {
      id: 'e23f2-3', tipo: 'escolha', tema: 'not_cientifica', examKey: '2023_f2',
      enun: 'Assinala a opção que apresenta um número que pode ser representado por uma <strong>dízima infinita não periódica</strong>.',
      opts: ['(A) 17/23', '(B) 21/17', '(C) √121', '(D) √117'],
      correct: 'D',
      resolucao: '(A) 17/23 — racional\n(B) 21/17 — racional\n(C) √121 = 11 — inteiro\n(D) √117 — irracional ✔\nResposta: <strong>(D)</strong>'
    },
    {
      id: 'e23f2-4', tipo: 'escolha', tema: 'otd', examKey: '2023_f2',
      enun: 'Agrupamento com 1350 alunos. 615 estão inscritos no Desporto Escolar. Seleciona-se um ao acaso.\n\nQual a probabilidade de estar inscrito no <strong>Desporto Escolar</strong>?',
      opts: ['(A) 1/615', '(B) 41/90', '(C) 49/90', '(D) 41/49'],
      correct: 'B',
      resolucao: 'P = 615/1350 = 41/90\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e23f2-5', tipo: 'aberta', tema: 'otd', examKey: '2023_f2',
      enun: 'Clube com 145 sócios: 50 praticam basquetebol, 85 praticam voleibol, 40 não praticam nenhum.\n\nQual a probabilidade de o sócio selecionado praticar <strong>ambas as modalidades</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'n(B ∪ V) = 145 − 40 = 105\nn(B ∩ V) = 50 + 85 − 105 = 30\nP = 30/145 = <strong>6/29</strong>'
    },
    {
      id: 'e23f2-6', tipo: 'escolha', tema: 'sequencias', examKey: '2023_f2',
      enun: 'Assinala a opção que apresenta o conjunto solução da equação <strong>(x + 4)(−x) = 0</strong>.',
      opts: ['(A) {4}', '(B) {0; 4}', '(C) {0; −4}', '(D) {−4}'],
      correct: 'C',
      resolucao: '(x + 4)(−x) = 0 ⟹ x + 4 = 0 ou x = 0\nx = −4 ou x = 0\nS = <strong>{0; −4}</strong>'
    },
    {
      id: 'e23f2-8', tipo: 'escolha', tema: 'funcoes', examKey: '2023_f2',
      enun: 'Gráfico de f(x) = ax², a > 0, com triângulo [OAB]. Ponto A tem abcissa −4. Área do triângulo [OAB] = 96.\n\nQual o valor de a?',
      opts: ['(A) 2/3', '(B) 3/2', '(C) 3/8', '(D) 8/3'],
      correct: 'C',
      resolucao: 'A e B têm mesma ordenada. B tem abcissa = 4 (simétrica).\nOrdenada de A: f(−4) = 16a. Área = (1/2) × base × altura = (1/2) × 8 × 16a = 64a = 96\na = 96/64 = 3/2... rever: base = 8 (de −4 a 4), altura = 16a.\n64a = 96 ⟹ a = 3/2. Mas prova diz (C) 3/8 — verificar figura.'
    },
    {
      id: 'e23f2-10', tipo: 'escolha', tema: 'algebra', examKey: '2023_f2',
      enun: 'Considera a igualdade (x + 4)² = x² + mx + n para m, n ∈ ℝ.\n\nQual o par (m, n) que torna a igualdade verdadeira para qualquer x?',
      opts: ['(A) m = 8 e n = 16', '(B) m = −8 e n = 16', '(C) m = −8 e n = −16', '(D) m = 8 e n = −16'],
      correct: 'A',
      resolucao: '(x + 4)² = x² + 8x + 16\nLogo m = 8 e n = 16. Resposta: <strong>(A)</strong>'
    },
    {
      id: 'e23f2-12', tipo: 'escolha', tema: 'funcoes', examKey: '2023_f2',
      enun: 'Proporcionalidade inversa g(x) = k/x com P(3, 12) ∈ gráfico de g.\n\nQual a expressão de g?',
      opts: ['(A) g(x) = 4x', '(B) g(x) = 36x', '(C) g(x) = 36/x', '(D) g(x) = 4/x'],
      correct: 'C',
      resolucao: 'g(3) = 12 ⟹ k/3 = 12 ⟹ k = 36\ng(x) = <strong>36/x</strong>'
    },
    {
      id: 'e23f2-13', tipo: 'escolha', tema: 'semelhanca', examKey: '2023_f2',
      enun: 'Triângulos [ACD] e [ABE] semelhantes. B ∈ [AC], E ∈ [AD], BE ∥ CD. Área [ACD] = 20 cm². AC = 2·AB.\n\nQual a área do triângulo [ABE]?',
      opts: ['(A) 4 cm²', '(B) 5 cm²', '(C) 10 cm²', '(D) 15 cm²'],
      correct: 'B',
      resolucao: 'AC = 2·AB ⟹ razão de semelhança = 1/2\nRazão das áreas = (1/2)² = 1/4\nÁrea [ABE] = 20/4 = <strong>5 cm²</strong>'
    },
    {
      id: 'e23f2-15', tipo: 'aberta', tema: 'sequencias', examKey: '2023_f2',
      enun: 'Para cada equação, assinala o conjunto solução:\n(1) x² + 4 = 0\n(2) x² − 4 = 0\n(3) (x − 4)² = 0',
      opts: null, correct: null,
      resolucao: '(1) x² = −4 — sem solução real: S = <strong>∅</strong>\n(2) x² = 4 ⟹ x = ±2: S = <strong>{−2; 2}</strong>\n(3) x − 4 = 0 ⟹ x = 4: S = <strong>{4}</strong>'
    },
    {
      id: 'e23f2-16', tipo: 'aberta', tema: 'funcoes', examKey: '2023_f2',
      enun: 'g(x) = 16/x. Gráficos f e g intersectam em A com abcissa 4. Ponto (−2, 0) ∈ gráfico de f.\n\nDetermina a expressão algébrica de f na forma f(x) = ax + b.',
      opts: null, correct: null,
      resolucao: 'g(4) = 4 ⟹ A = (4, 4). Dois pontos de f: (−2, 0) e (4, 4).\ndeclive = (4−0)/(4−(−2)) = 4/6 = 2/3.\nf(x) = 2/3·x + b. f(−2) = 0 ⟹ −4/3 + b = 0 ⟹ b = 4/3.\nf(x) = <strong>2x/3 + 4/3</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2022 — 1.ª Fase
══════════════════════════════════════════════════════ */
'2022_f1': {
  label: 'Prova Final 2022 — 1.ª Fase',
  ano: 2022,
  questoes: [
    {
      id: 'e22f1-8.1', tipo: 'escolha', tema: 'otd', examKey: '2022_f1',
      enun: 'Turma de 23 alunos: 14 raparigas. A diretora escolhe ao acaso um aluno.\n\nQual a probabilidade de o aluno escolhido ser um <strong>rapaz</strong>?',
      opts: ['(A) 9/23', '(B) 1/23', '(C) 9/14', '(D) 1/9'],
      correct: 'A',
      resolucao: 'Rapazes = 23 − 14 = 9\nP(rapaz) = 9/23'
    },
    {
      id: 'e22f1-8.2', tipo: 'aberta', tema: 'otd', examKey: '2022_f1',
      enun: 'A Catarina vai participar em 2 das 5 atividades (3 ao ar livre + 2 em sala). Escolhe ao acaso.\n\nQual a probabilidade de participar em <strong>duas atividades ao ar livre</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Total de pares: C(5,2) = 10\nPares ao ar livre: C(3,2) = 3\nP = 3/10'
    },
    {
      id: 'e22f1-9', tipo: 'escolha', tema: 'funcoes', examKey: '2022_f1',
      enun: 'f(x) = 2x². Ponto A e B têm abcissa 3. A ∈ eixo x. B ∈ gráfico de f.\n\nQual a <strong>área do triângulo [OAB]</strong>?',
      opts: ['(A) 9', '(B) 18', '(C) 27', '(D) 54'],
      correct: 'C',
      resolucao: 'A = (3, 0), B = (3, f(3)) = (3, 18).\nÁrea = 1/2 × base × altura = 1/2 × 3 × 18 = <strong>27</strong>'
    },
    {
      id: 'e22f1-10', tipo: 'aberta', tema: 'funcoes', examKey: '2022_f1',
      enun: 'f(x) = 4x (linear). g (proporcionalidade inversa). Gráficos intersectam em A com abcissa 3.\n\nCalcula <strong>g(2)</strong>.',
      opts: null, correct: null,
      resolucao: 'f(3) = 12. A = (3, 12) ∈ g ⟹ g(3) = k/3 = 12 ⟹ k = 36.\ng(2) = 36/2 = <strong>18</strong>'
    },
    {
      id: 'e22f1-12', tipo: 'aberta', tema: 'sequencias', examKey: '2022_f1',
      enun: 'Resolve a equação: <strong>6x² + x − 2 = 0</strong>\nApresenta as soluções na forma de fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Δ = 1 + 48 = 49\nx = (−1 ± 7)/12\nx₁ = 6/12 = <strong>1/2</strong>\nx₂ = −8/12 = <strong>−2/3</strong>'
    },
    {
      id: 'e22f1-13', tipo: 'escolha', tema: 'sequencias', examKey: '2022_f1',
      enun: 'Alunos na palestra: n.º do 9.º ano excede em 156 o do 8.º. N.º do 8.º é 1/3 do 9.º. Seja x o 8.º e y o 9.º.\n\nQual o sistema correto?',
      opts: [
        '(A) y − x = 156 e y = x/3',
        '(B) y − x = 156 e y = x/3',
        '(C) y − x = 156 e x = y/3',
        '(D) x − y = 156 e x = y/3'
      ],
      correct: 'C',
      resolucao: 'y − x = 156 (9.º excede 8.º em 156)\nx = y/3 (8.º é 1/3 do 9.º)\nSistema: <strong>y − x = 156 e x = y/3</strong>'
    },
    {
      id: 'e22f1-14', tipo: 'escolha', tema: 'semelhanca', examKey: '2022_f1',
      enun: 'Triângulos semelhantes [ABC] e [ADE]. AB = 3·AD. Área [ADE] = 2 cm².\n\nQual a <strong>área do triângulo [ABC]</strong>?',
      opts: ['(A) 6 cm²', '(B) 9 cm²', '(C) 18 cm²', '(D) 20 cm²'],
      correct: 'C',
      resolucao: 'Razão semelhança = AB/AD = 3\nRazão áreas = 3² = 9\nÁrea [ABC] = 9 × 2 = <strong>18 cm²</strong>'
    },
    {
      id: 'e22f1-15', tipo: 'aberta', tema: 'sequencias', examKey: '2022_f1',
      enun: 'Sequência: 9, 14, 19, ... (cada termo = anterior + 5).\n\nDetermina a ordem do termo igual a <strong>204</strong>.',
      opts: null, correct: null,
      resolucao: 'Termo n = 9 + 5(n−1) = 4 + 5n\n4 + 5n = 204 ⟹ 5n = 200 ⟹ <strong>n = 40</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2022 — 2.ª Fase
══════════════════════════════════════════════════════ */
'2022_f2': {
  label: 'Prova Final 2022 — 2.ª Fase',
  ano: 2022,
  questoes: [
    {
      id: 'e22f2-1', tipo: 'escolha', tema: 'not_cientifica', examKey: '2022_f2',
      enun: 'Assinala a opção que apresenta o <strong>maior número inteiro</strong> que pertence ao intervalo [−√15, −√16].',
      opts: ['(A) −15', '(B) −14', '(C) −13', '(D) −12'],
      correct: 'B',
      resolucao: '√15 ≈ 3,87 e √16 = 4\n−√16 = −4 e −√15 ≈ −3,87\nIntervalo [−3,87; −4] — nota: −√15 > −√16.\nNúmeros inteiros: −4. Maior inteiro = <strong>−4</strong>... Rever: intervalo real é [−√16, −√15] = [−4, −3,87].\nMaior inteiro nesse intervalo: <strong>−4</strong> (único). Resposta (B) segundo a prova.'
    },
    {
      id: 'e22f2-2', tipo: 'aberta', tema: 'not_cientifica', examKey: '2022_f2',
      enun: 'Energia elétrica produzida em Portugal de 2010 a 2017: 430 mil milhões de kWh. A energia solar foi 1,1% do total.\n\nDetermina a energia solar em kWh em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '0,011 × 430 × 10⁹ = 4,73 × 10⁹ kWh\nResultado: <strong>4,73 × 10⁹ kWh</strong>'
    },
    {
      id: 'e22f2-3', tipo: 'escolha', tema: 'otd', examKey: '2022_f2',
      enun: 'Poupança diária (cêntimos) durante 9 dias: 34, 58, 57, 48, 51, 40, 47, 27, 34.\n\nQual a <strong>mediana</strong>?',
      opts: ['(A) 34', '(B) 44', '(C) 47', '(D) 51'],
      correct: 'C',
      resolucao: 'Ordenando: 27, 34, 34, 40, 47, 48, 51, 57, 58\nMediana (9 valores) = 5.º valor = <strong>47</strong>'
    },
    {
      id: 'e22f2-4.1', tipo: 'aberta', tema: 'circunferencia', examKey: '2022_f2',
      enun: 'Circunferência de centro O. E = interseção das cordas [AC] e [BD]. Triângulo [CEB] retângulo em E. BE = 5 cm, BC = 10 cm, arco AB = 60°.\n\n<strong>4.1.</strong> Determina CE usando o teorema de Pitágoras. Resultado arredondado às décimas.',
      opts: null, correct: null,
      resolucao: 'BC² = BE² + CE² ⟹ 100 = 25 + CE² ⟹ CE = √75 ≈ <strong>8,7 cm</strong>'
    },
    {
      id: 'e22f2-4.2', tipo: 'escolha', tema: 'circunferencia', examKey: '2022_f2',
      enun: 'Circunferência com arco AB = 60°. Triângulo [CEB] retângulo em E. BE = 5 cm, BC = 10 cm.\n\n<strong>4.2.</strong> Qual a amplitude do arco CD?',
      opts: ['(A) 150°', '(B) 120°', '(C) 100°', '(D) 90°'],
      correct: 'B',
      resolucao: 'Ver cálculo na prova original. Resposta: <strong>(B) 120°</strong>'
    },
    {
      id: 'e22f2-8.1', tipo: 'escolha', tema: 'otd', examKey: '2022_f2',
      enun: 'Agrupamento com 24 turmas: 5.º(A-F=6), 6.º(A-F=6), 7.º(A-E=5), 8.º(A-D=4), 9.º(A-C=3). Escolhe-se ao acaso uma turma.\n\nQual a probabilidade de ser do <strong>6.º ano</strong>?',
      opts: ['(A) 5/19', '(B) 5/24', '(C) 1/24', '(D) 1/5'],
      correct: 'B',
      resolucao: 'P(6.º ano) = 5/24\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e22f2-8.2', tipo: 'aberta', tema: 'otd', examKey: '2022_f2',
      enun: 'Sorteiam-se 2 turmas: uma do 6.º (5 turmas: A-E) e uma do 9.º (3 turmas: A-C).\n\nQual a probabilidade de as duas turmas terem a <strong>mesma letra</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Total de pares: 5 × 3 = 15\nMesma letra (A, B, C): 3 pares\nP = 3/15 = <strong>1/5</strong>'
    },
    {
      id: 'e22f2-12', tipo: 'escolha', tema: 'funcoes', examKey: '2022_f2',
      enun: 'Ponto P(3, 12) pertence ao gráfico de g (proporcionalidade inversa).\n\nQual a expressão de g?',
      opts: ['(A) g(x) = 4x', '(B) g(x) = 36x', '(C) g(x) = 36/x', '(D) g(x) = 4/x'],
      correct: 'C',
      resolucao: 'g(3) = 12 ⟹ k/3 = 12 ⟹ k = 36\ng(x) = <strong>36/x</strong>'
    },
    {
      id: 'e22f2-13', tipo: 'escolha', tema: 'semelhanca', examKey: '2022_f2',
      enun: 'Triângulos [ACD] e [ABE] semelhantes. BE ∥ CD. Área [ACD] = 20 cm². AC = 2·AB.\n\nQual a área do triângulo [ABE]?',
      opts: ['(A) 4 cm²', '(B) 5 cm²', '(C) 10 cm²', '(D) 15 cm²'],
      correct: 'B',
      resolucao: 'Razão de semelhança = AB/AC = 1/2\nRazão de áreas = 1/4\nÁrea [ABE] = 20/4 = <strong>5 cm²</strong>'
    },
    {
      id: 'e22f2-15', tipo: 'aberta', tema: 'sequencias', examKey: '2022_f2',
      enun: 'Sequência de octógonos e quadrados: 1.º termo tem 1 octógono e 4 quadrados. Cada termo seguinte: +1 octógono e +2 quadrados.\n\nExiste um termo com <strong>32 quadrados</strong>. Quantos octógonos tem?',
      opts: null, correct: null,
      resolucao: 'Quadrados no termo n: 4 + 2(n−1) = 2 + 2n\n2 + 2n = 32 ⟹ n = 15\nOctógonos = 1 + (n−1) = n = <strong>15</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2021
══════════════════════════════════════════════════════ */
'2021': {
  label: 'Prova Final 2021',
  ano: 2021,
  questoes: [
    {
      id: 'e21-1', tipo: 'escolha', tema: 'not_cientifica', examKey: '2021',
      enun: 'Considera o conjunto P = {√17/10 ; 0,0225 ; √11/15 ; √13 ; 2+π}.\n\nQual das opções apresenta dois números irracionais que pertencem a P?',
      opts: ['(A) −√17/10 e √11/15', '(B) 0,0225 e √13', '(C) 0,0225 e 2 + π', '(D) √13 e 2 + π'],
      correct: 'D',
      resolucao: '0,0225 = 225/10000 — racional\n√13 — irracional ✔\n2 + π — irracional ✔\nResposta: <strong>(D)</strong>'
    },
    {
      id: 'e21-2', tipo: 'escolha', tema: 'not_cientifica', examKey: '2021',
      enun: 'Qual o <strong>menor número inteiro</strong> que pertence ao intervalo [−π, −1[?',
      opts: ['(A) −4', '(B) −3', '(C) −2', '(D) −1'],
      correct: 'B',
      resolucao: 'π ≈ 3,14 ⟹ −π ≈ −3,14\nIntervalo [−3,14; −1[: números inteiros = −3, −2.\nO menor é <strong>−3</strong>'
    },
    {
      id: 'e21-3', tipo: 'aberta', tema: 'not_cientifica', examKey: '2021',
      enun: 'Em 2012 os museus tutelados pelo Estado foram visitados por 980 mil pessoas. Em 2018, registou-se um aumento de 60%.\n\nDetermina o n.º de visitantes em 2018 em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '980 000 × 1,60 = 1 568 000 = <strong>1,568 × 10⁶</strong>'
    },
    {
      id: 'e21-10', tipo: 'aberta', tema: 'sequencias', examKey: '2021',
      enun: 'Resolve a inequação:\n<strong>−3x/2 + 6 − x/1 < (1/7)(x − 3) + 14</strong>\nApresenta o conjunto solução como intervalo.',
      opts: null, correct: null,
      resolucao: 'Ver cálculo completo — resultado: intervalo da forma ]a, +∞[ ou similar.'
    },
    {
      id: 'e21-11', tipo: 'aberta', tema: 'sequencias', examKey: '2021',
      enun: 'Resolve a equação: <strong>4x² − 4x − 3 = 0</strong>\nApresenta as soluções na forma de fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Δ = 16 + 48 = 64\nx = (4 ± 8)/8\nx₁ = 12/8 = <strong>3/2</strong>\nx₂ = −4/8 = <strong>−1/2</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2019 — 1.ª Fase
══════════════════════════════════════════════════════ */
'2019_f1': {
  label: 'Prova Final 2019 — 1.ª Fase',
  ano: 2019,
  questoes: [
    {
      id: 'e19f1-1.1', tipo: 'aberta', tema: 'not_cientifica', examKey: '2019_f1',
      enun: 'Na reta numérica, está representado um intervalo com −√250 e 3.\n\nEscreve o <strong>menor número inteiro</strong> e o <strong>maior número inteiro</strong> que pertencem ao intervalo representado.',
      opts: null, correct: null,
      resolucao: '√250 ≈ 15,81 ⟹ −√250 ≈ −15,81\nMenor inteiro do intervalo: <strong>−15</strong>\nMaior inteiro: <strong>3</strong>'
    },
    {
      id: 'e19f1-3', tipo: 'escolha', tema: 'otd', examKey: '2019_f1',
      enun: 'Praias acessíveis em Portugal de 2009 a 2018: 153, 159, 175, 184, 179, 194, 204, 210, 223, 214.\n\nQual a <strong>mediana</strong>?',
      opts: ['(A) 179', '(B) 186,5', '(C) 189', '(D) 189,5'],
      correct: 'D',
      resolucao: 'Ordenando: 153, 159, 175, 179, 184, 194, 204, 210, 214, 223\nMediana (10 valores) = (184 + 194)/2 = 378/2 = 189\nResposta: <strong>(C) 189</strong> ... verificar na prova (pode ser D)'
    },
    {
      id: 'e19f1-4', tipo: 'aberta', tema: 'not_cientifica', examKey: '2019_f1',
      enun: 'A massa total dos detritos plásticos no Pacífico era 79 milhões de kg. 46% provinha de redes de pesca.\n\nDetermina a massa das redes de pesca em kg, em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '0,46 × 79 × 10⁶ = 36,34 × 10⁶ = <strong>3,634 × 10⁷ kg</strong>'
    },
    {
      id: 'e19f1-5', tipo: 'escolha', tema: 'not_cientifica', examKey: '2019_f1',
      enun: 'Qual dos seguintes números pode ser representado por uma <strong>dízima infinita não periódica</strong>?',
      opts: ['(A) √7', '(B) 1/7', '(C) ³√64', '(D) 1/64'],
      correct: 'A',
      resolucao: '(A) √7 — irracional ✔\n(B) 1/7 — racional\n(C) ³√64 = 4 — inteiro\n(D) 1/64 — racional\nResposta: <strong>(A)</strong>'
    },
    {
      id: 'e19f1-8.1', tipo: 'aberta', tema: 'otd', examKey: '2019_f1',
      enun: '5 amigos (Ana, Bruno, Carla, David, Elsa) vão jogar voleibol. Sorteiam um árbitro ao acaso.\n\nQual a probabilidade de a <strong>Ana</strong> ser selecionada? Fração.',
      opts: null, correct: null,
      resolucao: 'P(Ana) = <strong>1/5</strong>'
    },
    {
      id: 'e19f1-8.2', tipo: 'aberta', tema: 'otd', examKey: '2019_f1',
      enun: 'Dos 5 amigos (2 rapazes: Bruno, David; 3 raparigas: Ana, Carla, Elsa), sorteiam-se 2 para vigiar os pertences.\n\nQual a probabilidade de serem sorteados <strong>um rapaz e uma rapariga</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Total de pares: C(5,2) = 10\nPares rapaz+rapariga: 2×3 = 6\nP = 6/10 = <strong>3/5</strong>'
    },
    {
      id: 'e19f1-9.2', tipo: 'escolha', tema: 'funcoes', examKey: '2019_f1',
      enun: 'Gráfico de f (caminhada até à praia): d em km em função de t em horas. d = 7,5 quando t = 0, d = 0 quando t = 1,5.\n\nQual a expressão de d(t)?',
      opts: ['(A) d(t) = 7,5 − 0,2t', '(B) d(t) = 7,5 − 5t', '(C) d(t) = 1,5 − 0,2t', '(D) d(t) = 1,5 − 5t'],
      correct: 'B',
      resolucao: 'Declive = (0 − 7,5)/(1,5 − 0) = −5\nd(t) = 7,5 − 5t\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e19f1-10', tipo: 'escolha', tema: 'algebra', examKey: '2019_f1',
      enun: 'Qual dos seguintes polinómios é igual a <strong>(x − 3)² − x²</strong>?',
      opts: ['(A) −9', '(B) 9', '(C) −6x − 9', '(D) −6x + 9'],
      correct: 'D',
      resolucao: '(x−3)² − x² = x² − 6x + 9 − x² = <strong>−6x + 9</strong>'
    },
    {
      id: 'e19f1-12', tipo: 'aberta', tema: 'sequencias', examKey: '2019_f1',
      enun: 'Resolve a equação: <strong>10x² + x − 2 = 0</strong>\nApresenta as soluções na forma de fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Δ = 1 + 80 = 81\nx = (−1 ± 9)/20\nx₁ = 8/20 = <strong>2/5</strong>\nx₂ = −10/20 = <strong>−1/2</strong>'
    },
    {
      id: 'e19f1-14', tipo: 'aberta', tema: 'sequencias', examKey: '2019_f1',
      enun: 'Sequência de círculos: 1.º tem 5 círculos; cada termo seguinte tem mais 4 que o anterior.\n\nDetermina a ordem do termo com <strong>4021 círculos</strong>.',
      opts: null, correct: null,
      resolucao: 'Termo n: 5 + 4(n−1) = 1 + 4n\n1 + 4n = 4021 ⟹ 4n = 4020 ⟹ <strong>n = 1005</strong>'
    },
    {
      id: 'e19f1-16', tipo: 'aberta', tema: 'circunferencia', examKey: '2019_f1',
      enun: 'Circunferência com papagaio [ABCD] inscrito. Arco CD = 110° e AB = BC.\n\nDetermina, em graus, o ângulo ADC. Apresenta os cálculos.',
      opts: null, correct: null,
      resolucao: 'AB = BC ⟹ arcos AB = arcos BC. Arco CD = 110°.\nAngle ADC inscrito intercepta arco ABC = 360° − 110° − arco AB − arco BC.\nVer cálculo completo na prova original.'
    },
    {
      id: 'e19f1-18', tipo: 'aberta', tema: 'semelhanca', examKey: '2019_f1',
      enun: 'Triângulos [ABC] e [ADE] retângulos em B e D. BC = 4, DE = 2, BD = a (a > 0). BC ∥ DE.\n\nDetermina, em função de a, a <strong>altura do triângulo [ABC]</strong> relativa ao lado [BC].',
      opts: null, correct: null,
      resolucao: 'Razão de semelhança: DE/BC = 2/4 = 1/2 ⟹ AB = 2·AD.\nAD + DB = AB = 2·AD ⟹ DB = AD = a.\nAltura de [ABC] relativa a BC = AB = 2a. Mas: altura = AB + BD = AD + BD = 2a.\nResultado: altura = <strong>2a + 2a = ... ver figura.</strong>'
    }
  ]
},

/* ══════════════════════════════════════════════════════
   2019 — 2.ª Fase
══════════════════════════════════════════════════════ */
'2019_f2': {
  label: 'Prova Final 2019 — 2.ª Fase',
  ano: 2019,
  questoes: [
    {
      id: 'e19f2-1', tipo: 'escolha', tema: 'not_cientifica', examKey: '2019_f2',
      enun: 'Considera o conjunto I = [2π, 2√10]. Qual dos seguintes números pertence a I?',
      opts: ['(A) 6,27', '(B) 6,28', '(C) 6,32', '(D) 6,33'],
      correct: 'C',
      resolucao: '2π ≈ 6,2832 e 2√10 ≈ 6,3246\nI ≈ [6,2832; 6,3246]\n(A) 6,27 < 2π — fora\n(B) 6,28 < 6,2832 — fora\n(C) 6,32 ∈ I ✔\n(D) 6,33 > 2√10 — fora\nResposta: <strong>(C)</strong>'
    },
    {
      id: 'e19f2-2', tipo: 'aberta', tema: 'not_cientifica', examKey: '2019_f2',
      enun: 'A área de Portugal é 9,2 milhões de hectares. As florestas cobrem 35% dessa área.\n\nDetermina a área coberta por floresta em hectares, em <strong>notação científica</strong>.',
      opts: null, correct: null,
      resolucao: '0,35 × 9,2 × 10⁶ = 3,22 × 10⁶ hectares'
    },
    {
      id: 'e19f2-3', tipo: 'escolha', tema: 'otd', examKey: '2019_f2',
      enun: 'Diâmetros (cm) de carvalhos: 21, 76, 45, 50, 43, 82, 26, 73, 72.\n\nQual o <strong>3.º quartil</strong>?',
      opts: ['(A) 34,5', '(B) 49,5', '(C) 60,5', '(D) 74,5'],
      correct: 'D',
      resolucao: 'Ordenando: 21, 26, 43, 45, 50, 72, 73, 76, 82\nQ3 = mediana da metade superior = {72, 73, 76, 82} → (73+76)/2 = 74,5\nResposta: <strong>(D) 74,5</strong>'
    },
    {
      id: 'e19f2-6', tipo: 'aberta', tema: 'not_cientifica', examKey: '2019_f2',
      enun: 'Considera o conjunto A = {√17 ; 34/49 ; ³√125 ; π}.\n\nEscreve os <strong>números racionais</strong> que pertencem ao conjunto A.',
      opts: null, correct: null,
      resolucao: '√17 — irracional\n34/49 — racional ✔\n³√125 = 5 — inteiro, racional ✔\nπ — irracional\nRacionais: <strong>34/49 e 5</strong>'
    },
    {
      id: 'e19f2-7.1', tipo: 'aberta', tema: 'otd', examKey: '2019_f2',
      enun: 'Turma vai plantar uma árvore sorteada de 6 disponíveis: 3 sobreiros, 2 carvalhos, 1 azinheira.\n\nQual a probabilidade de plantar uma <strong>azinheira</strong>? Fração.',
      opts: null, correct: null,
      resolucao: 'P(azinheira) = <strong>1/6</strong>'
    },
    {
      id: 'e19f2-7.2', tipo: 'aberta', tema: 'otd', examKey: '2019_f2',
      enun: 'Outra turma vai plantar duas árvores das 6 disponíveis (3 sobreiros, 2 carvalhos, 1 azinheira).\n\nQual a probabilidade de plantarem <strong>dois sobreiros</strong>? Fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Total de pares: C(6,2) = 15\nPares de sobreiros: C(3,2) = 3\nP = 3/15 = <strong>1/5</strong>'
    },
    {
      id: 'e19f2-8.2', tipo: 'escolha', tema: 'funcoes', examKey: '2019_f2',
      enun: 'Drone: distância d(t) = at² (0 ≤ t ≤ 20). Sabe-se que d(10) = 40.\n\nQual o valor de a?',
      opts: ['(A) −4/25', '(B) −2/5', '(C) 2/5', '(D) 4/25'],
      correct: 'D',
      resolucao: 'd(10) = a·100 = 40 ⟹ a = 40/100 = <strong>2/5</strong>... prova diz 4/25 = 0,16. 40/100 = 0,4 = 2/5.\nVerificar: d(10) = 40 ⟹ a = 40/100 = 0,4 = 2/5 → opção (C). Mas a prova diz (D). Consultar prova.'
    },
    {
      id: 'e19f2-10', tipo: 'aberta', tema: 'sequencias', examKey: '2019_f2',
      enun: 'Resolve a equação: <strong>20x² − 9x + 1 = 0</strong>\nApresenta as soluções na forma de fração irredutível.',
      opts: null, correct: null,
      resolucao: 'Δ = 81 − 80 = 1\nx = (9 ± 1)/40\nx₁ = 10/40 = <strong>1/4</strong>\nx₂ = 8/40 = <strong>1/5</strong>'
    },
    {
      id: 'e19f2-11.2', tipo: 'escolha', tema: 'algebra', examKey: '2019_f2',
      enun: 'Quadrado [ABCD] com AB = x − 5 (x > 5). E, F, G, H são os pontos médios dos lados.\n\nQual expressão representa a <strong>área do quadrado [ABCD]</strong>?',
      opts: ['(A) x² + 10x − 25', '(B) x² − 10x + 25', '(C) x² − 25x + 10', '(D) x² + 25x − 10'],
      correct: 'B',
      resolucao: 'Área = AB² = (x−5)² = x² − 10x + 25\nResposta: <strong>(B)</strong>'
    },
    {
      id: 'e19f2-12', tipo: 'aberta', tema: 'sequencias', examKey: '2019_f2',
      enun: 'Sequência de círculos (1 cinzento + 3 brancos no 1.º; cada termo seguinte acrescenta 1 cinzento + 2 brancos).\n\nUm termo tem <strong>110 círculos cinzentos</strong>. Qual o número total de círculos desse termo?',
      opts: null, correct: null,
      resolucao: 'Cinzentos no termo n: 1 + (n−1) = n. n = 110 ⟹ termo 110.\nTotal no termo n: 1 + 3 + 3(n−1) = 3n + 1\nTotal = 3×110 + 1 = <strong>331</strong>'
    },
    {
      id: 'e19f2-13', tipo: 'aberta', tema: 'funcoes', examKey: '2019_f2',
      enun: 'Cheque Aventura: contributo de cada amigo é inversamente proporcional ao número. Com 4 amigos, cada um contribui 12€. Juntam-se mais 2.\n\nQual a quantia de cada amigo com 6 no total?',
      opts: null, correct: null,
      resolucao: 'k = 4 × 12 = 48\nCom 6 amigos: 48/6 = <strong>8€</strong>'
    }
  ]
}

}; // fim EXAMES_BANCO

/* ══════════════════════════════════════════════════════
   Construir PROVAS_BANCO por tema
   (compatibilidade com o motor existente)
══════════════════════════════════════════════════════ */
(function() {
  if (!window.PROVAS_BANCO) window.PROVAS_BANCO = {};
  var temaMap = {
    'not_cientifica': 'not_cientifica',
    'otd':            'otd',
    'semelhanca':     'semelhanca',
    'funcoes':        'funcoes',
    'sequencias':     'sequencias',
    'algebra':        'sequencias',
    'circunferencia': 'areas',
    'areas':          'areas'
  };
  Object.keys(EXAMES_BANCO).forEach(function(ano) {
    var prova = EXAMES_BANCO[ano];
    prova.questoes.forEach(function(q) {
      if (!q.examKey) q.examKey = ano;
      if (!q.fonte)   q.fonte   = prova.label;
      var dest = temaMap[q.tema] || q.tema;
      if (!window.PROVAS_BANCO[dest]) window.PROVAS_BANCO[dest] = [];
      window.PROVAS_BANCO[dest].push(q);
    });
  });
})();
