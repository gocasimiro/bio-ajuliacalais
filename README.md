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
parceiros/index.html          aba de marcas parceiras
links-de-produtos/index.html  aba de achadinhos, agrupada por cômodo
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
2. **Cupons, parceiros & achadinhos** — entrada para as três abas
3. **Meu conteúdo** — Instagram
4. **Em destaque** — a série "na minha casa tem"
5. **Marcas que já passaram por aqui**
6. **Fala comigo** — e-mail, Instagram e localização

### Rótulo × rota

A aba de achadinhos aparece como **"Links de achadinhos"**, mas a rota continua
sendo `/links-de-produtos/`. Isso é de propósito: o rótulo é o que a pessoa lê,
a rota é o que o Google já indexou. Trocar a URL derrubaria o histórico de
posicionamento — se um dia for preciso mudar mesmo, tem que vir com redirect.

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

**Um achadinho** — copiar um bloco `<a class="link">` dentro do grupo do cômodo
certo em `links-de-produtos/index.html`. Para criar um cômodo novo, copiar a
`<section class="group">` inteira com seu `<h2 class="eyebrow">`.

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
| `serie-colecao` | link da coleção da série no Instagram |
| `achadinho-*` | achadinhos reais + link de cada um |
| `parceiro-*` | endereço das 8 marcas restantes (WestWing, Selvvva, Estúdio Joá e Parafuzo já estão ligadas) |
| `TODO(dns)` | trocar `bio.juliacalais.com.br` pelo domínio real em todos os HTML, `robots.txt` e `sitemap.xml` |

**E-mail, Instagram e os 4 cupons de desconto já estão reais e funcionando.**

---

## Responsividade

Um único sistema de grades, controlado por variáveis CSS (`--pad`, `--col`, `--gap`):

| Grade | Largura | Comportamento |
|---|---|---|
| Celular | até 599px | coluna cheia, capa sangrando nas bordas, abas rolando de lado |
| Tablet | ≥ 600px | coluna de 600px, capa emoldurada, listas em duas colunas |
| Desktop | ≥ 1024px | home em duas colunas — retrato fixo à esquerda, conteúdo rolando à direita; contato em quatro colunas |
| Telas largas | ≥ 1440px | coluna de 1160px, trilho um pouco mais largo |

Detalhes que sustentam a navegação em qualquer tela:

- **Abas fixas** no topo das páginas internas — sempre alcançáveis ao rolar
- Alvos de toque de **44px** nos ícones, abas e botões de cupom
- Item ímpar sobrando no fim de uma lista ocupa a linha inteira, sem buraco
- Link **"pular para o conteúdo"** para teclado e leitor de tela
- `scroll-behavior:smooth`, desligado para quem pede menos movimento
- Folha de impressão enxuta

---

## SEO

- `<title>` e `<meta description>` próprios em cada página
- `canonical`, Open Graph e Twitter Card em todas as páginas indexáveis
- **JSON-LD**: `WebSite` + `ProfilePage` + `Person` na home; `CollectionPage` +
  `BreadcrumbList` nas abas
- Hierarquia de títulos correta — um `h1` por página, seções em `h2`, itens em `h3`
- `sitemap.xml` com as quatro URLs e `robots.txt` liberando tudo
- `404.html` com `noindex, follow`
- Imagens com `width`/`height` declarados (não há salto de layout ao carregar),
  `alt` descritivo, `loading="lazy"` fora da dobra
- Fonte self-hosted com `preload` — sem requisição a terceiros
- `rel="noopener sponsored"` nos links de afiliado das abas

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
