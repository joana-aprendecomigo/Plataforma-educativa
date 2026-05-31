// pt-figuras.js — Figuras de Estilo, Discurso Direto/Indireto e Conectores
// Português 9.º Ano

/* ══════════════════════════════════════════════════════
   FIGURAS DE ESTILO — DEFINIÇÕES E EXEMPLOS
══════════════════════════════════════════════════════ */
var PT_FIGURAS_INFO = [
  {
    id: 'comparacao',
    nome: 'Comparação',
    def: 'Estabelece uma semelhança entre dois elementos usando palavras de comparação: <em>como, tal como, mais do que, parece</em>.',
    ex: [
      'A sua voz era <em>suave como</em> o vento.',
      'Correu <em>mais depressa do que</em> uma seta.',
      'O silêncio era <em>pesado como</em> chumbo.'
    ],
    dica: 'Tem sempre uma palavra de comparação explícita (como, tal como, mais... do que...).'
  },
  {
    id: 'metafora',
    nome: 'Metáfora',
    def: 'Estabelece uma semelhança entre dois elementos <strong>sem</strong> palavras de comparação — é uma comparação implícita.',
    ex: [
      'A vida é um palco.',
      'Ela tinha pedras no lugar do coração.',
      'Os seus olhos eram estrelas.'
    ],
    dica: 'Sem "como" nem "tal como" — a identificação é direta.'
  },
  {
    id: 'personificacao',
    nome: 'Personificação',
    def: 'Atribui características humanas (sentimentos, ações, voz) a seres inanimados, animais ou conceitos abstratos.',
    ex: [
      'O vento <em>sussurrava</em> segredos entre as árvores.',
      'O sol <em>sorriu</em> para os viajantes.',
      'A morte <em>bateu</em> à porta da família.'
    ],
    dica: 'Um ser não humano faz algo típico de humanos (falar, sorrir, chorar, pensar...).'
  },
  {
    id: 'hiperbole',
    nome: 'Hipérbole',
    def: 'Exagero propositado para intensificar uma ideia ou sentimento.',
    ex: [
      'Tenho saudades que enchem o mundo.',
      'Já te disse isto mil vezes!',
      'Estava tão cansado que morria.'
    ],
    dica: 'Algo impossível ou claramente exagerado para criar efeito expressivo.'
  },
  {
    id: 'antitese',
    nome: 'Antítese',
    def: 'Coloca em oposição duas ideias, palavras ou imagens contrárias na mesma frase ou contexto.',
    ex: [
      'Amores são fogos, que arden sem se ver.',
      'O amor é chama que queima sem arder.',
      'Entre o sim e o não, a vida inteira.'
    ],
    dica: 'Dois opostos: vida/morte, amor/ódio, luz/sombra, frio/calor...'
  },
  {
    id: 'anafora',
    nome: 'Anáfora',
    def: 'Repetição de uma palavra ou expressão no início de frases ou versos consecutivos.',
    ex: [
      '<em>Há</em> fotografias, <em>há</em> pinturas, <em>há</em> esculturas.',
      '<em>Amor</em> é fogo que arde sem se ver,<br><em>Amor</em> é ferida que dói e não se sente.',
      '<em>Nascem</em> os rios, <em>nascem</em> as flores, <em>nascem</em> os homens.'
    ],
    dica: 'A mesma palavra/expressão repete-se no início — cria ritmo e ênfase.'
  },
  {
    id: 'eufemismo',
    nome: 'Eufemismo',
    def: 'Substitui uma palavra ou expressão dura, desagradável ou tabu por uma mais suave.',
    ex: [
      'O pai <em>partiu para uma melhor</em>. (= morreu)',
      'Ele está <em>em dificuldades financeiras</em>. (= é pobre)',
      'Ela ficou <em>grávida sem querer</em>. (= engravidou acidentalmente)'
    ],
    dica: 'Suaviza algo desagradável — morte, pobreza, doença são substituídas por expressões mais delicadas.'
  },
  {
    id: 'aliteracao',
    nome: 'Aliteração',
    def: 'Repetição de sons consonânticos iguais ou semelhantes ao longo de um verso ou frase.',
    ex: [
      '«O rato roeu a rolha da garrafa do rei.»',
      '«Sete cigarras na sarça, sete cigarras serenas.»'
    ],
    dica: 'O mesmo som consonântico repete-se — cria efeito musical ou sonoro.'
  },
  {
    id: 'pleonasmo',
    nome: 'Pleonasmo',
    def: 'Repetição redundante de uma ideia para a reforçar e intensificar.',
    ex: [
      'Vi com os meus próprios <em>olhos</em>.',
      'Subiu para <em>cima</em>.',
      'O silêncio <em>calado</em> da noite.'
    ],
    dica: 'Algo já implícito é dito novamente — a redundância é intencional para dar ênfase.'
  },
  {
    id: 'ironia',
    nome: 'Ironia',
    def: 'Diz-se o contrário do que se pensa, geralmente com intenção crítica ou humorística.',
    ex: [
      '(Sobre um desastre): «Que dia maravilhoso tivemos!»',
      '(A um aluno que errou tudo): «Muito bem, excelente trabalho!»'
    ],
    dica: 'O sentido literal é o oposto do sentido real — contexto revela o verdadeiro significado.'
  }
];

/* ══════════════════════════════════════════════════════
   BANCO DE EXERCÍCIOS — IDENTIFICAR FIGURA
══════════════════════════════════════════════════════ */
var PT_FIGURAS_BANCO = [
  { frase: '«A vida é uma viagem sem regresso.»', correct: 'Metáfora', opts: ['Metáfora','Comparação','Personificação','Hipérbole'], exp: 'Identifica «vida» com «viagem» sem usar palavras de comparação — é uma metáfora.' },
  { frase: '«Ela corria como o vento.»', correct: 'Comparação', opts: ['Comparação','Metáfora','Hipérbole','Personificação'], exp: '«Como o vento» é uma comparação explícita — usa a palavra de comparação «como».' },
  { frase: '«O mar rugiu de raiva toda a noite.»', correct: 'Personificação', opts: ['Personificação','Metáfora','Hipérbole','Comparação'], exp: '«Rugiu de raiva» atribui uma ação e sentimento humanos ao mar — personificação.' },
  { frase: '«Já te disse isto um milhão de vezes!»', correct: 'Hipérbole', opts: ['Hipérbole','Personificação','Ironia','Pleonasmo'], exp: 'Exagero óbvio («um milhão de vezes») para intensificar — hipérbole.' },
  { frase: '«Amor é fogo que arde sem se ver / É ferida que dói e não se sente.» (Camões)', correct: 'Antítese', opts: ['Antítese','Anáfora','Metáfora','Comparação'], exp: 'Coloca opostos em confronto: arde/não se ver, dói/não se sente — antítese. (Também há metáfora, mas a figura dominante deste par é a antítese.)' },
  { frase: '«Há fotografias, há pinturas, há esculturas nesta exposição.»', correct: 'Anáfora', opts: ['Anáfora','Aliteração','Pleonasmo','Hipérbole'], exp: 'Repetição de «há» no início de cada grupo — anáfora.' },
  { frase: '«O avô partiu para uma vida melhor.» (= morreu)', correct: 'Eufemismo', opts: ['Eufemismo','Ironia','Metáfora','Antítese'], exp: 'Substitui «morreu» por uma expressão mais suave — eufemismo.' },
  { frase: '«O silêncio falava mais alto do que as palavras.»', correct: 'Personificação', opts: ['Personificação','Metáfora','Comparação','Hipérbole'], exp: '«O silêncio falava» — atribui a capacidade de falar (humana) ao silêncio — personificação.' },
  { frase: '«Vi com os meus próprios olhos.»', correct: 'Pleonasmo', opts: ['Pleonasmo','Hipérbole','Anáfora','Eufemismo'], exp: '«Próprios olhos» é redundante — vê-se sempre com os olhos. A redundância é intencional para reforçar — pleonasmo.' },
  { frase: '«A lua era uma foice de prata pendurada no céu.»', correct: 'Metáfora', opts: ['Metáfora','Comparação','Personificação','Aliteração'], exp: 'Identifica a lua com uma «foice de prata» sem palavras de comparação — metáfora.' },
  { frase: '«Que bonito dia de chuva!» (dito sarcasticamente)', correct: 'Ironia', opts: ['Ironia','Eufemismo','Hipérbole','Antítese'], exp: 'Diz-se o contrário do que se sente — ironia.' },
  { frase: '«O tempo cura todas as feridas.»', correct: 'Personificação', opts: ['Personificação','Metáfora','Comparação','Hipérbole'], exp: 'Atribui ao «tempo» a capacidade de curar (ação humana/médica) — personificação.' },
  { frase: '«No início da sua intervenção, a locutora recorre a uma <u>enumeração</u>.» — O que é uma enumeração?', correct: 'Lista de elementos do mesmo tipo', opts: ['Lista de elementos do mesmo tipo','Repetição de uma palavra no início de frases','Substituição por expressão mais suave','Comparação sem palavras de comparação'], exp: 'Enumeração é a listagem de vários elementos da mesma categoria — cria um efeito de acumulação.' },
  { frase: '«O orvalho da manhã brilhava como diamantes na erva.»', correct: 'Comparação', opts: ['Comparação','Metáfora','Aliteração','Personificação'], exp: '«Como diamantes» é uma comparação explícita — usa «como» para estabelecer a semelhança.' },
  { frase: '«As pedras, tal como os animais, têm a sua própria memória.»', correct: 'Comparação', opts: ['Comparação','Personificação','Metáfora','Hipérbole'], exp: '«Tal como os animais» é uma comparação explícita. A personificação poderia ser implícita mas a figura identificável é a comparação.' },
  { frase: '«Sete cigarras serenas sussurravam suavemente.»', correct: 'Aliteração', opts: ['Aliteração','Anáfora','Pleonasmo','Assonância'], exp: 'Repetição do som /s/ — aliteração. Cria efeito sonoro e musical.' },
  { frase: '«Chorei rios de lágrimas.»', correct: 'Hipérbole', opts: ['Hipérbole','Metáfora','Comparação','Personificação'], exp: 'Exagero — «rios de lágrimas» é claramente impossível. Intensifica a tristeza — hipérbole.' },
  { frase: '«A felicidade é uma borboleta que, quanto mais a persegues, mais se afasta de ti.»', correct: 'Metáfora', opts: ['Metáfora','Comparação','Personificação','Hipérbole'], exp: 'Identifica «felicidade» com «borboleta» sem usar palavras de comparação — metáfora.' }
];

/* ══════════════════════════════════════════════════════
   MOTOR DAS FIGURAS DE ESTILO
══════════════════════════════════════════════════════ */
var _ptFig = { idx: 0, score: 0, total: 0, answered: false, streak: 0, banco: [] };

function ptFigStart() {
  _ptFig.banco = PT_FIGURAS_BANCO.slice().sort(function(){ return Math.random() - .5; });
  _ptFig.idx = 0;
  _ptFig.score = 0;
  _ptFig.total = 0;
  _ptFig.answered = false;
  _ptFig.streak = 0;
  var menu = document.getElementById('pt-fig-menu');
  var eng = document.getElementById('pt-fig-engine');
  if (menu) menu.style.display = 'none';
  if (eng) eng.style.display = 'block';
  ptFigRender();
}

function ptFigRender() {
  var wrap = document.getElementById('pt-fig-engine');
  if (!wrap) return;
  var banco = _ptFig.banco;
  var idx = _ptFig.idx;
  if (idx >= banco.length) { ptFigFinish(); return; }

  var q = banco[idx];
  var pct = Math.round(idx / banco.length * 100);

  var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">';
  h += '<button onclick="ptFigBack()" style="background:none;border:none;font-size:.78rem;font-weight:700;color:#6b5fa0;cursor:pointer;display:flex;align-items:center;gap:.3rem;padding:0;font-family:Montserrat,sans-serif"><i class="ph ph-arrow-left"></i> Figuras de Estilo</button>';
  h += '<div style="display:flex;align-items:center;gap:.6rem">';
  if (_ptFig.streak >= 3) h += '<span style="font-size:.72rem;font-weight:800;background:#fef3e2;color:#b07030;border:1px solid #f4d99a;padding:3px 8px;border-radius:999px">🔥 ' + _ptFig.streak + '</span>';
  h += '<span style="font-size:.72rem;font-weight:800;background:#e8f5ee;color:#2e7d52;border:1px solid #a8d8b8;padding:3px 8px;border-radius:999px">✓ ' + _ptFig.score + '/' + _ptFig.total + '</span>';
  h += '<span style="font-size:.72rem;color:var(--ink4);font-weight:700">' + (idx+1) + '/' + banco.length + '</span>';
  h += '</div></div>';

  h += '<div style="height:5px;background:var(--border);border-radius:99px;margin-bottom:1.5rem;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#c9a84c,#b07030);border-radius:99px;transition:width .4s"></div></div>';

  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:1.75rem">';
  h += '<div style="font-size:.68rem;font-weight:800;color:#b07030;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem"><i class="ph ph-sparkle"></i> Que figura de estilo é esta?</div>';
  h += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.2rem;line-height:1.8;color:var(--ink1);margin-bottom:1.5rem;padding:1rem 1.25rem;background:#fefbf0;border-radius:12px;border-left:3px solid #c9a84c">' + q.frase + '</div>';
  h += '<div id="pt-fig-opts">';
  var opts = q.opts.slice().sort(function(){ return Math.random() - .5; });
  opts.forEach(function(opt) {
    h += '<button onclick="ptFigSelect(this)" data-opt="' + opt.replace(/"/g,'&quot;').replace(/'/g,'&#39;') + '" style="display:block;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:.5rem;font-family:Montserrat,sans-serif;font-size:.86rem;font-weight:600;color:var(--ink1);cursor:pointer;transition:all .15s">' + opt + '</button>';
  });
  h += '</div>';
  h += '<div id="pt-fig-feedback" style="display:none;margin-top:.75rem"></div>';
  h += '<button id="pt-fig-next" onclick="ptFigNext()" style="display:none;width:100%;margin-top:.75rem;background:linear-gradient(135deg,#b07030,#c9a84c);color:#fff;border:none;border-radius:12px;padding:.85rem;font-weight:800;font-size:.88rem;cursor:pointer;font-family:Montserrat,sans-serif">Próxima <i class="ph ph-arrow-right"></i></button>';
  h += '</div>';
  wrap.innerHTML = h;
  _ptFig.answered = false;
}

function ptFigSelect(btn) {
  if (_ptFig.answered) return;
  var chosen = btn.getAttribute('data-opt');
  _ptFig.answered = true;
  _ptFig.total++;
  var q = _ptFig.banco[_ptFig.idx];
  var correct = chosen === q.correct;
  if (correct) { _ptFig.score++; _ptFig.streak++; } else { _ptFig.streak = 0; }

  document.querySelectorAll('#pt-fig-opts button').forEach(function(b) {
    var opt = b.getAttribute('data-opt');
    b.style.cursor = 'default'; b.onclick = null;
    if (opt === q.correct) { b.style.borderColor='#2e7d52';b.style.background='#e8f5ee';b.style.color='#1a5c38';b.style.fontWeight='800'; }
    else if (opt === chosen && !correct) { b.style.borderColor='#c0392b';b.style.background='#fdecea';b.style.color='#922b21'; }
  });

  var fb = document.getElementById('pt-fig-feedback');
  if (fb) {
    var cor = correct ? '#2e7d52' : '#922b21';
    var bg = correct ? '#e8f5ee' : '#fdecea';
    var brd = correct ? '#2e7d52' : '#c0392b';
    fb.innerHTML = '<div style="background:' + bg + ';border:1.5px solid ' + brd + ';border-radius:12px;padding:.85rem 1rem;font-size:.83rem;color:' + cor + '"><strong>' + (correct ? '✓ Correto!' : '✗ Era: ' + q.correct) + '</strong>' + (q.exp ? '<br><span style="margin-top:.3rem;display:block;line-height:1.6">' + q.exp + '</span>' : '') + '</div>';
    fb.style.display = 'block';
  }
  var nxt = document.getElementById('pt-fig-next');
  if (nxt) nxt.style.display = 'block';
}

function ptFigNext() { _ptFig.idx++; ptFigRender(); }

function ptFigBack() {
  var eng = document.getElementById('pt-fig-engine');
  var menu = document.getElementById('pt-fig-menu');
  if (eng) eng.style.display = 'none';
  if (menu) menu.style.display = 'block';
}

function ptFigFinish() {
  var wrap = document.getElementById('pt-fig-engine');
  var s = _ptFig.score, t = _ptFig.total, pct = t ? Math.round(s/t*100) : 0;
  var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎯' : pct >= 50 ? '📚' : '💪';
  wrap.innerHTML = '<div style="background:linear-gradient(135deg,#6b4200,#b07030);border-radius:20px;padding:2.5rem 2rem;text-align:center;color:#fff">' +
    '<div style="font-size:2.5rem;margin-bottom:.5rem">' + emoji + '</div>' +
    '<div style="font-family:JetBrains Mono,monospace;font-size:3rem;font-weight:700;line-height:1">' + s + '<span style="font-size:1.3rem;opacity:.5">/' + t + '</span></div>' +
    '<div style="font-size:.82rem;color:rgba(255,255,255,.6);margin:.4rem 0">' + pct + '% corretas</div>' +
    '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem">' +
    '<button onclick="ptFigStart()" style="background:#fff;color:#6b4200;border:none;border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Repetir</button>' +
    '<button onclick="ptFigBack()" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Ficha de figuras</button>' +
    '</div></div>';
}

/* ══════════════════════════════════════════════════════
   DISCURSO DIRETO ↔ INDIRETO
══════════════════════════════════════════════════════ */
var PT_DISCURSO_BANCO = [
  {
    tipo: 'direto_para_indireto',
    original: '— Vou ao cinema hoje à noite — disse a Ana.',
    opcoes: [
      'A Ana disse que iria ao cinema naquela noite.',
      'A Ana disse que vai ao cinema hoje à noite.',
      'A Ana disse que foi ao cinema naquela noite.',
      'A Ana disse que teria ido ao cinema naquela noite.'
    ],
    correct: 0,
    exp: 'No discurso indireto: «vou» → «iria» (presente → condicional); «hoje» → «naquela noite» (dêitico temporal transforma-se). O verbo introdutor «disse» fica no pretérito perfeito.'
  },
  {
    tipo: 'direto_para_indireto',
    original: '— Ouçam agora, homens de Ítaca, o que tenho para dizer! — disse Egípcio.',
    opcoes: [
      'Egípcio pediu aos homens de Ítaca que ouvissem naquele momento o que tinha para dizer.',
      'Egípcio disse aos homens de Ítaca que ouvissem agora o que tem para dizer.',
      'Egípcio ordenou aos homens de Ítaca para ouvirem o que tinha dito.',
      'Egípcio pediu que os homens de Ítaca o ouvissem e dissessem o que queriam.'
    ],
    correct: 0,
    exp: 'Imperativo («Ouçam») → «pediu que ouvissem» (conjuntivo). «Agora» → «naquele momento». «Tenho» → «tinha». Os destinatários passam de vocativo para CD/CI.'
  },
  {
    tipo: 'direto_para_indireto',
    original: '— Estás a estudar? — perguntou a professora.',
    opcoes: [
      'A professora perguntou se eu estava a estudar.',
      'A professora perguntou que eu estava a estudar.',
      'A professora perguntou se estava a estudar.',
      'A professora perguntou que estivesse a estudar.'
    ],
    correct: 0,
    exp: 'Interrogativa total → «perguntou se» + verbo no imperfeito. «Estás» → «estava». O pronome «tu» elimina-se ou transforma-se conforme o contexto.'
  },
  {
    tipo: 'direto_para_indireto',
    original: '— Não saias de casa! — disse a mãe ao filho.',
    opcoes: [
      'A mãe disse ao filho que não saísse de casa.',
      'A mãe disse ao filho que não saía de casa.',
      'A mãe pediu ao filho que não saia de casa.',
      'A mãe proibiu ao filho de sair de casa.'
    ],
    correct: 0,
    exp: 'Imperativo negativo («não saias») → «que não saísse» (pretérito imperfeito do conjuntivo). O verbo introdutor de ordem/proibição pode ser «disse», «ordenou», «proibiu».'
  },
  {
    tipo: 'indireto_para_direto',
    original: 'O João disse que viria na semana seguinte.',
    opcoes: [
      '— Venho na semana que vem — disse o João.',
      '— Virei na semana seguinte — disse o João.',
      '— Venho na semana seguinte — disse o João.',
      '— Vim na semana passada — disse o João.'
    ],
    correct: 0,
    exp: '«Viria» (condicional) → «venho» (presente). «Na semana seguinte» → «na semana que vem» (ajuste do dêitico temporal para o momento da fala).'
  },
  {
    tipo: 'indireto_para_direto',
    original: 'A professora perguntou se tínhamos feito os trabalhos de casa.',
    opcoes: [
      '— Fizeram os trabalhos de casa? — perguntou a professora.',
      '— Tinham feito os trabalhos de casa? — perguntou a professora.',
      '— Fazem os trabalhos de casa? — perguntou a professora.',
      '— Fizemos os trabalhos de casa? — perguntou a professora.'
    ],
    correct: 0,
    exp: '«Se tínhamos feito» → interrogativa com «Fizeram?» (mais-que-perfeito volta a perfeito; «nós» → «vocês» na inversão de perspetiva).'
  },
  {
    tipo: 'direto_para_indireto',
    original: '— Por favor, abre a janela! — pediu ela.',
    opcoes: [
      'Ela pediu que abrissem a janela.',
      'Ela pediu para abrir a janela.',
      'Ela pediu que abre a janela.',
      'Ela pediu para que abriram a janela.'
    ],
    correct: 0,
    exp: 'Imperativo «abre» → «que abrissem» (imperfeito do conjuntivo). «Por favor» cai — era marcador de polidez do discurso oral.'
  },
  {
    tipo: 'regra',
    titulo: 'Regra: Transformação de tempos verbais',
    tabela: [
      ['Discurso Direto', 'Discurso Indireto'],
      ['Presente do indicativo', 'Pretérito imperfeito do indicativo'],
      ['Pretérito perfeito simples', 'Pretérito mais-que-perfeito'],
      ['Futuro do indicativo', 'Condicional'],
      ['Imperativo', 'Imperfeito do conjuntivo'],
      ['Presente do conjuntivo', 'Imperfeito do conjuntivo']
    ],
    exp: 'Quando o verbo introdutor está no passado (disse, perguntou, pediu...), os tempos verbais recuam um tempo.'
  }
];

var _ptDisc = { idx: 0, score: 0, total: 0, answered: false, banco: [] };

function ptDiscStart() {
  _ptDisc.banco = PT_DISCURSO_BANCO.filter(function(q){ return q.tipo !== 'regra'; }).slice().sort(function(){ return Math.random()-.5; });
  _ptDisc.idx = 0; _ptDisc.score = 0; _ptDisc.total = 0; _ptDisc.answered = false;
  var dmenu = document.getElementById('pt-disc-menu');
  var deng = document.getElementById('pt-disc-engine');
  if (dmenu) dmenu.style.display = 'none';
  if (deng) deng.style.display = 'block';
  ptDiscRender();
}

function ptDiscRender() {
  var wrap = document.getElementById('pt-disc-engine');
  if (!wrap) return;
  var banco = _ptDisc.banco;
  var idx = _ptDisc.idx;
  if (idx >= banco.length) { ptDiscFinish(); return; }
  var q = banco[idx];
  var pct = Math.round(idx / banco.length * 100);
  var tipo = q.tipo === 'direto_para_indireto' ? 'Transforma em Discurso Indireto' : 'Transforma em Discurso Direto';

  var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">';
  h += '<button onclick="ptDiscBack()" style="background:none;border:none;font-size:.78rem;font-weight:700;color:#6b5fa0;cursor:pointer;display:flex;align-items:center;gap:.3rem;padding:0;font-family:Montserrat,sans-serif"><i class="ph ph-arrow-left"></i> Discurso</button>';
  h += '<span style="font-size:.72rem;color:var(--ink4);font-weight:700">' + (idx+1) + '/' + banco.length + ' · ✓ ' + _ptDisc.score + '/' + _ptDisc.total + '</span>';
  h += '</div>';
  h += '<div style="height:5px;background:var(--border);border-radius:99px;margin-bottom:1.5rem;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#2e7d52,#4caf50);border-radius:99px"></div></div>';

  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:1.75rem">';
  h += '<div style="font-size:.68rem;font-weight:800;color:#2e7d52;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem"><i class="ph ph-chat-circle-text"></i> ' + tipo + '</div>';
  h += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;line-height:1.8;color:var(--ink1);margin-bottom:1.5rem;padding:1rem 1.25rem;background:#f0faf4;border-radius:12px;border-left:3px solid #4caf50">' + q.original + '</div>';
  h += '<div id="pt-disc-opts">';
  q.opcoes.forEach(function(opt, i) {
    h += '<button onclick="ptDiscSelect(this,' + i + ')" data-idx="' + i + '" style="display:block;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:.5rem;font-family:Montserrat,sans-serif;font-size:.86rem;font-weight:500;color:var(--ink1);cursor:pointer;transition:all .15s">' + opt + '</button>';
  });
  h += '</div>';
  h += '<div id="pt-disc-feedback" style="display:none;margin-top:.75rem"></div>';
  h += '<button id="pt-disc-next" onclick="ptDiscNext()" style="display:none;width:100%;margin-top:.75rem;background:linear-gradient(135deg,#2e7d52,#4caf50);color:#fff;border:none;border-radius:12px;padding:.85rem;font-weight:800;font-size:.88rem;cursor:pointer;font-family:Montserrat,sans-serif">Próxima <i class="ph ph-arrow-right"></i></button>';
  h += '</div>';
  wrap.innerHTML = h;
  _ptDisc.answered = false;
}

function ptDiscSelect(btn, chosen) {
  if (_ptDisc.answered) return;
  // Aceitar chosen como argumento ou lê-lo do data-idx
  if (chosen === undefined) chosen = parseInt(btn.getAttribute('data-idx'));
  _ptDisc.answered = true;
  _ptDisc.total++;
  var q = _ptDisc.banco[_ptDisc.idx];
  var correct = chosen === q.correct;
  if (correct) _ptDisc.score++;

  document.querySelectorAll('#pt-disc-opts button').forEach(function(b) {
    var i = parseInt(b.getAttribute('data-idx'));
    b.style.cursor = 'default'; b.onclick = null;
    if (i === q.correct) { b.style.borderColor='#2e7d52';b.style.background='#e8f5ee';b.style.color='#1a5c38';b.style.fontWeight='700'; }
    else if (i === chosen && !correct) { b.style.borderColor='#c0392b';b.style.background='#fdecea';b.style.color='#922b21'; }
  });

  var fb = document.getElementById('pt-disc-feedback');
  if (fb) {
    var cor = correct ? '#2e7d52' : '#922b21';
    var bg = correct ? '#e8f5ee' : '#fdecea';
    var brd = correct ? '#2e7d52' : '#c0392b';
    fb.innerHTML = '<div style="background:' + bg + ';border:1.5px solid ' + brd + ';border-radius:12px;padding:.85rem 1rem;font-size:.83rem;color:' + cor + '"><strong>' + (correct ? '✓ Correto!' : '✗ Opção ' + (q.correct+1) + ' estava certa.') + '</strong>' + (q.exp ? '<br><span style="margin-top:.3rem;display:block;line-height:1.6">' + q.exp + '</span>' : '') + '</div>';
    fb.style.display = 'block';
  }
  var nxt = document.getElementById('pt-disc-next');
  if (nxt) nxt.style.display = 'block';
}

function ptDiscNext() { _ptDisc.idx++; ptDiscRender(); }
function ptDiscBack() {
  var eng = document.getElementById('pt-disc-engine');
  var menu = document.getElementById('pt-disc-menu');
  if (eng) eng.style.display = 'none';
  if (menu) menu.style.display = 'block';
}
function ptDiscFinish() {
  var s = _ptDisc.score, t = _ptDisc.total, pct = t ? Math.round(s/t*100) : 0;
  var eng = document.getElementById('pt-disc-engine');
  if (!eng) return;
  eng.innerHTML = '<div style="background:linear-gradient(135deg,#1a4a2e,#2e7d52);border-radius:20px;padding:2.5rem 2rem;text-align:center;color:#fff">' +
    '<div style="font-size:2.5rem;margin-bottom:.5rem">' + (pct>=80?'🏆':pct>=60?'🎯':'📚') + '</div>' +
    '<div style="font-family:JetBrains Mono,monospace;font-size:3rem;font-weight:700;line-height:1">' + s + '<span style="font-size:1.3rem;opacity:.5">/' + t + '</span></div>' +
    '<div style="font-size:.82rem;color:rgba(255,255,255,.6);margin:.4rem 0">' + pct + '% corretas</div>' +
    '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem">' +
    '<button onclick="ptDiscStart()" style="background:#fff;color:#1a4a2e;border:none;border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Repetir</button>' +
    '<button onclick="ptDiscBack()" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Ficha</button>' +
    '</div></div>';
}

/* ══════════════════════════════════════════════════════
   CONECTORES DO DISCURSO
══════════════════════════════════════════════════════ */
var PT_CONECTORES_INFO = [
  { tipo: 'Causa', exemplos: ['porque', 'pois', 'já que', 'visto que', 'uma vez que', 'dado que'], cor: '#2a7db5', bg: '#e8f4fd' },
  { tipo: 'Consequência', exemplos: ['por isso', 'portanto', 'logo', 'assim', 'de modo que', 'pelo que'], cor: '#6b52a8', bg: '#f0edf7' },
  { tipo: 'Concessão', exemplos: ['embora', 'ainda que', 'mesmo que', 'apesar de', 'no entanto', 'contudo'], cor: '#b07030', bg: '#fef3e2' },
  { tipo: 'Condição', exemplos: ['se', 'caso', 'desde que', 'a menos que', 'contanto que', 'salvo se'], cor: '#2e7d52', bg: '#e8f5ee' },
  { tipo: 'Finalidade', exemplos: ['para', 'a fim de', 'com o objetivo de', 'de modo a', 'para que', 'a fim de que'], cor: '#c0392b', bg: '#fdecea' },
  { tipo: 'Adição', exemplos: ['e', 'também', 'além disso', 'ainda', 'ademais', 'acrescente-se que'], cor: '#2e7d52', bg: '#f0faf4' },
  { tipo: 'Oposição', exemplos: ['mas', 'porém', 'contudo', 'todavia', 'no entanto', 'pelo contrário'], cor: '#922b21', bg: '#fdecea' },
  { tipo: 'Tempo', exemplos: ['quando', 'enquanto', 'depois de', 'antes de', 'assim que', 'logo que'], cor: '#1a5c8c', bg: '#e0f2ff' },
  { tipo: 'Exemplificação', exemplos: ['por exemplo', 'nomeadamente', 'como', 'tal como', 'entre outros', 'designadamente'], cor: '#5c4e00', bg: '#fefbe0' },
  { tipo: 'Conclusão', exemplos: ['em conclusão', 'em suma', 'concluindo', 'em síntese', 'portanto', 'assim sendo'], cor: '#4a3f7a', bg: '#f3f0fb' }
];

var PT_CONECTORES_BANCO = [
  { frase: 'Estudei muito ___ queria ter boa nota.', blank: 'porque', correct: 'porque', opts: ['porque','portanto','embora','quando'], tipo: 'Causa', exp: '«Porque» introduz uma causa — é um conector de causa/causal.' },
  { frase: 'Não estudou nada; ___, reprovou.', blank: 'portanto', correct: 'portanto', opts: ['portanto','porque','embora','se'], tipo: 'Consequência', exp: '«Portanto» introduz uma consequência lógica do que foi dito antes.' },
  { frase: '___ tivesse chovido muito, foram à praia.', blank: 'Embora', correct: 'Embora', opts: ['Embora','Porque','Portanto','Quando'], tipo: 'Concessão', exp: '«Embora» introduz uma concessão (+ conjuntivo) — a chuva não impediu a ida à praia.' },
  { frase: 'Vou estudar mais ___ quero passar no exame.', blank: 'porque', correct: 'porque', opts: ['porque','portanto','embora','contudo'], tipo: 'Causa', exp: 'O falante apresenta a causa/razão da sua ação — «porque».' },
  { frase: 'Trabalhou muito; ___, conseguiu o que queria.', blank: 'assim', correct: 'assim', opts: ['assim','embora','se','porque'], tipo: 'Consequência', exp: '«Assim» conecta uma consequência — resultado do trabalho árduo.' },
  { frase: 'Estu­dou pouco; ___, tirou boa nota.', blank: 'contudo', correct: 'contudo', opts: ['contudo','portanto','porque','quando'], tipo: 'Oposição/Concessão', exp: '«Contudo» introduz uma ideia contrária ao esperado — surpresa.' },
  { frase: 'Lê muito ___ aprender novas palavras.', blank: 'para', correct: 'para', opts: ['para','porque','portanto','embora'], tipo: 'Finalidade', exp: '«Para» + infinitivo indica finalidade — o objetivo da leitura.' },
  { frase: 'Gosto de ler ___ de escrever.', blank: 'e', correct: 'e', opts: ['e','mas','portanto','embora'], tipo: 'Adição', exp: '«E» é conector de adição/copulativo — acrescenta informação.' },
  { frase: 'Gostava de ir à festa, ___ tenho muito trabalho.', blank: 'mas', correct: 'mas', opts: ['mas','e','portanto','porque'], tipo: 'Oposição', exp: '«Mas» introduz uma oposição — o desejo vs. a realidade.' },
  { frase: '___ chegarmos, começamos imediatamente.', blank: 'Assim que', correct: 'Assim que', opts: ['Assim que','Embora','Portanto','Porque'], tipo: 'Tempo', exp: '«Assim que» é conector temporal — indica imediatamente após.' },
  { frase: 'Há muitas formas de aprender, ___, ler, ver filmes e conversar.', blank: 'por exemplo', correct: 'por exemplo', opts: ['por exemplo','portanto','embora','porque'], tipo: 'Exemplificação', exp: '«Por exemplo» introduz exemplos concretos do que foi afirmado.' },
  { frase: 'Estudou muito; ___ assim, não passou no exame.', blank: 'mesmo', correct: 'mesmo', opts: ['mesmo','portanto','porque','quando'], tipo: 'Concessão', exp: '«Mesmo assim» introduz uma concessão — o esforço não foi suficiente.' },
  { frase: 'Em ___, o texto defende que a leitura é fundamental.', blank: 'suma', correct: 'suma', opts: ['suma','conclusão','exemplo','vez'], tipo: 'Conclusão', exp: '«Em suma» é um conector de conclusão/síntese.' },
  { frase: '___ o texto seja difícil, consegues perceber a ideia principal.', blank: 'Ainda que', correct: 'Ainda que', opts: ['Ainda que','Porque','Portanto','Quando'], tipo: 'Concessão', exp: '«Ainda que» é conector concessivo (equivalente a «embora», usa conjuntivo).' },
  { frase: 'Não quero sair ___ esteja mau tempo.', blank: 'caso', correct: 'caso', opts: ['caso','porque','portanto','embora'], tipo: 'Condição', exp: '«Caso» é conector condicional (usa conjuntivo) — equivale a «se».' }
];

var _ptCon = { idx: 0, score: 0, total: 0, answered: false, banco: [] };

function ptConStart() {
  _ptCon.banco = PT_CONECTORES_BANCO.slice().sort(function(){ return Math.random()-.5; });
  _ptCon.idx = 0; _ptCon.score = 0; _ptCon.total = 0; _ptCon.answered = false;
  var cmenu = document.getElementById('pt-con-menu');
  var ceng = document.getElementById('pt-con-engine');
  if (cmenu) cmenu.style.display = 'none';
  if (ceng) ceng.style.display = 'block';
  ptConRender();
}

function ptConRender() {
  var wrap = document.getElementById('pt-con-engine');
  if (!wrap) return;
  var banco = _ptCon.banco;
  var idx = _ptCon.idx;
  if (idx >= banco.length) { ptConFinish(); return; }
  var q = banco[idx];
  var pct = Math.round(idx / banco.length * 100);

  var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">';
  h += '<button onclick="ptConBack()" style="background:none;border:none;font-size:.78rem;font-weight:700;color:#6b5fa0;cursor:pointer;display:flex;align-items:center;gap:.3rem;padding:0;font-family:Montserrat,sans-serif"><i class="ph ph-arrow-left"></i> Conectores</button>';
  h += '<span style="font-size:.72rem;color:var(--ink4);font-weight:700">' + (idx+1) + '/' + banco.length + ' · ✓ ' + _ptCon.score + '/' + _ptCon.total + '</span>';
  h += '</div>';
  h += '<div style="height:5px;background:var(--border);border-radius:99px;margin-bottom:1.5rem;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#4a3f7a,#8b7cc0);border-radius:99px"></div></div>';

  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:1.75rem">';
  h += '<div style="font-size:.68rem;font-weight:800;color:#4a3f7a;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem"><i class="ph ph-link"></i> Escolhe o conector correto</div>';
  h += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.15rem;line-height:1.8;color:var(--ink1);margin-bottom:1.5rem;padding:1rem 1.25rem;background:#f3f0fb;border-radius:12px;border-left:3px solid #6b5fa0">' + q.frase.replace('___', '<span style="background:#4a3f7a;color:#fff;padding:2px 10px;border-radius:6px;font-family:Montserrat,sans-serif;font-size:.85rem;font-weight:700">___</span>') + '</div>';
  h += '<div id="pt-con-opts">';
  var opts = q.opts.slice().sort(function(){ return Math.random()-.5; });
  opts.forEach(function(opt) {
    h += '<button onclick="ptConSelect(this)" data-opt="' + opt.replace(/"/g,'&quot;').replace(/'/g,'&#39;') + '" style="display:block;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:.5rem;font-family:Montserrat,sans-serif;font-size:.86rem;font-weight:600;color:var(--ink1);cursor:pointer;transition:all .15s">' + opt + '</button>';
  });
  h += '</div>';
  h += '<div id="pt-con-feedback" style="display:none;margin-top:.75rem"></div>';
  h += '<button id="pt-con-next" onclick="ptConNext()" style="display:none;width:100%;margin-top:.75rem;background:linear-gradient(135deg,#4a3f7a,#6b5fa0);color:#fff;border:none;border-radius:12px;padding:.85rem;font-weight:800;font-size:.88rem;cursor:pointer;font-family:Montserrat,sans-serif">Próxima <i class="ph ph-arrow-right"></i></button>';
  h += '</div>';
  wrap.innerHTML = h;
  _ptCon.answered = false;
}

function ptConSelect(btn) {
  if (_ptCon.answered) return;
  var chosen = btn.getAttribute('data-opt');
  _ptCon.answered = true;
  _ptCon.total++;
  var q = _ptCon.banco[_ptCon.idx];
  var correct = chosen === q.correct;
  if (correct) _ptCon.score++;

  document.querySelectorAll('#pt-con-opts button').forEach(function(b) {
    var opt = b.getAttribute('data-opt');
    b.style.cursor = 'default'; b.onclick = null;
    if (opt === q.correct) { b.style.borderColor='#2e7d52';b.style.background='#e8f5ee';b.style.color='#1a5c38';b.style.fontWeight='800'; }
    else if (opt === chosen && !correct) { b.style.borderColor='#c0392b';b.style.background='#fdecea';b.style.color='#922b21'; }
  });

  var fb = document.getElementById('pt-con-feedback');
  if (fb) {
    var cor = correct ? '#2e7d52' : '#922b21';
    var bg = correct ? '#e8f5ee' : '#fdecea';
    var brd = correct ? '#2e7d52' : '#c0392b';
    fb.innerHTML = '<div style="background:' + bg + ';border:1.5px solid ' + brd + ';border-radius:12px;padding:.85rem 1rem;font-size:.83rem;color:' + cor + '"><strong>' + (correct ? '✓ Correto!' : '✗ Era: «' + q.correct + '»') + '</strong><br><span style="font-size:.75rem;font-weight:700;background:#f3f0fb;color:#4a3f7a;border-radius:999px;padding:2px 8px;margin-right:.4rem">' + q.tipo + '</span>' + (q.exp ? '<span style="margin-top:.3rem;display:block;line-height:1.6">' + q.exp + '</span>' : '') + '</div>';
    fb.style.display = 'block';
  }
  var nxt = document.getElementById('pt-con-next');
  if (nxt) nxt.style.display = 'block';
}

function ptConNext() { _ptCon.idx++; ptConRender(); }
function ptConBack() {
  var eng = document.getElementById('pt-con-engine');
  var menu = document.getElementById('pt-con-menu');
  if (eng) eng.style.display = 'none';
  if (menu) menu.style.display = 'block';
}
function ptConFinish() {
  var s = _ptCon.score, t = _ptCon.total, pct = t ? Math.round(s/t*100) : 0;
  var eng = document.getElementById('pt-con-engine');
  if (!eng) return;
  eng.innerHTML = '<div style="background:linear-gradient(135deg,#1e1640,#4a3f7a);border-radius:20px;padding:2.5rem 2rem;text-align:center;color:#fff">' +
    '<div style="font-size:2.5rem;margin-bottom:.5rem">' + (pct>=80?'🏆':pct>=60?'🎯':'📚') + '</div>' +
    '<div style="font-family:JetBrains Mono,monospace;font-size:3rem;font-weight:700;line-height:1">' + s + '<span style="font-size:1.3rem;opacity:.5">/' + t + '</span></div>' +
    '<div style="font-size:.82rem;color:rgba(255,255,255,.6);margin:.4rem 0">' + pct + '% corretas</div>' +
    '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem">' +
    '<button onclick="ptConStart()" style="background:#fff;color:#4a3f7a;border:none;border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Repetir</button>' +
    '<button onclick="ptConBack()" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Ficha</button>' +
    '</div></div>';
}
