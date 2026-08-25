Shiver Broker


Este repositório é o site institucional da Shiver Broker, a corretora apresentada como “dos grandes tubarões”, com operação em forex, crypto e opções. Não é a plataforma de negociação em si: o cadastro, o login e a conta demo de dez mil dólares virtuais apontam para trade.shiverbroker.com. O que vive aqui é a vitrine pública em português, no ar em www.shiverbroker.com.

A home conta a marca em sequência: o hero com o efeito de metal líquido, a seção de clareza sobre leitura de mercado, o porquê da Shiver, o payout, o preview de ativos, o passo a passo, depósito e saque, o programa VIP e o convite para levar o mesmo nível premium no celular. No desktop, o hero e a seção de clareza se ligam por um overlay de scroll com GSAP. No celular esse overlay não entra: as duas partes ficam uma abaixo da outra, com scroll nativo, para a página avançar sem travar o toque. O Lenis, que suaviza o scroll no desktop, também fica desligado em tela de toque.

O blog traz artigos estáticos (opções binárias, se a corretora é confiável, o programa VIP e a jornada da demo ao primeiro saque), assinados por Helena Prado. A página Sobre explica quem opera a marca — Sun Wave LLC em Nevis, pagamentos pela S.W. SUN WAVE CY LTD em Chipre — e deixa explícito que não há autorização da CVM no Brasil. Os termos, a política de privacidade e os termos da África do Sul saem de markdown em /legal. Sitemap, robots, Open Graph e JSON-LD acompanham as rotas para indexação.

O stack é Next.js 15 com App Router, React 19 e TypeScript. O visual é CSS próprio, sem Tailwind e sem Framer Motion. O metal do hero usa OGL; o globo de ativos e a órbita 3D do app usam Three.js, montados só perto da viewport. Os CTAs são botões em CSS. Imagens e mídia ficam em public/media, com WebP, cache longo em produção e headers leves de segurança. Não há variáveis de ambiente obrigatórias: o conteúdo institucional está em lib/site.ts, o blog em lib/blog.ts e os textos legais em markdown.

Para rodar localmente, clone o repositório, instale as dependências com npm install e suba o ambiente de desenvolvimento com npm run dev (em geral em http://localhost:3000). O build de produção é npm run build seguido de npm start. Vale Node 18 ou superior. Medição de performance e Core Web Vitals deve ser feita nesse build, não no next dev.

Quem for publicar conteúdo novo precisa manter canonical, Open Graph e schema na página, não inventar nota agregada de avaliações e tratar depoimentos como clientes distintos. A plataforma de trade, os PDFs de política e o Search Console da propriedade https://www.shiverbroker.com ficam fora deste código.
