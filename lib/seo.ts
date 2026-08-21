import type { Metadata } from "next";
import { posts, type Post } from "@/lib/blog";
import { BLOG_AUTHOR, SITE } from "@/lib/site";

export const SEO = {
  title: "Shiver Broker | Corretora Forex, Crypto e Opções",
  titleHome: "Shiver Broker | Corretora dos Grandes Tubarões — Forex, Crypto e Opções",
  titleBlog: "Blog Shiver Broker | Forex, Crypto, VIP e Como Investir",
  description: SITE.description,
  keywords: [
    "Shiver Broker",
    "corretora Shiver",
    "forex",
    "crypto",
    "opções binárias",
    "conta demo Shiver",
  ],
  ogImage: {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "Shiver Broker — A Corretora dos Grandes Tubarões",
  },
} as const;

const orgId = `${SITE.url}/#organization`;
const brandId = `${SITE.url}/#brand`;
const siteId = `${SITE.url}/#website`;
const serviceId = `${SITE.url}/#service`;
const logoUrl = `${SITE.url}/icon.png`;
const ogUrl = `${SITE.url}/og.png`;

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: "Shiver Broker",
    legalName: "Sun Wave LLC",
    alternateName: ["Shiver", "ShiverBroker", "Corretora Shiver", "Shiver Broker corretora"],
    url: SITE.url,
    email: SITE.email,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    image: ogUrl,
    slogan: SITE.tagline,
    foundingLocation: {
      "@type": "Place",
      name: "Charlestown, Nevis",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charlestown",
      addressRegion: "Nevis",
      addressCountry: "KN",
    },
    sameAs: ["https://trade.shiverbroker.com"],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "customer support",
      availableLanguage: ["Portuguese", "English"],
    },
    knowsAbout: ["Forex", "Cryptocurrency trading", "Binary options"],
  };
}

function brandNode() {
  return {
    "@type": "Brand",
    "@id": brandId,
    name: "Shiver",
    alternateName: ["Shiver Broker", "ShiverBroker"],
    url: SITE.url,
    logo: logoUrl,
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: SITE.url,
    name: "Shiver Broker",
    alternateName: ["Shiver", "ShiverBroker.com"],
    description: SITE.description,
    inLanguage: "pt-BR",
    publisher: { "@id": orgId },
    about: { "@id": brandId },
  };
}

function financialServiceNode() {
  return {
    "@type": "FinancialService",
    "@id": serviceId,
    name: "Shiver Broker",
    alternateName: "Shiver",
    description: SITE.description,
    url: SITE.url,
    image: ogUrl,
    areaServed: "Worldwide",
    availableLanguage: ["pt-BR", "en"],
    brand: { "@id": brandId },
    provider: { "@id": orgId },
    parentOrganization: { "@id": orgId },
    serviceType: ["Forex", "Cryptocurrency trading", "Binary options"],
    offers: {
      "@type": "Offer",
      name: "Conta demo Shiver Broker",
      description: "Teste a plataforma Shiver com $10.000 virtuais, sem depósito.",
      url: SITE.trade.trial,
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), brandNode(), websiteNode(), financialServiceNode()],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SEO.titleHome,
        description: SITE.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogUrl,
        },
        mainEntity: { "@id": serviceId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
        ],
      },
    ],
  };
}

export function blogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE.url}/blog#webpage`,
        url: `${SITE.url}/blog`,
        name: SEO.titleBlog,
        description:
          "Blog oficial da Shiver Broker: opções binárias, confiabilidade, programa VIP e o caminho da conta demo ao primeiro saque.",
        inLanguage: "pt-BR",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
      },
      {
        "@type": "ItemList",
        name: "Artigos do blog Shiver Broker",
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE.url}/blog/${post.slug}`,
          name: post.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        ],
      },
    ],
  };
}

export function articleJsonLd(post: Post) {
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        datePublished: post.date,
        dateModified: post.updated,
        url,
        mainEntityOfPage: url,
        inLanguage: "pt-BR",
        articleSection: post.category,
        author: {
          "@type": "Person",
          name: BLOG_AUTHOR.name,
          jobTitle: BLOG_AUTHOR.role,
          url: `${SITE.url}/sobre`,
          worksFor: { "@id": orgId },
        },
        publisher: {
          "@type": "Organization",
          "@id": orgId,
          name: "Shiver Broker",
          url: SITE.url,
          logo: {
            "@type": "ImageObject",
            url: logoUrl,
            width: 512,
            height: 512,
          },
        },
        description: post.description,
        image: `${SITE.url}${post.image}`,
        about: { "@type": "Thing", name: "Shiver Broker" },
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export function aboutJsonLd() {
  const url = `${SITE.url}/sobre`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: "Sobre a Shiver Broker",
        description:
          "Quem opera a Shiver Broker: Sun Wave LLC, pagamentos em Chipre, documentos públicos e o que a CVM não autoriza.",
        inLanguage: "pt-BR",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Sobre", item: url },
        ],
      },
    ],
  };
}

export function legalJsonLd(title: string, path: string, description: string) {
  const url = `${SITE.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: "%s | Shiver Broker",
  },
  description: SITE.description,
  applicationName: "Shiver Broker",
  generator: "Shiver Broker",
  referrer: "origin-when-cross-origin",
  category: "finance",
  keywords: [...SEO.keywords],
  authors: [{ name: "Equipe Shiver Broker", url: `${SITE.url}/sobre` }],
  creator: "Shiver Broker",
  publisher: "Sun Wave LLC",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: "Shiver Broker",
    title: SEO.titleHome,
    description: SITE.description,
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleHome,
    description: SITE.description,
    images: [SEO.ogImage.url],
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "pt-BR": SITE.url,
      "x-default": SITE.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/icon.png", apple: "/icon.png", shortcut: "/icon.png" },
  manifest: "/manifest.webmanifest",
};
