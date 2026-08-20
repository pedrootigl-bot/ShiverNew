import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { readLegal } from "@/lib/md";
import { legalJsonLd } from "@/lib/seo";

const pages = {
  privacy: {
    file: "privacy.md",
    title: "Privacy Policy",
    heading: "Privacy Policy | Shiver Broker",
    description: "Privacy Policy da Shiver Broker (Sun Wave LLC): coleta, uso e proteção de dados pessoais.",
  },
  terms: {
    file: "terms.md",
    title: "Termos e Condições Gerais",
    heading: "Termos e Condições Gerais | Shiver Broker",
    description: "Termos e Condições Gerais da Shiver Broker — Sun Wave LLC e shiverbroker.com.",
  },
  "terms-south-africa": {
    file: "terms-south-africa.md",
    title: "Terms South Africa",
    heading: "Terms South Africa | Shiver Broker",
    description: "Terms South Africa da Shiver Broker.",
  },
} as const;

type Slug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    robots: { index: true, follow: true },
    alternates: { canonical: `/legal/${slug}` },
    openGraph: {
      title: page.heading,
      description: page.description,
      url: `/legal/${slug}`,
      type: "website",
      locale: "pt_BR",
      siteName: "Shiver Broker",
    },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) notFound();
  const html = readLegal(page.file);
  return (
    <div className="legal-page wrap">
      <JsonLd data={legalJsonLd(page.heading, `/legal/${slug}`, page.description)} />
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
