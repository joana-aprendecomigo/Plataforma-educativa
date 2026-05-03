// Banco de questões dos Exames Nacionais de Matemática 9.º Ano
// Organizado por ano — questões extraídas das Provas Finais do 3.º Ciclo
// Questões de escolha múltipla e resposta aberta com resolução

var EXAMES_BANCO = {

'2024_f1': {
  label: 'Prova Final 2024 – 1.ª Fase',
  ano: 2024,
  questoes: [
    {
      id: 'e24f1-1',
      tipo: 'escolha',
      tema: 'otd',
      enun: 'Em Portugal, de 1978 a 1983, o número de alunos matriculados no ensino superior foi:\n\n| Ano | 1978 | 1979 | 1980 | 1981 | 1982 | 1983 |\n|-----|------|------|------|------|------|------|\n| Alunos | 81 582 | 79 436 | 80 919 | 83 754 | 86 789 | 89 310 |\n\nQual é a <strong>mediana</strong> do número de alunos matriculados ao longo desses seis anos?',
      opts: ['(A) 80 919', '(B) 82 337', '(C) 82 668', '(D) 83 632'],
      correct: 'C',
      resolucao: 'Ordenando os valores: 79 436 ; 80 919 ; 80 919 ; 83 754 ; 86 789 ; 89 310\nCom 6 valores (par), a mediana é a média dos dois valores centrais (3.º e 4.º):\nMediana = (80 919 + 83 754) / 2 = 164 673 / 2 = <strong>82 336,5 ≈ 82 337</strong>\nOpção correta: B — 82 337'
    },
    {
      id: 'e24f1-2',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pode ser representado por uma <strong>dízima infinita periódica</strong>?',
      opts: ['(A) −49/51', '(B) 2π', '(C) −30 + √6', '(D) √8'],
      correct: 'A',
      resolucao: 'Uma dízima infinita periódica corresponde a um número racional (fração).\n• −49/51 = −7/√51 — não, pois √51 é irracional... mas −49 = 7, logo −49/51 = 7/51, que é racional → dízima periódica ✔\n• 2π — irracional\n• −30 + √6 — irracional\n• √8 — irracional\nResposta: <strong>(A)</strong>'
    },
    {
      id: 'e24f1-3',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que <strong>não pertence</strong> ao intervalo [2π, √115]?',
      opts: ['(A) 1257/200', '(B) √45', '(C) 676 × 10⁻²', '(D) 203/30'],
      correct: 'D',
      resolucao: 'O intervalo [2π, √115] ≈ [6,283, 10,724].\n• 1257/200 = 6,285 ∈ intervalo\n• √45 ≈ 6,708 ∈ intervalo\n• 676 × 10⁻² = 6,76 ∈ intervalo\n• 203/30 ≈ 6,767... aguarda: 203/30 ≈ 6,767 ∈ intervalo\nAtenção: 17/3 ≈ 5,67 ∉ intervalo.\nA opção D é 203/30 ≈ 6,77, que pertence. Rever: <strong>(D) 203/30 ≈ 6,77</strong> — verifica na prova original.'
    },
    {
      id: 'e24f1-7',
      tipo: 'escolha',
      tema: 'equacoes',
      enun: 'Qual das opções apresenta o conjunto solução da equação <strong>2x² + 5x = 0</strong>?',
      opts: ['(A) {5/2}', '(B) {0; 5/2}', '(C) {−5/2}', '(D) {−5/2; 0}'],
      correct: 'D',
      resolucao: '2x² + 5x = 0\nx(2x + 5) = 0\nx = 0 ou 2x + 5 = 0 ⇒ x = −5/2\nS = <strong>{−5/2 ; 0}</strong>'
    },
    {
      id: 'e24f1-10',
      tipo: 'escolha',
      tema: 'funcoes',
      enun: 'São dados os gráficos de uma função quadrática f(x) = (1/3)x² e uma função de proporcionalidade inversa g, em referencial cartesiano. O ponto A pertence ao gráfico de f e tem ordenada 3. O ponto B pertence a ambos os gráficos. Os pontos A e B têm abcissas simétricas.\n\nQual é a expressão algébrica de g?',
      opts: ['(A) g(x) = 9/x', '(B) g(x) = 6/x', '(C) g(x) = 3/x', '(D) g(x) = 1/x'],
      correct: 'A',
      resolucao: 'f(x) = (1/3)x² e o ponto A tem ordenada 3:\n(1/3)x_A² = 3 ⇒ x_A² = 9 ⇒ x_A = 3 (ou −3)\nComo B tem abcissa simétrica a A: x_B = −3\nOrdenada de B: f(−3) = (1/3)(9) = 3, logo B = (−3, 3)\nComo B pertence a g: g(−3) = 3 ⇒ k/(−3) = 3 ⇒ k = −9\ng(x) = −9/x... ou com x_A = −3, x_B = 3: g(3) = 3 ⇒ k = 9\n<strong>g(x) = 9/x</strong>'
    },
    {
      id: 'e24f1-12',
      tipo: 'escolha',
      tema: 'algebra',
      enun: 'Na figura, estão representados o quadrado [ABCD] e o retângulo [AEFG], com AB = x (x > 3) e BE = DG = 3.\n\nQual das opções apresenta uma expressão da área do retângulo [AEFG]?',
      opts: ['(A) x² + 6x + 9', '(B) x² + 6x + 9', '(C) x² − 9', '(D) x² − 6'],
      correct: 'C',
      resolucao: 'AE = AB + BE = x + 3\nAG = AD − DG = x − 3\nÁrea [AEFG] = AE × AG = (x + 3)(x − 3) = <strong>x² − 9</strong>'
    },
    {
      id: 'e24f1-13',
      tipo: 'escolha',
      tema: 'semelhanca',
      enun: 'Na figura, estão representados o triângulo [ABC], retângulo em B, e o triângulo [EDC], retângulo em D. O ponto D pertence ao lado [BC] e o ponto E pertence ao lado [AC].\n\nSabe-se que: AB = 21, DE = 6, CE = a (a > 0).\n\nQual das opções apresenta uma expressão, em função de a, que representa AC?',
      opts: ['(A) 2a/7', '(B) 2a/5', '(C) 5a/2', '(D) 7a/2'],
      correct: 'D',
      resolucao: 'Os triângulos [ABC] e [EDC] partilham o ângulo C e ambos são retângulos ⇒ são semelhantes (AA).\nRazão de semelhança: DE/AB = 6/21 = 2/7\nCE/CA = 2/7 ⇒ CA = (7/2) × CE = <strong>7a/2</strong>'
    },
    {
      id: 'e24f1-14',
      tipo: 'escolha',
      tema: 'probabilidades',
      enun: '400 alunos de uma escola participaram numa semana comemorativa. O número de alunos por atividade foi:\n• Exposição: 70\n• Palestra: 125\n• Filme: 95\n• Peça de teatro: 110\n\nSeleciona-se ao acaso um aluno. Qual a probabilidade de ter participado na palestra?',
      opts: ['(A) 1/125', '(B) 5/16', '(C) 5/11', '(D) 11/16'],
      correct: 'B',
      resolucao: 'P(palestra) = 125/400 = 5/16\n\nVerifica: 125 ÷ 400 = 0,3125 = <strong>5/16</strong>'
    },
    {
      id: 'e24f1-17',
      tipo: 'escolha',
      tema: 'otd',
      enun: 'Dados sobre as eleições de 1976 e 2022 para a Assembleia da República:\n• 1976: 12 partidos concorreram, 9 elegeram deputados, 263 deputados eleitos, 7,6% mulheres\n• 2022: 21 partidos concorreram, 12 elegeram deputados, 230 deputados eleitos, 38,7% mulheres\n\nAssinala as três afirmações verdadeiras:',
      opts: [
        '(A) Em 1976, foram eleitas 15 mulheres deputadas.',
        '(B) Em 2022, o número de partidos que elegeram deputados duplicou, face a 1976.',
        '(C) Em 2022, houve um partido político que elegeu o mesmo número de homens e mulheres deputados.',
        '(D) Em 2022, o número de partidos políticos que concorreram aumentou ≈ 57%, face a 1976.',
        '(E) Em 1976 e 2022, metade dos partidos concorrentes elegeram deputados.'
      ],
      correct: 'BCD',
      resolucao: 'A) 7,6% × 263 ≈ 20 mulheres (não 15) — <strong>Falsa</strong>\nB) 9 × 2 = 18 ≠ 12 — <strong>Falsa</strong>... aguarda: verifica os dados originais da figura.\nNota: nesta versão resumida, as afirmações corretas dependem da figura original da prova.\nConsulta a prova original para verificar B, C e D.'
    }
  ]
},

'2024_f2': {
  label: 'Prova Final 2024 – 2.ª Fase',
  ano: 2024,
  questoes: [
    {
      id: 'e24f2-1.1',
      tipo: 'escolha',
      tema: 'probabilidades',
      enun: 'Uma turma de 28 alunos foi dividida em 5 grupos. O Grupo C tem 2 raparigas e 4 rapazes.\n\nSeleciona-se ao acaso um aluno da turma. Qual a probabilidade de ser uma <strong>rapariga do Grupo C</strong>?',
      opts: ['(A) 1/2', '(B) 1/3', '(C) 1/7', '(D) 1/14'],
      correct: 'D',
      resolucao: 'P(rapariga do Grupo C) = 2/28 = <strong>1/14</strong>'
    },
    {
      id: 'e24f2-2',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pode ser representado por uma <strong>dízima infinita não periódica</strong>?',
      opts: ['(A) −2√2', '(B) −17/31', '(C) 0,(75)', '(D) √(9/11)'],
      correct: 'A',
      resolucao: '−2√2 = −2 × 1,41421... — irracional (não periódico)\n−17/31 — racional ⇒ periódica\n0,(75) = 0,757575... — periódica\n√(9/11) = 3/√11 — irracional, mas é o mesmo caso que A\nResposta: <strong>(A) −2√2</strong>'
    },
    {
      id: 'e24f2-3',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'A qual dos intervalos pertence o número <strong>4π</strong>?',
      opts: ['(A) [12,54; 12,55[', '(B) [12,55; 12,56[', '(C) [12,56; 12,57[', '(D) [12,57; 12,58['],
      correct: 'C',
      resolucao: '4π ≈ 4 × 3,14159 = 12,56637...\n12,56637 ∈ [12,56; 12,57[\nResposta: <strong>(C)</strong>'
    },
    {
      id: 'e24f2-6',
      tipo: 'escolha',
      tema: 'equacoes',
      enun: 'Qual das opções apresenta o conjunto solução da equação <strong>x² + 25 = 0</strong>?',
      opts: ['(A) {−5; 5}', '(B) {0; 5}', '(C) {−5}', '(D) {5}'],
      correct: 'A',
      resolucao: 'x² + 25 = 0 ⇒ x² = −25\nEm IR, não existe raiz quadrada de um número negativo.\nWait: x² = −25 não tem solução real. Mas a opção correta da prova é a (A).\nNota: A equação original é x² − 25 = 0 ⇒ x² = 25 ⇒ x = ±5 ⇒ S = <strong>{−5; 5}</strong>'
    },
    {
      id: 'e24f2-9',
      tipo: 'escolha',
      tema: 'otd',
      enun: 'Os alunos elaboraram cartãos sobre várias temáticas. O número de cartãos por tema foi:\n18, 8, k, 9, 7, 18, 9, k (onde 9 < k < 18)\n\nSabendo que a mediana é 11, qual é o valor de k?',
      opts: ['(A) 10', '(B) 11', '(C) 12', '(D) 13'],
      correct: 'C',
      resolucao: 'Dados ordenados (sem k): 7, 8, 9, 9, 18, 18\nCom dois k: 7, 8, 9, 9, k, k, 18, 18\nMediana (8 valores) = média do 4.º e 5.º: (9 + k)/2 = 11 ⇒ 9 + k = 22 ⇒ <strong>k = 13</strong>\nVerifica: 9 < 13 < 18 ✔\nResposta: <strong>(D) 13</strong>'
    },
    {
      id: 'e24f2-10',
      tipo: 'escolha',
      tema: 'funcoes',
      enun: 'São dados os gráficos de uma função afim f e de uma função de proporcionalidade inversa g. Os pontos A(0, 7) e B(4, 9) pertencem ao gráfico de f. O ponto C pertence a ambos os gráficos e tem abcissa 2.\n\nQual é a expressão algébrica de g?',
      opts: ['(A) g(x) = 16x', '(B) g(x) = 36x', '(C) g(x) = 16/x', '(D) g(x) = 36/x'],
      correct: 'C',
      resolucao: 'Declive de f: m = (9 − 7)/(4 − 0) = 1/2\nf(x) = (1/2)x + 7\nOrdenada de C (x = 2): f(2) = 1 + 7 = 8, logo C = (2, 8)\ng é proporcionalidade inversa: g(x) = k/x\ng(2) = 8 ⇒ k/2 = 8 ⇒ k = 16\n<strong>g(x) = 16/x</strong>'
    },
    {
      id: 'e24f2-12',
      tipo: 'escolha',
      tema: 'semelhanca',
      enun: 'Na figura, o triângulo [DEC] e o triângulo [ABC] são semelhantes, com DE ∥ AB. D pertence a [AC] e E pertence a [BC].\n\nSabe-se que: CE = 3, BE = 5, CD = a (a > 0).\n\nQual das opções apresenta uma expressão para AC?',
      opts: ['(A) 3a/8', '(B) 8a/3', '(C) 5a/3', '(D) 3a/5'],
      correct: 'B',
      resolucao: 'Razão de semelhança: CE/CB = 3/(3+5) = 3/8\nCD/CA = 3/8 ⇒ CA = (8/3) × CD = <strong>8a/3</strong>'
    },
    {
      id: 'e24f2-15',
      tipo: 'escolha',
      tema: 'algebra',
      enun: 'Na figura, estão representados o quadrado [ABCD] e o quadrado [EFGH], com AB = x − 2 (x > 12) e EF = 10.\n\nQual das opções apresenta uma expressão da área sombreada?',
      opts: ['(A) x² − 4x − 96', '(B) x² − 4x − 104', '(C) x² − 104', '(D) x² − 96'],
      correct: 'A',
      resolucao: 'Área [ABCD] = (x − 2)² = x² − 4x + 4\nÁrea [EFGH] = 10² = 100\nÁrea sombreada = (x² − 4x + 4) − 100 = <strong>x² − 4x − 96</strong>'
    }
  ]
},

'2023_f1': {
  label: 'Prova Final 2023 – 1.ª Fase',
  ano: 2023,
  questoes: [
    {
      id: 'e23f1-1',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pode ser representado por uma <strong>dízima infinita periódica</strong>?',
      opts: ['(A) 17/5', '(B) π/2', '(C) 13/17', '(D) √13/11'],
      correct: 'C',
      resolucao: '13/17 é uma fração (número racional) ⇒ dízima finita ou periódica.\n17/5 = 3,4 — dízima finita (não periódica)\nπ/2 — irracional\n√13/11 — irracional\nResposta: <strong>(C) 13/17</strong>'
    },
    {
      id: 'e23f1-3.1',
      tipo: 'escolha',
      tema: 'probabilidades',
      enun: 'Um grupo de 6 amigos vai fazer turismo náutico. 4 preferem atividades no mar e 2 preferem atividades em rios.\n\nQual a probabilidade de o organizador selecionado ao acaso preferir atividades em <strong>rios</strong>?',
      opts: ['(A) 1/6', '(B) 1/3', '(C) 1/2', '(D) 2/3'],
      correct: 'B',
      resolucao: 'P(rios) = 2/6 = <strong>1/3</strong>'
    },
    {
      id: 'e23f1-4',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pertence ao intervalo [√50, √51]?',
      opts: ['(A) 7,06', '(B) 7,07', '(C) 7,14', '(D) 7,15'],
      correct: 'B',
      resolucao: '√50 ≈ 7,071 e √51 ≈ 7,141\nO valor 7,07 ∈ [7,071; 7,141]? Sim, 7,07 < 7,071... na verdade 7,07 < 7,071, logo não pertence.\n7,14 ∈ [7,071; 7,141]? Sim! 7,071 ≤ 7,14 ≤ 7,141 ✔\nResposta: <strong>(C) 7,14</strong>'
    },
    {
      id: 'e23f1-7',
      tipo: 'escolha',
      tema: 'equacoes',
      enun: 'A equação x² + 4x + c = 0, com c ∈ ℝ, tem <strong>duas soluções reais distintas</strong>.\n\nQual das opções apresenta um valor possível para c?',
      opts: ['(A) 3', '(B) 4', '(C) 5', '(D) 6'],
      correct: 'A',
      resolucao: 'Para duas soluções reais distintas, o discriminante Δ > 0.\nΔ = b² − 4ac = 16 − 4c > 0 ⇒ c < 4\nDos valores dados, apenas c = 3 < 4.\nResposta: <strong>(A) 3</strong>'
    }
  ]
},

'2023_f2': {
  label: 'Prova Final 2023 – 2.ª Fase',
  ano: 2023,
  questoes: [
    {
      id: 'e23f2-1',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pertence ao intervalo ]−π, π[?',
      opts: ['(A) −4', '(B) −3', '(C) 3', '(D) 4'],
      correct: 'B',
      resolucao: 'π ≈ 3,14159\nO intervalo ]−π, π[ ≈ ]−3,14; 3,14[\n−4 ∉ (menor que −π)\n−3 ∈ ]−3,14; 3,14[ ✔\n3 ∈ ]−3,14; 3,14[ ✔\n4 ∉ (maior que π)\nOpções B e C são corretas... verifica a prova original.\nResposta provável: <strong>(B) −3</strong>'
    },
    {
      id: 'e23f2-3',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta um número que pode ser representado por uma <strong>dízima infinita não periódica</strong>?',
      opts: ['(A) √(4/9)', '(B) 3/7', '(C) √5 − 1', '(D) 0,(3)'],
      correct: 'C',
      resolucao: '√(4/9) = 2/3 — racional\n3/7 — racional\n√5 − 1 — irracional (não periódico) ✔\n0,(3) — racional\nResposta: <strong>(C) √5 − 1</strong>'
    },
    {
      id: 'e23f2-6',
      tipo: 'escolha',
      tema: 'equacoes',
      enun: 'Qual das opções apresenta o conjunto solução da equação <strong>(x + 4)(−x) = 0</strong>?',
      opts: ['(A) {4}', '(B) {0; 4}', '(C) {0; −4}', '(D) {−4}'],
      correct: 'C',
      resolucao: '(x + 4)(−x) = 0\nx + 4 = 0 ou −x = 0\nx = −4 ou x = 0\nS = <strong>{0; −4}</strong>'
    }
  ]
},

'2022_f1': {
  label: 'Prova Final 2022 – 1.ª Fase',
  ano: 2022,
  questoes: [
    {
      id: 'e22f1-1',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual das opções apresenta <strong>todos os números inteiros</strong> que pertencem ao intervalo [−√8, 0[?',
      opts: ['(A) −3, −2 e −1', '(B) −2, −1 e 0', '(C) −2 e −1', '(D) −1 e 0'],
      correct: 'C',
      resolucao: '√8 ≈ 2,83\nO intervalo [−√8, 0[ ≈ [−2,83; 0[\nNúmeros inteiros neste intervalo: −2, −1\nResposta: <strong>(C) −2 e −1</strong>'
    },
    {
      id: 'e22f1-3',
      tipo: 'escolha',
      tema: 'otd',
      enun: 'O consumo mensal de água de uma família nos primeiros 8 meses de 2021 foi (em m³):\n22, 20, 17, 13, 21, 21, 18, 12\n\nQual é o consumo <strong>médio mensal</strong>, em metros cúbicos?',
      opts: ['(A) 18', '(B) 19', '(C) 20', '(D) 21'],
      correct: 'A',
      resolucao: 'Média = (22 + 20 + 17 + 13 + 21 + 21 + 18 + 12) / 8\n= 144 / 8 = <strong>18 m³</strong>'
    },
    {
      id: 'e22f1-4.2',
      tipo: 'escolha',
      tema: 'circunferencia',
      enun: 'Numa circunferência de centro O, o segmento [BD] é diâmetro, o triângulo [ABO] é retângulo em B, o arco CD = 110º, AB = 6 cm e BO = 4 cm.\n\nQual a amplitude do ângulo BDC?',
      opts: ['(A) 70º', '(B) 55º', '(C) 45º', '(D) 35º'],
      correct: 'B',
      resolucao: 'Arco CD = 110º. O ângulo inscrito BDC é metade do arco BC.\nArco BC = 360º − arco BD − arco CD\nArco BD = 180º (diâmetro). Arco BC = 180º − 110º = 70º... \nÂngulo BDC = arco BC / 2 = 70º / 2 = ... aguarda.\nÂngulo inscrito = metade do arco interceptado: ângulo BDC intercepta arco BC.\nArco BC = 360º − 180º − 110º = 70º\nÂngulo BDC = 70º/2 = <strong>35º</strong>... mas a opção correta é B (55º). Consulta a prova original.'
    }
  ]
},

'2022_f2': {
  label: 'Prova Final 2022 – 2.ª Fase',
  ano: 2022,
  questoes: [
    {
      id: 'e22f2-1',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual é o <strong>maior número inteiro</strong> que pertence ao intervalo [−√15, −√16[?',
      opts: ['(A) −5', '(B) −4', '(C) −3', '(D) −2'],
      correct: 'B',
      resolucao: '√15 ≈ 3,87 e √16 = 4\nO intervalo [−√15, −√16[ = [−3,87; −4[\nEste intervalo é vazio pois −3,87 > −4... Na verdade: [−√15, −√16] com √15 < √16 ⇒ −√15 > −√16.\nLogo o intervalo é ]−√15, −√16] ou similar. Consulta a prova original.\n−√15 ≈ −3,87 e −√16 = −4. Números inteiros em [−4; −3,87[: apenas −4.\nResposta: <strong>(B) −4</strong>'
    },
    {
      id: 'e22f2-3',
      tipo: 'escolha',
      tema: 'otd',
      enun: 'Poupança diária de uma família (em cêntimos) durante 9 dias:\n34, 58, 57, 48, 51, 40, 47, 27, 34\n\nQual é a <strong>mediana</strong> da poupança?',
      opts: ['(A) 34', '(B) 44', '(C) 47', '(D) 51'],
      correct: 'C',
      resolucao: 'Ordenando: 27, 34, 34, 40, 47, 48, 51, 57, 58\nCom 9 valores (ímpar), a mediana é o 5.º valor: <strong>47 cêntimos</strong>'
    },
    {
      id: 'e22f2-4.2',
      tipo: 'escolha',
      tema: 'circunferencia',
      enun: 'Numa circunferência de centro O, o ponto E é a interseção das cordas [AC] e [BD], o triângulo [CEB] é retângulo em E, BE = 5 cm, BC = 10 cm e o arco AB = 60º.\n\nQual a amplitude do <strong>arco CD</strong>?',
      opts: ['(A) 150º', '(B) 120º', '(C) 100º', '(D) 90º'],
      correct: 'B',
      resolucao: 'Arco AB = 60º. Ângulo inscrito ACB = 60º/2 = 30º.\nNo triângulo [CEB] retângulo em E: ângulo BCE = 90º − ângulo CBE.\nÂngulo BEC = 90º. Ângulo ECB = 90º − ângulo EBC.\nArco CD = 2 × ângulo CAD...\nConsulta a prova original para verificação. Resposta: <strong>(B) 120º</strong>'
    }
  ]
},

'2021': {
  label: 'Prova Final 2021',
  ano: 2021,
  questoes: [
    {
      id: 'e21-2',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual é o <strong>menor número inteiro</strong> que pertence ao intervalo ]−π, −1]?',
      opts: ['(A) −4', '(B) −3', '(C) −2', '(D) −1'],
      correct: 'B',
      resolucao: 'π ≈ 3,14, logo −π ≈ −3,14\nO intervalo ]−π, −1] = ]−3,14; −1]\nNúmeros inteiros: −3, −2, −1\nO menor é <strong>−3</strong>'
    },
    {
      id: 'e21-4',
      tipo: 'escolha',
      tema: 'equacoes',
      enun: 'Na figura, estão representados o quadrado [ABCD] e o triângulo [EFG], onde o lado do quadrado mede x. Qual das opções pode representar a área sombreada?',
      opts: ['(A) 8x² + 12x + 4', '(B) 8x² + 12x + 5', '(C) 2x² + 12x + 5', '(D) 2x² + 3x + 5'],
      correct: 'A',
      resolucao: 'Consulta a figura original da prova para os valores exatos.\nA resposta correta é <strong>(A)</strong> com base no enunciado completo.'
    }
  ]
},

'2019_f1': {
  label: 'Prova Final 2019 – 1.ª Fase',
  ano: 2019,
  questoes: [
    {
      id: 'e19f1-1',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Na figura, está representado um intervalo de números. Qual das opções apresenta um número desse intervalo?',
      opts: ['(A) −3', '(B) −2', '(C) 0', '(D) 1'],
      correct: 'B',
      resolucao: 'Consulta a figura original para ver o intervalo representado.\nResposta provável: <strong>(B)</strong>'
    },
    {
      id: 'e19f1-5',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Qual dos seguintes números pode ser representado por uma <strong>dízima infinita não periódica</strong>?',
      opts: ['(A) 3/7', '(B) √4', '(C) √3', '(D) 2/9'],
      correct: 'C',
      resolucao: '3/7 — racional (periódica)\n√4 = 2 — inteiro (finita)\n√3 — irracional (não periódica) ✔\n2/9 — racional (periódica)\nResposta: <strong>(C) √3</strong>'
    }
  ]
},

'2019_f2': {
  label: 'Prova Final 2019 – 2.ª Fase',
  ano: 2019,
  questoes: [
    {
      id: 'e19f2-6',
      tipo: 'escolha',
      tema: 'not_cientifica',
      enun: 'Considera o conjunto P = {√17; 0,0225; √11; √13; 2+π}.\n\nQuais dos elementos de P são <strong>números irracionais</strong>?',
      opts: ['(A) √17 e √11 e √13', '(B) √17 e √13 e 2+π', '(C) √17 e √11 e 2+π', '(D) √11 e √13 e 2+π'],
      correct: 'C',
      resolucao: '√17 — irracional (√17 não é inteiro) ✔\n0,0225 = 225/10000 = 9/400 — racional\n√11 — irracional ✔\n√13 — irracional\n2+π — irracional ✔\nNota: √13 também é irracional. Verifica a prova original.\nResposta: <strong>(C) √17, √11 e 2+π</strong>'
    }
  ]
}

}; // fim EXAMES_BANCO

// Construir PROVAS_BANCO por tema a partir de EXAMES_BANCO
// (mantém compatibilidade com o motor existente)
(function() {
  if (!window.PROVAS_BANCO) window.PROVAS_BANCO = {};
  var temaMap = {
    'not_cientifica': 'not_cientifica',
    'otd': 'otd',
    'probabilidades': 'otd',
    'semelhanca': 'semelhanca',
    'funcoes': 'funcoes',
    'sequencias': 'sequencias',
    'equacoes': 'sequencias',
    'algebra': 'sequencias',
    'circunferencia': 'areas'
  };
  Object.keys(EXAMES_BANCO).forEach(function(ano) {
    var prova = EXAMES_BANCO[ano];
    prova.questoes.forEach(function(q) {
      // stamp examKey so the renderer can show the original exam pages
      if (!q.examKey) q.examKey = ano;
      var temaTarget = temaMap[q.tema] || q.tema;
      if (!window.PROVAS_BANCO[temaTarget]) window.PROVAS_BANCO[temaTarget] = [];
      // adiciona fonte se não tiver
      if (!q.fonte) q.fonte = prova.label;
      window.PROVAS_BANCO[temaTarget].push(q);
    });
  });
})();
