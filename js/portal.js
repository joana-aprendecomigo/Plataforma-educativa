/* ── Block 2 (from line 3760) ── */
// ═══ VIEW SWITCHING ═══
function _hideAllViews(){
  // Clear exam-silent mode whenever we navigate away
  ['view-portal','view-mat7','view-math','view-math2','view-math3','view-math4','view-mega'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.style.display='none';
  });
  // always hide FAB when switching views; updateFAB will re-show if appropriate
  var fab=document.getElementById('mega-fab');if(fab)fab.classList.remove('visible');
}
function showMathView(){
  _hideAllViews();
  document.getElementById('view-math').style.display='block';
  document.title = 'Cap. 1 — Inteiros · 3ponto14';
  window.scrollTo(0,0);
}
function showPortalView(){
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  document.title = '3ponto14 · Centro de Estudos';
  window.scrollTo(0,0);
}

// ═══ PORTAL DATA ═══
const CYCLES=[
  {id:'cycle-3',cls:'cycle-3',label:'3.º Ciclo do Ensino Básico',emoji:'flask',range:'7.º Ano',anos:[
    {ano:7,label:'7.º Ano',subjects:[
      {i:'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span>',n:'Matemática',status:'available',action:'math7'}
    ]},
  ]}
];

function tagHTML(s){
  if(s==='available')return'<span class="s-tag tag-avail">✓ Disponível</span>';
  if(s==='progress')return'<span class="s-tag tag-prog"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span> Em progresso</span>';
  return'<span class="s-tag tag-soon">Em breve</span>';
}
let totalDisc=0,totalAvail=0,totalChapters=0;
function portalRender(){
  const main=document.getElementById('portal-main');
  CYCLES.forEach(cycle=>{
    const block=document.createElement('div');
    block.className=`cycle-block ${cycle.cls}`;
    block.dataset.cycleid=cycle.id;
    block.innerHTML=`<div class="cycle-title-row"><div class="cycle-pill"><div class="pill-emoji"><span class="ico" style="width:1.15rem;height:1.15rem"><svg><use href="#ico-${cycle.emoji}"/></svg></span></div>${cycle.label}</div><div class="cycle-range">${cycle.range}</div></div><div class="years-row" id="row-${cycle.id}"></div>`;
    const row=block.querySelector(`#row-${cycle.id}`);
    cycle.anos.forEach(year=>{
      const avail=year.subjects.filter(s=>s.status==='available').length;
      const prog=year.subjects.filter(s=>s.status==='progress').length;
      const total=year.subjects.length;
      const pct=Math.round(((avail+prog*.5)/total)*100);
      totalDisc+=total;totalAvail+=avail;
      year.subjects.forEach(function(s){if(s.chapters)totalChapters+=s.chapters.filter(function(ch){return ch.action;}).length;});
      const card=document.createElement('div');
      card.className=`y-card ${cycle.cls}`;
      card.dataset.ano=year.ano;card.dataset.cycleid=cycle.id;
      card.dataset.subjects=year.subjects.map(s=>s.n.toLowerCase()).join(' ');
      card.dataset.hasavail=avail>0?'1':'0';
      const subsHTML=year.subjects.map(s=>{
        const st=s.status||'soon';const tag=tagHTML(st);
        const note=s.nt?`<span class="s-note">(${s.nt})</span>`:'';
        const isAvail=st==='available';
        const onclk=s.action?`onclick="handleSubj(event,'${s.action}')"`:isAvail?'':'';
        const cls=`s-item${isAvail?' available':''}`;
        let chapHTML='';
        if(s.chapters&&s.chapters.length){
          chapHTML=`<div class="s-chapters">${s.chapters.map(ch=>ch.action?`<a class="s-chapter-link" href="#" onclick="handleSubj(event,'${ch.action}')"><span class="ch-icon"><span class="ico ico-sm"><svg><use href="#ico-file-text"/></svg></span></span>${ch.label}</a>`:`<span class="s-chapter-link" style="opacity:.45;cursor:default;pointer-events:none;"><span class="ch-icon"><span class="ico ico-sm"><svg><use href="#ico-lock"/></svg></span></span>${ch.label}</span>`).join('')}</div>`;
        }
        const toggleAttr=chapHTML?`onclick="toggleChP(event,this)"`:'';
        return `<a class="${cls}" href="#" ${toggleAttr} ${!chapHTML&&s.action?onclk:''}><span class="s-emoji">${s.i}</span><span class="s-name">${s.n}${note}</span>${tag}</a>${chapHTML}`;
      }).join('');
      card.innerHTML=`<div class="y-card-bar"></div><div class="y-card-head" onclick="toggleCard(this.parentElement)"><div class="y-num">${year.ano}</div><div class="y-meta"><div class="y-title">${year.label}</div><div class="y-sub">${total} disciplinas · ${avail>0?avail+' disponível(is)':'em preparação'}</div></div><div class="y-toggle">▼</div></div><div class="y-prog-bar"><div class="y-prog-fill" style="width:${pct}%"></div></div><div class="y-subjects">${subsHTML}</div>`;
      row.appendChild(card);
    });
    main.appendChild(block);
  });
  // stat-disc set by CYCLES render
  // stat-avail removed
  document.querySelectorAll('.status-pill').forEach(function(el){el.textContent=totalAvail+' disciplina'+(totalAvail!==1?'s':'')+' · '+totalChapters+' capítulo'+(totalChapters!==1?'s':'');});
  const c7=document.querySelector('.y-card[data-ano="7"]');
  if(c7)c7.classList.add('open');
}

function showMat7View(){
  _hideAllViews();
  document.getElementById('view-mat7').style.display='block';
  document.title = 'Mat. 7.º Ano · 3ponto14';
  window.scrollTo(0,0);
  // Re-show FAB if chapters are selected
  setTimeout(function(){ if(typeof updateFAB==='function') updateFAB(); }, 80);
}

function showGeradorFichas(capNum) {
  showMat7View();
  setTimeout(function(){
    var el = document.getElementById('mat7-downloads');
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    // Pre-select only the relevant chapter in the gerador
    if (capNum) {
      var allBtns = document.querySelectorAll('#gf-caps-mat7-downloads .gf-cap-btn');
      allBtns.forEach(function(b){
        var cap = parseInt(b.dataset.cap);
        if (cap !== capNum && b.classList.contains('active')) b.click();
        if (cap === capNum && !b.classList.contains('active')) b.click();
      });
    }
  }, 120);
}
function showPortalFromMat7(){
  // Return all moved sections to their original parents
  mat7ReturnAllSections();
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  document.title = '3ponto14 · Centro de Estudos';
  window.scrollTo(0,0);
}
function handleSubj(e,action){
  if(e && e.preventDefault) e.preventDefault();
  if(action==='math7') showMat7View();
  else if(action==='math') showMathView();
  else if(action==='math2') showMathView2();
  else if(action==='math3') showMathView3();
  else if(action==='math4') showMathView4();
}
function showMathView2(){
  _hideAllViews();
  document.getElementById('view-math2').style.display='block';
  document.title = 'Cap. 2 — Racionais · 3ponto14';
  window.scrollTo(0,0);
  showSection2('temas2', document.querySelector('#tabs2 .tab-btn'));
  var _q2e=document.getElementById('q2-container'); if(_q2e && !_q2e.innerHTML) gerarQuestoes2();
}
function showPortalView2(){
  _hideAllViews();
  document.getElementById('view-portal').style.display='block';
  window.scrollTo(0,0);
}

/* ── Block 4 (from line 8086) ── */
(function(){
  // 1. PARTÍCULAS FLUTUANTES COM LINHAS DE LIGAÇÃO
  function initParticles(){
    var canvas=document.createElement('canvas');
    canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.5';
    document.body.prepend(canvas);
    var ctx=canvas.getContext('2d');
    var W,H,pts=[];
    var COLS=['#77998E','#AB9790','#516860','#D7BDB2','#9ab5aa'];
    function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
    resize();addEventListener('resize',resize);
    function P(){this.reset(true)}
    P.prototype.reset=function(init){
      this.x=Math.random()*W;this.y=init?Math.random()*H:H+10;
      this.r=Math.random()*2.5+.8;this.vx=(Math.random()-.5)*.35;this.vy=-(Math.random()*.45+.15);
      this.a=0;this.ta=Math.random()*.3+.06;this.c=COLS[Math.floor(Math.random()*COLS.length)];
      this.pulse=Math.random()*Math.PI*2;this.ps=Math.random()*.02+.01;
      this.diamond=Math.random()>.7;
    };
    P.prototype.tick=function(){
      this.x+=this.vx;this.y+=this.vy;this.pulse+=this.ps;
      this.a=Math.min(this.a+.007,this.ta*(0.8+0.2*Math.sin(this.pulse)));
      if(this.y<-20)this.reset(false);
    };
    P.prototype.draw=function(){
      ctx.save();ctx.globalAlpha=this.a;ctx.fillStyle=this.c;
      if(this.diamond){ctx.translate(this.x,this.y);ctx.rotate(Math.PI/4+this.pulse*.3);ctx.fillRect(-this.r,-this.r,this.r*2,this.r*2);}
      else{ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    };
    for(var i=0;i<55;i++)pts.push(new P());
    function loop(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.07;ctx.strokeStyle='#77998E';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
      }
      pts.forEach(function(p){p.tick();p.draw();});
      requestAnimationFrame(loop);
    }
    loop();
  }
  initParticles();

  // 2. BARRA DE PROGRESSO DE SCROLL
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#77998E,#AB9790,#516860);width:0%;pointer-events:none;box-shadow:0 0 8px rgba(119,153,142,.5);transition:width .1s';
  document.body.appendChild(bar);
  addEventListener('scroll',function(){
    var pct=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;
    bar.style.width=Math.min(pct,100)+'%';
  });

  // 3. RASTO DE CURSOR (só desktop)
  if(innerWidth>768){
    var trail=[];var MAX=10;
    for(var i=0;i<MAX;i++){var d=document.createElement('div');d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';document.body.appendChild(d);trail.push({el:d,x:0,y:0});}
    var mx=0,my=0;
    addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
    function animTrail(){
      trail.forEach(function(t,i){
        var prev=i===0?{x:mx,y:my}:trail[i-1];
        t.x+=(prev.x-t.x)*.35;t.y+=(prev.y-t.y)*.35;
        var sc=1-i/MAX,sz=sc*12,al=sc*.22;
        t.el.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%;width:'+sz+'px;height:'+sz+'px;left:'+(t.x-sz/2)+'px;top:'+(t.y-sz/2)+'px;background:'+(i<MAX/2?'rgba(119,153,142,'+al+')':'rgba(171,151,144,'+al+')')+';mix-blend-mode:multiply';
      });
      requestAnimationFrame(animTrail);
    }
    animTrail();
  }

  // 4. SCROLL REVEAL
  var revStyle=document.createElement('style');
  revStyle.textContent='.rv{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rv.in{opacity:1;transform:none}.rvl{opacity:0;transform:translateX(-24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rvl.in{opacity:1;transform:none}';
  document.head.appendChild(revStyle);
  var revObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.card,.def-block,.quiz-question,.download-card,.mat7-cap-card').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';revObs.observe(el);});
  document.querySelectorAll('.relampago-q,.eq-tile').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*50+'ms';revObs.observe(el);});

  // 5. RIPPLE
  var ripStyle=document.createElement('style');
  ripStyle.textContent='.rp{position:relative;overflow:hidden}.rw{position:absolute;border-radius:50%;transform:scale(0);animation:rwa .55s linear;pointer-events:none;background:rgba(255,255,255,.3)}@keyframes rwa{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(ripStyle);
  document.querySelectorAll('.btn,.tab-btn,.gen-level-btn,.option-btn,.relampago-opt,.dl-btn').forEach(function(btn){
    btn.classList.add('rp');
    btn.addEventListener('click',function(e){
      var r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height);
      var w=document.createElement('span');w.className='rw';
      w.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px';
      btn.appendChild(w);w.addEventListener('animationend',function(){w.remove();});
    });
  });

  // 6. TILT 3D
  var tiltStyle=document.createElement('style');
  tiltStyle.textContent='.tlt{transform-style:preserve-3d;will-change:transform}';
  document.head.appendChild(tiltStyle);
  function tilt(sel,deg){
    document.querySelectorAll(sel).forEach(function(el){
      el.classList.add('tlt');
      el.addEventListener('mousemove',function(e){
        var r=el.getBoundingClientRect();
        var dx=(e.clientX-r.left-r.width/2)/(r.width/2);
        var dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        el.style.transform='perspective(600px) rotateX('+(-dy*deg)+'deg) rotateY('+(dx*deg)+'deg) translateZ(5px)';
      });
      el.addEventListener('mouseleave',function(){
        el.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform='perspective(600px) rotateX(0) rotateY(0)';
        setTimeout(function(){el.style.transition='';},500);
      });
      el.addEventListener('mouseenter',function(){el.style.transition='transform .1s';});
    });
  }
  tilt('.download-card',5);tilt('.def-block',2);

  // 7. AURA DE GLOW
  var auraStyle=document.createElement('style');
  auraStyle.textContent='.aura{position:relative}.aura::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(119,153,142,.16) 0%,transparent 65%);pointer-events:none;transition:opacity .3s;z-index:0}.aura:hover::after{opacity:1}.aura>*{position:relative;z-index:1}';
  document.head.appendChild(auraStyle);
  document.querySelectorAll('.card,.def-block,.quiz-question,.jogo-card').forEach(function(el){
    el.classList.add('aura');
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // 8. PARALLAX NO HERO
  addEventListener('mousemove',function(e){
    var dx=(e.clientX-innerWidth/2)/innerWidth,dy=(e.clientY-innerHeight/2)/innerHeight;
    document.querySelectorAll('.deco').forEach(function(d,i){
      var dep=(i%3+1)*9;d.style.transform='translate('+(dx*dep)+'px,'+(dy*dep)+'px)';
    });
  });

  // 9. STATUS PILL PULSAR
  var spStyle=document.createElement('style');
  spStyle.textContent='@keyframes statusGlow{0%,100%{box-shadow:0 0 0 0 rgba(119,153,142,0)}50%{box-shadow:0 0 0 6px rgba(119,153,142,.14)}}';
  document.head.appendChild(spStyle);
  document.querySelectorAll('.status-pill').forEach(function(el){
    el.style.animation='statusGlow 3s ease-in-out infinite';
  });

  // 10. CONTADORES ANIMADOS
  var cntObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      cntObs.unobserve(e.target);
      var el=e.target,target=+el.dataset.count,t0=performance.now();
      function step(t){
        var p=Math.min((t-t0)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease);
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cntObs.observe(el);});

})();

