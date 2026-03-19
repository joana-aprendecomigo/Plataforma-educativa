function showSection2(id, btn){
  document.querySelectorAll('#view-math2 .section').forEach(s=>s.classList.remove('active'));
  var _s2=document.getElementById('sec-'+id);
  if(_s2) _s2.classList.add('active');
  document.querySelectorAll('#tabs2 .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(id==='questoes2')   { var _q2=document.getElementById('q2-container');  if(_q2 && !_q2.innerHTML) gerarQuestoes2(); }
  if(id==='minitestes2') { var _m2=document.getElementById('m2-container');  if(_m2 && !_m2.innerHTML) gerarMiniAtual2(); }
  if(id==='teste2')      { var _t2=document.getElementById('t2-container');  if(_t2 && !_t2.innerHTML) gerarTeste2(); }
  if(id==='jogos2') _j24AutoInit('j24-wrap-cap2', 'medio');
  if(id==='quiz-game2') { if(typeof qgStartForCap==='function') qgStartForCap(2); }
  if(id==='flashcards2') fcRender2();
  if(id==='progresso2') progRenderSection2();
  // ── Progress tracking ──
  if(id==='teoria2') _pmRecord('cap2','teoria');
  if(id==='flashcards2') _pmRecord('cap2','flashcard');
  var c2=document.getElementById('sec-'+id);
  if(c2) pmRenderWidget('cap2',c2);
}

function goToTopic2(n){
  const teoriaBtn = document.querySelector('#tabs2 .tab-btn:nth-child(2)');
  showSection2('teoria2', teoriaBtn);
  setTimeout(()=>{
    const el=document.getElementById('topic2-'+n);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  },100);
}

// ── Utilitários ──
function rnd2(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function rndNZ2(min,max){let v;do{v=rnd2(min,max);}while(v===0);return v;}
function fmt2(n){return (n>=0?'+':'')+n;}
function shuffle2(arr){return arr.sort(()=>Math.random()-.5);}
function gcd2(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;}
function reduceFrac(p,q){if(q===0)return[0,1];const g=gcd2(Math.abs(p),Math.abs(q));const sign=(q<0)?-1:1;return[sign*p/g,sign*q/g];}
function fmtFrac(p,q){const[rp,rq]=reduceFrac(p,q);if(rq===1)return String(rp);return rp+'/'+rq;}
function fmtFracHTML(p,q){const[rp,rq]=reduceFrac(p,q);if(rq===1)return String(rp);const neg=rp<0;const absP=Math.abs(rp);return(neg?'−':'')+'<span class="mfrac"><span class="mfrac-n">'+absP+'</span><span class="mfrac-d">'+rq+'</span></span>';}

// ── formatMath: convert X^Y → <span class="mexp">Y</span> in HTML strings ──
function formatMath(s) {
  if (s === null || s === undefined) return s;
  if (typeof s !== 'string') s = String(s);
  if (!s) return s;
  // base^(expr in parens) e.g. 10^(5+7)
  s = s.replace(/([^\s<>^]+)\^\(([^)]+)\)/g, '$1<span class="mexp">($2)</span>');
  // base^? (unknown exponent placeholder)
  s = s.replace(/([^\s<>^]+)\^\?/g, '$1<span class="mexp">?</span>');
  // base^-N (negative numeric exponent)
  s = s.replace(/([^\s<>^]+)\^(-\d+)/g, '$1<span class="mexp">$2</span>');
  // base^N (positive numeric exponent)
  s = s.replace(/([^\s<>^]+)\^(\d+)/g, '$1<span class="mexp">$2</span>');
  return s;
}

// ── State Cap2 ──
const dynState2={
  q2:{level:'medio',score:{correct:0,total:0},answered:{}},
  m2:{level:'medio',score:{correct:0,total:0},answered:{},activeMini:1},
  t2:{level:'medio',score:{correct:0,total:0},answered:{}},
};
let _genAnswered2={};
let _gen2Exercicios=[];
let _gen2Level='facil';
let _gen2Score={correct:0,total:0};

// ─── CONSTRUTORES DE EXERCÍCIOS ───
function buildEx2(tema,tipo,dif){
  tema=String(tema);
  const easy=(dif==='facil'), hard=(dif==='dificil');
  const dens=easy?[2,3,4,5]:[2,3,4,5,6,7,8,10,12];
  function randDen(){return dens[rnd2(0,dens.length-1)];}
  function randFracNZ(){const q=randDen();const p=rndNZ2(-(q*2),q*2);return[p,q];}
  function randFrac(){const q=randDen();const p=rnd2(-(q*2),q*2);return[p,q];}

  // TEMA 1 — Conjuntos de números racionais
  if(tema==='1'){
    const vals=[
      {n:0,  sets:['ℕ','ℤ','ℚ₀⁺','ℤ₀⁺'],  desc:'zero — pertence a ℕ, ℤ, ℚ₀⁺ e ℤ₀⁺, mas NÃO a ℚ⁺ nem ℤ⁺.'},
      {n:1,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-3, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo — pertence a ℤ⁻ e ℚ⁻.'},
      {n:5,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-7, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo.'},
      {n:12, sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:2,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
    ];
    const v=vals[rnd2(0,vals.length-1)];
    const allSets=['ℕ','ℤ','ℚ⁺','ℚ⁻','ℤ⁻','ℤ₀⁺','ℚ₀⁺','ℚ'];
    const testSet=allSets[rnd2(0,allSets.length-1)];
    const correct=v.sets.includes(testSet);
    return{tema:'Tema 1',tipo:'vf',
      enun:`Verdadeiro ou Falso: <em>"${v.n} ∈ ${testSet}"</em>`,
      resposta:correct?'V':'F',
      expl:`O número ${v.n} é ${v.desc}\nPertence a: ${v.sets.join(', ')}.\nA afirmação "${v.n} ∈ ${testSet}" é ${correct?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 2 — Comparação de racionais
  if(tema==='2'){
    const variant=rnd2(0,3);
    if(variant===0){
      const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
      const v1=p1/q1,v2=p2/q2;
      const lcm=q1*q2/gcd2(q1,q2);
      if(tipo==='mc'){
        const correct=(v1>v2?'>':'<');
        const wrongs=['=',correct==='>'?'<':'>','≤'].filter(x=>x!==correct);
        return{tema:'Tema 2',tipo:'mc',
          enun:`Compara: ${fmtFracHTML(p1,q1)} __ ${fmtFracHTML(p2,q2)}`,
          opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
          expl:`Reduz ao mesmo denominador (mmc=${lcm}).\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${p1*(lcm/q1)} ${v1>v2?'>':'<'} ${p2*(lcm/q2)}, portanto ${fmtFrac(p1,q1)} ${correct} ${fmtFrac(p2,q2)}.`};
      }
      return{tema:'Tema 2',tipo:'vf',
        enun:`Verdadeiro ou Falso: <em>"${fmtFracHTML(p1,q1)} &lt; ${fmtFracHTML(p2,q2)}"</em>`,
        resposta:v1<v2?'V':'F',
        expl:`Reduz ao mesmo denominador (mmc=${lcm}).\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)} e ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${fmtFrac(p1,q1)} ${v1<v2?'<':'>'} ${fmtFrac(p2,q2)} → afirmação ${v1<v2?'VERDADEIRA':'FALSA'}.`};
    }
    if(variant===1){
      // Ordenar 3 frações
      const fs=[[...randFracNZ()],[...randFracNZ()],[...randFracNZ()]];
      const vals2=fs.map(([p,q])=>p/q);
      const sorted=fs.slice().sort((f1,f2)=>f1[0]/f1[1]-f2[0]/f2[1]);
      const correctStr=sorted.map(([p,q])=>fmtFrac(p,q)).join(' < ');
      const opts2=shuffle2([
        correctStr,
        [...fs].reverse().map(([p,q])=>fmtFrac(p,q)).join(' < '),
        shuffle2(fs.slice()).map(([p,q])=>fmtFrac(p,q)).join(' < '),
        [sorted[1],sorted[2],sorted[0]].map(([p,q])=>fmtFrac(p,q)).join(' < ')
      ].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Ordena por ordem crescente: ${fs.map(([p,q])=>fmtFracHTML(p,q)).join(', ')}`,
        opcoes:opts2,resposta:correctStr,
        expl:`Converte cada fração para decimal.\n${fs.map(([p,q])=>`${fmtFrac(p,q)} = ${(p/q).toFixed(3)}`).join(', ')}.\nOrdem crescente: ${correctStr}.`};
    }
    if(variant===2){
      // Encontrar fração entre dois valores
      const a2=rnd2(-4,3);const b2=a2+rnd2(2,4);
      const mid=a2+1;
      const opts3=shuffle2([String(mid),String(a2-1),String(b2+1),`${a2*2}`].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:`Qual inteiro está entre ${a2} e ${b2}?`,
        opcoes:opts3,resposta:String(mid),
        expl:`Entre ${a2} e ${b2} encontram-se os inteiros: ${Array.from({length:b2-a2-1},(_,i)=>a2+i+1).join(', ')}.\nUm deles é ${mid}.`};
    }
    // variant===3: vf sobre comparação
    const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
    const v1=p1/q1,v2=p2/q2;
    return{tema:'Tema 2',tipo:'vf',
      enun:`V/F: <em>"${fmtFracHTML(p1,q1)} > ${fmtFracHTML(p2,q2)}"</em>`,
      resposta:v1>v2?'V':'F',
      expl:`${fmtFrac(p1,q1)} = ${v1.toFixed(3)} e ${fmtFrac(p2,q2)} = ${v2.toFixed(3)}.\n${fmtFrac(p1,q1)} ${v1>v2?'>':'<'} ${fmtFrac(p2,q2)} → afirmação ${v1>v2?'VERDADEIRA':'FALSA'}.`};
  }

  // TEMA 3 — Adição e subtração de racionais
  if(tema==='3'){
    const[p1,q1]=randFracNZ();const[p2,q2]=randFracNZ();
    const lcm=q1*q2/gcd2(q1,q2);
    const variant=rnd2(0,3);
    if(variant===0){
      // adição
      const rp=(p1*(lcm/q1))+(p2*(lcm/q2));
      const[resP,resQ]=reduceFrac(rp,lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:`Calcula: ${fmtFracHTML(p1,q1)} + (${fmtFracHTML(p2,q2)}) = ?<br><small style="color:var(--ink4)">Escreve como p/q (ex: 3/4) ou inteiro</small>`,
          resposta:fmtFrac(resP,resQ),
          expl:`Reduz ao mesmo denominador: mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\n${fmtFrac(p1*(lcm/q1),lcm)} + (${fmtFrac(p2*(lcm/q2),lcm)}) = ${fmtFrac(rp,lcm)} = ${fmtFrac(resP,resQ)}.`};
      }
      const wrong1=fmtFrac(resP+1,resQ);const wrong2=fmtFrac(resP-1,resQ);const wrong3=fmtFrac(p1+p2,q1+q2);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Calcula: ${fmtFracHTML(p1,q1)} + (${fmtFracHTML(p2,q2)}) = ?`,
        opcoes:shuffle2([fmtFrac(resP,resQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(resP,resQ),
        expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\nSoma dos numeradores: ${p1*(lcm/q1)} + ${p2*(lcm/q2)} = ${rp}.\nResultado simplificado: ${fmtFrac(resP,resQ)}.`};
    }
    if(variant===1){
      // subtração
      const rp=(p1*(lcm/q1))-(p2*(lcm/q2));
      const[resP,resQ]=reduceFrac(rp,lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>`,
          resposta:fmtFrac(resP,resQ),
          expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1,q1)} = ${fmtFrac(p1*(lcm/q1),lcm)}, ${fmtFrac(p2,q2)} = ${fmtFrac(p2*(lcm/q2),lcm)}.\nSubtração dos numeradores: ${p1*(lcm/q1)} − ${p2*(lcm/q2)} = ${rp}.\nResultado: ${fmtFrac(resP,resQ)}.`};
      }
      const wrong1=fmtFrac(resP+1,resQ);const wrong2=fmtFrac(resP-1,resQ);const wrong3=fmtFrac(p1-p2,q1);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?`,
        opcoes:shuffle2([fmtFrac(resP,resQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(resP,resQ),
        expl:`mmc(${q1},${q2}) = ${lcm}.\n${fmtFrac(p1*(lcm/q1),lcm)} − ${fmtFrac(p2*(lcm/q2),lcm)} = ${fmtFrac(rp,lcm)} = ${fmtFrac(resP,resQ)}.`};
    }
    if(variant===2){
      // simplificar fração
      const g=rnd2(2,6);const num2=rnd2(1,5)*g;const den2=rnd2(1,5)*g;
      const[sP,sQ]=reduceFrac(num2,den2);
      const wrong1=fmtFrac(num2-1,den2);const wrong2=fmtFrac(num2,den2-1);const wrong3=fmtFrac(num2/g+1,den2/g);
      return{tema:'Tema 3',tipo:'mc',
        enun:`Simplifica a fração: ${fmtFracHTML(num2,den2)} = ?`,
        opcoes:shuffle2([fmtFrac(sP,sQ),wrong1,wrong2,wrong3]),resposta:fmtFrac(sP,sQ),
        expl:`Encontra o MDC(${num2},${den2}) = ${g}.\nDivide numerador e denominador por ${g}.\n${num2}÷${g} = ${sP}, ${den2}÷${g} = ${sQ}.\nFração irredutível: ${fmtFrac(sP,sQ)}.`};
    }
    // variant===3: fração equivalente
    const q3=dens[rnd2(0,dens.length-1)];const p3=rnd2(1,q3-1);
    const mult=rnd2(2,4);
    const correct=fmtFrac(p3*mult,q3*mult);
    return{tema:'Tema 3',tipo:'mc',
      enun:`Qual destas frações é equivalente a ${fmtFracHTML(p3,q3)}?`,
      opcoes:shuffle2([correct,fmtFrac(p3*mult+1,q3*mult),fmtFrac(p3+1,q3*mult),fmtFrac(p3*mult,q3*mult+1)]),
      resposta:correct,
      expl:`Multiplica numerador e denominador pelo mesmo número.\n${fmtFrac(p3,q3)} = ${fmtFrac(p3,q3)} × ${fmtFrac(mult,mult)} = ${fmtFrac(p3*mult,q3*mult)}.\nPortanto ${correct} é equivalente a ${fmtFrac(p3,q3)}.`};
  }

  // TEMA 5 — Percentagens
  if(tema==='5'){
    const pcts=easy?[10,20,25,50,75]:[5,10,12,15,20,25,30,40,50,60,75,80];
    const p=pcts[rnd2(0,pcts.length-1)];
    const bases=easy?[20,40,50,60,80,100,120,200]:[25,35,55,65,75,120,250,350,480];
    const base=bases[rnd2(0,bases.length-1)];
    const res=base*p/100;
    const variant=rnd2(0,3);
    if(variant===0){
      // calcular x% de n
      if(tipo==='mc'){
        const wrongs=shuffle2([res+base*0.1,res-base*0.1,res*2,base-res].filter(w=>w!==res&&w>0)).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:`Calcula: ${p}% de ${base} = ?`,
          opcoes:shuffle2([res,...wrongs]),resposta:res,
          expl:`${p}% significa ${p} por cada 100.\n${p}% de ${base} = ${fmtFrac(p,100)} × ${base} = ${p*base/100} = ${res}.`};
      }
      return{tema:'Tema 5',tipo:'fill',
        enun:`Calcula: ${p}% de ${base} = ?`,resposta:res,
        expl:`${p}% de ${base} = ${p}/100 × ${base} = ${p*base/100} = ${res}.`};
    }
    if(variant===1){
      // encontrar a percentagem: x% de base = res
      const res2=res;
      const opts=shuffle2([p,p+5,p-5,p*2].filter(v=>v>0&&v<=100&&v!==p)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`${res2} é __% de ${base}?`,
        opcoes:shuffle2([p,...opts]),resposta:p,
        expl:`Para encontrar a percentagem: (${res2} ÷ ${base}) × 100.\n${res2} ÷ ${base} = ${(res2/base).toFixed(4)}.\n× 100 = ${p}%.`};
    }
    if(variant===2){
      // encontrar o total: p% de x = res  → x = res × 100 / p
      const total=base;
      const given=res;
      const opts=shuffle2([total,total+20,total-20,total*2].filter(v=>v>0&&v!==total)).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:`${p}% de um número é ${given}. Qual é esse número?`,
        opcoes:shuffle2([total,...opts]),resposta:total,
        expl:`Se ${p}% de x = ${given}, então:\nx = ${given} × 100 ÷ ${p} = ${given*100} ÷ ${p} = ${total}.`};
    }
    // variant===3: percentagem num contexto real
    const items=['bilhete','produto','livro','computador','televisão'];
    const item=items[rnd2(0,items.length-1)];
    const price=base;
    const disc=p;
    const discVal=price*disc/100;
    const finalP=price-discVal;
    const opts2=shuffle2([finalP,price+discVal,discVal,price].filter(v=>v!==finalP)).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:`Um ${item} custa ${price} €. Tem um desconto de ${disc}%. Qual o preço final?`,
      opcoes:shuffle2([finalP,...opts2]),resposta:finalP,
      expl:`Passo 1: calcula o desconto.\n${disc}% de ${price} = ${fmtFrac(disc,100)} × ${price} = ${discVal} €.\nPasso 2: subtrai ao preço original.\n${price} − ${discVal} = ${finalP} €.`};
  }

  // TEMA 7 — Potências
  if(tema==='7'){
    const bases7=easy?[2,3,5,10]:[2,3,5,7,10];
    const base7=bases7[rnd2(0,bases7.length-1)];
    const variant=rnd2(0,4);
    if(variant===0){
      const exp1=rnd2(1,easy?4:6);const exp2=rnd2(1,easy?3:5);
      const res=exp1+exp2;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Simplifica: ${base7}^${exp1} × ${base7}^${exp2} = ${base7}^?`,
        opcoes:shuffle2([res,res+1,res-1,exp1*exp2]).slice(0,4),resposta:res,
        expl:`Regra: mesma base → soma os expoentes.\n${base7}^${exp1} × ${base7}^${exp2} = ${base7}^(${exp1}+${exp2}) = ${base7}^${res}.`};
    }
    if(variant===1){
      const exp1=rnd2(2,easy?4:6);const bigExp=exp1+rnd2(1,3);const res=bigExp-exp1;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Simplifica: ${base7}^${bigExp} ÷ ${base7}^${exp1} = ${base7}^?`,
        opcoes:shuffle2([res,res+1,res-1,bigExp+exp1]).slice(0,4),resposta:res,
        expl:`Regra: mesma base → subtrai os expoentes.\n${base7}^${bigExp} ÷ ${base7}^${exp1} = ${base7}^(${bigExp}−${exp1}) = ${base7}^${res}.`};
    }
    if(variant===2){
      // potência de fração
      const n=rnd2(1,4),d=rnd2(2,5),e=rnd2(2,3);
      const correct=`${Math.pow(n,e)}/${Math.pow(d,e)}`;
      return{tema:'Tema 7',tipo:'mc',
        enun:`Calcula: (${fmtFracHTML(n,d)})^${e} = ?`,
        opcoes:shuffle2([correct,`${n*e}/${d*e}`,`${Math.pow(n,e)}/${d}`,`${n}/${Math.pow(d,e)}`]).slice(0,4),
        resposta:correct,
        expl:`Regra: (a/b)^n = a^n / b^n.\n(${n}/${d})^${e} = ${n}^${e} / ${d}^${e} = ${Math.pow(n,e)} / ${Math.pow(d,e)} = ${correct}.`};
    }
    if(variant===3){
      // calcular valor numérico
      const exp3=rnd2(2,easy?3:4);
      const val=Math.pow(base7,exp3);
      const wrongs=shuffle2([val+base7,val-base7,val*base7,base7*exp3].filter(w=>w!==val)).slice(0,3);
      return{tema:'Tema 7',tipo:'mc',
        enun:`Calcula: ${base7}^${exp3} = ?`,
        opcoes:shuffle2([val,...wrongs]),resposta:val,
        expl:`${base7}^${exp3} significa ${Array.from({length:exp3},()=>base7).join(' × ')}.\n= ${val}.`};
    }
    // variant===4: potência de expoente zero
    return{tema:'Tema 7',tipo:'vf',
      enun:`V/F: <em>"Qualquer número (≠0) elevado a 0 é igual a 1: ${base7}^0 = 1"</em>`,
      resposta:'V',
      expl:`Afirmação verdadeira.\nRegra: a^0 = 1 para qualquer a ≠ 0.\n${base7}^0 = 1.\nJustificação: ${base7}^n ÷ ${base7}^n = ${base7}^(n-n) = ${base7}^0 = 1.`};
  }

  // TEMA 8 — Notação científica
  if(tema==='8'){
    const mantissas=easy?[1.5,2.3,4.5,1.8,3.7,2.0,5.1]:[1.23,2.56,3.14,4.87,6.02,9.1,7.5,1.08];
    const exps=easy?[3,4,5,6]:[2,3,4,5,6,7,8];
    const mant=mantissas[rnd2(0,mantissas.length-1)];
    const exp=exps[rnd2(0,exps.length-1)];
    const num=mant*Math.pow(10,exp);
    const variant=rnd2(0,2);
    if(variant===0){
      // número → notação científica
      const correct=`${mant} × 10^${exp}`;
      const wrongs=[`${mant*10} × 10^${exp-1}`,`${mant} × 10^${exp+1}`,`${mant/10} × 10^${exp}`].filter(w=>w!==correct);
      return{tema:'Tema 8',tipo:'mc',
        enun:`Escreve em notação científica: ${num.toLocaleString('pt-PT')} = ?`,
        opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
        expl:`Notação científica: a × 10^n onde 1 ≤ a < 10.\n${num} → move a vírgula ${exp} ${exp===1?'casa':'casas'} para a esquerda.\nResultado: ${mant} × 10^${exp}.`};
    }
    if(variant===1){
      // notação científica → número
      const numStr=num.toLocaleString('pt-PT');
      const wrong1=(mant*Math.pow(10,exp+1)).toLocaleString('pt-PT');
      const wrong2=(mant*Math.pow(10,exp-1)).toLocaleString('pt-PT');
      return{tema:'Tema 8',tipo:'mc',
        enun:`Converte para número inteiro: ${mant} × 10^${exp} = ?`,
        opcoes:shuffle2([numStr,wrong1,wrong2,`${mant*10}`]),resposta:numStr,
        expl:`${mant} × 10^${exp} = ${mant} × ${Math.pow(10,exp).toLocaleString('pt-PT')} = ${numStr}.\n(Move a vírgula ${exp} casas para a direita.)`};
    }
    // variant===2: comparação em notação científica
    const exp2=exps[rnd2(0,exps.length-1)];
    const mant2=mantissas[rnd2(0,mantissas.length-1)];
    const val1=mant*Math.pow(10,exp);const val2=mant2*Math.pow(10,exp2);
    const correctOp=val1>val2?'>':'<';
    return{tema:'Tema 8',tipo:'mc',
      enun:`Compara: ${mant} × 10^${exp} __ ${mant2} × 10^${exp2}`,
      opcoes:shuffle2(['>','<','=','≥']),resposta:correctOp,
      expl:`Compara primeiro os expoentes.\n${exp} ${exp>exp2?'>':exp<exp2?'<':'='} ${exp2}${exp===exp2?` → compara mantissas: ${mant} ${mant>mant2?'>':'<'} ${mant2}`:''}.\nPortanto ${mant}×10^${exp} ${correctOp} ${mant2}×10^${exp2}.`};
  }

  // TEMA 9 — Operações em notação científica
  if(tema==='9'){
    const variant=rnd2(0,2);
    if(variant===0){
      // adição/subtração com mesmo expoente
      const mant1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const mant2=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const exp1b=rnd2(2,6);
      const sumMant=parseFloat((mant1+mant2).toFixed(2));
      let finalMant=sumMant,finalExp=exp1b;
      if(finalMant>=10){finalMant=parseFloat((finalMant/10).toFixed(3));finalExp++;}
      const correct=`${finalMant} × 10^${finalExp}`;
      const wrongs=[`${mant1+mant2} × 10^${exp1b-1}`,`${mant1+mant2} × 10^${exp1b+1}`,`${parseFloat((mant1*mant2).toFixed(2))} × 10^${exp1b*2}`];
      return{tema:'Tema 9',tipo:'mc',
        enun:`Calcula: (${mant1} × 10^${exp1b}) + (${mant2} × 10^${exp1b}) = ?`,
        opcoes:shuffle2([correct,...wrongs.slice(0,3)]),resposta:correct,
        expl:`Mesmo expoente → soma apenas as mantissas.\n${mant1} + ${mant2} = ${sumMant}.\n${sumMant >= 10 ? `${sumMant} ≥ 10, normaliza: ${sumMant}/10 × 10^${exp1b+1} = ${finalMant} × 10^${finalExp}.` : `Resultado: ${correct}.`}`};
    }
    if(variant===1){
      // multiplicação em notação científica
      const m1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      const m2=parseFloat((rnd2(1,4)+(rnd2(0,9)/10)).toFixed(1));
      const e1=rnd2(2,5);const e2=rnd2(2,4);
      const resMant=parseFloat((m1*m2).toFixed(3));
      let fMant=resMant,fExp=e1+e2;
      if(fMant>=10){fMant=parseFloat((fMant/10).toFixed(3));fExp++;}
      const correct=`${fMant} × 10^${fExp}`;
      return{tema:'Tema 9',tipo:'mc',
        enun:`Calcula: (${m1} × 10^${e1}) × (${m2} × 10^${e2}) = ?`,
        opcoes:shuffle2([correct,`${parseFloat((m1+m2).toFixed(1))} × 10^${e1+e2}`,`${fMant} × 10^${e1*e2}`,`${m1*m2} × 10^${e1-e2}`]).slice(0,4),
        resposta:correct,
        expl:`Multiplica mantissas e soma expoentes.\n${m1} × ${m2} = ${resMant}.\n10^${e1} × 10^${e2} = 10^${e1+e2}.\n${resMant>=10?`Normaliza: ${resMant}/10 × 10^${e1+e2+1} = ${fMant} × 10^${fExp}.`:`Resultado: ${correct}.`}`};
    }
    // variant===2: ordenar por grandeza
    const es=[rnd2(2,4),rnd2(5,7),rnd2(8,10)];
    const ms=[parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1))];
    const nums=es.map((e,i)=>`${ms[i]} × 10^${e}`);
    const sorted=nums.slice().sort((a,b)=>{const pa=a.split(' × 10^');const pb=b.split(' × 10^');return (parseFloat(pa[0])*Math.pow(10,parseInt(pa[1])))-(parseFloat(pb[0])*Math.pow(10,parseInt(pb[1])));});
    return{tema:'Tema 9',tipo:'mc',
      enun:`Qual destas é a MAIOR? ${nums.join(', ')}`,
      opcoes:shuffle2(nums),resposta:sorted[sorted.length-1],
      expl:`Compara os expoentes:\n${es.join(', ')} → maior expoente = ${Math.max(...es)}.\nO maior número é ${sorted[sorted.length-1]}.`};
  }

  return buildEx2('3','mc',dif);
}


// ── Render dinâmico Cap2 ──
function renderDynSection2(container, exercicios, sec) {
  if (!dynState2[sec]) dynState2[sec] = { level:'medio', score:{correct:0,total:0}, answered:{} };
  dynState2[sec].answered = {};
  dynState2[sec].score = { correct:0, total:0 };
  if (typeof updateDynScore2 === 'function') updateDynScore2(sec);
  qzInit(container, exercicios, sec, function(correct, total) {
    dynState2[sec].score = { correct: correct, total: total };
    if (typeof updateDynScore2 === 'function') updateDynScore2(sec);
    if (typeof checkCompletion2 === 'function') checkCompletion2(sec);
  });
}

function checkDyn2(sec,qid,tipo,val,btn){
  const st=dynState2[sec];
  if(st.answered[qid])return;
  st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=inp.value.trim();
    inp.disabled=true;
    // normalize: allow both / and ÷, spaces, etc.
    const normalize=s=>s.replace(/\s/g,'').replace(/÷/g,'/');
    const correct=(normalize(userVal)===normalize(String(val)));
    inp.classList.add(correct?'correct':'wrong');
    st.score.total++;if(correct)st.score.correct++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    const isCorrect=(val===true||val==='true');
    if(isCorrect){btn.classList.add('correct');st.score.correct++;}
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
    st.score.total++;
    const fb=document.getElementById(qid+'-fb');
    fb.className='feedback show '+(isCorrect?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(isCorrect, expl, undefined, qid + '-fb');
  }
  updateDynScore2(sec);
  progLog2(sec==='q2'?'questoes':sec==='m2'?'minitestes':'teste',st.answered[qid]);
  {const _s2=sec==='q2'?'q':sec==='m2'?'m':'t';const _ok2=(tipo==='fill'||tipo==='fill_frac')?(document.getElementById(qid+'-in')?.classList.contains('correct')||false):(val===true||val==='true');_etRecord('cap2',_s2,qid,_etText(qid),_ok2);}
}

function updateDynScore2(sec){
  const s=dynState2[sec].score;
  var e1=document.getElementById(sec+'-score'); if(e1)e1.textContent=s.correct;
  var e2=document.getElementById(sec+'-total'); if(e2)e2.textContent='/ '+s.total;
  var e3=document.getElementById(sec+'-prog');  if(e3){const pct=s.total>0?s.correct/s.total*100:0;e3.style.width=pct+'%';}
  if(s.total>0) _pmRecord('cap2','quiz',{pontuacao:s.correct,total:s.total});
  _maybeShowNextStep(sec, s.correct, s.total);
}

function setLevelSection2(sec,btn){
  const bar=btn.closest('.level-bar');
  bar.querySelectorAll('.gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  dynState2[sec].level=btn.dataset.level;
  if(sec==='q2')gerarQuestoes2();
  else if(sec==='m2')gerarMiniAtual2();
  else if(sec==='t2')gerarTeste2();
}

// ── QUESTÕES-AULA ──
function gerarQuestoes2(){
  const dif=dynState2.q2.level;
  let temas, tipos;
  if(dif==='facil'){
    temas=['1','1','1','2','2','2','2','3','3','3','5','5','5','7','7','7','8','8','9','9'];
    tipos=['vf','mc','mc','mc','mc','fill_frac','mc','mc','mc','fill_frac','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc'];
  } else if(dif==='dificil'){
    temas=['1','1','2','2','2','3','3','3','5','5','5','5','7','7','7','8','8','9','9','9'];
    tipos=['vf','mc','mc','vf','fill_frac','fill_frac','fill_frac','mc','mc','fill','mc','fill','mc','mc','mc','mc','mc','mc','mc','mc'];
  } else {
    temas=['1','1','2','2','3','3','3','5','5','5','7','7','7','8','8','8','9','9','9','9'];
    tipos=['vf','mc','mc','fill_frac','mc','fill_frac','mc','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc','mc','mc','mc'];
  }
  const exercicios=temas.map((t,i)=>buildEx2(t,tipos[i],dif)).filter(Boolean);
  renderDynSection2('q2-container',exercicios,'q2');
}

// ── MINITESTES ──
let _activeMini2=0;
function showMiniDyn2(n,btn){
  _activeMini2=n;
  document.querySelectorAll('#mini-tabs2 .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarMiniAtual2();
}
function gerarMiniAtual2(){
  const dif=dynState2.m2.level;
  let exercicios;
  if(_activeMini2===0){
    const plano=[
      {t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},
      {t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill_frac'},{t:'2',tipo:'mc'},
      {t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'mc'},
      {t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},
      {t:'7',tipo:'mc'},{t:'7',tipo:'mc'},
      {t:'8',tipo:'mc'},{t:'8',tipo:'mc'},
      {t:'9',tipo:'mc'},{t:'9',tipo:'mc'},
    ];
    exercicios=plano.map(p=>buildEx2(p.t,p.tipo,dif)).filter(Boolean);
  } else {
    const temaMap={'1':'1','2':'2','3':'3','4':'3','5':'5','6':'5','7':'7','8':'8','9':'9'};
    const realTema=temaMap[String(_activeMini2)]||'1';
    const tipos=['mc','mc','fill_frac','vf','mc','fill','mc','mc','vf','fill_frac','mc','mc','mc','vf','mc','mc','fill','mc','vf','mc'];
    exercicios=tipos.map(t=>buildEx2(realTema,t,dif)).filter(Boolean);
  }
  renderDynSection2('m2-container',exercicios,'m2');
}

// ── TESTE GLOBAL ──
let _teste2Subtema=0;
function setTeste2Subtema(n,btn){
  _teste2Subtema=n;
  document.querySelectorAll('#teste2-subtema-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  gerarTeste2();
}
function gerarTeste2(){
  const dif=dynState2.t2.level;
  let plano;
  if(_teste2Subtema===0){
    if(dif==='facil'){
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'7',tipo:'mc'}];
    } else if(dif==='dificil'){
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'},{t:'9',tipo:'mc'}];
    } else {
      plano=[{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'}];
    }
  } else {
    const t=String(_teste2Subtema);
    plano=[{t,tipo:'mc'},{t,tipo:'mc'},{t,tipo:'vf'},{t,tipo:'mc'},{t,tipo:'fill_frac'},{t,tipo:'mc'}];
  }
  const exercicios=plano.map(p=>buildEx2(p.t,p.tipo,dif)).filter(Boolean);
  renderDynSection2('t2-container',exercicios,'t2');
}

// ── GERADOR LIVRE ──
function setGenLevel2(btn){
  document.querySelectorAll('#sec-gerador2 .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _gen2Level=btn.dataset.level;
}
function gerarExercicios2(){
  _genAnswered2={};
  _gen2Score={correct:0,total:0};
  const tema=document.getElementById('gen2-tema').value;
  const qtd=parseInt(document.getElementById('gen2-qtd').value);
  const dif=_gen2Level;
  const temas=['1','2','3','5','7','8','9'];
  const tipos=['mc','mc','fill_frac','fill','mc','mc','mc'];
  const exercicios=[];
  for(let i=0;i<qtd;i++){
    const idx=i%temas.length;
    const t=tema==='all'?temas[idx]:tema;
    const tipo=tipos[temas.indexOf(t)||0]||'mc';
    const ex=buildEx2(t,tipo,dif);
    if(ex)exercicios.push({...ex,num:i+1});
  }
  _gen2Exercicios=exercicios;
  renderGenExercicios2(exercicios);
}

function renderGenExercicios2(exercicios){
  document.getElementById('gen2-score').textContent='0';
  document.getElementById('gen2-total').textContent='/ 0';
  document.getElementById('gen2-prog').style.width='0%';
  document.getElementById('gen2-score-bar').style.display='flex';
  document.getElementById('gen2-download-area').style.display='flex';
  const labels=['A','B','C','D'];
  let html='';
  exercicios.forEach((ex,i)=>{
    const qid='g2ex'+i;
    html+=`<div class="quiz-question" id="${qid}">
      <div class="q-number">Exercício ${ex.num} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'||ex.tipo==='fill_frac'){
      const isFrac=ex.tipo==='fill_frac';
      html+=`<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
        <input class="fill-input" id="${qid}-in" placeholder="${isFrac?'ex: 3/4':'?'}" type="${isFrac?'text':'number'}" style="width:${isFrac?'120px':'100px'}">
        <button class="check-btn" onclick="checkGen2('${qid}','${ex.tipo}','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;
      (ex.opcoes||[]).forEach((opt,k)=>{
        const isC=(String(opt)===String(ex.resposta));
        html+=`<button class="option-btn" onclick="checkGen2('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button class="option-btn" onclick="checkGen2('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span> Verdadeiro</button>
        <button class="option-btn" onclick="checkGen2('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span> Falso</button>
      </div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });
  document.getElementById('gen2-resultado').innerHTML=html;
}

function checkGen2(qid,tipo,val,btn){
  if(_genAnswered2[qid])return;
  _genAnswered2[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=inp.value.trim().replace(/\s/g,'');
    if(!userVal){_genAnswered2[qid]=false;eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;
    correct=(userVal===String(val).replace(/\s/g,''));
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)_gen2Score.correct++;
  _gen2Score.total++;
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  document.getElementById('gen2-score').textContent=_gen2Score.correct;
  document.getElementById('gen2-total').textContent='/ '+_gen2Score.total;
  document.getElementById('gen2-prog').style.width=(_gen2Score.total>0?_gen2Score.correct/_gen2Score.total*100:0)+'%';
}

// ── JOGOS ──
let _jogosLevel2='facil';

// Triângulo Harmónico
const TRIANGULO_LINES=[
  ['1'],
  ['1/2','1/2'],
  ['1/3','1/6','1/3'],
  ['1/4','1/12','1/12','1/4'],
  ['1/5','1/20','1/30','1/20','1/5'],
  ['1/6','1/30','1/60','1/60','1/30','1/6'],
  ['1/7','1/42','1/105','1/140','1/105','1/42','1/7'],
];
let _trianguloRevealed=false;
function revelarTriangulo(){
  _trianguloRevealed=true;
  renderTrianguloHarmonico();
  const fb=document.getElementById('triangulo-fb');
  fb.className='feedback show correct-fb';
  fb.innerHTML=makeFeedbackHTML(true,'Triângulo revelado corretamente!',undefined,undefined);
}
function resetTriangulo(){
  _trianguloRevealed=false;
  renderTrianguloHarmonico();
  const fb=document.getElementById('triangulo-fb');
  fb.className='feedback';
  fb.innerHTML='';
}

// Relâmpago Cap2
let _rl2Answered=0,_rl2Correct=0;
function checkRl2(qid,tipo,val,btn){
  const container=document.getElementById(qid);
  if(container.dataset.done)return;
  container.dataset.done='1';
  _rl2Answered++;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=(inp.value||'').trim().replace(/\s/g,'');
    if(!userVal){delete container.dataset.done;_rl2Answered--;eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;
    correct=(userVal===String(val).replace(/\s/g,''));
    inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');
    else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)_rl2Correct++;
  _etRecord('cap2','rel',qid,_etText(qid),correct);
  const fb=document.getElementById(qid+'-fb');
  fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  if(_rl2Answered>=10){
    const pct=Math.round(_rl2Correct/10*100);
    const emoji=pct===100?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=80?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=60?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
    document.getElementById('relampago2-result').innerHTML=`${emoji} ${_rl2Correct}/10 certas · ${pct}%`;
    document.getElementById('relampago2-score').style.display='block';
    document.getElementById('relampago2-score').scrollIntoView({behavior:'smooth',block:'nearest'});
    _pmRecord('cap2','quiz',{pontuacao:_rl2Correct,total:10});
    _pmRecord('cap2','jogo');
  }
}

// ── FLASHCARDS ──
const FC2_CARDS=[
  {tag:'Definição',q:'O que é um número racional?',a:'Todo o número que pode ser escrito como p/q, com p,q ∈ ℤ e q ≠ 0. Exemplos: ½, −¾, 0,3, 5.'},
  {tag:'Hierarquia',q:'Qual a relação entre ℕ, ℤ e ℚ?',a:'ℕ ⊂ ℤ ⊂ ℚ. Todos os naturais são inteiros e todos os inteiros são racionais.'},
  {tag:'Definição',q:'O que é ℚ⁺ e ℚ⁻?',a:'ℚ⁺ são os racionais positivos (>0). ℚ⁻ são os racionais negativos (<0). ℚ₀⁺ inclui o zero.'},
  {tag:'Regra',q:'Como arredondar 2/3 às décimas?',a:'2/3 = 0,666… → às décimas: 0,7 (por excesso, pois o algarismo seguinte é 6 ≥ 5).'},
  {tag:'Regra',q:'Como comparar −½ e −⅓?',a:'Reduz ao mesmo denominador: −3/6 vs −2/6. Como −3 < −2, temos −½ < −⅓.'},
  {tag:'Regra',q:'Como somar frações de denominadores diferentes?',a:'Calcular o mmc dos denominadores, converter, e somar os numeradores. Ex: ½ + ⅓ = 3/6 + 2/6 = 5/6.'},
  {tag:'Fórmula',q:'Como calcular p% de N?',a:'p% de N = (p/100) × N. Exemplo: 20% de 150 = 0,20 × 150 = 30.'},
  {tag:'Fórmula',q:'Fórmula para aumento de p%',a:'Valor final = Valor inicial × (1 + p/100). Aumento de 15%: multiplica por 1,15.'},
  {tag:'Fórmula',q:'Fórmula para desconto de p%',a:'Valor final = Valor inicial × (1 − p/100). Desconto de 20%: multiplica por 0,80.'},
  {tag:'Fórmula',q:'Como calcular a % de variação?',a:'% var = (Vf − Vi) / Vi × 100. Se Vf < Vi, é desconto; se Vf > Vi, é aumento.'},
  {tag:'Propriedade',q:'Produto de potências de mesma base',a:'aᵐ × aⁿ = aᵐ⁺ⁿ. Exemplo: 2³ × 2⁵ = 2⁸.'},
  {tag:'Propriedade',q:'Quociente de potências de mesma base',a:'aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Exemplo: 10⁷ ÷ 10³ = 10⁴.'},
  {tag:'Definição',q:'O que é notação científica?',a:'Um número em notação científica tem a forma a × 10ⁿ, onde 1 ≤ a < 10 e n ∈ ℤ. Ex: 25000 = 2,5 × 10⁴.'},
  {tag:'Regra',q:'Como converter 0,0016 para notação científica?',a:'0,0016 = 1,6 × 10⁻³ (mover a vírgula 3 casas para a direita → expoente −3).'},
  {tag:'Regra',q:'Como somar em notação científica?',a:'Igualar os expoentes, depois somar as partes decimais. Ex: 3,2 × 10³ + 8,7 × 10² = 3,2 × 10³ + 0,87 × 10³ = 4,07 × 10³.'},
  {tag:'Regra',q:'Como multiplicar em notação científica?',a:'(a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ. Se a×b ≥ 10, ajustar.'},
  {tag:'Exemplo',q:'Calcula: ½ + (−⅓)',a:'½ + (−⅓) = 3/6 − 2/6 = 1/6'},
  {tag:'Exemplo',q:'Calcula: 35% de 200',a:'35% de 200 = 0,35 × 200 = 70'},
  {tag:'Exemplo',q:'Escreve 183750 em notação científica',a:'183750 = 1,8375 × 10⁵ (mover vírgula 5 casas para a esquerda)'},
  {tag:'Exemplo',q:'Simplifica: 10⁵ × 10⁷',a:'10⁵ × 10⁷ = 10^(5+7) = 10¹²'},
];
let _fc2Idx=0,_fc2Flipped=false,_fc2Order=[...Array(FC2_CARDS.length).keys()];
function fcRender2(){
  const card=FC2_CARDS[_fc2Order[_fc2Idx]];
  document.getElementById('fc2-tag').textContent=card.tag;
  document.getElementById('fc2-q').textContent=card.q;
  document.getElementById('fc2-a').textContent=card.a;
  document.getElementById('fc2-a').style.display='none';
  document.getElementById('fc2-counter').textContent=`${_fc2Idx+1} / ${FC2_CARDS.length}`;
  document.getElementById('fc2-prog').style.width=((_fc2Idx+1)/FC2_CARDS.length*100)+'%';
  const dots=document.getElementById('fc2-dots');
  dots.innerHTML=_fc2Order.map((_,i)=>
    `<div style="width:8px;height:8px;border-radius:50%;background:${i===_fc2Idx?'var(--c2-mid)':'var(--border2)'};cursor:pointer;transition:background .2s;" onclick="fcGoTo2(${i})"></div>`
  ).join('');
  _fc2Flipped=false;
  document.getElementById('fc2-inner').style.background='var(--cream)';
}
function fcFlip2(){
  _fc2Flipped=!_fc2Flipped;
  document.getElementById('fc2-a').style.display=_fc2Flipped?'block':'none';
  document.getElementById('fc2-inner').style.background=_fc2Flipped?'var(--c2-pale)':'var(--cream)';
}
function fcNext2(){_fc2Idx=(_fc2Idx+1)%FC2_CARDS.length;fcRender2();}
function fcPrev2(){_fc2Idx=(_fc2Idx-1+FC2_CARDS.length)%FC2_CARDS.length;fcRender2();}
function fcGoTo2(i){_fc2Idx=i;fcRender2();}

// ── EXAME ──
let _exame2State={level:'medio',timer:null,timeLeft:900,exercicios:[],answered:{},score:{correct:0,total:0}};
function exame2SetLevel(btn){
  document.querySelectorAll('#exame2-level-group .gen-level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  _exame2State.level=btn.dataset.level;
}
function exame2Start(){
  const qtd=parseInt(document.getElementById('exame2-qtd').value);
  const tempo=parseInt(document.getElementById('exame2-tempo').value);
  _exame2State.timeLeft=tempo;_exame2State.answered={};_exame2State.score={correct:0,total:0};
  const temas=['1','2','3','3','5','5','7','8','9'];
  const tipos=['vf','mc','mc','fill_frac','mc','fill','mc','mc','mc'];
  const exs=[];
  for(let i=0;i<qtd;i++){
    const idx=i%temas.length;
    const ex=buildEx2(temas[idx],tipos[idx],_exame2State.level);
    if(ex)exs.push(ex);
  }
  _exame2State.exercicios=exs;
  document.getElementById('exame2-config').style.display='none';
  document.getElementById('exame2-result').style.display='none';
  document.getElementById('exame2-running').style.display='block';
  document.getElementById('exame2-answered').textContent=`0 / ${exs.length}`;
  exame2RenderQuestions(exs);
  exame2UpdateTimer();
  _exame2State.timer=setInterval(()=>{_exame2State.timeLeft--;exame2UpdateTimer();if(_exame2State.timeLeft<=0){clearInterval(_exame2State.timer);exame2Finish();}},1000);
}
function exame2UpdateTimer(){
  const m=Math.floor(_exame2State.timeLeft/60),s=_exame2State.timeLeft%60;
  const el=document.getElementById('exame2-timer');
  el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.style.color=_exame2State.timeLeft<=60?'var(--cs-mid)':_exame2State.timeLeft<=180?'var(--c3-mid)':'var(--ink)';
}
function exame2RenderQuestions(exs){
  const labels=['A','B','C','D'];
  let html='';
  exs.forEach((ex,i)=>{
    const qid='ex2_'+i;
    html+=`<div class="quiz-question" id="${qid}"><div class="q-number">Questão ${i+1} · ${ex.tema}</div><div class="q-text">${formatMath(ex.enun)}</div>`;
    if(ex.tipo==='fill'||ex.tipo==='fill_frac'){
      const isFrac=ex.tipo==='fill_frac';
      html+=`<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;"><input class="fill-input" id="${qid}-in" placeholder="${isFrac?'ex: 3/4':'?'}" type="${isFrac?'text':'number'}" style="width:${isFrac?'120px':'100px'}"><button class="check-btn" onclick="exame2Check('${qid}','${ex.tipo}','${ex.resposta}')">Verificar</button></div>`;
    } else if(ex.tipo==='mc'){
      html+=`<div class="options">`;(ex.opcoes||[]).forEach((opt,k)=>{html+=`<button class="option-btn" data-correct="${String(opt)===String(ex.resposta)}" onclick="exame2Check('${qid}','mc',${String(opt)===String(ex.resposta)},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;});html+=`</div>`;
    } else if(ex.tipo==='vf'){
      const vC=ex.resposta==='V';
      html+=`<div style="display:flex;gap:.75rem;"><button class="option-btn" data-correct="${vC}" onclick="exame2Check('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(46,125,50,.15);color:var(--c1-deep)">V</span>Verdadeiro</button><button class="option-btn" data-correct="${!vC}" onclick="exame2Check('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(198,40,40,.12);color:#b71c1c">F</span>Falso</button></div>`;
    }
    html+=`<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
  });
  document.getElementById('exame2-container').innerHTML=html;
}
function exame2Check(qid,tipo,val,btn){
  const st=_exame2State;if(st.answered[qid])return;st.answered[qid]=true;
  const expl=document.getElementById(qid+'-expl')?.textContent||'';
  const container=document.getElementById(qid);
  let correct=false;
  if(tipo==='fill'||tipo==='fill_frac'){
    const inp=document.getElementById(qid+'-in');
    const userVal=(inp.value||'').trim().replace(/\s/g,'');
    if(!userVal){delete st.answered[qid];eduToast('Introduz uma resposta!','warn');return;}
    inp.disabled=true;correct=(userVal===String(val).replace(/\s/g,''));inp.classList.add(correct?'correct':'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
    correct=(val===true||val==='true');
    if(correct)btn.classList.add('correct');else{btn.classList.add('wrong');container.querySelectorAll('.option-btn').forEach(b=>{if(b.dataset.correct==='true')b.classList.add('correct');});}
  }
  if(correct)st.score.correct++;st.score.total++;
  const fb=document.getElementById(qid+'-fb');fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(correct, expl, val, qid + '-fb');
  document.getElementById('exame2-answered').textContent=`${st.score.total} / ${st.exercicios.length}`;
  document.getElementById('exame2-prog').style.width=(st.score.total/st.exercicios.length*100)+'%';
  progLog2('exame',correct);
  if(st.score.total>=st.exercicios.length){clearInterval(st.timer);setTimeout(exame2Finish,600);}
}
function exame2Stop(){clearInterval(_exame2State.timer);exame2Finish();}
// exame2Submit is the programmatic submit path (called by timer expiry wrappers)
function exame2Submit(){exame2Finish();}
function exame2Finish(){
  examActive = false; // clear guard regardless of how finish was triggered
  document.getElementById('exame2-running').style.display='none';
  const{correct,total}=_exame2State.score;
  const pct=total>0?Math.round(correct/total*100):0;
  document.getElementById('exame2-emoji').innerHTML=pct>=90?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>':pct>=70?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>':pct>=50?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.4 10.6-1.35 1.35A2.92 2.92 0 0 1 10 13a2.92 2.92 0 0 1-2.06-.86L5 9.2A2 2 0 0 1 5 6.38L11 2l3 3"/><path d="m15.5 17.5 3-3a1 1 0 0 0 0-1.41L12.5 7.09a1 1 0 0 0-1.42 0l-3 3L15.5 17.5z"/><path d="M16.5 22 19 19.5l-2.5-2.5-2.5 2.5 2.5 2.5z"/></svg></span>';
  document.getElementById('exame2-nota').textContent=`${pct}% — ${pct>=90?'Excelente!':pct>=70?'Bom!':pct>=50?'Suficiente':'A melhorar'}`;
  document.getElementById('exame2-detalhe').textContent=`${correct} certas em ${total} questões`;
  document.getElementById('exame2-result').style.display='block';
  progLogExame2(pct, correct, total);
}
function exame2Reset(){
  clearInterval(_exame2State.timer);
  document.getElementById('exame2-config').style.display='block';
  document.getElementById('exame2-running').style.display='none';
  document.getElementById('exame2-result').style.display='none';
  var tempo=parseInt((document.getElementById('exame2-tempo')||{}).value)||900;
  var rm=Math.floor(tempo/60), rs=tempo%60;
  document.getElementById('exame2-timer').textContent=(rm<10?'0':'')+rm+':'+(rs<10?'0':'')+rs;
  document.getElementById('exame2-timer').style.color='var(--ink)';
}

// ── PROGRESSO ──
// ── localStorage helpers — Cap 2 ──
function _saveProgData2(){
  try{localStorage.setItem('edupt_cap2',JSON.stringify({sections:_progData2.sections,log:_progData2.log}));}catch(e){}
}
function _loadProgData2(){
  try{
    const raw=localStorage.getItem('edupt_cap2');
    if(!raw)return;
    const saved=JSON.parse(raw);
    if(saved.sections)Object.assign(_progData2.sections,saved.sections);
    if(saved.log)_progData2.log=saved.log;
  }catch(e){}
}

const _progData2={
  sections:{questoes:{correct:0,total:0},minitestes:{correct:0,total:0},teste:{correct:0,total:0},gerador:{correct:0,total:0},jogos:{correct:0,total:0},exame:{correct:0,total:0}},
  log:[],
};
_loadProgData2();

function progLog2(section,correct){
  if(!_progData2.sections[section])_progData2.sections[section]={correct:0,total:0};
  _progData2.sections[section].total++;if(correct)_progData2.sections[section].correct++;
  _progData2.log.unshift({section,correct,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  if(_progData2.log.length>50)_progData2.log.pop();
  _saveProgData2();
  setTimeout(_progRefreshBars, 80);
}
function progLogExame2(pct,correct,total){
  if(!_progData2.exames)_progData2.exames=[];
  _progData2.exames.push({pct,correct,total,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  _progData2.sections.exame.correct+=correct;
  _progData2.sections.exame.total+=total;
  _saveProgData2();
  setTimeout(_progRefreshBars, 80);
}
function progRenderSection2(){
  const sec=_progData2.sections;
  const labels={questoes:'Questões-aula',minitestes:'Minitestes',teste:'Teste',gerador:'Gerador',jogos:'Jogos',exame:'Exame'};
  let total=0,correct=0;Object.values(sec).forEach(s=>{total+=s.total;correct+=s.correct;});
  const globalPct=total>0?Math.round(correct/total*100):0;
  document.getElementById('prog2-cards').innerHTML=[
    {label:'Questões respondidas',val:total,icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},{label:'Respostas certas',val:correct,icon:'<span class="ico ico-sm"><svg><use href="#ico-check"/></svg></span>'},
    {label:'Taxa de acerto',val:total>0?globalPct+'%':'—',icon:'<span class="ico ico-sm"><svg><use href="#ico-target"/></svg></span>'},
  ].map(c=>`<div class="card" style="text-align:center;padding:1.5rem;"><div style="font-size:1.8rem;margin-bottom:.5rem">${c.icon}</div><div style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">${c.val}</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">${c.label}</div></div>`).join('');
  // barras por capítulo
  _progRenderCapitulosBar('prog2-temas', 2);
  const logEl=document.getElementById('prog2-historico');
  if(_progData2.log.length===0){logEl.innerHTML='<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade — começa a responder!</div>';return;}
  logEl.innerHTML=_progData2.log.map(e=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px"><span>${e.correct?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>'}</span><span style="font-size:.82rem;color:var(--ink2)">${labels[e.section]||e.section}</span><span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">${e.time}</span></div>`).join('');
}
function progReset2(){Object.keys(_progData2.sections).forEach(k=>{_progData2.sections[k]={correct:0,total:0};});_progData2.log=[];try{localStorage.removeItem('edupt_cap2');}catch(e){}progRenderSection2();}

// ── DOWNLOADS ──
function downloadFicha2(type){
  const now=new Date().toLocaleDateString('pt-PT');
  function wrap(title,content){ return wrapPrintDoc(title, content); }

  let html='';
  if(type==='ficha_completa'){
    html=wrap('Ficha Completa — Números Racionais',`
<div class="doc-header">
  <div>
    <div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>
    <div class="doc-title">Ficha de Trabalho<em>Cap. 2 — Números Racionais</em></div>
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
<h2>Grupo 1 — Conjuntos de Números Racionais</h2>
<div class="ex"><div class="ex-num">1.</div><p>Utiliza os símbolos ∈, ∉, ⊂ ou ⊃ para obteres afirmações verdadeiras:</p>
<p>a) 3/2 … ℚ⁺ &nbsp;&nbsp; b) 0 … ℤ &nbsp;&nbsp; c) −|−3| … ℤ⁻ &nbsp;&nbsp; d) ℚ … ℤ &nbsp;&nbsp; e) ℕ … ℤ</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Indica um valor arredondado de 2/3 às décimas por defeito e por excesso.</p><div class="linha"></div></div>
<h2>Grupo 2 — Comparação e Ordenação</h2>
<div class="ex"><div class="ex-num">3.</div><p>Completa com >, < ou =:</p>
<p>a) −1/5 ___ 0 &nbsp;&nbsp; b) −4,9 ___ −5 &nbsp;&nbsp; c) −3,5 ___ −14/4 &nbsp;&nbsp; d) −2/5 ___ −2/7</p></div>
<div class="ex"><div class="ex-num">4.</div><p>Ordena por ordem crescente: −1, −½, −¼, ¾, 2</p><div class="linha"></div></div>
<h2>Grupo 3 — Adição Algébrica</h2>
<div class="ex"><div class="ex-num">5.</div><p>Calcula (resultado como fração irredutível ou inteiro):</p>
<p>a) ½ + ⅓ &nbsp;&nbsp; b) ½ + (−⅓) &nbsp;&nbsp; c) −2/5 + (−3/5) &nbsp;&nbsp; d) −1/2 + (−1/10)</p>
<p>e) −7/5 + 0,2 &nbsp;&nbsp; f) −1/6 + (−3/4) &nbsp;&nbsp; g) 7/5 + (−1/4)</p></div>
<h2>Grupo 4 — Percentagens</h2>
<div class="ex"><div class="ex-num">6.</div><p>Completa a tabela:</p>
<table><tr><th>Fração</th><th>1/10</th><th></th><th>7/20</th><th></th></tr><tr><td>Decimal</td><td></td><td>0,23</td><td></td><td></td></tr><tr><td>%</td><td></td><td></td><td></td><td>0,65%</td></tr></table></div>
<div class="ex"><div class="ex-num">7.</div><p>Calcula: a) 20% de 350 &nbsp;&nbsp; b) 35% de 46 &nbsp;&nbsp; c) 15% de 35 000</p><div class="linha"></div></div>
<h2>Grupo 5 — Potências e Notação Científica</h2>
<div class="ex"><div class="ex-num">8.</div><p>Calcula: a) 10⁶ × 10⁸ &nbsp;&nbsp; b) 10¹⁰ ÷ 10³ ÷ 100 &nbsp;&nbsp; c) 5 × 10⁵ × 20</p></div>
<div class="ex"><div class="ex-num">9.</div><p>Escreve em notação científica: a) 25 000 &nbsp;&nbsp; b) 0,0016 × 10⁷ &nbsp;&nbsp; c) 150 × 10⁸</p></div>
<div style="margin-top:40px;padding:12px;border:2px solid #2c3e7a;border-radius:4px"><strong>Classificação:</strong> _____ / 20 &nbsp;&nbsp; <strong>Professor(a):</strong> __________________________</div>`);
  } else if(type==='minitestes'){
    const temas=[
      {t:'1 — Números Racionais',qs:[
        {e:'Qual pertence a ℚ₀⁺ mas não a ℕ?',opts:['A) 5','B) −5/3','C) 12/4','D) 11/5'],r:'D'},
        {e:'O valor absoluto de −15/3 é um número inteiro?',opts:['A) Verdadeiro','B) Falso'],r:'A'},
        {e:'Valor arredondado às centésimas de 57/23:',opts:['A) 2,5','B) 2,48','C) 2,47','D) 2,478'],r:'B'},
        {e:'ℕ ⊂ ℤ ⊂ ℚ — afirmação verdadeira ou falsa?',opts:['A) Verdadeira','B) Falsa'],r:'A'},
      ]},
      {t:'2 — Comparação de Racionais',qs:[
        {e:'Qual está entre −3/4 e −2/3?',opts:['A) −7/9','B) |−0,7|','C) −|−13/18|','D) |−31/45|'],r:'C'},
        {e:'Qual afirmação é verdadeira?',opts:['A) −2 < −2,1','B) |−1/2| > |−1/3|','C) −|−2,5| > 2','D) −4/3 > −5/4'],r:'B'},
        {e:'Compara: −2/5 ___ −2/7',opts:['A) >','B) <','C) =','D) ≥'],r:'B'},
        {e:'Qual é maior: −0,7 ou −3/4?',opts:['A) −0,7','B) −3/4','C) São iguais','D) Impossível dizer'],r:'A'},
      ]},
      {t:'3 — Adição Algébrica',qs:[
        {e:'Qual soma representa o menor número?',opts:['A) −2 + 1/3','B) −1 + (−4/3)','C) −3 − (−1/3)','D) −2/3 − 4/3'],r:'B'},
        {e:'Calcula: 1/2 + (−1/3)',opts:['A) 1/6','B) −1/6','C) 1/5','D) −1/5'],r:'A'},
        {e:'Calcula: −1 − 1/3 − 2',opts:['A) −10/3','B) −8/3','C) −4/3','D) −2'],r:'A'},
        {e:'O Rui pensou num número, adicionou −1/5 e obteve 9/5. Que número pensou?',opts:['A) 2/5','B) 3/5','C) −2','D) 2'],r:'D'},
      ]},
      {t:'5 — Percentagens',qs:[
        {e:'Qual corresponde a 20,5%?',opts:['A) 2,05','B) 0,25','C) 0,205','D) 0,0205'],r:'C'},
        {e:'45% + 38% + ? = 100%. Qual o valor que falta?',opts:['A) 15%','B) 17%','C) 22%','D) 27%'],r:'B'},
        {e:'Calcula: 20% de 35 000',opts:['A) 700','B) 7 000','C) 70 000','D) 350'],r:'B'},
        {e:'Um clube tinha 225 atletas e houve uma diminuição de 12%. Quantos ficaram?',opts:['A) 27','B) 198','C) 213','D) 252'],r:'B'},
      ]},
      {t:'7 — Potências',qs:[
        {e:'10⁵ × 10⁷ = ?',opts:['A) 100¹²','B) 10¹²','C) 10³⁵','D) 100²⁵'],r:'B'},
        {e:'1 000 000 como potência de base 10:',opts:['A) 100³','B) 10⁵','C) 10⁶','D) 10⁷'],r:'C'},
        {e:'10¹⁵ ÷ 10⁹ ÷ 10 = ?',opts:['A) 10⁷','B) 10⁶','C) 10⁵','D) 10⁴'],r:'C'},
        {e:'(3/2)⁵ ÷ (1/2)⁵ ÷ 3³ = ?',opts:['A) 3','B) 6','C) 8','D) 9'],r:'A'},
      ]},
      {t:'8 — Notação Científica',qs:[
        {e:'183 750 metros em notação científica:',opts:['A) 183,75 × 10³','B) 1,8375 × 10⁶','C) 1,8375 × 10⁵','D) 1837,5 × 10²'],r:'C'},
        {e:'5 milhões em notação científica:',opts:['A) 5,0 × 10⁷','B) 5 × 10⁶','C) 5 × 10³','D) 5000 × 10³'],r:'B'},
        {e:'1791 milhões de euros em notação científica:',opts:['A) 1,791 × 1000','B) 1,791 × 10⁹','C) 1,791 × 10⁶','D) 1791 × 10⁶'],r:'B'},
        {e:'0,0016 × 10⁷ em notação científica:',opts:['A) 1,6 × 10⁴','B) 1,6 × 10³','C) 1,6 × 10⁵','D) 16 × 10³'],r:'A'},
      ]},
      {t:'9 — Operações em Notação Científica',qs:[
        {e:'0,032 × 10⁵ + 87 × 10² = ?',opts:['A) 87,032 × 10⁷','B) 87,032 × 10³','C) 119 × 10²','D) 1,19 × 10⁴'],r:'D'},
        {e:'(0,0009 × 10⁸) × (80 × 10³) = ?',opts:['A) 7,2 × 10⁹','B) 7,2 × 10⁸','C) 7,2 × 10¹⁰','D) 7,2 × 10⁷'],r:'A'},
        {e:'A + B = 1,7 × 10⁵ com A = 0,0009 × 10⁸ e B = 80 × 10³. Verdadeiro?',opts:['A) Verdadeiro','B) Falso'],r:'A'},
        {e:'Qual é maior: 5 × 10⁵ × 5 × 10¹⁰ ou 3 × 10¹⁶ − 10¹⁶?',opts:['A) 5 × 10⁵ × 5 × 10¹⁰','B) 3 × 10¹⁶ − 10¹⁶','C) São iguais','D) Impossível'],r:'A'},
      ]},
    ];
    let content=`<h1>Minitestes · Números Racionais · 7.º Ano · Cap. 2</h1><div class="meta">Data: ${now}</div>`;
    temas.forEach((t,ti)=>{
      content+=`<h2>${t.t}</h2><div class="meta">Nome: ______________________________ | Turma: _____ | Nota: _____/6</div>`;
      t.qs.forEach((q,qi)=>{content+=`<div class="ex"><div class="ex-num">${qi+1}.</div><p>${q.e}</p>`;q.opts.forEach(o=>{content+=`<p class="opcao">${o}</p>`;});content+=`</div>`;});
      if(ti<temas.length-1)content+=`<hr style="margin:30px 0;border-color:#ccc">`;
    });
    content+=`<hr style="margin-top:40px"><h2>Soluções</h2>`;
    temas.forEach((t,ti)=>{content+=`<p><strong>${t.t.split('—')[0].trim()}:</strong> `;content+=t.qs.map((q,qi)=>`${qi+1}) ${q.r}`).join(' | ');content+=`</p>`;});
    html=wrap('Minitestes — Números Racionais',content);
  } else if(type==='teste_avaliacao'){
    html=wrap('Teste de Avaliação — Números Racionais',`
<h1>Teste de Avaliação · Números Racionais · 7.º Ano</h1>
<div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now} | Duração: 45 min</div>
<h2>Grupo I — Escolha Múltipla (2 pts cada)</h2>
<div class="ex"><div class="ex-num">1.</div><p>Qual número completa: −17/6 < ___ < −8/3?</p><p class="opcao">A) −3 &nbsp;&nbsp; B) −15/6 &nbsp;&nbsp; C) −31/12 &nbsp;&nbsp; D) −11/4</p></div>
<div class="ex"><div class="ex-num">2.</div><p>Que número deve ser somado ao numerador e denominador de 3/5 para aumento de 25%?</p><p class="opcao">A) 1 &nbsp;&nbsp; B) 2 &nbsp;&nbsp; C) 3 &nbsp;&nbsp; D) 4</p></div>
<div class="ex"><div class="ex-num">3.</div><p>Para que valor de n: 10⁷ × 10ⁿ ÷ 1000 = 10⁹?</p><p class="opcao">A) 2 &nbsp;&nbsp; B) 3 &nbsp;&nbsp; C) 4 &nbsp;&nbsp; D) 5</p></div>
<div class="ex"><div class="ex-num">4.</div><p>8% de 510 000 000 km² em notação científica:</p><p class="opcao">A) 1,2 × 10⁶ &nbsp;&nbsp; B) 1,2 × 10⁷ &nbsp;&nbsp; C) 12 × 10⁶ &nbsp;&nbsp; D) 12 × 10⁷</p></div>
<h2>Grupo II — Resposta Curta (3 pts cada)</h2>
<div class="ex"><div class="ex-num">5.</div><p>Considera A = {−7/10; −74/100; −0,75; −1¹⁰; 4²/8; 3/4}.</p>
<p>5.1. Indica os números inteiros.</p><div class="linha"></div>
<p>5.2. Existem dois simétricos em A? Quais?</p><div class="linha"></div>
<p>5.3. Ordena os elementos de A por ordem crescente.</p><div class="linha"></div></div>
<h2>Grupo III — Problema (4 pts)</h2>
<div class="ex"><div class="ex-num">6.</div><p>O Luís repartiu 2,5 litros de sumo por 12 copos iguais. Quanto ficou em cada copo (em ml, arredondado às unidades)?</p><div class="linha"></div><div class="linha"></div></div>
<div style="margin-top:40px;padding:12px;border:2px solid #2c3e7a;border-radius:4px"><strong>Cotações:</strong> Grupo I: 8 pts | Grupo II: 6 pts | Grupo III: 4 pts | Bónus: 2 pts = <strong>Total: 20 pts</strong></div>`);
  } else if(type==='resumo_teoria'){
    html=wrap('Resumo Teórico — Números Racionais',`
<h1>Resumo Teórico · Números Racionais (ℚ) · 7.º Ano</h1>
<h2>1. Conjuntos Numéricos</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>ℕ ⊂ ℤ ⊂ ℚ &nbsp; · &nbsp; ℚ⁺ (positivos), ℚ⁻ (negativos), ℚ₀⁺ (não negativos)</p></div>
<h2>2. Comparação</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>Reduzir ao mesmo denominador (mmc). Na reta: mais à esquerda = menor.</p></div>
<h2>3. Adição Algébrica</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>a/b + c/d = (a×d + c×b)/(b×d) &nbsp; · &nbsp; Simplificar ao mmc.</p></div>
<h2>4. Percentagens</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>p% = p/100 &nbsp; · &nbsp; p% de N = (p/100)×N</p>
<p>Aumento p%: ×(1+p/100) &nbsp; · &nbsp; Desconto p%: ×(1−p/100)</p>
<p>% variação = (Vf−Vi)/Vi × 100</p></div>
<h2>5. Potências</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>aᵐ×aⁿ = aᵐ⁺ⁿ &nbsp; · &nbsp; aᵐ÷aⁿ = aᵐ⁻ⁿ &nbsp; · &nbsp; (a/b)ⁿ = aⁿ/bⁿ</p></div>
<h2>6. Notação Científica</h2>
<div style="padding:12px;border:1px solid #ccc;border-radius:4px;background:#fafafa">
<p>a × 10ⁿ com 1 ≤ a < 10 &nbsp; · &nbsp; Somar: igualar expoentes &nbsp; · &nbsp; Mult: (a×b)×10ᵐ⁺ⁿ</p></div>`);
  } else if(type==='grelha_avaliacao'){
    html=wrap('Grelha de Avaliação',`
<h1>Grelha de Avaliação · Números Racionais · 7.º Ano · Cap. 2</h1>
<div class="meta">Período: _____ | Turma: _____ | Data: ${now}</div>
<table><tr><th>N.º</th><th>Nome</th><th>T1 ℚ /4</th><th>T2 Comp /4</th><th>T3 + /4</th><th>T4 % /4</th><th>T5 Pot /4</th><th>T6 NC /4</th><th>Total /20</th></tr>
${Array.from({length:30},(_,i)=>`<tr><td>${i+1}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}
</table>`);
  }
  if(!html){eduToast('Tipo não reconhecido.','warn');return;}
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  htmlToPdfDownload(html, type+'_racionais_7ano.pdf');
}
function downloadFichaGerada2(){
  if(!_gen2Exercicios.length){eduToast('Gera exercícios primeiro!','warn');return;}
  const now=new Date().toLocaleDateString('pt-PT');
  let body='';
  _gen2Exercicios.forEach(ex=>{
    body+=`<div style="margin-bottom:24px;border-bottom:1px solid #eee;padding-bottom:12px"><p style="font-weight:700;color:#2c3e7a">Exercício ${ex.num} · ${ex.tema}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if(ex.tipo==='mc'&&ex.opcoes){const ls=['A','B','C','D'];ex.opcoes.forEach((o,i)=>{body+=`<p style="margin:3px 0 3px 20px">☐ ${ls[i]}) ${o}</p>`;});}
    else if(ex.tipo==='vf'){body+=`<p style="margin:3px 0 3px 20px">☐ Verdadeiro &nbsp;&nbsp; ☐ Falso</p>`;}
    else{body+=`<p style="border-bottom:1px solid #bbb;height:28px;margin-top:10px;color:#aaa;font-style:italic;font-size:.85rem">Resposta: ___________________</p>`;}
    body+=`</div>`;
  });
  body+=`<hr style="margin-top:40px"><h2>Soluções</h2><ol>`;
  _gen2Exercicios.forEach(ex=>{body+=`<li>${ex.resposta}</li>`;});
  body+=`</ol>`;
  const now2 = new Date().toLocaleDateString('pt-PT');
  const html=wrapPrintDoc('Ficha Gerada — Números Racionais',`<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha Gerada<em>Cap. 2 — Números Racionais</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div></div>${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Matemática 7.º Ano · Cap. 2 — Números Racionais</span><span>${now2}</span></div>`);
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  htmlToPdfDownload(html, 'ficha_racionais_'+Date.now()+'.pdf');
}

// ═══════════════════════════════════════
// SUBTEMA — PRÁTICA FOCADA
// ═══════════════════════════════════════

function toggleTemaRow(id) {
  const row = document.getElementById(id);
  row.classList.toggle('open');
}

// ── Modal de subtema ──
function criarModalSubtema(titulo, exercicios) {
  // Remove modal anterior se existir
  const old = document.getElementById('subtema-modal');
  if (old) old.remove();

  const labels = ['A','B','C','D'];
  let qhtml = '';
  exercicios.forEach((ex, i) => {
    const qid = 'stq' + i;
    qhtml += `<div class="quiz-question" id="${qid}" style="margin-bottom:1rem">
      <div class="q-number">Questão ${i+1} · ${ex.tema}</div>
      <div class="q-text">${formatMath(ex.enun)}</div>`;
    if (ex.tipo === 'fill') {
      qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">
        <button class="check-btn" onclick="stCheck('${qid}','fill',${ex.resposta})">Verificar</button>
      </div>`;
    } else if (ex.tipo === 'fill_frac') {
      qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
        <input class="fill-input" id="${qid}-in" placeholder="ex: 3/4" type="text" style="width:120px">
        <button class="check-btn" onclick="stCheck('${qid}','fill_frac','${ex.resposta}')">Verificar</button>
      </div>`;
    } else if (ex.tipo === 'mc') {
      qhtml += `<div class="options">`;
      (ex.opcoes || []).forEach((opt, k) => {
        const isC = String(opt) === String(ex.resposta);
        qhtml += `<button class="option-btn" onclick="stCheck('${qid}','mc',${isC},this)">
          <span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`;
      });
      qhtml += `</div>`;
    } else if (ex.tipo === 'vf') {
      const vC = ex.resposta === 'V';
      qhtml += `<div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="option-btn" onclick="stCheck('${qid}','mc',${vC},this)">
          <span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button>
        <button class="option-btn" onclick="stCheck('${qid}','mc',${!vC},this)">
          <span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button>
      </div>`;
    }
    qhtml += `<div class="feedback" id="${qid}-fb"></div>
      <span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span>
    </div>`;
  });

  const modal = document.createElement('div');
  modal.id = 'subtema-modal';
  modal.style.cssText = `position:fixed;inset:0;z-index:9999;background:rgba(28,26,22,.55);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:2rem 1rem;overflow-y:auto`;
  modal.innerHTML = `
    <div style="background:var(--cream);border-radius:20px;max-width:680px;width:100%;box-shadow:var(--shadow-lg);overflow:hidden;animation:pfadeUp .25s ease">
      <div style="background:var(--ink);padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="font-size:.72rem;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">Prática focada</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:#fff">${titulo}</div>
        </div>
        <button onclick="document.getElementById('subtema-modal').remove()" aria-label="Fechar" style="all:unset;cursor:pointer;width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;transition:background .15s" onmouseover="this.style.background='rgba(255,255,255,.22)'" onmouseout="this.style.background='rgba(255,255,255,.12)'">✕</button>
      </div>
      <div style="padding:1.5rem" id="subtema-body">${qhtml}</div>
      <div style="padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">
        <div class="score-bar" style="flex:1;min-width:200px;margin:0;padding:.6rem 1rem">
          <div><div class="score-num" id="st-score" style="font-size:1.4rem">0</div><div class="score-label">certos</div></div>
          <div><div class="score-num" id="st-total" style="color:var(--ink4);font-size:1.1rem">/ 0</div><div class="score-label">respondidos</div></div>
          <div class="progress-track" style="flex:1"><div class="progress-fill" id="st-prog" style="width:0%"></div></div>
        </div>
        <button class="btn btn-ghost" onclick="stNovas()" style="flex-shrink:0">↺ Novas questões</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  // store context for "novas questões"
  window._stContext = { titulo, gerador: null };
}

let _stAnswered = {};
let _stScore = { correct: 0, total: 0 };

function stCheck(qid, tipo, val, btn) {
  if (_stAnswered[qid]) return;
  _stAnswered[qid] = true;
  const expl = document.getElementById(qid + '-expl')?.textContent || '';
  const container = document.getElementById(qid);
  let correct = false;
  if (tipo === 'fill' || tipo === 'fill_frac') {
    const inp = document.getElementById(qid + '-in');
    const uv = inp.value.trim().replace(/\s/g,'');
    if (!uv) { _stAnswered[qid] = false; eduToast('Introduz uma resposta!','warn'); return; }
    inp.disabled = true;
    correct = tipo === 'fill' ? (parseFloat(uv) === val) : (uv === String(val).replace(/\s/g,''));
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    container.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    correct = (val === true || val === 'true');
    if (correct) btn.classList.add('correct');
    else { btn.classList.add('wrong'); container.querySelectorAll('.option-btn').forEach(b => { if (b.dataset.correct === 'true') b.classList.add('correct'); }); }
  }
  if (correct) _stScore.correct++;
  _stScore.total++;
  const fb = document.getElementById(qid + '-fb');
  fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb');
  fb.innerHTML = makeFeedbackHTML(correct, expl, tipo==='fill'?val:undefined);
  document.getElementById('st-score').textContent = _stScore.correct;
  document.getElementById('st-total').textContent = '/ ' + _stScore.total;
  document.getElementById('st-prog').style.width = (_stScore.total > 0 ? _stScore.correct/_stScore.total*100 : 0) + '%';
}

function stNovas() {
  if (window._stContext?.gerador) {
    _stAnswered = {}; _stScore = { correct: 0, total: 0 };
    const exs = window._stContext.gerador();
    let qhtml = ''; const labels = ['A','B','C','D'];
    exs.forEach((ex, i) => {
      const qid = 'stq' + i;
      qhtml += `<div class="quiz-question" id="${qid}" style="margin-bottom:1rem">
        <div class="q-number">Questão ${i+1} · ${ex.tema}</div>
        <div class="q-text">${formatMath(ex.enun)}</div>`;
      if (ex.tipo === 'fill') {
        qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="${qid}-in" placeholder="?" type="text" inputmode="decimal" style="width:100px"><button class="check-btn" onclick="stCheck('${qid}','fill',${ex.resposta})">Verificar</button></div>`;
      } else if (ex.tipo === 'fill_frac') {
        qhtml += `<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="${qid}-in" placeholder="ex: 3/4" type="text" style="width:120px"><button class="check-btn" onclick="stCheck('${qid}','fill_frac','${ex.resposta}')">Verificar</button></div>`;
      } else if (ex.tipo === 'mc') {
        qhtml += `<div class="options">`;
        (ex.opcoes||[]).forEach((opt, k) => { const isC = String(opt)===String(ex.resposta); qhtml += `<button class="option-btn" onclick="stCheck('${qid}','mc',${isC},this)"><span class="opt-label">${labels[k]}</span>${formatMath(opt)}</button>`; });
        qhtml += `</div>`;
      } else if (ex.tipo === 'vf') {
        const vC = ex.resposta==='V';
        qhtml += `<div style="display:flex;gap:.75rem;flex-wrap:wrap"><button class="option-btn" onclick="stCheck('${qid}','mc',${vC},this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" onclick="stCheck('${qid}','mc',${!vC},this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>`;
      }
      qhtml += `<div class="feedback" id="${qid}-fb"></div><span id="${qid}-expl" style="display:none">${(ex.expl||'').replace(/'/g,"&#39;")}</span></div>`;
    });
    document.getElementById('subtema-body').innerHTML = qhtml;
    document.getElementById('st-score').textContent = '0';
    document.getElementById('st-total').textContent = '/ 0';
    document.getElementById('st-prog').style.width = '0%';
  }
}

// ── Subtema builders Cap1 ──
function abrirSubtema(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  const dif = dynState.q.level || 'medio';
  const { min, max } = lim(dif);
  const N = 6;

  const titulos = {
    '1:inteiros': 'Conjunto dos Números Inteiros', '1:representacao': 'Representar Situações com Inteiros', '1:ordenacao': 'Ordenar Inteiros na Reta',
    '2:absoluto': 'Valor Absoluto |a|', '2:simetrico': 'Simétrico de um Número', '2:comparar': 'Comparar usando Valor Absoluto',
    '3:mesmo_sinal': 'Adição — Mesmo Sinal', '3:sinais_dif': 'Adição — Sinais Diferentes', '3:contexto': 'Adição — Problemas de Contexto',
    '4:subtracao': 'Subtração de Inteiros', '4:adicao_alg': 'Adição Algébrica', '4:simplificar': 'Simplificar Expressões',
    '5:retirar_par': 'Retirar Parênteses', '5:valor_num': 'Valor Numérico', '5:colchetes': 'Colchetes e Chavetas',
  };
  const titulo = titulos[tema+':'+sub] || 'Prática';

  function gerador() {
    const exs = [];
    for (let i = 0; i < N; i++) {
      let ex = null;
      if (tema==='1' && sub==='inteiros')      ex = buildT1('vf', min, max, i+1);
      else if (tema==='1' && sub==='representacao') ex = buildT1(i%2===0?'mc':'fill', min, max, i+1);
      else if (tema==='1' && sub==='ordenacao') {
        const vals = Array.from({length:4}, () => rnd(min, max));
        const sorted = [...vals].sort((a,b)=>a-b);
        ex = { num:i+1, tema:'Tema 1', tipo:'mc',
          enun:`Qual a ordem crescente de: ${vals.join(', ')}?`,
          opcoes: [sorted.join(' < '), [...sorted].reverse().join(' > '), shuffle([...vals]).join(', '), sorted.join(' > ')].slice(0,4),
          resposta: sorted.join(' < '),
          expl: `Ordem crescente: ${sorted.join(' < ')} (da esquerda para a direita na reta numérica).` };
      }
      else if (tema==='2' && sub==='absoluto') {
        const a = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Calcula: |${a}| = ?`, resposta: Math.abs(a), expl:`A afirmação é verdadeira — |${a}| = ${Math.abs(a)} (distância à origem, sempre positiva).` };
      }
      else if (tema==='2' && sub==='simetrico') {
        const a = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Qual é o simétrico de ${a}?`, resposta: -a, expl:`O simétrico de ${a} é ${-a} — inverte o sinal.` };
      }
      else if (tema==='2' && sub==='comparar') {
        const a = rndNZ(min, max), b = rndNZ(min, max);
        const correct = Math.abs(a) > Math.abs(b) ? `|${a}|` : Math.abs(a) < Math.abs(b) ? `|${b}|` : 'Iguais';
        ex = { num:i+1, tema:'Tema 2', tipo:'mc',
          enun:`Qual é o maior: |${a}| ou |${b}|?`,
          opcoes: shuffle([`|${a}|`, `|${b}|`, 'Iguais', `|${a+b}|`]).slice(0,4),
          resposta: correct,
          expl:`|${a}| = ${Math.abs(a)}, |${b}| = ${Math.abs(b)}. O maior é ${correct}.` };
      }
      else if (tema==='3' && sub==='mesmo_sinal') {
        const a = rnd(min<0?min:-max, -1), b = rnd(min<0?min:-max, -1);
        const res = a+b;
        ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:`Calcula: (${fmt(a)}) + (${fmt(b)}) = ?`, resposta:res, expl:`Mesmo sinal (ambos negativos): soma os módulos e fica negativo: ${Math.abs(a)}+${Math.abs(b)}=${Math.abs(res)}, resultado: ${res}.` };
      }
      else if (tema==='3' && sub==='sinais_dif') {
        const a = rndNZ(min, max), b = -rndNZ(min, max);
        const res = a+b;
        ex = { num:i+1, tema:'Tema 3', tipo:'fill', enun:`Calcula: (${fmt(a)}) + (${fmt(b)}) = ?`, resposta:res, expl:`Sinais diferentes: subtrai os módulos e usa o sinal do maior: resultado = ${res}.` };
      }
      else if (tema==='3' && sub==='contexto') ex = buildT3('contexto', min, max, i+1);
      else if (tema==='4' && sub==='subtracao') {
        const a = rndNZ(min, max), b = rndNZ(min, max);
        ex = { num:i+1, tema:'Tema 4', tipo:'fill', enun:`Calcula: (${fmt(a)}) − (${fmt(b)}) = ?`, resposta:a-b, expl:`(${fmt(a)}) − (${fmt(b)}) = ${fmt(a)} + ${fmt(-b)} = ${a-b} (subtrair = adicionar o simétrico).` };
      }
      else if (tema==='4' && sub==='adicao_alg') ex = buildT4('mc', min, max, i+1);
      else if (tema==='4' && sub==='simplificar') ex = buildT4('fill', min, max, i+1);
      else if (tema==='5' && sub==='retirar_par') ex = buildT5('mc', min, max, i+1, dif);
      else if (tema==='5' && sub==='valor_num')   ex = buildT5('fill', min, max, i+1, dif);
      else if (tema==='5' && sub==='colchetes') {
        const a=rndNZ(-10,10), b=rndNZ(-10,10), c=rndNZ(-10,10);
        const inner=b-c, bracket=a-inner, res=-bracket;
        ex = { num:i+1, tema:'Tema 5', tipo:'fill',
          enun:`Calcula: −[${a} − (${fmt(b)} − ${fmt(c)})] = ?`, resposta:res,
          expl:`Passo 1: (${fmt(b)}−${fmt(c)})=${inner}. Passo 2: [${a}−(${inner})]=${bracket}. Passo 3: −[${bracket}]=${res}.` };
      }
      else ex = buildExercicio(tema, i%2===0?'mc':'fill', min, max, i+1, dif);
      if (ex) exs.push(ex);
    }
    return exs;
  }

  window._stContext = { titulo, gerador };
  criarModalSubtema(titulo, gerador());
}

// ── Subtema builders Cap2 ──
function abrirSubtema2(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  const dif = dynState2.q2?.level || 'medio';
  const N = 6;

  const titulos2 = {
    '1:conjuntos':'Conjuntos ℕ, ℤ, ℚ', '1:arredondamento':'Arredondamento', '1:aprox':'Valores Aproximados',
    '2:comparar':'Comparar Frações', '2:ordenar':'Ordenar Racionais', '2:absoluto':'Valor Absoluto em ℚ',
    '3:somar_frac':'Somar Frações', '3:subtrair_frac':'Subtrair Frações', '3:expressoes':'Expressões com Frações', '3:contexto_rac':'Partes de um Todo',
    '5:converter':'Converter Fração/Decimal/%', '5:calcular_pct':'Calcular % de N', '5:aumento':'Aumentos Percentuais', '5:desconto':'Descontos', '5:variacao':'Taxa de Variação',
    '7:produto':'Produto de Potências', '7:quociente':'Quociente de Potências', '7:frac_pot':'Potência de Fração',
    '8:escrever':'Escrever em Notação Científica', '8:pot_base10':'Potências de Base 10',
    '9:somar_nc':'Somar/Subtrair em Not. Científica', '9:mult_nc':'Multiplicar/Dividir em Not. Científica', '9:comparar_nc':'Comparar em Not. Científica',
  };
  const titulo = titulos2[tema+':'+sub] || 'Prática';

  function gerador() {
    const exs = [];
    for (let i = 0; i < N; i++) {
      let ex = null;
      // Tema 2 sub-specific
      if (tema==='2' && sub==='comparar') ex = buildEx2('2','mc',dif);
      else if (tema==='2' && sub==='ordenar') ex = buildEx2('2','vf',dif);
      else if (tema==='2' && sub==='absoluto') {
        const dens=[2,3,4,5]; const q=dens[rnd2(0,3)]; const p=rndNZ2(-q*2,q*2);
        ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:`Calcula: |${fmtFracHTML(p,q)}| = ?`, resposta:fmtFrac(Math.abs(p),q), expl:`A afirmação é verdadeira — |${fmtFrac(p,q)}| = ${fmtFrac(Math.abs(p),q)} (valor absoluto é sempre positivo).` };
      }
      else if (tema==='3' && sub==='somar_frac') { const ex0=buildEx2('3','fill_frac',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='3' && sub==='subtrair_frac') {
        const dens=[2,3,4,5,6]; const q1=dens[rnd2(0,4)],q2=dens[rnd2(0,4)];
        const p1=rndNZ2(-q1*2,q1*2), p2=rndNZ2(-q2*2,q2*2);
        const lcm=q1*q2/gcd2(q1,q2); const rp=(p1*(lcm/q1))-(p2*(lcm/q2));
        const[resP,resQ]=reduceFrac(rp,lcm);
        ex={num:i+1,tema:'Tema 3',tipo:'fill_frac', enun:`Calcula: ${fmtFracHTML(p1,q1)} − (${fmtFracHTML(p2,q2)}) = ?`, resposta:fmtFrac(resP,resQ), expl:`${fmtFrac(p1,q1)} − ${fmtFrac(p2,q2)} = ${fmtFrac(p1*(lcm/q1),lcm)} − ${fmtFrac(p2*(lcm/q2),lcm)} = ${fmtFrac(resP,resQ)}`};
      }
      else if (tema==='3' && sub==='expressoes') { const ex0=buildEx2('3','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='5' && sub==='converter') {
        const pcts=[10,20,25,50,75,30,40]; const p=pcts[rnd2(0,pcts.length-1)];
        const opts=[p/100, p+0.5, p*10, (p/100).toFixed(2)+'0'];
        ex={num:i+1,tema:'Tema 5',tipo:'mc', enun:`${p}% como decimal é:`, opcoes:shuffle([p/100,...[p+0.5,p*10,p/1000].filter(w=>w!==p/100)]).slice(0,4), resposta:p/100, expl:`${p}% = ${p}/100 = ${p/100}.`};
      }
      else if (tema==='5' && sub==='calcular_pct') { const ex0=buildEx2('5','fill',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='5' && (sub==='aumento'||sub==='desconto')) {
        const pcts=[5,10,15,20,25]; const p=pcts[rnd2(0,4)];
        const bases=[80,100,120,200,250,500]; const base=bases[rnd2(0,bases.length-1)];
        const isAum=(sub==='aumento');
        const res=isAum ? base*(1+p/100) : base*(1-p/100);
        ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:`${isAum?'Aumento':'Desconto'} de ${p}% sobre ${base} €. Valor final?`, resposta:res, expl:`${base} × ${isAum?'(1+'+p+'/100)':'(1-'+p+'/100)'} = ${base} × ${isAum?(1+p/100):(1-p/100)} = ${res} €.`};
      }
      else if (tema==='5' && sub==='variacao') {
        const vi=[80,100,150,200][rnd2(0,3)]; const vf=vi+[-20,-10,10,20,30][rnd2(0,4)];
        const pct=Math.round((vf-vi)/vi*100);
        ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:`Preço: ${vi}€ → ${vf}€. Qual a variação percentual?`, resposta:pct, expl:`% var = (${vf}−${vi})/${vi}×100 = ${vf-vi}/${vi}×100 = ${pct}%.`};
      }
      else if (tema==='7' && sub==='produto') { const ex0=buildEx2('7','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='7' && sub==='quociente') {
        const b=[2,3,5,10][rnd2(0,3)]; const big=rnd2(4,8); const small=rnd2(1,big-1);
        const res=big-small;
        ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:`Simplifica: ${b}^${big} ÷ ${b}^${small} = ${b}^?`, opcoes:shuffle([res,res+1,res-1,big+small]).slice(0,4), resposta:res, expl:`${b}^${big} ÷ ${b}^${small} = ${b}^(${big}−${small}) = ${b}^${res}.`};
      }
      else if (tema==='7' && sub==='frac_pot') {
        const n=rnd2(2,4),d=rnd2(2,5),e=rnd2(2,3);
        ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:`(${n}/${d})^${e} = ?`, opcoes:shuffle([`${Math.pow(n,e)}/${Math.pow(d,e)}`,`${n*e}/${d*e}`,`${Math.pow(n,e)}/${d}`,`${n}/${Math.pow(d,e)}`]).slice(0,4), resposta:`${Math.pow(n,e)}/${Math.pow(d,e)}`, expl:`(${n}/${d})^${e} = ${n}^${e}/${d}^${e} = ${Math.pow(n,e)}/${Math.pow(d,e)}.`};
      }
      else if (tema==='8') { const ex0=buildEx2('8','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else if (tema==='9') { const ex0=buildEx2('9','mc',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      else { const ex0=buildEx2(tema,i%2===0?'mc':'fill_frac',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
      if (ex) exs.push(ex);
    }
    return exs;
  }

  window._stContext = { titulo, gerador };
  criarModalSubtema(titulo, gerador());
}

// ── FEEDBACK HELPER ──
/* ══════════════════════════════════════════════
   REVELAÇÃO GRADUAL DE PASSOS
   Divide o campo expl por \n em passos individuais.
   Se só tiver 1 passo, mostra tudo de uma vez (comportamento anterior).
   Se tiver 2+ passos, mostra o primeiro e um botão "Ver passo seguinte".
══════════════════════════════════════════════ */

var _stepState = {}; // { fbId: { steps:[], current:0 } }

function _stepNext(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  state.current++;
  _stepRender(fbId);
}

function _stepRenderAll(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  state.current = state.steps.length - 1;
  _stepRender(fbId);
}

function _stepRender(fbId) {
  var state = _stepState[fbId];
  if (!state) return;
  var stepsEl = document.getElementById(fbId + '-steps');
  var btnEl   = document.getElementById(fbId + '-stepbtn');
  var allEl   = document.getElementById(fbId + '-allbtn');
  if (!stepsEl) return;

  var html = '';
  for (var i = 0; i <= state.current; i++) {
    var isNew = (i === state.current && state.current > 0);
    html += '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px' +
      (isNew ? ';animation:stepSlideIn .3s cubic-bezier(.22,1,.36,1)' : '') + '">' +
      '<span style="min-width:24px;height:24px;border-radius:50%;background:' + state.color +
      ';color:#fff;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;flex-shrink:0;margin-top:2px;box-shadow:0 2px 6px rgba(0,0,0,.15)">' +
      (i + 1) + '</span>' +
      '<span style="font-size:.86rem;line-height:1.65;color:#374151;padding-top:2px">' + (typeof formatMath==='function'?formatMath(state.steps[i]):state.steps[i]) + '</span></div>';
  }
  stepsEl.innerHTML = html;

  var done = (state.current >= state.steps.length - 1);
  if (btnEl)  btnEl.style.display  = done ? 'none' : 'inline-flex';
  if (allEl)  allEl.style.display  = done ? 'none' : 'inline-flex';
}


function makeFeedbackHTML(isCorrect, expl, val, fbId) {
  var color       = isCorrect ? '#16a34a' : '#dc2626';
  var bgColor     = isCorrect ? '#f0fdf4' : '#fff1f2';
  var borderColor = isCorrect ? '#bbf7d0' : '#fecaca';
  var accentColor = isCorrect ? '#16a34a' : '#dc2626';

  var status = isCorrect
    ? '✓ Correto!'
    : (val !== undefined && val !== null && val !== ''
        ? '✗ Incorreto — a resposta certa é: <strong style="font-size:1.05em">' + val + '</strong>'
        : '✗ Incorreto.');

  var explHtml = '';
  if (expl) {
    var rawSteps = expl.split(/\\n|\n/).map(function(s){ return s.trim(); }).filter(Boolean);

    if (rawSteps.length <= 1) {
      explHtml = '<div style="margin-top:10px;padding:10px 14px;background:rgba(255,255,255,.85);border-radius:10px;' +
        'border-left:3px solid ' + accentColor + ';font-size:.86rem;line-height:1.65;color:#374151">' +
        '<span style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:' + accentColor + ';display:block;margin-bottom:4px">' +
        (isCorrect ? '💡 Explicação' : '📖 Como resolver') + '</span>' +
        (typeof formatMath==='function'?formatMath(expl):expl) + '</div>';
    } else {
      var id = fbId || ('fb_' + Math.random().toString(36).slice(2,7));
      _stepState[id] = { steps: rawSteps, current: 0, color: accentColor };

      explHtml = '<div style="margin-top:10px;padding:12px 14px;background:rgba(255,255,255,.85);border-radius:10px;' +
        'border-left:3px solid ' + accentColor + '">' +
        '<span style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:' + accentColor + ';display:block;margin-bottom:8px">' +
        '📖 Resolução passo a passo</span>' +
        '<div id="' + id + '-steps"></div>' +
        '<div style="display:flex;gap:.5rem;margin-top:10px;flex-wrap:wrap">' +
        '<button id="' + id + '-stepbtn" onclick="_stepNext(\'' + id + '\')" ' +
          'style="display:inline-flex;align-items:center;gap:6px;background:' + accentColor + ';color:#fff;' +
          'border:none;padding:7px 16px;border-radius:999px;font-family:\'Montserrat\',sans-serif;' +
          'font-size:.78rem;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12)">▶ Próximo passo</button>' +
        '<button id="' + id + '-allbtn" onclick="_stepRenderAll(\'' + id + '\')" ' +
          'style="display:inline-flex;align-items:center;gap:5px;background:transparent;color:' + accentColor + ';' +
          'border:1.5px solid ' + accentColor + ';padding:6px 14px;border-radius:999px;font-family:\'Montserrat\',sans-serif;' +
          'font-size:.75rem;font-weight:600;cursor:pointer">Ver tudo</button>' +
        '</div></div>';

      setTimeout(function(){ _stepRender(id); }, 0);
    }
  }

  var celebrateHtml = isCorrect ? '<div class="fb-confetti" aria-hidden="true"></div>' : '';

  return '<div style="display:flex;align-items:flex-start;gap:12px;padding:14px 18px;' +
    'background:' + bgColor + ';border:2px solid ' + borderColor + ';' +
    'border-radius:14px;position:relative;overflow:hidden;margin-top:1rem">' +
    celebrateHtml +
    '<div style="flex:1">' +
    '<strong style="color:' + color + ';font-size:.95rem;display:block">' + status + '</strong>' +
    explHtml +
    '</div></div>';
}


function calcExpression() {
  var inp = document.getElementById('calc-expr');
  var res = document.getElementById('calc-expr-result');
  if (!inp || !res) return;
  var raw = inp.value.trim();
  if (!raw) { res.textContent = ''; return; }
  try {
    // Normalize: replace − (minus sign) with -, ^ with **
    var expr = raw.replace(/\u2212/g, '-').replace(/\^/g, '**');
    // Safety: only allow digits, operators, parens, spaces, dots
    if (!/^[\d+\-*/().\s^]+$/.test(expr)) throw new Error('Expressão inválida');
    var val = window._mathEval(expr);
    if (!isFinite(val) || isNaN(val)) throw new Error('Resultado indefinido');
    res.innerHTML = '<span style="color:var(--ink3)">' + raw + '</span> = <strong style="color:var(--c2-deep)">' + val + '</strong>';
    res.style.color = 'var(--c2-deep)';
  } catch(e) {
    res.textContent = '⚠ ' + (e.message || 'Expressão inválida');
    res.style.color = 'var(--wrong)';
  }
}

// EVENT LISTENERS
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const calcInp = document.getElementById('calc-expr');
  if (calcInp) calcInp.addEventListener('keydown', e => { if(e.key === 'Enter') calcExpression(); });
  // Reta input enter
  const retaInp = document.getElementById('reta-val');
  if (retaInp) retaInp.addEventListener('keydown', e => { if(e.key === 'Enter') retaAddPoint(); });
  // Flashcards keyboard — Cap 1
  document.addEventListener('keydown', e => {
    const fc = document.getElementById('sec-flashcards');
    if (!fc || !fc.classList.contains('active')) return;
    if (e.key === 'ArrowRight') fcNext();
    else if (e.key === 'ArrowLeft') fcPrev();
    else if (e.key === ' ') { e.preventDefault(); fcFlip(); }
  });
  // Flashcards keyboard — Cap 2
  document.addEventListener('keydown', e => {
    const fc2 = document.getElementById('sec-flashcards2');
    if (!fc2 || !fc2.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fcNext2==='function') fcNext2(); }
    else if (e.key === 'ArrowLeft') { if(typeof fcPrev2==='function') fcPrev2(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fcFlip2==='function') fcFlip2(); }
  });
  // Flashcards keyboard — Cap 3
  document.addEventListener('keydown', e => {
    const fc3 = document.getElementById('sec-flashcards3');
    if (!fc3 || !fc3.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fcNext3==='function') fcNext3(); }
    else if (e.key === 'ArrowLeft') { if(typeof fcPrev3==='function') fcPrev3(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fcFlip3==='function') fcFlip3(); }
  });
  // Flashcards keyboard — Cap 4
  document.addEventListener('keydown', e => {
    const fc4 = document.getElementById('sec-flashcards4');
    if (!fc4 || !fc4.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { if(typeof fc4Next==='function') fc4Next(); }
    else if (e.key === 'ArrowLeft') { if(typeof fc4Prev==='function') fc4Prev(); }
    else if (e.key === ' ') { e.preventDefault(); if(typeof fc4Flip==='function') fc4Flip(); }
  });
});

// ── FICHAS POR SUBTEMA — CAP. 1 ──
function downloadFichaTema(tema) {
  const now = new Date().toLocaleDateString('pt-PT');
  const nomes = {1:'Inteiros (ℤ)',2:'Valor Absoluto e Simétrico',3:'Adição de Inteiros',4:'Subtração e Adição Algébrica',5:'Expressões com Parênteses'};
  const nome = nomes[tema] || 'Tema '+tema;
  const dif = 'medio';
  const { min, max } = lim(dif);
  const tipos = ['fill','mc','fill','mc','fill','vf','fill','mc'];
  const exercicios = [];
  for (let i = 0; i < 8; i++) {
    const ex = buildExercicio(String(tema), tipos[i % tipos.length], min, max, i+1, dif);
    if (ex) exercicios.push(ex);
  }
  let body = `<h1>Ficha · ${nome} · 7.º Ano</h1><div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>`;
  exercicios.forEach((ex, i) => {
    body += `<div class="ex"><p class="ex-num">Exercício ${i+1}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if (ex.tipo === 'mc' && ex.opcoes) {
      ['A','B','C','D'].forEach((l,k) => { if (ex.opcoes[k] !== undefined) body += `<p class="opcao">☐ ${l}) ${ex.opcoes[k]}</p>`; });
    } else if (ex.tipo === 'vf') {
      body += `<p class="opcao">☐ Verdadeiro &nbsp;&nbsp;&nbsp; ☐ Falso</p>`;
    } else {
      body += `<p class="resp-linha">R: ___________________</p>`;
    }
    body += `</div>`;
  });
  body += `<hr style="margin-top:30px"><h2>Soluções</h2><ol>`;
  exercicios.forEach(ex => { body += `<li>${ex.resposta}</li>`; });
  body += `</ol>`;
  const doc = wrapPrintDoc('Ficha '+nome, `<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha de Trabalho<em>Cap. 1 — \${nome}</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div></div>\${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Cap. 1 — \${nome}</span></div>`);
  const blob = new Blob([doc], {type:'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  htmlToPdfDownload(doc, 'cap1_tema'+tema+'.pdf'); return;
}

// ── FICHAS POR SUBTEMA — CAP. 2 ──
function downloadFichaTema2(tema) {
  const now = new Date().toLocaleDateString('pt-PT');
  const nomes2 = {1:'Números Racionais (ℚ)',2:'Comparação e Ordenação',3:'Adição Algébrica de Frações',5:'Percentagens',7:'Potências de Frações',8:'Notação Científica'};
  const nome = nomes2[tema] || 'Tema '+tema;
  const dif = 'facil';
  const tipos = ['mc','mc','vf','mc','fill_frac','mc'];
  const exercicios = tipos.map(t => buildEx2(String(tema), t, dif)).filter(Boolean);
  let body = `<h1>Ficha · ${nome} · 7.º Ano</h1><div class="meta">Nome: __________________________________ | Turma: _____ | Data: ${now}</div>`;
  exercicios.forEach((ex, i) => {
    body += `<div class="ex"><p class="ex-num">Exercício ${i+1}</p><p>${ex.enun.replace(/<[^>]+>/g,'')}</p>`;
    if (ex.tipo === 'mc' && ex.opcoes) {
      ['A','B','C','D'].forEach((l,k) => { if (ex.opcoes[k] !== undefined) body += `<p class="opcao">☐ ${l}) ${ex.opcoes[k]}</p>`; });
    } else if (ex.tipo === 'vf') {
      body += `<p class="opcao">☐ Verdadeiro &nbsp;&nbsp;&nbsp; ☐ Falso</p>`;
    } else {
      body += `<p class="resp-linha">R: ___________________</p>`;
    }
    body += `</div>`;
  });
  body += `<hr style="margin-top:30px"><h2>Soluções</h2><ol>`;
  exercicios.forEach(ex => { body += `<li>${ex.resposta}</li>`; });
  body += `</ol>`;
  const doc = wrapPrintDoc('Ficha '+nome, `<div class="doc-header"><div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div><div class="doc-title">Ficha de Trabalho<em>Cap. 2 — \${nome}</em></div></div><div class="doc-logo">3π</div></div><div class="doc-meta"><div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div><div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div></div>\${body}<div class="doc-footer"><span>3ponto14.pt</span><span>Cap. 2 — \${nome}</span></div>`);
  const blob = new Blob([doc], {type:'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  htmlToPdfDownload(doc, 'cap2_tema'+tema+'.pdf'); return;
}

