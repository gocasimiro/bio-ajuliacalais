/* Eventos do Google Analytics próprios do projeto.
   O GA já mede sozinho page_view, cliques de saída e o download do PDF;
   aqui entram as ações que ele não enxerga ou enxerga sem contexto:

     copiar_cupom     marca, cupom         botão de copiar cupom
     contato_email    origem               links mailto: (publicidade / contato)
     clique_parceiro  marca, pagina        ida para a loja de uma marca parceira

   Sem dependências. Se o GA não carregar (bloqueador etc.), não faz nada. */
(function () {
  'use strict';

  function enviar(nome, dados) {
    if (typeof window.gtag === 'function') window.gtag('event', nome, dados);
  }

  function texto(el) {
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  var pagina = location.pathname.indexOf('/cupons-de-desconto/') > -1 ? 'cupons'
             : location.pathname.indexOf('/parceiros/') > -1 ? 'parceiros'
             : 'home';

  document.addEventListener('click', function (e) {
    var alvo = e.target.closest('.coupon__code, a[href^="mailto:"], .coupon__cta, a.link[rel~="sponsored"]');
    if (!alvo) return;

    /* cupom copiado */
    if (alvo.matches('.coupon__code')) {
      enviar('copiar_cupom', {
        marca: texto(alvo.closest('.coupon').querySelector('.coupon__brand')),
        cupom: alvo.dataset.code
      });
      return;
    }

    /* e-mail — a seção diz de onde veio */
    if (alvo.matches('a[href^="mailto:"]')) {
      var secao = alvo.closest('section');
      var id = secao ? secao.getAttribute('aria-labelledby') : '';
      enviar('contato_email', {
        origem: id === 's-publicidade' ? 'publicidade' : id === 's-contato' ? 'contato' : 'outro'
      });
      return;
    }

    /* loja parceira — pelo botão do cupom ou pela aba de parceiros */
    var marca = alvo.matches('.coupon__cta')
      ? texto(alvo.closest('.coupon').querySelector('.coupon__brand'))
      : texto(alvo.querySelector('.link__title'));
    enviar('clique_parceiro', { marca: marca, pagina: pagina });
  });
})();
