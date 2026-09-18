import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ParallaxRoot } from "@/components/ParallaxRoot";
import { PageFade } from "@/components/PageFade";
import { Disclaimer } from "@/components/Disclaimer";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const META_PIXEL_ID = "2218090675655265";

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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
