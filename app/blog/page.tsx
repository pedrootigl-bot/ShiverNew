import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
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
    <div className="blog-page wrap">
      <p className="meta">Blog</p>
      <h1>Blog da Shiver Broker</h1>
      <p className="lead">
        O que quem já opera na Shiver quer entender — e o que quem ainda está fora precisa ler antes de abrir a conta.
      </p>
      <div className="post-grid">
        {featured ? <PostCard post={featured} featured /> : null}
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
