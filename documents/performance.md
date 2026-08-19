# Performance — Shiver Broker

Atualizado em 19 de agosto de 2026.

O site foi ajustado para abrir de forma utilizável em 3G, Wi‑Fi e cabo, sem mudar o conteúdo visível.

## O que pesava

- Imagens PNG de depósito/VIP/payout com 1–2 MB cada.
- Vídeo do hero (`hero-bg.mp4`, ~517 KB) pré-carregado em qualquer conexão.
- Prefetch de todas as páginas do blog e dos termos no carregamento inicial.
- Fonte Inter com subset `latin-ext` extra.

## O que foi feito

- Conversão das imagens pesadas para WebP redimensionado (de ~8 MB para ~0,5 MB nos arquivos tratados).
- Avatares de depoimento reduzidos para 96×96.
- Hero: poster como LCP; o vídeo só entra em conexão ok e com movimento permitido. Em 3G/2G/save-data fica só o poster.
- Prefetch de rotas só em conexão ok, e sob demanda (hover/toque), não no boot.
- Fonte só com subset `latin` (suficiente para PT-BR).
- Cache longo para `/media`, estáticos e imagens.
- `sizes` mais precisos nas imagens abaixo da dobra.
- Globe e MarketBoard em code-split.

## Como validar

1. Chrome DevTools → Network → Fast 3G.
2. Home deve mostrar texto e CTA sem esperar o MP4.
3. Imagens abaixo da dobra devem chegar como WebP/AVIF, não PNG de 1 MB+.
4. No Wi‑Fi, o vídeo do hero continua tocando.
