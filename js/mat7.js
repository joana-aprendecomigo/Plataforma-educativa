/* ── Block 1 (from line 807) ── */
// ═══ MAT7 HUB — subtema data ═══
var _mat7Subtemas = {
  1: ['Conjunto ℤ', 'Valor absoluto e simétrico', 'Adição de inteiros', 'Subtração de inteiros', 'Expressões com parênteses'],
  2: ['Comparação e ordenação', 'Adição e subtração de frações', 'Percentagens', 'Potências', 'Notação científica'],
  3: ['Ângulos internos de polígonos', 'Triângulos e congruência', 'Semelhança de triângulos', 'Áreas de figuras planas', 'Circunferência'],
  4: ['Sequências e termo geral', 'Expressões algébricas', 'Simplificação', 'Equações do 1.º grau', 'Inequações'],
  5: ['Sequências e Termo Geral', 'Problemas com Sequências'],
  6: ['Referencial Cartesiano', 'Conceito de Função', 'Representação Gráfica', 'Formas de Representar', 'Proporcionalidade Direta', 'Gráficos em Contexto Real'],
  7: ['Figuras Semelhantes', 'Polígonos Semelhantes', 'Homotetia', 'Semelhança de Triângulos', 'Perímetros e Áreas', 'Poliedros e Euler'],
  8: ['População e Amostra', 'Mediana, Média e Moda', 'Representações Gráficas', 'Probabilidade', 'Probabilidade Composta']
};

// ═══ CAP SELECTOR BUILDER — generates chapter/subtema selector HTML ═══
var _capMeta = [
  {n:1, icon:'±', label:'Números Inteiros'},
  {n:2, icon:'½', label:'Números Racionais'},
  {n:3, icon:'<i class="ph ph-triangle"></i>', label:'Geometria'},
  {n:4, icon:'𝑥', label:'Equações'},
  {n:5, icon:'<i class="ph ph-list-numbers"></i>', label:'Sequências'},
  {n:6, icon:'<i class="ph ph-chart-line"></i>', label:'Funções'},
  {n:7, icon:'<i class="ph ph-shapes"></i>', label:'Figuras Semelhantes'},
  {n:8, icon:'<i class="ph ph-chart-bar"></i>', label:'Dados e Probabilidades'}
];
// Short subtema labels per chapter (mat7 tabs use these)
var _capStShort = {
  1: ['Conjunto ℤ','Valor absoluto','Adição','Subtração','Parênteses'],
  2: ['Comparação','Adição/Subt.','Percentagens','Potências','Not. Científica'],
  3: ['Ângulos','Triângulos','Semelhança','Áreas','Circunferência'],
  4: ['Sequências','Expressões','Simplificação','Equações','Inequações'],
  5: ['Termo Geral','Problemas com Sequências'],
  6: ['Referencial','Conceito de Função','Representação Gráfica','Formas de Representar','Prop. Direta','Gráficos Reais'],
  7: ['Semelhantes','Polígonos','Homotetia','Critérios','Perímetros/Áreas','Poliedros'],
  8: ['Pop./Amostra','Medidas Centrais','Rep. Gráficas','Probabilidade','Prob. Composta']
};
// Fichas panel uses slightly different labels
var _capStFichas = {
  1: ['Conjunto ℤ','Valor absoluto','Adição','Subtração','Parênteses'],
  2: ['Comparação','Adição/Subtração','Percentagens','Potências','Not. Científica'],
  3: ['Ângulos internos','Ângulos externos','Retas paralelas','Quadriláteros','Áreas'],
  4: ['Sequências','Expressões','Equações','Problemas'],
  5: ['Termo Geral','Sequências Aritméticas','Problemas'],
  6: ['Referencial','Função','Gráfica','Formas','Prop. Direta','Contexto Real'],
  7: ['Semelhantes','Polígonos','Homotetia','Critérios','Perímetros/Áreas','Poliedros'],
  8: ['Pop./Amostra','Medidas Centrais','Rep. Gráficas','Probabilidade','Prob. Composta']
};

/**
 * Build cap selector HTML.
 * @param {string} tab - tab identifier (e.g. 'resumo', 'jogos')
 * @param {object} opts - { type:'mat7tab'|'gf'|'simple', panelId:string, caps:[1,2,3,4], stData:object, numbered:boolean }
 */
function _buildCapSelHTML(tab, opts) {
  var type = opts.type || 'mat7tab';
  var panelId = opts.panelId || tab;
  var caps = opts.caps || [1,2,3,4,5,6,7,8];
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
      var trayClass = '';
      var trayStyle = ' style="display:none"';
      if (type === 'gf' && isFirst) { trayClass = ' open'; trayStyle = ''; }
      else if (type !== 'gf' && isFirst) { trayStyle = ' style="display:flex;flex-wrap:wrap;gap:.3rem;align-items:center"'; }
      h += '<div class="gf-st-tray'+trayClass+'"'+trayStyle+' id="'+trayId+'"><span class="gf-st-tray-label">Subtemas:</span>';
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
    {id:'mat7-caps-jogos',       tab:'jogos', opts:{type:'mat7tab'}},
    {id:'mat7-caps-flashcards',  tab:'flashcards', opts:{type:'mat7tab'}},
    {id:'mat7-caps-exame',       tab:'exame', opts:{type:'mat7tab'}},
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

// ── "Por onde começar?" continue banner ──────────────────────────────────────
var _mat7CapNames = {
  1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria',
  4:'Equações', 5:'Sequências', 6:'Funções',
  7:'Figuras Semelhantes', 8:'Dados e Probabilidades'
};
var _mat7CapColors = {
  1:'var(--c1-main,#4f8ef7)', 2:'var(--c2-main,#e06c75)', 3:'var(--c3-main,#98c379)',
  4:'var(--c4-main,#e5c07b)', 5:'var(--c5-main,#c678dd)', 6:'var(--c6-main,#56b6c2)',
  7:'var(--c7-main,#d19a66)', 8:'var(--c8-main,#61afef)'
};
var _mat7StorageKeys = {
  1:'edupt_cap1', 2:'edupt_cap2', 3:'edupt_cap3', 4:'edupt_cap4',
  5:'edupt_cap5', 6:'edupt_cap6', 7:'edupt_cap7', 8:'edupt_cap8'
};
function mat7RenderContinueBanner() {
  var banner = document.getElementById('mat7-continue-banner');
  if (!banner) return;

  // Find the cap with most recent activity that has progress
  var best = null, bestTs = 0;
  for (var cap = 1; cap <= 8; cap++) {
    try {
      var raw = localStorage.getItem(_mat7StorageKeys[cap]);
      if (!raw) continue;
      var d = JSON.parse(raw);
      // Check for any recorded activity (sections with total > 0, or log entries)
      var hasActivity = false;
      var ts = d.lastActivity || 0;
      // Fallback: cap5 legacy format stores last_updated as "dd/mm/yyyy" string
      if (!ts && d.last_updated) {
        var parts = d.last_updated.split('/');
        if (parts.length === 3) {
          var parsed = new Date(+parts[2], +parts[1]-1, +parts[0]);
          if (!isNaN(parsed.getTime())) ts = parsed.getTime();
        }
      }
      if (d.sections) {
        Object.keys(d.sections).forEach(function(k) {
          if (d.sections[k] && d.sections[k].total > 0) { hasActivity = true; ts = ts || Date.now(); }
        });
      }
      if (d.log && d.log.length) { hasActivity = true; ts = ts || Date.now(); }
      if (hasActivity && ts >= bestTs) { best = cap; bestTs = ts; }
    } catch(e) {}
  }

  if (!best) { banner.style.display = 'none'; return; }

  // Calculate overall score for that cap
  var correct = 0, total = 0;
  try {
    var data = JSON.parse(localStorage.getItem(_mat7StorageKeys[best]) || '{}');
    if (data.sections) {
      Object.keys(data.sections).forEach(function(k) {
        var s = data.sections[k] || {};
        correct += s.correct || 0;
        total += s.total || 0;
      });
    }
  } catch(e) {}

  var pct = total > 0 ? Math.round(correct / total * 100) : 0;
  var color = _mat7CapColors[best];
  var name = _mat7CapNames[best];

  // Format last activity date
  var when = '';
  if (bestTs) {
    var d2 = new Date(bestTs), now = new Date();
    var diffDays = Math.floor((now - d2) / 86400000);
    when = diffDays === 0 ? 'hoje' : diffDays === 1 ? 'ontem' : 'há ' + diffDays + ' dias';
  }

  var emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : pct >= 40 ? '💪' : '📖';
  var msg = pct >= 80 ? 'Óptimo trabalho! Continua assim.' :
            pct >= 60 ? 'Bom progresso! Podes melhorar ainda mais.' :
            pct >= 40 ? 'A progredir! Pratica mais para solidificar.' :
            'Começaste! Continua a praticar.';

  banner.style.display = 'block';
  banner.innerHTML =
    '<div style="margin:.75rem 1rem 0;padding:.85rem 1.1rem;background:var(--surface);border:1px solid var(--border);border-left:4px solid ' + color + ';border-radius:.75rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">'
    + '<div style="font-size:1.6rem;line-height:1">' + emoji + '</div>'
    + '<div style="flex:1;min-width:0">'
    + '<div style="font-size:.82rem;font-weight:700;color:var(--ink2)">Continua onde paraste' + (when ? ' — <span style="font-weight:400;color:var(--ink4)">' + when + '</span>' : '') + '</div>'
    + '<div style="font-size:.78rem;color:var(--ink3);margin-top:.15rem">Cap. ' + best + ' — ' + name + (total > 0 ? ' · ' + pct + '% de acerto (' + correct + '/' + total + ' certas)' : '') + '</div>'
    + '<div style="font-size:.74rem;color:var(--ink4);margin-top:.1rem">' + msg + '</div>'
    + '</div>'
    + '<a href="cap' + best + '.html" class="btn btn-primary" style="white-space:nowrap;font-size:.8rem;padding:.45rem 1rem"><i class="ph ph-arrow-right"></i> Ir para Cap. ' + best + '</a>'
    + '<button onclick="this.parentElement.parentElement.style.display=\'none\'" style="background:none;border:none;cursor:pointer;color:var(--ink4);font-size:1.1rem;padding:0 .25rem" title="Fechar">✕</button>'
    + '</div>';
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mat7RenderContinueBanner);
else mat7RenderContinueBanner();

// Section scroll targets per tab and cap
var _mat7Targets = {
  resumo:      { 1:'bloco1-resumo', 2:'sec-temas2', 3:'sec-temas3', 4:'sec-temas4', 5:'sec-temas5', 6:'sec-temas6', 7:'sec-temas7', 8:'sec-temas8' },
  questoes:    { 1:'sec-questoes',  2:'sec-questoes2', 3:'sec-questoes3', 4:'sec-questoes4', 5:'sec-questoes5', 6:'sec-questoes6', 7:'sec-questoes7', 8:'sec-questoes8' },
  miniteste:   { 1:'sec-minitestes', 2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4', 5:'sec-minitestes5', 6:'sec-minitestes6', 7:'sec-minitestes7', 8:'sec-minitestes8' },
  teste:       { 1:'sec-teste',     2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4', 5:'sec-teste5', 6:'sec-teste6', 7:'sec-teste7', 8:'sec-teste8' },
  jogos:       { 1:'sec-jogos',     2:'sec-jogos2', 3:'sec-jogos3', 4:'sec-jogos4', 5:'sec-jogos5', 6:'sec-jogos6', 7:'sec-jogos7', 8:'sec-jogos8' },
  flashcards:  { 1:'sec-flashcards',2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4', 5:'sec-flashcards5', 6:'sec-flashcards6', 7:'sec-flashcards7', 8:'sec-flashcards8' },
  exame:       { 1:'sec-exame',     2:'sec-exame2', 3:'sec-exame3', 4:'sec-exame4', 5:'sec-exame5', 6:'sec-exame6', 7:'sec-exame7', 8:'sec-exame8' }
};

// Current selections per tab
var _mat7Sel = { resumo:1, exercicios:1, testes:1, jogos:1, flashcards:1, exame:1 };

// ── Map: which section ID to grab from which view, per cap ──
var _mat7SecMap = {
  exercicios: { 1:'sec-questoes',    2:'sec-questoes2',   3:'sec-questoes3',   4:'sec-questoes4',  5:'sec-questoes5',  6:'sec-questoes6',  7:'sec-questoes7',  8:'sec-questoes8' },
  minitestes: { 1:'sec-minitestes',  2:'sec-minitestes2', 3:'sec-minitestes3', 4:'sec-minitestes4', 5:'sec-minitestes5', 6:'sec-minitestes6', 7:'sec-minitestes7', 8:'sec-minitestes8' },
  jogos:      { 1:'sec-jogos',       2:'sec-jogos2',      3:'sec-jogos3',      4:'sec-jogos4',     5:'sec-jogos5',     6:'sec-jogos6',     7:'sec-jogos7',     8:'sec-jogos8' },
  flashcards: { 1:'sec-flashcards',  2:'sec-flashcards2', 3:'sec-flashcards3', 4:'sec-flashcards4', 5:'sec-flashcards5', 6:'sec-flashcards6', 7:'sec-flashcards7', 8:'sec-flashcards8' },
  exame:      { 1:'sec-exame',       2:'sec-exame2',      3:'sec-exame3',      4:'sec-exame4',     5:'sec-exame5',     6:'sec-exame6',     7:'sec-exame7',     8:'sec-exame8' },
  // progresso: handled by renderProgressoUnificado — not in secMap
  quiz:       { 1:'sec-quiz-game',   2:'sec-quiz-game2',  3:'sec-quiz-game3',  4:'sec-quiz-game4', 5:'sec-quiz-game5', 6:'sec-quiz-game6', 7:'sec-quiz-game7', 8:'sec-quiz-game8' }
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
  'sec-exame':       function(){ if(typeof exameReset==='function') exameReset(); },
  'sec-exame2':      function(){ if(typeof exame2Reset==='function') exame2Reset(); },
  'sec-exame3':      function(){ if(typeof exame3Reset==='function') exame3Reset(); },
  'sec-exame4':      function(){ var c=document.getElementById('exame4-config');var r=document.getElementById('exame4-running');var rs=document.getElementById('exame4-result');if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none'; },
  'sec-progresso':   function(){ if(typeof progRenderSection==='function') progRenderSection(); },
  'sec-progresso2':  function(){ if(typeof progRenderSection2==='function') progRenderSection2(); },
  'sec-progresso3':  function(){ if(typeof progRenderSection3==='function') progRenderSection3(); },
  'sec-progresso4':  function(){ if(typeof renderProg4==='function') renderProg4(); },
  'sec-quiz-game':   function(){ if(typeof qgStartForCap==='function') qgStartForCap(1); },
  'sec-quiz-game2':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(2); },
  'sec-quiz-game3':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(3); },
  'sec-quiz-game4':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(4); },
  'sec-questoes5':   function(){ var el=document.getElementById('q5-container');  if(el && !el.innerHTML && typeof renderQuestoes5==='function') renderQuestoes5(); if(typeof showMini5==='function'&&document.getElementById('m5-container')&&!document.getElementById('m5-container').innerHTML)showMini5(0,null); if(typeof renderTeste5==='function'&&document.getElementById('t5-container')&&!document.getElementById('t5-container').innerHTML)renderTeste5(); },
  'sec-minitestes5': function(){ var el=document.getElementById('m5-container');  if(el && !el.innerHTML && typeof showMini5==='function') showMini5(0,null); },
  'sec-teste5':      function(){ var el=document.getElementById('t5-container');  if(el && !el.innerHTML && typeof renderTeste5==='function') renderTeste5(); },
  'sec-jogos5':      function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap5']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap5','dificil'); },
  'sec-flashcards5': function(){ if(typeof initFlashcards5==='function') initFlashcards5(); },
  'sec-exame5':      function(){ var c=document.getElementById('exame5-config');var r=document.getElementById('exame5-running');var rs=document.getElementById('exame5-result');if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none'; },
  'sec-quiz-game5':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(5); },
  'sec-questoes6':   function(){ var el=document.getElementById('q6-container');  if(el && !el.innerHTML && typeof renderQuestoes6==='function') renderQuestoes6(); if(typeof showMini6==='function'&&document.getElementById('m6-container')&&!document.getElementById('m6-container').innerHTML)showMini6(0,null); if(typeof renderTeste6==='function'&&document.getElementById('t6-container')&&!document.getElementById('t6-container').innerHTML)renderTeste6(); },
  'sec-minitestes6': function(){ var el=document.getElementById('m6-container');  if(el && !el.innerHTML && typeof showMini6==='function') showMini6(0,null); },
  'sec-teste6':      function(){ var el=document.getElementById('t6-container');  if(el && !el.innerHTML && typeof renderTeste6==='function') renderTeste6(); },
  'sec-jogos6':      function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap6']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap6','dificil'); },
  'sec-flashcards6': function(){ if(typeof initFlashcards6==='function') initFlashcards6(); },
  'sec-exame6':      function(){ var c=document.getElementById('exame6-config');var r=document.getElementById('exame6-running');var rs=document.getElementById('exame6-result');if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none'; },
  'sec-quiz-game6':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(6); },
  'sec-questoes7':   function(){ var el=document.getElementById('q7-container');  if(el && !el.innerHTML && typeof renderQuestoes7==='function') renderQuestoes7(); if(typeof showMini7==='function'&&document.getElementById('m7-container')&&!document.getElementById('m7-container').innerHTML)showMini7(0,null); if(typeof renderTeste7==='function'&&document.getElementById('t7-container')&&!document.getElementById('t7-container').innerHTML)renderTeste7(); },
  'sec-minitestes7': function(){ var el=document.getElementById('m7-container');  if(el && !el.innerHTML && typeof showMini7==='function') showMini7(0,null); },
  'sec-teste7':      function(){ var el=document.getElementById('t7-container');  if(el && !el.innerHTML && typeof renderTeste7==='function') renderTeste7(); },
  'sec-jogos7':      function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap7']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap7','dificil'); },
  'sec-flashcards7': function(){ if(typeof initFlashcards7==='function') initFlashcards7(); },
  'sec-exame7':      function(){ var c=document.getElementById('exame7-config');var r=document.getElementById('exame7-running');var rs=document.getElementById('exame7-result');if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none'; },
  'sec-quiz-game7':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(7); },
  'sec-questoes8':   function(){ var el=document.getElementById('q8-container');  if(el && !el.innerHTML && typeof renderQuestoes8==='function') renderQuestoes8(); if(typeof showMini8==='function'&&document.getElementById('m8-container')&&!document.getElementById('m8-container').innerHTML)showMini8(0,null); if(typeof renderTeste8==='function'&&document.getElementById('t8-container')&&!document.getElementById('t8-container').innerHTML)renderTeste8(); },
  'sec-minitestes8': function(){ var el=document.getElementById('m8-container');  if(el && !el.innerHTML && typeof showMini8==='function') showMini8(0,null); },
  'sec-teste8':      function(){ var el=document.getElementById('t8-container');  if(el && !el.innerHTML && typeof renderTeste8==='function') renderTeste8(); },
  'sec-jogos8':      function(){ if(typeof _gInited!=='undefined') delete _gInited['j24-wrap-cap8']; if(typeof _j24AutoInit==='function') _j24AutoInit('j24-wrap-cap8','dificil'); },
  'sec-flashcards8': function(){ if(typeof initFlashcards8==='function') initFlashcards8(); },
  'sec-exame8':      function(){ var c=document.getElementById('exame8-config');var r=document.getElementById('exame8-running');var rs=document.getElementById('exame8-result');if(c)c.style.display='block';if(r)r.style.display='none';if(rs)rs.style.display='none'; },
  'sec-quiz-game8':  function(){ if(typeof qgStartForCap==='function') qgStartForCap(8); }
};

// ── Load content inline into a hub panel ──
// Uses DOM move (not clone) so all event handlers stay alive
var _mat7MovedSections = {}; // track where we moved sections: { tab: [ {el, parent}, ... ] }

// MULTI-CAP UNIFIED RENDERING
// When multiple chapters are selected, merge content into one
// unified component instead of stacking separate sections.

var _mat7CapNames = {1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções', 7:'Figuras Semelhantes', 8:'Dados e Probabilidades'};

// ── UNIFIED FLASHCARDS ──────────────────────────────────────
var _uniFC = { cards: [], idx: 0, flipped: false };

function mat7RenderUnifiedFlashcards(caps, inlineEl) {
  // Build merged card deck from all selected caps, tagged with cap name
  var capCardSources = {
    1: typeof FC_CARDS_CAP1 !== 'undefined' ? FC_CARDS_CAP1 : (typeof FC1_CARDS !== 'undefined' ? FC1_CARDS : []),
    2: typeof FC2_CARDS !== 'undefined' ? FC2_CARDS : [],
    3: typeof FC3_CARDS !== 'undefined' ? FC3_CARDS : [],
    4: typeof BANCO4 !== 'undefined' && BANCO4.flashcards ? BANCO4.flashcards : [],
    5: typeof BANCO5 !== 'undefined' && BANCO5.flashcards ? BANCO5.flashcards : [],
    6: typeof BANCO6 !== 'undefined' && BANCO6.flashcards ? BANCO6.flashcards : [],
    7: typeof BANCO7 !== 'undefined' && BANCO7.flashcards ? BANCO7.flashcards : [],
    8: typeof BANCO8 !== 'undefined' && BANCO8.flashcards ? BANCO8.flashcards : []
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
  var maxCap = Math.max.apply(null, caps);
  var level = maxCap >= 5 ? 'dificil' : maxCap >= 3 ? 'dificil' : maxCap >= 2 ? 'medio' : 'facil';
  var capStr = caps.map(function(c){ return _mat7CapNames[c] || ('Cap.'+c); }).join(' + ');

  // Tell the question provider which caps to mix
  if (typeof _gActiveCaps !== 'undefined') _gActiveCaps = caps;

  inlineEl.innerHTML = [
    '<div class="sec-header"><h2><i class="ph ph-game-controller"></i> Jogos — ' + capStr + '</h2>',
    '<p>Todos os jogos com perguntas dos capítulos selecionados: ' + capStr + '</p></div>',
    '<div id="j24-wrap-unified"></div>'
  ].join('\n');

  if (typeof _j24AutoInit === 'function') {
    if (typeof _gInited !== 'undefined') delete _gInited['j24-wrap-unified'];
    _j24AutoInit('j24-wrap-unified', level);
  }
}

// ── UNIFIED EXERCÍCIOS ──────────────────────────────────────
function mat7RenderUnifiedExercicios(caps, inlineEl) {
  var capNames = _mat7CapNames || {1:'Inteiros',2:'Racionais',3:'Geometria',4:'Equações',5:'Sequências'};
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

      // BANCO-based chapters (5 and 6): pick from pre-made question bank
      if (cap === 5 && typeof BANCO5 !== 'undefined' && BANCO5.questoes) {
        var pool5 = BANCO5.questoes.slice();
        for (var _b5i = pool5.length-1; _b5i > 0; _b5i--) { var _b5j=Math.floor(Math.random()*(_b5i+1)); var _b5t=pool5[_b5i]; pool5[_b5i]=pool5[_b5j]; pool5[_b5j]=_b5t; }
        pool5.slice(0, numPerCap).forEach(function(q) {
          capExs.push({enun:q.enunciado||q.en||'',opcoes:q.opts||[],resposta:q.correct||q.c||'',tipo:'mc',expl:q.fb||'',_capId:5,_capLabel:capNames[5]||'Sequências'});
        });
      } else if (cap === 6 && typeof BANCO6 !== 'undefined' && BANCO6.questoes) {
        var pool6 = BANCO6.questoes.slice();
        for (var _b6i = pool6.length-1; _b6i > 0; _b6i--) { var _b6j=Math.floor(Math.random()*(_b6i+1)); var _b6t=pool6[_b6i]; pool6[_b6i]=pool6[_b6j]; pool6[_b6j]=_b6t; }
        pool6.slice(0, numPerCap).forEach(function(q) {
          capExs.push({enun:q.enunciado||q.en||'',opcoes:q.opts||[],resposta:q.correct||q.c||'',tipo:'mc',expl:q.fb||'',_capId:6,_capLabel:capNames[6]||'Funções'});
        });
      } else if (cap === 7 && typeof BANCO7 !== 'undefined' && BANCO7.questoes) {
        var pool7 = BANCO7.questoes.slice();
        for (var _b7i = pool7.length-1; _b7i > 0; _b7i--) { var _b7j=Math.floor(Math.random()*(_b7i+1)); var _b7t=pool7[_b7i]; pool7[_b7i]=pool7[_b7j]; pool7[_b7j]=_b7t; }
        pool7.slice(0, numPerCap).forEach(function(q) {
          capExs.push({enun:q.enunciado||q.en||'',opcoes:q.opts||[],resposta:q.correct||q.c||'',tipo:'mc',expl:q.fb||'',_capId:7,_capLabel:capNames[7]||'Figuras Semelhantes'});
        });
      } else if (cap === 8 && typeof BANCO8 !== 'undefined' && BANCO8.questoes) {
        var pool8 = BANCO8.questoes.slice();
        for (var _b8i = pool8.length-1; _b8i > 0; _b8i--) { var _b8j=Math.floor(Math.random()*(_b8i+1)); var _b8t=pool8[_b8i]; pool8[_b8i]=pool8[_b8j]; pool8[_b8j]=_b8t; }
        pool8.slice(0, numPerCap).forEach(function(q) {
          capExs.push({enun:q.enunciado||q.en||'',opcoes:q.opts||[],resposta:q.correct||q.c||'',tipo:'mc',expl:q.fb||'',_capId:8,_capLabel:capNames[8]||'Dados e Probabilidades'});
        });
      } else {
        // Procedural generation for caps 1–4
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
      var capNames = {1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções', 7:'Figuras Semelhantes', 8:'Dados e Probabilidades'};
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
  }
  else if (_mat7SecMap[tab]) mat7LoadInline(tab);
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
  var secMap = { 1:'sec-teste', 2:'sec-teste2', 3:'sec-teste3', 4:'sec-teste4', 5:'sec-teste5', 6:'sec-teste6' };
  var initMap = {
    'sec-teste':  function(){ var el=document.getElementById('t-container');  if(el && !el.innerHTML && typeof gerarTeste==='function') gerarTeste(); },
    'sec-teste2': function(){ var el=document.getElementById('t2-container'); if(el && !el.innerHTML && typeof gerarTeste2==='function') gerarTeste2(); },
    'sec-teste3': function(){ var el=document.getElementById('t3-container'); if(el && !el.innerHTML && typeof gerarTeste3==='function') gerarTeste3(); },
    'sec-teste4': function(){ var el=document.getElementById('t4-container'); if(el && !el.innerHTML && typeof renderTeste4==='function') renderTeste4(); },
    'sec-teste5': function(){ var el=document.getElementById('t5-container'); if(el && !el.innerHTML && typeof renderTeste5==='function') renderTeste5(); },
    'sec-teste6': function(){ var el=document.getElementById('t6-container'); if(el && !el.innerHTML && typeof renderTeste6==='function') renderTeste6(); }
  };

  // Return previously moved sections
  mat7ReturnSections('testes');
  var inlineEl = document.getElementById('mat7-inline-testes');
  if (!inlineEl) return;
  inlineEl.innerHTML = '';

  var loaded = false;
  var capNames = {1:'Números Inteiros', 2:'Números Racionais', 3:'Geometria', 4:'Equações', 5:'Sequências', 6:'Funções'};

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

// ── Render compact study cards in the resumo panel ──
function mat7RenderResumoInline() {
  var cap = _mat7Sel['resumo'] || 1;
  var dest = document.getElementById('mat7-resumo-content');
  if (!dest) return;

  // Flashcard sources per cap (same map as mat7RenderUnifiedFlashcards)
  var capCardSources = {
    1: typeof FC_CARDS_CAP1 !== 'undefined' ? FC_CARDS_CAP1 : (typeof FC1_CARDS !== 'undefined' ? FC1_CARDS : []),
    2: typeof FC2_CARDS !== 'undefined' ? FC2_CARDS : [],
    3: typeof FC3_CARDS !== 'undefined' ? FC3_CARDS : [],
    4: typeof BANCO4 !== 'undefined' && BANCO4.flashcards ? BANCO4.flashcards : [],
    5: typeof BANCO5 !== 'undefined' && BANCO5.flashcards ? BANCO5.flashcards : [],
    6: typeof BANCO6 !== 'undefined' && BANCO6.flashcards ? BANCO6.flashcards : [],
    7: typeof BANCO7 !== 'undefined' && BANCO7.flashcards ? BANCO7.flashcards : [],
    8: typeof BANCO8 !== 'undefined' && BANCO8.flashcards ? BANCO8.flashcards : []
  };

  // Cap colors for accent strip
  var capColors = { 1:'var(--c1-main,#4f8ef7)', 2:'var(--c2-main,#e06c75)', 3:'var(--c3-main,#98c379)',
                    4:'var(--c4-main,#e5c07b)', 5:'var(--c5-main,#c678dd)', 6:'var(--c6-main,#56b6c2)',
                    7:'var(--c7-main,#d19a66)', 8:'var(--c8-main,#61afef)' };
  var color = capColors[cap] || 'var(--sage)';

  // Tag → icon mapping
  var tagIcons = {
    'Definição':'ph-book-bookmark', 'Fórmula':'ph-function', 'Regra':'ph-check-square',
    'Propriedade':'ph-star', 'Exemplo':'ph-pencil-line', 'Estratégia':'ph-lightbulb',
    'Síntese':'ph-seal-check', 'Notação':'ph-at', 'Hierarquia':'ph-tree-structure',
    'Desafio':'ph-lightning', 'Conceito':'ph-cube', 'Teorema':'ph-intersect'
  };

  var cards = capCardSources[cap] || [];

  if (!cards.length) {
    dest.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Conteúdo em preparação para este capítulo.</p>';
    return;
  }

  // Group cards by tag
  var groups = {};
  var groupOrder = [];
  cards.forEach(function(card) {
    var t = card.tag || 'Geral';
    if (!groups[t]) { groups[t] = []; groupOrder.push(t); }
    groups[t].push(card);
  });

  var html = '<div style="padding:.5rem 0 1.5rem">';

  groupOrder.forEach(function(tag) {
    var icon = tagIcons[tag] || 'ph-note';
    html += '<div style="margin-bottom:1.5rem">'
      + '<div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.6rem;font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:' + color + '">'
      + '<i class="ph ' + icon + '"></i>' + tag + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.6rem">';

    groups[tag].forEach(function(card) {
      var answer = (card.a || '').replace(/\n/g, '<br>');
      html += '<div class="resumo-card" style="background:var(--surface,#fff);border:1px solid var(--border,#e5e7eb);border-radius:.75rem;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)">'
        + '<div style="background:' + color + ';opacity:.12;height:3px"></div>'
        + '<div style="padding:.75rem .9rem 0;border-top:3px solid ' + color + ';margin-top:-3px">'
        + '<div style="font-size:.82rem;font-weight:600;color:var(--ink1,#1a1a2e);margin-bottom:.35rem;line-height:1.35">' + (card.q || '') + '</div>'
        + '<div style="font-size:.78rem;color:var(--ink3,#555);line-height:1.5;padding-bottom:.7rem;border-top:1px dashed var(--border,#e5e7eb);padding-top:.4rem;margin-top:.35rem">' + answer + '</div>'
        + '</div></div>';
    });

    html += '</div></div>';
  });

  html += '</div>';
  dest.innerHTML = html;
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
      tray.classList.remove('hidden');
    } else {
      var isHidden = tray.style.display === 'none' || tray.classList.contains('hidden');
      tray.classList.remove('hidden');
      tray.style.display = isHidden ? 'flex' : 'none';
      tray.style.flexWrap = isHidden ? 'wrap' : '';
      tray.style.gap = isHidden ? '.3rem' : '';
      tray.style.alignItems = isHidden ? 'center' : '';
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

// ══════════════════════════════════════════════════════════════
// ⚡ MODO QUIZ — Hub quiz game (3 vidas, streak, game over)
// ══════════════════════════════════════════════════════════════

var _qgHub = {
  cap: 1,
  lives: 3,
  streak: 0,
  maxStreak: 0,
  score: 0,
  total: 0,
  current: null,
  answered: false
};

function qgHubInit() {
  var row = document.getElementById('mat7-caps-quiz');
  var active = row ? row.querySelector('.gf-cap-btn.active') : null;
  _qgHub.cap = active ? (parseInt(active.dataset.cap) || 1) : 1;
  _qgHub.lives = 3;
  _qgHub.streak = 0;
  _qgHub.maxStreak = 0;
  _qgHub.score = 0;
  _qgHub.total = 0;
  _qgHub.answered = false;
  _qgHubNext();
}

function qgHubSelectCap(cap, btn) {
  var row = document.getElementById('mat7-caps-quiz');
  if (row) row.querySelectorAll('.gf-cap-btn').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  _qgHub.cap = cap;
  _qgHub.lives = 3;
  _qgHub.streak = 0;
  _qgHub.maxStreak = 0;
  _qgHub.score = 0;
  _qgHub.total = 0;
  _qgHub.answered = false;
  _qgHubNext();
}

function _qgHubBuildQuestion(cap) {
  // Caps 5–8: pull from BANCO relampago pool
  var bancoMap = { 5: (typeof BANCO5 !== 'undefined' ? BANCO5 : null),
                   6: (typeof BANCO6 !== 'undefined' ? BANCO6 : null),
                   7: (typeof BANCO7 !== 'undefined' ? BANCO7 : null),
                   8: (typeof BANCO8 !== 'undefined' ? BANCO8 : null) };
  if (cap >= 5 && bancoMap[cap]) {
    var banco = bancoMap[cap];
    var pool = (banco.relampago && banco.relampago.length) ? banco.relampago : banco.questoes;
    if (!pool || !pool.length) return null;
    var item = pool[Math.floor(Math.random() * pool.length)];
    var correctIdx = (typeof item.c !== 'undefined') ? item.c : 0;
    return {
      enun: item.q || item.enunciado || '',
      opcoes: item.opts || [],
      resposta: item.opts ? item.opts[correctIdx] : '',
      tipo: 'mc',
      expl: item.fb || ''
    };
  }

  var temas = ['1','2','3','4','5'];
  var tema = temas[Math.floor(Math.random() * temas.length)];
  var ex = null;
  if (cap === 4) {
    if (typeof buildEx4 === 'function') ex = buildEx4(tema, 'medio');
  } else if (cap === 3) {
    if (typeof buildEx3 === 'function') ex = buildEx3(tema, 'mc', 'medio');
  } else if (cap === 2) {
    if (typeof buildEx2 === 'function') ex = buildEx2(tema, 'mc', 'medio');
  } else {
    if (typeof buildExercicio === 'function') ex = buildExercicio(tema, 'mc', -12, 12, 1, 'medio');
  }
  // fallback: try mc, then fill
  if (!ex || ex.tipo !== 'mc') {
    for (var i = 0; i < 8; i++) {
      tema = temas[Math.floor(Math.random() * temas.length)];
      if (cap === 2 && typeof buildEx2 === 'function') ex = buildEx2(tema, 'mc', 'medio');
      else if (cap === 3 && typeof buildEx3 === 'function') ex = buildEx3(tema, 'mc', 'medio');
      else if (cap === 4 && typeof buildEx4 === 'function') ex = buildEx4(tema, 'medio');
      else if (typeof buildExercicio === 'function') ex = buildExercicio(tema, 'mc', -12, 12, 1, 'medio');
      if (ex && ex.tipo === 'mc' && ex.opcoes && ex.opcoes.length >= 2) break;
    }
  }
  return (ex && ex.tipo === 'mc' && ex.opcoes && ex.opcoes.length >= 2) ? ex : null;
}

function _qgHubNext() {
  var app = document.getElementById('qg-hub-app');
  if (!app) return;

  if (_qgHub.lives <= 0) {
    _qgHubGameOver(app);
    return;
  }

  var ex = _qgHubBuildQuestion(_qgHub.cap);
  if (!ex) {
    app.innerHTML = '<p style="color:var(--ink4);padding:2rem;text-align:center">Sem questões disponíveis para este capítulo.</p>';
    return;
  }
  _qgHub.current = ex;
  _qgHub.answered = false;

  var livesHtml = '';
  for (var i = 0; i < 3; i++) livesHtml += (i < _qgHub.lives ? '❤️' : '🖤') + ' ';

  var optsHtml = '';
  ex.opcoes.forEach(function(opt, idx) {
    optsHtml += '<button class="qg-opt-btn" id="qgopt-' + idx + '" onclick="qgHubAnswer(' + idx + ')">' + opt + '</button>';
  });

  app.innerHTML =
    '<div class="qg-hub-bar">' +
      '<div class="qg-hub-lives">' + livesHtml + '</div>' +
      '<div class="qg-hub-streak">' + (_qgHub.streak > 1 ? '🔥 ' + _qgHub.streak + ' seguidas' : '') + '</div>' +
      '<div class="qg-hub-score">✓ ' + _qgHub.score + ' / ' + _qgHub.total + '</div>' +
    '</div>' +
    '<div class="qg-hub-question">' + ex.enun + '</div>' +
    '<div class="qg-hub-opts">' + optsHtml + '</div>' +
    '<div class="qg-hub-feedback" id="qg-hub-fb" style="min-height:2.5rem"></div>';
}

function qgHubAnswer(idx) {
  if (_qgHub.answered) return;
  _qgHub.answered = true;
  var ex = _qgHub.current;
  if (!ex) return;

  var correct = ex.opcoes[idx] === ex.resposta;
  _qgHub.total++;

  var allBtns = document.querySelectorAll('.qg-opt-btn');
  allBtns.forEach(function(b, i) {
    b.disabled = true;
    if (ex.opcoes[i] === ex.resposta) { b.style.background = '#4caf50'; b.style.color = '#fff'; }
  });
  var clicked = document.getElementById('qgopt-' + idx);
  if (clicked && !correct) { clicked.style.background = '#f44336'; clicked.style.color = '#fff'; }

  var fb = document.getElementById('qg-hub-fb');
  if (correct) {
    _qgHub.score++;
    _qgHub.streak++;
    if (_qgHub.streak > _qgHub.maxStreak) _qgHub.maxStreak = _qgHub.streak;
    if (fb) fb.innerHTML = '<span style="color:#4caf50;font-weight:700">✓ Correto!' + (_qgHub.streak >= 3 ? ' 🔥 Streak de ' + _qgHub.streak + '!' : '') + '</span>' + (ex.expl ? ' <span style="color:var(--ink3);font-size:.85rem">' + ex.expl + '</span>' : '');
  } else {
    _qgHub.lives--;
    _qgHub.streak = 0;
    if (fb) fb.innerHTML = '<span style="color:#f44336;font-weight:700">✗ Errado.</span> A resposta era <strong>' + ex.resposta + '</strong>.' + (ex.expl ? ' <span style="color:var(--ink3);font-size:.85rem">' + ex.expl + '</span>' : '');
  }

  var app = document.getElementById('qg-hub-app');
  if (_qgHub.lives <= 0) {
    setTimeout(function(){ if(app) _qgHubGameOver(app); }, 1400);
  } else {
    var btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.cssText = 'margin-top:1rem';
    btn.textContent = 'Próxima →';
    btn.onclick = _qgHubNext;
    if (fb) fb.appendChild(btn);
  }
}

function _qgHubGameOver(app) {
  var pct = _qgHub.total > 0 ? Math.round(_qgHub.score / _qgHub.total * 100) : 0;
  var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📚';
  app.innerHTML =
    '<div style="text-align:center;padding:2.5rem 1rem">' +
      '<div style="font-size:3.5rem;margin-bottom:.75rem">' + emoji + '</div>' +
      '<div style="font-family:\'Cormorant Garamond\',serif;font-size:2rem;font-weight:900;color:var(--ink)">' + pct + '%</div>' +
      '<div style="color:var(--ink3);margin:.5rem 0 1.5rem">' + _qgHub.score + ' certas em ' + _qgHub.total + ' questões</div>' +
      '<div style="font-size:1.5rem;margin-bottom:1.5rem">Melhor sequência: ' + (_qgHub.maxStreak || 0) + ' 🔥</div>' +
      '<button class="btn btn-primary" onclick="qgHubInit()">↺ Jogar novamente</button>' +
    '</div>';
}

