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

// ═══ AUTO-INIT ═══
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('portal-main')) portalRender();
});

/* Visual effects loaded from fx.js */
