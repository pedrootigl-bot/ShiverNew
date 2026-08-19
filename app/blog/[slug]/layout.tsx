import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/blog";
import { hasPostBody } from "@/lib/blog-bodies";
import { SEO } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: ["Shiver", "Shiver Broker", ...post.keywords],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [SEO.ogImage],
      publishedTime: post.date,
    },
  };
}

export default async function PostLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !hasPostBody(slug)) notFound();
  const articleLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        url: `${SITE.url}/blog/${post.slug}`,
        mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
        inLanguage: "pt-BR",
        author: { "@id": `${SITE.url}/#organization` },
        publisher: { "@id": `${SITE.url}/#organization` },
        description: post.description,
        image: `${SITE.url}/og.png`,
        about: { "@type": "Thing", name: "Shiver Broker" },
        keywords: ["Shiver", "Shiver Broker", ...post.keywords].join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Shiver Broker", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${post.slug}` },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {children}
    </>
  );
}
