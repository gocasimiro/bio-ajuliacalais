# bio.ajuliacalais

Página de links (link-in-bio) da **Júlia Calais** — site estático, sem build, sem dependências,
hospedado no GitHub Pages.

Estrutura inspirada em [bio.micaeladicorrado.com](https://bio.micaeladicorrado.com/);
identidade visual herdada do Media Kit 2026 (creme, marrom, terracota e limão).

---

## Estrutura

```
index.html              página única
404.html                erro amigável
robots.txt / sitemap.xml
CNAME.example           modelo do domínio (renomear para CNAME — ver abaixo)
.nojekyll               desliga o Jekyll no Pages
assets/
  styles.css            folha de estilo única, com tokens no topo
  fonts/*.woff2         Playfair Display (SIL OFL 1.1), self-hosted
  img/
    hero.jpg            capa
    serie.jpg           card em destaque
    og.jpg              preview de compartilhamento (1200×630)
    icon-32.png         favicon
    icon-180.png        ícone iOS
```

Não há build. Editar o HTML e dar push já publica.

---

## Pendências antes de divulgar

Todo link ainda não definido está marcado no HTML com `data-todo`. Para listar:

```bash
grep -n 'data-todo\|TODO(' index.html robots.txt sitemap.xml
```

| Marcador | O que falta |
|---|---|
| `media-kit` | subir o PDF do media kit e apontar o `href` |
| `tiktok-handle` | confirmar o @ do TikTok (presumi o mesmo do Instagram) |
| `serie-na-minha-casa-tem` | link de "Achados & indicações" |
| `serie-colecao` | link da coleção/destaque da série no Instagram |
| `TODO(dns)` | trocar `bio.juliacalais.com.br` pelo domínio real em `index.html`, `robots.txt` e `sitemap.xml` |

Os links de **e-mail, WhatsApp e Instagram já estão reais** e funcionando.

---

## Personalizar

Tudo que é cor, fonte e largura está em `assets/styles.css`, no bloco `:root`:

```css
--ground: #FBF8DE;   /* fundo creme            */
--lime:   #DFE59D;   /* botão prioritário      */
--ink:    #43301D;   /* texto marrom           */
--accent: #D6491F;   /* terracota (hover/foco) */
--col:    500px;     /* largura da coluna      */
```

**Adicionar um botão** — copiar um bloco `.link` dentro de `.links`.
**Botão de destaque** — acrescentar a classe `link--primary`.
**Nova seção** — copiar um `<section>` com seu `<p class="eyebrow">`.

---

## Publicar

O site sai do branch `main`, pasta raiz. Publicação:

```bash
git add -A && git commit -m "atualiza links" && git push
```

O Pages republica sozinho em ~1 minuto.

> **Atenção:** GitHub Pages em repositório **privado** exige plano pago
> (Pro/Team/Enterprise). Em conta gratuita é preciso deixar o repositório
> público para o Pages servir a página.

---

## Domínio próprio

1. Renomear `CNAME.example` para `CNAME` e colocar dentro **só** o domínio final,
   sem `https://` e sem barra — ex.: `bio.juliacalais.com.br`
2. No DNS do domínio, criar um registro **CNAME**:

   | Tipo | Nome | Valor |
   |---|---|---|
   | CNAME | `bio` | `gocasimiro.github.io` |

   Para domínio raiz (`juliacalais.com.br`, sem subdomínio), usar 4 registros **A**
   apontando para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Em **Settings → Pages → Custom domain**, informar o domínio e aguardar a validação.
4. Marcar **Enforce HTTPS** assim que o certificado for emitido (leva alguns minutos).
5. Trocar o domínio nos `TODO(dns)` do `index.html`, `robots.txt` e `sitemap.xml`.

---

## Licença

Conteúdo, fotos e marca: © Júlia Calais — todos os direitos reservados.
Playfair Display: SIL Open Font License 1.1.
