import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getPost, posts } from "@/lib/blog";
import { hasPostBody } from "@/lib/blog-bodies";
import { articleJsonLd } from "@/lib/seo";
import { BLOG_AUTHOR } from "@/lib/site";

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
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords],
    authors: [{ name: BLOG_AUTHOR.name, url: "/sobre" }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "pt_BR",
      siteName: "Shiver Broker",
      url,
      images: [{ url: post.image, alt: post.title }],
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [BLOG_AUTHOR.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
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
  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      {children}
    </>
  );
}
