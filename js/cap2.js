// CAP. 2 — NÚMEROS RACIONAIS · JavaScript
// Uses chapter-engine.js for generic quiz/exam/flashcard/progress logic

// ── Utilitários (aliases for backward compat) ──
var rnd2=rnd, rndNZ2=rndNZ, fmt2=fmt, shuffle2=shuffle, gcd2=gcd;
function reduceFrac(p,q){if(q===0)return[0,1];var g=gcd2(Math.abs(p),Math.abs(q));var sign=(q<0)?-1:1;return[sign*p/g,sign*q/g];}
function fmtFrac(p,q){var r=reduceFrac(p,q);if(r[1]===1)return String(r[0]);return r[0]+'/'+r[1];}
function fmtFracHTML(p,q){var r=reduceFrac(p,q);if(r[1]===1)return String(r[0]);var neg=r[0]<0;var absP=Math.abs(r[0]);return(neg?'−':'')+'<span class="mfrac"><span class="mfrac-n">'+absP+'</span><span class="mfrac-d">'+r[1]+'</span></span>';}

// ── CONSTRUTOR DE EXERCÍCIOS — Cap 2 (Números Racionais) ──
function buildEx2(tema,tipo,dif){
  tema=String(tema);
  var easy=(dif==='facil'), hard=(dif==='dificil');
  var dens=easy?[2,3,4,5]:[2,3,4,5,6,7,8,10,12];
  function randDen(){return dens[rnd2(0,dens.length-1)];}
  function randFracNZ(){var q=randDen();var p=rndNZ2(-(q*2),q*2);return[p,q];}
  function randFrac(){var q=randDen();var p=rnd2(-(q*2),q*2);return[p,q];}

  // TEMA 1 — Conjuntos de números racionais
  if(tema==='1'){
    var vals=[
      {n:0,  sets:['ℕ','ℤ','ℚ₀⁺','ℤ₀⁺'],  desc:'zero — pertence a ℕ, ℤ, ℚ₀⁺ e ℤ₀⁺, mas NÃO a ℚ⁺ nem ℤ⁺.'},
      {n:1,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-3, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo — pertence a ℤ⁻ e ℚ⁻.'},
      {n:5,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:-7, sets:['ℤ⁻','ℤ','ℚ⁻','ℚ'],         desc:'inteiro negativo.'},
      {n:12, sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
      {n:2,  sets:['ℕ','ℤ','ℚ⁺','ℤ₀⁺','ℚ₀⁺'],  desc:'inteiro positivo e natural.'},
    ];
    var v=vals[rnd2(0,vals.length-1)];
    var allSets=['ℕ','ℤ','ℚ⁺','ℚ⁻','ℤ⁻','ℤ₀⁺','ℚ₀⁺','ℚ'];
    var testSet=allSets[rnd2(0,allSets.length-1)];
    var correct=v.sets.indexOf(testSet)>=0;
    return{tema:'Tema 1',tipo:'vf',
      enun:'Verdadeiro ou Falso: <em>"'+v.n+' ∈ '+testSet+'"</em>',
      resposta:correct?'V':'F',
      expl:'O número '+v.n+' é '+v.desc+'\nPertence a: '+v.sets.join(', ')+'.\nA afirmação "'+v.n+' ∈ '+testSet+'" é '+(correct?'VERDADEIRA':'FALSA')+'.'};
  }

  // TEMA 2 — Comparação de racionais
  if(tema==='2'){
    var variant=rnd2(0,3);
    if(variant===0){
      var f1=randFracNZ(),f2=randFracNZ();
      var v1=f1[0]/f1[1],v2=f2[0]/f2[1];
      var lcm=f1[1]*f2[1]/gcd2(f1[1],f2[1]);
      if(tipo==='mc'){
        var cor=(v1>v2?'>':'<');
        var wrongs=['=',cor==='>'?'<':'>','≤'].filter(function(x){return x!==cor;});
        return{tema:'Tema 2',tipo:'mc',
          enun:'Compara: '+fmtFracHTML(f1[0],f1[1])+' __ '+fmtFracHTML(f2[0],f2[1]),
          opcoes:shuffle2([cor].concat(wrongs.slice(0,3))),resposta:cor,
          expl:'Reduz ao mesmo denominador (mmc='+lcm+').\n'+fmtFrac(f1[0],f1[1])+' = '+fmtFrac(f1[0]*(lcm/f1[1]),lcm)+', '+fmtFrac(f2[0],f2[1])+' = '+fmtFrac(f2[0]*(lcm/f2[1]),lcm)+'.\n'+f1[0]*(lcm/f1[1])+' '+(v1>v2?'>':'<')+' '+f2[0]*(lcm/f2[1])+', portanto '+fmtFrac(f1[0],f1[1])+' '+cor+' '+fmtFrac(f2[0],f2[1])+'.'};
      }
      return{tema:'Tema 2',tipo:'vf',
        enun:'Verdadeiro ou Falso: <em>"'+fmtFracHTML(f1[0],f1[1])+' &lt; '+fmtFracHTML(f2[0],f2[1])+'"</em>',
        resposta:v1<v2?'V':'F',
        expl:'Reduz ao mesmo denominador (mmc='+lcm+').\n'+fmtFrac(f1[0],f1[1])+' = '+fmtFrac(f1[0]*(lcm/f1[1]),lcm)+' e '+fmtFrac(f2[0],f2[1])+' = '+fmtFrac(f2[0]*(lcm/f2[1]),lcm)+'.\n'+fmtFrac(f1[0],f1[1])+' '+(v1<v2?'<':'>')+' '+fmtFrac(f2[0],f2[1])+' → afirmação '+(v1<v2?'VERDADEIRA':'FALSA')+'.'};
    }
    if(variant===1){
      var fs=[randFracNZ(),randFracNZ(),randFracNZ()];
      var sorted=fs.slice().sort(function(a,b){return a[0]/a[1]-b[0]/b[1];});
      var correctStr=sorted.map(function(f){return fmtFrac(f[0],f[1]);}).join(' < ');
      var opts2=shuffle2([
        correctStr,
        fs.slice().reverse().map(function(f){return fmtFrac(f[0],f[1]);}).join(' < '),
        shuffle2(fs.slice()).map(function(f){return fmtFrac(f[0],f[1]);}).join(' < '),
        [sorted[1],sorted[2],sorted[0]].map(function(f){return fmtFrac(f[0],f[1]);}).join(' < ')
      ].filter(function(v,i,a){return a.indexOf(v)===i;})).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:'Ordena por ordem crescente: '+fs.map(function(f){return fmtFracHTML(f[0],f[1]);}).join(', '),
        opcoes:opts2,resposta:correctStr,
        expl:'Converte cada fração para decimal.\n'+fs.map(function(f){return fmtFrac(f[0],f[1])+' = '+(f[0]/f[1]).toFixed(3);}).join(', ')+'.\nOrdem crescente: '+correctStr+'.'};
    }
    if(variant===2){
      var a2=rnd2(-4,3),b2=a2+rnd2(2,4);
      var mid=a2+1;
      var opts3=shuffle2([String(mid),String(a2-1),String(b2+1),String(a2*2)].filter(function(v,i,a){return a.indexOf(v)===i;})).slice(0,4);
      return{tema:'Tema 2',tipo:'mc',
        enun:'Qual inteiro está entre '+a2+' e '+b2+'?',
        opcoes:opts3,resposta:String(mid),
        expl:'Entre '+a2+' e '+b2+' encontram-se os inteiros: '+Array.from({length:b2-a2-1},function(_,i){return a2+i+1;}).join(', ')+'.\nUm deles é '+mid+'.'};
    }
    var g1=randFracNZ(),g2=randFracNZ();
    var gv1=g1[0]/g1[1],gv2=g2[0]/g2[1];
    return{tema:'Tema 2',tipo:'vf',
      enun:'V/F: <em>"'+fmtFracHTML(g1[0],g1[1])+' > '+fmtFracHTML(g2[0],g2[1])+'"</em>',
      resposta:gv1>gv2?'V':'F',
      expl:fmtFrac(g1[0],g1[1])+' = '+gv1.toFixed(3)+' e '+fmtFrac(g2[0],g2[1])+' = '+gv2.toFixed(3)+'.\n'+fmtFrac(g1[0],g1[1])+' '+(gv1>gv2?'>':'<')+' '+fmtFrac(g2[0],g2[1])+' → afirmação '+(gv1>gv2?'VERDADEIRA':'FALSA')+'.'};
  }

  // TEMA 3 — Adição e subtração de racionais
  if(tema==='3'){
    // dificil: números mistos (número inteiro + fração)
    if(hard && Math.random()<0.5){
      var t3mi1=rnd2(1,3), t3mn1=rnd2(1,4), t3md1=rnd2(2,6);
      var t3mi2=rnd2(1,3), t3mn2=rnd2(1,4), t3md2=rnd2(2,6);
      // Convert to improper fractions: (int*den + num)/den
      var t3ip=t3mi1*t3md1+t3mn1, t3iq=t3md1;
      var t3jp=t3mi2*t3md2+t3mn2, t3jq=t3md2;
      var t3lcmM=t3iq*t3jq/gcd2(t3iq,t3jq);
      var t3rp=t3ip*(t3lcmM/t3iq)+t3jp*(t3lcmM/t3jq);
      var t3rr=reduceFrac(t3rp,t3lcmM);
      var t3enun=t3mi1+' '+fmtFracHTML(t3mn1,t3md1)+' + '+t3mi2+' '+fmtFracHTML(t3mn2,t3md2)+' = ?';
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:'Calcula (números mistos): '+t3enun+'<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>',
          resposta:fmtFrac(t3rr[0],t3rr[1]),
          expl:'Converte para frações impróprias:\n'+t3mi1+' '+fmtFrac(t3mn1,t3md1)+' = '+fmtFrac(t3ip,t3iq)+'\n'+t3mi2+' '+fmtFrac(t3mn2,t3md2)+' = '+fmtFrac(t3jp,t3jq)+'\nReduz ao mmc ('+t3lcmM+') e soma: '+fmtFrac(t3rr[0],t3rr[1])+'.'};
      }
      var t3mw1=fmtFrac(t3rr[0]+1,t3rr[1]),t3mw2=fmtFrac(t3rr[0]-1,t3rr[1]),t3mw3=fmtFrac(t3mi1+t3mi2,1);
      return{tema:'Tema 3',tipo:'mc',
        enun:'Calcula (números mistos): '+t3enun,
        opcoes:shuffle2([fmtFrac(t3rr[0],t3rr[1]),t3mw1,t3mw2,t3mw3]),resposta:fmtFrac(t3rr[0],t3rr[1]),
        expl:'Converte para frações impróprias e soma com mmc('+t3iq+','+t3jq+') = '+t3lcmM+'.\nResultado: '+fmtFrac(t3rr[0],t3rr[1])+'.'};
    }
    var t3a=randFracNZ(),t3b=randFracNZ();
    var t3lcm=t3a[1]*t3b[1]/gcd2(t3a[1],t3b[1]);
    var t3v=rnd2(0,3);
    if(t3v===0){
      var rp=(t3a[0]*(t3lcm/t3a[1]))+(t3b[0]*(t3lcm/t3b[1]));
      var res=reduceFrac(rp,t3lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:'Calcula: '+fmtFracHTML(t3a[0],t3a[1])+' + ('+fmtFracHTML(t3b[0],t3b[1])+') = ?<br><small style="color:var(--ink4)">Escreve como p/q (ex: 3/4) ou inteiro</small>',
          resposta:fmtFrac(res[0],res[1]),
          expl:'Reduz ao mesmo denominador: mmc('+t3a[1]+','+t3b[1]+') = '+t3lcm+'.\n'+fmtFrac(t3a[0],t3a[1])+' = '+fmtFrac(t3a[0]*(t3lcm/t3a[1]),t3lcm)+', '+fmtFrac(t3b[0],t3b[1])+' = '+fmtFrac(t3b[0]*(t3lcm/t3b[1]),t3lcm)+'.\n'+fmtFrac(t3a[0]*(t3lcm/t3a[1]),t3lcm)+' + ('+fmtFrac(t3b[0]*(t3lcm/t3b[1]),t3lcm)+') = '+fmtFrac(rp,t3lcm)+' = '+fmtFrac(res[0],res[1])+'.'};
      }
      var w1=fmtFrac(res[0]+1,res[1]),w2=fmtFrac(res[0]-1,res[1]),w3=fmtFrac(t3a[0]+t3b[0],t3a[1]+t3b[1]);
      return{tema:'Tema 3',tipo:'mc',
        enun:'Calcula: '+fmtFracHTML(t3a[0],t3a[1])+' + ('+fmtFracHTML(t3b[0],t3b[1])+') = ?',
        opcoes:shuffle2([fmtFrac(res[0],res[1]),w1,w2,w3]),resposta:fmtFrac(res[0],res[1]),
        expl:'mmc('+t3a[1]+','+t3b[1]+') = '+t3lcm+'.\nSoma dos numeradores: '+(t3a[0]*(t3lcm/t3a[1]))+' + '+(t3b[0]*(t3lcm/t3b[1]))+' = '+rp+'.\nResultado simplificado: '+fmtFrac(res[0],res[1])+'.'};
    }
    if(t3v===1){
      var rp2=(t3a[0]*(t3lcm/t3a[1]))-(t3b[0]*(t3lcm/t3b[1]));
      var res2=reduceFrac(rp2,t3lcm);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 3',tipo:'fill_frac',
          enun:'Calcula: '+fmtFracHTML(t3a[0],t3a[1])+' − ('+fmtFracHTML(t3b[0],t3b[1])+') = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>',
          resposta:fmtFrac(res2[0],res2[1]),
          expl:'mmc('+t3a[1]+','+t3b[1]+') = '+t3lcm+'.\nSubtração dos numeradores: '+(t3a[0]*(t3lcm/t3a[1]))+' − '+(t3b[0]*(t3lcm/t3b[1]))+' = '+rp2+'.\nResultado: '+fmtFrac(res2[0],res2[1])+'.'};
      }
      var sw1=fmtFrac(res2[0]+1,res2[1]),sw2=fmtFrac(res2[0]-1,res2[1]),sw3=fmtFrac(t3a[0]-t3b[0],t3a[1]);
      return{tema:'Tema 3',tipo:'mc',
        enun:'Calcula: '+fmtFracHTML(t3a[0],t3a[1])+' − ('+fmtFracHTML(t3b[0],t3b[1])+') = ?',
        opcoes:shuffle2([fmtFrac(res2[0],res2[1]),sw1,sw2,sw3]),resposta:fmtFrac(res2[0],res2[1]),
        expl:'mmc('+t3a[1]+','+t3b[1]+') = '+t3lcm+'.\n'+fmtFrac(t3a[0]*(t3lcm/t3a[1]),t3lcm)+' − '+fmtFrac(t3b[0]*(t3lcm/t3b[1]),t3lcm)+' = '+fmtFrac(rp2,t3lcm)+' = '+fmtFrac(res2[0],res2[1])+'.'};
    }
    if(t3v===2){
      var g3=rnd2(2,6),num2=rnd2(1,5)*g3,den2=rnd2(1,5)*g3;
      var sR=reduceFrac(num2,den2);
      return{tema:'Tema 3',tipo:'mc',
        enun:'Simplifica a fração: '+fmtFracHTML(num2,den2)+' = ?',
        opcoes:shuffle2([fmtFrac(sR[0],sR[1]),fmtFrac(num2-1,den2),fmtFrac(num2,den2-1),fmtFrac(num2/g3+1,den2/g3)]),resposta:fmtFrac(sR[0],sR[1]),
        expl:'Encontra o MDC('+num2+','+den2+') = '+g3+'.\nDivide numerador e denominador por '+g3+'.\n'+num2+'÷'+g3+' = '+sR[0]+', '+den2+'÷'+g3+' = '+sR[1]+'.\nFração irredutível: '+fmtFrac(sR[0],sR[1])+'.'};
    }
    var q3=dens[rnd2(0,dens.length-1)],p3=rnd2(1,q3-1);
    var mult=rnd2(2,4);
    var eqcor=fmtFrac(p3*mult,q3*mult);
    return{tema:'Tema 3',tipo:'mc',
      enun:'Qual destas frações é equivalente a '+fmtFracHTML(p3,q3)+'?',
      opcoes:shuffle2([eqcor,fmtFrac(p3*mult+1,q3*mult),fmtFrac(p3+1,q3*mult),fmtFrac(p3*mult,q3*mult+1)]),
      resposta:eqcor,
      expl:'Multiplica numerador e denominador pelo mesmo número.\n'+fmtFrac(p3,q3)+' = '+fmtFrac(p3,q3)+' × '+fmtFrac(mult,mult)+' = '+fmtFrac(p3*mult,q3*mult)+'.\nPortanto '+eqcor+' é equivalente a '+fmtFrac(p3,q3)+'.'};
  }

  // TEMA 4 — Multiplicação e Divisão de Racionais
  if(tema==='4'){
    var t4a=randFracNZ(), t4b=randFracNZ();
    var t4v=rnd2(0,2);
    if(t4v===0){
      // facil: fração × inteiro
      var t4int=rndNZ2(2,8);
      var t4p=t4a[0]*t4int, t4q=t4a[1];
      var t4r=reduceFrac(t4p,t4q);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 4',tipo:'fill_frac',
          enun:'Calcula: '+fmtFracHTML(t4a[0],t4a[1])+' × '+t4int+' = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>',
          resposta:fmtFrac(t4r[0],t4r[1]),
          expl:'Multiplica o numerador pelo inteiro: '+t4a[0]+' × '+t4int+' = '+t4p+'.\nResultado: '+fmtFrac(t4p,t4q)+' = '+fmtFrac(t4r[0],t4r[1])+'.'};
      }
      var t4w1=fmtFrac(t4r[0]+1,t4r[1]),t4w2=fmtFrac(t4a[0],t4a[1]*t4int),t4w3=fmtFrac(t4r[0]-1,t4r[1]<2?2:t4r[1]);
      return{tema:'Tema 4',tipo:'mc',
        enun:'Calcula: '+fmtFracHTML(t4a[0],t4a[1])+' × '+t4int+' = ?',
        opcoes:shuffle2([fmtFrac(t4r[0],t4r[1]),t4w1,t4w2,t4w3]),resposta:fmtFrac(t4r[0],t4r[1]),
        expl:fmtFrac(t4a[0],t4a[1])+' × '+t4int+' = '+fmtFrac(t4p,t4q)+' = '+fmtFrac(t4r[0],t4r[1])+'.'};
    }
    if(t4v===1){
      // medio: fração × fração
      var t4mp=t4a[0]*t4b[0], t4mq=t4a[1]*t4b[1];
      var t4mr=reduceFrac(t4mp,t4mq);
      if(tipo==='fill'||tipo==='fill_frac'){
        return{tema:'Tema 4',tipo:'fill_frac',
          enun:'Calcula: '+fmtFracHTML(t4a[0],t4a[1])+' × ('+fmtFracHTML(t4b[0],t4b[1])+') = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>',
          resposta:fmtFrac(t4mr[0],t4mr[1]),
          expl:'Multiplica numeradores entre si e denominadores entre si.\n('+t4a[0]+'×'+t4b[0]+')/('+t4a[1]+'×'+t4b[1]+') = '+t4mp+'/'+t4mq+' = '+fmtFrac(t4mr[0],t4mr[1])+'.'};
      }
      var t4mw1=fmtFrac(t4a[0]+t4b[0],t4a[1]+t4b[1]),t4mw2=fmtFrac(t4mp+1,t4mq),t4mw3=fmtFrac(t4mr[0],t4mr[1]+1);
      return{tema:'Tema 4',tipo:'mc',
        enun:'Calcula: '+fmtFracHTML(t4a[0],t4a[1])+' × ('+fmtFracHTML(t4b[0],t4b[1])+') = ?',
        opcoes:shuffle2([fmtFrac(t4mr[0],t4mr[1]),t4mw1,t4mw2,t4mw3]),resposta:fmtFrac(t4mr[0],t4mr[1]),
        expl:'Numerador: '+t4a[0]+'×'+t4b[0]+' = '+t4mp+'. Denominador: '+t4a[1]+'×'+t4b[1]+' = '+t4mq+'.\nSimplificado: '+fmtFrac(t4mr[0],t4mr[1])+'.'};
    }
    // dificil: (a/b × c/d) ÷ (e/f) = a/b × c/d × f/e
    var t4da=randFracNZ(),t4db=randFracNZ(),t4dc=randFracNZ();
    var t4dp=t4da[0]*t4db[0]*t4dc[1];
    var t4dq=t4da[1]*t4db[1]*t4dc[0];
    var t4dr=reduceFrac(t4dp,t4dq);
    if(tipo==='fill'||tipo==='fill_frac'){
      return{tema:'Tema 4',tipo:'fill_frac',
        enun:'Calcula: ('+fmtFracHTML(t4da[0],t4da[1])+' × '+fmtFracHTML(t4db[0],t4db[1])+') ÷ '+fmtFracHTML(t4dc[0],t4dc[1])+' = ?<br><small style="color:var(--ink4)">Escreve como p/q ou inteiro</small>',
        resposta:fmtFrac(t4dr[0],t4dr[1]),
        expl:'Divisão por fração = multiplicar pelo inverso.\n= '+fmtFrac(t4da[0],t4da[1])+' × '+fmtFrac(t4db[0],t4db[1])+' × '+fmtFrac(t4dc[1],t4dc[0])+'\n= '+fmtFrac(t4dp,t4dq)+' = '+fmtFrac(t4dr[0],t4dr[1])+'.'};
    }
    var t4dw1=fmtFrac(t4dr[0]+1,t4dr[1]),t4dw2=fmtFrac(t4dr[0],t4dr[1]+1),t4dw3=fmtFrac(t4da[0]*t4db[0]*t4dc[0],t4da[1]*t4db[1]*t4dc[1]);
    return{tema:'Tema 4',tipo:'mc',
      enun:'Calcula: ('+fmtFracHTML(t4da[0],t4da[1])+' × '+fmtFracHTML(t4db[0],t4db[1])+') ÷ '+fmtFracHTML(t4dc[0],t4dc[1])+' = ?',
      opcoes:shuffle2([fmtFrac(t4dr[0],t4dr[1]),t4dw1,t4dw2,t4dw3]),resposta:fmtFrac(t4dr[0],t4dr[1]),
      expl:'Divisão = multiplicar pelo inverso: ÷'+fmtFrac(t4dc[0],t4dc[1])+' = ×'+fmtFrac(t4dc[1],t4dc[0])+'.\nResultado: '+fmtFrac(t4dr[0],t4dr[1])+'.'};
  }

  // TEMA 5 — Percentagens
  if(tema==='5'){
    var pcts=easy?[10,20,25,50,75]:[5,10,12,15,20,25,30,40,50,60,75,80];
    var p5=pcts[rnd2(0,pcts.length-1)];
    var bases=easy?[20,40,50,60,80,100,120,200]:[25,35,55,65,75,120,250,350,480];
    var base5=bases[rnd2(0,bases.length-1)];
    var res5=base5*p5/100;
    var v5=rnd2(0,3);
    if(v5===0){
      if(tipo==='mc'){
        var pw=shuffle2([res5+base5*0.1,res5-base5*0.1,res5*2,base5-res5].filter(function(w){return w!==res5&&w>0;})).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:'Calcula: '+p5+'% de '+base5+' = ?',
          opcoes:shuffle2([res5].concat(pw)),resposta:res5,
          expl:p5+'% significa '+p5+' por cada 100.\n'+p5+'% de '+base5+' = '+fmtFrac(p5,100)+' × '+base5+' = '+p5*base5/100+' = '+res5+'.'};
      }
      return{tema:'Tema 5',tipo:'fill',
        enun:'Calcula: '+p5+'% de '+base5+' = ?',resposta:res5,
        expl:p5+'% de '+base5+' = '+p5+'/100 × '+base5+' = '+p5*base5/100+' = '+res5+'.'};
    }
    if(v5===1){
      var popts=shuffle2([p5+5,p5-5,p5*2].filter(function(v){return v>0&&v<=100&&v!==p5;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:res5+' é __% de '+base5+'?',
        opcoes:shuffle2([p5].concat(popts)),resposta:p5,
        expl:'Para encontrar a percentagem: ('+res5+' ÷ '+base5+') × 100.\n'+res5+' ÷ '+base5+' = '+(res5/base5).toFixed(4)+'.\n× 100 = '+p5+'%.'};
    }
    if(v5===2){
      var topts=shuffle2([base5+20,base5-20,base5*2].filter(function(v){return v>0&&v!==base5;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:p5+'% de um número é '+res5+'. Qual é esse número?',
        opcoes:shuffle2([base5].concat(topts)),resposta:base5,
        expl:'Se '+p5+'% de x = '+res5+', então:\nx = '+res5+' × 100 ÷ '+p5+' = '+res5*100+' ÷ '+p5+' = '+base5+'.'};
    }
    var items=['bilhete','produto','livro','computador','televisão'];
    var item=items[rnd2(0,items.length-1)];
    var discVal=base5*p5/100;
    var finalP=base5-discVal;
    var dopts=shuffle2([base5+discVal,discVal,base5].filter(function(v){return v!==finalP;})).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:'Um '+item+' custa '+base5+' €. Tem um desconto de '+p5+'%. Qual o preço final?',
      opcoes:shuffle2([finalP].concat(dopts)),resposta:finalP,
      expl:'Passo 1: calcula o desconto.\n'+p5+'% de '+base5+' = '+fmtFrac(p5,100)+' × '+base5+' = '+discVal+' €.\nPasso 2: subtrai ao preço original.\n'+base5+' − '+discVal+' = '+finalP+' €.'};
  }

  // TEMA 7 — Potências
  if(tema==='7'){
    var bases7=easy?[2,3,5,10]:[2,3,5,7,10];
    var base7=bases7[rnd2(0,bases7.length-1)];
    var v7=rnd2(0,4);
    if(v7===0){
      var exp1=rnd2(1,easy?4:6),exp2=rnd2(1,easy?3:5);
      var rsum=exp1+exp2;
      return{tema:'Tema 7',tipo:'mc',
        enun:'Simplifica: '+base7+'^'+exp1+' × '+base7+'^'+exp2+' = '+base7+'^?',
        opcoes:shuffle2([rsum,rsum+1,rsum-1,exp1*exp2]).slice(0,4),resposta:rsum,
        expl:'Regra: mesma base → soma os expoentes.\n'+base7+'^'+exp1+' × '+base7+'^'+exp2+' = '+base7+'^('+exp1+'+'+exp2+') = '+base7+'^'+rsum+'.'};
    }
    if(v7===1){
      var e1=rnd2(2,easy?4:6),bigExp=e1+rnd2(1,3),rdif=bigExp-e1;
      return{tema:'Tema 7',tipo:'mc',
        enun:'Simplifica: '+base7+'^'+bigExp+' ÷ '+base7+'^'+e1+' = '+base7+'^?',
        opcoes:shuffle2([rdif,rdif+1,rdif-1,bigExp+e1]).slice(0,4),resposta:rdif,
        expl:'Regra: mesma base → subtrai os expoentes.\n'+base7+'^'+bigExp+' ÷ '+base7+'^'+e1+' = '+base7+'^('+bigExp+'−'+e1+') = '+base7+'^'+rdif+'.'};
    }
    if(v7===2){
      var fn=rnd2(1,4),fd=rnd2(2,5),fe=rnd2(2,3);
      var fcor=Math.pow(fn,fe)+'/'+Math.pow(fd,fe);
      return{tema:'Tema 7',tipo:'mc',
        enun:'Calcula: ('+fmtFracHTML(fn,fd)+')^'+fe+' = ?',
        opcoes:shuffle2([fcor,fn*fe+'/'+fd*fe,Math.pow(fn,fe)+'/'+fd,fn+'/'+Math.pow(fd,fe)]).slice(0,4),
        resposta:fcor,
        expl:'Regra: (a/b)^n = a^n / b^n.\n('+fn+'/'+fd+')^'+fe+' = '+fn+'^'+fe+' / '+fd+'^'+fe+' = '+Math.pow(fn,fe)+' / '+Math.pow(fd,fe)+' = '+fcor+'.'};
    }
    if(v7===3){
      var exp3=rnd2(2,easy?3:4);
      var val7=Math.pow(base7,exp3);
      var vw=shuffle2([val7+base7,val7-base7,val7*base7,base7*exp3].filter(function(w){return w!==val7;})).slice(0,3);
      return{tema:'Tema 7',tipo:'mc',
        enun:'Calcula: '+base7+'^'+exp3+' = ?',
        opcoes:shuffle2([val7].concat(vw)),resposta:val7,
        expl:base7+'^'+exp3+' significa '+Array.from({length:exp3},function(){return base7;}).join(' × ')+'.\n= '+val7+'.'};
    }
    return{tema:'Tema 7',tipo:'vf',
      enun:'V/F: <em>"Qualquer número (≠0) elevado a 0 é igual a 1: '+base7+'^0 = 1"</em>',
      resposta:'V',
      expl:'Afirmação verdadeira.\nRegra: a^0 = 1 para qualquer a ≠ 0.\n'+base7+'^0 = 1.\nJustificação: '+base7+'^n ÷ '+base7+'^n = '+base7+'^(n-n) = '+base7+'^0 = 1.'};
  }

  // TEMA 8 — Notação científica
  if(tema==='8'){
    var mantissas=easy?[1.5,2.3,4.5,1.8,3.7,2.0,5.1]:[1.23,2.56,3.14,4.87,6.02,9.1,7.5,1.08];
    var exps=easy?[3,4,5,6]:[2,3,4,5,6,7,8];
    var mant=mantissas[rnd2(0,mantissas.length-1)];
    var exp8=exps[rnd2(0,exps.length-1)];
    var num8=mant*Math.pow(10,exp8);
    var v8=rnd2(0,2);
    if(v8===0){
      var nc=mant+' × 10^'+exp8;
      var nw=[mant*10+' × 10^'+(exp8-1),mant+' × 10^'+(exp8+1),mant/10+' × 10^'+exp8].filter(function(w){return w!==nc;});
      return{tema:'Tema 8',tipo:'mc',
        enun:'Escreve em notação científica: '+num8.toLocaleString('pt-PT')+' = ?',
        opcoes:shuffle2([nc].concat(nw.slice(0,3))),resposta:nc,
        expl:'Notação científica: a × 10^n onde 1 ≤ a < 10.\n'+num8+' → move a vírgula '+exp8+' '+(exp8===1?'casa':'casas')+' para a esquerda.\nResultado: '+mant+' × 10^'+exp8+'.'};
    }
    if(v8===1){
      var numStr=num8.toLocaleString('pt-PT');
      var nw1=(mant*Math.pow(10,exp8+1)).toLocaleString('pt-PT');
      var nw2=(mant*Math.pow(10,exp8-1)).toLocaleString('pt-PT');
      return{tema:'Tema 8',tipo:'mc',
        enun:'Converte para número inteiro: '+mant+' × 10^'+exp8+' = ?',
        opcoes:shuffle2([numStr,nw1,nw2,String(mant*10)]),resposta:numStr,
        expl:mant+' × 10^'+exp8+' = '+mant+' × '+Math.pow(10,exp8).toLocaleString('pt-PT')+' = '+numStr+'.\n(Move a vírgula '+exp8+' casas para a direita.)'};
    }
    var exp82=exps[rnd2(0,exps.length-1)];
    var mant2=mantissas[rnd2(0,mantissas.length-1)];
    var cval1=mant*Math.pow(10,exp8),cval2=mant2*Math.pow(10,exp82);
    var correctOp=cval1>cval2?'>':'<';
    return{tema:'Tema 8',tipo:'mc',
      enun:'Compara: '+mant+' × 10^'+exp8+' __ '+mant2+' × 10^'+exp82,
      opcoes:shuffle2(['>','<','=','≥']),resposta:correctOp,
      expl:'Compara primeiro os expoentes.\n'+exp8+' '+(exp8>exp82?'>':exp8<exp82?'<':'=')+' '+exp82+(exp8===exp82?' → compara mantissas: '+mant+' '+(mant>mant2?'>':'<')+' '+mant2:'')+'.\nPortanto '+mant+'×10^'+exp8+' '+correctOp+' '+mant2+'×10^'+exp82+'.'};
  }

  // TEMA 9 — Operações em notação científica
  if(tema==='9'){
    var v9=rnd2(0,2);
    if(v9===0){
      var m1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      var m2_9=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      var e1b=rnd2(2,6);
      var sumMant=parseFloat((m1+m2_9).toFixed(2));
      var finalMant=sumMant,finalExp=e1b;
      if(finalMant>=10){finalMant=parseFloat((finalMant/10).toFixed(3));finalExp++;}
      var sc=''+finalMant+' × 10^'+finalExp;
      var sw9=[''+sumMant+' × 10^'+(e1b-1),''+sumMant+' × 10^'+(e1b+1),''+parseFloat((m1*m2_9).toFixed(2))+' × 10^'+(e1b*2)];
      return{tema:'Tema 9',tipo:'mc',
        enun:'Calcula: ('+m1+' × 10^'+e1b+') + ('+m2_9+' × 10^'+e1b+') = ?',
        opcoes:shuffle2([sc].concat(sw9.slice(0,3))),resposta:sc,
        expl:'Mesmo expoente → soma apenas as mantissas.\n'+m1+' + '+m2_9+' = '+sumMant+'.\n'+(sumMant>=10?sumMant+' ≥ 10, normaliza: '+sumMant+'/10 × 10^'+(e1b+1)+' = '+finalMant+' × 10^'+finalExp+'.':'Resultado: '+sc+'.')};
    }
    if(v9===1){
      var mm1=parseFloat((rnd2(1,9)+(rnd2(0,9)/10)).toFixed(1));
      var mm2=parseFloat((rnd2(1,4)+(rnd2(0,9)/10)).toFixed(1));
      var me1=rnd2(2,5),me2=rnd2(2,4);
      var resMant=parseFloat((mm1*mm2).toFixed(3));
      var fM=resMant,fE=me1+me2;
      if(fM>=10){fM=parseFloat((fM/10).toFixed(3));fE++;}
      var mc9=''+fM+' × 10^'+fE;
      return{tema:'Tema 9',tipo:'mc',
        enun:'Calcula: ('+mm1+' × 10^'+me1+') × ('+mm2+' × 10^'+me2+') = ?',
        opcoes:shuffle2([mc9,''+parseFloat((mm1+mm2).toFixed(1))+' × 10^'+(me1+me2),''+fM+' × 10^'+(me1*me2),''+mm1*mm2+' × 10^'+(me1-me2)]).slice(0,4),
        resposta:mc9,
        expl:'Multiplica mantissas e soma expoentes.\n'+mm1+' × '+mm2+' = '+resMant+'.\n10^'+me1+' × 10^'+me2+' = 10^'+(me1+me2)+'.\n'+(resMant>=10?'Normaliza: '+resMant+'/10 × 10^'+(me1+me2+1)+' = '+fM+' × 10^'+fE+'.':'Resultado: '+mc9+'.')};
    }
    var oes=[rnd2(2,4),rnd2(5,7),rnd2(8,10)];
    var oms=[parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1)),parseFloat((rnd2(1,9)/10+1).toFixed(1))];
    var onums=oes.map(function(e,i){return ''+oms[i]+' × 10^'+e;});
    var osorted=onums.slice().sort(function(a,b){var pa=a.split(' × 10^');var pb=b.split(' × 10^');return(parseFloat(pa[0])*Math.pow(10,parseInt(pa[1])))-(parseFloat(pb[0])*Math.pow(10,parseInt(pb[1])));});
    return{tema:'Tema 9',tipo:'mc',
      enun:'Qual destas é a MAIOR? '+onums.join(', '),
      opcoes:shuffle2(onums),resposta:osorted[osorted.length-1],
      expl:'Compara os expoentes:\n'+oes.join(', ')+' → maior expoente = '+Math.max.apply(null,oes)+'.\nO maior número é '+osorted[osorted.length-1]+'.'};
  }

  return buildEx2('3','mc',dif);
}

// ── FLASHCARDS data ──
var FC2_CARDS=[
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

// REGISTER WITH CHAPTER ENGINE
window.CAP_DATA = window.CAP_DATA || {};
window.CAP_DATA[2] = {
  prefix: '2',
  storageKey: 'edupt_cap2',
  viewId: 'view-math2',
  tabsId: 'tabs2',
  temas: ['T1 · Racionais', 'T2 · Comparação', 'T3 · Adição', 'T5 · Percentagens', 'T7 · Potências', 'T8 · Not. Científica', 'T9 · Operações N.C.'],
  flashcards: FC2_CARDS,
  buildExercicio: function(tema, tipo, dif) {
    return buildEx2(tema, tipo, dif);
  },
  questoesPlans: {
    facil:   { temas: ['1','1','1','2','2','2','2','3','3','3','5','5','5','7','7','7','8','8','9','9'],
               tipos: ['vf','mc','mc','mc','mc','fill_frac','mc','mc','mc','fill_frac','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc'] },
    medio:   { temas: ['1','1','2','2','3','3','3','5','5','5','7','7','7','8','8','8','9','9','9','9'],
               tipos: ['vf','mc','mc','fill_frac','mc','fill_frac','mc','mc','fill','mc','mc','mc','fill','mc','mc','mc','mc','mc','mc','mc'] },
    dificil: { temas: ['1','1','2','2','2','3','3','3','5','5','5','5','7','7','7','8','8','9','9','9'],
               tipos: ['vf','mc','mc','vf','fill_frac','fill_frac','fill_frac','mc','mc','fill','mc','fill','mc','mc','mc','mc','mc','mc','mc','mc'] }
  },
  miniPlans: (function(){
    var p = {};
    p[0] = [
      {t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},
      {t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill_frac'},{t:'2',tipo:'mc'},
      {t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'mc'},
      {t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},
      {t:'7',tipo:'mc'},{t:'7',tipo:'mc'},
      {t:'8',tipo:'mc'},{t:'8',tipo:'mc'},
      {t:'9',tipo:'mc'},{t:'9',tipo:'mc'}
    ];
    var temaMap = {1:'1',2:'2',3:'3',4:'3',5:'5',6:'5',7:'7',8:'8',9:'9'};
    var tipos = ['mc','mc','fill_frac','vf','mc','fill','mc','mc','vf','fill_frac','mc','mc','mc','vf','mc','mc','fill','mc','vf','mc'];
    for (var i = 1; i <= 9; i++) {
      var t = temaMap[i] || '1';
      p[i] = tipos.map(function(tp){ return {t:t, tipo:tp}; });
    }
    return p;
  })(),
  testePlans: (function(){
    var p = {};
    p.subtema0 = {
      facil:   [{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'7',tipo:'mc'}],
      medio:   [{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'}],
      dificil: [{t:'1',tipo:'vf'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill_frac'},{t:'3',tipo:'fill_frac'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'7',tipo:'mc'},{t:'7',tipo:'mc'},{t:'8',tipo:'mc'},{t:'9',tipo:'mc'},{t:'9',tipo:'mc'}]
    };
    var tipos = ['mc','mc','vf','mc','fill_frac','mc'];
    for (var i = 1; i <= 9; i++) {
      var t = String(i);
      p['subtema'+i] = tipos.map(function(tp){ return {t:t, tipo:tp}; });
    }
    return p;
  })()
};

// DELEGATION WRAPPERS — auto-generated + cap2-specific extras
_capRegisterWrappers(2, {
  setTeste2Subtema: function(n,btn){capSetTesteSubtema(2,n,btn)},
  gerarTeste2: function(){capGerarTeste(2)},
  setGenLevel2: function(btn){capSetGenLevel(2,btn)},
  exame2Submit: function(){examActive=false},
});

// UNIQUE CAP2 FEATURES (games, subtemas)

// ── Triângulo Harmónico ──
var TRIANGULO_LINES=[
  ['1'],
  ['1/2','1/2'],
  ['1/3','1/6','1/3'],
  ['1/4','1/12','1/12','1/4'],
  ['1/5','1/20','1/30','1/20','1/5'],
  ['1/6','1/30','1/60','1/60','1/30','1/6'],
  ['1/7','1/42','1/105','1/140','1/105','1/42','1/7'],
];
var _trianguloRevealed=false;

// SUBTEMA — PRÁTICA FOCADA (Cap2)
var _cap2SubtemaTitulos = {
  '1:conjuntos':'Conjuntos ℕ, ℤ, ℚ', '1:arredondamento':'Arredondamento', '1:aprox':'Valores Aproximados',
  '2:comparar':'Comparar Frações', '2:ordenar':'Ordenar Racionais', '2:absoluto':'Valor Absoluto em ℚ',
  '3:somar_frac':'Somar Frações', '3:subtrair_frac':'Subtrair Frações', '3:expressoes':'Expressões com Frações', '3:contexto_rac':'Partes de um Todo',
  '5:converter':'Converter Fração/Decimal/%', '5:calcular_pct':'Calcular % de N', '5:aumento':'Aumentos Percentuais', '5:desconto':'Descontos', '5:variacao':'Taxa de Variação',
  '7:produto':'Produto de Potências', '7:quociente':'Quociente de Potências', '7:frac_pot':'Potência de Fração',
  '8:escrever':'Escrever em Notação Científica', '8:pot_base10':'Potências de Base 10',
  '9:somar_nc':'Somar/Subtrair em Not. Científica', '9:mult_nc':'Multiplicar/Dividir em Not. Científica', '9:comparar_nc':'Comparar em Not. Científica',
};

function _cap2SubtemaGerador(tema, sub) {
  var dif = (window.CAP_DATA[2] && _getState(2).dyn.q2) ? _getState(2).dyn.q2.level : 'medio';
  var N = 6;
  var exs = [];
  for (var i = 0; i < N; i++) {
    var ex = null;
    if (tema==='2' && sub==='comparar') ex = buildEx2('2','mc',dif);
    else if (tema==='2' && sub==='ordenar') ex = buildEx2('2','vf',dif);
    else if (tema==='2' && sub==='absoluto') {
      var adns=[2,3,4,5]; var aq=adns[rnd2(0,3)]; var ap=rndNZ2(-aq*2,aq*2);
      ex = { num:i+1, tema:'Tema 2', tipo:'fill', enun:'Calcula: |'+fmtFracHTML(ap,aq)+'| = ?', resposta:fmtFrac(Math.abs(ap),aq), expl:'|'+fmtFrac(ap,aq)+'| = '+fmtFrac(Math.abs(ap),aq)+' (valor absoluto é sempre positivo).' };
    }
    else if (tema==='3' && sub==='somar_frac') { var ex0=buildEx2('3','fill_frac',dif); if(ex0){ex0.num=i+1;ex=ex0;} }
    else if (tema==='3' && sub==='subtrair_frac') {
      var sdens=[2,3,4,5,6]; var sq1=sdens[rnd2(0,4)],sq2=sdens[rnd2(0,4)];
      var sp1=rndNZ2(-sq1*2,sq1*2), sp2=rndNZ2(-sq2*2,sq2*2);
      var slcm=sq1*sq2/gcd2(sq1,sq2); var srp=(sp1*(slcm/sq1))-(sp2*(slcm/sq2));
      var sres=reduceFrac(srp,slcm);
      ex={num:i+1,tema:'Tema 3',tipo:'fill_frac', enun:'Calcula: '+fmtFracHTML(sp1,sq1)+' − ('+fmtFracHTML(sp2,sq2)+') = ?', resposta:fmtFrac(sres[0],sres[1]), expl:fmtFrac(sp1,sq1)+' − '+fmtFrac(sp2,sq2)+' = '+fmtFrac(sp1*(slcm/sq1),slcm)+' − '+fmtFrac(sp2*(slcm/sq2),slcm)+' = '+fmtFrac(sres[0],sres[1])};
    }
    else if (tema==='3' && sub==='expressoes') { var ex0b=buildEx2('3','mc',dif); if(ex0b){ex0b.num=i+1;ex=ex0b;} }
    else if (tema==='5' && sub==='converter') {
      var cpcts=[10,20,25,50,75,30,40]; var cp=cpcts[rnd2(0,cpcts.length-1)];
      ex={num:i+1,tema:'Tema 5',tipo:'mc', enun:cp+'% como decimal é:', opcoes:shuffle2([cp/100,cp+0.5,cp*10,cp/1000].filter(function(v,idx,a){return idx===0||v!==a[0];})).slice(0,4), resposta:cp/100, expl:cp+'% = '+cp+'/100 = '+cp/100+'.'};
    }
    else if (tema==='5' && sub==='calcular_pct') { var ex0c=buildEx2('5','fill',dif); if(ex0c){ex0c.num=i+1;ex=ex0c;} }
    else if (tema==='5' && (sub==='aumento'||sub==='desconto')) {
      var apcts=[5,10,15,20,25]; var ap2=apcts[rnd2(0,4)];
      var abases=[80,100,120,200,250,500]; var abase=abases[rnd2(0,abases.length-1)];
      var isAum=(sub==='aumento');
      var ares=isAum ? abase*(1+ap2/100) : abase*(1-ap2/100);
      ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:(isAum?'Aumento':'Desconto')+' de '+ap2+'% sobre '+abase+' €. Valor final?', resposta:ares, expl:abase+' × '+(isAum?'(1+'+ap2+'/100)':'(1-'+ap2+'/100)')+' = '+abase+' × '+(isAum?(1+ap2/100):(1-ap2/100))+' = '+ares+' €.'};
    }
    else if (tema==='5' && sub==='variacao') {
      var vvi=[80,100,150,200][rnd2(0,3)]; var vvf=vvi+[-20,-10,10,20,30][rnd2(0,4)];
      var vpct=Math.round((vvf-vvi)/vvi*100);
      ex={num:i+1,tema:'Tema 6',tipo:'fill', enun:'Preço: '+vvi+'€ → '+vvf+'€. Qual a variação percentual?', resposta:vpct, expl:'% var = ('+vvf+'−'+vvi+')/'+vvi+'×100 = '+(vvf-vvi)+'/'+vvi+'×100 = '+vpct+'%.'};
    }
    else if (tema==='7' && sub==='produto') { var ex0d=buildEx2('7','mc',dif); if(ex0d){ex0d.num=i+1;ex=ex0d;} }
    else if (tema==='7' && sub==='quociente') {
      var qb=[2,3,5,10][rnd2(0,3)]; var qbig=rnd2(4,8); var qsmall=rnd2(1,qbig-1);
      var qres=qbig-qsmall;
      ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:'Simplifica: '+qb+'^'+qbig+' ÷ '+qb+'^'+qsmall+' = '+qb+'^?', opcoes:shuffle2([qres,qres+1,qres-1,qbig+qsmall]).slice(0,4), resposta:qres, expl:qb+'^'+qbig+' ÷ '+qb+'^'+qsmall+' = '+qb+'^('+qbig+'−'+qsmall+') = '+qb+'^'+qres+'.'};
    }
    else if (tema==='7' && sub==='frac_pot') {
      var fpn=rnd2(2,4),fpd=rnd2(2,5),fpe=rnd2(2,3);
      ex={num:i+1,tema:'Tema 7',tipo:'mc', enun:'('+fpn+'/'+fpd+')^'+fpe+' = ?', opcoes:shuffle2([Math.pow(fpn,fpe)+'/'+Math.pow(fpd,fpe),fpn*fpe+'/'+fpd*fpe,Math.pow(fpn,fpe)+'/'+fpd,fpn+'/'+Math.pow(fpd,fpe)]).slice(0,4), resposta:Math.pow(fpn,fpe)+'/'+Math.pow(fpd,fpe), expl:'('+fpn+'/'+fpd+')^'+fpe+' = '+fpn+'^'+fpe+'/'+fpd+'^'+fpe+' = '+Math.pow(fpn,fpe)+'/'+Math.pow(fpd,fpe)+'.'};
    }
    else if (tema==='8') { var ex0e=buildEx2('8','mc',dif); if(ex0e){ex0e.num=i+1;ex=ex0e;} }
    else if (tema==='9') { var ex0f=buildEx2('9','mc',dif); if(ex0f){ex0f.num=i+1;ex=ex0f;} }
    else { var ex0g=buildEx2(tema,i%2===0?'mc':'fill_frac',dif); if(ex0g){ex0g.num=i+1;ex=ex0g;} }
    if (ex) exs.push(ex);
  }
  return exs;
}

function abrirSubtema2(tema, sub) {
  _stAnswered = {}; _stScore = { correct: 0, total: 0 };
  var titulo = _cap2SubtemaTitulos[tema+':'+sub] || 'Prática';
  window._stContext = { titulo: titulo, gerador: function(){ return _cap2SubtemaGerador(tema, sub); } };
  criarModalSubtema(titulo, _cap2SubtemaGerador(tema, sub));
}

// ── Keyboard: flashcards Cap2 ──
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(e) {
    var fc2 = document.getElementById('sec-flashcards2');
    if (!fc2 || !fc2.classList.contains('active')) return;
    if (e.key === 'ArrowRight') fcNext2();
    else if (e.key === 'ArrowLeft') fcPrev2();
    else if (e.key === ' ') { e.preventDefault(); fcFlip2(); }
  });
});

// ── Topic grid data ──
var _cap2Topics = [
  {id:'tr2_1', num:'01', title:'Números Racionais', subs:[
    {onclick:"abrirSubtema2('1','conjuntos')", label:'Conjuntos ℕ, ℤ, ℚ'},
    {onclick:"abrirSubtema2('1','arredondamento')", label:'Arredondamento'},
    {onclick:"abrirSubtema2('1','aprox')", label:'Valores aproximados'}
  ]},
  {id:'tr2_2', num:'02', title:'Comparação e Ordenação', subs:[
    {onclick:"abrirSubtema2('2','comparar')", label:'Comparar frações'},
    {onclick:"abrirSubtema2('2','ordenar')", label:'Ordenar racionais'},
    {onclick:"abrirSubtema2('2','absoluto')", label:'Valor absoluto em ℚ'}
  ]},
  {id:'tr2_3', num:'03', title:'Adição Algébrica', subs:[
    {onclick:"abrirSubtema2('3','somar_frac')", label:'Somar frações'},
    {onclick:"abrirSubtema2('3','subtrair_frac')", label:'Subtrair frações'},
    {onclick:"abrirSubtema2('3','expressoes')", label:'Expressões com frações'}
  ]},
  {id:'tr2_4', num:'04', title:'Problemas com Racionais', subs:[
    {onclick:"abrirSubtema2('3','contexto_rac')", label:'Partes de um todo'},
    {onclick:"abrirSubtema2('3','somar_frac')", label:'Calcular frações'}
  ]},
  {id:'tr2_5', num:'05', title:'Percentagens', subs:[
    {onclick:"abrirSubtema2('5','converter')", label:'Converter fração/decimal/%'},
    {onclick:"abrirSubtema2('5','calcular_pct')", label:'Calcular percentagem de N'}
  ]},
  {id:'tr2_6', num:'06', title:'Problemas com %', subs:[
    {onclick:"abrirSubtema2('5','aumento')", label:'Aumentos percentuais'},
    {onclick:"abrirSubtema2('5','desconto')", label:'Descontos'},
    {onclick:"abrirSubtema2('5','variacao')", label:'Taxa de variação'}
  ]},
  {id:'tr2_7', num:'07', title:'Potências', subs:[
    {onclick:"abrirSubtema2('7','produto')", label:'Produto de potências'},
    {onclick:"abrirSubtema2('7','quociente')", label:'Quociente de potências'},
    {onclick:"abrirSubtema2('7','frac_pot')", label:'Potência de fração'}
  ]},
  {id:'tr2_8', num:'08', title:'Notação Científica', subs:[
    {onclick:"abrirSubtema2('8','escrever')", label:'Escrever em notação científica'},
    {onclick:"abrirSubtema2('8','pot_base10')", label:'Potências de base 10'}
  ]},
  {id:'tr2_9', num:'09', title:'Operações em Not. Científica', subs:[
    {onclick:"abrirSubtema2('9','somar_nc')", label:'Somar e subtrair'},
    {onclick:"abrirSubtema2('9','mult_nc')", label:'Multiplicar e dividir'},
    {onclick:"abrirSubtema2('9','comparar_nc')", label:'Comparar em not. científica'}
  ]}
];
(function(){
  var el = document.getElementById('cap2-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap2Topics);
})()
