import Image from "next/image";
import type { Metadata } from "next";
import { ASSETS, PAY_METHODS, SITE, TESTIMONIALS_A, TESTIMONIALS_B } from "@/lib/site";
import { homeJsonLd, SEO } from "@/lib/seo";
import { HeroClarezaOverlay } from "@/components/HeroClarezaOverlay";
import { HeroStage } from "@/components/HeroStage";
import { JsonLd } from "@/components/JsonLd";
import { LazyAssetsGlobe } from "@/components/LazyAssetsGlobe";
import { MarketPreview } from "@/components/MarketPreview";
import { AppCopyReveal, AppMediaReveal, AppSec, AppSplit } from "@/components/AppSplitReveal";
import { CtaButton } from "@/components/CtaButton";
import { SectionScrollBlur } from "@/components/SectionScrollBlur";
import { ScrollExpand } from "@/components/ScrollExpand";
import { AssetLogo } from "@/components/AssetLogo";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";

export const metadata: Metadata = {
  title: { absolute: SEO.titleHome },
  description: SEO.description,
  keywords: [...SEO.keywords],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Shiver Broker",
    title: SEO.titleHome,
    description: SEO.description,
    url: SITE.url,
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleHome,
    description: SEO.description,
    images: [SEO.ogImage.url],
  },
};

function Stars({ value, uid }: { value: 4 | 4.5 | 5; uid: string }) {
  const label = Number.isInteger(value) ? `${value} de 5 estrelas` : `${String(value).replace(".", ",")} de 5 estrelas`;
  return (
    <div className="review-stars" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = value >= n ? 1 : value >= n - 0.5 ? 0.5 : 0;
        const halfId = `star-half-${uid}-${n}`;
        return (
          <svg key={n} viewBox="0 0 20 20" aria-hidden>
            {fill === 0.5 ? (
              <defs>
                <linearGradient id={halfId} x1="0" x2="1">
                  <stop offset="50%" stopColor="#f5c842" />
                  <stop offset="50%" stopColor="rgba(245, 200, 66, 0.22)" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              d="M10 1.8 12.4 7l5.6.8-4 3.9.9 5.6L10 14.8 4.1 17.3l.9-5.6-4-3.9L6.6 7 10 1.8Z"
              fill={fill === 1 ? "#f5c842" : fill === 0.5 ? `url(#${halfId})` : "rgba(245, 200, 66, 0.22)"}
            />
          </svg>
        );
      })}
    </div>
  );
}

function Review({
  t,
  uid,
  duplicate = false,
}: {
  t: { quote: string; name: string; date: string; photo: string; stars: 4 | 4.5 | 5 };
  uid: string;
  duplicate?: boolean;
}) {
  return (
    <article className="review" aria-hidden={duplicate || undefined}>
      <Stars value={t.stars} uid={uid} />
      <p>“{t.quote}”</p>
      <footer>
        <Image src={t.photo} alt={duplicate ? "" : t.name} width={48} height={48} quality={70} sizes="48px" loading="lazy" />
        <div>
          <strong>{t.name}</strong>
          <small>{t.date}</small>
        </div>
      </footer>
    </article>
  );
}

function assetSparkPath(ticker: string, up: boolean) {
  let hash = 2166136261;
  for (let i = 0; i < ticker.length; i += 1) hash = Math.imul(hash ^ ticker.charCodeAt(i), 16777619);
  const count = 14;
  const values: number[] = [];
  let value = 10;
  for (let i = 0; i < count; i += 1) {
    hash = Math.imul(hash, 1664525) + 1013904223;
    value += ((hash >>> 8) % 13) / 10 - 0.45;
    values.push(value);
  }
  if (up && values[count - 1] < values[0]) values.reverse();
  if (!up && values[count - 1] > values[0]) values.reverse();
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  const width = 64;
  const height = 28;
  const points = values.map((item, i) => {
    const x = (i / (count - 1)) * width;
    const y = height - 3 - ((item - min) / span) * (height - 6);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  const line = points.join(" ");
  return { line, area: `${line} L${width} ${height} L0 ${height} Z` };
}

function AssetSpark({ ticker, up, uid }: { ticker: string; up: boolean; uid: string }) {
  const spark = assetSparkPath(ticker, up);
  const color = up ? "#7dffb0" : "#ff7a88";
  const fill = `spark-fill-${uid}`;
  return (
    <svg className="asset-spark" viewBox="0 0 64 28" aria-hidden>
      <defs>
        <linearGradient id={fill} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={spark.area} fill={`url(#${fill})`} />
      <path d={spark.line} fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function AssetCarousel({
  items,
  reverse,
}: {
  items: readonly (typeof ASSETS)[number][];
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="asset-carousel">
      <div className={`asset-carousel-track${reverse ? " rev" : ""}`}>
        {row.map((asset, i) => {
          const up = asset.change >= 0;
          const sign = up ? "+" : "";
          return (
            <article
              className={`market-asset-chip${up ? " is-up" : " is-dn"}`}
              key={`${asset.ticker}-${i}`}
              aria-hidden={i >= items.length || undefined}
            >
              <span className="tick-logo">
                <AssetLogo ticker={asset.ticker} />
              </span>
              <span>
                <b>{asset.name}</b>
                <small>
                  {sign}
                  {asset.change.toFixed(2)}%
                </small>
              </span>
              <AssetSpark ticker={asset.ticker} up={up} uid={`${asset.ticker}-${i}`} />
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Marquee({
  items,
  reverse,
}: {
  items: typeof TESTIMONIALS_A | typeof TESTIMONIALS_B;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="review-marquee">
      <div className={`ticker-track ${reverse ? "rev" : ""}`}>
        {row.map((t, i) => (
          <Review key={`${t.name}-${t.date}-${i}`} t={t} uid={`r${i}`} duplicate={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Suporte 24/7",
    text: "Quando o mercado não dorme, a fila também não deveria existir. Gerentes prontos para quem está operando agora.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-2v-6h4M4 18h4v-6H4" />
      </svg>
    ),
  },
  {
    title: "Depósito e saque",
    text: "Mais de 9 métodos. Entra rápido, sai rápido. Liquidez para quem não espera o sistema processar depois.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Execução rápida",
    text: "Payout aparece, o atraso come o resultado. A Shiver foi feita para executar — não para carregar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
      </svg>
    ),
  },
  {
    title: "Liquidez global",
    text: "Opere de qualquer lugar, nos ativos que o mercado está pedindo hoje. O fluxo não espera o fuso horário.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9Z" />
      </svg>
    ),
  },
];

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <link rel="preload" as="image" href="/media/preloader-fin.png" fetchPriority="high" />
      <JsonLd data={homeJsonLd()} />
      <HeroClarezaOverlay
        hero={<HeroStage overlayDriven />}
        panel={
          <div className="wrap">
            <RevealGroup className="matter-grid">
              <Reveal variant="left">
                <div className="matter-copy">
                  <h2 id="titulo-corretora">
                    Tecnologia para ler o mercado com <span className="accent">clareza</span>
                  </h2>
                  <p className="lead">
                    Dados em tempo real, algoritmos proprietários e uma interface intuitiva para transformar informação em
                    decisão. Mais performance, menos ruído, mais confiança.
                  </p>
                  <CtaButton href={SITE.trade.register} className="matter-cta">
                    Quero operar na Shiver <span aria-hidden>→</span>
                  </CtaButton>
                  <ul className="matter-points">
                    <li>
                      <span className="matter-point-ico" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M3 12h4l2.2-6 3.6 12 2.2-6H21" />
                        </svg>
                      </span>
                      Leitura em tempo real
                    </li>
                    <li>
                      <span className="matter-point-ico" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
                        </svg>
                      </span>
                      Execução rápida
                    </li>
                    <li>
                      <span className="matter-point-ico" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <circle cx="12" cy="12" r="8" />
                          <circle cx="12" cy="12" r="2.4" />
                          <path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20" />
                        </svg>
                      </span>
                      Análise objetiva
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal variant="scale">
                <div className="matter-visual">
                  <div className="clareza-overlay__cards" data-overlay-cards>
                    <Image
                      className="matter-cards"
                      src="/media/matter-cards.webp"
                      alt="Latência média 8,7 ms, uptime 99,99% e performance acumulada de 27,34% no ano"
                      width={577}
                      height={433}
                      quality={80}
                      sizes="(max-width: 900px) 88vw, 560px"
                    />
                  </div>
                </div>
              </Reveal>
            </RevealGroup>
          </div>
        }
      />

      <div className="site-rest">

      <section className="section" id="parceiros">
        <div className="wrap">
          <RevealGroup>
            <Reveal variant="blur">
              <div className="sec-head">
                <h2>
                  Por que a <span className="accent">Shiver?</span>
                </h2>
                <p className="lead">
                  Não é para quem opera de vez em quando. É para quem quer as mesmas armas de quem já está no topo.
                </p>
              </div>
            </Reveal>
            <div className="feature-grid">
              {FEATURES.map((item, i) => (
                <Reveal key={item.title} variant="rise" delay={i * 120}>
                  <article className="feature-card hover-lift">
                    <span className="feature-ico">{item.icon}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="section sec-1" aria-label="Plataforma no notebook">
        <ScrollExpand
          src="/media/shiver-platform-notebook.webp?v=2"
          alt="Plataforma da Shiver Broker no notebook"
          title="A plataforma"
          scrollHint="Role"
          useWindowScroll
          startWidth={64}
          startHeight={38}
          startRadius={18}
          endRadius={0}
          mediaZoom={1.06}
          scrollDistance={0.48}
          holdDistance={0.1}
          smoothing={0.055}
        >
          <h2>Gráfico, ordem e payout no mesmo lugar</h2>
          <p>A tela que o trader destaque não empresta. Abra e opere.</p>
          <CtaButton href={SITE.trade.register} size="lg" tone="blue">
            Ver a plataforma <span aria-hidden>→</span>
          </CtaButton>
        </ScrollExpand>
      </section>

      <section className="section payout">
        <div className="wrap">
          <RevealGroup className="payout-grid">
            <Reveal variant="up" className="payout-shot-cell">
              <div className="payout-shot">
                <img
                  className="payout-shot__media"
                  src="/media/payout-trader.webp"
                  alt="Visão do mercado de ativos na Shiver Broker"
                  width={720}
                  height={960}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <div className="payout-right">
              <Reveal variant="right" className="payout-copy-cell">
                <div className="payout-copy">
                  <span className="payout-badge">Até 97% de payout em crypto</span>
                  <h2 className="payout-title">
                    <span>O payout que o mercado</span>
                    <span>comum não entrega.</span>
                    <span className="accent">Acesso aberto agora.</span>
                  </h2>
                  <p>
                    Mais de 392 ativos em forex, binárias, blitz e crypto. Enquanto proliferam corretoras iguais, quem busca
                    payout alto e execução limpa vem para a Shiver. Abra a conta e veja o que os outros só comentam.
                  </p>
                </div>
              </Reveal>
              <Reveal variant="up" className="payout-cta-cell">
                <CtaButton href={SITE.trade.register}>
                  Quero esse acesso <span aria-hidden>→</span>
                </CtaButton>
              </Reveal>
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="section market-sec" id="mercado" aria-labelledby="titulo-mercado">
        <SectionScrollBlur sectionId="mercado" />
        <div className="wrap">
          <RevealGroup>
            <Reveal className="market-layout">
            <div className="market-copy-cell">
              <article className="market-copy-card">
                <span className="payout-badge" data-unblur>
                  Gráfico, ordem e payout
                </span>
                <h2 id="titulo-mercado" data-unblur>
                  A plataforma que o trader destaque não <span className="accent">empresta</span>
                </h2>
                <p className="lead" data-unblur>
                  Gráfico, ordem e resultado no mesmo lugar. Rápida o suficiente para quem disputa o milissegundo — e clara
                  o bastante para você querer abrir a próxima operação agora.
                </p>
                <div className="asset-carousel-stack" aria-label="Ações em destaque" data-unblur>
                  <AssetCarousel items={ASSETS.slice(0, 6)} />
                  <AssetCarousel items={ASSETS.slice(6)} reverse />
                </div>
                <div className="market-actions" data-unblur>
                  <CtaButton href={SITE.trade.register}>
                    Quero esse acesso <span aria-hidden>→</span>
                  </CtaButton>
                  <CtaButton href={SITE.trade.trial}>
                    Testar com $10.000
                  </CtaButton>
                </div>
              </article>
            </div>
            <div className="market-chart-cell" data-unblur>
              <div className="market-chart-blur">
                <MarketPreview />
              </div>
            </div>
          </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section vip-sec">
        <div className="vip-block">
          <RevealGroup>
            <div className="wrap">
              <Reveal variant="blur">
                <div className="vip-head">
                  <h2>
                    VIP não é status. É fila <span className="accent">preferencial</span>
                  </h2>
                  <p className="lead">
                    <em>A conta padrão vê o mercado. O VIP opera na frente dele.</em> A.I Financial™, saque prioritário e o
                    que o restante da plataforma ainda não mostra.{" "}
                    <em>A demanda sobe. As vantagens não são iguais para todo mundo.</em>
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="vip-board">
                <div className="vip-col">
                  {[
                    "A.I Financial™ na operação — o que a conta comum ainda não vê.",
                    "Cupons e condições que não aparecem no cadastro padrão",
                    "Premiações presenciais para quem já saiu da média",
                  ].map((text, i) => (
                    <Reveal key={text} delay={i * 80}>
                      <article className="vip-box">{text}</article>
                    </Reveal>
                  ))}
                </div>
                <Reveal variant="scale" delay={180} className="vip-core-cell">
                  <div className="vip-core">
                    <Image className="hex hex-a" src="/media/z1qu5QGdoqssEJK9ggQKiA2isxo.webp" alt="Shiver Broker VIP" width={480} height={533} quality={65} sizes="(max-width: 900px) 70vw, 280px" style={{ height: "auto" }} loading="lazy" decoding="async" />
                    <Image className="hex hex-b" src="/media/Gw34m89DNsQ1R91V50KCkXAr3Q.webp" alt="Seja VIP" width={480} height={539} quality={65} sizes="(max-width: 900px) 50vw, 180px" style={{ height: "auto" }} loading="lazy" decoding="async" />
                  </div>
                </Reveal>
                <div className="vip-col vip-col-right">
                  {[
                    "Ativos e modalidades liberados para quem performa mais",
                    "Suporte gerenciado: você não entra na fila geral",
                    "Saques com prioridade, limite e ritmo de quem opera pesado",
                  ].map((text, i) => (
                    <Reveal key={text} delay={i * 80}>
                      <article className="vip-box">{text}</article>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={240} className="vip-cta">
                  <CtaButton href={SITE.trade.trial}>
                    Quero as vantagens VIP <span aria-hidden>→</span>
                  </CtaButton>
                </Reveal>
              </div>
          </RevealGroup>
        </div>
      </section>



      <section className="section" id="comofunciona">
        <div className="wrap">
          <RevealGroup>
            <Reveal variant="left">
              <h2>
                Três passos. O mercado não espera o <span className="accent">quarto</span>
              </h2>
            </Reveal>
            <div className="steps">
              {[
                ["01", "Crie a conta em minutos", "Gratuito. Sem burocracia para abrir a plataforma e ver o que está do lado de dentro."],
                ["02", "Deposite quando quiser", "Mais de 9 métodos. Entre com a banca que cabe em você — a vaga na Shiver já é sua."],
                ["03", "Opere onde o payout está", "380+ ativos e ferramentas que quem só assiste de fora não usa. A demanda está na tela."],
              ].map(([n, title, text], i) => (
                <Reveal key={n} delay={i * 120}>
                  <article className="card hover-lift">
                    <div className="step-n">{n}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="app-cta">
              <CtaButton href={SITE.trade.register}>
                Criar minha conta <span aria-hidden>→</span>
              </CtaButton>
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="section pay-sec" id="liquidez" aria-labelledby="titulo-liquidez">
        <div className="wrap">
          <RevealGroup>
            <div className="pay-grid">
              <Reveal variant="left">
                <div className="pay-copy">
                  <p className="kicker">Depósito e saque</p>
                  <h2 id="titulo-liquidez">
                    O dinheiro entra. O dinheiro sai. Sem <span className="accent">teatro</span>
                  </h2>
                  <p className="lead">
                    Mais de 9 métodos. Os depoimentos falam de saque que cai; aqui você vê o caminho — crypto, cartão e
                    internacional. O método liberado aparece na sua conta depois do cadastro.
                  </p>
                  <CtaButton href={SITE.trade.register}>
                    Quero depositar do meu jeito <span aria-hidden>→</span>
                  </CtaButton>
                </div>
              </Reveal>
              <Reveal variant="clip">
                <div className="pay-hero">
                  <Image
                    src="/media/pay-hero.webp"
                    alt="Ilustração de saque na plataforma Shiver Broker"
                    width={960}
                    height={640}
                    quality={70}
                    sizes="(max-width: 1100px) 100vw, 48vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>
            <div className="pay-methods">
              {PAY_METHODS.map((method) => (
                <Reveal key={method.name} delay={80}>
                  <article className="pay-method hover-lift">
                    <Image
                      src={method.image}
                      alt={`Depósito via ${method.name} na Shiver Broker`}
                      width={400}
                      height={400}
                      quality={65}
                      sizes="(max-width: 720px) 70vw, 180px"
                      loading="lazy"
                      decoding="async"
                    />
                    <h3>{method.name}</h3>
                    <p>{method.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal variant="blur">
              <p className="pay-chips">Boleto · Stablecoins · TED · e outros métodos na plataforma</p>
              <p className="pay-note">Imagens ilustrativas de marketing. Os métodos disponíveis dependem da conta e da verificação.</p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section globe-sec">
        <div className="wrap">
          <RevealGroup className="globe-layout">
            <Reveal className="globe-layout-globe" variant="scale">
              <LazyAssetsGlobe />
            </Reveal>
            <Reveal className="globe-layout-copy" variant="right">
              <h2>
                230+ ativos globais. A demanda do mundo, na sua <span className="accent">tela</span>
              </h2>
              <p className="lead">
                Forex, crypto e opções digitais. Compre ou venda no fluxo que o mercado está pagando hoje — não no que a
                corretora genérica libera amanhã. Abra a plataforma e escolha o ativo.
              </p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <AppSec>
        <AppSplit>
          <AppCopyReveal>
              <div className="app-head">
                <h2>
                  Leve o mesmo nível premium para o bolso. O mercado não fica no <span className="accent">desktop</span>
                </h2>
              </div>
              <p className="lead">
                A mesma execução, os mesmos mercados e a mesma proteção — agora no celular. Sem perder o ritmo de quem já opera no desktop.
              </p>
              <ul className="matter-points">
                <li>
                  <span className="matter-point-ico" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M12 3 5 6.5v5.2c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V6.5L12 3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  Plataforma segura
                </li>
                <li>
                  <span className="matter-point-ico" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
                    </svg>
                  </span>
                  Execução instantânea
                </li>
                <li>
                  <span className="matter-point-ico" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
                    </svg>
                  </span>
                  Trading direto
                </li>
                <li>
                  <span className="matter-point-ico" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9Z" />
                    </svg>
                  </span>
                  Mercados globais
                </li>
              </ul>
          </AppCopyReveal>
          <AppMediaReveal />
          <div className="app-cta">
            <CtaButton href={SITE.trade.trial} size="lg" tone="blue">
              Testar na plataforma <span aria-hidden>→</span>
            </CtaButton>
            <CtaButton href={SITE.trade.login} size="lg">
              Já tenho conta
            </CtaButton>
          </div>
        </AppSplit>
      </AppSec>

      <section className="section cta-journey" aria-labelledby="cta-journey-title">
        <div className="wrap">
          <RevealGroup className="cta-journey-inner">
            <Reveal variant="left" className="cta-journey-pills">
              <div className="cta-pills">
                {[
                  "Vantagens desde o primeiro trade",
                  "Exclusividade e domínio na palma da mão",
                  "A forma mais rápida de negociar ativos",
                  "A corretora mais lucrativa do mercado",
                ].map((text) => (
                  <article key={text} className="cta-pill">
                    <span className="cta-pill-check" aria-hidden>
                      <svg viewBox="0 0 20 20">
                        <path d="M5 10.2 8.2 13.5 15 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" className="cta-journey-title">
              <h2 id="cta-journey-title">
                Seja o trader que trilha a jornada premium com <span className="accent">eficiência</span>
              </h2>
            </Reveal>
            <Reveal variant="right" className="cta-journey-actions-wrap">
              <div className="cta-journey-actions">
                <CtaButton href={SITE.trade.trial} size="lg" tone="blue">
                  Testar grátis <span aria-hidden>→</span>
                </CtaButton>
                <CtaButton href={SITE.trade.login} size="lg">
                  Entrar
                </CtaButton>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section reviews-sec">
        <RevealGroup>
          <div className="wrap">
            <Reveal variant="left">
              <h2>
                Eles pararam de procurar outra <span className="accent">corretora</span>
              </h2>
            </Reveal>
          </div>
          <Marquee items={TESTIMONIALS_A} />
          <Marquee items={TESTIMONIALS_B} reverse />
        </RevealGroup>
      </section>
      </div>
    </>
  );
}
