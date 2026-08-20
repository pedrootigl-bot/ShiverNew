import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { posts } from "@/lib/blog";
import { blogIndexJsonLd, SEO } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: { absolute: SEO.titleBlog },
  description:
    "Blog oficial da Shiver Broker: opções binárias, se a Shiver é confiável, programa VIP e o caminho da conta demo ao primeiro saque.",
  alternates: { canonical: "/blog" },
  keywords: [
    "Shiver",
    "Shiver Broker",
    "blog Shiver",
    "Shiver investir",
    "opções binárias",
    "corretora Shiver",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Shiver Broker",
    title: SEO.titleBlog,
    description: "Artigos oficiais da corretora Shiver: plataforma, VIP, confiabilidade e investimentos.",
    url: "/blog",
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleBlog,
    description: "Artigos oficiais da corretora Shiver: plataforma, VIP, confiabilidade e investimentos.",
    images: [SEO.ogImage.url],
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd()} />
      <RevealGroup>
        <div className="blog-page wrap">
          <header className="blog-head">
            <Reveal variant="blur">
              <p className="blog-kicker">Postagens de blog</p>
            </Reveal>
            <Reveal variant="left">
              <h1>Últimas Notícias e Análises</h1>
            </Reveal>
          </header>
          <div className="blog-feed">
            {posts.map((post, index) => (
              <Reveal key={post.slug} variant="rise" delay={120 + index * 90}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </RevealGroup>
    </>
  );
}
