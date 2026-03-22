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
    {id:'q7-1',tema:1,enunciado:'Duas figuras são semelhantes quando uma pode ser obtida a partir da outra por uma transformação geométrica que:',opts:['A) Mantém as medidas dos lados e os ângulos','B) Preserva os ângulos e multiplica os lados por uma constante positiva','C) Mantém os lados mas altera os ângulos','D) Duplica sempre todos os lados'],correct:'B',fb:'Duas figuras são semelhantes quando os ângulos correspondentes são iguais e os lados correspondentes são proporcionais (razão de semelhança k > 0).'},
    {id:'q7-2',tema:1,enunciado:'O triângulo ABC é semelhante ao triângulo DEF, com AB = 4 cm e DE = 6 cm. A razão de semelhança k (de ABC para DEF) é:',opts:['A) 4/6 = 2/3','B) 6/4 = 3/2','C) 2','D) 10'],correct:'A',fb:'A razão de semelhança é a razão entre lados correspondentes: k = AB/DE = 4/6 = 2/3.'},
    {id:'q7-3',tema:1,enunciado:'Num par de figuras semelhantes, se a razão de semelhança é k = 2, então os lados da segunda figura são:',opts:['A) Metade dos da primeira','B) Iguais aos da primeira','C) O dobro dos da primeira','D) Quatro vezes os da primeira'],correct:'C',fb:'Se k = 2 (de A para B), os lados de B são o dobro dos de A.'},
    {id:'q7-4',tema:1,enunciado:'Dois retângulos são semelhantes. O primeiro tem lados 3 cm e 5 cm. O segundo tem um lado de 9 cm. Qual é o outro lado do segundo retângulo?',opts:['A) 12 cm','B) 15 cm','C) 18 cm','D) 20 cm'],correct:'B',fb:'Razão de semelhança: k = 9/3 = 3. O outro lado: 5 × 3 = 15 cm.'},
    // TEMA 2 — Polígonos semelhantes
    {id:'q7-5',tema:2,enunciado:'Dois polígonos são semelhantes se e só se:',opts:['A) Têm o mesmo número de lados','B) Os ângulos correspondentes são iguais e os lados correspondentes são proporcionais','C) Têm o mesmo perímetro','D) Têm a mesma área'],correct:'B',fb:'A semelhança de polígonos exige duas condições: ângulos correspondentes iguais E lados correspondentes proporcionais.'},
    {id:'q7-6',tema:2,enunciado:'Os quadriláteros ABCD e EFGH são semelhantes com k = 1/2. Se AB = 8 cm, qual é EF?',opts:['A) 4 cm','B) 8 cm','C) 16 cm','D) 12 cm'],correct:'A',fb:'EF = AB × k = 8 × (1/2) = 4 cm.'},
    {id:'q7-7',tema:2,enunciado:'Dois triângulos semelhantes têm lados 3, 4, 5 e 6, 8, ?. Qual é o lado que falta?',opts:['A) 8','B) 9','C) 10','D) 12'],correct:'C',fb:'Razão k = 6/3 = 2. O lado faltante: 5 × 2 = 10 cm.'},
    // TEMA 3 — Homotetia
    {id:'q7-8',tema:3,enunciado:'Uma homotetia de centro O e razão k = 2 transforma o ponto A(1, 2) no ponto A\'. Quais são as coordenadas de A\'?',opts:['A) (1, 2)','B) (2, 4)','C) (3, 4)','D) (4, 8)'],correct:'B',fb:'Numa homotetia de razão k, as coordenadas do transformado são k vezes as do original (em relação ao centro O na origem): A\'= (2×1, 2×2) = (2, 4).'},
    {id:'q7-9',tema:3,enunciado:'Uma homotetia de razão k = 3 transforma um segmento de comprimento 4 cm. Qual é o comprimento do segmento transformado?',opts:['A) 7 cm','B) 9 cm','C) 12 cm','D) 16 cm'],correct:'C',fb:'Na homotetia de razão k, os comprimentos multiplicam-se por |k|: 4 × 3 = 12 cm.'},
    {id:'q7-10',tema:3,enunciado:'Numa homotetia de razão k = −2, o centro é O. O que acontece à figura transformada?',opts:['A) É ampliada com fator 2 e fica do mesmo lado do centro','B) É reduzida com fator 2','C) É ampliada com fator 2 e fica do lado oposto ao centro','D) É idêntica à original'],correct:'C',fb:'Quando k < 0, a figura é invertida (fica do lado oposto ao centro) e ampliada com fator |k| = 2.'},
    {id:'q7-11',tema:3,enunciado:'O triângulo A\'B\'C\' é imagem de ABC por homotetia de razão k = 1/3. Se BC = 9 cm, qual é B\'C\'?',opts:['A) 2 cm','B) 3 cm','C) 6 cm','D) 27 cm'],correct:'B',fb:'B\'C\' = BC × |k| = 9 × (1/3) = 3 cm.'},
    // TEMA 4 — Critérios de semelhança de triângulos
    {id:'q7-12',tema:4,enunciado:'O critério AA (Ângulo-Ângulo) de semelhança de triângulos afirma que:',opts:['A) Se dois lados são proporcionais, os triângulos são semelhantes','B) Se dois ângulos de um triângulo são iguais a dois ângulos do outro, os triângulos são semelhantes','C) Se os três lados são proporcionais, os triângulos são semelhantes','D) Se um ângulo e o lado adjacente são iguais, os triângulos são semelhantes'],correct:'B',fb:'Critério AA: dois ângulos iguais garantem semelhança (o terceiro ângulo é automaticamente igual pois a soma dos ângulos de um triângulo é 180°).'},
    {id:'q7-13',tema:4,enunciado:'Dois triângulos têm lados 3, 4, 5 e 6, 8, 10. São semelhantes pelo critério:',opts:['A) AA','B) LAL','C) LLL','D) Não são semelhantes'],correct:'C',fb:'Critério LLL: 6/3 = 8/4 = 10/5 = 2. Os três lados são proporcionais com k = 2. Os triângulos são semelhantes pelo critério LLL.'},
    {id:'q7-14',tema:4,enunciado:'No critério LAL (Lado-Ângulo-Lado) de semelhança, é necessário que:',opts:['A) Três lados sejam proporcionais','B) Dois lados sejam proporcionais e o ângulo entre eles seja igual','C) Dois ângulos sejam iguais','D) Um lado e dois ângulos sejam iguais'],correct:'B',fb:'LAL: dois pares de lados proporcionais com a mesma razão e o ângulo formado por esses lados igual nos dois triângulos.'},
    // TEMA 5 — Relações entre perímetros, áreas e escala
    {id:'q7-15',tema:5,enunciado:'Duas figuras semelhantes têm razão de semelhança k = 3. Qual é a razão entre os seus perímetros?',opts:['A) 1/3','B) 3','C) 9','D) 27'],correct:'B',fb:'A razão dos perímetros é igual à razão de semelhança k. Se k = 3, os perímetros têm razão 3.'},
    {id:'q7-16',tema:5,enunciado:'Duas figuras semelhantes têm razão de semelhança k = 3. Qual é a razão entre as suas áreas?',opts:['A) 3','B) 6','C) 9','D) 27'],correct:'C',fb:'A razão das áreas é k². Se k = 3, a razão das áreas é 3² = 9.'},
    {id:'q7-17',tema:5,enunciado:'Uma fotografia é ampliada com k = 4. Se a área original é 30 cm², qual é a área ampliada?',opts:['A) 120 cm²','B) 240 cm²','C) 480 cm²','D) 960 cm²'],correct:'C',fb:'Razão das áreas = k² = 4² = 16. Área ampliada = 30 × 16 = 480 cm².'},
    {id:'q7-18',tema:5,enunciado:'O perímetro de um triângulo é 24 cm. Um triângulo semelhante tem razão de semelhança k = 1/2. Qual é o seu perímetro?',opts:['A) 6 cm','B) 12 cm','C) 48 cm','D) 96 cm'],correct:'B',fb:'Razão dos perímetros = k = 1/2. Perímetro do triângulo menor = 24 × (1/2) = 12 cm.'},
    // TEMA 6 — Poliedros regulares e Relação de Euler
    {id:'q7-19',tema:6,enunciado:'Qual é a relação de Euler para poliedros convexos?',opts:['A) V + A = F + 2','B) V − A + F = 2','C) V + F = A + 2','D) V × F = A'],correct:'B',fb:'Relação de Euler: V − A + F = 2, onde V = número de vértices, A = número de arestas, F = número de faces.'},
    {id:'q7-20',tema:6,enunciado:'Um cubo tem 8 vértices e 12 arestas. Quantas faces tem?',opts:['A) 4','B) 5','C) 6','D) 8'],correct:'C',fb:'Pela relação de Euler: V − A + F = 2 → 8 − 12 + F = 2 → F = 2 + 12 − 8 = 6 faces.'},
    {id:'q7-21',tema:6,enunciado:'Um octaedro regular tem 6 vértices e 8 faces. Quantas arestas tem?',opts:['A) 10','B) 12','C) 14','D) 16'],correct:'B',fb:'Relação de Euler: V − A + F = 2 → 6 − A + 8 = 2 → A = 12 arestas.'},
    {id:'q7-22',tema:6,enunciado:'Qual dos seguintes poliedros regulares tem faces triangulares equiláteras?',opts:['A) Cubo','B) Dodecaedro','C) Tetraedro','D) Icosaedro e tetraedro'],correct:'D',fb:'Tetraedro (4 triângulos), octaedro (8 triângulos) e icosaedro (20 triângulos) têm faces triangulares. O cubo tem quadrados e o dodecaedro tem pentágonos.'},
    // QA extras — Figuras semelhantes
    {id:'q7-23',tema:1,enunciado:'As figuras A e B são semelhantes. A figura A tem um lado de 5 cm. A figura B tem o lado correspondente com 10 cm. Se a figura A tem um outro lado de 7 cm, qual é o comprimento do lado correspondente na figura B?',opts:['A) 7 cm','B) 12 cm','C) 14 cm','D) 17 cm'],correct:'C',fb:'k = 10/5 = 2. Lado correspondente: 7 × 2 = 14 cm.'},
    {id:'q7-24',tema:2,enunciado:'Os triângulos ABC e DEF são semelhantes (na mesma ordem). AB = 6, BC = 8, CA = 10, DE = 9. Qual é EF?',opts:['A) 10','B) 12','C) 15','D) 18'],correct:'B',fb:'k = DE/AB = 9/6 = 3/2. EF = BC × k = 8 × (3/2) = 12.'},
    {id:'q7-25',tema:5,enunciado:'Dois triângulos semelhantes têm áreas 16 cm² e 100 cm². Qual é a razão de semelhança (do menor para o maior)?',opts:['A) 4/10','B) 2/5','C) 4/25','D) 16/100'],correct:'B',fb:'Razão das áreas = k². k² = 16/100 = 4/25. k = 2/5.'}
  ],
  minitestes:[
    [], // index 0 — gerado dinamicamente (todos)
    // Mini 1 — Figuras semelhantes e polígonos semelhantes (5 questões)
    [{en:'Duas figuras são semelhantes quando:',opts:['A) Têm a mesma forma e o mesmo tamanho','B) Têm a mesma forma mas podem ter tamanhos diferentes','C) Têm o mesmo tamanho mas formas diferentes','D) Têm a mesma área'],c:'B',fb:'Figuras semelhantes têm a mesma forma (ângulos iguais, lados proporcionais) mas podem ter tamanhos diferentes.'},
     {en:'O triângulo PQR é semelhante ao triângulo XYZ com k = 3/2. Se PQ = 4 cm, qual é XY?',opts:['A) 4 cm','B) 6 cm','C) 8 cm','D) 12 cm'],c:'B',fb:'XY = PQ × k = 4 × (3/2) = 6 cm.'},
     {en:'Dois retângulos são semelhantes. O primeiro tem dimensões 2 cm × 6 cm. O segundo tem a maior dimensão igual a 9 cm. Qual é a menor dimensão?',opts:['A) 2 cm','B) 3 cm','C) 4 cm','D) 6 cm'],c:'B',fb:'k = 9/6 = 3/2. Menor dimensão: 2 × (3/2) = 3 cm.'},
     {en:'Se dois polígonos semelhantes têm razão de semelhança k = 2, o perímetro do maior é:',opts:['A) Igual ao do menor','B) O dobro do menor','C) O quádruplo do menor','D) A raiz quadrada do menor'],c:'B',fb:'A razão dos perímetros é igual à razão de semelhança k. Logo, o perímetro do maior é o dobro do menor.'},
     {en:'★ Dois triângulos semelhantes têm áreas 9 cm² e 36 cm². A razão de semelhança (do menor para o maior) é:',opts:['A) 1/4','B) 1/2','C) 3/4','D) 2/3'],c:'B',fb:'k² = 9/36 = 1/4. k = 1/2.'}],
    // Mini 2 — Homotetia e critérios de semelhança (5 questões)
    [{en:'Uma homotetia de razão k = 2 e centro na origem transforma o ponto A(3, 1) em A\'. Quais são as coordenadas de A\'?',opts:['A) (3, 1)','B) (5, 3)','C) (6, 2)','D) (1, 3)'],c:'C',fb:'Homotetia de razão k=2, centro na origem: A\'=(2×3, 2×1)=(6, 2).'},
     {en:'Qual dos seguintes critérios é suficiente para garantir a semelhança de dois triângulos?',opts:['A) Dois lados iguais','B) Um ângulo igual','C) Dois ângulos iguais (AA)','D) Um lado e um ângulo iguais'],c:'C',fb:'Critério AA: dois ângulos iguais são suficientes para garantir semelhança.'},
     {en:'Pelo critério LLL, dois triângulos com lados 2, 3, 4 e 4, 6, 8 são semelhantes com k =',opts:['A) 1','B) 2','C) 3','D) 4'],c:'B',fb:'4/2 = 6/3 = 8/4 = 2. Critério LLL confirma semelhança com k = 2.'},
     {en:'Uma homotetia de razão k = 1/2 transforma um segmento de 10 cm. Qual é o comprimento do segmento transformado?',opts:['A) 2 cm','B) 5 cm','C) 10 cm','D) 20 cm'],c:'B',fb:'|k| × comprimento = (1/2) × 10 = 5 cm.'},
     {en:'★ Um triângulo tem ângulos 40°, 60° e 80°. Outro tem ângulos 40°, 60° e 80°. São semelhantes pelo critério:',opts:['A) LLL','B) LAL','C) AA','D) Não são semelhantes'],c:'C',fb:'Dois ângulos iguais (por exemplo 40° e 60°) garantem semelhança pelo critério AA.'}],
    // Mini 3 — Perímetros, áreas e Euler (5 questões)
    [{en:'Duas figuras semelhantes têm razão de semelhança k = 5. A razão das suas áreas é:',opts:['A) 5','B) 10','C) 25','D) 125'],c:'C',fb:'Razão das áreas = k² = 5² = 25.'},
     {en:'Um tetraedro regular tem 4 vértices e 4 faces. Pelo relação de Euler, quantas arestas tem?',opts:['A) 4','B) 6','C) 8','D) 12'],c:'B',fb:'V − A + F = 2 → 4 − A + 4 = 2 → A = 6 arestas.'},
     {en:'Dois triângulos semelhantes têm perímetros 15 cm e 45 cm. A razão de semelhança é:',opts:['A) 1/9','B) 1/3','C) 3','D) 9'],c:'B',fb:'Razão dos perímetros = k. k = 15/45 = 1/3.'},
     {en:'Um dodecaedro regular tem 12 faces pentagonais e 20 vértices. Quantas arestas tem?',opts:['A) 24','B) 30','C) 36','D) 48'],c:'B',fb:'V − A + F = 2 → 20 − A + 12 = 2 → A = 30 arestas.'},
     {en:'★ Duas figuras semelhantes têm áreas 4 cm² e 64 cm². Se o perímetro da menor é 8 cm, qual é o perímetro da maior?',opts:['A) 16 cm','B) 32 cm','C) 64 cm','D) 128 cm'],c:'B',fb:'k² = 64/4 = 16, logo k = 4. Razão dos perímetros = k = 4. Perímetro da maior: 8 × 4 = 32 cm.'}]
  ],
  teste:[
    {en:'O triângulo ABC é semelhante ao triângulo DEF, com k = 2/3. Se BC = 9 cm, qual é EF?',opts:['A) 4,5 cm','B) 6 cm','C) 9 cm','D) 13,5 cm'],c:'B',fb:'EF = BC × k = 9 × (2/3) = 6 cm.'},
    {en:'Uma homotetia de razão k = −1 e centro O transforma um quadrado num:',opts:['A) Quadrado com o dobro das dimensões','B) Quadrado idêntico do lado oposto ao centro','C) Triângulo','D) Círculo'],c:'B',fb:'k = −1 é uma simetria central em relação a O. A figura fica no lado oposto ao centro e com as mesmas dimensões.'},
    {en:'Dois triângulos têm ângulos 50°, 70°, 60° e 50°, 70°, 60°. São semelhantes pelo critério:',opts:['A) LLL','B) LAL','C) AA','D) Não são semelhantes'],c:'C',fb:'Dois ângulos iguais → critério AA. São semelhantes.'},
    {en:'Uma figura tem perímetro 10 cm. Uma figura semelhante tem razão de semelhança k = 3. O seu perímetro é:',opts:['A) 13 cm','B) 20 cm','C) 30 cm','D) 90 cm'],c:'C',fb:'Razão dos perímetros = k. Perímetro = 10 × 3 = 30 cm.'},
    {en:'A razão das áreas de duas figuras semelhantes é 1/9. Qual é a razão de semelhança?',opts:['A) 1/9','B) 1/3','C) 3','D) 9'],c:'B',fb:'k² = 1/9 → k = 1/3.'},
    {en:'Um poliedro tem 10 vértices e 15 arestas. Quantas faces tem?',opts:['A) 5','B) 7','C) 9','D) 25'],c:'B',fb:'V − A + F = 2 → 10 − 15 + F = 2 → F = 7.'},
    {en:'Duas figuras semelhantes têm k = 4. Se a área da menor é 5 cm², qual é a área da maior?',opts:['A) 20 cm²','B) 40 cm²','C) 80 cm²','D) 160 cm²'],c:'C',fb:'Razão das áreas = k² = 16. Área da maior = 5 × 16 = 80 cm².'},
    {en:'Pelo critério LAL de semelhança, é necessário:',opts:['A) Três pares de lados proporcionais','B) Dois pares de lados proporcionais com o ângulo entre eles igual','C) Dois ângulos iguais','D) Apenas um lado igual'],c:'B',fb:'LAL: dois pares de lados proporcionais e o ângulo entre eles igual.'}
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
  var container=document.getElementById(containerId);
  if(!container)return;
  var s=getScore7(prefix);s.correct=0;s.total=questions.length;
  updateScoreBar7(prefix);
  var html='';
  questions.forEach(function(q,i){
    var en=q.en||q.enunciado||q.enun||'';
    var opts=q.opts||[];
    html+='<div class="q-card" id="'+prefix+'-card-'+i+'">';
    html+='<div class="q-num">'+(i+1)+'</div>';
    html+='<div class="q-text">'+en+'</div>';
    html+='<div class="q-opts">';
    opts.forEach(function(o,j){
      html+='<button class="q-opt" onclick="ans7(\''+prefix+'\','+i+',this,\''+String.fromCharCode(65+j)+'\',\''+(q.c||q.correct)+'\')">'+o+'</button>';
    });
    html+='</div>';
    if(q.fb){html+='<div class="q-feedback" id="'+prefix+'-fb-'+i+'" style="display:none">'+q.fb+'</div>';}
    html+='</div>';
  });
  container.innerHTML=html;
}

function ans7(prefix,idx,btn,chosen,correct){
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
  var s=getScore7(prefix);
  if(ok)s.correct++;
  updateScoreBar7(prefix);
  _etRecord('cap7',chosen,correct,idx);
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
  var out=document.getElementById('gen-output7');
  if(!out)return;
  out.innerHTML='<p style="color:var(--ink4);text-align:center;padding:2rem">Ficha gerada — usa o botão Descarregar PDF.</p>';
}
function downloadFicha7(){
  if(typeof htmlToPdfDownload==='function')htmlToPdfDownload('gen-output7','ficha-figuras-semelhantes.pdf');
}

// ── Exame cronometrado ─────────────────────────────────────────────────────
var exame7Level='medio',exameTimer7=null,exame7Data=[];
function exame7SetLevel(btn){
  document.querySelectorAll('#sec-exame7 .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  exame7Level=btn.dataset.level;
}
function exame7Start(){
  var tempo=parseInt(document.getElementById('exame7-tempo').value)||900;
  var qtd=parseInt(document.getElementById('exame7-qtd').value)||15;
  var pool=BANCO7.questoes.slice();
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  exame7Data=pool.slice(0,Math.min(qtd,pool.length));
  renderQuestions7(exame7Data,'exame7-container','ex7');
  document.getElementById('exame7-config').style.display='none';
  document.getElementById('exame7-running').style.display='block';
  document.getElementById('exame7-result').style.display='none';
  var left=tempo;
  document.getElementById('exame7-answered').textContent='0 / '+exame7Data.length;
  function tick(){
    left--;
    var m=Math.floor(left/60),s=left%60;
    var el=document.getElementById('exame7-timer');
    if(el)el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    var prog=document.getElementById('exame7-prog');
    if(prog)prog.style.width=Math.round((1-left/tempo)*100)+'%';
    if(left<=0){clearInterval(exameTimer7);exame7Submit();}
  }
  if(exameTimer7)clearInterval(exameTimer7);
  exameTimer7=setInterval(tick,1000);
  _pmRecord('cap7','exame');
}
function exame7Submit(){
  if(exameTimer7){clearInterval(exameTimer7);exameTimer7=null;}
  var s=getScore7('ex7');
  var pct=exame7Data.length?Math.round(s.correct/exame7Data.length*100):0;
  var html='<div class="exam-result-box"><div class="exam-score-big">'+pct+'%</div>';
  html+='<p>Respondeste corretamente a '+s.correct+' de '+exame7Data.length+' questões.</p>';
  html+='<button class="btn btn-primary" onclick="exame7Reset()">▶ Novo Exame</button></div>';
  document.getElementById('exame7-running').style.display='none';
  var res=document.getElementById('exame7-result');
  res.innerHTML=html;res.style.display='block';
  saveProgData7('exame',pct);
}
function exame7Reset(){
  var c=document.getElementById('exame7-config');
  var r=document.getElementById('exame7-running');
  var rs=document.getElementById('exame7-result');
  if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none';
}

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
  var container=document.getElementById('prog7-container');
  if(!container)return;
  container.innerHTML='<p style="color:var(--ink4);padding:1rem">Progresso registado localmente. Pratica mais exercícios para ver estatísticas aqui.</p>';
}
function resetProg7(){
  localStorage.removeItem('edupt_cap7');
  scores7={};renderProg7();
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
var _cap7Topics=[
  {id:'t7-1',icon:'ph-equals',title:'Figuras Semelhantes',desc:'Razão de semelhança e condições de semelhança'},
  {id:'t7-2',icon:'ph-polygon',title:'Polígonos Semelhantes',desc:'Ângulos e lados correspondentes proporcionais'},
  {id:'t7-3',icon:'ph-arrows-out',title:'Homotetia',desc:'Transformação geométrica com centro e razão'},
  {id:'t7-4',icon:'ph-triangle',title:'Semelhança de Triângulos',desc:'Critérios AA, LLL e LAL'},
  {id:'t7-5',icon:'ph-ruler',title:'Perímetros, Áreas e Escala',desc:'Razões de perímetros (k) e áreas (k²)'},
  {id:'t7-6',icon:'ph-cube',title:'Poliedros e Euler',desc:'V − A + F = 2 e sólidos de Platão'}
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
