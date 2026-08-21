import Link from "next/link";
import { CtaButton } from "@/components/CtaButton";
import { NAV, PDFS, SITE } from "@/lib/site";

const FOOTER_LEGAL = [
  { label: "Sobre", href: "/sobre" },
  { label: "Privacidade", href: "/legal/privacy" },
  { label: "Termos e condições", href: "/legal/terms" },
  { label: "Termos África do Sul", href: "/legal/terms-south-africa" },
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <img src="/media/R6Lgnh9bXoiPlyDe7JyGXOz604.png" alt="Shiver Broker" width={36} height={36} decoding="async" />
              <div>
                <span>Shiver</span>
                <small>BROKER</small>
              </div>
            </Link>
            <p className="footer-tag">{SITE.tagline}</p>
            <p>A Shiver Broker, também conhecida como Shiver, é feita para quem não quer operar no mesmo oceano da maioria.</p>
            <a className="footer-mail" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            <div className="footer-cta">
              <CtaButton href={SITE.trade.login} size="sm">
                Entrar
              </CtaButton>
              <CtaButton href={SITE.trade.register} size="sm">
                Abrir conta
              </CtaButton>
            </div>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} prefetch={false}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Documentos</h4>
            <ul className="footer-docs">
              {PDFS.map((doc) => (
                <li key={doc.id}>
                  <a href={doc.href} rel="noopener noreferrer" target="_blank">
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>{SITE.company.legal}</p>
          <p>{SITE.company.payments}</p>
          <p>
            A Shiver Broker não é autorizada pela CVM a ofertar ou intermediar valores mobiliários publicamente no
            Brasil. Operar envolve risco de perda do capital.
          </p>
          <div className="footer-copy">
            <small>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</small>
            <small>Negociação ilustrativa no site. Payout real na plataforma.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
