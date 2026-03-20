/* ── Block 1 (from line 807) ── */
// ═══ MAT7 HUB — subtema data ═══
var _mat7Subtemas = {
  1: ['Conjunto ℤ', 'Valor absoluto e simétrico', 'Adição de inteiros', 'Subtração de inteiros', 'Expressões com parênteses'],
  2: ['Comparação e ordenação', 'Adição e subtração de frações', 'Percentagens', 'Potências', 'Notação científica'],
  3: ['Ângulos internos de polígonos', 'Triângulos e congruência', 'Semelhança de triângulos', 'Áreas de figuras planas', 'Circunferência'],
  4: ['Sequências e termo geral', 'Expressões algébricas', 'Simplificação', 'Equações do 1.º grau', 'Inequações']
};

// ═══ CAP SELECTOR BUILDER — generates chapter/subtema selector HTML ═══
var _capMeta = [
  {n:1, icon:'±', label:'Cap. 1 · Inteiros'},
  {n:2, icon:'½', label:'Cap. 2 · Racionais'},
  {n:3, icon:'<i class="ph ph-triangle"></i>', label:'Cap. 3 · Geometria'},
  {n:4, icon:'𝑥', label:'Cap. 4 · Álgebra'}
];
// Short subtema labels per chapter (mat7 tabs use these)
var _capStShort = {
  1: ['Conjunto ℤ','Valor absoluto','Adição','Subtração','Parênteses'],
  2: ['Comparação','Adição/Subt.','Percentagens','Potências','Not. Científica'],
  3: ['Ângulos','Triângulos','Semelhança','Áreas','Circunferência'],
  4: ['Sequências','Expressões','Simplificação','Equações','Inequações']
};
// Fichas panel uses slightly different labels
var _capStFichas = {
  1: ['Conjunto ℤ','Valor absoluto','Adição','Subtração','Parênteses'],
  2: ['Comparação','Adição/Subtração','Percentagens','Potências','Not. Científica'],
  3: ['Ângulos internos','Ângulos externos','Retas paralelas','Quadriláteros','Áreas'],
  4: ['Sequências','Expressões','Equações','Problemas']
};

/**
 * Build cap selector HTML.
 * @param {string} tab - tab identifier (e.g. 'resumo', 'jogos')
 * @param {object} opts - { type:'mat7tab'|'gf'|'simple', panelId:string, caps:[1,2,3,4], stData:object, numbered:boolean }
 */
function _buildCapSelHTML(tab, opts) {
  var type = opts.type || 'mat7tab';
  var panelId = opts.panelId || tab;
  var caps = opts.caps || [1,2,3,4];
  var stData = opts.stData || _capStShort;
  var numbered = opts.numbered || false;
  var h = '';
  caps.forEach(function(cn, ci) {
    var m = _capMeta[cn-1];
    var isFirst = (ci === 0);
    // Cap button
    if (type === 'simple') {
      var handler = opts.handler ? opts.handler.replace('{cap}', cn) : "mat7TabCapClick('"+tab+"',"+cn+",this)";
      h += '<button class="gf-cap-btn'+(isFirst?' active':'')+'" data-cap="'+cn+'" onclick="'+handler+'">'+m.icon+' '+m.label+'</button>';
      return;
    }
    h += '<div class="gf-cap-block"><div class="gf-cap-row">';
    if (type === 'gf') {
      h += '<button class="gf-cap-btn active" data-cap="'+cn+'" onclick="gfToggleCap(this,\''+panelId+'\');gfStToggleTray(this,\''+panelId+'\','+cn+')">'+m.icon+' '+m.label+' <span class="level-label">▾</span></button>';
    } else {
      h += '<button class="gf-cap-btn'+(isFirst?' active':'')+'" data-cap="'+cn+'" onclick="mat7TabCapClick(\''+tab+'\','+cn+',this)">'+m.icon+' '+m.label+' <span class="level-label">▾</span></button>';
    }
    h += '</div>';
    // Subtema tray
    var sts = stData[cn] || [];
    if (sts.length > 0) {
      var trayId = type === 'gf' ? 'gf-st-'+cn+'-'+panelId : 'mat7-st-'+cn+'-'+tab;
      var trayHidden = (type === 'gf' || isFirst) ? '' : ' hidden';
      h += '<div class="gf-st-tray'+trayHidden+'" id="'+trayId+'"><span class="gf-st-tray-label">Subtemas:</span>';
      sts.forEach(function(st, si) {
        var mark = numbered ? '<span class="gf-st-num">'+(si+1)+'</span>' : '<span class="gf-st-check">✓</span>';
        if (type === 'gf') {
          h += '<button class="gf-st-chip active" data-cap="'+cn+'" data-st="'+(si+1)+'" onclick="this.classList.toggle(\'active\')">'+mark+st+'</button>';
        } else {
          h += '<button class="gf-st-chip active" data-cap="'+cn+'" data-st="'+(si+1)+'" onclick="mat7TabStClick(this,\''+tab+'\','+cn+')">'+mark+st+'</button>';
        }
      });
      // Todos/Nenhum actions
      if (type === 'gf') {
        h += '<div class="gf-st-tray-actions"><button class="gf-st-tray-action" onclick="gfStAll(\''+panelId+'\','+cn+',true)">Todos</button><button class="gf-st-tray-action" onclick="gfStAll(\''+panelId+'\','+cn+',false)">Nenhum</button></div>';
      } else {
        h += '<div class="gf-st-tray-actions"><button class="gf-st-tray-action" onclick="mat7TabStAll(\''+tab+'\','+cn+',true);mat7TabReload(\''+tab+'\')">Todos</button><button class="gf-st-tray-action" onclick="mat7TabStAll(\''+tab+'\','+cn+',false);mat7TabReload(\''+tab+'\')">Nenhum</button></div>';
      }
      h += '</div>';
    }
    h += '</div>';
  });
  return h;
}

// Populate all cap selectors on page load
function _mat7BuildSelectors() {
  var sets = [
    {id:'gf-caps-mat7-downloads', tab:'fichas', opts:{type:'gf', panelId:'mat7-downloads', stData:_capStFichas}},
    {id:'mat7-caps-resumo',      tab:'resumo', opts:{type:'mat7tab'}},
    {id:'mat7-caps-exercicios',  tab:'exercicios', opts:{type:'mat7tab', numbered:true}},
    {id:'mat7-caps-minitestes',  tab:'minitestes', opts:{type:'simple'}},
    {id:'mat7-caps-jogos',       tab:'jogos', opts:{type:'mat7tab'}},
    {id:'mat7-caps-flashcards',  tab:'flashcards', opts:{type:'mat7tab'}},
    {id:'mat7-caps-exame',       tab:'exame', opts:{type:'mat7tab'}},
    {id:'mat7-caps-reta',        tab:'reta', opts:{type:'mat7tab', caps:[1]}},
    {id:'mat7-caps-quiz',        tab:'quiz', opts:{type:'simple', handler:"qgHubSelectCap({cap},this)"}}
  ];
  sets.forEach(function(s) {
    var el = document.getElementById(s.id);
    if (el) el.innerHTML = _buildCapSelHTML(s.tab, s.opts);
  });
}
// Auto-run when DOM is ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _mat7BuildSelectors);
else _mat7BuildSelectors();

// Section scroll targets per tab and cap
var _mat7Targets = {
  resumo:      { 1:'bloco1-resumo', 2:'sec-temas2', 3:'sec-temas3', 4:'sec-temas4' },
  questoes:    { 1:'sec-questoes',  2:'sec-questoes2', 3:'sec-questoes3', 4:'sec-questoes4' },
  miniteste:   { 1:'sec-minitestes', 2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4' },
  teste:       { 1:'sec-teste',     2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4' },
  jogos:       { 1:'sec-jogos',     2:'sec-jogos2', 3:'sec-jogos3', 4:'sec-jogos4' },
  flashcards:  { 1:'sec-flashcards',2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4' },
  exame:       { 1:'sec-exame',     2:'sec-exame2', 3:'sec-exame3', 4:'sec-exame4' }
};

// Current selections per tab
var _mat7Sel = { resumo:1, exercicios:1, testes:1, jogos:1, flashcards:1, exame:1 };

// ── Map: which section ID to grab from which view, per cap ──
var _mat7SecMap = {
  exercicios: { 1:'sec-questoes',    2:'sec-questoes2',   3:'sec-questoes3',   4:'sec-questoes4' },
  minitestes: { 1:'sec-minitestes',  2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4' },
  jogos:      { 1:'sec-jogos',       2:'sec-jogos2',      3:'sec-jogos3',      4:'sec-jogos4' },
  flashcards: { 1:'sec-flashcards',  2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4' },
  exame:      { 1:'sec-exame',       2:'sec-exame2',      3:'sec-exame3',      4:'sec-exame4' },
  reta:       { 1:'sec-reta' },
  // progresso: handled by renderProgressoUnificado — not in secMap
  quiz:       { 1:'sec-quiz-game',   2:'sec-quiz-game2',  3:'sec-quiz-game3',  4:'sec-quiz-game4' }
};

// ── Init functions per section ──
var _mat7InitMap = {
  'sec-questoes':    function(){ var el=document.getElementById('q-container');  if(el && !el.innerHTML && typeof gerarQuestoes==='function') gerarQuestoes(); if(typeof gerarMiniAtual==='function'&&document.getElementById('m-container')&&!document.getElementById('m-container').innerHTML)gerarMiniAtual(); if(typeof gerarTeste==='function'&&document.getElementById('t-container')&&!document.getElementById('t-container').innerHTML)gerarTeste(); },
  'sec-questoes2':   function(){ var el=document.getElementById('q2-container'); if(el && !el.innerHTML && typeof gerarQuestoes2==='function') gerarQuestoes2(); if(typeof gerarMiniAtual2==='function'&&document.getElementById('m2-container')&&!document.getElementById('m2-container').innerHTML)gerarMiniAtual2(); if(typeof gerarTeste2==='function'&&document.getElementById('t2-container')&&!document.getElementById('t2-container').innerHTML)gerarTeste2(); },
  'sec-questoes3':   function(){ var el=document.getElementById('q3-container'); if(el && !el.innerHTML && typeof gerarQuestoes3==='function') gerarQuestoes3(); if(typeof gerarMiniAtual3==='function'&&document.getElementById('m3-container')&&!document.getElementById('m3-container').innerHTML)gerarMiniAtual3(); if(typeof gerarTeste3==='function'&&document.getElementById('t3-container')&&!document.getElementById('t3-container').innerHTML)gerarTeste3(); },
  'sec-questoes4':   function(){ var el=document.getElementById('q4-container'); if(el && !el.innerHTML && typeof renderQuestoes4==='function') renderQuestoes4(); if(document.getElementById('m4-container')&&!document.getElementById('m4-container').innerHTML&&typeof showMini4==='function')showMini4(0,null); if(document.getElementById('t4-container')&&!document.getElementById('t4-container').innerHTML&&typeof renderTeste4==='function')renderTeste4(); },
  'sec-teste':       function(){ var el=document.getElementById('t-container');  if(el && !el.innerHTML && typeof gerarTeste==='function') gerarTeste(); },
  'sec-teste2':      function(){ var el=document.getElementById('t2-container'); if(el && !el.innerHTML && typeof gerarTeste2==='function') gerarTeste2(); },
  'sec-teste3':      function(){ var el=document.getElementById('t3-container'); if(el && !el.innerHTML && typeof gerarTeste3==='function') gerarTeste3(); },
  'sec-teste4':      function(){ var el=document.getElementById('t4-container'); if(el && !el.innerHTML && typeof renderTeste4==='function') renderTeste4(); },
  'sec-minitestes':  function(){ var el=document.getElementById('m-container');  if(el && !el.innerHTML && typeof gerarMiniAtual==='function') gerarMiniAtual(); },
  'sec-minitestes2': function(){ var el=document.getElementById('m2-container'); if(el && !el.innerHTML && typeof gerarMiniAtual2==='function') gerarMiniAtual2(); },
  'sec-minitestes3': function(){ var el=document.getElementById('m3-container'); if(el && !el.innerHTML && typeof gerarMiniAtual3==='function') gerarMiniAtual3(); },
  'sec-minitestes4': function(){ var el=document.getElementById('m4-container'); if(el && !el.innerHTML && typeof showMini4==='function') showMini4(0,null); },
  'sec-jogos':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap1']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap1','facil'); },
  'sec-jogos2':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap2']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap2','medio'); },
  'sec-jogos3':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap3']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap3','medio'); },
  'sec-jogos4':       function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap4']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap4','dificil'); },
  'sec-flashcards':  function(){ FC_CARDS=FC_CARDS_CAP1; SRS_KEY='edupt_srs_cap1'; if(typeof fcStartSession==='function') fcStartSession(); },
  'sec-flashcards2': function(){ if(typeof fcRender2==='function') fcRender2(); },
  'sec-flashcards3': function(){ if(typeof fcRender3==='function') fcRender3(); },
  'sec-flashcards4': function(){ if(typeof initFlashcards4==='function') initFlashcards4(); },
  'sec-exame':       function(){},
  'sec-exame2':      function(){},
  'sec-exame3':      function(){},
  'sec-exame4':      function(){},
  'sec-reta':        function(){ if(typeof retaDraw==='function') retaDraw(); },
  'sec-progresso':   function(){ if(typeof progRenderSection==='function') progRenderSection(); },
  'sec-progresso2':  function(){ if(typeof progRenderSection2==='function') progRenderSection2(); },
  'sec-progresso3':  function(){ if(typeof progRenderSection3==='function') progRenderSection3(); },
  'sec-progresso4':  function(){ if(typeof renderProg4==='function') renderProg4(); },
  'sec-quiz-game':   function(){ if(typeof qgStartForCap==='function') qgStartForCap(1); },
  'sec-quiz-game2':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(2); },
  'sec-quiz-game3':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(3); },
  'sec-quiz-game4':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(4); }
};

// ── Load content inline into a hub panel ──
// Uses DOM move (not clone) so all event handlers stay alive
var _mat7MovedSections = {}; // track where we moved sections: { tab: [ {el, parent}, ... ] }

// MULTI-CAP UNIFIED RENDERING
// When multiple chapters are selected, merge content into one
// unified component instead of stacking separate sections.

var _mat7CapNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};

// ── UNIFIED FLASHCARDS ──────────────────────────────────────
var _uniFC = { cards: [], idx: 0, flipped: false };

function mat7RenderUnifiedFlashcards(caps, inlineEl) {
  // Build merged card deck from all selected caps, tagged with cap name
  var capCardSources = {
    1: typeof FC_CARDS_CAP1 !== 'undefined' ? FC_CARDS_CAP1 : [],
    2: typeof FC2_CARDS !== 'undefined' ? FC2_CARDS : [],
    3: typeof FC3_CARDS !== 'undefined' ? FC3_CARDS : [],
    4: typeof BANCO4 !== 'undefined' && BANCO4.flashcards ? BANCO4.flashcards : []
  };
  var merged = [];
  caps.forEach(function(cap) {
    var src = capCardSources[cap] || [];
    src.forEach(function(card) {
      merged.push({ tag: card.tag, q: card.q, a: card.a });
    });
  });
  // Shuffle
  for (var i = merged.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = merged[i]; merged[i] = merged[j]; merged[j] = tmp;
  }

  // Swap the active deck and SRS key for a multi-cap session
  FC_CARDS = merged;
  SRS_KEY = 'edupt_srs_multi_' + caps.join('_');

  // Update the sec-header title to reflect mixed caps
  var secFC = document.getElementById('sec-flashcards');
  if (secFC) {
    var h2 = secFC.querySelector('.sec-header h2');
    if (h2) h2.innerHTML = '<span class="num"><i class="ph ph-stack"></i></span> Flashcards — ' + caps.length + ' Capítulos';
    var p = secFC.querySelector('.sec-header p');
    if (p) p.textContent = merged.length + ' cartões misturados de ' + caps.length + ' capítulos — com repetição espaçada';
  }

  // Move sec-flashcards into the inline panel (same as single-cap flow)
  if (!_mat7MovedSections['flashcards']) _mat7MovedSections['flashcards'] = [];
  if (secFC) {
    _mat7MovedSections['flashcards'].push({ el: secFC, parent: secFC.parentElement });
    secFC.style.display = '';
    secFC.classList.add('active');
    inlineEl.appendChild(secFC);
  }

  // Start the real SRS session
  if (typeof fcStartSession === 'function') setTimeout(fcStartSession, 50);
}
function _uniFC_render() {
  var cards = _uniFC.cards;
  if (!cards.length) return;
  var card = cards[_uniFC.idx];
  var el = function(id) { return document.getElementById(id); };
  el('ufc-cap-label').textContent = card.capName;
  el('ufc-tag').textContent = card.tag;
  el('ufc-q').textContent = card.q;
  el('ufc-a').textContent = card.a;
  el('ufc-counter').textContent = (_uniFC.idx + 1) + ' / ' + cards.length;
  var pct = Math.round((_uniFC.idx + 1) / cards.length * 100);
  if (el('ufc-prog')) el('ufc-prog').style.width = pct + '%';
  _uniFC.flipped = false;
  var inner = el('ufc-inner');
  if (inner) inner.style.transform = '';
  var flipBtn = el('ufc-flip-btn');
  if (flipBtn) flipBtn.textContent = 'Virar';
}

function _uniFC_flip() {
  _uniFC.flipped = !_uniFC.flipped;
  var inner = document.getElementById('ufc-inner');
  if (inner) inner.style.transform = _uniFC.flipped ? 'rotateY(180deg)' : '';
  var flipBtn = document.getElementById('ufc-flip-btn');
  if (flipBtn) flipBtn.textContent = _uniFC.flipped ? 'Ocultar' : 'Virar';
}

function _uniFC_next() {
  if (_uniFC.idx < _uniFC.cards.length - 1) { _uniFC.idx++; _uniFC_render(); }
}

function _uniFC_prev() {
  if (_uniFC.idx > 0) { _uniFC.idx--; _uniFC_render(); }
}

function _uniFC_shuffle() {
  var cards = _uniFC.cards;
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
  }
  _uniFC.idx = 0;
  _uniFC_render();
}

// ── Safe top-level stubs — overwritten by mat7RenderUnifiedExercicios when the panel loads.
// Without these, clicking the level/refresh buttons before the panel has ever initialised
// throws "mat7UnifiedQuizLevel is not a function".
window.mat7UnifiedQuizLevel = window.mat7UnifiedQuizLevel || function(level, btn) {
  // No-op until mat7RenderUnifiedExercicios sets the real implementation.
};
window.mat7UnifiedQuizRefresh = window.mat7UnifiedQuizRefresh || function() {
  // No-op until mat7RenderUnifiedExercicios sets the real implementation.
};

// ── UNIFIED JOGOS ───────────────────────────────────────────
function mat7RenderUnifiedJogos(caps, inlineEl) {
  // For multi-cap jogos: show ONE Jogo do 24 with mixed numbers from all caps
  // Determine difficulty based on highest selected cap
  var maxCap = Math.max.apply(null, caps);
  var level = maxCap >= 3 ? 'dificil' : maxCap >= 2 ? 'medio' : 'facil';
  var capStr = caps.map(function(c){ return _mat7CapNames[c]; }).join(' + ');

  inlineEl.innerHTML = [
    '<div class="sec-header"><h2><i class="ph ph-game-controller"></i> Jogo do 24 — Multi-Capítulo</h2>',
    '<p>Um único jogo com números de ' + capStr + '</p></div>',
    '<div id="j24-wrap-unified"></div>'
  ].join('\n');

  if (typeof _j24AutoInit === 'function') {
    // Clear init guard so game rebuilds when caps change
    if (typeof _gInited !== 'undefined') delete _gInited['j24-wrap-unified'];
    _j24AutoInit('j24-wrap-unified', level);
  }
}

// ── UNIFIED EXERCÍCIOS ──────────────────────────────────────
function mat7RenderUnifiedExercicios(caps, inlineEl) {
  var capNames = _mat7CapNames || {1:'Cap. 1',2:'Cap. 2',3:'Cap. 3',4:'Cap. 4'};
  var currentLevel = 'medio';

  function buildMixedQuiz(level) {
    var allExs = [];
    var dif = level;
    var limObj = typeof lim === 'function' ? lim(dif) : { min: -20, max: 20 };
    var min = limObj.min, max = limObj.max;

    // Per cap: generate 20 questions mixing all types (questoes + minitestes + teste)
    var numPerCap = Math.max(20, Math.ceil(20 / caps.length));

    caps.forEach(function(cap) {
      var capExs = [];
      var temas = ['1','2','3','4','5'];

      // Build a varied plan mixing fill, mc, vf, contexto
      var tipos = ['fill','mc','fill','mc','vf','fill','mc','fill','mc','fill',
                   'mc','fill','vf','mc','fill','mc','fill','mc','vf','fill'];

      for (var i = 0; i < numPerCap; i++) {
        var tema = temas[i % temas.length];
        var tipo = tipos[i % tipos.length];
        var ex = null;
        if (cap === 4) {
          if (typeof buildEx4 === 'function') ex = buildEx4(tema, dif);
        } else if (cap === 3) {
          if (typeof buildEx3 === 'function') ex = buildEx3(tema, tipo, dif);
        } else if (cap === 2) {
          var t2 = tipo === 'fill' ? 'fill_frac' : tipo;
          if (typeof buildEx2 === 'function') ex = buildEx2(tema, t2, dif);
        } else {
          if (typeof buildExercicio === 'function') {
            ex = buildExercicio(tema, tipo, min, max, capExs.length+1, dif)
              || buildExercicio(tema, 'fill', min, max, capExs.length+1, dif);
          }
        }
        if (ex) {
          ex._capId = cap;
          ex._capLabel = capNames[cap];
          ex.num = allExs.length + capExs.length + 1;
          capExs.push(ex);
        }
      }
      // Shuffle cap questions (Fisher-Yates)
      for (var _si = capExs.length - 1; _si > 0; _si--) {
        var _sj = Math.floor(Math.random() * (_si + 1));
        var _st = capExs[_si]; capExs[_si] = capExs[_sj]; capExs[_sj] = _st;
      }
      allExs = allExs.concat(capExs);
    });

    // Number sequentially
    allExs.forEach(function(ex, i){ ex.num = i + 1; });
    return allExs;
  }

  function renderUnifiedQuiz(level) {
    currentLevel = level;
    var exercicios = buildMixedQuiz(level);
    if (!exercicios.length) {
      inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Selecciona pelo menos um capítulo.</p>';
      return;
    }

    var capLabels = caps.map(function(c){ return capNames[c] || 'Cap.'+c; }).join(' + ');
    var levelLabel = level === 'facil' ? 'Fácil' : level === 'dificil' ? 'Difícil' : 'Médio';

    var html = [
      '<div class="sec-header"><h2><i class="ph ph-pencil-simple"></i> Exercícios — ' + capLabels + '</h2>',
      '<p>' + exercicios.length + ' questões · nível ' + levelLabel + ' · mistura de todos os tipos</p></div>',
      '<div class="level-bar" style="margin-bottom:1.25rem">',
      '  <div class="gen-level-group">',
      '    <span class="gen-level-label">Nível:</span>',
      '    <button class="gen-level-btn' + (level==='facil'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'facil\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#4caf50;display:inline-block;margin-right:4px"></span>Fácil</button>',
      '    <button class="gen-level-btn' + (level==='medio'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'medio\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#ff9800;display:inline-block;margin-right:4px"></span>Médio</button>',
      '    <button class="gen-level-btn' + (level==='dificil'?' active':'') + '" onclick="mat7UnifiedQuizLevel(\'dificil\',this)"><span style="width:8px;height:8px;border-radius:50%;background:#f44336;display:inline-block;margin-right:4px"></span>Difícil</button>',
      '  </div>',
      '  <button class="btn btn-ghost" style="margin-left:auto" onclick="mat7UnifiedQuizRefresh()">↺ Novas questões</button>',
      '</div>',
      '<div id="uq-container"></div>',
    ].join('\n');

    inlineEl.innerHTML = html;

    window._mat7UnifiedCaps = caps;
    window._mat7UnifiedLevel = level;

    // Use quiz engine
    if (typeof qzInit === 'function') {
      var sec = 'uq' + caps.join('');
      qzInit('uq-container', exercicios, sec, function(correct, total) {
        // Log progress for each cap
        caps.forEach(function(cap) {
          var capExercises = exercicios.filter(function(ex){ return ex._capId===cap; });
          var capTotal = capExercises.length;
          // Estimate per-cap correct proportionally by cap share
          var capCorrect = capTotal > 0 ? Math.round(correct * capTotal / (exercicios.length || 1)) : 0;
          if (cap===1 && typeof progLog==='function') progLog('questoes', capCorrect > 0);
          else if (cap===2 && typeof progLog2==='function') progLog2('questoes', capCorrect > 0);
          else if (cap===3 && typeof progLog3==='function') progLog3('questoes', capCorrect > 0);
          else if (cap===4 && typeof progLog4==='function') progLog4('questoes', capCorrect > 0);
          if (typeof ProgressManager !== 'undefined') _pmRecord('cap'+cap, 'quiz', {pontuacao:capCorrect, total:capTotal});
        });
      });
    }
  }

  // Expose level change and refresh
  window.mat7UnifiedQuizLevel = function(level, btn) {
    document.querySelectorAll('#mat7-inline-exercicios .gen-level-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderUnifiedQuiz(level);
  };
  window.mat7UnifiedQuizRefresh = function() {
    renderUnifiedQuiz(currentLevel);
  };

  renderUnifiedQuiz(currentLevel);
}

function mat7LoadInline(tab) {
  var inlineEl = document.getElementById('mat7-inline-' + tab);
  if (!inlineEl) return;
  
  // Get active caps (may be array for multi-select)
  var caps = _mat7GetActiveCaps(tab);
  
  // Return all previously moved sections for this tab
  mat7ReturnSections(tab);
  
  inlineEl.innerHTML = '';
  var loaded = false;
  
  // ── UNIFIED MULTI-CAP RENDERING ──────────────────────────
  // exercicios: always use unified quiz (1 or more caps)
  if (tab === 'exercicios') {
    mat7RenderUnifiedExercicios(caps, inlineEl);
    return;
  }
  if (caps.length > 1) {
    if (tab === 'flashcards') {
      mat7RenderUnifiedFlashcards(caps, inlineEl);
      return;
    }
    if (tab === 'jogos') {
      mat7RenderUnifiedJogos(caps, inlineEl);
      return;
    }
  }
  
  caps.forEach(function(cap) {
    var secId = (_mat7SecMap[tab] || {})[cap];
    if (!secId) return;
    
    var secEl = document.getElementById(secId);
    if (!secEl) return;
    
    // Save reference to original parent
    if (!_mat7MovedSections[tab]) _mat7MovedSections[tab] = [];
    _mat7MovedSections[tab].push({ el: secEl, parent: secEl.parentElement });
    
    // Add cap divider if multiple caps
    if (caps.length > 1 && loaded) {
      var sep = document.createElement('div');
      sep.style.cssText = 'border-top:2px dashed var(--border2);margin:2rem 0;';
      inlineEl.appendChild(sep);
    }
    if (caps.length > 1) {
      var capLabel = document.createElement('div');
      var capNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};
      capLabel.style.cssText = 'font-family:"Cormorant Garamond",serif;font-size:1.15rem;font-weight:800;color:var(--sage-dark);margin-bottom:.75rem;display:flex;align-items:center;gap:.5rem';
      capLabel.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:var(--sage-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:900">' + cap + '</span> ' + (capNames[cap] || 'Cap. ' + cap);
      inlineEl.appendChild(capLabel);
    }
    
    // Move it
    secEl.style.display = '';
    secEl.classList.add('active');
    inlineEl.appendChild(secEl);
    loaded = true;
    
    // Run init function
    var initFn = _mat7InitMap[secId];
    if (initFn) setTimeout(initFn, 50);
  });
  
  if (!loaded) {
    inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Conteúdo em preparação para este capítulo.</p>';
  }
}

// Get array of active cap numbers for a tab
function _mat7GetActiveCaps(tab) {
  var row = document.getElementById('mat7-caps-' + tab);
  if (!row) return [1];
  var caps = [];
  row.querySelectorAll('.mat7-cap-btn.active, .gf-cap-btn.active').forEach(function(b) {
    var n = parseInt(b.dataset.cap);
    if (!isNaN(n) && caps.indexOf(n) === -1) caps.push(n);
  });
  return caps.length ? caps : [1];
}

function mat7SwitchTab(tab, btn) {
  document.querySelectorAll('.mat7-hub-tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.mat7-panel').forEach(function(p){ p.classList.remove('active'); p.style.display = 'none'; });
  var panel = document.getElementById('mat7p-' + tab);
  if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
  // Update document title
  var _tabTitles = { resumo:'Resumo', exercicios:'Exercícios', testes:'Testes',
    flashcards:'Flashcards', jogos:'Jogos', exame:'Exame', progresso:'Progresso', quiz:'Modo Quiz' };
  if (_tabTitles[tab]) document.title = 'Mat. 7.º — ' + _tabTitles[tab] + ' · 3ponto14';
  // Auto-render content
  if (tab === 'resumo') mat7RenderResumoInline();
  else if (tab === 'quiz') { if (typeof qgHubInit === 'function') qgHubInit(); }
  else if (tab === 'progresso') { if (typeof renderProgressoUnificado === 'function') renderProgressoUnificado(); }
  else if (tab === 'exercicios') {
    mat7LoadInline('exercicios');
    // Load whichever mode is currently active
    var miniSec = document.getElementById('exmode-section-minitestes');
    if (miniSec && miniSec.style.display !== 'none') mat7LoadInline('minitestes');
    if(typeof testeReloadFromGf==='function') setTimeout(testeReloadFromGf, 300);
  }
  else if (tab === 'minitestes') { mat7SwitchTab('exercicios', document.querySelector('[data-tab="exercicios"]')); return; }
  else if (_mat7SecMap[tab]) mat7LoadInline(tab);
}

function exModeSwitch(mode) {
  var secEx   = document.getElementById('exmode-section-exercicios');
  var secMini = document.getElementById('exmode-section-minitestes');
  var btnEx   = document.getElementById('exmode-btn-ex');
  var btnMini = document.getElementById('exmode-btn-mini');
  if (!secEx || !secMini) return;

  var active = mode === 'exercicios';
  secEx.style.display   = active ? '' : 'none';
  secMini.style.display = active ? 'none' : '';

  var activeStyle = 'background:var(--sage-dark);color:#fff;box-shadow:0 2px 8px rgba(81,104,96,.25)';
  var inactiveStyle = 'background:transparent;color:var(--ink3)';
  if (btnEx)   btnEx.style.cssText   = 'flex:1;padding:8px 0;border:none;border-radius:9px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;' + (active ? activeStyle : inactiveStyle);
  if (btnMini) btnMini.style.cssText = 'flex:1;padding:8px 0;border:none;border-radius:9px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s;' + (!active ? activeStyle : inactiveStyle);

  if (active) { mat7LoadInline('exercicios'); }
  else        { mat7LoadInline('minitestes'); }
}


function mat7RenderSt(tab, cap) {
  var stRow = document.getElementById('mat7-st-' + tab);
  if (!stRow) return;
  var subtemas = _mat7Subtemas[cap] || [];
  var html = '<span class="mat7-st-label">Subtema</span>';
  html += '<button class="mat7-st-chip active" data-st="0" onclick="mat7StSelect(this,\'' + tab + '\')" >Todos</button>';
  subtemas.forEach(function(st, i) {
    html += '<button class="mat7-st-chip" data-st="' + (i+1) + '" onclick="mat7StSelect(this,\'' + tab + '\')">' + st + '</button>';
  });
  stRow.innerHTML = html;
}

function mat7StSelect(btn, tab) {
  var row = btn.closest('.mat7-st-row');
  if (!row) return;
  row.querySelectorAll('.mat7-st-chip').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  // Auto-render inline content for resumo tab
  if (tab === 'resumo') mat7RenderResumoInline();
}

// ═══ TESTES — novo sistema cap+subtema igual ao gerador de fichas ═══
var _testeDif = 'facil';


function testeReloadFromGf() {
  // Read active caps from the new gf-style selector
  var activeCaps = [];
  document.querySelectorAll('#gf-caps-testes .gf-cap-btn.active').forEach(function(b) {
    activeCaps.push(parseInt(b.dataset.cap));
  });
  if (!activeCaps.length) activeCaps = [1];

  // Map cap → section
  var secMap = { 1:'sec-teste', 2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4' };
  var initMap = {
    'sec-teste':  function(){ var el=document.getElementById('t-container');  if(el && !el.innerHTML && typeof gerarTeste==='function') gerarTeste(); },
    'sec-teste2': function(){ var el=document.getElementById('t2-container'); if(el && !el.innerHTML && typeof gerarTeste2==='function') gerarTeste2(); },
    'sec-teste3': function(){ var el=document.getElementById('t3-container'); if(el && !el.innerHTML && typeof gerarTeste3==='function') gerarTeste3(); },
    'sec-teste4': function(){ var el=document.getElementById('t4-container'); if(el && !el.innerHTML && typeof renderTeste4==='function') renderTeste4(); }
  };

  // Return previously moved sections
  mat7ReturnSections('testes');
  var inlineEl = document.getElementById('mat7-inline-testes');
  if (!inlineEl) return;
  inlineEl.innerHTML = '';

  var loaded = false;
  var capNames = {1:'Cap. 1 · Inteiros', 2:'Cap. 2 · Racionais', 3:'Cap. 3 · Geometria', 4:'Cap. 4 · Álgebra'};

  activeCaps.forEach(function(cap) {
    var secId = secMap[cap];
    if (!secId) return;
    var secEl = document.getElementById(secId);
    if (!secEl) return;

    if (!_mat7MovedSections['testes']) _mat7MovedSections['testes'] = [];
    _mat7MovedSections['testes'].push({ el: secEl, parent: secEl.parentElement });

    if (loaded) {
      var sep = document.createElement('div');
      sep.style.cssText = 'border-top:2px dashed var(--border2);margin:2rem 0;';
      inlineEl.appendChild(sep);
    }

    // Cap label header
    var capLabel = document.createElement('div');
    capLabel.style.cssText = 'font-family:"Cormorant Garamond",serif;font-size:1.15rem;font-weight:800;color:var(--sage-dark);margin-bottom:.75rem;display:flex;align-items:center;gap:.5rem';
    capLabel.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:var(--sage-dark);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:900">' + cap + '</span> ' + (capNames[cap] || 'Cap. ' + cap);
    inlineEl.appendChild(capLabel);

    secEl.style.display = '';
    secEl.classList.add('active');
    inlineEl.appendChild(secEl);
    loaded = true;

    var initFn = initMap[secId];
    if (initFn) setTimeout(initFn, 50);
  });

  if (!loaded) {
    inlineEl.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Seleciona pelo menos um capítulo.</p>';
  }
}

// ── Render theory content inline in the resumo panel ──
function mat7RenderResumoInline() {
  var cap = _mat7Sel['resumo'] || 1;
  // Support both old .mat7-st-chip and new gf-st-chip in the tray for resumo
  var trayId = 'mat7-st-' + cap + '-resumo';
  var tray = document.getElementById(trayId);
  var stChip = tray ? tray.querySelector('.gf-st-chip.active') : null;
  var stIdx = stChip ? parseInt(stChip.dataset.st) : 0; // 0 = all

  // Source section IDs per cap
  var srcIds = { 1: 'sec-teoria', 2: 'sec-teoria2', 3: 'sec-teoria3', 4: 'sec-teoria4' };
  var srcEl = document.getElementById(srcIds[cap]);
  var dest = document.getElementById('mat7-resumo-content');
  if (!dest) return;

  if (!srcEl) {
    dest.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Conteúdo em preparação para este capítulo.</p>';
    return;
  }

  // Clone the teoria section (keep IDs temporarily for subtema lookup below)
  var clone = srcEl.cloneNode(true);
  clone.removeAttribute('id');
  clone.style.display = 'block';
  clone.classList.remove('section', 'section4');

  // If a specific subtema is selected (stIdx > 0), show only that topic block
  if (stIdx > 0) {
    var topicEl = null;

    if (cap === 1) {
      // Cap1: ids are topic-1, topic-2, ...
      topicEl = clone.querySelector('#topic-' + stIdx);
    } else if (cap === 2) {
      // Cap2: ids are topic2-1, topic2-2, ...
      topicEl = clone.querySelector('#topic2-' + stIdx);
    } else if (cap === 3) {
      // Cap3: ids are topic3-1, topic3-2, ...
      topicEl = clone.querySelector('#topic3-' + stIdx);
    } else if (cap === 4) {
      // Cap4: uses .subtema-header with .subtema-num text content
      var headers = clone.querySelectorAll('.subtema-header');
      headers.forEach(function(h) {
        var numEl = h.querySelector('.subtema-num');
        if (numEl && parseInt(numEl.textContent) === stIdx) {
          topicEl = document.createElement('div');
          topicEl.appendChild(h.cloneNode(true));
          // grab next sibling def-block(s)
          var sib = h.nextElementSibling;
          while (sib && !sib.classList.contains('subtema-header')) {
            topicEl.appendChild(sib.cloneNode(true));
            sib = sib.nextElementSibling;
          }
        }
      });
    }

    if (topicEl) {
      var filtered = document.createElement('div');
      var header = clone.querySelector('.sec-header');
      if (header) filtered.appendChild(header.cloneNode(true));
      filtered.appendChild(topicEl);
      // Strip IDs from the fragment before inserting to avoid duplicates
      filtered.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });
      dest.innerHTML = '';
      dest.appendChild(filtered);
      return;
    }
  }

  // Strip all descendant IDs to prevent duplicate-ID collisions with the live originals
  clone.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });

  // Show full teoria
  dest.innerHTML = '';
  dest.appendChild(clone);
}

// Return moved sections for a specific tab
function mat7ReturnSections(tab) {
  var prevArr = _mat7MovedSections[tab];
  if (prevArr && prevArr.length) {
    prevArr.forEach(function(prev) {
      if (prev.el && prev.parent) {
        prev.el.classList.remove('active');
        prev.el.style.display = '';
        prev.parent.appendChild(prev.el);
      }
    });
  }
  _mat7MovedSections[tab] = [];
}

// Init subtema rows on load — content is rendered lazily when tab is first opened
// mat7RenderResumoInline() is called from mat7SwitchTab when 'resumo' tab is activated

// ═══ MAT7 TAB SUBTEMA SELECTOR — nova UI estilo gerador ═══

// Reload de conteúdo por tab
function mat7TabReload(tab) {
  if (tab === 'resumo') {
    // Para o resumo: relê o capítulo activo e re-renderiza
    var row = document.getElementById('mat7-caps-resumo');
    if (row) {
      var activeBtn = row.querySelector('.gf-cap-btn.active');
      if (activeBtn) _mat7Sel['resumo'] = parseInt(activeBtn.dataset.cap) || 1;
    }
    mat7RenderResumoInline();
  } else if (_mat7SecMap[tab]) {
    mat7LoadInline(tab);
  }
}

// Clique num botão de capítulo num tab
function mat7TabCapClick(tab, cap, btn) {
  var container = document.getElementById('mat7-caps-' + tab);
  if (!container) return;

  if (tab === 'resumo') {
    // Single-select para o resumo
    container.querySelectorAll('.gf-cap-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    _mat7Sel['resumo'] = cap;
  } else {
    // Multi-select toggle para os outros tabs
    btn.classList.toggle('active');
    // Garante que pelo menos 1 está activo
    if (!container.querySelector('.gf-cap-btn.active')) btn.classList.add('active');
  }

  // Toggle tray (abre/fecha subtemas deste capítulo)
  var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
  if (tray) {
    var isActive = btn.classList.contains('active');
    if (!isActive) {
      tray.style.display = 'none';
    } else {
      tray.style.display = tray.style.display === 'none' ? '' : 'none';
    }
  }

  mat7TabReload(tab);
}

// Clique num chip de subtema num tab
function mat7TabStClick(btn, tab, cap) {
  if (tab === 'resumo') {
    // Single-select: desactiva todos os chips deste tray e activa só este
    var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
    if (tray) {
      tray.querySelectorAll('.gf-st-chip').forEach(function(c) { c.classList.remove('active'); });
    }
    btn.classList.add('active');
  } else {
    // Multi-select toggle, com garantia de ao menos 1 activo
    btn.classList.toggle('active');
    var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
    if (tray && !tray.querySelector('.gf-st-chip.active')) {
      btn.classList.add('active');
    }
  }
  mat7TabReload(tab);
}

// Seleccionar / desseleccionar todos os subtemas de um cap num tab
function mat7TabStAll(tab, cap, selectAll) {
  var tray = document.getElementById('mat7-st-' + cap + '-' + tab);
  if (!tray) return;
  tray.querySelectorAll('.gf-st-chip').forEach(function(c) {
    if (selectAll) c.classList.add('active');
    else c.classList.remove('active');
  });
  // Para o resumo garante pelo menos 1 activo
  if (tab === 'resumo' && !selectAll) {
    var first = tray.querySelector('.gf-st-chip');
    if (first) first.classList.add('active');
  }
  mat7TabReload(tab);
}

// ── Multi-cap selector (mat7.html standalone — no mega.js loaded) ──
var capitulosSelecionados = [];
var _TODOS_CAPS = [1, 2, 3, 4];

function updateFAB() {
  var fab = document.getElementById('mega-fab');
  var badge = document.getElementById('fab-badge');
  var n = capitulosSelecionados.length;
  if (badge) badge.textContent = n;
  var insideMega = document.getElementById('view-mega') && document.getElementById('view-mega').style.display !== 'none';
  if (fab) {
    if (n > 0 && !insideMega) { fab.classList.add('visible'); }
    else { fab.classList.remove('visible'); }
  }
  var btnTodos = document.getElementById('btn-todos');
  var iconTodos = document.getElementById('btn-todos-icon');
  if (!btnTodos) return;
  var allSelected = _TODOS_CAPS.every(function(c){ return capitulosSelecionados.indexOf(c) !== -1; });
  if (allSelected) {
    btnTodos.style.background = 'linear-gradient(135deg,var(--c2-mid),var(--c2-deep))';
    btnTodos.style.color = '#fff';
    btnTodos.style.borderColor = 'transparent';
    if (iconTodos) iconTodos.textContent = '\u2713';
    btnTodos.childNodes[1] && (btnTodos.childNodes[1].textContent = ' Desselecionar Todos');
  } else {
    btnTodos.style.background = 'linear-gradient(135deg,var(--c2-base),var(--c2-pale))';
    btnTodos.style.color = 'var(--c2-deep)';
    btnTodos.style.borderColor = 'rgba(81,104,96,.25)';
    if (iconTodos) iconTodos.textContent = '\u2610';
    btnTodos.childNodes[1] && (btnTodos.childNodes[1].textContent = ' Selecionar Todos os Cap\u00edtulos');
  }
}

function toggleCapSel(capNum) {
  var card = document.getElementById('mat7-cap' + capNum);
  var chkBox = document.getElementById('chkbox-cap' + capNum);
  var idx = capitulosSelecionados.indexOf(capNum);
  if (idx === -1) {
    capitulosSelecionados.push(capNum);
    if (chkBox) chkBox.classList.add('checked');
    if (card) card.classList.add('cap-selected');
  } else {
    capitulosSelecionados.splice(idx, 1);
    if (chkBox) chkBox.classList.remove('checked');
    if (card) card.classList.remove('cap-selected');
  }
  updateFAB();
}

function selecionarTodos(btn) {
  var allSelected = _TODOS_CAPS.every(function(c){ return capitulosSelecionados.indexOf(c) !== -1; });
  if (allSelected) {
    _TODOS_CAPS.forEach(function(c){
      capitulosSelecionados.splice(capitulosSelecionados.indexOf(c), 1);
      var card = document.getElementById('mat7-cap' + c);
      var chkBox = document.getElementById('chkbox-cap' + c);
      if (card) card.classList.remove('cap-selected');
      if (chkBox) chkBox.classList.remove('checked');
    });
  } else {
    _TODOS_CAPS.forEach(function(c){
      if (capitulosSelecionados.indexOf(c) === -1) {
        capitulosSelecionados.push(c);
        var card = document.getElementById('mat7-cap' + c);
        var chkBox = document.getElementById('chkbox-cap' + c);
        if (card) card.classList.add('cap-selected');
        if (chkBox) chkBox.classList.add('checked');
      }
    });
  }
  updateFAB();
}


