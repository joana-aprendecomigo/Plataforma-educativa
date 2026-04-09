/* ── Portal page logic (index.html only) ──────────────────────────
   Renders the portal card grid and handles portal-specific interactions.
   Navigation functions live in nav.js (loaded last on every page).
─────────────────────────────────────────────────────────────────── */

// ═══ PORTAL DATA ═══
var CYCLES=[
  {id:'cycle-3',cls:'cycle-3',label:'3.º Ciclo do Ensino Básico',emoji:'flask',range:'7.º Ano',anos:[
    {ano:7,label:'7.º Ano',subjects:[
      {i:'<i class="ph ph-grid-four"></i>',n:'Matemática',status:'available',action:'math7'}
    ]},
  ]}
];

function tagHTML(s){
  if(s==='available')return'<span class="s-tag tag-avail"><i class="ph ph-check"></i> Disponível</span>';
  if(s==='progress')return'<span class="s-tag tag-prog"><i class="ph ph-gear"></i> Em progresso</span>';
  return'<span class="s-tag tag-soon">Em breve</span>';
}

// ═══ CARD TOGGLING ═══
function toggleCard(card){
  card.classList.toggle('open');
}
function toggleChP(e,el){
  if(e) e.preventDefault();
  var chapters=el.nextElementSibling;
  if(chapters && chapters.classList.contains('s-chapters')){
    chapters.classList.toggle('open');
  }
}

// ═══ SEARCH (stubs — only used on index.html, full impl in systems.js) ═══
function doSearch(val){
  var cards=document.querySelectorAll('.y-card');
  var noRes=document.getElementById('no-results');
  if(!val||!val.trim()){
    cards.forEach(function(c){c.style.display='';});
    if(noRes)noRes.style.display='none';
    return;
  }
  var q=val.toLowerCase();
  var found=0;
  cards.forEach(function(c){
    var match=c.dataset.subjects&&c.dataset.subjects.indexOf(q)>=0;
    c.style.display=match?'':'none';
    if(match)found++;
  });
  if(noRes)noRes.style.display=found?'none':'block';
}
function searchKeyNav(){}
function filterBy(f,btn){
  document.querySelectorAll('.f-btn').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
}

// ═══ PROGRESS DASHBOARD (stub for index.html where systems.js isn't loaded) ═══
if(typeof pmToggleDashboard==='undefined'){
  window.pmToggleDashboard=function(){ window.location.href='mat7/index.html'; };
}

// ═══ PORTAL RENDER ═══
var totalDisc=0,totalAvail=0,totalChapters=0;
function portalRender(){
  var main=document.getElementById('portal-main');
  if(!main)return;
  CYCLES.forEach(function(cycle){
    var block=document.createElement('div');
    block.className='cycle-block '+cycle.cls;
    block.dataset.cycleid=cycle.id;
    block.innerHTML='<div class="cycle-title-row"><div class="cycle-pill"><div class="pill-emoji"><i class="ph ph-'+cycle.emoji+'"></i></div>'+cycle.label+'</div><div class="cycle-range">'+cycle.range+'</div></div><div class="years-row" id="row-'+cycle.id+'"></div>';
    var row=block.querySelector('#row-'+cycle.id);
    cycle.anos.forEach(function(year){
      var avail=year.subjects.filter(function(s){return s.status==='available'}).length;
      var prog=year.subjects.filter(function(s){return s.status==='progress'}).length;
      var total=year.subjects.length;
      var pct=Math.round(((avail+prog*.5)/total)*100);
      totalDisc+=total;totalAvail+=avail;
      year.subjects.forEach(function(s){if(s.chapters)totalChapters+=s.chapters.filter(function(ch){return ch.action;}).length;});
      var card=document.createElement('div');
      card.className='y-card '+cycle.cls;
      card.dataset.ano=year.ano;card.dataset.cycleid=cycle.id;
      card.dataset.subjects=year.subjects.map(function(s){return s.n.toLowerCase()}).join(' ');
      card.dataset.hasavail=avail>0?'1':'0';
      var subsHTML=year.subjects.map(function(s){
        var st=s.status||'soon';var tag=tagHTML(st);
        var note=s.nt?'<span class="s-note">('+s.nt+')</span>':'';
        var isAvail=st==='available';
        var onclk=s.action?'onclick="handleSubj(event,\''+s.action+'\')"':'';
        var cls='s-item'+(isAvail?' available':'');
        var chapHTML='';
        if(s.chapters&&s.chapters.length){
          chapHTML='<div class="s-chapters">'+s.chapters.map(function(ch){
            return ch.action
              ?'<a class="s-chapter-link" href="#" onclick="handleSubj(event,\''+ch.action+'\')"><span class="ch-icon"><i class="ph ph-file-text"></i></span>'+ch.label+'</a>'
              :'<span class="s-chapter-link" style="opacity:.45;cursor:default;pointer-events:none;"><span class="ch-icon"><i class="ph ph-lock"></i></span>'+ch.label+'</span>';
          }).join('')+'</div>';
        }
        var toggleAttr=chapHTML?'onclick="toggleChP(event,this)"':'';
        return '<a class="'+cls+'" href="#" '+toggleAttr+' '+(!chapHTML&&s.action?onclk:'')+'><span class="s-emoji">'+s.i+'</span><span class="s-name">'+s.n+note+'</span>'+tag+'</a>'+chapHTML;
      }).join('');
      card.innerHTML='<div class="y-card-bar"></div><div class="y-card-head" onclick="toggleCard(this.parentElement)"><div class="y-num">'+year.ano+'</div><div class="y-meta"><div class="y-title">'+year.label+'</div><div class="y-sub">'+total+' disciplinas · '+(avail>0?avail+' disponível(is)':'em preparação')+'</div></div><div class="y-toggle"><i class="ph ph-caret-down"></i></div></div><div class="y-prog-bar"><div class="y-prog-fill" style="width:'+pct+'%"></div></div><div class="y-subjects">'+subsHTML+'</div>';
      row.appendChild(card);
    });
    main.appendChild(block);
  });
  document.querySelectorAll('.status-pill').forEach(function(el){el.textContent=totalAvail+' disciplina'+(totalAvail!==1?'s':'')+' · '+totalChapters+' capítulo'+(totalChapters!==1?'s':'');});
  var c7=document.querySelector('.y-card[data-ano="7"]');
  if(c7)c7.classList.add('open');
}

// ── Portal progress widget ────────────────────────────────────────────────────
function portalRenderProgress() {
  var widget = document.getElementById('portal-progress-widget');
  if (!widget) return;

  var keys = {
    1:'edupt_cap1', 2:'edupt_cap2', 3:'edupt_cap3', 4:'edupt_cap4',
    5:'edupt_cap5', 6:'edupt_cap6', 7:'edupt_cap7', 8:'edupt_cap8'
  };
  var names = {
    1:'Inteiros', 2:'Racionais', 3:'Geometria', 4:'Equações',
    5:'Sequências', 6:'Funções', 7:'Semelhança', 8:'Dados'
  };
  var colors = {
    1:'#4f8ef7', 2:'#e06c75', 3:'#98c379', 4:'#e5c07b',
    5:'#c678dd', 6:'#56b6c2', 7:'#d19a66', 8:'#61afef'
  };

  var caps = [];
  for (var cap = 1; cap <= 8; cap++) {
    try {
      var raw = localStorage.getItem(keys[cap]);
      if (!raw) continue;
      var d = JSON.parse(raw);
      var correct = 0, total = 0;
      if (d.sections) {
        Object.keys(d.sections).forEach(function(k) {
          correct += (d.sections[k].correct || 0);
          total   += (d.sections[k].total   || 0);
        });
      }
      if (d.log && d.log.length) total = total || 1; // has activity even without sections
      if (total > 0 || (d.log && d.log.length)) {
        caps.push({ cap: cap, correct: correct, total: total,
                    pct: total > 0 ? Math.round(correct / total * 100) : 0 });
      }
    } catch(e) {}
  }

  if (!caps.length) { widget.style.display = 'none'; return; }

  var totalCorrect = 0, totalQ = 0;
  caps.forEach(function(c) { totalCorrect += c.correct; totalQ += c.total; });
  var globalPct = totalQ > 0 ? Math.round(totalCorrect / totalQ * 100) : 0;

  var barsHtml = caps.map(function(c) {
    var col = colors[c.cap];
    return '<div style="flex:1;min-width:60px;text-align:center">'
      + '<div style="font-size:.65rem;font-weight:700;color:var(--ink3);margin-bottom:.3rem">' + names[c.cap] + '</div>'
      + '<div style="height:6px;background:var(--border);border-radius:99px;overflow:hidden;margin-bottom:.25rem">'
      + '<div style="height:100%;width:' + c.pct + '%;background:' + col + ';border-radius:99px;transition:width .4s"></div></div>'
      + '<div style="font-size:.65rem;color:var(--ink4)">' + c.pct + '%</div>'
      + '</div>';
  }).join('');

  widget.style.display = 'block';
  widget.innerHTML =
    '<div style="background:var(--surface);border:1px solid var(--border);border-radius:.85rem;padding:.9rem 1.1rem;margin-bottom:.5rem">'
    + '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">'
    + '<i class="ph ph-chart-bar" style="font-size:1.2rem;color:var(--sage-dark)"></i>'
    + '<span style="font-size:.82rem;font-weight:700;color:var(--ink2)">O teu progresso em Mat. 7.º Ano</span>'
    + '<span style="margin-left:auto;font-size:.78rem;font-weight:700;color:var(--sage-dark)">' + globalPct + '% global</span>'
    + '</div>'
    + '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' + barsHtml + '</div>'
    + '</div>';
}

// ═══ AUTO-INIT ═══
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('portal-main')) portalRender();
  portalRenderProgress();
});

/* Visual effects loaded from fx.js */
