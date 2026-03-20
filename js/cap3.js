// CAP. 3 — GEOMETRIA · JavaScript
// Uses chapter-engine.js for generic quiz/exam/flashcard/progress logic

// ── Utilitários (aliases for backward compat) ──
var rnd3=rnd, sh3=shuffle;
function deg(n){return n+'°';}

// ── CONSTRUTOR DE EXERCÍCIOS CAP3 ──
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
      const w2=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 1',tipo:'mc',
        enun:`A soma dos ângulos internos de um polígono é ${si}°. Quantos lados tem?`,
        opcoes:sh3([n,...w2.slice(0,3)]),resposta:n,
        expl:`(n − 2) × 180° = ${si}°.\nn − 2 = ${si} ÷ 180 = ${n-2}.\nn = ${n-2} + 2 = ${n} lados.`};
    }
    if(variant===2){
      const ang=si/n;
      const w3=sh3([si/n+10,si/n-10,360/n].filter(v=>v>0&&v!==ang)).slice(0,3);
      return{tema:'Tema 1',tipo:'mc',
        enun:`Num ${nome} regular, qual é a amplitude de cada ângulo interno?`,
        opcoes:sh3([ang,...w3]),resposta:ang,
        expl:`Soma dos ângulos internos: (${n}−2)×180° = ${si}°.\nNum polígono regular todos os ângulos são iguais.\nCada ângulo = ${si}° ÷ ${n} = ${ang}°.`};
    }
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
      const w=[n+1,n-1,n+2].filter(v=>v>=3&&v!==n);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Um polígono regular tem ângulo externo de ${ext}°. Quantos lados tem?`,
        opcoes:sh3([n,...w.slice(0,3)]),resposta:n,
        expl:`n = 360° ÷ â_ext = 360° ÷ ${ext}° = ${n} lados.`};
    }
    if(variant===2){
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
        resposta:ang,expl:`Alternos internos são iguais quando as retas são paralelas.\nResposta: ${ang}°.`};
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
        resposta:ang,expl:`Verticalmente opostos são iguais.\nSe um mede ${ang}°, o oposto também mede ${ang}°.`};
    }
    if(variant===3){
      return{tema:'Tema 3',tipo:'mc',
        enun:`Retas r ∥ s cortadas por t. Um ângulo mede ${ang}°. O ângulo correspondente mede:`,
        opcoes:sh3([ang,supl,180,ang+5].filter((v,i,a)=>a.indexOf(v)===i&&v>0&&v<=180).slice(0,4)),
        resposta:ang,expl:`Ângulos correspondentes são iguais quando as retas são paralelas.\nResposta: ${ang}°.`};
    }
    return{tema:'Tema 3',tipo:'fill',
      enun:`Retas paralelas cortadas por uma transversal. Um ângulo mede ${ang}°. O seu suplemento mede ___°.`,
      resposta:supl,expl:`Ângulos suplementares somam 180°.\n180° − ${ang}° = ${supl}°.`};
  }

  // TEMA 4 — Quadriláteros
  if(tema==='4'){
    const facts=[
      {q:'Num paralelogramo, dois ângulos opostos medem 70°. Os outros dois medem:',ops:['110°','70°','90°','140°'],c:'110°',e:'Ângulos adjacentes num paralelogramo são suplementares: somam 180°.\n180°−70°=110°.'},
      {q:'Um trapézio isósceles tem ângulo de base 65°. O outro ângulo da mesma base mede:',ops:['65°','115°','90°','130°'],c:'65°',e:'Num trapézio isósceles, os ângulos da mesma base são iguais.'},
      {q:'Qual é a propriedade que distingue o losango do retângulo?',ops:['4 lados iguais (losango) vs 4 ângulos retos (retângulo)','Ambos têm diagonais iguais','O losango não tem lados paralelos','O retângulo não é paralelogramo'],c:'4 lados iguais (losango) vs 4 ângulos retos (retângulo)',e:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.'},
      {q:'No paralelogramo, as diagonais:',ops:['Bissetam-se mutuamente','São sempre iguais','São sempre perpendiculares','Não se intersectam'],c:'Bissetam-se mutuamente',e:'Num paralelogramo as diagonais bissetam-se.'},
      {q:'Qual dos seguintes quadriláteros tem as diagonais perpendiculares?',ops:['Losango','Retângulo','Trapézio','Qualquer paralelogramo'],c:'Losango',e:'O losango tem as diagonais perpendiculares (formam 90°).'},
      {q:'Um quadrilátero tem ângulos 90°, 80° e 110°. O quarto ângulo mede:',ops:['80°','70°','100°','90°'],c:'80°',e:'Soma dos ângulos internos de um quadrilátero é 360°.\nQuarto ângulo = 360°−90°−80°−110° = 80°.'},
      {q:'O quadrado é simultaneamente:',ops:['Losango e retângulo','Losango e trapézio','Retângulo e trapézio','Apenas losango'],c:'Losango e retângulo',e:'O quadrado tem 4 lados iguais (→ losango) e 4 ângulos retos (→ retângulo).'},
      {q:'Num losango com diagonal maior 12 cm e menor 8 cm, a área é:',ops:['48 cm²','96 cm²','40 cm²','24 cm²'],c:'48 cm²',e:'Área do losango = (d₁ × d₂) / 2.\nA = (12 × 8) / 2 = 48 cm².'},
    ];
    if(hard) facts.push(
      {q:'Num trapézio isósceles, a soma dos ângulos adjacentes a uma perna é:',ops:['180°','360°','90°','270°'],c:'180°',e:'Ângulos co-internos num trapézio são suplementares: somam 180°.'},
      {q:'Num paralelogramo ABCD, AB = 8 cm e BC = 5 cm. Perímetro?',ops:['26 cm','40 cm','13 cm','20 cm'],c:'26 cm',e:'P = 2×AB + 2×BC = 16+10 = 26 cm.'}
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
        resposta:a,expl:`A = (base × altura) / 2 = (${b} × ${h}) / 2 = ${b*h} / 2 = ${a} cm².`};
      if(variant===1){
        const w=sh3([h+2,h-1,h+4].filter(v=>v>0&&v!==h)).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:`Um triângulo tem base ${b} cm e área ${a} cm². Qual é a altura?`,
          opcoes:sh3([h,...w]),resposta:h,
          expl:`h = (2 × A) / b = (2 × ${a}) / ${b} = ${h} cm.`};
      }
      const w=sh3([a+b,a-1,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do triângulo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b} × ${h}) / 2 = ${a} cm².`};
    }
    if(fig===1){
      const b=rnd3(3,easy?12:20),h=rnd3(2,easy?8:12),a=b*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base <strong>${b} cm</strong>, altura <strong>${h} cm</strong>.`,
        resposta:a,expl:`A = base × altura = ${b} × ${h} = ${a} cm².`};
      const w=sh3([a+h,a-b,a*2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:`Área do paralelogramo: base = ${b} cm, altura = ${h} cm`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = ${b} × ${h} = ${a} cm².`};
    }
    if(fig===2){
      const b1=rnd3(3,easy?10:15),b2=b1+rnd3(2,6),h=rnd3(2,easy?8:10);
      const a=(b1+b2)/2*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Trapézio com bases <strong>${b1} cm</strong> e <strong>${b2} cm</strong>, altura <strong>${h} cm</strong>. Calcula a área.`,
        resposta:a,expl:`A = (B + b) / 2 × h = (${b1} + ${b2}) / 2 × ${h} = ${(b1+b2)/2} × ${h} = ${a} cm².`};
      const w=sh3([a+h,b1*b2,a-2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Trapézio: bases ${b1} cm e ${b2} cm, altura ${h} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${b1}+${b2})/2 × ${h} = ${a} cm².`};
    }
    if(fig===3){
      const d1=rnd3(4,easy?12:20),d2=rnd3(3,easy?10:14),a=d1*d2/2;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:`Losango com diagonais <strong>${d1} cm</strong> e <strong>${d2} cm</strong>. Calcula a área.`,
        resposta:a,expl:`A = (d₁ × d₂) / 2 = (${d1} × ${d2}) / 2 = ${a} cm².`};
      const w=sh3([d1*d2,a+d1,a-d2].filter(v=>v>0&&v!==a)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Losango: diagonais ${d1} cm e ${d2} cm. Área?`,
        opcoes:sh3([a,...w]),resposta:a,expl:`A = (${d1}×${d2})/2 = ${a} cm².`};
    }
    if(fig===4){
      const r=rnd3(2,easy?8:12);const ap=parseFloat((Math.PI*r*r).toFixed(1));
      const w=sh3([parseFloat((Math.PI*r).toFixed(1)),parseFloat((2*Math.PI*r).toFixed(1)),r*r].filter(v=>v!==ap)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`Área do círculo com raio ${r} cm (π ≈ 3,14):`,
        opcoes:sh3([ap,...w]),resposta:ap,
        expl:`A = π × r² = π × ${r}² ≈ 3,14 × ${r*r} ≈ ${ap} cm².`};
    }
    const r=rnd3(2,easy?6:10);const a=parseFloat((Math.PI*r*r/2).toFixed(1));
    const w=sh3([parseFloat((Math.PI*r*r).toFixed(1)),parseFloat((Math.PI*r).toFixed(1)),r*r].filter(v=>v!==a)).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:`Área do semicírculo com raio ${r} cm (π ≈ 3,14):`,
      opcoes:sh3([a,...w]),resposta:a,
      expl:`Área do semicírculo = (π × r²) / 2 ≈ (3,14 × ${r*r}) / 2 ≈ ${a} cm².`};
  }

  return buildEx3('1','mc',dif);
}

// ── JOGOS (unique to cap3) ──

// ── clf3 polygon classification game ──
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
  var others=_clf3Data.filter(function(d){return d.n!==item.n;});
  var shuffled=others.sort(function(){return Math.random()-.5;}).slice(0,3);
  var opts=shuffled.concat([item]).sort(function(){return Math.random()-.5;});
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


// ── CALCULADORA DE ÂNGULOS (unique to cap3) ──
function calcAngulos3(){
  const n=parseInt(document.getElementById('ang-lados').value)||0;
  const el=document.getElementById('ang-resultado');
  if(n<3){el.style.display='block';el.innerHTML='<i class="ph ph-warning"></i> Um polígono tem no mínimo 3 lados.';el.className='highlight-box';return;}
  const si=(n-2)*180;
  const intReg=si/n;
  const extReg=360/n;
  el.style.display='block';
  el.className='highlight-box green';
  el.innerHTML=`<strong>Polígono com ${n} lados:</strong><br>
    <i class="ph ph-ruler"></i> Soma dos ângulos <strong>internos</strong>: (${n}−2)×180° = <strong>${si}°</strong><br>
    ↻ Soma dos ângulos <strong>externos</strong>: sempre <strong>360°</strong><br>
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
  if(!valid){el.className='highlight-box';el.innerHTML='<i class="ph ph-warning"></i> Preenche todos os ângulos conhecidos.';return;}
  const faltante=si-soma;
  if(soma>=si){
    el.className='highlight-box';
    el.innerHTML='<i class="ph ph-warning"></i> A soma dos ângulos introduzidos ('+soma+'°) já iguala ou ultrapassa os '+si+'° totais — verifica os valores.';
    return;
  }
  if(faltante<=0||faltante>=180){el.className='highlight-box';el.innerHTML='<i class="ph ph-warning"></i> Valores inválidos — verifica os ângulos introduzidos.';return;}
  el.className='highlight-box green';
  el.innerHTML=`<strong>Ângulo desconhecido = ${si}° − ${soma}° = <span style="font-size:1.1em">${faltante}°</span></strong><br><small style="color:var(--ink3)">S<sub>i</sub> = (${n}−2)×180° = ${si}°</small>`;
}

// ── FLASHCARDS DATA ──
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

// CAP_DATA[3] REGISTRATION — chapter-engine.js integration
window.CAP_DATA[3] = {
  prefix: '3',
  storageKey: 'edupt_cap3',
  viewId: 'view-math3',
  tabsId: 'tabs3',
  temas: [
    'T1 · Ângulos internos de polígonos',
    'T2 · Ângulos externos',
    'T3 · Retas paralelas e ângulos',
    'T4 · Quadriláteros',
    'T5 · Áreas'
  ],
  flashcards: FC3_CARDS,
  buildExercicio: function(tema, tipo, dif) { return buildEx3(tema, tipo, dif); },
  questoesPlans: {
    facil:   {temas:['1','1','1','1','2','2','2','3','3','3','4','4','5','5','5','5','1','2','3','4'],
              tipos:['mc','mc','mc','fill','mc','mc','mc','mc','mc','mc','mc','mc','mc','mc','mc','fill','mc','fill','mc','mc']},
    medio:   {temas:['1','1','1','1','2','2','2','3','3','3','4','4','4','5','5','5','1','2','3','5'],
              tipos:['mc','fill','mc','vf','mc','fill','mc','mc','mc','fill','mc','mc','fill','mc','fill','mc','mc','fill','mc','vf']},
    dificil: {temas:['1','1','1','1','2','2','2','2','3','3','3','4','4','4','5','5','5','5','1','2'],
              tipos:['fill','mc','fill','mc','fill','mc','fill','mc','fill','mc','fill','mc','mc','fill','fill','mc','fill','mc','fill','fill']}
  },
  miniPlans: {
    0: [{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}],
    1: [{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'}],
    2: [{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'}],
    3: [{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'}],
    4: [{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'}],
    5: [{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'}],
  },
  testePlans: {
    subtema0: {
      facil:   [{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'5',tipo:'mc'}],
      medio:   [{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'5',tipo:'mc'}],
      dificil: [{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'}]
    },
    subtema1: {facil:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}],
               medio:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}],
               dificil:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}]},
    subtema2: {facil:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}],
               medio:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}],
               dificil:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}]},
    subtema3: {facil:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}],
               medio:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}],
               dificil:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}]},
    subtema4: {facil:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}],
               medio:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}],
               dificil:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}]},
    subtema5: {facil:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}],
               medio:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}],
               dificil:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}]},
  },
  unique: {
    onShowSection: function(id) {
      if(id==='reta3') { atualizarCamposArea3(); atualizarCamposAngPol3(); }
    }
  }
};

// DELEGATION WRAPPERS — auto-generated + cap3-specific extras
_capRegisterWrappers(3, {
  setTeste3Subtema: function(n,btn){capSetTesteSubtema(3,n,btn)},
  gerarTeste3: function(){capGerarTeste(3)},
  setGenLevel3: function(btn){capSetGenLevel(3,btn)},
  exame3Submit: function(){examActive=false},
  showMathView3: function(){
    _hideAllViews();
    document.getElementById('view-math3').style.display='block';
    document.title='Cap. 3 — Geometria · 3ponto14';
    showSection3('temas3',document.querySelector('#tabs3 .tab-btn'));
    window.scrollTo(0,0);
    var q=document.getElementById('q3-container');if(q&&!q.innerHTML)gerarQuestoes3();
  }
});

/* Visual effects loaded from fx.js */

// ── Topic grid data ──
var _c3Teoria = "showSection3('teoria3',document.querySelector('#tabs3 .tab-btn:nth-child(2)'))";
var _cap3Topics = [
  {id:'tr3-1', num:'01', title:'Ângulos internos de polígonos', open:true, subs:[
    {onclick:_c3Teoria, label:'Fórmula (n−2)×180°', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Polígonos regulares', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-2', num:'02', title:'Ângulos externos', subs:[
    {onclick:_c3Teoria, label:'Soma = 360° (sempre)', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Descobrir n.º de lados', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-3', num:'03', title:'Retas paralelas e ângulos', subs:[
    {onclick:_c3Teoria, label:'Alternos, correspondentes, co-internos', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-4', num:'04', title:'Quadriláteros', subs:[
    {onclick:_c3Teoria, label:'Classificação e propriedades', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Propriedades das diagonais', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-5', num:'05', title:'Áreas de figuras planas', subs:[
    {onclick:_c3Teoria, label:'Fórmulas das áreas', icon:'ph-book-open-text'}
  ]}
];
(function(){
  var el = document.getElementById('cap3-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap3Topics);
})()
