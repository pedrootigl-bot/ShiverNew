import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readLegal } from "@/lib/md";

const pages = {
  privacy: {
    file: "privacy.md",
    title: "Privacy Policy | Shiver Broker",
    description: "Privacy Policy da Shiver Broker (Sun Wave LLC): coleta, uso e proteção de dados pessoais.",
  },
  terms: {
    file: "terms.md",
    title: "Termos e Condições Gerais | Shiver Broker",
    description: "Termos e Condições Gerais da Shiver Broker — Sun Wave LLC e shiverbroker.com.",
  },
  "terms-south-africa": {
    file: "terms-south-africa.md",
    title: "Terms South Africa | Shiver Broker",
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
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) notFound();
  const html = readLegal(page.file);
  return (
    <div className="legal-page wrap">
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
