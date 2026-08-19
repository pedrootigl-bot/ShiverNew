"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";
import { getPost, morePosts, type PostSlug } from "@/lib/blog";
import { hasPostBody, postBodies } from "@/lib/blog-bodies";
import { canPrefetch } from "@/lib/network";
import { SITE } from "@/lib/site";

export function PostArticle({ slug }: { slug: string }) {
  const router = useRouter();
  if (!hasPostBody(slug)) return null;
  const post = getPost(slug);
  if (!post) return null;
  const html = postBodies[slug as PostSlug];
  const related = morePosts(slug);

  return (
    <RevealGroup>
      <article className="blog-page wrap">
        <Reveal variant="left">
          <p className="blog-back">
            <Link
              href="/blog"
              prefetch={false}
              onPointerDown={() => {
                if (canPrefetch()) router.prefetch("/blog");
              }}
            >
              ← Voltar ao blog
            </Link>
          </p>
        </Reveal>
        <Reveal variant="blur" delay={40}>
          <p className="meta">
            {post.displayDate} · {post.category}
          </p>
        </Reveal>
        <Reveal variant="left" delay={80}>
          <h1>{post.title}</h1>
        </Reveal>
        <Reveal variant="rise" delay={140}>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Reveal>
        <Reveal variant="scale" delay={220}>
          <div className="post-cta">
            <p>A conta demo já está pronta. $10.000 virtuais para sentir a plataforma — antes de o próximo movimento passar.</p>
            <a className="btn btn-cta" href={SITE.trade.trial}>
              Entrar na plataforma <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
        {related.length > 0 ? (
          <aside className="post-related" aria-label="Continue lendo">
            <Reveal variant="blur" delay={80}>
              <h2>Continue lendo</h2>
            </Reveal>
            <div className="post-grid">
              {related.map((item, index) => {
                const href = `/blog/${item.slug}`;
                return (
                  <Reveal key={item.slug} variant="rise" delay={160 + index * 120}>
                    <Link
                      className="post-card"
                      href={href}
                      prefetch={false}
                      onPointerDown={() => {
                        if (canPrefetch()) router.prefetch(href);
                      }}
                    >
                      <p className="meta">
                        {item.category} · {item.displayDate}
                      </p>
                      <h3>{item.navTitle}</h3>
                      <p>{item.teaser}</p>
                      <strong className="post-more">Ler artigo →</strong>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </aside>
        ) : null}
      </article>
    </RevealGroup>
  );
}
