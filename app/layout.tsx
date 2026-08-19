import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParallaxRoot } from "@/components/ParallaxRoot";
import { PageFade } from "@/components/PageFade";
import { BlogRouteLoading } from "@/components/BlogRouteLoading";
import { Disclaimer } from "@/components/Disclaimer";
import { defaultMetadata, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "700"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = defaultMetadata;

const jsonLd = siteJsonLd();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/icon.png" />
        <meta name="theme-color" content="#05070a" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        <a className="skip" href="#conteudo">
          Ir para o conteúdo
        </a>
        <Disclaimer />
        <Header />
        <BlogRouteLoading />
        <ParallaxRoot>
          <main id="conteudo">
            <PageFade>{children}</PageFade>
          </main>
        </ParallaxRoot>
        <Footer />
      </body>
    </html>
  );
}
