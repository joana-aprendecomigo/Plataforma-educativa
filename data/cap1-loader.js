// ══════════════════════════════════════════════════════════════
// CAP1 DATA LOADER — carrega dados estáticos de cap1-data.json
// ══════════════════════════════════════════════════════════════
// Uso: incluir este script ANTES de cap1.js na página.
//   <script src="data/cap1-loader.js"></script>
//   <script src="js/cap1.js"></script>
//
// Expõe o objecto global CAP1_DATA com todas as constantes
// extraídas (flashcards, planos de questões, minitestes, etc.).
// ══════════════════════════════════════════════════════════════

var CAP1_DATA = null;

(function () {
  'use strict';

  // Caminho relativo ao HTML que inclui este script
  var _dataPrefix = (window.location.pathname.indexOf('/mat7/') !== -1 ||
                     window.location.pathname.endsWith('/mat7')) ? '../data/' : 'data/';
  var JSON_PATH = _dataPrefix + 'cap1-data.json';

  function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) {
          try {
            var data = JSON.parse(xhr.responseText);
            callback(null, data);
          } catch (e) {
            console.error('[cap1-loader] Erro ao interpretar JSON:', e);
            callback(e, null);
          }
        } else {
          console.error('[cap1-loader] Erro HTTP ' + xhr.status + ' ao carregar ' + path);
          callback(new Error('HTTP ' + xhr.status), null);
        }
      }
    };
    xhr.send(null);
  }

  // Carrega de forma síncrona para garantir que os dados estão disponíveis
  // antes de cap1.js executar. Usamos sync XHR (aceitável em scripts de
  // carregamento inicial, sem build system).
  function loadJSONSync(path) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', path, false); // síncrono
      xhr.send(null);
      if (xhr.status === 200 || xhr.status === 0) {
        return JSON.parse(xhr.responseText);
      }
    } catch (e) {
      console.warn('[cap1-loader] Falha no carregamento síncrono, a tentar async...', e);
    }
    return null;
  }

  // Tenta carregamento síncrono primeiro (garante disponibilidade imediata)
  var data = loadJSONSync(JSON_PATH);

  if (data) {
    CAP1_DATA = data;
    // Expor atalhos globais para compatibilidade retroativa
    if (!window.FC1_CARDS_DATA) window.FC1_CARDS_DATA = data.flashcards;
  } else {
    // Fallback: carregamento assíncrono
    console.warn('[cap1-loader] Carregamento síncrono falhou. A usar fallback assíncrono.');
    loadJSON(JSON_PATH, function (err, asyncData) {
      if (!err && asyncData) {
        CAP1_DATA = asyncData;
        if (!window.FC1_CARDS_DATA) window.FC1_CARDS_DATA = asyncData.flashcards;
        // Disparar evento para que cap1.js possa reagir se necessário
        var evt = new CustomEvent('cap1DataLoaded', { detail: asyncData });
        document.dispatchEvent(evt);
      }
    });
  }
})();
