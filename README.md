# bio-ajuliacalais

Página de links (link-in-bio) da **Júlia Calais** — site estático, sem build, sem
dependências externas, hospedado no GitHub Pages.

Estrutura inspirada em [bio.micaeladicorrado.com](https://bio.micaeladicorrado.com/);
identidade visual herdada do Media Kit 2026 (creme, marrom, terracota e limão).

---

## Estrutura

```
index.html                    home
cupons-de-desconto/index.html aba de cupons (com botão de copiar o código)
links-de-produtos/index.html  aba de produtos, agrupada por cômodo
parceiros/index.html          aba de marcas parceiras
404.html                      erro amigável
robots.txt / sitemap.xml
CNAME.example                 modelo do domínio (renomear para CNAME)
.nojekyll                     desliga o Jekyll no Pages
assets/
  styles.css                  folha de estilo única, tokens no topo
  copy-code.js                copiar cupom (só a aba de cupons carrega)
  fonts/*.woff2               Playfair Display (SIL OFL 1.1), self-hosted
  media-kit/                  ← COLOQUE O PDF AQUI (ver LEIA-ME.txt)
  img/                        capa, destaque, preview social e ícones
```

Não há build nem instalação. Editar o HTML e dar push já publica.

### Seções da home

1. **Bora trabalhar juntos?** — contato para publicidade + Media Kit em PDF
2. **Cupons, produtos & parceiros** — entrada para as três abas
3. **Meu conteúdo** — Instagram e TikTok
4. **Em destaque** — a série "na minha casa tem"
5. **Marcas que já passaram por aqui**
6. **Fala comigo** — e-mail, Instagram, TikTok e localização

---

## O media kit em PDF

O botão da home já aponta para o caminho certo. Basta salvar o arquivo em:

```
assets/media-kit/media-kit-julia-calais-2026.pdf
```

com esse nome exato (minúsculo, com hifens, sem acento) e dar push. Enquanto o
PDF não estiver lá, o botão cai na página 404. Detalhes em
`assets/media-kit/LEIA-ME.txt`.

---

## Adicionar conteúdo

**Um cupom** — copiar um bloco `<article class="coupon">` em
`cupons-de-desconto/index.html`, trocando o nome da marca, a descrição, o
`data-code` (o código em si), o desconto e o `href` da loja. O botão de copiar
funciona sozinho, não precisa mexer no JS.

**Um produto** — copiar um bloco `<a class="link">` dentro do grupo do cômodo
certo em `links-de-produtos/index.html`. Para criar um cômodo novo, copiar a
`<section class="group">` inteira com seu `<p class="eyebrow">`.

**Um parceiro** — mesma coisa em `parceiros/index.html`.

**Um botão na home** — copiar um bloco `.link` dentro de `.links`. Para destacar,
acrescentar a classe `link--primary` (fundo limão).

> As três abas trazem itens de exemplo com um aviso em destaque no topo. Troque
> pelo conteúdo real e **apague o `<p class="note">`** antes de divulgar o link.

---

## Pendências

Todo link ainda não definido está marcado com `data-todo` e aparece esmaecido na
página. Para listar:

```bash
grep -rn 'data-todo\|TODO(' --include='*.html' --include='*.txt' --include='*.xml' .
```

| Marcador | O que falta |
|---|---|
| `media-kit-pdf` | salvar o PDF em `assets/media-kit/` |
| `tiktok-handle` | confirmar o @ do TikTok (presumi o mesmo do Instagram) |
| `serie-colecao` | link da coleção da série no Instagram |
| `loja-codigo1…3` | cupons reais + endereço de cada loja |
| `produto-*` | produtos reais + link de cada um |
| `parceiro-*` | endereço de cada marca (os nomes já são os reais) |
| `TODO(dns)` | trocar `bio.juliacalais.com.br` pelo domínio real em todos os HTML, `robots.txt` e `sitemap.xml` |

**E-mail e Instagram já estão reais e funcionando.**

---

## Personalizar o visual

Tudo que é cor, fonte e largura está em `assets/styles.css`, no bloco `:root`:

```css
--ground: #FBF8DE;   /* fundo creme            */
--lime:   #DFE59D;   /* botão prioritário      */
--ink:    #43301D;   /* texto marrom           */
--accent: #D6491F;   /* terracota (hover/foco) */
--col:    500px;     /* largura da coluna      */
```

---

## Ver localmente

```bash
python3 -m http.server 8080
```

E abrir <http://localhost:8080>.

---

## Publicar

O site sai do branch `main`, pasta raiz:

```bash
git add -A && git commit -m "atualiza links" && git push
```

O Pages republica sozinho em ~1 minuto.

> **Atenção:** GitHub Pages em repositório **privado** exige plano pago
> (Pro/Team/Enterprise). Em conta gratuita é preciso deixar o repositório
> público para o Pages servir a página — ou hospedar no Cloudflare Pages /
> Netlify, que servem repositório privado de graça.

---

## Domínio próprio

1. Renomear `CNAME.example` para `CNAME` e deixar dentro **só** o domínio final,
   sem `https://` e sem barra — ex.: `bio.juliacalais.com.br`
2. No DNS do domínio, criar um registro **CNAME**:

   | Tipo | Nome | Valor |
   |---|---|---|
   | CNAME | `bio` | `gocasimiro.github.io` |

   Para domínio raiz (sem subdomínio), usar 4 registros **A** apontando para
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`.
3. Em **Settings → Pages → Custom domain**, informar o domínio e aguardar a validação.
4. Marcar **Enforce HTTPS** assim que o certificado sair (leva alguns minutos).
5. Trocar o domínio em todos os `TODO(dns)`.

> O `404.html` usa caminhos absolutos (`/assets/...`), o que é o certo para
> domínio próprio. Se você testar na URL de projeto do Pages
> (`gocasimiro.github.io/bio-ajuliacalais/`), só o 404 aparece sem estilo — as
> demais páginas usam caminhos relativos e funcionam nos dois casos.

---

## Licença

Conteúdo, fotos e marca: © Júlia Calais — todos os direitos reservados.
Playfair Display: SIL Open Font License 1.1.
