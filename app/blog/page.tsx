import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { postsByDate } from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog Shiver Broker — Forex, Crypto, VIP e Como Investir",
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
    title: "Blog Shiver Broker",
    description: "Artigos oficiais da corretora Shiver: plataforma, VIP, confiabilidade e investimentos.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = postsByDate();

  return (
    <RevealGroup>
      <div className="blog-page wrap">
        <Reveal variant="blur">
          <p className="meta">Blog</p>
        </Reveal>
        <Reveal variant="left">
          <h1>Blog da Shiver Broker</h1>
        </Reveal>
        <Reveal variant="blur" delay={80}>
          <p className="lead">
            O que quem já opera na Shiver quer entender — e o que quem ainda está fora precisa ler antes de abrir a conta.
          </p>
        </Reveal>
        <div className="post-grid">
          {featured ? (
            <Reveal variant="rise" delay={120} className="featured">
              <PostCard post={featured} featured />
            </Reveal>
          ) : null}
          {rest.map((post, index) => (
            <Reveal key={post.slug} variant="rise" delay={200 + index * 110}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </RevealGroup>
  );
}
