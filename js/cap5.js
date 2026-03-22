function showMathView5(){
  _hideAllViews();
  var v=document.getElementById('view-math5');
  if(v)v.style.display='block';
  document.title = 'Sequências · 3ponto14';
  showSection5('temas5', document.querySelector('#tabs5 .tab-btn'));
  window.scrollTo(0,0);
}
function showSection5(id,btn){
  document.querySelectorAll('#sec-temas5,#sec-teoria5,#sec-questoes5,#sec-minitestes5,#sec-teste5,#sec-gerador5,#sec-jogos5,#sec-flashcards5,#sec-exame5,#sec-progresso5,#sec-downloads5,#sec-quiz-game5').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('#tabs5 .tab-btn').forEach(function(b){b.classList.remove('active');});
  var _s5=document.getElementById('sec-'+id);if(_s5)_s5.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math5').offsetTop,behavior:'smooth'});
  if(id==='questoes5')   { var _q5=document.getElementById('q5-container');  if(_q5 && !_q5.innerHTML) renderQuestoes5(); }
  if(id==='minitestes5') { var _m5=document.getElementById('m5-container');  if(_m5 && !_m5.innerHTML) showMini5(0, null); }
  if(id==='teste5')      { var _t5=document.getElementById('t5-container');  if(_t5 && !_t5.innerHTML) renderTeste5(); }
  if(id==='progresso5')renderProg5();
  if(id==='jogos5') _j24AutoInit('j24-wrap-cap5', 'dificil');
  if(id==='quiz-game5') { if(typeof qgStartForCap==='function') qgStartForCap(5); }
  // ── Progress tracking ──
  if(id==='teoria5') _pmRecord('cap5','teoria');
  if(id==='flashcards5') _pmRecord('cap5','flashcard');
  var c5=document.getElementById('sec-'+id);
  if(c5) pmRenderWidget('cap5',c5);
}

// DATA BANK
var BANCO5={
  questoes:[
    // TEMA 1: Sequências — Termo Geral de uma Sequência
    {id:'q5-1',tema:1,enunciado:'A Ana construiu uma sequência de figuras com segmentos de reta com termo geral a<sub>n</sub> = 5n. Quantos segmentos tem a figura 5?',opts:['A) 20','B) 25','C) 30','D) 15'],correct:'B',fb:'a<sub>5</sub> = 5×5 = 25 segmentos.'},
    {id:'q5-2',tema:1,enunciado:'O termo geral de uma sequência é a<sub>n</sub> = 4n − 3. Quantos balões tem o 10.º termo?',opts:['A) 33','B) 37','C) 40','D) 43'],correct:'B',fb:'a<sub>10</sub> = 4×10 − 3 = 37.'},
    {id:'q5-5',tema:1,enunciado:'A Ana desenhou figuras com casinhas de cão (segmentos). Se a<sub>n</sub> = 5n, qual é o termo geral da sequência?',opts:['A) a<sub>n</sub> = 5n','B) a<sub>n</sub> = n + 5','C) a<sub>n</sub> = 5n − 1','D) a<sub>n</sub> = 5(n + 1)'],correct:'A',fb:'Cada figura tem 5 segmentos a mais que a anterior, com a<sub>1</sub> = 5. Logo a<sub>n</sub> = 5n.'},
    {id:'q5-6',tema:1,enunciado:'A Inês construiu uma sequência com balões. O termo geral é a<sub>n</sub> = 4n − 3. Quais são os primeiros cinco termos?',opts:['A) 1, 5, 9, 13, 17','B) 4, 8, 12, 16, 20','C) 1, 4, 7, 10, 13','D) 3, 7, 11, 15, 19'],correct:'A',fb:'a<sub>1</sub>=1, a<sub>2</sub>=5, a<sub>3</sub>=9, a<sub>4</sub>=13, a<sub>5</sub>=17.'},
    {id:'q5-7',tema:1,enunciado:'A sequência é: −5, −2, 1, 4, 7, … Qual é o termo geral?',opts:['A) a<sub>n</sub> = 3n − 5','B) a<sub>n</sub> = 3n − 8','C) a<sub>n</sub> = −5 + 3n','D) a<sub>n</sub> = 3n − 2'],correct:'B',fb:'r = −2 − (−5) = 3. a<sub>n</sub> = a<sub>1</sub> + (n−1)r = −5 + 3(n−1) = 3n − 8. Verifica: a<sub>1</sub> = 3(1)−8 = −5 ✓'},
    {id:'q5-8',tema:1,enunciado:'Calcula o termo de ordem 6 da sucessão u<sub>n</sub> = (n−5)/(2n+5).',opts:['A) 1/17','B) 1/11','C) 6/17','D) 1/7'],correct:'A',fb:'u<sub>6</sub> = (6−5)/(2×6+5) = 1/17.'},
    {id:'q5-9',tema:1,enunciado:'Calcula o termo de ordem 75 da sucessão u<sub>n</sub> = (n−5)/(2n+5).',opts:['A) 70/155','B) 14/31','C) 2/3','D) 75/155'],correct:'B',fb:'u<sub>75</sub> = (75−5)/(2×75+5) = 70/155 = 14/31.'},
    // Desafios Tema 1
    {id:'q5-d1',tema:1,enunciado:'<span class="badge-desafio">★ Desafio</span> A soma dos primeiros n termos de uma sequência é S<sub>n</sub> = n² + 2n. Determina o termo geral a<sub>n</sub>.',opts:['A) 2n + 1','B) 2n − 1','C) n + 2','D) n² + 2'],correct:'A',fb:'a<sub>n</sub> = S<sub>n</sub> − S<sub>n−1</sub> = (n²+2n) − ((n−1)²+2(n−1)) = 2n+1.'},
    {id:'q5-d2',tema:1,enunciado:'<span class="badge-desafio">★ Desafio</span> Uma sequência tem termos a<sub>1</sub>=3, a<sub>2</sub>=7, a<sub>3</sub>=13, a<sub>4</sub>=21. As diferenças aumentam sempre 2. Qual é a<sub>5</sub>?',opts:['A) 29','B) 31','C) 33','D) 27'],correct:'B',fb:'Diferenças: 4, 6, 8, 10, … → a<sub>5</sub> = 21 + 10 = 31.'},
    // TEMA 2: Resolução de Problemas com o Termo Geral
    {id:'q5-3',tema:2,enunciado:'Uma sequência de pássaros em «V» tem termo geral a<sub>n</sub> = 2n + 1. Quantos pássaros são necessários para a figura 7?',opts:['A) 13','B) 14','C) 15','D) 16'],correct:'C',fb:'a<sub>7</sub> = 2×7 + 1 = 15 pássaros.'},
    {id:'q5-4',tema:2,enunciado:'A Sara usa 2h45min e a Inês 3h10min de telemóvel por dia. A Sara reduz 15 min/dia e a Inês 20 min/dia. Após quantos dias usam o mesmo tempo?',opts:['A) 3','B) 4','C) 5','D) 6'],correct:'C',fb:'165 − 15n = 190 − 20n → 5n = 25 → n = 5 dias.'},
    // Desafio Tema 2
    {id:'q5-d3',tema:2,enunciado:'<span class="badge-desafio">★ Desafio</span> Empresa A: 15€ fixos + 0,30€/km. Empresa B: 8€ fixos + 0,50€/km. A partir de quantos km a A é mais barata?',opts:['A) 30 km','B) 35 km','C) 36 km','D) 40 km'],correct:'C',fb:'15+0,30k < 8+0,50k → 7 < 0,20k → k > 35. Logo a partir de 36 km.'},
    // QA 29 — Sequências
    {id:'q5-10',tema:1,enunciado:'O termo geral da sequência cujos primeiros termos são 9, 14, 19, 24, … é:',opts:['A) 9 + 5n','B) 5 + 4n','C) 4 + 5n','D) 9n + 5'],correct:'C',fb:'r = 5, a<sub>1</sub> = 9. a<sub>n</sub> = 9 + (n−1)×5 = 4 + 5n. Verifica: a<sub>1</sub> = 4+5 = 9 ✓ a<sub>2</sub> = 4+10 = 14 ✓'},
    // QA 30 — Sequências de frações
    {id:'q5-11',tema:1,enunciado:'Qual é o termo de ordem n da sequência 1/2, 2/3, 3/4, 4/5, …?',opts:['A) n/(n+1)','B) (n+1)/n','C) n/(n+2)','D) 1/(n+1)'],correct:'A',fb:'Numerador = n, denominador = n+1. Logo u<sub>n</sub> = n/(n+1). Verifica: u<sub>1</sub> = 1/2 ✓ u<sub>2</sub> = 2/3 ✓'},
    // QA 33 — Termo geral a partir da sequência
    {id:'q5-12',tema:1,enunciado:'Os primeiros termos de uma sequência aritmética são 7, 10, 13, 16, … Qual é o termo geral?',opts:['A) 3n + 7','B) 3n + 1','C) 3n + 4','D) 4n + 3'],correct:'C',fb:'r = 3, a<sub>1</sub> = 7. a<sub>n</sub> = 7 + (n−1)×3 = 3n + 4. Verifica: a<sub>1</sub> = 3+4 = 7 ✓ a<sub>2</sub> = 6+4 = 10 ✓'},
    // QA 34 — Problema com quadrilátero
    {id:'q5-13',tema:2,enunciado:'Os três primeiros ângulos internos de um quadrilátero são dados por a<sub>n</sub> = 10n + 80 (para n = 1, 2, 3). Qual é o valor do 4.º ângulo?',opts:['A) 50°','B) 60°','C) 70°','D) 80°'],correct:'B',fb:'a<sub>1</sub> = 90°, a<sub>2</sub> = 100°, a<sub>3</sub> = 110°. Soma dos três = 300°. A soma dos ângulos internos de um quadrilátero é 360°. 4.º ângulo = 360° − 300° = 60°.'}
  ],
  minitestes:[
    [], // index 0 = todos (gerado dinamicamente)
    // Mini 1 — Sequências (7 questions)
    [{en:'O António registou a altitude de um drone ao longo do tempo: 0, 3, 6, 9, 12, … Qual é o termo geral da sequência?',opts:['A) 3n','B) 3n − 2','C) 3n − 3','D) 3n − 4'],c:'C',fb:'a₁ = 3(1)−3 = 0 ✓ ; a₂ = 3(2)−3 = 3 ✓'},
     {en:'Numa sequência de 5 termos, o 1.º é 2 e o 5.º é 18. Qual pode ser o termo geral?',opts:['A) aₙ = 4n − 2','B) aₙ = 2n','C) aₙ = 2n + 8','D) aₙ = 2n + 1'],c:'A',fb:'a₁ = 4(1)−2 = 2 ✓ ; a₅ = 4(5)−2 = 18 ✓'},
     {en:'Os primeiros quatro termos de uma sequência são: 1/2, 1/4, 1/8, 1/16. O sexto termo é:',opts:['A) 1/64','B) 1/36','C) 1/30','D) 1/32'],c:'A',fb:'Cada termo é metade do anterior: 1/32 → 1/64.'},
     {en:'O termo geral de uma sequência é 2 − 3n. Qual dos seguintes é um termo da sequência?',opts:['A) −2','B) 0','C) −10','D) −12'],c:'C',fb:'2−3n = −10 → 3n = 12 → n = 4. Logo −10 é o 4.º termo.'},
     {en:'Uma bactéria divide-se ao meio a cada hora. Quantas bactérias existem ao fim de 6 horas (começando com 1)?',opts:['A) 32','B) 64','C) 100','D) 128'],c:'B',fb:'aₙ = 2ⁿ. a₆ = 2⁶ = 64 bactérias.'},
     {en:'★ A soma dos 5 primeiros termos de uma PA é 35. Se a₁=3, qual é a razão?',opts:['A) 2','B) 3','C) 4','D) 5'],c:'A',fb:'S₅=5(a₁+a₅)/2=35 → a₅=11. r=(11−3)/4=2.'},
     {en:'★ Erro: "aₙ=3n+1 → a₁=3, a₂=6, a₃=9". O erro está em:',opts:['A) a₁','B) a₂','C) a₃','D) Todos errados'],c:'D',fb:'a₁=4, a₂=7, a₃=10. Todos estão errados!'}],
    // Mini 2 — Problemas com sequências (5 questions)
    [{en:'Numa sequência de figuras, o número de segmentos é aₙ = 4n + 1. Quantos segmentos são necessários para a figura com ordem 100?',opts:['A) 401','B) 402','C) 500','D) 501'],c:'A',fb:'a₁₀₀ = 4(100) + 1 = 401 segmentos.'},
     {en:'Considera a sequência: 5, 11, 17, 23, 29, … O termo geral pode ser:',opts:['A) aₙ = 5n','B) aₙ = 6n + 1','C) aₙ = 6n − 1','D) aₙ = −6n + 11'],c:'C',fb:'a₁ = 6(1)−1 = 5 ✓ ; a₃ = 6(3)−1 = 17 ✓'},
     {en:'Considera a sequência: −3, 0, 3, 6, 9, … O termo de ordem 30 é:',opts:['A) 90','B) 86','C) 87','D) 84'],c:'D',fb:'aₙ = 3n − 6 → a₃₀ = 3(30)−6 = 84.'},
     {en:'Os primeiros termos são: 3/1, 5/4, 7/9, 9/16, 11/25. O termo geral pode ser:',opts:['A) (2n+1)/n²','B) (2n+1)/(n+1)','C) (2n−1)/n','D) (2n−1)/n²'],c:'A',fb:'Numerador: 3,5,7,… = 2n+1. Denominador: 1,4,9,… = n². Logo aₙ = (2n+1)/n².'},
     {en:'O 1.º termo é 30 e cada termo seguinte obtém-se subtraindo 2. O termo geral é:',opts:['A) aₙ = −2n + 30','B) aₙ = 32 − 2n','C) aₙ = 2n + 28','D) aₙ = 2n − 30'],c:'B',fb:'a₁ = 32−2(1) = 30 ✓ ; a₂ = 32−4 = 28 ✓. Razão = −2.'}]
  ],
  teste:[
    {en:'Observa a sequência: 1, 3, 5, 7, 9, … Qual é o termo geral?',opts:['A) aₙ = 2n','B) aₙ = 2n − 1','C) aₙ = 2n + 1','D) aₙ = n + 1'],c:'B',fb:'a₁=1, a₂=3. aₙ = 2n − 1 ✓'},
    {en:'Sequência: 60, 50, 40, 30, 20, … O termo geral pode ser:',opts:['A) aₙ = 60n','B) aₙ = 60n − 10','C) aₙ = 10n + 50','D) aₙ = 70 − 10n'],c:'D',fb:'a₁ = 70−10=60 ✓; a₂ = 70−20=50 ✓.'},
    {en:'Considera bₙ = (5n+1)/(n²+1). O sétimo termo (b₇) é igual a:',opts:['A) 7','B) 18/25','C) 13/50','D) 4/5'],c:'B',fb:'b₇ = (5×7+1)/(7²+1) = 36/50 = 18/25.'},
    {en:'Qual é o valor de c₅ se cₙ = (2n−1)/(2n)?',opts:['A) 7/10','B) 9/10','C) 4/5','D) 1/2'],c:'B',fb:'c₅ = (2×5−1)/(2×5) = 9/10.'},
    {en:'A sequência 2, 6, 18, 54, … é:',opts:['A) Aritmética de razão 4','B) Geométrica de razão 3','C) Aritmética de razão 6','D) Nenhuma das anteriores'],c:'B',fb:'6/2=3, 18/6=3, 54/18=3. Razão constante = 3 → Geométrica.'},
    {en:'Qual é a₂₀ da sequência aₙ = 3n − 8?',opts:['A) 52','B) 54','C) 60','D) 68'],c:'A',fb:'a₂₀ = 3(20) − 8 = 60 − 8 = 52.'},
    {en:'Aves voam em V: a₁=3, a₂=5, a₃=7, a₄=9. Para a figura 7 são necessários:',opts:['A) 13','B) 15','C) 17','D) 19'],c:'B',fb:'aₙ = 2n+1. a₇ = 2(7)+1 = 15 aves.'},
    {en:'O 1.º termo é 100 e a razão é −5. Após quantos termos se chega a 0?',opts:['A) 19','B) 20','C) 21','D) 22'],c:'C',fb:'aₙ = 100 + (n−1)(−5) = 105 − 5n = 0 → n = 21.'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que é uma sequência numérica?',a:'Lista ordenada de números chamados termos. Cada termo tem uma posição (ordem n). Escreve-se a₁, a₂, a₃, …, aₙ'},
    {tag:'Definição',q:'O que é o termo geral aₙ?',a:'Expressão algébrica que permite calcular qualquer termo da sequência conhecendo a sua ordem n.'},
    {tag:'Fórmula',q:'Qual a fórmula do termo geral de uma sequência aritmética?',a:'aₙ = a₁ + (n−1)×r\naₙ = r·n + (a₁ − r)\n(r = razão = diferença entre termos consecutivos)'},
    {tag:'Definição',q:'O que é uma sequência aritmética?',a:'Uma sequência em que a diferença entre termos consecutivos é constante. Essa diferença chama-se razão (r).\nEx: 2, 5, 8, 11, … (r = 3)'},
    {tag:'Definição',q:'O que é uma sequência geométrica?',a:'Uma sequência em que o quociente entre termos consecutivos é constante. Esse quociente chama-se razão.\nEx: 2, 6, 18, 54, … (r = 3)'},
    {tag:'Estratégia',q:'Como encontrar o termo geral de uma sequência aritmética?',a:'1) Calcula a razão: r = a₂ − a₁\n2) Usa: aₙ = a₁ + (n−1)×r\nOu: aₙ = r·n + (a₁ − r)'},
    {tag:'Desafio',q:'Se Sₙ = n²+2n, como encontrar aₙ?',a:'aₙ = Sₙ − Sₙ₋₁ para n≥2, e a₁=S₁.\nExemplo: aₙ = 2n+1'},
    {tag:'Estratégia',q:'Como verificar se um número pertence a uma sequência?',a:'Substitui aₙ = valor no termo geral e resolve para n.\nSe n é inteiro positivo → pertence.\nEx: aₙ=2n−1, pertence 15? 2n−1=15 → n=8 ✓'}
  ],
  relampago:[
    {q:'Qual é a₅ se aₙ = 3n − 1?',opts:['12','14','16','18'],c:1,fb:'3×5−1=14'},
    {q:'Qual é a₃ se aₙ = n² − 1?',opts:['4','8','9','6'],c:1,fb:'3²−1=9−1=8'},
    {q:'Se aₙ = −2n + 10, qual é a₃?',opts:['4','6','8','16'],c:0,fb:'−2(3)+10=4'},
    {q:'Sequência: 2, 5, 8, 11, … A razão é:',opts:['2','3','5','8'],c:1,fb:'5−2=3'},
    {q:'Qual é a₁ se aₙ = 7n + 2?',opts:['7','9','2','1'],c:1,fb:'7(1)+2=9'},
    {q:'Sequência: 10, 7, 4, 1, … A razão é:',opts:['3','−3','7','−7'],c:1,fb:'7−10=−3'},
    {q:'O 4.º termo de aₙ = 2n é:',opts:['2','4','6','8'],c:3,fb:'2(4)=8'},
    {q:'Quantos termos tem a sequência finita: 1, 3, 5, …, 99?',opts:['49','50','51','99'],c:1,fb:'aₙ=2n−1=99 → n=50'},
    {q:'Se aₙ = n/(n+1), qual é a₂?',opts:['1/2','2/3','3/4','1/3'],c:1,fb:'2/(2+1)=2/3'},
    {q:'A sequência 1, 4, 9, 16, 25, … tem aₙ =',opts:['2n','n+1','n²','2ⁿ'],c:2,fb:'1²,2²,3²,4²,5² → aₙ=n²'}
  ],
  vf:[
    {q:'O termo a₅ da sequência aₙ = 2n é 8.',c:false,fb:'a₅ = 2×5 = 10, não 8. Falso!'},
    {q:'O termo geral aₙ = 5n−3 dá a₁ = 5.',c:false,fb:'a₁ = 5(1)−3 = 2, não 5. Falso!'},
    {q:'Numa sequência aritmética, a razão pode ser negativa.',c:true,fb:'Sim! Ex: 10, 7, 4, 1, … tem razão −3. Verdadeiro!'},
    {q:'Se aₙ = 2n − 1, a sequência é 1, 3, 5, 7, 9, …',c:true,fb:'a₁=1, a₂=3, a₃=5. Verdadeiro! Sequência dos ímpares.'},
    {q:'Numa sequência aritmética de razão 3, se a₁=2 então a₁₀=29.',c:true,fb:'a₁₀ = 2 + 9×3 = 29. Verdadeiro!'},
    {q:'A sequência 1, 1, 2, 3, 5, 8, 13, … é aritmética.',c:false,fb:'As diferenças não são constantes (0,1,1,2,3,5). É a sequência de Fibonacci, não é aritmética. Falso!'},
    {q:'O termo geral aₙ = n² gera 1, 4, 9, 16, 25, …',c:true,fb:'1²=1, 2²=4, 3²=9, 4²=16. Verdadeiro!'},
    {q:'Se aₙ = 3n, então a₁₀₀ = 300.',c:true,fb:'3×100 = 300. Verdadeiro!'},
    {q:'Toda sequência numérica é aritmética.',c:false,fb:'Existem sequências geométricas, quadráticas, de Fibonacci, etc. Falso!'},
    {q:'Se a razão é 0, a sequência é constante.',c:true,fb:'aₙ = a₁ + 0×(n−1) = a₁ para todo n. Verdadeiro!'}
  ]
};

// QUIZ ENGINE
var scores5={};
function getScore5(prefix){return scores5[prefix]||(scores5[prefix]={correct:0,total:0});}
function updateScoreBar5(prefix){
  var s=getScore5(prefix);
  var el_s=document.getElementById(prefix+'-score');
  var el_t=document.getElementById(prefix+'-total');
  var el_p=document.getElementById(prefix+'-prog');
  if(el_s)el_s.textContent=s.correct;
  if(el_t)el_t.textContent='/ '+s.total;
  if(el_p)el_p.style.width=(s.total>0?Math.round(s.correct/s.total*100):0)+'%';
  saveProgData5(prefix,s);
  if(s.total>0) _pmRecord('cap5','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(prefix, s.correct, s.total);
}
function resetQuiz5(prefix){
  scores5[prefix]={correct:0,total:0};
  updateScoreBar5(prefix);
  if(prefix==='q5')renderQuestoes5();
  if(prefix==='m5')showMini5(currentMini5||0,null);
  if(prefix==='t5')renderTeste5();
}
function renderQuestions5(questions,containerId,prefix){
  // Normalise BANCO5 format to qzInit format
  var normed = questions.map(function(q,i){
    if (q.opts) {
      // BANCO5 format: {en/enunciado, opts:['A) text','B) text',...], c/correct:'B', fb}
      return {
        enun: q.en || q.enunciado || q.enun || '',
        opcoes: q.opts,
        resposta: q.c || q.correct,
        tipo: 'mc',
        expl: q.fb || '',
        num: i + 1,
        _capId: '5',
        _banco5prefix: prefix,
        _banco5idx: i
      };
    }
    // buildEx5 format: already compatible
    q.num = q.num || (i + 1);
    q._capId = q._capId || '5';
    return q;
  });
  qzInit(containerId, normed, prefix, function(correct, total){
    if (typeof updateScoreBar5 === 'function') updateScoreBar5(prefix);
  });
}
var qData5={};
function ans5(prefix,idx,btn,chosen,correct){
  var key=prefix+'-'+idx;
  if(qData5[key])return;
  qData5[key]=true;
  var s=getScore5(prefix);
  s.total++;
  var isCorrect=(chosen===correct);
  if(isCorrect)s.correct++;
  var parent=btn.closest('.quiz-question');
  parent.querySelectorAll('.option-btn').forEach(function(b){b.disabled=true;});
  parent.querySelectorAll('.option-btn').forEach(function(b){
    var lbl = b.querySelector('.opt-label');
    var ltr = lbl ? lbl.textContent : '';
    if(ltr===correct)b.classList.add('correct');
    else if(ltr===chosen&&!isCorrect)b.classList.add('wrong');
  });
  var fb=document.getElementById('fb5-'+prefix+'-'+idx);
  if(fb){
    fb.style.display='block';
    var bgC=isCorrect?'#edf7ed':'#fdf0ef';
    var brC=isCorrect?'#4caf50':'#e57373';
    var icon=isCorrect?'<i class="ph ph-check-circle"></i>':'<i class="ph ph-x-circle"></i>';
    var color=isCorrect?'var(--correct)':'var(--wrong)';
    var status=isCorrect?'Correto!':'Incorreto.';
    var q=null;
    if(prefix==='q5')q=BANCO5.questoes[idx];
    else if(prefix.startsWith('mini'))q=BANCO5.minitestes[parseInt(prefix.replace('mini',''))][idx];
    else if(prefix==='t5')q=BANCO5.teste[idx];
    var explHtml='';
    if(q&&q.fb){
      explHtml='<div style="margin-top:8px;padding:10px 14px;background:rgba(255,255,255,.7);border-radius:8px;border-left:3px solid '+brC+';font-size:.85rem;line-height:1.6;color:var(--ink2)"><strong style="color:'+color+';font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:3px">'+(isCorrect?'<i class="ph ph-lightbulb"></i> Porquê?':'<i class="ph ph-lightbulb"></i> Resolução')+'</strong>'+q.fb+'</div>';
    }
    fb.innerHTML='<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;background:'+bgC+';border:1.5px solid '+brC+';border-radius:10px"><span style="font-size:1.3rem;flex-shrink:0;line-height:1">'+icon+'</span><div style="flex:1"><strong style="color:'+color+';font-size:.92rem">'+status+'</strong>'+explHtml+'</div></div>';
  }
  updateScoreBar5(prefix);
  {var _q5=null;if(prefix==='q5')_q5=BANCO5.questoes[idx];else if(prefix.startsWith('mini'))_q5=BANCO5.minitestes[parseInt(prefix.replace('mini',''))][idx];else if(prefix==='t5')_q5=BANCO5.teste[idx];_etRecord('cap5','q',key,_q5?_q5.en:key,isCorrect);}
}

function buildEx5(tema,dif){
  tema=String(tema);
  var easy=(dif==='facil'),hard=(dif==='dificil');
  var r4=function(a,b){return Math.floor(Math.random()*(b-a+1))+a;};
  function sh5(a){
    var arr=a.slice();
    for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}
    return arr;
  }

  // TEMA 1 — Sequências: Termo Geral
  if(tema==='1'){
    var r=r4(0,4);
    if(r===0){
      // Calcular um termo dado o termo geral aₙ = an + b
      var a=r4(2,easy?5:9),b=r4(-4,easy?4:8),n=r4(easy?3:5,easy?8:20);
      var val=a*n+b;
      return{en:'Calcula a'+n+' sabendo que a<sub>n</sub> = '+a+'n'+(b>=0?' + '+b:' − '+Math.abs(b))+'.',
        opts:sh5(['A) '+val,'B) '+(val+a),'C) '+(val-b),'D) '+(a*n)]),
        c:'A) '+val,fb:'a<sub>'+n+'</sub> = '+a+'×'+n+(b>=0?' + '+b:' − '+Math.abs(b))+' = '+(a*n)+(b>=0?' + '+b:' − '+Math.abs(b))+' = '+val+'.'};
    }
    if(r===1){
      // Encontrar o termo geral dado os primeiros termos (PA)
      var razao=r4(2,easy?5:8);
      var a1=r4(-3,easy?5:10);
      var t1=a1,t2=a1+razao,t3=a1+2*razao,t4=a1+3*razao;
      var tgA=razao+'n'+(a1-razao>=0?' + '+(a1-razao):' − '+Math.abs(a1-razao));
      return{en:'Determina o termo geral da sequência: '+t1+', '+t2+', '+t3+', '+t4+', …',
        opts:sh5(['A) a<sub>n</sub> = '+tgA,'B) a<sub>n</sub> = '+(razao+1)+'n'+(a1>=0?' + '+a1:' − '+Math.abs(a1)),'C) a<sub>n</sub> = '+razao+'n'+(a1>=0?' + '+a1:' − '+Math.abs(a1)),'D) a<sub>n</sub> = '+(razao-1)+'n + '+(a1+1)]),
        c:'A) a<sub>n</sub> = '+tgA,fb:'Razão r = '+t2+' − '+t1+' = '+razao+'. a<sub>n</sub> = '+razao+'n + (a₁ − r) = '+razao+'n + ('+(a1-razao)+') = '+tgA+'.'};
    }
    if(r===2){
      // Preencher termo em falta numa PA
      var razao=r4(2,easy?4:7);
      var a1=r4(1,easy?10:20);
      var missing=r4(2,4);
      var terms=[];
      for(var i=0;i<5;i++){terms.push(a1+i*razao);}
      var missingVal=terms[missing];
      var display=[];
      for(var i=0;i<5;i++){
        if(i===missing) display.push('___');
        else display.push(String(terms[i]));
      }
      return{en:'Completa a sequência aritmética: '+display.join(', ')+', …',
        opts:sh5(['A) '+missingVal,'B) '+(missingVal+razao),'C) '+(missingVal-1),'D) '+(missingVal+2)]),
        c:'A) '+missingVal,fb:'A razão é r = '+razao+'. O termo em falta na posição '+(missing+1)+' é '+missingVal+'.'};
    }
    if(r===3){
      // Verificar se um número pertence à sequência
      var razao=r4(2,6);
      var a1=r4(1,5);
      var nTarget=r4(5,easy?10:25);
      var val=a1+(nTarget-1)*razao;
      return{en:'A sequência tem termo geral a<sub>n</sub> = '+razao+'n'+(a1-razao>=0?' + '+(a1-razao):' − '+Math.abs(a1-razao))+'. O número '+val+' pertence à sequência?',
        opts:sh5(['A) Sim, é o '+nTarget+'.º termo','B) Não pertence','C) Sim, é o '+(nTarget+1)+'.º termo','D) Sim, é o '+(nTarget-1)+'.º termo']),
        c:'A) Sim, é o '+nTarget+'.º termo',fb:razao+'n'+(a1-razao>=0?' + '+(a1-razao):' − '+Math.abs(a1-razao))+' = '+val+' → '+razao+'n = '+(val-(a1-razao))+' → n = '+nTarget+'. Pertence!'};
    }
    // r===4: Calcular termo com aₙ = n²
    var n=r4(easy?3:5,easy?7:12);
    var val=n*n;
    return{en:'Se a<sub>n</sub> = n², qual é o valor de a<sub>'+n+'</sub>?',
      opts:sh5(['A) '+val,'B) '+(2*n),'C) '+(val+1),'D) '+(val-n)]),
      c:'A) '+val,fb:'a<sub>'+n+'</sub> = '+n+'² = '+val+'.'};
  }

  // TEMA 2 — Resolução de Problemas com o Termo Geral
  if(tema==='2'){
    var r=r4(0,3);
    if(r===0){
      // Problema de figuras com segmentos
      var a=r4(3,7),b=r4(-2,3),n=r4(5,easy?10:20);
      var val=a*n+b;
      return{en:'Numa sequência de figuras, o número de segmentos é a<sub>n</sub> = '+a+'n'+(b>=0?' + '+b:' − '+Math.abs(b))+'. Quantos segmentos tem a figura '+n+'?',
        opts:sh5(['A) '+val,'B) '+(val+a),'C) '+(a*n),'D) '+(val-1)]),
        c:'A) '+val,fb:'a<sub>'+n+'</sub> = '+a+'×'+n+(b>=0?' + '+b:' − '+Math.abs(b))+' = '+val+' segmentos.'};
    }
    if(r===1){
      // Problema: quando dois termos são iguais
      var a1=r4(50,150),r1=r4(5,15);
      var a2=r4(a1+20,a1+80),r2=r4(r1+2,r1+10);
      // a1 - r1*n = a2 - r2*n → (r2-r1)*n = a2-a1 → n = (a2-a1)/(r2-r1)
      var diff=r2-r1;
      var nSol=Math.round((a2-a1)/diff);
      // Recalculate to ensure clean solution
      a2=a1+(r2-r1)*nSol;
      return{en:'O João gasta '+a1+' minutos por dia a estudar e reduz '+r1+' min/dia. A Maria gasta '+a2+' minutos e reduz '+r2+' min/dia. Após quantos dias gastam o mesmo tempo?',
        opts:sh5(['A) '+nSol+' dias','B) '+(nSol+1)+' dias','C) '+(nSol-1)+' dias','D) '+(nSol+2)+' dias']),
        c:'A) '+nSol+' dias',fb:a1+' − '+r1+'n = '+a2+' − '+r2+'n → '+(r2-r1)+'n = '+(a2-a1)+' → n = '+nSol+' dias.'};
    }
    if(r===2){
      // Problema: total de objetos em n figuras
      var a=r4(2,5),n=r4(easy?5:8,easy?10:15);
      var val=a*n;
      return{en:'Um padrão repete '+a+' azulejos por fila. Quantos azulejos há na fila '+n+'?',
        opts:sh5(['A) '+val,'B) '+(val+a),'C) '+(val-a),'D) '+(a+n)]),
        c:'A) '+val,fb:'a<sub>'+n+'</sub> = '+a+' × '+n+' = '+val+' azulejos.'};
    }
    // r===3: Problema de custo com termo geral
    var fixo=r4(5,20),porUn=r4(1,5);
    var n=r4(easy?5:10,easy?15:30);
    var total=fixo+porUn*n;
    return{en:'Uma empresa cobra '+fixo+'€ de taxa fixa mais '+porUn+'€ por unidade. O custo para '+n+' unidades é:',
      opts:sh5(['A) '+total+' €','B) '+(fixo*n)+' €','C) '+(porUn*n)+' €','D) '+(total+porUn)+' €']),
      c:'A) '+total+' €',fb:'C(n) = '+fixo+' + '+porUn+'×'+n+' = '+fixo+' + '+(porUn*n)+' = '+total+' €.'};
  }

  // fallback
  return BANCO5.questoes[Math.floor(Math.random()*BANCO5.questoes.length)];
}

function renderQuestoes5(){
  qData5={};
  // Mix static + dynamic questions
  var dif='medio';
  var lvlBtn=document.querySelector('#sec-questoes5 .gen-level-btn.active');
  if(lvlBtn&&lvlBtn.dataset&&lvlBtn.dataset.level) dif=lvlBtn.dataset.level;
  var allQ=BANCO5.questoes.slice();
  // Add dynamically generated questions to reach 20
  ['1','1','1','1','2','2','2','2','1','1','2','2'].forEach(function(t){
    var q=buildEx5(t,dif);if(q)allQ.push(q);
  });
  // Shuffle and take first 20
  for(var i=allQ.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=allQ[i];allQ[i]=allQ[j];allQ[j]=t;}
  allQ=allQ.slice(0,20);
  renderQuestions5(allQ,'q5-container','q5');
}
var currentMini5=0;
function showMini5(idx,btn){
  currentMini5=idx;
  document.querySelectorAll('#mini-tabs5 .tab-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  else if(document.querySelectorAll('#mini-tabs5 .tab-btn')[idx])document.querySelectorAll('#mini-tabs5 .tab-btn')[idx].classList.add('active');
  qData5={};
  scores5['m5']={correct:0,total:0};
  updateScoreBar5('m5');
  var prefix='mini'+idx;
  var qs;
  if(idx===0){
    qs=[];
    for(var i=1;i<=2;i++){if(BANCO5.minitestes[i])qs=qs.concat(BANCO5.minitestes[i].slice(0,3));}
  } else {
    qs=BANCO5.minitestes[idx]||[];
  }
  qData5={};
  renderQuestions5(qs,'m5-container',prefix);
}
function renderTeste5(){qData5={};renderQuestions5(BANCO5.teste,'t5-container','t5');}

// FLASHCARDS
var fc5Idx=0,fc5Flipped=false,fc5Order=[];
function initFlashcards5(){
  fc5Order=BANCO5.flashcards.map(function(_,i){return i;});
  fc5Show5();
}
function fc5Show5(){
  fc5Flipped=false;
  document.getElementById('fc5-inner').style.transform='';
  var fc=BANCO5.flashcards[fc5Order[fc5Idx]];
  document.getElementById('fc5-tag').textContent=fc.tag;
  document.getElementById('fc5-q').textContent=fc.q;
  document.getElementById('fc5-a').textContent=fc.a;
  var n=fc5Order.length;
  document.getElementById('fc5-counter').textContent=(fc5Idx+1)+' / '+n;
  document.getElementById('fc5-prog').style.width=Math.round((fc5Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc5-dots');
  dots.innerHTML='';
  fc5Order.forEach(function(_,i){
    var d=document.createElement('div');
    d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc5Idx?'var(--c2-mid)':'var(--border2)');
    dots.appendChild(d);
  });
}
function fc5Flip(){
  fc5Flipped=!fc5Flipped;
  document.getElementById('fc5-inner').style.transform=fc5Flipped?'rotateY(180deg)':'';
}
function fc5Next(){fc5Idx=(fc5Idx+1)%fc5Order.length;fc5Show5();}
function fc5Prev(){fc5Idx=(fc5Idx-1+fc5Order.length)%fc5Order.length;fc5Show5();}
function fc5Shuffle(){
  for(var i=fc5Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc5Order[i];fc5Order[i]=fc5Order[j];fc5Order[j]=t;}
  fc5Idx=0;fc5Show5();
}

// GERADOR
var fichaContent5='';
function gerarFicha5(){
  var tema=parseInt(document.getElementById('gen5-tema').value);
  var tipo=document.getElementById('gen5-tipo').value;
  var nivel=document.getElementById('gen5-nivel').value;
  var qtd=parseInt(document.getElementById('gen5-qtd').value);
  var pool=[];
  var allQ=BANCO5.questoes.concat(BANCO5.teste);
  BANCO5.minitestes.slice(1).forEach(function(m){if(m)allQ=allQ.concat(m);});
  if(tema>0)allQ=allQ.filter(function(q){return q.tema===tema;});
  for(var i=allQ.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=allQ[i];allQ[i]=allQ[j];allQ[j]=t;}
  pool=allQ.slice(0,qtd);
  if(pool.length===0){
    document.getElementById('gen5-output').style.display='block';
    document.getElementById('gen5-output').innerHTML='<p style="color:var(--ink3)">Sem questões disponíveis para esta configuração. Tenta um subtema diferente.</p>';
    return;
  }
  var html='<div style="font-family:\'Montserrat\',sans-serif;max-width:720px">';
  html+='<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.3rem;margin-bottom:1rem;color:var(--ink)">Ficha Gerada — Sequências</h3>';
  pool.forEach(function(q,i){
    html+='<div style="margin-bottom:1.25rem;padding:1rem;background:var(--cream);border-radius:10px;border:1px solid var(--border)">';
    html+='<p style="font-weight:600;font-size:.88rem;margin-bottom:.5rem">'+(i+1)+'. '+q.en+'</p>';
    if(q.opts){q.opts.forEach(function(o){html+='<p style="font-size:.82rem;color:var(--ink3);margin:.2rem 0">'+o+'</p>';});}
    html+='</div>';
  });
  html+='</div>';
  document.getElementById('gen5-output').style.display='block';
  document.getElementById('gen5-output').innerHTML=html;
  document.getElementById('dl-ficha5-btn').style.display='inline-flex';
  fichaContent5=html;
}
function downloadFicha5(){
  var tema=document.getElementById('gen5-tema').options[document.getElementById('gen5-tema').selectedIndex].text;
  var fullHtml='<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Ficha — Sequências Mat. 7.º Ano</title><style>body{font-family:Montserrat,sans-serif;max-width:720px;margin:2rem auto;padding:1rem;color:#2a2724}.q{margin-bottom:1.5rem;padding:1rem;border:1px solid #ddd;border-radius:8px}h1{font-family:Georgia,serif;font-size:1.4rem;margin-bottom:.5rem}h2{font-size:1rem;color:#516860}p{margin:.25rem 0;font-size:.88rem}@media print{body{margin:.5rem}.q{page-break-inside:avoid}}</style></head><body>';
  fullHtml+='<h1>3ponto14 · Matemática 7.º Ano · Sequências</h1><h2>'+tema+'</h2><hr style="margin:1rem 0">';
  fullHtml+=fichaContent5;
  fullHtml+='</body></html>';
  var blob=new Blob([fullHtml],{type:'text/html'});
  htmlToPdfDownload(fullHtml, 'ficha_cap5_mat7.pdf');
}

// EXAME
var exameTimer5=null,exameLevel5='medio',exameStarted5=false;
function exame5SetLevel(btn){
  document.querySelectorAll('#exame5-config .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');exameLevel5=btn.dataset.level;
}
function exame5Start(){
  var tempo=parseInt(document.getElementById('exame5-tempo').value);
  var qtd=parseInt(document.getElementById('exame5-qtd').value);
  document.getElementById('exame5-config').style.display='none';
  document.getElementById('exame5-running').style.display='block';
  document.getElementById('exame5-result').style.display='none';
  var pool=BANCO5.questoes.concat(BANCO5.minitestes.slice(1).reduce(function(a,m){return m?a.concat(m):a;},[]),BANCO5.teste);
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  var qs=pool.slice(0,qtd);
  qData5={};
  renderQuestions5(qs,'exame5-container','ex5');
  var timeLeft=tempo;
  function fmt(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}
  document.getElementById('exame5-timer').textContent=fmt(timeLeft);
  document.getElementById('exame5-prog').style.width='0%';
  exameTimer5=setInterval(function(){
    timeLeft--;
    document.getElementById('exame5-timer').textContent=fmt(timeLeft);
    document.getElementById('exame5-prog').style.width=Math.round((tempo-timeLeft)/tempo*100)+'%';
    if(timeLeft<=0){clearInterval(exameTimer5);exame5Submit();}
  },1000);
  exameStarted5=true;
}
function exame5Submit(){
  examActive = false; // clear guard regardless of how finish was triggered
  if(exameTimer5)clearInterval(exameTimer5);
  document.getElementById('exame5-running').style.display='none';
  var s=getScore5('ex5');
  var pct=s.total>0?Math.round(s.correct/s.total*100):0;
  var res=document.getElementById('exame5-result');
  res.style.display='block';
  res.innerHTML='<div class="card"><div class="card-title">Resultado do Exame</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:2.5rem;font-weight:900;color:'+(pct>=70?'var(--correct)':'var(--wrong)')+'">'+pct+'%</div><p style="margin:.5rem 0;color:var(--ink3)">'+s.correct+' corretas de '+s.total+' questões</p><div class="highlight-box '+(pct>=70?'green':'orange')+'" style="margin-top:1rem">'+(pct>=80?'<i class="ph ph-star"></i> Excelente preparação!':pct>=60?'<i class="ph ph-thumbs-up"></i> Bom resultado — continua a praticar!':'<i class="ph ph-wrench"></i> Revê a teoria e volta a tentar!')+'</div><div style="margin-top:1rem;display:flex;gap:.75rem"><button class="btn btn-primary" onclick="document.getElementById(\'exame5-config\').style.display=\'block\';document.getElementById(\'exame5-result\').style.display=\'none\'">↺ Novo Exame</button><button class="btn btn-ghost" onclick="showSection5(\'teoria5\',document.querySelector(\'#tabs5 .tab-btn\'))"><i class="ph ph-book-open-text"></i> Rever Teoria</button></div></div>';
}

// PROGRESSO
function saveProgData5(prefix,data){
  try{var p=JSON.parse(localStorage.getItem('edupt_cap5')||'{}');p[prefix]=data;p['last_updated']=new Date().toLocaleDateString('pt-PT');localStorage.setItem('edupt_cap5',JSON.stringify(p));}catch(e){}
  setTimeout(_progRefreshBars, 80);
}
function renderProg5(){
  // barras por capítulo (visão global)
  if(typeof _progRenderCapitulosBar==='function') _progRenderCapitulosBar('prog5-caps', 5);

  var p={};
  try{p=JSON.parse(localStorage.getItem('edupt_cap5')||'{}');}catch(e){}
  var sections=[
    {key:'q5',name:'Questões-aula',total:14},
    {key:'mini1',name:'Mini 1 — Sequências',total:7},
    {key:'mini2',name:'Mini 2 — Problemas',total:5},
    {key:'t5',name:'Teste',total:8},
    {key:'ex5',name:'Exame',total:15}
  ];
  var html='';
  sections.forEach(function(s){
    var d=p[s.key]||{correct:0,total:0};
    var pct=d.total>0?Math.round(d.correct/d.total*100):0;
    html+='<div class="prog-section-row"><span class="prog-section-name">'+s.name+'</span><div class="progress-track" style="flex:1"><div class="progress-fill" style="width:'+pct+'%"></div></div><span class="prog-pct">'+pct+'%</span></div>';
  });
  if(!html)html='<p style="color:var(--ink4);font-size:.88rem">Faz algumas atividades para ver o teu progresso aqui!</p>';
  document.getElementById('prog5-rows').innerHTML=html;
  var scores='';
  if(p.last_updated)scores='<p>Última atividade: '+p.last_updated+'</p>';
  sections.forEach(function(s){
    var d=p[s.key];
    if(d&&d.total>0)scores+='<p>'+s.name+': '+d.correct+'/'+d.total+'</p>';
  });
  document.getElementById('prog5-scores').innerHTML=scores||'Sem dados ainda. Faz algumas atividades!';
}
function resetProg5(){
  try{localStorage.removeItem('edupt_cap5');}catch(e){}
  scores5={};renderProg5();
}

// ── Topic grid data ──
var _c5Teoria = "showSection5('teoria5',document.querySelector('#tabs5 .tab-btn:nth-child(2)'))";
// ── Subtema support ─────────────────────────────────────────────────────────
var _cap5SubtemaTitulos = {
  '1': 'Termo Geral e Razão',
  '2': 'Problemas com Sequências'
};


function abrirSubtema5(tema) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  var titulo = _cap5SubtemaTitulos[String(tema)] || 'Prática';
  var exs = _bancoToSubtemaExs(BANCO5, tema);
  window._stContext = { titulo: titulo, gerador: function(){ return _bancoToSubtemaExs(BANCO5, tema); } };
  criarModalSubtema(titulo, exs);
}

var _cap5Topics = [
  {id:'tr5-1', num:'01', title:'Sequências — Termo Geral', open:true, subs:[
    {onclick:_c5Teoria, label:'Teoria: Definição e Termo Geral', icon:'ph-book-open-text'},
    {onclick:"abrirSubtema5('1')", label:'Praticar: Termo Geral e Razão', icon:'ph-pencil'}
  ]},
  {id:'tr5-2', num:'02', title:'Resolução de Problemas', subs:[
    {onclick:_c5Teoria, label:'Teoria: Figuras e Padrões', icon:'ph-book-open-text'},
    {onclick:"abrirSubtema5('2')", label:'Praticar: Problemas com Sequências', icon:'ph-pencil'}
  ]}
];
(function(){
  var el = document.getElementById('cap5-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap5Topics);
})();

// ── CAP_DATA registration ──
window.CAP_DATA = window.CAP_DATA || {};
window.CAP_DATA[5] = {
  prefix: '5',
  viewId: 'view-math5',
  tabsId: 'tabs-cap5',
  storageKey: 'edupt_cap5',
  temas: ['1','2'],
  buildExercicio: buildEx5,
  questoesPlans: { facil:{total:10}, medio:{total:15}, dificil:{total:20} },
  miniPlans: { 0:[1,2], 1:[1], 2:[2] },
  testePlans: { subtema0:{total:8} },
  flashcards: BANCO5.flashcards
};
_capRegisterWrappers(5);
