/* ── widgets.js — Shared widgets injected into every chapter page ──
   Print header, Pomodoro timer, Scientific calculator, Unified flashcard stub
   ─────────────────────────────────────────────────────────────────── */
(function(){
  var html = '' +
  '<!-- PRINT HEADER -->' +
  '<div id="print-header">' +
    '<div class="ph-logo">3ponto<em>14</em> · Centro de Estudos</div>' +
    '<div class="ph-meta">Matem\u00e1tica · 7.\u00ba Ano · Ficha de Estudo</div>' +
    '<div class="ph-fields">' +
      '<div class="ph-field"><span class="ph-field-label">Nome:</span><div class="ph-field-line ph-field-line--nome"></div></div>' +
      '<div class="ph-field"><span class="ph-field-label">N.\u00ba:</span><div class="ph-field-line ph-field-line--num"></div></div>' +
      '<div class="ph-field"><span class="ph-field-label">Turma:</span><div class="ph-field-line ph-field-line--turma"></div></div>' +
      '<div class="ph-field"><span class="ph-field-label">Data:</span><div class="ph-field-line ph-field-line--data"></div></div>' +
    '</div>' +
  '</div>' +

  '<!-- UNIFIED FLASHCARD STUB -->' +
  '<div id="ufc-stub" class="hidden" aria-hidden="true">' +
    '<span id="ufc-cap-label"></span><span id="ufc-tag"></span><span id="ufc-q"></span><span id="ufc-a"></span><span id="ufc-counter"></span>' +
    '<div id="ufc-prog"></div>' +
    '<div id="ufc-inner"><div id="ufc-front"></div><div id="ufc-back"></div></div>' +
    '<button id="ufc-flip-btn" tabindex="-1" onclick="_uniFC_flip()">Virar</button>' +
    '<button tabindex="-1" onclick="_uniFC_prev()" aria-label="Carta anterior">\u2190</button>' +
    '<button tabindex="-1" onclick="_uniFC_next()" aria-label="Pr\u00f3xima carta">\u2192</button>' +
    '<button tabindex="-1" onclick="_uniFC_shuffle()" aria-label="Baralhar cartas">\u21ba</button>' +
  '</div>';

  var container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
})();

/* ── _injectPomodoro ── */
function _injectPomodoro() {
  var html = '' +
    '<!-- POMODORO FAB -->' +
    '<button id="pomodoro-fab" onclick="pomodoroTogglePanel()" title="Temporizador Pomodoro" aria-label="Abrir temporizador Pomodoro">\uD83C\uDF45</button>' +
    '<!-- POMODORO PANEL -->' +
    '<div id="pomodoro-widget" class="hidden" role="dialog" aria-label="Temporizador Pomodoro">' +
      '<div id="pomodoro-panel">' +
        '<div class="pom-header">' +
          '<span class="pom-title">\uD83C\uDF45 Pomodoro</span>' +
          '<button class="pom-close" onclick="pomodoroTogglePanel()" aria-label="Fechar">\u2715</button>' +
        '</div>' +
        '<div class="pom-mode-row">' +
          '<button class="pom-mode-btn active" id="pom-btn-focus" onclick="pomodoroSetMode(\'focus\')">Foco</button>' +
          '<button class="pom-mode-btn" id="pom-btn-short" onclick="pomodoroSetMode(\'short\')">Pausa</button>' +
          '<button class="pom-mode-btn" id="pom-btn-long" onclick="pomodoroSetMode(\'long\')">Longa</button>' +
        '</div>' +
        '<div class="pom-clock">' +
          '<svg class="pom-svg" width="100" height="100" viewBox="0 0 100 100">' +
            '<circle class="pom-ring-bg" cx="50" cy="50" r="44"/>' +
            '<circle class="pom-ring-fill" id="pom-ring" cx="50" cy="50" r="44" stroke-dasharray="276.46" stroke-dashoffset="0"/>' +
          '</svg>' +
          '<div class="pom-time-text" id="pom-time">25:00</div>' +
        '</div>' +
        '<div class="pom-session-label" id="pom-session-label">Sess\u00e3o 1 de 4</div>' +
        '<div class="pom-controls">' +
          '<button class="pom-ctrl-btn primary" id="pom-start-btn" onclick="pomodoroStartStop()">\u25b6 Iniciar</button>' +
          '<button class="pom-ctrl-btn secondary" onclick="pomodoroReset()" aria-label="Reiniciar temporizador">\u21ba</button>' +
        '</div>' +
        '<div class="pom-sessions" id="pom-dots">' +
          '<div class="pom-dot" id="pom-d0"></div>' +
          '<div class="pom-dot" id="pom-d1"></div>' +
          '<div class="pom-dot" id="pom-d2"></div>' +
          '<div class="pom-dot" id="pom-d3"></div>' +
        '</div>' +
        '<div class="tip-box">' +
          '<strong class="chip-label">\uD83D\uDCA1 O que \u00e9 a t\u00e9cnica Pomodoro?</strong> ' +
          'Estuda <strong>25 min</strong> com foco total, depois faz uma <strong>pausa de 5 min</strong>. ' +
          'Ap\u00f3s 4 sess\u00f5es, faz uma pausa longa de 15 min. ' +
          'Este ciclo ajuda o c\u00e9rebro a <strong>concentrar-se melhor</strong>, reduzir a fadiga e memorizar mais eficazmente.' +
        '</div>' +
      '</div>' +
    '</div>';

  var el = document.getElementById('inject-pomodoro');
  if (el) {
    el.innerHTML = html;
  } else {
    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }
}

/* ── _injectCalc ── */
function _injectCalc() {
  var html = '' +
    '<!-- CALCULADORA FAB -->' +
    '<button id="calc-fab" onclick="calcToggle()" title="Calculadora cient\u00edfica" aria-label="Calculadora">\uD835\uDC65\u00b2</button>' +
    '<div id="calc-widget">' +
      '<div id="calc-display">' +
        '<div id="calc-fab-expr"></div>' +
        '<div id="calc-result">0</div>' +
      '</div>' +
      '<div class="calc-grid">' +
        '<button class="calc-btn fn" onclick="calcFn(\'sqrt\')">\u221a</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'sq\')">x\u00b2</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'inv\')">1/x</button>' +
        '<button class="calc-btn clr" onclick="calcClear()">AC</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'sin\')">sen</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'cos\')">cos</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'tan\')">tan</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'pi\')">\u03c0</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'log\')">log</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'ln\')">ln</button>' +
        '<button class="calc-btn fn" onclick="calcOp(\'**\')">x\u02b8</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'abs\')">|x|</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'pct\')">%</button>' +
        '<button class="calc-btn fn" onclick="calcFn(\'pm\')">\u00b1</button>' +
        '<button class="calc-btn fn" onclick="calcNum(\'(\')">( </button>' +
        '<button class="calc-btn fn" onclick="calcNum(\')\'"> )</button>' +
        '<button class="calc-btn fn" onclick="calcDel()">\u232b</button>' +
        '<button class="calc-btn op" onclick="calcOp(\'/\')">\u00f7</button>' +
        '<button class="calc-btn op" onclick="calcOp(\'*\')">\u00d7</button>' +
        '<button class="calc-btn op" onclick="calcOp(\'-\')">\u2212</button>' +
        '<button class="calc-btn" onclick="calcNum(\'7\')">7</button>' +
        '<button class="calc-btn" onclick="calcNum(\'8\')">8</button>' +
        '<button class="calc-btn" onclick="calcNum(\'9\')">9</button>' +
        '<button class="calc-btn op" onclick="calcOp(\'+\')">+</button>' +
        '<button class="calc-btn" onclick="calcNum(\'4\')">4</button>' +
        '<button class="calc-btn" onclick="calcNum(\'5\')">5</button>' +
        '<button class="calc-btn" onclick="calcNum(\'6\')">6</button>' +
        '<button class="calc-btn eq" onclick="calcEq()">=</button>' +
        '<button class="calc-btn" onclick="calcNum(\'1\')">1</button>' +
        '<button class="calc-btn" onclick="calcNum(\'2\')">2</button>' +
        '<button class="calc-btn" onclick="calcNum(\'3\')">3</button>' +
        '<button class="calc-btn" onclick="calcNum(\'0\')">0</button>' +
        '<button class="calc-btn" onclick="calcNum(\'.\')">.</button>' +
      '</div>' +
      '<div class="stat-footer">sen/cos/tan em graus &nbsp;\u00b7&nbsp; x\u02b8 = pot\u00eancia</div>' +
    '</div>';

  var el = document.getElementById('inject-calc');
  if (el) {
    el.innerHTML = html;
  } else {
    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  _injectPomodoro();
  _injectCalc();
});
