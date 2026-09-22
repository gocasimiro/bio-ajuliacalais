# bio-ajuliacalais

Página de links (link-in-bio) da **Júlia Calais** — site estático, sem build, sem
dependências externas (fora o Google Analytics), hospedado no GitHub Pages.

Estrutura inspirada em [bio.micaeladicorrado.com](https://bio.micaeladicorrado.com/);
identidade visual herdada do Media Kit 2026 (creme, marrom, terracota e limão).

---

## Estrutura

```
index.html                    home
cupons-de-desconto/index.html aba de cupons (com botão de copiar o código)
parceiros/index.html          aba de marcas parceiras
links-de-produtos/index.html  redireciona para o destaque LINKS do Instagram
404.html                      erro amigável
robots.txt / sitemap.xml
CNAME                         domínio do Pages (links.juliacalais.com)
.nojekyll                     desliga o Jekyll no Pages
assets/
  styles.css                  folha de estilo única, tokens no topo
  copy-code.js                copiar cupom (só a aba de cupons carrega)
  eventos.js                  eventos próprios do Google Analytics
  fonts/*.woff2               Playfair Display (SIL OFL 1.1), self-hosted
  media-kit/                  PDF do Media Kit 2026
  img/                        capa, destaque, preview social e ícones
```

Não há build nem instalação. Editar o HTML e dar push já publica.

### Seções da home

1. **Cupons, parceiros & achadinhos** — as duas abas + achadinhos no Instagram (vem primeiro
   porque é o que os seguidores procuram)
2. **Bora trabalhar juntos?** — contato para publicidade + Media Kit em PDF
3. **Meu conteúdo** — Instagram
4. **Marcas que já passaram por aqui**
5. **Fala comigo** — e-mail, Instagram e localização

### Achadinhos ficam no Instagram

Não há mais aba de achadinhos no site: eram muitos links e eles expiram com
frequência. O botão "Links de achadinhos" da home leva para o destaque **LINKS**
do perfil, que a Júlia atualiza direto no Instagram:

```
https://www.instagram.com/stories/highlights/18036806789789327/
```

O endereço antigo `/links-de-produtos/` redireciona para esse destaque (com
`noindex`), para quem ainda tiver o link. Se o destaque for recriado, o
número muda: trocar o endereço na home e em `links-de-produtos/index.html`.

---

## O media kit em PDF

O botão "Media Kit 2026" da home abre:

```
assets/media-kit/media-kit-julia-calais-2026.pdf
```

Para atualizar, basta substituir o arquivo mantendo **o mesmo nome** e dar push —
o link não muda. Se o nome mudar (ex.: kit de 2027), trocar também o `href` do
botão no `index.html`.

---

## Adicionar conteúdo

**Um cupom** — copiar um bloco `<article class="coupon">` em
`cupons-de-desconto/index.html`, trocando o nome da marca, a descrição, o
`data-code` (o código em si), o desconto e o `href` da loja. O botão de copiar
funciona sozinho, não precisa mexer no JS.

Cupom com condições (uso único, prazo, valor mínimo) ganha uma linha
`<p class="coupon__terms">` logo antes do botão da loja.

**Cupom com prazo** — acrescentar `data-expira="AAAA-MM-DD"` no `<article>`.
No dia seguinte à data, o cupom some da página sozinho, sem precisar de
commit. Para limpar o código de vez, é só apagar o bloco depois.

**Um parceiro** — mesma coisa em `parceiros/index.html`.

**Um botão na home** — copiar um bloco `.link` dentro de `.links`. Para destacar,
acrescentar a classe `link--primary` (fundo limão).

---

## Pendências

Todo link ainda não definido está marcado com `data-todo` e aparece esmaecido na
página. Para listar:

```bash
grep -rn 'data-todo\|TODO(' --include='*.html' --include='*.txt' --include='*.xml' .
```

| Marcador | O que falta |
|---|---|
| — | nada pendente no momento |

**Já estão reais e funcionando:** e-mail, Instagram, os 8 cupons de desconto,
as 15 marcas parceiras e o media kit em PDF.

### Endereços conferidos

Todos os links de loja responderam `200`. Dois foram normalizados para apontar
direto no destino final, sem salto de redirecionamento:

| Informado | Publicado | Motivo |
|---|---|---|
| `http://selvvva.com/` | `https://selvvva.com/` | o próprio site redireciona para HTTPS |
| `https://parafuzo.com.br/` | `https://parafuzo.com/` | o `.com.br` redireciona para o `.com` |

O Atelier da Renata chegou como `instagram.com/atelierdarenat` (cortado) e foi
corrigido para `instagram.com/atelierdarenata`, confirmado pela Júlia.

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
- Item ímpar sobrando no fim de uma lista ocupa a linha inteira, sem buraco (menos na aba de
  parceiros, onde todas as marcas ficam do mesmo tamanho)
- Link **"pular para o conteúdo"** para teclado e leitor de tela
- `scroll-behavior:smooth`, desligado para quem pede menos movimento
- Folha de impressão enxuta

---

## Analytics

Google Analytics 4, propriedade **Links @ajuliacalais**, ID `G-2QK9WZHWXT`.
A tag fica logo depois do `<head>` em `index.html`, `cupons-de-desconto/`,
`parceiros/` e `404.html`. Página nova precisa receber o mesmo bloco.
`links-de-produtos/` fica sem, porque redireciona na hora.

A medição avançada do GA já registra sozinha as visitas (`page_view`), os
cliques que saem do site (`click`) e o download do media kit (`file_download`).

`assets/eventos.js` (carregado na home, em cupons e em parceiros) manda os
eventos próprios do projeto:

| Evento | Parâmetros | Quando |
|---|---|---|
| `copiar_cupom` | `marca`, `cupom` | toque no botão de copiar cupom |
| `contato_email` | `origem` (`publicidade` / `contato`) | toque num link de e-mail |
| `clique_parceiro` | `marca`, `pagina` (`cupons` / `parceiros`) | ida para a loja de uma marca |

Marca, cupom e origem saem do próprio HTML (nome da marca, `data-code`,
seção), então cupom ou parceiro novo já entra medido, sem mexer no JS.

No GA, `copiar_cupom`, `contato_email` e `file_download` estão marcados como
**eventos-chave**. Para ver `marca`, `cupom` e `origem` nos relatórios, cada
um precisa estar cadastrado como dimensão personalizada (Admin → Custom
definitions, escopo *Event*).

---

## SEO

- `<title>` e `<meta description>` próprios em cada página
- `canonical`, Open Graph e Twitter Card em todas as páginas indexáveis
- **JSON-LD**: `WebSite` + `ProfilePage` + `Person` na home; `CollectionPage` +
  `BreadcrumbList` nas abas
- Hierarquia de títulos correta — um `h1` por página, seções em `h2`, itens em `h3`
- `sitemap.xml` com as três URLs e `robots.txt` liberando tudo
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

Cada seção da home tem uma cor (`<section class="tone tone--…">`), usada
só na etiqueta do título e no hover dos botões:

| Classe | Cor | Seção |
|---|---|---|
| `tone--oliva` | `#6F7B00` | Cupons, parceiros & achadinhos |
| `tone--terracota` | `#D6491F` | Bora trabalhar juntos? |
| `tone--azul` | `#00699E` | Meu conteúdo |
| `tone--tinta` | `#43301D` | Marcas |
| `tone--areia` | `#EDE4CE` | Fala comigo |

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

O repositório é **público**, o que permite usar o Pages no plano gratuito.

---

## Domínio próprio

O site responde em **https://links.juliacalais.com**. O arquivo `CNAME` guarda
esse domínio para o Pages; não apague.

No DNS de `juliacalais.com` há um registro:

| Tipo | Nome | Valor |
|---|---|---|
| CNAME | `links` | `gocasimiro.github.io` |

Para trocar de domínio: editar o `CNAME`, trocar `links.juliacalais.com` em
todos os HTML, `robots.txt` e `sitemap.xml`, apontar o DNS novo e atualizar
em **Settings → Pages → Custom domain**.

> O `404.html` usa caminhos absolutos (`/assets/...`), o que é o certo para
> domínio próprio. Se você testar na URL de projeto do Pages
> (`gocasimiro.github.io/bio-ajuliacalais/`), só o 404 aparece sem estilo — as
> demais páginas usam caminhos relativos e funcionam nos dois casos.

---

## Licença

Conteúdo, fotos e marca: © Júlia Calais — todos os direitos reservados.
Playfair Display: SIL Open Font License 1.1.
