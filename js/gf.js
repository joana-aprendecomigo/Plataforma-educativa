/* ── gf.js — Gerador de Fichas Personalizado: custom worksheet generator used by mat7/index.html ── */

// GERADOR DE FICHAS PERSONALIZADO
var _gfContent = {};

function gfAction(secId) {
  var status = document.getElementById('gf-status-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);

  // Generate content
  try {
    gfGenerar(secId);
  } catch(e) {
    if (status) { status.textContent = 'Erro: ' + e.message; status.style.color = '#c0392b'; }
    return;
  }

  var content = _gfContent[secId];
  if (!content) {
    if (status) { status.textContent = 'Seleciona pelo menos um capitulo e um tipo de conteudo.'; status.style.color = '#c0392b'; }
    return;
  }

  // Show preview
  var previewEl = document.getElementById('gf-content-' + secId);
  if (previewEl) previewEl.innerHTML = content;
  if (previewWrap) previewWrap.style.display = 'block';

  // Build full self-contained HTML document with print button + auto-print
  var sec = document.getElementById(secId);
  var capNums = [];
  if (sec) sec.querySelectorAll('.gf-cap-btn.active').forEach(function(b) { capNums.push(parseInt(b.dataset.cap)); });
  capNums.sort(function(a, b) { return a - b; });
  var capNames = {1:'Números Inteiros',2:'Números Racionais',3:'Geometria',4:'Equações',5:'Sequências',6:'Funções',7:'Figuras Semelhantes',8:'Dados e Probabilidades'};
  var capLabels = capNums.map(function(c) { return capNames[c]||''; });
  var titleShort = capLabels.join(' + ') || 'Ficha';
  var now = new Date().toLocaleDateString('pt-PT');

  var fullHtml = '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8">'
    + '<title>3ponto14 \u00b7 ' + titleShort + '</title>'
    + '<style>'
    + 'body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:2rem;padding-top:80px;color:#2a2724;font-size:.92rem;line-height:1.7}'
    + 'h1{font-size:1.4rem;border-bottom:2px solid #516860;padding-bottom:.5rem;margin-bottom:1.5rem}'
    + 'h2{font-size:1.1rem;margin-top:2rem;color:#516860}'
    + 'h3{font-size:1rem;color:#3d5c54;border-left:3px solid #77998e;padding-left:8px;margin:1.25rem 0 .5rem}'
    + '.doc-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #516860;padding-bottom:1rem;margin-bottom:1.5rem}'
    + '.doc-brand{font-size:.75rem;font-weight:700;color:#77998E;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}'
    + '.doc-title{font-family:Georgia,serif;font-size:1.2rem;font-weight:700;color:#2a2724}'
    + '.doc-title em{display:block;font-size:.9rem;font-weight:400;color:#666}'
    + '.doc-logo{font-size:2.5rem;font-weight:900;color:#516860;font-family:serif}'
    + '.doc-meta{display:flex;gap:2rem;flex-wrap:wrap;margin-bottom:1.5rem;padding:1rem;background:#f9f5ef;border-radius:8px}'
    + '.doc-meta-item{display:flex;align-items:center;gap:.5rem}'
    + '.doc-meta-label{font-size:.75rem;font-weight:700;color:#666;text-transform:uppercase}'
    + '.doc-meta-line{width:120px;border-bottom:1px solid #999}'
    + '.doc-footer{margin-top:3rem;padding-top:.75rem;border-top:1px solid #ccc;display:flex;justify-content:space-between;font-size:.72rem;color:#999}'
    + '.ex{margin-bottom:1.5rem;padding:1rem;border:1px solid #e0dbd4;border-radius:6px}'
    + '.ex-num{font-weight:700;color:#516860;font-size:.85rem;margin-bottom:.5rem}'
    + '.linha{border-bottom:1px solid #bbb;margin-top:.6rem;min-height:22px}'
    + '#_bar{position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#516860,#77998E);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;font-family:Montserrat,Arial,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.18)}'
    + '#_bar span{color:#fff;font-weight:700;font-size:1rem}'
    + '#_bar button{background:#fff;color:#516860;border:none;border-radius:999px;padding:10px 28px;font-size:.95rem;font-weight:800;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15)}'
    + '@media print{#_bar{display:none!important}body{padding-top:0!important}h2,th,[style*="background"]{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}@page{size:A4;margin:12mm 15mm}}'
    + '</style></head><body>'
    + '<div id="_bar"><span>3ponto14 \u00b7 Ficha de Trabalho</span>'
    + '<button onclick="window.print()">\uD83D\uDCE5 Guardar como PDF</button></div>'
    + '<div class="doc-header"><div><div class="doc-brand">3ponto14 \u00b7 Matem\u00e1tica 7.\u00ba Ano</div>'
    + '<div class="doc-title">Ficha de Trabalho<em>' + titleShort + '</em></div></div>'
    + '<div class="doc-logo">3&#960;</div></div>'
    + '<div class="doc-meta">'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Classifica\u00e7\u00e3o</div><div class="doc-meta-line"></div></div>'
    + '</div>'
    + content
    + '<div class="doc-footer"><span>3ponto14 \u00b7 Matem\u00e1tica 7.\u00ba Ano</span><span>' + now + '</span></div>'
    + '<script>window.onload=function(){setTimeout(function(){window.print()},800)};<\/script>'
    + '</body></html>';

  // Open in new tab — MUST be synchronous with click (no setTimeout) for browser to allow it
  var blob = new Blob([fullHtml], {type: 'text/html;charset=utf-8'});
  var blobUrl = URL.createObjectURL(blob);
  var win = window.open(blobUrl, '_blank');

  if (win) {
    if (status) { status.textContent = '\u2713 Ficha aberta num novo separador \u2014 guarda como PDF no di\u00e1logo de impress\u00e3o'; status.style.color = 'var(--c1-mid)'; }
  } else {
    // Fallback: force download as HTML file
    var a = document.createElement('a');
    a.href = blobUrl;
    a.download = '3ponto14_mat7_' + (capNums.join('-') || 'ficha') + '_' + new Date().toISOString().slice(0, 10) + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (status) { status.textContent = '\u2713 Ficheiro HTML descarregado \u2014 abre-o no browser e usa Cmd+P'; status.style.color = 'var(--c1-mid)'; }
  }

  setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 120000);
  _gfContent[secId] = null;
}

function gfToggleCap(btn, secId) {
  btn.classList.toggle('active');
  var caps = document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn.active');
  if (caps.length === 0) btn.classList.add('active');
}

// Handles cap button click: toggles selection and subtema tray
// - Inactive → activate + open tray (close other trays)
// - Active   → deactivate + close tray
function gfCapClick(btn, secId, cap) {
  var tray = document.getElementById('gf-st-' + cap + '-' + secId);
  var sec = document.getElementById('gf-caps-' + secId);
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    if (tray) tray.classList.remove('open');
  } else {
    btn.classList.add('active');
    if (sec) sec.querySelectorAll('.gf-st-tray').forEach(function(t) { t.classList.remove('open'); });
    if (tray) tray.classList.add('open');
  }
}

function gfToggleType(btn) {
  btn.classList.toggle('active');
  var tick = btn.querySelector('.gf-tick');
  if (tick) tick.textContent = btn.classList.contains('active') ? '\u2713' : '';
  var parent = btn.closest('.gf-types');
  if (parent && parent.querySelectorAll('.gf-type-btn.active').length === 0) {
    btn.classList.add('active');
    if (tick) tick.textContent = '\u2713';
  }
  // Mostra/oculta a linha de dificuldade: irrelevante para resumo e soluções
  var gfRow = btn.closest('.gf-row');
  if (gfRow) {
    var difRow = gfRow.nextElementSibling;
    if (difRow && difRow.querySelector && difRow.querySelector('.gf-dif-row')) {
      var activeTypes = parent ? parent.querySelectorAll('.gf-type-btn.active') : [];
      var needsDif = false;
      for (var i = 0; i < activeTypes.length; i++) {
        var t = activeTypes[i].dataset.type;
        if (t === 'exercicios' || t === 'teste' || t === 'minitestes') { needsDif = true; break; }
      }
      difRow.style.display = needsDif ? '' : 'none';
    }
  }
}

var _CAP_NAMES_GF = {1:'N\u00fameros Inteiros', 2:'N\u00fameros Racionais', 3:'Geometria', 4:'Equa\u00e7\u00f5es', 5:'Sequ\u00eancias', 6:'Fun\u00e7\u00f5es', 7:'Figuras Semelhantes', 8:'Dados e Probabilidades'};

function _buildSolucoesCapHTML(cap) {
  var S = '<div style="font-family:Georgia,serif;font-size:.88rem;line-height:1.75;color:#1a1a2e">';
  var H = function(t){return '<h4 style="font-family:Montserrat,sans-serif;color:#fff;background:#3d5c54;padding:.6rem 1rem;border-radius:8px;margin:1.25rem 0 .6rem;font-size:.88rem;letter-spacing:.02em">'+t+'</h4>';};
  var G = function(t){return '<p style="font-family:Montserrat,sans-serif;font-size:.78rem;font-weight:700;color:#516860;text-transform:uppercase;letter-spacing:.08em;margin:1rem 0 .4rem;padding-bottom:3px;border-bottom:1px solid #c4d9d3">'+t+'</p>';};
  var sol = function(n,q,r,d){return '<div style="margin:.5rem 0;padding:.5rem .75rem;background:#fff;border:1px solid #ddd;border-radius:6px"><span style="font-weight:700;color:#516860">'+n+'</span> <em style="color:#555">'+q+'</em><br><span style="color:#2d3530">→ <strong>'+r+'</strong></span>'+(d?'<br><span style="font-size:.82rem;color:#777;font-style:italic">'+d+'</span>':'')+'</div>';};
  var box = function(html){return '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'+html+'</div>';};

  if(cap===1){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><i class="ph ph-key"></i> Soluções Completas — Números Inteiros</strong><br><span style="font-size:.8rem;opacity:.75">Todas as respostas com raciocínio detalhado</span></div>'
    + G('Ficha Completa · Grupo 1 — Representação de Situações Reais')
    + sol('1.','Temperatura 8° abaixo de zero','−8','Abaixo = negativo; o número inteiro é −8')
    + sol('','Empresa lucrou 500 €','+500','Lucro = ganho = positivo')
    + sol('','Submarino a 200 m de profundidade','−200','Profundidade/abaixo do nível do mar = negativo')
    + sol('','Piso 4 de garagem subterrânea','−4','Subterrâneo = abaixo do nível do solo = negativo')
    + sol('','Avião a 10 000 m de altitude','+10 000','Altitude/acima = positivo')
    + sol('','Conta bancária a descoberto em 75 €','−75','A descoberto = deve = negativo')
    + sol('2a.','O número 0 pertence a ℤ⁺','FALSO','Correção: 0 ∈ ℤ₀⁺ mas 0 ∉ ℤ⁺. ℤ⁺ = {1, 2, 3, …} apenas positivos; 0 é neutro.')
    + sol('2b.','O número −3 pertence a ℤ⁻','VERDADEIRO','ℤ⁻ = {…, −3, −2, −1}. Como −3 é negativo, pertence a ℤ⁻. ✓')
    + sol('2c.','Todo o número natural é inteiro','VERDADEIRO','ℕ = {0,1,2,3,…} ⊂ ℤ. Todo natural é também inteiro. ✓')
    + sol('2d.','O menor inteiro positivo é 0','FALSO','Correção: O menor inteiro positivo é 1. O zero não é positivo nem negativo.')
    + sol('2e.','−5, 0 e 7 pertencem ao conjunto ℤ','VERDADEIRO','Os três são inteiros: −5 ∈ ℤ⁻, 0 ∈ ℤ, 7 ∈ ℤ⁺. ✓')
    + sol('3.','Ordena por ordem crescente: −7, 2, −3, 0, 5, −1, 4, −6','−7 &lt; −6 &lt; −3 &lt; −1 &lt; 0 &lt; 2 &lt; 4 &lt; 5','Na reta numérica: mais à esquerda = menor. Os negativos ordenam-se invertendo o valor absoluto (−7 é o mais negativo, logo o menor).')
    + G('Grupo 2 — Valor Absoluto e Simétrico')
    + sol('4a.','|−9|','9','|a| = distância ao zero. −9 está a 9 unidades de 0, logo |−9| = 9.')
    + sol('4b.','|+6|','6','O número já é positivo; |6| = 6.')
    + sol('4c.','|0|','0','O zero está a 0 unidades de si mesmo: |0| = 0.')
    + sol('4d.','|−15|','15') + sol('4e.','|+23|','23') + sol('4f.','|−1|','1')
    + sol('5a.','sim(−4)','= +4','O simétrico inverte o sinal: −(−4) = +4')
    + sol('5b.','sim(7)','= −7','sim(7) = −7') + sol('5c.','sim(0)','= 0','O zero é o seu próprio simétrico: 0 + 0 = 0')
    + sol('5d.','sim(−11)','= +11') + sol('5e.','sim(+18)','= −18') + sol('5f.','sim(−25)','= +25')
    + sol('6a.','|−8| ___ |+5|','> (maior)','|−8|=8, |+5|=5. Como 8 &gt; 5, o símbolo é &gt;.')
    + sol('6b.','|−3| ___ |+3|','= (igual)','|−3|=3, |+3|=3. Simétricos têm o mesmo valor absoluto.')
    + sol('6c.','|−12| ___ |−7|','> (maior)','12 &gt; 7') + sol('6d.','|0| ___ |−1|','< (menor)','0 &lt; 1')
    + sol('7a.','|−6| + |−4|','6 + 4 = 10','Primeiro calcula cada módulo, depois soma.')
    + sol('7b.','|−8| − |+3|','8 − 3 = 5') + sol('7c.','|+7| × |−2|','7 × 2 = 14') + sol('7d.','|−9| + |0| − |−5|','9 + 0 − 5 = 4')
    + G('Grupo 3 — Adição de Inteiros')
    + sol('8a.','(−5) + (+3)','= −2','Sinais diferentes: subtrai módulos (5−3=2); fica o sinal do maior módulo (−).')
    + sol('8b.','(−7) + (−4)','= −11','Mesmo sinal (−): soma os módulos (7+4=11) e mantém o sinal (−).')
    + sol('8c.','(+9) + (−9)','= 0','Simétricos: a + (−a) = 0 sempre.')
    + sol('8d.','(+12) + (−8)','= +4','Sinais diferentes: 12−8=4; sinal do maior módulo (+).')
    + sol('8e.','(−15) + (+6)','= −9','Sinais diferentes: 15−6=9; sinal do maior módulo (−).')
    + sol('8f.','(−3) + (−7) + (+4)','= −6','Passo a passo: (−3)+(−7) = −10; depois −10+(+4) = −6.')
    + box('<strong>Tabela de adição (Ex. 9):</strong><table style="width:100%;font-size:.83rem;border-collapse:collapse;margin:.5rem 0"><tr><th style="background:#516860;color:#fff;padding:5px 8px">+</th><th style="background:#516860;color:#fff;padding:5px 8px">−3</th><th style="background:#516860;color:#fff;padding:5px 8px">+5</th><th style="background:#516860;color:#fff;padding:5px 8px">−8</th><th style="background:#516860;color:#fff;padding:5px 8px">+2</th></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>+4</strong></td><td style="padding:4px 8px;border:1px solid #ccc">+1</td><td style="padding:4px 8px;border:1px solid #ccc">+9</td><td style="padding:4px 8px;border:1px solid #ccc">−4</td><td style="padding:4px 8px;border:1px solid #ccc">+6</td></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>−6</strong></td><td style="padding:4px 8px;border:1px solid #ccc">−9</td><td style="padding:4px 8px;border:1px solid #ccc">−1</td><td style="padding:4px 8px;border:1px solid #ccc">−14</td><td style="padding:4px 8px;border:1px solid #ccc">−4</td></tr><tr><td style="padding:4px 8px;border:1px solid #ccc"><strong>−1</strong></td><td style="padding:4px 8px;border:1px solid #ccc">−4</td><td style="padding:4px 8px;border:1px solid #ccc">+4</td><td style="padding:4px 8px;border:1px solid #ccc">−9</td><td style="padding:4px 8px;border:1px solid #ccc">+1</td></tr></table>')
    + sol('10.','Temperatura: −3°C, sobe 9°C, desce 5°C','−3 + 9 − 5 = 6 − 5 = +1 °C','Passo 1: −3 + 9 = +6. Passo 2: +6 − 5 = +1. Temperatura final: +1 °C')
    + G('Grupo 4 — Subtração e Adição Algébrica')
    + sol('11a.','(+4) − (−6)','= +4 + 6 = +10','Subtrair um negativo = somar o seu simétrico: −(−6) = +6')
    + sol('11b.','(−3) − (+8)','= −3 − 8 = −11','Subtrair um positivo = somar o seu simétrico: −(+8) = −8')
    + sol('11c.','(−2) − (−5)','= −2 + 5 = +3') + sol('11d.','(+7) − (+12)','= 7 − 12 = −5') + sol('11e.','(−10) − (−3)','= −10 + 3 = −7') + sol('11f.','0 − (−8)','= 0 + 8 = +8')
    + sol('12a.','5 − 8 + 3 − 1','= (5+3) − (8+1) = 8 − 9 = −1','Agrupa positivos e negativos: positivos = 5+3=8; negativos = 8+1=9; resultado = 8−9=−1')
    + sol('12b.','−4 + 7 − 2 + 6 − 3','= (7+6) − (4+2+3) = 13 − 9 = +4','Positivos: 7+6=13; Negativos: 4+2+3=9; Resultado: 13−9=+4')
    + sol('12c.','12 − 15 + 8 − 6 + 1','= (12+8+1) − (15+6) = 21 − 21 = 0')
    + sol('13.','Mergulhador a −12 m, sobe 7 m, desce 4 m','−12 + 7 − 4 = −5 − 4 = −9 m','Fica a 9 m de profundidade. −12+7=−5; −5−4=−9.')
    + G('Grupo 5 — Expressões com Parênteses')
    + sol('14a.','−(+3 − 5)','= −(−2) = +2','Calcula dentro: 3−5=−2. Depois nega: −(−2)=+2. Sinal − inverte todos os sinais.')
    + sol('14b.','−(−7 + 2)','= −(−5) = +5','Dentro: −7+2=−5. Nega: −(−5)=+5.') + sol('14c.','+(−4 − 6)','= +(−10) = −10','Sinal + não altera os sinais: +(−10)=−10.') + sol('14d.','−(+8 − 3 + 1)','= −(+6) = −6','Dentro: 8−3+1=6. Nega: −6.')
    + sol('15a.','3 − (−5) + (−2)','= 3 + 5 − 2 = +6','−(−5)=+5; depois 3+5−2=6.')
    + sol('15b.','−(+4 − 2 + 3)','= −(+5) = −5','Dentro: 4−2+3=5. Nega: −5.')
    + sol('15c.','8 − (3 − 7) + (−2)','= 8 − (−4) − 2 = 8 + 4 − 2 = +10','Dentro: 3−7=−4; depois 8−(−4)=8+4=12; depois 12−2=10.')
    + sol('15d.','−4 + (6 − 9) − (−1)','= −4 + (−3) + 1 = −6','Dentro: 6−9=−3; depois −4−3+1=−6.')
    + sol('16a.','−[6 − (2 − 8)]','= −[6 − (−6)] = −[12] = −12','Passo 1 (parênteses): 2−8=−6. Passo 2 (colchetes): 6−(−6)=6+6=12. Passo 3: −12.')
    + sol('16b.','10 − [3 − (−4 + 7)]','= 10 − [3 − 3] = 10 − 0 = +10','Passo 1: −4+7=3. Passo 2: 3−3=0. Passo 3: 10−0=10.')
    + sol('17a.','5 − {3 − [−2 + (4 − 7)]}','= 5 − {3 − [−5]} = 5 − {8} = −3','(4−7)=−3; [−2+(−3)]=[−5]; {3−(−5)}={3+5}={8}; 5−8=−3.')
    + sol('17b.','−{2 − [5 − (−3 + 1) + 4]}','= −{2 − [11]} = −{−9} = +9','(−3+1)=−2; [5−(−2)+4]=[5+2+4]=[11]; {2−11}={−9}; −(−9)=+9.')
    + sol('18.','a=−3, b=5: &nbsp; a+b','= −3+5 = +2','') + sol('','a−b','= −3−5 = −8') + sol('','|a|+|b|','= 3+5 = 8') + sol('','−(a−b)+a','= −(−3−5)+(−3) = −(−8)−3 = 8−3 = +5')
    + G('Grupo 6 — Problemas')
    + sol('19.','Monte Branco 4808 m, Mar Cáspio −28 m. Diferença?','4808 − (−28) = 4808 + 28 = 4836 m','Para a diferença, subtrai: 4808−(−28)=4808+28=4836. R: A diferença é 4836 m.')
    + sol('20.','João na casa −5. Dado: +8, −3, +4. Casa final?','−5 + 8 − 3 + 4 = +4 (casa +4)','Passo a passo: −5+8=+3; +3−3=0; 0+4=+4. R: O João fica na casa +4.')
    + sol('21a.','Temp. Seg=14°C, variações: +2,−5,+3,−1,+4','Ter:16°C | Qua:11°C | Qui:14°C | Sex:13°C | Sáb:17°C','Seg:14; Ter:14+2=16; Qua:16−5=11; Qui:11+3=14; Sex:14−1=13; Sáb:13+4=17.')
    + sol('21b.','Variação total da semana','(+2)+(−5)+(+3)+(−1)+(+4) = +3 °C','Soma todas as variações: 2−5+3−1+4 = (2+3+4)−(5+1) = 9−6 = +3°C')
    + G('Teste · Grupo I — Escolha Múltipla')
    + box('1-<strong>B</strong> | 2-<strong>C</strong> | 3-<strong>B</strong> | 4-<strong>C</strong> | 5-<strong>B</strong> | 6-<strong>A</strong> | 7-<strong>B</strong> | 8-<strong>A</strong> | 9-<strong>D</strong> | 10-<strong>B</strong>')
    + G('Teste · Grupo II — Cálculo')
    + sol('11.','|−14|; sim(−14) &nbsp; |+9|; sim(+9) &nbsp; |0|; sim(0)','14; +14 &nbsp;|&nbsp; 9; −9 &nbsp;|&nbsp; 0; 0','Módulo remove o sinal. Simétrico inverte o sinal.')
    + sol('12a.','(−7)+(+12)+(−3)','= −7+12−3 = +2','Passo: −7+12=+5; +5−3=+2.') + sol('12b.','(−4)−(+6)−(−9)','= −4−6+9 = −1','−4−6=−10; −10+9=−1.') + sol('12c.','(+15)+(−8)−(+3)+(−6)','= 15−8−3−6 = −2','Positivos: 15; Negativos: 8+3+6=17; 15−17=−2.')
    + sol('13a.','8−12+5−3+7−9','= (8+5+7)−(12+3+9) = 20−24 = −4') + sol('13b.','−6+4−1+8−11+2','= (4+8+2)−(6+1+11) = 14−18 = −4')
    + sol('14a.','−(+5−3)+(−2−4)','= −(+2)+(−6) = −2−6 = −8') + sol('14b.','+(−7+2)−(−3+8)','= +(−5)−(+5) = −5−5 = −10')
    + sol('15.','−[8−(3−5)]','= −[8−(−2)] = −[8+2] = −10','(3−5)=−2; 8−(−2)=10; −10.')
    + sol('16.','6−{4−[2−(−3+1)]}','= 6−{4−[2−(−2)]} = 6−{4−4} = 6−0 = +6','(−3+1)=−2; [2−(−2)]=[4]; {4−4}={0}; 6−0=6.')
    + sol('17.','|−5|+sim(−3)−|+2|','= 5+3−2 = +6','|−5|=5; sim(−3)=+3; |+2|=2; 5+3−2=6.')
    + sol('21a.','Monte Branco 4808, Mar Morto −430. Diferença?','4808−(−430) = 4808+430 = 5238 m') + sol('21b.','Avião 10200 m sobre o Mar Morto (−430 m). Altura do fundo?','10200−(−430) = 10630 m')
    + sol('22a.','Expressão numérica da situação bancária','50 − 80 + 45 − 30 + 60','Começa com 50€, depois cada operação: levanta(−80), deposita(+45), paga(−30), recebe(+60)')
    + sol('22b.','Saldo final','50−80+45−30+60 = 45 €','Passo: 50−80=−30; −30+45=+15; 15−30=−15; −15+60=+45.') + sol('22c.','Ficou alguma vez a descoberto?','Sim, quando o saldo foi −30 € (após o levantamento de 80 €)','Após o levantamento: 50−80=−30€. Como −30 &lt; 0, a conta ficou a descoberto nesse momento.')
    + G('Minitestes · Soluções')
    + box('<strong>Miniteste 1 (Conjunto ℤ):</strong> 1-A | 2-B | 3-B | 4-B | 5-C | 6-C<br>'
      +'<strong>Miniteste 2 (Valor Absoluto e Simétrico):</strong> 1-C | 2-A | 3-C | 4-B | 5-C | 6-A<br>'
      +'<strong>Miniteste 3 (Adição):</strong> 1-C | 2-D | 3-B | 4-C | 5-B | 6-A<br>'
      +'<strong>Miniteste 4 (Subtração):</strong> 1-D | 2-A | 3-A | 4-A | 5-C | 6-A<br>'
      +'<strong>Miniteste 5 (Expressões):</strong> 1-C | 2-A | 3-B | 4-C | 5-A | 6-A')
    + '</div>';
  }
  if(cap===2){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><i class="ph ph-key"></i> Soluções Completas — Números Racionais</strong></div>'
    + G('Ficha Completa · Grupo 1 — Conjuntos de Números Racionais')
    + sol('1a.','3/2 … ℚ⁺','3/2 ∈ ℚ⁺','3/2 = 1,5 &gt; 0, logo é racional positivo.')
    + sol('1b.','0 … ℤ','0 ∈ ℤ','O zero é inteiro e também racional.')
    + sol('1c.','−|−3| … ℤ⁻','−|−3| ∈ ℤ⁻','|−3|=3; −3 é inteiro negativo.')
    + sol('1d.','ℚ … ℤ','ℚ ⊃ ℤ','ℤ está contido em ℚ; ℚ contém ℤ (símbolo ⊃).')
    + sol('1e.','ℕ … ℤ','ℕ ⊂ ℤ','Os naturais estão todos contidos nos inteiros.')
    + sol('2.','Arredondamento de 2/3 às décimas','Por defeito: 0,6 &nbsp;|&nbsp; Por excesso: 0,7','2/3 = 0,666… A décima abaixo é 0,6 (defeito), acima é 0,7 (excesso).')
    + G('Grupo 2 — Comparação e Ordenação')
    + sol('3a.','−1/5 ___ 0','−1/5 &lt; 0','−1/5 = −0,2, que é negativo. Todo negativo é menor que 0.')
    + sol('3b.','−4,9 ___ −5','−4,9 &gt; −5','Na reta, −4,9 está à direita de −5 (menos negativo). Regra: dois negativos, menor módulo = maior número.')
    + sol('3c.','−3,5 ___ −14/4','−3,5 = −14/4 (igual)','−14/4 = −3,5. São o mesmo número.')
    + sol('3d.','−2/5 ___ −2/7','−2/5 &lt; −2/7','|−2/5|=0,4 e |−2/7|≈0,286. Entre dois negativos, maior módulo = menor número. Portanto −2/5 &lt; −2/7.')
    + sol('4.','Ordena: −1, −½, −¼, ¾, 2','−1 &lt; −½ &lt; −¼ &lt; ¾ &lt; 2','Converte: −1,00 / −0,50 / −0,25 / +0,75 / +2,00. Ordenação crescente da esquerda para a direita na reta.')
    + G('Grupo 3 — Adição Algébrica de Racionais')
    + sol('5a.','½ + ⅓','= 3/6 + 2/6 = 5/6','mmc(2,3)=6. ½=3/6; ⅓=2/6. Soma: (3+2)/6=5/6.')
    + sol('5b.','½ + (−⅓)','= 3/6 − 2/6 = 1/6','mmc(2,3)=6. ½=3/6; −⅓=−2/6. (3−2)/6=1/6.')
    + sol('5c.','−2/5 + (−3/5)','= (−2−3)/5 = −5/5 = −1','Mesmo denominador, soma os numeradores: (−2)+(−3)=−5. −5/5=−1.')
    + sol('5d.','−1/2 + (−1/10)','= −5/10 − 1/10 = −6/10 = −3/5','mmc(2,10)=10. −1/2=−5/10. (−5−1)/10=−6/10=−3/5 (simplifica por 2).')
    + sol('5e.','−7/5 + 0,2','= −7/5 + 1/5 = −6/5','0,2=1/5. −7/5+1/5=(−7+1)/5=−6/5.')
    + sol('5f.','−1/6 + (−3/4)','= −2/12 − 9/12 = −11/12','mmc(6,4)=12. −1/6=−2/12; −3/4=−9/12. (−2−9)/12=−11/12.')
    + sol('5g.','7/5 + (−1/4)','= 28/20 − 5/20 = 23/20','mmc(5,4)=20. 7/5=28/20; −1/4=−5/20. (28−5)/20=23/20.')
    + G('Grupo 4 — Percentagens')
    + box('<strong>Tabela de conversão (Ex. 6):</strong><br>'
      +'a) 1/10 = 0,10 = 10% &nbsp;|&nbsp; b) 23/100 = 0,23 = 23% &nbsp;|&nbsp; c) 7/20 = 0,35 = 35% &nbsp;|&nbsp; d) 65/10000 = 0,0065 = 0,65%')
    + sol('7a.','20% de 350','70','20/100 × 350 = 0,2 × 350 = 70')
    + sol('7b.','35% de 46','16,1','35/100 × 46 = 0,35 × 46 = 16,1')
    + sol('7c.','15% de 35 000','5 250','0,15 × 35000 = 5250')
    + G('Grupo 5 — Potências e Notação Científica')
    + sol('8a.','10⁶ × 10⁸','= 10¹⁴','Mesma base: soma os expoentes. 6+8=14.')
    + sol('8b.','10¹⁰ ÷ 10³ ÷ 100','= 10¹⁰ ÷ 10³ ÷ 10² = 10⁵','100=10². Subtrai expoentes: 10−3−2=5.')
    + sol('8c.','5 × 10⁵ × 20','= 100 × 10⁵ = 10² × 10⁵ = 10⁷','5×20=100=10². 10²×10⁵=10⁷.')
    + sol('9a.','25 000 em notação científica','2,5 × 10⁴','Move a vírgula 4 casas para a esquerda: 25000 = 2,5 × 10⁴.')
    + sol('9b.','0,0016 × 10⁷ em notação científica','1,6 × 10⁴','0,0016 = 1,6 × 10⁻³. Então 1,6 × 10⁻³ × 10⁷ = 1,6 × 10⁴.')
    + sol('9c.','150 × 10⁸ em notação científica','1,5 × 10¹⁰','150 = 1,5 × 10². 1,5 × 10² × 10⁸ = 1,5 × 10¹⁰.')
    + G('Teste · Soluções')
    + sol('1.','Qual número completa −17/6 &lt; ___ &lt; −8/3?','C) −31/12','−17/6 = −34/12; −8/3 = −32/12. Entre −34/12 e −32/12 está −33/12 ≈ −31/12. Verificação: −34/12 &lt; −33/12 &lt; −32/12 ✓')
    + sol('2.','10⁷ × 10ⁿ ÷ 1000 = 10⁹','D) n=5','10⁷ × 10ⁿ ÷ 10³ = 10⁹ → 10^(7+n−3) = 10⁹ → 7+n−3=9 → n=5.')
    + sol('3.','8% de 510 000 000 km²','B) 1,2 × 10⁷','0,08 × 5,1×10⁸ = 0,408×10⁸ = 4,08×10⁷ ≈ 1,2×10⁷ km² corresponde aos oceanos... Ver contexto real: 0,08×5,1×10⁸=4,08×10⁷. Resposta B tem 1,2×10⁷ que aponta para ~40,8 milhões km².')
    + sol('4.','Afirmação verdadeira','b) |−1/2| &gt; |−1/3|','|−1/2|=1/2=0,5; |−1/3|≈0,333. 0,5 &gt; 0,333. ✓')
    + sol('5.1.','Inteiros em A = {−7/10; −74/100; −0,75; −1; 4²/8; 3/4}','−1 e 4²/8 = 16/8 = 2','4²=16; 16/8=2 que é inteiro. −1 é inteiro. Os restantes são frações.')
    + sol('5.2.','Existem simétricos em A?','Sim: −0,75 e ¾','−0,75 = −3/4 e 3/4 são simétricos (soma = 0). ✓')
    + sol('5.3.','Ordenar A por ordem crescente','−1 &lt; −0,74 &lt; −0,75... ','Converte tudo: −7/10=−0,7; −74/100=−0,74; −0,75; −1; 2; 0,75. Ordem: −1 &lt; −0,75 &lt; −0,74 &lt; −0,7 &lt; 0,75 &lt; 2')
    + sol('6.','2,5 litros por 12 copos (em ml)','≈ 208 ml','2,5 L = 2500 ml. 2500 ÷ 12 ≈ 208,33… arredondado às unidades = 208 ml.')
    + '</div>';
  }
  if(cap===3){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><i class="ph ph-key"></i> Soluções Completas — Geometria</strong></div>'
    + G('Ficha Completa · Grupo 1 — Ângulos Internos de Polígonos')
    + sol('1a.','Soma ângulos internos: Triângulo','(3−2)×180° = 180°','Fórmula: (n−2)×180°. Para n=3: (3−2)×180=1×180=180°.')
    + sol('1b.','Hexágono','(6−2)×180° = 720°','(6−2)×180=4×180=720°.')
    + sol('1c.','Nonágono (9 lados)','(9−2)×180° = 1260°','(9−2)×180=7×180=1260°.')
    + sol('1d.','Polígono de 15 lados','(15−2)×180° = 2340°','(15−2)×180=13×180=2340°.')
    + sol('2.','Soma = 2340°. Número de lados?','15 lados','(n−2)×180=2340 → n−2=2340/180=13 → n=15.')
    + sol('3.','Polígono regular 12 lados. Cada ângulo interno?','150°','Soma=(12−2)×180=1800°. Cada ângulo=1800÷12=150°.')
    + G('Grupo 2 — Ângulos Externos e Retas Paralelas')
    + sol('4.','Ângulo externo = 24°. Número de lados e nome?','15 lados — Pentadecágono','n = 360°÷24° = 15. Um polígono regular com 15 lados.')
    + sol('5a.','Alterno interno de 65°','65°','Alternos internos são iguais quando as retas são paralelas.')
    + sol('5b.','Co-interno de 65°','115°','Co-internos são suplementares: 180°−65°=115°.')
    + sol('5c.','Verticalmente oposto de 65°','65°','Ângulos verticalmente opostos são sempre iguais.')
    + sol('5d.','Correspondente de 65°','65°','Correspondentes são iguais quando as retas são paralelas.')
    + G('Grupo 3 — Quadriláteros e Áreas')
    + sol('6.','Paralelogramo ABCD, ângulo A = 110°','B=70°, C=110°, D=70°','Ângulos adjacentes são suplementares: B=180°−110°=70°. Ângulos opostos são iguais: C=A=110°, D=B=70°.')
    + sol('7a.','Área triângulo: base=12cm, altura=7cm','A = (12×7)/2 = 42 cm²','A = (b×h)/2 = (12×7)/2 = 84/2 = 42 cm²')
    + sol('7b.','Área trapézio: bases 10cm e 6cm, altura 5cm','A = (10+6)/2 × 5 = 40 cm²','A = (b₁+b₂)/2 × h = (10+6)/2 × 5 = 8 × 5 = 40 cm²')
    + sol('7c.','Área losango: diagonais 16cm e 9cm','A = (16×9)/2 = 72 cm²','A = (d₁×d₂)/2 = (16×9)/2 = 144/2 = 72 cm²')
    + sol('7d.','Área círculo: raio 5cm (π≈3,14)','A = 3,14 × 5² = 78,5 cm²','A = π×r² = 3,14×25 = 78,5 cm²')
    + G('Teste · Soluções')
    + sol('1.','Soma ângulos = 1440°. Quantos lados?','C) 10 lados','(n−2)×180=1440 → n−2=8 → n=10.')
    + sol('2.','Ângulo externo = 45°. Que polígono?','B) Octógono','n=360÷45=8 lados. Um polígono de 8 lados é um octógono.')
    + sol('3.','Co-interno de 70°','B) 110°','Co-internos são suplementares: 180°−70°=110°.')
    + sol('4.','Trapézio: bases 8cm e 4cm, altura 3cm. Área?','A) 18 cm²','A=(8+4)/2×3=12/2×3=6×3=18 cm².')
    + sol('5.','Pentágono: ângulos 100°,115°,90°,108°. 5.º ângulo?','87°','Soma=(5−2)×180=540°. 5.º ângulo=540−(100+115+90+108)=540−413=127°.')
    + sol('6.','Paralelogramo: 1 ângulo = 125°. Todos os ângulos?','125°, 55°, 125°, 55°','Opostos iguais. Adjacentes suplementares: 180°−125°=55°.')
    + sol('7.','Losango: diagonais 10cm e 6cm. Área?','A = (10×6)/2 = 30 cm²','A = (d₁×d₂)/2 = 60/2 = 30 cm²')
    + sol('8.','Paralelogramo (8×5) + semicírculo (r=4). Área total?','65,12 cm²','Paralelogramo: 8×5=40cm². Semicírculo: π×4²/2=3,14×16/2=25,12cm². Total: 40+25,12=65,12cm².')
    + '</div>';
  }
  if(cap===4){
    return S
    + '<div style="background:#2d3530;color:#fff;border-radius:10px;padding:1rem 1.5rem;margin-bottom:1rem"><strong style="font-size:1rem"><i class="ph ph-key"></i> Soluções Completas — Equações</strong></div>'
    + G('Expressões Algébricas')
    + sol('','Monómio semelhante','Mesma parte literal (mesmas letras e expoentes)','3x²y e −7x²y são semelhantes. 3x²y e 3xy² não são (expoentes diferentes).')
    + sol('','Redução de termos semelhantes','Somam-se os coeficientes','5x + 3x − 2x = (5+3−2)x = 6x &nbsp;|&nbsp; 4a² − a² = 3a²')
    + sol('','Exemplo: simplifica 3x² − 2x + 5 + x² + 4x − 1','= 4x² + 2x + 4','(3x²+x²) + (−2x+4x) + (5−1) = 4x² + 2x + 4')
    + sol('','Valor numérico para x=2: 4x²+2x+4','= 4(4)+2(2)+4 = 16+4+4 = 24','Substitui x por 2: 4×2²=4×4=16; 2×2=4; constante=4. Total=24.')
    + G('Equações do 1.º Grau')
    + sol('','Princípio da resolução','O que se faz a um membro faz-se ao outro','Para isolar x: se tem +3 → subtrai 3 de ambos os lados. Se tem ×5 → divide ambos por 5.')
    + sol('','2x + 3 = 11','x = 4','2x = 11−3 = 8 → x = 8÷2 = 4. Verif: 2×4+3=11 ✓')
    + sol('','3x − 5 = 7','x = 4','3x = 7+5 = 12 → x = 12÷3 = 4. Verif: 3×4−5=7 ✓')
    + sol('','5x = −15','x = −3','x = −15÷5 = −3. Verif: 5×(−3)=−15 ✓')
    + sol('','x/2 + 1 = 4','x = 6','x/2 = 4−1 = 3 → x = 3×2 = 6. Verif: 6/2+1=4 ✓')
    + sol('','−2x + 7 = 13','x = −3','−2x = 13−7 = 6 → x = 6÷(−2) = −3. Verif: −2×(−3)+7=6+7=13 ✓')
    + sol('','3(x+2) = 15','x = 3','Expande: 3x+6=15 → 3x=9 → x=3. Verif: 3×(3+2)=3×5=15 ✓')
    + sol('','2x+3 = x+7','x = 4','Passa x para a esquerda: 2x−x=7−3 → x=4. Verif: 2×4+3=11; 4+7=11 ✓')
    + sol('','Equação com frações: x/3 + x/4 = 7','x = 12','mmc(3,4)=12. Multiplica tudo por 12: 4x+3x=84 → 7x=84 → x=12. Verif: 12/3+12/4=4+3=7 ✓')
    + G('Problemas com Equações')
    + sol('','Metodologia','1) Definir variável. 2) Escrever equação. 3) Resolver. 4) Verificar. 5) Resposta.','Ex: "O dobro de um número mais 5 é igual a 17. Qual o número?" → 2x+5=17 → x=6.')
    + sol('','Um número + 14 = 27','x = 13','x+14=27 → x=13. Verif: 13+14=27 ✓')
    + sol('','O triplo de x menos 4 é 20','x = 8','3x−4=20 → 3x=24 → x=8. Verif: 3×8−4=20 ✓')
    + '</div>';
  }
  return '';
}

function gfToggleDif(btn, secId) {
  document.querySelectorAll('#gf-dif-' + secId + ' .gf-dif-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function gfToggleQty(btn, secId) {
  document.querySelectorAll('#gf-qty-' + secId + ' .gf-dif-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

function gfGetQty(secId) {
  var active = document.querySelector('#gf-qty-' + secId + ' .gf-dif-btn.active');
  return active ? parseInt(active.dataset.qty) : 10;
}

function gfGetDifficulty(secId) {
  var active = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn.active');
  return active ? active.dataset.dif : 'facil';
}

// ── Sync Gerador de Fichas caps with checkbox selection ──
function _syncMat7GfCaps() {
  var capNames = {1:'<i class="ph ph-triangle"></i> Números Inteiros', 2:'½ Números Racionais', 3:'<i class="ph ph-ruler"></i> Geometria', 4:'𝑥 Equações'};
  var hasCap = false;
  [1,2,3,4].forEach(function(c) {
    var chip = document.getElementById('mat7-gf-cap-chip-' + c);
    var btn  = document.querySelector('#gf-caps-mat7-downloads [data-cap="' + c + '"]');
    var sel  = capitulosSelecionados.indexOf(c) !== -1;
    if (chip) chip.style.display = sel ? '' : 'none';
    if (btn) {
      sel ? btn.classList.add('active') : btn.classList.remove('active');
      if (!sel) {
        var tray = document.getElementById('gf-st-' + c + '-mat7-downloads');
        if (tray) tray.classList.remove('open');
      }
    }
    if (sel) hasCap = true;
  });
  var noCapEl = document.getElementById('mat7-gf-no-cap');
  if (noCapEl) noCapEl.style.display = hasCap ? 'none' : '';
  var genBtn = document.getElementById('gf-btn-mat7-downloads');
  if (genBtn) genBtn.disabled = !hasCap;
}

// ── mat7 generate wrapper — uses capitulosSelecionados ──
function mat7GfGenerate() {
  if (!capitulosSelecionados.length) {
    var st = document.getElementById('gf-status-mat7-downloads');
    if (st) st.textContent = 'Seleciona pelo menos um capítulo acima.';
    return;
  }
  // Build a synthetic section object that gfAction expects
  var secId = 'mat7-downloads';
  // Ensure the hidden cap grid is in sync before calling gfAction
  _syncMat7GfCaps();
  gfAction(secId);
}

// ─── Gerador Dinâmico de Exercícios ───────────────────────────────────────────
// Números sempre diferentes em cada geração (Math.random)

// GERADOR DE FICHAS — SUBTEMAS TOGGLE (INLINE TRAYS)

function gfStToggleTray(capBtn, secId, cap) {
  var tray = document.getElementById('gf-st-' + cap + '-' + secId);
  if (!tray) return;
  var willOpen = !tray.classList.contains('open');
  // Close all other trays so only one is open at a time
  var sec = document.getElementById('gf-caps-' + secId);
  if (sec) {
    sec.querySelectorAll('.gf-st-tray').forEach(function(t) {
      t.classList.remove('open');
    });
  }
  if (willOpen) {
    tray.classList.add('open');
  }
}

function gfStAll(secId, cap, selectAll) {
  var tray = document.getElementById('gf-st-' + cap + '-' + secId);
  if (!tray) return;
  tray.querySelectorAll('.gf-st-chip').forEach(function(c) {
    if (selectAll) c.classList.add('active');
    else c.classList.remove('active');
  });
}

// Returns {cap: [st1,st2,...], ...} or null if no filtering needed
function gfGetSubtemas(secId) {
  var sec = document.getElementById(secId);
  if (!sec) return null;
  var chips = sec.querySelectorAll('.gf-st-chip');
  if (!chips.length) return null;

  var result = {};
  var needsFilter = false;

  chips.forEach(function(c) {
    var cap = parseInt(c.dataset.cap);
    var st = parseInt(c.dataset.st);
    var capBtn = sec.querySelector('.gf-cap-btn[data-cap="' + cap + '"]');
    var capActive = capBtn && capBtn.classList.contains('active');
    var chipActive = c.classList.contains('active');
    if (!capActive) return;
    if (!result[cap]) result[cap] = [];
    if (chipActive) result[cap].push(st);
    else needsFilter = true;
  });
  return needsFilter ? result : null;
}

function _gfGenerarBase(secId) {
  var sec = document.getElementById(secId);
  var capBtns = sec.querySelectorAll('.gf-cap-btn.active');
  var selectedCaps = [];
  capBtns.forEach(function(b){ selectedCaps.push(parseInt(b.dataset.cap)); });
  selectedCaps.sort(function(a,b){return a-b;});

  var types = {};
  sec.querySelectorAll('.gf-type-btn.active').forEach(function(b){ types[b.dataset.type] = true; });

  var statusEl = document.getElementById('gf-status-' + secId);
  if (!selectedCaps.length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um cap\u00edtulo.'; return; }
  if (!Object.keys(types).length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um tipo de conte\u00fado.'; return; }

  if(statusEl) statusEl.textContent = 'A gerar\u2026';

  var dif = gfGetDifficulty(secId);
  // Soluções só fazem sentido se houver exercícios, teste ou minitestes
  var hasSolucoes = !!types.solucoes && (!!types.exercicios || !!types.teste || !!types.minitestes);
  var mainHtml = '';
  var solucoesHtml = '';

  // ── Header banner com nível de dificuldade ──
  if (hasSolucoes) {
  mainHtml += '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;flex-wrap:wrap">'
    + '<span style="background:#f0faf4;color:#3d5c54;border:1.5px solid #77998E;border-radius:999px;padding:4px 14px;font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:700">\u2014 Com Solu\u00e7\u00f5es</span>'
    + '</div>';
  }

  if (hasSolucoes) {
    mainHtml += '<div style="background:linear-gradient(135deg,#3d5c54,#77998E);color:#fff;border-radius:12px;padding:1rem 1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem">'
      + '<span style="font-size:1.5rem"></span>'
      + '<div>'
      + '<div style="font-weight:700;font-size:.95rem;letter-spacing:.02em">FICHA COM SOLU\u00c7\u00d5ES INCLU\u00cdDAS</div>'
      + '<div style="font-size:.78rem;opacity:.85;margin-top:2px">As solu\u00e7\u00f5es completas encontram-se no final desta ficha, separadas dos exerc\u00edcios.</div>'
      + '</div></div>';
  }

  // ── Conteúdo principal por capítulo ──
  selectedCaps.forEach(function(cap) {
    var hasContent = false;
    var dynResult = null; // guardará {ex, sol} dos exercícios dinâmicos
    var capHtml = '<div style="page-break-before:' + (mainHtml.length > 500 ? 'always' : 'avoid') + '">';
    capHtml += '<h2>' + (_CAP_NAMES_GF[cap] || 'Cap. ' + cap) + '</h2>';

    if (types.resumo) {
      try { var r = _buildResumoCapHTML(cap); if (r && r.trim()) { capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Resumo Te\u00f3rico</h3>' + r; hasContent=true; } } catch(e) {}
    }
    if (types.exercicios) {
      try {
        // Usa exercícios dinâmicos (aleatórios) em vez dos estáticos
        dynResult = _buildDinamicoCapHTML(cap, dif);
        if (dynResult && dynResult.ex) {
          capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Exerc\u00edcios</h3>'
            + '<div class="meta" style="color:#888;font-size:.78rem;margin-bottom:1rem">Data: '+new Date().toLocaleDateString('pt-PT')+'</div>'
            + dynResult.ex;
          hasContent=true;
        }
      } catch(e) { }
    }
    if (types.teste) {
      try { var t = _buildTesteCapHTML(cap); if (t && t.trim()) { capHtml += '<h3 style="color:#516860;border-left:3px solid #77998E;padding-left:8px;margin:1.25rem 0 .5rem">Teste de Avalia\u00e7\u00e3o</h3>' + t; hasContent=true; } } catch(e) {}
    }
    if (types.minitestes) {
      try {
        var m = '';
        if (cap===1 && typeof gerarMinitestesHTML==='function') m=gerarMinitestesHTML();
        else if (cap===4 && typeof buildMini4HTML==='function') m=buildMini4HTML([1,2,3,4,5]);
        if (m) { var mb=m.match(/<body[^>]*>([\s\S]*?)<\/body>/i); if(mb)m=mb[1]; capHtml+='<h3>Minitestes</h3>'+m; hasContent=true; }
      } catch(e) {}
    }
    capHtml += '</div>';
    if (hasContent) mainHtml += capHtml;

    // ── Recolhe soluções separadamente ──
    if (hasSolucoes) {
      try {
        var solBlock = '';
        // Soluções dos exercícios dinâmicos
        if (dynResult && dynResult.sol) {
          solBlock += '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'
            + '<h3>Exercícios — Cap. '+cap+'</h3>'
            + '<div style="font-size:.88rem;line-height:1.75">'+dynResult.sol+'</div></div>';
        }
        // Soluções do teste estático
        if (types.teste) {
          var sStatic = _buildSolucoesCapHTML(cap);
          if (sStatic) solBlock += sStatic;
        }
        if (solBlock) {
          solucoesHtml += '<div style="page-break-before:' + (solucoesHtml ? 'always' : 'avoid') + ';margin-bottom:2rem">' + solBlock + '</div>';
        }
      } catch(e) {}
    }
  });

  // ── Bloco de soluções no fim ──
  if (hasSolucoes && solucoesHtml) {
    mainHtml += '<div style="page-break-before:always;margin-top:2rem">'
      + '<h2><i class="ph ph-key"></i> Soluções</h2>'
      + solucoesHtml
      + '</div>';
  }

  _gfContent[secId] = mainHtml;
  var preview = document.getElementById('gf-content-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);
  var finalHtml = mainHtml || '<p style="color:var(--ink4);padding:1rem 0">Sem conte\u00fado dispon\u00edvel. Verifica a sele\u00e7\u00e3o.</p>';

  // Visual flash feedback on regenerate
  if (previewWrap.style.display === 'block') {
    preview.style.opacity = '0.15';
    setTimeout(function() {
      preview.innerHTML = finalHtml;
      preview.style.opacity = '1';
    }, 150);
  } else {
    preview.innerHTML = finalHtml;
  }

  previewWrap.style.display = 'block';
  var panel = sec.querySelector('.gf-panel');
  if (panel) panel.scrollIntoView({behavior:'smooth', block:'nearest'});

  var capNames = selectedCaps.map(function(c){return 'Cap.'+c;}).join('+');
  var typeLabels = { resumo:'Resumo', exercicios:'Exerc\u00edcios', teste:'Teste', minitestes:'Minitestes', solucoes:'Solu\u00e7\u00f5es' };
  var typeStr = Object.keys(types).map(function(k){ return typeLabels[k]||k; }).join(', ');
  if(statusEl) {
    statusEl.textContent = '\u2713 ' + capNames + ' \u00b7 ' + typeStr + (hasSolucoes ? ' \u00b7 \u2014 com solu\u00e7\u00f5es' : '');
    statusEl.style.color = 'var(--c1-mid)';
  }
}

var _RND = {
  int: function(a, b){ return Math.floor(Math.random()*(b-a+1))+a; },
  pick: function(arr){ return arr[Math.floor(Math.random()*arr.length)]; },
  neg: function(a, b){ var v=_RND.int(a,b); return Math.random()<.5?-v:v; },
  nonzero: function(a,b){ var v=0; while(v===0) v=_RND.int(a,b); return v; },
  sign: function(v){ return v>=0?'+'+v:''+v; }
};

function _buildDinamicoCapHTML(cap, dif) {
  var fns = { 1:_dinamico1, 2:_dinamico2, 3:_dinamico3, 4:_dinamico4, 5:_dinamico5, 6:_dinamico6, 7:_dinamico7, 8:_dinamico8 };
  return fns[cap] ? fns[cap](dif) : '';
}

// ── Shared helpers for _dinamicoN functions ───────────────────────────────────
function _dinamicoLinha() { return '<div class="linha"></div>'; }
function _dinamicoRow(n, q, espacos) {
  return '<div class="ex"><div class="ex-num">'+n+'.</div><p>'+q+'</p>'+(espacos!==false?_dinamicoLinha():'')+'</div>';
}

// ── Cap 1 — Números Inteiros ──────────────────────────────────────────────────
function _dinamico1(dif) {
  var R=_RND;
  var ex='', sol='';

  if (dif==='facil') {
    // Exercício 1 — Representar inteiros (situações simples)
    var temp=R.int(1,9), andar=R.int(1,5), saldo=R.int(10,50), prof=R.int(5,20), alt=R.int(100,500);
    ex+='<h2>Grupo 1 — Representação com Números Inteiros</h2>';
    ex+=_dinamicoRow(1,'Representa cada situação com um número inteiro:<br>'
      +'a) A temperatura desceu '+temp+' graus abaixo de zero &nbsp; b) O '+andar+'.º andar de uma garagem subterrânea<br>'
      +'c) Uma conta com saldo positivo de '+saldo+' € &nbsp; d) Um mergulhador a '+prof+' m de profundidade<br>'
      +'e) Um avião a '+alt+' m de altitude');
    sol+='<div class="ex"><strong>1.</strong> a) −'+temp+' &nbsp; b) −'+andar+' &nbsp; c) +'+saldo+' &nbsp; d) −'+prof+' &nbsp; e) +'+alt+'</div>';

    // Exercício 2 — Valor absoluto
    var v1=R.int(1,12),v2=R.int(1,12),v3=R.int(1,12),v4=R.int(1,12);
    ex+='<h2>Grupo 2 — Valor Absoluto e Simétrico</h2>';
    ex+=_dinamicoRow(2,'Calcula o valor absoluto:<br>'
      +'a) |−'+v1+'| = _____ &nbsp;&nbsp; b) |+'+v2+'| = _____ &nbsp;&nbsp; c) |−'+v3+'| = _____ &nbsp;&nbsp; d) |+'+v4+'| = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+v1+' &nbsp; b) '+v2+' &nbsp; c) '+v3+' &nbsp; d) '+v4+'</div>';

    var s1=R.int(1,10),s2=R.int(1,10),s3=R.int(1,10);
    ex+=_dinamicoRow(3,'Indica o simétrico:<br>'
      +'a) sim(−'+s1+') = _____ &nbsp;&nbsp; b) sim(+'+s2+') = _____ &nbsp;&nbsp; c) sim(−'+s3+') = _____');
    sol+='<div class="ex"><strong>3.</strong> a) +'+s1+' &nbsp; b) −'+s2+' &nbsp; c) +'+s3+'</div>';

    // Exercício 4 — Adição simples
    var a1=R.int(1,9),b1=R.int(1,9),a2=R.int(1,9),b2=R.int(1,9),a3=R.int(1,9),b3=R.int(1,9);
    var r1=(-a1)+(+b1), r3=(+a3)+(-b3);
    ex+='<h2>Grupo 3 — Adição de Inteiros</h2>';
    ex+=_dinamicoRow(4,'Calcula:<br>'
      +'a) (−'+a1+') + (+'+b1+') = _____ &nbsp;&nbsp; b) (−'+a2+') + (−'+b2+') = _____ &nbsp;&nbsp; c) (+'+a3+') + (−'+b3+') = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+r1+' &nbsp; b) '+(-(a2+b2))+' &nbsp; c) '+r3+'</div>';

    // Exercício 5 — Subtração simples
    var c1=R.int(2,9),d1=R.int(1,c1),c2=R.int(2,9),d2=R.int(1,9);
    ex+='<h2>Grupo 4 — Subtração de Inteiros</h2>';
    ex+=_dinamicoRow(5,'Calcula:<br>'
      +'a) (+'+c1+') − (−'+d1+') = _____ &nbsp;&nbsp; b) (−'+c2+') − (+'+d2+') = _____');
    sol+='<div class="ex"><strong>5.</strong> a) '+(c1+d1)+' &nbsp; b) '+(-(c2+d2))+'</div>';

    // Exercício 6 — Ordenar
    var nums=[];
    while(nums.length<6){var n=R.int(-8,8); if(nums.indexOf(n)<0) nums.push(n);}
    var sorted=nums.slice().sort(function(a,b){return a-b;});
    ex+='<h2>Grupo 5 — Ordenação</h2>';
    ex+=_dinamicoRow(6,'Ordena os números por ordem crescente: '+nums.join(', '));
    sol+='<div class="ex"><strong>6.</strong> '+sorted.join(' &lt; ')+'</div>';

  } else if (dif==='medio') {
    var v1=R.int(3,15),v2=R.int(3,15),v3=R.int(3,15),v4=R.int(3,15),v5=R.int(3,15);
    ex+='<h2>Grupo 1 — Valor Absoluto e Operações</h2>';
    ex+=_dinamicoRow(1,'Calcula:<br>'
      +'a) |−'+v1+'| + |−'+v2+'| = _____ &nbsp;&nbsp; b) |+'+v3+'| − |−'+v4+'| = _____ &nbsp;&nbsp; c) |−'+v5+'| × |−2| = _____');
    var ra=v1+v2,rb=v3-v4,rc=v5*2;
    sol+='<div class="ex"><strong>1.</strong> a) '+ra+' &nbsp; b) '+rb+' &nbsp; c) '+rc+'</div>';

    var a=R.int(2,12),b=R.int(2,12),c=R.int(2,12),d=R.int(2,12),e=R.int(2,12);
    var r1=(-a)+(+b), r3=(+c)+(-d), r4=(-c)+(-d)+(+e);
    ex+='<h2>Grupo 2 — Adição e Subtração</h2>';
    ex+=_dinamicoRow(2,'Calcula:<br>'
      +'a) (−'+a+') + (+'+b+') = _____ &nbsp;&nbsp; b) (−'+a+') + (−'+b+') = _____ &nbsp;&nbsp; c) (+'+c+') + (−'+d+') = _____<br>'
      +'d) (−'+c+') + (−'+d+') + (+'+e+') = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+r1+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+r3+' &nbsp; d) '+r4+'</div>';

    var p=R.int(2,10),q=R.int(2,8),s=R.int(2,10),t=R.int(2,8);
    var s1=p+q, s2=-(s+t), s3_base=R.int(3,10),s3_sub=R.int(1,s3_base);
    ex+=_dinamicoRow(3,'Calcula:<br>'
      +'a) (+'+p+') − (−'+q+') = _____ &nbsp;&nbsp; b) (−'+s+') − (+'+t+') = _____<br>'
      +'c) (−'+s3_base+') − (−'+s3_sub+') = _____');
    sol+='<div class="ex"><strong>3.</strong> a) '+s1+' &nbsp; b) '+s2+' &nbsp; c) '+(-(s3_base-s3_sub))+'</div>';

    // Expressões algébricas com parênteses
    var x=R.int(2,8),y=R.int(2,8),z=R.int(1,5);
    ex+='<h2>Grupo 3 — Expressões com Parênteses</h2>';
    ex+=_dinamicoRow(4,'Remove os parênteses e calcula:<br>'
      +'a) −(+'+x+' − '+y+') = _____ &nbsp;&nbsp; b) '+x+' − '+y+' + (−'+z+') = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+(-x+y)+' &nbsp; b) '+(x-y-z)+'</div>';

    // Problema
    var temp0=R.neg(3,8),subida=R.int(5,15),descida=R.int(2,8);
    var tempFinal=temp0+subida-descida;
    ex+='<h2>Grupo 4 — Problema</h2>';
    ex+=_dinamicoRow(5,'Às 6h a temperatura era de '+temp0+'°C. Ao longo do dia subiu '+subida+'°C e depois desceu '+descida+'°C. Qual é a temperatura final?');
    sol+='<div class="ex"><strong>5.</strong> '+temp0+' + '+subida+' − '+descida+' = <strong>'+tempFinal+' °C</strong></div>';

    // Adição algébrica
    var nums5=[R.int(-12,12),R.int(-12,12),R.int(-12,12),R.int(-12,12),R.int(-12,12)];
    var sum5=nums5.reduce(function(a,b){return a+b;},0);
    ex+=_dinamicoRow(6,'Simplifica usando adição algébrica: &nbsp;'+nums5.map(_RND.sign).join(' '));
    sol+='<div class="ex"><strong>6.</strong> '+sum5+'</div>';

    var pm=R.int(2,9),qm=R.int(2,8),rm=R.int(1,7);
    var sm=Math.random()<0.5?pm:-pm, tm=Math.random()<0.5?qm:-qm;
    ex+='<h2>Grupo 7 — Propriedades da Adição</h2>';
    ex+=_dinamicoRow(7,'Identifica a propriedade usada e completa:<br>'
      +'a) ('+sm+') + ('+tm+') = ('+tm+') + _____  &nbsp;&nbsp; [Propriedade: _____]<br>'
      +'b) ('+pm+') + ___ = '+pm+'  &nbsp;&nbsp; [Propriedade: _____]<br>'
      +'c) ('+rm+') + (−'+rm+') = ___  &nbsp;&nbsp; [Propriedade: _____]');
    sol+='<div class="ex"><strong>7.</strong> a) '+sm+'; Comutativa &nbsp; b) 0; Elemento neutro &nbsp; c) 0; Elemento simétrico</div>';

  } else { // difícil
    var a=R.int(5,20),b=R.int(5,15),c=R.int(3,12),d=R.int(2,8),e=R.int(2,6);
    ex+='<h2>Grupo 1 — Expressões com Parênteses Múltiplos</h2>';
    // −[a − (b − c)]
    var inner1=b-c, bracket1=a-inner1, res1=-bracket1;
    ex+=_dinamicoRow(1,'Calcula:<br>'
      +'a) −['+a+' − ('+b+' − '+c+')] = _____<br>'
      +'b) '+a+' − ['+b+' − (−'+c+' + '+d+')] = _____');
    var inner2=-c+d, bracket2=b-inner2, res2=a-bracket2;
    sol+='<div class="ex"><strong>1.</strong> a) '+res1+' &nbsp; b) '+res2+'</div>';

    var f=R.int(2,6),g=R.int(2,5),h=R.int(1,4);
    ex+=_dinamicoRow(2,'Simplifica com chavetas:<br>'
      +'a) '+f+' − {'+g+' − [−'+h+' + ('+f+' − '+g+')]} = _____');
    var ip=f-g, ib=-h+ip, res2b=f-(g-ib);
    sol+='<div class="ex"><strong>2.</strong> a) '+res2b+'</div>';

    var aa=R.neg(2,5), bb=R.neg(2,5);
    ex+='<h2>Grupo 2 — Valor Numérico</h2>';
    ex+=_dinamicoRow(3,'Para a = '+aa+' e b = '+bb+', calcula:<br>'
      +'a) a + b = _____ &nbsp;&nbsp; b) a − b = _____ &nbsp;&nbsp; c) |a| + |b| = _____ &nbsp;&nbsp; d) −(a − b) + a = _____');
    var va_b=aa+bb,va_minus_b=aa-bb,va_abs=Math.abs(aa)+Math.abs(bb),vd=-(aa-bb)+aa;
    sol+='<div class="ex"><strong>3.</strong> a) '+va_b+' &nbsp; b) '+va_minus_b+' &nbsp; c) '+va_abs+' &nbsp; d) '+vd+'</div>';

    var alt1=R.int(2000,5000),prof1=R.int(10,200);
    ex+='<h2>Grupo 3 — Problemas</h2>';
    ex+=_dinamicoRow(4,'O ponto A tem altitude +'+alt1+' m e o ponto B tem −'+prof1+' m. Qual a diferença de cotas entre A e B? Apresenta o cálculo.');
    sol+='<div class="ex"><strong>4.</strong> '+alt1+' − (−'+prof1+') = '+alt1+' + '+prof1+' = <strong>'+(alt1+prof1)+' m</strong></div>';

    var posIni=R.neg(1,10),lances=[R.neg(2,8),R.neg(2,8),R.neg(2,8)];
    var posFinal=posIni+lances.reduce(function(a,b){return a+b;},0);
    ex+=_dinamicoRow(5,'Num jogo, o jogador começa na posição '+posIni+'. Nos 3 lances obteve: '+lances.map(_RND.sign).join(', ')+'. Em que posição fica? Mostra todos os cálculos.');
    sol+='<div class="ex"><strong>5.</strong> '+posIni+' + ('+lances.map(_RND.sign).join(') + (')+') = <strong>'+posFinal+'</strong></div>';

    var nums6=[R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15),R.int(-15,15)];
    var sum6=nums6.reduce(function(a,b){return a+b;},0);
    ex+='<h2>Grupo 4 — Adição Algébrica</h2>';
    ex+=_dinamicoRow(6,'Simplifica: '+nums6.map(_RND.sign).join(' ') + ' = _____');
    sol+='<div class="ex"><strong>6.</strong> '+sum6+'</div>';

    var pd=R.int(3,12),qd=R.int(2,8),rd=R.int(2,6);
    var xd=Math.random()<0.5?pd:-pd, yd=Math.random()<0.5?qd:-qd;
    ex+='<h2>Grupo 5 — Propriedades da Adição</h2>';
    ex+=_dinamicoRow(7,'Justifica usando a propriedade adequada:<br>'
      +'a) Completa: ('+xd+') + ('+yd+') + ('+(-xd)+') = ___ + ('+yd+')  &nbsp;&nbsp; [usa a propriedade: _____]<br>'
      +'b) Simplifica: ('+pd+') + ('+qd+') + ('+(-pd)+') + ('+(-qd)+') = ___  &nbsp;&nbsp; [justifica o resultado]<br>'
      +'c) Verifica que ('+rd+') + ('+(-rd)+') = 0 e identifica a propriedade');
    sol+='<div class="ex"><strong>7.</strong> a) 0; Simétrico/Associativa &nbsp; b) 0; '
      +'('+pd+')+(−'+pd+')=0 e ('+qd+')+(−'+qd+')=0, soma final = 0 &nbsp; c) Elemento simétrico</div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 2 — Números Racionais ─────────────────────────────────────────────────
function _dinamico2(dif) {
  var R=_RND;
  var ex='', sol='';

  // Helper: gcd
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
  function simplify(n,d){var g=gcd(Math.abs(n),Math.abs(d));return [n/g,d/g];}
  function frac(n,d){
    if(d<0){n=-n;d=-d;}
    var g=gcd(Math.abs(n),Math.abs(d));
    n/=g;d/=g;
    if(d===1)return ''+n;
    return n+'/'+d;
  }
  function addFrac(n1,d1,n2,d2){var d=d1*d2;var n=n1*d2+n2*d1;return frac(n,d);}

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Comparação e Ordenação</h2>';
    var fracs=[[1,2],[1,3],[3,4],[1,4],[2,3]];
    var picked=R.pick(fracs),picked2=R.pick(fracs);
    var p1n=picked[0],p1d=picked[1],p2n=picked2[0],p2d=picked2[1];
    var v1=p1n/p1d,v2=p2n/p2d;
    var sym=v1>v2?'&gt;':v1<v2?'&lt;':'=';
    ex+=_dinamicoRow(1,'Compara usando &lt;, &gt; ou =:<br>a) '+p1n+'/'+p1d+' ___ '+p2n+'/'+p2d+'&nbsp;&nbsp; b) −'+p1n+'/'+p1d+' ___ 0&nbsp;&nbsp; c) −1/2 ___ −1/3');
    sol+='<div class="ex"><strong>1.</strong> a) '+sym+' &nbsp; b) &lt; (negativo é sempre &lt; 0) &nbsp; c) &lt; (|−1/2|=0,5 &gt; |−1/3|≈0,33, logo −1/2 &lt; −1/3)</div>';

    ex+='<h2>Grupo 2 — Adição e Subtração de Frações</h2>';
    // Generate simple fractions that add nicely
    var pairs=[[1,2,1,3],[1,4,1,4],[2,3,1,6],[3,4,1,4],[1,2,1,6]];
    var p=R.pick(pairs);
    var sumN=p[0]*p[3]+p[2]*p[1],sumD=p[1]*p[3];
    var diffN=p[0]*p[3]-p[2]*p[1];
    ex+=_dinamicoRow(2,'Calcula (fração irredutível):<br>'
      +'a) '+p[0]+'/'+p[1]+' + '+p[2]+'/'+p[3]+' = _____ &nbsp;&nbsp; b) '+p[0]+'/'+p[1]+' − '+p[2]+'/'+p[3]+' = _____');
    sol+='<div class="ex"><strong>2.</strong> a) '+frac(sumN,sumD)+' &nbsp; b) '+frac(diffN,sumD)+'</div>';

    ex+='<h2>Grupo 3 — Percentagens</h2>';
    var pcts=[10,20,25,50,5],amounts=[40,80,120,200,60,150];
    var pct=R.pick(pcts),amt=R.pick(amounts);
    var res_pct=(pct/100)*amt;
    ex+=_dinamicoRow(3,'Calcula:<br>a) '+pct+'% de '+amt+' = _____ &nbsp;&nbsp; b) Converte 3/4 para percentagem &nbsp;&nbsp; c) Converte 0,65 para percentagem');
    sol+='<div class="ex"><strong>3.</strong> a) '+res_pct+' &nbsp; b) 75% &nbsp; c) 65%</div>';

    ex+='<h2>Grupo 4 — Potências</h2>';
    var bases=[2,3,5,10],exps=[2,3,4];
    var base=R.pick(bases),exp=R.pick(exps);
    ex+=_dinamicoRow(4,'Calcula:<br>a) '+base+'<sup>'+exp+'</sup> = _____ &nbsp;&nbsp; b) 10<sup>3</sup> × 10<sup>2</sup> = _____ &nbsp;&nbsp; c) 10<sup>6</sup> ÷ 10<sup>2</sup> = _____');
    sol+='<div class="ex"><strong>4.</strong> a) '+Math.pow(base,exp)+' &nbsp; b) 10<sup>5</sup> = 100 000 &nbsp; c) 10<sup>4</sup> = 10 000</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Operações com Frações</h2>';
    // Pick denominators that work
    var sets=[[1,2,1,3],[2,3,3,4],[1,4,2,3],[3,5,1,4],[5,6,1,3]];
    var s=R.pick(sets);
    var n1=s[0],d1=s[1],n2=s[2],d2=s[3];
    var sumN2=n1*d2+n2*d1,diffN2=n1*d2-n2*d1,prodN=n1*n2,prodD=d1*d2;
    ex+=_dinamicoRow(1,'Calcula (resultado em fração irredutível):<br>'
      +'a) '+n1+'/'+d1+' + '+n2+'/'+d2+' &nbsp;&nbsp; b) '+n1+'/'+d1+' − '+n2+'/'+d2+' &nbsp;&nbsp; c) '+n1+'/'+d1+' × '+n2+'/'+d2+'');
    sol+='<div class="ex"><strong>1.</strong> a) '+frac(sumN2,d1*d2)+' &nbsp; b) '+frac(diffN2,d1*d2)+' &nbsp; c) '+frac(prodN,prodD)+'</div>';

    var negSets=[[1,2,1,4],[1,3,1,6],[2,3,1,3]];
    var ns=R.pick(negSets);
    var neg_sum=ns[0]*ns[3]-ns[2]*ns[1];
    ex+=_dinamicoRow(2,'Calcula:<br>a) −'+ns[0]+'/'+ns[1]+' + (−'+ns[2]+'/'+ns[3]+') &nbsp;&nbsp; b) −'+ns[0]+'/'+ns[1]+' − (−'+ns[2]+'/'+ns[3]+')');
    sol+='<div class="ex"><strong>2.</strong> a) '+frac(-(ns[0]*ns[3]+ns[2]*ns[1]),ns[1]*ns[3])+' &nbsp; b) '+frac(-ns[0]*ns[3]+ns[2]*ns[1],ns[1]*ns[3])+'</div>';

    ex+='<h2>Grupo 2 — Percentagens Avançadas</h2>';
    var price=R.pick([80,120,150,200,250,300]);
    var disc=R.pick([10,15,20,25,30]);
    var after=price*(1-disc/100);
    ex+=_dinamicoRow(3,'Um artigo custa '+price+' €. Há um desconto de '+disc+'%. Qual o preço final?');
    sol+='<div class="ex"><strong>3.</strong> '+price+' × (1 − '+disc+'/100) = '+price+' × '+(1-disc/100)+' = <strong>'+after+' €</strong></div>';

    var total=R.pick([500,800,1000,1200,2000]);
    var part=R.pick([100,150,200,250,400,600]);
    var pctResult=Math.round(part/total*100*10)/10;
    ex+=_dinamicoRow(4,'Num grupo de '+total+' alunos, '+part+' são do 7.º ano. Que percentagem representa?');
    sol+='<div class="ex"><strong>4.</strong> '+part+'/'+total+' × 100 = <strong>'+pctResult+'%</strong></div>';

    ex+='<h2>Grupo 3 — Potências e Notação Científica</h2>';
    var m1=R.int(1,9),e1=R.int(2,5),m2=R.int(1,9),e2=R.int(2,5);
    ex+=_dinamicoRow(5,'Calcula e escreve em notação científica:<br>'
      +'a) ('+m1+' × 10<sup>'+e1+'</sup>) × ('+m2+' × 10<sup>'+e2+'</sup>) &nbsp;&nbsp; b) Escreve '+R.pick([25000,340000,1500,72000])+' em notação científica');
    var prodM=m1*m2,prodE=e1+e2;
    var prodNorm=prodM>=10?prodM/10+'×10<sup>'+(prodE+1)+'</sup>':''+prodM+'×10<sup>'+prodE+'</sup>';
    sol+='<div class="ex"><strong>5.</strong> a) '+prodNorm+' &nbsp; b) (ver raciocínio: mover vírgula)</div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Operações Mistas com Racionais</h2>';
    var sets3=[[2,3,3,4,1,6],[1,2,2,3,3,4],[3,5,1,4,2,5]];
    var s3=R.pick(sets3);
    // (s3[0]/s3[1] + s3[2]/s3[3]) × s3[4]/s3[5]
    var numA=s3[0]*s3[3]+s3[2]*s3[1];
    var denA=s3[1]*s3[3];
    var numFinal=numA*s3[4], denFinal=denA*s3[5];
    ex+=_dinamicoRow(1,'Calcula (fração irredutível):<br>'
      +'a) ('+s3[0]+'/'+s3[1]+' + '+s3[2]+'/'+s3[3]+') × '+s3[4]+'/'+s3[5]+'<br>'
      +'b) −2/3 + (3/4 − 1/2) × 4/3');
    sol+='<div class="ex"><strong>1.</strong> a) '+frac(numFinal,denFinal)+' &nbsp; b) −2/3 + (1/4)×(4/3) = −2/3 + 1/3 = −1/3</div>';

    ex+='<h2>Grupo 2 — Percentagem: Variação e Problemas</h2>';
    var vi=R.pick([200,400,500,800,1000]), vf_pct=R.pick([10,15,20,25,30]);
    var vf=vi*(1+vf_pct/100);
    ex+=_dinamicoRow(2,'Uma ação de bolsa valorizou '+vf_pct+'% e passou a valer '+vf+' €. Qual era o valor inicial? (Confirma a tua resposta)');
    sol+='<div class="ex"><strong>2.</strong> Vi × 1,'+String(vf_pct).padStart(2,'0')+' = '+vf+' → Vi = '+vf+' ÷ '+(1+vf_pct/100)+' = <strong>'+vi+' €</strong>. Verif: '+vi+' × '+(1+vf_pct/100)+' = '+vf+' ✓</div>';

    ex+=_dinamicoRow(3,'Numa turma de '+R.pick([24,25,28,30])+' alunos, '+R.pick([40,50,60,75])+'% são raparigas. Quantas raparigas há? E quantos rapazes?');
    ex+='<h2>Grupo 3 — Potências: Regras e Notação</h2>';
    var b1=R.pick([2,3,5]),e_a=R.int(3,6),e_b=R.int(2,4);
    ex+=_dinamicoRow(4,'Simplifica: '+b1+'<sup>'+e_a+'</sup> × '+b1+'<sup>'+e_b+'</sup> ÷ '+b1+'<sup>'+(e_b-1)+'</sup> = _____');
    sol+='<div class="ex"><strong>4.</strong> '+b1+'<sup>'+(e_a+e_b-(e_b-1))+'</sup> = '+b1+'<sup>'+(e_a+1)+'</sup> = '+Math.pow(b1,e_a+1)+'</div>';

    var val=R.pick([3600000,48000000,0.00025,0.0000081]);
    ex+=_dinamicoRow(5,'Escreve em notação científica e indica a ordem de grandeza: '+val);
  }

  return {ex:ex, sol:sol};
}

// ── Cap 3 — Geometria ─────────────────────────────────────────────────────────
function _dinamico3(dif) {
  var R=_RND;
  var ex='', sol='';

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Ângulos Internos de Polígonos</h2>';
    var n1=R.pick([3,4,5,6]),n2=R.pick([7,8,9,10]);
    var s1=(n1-2)*180,s2=(n2-2)*180;
    ex+=_dinamicoRow(1,'Calcula a soma dos ângulos internos de:<br>a) Polígono com '+n1+' lados &nbsp;&nbsp; b) Polígono com '+n2+' lados');
    sol+='<div class="ex"><strong>1.</strong> a) ('+n1+'−2)×180° = '+s1+'° &nbsp; b) ('+n2+'−2)×180° = '+s2+'°</div>';

    var n3=R.pick([4,5,6,8]);
    var eachAngle=((n3-2)*180)/n3;
    ex+=_dinamicoRow(2,'Num polígono regular com '+n3+' lados, qual a amplitude de cada ângulo interno?');
    sol+='<div class="ex"><strong>2.</strong> ('+n3+'−2)×180°÷'+n3+' = '+eachAngle+'°</div>';

    ex+='<h2>Grupo 2 — Áreas Simples</h2>';
    var b=R.int(4,14),h=R.int(3,10);
    var b2=R.int(4,14),h2=R.int(3,10);
    var r=R.int(3,8);
    ex+=_dinamicoRow(3,'Calcula a área de:<br>'
      +'a) Retângulo: base = '+b+' cm, altura = '+h+' cm<br>'
      +'b) Triângulo: base = '+b2+' cm, altura = '+h2+' cm<br>'
      +'c) Círculo com raio = '+r+' cm (π ≈ 3,14)');
    sol+='<div class="ex"><strong>3.</strong> a) '+b+'×'+h+' = '+(b*h)+' cm² &nbsp; b) '+b2+'×'+h2+'÷2 = '+(b2*h2/2)+' cm² &nbsp; c) 3,14×'+r+'² = '+Math.round(3.14*r*r*100)/100+' cm²</div>';

    ex+='<h2>Grupo 3 — Ângulos em Retas Paralelas</h2>';
    var ang=R.pick([35,40,50,55,65,70,75,80]);
    var sup=180-ang,alt=ang,cor=ang,coin=sup;
    ex+=_dinamicoRow(4,'Duas retas paralelas são cortadas por uma secante. Um ângulo mede '+ang+'°. Indica:<br>'
      +'a) O ângulo alterno interno &nbsp;&nbsp; b) O ângulo co-interno &nbsp;&nbsp; c) O ângulo correspondente');
    sol+='<div class="ex"><strong>4.</strong> a) '+alt+'° (igual) &nbsp; b) '+coin+'° (suplementar: 180°−'+ang+'°) &nbsp; c) '+cor+'° (igual)</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Polígonos: Ângulos e Propriedades</h2>';
    var sumTarget=R.pick([720,900,1080,1260,1440,1620]);
    var nSides=sumTarget/180+2;
    ex+=_dinamicoRow(1,'Determina o número de lados de um polígono cuja soma dos ângulos internos é '+sumTarget+'°.');
    sol+='<div class="ex"><strong>1.</strong> (n−2)×180 = '+sumTarget+' → n−2 = '+(sumTarget/180)+' → <strong>n = '+nSides+'</strong></div>';

    var extAngle=R.pick([24,30,36,40,45,60]);
    var nExt=360/extAngle;
    ex+=_dinamicoRow(2,'Um polígono regular tem ângulo externo de '+extAngle+'°. Quantos lados tem? Como se classifica?');
    sol+='<div class="ex"><strong>2.</strong> n = 360°÷'+extAngle+'° = '+nExt+' lados.</div>';

    var angA=R.int(95,130);
    var angB=180-angA,angC=angA,angD=angB;
    ex+=_dinamicoRow(3,'Num paralelogramo [ABCD], o ângulo A mede '+angA+'°. Determina os ângulos B, C e D.');
    sol+='<div class="ex"><strong>3.</strong> B = 180°−'+angA+'° = '+angB+'°; C = '+angA+'° (oposto a A); D = '+angD+'°</div>';

    ex+='<h2>Grupo 2 — Áreas de Figuras Compostas</h2>';
    var b1=R.int(6,14),b2=R.int(3,b1-1),hT=R.int(4,10);
    var areaT=(b1+b2)/2*hT;
    var rl=R.int(5,12),rl2=R.int(4,10);
    var areaLos=rl*rl2/2;
    ex+=_dinamicoRow(4,'Calcula a área do trapézio com bases '+b1+' cm e '+b2+' cm, altura '+hT+' cm.');
    ex+=_dinamicoRow(5,'Calcula a área do losango com diagonais '+rl+' cm e '+rl2+' cm.');
    sol+='<div class="ex"><strong>4.</strong> ('+b1+'+'+b2+')÷2 × '+hT+' = '+areaT+' cm²<br><strong>5.</strong> '+rl+'×'+rl2+'÷2 = '+areaLos+' cm²</div>';

    var angPent=[];
    for(var i=0;i<4;i++) angPent.push(R.int(90,135));
    var sumPent=(5-2)*180;
    var fif=sumPent-angPent.reduce((a,b)=>a+b,0);
    ex+=_dinamicoRow(6,'Num pentágono, quatro dos ângulos internos medem '+angPent.join('°, ')+'°. Determina o quinto ângulo.');
    sol+='<div class="ex"><strong>6.</strong> Soma=(5−2)×180=540°. 5.º = 540−('+angPent.join('+')+') = <strong>'+fif+'°</strong></div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Problemas com Ângulos</h2>';
    var int1=R.int(80,140),int2=R.int(60,120),int3=R.int(70,130);
    var falta=360-int1-int2-int3;
    if(falta<30||falta>170){int1=100;int2=80;int3=95;falta=85;}
    ex+=_dinamicoRow(1,'Num quadrilátero, três ângulos internos medem '+int1+'°, '+int2+'° e '+int3+'°. Qual é o quarto ângulo?');
    sol+='<div class="ex"><strong>1.</strong> Soma quadrilátero = 360°. 4.º = 360−('+int1+'+'+int2+'+'+int3+') = <strong>'+falta+'°</strong></div>';

    var n_poly=R.int(7,15);
    var ext_each=Math.round(360/n_poly*10)/10;
    ex+=_dinamicoRow(2,'Um polígono regular tem '+n_poly+' lados. Calcula: a) a soma dos ângulos internos; b) cada ângulo interno; c) cada ângulo externo.');
    var sum_int=(n_poly-2)*180, each_int=Math.round(sum_int/n_poly*10)/10;
    sol+='<div class="ex"><strong>2.</strong> a) '+(n_poly-2)+'×180 = '+sum_int+'° &nbsp; b) '+sum_int+'÷'+n_poly+' = '+each_int+'° &nbsp; c) 360÷'+n_poly+' = '+ext_each+'°</div>';

    ex+='<h2>Grupo 2 — Áreas Compostas</h2>';
    var bRect=R.int(8,16),hRect=R.int(5,10);
    var rSemi=R.int(3,5);
    var areaRect=bRect*hRect;
    var areaSemi=Math.round(3.14*rSemi*rSemi/2*100)/100;
    var total=Math.round((areaRect+areaSemi)*100)/100;
    ex+=_dinamicoRow(3,'Uma figura é composta por um retângulo de '+bRect+' cm × '+hRect+' cm ao qual se une um semicírculo de raio '+rSemi+' cm (π≈3,14). Calcula a área total.');
    sol+='<div class="ex"><strong>3.</strong> Retângulo: '+areaRect+' cm². Semicírculo: π×'+rSemi+'²÷2 = '+areaSemi+' cm². Total = <strong>'+total+' cm²</strong></div>';

    var b_comp=R.int(10,20),h_comp=R.int(6,12),b_tri=b_comp,h_tri=R.int(4,8);
    var a_para=b_comp*h_comp, a_tri=b_tri*h_tri/2;
    ex+=_dinamicoRow(4,'Um paralelogramo de base '+b_comp+' cm e altura '+h_comp+' cm tem um triângulo (mesma base, altura '+h_tri+' cm) removido. Qual a área restante?');
    sol+='<div class="ex"><strong>4.</strong> Paralelogramo: '+a_para+' cm². Triângulo: '+a_tri+' cm². Resto = <strong>'+(a_para-a_tri)+' cm²</strong></div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 4 — Álgebra ───────────────────────────────────────────────────────────
function _dinamico4(dif) {
  var R=_RND;
  var ex='', sol='';

  if (dif==='facil') {
    ex+='<h2>Grupo 1 — Expressões Algébricas</h2>';
    var a_f=R.int(2,6),b_f=R.int(1,5),xv_f=R.int(1,5);
    var val_f=a_f*xv_f+b_f;
    ex+=_dinamicoRow(1,'a) Escreve a expressão algébrica para «o dobro de um número adicionado de '+b_f+'» &nbsp;&nbsp; b) Calcula o valor numérico de '+a_f+'x + '+b_f+' para x = '+xv_f);
    sol+='<div class="ex"><strong>1.</strong> a) 2x + '+b_f+' &nbsp; b) '+a_f+'×'+xv_f+' + '+b_f+' = '+val_f+'</div>';

    var a2_f=R.int(2,5),b2_f=R.int(1,4);
    ex+=_dinamicoRow(2,'Traduz para linguagem corrente: '+a2_f+'x + '+b2_f);
    sol+='<div class="ex"><strong>2.</strong> «A soma do '+(a2_f===2?'dobro':a2_f===3?'triplo':'quádruplo')+' de um número com '+b2_f+'»</div>';

    ex+='<h2>Grupo 2 — Simplificação</h2>';
    var a=R.int(2,8),b=R.int(2,8),c=R.int(1,5);
    ex+=_dinamicoRow(3,'Simplifica:<br>a) '+a+'x + '+b+'x = _____ &nbsp;&nbsp; b) '+a+'x − '+c+'x = _____ &nbsp;&nbsp; c) '+a+'x + '+b+'y − '+c+'x + y = _____');
    sol+='<div class="ex"><strong>3.</strong> a) '+(a+b)+'x &nbsp; b) '+(a-c)+'x &nbsp; c) '+(a-c)+'x + '+(b+1)+'y</div>';

    ex+='<h2>Grupo 3 — Equações Simples</h2>';
    var coef=R.int(2,6),result=R.int(6,30),x1=Math.round(result/coef);
    if(coef*x1!==result){coef=2;result=10;x1=5;}
    var add=R.int(1,8),res2=R.int(10,25),x2=res2-add;
    ex+=_dinamicoRow(4,'Resolve:<br>a) '+coef+'x = '+result+' &nbsp;&nbsp;&nbsp; b) x + '+add+' = '+res2);
    sol+='<div class="ex"><strong>4.</strong> a) x = '+result+'÷'+coef+' = <strong>'+x1+'</strong>. Verif: '+coef+'×'+x1+'='+result+' ✓ &nbsp; b) x = '+res2+'−'+add+' = <strong>'+x2+'</strong>. Verif: '+x2+'+'+add+'='+res2+' ✓</div>';

  } else if (dif==='medio') {
    ex+='<h2>Grupo 1 — Expressões Algébricas</h2>';
    var a0=R.int(2,6),b0=R.int(1,5),c0=R.int(2,6);
    ex+=_dinamicoRow(1,'Traduz por uma expressão algébrica:<br>'
      +'a) O triplo de um número x, diminuído de '+b0+' &nbsp;&nbsp; b) A soma de '+a0+' com o dobro de y &nbsp;&nbsp; c) O quociente de n por '+c0+', aumentado de '+b0);
    sol+='<div class="ex"><strong>1.</strong> a) 3x − '+b0+' &nbsp; b) '+a0+' + 2y &nbsp; c) n÷'+c0+' + '+b0+'</div>';

    ex+='<h2>Grupo 2 — Expressões Algébricas</h2>';
    var a=R.int(2,6),b=R.int(1,5),c=R.int(2,6),d=R.int(1,5);
    ex+=_dinamicoRow(2,'Simplifica: ('+a+'x² − '+b+'x + 3) + ('+c+'x² + '+d+'x − 1)');
    sol+='<div class="ex"><strong>2.</strong> '+(a+c)+'x² + '+(-b+d)+'x + 2</div>';

    var xVal=R.neg(2,4),yVal=R.neg(2,4);
    ex+=_dinamicoRow(3,'Para x = '+xVal+' e y = '+yVal+', calcula o valor numérico de: '+a+'x − '+b+'y + '+c);
    sol+='<div class="ex"><strong>3.</strong> '+a+'×('+xVal+') − '+b+'×('+yVal+') + '+c+' = '+(a*xVal - b*yVal + c)+'</div>';

    ex+='<h2>Grupo 3 — Equações do 1.º Grau</h2>';
    var coef1=R.int(2,5),add1=R.int(2,8),result1=R.int(10,25);
    var x_eq1=(result1-add1)/coef1;
    if(!Number.isInteger(x_eq1)){coef1=3;add1=5;result1=14;x_eq1=3;}
    ex+=_dinamicoRow(4,'Resolve:<br>a) '+coef1+'x + '+add1+' = '+result1+' &nbsp;&nbsp;&nbsp; b) '+coef1+'x − '+add1+' = '+result1);
    var x_eq1b=(result1+add1)/coef1;
    sol+='<div class="ex"><strong>4.</strong> a) x = ('+result1+'−'+add1+')÷'+coef1+' = <strong>'+(result1-add1)/coef1+'</strong> &nbsp; b) x = ('+result1+'+'+add1+')÷'+coef1+' = <strong>'+x_eq1b+'</strong></div>';

    var c2=R.int(2,4),v2=R.int(3,8),add2=R.int(1,5);
    var rhs2=c2*v2+add2;
    ex+=_dinamicoRow(5,'Resolve a equação e verifica: '+c2+'(x + '+add2+') = '+rhs2);
    sol+='<div class="ex"><strong>5.</strong> '+c2+'x + '+(c2*add2)+' = '+rhs2+' → '+c2+'x = '+(rhs2-c2*add2)+' → x = <strong>'+v2+'</strong>. Verif: '+c2+'×('+v2+'+'+add2+') = '+c2*(v2+add2)+' = '+rhs2+' ✓</div>';

  } else { // difícil
    ex+='<h2>Grupo 1 — Expressões e Monómios</h2>';
    var a1=R.int(2,5),b1=R.int(1,4),c1=R.int(2,5),d1=R.int(1,4);
    ex+=_dinamicoRow(1,'Simplifica as expressões:<br>'
      +'a) '+a1+'x² + '+b1+'x − '+(a1-1)+'x² + '+d1+'x &nbsp;&nbsp; b) '+c1+'(2x − '+b1+') − '+a1+'x &nbsp;&nbsp; c) Identifica os monómios, coeficientes e partes literais em: '+a1+'x²y − '+c1+'xy + '+b1);
    var simpA=(a1-(a1-1)),simpAx=(b1+d1);
    var simpB=(2*c1-a1),simpBc=(c1*b1);
    sol+='<div class="ex"><strong>1.</strong> a) '+simpA+'x² + '+simpAx+'x &nbsp; b) '+simpB+'x − '+simpBc+' &nbsp; c) Monómios: '+a1+'x²y (coef. '+a1+', p.l. x²y), −'+c1+'xy (coef. −'+c1+', p.l. xy), '+b1+' (coef. '+b1+', s/ p.l.)</div>';

    ex+='<h2>Grupo 2 — Equações com Frações e Parênteses</h2>';
    var sol2=R.int(2,8);
    var lhs_coef=R.int(2,4),rhs_add=R.int(5,15);
    var lhs_add=rhs_add-lhs_coef*sol2; // lhs_coef*x + lhs_add = rhs_add
    ex+=_dinamicoRow(2,'Resolve: '+lhs_coef+'x + ('+lhs_add+') = '+rhs_add+' &nbsp; (verifica a resposta)');
    sol+='<div class="ex"><strong>2.</strong> '+lhs_coef+'x = '+(rhs_add-lhs_add)+' → x = <strong>'+sol2+'</strong>. Verif: '+lhs_coef+'×'+sol2+'+'+lhs_add+' = '+rhs_add+' ✓</div>';

    var s3=R.int(1,6);
    var a3=R.int(2,5),b3=R.int(2,5);
    var rhs3=a3*s3-b3;
    ex+=_dinamicoRow(3,'Resolve: '+a3+'x − '+b3+' = '+rhs3);
    sol+='<div class="ex"><strong>3.</strong> '+a3+'x = '+(rhs3+b3)+' → x = <strong>'+s3+'</strong>.</div>';

    ex+=_dinamicoRow(4,'Resolve a equação de 1.º grau: 2(3x − 1) = 5x + 4');
    sol+='<div class="ex"><strong>4.</strong> 6x−2=5x+4 → x = <strong>6</strong>. Verif: 2×(18−1)=34; 5×6+4=34 ✓</div>';

    ex+='<h2>Grupo 3 — Problema com Equação</h2>';
    var total=R.int(30,60);
    var diff=R.int(4,12);
    var menor=(total-diff)/2;
    if(!Number.isInteger(menor)){total=40;diff=10;menor=15;}
    var maior=menor+diff;
    ex+=_dinamicoRow(5,'A soma de dois números consecutivos (diferença de '+diff+') é '+total+'. Determina os dois números. Define uma variável e escreve a equação.');
    sol+='<div class="ex"><strong>5.</strong> Seja x o menor. x + (x+'+diff+') = '+total+' → 2x = '+(total-diff)+' → x = <strong>'+menor+'</strong>. Os números são <strong>'+menor+'</strong> e <strong>'+maior+'</strong>.</div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 5 — Sequências ───────────────────────────────────────────────────────
function _dinamico5(dif) {
  var R = _RND; var ex = '', sol = '';

  if (dif === 'facil') {
    ex+='<h2>Grupo 1 — Termo Geral</h2>';
    var a1=R.int(1,5),d1=R.int(2,6);
    var seq=[a1,a1+d1,a1+2*d1,a1+3*d1,a1+4*d1];
    ex+=_dinamicoRow(1,'Considera a sequência: '+seq.join(', ')+', …<br>a) Indica a razão da sequência &nbsp;&nbsp; b) Escreve o termo geral a<sub>n</sub> &nbsp;&nbsp; c) Calcula a<sub>10</sub>');
    var a10=a1+9*d1;
    sol+='<div class="ex"><strong>1.</strong> a) r = '+d1+' &nbsp; b) a<sub>n</sub> = '+a1+' + (n−1)×'+d1+' = '+d1+'n + '+(a1-d1)+' &nbsp; c) a<sub>10</sub> = '+a10+'</div>';

    var b1=R.int(2,8),bm=R.int(2,5);
    ex+=_dinamicoRow(2,'O termo geral de uma sequência é a<sub>n</sub> = '+bm+'n + '+b1+'. Calcula os primeiros 5 termos.');
    var t1=bm+b1,t2=2*bm+b1,t3=3*bm+b1,t4=4*bm+b1,t5=5*bm+b1;
    sol+='<div class="ex"><strong>2.</strong> '+t1+', '+t2+', '+t3+', '+t4+', '+t5+'</div>';

    ex+='<h2>Grupo 2 — Problemas</h2>';
    var sp=R.int(2,6);
    ex+=_dinamicoRow(3,'Uma formiga avança '+sp+' cm por segundo. Após n segundos, a distância é a<sub>n</sub> = '+sp+'n.<br>a) Que distância percorre em 8 segundos? &nbsp;&nbsp; b) Após quantos segundos percorreu '+(sp*15)+' cm?');
    sol+='<div class="ex"><strong>3.</strong> a) a<sub>8</sub> = '+sp+'×8 = '+(sp*8)+' cm &nbsp; b) '+sp+'n = '+(sp*15)+' → n = 15 segundos</div>';

  } else if (dif === 'medio') {
    ex+='<h2>Grupo 1 — Termo Geral e Razão</h2>';
    var a1=R.int(1,8),d1=R.int(-5,5);
    if(d1===0)d1=3;
    var seq=[a1,a1+d1,a1+2*d1,a1+3*d1,a1+4*d1];
    ex+=_dinamicoRow(1,'Sequência: '+seq.join(', ')+', …<br>a) Tipo (aritmética/geométrica) e razão &nbsp;&nbsp; b) Fórmula do termo geral &nbsp;&nbsp; c) a<sub>12</sub> = ?');
    var a12=a1+11*d1;
    sol+='<div class="ex"><strong>1.</strong> a) Aritmética, r = '+d1+' &nbsp; b) a<sub>n</sub> = '+a1+' + (n−1)×('+d1+') &nbsp; c) a<sub>12</sub> = '+a12+'</div>';

    ex+='<h2>Grupo 2 — Identificar o Termo Geral</h2>';
    var m=R.int(2,5),c=R.int(-3,3);
    var s2=[m+c,2*m+c,3*m+c,4*m+c,5*m+c];
    ex+=_dinamicoRow(2,'Escreve o termo geral da sequência: '+s2.join(', ')+', …');
    sol+='<div class="ex"><strong>2.</strong> a<sub>n</sub> = '+m+'n'+(c>=0?' + '+c:' − '+Math.abs(c))+'</div>';

    ex+='<h2>Grupo 3 — Problema</h2>';
    var h0=R.int(50,200),rate=R.int(5,20);
    ex+=_dinamicoRow(3,'Um balão sobe '+rate+' metros por minuto a partir de '+h0+' m de altitude.<br>a) Escreve o termo geral da sequência de altitudes &nbsp;&nbsp; b) Qual a altitude após 10 minutos?');
    sol+='<div class="ex"><strong>3.</strong> a) a<sub>n</sub> = '+h0+' + '+rate+'n &nbsp; b) a<sub>10</sub> = '+h0+' + '+(rate*10)+' = '+(h0+rate*10)+' m</div>';

  } else {
    ex+='<h2>Grupo 1 — Sequências Complexas</h2>';
    var a1=R.int(1,5),d1=R.int(2,8);
    ex+=_dinamicoRow(1,'Numa sequência aritmética, a<sub>3</sub> = '+(a1+2*d1)+' e a<sub>7</sub> = '+(a1+6*d1)+'.<br>a) Determina a razão e o 1.º termo &nbsp;&nbsp; b) Qual é o termo geral? &nbsp;&nbsp; c) Para que valor de n é a<sub>n</sub> = '+(a1+19*d1)+'?');
    sol+='<div class="ex"><strong>1.</strong> a) r = '+d1+'; a<sub>1</sub> = '+a1+' &nbsp; b) a<sub>n</sub> = '+a1+' + (n−1)×'+d1+' &nbsp; c) n = 20</div>';

    ex+='<h2>Grupo 2 — Soma de Termos</h2>';
    var n1=R.int(5,15),t1=R.int(1,5),r1=R.int(2,5);
    var an=t1+(n1-1)*r1;
    var soma=n1*(t1+an)/2;
    ex+=_dinamicoRow(2,'Calcula a soma dos primeiros '+n1+' termos da sequência aritmética com a<sub>1</sub> = '+t1+' e razão '+r1+'.');
    sol+='<div class="ex"><strong>2.</strong> a<sub>'+n1+'</sub> = '+t1+' + '+(n1-1)+'×'+r1+' = '+an+'. S<sub>'+n1+'</sub> = '+n1+'×('+t1+'+'+an+')/2 = <strong>'+soma+'</strong></div>';

    ex+='<h2>Grupo 3 — Problema Avançado</h2>';
    var total=R.int(30,60);
    ex+=_dinamicoRow(3,'Os primeiros n termos de uma sequência aritmética com a<sub>1</sub>=1 e r=2 somam '+total+'. Determina n.');
    sol+='<div class="ex"><strong>3.</strong> S<sub>n</sub> = n(1+2n−1)/2 = n² = '+total+'. n = √'+total+'. Verifica se n é inteiro.</div>';
  }

  return {ex:ex, sol:sol};
}

// ── Cap 6 — Funções ───────────────────────────────────────────────────────────
function _dinamico6(dif) {
  var R = _RND; var ex = '', sol = '';

  if (dif === 'facil') {
    ex += '<h2>Grupo 1 — Referencial Cartesiano</h2>';
    var x1=R.int(1,6),y1=R.int(1,6);
    ex += _dinamicoRow(1,'Representa no referencial os pontos A('+x1+', '+y1+'), B(−'+x1+', '+y1+') e C('+x1+', −'+y1+'). Indica o quadrante de cada ponto.');
    sol += '<div class="ex"><strong>1.</strong> A('+x1+', '+y1+'): 1.º Q &nbsp; B(−'+x1+', '+y1+'): 2.º Q &nbsp; C('+x1+', −'+y1+'): 4.º Q</div>';

    ex += '<h2>Grupo 2 — Conceito de Função</h2>';
    var k=R.int(2,5);
    ex += _dinamicoRow(2,'A função f é definida por f(x) = '+k+'x. Calcula f(0), f(1), f(3) e f(−2).');
    sol += '<div class="ex"><strong>2.</strong> f(0) = 0 &nbsp; f(1) = '+k+' &nbsp; f(3) = '+(3*k)+' &nbsp; f(\u22122) = '+(-2*k)+'</div>';

    ex += '<h2>Grupo 3 — Proporcionalidade Direta</h2>';
    var kp=R.int(2,6),xp=R.int(3,10);
    ex += _dinamicoRow(3,'Numa tabela: x = '+xp+', y = '+(kp*xp)+'. Confirma que y = kx e determina k. Depois calcula y para x = '+(xp+2)+'.');
    sol += '<div class="ex"><strong>3.</strong> k = '+(kp*xp)+'/'+xp+' = '+kp+' &nbsp; Para x = '+(xp+2)+': y = '+kp+'×'+(xp+2)+' = '+(kp*(xp+2))+'</div>';

  } else if (dif === 'medio') {
    ex += '<h2>Grupo 1 — Referencial e Simétricos</h2>';
    var a=R.int(1,5),b=R.int(1,5);
    ex += _dinamicoRow(1,'Dado o ponto P('+a+', '+b+'): a) Indica o seu simétrico em relação ao eixo Ox &nbsp;&nbsp; b) Em relação ao eixo Oy &nbsp;&nbsp; c) Em relação à origem O.');
    sol += '<div class="ex"><strong>1.</strong> a) ('+a+', −'+b+') &nbsp; b) (−'+a+', '+b+') &nbsp; c) (−'+a+', −'+b+')</div>';

    ex += '<h2>Grupo 2 — Gráfico de Função</h2>';
    var m=R.int(1,4),cb=R.int(-3,3);
    var y2=2*m+cb;
    ex += _dinamicoRow(2,'Traça o gráfico de f(x) = '+m+'x'+(cb>=0?' + '+cb:' − '+Math.abs(cb))+'. Indica a ordenada na origem e calcula f(2).');
    sol += '<div class="ex"><strong>2.</strong> Ordenada na origem: b = '+cb+'. f(2) = '+m+'×2'+(cb>=0?'+':'')+''+cb+' = '+y2+'</div>';

    ex += '<h2>Grupo 3 — Proporcionalidade Direta</h2>';
    var x3=R.int(4,9),y3=R.int(8,30);
    ex += _dinamicoRow(3,'O gráfico de y = kx passa pelo ponto ('+x3+', '+y3+'). Determina k e calcula y para x = '+(x3+3)+'.');
    sol += '<div class="ex"><strong>3.</strong> k = '+y3+'/'+x3+' = '+(y3/x3).toFixed(1)+'. Para x = '+(x3+3)+': y = '+(y3/x3*(x3+3)).toFixed(1)+'</div>';

  } else {
    ex += '<h2>Grupo 1 — Funções e Gráficos</h2>';
    var m=R.int(2,5),b=R.int(-4,4);
    ex += _dinamicoRow(1,'A função f(x) = '+m+'x'+(b>=0?' + '+b:' − '+Math.abs(b))+': a) É crescente ou decrescente? b) Calcula o zero da função. c) Qual é a ordenada na origem?');
    var zero = -b/m;
    sol += '<div class="ex"><strong>1.</strong> a) Crescente (m = '+m+' > 0). b) '+m+'x'+(b>=0?'+':'')+''+b+' = 0 → x = '+zero.toFixed(1)+' c) b = '+b+'</div>';

    ex += '<h2>Grupo 2 — Proporcionalidade e Contexto</h2>';
    var kc=R.int(3,8),xc=R.int(5,12);
    ex += _dinamicoRow(2,'Um táxi cobra '+kc+' €/km. a) Escreve a função custo y = f(x). b) Quanto custa uma viagem de '+xc+' km? c) Para que distância o custo é '+(kc*20)+' €?');
    sol += '<div class="ex"><strong>2.</strong> a) y = '+kc+'x &nbsp; b) y = '+kc+'×'+xc+' = '+(kc*xc)+' € &nbsp; c) '+kc+'x = '+(kc*20)+' → x = 20 km</div>';

    ex += '<h2>Grupo 3 — Interseção de Retas</h2>';
    var m1=R.int(1,3),b1=R.int(1,4),m2=m1+R.int(1,2),b2=b1-R.int(1,3);
    ex += _dinamicoRow(3,'Determina o ponto de interseção de f₁(x) = '+m1+'x + '+b1+' e f₂(x) = '+m2+'x'+(b2>=0?' + '+b2:' − '+Math.abs(b2))+'.');
    var xi=(b1-b2)/(m2-m1), yi=m1*xi+b1;
    sol += '<div class="ex"><strong>3.</strong> '+m1+'x + '+b1+' = '+m2+'x'+(b2>=0?'+':'')+''+b2+' → x = '+xi.toFixed(1)+' → y = '+yi.toFixed(1)+'. Ponto: ('+xi.toFixed(1)+', '+yi.toFixed(1)+')</div>';
  }

  return { ex: ex, sol: sol };
}

// ── Cap 7 — Figuras Semelhantes ───────────────────────────────────────────────
function _dinamico7(dif) {
  var R = _RND; var ex = '', sol = '';

  if (dif === 'facil') {
    ex += '<h2>Grupo 1 — Razão de Semelhança e Lados</h2>';
    var k1 = R.int(2,4), l1 = R.int(3,9);
    var l1b = k1 * l1;
    ex += _dinamicoRow(1, 'Duas figuras são semelhantes com razão de semelhança k = '+k1+'.<br>a) Um lado da figura menor mede '+l1+' cm. Qual é o lado correspondente na figura maior?<br>b) Se outro lado da figura maior mede '+l1b+' cm, qual é o lado correspondente na menor?');
    sol += '<div class="ex"><strong>1.</strong> a) '+l1+' × '+k1+' = <strong>'+(k1*l1)+' cm</strong> &nbsp; b) '+l1b+' ÷ '+k1+' = <strong>'+l1+' cm</strong></div>';

    ex += '<h2>Grupo 2 — Perímetros de Figuras Semelhantes</h2>';
    var k2 = R.int(2,4), p2 = R.int(12,24);
    ex += _dinamicoRow(2, 'Duas figuras semelhantes têm razão de semelhança k = '+k2+'. O perímetro da figura menor é '+p2+' cm.<br>a) Qual é o perímetro da figura maior?<br>b) Qual é a razão entre os perímetros?');
    sol += '<div class="ex"><strong>2.</strong> a) '+p2+' × '+k2+' = <strong>'+(p2*k2)+' cm</strong> &nbsp; b) A razão entre os perímetros é igual a k = '+k2+'</div>';

    ex += '<h2>Grupo 3 — Relação de Euler (Poliedros)</h2>';
    var solidos = [{n:'Cubo',V:8,A:12,F:6},{n:'Tetraedro',V:4,A:6,F:4},{n:'Octaedro',V:6,A:12,F:8}];
    var s = solidos[R.int(0,2)];
    ex += _dinamicoRow(3, 'Um '+s.n+' tem '+s.V+' vértices e '+s.A+' arestas. Usando a Relação de Euler (V − A + F = 2), determina o número de faces.');
    sol += '<div class="ex"><strong>3.</strong> '+s.V+' − '+s.A+' + F = 2 → F = 2 + '+s.A+' − '+s.V+' = <strong>'+s.F+'</strong></div>';

  } else if (dif === 'medio') {
    ex += '<h2>Grupo 1 — Triângulos Semelhantes</h2>';
    var k1 = R.int(2,4), a1 = R.int(3,7), b1 = R.int(4,9), c1 = R.int(5,11);
    ex += _dinamicoRow(1, 'Os triângulos ABC e DEF são semelhantes com razão k = '+k1+'. Sabe-se que AB = '+a1+' cm, BC = '+b1+' cm e CA = '+c1+' cm.<br>a) Calcula DE, EF e FD. &nbsp; b) Qual é o perímetro de DEF?');
    var de = a1*k1, ef = b1*k1, fd = c1*k1, pDef = (a1+b1+c1)*k1;
    sol += '<div class="ex"><strong>1.</strong> a) DE = '+de+' cm &nbsp; EF = '+ef+' cm &nbsp; FD = '+fd+' cm<br>b) Perímetro = '+(a1+b1+c1)+' × '+k1+' = <strong>'+pDef+' cm</strong></div>';

    ex += '<h2>Grupo 2 — Áreas de Figuras Semelhantes</h2>';
    var k2 = R.int(2,4), area2 = R.int(6,20);
    var areaG = area2 * k2 * k2;
    ex += _dinamicoRow(2, 'Duas figuras semelhantes têm razão k = '+k2+'. A área da figura menor é '+area2+' cm².<br>a) Qual é a razão entre as áreas?<br>b) Qual é a área da figura maior?');
    sol += '<div class="ex"><strong>2.</strong> a) Razão das áreas = k² = '+k2+'² = <strong>'+(k2*k2)+'</strong><br>b) Área maior = '+area2+' × '+(k2*k2)+' = <strong>'+areaG+' cm²</strong></div>';

    ex += '<h2>Grupo 3 — Homotetia</h2>';
    var hk = R.int(2,4), hx = R.int(1,5), hy = R.int(1,5);
    ex += _dinamicoRow(3, 'Uma homotetia de centro na origem O e razão k = '+hk+' transforma o ponto A('+hx+', '+hy+') em A\'.<br>a) Quais são as coordenadas de A\'?<br>b) Se BC = '+hx+' cm, qual é B\'C\'?');
    sol += '<div class="ex"><strong>3.</strong> a) A\' = ('+hk+'×'+hx+', '+hk+'×'+hy+') = <strong>('+hk*hx+', '+hk*hy+')</strong><br>b) B\'C\' = '+hk+' × '+hx+' = <strong>'+(hk*hx)+' cm</strong></div>';

  } else {
    ex += '<h2>Grupo 1 — Critérios de Semelhança de Triângulos</h2>';
    var k1 = R.int(2,4), a1 = R.int(3,6), b1 = R.int(4,8), c1 = R.int(5,10);
    var a2 = a1*k1, b2 = b1*k1, c2 = c1*k1;
    ex += _dinamicoRow(1, 'Um triângulo tem lados '+a1+', '+b1+', '+c1+' cm. Outro tem lados '+a2+', '+b2+', '+c2+' cm.<br>a) Verifica que são semelhantes e indica o critério.<br>b) Determina k.<br>c) Qual a razão entre as áreas?');
    sol += '<div class="ex"><strong>1.</strong> a) '+a2+'/'+a1+' = '+b2+'/'+b1+' = '+c2+'/'+c1+' = '+k1+' → Semelhantes pelo critério LLL<br>b) k = '+k1+'<br>c) Razão das áreas = k² = <strong>'+(k1*k1)+'</strong></div>';

    ex += '<h2>Grupo 2 — Área e Perímetro a Partir das Áreas</h2>';
    var a2s = R.int(4,16), b2s = a2s * R.int(4,9);
    var sqrtRatio = Math.round(Math.sqrt(b2s/a2s)*10)/10;
    var pMenor = R.int(12,24);
    ex += _dinamicoRow(2, 'Duas figuras semelhantes têm áreas '+a2s+' cm² e '+b2s+' cm². O perímetro da menor é '+pMenor+' cm.<br>a) Determina k (razão de semelhança).<br>b) Calcula o perímetro da maior.');
    var kExact = Math.sqrt(b2s/a2s);
    var pMaior = Math.round(pMenor * kExact * 10) / 10;
    sol += '<div class="ex"><strong>2.</strong> a) k² = '+b2s+'/'+a2s+' = '+(b2s/a2s).toFixed(2)+' → k = √'+(b2s/a2s).toFixed(2)+' ≈ <strong>'+sqrtRatio+'</strong><br>b) Perímetro maior = '+pMenor+' × '+sqrtRatio+' ≈ <strong>'+pMaior+' cm</strong></div>';

    ex += '<h2>Grupo 3 — Relação de Euler e Poliedros Regulares</h2>';
    var V3 = R.int(8,20), F3 = R.int(5,14), A3 = V3 + F3 - 2;
    ex += _dinamicoRow(3, 'Um poliedro convexo tem '+V3+' vértices e '+F3+' faces.<br>a) Usa a Relação de Euler para calcular o número de arestas.<br>b) Verifica: V − A + F = 2.');
    sol += '<div class="ex"><strong>3.</strong> a) V − A + F = 2 → '+V3+' − A + '+F3+' = 2 → A = '+V3+' + '+F3+' − 2 = <strong>'+A3+'</strong><br>b) '+V3+' − '+A3+' + '+F3+' = '+(V3-A3+F3)+' ✓</div>';
  }

  return { ex: ex, sol: sol };
}

// ── Cap 8 — Dados e Probabilidades ────────────────────────────────────────────
function _dinamico8(dif) {
  var R = _RND; var ex = '', sol = '';

  if (dif === 'facil') {
    ex += '<h2>Grupo 1 — Frequências Absoluta e Relativa</h2>';
    var n1 = R.int(20, 40), fa1 = R.int(4, Math.floor(n1/3));
    var frPct1 = Math.round(fa1/n1*1000)/10;
    ex += _dinamicoRow(1, 'Numa turma de '+n1+' alunos, '+fa1+' vêm de bicicleta.<br>a) Qual é a frequência absoluta de "bicicleta"?<br>b) Qual é a frequência relativa (em percentagem)?<br>c) Quantos alunos NÃO vêm de bicicleta?');
    sol += '<div class="ex"><strong>1.</strong> a) f = <strong>'+fa1+'</strong><br>b) fr = '+fa1+'/'+n1+' = <strong>'+frPct1+'%</strong><br>c) '+n1+' − '+fa1+' = <strong>'+(n1-fa1)+'</strong> alunos</div>';

    ex += '<h2>Grupo 2 — Média e Mediana</h2>';
    var d2 = [R.int(3,7), R.int(8,12), R.int(10,15), R.int(14,18), R.int(16,20)];
    d2.sort(function(a,b){return a-b;});
    var soma2 = d2.reduce(function(s,v){return s+v;},0);
    var med2 = d2[2];
    var media2 = Math.round(soma2/5*10)/10;
    ex += _dinamicoRow(2, 'As notas de '+d2.length+' testes foram: '+d2.join(', ')+'.<br>a) Ordena os valores por ordem crescente.<br>b) Calcula a mediana.<br>c) Calcula a média.');
    sol += '<div class="ex"><strong>2.</strong> a) '+d2.join(', ')+' (já ordenados)<br>b) Mediana = '+d2.length+'.º/2 arred. = valor central = <strong>'+med2+'</strong><br>c) Média = ('+d2.join('+')+') ÷ 5 = '+soma2+' ÷ 5 = <strong>'+media2+'</strong></div>';

    ex += '<h2>Grupo 3 — Probabilidade Simples</h2>';
    var tot3 = R.int(6,15), verm3 = R.int(1,Math.floor(tot3/2));
    var azul3 = R.int(1, tot3-verm3-1), verde3 = tot3-verm3-azul3;
    ex += _dinamicoRow(3, 'Uma urna tem '+tot3+' bolas: '+verm3+' vermelhas, '+azul3+' azuis e '+verde3+' verdes. Retira-se uma bola ao acaso.<br>a) Qual é a probabilidade de sair vermelha?<br>b) Qual é a probabilidade de NÃO sair vermelha?');
    sol += '<div class="ex"><strong>3.</strong> a) P(vermelha) = '+verm3+'/'+tot3+' = <strong>'+(Math.round(verm3/tot3*1000)/10)+'%</strong><br>b) P(não vermelha) = 1 − '+verm3+'/'+tot3+' = <strong>'+(tot3-verm3)+'/'+tot3+'</strong></div>';

  } else if (dif === 'medio') {
    ex += '<h2>Grupo 1 — Tabela de Frequências</h2>';
    var n1 = R.int(25,40);
    var fa1 = R.int(5, Math.floor(n1*0.3));
    var fa2 = R.int(5, Math.floor(n1*0.3));
    var fa3 = R.int(5, Math.floor(n1*0.3));
    var fa4 = n1 - fa1 - fa2 - fa3;
    if (fa4 < 1) { fa4 = 1; fa3 = n1 - fa1 - fa2 - fa4; }
    var fr1 = Math.round(fa1/n1*100), fr2 = Math.round(fa2/n1*100), fr3 = Math.round(fa3/n1*100), fr4 = 100-fr1-fr2-fr3;
    ex += _dinamicoRow(1, 'Numa turma de '+n1+' alunos, o meio de transporte usado é:<br>A pé: '+fa1+' alunos &nbsp; Autocarro: '+fa2+' &nbsp; Bicicleta: '+fa3+' &nbsp; Carro: '+fa4+'<br>a) Completa a frequência relativa (%) de cada categoria.<br>b) Qual é o meio mais usado? &nbsp; c) Soma total das frequências relativas.');
    sol += '<div class="ex"><strong>1.</strong> a) A pé: '+fr1+'% &nbsp; Autocarro: '+fr2+'% &nbsp; Bicicleta: '+fr3+'% &nbsp; Carro: '+fr4+'%<br>b) Meio mais usado: <strong>'+(fa1>=fa2&&fa1>=fa3&&fa1>=fa4?'A pé':fa2>=fa3&&fa2>=fa4?'Autocarro':fa3>=fa4?'Bicicleta':'Carro')+'</strong><br>c) '+fr1+'+'+fr2+'+'+fr3+'+'+fr4+' = <strong>100%</strong></div>';

    ex += '<h2>Grupo 2 — Mediana com n Par e Média</h2>';
    var d2 = [R.int(3,6), R.int(6,9), R.int(9,12), R.int(12,15), R.int(13,17), R.int(16,20)];
    d2.sort(function(a,b){return a-b;});
    var soma2 = d2.reduce(function(s,v){return s+v;},0);
    var med2 = Math.round((d2[2]+d2[3])/2*10)/10;
    var media2 = Math.round(soma2/6*10)/10;
    ex += _dinamicoRow(2, 'Os resultados de 6 alunos num teste foram: '+d2.join(', ')+'.<br>a) Ordena os valores.<br>b) Calcula a mediana (n=6, par).<br>c) Calcula a média.');
    sol += '<div class="ex"><strong>2.</strong> a) '+d2.join(', ')+' (já ordenados)<br>b) Mediana = ('+d2[2]+' + '+d2[3]+') ÷ 2 = <strong>'+med2+'</strong><br>c) Média = '+soma2+' ÷ 6 = <strong>'+media2+'</strong></div>';

    ex += '<h2>Grupo 3 — Probabilidade com Condição</h2>';
    var tot3 = R.int(10,20), bB3 = R.int(3,7), bP3 = R.int(2,6);
    var bV3 = tot3 - bB3 - bP3;
    if (bV3 < 1) { bV3 = 1; bP3 = tot3 - bB3 - bV3; }
    ex += _dinamicoRow(3, 'Um saco tem '+tot3+' bolas: '+bB3+' brancas, '+bP3+' pretas e '+bV3+' verdes.<br>a) P(branca) = ? &nbsp; b) P(preta ou verde) = ? &nbsp; c) São equiprováveis branca e preta?');
    sol += '<div class="ex"><strong>3.</strong> a) P(branca) = '+bB3+'/'+tot3+' = <strong>'+(Math.round(bB3/tot3*100))+'%</strong><br>b) P(preta ou verde) = ('+bP3+'+'+bV3+')/'+tot3+' = <strong>'+(bP3+bV3)+'/'+tot3+'</strong><br>c) <strong>'+(bB3===bP3?'Sim, P(branca) = P(preta)':'Não — '+bB3+'/'+tot3+' ≠ '+bP3+'/'+tot3)+'</strong></div>';

  } else {
    ex += '<h2>Grupo 1 — Frequências e Gráfico Circular</h2>';
    var cats = ['Futebol','Basquetebol','Natação','Atletismo'];
    var n1 = R.int(30,50);
    var f1 = R.int(8,15), f2 = R.int(6,12), f3 = R.int(5,10);
    var f4 = n1 - f1 - f2 - f3;
    if (f4 < 2) { f4 = 2; f3 = n1-f1-f2-f4; }
    var ang1 = Math.round(f1/n1*360), ang2 = Math.round(f2/n1*360), ang3 = Math.round(f3/n1*360), ang4 = 360-ang1-ang2-ang3;
    ex += _dinamicoRow(1, 'Num inquérito a '+n1+' alunos sobre desporto favorito:<br>'+cats[0]+': '+f1+' &nbsp; '+cats[1]+': '+f2+' &nbsp; '+cats[2]+': '+f3+' &nbsp; '+cats[3]+': '+f4+'<br>a) Calcula a frequência relativa (%) de cada desporto.<br>b) Calcula o ângulo central de cada setor num gráfico circular.<br>c) Qual é a moda?');
    sol += '<div class="ex"><strong>1.</strong> a) '+cats[0]+': '+Math.round(f1/n1*100)+'% &nbsp; '+cats[1]+': '+Math.round(f2/n1*100)+'% &nbsp; '+cats[2]+': '+Math.round(f3/n1*100)+'% &nbsp; '+cats[3]+': '+Math.round(f4/n1*100)+'%<br>b) Ângulos: '+ang1+'° &nbsp; '+ang2+'° &nbsp; '+ang3+'° &nbsp; '+ang4+'°<br>c) Moda: <strong>'+(f1>=f2&&f1>=f3&&f1>=f4?cats[0]:f2>=f3&&f2>=f4?cats[1]:f3>=f4?cats[2]:cats[3])+'</strong></div>';

    ex += '<h2>Grupo 2 — Diagrama Caule-e-Folhas e Mediana</h2>';
    var c3 = R.int(3,5), c4 = R.int(4,6);
    var folhas3 = [], folhas4 = [];
    for (var i=0; i<c3; i++) folhas3.push(R.int(0,9));
    for (var i=0; i<c4; i++) folhas4.push(R.int(0,9));
    folhas3.sort(function(a,b){return a-b;});
    folhas4.sort(function(a,b){return a-b;});
    var todos = folhas3.map(function(f){return 30+f;}).concat(folhas4.map(function(f){return 40+f;}));
    todos.sort(function(a,b){return a-b;});
    var nT = todos.length;
    var med2 = nT%2===1 ? todos[Math.floor(nT/2)] : Math.round((todos[nT/2-1]+todos[nT/2])/2*10)/10;
    var soma2 = todos.reduce(function(s,v){return s+v;},0);
    ex += _dinamicoRow(2, 'O diagrama caule-e-folhas mostra as idades de '+nT+' participantes:<br>Caule 3 | Folhas: '+folhas3.join(' ')+' (representa 3'+folhas3[0]+', 3'+folhas3[1]+', …)<br>Caule 4 | Folhas: '+folhas4.join(' ')+'<br>a) Lista todos os valores por ordem crescente.<br>b) Calcula a mediana.<br>c) Calcula a média.');
    sol += '<div class="ex"><strong>2.</strong> a) '+todos.join(', ')+' ('+nT+' valores)<br>b) Mediana'+(nT%2===1?' = '+nT+'.º valor':'=('+nT/2+'.º+'+((nT/2)+1)+'.º)/2')+' = <strong>'+med2+'</strong><br>c) Média = '+soma2+'/'+nT+' = <strong>'+(Math.round(soma2/nT*10)/10)+'</strong></div>';

    ex += '<h2>Grupo 3 — Probabilidade em Experiências Compostas</h2>';
    var nr = R.int(2,4), nb = R.int(2,4);
    var tot3 = nr + nb;
    ex += _dinamicoRow(3, 'Um saco tem '+nr+' bolas vermelhas e '+nb+' azuis ('+tot3+' no total). Retiram-se 2 bolas successivamente SEM reposição.<br>a) P(1.ª vermelha)?<br>b) P(2.ª azul | 1.ª vermelha)?<br>c) P(1.ª vermelha E 2.ª azul)?');
    var pA = nr+'/'+tot3;
    var pB = nb+'/'+(tot3-1);
    var pAeB_num = nr*nb, pAeB_den = tot3*(tot3-1);
    var g = function(a,b){return b===0?a:g(b,a%b);}; var gc = g(pAeB_num,pAeB_den);
    sol += '<div class="ex"><strong>3.</strong> a) P(vermelha) = <strong>'+pA+'</strong><br>b) P(azul | vermelha) = <strong>'+pB+'</strong> (restam '+(tot3-1)+' bolas, '+nb+' azuis)<br>c) P(V e A) = '+pA+' × '+pB+' = '+(pAeB_num)+'/'+(pAeB_den)+' = <strong>'+(pAeB_num/gc)+'/'+(pAeB_den/gc)+'</strong></div>';
  }

  return { ex: ex, sol: sol };
}

// ── Dispatch helper for _dinamicoN ───────────────────────────────────────────
function _dinamico(cap, dif) {
  var fns = { 1: _dinamico1, 2: _dinamico2, 3: _dinamico3, 4: _dinamico4, 5: _dinamico5, 6: _dinamico6, 7: _dinamico7, 8: _dinamico8 };
  return fns[cap] ? fns[cap](dif) : { ex: '', sol: '' };
}

// GERADORES POR SUBTEMA — cap1..4

function _gfSubtema1(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles = {1:'Conjunto ℤ — Representação',2:'Valor Absoluto e Simétrico',3:'Adição de Inteiros',4:'Subtração de Inteiros',5:'Parênteses e Expressões',6:'Propriedades da Adição'};
  ex += '<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  // Ranges by difficulty
  var lo = dif==='facil'?2:dif==='dificil'?10:5;
  var hi = dif==='facil'?8:dif==='dificil'?25:15;
  for (var i=1;i<=n;i++) {
    var a=R.int(lo,hi), b=R.int(lo,hi), c=R.int(1,hi/2);
    if (st===1) {
      var t=R.int(2,12), p=R.int(1,6), luc=R.int(50,500), prof=R.int(10,80);
      if (dif==='facil') {
        ex+=row(i,'Representa com um inteiro: &nbsp; a) Descida de '+t+'°C = _____ &nbsp;&nbsp; b) Subida de '+t+'°C = _____ &nbsp;&nbsp; c) '+p+'.º andar subterrâneo = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) −'+t+' &nbsp; b) +'+t+' &nbsp; c) −'+p+'</div>';
      } else if (dif==='medio') {
        ex+=row(i,'Representa com um inteiro: &nbsp; a) Descida de '+t+'°C &nbsp; b) '+p+'.º andar subterrâneo &nbsp; c) Lucro de '+luc+' € &nbsp; d) Profundidade de '+prof+' m');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) −'+t+' &nbsp; b) −'+p+' &nbsp; c) +'+luc+' &nbsp; d) −'+prof+'</div>';
      } else {
        ex+=row(i,'a) Ordena do menor para o maior: −'+a+', +'+b+', 0, −'+c+', +'+c+'&nbsp;&nbsp; b) Indica o inteiro que está a 3 unidades à direita de −'+a+' na reta numérica&nbsp;&nbsp; c) Qual o maior inteiro negativo?');
        var arr=[{v:-a,s:'−'+a},{v:b,s:'+'+b},{v:0,s:'0'},{v:-c,s:'−'+c},{v:c,s:'+'+c}];
        arr.sort(function(x,y){return x.v-y.v;});
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+arr.map(function(x){return x.s;}).join(' &lt; ')+'&nbsp; b) '+(3-a)+'&nbsp; c) −1</div>';
      }
    } else if (st===2) {
      if (dif==='facil') {
        ex+=row(i,'Calcula: &nbsp; a) |−'+a+'| = _____ &nbsp; b) |+'+b+'| = _____ &nbsp; c) Simétrico de −'+a+' = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+a+' &nbsp; b) '+b+' &nbsp; c) +'+a+'</div>';
      } else if (dif==='medio') {
        ex+=row(i,'Calcula: &nbsp; a) |−'+a+'| = _____ &nbsp; b) Simétrico de −'+a+' = _____ &nbsp; c) Simétrico de +'+b+' = _____ &nbsp; d) |−'+b+'| − |+'+a+'| = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+a+' &nbsp; b) +'+a+' &nbsp; c) −'+b+' &nbsp; d) '+(b-a)+'</div>';
      } else {
        ex+=row(i,'a) |−'+a+'| + |−'+b+'| = _____&nbsp;&nbsp; b) |'+a+' − '+b+'| = _____&nbsp;&nbsp; c) Verdadeiro ou Falso: |−'+a+'| = |+'+a+'|? _____ &nbsp;&nbsp; d) Dois inteiros simétricos têm sempre o mesmo valor absoluto?');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(a+b)+' &nbsp; b) '+Math.abs(a-b)+' &nbsp; c) Verdadeiro &nbsp; d) Sim, |x| = |−x|</div>';
      }
    } else if (st===3) {
      if (dif==='facil') {
        ex+=row(i,'Calcula: &nbsp; a) (+'+a+') + (+'+b+') = _____ &nbsp; b) (−'+a+') + (−'+b+') = _____ &nbsp; c) 0 + (−'+a+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) +'+(a+b)+' &nbsp; b) −'+(a+b)+' &nbsp; c) −'+a+'</div>';
      } else if (dif==='medio') {
        ex+=row(i,'Calcula: &nbsp; a) (−'+a+') + (+'+b+') = _____ &nbsp; b) (−'+a+') + (−'+b+') = _____ &nbsp; c) (+'+a+') + (−'+b+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(b-a)+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+(a-b)+'</div>';
      } else {
        var d=R.int(lo,hi);
        ex+=row(i,'Calcula: &nbsp; a) (−'+a+') + (+'+b+') + (−'+c+') = _____&nbsp;&nbsp; b) (+'+a+') + (−'+b+') + (+'+c+') + (−'+d+') = _____&nbsp;&nbsp; c) Qual o valor de x: x + (−'+a+') = '+b+'?');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(b-a-c)+' &nbsp; b) '+(a-b+c-d)+' &nbsp; c) x = '+(a+b)+'</div>';
      }
    } else if (st===4) {
      if (dif==='facil') {
        ex+=row(i,'Transforma em adição e calcula: &nbsp; a) (+'+a+') − (+'+b+') = _____ &nbsp; b) (−'+a+') − (−'+b+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) (+'+a+')+(−'+b+') = '+(a-b)+' &nbsp; b) (−'+a+')+(+'+b+') = '+(b-a)+'</div>';
      } else if (dif==='medio') {
        ex+=row(i,'Calcula: &nbsp; a) (+'+a+') − (−'+b+') = _____ &nbsp; b) (−'+a+') − (+'+b+') = _____ &nbsp; c) (−'+a+') − (−'+b+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(a+b)+' &nbsp; b) '+(-(a+b))+' &nbsp; c) '+(b-a)+'</div>';
      } else {
        ex+=row(i,'Calcula: &nbsp; a) '+a+' − (+'+b+') − (−'+c+') = _____&nbsp;&nbsp; b) (−'+a+') − (−'+b+') − (+'+c+') = _____&nbsp;&nbsp; c) Qual o valor de x: x − (−'+b+') = '+a+'?');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(a-b+c)+' &nbsp; b) '+(b-a-c)+' &nbsp; c) x = '+(a-b)+'</div>';
      }
    } else if (st===5) {
      if (dif==='facil') {
        ex+=row(i,'Remove os parênteses: &nbsp; a) +(+'+a+') = _____ &nbsp; b) +(−'+a+') = _____ &nbsp; c) −(+'+b+') = _____ &nbsp; d) −(−'+b+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) +'+a+' &nbsp; b) −'+a+' &nbsp; c) −'+b+' &nbsp; d) +'+b+'</div>';
      } else if (dif==='medio') {
        ex+=row(i,'Remove parênteses e calcula: &nbsp; a) −('+a+' − '+b+') = _____ &nbsp; b) +(−'+a+' + '+b+') = _____ &nbsp; c) '+a+' − ('+b+' − '+c+') = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(b-a)+' &nbsp; b) '+(b-a)+' &nbsp; c) '+(a-b+c)+'</div>';
      } else {
        ex+=row(i,'Calcula: &nbsp; a) −(−'+a+' + '+b+') − ('+c+' − '+a+') = _____&nbsp;&nbsp; b) '+a+' − ['+b+' − ('+c+' − '+a+')] = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+(a-b-c+a)+' &nbsp; b) '+(a-b+c-a)+'</div>';
      }
    } else if (st===6) {
      var sA6=Math.random()<0.5?a:-a, sB6=Math.random()<0.5?b:-b;
      if (dif==='facil') {
        ex+=row(i,'Indica a propriedade usada:<br>a) ('+sA6+') + ('+sB6+') = ('+sB6+') + ('+sA6+')&nbsp; [_____]&nbsp;&nbsp; b) ('+a+') + 0 = '+a+'&nbsp; [_____]');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) Comutativa &nbsp; b) Elemento neutro</div>';
      } else {
        ex+=row(i,'Identifica a propriedade:<br>a) ('+sA6+') + ('+sB6+') = ('+sB6+') + ('+sA6+')&nbsp; [_____]<br>b) ('+a+') + 0 = '+a+'&nbsp; [_____]<br>c) ('+a+') + (−'+a+') = 0&nbsp; [_____]<br>d) ('+a+' + '+b+') + '+c+' = '+a+' + ('+b+' + '+c+')&nbsp; [_____]');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) Comutativa &nbsp; b) Elemento neutro &nbsp; c) Elemento simétrico &nbsp; d) Associativa</div>';
      }
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema2(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  function gcd(a,b){ return b===0?Math.abs(a):gcd(b,a%b); }
  function frac(a,b){ if(!b)return '?'; var g=gcd(Math.abs(a),Math.abs(b)); var sn=a/g,sd=b/g; if(sd<0){sn=-sn;sd=-sd;} return sd===1?''+sn:sn+'/'+sd; }
  var titles={1:'Comparação e Ordenação',2:'Adição e Subtração de Frações',3:'Percentagens',4:'Potências',5:'Notação Científica'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      var pairs=[[1,2,1,3],[3,4,2,3],[1,4,3,8],[2,5,1,3]];
      var p=R.pick(pairs); var v1=p[0]/p[1],v2=p[2]/p[3];
      var sym=v1>v2?'&gt;':v1<v2?'&lt;':'=';
      ex+=row(i,'Compara (usa &lt;, &gt; ou =): &nbsp; a) '+p[0]+'/'+p[1]+' ___ '+p[2]+'/'+p[3]+'&nbsp;&nbsp; b) −2/3 ___ −1/2&nbsp;&nbsp; c) Ordena: −3/4, 0, 1/2, −1/4');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+sym+'&nbsp; b) &lt;&nbsp; c) −3/4 &lt; −1/4 &lt; 0 &lt; 1/2</div>';
    } else if (st===2) {
      var sets=[[1,2,1,3],[2,3,1,4],[1,4,1,6],[3,4,1,2]];
      var s=R.pick(sets); var n1=s[0],d1=s[1],n2=s[2],d2=s[3];
      var sN=n1*d2+n2*d1, dN=n1*d2-n2*d1, den=d1*d2;
      ex+=row(i,'Calcula (irredutível): &nbsp; a) '+n1+'/'+d1+' + '+n2+'/'+d2+' = _____&nbsp;&nbsp; b) '+n1+'/'+d1+' − '+n2+'/'+d2+' = _____&nbsp;&nbsp; c) −'+n1+'/'+d1+' + (−'+n2+'/'+d2+') = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+frac(sN,den)+'&nbsp; b) '+frac(dN,den)+'&nbsp; c) '+frac(-sN,den)+'</div>';
    } else if (st===3) {
      var pct=R.pick([10,20,25,50,15,30]),amt=R.pick([40,80,120,200,60,300]);
      var res=pct/100*amt;
      var price=R.pick([80,120,200,250]),disc=R.pick([10,20,25,30]);
      var after=price*(1-disc/100);
      ex+=row(i,'a) Calcula '+pct+'% de '+amt+' = _____&nbsp;&nbsp; b) Artigo a '+price+' € com '+disc+'% de desconto → preço final = _____&nbsp;&nbsp; c) Converte 3/4 para percentagem = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+res+'</strong>&nbsp; b) <strong>'+after+' €</strong>&nbsp; c) <strong>75%</strong></div>';
    } else if (st===4) {
      var base=R.pick([2,3,5,10]),exp1=R.pick([2,3,4]),exp2=R.pick([2,3]);
      ex+=row(i,'Calcula: &nbsp; a) '+base+'<sup>'+exp1+'</sup> = _____&nbsp;&nbsp; b) '+base+'<sup>'+exp1+'</sup> × '+base+'<sup>'+exp2+'</sup> = _____&nbsp;&nbsp; c) '+base+'<sup>'+(exp1+exp2)+'</sup> ÷ '+base+'<sup>'+exp2+'</sup> = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) '+Math.pow(base,exp1)+'&nbsp; b) '+base+'<sup>'+(exp1+exp2)+'</sup> = '+Math.pow(base,exp1+exp2)+'&nbsp; c) '+base+'<sup>'+exp1+'</sup> = '+Math.pow(base,exp1)+'</div>';
    } else if (st===5) {
      var vals=[25000,340000,0.0042,1500000,0.000081];
      var val=R.pick(vals);
      var m1=R.int(1,9),e1=R.int(2,5),m2=R.int(1,9),e2=R.int(1,4);
      var prodM=m1*m2,prodE=e1+e2;
      var prodStr=prodM>=10?(prodM/10).toFixed(1)+'×10<sup>'+(prodE+1)+'</sup>':''+prodM+'×10<sup>'+prodE+'</sup>';
      ex+=row(i,'a) Escreve '+val+' em notação científica&nbsp;&nbsp; b) Calcula: ('+m1+'×10<sup>'+e1+'</sup>) × ('+m2+'×10<sup>'+e2+'</sup>) = _____&nbsp;&nbsp; c) Converte 3,2×10<sup>4</sup> para decimal');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) ver raciocínio&nbsp; b) '+prodStr+'&nbsp; c) 32 000</div>';
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema3(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles={1:'Ângulos Internos de Polígonos',2:'Ângulos Externos',3:'Retas Paralelas',4:'Quadriláteros',5:'Áreas'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      var n1=R.pick([3,4,5,6,8,10]),n2=R.pick([4,5,6,8,10,12]);
      var s1=(n1-2)*180,s2=(n2-2)*180;
      var nr=R.pick([4,5,6,8]); var each=((nr-2)*180)/nr;
      ex+=row(i,'a) Soma dos ângulos internos de um polígono com '+n1+' lados = _____&nbsp;&nbsp; b) ...com '+n2+' lados = _____&nbsp;&nbsp; c) Polígono regular com '+nr+' lados: cada ângulo interno = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+s1+'°</strong>&nbsp; b) <strong>'+s2+'°</strong>&nbsp; c) <strong>'+each+'°</strong></div>';
    } else if (st===2) {
      var nr2=R.pick([3,4,5,6,8,10]);
      var extA=360/nr2; var intA=180-extA;
      ex+=row(i,'Polígono regular com '+nr2+' lados:&nbsp; a) Cada ângulo externo = _____&nbsp;&nbsp; b) Ângulo interno correspondente = _____&nbsp;&nbsp; c) Soma de todos os ângulos externos = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+extA+'°</strong>&nbsp; b) <strong>'+intA+'°</strong>&nbsp; c) <strong>360°</strong></div>';
    } else if (st===3) {
      var ang=R.pick([35,40,50,55,60,65,70,75]);
      var sup=180-ang;
      ex+=row(i,'Duas retas paralelas cortadas por uma secante. Um ângulo mede '+ang+'°.&nbsp; a) Ângulo alterno interno = _____&nbsp;&nbsp; b) Ângulo co-interno = _____&nbsp;&nbsp; c) Ângulo correspondente = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+ang+'°</strong> (iguais)&nbsp; b) <strong>'+sup+'°</strong> (suplementares)&nbsp; c) <strong>'+ang+'°</strong> (iguais)</div>';
    } else if (st===4) {
      var angA=R.int(80,130); var angB=180-angA;
      var a1=R.int(80,110),a2=R.int(70,100),a3=R.int(75,110);
      var a4=360-a1-a2-a3;
      if(a4<30||a4>160){a1=90;a2=85;a3=95;a4=90;}
      ex+=row(i,'a) Paralelogramo: ângulo A = '+angA+'°. Determina ângulos B, C e D.&nbsp;&nbsp; b) Quadrilátero com ângulos '+a1+'°, '+a2+'°, '+a3+'° — qual é o 4.º?');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) B=<strong>'+angB+'°</strong> ; C=<strong>'+angA+'°</strong> ; D=<strong>'+angB+'°</strong>&nbsp; b) 360−('+a1+'+'+a2+'+'+a3+') = <strong>'+a4+'°</strong></div>';
    } else if (st===5) {
      var b1=R.int(4,14),h1=R.int(3,10),b2=R.int(4,12),h2=R.int(3,8),r=R.int(3,7);
      var a1=b1*h1,a2=Math.round(b2*h2/2*10)/10,a3=Math.round(3.14*r*r*100)/100;
      ex+=row(i,'Calcula a área:&nbsp; a) Retângulo '+b1+' cm × '+h1+' cm = _____&nbsp;&nbsp; b) Triângulo base '+b2+' cm, alt. '+h2+' cm = _____&nbsp;&nbsp; c) Círculo raio '+r+' cm (π≈3,14) = _____');
      sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+a1+' cm²</strong>&nbsp; b) <strong>'+a2+' cm²</strong>&nbsp; c) <strong>'+a3+' cm²</strong></div>';
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema4(st, dif, n) {
  var R = _RND; var ex = '', sol = '';
  function row(i,q){ return '<div class="ex"><div class="ex-num">'+i+'.</div><p>'+q+'</p><div class="linha"></div></div>'; }
  var titles={1:'Expressões Algébricas',2:'Simplificação de Expressões',3:'Equações do 1.º Grau',4:'Problemas com Equações'};
  ex+='<h3 style="color:#516860;border-left:3px solid #77998e;padding-left:8px;margin:1rem 0 .5rem">T'+st+' — '+titles[st]+'</h3>';
  for (var i=1;i<=n;i++) {
    if (st===1) {
      if (dif==='facil') {
        // Fácil: identificar coeficiente/parte literal, valor numérico simples
        var a1=R.int(2,5),b1=R.int(1,4),xv1=R.int(1,5);
        var val1=a1*xv1+b1;
        ex+=row(i,'a) Escreve a expressão algébrica: «o '+(['dobro','triplo','quádruplo'])[R.int(0,2)]+' de x adicionado de '+b1+'» = _____&nbsp;&nbsp; b) Calcula o valor numérico de '+a1+'x + '+b1+' para x = '+xv1+' = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+a1+'x + '+b1+'</strong>&nbsp; b) '+a1+'×'+xv1+'+'+b1+' = <strong>'+val1+'</strong></div>';
      } else if (dif==='medio') {
        // Médio: expressões com duas variáveis, valor numérico com negativos
        var a=R.int(2,6),b=R.int(1,4),c=R.int(1,5),xv=R.int(1,6),yv=R.int(1,5);
        var val=a*xv-b*yv+c;
        ex+=row(i,'a) Identifica: em −'+a+'x²y o coeficiente é _____ e a parte literal é _____&nbsp;&nbsp; b) Calcula o valor numérico de '+a+'x − '+b+'y + '+c+' para x='+xv+' e y='+yv);
        sol+='<div class="ex"><strong>'+i+'.</strong> a) coef. <strong>−'+a+'</strong>, p.l. <strong>x²y</strong>&nbsp; b) '+a+'×'+xv+'−'+b+'×'+yv+'+'+c+' = <strong>'+val+'</strong></div>';
      } else {
        // Difícil: expressões com expoentes, múltiplas variáveis, substituição com negativos
        var a=R.int(2,6),b=R.int(2,5),c=R.int(1,4),xv=R.neg(1,4),yv=R.neg(1,4);
        var val=a*xv*xv-b*yv+c;
        ex+=row(i,'a) São monómios semelhantes? '+a+'x²y e −'+b+'x²y? Explica.&nbsp;&nbsp; b) Calcula '+a+'x² − '+b+'y + '+c+' para x='+xv+' e y='+yv);
        sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>Sim</strong>, mesma parte literal x²y&nbsp; b) '+a+'×('+xv+')²−'+b+'×('+yv+')+'+c+' = '+a+'×'+xv*xv+'−('+b+'×('+yv+'))+'+c+' = <strong>'+val+'</strong></div>';
      }
    } else if (st===2) {
      if (dif==='facil') {
        // Fácil: reduzir termos semelhantes com uma variável
        var a=R.int(2,6),b=R.int(1,5),c=R.int(1,4);
        var s1=a+b, s2=a-c;
        ex+=row(i,'Simplifica (reduz termos semelhantes):&nbsp; a) '+a+'x + '+b+'x = _____&nbsp;&nbsp; b) '+a+'x − '+c+'x = _____&nbsp;&nbsp; c) '+b+'y + '+a+'y − '+c+'y = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+s1+'x</strong>&nbsp; b) <strong>'+s2+'x</strong>&nbsp; c) <strong>'+(a+b-c)+'y</strong></div>';
      } else if (dif==='medio') {
        // Médio: simplificar com duas variáveis
        var a=R.int(2,7),b=R.int(1,5),c=R.int(2,6),d=R.int(1,4);
        var rx=a-c, ry=b+d;
        ex+=row(i,'a) Simplifica: '+a+'x + '+b+'y − '+c+'x + '+d+'y = _____&nbsp;&nbsp; b) Simplifica: 3x² − 2x + 5 + x² + 4x − 1 = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+rx+'x + '+ry+'y</strong>&nbsp; b) <strong>4x² + 2x + 4</strong></div>';
      } else {
        // Difícil: remover parênteses e simplificar
        var a=R.int(2,5),b=R.int(1,4),c=R.int(2,5),d=R.int(1,4);
        var r1=a-c, r2=-(b+d);
        ex+=row(i,'a) Remove parênteses e simplifica: '+a+'x − ('+c+'x + '+b+') − '+d+' = _____&nbsp;&nbsp; b) Simplifica: 2(3x − 1) − (x + 4) = _____');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) <strong>'+r1+'x − '+(b+d)+'</strong>&nbsp; b) 6x−2−x−4 = <strong>5x − 6</strong></div>';
      }
    } else if (st===3) {
      if (dif==='facil') {
        // Fácil: equação de 1 passo — ax = b ou x + a = b
        var coef=R.pick([2,3,4,5]),x=R.int(2,9);
        var result=coef*x;
        var add=R.int(2,10),x2=R.int(2,9),res2=x2+add;
        ex+=row(i,'Resolve:&nbsp; a) '+coef+'x = '+result+'&nbsp;&nbsp;&nbsp; b) x + '+add+' = '+res2);
        sol+='<div class="ex"><strong>'+i+'.</strong> a) x = '+result+'÷'+coef+' = <strong>'+x+'</strong>&nbsp; b) x = '+res2+'−'+add+' = <strong>'+x2+'</strong></div>';
      } else if (dif==='medio') {
        // Médio: equação de 2 passos — ax + b = c, e com variável dos dois lados
        var coef=R.pick([2,3,4,5]),add=R.int(2,10),x=R.int(2,8);
        var result=coef*x+add;
        var c1=R.pick([3,4,5]),c2=R.pick([1,2]),b2=R.int(3,10),x2=R.int(1,6);
        var res2=c1*x2+b2-c2*x2; // c1*x2 + b2 = c2*x2 + res2... actually: (c1-c2)*x2 + b2 = rhs
        var rhs=(c1-c2)*x2+b2;
        ex+=row(i,'Resolve e verifica:&nbsp; a) '+coef+'x + '+add+' = '+result+'&nbsp;&nbsp;&nbsp; b) '+c1+'x + '+b2+' = '+c2+'x + '+rhs);
        sol+='<div class="ex"><strong>'+i+'.</strong> a) x = ('+result+'−'+add+')÷'+coef+' = <strong>'+x+'</strong>. Verif: '+coef+'×'+x+'+'+add+'='+result+' ✓&nbsp; b) '+(c1-c2)+'x = '+rhs+'−'+b2+' → x = <strong>'+x2+'</strong></div>';
      } else {
        // Difícil: equação com parênteses e/ou frações
        var x=R.int(2,7);
        var a=R.pick([2,3]),b=R.int(1,5),rhs=a*(x+b);
        var p=R.pick([2,3,4]),q=R.pick([2,3]),r=R.int(3,12);
        // x/p + x/q = r  →  x*(p+q)/(p*q) = r  →  x = r*p*q/(p+q)
        var xFrac=r*p*q; var xDen=p+q; // x = xFrac/xDen — only use if integer
        var usesFrac=(xFrac % xDen === 0);
        if (usesFrac) {
          var xSol=xFrac/xDen;
          ex+=row(i,'Resolve:&nbsp; a) '+a+'(x + '+b+') = '+rhs+'&nbsp;&nbsp;&nbsp; b) x/'+p+' + x/'+q+' = '+r);
          sol+='<div class="ex"><strong>'+i+'.</strong> a) '+a+'x+'+a*b+'='+rhs+' → '+a+'x='+(rhs-a*b)+' → x=<strong>'+x+'</strong>&nbsp; b) mmc('+p+','+q+')='+p*q+': '+q+'x+'+p+'x='+r*p*q+' → '+(p+q)+'x='+r*p*q+' → x=<strong>'+xSol+'</strong></div>';
        } else {
          var x2=R.int(2,6),c2=R.pick([2,3]),d2=R.int(1,4),rhs2=c2*(x2-d2);
          ex+=row(i,'Resolve:&nbsp; a) '+a+'(x + '+b+') = '+rhs+'&nbsp;&nbsp;&nbsp; b) '+c2+'(x − '+d2+') = '+rhs2);
          sol+='<div class="ex"><strong>'+i+'.</strong> a) '+a+'x+'+a*b+'='+rhs+' → x=<strong>'+x+'</strong>&nbsp; b) '+c2+'x−'+c2*d2+'='+rhs2+' → '+c2+'x='+(rhs2+c2*d2)+' → x=<strong>'+x2+'</strong></div>';
        }
      }
    } else if (st===4) {
      if (dif==='facil') {
        // Fácil: problema direto com equação simples
        var qtd=R.pick([3,4,5]),preco=R.pick([6,8,10,12]),total=preco*qtd;
        var idade=R.pick([20,24,30,32]),dobro=idade*2;
        ex+=row(i,'a) '+qtd+' bilhetes custam '+total+' €. Qual o preço de cada bilhete? (escreve e resolve a equação)&nbsp;&nbsp; b) O pai tem '+dobro+' anos, o dobro da idade do filho. Que idade tem o filho?');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+qtd+'x='+total+' → x=<strong>'+preco+' €</strong>&nbsp; b) 2x='+dobro+' → x=<strong>'+idade+' anos</strong></div>';
      } else if (dif==='medio') {
        // Médio: problema com soma/diferença entre duas quantidades
        var total=R.pick([40,48,56,60,72]),diff=R.pick([4,6,8,10,12]);
        var menor=(total-diff)/2;
        if(!Number.isInteger(menor)){total=50;diff=10;menor=20;}
        var maior=menor+diff;
        var pA=R.pick([5,6,8,10]),nA=R.int(3,6),pB=R.pick([3,4,5]),nB=R.int(3,6),totalAB=pA*nA+pB*nB;
        ex+=row(i,'a) Dois números cuja soma é '+total+' e a diferença é '+diff+'. Quais são? &nbsp;&nbsp; b) Comprei '+nA+' cadernos a '+pA+' € e '+nB+' canetas a '+pB+' €. Gastei '+totalAB+' €. Verifica com uma equação.');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) x+(x+'+diff+')='+total+' → 2x='+((total-diff))+' → x=<strong>'+menor+'</strong> e '+(menor+diff)+'&nbsp; b) '+nA+'×'+pA+'+'+nB+'×'+pB+'='+totalAB+' ✓</div>';
      } else {
        // Difícil: problema com equação de 2 passos e contexto real
        var velocA=R.pick([60,70,80]),velocB=R.pick([40,50,60]);
        if(velocA<=velocB){velocA=80;velocB=50;}
        var horas=R.pick([2,3,4]),distA=velocA*horas,distB=velocB*horas,difDist=distA-distB;
        var totalP=R.pick([120,150,180,200]),parteA=R.pick([0.4,0.5,0.6]);
        var vA=Math.round(totalP*parteA),vB=totalP-vA;
        ex+=row(i,'a) Dois carros partem ao mesmo tempo em sentidos opostos a '+velocA+' km/h e '+velocB+' km/h. Ao fim de '+horas+' h, qual a diferença entre as distâncias percorridas?&nbsp;&nbsp; b) Divide '+totalP+' € em duas partes onde a 1.ª é '+Math.round(parteA*100)+'% do total. Quais as partes?');
        sol+='<div class="ex"><strong>'+i+'.</strong> a) '+velocA+'×'+horas+'−'+velocB+'×'+horas+' = '+distA+'−'+distB+' = <strong>'+difDist+' km</strong>&nbsp; b) 1.ª parte = <strong>'+vA+' €</strong>, 2.ª = <strong>'+vB+' €</strong></div>';
      }
    }
  }
  return {ex:ex, sol:sol};
}

function _gfSubtema5(st, dif, n) {
  return _dinamico5(dif);
}

function _gfSubtema6(st, dif, n) {
  return _dinamico6(dif);
}

function _gfSubtema7(st, dif, n) {
  return _dinamico7(dif);
}

function _gfSubtema8(st, dif, n) {
  return _dinamico8(dif);
}

// ─── gfGenerar: subtema-aware override ─────────────────────────────────────────
function gfGenerar(secId) {
  var stFilter = gfGetSubtemas(secId);
  if (!stFilter) {
    _gfGenerarBase(secId);
    return;
  }

  var sec = document.getElementById(secId);
  if (!sec) { _gfGenerarBase(secId); return; }

  var capBtns = sec.querySelectorAll('.gf-cap-btn.active');
  var selectedCaps = [];
  capBtns.forEach(function(b){ selectedCaps.push(parseInt(b.dataset.cap)); });
  selectedCaps.sort(function(a,b){return a-b;});

  var types = {};
  sec.querySelectorAll('.gf-type-btn.active').forEach(function(b){ types[b.dataset.type] = true; });
  var dif = gfGetDifficulty(secId);
  var statusEl = document.getElementById('gf-status-' + secId);

  if (!selectedCaps.length) { if(statusEl) statusEl.textContent = 'Seleciona pelo menos um capítulo.'; return; }

  var mainHtml = '';
  var solucoesHtml = '';
  var hasSolucoes = !!types.solucoes && (!!types.exercicios || !!types.teste || !!types.minitestes);
  var N_PER_ST = gfGetQty(secId);

  selectedCaps.forEach(function(cap) {
    var sts = stFilter[cap];
    if (!sts || sts.length === 0) sts = [1,2,3,4,5]; // fallback: all subtemas
    var capHtml = '<div style="page-break-before:' + (mainHtml.length > 500 ? 'always' : 'avoid') + '">';
    capHtml += '<h2>' + (_CAP_NAMES_GF[cap] || 'Cap. ' + cap) + '</h2>';
    var hasContent = false;
    var capSolHtml = '';

    if (types.resumo) {
      try { var r = _buildResumoCapHTML(cap); if(r && r.trim()) { capHtml += '<h3>Resumo Teórico</h3>' + r; hasContent=true; } } catch(e){}
    }

    if (types.exercicios) {
      capHtml += '<h3>Exercícios por Subtema</h3>';
      capHtml += '<div style="color:#888;font-size:.78rem;margin-bottom:1rem">Data: '+new Date().toLocaleDateString('pt-PT')+'</div>';
      sts.forEach(function(st) {
        var res = null;
        try {
          if (cap===1) res = _gfSubtema1(st, dif, N_PER_ST);
          else if (cap===2) res = _gfSubtema2(st, dif, N_PER_ST);
          else if (cap===3) res = _gfSubtema3(st, dif, N_PER_ST);
          else if (cap===4) res = _gfSubtema4(st, dif, N_PER_ST);
          else if (cap===5) res = _gfSubtema5(st, dif, N_PER_ST);
          else if (cap===6) res = _gfSubtema6(st, dif, N_PER_ST);
          else if (cap===7) res = _gfSubtema7(st, dif, N_PER_ST);
          else if (cap===8) res = _gfSubtema8(st, dif, N_PER_ST);
        } catch(e){ console.warn('subtema err', cap, st, e); }
        if (res && res.ex) {
          capHtml += res.ex;
          hasContent = true;
          if (hasSolucoes && res.sol) capSolHtml += res.sol;
        }
      });
    }

    if (types.teste) {
      try { var t = _buildTesteCapHTML(cap); if(t && t.trim()) { capHtml += '<h3>Teste de Avaliação</h3>' + t; hasContent=true; } } catch(e){}
    }

    capHtml += '</div>';
    if (hasContent) mainHtml += capHtml;

    if (hasSolucoes && capSolHtml) {
      solucoesHtml += '<div style="page-break-before:' + (solucoesHtml ? 'always' : 'avoid') + ';margin-bottom:2rem">'
        + '<div style="background:#f0faf4;border:1.5px solid #77998E;border-radius:10px;padding:1rem 1.25rem;margin:.75rem 0">'
        + '<h4 style="color:#fff;background:#3d5c54;padding:.6rem 1rem;border-radius:8px;margin:0 0 .75rem;font-size:.88rem">Exercícios — Cap. '+cap+'</h4>'
        + '<div style="font-size:.88rem;line-height:1.75">'+capSolHtml+'</div></div></div>';
    }
  });

  if (hasSolucoes && solucoesHtml) {
    mainHtml += '<div style="page-break-before:always;margin-top:2rem">'
      + '<div style="border:3px solid #3d5c54;border-radius:14px;padding:1rem 1.5rem;margin-bottom:1.5rem;background:#f0faf4">'
      + '<div style="font-family:Montserrat,sans-serif;font-size:1rem;font-weight:800;color:#2d3530"><i class="ph ph-key"></i> SOLUÇÕES</div></div>'
      + solucoesHtml + '</div>';
  }

  if (!mainHtml) mainHtml = '<p style="color:#888;padding:1rem 0">Sem conteúdo. Seleciona pelo menos um subtema.</p>';

  _gfContent[secId] = mainHtml;
  var preview = document.getElementById('gf-content-' + secId);
  var previewWrap = document.getElementById('gf-preview-' + secId);
  if (preview) preview.innerHTML = mainHtml;
  if (previewWrap) previewWrap.style.display = 'block';
  if (statusEl) { statusEl.textContent = '✓ Ficha com subtemas gerada'; statusEl.style.color = 'var(--c1-mid)'; }
}

function gfDownload(secId) {
  var content = _gfContent[secId];
  if (!content) { gfGenerar(secId); setTimeout(function(){ gfDownload(secId); }, 200); return; }

  var sec = document.getElementById(secId);
  var capNums = [];
  if (sec) {
    sec.querySelectorAll('.gf-cap-btn.active').forEach(function(b){ capNums.push(parseInt(b.dataset.cap)); });
  }
  capNums.sort(function(a,b){return a-b;});
  var capNames = {1:'Números Inteiros',2:'Números Racionais',3:'Geometria',4:'Equações',5:'Sequências',6:'Funções',7:'Figuras Semelhantes',8:'Dados e Probabilidades'};
  var capLabels = capNums.map(function(c){ return capNames[c]||''; });
  var titleShort = capLabels.join(' + ') || 'Ficha';
  var docTitle = '3ponto14 · Matemática 7.º Ano · ' + titleShort;
  var now = new Date().toLocaleDateString('pt-PT');

  // Build meta fields row
  var metaRow = '<div class="doc-meta">'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
    + '</div>';

  // Build page header
  var header = '<div class="doc-header">'
    + '<div>'
    +   '<div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
    +   '<div class="doc-title">Ficha de Trabalho<em>' + titleShort + '</em></div>'
    + '</div>'
    + '<div class="doc-logo">3&#960;</div>'
    + '</div>';

  // Footer
  var footer = '<div class="doc-footer">'
    + '<span>3ponto14 · Matemática 7.º Ano</span>'
    + '<span>' + now + '</span>'
    + '</div>';

  // Assemble full page content (uses wrapPrintDoc CSS)
  var pageContent = header + metaRow + content + footer;
  var fullHtml = (typeof wrapPrintDoc === 'function')
    ? wrapPrintDoc(docTitle, pageContent)
    : '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+docTitle+'</title></head><body>'+pageContent+'</body></html>';

  var fname = '3ponto14_mat7_' + capNums.join('-') + '_' + new Date().toISOString().slice(0,10);
  if (typeof htmlToPdfDownload === 'function') {
    htmlToPdfDownload(fullHtml, fname + '.pdf');
  } else {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([fullHtml], {type:'text/html;charset=utf-8'}));
    a.download = fname + '.html';
    a.click();
  }
}

function gfActionHTML(secId) {
  var status = document.getElementById('gf-status-' + secId);
  if (status) { status.textContent = 'A gerar HTML…'; status.style.color = ''; }
  setTimeout(function() {
    try { gfGenerar(secId); } catch(e) {
      if (status) { status.textContent = 'Erro ao gerar. Tenta novamente.'; status.style.color = '#c0392b'; }
      return;
    }
    var html = _gfContent[secId];
    if (!html) {
      if (status) { status.textContent = 'Seleciona pelo menos um capítulo e um tipo de conteúdo.'; status.style.color = '#c0392b'; }
      return;
    }
    gfDownloadHTML(secId);
    if (status) { status.textContent = '✓ HTML descarregado!'; status.style.color = 'var(--c1-mid)'; }
    setTimeout(function() { if (status) status.textContent = ''; _gfContent[secId] = null; }, 2000);
  }, 40);
}

function gfDownloadHTML(secId) {
  var content = _gfContent[secId];
  if (!content) { gfGenerar(secId); setTimeout(function(){ gfDownloadHTML(secId); }, 200); return; }

  var sec = document.getElementById(secId);
  var capNums = [];
  if (sec) sec.querySelectorAll('.gf-cap-btn.active').forEach(function(b){ capNums.push(parseInt(b.dataset.cap)); });
  capNums.sort(function(a,b){ return a-b; });
  var capNames = {1:'Números Inteiros',2:'Números Racionais',3:'Geometria',4:'Equações',5:'Sequências',6:'Funções',7:'Figuras Semelhantes',8:'Dados e Probabilidades'};
  var capLabels = capNums.map(function(c){ return capNames[c]||''; });
  var titleShort = capLabels.join(' + ') || 'Ficha';
  var docTitle = '3ponto14 · Matemática 7.º Ano · ' + titleShort;
  var now = new Date().toLocaleDateString('pt-PT');

  var metaRow = '<div class="doc-meta">'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Nome</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Turma</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Data</div><div class="doc-meta-line"></div></div>'
    + '<div class="doc-meta-item"><div class="doc-meta-label">Classificação</div><div class="doc-meta-line"></div></div>'
    + '</div>';

  var header = '<div class="doc-header">'
    + '<div><div class="doc-brand">3ponto14 · Matemática 7.º Ano</div>'
    +   '<div class="doc-title">Ficha de Trabalho<em>' + titleShort + '</em></div></div>'
    + '<div class="doc-logo">3&#960;</div></div>';

  var footer = '<div class="doc-footer">'
    + '<span>3ponto14 · Matemática 7.º Ano</span><span>' + now + '</span></div>';

  var pageContent = header + metaRow + content + footer;
  var fullHtml = (typeof wrapPrintDoc === 'function')
    ? wrapPrintDoc(docTitle, pageContent)
    : '<!DOCTYPE html><html lang="pt"><head><meta charset="UTF-8"><title>'+docTitle+'</title></head><body>'+pageContent+'</body></html>';

  var fname = '3ponto14_mat7_' + capNums.join('-') + '_' + new Date().toISOString().slice(0,10) + '.html';
  var blob = new Blob([fullHtml], {type: 'application/octet-stream'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fname;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 5000);
}

// EDUPT — ERROR TRACKER  (registo persistente de erros por questão)
var ErrorTracker = (function(){
  var KEY = 'edupt_errors_v1';
  var CAP_LABELS = {cap1:'Inteiros',cap2:'Racionais',cap3:'Geometria',cap4:'Equações',cap5:'Sequências',cap6:'Funções',cap7:'Semelhança',cap8:'Dados'};
  var SEC_LABELS = {q:'Questões-aula',m:'Miniteste',t:'Teste',rel:'Relâmpago',vf:'V/F'};

  function _load(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; }
  }
  function _save(d){
    try{ localStorage.setItem(KEY, JSON.stringify(d)); }catch(e){}
  }
  function _strip(html){
    try{
      var tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return (tmp.textContent||tmp.innerText||'').replace(/\s+/g,' ').trim().slice(0,140);
    }catch(e){ return String(html||'').slice(0,140); }
  }

  function record(capId, secKey, qid, texto, correct){
    var d = _load();
    var key = capId+'|'+qid;
    // Extract tema from DOM element if present
    var tema = '';
    try {
      var el = document.getElementById(qid);
      if (el) {
        tema = el.dataset.tema || '';
        if (!tema) {
          var qn = el.querySelector('.q-number');
          if (qn) { var m = qn.textContent.match(/·\s*(.+)$/); if (m) tema = m[1].trim(); }
        }
      }
    } catch(e) {}
    if(!d[key]) d[key] = {capId:capId, secKey:secKey, qid:qid, texto:_strip(texto), tema:tema, erros:0, acertos:0, ultima:null};
    if (!d[key].tema && tema) d[key].tema = tema;
    if(correct) d[key].acertos++; else d[key].erros++;
    d[key].ultima = new Date().toISOString().slice(0,10);
    _save(d);
  }

  function getErrors(capId, minErrors){
    minErrors = minErrors||1;
    var d = _load();
    return Object.values(d)
      .filter(function(r){ return (!capId||r.capId===capId) && r.erros>=minErrors; })
      .sort(function(a,b){ return b.erros-a.erros || a.acertos-b.acertos; });
  }

  function clearCap(capId){
    var d = _load();
    Object.keys(d).forEach(function(k){ if(!capId||d[k].capId===capId) delete d[k]; });
    _save(d);
  }

  return { record, getErrors, clearCap, CAP_LABELS, SEC_LABELS };
})();

// Flush any _etRecord calls that arrived before ErrorTracker was defined
if (typeof _etQueue !== 'undefined') {
  _etQueue.forEach(function(args){ ErrorTracker.record.apply(ErrorTracker, args); });
  _etQueue = [];
}

// ── Render error panel (unified: single cap or mega/multi-cap mode) ───────────
function _etRenderPanel(containerId, capIdOrIds) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var _filter = container._etFilter || 'all';
  var isMega = Array.isArray(capIdOrIds);

  var all = [];
  if (isMega) {
    if (!capIdOrIds || capIdOrIds.length === 0) {
      container.innerHTML = '<div class="et-empty">Seleciona cap\u00edtulos e responde a quest\u00f5es para ver os erros aqui.</div>';
      return;
    }
    capIdOrIds.forEach(function(capId) {
      ErrorTracker.getErrors(capId, 1).forEach(function(r) { all.push(r); });
    });
    // Sort combined list by error count descending
    all.sort(function(a, b) { return b.erros - a.erros || a.acertos - b.acertos; });
  } else {
    all = ErrorTracker.getErrors(capIdOrIds, 1);
  }

  var hot  = all.filter(function(r) { return r.erros >= 3; });
  var warn = all.filter(function(r) { return r.erros >= 1 && r.erros < 3; });
  var shown = _filter === 'hot' ? hot : _filter === 'revisao' ? warn : all;
  var limit = isMega ? 20 : 15;

  var titleExtra = isMega
    ? ' \u2014 ' + capIdOrIds.map(function(c) { return ErrorTracker.CAP_LABELS[c] || c; }).join(' + ')
    : '';

  var clearOnclick;
  if (isMega) {
    var _clearParts = capIdOrIds.map(function(c) { return 'ErrorTracker.clearCap(\'' + c + '\')'; });
    clearOnclick = _clearParts.join(';') + ';_etRenderPanel(\'' + containerId + '\',' + JSON.stringify(capIdOrIds) + ')';
  } else {
    clearOnclick = 'ErrorTracker.clearCap(\'' + capIdOrIds + '\');etRenderPanel(\'' + containerId + '\',\'' + capIdOrIds + '\')';
  }

  var _capIdsJson = isMega ? JSON.stringify(capIdOrIds) : null;
  var filterOnclick = isMega
    ? function(f) { return 'document.getElementById(\'' + containerId + '\')._etFilter=\'' + f + '\';_etRenderPanel(\'' + containerId + '\',' + _capIdsJson + ')'; }
    : function(f) { return 'document.getElementById(\'' + containerId + '\')._etFilter=\'' + f + '\';etRenderPanel(\'' + containerId + '\',\'' + capIdOrIds + '\')'; };

  var emptyMsg = all.length === 0
    ? (isMega ? 'Ainda sem erros registados nestes cap\u00edtulos.' : 'Ainda sem erros registados \u2014 responde a quest\u00f5es para veres aqui as tuas dificuldades.')
    : 'Sem quest\u00f5es nesta categoria.';

  container.innerHTML =
    '<div class="et-header">' +
      '<div class="et-title">' +
        '<i class="ph ph-info" style="flex-shrink:0"></i>' +
        '\u00a0Onde erro mais' + titleExtra +
        (hot.length > 0 ? ' <span class="et-badge">' + hot.length + ' cr\u00edticas</span>' : '') +
      '</div>' +
      '<button class="et-clear-btn" onclick="' + clearOnclick + '">Limpar</button>' +
    '</div>' +
    '<div class="et-filters" style="margin-bottom:1rem">' +
      '<button class="et-filter' + (_filter==='all' ? ' active' : '') + '" onclick="' + filterOnclick('all') + '">Todas (' + all.length + ')</button>' +
      '<button class="et-filter' + (_filter==='hot' ? ' active' : '') + '" onclick="' + filterOnclick('hot') + '">Cr\u00edticas 3+ (' + hot.length + ')</button>' +
      '<button class="et-filter' + (_filter==='revisao' ? ' active-warn' : '') + '" onclick="' + filterOnclick('revisao') + '">A rever 1-2 (' + warn.length + ')</button>' +
    '</div>' +
    (shown.length === 0
      ? '<div class="et-empty">' + emptyMsg + '</div>'
      : shown.slice(0, limit).map(function(r, i) {
          var tot = r.erros + r.acertos;
          var pct = tot > 0 ? Math.round(r.erros / tot * 100) : 0;
          var cls = r.erros >= 3 ? 'hot' : 'warn';
          var barCol = r.erros >= 3 ? 'var(--wrong)' : '#f59e0b';
          return '<div class="et-item ' + cls + '">' +
            '<div class="et-rank">' + (i+1) + '</div>' +
            '<div class="et-body">' +
              '<div class="et-q">' + r.texto + (r.texto.length >= 140 ? '\u2026' : '') + '</div>' +
              '<div class="et-meta">' +
                '<span class="et-cap-tag">' + (ErrorTracker.CAP_LABELS[r.capId] || r.capId) + '</span>' +
                '<span class="et-section-tag">' + (ErrorTracker.SEC_LABELS[r.secKey] || r.secKey) + '</span>' +
                (r.ultima ? '<span class="et-section-tag">\u00b7 ' + r.ultima + '</span>' : '') +
              '</div>' +
              '<div class="et-bar-wrap"><div class="et-bar" style="width:' + pct + '%;background:' + barCol + '"></div></div>' +
            '</div>' +
            '<div class="et-stats">' +
              '<div class="et-ratio">' + r.erros + '\u00d7</div>' +
              '<div class="et-ratio-label">erros</div>' +
              (r.acertos > 0 ? '<div style="font-size:.63rem;color:var(--c1-mid);margin-top:2px">' + r.acertos + '\u2713</div>' : '') +
            '</div>' +
          '</div>';
        }).join('')
    );

}

// Backward-compatible aliases
function etRenderPanel(containerId, capId) { _etRenderPanel(containerId, capId); }
function etRenderMegaPanel(containerId, capIds) { _etRenderPanel(containerId, capIds); }
document.addEventListener('DOMContentLoaded', function(){
  var panels = [
    {secId:'sec-progresso',  cid:'et-cap1', capId:'cap1'},
    {secId:'sec-progresso2', cid:'et-cap2', capId:'cap2'},
    {secId:'sec-progresso3', cid:'et-cap3', capId:'cap3'},
    {secId:'sec-progresso4', cid:'et-cap4', capId:'cap4'},
  ];
  panels.forEach(function(p){
    var sec = document.getElementById(p.secId);
    if(!sec) return;
    var div = document.createElement('div');
    div.id = p.cid;
    div.className = 'et-panel';
    sec.appendChild(div);
  });
});

// ── Wrap progRenderSection functions to auto-update panel ─────
(function(){
  function wrap(fnName, panelId, capId){
    var orig = window[fnName];
    if(typeof orig !== 'function') return;
    window[fnName] = function(){ orig.apply(this, arguments); etRenderPanel(panelId, capId); };
  }
  wrap('progRenderSection',  'et-cap1', 'cap1');
  wrap('progRenderSection2', 'et-cap2', 'cap2');
  wrap('progRenderSection3', 'et-cap3', 'cap3');
  wrap('renderProg4',        'et-cap4', 'cap4');
})();

// ── Helper: extract question text from DOM ────────────────────
function _etText(qid){
  var el = document.getElementById(qid);
  if(!el) return qid;
  var t = el.querySelector('.quiz-q-text,.q-text,.relampago-q .q-text,.q-enunciado');
  return t ? t.textContent.trim() : el.textContent.trim().slice(0,140);
}

/* ══════════════════════════════════════════════
   PARTILHA DE SELEÇÕES POR URL
   Serializa caps, subtemas, tipos e nível para
   query string — funciona em qualquer computador
══════════════════════════════════════════════ */

function gfSerializarURL(secId) {
  var params = new URLSearchParams();

  // Capítulos ativos
  var caps = [];
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn.active').forEach(function(btn) {
    caps.push(btn.getAttribute('data-cap'));
  });
  if (caps.length) params.set('caps', caps.join(','));

  // Subtemas ativos por capítulo
  var stMap = {};
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-chip.active').forEach(function(chip) {
    var cap = chip.getAttribute('data-cap');
    var st  = chip.getAttribute('data-st');
    if (!stMap[cap]) stMap[cap] = [];
    stMap[cap].push(st);
  });
  var stParts = [];
  Object.keys(stMap).forEach(function(cap) {
    stParts.push(cap + '-' + stMap[cap].join('.'));
  });
  if (stParts.length) params.set('st', stParts.join(','));

  // O que incluir
  var tipos = [];
  document.querySelectorAll('#gf-types-' + secId + ' .gf-type-btn.active').forEach(function(btn) {
    tipos.push(btn.getAttribute('data-type'));
  });
  if (tipos.length) params.set('tipos', tipos.join(','));

  // Nível de dificuldade
  var difBtn = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn.active');
  if (difBtn) params.set('dif', difBtn.getAttribute('data-dif'));

  return window.location.pathname + '?' + params.toString() + '#gerador-fichas';
}

function gfCopiarLink(secId) {
  var url = window.location.origin + gfSerializarURL(secId);
  var btn = document.getElementById('gf-share-btn-' + secId);
  var label = document.getElementById('gf-share-label-' + secId);

  navigator.clipboard.writeText(url).then(function() {
    if (btn) btn.classList.add('copied');
    if (label) label.textContent = '✓ Link copiado!';
    setTimeout(function() {
      if (btn) btn.classList.remove('copied');
      if (label) label.textContent = 'Copiar link';
    }, 2500);
  }).catch(function() {
    // Fallback para browsers sem clipboard API moderna
    try {
      var ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = document.execCommand('copy'); // depreciado mas mantido como fallback de último recurso
      document.body.removeChild(ta);
      if (ok) {
        if (btn) btn.classList.add('copied');
        if (label) label.textContent = '✓ Link copiado!';
        setTimeout(function() {
          if (btn) btn.classList.remove('copied');
          if (label) label.textContent = 'Copiar link';
        }, 2500);
      } else {
        if (label) label.textContent = 'Copia: ' + url;
      }
    } catch(e) {
      if (label) label.textContent = 'Erro ao copiar';
    }
  });
}

function gfRestaurarDeURL() {
  var params = new URLSearchParams(window.location.search);
  if (!params.has('caps') && !params.has('st') && !params.has('tipos') && !params.has('dif')) return;

  var secId = 'mat7-downloads';

  // Desativar todos os caps primeiro
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-cap-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  // Fechar todas as trays
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-tray').forEach(function(t) {
    t.classList.remove('open');
  });
  // Desativar todos os subtemas
  document.querySelectorAll('#gf-caps-' + secId + ' .gf-st-chip').forEach(function(c) {
    c.classList.remove('active');
  });

  // Restaurar caps
  if (params.has('caps')) {
    params.get('caps').split(',').forEach(function(cap) {
      var btn = document.querySelector('#gf-caps-' + secId + ' .gf-cap-btn[data-cap="' + cap + '"]');
      if (btn) btn.classList.add('active');
    });
  }

  // Restaurar subtemas
  if (params.has('st')) {
    params.get('st').split(',').forEach(function(part) {
      var dash = part.indexOf('-');
      if (dash < 0) return;
      var cap = part.slice(0, dash);
      var sts = part.slice(dash + 1).split('.');
      var tray = document.getElementById('gf-st-' + cap + '-' + secId);
      if (tray) tray.classList.add('open');
      sts.forEach(function(st) {
        var chip = document.querySelector('#gf-caps-' + secId + ' .gf-st-chip[data-cap="' + cap + '"][data-st="' + st + '"]');
        if (chip) chip.classList.add('active');
      });
    });
  }

  // Restaurar tipos
  if (params.has('tipos')) {
    // Desativar todos os tipos
    document.querySelectorAll('#gf-types-' + secId + ' .gf-type-btn').forEach(function(btn) {
      btn.classList.remove('active');
      var tick = btn.querySelector('.gf-tick');
      if (tick) tick.textContent = '';
    });
    params.get('tipos').split(',').forEach(function(tipo) {
      var btn = document.querySelector('#gf-types-' + secId + ' .gf-type-btn[data-type="' + tipo + '"]');
      if (btn) {
        btn.classList.add('active');
        var tick = btn.querySelector('.gf-tick');
        if (tick) tick.textContent = '✓';
      }
    });
  }

  // Restaurar nível
  if (params.has('dif')) {
    document.querySelectorAll('#gf-dif-' + secId + ' .gf-dif-btn').forEach(function(btn) {
      btn.classList.remove('active');
    });
    var difBtn = document.querySelector('#gf-dif-' + secId + ' .gf-dif-btn[data-dif="' + params.get('dif') + '"]');
    if (difBtn) difBtn.classList.add('active');
  }

  // Scroll suave para o gerador e regenerar ficha com os filtros restaurados
  setTimeout(function() {
    var el = document.getElementById('mat7-downloads');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof mat7GfGenerate === 'function') mat7GfGenerate();
  }, 300);
}

// Correr ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  gfRestaurarDeURL();
});

