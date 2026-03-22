// ── Cap 6 — Funções ──────────────────────────────────────────────────────────

function showMathView6(){
  _hideAllViews();
  var v=document.getElementById('view-math6');
  if(v)v.style.display='block';
  document.title = 'Funções · 3ponto14';
  showSection6('temas6', document.querySelector('#tabs6 .tab-btn'));
  window.scrollTo(0,0);
}
function showSection6(id,btn){
  document.querySelectorAll('#sec-temas6,#sec-teoria6,#sec-questoes6,#sec-minitestes6,#sec-teste6,#sec-gerador6,#sec-jogos6,#sec-flashcards6,#sec-exame6,#sec-progresso6,#sec-downloads6,#sec-quiz-game6').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('#tabs6 .tab-btn').forEach(function(b){b.classList.remove('active');});
  var _s6=document.getElementById('sec-'+id);if(_s6)_s6.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math6').offsetTop,behavior:'smooth'});
  if(id==='questoes6')   { var _q6=document.getElementById('q6-container');  if(_q6 && !_q6.innerHTML) renderQuestoes6(); }
  if(id==='minitestes6') { var _m6=document.getElementById('m6-container');  if(_m6 && !_m6.innerHTML) showMini6(0, null); }
  if(id==='teste6')      { var _t6=document.getElementById('t6-container');  if(_t6 && !_t6.innerHTML) renderTeste6(); }
  if(id==='progresso6')renderProg6();
  if(id==='jogos6') _j24AutoInit('j24-wrap-cap6', 'dificil');
  if(id==='quiz-game6') { if(typeof qgStartForCap==='function') qgStartForCap(6); }
  if(id==='teoria6') _pmRecord('cap6','teoria');
  if(id==='flashcards6') _pmRecord('cap6','flashcard');
  var c6=document.getElementById('sec-'+id);
  if(c6) pmRenderWidget('cap6',c6);
}

// DATA BANK
var BANCO6={
  questoes:[
    // TEMA 1 — Referencial cartesiano
    {id:'q6-1',tema:1,enunciado:'Um ponto pertence ao eixo das ordenadas (Oy). Qual é a sua abcissa?',opts:['A) Qualquer valor','B) 0','C) 1','D) −1'],correct:'B',fb:'Regra: pontos no eixo Oy têm sempre abcissa = 0.\nO eixo Oy é a reta vertical que passa pela origem — todos os seus pontos têm a forma (0, y).\nLogo a abcissa é 0. ✓'},
    {id:'q6-2',tema:1,enunciado:'O ponto A(−3, 5) pertence ao:',opts:['A) 1.º quadrante','B) 2.º quadrante','C) 3.º quadrante','D) Eixo Ox'],correct:'B',fb:'Regra dos quadrantes: 2.º Q → abcissa < 0 e ordenada > 0.\nA(−3, 5): abcissa = −3 < 0 ✓ e ordenada = 5 > 0 ✓.\nLogo A pertence ao 2.º quadrante.'},
    {id:'q6-3',tema:1,enunciado:'O ponto F(5, 5) é refletido em relação ao eixo Ox. Quais são as coordenadas de F\'?',opts:["A) (−5, 5)","B) (5, 5)","C) (5, −5)","D) (−5, −5)"],correct:'C',fb:"Regra: reflexão em relação ao eixo Ox → (x, y) → (x, −y).\nA abcissa mantém-se; a ordenada muda de sinal.\nF(5, 5) → F'(5, −5). ✓"},
    {id:'q6-4',tema:1,enunciado:'O ponto K(3, 2) é refletido em relação ao eixo Oy. Quais são as coordenadas de K\'?',opts:["A) (3, 2)","B) (3, −2)","C) (−3, −2)","D) (−3, 2)"],correct:'D',fb:"Regra: reflexão em relação ao eixo Oy → (x, y) → (−x, y).\nA ordenada mantém-se; a abcissa muda de sinal.\nK(3, 2) → K'(−3, 2). ✓"},
    // TEMA 2 — Conceito de função
    {id:'q6-5',tema:2,enunciado:'Uma função f: A → B associa a cada elemento de A:',opts:['A) Pelo menos um elemento de B','B) Exatamente um elemento de B','C) Todos os elementos de B','D) Nenhum elemento de B'],correct:'B',fb:'Definição de função: cada objeto (elemento de A) tem EXATAMENTE UMA imagem em B.\nSe um objeto tiver 0 imagens → não é função.\nSe um objeto tiver 2+ imagens → não é função.\nA resposta é B: exatamente uma imagem. ✓'},
    {id:'q6-6',tema:2,enunciado:'Considera f com D<sub>f</sub> = {1, 2, 3}, f(1) = 4, f(2) = 5, f(3) = 4. O contradomínio D\'<sub>f</sub> é:',opts:["A) {4, 5, 4}","B) {4, 5}","C) {1, 2, 3}","D) {1, 2, 3, 4, 5}"],correct:'B',fb:'Contradomínio = conjunto das imagens efetivas (sem repetição).\nImagens: f(1) = 4, f(2) = 5, f(3) = 4.\nListar sem repetição: {4, 5}.\nNota: 4 aparece duas vezes mas conta só uma. ✓'},
    {id:'q6-7',tema:2,enunciado:'De uma função g: D<sub>g</sub> = {1, 2, 3, 4}, D\'<sub>g</sub> = {0, 3, 5}, g(1) = g(3) = 0, g(4) = 5. A imagem de 2 por g é:',opts:['A) 0','B) 2','C) 3','D) 5'],correct:'C',fb:'As imagens já definidas: g(1) = 0, g(3) = 0, g(4) = 5.\nO contradomínio é {0, 3, 5} — todas as três têm de ser usadas.\n0 e 5 já foram usadas. Falta usar o 3.\nLogo g(2) = 3. ✓'},
    // TEMA 3 — Representação gráfica
    {id:'q6-8',tema:3,enunciado:'Qual afirmação é verdadeira sobre o gráfico de uma função?',opts:['A) Cada valor de y tem exatamente um valor de x','B) Cada valor de x tem exatamente um valor de y','C) O gráfico deve ser sempre uma reta','D) Todos os pontos devem estar ligados'],correct:'B',fb:'Teste da reta vertical: traça retas verticais sobre o gráfico.\nCada reta vertical deve cortar o gráfico em NO MÁXIMO 1 ponto.\nIsso garante que cada x tem exatamente uma imagem y.\nUma circunferência, por exemplo, falha este teste → não é função.'},
    {id:'q6-9',tema:3,enunciado:'A função h: D<sub>h</sub> = {−1, 0, 1, 2} é definida por h(x) = x + 1. Qual afirmação é verdadeira?',opts:["A) D'<sub>h</sub> = {−1, 0, 1}","B) D<sub>h</sub> = {−1, 0, 1, 2}","C) h(0) = 0","D) h(−2) = h(2)"],correct:'B',fb:'Calcula cada imagem: h(−1)=0, h(0)=1, h(1)=2, h(2)=3.\nD_h = {−1, 0, 1, 2} é exatamente o domínio dado → B é verdadeiro ✓.\nD\'_h = {0, 1, 2, 3} (não {−1,0,1} → A errado).\nh(0) = 0+1 = 1 (não 0 → C errado). h(−2) não está definido → D errado.'},
    // TEMA 4 — Formas de representar
    {id:'q6-10',tema:4,enunciado:'Considera f: A → B com A = {0, 1, 2}, B = {−2, −1, 0, 2}, f(x) = x² − 2. O contradomínio de f é:',opts:["A) {−1, 2}","B) {−2, −1, 2}","C) {−2, −1, 0, 2}","D) {−2, −1, 0}"],correct:'B',fb:'Calcula a imagem de cada elemento do domínio:\nf(0) = 0² − 2 = −2\nf(1) = 1² − 2 = −1\nf(2) = 2² − 2 = 4 − 2 = 2\nContradomínio (sem repetição) = {−2, −1, 2}. ✓'},
    {id:'q6-11',tema:4,enunciado:'Considera f(x) = 1 + x², com domínio {0, 1, 2, 3}. Qual é o valor de f(1)?',opts:['A) 0','B) 1','C) 2','D) 3'],correct:'C',fb:'Substituir x = 1 na expressão:\nf(1) = 1 + 1² = 1 + 1 = 2. ✓'},
    {id:'q6-12',tema:4,enunciado:'Para f(x) = 1 + x² com domínio {0, 1, 2, 3}: se f(x) = 5, qual é o valor de x?',opts:['A) 2','B) 3','C) 0','D) 1'],correct:'A',fb:'Resolver a equação f(x) = 5:\n1 + x² = 5\nx² = 5 − 1 = 4\nx = 2 (verifica: pertence ao domínio {0,1,2,3} ✓)\nLogo x = 2. ✓'},
    // TEMA 5 — Proporcionalidade direta
    {id:'q6-13',tema:5,enunciado:'Considera uma função de proporcionalidade direta f com f(0,6) = 4,8. A constante de proporcionalidade é:',opts:['A) 0,125','B) 0,8','C) 8','D) 80'],correct:'C',fb:'Na proporcionalidade direta f(x) = kx, logo k = f(x) / x.\nk = f(0,6) / 0,6 = 4,8 / 0,6 = 8.\nLogo k = 8. ✓'},
    {id:'q6-14',tema:5,enunciado:'Numa função de proporcionalidade direta com k = 8, se f(a) = 12, então a é:',opts:['A) 1','B) 1,5','C) 2','D) 2,5'],correct:'B',fb:'A expressão é f(x) = 8x.\nResolver f(a) = 12:\n8a = 12\na = 12 / 8 = 1,5. ✓'},
    {id:'q6-15',tema:5,enunciado:'O ponto (6, 4) pertence ao gráfico de f(x) = kx. Qual é a expressão algébrica de f?',opts:['A) f(x) = (2/3)x','B) f(x) = (3/2)x','C) f(x) = 2x','D) f(x) = 24x'],correct:'A',fb:'Para encontrar k, usa o ponto (6, 4): f(6) = 4.\nk × 6 = 4\nk = 4/6 = 2/3.\nLogo f(x) = (2/3)x. ✓'},
    {id:'q6-16',tema:5,enunciado:'Uma loja aplica um desconto de 70% sobre o preço de venda v. A expressão do preço com desconto P(v) é:',opts:['A) P(v) = 0,7v','B) P(v) = 70v','C) P(v) = 30v','D) P(v) = 0,3v'],correct:'D',fb:'Com 70% de desconto, o cliente paga apenas 30% do preço original.\n100% − 70% = 30% = 0,30.\nP(v) = 0,30 × v = 0,3v. ✓\nAtenção: 0,7v seria o valor do desconto, não o preço final.'},
    // TEMA 6 — Gráficos em contexto real
    {id:'q6-17',tema:6,enunciado:'O alongamento f(x) de uma mola é proporcional à massa x. Se f(3) = 5 cm, qual é a expressão de f?',opts:['A) f(x) = (5/3)x','B) f(x) = (1/2)x','C) f(x) = (3/5)x','D) f(x) = 2x'],correct:'A',fb:'Como é proporcional, f(x) = kx.\nUsa o ponto conhecido: f(3) = 5, logo k × 3 = 5.\nk = 5/3.\nLogo f(x) = (5/3)x. ✓'},
    {id:'q6-18',tema:6,enunciado:'Usando f(x) = (5/3)x, qual é o alongamento da mola para uma massa de 6,3 kg?',opts:['A) 10','B) 10,5','C) 11','D) 11,5'],correct:'B',fb:'Substituir x = 6,3 na expressão f(x) = (5/3)x:\nf(6,3) = (5/3) × 6,3\n= 5 × (6,3/3)\n= 5 × 2,1 = 10,5 cm. ✓'},
    {id:'q6-19',tema:6,enunciado:'Usando f(x) = (5/3)x, qual é a massa (em kg) que provoca um alongamento de 10 cm?',opts:['A) 4','B) 5','C) 6','D) 7'],correct:'C',fb:'Resolver f(x) = 10:\n(5/3)x = 10\nx = 10 × (3/5)\nx = 30/5 = 6 kg. ✓'},
    {id:'q6-20',tema:6,enunciado:'Um bolo com 20 cm de diâmetro custa 10,40 €. A função preço é de proporcionalidade direta. Qual é o preço de um bolo com 25 cm?',opts:['A) 15,40 €','B) 13,40 €','C) 13,00 €','D) 12,25 €'],correct:'C',fb:'Passo 1 — encontrar k: k = preço / diâmetro = 10,40 / 20 = 0,52 €/cm.\nPasso 2 — calcular preço para 25 cm:\nP(25) = 0,52 × 25 = 13,00 €. ✓'},
    // QA 31 — Leitura de coordenadas no referencial
    {id:'q6-21',tema:1,enunciado:'As coordenadas dos pontos A, B, C e D representados no referencial são, respetivamente:',opts:['A) (2, 0), (3, 1), (0, 2), (−2, −3)','B) (0, 2), (1, 3), (2, 0), (−3, −2)','C) (2, 0), (1, 3), (0, 2), (−3, −2)','D) (0, 2), (3, 1), (2, 0), (−2, −3)'],correct:'D',fb:'Ler coordenadas: (abcissa, ordenada) = (horizontal, vertical).\nA: 0 unidades na horizontal, 2 na vertical → A(0, 2).\nB: 3 direita, 1 cima → B(3, 1).\nC: 2 direita, 0 → C(2, 0).\nD: 2 esquerda (−2), 3 baixo (−3) → D(−2, −3). ✓'},
    // QA 32 — Qual correspondência é função
    {id:'q6-22',tema:2,enunciado:'Qual das seguintes correspondências define uma função?',opts:['A) 1 → 2 e 1 → 3','B) 2 → 5 e 2 → 6','C) 1 → 3, 2 → 3, 3 → 3','D) 1 → 2, 2 → 3, 2 → 4'],correct:'C',fb:'Regra: cada objeto tem EXATAMENTE uma imagem.\nA: objeto 1 tem duas imagens (2 e 3) → não é função. ✗\nB: objeto 2 tem duas imagens (5 e 6) → não é função. ✗\nD: objeto 2 tem duas imagens (3 e 4) → não é função. ✗\nC: 1→3, 2→3, 3→3. Cada objeto tem uma só imagem (podem partilhar) → é função. ✓'},
    // QA 33 PRISMA — Qual gráfico representa uma função
    {id:'q6-23',tema:3,enunciado:'Qual dos seguintes gráficos representa uma função?',opts:['A) Uma circunferência completa','B) Uma elipse','C) Uma curva que, para certos x, tem dois valores de y','D) Uma reta oblíqua'],correct:'D',fb:'Aplica o teste da reta vertical a cada opção:\nA (circunferência): uma reta vertical corta-a em 2 pontos → não é função. ✗\nB (elipse): idem → não é função. ✗\nC: dois valores de y para o mesmo x → não é função. ✗\nD (reta oblíqua): cada reta vertical corta-a num único ponto → é função. ✓'},
    // QA 34 PRISMA — Contradomínio de h(x) = 2x
    {id:'q6-24',tema:2,enunciado:'O contradomínio da função h(x) = 2x com domínio {0, 1, 3, 5} é:',opts:['A) {0, 1, 3, 5}','B) {1, 2, 4, 6}','C) {2, 4, 6, 10}','D) {0, 2, 6, 10}'],correct:'D',fb:'Calcular a imagem de cada elemento do domínio:\nh(0) = 2×0 = 0\nh(1) = 2×1 = 2\nh(3) = 2×3 = 6\nh(5) = 2×5 = 10\nContradomínio = {0, 2, 6, 10}. ✓'},
    // QA 35 PRISMA — Qual tabela não é proporcionalidade direta
    {id:'q6-25',tema:5,enunciado:'Qual das seguintes tabelas NÃO representa uma função de proporcionalidade direta?',opts:['A) x: 2, 4, 6 → y: 4, 8, 12','B) x: 7, 14, 21 → y: 28, 55, 84','C) x: 3, 6, 9 → y: 6, 12, 18','D) x: 1, 2, 3 → y: 0,5; 1; 1,5'],correct:'B',fb:'Na proporcionalidade direta, o quociente y/x deve ser constante (= k).\nA: 4/2=2, 8/4=2, 12/6=2 → k=2 constante ✓\nB: 28/7=4, mas 55/14≈3,93 ≠ 4 → quociente não constante → NÃO é proporcional direta ✗\nC: 6/3=2, 12/6=2, 18/9=2 → k=2 ✓\nD: 0,5/1=0,5, 1/2=0,5, 1,5/3=0,5 → k=0,5 ✓\nLogo a resposta é B. ✓'},
    // QA 36 PRISMA — Gráfico deslocação
    {id:'q6-26',tema:6,enunciado:'O Pedro saiu de casa e foi ao supermercado, onde permaneceu algum tempo, regressando depois a casa. Qual dos seguintes gráficos melhor representa a sua deslocação em função do tempo?',opts:['A) Reta sempre crescente','B) Reta crescente, seguida de segmento horizontal, depois reta decrescente até 0','C) Reta sempre decrescente','D) Reta decrescente seguida de reta crescente'],correct:'B',fb:'Analisa cada fase:\nFase 1 — vai ao supermercado: distância aumenta → segmento CRESCENTE.\nFase 2 — está no supermercado: distância é constante → segmento HORIZONTAL.\nFase 3 — volta a casa: distância diminui até 0 → segmento DECRESCENTE até 0.\nO gráfico B representa exatamente estas três fases. ✓'},
    // QA 35 Texto — Qual correspondência é função
    {id:'q6-27',tema:2,enunciado:'Qual das seguintes correspondências define uma função?',opts:['A) A cada aluno corresponde o seu número de matrícula','B) A cada pessoa correspondem os seus números de telefone','C) A cada número inteiro correspondem as suas raízes quadradas reais','D) A cada cidade correspondem os seus habitantes'],correct:'A',fb:'Verifica se cada objeto tem EXATAMENTE uma imagem:\nA: cada aluno tem um único número de matrícula → é função ✓\nB: uma pessoa pode ter vários telefones → não é função ✗\nC: √4 = +2 ou −2 (dois valores) → não é função ✗\nD: uma cidade tem muitos habitantes → não é função ✗\nResposta: A. ✓'},
    // QA 36 Texto — Objeto cuja imagem é 5
    {id:'q6-28',tema:4,enunciado:'Considera a função f(x) = 2x + 3. Qual é o objeto cujo imagem é 5?',opts:['A) x = 1','B) x = 2','C) x = 3','D) x = 4'],correct:'A',fb:'Resolver f(x) = 5 em ordem a x:\n2x + 3 = 5\n2x = 5 − 3 = 2\nx = 1.\nVerificação: f(1) = 2(1) + 3 = 5 ✓'},
    // QA 37 Texto — Proporcionalidade direta verdadeira
    {id:'q6-29',tema:5,enunciado:'Qual das seguintes situações representa uma proporcionalidade direta?',opts:['A) A área de um círculo em função do seu raio','B) O tempo de viagem em função da velocidade (distância fixa)','C) A área de um quadrado em função do seu lado','D) O perímetro de um quadrado em função do seu lado'],correct:'D',fb:'Proporcionalidade direta: y = kx (grau 1, passa pela origem).\nA: A = πr² — grau 2, não direta. ✗\nB: t = d/v — inversa (não direta). ✗\nC: A = L² — grau 2, não direta. ✗\nD: P = 4L — grau 1, k = 4 → proporcionalidade direta ✓'},
    // QA 38 Texto — Ponto que não pertence ao gráfico
    {id:'q6-30',tema:5,enunciado:'O ponto (4, 10) pertence ao gráfico de f(x) = kx. Qual dos seguintes pontos NÃO pertence ao gráfico de f?',opts:['A) (2, 5)','B) (1; 2,5)','C) (0,4; 1)','D) (2/5; 2)'],correct:'D',fb:'Passo 1 — encontrar k: k = 10/4 = 2,5.\nPasso 2 — verificar cada ponto com f(x) = 2,5x:\nA: f(2) = 2,5×2 = 5 ✓\nB: f(1) = 2,5×1 = 2,5 ✓\nC: f(0,4) = 2,5×0,4 = 1 ✓\nD: f(2/5) = 2,5×(2/5) = 1 ≠ 2 → NÃO pertence ✗\nResposta: D. ✓'},
    // QA 39 Texto — f(2a) = 3, determinar f(3a)
    {id:'q6-31',tema:5,enunciado:'Seja f uma função de proporcionalidade direta. Se f(2a) = 3, então f(3a) é igual a:',opts:['A) 3','B) 6','C) 4','D) 9/2'],correct:'D',fb:'Como f é proporcionalidade direta, f(x) = kx.\nf(2a) = k × 2a = 2ka = 3 → ka = 3/2.\nf(3a) = k × 3a = 3 × ka = 3 × (3/2) = 9/2. ✓'},
    // QA 40 Texto — Problema dos queques
    {id:'q6-32',tema:5,enunciado:'4 queques custam 1,80 €. O João gastou 2,70 €. Quantos queques comprou o João?',opts:['A) 5','B) 6','C) 7','D) 8'],correct:'B',fb:'Passo 1 — encontrar o preço por queque:\n1,80 € ÷ 4 = 0,45 € por queque.\nPasso 2 — calcular quantos queques com 2,70 €:\n2,70 ÷ 0,45 = 6 queques. ✓'},
    // QA 41 Texto — Depósito de água
    {id:'q6-33',tema:6,enunciado:'Um depósito de água é enchido a uma taxa constante de 40 litros por minuto. Ao fim de 20 minutos o depósito está cheio. Qual é a capacidade do depósito?',opts:['A) 400 litros','B) 500 litros','C) 600 litros','D) 800 litros'],correct:'D',fb:'Taxa constante → proporcionalidade direta: V = taxa × tempo.\nV = 40 litros/min × 20 min = 800 litros.\nVerificação: 40 × 20 = 800 ✓'}
  ],
  minitestes:[
    [], // index 0 — gerado dinamicamente
    // Mini 1 — Referencial e conceito de função (5 questions)
    [{en:'Um ponto pertence ao eixo das abcissas (Ox). A sua ordenada é:',opts:['A) Qualquer valor','B) 0','C) 1','D) −1'],c:'B',fb:'Os pontos no eixo Ox têm ordenada 0.'},
     {en:'O ponto P(−2, −3) pertence ao:',opts:['A) 1.º quadrante','B) 2.º quadrante','C) 3.º quadrante','D) 4.º quadrante'],c:'C',fb:'No 3.º quadrante: abcissa < 0 e ordenada < 0. P(−2, −3): ambas negativas.'},
     {en:'A(4, −6) é refletido em relação ao eixo Ox. As coordenadas de A\' são:',opts:["A) (4, 6)","B) (−4, −6)","C) (−4, 6)","D) (4, −6)"],c:'A',fb:"Reflexão em Ox: abcissa mantém-se, ordenada muda de sinal. A(4, −6) → A'(4, 6)."},
     {en:'Numa função f com D<sub>f</sub> = {2, 4, 6}, f(2) = 1, f(4) = 3, f(6) = 1. O contradomínio é:',opts:["A) {1, 3, 1}","B) {2, 4, 6}","C) {1, 3}","D) {1, 2, 3, 4, 6}"],c:'C',fb:'O contradomínio é o conjunto das imagens efetivas sem repetição: {1, 3}.'},
     {en:'★ O ponto M(a, b) está no 2.º quadrante. Qual afirmação é obrigatoriamente verdadeira?',opts:['A) a > 0 e b > 0','B) a < 0 e b > 0','C) a > 0 e b < 0','D) a < 0 e b < 0'],c:'B',fb:'No 2.º quadrante: abcissa negativa (a < 0) e ordenada positiva (b > 0).'}],
    // Mini 2 — Proporcionalidade direta e gráficos (5 questions)
    [{en:'Qual das seguintes funções é de proporcionalidade direta?',opts:['A) f(x) = x + 3','B) f(x) = 3x','C) f(x) = x²','D) f(x) = 3'],c:'B',fb:'Proporcionalidade direta: f(x) = kx (sem constante aditiva, passa pela origem). f(x) = 3x ✓.'},
     {en:'A constante de proporcionalidade de f(x) = (2/3)x é:',opts:['A) 3/2','B) 2','C) 2/3','D) 3'],c:'C',fb:'Na forma f(x) = kx, k é a constante. Para f(x) = (2/3)x, k = 2/3.'},
     {en:'Uma função de proporcionalidade direta passa pelo ponto (4, 10). Qual é o valor de f(6)?',opts:['A) 12','B) 15','C) 18','D) 24'],c:'B',fb:'k = 10/4 = 2,5. f(6) = 2,5 × 6 = 15.'},
     {en:'O custo de x litros de combustível é dado por f(x) = 1,85x. Qual é o custo de 40 litros?',opts:['A) 72 €','B) 74 €','C) 76 €','D) 78 €'],c:'B',fb:'f(40) = 1,85 × 40 = 74 €.'},
     {en:'★ Numa função de proporcionalidade direta f, f(5) = 8. Qual é x tal que f(x) = 20?',opts:['A) 10,5','B) 11,5','C) 12,5','D) 13,5'],c:'C',fb:'k = 8/5 = 1,6. f(x) = 1,6x = 20 → x = 20/1,6 = 12,5.'}]
  ],
  teste:[
    {en:'O ponto B(0, −3) pertence ao:',opts:['A) Eixo Ox','B) Eixo Oy','C) 3.º quadrante','D) 4.º quadrante'],c:'B',fb:'Abcissa = 0 → pertence ao eixo das ordenadas (Oy).'},
    {en:'Considera g com D<sub>g</sub> = {0, 1, 4, 9}, g(0) = 0, g(1) = 0, g(4) = 2, g(9) = 6. O valor de g(1) − [g(4)]² × g(9) é:',opts:['A) −24','B) −23','C) 24','D) 36'],c:'A',fb:'g(1) − [g(4)]² × g(9) = 0 − [2]² × 6 = 0 − 4 × 6 = −24.'},
    {en:'Qual das seguintes correspondências NÃO é uma função?',opts:['A) f(x) = x + 1, domínio {1, 2, 3}','B) 1 → 2, 2 → 2, 3 → 2','C) 1 → 2, e também 1 → 4 (dois valores para o mesmo objeto)','D) f(x) = x², domínio {0, 1, 2}'],c:'C',fb:'Em C, o elemento 1 tem duas imagens (2 e 4), violando a definição de função.'},
    {en:'f: A → B com A = {0, 1, 2}, f(x) = x² − 2. O contradomínio é:',opts:["A) {−2, −1, 0, 2}","B) {−2, −1, 2}","C) {−1, 2}","D) {0, 1, 2}"],c:'B',fb:'f(0) = −2; f(1) = −1; f(2) = 2. D\'<sub>f</sub> = {−2, −1, 2}.'},
    {en:'O ponto (6, 4) pertence ao gráfico de f(x) = kx. A constante de proporcionalidade k é:',opts:['A) 2/3','B) 3/2','C) 2','D) 24'],c:'A',fb:'k = 4/6 = 2/3.'},
    {en:'Uma loja aplica desconto de 35% sobre todos os artigos. A expressão do preço com desconto g(x) é:',opts:['A) g(x) = 35x','B) g(x) = 0,35x','C) g(x) = 0,65x','D) g(x) = 65x'],c:'C',fb:'Com 35% de desconto, paga-se 65% do preço original: g(x) = 0,65x.'},
    {en:'Uma mola tem f(x) = (5/3)x. Que massa (em kg) provoca um alongamento de 10 cm?',opts:['A) 4','B) 5','C) 6','D) 7'],c:'C',fb:'(5/3)x = 10 → x = 10 × (3/5) = 6 kg.'},
    {en:'Uma função de proporcionalidade direta tem k = 0,52. Se f(x) = 13, qual é x?',opts:['A) 20','B) 25','C) 30','D) 35'],c:'B',fb:'0,52x = 13 → x = 13/0,52 = 25.'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que é um referencial cartesiano?',a:'Sistema de dois eixos perpendiculares (Ox e Oy) que se cruzam na origem O. Permite localizar pontos no plano com coordenadas (x, y) = (abcissa, ordenada).'},
    {tag:'Definição',q:'O que são a abcissa e a ordenada de um ponto P(x, y)?',a:'Abcissa = coordenada horizontal (x). Ordenada = coordenada vertical (y).\nEixo Ox: ordenada = 0. Eixo Oy: abcissa = 0.'},
    {tag:'Definição',q:'O que é uma função?',a:'Correspondência entre dois conjuntos A e B em que a cada elemento de A (objeto) corresponde EXATAMENTE uma imagem em B.\nSe um objeto não tiver imagem ou tiver mais de uma → não é função.'},
    {tag:'Definição',q:'O que é o domínio e o contradomínio de uma função?',a:'Domínio (D_f): conjunto de todos os objetos (conjunto A).\nContradomínio (D\'_f): conjunto de todas as imagens efetivas.\nD\'_f ⊆ B (pode ser menor que o conjunto de chegada B).'},
    {tag:'Fórmula',q:'Como se define uma função de proporcionalidade direta?',a:'f(x) = kx, onde k é a constante de proporcionalidade (k ≠ 0).\nO gráfico é uma reta que PASSA PELA ORIGEM O(0,0).\nComo calcular k: k = f(x)/x = y/x.'},
    {tag:'Propriedade',q:'Como se identificam os quadrantes no referencial cartesiano?',a:'1.º Q: x > 0, y > 0 (direita/cima)\n2.º Q: x < 0, y > 0 (esquerda/cima)\n3.º Q: x < 0, y < 0 (esquerda/baixo)\n4.º Q: x > 0, y < 0 (direita/baixo)'},
    {tag:'Definição',q:'O que é o teste da reta vertical?',a:'Um gráfico representa uma função se qualquer reta vertical intersecta o gráfico em NO MÁXIMO um ponto.\nSe cortar em 2+ pontos → não é função.'},
    {tag:'Fórmula',q:'Reflexão axial: como ficam as coordenadas?',a:'Reflexão em relação ao eixo Ox: (x, y) → (x, −y)\nA ordenada muda de sinal, abcissa mantém-se.\n\nReflexão em relação ao eixo Oy: (x, y) → (−x, y)\nA abcissa muda de sinal, ordenada mantém-se.'}
  ]
};

// ── Score tracking ─────────────────────────────────────────────────────────
var scores6={};
function getScore6(prefix){return scores6[prefix]||(scores6[prefix]={correct:0,total:0});}
function updateScoreBar6(prefix){
  var s=getScore6(prefix);
  var pct=s.total?Math.round(s.correct/s.total*100):0;
  var bar=document.getElementById(prefix+'-score-bar');
  var lbl=document.getElementById(prefix+'-score-lbl');
  if(bar)bar.style.width=pct+'%';
  if(lbl)lbl.textContent=s.correct+'/'+s.total+' ('+pct+'%)';
}
function resetQuiz6(prefix){
  scores6[prefix]={correct:0,total:0};
  updateScoreBar6(prefix);
  var container=document.getElementById(prefix+'-container');
  if(container && prefix==='q6') renderQuestoes6();
  else if(container && prefix==='t6') renderTeste6();
}

function renderQuestions6(questions,containerId,prefix){
  var normed=questions.map(function(q,i){
    return {
      enun: q.en||q.enunciado||q.enun||'',
      opcoes: q.opts||[],
      resposta: q.c||q.correct||'',
      tipo: 'mc',
      expl: q.fb||'',
      num: i+1,
      _capId: '6'
    };
  });
  qzInit(containerId, normed, prefix, function(correct,total){
    var s=getScore6(prefix);
    s.correct=correct; s.total=total;
    updateScoreBar6(prefix);
  });
}

// ── Questões-aula ──────────────────────────────────────────────────────────
function renderQuestoes6(){
  var qs=BANCO6.questoes;
  renderQuestions6(qs,'q6-container','q6');
}

// ── Minitestes ─────────────────────────────────────────────────────────────
var _mini6Idx=0;
function showMini6(idx,btn){
  _mini6Idx=idx;
  var container=document.getElementById('m6-container');
  if(!container)return;
  var btns=document.querySelectorAll('#sec-minitestes6 .mini-tab-btn');
  btns.forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  if(idx===0){
    var all=[];
    for(var i=1;i<BANCO6.minitestes.length;i++){
      if(BANCO6.minitestes[i])all=all.concat(BANCO6.minitestes[i]);
    }
    renderQuestions6(all,'m6-container','m6all');
  } else {
    var qs=BANCO6.minitestes[idx]||[];
    renderQuestions6(qs,'m6-container','m6-'+idx);
  }
}

// ── Teste global ───────────────────────────────────────────────────────────
function renderTeste6(){var qData6={};renderQuestions6(BANCO6.teste,'t6-container','t6');}

// ── Flashcards ─────────────────────────────────────────────────────────────
var fc6Idx=0,fc6Flipped=false,fc6Order=[];
function initFlashcards6(){
  fc6Order=BANCO6.flashcards.map(function(_,i){return i;});
  fc6Show6();
}
function fc6Show6(){
  fc6Flipped=false;
  var el=document.getElementById('fc6-inner');
  if(el)el.style.transform='';
  var fc=BANCO6.flashcards[fc6Order[fc6Idx]];
  if(!fc)return;
  var tg=document.getElementById('fc6-tag');if(tg)tg.textContent=fc.tag;
  var qe=document.getElementById('fc6-q');if(qe)qe.textContent=fc.q;
  var ae=document.getElementById('fc6-a');if(ae)ae.textContent=fc.a;
  var n=fc6Order.length;
  var ctr=document.getElementById('fc6-counter');if(ctr)ctr.textContent=(fc6Idx+1)+' / '+n;
  var prog=document.getElementById('fc6-prog');if(prog)prog.style.width=Math.round((fc6Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc6-dots');
  if(dots){
    dots.innerHTML='';
    fc6Order.forEach(function(_,i){
      var d=document.createElement('div');
      d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc6Idx?'var(--c6-mid)':'var(--border2)');
      dots.appendChild(d);
    });
  }
}
function fc6Flip(){
  fc6Flipped=!fc6Flipped;
  var el=document.getElementById('fc6-inner');
  if(el)el.style.transform=fc6Flipped?'rotateY(180deg)':'';
}
function fc6Next(){fc6Idx=(fc6Idx+1)%fc6Order.length;fc6Show6();}
function fc6Prev(){fc6Idx=(fc6Idx-1+fc6Order.length)%fc6Order.length;fc6Show6();}
function fc6Shuffle(){
  for(var i=fc6Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc6Order[i];fc6Order[i]=fc6Order[j];fc6Order[j]=t;}
  fc6Idx=0;fc6Show6();
}

// ── Gerador / Ficha ────────────────────────────────────────────────────────
function gerarFicha6(){
  var dif=document.querySelector('#sec-gerador6 .gen-level-btn.active');
  dif=dif?dif.dataset.level:'facil';
  var out=document.getElementById('gen-output6');
  if(!out)return;
  out.innerHTML='<p style="color:var(--ink4);text-align:center;padding:2rem">Ficha gerada — usa o botão Descarregar PDF.</p>';
}
function downloadFicha6(){
  if(typeof htmlToPdfDownload==='function')htmlToPdfDownload('gen-output6','ficha-funcoes.pdf');
}

// ── Exame cronometrado ─────────────────────────────────────────────────────
var exame6Level='medio',exameTimer6=null,exame6Data=[];
function exame6SetLevel(btn){
  document.querySelectorAll('#sec-exame6 .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  exame6Level=btn.dataset.level;
}
function exame6Start(){
  var tempo=parseInt(document.getElementById('exame6-tempo').value)||900;
  var qtd=parseInt(document.getElementById('exame6-qtd').value)||15;
  var pool=BANCO6.questoes.slice();
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  exame6Data=pool.slice(0,Math.min(qtd,pool.length));
  renderQuestions6(exame6Data,'exame6-container','ex6');
  document.getElementById('exame6-config').style.display='none';
  document.getElementById('exame6-running').style.display='block';
  document.getElementById('exame6-result').style.display='none';
  var left=tempo;
  document.getElementById('exame6-answered').textContent='0 / '+exame6Data.length;
  function tick(){
    left--;
    var m=Math.floor(left/60),s=left%60;
    var el=document.getElementById('exame6-timer');
    if(el)el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    var prog=document.getElementById('exame6-prog');
    if(prog)prog.style.width=Math.round((1-left/tempo)*100)+'%';
    if(left<=0){clearInterval(exameTimer6);exame6Submit();}
  }
  if(exameTimer6)clearInterval(exameTimer6);
  exameTimer6=setInterval(tick,1000);
  _pmRecord('cap6','exame');
}
function exame6Submit(){
  if(exameTimer6){clearInterval(exameTimer6);exameTimer6=null;}
  var s=getScore6('ex6');
  var pct=exame6Data.length?Math.round(s.correct/exame6Data.length*100):0;
  var html='<div class="exam-result-box"><div class="exam-score-big">'+pct+'%</div>';
  html+='<p>Respondeste corretamente a '+s.correct+' de '+exame6Data.length+' questões.</p>';
  html+='<button class="btn btn-primary" onclick="exame6Reset()">▶ Novo Exame</button></div>';
  document.getElementById('exame6-running').style.display='none';
  var res=document.getElementById('exame6-result');
  res.innerHTML=html;res.style.display='block';
  saveProgData6('exame',pct);
}
function exame6Reset(){
  var c=document.getElementById('exame6-config');
  var r=document.getElementById('exame6-running');
  var rs=document.getElementById('exame6-result');
  if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none';
}

// ── Progresso ──────────────────────────────────────────────────────────────
function saveProgData6(tipo,val){
  try{
    var d=JSON.parse(localStorage.getItem('edupt_cap6')||'{}');
    if(!d.historico)d.historico=[];
    d.historico.push({tipo:tipo,val:val,ts:Date.now()});
    d.lastActivity=Date.now();
    localStorage.setItem('edupt_cap6',JSON.stringify(d));
  }catch(e){}
}
function renderProg6(){
  var container=document.getElementById('prog6-container');
  if(!container)return;
  container.innerHTML='<p style="color:var(--ink4);padding:1rem">Progresso registado localmente. Pratica mais exercícios para ver estatísticas aqui.</p>';
}
function resetProg6(){
  localStorage.removeItem('edupt_cap6');
  scores6={};renderProg6();
}

// ── Procedural generator (for hub unified mode) ────────────────────────────
function buildEx6(tema,dif){
  // Tema 1: referencial
  if(tema==='1'){
    var x1=Math.floor(Math.random()*5)+1;
    var y1=Math.floor(Math.random()*5)+1;
    var q='O ponto A('+x1+', '+y1+') é refletido em relação ao eixo Ox. Qual é a ordenada de A\'?';
    var ans=-y1;
    return {enunciado:q,resposta:String(ans),dica:'Reflexão em Ox: abcissa mantém-se, ordenada muda de sinal.'};
  }
  // Tema 2: proporcionalidade
  if(tema==='2'){
    var k=Math.floor(Math.random()*8)+2;
    var x2=Math.floor(Math.random()*6)+2;
    var q2='Considera f(x) = '+k+'x. Qual é o valor de f('+x2+')?';
    return {enunciado:q2,resposta:String(k*x2),dica:'f(x) = kx. Substitui x = '+x2+': f('+x2+') = '+k+' × '+x2+' = '+(k*x2)+'.'};
  }
  return {enunciado:'Questão indisponível.',resposta:'—',dica:''};
}

// ── Topic grid ─────────────────────────────────────────────────────────────
var _cap6Topics=[
  {id:'t6-1',icon:'ph-map-pin',title:'Referencial Cartesiano',desc:'Abcissa, ordenada, quadrantes e reflexões axiais'},
  {id:'t6-2',icon:'ph-swap',title:'Conceito de Função',desc:'Domínio, contradomínio e conjunto de chegada'},
  {id:'t6-3',icon:'ph-chart-line',title:'Representação Gráfica',desc:'Ler e interpretar gráficos de funções'},
  {id:'t6-4',icon:'ph-arrows-horizontal',title:'Formas de Representar',desc:'Tabela, diagrama de setas e expressão algébrica'},
  {id:'t6-5',icon:'ph-line-segment',title:'Proporcionalidade Direta',desc:'f(x) = kx — constante e gráfico pela origem'},
  {id:'t6-6',icon:'ph-chart-bar',title:'Gráficos em Contexto Real',desc:'Interpretar funções em situações reais'}
];
(function(){
  var el=document.getElementById('cap6-topics-grid');
  if(el&&typeof _tplTopicGrid==='function')el.innerHTML=_tplTopicGrid(_cap6Topics);
})();

// ── CAP_DATA registration ──────────────────────────────────────────────────
window.CAP_DATA=window.CAP_DATA||{};
window.CAP_DATA[6]={
  prefix:'6',
  viewId:'view-math6',
  tabsId:'tabs-cap6',
  storageKey:'edupt_cap6',
  temas:['1','2','3','4','5','6'],
  buildExercicio:buildEx6,
  questoesPlans:{
    facil:{t1:4,t2:4,t3:2,t4:2,t5:4,t6:4},
    medio:{t1:3,t2:3,t3:3,t4:3,t5:5,t6:3},
    dificil:{t1:2,t2:2,t3:4,t4:4,t5:6,t6:4}
  },
  miniPlans:{0:[1,2,3,4,5,6],1:[1,2,3],2:[4,5,6]},
  testePlans:{subtema0:{t1:2,t2:1,t3:1,t4:1,t5:2,t6:1}},
  flashcards:BANCO6.flashcards
};
_capRegisterWrappers(6);
