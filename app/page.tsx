import Image from "next/image";
import nextDynamic from "next/dynamic";
import type { Metadata } from "next";
import { ASSETS, PAY_METHODS, SITE, TESTIMONIALS_A, TESTIMONIALS_B } from "@/lib/site";
import { SEO } from "@/lib/seo";
import { HeroStage } from "@/components/HeroStage";
import { BlurTitle } from "@/components/BlurTitle";
import { AssetLogo } from "@/components/AssetLogo";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";

const LaptopStage = nextDynamic(
  () => import("@/components/LaptopStage").then((mod) => ({ default: mod.LaptopStage })),
  { ssr: true },
);
const AssetsGlobe = nextDynamic(
  () => import("@/components/AssetsGlobe").then((mod) => ({ default: mod.AssetsGlobe })),
  { ssr: true },
);
const MarketBoard = nextDynamic(
  () => import("@/components/MarketBoard").then((mod) => ({ default: mod.MarketBoard })),
  { ssr: true },
);

export const metadata: Metadata = {
  title: { absolute: SEO.titleHome },
  description: SEO.description,
  keywords: [...SEO.keywords],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: SEO.titleHome,
    description: SEO.description,
    url: SITE.url,
    images: [SEO.ogImage],
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
}: {
  t: { quote: string; name: string; date: string; photo: string; stars: 4 | 4.5 | 5 };
  uid: string;
}) {
  return (
    <article className="review">
      <Stars value={t.stars} uid={uid} />
      <p>“{t.quote}”</p>
      <footer>
        <Image src={t.photo} alt="" width={48} height={48} loading="lazy" />
        <div>
          <strong>{t.name}</strong>
          <small>{t.date}</small>
        </div>
      </footer>
    </article>
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
          <Review key={`${t.name}-${t.date}-${i}`} t={t} uid={`r${i}`} />
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <section className="section sec-1" id="plataforma" aria-labelledby="titulo-corretora">
        <RevealGroup>
          <div className="wrap sec-1-head">
            <BlurTitle text="A Corretora dos Grandes Tubarões" />
            <Reveal variant="blur">
              <p className="lead">
                A Shiver foi construída para quem exige performance, velocidade e controle absoluto nas operações. A
                única com tecnologia avançada, confiança gráfica e vantagens diárias. Aqui, você não apenas opera. Você
                evolui.
              </p>
            </Reveal>
          </div>
          <div className="sec-1-stage">
            <div className="sec-1-arc-wrap" aria-hidden>
              <div className="sec-1-arc" />
            </div>
            <LaptopStage />
          </div>
        </RevealGroup>
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
                    <span>Acesso aberto agora.</span>
                  </h2>
                  <p>
                    Mais de 392 ativos em forex, binárias, blitz e crypto. Enquanto proliferam corretoras iguais, quem busca
                    payout alto e execução limpa vem para a Shiver. Abra a conta e veja o que os outros só comentam.
                  </p>
                </div>
              </Reveal>
              <Reveal variant="up" className="payout-cta-cell">
                <a className="btn btn-cta" href={SITE.trade.register}>
                  Quero esse acesso <span aria-hidden>→</span>
                </a>
              </Reveal>
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="section eco-sec" id="parceiros">
        <div className="wrap">
          <RevealGroup>
            <Reveal variant="rise">
              <div className="eco-head">
                <h2>O ecossistema que os predadores escolhem</h2>
                <p className="lead">
                  Não é para quem opera de vez em quando. É para quem quer as mesmas armas de quem já está no topo — e não
                  pretende ficar na fila da próxima oportunidade.
                </p>
              </div>
            </Reveal>
            <div className="grid-4 eco">
              {[
                ["Suporte 24/7 de verdade", "Quando o mercado não dorme, a fila também não deveria existir. Gerentes prontos para quem está operando agora."],
                ["Depósito e saque no seu ritmo", "Mais de 9 métodos. Entra rápido, sai rápido. Liquidez para quem não espera o sistema “processar depois”."],
                ["Velocidade que o segundo decide", "Payout aparece, o atraso come o resultado. A Shiver foi feita para executar — não para carregar."],
                ["Liquidez global, demanda real", "Opere de qualquer lugar, nos ativos que o mercado está pedindo hoje. O fluxo não espera o fuso horário."],
              ].map(([title, text], i) => (
                <Reveal
                  key={title}
                  solo
                  variant="rise"
                  delay={i * 220}
                  enterRatio={0.22}
                  rootMargin="0px 0px -16% 0px"
                >
                  <article className="card hover-lift">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      <section className="section vip-sec" id="vip">
        <div className="vip-block">
          <RevealGroup>
            <div className="wrap">
              <Reveal variant="blur">
                <div className="vip-head">
                  <h2>VIP não é status. É fila preferencial.</h2>
                  <p className="lead">
                    <em>A conta padrão vê o mercado. O VIP opera na frente dele.</em> A.I Financial™, saque prioritário e o
                    que o restante da plataforma ainda não mostra.{" "}
                    <em>A demanda sobe. As vantagens não são iguais para todo mundo.</em>
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal variant="scale">
              <div className="vip-board">
                <div className="vip-col">
                  <article className="vip-box">A.I Financial™ na operação — o que a conta comum ainda não vê.</article>
                  <article className="vip-box">Cupons e condições que não aparecem no cadastro padrão</article>
                  <article className="vip-box">Premiações presenciais para quem já saiu da média</article>
                </div>
                <div className="vip-core">
                  <Image className="hex hex-a" src="/media/z1qu5QGdoqssEJK9ggQKiA2isxo.webp" alt="Shiver Broker VIP" width={420} height={420} quality={65} sizes="(max-width: 900px) 70vw, 280px" loading="lazy" />
                  <Image className="hex hex-b" src="/media/Gw34m89DNsQ1R91V50KCkXAr3Q.webp" alt="Seja VIP" width={280} height={280} quality={65} sizes="(max-width: 900px) 50vw, 180px" loading="lazy" />
                </div>
                <div className="vip-col vip-col-right">
                  <article className="vip-box">Ativos e modalidades liberados para quem performa mais</article>
                  <article className="vip-box">Suporte gerenciado: você não entra na fila geral</article>
                  <article className="vip-box">Saques com prioridade, limite e ritmo de quem opera pesado</article>
                </div>
                <div className="vip-cta">
                  <a className="btn btn-white" href={SITE.trade.trial}>
                    Quero as vantagens VIP <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>



      <section className="section" id="comofunciona">
        <div className="wrap">
          <RevealGroup>
            <Reveal variant="left">
              <h2>Três passos. O mercado não espera o quarto.</h2>
            </Reveal>
            <div className="steps">
              {[
                ["01", "Crie a conta em minutos", "Gratuito. Sem burocracia para abrir a plataforma e ver o que está do lado de dentro."],
                ["02", "Deposite quando quiser", "Mais de 9 métodos. Entre com a banca que cabe em você — a vaga na Shiver já é sua."],
                ["03", "Opere onde o payout está", "380+ ativos e ferramentas que quem só assiste de fora não usa. A demanda está na tela."],
              ].map(([n, title, text], i) => (
                <Reveal key={n} variant="rise" delay={i * 520}>
                  <article className="card hover-lift">
                    <div className="step-n">{n}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="app-cta">
              <a className="btn btn-cta" href={SITE.trade.register}>
                Criar minha conta <span aria-hidden>→</span>
              </a>
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
                  <h2 id="titulo-liquidez">O dinheiro entra. O dinheiro sai. Sem teatro.</h2>
                  <p className="lead">
                    Mais de 9 métodos. Os depoimentos falam de saque que cai; aqui você vê o caminho — crypto, cartão e
                    internacional. O método liberado aparece na sua conta depois do cadastro.
                  </p>
                  <a className="btn btn-cta" href={SITE.trade.register}>
                    Quero depositar do meu jeito <span aria-hidden>→</span>
                  </a>
                </div>
              </Reveal>
              <Reveal variant="clip">
                <div className="pay-hero">
                  <Image
                    src="/media/pay-hero.webp"
                    alt="Ilustração de saque na plataforma Shiver Broker"
                    width={1200}
                    height={675}
                    quality={60}
                    sizes="(max-width: 1100px) 100vw, 48vw"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
            <div className="pay-methods">
              {PAY_METHODS.map((method) => (
                <Reveal
                  key={method.name}
                  solo
                  variant="rise"
                  enterRatio={0.28}
                  rootMargin="0px 0px -22% 0px"
                >
                  <article className="pay-method hover-lift">
                    <Image
                      src={method.image}
                      alt=""
                      width={400}
                      height={400}
                      quality={65}
                      sizes="(max-width: 720px) 70vw, 180px"
                      loading="lazy"
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

      <section className="section market-sec" id="mercado" aria-labelledby="titulo-mercado">
        <div className="wrap">
          <RevealGroup className="market-layout">
            <Reveal variant="right" className="market-copy-cell">
              <article className="market-copy-card">
                <span className="payout-badge">Gráfico, ordem e payout</span>
                <h2 id="titulo-mercado">A plataforma que o trader destaque não empresta.</h2>
                <p className="lead">
                  Gráfico, ordem e resultado no mesmo lugar. Rápida o suficiente para quem disputa o milissegundo — e clara
                  o bastante para você querer abrir a próxima operação agora.
                </p>
                <ul className="market-legend" aria-label="Legenda do gráfico">
                  <li>
                    <i className="lg-up" aria-hidden />
                    Alta nas últimas 24h
                  </li>
                  <li>
                    <i className="lg-dn" aria-hidden />
                    Queda nas últimas 24h
                  </li>
                  <li>
                    <i className="lg-pay" aria-hidden />
                    Payout em evidência
                  </li>
                </ul>
                <div className="market-asset-legend" aria-label="Ativos com payout em evidência">
                  {ASSETS.slice(0, 6).map((asset) => (
                    <div className="market-asset-chip" key={asset.ticker}>
                      <span className="tick-logo">
                        <AssetLogo ticker={asset.ticker} />
                      </span>
                      <span>
                        <b>{asset.name}</b>
                        <small>{asset.payout}</small>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="market-actions">
                  <a className="btn btn-cta" href={SITE.trade.register}>
                    Quero esse acesso <span aria-hidden>→</span>
                  </a>
                  <a className="btn btn-ghost" href={SITE.trade.trial}>
                    Testar com $10.000
                  </a>
                </div>
              </article>
            </Reveal>
            <Reveal variant="tilt" className="market-chart-cell">
              <MarketBoard />
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section globe-sec">
        <div className="wrap">
          <RevealGroup className="globe-layout">
            <Reveal className="globe-layout-globe" variant="scale">
              <AssetsGlobe />
            </Reveal>
            <Reveal className="globe-layout-copy" variant="right">
              <h2>230+ ativos globais. A demanda do mundo, na sua tela.</h2>
              <p className="lead">
                Forex, crypto e opções digitais. Compre ou venda no fluxo que o mercado está pagando hoje — não no que a
                corretora genérica libera amanhã. Abra a plataforma e escolha o ativo.
              </p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section app-sec" id="tecnologia">
        <div className="app-bg" aria-hidden>
          <Image
            src="/media/omy1oeY65x0sQauj2yrxvOOhMbc.png"
            alt=""
            fill
            quality={75}
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="app-mesh" aria-hidden />
        <div className="wrap">
          <RevealGroup>
            <Reveal variant="rise">
              <div className="app-head">
                <h2>Leve o mesmo nível premium para o bolso. O mercado não fica no desktop.</h2>
              </div>
            </Reveal>
            <Reveal variant="scale">
              <div className="phone-stage">
            <article className="glass-card gc-tl hover-lift">
              <span className="g-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M12 3 5 6.5v5.2c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V6.5L12 3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h3>Plataforma segura</h3>
              <p>Proteção para operar sem deixar a oportunidade na mesa.</p>
            </article>
            <article className="glass-card gc-bl hover-lift">
              <span className="g-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
                </svg>
              </span>
              <h3>Execução instantânea</h3>
              <p>Quando o segundo decide, atraso é deixar o payout para outro.</p>
            </article>
            <Image
              className="phone-center float-soft"
              src="/media/hFx1A5DWkIK1NNFwYsHEPjAUW0.webp"
              alt="Aplicativo Shiver Broker no celular"
              width={380}
              height={780}
              quality={70}
              sizes="(max-width: 900px) 70vw, 300px"
              loading="lazy"
            />
            <article className="glass-card gc-tr hover-lift">
              <span className="g-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
                </svg>
              </span>
              <h3>Trading direto</h3>
              <p>Menos cliques entre a ideia e a ordem. Abra e teste.</p>
            </article>
            <article className="glass-card gc-br hover-lift">
              <span className="g-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9Z" />
                </svg>
              </span>
              <h3>Mercados globais</h3>
              <p>A demanda de vários ativos, num só login. Entra quem quer operar.</p>
            </article>
              </div>
            </Reveal>
          <div className="app-cta">
            <a className="btn btn-cta btn-lg" href={SITE.trade.trial}>
              Testar na plataforma <span aria-hidden>→</span>
            </a>
            <a className="btn btn-ghost" href={SITE.trade.login}>
              Já tenho conta
            </a>
          </div>
          </RevealGroup>
        </div>
      </section>

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
              <h2 id="cta-journey-title">Seja o trader que trilha a jornada premium com eficiência</h2>
            </Reveal>
            <Reveal variant="right" className="cta-journey-actions-wrap">
              <div className="cta-journey-actions">
                <a className="btn btn-cta btn-lg" href={SITE.trade.trial}>
                  Testar grátis <span aria-hidden>→</span>
                </a>
                <a className="btn btn-white btn-lg" href={SITE.trade.login}>
                  Entrar
                </a>
              </div>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="section reviews-sec">
        <RevealGroup>
          <div className="wrap">
            <Reveal variant="left">
              <h2>Eles pararam de procurar outra corretora. Leia o porquê.</h2>
            </Reveal>
          </div>
          <Marquee items={TESTIMONIALS_A} />
          <Marquee items={TESTIMONIALS_B} reverse />
        </RevealGroup>
      </section>
    </>
  );
}
