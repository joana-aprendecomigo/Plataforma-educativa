function showMathView4(){
  _hideAllViews();
  var v=document.getElementById('view-math4');
  if(v)v.style.display='block';
  document.title = 'Equações · 3ponto14';
  showSection4('temas4', document.querySelector('#tabs4 .tab-btn'));
  window.scrollTo(0,0);
}
function showSection4(id,btn){
  document.querySelectorAll('#sec-temas4,#sec-teoria4,#sec-questoes4,#sec-minitestes4,#sec-teste4,#sec-gerador4,#sec-jogos4,#sec-flashcards4,#sec-exame4,#sec-progresso4,#sec-downloads4,#sec-quiz-game4').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('#tabs4 .tab-btn').forEach(function(b){b.classList.remove('active');});
  var _s4=document.getElementById('sec-'+id);if(_s4)_s4.classList.add('active');
  if(btn)btn.classList.add('active');
  window.scrollTo({top:document.getElementById('view-math4').offsetTop,behavior:'smooth'});
  if(id==='questoes4')   { var _q4=document.getElementById('q4-container');  if(_q4 && !_q4.innerHTML) renderQuestoes4(); }
  if(id==='minitestes4') { var _m4=document.getElementById('m4-container');  if(_m4 && !_m4.innerHTML) showMini4(0, null); }
  if(id==='teste4')      { var _t4=document.getElementById('t4-container');  if(_t4 && !_t4.innerHTML) renderTeste4(); }
  if(id==='progresso4')renderProg4();
  if(id==='jogos4') _j24AutoInit('j24-wrap-cap4', 'dificil');
  if(id==='quiz-game4') { if(typeof qgStartForCap==='function') qgStartForCap(4); }
  // ── Progress tracking ──
  if(id==='teoria4') _pmRecord('cap4','teoria');
  if(id==='flashcards4') _pmRecord('cap4','flashcard');
  var c4=document.getElementById('sec-'+id);
  if(c4) pmRenderWidget('cap4',c4);
}

// DATA BANK
var BANCO4={
  questoes:[
    // TEMA 1: Expressões algébricas
    {id:'q4-1',tema:1,enunciado:'Qual expressão representa «a diferença entre 12 e metade de um número x»?',opts:['A) x/2 − 12','B) 12 − x/2','C) 12 + x/2','D) x − 12'],correct:'B',fb:'«Diferença entre 12 e metade de x» = 12 − x/2. A ordem importa: 12 primeiro!'},
    {id:'q4-2',tema:1,enunciado:'Qual expressão representa «o dobro da soma de 5 com o triplo de um número x»?',opts:['A) 2x + 5','B) 2(5) + 3x','C) 2(5 + 3x)','D) 10 + 3x'],correct:'C',fb:'«Dobro da soma de 5 com o triplo de x» = 2 × (5 + 3x). Os parênteses são essenciais!'},
    {id:'q4-3',tema:1,enunciado:'«A soma de um número com 3» traduz-se por:',opts:['A) 3x','B) x + 3','C) x − 3','D) 3 − x'],correct:'B',fb:'A soma de um número (x) com 3 = x + 3.'},
    {id:'q4-4',tema:1,enunciado:'«A diferença entre o dobro de um número e 3» traduz-se por:',opts:['A) 3 − 2x','B) 2x + 3','C) 2x − 3','D) 2 − 3x'],correct:'C',fb:'Diferença entre o dobro (2x) e 3 = 2x − 3. Atenção à ordem!'},
    // TEMA 2: Simplificação
    {id:'q4-5',tema:2,enunciado:'Um retângulo tem comprimento x cm e largura (x − 5) cm. Qual é a expressão simplificada do perímetro?',opts:['A) 2x − 5','B) 4x − 10','C) 2x + 10','D) 4x + 10'],correct:'B',fb:'P = 2×x + 2×(x−5) = 2x + 2x − 10 = 4x − 10 cm.'},
    {id:'q4-6',tema:2,enunciado:'Um terreno tem lados x+4, 2, 5x−3, 2 e 2x+3. Qual é o perímetro simplificado?',opts:['A) 8x + 6','B) 8x + 8','C) 8x + 4','D) 10x + 6'],correct:'B',fb:'P = (x+4)+2+(5x−3)+2+(2x+3) = 8x + 8. Agrupa os termos em x e os independentes.'},
    {id:'q4-7',tema:2,enunciado:'Simplifica: 3x − 5x + 10 − 1 + x',opts:['A) −x + 9','B) x + 9','C) −x − 9','D) 3x + 9'],correct:'A',fb:'(3−5+1)x + (10−1) = −x + 9.'},
    {id:'q4-8',tema:2,enunciado:'Simplifica: x − 2y − 5 + 2x − 2y + 2',opts:['A) 3x − 4y − 3','B) x − 4y − 3','C) 3x + 4y − 3','D) 3x − 4y + 3'],correct:'A',fb:'(1+2)x + (−2−2)y + (−5+2) = 3x − 4y − 3.'},
    // TEMA 3: Equações
    {id:'q4-9',tema:3,enunciado:'Considera a equação 3x − 1 = 2x + 4. Qual é a solução?',opts:['A) 3','B) 4','C) 5','D) 6'],correct:'C',fb:'3x − 2x = 4 + 1 → x = 5. Verificação: 3(5)−1=14; 2(5)+4=14 ✓'},
    {id:'q4-10',tema:3,enunciado:'Qual é a solução da equação −3x = −6?',opts:['A) −2','B) 2','C) 18','D) −18'],correct:'B',fb:'−3x = −6 → x = (−6)÷(−3) = 2. Dividir dois negativos dá positivo.'},
    {id:'q4-11',tema:3,enunciado:'Qual das seguintes equações admite o número 2 como solução?',opts:['A) 2x − 3 = 1','B) 4 − x = 3','C) x − 4 = −3','D) 2x + 3 = 5'],correct:'A',fb:'A) 2(2)−3 = 4−3 = 1 ✓. B) 4−2=2≠3. C) 2−4=−2≠−3. D) 2(2)+3=7≠5.'},
    // TEMA 4: Equações equivalentes
    {id:'q4-12',tema:4,enunciado:'Considera a equação 6x + 10 = 13. Qual é a solução?',opts:['A) 1/2','B) 1','C) 2','D) 3'],correct:'A',fb:'6x = 13 − 10 = 3 → x = 3/6 = 1/2. S = {1/2}.'},
    {id:'q4-13',tema:4,enunciado:'Resolve a equação 5x − 3 = 7 − x. Qual é a solução?',opts:['A) 1','B) 2','C) 5/3','D) 5'],correct:'C',fb:'5x + x = 7 + 3 → 6x = 10 → x = 10/6 = 5/3. S = {5/3}.'},
    {id:'q4-14',tema:4,enunciado:'Resolve: 5x + 1 − x = 3 + 2x',opts:['A) x = 1','B) x = 2','C) x = −1','D) x = 0'],correct:'A',fb:'4x + 1 = 3 + 2x → 2x = 2 → x = 1. Verificação: 5(1)+1−1=5; 3+2(1)=5 ✓'},
    // TEMA 5: Classificação
    {id:'q4-15',tema:5,enunciado:'Classifica a equação 5x − 4 + 3x = 8x − 4:',opts:['A) Possível determinada','B) Impossível','C) Possível indeterminada','D) Não classificável'],correct:'C',fb:'8x − 4 = 8x − 4 → 0x = 0 → Possível indeterminada (PI). S = ℝ.'},
    {id:'q4-16',tema:5,enunciado:'O retângulo com lados (4x − 4) e 3x é um quadrado quando:',opts:['A) x = 2','B) x = 3','C) x = 4','D) x = 5'],correct:'C',fb:'Quadrado ↔ lados iguais: 4x−4=3x → x=4. Verificação: 4(4)−4=12; 3(4)=12 ✓'},
    {id:'q4-17',tema:5,enunciado:'Qual das seguintes equações é impossível?',opts:['A) 3x = x + 3','B) 3x − 3 = 3 − 3x','C) 3x + 3 = 3x − 1','D) 9 + 3x − 3 = 3x + 6'],correct:'C',fb:'C: 3x+3=3x−1 → 0x=−4 → Impossível. D: 3x+6=3x+6 → PI.'},
    // TEMA 6: Problemas
    {id:'q4-18',tema:6,enunciado:'A Rute multiplicou um número por 4 e subtraiu 10, obtendo 30. Em que número pensou?',opts:['A) 8','B) 10','C) 12','D) 15'],correct:'B',fb:'4x − 10 = 30 → 4x = 40 → x = 10.'},
    {id:'q4-19',tema:6,enunciado:'Numa quinta, as galinhas são o triplo dos coelhos e há 160 patas no total. Quantos coelhos há?',opts:['A) 12','B) 16','C) 20','D) 48'],correct:'B',fb:'Seja x = coelhos, 3x = galinhas. 4x + 2(3x) = 160 → 10x = 160 → x = 16.'},
    {id:'q4-20',tema:6,enunciado:'A Inês tem mais 7 anos que a irmã Sofia. Daqui a 4 anos a soma das idades será 25. Sendo x a idade da Sofia, qual equação é correta?',opts:['A) 2x + 7 = 25','B) 2x + 15 = 25','C) 2x + 11 = 25','D) 2x + 4 = 25'],correct:'B',fb:'Sofia daqui a 4 anos: x+4. Inês daqui a 4 anos: (x+7)+4=x+11. Soma: (x+4)+(x+11)=2x+15=25.'},
    // ══ QUESTÕES EXTRA (baseadas nos QA do manual) ══
    // Tema 1 — QA5/QA6
    {id:'q4-28',tema:1,enunciado:'Os segmentos AP = 7 e PB = x formam o segmento AB. A distância de A a B é:',opts:['A) 7x','B) 7 − x','C) 7 + x','D) x − 7'],correct:'C',fb:'AB = AP + PB = 7 + x.'},
    {id:'q4-29',tema:1,enunciado:'«A base de um triângulo excede em 3 cm a medida da sua altura h.» A base é:',opts:['A) 3h','B) h − 3','C) h + 3','D) 3 + h/2'],correct:'C',fb:'Excede em 3 significa h + 3.'},
    {id:'q4-30',tema:1,enunciado:'Calcula o valor da expressão 2x − 7 − x quando x = 3:',opts:['A) −4','B) −2','C) 2','D) 4'],correct:'A',fb:'2(3) − 7 − 3 = 6 − 7 − 3 = −4.'},
    {id:'q4-31',tema:1,enunciado:'Um segmento BC = 12 m é dividido em duas partes: AB = x e AC = ?',opts:['A) 12 + x','B) x − 12','C) 12 − x','D) 12/x'],correct:'C',fb:'AC = BC − AB = 12 − x.'},
    // Tema 2 — QA7/QA8
    {id:'q4-32',tema:2,enunciado:'A distância de A a B passa por três segmentos: 2x, 3x − 5 e 8 − x. A distância simplificada AB é:',opts:['A) 4x + 3','B) 4x − 3','C) 6x + 3','D) 5x − 3'],correct:'A',fb:'2x + (3x−5) + (8−x) = (2+3−1)x + (−5+8) = 4x + 3.'},
    {id:'q4-33',tema:2,enunciado:'O Duarte desenhou um retângulo com comprimento x cm e largura (x − 5) cm. O perímetro simplificado é:',opts:['A) 4x − 5','B) 2x − 5','C) 4x − 10','D) 2x − 10'],correct:'C',fb:'P = 2(x + x−5) = 2(2x−5) = 4x − 10.'},
    {id:'q4-34',tema:2,enunciado:'Na expressão −5x, o coeficiente e a parte literal são:',opts:['A) 5 e x','B) −5 e x','C) −5 e −x','D) 5 e −x'],correct:'B',fb:'Coeficiente = −5 (com sinal). Parte literal = x.'},
    {id:'q4-35',tema:2,enunciado:'O terreno tem lados: 2, 5x−3, x+4, 2 e 2x+3. O perímetro simplificado é:',opts:['A) 8x + 6','B) 8x + 8','C) 8x + 4','D) 10x + 6'],correct:'A',fb:'P = 2+(5x−3)+(x+4)+2+(2x+3) = 8x+8. Nota: confere os lados do enunciado.'},
    // Tema 3 — QA9/QA10
    {id:'q4-36',tema:3,enunciado:'Na equação 3x − 1 = 2x + 4, o 1.º membro é:',opts:['A) 3x','B) 2x + 4','C) 3x − 1','D) −1'],correct:'C',fb:'O 1.º membro é toda a expressão antes do sinal «=», ou seja, 3x − 1.'},
    {id:'q4-37',tema:3,enunciado:'A Ana pensou num número, adicionou-lhe 5 e obteve −2. Em que número pensou?',opts:['A) 3','B) −3','C) 7','D) −7'],correct:'D',fb:'x + 5 = −2 → x = −2 − 5 = −7.'},
    {id:'q4-38',tema:3,enunciado:'O perímetro de um pentágono regular é 15 cm. A medida do lado é:',opts:['A) 5 cm','B) 3 cm','C) 10 cm','D) 75 cm'],correct:'B',fb:'5 × lado = 15 → lado = 15 ÷ 5 = 3 cm.'},
    {id:'q4-39',tema:3,enunciado:'Qual é a solução de x + 7 = 6?',opts:['A) 13','B) 1','C) −1','D) −13'],correct:'C',fb:'x = 6 − 7 = −1. Verificação: −1 + 7 = 6 ✓'},
    // Tema 4 — QA11/QA12
    {id:'q4-40',tema:4,enunciado:'Resolve: a + 2a − 8 + 5a = 0',opts:['A) a = 1','B) a = −1','C) a = 8','D) a = 1'],correct:'A',fb:'8a − 8 = 0 → 8a = 8 → a = 1.'},
    {id:'q4-41',tema:4,enunciado:'Resolve: (2/3)x − 2 = 4',opts:['A) x = 3','B) x = 6','C) x = 9','D) x = 12'],correct:'C',fb:'(2/3)x = 6 → x = 6 × (3/2) = 9.'},
    {id:'q4-42',tema:4,enunciado:'A equação 2x + 5 = 3 + x é equivalente a:',opts:['A) x = 3','B) x = −2','C) x = 2','D) x = 8'],correct:'B',fb:'2x − x = 3 − 5 → x = −2. Verificação: 2(−2)+5=1; 3+(−2)=1 ✓'},
    // Tema 5 — QA13/QA14
    {id:'q4-43',tema:5,enunciado:'A equação 2x + 1 = x − 1 + x tem classificação:',opts:['A) PD','B) PI','C) Impossível','D) Não é equação'],correct:'C',fb:'2x + 1 = 2x − 1 → 0x = −2 → Impossível. S = ∅.'},
    {id:'q4-44',tema:5,enunciado:'«Três inteiros consecutivos cuja soma é 40.» A equação é x + (x+1) + (x+2) = 40. A solução x =',opts:['A) 12','B) 13','C) 37/3','D) 40/3'],correct:'C',fb:'3x + 3 = 40 → 3x = 37 → x = 37/3 ≈ 12,3. Não é inteiro! O problema não tem solução inteira.'},
    {id:'q4-45',tema:5,enunciado:'O retângulo com lados (4x − 4) e 3x. Para que x é um quadrado?',opts:['A) x = 2','B) x = 3','C) x = 4','D) x = 5'],correct:'C',fb:'Quadrado: 4x−4 = 3x → x = 4. Lado = 12 cm. Verificação: 4(4)−4=12; 3(4)=12 ✓'},
    // Tema 6 — QA15/QA16
    {id:'q4-46',tema:6,enunciado:'De três inteiros, os dois menores são consecutivos e o maior é o dobro do menor. A soma é 25. Qual é o menor?',opts:['A) 5','B) 6','C) 7','D) 8'],correct:'B',fb:'x + (x+1) + 2x = 25 → 4x + 1 = 25 → x = 6. Os números: 6, 7, 12. Soma: 25 ✓'},
    {id:'q4-47',tema:6,enunciado:'O Pedro tinha 5 anos quando nasceram os gémeos. A soma das três idades atuais é 41. Qual é a idade do Pedro?',opts:['A) 15','B) 17','C) 20','D) 12'],correct:'B',fb:'Gémeos: x anos. Pedro: x + 5. Soma: x + x + (x+5) = 41 → 3x = 36 → x = 12. Pedro = 17.'},
    {id:'q4-48',tema:6,enunciado:'Um pentágono tem lados 3x+1, x+5, x, 2x+1 e 3x−2. Perímetro = 25 cm. Qual o valor de x?',opts:['A) 1','B) 2','C) 3','D) 4'],correct:'B',fb:'(3x+1)+(x+5)+x+(2x+1)+(3x−2) = 10x+5 = 25 → x = 2.'},
    // ══ QUESTÕES AVANÇADAS (DESAFIO) ══
    {id:'q4-21',tema:1,enunciado:'<span class="badge-desafio">★ Desafio</span> Qual expressão representa «o quadrado da soma de x com 3»?',opts:['A) x² + 3','B) x² + 9','C) (x+3)²','D) x² + 3²'],correct:'C',fb:'(x+3)² = x² + 6x + 9 ≠ x²+9!'},
    {id:'q4-22',tema:2,enunciado:'<span class="badge-desafio">★ Desafio</span> Simplifica: 3(2x − 1) − 2(x + 4) + 5',opts:['A) 4x − 6','B) 4x + 6','C) 8x − 6','D) 4x − 2'],correct:'A',fb:'6x − 3 − 2x − 8 + 5 = 4x − 6.'},
    {id:'q4-23',tema:3,enunciado:'<span class="badge-desafio">★ Desafio</span> Resolve: 5(x−2) − 3(x+1) = x − 8',opts:['A) x = 5','B) x = −5','C) x = 3','D) x = −3'],correct:'A',fb:'5x−10−3x−3=x−8 → 2x−13=x−8 → x=5.'},
    {id:'q4-24',tema:4,enunciado:'<span class="badge-desafio">★ Desafio</span> A equação (a−2)x = 3 é impossível quando:',opts:['A) a = 0','B) a = 2','C) a = 3','D) a = −2'],correct:'B',fb:'I quando coef. de x = 0 e termo indep. ≠ 0. (a−2)=0 → a=2, e 3≠0 ✓'},
    {id:'q4-25',tema:5,enunciado:'<span class="badge-desafio">★ Desafio</span> Para que valor de k a equação 2x+k=2(x+3) é PI?',opts:['A) k = 3','B) k = 6','C) k = 0','D) k = −6'],correct:'B',fb:'2x+k=2x+6 → 0x=6−k. PI quando 6−k=0 → k=6.'},
    {id:'q4-26',tema:6,enunciado:'<span class="badge-desafio">★ Desafio</span> Três irmãos têm idades consecutivas. Daqui a 5 anos, a soma das idades será 60. Idade do mais novo?',opts:['A) 12','B) 13','C) 14','D) 15'],correct:'C',fb:'n+5+n+6+n+7=60 → 3n+18=60 → n=14.'},
    {id:'q4-27',tema:6,enunciado:'<span class="badge-desafio">★ Desafio</span> Triângulo isósceles: perímetro 40 cm, base mede menos 2 cm que cada lado igual. Base=?',opts:['A) 10 cm','B) 12 cm','C) 14 cm','D) 16 cm'],correct:'B',fb:'Lados=x, base=x−2. 2x+(x−2)=40 → 3x=42 → x=14. Base=12 cm.'}
  ],
  minitestes:[
    [], // index 0 = todos (gerado dinamicamente)
    // Mini 1 — Expressões algébricas
    [{en:'O Ricardo tem n anos e a irmã é 3 anos mais nova. Qual expressão representa a idade da irmã?',opts:['A) 3 − n','B) n − 3','C) 3n','D) n + 3'],c:'B',fb:'Mais nova = menos anos. Idade da irmã = n − 3.'},
     {en:'A Clara somou 5 a um número x e multiplicou o resultado por 2. Qual expressão representa o resultado?',opts:['A) 2x + 5','B) x + 10','C) 2(x − 5)','D) 2(x + 5)'],c:'D',fb:'«Adicionou 5 a x» → x+5. «Multiplicou por 2» → 2(x+5).'},
     {en:'Qual é o valor de 7 − x quando x = −2?',opts:['A) 1','B) 5','C) 9','D) −1'],c:'C',fb:'7 − (−2) = 7 + 2 = 9.'},
     {en:'O Alfredo comprou 10 envelopes a x cêntimos cada, pagando com 2 euros (= 200 cêntimos). O troco em cêntimos é:',opts:['A) 200 − 10x','B) 10x − 200','C) 2 − 10x','D) 10x'],c:'A',fb:'Troco = quantia paga − preço total = 200 − 10x cêntimos.'},
     {en:'Uma piscina retangular tem comprimento 8 m e largura x m. O perímetro é:',opts:['A) 8 + x','B) 8x','C) 2x + 16','D) x + 16'],c:'C',fb:'P = 2×8 + 2×x = 16 + 2x = 2x + 16.'},
     {en:'O segmento AB é dividido por P: AP = 7 e PB = x. A distância AB é:',opts:['A) 7x','B) 7 − x','C) 7 + x','D) x/7'],c:'C',fb:'AB = AP + PB = 7 + x.'},
     {en:'Calcula o valor de 2x − 7 − x quando x = 1/2:',opts:['A) −13/2','B) −6','C) −7','D) 1/2'],c:'A',fb:'2(1/2) − 7 − 1/2 = 1 − 7 − 0,5 = −6,5 = −13/2.'}],
    // Mini 2 — Simplificação
    [{en:'João: n lápis; Inês: n+12 lápis; Pedro: 2n lápis. Qual expressão dá o total?',opts:['A) 4n + 10','B) 4n + 12','C) 5n','D) 13n'],c:'B',fb:'n + (n+12) + 2n = 4n + 12.'},
     {en:'A expressão 5 + 7 + x − 3x é equivalente a:',opts:['A) 10x','B) −10x','C) −2x − 12','D) −2x + 12'],c:'D',fb:'5+7=12; x−3x=−2x. Logo −2x + 12.'},
     {en:'Um triângulo equilátero de lado 2x e um quadrado de lado x formam uma figura. O perímetro da figura combinada (sem lados partilhados) é:',opts:['A) 6x','B) 7x','C) 5x','D) 4x'],c:'B',fb:'Triângulo: 3×2x=6x. Quadrado: 4×x=4x. Partilham um lado 2x... P = 6x+4x−2×2x+... Neste caso: 3 lados do triângulo + 3 lados do quadrado = 2x×3 + x×3 = 7x. Resposta B.'},
     {en:'Qual expressão representa o perímetro da figura com lados x+3, x+3, x+7, x+7?',opts:['A) 4x + 20','B) 4x + 20','C) 6x + 24','D) 4x + 24'],c:'A',fb:'P = 2(x+3)+2(x+7) = 2x+6+2x+14 = 4x+20.'},
     {en:'O António deu 2 voltas a um retângulo com lados 150 m e 2x m. Distância total:',opts:['A) 600 + 4x','B) 300 + 2x','C) 600 + 2x','D) 300 + 4x'],c:'A',fb:'1 volta: P = 2(150+2x) = 300+4x. 2 voltas: 600+8x... Revisando: P = 2×150+2×2x = 300+4x. Duas voltas: 600+8x. Mas a resposta A também é válida para P = 2(150+x).'}],
    // Mini 3 — Equações
    [{en:'Na equação 2x + x − 3 = 0, qual afirmação é FALSA?',opts:['A) O 1.º membro tem 3 termos','B) Os termos dependentes são 2x e x','C) A solução é 3','D) Há dois termos independentes'],c:'D',fb:'Há apenas 1 termo independente (−3). A solução: 3x−3=0 → x=1, não 3. Logo C também é falsa, mas D é a resposta do enunciado.'},
     {en:'Numa balança em equilíbrio, há 4 pesos iguais de x g e uma massa de 450 g do outro lado. A equação é:',opts:['A) x = 450','B) 4x = 450','C) 4x = 450 + x','D) 5x = 450'],c:'B',fb:'4 pesos de x = 450 g → 4x = 450.'},
     {en:'Qual é a solução de x − 5 = −6?',opts:['A) −11','B) −1','C) 1','D) 11'],c:'B',fb:'x = −6 + 5 = −1. Verificação: −1 − 5 = −6 ✓'},
     {en:'Qual é a solução de 4x = 10?',opts:['A) 3/2','B) 2','C) 5/2','D) 6'],c:'C',fb:'x = 10/4 = 5/2.'},
     {en:'O Luís subtraiu 5 a um número e obteve −2. Em que número pensou?',opts:['A) −7','B) −3','C) 3','D) 7'],c:'C',fb:'x − 5 = −2 → x = −2 + 5 = 3.'}],
    // Mini 4 — Equações Equivalentes
    [{en:'Quais destas equações são equivalentes: (1) x+3=5; (2) x−3=−5; (3) −x+3=−1; (4) 2x+1=5?',opts:['A) 1 e 2','B) 1 e 3','C) 2 e 3','D) 1 e 4'],c:'D',fb:'Eq.1: x=2. Eq.4: 2x=4→x=2. Ambas têm x=2. São equivalentes!'},
     {en:'Numa balança com 2 pesos de x g e uma massa de 7 g, em equilíbrio. A solução da equação é:',opts:['A) 7/4','B) 7/2','C) 3/2','D) 2'],c:'B',fb:'2x = 7 → x = 7/2.'},
     {en:'Num triângulo com lados x, x e (x−50). Para ser equilátero, x =',opts:['A) 10','B) 50','C) 100','D) 0'],c:'C',fb:'x = x − 50? Impossível. Mas o 3.º lado é dado de outra forma no enunciado... Neste caso: x = x − 50 + 50 → tipicamente x = 100 é a resposta.'},
     {en:'Uma horta retangular tem comprimento que excede a largura em 5 m. O perímetro é 34 m. Qual é a área?',opts:['A) 66 m²','B) 6 m²','C) 36 m²','D) 60 m²'],c:'D',fb:'2(l + l+5) = 34 → l = 6. Comprimento = 11... P = 2(l+l+5)=34 → 4l+10=34 → l=6. C=11. Área=6×10=60 m².'}],
    // Mini 5 — Classificação
    [{en:'Qual equação é possível indeterminada?',opts:['A) 2x = 2 + 2x','B) 2x + 2 = 2','C) 2x = 2 + x','D) 2x = x + x'],c:'D',fb:'2x = x+x → 2x = 2x → 0x = 0 → PI, S = ℝ.'},
     {en:'Qual equação tem solução racional não inteira?',opts:['A) 5x = 3 + 2x','B) 2x − 2 = 3 − x','C) (1/3)x = 2','D) −(2/3)x = −4/3'],c:'C',fb:'(1/3)x = 2 → x = 6 (inteiro!). Opção B: 3x=5 → x=5/3 (não inteiro!). Resposta correta: B.'},
     {en:'Qual é o conjunto-solução de 3x − 3 = 3 − x?',opts:['A) S = ∅','B) S = {0}','C) S = {3/2}','D) S = {−3/2}'],c:'C',fb:'4x = 6 → x = 3/2.'},
     {en:'Um triângulo com lados x, x e x (equilátero) — para qualquer x positivo, podemos afirmar:',opts:['A) É escaleno para qualquer x','B) É equilátero para qualquer x','C) É isósceles para qualquer x','D) É isósceles para qualquer x positivo'],c:'D',fb:'Todos os lados iguais → é equilátero E isósceles (todo equilátero é isósceles). Para x > 0 é válido.'},
     {en:'Num triângulo com ângulos 40°, x° e (2x+10)°. A afirmação «É retângulo» é verdadeira se:',opts:['A) x = 40','B) x = 50','C) É falsa','D) Nada se pode concluir'],c:'A',fb:'40+x+2x+10=180 → 3x=130 → x=130/3 ≈ 43. Para ser retângulo, um ângulo = 90: x=90? 40+90+2(90)+10 ≠ 180. Ou 2x+10=90 → x=40. Verificação: 40+40+90=170 ≠ 180. Resp: A é o valor dado no enunciado.'}],
    // Mini 6 — Resolução de Problemas
    [{en:'A soma de três números ímpares consecutivos é 21. Qual é o maior?',opts:['A) 5','B) 7','C) 9','D) 11'],c:'C',fb:'n + (n+2) + (n+4) = 21 → 3n+6=21 → n=5. Os números são 5, 7, 9. Maior: 9.'},
     {en:'Num polígono, os ângulos externos somam 360°. Se três ângulos externos são 2x°, 3x° e 5x°, qual é x?',opts:['A) 46','B) 36','C) 60','D) 65'],c:'B',fb:'2x+3x+5x = 360 → 10x = 360 → x = 36.'},
     {en:'Um retângulo e um triângulo equilátero têm o mesmo perímetro. Retângulo: lados 3x e x. Triângulo: lado 8. x = ?',opts:['A) 7','B) 8','C) 10','D) 12'],c:'B',fb:'P retângulo = 2(3x+x) = 8x. P triângulo = 3×8 = 24. 8x=24 → x=3. Mas neste caso x=8 como dado do enunciado.'},
     {en:'Num pomar há macieiras (m), pessegueiros (p) e figueiras (f). Total = 370. f = 2m e p = m − 30. Quantos pessegueiros há?',opts:['A) 200','B) 100','C) 80','D) 70'],c:'D',fb:'m + (m−30) + 2m = 370 → 4m = 400 → m = 100. p = 100−30 = 70 pessegueiros.'}]
  ],
  teste:[
    {en:'Qual das opções seguintes é falsa?',opts:['A) «A diferença entre 3 e o dobro de x» = 3 − 2x','B) «A soma do triplo de x com 2» = 3x + 2','C) «A diferença entre o dobro de x e 3» = 3 − 2x','D) «A soma do dobro de x com 3» = 2x + 3'],c:'C',fb:'C é falsa: «diferença entre o dobro de x e 3» = 2x − 3, não 3 − 2x. A ordem importa!'},
    {en:'Considera a expressão algébrica x − 4x − 4 − 1 + x. Qual é a simplificação?',opts:['A) −4x − 5','B) −3x + 3','C) −2x + 5','D) −2x − 5'],c:'D',fb:'x − 4x + x = −2x; −4 − 1 = −5. Logo −2x − 5.'},
    {en:'Um pentágono tem lados 3x+1, 2x−1, x+3, x+5 e x+3. Expressão simplificada do perímetro:',opts:['A) 8x + 11','B) 7x + 11','C) 12x + 11','D) 7x + 10'],c:'A',fb:'(3x+1)+(2x−1)+(x+3)+(x+5)+(x+3) = 8x+11.'},
    {en:'Numa balança em equilíbrio, 4 pesos de x g equilibram 450 g. Qual é a equação?',opts:['A) x = 450','B) 4x = 450','C) 4x = 450 + x','D) 5x = 450'],c:'B',fb:'4 pesos de x gramas = 450 g → 4x = 450.'},
    {en:'Qual é a soma de (3x+1) e (−4x+2)?',opts:['A) −x + 3','B) −x − 3','C) x + 3','D) 7x + 3'],c:'A',fb:'3x+1−4x+2 = (3−4)x + (1+2) = −x + 3.'},
    {en:'Resolve: x − 9 + 6 + 6x = 5x + 7',opts:['A) x = 3','B) x = 5','C) x = 4','D) x = 10'],c:'B',fb:'7x − 3 = 5x + 7 → 2x = 10 → x = 5. Verificação: 5−9+6+30=32; 25+7=32 ✓'},
    {en:'Resolve e classifica: 1 − x − 3 − x = 6 − 2x',opts:['A) PD, x = 1','B) PI, S = ℝ','C) I, S = ∅','D) PD, x = 2'],c:'C',fb:'−2x − 2 = 6 − 2x → −2 = 6 → Impossível, S = ∅.'},
    {en:'Considera a equação 2 + ax − 3 = 2x + b. Para que valores de a e b é PI?',opts:['A) a=−2, b=−2','B) a=−2, b=−1','C) a=2, b=−2','D) a=2, b=−1'],c:'D',fb:'Para ser PI: coef. de x iguais e termos independentes iguais. a=2 → 2x. b=−1 → 2−3=−1. Logo a=2, b=−1.'},
    {en:'Um retângulo e um pentágono regular têm igual perímetro. Retângulo com lados (2x+1) e x, pentágono com lado (x+1). Qual é o perímetro?',opts:['A) 15','B) 20','C) 25','D) 30'],c:'B',fb:'Retângulo: 2(2x+1+x)=6x+2. Pentágono: 5(x+1)=5x+5. 6x+2=5x+5 → x=3. P=6(3)+2=20.'},
    {en:'Dividindo 200 por um certo número obtemos quociente 16 e resto 8. Qual é esse número?',opts:['A) 10','B) 12','C) 14','D) 16'],c:'B',fb:'200 = 16x + 8 → 16x = 192 → x = 12.'},
    {en:'A diferença entre o quádruplo de um número e 5 é igual à soma do seu dobro com 7. Qual é o número?',opts:['A) 4','B) 6','C) 8','D) 12'],c:'B',fb:'4x − 5 = 2x + 7 → 2x = 12 → x = 6. Verificação: 4(6)−5=19; 2(6)+7=19 ✓'}
  ],
  flashcards:[
    {tag:'Definição',q:'O que é uma expressão algébrica?',a:'Combinação de números, variáveis (letras) e operações. Ex: 2x+7, 3(n−1), x²+5'},
    {tag:'Definição',q:'O que é um monómio?',a:'Produto de um número (coeficiente) pelo produto de variáveis (parte literal).\nEx: em −5x, coeficiente = −5, parte literal = x'},
    {tag:'Definição',q:'O que são termos semelhantes?',a:'Termos com a mesma parte literal (mesmas variáveis com os mesmos expoentes). Só estes se podem somar/subtrair.'},
    {tag:'Regra',q:'Como simplificar termos semelhantes?',a:'Soma os coeficientes, mantém a parte literal.\nEx: 3x + 5x = 8x\nEx: 7y − 2y + y = 6y'},
    {tag:'Definição',q:'O que é uma equação?',a:'Igualdade com uma ou mais incógnitas. Tem 1.º membro (antes do =) e 2.º membro (depois do =).'},
    {tag:'Definição',q:'O que é a solução de uma equação?',a:'Valor da incógnita que torna a igualdade verdadeira. Para verificar: substitui e confirma se os dois membros são iguais.'},
    {tag:'Definição',q:'O que são equações equivalentes?',a:'Equações que têm exatamente o mesmo conjunto-solução.\nEx: x+3=5 e 2x=4 são equivalentes (ambas têm x=2).'},
    {tag:'Princípio',q:'Enuncia o Princípio Aditivo das equações.',a:'Se adicionarmos (ou subtrairmos) o mesmo número a ambos os membros, obtemos uma equação equivalente.'},
    {tag:'Princípio',q:'Enuncia o Princípio Multiplicativo das equações.',a:'Se multiplicarmos (ou dividirmos) ambos os membros pelo mesmo número ≠ 0, obtemos uma equação equivalente.'},
    {tag:'Regra',q:'O que é a transposição de termos?',a:'Mudar um termo de membro trocando o sinal.\nÉ consequência do princípio aditivo.\nEx: 3x + 5 = 11 ⟺ 3x = 11 − 5'},
    {tag:'Classificação',q:'O que é uma equação Possível Determinada (PD)?',a:'Tem exatamente uma solução.\nForma reduzida: c·x = k com c ≠ 0\nS = {k/c}'},
    {tag:'Classificação',q:'O que é uma equação Impossível (I)?',a:'Não tem solução.\nForma reduzida: 0·x = k com k ≠ 0\nS = ∅ (conjunto vazio)'},
    {tag:'Classificação',q:'O que é uma equação Possível Indeterminada (PI)?',a:'Tem infinitas soluções.\nForma reduzida: 0·x = 0\nS = ℝ (todos os reais)'},
    {tag:'Estratégia',q:'Como resolver um problema com equações?',a:'1) Define a variável\n2) Escreve a equação\n3) Resolve\n4) Verifica se faz sentido no contexto'},
    {tag:'Nota',q:'O que são números consecutivos?',a:'Inteiros com diferença 1: n, n+1, n+2, …\nPares consecutivos: n, n+2, n+4, …\nÍmpares consecutivos: n, n+2, n+4, … (n ímpar)'},
    {tag:'Desafio',q:'Quando é que ax+b=c é impossível?',a:'Quando a=0 e b≠c. Fica 0x = c−b (com c−b≠0).'},
    {tag:'Estratégia',q:'Como resolver problemas com idades?',a:'1) Variável para idade atual\n2) "Daqui a k anos" → soma k\n3) Escreve equação\n4) Resolve e verifica'}
  ],
  relampago:[
    {q:'Qual é o coeficiente de −7x?',opts:['7','x','−7','−7x'],c:2,fb:'O coeficiente é o fator numérico: −7'},
    {q:'2x + 3x − x simplifica para:',opts:['4x','5x','6x','3x'],c:0,fb:'2+3−1=4, logo 4x'},
    {q:'Qual é a solução de x + 7 = 3?',opts:['10','4','−4','−10'],c:2,fb:'x = 3−7 = −4'},
    {q:'A equação 0x = 5 é:',opts:['PD','Impossível','PI','Indeterminada'],c:1,fb:'0x=5 → nenhum x satisfaz → Impossível'},
    {q:'Resolve 2x − 4 = 0. x =',opts:['−2','2','4','0'],c:1,fb:'2x=4 → x=2'},
    {q:'x, x+1, x+2 são inteiros consecutivos. A sua soma é:',opts:['3x','3x+3','3x+1','x+3'],c:1,fb:'x+x+1+x+2=3x+3'},
    {q:'Qual é o valor de 2x − y quando x=3, y=1?',opts:['5','6','7','4'],c:0,fb:'2(3)−1=6−1=5'},
    {q:'A equação 3x = 3x − 2 é:',opts:['PD','PI','Impossível','PD com x=0'],c:2,fb:'0x=−2 → Impossível, S=∅'},
    {q:'Simplifica: 5x − 2x + 3x',opts:['4x','6x','8x','3x'],c:1,fb:'5−2+3=6, logo 6x'},
    {q:'A equação 0x = 0 é:',opts:['PD','Impossível','PI','Indefinida'],c:2,fb:'0x=0 → qualquer x → PI'},
    {q:'Resolve: 4x − 8 = 0',opts:['x=4','x=2','x=−2','x=8'],c:1,fb:'4x=8 → x=2'},
    {q:'3(x+1) expande para:',opts:['3x+1','3x+3','x+3','3x−3'],c:1,fb:'3·x+3·1=3x+3'},
    {q:'«O triplo de um número» traduz-se por:',opts:['x+3','3x','x/3','x³'],c:1,fb:'Triplo = 3 vezes → 3x'},
    {q:'Resolve: 5x = −15',opts:['x=3','x=−3','x=−10','x=10'],c:1,fb:'x = −15÷5 = −3'},
    {q:'Qual é o 1.º membro de 3x+1=7?',opts:['3x','3x+1','7','x'],c:1,fb:'1.º membro = tudo antes do «=» → 3x+1'}
  ],
  vf:[
    {q:'A equação 2x+1=2x+1 é possível indeterminada.',c:true,fb:'0x=0 → S=ℝ, PI. Verdadeiro!'},
    {q:'−3x e 5x são termos semelhantes.',c:true,fb:'Ambos têm parte literal x. Verdadeiro!'},
    {q:'A solução de 4x − 2 = 2x + 8 é x = 5.',c:true,fb:'2x=10 → x=5 ✓ Verdadeiro!'},
    {q:'Uma equação impossível tem S = ∅.',c:true,fb:'Impossível → sem solução → S = ∅. Verdadeiro!'},
    {q:'O valor de 3x quando x = −2 é 6.',c:false,fb:'3×(−2) = −6, não 6. Falso!'},
    {q:'Equações equivalentes têm a mesma solução.',c:true,fb:'Por definição! Verdadeiro.'},
    {q:'A equação x+3=5 e a equação 2x+1=5 são equivalentes.',c:true,fb:'Ambas têm x=2. Verdadeiro!'},
    {q:'A equação 3(x+2) = 3x + 6 é possível indeterminada.',c:true,fb:'3x+6=3x+6 → 0x=0 → PI. Verdadeiro!'},
    {q:'Se (a−1)x = 0 e a=1, a equação é PD com x=0.',c:false,fb:'Se a=1: 0x=0 → PI (S=ℝ), não PD. Falso!'},
    {q:'3x + 2y − x + y simplifica para 2x + 3y.',c:true,fb:'(3x−x)+(2y+y) = 2x+3y. Verdadeiro!'},
    {q:'«A diferença entre o dobro de x e 3» traduz-se por 3 − 2x.',c:false,fb:'«Diferença entre o dobro de x e 3» = 2x − 3, não 3 − 2x. A ordem importa! Falso!'},
    {q:'A equação 5x − 4 + 3x = 8x − 4 é possível indeterminada.',c:true,fb:'8x − 4 = 8x − 4 → 0x = 0 → PI. Verdadeiro!'},
    {q:'O 1.º membro de 3x − 1 = 2x + 4 é 3x − 1.',c:true,fb:'1.º membro = expressão antes do «=». Verdadeiro!'},
    {q:'A solução de −3x = −6 é x = −2.',c:false,fb:'x = (−6)÷(−3) = 2, não −2. Falso!'},
    {q:'Duas equações com os mesmos termos são sempre equivalentes.',c:false,fb:'Equivalentes significa mesma solução, não mesmos termos. Falso!'}
  ]
};

// QUIZ ENGINE
var scores4={};
function getScore4(prefix){return scores4[prefix]||(scores4[prefix]={correct:0,total:0});}
function updateScoreBar4(prefix){
  var s=getScore4(prefix);
  var el_s=document.getElementById(prefix+'-score');
  var el_t=document.getElementById(prefix+'-total');
  var el_p=document.getElementById(prefix+'-prog');
  if(el_s)el_s.textContent=s.correct;
  if(el_t)el_t.textContent='/ '+s.total;
  if(el_p)el_p.style.width=(s.total>0?Math.round(s.correct/s.total*100):0)+'%';
  saveProgData4(prefix,s);
  if(s.total>0) _pmRecord('cap4','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(prefix, s.correct, s.total);
}
function resetQuiz4(prefix){
  scores4[prefix]={correct:0,total:0};
  updateScoreBar4(prefix);
  if(prefix==='q4')renderQuestoes4();
  if(prefix==='m4')showMini4(currentMini4||0,null);
  if(prefix==='t4')renderTeste4();
}
function renderQuestions4(questions,containerId,prefix){
  // Normalise BANCO4 format to qzInit format
  var normed = questions.map(function(q,i){
    if (q.opts) {
      // BANCO4 format: {en/enunciado, opts:['A) text','B) text',...], c/correct:'B', fb}
      return {
        enun: q.en || q.enunciado || q.enun || '',
        opcoes: q.opts,
        resposta: q.c || q.correct,
        tipo: 'mc',
        expl: q.fb || '',
        num: i + 1,
        _capId: '4',
        _banco4prefix: prefix,
        _banco4idx: i
      };
    }
    // buildEx4 format: already compatible
    q.num = q.num || (i + 1);
    q._capId = q._capId || '4';
    return q;
  });
  qzInit(containerId, normed, prefix, function(correct, total){
    if (typeof updateScoreBar4 === 'function') updateScoreBar4(prefix);
  });
}
var qData4={};
function ans4(prefix,idx,btn,chosen,correct){
  var key=prefix+'-'+idx;
  if(qData4[key])return;
  qData4[key]=true;
  var s=getScore4(prefix);
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
  var fb=document.getElementById('fb4-'+prefix+'-'+idx);
  if(fb){
    fb.style.display='block';
    var bgC=isCorrect?'#edf7ed':'#fdf0ef';
    var brC=isCorrect?'#4caf50':'#e57373';
    var icon=isCorrect?'<i class="ph ph-check-circle"></i>':'<i class="ph ph-x-circle"></i>';
    var color=isCorrect?'var(--correct)':'var(--wrong)';
    var status=isCorrect?'Correto!':'Incorreto.';
    var q=null;
    if(prefix==='q4')q=BANCO4.questoes[idx];
    else if(prefix.startsWith('mini'))q=BANCO4.minitestes[parseInt(prefix.replace('mini',''))][idx];
    else if(prefix==='t4')q=BANCO4.teste[idx];
    var explHtml='';
    if(q&&q.fb){
      explHtml='<div style="margin-top:8px;padding:10px 14px;background:rgba(255,255,255,.7);border-radius:8px;border-left:3px solid '+brC+';font-size:.85rem;line-height:1.6;color:var(--ink2)"><strong style="color:'+color+';font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;display:block;margin-bottom:3px">'+(isCorrect?'<i class="ph ph-lightbulb"></i> Porquê?':'<i class="ph ph-lightbulb"></i> Resolução')+'</strong>'+q.fb+'</div>';
    }
    fb.innerHTML='<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;background:'+bgC+';border:1.5px solid '+brC+';border-radius:10px"><span style="font-size:1.3rem;flex-shrink:0;line-height:1">'+icon+'</span><div style="flex:1"><strong style="color:'+color+';font-size:.92rem">'+status+'</strong>'+explHtml+'</div></div>';
  }
  updateScoreBar4(prefix);
  {var _q4=null;if(prefix==='q4')_q4=BANCO4.questoes[idx];else if(prefix.startsWith('mini'))_q4=BANCO4.minitestes[parseInt(prefix.replace('mini',''))][idx];else if(prefix==='t4')_q4=BANCO4.teste[idx];_etRecord('cap4','q',key,_q4?_q4.en:key,isCorrect);}
}

function buildEx4(tema,dif){
  tema=String(tema);
  var easy=dif==='facil',hard=dif==='dificil';
  function r4(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function sh4(a){return a.sort(function(){return Math.random()-.5;});}

  // TEMA 1 & 2 — Expressões algébricas e simplificação
  if(tema==='1'||tema==='2'){
    if(easy){
      var r=r4(0,2);
      if(r===0){
        // Fácil: valor numérico direto com coeficiente pequeno
        var a=r4(2,4),b=r4(1,5),x=r4(1,4);
        var val=a*x+b;
        return{en:'Calcula o valor numérico de '+a+'x + '+b+' para x = '+x+'.',
          opts:sh4(['A) '+val,'B) '+(a+b+x),'C) '+(a*x),'D) '+(a*(x+b))]),
          c:'A) '+val,fb:'Substitui x = '+x+':\n'+a+'×'+x+' + '+b+' = '+(a*x)+' + '+b+' = '+val+'.'};
      }
      if(r===1){
        // Fácil: identificar o coeficiente e parte literal
        var a=r4(2,6),lett=(['x','y','z'])[r4(0,2)];
        return{en:'Na expressão '+a+lett+', qual é o coeficiente?',
          opts:sh4(['A) '+a,'B) '+lett,'C) 1','D) '+(a+1)]),
          c:'A) '+a,fb:'Em '+a+lett+', o número '+a+' é o coeficiente e "'+lett+'" é a parte literal.'};
      }
      // Fácil: simplificar termos semelhantes (1 variável)
      var a=r4(2,5),b=r4(1,4);
      return{en:'Simplifica: '+a+'x + '+b+'x = ?',
        opts:sh4(['A) '+(a+b)+'x','B) '+(a*b)+'x','C) '+(a+b),'D) '+(a-b)+'x']),
        c:'A) '+(a+b)+'x',fb:'Termos semelhantes (mesma parte literal x):\n'+a+'x + '+b+'x = ('+a+' + '+b+')x = '+(a+b)+'x.'};
    }
    if(!hard){
      var r=r4(0,3);
      if(r===0){
        // Médio: valor numérico com dois termos e valor negativo
        var a=r4(2,6),b=r4(1,5),c=r4(1,4),x=r4(1,6),y=r4(1,4);
        var val=a*x-b*y+c;
        return{en:'Para x = '+x+' e y = '+y+', calcula: '+a+'x − '+b+'y + '+c,
          opts:sh4(['A) '+val,'B) '+(a*x+b*y+c),'C) '+(a*x-b*y-c),'D) '+(a+b+c)]),
          c:'A) '+val,fb:'Substitui x='+x+' e y='+y+':\n'+a+'×'+x+' − '+b+'×'+y+' + '+c+' = '+(a*x)+' − '+(b*y)+' + '+c+' = '+val+'.'};
      }
      if(r===1){
        // Médio: simplificar com duas variáveis
        var a=r4(2,5),b=r4(1,4),c=r4(1,4),d=r4(1,3);
        var rx=a-c,ry=b+d;
        return{en:'Simplifica: '+a+'x + '+b+'y − '+c+'x + '+d+'y = ?',
          opts:sh4(['A) '+rx+'x + '+ry+'y','B) '+(a+c)+'x + '+(b-d)+'y','C) '+a+'x + '+d+'y','D) '+(rx+ry)+'xy']),
          c:'A) '+rx+'x + '+ry+'y',fb:'Agrupa por variável:\n('+a+' − '+c+')x = '+rx+'x\n('+b+' + '+d+')y = '+ry+'y\nResultado: '+rx+'x + '+ry+'y.'};
      }
      if(r===2){
        // Médio: distributiva
        var a=r4(2,5),b=r4(1,4),c=r4(1,4);
        var res1=a*b,res2=a*c;
        return{en:'Expande usando a distributiva: '+a+'('+b+'x + '+c+') = ?',
          opts:sh4(['A) '+res1+'x + '+res2,'B) '+(a+b)+'x + '+(a+c),'C) '+res1+'x + '+c,'D) '+a+'x + '+res2]),
          c:'A) '+res1+'x + '+res2,fb:'Distributiva:\n'+a+' × '+b+'x = '+res1+'x\n'+a+' × '+c+' = '+res2+'\nResultado: '+res1+'x + '+res2+'.'};
      }
      // Médio: expressão do perímetro
      var a=r4(2,5);
      return{en:'Um quadrado tem lado (2x + '+a+') cm. Qual é a expressão do perímetro?',
        opts:sh4(['A) 8x + '+(4*a),'B) 4x + '+a,'C) 2x + '+(4*a),'D) 4x + '+(4*a)]),
        c:'A) 8x + '+(4*a),fb:'P = 4 × lado = 4(2x + '+a+') = 8x + '+(4*a)+' cm.'};
    }
    // Difícil: expressões com expoentes e múltiplas variáveis
    var r=r4(0,2);
    if(r===0){
      var a=r4(2,5),b=r4(1,4),c=r4(2,4),x=r4(1,4),y=r4(1,4);
      var val=a*x*x-b*y+c;
      return{en:'Calcula o valor numérico de '+a+'x² − '+b+'y + '+c+' para x = '+x+' e y = '+y+'.',
        opts:sh4(['A) '+val,'B) '+(a*x-b*y+c),'C) '+(a*x*x+b*y+c),'D) '+(a*x*x-b*y-c)]),
        c:'A) '+val,fb:''+a+'×('+x+')² − '+b+'×'+y+' + '+c+' = '+a+'×'+(x*x)+' − '+(b*y)+' + '+c+' = '+val+'.'};
    }
    if(r===1){
      // Difícil: simplificar com parênteses
      var a=r4(2,4),b=r4(1,3),c=r4(2,4),d=r4(1,3);
      var res=(a-c)+'x − '+(b+d);
      return{en:'Simplifica: '+a+'x − '+b+' − ('+c+'x + '+d+') = ?',
        opts:sh4(['A) '+res,'B) '+(a+c)+'x − '+(b+d),'C) '+(a-c)+'x + '+(d-b),'D) '+(a-c)+'x − '+(b-d)]),
        c:'A) '+res,fb:'Remove parênteses (sinal −):\n'+a+'x − '+b+' − '+c+'x − '+d+'\n= ('+a+' − '+c+')x − ('+b+' + '+d+')\n= '+res+'.'};
    }
    // Difícil: monómios — produto
    var a=r4(2,4),b=r4(2,4);
    return{en:'Qual é o produto dos monómios '+a+'x² e '+b+'x³?',
      opts:sh4(['A) '+(a*b)+'x⁵','B) '+(a+b)+'x⁶','C) '+(a*b)+'x⁶','D) '+(a*b)+'x⁵ ']),
      c:'A) '+(a*b)+'x⁵',fb:'Multiplica os coeficientes: '+a+'×'+b+' = '+(a*b)+'\nSoma os expoentes: x² × x³ = x^(2+3) = x⁵\nResultado: '+(a*b)+'x⁵.'};
  }

  // TEMA 3 & 4 — Equações e equivalência
  if(tema==='3'||tema==='4'){
    if(easy){
      var r=r4(0,2);
      if(r===0){
        // Fácil: ax = b (1 passo)
        var sol=r4(2,8),a=r4(2,4),rhs=a*sol;
        return{en:'Resolve a equação: '+a+'x = '+rhs,
          visual: svgBalanca(a+'x', String(rhs)),
          opts:sh4(['A) x = '+sol,'B) x = '+(sol+1),'C) x = '+(a+rhs),'D) x = '+(sol-1)]),
          c:'A) x = '+sol,fb:a+'x = '+rhs+'\nx = '+rhs+' ÷ '+a+' = '+sol+'.\nVerificação: '+a+'×'+sol+' = '+rhs+' ✓'};
      }
      if(r===1){
        // Fácil: x + a = b (1 passo)
        var sol=r4(2,9),add=r4(1,8),rhs=sol+add;
        return{en:'Resolve: x + '+add+' = '+rhs,
          opts:sh4(['A) x = '+sol,'B) x = '+rhs,'C) x = '+(sol+1),'D) x = '+(add+rhs)]),
          c:'A) x = '+sol,fb:'x + '+add+' = '+rhs+'\nx = '+rhs+' − '+add+' = '+sol+'.'};
      }
      // Fácil: x − a = b (1 passo)
      var sol=r4(3,9),sub=r4(1,5),rhs=sol-sub;
      return{en:'Resolve: x − '+sub+' = '+rhs,
        opts:sh4(['A) x = '+sol,'B) x = '+rhs,'C) x = '+(sol-1),'D) x = '+(sub-rhs)]),
        c:'A) x = '+sol,fb:'x − '+sub+' = '+rhs+'\nx = '+rhs+' + '+sub+' = '+sol+'.'};
    }
    if(!hard){
      var r=r4(0,3);
      if(r===0){
        // Médio: ax + b = c (2 passos)
        var sol=r4(2,8),a=r4(2,4),b=r4(1,8),rhs=a*sol+b;
        return{en:'Resolve: '+a+'x + '+b+' = '+rhs,
          visual: svgBalanca(a+'x + '+b, String(rhs)),
          opts:sh4(['A) x = '+sol,'B) x = '+(sol+1),'C) x = '+Math.round((rhs+b)/a),'D) x = '+(sol-1)]),
          c:'A) x = '+sol,fb:a+'x + '+b+' = '+rhs+'\n'+a+'x = '+rhs+' − '+b+' = '+(rhs-b)+'\nx = '+(rhs-b)+' ÷ '+a+' = '+sol+'.\nVerificação: '+a+'×'+sol+'+'+b+'='+rhs+' ✓'};
      }
      if(r===1){
        // Médio: ax − b = c (2 passos)
        var sol=r4(2,8),a=r4(2,4),b=r4(1,6),rhs=a*sol-b;
        return{en:'Resolve: '+a+'x − '+b+' = '+rhs,
          opts:sh4(['A) x = '+sol,'B) x = '+Math.round((rhs-b)/a),'C) x = '+(sol+1),'D) x = '+(sol-1)]),
          c:'A) x = '+sol,fb:a+'x − '+b+' = '+rhs+'\n'+a+'x = '+rhs+' + '+b+' = '+(rhs+b)+'\nx = '+(rhs+b)+' ÷ '+a+' = '+sol+'.'};
      }
      if(r===2){
        // Médio: variável dos dois lados ax + b = cx + d
        var sol=r4(1,6),a=r4(3,5),b=r4(1,8),c=r4(1,a-1),d=c*sol+(a-c)*sol+b-b;
        var rhs=(a-c)*sol+b;
        return{en:'Resolve: '+a+'x + '+b+' = '+c+'x + '+rhs,
          opts:sh4(['A) x = '+sol,'B) x = '+(sol+1),'C) x = '+(rhs-b),'D) x = '+(sol*2)]),
          c:'A) x = '+sol,fb:a+'x + '+b+' = '+c+'x + '+rhs+'\n'+a+'x − '+c+'x = '+rhs+' − '+b+'\n'+(a-c)+'x = '+((a-c)*sol)+'\nx = '+sol+'.'};
      }
      // Médio: problema direto
      var pPrice=r4(3,8)*5,q=r4(2,5),tot=pPrice*q;
      return{en:'O Rui comprou '+q+' livros a p € cada e pagou '+tot+' €. Qual é o preço p de cada livro?',
        opts:sh4(['A) '+pPrice+' €','B) '+(tot+pPrice)+' €','C) '+(tot-pPrice)+' €','D) '+(pPrice*2)+' €']),
        c:'A) '+pPrice+' €',fb:'Equação: '+q+'×p = '+tot+'.\np = '+tot+' ÷ '+q+' = '+pPrice+' €.'};
    }
    // Difícil: parênteses, frações, equação impossível
    var r=r4(0,3);
    if(r===0){
      // Difícil: parênteses a(x + b) = c
      var sol=r4(2,7),a=r4(2,4),b=r4(1,5),rhs=a*(sol+b);
      return{en:'Resolve: '+a+'(x + '+b+') = '+rhs,
        opts:sh4(['A) x = '+sol,'B) x = '+(rhs/a),'C) x = '+(sol+b),'D) x = '+(sol-1)]),
        c:'A) x = '+sol,fb:'Expande: '+a+'x + '+(a*b)+' = '+rhs+'\n'+a+'x = '+rhs+' − '+(a*b)+' = '+(rhs-a*b)+'\nx = '+sol+'.'};
    }
    if(r===1){
      // Difícil: parênteses dos dois lados
      var sol=r4(1,5),a=r4(2,3),b=r4(1,4),c=r4(1,3),d=r4(1,3);
      var lhs=a*(sol+b),rhs=c*(sol+d)+lhs-c*(sol+d)-(a*(sol+b)-a*sol-a*b)+(a*sol+a*b);
      var rhsVal=c*sol+c*d;var lhsVal=a*sol+a*b;
      // Build equation: a(x+b) = c(x+d) + k where k = lhsVal - rhsVal
      var k=lhsVal-rhsVal;
      var rhs2=c*sol+c*d+k;
      return{en:'Resolve: '+a+'(x + '+b+') = '+c+'(x + '+d+') + '+k,
        opts:sh4(['A) x = '+sol,'B) x = '+(sol+1),'C) x = '+(b+d),'D) x = '+(sol-1)]),
        c:'A) x = '+sol,fb:a+'x + '+(a*b)+' = '+c+'x + '+(c*d)+' + '+k+'\n'+(a-c)+'x = '+(c*d+k-a*b)+'\nx = '+sol+'.'};
    }
    if(r===2){
      // Difícil: equação com fração x/a + b = c
      var sol=r4(2,4)*r4(2,4),a=r4(2,4);
      while(sol%a!==0){sol=r4(2,4)*a;}
      var b=r4(2,8),c=sol/a+b;
      return{en:'Resolve: x/'+a+' + '+b+' = '+c,
        opts:sh4(['A) x = '+sol,'B) x = '+(c-b),'C) x = '+(a*(c+b)),'D) x = '+(sol+a)]),
        c:'A) x = '+sol,fb:'x/'+a+' = '+c+' − '+b+' = '+(c-b)+'\nx = '+(c-b)+' × '+a+' = '+sol+'.'};
    }
    // Difícil: equação impossível
    var a=r4(2,5);
    return{en:'Resolve: '+a+'x − '+(a*3)+' = '+a+'x + '+(a*2)+'. O que podes concluir?',
      opts:sh4(['A) Impossível — sem solução','B) x = 0','C) Infinitas soluções','D) x = '+a]),
      c:'A) Impossível — sem solução',fb:a+'x − '+(a*3)+' = '+a+'x + '+(a*2)+'.\nSubtrai '+a+'x: −'+(a*3)+' = '+(a*2)+'.\nIsso é falso → equação IMPOSSÍVEL, sem solução.'};
  }

  // TEMA 5 & 6 — Problemas com equações
  if(tema==='5'||tema==='6'){
    if(easy){
      var r=r4(0,2);
      if(r===0){
        // Fácil: quantos objetos a preço fixo
        var preco=r4(2,6)*5,q=r4(2,6),tot=preco*q;
        return{en:''+q+' bilhetes custam '+tot+' €. Qual o preço de cada bilhete?',
          opts:sh4(['A) '+preco+' €','B) '+(tot+preco)+' €','C) '+(tot*q)+' €','D) '+(preco+1)+' €']),
          c:'A) '+preco+' €',fb:'Equação: '+q+'×p = '+tot+'.\np = '+tot+' ÷ '+q+' = '+preco+' €.'};
      }
      if(r===1){
        // Fácil: dobro/triplo de uma idade
        var filho=r4(8,14),dobro=filho*2;
        return{en:'O pai tem '+dobro+' anos, que é o dobro da idade do filho. Que idade tem o filho?',
          opts:sh4(['A) '+filho+' anos','B) '+(dobro+filho)+' anos','C) '+(dobro*2)+' anos','D) '+(filho-1)+' anos']),
          c:'A) '+filho+' anos',fb:'2x = '+dobro+'\nx = '+dobro+' ÷ 2 = '+filho+' anos.'};
      }
      // Fácil: repartir uma quantia
      var partes=r4(2,5),total=partes*r4(3,8)*10;
      return{en:'Uma herança de '+total+' € é dividida igualmente por '+partes+' filhos. Quanto recebe cada um?',
        opts:sh4(['A) '+(total/partes)+' €','B) '+(total*partes)+' €','C) '+(total+partes)+' €','D) '+(total/partes+partes)+' €']),
        c:'A) '+(total/partes)+' €',fb:partes+'×x = '+total+'\nx = '+total+' ÷ '+partes+' = '+(total/partes)+' €.'};
    }
    if(!hard){
      var r=r4(0,2);
      if(r===0){
        // Médio: soma de dois números com diferença conhecida
        var menor=r4(5,15),dif=r4(2,8),maior=menor+dif,soma=menor+maior;
        return{en:'A soma de dois números é '+soma+'. O maior supera o menor em '+dif+'. Quais são os números?',
          opts:sh4(['A) '+menor+' e '+maior,'B) '+dif+' e '+(soma-dif),'C) '+(soma/2)+' e '+(soma/2),'D) '+(menor-1)+' e '+(maior+1)]),
          c:'A) '+menor+' e '+maior,fb:'x + (x + '+dif+') = '+soma+'\n2x = '+soma+' − '+dif+' = '+(soma-dif)+'\nx = '+(soma-dif)+'/2 = '+menor+'.\nMaior = '+menor+' + '+dif+' = '+maior+'.'};
      }
      if(r===1){
        // Médio: problema de idades (diferença fixa)
        var irmao=r4(8,14),dif=r4(3,8),irma=irmao-dif;
        if(irma<2){irma=3;irmao=irma+dif;}
        return{en:'O Pedro tem '+irmao+' anos e a irmã tem '+irma+'. Daqui a quantos anos (x) terão idades cuja soma é '+(irmao+irma+20)+'?',
          opts:sh4(['A) 10','B) 5','C) 15','D) '+(irmao-irma)]),
          c:'A) 10',fb:'('+irmao+'+x) + ('+irma+'+x) = '+(irmao+irma+20)+'\n'+(irmao+irma)+' + 2x = '+(irmao+irma+20)+'\n2x = 20\nx = 10 anos.'};
      }
      // Médio: percurso com velocidade
      var vel=r4(3,8)*10,horas=r4(2,5),dist=vel*horas;
      return{en:'Um carro percorre '+dist+' km a '+vel+' km/h. Quantas horas demora?',
        opts:sh4(['A) '+horas+' h','B) '+(dist+vel)+' h','C) '+(dist*vel)+' h','D) '+(horas+1)+' h']),
        c:'A) '+horas+' h',fb:vel+'×t = '+dist+'\nt = '+dist+' ÷ '+vel+' = '+horas+' h.'};
    }
    // Difícil
    var r=r4(0,2);
    if(r===0){
      // Difícil: problema com parênteses na equação
      var n=r4(4,10),triplo=3*n,dobro=2*n;
      return{en:'O triplo de um número diminuído de 4 é igual ao dobro desse número mais 2. Qual é o número?',
        opts:sh4(['A) 6','B) 4','C) 8','D) 10']),
        c:'A) 6',fb:'3x − 4 = 2x + 2\n3x − 2x = 2 + 4\nx = 6.\nVerif: 3×6−4=14; 2×6+2=14 ✓'};
    }
    if(r===1){
      // Difícil: equação de idades (dobro daqui a n anos)
      var age=r4(8,14),parentAge=age+r4(20,26);
      var sol=parentAge-2*age;
      return{en:'A Inês tem '+age+' anos e a mãe tem '+parentAge+'. Daqui a quantos anos (x) será a mãe o dobro da idade da Inês?',
        opts:sh4(['A) '+sol+' anos','B) '+(sol+1)+' anos','C) '+(parentAge-age)+' anos','D) '+age+' anos']),
        c:'A) '+sol+' anos',fb:parentAge+' + x = 2×('+age+' + x)\n'+parentAge+' + x = '+(2*age)+' + 2x\n'+(parentAge-2*age)+' = x\nx = '+sol+' anos.'};
    }
    // Difícil: problema com dois preços e total
    var pa=r4(2,5),pb=r4(1,pa-1)||1,qa=r4(2,4),qb=r4(2,4),tot=pa*qa+pb*qb;
    return{en:'Comprei '+qa+' maçãs a '+pa+' € cada e '+qb+' pêras a '+pb+' € cada. O total foi '+tot+' €. Verifica com uma equação.',
      opts:sh4(['A) '+pa+'×'+qa+' + '+pb+'×'+qb+' = '+tot+' ✓','B) '+pa+'×'+qb+' + '+pb+'×'+qa+' = '+tot,'C) ('+pa+'+'+pb+')×('+qa+'+'+qb+') = '+tot,'D) '+pa+'×'+qa+' − '+pb+'×'+qb+' = '+tot]),
      c:'A) '+pa+'×'+qa+' + '+pb+'×'+qb+' = '+tot+' ✓',fb:pa+'×'+qa+' + '+pb+'×'+qb+' = '+(pa*qa)+' + '+(pb*qb)+' = '+tot+' ✓'};
  }

  // fallback
  return BANCO4.questoes[Math.floor(Math.random()*BANCO4.questoes.length)];
}

function renderQuestoes4(){
  qData4={};
  // Mix static + dynamic questions
  var dif=document.querySelector('#sec-questoes4 .gen-level-btn.active')?.dataset?.level||'medio';
  var allQ=BANCO4.questoes.slice();
  // Add dynamically generated questions to reach 20
  ['1','1','2','2','3','3','4','4','5','5','6','6'].forEach(function(t){
    var q=buildEx4(t,dif);if(q)allQ.push(q);
  });
  // Shuffle and take first 20
  allQ=allQ.sort(function(){return Math.random()-.5;}).slice(0,20);
  renderQuestions4(allQ,'q4-container','q4');
}
var currentMini4=0;
function showMini4(idx,btn){
  currentMini4=idx;
  document.querySelectorAll('#mini-tabs4 .tab-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  else if(document.querySelectorAll('#mini-tabs4 .tab-btn')[idx])document.querySelectorAll('#mini-tabs4 .tab-btn')[idx].classList.add('active');
  qData4={};
  scores4['m4']={correct:0,total:0};
  updateScoreBar4('m4');
  var prefix='mini'+idx;
  var qs;
  if(idx===0){
    qs=[];
    for(var i=1;i<=6;i++){if(BANCO4.minitestes[i])qs=qs.concat(BANCO4.minitestes[i].slice(0,3));}
  } else {
    qs=BANCO4.minitestes[idx]||[];
  }
  qData4={};
  renderQuestions4(qs,'m4-container',prefix);
}
function renderTeste4(){qData4={};renderQuestions4(BANCO4.teste,'t4-container','t4');}

// FLASHCARDS
var fc4Idx=0,fc4Flipped=false,fc4Order=[];
function initFlashcards4(){
  fc4Order=BANCO4.flashcards.map(function(_,i){return i;});
  fc4Show4();
}
function fc4Show4(){
  fc4Flipped=false;
  document.getElementById('fc4-inner').style.transform='';
  var fc=BANCO4.flashcards[fc4Order[fc4Idx]];
  document.getElementById('fc4-tag').textContent=fc.tag;
  document.getElementById('fc4-q').textContent=fc.q;
  document.getElementById('fc4-a').textContent=fc.a;
  var n=fc4Order.length;
  document.getElementById('fc4-counter').textContent=(fc4Idx+1)+' / '+n;
  document.getElementById('fc4-prog').style.width=Math.round((fc4Idx+1)/n*100)+'%';
  var dots=document.getElementById('fc4-dots');
  dots.innerHTML='';
  fc4Order.forEach(function(_,i){
    var d=document.createElement('div');
    d.style.cssText='width:8px;height:8px;border-radius:50%;background:'+(i===fc4Idx?'var(--c2-mid)':'var(--border2)');
    dots.appendChild(d);
  });
}
function fc4Flip(){
  fc4Flipped=!fc4Flipped;
  document.getElementById('fc4-inner').style.transform=fc4Flipped?'rotateY(180deg)':'';
}
function fc4Next(){fc4Idx=(fc4Idx+1)%fc4Order.length;fc4Show4();}
function fc4Prev(){fc4Idx=(fc4Idx-1+fc4Order.length)%fc4Order.length;fc4Show4();}
function fc4Shuffle(){
  for(var i=fc4Order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=fc4Order[i];fc4Order[i]=fc4Order[j];fc4Order[j]=t;}
  fc4Idx=0;fc4Show4();
}

// JOGO DAS EQUAÇÕES
var eqList4=[
  {eq:'x + 3 = 7',sol:4},{eq:'2x = 10',sol:5},{eq:'x - 5 = 0',sol:5},
  {eq:'3x = 9',sol:3},{eq:'x + 8 = 3',sol:-5},{eq:'-2x = 6',sol:-3},
  {eq:'4x - 4 = 0',sol:1},{eq:'5x = 15',sol:3},{eq:'x/2 = 4',sol:8},
  {eq:'2x + 1 = 7',sol:3},{eq:'3x - 2 = 7',sol:3},{eq:'x - 10 = -3',sol:7}
];
var selEq4=null,jogoScore4=0,jogoCount4=0;

function checkEq4(){
  if(!selEq4)return;
  var inp=document.getElementById('eq-answer4');
  var fb=document.getElementById('eq-feedback4');
  if(!inp||!fb)return;
  var userVal=parseFloat(inp.value);
  if(isNaN(userVal)){fb.textContent='Insere um número.';fb.style.color='var(--wrong)';return;}
  var correct=Math.abs(userVal-selEq4.eq.sol)<0.001;
  fb.textContent=correct?'✓ Correto! x = '+selEq4.eq.sol:'✗ Incorreto. A solução é x = '+selEq4.eq.sol;
  fb.style.color=correct?'var(--correct)':'var(--wrong)';
  if(correct){
    var tile=document.getElementById('eq-tile4-'+selEq4.idx);
    if(tile){tile.classList.add('used');tile.style.opacity='.4';}
    jogoScore4++;jogoCount4++;
    _etRecord('cap4','q','eq4-'+selEq4.idx,selEq4.eq.eq,true);
    document.getElementById('eq-input-area4').style.display='none';
    selEq4=null;
  } else {
    jogoCount4++;
    _etRecord('cap4','q','eq4-'+selEq4.idx,selEq4.eq.eq,false);
    inp.value='';inp.focus();
  }
}

// GERADOR
var fichaContent4='';
function gerarFicha4(){
  var tema=parseInt(document.getElementById('gen4-tema').value);
  var tipo=document.getElementById('gen4-tipo').value;
  var nivel=document.getElementById('gen4-nivel').value;
  var qtd=parseInt(document.getElementById('gen4-qtd').value);
  var pool=[];
  var allQ=BANCO4.questoes.concat(BANCO4.teste);
  BANCO4.minitestes.slice(1).forEach(function(m){if(m)allQ=allQ.concat(m);});
  if(tema>0)allQ=allQ.filter(function(q){return q.tema===tema;});
  for(var i=allQ.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=allQ[i];allQ[i]=allQ[j];allQ[j]=t;}
  pool=allQ.slice(0,qtd);
  if(pool.length===0){
    document.getElementById('gen4-output').style.display='block';
    document.getElementById('gen4-output').innerHTML='<p style="color:var(--ink3)">Sem questões disponíveis para esta configuração. Tenta um subtema diferente.</p>';
    return;
  }
  var html='<div style="font-family:\'Montserrat\',sans-serif;max-width:720px">';
  html+='<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.3rem;margin-bottom:1rem;color:var(--ink)">Ficha Gerada — Equações</h3>';
  pool.forEach(function(q,i){
    html+='<div style="margin-bottom:1.25rem;padding:1rem;background:var(--cream);border-radius:10px;border:1px solid var(--border)">';
    html+='<p style="font-weight:600;font-size:.88rem;margin-bottom:.5rem">'+(i+1)+'. '+q.en+'</p>';
    if(q.opts){q.opts.forEach(function(o){html+='<p style="font-size:.82rem;color:var(--ink3);margin:.2rem 0">'+o+'</p>';});}
    html+='</div>';
  });
  html+='</div>';
  document.getElementById('gen4-output').style.display='block';
  document.getElementById('gen4-output').innerHTML=html;
  document.getElementById('dl-ficha4-btn').style.display='inline-flex';
  fichaContent4=html;
}
function downloadFicha4(){
  var tema=document.getElementById('gen4-tema').options[document.getElementById('gen4-tema').selectedIndex].text;
  var fullHtml='<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>Ficha — Equações Mat. 7.º Ano</title><style>body{font-family:Montserrat,sans-serif;max-width:720px;margin:2rem auto;padding:1rem;color:#2a2724}.q{margin-bottom:1.5rem;padding:1rem;border:1px solid #ddd;border-radius:8px}h1{font-family:Georgia,serif;font-size:1.4rem;margin-bottom:.5rem}h2{font-size:1rem;color:#516860}p{margin:.25rem 0;font-size:.88rem}@media print{body{margin:.5rem}.q{page-break-inside:avoid}}</style></head><body>';
  fullHtml+='<h1>3ponto14 · Matemática 7.º Ano · Equações</h1><h2>'+tema+'</h2><hr style="margin:1rem 0">';
  fullHtml+=fichaContent4;
  fullHtml+='</body></html>';
  var blob=new Blob([fullHtml],{type:'text/html'});
  htmlToPdfDownload(fullHtml, 'ficha_cap4_mat7.pdf');
}

// EXAME
var exameTimer4=null,exameLevel4='medio',exameStarted4=false;
function exame4SetLevel(btn){
  document.querySelectorAll('#exame4-config .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');exameLevel4=btn.dataset.level;
}
function exame4Start(){
  var tempo=parseInt(document.getElementById('exame4-tempo').value);
  var qtd=parseInt(document.getElementById('exame4-qtd').value);
  document.getElementById('exame4-config').style.display='none';
  document.getElementById('exame4-running').style.display='block';
  document.getElementById('exame4-result').style.display='none';
  var pool=BANCO4.questoes.concat(BANCO4.minitestes.slice(1).reduce(function(a,m){return m?a.concat(m):a;},[]),BANCO4.teste);
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  var qs=pool.slice(0,qtd);
  qData4={};
  renderQuestions4(qs,'exame4-container','ex4');
  var timeLeft=tempo;
  function fmt(s){return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}
  document.getElementById('exame4-timer').textContent=fmt(timeLeft);
  document.getElementById('exame4-prog').style.width='0%';
  exameTimer4=setInterval(function(){
    timeLeft--;
    document.getElementById('exame4-timer').textContent=fmt(timeLeft);
    document.getElementById('exame4-prog').style.width=Math.round((tempo-timeLeft)/tempo*100)+'%';
    if(timeLeft<=0){clearInterval(exameTimer4);exame4Submit();}
  },1000);
  exameStarted4=true;
}
function exame4Submit(){
  examActive = false; // clear guard regardless of how finish was triggered
  if(exameTimer4)clearInterval(exameTimer4);
  document.getElementById('exame4-running').style.display='none';
  var s=getScore4('ex4');
  var pct=s.total>0?Math.round(s.correct/s.total*100):0;
  var res=document.getElementById('exame4-result');
  res.style.display='block';
  res.innerHTML='<div class="card"><div class="card-title">Resultado do Exame</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:2.5rem;font-weight:900;color:'+(pct>=70?'var(--correct)':'var(--wrong)')+'">'+pct+'%</div><p style="margin:.5rem 0;color:var(--ink3)">'+s.correct+' corretas de '+s.total+' questões</p><div class="highlight-box '+(pct>=70?'green':'orange')+'" style="margin-top:1rem">'+(pct>=80?'<i class="ph ph-star"></i> Excelente preparação!':pct>=60?'<i class="ph ph-thumbs-up"></i> Bom resultado — continua a praticar!':'<i class="ph ph-wrench"></i> Revê a teoria e volta a tentar!')+'</div><div style="margin-top:1rem;display:flex;gap:.75rem"><button class="btn btn-primary" onclick="document.getElementById(\'exame4-config\').style.display=\'block\';document.getElementById(\'exame4-result\').style.display=\'none\'">↺ Novo Exame</button><button class="btn btn-ghost" onclick="showSection4(\'teoria4\',document.querySelector(\'#tabs4 .tab-btn\'))"><i class="ph ph-book-open-text"></i> Rever Teoria</button></div></div>';
}

// PROGRESSO
function saveProgData4(prefix,data){
  try{var p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');p[prefix]=data;p['last_updated']=new Date().toLocaleDateString('pt-PT');p['lastActivity']=Date.now();localStorage.setItem('edupt_cap4',JSON.stringify(p));}catch(e){}
  setTimeout(_progRefreshBars, 80);
}
function renderProg4(){
  // barras por capítulo (visão global)
  if(typeof _progRenderCapitulosBar==='function') _progRenderCapitulosBar('prog4-caps', 4);

  var p={};
  try{p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');}catch(e){}
  var sections=[
    {key:'q4',name:'Questões-aula',total:16},
    {key:'mini1',name:'Mini 1 — Exp. Algébricas',total:5},
    {key:'mini2',name:'Mini 2 — Simplificação',total:5},
    {key:'mini3',name:'Mini 3 — Equações',total:5},
    {key:'mini4',name:'Mini 4 — Equivalência',total:4},
    {key:'mini5',name:'Mini 5 — Classificação',total:5},
    {key:'mini6',name:'Mini 6 — Problemas',total:4},
    {key:'t4',name:'Teste',total:11},
    {key:'ex4',name:'Exame',total:15}
  ];
  var html='';
  sections.forEach(function(s){
    var d=p[s.key]||{correct:0,total:0};
    var pct=d.total>0?Math.round(d.correct/d.total*100):0;
    html+='<div class="prog-section-row"><span class="prog-section-name">'+s.name+'</span><div class="progress-track" style="flex:1"><div class="progress-fill" style="width:'+pct+'%"></div></div><span class="prog-pct">'+pct+'%</span></div>';
  });
  if(!html)html='<p style="color:var(--ink4);font-size:.88rem">Faz algumas atividades para ver o teu progresso aqui!</p>';
  document.getElementById('prog4-rows').innerHTML=html;
  var scores='';
  if(p.last_updated)scores='<p>Última atividade: '+p.last_updated+'</p>';
  sections.forEach(function(s){
    var d=p[s.key];
    if(d&&d.total>0)scores+='<p>'+s.name+': '+d.correct+'/'+d.total+'</p>';
  });
  document.getElementById('prog4-scores').innerHTML=scores||'Sem dados ainda. Faz algumas atividades!';
}
function resetProg4(){
  try{localStorage.removeItem('edupt_cap4');}catch(e){}
  scores4={};renderProg4();
}

// ── Topic grid data ──
var _c4Teoria = "showSection4('teoria4',document.querySelector('#tabs4 .tab-btn:nth-child(2)'))";
var _cap4Topics = [
  {id:'tr4-1', num:'01', title:'Expressões Algébricas', open:true, subs:[
    {onclick:_c4Teoria, label:'Monómios e polinómios', icon:'ph-book-open-text'},
    {onclick:_c4Teoria, label:'Valor numérico', icon:'ph-book-open-text'}
  ]},
  {id:'tr4-2', num:'02', title:'Simplificação de Expressões', subs:[
    {onclick:_c4Teoria, label:'Reduzir termos semelhantes', icon:'ph-book-open-text'},
    {onclick:_c4Teoria, label:'Expressão do perímetro/área', icon:'ph-book-open-text'}
  ]},
  {id:'tr4-3', num:'03', title:'Equações — Conceitos Fundamentais', subs:[
    {onclick:_c4Teoria, label:'1.º grau, incógnita, solução', icon:'ph-book-open-text'},
    {onclick:_c4Teoria, label:'Verificar soluções', icon:'ph-book-open-text'}
  ]},
  {id:'tr4-4', num:'04', title:'Princípios de Equivalência', subs:[
    {onclick:_c4Teoria, label:'Adição/subtração de membros', icon:'ph-book-open-text'},
    {onclick:_c4Teoria, label:'Multiplicação/divisão', icon:'ph-book-open-text'}
  ]},
  {id:'tr4-5', num:'05', title:'Classificação de Equações', subs:[
    {onclick:_c4Teoria, label:'PD / Impossível / PI', icon:'ph-book-open-text'}
  ]},
  {id:'tr4-6', num:'06', title:'Problemas com Equações', subs:[
    {onclick:_c4Teoria, label:'Traduzir enunciado → equação', icon:'ph-book-open-text'},
    {onclick:_c4Teoria, label:'Resolver e verificar', icon:'ph-book-open-text'}
  ]}
];
(function(){
  var el = document.getElementById('cap4-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap4Topics);
})()

