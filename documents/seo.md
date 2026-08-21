# SEO — Shiver Broker

Atualizado em 21 de agosto de 2026.

## O que o site envia ao Google

- Título e descrição com **Shiver Broker**, forex, crypto e opções. Meta `keywords` curto (não lista de variações).
- Canonical por página (home, blog, artigos, `/sobre` e legal).
- Open Graph e Twitter em home, blog e artigos. Artigos usam a imagem do post, não só o `og.png`.
- `Organization`, `Brand`, `WebSite` e `FinancialService` no layout.
- `WebPage` da home **somente na home**.
- Blog: `CollectionPage` + `ItemList`.
- Artigos: `Article` com autor Pessoa (Helena Prado, Analista de Conteúdo, `/sobre`), `dateModified`, imagem do post e breadcrumbs.
- `/sobre`: `AboutPage` + breadcrumbs.
- Legal: `WebPage` + breadcrumbs.
- Sitemap com `/sobre` e `lastModified` dos posts (`updated`).
- Robots permitindo indexação.

## O que ranking **não** é automático

O Google não garante a 1ª posição para “Shiver”. O nicho é YMYL (dinheiro). Beleza, schema e CSS não substituem licença, autor humano e conteúdo útil contínuo.

Não inventar `AggregateRating` nem FAQ schema sem o texto visível na página.

## Feito no código (21/08)

- Página `/sobre` com empresa, CVM e PDFs. FAQ retirada a pedido.
- Byline nos artigos: Helena Prado, Analista de Conteúdo, apontando para `/sobre`.
- Dois depoimentos de Camila Rocha são clientes distintas (foto e data diferentes).
- Keywords e JSON-LD menos repetitivos.

## Obrigatório fora do código

1. Google Search Console: propriedade `https://www.shiverbroker.com`, verificar, enviar `sitemap.xml`, pedir indexação de `/`, `/sobre`, `/blog`.
2. Autores reais (nome, cargo, bio) quando houver responsável editorial.
3. Perfis oficiais no `sameAs` (LinkedIn, YouTube, etc.) — só URLs verdadeiras.
4. Publicar artigos úteis com data de atualização verdadeira, não só peças de conversão.
5. Medir Core Web Vitals no Search Console (produção, não `next dev`).

## Manutenção

- Manter “Shiver Broker” no título da home e nos H1 das páginas-chave.
- Qualquer página nova: canonical, OG e JSON-LD próprio.
- Depoimentos: nomes únicos; não fabricar nota agregada.
