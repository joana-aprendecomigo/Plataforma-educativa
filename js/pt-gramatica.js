// pt-gramatica.js — Gramática Interativa Português 9.º Ano
// Exercícios de funções sintáticas, tempos verbais, classes de palavras,
// subordinação, discurso direto/indireto e conectores

/* ══════════════════════════════════════════════════════
   BANCO DE FUNÇÕES SINTÁTICAS
══════════════════════════════════════════════════════ */
var PT_FUNCOES_BANCO = [
  // SUJEITO
  { frase: 'A <u>Maria</u> leu o poema em voz alta.', alvo: 'Maria', correct: 'sujeito', opts: ['sujeito','complemento direto','predicativo do sujeito','modificador do nome'], exp: '«Maria» é o sujeito — realiza a ação de ler. Pergunta: quem leu? A Maria.' },
  { frase: '<u>Os alunos do 9.º ano</u> estudaram Os Lusíadas.', alvo: 'Os alunos do 9.º ano', correct: 'sujeito', opts: ['sujeito','complemento direto','complemento oblíquo','modificador do grupo verbal'], exp: '«Os alunos do 9.º ano» é o sujeito — realiza a ação de estudar.' },
  { frase: 'Chegaram <u>os resultados dos exames</u>.', alvo: 'os resultados dos exames', correct: 'sujeito', opts: ['sujeito','complemento direto','predicativo do sujeito','vocativo'], exp: 'Sujeito em posição pós-verbal. Quem chegou? Os resultados dos exames.' },
  { frase: 'É <u>importante</u> estudar todos os dias.', alvo: 'importante', correct: 'predicativo do sujeito', opts: ['sujeito','predicativo do sujeito','complemento direto','modificador do nome'], exp: '«Importante» é predicativo do sujeito — atribui uma propriedade ao sujeito frásico «estudar todos os dias» através do verbo copulativo «ser».' },

  // COMPLEMENTO DIRETO
  { frase: 'A professora corrigiu <u>os testes</u>.', alvo: 'os testes', correct: 'complemento direto', opts: ['complemento direto','complemento oblíquo','sujeito','modificador do grupo verbal'], exp: '«Os testes» é o complemento direto — responde à pergunta "o quê?" após o verbo transitivo «corrigiu».' },
  { frase: 'O Camões escreveu <u>Os Lusíadas</u> na Índia.', alvo: 'Os Lusíadas', correct: 'complemento direto', opts: ['complemento direto','sujeito','modificador do grupo verbal','complemento oblíquo'], exp: '«Os Lusíadas» é o complemento direto do verbo «escreveu». O quê? Os Lusíadas.' },
  { frase: 'Ela não entendeu <u>o que foi dito</u>.', alvo: 'o que foi dito', correct: 'complemento direto', opts: ['complemento direto','sujeito','predicativo do sujeito','modificador do nome'], exp: '«O que foi dito» é uma oração subordinada substantiva a funcionar como complemento direto.' },

  // COMPLEMENTO INDIRETO
  { frase: 'O professor entregou o teste <u>à Ana</u>.', alvo: 'à Ana', correct: 'complemento indireto', opts: ['complemento indireto','complemento oblíquo','modificador do grupo verbal','predicativo do sujeito'], exp: '«À Ana» é o complemento indireto — indica o destinatário da ação. Substituível por «lhe».' },
  { frase: 'Ele ofereceu uma flor <u>à mãe</u>.', alvo: 'à mãe', correct: 'complemento indireto', opts: ['complemento indireto','complemento oblíquo','modificador do grupo verbal','sujeito'], exp: '«À mãe» é complemento indireto — destinatário da oferta. Equivale a «Ele ofereceu-lhe uma flor».' },

  // COMPLEMENTO OBLÍQUO
  { frase: 'O João gosta <u>de música clássica</u>.', alvo: 'de música clássica', correct: 'complemento oblíquo', opts: ['complemento oblíquo','complemento direto','complemento indireto','modificador do grupo verbal'], exp: '«De música clássica» é complemento oblíquo — exigido pelo verbo «gostar», introduzido por preposição, mas não é destinatário (≠ complemento indireto).' },
  { frase: 'Ela vive <u>em Lisboa</u> há muitos anos.', alvo: 'em Lisboa', correct: 'complemento oblíquo', opts: ['complemento oblíquo','modificador do grupo verbal','complemento direto','predicativo do sujeito'], exp: '«Em Lisboa» é complemento oblíquo de lugar — exigido pelo verbo «viver».' },
  { frase: 'O livro pertence <u>à biblioteca</u>.', alvo: 'à biblioteca', correct: 'complemento oblíquo', opts: ['complemento oblíquo','complemento indireto','modificador do grupo verbal','sujeito'], exp: '«À biblioteca» é complemento oblíquo — exigido pelo verbo «pertencer» com preposição.' },

  // PREDICATIVO DO SUJEITO
  { frase: 'O Vasco da Gama foi <u>um herói português</u>.', alvo: 'um herói português', correct: 'predicativo do sujeito', opts: ['predicativo do sujeito','complemento direto','sujeito','modificador do nome'], exp: '«Um herói português» é predicativo do sujeito — atribui uma característica ao sujeito «Vasco da Gama» através do verbo copulativo «ser».' },
  { frase: 'A turma ficou <u>entusiasmada</u> com o resultado.', alvo: 'entusiasmada', correct: 'predicativo do sujeito', opts: ['predicativo do sujeito','modificador do grupo verbal','complemento direto','complemento oblíquo'], exp: '«Entusiasmada» é predicativo do sujeito — descreve o estado do sujeito «a turma» através do verbo «ficar».' },
  { frase: 'Ela tornou-se <u>professora</u> aos 25 anos.', alvo: 'professora', correct: 'predicativo do sujeito', opts: ['predicativo do sujeito','complemento direto','sujeito','modificador do grupo verbal'], exp: '«Professora» é predicativo do sujeito — resultado da transformação expressa por «tornar-se».' },

  // PREDICATIVO DO COMPLEMENTO DIRETO
  { frase: 'Consideramos <u>o poema</u> uma obra-prima.', alvo: 'uma obra-prima', correct: 'predicativo do complemento direto', opts: ['predicativo do complemento direto','complemento direto','predicativo do sujeito','modificador do nome'], exp: '«Uma obra-prima» é predicativo do complemento direto — atribui uma propriedade ao CD «o poema».' },
  { frase: 'Elegeram <u>o Rui</u> delegado de turma.', alvo: 'delegado de turma', correct: 'predicativo do complemento direto', opts: ['predicativo do complemento direto','complemento direto','sujeito','modificador do grupo verbal'], exp: '«Delegado de turma» é predicativo do complemento direto — resultado da eleição do Rui.' },

  // MODIFICADOR DO NOME
  { frase: 'Li um livro <u>muito interessante</u>.', alvo: 'muito interessante', correct: 'modificador do nome', opts: ['modificador do nome','predicativo do sujeito','complemento direto','modificador do grupo verbal'], exp: '«Muito interessante» é modificador do nome «livro» — caracteriza-o sem ser exigido pelo verbo.' },
  { frase: 'O poema <u>de Camões</u> é muito conhecido.', alvo: 'de Camões', correct: 'modificador do nome', opts: ['modificador do nome','complemento oblíquo','sujeito','predicativo do sujeito'], exp: '«De Camões» é modificador do nome «poema» — um grupo preposicional que restringe o nome.' },
  { frase: 'Camões, <u>poeta e soldado</u>, viveu no século XVI.', alvo: 'poeta e soldado', correct: 'modificador apositivo do nome', opts: ['modificador apositivo do nome','modificador do nome','predicativo do sujeito','vocativo'], exp: '«Poeta e soldado» é modificador apositivo do nome «Camões» — isolado por vírgulas, acrescenta informação sem restringir.' },

  // MODIFICADOR DO GRUPO VERBAL
  { frase: 'Ela leu o poema <u>lentamente</u>.', alvo: 'lentamente', correct: 'modificador do grupo verbal', opts: ['modificador do grupo verbal','predicativo do sujeito','complemento oblíquo','modificador do nome'], exp: '«Lentamente» é um advérbio de modo que modifica o grupo verbal «leu o poema» — indica o modo como a ação decorreu.' },
  { frase: 'Os alunos estudaram <u>até tarde</u>.', alvo: 'até tarde', correct: 'modificador do grupo verbal', opts: ['modificador do grupo verbal','complemento oblíquo','complemento direto','sujeito'], exp: '«Até tarde» é um modificador de tempo do grupo verbal — indica quando/até quando.' },
  { frase: 'Ela fez o trabalho <u>com cuidado</u>.', alvo: 'com cuidado', correct: 'modificador do grupo verbal', opts: ['modificador do grupo verbal','complemento oblíquo','predicativo do sujeito','modificador do nome'], exp: '«Com cuidado» é modificador do grupo verbal — indica o modo como o trabalho foi feito. Não é exigido pelo verbo.' },

  // VOCATIVO
  { frase: '<u>Ana</u>, podes vir aqui, por favor?', alvo: 'Ana', correct: 'vocativo', opts: ['vocativo','sujeito','complemento direto','modificador do nome'], exp: '«Ana» é vocativo — é um chamamento/apelo à pessoa a quem nos dirigimos. Não desempenha função sintática na frase propriamente dita.' },
  { frase: 'Vai, <u>Luís Vaz</u>, para a Índia servir o teu rei.', alvo: 'Luís Vaz', correct: 'vocativo', opts: ['vocativo','sujeito','complemento direto','predicativo do sujeito'], exp: '«Luís Vaz» é vocativo — apelo ou chamamento à personagem.' },

  // MAIS EXEMPLOS VARIADOS
  { frase: 'O resultado do exame surpreendeu <u>os alunos</u>.', alvo: 'os alunos', correct: 'complemento direto', opts: ['complemento direto','sujeito','complemento oblíquo','modificador do grupo verbal'], exp: '«Os alunos» é complemento direto — quem foi surpreendido. O sujeito é «o resultado do exame».' },
  { frase: '<u>Estudar todos os dias</u> é fundamental.', alvo: 'Estudar todos os dias', correct: 'sujeito', opts: ['sujeito','complemento direto','modificador do grupo verbal','predicativo do sujeito'], exp: '«Estudar todos os dias» é o sujeito frásico — uma oração infinitiva que funciona como sujeito.' },
  { frase: 'O professor chamou <u>brincalhão</u> ao aluno.', alvo: 'brincalhão', correct: 'predicativo do complemento direto', opts: ['predicativo do complemento direto','complemento direto','modificador do nome','predicativo do sujeito'], exp: '«Brincalhão» é predicativo do complemento direto «ao aluno» — atribui-lhe uma característica.' },
  { frase: 'Ele respondeu <u>à professora</u>.', alvo: 'à professora', correct: 'complemento indireto', opts: ['complemento indireto','complemento oblíquo','modificador do grupo verbal','complemento direto'], exp: '«À professora» é complemento indireto — destinatário da resposta. Substituível por «lhe».' },
  { frase: 'O livro estava <u>em cima da mesa</u>.', alvo: 'em cima da mesa', correct: 'complemento oblíquo', opts: ['complemento oblíquo','modificador do grupo verbal','complemento direto','predicativo do sujeito'], exp: '«Em cima da mesa» é complemento oblíquo de lugar — exigido pelo verbo «estar» de localização.' }
];

/* ══════════════════════════════════════════════════════
   BANCO DE TEMPOS VERBAIS
══════════════════════════════════════════════════════ */
var PT_TEMPOS_BANCO = [
  { frase: 'Talvez ela <u>venha</u> amanhã.', forma: 'venha', correct: 'presente do conjuntivo', opts: ['presente do conjuntivo','presente do indicativo','futuro do conjuntivo','pretérito imperfeito do conjuntivo'], exp: '«Venha» é o presente do conjuntivo de «vir» — usado com «talvez» para exprimir hipótese/dúvida.' },
  { frase: 'Se eu <u>estudasse</u> mais, tinha melhores notas.', forma: 'estudasse', correct: 'pretérito imperfeito do conjuntivo', opts: ['pretérito imperfeito do conjuntivo','pretérito imperfeito do indicativo','presente do conjuntivo','pretérito perfeito do conjuntivo'], exp: '«Estudasse» é o pretérito imperfeito do conjuntivo — usado em orações condicionais (se + imperfeito do conjuntivo) para exprimir hipótese no passado ou improvável.' },
  { frase: 'Espero que <u>tenhas</u> estudado para o exame.', forma: 'tenhas', correct: 'pretérito perfeito do conjuntivo', opts: ['pretérito perfeito do conjuntivo','presente do conjuntivo','futuro do conjuntivo','pretérito mais-que-perfeito do conjuntivo'], exp: '«Tenhas» (aux. ter no presente do conjuntivo) + participado = pretérito perfeito do conjuntivo. Exprime esperança sobre ação já ocorrida.' },
  { frase: 'Quando <u>chegares</u>, telefona-me.', forma: 'chegares', correct: 'futuro do conjuntivo', opts: ['futuro do conjuntivo','presente do conjuntivo','pretérito imperfeito do conjuntivo','futuro do indicativo'], exp: '«Chegares» é o futuro do conjuntivo — usado em orações temporais («quando») e condicionais («se») para ações futuras.' },
  { frase: 'Ela disse que <u>viria</u> mais tarde.', forma: 'viria', correct: 'condicional', opts: ['condicional','futuro do indicativo','pretérito imperfeito do indicativo','presente do indicativo'], exp: '«Viria» é o condicional (ou futuro do pretérito) de «vir» — usado em discurso indireto e condicionais.' },
  { frase: 'Quando ela <u>chegou</u>, já tinha começado.', forma: 'chegou', correct: 'pretérito perfeito simples do indicativo', opts: ['pretérito perfeito simples do indicativo','pretérito imperfeito do indicativo','pretérito mais-que-perfeito do indicativo','presente do indicativo'], exp: '«Chegou» é o pretérito perfeito simples — ação pontual e concluída no passado.' },
  { frase: 'O livro <u>tinha sido</u> escrito no século XVI.', forma: 'tinha sido', correct: 'pretérito mais-que-perfeito composto do indicativo', opts: ['pretérito mais-que-perfeito composto do indicativo','pretérito perfeito composto do indicativo','pretérito imperfeito do indicativo','pretérito perfeito simples do indicativo'], exp: '«Tinha sido» (ter no imperfeito + sido) = mais-que-perfeito composto — ação anterior a outra ação passada.' },
  { frase: 'Camões <u>escrevera</u> os versos muito antes de os publicar.', forma: 'escrevera', correct: 'pretérito mais-que-perfeito simples do indicativo', opts: ['pretérito mais-que-perfeito simples do indicativo','pretérito imperfeito do indicativo','pretérito perfeito simples do indicativo','condicional'], exp: '«Escrevera» é o mais-que-perfeito simples (forma sintética) — ação anterior a outra ação passada.' },
  { frase: 'Ela <u>estava</u> a ler quando ele chegou.', forma: 'estava', correct: 'pretérito imperfeito do indicativo', opts: ['pretérito imperfeito do indicativo','pretérito perfeito simples do indicativo','presente do indicativo','condicional'], exp: '«Estava» é o imperfeito do indicativo — ação contínua ou em curso no passado, interrompida por outra ação.' },
  { frase: 'Tomara que eles <u>tivessem intervindo</u> no debate!', forma: 'tivessem intervindo', correct: 'pretérito mais-que-perfeito do conjuntivo', opts: ['pretérito mais-que-perfeito do conjuntivo','pretérito perfeito do conjuntivo','pretérito imperfeito do conjuntivo','futuro composto do conjuntivo'], exp: '«Tivessem intervindo» = ter no imperfeito do conjuntivo + particípio = mais-que-perfeito do conjuntivo — exprime desejo sobre algo que não aconteceu.' },
  { frase: 'Se ele <u>tiver</u> tempo, ajuda-te.', forma: 'tiver', correct: 'futuro do conjuntivo', opts: ['futuro do conjuntivo','presente do conjuntivo','presente do indicativo','pretérito imperfeito do conjuntivo'], exp: '«Tiver» é o futuro do conjuntivo de «ter» — condicional com «se» referindo-se ao futuro.' },
  { frase: 'É possível que <u>tenha começado</u> antes.', forma: 'tenha começado', correct: 'pretérito perfeito do conjuntivo', opts: ['pretérito perfeito do conjuntivo','presente do conjuntivo','pretérito imperfeito do conjuntivo','futuro do conjuntivo'], exp: '«Tenha começado» = ter no presente do conjuntivo + particípio = pretérito perfeito do conjuntivo — hipótese sobre ação passada.' }
];

/* ══════════════════════════════════════════════════════
   BANCO DE CLASSES DE PALAVRAS
══════════════════════════════════════════════════════ */
var PT_CLASSES_BANCO = [
  { frase: 'Os alunos estudaram <u>muito</u> antes do exame.', alvo: 'muito', correct: 'advérbio de quantidade', opts: ['advérbio de quantidade','determinante indefinido','adjetivo qualificativo','quantificador'], exp: '«Muito» a modificar um verbo ou adjetivo é advérbio de quantidade/intensidade. Aqui modifica «estudaram».' },
  { frase: '<u>Estes</u> poemas foram escritos no século XVI.', alvo: 'Estes', correct: 'determinante demonstrativo', opts: ['determinante demonstrativo','pronome demonstrativo','determinante definido','quantificador'], exp: '«Estes» acompanha o nome «poemas» — é determinante demonstrativo. Se estivesse sozinho («estes foram escritos»), seria pronome.' },
  { frase: '<u>Uns</u> disseram que sim, outros disseram que não.', alvo: 'Uns', correct: 'pronome indefinido', opts: ['pronome indefinido','determinante indefinido','quantificador numeral','artigo indefinido'], exp: '«Uns» está sem nome — substitui o nome (pessoas). É pronome indefinido.' },
  { frase: 'Li <u>vários</u> livros este verão.', alvo: 'vários', correct: 'determinante indefinido', opts: ['determinante indefinido','quantificador numeral','advérbio','pronome indefinido'], exp: '«Vários» acompanha «livros» e não tem valor preciso — é determinante indefinido.' },
  { frase: 'O livro <u>de que</u> me falaste está esgotado.', alvo: 'de que', correct: 'pronome relativo', opts: ['pronome relativo','conjunção subordinativa','preposição + pronome pessoal','determinante relativo'], exp: '«Que» é pronome relativo que retoma «o livro» e introduz a oração subordinada adjetiva relativa.' },
  { frase: 'Ela chegou <u>cedo</u> à escola.', alvo: 'cedo', correct: 'advérbio de tempo', opts: ['advérbio de tempo','advérbio de modo','adjetivo qualificativo','determinante'], exp: '«Cedo» é um advérbio de tempo — indica quando ocorreu a ação.' },
  { frase: 'O texto é <u>muito</u> longo.', alvo: 'muito', correct: 'advérbio de quantidade', opts: ['advérbio de quantidade','determinante indefinido','quantificador','adjetivo qualificativo'], exp: '«Muito» modifica o adjetivo «longo» — é advérbio de quantidade/grau.' },
  { frase: '<u>Calem-se</u>, por favor.', alvo: 'Calem-se', correct: 'verbo no imperativo', opts: ['verbo no imperativo','verbo no conjuntivo','verbo no infinitivo','verbo no indicativo'], exp: '«Calem-se» é o imperativo de «calar-se» — exprime uma ordem ou instrução.' },
  { frase: 'Ela leu o texto <u>pausadamente</u>.', alvo: 'pausadamente', correct: 'advérbio de modo', opts: ['advérbio de modo','adjetivo qualificativo','advérbio de tempo','complemento oblíquo'], exp: '«Pausadamente» é advérbio de modo (terminação -mente) — indica o modo como a ação foi realizada.' },
  { frase: 'Todos os alunos vieram. <u>Nenhum</u> faltou.', alvo: 'Nenhum', correct: 'pronome indefinido', opts: ['pronome indefinido','determinante indefinido','quantificador','adjetivo'], exp: '«Nenhum» está sozinho (sem nome) — é pronome indefinido que substitui o sujeito.' }
];

/* ══════════════════════════════════════════════════════
   BANCO DE ORAÇÕES SUBORDINADAS
══════════════════════════════════════════════════════ */
var PT_SUBORDINADAS_BANCO = [
  { frase: 'Estudei muito <u>porque queria ter boas notas</u>.', oração: 'porque queria ter boas notas', correct: 'adverbial causal', opts: ['adverbial causal','adverbial concessiva','adverbial final','adverbial condicional'], exp: '«Porque» introduz uma causa — responde à pergunta «porquê?». É adverbial causal.' },
  { frase: 'Apesar de ter chovido, <u>foram à praia</u>. Identifica a oração sublinhada.', oração: 'Apesar de ter chovido', correct: 'adverbial concessiva', opts: ['adverbial concessiva','adverbial causal','adverbial condicional','adverbial temporal'], exp: '«Apesar de» introduz uma concessão — a chuva não impediu a ida à praia. É adverbial concessiva.' },
  { frase: 'Se estudares, terás boas notas. A oração sublinhada é <u>«se estudares»</u>.', oração: 'se estudares', correct: 'adverbial condicional', opts: ['adverbial condicional','adverbial causal','adverbial temporal','adverbial concessiva'], exp: '«Se» introduz uma condição — é adverbial condicional.' },
  { frase: 'Estudou muito <u>para ter boas notas</u>.', oração: 'para ter boas notas', correct: 'adverbial final', opts: ['adverbial final','adverbial causal','adverbial condicional','adverbial consecutiva'], exp: '«Para» (+ infinitivo) indica finalidade/objetivo — é adverbial final.' },
  { frase: 'Ela fez tanto barulho <u>que acordou todos</u>.', oração: 'que acordou todos', correct: 'adverbial consecutiva', opts: ['adverbial consecutiva','adverbial causal','adverbial comparativa','adverbial final'], exp: '«Tanto... que» exprime uma consequência — é adverbial consecutiva.' },
  { frase: 'Quando chegou a casa, <u>ligou logo a televisão</u>.', oração: 'Quando chegou a casa', correct: 'adverbial temporal', opts: ['adverbial temporal','adverbial condicional','adverbial final','adverbial concessiva'], exp: '«Quando» introduz uma relação temporal — é adverbial temporal.' },
  { frase: 'O livro <u>que li</u> era muito interessante.', oração: 'que li', correct: 'adjetiva relativa restritiva', opts: ['adjetiva relativa restritiva','adjetiva relativa apositiva','substantiva completiva','adverbial relativa'], exp: '«Que li» restringe o nome «livro» (sem vírgulas) — é subordinada adjetiva relativa restritiva.' },
  { frase: 'Os Lusíadas, <u>que foi escrito no século XVI</u>, é a maior epopeia portuguesa.', oração: 'que foi escrito no século XVI', correct: 'adjetiva relativa apositiva', opts: ['adjetiva relativa apositiva','adjetiva relativa restritiva','substantiva completiva','adverbial temporal'], exp: '«Que foi escrito no século XVI» está entre vírgulas e acrescenta informação sem restringir — é adjetiva relativa apositiva.' },
  { frase: 'Ela disse <u>que vinha amanhã</u>.', oração: 'que vinha amanhã', correct: 'substantiva completiva', opts: ['substantiva completiva','adjetiva relativa restritiva','adverbial causal','adverbial temporal'], exp: '«Que vinha amanhã» é uma oração substantiva completiva — funciona como complemento direto do verbo «disse».' },
  { frase: 'A locução «mesmo que» pode ser substituída por <u>«ainda que»</u>.', oração: 'ainda que', correct: 'concessiva', opts: ['concessiva','causal','condicional','temporal'], exp: '«Mesmo que» e «ainda que» são locuções conjuncionais concessivas — introduzem uma concessão.' },
  { frase: 'Ela fez tudo <u>a fim de que</u> o projeto fosse aprovado.', oração: 'a fim de que', correct: 'final', opts: ['final','causal','condicional','consecutiva'], exp: '«A fim de que» é locução conjuncional final — exprime o objetivo ou a finalidade da ação.' },
  { frase: 'Ela correu mais depressa <u>do que eu</u>.', oração: 'do que eu', correct: 'comparativa', opts: ['comparativa','consecutiva','concessiva','causal'], exp: '«Do que eu» introduz uma comparação — é adverbial comparativa de superioridade.' }
];

/* ══════════════════════════════════════════════════════
   MOTOR DO JOGO DE GRAMÁTICA
══════════════════════════════════════════════════════ */
var _ptGram = {
  mode: null,      // 'funcoes' | 'tempos' | 'classes' | 'subordinadas'
  banco: [],
  idx: 0,
  score: 0,
  total: 0,
  answered: false,
  streak: 0
};

function ptGramStart(mode) {
  var bancos = {
    funcoes: PT_FUNCOES_BANCO,
    tempos: PT_TEMPOS_BANCO,
    classes: PT_CLASSES_BANCO,
    subordinadas: PT_SUBORDINADAS_BANCO
  };
  if (!bancos[mode]) return;
  _ptGram.mode = mode;
  _ptGram.banco = bancos[mode].slice().sort(function(){ return Math.random() - .5; });
  _ptGram.idx = 0;
  _ptGram.score = 0;
  _ptGram.total = 0;
  _ptGram.answered = false;
  _ptGram.streak = 0;
  // Mostrar engine, esconder menu
  var menu = document.getElementById('pt-gram-menu');
  var eng = document.getElementById('pt-gram-engine');
  if (menu) menu.style.display = 'none';
  if (eng) eng.style.display = 'block';
  ptGramRender();
}

function ptGramRender() {
  var wrap = document.getElementById('pt-gram-engine');
  if (!wrap) return;
  var banco = _ptGram.banco;
  var idx = _ptGram.idx;

  if (idx >= banco.length) {
    ptGramFinish();
    return;
  }

  var q = banco[idx];
  var pct = banco.length ? Math.round(idx / banco.length * 100) : 0;
  var labels = {
    funcoes: 'Funções Sintáticas',
    tempos: 'Tempos Verbais',
    classes: 'Classes de Palavras',
    subordinadas: 'Orações Subordinadas'
  };

  var h = '';
  // Header
  h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">';
  h += '<button onclick="ptGramBack()" style="background:none;border:none;font-size:.78rem;font-weight:700;color:#6b5fa0;cursor:pointer;display:flex;align-items:center;gap:.3rem;padding:0;font-family:Montserrat,sans-serif"><i class="ph ph-arrow-left"></i> Gramática</button>';
  h += '<div style="display:flex;align-items:center;gap:.75rem">';
  h += '<span style="font-size:.72rem;font-weight:700;color:var(--ink4)">' + (idx+1) + '/' + banco.length + '</span>';
  if (_ptGram.streak >= 3) h += '<span style="font-size:.72rem;font-weight:800;background:#fef3e2;color:#b07030;border:1px solid #f4d99a;padding:3px 8px;border-radius:999px">🔥 ' + _ptGram.streak + ' seguidas</span>';
  h += '<span style="font-size:.72rem;font-weight:800;background:#e8f5ee;color:#2e7d52;border:1px solid #a8d8b8;padding:3px 8px;border-radius:999px">✓ ' + _ptGram.score + '/' + _ptGram.total + '</span>';
  h += '</div></div>';

  // Barra de progresso
  h += '<div style="height:5px;background:var(--border);border-radius:99px;margin-bottom:1.5rem;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#8b7cc0,#5c4e8a);border-radius:99px;transition:width .4s ease"></div></div>';

  // Questão
  h += '<div style="background:var(--white);border:1.5px solid var(--border);border-radius:20px;padding:1.75rem">';
  h += '<div style="font-size:.68rem;font-weight:800;color:#7c6fa0;text-transform:uppercase;letter-spacing:.1em;margin-bottom:1rem">' + (labels[_ptGram.mode] || '') + '</div>';

  // Instrução
  var instrucao = {
    funcoes: 'Qual a função sintática do segmento sublinhado?',
    tempos: 'Qual o tempo/modo verbal da forma sublinhada?',
    classes: 'Qual a classe/subclasse da palavra sublinhada?',
    subordinadas: 'Qual o tipo de oração sublinhada?'
  };
  h += '<div style="font-size:.75rem;font-weight:700;color:var(--ink3);margin-bottom:.75rem">' + (instrucao[_ptGram.mode] || '') + '</div>';

  // Frase
  h += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.15rem;line-height:1.8;color:var(--ink1);margin-bottom:1.5rem;padding:1rem 1.25rem;background:#f8f6ff;border-radius:12px;border-left:3px solid #8b7cc0">' + q.frase + '</div>';

  // Opções
  h += '<div id="pt-gram-opts">';
  var opts = q.opts.slice().sort(function(){ return Math.random() - .5; });
  // Guardar ordem aleatória para verificação
  _ptGram.currentOpts = opts;
  opts.forEach(function(opt, i) {
    h += '<button onclick="ptGramSelect(this)" data-opt="' + opt.replace(/"/g,'&quot;').replace(/'/g,'&#39;') + '" style="display:block;width:100%;text-align:left;background:var(--white);border:1.5px solid var(--border);border-radius:12px;padding:.8rem 1.1rem;margin-bottom:.5rem;font-family:Montserrat,sans-serif;font-size:.86rem;font-weight:600;color:var(--ink1);cursor:pointer;transition:all .15s">';
    h += opt;
    h += '</button>';
  });
  h += '</div>';

  // Feedback
  h += '<div id="pt-gram-feedback" style="display:none;margin-top:.75rem"></div>';

  // Botão próxima
  h += '<button id="pt-gram-next" onclick="ptGramNext()" style="display:none;width:100%;margin-top:.75rem;background:linear-gradient(135deg,#4a3f7a,#6b5fa0);color:#fff;border:none;border-radius:12px;padding:.85rem;font-weight:800;font-size:.88rem;cursor:pointer;font-family:Montserrat,sans-serif">Próxima <i class="ph ph-arrow-right"></i></button>';

  h += '</div>';
  wrap.innerHTML = h;
  _ptGram.answered = false;
}

function ptGramSelect(btn) {
  if (_ptGram.answered) return;
  var chosen = btn.getAttribute('data-opt');
  _ptGram.answered = true;
  _ptGram.total++;

  var q = _ptGram.banco[_ptGram.idx];
  var correct = chosen === q.correct;
  if (correct) { _ptGram.score++; _ptGram.streak++; }
  else { _ptGram.streak = 0; }

  // Colorir botões
  var btns = document.querySelectorAll('#pt-gram-opts button');
  btns.forEach(function(b) {
    var opt = b.getAttribute('data-opt');
    b.style.cursor = 'default';
    b.onclick = null;
    if (opt === q.correct) {
      b.style.borderColor = '#2e7d52';
      b.style.background = '#e8f5ee';
      b.style.color = '#1a5c38';
      b.style.fontWeight = '800';
    } else if (opt === chosen && !correct) {
      b.style.borderColor = '#c0392b';
      b.style.background = '#fdecea';
      b.style.color = '#922b21';
    }
  });

  // Feedback
  var fb = document.getElementById('pt-gram-feedback');
  if (fb) {
    var icon = correct ? '<i class="ph ph-check-circle"></i>' : '<i class="ph ph-x-circle"></i>';
    var cor = correct ? '#2e7d52' : '#922b21';
    var bg = correct ? '#e8f5ee' : '#fdecea';
    var brd = correct ? '#2e7d52' : '#c0392b';
    fb.innerHTML = '<div style="background:' + bg + ';border:1.5px solid ' + brd + ';border-radius:12px;padding:.85rem 1rem;font-size:.83rem;color:' + cor + '">' +
      '<strong>' + icon + ' ' + (correct ? 'Correto!' : 'Resposta: <em>' + q.correct + '</em>') + '</strong>' +
      (q.exp ? '<br><span style="margin-top:.35rem;display:block;line-height:1.6">' + q.exp + '</span>' : '') +
      '</div>';
    fb.style.display = 'block';
  }

  // Próxima
  var next = document.getElementById('pt-gram-next');
  if (next) next.style.display = 'block';
}

function ptGramNext() {
  _ptGram.idx++;
  ptGramRender();
}

function ptGramBack() {
  var eng = document.getElementById('pt-gram-engine');
  var menu = document.getElementById('pt-gram-menu');
  if (eng) { eng.innerHTML = ''; eng.style.display = 'none'; }
  if (menu) menu.style.display = 'block';
}

function ptGramFinish() {
  var wrap = document.getElementById('pt-gram-engine');
  if (!wrap) return;
  var s = _ptGram.score, t = _ptGram.total;
  var pct = t ? Math.round(s/t*100) : 0;
  var emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎯' : pct >= 50 ? '📚' : '💪';
  var msg = pct >= 90 ? 'Domínio excelente!' : pct >= 70 ? 'Muito bom! Continua assim.' : pct >= 50 ? 'Bom começo, pratica mais!' : 'Revê a matéria e tenta de novo!';

  wrap.innerHTML = '<div style="background:linear-gradient(135deg,#2d2450,#4a3f7a);border-radius:20px;padding:2.5rem 2rem;text-align:center;color:#fff">' +
    '<div style="font-size:2.5rem;margin-bottom:.5rem">' + emoji + '</div>' +
    '<div style="font-family:JetBrains Mono,monospace;font-size:3rem;font-weight:700;color:#fff;line-height:1">' + s + '<span style="font-size:1.3rem;opacity:.5">/' + t + '</span></div>' +
    '<div style="font-size:.82rem;color:rgba(255,255,255,.6);margin:.4rem 0">' + pct + '% corretas</div>' +
    '<div style="font-size:.9rem;font-weight:600;color:rgba(255,255,255,.85);margin-bottom:1.5rem">' + msg + '</div>' +
    '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">' +
    '<button onclick="ptGramStart(\'' + _ptGram.mode + '\')" style="background:#fff;color:#4a3f7a;border:none;border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Repetir</button>' +
    '<button onclick="ptGramBack()" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:.75rem 1.5rem;font-weight:800;font-size:.85rem;cursor:pointer;font-family:Montserrat,sans-serif">Outro tema</button>' +
    '</div></div>';
}
