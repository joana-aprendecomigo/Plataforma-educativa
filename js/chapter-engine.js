// CHAPTER ENGINE — Generic parameterized logic for cap1–cap4
// Each chapter registers its data in window.CAP_DATA[n].

window.CAP_DATA = window.CAP_DATA || {};
var _capState = {};

function _getState(n) { if (!_capState[n]) _capState[n] = capCreateState(n); return _capState[n]; }
function _getCfg(n) { return window.CAP_DATA[n] || null; }
function _capPfx(n) { var c = _getCfg(n); return c ? c.prefix : (n === 1 ? '' : String(n)); }
function _capSecKeys(n) { var p = _capPfx(n); return { q: 'q' + p, m: 'm' + p, t: 't' + p }; }
function _capEl(id) { return document.getElementById(id); }

// ── State factory ──
function capCreateState(n) {
  var pfx = _capPfx(n), q = 'q' + pfx, m = 'm' + pfx, t = 't' + pfx;
  var st = {
    dyn: {}, genAnswered: {}, genExercicios: [], genLevel: 'medio', genScore: { correct: 0, total: 0 },
    activeMini: 0, testeSubtema: 0,
    fcState: { cards: [], idx: 0, flipped: false, stats: {} },
    exame: { level: 'medio', timer: null, timeLeft: 900, exercicios: [], answered: {}, score: { correct: 0, total: 0 } },
    progData: { sections: { questoes:{correct:0,total:0}, minitestes:{correct:0,total:0}, teste:{correct:0,total:0}, gerador:{correct:0,total:0}, jogos:{correct:0,total:0}, exame:{correct:0,total:0} }, log: [] }
  };
  var _ds = function(k) { return { level: 'medio', score: { correct: 0, total: 0 }, answered: {} }; };
  st.dyn[q] = _ds(); st.dyn[m] = _ds(); st.dyn[t] = _ds();
  return st;
}

// ── Shared: build quiz HTML for an exercise array ──
function _capBuildQuizHTML(exs, qidPrefix, checkFnCall) {
  var labels = ['A','B','C','D'], html = '';
  exs.forEach(function(ex, i) {
    var qid = qidPrefix + i;
    html += '<div class="quiz-question" id="' + qid + '"><div class="q-number">Questão ' + (ex.num || i+1) + ' · ' + (ex.tema||'') + '</div><div class="q-text">' + (ex.enun||'') + '</div>';
    if (ex.tipo === 'fill' || ex.tipo === 'fill_frac') {
      var inpType = ex.tipo === 'fill_frac' ? 'text' : 'number';
      html += '<div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap"><input class="fill-input" id="' + qid + '-in" placeholder="?" type="' + inpType + '" style="width:100px"><button class="check-btn" onclick="' + checkFnCall + '(\'' + qid + '\',\'' + ex.tipo + '\',' + JSON.stringify(String(ex.resposta)).replace(/"/g,"'") + ')">Verificar</button></div>';
    } else if (ex.tipo === 'mc') {
      html += '<div class="options">';
      (ex.opcoes||[]).forEach(function(opt,k) { var isC = String(opt) === String(ex.resposta); html += '<button class="option-btn" data-correct="' + isC + '" onclick="' + checkFnCall + '(\'' + qid + '\',\'mc\',' + isC + ',this)"><span class="opt-label">' + labels[k] + '</span>' + opt + '</button>'; });
      html += '</div>';
    } else if (ex.tipo === 'vf') {
      var vC = ex.resposta === 'V';
      html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap"><button class="option-btn" data-correct="' + vC + '" onclick="' + checkFnCall + '(\'' + qid + '\',\'mc\',' + vC + ',this)"><span class="opt-label" style="background:rgba(62,207,142,.2);color:var(--correct)">V</span>Verdadeiro</button><button class="option-btn" data-correct="' + (!vC) + '" onclick="' + checkFnCall + '(\'' + qid + '\',\'mc\',' + (!vC) + ',this)"><span class="opt-label" style="background:rgba(255,107,107,.2);color:var(--wrong)">F</span>Falso</button></div>';
    }
    html += '<div class="feedback" id="' + qid + '-fb"></div><span id="' + qid + '-expl" style="display:none">' + (ex.expl||'').replace(/'/g,"&#39;") + '</span></div>';
  });
  return html;
}

// ── Shared: check an answer (returns {correct:bool} or null if invalid) ──
function _capCheckAnswer(qid, tipo, val) {
  var expl = (_capEl(qid + '-expl') || {}).textContent || '';
  var container = _capEl(qid);
  var correct = false;
  if (tipo === 'fill' || tipo === 'fill_frac') {
    var inp = _capEl(qid + '-in');
    if (!inp || !inp.value.trim()) { if (typeof eduToast === 'function') eduToast('Introduz uma resposta!', 'warn'); return null; }
    var uv = inp.value.trim(); inp.disabled = true;
    if (tipo === 'fill_frac') { var norm = function(s) { return s.replace(/\s/g,'').replace(/÷/g,'/'); }; correct = norm(uv) === norm(String(val)); }
    else correct = parseFloat(uv.replace(',','.')) === Number(val);
    inp.classList.add(correct ? 'correct' : 'wrong');
  } else {
    if (container) container.querySelectorAll('.option-btn').forEach(function(b) { b.disabled = true; });
    correct = (val === true || val === 'true');
  }
  return { correct: correct, expl: expl, container: container };
}

// ── Shared: show feedback + highlight buttons ──
function _capShowFeedback(qid, correct, expl, val, btn) {
  if (!correct && btn) {
    btn.classList.add('wrong');
    var c = _capEl(qid); if (c) c.querySelectorAll('.option-btn').forEach(function(b) { if (b.dataset.correct === 'true') b.classList.add('correct'); });
  } else if (correct && btn) btn.classList.add('correct');
  var fb = _capEl(qid + '-fb');
  if (fb) { fb.className = 'feedback show ' + (correct ? 'correct-fb' : 'wrong-fb'); if (typeof makeFeedbackHTML === 'function') fb.innerHTML = makeFeedbackHTML(correct, expl, val, qid + '-fb'); else fb.textContent = correct ? '\u2713 Correto!' : '\u2717 ' + (expl || 'Errado.'); }
}

// ── 1. Section navigation ──
function capShowSection(n, id, btn) {
  var cfg = _getCfg(n); if (!cfg) return;
  var pfx = _capPfx(n), viewId = cfg.viewId || ('view-math' + (n===1?'':n)), tabsId = cfg.tabsId || ('tabs-cap'+n);
  document.querySelectorAll('#'+viewId+' .section').forEach(function(s){s.classList.remove('active');});
  var sec = _capEl('sec-'+id); if (sec) sec.classList.add('active');
  document.querySelectorAll('#'+tabsId+' .tab-btn').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
  if (id==='questoes'+pfx)   { var qc=_capEl('q'+pfx+'-container'); if(qc&&!qc.innerHTML.trim()) capGerarQuestoes(n); }
  if (id==='minitestes'+pfx) { var mc=_capEl('m'+pfx+'-container'); if(mc&&!mc.innerHTML.trim()) capGerarMini(n); }
  if (id==='teste'+pfx)      { var tc=_capEl('t'+pfx+'-container'); if(tc&&!tc.innerHTML.trim()) capGerarTeste(n); }
  if (id==='jogos'+pfx && typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap'+n,'medio');
  if (id==='quiz-game'+pfx && typeof qgStartForCap==='function') qgStartForCap(n);
  if (id==='flashcards'+pfx) capFcRender(n);
  if (id==='progresso'+pfx)  capProgRender(n);
  if (id==='teoria'+pfx && typeof _pmRecord==='function') _pmRecord('cap'+n,'teoria');
  if (id==='flashcards'+pfx && typeof _pmRecord==='function') _pmRecord('cap'+n,'flashcard');
  var secEl = _capEl('sec-'+id); if (secEl && typeof pmRenderWidget==='function') pmRenderWidget('cap'+n,secEl);
  if (cfg.unique && typeof cfg.unique.onShowSection==='function') cfg.unique.onShowSection(id);
}

// ── 2. Navigate to theory topic ──
function capGoToTopic(n, topicNum) {
  var cfg = _getCfg(n); if (!cfg) return;
  var pfx = _capPfx(n), tabsId = cfg.tabsId||('tabs-cap'+n);
  capShowSection(n, 'teoria'+pfx, document.querySelector('#'+tabsId+' .tab-btn:nth-child(2)'));
  setTimeout(function(){ var el = _capEl('topic'+(pfx?pfx+'-':'-')+topicNum) || _capEl('topic-'+topicNum); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }, 100);
}

// ── 3. Quiz rendering ──
function capRenderDynSection(n, containerId, exercicios, sec) {
  var cfg = _getCfg(n); if (!cfg) return;
  var st = _getState(n);
  if (!st.dyn[sec]) st.dyn[sec] = {level:'medio',score:{correct:0,total:0},answered:{}};
  st.dyn[sec].answered = {}; st.dyn[sec].score = {correct:0,total:0};
  if (typeof qzInit === 'function') {
    qzInit(containerId, exercicios, sec, function(c,t){ st.dyn[sec].score={correct:c,total:t}; capUpdateScore(n,sec); });
    capUpdateScore(n,sec); return;
  }
  var container = _capEl(containerId);
  if (container) container.innerHTML = _capBuildQuizHTML(exercicios, sec+'_', 'capCheckDyn('+n+',\''+sec+'\')');
  capUpdateScore(n, sec);
}

// ── 4. Answer checking ──
function capCheckDyn(n, sec, qid, tipo, val, btn) {
  var st = _getState(n), ds = st.dyn[sec]; if (!ds || ds.answered[qid]) return;
  ds.answered[qid] = true;
  var r = _capCheckAnswer(qid, tipo, val);
  if (!r) { delete ds.answered[qid]; return; }
  ds.score.total++; if (r.correct) ds.score.correct++;
  _capShowFeedback(qid, r.correct, r.expl, val, btn);
  capUpdateScore(n, sec);
  var keys = _capSecKeys(n);
  capProgLog(n, sec===keys.q?'questoes':sec===keys.m?'minitestes':'teste', r.correct);
  if (typeof _etRecord==='function') _etRecord('cap'+n, sec, qid, '', r.correct);
  if (typeof trackSubtema==='function') trackSubtema('cap'+n, sec, r.correct);
  if (typeof updateStreak==='function') updateStreak(r.correct);
  if (typeof showXPFloat==='function' && r.correct) showXPFloat();
}

// ── 5. Score bar ──
function capUpdateScore(n, sec) {
  var ds = _getState(n).dyn[sec]; if (!ds) return;
  var s = ds.score;
  var e1=_capEl(sec+'-score');if(e1)e1.textContent=s.correct;
  var e2=_capEl(sec+'-total');if(e2)e2.textContent='/ '+s.total;
  var e3=_capEl(sec+'-prog');if(e3){var pct=s.total>0?s.correct/s.total*100:0;e3.style.width=pct+'%';}
  if (s.total>0&&typeof _pmRecord==='function') _pmRecord('cap'+n,'quiz',{pontuacao:s.correct,total:s.total});
  if (typeof _maybeShowNextStep==='function') _maybeShowNextStep(sec,s.correct,s.total);
}

// ── 6. Set difficulty ──
function capSetLevel(n, sec, btn) {
  var bar = btn.closest('.level-bar');
  if(bar)bar.querySelectorAll('.gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var st = _getState(n); if(!st.dyn[sec]) st.dyn[sec]={level:'medio',score:{correct:0,total:0},answered:{}};
  st.dyn[sec].level = btn.dataset.level;
  var keys = _capSecKeys(n);
  if(sec===keys.q)capGerarQuestoes(n); else if(sec===keys.m)capGerarMini(n); else if(sec===keys.t)capGerarTeste(n);
}

// ── 7. Questoes-aula ──
function capGerarQuestoes(n) {
  var cfg=_getCfg(n); if(!cfg||!cfg.questoesPlans)return;
  var keys=_capSecKeys(n), dif=_getState(n).dyn[keys.q].level;
  var plan = cfg.questoesPlans[dif]||cfg.questoesPlans.medio; if(!plan)return;
  var exs = plan.temas.map(function(t,i){return cfg.buildExercicio(t,plan.tipos[i],dif);}).filter(Boolean);
  capRenderDynSection(n, keys.q+'-container', exs, keys.q);
}

// ── 8. Mini-tests ──
function capShowMini(n, miniNum, btn) {
  _getState(n).activeMini = miniNum;
  var pfx=_capPfx(n); document.querySelectorAll('#mini'+pfx+'-tabs .tab-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active'); capGerarMini(n);
}
function capGerarMini(n) {
  var cfg=_getCfg(n); if(!cfg||!cfg.miniPlans)return;
  var st=_getState(n), keys=_capSecKeys(n), dif=st.dyn[keys.m].level;
  var plans = st.activeMini===0 ? cfg.miniPlans[0] : cfg.miniPlans[st.activeMini];
  if(!plans)return;
  var exs = plans.map(function(p){return cfg.buildExercicio(p.t,p.tipo,dif);}).filter(Boolean);
  capRenderDynSection(n, keys.m+'-container', exs, keys.m);
}

// ── 9. Teste global ──
function capSetTesteSubtema(n, subtema, btn) {
  _getState(n).testeSubtema = subtema;
  var pfx=_capPfx(n); document.querySelectorAll('#teste'+pfx+'-subtema-tabs .tab-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active'); capGerarTeste(n);
}
function capGerarTeste(n) {
  var cfg=_getCfg(n); if(!cfg||!cfg.testePlans)return;
  var st=_getState(n), keys=_capSecKeys(n), dif=st.dyn[keys.t].level;
  var plans = cfg.testePlans['subtema'+st.testeSubtema];
  if(!plans && typeof cfg.testePlans==='function') plans=cfg.testePlans(st.testeSubtema,dif);
  if(!plans)return;
  var plano = plans[dif]||plans; if(!Array.isArray(plano))return;
  var exs = plano.map(function(p){return cfg.buildExercicio(p.t,p.tipo,dif);}).filter(Boolean);
  capRenderDynSection(n, keys.t+'-container', exs, keys.t);
}

// ── 10. Generator ──
function capSetGenLevel(n, btn) {
  var pfx=_capPfx(n); document.querySelectorAll('#sec-gerador'+pfx+' .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active'); _getState(n).genLevel = btn.dataset.level;
}
function capGerarExercicios(n) {
  var cfg=_getCfg(n); if(!cfg)return;
  var st=_getState(n), pfx=_capPfx(n);
  st.genAnswered={}; st.genScore={correct:0,total:0};
  var tema = (_capEl('gen'+pfx+'-tema')||_capEl('gen-tema')||{}).value||'todos';
  var tipo = (_capEl('gen'+pfx+'-tipo')||_capEl('gen-tipo')||{}).value||'misto';
  var qtd  = parseInt((_capEl('gen'+pfx+'-qtd')||_capEl('gen-qtd')||{}).value)||10;
  var temas = cfg.temas||[], temaKeys = tema==='todos'?temas.map(function(_,i){return String(i+1);}): [tema];
  var ftypes = ['mc','mc','fill','vf','fill'], exs = [];
  for (var i=0;i<qtd;i++){
    var t=temaKeys[i%temaKeys.length], tp = tipo==='misto'?ftypes[rnd(0,ftypes.length-1)]:tipo==='contexto'?'contexto':tipo;
    var ex = cfg.buildExercicio(t,tp,st.genLevel);
    if(!ex&&tp==='contexto') ex=cfg.buildExercicio(t,'fill',st.genLevel);
    if(ex) exs.push(Object.assign({},ex,{num:i+1}));
  }
  st.genExercicios = exs; capRenderGenExercicios(n, exs);
}
function capRenderGenExercicios(n, exs) {
  var pfx=_capPfx(n);
  var se=_capEl('gen'+pfx+'-score')||_capEl('gen-score'), te=_capEl('gen'+pfx+'-total')||_capEl('gen-total');
  var pe=_capEl('gen'+pfx+'-prog')||_capEl('gen-prog'), be=_capEl('gen'+pfx+'-score-bar')||_capEl('gen-score-bar');
  var de=_capEl('gen'+pfx+'-download-area')||_capEl('gen-download-area');
  if(se)se.textContent='0'; if(te)te.textContent='/ 0'; if(pe)pe.style.width='0%'; if(be)be.style.display='flex'; if(de)de.style.display='flex';
  var res=_capEl('gen'+pfx+'-resultado')||_capEl('gen-resultado');
  if(res) res.innerHTML = _capBuildQuizHTML(exs, 'g'+n+'ex', 'capCheckGen('+n+')');
}
function capCheckGen(n, qid, tipo, val, btn) {
  var st=_getState(n); if(st.genAnswered[qid])return; st.genAnswered[qid]=true;
  var r=_capCheckAnswer(qid,tipo,val); if(!r){delete st.genAnswered[qid];return;}
  if(r.correct)st.genScore.correct++; st.genScore.total++;
  _capShowFeedback(qid,r.correct,r.expl,val,btn);
  var pfx=_capPfx(n);
  var se=_capEl('gen'+pfx+'-score')||_capEl('gen-score'); if(se)se.textContent=st.genScore.correct;
  var te=_capEl('gen'+pfx+'-total')||_capEl('gen-total'); if(te)te.textContent='/ '+st.genScore.total;
  var pe=_capEl('gen'+pfx+'-prog')||_capEl('gen-prog'); if(pe&&st.genExercicios.length)pe.style.width=(st.genScore.total/st.genExercicios.length*100)+'%';
  capProgLog(n,'gerador',r.correct);
}

// ── 11. Flashcards ──
function _capFcKey(n){ var c=_getCfg(n); return c?c.storageKey+'_fc':'edupt_fc'+n; }
function _capFcLoadStats(n){ var st=_getState(n); try{var r=localStorage.getItem(_capFcKey(n));if(r)st.fcState.stats=JSON.parse(r);}catch(e){} }
function _capFcSaveStats(n){ var st=_getState(n); try{localStorage.setItem(_capFcKey(n),JSON.stringify(st.fcState.stats));}catch(e){} }
function capFcRender(n) {
  var cfg=_getCfg(n); if(!cfg||!cfg.flashcards)return;
  var st=_getState(n), fc=st.fcState, pfx=_capPfx(n);
  if(!fc.cards||!fc.cards.length){ fc.cards=cfg.flashcards.map(function(c,i){return Object.assign({},c,{_idx:i});}); fc.idx=0; _capFcLoadStats(n); }
  var done=_capEl('fc'+pfx+'-done');
  if(!fc.cards.length){if(done)done.style.display='block';return;} if(done)done.style.display='none';
  if(fc.idx>=fc.cards.length){if(done){done.style.display='block';var m=_capEl('fc'+pfx+'-done-msg');if(m)m.textContent='Revisaste '+fc.cards.length+' cartões nesta sessão!';}return;}
  var card=fc.cards[fc.idx];
  var tag=_capEl('fc'+pfx+'-tag');if(tag)tag.textContent=card.tag||'';
  var qE=_capEl('fc'+pfx+'-q');if(qE)qE.textContent=card.q;
  var aE=_capEl('fc'+pfx+'-a');if(aE)aE.textContent=card.a;
  var inn=_capEl('fc'+pfx+'-inner');if(inn)inn.style.transform='rotateY(0deg)'; fc.flipped=false;
  var conf=_capEl('fc'+pfx+'-confidence');if(conf)conf.style.display='none';
  var ctr=_capEl('fc'+pfx+'-counter');if(ctr)ctr.textContent=(fc.idx+1)+' / '+fc.cards.length;
  var prg=_capEl('fc'+pfx+'-prog');if(prg)prg.style.width=((fc.idx+1)/fc.cards.length*100)+'%';
  var dots=_capEl('fc'+pfx+'-dots');
  if(dots)dots.innerHTML=fc.cards.map(function(_,i){return '<div style="width:8px;height:8px;border-radius:50%;background:'+(i===fc.idx?'var(--c'+n+'-mid)':'var(--border2)')+';cursor:pointer;transition:background .2s" onclick="capFcGoTo('+n+','+i+')"></div>';}).join('');
}
function capFcFlip(n) {
  var st=_getState(n),fc=st.fcState,pfx=_capPfx(n); fc.flipped=!fc.flipped;
  var inn=_capEl('fc'+pfx+'-inner');if(inn)inn.style.transform=fc.flipped?'rotateY(180deg)':'rotateY(0deg)';
  var conf=_capEl('fc'+pfx+'-confidence');if(conf)conf.style.display=fc.flipped?'block':'none';
  var aE=_capEl('fc'+pfx+'-a');if(aE)aE.style.display=fc.flipped?'block':'';
}
function capFcNext(n){var fc=_getState(n).fcState;fc.idx=(fc.idx+1)%(fc.cards.length||1);capFcRender(n);}
function capFcPrev(n){var fc=_getState(n).fcState;fc.idx=(fc.idx-1+(fc.cards.length||1))%(fc.cards.length||1);capFcRender(n);}
function capFcGoTo(n,i){_getState(n).fcState.idx=i;capFcRender(n);}

// ── 12. Timed exam ──
function capExameSetLevel(n,btn){
  var pfx=_capPfx(n); document.querySelectorAll('#exame'+pfx+'-config .gen-level-btn,#exame'+pfx+'-level-group .gen-level-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active'); _getState(n).exame.level=btn.dataset.level;
}
function capExameStart(n) {
  var cfg=_getCfg(n); if(!cfg)return;
  var st=_getState(n),ex=st.exame,pfx=_capPfx(n);
  var qtd=parseInt((_capEl('exame'+pfx+'-qtd')||{}).value||'15'), tempo=parseInt((_capEl('exame'+pfx+'-tempo')||{}).value||'900');
  ex.timeLeft=tempo; ex.answered={}; ex.score={correct:0,total:0};
  var temas=cfg.temas?cfg.temas.map(function(_,i){return String(i+1);}):['1','2','3','4','5'];
  var tipos=['mc','fill','mc','fill','vf','mc','fill','mc','vf','fill','mc','mc','fill','mc','mc'], exs=[];
  for(var i=0;i<qtd;i++){var e=cfg.buildExercicio(temas[i%temas.length],tipos[i%tipos.length],ex.level);if(e)exs.push(e);}
  ex.exercicios=exs;
  var ce=_capEl('exame'+pfx+'-config');if(ce)ce.style.display='none';
  var re=_capEl('exame'+pfx+'-result');if(re)re.style.display='none';
  var ru=_capEl('exame'+pfx+'-running');if(ru)ru.style.display='block';
  var ae=_capEl('exame'+pfx+'-answered');if(ae)ae.textContent='0 / '+exs.length;
  var ec=_capEl('exame'+pfx+'-container');
  if(ec)ec.innerHTML=_capBuildQuizHTML(exs,'ex'+n+'_','capExameCheck('+n+')');
  _capExameUpdateTimer(n);
  ex.timer=setInterval(function(){ex.timeLeft--;_capExameUpdateTimer(n);if(ex.timeLeft<=0){clearInterval(ex.timer);capExameFinish(n);}},1000);
}
function _capExameUpdateTimer(n){
  var st=_getState(n),pfx=_capPfx(n),m=Math.floor(st.exame.timeLeft/60),s=st.exame.timeLeft%60;
  var el=_capEl('exame'+pfx+'-timer');if(!el)return;
  el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  el.style.color=st.exame.timeLeft<=60?'var(--cs-mid)':st.exame.timeLeft<=180?'var(--c3-mid)':'var(--ink)';
}
function capExameCheck(n,qid,tipo,val,btn){
  var st=_getState(n),ex=st.exame,pfx=_capPfx(n);
  if(ex.answered[qid])return; ex.answered[qid]=true;
  var r=_capCheckAnswer(qid,tipo,val); if(!r){delete ex.answered[qid];return;}
  if(r.correct)ex.score.correct++; ex.score.total++;
  _capShowFeedback(qid,r.correct,r.expl,val,btn);
  var ae=_capEl('exame'+pfx+'-answered');if(ae)ae.textContent=ex.score.total+' / '+ex.exercicios.length;
  var ep=_capEl('exame'+pfx+'-prog');if(ep)ep.style.width=(ex.score.total/ex.exercicios.length*100)+'%';
  capProgLog(n,'exame',r.correct);
  if(ex.score.total>=ex.exercicios.length){clearInterval(ex.timer);setTimeout(function(){capExameFinish(n);},600);}
}
function capExameStop(n){clearInterval(_getState(n).exame.timer);capExameFinish(n);}
function capExameFinish(n){
  var st=_getState(n),pfx=_capPfx(n),ex=st.exame;
  var ru=_capEl('exame'+pfx+'-running');if(ru)ru.style.display='none';
  var c=ex.score.correct,t=ex.score.total,pct=t>0?Math.round(c/t*100):0;
  var ee=_capEl('exame'+pfx+'-emoji');if(ee)ee.textContent=pct>=90?'\uD83C\uDFC6':pct>=70?'\u2B50':pct>=50?'\uD83D\uDC4D':'\uD83D\uDCDA';
  var ne=_capEl('exame'+pfx+'-nota');if(ne)ne.textContent=pct+'% \u2014 '+(pct>=90?'Excelente!':pct>=70?'Bom!':pct>=50?'Suficiente':'A melhorar');
  var de=_capEl('exame'+pfx+'-detalhe');if(de)de.textContent=c+' certas em '+t+' questões';
  var re=_capEl('exame'+pfx+'-result');if(re)re.style.display='block';
  _capProgLogExame(n,pct,c,t);
}
function capExameReset(n){
  var st=_getState(n),pfx=_capPfx(n); clearInterval(st.exame.timer);
  var ce=_capEl('exame'+pfx+'-config');if(ce)ce.style.display='block';
  var ru=_capEl('exame'+pfx+'-running');if(ru)ru.style.display='none';
  var re=_capEl('exame'+pfx+'-result');if(re)re.style.display='none';
  var tempo=parseInt((_capEl('exame'+pfx+'-tempo')||{}).value||'900'),m=Math.floor(tempo/60),s=tempo%60;
  var te=_capEl('exame'+pfx+'-timer');if(te){te.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');te.style.color='var(--ink)';}
}

// ── 13. Progress ──
function _capProgKey(n){var c=_getCfg(n);return c?c.storageKey:'edupt_cap'+n;}
function _capSaveProgData(n){var st=_getState(n);try{localStorage.setItem(_capProgKey(n),JSON.stringify({sections:st.progData.sections,log:st.progData.log,lastActivity:Date.now()}));}catch(e){}}
function _capLoadProgData(n){var st=_getState(n);try{var r=localStorage.getItem(_capProgKey(n));if(!r)return;var s=JSON.parse(r);if(s.sections)Object.assign(st.progData.sections,s.sections);if(s.log)st.progData.log=s.log;}catch(e){}}
function capProgLog(n,section,correct){
  var pd=_getState(n).progData;
  if(!pd.sections[section])pd.sections[section]={correct:0,total:0};
  pd.sections[section].total++;if(correct)pd.sections[section].correct++;
  pd.log.unshift({section:section,correct:correct,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  if(pd.log.length>50)pd.log.pop(); _capSaveProgData(n);
  if(typeof _progRefreshBars==='function')setTimeout(_progRefreshBars,80);
}
function _capProgLogExame(n,pct,correct,total){
  var pd=_getState(n).progData;if(!pd.exames)pd.exames=[];
  pd.exames.push({pct:pct,correct:correct,total:total,time:new Date().toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'})});
  pd.sections.exame.correct+=correct;pd.sections.exame.total+=total;_capSaveProgData(n);
  if(typeof _progRefreshBars==='function')setTimeout(_progRefreshBars,80);
}
function capProgRender(n){
  var st=_getState(n),pfx=_capPfx(n); _capLoadProgData(n);
  var sec=st.progData.sections,total=0,correct=0;
  Object.keys(sec).forEach(function(k){total+=sec[k].total;correct+=sec[k].correct;});
  var gPct=total>0?Math.round(correct/total*100):0;
  var ce=_capEl('prog'+pfx+'-cards')||_capEl('prog-cards');
  if(ce)ce.innerHTML=[{l:'Questões respondidas',v:total,i:'ph-target'},{l:'Respostas certas',v:correct,i:'ph-check'},{l:'Taxa de acerto',v:total>0?gPct+'%':'\u2014',i:'ph-sparkle'}].map(function(c){return '<div class="card" style="text-align:center;padding:1.5rem"><div style="font-size:1.8rem;margin-bottom:.5rem"><i class="ph '+c.i+'"></i></div><div style="font-family:\'Cormorant Garamond\',serif;font-size:2rem;font-weight:900;color:var(--ink);letter-spacing:-.03em">'+c.v+'</div><div style="font-size:.75rem;font-weight:600;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">'+c.l+'</div></div>';}).join('');
  if(typeof _progRenderCapitulosBar==='function')_progRenderCapitulosBar('prog'+pfx+'-temas',n);
  var labels={questoes:'Questões-aula',minitestes:'Minitestes',teste:'Teste',gerador:'Gerador',jogos:'Jogos',exame:'Exame'};
  var le=_capEl('prog'+pfx+'-historico')||_capEl('prog-historico');if(!le)return;
  if(!st.progData.log.length){le.innerHTML='<div style="color:var(--ink4);font-size:.88rem;font-style:italic;padding:.5rem 0">Ainda sem atividade \u2014 começa a responder!</div>';return;}
  le.innerHTML=st.progData.log.map(function(e){return '<div style="display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:8px">'+(e.correct?'<i class="ph ph-check-circle"></i>':'<i class="ph ph-x-circle"></i>')+'<span style="font-size:.82rem;color:var(--ink2)">'+(labels[e.section]||e.section)+'</span><span style="font-family:\'JetBrains Mono\',monospace;font-size:.72rem;color:var(--ink4);margin-left:auto">'+e.time+'</span></div>';}).join('');
}
function capProgReset(n){
  var st=_getState(n); Object.keys(st.progData.sections).forEach(function(k){st.progData.sections[k]={correct:0,total:0};});
  st.progData.log=[]; try{localStorage.removeItem(_capProgKey(n));}catch(e){} capProgRender(n);
}

// ── Auto-register delegation wrappers for a chapter ──
function _capRegisterWrappers(n, extra) {
  var s = (n === 1) ? '' : String(n);
  var w = {};
  w['showSection'+s] = function(id,btn){capShowSection(n,id,btn)};
  w['goToTopic'+s] = function(t){capGoToTopic(n,t)};
  w['setLevelSection'+s] = function(sec,btn){capSetLevel(n,sec,btn)};
  w['gerarQuestoes'+s] = function(){capGerarQuestoes(n)};
  w['showMiniDyn'+s] = function(m,btn){capShowMini(n,m,btn)};
  w['gerarMiniAtual'+s] = function(){capGerarMini(n)};
  w['gerarExercicios'+s] = function(){capGerarExercicios(n)};
  w['checkGen'+s] = function(qid,tipo,val,btn){capCheckGen(n,qid,tipo,val,btn)};
  w['fcRender'+s] = function(){capFcRender(n)};
  w['fcFlip'+s] = function(){capFcFlip(n)};
  w['fcNext'+s] = function(){capFcNext(n)};
  w['fcPrev'+s] = function(){capFcPrev(n)};
  w['fcGoTo'+s] = function(i){capFcGoTo(n,i)};
  w['exame'+s+'SetLevel'] = function(btn){capExameSetLevel(n,btn)};
  w['exame'+s+'Start'] = function(){capExameStart(n)};
  w['exame'+s+'Stop'] = function(){capExameStop(n)};
  w['exame'+s+'Reset'] = function(){capExameReset(n)};
  w['progRenderSection'+s] = function(){capProgRender(n)};
  w['progReset'+s] = function(){capProgReset(n)};
  w['progLog'+s] = function(sec,c){capProgLog(n,sec,c)};
  for (var name in w) window[name] = w[name];
  if (extra) for (var k in extra) window[k] = extra[k];
}

// ── HTML template builders ──────────────────────────────────────────

// Topic grid: builds all topic-row blocks from data
// topics = [{id, num, title, open?, subs:[{onclick, label, icon?}]}]
function _tplTopicGrid(topics) {
  var h = '';
  topics.forEach(function(t) {
    h += '<div class="topic-row'+(t.open?' open':'')+'" id="'+t.id+'">' +
      '<div class="topic-row-head" onclick="toggleTemaRow(\''+t.id+'\')">' +
      '<div class="t-num">'+t.num+'</div><h3>'+t.title+'</h3><span class="topic-row-chevron">▼</span></div>' +
      '<div class="subtopics">';
    t.subs.forEach(function(s) {
      var icon = s.icon || 'ph-pencil-simple';
      h += '<button class="subtopic-btn" onclick="'+s.onclick+'"><span class="sb-icon"><i class="ph '+icon+'"></i></span> '+s.label+'</button>';
    });
    h += '</div></div>';
  });
  return h;
}
