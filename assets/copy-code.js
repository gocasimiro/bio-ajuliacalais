/* Copia o código do cupom ao toque, com retorno visual.
   Sem dependências. Degrada para execCommand onde a Clipboard API não existe
   (Safari antigo, páginas servidas por http). */
(function () {
  'use strict';

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (ok, falha) {
      var ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var deu = false;
      try { deu = document.execCommand('copy'); } catch (e) { deu = false; }
      document.body.removeChild(ta);
      deu ? ok() : falha();
    });
  }

  document.addEventListener('click', function (e) {
    var botao = e.target.closest('.coupon__code');
    if (!botao) return;

    var codigo = botao.dataset.code;
    var rotulo = botao.getAttribute('aria-label');

    copiar(codigo).then(function () {
      if (botao.dataset.ocupado) return;
      botao.dataset.ocupado = '1';
      botao.classList.add('is-copied');
      botao.setAttribute('aria-label', 'Cupom ' + codigo + ' copiado');

      var texto = botao.firstChild;                       /* nó de texto do código */
      var original = texto.nodeValue;
      texto.nodeValue = 'copiado! ';

      setTimeout(function () {
        botao.classList.remove('is-copied');
        texto.nodeValue = original;
        botao.setAttribute('aria-label', rotulo);
        delete botao.dataset.ocupado;
      }, 1600);
    }).catch(function () {
      /* se o navegador bloquear, seleciona o código para a pessoa copiar na mão */
      var faixa = document.createRange();
      faixa.selectNodeContents(botao);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(faixa);
    });
  });
})();
