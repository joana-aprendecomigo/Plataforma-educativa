/* ══ 3ponto14 VISUAL EFFECTS ENGINE ══
   Shared across all pages. Self-initialising IIFE.
   ─────────────────────────────────────────────── */
(function(){
  // 1. FLOATING PARTICLES
  function initParticles(){
    var canvas=document.createElement('canvas');
    canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.5';
    document.body.prepend(canvas);
    var ctx=canvas.getContext('2d'),W,H,pts=[];
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
    (function loop(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.save();ctx.globalAlpha=(1-d/90)*.07;ctx.strokeStyle='#77998E';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();ctx.restore();}
      }
      pts.forEach(function(p){p.tick();p.draw();});
      requestAnimationFrame(loop);
    })();
  }
  initParticles();

  // 2. SCROLL PROGRESS BAR
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#77998E,#AB9790,#516860);width:0%;pointer-events:none;box-shadow:0 0 8px rgba(119,153,142,.5);transition:width .1s';
  document.body.appendChild(bar);
  addEventListener('scroll',function(){
    var pct=scrollY/(document.documentElement.scrollHeight-innerHeight)*100;
    bar.style.width=Math.min(pct,100)+'%';
  });

  // 3. CURSOR TRAIL (desktop only)
  if(innerWidth>768){
    var trail=[],MAX=10;
    for(var i=0;i<MAX;i++){var d=document.createElement('div');d.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%';document.body.appendChild(d);trail.push({el:d,x:0,y:0});}
    var mx=0,my=0;
    addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
    (function animTrail(){
      trail.forEach(function(t,i){
        var prev=i===0?{x:mx,y:my}:trail[i-1];
        t.x+=(prev.x-t.x)*.35;t.y+=(prev.y-t.y)*.35;
        var sc=1-i/MAX,sz=sc*12,al=sc*.22;
        t.el.style.cssText='position:fixed;pointer-events:none;z-index:9999;border-radius:50%;width:'+sz+'px;height:'+sz+'px;left:'+(t.x-sz/2)+'px;top:'+(t.y-sz/2)+'px;background:'+(i<MAX/2?'rgba(119,153,142,'+al+')':'rgba(171,151,144,'+al+')')+';mix-blend-mode:multiply';
      });
      requestAnimationFrame(animTrail);
    })();
  }

  // 4. SCROLL REVEAL
  var revStyle=document.createElement('style');
  revStyle.textContent='.rv{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rv.in{opacity:1;transform:none}.rvl{opacity:0;transform:translateX(-24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}.rvl.in{opacity:1;transform:none}';
  document.head.appendChild(revStyle);
  var revObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.card,.def-block,.quiz-question,.download-card,.mat7-cap-card').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*70+'ms';revObs.observe(el);});
  document.querySelectorAll('.relampago-q,.eq-tile,.tl-item').forEach(function(el,i){el.classList.add(el.classList.contains('tl-item')?'rvl':'rv');el.style.transitionDelay=(i%4)*60+'ms';revObs.observe(el);});
  document.querySelectorAll('.cycle-block,.y-card').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%3)*60+'ms';revObs.observe(el);});

  // 5. RIPPLE ON BUTTONS
  var ripStyle=document.createElement('style');
  ripStyle.textContent='.rp{position:relative;overflow:hidden}.rw{position:absolute;border-radius:50%;transform:scale(0);animation:rwa .55s linear;pointer-events:none;background:rgba(255,255,255,.3)}@keyframes rwa{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(ripStyle);
  document.querySelectorAll('.check-btn,.btn,.tab-btn,.f-btn,.featured-btn-ui,.back-btn,.gen-level-btn,.option-btn,.relampago-opt,.dl-btn').forEach(function(btn){
    btn.classList.add('rp');
    btn.addEventListener('click',function(e){
      var r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height);
      var w=document.createElement('span');w.className='rw';
      w.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px';
      btn.appendChild(w);w.addEventListener('animationend',function(){w.remove();});
    });
  });

  // 6. 3D TILT ON CARDS
  function tilt(sel,deg){
    document.querySelectorAll(sel).forEach(function(el){
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
  tilt('.featured-card,.download-card',5);tilt('.def-block',2);

  // 7. ANIMATED NUMBER COUNTERS
  var cntObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      cntObs.unobserve(e.target);
      var el=e.target,target=+el.dataset.count,suf=el.dataset.suf||'',t0=performance.now();
      function step(t){
        var p=Math.min((t-t0)/1400,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease)+suf;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cntObs.observe(el);});
  document.querySelectorAll('.hero-stat .n').forEach(function(el){
    var n=parseFloat(el.textContent);
    if(!isNaN(n)&&n>0){el.dataset.count=n;el.dataset.suf=el.textContent.indexOf('+')>=0?'+':'';el.textContent='0';cntObs.observe(el);}
  });

  // 8. MOUSE PARALLAX ON HERO DECOS
  addEventListener('mousemove',function(e){
    var dx=(e.clientX-innerWidth/2)/innerWidth,dy=(e.clientY-innerHeight/2)/innerHeight;
    document.querySelectorAll('.deco').forEach(function(d,i){
      var dep=(i%3+1)*9;d.style.transform='translate('+(dx*dep)+'px,'+(dy*dep)+'px)';
    });
  });

  // 9. HOVER AURA ON CARDS
  var auraStyle=document.createElement('style');
  auraStyle.textContent='.aura{position:relative}.aura::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(119,153,142,.16) 0%,transparent 65%);pointer-events:none;transition:opacity .3s;z-index:0}.aura:hover::after{opacity:1}.aura>*{position:relative;z-index:1}';
  document.head.appendChild(auraStyle);
  document.querySelectorAll('.card,.def-block,.quiz-question,.y-card,.mat7-cap-card,.jogo-card').forEach(function(el){
    el.classList.add('aura');
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // 10. STATUS PILL PULSE
  var spStyle=document.createElement('style');
  spStyle.textContent='@keyframes statusGlow{0%,100%{box-shadow:0 0 0 0 rgba(119,153,142,0)}50%{box-shadow:0 0 0 6px rgba(119,153,142,.14)}}';
  document.head.appendChild(spStyle);
  document.querySelectorAll('.status-pill').forEach(function(el){
    el.style.animation='statusGlow 3s ease-in-out infinite';
  });
})();
