/* ── systems-games.js — Game constructors (lazy-loaded from systems.js) ── */
function _gameLevelBar(fnKey, prefix, currentLevel, labels) {
  var lvs = ['facil','medio','dificil'];
  var cols = ['#4caf50','#f59e0b','#ef4444'];
  var html = '<div class="level-bar" style="margin:0;padding:0;background:none;border:none;box-shadow:none;gap:.35rem"><div class="gen-level-group">';
  for (var i = 0; i < 3; i++) {
    html += '<button class="gen-level-btn'+(currentLevel===lvs[i]?' active':'')+'" onclick="'+fnKey+'_'+prefix+'Level(\''+lvs[i]+'\',this)">'
      + '<span style="display:inline-block;width:.6em;height:.6em;border-radius:50%;background:'+cols[i]+';vertical-align:middle;flex-shrink:0;margin-right:1px"></span>'
      + (labels && labels[i] ? ' '+labels[i] : '')
      + '</button>';
  }
  html += '</div></div>';
  return html;
}

// JOGO 1 — 4 EM LINHA
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
    html.push(_gameLevelBar(fnKey, 'c4', self.level));
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
      msg('<i class="ph ph-x-circle"></i> Errado! Vez perdida — '+NAMES[nextTurn]+' joga a seguir.');
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
        msg('<i class="ph ph-trophy"></i> '+NAMES[currentTurn]+' ganhou!');
      } else {
        var draw = true;
        for (var cc = 0; cc < COLS; cc++) { if (dropRow(cc) >= 0) { draw = false; break; } }
        if (draw) { self.over = true; render(); msg('<i class="ph ph-handshake"></i> Empate!'); }
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
      '  <span><i class="ph ph-bomb"></i> '+MINES+' minas</span>',
      '  <span><i class="ph ph-check-circle"></i> Reveladas: '+self.safeRevealed+'/'+safe+'</span>',
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
        if (v === -1) { cls += ' mine-hit'; content = '<i class="ph ph-explosion"></i>'; }
        else if (v === 0) { cls += ' safe'; content = ''; }
        else { content = '<span style="color:'+numColors[v]+'">'+v+'</span>'; cls += ' safe'; }
      } else if (flag) { cls += ' flagged'; content = '<i class="ph ph-flag"></i>'; }
      else { cls += ' question-pending'; content = '<span class="mine-q-icon">?</span>'; }
      html.push('<div class="'+cls+'" onclick="'+fnKey+'_mineClick('+r+','+col+')" oncontextmenu="'+fnKey+'_mineFlag('+r+','+col+');return false">'+content+'</div>');
    }
    html.push('</div></div>');
    html.push('<div id="'+containerId+'-q" class="mine-question-box"></div>');
    html.push('<div id="'+containerId+'-msg" style="margin-top:.75rem;font-size:.88rem;font-weight:600;color:var(--c2-mid);min-height:1.5rem"></div>');
    html.push('<div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">');
    html.push('<button class="btn btn-ghost" onclick="'+fnKey+'_mineNew()">↺ Novo Jogo</button>');
    html.push(_gameLevelBar(fnKey, 'mine', self.level));
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
      qBox.innerHTML = '<div style="font-size:.8rem;font-weight:700;color:var(--rose);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem"><i class="ph ph-bomb"></i> Mina! Responde para a desativar:</div>'
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
        if (msg) msg.innerHTML = '<i class="ph ph-explosion"></i> Respondeste errado — mina explodiu! Pontos: <strong>'+self.score+'</strong>';
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
      if (msg) msg.innerHTML = '<i class="ph ph-heart"></i> Mina desativada! +' + (self.level==='facil'?1:self.level==='medio'?2:3) + ' pontos';
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
      if (msg) msg.innerHTML = '<i class="ph ph-trophy"></i> Limpaste o campo! Pontos: <strong>'+self.score+'</strong>';
    }
  }

  init();
}

// JOGO 3 — SUDOKU 4×4 COM OPERAÇÕES (KenKen)
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
    if (!allFilled) msg.innerHTML = '<i class="ph ph-warning"></i> Preenche todas as células primeiro.';
    else if (allCorrect) msg.innerHTML = '<i class="ph ph-trophy"></i> Parabéns! Sudoku resolvido corretamente!';
    else msg.innerHTML = '<i class="ph ph-x-circle"></i> Há erros — verifica as células marcadas a vermelho.';
  };

  window[fnKey+'_sdkNew'] = function() { init(); };

  init();
}

// JOGO 4 — TORRE DE HANOI COM QUESTÕES
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
    html.push(_gameLevelBar(fnKey, 'hanoi', self.level, ['3','4','5']));
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
        setMsg('<i class="ph ph-x-circle"></i> Não podes colocar '+disk+' sobre '+toPeg[toPeg.length-1]+'!');
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
    qDiv.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--c2-mid);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.5rem"><i class="ph ph-tree-structure"></i> Responde para mover o disco:</div>'
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
      setMsg('<i class="ph ph-x-circle"></i> Errado — movimento cancelado!');
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
        setMsg('<i class="ph ph-trophy"></i> Completaste em '+self.moves+' movimentos! (mínimo: '+self.minMoves+')');
      } else {
        render();
        setMsg('<i class="ph ph-check-circle"></i> Disco movido!');
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
