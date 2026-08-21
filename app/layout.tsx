import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ParallaxRoot } from "@/components/ParallaxRoot";
import { PageFade } from "@/components/PageFade";
import { Disclaimer } from "@/components/Disclaimer";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = organizationJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://trade.shiverbroker.com" />
        <JsonLd data={jsonLd} />
      </head>
      <body className={inter.className}>
        <a className="skip" href="#conteudo">
          Ir para o conteúdo
        </a>
        <Disclaimer />
        <Header />
        <main id="conteudo">
          <div id="page-fade" className="page-fade">
            <PageFade />
            <ParallaxRoot />
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
