/* ── Block 2 (from line 4431) ── */
// ═══════════════════════════════════════════════════════════════
// UX IMPROVEMENT 1: COLLAPSIBLE THEORY SUBTEMAS
// ═══════════════════════════════════════════════════════════════
(function(){
  document.querySelectorAll('.subtema-header').forEach(function(h){
    var content=[];
    var sib=h.nextElementSibling;
    while(sib && !sib.classList.contains('subtema-header') && !sib.classList.contains('sec-header') && !sib.classList.contains('section4') && !sib.classList.contains('section') && sib.tagName!=='H3'){
      content.push(sib);
      sib=sib.nextElementSibling;
    }
    if(content.length){
      var wrap=document.createElement('div');
      wrap.className='subtema-content';
      h.parentNode.insertBefore(wrap,content[0]);
      content.forEach(function(el){wrap.appendChild(el);});
    }
    h.addEventListener('click',function(){
      var c=this.nextElementSibling;
      if(!c||!c.classList.contains('subtema-content'))return;
      this.classList.toggle('collapsed');
      c.classList.toggle('hidden');
    });
  });
  // Expand/collapse all buttons
  var theoryHeaders=document.querySelectorAll('[id*="sec-teoria"] .sec-header, [id*="sec-teoria"] > .sec-header');
  document.querySelectorAll('[id*="sec-teoria"]').forEach(function(sec){
    var headers=sec.querySelectorAll('.subtema-header');
    if(headers.length>2){
      var sh=sec.querySelector('.sec-header');
      if(!sh)return;
      var btn=document.createElement('button');
      btn.className='subtema-expand-all';
      btn.innerHTML='⊟ Colapsar todos os subtemas';
      btn.dataset.state='open';
      btn.addEventListener('click',function(){
        var open=this.dataset.state==='open';
        headers.forEach(function(h2){
          var c2=h2.nextElementSibling;
          if(!c2||!c2.classList.contains('subtema-content'))return;
          if(open){h2.classList.add('collapsed');c2.classList.add('hidden');}
          else{h2.classList.remove('collapsed');c2.classList.remove('hidden');}
        });
        this.dataset.state=open?'closed':'open';
        this.innerHTML=open?'⊞ Expandir todos os subtemas':'⊟ Colapsar todos os subtemas';
      });
      sh.after(btn);
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// UX 2: NEXT STEP SUGGESTIONS (after completing activities)
// ═══════════════════════════════════════════════════════════════
function showNextStep(container,msg,btnText,action){
  var ex=container.querySelector('.next-step');if(ex)ex.remove();
  var d=document.createElement('div');d.className='next-step';
  d.innerHTML='<div class="next-step-icon"><span class="ico ico-lg"><svg><use href="#ico-target"/></svg></span></div><div class="next-step-text"><strong>'+msg+'</strong>Continua a praticar para consolidar.</div><button class="next-step-btn" onclick="'+action+'">'+btnText+' →</button>';
  container.appendChild(d);
  setTimeout(function(){d.scrollIntoView({behavior:'smooth',block:'nearest'});},100);
}

// ── Next-step context map ──
// sec → { containerId, msg, btnText, action }
var _nextStepMap = {
  // Cap 1
  'q':  { c:'sec-questoes',          msg:'Exercícios concluídos!',  btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  'm':  { c:'sec-minitestes-inline', msg:'Miniteste concluído!',    btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  't':  { c:'sec-teste-inline',      msg:'Teste concluído!',        btn:'Ver Progresso', act:"showSection('progresso',document.querySelector('.tabs .tab-btn:last-child'))" },
  // Cap 2
  'q2': { c:'sec-questoes2',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  'm2': { c:'sec-minitestes2-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  't2': { c:'sec-teste2-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection2('progresso2',document.querySelector('#tabs2 .tab-btn:last-child'))" },
  // Cap 3
  'q3': { c:'sec-questoes3',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  'm3': { c:'sec-minitestes3-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  't3': { c:'sec-teste3-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection3('progresso3',document.querySelector('#tabs3 .tab-btn:last-child'))" },
  // Cap 4
  'q4': { c:'sec-questoes4',          msg:'Exercícios concluídos!', btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
  'm4': { c:'sec-minitestes4-inline', msg:'Miniteste concluído!',   btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
  't4': { c:'sec-teste4-inline',      msg:'Teste concluído!',       btn:'Ver Progresso', act:"showSection4('progresso4',document.querySelector('#tabs4 .tab-btn:last-child'))" },
};

function _maybeShowNextStep(sec, correct, total) {
  var map = _nextStepMap[sec]; if (!map) return;
  var container = document.getElementById(map.c); if (!container) return;
  // Clear flag and banner when quiz is reset or incomplete
  if (!total || total < 3 || correct < total) {
    delete container.dataset.nextShown;
    var ex = container.querySelector('.next-step'); if (ex) ex.remove();
    return;
  }
  if (correct !== total) return;
  // Avoid duplicate if already shown for this completion
  if (container.dataset.nextShown === String(total)) return;
  container.dataset.nextShown = String(total);
  showNextStep(container, map.msg, map.btn, map.act);
}

// ═══════════════════════════════════════════════════════════════
// JOGO DO 24 — Mecânica passo-a-passo (calculadora progressiva)
// ═══════════════════════════════════════════════════════════════

var _j24Levels = {
  facil:   { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil',   nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,1,2,3,4,6,8]); }, time: 90 },
  medio:   { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio',   nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,10,11,12,-1,-2,-3,-4]); }, time: 60 },
  dificil: { label:'<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil', nums: function(){ return _j24Pick4([1,2,3,4,5,6,7,8,9,10,12,1.5,2.5,0.5,3.5,-2,-3]); }, time: 45 }
};

function _j24Pick4(pool) {
  var a = pool.slice();
  for (var i = a.length-1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
  return a.slice(0,4);
}

function _j24Solve(nums) {
  var ops = ['+','-','*','/'];
  var perms = _j24Perms(nums);
  for (var p = 0; p < perms.length; p++) {
    var n = perms[p];
    for (var a = 0; a < 4; a++) for (var b = 0; b < 4; b++) for (var cc = 0; cc < 4; cc++) {
      var o1=ops[a], o2=ops[b], o3=ops[cc];
      var exprs = [
        '(('+n[0]+o1+n[1]+')'+o2+n[2]+')'+o3+n[3],
        '('+n[0]+o1+'('+n[1]+o2+n[2]+'))'+o3+n[3],
        '('+n[0]+o1+n[1]+')'+o2+'('+n[2]+o3+n[3]+')',
        n[0]+o1+'(('+n[1]+o2+n[2]+')'+o3+n[3]+')',
        n[0]+o1+'('+n[1]+o2+'('+n[2]+o3+n[3]+'))',
      ];
      for (var e = 0; e < exprs.length; e++) {
        try {
          var r = window._mathEval(exprs[e]);
          if (Math.abs(r - 24) < 1e-9) return exprs[e];
        } catch(ex) {}
      }
    }
  }
  return null;
}

function _j24Perms(arr) {
  if (arr.length <= 1) return [arr.slice()];
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var rest = arr.slice(0,i).concat(arr.slice(i+1));
    var perms = _j24Perms(rest);
    for (var j = 0; j < perms.length; j++) result.push([arr[i]].concat(perms[j]));
  }
  return result;
}

function _j24GenPuzzle(level) {
  var cfg = _j24Levels[level] || _j24Levels.medio;
  for (var i = 0; i < 50; i++) {
    var nums = cfg.nums();
    if (_j24Solve(nums)) return nums;
  }
  return [1, 2, 3, 4];
}

function _j24Hint(nums) {
  var sol = _j24Solve(nums);
  if (!sol) return null;
  return sol.replace(/\*/g, '×').replace(/\//g, '÷');
}

var _j24State = {};

function _j24numFmt(n) {
  if (!isFinite(n)) return '?';
  if (Number.isInteger(n)) return String(n);
  // Show up to 2 decimal places, trimming trailing zeros
  var s = n.toFixed(2).replace(/\.?0+$/, '');
  return s;
}

function _j24applyOp(a, op, b) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') {
    if (Math.abs(b) < 1e-12) return NaN;
    return a / b;
  }
  return NaN;
}

function _j24Init(cid, level) {
  var nums = _j24GenPuzzle(level);
  var cfg  = _j24Levels[level] || _j24Levels.medio;
  var prev = _j24State[cid];
  _j24State[cid] = {
    level:    level,
    origNums: nums.slice(),
    timeLeft: cfg.time,
    timerID:  null,
    solved:   prev ? prev.solved   : 0,
    attempts: prev ? prev.attempts : 0,
    // step-by-step state
    available: nums.map(function(v, i){ return {val: v, id: i}; }),
    step1:    null,   // index in available for first number selected
    selOp:    null,   // operator selected
    history:  [],     // [{aLabel, op, bLabel, result, prevAvail}]
    done:     false
  };
  _j24Render(cid);
  _j24StartTimer(cid);
}

function _j24Render(cid) {
  var s = _j24State[cid];
  if (!s) return;
  var c = document.getElementById(cid);
  if (!c) return;

  // ── Number buttons ──
  var numBtns = c.querySelectorAll('.j24-num-btn');
  numBtns.forEach(function(btn, i) {
    if (i >= s.available.length) {
      btn.style.visibility = 'hidden';
      return;
    }
    btn.style.visibility = 'visible';
    btn.textContent = _j24numFmt(s.available[i].val);
    btn.className = 'j24-num-btn';
    btn.disabled = s.done;
    if (s.step1 === i) btn.classList.add('selected');
  });

  // ── Op buttons ──
  var opBtns = c.querySelectorAll('.j24-op-btn');
  opBtns.forEach(function(btn) {
    btn.className = 'j24-op-btn';
    if (s.step1 === null || s.done) { btn.classList.add('dimmed'); btn.disabled = true; return; }
    btn.disabled = false;
    if (btn.dataset.op === s.selOp) btn.classList.add('selected');
  });

  // ── Status message ──
  var statusEl = c.querySelector('.j24-status');
  if (statusEl && !s.done) {
    if (s.step1 === null) {
      statusEl.className = 'j24-status step1';
      statusEl.textContent = '① Seleciona o 1.º número';
    } else if (s.selOp === null) {
      statusEl.className = 'j24-status step2';
      statusEl.textContent = '② Seleciona o operador';
    } else {
      statusEl.className = 'j24-status step3';
      statusEl.textContent = '③ Seleciona o 2.º número';
    }
  } else if (statusEl && s.done) {
    statusEl.textContent = '';
  }

  // ── Step history ──
  var hist = c.querySelector('.j24-step-history');
  if (hist) {
    if (s.history.length === 0) {
      hist.innerHTML = '<span style="color:var(--ink4);font-size:.8rem;font-style:italic">As contas aparecerão aqui…</span>';
    } else {
      hist.innerHTML = s.history.map(function(h, idx) {
        var isLast = idx === s.history.length - 1;
        return '<div class="j24-step-row'+(isLast?' last-step':'')+'">'+
          '<span class="j24-sr-a">'+h.aLabel+'</span>'+
          '<span class="j24-sr-op">'+h.op+'</span>'+
          '<span class="j24-sr-b">'+h.bLabel+'</span>'+
          '<span class="j24-sr-eq">=</span>'+
          '<span class="j24-sr-res">'+_j24numFmt(h.result)+'</span>'+
        '</div>';
      }).join('');
    }
  }

  // ── Timer ──
  var timerEl = c.querySelector('.j24-timer');
  if (timerEl) {
    timerEl.textContent = s.timeLeft + 's';
    timerEl.classList.toggle('urgent', s.timeLeft <= 10);
  }

  // ── Stats ──
  var solEl = c.querySelector('.j24-stats-solved');
  if (solEl) solEl.textContent = s.solved;
  var attEl = c.querySelector('.j24-stats-att');
  if (attEl) attEl.textContent = s.attempts;
}

function _j24StartTimer(cid) {
  var s = _j24State[cid];
  if (!s) return;
  if (s.timerID) clearInterval(s.timerID);
  s.timerID = setInterval(function() {
    s.timeLeft--;
    _j24Render(cid);
    if (s.timeLeft <= 0) {
      clearInterval(s.timerID);
      s.done = true;
      _j24ShowResult(cid, 'err', '⏱️ Tempo esgotado! Gera um novo puzzle.');
    }
  }, 1000);
}

function _j24StopTimer(cid) {
  var s = _j24State[cid];
  if (s && s.timerID) { clearInterval(s.timerID); s.timerID = null; }
}

// ── User interactions ──

function j24SelNum(cid, avIdx) {
  var s = _j24State[cid];
  if (!s || s.done) return;
  _j24HideResult(cid);

  // Deselect if tapping the already-selected first number
  if (s.step1 === avIdx) {
    s.step1 = null;
    s.selOp = null;
    _j24Render(cid);
    return;
  }

  // If no first number selected yet → select it
  if (s.step1 === null) {
    s.step1 = avIdx;
    _j24Render(cid);
    return;
  }

  // First number is selected; if we also have an op → execute step
  if (s.selOp !== null) {
    _j24ExecuteStep(cid, avIdx);
    return;
  }

  // First number selected but no op yet → swap first number selection
  s.step1 = avIdx;
  _j24Render(cid);
}

function j24SelOp(cid, op) {
  var s = _j24State[cid];
  if (!s || s.done || s.step1 === null) return;
  s.selOp = (s.selOp === op) ? null : op;
  _j24HideResult(cid);
  _j24Render(cid);
}

function _j24ExecuteStep(cid, step2Idx) {
  var s = _j24State[cid];
  var a   = s.available[s.step1];
  var b   = s.available[step2Idx];
  var result = _j24applyOp(a.val, s.selOp, b.val);

  // Record step for history (save previous available for undo)
  s.history.push({
    aLabel:    _j24numFmt(a.val),
    op:        s.selOp,
    bLabel:    _j24numFmt(b.val),
    result:    result,
    prevAvail: s.available.slice()
  });

  // Build new available: remove a and b, add result
  var newAvail = [];
  var nextId = Date.now();
  for (var i = 0; i < s.available.length; i++) {
    if (i !== s.step1 && i !== step2Idx) newAvail.push(s.available[i]);
  }
  newAvail.push({ val: result, id: nextId });
  s.available = newAvail;
  s.step1 = null;
  s.selOp = null;

  // Check end condition
  if (s.available.length === 1) {
    s.attempts++;
    _j24StopTimer(cid);
    s.done = true;
    if (Math.abs(result - 24) < 1e-9) {
      s.solved++;
      var expr = s.history.map(function(h){ return h.aLabel+' '+h.op+' '+h.bLabel+' = '+_j24numFmt(h.result); }).join(' → ');
      _j24ShowResult(cid, 'ok', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 14.5c.828 0 1.5-.672 1.5-1.5V8H5.5A2.5 2.5 0 0 0 3 10.5v0A2.5 2.5 0 0 0 5.5 13H8"/><path d="M12 5a2 2 0 0 1 2 2v3"/><path d="M19 9c0 4.67-5 8-7 9-1.01-.52-2.06-1.23-3-2.08"/><path d="M2 2l20 20"/></svg></span> Parabéns! Chegaste ao 24! ' + expr);
    } else {
      _j24ShowResult(cid, 'err', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Resultado final: '+_j24numFmt(result)+' ≠ 24. Tenta outra combinação!');
    }
  }
  _j24Render(cid);
}

function j24Undo(cid) {
  var s = _j24State[cid];
  if (!s || s.history.length === 0) return;
  var last = s.history.pop();
  s.available = last.prevAvail;
  s.step1 = null;
  s.selOp = null;
  s.done  = false;
  _j24HideResult(cid);
  // Restart timer if it was stopped by the undo
  if (!s.timerID && s.timeLeft > 0) _j24StartTimer(cid);
  _j24Render(cid);
}

function j24Clear(cid) {
  var s = _j24State[cid];
  if (!s) return;
  s.available = s.origNums.map(function(v, i){ return {val: v, id: i}; });
  s.step1   = null;
  s.selOp   = null;
  s.history = [];
  s.done    = false;
  _j24HideResult(cid);
  if (!s.timerID && s.timeLeft > 0) _j24StartTimer(cid);
  _j24Render(cid);
}

// j24Build / j24AddParen / j24Verify kept as no-ops for compatibility
function j24Build(cid) {}
function j24AddParen(cid, p) {}
function j24Verify(cid) {}

function j24Hint(cid) {
  var s = _j24State[cid];
  if (!s) return;
  var hint = _j24Hint(s.origNums);
  if (hint) _j24ShowResult(cid, 'hint', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Uma solução: ' + hint.replace(/\*/g,'×').replace(/\//g,'÷'));
  else _j24ShowResult(cid, 'hint', '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Este puzzle não tem solução — gera um novo!');
}

function j24New(cid) {
  _j24StopTimer(cid);
  var s = _j24State[cid];
  var level = s ? s.level : 'medio';
  _j24Init(cid, level);
}

function j24SetLevel(cid, level, btn) {
  _j24StopTimer(cid);
  _j24Init(cid, level);
  var c = document.getElementById(cid);
  if (c) {
    c.querySelectorAll('.gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
  }
}

function _j24ShowResult(cid, type, msg) {
  var c = document.getElementById(cid);
  if (!c) return;
  var el = c.querySelector('.j24-result');
  if (!el) return;
  el.className = 'j24-result ' + type;
  el.textContent = msg || '';
  el.style.display = 'block';
}

function _j24HideResult(cid) {
  var c = document.getElementById(cid);
  if (!c) return;
  var el = c.querySelector('.j24-result');
  if (el) el.style.display = 'none';
}

function j24InitIfNeeded(cid, defaultLevel) {
  if (!_j24State[cid]) _j24Init(cid, defaultLevel || 'medio');
}

function _j24BuildHTML(cid, defaultLevel) {
  var lvl = defaultLevel || 'medio';
  return [
    '<div class="j24-card" id="'+cid+'">',
    '  <div class="j24-header">',
    '    <div class="j24-title"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12.5v.5"/><path d="M17 11.5v.5"/></svg></span> Jogo do 24</div>',
    '    <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">',
    '      <button class="btn btn-ghost" style="padding:6px 14px;font-size:.78rem" onclick="j24New(\''+cid+'\')">↺ Novo puzzle</button>',
    '    </div>',
    '  </div>',
    '  <p style="font-size:.85rem;color:var(--ink3);margin-bottom:1rem">Usa os <strong>4 números</strong> exactamente uma vez — combina dois de cada vez com +, −, ×, ÷. O resultado substitui os dois números. Chega ao <strong>24</strong>!</p>',
    '  <div class="level-bar" style="margin-bottom:1.25rem">',
    '    <div class="gen-level-group">',
    '      <span class="gen-level-label">Nível:</span>',
    '      <button class="gen-level-btn'+(lvl==='facil'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil</button>',
    '      <button class="gen-level-btn'+(lvl==='medio'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio</button>',
    '      <button class="gen-level-btn'+(lvl==='dificil'?' active':'')+'" onclick="j24SetLevel(\''+cid+'\',\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil</button>',
    '    </div>',
    '    <div class="j24-timer" style="margin-left:auto">90s</div>',
    '  </div>',
    '  <div class="j24-nums">',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',0)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',1)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',2)">?</button>',
    '    <button class="j24-num-btn" onclick="j24SelNum(\''+cid+'\',3)">?</button>',
    '  </div>',
    '  <div class="j24-status">① Seleciona o 1.º número</div>',
    '  <div class="j24-ops">',
    '    <button class="j24-op-btn" data-op="+" onclick="j24SelOp(\''+cid+'\',\'+\')">+</button>',
    '    <button class="j24-op-btn" data-op="-" onclick="j24SelOp(\''+cid+'\',\'-\')">−</button>',
    '    <button class="j24-op-btn" data-op="×" onclick="j24SelOp(\''+cid+'\',\'×\')">×</button>',
    '    <button class="j24-op-btn" data-op="÷" onclick="j24SelOp(\''+cid+'\',\'÷\')">÷</button>',
    '  </div>',
    '  <div class="j24-step-history"><span style="color:var(--ink4);font-size:.8rem;font-style:italic">As contas aparecerão aqui…</span></div>',
    '  <div class="j24-actions">',
    '    <button class="btn btn-ghost" onclick="j24Undo(\''+cid+'\')">↩ Desfazer passo</button>',
    '    <button class="btn btn-ghost" onclick="j24Clear(\''+cid+'\')">✕ Recomeçar</button>',
    '    <button class="btn btn-ghost" onclick="j24Hint(\''+cid+'\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> Dica</button>',
    '  </div>',
    '  <div class="j24-result"></div>',
    '  <div class="j24-stats">',
    '    Puzzles resolvidos: <span class="j24-stats-solved">0</span>',
    '    &nbsp;|&nbsp; Tentativas: <span class="j24-stats-att">0</span>',
    '  </div>',
    '</div>',
  ].join('\n');
}

var _j24Inited = {}; // legacy tracker (superseded by _gInited in the new game system)


// ═══════════════════════════════════════════════════════════════
// JOGOS — SISTEMA DE TABS + 4 JOGOS
// ═══════════════════════════════════════════════════════════════

// ── Tab switcher ──
function gTabSwitch(wrapId, tabName) {
  var wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.querySelectorAll('.g-tab').forEach(function(t){ t.classList.remove('active'); });
  wrap.querySelectorAll('.g-panel').forEach(function(p){ p.classList.remove('active'); });
  var tab = wrap.querySelector('[data-gtab="'+tabName+'"]');
  var panel = wrap.querySelector('[data-gpanel="'+tabName+'"]');
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
  // Lazy init
  var inst = _gInstances[wrapId];
  if (!inst) return;
  if (tabName === 'j24'  && !_j24State[wrapId+'-j24-game']) {
    var _j24GameId = wrapId+'-j24-game';
    var _j24Panel  = document.getElementById(wrapId+'-j24');
    if (_j24Panel && !_j24Panel.querySelector('.j24-card')) {
      _j24Panel.innerHTML = _j24BuildHTML(_j24GameId, inst.defaultLevel || 'medio');
      _j24Init(_j24GameId, inst.defaultLevel || 'medio');
    }
  }
  if (tabName === 'c4'   && !inst.c4)   { inst.c4   = new Game4Linha(wrapId+'-c4',   inst.qFn); }
  if (tabName === 'mine' && !inst.mine) { inst.mine = new GameMine(wrapId+'-mine', inst.qFn); }
  if (tabName === 'sdk'  && !inst.sdk)  { inst.sdk  = new GameSudoku(wrapId+'-sdk'); }
  if (tabName === 'hanoi'&& !inst.hanoi){ inst.hanoi= new GameHanoi(wrapId+'-hanoi', inst.qFn); }
  if (tabName === 'escape' && !inst.escape) { inst.escape = new GameEscapeRoom(wrapId+'-escape', inst.qFn); }
}

var _gInstances = {};

// Build the full jogos HTML for a wrapper div
function _gBuildJogos(wrapId, defaultLevel) {
  var wrap = document.getElementById(wrapId);
  if (!wrap) return;
  // Store question function and defaultLevel
  _gInstances[wrapId] = { qFn: function(level){ return _gGetQuestion(wrapId, level || defaultLevel || 'medio'); }, defaultLevel: defaultLevel || 'medio' };
  wrap.innerHTML = [
    '<div class="g-tabs">',
    '  <button class="g-tab active" data-gtab="j24"  onclick="gTabSwitch(\''+wrapId+'\',\'j24\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 12.5v.5"/><path d="M17 11.5v.5"/></svg></span> 24</button>',
    '  <button class="g-tab"        data-gtab="c4"   onclick="gTabSwitch(\''+wrapId+'\',\'c4\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 4 em Linha</button>',
    '  <button class="g-tab"        data-gtab="mine" onclick="gTabSwitch(\''+wrapId+'\',\'mine\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> Campo Minado</button>',
    '  <button class="g-tab"        data-gtab="sdk"  onclick="gTabSwitch(\''+wrapId+'\',\'sdk\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span> Sudoku</button>',
    '  <button class="g-tab"        data-gtab="hanoi" onclick="gTabSwitch(\''+wrapId+'\',\'hanoi\')"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22V4l-4 6h8l-4-6v18"/><path d="M9 10H3l3-6"/><path d="M15 10h6l-3-6"/></svg></span> Hanoi</button>',
    '  <button class="g-tab"        data-gtab="escape" onclick="gTabSwitch(\''+wrapId+'\',\'escape\')">🔐 Escape Room</button>',
    '</div>',
    '<div class="g-panel active" data-gpanel="j24"  id="'+wrapId+'-j24"></div>',
    '<div class="g-panel"        data-gpanel="c4"   id="'+wrapId+'-c4"></div>',
    '<div class="g-panel"        data-gpanel="mine" id="'+wrapId+'-mine"></div>',
    '<div class="g-panel"        data-gpanel="sdk"  id="'+wrapId+'-sdk"></div>',
    '<div class="g-panel"        data-gpanel="hanoi" id="'+wrapId+'-hanoi"></div>',
    '<div class="g-panel"        data-gpanel="escape" id="'+wrapId+'-escape"></div>',
  ].join('\n');
  // Init j24 immediately (default tab)
  // Must build the HTML first (like the old _j24AutoInit did), then init
  var _j24GameId = wrapId+'-j24-game';
  var _j24Panel  = document.getElementById(wrapId+'-j24');
  if (_j24Panel) { _j24Panel.innerHTML = _j24BuildHTML(_j24GameId, defaultLevel || 'medio'); }
  _j24Init(_j24GameId, defaultLevel || 'medio');
}

// ── Question provider: pulls from cap-specific question banks ──
function _gGetQuestion(wrapId, level) {
  // Determine cap from wrapId
  var cap = wrapId.indexOf('cap1') !== -1 ? 1
           : wrapId.indexOf('cap2') !== -1 ? 2
           : wrapId.indexOf('cap3') !== -1 ? 3
           : wrapId.indexOf('cap4') !== -1 ? 4 : 0;
  var pool = _gQuestionPool(cap, level);
  return pool[Math.floor(Math.random() * pool.length)];
}

function _gQuestionPool(cap, level) {
  // Returns [{q, opts:[4 strings], ans index 0-3}]
  var easy = level === 'facil';
  var hard = level === 'dificil';
  var pools = {
    1: [ // Inteiros
      {q:'-5 + 3 = ?', opts:['-2','-8','2','8'], ans:0},
      {q:'|−7| = ?', opts:['7','-7','0','49'], ans:0},
      {q:'-3 − (−5) = ?', opts:['2','-8','-2','8'], ans:0},
      {q:'−(−4) = ?', opts:['4','-4','0','-8'], ans:0},
      {q:'-8 + 12 = ?', opts:['4','-4','20','-20'], ans:0},
      {q:'|3 − 8| = ?', opts:['5','-5','11','-11'], ans:0},
      {q:'-2 × (-3) = ?', opts:['6','-6','5','-5'], ans:0},
      {q:'−4 − 3 + 7 = ?', opts:['0','-14','10','-10'], ans:0},
      {q:'Simétrico de −9 é?', opts:['9','-9','0','1'], ans:0},
      {q:'-6 ÷ (-2) = ?', opts:['3','-3','4','-4'], ans:0},
      {q:'-1 + (-1) + (-1) = ?', opts:['-3','3','-1','1'], ans:0},
      {q:'|−3| + |4| = ?', opts:['7','-7','1','-1'], ans:0},
    ],
    2: [ // Racionais
      {q:'1/2 + 1/4 = ?', opts:['3/4','1/2','2/6','1/6'], ans:0},
      {q:'3/4 − 1/4 = ?', opts:['1/2','2/8','1/4','3/8'], ans:0},
      {q:'2/3 × 3/4 = ?', opts:['1/2','5/7','6/12','1/3'], ans:0},
      {q:'0,5 = ?/10', opts:['5','2','50','1'], ans:0},
      {q:'25% de 80 = ?', opts:['20','25','40','15'], ans:0},
      {q:'1/3 + 1/6 = ?', opts:['1/2','2/9','1/4','3/9'], ans:0},
      {q:'10³ = ?', opts:['1000','300','100','10000'], ans:0},
      {q:'2⁻² = ?', opts:['1/4','-4','1/2','-1/4'], ans:0},
      {q:'0,001 em notação científica?', opts:['10⁻³','10³','10⁻²','10²'], ans:0},
      {q:'30% de 150 = ?', opts:['45','30','60','15'], ans:0},
      {q:'3/5 em decimal = ?', opts:['0,6','0,3','0,5','0,35'], ans:0},
      {q:'(-2)³ = ?', opts:['-8','8','-6','6'], ans:0},
    ],
    3: [ // Geometria
      {q:'Soma ângulos internos pentágono?', opts:['540°','360°','450°','720°'], ans:0},
      {q:'Ângulo interno polígono regular hexagonal?', opts:['120°','60°','90°','135°'], ans:0},
      {q:'Soma ângulos externos de qualquer polígono?', opts:['360°','180°','540°','720°'], ans:0},
      {q:'Área retângulo 6×4 = ?', opts:['24','20','48','10'], ans:0},
      {q:'Área triângulo base=8, altura=5 = ?', opts:['20','40','13','80'], ans:0},
      {q:'Num polígono regular com 8 lados, ângulo externo = ?', opts:['45°','60°','30°','40°'], ans:0},
      {q:'Ângulos alternos internos são?', opts:['iguais','suplementares','complementares','nulos'], ans:0},
      {q:'Quadrilátero com 4 lados iguais e 4 ângulos retos?', opts:['Quadrado','Rombo','Retângulo','Losango'], ans:0},
      {q:'Área paralelogramo base=7, alt=3 = ?', opts:['21','10','42','20'], ans:0},
      {q:'Polígono com 3 lados tem soma interna de?', opts:['180°','360°','90°','270°'], ans:0},
    ],
    4: [ // Álgebra
      {q:'Se aₙ = 2n+1, a₄ = ?', opts:['9','7','8','10'], ans:0},
      {q:'3x + 5 = 14, x = ?', opts:['3','4','2','5'], ans:0},
      {q:'2x − 4 = 6, x = ?', opts:['5','2','4','3'], ans:0},
      {q:'Simplifica: 4x − x = ?', opts:['3x','4x','x','5x'], ans:0},
      {q:'Se aₙ = 3n−2, a₅ = ?', opts:['13','15','10','12'], ans:0},
      {q:'7 − 2x = 1, x = ?', opts:['3','4','2','6'], ans:0},
      {q:'Valor de 2x²−1 para x=3?', opts:['17','11','5','19'], ans:0},
      {q:'Reduz: 5a + 3b − 2a − b = ?', opts:['3a+2b','7a+4b','3a+4b','2a+2b'], ans:0},
      {q:'Equação impossível: 2x+3=2x+?', opts:['5','3','0','2x'], ans:0},
      {q:'Razão da sequência: 5, 8, 11, 14…?', opts:['3','2','4','5'], ans:0},
    ],
  };
  // Multi-cap: mix
  if (cap === 0) {
    var all = [];
    [1,2,3,4].forEach(function(c){ all = all.concat(pools[c] || []); });
    return all;
  }
  return pools[cap] || pools[1];
}

// ═══════════════════════════════════════════════════════════════
// JOGO 1 — 4 EM LINHA
// ═══════════════════════════════════════════════════════════════
function Game4Linha(containerId, qFn) {
  var ROWS = 6, COLS = 7;
  var self = this;
  self.board = [];
  self.turn = 1;     // 1 or 2
  self.over = false;
  self.qFn = qFn;
  self.level = 'medio';
  self.pendingCol = null;
  self._answerLocked = false;
  self.score = {p1: 0, p2: 0};

  var NAMES = {1: 'Jogador 1', 2: 'Jogador 2'};

  var c = document.getElementById(containerId);
  if (!c) return;

  function init() {
    self.board = [];
    for (var r = 0; r < ROWS; r++) { self.board[r] = []; for (var col = 0; col < COLS; col++) self.board[r][col] = 0; }
    self.turn = 1; self.over = false; self.pendingCol = null; self._answerLocked = false;
    render();
    msg(NAMES[1] + ' — escolhe uma coluna!');
  }

  function render() {
    var statusTxt = '';
    if (!self.over) {
      statusTxt = self.pendingCol !== null
        ? NAMES[self.turn] + ' — responde à pergunta…'
        : NAMES[self.turn] + ' — escolhe uma coluna!';
    }
    var fnKey = containerId.replace(/-/g,'_');
    var html = [
      '<div class="c4-status">',
      '  <span><span class="c4-disc p1"></span> '+NAMES[1]+': <strong>'+self.score.p1+'</strong></span>',
      '  <span><span class="c4-disc p2"></span> '+NAMES[2]+': <strong>'+self.score.p2+'</strong></span>',
      '  <span style="margin-left:auto;font-size:.75rem">'+statusTxt+'</span>',
      '</div>',
      '<div style="overflow-x:auto;padding-bottom:.5rem"><div class="c4-board" id="'+containerId+'-bd">',
    ];
    for (var col = 0; col < COLS; col++) {
      var colDisabled = self.over || self.pendingCol !== null;
      var isPending = self.pendingCol === col;
      html.push('<div class="c4-col'+(colDisabled?' disabled':'')+(isPending?' c4-col-pending':'')+'" onclick="'+fnKey+'_c4ColClick('+col+')" data-col="'+col+'">');
      for (var row = 0; row < ROWS; row++) {
        var v = self.board[row][col];
        var cls = v===1?'p1':v===2?'p2':'';
        if (self.winCells && self.winCells.some(function(wc){return wc[0]===row&&wc[1]===col;})) cls += ' win';
        html.push('<div class="c4-cell '+cls+'"></div>');
      }
      html.push('</div>');
    }
    html.push('</div></div>');
    html.push('<div id="'+containerId+'-q" class="c4-question"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;min-height:2rem;font-size:.88rem;font-weight:600;color:var(--c2-mid)"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_c4New()">↺ Novo Jogo</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;flex-wrap:wrap;gap:.35rem"><div class="gen-level-group">'+
      '<button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '<button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '<button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_c4Level(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button>'+
      '</div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  function askQuestion(col) {
    var q = self.qFn(self.level);
    if (!q) return;
    self.currentQ = q;
    var qDiv = document.getElementById(containerId+'-q');
    if (!qDiv) return;
    var fnKey = containerId.replace(/-/g,'_');
    qDiv.innerHTML = '<div class="q-text">'
      + NAMES[self.turn]+' escolheu a coluna '+(col+1)+'. Responde corretamente para jogar aí:<br>'
      + '<strong style="font-size:1rem">'+q.q+'</strong></div>'
      + '<div class="c4-opts">'
      + q.opts.map(function(opt,i){
          return '<button class="c4-opt" onclick="'+fnKey+'_c4Ans('+i+',this)">'+opt+'</button>';
        }).join('')
      + '</div>';
  }

  var fnKey = containerId.replace(/-/g,'_');

  window[fnKey+'_c4ColClick'] = function(col) {
    if (self.over || self.pendingCol !== null) return;
    var row = dropRow(col);
    if (row < 0) { msg('Coluna cheia! Escolhe outra.'); return; }
    self.pendingCol = col;
    render();
    askQuestion(col);
  };

  window[fnKey+'_c4Ans'] = function(idx, btn) {
    if (self._answerLocked || self.pendingCol === null) return;
    self._answerLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var currentTurn = self.turn;
    var nextTurn = currentTurn === 1 ? 2 : 1;
    if (!correct) {
      var opts = document.querySelectorAll('#'+containerId+'-q .c4-opt');
      if (opts[self.currentQ.ans]) opts[self.currentQ.ans].classList.add('correct');
      msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Errado! Vez perdida — '+NAMES[nextTurn]+' joga a seguir.');
      setTimeout(function(){
        self._answerLocked = false;
        self.pendingCol = null;
        self.turn = nextTurn;
        render();
        msg(NAMES[self.turn]+' — escolhe uma coluna!');
      }, 1100);
    } else {
      var col = self.pendingCol;
      var row = dropRow(col);
      self.board[row][col] = currentTurn;
      self.pendingCol = null;
      self._answerLocked = false;
      if (checkWin(currentTurn)) {
        self.score['p'+currentTurn]++;
        render();
        msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> '+NAMES[currentTurn]+' ganhou!');
      } else {
        var draw = true;
        for (var cc = 0; cc < COLS; cc++) { if (dropRow(cc) >= 0) { draw = false; break; } }
        if (draw) { self.over = true; render(); msg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17V7l5-5 5 5 5-5v10l-5 5-5-5-5 5z"/></svg></span> Empate!'); }
        else {
          self.turn = nextTurn;
          render();
          msg(NAMES[self.turn]+' — escolhe uma coluna!');
        }
      }
    }
  };

  window[fnKey+'_c4New'] = function() { self.winCells = null; init(); };
  window[fnKey+'_c4Level'] = function(lv) { self.level = lv; self.winCells = null; init(); };

  function dropRow(col) {
    for (var r = ROWS-1; r >= 0; r--) { if (self.board[r][col] === 0) return r; }
    return -1;
  }

  function checkWin(player) {
    var cells = checkLine(player);
    if (cells) { self.winCells = cells; self.over = true; return true; }
    return false;
  }

  function checkLine(player) {
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      var dirs = [[0,1],[1,0],[1,1],[1,-1]];
      for (var d = 0; d < dirs.length; d++) {
        var cells = [];
        for (var k = 0; k < 4; k++) {
          var nr = r+dirs[d][0]*k, nc = col+dirs[d][1]*k;
          if (nr<0||nr>=ROWS||nc<0||nc>=COLS||self.board[nr][nc]!==player) break;
          cells.push([nr,nc]);
        }
        if (cells.length === 4) return cells;
      }
    }
    return null;
  }

  function msg(txt) {
    var el = document.getElementById(containerId+'-msg');
    if (el) el.textContent = txt;
  }

  init();
}

// JOGO 2 — CAMPO MINADO
// ═══════════════════════════════════════════════════════════════
function GameMine(containerId, qFn) {
  var self = this;
  var ROWS = 6, COLS = 8, MINES = 8;
  self.level = 'medio';
  self.qFn = qFn;
  self.grid = [];
  self.revealed = [];
  self.flagged = [];
  self.over = false;
  self.won = false;
  self.pendingCell = null;
  self.score = 0;
  self.safeRevealed = 0;

  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  function init() {
    self.grid = []; self.revealed = []; self.flagged = [];
    self.over = false; self.won = false; self.pendingCell = null;
    self.safeRevealed = 0;
    var total = ROWS * COLS;
    var mineSet = new Set();
    while (mineSet.size < MINES) mineSet.add(Math.floor(Math.random() * total));
    for (var r = 0; r < ROWS; r++) {
      self.grid[r] = []; self.revealed[r] = []; self.flagged[r] = [];
      for (var col = 0; col < COLS; col++) {
        var idx = r * COLS + col;
        self.grid[r][col] = mineSet.has(idx) ? -1 : 0;
        self.revealed[r][col] = false;
        self.flagged[r][col] = false;
      }
    }
    // Compute adjacency numbers
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      if (self.grid[r][col] === -1) continue;
      var cnt = 0;
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
        var nr = r+dr, nc = col+dc;
        if (nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&self.grid[nr][nc]===-1) cnt++;
      }
      self.grid[r][col] = cnt;
    }
    render();
  }

  var numColors = ['','#1565c0','#2e7d32','#c62828','#6a1b9a','#e65100','#00838f','#212121','#546e7a'];

  function render() {
    var safe = ROWS * COLS - MINES;
    var html = [
      '<div class="mine-legend">',
      '  <span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> '+MINES+' minas</span>',
      '  <span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span> Reveladas: '+self.safeRevealed+'/'+safe+'</span>',
      '  <span style="margin-left:auto">Pontos: <strong style="color:var(--c2-mid)">'+self.score+'</strong></span>',
      '</div>',
      '<div style="overflow-x:auto"><div class="mine-grid" style="grid-template-columns:repeat('+COLS+',1fr)" id="'+containerId+'-bd">',
    ];
    for (var r = 0; r < ROWS; r++) for (var col = 0; col < COLS; col++) {
      var rev = self.revealed[r][col], flag = self.flagged[r][col], v = self.grid[r][col];
      var cls = 'mine-cell';
      var content = '';
      if (rev) {
        cls += ' revealed';
        if (v === -1) { cls += ' mine-hit'; content = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v.5"/><path d="M22 9 19.5 11.5"/><path d="M14 9.01 14 9"/><path d="M2 11 4.5 13.5"/><path d="M8 11v.5"/><path d="M18 15l.5 3.5"/><path d="m5 19 .5-2.5"/><path d="M22 22 2 2"/></svg></span>'; }
        else if (v === 0) { cls += ' safe'; content = ''; }
        else { content = '<span style="color:'+numColors[v]+'">'+v+'</span>'; cls += ' safe'; }
      } else if (flag) { cls += ' flagged'; content = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>'; }
      else { cls += ' question-pending'; content = '<span class="mine-q-icon">?</span>'; }
      html.push('<div class="'+cls+'" onclick="'+fnKey+'_mineClick('+r+','+col+')" oncontextmenu="'+fnKey+'_mineFlag('+r+','+col+');return false">'+content+'</div>');
    }
    html.push('</div></div>');
    html.push('<div id="'+containerId+'-q" class="mine-question-box"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_mineNew()">↺ Novo Jogo</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group"><button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button><button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button><button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_mineLevel(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span></button></div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_mineClick'] = function(r, col) {
    if (self.over || self.revealed[r][col] || self.flagged[r][col] || self.pendingCell) return;
    if (self.grid[r][col] === -1) {
      // It's a mine — ask question to defuse!
      self.pendingCell = [r, col];
      var q = self.qFn(self.level); self.currentQ = q;
      var qBox = document.getElementById(containerId+'-q');
      if (!qBox) return;
      qBox.className = 'mine-question-box active';
      qBox.innerHTML = '<div style="font-size:.8rem;font-weight:700;color:var(--rose);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.41 0l1.59 1.59a2.41 2.41 0 0 1 0 3.41l-1.96 1.96"/></svg></span> Mina! Responde para a desativar:</div>'
        + '<div style="font-size:.92rem;font-weight:600;color:var(--ink);margin-bottom:.75rem">'+q.q+'</div>'
        + '<div class="c4-opts">'
        + q.opts.map(function(opt,i){ return '<button class="c4-opt" onclick="'+fnKey+'_mineAns('+i+',this)">'+opt+'</button>'; }).join('')
        + '</div>';
    } else {
      reveal(r, col);
      render();
      checkWin();
    }
  };

  window[fnKey+'_mineFlag'] = function(r, col) {
    if (self.over || self.revealed[r][col] || self.pendingCell) return;
    self.flagged[r][col] = !self.flagged[r][col];
    render();
  };

  window[fnKey+'_mineAns'] = function(idx, btn) {
    if (self._mineAnsLocked) return;
    self._mineAnsLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var qBox = document.getElementById(containerId+'-q');
    if (!correct) {
      var opts = qBox.querySelectorAll('.c4-opt');
      if (opts[self.currentQ.ans]) opts[self.currentQ.ans].classList.add('correct');
      var explodeCell = self.pendingCell; // capture now to avoid race condition
      setTimeout(function(){
        // Mine explodes
        self.revealed[explodeCell[0]][explodeCell[1]] = true;
        self.pendingCell = null;
        self._mineAnsLocked = false;
        self.over = true;
        render();
        var msg = document.getElementById(containerId+'-msg');
        if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v.5"/><path d="M22 9 19.5 11.5"/><path d="M14 9.01 14 9"/><path d="M2 11 4.5 13.5"/><path d="M8 11v.5"/><path d="M18 15l.5 3.5"/><path d="m5 19 .5-2.5"/><path d="M22 22 2 2"/></svg></span> Respondeste errado — mina explodiu! Pontos: <strong>'+self.score+'</strong>';
      }, 800);
    } else {
      self.score += (self.level==='facil'?1:self.level==='medio'?2:3);
      // Flag the mine (defused)
      var cell = self.pendingCell;
      self.flagged[cell[0]][cell[1]] = true;
      self.pendingCell = null;
      self._mineAnsLocked = false;
      if (qBox) qBox.className = 'mine-question-box';
      render();
      var msg = document.getElementById(containerId+'-msg');
      if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span> Mina desativada! +' + (self.level==='facil'?1:self.level==='medio'?2:3) + ' pontos';
    }
  };

  window[fnKey+'_mineNew'] = function() { init(); };
  window[fnKey+'_mineLevel'] = function(lv) { self.level = lv; init(); };

  function reveal(r, col) {
    if (r<0||r>=ROWS||col<0||col>=COLS||self.revealed[r][col]||self.flagged[r][col]) return;
    self.revealed[r][col] = true;
    self.safeRevealed++;
    if (self.grid[r][col] === 0) {
      for (var dr=-1;dr<=1;dr++) for (var dc=-1;dc<=1;dc++) reveal(r+dr,col+dc);
    }
  }

  function checkWin() {
    var safe = ROWS * COLS - MINES;
    if (self.safeRevealed >= safe) {
      self.won = true; self.over = true;
      render();
      var msg = document.getElementById(containerId+'-msg');
      if (msg) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Limpaste o campo! Pontos: <strong>'+self.score+'</strong>';
    }
  }

  init();
}

// ═══════════════════════════════════════════════════════════════
// JOGO 3 — SUDOKU 4×4 COM OPERAÇÕES (KenKen)
// ═══════════════════════════════════════════════════════════════
function GameSudoku(containerId) {
  var self = this;
  self.selected = null;
  self.activeNum = 0;
  self.level = 'medio';
  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  // ── 9×9 puzzle bank (solution + clues per difficulty) ──
  var PUZZLES = [
    { sol: [
        [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]],
      easy:  [[0,0],[0,1],[0,4],[0,6],[0,7],[1,1],[1,2],[1,5],[1,7],[2,0],[2,3],[2,5],[2,8],
              [3,0],[3,3],[3,6],[3,7],[4,1],[4,4],[4,7],[5,1],[5,2],[5,5],[5,8],
              [6,0],[6,3],[6,5],[6,8],[7,1],[7,3],[7,6],[7,8],[8,2],[8,4],[8,7],[8,8]],
      medio: [[0,0],[0,4],[0,6],[1,2],[1,5],[1,7],[2,0],[2,3],[2,8],
              [3,0],[3,3],[3,7],[4,4],[5,1],[5,5],[5,8],
              [6,0],[6,5],[6,8],[7,1],[7,3],[7,6],[8,4],[8,8]],
      dificil:[[0,0],[0,6],[1,5],[1,7],[2,3],[2,8],
               [3,0],[3,7],[4,4],[5,1],[5,8],
               [6,0],[6,5],[7,3],[7,6],[8,4],[8,8]]
    },
    { sol: [
        [1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],
        [2,1,4,3,6,5,8,9,7],[3,6,5,8,9,7,2,1,4],[8,9,7,2,1,4,3,6,5],
        [5,3,1,6,4,2,9,7,8],[6,4,2,9,7,8,5,3,1],[9,7,8,5,3,1,6,4,2]],
      easy:  [[0,0],[0,1],[0,3],[0,5],[0,7],[1,0],[1,2],[1,4],[1,6],[1,8],[2,1],[2,3],[2,5],[2,7],
              [3,0],[3,2],[3,4],[3,6],[3,8],[4,1],[4,3],[4,5],[4,7],[5,0],[5,2],[5,4],[5,6],[5,8],
              [6,1],[6,3],[6,5],[6,7],[7,0],[7,2],[7,4],[7,6],[7,8],[8,1],[8,3],[8,5],[8,7]],
      medio: [[0,0],[0,1],[0,3],[0,7],[1,0],[1,4],[1,8],[2,3],[2,7],
              [3,0],[3,4],[3,8],[4,3],[4,5],[5,0],[5,4],[5,8],
              [6,1],[6,5],[7,0],[7,4],[7,8],[8,1],[8,5],[8,7]],
      dificil:[[0,0],[0,3],[0,7],[1,4],[1,8],[2,7],
               [3,0],[3,8],[4,3],[4,5],[5,0],[5,8],
               [6,1],[7,0],[7,4],[8,5],[8,7]]
    },
    { sol: [
        [8,1,2,7,5,3,6,4,9],[9,4,3,6,8,2,1,7,5],[6,7,5,4,9,1,2,8,3],
        [1,2,8,3,7,5,9,6,4],[3,6,7,9,4,8,5,2,1],[5,9,4,2,1,6,7,3,8],
        [4,5,6,8,3,7,1,9,2],[7,8,9,1,2,4,3,5,6],[2,3,1,5,6,9,4,8,7]],
      easy:  [[0,0],[0,2],[0,4],[0,7],[1,0],[1,3],[1,5],[1,8],[2,1],[2,4],[2,6],
              [3,0],[3,3],[3,6],[3,8],[4,2],[4,4],[4,6],[5,0],[5,2],[5,5],[5,8],
              [6,1],[6,3],[6,5],[6,8],[7,0],[7,3],[7,6],[7,8],[8,1],[8,4],[8,7]],
      medio: [[0,0],[0,4],[0,7],[1,3],[1,8],[2,1],[2,6],
              [3,0],[3,3],[3,8],[4,4],[5,0],[5,5],[5,8],
              [6,1],[6,5],[6,8],[7,0],[7,3],[7,6],[8,4],[8,7]],
      dificil:[[0,0],[0,7],[1,3],[1,8],[2,6],
               [3,0],[3,8],[4,4],[5,0],[5,8],
               [6,1],[6,8],[7,3],[7,6],[8,4]]
    }
  ];

  function init(levelOverride) {
    if (levelOverride) self.level = levelOverride;
    var puz = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    self.puzzle = puz;
    self.solution = puz.sol;
    var clues = puz[self.level] || puz.medio;
    self.givenSet = new Set(clues.map(function(rc){ return rc[0]+','+rc[1]; }));
    self.userGrid = [];
    for (var r = 0; r < 9; r++) {
      self.userGrid[r] = [0,0,0,0,0,0,0,0,0];
    }
    clues.forEach(function(rc){ self.userGrid[rc[0]][rc[1]] = puz.sol[rc[0]][rc[1]]; });
    self.selected = null;
    self.activeNum = 0;
    render();
  }

  function validPlace(r, col, val) {
    for (var i = 0; i < 9; i++) {
      if (i !== col && self.userGrid[r][i] === val) return false;
      if (i !== r   && self.userGrid[i][col] === val) return false;
    }
    var br = Math.floor(r/3)*3, bc = Math.floor(col/3)*3;
    for (var dr = 0; dr < 3; dr++) for (var dc = 0; dc < 3; dc++) {
      var nr = br+dr, nc = bc+dc;
      if ((nr !== r || nc !== col) && self.userGrid[nr][nc] === val) return false;
    }
    return true;
  }

  function isSameGroup(r1, c1, r2, c2) {
    return r1 === r2 || c1 === c2 ||
      (Math.floor(r1/3) === Math.floor(r2/3) && Math.floor(c1/3) === Math.floor(c2/3));
  }

  function render() {
    var sr = self.selected ? self.selected[0] : -1;
    var sc = self.selected ? self.selected[1] : -1;
    var selVal = (sr >= 0 && self.userGrid[sr][sc]) ? self.userGrid[sr][sc] : 0;

    var html = [
      '<p style="font-size:.82rem;color:var(--ink3);margin-bottom:.5rem">Preenche a grelha — cada linha, coluna e bloco 3×3 deve ter os números 1 a 9.</p>',
      '<div class="sdk-difficulty">',
        '<button class="sdk-dif-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'facil\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Fácil</button>',
        '<button class="sdk-dif-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'medio\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Médio</button>',
        '<button class="sdk-dif-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_sdkLevel(\'dificil\')"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> Difícil</button>',
      '</div>',
      '<div class="sdk-wrap"><div class="sdk-grid">'
    ];

    // 9 blocks (3×3 each), arranged 3×3
    for (var br = 0; br < 3; br++) {
      for (var bc = 0; bc < 3; bc++) {
        html.push('<div class="sdk-group">');
        for (var dr = 0; dr < 3; dr++) {
          for (var dc = 0; dc < 3; dc++) {
            var r = br*3+dr, col = bc*3+dc;
            var val = self.userGrid[r][col];
            var isGiven = self.givenSet.has(r+','+col);
            var isSel = r === sr && col === sc;
            var isHl = !isSel && sr >= 0 && isSameGroup(r, col, sr, sc);
            var isSameNum = !isSel && selVal && val === selVal;
            var isErr = val && !isGiven && !validPlace(r, col, val);
            var cls = 'sdk-cell';
            if (isGiven) cls += ' given';
            else if (isErr) cls += ' error';
            else if (val) cls += ' correct-fill';
            if (isSel) cls += ' selected';
            else if (isSameNum) cls += ' selected';
            else if (isHl) cls += ' highlight';
            html.push('<div class="'+cls+'" onclick="'+fnKey+'_sdkSel('+r+','+col+')">'+(val||'')+'</div>');
          }
        }
        html.push('</div>');
      }
    }

    html.push('</div></div>');

    // Numpad 1-9 + delete
    html.push('<div class="sdk-numpad">');
    for (var n = 1; n <= 9; n++) {
      var isActive = self.activeNum === n ? ' active-num' : '';
      html.push('<button class="sdk-key'+isActive+'" onclick="'+fnKey+'_sdkNum('+n+')">'+n+'</button>');
    }
    html.push('<button class="sdk-key del" onclick="'+fnKey+'_sdkNum(0)">⌫</button>');
    html.push('</div>');

    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-primary" onclick="'+fnKey+'_sdkCheck()">✓ Verificar</button>');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_sdkNew()">↺ Novo puzzle</button>');
    html.push('</div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_sdkSel'] = function(r, col) {
    if (self.givenSet.has(r+','+col)) {
      self.selected = [r, col]; // allow highlight but not edit
    } else {
      self.selected = [r, col];
      if (self.activeNum > 0) {
        self.userGrid[r][col] = self.activeNum;
      }
    }
    render();
  };

  window[fnKey+'_sdkNum'] = function(n) {
    self.activeNum = (self.activeNum === n && n > 0) ? 0 : n;
    if (self.selected) {
      var r = self.selected[0], col = self.selected[1];
      if (!self.givenSet.has(r+','+col)) {
        self.userGrid[r][col] = n;
      }
    }
    render();
  };

  window[fnKey+'_sdkLevel'] = function(lvl) { init(lvl); };

  window[fnKey+'_sdkCheck'] = function() {
    var sol = self.solution;
    var allFilled = true, allCorrect = true;
    outer: for (var r = 0; r < 9; r++) for (var col = 0; col < 9; col++) {
      if (!self.userGrid[r][col]) { allFilled = false; allCorrect = false; break outer; }
      if (self.userGrid[r][col] !== sol[r][col]) allCorrect = false;
    }
    var msg = document.getElementById(containerId+'-msg');
    if (!msg) return;
    if (!allFilled) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Preenche todas as células primeiro.';
    else if (allCorrect) msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Parabéns! Sudoku resolvido corretamente!';
    else msg.innerHTML = '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Há erros — verifica as células marcadas a vermelho.';
  };

  window[fnKey+'_sdkNew'] = function() { init(); };

  init();
}

// ═══════════════════════════════════════════════════════════════
// JOGO 4 — TORRE DE HANOI COM QUESTÕES
// ═══════════════════════════════════════════════════════════════
function GameHanoi(containerId, qFn) {
  var self = this;
  self.level = 'medio';
  self.qFn = qFn;
  self.disks = 3;
  self.pegs = [[], [], []];   // each peg: array of disk sizes (largest first)
  self.selected = null;       // index of peg with selected disk
  self.moves = 0;
  self.minMoves = 0;
  self.over = false;
  self.pendingFrom = null;
  self.score = 0;
  self._hanoiAnsLocked = false;

  var c = document.getElementById(containerId);
  if (!c) return;
  var fnKey = containerId.replace(/-/g,'_');

  var diskColors = [
    'linear-gradient(135deg,#516860,#77998E)',
    'linear-gradient(135deg,#AB9790,#c4b0a9)',
    'linear-gradient(135deg,#d97706,#f59e0b)',
    'linear-gradient(135deg,#6d28d9,#8b5cf6)',
    'linear-gradient(135deg,#c4796e,#e8a89e)',
  ];

  function init() {
    self.disks = self.level === 'facil' ? 3 : self.level === 'medio' ? 4 : 5;
    self.pegs = [[], [], []];
    for (var i = self.disks; i >= 1; i--) self.pegs[0].push(i);
    self.selected = null; self.moves = 0; self.over = false; self.pendingFrom = null;
    self.minMoves = Math.pow(2, self.disks) - 1;
    render();
  }

  function render() {
    var POLE_H = 160, DISK_H = 22, DISK_MAX_W = 160, DISK_MIN_W = 36;
    var html = [
      '<p style="font-size:.82rem;color:var(--ink3);margin-bottom:.5rem">Move todos os discos para o pino direito. Não podes colocar um disco maior sobre um menor. Responde às questões para mover!</p>',
      '<div class="hanoi-moves">Movimentos: <strong>'+self.moves+'</strong> / mínimo: '+self.minMoves+'</div>',
      '<div class="hanoi-arena" id="'+containerId+'-arena" style="position:relative;height:'+(POLE_H+30)+'px;display:flex;align-items:flex-end;justify-content:space-around;padding:0 1rem 10px">',
    ];
    var pegLabels = ['A','B','C'];
    for (var p = 0; p < 3; p++) {
      var peg = self.pegs[p];
      var isSel = self.selected === p;
      html.push('<div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;flex:1" onclick="'+fnKey+'_hanoiPeg('+p+')">');
      html.push('<div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);width:8px;height:'+POLE_H+'px;border-radius:4px 4px 0 0;background:'+(isSel?'var(--c2-mid)':'var(--border2)')+';transition:background .2s"></div>');
      html.push('<div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:80px;height:10px;border-radius:5px;background:var(--border2)"></div>');
      html.push('<div style="position:absolute;bottom:18px;font-size:.7rem;font-weight:700;color:var(--ink4)">'+pegLabels[p]+'</div>');
      // Disks (bottom to top)
      for (var d = 0; d < peg.length; d++) {
        var diskSize = peg[d];
        var w = DISK_MIN_W + (diskSize-1) * (DISK_MAX_W - DISK_MIN_W) / (self.disks - 1 || 1);
        var yFromBottom = 10 + d * (DISK_H + 3);
        var isTop = d === peg.length - 1;
        var style = [
          'position:absolute',
          'bottom:'+yFromBottom+'px',
          'left:50%',
          'transform:translateX(-50%)'+(isTop&&isSel?' translateY(-10px)':''),
          'width:'+Math.round(w)+'px',
          'height:'+DISK_H+'px',
          'background:'+diskColors[(diskSize-1) % diskColors.length],
          'border-radius:8px',
          'display:flex;align-items:center;justify-content:center',
          'font-family:JetBrains Mono,monospace;font-size:.72rem;font-weight:700;color:#fff',
          'border:2px solid rgba(255,255,255,.25)',
          'transition:transform .2s',
          'z-index:'+(isTop&&isSel?'10':'1'),
          'box-shadow: 0 2px 6px rgba(0,0,0,.2)',
        ].join(';');
        html.push('<div style="'+style+'">'+diskSize+'</div>');
      }
      html.push('</div>');
    }
    html.push('</div>');
    html.push('<div id="'+containerId+'-q" class="hanoi-question"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_hanoiNew()">↺ Reiniciar</button>');
    html.push('<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group"><button class="gen-level-btn'+(self.level==='facil'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'facil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#4caf50;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 3</button><button class="gen-level-btn'+(self.level==='medio'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'medio\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#f59e0b;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 4</button><button class="gen-level-btn'+(self.level==='dificil'?' active':'')+'" onclick="'+fnKey+'_hanoiLevel(\'dificil\',this)"><span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:#ef4444;vertical-align:middle;flex-shrink:0;margin-right:1px"></span> 5</button></div></div>');
    html.push('</div>');
    c.innerHTML = html.join('');
  }

  window[fnKey+'_hanoiPeg'] = function(pegIdx) {
    if (self.over || self._hanoiAnsLocked || self.pendingFrom !== null) return;
    if (self.selected === null) {
      // Select peg if it has disks
      if (self.pegs[pegIdx].length === 0) { setMsg('Pino vazio!'); return; }
      self.selected = pegIdx;
      render();
    } else {
      var from = self.selected;
      if (from === pegIdx) { self.selected = null; render(); return; }
      // Validate move
      var fromPeg = self.pegs[from], toPeg = self.pegs[pegIdx];
      var disk = fromPeg[fromPeg.length - 1];
      if (toPeg.length > 0 && toPeg[toPeg.length-1] < disk) {
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Não podes colocar '+disk+' sobre '+toPeg[toPeg.length-1]+'!');
        self.selected = null; render(); return;
      }
      // Ask question before completing move
      self.pendingFrom = from; self.pendingTo = pegIdx;
      self.selected = null;
      askQuestion();
    }
  };

  function askQuestion() {
    var q = self.qFn(self.level); self.currentQ = q;
    var qDiv = document.getElementById(containerId+'-q');
    if (!qDiv) return;
    qDiv.className = 'hanoi-question active';
    qDiv.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--c2-mid);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22V4l-4 6h8l-4-6v18"/><path d="M9 10H3l3-6"/><path d="M15 10h6l-3-6"/></svg></span> Responde para mover o disco:</div>'
      + '<div style="font-size:.9rem;font-weight:600;color:var(--ink);margin-bottom:.75rem">'+q.q+'</div>'
      + '<div class="c4-opts">'
      + q.opts.map(function(opt,i){ return '<button class="c4-opt" onclick="'+fnKey+'_hanoiAns('+i+',this)">'+opt+'</button>'; }).join('')
      + '</div>';
  }

  window[fnKey+'_hanoiAns'] = function(idx, btn) {
    if (self._hanoiAnsLocked) return;
    self._hanoiAnsLocked = true;
    var correct = idx === self.currentQ.ans;
    btn.classList.add(correct ? 'correct' : 'wrong');
    var qDiv = document.getElementById(containerId+'-q');
    if (!correct) {
      if (qDiv) { var opts=qDiv.querySelectorAll('.c4-opt'); if(opts[self.currentQ.ans])opts[self.currentQ.ans].classList.add('correct'); }
      setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span> Errado — movimento cancelado!');
      setTimeout(function(){
        self.pendingFrom = null; self.pendingTo = null;
        self._hanoiAnsLocked = false;
        if(qDiv)qDiv.className='hanoi-question'; render();
      }, 900);
    } else {
      // Execute move
      var disk = self.pegs[self.pendingFrom].pop();
      self.pegs[self.pendingTo].push(disk);
      self.moves++;
      self.pendingFrom = null; self.pendingTo = null;
      self._hanoiAnsLocked = false;
      if (qDiv) qDiv.className = 'hanoi-question';
      // Check win
      if (self.pegs[2].length === self.disks) {
        self.over = true;
        self.score++;
        render();
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span> Completaste em '+self.moves+' movimentos! (mínimo: '+self.minMoves+')');
      } else {
        render();
        setMsg('<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span> Disco movido!');
      }
    }
  };

  window[fnKey+'_hanoiNew'] = function() { init(); };
  window[fnKey+'_hanoiLevel'] = function(lv) { self.level = lv; init(); };

  function setMsg(txt) {
    var el = document.getElementById(containerId+'-msg');
    if (el) el.innerHTML = txt;
  }

  init();
}

// ── Updated _j24AutoInit to use new system ──
var _gInited = {};
function _j24AutoInit(wrapId, defaultLevel) {
  if (_gInited[wrapId]) return;
  _gInited[wrapId] = true;
  _gBuildJogos(wrapId, defaultLevel);
}

// ── UX 3: SCROLL TO TOP + SECTION INDICATOR ──
// ═══════════════════════════════════════════════════════════════
(function(){
  var btn=document.getElementById('scrollTopBtn');
  var ind=document.getElementById('sectionIndicator');
  if(!btn)return;
  var ticking=false;
  function onScroll(){
    var y=window.scrollY;
    btn.classList.toggle('visible',y>400);
    var label='';
    document.querySelectorAll('.tab-btn.active').forEach(function(t){label=t.textContent.trim();});
    if(label&&y>300){ind.textContent=label;ind.classList.add('visible');}
    else{ind.classList.remove('visible');}
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});
})();

// ═══════════════════════════════════════════════════════════════
// UX 4: KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown',function(e){
  var tag=document.activeElement.tagName;
  var isInput=tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT';
  // Enter on focused option btn
  if(e.key==='Enter'&&document.activeElement.classList.contains('option-btn')&&!document.activeElement.disabled){
    document.activeElement.click();e.preventDefault();return;
  }
  // Arrow keys in quiz options
  if((e.key==='ArrowDown'||e.key==='ArrowUp')&&document.activeElement.classList.contains('option-btn')){
    var par=document.activeElement.parentElement;
    var btns=Array.from(par.querySelectorAll('.option-btn'));
    var i=btns.indexOf(document.activeElement);
    if(e.key==='ArrowDown'&&i<btns.length-1){btns[i+1].focus();e.preventDefault();}
    if(e.key==='ArrowUp'&&i>0){btns[i-1].focus();e.preventDefault();}
    return;
  }
  if(isInput)return;
  // P for professor mode
  if(e.key==='p'||e.key==='P'){
    var pt=document.querySelector('.prof-toggle');if(pt)pt.click();
  }
  // Escape closes search
  if(e.key==='Escape'){var sr=document.getElementById('searchResults');if(sr)sr.classList.remove('open');}
});
// Add keyboard hints to first few quiz questions
document.querySelectorAll('.quiz-question').forEach(function(q,i){
  if(i>=3)return;
  var opts=q.querySelector('.options');
  if(!opts)return;
  var h=document.createElement('div');h.className='kbd-hint';
  h.innerHTML='<kbd>↑↓</kbd> navegar · <kbd>Enter</kbd> confirmar';
  opts.after(h);
});

// ═══════════════════════════════════════════════════════════════
// UX 5: PROFESSOR MODE
// ═══════════════════════════════════════════════════════════════
var professorMode={};
try{professorMode=JSON.parse(localStorage.getItem('edupt_prof')||'{}');}catch(e){}
function toggleProfMode(el,cap){
  professorMode[cap]=!professorMode[cap];
  el.classList.toggle('active');
  try{localStorage.setItem('edupt_prof',JSON.stringify(professorMode));}catch(e){}
}
// Restore
Object.keys(professorMode).forEach(function(k){
  if(professorMode[k]){var el=document.getElementById('profToggle'+k);if(el)el.classList.add('active');}
});

// ── Professor Mode: Answer Keys ──
var profAnswers = {
  1: { // Cap 1 - Números Inteiros
    titulo: 'Números Inteiros (ℤ) — 7.º Ano',
    respostas: [
      {q:'1', r:'−8, +500, −200, −4, +10000, −75', expl:'Abaixo de zero / perda / profundidade → negativo. Lucro / ganho / altitude → positivo.'},
      {q:'2', r:'a) F  b) V  c) V  d) F  e) V', expl:'a) 0 não pertence a ℤ⁺ (apenas ℤ₀⁺). d) O menor inteiro positivo é 1, não existe "menor" em ℤ⁻.'},
      {q:'3', r:'−7, −6, −3, −1, 0, 2, 4, 5', expl:'Quanto mais à esquerda na reta numérica, menor é o número. Negativos antes do zero, positivos depois.'},
      {q:'4', r:'a) |−9| = 9  b) |+6| = 6  c) |0| = 0  d) |−15| = 15  e) |−23| = 23  f) |+1| = 1', expl:'O valor absoluto mede a distância à origem: |a| é sempre ≥ 0. Remove-se o sinal.'},
      {q:'5', r:'a) sim(−4) = 4  b) sim(7) = −7  c) sim(0) = 0  d) sim(−11) = 11  e) sim(18) = −18  f) sim(−25) = 25', expl:'O simétrico troca o sinal: sim(a) = −a. O simétrico de 0 é 0.'},
      {q:'6', r:'a) |−7| > |3| pois 7 > 3  b) |−5| = |5| pois ambos = 5  c) |12| > |−9| pois 12 > 9  d) |−2| < |−8| pois 2 < 8', expl:'Compara-se os valores absolutos (sem sinal).'},
      {q:'7', r:'a) (−3)+(+7) = +4  b) (+8)+(−3) = +5  c) (−6)+(−5) = −11  d) (+2)+(−6) = −4', expl:'Mesmo sinal → soma e mantém sinal. Sinais diferentes → subtrai e fica o sinal do maior |valor|.'},
      {q:'8', r:'a) (−5)+(+3) = −2  b) (−7)+(−4) = −11  c) (+9)+(−9) = 0  d) (+4)−(−6) = 10  e) (−3)−(+8) = −11  f) (−2)−(−5) = 3', expl:'Subtrair é somar o simétrico: a − b = a + (−b). Ex: 4−(−6) = 4+6 = 10.'},
      {q:'9 (mergulhador)', r:'−12 + 7 = −5 m', expl:'Estava a −12, subiu 7: soma algébrica. −12 + 7 = −5. Continua abaixo da superfície.'},
      {q:'10 (simplificar)', r:'a) 3−(−5)+(−2) = 3+5−2 = 6  b) −(+4−2+3) = −4+2−3 = −5  c) −[6−(2−8)] = −[6−(−6)] = −[12] = −12  d) 5−{3−[−2+(4−7)]} = 5−{3−[−5]} = 5−8 = −3', expl:'Regra: sinal − antes de parênteses inverte TODOS os sinais dentro. Resolve de dentro para fora.'},
      {q:'11 (Monte Branco)', r:'4808 − (−430) = 4808 + 430 = 5238 m', expl:'Diferença de altitudes = altitude mais alta menos a mais baixa. Mar Morto está a −430 m.'}
    ],
    teste_respostas: [
      {q:'1', r:'B) −1', expl:'ℤ⁻ = inteiros negativos = {…, −3, −2, −1}. O 0 não pertence a ℤ⁻.'},
      {q:'2', r:'C) 11', expl:'|−8| + |+3| = 8 + 3 = 11. O valor absoluto remove o sinal.'},
      {q:'3', r:'B) −3 > −9', expl:'Na reta numérica, −3 está à direita de −9, logo é maior.'},
      {q:'4', r:'C) 3', expl:'(−5) − (−8) = −5 + 8 = 3. Subtrair negativo = somar positivo.'},
      {q:'5', r:'−9', expl:'−[4 − (2 − 7)] = −[4 − (−5)] = −[4 + 5] = −9.'},
      {q:'6', r:'−1', expl:'6 − (−3) + (−8) − 2 = 6 + 3 − 8 − 2 = 9 − 10 = −1.'},
      {q:'7', r:'5238 m', expl:'4808 − (−430) = 4808 + 430 = 5238 m de diferença.'}
    ]
  },
  2: { // Cap 2 - Números Racionais
    titulo: 'Números Racionais (ℚ) — 7.º Ano',
    respostas: [
      {q:'Frações equivalentes', r:'Multiplica ou divide numerador e denominador pelo mesmo número ≠ 0', expl:'Ex: 2/3 = 4/6 = 6/9. Para simplificar: divide pelo MDC.'},
      {q:'Comparação de frações', r:'Reduzir ao mesmo denominador (MMC) e comparar numeradores', expl:'Ex: 2/3 vs 3/5 → 10/15 vs 9/15 → 2/3 > 3/5.'},
      {q:'Adição de frações', r:'Mesmo denominador: soma numeradores. Diferentes: reduz ao MMC', expl:'Ex: 1/4 + 2/3 = 3/12 + 8/12 = 11/12.'},
      {q:'Percentagens', r:'x% de A = (x/100) × A', expl:'Ex: 25% de 80 = 0,25 × 80 = 20. Desconto: preço × (1 − taxa).'},
      {q:'Potências', r:'aⁿ = a × a × … × a (n vezes)', expl:'Regras: aⁿ × aᵐ = aⁿ⁺ᵐ | aⁿ ÷ aᵐ = aⁿ⁻ᵐ | (aⁿ)ᵐ = aⁿˣᵐ | a⁰ = 1.'},
      {q:'Notação científica', r:'a × 10ⁿ onde 1 ≤ a < 10', expl:'Ex: 45000 = 4,5 × 10⁴ | 0,003 = 3 × 10⁻³.'}
    ],
    teste_respostas: [
      {q:'Escolha múltipla', r:'Ver soluções detalhadas na ficha', expl:'Cada questão de EM tem 4 opções. A resposta errada mais comum está identificada.'}
    ]
  },
  3: { // Cap 3 - Geometria
    titulo: 'Geometria — 7.º Ano',
    respostas: [
      {q:'Soma ângulos internos', r:'S = (n−2) × 180°', expl:'Triângulo: 180° | Quadrilátero: 360° | Pentágono: 540° | Hexágono: 720°. Cada ângulo regular = S ÷ n.'},
      {q:'Ângulos externos', r:'Soma sempre = 360°', expl:'Qualquer polígono convexo. Cada ângulo externo regular = 360° ÷ n. Interno + Externo = 180°.'},
      {q:'Retas paralelas', r:'Alternos internos: iguais | Correspondentes: iguais | Co-internos: suplementares (180°)', expl:'Verticalmente opostos: sempre iguais (não depende de paralelismo).'},
      {q:'Paralelogramo', r:'Lados opostos iguais e paralelos | Ângulos opostos iguais | Adjacentes suplementares', expl:'Diagonais bissetam-se. Retângulo: ângulos 90°. Losango: lados todos iguais.'},
      {q:'Áreas', r:'Triângulo: (b×h)/2 | Paralelogramo: b×h | Trapézio: (B+b)×h/2 | Losango: (d₁×d₂)/2 | Círculo: πr²', expl:'Atenção às unidades! Área em cm², m², etc.'}
    ],
    teste_respostas: [
      {q:'1', r:'C) 10 lados', expl:'1440 ÷ 180 = 8 → n − 2 = 8 → n = 10. Decágono.'},
      {q:'2', r:'B) Octógono', expl:'360° ÷ 45° = 8 lados.'},
      {q:'3', r:'B) 110°', expl:'Co-internos são suplementares: 180° − 70° = 110°.'},
      {q:'4', r:'A) 18 cm²', expl:'A = (8+4)/2 × 3 = 6 × 3 = 18 cm².'},
      {q:'5', r:'127°', expl:'Soma pentágono = 540°. 540 − 100 − 115 − 90 − 108 = 127°.'},
      {q:'6', r:'125°, 55°, 125°, 55°', expl:'Opostos iguais: 125°. Adjacentes suplementares: 180° − 125° = 55°.'},
      {q:'7', r:'30 cm²', expl:'A = (10 × 6) / 2 = 30 cm².'},
      {q:'8', r:'65,12 cm²', expl:'Paralelogramo: 8×5 = 40. Semicírculo: π×4²/2 = 25,12. Total: 65,12 cm².'}
    ]
  },
  4: { // Cap 4 - Sequências, Expressões e Equações
    titulo: 'Sequências, Expressões Algébricas e Equações — 7.º Ano',
    respostas: [
      {q:'Termo geral', r:'Encontrar a regra que dá o n-ésimo termo', expl:'Ex: 2, 5, 8, 11… → aₙ = 3n − 1. Verificar: a₁ = 3(1)−1 = 2 ✓'},
      {q:'Expressões algébricas', r:'Simplificar juntando termos semelhantes', expl:'Ex: 3x + 2y − x + 5y = 2x + 7y. Só se juntam termos com a mesma parte literal.'},
      {q:'Equações 1.º grau', r:'Isolar a incógnita: passar termos, dividir pelo coeficiente', expl:'Ex: 2x + 3 = 11 → 2x = 8 → x = 4. Verificação: 2(4)+3 = 11 ✓.'},
      {q:'Classificação', r:'Possível determinada (1 solução) | Impossível (0 soluções) | Indeterminada (∞ soluções)', expl:'PD: 2x = 6 → x=3 | PI: 0x = 5 (impossível) | PID: 0x = 0 (qualquer x).'}
    ],
    teste_respostas: [
      {q:'Sequências', r:'Identificar padrão, escrever termo geral, calcular termos', expl:'Verificar sempre substituindo n = 1, 2, 3 para confirmar.'},
      {q:'Equações', r:'Resolver passo a passo mostrando todas as transformações', expl:'IAVE exige: cada passo justificado. Resposta sem desenvolvimento = 0 pontos.'}
    ]
  }
};

// Inject solutions into PDF HTML
function injectProfSolutions(html, cap) {
  if (!cap || !professorMode[cap]) return html;
  
  var profBar = '<div style="background:#c62828;color:white;padding:14px 24px;font-family:sans-serif;font-weight:700;font-size:15px;text-align:center;margin-bottom:24px;border-radius:8px;letter-spacing:.5px">VERSÃO PROFESSOR — COM SOLUÇÕES DETALHADAS</div>';
  html = html.replace('<body>', '<body>' + profBar);
  
  var answers = profAnswers[cap];
  if (answers) {
    var solStyle = '';
    html = html.replace('</head>', solStyle + '</head>');
    
    // Build detailed answer key
    var keyHTML = '<div class="prof-key"><h2>Resolução Completa — ' + (answers.titulo || 'Capítulo ' + cap) + '</h2>';
    
    if (answers.respostas && answers.respostas.length) {
      keyHTML += '<h3 style="color:#c62828;margin:20px 0 12px;font-size:1.05rem">Ficha de Trabalho</h3>';
      answers.respostas.forEach(function(r) {
        keyHTML += '<div class="prof-q"><div class="q-num">' + r.q + '.</div><div class="q-ans">' + r.r + '</div><div class="q-expl"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> ' + r.expl + '</div></div>';
      });
    }
    
    if (answers.teste_respostas && answers.teste_respostas.length) {
      keyHTML += '<h3 style="color:#c62828;margin:28px 0 12px;font-size:1.05rem">Teste de Avaliação</h3>';
      answers.teste_respostas.forEach(function(r) {
        keyHTML += '<div class="prof-q"><div class="q-num">' + r.q + '.</div><div class="q-ans">' + r.r + '</div><div class="q-expl"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></span> ' + r.expl + '</div></div>';
      });
    }
    
    keyHTML += '</div>';
    html = html.replace('</body>', keyHTML + '</body>');
  }
  
  return html;
}

// Modify PDF to include answers when professor mode on
var _origPdf=htmlToPdfDownload;
htmlToPdfDownload=function(html,filename){
  var cap=0;
  if(/inteiros|cap1/i.test(filename))cap=1;
  else if(/racionais|cap2/i.test(filename))cap=2;
  else if(/cap3|geometria/i.test(filename))cap=3;
  else if(/cap4|sequencias|equacoes/i.test(filename))cap=4;
  if(cap&&professorMode[cap]){
    html=injectProfSolutions(html,cap);
    filename=filename.replace('.pdf','_PROFESSOR.pdf');
  }
  _origPdf(html,filename);
};

// ═══════════════════════════════════════════════════════════════
// UX 6: FUNCTIONAL SEARCH
// ═══════════════════════════════════════════════════════════════
var searchIdx=[
  {t:'Números Inteiros — Conjunto ℤ',k:'inteiros conjuntos Z ordenação',c:1,a:'math'},
  {t:'Valor Absoluto e Simétrico',k:'valor absoluto simétrico módulo',c:1,a:'math'},
  {t:'Adição e Subtração de Inteiros',k:'adição subtração inteiros soma',c:1,a:'math'},
  {t:'Questões-aula Cap. 1',k:'questões exercícios quiz inteiros',c:1,a:'math'},
  {t:'Minitestes Cap. 1',k:'miniteste teste rápido',c:1,a:'math'},
  {t:'Jogos Cap. 1',k:'jogos interativo',c:1,a:'math'},
  {t:'Números Racionais — Frações',k:'racionais frações Q comparar',c:2,a:'math2'},
  {t:'Percentagens',k:'percentagem desconto aumento',c:2,a:'math2'},
  {t:'Potências e Notação Científica',k:'potências notação científica expoente',c:2,a:'math2'},
  {t:'Questões-aula Cap. 2',k:'questões exercícios racionais',c:2,a:'math2'},
  {t:'Geometria — Ângulos',k:'geometria ângulos graus triângulo',c:3,a:'math3'},
  {t:'Quadriláteros e Áreas',k:'quadriláteros área perímetro retângulo',c:3,a:'math3'},
  {t:'Questões-aula Cap. 3',k:'questões geometria',c:3,a:'math3'},
  {t:'Sequências e Termo Geral',k:'sequência termo geral sucessão aritmética',c:4,a:'math4'},
  {t:'Expressões Algébricas',k:'expressão algébrica monómio variável simplificar',c:4,a:'math4'},
  {t:'Equações do 1.º Grau',k:'equação resolver incógnita primeiro grau',c:4,a:'math4'},
  {t:'Classificação de Equações',k:'classificar possível impossível indeterminada PD PI',c:4,a:'math4'},
  {t:'Questões-aula Cap. 4',k:'questões equações sequências',c:4,a:'math4'},
  {t:'Downloads Cap. 1',k:'download ficha PDF imprimir inteiros',c:1,a:'math'},
  {t:'Downloads Cap. 2',k:'download ficha PDF racionais',c:2,a:'math2'},
  {t:'Downloads Cap. 3',k:'download ficha PDF geometria',c:3,a:'math3'},
  {t:'Downloads Cap. 4',k:'download ficha PDF equações',c:4,a:'math4'},
  {t:'Flashcards Cap. 4',k:'flashcards cartões revisão equações',c:4,a:'math4'},
  {t:'Exame Simulado',k:'exame simulado tempo cronómetro',c:1,a:'math'}
];
var _searchTimer;
// Guard: only patch once. If this script block is evaluated again, _origDoSearch2
// would become the already-patched version, creating an infinite call loop.
if (!window._doSearchPatched) {
  window._doSearchPatched = true;
  var _origDoSearch2=typeof doSearch==='function'?doSearch:null;
  doSearch=function(val){
    if(_origDoSearch2)_origDoSearch2.call(this,val);
    clearTimeout(_searchTimer);
    _searchTimer=setTimeout(function(){
      var sr=document.getElementById('searchResults');
      if(!sr)return;
      if(!val||val.length<2){sr.classList.remove('open');sr.innerHTML='';return;}
      var q=val.toLowerCase();
      var res=searchIdx.filter(function(it){return it.t.toLowerCase().indexOf(q)>-1||it.k.indexOf(q)>-1;}).slice(0,8);
      if(!res.length){var _noResDiv=document.createElement('div');_noResDiv.className='search-result-item';_noResDiv.style.cssText='color:var(--ink4);cursor:default';_noResDiv.textContent='Sem resultados para "'+val+'"';sr.innerHTML='';sr.appendChild(_noResDiv);sr.classList.add('open');return;}
      var cols={1:'#2c3e7a',2:'#e65100',3:'#1a6e3a',4:'#516860'};
      sr.innerHTML=res.map(function(r){
        return '<div class="search-result-item" tabindex="0" onclick="goSearch(\''+r.a+'\')"><span class="search-result-tag" style="background:'+cols[r.c]+'18;color:'+cols[r.c]+'">Cap.'+r.c+'</span>'+r.t+'</div>';
      }).join('');
      sr.classList.add('open');
    },200);
  };
}
function goSearch(action){
  document.getElementById('searchResults').classList.remove('open');
  document.getElementById('s-input').value='';
  if(typeof handleSubj==='function')handleSubj(null,action);
}
function searchKeyNav(e){
  var sr=document.getElementById('searchResults');
  if(!sr||!sr.classList.contains('open'))return;
  var items=sr.querySelectorAll('.search-result-item[tabindex]');
  if(!items.length)return;
  if(e.key==='ArrowDown'){e.preventDefault();items[0].focus();}
  else if(e.key==='Enter'&&document.activeElement.classList.contains('search-result-item')){e.preventDefault();document.activeElement.click();}
}
document.addEventListener('click',function(e){if(!e.target.closest('.search-box')){var sr=document.getElementById('searchResults');if(sr)sr.classList.remove('open');}});

// ═══════════════════════════════════════════════════════════════
// UX 7: EXAM PROTECTION
// ═══════════════════════════════════════════════════════════════
var examActive=false;
['exameStart','exame2Start','exame3Start','exame4Start'].forEach(function(fn){
  if(typeof window[fn]==='function'){var o=window[fn];window[fn]=function(){examActive=true;o.apply(this,arguments);};}
});
['exameSubmit','exame2Submit','exame3Submit','exame4Submit'].forEach(function(fn){
  if(typeof window[fn]==='function'){var o=window[fn];window[fn]=function(){examActive=false;o.apply(this,arguments);};}
});
window.addEventListener('beforeunload',function(e){
  if(examActive){e.preventDefault();e.returnValue='Exame em curso — perdes o progresso se saíres.';return e.returnValue;}
});
// Protect tab switching during exam
['showSection','showSection2','showSection3','showSection4'].forEach(function(fn){
  if(typeof window[fn]==='function'){
    var orig=window[fn];
    window[fn]=function(id,btn){
      if(examActive&&!/exame/.test(id)){
        if(!confirm('Tens um exame em curso! Perdes o progresso se mudares. Continuar?'))return;
        examActive=false;
      }
      orig.call(this,id,btn);
    };
  }
});

// ═══════════════════════════════════════════════════════════════
// UX 8: SUBTEMA PROGRESS BARS
// ═══════════════════════════════════════════════════════════════
var stProg={};
try{stProg=JSON.parse(localStorage.getItem('edupt_st_prog')||'{}');}catch(e){}
function trackSubtema(cap,sub,correct){
  var k=cap+'-'+sub;
  if(!stProg[k])stProg[k]={c:0,t:0};
  stProg[k].t++;if(correct)stProg[k].c++;
  try{localStorage.setItem('edupt_st_prog',JSON.stringify(stProg));}catch(e){}
  renderStBars();
}
function renderStBars(){
  document.querySelectorAll('.subtema-header').forEach(function(h){
    var numEl=h.querySelector('.subtema-num');if(!numEl)return;
    var num=numEl.textContent.trim();
    var cap='1';
    var p=h.closest('[id*="view-math"]');
    if(p){if(p.id.indexOf('4')>-1)cap='4';else if(p.id.indexOf('3')>-1)cap='3';else if(p.id.indexOf('2')>-1)cap='2';}
    var k=cap+'-'+num;var d=stProg[k];
    var ex=h.querySelector('.subtema-progress');if(ex)ex.remove();
    if(d&&d.t>0){
      var pct=Math.min(100,Math.round(d.c/d.t*100));
      var bar=document.createElement('div');bar.className='subtema-progress';
      bar.innerHTML='<div class="subtema-prog-bar"><div class="subtema-prog-fill" style="width:'+pct+'%"></div></div><span class="subtema-prog-pct">'+pct+'%</span>';
      h.appendChild(bar);
    }
  });
}
setTimeout(renderStBars,500);

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: FEEDBACK ANIMATIONS
// ═══════════════════════════════════════════════════════════════
(function(){
  // Wrap all check functions to add animations
  var origFns={};
  ['checkMC','checkFill','checkDyn','checkDyn2','checkDyn3','ans4','hAns','ghAns'].forEach(function(fn){
    if(typeof window[fn]==='function'){
      origFns[fn]=window[fn];
      window[fn]=function(){
        var result=origFns[fn].apply(this,arguments);
        // Find the quiz question container
        var btn=arguments[2]||arguments[1];
        if(btn&&btn.closest){
          var q=btn.closest('.quiz-question')||btn.closest('.relampago-q');
          if(q){
            var isCorrect=btn.classList.contains('correct')||
              (arguments[2]==='correct')||(arguments[3]===true)||(arguments[2]===true);
            q.classList.remove('anim-correct','anim-wrong');
            void q.offsetWidth; // force reflow
            q.classList.add(isCorrect?'anim-correct':'anim-wrong');
            // Track streak
            updateStreak(isCorrect);
            // XP float
            if(isCorrect)showXPFloat(btn,'+10');
          }
        }
        return result;
      };
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: STREAK COUNTER
// ═══════════════════════════════════════════════════════════════
var currentStreak=0;
function updateStreak(correct){
  if(correct){
    currentStreak++;
    if(currentStreak===3||currentStreak===5||currentStreak===7||currentStreak===10||currentStreak===15||currentStreak===20){
      showStreakBadge(currentStreak);
    }
  }else{
    currentStreak=0;
  }
}
function showStreakBadge(n){
  var old=document.querySelector('.streak-badge');if(old)old.remove();
  var badge=document.createElement('div');
  badge.className='streak-badge '+(n>=10?'s10':n>=5?'s5':'s3');
  var emoji=n>=10?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>':n>=5?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>';
  var msg=n>=10?'Imparável!':n>=5?'Em chamas!':'Boa série!';
  badge.innerHTML=emoji+' '+n+' seguidas!<span class="streak-sub">'+msg+'</span>';
  document.body.appendChild(badge);
  setTimeout(function(){badge.style.transition='opacity .5s';badge.style.opacity='0';setTimeout(function(){badge.remove();},500);},2500);
}

// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: XP FLOAT ANIMATION
// ═══════════════════════════════════════════════════════════════
function showXPFloat(anchor,text){
  var rect=anchor.getBoundingClientRect();
  var float=document.createElement('div');
  float.className='xp-float';
  float.textContent=text;
  float.style.left=(rect.left+rect.width/2-15)+'px';
  float.style.top=(rect.top+window.scrollY-10)+'px';
  document.body.appendChild(float);
  setTimeout(function(){float.remove();},1300);
}



// ═══════════════════════════════════════════════════════════════
// INTERACTIVITY: SOUND EFFECTS (OPTIONAL)
// ═══════════════════════════════════════════════════════════════
var soundEnabled=false;
try{soundEnabled=localStorage.getItem('edupt_sound')==='true';}catch(e){}

var audioCtx=null;
function playTone(freq,dur,type){
  if(!soundEnabled)return;
  try{
    if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    var osc=audioCtx.createOscillator();
    var gain=audioCtx.createGain();
    osc.connect(gain);gain.connect(audioCtx.destination);
    osc.type=type||'sine';
    osc.frequency.value=freq;
    gain.gain.value=0.08;
    gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+(dur||0.15));
    osc.start();osc.stop(audioCtx.currentTime+(dur||0.15));
  }catch(e){}
}
function playCorrectSound(){playTone(523,.08);setTimeout(function(){playTone(659,.08);},80);setTimeout(function(){playTone(784,.12);},160);}
function playWrongSound(){playTone(220,.15,'square');}

// Hook into answer functions for sound
(function(){
  var origMFH=makeFeedbackHTML;
  makeFeedbackHTML=function(isCorrect,expl,val){
    if(isCorrect)playCorrectSound();else playWrongSound();
    return origMFH(isCorrect,expl,val);
  };
})();

// Add sound toggle to level bars
setTimeout(function(){
  document.querySelectorAll('.level-bar').forEach(function(bar){
    if(bar.querySelector('.sound-toggle'))return;
    var toggle=document.createElement('label');
    toggle.className='sound-toggle'+(soundEnabled?' active':'');
    toggle.innerHTML=(soundEnabled?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>')+' Som';
    toggle.onclick=function(){
      soundEnabled=!soundEnabled;
      this.classList.toggle('active');
      this.innerHTML=(soundEnabled?'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span>':'<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>')+' Som';
      try{localStorage.setItem('edupt_sound',soundEnabled);}catch(e){}
      if(soundEnabled)playCorrectSound();
    };
    bar.appendChild(toggle);
  });
},500);

// Fallback: ensure portal cards become visible even if IntersectionObserver fails
setTimeout(function(){
  document.querySelectorAll('.cycle-block,.y-card,.card,.def-block,.mat7-cap-card,.download-card').forEach(function(el){
    if(el.classList.contains('rv')&&!el.classList.contains('in')){
      el.classList.add('in');
    }
  });
},1500);

// ═══════════════════════════════════════════════════════
// ISSUES 1–4: SELEÇÃO MULTI-CAPÍTULO + MEGAGERADOR
// ═══════════════════════════════════════════════════════
// ── Actualiza o botão no topbar ──────────────
function pmUpdateTopbar() {
  var s = ProgressManager.getSummary();
  var el = document.getElementById('pm-topbar-xp-label');
  if (el) el.textContent = s.totalXp + ' XP';
}

// ── Widget de progresso inline por capítulo ──
function pmRenderWidget(capId, containerEl) {
  if (!containerEl) return;
  var old = containerEl.querySelector('.pm-widget');
  if (old) old.remove();
  var pct = ProgressManager.getCapPct(capId);
  var cap = ProgressManager.getCap(capId);
  var score = cap && cap.quiz.tentativas > 0 ? cap.quiz.melhorPct + '%' : null;
  var itens = [
    { l:'Teoria',      done: cap ? cap.teoria : false },
    { l:'Quiz',        done: cap ? cap.quiz.tentativas>0 : false },
    { l:'Jogo',        done: cap ? cap.jogo : false },
    { l:'Flashcards',  done: cap ? cap.flashcard : false },
    { l:'Ficha',       done: cap ? cap.ficha : false },
  ];
  var w = document.createElement('div');
  w.className = 'pm-widget';
  w.innerHTML =
    '<div class="pm-widget-header">' +
      '<span class="pm-widget-title">O teu progresso neste capítulo</span>' +
      (score ? '<span style="font-size:.72rem;color:var(--ink3)">Melhor quiz: <strong style="color:var(--c2-mid)">' + score + '</strong></span>' : '') +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem">' +
      '<div class="pm-bar-track" style="flex:1;height:6px;background:var(--cream3);border-radius:999px;overflow:hidden">' +
        '<div class="pm-bar-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<span style="font-family:\'Cormorant Garamond\',serif;font-size:1.05rem;font-weight:900;color:var(--c2-mid);margin-left:.75rem">' + pct + '%</span>' +
    '</div>' +
    '<div class="pm-tags">' +
      itens.map(function(it) {
        return '<span class="pm-tag ' + (it.done ? 'done' : 'todo') + '">' + (it.done ? '✓' : '○') + ' ' + it.l + '</span>';
      }).join('') +
    '</div>';
  containerEl.insertBefore(w, containerEl.firstChild);
  document.addEventListener('edupt:progress', function handler(e) {
    if (e.detail.reset || e.detail.capId === capId) {
      pmRenderWidget(capId, containerEl);
      document.removeEventListener('edupt:progress', handler);
    }
  });
}

// ── Dashboard global ─────────────────────────
function pmToggleDashboard() {
  var existing = document.getElementById('pm-dashboard');
  if (existing) { existing.remove(); return; }
  pmOpenDashboard();
}

function pmOpenDashboard() {
  var existing = document.getElementById('pm-dashboard');
  if (existing) existing.remove();
  var s = ProgressManager.getSummary();
  var capEntries = Object.entries(s.caps);
  var streakIcon = s.streak >= 7 ? '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg></span>' : s.streak >= 3 ? '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>' : '<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>';
  var capOrder = ['cap1','cap2','cap3','cap4'];
  var allCaps = capOrder.map(function(cid) {
    return { cid: cid, cap: s.caps[cid] || null };
  });

  var capsHTML = allCaps.map(function(item) {
    var cid = item.cid;
    var cap = item.cap;
    var pct = ProgressManager.getCapPct(cid);
    var nome = ProgressManager.CAP_NAMES[cid] || cid;
    var tagsDone = cap ? [
      { l:'T', done: cap.teoria },
      { l:'Q', done: cap.quiz.tentativas>0 },
      { l:'J', done: cap.jogo },
      { l:'FC', done: cap.flashcard },
      { l:'F', done: cap.ficha },
    ] : [];
    return '<div class="pm-cap-row">' +
      '<div class="pm-cap-label"><span>' + nome + '</span><span class="pm-cap-pct">' + pct + '%</span></div>' +
      '<div class="pm-bar-track"><div class="pm-bar-fill" style="width:' + pct + '%"></div></div>' +
      (tagsDone.length ? '<div class="pm-tags">' +
        tagsDone.map(function(t){ return '<span class="pm-tag ' + (t.done?'done':'todo') + '">' + (t.done?'✓':'○') + ' ' + t.l + '</span>'; }).join('') +
        (cap && cap.quiz.tentativas>0 ? '<span style="font-size:.63rem;color:var(--ink3);margin-left:2px">quiz: ' + cap.quiz.melhorPct + '%</span>' : '') +
      '</div>' : '<div class="pm-tags"><span class="pm-tag todo">○ Não iniciado</span></div>') +
    '</div>';
  }).join('');

  var dash = document.createElement('div');
  dash.id = 'pm-dashboard';
  dash.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.1rem">' +
      '<h3 style="font-family:\'Cormorant Garamond\',serif;font-size:1.2rem;font-weight:800;color:var(--ink)">O meu progresso</h3>' +
      '<button class="pm-close-btn" onclick="document.getElementById(\'pm-dashboard\').remove()">×</button>' +
    '</div>' +
    '<div class="pm-stat-grid">' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.totalXp + '</div><div class="pm-stat-l">XP total</div></div>' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.capsCompletas + '/4</div><div class="pm-stat-l">Completos</div></div>' +
      '<div class="pm-stat"><div class="pm-stat-n">' + s.streak + ' ' + streakIcon + '</div><div class="pm-stat-l">Dias seguidos</div></div>' +
    '</div>' +
    (capEntries.length === 0
      ? '<p style="text-align:center;color:var(--ink3);font-size:.85rem;padding:1.25rem 0 .75rem">Ainda sem actividade.<br>Começa a estudar para ver o progresso!</p>'
      : capsHTML
    ) +
    '<div class="pm-footer-btns">' +
      '<button class="pm-btn-export" onclick="ProgressManager.exportJSON()">Exportar JSON</button>' +
      '<button class="pm-btn-reset" onclick="ProgressManager.reset()">Limpar tudo</button>' +
    '</div>';

  document.body.appendChild(dash);
  setTimeout(function() {
    document.addEventListener('click', function handler(e) {
      var d = document.getElementById('pm-dashboard');
      var btn = document.getElementById('pm-topbar-btn');
      if (d && !d.contains(e.target) && btn && !btn.contains(e.target)) {
        d.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 120);
}

// ── Actualiza dashboard se estiver aberto ─────
document.addEventListener('edupt:progress', function() {
  if (document.getElementById('pm-dashboard')) pmOpenDashboard();
});

// ── Init: actualiza topbar ao carregar ────────
document.addEventListener('DOMContentLoaded', function() { pmUpdateTopbar(); });

// ═══ CHAPTER NAV BAR — goToChapter ═══
function goToChapter(n) {
  // Map chapter number to view IDs and show functions
  var viewMap = {
    1: { id: 'view-math',  fn: function() { showMathView && showMathView() || (document.getElementById('view-math').style.display='block') } },
    2: { id: 'view-math2', fn: function() { showMathView2 && showMathView2() || (document.getElementById('view-math2').style.display='block') } },
    3: { id: 'view-math3', fn: function() { showMathView3 && showMathView3() || (document.getElementById('view-math3').style.display='block') } },
    4: { id: 'view-math4', fn: function() { showMathView4 && showMathView4() || (document.getElementById('view-math4').style.display='block') } }
  };
  var allViews = ['view-portal','view-mat7','view-math','view-math2','view-math3','view-math4','view-mega'];
  // Hide all views
  allViews.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Show the target view
  var target = document.getElementById('view-math' + (n > 1 ? n : ''));
  if (target) {
    target.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Use viewMap fn to run the proper show/init function
  if (viewMap[n] && typeof viewMap[n].fn === 'function') viewMap[n].fn();
  // For chapters 2/3/4 activate first section
  if (n === 2 && typeof showSection2 === 'function') showSection2('temas2', null);
  if (n === 3 && typeof showSection3 === 'function') showSection3('temas3', null);
  if (n === 4 && typeof showSection4 === 'function') showSection4('temas4', null);
}

// ═══ TEACHER STRIP TOGGLE ═══
function toggleTeacher(btn) {
  var strip = btn.closest('.teacher-strip');
  if (!strip) return;
  strip.classList.toggle('open');
}

// ═══ CHECKLIST TOGGLE ═══
function toggleChecklist(item, fillId, containerId) {
  var cb = item.querySelector('.checklist-cb');
  if (!cb) return;
  cb.classList.toggle('checked');
  item.classList.toggle('done');
  // Update progress bar
  var container = document.getElementById(containerId);
  var fillEl = document.getElementById(fillId);
  if (!container || !fillEl) return;
  var all = container.querySelectorAll('.checklist-item');
  var done = container.querySelectorAll('.checklist-item.done');
  var pct = all.length ? Math.round(done.length / all.length * 100) : 0;
  fillEl.style.width = pct + '%';
}

// ══════════════════════════════════════════════════════
// DOWNLOAD PROGRESSO — JSON e PDF
// ══════════════════════════════════════════════════════
function _progRecolherTudo() {
  // Junta dados dos 4 caps + ProgressManager XP
  var cap4raw = {};
  try { cap4raw = JSON.parse(localStorage.getItem('edupt_cap4') || '{}'); } catch(e) {}
  var pm = {};
  try { pm = JSON.parse(localStorage.getItem('edupt_progress_v2') || '{}'); } catch(e) {}

  function secTotals(data) {
    var c=0,t=0;
    if (data && data.sections) Object.values(data.sections).forEach(function(s){ c+=s.correct||0; t+=s.total||0; });
    return { corretas: c, total: t, taxa: t>0 ? Math.round(c/t*100)+'%' : '—', detalhe: data && data.sections ? data.sections : {} };
  }
  function cap4Totals() {
    var c=0,t=0,det={};
    Object.entries(cap4raw).forEach(function(kv) {
      var k=kv[0], v=kv[1];
      if (v && typeof v.correct==='number') { c+=v.correct; t+=v.total||0; det[k]={corretas:v.correct,total:v.total||0}; }
    });
    return { corretas: c, total: t, taxa: t>0 ? Math.round(c/t*100)+'%' : '—', detalhe: det };
  }

  return {
    exportadoEm: new Date().toLocaleString('pt-PT'),
    xpTotal: (pm.totalXp || 0),
    streakDias: (pm.streak || 0),
    capitulos: {
      'Cap. 1 · Inteiros':  secTotals(typeof _progData  !== 'undefined' ? _progData  : null),
      'Cap. 2 · Racionais': secTotals(typeof _progData2 !== 'undefined' ? _progData2 : null),
      'Cap. 3 · Geometria': secTotals(typeof _progData3 !== 'undefined' ? _progData3 : null),
      'Cap. 4 · Álgebra':   cap4Totals()
    },
    historico: {
      cap1: (typeof _progData  !== 'undefined' ? _progData.log  : []),
      cap2: (typeof _progData2 !== 'undefined' ? _progData2.log : []),
      cap3: (typeof _progData3 !== 'undefined' ? _progData3.log : []),
      cap4: (function(){ var p={}; try{p=JSON.parse(localStorage.getItem('edupt_cap4')||'{}');}catch(e){} return p.last_updated ? p : null; })()
    }
  };
}


function progDownloadPDF() {
  var d = _progRecolherTudo();
  var caps = d.capitulos;
  var cor = function(taxa) {
    if (taxa==='—') return '#9e9e9e';
    var n = parseInt(taxa);
    return n>=80 ? '#516860' : n>=50 ? '#c4a030' : '#c4796e';
  };
  var barraHtml = function(taxa) {
    if (taxa==='—') return '<div style="width:100%;height:8px;background:#eee;border-radius:4px"></div>';
    var n = parseInt(taxa);
    return '<div style="width:100%;height:8px;background:#eee;border-radius:4px;overflow:hidden"><div style="height:100%;width:'+n+'%;background:'+cor(taxa)+';border-radius:4px"></div></div>';
  };

  var capsHtml = Object.entries(caps).map(function(kv) {
    var nome = kv[0], c = kv[1];
    return '<tr><td style="padding:10px 14px;font-weight:600;color:#2a2724">'+nome+'</td>'
      +'<td style="padding:10px 14px;text-align:center;font-family:monospace">'+c.corretas+'/'+c.total+'</td>'
      +'<td style="padding:10px 14px;text-align:center;font-weight:700;color:'+cor(c.taxa)+'">'+c.taxa+'</td>'
      +'<td style="padding:10px 24px 10px 14px;min-width:120px">'+barraHtml(c.taxa)+'</td></tr>';
  }).join('');

  var totalCorretas = Object.values(caps).reduce(function(s,c){return s+c.corretas;},0);
  var totalQs       = Object.values(caps).reduce(function(s,c){return s+c.total;},0);
  var taxaGlobal    = totalQs>0 ? Math.round(totalCorretas/totalQs*100)+'%' : '—';

  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<title>Progresso 3ponto14 · Mat 7</title>'
    + '</head><body>'
    + '<h1>3ponto14 · Matemática 7.º ano</h1>'
    + ''
    + '<p class="sub">Relatório de progresso exportado em '+d.exportadoEm+'</p>'
    + '<div class="stat-grid">'
    +   '<div class="stat"><div class="n">'+totalCorretas+'</div><div class="l">Respostas certas</div></div>'
    +   '<div class="stat"><div class="n">'+taxaGlobal+'</div><div class="l">Taxa global</div></div>'
    +   '<div class="stat"><div class="n">'+d.xpTotal+'</div><div class="l">XP total</div></div>'
    + '</div>'
    + '<h2>Desempenho por Capítulo</h2>'
    + '<table><thead><tr><th>Capítulo</th><th style="text-align:center">Certas / Total</th><th style="text-align:center">Taxa</th><th>Barra</th></tr></thead>'
    + '<tbody>'+capsHtml+'</tbody></table>'
    + '<div class="footer"><span>3ponto14.pt</span><span>Progresso guardado localmente neste browser</span></div>'
    + '</body></html>';

  var win = window.open('', '_blank', 'width=720,height=900');
  if (!win) { alert('Permite popups para gerar o PDF.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 400);
}

// ═══════════════════════════════════════════════════════════════
// PROGRESSO UNIFICADO — hub tab "Progresso" (todos os capítulos)
// ═══════════════════════════════════════════════════════════════

var _treinoState = {};

// ── Builders para cada cap — output formato padrão ──
var _TREINO_BUILDERS = {
  cap1: function(temaNum, dif) {
    try {
      var l = typeof lim === 'function' ? lim(dif||'medio') : {min:-20,max:20};
      return buildExercicio(String(temaNum), 'mc', l.min, l.max, 1, dif||'medio')
          || buildExercicio(String(temaNum), 'fill', l.min, l.max, 1, dif||'medio');
    } catch(e) { return null; }
  },
  cap2: function(temaNum, dif) {
    try { return buildEx2(String(temaNum), 'mc', dif||'medio'); } catch(e) { return null; }
  },
  cap3: function(temaNum, dif) {
    try { return buildEx3(String(temaNum), 'mc', dif||'medio'); } catch(e) { return null; }
  },
  cap4: function(temaNum, dif) {
    try {
      var ex = buildEx4(String(temaNum), dif||'medio');
      if (!ex) return null;
      var labels = ['A','B','C','D'];
      var correctLetter = ex.c ? ex.c.charAt(0) : 'A';
      var correctIdx = labels.indexOf(correctLetter);
      var opcoes = (ex.opts||[]).map(function(o){ return o.replace(/^[A-D]\)\s*/,''); });
      var resposta = correctIdx >= 0 ? opcoes[correctIdx] : opcoes[0];
      return { tipo:'mc', tema:'Cap. 4 · Tema '+temaNum, enun:ex.en||'', opcoes:opcoes, resposta:resposta, expl:ex.fb||'' };
    } catch(e) { return null; }
  }
};

function _treinoTemaNum(temaStr) {
  if (!temaStr) return null;
  var m = temaStr.match(/Tema\s+(\d+)/i);
  return m ? parseInt(m[1]) : null;
}

function _treinoGetGrupos() {
  var allErrors = [];
  ['cap1','cap2','cap3','cap4'].forEach(function(capId){
    ErrorTracker.getErrors(capId, 1).forEach(function(r){ allErrors.push(r); });
  });
  allErrors.sort(function(a,b){ return b.erros - a.erros; });
  var temaGroups = {};
  allErrors.forEach(function(r) {
    var temaNum = _treinoTemaNum(r.tema);
    if (!temaNum) temaNum = Math.floor(Math.random()*5)+1;
    var key = r.capId + '|' + temaNum;
    if (!temaGroups[key]) temaGroups[key] = { capId:r.capId, temaNum:temaNum, tema:r.tema||'', erros:0 };
    temaGroups[key].erros += r.erros;
  });
  return Object.values(temaGroups).sort(function(a,b){ return b.erros - a.erros; }).slice(0, 5);
}

function _treinoGerar(grupos, dif, perGrupo) {
  perGrupo = perGrupo || 2;
  var exercicios = [];
  grupos.forEach(function(g) {
    var builder = _TREINO_BUILDERS[g.capId];
    if (!builder) return;
    var tentativas = 0, gerados = 0;
    while (gerados < perGrupo && tentativas < 10) {
      tentativas++;
      var ex = builder(g.temaNum, dif);
      if (ex && ex.enun) {
        ex._capId = g.capId;
        ex._temaNum = g.temaNum;
        exercicios.push(ex);
        gerados++;
      }
    }
  });
  return exercicios;
}

function _treinoRenderExercicios(exercicios, containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (!exercicios.length) {
    el.innerHTML = '<p style="color:var(--ink4);font-size:.88rem;font-style:italic">Não foi possível gerar exercícios. Responde a mais questões primeiro.</p>';
    return;
  }
  var labels = ['A','B','C','D'];
  var html = '';
  exercicios.forEach(function(ex, i) {
    var qid = 'treino-q-' + i;
    _treinoState[qid] = { answered: false };
    var capLabel = {cap1:'Cap. 1',cap2:'Cap. 2',cap3:'Cap. 3',cap4:'Cap. 4'}[ex._capId]||'';
    var temaShort = (ex.tema||'').replace(/^(Tema \d+\s*[—\-]?\s*)/,'').trim() || ex.tema;
    html += '<div class="quiz-question" id="' + qid + '" style="margin-bottom:1rem">';
    html += '<div class="q-number" style="color:var(--cs-deep)">' + capLabel + ' · ' + (temaShort||ex.tema||'') + '</div>';
    if (ex.visual) html += '<div class="q-visual">' + ex.visual + '</div>';
    html += '<div class="q-text">' + (typeof formatMath==='function'?formatMath(ex.enun):ex.enun) + '</div>';
    if (ex.tipo === 'fill') {
      html += '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">'
            + '<input class="fill-input" id="'+qid+'-in" placeholder="?" type="text" inputmode="decimal" style="width:100px">'
            + '<button class="check-btn" onclick="checkTreino(\''+qid+'\',\'fill\','+ex.resposta+')">Verificar</button>'
            + '</div>';
    } else {
      var opcs = ex.tipo==='vf'
        ? [{txt:'Verdadeiro',isC:ex.resposta==='V'},{txt:'Falso',isC:ex.resposta==='F'}]
        : (ex.opcoes||[]).map(function(o){ return {txt:o,isC:String(o)===String(ex.resposta)}; });
      html += '<div class="options">';
      opcs.forEach(function(o,k){
        var lbl = ex.tipo==='vf'?(k===0?'V':'F'):labels[k];
        html += '<button class="option-btn" onclick="checkTreino(\''+qid+'\',\'mc\','+o.isC+',this)">'
              + '<span class="opt-label">'+lbl+'</span>'
              + (typeof formatMath==='function'?formatMath(o.txt):o.txt)
              + '</button>';
      });
      html += '</div>';
    }
    var explEsc = (ex.expl||'').replace(/'/g,"&#39;").replace(/"/g,'&quot;');
    html += '<span id="'+qid+'-expl" style="display:none">'+explEsc+'</span>';
    html += '<div class="feedback" id="'+qid+'-fb"></div>';
    html += '</div>';
  });
  el.innerHTML = html;
}

function checkTreino(qid, tipo, val, btn) {
  var st = _treinoState[qid];
  if (!st || st.answered) return;
  st.answered = true;
  var explEl = document.getElementById(qid+'-expl');
  var explTxt = explEl ? explEl.textContent : '';
  var fb = document.getElementById(qid+'-fb');
  var correct;
  if (tipo === 'fill') {
    var inp = document.getElementById(qid+'-in');
    if (!inp) return;
    correct = !isNaN(_parseFillVal(inp.value)) && _parseFillVal(inp.value) === val;
    inp.disabled = true;
    inp.classList.add(correct?'correct':'wrong');
  } else {
    correct = val === true || val === 'true';
    var container = document.getElementById(qid);
    if (container) container.querySelectorAll('.option-btn').forEach(function(b){ b.disabled=true; });
    if (btn) {
      btn.classList.add(correct?'correct':'wrong');
      if (!correct && container) {
        container.querySelectorAll('.option-btn').forEach(function(b){
          if (b.dataset.correct === 'true') b.classList.add('correct');
        });
      }
    }
  }
  if (fb) {
    fb.className='feedback show '+(correct?'correct-fb':'wrong-fb');
    fb.innerHTML=makeFeedbackHTML(correct, explTxt||'', correct?undefined:val, qid+'-fb');
  }
}

// ── Gera e abre ficha PDF com exercícios nos temas onde errou ──
function gerarFichaTreino() {
  var grupos = _treinoGetGrupos();
  if (!grupos.length) {
    alert('Ainda sem erros registados. Responde a questões para gerar a ficha de treino.');
    return;
  }
  // Generate 3 exercises per grupo for the PDF
  var exercicios = _treinoGerar(grupos, 'medio', 3);
  if (!exercicios.length) {
    alert('Não foi possível gerar exercícios para estes temas.');
    return;
  }

  var now = new Date().toLocaleDateString('pt-PT');
  var capNames = {cap1:'Cap. 1 — Inteiros',cap2:'Cap. 2 — Racionais',cap3:'Cap. 3 — Geometria',cap4:'Cap. 4 — Álgebra'};

  // Group exercises by cap for sections
  var byCap = {};
  exercicios.forEach(function(ex) {
    if (!byCap[ex._capId]) byCap[ex._capId] = [];
    byCap[ex._capId].push(ex);
  });

  var exNum = 0;
  var solucoes = [];
  var body = '';

  body += '<div class="doc-header">'
        + '<div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
        + '<div class="doc-title">Ficha de Treino Direcionado<em>Baseada nos temas onde erraste mais</em></div></div>'
        + '<div class="doc-logo">3π</div></div>';

  body += '<div class="doc-meta">'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
        + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
        + '</div>';

  // Nota de contexto
  body += '<div class="nota" style="margin-bottom:24px">Esta ficha foi gerada automaticamente com base nos temas onde registaste mais erros. '
        + 'Os exercícios são semelhantes mas diferentes dos que erraste — treina com atenção!</div>';

  // Temas em foco
  body += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px">';
  grupos.forEach(function(g) {
    var capLabel = {cap1:'Cap.1',cap2:'Cap.2',cap3:'Cap.3',cap4:'Cap.4'}[g.capId]||'';
    var temaLabel = g.tema ? g.tema.replace(/^Tema \d+\s*[—\-]?\s*/,'').trim() : 'Tema '+g.temaNum;
    body += '<span style="font-size:.72rem;font-weight:700;background:#f5f0ee;color:#7a6860;border:1px solid #e0d8d4;padding:3px 10px;border-radius:999px">'
          + capLabel+' · '+temaLabel+' ('+g.erros+'✗)</span>';
  });
  body += '</div>';

  // Exercises per cap section
  ['cap1','cap2','cap3','cap4'].forEach(function(capId) {
    var exs = byCap[capId];
    if (!exs || !exs.length) return;
    body += '<h2>' + (capNames[capId]||capId) + '</h2>';
    exs.forEach(function(ex) {
      exNum++;
      var temaShort = (ex.tema||'').replace(/^(Tema \d+\s*[—\-]?\s*)/,'').trim()||ex.tema||'';
      body += '<div class="ex">'
            + '<div class="ex-num"><span class="n">'+exNum+'</span> '+temaShort+'</div>';

      // Strip HTML tags from enun for PDF
      var enunClean = (ex.enun||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      body += '<p>'+enunClean+'</p>';

      if (ex.tipo === 'fill') {
        body += '<p style="margin-top:6px">Resposta: <span style="display:inline-block;width:80px;border-bottom:1.5px solid #2a2724">&nbsp;</span></p>';
        solucoes.push({ n: exNum, v: String(ex.resposta) });
      } else if (ex.tipo === 'vf') {
        body += '<div style="display:flex;gap:20px;margin:8px 0 4px 28px">'
              + '<span class="opcao">Verdadeiro</span><span class="opcao">Falso</span>'
              + '</div>';
        solucoes.push({ n: exNum, v: ex.resposta==='V'?'Verdadeiro':'Falso' });
      } else {
        // mc
        var labels = ['A','B','C','D'];
        (ex.opcoes||[]).forEach(function(o, k) {
          var optClean = String(o).replace(/<[^>]+>/g,'').trim();
          body += '<div class="opcao">'+labels[k]+') '+optClean+'</div>';
        });
        var correctIdx = (ex.opcoes||[]).findIndex(function(o){ return String(o)===String(ex.resposta); });
        solucoes.push({ n: exNum, v: correctIdx>=0 ? labels[correctIdx]+') '+String(ex.resposta).replace(/<[^>]+>/g,'').trim() : String(ex.resposta).replace(/<[^>]+>/g,'').trim() });
      }
      body += '</div>';
    });
  });

  // Soluções
  if (solucoes.length) {
    body += '<div class="sol-header">Soluções</div>';
    body += '<ul class="sol-list">';
    solucoes.forEach(function(s){
      body += '<li><span class="sn">'+s.n+'.</span><span class="sv">'+s.v+'</span></li>';
    });
    body += '</ul>';
  }

  body += '<div class="doc-footer"><span>3ponto14.pt</span><span>Ficha de Treino Direcionado — Matemática 7.º Ano</span><span>'+now+'</span></div>';

  var html = wrapPrintDoc('Ficha de Treino — 3ponto14', '<div class="page">'+body+'</div>');
  var win = window.open('','_blank','width=820,height=1000');
  if (!win) { alert('Permite popups para gerar a ficha.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(function(){ win.print(); }, 500);
}

// ── Main unified progress renderer ──
// ── Reset all progress atomically.
// Clears ErrorTracker first (in-memory), then the per-cap localStorage keys
// (via progReset* which also re-render their widgets), then the shared
// progress_v2 key, and only then re-renders the unified dashboard — avoiding
// a race where renderProgressoUnificado runs while resets are still in flight.
function _limparTudoProgresso() {
  if (!confirm('Apagar todo o progresso e erros?')) return;
  // 1. Clear ErrorTracker (in-memory only — no re-render triggered here)
  ['cap1','cap2','cap3','cap4'].forEach(function(c){ ErrorTracker.clearCap(c); });
  // 2. Reset per-cap progress stores + their localStorage keys.
  //    Each progReset* clears its own localStorage key and re-renders its own widget.
  progReset();
  progReset2();
  progReset3();
  resetProg4();
  // 3. Remove the shared progress_v2 key (written by ProgressManager).
  try { localStorage.removeItem('edupt_progress_v2'); } catch(e) {}
  // 4. Now that all stores are clean, re-render the unified dashboard once.
  renderProgressoUnificado();
}

function renderProgressoUnificado() {
  var el = document.getElementById('mat7-progresso-unified');
  if (!el) return;

  var caps = _progGetCapTotals();
  var totalC = 0, totalT = 0;
  caps.forEach(function(c){ totalC += c.data.correct; totalT += c.data.total; });
  var globalPct = totalT>0 ? Math.round(totalC/totalT*100) : 0;

  var barsHtml = caps.map(function(cap) {
    var sem = cap.data.total === 0;
    var pct = sem ? 0 : Math.round(cap.data.correct/cap.data.total*100);
    var col = sem ? 'var(--cream3)' : pct>=80 ? 'var(--c1-mid)' : pct>=50 ? 'var(--c3-mid)' : 'var(--cs-mid)';
    var nota = sem ? 'Sem dados' : pct>=80 ? 'Bom domínio' : pct>=50 ? 'A melhorar' : 'Precisa de treino';
    return '<div style="display:flex;align-items:center;gap:.85rem;padding:.45rem .6rem;border-radius:10px">'
      + '<span style="width:26px;height:26px;border-radius:50%;background:var(--cream3);color:var(--ink3);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:900;flex-shrink:0">'+cap.num+'</span>'
      + '<span style="flex:0 0 150px;font-size:.85rem;font-weight:600;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+cap.name+'</span>'
      + '<div style="flex:1;height:9px;background:var(--cream3);border-radius:999px;overflow:hidden;min-width:60px"><div style="height:100%;width:'+(sem?0:pct)+'%;background:'+col+';border-radius:999px;transition:width .6s cubic-bezier(.4,0,.2,1)"></div></div>'
      + '<span style="font-family:\'JetBrains Mono\',monospace;font-size:.78rem;color:var(--ink3);flex-shrink:0;min-width:70px;text-align:right">'+(sem?'—':cap.data.correct+'/'+cap.data.total+' ('+pct+'%)')+'</span>'
      + '<span style="font-size:.72rem;font-weight:600;color:'+(sem?'var(--ink4)':col)+';flex-shrink:0;min-width:90px;text-align:right">'+nota+'</span>'
      + '</div>';
  }).join('');

  var grupos = _treinoGetGrupos();
  var pm = typeof ProgressManager !== 'undefined' ? ProgressManager.getSummary() : {totalXp:0,streak:0};

  var html = '';

  // ── Aviso localStorage ──
  html += '<div style="display:flex;align-items:center;gap:.75rem;background:#fdf0ef;border:1px solid #e8b4b0;border-radius:10px;padding:.65rem 1rem;margin-bottom:1.25rem;font-size:.82rem;color:#8b3a35;flex-wrap:wrap">'
        + '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
        + '<span style="flex:1">O progresso é guardado <strong>apenas neste browser e neste dispositivo</strong>. Se mudares de browser ou de computador, o registo começa do zero. '
        + '<button onclick="progDownloadPDF()" style="font-family:\'Montserrat\',sans-serif;font-size:.82rem;font-weight:700;color:#8b3a35;background:none;border:none;cursor:pointer;text-decoration:underline;padding:0">Guarda o relatório PDF</button>'
        + ' para ficares sempre com o registo do teu progresso.</span>'
        + '</div>';

  // ── Barra de topo com acções ──
  html += '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:1.25rem">'
        + '<div style="font-size:.78rem;color:var(--ink4)">Última atualização: '+new Date().toLocaleString('pt-PT',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})+'</div>'
        + '<button class="btn btn-ghost" onclick="progDownloadPDF()" style="font-size:.8rem;padding:8px 18px;display:inline-flex;align-items:center;gap:6px">'
        + '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
        + 'Relatório PDF</button>'
        + '</div>';

  // ── Stat chips ──
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:.75rem;margin-bottom:1.25rem">';
  [{v:totalT,l:'Questões respondidas'},{v:totalC,l:'Respostas certas'},{v:totalT>0?globalPct+'%':'—',l:'Taxa global'},{v:pm.totalXp+' XP',l:'XP total'},{v:pm.streak+(pm.streak===1?' dia':' dias'),l:'Streak atual'}]
  .forEach(function(s){
    html += '<div class="card" style="text-align:center;padding:1rem .75rem">'
          + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.75rem;font-weight:900;color:var(--ink);letter-spacing:-.03em;line-height:1">'+s.v+'</div>'
          + '<div style="font-size:.68rem;font-weight:700;color:var(--ink4);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">'+s.l+'</div>'
          + '</div>';
  });
  html += '</div>';

  // ── Cap bars ──
  html += '<div class="card" style="margin-bottom:1.25rem">'
        + '<div class="card-title">Desempenho por Capítulo</div>'
        + '<div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.5rem">'+barsHtml+'</div>'
        + '</div>';

  // ── Treino direcionado + erros — card único ──
  html += '<div class="card" style="margin-bottom:1.25rem;border-color:var(--cs-mid)">';
  html += '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;color:var(--cs-deep)">'
        + '<span>🎯 Treino Direcionado</span>'
        + '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';

  if (grupos.length > 0) {
    html += '<button onclick="renderProgressoUnificado()" style="font-size:.75rem;font-weight:600;color:var(--c2-mid);background:none;border:1px solid var(--c2-mid);border-radius:999px;padding:4px 12px;cursor:pointer;font-family:\'Montserrat\',sans-serif;transition:opacity .2s" onmouseover="this.style.opacity=\'.7\'" onmouseout="this.style.opacity=\'1\'">↺ Novos exercícios</button>';
    html += '<button onclick="gerarFichaTreino()" style="font-size:.75rem;font-weight:700;color:#fff;background:var(--cs-mid);border:1px solid var(--cs-mid);border-radius:999px;padding:4px 14px;cursor:pointer;font-family:\'Montserrat\',sans-serif;display:inline-flex;align-items:center;gap:5px;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'">'
          + '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
          + ' Descarregar Ficha PDF</button>';
  }

  html += '</div></div>';

  if (grupos.length === 0) {
    html += '<p style="color:var(--ink4);font-size:.88rem;font-style:italic">Ainda sem erros registados — responde a questões para o treino aparecer aqui.</p>';
  } else {
    html += '<div id="treino-exercicios-container"></div>';
  }

  html += '</div>';

  // ── Ação global ──
  html += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">'
        + '<button class="btn btn-ghost" style="margin-left:auto;color:var(--wrong)" onclick="_limparTudoProgresso()">Limpar tudo</button>'
        + '</div>';

  el.innerHTML = html;

  if (grupos.length > 0) {
    _treinoRenderExercicios(_treinoGerar(grupos, 'medio', 2), 'treino-exercicios-container');
  }
}

// ═══ KEYBOARD NAVIGATION — Tabs de todos os capítulos ═══
(function(){
  // Map: tab container selector → click handler pattern
  var tabSets = [
    { sel: '#view-math .tabs', view: '#view-math' },
    { sel: '#tabs2', view: '#view-math2' },
    { sel: '#tabs3', view: '#view-math3' },
    { sel: '#tabs4', view: '#view-math4' },
    { sel: '#view-mega .tabs', view: '#view-mega' }
  ];
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    // Only act if a tab-btn is focused or the parent view is visible
    var focused = document.activeElement;
    if (!focused || !focused.classList.contains('tab-btn')) return;
    var parent = focused.closest('.tabs, .tabs-wrap4, [id^="tabs"]');
    if (!parent) return;
    var tabs = parent.querySelectorAll('.tab-btn');
    if (!tabs.length) return;
    var idx = Array.from(tabs).indexOf(focused);
    if (idx === -1) return;
    e.preventDefault();
    var next;
    if (e.key === 'ArrowRight') {
      next = tabs[idx + 1] || tabs[0];
    } else {
      next = tabs[idx - 1] || tabs[tabs.length - 1];
    }
    next.click();
    next.focus();
  });
})();

