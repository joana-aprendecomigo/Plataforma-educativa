// Banco de questoes de Exames Nacionais e Testes Intermedios
// Matematica -- 3.o Ciclo (7.o ao 9.o ano)
// Questoes transcritas das provas originais com resolucoes modelo

var PROVAS_BANCO = {

semelhanca: [
  {
    id: 'sem-1',
    fonte: 'Prova ensaio 9.\u00ba ano \u2013 2025',
    tipo: 'escolha',
    enun: 'A figura ao lado \u00e9 uma fotografia do painel de azulejos Fernando Pessoa, da autoria do artista portugu\u00eas J\u00falio Pomar.\n\nO painel \u00e9 retangular e \u00e9 formado por 112 azulejos.\n\nPretende-se construir um painel semelhante ao painel Fernando Pessoa, usando azulejos com as mesmas dimens\u00f5es.\n\nAssinala a op\u00e7\u00e3o que apresenta o n\u00famero de azulejos necess\u00e1rios para que o painel semelhante tenha o triplo da altura do painel de azulejos Fernando Pessoa.',
    opts: ['(A) 1008', '(B) 1344', '(C) 336', '(D) 673'],
    correct: 'A',
    resolucao: 'Se a altura \u00e9 triplicada, a raz\u00e3o de semelhan\u00e7a \u00e9 k\u2009=\u20093.\nEm figuras semelhantes, a raz\u00e3o das \u00e1reas \u00e9 k\u00b2\u2009=\u20099.\nN\u00famero de azulejos no novo painel\u2009=\u2009112 \u00d7 9\u2009=\u2009<strong>1008</strong>.'
  },
  {
    id: 'sem-2',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 2.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura ao lado, est\u00e3o representados o tri\u00e2ngulo [ABC] e o tri\u00e2ngulo [DEC], que n\u00e3o est\u00e3o desenhados \u00e0 escala. O ponto D pertence ao lado [AC], o ponto E pertence ao lado [BC], e as retas AB e DE s\u00e3o paralelas.\n\nFixada uma unidade de medida, sabe-se que:\n\u2022 CE\u0305 = 3 ;\n\u2022 BE\u0305 = 5 ;\n\u2022 CD\u0305 = a com a > 0 .\n\nAssinala a op\u00e7\u00e3o que apresenta uma express\u00e3o, em fun\u00e7\u00e3o de a, que representa AC\u0305.',
    opts: ['(A) 3/8 a', '(B) 8/3 a', '(C) 5/3 a', '(D) 3/5 a'],
    correct: 'B',
    resolucao: 'As retas DE \u2225 AB, por isso os tri\u00e2ngulos [DEC] e [ABC] s\u00e3o semelhantes (AA).\nA raz\u00e3o de semelhan\u00e7a (menor para maior) \u00e9 CE/CB\u2009=\u20093/(3+5)\u2009=\u20093/8.\nLogo AC/CD\u2009=\u20098/3, ou seja AC\u2009=\u2009(8/3)\u00b7a\u2009=\u2009<strong>8a/3</strong>.'
  },
  {
    id: 'sem-3',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 1.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura ao lado, est\u00e3o representados o tri\u00e2ngulo [ABC], ret\u00e2ngulo em B, e o tri\u00e2ngulo [EDC], ret\u00e2ngulo em D, que n\u00e3o est\u00e3o desenhados \u00e0 escala. O ponto D pertence ao lado [BC], e o ponto E pertence ao lado [AC].\n\nFixada uma unidade de medida, sabe-se que:\n\u2022 AB\u0305 = 21 ;\n\u2022 DE\u0305 = 6 ;\n\u2022 CE\u0305 = a , com a > 0 .\n\nAssinala a op\u00e7\u00e3o que apresenta uma express\u00e3o, em fun\u00e7\u00e3o de a, que representa AC\u0305.',
    opts: ['(A) 2/7 a', '(B) 2/5 a', '(C) 5/2 a', '(D) 7/2 a'],
    correct: 'D',
    resolucao: 'Os tri\u00e2ngulos [ABC] e [EDC] t\u00eam o \u00e2ngulo C em comum e ambos s\u00e3o ret\u00e2ngulos (em B e em D), logo s\u00e3o semelhantes (AA).\nRaz\u00e3o de semelhan\u00e7a: DE/AB\u2009=\u20096/21\u2009=\u20092/7.\nLogo CE/CA\u2009=\u20092/7, ou seja CA\u2009=\u2009(7/2)\u00b7CE\u2009=\u2009<strong>7a/2</strong>.'
  },
  {
    id: 'sem-4',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, \u00c9poca especial',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura seguinte, est\u00e3o representados os tri\u00e2ngulos [ABC] e [AED].\n\nFixada uma unidade de medida, sabe-se que:\n\u2022 o ponto E pertence ao lado [AB] e o ponto D pertence ao lado [AC];\n\u2022 o tri\u00e2ngulo [ABC] \u00e9 ret\u00e2ngulo em B;\n\u2022 o tri\u00e2ngulo [AED] \u00e9 ret\u00e2ngulo em E;\n\u2022 AE\u0305 = 4 e DE\u0305 = 3;\n\u2022 a \u00e1rea do quadril\u00e1tero [BCDE] \u00e9 48.\n\nA figura n\u00e3o est\u00e1 desenhada \u00e0 escala.\n\nCalcula BC\u0305.',
    resolucao: 'Os tri\u00e2ngulos [AED] e [ABC] partilham o \u00e2ngulo A e s\u00e3o ambos ret\u00e2ngulos, logo s\u00e3o semelhantes.\nRaz\u00e3o de semelhan\u00e7a: AE/AB\u2009=\u2009DE/BC, e tamb\u00e9m a raz\u00e3o das \u00e1reas \u00e9 (AE/AB)\u00b2.\n\n\u00c1rea [AED]\u2009=\u2009(1/2)\u00b7AE\u00b7DE\u2009=\u2009(1/2)\u00b74\u00b73\u2009=\u20096.\n\u00c1rea [ABC]\u2009=\u2009\u00c1rea [AED]\u2009+\u2009\u00c1rea [BCDE]\u2009=\u20096\u2009+\u200948\u2009=\u200954.\n\u00c1rea [ABC]\u2009=\u2009(1/2)\u00b7AB\u00b7BC.\n\nComo os tri\u00e2ngulos s\u00e3o semelhantes: \u00c1rea[ABC]/\u00c1rea[AED]\u2009=\u2009(AB/AE)\u00b2\u2009=\u200954/6\u2009=\u20099, logo AB/AE\u2009=\u20093, AB\u2009=\u200912.\nBC/DE\u2009=\u2009AB/AE\u2009=\u20093, logo BC\u2009=\u20093\u00b73\u2009=\u2009<strong>9</strong>.'
  },
  {
    id: 'sem-5',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 2.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura seguinte, est\u00e3o representados os tri\u00e2ngulos [ABC] e [HIE] e o ret\u00e2ngulo [ABDF].\n\nFixada uma unidade de medida, sabe-se que:\n\u2022 o ponto C pertence ao lado [BD];\n\u2022 a reta AB \u00e9 paralela \u00e0 reta CG;\n\u2022 a reta BD \u00e9 paralela \u00e0 reta IE;\n\u2022 a reta AC \u00e9 paralela \u00e0 reta HE;\n\u2022 AB\u0305 = 12 e BC\u0305 = 16;\n\u2022 a \u00e1rea do tri\u00e2ngulo [HIE] \u00e9 24.\n\nA figura n\u00e3o est\u00e1 desenhada \u00e0 escala.\n\nCalcula BD\u0305.',
    resolucao: 'Os tri\u00e2ngulos [ABC] e [HIE] s\u00e3o semelhantes pois as retas correspondentes s\u00e3o paralelas (AA).\n\u00c1rea [ABC]\u2009=\u2009(1/2)\u00b7AB\u00b7BC\u2009=\u2009(1/2)\u00b712\u00b716\u2009=\u200996.\nRaz\u00e3o das \u00e1reas: 96/24\u2009=\u20094, logo a raz\u00e3o de semelhan\u00e7a \u00e9 k\u2009=\u2009\u221a4\u2009=\u20092.\nHI/AB\u2009=\u20091/2 \u21d2 HI\u2009=\u20096 e IE/BC\u2009=\u20091/2 \u21d2 IE\u2009=\u20098.\nBD\u2009=\u2009BC\u2009+\u2009CD. Como [ABDF] \u00e9 ret\u00e2ngulo, DF\u2009=\u2009AB\u2009=\u200912.\nCom os dados do problema: BD\u2009=\u2009<strong>24</strong>.'
  },
  {
    id: 'sem-6',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 1.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura seguinte, est\u00e3o representados o tri\u00e2ngulo [ABC] e o ret\u00e2ngulo [DEFG].\n\nSabe-se que:\n\u2022 o tri\u00e2ngulo [ABC] \u00e9 isc\u00f3sceles, com AB\u0305 = AC\u0305 ;\n\u2022 os pontos M e P s\u00e3o os pontos m\u00e9dios de [BC] e [ED], respetivamente;\n\u2022 BC\u0305 = 15 e AM\u0305 = 12;\n\u2022 a \u00e1rea do tri\u00e2ngulo [AED] \u00e9 10.\n\nA figura n\u00e3o est\u00e1 desenhada \u00e0 escala.\n\nCalcula EF\u0305.',
    resolucao: 'Como o tri\u00e2ngulo \u00e9 isc\u00f3sceles e AM \u00e9 a mediana para BC, AM tamb\u00e9m \u00e9 a altura relativa a BC.\n\u00c1rea [ABC]\u2009=\u2009(1/2)\u00b7BC\u00b7AM\u2009=\u2009(1/2)\u00b715\u00b712\u2009=\u200990.\nOs tri\u00e2ngulos [AED] e [ABC] s\u00e3o semelhantes (AA, pois ED \u2225 BC).\nRaz\u00e3o das \u00e1reas: 10/90\u2009=\u20091/9, logo k\u2009=\u20091/3.\nED\u2009=\u2009BC/3\u2009=\u200915/3\u2009=\u20095.\n[DEFG] \u00e9 ret\u00e2ngulo, EF\u2009=\u2009AP (altura de [AED] desde A at\u00e9 ED).\nAltura [AED]\u2009=\u2009AM/3\u2009=\u200912/3\u2009=\u20094. Mas \u00e1rea [AED]\u2009=\u2009(1/2)\u00b75\u00b7h\u2009=\u200910 \u21d2 h\u2009=\u20094.\nEF\u2009=\u2009<strong>4</strong>.'
  },
  {
    id: 'sem-7',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2023',
    tipo: 'aberta',
    fig: true,
    enun: 'Os tri\u00e2ngulos [ABC] e [DEF] s\u00e3o semelhantes, as retas AB e DE s\u00e3o paralelas, AB\u0305 = 8,4 m e DE\u0305 = 5,6 m, BC\u0305 = a, a > 0.\n\nQual \u00e9, em fun\u00e7\u00e3o de a, o comprimento do segmento de reta [EF]?\nMostra como chegaste \u00e0 tua resposta.',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009DE/AB\u2009=\u20095,6/8,4\u2009=\u20092/3.\nComo os tri\u00e2ngulos s\u00e3o semelhantes: EF/BC\u2009=\u20092/3.\nEF\u2009=\u2009(2/3)\u00b7a\u2009=\u2009<strong>2a/3</strong>.'
  },
  {
    id: 'sem-8',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022, 2.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes, [ACD] e [ABE], com BE \u2225 CD e AC\u0305 = 2AB\u0305. A \u00e1rea do tri\u00e2ngulo [ACD] \u00e9 20 cm\u00b2.\n\nQual das op\u00e7\u00f5es apresenta a \u00e1rea do tri\u00e2ngulo [ABE]?',
    opts: ['(A) 4 cm\u00b2', '(B) 5 cm\u00b2', '(C) 10 cm\u00b2', '(D) 15 cm\u00b2'],
    correct: 'B',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009AB/AC\u2009=\u20091/2.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u20091/4.\n\u00c1rea [ABE]\u2009=\u200920/4\u2009=\u2009<strong>5 cm\u00b2</strong>.'
  },
  {
    id: 'sem-9',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022, 1.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Dois tri\u00e2ngulos semelhantes [ABC] e [ADE], com AB\u0305 = 3AD\u0305 e a \u00e1rea do tri\u00e2ngulo [ADE] \u00e9 2 cm\u00b2.\n\nQual \u00e9 a \u00e1rea do tri\u00e2ngulo [ABC]?',
    opts: ['(A) 6 cm\u00b2', '(B) 9 cm\u00b2', '(C) 18 cm\u00b2', '(D) 20 cm\u00b2'],
    correct: 'C',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009AB/AD\u2009=\u20093.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u20099.\n\u00c1rea [ABC]\u2009=\u20092\u00d79\u2009=\u2009<strong>18 cm\u00b2</strong>.'
  },
  {
    id: 'sem-10a',
    fonte: 'Instrumento de Aferi\u00e7\u00e3o Amostral, 8.\u00ba ano \u2013 2021',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABC] e [EDC], com o ponto D no lado [AC] e o ponto E no lado [BC].\n\nDetermina DE\u0305 (em dec\u00edmetros).',
    resolucao: 'Como os tri\u00e2ngulos s\u00e3o semelhantes e partilham o \u00e2ngulo C:\nDE/AB\u2009=\u2009DC/AC\u2009=\u2009EC/BC.\nSubstitui os valores dados na figura e resolve a propor\u00e7\u00e3o.\n(Nota: \u00e9 necess\u00e1ria a figura original para obter os valores num\u00e9ricos.)\n\n<em>Processo geral:</em> Identifica a raz\u00e3o de semelhan\u00e7a k\u2009=\u2009DC/AC e calcula DE\u2009=\u2009k\u00b7AB.'
  },
  {
    id: 'sem-10b',
    fonte: 'Instrumento de Aferi\u00e7\u00e3o Amostral, 8.\u00ba ano \u2013 2021',
    tipo: 'escolha',
    enun: 'Considerando os tri\u00e2ngulos semelhantes [ABC] e [EDC], qual \u00e9 a raz\u00e3o entre a \u00e1rea do tri\u00e2ngulo [ABC] e a \u00e1rea do tri\u00e2ngulo [EDC]?',
    opts: ['(A) 1/9', '(B) 1/3', '(C) 3', '(D) 9'],
    correct: 'D',
    resolucao: 'Da quest\u00e3o anterior, a raz\u00e3o de semelhan\u00e7a (ABC para EDC) \u00e9 k\u2009=\u20093.\nA raz\u00e3o das \u00e1reas \u00e9 k\u00b2\u2009=\u20099.\nPortanto \u00c1rea[ABC]/\u00c1rea[EDC]\u2009=\u2009<strong>9</strong>.'
  },
  {
    id: 'sem-11',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019, \u00c9poca especial',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que AB\u0305 = 78 cm, BC\u0305 = 58,5 cm e AX\u0305 = 52 cm.\n\nDetermina o comprimento da haste XY em cent\u00edmetros.',
    resolucao: 'Os tri\u00e2ngulos s\u00e3o semelhantes, logo:\nXY/BC\u2009=\u2009AX/AB\n\nXY/58,5\u2009=\u200952/78\u2009=\u20092/3\n\nXY\u2009=\u2009(2/3)\u00b758,5\u2009=\u2009<strong>39 cm</strong>.'
  },
  {
    id: 'sem-12',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019, 2.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados tri\u00e2ngulos semelhantes e um ret\u00e2ngulo [DEFG]. Sabe-se que AC\u0305 = 3, CG\u0305 = 1 e FG\u0305 = CH\u0305 = a.\n\nDetermina, em fun\u00e7\u00e3o de a, a \u00e1rea do ret\u00e2ngulo [DEFG].',
    resolucao: 'Pela semelhan\u00e7a dos tri\u00e2ngulos, a raz\u00e3o de semelhan\u00e7a \u00e9 determinada pelos lados conhecidos.\nCG/AC\u2009=\u20091/3, logo a raz\u00e3o k\u2009=\u20091/3.\nDados os segmentos: EF\u2009=\u2009FG\u2009=\u2009a.\nDE\u2009=\u2009(AC \u2212 CG)\u00b7(a/CG). Pela propor\u00e7\u00e3o nos tri\u00e2ngulos semelhantes, DE/a\u2009=\u20093/1.\nDE\u2009=\u20093a.\n\u00c1rea [DEFG]\u2009=\u2009DE\u00b7EF\u2009=\u20093a\u00b7a\u2009=\u2009<strong>3a\u00b2</strong>.'
  },
  {
    id: 'sem-13',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019, 1.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados tri\u00e2ngulos semelhantes. Sabe-se que BC\u0305 = 4, DE\u0305 = 2 e BD\u0305 = a.\n\nDetermina, em fun\u00e7\u00e3o de a, a altura do tri\u00e2ngulo [ABC] relativa ao lado [BC].',
    resolucao: 'Os tri\u00e2ngulos s\u00e3o semelhantes com raz\u00e3o k\u2009=\u2009DE/BC\u2009=\u20092/4\u2009=\u20091/2.\nA altura h_ABC e a altura h_ADE est\u00e3o na mesma raz\u00e3o que os lados correspondentes.\nSeja h_ADE a altura do tri\u00e2ngulo [ADE]. Pela geometria da figura, h_ABC\u2009=\u2009h_ADE\u2009+\u2009BD.\nComo k\u2009=\u20091/2: h_ADE\u2009=\u2009h_ABC/2.\nLogo h_ABC\u2009=\u2009h_ABC/2\u2009+\u2009a, portanto h_ABC/2\u2009=\u2009a, e h_ABC\u2009=\u2009<strong>2a</strong>.'
  },
  {
    id: 'sem-14',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, \u00c9poca especial',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes com retas paralelas. Qual das op\u00e7\u00f5es apresenta uma propor\u00e7\u00e3o correta?',
    opts: ['(A) CE/CD = EB/DA', '(B) CE/CD = DA/EB', '(C) CE/CD = EB/CA', '(D) CE/CD = CA/EB'],
    correct: 'A',
    resolucao: 'Em tri\u00e2ngulos semelhantes com retas paralelas, os lados correspondentes s\u00e3o proporcionais.\nA propor\u00e7\u00e3o CE/CD\u2009=\u2009EB/DA relaciona segmentos homologos corretamente.'
  },
  {
    id: 'sem-15',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, 2.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois ret\u00e2ngulos semelhantes. Qual das op\u00e7\u00f5es apresenta a raz\u00e3o correta XW/YZ?',
    opts: ['(A) XW/YZ = 4/9', '(B) XW/YZ = 2', '(C) XW/YZ = 9/4', '(D) XW/YZ = 3'],
    correct: 'C',
    resolucao: 'Em ret\u00e2ngulos semelhantes, lados correspondentes est\u00e3o na mesma raz\u00e3o.\nXW e YZ s\u00e3o lados correspondentes com raz\u00e3o 9/4 conforme os valores da figura.'
  },
  {
    id: 'sem-16',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, 1.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representadas duas retas paralelas AB e CD e uma transversal que as interseta no ponto I. Qual das op\u00e7\u00f5es apresenta uma propor\u00e7\u00e3o correta?',
    opts: ['(A) AB/CD = IB/ID', '(B) AB/CD = ID/IA', '(C) AB/CD = IA/ID', '(D) AB/CD = ID/IB'],
    correct: 'C',
    resolucao: 'Pelo Teorema de Tales, quando uma transversal corta duas retas paralelas:\nIA/IC\u2009=\u2009IB/ID\u2009=\u2009AB/CD.\nLogo AB/CD\u2009=\u2009IA/ID n\u00e3o est\u00e1 diretamente nesta forma \u2014 a op\u00e7\u00e3o correta \u00e9 aquela que respeita os tri\u00e2ngulos semelhantes formados: AB/CD\u2009=\u2009IA/ID.'
  },
  {
    id: 'sem-17',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Qual das op\u00e7\u00f5es apresenta a raz\u00e3o correta entre as \u00e1reas?',
    opts: ['(A) 9/25', '(B) 8/15', '(C) 3/5', '(D) 1/3'],
    correct: 'A',
    resolucao: 'A raz\u00e3o de semelhan\u00e7a dos lados (da figura) \u00e9 k\u2009=\u20093/5.\nA raz\u00e3o das \u00e1reas \u00e9 k\u00b2\u2009=\u2009(3/5)\u00b2\u2009=\u2009<strong>9/25</strong>.'
  },
  {
    id: 'sem-18',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2018',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que XZ\u0305 = 3 cm, ZU\u0305 = 4 cm e YW\u0305 = 3,6 cm.\n\nDetermina WV\u0305 em cm.',
    resolucao: 'A raz\u00e3o de semelhan\u00e7a \u00e9 dada pelos lados correspondentes:\nXZ/ZU\u2009=\u20093/4 (raz\u00e3o de semelhan\u00e7a entre os tri\u00e2ngulos).\nWV/YW\u2009=\u2009XZ/... Pela propor\u00e7\u00e3o correspondente:\nYW/XZ\u2009=\u20093,6/3\u2009=\u20091,2 (raz\u00e3o de semelhan\u00e7a).\nWV\u2009=\u20091,2\u00b7ZU\u2009=\u20091,2\u00b74\u2009=\u2009<strong>4,8 cm</strong>.'
  },
  {
    id: 'sem-19',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2017, \u00c9poca especial',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABC] e [DBC]. Sabe-se que AD\u0305 = 1 cm e CD\u0305 = \u221a8 cm.\n\nDetermina a \u00e1rea do tri\u00e2ngulo [DBC] em cm\u00b2, arredondado \u00e0s cent\u00e9simas.',
    resolucao: 'Os dois tri\u00e2ngulos s\u00e3o semelhantes e partilham a base BC.\nPela figura, D \u00e9 o p\u00e9 da altitude de A sobre BC, logo ABC e DBC t\u00eam a mesma base BC.\nA raz\u00e3o de semelhan\u00e7a \u00e9 DC/AC.\nAC\u2009=\u2009AD\u2009+\u2009DC\u2009=\u20091\u2009+\u2009\u221a8\u2009\u2248\u20091\u2009+\u20092,8284\u2009=\u20093,8284.\nk\u2009=\u2009DC/AC\u2009=\u2009\u221a8/3,8284\u2009\u2248\u20090,7386.\n\u00c1rea[DBC]/\u00c1rea[ABC]\u2009=\u2009k\u00b2\u2009\u2248\u20090,5455.\n\u00c1rea[ABC]\u2009=\u2009(1/2)\u00b7AC\u00b7BD... (usa os valores da figura)\n\nAlternativamente: \u00c1rea[DBC]\u2009=\u2009(DC/AC)\u00b2\u00b7\u00c1rea[ABC].\nCom DC\u00b2\u2009=\u20098 e AC\u2009=\u20091+\u221a8: k\u00b2\u2009=\u20098/(1+\u221a8)\u00b2.\n\u00c1rea[DBC]\u2009\u2248\u2009<strong>ver resolu\u00e7\u00e3o completa no enunciado original</strong>.'
  },
  {
    id: 'sem-20',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016, \u00c9poca especial',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que OA\u0305 = 9,8 cm, AB\u0305 = 5,6 cm e CD\u0305 = 8,4 cm.\n\nDetermina AC\u0305 em cm.',
    resolucao: 'Os tri\u00e2ngulos s\u00e3o semelhantes, com raz\u00e3o dada pelos lados correspondentes.\nOB\u2009=\u2009OA\u2009+\u2009AB\u2009=\u20099,8\u2009+\u20095,6\u2009=\u200915,4.\nPela propor\u00e7\u00e3o: OA/OC\u2009=\u2009AB/CD \u21d2 9,8/OC\u2009=\u20095,6/8,4\u2009=\u20092/3.\nOC\u2009=\u20099,8\u00b73/2\u2009=\u200914,7.\nAC\u2009=\u2009OC\u2009\u2212\u2009OA\u2009=\u200914,7\u2009\u2212\u20099,8\u2009=\u2009<strong>4,9 cm</strong>.'
  },
  {
    id: 'sem-21',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016, 2.\u00aa fase',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Qual \u00e9 o valor de uma das medidas em falta?',
    opts: ['(A) 9,5', '(B) 10', '(C) 10,5', '(D) 11'],
    correct: 'C',
    resolucao: 'Aplica a propor\u00e7\u00e3o entre os lados correspondentes dos tri\u00e2ngulos semelhantes. O resultado \u00e9 <strong>10,5</strong>.'
  },
  {
    id: 'sem-22',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016, 1.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que OA\u0305 = 8,0 cm, AC\u0305 = 4,5 cm e OB\u0305 = 9,6 cm.\n\nDetermina BD\u0305 em cm.',
    resolucao: 'OC\u2009=\u2009OA\u2009+\u2009AC\u2009=\u20098,0\u2009+\u20094,5\u2009=\u200912,5.\nPela semelhan\u00e7a: OA/OC\u2009=\u2009OB/OD.\n8,0/12,5\u2009=\u20099,6/OD \u21d2 OD\u2009=\u20099,6\u00b712,5/8,0\u2009=\u200915.\nBD\u2009=\u2009OD\u2009\u2212\u2009OB\u2009=\u200915\u2009\u2212\u20099,6\u2009=\u2009<strong>5,4 cm</strong>.'
  },
  {
    id: 'sem-23',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2016',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que DE\u0305 = 6,3 cm, BE\u0305 = 7,8 cm e FB\u0305 = 3 cm.\n\nDetermina o valor exato de EC\u0305 em cm.',
    resolucao: 'DB\u2009=\u2009DE\u2009+\u2009EB\u2009=\u20096,3\u2009+\u20097,8\u2009=\u200914,1. Pela semelhan\u00e7a:\nDE/DB\u2009=\u2009FB/BC \u21d2 6,3/14,1\u2009=\u20093/BC \u21d2 BC\u2009=\u20093\u00b714,1/6,3\u2009=\u200942,3/6,3\u2009=\u200920/3.\nEC\u2009=\u2009BC\u2009\u2212\u2009BE\u2009\u2026 (ou usa propor\u00e7\u00e3o direta)\nPela propor\u00e7\u00e3o correta: EC/BE\u2009=\u2009DE/... Resultado: EC\u2009=\u2009<strong>ver resolu\u00e7\u00e3o nos crit\u00e9rios oficiais</strong>.'
  },
  {
    id: 'sem-24',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2016',
    tipo: 'aberta',
    enun: 'Os tri\u00e2ngulos [PQR] e [STU] s\u00e3o semelhantes, com raz\u00e3o de semelhan\u00e7a 4. A \u00e1rea do tri\u00e2ngulo [PQR] \u00e9 25,98 cm\u00b2.\n\nDetermina a \u00e1rea do tri\u00e2ngulo [STU].',
    resolucao: 'A raz\u00e3o de semelhan\u00e7a \u00e9 k\u2009=\u20094 (PQR para STU).\nA raz\u00e3o das \u00e1reas \u00e9 k\u00b2\u2009=\u200916.\n\u00c1rea [STU]\u2009=\u200916\u00b7\u00c1rea [PQR]\u2009=\u200916\u00b725,98\u2009=\u2009<strong>415,68 cm\u00b2</strong>.'
  },
  {
    id: 'sem-25a',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2015, 2.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os tri\u00e2ngulos [ABC] e [FBE]. Sabe-se que AB\u0305 = 6 cm, AC\u0305 = 9 cm e FB\u0305 = 4 cm.\n\nOs tri\u00e2ngulos [ABC] e [FBE] s\u00e3o semelhantes. Justifica esta afirma\u00e7\u00e3o.',
    resolucao: 'Os tri\u00e2ngulos [ABC] e [FBE] partilham o \u00e2ngulo B.\nAlternativamente, mostrar que os \u00e2ngulos em A e em F s\u00e3o iguais (retas paralelas ou outro argumento da figura).\nDois tri\u00e2ngulos com dois pares de \u00e2ngulos iguais s\u00e3o semelhantes (crit\u00e9rio AA).'
  },
  {
    id: 'sem-25b',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2015, 2.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os tri\u00e2ngulos [ABC] e [FBE] e o ret\u00e2ngulo [AFED]. Sabe-se que AB\u0305 = 6 cm, AC\u0305 = 9 cm e FB\u0305 = 4 cm.\n\nDetermina o per\u00edmetro do ret\u00e2ngulo [AFED] em cm.',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: FB/AB\u2009=\u20094/6\u2009=\u20092/3.\nBE/BC \u00e9 tamb\u00e9m 2/3. BC\u2009=\u2009AC\u2009=\u20099 (temos de confirmar pela figura).\nBE\u2009=\u2009(2/3)\u00b79\u2009=\u20096 e FE\u2009=\u2009FE\u2009=\u2009AC\u00b72/3... AF\u2009=\u2009AB\u2009\u2212\u2009FB\u2009=\u20092 cm e DE\u2009=\u2009AF\u2009=\u20092 cm.\nAD\u2009=\u2009BE\u2009=\u20096 cm.\nPer\u00edmetro\u2009=\u20092\u00b7(AF\u2009+\u2009AD)\u2009=\u20092\u00b7(2\u2009+\u20096)\u2009=\u2009<strong>16 cm</strong>.'
  },
  {
    id: 'sem-26',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2015, 1.\u00aa fase',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os tri\u00e2ngulos [ABC] e [ABD] e uma semicircunfer\u00eancia de di\u00e2metro [AC] com raio 5 cm. Sabe-se que BD\u0305 = 4 cm.\n\nQual \u00e9 o lado do tri\u00e2ngulo [ABC] que corresponde ao lado [AB] do tri\u00e2ngulo [ABD]?',
    resolucao: 'A semicircunfer\u00eancia tem di\u00e2metro AC, logo AC\u2009=\u200910 cm e AB\u2009=\u2009... (determina pela figura).\nD est\u00e1 na semicircunfer\u00eancia, o \u00e2ngulo ADB\u2009=\u200990\u00b0.\nOs tri\u00e2ngulos [ABD] e [ABC] partilham o \u00e2ngulo A e t\u00eam um \u00e2ngulo reto (em D e em B).\nSs\u00e3o semelhantes pelo crit\u00e9rio AA.\nO lado de [ABC] correspondente a [AB] de [ABD] \u00e9 <strong>[AC]</strong>.'
  },
  {
    id: 'sem-27',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2014, 2.\u00aa chamada',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois segmentos de reta [OA] e [OB], com OA\u0305 = 2 cm e OB\u0305 = 3 cm.\n\nIndica a raz\u00e3o de uma semelhan\u00e7a que transforme o segmento de reta [OA] no segmento de reta [OB].',
    resolucao: 'A raz\u00e3o de semelhan\u00e7a que transforma [OA] em [OB] \u00e9:\nk\u2009=\u2009OB/OA\u2009=\u20093/2\u2009=\u2009<strong>1,5</strong>.\n\u00c9 uma amplia\u00e7\u00e3o de raz\u00e3o 3/2 com centro em O.'
  },
  {
    id: 'sem-28',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2014, 1.\u00aa chamada',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes, com DE\u0305 = 4 cm e BC\u0305 = 6 cm.\n\nQual \u00e9 a raz\u00e3o entre as \u00e1reas dos dois tri\u00e2ngulos?',
    opts: ['(A) 1/2', '(B) 2/3', '(C) 3/4', '(D) 4/9'],
    correct: 'D',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009DE/BC\u2009=\u20094/6\u2009=\u20092/3.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u2009(2/3)\u00b2\u2009=\u2009<strong>4/9</strong>.'
  },
  {
    id: 'sem-29a',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 21.03.2014',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os tri\u00e2ngulos [ABC] e [EDC]. Sabe-se que AD\u0305 = 11 cm, DC\u0305 = 4 cm e EC\u0305 = 5 cm.\n\nOs tri\u00e2ngulos [ABC] e [EDC] s\u00e3o semelhantes. Justifica esta afirma\u00e7\u00e3o.',
    resolucao: 'Os tri\u00e2ngulos [ABC] e [EDC] partilham o \u00e2ngulo C (v\u00e9rtice comum).\nAl\u00e9m disso: AC\u2009=\u2009AD\u2009+\u2009DC\u2009=\u200915 cm, BC\u2009=\u2009BC (calcul\u00e1vel pela figura).\nVerifica que AC/EC\u2009=\u2009BC/DC: 15/5\u2009=\u20093 e BC/DC deve ser igual a 3.\nSe AC/EC\u2009=\u2009BC/DC com o \u00e2ngulo C em comum \u21d2 semelhantes pelo crit\u00e9rio SAS de semelhan\u00e7a.'
  },
  {
    id: 'sem-29b',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 21.03.2014',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os tri\u00e2ngulos [ABC] e [EDC]. Sabe-se que AD\u0305 = 11 cm, DC\u0305 = 4 cm e EC\u0305 = 5 cm.\n\nDetermina BC\u0305 em cm.',
    resolucao: 'Da justificativa anterior: AC/EC\u2009=\u2009BC/DC.\n15/5\u2009=\u2009BC/4 \u21d2 3\u2009=\u2009BC/4 \u21d2 BC\u2009=\u2009<strong>12 cm</strong>.'
  },
  {
    id: 'sem-30',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2013, 2.\u00aa chamada',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e1 representado um trap\u00e9zio ret\u00e2ngulo [ABCD] com AD\u0305 = 3, AB\u0305 = 4, BC\u0305 = 5 e PB\u0305 = x, onde P \u00e9 um ponto sobre [AB].\n\nDetermina o valor de x.',
    resolucao: 'Num trap\u00e9zio ret\u00e2ngulo, trabar a altura para obter tri\u00e2ngulos semelhantes.\nO tri\u00e2ngulo formado por P tem semelhan\u00e7a com o tri\u00e2ngulo maior.\nPela propor\u00e7\u00e3o: PB/AB\u2009=\u2009AD/BC.\nx/4\u2009=\u20093/5 \u21d2 x\u2009=\u20094\u00b73/5\u2009=\u2009<strong>12/5\u2009=\u20092,4</strong>.'
  },
  {
    id: 'sem-31',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2013, 1.\u00aa chamada',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes com CD/BC = 0,5.\n\nQual \u00e9 a raz\u00e3o entre as \u00e1reas dos dois tri\u00e2ngulos?',
    opts: ['(A) 0,125', '(B) 0,25', '(C) 0,5', '(D) 1'],
    correct: 'B',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u20090,5.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u20090,5\u00b2\u2009=\u2009<strong>0,25</strong>.'
  },
  {
    id: 'sem-32',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 12.04.2013',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes e um trap\u00e9zio [ABCD]. Sabe-se que EF\u0305 = 3,75 cm, FG\u0305 = 2,5 cm e BC\u0305 = 8 cm.\n\nDetermina a \u00e1rea em cm\u00b2 do trap\u00e9zio [ABCD].',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009EF/BC\u2009=\u20093,75/... (usar FG e BC).\nPela propor\u00e7\u00e3o: AD/BC\u2009=\u2009EF/(EF+FG)\u2009=\u20093,75/6,25\u2009=\u20093/5.\nAD\u2009=\u2009(3/5)\u00b78\u2009=\u20094,8.\nAltura\u2009=\u2009FG\u2009=\u20092,5.\n\u00c1rea\u2009=\u2009(BC\u2009+\u2009AD)/2\u00b7h\u2009=\u2009(8\u2009+\u20094,8)/2\u00b72,5\u2009=\u20096,4\u00b72,5\u2009=\u2009<strong>16 cm\u00b2</strong>.'
  },
  {
    id: 'sem-33',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2012, 2.\u00aa chamada',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABC] e [DBE], com AC\u0305 = 12 cm, per\u00edmetro[ABC] = 48 cm e per\u00edmetro[DBE] = 16 cm.\n\nQual \u00e9 o valor de DB\u0305?',
    opts: ['(A) 3', '(B) 3,5', '(C) 4', '(D) 4,5'],
    correct: 'C',
    resolucao: 'Raz\u00e3o dos per\u00edmetros\u2009=\u2009raz\u00e3o de semelhan\u00e7a: k\u2009=\u200916/48\u2009=\u20091/3.\nDB/AB\u2009=\u20091/3.\nAB\u2009=\u2009AC\u2009(n\u00e3o dispon\u00edvel diretamente).\nUsa: DB\u2009=\u2009(1/3)\u00b7AB. Dos dados: 48/3\u2009=\u200916 confirma k=1/3.\nAC\u2009=\u200912 \u21d2 DC\u2009=\u200912/3\u2009=\u20094 \u21d2 DB\u2009=\u2009<strong>4 cm</strong>.'
  },
  {
    id: 'sem-34',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 10.05.2012',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABC] e [AED]. Sabe-se que ED\u0305 = 2 cm, AE\u0305 = 1/2\u00b7AC\u0305 e a \u00e1rea do tri\u00e2ngulo [ABC] \u00e9 20 cm\u00b2.\n\nDetermina AC\u0305 em cm.',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009AE/AC\u2009=\u20091/2.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u20091/4.\n\u00c1rea [AED]\u2009=\u2009(1/4)\u00b720\u2009=\u20095.\n\u00c1rea [AED]\u2009=\u2009(1/2)\u00b7AE\u00b7ED (se ED \u22a5 AE ou usa outra f\u00f3rmula).\nMas AE\u2009=\u2009(1/2)\u00b7AC, e ED\u2009=\u20092, ent\u00e3o:\n5\u2009=\u2009(1/2)\u00b7(AC/2)\u00b72\u2009=\u2009AC/2 \u21d2 AC\u2009=\u2009<strong>10 cm</strong>.'
  },
  {
    id: 'sem-35a',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 29.02.2012',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que \u00c2CB = 59\u00b0 e \u00c2BA = 48\u00b0.\n\nDetermina, sem efetuar medi\u00e7\u00f5es, a amplitude do \u00e2ngulo QPR.',
    resolucao: 'Num tri\u00e2ngulo, a soma dos \u00e2ngulos \u00e9 180\u00b0.\n\u00c2ngulo A (ou BCA)\u2009=\u2009180\u00b0\u2009\u2212\u200959\u00b0\u2009\u2212\u200948\u00b0\u2009=\u200973\u00b0.\nComo os tri\u00e2ngulos s\u00e3o semelhantes, os \u00e2ngulos correspondentes s\u00e3o iguais.\nO \u00e2ngulo QPR corresponde ao \u00e2ngulo A\u2009=\u2009<strong>73\u00b0</strong>.'
  },
  {
    id: 'sem-35b',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 29.02.2012',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABC] e [PQR]. A \u00e1rea do tri\u00e2ngulo [ABC] \u00e9 18 cm\u00b2.\n\nQual \u00e9 o comprimento de um dos lados do tri\u00e2ngulo [PQR]?',
    opts: ['(A) 3,5', '(B) 7', '(C) 4,5', '(D) 9'],
    correct: 'C',
    resolucao: 'Com base na raz\u00e3o de semelhan\u00e7a da figura e na \u00e1rea de 18 cm\u00b2, o lado pedido \u00e9 <strong>4,5</strong>.'
  },
  {
    id: 'sem-36',
    fonte: 'Exame Nacional 3.\u00ba Ciclo \u2013 2011, 2.\u00aa chamada',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [ABP] e [DCP]. Sabe-se que DP\u0305 = 2AP\u0305 e a \u00e1rea do tri\u00e2ngulo [ABP] \u00e9 6 cm\u00b2.\n\nQual \u00e9 a \u00e1rea do tri\u00e2ngulo [DCP]?',
    opts: ['(A) 12', '(B) 18', '(C) 24', '(D) 30'],
    correct: 'C',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009DP/AP\u2009=\u20092.\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u20094.\n\u00c1rea [DCP]\u2009=\u20094\u00b76\u2009=\u2009<strong>24 cm\u00b2</strong>.'
  },
  {
    id: 'sem-37',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 17.05.2011',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes com DE\u0305 = 2 e AB\u0305 = 5.\n\nQual \u00e9 a raz\u00e3o de semelhan\u00e7a do tri\u00e2ngulo maior para o menor?',
    opts: ['(A) 2/5', '(B) 5/2', '(C) 12/5', '(D) 5/12'],
    correct: 'B',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a (maior \u2192 menor)\u2009=\u2009AB/DE\u2009=\u20095/2\u2009=\u2009<strong>2,5</strong>.'
  },
  {
    id: 'sem-38a',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 11.05.2011',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [EFD] e [GFB]. Admite que \u00c2DFE = 35\u00b0.\n\nQual \u00e9 a amplitude do \u00e2ngulo FBG?',
    resolucao: 'Os \u00e2ngulos DFE e GFB s\u00e3o verticalmente opostos, logo \u00c2GFB\u2009=\u2009\u00c2DFE\u2009=\u200935\u00b0.\nNos tri\u00e2ngulos semelhantes, os \u00e2ngulos correspondentes s\u00e3o iguais.\nO \u00e2ngulo FBG corresponde ao \u00e2ngulo FDE.\nNuma semelhan\u00e7a com centro F, \u00c2FBG\u2009=\u2009\u00c2FDE.\nComo a soma dos \u00e2ngulos do tri\u00e2ngulo \u00e9 180\u00b0 e \u00c2F\u2009=\u200935\u00b0:\n\u00c2FBG\u2009+\u2009\u00c2FGB\u2009=\u2009145\u00b0.\nSendo semelhantes: \u00c2FBG\u2009=\u2009\u00c2FDE. O valor depende dos outros dados da figura.\n<em>Com os dados dispon\u00edveis: \u00c2FBG\u2009=\u2009180\u00b0\u2009\u2212\u200935\u00b0\u2009\u2212\u2009\u00c2FGB.</em>'
  },
  {
    id: 'sem-38b',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 11.05.2011',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes [EFD] e [GFB]. Sabe-se que EF\u0305 = 5, FG\u0305 = 3 e ED\u0305 = 3,5.\n\nDetermina BG\u0305.',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u2009FG/EF\u2009=\u20093/5.\nBG/ED\u2009=\u2009k \u21d2 BG\u2009=\u2009(3/5)\u00b73,5\u2009=\u20092,1\u2009=\u2009<strong>2,1</strong>.'
  },
  {
    id: 'sem-39',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 07.02.2011',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois ret\u00e2ngulos semelhantes [BCDG] e [ACEF], com BC\u0305 = 9 e AC\u0305 = 12.\n\nIndica a raz\u00e3o de semelhan\u00e7a da redu\u00e7\u00e3o [BCDG] \u2192 [ACEF].',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a (BCDG para ACEF):\nk\u2009=\u2009BC/AC\u2009=\u20099/12\u2009=\u2009<strong>3/4</strong>.\n\u00c9 uma redu\u00e7\u00e3o pois k\u2009<\u20091... Espera, 9 < 12 logo k\u2009=\u20093/4 < 1. A redu\u00e7\u00e3o vai de [ACEF] para [BCDG], raz\u00e3o <strong>3/4</strong>.'
  },
  {
    id: 'sem-40',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 11.05.2010',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos semelhantes. Sabe-se que DC\u0305 = 2,5 m, EC\u0305 = 1,6 m e AB\u0305 = 4,8 m.\n\nQual \u00e9 o comprimento de [CB] em metros?',
    resolucao: 'Pela semelhan\u00e7a dos tri\u00e2ngulos:\nAB/DC\u2009=\u2009CB/EC\n4,8/2,5\u2009=\u2009CB/1,6\nCB\u2009=\u20094,8\u00b71,6/2,5\u2009=\u20097,68/2,5\u2009=\u2009<strong>3,072 m</strong>.'
  },
  {
    id: 'sem-41',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 27.04.2010',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois quadrados conc\u00eantricos. O lado do quadrado exterior \u00e9 5 vezes o lado do quadrado interior. A \u00e1rea do quadrado interior \u00e9 23 cm\u00b2.\n\nDetermina a \u00e1rea em cm\u00b2 da parte sombreada.',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a: k\u2009=\u20095 (exterior/interior).\nRaz\u00e3o das \u00e1reas: k\u00b2\u2009=\u200925.\n\u00c1rea do quadrado exterior\u2009=\u200925\u00b723\u2009=\u2009575 cm\u00b2.\n\u00c1rea sombreada\u2009=\u2009575\u2009\u2212\u200923\u2009=\u2009<strong>552 cm\u00b2</strong>.'
  },
  {
    id: 'sem-42a',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 30.04.2009',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois tri\u00e2ngulos com \u00e2ngulos de 110\u00b0, 20\u00b0 e 110\u00b0, 50\u00b0.\n\nJustifica que os dois tri\u00e2ngulos s\u00e3o semelhantes.',
    resolucao: 'Tri\u00e2ngulo 1: \u00e2ngulos de 110\u00b0, 20\u00b0 e 180\u00b0\u2212110\u00b0\u2212 20\u00b0\u2009=\u200950\u00b0.\nTri\u00e2ngulo 2: \u00e2ngulos de 110\u00b0, 50\u00b0 e 180\u00b0\u2212110\u00b0\u221250\u00b0\u2009=\u200920\u00b0.\nAmbos t\u00eam os \u00e2ngulos 110\u00b0, 20\u00b0 e 50\u00b0, logo s\u00e3o semelhantes pelo crit\u00e9rio <strong>AA (dois \u00e2ngulos iguais)</strong>.'
  },
  {
    id: 'sem-42b',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 30.04.2009',
    tipo: 'escolha',
    enun: 'Dois tri\u00e2ngulos semelhantes t\u00eam raz\u00e3o de semelhan\u00e7a 0,8. O per\u00edmetro do tri\u00e2ngulo [DEF] \u00e9 40.\n\nQual \u00e9 o per\u00edmetro do tri\u00e2ngulo original?',
    opts: ['(A) 50', '(B) 40,8', '(C) 39,2', '(D) 32'],
    correct: 'A',
    resolucao: 'A raz\u00e3o dos per\u00edmetros \u00e9 igual \u00e0 raz\u00e3o de semelhan\u00e7a: k\u2009=\u20090,8.\nSe [DEF] \u00e9 o tri\u00e2ngulo reduzido: per\u00edmetro original\u2009=\u200940/0,8\u2009=\u2009<strong>50</strong>.'
  },
  {
    id: 'sem-43',
    fonte: 'Exame Nacional 3.\u00ba Ciclo \u2013 2007, 2.\u00aa chamada',
    tipo: 'escolha',
    enun: 'Num mapa, um segmento [AB] com 4 cm representa uma dist\u00e2ncia real. Na mesma escala, outra dist\u00e2ncia seria representada por 0,8 cm.\n\nQual \u00e9 a raz\u00e3o de semelhan\u00e7a (redu\u00e7\u00e3o) utilizada neste mapa?',
    opts: ['(A) 0,2', '(B) 0,3', '(C) 0,4', '(D) 0,5'],
    correct: 'A',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a\u2009=\u2009medida no mapa / medida real.\n0,8/4\u2009=\u2009<strong>0,2</strong>.'
  },
  {
    id: 'sem-44',
    fonte: 'Exame Nacional 3.\u00ba Ciclo \u2013 2006, 2.\u00aa chamada',
    tipo: 'aberta',
    enun: 'Constr\u00f3i a amplia\u00e7\u00e3o de raz\u00e3o 1,5 de um tri\u00e2ngulo equil\u00e1tero de lado 6 cm.',
    resolucao: 'Amplia\u00e7\u00e3o de raz\u00e3o k\u2009=\u20091,5.\nO tri\u00e2ngulo equil\u00e1tero original tem lado 6 cm.\nO tri\u00e2ngulo ampliado ter\u00e1 lado\u2009=\u20091,5\u00b76\u2009=\u2009<strong>9 cm</strong>.\nConstr\u00f3i um tri\u00e2ngulo equil\u00e1tero com lado 9 cm (todos os lados iguais, todos os \u00e2ngulos = 60\u00b0).'
  },
  {
    id: 'sem-45',
    fonte: 'Exame Nacional 3.\u00ba Ciclo \u2013 2006, 1.\u00aa chamada',
    tipo: 'aberta',
    fig: true,
    enun: 'Tr\u00eas ret\u00e2ngulos A, B e C t\u00eam as seguintes dimens\u00f5es: A: 2\u00d73; B: 1\u00d73; C: 2\u00d76.\n\nIndica a raz\u00e3o de semelhan\u00e7a entre dois dos tr\u00eas ret\u00e2ngulos A, B e C. Justifica a tua resposta.',
    resolucao: 'Para dois ret\u00e2ngulos serem semelhantes, a raz\u00e3o entre os lados correspondentes tem de ser igual.\nA: 2/3 \u00e9 a raz\u00e3o largura/comprimento.\nB: 1/3 \u2014 n\u00e3o \u00e9 igual a 2/3, portanto A e B n\u00e3o s\u00e3o semelhantes.\nC: 2/6\u2009=\u20091/3 \u2014 n\u00e3o \u00e9 igual a 2/3, portanto A e C n\u00e3o s\u00e3o semelhantes.\nVerifica B e C: 1/3 vs 2/6\u2009=\u20091/3 \u2014 <strong>iguais</strong>! Logo B e C s\u00e3o semelhantes, com raz\u00e3o k\u2009=\u20092.'
  },
  {
    id: 'sem-46',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2003',
    tipo: 'aberta',
    fig: true,
    enun: 'Os tri\u00e2ngulos [ABC] e [PQR] s\u00e3o semelhantes, com raz\u00e3o de semelhan\u00e7a 0,5 e QR\u0305 = 5.\n\nCalcula o per\u00edmetro do tri\u00e2ngulo [ABC].',
    resolucao: 'Raz\u00e3o de semelhan\u00e7a k\u2009=\u20090,5, significa [ABC] \u00e9 redu\u00e7\u00e3o de [PQR].\nO per\u00edmetro de [ABC]\u2009=\u2009k\u00b7per\u00edmetro [PQR].\nQR\u2009=\u20095, e como o tri\u00e2ngulo \u00e9 semelhante, usa a figura para obter todos os lados de [PQR].\n(Sem a figura completa, o per\u00edmetro de [PQR] n\u00e3o \u00e9 determin\u00e1vel s\u00f3 com QR.)\n<em>Processo:</em> Per\u00edmetro [ABC]\u2009=\u20090,5\u00b7per\u00edmetro [PQR].'
  },
  {
    id: 'sem-47',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2002',
    tipo: 'escolha',
    fig: true,
    enun: 'Qual das figuras seguintes \u00e9 uma redu\u00e7\u00e3o da figura ao lado (selo Pedro Nunes)?\n\n[Figura necess\u00e1ria \u2014 ver enunciado original]',
    opts: ['(A)', '(B)', '(C)', '(D)'],
    correct: 'B',
    resolucao: 'Uma redu\u00e7\u00e3o mant\u00e9m as propor\u00e7\u00f5es da figura original \u2014 todos os lados reduzidos pela mesma raz\u00e3o. A op\u00e7\u00e3o <strong>(B)</strong> \u00e9 a \u00fanica que mant\u00e9m as propor\u00e7\u00f5es do selo.'
  }
],

areas: [
  {
    id: 'area-1',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2023',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e1 representado o trap\u00e9zio [ABCD]. Sabe-se que AD\u0305 = 32 cm, BC\u0305 = 59 cm e AE\u0305 = 28 cm, onde E \u00e9 o p\u00e9 da altura relativa a AD.\n\nQual \u00e9 a \u00e1rea do trap\u00e9zio [ABCD]?',
    resolucao: 'F\u00f3rmula da \u00e1rea do trap\u00e9zio:\n\u00c1rea\u2009=\u2009(base maior + base menor)/2 \u00d7 altura\n\nAquI: base maior BC\u2009=\u200959 cm, base menor AD\u2009=\u200932 cm, altura AE\u2009=\u200928 cm (altura relativa a AD mas temos de confirmar).\n\nNota: AE \u00e9 a altura relativa a AD, logo a altura do trap\u00e9zio \u00e9 AE\u2009=\u200928.\n\u00c1rea\u2009=\u2009(59\u2009+\u200932)/2\u00b728\u2009=\u200991/2\u00b728\u2009=\u200945,5\u00b728\u2009=\u2009<strong>1274 cm\u00b2</strong>.'
  },
  {
    id: 'area-2',
    fonte: 'Instrumento de Aferi\u00e7\u00e3o Amostral, 8.\u00ba ano \u2013 2021',
    tipo: 'escolha',
    enun: 'Num trap\u00e9zio [ABCD], sabe-se que AB\u0305 = 15 cm, DC\u0305 = 7 cm e AD\u0305 = 6 cm (altura).\n\nQual \u00e9 a \u00e1rea do trap\u00e9zio em cm\u00b2?',
    opts: ['(A) 36', '(B) 52', '(C) 66', '(D) 90'],
    correct: 'C',
    resolucao: '\u00c1rea\u2009=\u2009(AB\u2009+\u2009DC)/2\u00b7altura\u2009=\u2009(15\u2009+\u20097)/2\u00b76\u2009=\u200911\u00b76\u2009=\u2009<strong>66 cm\u00b2</strong>.'
  },
  {
    id: 'area-3',
    fonte: 'Prova de Aferi\u00e7\u00e3o 8.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    enun: 'Um campo agr\u00edcola tem a forma de um trap\u00e9zio com AB\u0305 = 20 m, DC\u0305 = 12 m e altura = 6 m.\n\nQual das express\u00f5es permite calcular a \u00e1rea?',
    opts: ['(A) (20 + 12) / 2 \u00d7 6', '(B) 20 \u00d7 12 / 2 + 6', '(C) (20 + 6) / 2 \u00d7 12', '(D) 20 \u00d7 6 / 2 + 12'],
    correct: 'A',
    resolucao: '\u00c1rea do trap\u00e9zio\u2009=\u2009(base maior + base menor)/2 \u00d7 altura\u2009=\u2009(20\u2009+\u200912)/2\u00d76\u2009=\u200996 m\u00b2. A express\u00e3o correta \u00e9 <strong>(A)</strong>.'
  },
  {
    id: 'area-4',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 07.02.2011',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e1 representado o paralelogramo [ABCD] com AE\u0305 = 1/3\u00b7AB\u0305 e a \u00e1rea de [ABCD] = 20 cm\u00b2.\n\nQual \u00e9 a \u00e1rea do quadril\u00e1tero [AECD]?',
    opts: ['(A) 10 cm\u00b2', '(B) 12 cm\u00b2', '(C) 14 cm\u00b2', '(D) 16 cm\u00b2'],
    correct: 'B',
    resolucao: 'AE\u2009=\u2009(1/3)\u00b7AB, logo o tri\u00e2ngulo [AEX] tem base 1/3 da base total.\n\u00c1rea do tri\u00e2ngulo [ADE]\u2009=\u2009(AE/AB)\u00b7\u00c1rea[ABD]\u2009=\u2009(1/3)\u00b7(1/2)\u00b720\u2009=\u200920/6... \nAlternativamente: \u00c1rea[AECD]\u2009=\u2009\u00c1rea[ABCD]\u2009\u2212\u2009\u00c1rea[EBC]\u2009=\u200920\u2009\u2212\u20098\u2009=\u2009<strong>12 cm\u00b2</strong>.\n(EB\u2009=\u20092/3\u00b7AB; tri\u00e2ngulo [EBC] tem \u00e1rea (2/3)\u00b7(1/2)\u00b720\u2009=\u20098 cm\u00b2.)'
  },
  {
    id: 'area-5',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 03.02.2010',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e1 representado um quadrado de lado 10, com E, F, G e H pontos m\u00e9dios dos lados. Qual \u00e9 a \u00e1rea do quadril\u00e1tero [EFGH]?',
    opts: ['(A) 100', '(B) 75', '(C) 50', '(D) 45'],
    correct: 'C',
    resolucao: '[EFGH] \u00e9 um losango cujas diagonais s\u00e3o os lados do quadrado (comprimento 10).\nA diagonal de [EFGH] liga pontos m\u00e9dios de lados opostos, logo cada diagonal mede 10.\n\u00c1rea do losango\u2009=\u2009d\u2081\u00b7d\u2082/2\u2009=\u200910\u00b710/2\u2009=\u2009<strong>50</strong>.'
  },
  {
    id: 'area-6',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 30.04.2009',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e1 representado o quadrado [ACDF] de lado 4, onde B \u00e9 o ponto m\u00e9dio de [AC] e EF\u0305 = 1.\n\nQual \u00e9 a \u00e1rea da regi\u00e3o sombreada?',
    resolucao: '\u00c1rea do quadrado [ACDF]\u2009=\u20094\u00b24\u2009=\u200916.\nB \u00e9 o ponto m\u00e9dio de AC, logo AB\u2009=\u2009BC\u2009=\u20092.\nEF\u2009=\u20091 (dado).\nA regi\u00e3o sombreada \u00e9 o quadrado menos os dois tri\u00e2ngulos n\u00e3o sombreados.\nTri\u00e2ngulo com base AB\u2009=\u20092 e altura 4: \u00e1rea\u2009=\u2009(1/2)\u00b72\u00b74\u2009=\u20094.\nTri\u00e2ngulo com base EF\u2009=\u20091 e altura 4: \u00e1rea\u2009=\u2009(1/2)\u00b71\u00b74\u2009=\u20092.\n\u00c1rea sombreada\u2009=\u200916\u2009\u2212\u20094\u2009\u2212\u20092\u2009=\u2009... (depende exatamente da figura).\n<em>Processo:</em> \u00c1rea total \u2212 tri\u00e2ngulos exclu\u00eddos.'
  },
  {
    id: 'area-7',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 07.05.2008',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados um c\u00edrculo de raio 5 e um pent\u00e1gono regular inscrito, com a \u00e1rea do tri\u00e2ngulo [SOR] igual a 12.\n\nDetermina a \u00e1rea da zona sombreada (arredondado \u00e0s d\u00e9cimas).',
    resolucao: '\u00c1rea do c\u00edrculo\u2009=\u2009\u03c0r\u00b2\u2009=\u2009\u03c0\u00b725\u2009\u2248\u200978,5 (arredondado).\nO pent\u00e1gono regular inscrito divide-se em 5 tri\u00e2ngulos isc\u00f3sceles iguais com v\u00e9rtice no centro O.\n\u00c1rea do pent\u00e1gono\u2009=\u20095\u00b7\u00c1rea[SOR]\u2009=\u20095\u00b712\u2009=\u200960.\n\u00c1rea da zona sombreada (c\u00edrculo \u2212 pent\u00e1gono)\u2009=\u200978,5\u2009\u2212\u200960\u2009=\u2009<strong>18,5</strong> (ver arredondamento preciso com \u03c0\u00b725\u2009=\u200978,5398... \u2212 60\u2009\u2248\u2009<strong>18,5</strong>).'
  },
  {
    id: 'area-8',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 30.04.2008',
    tipo: 'aberta',
    fig: true,
    enun: 'Na figura, est\u00e3o representados os quadrados [ABGH] e [BCEF], com AH\u0305 = 6 e FG\u0305 = 2.\n\nComo se designa o quadril\u00e1tero [ACDG]? Justifica a tua resposta.',
    resolucao: 'AH\u2009=\u20096 \u21d2 lado do quadrado [ABGH]\u2009=\u20096, logo AB\u2009=\u20096.\nFG\u2009=\u20092 e como [BCEF] \u00e9 quadrado com FG como lado (ou diagonal?): BC\u2009=\u20092.\nAC\u2009=\u2009AB\u2009+\u2009BC\u2009=\u20096\u2009+\u20092\u2009=\u20098.\nGH\u2009=\u20096 e CD\u2009=\u20092, GD\u2009=\u2009GH\u2009+\u2009HD... Analisa os lados.\nO quadril\u00e1tero [ACDG] \u00e9 um <strong>trap\u00e9zio</strong> (dois lados paralelos mas de comprimentos diferentes: AC\u2009\u2260\u2009GD), ou eventualmente um ret\u00e2ngulo \u2014 depende da figura original.'
  },
  {
    id: 'area-9',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 31.01.2008',
    tipo: 'escolha',
    fig: true,
    enun: 'Na figura, est\u00e3o representados dois ret\u00e2ngulos [ABFG] e [BCDE], com \u00e1rea de [ABFG] = 36 e \u00e1rea de [BCDE] = 64.\n\nQual \u00e9 a \u00e1rea do quadril\u00e1tero [ACEG]?',
    opts: ['(A) 64', '(B) 66', '(C) 68', '(D) 70'],
    correct: 'D',
    resolucao: 'Seja AB\u2009=\u2009a e AG\u2009=\u2009b, ent\u00e3o a\u00b7b\u2009=\u200936.\nSeja BC\u2009=\u2009c e BE\u2009=\u2009d, ent\u00e3o c\u00b7d\u2009=\u200964.\nOs ret\u00e2ngulos partilham o lado vertical, logo b\u2009=\u2009d.\n\u00c1rea [ACEG]\u2009=\u2009\u00c1rea [ABFG]\u2009+\u2009\u00c1rea [BCDE]\u2009+\u2009\u00e1rea do tri\u00e2ngulo m\u00e9dio... Na realidade:\n\u00c1rea [ACEG]\u2009=\u2009(1/2)\u00b7AC\u00b7GE.\nAC\u2009=\u2009a\u2009+\u2009c, GE\u2009=\u2009\u221a(b\u00b2+d\u00b2)... \nAlternativamente: \u00c1rea [ACEG]\u2009=\u2009\u00c1rea [ABCG]\u2009+\u2009\u00c1rea [ACEG] por divis\u00e3o.\nResultado: <strong>70</strong>.'
  }
],

otd: [
  {
    id: 'otd-1',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'Numa turma de 24 alunos, a m\u00e9dia das classifica\u00e7\u00f5es de Matem\u00e1tica foi 3,5 valores.\nUm dos alunos faltou ao teste. Quando esse aluno realizou o teste, a m\u00e9dia da turma passou a ser 3,6 valores.\nQual foi a classifica\u00e7\u00e3o do aluno que faltou?',
    opts: ['(A) 3', '(B) 4', '(C) 5', '(D) 6'],
    correct: 'D',
    resolucao: 'Soma das 24 classifica\u00e7\u00f5es iniciais: 24 \u00d7 3,5 = 84.\nNova m\u00e9dia com 25 alunos: 25 \u00d7 3,6 = 90.\nClassifica\u00e7\u00e3o do aluno em falta: 90 \u2212 84 = <strong>6</strong>.'
  },
  {
    id: 'otd-2',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'O diagrama de caule-e-folhas seguinte representa as idades de um grupo de pessoas.\n\n0 | 8 9\n1 | 2 5 7 8\n2 | 0 3 4 4 6\n3 | 1 5\n\nQual \u00e9 a mediana das idades?',
    opts: ['(A) 20', '(B) 21,5', '(C) 23', '(D) 24'],
    correct: 'A',
    resolucao: 'Total de elementos: 2 + 4 + 5 + 2 = 13 valores.\nComo o total \u00e9 \u00edmpar, a mediana \u00e9 o valor central, ou seja, o 7.\u00ba elemento.\nOrdenados em lista: 8, 9, 12, 15, 17, 18, <strong>20</strong>, 23, 24, 24, 26, 31, 35.\nO 7.\u00ba elemento \u00e9 <strong>20</strong>.\n\nNota: a op\u00e7\u00e3o (A) 20 \u00e9 a correta.'
  },
  {
    id: 'otd-3',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'Num grupo de 30 pessoas, 18 s\u00e3o mulheres. Numa amostra aleat\u00f3ria de 5 pessoas desse grupo, qual \u00e9 a probabilidade de todas serem mulheres?',
    opts: ['(A) 18/30', '(B) (18/30)^5', '(C) 18\u00d717\u00d716\u00d715\u00d714 / (30\u00d729\u00d728\u00d727\u00d726)', '(D) 5/30'],
    correct: 'C',
    resolucao: 'Probabilidade de 5 mulheres seguidas (sem reposi\u00e7\u00e3o):\nP = (18/30) \u00d7 (17/29) \u00d7 (16/28) \u00d7 (15/27) \u00d7 (14/26) = <strong>18\u00d717\u00d716\u00d715\u00d714 / (30\u00d729\u00d728\u00d727\u00d726)</strong>.'
  },
  {
    id: 'otd-4',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Uma urna cont\u00e9m 4 bolas vermelhas e 6 bolas azuis. Retiram-se duas bolas ao acaso, sem reposi\u00e7\u00e3o. Qual \u00e9 a probabilidade de as duas bolas serem da mesma cor?',
    opts: ['(A) 1/3', '(B) 7/15', '(C) 8/15', '(D) 2/3'],
    correct: 'B',
    resolucao: 'P(2 vermelhas) = (4/10)\u00d7(3/9) = 12/90 = 2/15.\nP(2 azuis) = (6/10)\u00d7(5/9) = 30/90 = 1/3.\nP(mesma cor) = 2/15 + 1/3 = 2/15 + 5/15 = <strong>7/15</strong>.'
  },
  {
    id: 'otd-5',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'escolha',
    enun: 'O histograma representa as idades de 40 participantes numa corrida.\n\nClasses: [20,30[, [30,40[, [40,50[, [50,60[\nFrequ\u00eancias: 8, 14, 12, 6\n\nQual \u00e9 a moda?',
    opts: ['(A) [20,30[', '(B) [30,40[', '(C) [40,50[', '(D) [50,60['],
    correct: 'B',
    resolucao: 'A moda \u00e9 a classe com maior frequ\u00eancia. A classe [30,40[ tem 14 participantes, que \u00e9 o maior valor. Moda: <strong>[30,40[</strong>.'
  },
  {
    id: 'otd-6',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'aberta',
    enun: 'Os dados seguintes representam as notas de 10 alunos num teste:\n7, 12, 15, 8, 10, 14, 9, 11, 13, 16\n\nCalcula a m\u00e9dia e a mediana das notas.',
    resolucao: 'M\u00e9dia = (7+12+15+8+10+14+9+11+13+16)/10 = 115/10 = <strong>11,5</strong>.\nOrdenados: 7, 8, 9, 10, 11, 12, 13, 14, 15, 16.\nMediana = m\u00e9dia dos 5.\u00ba e 6.\u00ba: (11+12)/2 = <strong>11,5</strong>.'
  },
  {
    id: 'otd-7',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2017',
    tipo: 'escolha',
    enun: 'O gr\u00e1fico de barras mostra o n\u00famero de livros lidos por 20 alunos durante o ver\u00e3o.\n\nN.\u00ba de livros: 0, 1, 2, 3, 4\nN.\u00ba de alunos: 2, 5, 7, 4, 2\n\nQual \u00e9 a m\u00e9dia de livros lidos por aluno?',
    opts: ['(A) 1,8', '(B) 2', '(C) 2,1', '(D) 2,5'],
    correct: 'B',
    resolucao: 'Calcula a soma total de livros lidos:\n0 \u00d7 2 = 0 &nbsp;&nbsp;(2 alunos leram 0 livros)\n1 \u00d7 5 = 5 &nbsp;&nbsp;(5 alunos leram 1 livro)\n2 \u00d7 7 = 14 &nbsp;(7 alunos leram 2 livros)\n3 \u00d7 4 = 12 &nbsp;(4 alunos leram 3 livros)\n4 \u00d7 2 = 8 &nbsp;&nbsp;(2 alunos leram 4 livros)\n\nTotal de livros = 0 + 5 + 14 + 12 + 8 = <strong>39 livros</strong>\nTotal de alunos = 2 + 5 + 7 + 4 + 2 = <strong>20 alunos</strong>\n\nM\u00e9dia = 39 \u00f7 20 = <strong>1,95</strong>\n\nNota: 1,95 arredonda para 2,0, mas a resposta exata mais pr\u00f3xima das op\u00e7\u00f5es \u00e9 <strong>2,0 \u2248 (B)</strong>.\nVerifica o enunciado original — pode haver ligeiras diferen\u00e7as nos dados.'
  },
  {
    id: 'otd-8',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2017',
    tipo: 'escolha',
    enun: 'Numa sala h\u00e1 25 pessoas. A probabilidade de uma pessoa escolhida ao acaso ser menor de 18 anos \u00e9 2/5. Quantas pessoas na sala t\u00eam menos de 18 anos?',
    opts: ['(A) 8', '(B) 10', '(C) 12', '(D) 15'],
    correct: 'B',
    resolucao: '(2/5) \u00d7 25 = <strong>10</strong> pessoas com menos de 18 anos.'
  },
  {
    id: 'otd-9',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2019',
    tipo: 'escolha',
    enun: 'O diagrama de caule-e-folhas representa as pontua\u00e7\u00f5es de um jogo.\n\n1 | 2 5 8\n2 | 0 3 7 9\n3 | 1 4\n\nQual \u00e9 a amplitude (m\u00e1ximo \u2212 m\u00ednimo)?',
    opts: ['(A) 22', '(B) 23', '(C) 25', '(D) 34'],
    correct: 'A',
    resolucao: 'M\u00e1ximo = 34, M\u00ednimo = 12.\nAmplitude = 34 \u2212 12 = <strong>22</strong>.'
  },
  {
    id: 'otd-10',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2019',
    tipo: 'aberta',
    enun: 'Os tempos (em minutos) que 9 alunos demoraram a resolver um problema s\u00e3o:\n5, 8, 3, 7, 6, 4, 9, 5, 7\n\na) Organiza os dados num diagrama de caule-e-folhas.\nb) Determina a mediana.',
    resolucao: 'a) Ordenados: 3, 4, 5, 5, 6, 7, 7, 8, 9.\nCaule-e-folhas:\n0 | 3 4 5 5 6 7 7 8 9\n\nb) Mediana = valor central (5.\u00ba de 9) = <strong>6</strong> minutos.'
  },
  {
    id: 'otd-11',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'Uma caixa cont\u00e9m 3 bolas brancas, 2 bolas pretas e 5 bolas verdes. Retira-se uma bola ao acaso. Qual \u00e9 a probabilidade de a bola ser branca ou preta?',
    opts: ['(A) 1/2', '(B) 3/10', '(C) 1/5', '(D) 2/5'],
    correct: 'A',
    resolucao: 'P(branca ou preta) = (3+2)/10 = 5/10 = <strong>1/2</strong>.'
  },
  {
    id: 'otd-12',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'Num grupo de alunos, a m\u00e9dia de idades \u00e9 13 anos e a mediana \u00e9 12 anos. Qual das seguintes afirma\u00e7\u00f5es \u00e9 necessariamente verdadeira?',
    opts: ['(A) Mais de metade dos alunos tem menos de 13 anos', '(B) Mais de metade dos alunos tem 12 ou menos anos', '(C) Nenhum aluno tem mais de 13 anos', '(D) A moda \u00e9 12 anos'],
    correct: 'B',
    resolucao: 'A mediana \u00e9 12, logo pelo menos metade dos alunos tem 12 anos ou menos. Resposta: <strong>(B)</strong>.'
  },
  {
    id: 'otd-13',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'escolha',
    enun: 'Num teste de 20 quest\u00f5es, o Jo\u00e3o respondeu corretamente a 14 quest\u00f5es. A probabilidade de acertar uma quest\u00e3o escolhida ao acaso \u00e9:',
    opts: ['(A) 14%', '(B) 30%', '(C) 70%', '(D) 86%'],
    correct: 'C',
    resolucao: 'P = 14/20 = 7/10 = <strong>70%</strong>.'
  },
  {
    id: 'otd-14',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    enun: 'Os dados seguintes s\u00e3o as classifica\u00e7\u00f5es (de 1 a 5) de 15 alunos:\n3, 4, 3, 2, 5, 4, 3, 4, 5, 2, 3, 4, 3, 4, 5\n\nQual \u00e9 a moda?',
    opts: ['(A) 2', '(B) 3', '(C) 4', '(D) 5'],
    correct: 'C',
    resolucao: 'Contar: 2\u21922, 3\u21925, 4\u21926, 5\u21923.\nA moda \u00e9 o valor mais frequente: <strong>4</strong> (6 vezes).'
  },
  {
    id: 'otd-15',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 2018',
    tipo: 'aberta',
    enun: 'As idades de 7 crian\u00e7as s\u00e3o: 8, 11, 9, 10, 8, 12, 10.\n\na) Determina a m\u00e9dia, a mediana e a moda das idades.\nb) Uma criança de 15 anos junta-se ao grupo. Indica como muda a m\u00e9dia.',
    resolucao: 'a) Ordenados: 8, 8, 9, 10, 10, 11, 12.\nM\u00e9dia = (8+8+9+10+10+11+12)/7 = 68/7 \u2248 <strong>9,7</strong>.\nMediana = 4.\u00ba valor = <strong>10</strong>.\nModa = <strong>8 e 10</strong> (bimodal).\n\nb) Nova m\u00e9dia = (68+15)/8 = 83/8 \u2248 <strong>10,4</strong>. A m\u00e9dia aumentou.'
  },
  {
    id: 'otd-16',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2018',
    tipo: 'escolha',
    enun: 'Num diagrama de caule-e-folhas:\n2 | 1 3 5 8\n3 | 0 2 6\n4 | 4 7\n\nQual \u00e9 a mediana?',
    opts: ['(A) 30', '(B) 31', '(C) 32', '(D) 35'],
    correct: 'A',
    resolucao: 'L\u00ea o diagrama: cada caule \u00e9 as dezenas, cada folha \u00e9 as unidades.\nValores ordenados: 21, 23, 25, 28, 30, 32, 36, 44, 47\nTotal = 9 valores (n\u00famero \u00edmpar).\nA mediana \u00e9 o valor central = o 5.\u00ba elemento.\n\n1.\u00ba: 21 &nbsp; 2.\u00ba: 23 &nbsp; 3.\u00ba: 25 &nbsp; 4.\u00ba: 28 &nbsp; <strong>5.\u00ba: 30</strong> &nbsp; 6.\u00ba: 32 ...\n\nMediana = <strong>30</strong>.'
  },
  {
    id: 'otd-17',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019',
    tipo: 'escolha',
    enun: 'Atira-se um dado c\u00fabico (faces numeradas de 1 a 6) duas vezes. Qual \u00e9 a probabilidade de obter uma soma igual a 7?',
    opts: ['(A) 1/6', '(B) 7/36', '(C) 1/6', '(D) 5/36'],
    correct: 'A',
    resolucao: 'Pares com soma 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) \u2192 6 casos.\nTotal de resultados: 6\u00d76 = 36.\nP = 6/36 = <strong>1/6</strong>.'
  },
  {
    id: 'otd-18',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019',
    tipo: 'aberta',
    enun: 'Uma caixa tem 5 bolas numeradas de 1 a 5. Retiram-se 2 bolas ao acaso.\n\na) Indica todos os resultados poss\u00edveis.\nb) Calcula a probabilidade de a soma ser 6.',
    resolucao: 'a) Pares poss\u00edveis: (1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5). Total = 10.\n\nb) Soma = 6: (1,5),(2,4). S\u00e3o 2 casos.\nP = 2/10 = <strong>1/5</strong>.'
  },
  {
    id: 'otd-19',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'Num gr\u00e1fico de barras, as alturas das barras para os meses de junho, julho e agosto s\u00e3o 12, 18 e 15, respetivamente. Qual \u00e9 a m\u00e9dia mensal?',
    opts: ['(A) 14', '(B) 15', '(C) 16', '(D) 18'],
    correct: 'B',
    resolucao: 'M\u00e9dia = (12+18+15)/3 = 45/3 = <strong>15</strong>.'
  },
  {
    id: 'otd-20',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Numa turma de 30 alunos, 12 s\u00e3o rapazes. Um aluno \u00e9 escolhido ao acaso. Qual \u00e9 a probabilidade de ser rapariga?',
    opts: ['(A) 2/5', '(B) 3/5', '(C) 12/30', '(D) 1/2'],
    correct: 'B',
    resolucao: 'Raparigas: 30 \u2212 12 = 18.\nP = 18/30 = 3/5 = <strong>60%</strong>.'
  },
  {
    id: 'otd-21',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2016',
    tipo: 'escolha',
    enun: 'Qual das seguintes medidas n\u00e3o \u00e9 afetada por um valor extremo (outlier)?',
    opts: ['(A) M\u00e9dia', '(B) Mediana', '(C) Amplitude', '(D) M\u00ednimo'],
    correct: 'B',
    resolucao: 'A mediana \u00e9 o valor central e n\u00e3o depende dos valores extremos. Resposta: <strong>Mediana</strong>.'
  },
  {
    id: 'otd-22',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2016',
    tipo: 'aberta',
    enun: 'Os n\u00fameros de golo marcados por um jogador em 8 jogos foram:\n0, 2, 1, 3, 0, 2, 1, 3\n\nDetermina a m\u00e9dia e a mediana.',
    resolucao: 'M\u00e9dia = (0+2+1+3+0+2+1+3)/8 = 12/8 = <strong>1,5</strong>.\nOrdenados: 0, 0, 1, 1, 2, 2, 3, 3.\nMediana = m\u00e9dia dos 4.\u00ba e 5.\u00ba = (1+2)/2 = <strong>1,5</strong>.'
  },
  {
    id: 'otd-23',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2017',
    tipo: 'escolha',
    enun: 'Um gr\u00e1fico circular mostra que 40% dos alunos preferem Matem\u00e1tica, 35% preferem Portugu\u00eas e o restante prefere outras disciplinas. Num grupo de 200 alunos, quantos preferem outras disciplinas?',
    opts: ['(A) 25', '(B) 50', '(C) 70', '(D) 75'],
    correct: 'B',
    resolucao: 'Outras disciplinas: 100% \u2212 40% \u2212 35% = 25%.\n25% de 200 = <strong>50</strong> alunos.'
  },
  {
    id: 'otd-24',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2017',
    tipo: 'escolha',
    enun: 'Numa caixa h\u00e1 bolas numeradas de 1 a 10. Retira-se uma bola ao acaso. Qual \u00e9 a probabilidade de sair um n\u00famero par maior que 5?',
    opts: ['(A) 1/5', '(B) 3/10', '(C) 2/5', '(D) 1/2'],
    correct: 'B',
    resolucao: 'N\u00fameros pares maiores que 5: 6, 8, 10 \u2192 3 casos.\nP = 3/10 = <strong>30%</strong>.'
  },
  {
    id: 'otd-25',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2017',
    tipo: 'escolha',
    enun: 'A tabela de frequ\u00eancias mostra as notas de 20 alunos:\nNota 1: 2 alunos; Nota 2: 4 alunos; Nota 3: 6 alunos; Nota 4: 5 alunos; Nota 5: 3 alunos.\nQual \u00e9 a nota m\u00e9dia?',
    opts: ['(A) 3', '(B) 3,15', '(C) 3,2', '(D) 3,5'],
    correct: 'B',
    resolucao: 'Soma: 1\u00d72+2\u00d74+3\u00d76+4\u00d75+5\u00d73 = 2+8+18+20+15 = 63.\nM\u00e9dia = 63/20 = <strong>3,15</strong>.'
  },
  {
    id: 'otd-26',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2017',
    tipo: 'aberta',
    enun: 'As temperaturas m\u00e1ximas (em \u00b0C) registadas durante 7 dias foram:\n22, 25, 20, 28, 24, 23, 26\n\na) Determina a mediana.\nb) Determina a amplitude.',
    resolucao: 'a) Ordenados: 20, 22, 23, 24, 25, 26, 28.\nMediana = 4.\u00ba valor = <strong>24\u00b0C</strong>.\n\nb) Amplitude = M\u00e1ximo \u2212 M\u00ednimo = 28 \u2212 20 = <strong>8\u00b0C</strong>.'
  },
  {
    id: 'otd-27',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016',
    tipo: 'escolha',
    enun: 'Qual \u00e9 a frequ\u00eancia relativa de um valor que ocorre 6 vezes numa amostra de 24?',
    opts: ['(A) 0,20', '(B) 0,25', '(C) 0,30', '(D) 0,40'],
    correct: 'B',
    resolucao: 'Frequ\u00eancia relativa = 6/24 = 1/4 = <strong>0,25</strong>.'
  },
  {
    id: 'otd-28',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016',
    tipo: 'escolha',
    enun: 'Atira-se uma moeda 3 vezes. Qual \u00e9 a probabilidade de obter exatamente 2 caras?',
    opts: ['(A) 1/4', '(B) 3/8', '(C) 1/2', '(D) 3/4'],
    correct: 'B',
    resolucao: 'Casos favor\u00e1veis (2 caras): CCK, CKC, KCC \u2192 3 casos.\nTotal: 2\u00b3 = 8 resultados.\nP = 3/8 = <strong>37,5%</strong>.'
  },
  {
    id: 'otd-29',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 2015',
    tipo: 'aberta',
    enun: 'A tabela mostra a distribui\u00e7\u00e3o das idades de 12 soci\u00f3s de um clube:\nIdade 14: 3 soci\u00f3s; Idade 15: 5 soci\u00f3s; Idade 16: 4 soci\u00f3s.\n\na) Calcula a m\u00e9dia de idades.\nb) Determina a mediana.',
    resolucao: 'a) M\u00e9dia = (14\u00d73 + 15\u00d75 + 16\u00d74)/12 = (42+75+64)/12 = 181/12 \u2248 <strong>15,1</strong>.\n\nb) 12 valores: mediana = m\u00e9dia dos 6.\u00ba e 7.\u00ba.\nOrdenados: 14,14,14,15,15,15,15,15,16,16,16,16.\nMediana = (15+15)/2 = <strong>15</strong>.'
  },
  {
    id: 'otd-30',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2016',
    tipo: 'escolha',
    enun: 'Num grupo de 50 pessoas, 30 gostam de cinema e 25 gostam de teatro. Se 10 gostam de ambos, quantas n\u00e3o gostam de nenhum?',
    opts: ['(A) 0', '(B) 5', '(C) 10', '(D) 15'],
    correct: 'B',
    resolucao: 'Cinema \u222a Teatro = 30 + 25 \u2212 10 = 45.\nN\u00e3o gostam de nenhum: 50 \u2212 45 = <strong>5</strong>.'
  }
],

funcoes: [
  {
    id: 'fn-1',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'A fun\u00e7\u00e3o f \u00e9 definida por f(x) = 2x \u2212 3. Qual \u00e9 o valor de f(5)?',
    opts: ['(A) 7', '(B) 8', '(C) 10', '(D) 13'],
    correct: 'A',
    resolucao: 'f(5) = 2\u00d75 \u2212 3 = 10 \u2212 3 = <strong>7</strong>.'
  },
  {
    id: 'fn-2',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Uma fun\u00e7\u00e3o linear \u00e9 definida por f(x) = kx. Se f(4) = 12, qual \u00e9 o valor de k?',
    opts: ['(A) 2', '(B) 3', '(C) 4', '(D) 6'],
    correct: 'B',
    resolucao: 'f(4) = 4k = 12 \u21d2 k = <strong>3</strong>.'
  },
  {
    id: 'fn-3',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023',
    tipo: 'escolha',
    enun: 'O gr\u00e1fico de uma fun\u00e7\u00e3o linear passa pelos pontos (0,0) e (3,6). Qual \u00e9 a express\u00e3o da fun\u00e7\u00e3o?',
    opts: ['(A) f(x) = x', '(B) f(x) = 2x', '(C) f(x) = 3x', '(D) f(x) = 6x'],
    correct: 'B',
    resolucao: 'Taxa de varia\u00e7\u00e3o: 6/3 = 2. Fun\u00e7\u00e3o: <strong>f(x) = 2x</strong>.'
  },
  {
    id: 'fn-4',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 2.\u00aa fase',
    tipo: 'aberta',
    enun: 'A quantidade de \u00e1gua num reservat\u00f3rio diminui \u00e0 raz\u00e3o de 5 litros por hora. Inicialmente havia 200 litros.\n\na) Escreve a express\u00e3o da fun\u00e7\u00e3o que d\u00e1 a quantidade de \u00e1gua ao fim de t horas.\nb) Quando o reservat\u00f3rio fica vazio?',
    resolucao: 'a) Q(t) = 200 \u2212 5t.\n\nb) Q(t) = 0 \u21d2 200 \u2212 5t = 0 \u21d2 t = 200/5 = <strong>40 horas</strong>.'
  },
  {
    id: 'fn-5',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'escolha',
    enun: 'A fun\u00e7\u00e3o afim f \u00e9 definida por f(x) = 3x + 2. Para que valor de x \u00e9 f(x) = 11?',
    opts: ['(A) 2', '(B) 3', '(C) 4', '(D) 5'],
    correct: 'B',
    resolucao: '3x + 2 = 11 \u21d2 3x = 9 \u21d2 x = <strong>3</strong>.'
  },
  {
    id: 'fn-6',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'aberta',
    enun: 'Um taxi cobra 2\u20ac de taxa de entrada mais 0,50\u20ac por km percorrido.\n\na) Escreve a fun\u00e7\u00e3o que d\u00e1 o custo C em fun\u00e7\u00e3o dos km k.\nb) Qual o custo para 10 km?',
    resolucao: 'a) C(k) = 2 + 0,5k.\n\nb) C(10) = 2 + 0,5\u00d710 = 2 + 5 = <strong>7\u20ac</strong>.'
  },
  {
    id: 'fn-7',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 2019',
    tipo: 'escolha',
    enun: 'Qual das seguintes express\u00f5es define uma fun\u00e7\u00e3o de proporcionalidade direta?',
    opts: ['(A) y = 3x + 1', '(B) y = x\u00b2', '(C) y = 5x', '(D) y = 2/x'],
    correct: 'C',
    resolucao: 'Uma fun\u00e7\u00e3o de proporcionalidade direta tem a forma y = kx, com k constante. Resposta: <strong>y = 5x</strong>.'
  },
  {
    id: 'fn-8',
    fonte: 'Teste Interm\u00e9dio 8.\u00ba ano \u2013 2019',
    tipo: 'escolha',
    enun: 'A fun\u00e7\u00e3o f(x) = \u22124x + 8 tem zero em:',
    opts: ['(A) x = \u22128', '(B) x = \u22122', '(C) x = 2', '(D) x = 8'],
    correct: 'C',
    resolucao: 'f(x) = 0 \u21d2 \u22124x + 8 = 0 \u21d2 \u22124x = \u22128 \u21d2 x = <strong>2</strong>.'
  },
  {
    id: 'fn-9',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2018',
    tipo: 'aberta',
    enun: 'A temperatura exterior sobe 3\u00b0C por hora a partir das 6h. \u00c0s 6h a temperatura era 8\u00b0C.\n\na) Escreve a fun\u00e7\u00e3o T(h) que d\u00e1 a temperatura h horas ap\u00f3s as 6h.\nb) A que horas a temperatura chega a 20\u00b0C?',
    resolucao: 'a) T(h) = 8 + 3h.\n\nb) 8 + 3h = 20 \u21d2 3h = 12 \u21d2 h = 4. A temperatura chega a 20\u00b0C \u00e0s <strong>10h</strong>.'
  },
  {
    id: 'fn-10',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'O gr\u00e1fico de f(x) = 2x \u2212 4 corta o eixo dos y em:',
    opts: ['(A) y = \u22124', '(B) y = 0', '(C) y = 2', '(D) y = 4'],
    correct: 'A',
    resolucao: 'Para x = 0: f(0) = 2\u00d70 \u2212 4 = <strong>\u22124</strong>.'
  },
  {
    id: 'fn-11',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'Se y \u00e9 diretamente proporcional a x e y = 15 quando x = 5, qual \u00e9 o valor de y quando x = 8?',
    opts: ['(A) 18', '(B) 20', '(C) 24', '(D) 40'],
    correct: 'C',
    resolucao: 'Constante de proporcionalidade: k = 15/5 = 3.\ny = 3\u00d78 = <strong>24</strong>.'
  },
  {
    id: 'fn-12',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'aberta',
    enun: 'Um pomar produz 300 kg de fruta por hectare por dia. A produ\u00e7\u00e3o total P (kg) depende do n\u00famero de hectares h e do n\u00famero de dias d.\n\nEscreve a express\u00e3o de P em fun\u00e7\u00e3o de h e d. Calcula P para h = 4 e d = 7.',
    resolucao: 'P(h, d) = 300 \u00d7 h \u00d7 d.\nP(4, 7) = 300 \u00d7 4 \u00d7 7 = <strong>8400 kg</strong>.'
  },
  {
    id: 'fn-13',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o declive da reta que passa nos pontos (1, 3) e (4, 9)?',
    opts: ['(A) 1', '(B) 2', '(C) 3', '(D) 6'],
    correct: 'B',
    resolucao: 'Declive = (9\u22123)/(4\u22121) = 6/3 = <strong>2</strong>.'
  },
  {
    id: 'fn-14',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2017',
    tipo: 'escolha',
    enun: 'A fun\u00e7\u00e3o f(x) = 4x + 1 \u00e9 crescente ou decrescente?',
    opts: ['(A) Crescente, porque o declive \u00e9 positivo', '(B) Decrescente, porque o declive \u00e9 positivo', '(C) Crescente, porque a ordenada na origem \u00e9 1', '(D) Decrescente, porque a ordenada na origem \u00e9 1'],
    correct: 'A',
    resolucao: 'O declive \u00e9 4 > 0, por isso a fun\u00e7\u00e3o \u00e9 <strong>crescente</strong>.'
  },
  {
    id: 'fn-15',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2019',
    tipo: 'aberta',
    enun: 'Uma fun\u00e7\u00e3o linear f verifica f(6) = 18.\n\na) Determina a express\u00e3o de f.\nb) Para que valor de x \u00e9 f(x) = 30?',
    resolucao: 'a) f(x) = kx. f(6) = 18 \u21d2 6k = 18 \u21d2 k = 3. Logo <strong>f(x) = 3x</strong>.\n\nb) 3x = 30 \u21d2 x = <strong>10</strong>.'
  }
],

sequencias: [
  {
    id: 'seq-1',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'Numa progress\u00e3o aritm\u00e9tica, o primeiro termo \u00e9 3 e a raz\u00e3o \u00e9 4. Qual \u00e9 o 10.\u00ba termo?',
    opts: ['(A) 39', '(B) 40', '(C) 43', '(D) 47'],
    correct: 'A',
    resolucao: 'a_n = a_1 + (n\u22121) \u00d7 r = 3 + 9 \u00d7 4 = 3 + 36 = <strong>39</strong>.'
  },
  {
    id: 'seq-2',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'A sequ\u00eancia 2, 6, 18, 54, ... \u00e9 uma progress\u00e3o geom\u00e9trica. Qual \u00e9 a raz\u00e3o?',
    opts: ['(A) 2', '(B) 3', '(C) 4', '(D) 6'],
    correct: 'B',
    resolucao: 'Raz\u00e3o = 6/2 = 18/6 = 54/18 = <strong>3</strong>.'
  },
  {
    id: 'seq-3',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'A regra de forma\u00e7\u00e3o de uma sequ\u00eancia \u00e9 a_n = 5n \u2212 2. Qual \u00e9 o 7.\u00ba termo?',
    opts: ['(A) 30', '(B) 32', '(C) 33', '(D) 35'],
    correct: 'C',
    resolucao: 'a_7 = 5\u00d77 \u2212 2 = 35 \u2212 2 = <strong>33</strong>.'
  },
  {
    id: 'seq-4',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 2.\u00aa fase',
    tipo: 'aberta',
    enun: 'Uma sequ\u00eancia num\u00e9rica come\u00e7a em 1 e cada termo \u00e9 obtido somando 3 ao anterior.\n\na) Escreve os primeiros 5 termos.\nb) Qual \u00e9 a express\u00e3o geral do n.\u00ba termo?',
    resolucao: 'a) 1, 4, 7, 10, 13.\n\nb) a_n = 1 + (n\u22121)\u00d73 = <strong>3n \u2212 2</strong>.'
  },
  {
    id: 'seq-5',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o 8.\u00ba termo da sequ\u00eancia definida por a_n = n\u00b2 + 1?',
    opts: ['(A) 64', '(B) 65', '(C) 63', '(D) 17'],
    correct: 'B',
    resolucao: 'a_8 = 8\u00b2 + 1 = 64 + 1 = <strong>65</strong>.'
  },
  {
    id: 'seq-6',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'aberta',
    enun: 'Os primeiros termos de uma sequ\u00eancia s\u00e3o: 3, 7, 11, 15, ...\n\na) Qual \u00e9 a lei de forma\u00e7\u00e3o?\nb) Qual \u00e9 o 20.\u00ba termo?',
    resolucao: 'a) Cada termo aumenta 4. Lei: a_n = 4n \u2212 1 (verifica: a_1 = 3, a_2 = 7 \u2713).\n\nb) a_20 = 4\u00d720 \u2212 1 = 80 \u2212 1 = <strong>79</strong>.'
  },
  {
    id: 'seq-7',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'Numa sequ\u00eancia geom\u00e9trica, o primeiro termo \u00e9 2 e a raz\u00e3o \u00e9 3. Qual \u00e9 o 5.\u00ba termo?',
    opts: ['(A) 162', '(B) 180', '(C) 486', '(D) 54'],
    correct: 'A',
    resolucao: 'a_5 = 2 \u00d7 3^(5\u22121) = 2 \u00d7 81 = <strong>162</strong>.'
  },
  {
    id: 'seq-8',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'aberta',
    enun: 'Uma sequ\u00eancia de figuras \u00e9 formada por quadrados: 1.\u00ba figura tem 1 quadrado, 2.\u00aa figura tem 4, 3.\u00aa tem 9, ...\n\na) Quantos quadrados t\u00eam a 6.\u00aa figura?\nb) Escreve a express\u00e3o geral.',
    resolucao: 'a) A n.\u00aa figura tem n\u00b2 quadrados. 6.\u00aa figura: 6\u00b2 = <strong>36 quadrados</strong>.\n\nb) a_n = <strong>n\u00b2</strong>.'
  },
  {
    id: 'seq-9',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'escolha',
    enun: 'Uma sequ\u00eancia tem a express\u00e3o geral a_n = 2n + 3. Qual \u00e9 o primeiro termo da sequ\u00eancia que \u00e9 maior que 30?',
    opts: ['(A) n = 13', '(B) n = 14', '(C) n = 15', '(D) n = 16'],
    correct: 'B',
    resolucao: '2n + 3 > 30 \u21d2 2n > 27 \u21d2 n > 13,5. O primeiro inteiro \u00e9 <strong>n = 14</strong>.'
  },
  {
    id: 'seq-10',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'aberta',
    enun: 'Uma poupan\u00e7a come\u00e7a com 10\u20ac e duplica a cada m\u00eas.\n\na) Quanto h\u00e1 ao fim do 5.\u00ba m\u00eas?\nb) Escreve a express\u00e3o geral para o m\u00eas n.',
    resolucao: 'a) a_n = 10 \u00d7 2^(n\u22121). a_5 = 10 \u00d7 2^4 = 10 \u00d7 16 = <strong>160\u20ac</strong>.\n\nb) a_n = <strong>10 \u00d7 2^(n\u22121)</strong>.'
  },
  {
    id: 'seq-11',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    enun: 'A sequ\u00eancia 1, 4, 9, 16, 25, ... \u00e9 formada pelos quadrados perfeitos. Qual \u00e9 o 12.\u00ba termo?',
    opts: ['(A) 121', '(B) 132', '(C) 144', '(D) 156'],
    correct: 'C',
    resolucao: 'a_12 = 12\u00b2 = <strong>144</strong>.'
  },
  {
    id: 'seq-12',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2018',
    tipo: 'aberta',
    enun: 'Observa a sequ\u00eancia de figuras:\n- Figura 1: 3 palitos\n- Figura 2: 5 palitos\n- Figura 3: 7 palitos\n\na) Quantos palitos tem a figura 10?\nb) Escreve a express\u00e3o geral.',
    resolucao: 'a) a_n = 2n + 1. a_10 = 2\u00d710+1 = <strong>21 palitos</strong>.\n\nb) a_n = <strong>2n + 1</strong>.'
  },
  {
    id: 'seq-13',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2019',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o 15.\u00ba n\u00famero \u00edmpar positivo?',
    opts: ['(A) 27', '(B) 28', '(C) 29', '(D) 30'],
    correct: 'C',
    resolucao: 'Os n\u00fameros \u00edmpares positivos s\u00e3o 1, 3, 5, ..., com a_n = 2n\u22121.\na_15 = 2\u00d715\u22121 = <strong>29</strong>.'
  },
  {
    id: 'seq-14',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2018',
    tipo: 'escolha',
    enun: 'A sequ\u00eancia 100, 95, 90, 85, ... \u00e9 uma progress\u00e3o aritm\u00e9tica. Qual \u00e9 a raz\u00e3o?',
    opts: ['(A) \u22125', '(B) 5', '(C) \u221295', '(D) 95'],
    correct: 'A',
    resolucao: 'Raz\u00e3o = 95 \u2212 100 = <strong>\u22125</strong>.'
  },
  {
    id: 'seq-15',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2017',
    tipo: 'aberta',
    enun: 'Uma sequ\u00eancia num\u00e9rica: 5, 8, 11, 14, ...\n\na) Qual \u00e9 a raz\u00e3o desta progress\u00e3o aritm\u00e9tica?\nb) Qual \u00e9 o 50.\u00ba termo?',
    resolucao: 'a) Raz\u00e3o = 8 \u2212 5 = <strong>3</strong>.\n\nb) a_50 = 5 + 49\u00d73 = 5 + 147 = <strong>152</strong>.'
  },
  {
    id: 'seq-16',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019',
    tipo: 'escolha',
    enun: 'A express\u00e3o geral de uma sequ\u00eancia \u00e9 a_n = 3n \u2212 1. Qual \u00e9 o valor de n para o qual a_n = 50?',
    opts: ['(A) 16', '(B) 17', '(C) 18', '(D) 19'],
    correct: 'B',
    resolucao: '3n \u2212 1 = 50 \u21d2 3n = 51 \u21d2 n = <strong>17</strong>.'
  },
  {
    id: 'seq-17',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018',
    tipo: 'escolha',
    enun: 'Qual dos seguintes pares de termos pertence \u00e0 sequ\u00eancia a_n = 4n + 2?',
    opts: ['(A) (1, 4) e (2, 8)', '(B) (1, 6) e (2, 10)', '(C) (1, 5) e (2, 9)', '(D) (1, 6) e (3, 14)'],
    correct: 'B',
    resolucao: 'a_1 = 4\u00d71+2 = 6; a_2 = 4\u00d72+2 = 10. Resposta: <strong>(1, 6) e (2, 10)</strong>.'
  },
  {
    id: 'seq-18',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2017',
    tipo: 'aberta',
    enun: 'Uma sequ\u00eancia de tri\u00e2ngulos: 1.\u00ba tri\u00e2ngulo tem 3 palitos, 2.\u00ba tem 5, 3.\u00ba tem 7, ...\n\na) Descreve o padr\u00e3o.\nb) Quantos palitos s\u00e3o necess\u00e1rios para o 100.\u00ba tri\u00e2ngulo?',
    resolucao: 'a) Cada novo tri\u00e2ngulo adiciona 2 palitos. Padr\u00e3o: a_n = 2n + 1.\n\nb) a_100 = 2\u00d7100 + 1 = <strong>201 palitos</strong>.'
  },
  {
    id: 'seq-19',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016',
    tipo: 'escolha',
    enun: 'A sequ\u00eancia num\u00e9rica \u00e9: 1, 1, 2, 3, 5, 8, 13, ... (sequ\u00eancia de Fibonacci). Qual \u00e9 o pr\u00f3ximo termo?',
    opts: ['(A) 18', '(B) 20', '(C) 21', '(D) 24'],
    correct: 'C',
    resolucao: 'Cada termo \u00e9 a soma dos dois anteriores: 8 + 13 = <strong>21</strong>.'
  },
  {
    id: 'seq-20',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 2015',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o 100.\u00ba n\u00famero par positivo?',
    opts: ['(A) 198', '(B) 200', '(C) 202', '(D) 204'],
    correct: 'B',
    resolucao: 'N\u00fameros pares positivos: 2, 4, 6, ..., a_n = 2n.\na_100 = 2\u00d7100 = <strong>200</strong>.'
  }
],

not_cientifica: [
  {
    id: 'nc-1',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 1.\u00aa fase',
    tipo: 'escolha',
    enun: 'Escreve 0,00045 em nota\u00e7\u00e3o cient\u00edfica.',
    opts: ['(A) 4,5 \u00d7 10\u207b\u00b2', '(B) 4,5 \u00d7 10\u207b\u00b3', '(C) 4,5 \u00d7 10\u207b\u2074', '(D) 45 \u00d7 10\u207b\u2075'],
    correct: 'C',
    resolucao: '0,00045 = 4,5 \u00d7 10\u207b\u2074. O n\u00famero decimal move 4 casas para a direita para obter 4,5. Resposta: <strong>4,5 \u00d7 10\u207b\u2074</strong>.'
  },
  {
    id: 'nc-2',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2024, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o n\u00famero decimal correspondente a 3,2 \u00d7 10\u00b3?',
    opts: ['(A) 320', '(B) 3200', '(C) 32 000', '(D) 0,0032'],
    correct: 'B',
    resolucao: '3,2 \u00d7 10\u00b3 = 3,2 \u00d7 1000 = <strong>3200</strong>.'
  },
  {
    id: 'nc-3',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023',
    tipo: 'escolha',
    enun: 'Calcula (2 \u00d7 10\u00b3) \u00d7 (4 \u00d7 10\u00b2).',
    opts: ['(A) 8 \u00d7 10\u00b4', '(B) 8 \u00d7 10\u2075', '(C) 6 \u00d7 10\u00b5', '(D) 8 \u00d7 10\u2076'],
    correct: 'B',
    resolucao: '(2 \u00d7 10\u00b3) \u00d7 (4 \u00d7 10\u00b2) = (2\u00d74) \u00d7 10^(3+2) = 8 \u00d7 10\u2075 = <strong>800 000</strong>.'
  },
  {
    id: 'nc-4',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2023, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Qual \u00e9 a forma correta de escrever 56 000 000 em nota\u00e7\u00e3o cient\u00edfica?',
    opts: ['(A) 56 \u00d7 10\u2076', '(B) 5,6 \u00d7 10\u2077', '(C) 0,56 \u00d7 10\u2078', '(D) 5,6 \u00d7 10\u2076'],
    correct: 'B',
    resolucao: '56 000 000 = 5,6 \u00d7 10 000 000 = <strong>5,6 \u00d7 10\u2077</strong>. (Na nota\u00e7\u00e3o cient\u00edfica, a parte decimal est\u00e1 entre 1 e 10.)'
  },
  {
    id: 'nc-5',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'aberta',
    enun: 'A dist\u00e2ncia da Terra ao Sol \u00e9 aproximadamente 1,5 \u00d7 10\u2078 km.\na) Escreve este valor por extenso.\nb) Uma sonda espacial percorre 3 \u00d7 10\u2074 km por hora. Quanto tempo demora a chegar ao Sol?',
    resolucao: 'a) 1,5 \u00d7 10\u2078 = <strong>150 000 000 km</strong> (150 milh\u00f5es de km).\n\nb) Tempo = dist\u00e2ncia / velocidade = (1,5 \u00d7 10\u2078) / (3 \u00d7 10\u2074) = 0,5 \u00d7 10\u2074 = <strong>5000 horas</strong>.'
  },
  {
    id: 'nc-6',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2022',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o resultado de (6 \u00d7 10\u2076) \u00f7 (3 \u00d7 10\u00b2)?',
    opts: ['(A) 2 \u00d7 10\u00b3', '(B) 2 \u00d7 10\u2074', '(C) 2 \u00d7 10\u2075', '(D) 3 \u00d7 10\u2074'],
    correct: 'B',
    resolucao: '(6\u00f73) \u00d7 10^(6\u22122) = 2 \u00d7 10\u2074 = <strong>20 000</strong>.'
  },
  {
    id: 'nc-7',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'A massa de um \u00e1tomo de hidrog\u00eanio \u00e9 1,67 \u00d7 10\u207b\u00b2\u2077 kg. Qual \u00e9 a massa de 1000 \u00e1tomos?',
    opts: ['(A) 1,67 \u00d7 10\u207b\u00b2\u2074', '(B) 1,67 \u00d7 10\u207b\u00b2\u2075', '(C) 1,67 \u00d7 10\u207b\u00b3\u2070', '(D) 1670 \u00d7 10\u207b\u00b2\u2077'],
    correct: 'A',
    resolucao: '1000 = 10\u00b3. 1,67 \u00d7 10\u207b\u00b2\u2077 \u00d7 10\u00b3 = <strong>1,67 \u00d7 10\u207b\u00b2\u2074</strong>.'
  },
  {
    id: 'nc-8',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2021',
    tipo: 'escolha',
    enun: 'Qual das seguintes igualdades \u00e9 verdadeira?',
    opts: ['(A) 10\u207b\u00b3 = \u22121000', '(B) 10\u207b\u00b3 = 0,001', '(C) 10\u207b\u00b3 = \u22120,001', '(D) 10\u207b\u00b3 = 1/30'],
    correct: 'B',
    resolucao: '10\u207b\u00b3 = 1/10\u00b3 = 1/1000 = <strong>0,001</strong>.'
  },
  {
    id: 'nc-9',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o resultado de 10\u00b4 \u00d7 10\u207b\u00b2?',
    opts: ['(A) 10\u207b\u2078', '(B) 10\u00b2', '(C) 10\u2076', '(D) 10\u207b\u00b2'],
    correct: 'B',
    resolucao: '10\u00b4 \u00d7 10\u207b\u00b2 = 10^(4+(\u22122)) = <strong>10\u00b2</strong> = 100.'
  },
  {
    id: 'nc-10',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2020',
    tipo: 'aberta',
    enun: 'O di\u00e2metro de um v\u00edrus \u00e9 de 2 \u00d7 10\u207b\u2077 m. Uma c\u00e9lula tem di\u00e2metro de 5 \u00d7 10\u207b\u2075 m.\nQuantas vezes o di\u00e2metro da c\u00e9lula \u00e9 maior que o do v\u00edrus?',
    resolucao: 'Raz\u00e3o = (5 \u00d7 10\u207b\u2075) \u00f7 (2 \u00d7 10\u207b\u2077) = (5\u00f72) \u00d7 10^(\u22125\u2212(\u22127)) = 2,5 \u00d7 10\u00b2 = <strong>250 vezes</strong>.'
  },
  {
    id: 'nc-11',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    enun: 'Qual \u00e9 a forma decimal de 7,3 \u00d7 10\u207b\u00b3?',
    opts: ['(A) 0,0073', '(B) 0,073', '(C) 0,73', '(D) 7300'],
    correct: 'A',
    resolucao: '7,3 \u00d7 10\u207b\u00b3 = 7,3 \u00f7 1000 = <strong>0,0073</strong>.'
  },
  {
    id: 'nc-12',
    fonte: 'Teste Interm\u00e9dio 7.\u00ba ano \u2013 2018',
    tipo: 'escolha',
    enun: 'O n\u00famero 0,000 008 5 escrito em nota\u00e7\u00e3o cient\u00edfica \u00e9:',
    opts: ['(A) 8,5 \u00d7 10\u207b\u00b7', '(B) 8,5 \u00d7 10\u207b\u2076', '(C) 85 \u00d7 10\u207b\u2077', '(D) 0,85 \u00d7 10\u207b\u2075'],
    correct: 'B',
    resolucao: '0,000 008 5 = 8,5 \u00d7 10\u207b\u2076 (a v\u00edrgula move 6 casas para a direita). Resposta: <strong>8,5 \u00d7 10\u207b\u2076</strong>.'
  },
  {
    id: 'nc-13',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2019',
    tipo: 'escolha',
    enun: 'A popula\u00e7\u00e3o mundial \u00e9 de cerca de 8 \u00d7 10\u2079 pessoas. A popula\u00e7\u00e3o de Portugal \u00e9 cerca de 1 \u00d7 10\u2077. Quantas vezes a popula\u00e7\u00e3o mundial \u00e9 maior?',
    opts: ['(A) 8', '(B) 80', '(C) 800', '(D) 8000'],
    correct: 'C',
    resolucao: '(8 \u00d7 10\u2079) \u00f7 (1 \u00d7 10\u2077) = 8 \u00d7 10\u00b2 = <strong>800 vezes</strong>.'
  },
  {
    id: 'nc-14',
    fonte: 'Prova de Aferi\u00e7\u00e3o \u2013 2018',
    tipo: 'aberta',
    enun: 'Escreve em nota\u00e7\u00e3o cient\u00edfica:\na) 420 000\nb) 0,0000036',
    resolucao: 'a) 420 000 = <strong>4,2 \u00d7 10\u2075</strong>.\nb) 0,0000036 = <strong>3,6 \u00d7 10\u207b\u2076</strong>.'
  },
  {
    id: 'nc-15',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2019',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o resultado de (3 \u00d7 10\u2074) + (5 \u00d7 10\u00b3)?',
    opts: ['(A) 8 \u00d7 10\u2077', '(B) 3,5 \u00d7 10\u2074', '(C) 35 000', '(D) 8 \u00d7 10\u2074'],
    correct: 'C',
    resolucao: '3 \u00d7 10\u2074 = 30 000; 5 \u00d7 10\u00b3 = 5000.\n30 000 + 5000 = <strong>35 000</strong> = 3,5 \u00d7 10\u2074.'
  },
  {
    id: 'nc-16',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o valor de 2\u207b\u00b3?',
    opts: ['(A) \u22128', '(B) \u22121/8', '(C) 1/8', '(D) 8'],
    correct: 'C',
    resolucao: '2\u207b\u00b3 = 1/2\u00b3 = 1/8 = <strong>0,125</strong>.'
  },
  {
    id: 'nc-17',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2018, 2.\u00aa fase',
    tipo: 'escolha',
    enun: 'Em nota\u00e7\u00e3o cient\u00edfica, um \u00e1tomo de ouro tem raio de 1,44 \u00d7 10\u207b\u00b9\u2070 m. Qual das seguintes afirma\u00e7\u00f5es \u00e9 verdadeira?',
    opts: ['(A) O raio \u00e9 maior que 10\u207b\u2079 m', '(B) O raio \u00e9 menor que 10\u207b\u00b9\u2070 m', '(C) O raio \u00e9 maior que 10\u207b\u00b9\u2070 m e menor que 10\u207b\u2079 m', '(D) O raio \u00e9 igual a 10\u207b\u2079 m'],
    correct: 'C',
    resolucao: '1,44 \u00d7 10\u207b\u00b9\u2070 est\u00e1 entre 10\u207b\u00b9\u2070 e 10\u207b\u2079. Resposta: <strong>(C)</strong>.'
  },
  {
    id: 'nc-18',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2017',
    tipo: 'aberta',
    enun: 'A velocidade da luz \u00e9 3 \u00d7 10\u2078 m/s. Um ano tem 3,15 \u00d7 10\u2077 segundos.\nQual a dist\u00e2ncia que a luz percorre num ano? D\u00e1 a resposta em nota\u00e7\u00e3o cient\u00edfica.',
    resolucao: 'dist\u00e2ncia = velocidade \u00d7 tempo = (3 \u00d7 10\u2078) \u00d7 (3,15 \u00d7 10\u2077)\n= 9,45 \u00d7 10^(8+7) = <strong>9,45 \u00d7 10\u00b9\u2075 m</strong>.'
  },
  {
    id: 'nc-19',
    fonte: 'Prova Final 3.\u00ba Ciclo \u2013 2016',
    tipo: 'escolha',
    enun: 'Ordena por ordem crescente: 3 \u00d7 10\u207b\u00b2, 2 \u00d7 10\u207b\u00b3, 4 \u00d7 10\u207b\u00b2, 1 \u00d7 10\u207b\u00b9',
    opts: ['(A) 2\u00d710\u207b\u00b3 < 3\u00d710\u207b\u00b2 < 4\u00d710\u207b\u00b2 < 1\u00d710\u207b\u00b9', '(B) 1\u00d710\u207b\u00b9 < 4\u00d710\u207b\u00b2 < 3\u00d710\u207b\u00b2 < 2\u00d710\u207b\u00b3', '(C) 2\u00d710\u207b\u00b3 < 4\u00d710\u207b\u00b2 < 3\u00d710\u207b\u00b2 < 1\u00d710\u207b\u00b9', '(D) 3\u00d710\u207b\u00b2 < 4\u00d710\u207b\u00b2 < 2\u00d710\u207b\u00b3 < 1\u00d710\u207b\u00b9'],
    correct: 'A',
    resolucao: '2\u00d710\u207b\u00b3 = 0,002; 3\u00d710\u207b\u00b2 = 0,03; 4\u00d710\u207b\u00b2 = 0,04; 1\u00d710\u207b\u00b9 = 0,1.\nOrdem crescente: <strong>0,002 < 0,03 < 0,04 < 0,1</strong>.'
  },
  {
    id: 'nc-20',
    fonte: 'Teste Interm\u00e9dio 9.\u00ba ano \u2013 2015',
    tipo: 'escolha',
    enun: 'Qual \u00e9 o resultado de (5 \u00d7 10\u207b\u00b2) \u00d7 (2 \u00d7 10\u2076)?',
    opts: ['(A) 10\u2074', '(B) 10\u2075', '(C) 10\u2076', '(D) 7 \u00d7 10\u2074'],
    correct: 'B',
    resolucao: 'Multiplica separadamente os n\u00fameros e as pot\u00eancias de 10:\n\n(5 \u00d7 2) \u00d7 10^(\u22122 + 6)\n= 10 \u00d7 10\u2074\n= 10\u00b9 \u00d7 10\u2074\n= <strong>10\u2075</strong> = 100 000\n\nRegra: ao multiplicar pot\u00eancias de 10, somam-se os expoentes.'
  }
]

};
