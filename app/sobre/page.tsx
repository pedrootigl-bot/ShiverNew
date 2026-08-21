import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { aboutJsonLd } from "@/lib/seo";
import { BLOG_AUTHOR, PDFS, SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Sobre a Shiver Broker",
  description:
    "Quem opera a Shiver Broker: Sun Wave LLC, pagamentos em Chipre, documentos públicos e o aviso da CVM. Conta demo com $10.000 virtuais.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a Shiver Broker",
    description:
      "Empresa, documentos e o que a CVM não autoriza. Transparência para quem vai operar.",
    url: "/sobre",
    type: "website",
    locale: "pt_BR",
    siteName: "Shiver Broker",
  },
};

export default function SobrePage() {
  return (
    <div className="legal-page wrap about-page">
      <JsonLd data={aboutJsonLd()} />
      <p className="kicker">Empresa</p>
      <h1>Sobre a Shiver Broker</h1>
      <p className="lead">
        A Shiver Broker é uma corretora internacional de forex, crypto e opções. Esta página reúne quem opera a marca,
        onde está registrada e o que o site não esconde: não há autorização da CVM no Brasil.
      </p>

      <section>
        <h2>Quem somos</h2>
        <p>
          A marca Shiver Broker é operada pela <strong>Sun Wave LLC</strong>, registro <strong>L 22402</strong>, com
          endereço em Lighthouse Trust Nevis Ltd, Suite 1, A.L. Evelyn Ltd Building, Main Street, Charlestown, Nevis.
        </p>
        <p>
          As transações de pagamento são processadas pela <strong>S.W. SUN WAVE CY LTD</strong>, registro{" "}
          <strong>HE450991</strong>, em Kyriakou Matsi &amp; Anexartisias 3, ROUSSOS LIMASSOL TOWER, 4th Floor, 3040,
          Limassol, Chipre.
        </p>
        <p>
          Os artigos do blog são assinados por <strong>{BLOG_AUTHOR.name}</strong>, {BLOG_AUTHOR.role.toLowerCase()} da
          Shiver Broker. Dúvidas: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>

      <section>
        <h2>O que a CVM não autoriza</h2>
        <p>
          A Shiver Broker não é autorizada pela Comissão de Valores Mobiliários do Brasil a ofertar ou intermediar
          valores mobiliários publicamente no Brasil. Quem acessa o site declara estar ciente das restrições. O detalhe
          está no <Link href="/legal/terms">Contrato com o Cliente</Link>.
        </p>
        <p>Negociação envolve risco. Payout e cotações ilustrados no marketing podem diferir do que aparece na plataforma.</p>
      </section>

      <section>
        <h2>Documentos públicos</h2>
        <p>Políticas da operação, em PDF:</p>
        <ul className="about-docs">
          {PDFS.map((doc) => (
            <li key={doc.id}>
              <a href={doc.href} rel="noopener noreferrer" target="_blank">
                {doc.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p>
        <Link href="/blog">Ler o blog</Link>
        {" · "}
        <a href={SITE.trade.trial}>Testar a conta demo</a>
      </p>
    </div>
  );
}
