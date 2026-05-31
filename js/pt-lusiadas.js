// pt-lusiadas.js — Os Lusíadas: Guia de Estudo e Questões
// Português 9.º Ano

/* ══════════════════════════════════════════════════════
   ESTRUTURA DA OBRA
══════════════════════════════════════════════════════ */
var PT_LUS_ESTRUTURA = {
  autor: 'Luís Vaz de Camões',
  ano: '1572',
  genero: 'Epopeia (poesia épica)',
  forma: '10 Cantos · Estrofes de 8 versos (oitavas) · Versos decassílabos',
  tema_central: 'A viagem de Vasco da Gama à Índia (1497-1498) como pretexto para glorificar Portugal e os Portugueses',
  plano_poetico: 'Invocação, Proposição, Dedicatória (Canto I)',
  plano_historico: 'Descrição da viagem + episódios da história de Portugal contados ao longo da viagem',
  plano_mitologico: 'Deuses do Olimpo que interferem na viagem (Vénus e Marte a favor; Baco contra)'
};

/* ══════════════════════════════════════════════════════
   EPISÓDIOS PRINCIPAIS
══════════════════════════════════════════════════════ */
var PT_LUS_EPISODIOS = [
  {
    id: 'proposicao',
    canto: 'Canto I',
    nome: 'Proposição',
    estancia: 'Est. 1-3',
    resumo: 'Camões apresenta o tema da obra: «As armas e os barões assinalados» — os feitos dos portugueses. Distingue-os dos heróis gregos e romanos.',
    citacao: '«As armas e os Barões assinalados / Que da Ocidental praia Lusitana / Por mares nunca dantes navegados...»',
    importancia: 'Define o programa épico — a celebração dos feitos portugueses supera os da Antiguidade.',
    exame: true
  },
  {
    id: 'invocacao',
    canto: 'Canto I',
    nome: 'Invocação',
    estancia: 'Est. 4-5',
    resumo: 'Camões invoca as Tágides (ninfas do Tejo) em vez das Musas clássicas — originalidade que radica a obra em Portugal.',
    citacao: '«Vós, Tágides minhas, pois criado / Tendes em mim um novo engenho ardente...»',
    importancia: 'Revela o patriotismo de Camões — substitui as Musas gregas pelas ninfas do Tejo.',
    exame: true
  },
  {
    id: 'ines',
    canto: 'Canto III',
    nome: 'Episódio de Inês de Castro',
    estancia: 'Est. 118-135',
    resumo: 'D. Pedro amava Inês de Castro. Os conselheiros do rei D. Afonso IV convenceram-no a mandá-la matar. Inês suplica ao rei pelos seus filhos, mas é assassinada. D. Pedro depois coroou-a rainha post-mortem.',
    citacao: '«Inês, que depois de morta / Foi rainha»',
    importancia: 'Crítica ao poder político; amor vs. razão de Estado; tragédia feminina. Camões usa Inês para criticar os conselheiros e a violência do poder.',
    exame: true
  },
  {
    id: 'adamastor',
    canto: 'Canto V',
    nome: 'Episódio do Adamastor',
    estancia: 'Est. 37-60',
    resumo: 'No Cabo da Boa Esperança, surge um gigante monstruoso — o Adamastor. Representa as forças da natureza e os perigos do mar desconhecido. Anuncia tragédias às naus portuguesas.',
    citacao: '«E enquanto não souberdes que elemento / É este que ficastes a dobrar / Sabei que esta é a grande Caixa Forte / Do Cabo que chamais da Boa Esperança»',
    importancia: 'Simboliza os perigos da expansão marítima; a hybris (arrogância humana) ao desafiar os limites do mundo conhecido. É uma personificação alegórica.',
    exame: true
  },
  {
    id: 'velho_restelo',
    canto: 'Canto IV',
    nome: 'Episódio do Velho do Restelo',
    estancia: 'Est. 94-104',
    resumo: 'No momento da partida das naus, um velho sábio critica a ambição e a «glória de mandar» — condena a expansão marítima por considerá-la motivada pela cobiça.',
    citacao: '«Ó glória de mandar, ó vã cobiça / Desta vaidade a que chamamos Fama!»',
    importancia: 'Voz crítica dentro da epopeia — questiona os valores que a obra celebra. Representa a sabedoria popular e a voz da consciência.',
    exame: true
  },
  {
    id: 'tempestade',
    canto: 'Canto VI',
    nome: 'Tempestade e Vénus',
    estancia: 'Est. 70-92',
    resumo: 'Baco convence Éolo a desencadear uma tempestade violenta contra as naus. Vénus e as Nereides intervêm e salvam a frota portuguesa.',
    citacao: '',
    importancia: 'Representa a oposição (Baco) e o apoio (Vénus) ao povo português. O plano mitológico interfere no real.',
    exame: false
  },
  {
    id: 'ilha_amores',
    canto: 'Canto IX',
    nome: 'Ilha dos Amores',
    estancia: 'Est. 52-95',
    resumo: 'Vénus cria uma ilha paradisíaca onde as Nereides (ninfas do mar) recebem os marinheiros após os perigos da viagem. É a recompensa dos heróis.',
    citacao: '«Ali co as Ninfas os Barões se encontram / Que Vénus lhes guardava com cuidado»',
    importancia: 'Representa a glória e o prémio merecido pelos portugueses. Alegoria da imortalidade através da fama.',
    exame: false
  },
  {
    id: 'dedicatoria',
    canto: 'Canto X',
    nome: 'Dedicatória a D. Sebastião',
    estancia: 'Est. 145-156',
    resumo: 'Camões dirige-se diretamente ao rei D. Sebastião e pede-lhe que cuide de Portugal. No final, Camões apresenta-se como «humilde, baixo e rudo» mas portador de «engenho» e «experiência».',
    citacao: '«Mas eu que falo, humilde, baxo e rudo / De vós não conhecido nem sonhado?»',
    importancia: 'Camões assume voz própria — jogo entre humildade retórica e consciência do valor da sua obra. Aparece nos exames (2024).',
    exame: true
  }
];

/* ══════════════════════════════════════════════════════
   PERSONAGENS E TEMAS
══════════════════════════════════════════════════════ */
var PT_LUS_PERSONAGENS = [
  { nome: 'Vasco da Gama', papel: 'Herói principal — o capitão da expedição à Índia. Representa o ideal de herói épico: corajoso, prudente, fiel ao rei e a Deus.' },
  { nome: 'Vénus', papel: 'Deusa protetora dos portugueses — símbolo do amor e da beleza. Representa os valores que Camões admira nos portugueses.' },
  { nome: 'Baco', papel: 'Deus que se opõe aos portugueses — teme perder a sua fama por eles. Representa o obstáculo e a inveja.' },
  { nome: 'Júpiter', papel: 'Rei dos deuses — decide em favor dos portugueses. Representa a Providência e o destino.' },
  { nome: 'Adamastor', papel: 'Gigante monstruoso do Cabo da Boa Esperança — representa os perigos do mar e a hybris.' },
  { nome: 'Inês de Castro', papel: 'Amada de D. Pedro — vítima do poder político. Representa o amor puro e a injustiça do poder.' },
  { nome: 'Velho do Restelo', papel: 'Velho sábio que critica a expansão — voz da consciência crítica dentro da epopeia.' },
  { nome: 'Camões', papel: 'Narrador e autor implícito — intervém na obra com comentários pessoais e críticos.' }
];

var PT_LUS_TEMAS = [
  { tema: 'Heroísmo', desc: 'Os portugueses são apresentados como heróis superiores aos da Antiguidade — superam Ulisses e Eneias.' },
  { tema: 'Expansão Marítima', desc: 'A viagem à Índia é o pretexto épico — símbolo do «engenho» e da coragem portugueses.' },
  { tema: 'Patriotismo', desc: 'Glorificação de Portugal e dos seus reis — Camões quer imortalizá-los através da poesia.' },
  { tema: 'Crítica ao Poder', desc: 'O Velho do Restelo e o episódio de Inês criticam a ambição, a cobiça e a crueldade do poder.' },
  { tema: 'Amor e Tragédia', desc: 'Inês de Castro simboliza o amor destruído pelo poder — tema lírico dentro da epopeia.' },
  { tema: 'Fama e Imortalidade', desc: 'A poesia imortaliza os feitos — «Ilha dos Amores» é a recompensa da glória eterna.' }
];

/* ══════════════════════════════════════════════════════
   BANCO DE QUESTÕES — OS LUSÍADAS
══════════════════════════════════════════════════════ */
var PT_LUS_BANCO = [
  {
    enun: 'Na Proposição de Os Lusíadas, Camões apresenta os heróis como superiores a',
    opts: ['(A) Alexandre Magno e Júlio César apenas.', '(B) Ulisses e Eneias — os heróis da épica clássica.', '(C) D. Afonso Henriques e D. João I.', '(D) os navegadores espanhóis e italianos.'],
    correct: 'B',
    exp: 'Camões afirma que os portugueses superaram as aventuras de Ulisses (Odisseia) e Eneias (Eneida) — os grandes heróis épicos da Antiguidade.'
  },
  {
    enun: 'Qual é a principal função do Episódio do Velho do Restelo (Canto IV)?',
    opts: ['(A) Glorificar a partida das naus e o heroísmo dos navegadores.', '(B) Apresentar uma voz crítica que condena a ambição e a «glória de mandar».', '(C) Descrever os perigos do oceano Atlântico.', '(D) Revelar o amor de Camões pela pátria.'],
    correct: 'B',
    exp: 'O Velho do Restelo representa a voz da consciência crítica — condena a expansão marítima motivada pela «vã cobiça» e pela «glória de mandar», questionando os valores épicos.'
  },
  {
    enun: 'O Adamastor (Canto V) simboliza principalmente',
    opts: ['(A) a proteção divina sobre os navegadores portugueses.', '(B) os perigos do mar desconhecido e os limites que o homem não devia transpor.', '(C) a inveja dos povos africanos face aos portugueses.', '(D) o amor impossível de Camões por uma ninfa.'],
    correct: 'B',
    exp: 'O Adamastor personifica os perigos naturais do Cabo da Boa Esperança e representa a hybris — a arrogância de quem desafia os limites do mundo. É uma alegoria das forças adversas à expansão.'
  },
  {
    enun: 'No Episódio de Inês de Castro, Camões pretende principalmente',
    opts: ['(A) elogiar a decisão política de D. Afonso IV.', '(B) criticar D. Pedro por desobedecer ao pai.', '(C) denunciar a crueldade do poder político que destrói o amor e a inocência.', '(D) descrever a beleza física de Inês de Castro.'],
    correct: 'C',
    exp: 'Camões usa o episódio de Inês para criticar os conselheiros e o rei que, por razões políticas, destruíram um amor puro. É uma das vozes mais críticas da obra.'
  },
  {
    enun: 'Na Proposição, a expressão «mares nunca dantes navegados» refere-se a',
    opts: ['(A) os mares do Mediterrâneo, desconhecidos dos Romanos.', '(B) os oceanos Atlântico e Índico, nunca antes percorridos pelos europeus.', '(C) os rios de Portugal, nunca antes explorados.', '(D) os mares do Norte da Europa.'],
    correct: 'B',
    exp: '«Mares nunca dantes navegados» refere-se aos oceanos que os portugueses foram os primeiros europeus a percorrer — o Atlântico Sul e o Índico — na viagem à Índia.'
  },
  {
    enun: 'Quem é Vénus em Os Lusíadas e qual o seu papel?',
    opts: ['(A) A rainha de Portugal que apoia a viagem; símbolo do poder real.', '(B) A deusa grega que protege os portugueses; representa os valores de amor e beleza que Camões admira neles.', '(C) A esposa de Vasco da Gama que fica em Portugal à sua espera.', '(D) A deusa que se opõe à viagem por ciúmes de Baco.'],
    correct: 'B',
    exp: 'Vénus é a deusa do amor e protetora dos portugueses no plano mitológico — identifica-os com os seus valores. Simboliza o apoio divino ao povo lusitano.'
  },
  {
    enun: 'A «Ilha dos Amores» (Canto IX) representa alegoricamente',
    opts: ['(A) um local real onde os navegadores descansaram na viagem.', '(B) a glória e a imortalidade como recompensa dos feitos heroicos dos portugueses.', '(C) as ilhas africanas conquistadas por Portugal.', '(D) o paraíso cristão prometido aos mártires.'],
    correct: 'B',
    exp: 'A Ilha dos Amores é uma alegoria da imortalidade pela fama — é a recompensa simbólica dos heróis que arriscaram a vida. Representa o prémio da glória eterna.'
  },
  {
    enun: 'Na estância da Dedicatória (Canto X), Camões descreve-se como «humilde, baixo e rudo». Esta é uma estratégia retórica conhecida como',
    opts: ['(A) hybris — arrogância disfarçada.', '(B) captatio benevolentiae — humildade retórica para conquistar a simpatia do destinatário.', '(C) ironia — o oposto do que pensa.', '(D) anáfora — repetição de ideias.'],
    correct: 'B',
    exp: '«Captatio benevolentiae» é a estratégia retórica de se apresentar como humilde para ganhar a benevolência do leitor/destinatário — Camões dirige-se a D. Sebastião e finge modéstia antes de reivindicar o seu «engenho».'
  },
  {
    enun: 'Qual dos seguintes pares de palavras sintetiza melhor a tensão central de Os Lusíadas?',
    opts: ['(A) Amor / Ódio', '(B) Glória / Crítica (heroísmo vs. questionamento da expansão)', '(C) Ciência / Religião', '(D) Portugal / Espanha'],
    correct: 'B',
    exp: 'Os Lusíadas celebram o heroísmo português mas também o questionam — através do Velho do Restelo, de Inês e dos comentários do narrador. A tensão entre glória e crítica é central.'
  },
  {
    enun: 'O plano mitológico de Os Lusíadas serve principalmente para',
    opts: ['(A) mostrar que os portugueses acreditavam nos deuses gregos.', '(B) inserir a obra na tradição épica clássica e elevar os feitos portugueses ao nível dos mitos.', '(C) substituir a religião cristã pela mitologia pagã.', '(D) criticar a Igreja Católica.'],
    correct: 'B',
    exp: 'A mitologia é um recurso épico herdado de Homero e Virgílio — Camões usa-a para elevar os feitos portugueses à dimensão dos grandes mitos e seguir a convenção da epopeia clássica.'
  },
  {
    enun: 'A expressão «Ó glória de mandar, ó vã cobiça» pertence a',
    opts: ['(A) Vasco da Gama, ao partir de Lisboa.', '(B) Camões, na Proposição da obra.', '(C) O Velho do Restelo, na sua crítica à expansão.', '(D) Adamastor, ao ameaçar as naus portuguesas.'],
    correct: 'C',
    exp: 'É o início do discurso do Velho do Restelo (Canto IV) — critica a ambição («vã cobiça») e o desejo de poder («glória de mandar») que motivam a expansão marítima.'
  },
  {
    enun: 'Inês de Castro aparece em Os Lusíadas no Canto',
    opts: ['(A) I', '(B) III', '(C) V', '(D) IX'],
    correct: 'B',
    exp: 'O episódio de Inês de Castro está no Canto III (estâncias 118-135), quando Paulo da Gama conta a história de Portugal ao Catual de Calecute.'
  }
];

/* ══════════════════════════════════════════════════════
   MOTOR DE Os LUSÍADAS
══════════════════════════════════════════════════════ */
var _ptLus = { idx: 0, score: 0, total: 0, answered: false, banco: [], view: 'menu' };

function ptLusQuiz() {
  _ptLus.banco = PT_LUS_BANCO.slice().sort(function(){ return Math.random()-.5; });
  _ptLus.idx = 0; _ptLus.score = 0; _ptLus.total = 0; _ptLus.answered = false;
  _ptLus.view = 'quiz';
  ptLusRenderQuiz();
}

function ptLusRenderQuiz() {
  var wrap = document.getElementById('pt-lus-content');
  if (!wrap) return;
  var banco = _ptLus.banco;
  var idx = _ptLus.idx;
  if (idx >= banco.length) { ptLusFinish(); return; }
  var q = banco[idx];
  var pct = Math.round(idx / banco.length * 100);

  var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">';
  h += '<button onclick="ptLusMenu()" style="background:none;border:none;font-size:.78rem;font-weight:700;color:#c9a84c;cursor:pointer;display:flex;align-items:center;gap:.3rem;padding:0;font-family:Montserrat,sans-serif"><i class="ph ph-arrow-left"></i> Os Lusíadas</button>';
  h += '<span style="font-size:.72rem;color:var(--ink4);font-weight:700">' + (idx+1) + '/' + banco.length + ' · ✓ ' + _ptLus.score + '/' + _ptLus.total + '</span>';
  h += '</div>';
  h += '<div style="height:5px;background:var(--border);border-radius:99px;margin-bottom:1.5rem;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#c9a84c,#b07030);border-radius:99px"></div></div>';

  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:1.75rem">';
  h += '<div style="font-size:.68rem;font-weight:800;color:#b07030;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem"><i class="ph ph-book-open-text"></i> Os Lusíadas — Questão</div>';
  h += '<div style="font-size:.96rem;font-weight:700;color:var(--ink1);line-height:1.65;margin-bottom:1.25rem">' + q.enun + '</div>';
  h += '<div id="pt-lus-opts">';
  q.opts.forEach(function(opt, i) {
    var letter = ['A','B','C','D'][i];
    h += '<button onclick="ptLusSelect(this)" data-letter="' + letter + '" style="display:block;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:.5rem;font-family:Montserrat,sans-serif;font-size:.86rem;font-weight:600;color:var(--ink1);cursor:pointer;transition:all .15s">' + opt + '</button>';
  });
  h += '</div>';
  h += '<div id="pt-lus-feedback" style="display:none;margin-top:.75rem"></div>';
  h += '<button id="pt-lus-next" onclick="ptLusNext()" style="display:none;width:100%;margin-top:.75rem;background:linear-gradient(135deg,#b07030,#c9a84c);color:#fff;border:none;border-radius:12px;padding:.85rem;font-weight:800;font-size:.88rem;cursor:pointer;font-family:Montserrat,sans-serif">Próxima <i class="ph ph-arrow-right"></i></button>';
  h += '</div>';
  wrap.innerHTML = h;
  _ptLus.answered = false;
}

function ptLusSelect(btn) {
  if (_ptLus.answered) return;
  var letter = btn.getAttribute('data-letter');
  _ptLus.answered = true;
  _ptLus.total++;
  var q = _ptLus.banco[_ptLus.idx];
  var correct = letter === q.correct;
  if (correct) _ptLus.score++;

  document.querySelectorAll('#pt-lus-opts button').forEach(function(b) {
    var l = b.getAttribute('data-letter');
    b.style.cursor = 'default'; b.onclick = null;
    if (l === q.correct) { b.style.borderColor='#2e7d52';b.style.background='#e8f5ee';b.style.color='#1a5c38';b.style.fontWeight='800'; }
    else if (l === letter && !correct) { b.style.borderColor='#c0392b';b.style.background='#fdecea';b.style.color='#922b21'; }
  });

  var fb = document.getElementById('pt-lus-feedback');
  if (fb) {
    var cor = correct ? '#2e7d52' : '#922b21', bg = correct ? '#e8f5ee' : '#fdecea', brd = correct ? '#2e7d52' : '#c0392b';
    fb.innerHTML = '<div style="background:' + bg + ';border:1.5px solid ' + brd + ';border-radius:12px;padding:.85rem 1rem;font-size:.83rem;color:' + cor + '"><strong>' + (correct ? '✓ Correto!' : '✗ Era: ' + q.correct) + '</strong>' + (q.exp ? '<br><span style="margin-top:.3rem;display:block;line-height:1.6">' + q.exp + '</span>' : '') + '</div>';
    fb.style.display = 'block';
  }
  var nxt = document.getElementById('pt-lus-next');
  if (nxt) nxt.style.display = 'block';
}

function ptLusNext() { _ptLus.idx++; ptLusRenderQuiz(); }

function ptLusMenu() {
  _ptLus.view = 'menu';
  ptLusRenderMenu();
}

function ptLusFinish() {
  var s = _ptLus.score, t = _ptLus.total, pct = t ? Math.round(s/t*100) : 0;
  var wrap = document.getElementById('pt-lus-content');
  wrap.innerHTML = '<div style="background:linear-gradient(135deg,#4a2800,#b07030);border-radius:20px;padding:2.5rem 2rem;text-align:center;color:#fff">' +
    '<div style="font-size:2.5rem;margin-bottom:.5rem">' + (pct>=80?'🏆':pct>=60?'🎯':'📚') + '</div>' +
    '<div style="font-family:JetBrains Mono,monospace;font-size:3rem;font-weight:700;line-height:1">' + s + '<span style="font-size:1.3rem;opacity:.5">/' + t + '</span></div>' +
    '<div style="font-size:.82rem;color:rgba(255,255,255,.6);margin:.4rem 0">' + pct + '% corretas</div>' +
    '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem">' +
    '<button onclick="ptLusQuiz()" style="background:#fff;color:#4a2800;border:none;border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Repetir quiz</button>' +
    '<button onclick="ptLusMenu()" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Guia de estudo</button>' +
    '</div></div>';
}

function ptLusRenderMenu() {
  var wrap = document.getElementById('pt-lus-content');
  if (!wrap) return;

  var h = '';

  // Estrutura da obra
  h += '<div style="background:linear-gradient(135deg,#4a2800,#b07030);border-radius:20px;padding:1.75rem;margin-bottom:1.25rem;color:#fff">';
  h += '<h3 style="font-family:Cormorant Garamond,serif;font-size:1.5rem;font-weight:700;margin-bottom:.75rem"><i class="ph ph-book-open-text"></i> Estrutura da Obra</h3>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">';
  h += '<div><div style="font-size:.68rem;font-weight:800;opacity:.6;text-transform:uppercase;letter-spacing:.08em">Autor</div><div style="font-size:.88rem;font-weight:600">' + PT_LUS_ESTRUTURA.autor + '</div></div>';
  h += '<div><div style="font-size:.68rem;font-weight:800;opacity:.6;text-transform:uppercase;letter-spacing:.08em">Data</div><div style="font-size:.88rem;font-weight:600">' + PT_LUS_ESTRUTURA.ano + '</div></div>';
  h += '<div><div style="font-size:.68rem;font-weight:800;opacity:.6;text-transform:uppercase;letter-spacing:.08em">Género</div><div style="font-size:.88rem;font-weight:600">' + PT_LUS_ESTRUTURA.genero + '</div></div>';
  h += '<div><div style="font-size:.68rem;font-weight:800;opacity:.6;text-transform:uppercase;letter-spacing:.08em">Forma</div><div style="font-size:.88rem;font-weight:600">' + PT_LUS_ESTRUTURA.forma + '</div></div>';
  h += '</div>';
  h += '<div style="margin-top:1rem;font-size:.85rem;color:rgba(255,255,255,.8);line-height:1.6"><strong>Tema central:</strong> ' + PT_LUS_ESTRUTURA.tema_central + '</div>';
  h += '</div>';

  // Planos da obra
  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:16px;padding:1.25rem 1.5rem;margin-bottom:1.25rem">';
  h += '<div style="font-size:.78rem;font-weight:800;color:var(--ink2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem">Os 3 Planos da Obra</div>';
  h += '<div style="display:grid;gap:.6rem">';
  [['🏛️','Plano Histórico','A viagem de Vasco da Gama + episódios da história de Portugal'],
   ['⚡','Plano Mitológico','Deuses do Olimpo que interferem: Vénus e Marte (a favor) vs. Baco (contra)'],
   ['✍️','Plano Épico/Poético','Narrador (Camões) que comenta, critica e glorifica']].forEach(function(p) {
    h += '<div style="display:flex;gap:.75rem;align-items:flex-start;padding:.6rem .75rem;background:var(--surface);border-radius:10px">';
    h += '<span style="font-size:1.2rem">' + p[0] + '</span>';
    h += '<div><div style="font-size:.82rem;font-weight:800;color:var(--ink1)">' + p[1] + '</div><div style="font-size:.75rem;color:var(--ink3);margin-top:.15rem">' + p[2] + '</div></div></div>';
  });
  h += '</div></div>';

  // Episódios
  h += '<div style="font-size:.78rem;font-weight:800;color:var(--ink2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem;margin-top:1.25rem">Episódios Principais</div>';
  PT_LUS_EPISODIOS.forEach(function(ep) {
    h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:14px;padding:1.1rem 1.25rem;margin-bottom:.6rem' + (ep.exame ? ';border-left:3px solid #b07030' : '') + '">';
    h += '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem">';
    h += '<span style="font-size:.68rem;font-weight:800;background:#fef3e2;color:#b07030;border-radius:999px;padding:2px 9px">' + ep.canto + '</span>';
    if (ep.exame) h += '<span style="font-size:.62rem;font-weight:800;background:#b07030;color:#fff;border-radius:999px;padding:2px 8px">Sai em exame</span>';
    h += '</div>';
    h += '<div style="font-size:.9rem;font-weight:800;color:var(--ink1);margin-bottom:.3rem">' + ep.nome + '</div>';
    h += '<div style="font-size:.8rem;color:var(--ink2);line-height:1.6;margin-bottom:.4rem">' + ep.resumo + '</div>';
    if (ep.citacao) h += '<div style="font-family:Cormorant Garamond,serif;font-size:.9rem;color:#b07030;font-style:italic;padding:.5rem .75rem;background:#fefbf0;border-radius:8px;margin-bottom:.4rem">' + ep.citacao + '</div>';
    h += '<div style="font-size:.75rem;color:#5c4e8a;font-weight:600"><i class="ph ph-lightbulb"></i> ' + ep.importancia + '</div>';
    h += '</div>';
  });

  // Temas
  h += '<div style="font-size:.78rem;font-weight:800;color:var(--ink2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem;margin-top:1.5rem">Temas da Obra</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:1.5rem">';
  PT_LUS_TEMAS.forEach(function(t) {
    h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.85rem 1rem">';
    h += '<div style="font-size:.82rem;font-weight:800;color:var(--ink1);margin-bottom:.25rem">' + t.tema + '</div>';
    h += '<div style="font-size:.74rem;color:var(--ink3);line-height:1.5">' + t.desc + '</div></div>';
  });
  h += '</div>';

  // Botão quiz
  h += '<button onclick="ptLusQuiz()" style="width:100%;background:linear-gradient(135deg,#b07030,#c9a84c);color:#fff;border:none;border-radius:14px;padding:1rem 2rem;font-family:Montserrat,sans-serif;font-size:.9rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem"><i class="ph ph-play"></i> Quiz: Os Lusíadas (' + PT_LUS_BANCO.length + ' questões)</button>';

  wrap.innerHTML = h;
}
