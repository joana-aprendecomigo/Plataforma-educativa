/* ── Block 7 (from line 15631) ── */
// ESCAPE ROOM v2 — SALA VISUAL ÚNICA
(function(){
'use strict';

// ── Helpers ──────────────────────────────────────────────────
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function gcd(a,b){return b===0?a:gcd(b,a%b);}
function lcm(a,b){return a*b/gcd(a,b);}

// ── Puzzle generators (one per object) ───────────────────────
var PUZZLES = {

  blackboard: {
    icon: '📖',
    label: 'Mesa Encant.',
    title: 'A Mesa de Encantamentos',
    flavour: 'Os glifos na mesa brilham. Para ler o feitiço tens de resolver a operação com inteiros…',
    hint: 'Lembra-te: subtracção de negativos inverte o sinal. (−a) − (−b) = −a + b.',
    type: 'mc',
    gen: function(){
      var a=ri(2,9),b=ri(1,a-1);
      var q='(−'+a+') − (−'+b+')';
      var ans=(-a)-(-b);
      var opts=shuffle([ans,ans-2,ans+3,ans-4]).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      var dígito=((ans%10)+10)%10;
      return{q:'Calcula: <span class="er2-modal-math">'+q+'</span>',opts:opts,ans:ans,digit:dígito,
             explain:'(−'+a+') − (−'+b+') = −'+a+' + '+b+' = '+ans+'. Dígito: '+dígito};
    }
  },

  safe: {
    icon: '🪵',
    label: 'Bancada',
    title: 'A Bancada de Craft',
    flavour: 'Para craftar o item secreto precisas da fração certa. Simplifica e usa os dois dígitos do resultado.',
    hint: 'Simplifica a fração até ser irredutível. Os dígitos são o numerador e o denominador.',
    type: 'code',
    digits: 2,
    gen: function(){
      var d1=pick([6,8,10]),d2=pick([3,4,5]);
      var n1=ri(1,d1-1),n2=ri(1,d2-1);
      var L=lcm(d1,d2);
      var num=n1*(L/d1)+n2*(L/d2),den=L;
      var g=gcd(Math.abs(num),den);
      var rn=num/g,rd=den/g;
      rn=Math.abs(rn); rd=Math.abs(rd);
      if(rn>9||rd>9){n1=1;n2=1;d1=2;d2=3;L=6;num=5;den=6;g=1;rn=5;rd=6;}
      var code=''+rn+''+rd;
      var safeDigit = rn % 10;
      return{q:'Soma e simplifica: <span class="er2-modal-math">'+n1+'/'+d1+' + '+n2+'/'+d2+'</span>. O código são os dígitos do resultado (numerador, depois denominador).',
             code:code, digit:safeDigit, explain:'= '+num+'/'+den+(g>1?' = '+rn+'/'+rd:''),
             preview:'Resultado: '+rn+'/'+rd+' → código: '+code+' · dígito chave: '+safeDigit};
    }
  },

  bookshelf: {
    icon: '📚',
    label: 'Estante',
    title: 'A Estante de Encantamentos',
    flavour: 'Os livros desta estante guardam o poder das potências. Completa a sequência para desbloqueares o feitiço.',
    hint: 'Numa sequência de potências com a mesma base, cada termo é o anterior multiplicado pela base.',
    type: 'mc',
    gen: function(){
      var base=pick([2,3]);
      var exp=ri(1,3);
      var vals=[Math.pow(base,exp),Math.pow(base,exp+1),Math.pow(base,exp+2),Math.pow(base,exp+3)];
      var hi=2; // hide index 2
      var ans=vals[hi];
      var disp=vals.map(function(v,i){return i===hi?'?':v;});
      var rawOpts=[ans,ans+base,ans*2,ans-1,ans+base+1,ans-base];
      var opts=shuffle(rawOpts.filter(function(v,i,a){return a.indexOf(v)===i;})).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      var dígito=ans%10;
      return{q:'Completa a sequência (base '+base+'): <span class="er2-modal-math">'+disp.join(' , ')+'</span>',
             opts:opts,ans:ans,digit:dígito,
             explain:base+'^'+(exp+2)+' = '+ans+'. Dígito: '+dígito};
    }
  },

  window: {
    icon: '🪟',
    label: 'Janela',
    title: 'A Janela para o Overworld',
    flavour: 'Lá fora vês a sombra de um mob no chão. A área da sombra triangular é o próximo dígito.',
    hint: 'A área do triângulo é (base × altura) ÷ 2.',
    type: 'mc',
    gen: function(){
      var b=ri(4,10),h=ri(3,9);
      // make sure bh is even for clean answer
      if((b*h)%2!==0){b++;}
      var area=(b*h)/2;
      var dígito=area%10;
      var opts=shuffle([area,area+5,area-4,area+8]).slice(0,4);
      if(opts.indexOf(area)<0){opts[0]=area;}
      return{q:'Uma sombra triangular no chão: base <span class="er2-modal-math">'+b+' m</span>, altura <span class="er2-modal-math">'+h+' m</span>. Qual é a área em m²?',
             opts:opts,ans:area,digit:dígito,
             explain:'Área = ('+b+' × '+h+') ÷ 2 = '+area+' m². Dígito: '+dígito};
    }
  },

  desk: {
    icon: '📦',
    label: 'Baú',
    title: 'O Baú do Tesouro',
    flavour: 'O baú está trancado por um redstone lock. Resolve a expressão para obter o último dígito.',
    hint: 'Respeita a ordem: parênteses primeiro, depois potências, depois × e ÷, por fim + e −.',
    type: 'mc',
    gen: function(){
      var a=ri(2,5),b=ri(2,4),c=ri(2,4);
      var inner=a+b;
      var ans=inner*inner-c;
      var q='('+a+' + '+b+')² − '+c;
      var dígito=((ans%10)+10)%10;
      var opts=shuffle([ans,ans+3,ans-5,ans+7]).slice(0,4);
      if(opts.indexOf(ans)<0){opts[0]=ans;}
      return{q:'Calcula: <span class="er2-modal-math">'+q+'</span>',
             opts:opts,ans:ans,digit:dígito,
             explain:'('+a+'+'+b+')² − '+c+' = '+inner+'² − '+c+' = '+inner*inner+' − '+c+' = '+ans+'. Dígito: '+dígito};
    }
  }
};

// ── Hotspot layout (% positions inside the scene SVG) ────────
var HOTSPOT_POS = {
  blackboard: {left:'32%', top:'44%', w:'64px', h:'64px'},
  bookshelf:  {left:'79%', top:'22%', w:'56px', h:'56px'},
  window:     {left:'18%', top:'8%',  w:'56px', h:'56px'},
  safe:       {left:'3%',  top:'44%', w:'56px', h:'56px'},
  desk:       {left:'55%', top:'44%', w:'64px', h:'64px'}
};

// ── THEME DEFINITIONS ─────────────────────────────────────────
var ER_THEMES = {

  minecraft: {
    id: 'minecraft',
    name: 'Minecraft',
    emoji: '⛏️',
    desc: 'Estás preso num mundo de blocos! Resolve os enigmas matemáticos e descobre o código redstone.',
    accent: '#3d5a3e',
    accentLight: '#a0f0a0',
    startBtn: '⛏️ Entrar no mundo',
    hudTitle: '⛏️ Minecraft Math',
    doorId: 'mc-door-light',
    objects: {
      blackboard: { icon:'📖', label:'Mesa Encant.',  flavour:'Os glifos na mesa brilham com poder arcano. Resolve a operação para ler o feitiço.' },
      safe:       { icon:'🪵', label:'Bancada',       flavour:'Para craftar o item secreto precisas da fração certa. Simplifica e usa os dois dígitos.' },
      bookshelf:  { icon:'📚', label:'Estante',       flavour:'Os livros guardam o poder das potências. Completa a sequência para desbloquear o feitiço.' },
      window:     { icon:'🪟', label:'Janela',        flavour:'Lá fora vês a sombra de um mob no chão. A área triangular é o próximo dígito.' },
      desk:       { icon:'📦', label:'Baú',           flavour:'O baú está trancado por um redstone lock. Resolve a expressão para obter o último dígito.' }
    },
    chips: ['📖 Mesa Encant. — inteiros','🪵 Bancada — frações','📚 Estante — potências','🪟 Janela — geometria','📦 Baú — ordem ops.'],
    css: {
      lobbyBg: '#c6b078', lobbyBorder: '#5c4a1e', lobbyText: '#3d2e0a', lobbySubText: '#5c4a1e',
      chipBg: '#8b7355', chipBorder: '#3d2e0a', chipText: '#f0e0b0',
      startBg: '#3d5a3e', startBorder: '#1a3a1a', startText: '#a0f0a0',
      hudBg: '#2d2d2d', hudBorder: '#1a1a1a', timerColor: '#80ff80',
      foundBg: '#1a1a1a', foundText: '#555', foundBorder: '#2a2a2a',
      foundUnlBg: '#1a3a1a', foundUnlText: '#80e080', foundUnlBorder: '#2a5a2a',
      modalBg: '#c6b078', modalBorder: '#3d2e0a', modalShadow: '5px 5px 0 #2a1e06',
      modalTitle: '#3d2e0a', modalFlavour: '#5c4a1e',
      qBg: '#d4bc88', qBorder: '#5c4a1e', qText: '#2a1e06', qMathBg: '#e8d08a',
      optBg: '#8b7355', optBorder: '#3d2e0a', optText: '#f0e0b0', optHoverBg: '#a08860',
      optOlBg: '#3d5a3e', optOlBorder: '#2a3a2a', optOlText: '#a0d4a0',
      optOkBg: '#2a4a2a', optOkBorder: '#1a3a1a', optOkText: '#a0f0a0',
      optBadBg: '#5a1a1a', optBadBorder: '#3a0a0a', optBadText: '#f0a0a0',
      digitBg: '#3d5a3e', digitBorder: '#3d2e0a', digitText: '#a0f0a0',
      submitBg: '#3d5a3e', submitBorder: '#1a3a1a', submitText: '#a0f0a0',
      fbOkBg: '#1a3a1a', fbOkBorder: '#0a2a0a', fbOkText: '#80e080',
      fbBadBg: '#3a0a0a', fbBadBorder: '#2a0000', fbBadText: '#e08080',
      hintBtnBg: '#5c4a1e', hintBtnBorder: '#3d2e0a', hintBtnText: '#e8d08a',
      hintBoxBg: '#5c4a1e', hintBoxBorder: '#7a6228', hintBoxText: '#f0e0b0',
      lockBg: '#8b7355', lockBorder: '#3d2e0a', lockH3: '#3d2e0a', lockP: '#5c4a1e',
      finalDigBg: '#3d5a3e', finalDigBorder: '#3d2e0a', finalDigText: '#a0f0a0',
      finalSubmitBg: '#3d2e0a', finalSubmitBorder: '#2a1e06', finalSubmitText: '#e8d08a',
      winBg: '#c6b078', winBorder: '#5c4a1e', winTitle: '#3d2e0a',
      statBg: '#8b7355', statBorder: '#3d2e0a', statNum: '#3d2e0a', statLabel: '#5c4a1e',
      failBg: '#4a1a1a', failBorder: '#2a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#8b2020', closeBorder: '#5a0a0a',
      btnPx: '2px 2px 0'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;image-rendering:pixelated;">
  <defs>
    <pattern id="t-grass" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#5a8a3a"/><rect x="0" y="0" width="8" height="8" fill="#4a7a2a" opacity=".4"/><rect x="8" y="8" width="8" height="8" fill="#6a9a4a" opacity=".3"/></pattern>
    <pattern id="t-dirt" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#8b5e2a"/><rect x="2" y="2" width="4" height="4" fill="#7a4e1e" opacity=".5"/><rect x="10" y="8" width="4" height="4" fill="#9a6e3a" opacity=".4"/></pattern>
    <pattern id="t-stone" patternUnits="userSpaceOnUse" width="32" height="16"><rect width="32" height="16" fill="#888"/><rect x="0" y="0" width="15" height="7" fill="#999" opacity=".5"/><rect x="17" y="0" width="15" height="7" fill="#777" opacity=".3"/><line x1="0" y1="8" x2="32" y2="8" stroke="#666" stroke-width="1"/><line x1="16" y1="0" x2="16" y2="8" stroke="#666" stroke-width="1"/><line x1="8" y1="8" x2="8" y2="16" stroke="#666" stroke-width="1"/></pattern>
    <pattern id="t-wood" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#c8902a"/><rect x="0" y="0" width="16" height="7" fill="#d4a040" opacity=".5"/><line x1="0" y1="8" x2="16" y2="8" stroke="#8b5e10" stroke-width="1"/></pattern>
    <pattern id="t-books" patternUnits="userSpaceOnUse" width="16" height="32"><rect width="16" height="32" fill="#c8902a"/><rect x="1" y="1" width="4" height="14" fill="#516860" rx="1"/><rect x="6" y="2" width="4" height="13" fill="#8B6B61" rx="1"/><rect x="11" y="1" width="4" height="14" fill="#77998E" rx="1"/><rect x="1" y="17" width="4" height="13" fill="#AB9790" rx="1"/><rect x="6" y="18" width="4" height="12" fill="#516860" rx="1"/><rect x="11" y="17" width="4" height="13" fill="#8B6B61" rx="1"/><line x1="0" y1="16" x2="16" y2="16" stroke="#8b5e10" stroke-width="1.5"/></pattern>
    <pattern id="t-glass" patternUnits="userSpaceOnUse" width="16" height="16"><rect width="16" height="16" fill="#a8e4ff" opacity=".7"/><rect x="0" y="0" width="7" height="7" fill="#c8f0ff" opacity=".5"/><rect x="9" y="9" width="7" height="7" fill="#c8f0ff" opacity=".5"/><line x1="8" y1="0" x2="8" y2="16" stroke="#6ab8e8" stroke-width="1" opacity=".5"/><line x1="0" y1="8" x2="16" y2="8" stroke="#6ab8e8" stroke-width="1" opacity=".5"/></pattern>
  </defs>
  <rect width="640" height="200" fill="#87ceeb"/>
  <rect x="560" y="16" width="48" height="48" fill="#ffe040"/>
  <rect x="568" y="8" width="32" height="8" fill="#ffe040"/><rect x="568" y="64" width="32" height="8" fill="#ffe040"/>
  <rect x="552" y="24" width="8" height="32" fill="#ffe040"/><rect x="608" y="24" width="8" height="32" fill="#ffe040"/>
  <rect x="572" y="28" width="8" height="8" fill="#c8a800"/><rect x="588" y="28" width="8" height="8" fill="#c8a800"/>
  <rect x="572" y="44" width="24" height="4" fill="#c8a800"/><rect x="568" y="40" width="4" height="4" fill="#c8a800"/><rect x="596" y="40" width="4" height="4" fill="#c8a800"/>
  <rect x="0" y="200" width="640" height="16" fill="url(#t-grass)"/><rect x="0" y="216" width="640" height="16" fill="url(#t-dirt)"/><rect x="0" y="232" width="640" height="88" fill="url(#t-stone)"/>
  <rect x="32" y="144" width="64" height="56" fill="url(#t-wood)"/>
  <rect x="32" y="136" width="64" height="16" fill="#c8902a"/>
  <line x1="64" y1="136" x2="64" y2="152" stroke="#7a5010" stroke-width="2"/><line x1="32" y1="144" x2="96" y2="144" stroke="#7a5010" stroke-width="2"/>
  <rect x="36" y="138" width="12" height="6" fill="#516860" opacity=".8"/><rect x="52" y="138" width="12" height="6" fill="#AB9790" opacity=".8"/><rect x="68" y="138" width="12" height="6" fill="#f59e0b" opacity=".8"/><rect x="36" y="146" width="12" height="6" fill="#c0392b" opacity=".7"/><rect x="52" y="146" width="12" height="6" fill="#3498db" opacity=".7"/>
  <rect x="36" y="200" width="8" height="16" fill="#8b5e2a"/><rect x="84" y="200" width="8" height="16" fill="#8b5e2a"/>
  <rect x="244" y="120" width="88" height="16" fill="#1a0a40"/><rect x="248" y="108" width="20" height="12" fill="#e74c3c"/><rect x="272" y="108" width="20" height="12" fill="#c0392b"/><rect x="267" y="110" width="6" height="8" fill="#8b0000"/>
  <rect x="249" y="110" width="18" height="8" fill="#f8f0e0"/><rect x="273" y="110" width="18" height="8" fill="#f0e8d0"/>
  <rect x="232" y="124" width="4" height="8" fill="#9b59b6" opacity=".8"/><rect x="240" y="122" width="4" height="10" fill="#8e44ad" opacity=".7"/><rect x="252" y="125" width="6" height="7" fill="#6c3483" opacity=".6"/><rect x="264" y="122" width="4" height="10" fill="#9b59b6" opacity=".8"/><rect x="276" y="124" width="4" height="8" fill="#8e44ad" opacity=".7"/>
  <rect x="238" y="104" width="4" height="4" fill="#9b59b6" opacity=".9"/><rect x="260" y="98" width="4" height="4" fill="#8e44ad" opacity=".8"/><rect x="284" y="106" width="4" height="4" fill="#9b59b6" opacity=".7"/>
  <rect x="232" y="136" width="72" height="64" fill="#1a0a40"/><rect x="236" y="200" width="8" height="16" fill="#0d0520"/><rect x="292" y="200" width="8" height="16" fill="#0d0520"/>
  <rect x="368" y="160" width="80" height="56" fill="url(#t-wood)"/><rect x="368" y="144" width="80" height="24" fill="#d4a040"/><rect x="368" y="144" width="80" height="8" fill="#e0b050"/>
  <rect x="400" y="172" width="16" height="16" fill="#c8902a"/><rect x="402" y="174" width="12" height="12" fill="#f0c030"/><rect x="405" y="176" width="6" height="8" fill="#8b6200"/>
  <rect x="368" y="168" width="80" height="4" fill="#888" opacity=".7"/><rect x="368" y="188" width="80" height="4" fill="#888" opacity=".7"/>
  <rect x="520" y="88" width="64" height="128" fill="url(#t-books)"/><rect x="520" y="88" width="64" height="4" fill="#7a4e10"/><rect x="520" y="212" width="64" height="4" fill="#7a4e10"/><rect x="520" y="88" width="4" height="128" fill="#7a4e10"/><rect x="580" y="88" width="4" height="128" fill="#7a4e10"/>
  <rect x="136" y="32" width="80" height="88" fill="url(#t-stone)"/>
  <rect x="144" y="40" width="28" height="28" fill="url(#t-glass)"/><rect x="180" y="40" width="28" height="28" fill="url(#t-glass)"/><rect x="144" y="76" width="28" height="28" fill="url(#t-glass)"/><rect x="180" y="76" width="28" height="28" fill="url(#t-glass)"/>
  <rect x="170" y="40" width="4" height="64" fill="#888"/><rect x="144" y="68" width="64" height="4" fill="#888"/>
  <rect x="152" y="48" width="4" height="4" fill="#ffe040" opacity=".9"/><rect x="188" y="52" width="4" height="4" fill="#ffe040" opacity=".7"/><rect x="164" y="82" width="4" height="4" fill="#fff" opacity=".8"/>
  <rect x="576" y="104" width="64" height="112" fill="#8b5e2a"/><rect x="584" y="112" width="48" height="40" fill="#7a4e1e" opacity=".7"/><rect x="584" y="160" width="48" height="40" fill="#7a4e1e" opacity=".7"/>
  <rect x="620" y="152" width="8" height="8" fill="#f0c030"/>
  <rect id="mc-door-light" x="620" y="148" width="8" height="4" fill="#c0392b"/>
  <rect x="0" y="196" width="640" height="4" fill="#3a7a20"/>
  <rect x="168" y="176" width="6" height="6" fill="#7dff50" opacity=".8"/><rect x="340" y="168" width="6" height="6" fill="#7dff50" opacity=".7"/><rect x="460" y="172" width="6" height="6" fill="#7dff50" opacity=".8"/>
</svg>`;
    }
  },

  space: {
    id: 'space',
    name: 'Espaço',
    emoji: '🚀',
    desc: 'A tua nave ficou presa numa estação espacial! Resolve os enigmas dos 5 módulos para ativar o propulsor e escapar.',
    accent: '#1a3a8a',
    accentLight: '#80b0ff',
    startBtn: '🚀 Ligar motores',
    hudTitle: '🛸 Space Math',
    doorId: 'space-door-light',
    objects: {
      blackboard: { icon:'📡', label:'Antena',    flavour:'A antena capta uma transmissão matemática do planeta. Decifra a operação para decodificar o sinal.' },
      safe:       { icon:'🔬', label:'Lab.',      flavour:'O laboratório tem uma fórmula a meias. Completa a fração para obter o código de acesso.' },
      bookshelf:  { icon:'💾', label:'Computador', flavour:'O computador mostra uma sequência de dados em potências. Qual é o valor em falta?' },
      window:     { icon:'🔭', label:'Telescópio', flavour:'O telescópio mede a área de impacto de um meteorito triangular. Calcula para prosseguir.' },
      desk:       { icon:'⚡', label:'Reator',    flavour:'O reator nuclear precisa da expressão correta para não entrar em colapso.' }
    },
    chips: ['📡 Antena — inteiros','🔬 Lab. — frações','💾 Computador — potências','🔭 Telescópio — geometria','⚡ Reator — ordem ops.'],
    css: {
      lobbyBg: '#060d1a', lobbyBorder: '#1a3a8a', lobbyText: '#80b0ff', lobbySubText: '#5080c0',
      chipBg: '#0a1a3a', chipBorder: '#1a3a8a', chipText: '#80b0ff',
      startBg: '#1a3a8a', startBorder: '#0a2060', startText: '#80d0ff',
      hudBg: '#050c18', hudBorder: '#1a3a8a', timerColor: '#80d0ff',
      foundBg: '#060d1a', foundText: '#304060', foundBorder: '#1a2a4a',
      foundUnlBg: '#0a1a3a', foundUnlText: '#80d0ff', foundUnlBorder: '#1a3a8a',
      modalBg: '#0a1428', modalBorder: '#1a3a8a', modalShadow: '0 0 24px rgba(80,140,255,.4)',
      modalTitle: '#80d0ff', modalFlavour: '#5080c0',
      qBg: '#060d1a', qBorder: '#1a3a8a', qText: '#c0d8ff', qMathBg: '#0a1a3a',
      optBg: '#0a1428', optBorder: '#1a3a8a', optText: '#80b0ff', optHoverBg: '#0f1e40',
      optOlBg: '#0a1a3a', optOlBorder: '#1a3a8a', optOlText: '#80b0ff',
      optOkBg: '#0a2a1a', optOkBorder: '#0a3a1a', optOkText: '#80e0a0',
      optBadBg: '#2a0a0a', optBadBorder: '#3a0a0a', optBadText: '#e08080',
      digitBg: '#0a1428', digitBorder: '#1a3a8a', digitText: '#80d0ff',
      submitBg: '#1a3a8a', submitBorder: '#0a2060', submitText: '#80d0ff',
      fbOkBg: '#0a2a1a', fbOkBorder: '#0a3a1a', fbOkText: '#80e0a0',
      fbBadBg: '#2a0a0a', fbBadBorder: '#3a0a0a', fbBadText: '#e08080',
      hintBtnBg: '#0a1428', hintBtnBorder: '#1a3a8a', hintBtnText: '#80b0ff',
      hintBoxBg: '#060d1a', hintBoxBorder: '#1a3a8a', hintBoxText: '#80b0ff',
      lockBg: '#060d1a', lockBorder: '#1a3a8a', lockH3: '#80d0ff', lockP: '#5080c0',
      finalDigBg: '#0a1428', finalDigBorder: '#1a3a8a', finalDigText: '#80d0ff',
      finalSubmitBg: '#1a3a8a', finalSubmitBorder: '#0a2060', finalSubmitText: '#80d0ff',
      winBg: '#060d1a', winBorder: '#1a3a8a', winTitle: '#80d0ff',
      statBg: '#0a1428', statBorder: '#1a3a8a', statNum: '#80d0ff', statLabel: '#5080c0',
      failBg: '#1a0505', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 12px rgba(80,140,255,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <radialGradient id="sp-bg" cx="50%" cy="50%" r="80%"><stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#000010"/></radialGradient>
    <radialGradient id="sp-planet" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#3a6a9a"/><stop offset="100%" stop-color="#1a3a5a"/></radialGradient>
  </defs>
  <!-- Deep space bg -->
  <rect width="640" height="320" fill="url(#sp-bg)"/>
  <!-- Stars -->
  <circle cx="20" cy="15" r="1.5" fill="#fff" opacity=".9"/><circle cx="80" cy="40" r="1" fill="#fff" opacity=".7"/><circle cx="150" cy="8" r="1.5" fill="#ffe" opacity=".8"/><circle cx="220" cy="30" r="1" fill="#fff" opacity=".6"/><circle cx="310" cy="12" r="2" fill="#fff" opacity=".9"/><circle cx="390" cy="45" r="1" fill="#aaf" opacity=".7"/><circle cx="450" cy="18" r="1.5" fill="#fff" opacity=".8"/><circle cx="520" cy="8" r="1" fill="#fff" opacity=".6"/><circle cx="580" cy="35" r="1.5" fill="#ffe" opacity=".7"/><circle cx="620" cy="15" r="1" fill="#fff" opacity=".8"/><circle cx="55" cy="80" r="1" fill="#aaf" opacity=".5"/><circle cx="130" cy="65" r="1.5" fill="#fff" opacity=".6"/><circle cx="200" cy="95" r="1" fill="#fff" opacity=".7"/><circle cx="340" cy="70" r="1" fill="#aaf" opacity=".5"/><circle cx="480" cy="60" r="1.5" fill="#fff" opacity=".7"/><circle cx="560" cy="90" r="1" fill="#fff" opacity=".6"/><circle cx="35" cy="170" r="1" fill="#fff" opacity=".5"/><circle cx="100" cy="155" r="1.5" fill="#fff" opacity=".6"/><circle cx="260" cy="145" r="1" fill="#aaf" opacity=".5"/><circle cx="420" cy="160" r="1" fill="#fff" opacity=".6"/>
  <!-- Distant planet -->
  <circle cx="540" cy="80" r="55" fill="url(#sp-planet)" opacity=".6"/>
  <ellipse cx="540" cy="80" rx="75" ry="14" fill="none" stroke="#5a90c0" stroke-width="3" opacity=".5"/>
  <!-- Station floor/platform -->
  <rect x="0" y="240" width="640" height="80" fill="#1a1a2a"/>
  <rect x="0" y="238" width="640" height="4" fill="#2a3a6a"/>
  <!-- Floor grid lines -->
  <line x1="0" y1="260" x2="640" y2="260" stroke="#1a2a4a" stroke-width="1"/><line x1="0" y1="280" x2="640" y2="280" stroke="#1a2a4a" stroke-width="1"/><line x1="0" y1="300" x2="640" y2="300" stroke="#1a2a4a" stroke-width="1"/>
  <line x1="80" y1="240" x2="80" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="160" y1="240" x2="160" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="240" y1="240" x2="240" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="320" y1="240" x2="320" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="400" y1="240" x2="400" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="480" y1="240" x2="480" y2="320" stroke="#1a2a4a" stroke-width="1"/><line x1="560" y1="240" x2="560" y2="320" stroke="#1a2a4a" stroke-width="1"/>
  <!-- Antenna/Satellite dish (left) -->
  <rect x="24" y="180" width="8" height="60" fill="#3a4a6a"/>
  <ellipse cx="28" cy="178" rx="28" ry="14" fill="none" stroke="#5a7aaa" stroke-width="3"/>
  <line x1="28" y1="178" x2="28" y2="164" stroke="#5a7aaa" stroke-width="2"/>
  <circle cx="28" cy="162" r="4" fill="#80b0ff"/>
  <!-- Lab module (center-left) -->
  <rect x="180" y="155" width="90" height="85" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <rect x="188" y="163" width="74" height="20" fill="#060d1a"/>
  <!-- Lab equipment (test tubes, beakers) -->
  <rect x="196" y="170" width="8" height="28" rx="3" fill="#4040c0" opacity=".7"/><rect x="210" y="175" width="8" height="23" rx="3" fill="#40c0c0" opacity=".7"/><rect x="224" y="168" width="8" height="30" rx="3" fill="#c04040" opacity=".7"/><rect x="238" y="173" width="8" height="25" rx="3" fill="#40c040" opacity=".7"/>
  <!-- Screen on lab wall -->
  <rect x="188" y="163" width="74" height="18" fill="#0a2a5a"/><text x="225" y="176" font-family="monospace" font-size="8" fill="#80d0ff" text-anchor="middle">DATA LOCK</text>
  <!-- Computer terminal (center) -->
  <rect x="296" y="148" width="80" height="92" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <rect x="304" y="155" width="64" height="44" fill="#000820"/>
  <!-- Screen content -->
  <text x="336" y="170" font-family="monospace" font-size="7" fill="#00ff88" text-anchor="middle">2^0=1</text>
  <text x="336" y="181" font-family="monospace" font-size="7" fill="#00cc66" text-anchor="middle">2^1=2</text>
  <text x="336" y="192" font-family="monospace" font-size="7" fill="#009944" text-anchor="middle">2^?=?</text>
  <!-- Keyboard -->
  <rect x="304" y="204" width="64" height="12" fill="#0a1428" rx="2"/>
  <rect x="307" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="318" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="329" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="340" y="206" width="8" height="6" fill="#1a2a4a" rx="1"/><rect x="351" y="206" width="14" height="6" fill="#1a2a4a" rx="1"/>
  <!-- Telescope (window area - upper) -->
  <rect x="136" y="28" width="72" height="72" fill="#050c18" stroke="#1a3a8a" stroke-width="2"/>
  <!-- Space view through telescope -->
  <rect x="144" y="36" width="56" height="56" fill="#000010"/>
  <circle cx="172" cy="64" r="18" fill="#1a4a8a" opacity=".6"/>
  <circle cx="172" cy="64" r="14" fill="#2a6aaa" opacity=".5"/>
  <!-- Crosshair -->
  <line x1="172" y1="36" x2="172" y2="92" stroke="#80d0ff" stroke-width="1" opacity=".5"/>
  <line x1="144" y1="64" x2="200" y2="64" stroke="#80d0ff" stroke-width="1" opacity=".5"/>
  <circle cx="172" cy="64" r="3" fill="#80d0ff" opacity=".8"/>
  <!-- Reactor (center-right) -->
  <rect x="428" y="145" width="80" height="95" fill="#0a1428" stroke="#1a3a8a" stroke-width="2"/>
  <!-- Reactor core circle -->
  <circle cx="468" cy="185" r="28" fill="#001040"/>
  <circle cx="468" cy="185" r="20" fill="#002060" stroke="#1a5aaa" stroke-width="2"/>
  <circle cx="468" cy="185" r="12" fill="#0040a0" opacity=".8"/>
  <circle cx="468" cy="185" r="6" fill="#40a0ff" opacity=".9"/>
  <!-- Reactor glow lines -->
  <line x1="468" y1="157" x2="468" y2="165" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="440" y1="185" x2="448" y2="185" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="488" y1="185" x2="496" y2="185" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <line x1="468" y1="205" x2="468" y2="213" stroke="#80d0ff" stroke-width="2" opacity=".6"/>
  <!-- Reactor display -->
  <rect x="436" y="218" width="64" height="12" fill="#000820"/><text x="468" y="228" font-family="monospace" font-size="7" fill="#80d0ff" text-anchor="middle">POWER: LOCK</text>
  <!-- Exit door (right) -->
  <rect x="572" y="120" width="68" height="120" fill="#0a1428" stroke="#1a3a8a" stroke-width="3"/>
  <rect x="580" y="128" width="52" height="44" fill="#050c18" stroke="#1a2a4a" stroke-width="1"/>
  <rect x="580" y="180" width="52" height="44" fill="#050c18" stroke="#1a2a4a" stroke-width="1"/>
  <circle cx="576" cy="192" r="5" fill="#80d0ff" opacity=".5"/>
  <rect id="space-door-light" x="569" y="186" width="6" height="12" rx="2" fill="#c0392b"/>
  <!-- Door text -->
  <text x="606" y="158" font-family="monospace" font-size="7" fill="#1a3a8a" text-anchor="middle">EXIT</text>
  <!-- Floating astronaut (decorative) -->
  <circle cx="96" cy="128" r="12" fill="#ddd"/><circle cx="96" cy="124" r="7" fill="#2a3a6a"/>
  <rect x="86" y="138" width="20" height="16" rx="4" fill="#ddd"/><rect x="76" y="140" width="10" height="8" rx="3" fill="#ccc"/><rect x="110" y="140" width="10" height="8" rx="3" fill="#ccc"/>
  <rect x="88" y="154" width="8" height="14" rx="3" fill="#ddd"/><rect x="100" y="154" width="8" height="14" rx="3" fill="#ddd"/>
  <!-- Nebula cloud (decorative) -->
  <ellipse cx="420" cy="60" rx="60" ry="25" fill="#3a0a5a" opacity=".15"/>
  <ellipse cx="440" cy="55" rx="40" ry="18" fill="#5a0a8a" opacity=".12"/>
</svg>`;
    }
  },

  ocean: {
    id: 'ocean',
    name: 'Oceano',
    emoji: '🌊',
    desc: 'O teu submarino está preso no fundo do mar! Resolve os 5 enigmas das criaturas marinhas para ativar o propulsor.',
    accent: '#0a4a6a',
    accentLight: '#80d0ff',
    startBtn: '🤿 Mergulhar',
    hudTitle: '🐠 Ocean Math',
    doorId: 'ocean-door-light',
    objects: {
      blackboard: { icon:'🐙', label:'Polvo',      flavour:'O polvo esconde o número nos seus tentáculos. Resolve a operação para desvendar o dígito.' },
      safe:       { icon:'🐚', label:'Concha',     flavour:'A espiral da concha guarda uma fração secreta. Simplifica para descobrir o código.' },
      bookshelf:  { icon:'🪸', label:'Coral',      flavour:'O recife de coral cresce em potências. Qual é o próximo valor na sequência?' },
      window:     { icon:'🐟', label:'Peixe',      flavour:'A sombra do peixe tem forma triangular. Calcula a área para prosseguir.' },
      desk:       { icon:'⚓', label:'Âncora',     flavour:'A âncora tem uma expressão matemática gravada. Resolve pela ordem correta.' }
    },
    chips: ['🐙 Polvo — inteiros','🐚 Concha — frações','🪸 Coral — potências','🐟 Peixe — geometria','⚓ Âncora — ordem ops.'],
    css: {
      lobbyBg: '#041428', lobbyBorder: '#0a5a8a', lobbyText: '#80d0ff', lobbySubText: '#4a90b0',
      chipBg: '#061828', chipBorder: '#0a5a8a', chipText: '#80d0ff',
      startBg: '#0a4a6a', startBorder: '#052838', startText: '#80e0ff',
      hudBg: '#030c1a', hudBorder: '#0a5a8a', timerColor: '#80e0ff',
      foundBg: '#041428', foundText: '#1a4060', foundBorder: '#0a2a4a',
      foundUnlBg: '#041e2e', foundUnlText: '#80e0ff', foundUnlBorder: '#0a5a8a',
      modalBg: '#061828', modalBorder: '#0a5a8a', modalShadow: '0 0 24px rgba(0,100,180,.5)',
      modalTitle: '#80e0ff', modalFlavour: '#4a90b0',
      qBg: '#041428', qBorder: '#0a5a8a', qText: '#c0e8ff', qMathBg: '#061828',
      optBg: '#061828', optBorder: '#0a5a8a', optText: '#80d0ff', optHoverBg: '#0a2038',
      optOlBg: '#041428', optOlBorder: '#0a5a8a', optOlText: '#80d0ff',
      optOkBg: '#041e14', optOkBorder: '#0a3a1a', optOkText: '#80e0a0',
      optBadBg: '#1e0404', optBadBorder: '#3a0a0a', optBadText: '#e08080',
      digitBg: '#041428', digitBorder: '#0a5a8a', digitText: '#80e0ff',
      submitBg: '#0a4a6a', submitBorder: '#052838', submitText: '#80e0ff',
      fbOkBg: '#041e14', fbOkBorder: '#0a3a1a', fbOkText: '#80e0a0',
      fbBadBg: '#1e0404', fbBadBorder: '#3a0a0a', fbBadText: '#e08080',
      hintBtnBg: '#041428', hintBtnBorder: '#0a5a8a', hintBtnText: '#80d0ff',
      hintBoxBg: '#041428', hintBoxBorder: '#0a5a8a', hintBoxText: '#80d0ff',
      lockBg: '#041428', lockBorder: '#0a5a8a', lockH3: '#80e0ff', lockP: '#4a90b0',
      finalDigBg: '#041428', finalDigBorder: '#0a5a8a', finalDigText: '#80e0ff',
      finalSubmitBg: '#0a4a6a', finalSubmitBorder: '#052838', finalSubmitText: '#80e0ff',
      winBg: '#041428', winBorder: '#0a5a8a', winTitle: '#80e0ff',
      statBg: '#061828', statBorder: '#0a5a8a', statNum: '#80e0ff', statLabel: '#4a90b0',
      failBg: '#180404', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 12px rgba(0,120,200,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <linearGradient id="oc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#041428"/><stop offset="100%" stop-color="#020a18"/></linearGradient>
    <radialGradient id="oc-light" cx="50%" cy="0%" r="70%"><stop offset="0%" stop-color="#0a4a8a" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient>
  </defs>
  <rect width="640" height="320" fill="url(#oc-bg)"/>
  <rect width="640" height="320" fill="url(#oc-light)"/>
  <!-- Bubbles rising -->
  <circle cx="60" cy="280" r="5" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="60" cy="250" r="4" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".4"/><circle cx="60" cy="225" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".3"/>
  <circle cx="340" cy="290" r="4" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="342" cy="265" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".4"/>
  <circle cx="580" cy="275" r="5" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".5"/><circle cx="582" cy="248" r="3" fill="none" stroke="#1a6a9a" stroke-width="1.5" opacity=".3"/>
  <!-- Sand floor -->
  <rect x="0" y="270" width="640" height="50" fill="#2a2010"/>
  <rect x="0" y="268" width="640" height="4" fill="#3a3018"/>
  <!-- Sandy bumps -->
  <ellipse cx="100" cy="270" rx="40" ry="8" fill="#2e2412" opacity=".6"/><ellipse cx="280" cy="272" rx="50" ry="6" fill="#2e2412" opacity=".5"/><ellipse cx="500" cy="270" rx="35" ry="7" fill="#2e2412" opacity=".6"/>
  <!-- Seaweed -->
  <path d="M 30 270 Q 20 255 30 240 Q 40 225 30 210" stroke="#1a6a2a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 30 255 Q 18 250 16 242" stroke="#1a6a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 620 270 Q 612 250 620 232 Q 628 215 620 200" stroke="#1a6a2a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Octopus (left) -->
  <ellipse cx="64" cy="200" rx="28" ry="22" fill="#8a4a9a"/>
  <ellipse cx="64" cy="194" rx="22" ry="18" fill="#9a5aaa"/>
  <circle cx="54" cy="190" r="5" fill="#fff"/><circle cx="74" cy="190" r="5" fill="#fff"/>
  <circle cx="55" cy="190" r="2.5" fill="#2a0a3a"/><circle cx="75" cy="190" r="2.5" fill="#2a0a3a"/>
  <path d="M40 220 Q28 240 32 255" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M52 224 Q45 244 48 258" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M64 226 Q64 248 64 260" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M76 224 Q83 244 80 258" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M88 220 Q100 240 96 255" stroke="#8a4a9a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Shell (center-left) -->
  <ellipse cx="216" cy="240" rx="36" ry="28" fill="#c8903a"/>
  <ellipse cx="216" cy="238" rx="28" ry="22" fill="#d8a04a"/>
  <path d="M216 212 Q230 224 228 238 Q224 250 216 254 Q208 250 212 238 Q210 224 216 212Z" fill="#c07828" opacity=".6"/>
  <path d="M216 216 Q225 228 222 240" stroke="#a06020" stroke-width="2" fill="none" opacity=".5"/>
  <path d="M216 216 Q207 228 210 240" stroke="#a06020" stroke-width="2" fill="none" opacity=".5"/>
  <!-- Coral (center) -->
  <rect x="310" y="210" width="10" height="60" fill="#e84040" rx="4"/>
  <rect x="324" y="220" width="8" height="50" fill="#e84040" rx="4"/>
  <rect x="296" y="228" width="8" height="42" fill="#e84040" rx="4"/>
  <circle cx="315" cy="208" r="10" fill="#ff6060"/><circle cx="328" cy="218" r="8" fill="#ff6060"/><circle cx="300" cy="226" r="8" fill="#ff5050"/>
  <rect x="340" y="235" width="6" height="35" fill="#40c0c0" rx="3"/><rect x="350" y="245" width="6" height="25" fill="#40c0c0" rx="3"/>
  <circle cx="343" cy="233" r="7" fill="#60e0e0"/><circle cx="353" cy="243" r="6" fill="#60e0e0"/>
  <!-- Fish -->
  <ellipse cx="460" cy="160" rx="32" ry="20" fill="#f0a020"/>
  <polygon points="492,160 516,145 516,175" fill="#f0a020"/>
  <circle cx="444" cy="155" r="5" fill="#fff"/><circle cx="445" cy="155" r="2.5" fill="#1a1a1a"/>
  <ellipse cx="460" cy="168" rx="18" ry="6" fill="#e09010" opacity=".5"/>
  <!-- Fish fins -->
  <path d="M455 140 Q460 130 465 140" fill="#e09010"/>
  <path d="M455 180 Q460 190 465 180" fill="#e09010"/>
  <!-- Anchor (right area) -->
  <circle cx="500" cy="165" r="14" fill="none" stroke="#8a9aaa" stroke-width="5"/>
  <rect x="497" y="165" width="6" height="50" fill="#8a9aaa"/>
  <rect x="476" y="210" width="48" height="6" rx="3" fill="#8a9aaa"/>
  <rect x="487" y="176" width="26" height="5" fill="#8a9aaa"/>
  <circle cx="476" cy="213" r="5" fill="#8a9aaa"/><circle cx="524" cy="213" r="5" fill="#8a9aaa"/>
  <!-- Exit hatch (right) -->
  <rect x="572" y="140" width="64" height="100" rx="6" fill="#0a2a4a" stroke="#0a5a8a" stroke-width="3"/>
  <circle cx="604" cy="190" r="28" fill="#041428" stroke="#0a5a8a" stroke-width="2"/>
  <circle cx="604" cy="190" r="20" fill="#031020" stroke="#0a4a7a" stroke-width="1.5"/>
  <!-- Door wheel spokes -->
  <line x1="604" y1="170" x2="604" y2="184" stroke="#0a5a8a" stroke-width="3"/><line x1="604" y1="196" x2="604" y2="210" stroke="#0a5a8a" stroke-width="3"/>
  <line x1="584" y1="190" x2="598" y2="190" stroke="#0a5a8a" stroke-width="3"/><line x1="610" y1="190" x2="624" y2="190" stroke="#0a5a8a" stroke-width="3"/>
  <line x1="589" y1="175" x2="600" y2="185" stroke="#0a5a8a" stroke-width="2.5"/><line x1="608" y1="195" x2="619" y2="205" stroke="#0a5a8a" stroke-width="2.5"/>
  <line x1="619" y1="175" x2="608" y2="185" stroke="#0a5a8a" stroke-width="2.5"/><line x1="600" y1="195" x2="589" y2="205" stroke="#0a5a8a" stroke-width="2.5"/>
  <circle id="ocean-door-light" cx="604" cy="144" r="6" fill="#c0392b"/>
  <!-- Submarine porthole lights -->
  <circle cx="120" cy="100" r="10" fill="#0a3a6a" stroke="#0a5a8a" stroke-width="2" opacity=".6"/>
  <circle cx="120" cy="100" r="6" fill="#1a6aaa" opacity=".4"/>
  <!-- Light rays from surface -->
  <line x1="200" y1="0" x2="180" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".08"/>
  <line x1="280" y1="0" x2="260" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".08"/>
  <line x1="360" y1="0" x2="340" y2="268" stroke="#0a4a8a" stroke-width="1" opacity=".06"/>
</svg>`;
    }
  },

  football: {
    id: 'football',
    name: 'Futebol',
    emoji: '⚽',
    desc: 'Estás no balneário antes do jogo decisivo! Resolve os 5 enigmas para desbloquear o equipamento e entrar em campo.',
    accent: '#1a5c2a',
    accentLight: '#a0e0b0',
    startBtn: '⚽ Entrar em campo',
    hudTitle: '⚽ Football Math',
    doorId: 'football-door-light',
    objects: {
      blackboard: { icon:'📋', label:'Tática',     flavour:'O treinador deixou a tática no quadro. Decifra a operação para entender a jogada.' },
      safe:       { icon:'👟', label:'Cacifos',    flavour:'O cacifo está trancado com uma combinação de fração. Simplifica para descobrir o código.' },
      bookshelf:  { icon:'🏆', label:'Troféus',    flavour:'Os troféus seguem uma sequência de potências. Qual é o próximo valor?' },
      window:     { icon:'🥅', label:'Baliza',     flavour:'A área da grande penalidade tem forma triangular neste campo especial. Calcula a área.' },
      desk:       { icon:'📊', label:'Estatísticas', flavour:'As estatísticas do jogador seguem uma expressão matemática. Resolve para desbloqueares.' }
    },
    chips: ['📋 Tática — inteiros','👟 Cacifos — frações','🏆 Troféus — potências','🥅 Baliza — geometria','📊 Stats — ordem ops.'],
    css: {
      lobbyBg: '#0a2a14', lobbyBorder: '#1a5c2a', lobbyText: '#a0e0b0', lobbySubText: '#4a9a5a',
      chipBg: '#061a0c', chipBorder: '#1a5c2a', chipText: '#a0e0b0',
      startBg: '#1a5c2a', startBorder: '#0a3a16', startText: '#a0e0b0',
      hudBg: '#060e08', hudBorder: '#1a5c2a', timerColor: '#80ff80',
      foundBg: '#060e08', foundText: '#1a3a20', foundBorder: '#0a2a14',
      foundUnlBg: '#0a2a14', foundUnlText: '#80e080', foundUnlBorder: '#1a5c2a',
      modalBg: '#0a1e10', modalBorder: '#1a5c2a', modalShadow: '0 0 20px rgba(26,92,42,.5)',
      modalTitle: '#a0e0b0', modalFlavour: '#4a9a5a',
      qBg: '#061a0c', qBorder: '#1a5c2a', qText: '#c0f0c8', qMathBg: '#0a2a14',
      optBg: '#0a1e10', optBorder: '#1a5c2a', optText: '#a0e0b0', optHoverBg: '#0e2a16',
      optOlBg: '#061a0c', optOlBorder: '#1a5c2a', optOlText: '#80d090',
      optOkBg: '#0a2a14', optOkBorder: '#0a3a16', optOkText: '#80f090',
      optBadBg: '#2a0a0a', optBadBorder: '#3a0a0a', optBadText: '#f08080',
      digitBg: '#061a0c', digitBorder: '#1a5c2a', digitText: '#80ff80',
      submitBg: '#1a5c2a', submitBorder: '#0a3a16', submitText: '#a0e0b0',
      fbOkBg: '#0a2a14', fbOkBorder: '#0a3a16', fbOkText: '#80f090',
      fbBadBg: '#2a0a0a', fbBadBorder: '#3a0a0a', fbBadText: '#f08080',
      hintBtnBg: '#061a0c', hintBtnBorder: '#1a5c2a', hintBtnText: '#80d090',
      hintBoxBg: '#061a0c', hintBoxBorder: '#1a5c2a', hintBoxText: '#a0e0b0',
      lockBg: '#061a0c', lockBorder: '#1a5c2a', lockH3: '#a0e0b0', lockP: '#4a9a5a',
      finalDigBg: '#061a0c', finalDigBorder: '#1a5c2a', finalDigText: '#80ff80',
      finalSubmitBg: '#1a5c2a', finalSubmitBorder: '#0a3a16', finalSubmitText: '#a0e0b0',
      winBg: '#0a1e10', winBorder: '#1a5c2a', winTitle: '#a0e0b0',
      statBg: '#061a0c', statBorder: '#1a5c2a', statNum: '#a0e0b0', statLabel: '#4a9a5a',
      failBg: '#180404', failBorder: '#3a0a0a', failTitle: '#ff8080', failText: '#c08080',
      closeBg: '#3a0a0a', closeBorder: '#5a1a1a',
      btnPx: '0 0 10px rgba(26,92,42,.5)'
    },
    buildScene: function() {
      return `<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;">
  <defs>
    <linearGradient id="fb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a4a8a"/><stop offset="100%" stop-color="#2a6aaa"/></linearGradient>
    <linearGradient id="fb-pitch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a6a2a"/><stop offset="100%" stop-color="#145420"/></linearGradient>
    <pattern id="fb-stripes" patternUnits="userSpaceOnUse" width="40" height="320">
      <rect width="40" height="320" fill="#1a6a2a"/>
      <rect width="20" height="320" fill="#186028"/>
    </pattern>
    <pattern id="fb-floor" patternUnits="userSpaceOnUse" width="32" height="16">
      <rect width="32" height="16" fill="#3a2a1a"/>
      <rect x="0" y="0" width="15" height="7" fill="#4a3a2a" opacity=".5"/>
      <rect x="17" y="9" width="15" height="6" fill="#2a1a0a" opacity=".4"/>
      <line x1="0" y1="8" x2="32" y2="8" stroke="#2a1a0a" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Stadium stands background -->
  <rect width="640" height="140" fill="url(#fb-sky)"/>
  <!-- Stadium seats (rows of colored dots) -->
  <rect x="0" y="20" width="640" height="20" fill="#1a3a6a"/>
  <rect x="0" y="40" width="640" height="20" fill="#1a4a7a"/>
  <!-- Seat dots row 1 -->
  <rect x="10" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="22" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="34" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="46" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="58" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="70" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="82" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="94" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="106" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".4"/><rect x="118" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/>
  <rect x="140" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/><rect x="152" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="164" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/><rect x="176" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".6"/><rect x="188" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="200" y="24" width="6" height="10" rx="2" fill="#3498db" opacity=".7"/>
  <!-- Score banner top -->
  <rect x="220" y="8" width="200" height="32" rx="4" fill="#0a1428" stroke="#f0c030" stroke-width="2"/>
  <text x="264" y="20" font-family="monospace" font-size="9" fill="#f0c030" font-weight="bold">ESTÁDIO MATEMÁTICO</text>
  <text x="286" y="34" font-family="monospace" font-size="10" fill="#fff" font-weight="bold">MAT  0 : 0  ALG</text>

  <!-- More seat rows -->
  <rect x="440" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="452" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="464" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="476" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="488" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="500" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="512" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="524" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="536" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".4"/><rect x="548" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="560" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="572" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/><rect x="584" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".6"/><rect x="596" y="24" width="6" height="10" rx="2" fill="#fff" opacity=".5"/><rect x="608" y="24" width="6" height="10" rx="2" fill="#e74c3c" opacity=".7"/>

  <!-- Pitch (striped) -->
  <rect x="0" y="140" width="640" height="130" fill="url(#fb-stripes)"/>
  <!-- Pitch markings (white) -->
  <!-- Centre circle -->
  <circle cx="320" cy="205" r="36" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  <circle cx="320" cy="205" r="3" fill="rgba(255,255,255,.5)"/>
  <!-- Centre line -->
  <line x1="320" y1="140" x2="320" y2="270" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  <!-- Penalty areas -->
  <rect x="0" y="163" width="80" height="84" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <rect x="560" y="163" width="80" height="84" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <!-- Goal areas -->
  <rect x="0" y="180" width="40" height="50" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
  <rect x="600" y="180" width="40" height="50" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
  <!-- Corner arcs -->
  <path d="M 0 140 Q 8 140 8 148" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 640 140 Q 632 140 632 148" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 0 270 Q 8 270 8 262" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
  <path d="M 640 270 Q 632 270 632 262" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2"/>

  <!-- Balneário floor (bottom band) -->
  <rect x="0" y="270" width="640" height="50" fill="url(#fb-floor)"/>
  <rect x="0" y="268" width="640" height="4" fill="#2a1a0a"/>

  <!-- Tactical board (center-left) — blackboard puzzle -->
  <rect x="168" y="148" width="88" height="72" rx="3" fill="#0a2a14" stroke="#1a5c2a" stroke-width="2"/>
  <rect x="174" y="154" width="76" height="56" rx="2" fill="#0e3018"/>
  <!-- Mini pitch on board -->
  <rect x="178" y="158" width="68" height="48" fill="#186028" opacity=".7"/>
  <line x1="212" y1="158" x2="212" y2="206" stroke="rgba(255,255,255,.4)" stroke-width="1"/>
  <circle cx="212" cy="182" r="8" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1"/>
  <!-- Player dots -->
  <circle cx="188" cy="170" r="4" fill="#e74c3c"/><circle cx="196" cy="185" r="4" fill="#e74c3c"/><circle cx="188" cy="198" r="4" fill="#e74c3c"/>
  <circle cx="230" cy="168" r="4" fill="#3498db"/><circle cx="238" cy="182" r="4" fill="#3498db"/><circle cx="230" cy="196" r="4" fill="#3498db"/>
  <!-- X marker with question -->
  <text x="212" y="177" font-family="monospace" font-size="8" fill="#f0c030" text-anchor="middle">?</text>

  <!-- Lockers / cacifos (left wall) — safe puzzle -->
  <rect x="16" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <rect x="44" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <rect x="72" y="148" width="24" height="80" rx="2" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="1.5"/>
  <!-- Locker handles -->
  <circle cx="35" cy="185" r="3" fill="#f0c030"/><circle cx="63" cy="185" r="3" fill="#f0c030"/><circle cx="91" cy="185" r="3" fill="#f0c030"/>
  <!-- Locker vents -->
  <line x1="20" y1="160" x2="36" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="20" y1="165" x2="36" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <line x1="48" y1="160" x2="64" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="48" y1="165" x2="64" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <line x1="76" y1="160" x2="92" y2="160" stroke="#1a0a00" stroke-width="1.5"/><line x1="76" y1="165" x2="92" y2="165" stroke="#1a0a00" stroke-width="1.5"/>
  <!-- Jersey hanging -->
  <rect x="22" y="150" width="12" height="8" rx="2" fill="#e74c3c" opacity=".8"/>
  <rect x="50" y="150" width="12" height="8" rx="2" fill="#3498db" opacity=".8"/>

  <!-- Trophy cabinet (right) — bookshelf puzzle -->
  <rect x="500" y="144" width="80" height="96" rx="2" fill="#1a0e06" stroke="#3a2a1a" stroke-width="2"/>
  <!-- Shelves -->
  <rect x="500" y="172" width="80" height="4" fill="#2a1a0a"/>
  <rect x="500" y="208" width="80" height="4" fill="#2a1a0a"/>
  <!-- Trophy 1 (gold, big) -->
  <rect x="518" y="152" width="10" height="18" rx="2" fill="#f0c030"/>
  <rect x="514" y="148" width="18" height="6" rx="2" fill="#f0c030"/>
  <rect x="516" y="168" width="14" height="3" fill="#c8a020"/>
  <!-- Trophy 2 (silver) -->
  <rect x="542" y="155" width="8" height="14" rx="2" fill="#c0c0c0"/>
  <rect x="538" y="152" width="16" height="5" rx="2" fill="#c0c0c0"/>
  <rect x="540" y="167" width="12" height="3" fill="#a0a0a0"/>
  <!-- Trophy 3 (bronze) -->
  <rect x="564" y="158" width="8" height="11" rx="2" fill="#cd7f32"/>
  <rect x="560" y="155" width="16" height="5" rx="2" fill="#cd7f32"/>
  <!-- Row 2: cups -->
  <rect x="512" y="180" width="12" height="24" rx="3" fill="#f0c030" opacity=".8"/>
  <rect x="534" y="182" width="10" height="22" rx="3" fill="#c0c0c0" opacity=".8"/>
  <rect x="555" y="183" width="10" height="21" rx="3" fill="#cd7f32" opacity=".8"/>
  <rect x="575" y="184" width="8" height="20" rx="3" fill="#f0c030" opacity=".7"/>
  <!-- Stars on trophies -->
  <text x="524" y="160" font-family="monospace" font-size="6" fill="#fff" text-anchor="middle">★</text>
  <text x="546" y="162" font-family="monospace" font-size="5" fill="#fff" text-anchor="middle">★</text>

  <!-- Stats board (center-right) — desk puzzle -->
  <rect x="372" y="148" width="96" height="80" rx="3" fill="#060e08" stroke="#1a5c2a" stroke-width="2"/>
  <rect x="378" y="154" width="84" height="50" rx="2" fill="#0a1a0c"/>
  <!-- Stats bars -->
  <rect x="382" y="162" width="40" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="162" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="426" y="170" font-family="monospace" font-size="7" fill="#a0e0b0">PAS</text>
  <rect x="382" y="174" width="55" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="174" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="441" y="182" font-family="monospace" font-size="7" fill="#a0e0b0">GOL</text>
  <rect x="382" y="186" width="28" height="8" rx="2" fill="#1a5c2a"/><rect x="382" y="186" width="8" height="8" rx="2" fill="#f0c030"/>
  <text x="414" y="194" font-family="monospace" font-size="7" fill="#a0e0b0">FAL</text>
  <!-- Bottom text -->
  <text x="420" y="218" font-family="monospace" font-size="7" fill="#1a5c2a" text-anchor="middle">CALC SCORE</text>

  <!-- Goal / Baliza (top-left area) — window puzzle -->
  <rect x="126" y="58" width="80" height="52" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="3"/>
  <!-- Goal net pattern -->
  <line x1="134" y1="58" x2="134" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="142" y1="58" x2="142" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="150" y1="58" x2="150" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="158" y1="58" x2="158" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="166" y1="58" x2="166" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="174" y1="58" x2="174" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="182" y1="58" x2="182" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="190" y1="58" x2="190" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="198" y1="58" x2="198" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
  <line x1="126" y1="66" x2="206" y2="66" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="74" x2="206" y2="74" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="82" x2="206" y2="82" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="90" x2="206" y2="90" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="98" x2="206" y2="98" stroke="rgba(255,255,255,.2)" stroke-width="1"/><line x1="126" y1="106" x2="206" y2="106" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
  <!-- Ball in goal -->
  <circle cx="166" cy="84" r="14" fill="#fff" opacity=".9"/>
  <path d="M166 70 L170 78 L178 78 L172 84 L174 92 L166 87 L158 92 L160 84 L154 78 L162 78 Z" fill="#1a1a1a" opacity=".7"/>

  <!-- Exit tunnel door (right) -->
  <rect x="572" y="140" width="68" height="130" rx="4" fill="#0a1e10" stroke="#1a5c2a" stroke-width="3"/>
  <!-- Tunnel arch -->
  <rect x="580" y="152" width="52" height="88" rx="2" fill="#060e08" stroke="#0a3018" stroke-width="1.5"/>
  <!-- Tunnel perspective lines -->
  <line x1="580" y1="240" x2="596" y2="200" stroke="#1a5c2a" stroke-width="1" opacity=".5"/>
  <line x1="632" y1="240" x2="616" y2="200" stroke="#1a5c2a" stroke-width="1" opacity=".5"/>
  <!-- "CAMPO" text above tunnel -->
  <text x="606" y="168" font-family="monospace" font-size="8" fill="#1a5c2a" text-anchor="middle">CAMPO</text>
  <!-- Lock light -->
  <rect id="football-door-light" x="600" y="148" width="12" height="6" rx="2" fill="#c0392b"/>
  <!-- Flood lights (top corners) -->
  <rect x="0" y="0" width="20" height="45" fill="#1a1a1a"/>
  <rect x="620" y="0" width="20" height="45" fill="#1a1a1a"/>
  <rect x="2" y="42" width="16" height="6" rx="1" fill="#ffe080" opacity=".9"/>
  <rect x="622" y="42" width="16" height="6" rx="1" fill="#ffe080" opacity=".9"/>
  <!-- Light beams -->
  <polygon points="2,48 18,48 60,140 0,140" fill="#ffe080" opacity=".04"/>
  <polygon points="622,48 638,48 640,140 580,140" fill="#ffe080" opacity=".04"/>
</svg>`;
    }
  }

};

// ── Scene SVG (dynamic, set by active theme) ──────────────────
var SCENE_SVG = ER_THEMES.minecraft.buildScene();

// ── GameEscapeRoom constructor ────────────────────────────────
function GameEscapeRoom(panelId, qFn){
  this.id     = panelId;
  this.qFn    = qFn;
  this.state  = null;
  this._timer = null;
  this._render();
}

GameEscapeRoom.prototype._el = function(){ return document.getElementById(this.id); };

// ── Lobby ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._render = function(){
  var el = this._el(); if(!el) return;
  var self = this;
  var themeCards = Object.values(ER_THEMES).map(function(t){
    return '<div class="er2-theme-card" data-theme="'+t.id+'">'
      + '<span class="er2-theme-emoji">'+t.emoji+'</span>'
      + '<span class="er2-theme-name">'+t.name+'</span>'
      + '</div>';
  }).join('');
  el.innerHTML = '<div class="er2">'
    + '<div class="er2-theme-lobby">'
    + '<span style="font-size:2.8rem;display:block;margin-bottom:.6rem">🔐</span>'
    + '<h2 style="font-family:Montserrat,sans-serif;font-size:1.3rem;font-weight:900;color:var(--ink);margin-bottom:.35rem;text-transform:uppercase;letter-spacing:.04em">Escape Room — Matemática</h2>'
    + '<p style="color:var(--ink3);font-size:.82rem;line-height:1.6;max-width:380px;margin:.3rem auto .85rem">Resolve 5 enigmas matemáticos para escapar. Escolhe o teu mundo:</p>'
    + '<div class="er2-theme-row">'+themeCards+'</div>'
    + '<div id="er2-theme-desc" style="margin:.8rem auto 0;max-width:380px;background:var(--cream2);border-radius:10px;padding:.55rem .85rem;font-size:.75rem;color:var(--ink4);line-height:1.6">Seleciona um tema para começar.</div>'
    + '<button class="er2-theme-start" id="er2-theme-start-btn" disabled style="margin-top:.85rem">Escolhe um tema</button>'
    + '</div></div>';
  el.querySelectorAll('.er2-theme-card').forEach(function(card){
    card.onclick = function(){
      el.querySelectorAll('.er2-theme-card').forEach(function(c){ c.classList.remove('active'); });
      card.classList.add('active');
      var t = ER_THEMES[card.dataset.theme];
      var desc = el.querySelector('#er2-theme-desc');
      var btn  = el.querySelector('#er2-theme-start-btn');
      if(desc) desc.textContent = t.desc;
      if(btn){ btn.disabled=false; btn.textContent=t.startBtn; btn.style.background=t.accent; btn.style.color=t.accentLight; btn.style.borderColor=t.accent; }
    };
  });
  el.querySelector('#er2-theme-start-btn').onclick = function(){
    var active = el.querySelector('.er2-theme-card.active');
    if(active) self._startGame(active.dataset.theme);
  };
};

// ── Start ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._startGame = function(themeId){
  var theme = ER_THEMES[themeId || 'minecraft'];
  var themeObjs = theme.objects;
  var themePos = {
    minecraft: { blackboard:{left:'32%',top:'44%',w:'64px',h:'64px'}, bookshelf:{left:'79%',top:'22%',w:'56px',h:'56px'}, window:{left:'18%',top:'8%',w:'56px',h:'56px'},  safe:{left:'3%',top:'44%',w:'56px',h:'56px'},  desk:{left:'55%',top:'44%',w:'64px',h:'64px'} },
    space:     { blackboard:{left:'3%', top:'50%',w:'56px',h:'56px'}, bookshelf:{left:'44%',top:'38%',w:'64px',h:'64px'}, window:{left:'19%',top:'5%',w:'56px',h:'56px'},  safe:{left:'26%',top:'38%',w:'64px',h:'64px'}, desk:{left:'63%',top:'38%',w:'64px',h:'64px'} },
    ocean:     { blackboard:{left:'5%', top:'42%',w:'60px',h:'60px'}, bookshelf:{left:'45%',top:'50%',w:'60px',h:'60px'}, window:{left:'67%',top:'28%',w:'60px',h:'60px'}, safe:{left:'28%',top:'48%',w:'60px',h:'60px'}, desk:{left:'73%',top:'48%',w:'56px',h:'56px'} },
    football:  { blackboard:{left:'24%',top:'44%',w:'60px',h:'60px'}, bookshelf:{left:'76%',top:'40%',w:'60px',h:'60px'}, window:{left:'18%',top:'12%',w:'60px',h:'60px'}, safe:{left:'3%', top:'44%',w:'56px',h:'56px'}, desk:{left:'55%',top:'44%',w:'64px',h:'64px'} }
  };
  var pos = themePos[theme.id] || themePos.minecraft;
  // hotspots stored per-instance in state.hotspots — no global mutation
  // FIX 1: apply theme CSS variables to DOM
  var _applyPid = this.id;
  (function applyThemeCSS(css, pid, themeId){
    var styleId = 'er2-ts-'+pid;
    var el = document.getElementById(styleId);
    if(!el){ el=document.createElement('style'); el.id=styleId; document.head.appendChild(el); }
    var t = css; var p = '#'+pid+' '; var tc = '.er2-theme-'+themeId+' ';
    el.textContent = [
      tc+'.er2-modal{background:'+t.modalBg+'!important;border-color:'+t.modalBorder+'!important;box-shadow:'+t.modalShadow+'!important}',
      tc+'.er2-modal-title{color:'+t.modalTitle+'!important}',
      tc+'.er2-modal-flavour{color:'+t.modalFlavour+'!important}',
      tc+'.er2-modal-q{background:'+t.qBg+'!important;border-color:'+t.qBorder+'!important;color:'+t.qText+'!important}',
      tc+'.er2-modal-math{background:'+t.qMathBg+'!important;color:'+t.qText+'!important}',
      tc+'.er2-close-btn{background:'+t.closeBg+'!important;border-color:'+t.closeBorder+'!important}',
      tc+'.er2-mc-opt{background:'+t.optBg+'!important;border-color:'+t.optBorder+'!important;color:'+t.optText+'!important;box-shadow:'+t.btnPx+'!important}',
      tc+'.er2-mc-opt:hover:not(:disabled){background:'+t.optHoverBg+'!important}',
      tc+'.er2-mc-opt .ol{background:'+t.optOlBg+'!important;border-color:'+t.optOlBorder+'!important;color:'+t.optOlText+'!important}',
      tc+'.er2-mc-opt.er2-ok{background:'+t.optOkBg+'!important;border-color:'+t.optOkBorder+'!important;color:'+t.optOkText+'!important}',
      tc+'.er2-mc-opt.er2-bad{background:'+t.optBadBg+'!important;border-color:'+t.optBadBorder+'!important;color:'+t.optBadText+'!important}',
      tc+'.er2-digit{background:'+t.digitBg+'!important;border-color:'+t.digitBorder+'!important;color:'+t.digitText+'!important}',
      tc+'.er2-submit{background:'+t.submitBg+'!important;border-color:'+t.submitBorder+'!important;color:'+t.submitText+'!important}',
      tc+'.er2-fb.ok{background:'+t.fbOkBg+'!important;border-color:'+t.fbOkBorder+'!important;color:'+t.fbOkText+'!important}',
      tc+'.er2-fb.bad{background:'+t.fbBadBg+'!important;border-color:'+t.fbBadBorder+'!important;color:'+t.fbBadText+'!important}',
      tc+'.er2-hint-btn{background:'+t.hintBtnBg+'!important;border-color:'+t.hintBtnBorder+'!important;color:'+t.hintBtnText+'!important}',
      tc+'.er2-hint-box{background:'+t.hintBoxBg+'!important;border-color:'+t.hintBoxBorder+'!important;color:'+t.hintBoxText+'!important}',
      p+'.er2-hud{background:'+t.hudBg+'!important;border-color:'+t.hudBorder+'!important}',
      p+'.er2-hud-timer{color:'+t.timerColor+'!important}',
      p+'.er2-found-chip{background:'+t.foundBg+'!important;color:'+t.foundText+'!important;border-color:'+t.foundBorder+'!important}',
      p+'.er2-found-chip.unlocked{background:'+t.foundUnlBg+'!important;color:'+t.foundUnlText+'!important;border-color:'+t.foundUnlBorder+'!important}',
      p+'.er2-final-lock{background:'+t.lockBg+'!important;border-color:'+t.lockBorder+'!important}',
      p+'.er2-final-lock h3{color:'+t.lockH3+'!important}',
      p+'.er2-final-lock p{color:'+t.lockP+'!important}',
      p+'.er2-final-digit{background:'+t.finalDigBg+'!important;border-color:'+t.finalDigBorder+'!important;color:'+t.finalDigText+'!important}',
      p+'.er2-final-submit{background:'+t.finalSubmitBg+'!important;border-color:'+t.finalSubmitBorder+'!important;color:'+t.finalSubmitText+'!important}',
      p+'.er2-win{background:'+t.winBg+'!important;border-color:'+t.winBorder+'!important}',
      p+'.er2-win h2{color:'+t.winTitle+'!important}',
      p+'.er2-ws{background:'+t.statBg+'!important;border-color:'+t.statBorder+'!important}',
      p+'.er2-ws .n{color:'+t.statNum+'!important}',
      p+'.er2-ws .l{color:'+t.statLabel+'!important}',
      p+'.er2-fail{background:'+t.failBg+'!important;border-color:'+t.failBorder+'!important}',
      p+'.er2-fail h3{color:'+t.failTitle+'!important}',
      p+'.er2-fail p{color:'+t.failText+'!important}',
      tc+'.er2-unlocked-msg{background:'+t.optOkBg+'!important;border-color:'+t.optOkBorder+'!important;color:'+t.optOkText+'!important}'
    ].join('\n');
  })(theme.css, _applyPid, theme.id);
  var puzzles = {};
  Object.keys(PUZZLES).forEach(function(k){
    var p = PUZZLES[k]; var data = p.gen();
    var ov = themeObjs[k] || {};
    puzzles[k] = { def:p, data:data, solved:false, digit:data.digit!=null?data.digit:null,
      icon: ov.icon||p.icon, label: ov.label||p.label, flavour: ov.flavour||p.flavour };
  });
  var stateSceneSVG = theme.buildScene();
  var stateHotspots = pos;
  this.state = { theme:theme, puzzles:puzzles, lives:3, hints:0, errors:0, timeLeft:600, started:Date.now(), active:null, sceneSVG:stateSceneSVG, hotspots:stateHotspots };
  var self = this;
  this._timer = setInterval(function(){ self._tick(); }, 1000);
  this._renderScene();
};

// ── Timer ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._tick = function(){
  if(!this.state) return;
  this.state.timeLeft--;
  this._updateHUD();
  if(this.state.timeLeft <= 0){
    clearInterval(this._timer);
    this._renderFail('timeout');
  }
};

// ── Scene ─────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderScene = function(){
  var el = this._el(); if(!el) return;
  var s = this.state;

  // Build solved digits summary
  var keys = Object.keys(PUZZLES);
  var chips = keys.map(function(k){
    var solved = s.puzzles[k].solved;
    var d = solved ? s.puzzles[k].digit : '?';
    return '<span class="er2-found-chip'+(solved?' unlocked':'')+'" title="'+(s.puzzles[k].label||PUZZLES[k].label)+'">'+(s.puzzles[k].label||PUZZLES[k].label)+': '+d+'</span>';
  }).join('');

  var allSolved = keys.every(function(k){ return s.puzzles[k].solved; });

  // HUD lives
  var hearts = '';
  for(var i=0;i<3;i++) hearts += (i<s.lives?'❤️':'🖤');

  var html = '<div class="er2">'
    + '<div class="er2-hud">'
    + '<span class="er2-hud-title">'+(s.theme?s.theme.hudTitle:'🔐 Escape Room')+'</span>'
    + '<span class="er2-hud-lives">'+hearts+'</span>'
    + '<span class="er2-hud-timer'+(s.timeLeft<=60?' urgent':'')+'" id="er2-timer-'+this.id+'">'+fmt(s.timeLeft)+'</span>'
    + '<div class="er2-found-row">'+chips+'</div>'
    + '</div>'

    // Scene
    + '<div class="er2-scene-wrap" id="er2-scene-'+this.id+'">'
    + (s.sceneSVG || SCENE_SVG)
    + '</div>';

  // Final lock panel
  html += '<div class="er2-final-lock">'
    + '<h3>🔑 Código Final da Porta</h3>'
    + '<p>Resolve os 5 enigmas para descobrir os dígitos. Depois introduz o código de '+(keys.length)+' dígitos.</p>'
    + '<div class="er2-final-code-row">';

  keys.forEach(function(k){
    var solved = s.puzzles[k].solved;
    var d = solved ? s.puzzles[k].digit : '';
    html += '<div style="text-align:center">'
      + '<input class="er2-final-digit'+(solved?' ok':'')+'" id="er2-fd-'+k+'" maxlength="1" '
      + (solved?'readonly value="'+d+'"':'disabled')
      + ' style="'+(solved?'border-color:var(--correct)':'')+'">'
      + '<div class="er2-digit-hint">'+(s.puzzles[k].label||PUZZLES[k].label).charAt(0)+'</div>'
      + '</div>';
  });

  var allSolvedNow = keys.every(function(k){ return s.puzzles[k].solved; });
  html += '<button class="er2-final-submit" id="er2-final-submit-'+this.id+'" '
    + (allSolvedNow?'':'disabled')+'>'
    + (allSolvedNow?'🚪 Abrir porta':'🔒 Resolve os enigmas') + '</button>';
  html += '</div></div>';

  html += '</div>'; // .er2
  el.innerHTML = html;

  // Inject hotspots over scene
  var sceneEl = document.getElementById('er2-scene-'+this.id);
  var self = this;
  Object.keys(PUZZLES).forEach(function(k){
    var pos = (s.hotspots && s.hotspots[k]) ? s.hotspots[k] : HOTSPOT_POS[k];
    var solved = s.puzzles[k].solved;
    var btn = document.createElement('button');
    btn.className = 'er2-hotspot'+(solved?' solved':' er2-hotspot-pulse');
    btn.style.left   = pos.left;
    btn.style.top    = pos.top;
    btn.style.width  = pos.w;
    btn.style.height = pos.h;
    btn.style.position = 'absolute';
    btn.title = PUZZLES[k].label + (solved?' ✓':'');
    btn.textContent = solved ? '✓' : '?';
    btn.dataset.puzzleKey = k;
    btn.onclick = function(){ self._openPuzzle(this.dataset.puzzleKey); };
    sceneEl.appendChild(btn);
  });

  // Door light colour
  var doorLight = el.querySelector('#'+(s.theme?s.theme.doorId:'mc-door-light'));
  if(doorLight) doorLight.setAttribute('fill', allSolvedNow ? '#27ae60' : '#c0392b');

  // Final submit
  var submitBtn = document.getElementById('er2-final-submit-'+this.id);
  if(submitBtn && allSolvedNow){
    submitBtn.onclick = function(){
      clearInterval(self._timer);
      self._renderWin();
    };
  }
};

// ── Open puzzle modal ─────────────────────────────────────────
GameEscapeRoom.prototype._openPuzzle = function(key){
  var s = this.state;
  if(!s || s.lives <= 0) return;
  var pz = s.puzzles[key];
  if(!pz) return;
  this.state.active = key;

  var def  = pz.def;
  var data = pz.data;
  var self = this;

  // Remove any existing modal
  var old = document.getElementById('er2-modal-overlay');
  if(old) old.remove();

  var inner = '<span class="er2-modal-icon">'+(pz.icon||def.icon)+'</span>'
    + '<div class="er2-modal-title">'+(pz.label||def.title)+'</div>'
    + '<div class="er2-modal-flavour">'+(pz.flavour||def.flavour)+'</div>';

  if(pz.solved){
    inner += '<div class="er2-unlocked-msg">✅ Já resolvido! Dígito: <strong>'+pz.digit+'</strong></div>'
      + '<div style="font-size:.8rem;color:var(--ink4);font-style:italic">'+data.explain+'</div>';
  } else {
    inner += '<div class="er2-modal-q">'+data.q+'</div>';

    if(def.type === 'mc'){
      var LABS=['A','B','C','D'];
      inner += '<div class="er2-mc-opts">';
      data.opts.forEach(function(opt,i){
        inner += '<button class="er2-mc-opt" data-idx="'+i+'">'
          + '<span class="ol">'+LABS[i]+'</span>'+opt+'</button>';
      });
      inner += '</div>';
    }

    if(def.type === 'code'){
      var nd = data.code.length;
      inner += '<div class="er2-code-row">';
      for(var d=0;d<nd;d++){
        inner += '<input class="er2-digit" id="er2-d'+d+'" maxlength="1" inputmode="numeric" pattern="[0-9]">';
      }
      inner += '<button class="er2-submit" id="er2-code-submit">🔓 Confirmar</button>';
      inner += '</div>';
    }

    inner += '<div class="er2-fb" id="er2-modal-fb"></div>'
      + '<div class="er2-modal-footer">'
      + '<button class="er2-hint-btn" id="er2-hint-btn">💡 Dica</button>'
      + '</div>'
      + '<div class="er2-hint-box" id="er2-hint-box">'+def.hint+'</div>';
  }

  var overlay = document.createElement('div');
  overlay.id  = 'er2-modal-overlay';
  overlay.className = 'er2-modal-bg er2-theme-'+(s.theme?s.theme.id:'minecraft');
  overlay.innerHTML = '<div class="er2-modal">'
    + '<button class="er2-close-btn" id="er2-modal-close" aria-label="Fechar enigma">✕</button>'
    + inner
    + '</div>';

  document.body.appendChild(overlay);

  // Close
  overlay.querySelector('#er2-modal-close').onclick = function(){ overlay.remove(); };
  overlay.onclick = function(e){ if(e.target===overlay) overlay.remove(); };
  document.addEventListener('keydown', function esc(e){
    if(e.key==='Escape'){ overlay.remove(); document.removeEventListener('keydown',esc); }
  });

  if(pz.solved) return;

  // MC handlers
  overlay.querySelectorAll('.er2-mc-opt').forEach(function(btn){
    btn.onclick = function(){
      var i   = parseInt(btn.dataset.idx);
      var ans = data.opts[i];
      var ok  = (ans+'') === (data.ans+'');
      self._handleAnswer(key, ok, btn, overlay, data.explain);
    };
  });

  // Code handlers
  var digits = overlay.querySelectorAll('.er2-digit');
  digits.forEach(function(inp,idx,all){
    inp.addEventListener('input', function(){
      inp.value = inp.value.replace(/[^0-9]/g,'').slice(-1);
      if(inp.value && idx < all.length-1) all[idx+1].focus();
    });
    inp.addEventListener('keydown', function(e){
      if(e.key==='Backspace' && !inp.value && idx>0) all[idx-1].focus();
      if(e.key==='Enter'){
        var sb = document.getElementById('er2-code-submit');
        if(sb) sb.click();
      }
    });
  });

  var codeSubmit = document.getElementById('er2-code-submit');
  if(codeSubmit){
    codeSubmit.onclick = function(){
      var entered = '';
      overlay.querySelectorAll('.er2-digit').forEach(function(inp){ entered += inp.value; });
      if(entered.length < data.code.length){ eduToast('Preenche todos os dígitos!','warn'); return; }
      var ok = entered === data.code;
      if(!ok){
        overlay.querySelectorAll('.er2-digit').forEach(function(inp){
          inp.classList.add('bad'); setTimeout(function(){ inp.classList.remove('bad'); },400);
        });
      }
      self._handleAnswer(key, ok, null, overlay, data.explain+(data.preview?'\n'+data.preview:''));
    };
    // Focus first digit
    setTimeout(function(){ var f=overlay.querySelector('.er2-digit'); if(f) f.focus(); },80);
  }

  // Hint
  var hintBtn = overlay.querySelector('#er2-hint-btn');
  var hintBox = overlay.querySelector('#er2-hint-box');
  if(hintBtn && hintBox){
    hintBtn.onclick = function(){
      if(!pz.hinted){          // only charge the penalty once per puzzle
        pz.hinted = true;
        s.hints++;
      }
      hintBox.classList.add('show');
      hintBtn.style.display='none';
    };
  }
};

// ── Handle answer ─────────────────────────────────────────────
GameEscapeRoom.prototype._handleAnswer = function(key, ok, btn, overlay, explain){
  var s   = this.state;
  var pz  = s.puzzles[key];
  var fb  = overlay.querySelector('#er2-modal-fb');
  var self = this;

  if(ok){
    pz.solved = true;
    // Mark MC button correct
    if(btn){ btn.classList.add('er2-ok'); }
    // Mark code inputs correct
    overlay.querySelectorAll('.er2-digit').forEach(function(i){ i.classList.add('ok'); });
    var sub = document.getElementById('er2-code-submit');
    if(sub) sub.disabled = true;
    // Disable all MC opts
    overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=true; });
    if(fb){ fb.className='er2-fb show ok'; fb.innerHTML='✅ <strong>Correto!</strong> Dígito desbloqueado: <strong>'+pz.digit+'</strong><br><span style="font-size:.78rem;opacity:.8">'+explain+'</span>'; }
    eduToast('🔓 Dígito '+pz.digit+' desbloqueado! ('+pz.def.label+')', 'success');

    // Re-render scene after short delay (so user sees feedback)
    setTimeout(function(){
      overlay.remove();
      self._renderScene();
      // Check win
      var allDone = Object.keys(PUZZLES).every(function(k){ return s.puzzles[k].solved; });
      if(allDone){ eduToast('🔑 Todos os enigmas resolvidos! Introduz o código final.', 'success'); }
    }, 1200);

  } else {
    s.errors++;
    s.lives--;
    overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=true; });
    if(btn){ btn.classList.add('er2-bad'); }
    // Disable code submit + inputs to prevent rapid re-firing; re-enable after animation
    var _wrongSub = overlay.querySelector('#er2-code-submit');
    var _wrongDigs = overlay.querySelectorAll('.er2-digit');
    if(_wrongSub){ _wrongSub.disabled = true; }
    setTimeout(function(){
      if(s.lives > 0){
        overlay.querySelectorAll('.er2-mc-opt').forEach(function(b){ b.disabled=false; });
        if(_wrongSub) _wrongSub.disabled = false;
      }
      _wrongDigs.forEach(function(i){ i.value=''; });
    }, 450);
    if(fb){ fb.className='er2-fb show bad'; fb.innerHTML='❌ Errado. Vidas restantes: <strong>'+s.lives+'</strong>.'; }
    eduToast('❌ Resposta errada! Vidas: '+s.lives, 'warn');
    this._updateHUD();
    if(s.lives <= 0){
      clearInterval(this._timer);
      setTimeout(function(){ overlay.remove(); self._renderFail('lives'); }, 900);
    }
  }
};

// ── HUD live update ───────────────────────────────────────────
GameEscapeRoom.prototype._updateHUD = function(){
  var el = this._el(); if(!el || !this.state) return;
  var t = el.querySelector('#er2-timer-'+this.id);
  if(t){
    t.textContent = fmt(this.state.timeLeft);
    t.className = 'er2-hud-timer'+(this.state.timeLeft<=60?' urgent':'');
  }
};

// ── Win ───────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderWin = function(){
  var el = this._el(); if(!el) return;
  var s  = this.state;
  var elapsed = 600 - s.timeLeft; // use countdown delta, not wall clock (avoids background/throttle skew)
  var m = Math.floor(elapsed/60), sec = elapsed%60;
  var secStr = sec < 10 ? '0'+sec : ''+sec;
  var score = Math.max(0, 1000 - s.errors*60 - s.hints*25 - Math.floor(elapsed/8));
  var medal = score>=900?'🥇':score>=700?'🥈':'🥉';
  var self = this;

  el.innerHTML = '<div class="er2"><div class="er2-win">'
    + '<span class="er2-win-trophy">🏆</span>'
    + '<h2>'+medal+' Escapaste!</h2>'
    + '<p style="color:var(--ink3);font-size:.86rem;margin-bottom:.5rem">Resolveste todos os enigmas e abriste a porta!</p>'
    + '<div class="er2-win-stats">'
    + '<div class="er2-ws"><div class="n">'+m+'m'+secStr+'s</div><div class="l">Tempo</div></div>'
    + '<div class="er2-ws"><div class="n">'+s.errors+'</div><div class="l">Erros</div></div>'
    + '<div class="er2-ws"><div class="n">'+s.hints+'</div><div class="l">Dicas</div></div>'
    + '<div class="er2-ws"><div class="n" style="color:var(--c2-mid)">'+score+'</div><div class="l">Pts</div></div>'
    + '</div>'
    + '<button class="er2-play-again" id="er2-pa">↺ Jogar novamente</button>'
    + '</div></div>';

  document.getElementById('er2-pa').onclick = function(){
    clearInterval(self._timer);
    self.state = null;
    self._render();
  };
};

// ── Fail ──────────────────────────────────────────────────────
GameEscapeRoom.prototype._renderFail = function(reason){
  var el = this._el(); if(!el) return;
  if(this._timer){ clearInterval(this._timer); this._timer = null; }
  var s  = this.state;
  var solved = Object.keys(PUZZLES).filter(function(k){ return s.puzzles[k].solved; }).length;
  var msg = reason==='timeout'
    ? 'O tempo esgotou-se! Resolveste '+solved+' de '+Object.keys(PUZZLES).length+' enigmas.'
    : 'Ficaste sem vidas! Resolveste '+solved+' de '+Object.keys(PUZZLES).length+' enigmas.';
  var self = this;

  el.innerHTML = '<div class="er2"><div class="er2-fail">'
    + '<span class="er2-fail-icon">💀</span>'
    + '<h3>Não escapaste...</h3>'
    + '<p>'+msg+' Tenta de novo — já conheces os enigmas!</p>'
    + '<button class="er2-play-again" id="er2-pa">↺ Tentar novamente</button>'
    + '</div></div>';

  document.getElementById('er2-pa').onclick = function(){
    clearInterval(self._timer);
    self.state = null;
    self._render();
  };
};

window.GameEscapeRoom = GameEscapeRoom;
})();

