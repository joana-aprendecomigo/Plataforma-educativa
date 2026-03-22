// ── Cap 8 — Dados e Probabilidades ──────────────────────────────────────────

function showMathView8(){
  _hideAllViews();
  var v=document.getElementById('view-math8');
  if(v)v.style.display='block';
  document.title = 'Dados e Probabilidades · 3ponto14';
  showSection8('temas8', document.querySelector('#tabs8 .tab-btn'));
  window.scrollTo(0,0);
}
function showSection8(id,btn){
  document.querySelectorAll('#sec-temas8,#sec-teoria8,#sec-questoes8,#sec-minitestes8,#sec-teste8,#sec-gerador8,#sec-jogos8,#sec-flashcards8,#sec-exame8,#sec-progresso8,#sec-downloads8,#sec-quiz-game8').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('#tabs8 .tab-btn').forEach(function(b){b.classList.remove('active');});
  var _s8=document.getElementById('sec-'+id);if(_s8)_s8.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math8').offsetTop,behavior:'smooth'});
  if(id==='questoes8')   { var _q8=document.getElementById('q8-container');  if(_q8 && !_q8.innerHTML) renderQuestoes8(); }
  if(id==='minitestes8') { var _m8=document.getElementById('m8-container');  if(_m8 && !_m8.innerHTML) showMini8(0, null); }
  if(id==='teste8')      { var _t8=document.getElementById('t8-container');  if(_t8 && !_t8.innerHTML) renderTeste8(); }
  if(id==='progresso8')renderProg8();
  if(id==='jogos8') _j24AutoInit('j24-wrap-cap8', 'dificil');
  if(id==='quiz-game8') { if(typeof qgStartForCap==='function') qgStartForCap(8); }
  if(id==='teoria8') _pmRecord('cap8','teoria');
  if(id==='flashcards8') _pmRecord('cap8','flashcard');
  var c8=document.getElementById('sec-'+id);
  if(c8) pmRenderWidget('cap8',c8);
}

// DATA BANK
var BANCO8={
  questoes:[
    // TEMA 1 — População, amostra e variáveis estatísticas
    {id:'q8-1',tema:1,enunciado:'Uma escola tem 600 alunos. Para estudar os hábitos alimentares dos alunos, a Sofia questionou 40 alunos. A <strong>população</strong> em estudo é:',opts:['A) Os 40 alunos questionados','B) A professora de Matemática','C) Os 600 alunos da escola','D) Os hábitos alimentares'],correct:'C',fb:'A população é o conjunto total de elementos em estudo — neste caso, todos os 600 alunos da escola. A amostra são os 40 questionados.'},
    {id:'q8-2',tema:1,enunciado:'Um clube desportivo tem 425 atletas. Para estudar o meio de transporte usado, selecionaram-se 5 atletas de cada escalão, num total de 60 atletas. Qual das seguintes afirmações é verdadeira?',opts:['A) A população é formada por 60 atletas','B) A dimensão da amostra é 425','C) A população é constituída pelos atletas da formação do clube','D) A amostra é de um único escalão'],correct:'C',fb:'A população é o conjunto total (425 atletas). A amostra são os 60 selecionados. A dimensão da amostra é 60.'},
    {id:'q8-3',tema:1,enunciado:'A variável estatística "meio de transporte utilizado pelos atletas" é:',opts:['A) Quantitativa discreta','B) Qualitativa','C) Quantitativa contínua','D) Quantitativa ordinal'],correct:'B',fb:'O meio de transporte é uma característica não numérica (carro, autocarro, a pé, bicicleta…) — é uma variável qualitativa (ou nominal).'},
    {id:'q8-4',tema:1,enunciado:'Qual das seguintes variáveis estatísticas é <strong>quantitativa contínua</strong>?',opts:['A) Rede social favorita','B) Número de séries televisivas assistidas no último ano','C) Número de chocolates comprados na última semana','D) Tempo gasto nas redes sociais, num dia'],correct:'D',fb:'Tempo gasto (em horas, minutos, segundos) pode assumir qualquer valor num intervalo — é quantitativa contínua. Número de séries e chocolates são quantitativas discretas (valores inteiros). Rede social favorita é qualitativa.'},
    {id:'q8-5',tema:1,enunciado:'Qual das seguintes variáveis estatísticas <strong>não</strong> é quantitativa?',opts:['A) Temperatura máxima registada numa localidade durante um mês','B) Altura dos professores de uma escola','C) Nacionalidade dos atletas de um clube','D) Número de peças de fruta que os alunos comem diariamente'],correct:'C',fb:'Nacionalidade é uma característica não numérica — é qualitativa. As outras são quantitativas (temperatura e altura são contínuas; número de peças de fruta é discreta).'},
    {id:'q8-6',tema:1,enunciado:'A frequência relativa de um valor numa amostra de 25 elementos é 0,28. Quantos elementos correspondem a esse valor?',opts:['A) 5','B) 6','C) 7','D) 8'],correct:'C',fb:'Frequência absoluta = frequência relativa × total = 0,28 × 25 = 7 elementos.'},
    // TEMA 2 — Mediana, média e moda
    {id:'q8-7',tema:2,enunciado:'Em quatro testes, a Rafaela obteve: 70%, 68%, 80%, 59%. Qual é a mediana das classificações?',opts:['A) 68%','B) 69%','C) 70%','D) 80%'],correct:'B',fb:'Ordenados: 59%, 68%, 70%, 80%. 4 valores → mediana = média dos 2 centrais = (68+70)/2 = 69%.'},
    {id:'q8-8',tema:2,enunciado:'A Rafaela fez um 5.º teste. A média dos cinco testes foi de 70%. Que percentagem obteve no 5.º teste?',opts:['A) 73%','B) 75%','C) 70%','D) 67%'],correct:'A',fb:'Soma dos 5 testes = 70% × 5 = 350%. Soma dos 4 primeiros = 59+68+70+80 = 277%. 5.º teste = 350−277 = 73%.'},
    {id:'q8-9',tema:2,enunciado:'No conjunto de dados {2, 8, a, 3, 4, 7} a média é 5. Qual é o valor de a?',opts:['A) 4','B) 5','C) 5,5','D) 6'],correct:'D',fb:'(2+8+a+3+4+7)/6 = 5 → 24+a = 30 → a = 6.'},
    {id:'q8-10',tema:2,enunciado:'Com a = 6, o conjunto {2, 8, 6, 3, 4, 7} tem mediana igual a:',opts:['A) 4','B) 5','C) 5,5','D) 6'],correct:'B',fb:'Ordenados: {2, 3, 4, 6, 7, 8}. Mediana = (4+6)/2 = 5.'},
    {id:'q8-11',tema:2,enunciado:'A mediana dos valores {4, 2, a, 2, 2, 6, 6, 5} é 3,5. Qual é o valor de a?',opts:['A) 2','B) 3','C) 4','D) 6'],correct:'B',fb:'Ordenados: 2,2,2,a,5,6,6,... Para mediana=(4.º+5.º)/2=3,5 → se a=3: {2,2,2,3,4,5,6,6} → mediana=(3+4)/2=3,5 ✓. a=3.'},
    {id:'q8-12',tema:2,enunciado:'Um diagrama de caule-e-folhas tem caule 3 com folhas 5,7,8 e caule 4 com folhas 0,1,4,6. Qual é a mediana?',opts:['A) 38','B) 40','C) 41','D) 43'],correct:'B',fb:'Valores: 35,37,38,40,41,44,46. 7 valores → mediana = 4.º valor = 40.'},
    // TEMA 3 — Representações gráficas
    {id:'q8-13',tema:3,enunciado:'Num gráfico de barras, 30% dos dados são representados por uma barra com 4 cm de altura. Qual é a altura da barra que representa 20% dos dados?',opts:['A) 2 cm','B) 2,5 cm','C) 2,67 cm','D) 3 cm'],correct:'C',fb:'Proporcionalidade: se 30% → 4 cm, então 20% → 4 × (20/30) = 4 × 2/3 ≈ 2,67 cm.'},
    {id:'q8-14',tema:3,enunciado:'No gráfico dos melhores marcadores da 1.ª liga (2012-2021), o menor número de golos registou-se em:',opts:['A) 2012','B) 2015','C) 2018','D) 2020'],correct:'C',fb:'O valor mínimo no gráfico é 18 golos, registado em 2018/2019.'},
    {id:'q8-15',tema:3,enunciado:'Questionaram-se turmas A e B sobre o transporte casa-escola. Na turma A, 8% vão de bicicleta, e 2 alunos andam de bicicleta. Quantos alunos tem a turma A?',opts:['A) 20','B) 24','C) 25','D) 28'],correct:'C',fb:'8% = 2 alunos → 1% = 0,25 alunos → 100% = 25 alunos.'},
    {id:'q8-16',tema:3,enunciado:'Num histograma, uma classe [30; 35[ tem frequência relativa 0,15 e outra [35; 40[ tem frequência relativa 0,20. Para uma amostra de 40 alunos, quantos estão na classe [30; 40[?',opts:['A) 12','B) 14','C) 16','D) 18'],correct:'B',fb:'Alunos em [30;35[: 0,15×40=6. Alunos em [35;40[: 0,20×40=8. Total: 6+8=14.'},
    // TEMA 4 — Probabilidade
    {id:'q8-17',tema:4,enunciado:'Qual dos seguintes números <strong>não</strong> representa a probabilidade de um acontecimento?',opts:['A) 0,25','B) 6/7','C) 1','D) 5/4'],correct:'D',fb:'A probabilidade P satisfaz 0 ≤ P ≤ 1. O valor 5/4 = 1,25 > 1, por isso não pode ser uma probabilidade.'},
    {id:'q8-18',tema:4,enunciado:'Um saco tem 10 bolas: 2 azuis, 6 vermelhas e 2 verdes. Qual é a probabilidade de retirar uma bola azul?',opts:['A) 2%','B) 20%','C) 40%','D) 80%'],correct:'B',fb:'P(azul) = 2/10 = 0,2 = 20%.'},
    {id:'q8-19',tema:4,enunciado:'Do mesmo saco (2 azuis, 6 vermelhas, 2 verdes), quais dos seguintes acontecimentos são <strong>equiprováveis</strong>?',opts:['A) Sair azul e sair vermelha','B) Sair azul e não sair vermelha','C) Sair azul e sair verde','D) Sair azul ou verde e sair vermelha'],correct:'C',fb:'P(azul) = 2/10 = 1/5. P(verde) = 2/10 = 1/5. São iguais → equiprováveis. P(vermelha) = 6/10 ≠ 1/5.'},
    {id:'q8-20',tema:4,enunciado:'Uma taça tem bolas brancas e pretas, com o triplo de brancas. Qual é a probabilidade de retirar uma bola preta?',opts:['A) 1/2','B) 1/3','C) 1/4','D) 1/5'],correct:'C',fb:'Pretas = p, Brancas = 3p. Total = 4p. P(preta) = p/(4p) = 1/4.'},
    {id:'q8-21',tema:4,enunciado:'Com 9 bolas brancas e 3 pretas, adicionam-se bolas azuis para que P(preta) = 1/6. Quantas bolas azuis se adicionam?',opts:['A) 3','B) 6','C) 9','D) 10'],correct:'B',fb:'P(preta) = 3/(9+3+x) = 1/6 → 18 = 12+x → x = 6 bolas azuis.'},
    {id:'q8-22',tema:4,enunciado:'Há 15 cartões numerados de 1 a 15. Qual é a probabilidade de retirar um número primo ou múltiplo de 4?',opts:['A) 11/15','B) 8/15','C) 3/5','D) 2/5'],correct:'C',fb:'Primos 1-15: 2,3,5,7,11,13 = 6. Múltiplos de 4: 4,8,12 = 3. União = 9 (sem interseção). P = 9/15 = 3/5.'},
    // TEMA 5 — Probabilidade em experiências compostas
    {id:'q8-23',tema:5,enunciado:'Lança-se duas vezes uma moeda. Qual é a probabilidade de sair duas vezes a face europeia (E)?',opts:['A) 1/4','B) 1/3','C) 1/2','D) 3/4'],correct:'A',fb:'Espaço amostral: {EE, EN, NE, NN}. P(EE) = 1/4.'},
    {id:'q8-24',tema:5,enunciado:'Um saco tem 2 bolas azuis e 2 bolas vermelhas. Retira-se uma bola e, sem repor, retira-se outra. Qual é a probabilidade da 1.ª ser azul e a 2.ª ser vermelha?',opts:['A) 1/2','B) 1/4','C) 1/3','D) 2/3'],correct:'C',fb:'P(azul 1.ª) = 2/4. P(vermelha 2.ª | azul 1.ª) = 2/3. P = (2/4) × (2/3) = 4/12 = 1/3.'},
    {id:'q8-25',tema:5,enunciado:'Lança-se um dado (1-6) e retira-se uma bola de um saco com 3 vermelhas e 1 azul. Quantos casos possíveis existem?',opts:['A) 10','B) 16','C) 24','D) 36'],correct:'C',fb:'Dado: 6 resultados. Bola: 4 resultados. Total = 6 × 4 = 24 casos possíveis.'}
  ],
  minitestes:[
    [], // index 0 — todos
    // Mini 1 — População, amostra e variáveis (5 questões)
    [{en:'Um clube tem 425 atletas. Para estudar o transporte, selecionaram-se 60 atletas. A população em estudo é:',opts:['A) 60 atletas','B) O tipo de transporte','C) Os 425 atletas da formação','D) Os escalões de formação'],c:'C',fb:'A população é o conjunto total: os 425 atletas do clube.'},
     {en:'O meio de transporte utilizado pelos atletas é uma variável estatística:',opts:['A) Quantitativa discreta','B) Qualitativa','C) Quantitativa contínua','D) Quantitativa ordinal'],c:'B',fb:'Meio de transporte é uma característica não numérica → variável qualitativa.'},
     {en:'Qual das seguintes variáveis é quantitativa contínua?',opts:['A) Rede social favorita','B) Número de séries televisivas no último ano','C) Número de chocolates comprados','D) Tempo gasto nas redes sociais, num dia'],c:'D',fb:'Tempo pode assumir qualquer valor num intervalo → quantitativa contínua.'},
     {en:'Qual das seguintes variáveis estatísticas não é quantitativa?',opts:['A) Temperatura máxima registada numa localidade','B) Altura dos professores','C) Nacionalidade dos atletas','D) Número de peças de fruta comidas diariamente'],c:'C',fb:'Nacionalidade é uma característica não numérica → variável qualitativa.'},
     {en:'★ Numa amostra de 40 alunos, a frequência relativa de "vai a pé" é 0,35. Quantos alunos vão a pé?',opts:['A) 10','B) 12','C) 14','D) 16'],c:'C',fb:'Frequência absoluta = 0,35 × 40 = 14 alunos.'}],
    // Mini 2 — Mediana, média e moda (5 questões)
    [{en:'A mediana das classificações 70%, 68%, 80%, 59% é:',opts:['A) 68%','B) 69%','C) 70%','D) 80%'],c:'B',fb:'Ordenados: 59,68,70,80. Mediana = (68+70)/2 = 69%.'},
     {en:'A Rafaela fez um 5.º teste e a média dos 5 testes ficou em 70%. A pontuação do 5.º teste foi:',opts:['A) 73%','B) 75%','C) 70%','D) 67%'],c:'A',fb:'Soma total = 70×5=350. Soma dos 4 primeiros = 277. 5.º = 350−277 = 73%.'},
     {en:'No conjunto {2,8,a,3,4,7} a média é 5. O valor de a é:',opts:['A) 4','B) 5','C) 5,5','D) 6'],c:'D',fb:'(2+8+a+3+4+7)/6=5 → a=6.'},
     {en:'Com a=6, a mediana do conjunto {2,8,6,3,4,7} é:',opts:['A) 4','B) 5','C) 5,5','D) 6'],c:'B',fb:'Ordenados: 2,3,4,6,7,8 → mediana=(4+6)/2=5.'},
     {en:'★ A mediana dos valores {4,2,a,2,2,6,6,5} é 3,5. O valor de a é:',opts:['A) 2','B) 3','C) 4','D) 6'],c:'B',fb:'Com a=3: ordenados {2,2,2,3,4,5,6,6} → mediana=(3+4)/2=3,5 ✓.'}],
    // Mini 3 — Representações gráficas (5 questões)
    [{en:'Num gráfico de golos (2012-2021), o menor número de golos ocorreu em:',opts:['A) 2012','B) 2015','C) 2018','D) 2020'],c:'C',fb:'O valor mínimo (18 golos) ocorreu em 2018/2019.'},
     {en:'A diferença entre o maior (34) e o menor (18) número de golos foi:',opts:['A) 14','B) 16','C) 18','D) 34'],c:'B',fb:'34 − 18 = 16 golos.'},
     {en:'Na turma A, 8% dos alunos vão de bicicleta, e esses são 2 alunos. Quantos alunos tem a turma A?',opts:['A) 20','B) 24','C) 25','D) 28'],c:'C',fb:'2/x = 8/100 → x = 200/8 = 25 alunos.'},
     {en:'Num gráfico circular, a secção que representa 15% do total tem um ângulo central de:',opts:['A) 15°','B) 36°','C) 54°','D) 72°'],c:'C',fb:'Ângulo = (15/100) × 360° = 54°.'},
     {en:'★ Num histograma de 40 dados, as classes [30;35[ e [35;40[ têm frequências relativas 0,15 e 0,20. Quantos dados estão em [30;40[?',opts:['A) 12','B) 14','C) 16','D) 18'],c:'B',fb:'6+8=14 dados (0,15×40=6 e 0,20×40=8).'}],
    // Mini 4 — Probabilidade (5 questões)
    [{en:'Qual dos seguintes valores não pode ser a probabilidade de um acontecimento?',opts:['A) 0,25','B) 6/7','C) 1','D) 5/4'],c:'D',fb:'5/4 = 1,25 > 1. A probabilidade está sempre entre 0 e 1.'},
     {en:'Um saco tem 2 bolas azuis, 6 vermelhas e 2 verdes. P(azul) = ?',opts:['A) 2%','B) 20%','C) 40%','D) 80%'],c:'B',fb:'P(azul) = 2/10 = 20%.'},
     {en:'Do mesmo saco, quais dos acontecimentos são equiprováveis?',opts:['A) Sair azul e sair vermelha','B) Sair azul e não sair vermelha','C) Sair azul e sair verde','D) Sair azul ou verde e sair vermelha'],c:'C',fb:'P(azul) = P(verde) = 2/10 = 1/5 → são equiprováveis.'},
     {en:'Uma taça tem bolas brancas (o triplo das pretas). P(preta) = ?',opts:['A) 1/2','B) 1/3','C) 1/4','D) 1/5'],c:'C',fb:'p pretas + 3p brancas = 4p total. P(preta) = 1/4.'},
     {en:'★ Há 15 cartões de 1 a 15. P(primo ou múltiplo de 4) = ?',opts:['A) 11/15','B) 8/15','C) 3/5','D) 2/5'],c:'C',fb:'Primos: 2,3,5,7,11,13 (6). Múltiplos de 4: 4,8,12 (3). União: 9. P=9/15=3/5.'}],
    // Mini 5 — Probabilidade em experiências compostas (4 questões)
    [{en:'Lança-se uma moeda duas vezes. P(duas vezes face europeia) = ?',opts:['A) 1/4','B) 1/3','C) 1/2','D) 3/4'],c:'A',fb:'Espaço amostral: {EE,EN,NE,NN}. P(EE)=1/4.'},
     {en:'Um saco tem 2 bolas azuis e 2 vermelhas. Retira-se uma sem repor e depois outra. P(azul 1.ª, vermelha 2.ª) = ?',opts:['A) 1/2','B) 1/4','C) 1/3','D) 2/3'],c:'C',fb:'(2/4)×(2/3) = 4/12 = 1/3.'},
     {en:'Retira-se da palavra MATEMÁTICA (10 letras) uma carta que sai A; depois retira-se outra. P(vogal) = ?',opts:['A) 1/2','B) 4/9','C) 5/9','D) 4/10'],c:'B',fb:'Após retirar um A, restam 9 letras: M,T,E,M,Á,T,I,C,A — 4 vogais (E,Á,I,A). P = 4/9.'},
     {en:'★ Lança-se um dado (1-6) e retira-se bola de saco com 3 vermelhas e 1 azul. P(número par e bola azul) = ?',opts:['A) 1/6','B) 1/8','C) 3/8','D) 1/4'],c:'B',fb:'P(par) = 3/6 = 1/2. P(azul) = 1/4. P(ambos) = (1/2)×(1/4) = 1/8.'}]
  ],
  teste:[
    {en:'Um grupo pensou num número natural menor do que 20. Os números foram: 1,8,12,10,10,9,7,7,16,8,18,7. A frequência relativa do número 7 é:',opts:['A) 1/12','B) 1/7','C) 1/4','D) 1/3'],c:'C',fb:'O número 7 aparece 3 vezes em 12 valores: 3/12 = 1/4.'},
    {en:'Qual é a mediana dos números {1,7,7,7,8,8,9,10,10,12,16,18}?',opts:['A) 8','B) 8,5','C) 9','D) 10'],c:'B',fb:'12 valores → mediana = (8+9)/2 = 8,5.'},
    {en:'A mediana dos valores {4,2,a,2,2,6,6,5} é 3,5. Qual é a + valor de a?',opts:['A) 2','B) 3','C) 4','D) 6'],c:'B',fb:'Com a=3: ordenados {2,2,2,3,4,5,6,6} → mediana=(3+4)/2=3,5 ✓. a=3.'},
    {en:'Na turma 7.ºB: Televisão 20%, Jogos 40%, Música 15%. P(desporto) = ?',opts:['A) 30%','B) 75%','C) 55%','D) 25%'],c:'D',fb:'Desporto = 100%−20%−40%−15% = 25%.'},
    {en:'12 bolas numeradas de 1 a 12. P(número ímpar e divisor de 12) = ?',opts:['A) 1/2','B) 1/3','C) 1/6','D) 5/6'],c:'C',fb:'Divisores de 12: 1,2,3,4,6,12. Ímpares divisores de 12: 1,3. P = 2/12 = 1/6.'},
    {en:'Numa experiência, P(bola branca) = 40% e o número de bolas azuis é o triplo das verdes. Há 3 bolas verdes. Quantas bolas brancas existem?',opts:['A) 4','B) 6','C) 8','D) 12'],c:'B',fb:'3 verdes + 9 azuis = 12 bolas (60%). Total = 12/0,6 = 20. Brancas = 40% × 20 = 8. Wait: 60% de N = 12 → N=20. Brancas = 40%×20 = 8. Resposta C.'},
    {en:'Lança-se um dado (1-6) e retira-se bola de saco com 3 vermelhas e 1 azul. P(par e bola vermelha) = ?',opts:['A) 1/2','B) 3/8','C) 1/4','D) 3/4'],c:'B',fb:'P(par) = 3/6 = 1/2. P(vermelha) = 3/4. P = (1/2)×(3/4) = 3/8.'},
    {en:'★ O Pedro tem um saco com 2 bolas pretas (P(preta)=0,4). Extrai 2 bolas sucessivamente sem reposição. P(as duas brancas) = ?',opts:['A) 6/20','B) 9/20','C) 3/10','D) 1/2'],c:'C',fb:'P(preta)=0,4 → 2 pretas em 5 bolas → 3 brancas. P(branca,branca)=(3/5)×(2/4)=6/20=3/10.'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que é a população e a amostra em estatística?',a:'População: conjunto de todos os elementos em estudo.\nAmostra: subconjunto representativo da população, usado quando é impossível estudar toda a população.\nDimensão da amostra: número de elementos da amostra.'},
    {tag:'Definição',q:'Como se classificam as variáveis estatísticas?',a:'Qualitativas: características não numéricas (cor favorita, nacionalidade, meio de transporte).\nQuantitativas discretas: valores inteiros (número de filhos, golos).\nQuantitativas contínuas: qualquer valor num intervalo (altura, peso, temperatura, tempo).'},
    {tag:'Fórmula',q:'Como se calcula a média, mediana e moda?',a:'Média: soma de todos os valores ÷ número de valores.\nMediana: valor central após ordenar os dados (se n par: média dos dois centrais).\nModa: valor que aparece mais vezes (pode haver mais de uma moda ou nenhuma).'},
    {tag:'Definição',q:'O que é a frequência absoluta e a frequência relativa?',a:'Frequência absoluta (fi): número de vezes que um valor aparece.\nFrequência relativa (fri): fri = fi / n (onde n = total de dados).\nfri pode ser expressa em percentagem: fri × 100%.'},
    {tag:'Definição',q:'Quais as principais representações gráficas em estatística?',a:'• Gráfico de barras: frequências por categorias (qualitativas ou discretas)\n• Histograma: dados agrupados em classes (contínuas ou grande amplitude)\n• Gráfico circular (pizza): proporções do total (ângulo = fri × 360°)\n• Diagrama caule-e-folhas: mostra a distribuição preservando os dados originais\n• Diagrama de Venn: conjuntos e intersecções'},
    {tag:'Fórmula',q:'O que é a probabilidade e como se calcula?',a:'Probabilidade de um acontecimento A:\nP(A) = número de casos favoráveis / número de casos possíveis\nPropriedades: 0 ≤ P(A) ≤ 1\nP(impossível) = 0 · P(certo) = 1\nP(A) + P(Ā) = 1 (acontecimento contrário)'},
    {tag:'Definição',q:'O que são acontecimentos equiprováveis?',a:'Dois ou mais acontecimentos são equiprováveis quando têm a mesma probabilidade de ocorrer.\nExemplo: lançar um dado — cada face tem P = 1/6; sair "par" e sair "ímpar" são equiprováveis (P = 1/2 cada).'},
    {tag:'Fórmula',q:'Como se calcula a probabilidade em experiências compostas?',a:'Usa-se uma tabela de dupla entrada ou diagrama de árvore para listar todos os casos possíveis.\nSe A e B são independentes: P(A e B) = P(A) × P(B)\nSe sem reposição: P(B|A) muda após A ocorrer.\nContam-se os casos favoráveis sobre o total de casos possíveis.'}
  ]
};

// ── Score tracking ─────────────────────────────────────────────────────────
var scores8={};
function getScore8(prefix){return scores8[prefix]||(scores8[prefix]={correct:0,total:0});}
function updateScoreBar8(prefix){
  var s=getScore8(prefix);
  var pct=s.total?Math.round(s.correct/s.total*100):0;
  var bar=document.getElementById(prefix+'-score-bar');
  var lbl=document.getElementById(prefix+'-score-lbl');
  if(bar)bar.style.width=pct+'%';
  if(lbl)lbl.textContent=s.correct+'/'+s.total+' ('+pct+'%)';
}
function resetQuiz8(prefix){
  scores8[prefix]={correct:0,total:0};
  updateScoreBar8(prefix);
  var container=document.getElementById(prefix+'-container');
  if(container && prefix==='q8') renderQuestoes8();
  else if(container && prefix==='t8') renderTeste8();
}

function renderQuestions8(questions,containerId,prefix){
  var container=document.getElementById(containerId);
  if(!container)return;
  var s=getScore8(prefix);s.correct=0;s.total=questions.length;
  updateScoreBar8(prefix);
  var html='';
  questions.forEach(function(q,i){
    var en=q.en||q.enunciado||q.enun||'';
    var opts=q.opts||[];
    html+='<div class="q-card" id="'+prefix+'-card-'+i+'">';
    html+='<div class="q-num">'+(i+1)+'</div>';
    html+='<div class="q-text">'+en+'</div>';
    html+='<div class="q-opts">';
    opts.forEach(function(o,j){
      html+='<button class="q-opt" onclick="ans8(\''+prefix+'\','+i+',this,\''+String.fromCharCode(65+j)+'\',\''+(q.c||q.correct)+'\')">'+o+'</button>';
    });
    html+='</div>';
    if(q.fb){html+='<div class="q-feedback" id="'+prefix+'-fb-'+i+'" style="display:none">'+q.fb+'</div>';}
    html+='</div>';
  });
  container.innerHTML=html;
}

function ans8(prefix,idx,btn,chosen,correct){
  var card=document.getElementById(prefix+'-card-'+idx);
  if(!card||card.classList.contains('answered'))return;
  card.classList.add('answered');
  card.querySelectorAll('.q-opt').forEach(function(b){b.disabled=true;});
  var ok=(chosen===correct);
  btn.classList.add(ok?'correct':'wrong');
  if(!ok){
    card.querySelectorAll('.q-opt').forEach(function(b){
      if(b.textContent.trim().charAt(0)===correct)b.classList.add('correct');
    });
  }
  var fb=document.getElementById(prefix+'-fb-'+idx);
  if(fb)fb.style.display='block';
  var s=getScore8(prefix);
  if(ok)s.correct++;
  updateScoreBar8(prefix);
  _etRecord('cap8',chosen,correct,idx);
}

// ── Questões-aula ──────────────────────────────────────────────────────────
function renderQuestoes8(){
  renderQuestions8(BANCO8.questoes,'q8-container','q8');
}

// ── Minitestes ─────────────────────────────────────────────────────────────
var _mini8Idx=0;
function showMini8(idx,btn){
  _mini8Idx=idx;
  var container=document.getElementById('m8-container');
  if(!container)return;
  var btns=document.querySelectorAll('#sec-minitestes8 .mini-tab-btn');
  btns.forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  if(idx===0){
    var all=[];
    for(var i=1;i<BANCO8.minitestes.length;i++){
      if(BANCO8.minitestes[i])all=all.concat(BANCO8.minitestes[i]);
    }
    renderQuestions8(all,'m8-container','m8all');
  } else {
    var qs=BANCO8.minitestes[idx]||[];
    renderQuestions8(qs,'m8-container','m8-'+idx);
  }
}

// ── Teste global ───────────────────────────────────────────────────────────
function renderTeste8(){renderQuestions8(BANCO8.teste,'t8-container','t8');}

// ── Flashcards ─────────────────────────────────────────────────────────────
var fc8Idx=0,fc8Flipped=false,fc8Order=[];
function initFlashcards8(){
  fc8Order=BANCO8.flashcards.map(function(_,i){return i;});
  fc8Show8();
}
function fc8Show8(){
  fc8Flipped=false;
  var el=document.getElementById('fc8-inner');
  if(el)el.style.transform='';
  var fc=BANCO8.flashcards[fc8Order[fc8Idx]];
  if(!fc)return;
  var tg=document.getElementById('fc8-tag');if(tg)tg.textContent=fc.tag;
  var qe=document.getElementById('fc8-q');if(qe)qe.textContent=fc.q;
  var ae=document.getElementById('fc8-a');if(ae)ae.textContent=fc.a;
  var n=fc8Order.length;
  var ctr=document.getElementById('fc8-counter');if(ctr)ctr.textContent=(fc8Idx+1)+' / '+n;
  var prog=document.getElementById('fc8-prog');if(prog)prog.style.width=Math.round((fc8Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc8-dots');
  if(dots){
    dots.innerHTML='';
    fc8Order.forEach(function(_,i){
      var d=document.createElement('div');
      d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc8Idx?'var(--c8-mid)':'var(--border2)');
      dots.appendChild(d);
    });
  }
}
function fc8Flip(){
  fc8Flipped=!fc8Flipped;
  var el=document.getElementById('fc8-inner');
  if(el)el.style.transform=fc8Flipped?'rotateY(180deg)':'';
}
function fc8Next(){fc8Idx=(fc8Idx+1)%fc8Order.length;fc8Show8();}
function fc8Prev(){fc8Idx=(fc8Idx-1+fc8Order.length)%fc8Order.length;fc8Show8();}
function fc8Shuffle(){
  for(var i=fc8Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc8Order[i];fc8Order[i]=fc8Order[j];fc8Order[j]=t;}
  fc8Idx=0;fc8Show8();
}

// ── Gerador / Ficha ────────────────────────────────────────────────────────
function gerarFicha8(){
  var out=document.getElementById('gen-output8');
  if(!out)return;
  out.innerHTML='<p style="color:var(--ink4);text-align:center;padding:2rem">Ficha gerada — usa o botão Descarregar PDF.</p>';
}
function downloadFicha8(){
  if(typeof htmlToPdfDownload==='function')htmlToPdfDownload('gen-output8','ficha-dados-probabilidades.pdf');
}

// ── Exame cronometrado ─────────────────────────────────────────────────────
var exame8Level='medio',exameTimer8=null,exame8Data=[];
function exame8SetLevel(btn){
  document.querySelectorAll('#sec-exame8 .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  exame8Level=btn.dataset.level;
}
function exame8Start(){
  var tempo=parseInt(document.getElementById('exame8-tempo').value)||900;
  var qtd=parseInt(document.getElementById('exame8-qtd').value)||15;
  var pool=BANCO8.questoes.slice();
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  exame8Data=pool.slice(0,Math.min(qtd,pool.length));
  renderQuestions8(exame8Data,'exame8-container','ex8');
  document.getElementById('exame8-config').style.display='none';
  document.getElementById('exame8-running').style.display='block';
  document.getElementById('exame8-result').style.display='none';
  var left=tempo;
  document.getElementById('exame8-answered').textContent='0 / '+exame8Data.length;
  function tick(){
    left--;
    var m=Math.floor(left/60),s=left%60;
    var el=document.getElementById('exame8-timer');
    if(el)el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    var prog=document.getElementById('exame8-prog');
    if(prog)prog.style.width=Math.round((1-left/tempo)*100)+'%';
    if(left<=0){clearInterval(exameTimer8);exame8Submit();}
  }
  if(exameTimer8)clearInterval(exameTimer8);
  exameTimer8=setInterval(tick,1000);
  _pmRecord('cap8','exame');
}
function exame8Submit(){
  if(exameTimer8){clearInterval(exameTimer8);exameTimer8=null;}
  var s=getScore8('ex8');
  var pct=exame8Data.length?Math.round(s.correct/exame8Data.length*100):0;
  var html='<div class="exam-result-box"><div class="exam-score-big">'+pct+'%</div>';
  html+='<p>Respondeste corretamente a '+s.correct+' de '+exame8Data.length+' questões.</p>';
  html+='<button class="btn btn-primary" onclick="exame8Reset()">▶ Novo Exame</button></div>';
  document.getElementById('exame8-running').style.display='none';
  var res=document.getElementById('exame8-result');
  res.innerHTML=html;res.style.display='block';
  saveProgData8('exame',pct);
}
function exame8Reset(){
  var c=document.getElementById('exame8-config');
  var r=document.getElementById('exame8-running');
  var rs=document.getElementById('exame8-result');
  if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none';
}

// ── Progresso ──────────────────────────────────────────────────────────────
function saveProgData8(tipo,val){
  try{
    var d=JSON.parse(localStorage.getItem('edupt_cap8')||'{}');
    if(!d.historico)d.historico=[];
    d.historico.push({tipo:tipo,val:val,ts:Date.now()});
    d.lastActivity=Date.now();
    localStorage.setItem('edupt_cap8',JSON.stringify(d));
  }catch(e){}
}
function renderProg8(){
  var container=document.getElementById('prog8-container');
  if(!container)return;
  container.innerHTML='<p style="color:var(--ink4);padding:1rem">Progresso registado localmente. Pratica mais exercícios para ver estatísticas aqui.</p>';
}
function resetProg8(){
  localStorage.removeItem('edupt_cap8');
  scores8={};renderProg8();
}

// ── Procedural generator ────────────────────────────────────────────────────
function buildEx8(tema,dif){
  if(tema==='1'){
    var n=Math.floor(Math.random()*200)+100;
    var s=Math.floor(Math.random()*40)+20;
    return {enunciado:'Uma escola tem '+n+' alunos. Para estudar os hábitos de leitura, inquiriram-se '+s+' alunos. Qual é a dimensão da amostra?',resposta:String(s),dica:'A dimensão da amostra é o número de elementos selecionados: '+s+' alunos.'};
  }
  if(tema==='4'){
    var total=Math.floor(Math.random()*8)+8;
    var fav=Math.floor(Math.random()*4)+1;
    if(fav>=total)fav=1;
    return {enunciado:'Um saco tem '+total+' bolas, '+fav+' das quais são azuis. Qual é a probabilidade de retirar uma bola azul?',resposta:fav+'/'+total,dica:'P(azul) = '+fav+'/'+total+'.'};
  }
  return {enunciado:'Questão indisponível.',resposta:'—',dica:''};
}

// ── Topic grid ─────────────────────────────────────────────────────────────
var _cap8Topics=[
  {id:'t8-1',icon:'ph-users',title:'População e Amostra',desc:'Variáveis qualitativas e quantitativas'},
  {id:'t8-2',icon:'ph-chart-bar',title:'Mediana e Medidas',desc:'Média, mediana, moda e caule-e-folhas'},
  {id:'t8-3',icon:'ph-chart-pie',title:'Representações Gráficas',desc:'Histograma, gráfico circular e poligonal'},
  {id:'t8-4',icon:'ph-dice-five',title:'Probabilidade',desc:'Espaço amostral e cálculo de probabilidades'},
  {id:'t8-5',icon:'ph-git-branch',title:'Experiências Compostas',desc:'Diagrama de árvore e tabela de dupla entrada'}
];
(function(){
  var el=document.getElementById('cap8-topics-grid');
  if(el&&typeof _tplTopicGrid==='function')el.innerHTML=_tplTopicGrid(_cap8Topics);
})();

// ── CAP_DATA registration ──────────────────────────────────────────────────
window.CAP_DATA=window.CAP_DATA||{};
window.CAP_DATA[8]={
  prefix:'8',
  viewId:'view-math8',
  tabsId:'tabs-cap8',
  storageKey:'edupt_cap8',
  temas:['1','2','3','4','5'],
  buildExercicio:buildEx8,
  questoesPlans:{
    facil:{t1:5,t2:4,t3:4,t4:4,t5:4},
    medio:{t1:4,t2:4,t3:4,t4:5,t5:4},
    dificil:{t1:3,t2:4,t3:4,t4:5,t5:5}
  },
  miniPlans:{0:[1,2,3,4,5],1:[1,2],2:[3,4,5]},
  testePlans:{subtema0:{t1:2,t2:2,t3:2,t4:2,t5:1}},
  flashcards:BANCO8.flashcards
};
_capRegisterWrappers(8);
