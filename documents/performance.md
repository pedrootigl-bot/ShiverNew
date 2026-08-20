# Performance — Shiver Broker

Atualizado em 20 de agosto de 2026.

O site foi ajustado para abrir de forma utilizável em 3G, Wi‑Fi e cabo, sem mudar o conteúdo visível.

## O que pesava

- Imagens PNG de depósito/VIP/payout com 1–2 MB cada.
- Vídeo do hero (`hero-bg.mp4`, ~517 KB) pré-carregado em qualquer conexão.
- Prefetch de todas as páginas do blog e dos termos no carregamento inicial.
- Fonte Inter com subset `latin-ext` extra e dois arquivos estáticos (300 + 700).
- JSON-LD da home injetado em todas as rotas.
- JS do globo e do quadro de mercado no bundle inicial da home.
- `PostPage` importado na home só para “esquentar” o chunk.
- Fundo da section de tecnologia ainda em PNG, apesar de existir WebP.

## O que foi feito

- Conversão das imagens pesadas para WebP redimensionado (de ~8 MB para ~0,5 MB nos arquivos tratados).
- Avatares de depoimento reduzidos para 96×96.
- Hero: poster como LCP; o vídeo só entra em conexão ok e com movimento permitido. Em 3G/2G/save-data fica só o poster.
- Barbatana do hero (`U4p7OneXSqlSqUjx2qEVzJYI8A.webp`, ~58 KB) permanece sempre visível — não entra no gate de conexão lenta.
- Prefetch de rotas só em conexão ok, e sob demanda (hover/toque), não no boot.
- Artigos do blog são páginas estáticas no servidor. O clique em “Read more” não passa por overlay de loading nem por `notFound()` no cliente.
- Fonte Inter variável (`latin` apenas) — um arquivo cobre 300 e 700.
- Cache longo para `/media`, estáticos e imagens.
- Headers de segurança leves (`nosniff`, referrer, DNS prefetch).
- `sizes` mais precisos nas imagens abaixo da dobra.
- Globo e MarketBoard em code-split **e** só montam perto da viewport.
- Fundo da section tecnologia em WebP com qualidade menor (já vai com blur).
- DNS-prefetch para `trade.shiverbroker.com`.

## Como validar

1. Chrome DevTools → Network → Fast 3G.
2. Home deve mostrar texto, CTA e a barbatana do tubarão. Vídeo, globo e quadro de mercado podem esperar.
3. Imagens abaixo da dobra devem chegar como WebP/AVIF, não PNG de 1 MB+.
4. No Wi‑Fi, o vídeo do hero continua tocando.
5. `npm run build` deve concluir sem erro; conferir o log do build antes de declarar que está no ar.
