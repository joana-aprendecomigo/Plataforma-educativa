// CAP. 3 — GEOMETRIA · JavaScript
// Uses chapter-engine.js for generic quiz/exam/flashcard/progress logic

// ── Utilitários (aliases for backward compat) ──
var rnd3=rnd, sh3=shuffle;
function deg(n){return n+'°';}

// ── SVG HELPERS (Geometria — cap3 specific) ──────────────────────────────────
// These are also exported to window so shared.js can call them if needed.

// svgAngulo: simple angle arc diagram for polygon interior angle illustrations
// degrees: the angle to show; label: optional text near the horizontal ray
function svgAngulo(degrees, label) {
  var w = 160, h = 120;
  var cx = 30, cy = 90;
  var r = 55;
  var rad = degrees * Math.PI / 180;
  var x2 = Math.round(cx + r * Math.cos(rad));
  var y2 = Math.round(cy - r * Math.sin(rad));
  var arcR = 22;
  var ax = Math.round(cx + arcR);
  var ay = cy;
  var bx = Math.round(cx + arcR * Math.cos(rad));
  var by = Math.round(cy - arcR * Math.sin(rad));
  var sweep = degrees > 180 ? 1 : 0;
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" style="max-width:100%;overflow:visible" aria-hidden="true">'
    + '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#516860" stroke-width="2.5" stroke-linecap="round"/>'
    + '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#516860" stroke-width="2.5" stroke-linecap="round"/>'
    + '<path d="M ' + ax + ' ' + ay + ' A ' + arcR + ' ' + arcR + ' 0 ' + sweep + ' 0 ' + bx + ' ' + by + '" fill="rgba(81,104,96,.18)" stroke="#516860" stroke-width="1.5"/>'
    + '<text x="' + (cx + arcR + 12) + '" y="' + (cy - 8) + '" font-family="Montserrat,sans-serif" font-size="13" fill="#516860" font-weight="700">' + degrees + '\xb0</text>'
    + (label ? '<text x="' + (cx + r + 6) + '" y="' + (cy + 5) + '" font-family="Montserrat,sans-serif" font-size="11" fill="#888">' + label + '</text>' : '')
    + '</svg>';
}

// svgAreaGrid: grid diagram for area calculations (rectangle/parallelogram/triangle)
// b: base (cols), h: height (rows), note: optional center label
function svgAreaGrid(b, h, note) {
  var cellSize = Math.min(20, Math.floor(200 / Math.max(b, h)));
  var W = b * cellSize + 40;
  var H = h * cellSize + 40;
  var ox = 20, oy = 16;
  var lines = '';
  var i;
  for (i = 0; i <= b; i++) {
    lines += '<line x1="' + (ox + i * cellSize) + '" y1="' + oy + '" x2="' + (ox + i * cellSize) + '" y2="' + (oy + h * cellSize) + '" stroke="#77998e" stroke-width="0.8" opacity="0.6"/>';
  }
  for (i = 0; i <= h; i++) {
    lines += '<line x1="' + ox + '" y1="' + (oy + i * cellSize) + '" x2="' + (ox + b * cellSize) + '" y2="' + (oy + i * cellSize) + '" stroke="#77998e" stroke-width="0.8" opacity="0.6"/>';
  }
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" style="max-width:100%" aria-hidden="true">'
    + '<rect x="' + ox + '" y="' + oy + '" width="' + (b * cellSize) + '" height="' + (h * cellSize) + '" fill="rgba(119,153,142,.18)" stroke="#516860" stroke-width="2"/>'
    + lines
    + '<text x="' + (ox + b * cellSize / 2) + '" y="' + (oy + h * cellSize + 14) + '" font-family="Montserrat,sans-serif" font-size="12" fill="#516860" text-anchor="middle" font-weight="700">' + b + ' cm</text>'
    + '<text x="' + (ox - 6) + '" y="' + (oy + h * cellSize / 2) + '" font-family="Montserrat,sans-serif" font-size="12" fill="#516860" text-anchor="middle" dominant-baseline="central" font-weight="700" transform="rotate(-90,' + (ox - 6) + ',' + (oy + h * cellSize / 2) + ')">' + h + ' cm</text>'
    + (note ? '<text x="' + (ox + b * cellSize / 2) + '" y="' + (oy + h * cellSize / 2) + '" font-family="Montserrat,sans-serif" font-size="10" fill="#516860" text-anchor="middle" dominant-baseline="central" opacity="0.7">' + note + '</text>' : '')
    + '</svg>';
}

// svgParallelLines: two parallel horizontal lines r and s cut by transversal t
// opts.markedAngle: 0-7 (which angle to highlight in red)
//   Top intersection (r):    0=alpha1(top-right), 1=alpha2(bottom-right), 2=alpha3(bottom-left), 3=alpha4(top-left)
//   Bottom intersection (s): 4=beta1(top-right),  5=beta2(bottom-right),  6=beta3(bottom-left),  7=beta4(top-left)
// opts.markedValue: degree value to show on the highlighted angle
// opts.width, opts.height: SVG dimensions (defaults 320 x 210)
function svgParallelLines(opts) {
  opts = opts || {};
  var W = opts.width || 320;
  var H = opts.height || 210;

  // Two parallel horizontal lines at fixed y positions
  var yr = 72, ys = 152;
  // Transversal intersects r at (ix1, yr) and s at (ix2, ys)
  var ix1 = 130, ix2 = 198;

  // Transversal angle: going from top-left to bottom-right
  var dx = ix2 - ix1;    // 68
  var dy = ys - yr;      // 80
  // tDeg: angle from horizontal (positive = downward right) in degrees, for SVG (y increases down)
  var tDeg = Math.atan2(dy, dx) * 180 / Math.PI;  // ~49.6 degrees

  // Line extension
  var ext = 75;
  var cosT = Math.cos(tDeg * Math.PI / 180);
  var sinT = Math.sin(tDeg * Math.PI / 180);

  // Transversal endpoints
  var tx0 = Math.round(ix1 - ext * cosT);
  var ty0 = Math.round(yr  - ext * sinT);
  var tx3 = Math.round(ix2 + ext * cosT);
  var ty3 = Math.round(ys  + ext * sinT);

  // Parallel lines span
  var lx0 = 18, lx1 = W - 18;

  var arcR = 15;
  var ma = opts.markedAngle;
  var mv = (opts.markedValue !== undefined) ? opts.markedValue : '';

  // Helper: draw one angle sector at intersection (cx,cy)
  // saDeg/eaDeg: start/end angles (SVG convention: 0=right, 90=down, 180=left, 270=up)
  // fill: fill color; lbl: label text; midDeg: angle for label placement
  function sector(cx, cy, saDeg, eaDeg, fill, lbl, midDeg) {
    var s = saDeg * Math.PI / 180;
    var e = eaDeg * Math.PI / 180;
    var x1a = Math.round(cx + arcR * Math.cos(s));
    var y1a = Math.round(cy + arcR * Math.sin(s));
    var x2a = Math.round(cx + arcR * Math.cos(e));
    var y2a = Math.round(cy + arcR * Math.sin(e));
    // Sweep: always go counter-clockwise (0) unless span > 180
    var span = eaDeg - saDeg;
    if (span < 0) span += 360;
    var laf = span > 180 ? 1 : 0;
    var result = '<path d="M ' + cx + ' ' + cy
      + ' L ' + x1a + ' ' + y1a
      + ' A ' + arcR + ' ' + arcR + ' 0 ' + laf + ' 1 ' + x2a + ' ' + y2a
      + ' Z" fill="' + fill + '" stroke="none"/>';
    // Label
    var lrr = arcR + 11;
    var lrad = midDeg * Math.PI / 180;
    var lx = Math.round(cx + lrr * Math.cos(lrad));
    var ly = Math.round(cy + lrr * Math.sin(lrad));
    var textFill = (fill === 'rgba(220,38,38,0.35)') ? '#991b1b' : '#3a6350';
    result += '<text x="' + lx + '" y="' + ly + '" font-family="Montserrat,sans-serif" font-size="8" fill="' + textFill + '" text-anchor="middle" dominant-baseline="central" font-weight="700">' + lbl + '</text>';
    return result;
  }

  // Sector definitions at top intersection (ix1, yr):
  // Horizontal right = 0deg, transversal downward = tDeg, horizontal left = 180deg, transversal upward = tDeg+180
  // 4 sectors (CW from right horizontal going around):
  //   alpha1 (top-right): from -(180-tDeg) to 0  → span = 180-tDeg,  mid = -(90-tDeg/2) = tDeg/2 - 90
  //   alpha2 (bottom-right): from 0 to tDeg       → span = tDeg,      mid = tDeg/2
  //   alpha3 (bottom-left):  from tDeg to 180     → span = 180-tDeg,  mid = tDeg + (180-tDeg)/2 = 90 + tDeg/2
  //   alpha4 (top-left): from 180 to 360-(180-tDeg) = 180+tDeg  → going via 270, span = 180+tDeg-180 = tDeg ... no
  //   Actually alpha4: from 180 to tDeg-180+360 = 180+tDeg going CW through 270
  //     span = (180+tDeg) - 180 = tDeg BUT we need to go CW so span = 360-tDeg
  //     mid = 180 + (360-(tDeg+(360-tDeg)/2)) ... simplify: mid = 270 - tDeg/2
  //   Let's verify: alpha4 occupies the top-left region. In SVG:
  //     goes from 180 (left) around through 270 (up) to (360+tDeg-180)=180+tDeg mod 360 = tDeg-180+360
  //     But tDeg ≈ 50, so tDeg-180 = -130. In SVG 360-130=230.
  //     So alpha4: from 180 to 230... that's only 50 degrees, and 230 = tDeg + 180. That's top-right side!
  //   Re-think: In SVG, angles go CW. The 4 sectors at top intersection, going CW:
  //     - From right ray (0) CW to transversal-down (tDeg):  alpha2 (bottom-right)
  //     - From transversal-down (tDeg) CW to left ray (180): alpha3 (bottom-left)
  //     - From left ray (180) CW to transversal-up (tDeg+180): alpha4 (top-left)
  //     - From transversal-up (tDeg+180) CW to right ray (360=0): alpha1 (top-right)
  // So:
  //   alpha2: start=0, end=tDeg (CW, sweep=1), span=tDeg, mid=tDeg/2
  //   alpha3: start=tDeg, end=180 (CW), span=180-tDeg, mid=tDeg+(180-tDeg)/2 = 90+tDeg/2
  //   alpha4: start=180, end=tDeg+180 (CW), span=tDeg, mid=180+tDeg/2
  //   alpha1: start=tDeg+180, end=360 (CW), span=180-tDeg, mid=tDeg+180+(180-tDeg)/2 = 270+tDeg/2

  // Using sweep=1 (clockwise arc in SVG):
  var tR = tDeg; // ~49.6
  var topSec = [
    // alpha1: top-right region (span = 180-tR)
    { sa: tR + 180, ea: 360, mid: 270 + tR / 2 },
    // alpha2: bottom-right region (span = tR)
    { sa: 0, ea: tR, mid: tR / 2 },
    // alpha3: bottom-left region (span = 180-tR)
    { sa: tR, ea: 180, mid: 90 + tR / 2 },
    // alpha4: top-left region (span = tR)
    { sa: 180, ea: tR + 180, mid: 180 + tR / 2 }
  ];
  // Bottom intersection same angular layout
  var botSec = topSec;

  var angLabels = ['\u03b1\u2081', '\u03b1\u2082', '\u03b1\u2083', '\u03b1\u2084',
                   '\u03b2\u2081', '\u03b2\u2082', '\u03b2\u2083', '\u03b2\u2084'];
  var highlightFill = 'rgba(220,38,38,0.35)';
  var normalFill    = 'rgba(119,153,142,0.22)';

  var arcsHtml = '';
  var k;
  // Top intersection arcs (alpha1..4 = indices 0..3)
  for (k = 0; k < 4; k++) {
    var sec = topSec[k];
    var fill = (ma === k) ? highlightFill : normalFill;
    var lbl = (ma === k && mv !== '') ? (mv + '\xb0') : angLabels[k];
    arcsHtml += sector(ix1, yr, sec.sa, sec.ea, fill, lbl, sec.mid);
  }
  // Bottom intersection arcs (beta1..4 = indices 4..7)
  for (k = 0; k < 4; k++) {
    var sec2 = botSec[k];
    var fill2 = (ma === k + 4) ? highlightFill : normalFill;
    var lbl2 = (ma === k + 4 && mv !== '') ? (mv + '\xb0') : angLabels[k + 4];
    arcsHtml += sector(ix2, ys, sec2.sa, sec2.ea, fill2, lbl2, sec2.mid);
  }

  // Intersection dots
  var dots = '<circle cx="' + ix1 + '" cy="' + yr + '" r="3" fill="#516860"/>'
    + '<circle cx="' + ix2 + '" cy="' + ys + '" r="3" fill="#516860"/>';

  // Parallel tick marks on line r and s (two ticks each = parallel symbol)
  var tickOffset = 12;
  var tick1 = '<line x1="' + (lx0 + tickOffset - 4) + '" y1="' + (yr - 5) + '" x2="' + (lx0 + tickOffset + 4) + '" y2="' + (yr + 5) + '" stroke="#516860" stroke-width="1.5"/>'
    + '<line x1="' + (lx0 + tickOffset + 5) + '" y1="' + (yr - 5) + '" x2="' + (lx0 + tickOffset + 13) + '" y2="' + (yr + 5) + '" stroke="#516860" stroke-width="1.5"/>';
  var tick2 = '<line x1="' + (lx0 + tickOffset - 4) + '" y1="' + (ys - 5) + '" x2="' + (lx0 + tickOffset + 4) + '" y2="' + (ys + 5) + '" stroke="#516860" stroke-width="1.5"/>'
    + '<line x1="' + (lx0 + tickOffset + 5) + '" y1="' + (ys - 5) + '" x2="' + (lx0 + tickOffset + 13) + '" y2="' + (ys + 5) + '" stroke="#516860" stroke-width="1.5"/>';

  // Labels
  var rLbl = '<text x="' + (lx1 + 4) + '" y="' + (yr + 4) + '" font-family="Montserrat,sans-serif" font-size="13" fill="#516860" font-style="italic" font-weight="700">r</text>';
  var sLbl = '<text x="' + (lx1 + 4) + '" y="' + (ys + 4) + '" font-family="Montserrat,sans-serif" font-size="13" fill="#516860" font-style="italic" font-weight="700">s</text>';
  var tLbl = '<text x="' + (tx0 - 2) + '" y="' + (ty0 - 6) + '" font-family="Montserrat,sans-serif" font-size="13" fill="#9b5e48" font-style="italic" font-weight="700">t</text>';

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '"'
    + ' style="max-width:100%;border-radius:8px;background:#fafaf8;border:1px solid #e5e0d8"'
    + ' aria-label="Diagrama: retas paralelas r e s cortadas pela transversal t">'
    // Arcs drawn first (behind lines)
    + arcsHtml
    // Parallel line r
    + '<line x1="' + lx0 + '" y1="' + yr + '" x2="' + lx1 + '" y2="' + yr + '" stroke="#516860" stroke-width="2" stroke-linecap="round"/>'
    // Parallel line s
    + '<line x1="' + lx0 + '" y1="' + ys + '" x2="' + lx1 + '" y2="' + ys + '" stroke="#516860" stroke-width="2" stroke-linecap="round"/>'
    // Transversal t
    + '<line x1="' + tx0 + '" y1="' + ty0 + '" x2="' + tx3 + '" y2="' + ty3 + '" stroke="#9b5e48" stroke-width="2" stroke-linecap="round"/>'
    + dots + tick1 + tick2
    + rLbl + sLbl + tLbl
    + '</svg>';
}

// ── CONSTRUTOR DE EXERCÍCIOS CAP3 ──
function buildEx3(tema,tipo,dif){
  tema=String(tema);
  var hard=dif==='dificil', easy=dif==='facil';

  // TEMA 1 — Ângulos internos de polígonos
  // facil:   aplicação direta da fórmula (dado n, calcular S)
  // medio:   inverso (dada S, encontrar n) ou ângulo de polígono regular
  // dificil: multi-passo (dado ângulo interno de polígono regular, encontrar n e depois ângulo externo)
  if(tema==='1'){
    var nRange=easy?[3,4,5,6]:[5,6,7,8,9,10,12,15,18,20];
    var n=nRange[rnd3(0,nRange.length-1)];
    var si=(n-2)*180;
    var nomes={3:'triângulo',4:'quadrilátero',5:'pentágono',6:'hexágono',7:'heptágono',8:'octógono',9:'nonágono',10:'decágono',12:'dodecágono',15:'pentadecágono',18:'octadecágono',20:'icoságono'};
    var nome=nomes[n]||('polígono de '+n+' lados');

    // ── FÁCIL: aplicação direta da fórmula ──
    if(easy){
      var variant=rnd3(0,1);
      if(variant===0){
        if(tipo==='fill') return{tema:'Tema 1',tipo:'fill',
          visual: n<=6 ? svgAngulo(Math.round(si/n), si/n+'\xb0/\xe2\x80\x8bângulo') : null,
          enun:'Calcula a soma dos ângulos internos de um <strong>'+nome+'</strong> ('+n+' lados). Responde em graus.',
          resposta:si,expl:'Fórmula: S = (n \u2212 2) \xd7 180\xb0, onde n é o número de lados.\nS = ('+n+' \u2212 2) \xd7 180\xb0 = '+(n-2)+' \xd7 180\xb0 = '+si+'\xb0.'};
        var w=[si+180,si-180,si+360].filter(function(v){return v>0&&v!==si;});
        return{tema:'Tema 1',tipo:'mc',
          visual: n<=6?svgAngulo(Math.round(si/n), si/n+'\xb0/ângulo'):null,
          enun:'Qual é a soma dos ângulos internos de um <strong>'+nome+'</strong> ('+n+' lados)?',
          opcoes:sh3([si].concat(w.slice(0,3))),resposta:si,
          expl:'Fórmula: S = (n \u2212 2) \xd7 180\xb0.\nS = ('+n+' \u2212 2) \xd7 180\xb0 = '+(n-2)+' \xd7 180\xb0 = '+si+'\xb0.'};
      }
      var nWrong=n+(rnd3(0,1)?1:-1);var siWrong=(nWrong-2)*180;
      var isTrue=rnd3(0,1)===1;var nTest=isTrue?n:nWrong;var siTest=isTrue?si:siWrong;
      return{tema:'Tema 1',tipo:'vf',
        enun:'V/F: <em>"A soma dos ângulos internos de um polígono com '+nTest+' lados é '+siTest+'\xb0"</em>',
        resposta:isTrue?'V':'F',
        expl:'Fórmula: (n\u22122)\xd7180\xb0.\n('+nTest+'\u22122)\xd7180 = '+(nTest-2)+'\xd7180 = '+((nTest-2)*180)+'\xb0.\nA afirmação diz '+siTest+'\xb0 \u2192 '+(isTrue?'VERDADEIRA':'FALSA')+'.'};
    }

    // ── MÉDIO: inverso ou ângulo interno do polígono regular ──
    if(!hard){
      var variant=rnd3(0,2);
      if(variant===0){
        var w2=[n+1,n-1,n+2].filter(function(v){return v>=3&&v!==n;});
        return{tema:'Tema 1',tipo:'mc',
          enun:'A soma dos ângulos internos de um polígono é <strong>'+si+'\xb0</strong>. Quantos lados tem?',
          opcoes:sh3([n].concat(w2.slice(0,3))),resposta:n,
          expl:'(n \u2212 2) \xd7 180\xb0 = '+si+'\xb0.\nn \u2212 2 = '+si+' \xf7 180 = '+(n-2)+'.\nn = '+(n-2)+' + 2 = '+n+' lados.'};
      }
      if(variant===1){
        var ang=si/n;
        var w3=sh3([si/n+10,si/n-10,360/n].filter(function(v){return v>0&&v!==ang;})).slice(0,3);
        return{tema:'Tema 1',tipo:'mc',
          enun:'Num <strong>'+nome+' regular</strong>, qual é a amplitude de cada ângulo interno?',
          opcoes:sh3([ang].concat(w3)),resposta:ang,
          expl:'Soma dos ângulos internos: ('+n+'\u22122)\xd7180\xb0 = '+si+'\xb0.\nNum polígono regular todos os ângulos são iguais.\nCada ângulo = '+si+'\xb0 \xf7 '+n+' = '+ang+'\xb0.'};
      }
      var extAng=Math.round(360/n);
      var wn=[n+1,n-1,n+2].filter(function(v){return v>=3&&v!==n;});
      return{tema:'Tema 1',tipo:'mc',
        enun:'Um polígono regular tem ângulo externo de <strong>'+extAng+'\xb0</strong>. Quantos lados tem?',
        opcoes:sh3([n].concat(wn.slice(0,3))),resposta:n,
        expl:'n = 360\xb0 \xf7 \xe2\x80\x8bâ_ext = 360\xb0 \xf7 '+extAng+'\xb0 = '+n+' lados.'};
    }

    // ── DIFÍCIL: dado ângulo interno de polígono regular, encontrar n e ângulo externo ──
    var nHard=[5,6,8,9,10,12,15,18,20][rnd3(0,8)];
    var siH=(nHard-2)*180;
    var intAngH=siH/nHard;
    var extAngH=Math.round(360/nHard);
    var variant=rnd3(0,2);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 1',tipo:'fill',
        enun:'Num polígono regular, cada ângulo interno mede <strong>'+intAngH+'\xb0</strong>. Quantos lados tem?',
        resposta:nHard,
        expl:'Ângulo interno = (n\u22122)\xd7180\xb0 \xf7 n = '+intAngH+'\xb0.\n(n\u22122)\xd7180 = '+intAngH+'\xd7n.\n180n \u2212 360 = '+intAngH+'n.\n'+(180-intAngH)+'n = 360.\nn = 360 \xf7 '+(180-intAngH)+' = '+nHard+' lados.'};
      var wnd=[nHard+1,nHard-1,nHard+3].filter(function(v){return v>=3&&v!==nHard;});
      return{tema:'Tema 1',tipo:'mc',
        enun:'Num polígono regular, cada ângulo interno mede <strong>'+intAngH+'\xb0</strong>. Quantos lados tem?',
        opcoes:sh3([nHard].concat(wnd.slice(0,3))),resposta:nHard,
        expl:'Ângulo interno = (n\u22122)\xd7180\xb0 \xf7 n = '+intAngH+'\xb0.\n(n\u22122)\xd7180 = '+intAngH+'n.\n180n\u2212360 = '+intAngH+'n.\n'+(180-intAngH)+'n = 360.\nn = '+nHard+'.'};
    }
    if(variant===1){
      var wext=[extAngH+5,extAngH-5,180-extAngH].filter(function(v){return v>0&&v!==extAngH;});
      return{tema:'Tema 1',tipo:'mc',
        enun:'Num polígono regular com ângulo interno de <strong>'+intAngH+'\xb0</strong>, qual é o ângulo externo?',
        opcoes:sh3([extAngH].concat(wext.slice(0,3))),resposta:extAngH,
        expl:'Primeiro encontrar n: n = 360 \xf7 (180 \u2212 '+intAngH+') = 360 \xf7 '+(180-intAngH)+' = '+nHard+'.\nÂngulo externo = 360\xb0 \xf7 n = 360\xb0 \xf7 '+nHard+' = '+extAngH+'\xb0.\nOu mais direto: ext = 180\xb0 \u2212 int = 180\xb0 \u2212 '+intAngH+'\xb0 = '+extAngH+'\xb0.'};
    }
    var nH2=[5,6,8,10,12][rnd3(0,4)];
    var siH2=(nH2-2)*180;
    var extH2=Math.round(360/nH2);
    var wh2=[extH2+10,extH2-5,extH2+20].filter(function(v){return v>0&&v!==extH2;});
    return{tema:'Tema 1',tipo:'mc',
      enun:'A soma dos ângulos internos de um polígono regular é <strong>'+siH2+'\xb0</strong>. Qual é a amplitude do ângulo externo?',
      opcoes:sh3([extH2].concat(wh2.slice(0,3))),resposta:extH2,
      expl:'Passo 1: encontrar n.\n(n\u22122)\xd7180 = '+siH2+' \u2192 n\u22122 = '+(siH2/180)+' \u2192 n = '+nH2+'.\nPasso 2: ângulo externo = 360\xb0 \xf7 '+nH2+' = '+extH2+'\xb0.'};
  }

  // TEMA 2 — Ângulos externos
  if(tema==='2'){
    var nRange=easy?[3,4,5,6,8]:[5,6,7,8,9,10,12,15];
    var n=nRange[rnd3(0,nRange.length-1)];
    var ext=Math.round(360/n);var int=180-ext;
    var variant=rnd3(0,3);
    if(variant===0){
      if(tipo==='fill') return{tema:'Tema 2',tipo:'fill',
        enun:'Num polígono regular com <strong>'+n+' lados</strong>, qual é a amplitude do ângulo externo (em graus)?',
        resposta:ext,expl:'Fórmula: â_ext = 360\xb0 \xf7 n.\nâ_ext = 360\xb0 \xf7 '+n+' = '+ext+'\xb0.'};
      var w=sh3([ext+rnd3(5,15),ext-rnd3(5,10),360-ext].filter(function(v){return v>0&&v!==ext;})).slice(0,3);
      return{tema:'Tema 2',tipo:'mc',
        enun:'Num polígono regular com '+n+' lados, qual é a amplitude do ângulo externo?',
        opcoes:sh3([ext].concat(w)),resposta:ext,expl:'â_ext = 360\xb0 \xf7 '+n+' = '+ext+'\xb0.'};
    }
    if(variant===1){
      var w=[n+1,n-1,n+2].filter(function(v){return v>=3&&v!==n;});
      return{tema:'Tema 2',tipo:'mc',
        enun:'Um polígono regular tem ângulo externo de '+ext+'\xb0. Quantos lados tem?',
        opcoes:sh3([n].concat(w.slice(0,3))),resposta:n,
        expl:'n = 360\xb0 \xf7 â_ext = 360\xb0 \xf7 '+ext+'\xb0 = '+n+' lados.'};
    }
    if(variant===2){
      return{tema:'Tema 2',tipo:'mc',
        enun:'Um polígono regular tem ângulo externo de '+ext+'\xb0. Qual é o ângulo interno?',
        opcoes:sh3([int,ext,180,360-ext].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<360;})),
        resposta:int,expl:'Ângulo interno + externo = 180\xb0 (são suplementares).\nâ_int = 180\xb0 \u2212 '+ext+'\xb0 = '+int+'\xb0.'};
    }
    return{tema:'Tema 2',tipo:'vf',
      enun:'V/F: <em>"A soma dos ângulos externos de qualquer polígono convexo é sempre 360\xb0"</em>',
      resposta:'V',expl:'Afirmação VERDADEIRA.\nIndependentemente do número de lados, a soma dos ângulos externos de qualquer polígono convexo é sempre 360\xb0.\nEx: triângulo \u2014 3 \xd7 120\xb0 = 360\xb0; quadrado \u2014 4 \xd7 90\xb0 = 360\xb0.'};
  }

  // TEMA 3 — Retas paralelas e ângulos
  // facil:   identificar UMA relação nomeada (qual é o alterno interno?)
  // medio:   calcular o valor com UM passo (suplementares + alternos)
  // dificil: calcular com DOIS passos (co-internos → suplementares → correspondentes)
  if(tema==='3'){
    var ang=rnd3(easy?35:20, easy?145:160);
    var supl=180-ang;

    // ── FÁCIL: identificar relação ──
    if(easy){
      var variant=rnd3(0,3);
      if(variant===0){
        return{tema:'Tema 3',tipo:'mc',
          visual: svgParallelLines({markedAngle:0, markedValue:ang}),
          enun:'No diagrama, r \u2225 s e t é a transversal. O ângulo assinalado mede <strong>'+ang+'\xb0</strong>. Qual é o ângulo <em>alterno interno</em>?',
          opcoes:sh3([ang+'\xb0', supl+'\xb0', '90\xb0', (ang+15)+'\xb0'].filter(function(v,i,a){return a.indexOf(v)===i;})).slice(0,4),
          resposta:ang+'\xb0',
          expl:'Ângulos alternos internos são iguais quando as retas são paralelas.\nO ângulo alterno interno também mede '+ang+'\xb0.'};
      }
      if(variant===1){
        return{tema:'Tema 3',tipo:'mc',
          visual: svgParallelLines({markedAngle:1, markedValue:ang}),
          enun:'No diagrama, r \u2225 s. O ângulo \u03b1\u2082 mede <strong>'+ang+'\xb0</strong>. Qual é o ângulo <em>co-interno</em> correspondente?',
          opcoes:sh3([supl+'\xb0', ang+'\xb0', '180\xb0', (ang-10)+'\xb0'].filter(function(v,i,a){return a.indexOf(v)===i&&parseInt(v)>0;})).slice(0,4),
          resposta:supl+'\xb0',
          expl:'Ângulos co-internos (colaterais internos) são suplementares \u2014 somam 180\xb0.\nCo-interno = 180\xb0 \u2212 '+ang+'\xb0 = '+supl+'\xb0.'};
      }
      if(variant===2){
        return{tema:'Tema 3',tipo:'mc',
          visual: svgParallelLines({markedAngle:0, markedValue:ang}),
          enun:'Duas retas intersectam-se. Um ângulo mede <strong>'+ang+'\xb0</strong>. O ângulo <em>verticalmente oposto</em> mede:',
          opcoes:sh3([ang+'\xb0', supl+'\xb0', '90\xb0', (ang+20)+'\xb0'].filter(function(v,i,a){return a.indexOf(v)===i&&parseInt(v)>0;})).slice(0,4),
          resposta:ang+'\xb0',
          expl:'Ângulos verticalmente opostos são sempre iguais.\nSe um mede '+ang+'\xb0, o oposto também mede '+ang+'\xb0.'};
      }
      return{tema:'Tema 3',tipo:'mc',
        visual: svgParallelLines({markedAngle:0, markedValue:ang}),
        enun:'No diagrama, r \u2225 s cortadas por t. O ângulo \u03b1\u2081 mede <strong>'+ang+'\xb0</strong>. Qual é o ângulo <em>correspondente</em> \u03b2\u2081?',
        opcoes:sh3([ang+'\xb0', supl+'\xb0', '180\xb0', (ang+10)+'\xb0'].filter(function(v,i,a){return a.indexOf(v)===i&&parseInt(v)>0;})).slice(0,4),
        resposta:ang+'\xb0',
        expl:'Ângulos correspondentes são iguais quando as retas são paralelas.\n\u03b2\u2081 = \u03b1\u2081 = '+ang+'\xb0.'};
    }

    // ── MÉDIO: calcular valor com um passo ──
    if(!hard){
      var variant=rnd3(0,3);
      if(variant===0){
        return{tema:'Tema 3',tipo:'mc',
          visual: svgParallelLines({markedAngle:0, markedValue:ang}),
          enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b1\u2081 mede <strong>'+ang+'\xb0</strong>. Quanto mede o ângulo alterno interno \u03b2\u2083?',
          opcoes:sh3([ang,supl,90,ang+10].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<=180;})).slice(0,4),
          resposta:ang,
          expl:'Alternos internos são iguais quando as retas são paralelas.\n\u03b2\u2083 = \u03b1\u2081 = '+ang+'\xb0.'};
      }
      if(variant===1){
        return{tema:'Tema 3',tipo:'mc',
          visual: svgParallelLines({markedAngle:1, markedValue:ang}),
          enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b1\u2082 mede <strong>'+ang+'\xb0</strong>. Quanto mede o ângulo co-interno \u03b2\u2081?',
          opcoes:sh3([supl,ang,180,90].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<=180;})).slice(0,4),
          resposta:supl,
          expl:'Co-internos (colaterais internos) são suplementares \u2014 somam 180\xb0.\n\u03b2\u2081 + \u03b1\u2082 = 180\xb0.\n\u03b2\u2081 = 180\xb0 \u2212 '+ang+'\xb0 = '+supl+'\xb0.'};
      }
      if(variant===2){
        return{tema:'Tema 3',tipo:'fill',
          visual: svgParallelLines({markedAngle:0, markedValue:ang}),
          enun:'Retas paralelas cortadas por uma transversal. O ângulo \u03b1\u2081 mede <strong>'+ang+'\xb0</strong>. O ângulo adjacente \u03b1\u2082 (suplementar) mede ___\xb0.',
          resposta:supl,
          expl:'Ângulos suplementares somam 180\xb0.\n\u03b1\u2082 = 180\xb0 \u2212 \u03b1\u2081 = 180\xb0 \u2212 '+ang+'\xb0 = '+supl+'\xb0.'};
      }
      return{tema:'Tema 3',tipo:'mc',
        visual: svgParallelLines({markedAngle:0, markedValue:ang}),
        enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b1\u2081 mede <strong>'+ang+'\xb0</strong>. Quanto mede o ângulo correspondente \u03b2\u2081?',
        opcoes:sh3([ang,supl,180,ang+5].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<=180;})).slice(0,4),
        resposta:ang,
        expl:'Ângulos correspondentes são iguais quando as retas são paralelas.\n\u03b2\u2081 = \u03b1\u2081 = '+ang+'\xb0.'};
    }

    // ── DIFÍCIL: calcular com dois passos ──
    var variant=rnd3(0,2);
    if(variant===0){
      return{tema:'Tema 3',tipo:'mc',
        visual: svgParallelLines({markedAngle:0, markedValue:ang}),
        enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b1\u2081 mede <strong>'+ang+'\xb0</strong>. Usando duas relações angulares, determina o ângulo \u03b2\u2082.',
        opcoes:sh3([supl,ang,90,ang-10].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<180;})).slice(0,4),
        resposta:supl,
        expl:'Passo 1: \u03b1\u2082 é suplementar de \u03b1\u2081 \u2192 \u03b1\u2082 = 180\xb0 \u2212 '+ang+'\xb0 = '+supl+'\xb0.\nPasso 2: \u03b2\u2082 é correspondente de \u03b1\u2082 (retas paralelas) \u2192 \u03b2\u2082 = \u03b1\u2082 = '+supl+'\xb0.'};
    }
    if(variant===1){
      return{tema:'Tema 3',tipo:'fill',
        visual: svgParallelLines({markedAngle:1, markedValue:ang}),
        enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b1\u2082 mede <strong>'+ang+'\xb0</strong>. Determina \u03b2\u2083 usando duas relações: primeiro os correspondentes, depois os suplementares.',
        resposta:supl,
        expl:'Passo 1: \u03b2\u2082 é correspondente de \u03b1\u2082 (retas paralelas) \u2192 \u03b2\u2082 = '+ang+'\xb0.\nPasso 2: \u03b2\u2083 é suplementar de \u03b2\u2082 \u2192 \u03b2\u2083 = 180\xb0 \u2212 '+ang+'\xb0 = '+supl+'\xb0.'};
    }
    return{tema:'Tema 3',tipo:'mc',
      visual: svgParallelLines({markedAngle:6, markedValue:ang}),
      enun:'Retas r \u2225 s cortadas por t. O ângulo \u03b2\u2083 mede <strong>'+ang+'\xb0</strong>. Qual é o ângulo \u03b1\u2081? (Usa dois passos: alternos internos e, se necessário, suplementares.)',
      opcoes:sh3([ang,supl,180-ang+5,ang+15].filter(function(v,i,a){return a.indexOf(v)===i&&v>0&&v<180;})).slice(0,4),
      resposta:ang,
      expl:'Passo 1: \u03b2\u2083 e \u03b1\u2081 são alternos internos (entre as paralelas, em lados opostos da transversal) \u2192 \u03b1\u2081 = \u03b2\u2083 = '+ang+'\xb0.\nVerificação: \u03b1\u2081 e \u03b2\u2081 são co-internos \u2192 '+ang+'\xb0 + \u03b2\u2081 = 180\xb0 \u2192 \u03b2\u2081 = '+supl+'\xb0.'};
  }

  // TEMA 4 — Quadriláteros
  if(tema==='4'){
    var facts=[
      {q:'Num paralelogramo, dois ângulos opostos medem 70\xb0. Os outros dois medem:',ops:['110\xb0','70\xb0','90\xb0','140\xb0'],c:'110\xb0',e:'Ângulos adjacentes num paralelogramo são suplementares: somam 180\xb0.\n180\xb0\u221270\xb0=110\xb0.'},
      {q:'Um trapézio isósceles tem ângulo de base 65\xb0. O outro ângulo da mesma base mede:',ops:['65\xb0','115\xb0','90\xb0','130\xb0'],c:'65\xb0',e:'Num trapézio isósceles, os ângulos da mesma base são iguais.'},
      {q:'Qual é a propriedade que distingue o losango do retângulo?',ops:['4 lados iguais (losango) vs 4 ângulos retos (retângulo)','Ambos têm diagonais iguais','O losango não tem lados paralelos','O retângulo não é paralelogramo'],c:'4 lados iguais (losango) vs 4 ângulos retos (retângulo)',e:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.'},
      {q:'No paralelogramo, as diagonais:',ops:['Bissetam-se mutuamente','São sempre iguais','São sempre perpendiculares','Não se intersectam'],c:'Bissetam-se mutuamente',e:'Num paralelogramo as diagonais bissetam-se.'},
      {q:'Qual dos seguintes quadriláteros tem as diagonais perpendiculares?',ops:['Losango','Retângulo','Trapézio','Qualquer paralelogramo'],c:'Losango',e:'O losango tem as diagonais perpendiculares (formam 90\xb0).'},
      {q:'Um quadrilátero tem ângulos 90\xb0, 80\xb0 e 110\xb0. O quarto ângulo mede:',ops:['80\xb0','70\xb0','100\xb0','90\xb0'],c:'80\xb0',e:'Soma dos ângulos internos de um quadrilátero é 360\xb0.\nQuarto ângulo = 360\xb0\u221290\xb0\u221280\xb0\u2212110\xb0 = 80\xb0.'},
      {q:'O quadrado é simultaneamente:',ops:['Losango e retângulo','Losango e trapézio','Retângulo e trapézio','Apenas losango'],c:'Losango e retângulo',e:'O quadrado tem 4 lados iguais (\u2192 losango) e 4 ângulos retos (\u2192 retângulo).'},
      {q:'Num losango com diagonal maior 12 cm e menor 8 cm, a área é:',ops:['48 cm\xb2','96 cm\xb2','40 cm\xb2','24 cm\xb2'],c:'48 cm\xb2',e:'Área do losango = (d\u2081 \xd7 d\u2082) / 2.\nA = (12 \xd7 8) / 2 = 48 cm\xb2.'},
    ];
    if(hard) facts.push(
      {q:'Num trapézio isósceles, a soma dos ângulos adjacentes a uma perna é:',ops:['180\xb0','360\xb0','90\xb0','270\xb0'],c:'180\xb0',e:'Ângulos co-internos num trapézio são suplementares: somam 180\xb0.'},
      {q:'Num paralelogramo ABCD, AB = 8 cm e BC = 5 cm. Perímetro?',ops:['26 cm','40 cm','13 cm','20 cm'],c:'26 cm',e:'P = 2\xd7AB + 2\xd7BC = 16+10 = 26 cm.'}
    );
    var f=facts[rnd3(0,facts.length-1)];
    return{tema:'Tema 4',tipo:'mc',enun:f.q,opcoes:sh3(f.ops),resposta:f.c,expl:f.e};
  }

  // TEMA 5 — Áreas
  if(tema==='5'){
    var fig=rnd3(0,easy?3:5);
    if(fig===0){
      var b=rnd3(2,easy?10:20),h=rnd3(2,easy?10:15),a=b*h/2;
      var variant=rnd3(0,2);
      if(variant===0||tipo==='fill') return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h,'cm (\xf72)'):null,
        enun:'Calcula a área de um triângulo com base <strong>'+b+' cm</strong> e altura <strong>'+h+' cm</strong>.',
        resposta:a,expl:'A = (base \xd7 altura) / 2 = ('+b+' \xd7 '+h+') / 2 = '+(b*h)+' / 2 = '+a+' cm\xb2.'};
      if(variant===1){
        var w=sh3([h+2,h-1,h+4].filter(function(v){return v>0&&v!==h;})).slice(0,3);
        return{tema:'Tema 5',tipo:'mc',
          enun:'Um triângulo tem base '+b+' cm e área '+a+' cm\xb2. Qual é a altura?',
          opcoes:sh3([h].concat(w)),resposta:h,
          expl:'h = (2 \xd7 A) / b = (2 \xd7 '+a+') / '+b+' = '+h+' cm.'};
      }
      var w=sh3([a+b,a-1,a*2].filter(function(v){return v>0&&v!==a;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:'Área do triângulo: base = '+b+' cm, altura = '+h+' cm',
        opcoes:sh3([a].concat(w)),resposta:a,expl:'A = ('+b+' \xd7 '+h+') / 2 = '+a+' cm\xb2.'};
    }
    if(fig===1){
      var b=rnd3(3,easy?12:20),h=rnd3(2,easy?8:12),a=b*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:'Área do paralelogramo: base <strong>'+b+' cm</strong>, altura <strong>'+h+' cm</strong>.',
        resposta:a,expl:'A = base \xd7 altura = '+b+' \xd7 '+h+' = '+a+' cm\xb2.'};
      var w=sh3([a+h,a-b,a*2].filter(function(v){return v>0&&v!==a;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        visual: b<=12&&h<=10?svgAreaGrid(b,h):null,
        enun:'Área do paralelogramo: base = '+b+' cm, altura = '+h+' cm',
        opcoes:sh3([a].concat(w)),resposta:a,expl:'A = '+b+' \xd7 '+h+' = '+a+' cm\xb2.'};
    }
    if(fig===2){
      var b1=rnd3(3,easy?10:15),b2=b1+rnd3(2,6),h=rnd3(2,easy?8:10);
      var a=(b1+b2)/2*h;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:'Trapézio com bases <strong>'+b1+' cm</strong> e <strong>'+b2+' cm</strong>, altura <strong>'+h+' cm</strong>. Calcula a área.',
        resposta:a,expl:'A = (B + b) / 2 \xd7 h = ('+b1+' + '+b2+') / 2 \xd7 '+h+' = '+((b1+b2)/2)+' \xd7 '+h+' = '+a+' cm\xb2.'};
      var w=sh3([a+h,b1*b2,a-2].filter(function(v){return v>0&&v!==a;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:'Trapézio: bases '+b1+' cm e '+b2+' cm, altura '+h+' cm. Área?',
        opcoes:sh3([a].concat(w)),resposta:a,expl:'A = ('+b1+'+'+b2+')/2 \xd7 '+h+' = '+a+' cm\xb2.'};
    }
    if(fig===3){
      var d1=rnd3(4,easy?12:20),d2=rnd3(3,easy?10:14),a=d1*d2/2;
      if(tipo==='fill'||rnd3(0,1)===0) return{tema:'Tema 5',tipo:'fill',
        enun:'Losango com diagonais <strong>'+d1+' cm</strong> e <strong>'+d2+' cm</strong>. Calcula a área.',
        resposta:a,expl:'A = (d\u2081 \xd7 d\u2082) / 2 = ('+d1+' \xd7 '+d2+') / 2 = '+a+' cm\xb2.'};
      var w=sh3([d1*d2,a+d1,a-d2].filter(function(v){return v>0&&v!==a;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:'Losango: diagonais '+d1+' cm e '+d2+' cm. Área?',
        opcoes:sh3([a].concat(w)),resposta:a,expl:'A = ('+d1+'\xd7'+d2+')/2 = '+a+' cm\xb2.'};
    }
    if(fig===4){
      var r=rnd3(2,easy?8:12);var ap=parseFloat((Math.PI*r*r).toFixed(1));
      var w=sh3([parseFloat((Math.PI*r).toFixed(1)),parseFloat((2*Math.PI*r).toFixed(1)),r*r].filter(function(v){return v!==ap;})).slice(0,3);
      return{tema:'Tema 5',tipo:'mc',
        enun:'Área do círculo com raio '+r+' cm (\u03c0 \u2248 3,14):',
        opcoes:sh3([ap].concat(w)),resposta:ap,
        expl:'A = \u03c0 \xd7 r\xb2 = \u03c0 \xd7 '+r+'\xb2 \u2248 3,14 \xd7 '+(r*r)+' \u2248 '+ap+' cm\xb2.'};
    }
    var r=rnd3(2,easy?6:10);var a=parseFloat((Math.PI*r*r/2).toFixed(1));
    var w=sh3([parseFloat((Math.PI*r*r).toFixed(1)),parseFloat((Math.PI*r).toFixed(1)),r*r].filter(function(v){return v!==a;})).slice(0,3);
    return{tema:'Tema 5',tipo:'mc',
      enun:'Área do semicírculo com raio '+r+' cm (\u03c0 \u2248 3,14):',
      opcoes:sh3([a].concat(w)),resposta:a,
      expl:'Área do semicírculo = (\u03c0 \xd7 r\xb2) / 2 \u2248 (3,14 \xd7 '+(r*r)+') / 2 \u2248 '+a+' cm\xb2.'};
  }

  return buildEx3('1','mc',dif);
}

// ── JOGOS (unique to cap3) ──

// ── clf3 polygon classification game ──
var _clf3Data=[
  {n:3,nome:'triângulo',s:180},{n:4,nome:'quadrilátero',s:360},
  {n:5,nome:'pentágono',s:540},{n:6,nome:'hexágono',s:720},
  {n:7,nome:'heptágono',s:900},{n:8,nome:'octógono',s:1080}
];
function clf3Nova(){
  var item=_clf3Data[Math.floor(Math.random()*_clf3Data.length)];
  var q=document.getElementById('clf3-q');
  var fb=document.getElementById('clf3-fb');
  if(!q||!fb)return;
  delete q.dataset.done;
  fb.className='feedback';fb.innerHTML='';
  document.getElementById('clf3-q-text').innerHTML=
    'A soma dos ângulos internos de um polígono é <strong>'+item.s+'\xb0</strong>. Qual é o polígono?';
  var others=_clf3Data.filter(function(d){return d.n!==item.n;});
  var shuffled=others.sort(function(){return Math.random()-.5;}).slice(0,3);
  var opts=shuffled.concat([item]).sort(function(){return Math.random()-.5;});
  var optsEl=document.getElementById('clf3-opts');
  optsEl.innerHTML='';
  opts.forEach(function(o){
    var btn=document.createElement('button');
    btn.className='option-btn';
    btn.textContent=o.nome;
    btn.onclick=function(){checkClf3(btn,o.n===item.n,item.nome);};
    optsEl.appendChild(btn);
  });
}
document.addEventListener('DOMContentLoaded',function(){clf3Nova();});
function checkClf3(btn,isC,correct){
  var q=document.getElementById('clf3-q');
  if(!q||q.dataset.done)return;
  q.dataset.done='1';
  q.querySelectorAll('.option-btn').forEach(function(b){b.disabled=true;});
  if(isC)btn.classList.add('correct');
  else{btn.classList.add('wrong');q.querySelectorAll('.option-btn').forEach(function(b){if(b.textContent.includes(correct))b.classList.add('correct');});}
  var fb=document.getElementById('clf3-fb');
  if(!fb)return;
  fb.className='feedback show '+(isC?'correct-fb':'wrong-fb');
  fb.innerHTML=makeFeedbackHTML(isC,'',undefined,undefined);
}


// ── CALCULADORA DE ÂNGULOS (unique to cap3) ──
function calcAngulos3(){
  var n=parseInt(document.getElementById('ang-lados').value)||0;
  var el=document.getElementById('ang-resultado');
  if(n<3){el.style.display='block';el.innerHTML='<i class="ph ph-warning"></i> Um polígono tem no mínimo 3 lados.';el.className='highlight-box';return;}
  var si=(n-2)*180;
  var intReg=si/n;
  var extReg=360/n;
  el.style.display='block';
  el.className='highlight-box green';
  el.innerHTML='<strong>Polígono com '+n+' lados:</strong><br>'+
    '<i class="ph ph-ruler"></i> Soma dos ângulos <strong>internos</strong>: ('+n+'\u22122)\xd7180\xb0 = <strong>'+si+'\xb0</strong><br>'+
    '\u21bb Soma dos ângulos <strong>externos</strong>: sempre <strong>360\xb0</strong><br>'+
    '\u2736 Ângulo interno (polígono regular): '+si+'\xb0\xf7'+n+' = <strong>'+intReg.toFixed(2)+'\xb0</strong><br>'+
    '\u2736 Ângulo externo (polígono regular): 360\xb0\xf7'+n+' = <strong>'+extReg.toFixed(2)+'\xb0</strong>';
}

function atualizarCamposArea3(){
  var fig=document.getElementById('area-figura').value;
  var map={
    triangulo:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Base (cm): <input type="number" id="ar-triangulo-b" class="fill-input" style="width:80px" value="6"></label>'+
      '<label>Altura (cm): <input type="number" id="ar-triangulo-h" class="fill-input" style="width:80px" value="4"></label>'+
      '</div>',
    paralelogramo:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Base (cm): <input type="number" id="ar-paralelogramo-b" class="fill-input" style="width:80px" value="8"></label>'+
      '<label>Altura (cm): <input type="number" id="ar-paralelogramo-h" class="fill-input" style="width:80px" value="5"></label>'+
      '</div>',
    trapezio:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Base maior (cm): <input type="number" id="ar-b1" class="fill-input" style="width:80px" value="10"></label>'+
      '<label>Base menor (cm): <input type="number" id="ar-b2" class="fill-input" style="width:80px" value="6"></label>'+
      '<label>Altura (cm): <input type="number" id="ar-trapezio-h" class="fill-input" style="width:80px" value="4"></label>'+
      '</div>',
    losango:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Diagonal 1 (cm): <input type="number" id="ar-d1" class="fill-input" style="width:80px" value="8"></label>'+
      '<label>Diagonal 2 (cm): <input type="number" id="ar-d2" class="fill-input" style="width:80px" value="6"></label>'+
      '</div>',
    circulo:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Raio (cm): <input type="number" id="ar-circulo-r" class="fill-input" style="width:80px" value="5"></label>'+
      '</div>',
    semicirculo:'<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:.5rem">'+
      '<label>Raio (cm): <input type="number" id="ar-semicirculo-r" class="fill-input" style="width:80px" value="4"></label>'+
      '</div>',
  };
  document.getElementById('area-campos').innerHTML=map[fig]||'';
  document.getElementById('area-resultado').style.display='none';
}
function calcArea3(){
  var fig=document.getElementById('area-figura').value;
  var el=document.getElementById('area-resultado');
  var campos=document.getElementById('area-campos');
  if(!campos||!campos.querySelector('input')){atualizarCamposArea3();}
  el.style.display='block';el.className='highlight-box green';
  var g=function(id){var e=document.getElementById(id);return e?parseFloat(e.value)||0:0;};
  var area=0,formula='';
  if(fig==='triangulo'){var b=g('ar-triangulo-b'),h=g('ar-triangulo-h');area=b*h/2;formula='('+b+'\xd7'+h+')/2 = '+area;}
  else if(fig==='paralelogramo'){var b=g('ar-paralelogramo-b'),h=g('ar-paralelogramo-h');area=b*h;formula=b+'\xd7'+h+' = '+area;}
  else if(fig==='trapezio'){var b1=g('ar-b1'),b2=g('ar-b2'),h=g('ar-trapezio-h');area=(b1+b2)/2*h;formula='('+b1+'+'+b2+')/2\xd7'+h+' = '+area;}
  else if(fig==='losango'){var d1=g('ar-d1'),d2=g('ar-d2');area=d1*d2/2;formula='('+d1+'\xd7'+d2+')/2 = '+area;}
  else if(fig==='circulo'){var r=g('ar-circulo-r');area=parseFloat((Math.PI*r*r).toFixed(2));formula='\u03c0\xd7'+r+'\xb2 \u2248 '+area;}
  else if(fig==='semicirculo'){var r=g('ar-semicirculo-r');area=parseFloat((Math.PI*r*r/2).toFixed(2));formula='(\u03c0\xd7'+r+'\xb2)/2 \u2248 '+area;}
  el.innerHTML='<strong>Área = '+formula+' cm\xb2</strong>';
}

function atualizarCamposAngPol3(){
  var n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  var html='';
  for(var i=1;i<n;i++){
    html+='<label style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.9rem">Ângulo '+i+': <input type="number" id="angpol-'+i+'" class="fill-input" style="width:80px" placeholder="graus"> \xb0</label>';
  }
  document.getElementById('ang-campos-pol').innerHTML=html;
  document.getElementById('ang-pol-resultado').style.display='none';
}
function calcAngDesconhecido3(){
  var n=parseInt(document.getElementById('ang-tipo-pol').value)||4;
  var si=(n-2)*180;
  var soma=0,valid=true;
  for(var i=1;i<n;i++){
    var angpolEl=document.getElementById('angpol-'+i);
    var v=angpolEl?parseFloat(angpolEl.value):NaN;
    if(isNaN(v)||v<=0){valid=false;break;}
    soma+=v;
  }
  var el=document.getElementById('ang-pol-resultado');
  el.style.display='block';
  if(!valid){el.className='highlight-box';el.innerHTML='<i class="ph ph-warning"></i> Preenche todos os ângulos conhecidos.';return;}
  var faltante=si-soma;
  if(soma>=si){
    el.className='highlight-box';
    el.innerHTML='<i class="ph ph-warning"></i> A soma dos ângulos introduzidos ('+soma+'\xb0) já iguala ou ultrapassa os '+si+'\xb0 totais \u2014 verifica os valores.';
    return;
  }
  if(faltante<=0||faltante>=180){el.className='highlight-box';el.innerHTML='<i class="ph ph-warning"></i> Valores inválidos \u2014 verifica os ângulos introduzidos.';return;}
  el.className='highlight-box green';
  el.innerHTML='<strong>Ângulo desconhecido = '+si+'\xb0 \u2212 '+soma+'\xb0 = <span style="font-size:1.1em">'+faltante+'\xb0</span></strong><br><small style="color:var(--ink3)">S<sub>i</sub> = ('+n+'\u22122)\xd7180\xb0 = '+si+'\xb0</small>';
}

// ── FLASHCARDS DATA ──
var FC3_CARDS=[
  {tag:'Fórmula',q:'Soma dos ângulos internos de um polígono convexo com n lados',a:'S = (n \u2212 2) \xd7 180\xb0\nEx: pentágono \u2192 (5\u22122)\xd7180 = 540\xb0'},
  {tag:'Fórmula',q:'Amplitude de cada ângulo interno de um polígono regular com n lados',a:'\xe2 = (n\u22122)\xd7180\xb0 \xf7 n\nEx: hexágono \u2192 720\xf76 = 120\xb0'},
  {tag:'Regra',q:'Qual é a soma dos ângulos externos de qualquer polígono convexo?',a:'Sempre 360\xb0, independentemente do número de lados.'},
  {tag:'Fórmula',q:'Como calcular o número de lados dado o ângulo externo de um polígono regular?',a:'n = 360\xb0 \xf7 â_ext\nEx: â_ext = 45\xb0 \u2192 n = 360\xf745 = 8 (octógono)'},
  {tag:'Definição',q:'O que são ângulos alternos internos?',a:'Ângulos formados entre retas paralelas, em lados opostos da secante. São iguais quando as retas são paralelas.'},
  {tag:'Definição',q:'O que são ângulos verticalmente opostos?',a:'Ângulos formados na interseção de duas retas, em lados opostos. São sempre iguais (congruentes).'},
  {tag:'Regra',q:'O que são ângulos co-internos (colaterais)?',a:'Ângulos entre retas paralelas, do mesmo lado da secante. A sua soma é sempre 180\xb0 (são suplementares).'},
  {tag:'Propriedade',q:'Propriedades do paralelogramo',a:'\u2022 Lados opostos paralelos e iguais\n\u2022 Ângulos opostos iguais\n\u2022 Ângulos adjacentes suplementares\n\u2022 Diagonais bissetam-se'},
  {tag:'Propriedade',q:'O que distingue o losango do retângulo?',a:'Losango: 4 lados iguais, diagonais perpendiculares.\nRetângulo: 4 ângulos retos, diagonais iguais.\nAmbos são paralelogramos.'},
  {tag:'Definição',q:'O que é um trapézio isósceles?',a:'Trapézio com as pernas (lados não paralelos) iguais. Os ângulos da mesma base são iguais.'},
  {tag:'Fórmula',q:'Área do triângulo',a:'A = (base \xd7 altura) \xf7 2'},
  {tag:'Fórmula',q:'Área do paralelogramo',a:'A = base \xd7 altura'},
  {tag:'Fórmula',q:'Área do trapézio',a:'A = (b\u2081 + b\u2082) \xf7 2 \xd7 altura\n(média das bases \xd7 altura)'},
  {tag:'Fórmula',q:'Área do losango ou papagaio',a:'A = (d\u2081 \xd7 d\u2082) \xf7 2\n(produto das diagonais a dividir por 2)'},
  {tag:'Fórmula',q:'Área do círculo e do semicírculo',a:'Círculo: A = \u03c0 \xd7 r\xb2\nSemicírculo: A = (\u03c0 \xd7 r\xb2) \xf7 2'},
  {tag:'Exemplo',q:'Quantos lados tem um polígono cuja soma dos ângulos internos é 1440\xb0?',a:'(n\u22122)\xd7180 = 1440 \u2192 n\u22122 = 8 \u2192 n = 10\nÉ um decágono.'},
  {tag:'Exemplo',q:'Ângulo externo de 24\xb0 \u2014 que polígono é?',a:'n = 360\xf724 = 15 \u2192 Pentadecágono (15 lados)'},
  {tag:'Exemplo',q:'Trapézio com bases 8 e 4 cm, altura 3 cm. Qual é a área?',a:'A = (8+4)/2 \xd7 3 = 6 \xd7 3 = 18 cm\xb2'},
  {tag:'Exemplo',q:'Losango com diagonais 10 cm e 6 cm. Qual é a área?',a:'A = (10\xd76)/2 = 30 cm\xb2'},
  {tag:'Exemplo',q:'Um ângulo mede 65\xb0. Qual é o ângulo co-interno (paralelas cortadas por secante)?',a:'Co-internos são suplementares: 180\xb0 \u2212 65\xb0 = 115\xb0'},
];

// CAP_DATA[3] REGISTRATION — chapter-engine.js integration
window.CAP_DATA[3] = {
  prefix: '3',
  storageKey: 'edupt_cap3',
  viewId: 'view-math3',
  tabsId: 'tabs3',
  temas: [
    'T1 \xb7 Ângulos internos de polígonos',
    'T2 \xb7 Ângulos externos',
    'T3 \xb7 Retas paralelas e ângulos',
    'T4 \xb7 Quadriláteros',
    'T5 \xb7 Áreas'
  ],
  flashcards: FC3_CARDS,
  buildExercicio: function(tema, tipo, dif) { return buildEx3(tema, tipo, dif); },
  questoesPlans: {
    facil:   {temas:['1','1','1','1','2','2','2','3','3','3','4','4','5','5','5','5','1','2','3','4'],
              tipos:['mc','mc','mc','fill','mc','mc','mc','mc','mc','mc','mc','mc','mc','mc','mc','fill','mc','fill','mc','mc']},
    medio:   {temas:['1','1','1','1','2','2','2','3','3','3','4','4','4','5','5','5','1','2','3','5'],
              tipos:['mc','fill','mc','vf','mc','fill','mc','mc','mc','fill','mc','mc','fill','mc','fill','mc','mc','fill','mc','vf']},
    dificil: {temas:['1','1','1','1','2','2','2','2','3','3','3','4','4','4','5','5','5','5','1','2'],
              tipos:['fill','mc','fill','mc','fill','mc','fill','mc','fill','mc','fill','mc','mc','fill','fill','mc','fill','mc','fill','fill']}
  },
  miniPlans: {
    0: [{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'5',tipo:'vf'}],
    1: [{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'}],
    2: [{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'}],
    3: [{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'}],
    4: [{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'}],
    5: [{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'}],
  },
  testePlans: {
    subtema0: {
      facil:   [{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'5',tipo:'mc'}],
      medio:   [{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'1',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'5',tipo:'mc'}],
      dificil: [{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'}]
    },
    subtema1: {facil:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}],
               medio:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}],
               dificil:[{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'vf'},{t:'1',tipo:'mc'},{t:'1',tipo:'fill'},{t:'1',tipo:'mc'},{t:'1',tipo:'mc'},{t:'1',tipo:'vf'},{t:'1',tipo:'fill'}]},
    subtema2: {facil:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}],
               medio:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}],
               dificil:[{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'vf'},{t:'2',tipo:'mc'},{t:'2',tipo:'fill'},{t:'2',tipo:'mc'},{t:'2',tipo:'mc'},{t:'2',tipo:'vf'},{t:'2',tipo:'fill'}]},
    subtema3: {facil:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}],
               medio:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}],
               dificil:[{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'vf'},{t:'3',tipo:'mc'},{t:'3',tipo:'fill'},{t:'3',tipo:'mc'},{t:'3',tipo:'mc'},{t:'3',tipo:'vf'},{t:'3',tipo:'fill'}]},
    subtema4: {facil:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}],
               medio:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}],
               dificil:[{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'vf'},{t:'4',tipo:'mc'},{t:'4',tipo:'fill'},{t:'4',tipo:'mc'},{t:'4',tipo:'mc'},{t:'4',tipo:'vf'},{t:'4',tipo:'fill'}]},
    subtema5: {facil:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}],
               medio:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}],
               dificil:[{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'vf'},{t:'5',tipo:'mc'},{t:'5',tipo:'fill'},{t:'5',tipo:'mc'},{t:'5',tipo:'mc'},{t:'5',tipo:'vf'},{t:'5',tipo:'fill'}]},
  },
  unique: {
    onShowSection: function(id) {
      if(id==='reta3') { atualizarCamposArea3(); atualizarCamposAngPol3(); }
    }
  }
};

// DELEGATION WRAPPERS — auto-generated + cap3-specific extras
_capRegisterWrappers(3, {
  setTeste3Subtema: function(n,btn){capSetTesteSubtema(3,n,btn)},
  gerarTeste3: function(){capGerarTeste(3)},
  setGenLevel3: function(btn){capSetGenLevel(3,btn)},
  exame3Submit: function(){examActive=false},
  showMathView3: function(){
    _hideAllViews();
    document.getElementById('view-math3').style.display='block';
    document.title='Geometria \xb7 3ponto14';
    showSection3('temas3',document.querySelector('#tabs3 .tab-btn'));
    window.scrollTo(0,0);
    var q=document.getElementById('q3-container');if(q&&!q.innerHTML)gerarQuestoes3();
  }
});

/* Visual effects loaded from fx.js */

// ── Topic grid data ──
var _c3Teoria = "showSection3('teoria3',document.querySelector('#tabs3 .tab-btn:nth-child(2)'))";
var _cap3Topics = [
  {id:'tr3-1', num:'01', title:'Ângulos internos de polígonos', open:true, subs:[
    {onclick:_c3Teoria, label:'Fórmula (n\u22122)\xd7180\xb0', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Polígonos regulares', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-2', num:'02', title:'Ângulos externos', subs:[
    {onclick:_c3Teoria, label:'Soma = 360\xb0 (sempre)', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Descobrir n.\xba de lados', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-3', num:'03', title:'Retas paralelas e ângulos', subs:[
    {onclick:_c3Teoria, label:'Alternos, correspondentes, co-internos', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-4', num:'04', title:'Quadriláteros', subs:[
    {onclick:_c3Teoria, label:'Classificação e propriedades', icon:'ph-book-open-text'},
    {onclick:_c3Teoria, label:'Propriedades das diagonais', icon:'ph-book-open-text'}
  ]},
  {id:'tr3-5', num:'05', title:'Áreas de figuras planas', subs:[
    {onclick:_c3Teoria, label:'Fórmulas das áreas', icon:'ph-book-open-text'}
  ]}
];
(function(){
  var el = document.getElementById('cap3-topics-grid');
  if (el) el.innerHTML = _tplTopicGrid(_cap3Topics);
})()
