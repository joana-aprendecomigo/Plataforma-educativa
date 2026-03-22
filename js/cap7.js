// ── Cap 7 — Figuras Semelhantes ──────────────────────────────────────────────

function showMathView7(){
  _hideAllViews();
  var v=document.getElementById('view-math7');
  if(v)v.style.display='block';
  document.title = 'Figuras Semelhantes · 3ponto14';
  showSection7('temas7', document.querySelector('#tabs7 .tab-btn'));
  window.scrollTo(0,0);
}
function showSection7(id,btn){
  document.querySelectorAll('#sec-temas7,#sec-teoria7,#sec-questoes7,#sec-minitestes7,#sec-teste7,#sec-gerador7,#sec-jogos7,#sec-flashcards7,#sec-exame7,#sec-progresso7,#sec-downloads7,#sec-quiz-game7').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('#tabs7 .tab-btn').forEach(function(b){b.classList.remove('active');});
  var _s7=document.getElementById('sec-'+id);if(_s7)_s7.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math7').offsetTop,behavior:'smooth'});
  if(id==='questoes7')   { var _q7=document.getElementById('q7-container');  if(_q7 && !_q7.innerHTML) renderQuestoes7(); }
  if(id==='minitestes7') { var _m7=document.getElementById('m7-container');  if(_m7 && !_m7.innerHTML) showMini7(0, null); }
  if(id==='teste7')      { var _t7=document.getElementById('t7-container');  if(_t7 && !_t7.innerHTML) renderTeste7(); }
  if(id==='progresso7')renderProg7();
  if(id==='jogos7') _j24AutoInit('j24-wrap-cap7', 'dificil');
  if(id==='quiz-game7') { if(typeof qgStartForCap==='function') qgStartForCap(7); }
  if(id==='teoria7') _pmRecord('cap7','teoria');
  if(id==='flashcards7') _pmRecord('cap7','flashcard');
  var c7=document.getElementById('sec-'+id);
  if(c7) pmRenderWidget('cap7',c7);
}

// DATA BANK
var BANCO7={
  questoes:[
    // TEMA 1 — Figuras semelhantes e razão de semelhança
    {id:'q7-1',tema:1,enunciado:'Duas figuras são semelhantes quando uma pode ser obtida a partir da outra por uma transformação geométrica que:',opts:['A) Mantém as medidas dos lados e os ângulos','B) Preserva os ângulos e multiplica os lados por uma constante positiva','C) Mantém os lados mas altera os ângulos','D) Duplica sempre todos os lados'],correct:'B',fb:'Definição de figuras semelhantes: duas figuras são semelhantes quando os ângulos correspondentes são iguais e os lados correspondentes são proporcionais.\nA razão de proporcionalidade k (razão de semelhança) pode ser qualquer valor positivo.\nA opção A descreve figuras congruentes (k = 1), não apenas semelhantes. ✓'},
    {id:'q7-2',tema:1,enunciado:'O triângulo ABC é semelhante ao triângulo DEF, com AB = 4 cm e DE = 6 cm. A razão de semelhança k (de ABC para DEF) é:',opts:['A) 4/6 = 2/3','B) 6/4 = 3/2','C) 2','D) 10'],correct:'A',fb:'A razão de semelhança mede-se sempre de figura de origem para figura de destino.\nk = lado na figura de origem / lado na figura de destino = AB / DE = 4 / 6 = 2/3.\nComo k < 1, o triângulo DEF é maior do que ABC. ✓'},
    {id:'q7-3',tema:1,enunciado:'Num par de figuras semelhantes, se a razão de semelhança é k = 2, então os lados da segunda figura são:',opts:['A) Metade dos da primeira','B) Iguais aos da primeira','C) O dobro dos da primeira','D) Quatro vezes os da primeira'],correct:'C',fb:'Se k = 2, então: lado₂ = k × lado₁ = 2 × lado₁.\nPortanto os lados da segunda figura são o dobro dos da primeira.\nNota: a razão das áreas seria k² = 4, não os lados. ✓'},
    {id:'q7-4',tema:1,enunciado:'Dois retângulos são semelhantes. O primeiro tem lados 3 cm e 5 cm. O segundo tem um lado de 9 cm. Qual é o outro lado do segundo retângulo?',opts:['A) 12 cm','B) 15 cm','C) 18 cm','D) 20 cm'],correct:'B',fb:'Passo 1 — calcular a razão de semelhança:\nO lado conhecido corresponde ao lado de 3 cm → k = 9 / 3 = 3.\nPasso 2 — calcular o outro lado:\nOutro lado = 5 × k = 5 × 3 = 15 cm. ✓'},
    // TEMA 2 — Polígonos semelhantes
    {id:'q7-5',tema:2,enunciado:'Dois polígonos são semelhantes se e só se:',opts:['A) Têm o mesmo número de lados','B) Os ângulos correspondentes são iguais e os lados correspondentes são proporcionais','C) Têm o mesmo perímetro','D) Têm a mesma área'],correct:'B',fb:'A semelhança de polígonos exige DUAS condições em simultâneo:\n1. Ângulos correspondentes iguais\n2. Lados correspondentes proporcionais (mesma razão k)\nAtenção: ter o mesmo número de lados é necessário mas não suficiente — um quadrado e um retângulo têm 4 lados mas não são semelhantes. ✓'},
    {id:'q7-6',tema:2,enunciado:'Os quadriláteros ABCD e EFGH são semelhantes com k = 1/2. Se AB = 8 cm, qual é EF?',opts:['A) 4 cm','B) 8 cm','C) 16 cm','D) 12 cm'],correct:'A',fb:'Razão de semelhança k = 1/2 (de ABCD para EFGH).\nOs lados de EFGH = lados de ABCD × k.\nEF = AB × (1/2) = 8 × (1/2) = 4 cm.\nComo k < 1, EFGH é uma redução de ABCD. ✓'},
    {id:'q7-7',tema:2,enunciado:'Dois triângulos semelhantes têm lados 3, 4, 5 e 6, 8, ?. Qual é o lado que falta?',opts:['A) 8','B) 9','C) 10','D) 12'],correct:'C',fb:'Passo 1 — verificar e calcular k com os lados conhecidos:\n6/3 = 2 e 8/4 = 2 → k = 2 (confirmado, os lados são proporcionais).\nPasso 2 — calcular o lado que falta:\n? = 5 × k = 5 × 2 = 10 cm. ✓'},
    // TEMA 3 — Homotetia
    {id:'q7-8',tema:3,enunciado:'Uma homotetia de centro O e razão k = 2 transforma o ponto A(1, 2) no ponto A\'. Quais são as coordenadas de A\'?',opts:['A) (1, 2)','B) (2, 4)','C) (3, 4)','D) (4, 8)'],correct:'B',fb:'Fórmula da homotetia com centro na origem O(0,0) e razão k:\nA\'= (k × xₐ, k × yₐ)\nAplicando com k = 2 e A(1, 2):\nA\'= (2 × 1, 2 × 2) = (2, 4). ✓'},
    {id:'q7-9',tema:3,enunciado:'Uma homotetia de razão k = 3 transforma um segmento de comprimento 4 cm. Qual é o comprimento do segmento transformado?',opts:['A) 7 cm','B) 9 cm','C) 12 cm','D) 16 cm'],correct:'C',fb:'Na homotetia, os comprimentos (distâncias) multiplicam-se pelo valor absoluto de k:\ncomprimento\' = |k| × comprimento original\ncomprimento\' = |3| × 4 = 3 × 4 = 12 cm. ✓'},
    {id:'q7-10',tema:3,enunciado:'Numa homotetia de razão k = −2, o centro é O. O que acontece à figura transformada?',opts:['A) É ampliada com fator 2 e fica do mesmo lado do centro','B) É reduzida com fator 2','C) É ampliada com fator 2 e fica do lado oposto ao centro','D) É idêntica à original'],correct:'C',fb:'Numa homotetia de razão k:\n• |k| determina o fator de escala → |−2| = 2 (ampliação × 2)\n• sinal de k determina o lado: k > 0 = mesmo lado; k < 0 = lado oposto ao centro\nComo k = −2 < 0, a figura fica do lado oposto ao centro e é ampliada com fator 2. ✓'},
    {id:'q7-11',tema:3,enunciado:'O triângulo A\'B\'C\' é imagem de ABC por homotetia de razão k = 1/3. Se BC = 9 cm, qual é B\'C\'?',opts:['A) 2 cm','B) 3 cm','C) 6 cm','D) 27 cm'],correct:'B',fb:'Na homotetia de razão k, o comprimento do segmento transformado é:\nsegmento\' = |k| × segmento original\nB\'C\' = |1/3| × BC = (1/3) × 9 = 3 cm.\nComo k = 1/3 < 1, é uma redução (A\'B\'C\' é menor do que ABC). ✓'},
    // TEMA 4 — Critérios de semelhança de triângulos
    {id:'q7-12',tema:4,enunciado:'O critério AA (Ângulo-Ângulo) de semelhança de triângulos afirma que:',opts:['A) Se dois lados são proporcionais, os triângulos são semelhantes','B) Se dois ângulos de um triângulo são iguais a dois ângulos do outro, os triângulos são semelhantes','C) Se os três lados são proporcionais, os triângulos são semelhantes','D) Se um ângulo e o lado adjacente são iguais, os triângulos são semelhantes'],correct:'B',fb:'Critério AA (Ângulo-Ângulo):\nSe dois ângulos de um triângulo são iguais a dois ângulos do outro, os triângulos são semelhantes.\nPorquê? Porque a soma dos ângulos internos é sempre 180°, logo o terceiro ângulo também é igual. ✓'},
    {id:'q7-13',tema:4,enunciado:'Dois triângulos têm lados 3, 4, 5 e 6, 8, 10. São semelhantes pelo critério:',opts:['A) AA','B) LAL','C) LLL','D) Não são semelhantes'],correct:'C',fb:'Critério LLL — verificar se os três lados são proporcionais:\n6/3 = 2\n8/4 = 2\n10/5 = 2\nAs três razões são iguais → k = 2 → critério LLL confirma semelhança. ✓'},
    {id:'q7-14',tema:4,enunciado:'No critério LAL (Lado-Ângulo-Lado) de semelhança, é necessário que:',opts:['A) Três lados sejam proporcionais','B) Dois lados sejam proporcionais e o ângulo entre eles seja igual','C) Dois ângulos sejam iguais','D) Um lado e dois ângulos sejam iguais'],correct:'B',fb:'Critério LAL (Lado-Ângulo-Lado):\nCondição 1: dois pares de lados correspondentes têm a mesma razão k\nCondição 2: o ângulo compreendido entre esses dois lados é igual nos dois triângulos\nAtenção: o ângulo tem de ser o ângulo ENTRE os dois lados, não qualquer ângulo. ✓'},
    // TEMA 5 — Relações entre perímetros, áreas e escala
    {id:'q7-15',tema:5,enunciado:'Duas figuras semelhantes têm razão de semelhança k = 3. Qual é a razão entre os seus perímetros?',opts:['A) 1/3','B) 3','C) 9','D) 27'],correct:'B',fb:'Regra: a razão dos perímetros de figuras semelhantes é IGUAL à razão de semelhança k.\nPerímetro₂ / Perímetro₁ = k = 3.\nNota: k² seria a razão das áreas — não confundir! ✓'},
    {id:'q7-16',tema:5,enunciado:'Duas figuras semelhantes têm razão de semelhança k = 3. Qual é a razão entre as suas áreas?',opts:['A) 3','B) 6','C) 9','D) 27'],correct:'C',fb:'Regra: a razão das áreas de figuras semelhantes é k² (razão de semelhança ao quadrado).\nÁrea₂ / Área₁ = k² = 3² = 9.\nNota: k = 3 seria a razão dos lados/perímetros — as áreas crescem com o quadrado da escala. ✓'},
    {id:'q7-17',tema:5,enunciado:'Uma fotografia é ampliada com k = 4. Se a área original é 30 cm², qual é a área ampliada?',opts:['A) 120 cm²','B) 240 cm²','C) 480 cm²','D) 960 cm²'],correct:'C',fb:'Passo 1 — calcular a razão das áreas:\nRazão das áreas = k² = 4² = 16.\nPasso 2 — calcular a área ampliada:\nÁrea ampliada = Área original × k² = 30 × 16 = 480 cm². ✓'},
    {id:'q7-18',tema:5,enunciado:'O perímetro de um triângulo é 24 cm. Um triângulo semelhante tem razão de semelhança k = 1/2. Qual é o seu perímetro?',opts:['A) 6 cm','B) 12 cm','C) 48 cm','D) 96 cm'],correct:'B',fb:'A razão dos perímetros é igual à razão de semelhança k.\nPerímetro do 2.º triângulo = Perímetro₁ × k = 24 × (1/2) = 12 cm.\nVerificação: k = 1/2 < 1, logo o segundo triângulo é menor — 12 cm < 24 cm ✓'},
    // TEMA 6 — Poliedros regulares e Relação de Euler
    {id:'q7-19',tema:6,enunciado:'Qual é a relação de Euler para poliedros convexos?',opts:['A) V + A = F + 2','B) V − A + F = 2','C) V + F = A + 2','D) V × F = A'],correct:'B',fb:'Relação de Euler: V − A + F = 2\nonde: V = vértices, A = arestas, F = faces.\nExemplo de verificação com um cubo: V=8, A=12, F=6 → 8 − 12 + 6 = 2 ✓\nEsta relação vale para qualquer poliedro convexo. ✓'},
    {id:'q7-20',tema:6,enunciado:'Um cubo tem 8 vértices e 12 arestas. Quantas faces tem?',opts:['A) 4','B) 5','C) 6','D) 8'],correct:'C',fb:'Aplicar a Relação de Euler: V − A + F = 2\nSubstituir os valores conhecidos: 8 − 12 + F = 2\nIsolar F: F = 2 + 12 − 8 = 6 faces. ✓\n(Um cubo tem 6 faces quadradas — podes confirmar contando: frente, trás, esquerda, direita, cima, baixo.)'},
    {id:'q7-21',tema:6,enunciado:'Um octaedro regular tem 6 vértices e 8 faces. Quantas arestas tem?',opts:['A) 10','B) 12','C) 14','D) 16'],correct:'B',fb:'Aplicar a Relação de Euler: V − A + F = 2\nSubstituir os valores conhecidos: 6 − A + 8 = 2\nIsolar A: A = 6 + 8 − 2 = 12 arestas. ✓\n(Um octaedro é como dois quadrados pirâmides colados pela base — tem 12 arestas.)'},
    {id:'q7-22',tema:6,enunciado:'Qual dos seguintes poliedros regulares tem faces triangulares equiláteras?',opts:['A) Cubo','B) Dodecaedro','C) Tetraedro','D) Icosaedro e tetraedro'],correct:'D',fb:'Os 5 sólidos de Platão e as suas faces:\n• Tetraedro: 4 faces triangulares equiláteras ✓\n• Cubo: 6 faces quadradas\n• Octaedro: 8 faces triangulares equiláteras ✓\n• Dodecaedro: 12 faces pentagonais\n• Icosaedro: 20 faces triangulares equiláteras ✓\nPortanto, tanto o tetraedro como o icosaedro têm faces triangulares. ✓'},
    // QA extras — Figuras semelhantes
    {id:'q7-23',tema:1,enunciado:'As figuras A e B são semelhantes. A figura A tem um lado de 5 cm. A figura B tem o lado correspondente com 10 cm. Se a figura A tem um outro lado de 7 cm, qual é o comprimento do lado correspondente na figura B?',opts:['A) 7 cm','B) 12 cm','C) 14 cm','D) 17 cm'],correct:'C',fb:'Passo 1 — calcular a razão de semelhança k:\nk = lado em B / lado correspondente em A = 10 / 5 = 2.\nPasso 2 — aplicar k ao outro lado:\nLado correspondente = 7 × k = 7 × 2 = 14 cm. ✓'},
    {id:'q7-24',tema:2,enunciado:'Os triângulos ABC e DEF são semelhantes (na mesma ordem). AB = 6, BC = 8, CA = 10, DE = 9. Qual é EF?',opts:['A) 10','B) 12','C) 15','D) 18'],correct:'B',fb:'Passo 1 — identificar os lados correspondentes:\nABC ~ DEF (na mesma ordem) → AB↔DE, BC↔EF, CA↔FD.\nPasso 2 — calcular k com os lados conhecidos:\nk = DE / AB = 9 / 6 = 3/2.\nPasso 3 — calcular EF:\nEF = BC × k = 8 × (3/2) = 12. ✓'},
    {id:'q7-25',tema:5,enunciado:'Dois triângulos semelhantes têm áreas 16 cm² e 100 cm². Qual é a razão de semelhança (do menor para o maior)?',opts:['A) 4/10','B) 2/5','C) 4/25','D) 16/100'],correct:'B',fb:'Passo 1 — calcular a razão das áreas:\nRazão das áreas = 16/100 = 4/25.\nPasso 2 — saber que razão das áreas = k²:\nk² = 4/25.\nPasso 3 — calcular k:\nk = √(4/25) = 2/5. ✓\n(Verificação: (2/5)² = 4/25 ✓)'}
  ],
  minitestes:[
    [], // index 0 — gerado dinamicamente (todos)
    // Mini 1 — Figuras semelhantes e polígonos semelhantes (5 questões)
    [{en:'Duas figuras são semelhantes quando:',opts:['A) Têm a mesma forma e o mesmo tamanho','B) Têm a mesma forma mas podem ter tamanhos diferentes','C) Têm o mesmo tamanho mas formas diferentes','D) Têm a mesma área'],c:'B',fb:'Figuras semelhantes: mesma forma (ângulos correspondentes iguais e lados correspondentes proporcionais) mas podem ter tamanhos diferentes.\nFiguras com a mesma forma E tamanho são congruentes (caso especial em que k = 1). ✓'},
     {en:'O triângulo PQR é semelhante ao triângulo XYZ com k = 3/2. Se PQ = 4 cm, qual é XY?',opts:['A) 4 cm','B) 6 cm','C) 8 cm','D) 12 cm'],c:'B',fb:'k = 3/2 é a razão de semelhança de PQR para XYZ.\nXY = PQ × k = 4 × (3/2) = 6 cm.\nVerificação: XYZ é maior do que PQR (k > 1) → 6 > 4 ✓'},
     {en:'Dois retângulos são semelhantes. O primeiro tem dimensões 2 cm × 6 cm. O segundo tem a maior dimensão igual a 9 cm. Qual é a menor dimensão?',opts:['A) 2 cm','B) 3 cm','C) 4 cm','D) 6 cm'],c:'B',fb:'Passo 1 — identificar a correspondência: 9 cm corresponde à maior dimensão 6 cm.\nPasso 2 — calcular k: k = 9 / 6 = 3/2.\nPasso 3 — calcular a menor dimensão: 2 × (3/2) = 3 cm. ✓'},
     {en:'Se dois polígonos semelhantes têm razão de semelhança k = 2, o perímetro do maior é:',opts:['A) Igual ao do menor','B) O dobro do menor','C) O quádruplo do menor','D) A raiz quadrada do menor'],c:'B',fb:'Razão dos perímetros = razão de semelhança k.\nLogo Perímetro₂ / Perímetro₁ = k = 2 → Perímetro₂ = 2 × Perímetro₁.\nNota: o quádruplo seria a razão das áreas (k² = 4), não dos perímetros. ✓'},
     {en:'★ Dois triângulos semelhantes têm áreas 9 cm² e 36 cm². A razão de semelhança (do menor para o maior) é:',opts:['A) 1/4','B) 1/2','C) 3/4','D) 2/3'],c:'B',fb:'Passo 1 — razão das áreas: 9/36 = 1/4.\nPasso 2 — razão das áreas = k²: k² = 1/4.\nPasso 3 — k = √(1/4) = 1/2.\nVerificação: (1/2)² = 1/4 ✓'}],
    // Mini 2 — Homotetia e critérios de semelhança (5 questões)
    [{en:'Uma homotetia de razão k = 2 e centro na origem transforma o ponto A(3, 1) em A\'. Quais são as coordenadas de A\'?',opts:['A) (3, 1)','B) (5, 3)','C) (6, 2)','D) (1, 3)'],c:'C',fb:'Fórmula: homotetia com centro na origem e razão k → A\'= (k×x, k×y).\nA\'= (2×3, 2×1) = (6, 2). ✓'},
     {en:'Qual dos seguintes critérios é suficiente para garantir a semelhança de dois triângulos?',opts:['A) Dois lados iguais','B) Um ângulo igual','C) Dois ângulos iguais (AA)','D) Um lado e um ângulo iguais'],c:'C',fb:'Critério AA: dois ângulos iguais são suficientes para garantir semelhança de triângulos.\nPorquê? O terceiro ângulo é automaticamente igual: 180° − ângulo₁ − ângulo₂ = mesmo valor nos dois triângulos. ✓'},
     {en:'Pelo critério LLL, dois triângulos com lados 2, 3, 4 e 4, 6, 8 são semelhantes com k =',opts:['A) 1','B) 2','C) 3','D) 4'],c:'B',fb:'Verificar as três razões:\n4/2 = 2\n6/3 = 2\n8/4 = 2\nTodas iguais → critério LLL confirma semelhança com k = 2. ✓'},
     {en:'Uma homotetia de razão k = 1/2 transforma um segmento de 10 cm. Qual é o comprimento do segmento transformado?',opts:['A) 2 cm','B) 5 cm','C) 10 cm','D) 20 cm'],c:'B',fb:'Comprimento transformado = |k| × comprimento original\n= |1/2| × 10 = (1/2) × 10 = 5 cm.\nComo k = 1/2 < 1, é uma redução. ✓'},
     {en:'★ Um triângulo tem ângulos 40°, 60° e 80°. Outro tem ângulos 40°, 60° e 80°. São semelhantes pelo critério:',opts:['A) LLL','B) LAL','C) AA','D) Não são semelhantes'],c:'C',fb:'Os dois triângulos têm os mesmos três ângulos (40°, 60°, 80°).\nPelo critério AA, basta que dois ângulos sejam iguais (o terceiro fica determinado).\nPortanto são semelhantes pelo critério AA. ✓'}],
    // Mini 3 — Perímetros, áreas e Euler (5 questões)
    [{en:'Duas figuras semelhantes têm razão de semelhança k = 5. A razão das suas áreas é:',opts:['A) 5','B) 10','C) 25','D) 125'],c:'C',fb:'Razão das áreas = k² = 5² = 25.\nNota: k = 5 seria a razão dos perímetros e dos lados. Para as áreas usa-se sempre k². ✓'},
     {en:'Um tetraedro regular tem 4 vértices e 4 faces. Pelo relação de Euler, quantas arestas tem?',opts:['A) 4','B) 6','C) 8','D) 12'],c:'B',fb:'Relação de Euler: V − A + F = 2.\nSubstituir: 4 − A + 4 = 2.\nIsolar A: A = 4 + 4 − 2 = 6 arestas. ✓'},
     {en:'Dois triângulos semelhantes têm perímetros 15 cm e 45 cm. A razão de semelhança é:',opts:['A) 1/9','B) 1/3','C) 3','D) 9'],c:'B',fb:'Razão dos perímetros = razão de semelhança k.\nk = Perímetro₁ / Perímetro₂ = 15 / 45 = 1/3.\nComo k < 1, o primeiro triângulo é o menor. ✓'},
     {en:'Um dodecaedro regular tem 12 faces pentagonais e 20 vértices. Quantas arestas tem?',opts:['A) 24','B) 30','C) 36','D) 48'],c:'B',fb:'Relação de Euler: V − A + F = 2.\nSubstituir: 20 − A + 12 = 2.\nIsolar A: A = 20 + 12 − 2 = 30 arestas. ✓'},
     {en:'★ Duas figuras semelhantes têm áreas 4 cm² e 64 cm². Se o perímetro da menor é 8 cm, qual é o perímetro da maior?',opts:['A) 16 cm','B) 32 cm','C) 64 cm','D) 128 cm'],c:'B',fb:'Passo 1 — razão das áreas: 64/4 = 16.\nPasso 2 — razão das áreas = k²: k² = 16 → k = 4.\nPasso 3 — razão dos perímetros = k = 4:\nPerímetro da maior = 8 × 4 = 32 cm. ✓'}]
  ],
  teste:[
    {en:'O triângulo ABC é semelhante ao triângulo DEF, com k = 2/3. Se BC = 9 cm, qual é EF?',opts:['A) 4,5 cm','B) 6 cm','C) 9 cm','D) 13,5 cm'],c:'B',fb:'k = 2/3 é a razão de semelhança de ABC para DEF.\nEF = BC × k = 9 × (2/3) = 18/3 = 6 cm.\nVerificação: k < 1 → DEF é menor do que ABC → 6 < 9 ✓'},
    {en:'Uma homotetia de razão k = −1 e centro O transforma um quadrado num:',opts:['A) Quadrado com o dobro das dimensões','B) Quadrado idêntico do lado oposto ao centro','C) Triângulo','D) Círculo'],c:'B',fb:'k = −1: analisar separadamente o módulo e o sinal.\n• |k| = 1 → sem alteração de escala (dimensões iguais)\n• k < 0 → a figura fica do lado oposto ao centro\nResultado: é uma simetria central — quadrado idêntico no lado oposto ao centro. ✓'},
    {en:'Dois triângulos têm ângulos 50°, 70°, 60° e 50°, 70°, 60°. São semelhantes pelo critério:',opts:['A) LLL','B) LAL','C) AA','D) Não são semelhantes'],c:'C',fb:'Os dois triângulos têm ângulos iguais: 50°, 70°, 60°.\nO critério AA exige apenas dois ângulos iguais (o terceiro fica determinado: 180° − 50° − 70° = 60°).\nLogo são semelhantes pelo critério AA. ✓'},
    {en:'Uma figura tem perímetro 10 cm. Uma figura semelhante tem razão de semelhança k = 3. O seu perímetro é:',opts:['A) 13 cm','B) 20 cm','C) 30 cm','D) 90 cm'],c:'C',fb:'A razão dos perímetros é igual à razão de semelhança k.\nPerímetro₂ = Perímetro₁ × k = 10 × 3 = 30 cm.\nNota: a razão das áreas seria k² = 9 (90 cm² se fosse área) — não confundir. ✓'},
    {en:'A razão das áreas de duas figuras semelhantes é 1/9. Qual é a razão de semelhança?',opts:['A) 1/9','B) 1/3','C) 3','D) 9'],c:'B',fb:'Razão das áreas = k².\nk² = 1/9.\nk = √(1/9) = 1/3.\nVerificação: (1/3)² = 1/9 ✓'},
    {en:'Um poliedro tem 10 vértices e 15 arestas. Quantas faces tem?',opts:['A) 5','B) 7','C) 9','D) 25'],c:'B',fb:'Relação de Euler: V − A + F = 2.\nSubstituir: 10 − 15 + F = 2.\nIsolar F: F = 2 + 15 − 10 = 7 faces. ✓'},
    {en:'Duas figuras semelhantes têm k = 4. Se a área da menor é 5 cm², qual é a área da maior?',opts:['A) 20 cm²','B) 40 cm²','C) 80 cm²','D) 160 cm²'],c:'C',fb:'Passo 1 — calcular a razão das áreas:\nRazão das áreas = k² = 4² = 16.\nPasso 2 — calcular a área da maior:\nÁrea da maior = 5 × 16 = 80 cm². ✓'},
    {en:'Pelo critério LAL de semelhança, é necessário:',opts:['A) Três pares de lados proporcionais','B) Dois pares de lados proporcionais com o ângulo entre eles igual','C) Dois ângulos iguais','D) Apenas um lado igual'],c:'B',fb:'LAL (Lado-Ângulo-Lado):\nCondição 1: dois pares de lados são proporcionais com a mesma razão k\nCondição 2: o ângulo ENTRE esses dois lados é igual\nIsto distingue LAL do critério LLL (que precisa dos três lados) e do AA (que usa ângulos). ✓'}
  ],
  relampago:[
    {q:'A razão de semelhança entre duas figuras é k = 3. A razão das áreas é:',opts:['3','6','9','27'],c:2,fb:'Razão das áreas = k² = 3² = 9.'},
    {q:'Um cubo tem V = 8, A = 12. Quantas faces tem? (V − A + F = 2)',opts:['4','5','6','7'],c:2,fb:'8 − 12 + F = 2 → F = 6.'},
    {q:'Dois triângulos têm dois ângulos iguais. São semelhantes pelo critério:',opts:['LLL','LAL','AA','SAS'],c:2,fb:'Dois ângulos iguais → critério AA.'},
    {q:'Uma homotetia com k = 2 e centro O: o que acontece à figura?',opts:['Reduz para metade','Amplia para o dobro','Roda 180°','Translada'],c:1,fb:'|k| = 2 > 1 → ampliação. A figura fica com o dobro das dimensões.'},
    {q:'Dois lados proporcionais com k = 4 e ângulo entre eles igual. Critério:',opts:['AA','LLL','LAL','SAS'],c:2,fb:'Dois lados proporcionais com o ângulo entre eles → critério LAL.'},
    {q:'Uma figura tem área 8 cm². Com k = 2, a área da figura semelhante é:',opts:['16 cm²','32 cm²','64 cm²','4 cm²'],c:1,fb:'Área × k² = 8 × 4 = 32 cm².'},
    {q:'Um poliedro tem 6 faces e 12 arestas. Qual é o número de vértices?',opts:['6','8','10','12'],c:1,fb:'V − 12 + 6 = 2 → V = 8.'},
    {q:'Se k = 1/2, a figura semelhante é:',opts:['Ampliação','Redução','Simetria','Translação'],c:1,fb:'|k| = 1/2 < 1 → é uma redução.'},
    {q:'Razão de semelhança k = 5. Razão dos perímetros:',opts:['5','10','25','125'],c:0,fb:'A razão dos perímetros é igual a k = 5.'},
    {q:'Pelo critério LLL, precisamos de:',opts:['3 ângulos iguais','3 lados proporcionais','2 lados e 1 ângulo','2 ângulos iguais'],c:1,fb:'LLL exige os 3 pares de lados proporcionais.'}
  ],
  vf:[
    {q:'A razão das áreas de figuras semelhantes com k = 3 é 9.',c:true,fb:'k² = 3² = 9. Verdadeiro!'},
    {q:'Uma homotetia de razão k = −2 amplia e coloca a figura do mesmo lado do centro.',c:false,fb:'k < 0 → a figura fica no lado OPOSTO ao centro. Falso!'},
    {q:'O critério AA exige que os três ângulos dos triângulos sejam iguais.',c:false,fb:'AA exige apenas DOIS ângulos. O terceiro fica determinado automaticamente (soma = 180°). Falso!'},
    {q:'A Relação de Euler é V − A + F = 2.',c:true,fb:'Essa é a relação de Euler para poliedros convexos. Verdadeiro!'},
    {q:'Figuras semelhantes têm obrigatoriamente o mesmo tamanho.',c:false,fb:'Figuras semelhantes têm a mesma FORMA, mas não necessariamente o mesmo tamanho. Falso!'},
    {q:'Se k = 1, a homotetia deixa a figura invariante.',c:true,fb:'k = 1 → cada ponto fica no mesmo lugar. Verdadeiro!'},
    {q:'O critério LLL exige que os três pares de lados sejam iguais (não proporcionais).',c:false,fb:'LLL exige que sejam PROPORCIONAIS (mesma razão k). Igualdade seria congruência. Falso!'},
    {q:'Um prisma triangular tem 5 faces.',c:true,fb:'2 bases triangulares + 3 faces laterais = 5 faces. Verdadeiro!'},
    {q:'A razão dos perímetros de figuras semelhantes é k².',c:false,fb:'A razão dos PERÍMETROS é k. A razão das ÁREAS é k². Falso!'},
    {q:'Uma pirâmide quadrangular tem 5 vértices.',c:true,fb:'4 vértices da base + 1 vértice do topo = 5. Verdadeiro!'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que são figuras semelhantes?',a:'Duas figuras são semelhantes quando têm a mesma forma: os ângulos correspondentes são iguais e os lados correspondentes são proporcionais. A razão entre lados correspondentes chama-se razão de semelhança k.'},
    {tag:'Fórmula',q:'Qual é a relação entre os perímetros de figuras semelhantes?',a:'Se k é a razão de semelhança, a razão dos perímetros é também k.\nPerímetro₂ = k × Perímetro₁'},
    {tag:'Fórmula',q:'Qual é a relação entre as áreas de figuras semelhantes?',a:'Se k é a razão de semelhança, a razão das áreas é k².\nÁrea₂ = k² × Área₁'},
    {tag:'Definição',q:'O que é uma homotetia?',a:'Uma homotetia de centro O e razão k transforma cada ponto P no ponto P\' tal que OP\' = k × OP.\n• k > 0: a figura fica do mesmo lado de O\n• k < 0: a figura fica do lado oposto\n• |k| > 1: ampliação; |k| < 1: redução'},
    {tag:'Critério',q:'Quais são os critérios de semelhança de triângulos?',a:'• AA: dois ângulos iguais\n• LLL: três pares de lados proporcionais (mesma razão k)\n• LAL: dois pares de lados proporcionais e ângulo entre eles igual'},
    {tag:'Fórmula',q:'Qual é a Relação de Euler para poliedros convexos?',a:'V − A + F = 2\nonde:\nV = número de vértices\nA = número de arestas\nF = número de faces\nExemplo: cubo → 8 − 12 + 6 = 2 ✓'},
    {tag:'Definição',q:'Quais são os cinco poliedros regulares (sólidos de Platão)?',a:'1. Tetraedro: 4 faces triangulares\n2. Cubo (hexaedro): 6 faces quadradas\n3. Octaedro: 8 faces triangulares\n4. Dodecaedro: 12 faces pentagonais\n5. Icosaedro: 20 faces triangulares'},
    {tag:'Propriedade',q:'Como verificar se dois polígonos são semelhantes?',a:'É necessário verificar AS DUAS condições:\n1. Ângulos correspondentes iguais\n2. Lados correspondentes proporcionais (mesma razão k)\nAtenção: para triângulos basta verificar uma das condições (AA, LLL ou LAL).'}
  ]
};

// ── Score tracking ─────────────────────────────────────────────────────────
var scores7={};
function getScore7(prefix){return scores7[prefix]||(scores7[prefix]={correct:0,total:0});}
function updateScoreBar7(prefix){
  var s=getScore7(prefix);
  var pct=s.total?Math.round(s.correct/s.total*100):0;
  var bar=document.getElementById(prefix+'-score-bar');
  var lbl=document.getElementById(prefix+'-score-lbl');
  if(bar)bar.style.width=pct+'%';
  if(lbl)lbl.textContent=s.correct+'/'+s.total+' ('+pct+'%)';
}
function resetQuiz7(prefix){
  scores7[prefix]={correct:0,total:0};
  updateScoreBar7(prefix);
  var container=document.getElementById(prefix+'-container');
  if(container && prefix==='q7') renderQuestoes7();
  else if(container && prefix==='t7') renderTeste7();
}

function renderQuestions7(questions,containerId,prefix){
  var normed=questions.map(function(q,i){
    return {
      enun: q.en||q.enunciado||q.enun||'',
      opcoes: q.opts||[],
      resposta: q.c||q.correct||'',
      tipo: 'mc',
      expl: q.fb||'',
      visual: q.visual||q.vis||'',
      num: i+1,
      _capId: '7'
    };
  });
  qzInit(containerId, normed, prefix, function(correct,total){
    var s=getScore7(prefix);
    s.correct=correct; s.total=total;
    updateScoreBar7(prefix);
  });
}

// ── Questões-aula ──────────────────────────────────────────────────────────
function renderQuestoes7(){
  renderQuestions7(BANCO7.questoes,'q7-container','q7');
}

// ── Minitestes ─────────────────────────────────────────────────────────────
var _mini7Idx=0;
function showMini7(idx,btn){
  _mini7Idx=idx;
  var container=document.getElementById('m7-container');
  if(!container)return;
  var btns=document.querySelectorAll('#sec-minitestes7 .mini-tab-btn');
  btns.forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  if(idx===0){
    var all=[];
    for(var i=1;i<BANCO7.minitestes.length;i++){
      if(BANCO7.minitestes[i])all=all.concat(BANCO7.minitestes[i]);
    }
    renderQuestions7(all,'m7-container','m7all');
  } else {
    var qs=BANCO7.minitestes[idx]||[];
    renderQuestions7(qs,'m7-container','m7-'+idx);
  }
}

// ── Teste global ───────────────────────────────────────────────────────────
function renderTeste7(){renderQuestions7(BANCO7.teste,'t7-container','t7');}

// ── Flashcards ─────────────────────────────────────────────────────────────
var fc7Idx=0,fc7Flipped=false,fc7Order=[];
function initFlashcards7(){
  fc7Order=BANCO7.flashcards.map(function(_,i){return i;});
  fc7Show7();
}
function fc7Show7(){
  fc7Flipped=false;
  var el=document.getElementById('fc7-inner');
  if(el)el.style.transform='';
  var fc=BANCO7.flashcards[fc7Order[fc7Idx]];
  if(!fc)return;
  var tg=document.getElementById('fc7-tag');if(tg)tg.textContent=fc.tag;
  var qe=document.getElementById('fc7-q');if(qe)qe.textContent=fc.q;
  var ae=document.getElementById('fc7-a');if(ae)ae.textContent=fc.a;
  var n=fc7Order.length;
  var ctr=document.getElementById('fc7-counter');if(ctr)ctr.textContent=(fc7Idx+1)+' / '+n;
  var prog=document.getElementById('fc7-prog');if(prog)prog.style.width=Math.round((fc7Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc7-dots');
  if(dots){
    dots.innerHTML='';
    fc7Order.forEach(function(_,i){
      var d=document.createElement('div');
      d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc7Idx?'var(--c7-mid)':'var(--border2)');
      dots.appendChild(d);
    });
  }
}
function fc7Flip(){
  fc7Flipped=!fc7Flipped;
  var el=document.getElementById('fc7-inner');
  if(el)el.style.transform=fc7Flipped?'rotateY(180deg)':'';
}
function fc7Next(){fc7Idx=(fc7Idx+1)%fc7Order.length;fc7Show7();}
function fc7Prev(){fc7Idx=(fc7Idx-1+fc7Order.length)%fc7Order.length;fc7Show7();}
function fc7Shuffle(){
  for(var i=fc7Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc7Order[i];fc7Order[i]=fc7Order[j];fc7Order[j]=t;}
  fc7Idx=0;fc7Show7();
}

// ── Gerador / Ficha ────────────────────────────────────────────────────────
function gerarFicha7(){
  if(typeof _capGerarFichaInline==='function')
    _capGerarFichaInline(7,'gen7-nivel','gen7-output','dl-ficha7-btn','Figuras Semelhantes');
}
function downloadFicha7(){
  if(typeof _capDownloadFicha==='function') _capDownloadFicha(7,'Figuras Semelhantes');
}

// exame7SetLevel, exame7Start, exame7Stop, exame7Reset auto-gerados por _capRegisterWrappers(7)

// ── Progresso ──────────────────────────────────────────────────────────────
function saveProgData7(tipo,val){
  try{
    var d=JSON.parse(localStorage.getItem('edupt_cap7')||'{}');
    if(!d.historico)d.historico=[];
    d.historico.push({tipo:tipo,val:val,ts:Date.now()});
    d.lastActivity=Date.now();
    localStorage.setItem('edupt_cap7',JSON.stringify(d));
  }catch(e){}
}
function renderProg7(){
  if(typeof _progRenderCapitulosBar==='function') _progRenderCapitulosBar('prog7-caps', 7);
  if(typeof capProgRender==='function') capProgRender(7);
}
function resetProg7(){
  try{localStorage.removeItem('edupt_cap7');}catch(e){}
  if(typeof capProgReset==='function') capProgReset(7); else renderProg7();
}

// ── Procedural generator (for hub unified mode) ────────────────────────────
function buildEx7(tema,dif){
  if(tema==='1'){
    var k=Math.floor(Math.random()*4)+2;
    var l=Math.floor(Math.random()*6)+3;
    return {enunciado:'Duas figuras semelhantes têm razão de semelhança k = '+k+'. Se um lado da primeira mede '+l+' cm, qual é o lado correspondente na segunda?',resposta:String(k*l)+' cm',dica:'Multiplica o lado pela razão de semelhança: '+l+' × '+k+' = '+(k*l)+' cm.'};
  }
  if(tema==='5'){
    var k2=Math.floor(Math.random()*4)+2;
    var p=Math.floor(Math.random()*10)+10;
    return {enunciado:'Duas figuras semelhantes têm k = '+k2+'. O perímetro da menor é '+p+' cm. Qual é a área da maior se a área da menor é '+p+' cm²?',resposta:String(k2*k2*p)+' cm²',dica:'Razão das áreas = k² = '+(k2*k2)+'. Área da maior = '+(p)+' × '+(k2*k2)+' = '+(k2*k2*p)+' cm².'};
  }
  return {enunciado:'Questão indisponível.',resposta:'—',dica:''};
}

// ── Topic grid ─────────────────────────────────────────────────────────────
// ── Subtema support ─────────────────────────────────────────────────────────
var _cap7SubtemaTitulos = {
  '1': 'Figuras Semelhantes e Razão de Semelhança',
  '2': 'Polígonos Semelhantes',
  '3': 'Homotetia',
  '4': 'Critérios de Semelhança de Triângulos',
  '5': 'Perímetros, Áreas e Escala',
  '6': 'Poliedros e Relação de Euler'
};

function abrirSubtema7(tema) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  var titulo = _cap7SubtemaTitulos[String(tema)] || 'Prática';
  var exs = _bancoToSubtemaExs(BANCO7, tema);
  window._stContext = { titulo: titulo, gerador: function(){ return _bancoToSubtemaExs(BANCO7, tema); } };
  criarModalSubtema(titulo, exs);
}

var _cap7Topics=[
  {id:'t7-1',icon:'ph-equals',title:'Figuras Semelhantes',desc:'Razão de semelhança e condições de semelhança',subs:[
    {onclick:"abrirSubtema7('1')",label:'Praticar: Figuras Semelhantes',icon:'ph-pencil'}
  ]},
  {id:'t7-2',icon:'ph-polygon',title:'Polígonos Semelhantes',desc:'Ângulos e lados correspondentes proporcionais',subs:[
    {onclick:"abrirSubtema7('2')",label:'Praticar: Polígonos Semelhantes',icon:'ph-pencil'}
  ]},
  {id:'t7-3',icon:'ph-arrows-out',title:'Homotetia',desc:'Transformação geométrica com centro e razão',subs:[
    {onclick:"abrirSubtema7('3')",label:'Praticar: Homotetia',icon:'ph-pencil'}
  ]},
  {id:'t7-4',icon:'ph-triangle',title:'Semelhança de Triângulos',desc:'Critérios AA, LLL e LAL',subs:[
    {onclick:"abrirSubtema7('4')",label:'Praticar: Critérios AA, LLL e LAL',icon:'ph-pencil'}
  ]},
  {id:'t7-5',icon:'ph-ruler',title:'Perímetros, Áreas e Escala',desc:'Razões de perímetros (k) e áreas (k²)',subs:[
    {onclick:"abrirSubtema7('5')",label:'Praticar: Perímetros e Áreas',icon:'ph-pencil'}
  ]},
  {id:'t7-6',icon:'ph-cube',title:'Poliedros e Euler',desc:'V − A + F = 2 e sólidos de Platão',subs:[
    {onclick:"abrirSubtema7('6')",label:'Praticar: Relação de Euler',icon:'ph-pencil'}
  ]}
];
(function(){
  var el=document.getElementById('cap7-topics-grid');
  if(el&&typeof _tplTopicGrid==='function')el.innerHTML=_tplTopicGrid(_cap7Topics);
})();

// ── CAP_DATA registration ──────────────────────────────────────────────────
window.CAP_DATA=window.CAP_DATA||{};
window.CAP_DATA[7]={
  prefix:'7',
  viewId:'view-math7',
  tabsId:'tabs-cap7',
  storageKey:'edupt_cap7',
  temas:['1','2','3','4','5','6'],
  buildExercicio:buildEx7,
  questoesPlans:{
    facil:{t1:4,t2:3,t3:3,t4:4,t5:4,t6:3},
    medio:{t1:3,t2:3,t3:3,t4:4,t5:4,t6:3},
    dificil:{t1:2,t2:3,t3:4,t4:4,t5:5,t6:4}
  },
  miniPlans:{0:[1,2,3,4,5,6],1:[1,2,3],2:[4,5,6]},
  testePlans:{subtema0:{t1:2,t2:1,t3:1,t4:2,t5:1,t6:1}},
  flashcards:BANCO7.flashcards
};
_capRegisterWrappers(7);
