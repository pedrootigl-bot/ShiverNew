# SEO — Shiver Broker

Atualizado em 20 de agosto de 2026.

## O que o site envia ao Google

- Título e descrição com **Shiver**, **Shiver Broker**, forex, crypto e opções.
- Canonical por página (home, blog, artigos e legal), sem título duplicado no template.
- Open Graph e Twitter (`summary_large_image`) em home, blog e artigos.
- Nomes alternativos no schema.org: Shiver, ShiverBroker, Corretora Shiver.
- `Organization`, `Brand`, `WebSite` e `FinancialService` no layout (válido em todas as URLs).
- `WebPage` da home **somente na home** — não vaza para `/blog` nem legal.
- Blog: `CollectionPage` + `ItemList` dos artigos.
- Artigos: `Article` (com `publisher.logo`) + breadcrumbs.
- Legal: `WebPage` + breadcrumbs.
- Sitemap em `https://www.shiverbroker.com/sitemap.xml` com `lastModified` real dos posts (não a data do deploy).
- Robots permitindo indexação.
- H1 da home: “Shiver Broker — o oceano está cheio…”
- Alt text nos depoimentos, métodos de depósito e imagens de produto.

## O que ranking **não** é automático

O Google não garante a 1ª posição para a palavra “Shiver” (há outros produtos com o mesmo nome). O que este trabalho faz é deixar claro que **este domínio é a Shiver Broker**, para buscas de marca e relacionadas.

## Obrigatório depois do deploy

1. Abrir [Google Search Console](https://search.google.com/search-console).
2. Adicionar a propriedade `https://www.shiverbroker.com`.
3. Verificar o domínio (DNS ou arquivo HTML).
4. Enviar o sitemap: `https://www.shiverbroker.com/sitemap.xml`.
5. Pedir indexação da home, `/blog` e artigos principais.

## Consultas que o site reforça

- Shiver
- Shiver Broker
- ShiverBroker
- corretora Shiver
- Shiver login
- Shiver investir
- conta demo Shiver
- Shiver Broker é confiável

## Manutenção

- Manter “Shiver Broker” no título da home e nos H1 das páginas-chave.
- Publicar artigos no blog com a marca no título quando fizer sentido.
- Não inventar `AggregateRating` nem FAQ schema sem o conteúdo visível na página.
- Qualquer página nova precisa de canonical, OG e JSON-LD próprio — não reutilizar o `WebPage` da home.
