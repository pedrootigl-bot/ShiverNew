# Performance — Shiver Broker

Atualizado em 21 de agosto de 2026 (hero: poster primeiro, motion depois).

O site foi ajustado para abrir de forma utilizável em 3G, Wi‑Fi e cabo, sem mudar o conteúdo visível. Em 21/08 o scroll da home estava levemente lagado: o GPU acumulava dezenas de `backdrop-filter` e vários contextos WebGL a 60 fps.

## O que pesava

- Imagens PNG de depósito/VIP/payout com 1–2 MB cada.
- Texturas da órbita 3D em PNG (`trading-orbit-phone.png` ~1,4 MB e `trading-orbit-hand.png` ~1,2 MB).
- Vídeo do hero (`hero-bg.mp4`, ~517 KB) no `public`, sem uso no hero atual (MoltenMetal).
- Prefetch de todas as páginas do blog e dos termos no carregamento inicial.
- Fonte Inter com subset `latin-ext` extra e dois arquivos estáticos (300 + 700).
- JSON-LD da home injetado em todas as rotas.
- JS do globo e do quadro de mercado no bundle inicial da home.
- `PostPage` importado na home só para “esquentar” o chunk.
- Fundo da section de tecnologia ainda em PNG, apesar de existir WebP.
- GradualBlur da seção de mercado: 4 overlays com 5–7 camadas de `backdrop-filter` cada (20+ blurs cobrindo a viewport) + `filter: blur()` em todo frame de scroll.
- Cada CTA SpecularButton com WebGL2 a 60 fps e `pointermove` global (header sempre ocupava 2 contextos).
- MoltenMetal, órbita 3D e botões renderizando fora da tela ou com DPR alto.

## O que foi feito

- Section “premium no bolso”: poster do celular imediato; Three.js só ~500px antes da viewport; crossfade 600ms. Mobile sem partículas/2º anel, sem cortina, texto acima do visual.
- Hero: poster estático imediato (cores do MoltenMetal). O shader só baixa depois de `window.load` + ~1s, e só se o hero ainda estiver visível. Crossfade 600ms. `saveData` / 2G / reduced-motion ficam só no poster. 3G espera mais (~1,8s).
- CTAs sem WebGL: o `ogl` saiu do JS inicial (header/home/footer). O brilho do botão é CSS no hover. O metal do hero continua em chunk à parte.
- GSAP / ScrollTrigger do overlay hero → clareza só baixam depois do primeiro paint.
- Lenis entra por `import()` no idle, não no bundle do layout.
- Globo de ativos em chunk separado (`next/dynamic`), como a órbita 3D, e só monta ~180px antes da seção.
- Quadro de mercado para de atualizar preços fora da tela. Warmup da home não pré-baixa mais as texturas da órbita.
- No celular, a seção de mercado não aplica `filter: blur` por elemento (só o overlay de borda).
- Seções estáticas abaixo da dobra usam `content-visibility: auto` (exceto ScrollExpand, mercado, órbita, VIP e depósito/saque — o auto nessas duas últimas montava layout + imagens + reveal no mesmo frame e travava o scroll).
- Reveal toca uma vez e permanece. Passar de novo em VIP/pagamento não zera opacity nem dispara outra onda de paint.
- VIP: hexagons só animam depois do reveal; pagamento troca `filter: drop-shadow` por `box-shadow`. Globo 3D só monta ~40px antes da seção, não no meio do bloco de saque.
- Conversão das imagens pesadas para WebP redimensionado (de ~8 MB para ~0,5 MB nos arquivos tratados).
- Órbita, tubarões e notebook convertidos para WebP qualidade 80–82: ~2,7 MB → ~186 KB no download dessas quatro peças.
- Arquivos de mídia não referenciados (incluindo `hero-bg.mp4`) removidos de `public/media` (~1,7 MB a menos no deploy).
- Seção de tecnologia: só a órbita 3D; o `<video>` apontava para um MP4 inexistente e gerava 404.
- Avatares de depoimento reduzidos para 96×96.
- Hero: a print `preloader-fin.png` cobre a tela até o GSAP; a barbatana recortada (`U4p7OneXSqlSqUjx2qEVzJYI8A.webp`) só entra na cena depois. Sem poster azul no primeiro paint.
- Prefetch de rotas só em conexão ok, e sob demanda (hover/toque), não no boot.
- Artigos do blog são páginas estáticas no servidor. O clique em “Read more” não passa por overlay de loading nem por `notFound()` no cliente.
- Fonte Inter variável (`latin` apenas) — um arquivo cobre 300 e 700.
- Cache longo para `/media`, estáticos e imagens.
- Headers de segurança leves (`nosniff`, referrer, DNS prefetch).
- `sizes` mais precisos nas imagens abaixo da dobra.
- Globo e órbita 3D só montam perto da viewport. O quadro de mercado ficou num módulo cliente único (`MarketPreview`), sem chunk webpack à parte — o split dinâmico gerava `undefined.call` no scroll.
- Fundo da section tecnologia em WebP com qualidade menor (já vai com blur).
- DNS-prefetch para `trade.shiverbroker.com`.
- Overlay de mercado: 2 faixas CSS com um `backdrop-filter` cada (em vez de ~23 camadas). Itens param de atualizar o blur depois de nítidos.
- Carrossel de ativos: máscara CSS, sem GradualBlur.
- SpecularButton WebGL permanece no repositório, mas os CTAs do site não o importam.
- MoltenMetal e órbita 3D: 30 fps, DPR limitado, pausa fora da tela / aba oculta; grain do hero desligado.
- Menos `backdrop-filter` em header, cards e botões.
- CTAs passaram a CSS puro (sem WebGL/`ogl` no bundle da home, fora do efeito de metal).
- Framer Motion saiu do reveal da seção de tecnologia (CSS).
- Overlay de mercado sem `backdrop-filter`; ScrollExpand só calcula progresso perto da seção.
- Reveal: toca uma vez e permanece. Sem `filter`/`clip-path`/scale no GPU; seção de tecnologia sem zoom no wrapper 3D.
- VIP sem replay de animação a cada volta no viewport.
- Hero: MoltenMetal em chunk separado, desmonta ao sair da tela (libera GPU) e não liga em GPU software (SwiftShader). Canvas isolado no compositor.
- Resize do shader só quando o tamanho muda de fato.
- Primeira visita: Lenis, shader do hero e parallax só no idle; chunks (mercado, globo, órbita) e PNGs grandes pré-aquecidos enquanto o usuário ainda está no hero.
- Overlay hero → clareza: sticky + GSAP ScrollTrigger no scrub (sem pin), GSAP em chunk tardio. `filter: blur` só durante a transição (8px desktop / 3px mobile). `will-change` só com a cena ativa. `prefers-reduced-motion` desliga o overlay.
- Nova passagem de compressão (21/08): `public/` ficou em ~589 KB. Cards PNG 157 KB → WebP 15 KB. Covers do blog 1536px → 960px (~336 KB → ~166 KB). Texturas da órbita e VIP redimensionadas. Avatares JPG → WebP 96×96. Removidos `shark-tubaroes.webp` e um WebP de notebook sem uso. Não há vídeo em `public`.
- Órbita 3D volta a entrar só perto da seção (`next/dynamic`), para o Three.js não ir no JS inicial da home.

## Como melhorar sem perder qualidade

O visual fica o mesmo. O custo cai quando o efeito não está na tela, quando o JS não precisa no primeiro paint, e quando se testa o **build de produção** em vez do `next dev`.

1. Medir com `npm run build` e `npm start`. O `next dev` não representa o site no ar.
2. Manter efeitos 3D só enquanto a seção está visível (já no hero e na órbita).
3. Texturas da órbita já estão em WebP qualidade 80–82; não voltar para PNG.
4. Chrome → Shift+Esc: se `localhost` estiver alto em GPU, é o shader do hero, não o texto.

## Como validar

1. Chrome DevTools → Network → Fast 3G.
2. Home: primeiro quadro é a print `preloader-fin.png` (sem barbatana recortada nem fundo azul). Depois do GSAP entram texto, CTA e a barbatana da cena. Globo e quadro de mercado podem esperar.
3. Imagens abaixo da dobra devem chegar como WebP/AVIF, não PNG de 1 MB+.
4. No Wi‑Fi, o efeito MoltenMetal do hero pode ligar no idle; não há vídeo de fundo.
5. `npm run build` deve concluir sem erro; conferir o log do build antes de declarar que está no ar.
6. Scroll da home no Performance panel: menos tarefas de `backdrop-filter` e menos rAF contínuos fora da viewport.
