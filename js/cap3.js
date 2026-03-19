/* ── Block 3 (from line 6027) ── */
// ══════════════════════════════════════════════
// CAP. 3 — GEOMETRIA · JAVASCRIPT COMPLETO
// ══════════════════════════════════════════════

function showMathView3(){
  _hideAllViews();
  document.getElementById('view-math3').style.display='block';
  document.title = 'Cap. 3 — Geometria · 3ponto14';
  showSection3('temas3', document.querySelector('#tabs3 .tab-btn'));
  window.scrollTo(0,0);
  var _q3e=document.getElementById('q3-container'); if(_q3e && !_q3e.innerHTML) gerarQuestoes3();
}

function showSection3(id, btn){
  document.querySelectorAll('#view-math3 .section').forEach(s=>s.classList.remove('active'));
  var _s3=document.getElementById('sec-'+id);
  if(_s3) _s3.classList.add('active');
  document.querySelectorAll('#tabs3 .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(id==='questoes3')   { var _q3=document.getElementById('q3-container');  if(_q3 && !_q3.innerHTML) gerarQuestoes3(); }
  if(id==='minitestes3') { var _m3=document.getElementById('m3-container');  if(_m3 && !_m3.innerHTML) gerarMiniAtual3(); }
  if(id==='teste3')      { var _t3=document.getElementById('t3-container');  if(_t3 && !_t3.innerHTML) gerarTeste3(); }
  if(id==='jogos3') _j24AutoInit('j24-wrap-cap3', 'medio');
  if(id==='quiz-game3') { if(typeof qgStartForCap==='function') qgStartForCap(3); }
  if(id==='flashcards3') fcRender3();
  if(id==='progresso3') progRenderSection3();
  if(id==='reta3') { atualizarCamposArea3(); atualizarCamposAngPol3(); }
  // ── Progress tracking ──
  if(id==='teoria3') _pmRecord('cap3','teoria');
  if(id==='flashcards3') _pmRecord('cap3','flashcard');
  var c3=document.getElementById('sec-'+id);
  if(c3) pmRenderWidget('cap3',c3);
  window.scrollTo(0,0);
}

// ── Utilitários ──
function rnd3(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function sh3(arr){return arr.sort(()=>Math.random()-.5);}
function deg(n){return n+'°';}

// ── State Cap3 ──
const dynState3={
  q3:{level:'facil',score:{correct:0,total:0},answered:{}},
  m3:{level:'facil',score:{correct:0,total:0},answered:{},activeMini:0},
  t3:{level:'facil',score:{correct:0,total:0},answered:{}},
};
let _gen3Answered={},_gen3Exercicios=[],_gen3Level='medio',_gen3Score={correct:0,total:0};
let _jogosLevel3='facil';
let _activeMini3=0,_teste3Subtema=0;

// ─── MOTOR DE EXERCÍCIOS CAP3 ───
function buildEx3(tema,tipo,dif){
  tema=String(tema);
  const hard=dif==='dificil', easy=dif==='facil';

  // TEMA 1 — Ângulos internos de polígonos
  if(tema==='1'){
    const nRange=easy?[3,4,5,6]:[5,6,7,8,9,10,12,15,18,20];
    const n=nRange[rnd3(0,nRange.length-1)];
    const si=(n-2)*180;
    const nomes={3:'triângulo',4:'quadrilátero',5:'pentágono',6:'hexágono',7:'heptágono',8:'octógono',9:'nonágono',10:'decágono',12:'dodecágono',15:'pentadecágono',18:'octadecágono',20:'icoságono'};
    const nome=nomes[n]||`polígono de ${n} lados`;
    const variant=rnd3(0,3);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 1',tipo:'fill',
        visual: n<=6 ? svgAngulo(Math.round(si/n), si/n+'°/ângulo') : null,
        enun:`Calcula a soma dos ângulos internos de um <strong>${nome}</strong> (${n} lados). Responde em graus.`,
        resposta:si,expl:`Fórmula: S = (n − 2) × 180°, onde n é o número de lados.\nS = (${n} − 2) × 180° = ${n-2} × 180° = ${si}°.`};
      const w=[si+180,si-180,si+360].filter(v=>v>0&&v!==si);
      return{tema:'Tema 1',tipo:'mc',
        visual: n<=6?svgAngulo(Math.round(si/n), si/n+'°/ângulo'):null,
        enun:`Qual é a soma dos ângulos internos de um <strong>${nome}</strong> (${n} lados)?`,
        opcoes:sh3([si,...w.slice(0,3)]),resposta:si,
        expl:`Fórmula: S = (n − 2) × 180°.\nS = (${n} − 2) × 180° = ${n-2} × 180° = ${si}°.`};
    }
    if(variant===1){
      // Encontrar número de lados dado SI
      const w2=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 1',tipo:'mc',
        enun:`A soma dos ângulos internos de um polígono é ${si}°. Quantos lados tem?`,
        opcoes:sh3([n,...w2.slice(0,3)]),resposta:n,
        expl:`(n − 2) × 180° = ${si}°.\nn − 2 = ${si} ÷ 180 = ${n-2}.\nn = ${n-2} + 2 = ${n} lados.`};
    }
    if(variant===2){
      // Ângulo de polígono regular
      const ang=si/n;
      const w3=sh3([si/n+10,si/n-10,360/n].filter(v=>v>0&&v!==ang)).slice(0,3);
      return{tema:'Tema 1',tipo:'mc',
        enun:`Num ${nome} regular, qual é a amplitude de cada ângulo interno?`,
        opcoes:sh3([ang,...w3]),resposta:ang,
        expl:`Soma dos ângulos internos: (${n}−2)×180° = ${si}°.\nNum polígono regular todos os ângulos são iguais.\nCada ângulo = ${si}° ÷ ${n} = ${ang}°.`};
    }
    // variant===3: V/F
    const nWrong=n+(rnd3(0,1)?1:-1);const siWrong=(nWrong-2)*180;
    const isTrue=rnd3(0,1)===1;const nTest=isTrue?n:nWrong;const siTest=isTrue?si:siWrong;
    return{tema:'Tema 1',tipo:'vf',
      enun:`V/F: <em>"A soma dos ângulos internos de um polígono com ${nTest} lados é ${siTest}°"</em>`,
      resposta:isTrue?'V':'F',
      expl:`Fórmula: (n−2)×180°.\n(${nTest}−2)×180 = ${nTest-2}×180 = ${(nTest-2)*180}°.\nA afirmação diz ${siTest}° → ${isTrue?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 2 — Ângulos externos
  if(tema==='2'){
    const nRange=easy?[3,4,5,6,8]:[5,6,7,8,9,10,12,15];
    const n=nRange[rnd3(0,nRange.length-1)];
    const ext=Math.round(360/n);const int=180-ext;
    const variant=rnd3(0,3);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 2',tipo:'fill',
        enun:`Num polígono regular com <strong>${n} lados</strong>, qual é a amplitude do ângulo externo (em graus)?`,
        resposta:ext,expl:`Fórmula: â_ext = 360° ÷ n.\nâ_ext = 360° ÷ ${n} = ${ext}°.`};
      const w=sh3([ext+rnd3(5,15),ext-rnd3(5,10),360-ext].filter(v=>v>0&&v!==ext)).slice(0,3);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Num polígono regular com ${n} lados, qual é a amplitude do ângulo externo?`,
        opcoes:sh3([ext,...w]),resposta:ext,expl:`â_ext = 360° ÷ ${n} = ${ext}°.`};
    }
    if(variant===1){
      // Encontrar n dado ângulo externo
      const w=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Um polígono regular tem ângulo externo de ${ext}°. Quantos lados tem?`,
        opcoes:sh3([n,...w.slice(0,3)]),resposta:n,
        expl:`n = 360° ÷ â_ext = 360° ÷ ${ext}° = ${n} lados.`};
    }
    if(variant===2){
      // Ângulo interno a partir do externo
      return{tema:'Tema 2',tipo:'mc',
        enun:`Um polígono regular tem ângulo externo de ${ext}°. Qual é o ângulo interno?`,
        opcoes:sh3([int,ext,180,360-ext].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<360)),
        resposta:int,expl:`Ângulo interno + externo = 180° (são suplementares).\nâ_int = 180° − ${ext}° = ${int}°.`};
    }
    return{tema:'Tema 2',tipo:'vf',
      enun:`V/F: <em>"A soma dos ângulos externos de qualquer polígono convexo é sempre 360°"</em>`,
      resposta:'V',expl:`Afirmação VERDADEIRA.\nIndependentemente do número de lados, a soma dos ângulos externos de qualquer polígono convexo é sempre 360°.\nEx: triângulo — 3 × 120° = 360°; quadrado — 4 × 90° = 360°.`};
  }

  // TEMA 3 — Retas paralelas e ângulos
  if(tema==='3'){
    const ang=rnd3(easy?30:15, easy?150:165);
    const supl=180-ang;
    const variant=rnd3(0,4);
    if(variant===0){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede <strong>${ang}°</strong>. O seu ângulo alterno interno mede:`,
        opcoes:sh3([ang,supl,90,ang+10].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:ang,expl:`Alternos internos são iguais quando as retas são paralelas.\nAlternos internos: formam um "Z" com as paralelas.\nResposta: ${ang}°.`};
    }
    if(variant===1){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede <strong>${ang}°</strong>. O ângulo co-interno (colateral interno) mede:`,
        opcoes:sh3([supl,ang,180,90].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:supl,expl:`Co-internos (colaterais internos) são suplementares — somam 180°.\n${ang}° + co-interno = 180°.\nco-interno = 180° − ${ang}° = ${supl}°.`};
    }
    if(variant===2){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Duas retas intersectam-se. Um ângulo mede <strong>${ang}°</strong>. O ângulo verticalmente oposto mede:`,
        opcoes:sh3([ang,supl,90,180-ang+10].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<180).slice(0,4)),
        resposta:ang,expl:`Verticalmente opostos são iguais (são os ângulos "de topo").\nSe um mede ${ang}°, o oposto também mede ${ang}°.`};
    }
    if(variant===3){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede ${ang}°. O ângulo correspondente mede:`,
        opcoes:sh3([ang,supl,180,ang+5].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:ang,expl:`Ângulos correspondentes são iguais quando as retas são paralelas.\n(Formam um "F" com as paralelas.)\nResposta: ${ang}°.`};
    }
    return{tema:'Tema 3',tipo:'fill',
      enun:`Retas paralelas cortadas por uma transversal. Um ângulo mede ${ang}°. O seu suplemento mede ___°.`,
      resposta:supl,expl:`Ângulos suplementares somam 180°.\n180° − ${ang}° = ${supl}°.`};
  }

  // TEMA 4 — Quadriláteros
  if(tema==='4'){
    const facts=[
      {q:'Num paralelogramo, dois ângulos opostos medem 70°. Os outros dois medem:',ops:['110°','70°','90°','140°'],c:'110°',e:'Ângulos adjacentes num paralelogramo são suplementares: somam 180°.\n180°−70°=110°.\nVerificação: 70°+70°+110°+110° = 360° ✓'},
      {q:'Um trapézio isósceles tem ângulo de base 65°. O outro ângulo da mesma base mede:',ops:['65°','115°','90°','130°'],c:'65°',e:'Num trapézio isósceles, os ângulos da mesma base são iguais.\nAmbos os ângulos da base inferior = 65°.'},
      {q:'Qual é a propriedade que distingue o losango do retângulo?',ops:['4 lados iguais (losango) vs 4 ângulos retos (retângulo)','Ambos têm diagonais iguais','O losango não tem lados paralelos','O retângulo não é paralelogramo'],c:'4 lados iguais (losango) vs 4 ângulos retos (retângulo)',e:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.\nAmbos são paralelogramos.'},
      {q:'No paralelogramo, as diagonais:',ops:['Bissetam-se mutuamente','São sempre iguais','São sempre perpendiculares','Não se intersectam'],c:'Bissetam-se mutuamente',e:'Num paralelogramo as diagonais bissetam-se — cada diagonal é dividida em dois segmentos iguais pelo ponto de intersecção.\nIsso NÃO significa que são iguais nem perpendiculares (apenas no losango/retângulo).'},
      {q:'Qual dos seguintes quadriláteros tem as diagonais perpendiculares?',ops:['Losango','Retângulo','Trapézio','Qualquer paralelogramo'],c:'Losango',e:'O losango tem as diagonais perpendiculares (formam 90°).\nO retângulo tem diagonais iguais mas não perpendiculares.\nNuma praça/diamante, as diagonais cruzam em ângulo reto.'},
      {q:'Um quadrilátero tem ângulos 90°, 80° e 110°. O quarto ângulo mede:',ops:['80°','70°','100°','90°'],c:'80°',e:'A soma dos ângulos internos de um quadrilátero é 360°.\nQuarto ângulo = 360°−90°−80°−110° = 360°−280° = 80°.'},
      {q:'O quadrado é simultaneamente:',ops:['Losango e retângulo','Losango e trapézio','Retângulo e trapézio','Apenas losango'],c:'Losango e retângulo',e:'O quadrado tem 4 lados iguais (→ losango) e 4 ângulos retos (→ retângulo).\nÉ o caso mais especial de paralelogramo.'},
      {q:'Num losango com diagonal maior 12 cm e menor 8 cm, a área é:',ops:['48 cm²','96 cm²','40 cm²','24 cm²'],c:'48 cm²',e:'Área do losango = (d₁ × d₂) / 2.\nA = (12 × 8) / 2 = 96 / 2 = 48 cm².'},
    ];
    if(hard) facts.push(
      {q:'Num trapézio isósceles, a soma dos ângulos adjacentes a uma perna (lateral) é:',ops:['180°','360°','90°','270°'],c:'180°',e:'Ângulos co-internos (colaterais) num trapézio são suplementares: somam 180°.\nPois as bases são paralelas e a perna é a transversal.'},
      {q:'Num paralelogramo ABCD, sabe-se que AB = 8 cm e BC = 5 cm. Qual é o perímetro?',ops:['26 cm','40 cm','13 cm','20 cm'],c:'26 cm',e:'Num paralelogramo, lados opostos são iguais.\nP = 2 × AB + 2 × BC = 2 × 8 + 2 × 5 = 16 + 10 = 26 cm.'}
    );
    const f=facts[rnd3(0,facts.length-1)];
    return{tema:'Tema 4',tipo:'mc',enun:f.q,opcoes:sh3(f.ops),resposta:f.c,expl:f.e};
  }

  // TEMA 5 — Áreas
  if(tema==='5'){
    const fig=rnd3(0,easy?3:5);
    if(fig===0){
      const b=rnd3(2,easy?10:20),h=rnd3(2,easy?10:15),a=b*h/2;
      const variant=rnd3(0,2);
      if(variant===0||tipo==='fill') return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h,'cm (÷2)'):null,
        enun:`Calcula a área de um triângulo com base <strong>${b} cm</strong> e altura <strong>${h} cm</strong>.`,
        resposta:a,expl:`Fórmula: A = (base × altura) / 2.\nA = (${b} × ${h}) / 2 = ${b*h} / 2 = ${a} cm².`};
      if(variant===1){
        // Encontrar a altura dado a área e a base
        const w=sh3([h+2,h-1,h+4].filter(v=>v>0&&v!==h)).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:`Um triângulo tem base ${b} cm e área ${a} cm². Qual é a altura?`,
          opcoes:sh3([h,...w]),resposta:h,
          expl:`A = (b × h) / 2 → h = (2 × A) / b.\nh = (2 × ${a}) / ${b} = ${2*a} / ${b} = ${h} cm.`};
      }
      const w=sh3([a+b,a-1,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do triângulo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b} × ${h}) / 2 = ${b*h} / 2 = ${a} cm².`};
    }
    if(fig===1){
      const b=rnd3(3,easy?12:20),h=rnd3(2,easy?8:12),a=b*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base <strong>${b} cm</strong>, altura <strong>${h} cm</strong>.`,
        resposta:a,expl:`Fórmula: A = base × altura.\nA = ${b} × ${h} = ${a} cm².`};
      const w=sh3([a+h,a-b,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = base × altura = ${b} × ${h} = ${a} cm².`};
    }
    if(fig===2){
      const b1=rnd3(3,easy?10:15),b2=b1+rnd3(2,6),h=rnd3(2,easy?8:10);
      const a=(b1+b2)/2*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Trapézio com bases <strong>${b1} cm</strong> e <strong>${b2} cm</strong>, altura <strong>${h} cm</strong>. Calcula a área.`,
        resposta:a,expl:`Fórmula: A = (B + b) / 2 × h.\nA = (${b1} + ${b2}) / 2 × ${h} = ${b1+b2} / 2 × ${h} = ${(b1+b2)/2} × ${h} = ${a} cm².`};
      const w=sh3([a+h,b1*b2,a-2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Trapézio: bases ${b1} cm e ${b2} cm, altura ${h} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b1}+${b2})/2 × ${h} = ${(b1+b2)/2} × ${h} = ${a} cm².`};
    }
    if(fig===3){
      const d1=rnd3(4,easy?12:20),d2=rnd3(3,easy?10:14),a=d1*d2/2;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Losango com diagonais <strong>${d1} cm</strong> e <strong>${d2} cm</strong>. Calcula a área.`,
        resposta:a,expl:`Fórmula: A = (d₁ × d₂) / 2.\nA = (${d1} × ${d2}) / 2 = ${d1*d2} / 2 = ${a} cm².`};
      const w=sh3([d1*d2,a+d1,a-d2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Losango: diagonais ${d1} cm e ${d2} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${d1}×${d2})/2 = ${d1*d2}/2 = ${a} cm².`};
    }
    if(fig===4){
      const r=rnd3(2,easy?8:12);const ap=parseFloat((Math.PI*r*r).toFixed(1));
      const w=sh3([parseFloat((Math.PI*r).toFixed(1)),parseFloat((2*Math.PI*r).toFixed(1)),r*r].filter(v=>v!==ap)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do círculo com raio ${r} cm (π ≈ 3,14):`,
        opcoes:sh3([ap,...w]),resposta:ap,
        expl:`Fórmula: A = π × r².\nA = π × ${r}² = π × ${r*r} ≈ 3,14 × ${r*r} ≈ ${ap} cm².`};
    }
    const r=rnd3(2,easy?6:10);const a=parseFloat((Math.PI*r*r/2).toFixed(1));
    const w=sh3([parseFloat((Math.PI*r*r).toFixed(1)),parseFloat((Math.PI*r).toFixed(1)),r*r].filter(v=>v!==a)).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:`Área do semicírculo com raio ${r} cm (π ≈ 3,14):`,
      opcoes:sh3([a,...w]),resposta:a,
      expl:`Área do semicírculo = Área do círculo / 2.\nA = (π × r²) / 2 = (π × ${r*r}) / 2 ≈ (3,14 × ${r*r}) / 2 ≈ ${a} cm².`};
  }

  return buildEx3('1','mc',dif);
}


// ── Render dinâmico Cap3 ──
function renderDynSection3(container, exercicios, sec) {
  if (!dynState3[sec]) dynState3[sec] = { level:'medio', score:{correct:0,total:0}, answered:{} };
  dynState3[sec].answered = {};
  dynState3[sec].score = { correct:0, total:0 };
  if (typeof updateDynScore3 === 'function') updateDynScore3(sec);
  qzInit(container, exercicios, sec, function(correct, total) {
    dynState3[sec].score = { correct: correct, total: total };
    if (typeof updateDynScore3 === 'function') updateDynScore3(sec);
    if (typeof checkCompletion3 === 'function') checkCompletion3(sec);
  });
}

function checkDyn3(sec,qid,tipo,val,btn){
  const st=dynState3[sec];
  if(st.answered[qid])return;
  st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');
    const userVal=parseFloat(inp.value);
    inp.disabled=true;
    const correct=Math.abs(userVal-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
    st.score.total++;if(correct)st.score.correct++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct,expl,val, qid + '-fb');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    const isCorrect=(val===true||val==='true');
    if(isCorrect){btn.classList.add('correct');st.score.correct++;}
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
    st.score.total++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(isCorrect?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(isCorrect,expl, undefined, qid + '-fb');
  }
  updateDynScore3(sec);
  progLog3(sec==='q3'?'questoes':sec==='m3'?'minitestes':'teste', dynState3[sec].answered[qid]);
  {const _s3=sec==='q3'?'q':sec==='m3'?'m':'t';const _ok3=tipo3==='fill'?(document.getElementById(qid+'-in')?.classList.contains('correct')||false):(val===true||val==='true');_etRecord('cap3',_s3,qid,_etText(qid),_ok3);}
}

function updateDynScore3(sec){
  const s=dynState3[sec].score;
  var e1=document.getElementById(sec+'-score'); if(e1)e1.textContent=s.correct;
  var e2=document.getElementById(sec+'-total'); if(e2)e2.textContent='/ '+s.total;
  var e3=document.getElementById(sec+'-prog');  if(e3){const pct=s.total>0?s.correct/s.total*100:0;e3.style.width=pct+'%';}
  if(s.total>0) _pmRecord('cap3','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(sec, s.correct, s.total);
}

function setLevelSection3(sec,btn){
  const bar=btn.closest('.level-bar');
  bar.querySelectorAll('.gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  dynState3[sec].level=btn.dataset.level;
  if(sec==='q3')gerarQuestoes3();
  else if(sec==='m3')gerarMiniAtual3();
  else if(sec==='t3')gerarTeste3();
}

// ── QUESTÕES-AULA ──
function gerarQuestoes3(){
  const dif=dynState3.q3.level;
  let plano;
  if(dif==='facil'){
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'}];
  } else if(dif==='dificil'){
    plano=[{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'fill'}];
  } else {
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('q3-container',exs,'q3');
}

// ── MINITESTES ──
function showMiniDyn3(n,btn){
  _activeMini3=n;
  document.querySelectorAll('#mini-tabs3 .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarMiniAtual3();
}
function gerarMiniAtual3(){
  const dif=dynState3.m3.level;
  let plano;
  if(_activeMini3===0){
    plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}];
  } else {
    const t=String(_activeMini3);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('m3-container',exs,'m3');
}

// ── TESTE GLOBAL ──
function setTeste3Subtema(n,btn){
  _teste3Subtema=n;
  document.querySelectorAll('#teste3-subtema-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarTeste3();
}
function gerarTeste3(){
  const dif=dynState3.t3.level;
  let plano;
  if(_teste3Subtema===0){
    if(dif==='facil'){
      plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'5',tipo:'mc'}];
    } else if(dif==='dificil'){
      plano=[{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'}];
    } else {
      plano=[{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'5',tipo:'mc'}];
    }
  } else {
    const t=String(_teste3Subtema);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill'},{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'fill'}];
  }
  const exs=plano.map(p=>buildEx3(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection3('t3-container',exs,'t3');
}

// ── GERADOR LIVRE ──
function setGenLevel3(btn){
  document.querySelectorAll('#sec-gerador3 .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _gen3Level=btn.dataset.level;
}
function gerarExercicios3(){
  _gen3Answered={};_gen3Score={correct:0,total:0};
  const tema=document.getElementById('gen3-tema').value;
  const qtd=parseInt(document.getElementById('gen3-qtd').value);
  const tipoSel=document.getElementById('gen3-tipo').value;
  const temas=['1','2','3','4','5'];
  const tipos=['mc','mc','mc','mc','fill'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const t=tema==='all'?temas[i%temas.length]:tema;
    const tipo=tipoSel==='misto'?(i%2===0?'mc':'fill'):tipoSel;
    const ex=buildEx3(t,tipo,_gen3Level);
    if(ex)exs.push({...ex,num:i+1});
  }
  _gen3Exercicios=exs;
  renderGenExercicios3(exs);
}

function renderGenExercicios3(exs){
  const bar=document.getElementById('gen3-score-bar');
  bar.style.display='flex';
  document.getElementById('gen3-score').textContent='0';
  document.getElementById('gen3-total').textContent='/ 0';
  document.getElementById('gen3-prog').style.width='0%';
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='gen3_'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Exercício ${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'){
      html+=`<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">
        <button class="check-btn" onclick="checkGen3('${qid}','fill','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      ex.opcoes.forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkGen3('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button class="option-btn" onclick="checkGen3('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button>
        <button class="option-btn" onclick="checkGen3('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button>
      </div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });
  document.getElementById('gen3-resultado').innerHTML=html;
  const dl=document.getElementById('gen3-download-area');
  dl.style.display='flex';
}

function checkGen3(qid,tipo,val,btn){
  if(_gen3Answered[qid])return;
  _gen3Answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');
    const userVal=parseFloat(inp.value);
    inp.disabled=true;
    correct=Math.abs(userVal-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  _gen3Score.total++;if(correct)_gen3Score.correct++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl,val, qid + '-fb');
  document.getElementById('gen3-score').textContent=_gen3Score.correct;
  document.getElementById('gen3-total').textContent='/ '+_gen3Score.total;
  document.getElementById('gen3-prog').style.width=(_gen3Score.total>0?_gen3Score.correct/_gen3Score.total*100:0)+'%';
}

// ── JOGOS ──

// ── clf3 game init ──
var _clf3Data=[
  {n:3,nome:'triângulo',s:180},{n:4,nome:'quadrilátero',s:360},
  {n:5,nome:'pentágono',s:540},{n:6,nome:'hexágono',s:720},
  {n:7,nome:'heptágono',s:900},{n:8,nome:'octógono',s:1080}
];
function clf3Nova(){
  var item=_clf3Data[Math.floor(Math.random()*_clf3Data.length)];
  var q=document.getElementById('clf3-q');
  var fb=document.getElementById('clf3-fb');
  if(!q||!fb)return;
  delete q.dataset.done;
  fb.className='feedback';fb.innerHTML='';
  document.getElementById('clf3-q-text').innerHTML=
    'A soma dos ângulos internos de um polígono é <strong>'+item.s+'°</strong>. Qual é o polígono?';
  // Build answer options (correct + 3 distractors)
  var others=_clf3Data.filter(function(d){return d.n!==item.n;});
  var shuffled=others.sort(function(){return Math.random()-.5;}).slice(0,3);
  var opts=shuffled.concat([item]).sort(function(){return Math.random()-.5;});
  var html=opts.map(function(o){
    return '<button class="option-btn" onclick="checkClf3(this,'
      +(o.n===item.n)+'\''+item.nome+'\')">'
      +o.nome+'</button>';
  }).join('');
  // Fix onclick syntax (need proper quoting)
  var optsEl=document.getElementById('clf3-opts');
  optsEl.innerHTML='';
  opts.forEach(function(o){
    var btn=document.createElement('button');
    btn.className='option-btn';
    btn.textContent=o.nome;
    btn.onclick=function(){checkClf3(btn,o.n===item.n,item.nome);};
    optsEl.appendChild(btn);
  });
}
document.addEventListener('DOMContentLoaded',function(){clf3Nova();});
function checkClf3(btn,isC,correct){
  const q=document.getElementById('clf3-q');
  if(!q||q.dataset.done)return;
  q.dataset.done='1';
  q.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  if(isC)btn.classList.add('correct');
  else{btn.classList.add('wrong');q.querySelectorAll('.option-btn').forEach(b=>{if(b.textContent.includes(correct))b.classList.add('correct');});}
  const fb=document.getElementById('clf3-fb');
  if(!fb)return;
  fb.className='feedback show '+(isC?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(isC,'',undefined,undefined);
}

let _rl3Answered=0,_rl3Correct=0;
function checkRl3(qid,tipo,val,btn){
  const container=document.getElementById(qid);
  if(container.dataset.done)return;
  container.dataset.done='1';
  _rl3Answered++;
  container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  const correct=(val===true||val==='true');
  if(correct)btn.classList.add('correct');
  else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  if(correct)_rl3Correct++;
  _etRecord('cap3','rel',qid,_etText(qid),correct);
  const fb=document.getElementById(qid+'-fb');
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl);
  if(_rl3Answered>=10){
    const pct=Math.round(_rl3Correct/10*100);
    const emoji=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
    document.getElementById('relampago3-result').innerHTML=`${emoji} ${_rl3Correct}/10 certas · ${pct}%`;
    document.getElementById('relampago3-score').style.display='block';
    document.getElementById('relampago3-score').scrollIntoView({behavior:'smooth',block:'nearest'});
    _pmRecord('cap3','quiz',{pontuacao:_rl3Correct,total:10});
    _pmRecord('cap3','jogo');
  }
}

// ── CALCULADORA DE ÂNGULOS ──
function calcAngulos3(){
  const n=parseInt(document.getElementById('ang-lados').value)||0;
  const el=document.getElementById('ang-resultado');
  if(n<3){el.style.display='block';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Um polígono tem no mínimo 3 lados.';el.className='highlight-box';return;}
  const si=(n-2)*180;
  const se=360;
  const intReg=si/n;
  const extReg=360/n;
  el.style.display='block';
  el.className='highlight-box green';
  el.innerHTML=`<strong>Polígono com ${n} lados:</strong><br>
    <span class="ico ico-sm"><svg><use href="#ico-ruler"/></svg></span> Soma dos ângulos <strong>internos</strong>: (${n}−2)×180° = <strong>${si}°</strong><br>
    ↻ Soma dos ângulos <strong>externos</strong>: sempre <strong>${se}°</strong><br>
    ✦ Ângulo interno (polígono regular): ${si}°÷${n} = <strong>${intReg.toFixed(2)}°</strong><br>
    ✦ Ângulo externo (polígono regular): 360°÷${n} = <strong>${extReg.toFixed(2)}°</strong>`;
}

function atualizarCamposArea3(){
  const fig=document.getElementById('area-figura').value;
  const map={
    triangulo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base (cm): <input type="number" id="ar-triangulo-b" class="fill-input" style="width:80px" value="6"></label>
      <label>Altura (cm): <input type="number" id="ar-triangulo-h" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
    paralelogramo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base (cm): <input type="number" id="ar-paralelogramo-b" class="fill-input" style="width:80px" value="8"></label>
      <label>Altura (cm): <input type="number" id="ar-paralelogramo-h" class="fill-input" style="width:80px" value="5"></label>
    </div>`,
    trapezio:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Base maior (cm): <input type="number" id="ar-b1" class="fill-input" style="width:80px" value="10"></label>
      <label>Base menor (cm): <input type="number" id="ar-b2" class="fill-input" style="width:80px" value="6"></label>
      <label>Altura (cm): <input type="number" id="ar-trapezio-h" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
    losango:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Diagonal 1 (cm): <input type="number" id="ar-d1" class="fill-input" style="width:80px" value="8"></label>
      <label>Diagonal 2 (cm): <input type="number" id="ar-d2" class="fill-input" style="width:80px" value="6"></label>
    </div>`,
    circulo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Raio (cm): <input type="number" id="ar-circulo-r" class="fill-input" style="width:80px" value="5"></label>
    </div>`,
    semicirculo:`<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">
      <label>Raio (cm): <input type="number" id="ar-semicirculo-r" class="fill-input" style="width:80px" value="4"></label>
    </div>`,
  };
  document.getElementById('area-campos').innerHTML=map[fig]||'';
  document.getElementById('area-resultado').style.display='none';
}
function calcArea3(){
  const fig=document.getElementById('area-figura').value;
  const el=document.getElementById('area-resultado');
  const campos=document.getElementById('area-campos');
  // Ensure fields are rendered (guard against calling before atualizarCamposArea3)
  if(!campos||!campos.querySelector('input')){atualizarCamposArea3();}
  el.style.display='block';el.className='highlight-box green';
  const g=id=>{const e=document.getElementById(id);return e?parseFloat(e.value)||0:0;};
  let area=0,formula='';
  if(fig==='triangulo'){const b=g('ar-triangulo-b'),h=g('ar-triangulo-h');area=b*h/2;formula=`(${b}×${h})/2 = ${area}`;}
  else if(fig==='paralelogramo'){const b=g('ar-paralelogramo-b'),h=g('ar-paralelogramo-h');area=b*h;formula=`${b}×${h} = ${area}`;}
  else if(fig==='trapezio'){const b1=g('ar-b1'),b2=g('ar-b2'),h=g('ar-trapezio-h');area=(b1+b2)/2*h;formula=`(${b1}+${b2})/2×${h} = ${area}`;}
  else if(fig==='losango'){const d1=g('ar-d1'),d2=g('ar-d2');area=d1*d2/2;formula=`(${d1}×${d2})/2 = ${area}`;}
  else if(fig==='circulo'){const r=g('ar-circulo-r');area=parseFloat((Math.PI*r*r).toFixed(2));formula=`π×${r}² ≈ ${area}`;}
  else if(fig==='semicirculo'){const r=g('ar-semicirculo-r');area=parseFloat((Math.PI*r*r/2).toFixed(2));formula=`(π×${r}²)/2 ≈ ${area}`;}
  el.innerHTML=`<strong>Área = ${formula} cm²</strong>`;
}

function atualizarCamposAngPol3(){
  const n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  let html='';
  for(let i=1;i<n;i++){
    html+=`<label style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.9rem">Ângulo ${i}: <input type="number" id="angpol-${i}" class="fill-input" style="width:80px" placeholder="graus"> °</label>`;
  }
  document.getElementById('ang-campos-pol').innerHTML=html;
  document.getElementById('ang-pol-resultado').style.display='none';
}
function calcAngDesconhecido3(){
  const n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  const si=(n-2)*180;
  let soma=0,valid=true;
  for(let i=1;i<n;i++){
    const v=parseFloat(document.getElementById('angpol-'+i)?.value);
    if(isNaN(v)||v<=0){valid=false;break;}
    soma+=v;
  }
  const el=document.getElementById('ang-pol-resultado');
  el.style.display='block';
  if(!valid){el.className='highlight-box';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Preenche todos os ângulos conhecidos.';return;}
  const faltante=si-soma;
  // Each interior angle of a convex polygon must be strictly between 0° and 180°.
  // The missing angle must satisfy: 0 < faltante < 180.
  // Also catch the case where known angles already meet or exceed the total.
  if(soma>=si){
    el.className='highlight-box';
    el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> A soma dos ângulos introduzidos ('+soma+'°) já iguala ou ultrapassa os '+si+'° totais — verifica os valores.';
    return;
  }
  if(faltante<=0||faltante>=180){el.className='highlight-box';el.innerHTML='<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Valores inválidos — verifica os ângulos introduzidos.';return;}
  el.className='highlight-box green';
  el.innerHTML=`<strong>Ângulo desconhecido = ${si}° − ${soma}° = <span style="font-size:1.1em">${faltante}°</span></strong><br><small style="color:var(--ink3)">S<sub>i</sub> = (${n}−2)×180° = ${si}°</small>`;
}

// ── FLASHCARDS ──
const FC3_CARDS=[
  {tag:'Fórmula',q:'Soma dos ângulos internos de um polígono convexo com n lados',a:'S = (n − 2) × 180°\nEx: pentágono → (5−2)×180 = 540°'},
  {tag:'Fórmula',q:'Amplitude de cada ângulo interno de um polígono regular com n lados',a:'â = (n−2)×180° ÷ n\nEx: hexágono → 720÷6 = 120°'},
  {tag:'Regra',q:'Qual é a soma dos ângulos externos de qualquer polígono convexo?',a:'Sempre 360°, independentemente do número de lados.'},
  {tag:'Fórmula',q:'Como calcular o número de lados dado o ângulo externo de um polígono regular?',a:'n = 360° ÷ â_ext\nEx: â_ext = 45° → n = 360÷45 = 8 (octógono)'},
  {tag:'Definição',q:'O que são ângulos alternos internos?',a:'Ângulos formados entre retas paralelas, em lados opostos da secante. São iguais quando as retas são paralelas.'},
  {tag:'Definição',q:'O que são ângulos verticalmente opostos?',a:'Ângulos formados na interseção de duas retas, em lados opostos. São sempre iguais (congruentes).'},
  {tag:'Regra',q:'O que são ângulos co-internos (colaterais)?',a:'Ângulos entre retas paralelas, do mesmo lado da secante. A sua soma é sempre 180° (são suplementares).'},
  {tag:'Propriedade',q:'Propriedades do paralelogramo',a:'• Lados opostos paralelos e iguais\n• Ângulos opostos iguais\n• Ângulos adjacentes suplementares\n• Diagonais bissetam-se'},
  {tag:'Propriedade',q:'O que distingue o losango do retângulo?',a:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.\nAmbos são paralelogramos.'},
  {tag:'Definição',q:'O que é um trapézio isósceles?',a:'Trapézio com as pernas (lados não paralelos) iguais. Os ângulos da mesma base são iguais.'},
  {tag:'Fórmula',q:'Área do triângulo',a:'A = (base × altura) ÷ 2'},
  {tag:'Fórmula',q:'Área do paralelogramo',a:'A = base × altura'},
  {tag:'Fórmula',q:'Área do trapézio',a:'A = (b₁ + b₂) ÷ 2 × altura\n(média das bases × altura)'},
  {tag:'Fórmula',q:'Área do losango ou papagaio',a:'A = (d₁ × d₂) ÷ 2\n(produto das diagonais a dividir por 2)'},
  {tag:'Fórmula',q:'Área do círculo e do semicírculo',a:'Círculo: A = π × r²\nSemicírculo: A = (π × r²) ÷ 2'},
  {tag:'Exemplo',q:'Quantos lados tem um polígono cuja soma dos ângulos internos é 1440°?',a:'(n−2)×180 = 1440 → n−2 = 8 → n = 10\nÉ um decágono.'},
  {tag:'Exemplo',q:'Ângulo externo de 24° — que polígono é?',a:'n = 360÷24 = 15 → Pentadecágono (15 lados)'},
  {tag:'Exemplo',q:'Trapézio com bases 8 e 4 cm, altura 3 cm. Qual é a área?',a:'A = (8+4)/2 × 3 = 6 × 3 = 18 cm²'},
  {tag:'Exemplo',q:'Losango com diagonais 10 cm e 6 cm. Qual é a área?',a:'A = (10×6)/2 = 30 cm²'},
  {tag:'Exemplo',q:'Um ângulo mede 65°. Qual é o ângulo co-interno (paralelas cortadas por secante)?',a:'Co-internos são suplementares: 180° − 65° = 115°'},
];
let _fc3Idx=0,_fc3Flipped=false;
function fcRender3(){
  const card=FC3_CARDS[_fc3Idx];
  document.getElementById('fc3-tag').textContent=card.tag;
  document.getElementById('fc3-q').textContent=card.q;
  document.getElementById('fc3-a').textContent=card.a;
  document.getElementById('fc3-a').style.display='none';
  document.getElementById('fc3-counter').textContent=`${_fc3Idx+1} / ${FC3_CARDS.length}`;
  document.getElementById('fc3-prog').style.width=((_fc3Idx+1)/FC3_CARDS.length*100)+'%';
  const dots=document.getElementById('fc3-dots');
  dots.innerHTML=FC3_CARDS.map((_,i)=>`<div style="width:8px;height:8px;border-radius:50%;background:${i===_fc3Idx?'var(--c1-mid)':'var(--border2)'};cursor:pointer" onclick="fcGoTo3(${i})"></div>`).join('');
  _fc3Flipped=false;
  document.getElementById('fc3-inner').style.background='var(--cream)';
}
function fcFlip3(){
  _fc3Flipped=!_fc3Flipped;
  document.getElementById('fc3-a').style.display=_fc3Flipped?'block':'none';
  document.getElementById('fc3-inner').style.background=_fc3Flipped?'var(--c1-pale)':'var(--cream)';
}
function fcNext3(){_fc3Idx=(_fc3Idx+1)%FC3_CARDS.length;fcRender3();}
function fcPrev3(){_fc3Idx=(_fc3Idx-1+FC3_CARDS.length)%FC3_CARDS.length;fcRender3();}
function fcGoTo3(i){_fc3Idx=i;fcRender3();}

// ── EXAME ──
let _exame3State={level:'medio',timer:null,timeLeft:900,exercicios:[],answered:{},score:{correct:0,total:0}};
function exame3SetLevel(btn){
  document.querySelectorAll('#exame3-level-group .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _exame3State.level=btn.dataset.level;
}
function exame3Start(){
  const qtd=parseInt(document.getElementById('exame3-qtd').value);
  const tempo=parseInt(document.getElementById('exame3-tempo').value);
  _exame3State.timeLeft=tempo;_exame3State.answered={};_exame3State.score={correct:0,total:0};
  const temas=['1','1','2','2','3','3','4','4','5','5'];
  const tipos=['mc','fill','mc','fill','mc','mc','mc','mc','mc','fill'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const t=temas[i%temas.length];const ti=tipos[i%tipos.length];
    const ex=buildEx3(t,ti,_exame3State.level);
    if(ex)exs.push({...ex,num:i+1});
  }
  _exame3State.exercicios=exs;
  document.getElementById('exame3-config').style.display='none';
  document.getElementById('exame3-running').style.display='block';
  document.getElementById('exame3-result').style.display='none';
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='ex3_'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Q${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'){
      html+=`<div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" type="text" inputmode="decimal" placeholder="?" style="width:100px">
        <button class="check-btn" aria-label="Verificar resposta" onclick="checkExame3('${qid}','fill','${ex.resposta}')">✓</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      ex.opcoes.forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkExame3('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem"><button class="option-btn" onclick="checkExame3('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" onclick="checkExame3('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
  });
  document.getElementById('exame3-container').innerHTML=html;
  document.getElementById('exame3-answered').textContent=`0 / ${qtd}`;
  function tick3(){
    _exame3State.timeLeft--;
    const m=Math.floor(_exame3State.timeLeft/60),s=_exame3State.timeLeft%60;
    document.getElementById('exame3-timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(_exame3State.timeLeft<=0){clearInterval(_exame3State.timer);exame3Finish();}
  }
  _exame3State.timer=setInterval(tick3,1000);
}
function checkExame3(qid,tipo,val,btn){
  if(_exame3State.answered[qid])return;
  _exame3State.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'){
    const inp=document.getElementById(qid+'-in');inp.disabled=true;
    correct=Math.abs(parseFloat(inp.value)-parseFloat(val))<0.01;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  _exame3State.score.total++;if(correct)_exame3State.score.correct++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct,expl,val);
  const tot=_exame3State.exercicios.length;
  document.getElementById('exame3-answered').textContent=`${_exame3State.score.total} / ${tot}`;
  document.getElementById('exame3-prog').style.width=(_exame3State.score.total/tot*100)+'%';
  progLog3('exame',correct);
  if(_exame3State.score.total>=tot){clearInterval(_exame3State.timer);setTimeout(exame3Finish,800);}
}
function exame3Stop(){clearInterval(_exame3State.timer);exame3Finish();}
// exame3Submit is the programmatic submit path (called by timer expiry wrappers)
function exame3Submit(){exame3Finish();}
function exame3Finish(){
  examActive = false; // clear guard regardless of how finish was triggered
  document.getElementById('exame3-running').style.display='none';
  document.getElementById('exame3-result').style.display='block';
  const {correct,total}=_exame3State.score;
  const pct=total>0?Math.round(correct/total*100):0;
  const _n3=document.getElementById('exame3-nota');if(_n3)_n3.textContent=pct+'%';
  const _d3=document.getElementById('exame3-detalhe');if(_d3)_d3.textContent=`${correct} certas em ${total} questões`;
  document.getElementById('exame3-emoji').innerHTML=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
  progLogExame3(pct,correct,total);
}
function exame3Reset(){
  clearInterval(_exame3State.timer);
  document.getElementById('exame3-config').style.display='block';
  document.getElementById('exame3-running').style.display='none';
  document.getElementById('exame3-result').style.display='none';
  document.getElementById('exame3-container').innerHTML='';
  var tempo=parseInt((document.getElementById('exame3-tempo')||{}).value)||900;
  var rm=Math.floor(tempo/60), rs=tempo%60;
  var timerEl=document.getElementById('exame3-timer');
  if(timerEl){
    timerEl.textContent=(rm<10?'0':'')+rm+':'+(rs<10?'0':'')+rs;
    timerEl.style.color='var(--ink)';
  }
}

// ── localStorage helpers — Cap 3 ──
function _saveProgData3(){
  try{localStorage.setItem('edupt_cap3',JSON.stringify({sections:_progData3.sections,log:_progData3.log}));}catch(e){}
}
function _loadProgData3(){
  try{
    const raw=localStorage.getItem('edupt_cap3');
    if(!raw)return;
    const saved=JSON.parse(raw);
    if(saved.sections)Object.assign(_progData3.sections,saved.sections);
    if(saved.log)_progData3.log=saved.log;
  }catch(e){}
}

// ── PROGRESSO ──
const _progData3={sections:{questoes:{correct:0,total:0},minitestes:{correct:0,total:0},teste:{correct:0,total:0},gerador:{correct:0,total:0},jogos:{correct:0,total:0},exame:{correct:0,total:0}},log:[]};
_loadProgData3();

function progLog3(section,correct){
  if(!_progData3.sections[section])_progData3.sections[section]={correct:0,total:0};
  _progData3.sections[section].total++;if(correct)_progData3.sections[section].correct++;
  _progData3.log.unshift({section,correct,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  if(_progData3.log.length>50)_progData3.log.pop();
  _saveProgData3();
  setTimeout(_progRefreshBars, 80);
}
function progLogExame3(pct,correct,total){
  if(!_progData3.exames)_progData3.exames=[];
  _progData3.exames.push({pct,correct,total,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  _progData3.sections.exame.correct+=correct;
  _progData3.sections.exame.total+=total;
  _saveProgData3();
  setTimeout(_progRefreshBars, 80);
}
function progRenderSection3(){
  const sec=_progData3.sections;
  const labels={questoes:'Questões-aula',minitestes:'Minitestes',teste:'Teste',gerador:'Gerador',jogos:'Jogos',exame:'Exame'};
  let total=0,correct=0;Object.values(sec).forEach(s=>{total+=s.total;correct+=s.correct;});
  const globalPct=total>0?Math.round(correct/total*100):0;
  document.getElementById('prog3-cards').innerHTML=[
    {label:'Questões respondidas',val:total,icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},{label:'Respostas certas',val:correct,icon:'<span class="ico ico-sm"><svg><use href="#ico-check"/></svg></span>'},
    {label:'Taxa de acerto',val:total>0?globalPct+'%':'—',icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},
  ].map(c=>`<div class="card" style="text-align:center;padding:1.5rem"><div style="font-size:1.8rem;margin-bottom:.5rem">${c.icon}</div><div style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">${c.val}</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">${c.label}</div></div>`).join('');
  // barras por capítulo
  _progRenderCapitulosBar('prog3-temas', 3);
  const logEl=document.getElementById('prog3-historico');
  if(_progData3.log.length===0){logEl.innerHTML='<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade — começa a responder!</div>';return;}
  logEl.innerHTML=_progData3.log.map(e=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px"><span>${e.correct?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>'}</span><span style="font-size:.82rem;color:var(--ink2)">${labels[e.section]||e.section}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">${e.time}</span></div>`).join('');
}
function progReset3(){Object.keys(_progData3.sections).forEach(k=>{_progData3.sections[k]={correct:0,total:0};});_progData3.log=[];try{localStorage.removeItem('edupt_cap3');}catch(e){}progRenderSection3();}

// ── DOWNLOADS ──
function downloadFicha3(type){
  const now=new Date().toLocaleDateString('pt-PT');
  function wrap(title,content){ return wrapPrintDoc(title, content); }
  let html='';
  if(type==='ficha_completa'){
    html=wrap('Ficha Completa — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Grupo 1 — Ângulos Internos de Polígonos Convexos</h2>
<div class="ex"><div class="ex-num">1.</div><p>Calcula a soma das amplitudes dos ângulos internos de cada polígono:</p>
<p>a) Triângulo &nbsp;&nbsp; b) Hexágono &nbsp;&nbsp; c) Nonágono &nbsp;&nbsp; d) Polígono de 15 lados</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.</div><p>Determina o número de lados de um polígono convexo cuja soma dos ângulos internos é <strong>2340°</strong>.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Num polígono regular com 12 lados, calcula a amplitude de cada ângulo interno.</p><div class="resp-linha"></div></div>
<h2>Grupo 2 — Ângulos Externos</h2>
<div class="ex"><div class="ex-num">4.</div><p>Um polígono regular tem ângulo externo de <strong>24°</strong>. Quantos lados tem? Como se classifica?</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">5.</div><p>Num pentágono regular, calcula a amplitude de cada ângulo externo e de cada ângulo interno.</p><div class="resp-linha"></div></div>
<h2>Grupo 3 — Retas Paralelas e Ângulos</h2>
<div class="ex"><div class="ex-num">6.</div><p>As retas r e s são paralelas e t é uma secante. Um ângulo mede 65°. Indica a amplitude dos ângulos:</p>
<p>a) Alterno interno &nbsp;&nbsp; b) Co-interno (colateral) &nbsp;&nbsp; c) Verticalmente oposto &nbsp;&nbsp; d) Correspondente</p><div class="resp-linha"></div></div>
<h2>Grupo 4 — Quadriláteros</h2>
<div class="ex"><div class="ex-num">7.</div><p>Num paralelogramo [ABCD], o ângulo A mede 110°. Determina as amplitudes dos ângulos B, C e D.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">8.</div><p>Num quadrilátero, três ângulos medem 85°, 105° e 95°. Determina o quarto ângulo.</p><div class="resp-linha"></div></div>
<h2>Grupo 5 — Áreas de Figuras Planas</h2>
<div class="ex"><div class="ex-num">9.</div><p>Calcula a área das seguintes figuras:</p>
<p>a) Triângulo: base = 12 cm, altura = 7 cm</p><div class="resp-linha"></div>
<p>b) Trapézio: bases 10 cm e 6 cm, altura 5 cm</p><div class="resp-linha"></div>
<p>c) Losango: diagonais 16 cm e 9 cm</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">10.</div><p>Uma figura é composta por um paralelogramo (base 8 cm, altura 5 cm) ao qual se junta um semicírculo de raio 4 cm. Calcula a área total (usa π ≈ 3,14).</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
`);
  } else if(type==='angulos'){
    html=wrap('Ficha de Ângulos — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Ângulos</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>1. Ângulos Internos de Polígonos</h2>
<div class="ex"><div class="ex-num">1.1.</div><p>Calcula a soma dos ângulos internos: a) quadrilátero &nbsp; b) octógono &nbsp; c) decágono</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">1.2.</div><p>Qual é o polígono convexo com soma dos ângulos internos = 1800°?</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">1.3.</div><p>Num pentágono, quatro ângulos medem 100°, 115°, 90° e 108°. Determina o quinto ângulo.</p><div class="resp-linha"></div></div>
<h2>2. Ângulos Externos</h2>
<div class="ex"><div class="ex-num">2.1.</div><p>Num octógono regular, calcula: a) ângulo externo &nbsp; b) ângulo interno</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.2.</div><p>Um ângulo externo de polígono regular mede 30°. Quantos lados tem? Qual é o ângulo interno?</p><div class="resp-linha"></div></div>
<h2>3. Retas Paralelas</h2>
<div class="ex"><div class="ex-num">3.1.</div><p>Retas r ∥ s cortadas por t. O ângulo CFH = 130°. Determina os ângulos: DFE, AEF, BEG, CEF.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.2.</div><p>Indica se cada par de ângulos é alterno interno, co-interno, correspondente ou verticalmente oposto:</p>
<p>a) (110°; 110°) entre paralelas &nbsp;&nbsp; b) (75°; 105°) entre paralelas &nbsp;&nbsp; c) (60°; 60°) na intersecção</p><div class="resp-linha"></div></div>
`);
  } else if(type==='quadrilateros'){
    html=wrap('Ficha de Quadriláteros — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Quadriláteros</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Propriedades dos Quadriláteros</h2>
<div class="ex"><div class="ex-num">1.</div><p>Classifica cada afirmação como Verdadeira (V) ou Falsa (F):</p>
<p>a) Todo o quadrado é um losango. ___</p>
<p>b) Todo o retângulo é um trapézio. ___</p>
<p>c) Num paralelogramo, as diagonais são sempre perpendiculares. ___</p>
<p>d) Num losango, os ângulos opostos são iguais. ___</p>
<p>e) Num trapézio isósceles, todos os ângulos são iguais. ___</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Num paralelogramo [ABCD], o ângulo DAB = 72°. Determina os ângulos ABC, BCD e CDA.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Num trapézio isósceles, um ângulo da base maior mede 65°. Determina os outros três ângulos.</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">4.</div><p>Num losango com ângulo agudo de 60°, determina o ângulo obtuso.</p><div class="resp-linha"></div></div>
<h2>Tabela de Classificação</h2>
<table><tr><th>Propriedade</th><th>Trapézio</th><th>Paralelog.</th><th>Retângulo</th><th>Losango</th><th>Quadrado</th></tr>
<tr><td>Lados opostos paralelos</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>4 ângulos retos</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>4 lados iguais</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais bissetam-se</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais perpendiculares</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Diagonais iguais</td><td></td><td></td><td></td><td></td><td></td></tr></table>
`);
  } else if(type==='areas'){
    html=wrap('Ficha de Áreas — Geometria',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 3 — Geometria — Áreas</em></div>
  </div>
  <div class="doc-logo">3π</div>
</div>
<div class="doc-meta">
  <div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>
  <div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>
</div>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>
<h2>Fórmulas de Referência</h2>
<table><tr><th>Figura</th><th>Fórmula</th></tr>
<tr><td>Triângulo</td><td>A = (b × h) ÷ 2</td></tr>
<tr><td>Paralelogramo</td><td>A = b × h</td></tr>
<tr><td>Trapézio</td><td>A = (b₁ + b₂) ÷ 2 × h</td></tr>
<tr><td>Losango / Papagaio</td><td>A = (d₁ × d₂) ÷ 2</td></tr>
<tr><td>Círculo</td><td>A = π × r²</td></tr></table>
<h2>Exercícios</h2>
<div class="ex"><div class="ex-num">1.</div><p>Calcula as áreas (mostra os cálculos):</p>
<p>a) Triângulo: b = 9 cm, h = 6 cm</p><div class="resp-linha"></div>
<p>b) Paralelogramo: b = 15 cm, h = 8 cm</p><div class="resp-linha"></div>
<p>c) Trapézio: b₁ = 14 cm, b₂ = 8 cm, h = 6 cm</p><div class="resp-linha"></div>
<p>d) Losango: d₁ = 20 cm, d₂ = 12 cm</p><div class="resp-linha"></div>
<p>e) Círculo: r = 7 cm (π ≈ 3,14)</p><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">2.</div><p>Uma figura é formada por um trapézio [ABCD] (bases 12 m e 8 m, altura 5 m) ao qual se retirou um triângulo (base 4 m, altura 3 m). Calcula a área da figura resultante.</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
<div class="ex"><div class="ex-num">3.</div><p>Um papagaio tem diagonais de 18 cm e 10 cm. Está inscrito num retângulo. Qual é a área do papagaio? Qual é a área do retângulo? Qual é a razão entre as duas áreas?</p><div class="resp-linha"></div><div class="resp-linha"></div></div>
`);
  }
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  htmlToPdfDownload(html, `cap3_${type}.pdf`);
}

function downloadFichaGerada3(){
  if(!_gen3Exercicios.length){eduToast('Gera exercícios primeiro!','warn');return;}
  const now=new Date().toLocaleDateString('pt-PT');
  let body=`<h1>Ficha Gerada · Geometria · 7.º Ano · Cap. 3</h1>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Nível: ${_gen3Level}</div>`;
  _gen3Exercicios.forEach((ex,i)=>{
    body+=`<div class="ex"><div class="ex-num">Exercício ${i+1} — ${ex.tema}</div><p>${ex.enun.replace(/<[^>]*>/g,'')}</p>`;
    if(ex.opcoes){ex.opcoes.forEach((o,k)=>{body+=`<p class="opcao">${['A','B','C','D'][k]}) ${o}</p>`;});}
    body+=`<div class="resp-linha"></div></div>`;
  });
  body+=`<h2 style="page-break-before:always">Soluções</h2><ol>`;
  _gen3Exercicios.forEach(ex=>{body+=`<li>${ex.expl||ex.resposta}</li>`;});
  body+=`</ol>`;
  const html=wrapPrintDoc('Ficha Gerada — Geometria',`<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha Gerada<em>Cap. 3 — Geometria</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div></div>${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Matemática 7.º Ano · Cap. 3 — Geometria</span><span>${now}</span></div>`);
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  htmlToPdfDownload(html, 'cap3_ficha_gerada.pdf');
}

/* ══ 3ponto14 DYNAMIC ENGINE ══ */
(function(){
  // 1. FLOATING PARTICLES
  function initParticles(){
    const canvas=document.createElement('canvas');
    canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.5';
    document.body.prepend(canvas);
    const ctx=canvas.getContext('2d');
    let W,H,pts=[];
    const COLS=['#77998E','#AB9790','#516860','#D7BDB2','#9ab5aa'];
    function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
    resize();addEventListener('resize',resize);
    class P{
      constructor(){this.reset(true)}
      reset(init){
        this.x=Math.random()*W;this.y=init?Math.random()*H:H+10;
        this.r=Math.random()*2.5+.8;this.vx=(Math.random()-.5)*.35;this.vy=-(Math.random()*.45+.15);
        this.a=0;this.ta=Math.random()*.3+.06;this.c=COLS[Math.floor(Math.random()*COLS.length)];
        this.pulse=Math.random()*Math.PI*2;this.ps=Math.random()*.02+.01;
        this.diamond=Math.random()>.7;
      }
      tick(){
        this.x+=this.vx;this.y+=this.vy;this.pulse+=this.ps;
        this.a=Math.min(this.a+.007,this.ta*(0.8+0.2*Math.sin(this.pulse)));
        if(this.y<-20)this.reset(false);
      }
      draw(){
        ctx.save();ctx.globalAlpha=this.a;ctx.fillStyle=this.c;
        if(this.diamond){ctx.translate(this.x,this.y);ctx.rotate(Math.PI/4+this.pulse*.3);ctx.fillRect(-this.r,-this.r,this.r*2,this.r*2);}
        else{ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();}
        ctx.restore();
      }
    }
    for(let i=0;i<55;i++)pts.push(new P());
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.07;ctx.strokeStyle='#77998E';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
      }
      pts.forEach(p=>{p.tick();p.draw();});
      requestAnimationFrame(loop);
    }
    loop();
  }
  initParticles();

  // 2. SCROLL PROGRESS BAR
  const bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#77998E,#AB9790,#516860);width:0%;pointer-events:none;box-shadow:0 0 8px rgba(119,153,142,.5);transition:width .1s';
  document.body.appendChild(bar);
  addEventListener('scroll',()=>{
    const pct=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;
    bar.style.width=Math.min(pct,100)+'%';
  });

  // 3. CURSOR TRAIL
  if(innerWidth>768){
    const trail=[];const MAX=10;
    for(let i=0;i<MAX;i++){const d=document.createElement('div');d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';document.body.appendChild(d);trail.push({el:d,x:0,y:0});}
    let mx=0,my=0;
    addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
    function animTrail(){
      trail.forEach((t,i)=>{
        const prev=i===0?{x:mx,y:my}:trail[i-1];
        t.x+=(prev.x-t.x)*.35;t.y+=(prev.y-t.y)*.35;
        const sc=1-i/MAX,sz=sc*12,al=sc*.22;
        t.el.style.cssText=`position:fixed;pointer-events:none;z-index:9999;border-radius:50%;width:${sz}px;height:${sz}px;left:${t.x-sz/2}px;top:${t.y-sz/2}px;background:${i<MAX/2?'rgba(119,153,142,'+al+')':'rgba(171,151,144,'+al+')'};mix-blend-mode:multiply`;
      });
      requestAnimationFrame(animTrail);
    }
    animTrail();
  }

  // 4. SCROLL REVEAL
  const revStyle=document.createElement('style');
  revStyle.textContent='.rv{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rv.in{opacity:1;transform:none}.rvl{opacity:0;transform:translateX(-24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rvl.in{opacity:1;transform:none}';
  document.head.appendChild(revStyle);
  const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.card,.def-block,.quiz-question,.download-card,.mat7-cap-card').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';revObs.observe(el);});
  document.querySelectorAll('.tl-item').forEach((el,i)=>{el.classList.add('rvl');el.style.transitionDelay=i*80+'ms';revObs.observe(el);});
  document.querySelectorAll('.cycle-block,.y-card').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%3)*60+'ms';revObs.observe(el);});

  // 5. RIPPLE ON BUTTONS
  const ripStyle=document.createElement('style');
  ripStyle.textContent='.rp{position:relative;overflow:hidden}.rw{position:absolute;border-radius:50%;transform:scale(0);animation:rwa .55s linear;pointer-events:none;background:rgba(255,255,255,.3)}@keyframes rwa{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(ripStyle);
  document.querySelectorAll('.check-btn,.btn,.tab-btn,.f-btn,.featured-btn-ui,.back-btn,.gen-level-btn,.option-btn').forEach(btn=>{
    btn.classList.add('rp');
    btn.addEventListener('click',e=>{
      const r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height);
      const w=document.createElement('span');w.className='rw';
      w.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px`;
      btn.appendChild(w);w.addEventListener('animationend',()=>w.remove());
    });
  });

  // 6. 3D TILT ON CARDS
  const tiltStyle=document.createElement('style');
  tiltStyle.textContent='.tlt{transform-style:preserve-3d;will-change:transform}';
  document.head.appendChild(tiltStyle);
  function tilt(sel,deg){
    document.querySelectorAll(sel).forEach(el=>{
      el.classList.add('tlt');
      el.addEventListener('mousemove',e=>{
        const r=el.getBoundingClientRect();
        const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
        const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        el.style.transform=`perspective(600px) rotateX(${-dy*deg}deg) rotateY(${dx*deg}deg) translateZ(5px)`;
      });
      el.addEventListener('mouseleave',()=>{
        el.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform='perspective(600px) rotateX(0) rotateY(0)';
        setTimeout(()=>el.style.transition='',500);
      });
      el.addEventListener('mouseenter',()=>el.style.transition='transform .1s');
    });
  }
  tilt('.featured-card',2);tilt('.download-card',5);

  // 7. ANIMATED NUMBER COUNTERS
  const cntObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      cntObs.unobserve(e.target);
      const el=e.target,target=+el.dataset.count,suf=el.dataset.suf||'',t0=performance.now();
      function step(t){
        const p=Math.min((t-t0)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease)+suf;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('.hero-stat .n').forEach(el=>{
    const n=parseFloat(el.textContent);
    if(!isNaN(n)&&n>0){el.dataset.count=n;el.dataset.suf=el.textContent.includes('+')?'+':'';el.textContent='0';cntObs.observe(el);}
  });

  // 8. MOUSE PARALLAX ON HERO DECOS
  const hero=document.querySelector('.hero');
  if(hero){
    const decos=hero.querySelectorAll('.deco');
    addEventListener('mousemove',e=>{
      const dx=(e.clientX-innerWidth/2)/innerWidth,dy=(e.clientY-innerHeight/2)/innerHeight;
      decos.forEach((d,i)=>{const dep=(i%3+1)*9;d.style.transform=`translate(${dx*dep}px,${dy*dep}px)`;});
    });
  }

  // 9. HOVER AURA ON CARDS
  const auraStyle=document.createElement('style');
  auraStyle.textContent='.aura{position:relative}.aura::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(119,153,142,.16) 0%,transparent 65%);pointer-events:none;transition:opacity .3s;z-index:0}.aura:hover::after{opacity:1}.aura>*{position:relative;z-index:1}';
  document.head.appendChild(auraStyle);
  document.querySelectorAll('.card,.def-block,.quiz-question,.y-card,.mat7-cap-card').forEach(el=>{
    el.classList.add('aura');
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // 10. STATUS PILL PULSE
  document.querySelectorAll('.status-pill').forEach(el=>{
    el.style.animation='statusGlow 3s ease-in-out infinite';
  });
  const spStyle=document.createElement('style');
  spStyle.textContent='@keyframes statusGlow{0%,100%{box-shadow:0 0 0 0 rgba(119,153,142,0)}50%{box-shadow:0 0 0 6px rgba(119,153,142,.14)}}';
  document.head.appendChild(spStyle);

})();

