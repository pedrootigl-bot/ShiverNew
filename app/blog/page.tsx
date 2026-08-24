import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { postsByDate } from "@/lib/blog";
import { blogIndexJsonLd, pageAlternates, SEO } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: { absolute: SEO.titleBlog },
  description: SEO.descriptionBlog,
  alternates: pageAlternates("/blog"),
  keywords: [...SEO.keywords, "blog Shiver Broker", "VIP Shiver"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Shiver Broker",
    title: SEO.titleBlog,
    description: SEO.descriptionBlog,
    url: "/blog",
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleBlog,
    description: SEO.descriptionBlog,
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
              <p className="blog-kicker">Blog</p>
            </Reveal>
            <Reveal variant="left">
              <h1>{SEO.titleBlogH1}</h1>
            </Reveal>
            <Reveal variant="left" delay={80}>
              <p className="lead">
                Plataforma, VIP, confiabilidade e o caminho até o primeiro saque — o que quem opera precisa ler agora.
              </p>
            </Reveal>
          </header>
          <div className="blog-feed">
            {postsByDate().map((post, index) => (
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
